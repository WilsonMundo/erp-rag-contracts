from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path

import pytest
from pydantic import ValidationError

from erp_rag_contracts.hashing import release_file_hash, semantic_content_hash, source_file_sha256
from erp_rag_contracts.models.contracts import (
    NormalizedCatalogRecordV1,
    QueryExampleDocumentSourceV1,
    TableSchemaDocumentSourceV1,
)
from erp_rag_contracts.normalization import normalize_document

ROOT = Path(__file__).parents[1]


def load(relative: str) -> dict[str, object]:
    return json.loads((ROOT / relative).read_text(encoding="utf-8"))


def test_separate_hash_representations() -> None:
    raw = "Cafe\u0301  \r\n"
    assert semantic_content_hash(raw).startswith("sha256:")
    assert len(source_file_sha256(raw.encode())) == 64
    assert not source_file_sha256(raw.encode()).startswith("sha256:")
    assert release_file_hash(raw.encode()) == "sha256:" + source_file_sha256(raw.encode())


def test_query_normalization_is_deterministic_and_lossless() -> None:
    raw = load("examples/valid/query-example-inherits-envelope.json")
    envelope = {
        "schema_version": "2.0",
        "catalog_version": "2026.08",
        "module": "ventas",
        "language": "es",
    }
    source_bytes = json.dumps(raw, sort_keys=True).encode()
    first = normalize_document(
        raw, source_reference="catalog.json", source_bytes=source_bytes, envelope=envelope
    )
    second = normalize_document(
        raw, source_reference="catalog.json", source_bytes=source_bytes, envelope=envelope
    )
    assert first == second
    assert NormalizedCatalogRecordV1.__class__ is not None
    assert first.source.model_dump(
        exclude={"module", "language"}
    ) == QueryExampleDocumentSourceV1.model_validate(raw).model_dump(exclude={"module", "language"})


def test_explicit_unknown_physical_metadata_is_preserved() -> None:
    raw = load("examples/valid/table-schema.json")
    model = TableSchemaDocumentSourceV1.model_validate(raw)
    assert model.table.columns[0].sql_type is None and model.table.columns[0].nullable is None
    normalized = normalize_document(raw, source_reference="table.json", source_bytes=b"table")
    assert not normalized.capabilities.physical_metadata_complete
    assert normalized.capabilities.retrieval_eligible is False  # fixture is draft
    assert "PHYSICAL_METADATA_INCOMPLETE" in normalized.capabilities.reasons


def test_normalized_join_preserves_source_semantics() -> None:
    raw = load("examples/valid/query-example.json")
    raw["tables_used"] = [
        {
            "name": "LeftTable",
            "alias": "l",
            "role": "fact",
            "description": "Izquierda",
            "object_kind": "table",
        },
        {
            "name": "RightTable",
            "alias": "r",
            "role": "dimension",
            "description": "Derecha",
            "object_kind": "table",
        },
    ]
    raw["joins_used"] = [
        {
            "left_table": "LeftTable",
            "left_alias": "l",
            "left_column": ["Id", "Branch"],
            "right_table": "RightTable",
            "right_alias": "r",
            "right_column": ["Id", "Branch"],
            "join_type": "INNER",
            "expression": "l.Id=r.Id AND l.Branch=r.Branch",
            "purpose": "Relacionar sin inventar propósito",
        }
    ]
    normalized = normalize_document(raw, source_reference="query.json", source_bytes=b"query")
    join = normalized.joins[0]
    assert join.left_columns == ["Id", "Branch"]
    assert join.right_columns == ["Id", "Branch"]
    assert join.condition == raw["joins_used"][0]["expression"]  # type: ignore[index]
    assert join.purpose == raw["joins_used"][0]["purpose"]  # type: ignore[index]
    assert join.resolution_status == "resolved"


def test_nested_additional_fields_are_rejected() -> None:
    raw = load("examples/valid/query-example.json")
    raw["entity"]["unexpected"] = True  # type: ignore[index]
    with pytest.raises(ValidationError):
        QueryExampleDocumentSourceV1.model_validate(raw)


def test_scaffold_dry_run_and_apply(tmp_path: Path) -> None:
    command = [
        sys.executable,
        "-m",
        "erp_rag_contracts.cli",
        "scaffold-module",
        "--module",
        "nuevo",
        "--catalog-version",
        "2026.09",
        "--language",
        "es",
        "--output",
        str(tmp_path),
        "--dry-run",
    ]
    dry = subprocess.run(command, cwd=ROOT, text=True, capture_output=True, check=True)
    assert not list(tmp_path.iterdir()) and json.loads(dry.stdout)["mode"] == "dry-run"
    command[-1] = "--apply"
    subprocess.run(command, cwd=ROOT, check=True)
    manifest = json.loads((tmp_path / "module-manifest.json").read_text(encoding="utf-8"))
    assert manifest["documents"] == []
    assert "approved" not in json.dumps(manifest)


@pytest.mark.skipif(
    os.getenv("RUN_ERP_RAG_COMPATIBILITY_TESTS") != "1", reason="external integration is opt-in"
)
def test_external_release_compatibility(tmp_path: Path) -> None:
    release_value = os.environ["ERP_RAG_COMPATIBILITY_RELEASE"]
    reviewer = Path(release_value).resolve().parents[1]
    report = tmp_path / "compatibility.json"
    before = {p: p.read_bytes() for p in Path(release_value).rglob("*") if p.is_file()}
    result = subprocess.run(
        [
            sys.executable,
            "-m",
            "erp_rag_contracts.cli",
            "compatibility-check",
            "--release",
            release_value,
            "--reviewer",
            str(reviewer),
            "--report",
            str(report),
        ],
        cwd=ROOT,
        check=False,
    )
    assert result.returncode == 0
    data = json.loads(report.read_text(encoding="utf-8"))
    total = data["counts"]["physical_documents"]
    for key in (
        "reviewer_json_schema_pass",
        "reviewer_pydantic_pass",
        "source_v1_json_schema_pass",
        "source_v1_pydantic_pass",
        "normalized_v1_json_schema_pass",
        "normalized_v1_pydantic_pass",
        "semantic_hash_pass",
    ):
        assert data["counts"][key] == total
    assert data["counts"]["orphan_documents"] == data["counts"]["missing_documents"] == 0
    assert data["sources_modified"] is False
    assert before == {p: p.read_bytes() for p in Path(release_value).rglob("*") if p.is_file()}
