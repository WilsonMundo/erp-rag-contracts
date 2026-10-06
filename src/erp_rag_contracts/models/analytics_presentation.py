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
    # Optional human-facing legend label declared by the artifact. When absent the renderer falls
    # back to the field name; it is never derived from the operation by the client.
    label: Annotated[StrictStr, Field(min_length=1, max_length=160)] | None = None
    # Optional for backward compatibility: historical artifacts without it keep the numeric default.
    format: AnalyticsChartSeriesFormatV1 | None = None
    color_role: Literal["primary", "secondary"] | None = None
    line_style: Literal["solid", "dash"] | None = None


class AnalyticsChartEvidenceV1(RuntimeContractModel):
    """Per-category values supplied by Python in operation metadata, never derived by UI."""

    field: AnalyticsChartField
    label: Annotated[StrictStr, Field(min_length=1, max_length=160)]
    format: AnalyticsChartSeriesFormatV1 = "number"


class AnalyticsChartPresentationV1(RuntimeContractModel):
    type: Literal["bar", "line", "area"]
    orientation: Literal["horizontal", "vertical"]
    category_field: AnalyticsChartField
    series: Annotated[list[AnalyticsChartSeriesV1], Field(min_length=1, max_length=1000)]
    evidence: AnalyticsChartEvidenceV1 | None = None
    category_labels_field: AnalyticsChartField | None = None

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


# Where a summary item resolves its value from the executed GenericAnalyticsResult: a field of
# the declared output row, or a field of the operation-specific metadata object
# (`result.metadata[<operation>]`). Both are closed fields validated against the operation's
# contractual output; this is deliberately not an arbitrary path/JSONPath expression.
AnalyticsSummaryValueSourceV1 = Literal["row", "metadata"]
AnalyticsSummaryRoleV1 = Literal[
    "evidence",
    "conclusion",
    "explanation",
    "technical",
    "title",
    "subtitle",
    "chart_title",
    "chart_context",
]


class AnalyticsSummaryItemV1(RuntimeContractModel):
    label: Annotated[StrictStr, Field(min_length=1, max_length=160)]
    source: AnalyticsSummaryValueSourceV1
    field: AnalyticsChartField
    # Shared presentation taxonomy; the artifact declares HOW to display, never the value.
    format: AnalyticsChartSeriesFormatV1 = "auto"
    role: AnalyticsSummaryRoleV1 = "evidence"
    unit_field: AnalyticsChartField | None = None
    precision: Annotated[int, Field(ge=0, le=8)] | None = None


class AnalyticsSummaryPresentationV1(RuntimeContractModel):
    items: Annotated[list[AnalyticsSummaryItemV1], Field(min_length=1, max_length=20)]

    @model_validator(mode="after")
    def validate_items(self) -> Self:
        keys = [(item.source, item.field, item.role) for item in self.items]
        if len(set(keys)) != len(keys):
            raise ValueError("summary items must reference distinct result fields")
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
                },
                {
                    "if": {"properties": {"kind": {"const": "kpi"}}, "required": ["kind"]},
                    "then": {"required": ["kpi"], "properties": {"kpi": {"type": "object"}}},
                    "else": {"properties": {"kpi": {"type": "null"}}},
                },
                {
                    "if": {"properties": {"kind": {"const": "summary"}}, "required": ["kind"]},
                    "then": {
                        "required": ["summary"],
                        "properties": {"summary": {"type": "object"}},
                    },
                    "else": {"properties": {"summary": {"type": "null"}}},
                },
            ],
        },
    )

    block_id: AnalyticsBlockIdentifier
    source_output_id: AnalyticsBlockIdentifier
    kind: Literal["table", "kpi", "chart", "summary"]
    chart: AnalyticsChartPresentationV1 | None = None
    # Historical reads retain absent metadata; new writes call require_kpi().
    kpi: AnalyticsKpiPresentationV1 | None = None
    # Historical reads retain absent metadata; new writes call require_summary().
    summary: AnalyticsSummaryPresentationV1 | None = None

    @model_validator(mode="after")
    def validate_kpi_kind(self) -> Self:
        if self.kind != "kpi" and self.kpi is not None:
            raise ValueError("kpi metadata is only allowed when kind is kpi")
        return self

    def require_kpi(self) -> None:
        if self.kind == "kpi" and self.kpi is None:
            raise ValueError("new KPI writes/rendering require explicit KPI metadata")

    @model_validator(mode="after")
    def validate_summary_kind(self) -> Self:
        if self.kind != "summary" and self.summary is not None:
            raise ValueError("summary metadata is only allowed when kind is summary")
        return self

    def require_summary(self) -> None:
        if self.kind == "summary" and self.summary is None:
            raise ValueError("new summary writes/rendering require explicit summary metadata")

    @model_validator(mode="after")
    def validate_chart(self) -> Self:
        if (self.kind == "chart") != (self.chart is not None):
            raise ValueError("chart metadata is required exactly when kind is chart")
        return self
