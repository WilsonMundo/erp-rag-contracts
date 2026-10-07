from __future__ import annotations

from datetime import datetime
from typing import Annotated, Any, Literal, TypeAlias, get_args

from pydantic import ConfigDict, Field, model_validator

from .runtime import (
    EntityType,
    Identifier,
    PresentationValueFormat,
    QueryParameterDraftV2,
    RuntimeContractModel,
)

NonEmptyText = Annotated[str, Field(min_length=1, max_length=500)]
ContractId = Annotated[str, Field(pattern=r"^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$")]
Sha256 = Annotated[str, Field(pattern=r"^sha256:[0-9a-f]{64}$")]
BlockKind = Literal["kpi", "comparison_kpi", "data_grid", "pivot_grid", "chart", "gauge"]
DataGridFeature = Literal[
    "sorting",
    "filtering",
    "grouping",
    "search",
    "paging",
    "column_chooser",
    "summaries",
    "export",
]
PivotGridFeature = Literal[
    "rows",
    "columns",
    "values",
    "filtering",
    "sorting",
    "totals",
    "subtotals",
    "expand_collapse",
    "drilldown",
    "export",
]
ChartFeature = Literal["mixed_series", "multiple_series", "multiple_axes"]
ChartStackingMode = Literal["none", "stacked", "full_stacked"]
ChartOrientation = Literal["vertical", "horizontal"]
GaugeType = Literal["circular", "linear"]
GaugeFeature = Literal["target_indicator", "ranges"]

_CIRCULAR_CHART_SCHEMA: dict[str, Any] = {
    "allOf": [
        {
            "if": {
                "properties": {"family": {"const": "circular"}},
                "required": ["family"],
            },
            "then": {
                "properties": {
                    "orientation": {"type": "null"},
                    "series": {
                        "maxItems": 1,
                        "minItems": 1,
                        "items": {
                            "properties": {
                                "aggregation": {"const": "none"},
                                "axis": {"type": "null"},
                                "type": {"enum": ["pie", "doughnut"]},
                            }
                        },
                    },
                }
            },
        }
    ]
}

_MATERIALIZED_CIRCULAR_CHART_SCHEMA: dict[str, Any] = {
    "allOf": [
        {
            "if": {
                "properties": {"family": {"const": "circular"}},
                "required": ["family"],
            },
            "then": {
                "properties": {
                    "orientation": {"type": "null"},
                    "series": {
                        "maxItems": 1,
                        "minItems": 1,
                        "items": {
                            "properties": {
                                "axis": {"type": "null"},
                                "type": {"enum": ["pie", "doughnut"]},
                            }
                        },
                    },
                }
            },
        }
    ]
}
QueryShape = Literal[
    "scalar", "detail", "grouped_aggregate", "ranking", "comparison", "distribution", "trend"
]
JsonScalar: TypeAlias = str | int | float | bool | None


class PresentationPreferenceV1(RuntimeContractModel):
    presentation_preference_version: Literal["1.0"]
    mode: Literal["auto", "include", "only"]
    required: Annotated[list[BlockKind], Field(max_length=6)]

    @model_validator(mode="after")
    def validate_mode(self) -> PresentationPreferenceV1:
        if len(set(self.required)) != len(self.required):
            raise ValueError("required block kinds must be unique")
        if self.mode == "auto" and self.required:
            raise ValueError("auto mode forbids required blocks")
        if self.mode != "auto" and not self.required:
            raise ValueError("include and only modes require blocks")
        return self


class IntentClassificationV2(RuntimeContractModel):
    intent_classification_version: Literal["2.0"]
    intent: Literal[
        "chat", "query", "skill", "attachment", "analytics", "deny", "unsupported", "clarification"
    ]
    reason: Literal[
        "erp_general",
        "erp_data_query",
        "erp_operation",
        "erp_attachment",
        "erp_analytics",
        "out_of_domain",
        "erp_unsupported",
        "ambiguous",
    ]
    is_erp_related: bool
    confidence: Annotated[float, Field(ge=0, le=1)]
    requires_clarification: bool
    missing_information: Annotated[
        list[
            Literal[
                "query_type",
                "period",
                "metric",
                "filters",
                "grouping",
                "entity",
                "operation",
                "attachment_purpose",
            ]
        ],
        Field(max_length=20),
    ]
    task_kind: QueryShape | None = None
    analysis_intent: (
        Literal[
            "none",
            "identify_highest",
            "identify_lowest",
            "compare",
            "describe_distribution",
            "analyze_trend",
        ]
        | None
    ) = None
    presentation_preference: PresentationPreferenceV1

    @model_validator(mode="after")
    def validate_clarification(self) -> IntentClassificationV2:
        if self.requires_clarification != bool(self.missing_information):
            raise ValueError("clarification flag and missing_information must match")
        return self


class AllMatchesSelectionV1(RuntimeContractModel):
    kind: Literal["all_matches"]


class TopNSelectionV1(RuntimeContractModel):
    kind: Literal["top_n"]
    limit: Annotated[int, Field(ge=1, le=500)]
    order_field: Identifier
    direction: Literal["ascending", "descending"]
    scope: Literal["global", "per_group"] = "global"
    partition_fields: Annotated[
        list[Identifier], Field(max_length=20, json_schema_extra={"uniqueItems": True})
    ] = Field(default_factory=list)

    @model_validator(mode="after")
    def validate_scope(self) -> TopNSelectionV1:
        if len(set(self.partition_fields)) != len(self.partition_fields):
            raise ValueError("top_n partition fields must be unique")
        if self.scope == "global" and self.partition_fields:
            raise ValueError("global top_n forbids partition fields")
        if self.scope == "per_group" and not self.partition_fields:
            raise ValueError("per_group top_n requires partition fields")
        return self


class SampleSelectionV1(RuntimeContractModel):
    kind: Literal["sample"]
    limit: Annotated[int, Field(ge=1, le=500)]


ResultSetSelectionV1 = Annotated[
    AllMatchesSelectionV1 | TopNSelectionV1 | SampleSelectionV1,
    Field(discriminator="kind"),
]


class ResultSetSemanticsV1(RuntimeContractModel):
    result_set_semantics_version: Literal["1.0"]
    selection: ResultSetSelectionV1


class ResultScopeV1(RuntimeContractModel):
    result_scope_version: Literal["1.0"]
    source_query_execution_id: ContractId
    entity: ContractId
    key_semantic_roles: Annotated[
        list[ContractId], Field(min_length=1, max_length=8, json_schema_extra={"uniqueItems": True})
    ]
    selection_kind: Literal["displayed_result"]
    row_count: Annotated[int, Field(ge=0)]

    @model_validator(mode="after")
    def validate_key_semantic_roles(self) -> ResultScopeV1:
        if len(set(self.key_semantic_roles)) != len(self.key_semantic_roles):
            raise ValueError("key semantic roles must be unique")
        return self


class ResultSetBindingV1(RuntimeContractModel):
    result_set_binding_version: Literal["1.0"]
    binding_id: Literal["selected_scope_entities"]
    source: Literal["prior_result_entity_set"]
    source_query_execution_id: ContractId
    source_entity: ContractId
    source_key_semantic_roles: Annotated[
        list[ContractId], Field(min_length=1, max_length=8, json_schema_extra={"uniqueItems": True})
    ]
    target_semantic_roles: Annotated[
        list[ContractId], Field(min_length=1, max_length=8, json_schema_extra={"uniqueItems": True})
    ]

    @model_validator(mode="after")
    def validate_semantic_roles(self) -> ResultSetBindingV1:
        if len(set(self.source_key_semantic_roles)) != len(self.source_key_semantic_roles):
            raise ValueError("source key semantic roles must be unique")
        if len(set(self.target_semantic_roles)) != len(self.target_semantic_roles):
            raise ValueError("target semantic roles must be unique")
        if len(self.source_key_semantic_roles) != len(self.target_semantic_roles):
            raise ValueError("source and target semantic role cardinality must match")
        return self


class ProposedSemanticColumnV2(RuntimeContractModel):
    proposed_semantic_column_version: Literal["2.0"]
    ordinal: Annotated[int, Field(ge=0, le=199)]
    key: Identifier
    role: Literal["identifier", "dimension", "measure", "unknown"]
    semantic_type: Literal[
        "identifier",
        "category",
        "number",
        "currency",
        "percent",
        "date",
        "datetime",
        "boolean",
        "unknown",
    ]
    aggregation: Literal["none", "sum", "count", "avg", "min", "max", "unknown"]
    presentation_support: bool = False


class ProposedResultSemanticsV2(RuntimeContractModel):
    version: Literal["2.0"]
    shape: QueryShape
    result_set: ResultSetSemanticsV1
    primary_result_scope_entity: ContractId | None = None
    columns: Annotated[list[ProposedSemanticColumnV2], Field(max_length=200)]

    @model_validator(mode="after")
    def validate_columns(self) -> ProposedResultSemanticsV2:
        if len({item.ordinal for item in self.columns}) != len(self.columns):
            raise ValueError("column ordinals must be unique")
        if len({item.key for item in self.columns}) != len(self.columns):
            raise ValueError("column keys must be unique")
        selection = self.result_set.selection
        if isinstance(selection, TopNSelectionV1) and selection.order_field not in {
            item.key for item in self.columns
        }:
            raise ValueError("top_n order_field must reference a semantic column")
        if isinstance(selection, TopNSelectionV1) and not set(selection.partition_fields) <= {
            item.key for item in self.columns
        }:
            raise ValueError("top_n partition fields must reference semantic columns")
        return self


class FieldValueReferenceV1(RuntimeContractModel):
    source: Literal["field"]
    field: Identifier


class ResultAggregateValueReferenceV1(RuntimeContractModel):
    source: Literal["result_aggregate"]
    scope: Literal["result_set"]
    field: Identifier
    aggregation: Literal["sum", "avg", "min", "max", "count"]


class ResolvedReferenceValueReferenceV1(RuntimeContractModel):
    source: Literal["resolved_reference"]
    reference_id: ContractId


ValueReferenceV1 = Annotated[
    FieldValueReferenceV1 | ResultAggregateValueReferenceV1 | ResolvedReferenceValueReferenceV1,
    Field(discriminator="source"),
]


class ResolvedBusinessReferenceV1(RuntimeContractModel):
    resolved_business_reference_version: Literal["1.0"]
    reference_id: ContractId
    reference_type: Literal["target", "goal", "budget", "threshold"]
    label: NonEmptyText
    value: JsonScalar
    semantic_type: Literal["number", "currency", "percent", "date", "datetime"]
    source_id: ContractId
    resolved_at: datetime


class ResolvedBusinessReferenceContextV1(RuntimeContractModel):
    resolved_business_reference_context_version: Literal["1.0"]
    references: Annotated[list[ResolvedBusinessReferenceV1], Field(max_length=50)]

    @model_validator(mode="after")
    def validate_references(self) -> ResolvedBusinessReferenceContextV1:
        if len({item.reference_id for item in self.references}) != len(self.references):
            raise ValueError("business reference ids must be unique")
        return self


class PresentationLayoutV1(RuntimeContractModel):
    presentation_layout_version: Literal["1.0"]
    mode: Literal["flow", "grid"]
    columns: Annotated[int, Field(ge=1, le=12)] | None = None

    @model_validator(mode="after")
    def validate_columns(self) -> PresentationLayoutV1:
        if (self.mode == "grid") != (self.columns is not None):
            raise ValueError("grid layout requires columns and flow layout forbids them")
        return self


class KpiBlockV1(RuntimeContractModel):
    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["kpi"]
    title: NonEmptyText
    value: ValueReferenceV1
    format: PresentationValueFormat = "auto"


class ComparisonKpiValueV1(RuntimeContractModel):
    label: NonEmptyText
    value: ValueReferenceV1
    format: PresentationValueFormat = "auto"


class ComparisonKpiChangeV1(RuntimeContractModel):
    value: ValueReferenceV1
    format: PresentationValueFormat = "percent"


class ComparisonKpiBlockV1(RuntimeContractModel):
    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["comparison_kpi"]
    title: NonEmptyText
    current: ComparisonKpiValueV1
    previous: ComparisonKpiValueV1
    change: ComparisonKpiChangeV1


class DataGridBlockV1(RuntimeContractModel):
    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["data_grid"]
    title: NonEmptyText
    fields: Annotated[list[Identifier], Field(min_length=1, max_length=100)]
    features: Annotated[list[DataGridFeature], Field(max_length=8)] = Field(default_factory=list)


class PivotValueV1(RuntimeContractModel):
    field: Identifier
    aggregation: Literal["sum", "avg", "min", "max", "count"]


class PivotGridBlockV1(RuntimeContractModel):
    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["pivot_grid"]
    title: NonEmptyText
    rows: Annotated[list[Identifier], Field(min_length=1, max_length=20)]
    columns: Annotated[list[Identifier], Field(max_length=20)]
    values: Annotated[list[PivotValueV1], Field(min_length=1, max_length=20)]
    features: Annotated[list[PivotGridFeature], Field(max_length=10)] = Field(default_factory=list)


class ChartSeriesV2(RuntimeContractModel):
    field: Identifier
    type: ContractId
    label: NonEmptyText
    aggregation: Literal["none", "sum", "avg", "min", "max", "count"] = "none"
    axis: ContractId | None = None


class ChartBlockV1(RuntimeContractModel):
    model_config = ConfigDict(json_schema_extra=_CIRCULAR_CHART_SCHEMA)

    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["chart"]
    title: NonEmptyText
    family: ContractId
    category_field: Identifier
    series: Annotated[list[ChartSeriesV2], Field(min_length=1, max_length=20)]
    orientation: ChartOrientation | None = None

    @model_validator(mode="after")
    def validate_circular_chart(self) -> ChartBlockV1:
        if self.family != "circular":
            return self
        if len(self.series) != 1:
            raise ValueError("circular charts require exactly one series")
        series = self.series[0]
        if series.type not in {"pie", "doughnut"}:
            raise ValueError("circular chart series type must be pie or doughnut")
        if self.orientation is not None or series.axis is not None:
            raise ValueError("circular charts forbid orientation and series axis")
        if series.aggregation != "none":
            raise ValueError("circular chart series aggregation must be none")
        return self


class GaugeRangeV1(RuntimeContractModel):
    start: ValueReferenceV1
    end: ValueReferenceV1
    label: NonEmptyText


class GaugeBlockV1(RuntimeContractModel):
    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["gauge"]
    title: NonEmptyText
    value: ValueReferenceV1
    target: ValueReferenceV1 | None = None
    minimum: ValueReferenceV1 | None = None
    maximum: ValueReferenceV1 | None = None
    ranges: Annotated[list[GaugeRangeV1], Field(max_length=20)] = Field(default_factory=list)
    gauge_type: GaugeType = "circular"


PresentationBlockV2 = Annotated[
    KpiBlockV1
    | ComparisonKpiBlockV1
    | DataGridBlockV1
    | PivotGridBlockV1
    | ChartBlockV1
    | GaugeBlockV1,
    Field(discriminator="kind"),
]


class PresentationPlanV2(RuntimeContractModel):
    presentation_plan_version: Literal["2.0"]
    title: NonEmptyText
    capability_profile: ContractId
    blocks: Annotated[list[PresentationBlockV2], Field(min_length=1, max_length=20)]
    layout: PresentationLayoutV1

    @model_validator(mode="after")
    def validate_blocks(self) -> PresentationPlanV2:
        if len({item.block_id for item in self.blocks}) != len(self.blocks):
            raise ValueError("block ids must be unique")
        return self


class PresentationBlockResolutionV1(RuntimeContractModel):
    presentation_block_resolution_version: Literal["1.0"]
    block_id: ContractId
    status: Literal["materialized", "degraded"]
    code: (
        Literal[
            "BLOCK_FIELD_NOT_FOUND",
            "BLOCK_TYPE_INCOMPATIBLE",
            "BLOCK_AGGREGATION_UNSUPPORTED",
            "BLOCK_CAPABILITY_UNSUPPORTED",
            "BLOCK_CARDINALITY_EXCEEDED",
            "BLOCK_TRUNCATED_RESULT_UNSAFE",
            "BLOCK_REFERENCE_MISSING",
            "BLOCK_SCOPE_INVALID",
            "BLOCK_SCHEMA_INVALID",
        ]
        | None
    ) = None
    message: NonEmptyText | None = None

    @model_validator(mode="after")
    def validate_status(self) -> PresentationBlockResolutionV1:
        if self.status == "materialized" and (self.code is not None or self.message is not None):
            raise ValueError("materialized resolution forbids degradation details")
        if self.status == "degraded" and (self.code is None or self.message is None):
            raise ValueError("degraded resolution requires code and message")
        return self


class MaterializedScopeV1(RuntimeContractModel):
    kind: Literal["all_matches", "top_n", "sample"]
    label: NonEmptyText | None = None

    @model_validator(mode="after")
    def validate_label(self) -> MaterializedScopeV1:
        if self.kind != "all_matches" and self.label is None:
            raise ValueError("top_n and sample scopes require a visible label")
        return self


class MaterializedKpiBlockV1(RuntimeContractModel):
    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["kpi"]
    title: NonEmptyText
    value: JsonScalar
    format: PresentationValueFormat
    scope: MaterializedScopeV1


class MaterializedComparisonKpiValueV1(RuntimeContractModel):
    label: NonEmptyText
    value: JsonScalar
    format: PresentationValueFormat


class MaterializedComparisonKpiChangeV1(RuntimeContractModel):
    value: JsonScalar
    format: PresentationValueFormat
    direction: Literal["up", "down", "flat", "unknown"]
    sentiment: Literal["positive", "negative", "neutral", "unknown"]


class MaterializedComparisonKpiBlockV1(RuntimeContractModel):
    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["comparison_kpi"]
    title: NonEmptyText
    current: MaterializedComparisonKpiValueV1
    previous: MaterializedComparisonKpiValueV1
    change: MaterializedComparisonKpiChangeV1
    scope: MaterializedScopeV1


class MaterializedGridBlockV1(RuntimeContractModel):
    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["data_grid"]
    title: NonEmptyText
    fields: Annotated[list[Identifier], Field(min_length=1, max_length=100)]
    features: Annotated[list[DataGridFeature], Field(max_length=8)] = Field(default_factory=list)


class MaterializedPivotValueV1(RuntimeContractModel):
    field: Identifier
    aggregation: Literal["sum", "avg", "min", "max", "count"]


class MaterializedPivotBlockV1(RuntimeContractModel):
    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["pivot_grid"]
    title: NonEmptyText
    rows: list[Identifier]
    columns: list[Identifier]
    values: Annotated[list[MaterializedPivotValueV1], Field(min_length=1)]
    features: Annotated[list[PivotGridFeature], Field(max_length=10)] = Field(default_factory=list)


class MaterializedChartSeriesV1(RuntimeContractModel):
    field: Identifier
    type: ContractId
    label: NonEmptyText
    axis: ContractId | None = None


class MaterializedChartBlockV1(RuntimeContractModel):
    model_config = ConfigDict(json_schema_extra=_MATERIALIZED_CIRCULAR_CHART_SCHEMA)

    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["chart"]
    title: NonEmptyText
    family: ContractId
    category_field: Identifier
    series: Annotated[list[MaterializedChartSeriesV1], Field(min_length=1)]
    orientation: ChartOrientation | None = None

    @model_validator(mode="after")
    def validate_circular_chart(self) -> MaterializedChartBlockV1:
        if self.family != "circular":
            return self
        if len(self.series) != 1:
            raise ValueError("materialized circular charts require exactly one series")
        series = self.series[0]
        if series.type not in {"pie", "doughnut"}:
            raise ValueError("materialized circular chart type must be pie or doughnut")
        if self.orientation is not None or series.axis is not None:
            raise ValueError("materialized circular charts forbid orientation and series axis")
        return self


class MaterializedGaugeRangeV1(RuntimeContractModel):
    start: JsonScalar
    end: JsonScalar
    label: NonEmptyText


class MaterializedGaugeBlockV1(RuntimeContractModel):
    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["gauge"]
    title: NonEmptyText
    value: JsonScalar
    target: JsonScalar = None
    minimum: JsonScalar = None
    maximum: JsonScalar = None
    ranges: list[MaterializedGaugeRangeV1] = Field(default_factory=list)
    gauge_type: GaugeType = "circular"


MaterializedPresentationBlockV2 = Annotated[
    MaterializedKpiBlockV1
    | MaterializedComparisonKpiBlockV1
    | MaterializedGridBlockV1
    | MaterializedPivotBlockV1
    | MaterializedChartBlockV1
    | MaterializedGaugeBlockV1,
    Field(discriminator="kind"),
]


class MaterializedPresentationV2(RuntimeContractModel):
    materialized_presentation_version: Literal["2.0"]
    title: NonEmptyText
    capability_profile: ContractId
    blocks: Annotated[list[MaterializedPresentationBlockV2], Field(max_length=20)]
    resolutions: Annotated[list[PresentationBlockResolutionV1], Field(min_length=1, max_length=20)]
    layout: PresentationLayoutV1


class QuerySqlDraftV6(RuntimeContractModel):
    query_sql_draft_version: Literal["6.0"]
    sql: Annotated[str, Field(min_length=1, max_length=100000)]
    parameters: Annotated[list[QueryParameterDraftV2], Field(max_length=200)]
    proposed_result_semantics: ProposedResultSemanticsV2
    presentation_plan: PresentationPlanV2

    @model_validator(mode="after")
    def validate_presentation_fields(self) -> QuerySqlDraftV6:
        # Field-role relationships cross proposed_result_semantics and presentation_plan, so they
        # remain runtime validation; block-local circular invariants are also emitted as JSON Schema.
        columns = {item.key: item for item in self.proposed_result_semantics.columns}

        def validate_reference(reference: ValueReferenceV1) -> None:
            if (
                isinstance(reference, (FieldValueReferenceV1, ResultAggregateValueReferenceV1))
                and reference.field not in columns
            ):
                raise ValueError("value reference must target a semantic column")

        for block in self.presentation_plan.blocks:
            if isinstance(block, KpiBlockV1):
                validate_reference(block.value)
            elif isinstance(block, ComparisonKpiBlockV1):
                validate_reference(block.current.value)
                validate_reference(block.previous.value)
                validate_reference(block.change.value)
            elif isinstance(block, DataGridBlockV1):
                if any(field not in columns for field in block.fields):
                    raise ValueError("data grid fields must target semantic columns")
            elif isinstance(block, PivotGridBlockV1):
                dimensions = [*block.rows, *block.columns]
                if any(
                    field not in columns or columns[field].role != "dimension"
                    for field in dimensions
                ):
                    raise ValueError("pivot axes must target semantic dimensions")
                if any(
                    value.field not in columns or columns[value.field].role != "measure"
                    for value in block.values
                ):
                    raise ValueError("pivot values must target semantic measures")
            elif isinstance(block, ChartBlockV1):
                if (
                    block.category_field not in columns
                    or columns[block.category_field].role != "dimension"
                ):
                    raise ValueError("chart category must target a semantic dimension")
                if any(
                    series.field not in columns or columns[series.field].role != "measure"
                    for series in block.series
                ):
                    raise ValueError("chart series must target semantic measures")
            elif isinstance(block, GaugeBlockV1):
                validate_reference(block.value)
                for reference in (block.target, block.minimum, block.maximum):
                    if reference is not None:
                        validate_reference(reference)
                for gauge_range in block.ranges:
                    validate_reference(gauge_range.start)
                    validate_reference(gauge_range.end)
        return self


class QueryResultFormatV2(RuntimeContractModel):
    style: Literal["currency", "decimal", "percent", "date", "datetime"]
    currency: Annotated[str, Field(pattern=r"^[A-Z]{3}$")] | None = None


class QueryResultColumnV2(RuntimeContractModel):
    key: Identifier
    title: NonEmptyText
    type: Literal[
        "string", "boolean", "date", "datetime", "integer", "bigint", "decimal", "number", "guid"
    ]
    semantic_type: Literal[
        "unknown",
        "identifier",
        "category",
        "number",
        "currency",
        "percent",
        "date",
        "datetime",
        "boolean",
    ]
    aggregation: Literal["none", "sum", "count", "avg", "min", "max", "unknown"]
    nullable: bool
    format: QueryResultFormatV2 | None = None


class QueryAppliedFilterV2(RuntimeContractModel):
    key: ContractId
    label: NonEmptyText
    type: Literal["scalar", "date_range", "integer"]
    display: NonEmptyText
    value: JsonScalar = None
    start: datetime | None = None
    end_exclusive: datetime | None = None

    @model_validator(mode="after")
    def validate_range(self) -> QueryAppliedFilterV2:
        if (self.start is None) != (self.end_exclusive is None):
            raise ValueError("date range boundaries must be provided together")
        if self.type == "date_range" and self.start is None:
            raise ValueError("date_range requires start and end_exclusive")
        if self.type != "date_range" and (self.start is not None or self.end_exclusive is not None):
            raise ValueError("only date_range may define boundaries")
        return self


class QueryResultExecutionV2(RuntimeContractModel):
    duration_ms: Annotated[int, Field(ge=0)]
    ast_fingerprint: Sha256
    catalog_sha256: Sha256
    truncated: bool


class QueryResultV2(RuntimeContractModel):
    query_result_version: Literal["2.0"]
    query_id: ContractId
    result_id: ContractId
    result_fingerprint: Sha256
    status: Literal["completed"]
    semantics: ProposedResultSemanticsV2
    columns: Annotated[list[QueryResultColumnV2], Field(max_length=200)]
    rows: Annotated[list[dict[str, JsonScalar]], Field(max_length=700)]
    row_count: Annotated[int, Field(ge=0)]
    applied_filters: Annotated[list[QueryAppliedFilterV2], Field(max_length=100)]
    presentation: MaterializedPresentationV2
    execution: QueryResultExecutionV2

    @model_validator(mode="after")
    def validate_row_count(self) -> QueryResultV2:
        if self.row_count != len(self.rows):
            raise ValueError("row_count must match rows")
        return self


class QueryArtifactParameterV1(RuntimeContractModel):
    query_artifact_parameter_version: Literal["1.0"]
    name: Identifier
    sql_type: Literal[
        "bit",
        "tinyint",
        "smallint",
        "int",
        "bigint",
        "decimal",
        "date",
        "datetime2",
        "uniqueidentifier",
        "nvarchar",
    ]
    semantic_role: ContractId
    rebindable: bool
    nullable: bool
    precision: Annotated[int, Field(ge=1, le=38)] | None = None
    scale: Annotated[int, Field(ge=0, le=38)] | None = None
    max_length: Annotated[int, Field(ge=1, le=4000)] | None = None
    value: JsonScalar = None

    @model_validator(mode="after")
    def validate_sql_shape(self) -> QueryArtifactParameterV1:
        if self.sql_type == "decimal":
            if self.precision is None or self.scale is None or self.scale > self.precision:
                raise ValueError("decimal requires valid precision and scale")
        elif self.precision is not None or self.scale is not None:
            raise ValueError("precision and scale only apply to decimal")
        if (self.sql_type == "nvarchar") != (self.max_length is not None):
            raise ValueError("max_length is required only for nvarchar")
        return self


class RequeryCapabilityV1(RuntimeContractModel):
    requery_capability_version: Literal["1.0"]
    available: bool
    mode: Literal["none", "same_parameters", "rebind_parameters"]
    rebindable_parameters: list[Identifier]

    @model_validator(mode="after")
    def validate_availability(self) -> RequeryCapabilityV1:
        if self.available != (self.mode != "none"):
            raise ValueError("available and mode are inconsistent")
        if self.mode != "rebind_parameters" and self.rebindable_parameters:
            raise ValueError("only rebind_parameters mode may list parameters")
        return self


class QueryArtifactV1(RuntimeContractModel):
    query_artifact_version: Literal["1.0"]
    query_artifact_id: ContractId
    sql: Annotated[str, Field(min_length=1, max_length=100000)]
    parameters: Annotated[list[QueryArtifactParameterV1], Field(max_length=200)]
    semantics: ProposedResultSemanticsV2
    presentation_plan: PresentationPlanV2
    ast_fingerprint: Sha256
    catalog_sha256: Sha256
    capability_profile: ContractId
    requery: RequeryCapabilityV1
    result_set_binding: ResultSetBindingV1 | None = None

    @model_validator(mode="after")
    def validate_parameters(self) -> QueryArtifactV1:
        parameters = {item.name: item for item in self.parameters}
        if len(parameters) != len(self.parameters):
            raise ValueError("query artifact parameter names must be unique")
        declared = set(self.requery.rebindable_parameters)
        expected = {item.name for item in self.parameters if item.rebindable}
        if declared != expected:
            raise ValueError("requery parameters must exactly match rebindable parameters")
        return self


class HistoricalRequeryParameterV1(RuntimeContractModel):
    historical_requery_parameter_version: Literal["1.0"]
    name: Identifier
    sql_type: Literal[
        "bit",
        "tinyint",
        "smallint",
        "int",
        "bigint",
        "decimal",
        "date",
        "datetime2",
        "uniqueidentifier",
        "nvarchar",
    ]
    semantic_role: ContractId
    nullable: bool
    precision: Annotated[int, Field(ge=1, le=38)] | None = None
    scale: Annotated[int, Field(ge=0, le=38)] | None = None
    max_length: Annotated[int, Field(ge=1, le=4000)] | None = None
    value: JsonScalar = Field(
        default=None,
        description=(
            "Effective value applied by the historical QueryExecution being viewed; "
            "it is not the QueryArtifactParameterV1 initial value."
        ),
    )

    @model_validator(mode="after")
    def validate_sql_shape(self) -> HistoricalRequeryParameterV1:
        if self.sql_type == "decimal":
            if self.precision is None or self.scale is None or self.scale > self.precision:
                raise ValueError("decimal requires valid precision and scale")
        elif self.precision is not None or self.scale is not None:
            raise ValueError("precision and scale only apply to decimal")
        if (self.sql_type == "nvarchar") != (self.max_length is not None):
            raise ValueError("max_length is required only for nvarchar")
        return self


class HistoricalQueryArtifactViewV1(RuntimeContractModel):
    historical_query_artifact_view_version: Literal["1.0"]
    query_artifact_id: ContractId
    requery_parameters: Annotated[
        list[HistoricalRequeryParameterV1],
        Field(
            max_length=200,
            description=(
                "Public projection of only the QueryArtifactParameterV1 definitions whose "
                "rebindable flag is true."
            ),
        ),
    ]

    @model_validator(mode="after")
    def validate_parameters(self) -> HistoricalQueryArtifactViewV1:
        names = [item.name for item in self.requery_parameters]
        if len(set(names)) != len(names):
            raise ValueError("historical requery parameter names must be unique")
        return self


class DashboardGridLayoutV1(RuntimeContractModel):
    columns: Annotated[int, Field(ge=1, le=24)]
    row_height: Annotated[int, Field(ge=1, le=500)]


class DashboardWidgetLayoutV1(RuntimeContractModel):
    x: Annotated[int, Field(ge=0)]
    y: Annotated[int, Field(ge=0)]
    w: Annotated[int, Field(ge=1)]
    h: Annotated[int, Field(ge=1)]


class DashboardEntitySelectionV1(RuntimeContractModel):
    """Identity supplied by AppWeb; never a SQL binding value."""

    entity_type: EntityType
    entity_id: Annotated[str, Field(min_length=1, max_length=160, pattern=r"^\S+$")]


class DashboardFilterMappingV1(RuntimeContractModel):
    model_config = ConfigDict(json_schema_extra={"allOf": [{
        "if": {"properties": {"entity_binding": {"type": "string"}}, "required": ["entity_binding"]},
        "then": {"properties": {"source_path": {"const": "value"}}},
    }]})
    dashboard_filter_mapping_version: Literal["1.0"]
    source_path: Literal["value", "start", "end_exclusive"]
    target_parameter: Identifier
    entity_binding: Literal["entity_id", "binding_value"] | None = None

    @model_validator(mode="after")
    def validate_entity_source(self) -> DashboardFilterMappingV1:
        if self.entity_binding is not None and self.source_path != "value":
            raise ValueError("entity binding requires source_path=value")
        return self


class DashboardFilterBindingV1(RuntimeContractModel):
    dashboard_filter_binding_version: Literal["1.0"]
    filter_id: ContractId
    mappings: Annotated[list[DashboardFilterMappingV1], Field(min_length=1, max_length=10)]

    @model_validator(mode="after")
    def validate_mappings(self) -> DashboardFilterBindingV1:
        non_entity_paths = [item.source_path for item in self.mappings if item.entity_binding is None]
        if len(set(non_entity_paths)) != len(non_entity_paths):
            raise ValueError("mapping source paths must be unique")
        if len({item.target_parameter for item in self.mappings}) != len(self.mappings):
            raise ValueError("mapping target parameters must be unique")
        return self


_DASHBOARD_FILTER_SCHEMA = {
    "properties": {
        "dashboard_filter_version": {
            "const": "1.0",
            "title": "Dashboard Filter Version",
            "type": "string",
        },
        "filter_id": {
            "pattern": "^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$",
            "title": "Filter Id",
            "type": "string",
        },
        "label": {
            "maxLength": 500,
            "minLength": 1,
            "title": "Label",
            "type": "string",
            "pattern": "\\S",
        },
        "required": {"default": False, "title": "Required", "type": "boolean"},
        "type": {"enum": ["scalar", "date_range"], "title": "Type", "type": "string"},
        "value_type": {
            "enum": ["date_range", "integer", "decimal", "boolean", "string", "entity", None],
            "default": None,
        },
        "scope": {"enum": ["data", "analysis", "presentation", None], "default": None},
        "impact": {"enum": ["query", "analysis", "presentation", None], "default": None},
        "default_value": {
            "type": ["object", "number", "string", "boolean", "null"],
            "default": None,
        },
        "min_value": {"type": ["number", "null"], "default": None},
        "max_value": {"type": ["number", "null"], "default": None},
        "unit": {"type": ["string", "null"], "pattern": "\\S", "default": None},
        "entity_type": {
            "enum": [*get_args(EntityType), None],
            "default": None,
            "description": "Canonical Entity Resolution type. Optional for historical reads; required by new entity writes. No inference.",
        },
    },
    "allOf": [
        {
            "if": {"properties": {"entity_type": {"type": "string"}}, "required": ["entity_type"]},
            "then": {"properties": {"value_type": {"const": "entity"}}, "required": ["value_type"]},
        },
        {
            "if": {
                "properties": {"value_type": {"const": "date_range"}},
                "required": ["value_type"],
            },
            "then": {"properties": {"type": {"const": "date_range"}}},
        },
        {
            "if": {
                "properties": {
                    "value_type": {"enum": ["integer", "decimal", "boolean", "string", "entity"]}
                },
                "required": ["value_type"],
            },
            "then": {"properties": {"type": {"const": "scalar"}}},
        },
        {
            "if": {
                "anyOf": [
                    {"properties": {"min_value": {"type": "number"}}, "required": ["min_value"]},
                    {"properties": {"max_value": {"type": "number"}}, "required": ["max_value"]},
                ]
            },
            "then": {
                "properties": {"value_type": {"enum": ["integer", "decimal"]}},
                "required": ["value_type"],
            },
        },
        {
            "if": {"properties": {"impact": {"type": "string"}}, "required": ["impact"]},
            "then": {"properties": {"scope": {"type": "string"}}, "required": ["scope"]},
        },
        {
            "if": {"properties": {"scope": {"const": "presentation"}}, "required": ["scope"]},
            "then": {"properties": {"impact": {"const": "presentation"}}, "required": ["impact"]},
        },
        {
            "not": {
                "properties": {"scope": {"const": "data"}, "impact": {"const": "presentation"}},
                "required": ["scope", "impact"],
            }
        },
        {
            "if": {
                "properties": {"default_value": {"not": {"type": "null"}}},
                "required": ["default_value"],
            },
            "then": {"properties": {"value_type": {"type": "string"}}, "required": ["value_type"]},
        },
    ],
}


class DashboardFilterV1(RuntimeContractModel):
    # JSON Schema is the normative read contract; writes require entity metadata separately.
    model_config = ConfigDict(extra="forbid", json_schema_extra=_DASHBOARD_FILTER_SCHEMA)
    dashboard_filter_version: Literal["1.0"]
    filter_id: ContractId
    type: Literal["scalar", "date_range"]
    label: Annotated[str, Field(min_length=1, max_length=500, pattern=r"\S")]
    required: bool = False
    value_type: (
        Literal["date_range", "integer", "decimal", "boolean", "string", "entity"] | None
    ) = None
    scope: Literal["data", "analysis", "presentation"] | None = None
    impact: Literal["query", "analysis", "presentation"] | None = None
    default_value: dict[str, Any] | int | float | str | bool | None = None
    min_value: float | None = None
    max_value: float | None = None
    unit: Annotated[str, Field(pattern=r"\S")] | None = None
    entity_type: EntityType | None = None

    @model_validator(mode="after")
    def validate_metadata(self) -> DashboardFilterV1:
        if self.entity_type is not None and self.value_type != "entity":
            raise ValueError("entity_type is only valid for entity filters")
        if self.value_type is not None and (
            (self.value_type == "date_range") != (self.type == "date_range")
        ):
            raise ValueError("filter type and value_type are inconsistent")
        if (self.min_value is not None or self.max_value is not None) and self.value_type not in (
            "integer",
            "decimal",
        ):
            raise ValueError("bounds require a numeric value_type")
        if (
            self.min_value is not None
            and self.max_value is not None
            and self.min_value > self.max_value
        ):
            raise ValueError("filter bounds are inverted")
        if self.impact is not None and self.scope is None:
            raise ValueError("impact requires scope")
        if self.scope == "presentation" and self.impact != "presentation":
            raise ValueError("presentation scope requires presentation impact")
        if self.scope == "data" and self.impact == "presentation":
            raise ValueError("data scope cannot have presentation impact")
        if self.default_value is not None and self.value_type is None:
            raise ValueError("default_value requires value_type")
        return self

    def require_entity_metadata(self) -> None:
        """New writes fail closed; historical entity reads retain absent metadata."""
        if self.value_type == "entity" and self.entity_type is None:
            raise ValueError("new entity filters require explicit entity_type")


class DashboardWidgetV1(RuntimeContractModel):
    # Preserve the existing published Query XOR Analytics source contract during generation.
    model_config = ConfigDict(json_schema_extra={"oneOf": [
        {"required": ["query_artifact_id"], "properties": {"query_artifact_id": {"type": "string"}, "analytics_artifact_id": {"type": "null"}}},
        {"required": ["analytics_artifact_id"], "properties": {"analytics_artifact_id": {"type": "string"}, "query_artifact_id": {"type": "null"}}},
    ]})
    dashboard_widget_version: Literal["1.0"]
    widget_id: ContractId
    query_artifact_id: ContractId | None = None
    analytics_artifact_id: ContractId | None = None
    block_id: ContractId
    layout: DashboardWidgetLayoutV1
    filter_bindings: Annotated[list[DashboardFilterBindingV1], Field(max_length=20)]

    @model_validator(mode="after")
    def validate_source(self) -> DashboardWidgetV1:
        if (self.query_artifact_id is None) == (self.analytics_artifact_id is None):
            raise ValueError("dashboard widget requires exactly one Query or Analytics source")
        return self


class DashboardDefinitionV1(RuntimeContractModel):
    dashboard_definition_version: Literal["1.0"]
    dashboard_id: ContractId
    title: NonEmptyText
    status: Literal["draft", "building", "ready", "published", "degraded", "archived"]
    global_filters: Annotated[list[DashboardFilterV1], Field(max_length=20)]
    widgets: Annotated[list[DashboardWidgetV1], Field(max_length=100)]
    grid_layout: DashboardGridLayoutV1

    def require_entity_bindings(self) -> None:
        """New-write boundary. Historical mappings remain readable with NULL metadata."""
        filters = {item.filter_id: item for item in self.global_filters}
        for item in filters.values():
            item.require_entity_metadata()
            if item.value_type == "entity" and item.default_value is not None:
                selection = DashboardEntitySelectionV1.model_validate(item.default_value)
                if selection.entity_type != item.entity_type:
                    raise ValueError("entity default must match explicit entity_type")
        for widget in self.widgets:
            for binding in widget.filter_bindings:
                if filters[binding.filter_id].value_type == "entity" and any(
                    item.entity_binding is None for item in binding.mappings
                ):
                    raise ValueError("every entity destination requires explicit entity_binding")

    @model_validator(mode="after")
    def validate_ids(self) -> DashboardDefinitionV1:
        filter_ids = {item.filter_id for item in self.global_filters}
        if len(filter_ids) != len(self.global_filters):
            raise ValueError("dashboard filter ids must be unique")
        if len({item.widget_id for item in self.widgets}) != len(self.widgets):
            raise ValueError("dashboard widget ids must be unique")
        if any(
            binding.filter_id not in filter_ids
            for widget in self.widgets
            for binding in widget.filter_bindings
        ):
            raise ValueError("widget binding must reference a global filter")
        filter_types = {item.filter_id: item.type for item in self.global_filters}
        value_types = {item.filter_id: item.value_type for item in self.global_filters}
        for widget in self.widgets:
            for binding in widget.filter_bindings:
                if value_types[binding.filter_id] != "entity" and any(
                    item.entity_binding is not None for item in binding.mappings
                ):
                    raise ValueError("entity_binding is only valid for entity filters")
                paths = {item.source_path for item in binding.mappings}
                if filter_types[binding.filter_id] == "date_range" and paths != {
                    "start",
                    "end_exclusive",
                }:
                    raise ValueError("date_range binding requires start and end_exclusive mappings")
                if filter_types[binding.filter_id] == "scalar" and paths != {"value"}:
                    raise ValueError("scalar binding requires a value mapping")
        return self


class DashboardWidgetResultV1(RuntimeContractModel):
    widget_id: ContractId
    status: Literal["completed", "degraded", "failed"]
    block: MaterializedPresentationBlockV2 | None = None
    error_code: ContractId | None = None


class DashboardResultV1(RuntimeContractModel):
    dashboard_result_version: Literal["1.0"]
    dashboard_id: ContractId
    status: Literal["ready", "degraded", "failed"]
    widgets: list[DashboardWidgetResultV1]


class ImportOperationV1(RuntimeContractModel):
    import_operation_version: Literal["1.0"]
    action_id: ContractId
    entity: ContractId
    operation: Literal["import"]
    write_mode: Literal["create", "update", "upsert"]
    policy_id: ContractId


class ImportMappingEntryV1(RuntimeContractModel):
    source_column: NonEmptyText
    target_field: Identifier
    required: bool


class ImportMappingV1(RuntimeContractModel):
    import_mapping_version: Literal["1.0"]
    mapping_id: ContractId
    version: Annotated[int, Field(ge=1)]
    entries: Annotated[list[ImportMappingEntryV1], Field(min_length=1, max_length=500)]


class ImportIssueV1(RuntimeContractModel):
    import_issue_version: Literal["1.0"]
    code: ContractId
    severity: Literal["warning", "error"]
    message: NonEmptyText
    row: Annotated[int, Field(ge=1)] | None = None
    source_column: NonEmptyText | None = None
    target_field: Identifier | None = None


class ImportPreviewRowV1(RuntimeContractModel):
    row: Annotated[int, Field(ge=1)]
    values: dict[str, JsonScalar]
    valid: bool


class ImportPreviewV1(RuntimeContractModel):
    import_preview_version: Literal["1.0"]
    columns: list[NonEmptyText]
    rows: Annotated[list[ImportPreviewRowV1], Field(max_length=100)]
    truncated: bool


class ImportPreflightV1(RuntimeContractModel):
    import_preflight_version: Literal["1.0"]
    preflight_id: ContractId
    attachment_sha256: Sha256
    operation: ImportOperationV1
    mapping: ImportMappingV1
    preview: ImportPreviewV1
    issues: Annotated[list[ImportIssueV1], Field(max_length=1000)]
    status: Literal["validated", "awaiting_confirmation", "failed"]


class ImportConfirmationV1(RuntimeContractModel):
    state: Literal["not_required", "confirmed"]
    confirmation_id: ContractId | None = None

    @model_validator(mode="after")
    def validate_confirmation(self) -> ImportConfirmationV1:
        if (self.state == "confirmed") != (self.confirmation_id is not None):
            raise ValueError("confirmed state requires confirmation_id")
        return self


class ImportExecutionRequestV1(RuntimeContractModel):
    import_execution_request_version: Literal["1.0"]
    preflight_id: ContractId
    attachment_sha256: Sha256
    mapping_id: ContractId
    mapping_version: Annotated[int, Field(ge=1)]
    operation: ImportOperationV1
    confirmation: ImportConfirmationV1
    policy_state: Literal["satisfied"]


class ImportCountSummaryV1(RuntimeContractModel):
    received: Annotated[int, Field(ge=0)]
    valid: Annotated[int, Field(ge=0)]
    created: Annotated[int, Field(ge=0)]
    updated: Annotated[int, Field(ge=0)]
    skipped: Annotated[int, Field(ge=0)]
    failed: Annotated[int, Field(ge=0)]


class ImportResultV1(RuntimeContractModel):
    import_result_version: Literal["1.0"]
    import_id: ContractId
    preflight_id: ContractId
    attachment_sha256: Sha256
    status: Literal[
        "validated",
        "awaiting_confirmation",
        "processing",
        "completed",
        "completed_with_errors",
        "failed",
        "cancelled",
    ]
    summary: ImportCountSummaryV1
    issues: Annotated[list[ImportIssueV1], Field(max_length=1000)]


class StreamEventBaseV1(RuntimeContractModel):
    event_id: ContractId
    sequence: Annotated[int, Field(ge=0)]
    timestamp: datetime


AnalyticsDecimalV1 = Annotated[str, Field(pattern=r"^-?(0|[1-9][0-9]*)(\.[0-9]+)?$")]


class AnalyticsResultPeriodV1(RuntimeContractModel):
    start: datetime
    end_exclusive: datetime
    timezone: NonEmptyText


class AnalyticsResultInputTotalV1(RuntimeContractModel):
    period: AnalyticsResultPeriodV1
    value: AnalyticsDecimalV1


class AnalyticsResultRowV1(RuntimeContractModel):
    period: NonEmptyText
    type: Literal["actual", "forecast"]
    value: AnalyticsDecimalV1


class InventoryReorderResultRowV1(RuntimeContractModel):
    product_id: NonEmptyText
    product_name: NonEmptyText
    projected_demand: AnalyticsDecimalV1
    available_inventory: AnalyticsDecimalV1 | None
    shortage: AnalyticsDecimalV1 | None
    recommended_reorder: AnalyticsDecimalV1 | None
    row_status: Literal["ready", "missing_inventory"]

    @model_validator(mode="after")
    def validate_missing_inventory(self) -> InventoryReorderResultRowV1:
        if self.row_status == "missing_inventory":
            if any(
                value is not None
                for value in (self.available_inventory, self.shortage, self.recommended_reorder)
            ):
                raise ValueError("Missing inventory has no reorder values")
        elif any(
            value is None
            for value in (self.available_inventory, self.shortage, self.recommended_reorder)
        ):
            raise ValueError("Ready reorder has complete values")
        return self


class AnalyticsResultPresentationV1(RuntimeContractModel):
    kind: Literal["forecast_summary", "grouped_forecast", "inventory_reorder_grid"]
    title: NonEmptyText
    kpi_title: NonEmptyText
    method_label: NonEmptyText
    chart_enabled: Literal[False]


class DailyRunRateCalculationV1(RuntimeContractModel):
    kind: Literal["daily_run_rate"]
    base_total: AnalyticsDecimalV1
    base_days: Annotated[int, Field(gt=0)]
    daily_average: AnalyticsDecimalV1
    target_days: Annotated[int, Field(gt=0)]
    projected_value: AnalyticsDecimalV1


class NaiveLastPeriodCalculationV1(RuntimeContractModel):
    kind: Literal["naive_last_period"]
    source_period_total: AnalyticsDecimalV1
    projected_value: AnalyticsDecimalV1


class MovingAverageCalculationV1(RuntimeContractModel):
    kind: Literal["moving_average"]
    period_totals: Annotated[list[AnalyticsDecimalV1], Field(min_length=1, max_length=36)]
    period_count: Annotated[int, Field(gt=0, le=36)]
    projected_value: AnalyticsDecimalV1


class AnalyticsMethodExplanationV1(RuntimeContractModel):
    method_id: Literal[
        "daily_run_rate_v1", "naive_last_period_v1", "moving_average_v1", "inventory_reorder_v1"
    ]
    method_version: Literal["1.0"]
    label: NonEmptyText
    description: NonEmptyText
    selection_reason: Literal[
        "explicit_method_requested",
        "single_complete_base_period",
        "minimum_history_for_moving_average",
        "registered_inventory_reorder_method",
    ]
    calculation: (
        Annotated[
            DailyRunRateCalculationV1 | NaiveLastPeriodCalculationV1 | MovingAverageCalculationV1,
            Field(discriminator="kind"),
        ]
        | str
        | None
    ) = None


class AnalyticsResultGroupV1(RuntimeContractModel):
    concept: Literal["branch"]
    key: NonEmptyText
    label: NonEmptyText


class AnalyticsResultGroupedRowV1(RuntimeContractModel):
    group: AnalyticsResultGroupV1
    base_value: AnalyticsDecimalV1
    projected_value: AnalyticsDecimalV1


class AnalyticsResultV1(RuntimeContractModel):
    analytics_result_version: Literal["1.0"]
    result_id: ContractId
    status: Literal["completed"]
    operation: Literal["forecast", "inventory_reorder"]
    metric_concept: Literal["sales", "purchases", "inventory_reorder"]
    method_id: Literal[
        "daily_run_rate_v1", "naive_last_period_v1", "moving_average_v1", "inventory_reorder_v1"
    ]
    method_version: Literal["1.0"] | None = None
    demand_forecast_method_id: Literal["daily_run_rate_v1", "moving_average_v1"] | None = None
    demand_forecast_method_version: Literal["1.0"] | None = None
    inventory_as_of: datetime | None = None
    limitations: list[NonEmptyText] | None = None
    method_explanation: AnalyticsMethodExplanationV1 | None = None
    input_totals: Annotated[list[AnalyticsResultInputTotalV1], Field(max_length=36)]
    target_period: AnalyticsResultPeriodV1
    projected_value: AnalyticsDecimalV1 | None = None
    rows: Annotated[list[AnalyticsResultRowV1 | InventoryReorderResultRowV1], Field(max_length=500)]
    presentation: AnalyticsResultPresentationV1
    group_by: Literal["branch", "product"] | None = None
    base_periods: (
        Annotated[list[AnalyticsResultPeriodV1], Field(min_length=1, max_length=12)] | None
    ) = None
    grouped_rows: Annotated[list[AnalyticsResultGroupedRowV1], Field(max_length=500)] | None = None

    @model_validator(mode="after")
    def validate_rows(self) -> AnalyticsResultV1:
        if self.operation == "inventory_reorder":
            inventory_rows = [
                row for row in self.rows if isinstance(row, InventoryReorderResultRowV1)
            ]
            if (
                self.metric_concept != "inventory_reorder"
                or self.method_id != "inventory_reorder_v1"
                or self.method_version != "1.0"
                or self.demand_forecast_method_id is None
                or self.demand_forecast_method_version != "1.0"
                or self.inventory_as_of is None
                or self.limitations is None
                or self.group_by != "product"
                or self.presentation.kind != "inventory_reorder_grid"
                or self.input_totals
                or self.projected_value is not None
                or self.grouped_rows is not None
                or not self.base_periods
                or self.method_explanation is None
                or self.method_explanation.method_id != self.method_id
                or not isinstance(self.method_explanation.calculation, str)
                or self.method_explanation.selection_reason != "registered_inventory_reorder_method"
                or len(inventory_rows) != len(self.rows)
                or len({row.product_id for row in inventory_rows}) != len(inventory_rows)
            ):
                raise ValueError("Invalid inventory reorder result")
            return self
        if (
            self.metric_concept not in ("sales", "purchases")
            or self.method_id == "inventory_reorder_v1"
        ):
            raise ValueError("Invalid forecast identity")
        if self.group_by is not None:
            if (
                self.grouped_rows is None
                or self.base_periods is None
                or self.input_totals
                or self.rows
                or self.projected_value is not None
                or self.presentation.kind != "grouped_forecast"
                or self.method_id != "daily_run_rate_v1"
                or self.method_explanation is None
                or self.method_explanation.calculation is not None
                or self.method_explanation.method_id != self.method_id
                or len({row.group.key for row in self.grouped_rows}) != len(self.grouped_rows)
            ):
                raise ValueError("Grouped forecast requires independent branch rows")
            return self
        if (
            self.grouped_rows is not None
            or self.base_periods is not None
            or self.presentation.kind != "forecast_summary"
            or self.projected_value is None
            or not self.input_totals
            or len(self.rows) != len(self.input_totals) + 1
            or any(
                not isinstance(row, AnalyticsResultRowV1)
                or row.type != "actual"
                or row.value != item.value
                for row, item in zip(self.rows[:-1], self.input_totals, strict=True)
            )
            or not isinstance(self.rows[-1], AnalyticsResultRowV1)
            or self.rows[-1].type != "forecast"
            or self.rows[-1].value != self.projected_value
            or (
                self.method_explanation is not None
                and (
                    self.method_explanation.method_id != self.method_id
                    or self.method_explanation.calculation is None
                    or isinstance(self.method_explanation.calculation, str)
                    or self.method_explanation.calculation.projected_value != self.projected_value
                    or self.method_explanation.calculation.kind
                    != {
                        "daily_run_rate_v1": "daily_run_rate",
                        "naive_last_period_v1": "naive_last_period",
                        "moving_average_v1": "moving_average",
                    }[self.method_id]
                )
            )
        ):
            raise ValueError("Forecast rows must carry the exact input and output totals")
        return self


class SpokenSummaryV1(RuntimeContractModel):
    spoken_summary_version: Literal["1.0"]
    kind: Literal["result_summary"]
    text: NonEmptyText


class AssistantClientStreamEventV2(StreamEventBaseV1):
    event_version: Literal["2.0"]
    request_id: ContractId
    conversation_id: ContractId
    turn_id: ContractId
    type: Literal[
        "turn.started",
        "turn.progress",
        "assistant.delta",
        "heartbeat",
        "query.result",
        "analytics.result",
        "query.narrative_pending",
        "query.narrative",
        "query.narrative_degraded",
        "turn.response",
        "turn.error",
    ]
    payload: Annotated[dict[str, object], Field(json_schema_extra={"x-dynamic-map": True})]
    spoken_summary: SpokenSummaryV1 | None = None


class DashboardStreamEventV1(StreamEventBaseV1):
    event_version: Literal["1.0"]
    dashboard_id: ContractId
    widget_id: ContractId | None = None
    type: Literal[
        "dashboard.started",
        "dashboard.plan.updated",
        "dashboard.widget.started",
        "dashboard.widget.result",
        "dashboard.widget.degraded",
        "dashboard.widget.failed",
        "dashboard.completed",
    ]
    payload: Annotated[dict[str, object], Field(json_schema_extra={"x-dynamic-map": True})]


class ImportStreamEventV1(StreamEventBaseV1):
    event_version: Literal["1.0"]
    import_id: ContractId
    preflight_id: ContractId
    type: Literal[
        "import.started",
        "import.preflight.completed",
        "import.awaiting_confirmation",
        "import.execution.started",
        "import.progress",
        "import.completed",
        "import.failed",
    ]
    payload: Annotated[dict[str, object], Field(json_schema_extra={"x-dynamic-map": True})]


class AssistantHistoricalResultV2(RuntimeContractModel):
    historical_result_version: Literal["2.0"]
    query_execution_id: ContractId
    executed_at: datetime
    result: QueryResultV2 | None
    snapshot_status: Literal["available", "expired", "unavailable"]
    query_artifact: HistoricalQueryArtifactViewV1 | None
    requery: RequeryCapabilityV1

    @model_validator(mode="after")
    def validate_snapshot(self) -> AssistantHistoricalResultV2:
        if (self.snapshot_status == "available") != (self.result is not None):
            raise ValueError("available snapshot requires a result and other states forbid it")
        return self


class AssistantHistoricalRequeryResultV2(RuntimeContractModel):
    historical_requery_result_version: Literal["2.0"]
    query_execution_id: ContractId
    query_artifact_id: ContractId
    result: QueryResultV2


class DataGridCapabilitiesV1(RuntimeContractModel):
    features: Annotated[list[DataGridFeature], Field(max_length=8)]


class PivotGridCapabilitiesV1(RuntimeContractModel):
    features: Annotated[list[PivotGridFeature], Field(max_length=10)]


class ChartFamilySeriesCompatibilityV1(RuntimeContractModel):
    family: ContractId
    series_types: Annotated[list[ContractId], Field(min_length=1, max_length=50)]


class ChartCapabilitiesV1(RuntimeContractModel):
    family_series_compatibility: Annotated[
        list[ChartFamilySeriesCompatibilityV1], Field(min_length=1, max_length=20)
    ]
    features: Annotated[list[ChartFeature], Field(max_length=3)]
    stacking_modes: Annotated[list[ChartStackingMode], Field(min_length=1, max_length=3)]
    orientations: Annotated[list[ChartOrientation], Field(min_length=1, max_length=2)]


class GaugeCapabilitiesV1(RuntimeContractModel):
    types: Annotated[list[GaugeType], Field(min_length=1, max_length=2)]
    features: Annotated[list[GaugeFeature], Field(max_length=2)]


class PresentationCapabilityProfileV1(RuntimeContractModel):
    presentation_capability_profile_version: Literal["1.0"]
    profile_id: ContractId
    block_kinds: Annotated[list[BlockKind], Field(min_length=1, max_length=6)]
    chart_families: list[ContractId]
    chart_series_types: list[ContractId]
    aggregations: list[Literal["sum", "avg", "min", "max", "count"]]
    max_blocks: Annotated[int, Field(ge=1, le=100)]
    max_chart_categories: Annotated[int, Field(ge=1, le=10000)]
    max_chart_series: Annotated[int, Field(ge=1, le=1000)]
    renderer: ContractId | None = None
    renderer_version: ContractId | None = None
    effective_package_version: ContractId | None = None
    data_grid: DataGridCapabilitiesV1 | None = None
    pivot_grid: PivotGridCapabilitiesV1 | None = None
    chart: ChartCapabilitiesV1 | None = None
    gauge: GaugeCapabilitiesV1 | None = None

    @model_validator(mode="after")
    def validate_completed_profile(self) -> PresentationCapabilityProfileV1:
        metadata = (self.renderer, self.renderer_version, self.effective_package_version)
        capability_sections = {
            "data_grid": self.data_grid,
            "pivot_grid": self.pivot_grid,
            "chart": self.chart,
            "gauge": self.gauge,
        }
        if any(item is not None for item in metadata) or any(
            item is not None for item in capability_sections.values()
        ):
            if any(item is None for item in metadata):
                raise ValueError("completed profiles require all renderer metadata")
            for kind, section in capability_sections.items():
                if (kind in self.block_kinds) != (section is not None):
                    raise ValueError(
                        "completed profiles require capability sections for supported block kinds"
                    )
        if self.chart is not None:
            families = [item.family for item in self.chart.family_series_compatibility]
            series_types = [
                series_type
                for item in self.chart.family_series_compatibility
                for series_type in item.series_types
            ]
            if len(set(families)) != len(families):
                raise ValueError("chart family compatibility entries must be unique")
            if set(families) != set(self.chart_families):
                raise ValueError("chart families must match the compatibility matrix")
            if set(series_types) != set(self.chart_series_types):
                raise ValueError("chart series types must match the compatibility matrix")
        return self


class ImportCapabilityDescriptorV1(RuntimeContractModel):
    import_capability_descriptor_version: Literal["1.0"]
    action_id: ContractId
    operation: ImportOperationV1
    accepted_mime_types: Annotated[list[NonEmptyText], Field(min_length=1, max_length=20)]
    max_bytes: Annotated[int, Field(ge=1)]
    confirmation_required: bool
