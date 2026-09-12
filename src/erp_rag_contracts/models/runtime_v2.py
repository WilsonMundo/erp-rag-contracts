from __future__ import annotations

from datetime import datetime
from typing import Annotated, Literal, TypeAlias

from pydantic import Field, model_validator

from .runtime import Identifier, QueryParameterDraftV2, RuntimeContractModel

NonEmptyText = Annotated[str, Field(min_length=1, max_length=500)]
ContractId = Annotated[str, Field(pattern=r"^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$")]
Sha256 = Annotated[str, Field(pattern=r"^sha256:[0-9a-f]{64}$")]
BlockKind = Literal["kpi", "data_grid", "pivot_grid", "chart", "gauge"]
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
QueryShape = Literal[
    "scalar", "detail", "grouped_aggregate", "ranking", "comparison", "distribution", "trend"
]
JsonScalar: TypeAlias = str | int | float | bool | None


class PresentationPreferenceV1(RuntimeContractModel):
    presentation_preference_version: Literal["1.0"]
    mode: Literal["auto", "include", "only"]
    required: Annotated[list[BlockKind], Field(max_length=5)]

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
    format: Literal["auto", "number", "integer", "currency", "percent"] = "auto"


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
    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["chart"]
    title: NonEmptyText
    family: ContractId
    category_field: Identifier
    series: Annotated[list[ChartSeriesV2], Field(min_length=1, max_length=20)]
    orientation: ChartOrientation | None = None


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
    KpiBlockV1 | DataGridBlockV1 | PivotGridBlockV1 | ChartBlockV1 | GaugeBlockV1,
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
    format: Literal["auto", "number", "integer", "currency", "percent"]
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
    block_version: Literal["1.0"]
    block_id: ContractId
    kind: Literal["chart"]
    title: NonEmptyText
    family: ContractId
    category_field: Identifier
    series: Annotated[list[MaterializedChartSeriesV1], Field(min_length=1)]
    orientation: ChartOrientation | None = None


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
    rows: Annotated[list[dict[str, JsonScalar]], Field(max_length=500)]
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


class DashboardGridLayoutV1(RuntimeContractModel):
    columns: Annotated[int, Field(ge=1, le=24)]
    row_height: Annotated[int, Field(ge=1, le=500)]


class DashboardWidgetLayoutV1(RuntimeContractModel):
    x: Annotated[int, Field(ge=0)]
    y: Annotated[int, Field(ge=0)]
    w: Annotated[int, Field(ge=1)]
    h: Annotated[int, Field(ge=1)]


class DashboardFilterMappingV1(RuntimeContractModel):
    dashboard_filter_mapping_version: Literal["1.0"]
    source_path: Literal["value", "start", "end_exclusive"]
    target_parameter: Identifier


class DashboardFilterBindingV1(RuntimeContractModel):
    dashboard_filter_binding_version: Literal["1.0"]
    filter_id: ContractId
    mappings: Annotated[list[DashboardFilterMappingV1], Field(min_length=1, max_length=10)]

    @model_validator(mode="after")
    def validate_mappings(self) -> DashboardFilterBindingV1:
        if len({item.source_path for item in self.mappings}) != len(self.mappings):
            raise ValueError("mapping source paths must be unique")
        if len({item.target_parameter for item in self.mappings}) != len(self.mappings):
            raise ValueError("mapping target parameters must be unique")
        return self


class DashboardFilterV1(RuntimeContractModel):
    dashboard_filter_version: Literal["1.0"]
    filter_id: ContractId
    type: Literal["scalar", "date_range"]
    label: NonEmptyText
    required: bool = False


class DashboardWidgetV1(RuntimeContractModel):
    dashboard_widget_version: Literal["1.0"]
    widget_id: ContractId
    query_artifact_id: ContractId
    block_id: ContractId
    layout: DashboardWidgetLayoutV1
    filter_bindings: Annotated[list[DashboardFilterBindingV1], Field(max_length=20)]


class DashboardDefinitionV1(RuntimeContractModel):
    dashboard_definition_version: Literal["1.0"]
    dashboard_id: ContractId
    title: NonEmptyText
    status: Literal["draft", "building", "ready", "published", "degraded", "archived"]
    global_filters: Annotated[list[DashboardFilterV1], Field(max_length=20)]
    widgets: Annotated[list[DashboardWidgetV1], Field(max_length=100)]
    grid_layout: DashboardGridLayoutV1

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
        for widget in self.widgets:
            for binding in widget.filter_bindings:
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
        "query.narrative_pending",
        "query.narrative",
        "query.narrative_degraded",
        "turn.response",
        "turn.error",
    ]
    payload: Annotated[dict[str, object], Field(json_schema_extra={"x-dynamic-map": True})]


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
    query_artifact: QueryArtifactV1 | None
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
    block_kinds: Annotated[list[BlockKind], Field(min_length=1, max_length=5)]
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
