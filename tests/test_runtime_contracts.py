import json
from pathlib import Path

import pytest
from jsonschema import Draft202012Validator, FormatChecker
from pydantic import TypeAdapter, ValidationError

from erp_rag_contracts.models.runtime import (
    ChartDefinitionV2,
    ProposedPresentationV1,
    QueryParameterDraftV2,
    QuerySemanticPlanV1,
    QuerySqlDraftV5,
    ResolvedQueryContextV1,
)


def test_semantic_plan_and_resolved_context_preserve_authoritative_branch_binding() -> None:
    plan = QuerySemanticPlanV1.model_validate(
        {
            "metric_mentions": [{"mention": "ventas", "concept": "sales"}],
            "entity_references": [
                {
                    "ref": "branch_1",
                    "entity_type": "branch",
                    "mention": "edison",
                    "type_resolution": "explicit",
                }
            ],
            "temporal_expression": "julio de 2026",
            "grouping_mentions": [],
            "filters": [],
        }
    )
    context = ResolvedQueryContextV1.model_validate(
        {
            "semantic_plan": plan.model_dump(mode="json"),
            "temporal": {
                "status": "resolved",
                "start": "2026-07-01T00:00:00-06:00",
                "end_exclusive": "2026-08-01T00:00:00-06:00",
                "timezone": "America/Guatemala",
                "bindings": [
                    {
                        "name": "start_date",
                        "sql_type": "datetime2",
                        "value": "2026-07-01T00:00:00-06:00",
                    }
                ],
            },
            "entities": [
                {
                    "ref": "branch_1",
                    "entity_type": "branch",
                    "mention": "edison",
                    "type_resolution": "explicit",
                    "status": "resolved",
                    "entity_id": "26",
                    "display_text": "EDISON",
                    "binding": {
                        "name": "branch_1_id",
                        "kind": "entity_id",
                        "sql_type": "bigint",
                        "value": 26,
                    },
                }
            ],
        }
    )

    assert context.entities[0].binding.value == 26


def test_semantic_plan_accepts_classification_level_reference() -> None:
    plan = QuerySemanticPlanV1.model_validate(
        {
            "metric_mentions": [{"mention": "ventas", "concept": "sales"}],
            "entity_references": [
                {
                    "ref": "classification_level_1",
                    "entity_type": "classification_level",
                    "mention": "categoría de producto",
                    "type_resolution": "explicit",
                }
            ],
            "temporal_expression": "agosto",
            "grouping_mentions": [
                {"mention": "categoría de producto", "concept": "product_classification"}
            ],
            "filters": [],
        }
    )

    assert plan.entity_references[0].entity_type == "classification_level"


def test_query_sql_draft_v5_has_no_entity_resolution_fields() -> None:
    draft = QuerySqlDraftV5.model_validate(
        {
            "query_sql_draft_version": "5.0",
            "sql": "SELECT 1 AS Total",
            "parameters": [],
            "proposed_result_semantics": {"shape": "scalar", "columns": []},
            "proposed_presentation": None,
        }
    )

    assert "entity_references" not in draft.model_dump(mode="json")
    with pytest.raises(ValidationError):
        QuerySqlDraftV5.model_validate(draft.model_dump(mode="json") | {"entity_references": []})


def _chart(**overrides: object) -> dict[str, object]:
    chart: dict[str, object] = {
        "chart_definition_version": "2.0",
        "type": "bar",
        "orientation": "horizontal",
        "series_mode": "fields",
        "category_field": "Cliente",
        "measure_fields": ["MontoTotalVendido"],
        "series_group_field": None,
        "stacking": "none",
        "sort": {"field": "MontoTotalVendido", "direction": "descending", "nulls": "last"},
        "axis": {
            "category": {"title": None, "label_format": "category"},
            "value": {
                "title": None,
                "scale": "linear",
                "format": "currency",
                "zero_baseline": "required",
            },
        },
        "limit": {"max_categories": 10, "max_series": 1, "overflow": "degrade"},
        "title": "Clientes con mayores ventas",
    }
    chart.update(overrides)
    return chart


def test_chart_definition_v2_accepts_fields_and_grouped_modes() -> None:
    ChartDefinitionV2.model_validate(_chart())
    ChartDefinitionV2.model_validate(
        _chart(
            type="line",
            orientation=None,
            series_mode="grouped",
            category_field="Mes",
            measure_fields=["VentaNeta"],
            series_group_field="Anio",
            sort={"field": "Mes", "direction": "ascending", "nulls": "last"},
        )
    )


def test_chart_definition_v2_rejects_grouped_multiple_measures() -> None:
    with pytest.raises(ValueError):
        ChartDefinitionV2.model_validate(
            _chart(
                series_mode="grouped",
                measure_fields=["VentaNeta", "Devoluciones"],
                series_group_field="Anio",
            )
        )


def test_query_sql_draft_v5_embeds_versioned_presentation() -> None:
    presentation = ProposedPresentationV1.model_validate(
        {
            "presentation_plan_version": "1.0",
            "kind": "data_grid_with_chart",
            "chart": _chart(),
        }
    )
    draft = QuerySqlDraftV5(
        query_sql_draft_version="5.0",
        sql="SELECT Cliente, SUM(Total) AS MontoTotalVendido",
        parameters=[],
        proposed_result_semantics={
            "version": "1.0",
            "shape": "ranking",
            "columns": [
                {
                    "ordinal": 0,
                    "key": "Cliente",
                    "role": "dimension",
                    "semantic_type": "category",
                    "aggregation": "none",
                },
                {
                    "ordinal": 1,
                    "key": "MontoTotalVendido",
                    "role": "measure",
                    "semantic_type": "currency",
                    "aggregation": "sum",
                },
            ],
        },
        proposed_presentation=presentation,
    )
    assert draft.proposed_presentation.chart is not None


def test_query_parameter_draft_v2_requires_nvarchar_max_length() -> None:
    adapter = TypeAdapter(QueryParameterDraftV2)

    with pytest.raises(ValidationError):
        adapter.validate_python(
            {"name": "branch_id", "sql_type": "nvarchar", "nullable": True, "value": None}
        )

    parameter = adapter.validate_python(
        {
            "name": "branch_id",
            "sql_type": "nvarchar",
            "nullable": True,
            "max_length": 40,
            "value": None,
        }
    )
    assert parameter.max_length == 40


def test_query_parameter_draft_v2_requires_decimal_shape() -> None:
    adapter = TypeAdapter(QueryParameterDraftV2)

    with pytest.raises(ValidationError):
        adapter.validate_python(
            {"name": "amount", "sql_type": "decimal", "nullable": False, "value": "1.00"}
        )
    with pytest.raises(ValidationError):
        adapter.validate_python(
            {
                "name": "amount",
                "sql_type": "decimal",
                "nullable": False,
                "precision": 2,
                "scale": 3,
                "value": "1.00",
            }
        )


from erp_rag_contracts.runtime_validation import (
    validate_query_sql_draft_invariants,
)

ROOT = Path(__file__).resolve().parents[1]


def load(relative: str) -> object:
    return json.loads((ROOT / relative).read_text(encoding="utf-8"))


def test_query_sql_draft_v5_schema_requires_nvarchar_length() -> None:
    schema = load("contracts/runtime/query-sql-draft-v5.schema.json")
    assert isinstance(schema, dict)
    definitions = schema["$defs"]
    assert isinstance(definitions, dict)
    nvarchar = definitions["NVarCharParameterDraftV2"]
    assert isinstance(nvarchar, dict)
    assert "max_length" in nvarchar["required"]
    assert nvarchar["additionalProperties"] is False
    serialized = json.dumps(schema)
    assert '"discriminator"' not in serialized
    assert '"oneOf"' not in serialized
    assert '"anyOf"' in serialized


def test_v5_invariant_validator_rejects_duplicate_parameters() -> None:
    draft = QuerySqlDraftV5.model_validate(
        {
            "query_sql_draft_version": "5.0",
            "sql": "SELECT @limit AS Total",
            "parameters": [
                {"name": "limit", "sql_type": "int", "nullable": False, "value": 10},
                {"name": "limit", "sql_type": "int", "nullable": False, "value": 20},
            ],
            "proposed_result_semantics": {"shape": "scalar", "columns": []},
            "proposed_presentation": None,
        }
    )

    assert validate_query_sql_draft_invariants(draft)[0].code == "PARAMETER_DUPLICATED"


@pytest.mark.parametrize(
    "name,valid",
    [
        ("entity-selection-value.json", True),
        ("entity-multi-selection-value.json", True),
        ("entity-selection-with-ids.json", False),
        ("entity-multi-selection-duplicate.json", False),
    ],
)
def test_request_v2_entity_selection_variants(name: str, valid: bool) -> None:
    folder = "valid" if valid else "invalid"
    value = load(f"fixtures/runtime/contract-parity/{folder}/{name}")
    schema = load("contracts/runtime/chat-turn-request-v2.schema.json")
    value_schema = {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$ref": "#/$defs/clarificationResponse/properties/value",
        "$defs": schema["$defs"],  # type: ignore[index]
    }
    errors = list(Draft202012Validator(value_schema).iter_errors(value))
    assert bool(errors) is not valid


@pytest.mark.parametrize("contract", ["chat-turn-request-v2", "chat-turn-response-v2"])
def test_complete_chat_fixtures_match_canonical_schema(contract: str) -> None:
    schema = load(f"contracts/runtime/{contract}.schema.json")
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    for path in sorted((ROOT / "fixtures" / "runtime" / contract / "valid").glob("*.json")):
        validator.validate(json.loads(path.read_text(encoding="utf-8")))
    for path in sorted((ROOT / "fixtures" / "runtime" / contract / "invalid").glob("*.json")):
        assert list(validator.iter_errors(json.loads(path.read_text(encoding="utf-8")))), path.name


def test_invalid_fixture_expectations_cover_all_complete_chat_failures() -> None:
    expectations = load("fixtures/runtime/invalid-expectations.json")
    assert isinstance(expectations, dict)
    actual = {
        path.relative_to(ROOT / "fixtures" / "runtime").as_posix()
        for contract in ("chat-turn-request-v2", "chat-turn-response-v2")
        for path in (ROOT / "fixtures" / "runtime" / contract / "invalid").glob("*.json")
    }
    assert set(expectations) == actual
    assert set(expectations.values()) == {"SCHEMA_REJECTED"}
