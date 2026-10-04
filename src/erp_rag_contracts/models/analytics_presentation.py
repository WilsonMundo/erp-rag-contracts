"""Normative Generic Analytics presentation bindings (PR-75B0A)."""

from typing import Annotated, Literal, Self

from pydantic import ConfigDict, Field, StrictStr, model_validator

from .runtime import RuntimeContractModel

AnalyticsBlockIdentifier = Annotated[StrictStr, Field(pattern=r"^[a-z][a-z0-9_]{0,63}$")]
AnalyticsChartField = Annotated[StrictStr, Field(min_length=1, max_length=128)]


class AnalyticsChartSeriesV1(RuntimeContractModel):
    field: AnalyticsChartField


class AnalyticsChartPresentationV1(RuntimeContractModel):
    type: Literal["bar", "line", "area"]
    orientation: Literal["horizontal", "vertical"]
    category_field: AnalyticsChartField
    series: Annotated[list[AnalyticsChartSeriesV1], Field(min_length=1, max_length=1000)]

    @model_validator(mode="after")
    def validate_series(self) -> Self:
        fields = [series.field for series in self.series]
        if len(set(fields)) != len(fields) or self.category_field in fields:
            raise ValueError("chart series must be unique and distinct from its category")
        return self


class AnalyticsPresentationBlockV1(RuntimeContractModel):
    model_config = ConfigDict(
        extra="forbid",
        validate_assignment=True,
        populate_by_name=True,
        str_strip_whitespace=True,
        json_schema_extra={
            "allOf": [
                {
                    "if": {"properties": {"kind": {"const": "chart"}}, "required": ["kind"]},
                    "then": {"required": ["chart"], "properties": {"chart": {"type": "object"}}},
                    "else": {"properties": {"chart": {"type": "null"}}},
                }
            ],
        },
    )

    block_id: AnalyticsBlockIdentifier
    source_output_id: AnalyticsBlockIdentifier
    kind: Literal["table", "kpi", "chart"]
    chart: AnalyticsChartPresentationV1 | None = None

    @model_validator(mode="after")
    def validate_chart(self) -> Self:
        if (self.kind == "chart") != (self.chart is not None):
            raise ValueError("chart metadata is required exactly when kind is chart")
        return self
