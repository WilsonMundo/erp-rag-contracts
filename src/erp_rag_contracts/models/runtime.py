from __future__ import annotations

from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator


class RuntimeContractModel(BaseModel):
    model_config = ConfigDict(extra="forbid")


EntityType = Literal["branch", "customer", "product", "supplier", "seller", "document"]
Identifier = Annotated[str, Field(pattern=r"^[A-Za-z_][A-Za-z0-9_]{0,127}$")]
ReferenceIdentifier = Annotated[str, Field(pattern=r"^[a-z][a-z0-9_]{0,79}$")]


class EntityReferenceV1(RuntimeContractModel):
    ref: ReferenceIdentifier
    entity_type: EntityType
    mention: Annotated[str, Field(min_length=1, max_length=500)]
    parameter: Identifier
    required: bool = True
    hints: dict[str, str] | None = None
    dependencies: Annotated[list[ReferenceIdentifier], Field(max_length=10)] | None = None


class EntitySetReferenceV1(RuntimeContractModel):
    set_ref: ReferenceIdentifier
    entity_type: EntityType
    selection_mode: Literal["single", "multiple"]
    member_refs: Annotated[list[ReferenceIdentifier], Field(max_length=10)] = Field(
        default_factory=list
    )
    parameter_slots: Annotated[list[Identifier], Field(min_length=1, max_length=10)]
    binding_source: Literal["entity_id", "binding_value"]
    minimum_selections: Annotated[int, Field(ge=1, le=10)] = 1
    maximum_selections: Annotated[int, Field(ge=1, le=10)]
    required: bool = True

    @model_validator(mode="after")
    def validate_cardinality(self) -> EntitySetReferenceV1:
        slot_count = len(self.parameter_slots)
        if len(set(self.parameter_slots)) != slot_count:
            raise ValueError("parameter_slots must be unique")
        if len(set(self.member_refs)) != len(self.member_refs):
            raise ValueError("member_refs must be unique")
        if self.minimum_selections > self.maximum_selections:
            raise ValueError("minimum_selections cannot exceed maximum_selections")
        if self.maximum_selections > slot_count:
            raise ValueError("maximum_selections cannot exceed parameter slot count")
        if self.selection_mode == "single" and (slot_count != 1 or self.maximum_selections != 1):
            raise ValueError("single selection requires exactly one slot and maximum 1")
        if self.selection_mode == "multiple" and slot_count < 2:
            raise ValueError("multiple selection requires at least two slots")
        return self


class QueryParameterDraftV1(RuntimeContractModel):
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
    nullable: bool
    value: str | int | bool | None
    precision: int | None = None
    scale: int | None = None
    max_length: int | None = None


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


class QuerySqlDraftV3(RuntimeContractModel):
    sql: Annotated[str, Field(min_length=1, max_length=100000)]
    parameters: Annotated[list[QueryParameterDraftV1], Field(max_length=200)]
    proposed_result_semantics: ProposedResultSemanticsV1
    entity_references: Annotated[list[EntityReferenceV1], Field(max_length=25)]
    entity_sets: Annotated[list[EntitySetReferenceV1], Field(max_length=10)]
