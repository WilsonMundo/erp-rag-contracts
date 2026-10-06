"""Normative Generic Analytics presentation bindings (PR-75B0A)."""

from typing import Annotated, Literal, Self

from pydantic import ConfigDict, Field, StrictStr, model_validator

from .runtime import PresentationValueFormat, RuntimeContractModel

AnalyticsBlockIdentifier = Annotated[StrictStr, Field(pattern=r"^[a-z][a-z0-9_]{0,63}$")]
AnalyticsChartField = Annotated[StrictStr, Field(min_length=1, max_length=128)]

# Chart series presentation format. Reuses the shared `PresentationValueFormat` tokens and adds
# `fraction_percent` for a raw *fraction* that must display as a percentage (0.083667 -> "8.37 %").
# `percent` stays percentage-points (rendered as-is) and is not emitted by chart series today.
AnalyticsChartSeriesFormatV1 = Literal[
    "auto", "number", "integer", "currency", "percent", "fraction_percent"
]


class AnalyticsChartSeriesV1(RuntimeContractModel):
    field: AnalyticsChartField
    # Optional for backward compatibility: historical artifacts without it keep the numeric default.
    format: AnalyticsChartSeriesFormatV1 | None = None


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


class AnalyticsKpiPresentationV1(RuntimeContractModel):
    value_field: AnalyticsChartField
    selection: Literal["single_row"]
    # Shared presentation taxonomy with MaterializedKpiBlockV1.format (Query V2).
    format: PresentationValueFormat


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
                },
                {
                    "if": {"properties": {"kind": {"const": "kpi"}}, "required": ["kind"]},
                    "then": {"required": ["kpi"], "properties": {"kpi": {"type": "object"}}},
                    "else": {"properties": {"kpi": {"type": "null"}}},
                },
            ],
        },
    )

    block_id: AnalyticsBlockIdentifier
    source_output_id: AnalyticsBlockIdentifier
    kind: Literal["table", "kpi", "chart"]
    chart: AnalyticsChartPresentationV1 | None = None
    # Historical reads retain absent metadata; new writes call require_kpi().
    kpi: AnalyticsKpiPresentationV1 | None = None

    @model_validator(mode="after")
    def validate_kpi_kind(self) -> Self:
        if self.kind != "kpi" and self.kpi is not None:
            raise ValueError("kpi metadata is only allowed when kind is kpi")
        return self

    def require_kpi(self) -> None:
        if self.kind == "kpi" and self.kpi is None:
            raise ValueError("new KPI writes/rendering require explicit KPI metadata")

    @model_validator(mode="after")
    def validate_chart(self) -> Self:
        if (self.kind == "chart") != (self.chart is not None):
            raise ValueError("chart metadata is required exactly when kind is chart")
        return self
