from __future__ import annotations

import json
from collections.abc import Callable
from copy import deepcopy
from pathlib import Path
from typing import Any

import pytest
from jsonschema import Draft202012Validator
from pydantic import TypeAdapter, ValidationError

from erp_rag_contracts.models import runtime_v2

ROOT = Path(__file__).resolve().parents[1]


def load(relative: str) -> Any:
    return json.loads((ROOT / relative).read_text(encoding="utf-8"))


def validator(slug: str) -> Draft202012Validator:
    schema = load(f"contracts/runtime/{slug}.schema.json")
    return Draft202012Validator(schema)


def test_completed_profile_expresses_renderer_and_widget_capabilities() -> None:
    payload = load("fixtures/runtime/pr06a-presentation-capabilities/valid/profile.json")

    validator("presentation-capability-profile-v1").validate(payload)
    profile = runtime_v2.PresentationCapabilityProfileV1.model_validate(payload)

    assert (profile.profile_id, profile.renderer, profile.renderer_version) == (
        "devextreme-26",
        "devextreme-angular",
        "26",
    )
    assert profile.effective_package_version == "26.1.4"
    assert profile.data_grid is not None and "export" in profile.data_grid.features
    assert profile.pivot_grid is not None and "drilldown" in profile.pivot_grid.features
    assert profile.chart is not None
    assert "mixed_series" in profile.chart.features
    assert profile.gauge is not None and profile.gauge.types == ["circular", "linear"]

    legacy_payload = {
        key: payload[key]
        for key in (
            "presentation_capability_profile_version",
            "profile_id",
            "block_kinds",
            "chart_families",
            "chart_series_types",
            "aggregations",
            "max_blocks",
            "max_chart_categories",
            "max_chart_series",
        )
    }
    validator("presentation-capability-profile-v1").validate(legacy_payload)
    runtime_v2.PresentationCapabilityProfileV1.model_validate(legacy_payload)


def test_expanded_blocks_and_legacy_v6_payload_are_both_valid() -> None:
    expanded = load("fixtures/runtime/pr06a-presentation-capabilities/valid/expanded-plan.json")
    validator("presentation-plan-v2").validate(expanded)
    plan = runtime_v2.PresentationPlanV2.model_validate(expanded)

    grid = next(block for block in plan.blocks if isinstance(block, runtime_v2.DataGridBlockV1))
    pivot = next(block for block in plan.blocks if isinstance(block, runtime_v2.PivotGridBlockV1))
    chart = next(block for block in plan.blocks if isinstance(block, runtime_v2.ChartBlockV1))
    gauge = next(block for block in plan.blocks if isinstance(block, runtime_v2.GaugeBlockV1))
    assert "filtering" in grid.features
    assert "expand_collapse" in pivot.features
    assert chart.orientation == "vertical" and {series.axis for series in chart.series} == {
        "amount",
        "target",
    }
    assert gauge.gauge_type == "linear"

    legacy = load("fixtures/runtime/pr01-query-presentation/valid/minimum.json")
    validator("query-sql-draft-v6").validate(legacy)
    runtime_v2.QuerySqlDraftV6.model_validate(legacy)


@pytest.mark.parametrize(
    ("slug", "model", "mutate"),
    (
        (
            "presentation-capability-profile-v1",
            runtime_v2.PresentationCapabilityProfileV1,
            lambda value: value["data_grid"].update(features=["editing"]),
        ),
        (
            "presentation-plan-v2",
            runtime_v2.PresentationPlanV2,
            lambda value: value["blocks"][0].update(features=["editing"]),
        ),
        (
            "presentation-plan-v2",
            runtime_v2.PresentationPlanV2,
            lambda value: value["blocks"][1].update(features=["calculated_fields"]),
        ),
        (
            "presentation-plan-v2",
            runtime_v2.PresentationPlanV2,
            lambda value: value["blocks"][3].update(gauge_type="radial"),
        ),
    ),
)
def test_unknown_semantic_capability_is_rejected_by_schema_and_model(
    slug: str, model: type[object], mutate: Callable[[dict[str, Any]], None]
) -> None:
    source = (
        "fixtures/runtime/pr06a-presentation-capabilities/valid/profile.json"
        if slug == "presentation-capability-profile-v1"
        else "fixtures/runtime/pr06a-presentation-capabilities/valid/expanded-plan.json"
    )
    payload = deepcopy(load(source))
    mutate(payload)

    assert list(validator(slug).iter_errors(payload))
    with pytest.raises(ValidationError):
        TypeAdapter(model).validate_python(payload)
