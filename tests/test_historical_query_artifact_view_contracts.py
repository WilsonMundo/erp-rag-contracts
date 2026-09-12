from __future__ import annotations

import json
from copy import deepcopy
from pathlib import Path
from typing import Any

import pytest
from jsonschema import Draft202012Validator, FormatChecker
from pydantic import ValidationError

from erp_rag_contracts.models import runtime_v2

ROOT = Path(__file__).resolve().parents[1]


def load(relative: str) -> Any:
    return json.loads((ROOT / relative).read_text(encoding="utf-8"))


def validator(slug: str) -> Draft202012Validator:
    schema = load(f"contracts/runtime/{slug}.schema.json")
    return Draft202012Validator(schema, format_checker=FormatChecker())


@pytest.mark.parametrize("name", ("minimum", "date-range"))
def test_historical_query_artifact_view_accepts_public_fixtures(name: str) -> None:
    payload = load(f"fixtures/runtime/historical-query-artifact-view-v1/valid/{name}.json")

    validator("historical-query-artifact-view-v1").validate(payload)
    view = runtime_v2.HistoricalQueryArtifactViewV1.model_validate(payload)

    assert view.query_artifact_id == "artifact-001"
    assert all(parameter.name != "internal_tenant" for parameter in view.requery_parameters)


def test_historical_requery_value_is_the_effective_execution_value() -> None:
    artifact = load("fixtures/runtime/pr01-query-artifact/valid/minimum.json")
    artifact["parameters"][0]["value"] = "2026-08-01T00:00:00-06:00"
    historical = load("fixtures/runtime/historical-query-artifact-view-v1/valid/date-range.json")

    durable = runtime_v2.QueryArtifactV1.model_validate(artifact)
    view = runtime_v2.HistoricalQueryArtifactViewV1.model_validate(historical)

    assert durable.parameters[0].value == "2026-08-01T00:00:00-06:00"
    assert view.requery_parameters[0].value == "2026-09-01T00:00:00-06:00"
    assert "rebindable" not in historical["requery_parameters"][0]


@pytest.mark.parametrize(
    "field",
    (
        "sql",
        "ast_fingerprint",
        "catalog_sha256",
        "semantics",
        "presentation_plan",
        "capability_profile",
    ),
)
def test_historical_query_artifact_view_rejects_internal_fields(field: str) -> None:
    payload = load(f"fixtures/runtime/historical-query-artifact-view-v1/invalid/{field}.json")

    assert list(validator("historical-query-artifact-view-v1").iter_errors(payload))
    with pytest.raises(ValidationError):
        runtime_v2.HistoricalQueryArtifactViewV1.model_validate(payload)


def test_historical_result_uses_redacted_view_and_keeps_requery_capability() -> None:
    payload = load(
        "fixtures/runtime/assistant-historical-result-v2/valid/public-query-artifact.json"
    )

    validator("assistant-historical-result-v2").validate(payload)
    result = runtime_v2.AssistantHistoricalResultV2.model_validate(payload)

    assert isinstance(result.query_artifact, runtime_v2.HistoricalQueryArtifactViewV1)
    assert result.requery.available is True
    leaked = deepcopy(payload)
    leaked["query_artifact"]["sql"] = "SELECT 1"
    assert list(validator("assistant-historical-result-v2").iter_errors(leaked))
    with pytest.raises(ValidationError):
        runtime_v2.AssistantHistoricalResultV2.model_validate(leaked)


def test_internal_artifact_and_historical_requery_result_remain_valid() -> None:
    artifact = load("fixtures/runtime/pr01-query-artifact/valid/minimum.json")
    requery_result = load(
        "fixtures/runtime/assistant-historical-requery-result-v2/valid/minimum.json"
    )

    validator("query-artifact-v1").validate(artifact)
    runtime_v2.QueryArtifactV1.model_validate(artifact)
    validator("assistant-historical-requery-result-v2").validate(requery_result)
    runtime_v2.AssistantHistoricalRequeryResultV2.model_validate(requery_result)
