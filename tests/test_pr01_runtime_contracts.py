from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import pytest
from jsonschema import Draft202012Validator, FormatChecker
from pydantic import TypeAdapter, ValidationError

from erp_rag_contracts.models import runtime_v2

ROOT = Path(__file__).resolve().parents[1]

CONTRACTS: tuple[tuple[str, str, str], ...] = (
    ("intent-classification-v2", "IntentClassificationV2", "2"),
    ("presentation-preference-v1", "PresentationPreferenceV1", "1"),
    ("query-sql-draft-v6", "QuerySqlDraftV6", "6"),
    ("proposed-result-semantics-v2", "ProposedResultSemanticsV2", "2"),
    ("result-set-semantics-v1", "ResultSetSemanticsV1", "1"),
    ("result-set-selection-v1", "ResultSetSelectionV1", "1"),
    ("proposed-semantic-column-v2", "ProposedSemanticColumnV2", "2"),
    ("value-reference-v1", "ValueReferenceV1", "1"),
    ("resolved-business-reference-context-v1", "ResolvedBusinessReferenceContextV1", "1"),
    ("resolved-business-reference-v1", "ResolvedBusinessReferenceV1", "1"),
    ("presentation-plan-v2", "PresentationPlanV2", "2"),
    ("presentation-block-v2", "PresentationBlockV2", "2"),
    ("kpi-block-v1", "KpiBlockV1", "1"),
    ("data-grid-block-v1", "DataGridBlockV1", "1"),
    ("pivot-grid-block-v1", "PivotGridBlockV1", "1"),
    ("chart-block-v1", "ChartBlockV1", "1"),
    ("gauge-block-v1", "GaugeBlockV1", "1"),
    ("presentation-layout-v1", "PresentationLayoutV1", "1"),
    ("presentation-block-resolution-v1", "PresentationBlockResolutionV1", "1"),
    ("materialized-presentation-v2", "MaterializedPresentationV2", "2"),
    ("materialized-kpi-block-v1", "MaterializedKpiBlockV1", "1"),
    ("materialized-grid-block-v1", "MaterializedGridBlockV1", "1"),
    ("materialized-pivot-block-v1", "MaterializedPivotBlockV1", "1"),
    ("materialized-chart-block-v1", "MaterializedChartBlockV1", "1"),
    ("materialized-gauge-block-v1", "MaterializedGaugeBlockV1", "1"),
    ("query-result-v2", "QueryResultV2", "2"),
    ("assistant-client-stream-event-v2", "AssistantClientStreamEventV2", "2"),
    ("assistant-historical-result-v2", "AssistantHistoricalResultV2", "2"),
    ("assistant-historical-requery-result-v2", "AssistantHistoricalRequeryResultV2", "2"),
    ("query-artifact-v1", "QueryArtifactV1", "1"),
    ("query-artifact-parameter-v1", "QueryArtifactParameterV1", "1"),
    ("historical-query-artifact-view-v1", "HistoricalQueryArtifactViewV1", "1"),
    ("historical-requery-parameter-v1", "HistoricalRequeryParameterV1", "1"),
    ("requery-capability-v1", "RequeryCapabilityV1", "1"),
    ("dashboard-definition-v1", "DashboardDefinitionV1", "1"),
    ("dashboard-widget-v1", "DashboardWidgetV1", "1"),
    ("dashboard-filter-v1", "DashboardFilterV1", "1"),
    ("dashboard-filter-binding-v1", "DashboardFilterBindingV1", "1"),
    ("dashboard-filter-mapping-v1", "DashboardFilterMappingV1", "1"),
    ("dashboard-stream-event-v1", "DashboardStreamEventV1", "1"),
    ("dashboard-result-v1", "DashboardResultV1", "1"),
    ("import-operation-v1", "ImportOperationV1", "1"),
    ("import-preflight-v1", "ImportPreflightV1", "1"),
    ("import-mapping-v1", "ImportMappingV1", "1"),
    ("import-preview-v1", "ImportPreviewV1", "1"),
    ("import-execution-request-v1", "ImportExecutionRequestV1", "1"),
    ("import-result-v1", "ImportResultV1", "1"),
    ("import-issue-v1", "ImportIssueV1", "1"),
    ("import-stream-event-v1", "ImportStreamEventV1", "1"),
    ("presentation-capability-profile-v1", "PresentationCapabilityProfileV1", "1"),
    ("import-capability-descriptor-v1", "ImportCapabilityDescriptorV1", "1"),
)


def load(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def test_query_result_accepts_700_rows_and_rejects_the_read_ahead_row() -> None:
    payload = load(
        ROOT / "fixtures/runtime/assistant-historical-requery-result-v2/valid/minimum.json"
    )["result"]
    payload["rows"] = [dict(payload["rows"][0]) for _ in range(700)]
    payload["row_count"] = 700
    payload["execution"]["truncated"] = True
    schema = load(ROOT / "contracts/runtime/query-result-v2.schema.json")
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    validator.validate(payload)
    assert len(runtime_v2.QueryResultV2.model_validate(payload).rows) == 700
    packaged = load(ROOT / "src/erp_rag_contracts/runtime_schemas/query-result-v2.schema.json")
    assert packaged == schema
    payload["rows"].append(dict(payload["rows"][0]))
    payload["row_count"] = 701
    assert any(error.validator == "maxItems" for error in validator.iter_errors(payload))
    with pytest.raises(ValidationError):
        runtime_v2.QueryResultV2.model_validate(payload)


@pytest.mark.parametrize(("slug", "model_name", "version"), CONTRACTS)
def test_pr01_schema_compiles_and_matches_python_model(
    slug: str, model_name: str, version: str
) -> None:
    schema = load(ROOT / "contracts" / "runtime" / f"{slug}.schema.json")
    Draft202012Validator.check_schema(schema)
    assert schema["$schema"] == "https://json-schema.org/draft/2020-12/schema"
    contract_name = slug.removesuffix(f"-v{version}")
    assert schema["$id"] == f"urn:erp-rag-contracts:schema:{contract_name}:v{version}"
    model = getattr(runtime_v2, model_name)
    generated = TypeAdapter(model).json_schema(mode="validation")
    assert schema.get("$defs", {}) == generated.get("$defs", {})


@pytest.mark.parametrize(
    "family",
    (
        "query-presentation",
        "business-references",
        "query-artifact",
        "dashboard",
        "import",
        "stream-history",
    ),
)
def test_pr01_family_fixtures_match_schema_and_python(family: str) -> None:
    folder = ROOT / "fixtures" / "runtime" / f"pr01-{family}"
    schema_name = load(folder / "fixture-metadata.json")["schema"]
    schema = load(ROOT / "contracts" / "runtime" / f"{schema_name}.schema.json")
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    model_name = next(model for slug, model, _ in CONTRACTS if slug == schema_name)
    adapter = TypeAdapter(getattr(runtime_v2, model_name))

    valid = load(folder / "valid" / "minimum.json")
    validator.validate(valid)
    adapter.validate_python(valid)

    invalid = load(folder / "invalid" / "version-mismatch.json")
    assert list(validator.iter_errors(invalid))
    with pytest.raises(ValidationError):
        adapter.validate_python(invalid)


def test_pr01_discriminated_unions_and_unknown_properties_are_closed() -> None:
    for slug in ("result-set-selection-v1", "value-reference-v1", "presentation-block-v2"):
        schema = load(ROOT / "contracts" / "runtime" / f"{slug}.schema.json")
        assert "discriminator" in schema
        assert "oneOf" in schema
    for slug, _, _ in CONTRACTS:
        schema = load(ROOT / "contracts" / "runtime" / f"{slug}.schema.json")
        candidates = [schema, *schema.get("$defs", {}).values()]
        for candidate in candidates:
            if candidate.get("type") == "object" and "properties" in candidate:
                assert candidate.get("additionalProperties") is False


def test_pr01_internal_schema_references_resolve() -> None:
    def references(value: Any) -> list[str]:
        if isinstance(value, dict):
            found = [value["$ref"]] if "$ref" in value else []
            return found + [item for child in value.values() for item in references(child)]
        if isinstance(value, list):
            return [item for child in value for item in references(child)]
        return []

    for slug, _, _ in CONTRACTS:
        schema = load(ROOT / "contracts" / "runtime" / f"{slug}.schema.json")
        definitions = schema.get("$defs", {})
        for reference in references(schema):
            assert reference.startswith("#/$defs/")
            assert reference.removeprefix("#/$defs/") in definitions


def test_pr01_keeps_semantic_top_n_separate_from_technical_truncation() -> None:
    semantics_schema = load(
        ROOT / "contracts" / "runtime" / "proposed-result-semantics-v2.schema.json"
    )
    result_schema = load(ROOT / "contracts" / "runtime" / "query-result-v2.schema.json")
    assert "truncated" not in json.dumps(semantics_schema)
    execution = result_schema["$defs"]["QueryResultExecutionV2"]
    assert "truncated" in execution["required"]


def test_pr01_date_range_binding_uses_end_exclusive_and_rebindable_parameters() -> None:
    dashboard = load(ROOT / "fixtures" / "runtime" / "pr01-dashboard" / "valid" / "minimum.json")
    mappings = dashboard["widgets"][0]["filter_bindings"][0]["mappings"]
    assert [item["source_path"] for item in mappings] == ["start", "end_exclusive"]
    artifact = load(
        ROOT / "fixtures" / "runtime" / "pr01-query-artifact" / "valid" / "minimum.json"
    )
    assert all(parameter["rebindable"] for parameter in artifact["parameters"])
    assert "end_inclusive" not in json.dumps(
        [load(ROOT / "contracts" / "runtime" / f"{slug}.schema.json") for slug, _, _ in CONTRACTS]
    )
