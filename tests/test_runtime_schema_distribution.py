import json
import os
import subprocess
import sys
from pathlib import Path

from erp_rag_contracts.runtime_fixtures import runtime_fixture_path
from erp_rag_contracts.runtime_schemas import runtime_schema_path

EXPECTED = {
    ("chat-turn-request", "2"): "urn:erp-rag-contracts:schema:chat-turn-request:v2",
    ("chat-turn-response", "2"): "urn:erp-rag-contracts:schema:chat-turn-response:v2",
    ("query-sql-draft", "5"): "urn:erp-rag-contracts:schema:query-sql-draft:v5",
    ("query-semantic-plan", "1"): "urn:erp-rag-contracts:schema:query-semantic-plan:v1",
    ("resolved-query-context", "1"): "urn:erp-rag-contracts:schema:resolved-query-context:v1",
    ("entity-resolution-request", "2"): (
        "urn:erp-rag-contracts:schema:entity-resolution-request:v2"
    ),
    ("entity-resolution-result", "2"): ("urn:erp-rag-contracts:schema:entity-resolution-result:v2"),
}

for name, version in (
    ("intent-classification", "2"),
    ("presentation-preference", "1"),
    ("query-sql-draft", "6"),
    ("proposed-result-semantics", "2"),
    ("result-set-semantics", "1"),
    ("result-set-selection", "1"),
    ("proposed-semantic-column", "2"),
    ("value-reference", "1"),
    ("resolved-business-reference-context", "1"),
    ("resolved-business-reference", "1"),
    ("presentation-plan", "2"),
    ("presentation-block", "2"),
    ("kpi-block", "1"),
    ("data-grid-block", "1"),
    ("pivot-grid-block", "1"),
    ("chart-block", "1"),
    ("gauge-block", "1"),
    ("presentation-layout", "1"),
    ("presentation-block-resolution", "1"),
    ("materialized-presentation", "2"),
    ("materialized-kpi-block", "1"),
    ("materialized-grid-block", "1"),
    ("materialized-pivot-block", "1"),
    ("materialized-chart-block", "1"),
    ("materialized-gauge-block", "1"),
    ("query-result", "2"),
    ("assistant-client-stream-event", "2"),
    ("assistant-historical-result", "2"),
    ("assistant-historical-requery-result", "2"),
    ("query-artifact", "1"),
    ("query-artifact-parameter", "1"),
    ("historical-query-artifact-view", "1"),
    ("historical-requery-parameter", "1"),
    ("requery-capability", "1"),
    ("dashboard-definition", "1"),
    ("dashboard-widget", "1"),
    ("dashboard-filter", "1"),
    ("dashboard-filter-binding", "1"),
    ("dashboard-filter-mapping", "1"),
    ("dashboard-stream-event", "1"),
    ("dashboard-result", "1"),
    ("import-operation", "1"),
    ("import-preflight", "1"),
    ("import-mapping", "1"),
    ("import-preview", "1"),
    ("import-execution-request", "1"),
    ("import-result", "1"),
    ("import-issue", "1"),
    ("import-stream-event", "1"),
    ("presentation-capability-profile", "1"),
    ("import-capability-descriptor", "1"),
):
    EXPECTED[(name, version)] = f"urn:erp-rag-contracts:schema:{name}:v{version}"


def test_every_runtime_schema_resolves_through_package_api() -> None:
    for (name, version), schema_id in EXPECTED.items():
        with runtime_schema_path(name, version) as path:
            assert json.loads(path.read_text(encoding="utf-8"))["$id"] == schema_id


def test_runtime_fixture_resolves_through_package_api() -> None:
    with runtime_fixture_path("chat-turn-request-v2/valid/user-message.json") as path:
        assert json.loads(path.read_text(encoding="utf-8"))["contract_version"] == "2.0"


def test_built_wheel_contains_and_resolves_runtime_schemas(tmp_path: Path) -> None:
    root = Path(__file__).resolve().parents[1]
    dist = tmp_path / "dist"
    target = tmp_path / "installed"
    subprocess.run(
        [sys.executable, "-m", "build", "--wheel", "--outdir", str(dist)],
        cwd=root,
        check=True,
        capture_output=True,
    )
    wheel = next(dist.glob("*.whl"))
    subprocess.run(
        [
            sys.executable,
            "-m",
            "pip",
            "install",
            "--no-deps",
            "--no-user",
            "--target",
            str(target),
            str(wheel),
        ],
        check=True,
        capture_output=True,
    )
    code = (
        "import json; "
        "from erp_rag_contracts.runtime_schemas import runtime_schema_path; "
        "from erp_rag_contracts.runtime_fixtures import runtime_fixture_path; "
        "c=runtime_schema_path('query-sql-draft','5'); "
        "p=c.__enter__(); schema_id=json.loads(p.read_text())['$id']; c.__exit__(None,None,None); "
        "f=runtime_fixture_path('chat-turn-request-v2/valid/user-message.json'); "
        "q=f.__enter__(); version=json.loads(q.read_text())['contract_version']; "
        "f.__exit__(None,None,None); print(schema_id + '|' + version)"
    )
    environment = {**os.environ, "PYTHONPATH": str(target)}
    completed = subprocess.run(
        [sys.executable, "-c", code],
        cwd=tmp_path,
        env=environment,
        check=True,
        capture_output=True,
        text=True,
    )
    assert completed.stdout.strip() == EXPECTED[("query-sql-draft", "5")] + "|2.0"
