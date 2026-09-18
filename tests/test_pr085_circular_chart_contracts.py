from __future__ import annotations

import json
from collections.abc import Callable
from copy import deepcopy
from pathlib import Path
from typing import Any

import pytest
from jsonschema import Draft202012Validator
from pydantic import ValidationError

from erp_rag_contracts.models import runtime_v2

ROOT = Path(__file__).resolve().parents[1]


def chart_payload(series_type: str = "pie") -> dict[str, Any]:
    return {
        "block_version": "1.0",
        "block_id": "sales-share",
        "kind": "chart",
        "title": "Participación de ventas",
        "family": "circular",
        "category_field": "Category",
        "series": [
            {
                "field": "Amount",
                "type": series_type,
                "label": "Ventas",
                "aggregation": "none",
            }
        ],
    }


def schema_validator(slug: str = "chart-block-v1") -> Draft202012Validator:
    schema = json.loads(
        (ROOT / f"contracts/runtime/{slug}.schema.json").read_text(encoding="utf-8")
    )
    return Draft202012Validator(schema)


def assert_valid(payload: dict[str, Any]) -> None:
    schema_validator().validate(payload)
    runtime_v2.ChartBlockV1.model_validate(payload)


def assert_invalid(payload: dict[str, Any]) -> None:
    assert list(schema_validator().iter_errors(payload))
    with pytest.raises(ValidationError):
        runtime_v2.ChartBlockV1.model_validate(payload)


def test_existing_cartesian_chart_remains_valid() -> None:
    payload = chart_payload("bar")
    payload.update(family="cartesian", orientation="horizontal")
    payload["series"][0].update(aggregation="sum", axis="amount")

    assert_valid(payload)


@pytest.mark.parametrize("series_type", ["pie", "doughnut"])
def test_circular_chart_accepts_supported_type(series_type: str) -> None:
    assert_valid(chart_payload(series_type))


def test_circular_chart_rejects_multiple_series() -> None:
    payload = chart_payload()
    payload["series"].append(deepcopy(payload["series"][0]))

    assert_invalid(payload)


@pytest.mark.parametrize(
    "mutate",
    [
        lambda payload: payload.update(orientation="vertical"),
        lambda payload: payload["series"][0].update(axis="amount"),
    ],
)
def test_circular_chart_rejects_cartesian_axis_options(
    mutate: Callable[[dict[str, Any]], None],
) -> None:
    payload = chart_payload()
    mutate(payload)

    assert_invalid(payload)


def test_circular_chart_rejects_cartesian_series_type() -> None:
    assert_invalid(chart_payload("bar"))


def test_circular_chart_rejects_non_none_aggregation() -> None:
    payload = chart_payload()
    payload["series"][0]["aggregation"] = "sum"

    assert_invalid(payload)


def test_query_draft_keeps_cross_document_role_validation_in_pydantic() -> None:
    payload = json.loads(
        (ROOT / "fixtures/runtime/pr01-query-presentation/valid/minimum.json").read_text(
            encoding="utf-8"
        )
    )
    amount = payload["proposed_result_semantics"]["columns"][0]
    amount["ordinal"] = 1
    payload["proposed_result_semantics"]["columns"].insert(
        0,
        {
            "proposed_semantic_column_version": "2.0",
            "ordinal": 0,
            "key": "Category",
            "role": "dimension",
            "semantic_type": "category",
            "aggregation": "none",
            "presentation_support": False,
        },
    )
    payload["presentation_plan"]["blocks"] = [chart_payload()]
    payload["presentation_plan"]["blocks"][0]["series"][0]["field"] = "VentaTotal"

    schema_validator("query-sql-draft-v6").validate(payload)
    runtime_v2.QuerySqlDraftV6.model_validate(payload)

    payload["proposed_result_semantics"]["columns"][0]["role"] = "measure"
    schema_validator("query-sql-draft-v6").validate(payload)
    with pytest.raises(ValidationError, match="chart category must target a semantic dimension"):
        runtime_v2.QuerySqlDraftV6.model_validate(payload)
