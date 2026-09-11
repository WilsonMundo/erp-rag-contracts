from __future__ import annotations

from datetime import datetime
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator


class RuntimeContractModel(BaseModel):
    model_config = ConfigDict(extra="forbid")


EntityType = Literal[
    "branch",
    "customer",
    "product",
    "supplier",
    "seller",
    "document",
    "classification_level",
]
OptionalEntityType = EntityType | None
Identifier = Annotated[str, Field(pattern=r"^[A-Za-z_][A-Za-z0-9_]{0,127}$")]
ReferenceIdentifier = Annotated[str, Field(pattern=r"^[a-z][a-z0-9_]{0,79}$")]


class MetricMentionV1(RuntimeContractModel):
    mention: Annotated[str, Field(min_length=1, max_length=500)]
    concept: Annotated[str, Field(pattern=r"^[a-z][a-z0-9_]{0,79}$")]


class SemanticEntityReferenceV1(RuntimeContractModel):
    ref: ReferenceIdentifier
    entity_type: OptionalEntityType
    mention: Annotated[str, Field(min_length=1, max_length=500)]
    type_resolution: Literal["explicit", "clarified", "unknown"]
    required: bool = True

    @model_validator(mode="after")
    def validate_type_resolution(self) -> SemanticEntityReferenceV1:
        if (self.entity_type is None) != (self.type_resolution == "unknown"):
            raise ValueError("unknown type_resolution requires a null entity_type")
        return self


class SemanticMentionV1(RuntimeContractModel):
    mention: Annotated[str, Field(min_length=1, max_length=500)]
    concept: Annotated[str, Field(pattern=r"^[a-z][a-z0-9_]{0,79}$")] | None = None


class QuerySemanticPlanV1(RuntimeContractModel):
    version: Literal["1.0"] = "1.0"
    metric_mentions: Annotated[list[MetricMentionV1], Field(max_length=20)]
    entity_references: Annotated[list[SemanticEntityReferenceV1], Field(max_length=25)]
    temporal_expression: Annotated[str, Field(min_length=1, max_length=1000)] | None
    grouping_mentions: Annotated[list[SemanticMentionV1], Field(max_length=20)]
    filters: Annotated[list[SemanticMentionV1], Field(max_length=30)]

    @model_validator(mode="after")
    def validate_entity_refs(self) -> QuerySemanticPlanV1:
        if len({item.ref for item in self.entity_references}) != len(self.entity_references):
            raise ValueError("entity references must be unique")
        return self


class ResolvedTemporalBindingV1(RuntimeContractModel):
    name: Identifier
    sql_type: Literal["datetime2"] = "datetime2"
    value: datetime


class ResolvedTemporalContextV1(RuntimeContractModel):
    status: Literal["resolved", "not_applicable"]
    start: datetime | None = None
    end_exclusive: datetime | None = None
    timezone: Annotated[str, Field(min_length=1, max_length=100)]
    bindings: Annotated[list[ResolvedTemporalBindingV1], Field(max_length=10)]

    @model_validator(mode="after")
    def validate_period(self) -> ResolvedTemporalContextV1:
        if self.status == "resolved" and not self.bindings:
            raise ValueError("resolved temporal context requires bindings")
        if self.status == "not_applicable" and (
            self.bindings or self.start is not None or self.end_exclusive is not None
        ):
            raise ValueError("not_applicable temporal context forbids boundaries")
        if (self.start is None) != (self.end_exclusive is None):
            raise ValueError("single-period boundaries must be provided together")
        if len({item.name for item in self.bindings}) != len(self.bindings):
            raise ValueError("temporal binding names must be unique")
        return self


class ResolvedEntityBindingV1(RuntimeContractModel):
    name: Identifier
    kind: Literal["entity_id", "binding_value"]
    sql_type: Literal["tinyint", "smallint", "int", "bigint", "uniqueidentifier", "nvarchar"]
    value: str | int
    max_length: Annotated[int, Field(ge=1, le=4000)] | None = None

    @model_validator(mode="after")
    def validate_binding(self) -> ResolvedEntityBindingV1:
        if self.sql_type == "nvarchar" and self.max_length is None:
            raise ValueError("nvarchar binding requires max_length")
        if self.sql_type != "nvarchar" and self.max_length is not None:
            raise ValueError("max_length only applies to nvarchar bindings")
        if self.sql_type in {"tinyint", "smallint", "int", "bigint"} and not isinstance(
            self.value, int
        ):
            raise ValueError("integer binding requires an integer value")
        return self


class ResolvedEntityV1(RuntimeContractModel):
    ref: ReferenceIdentifier
    entity_type: EntityType
    mention: Annotated[str, Field(min_length=1, max_length=500)]
    type_resolution: Literal["explicit", "clarified"]
    status: Literal["resolved"]
    entity_id: Annotated[str, Field(min_length=1, max_length=128)]
    display_text: Annotated[str, Field(min_length=1, max_length=500)]
    binding: ResolvedEntityBindingV1


class ResolvedQueryContextV1(RuntimeContractModel):
    version: Literal["1.0"] = "1.0"
    semantic_plan: QuerySemanticPlanV1
    temporal: ResolvedTemporalContextV1
    entities: Annotated[list[ResolvedEntityV1], Field(max_length=25)]

    @model_validator(mode="after")
    def validate_required_entities(self) -> ResolvedQueryContextV1:
        references = {item.ref: item for item in self.semantic_plan.entity_references}
        if len(references) != len(self.semantic_plan.entity_references):
            raise ValueError("semantic entity references must be unique")
        entities = {item.ref: item for item in self.entities}
        if len(entities) != len(self.entities):
            raise ValueError("resolved entities must be unique")
        expected = {item.ref for item in references.values() if item.required}
        if not expected.issubset(entities):
            raise ValueError("required semantic entities must be resolved")
        for ref, entity in entities.items():
            reference = references.get(ref)
            if reference is None:
                raise ValueError("resolved entity must reference the semantic plan")
            if reference.entity_type != entity.entity_type or reference.mention != entity.mention:
                raise ValueError("resolved entity must match its semantic reference")
        binding_names = [item.name for item in self.temporal.bindings]
        binding_names.extend(item.binding.name for item in self.entities)
        if len(set(binding_names)) != len(binding_names):
            raise ValueError("resolved binding names must be unique")
        return self


class EntityResolutionReferenceV2(RuntimeContractModel):
    ref: ReferenceIdentifier
    entity_type: EntityType
    mention: Annotated[str, Field(min_length=1, max_length=500)]


class EntityResolutionCandidateV2(RuntimeContractModel):
    entity_id: Annotated[str, Field(min_length=1, max_length=128)]
    display_text: Annotated[str, Field(min_length=1, max_length=500)]
    binding_value: Annotated[str, Field(min_length=1, max_length=128)] | None = None
    binding_kind: Literal["entity_id", "binding_value"]
    sql_type: Literal["tinyint", "smallint", "int", "bigint", "uniqueidentifier", "nvarchar"]
    max_length: Annotated[int, Field(ge=1, le=4000)] | None = None

    @model_validator(mode="after")
    def validate_binding(self) -> EntityResolutionCandidateV2:
        if self.binding_kind == "binding_value" and self.binding_value is None:
            raise ValueError("binding_value kind requires a binding value")
        if (self.sql_type == "nvarchar") != (self.max_length is not None):
            raise ValueError("max_length is required only for nvarchar")
        return self


class EntityResolutionItemV2(RuntimeContractModel):
    ref: ReferenceIdentifier
    entity_type: EntityType
    status: Literal[
        "resolved",
        "ambiguous",
        "not_found",
        "unsupported_entity_type",
        "resolver_unavailable",
        "invalid_request",
        "authorization_denied",
    ]
    entity_id: Annotated[str, Field(min_length=1, max_length=128)] | None = None
    display_text: Annotated[str, Field(min_length=1, max_length=500)] | None = None
    binding_value: Annotated[str, Field(min_length=1, max_length=128)] | None = None
    binding_kind: Literal["entity_id", "binding_value"] | None = None
    sql_type: (
        Literal["tinyint", "smallint", "int", "bigint", "uniqueidentifier", "nvarchar"] | None
    ) = None
    max_length: Annotated[int, Field(ge=1, le=4000)] | None = None
    candidates: Annotated[list[EntityResolutionCandidateV2], Field(max_length=10)] | None = None
    error_code: Annotated[str, Field(min_length=1, max_length=160)] | None = None

    @model_validator(mode="after")
    def validate_status_payload(self) -> EntityResolutionItemV2:
        if self.status == "resolved":
            if None in (self.entity_id, self.display_text, self.binding_kind, self.sql_type):
                raise ValueError("resolved status requires complete binding metadata")
            if self.binding_kind == "binding_value" and self.binding_value is None:
                raise ValueError("binding_value kind requires a binding value")
            if (self.sql_type == "nvarchar") != (self.max_length is not None):
                raise ValueError("max_length is required only for nvarchar")
        if self.status == "ambiguous" and not self.candidates:
            raise ValueError("ambiguous status requires candidates")
        return self


class EntityResolutionRequestV2(RuntimeContractModel):
    contract_version: Literal["2.0"] = "2.0"
    resolution_context_handle: Annotated[str, Field(min_length=1, max_length=4096)]
    request_id: Annotated[str, Field(min_length=1, max_length=128)]
    conversation_id: Annotated[str, Field(min_length=1, max_length=128)]
    turn_id: Annotated[str, Field(min_length=1, max_length=128)]
    entities: Annotated[list[EntityResolutionReferenceV2], Field(min_length=1, max_length=25)]


class EntityResolutionResultV2(RuntimeContractModel):
    contract_version: Literal["2.0"] = "2.0"
    results: Annotated[list[EntityResolutionItemV2], Field(min_length=1, max_length=25)]


class QueryParameterDraftBaseV2(RuntimeContractModel):
    name: Identifier
    nullable: bool


class BitParameterDraftV2(QueryParameterDraftBaseV2):
    sql_type: Literal["bit"]
    value: bool | None


class IntegerParameterDraftV2(QueryParameterDraftBaseV2):
    sql_type: Literal["tinyint", "smallint", "int", "bigint"]
    value: int | None


class DecimalParameterDraftV2(QueryParameterDraftBaseV2):
    sql_type: Literal["decimal"]
    precision: Annotated[int, Field(ge=1, le=38)]
    scale: Annotated[int, Field(ge=0, le=38)]
    value: Annotated[str, Field(pattern=r"^-?(0|[1-9][0-9]*)(\.[0-9]+)?$")] | None

    @model_validator(mode="after")
    def validate_decimal(self) -> DecimalParameterDraftV2:
        if self.scale > self.precision:
            raise ValueError("decimal scale cannot exceed precision")
        return self


class DateParameterDraftV2(QueryParameterDraftBaseV2):
    sql_type: Literal["date"]
    value: str | None


class DateTimeParameterDraftV2(QueryParameterDraftBaseV2):
    sql_type: Literal["datetime2"]
    value: str | None


class UniqueIdentifierParameterDraftV2(QueryParameterDraftBaseV2):
    sql_type: Literal["uniqueidentifier"]
    value: str | None


class NVarCharParameterDraftV2(QueryParameterDraftBaseV2):
    sql_type: Literal["nvarchar"]
    max_length: Annotated[int, Field(ge=1, le=4000)]
    value: str | None


QueryParameterDraftV2 = (
    BitParameterDraftV2
    | IntegerParameterDraftV2
    | DecimalParameterDraftV2
    | DateParameterDraftV2
    | DateTimeParameterDraftV2
    | UniqueIdentifierParameterDraftV2
    | NVarCharParameterDraftV2
)


class ProposedSemanticColumnV1(RuntimeContractModel):
    ordinal: Annotated[int, Field(ge=0, le=99)]
    key: Annotated[str, Field(min_length=1, max_length=160)]
    role: Literal["identifier", "dimension", "measure", "unknown"]
    semantic_type: Literal[
        "identifier", "category", "number", "currency", "date", "datetime", "unknown"
    ]
    aggregation: Literal["none", "sum", "count", "avg", "min", "max", "unknown"]


class ProposedResultSemanticsV1(RuntimeContractModel):
    version: Literal["1.0"] = "1.0"
    shape: Literal[
        "scalar", "detail", "grouped_aggregate", "ranking", "comparison", "distribution", "trend"
    ]
    columns: Annotated[list[ProposedSemanticColumnV1], Field(max_length=100)]


class ChartSortV1(RuntimeContractModel):
    field: Annotated[str, Field(min_length=1, max_length=160)]
    direction: Literal["ascending", "descending"]
    nulls: Literal["first", "last"]


class ChartCategoryAxisV1(RuntimeContractModel):
    title: Annotated[str, Field(min_length=1, max_length=200)] | None
    label_format: Literal["auto", "date", "month_short", "month_year", "category"]


class ChartValueAxisV1(RuntimeContractModel):
    title: Annotated[str, Field(min_length=1, max_length=200)] | None
    scale: Literal["linear", "logarithmic"]
    format: Literal["auto", "number", "integer", "currency", "percent"]
    zero_baseline: Literal["required", "optional", "suppressed"]


class ChartAxisV1(RuntimeContractModel):
    category: ChartCategoryAxisV1
    value: ChartValueAxisV1


class ChartLimitV1(RuntimeContractModel):
    max_categories: Annotated[int, Field(ge=1, le=500)]
    max_series: Annotated[int, Field(ge=1, le=100)]
    overflow: Literal["degrade"]


class ChartDefinitionV2(RuntimeContractModel):
    chart_definition_version: Literal["2.0"]
    type: Literal["bar", "column", "line", "area", "pie", "donut"]
    orientation: Literal["horizontal", "vertical"] | None
    series_mode: Literal["fields", "grouped"]
    category_field: Annotated[str, Field(min_length=1, max_length=160)]
    measure_fields: Annotated[
        list[Annotated[str, Field(min_length=1, max_length=160)]], Field(min_length=1, max_length=8)
    ]
    series_group_field: Annotated[str, Field(min_length=1, max_length=160)] | None
    stacking: Literal["none", "normal", "percent"]
    sort: ChartSortV1 | None
    axis: ChartAxisV1
    limit: ChartLimitV1
    title: Annotated[str, Field(min_length=1, max_length=500)]

    @model_validator(mode="after")
    def validate_chart(self) -> ChartDefinitionV2:
        if len(set(self.measure_fields)) != len(self.measure_fields):
            raise ValueError("measure_fields must be unique")
        if self.series_mode == "fields" and self.series_group_field is not None:
            raise ValueError("fields mode forbids series_group_field")
        if self.series_mode == "grouped":
            if len(self.measure_fields) != 1 or self.series_group_field is None:
                raise ValueError("grouped mode requires one measure and a series_group_field")
            if self.series_group_field == self.category_field:
                raise ValueError("series_group_field must differ from category_field")
            if self.series_group_field in self.measure_fields:
                raise ValueError("series_group_field cannot be a measure")
        if self.type == "bar" and self.orientation != "horizontal":
            raise ValueError("bar requires horizontal orientation")
        if self.type == "column" and self.orientation != "vertical":
            raise ValueError("column requires vertical orientation")
        if self.type not in {"bar", "column"} and self.orientation is not None:
            raise ValueError("orientation only applies to bar and column")
        if self.type == "line" and self.stacking != "none":
            raise ValueError("line charts cannot be stacked")
        if self.type in {"pie", "donut"} and self.stacking != "none":
            raise ValueError("pie and donut do not support stacking")
        return self


class ProposedPresentationV1(RuntimeContractModel):
    presentation_plan_version: Literal["1.0"]
    kind: Literal["data_grid", "chart", "data_grid_with_chart"]
    chart: ChartDefinitionV2 | None

    @model_validator(mode="after")
    def validate_presentation(self) -> ProposedPresentationV1:
        if self.kind == "data_grid" and self.chart is not None:
            raise ValueError("data_grid forbids chart")
        if self.kind in {"chart", "data_grid_with_chart"} and self.chart is None:
            raise ValueError("chart presentation requires chart")
        return self


class QuerySqlDraftV5(RuntimeContractModel):
    query_sql_draft_version: Literal["5.0"]
    sql: Annotated[str, Field(min_length=1, max_length=100000)]
    parameters: Annotated[list[QueryParameterDraftV2], Field(max_length=200)]
    proposed_result_semantics: ProposedResultSemanticsV1
    proposed_presentation: ProposedPresentationV1 | None

    @model_validator(mode="after")
    def validate_presentation_aliases(self) -> QuerySqlDraftV5:
        if self.proposed_presentation is None or self.proposed_presentation.chart is None:
            return self
        chart = self.proposed_presentation.chart
        semantics = {column.key: column for column in self.proposed_result_semantics.columns}
        if (
            chart.category_field not in semantics
            or semantics[chart.category_field].role != "dimension"
        ):
            raise ValueError("category_field must reference a semantic dimension")
        if any(
            field not in semantics or semantics[field].role != "measure"
            for field in chart.measure_fields
        ):
            raise ValueError("measure_fields must reference semantic measures")
        if chart.series_group_field is not None and (
            chart.series_group_field not in semantics
            or semantics[chart.series_group_field].role != "dimension"
        ):
            raise ValueError("series_group_field must reference a semantic dimension")
        if chart.sort is not None and chart.sort.field not in semantics:
            raise ValueError("sort.field must reference a SELECT alias")
        return self
