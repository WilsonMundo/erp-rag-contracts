"""Strict Pydantic v2 contracts for reviewer source, normalized, and pipeline stages."""

from __future__ import annotations

import math
from typing import Annotated, Literal, TypeAlias

from pydantic import (
    AfterValidator,
    BaseModel,
    ConfigDict,
    Field,
    StringConstraints,
    model_validator,
)

Identifier = Annotated[str, StringConstraints(pattern=r"^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$")]
SemVer = Annotated[
    str, StringConstraints(pattern=r"^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$")
]
ReviewerSchemaVersion = Literal["1.0"]
CatalogVersion = Annotated[str, StringConstraints(pattern=r"^\d{4}\.\d{2}$")]
SemanticHash = Annotated[str, StringConstraints(pattern=r"^sha256:[0-9a-f]{64}$")]
FileHash = Annotated[str, StringConstraints(pattern=r"^[0-9a-f]{64}$")]
ReleaseFileHash = SemanticHash
Language = Annotated[str, StringConstraints(pattern=r"^[a-z]{2}(?:-[A-Z]{2})?$")]
Status: TypeAlias = Literal["approved", "draft", "needs_review", "deprecated"]
DocumentType: TypeAlias = Literal["query_example", "table_schema", "table_family"]
JsonScalar: TypeAlias = str | int | float | bool | None


def _safe_relative_path(value: str) -> str:
    if value.startswith("/") or ":" in value or "\\" in value or ".." in value.split("/"):
        raise ValueError("path must be normalized, relative, and cannot contain '..'")
    return value


RelativePath = Annotated[
    str,
    StringConstraints(pattern=r"^[A-Za-z0-9_.-]+(?:/[A-Za-z0-9_.-]+)*$"),
    Field(
        json_schema_extra={
            "pattern": r"^(?![A-Za-z]:)(?!/)(?!.*(?:^|/)\.\.(?:/|$))[A-Za-z0-9_.-]+(?:/[A-Za-z0-9_.-]+)*$"
        }
    ),
    AfterValidator(_safe_relative_path),
]


class StrictModel(BaseModel):
    model_config = ConfigDict(extra="forbid")


class QuestionsV1(StrictModel):
    canonical: str
    paraphrases: list[str]


class EntityV1(StrictModel):
    id: str
    label: str


class RequiredFieldV1(StrictModel):
    name: str
    type: str
    required: bool
    clarification_prompt: str


class OptionalFieldV1(StrictModel):
    name: str
    type: str
    description: str | None = None
    required: bool | None = None
    default: JsonScalar = None
    minimum: int | float | None = None
    maximum: int | float | None = None


class MetricV1(StrictModel):
    id: str
    label: str
    description: str
    aggregation: str
    expression: str


class DimensionV1(StrictModel):
    id: str
    label: str
    group_by: list[str]


class QueryBusinessRuleV1(StrictModel):
    rule_id: str
    description: str
    expression: str


class ColumnsUsedV1(StrictModel):
    table: str
    alias: str
    columns: list[str]


class TableUsedV1(StrictModel):
    name: str
    alias: str
    role: str
    description: str
    object_kind: str
    physical_schema: str | None = None
    knowledge_document_id: str | None = None


class JoinUsedV1(StrictModel):
    left_table: str
    left_alias: str
    left_column: str | list[str]
    right_table: str
    right_alias: str
    right_column: str | list[str]
    join_type: str
    expression: str
    purpose: str


class ParameterV1(StrictModel):
    name: str
    sql_type: str
    required: bool
    source: str
    default: JsonScalar = None
    minimum: int | float | None = None
    maximum: int | float | None = None


class ExpectedColumnV1(StrictModel):
    name: str
    label: str
    type: str


class ExpectedOutputV1(StrictModel):
    columns: list[ExpectedColumnV1]
    default_order: str
    presentation: str


class DateRangeV1(StrictModel):
    start: str | None
    end_exclusive: str | None


class SourceExampleV1(StrictModel):
    question: str
    date_range: DateRangeV1 | None = None
    base_period: DateRangeV1 | None = None
    comparison_period: DateRangeV1 | None = None
    period_1: DateRangeV1 | None = None
    period_2: DateRangeV1 | None = None
    customer_code: str | None = None
    product_code: str | None = None
    top_n: int | None = None


class QueryRetrievalV1(StrictModel):
    keywords: list[str]
    text_template_version: str
    semantic_text: str | None = None
    content_hash: SemanticHash | None = None


class QueryMetadataV1(StrictModel):
    created_at: str
    reviewed_at: str
    reviewed_by: str
    source: str
    review_notes: list[str]
    original_example_id: str | None = None


class SqlAnalysisObjectV1(StrictModel):
    name: str
    alias: str
    object_kind: str


class SqlAnalysisAliasV1(StrictModel):
    alias: str
    target_name: str
    target_object_kind: str


class SqlObjectAnalysisV1(StrictModel):
    physical_tables: list[SqlAnalysisObjectV1]
    ctes: list[SqlAnalysisObjectV1]
    derived_tables: list[SqlAnalysisObjectV1]
    aliases: list[SqlAnalysisAliasV1]


class QueryExampleDocumentSourceV1(StrictModel):
    schema_version: ReviewerSchemaVersion | None = None
    catalog_version: CatalogVersion | None = None
    document_id: str
    document_version: int = Field(gt=0)
    document_type: Literal["query_example"]
    status: Status
    module: str | None = None
    language: Language | None = None
    intent_id: str
    title: str
    questions: QuestionsV1
    business_goal: str
    required_fields: list[RequiredFieldV1]
    optional_fields: list[OptionalFieldV1]
    analysis_type: str
    entity: EntityV1
    metrics: list[MetricV1]
    dimensions: list[DimensionV1]
    tables_used: list[TableUsedV1]
    joins_used: list[JoinUsedV1]
    columns_used: list[ColumnsUsedV1] = Field(default_factory=list)
    business_rules: list[QueryBusinessRuleV1]
    sql_template: str
    parameters: list[ParameterV1]
    expected_output: ExpectedOutputV1
    retrieval: QueryRetrievalV1
    source_examples: list[SourceExampleV1]
    metadata: QueryMetadataV1
    semantic_text: str | None = None
    content_hash: SemanticHash | None = None
    sql_object_analysis: SqlObjectAnalysisV1 | None = None
    usable_for_sql_generation: bool | None = None


class QueryExampleDocumentEffectiveV1(QueryExampleDocumentSourceV1):
    schema_version: ReviewerSchemaVersion
    catalog_version: CatalogVersion
    module: str
    language: Language


class QueryExampleCatalogV1(StrictModel):
    schema_version: ReviewerSchemaVersion
    catalog_version: CatalogVersion
    module: str
    language: Language
    documents: list[QueryExampleDocumentSourceV1]


class ColumnV1(StrictModel):
    name: str
    sql_type: str | None
    nullable: bool | None
    primary_key: bool
    foreign_key: bool
    description: str
    business_terms: list[str]
    verification_status: str


class TableDefinitionV1(StrictModel):
    name: str
    canonical_name: str
    alias: str
    description: str
    grain: str
    primary_key: list[str]
    columns: list[ColumnV1]
    modules: list[str]
    used_for: list[str]


class RelationshipV1(StrictModel):
    relationship_id: str
    target_table: str
    local_columns: list[str]
    target_columns: list[str]
    join_type: str
    join_expression: str
    relationship_type: str
    purpose: str
    target_resolution: str
    verification_status: str
    modules: list[str] | None = None
    when_to_use: list[str] | None = None


class TableBusinessRuleV1(StrictModel):
    rule_id: str
    name: str | None = None
    description: str | None = None
    rule_type: str | None = None
    type: str | None = None
    condition: str | list[str] | None = None
    sql_expression: str | list[str] | None = None
    expression_sql: str | None = None
    severity: str
    verification_status: str | None = None
    applies_to_modules: list[str] | None = None
    fields_involved: list[str] | None = None
    tables_involved: list[str] | None = None
    related_transaction_ids: list[int] | None = None
    exceptions: list[str] | None = None
    source: str | None = None
    values: RuleValuesV1 | None = None
    notes: list[str] | str


class RuleValuesV1(StrictModel):
    value_0: str | None = Field(default=None, alias="0")
    value_1: str | None = Field(default=None, alias="1")
    value_2: str | None = Field(default=None, alias="2")
    value_3: str | None = Field(default=None, alias="3")
    value_4: str | None = Field(default=None, alias="4")
    value_5: str | None = Field(default=None, alias="5")
    value_6: str | None = Field(default=None, alias="6")
    value_7: str | None = Field(default=None, alias="7")
    value_8: str | None = Field(default=None, alias="8")
    value_9: str | None = Field(default=None, alias="9")
    value_10: str | None = Field(default=None, alias="10")
    value_11: str | None = Field(default=None, alias="11")
    value_12: str | None = Field(default=None, alias="12")
    value_13: str | None = Field(default=None, alias="13")


class KnowledgeRetrievalV1(StrictModel):
    keywords: list[str]
    semantic_text: str
    content_hash: SemanticHash
    text_template_version: str


class KnowledgeMetadataV1(StrictModel):
    normalized_at: str
    normalized_by: str
    source: str
    source_files: list[str]
    review_notes: list[str]


class ReferenceRecordV1(StrictModel):
    idTransaccionInv: int
    Descripcion: str
    tipo: int
    FlagAfectaInventario: int
    FlagReservaInventario: int
    FlagAfectaCtaCliente: int
    FlagAfectaCtaProveedor: int
    FlagAfectaImpuesto: int | None
    module: str
    document_family: str
    inventory_effect: str
    reservation_effect: str
    business_intent: list[str]
    query_usage: list[str]
    notes: list[str]


class TableSchemaDocumentSourceV1(StrictModel):
    schema_version: ReviewerSchemaVersion
    catalog_version: CatalogVersion
    document_id: str
    document_version: int = Field(gt=0)
    document_type: Literal["table_schema"]
    status: Status
    language: Language
    table: TableDefinitionV1
    relationships: list[RelationshipV1]
    business_rules: list[TableBusinessRuleV1]
    common_filters: list[str]
    common_outputs: list[str]
    metadata: KnowledgeMetadataV1
    retrieval: KnowledgeRetrievalV1
    reference_records: list[ReferenceRecordV1] | None = None
    usable_for_sql_generation: bool | None = None


class FamilyKnownMappingV1(StrictModel):
    table_name: str
    business_name: str


class FamilyDefinitionV1(StrictModel):
    name: str
    description: str
    modules: list[str]
    table_pattern: str
    primary_key_pattern: str
    columns_template: list[ColumnV1]
    relationships_template: list[RelationshipV1]
    known_mappings: list[FamilyKnownMappingV1]
    business_rules: list[TableBusinessRuleV1]


class TableFamilyDocumentSourceV1(StrictModel):
    schema_version: ReviewerSchemaVersion
    catalog_version: CatalogVersion
    document_id: str
    document_version: int = Field(gt=0)
    document_type: Literal["table_family"]
    status: Status
    language: Language
    family: FamilyDefinitionV1
    retrieval: KnowledgeRetrievalV1
    metadata: KnowledgeMetadataV1
    usable_for_sql_generation: bool | None = None


SourceDocument: TypeAlias = Annotated[
    QueryExampleDocumentSourceV1 | TableSchemaDocumentSourceV1 | TableFamilyDocumentSourceV1,
    Field(discriminator="document_type"),
]
EffectiveReviewerDocumentV1: TypeAlias = Annotated[
    QueryExampleDocumentEffectiveV1 | TableSchemaDocumentSourceV1 | TableFamilyDocumentSourceV1,
    Field(discriminator="document_type"),
]


class SourceValidationErrorV1(StrictModel):
    path: str
    code: str
    detail: str


class SourceManifestEntryV1(StrictModel):
    file: str
    document_id: str
    document_type: Literal["table_schema", "table_family"]
    status: Status
    sha256: FileHash
    validation_errors: list[SourceValidationErrorV1]


class SourceManifestV1(StrictModel):
    schema_version: ReviewerSchemaVersion
    documents: list[SourceManifestEntryV1]


class ReleaseFileEntryV1(StrictModel):
    path: RelativePath
    sha256: ReleaseFileHash
    kind: str


class ReleaseCountsV1(StrictModel):
    catalogs: int
    eligible: int
    families: int
    files: int
    ineligible: int
    query_examples: int
    tables: int


class ReleaseManifestV1(StrictModel):
    schema_version: ReviewerSchemaVersion = "1.0"
    release_version: CatalogVersion
    contract_version: ReviewerSchemaVersion = "1.0"
    build_date: str | None = None
    source: str
    result: Literal["valid", "invalid"]
    files: list[ReleaseFileEntryV1]
    counts: ReleaseCountsV1
    blockers: int
    warnings: int


class FunctionalQueryManifestDocumentV1(StrictModel):
    document_id: str
    document_version: int
    status: Status
    usable_for_sql_generation: bool


class FunctionalQueryCatalogEntryV1(StrictModel):
    path: RelativePath
    catalog_version: CatalogVersion
    module: str
    documents: list[FunctionalQueryManifestDocumentV1]


class FunctionalQueryManifestV1(StrictModel):
    schema_version: ReviewerSchemaVersion
    catalogs: list[FunctionalQueryCatalogEntryV1]


class FunctionalKnowledgeManifestEntryV1(StrictModel):
    document_id: str
    document_version: int
    document_type: Literal["table_schema", "table_family"]
    status: Status
    usable_for_sql_generation: bool
    path: RelativePath


class FunctionalKnowledgeManifestV1(StrictModel):
    schema_version: ReviewerSchemaVersion
    documents: list[FunctionalKnowledgeManifestEntryV1]


class ModuleManifestEntryV1(StrictModel):
    document_id: str
    document_version: int = Field(gt=0)
    document_type: DocumentType
    module: str
    relative_path: RelativePath
    source_file_sha256: FileHash | None = None


class ModuleManifestSourceV1(StrictModel):
    contract_version: SemVer
    schema_version: SemVer
    catalog_version: str
    module: str
    documents: list[ModuleManifestEntryV1]
    dependencies: list[str] = Field(default_factory=list)


class ModuleCatalogPackageSourceV1(StrictModel):
    contract_version: SemVer
    schema_version: SemVer
    catalog_version: str
    module: str
    language: Language
    manifest: RelativePath
    query_examples: list[RelativePath] = Field(default_factory=list)
    table_schemas: list[RelativePath] = Field(default_factory=list)
    table_families: list[RelativePath] = Field(default_factory=list)
    dependencies: list[str] = Field(default_factory=list)


class EligibilityCapabilitiesV1(StrictModel):
    retrieval_eligible: bool
    embedding_eligible: bool
    sql_generation_eligible: bool
    physical_metadata_complete: bool
    reasons: list[str]
    policy_version: SemVer


class ProvenanceV1(StrictModel):
    source_reference: str
    source_file_sha256: FileHash
    normalizer_version: SemVer
    transformations: list[str]
    divergences: list[str]


class NormalizedJoinV1(StrictModel):
    left_table: str
    left_alias: str
    left_columns: list[str]
    right_table: str
    right_alias: str
    right_columns: list[str]
    join_type: str
    condition: str
    purpose: str
    verification_status: Literal["source_declared"]
    resolution_status: Literal["resolved", "unresolved"]


class NormalizedBaseV1(StrictModel):
    contract_version: SemVer
    schema_version: ReviewerSchemaVersion
    catalog_version: CatalogVersion
    document_id: str
    document_version: int = Field(gt=0)
    document_type: DocumentType
    module: str
    modules: list[str]
    status: Status
    language: Language
    title: str
    semantic_text: str
    content_hash: SemanticHash
    sql_object_analysis: SqlObjectAnalysisV1 | None
    capabilities: EligibilityCapabilitiesV1
    provenance: ProvenanceV1


class NormalizedQueryExampleV1(NormalizedBaseV1):
    document_type: Literal["query_example"]
    joins: list[NormalizedJoinV1]
    source: QueryExampleDocumentEffectiveV1


class NormalizedTableSchemaV1(NormalizedBaseV1):
    document_type: Literal["table_schema"]
    source: TableSchemaDocumentSourceV1


class NormalizedTableFamilyV1(NormalizedBaseV1):
    document_type: Literal["table_family"]
    source: TableFamilyDocumentSourceV1


NormalizedQueryV1 = NormalizedQueryExampleV1
NormalizedTableV1 = NormalizedTableSchemaV1
NormalizedCatalogRecordV1: TypeAlias = Annotated[
    NormalizedQueryExampleV1 | NormalizedTableSchemaV1 | NormalizedTableFamilyV1,
    Field(discriminator="document_type"),
]


class SQLObjectRegistryEntry(StrictModel):
    original_name: str
    physical_schema: str = "dbo"
    physical_name: str
    object_kind: str
    lookup_key: str
    knowledge_document_id: str
    document_version: int
    status: Status
    usable_for_sql_generation: bool


class SQLObjectRegistryV1(StrictModel):
    schema_version: str
    catalog_version: str
    entries: list[SQLObjectRegistryEntry]


class EmbeddingArtifactV1(StrictModel):
    document_id: str
    document_version: int = Field(gt=0)
    content_hash: SemanticHash
    embedding_model: str
    embedding_dimensions: int = Field(gt=0)
    vector: list[float]
    generated_at_epoch_ms: int = Field(ge=0)

    @model_validator(mode="after")
    def coherent(self) -> EmbeddingArtifactV1:
        if len(self.vector) != self.embedding_dimensions or not all(
            math.isfinite(x) for x in self.vector
        ):
            raise ValueError("vector must match dimensions and contain finite values")
        return self


class MilvusIngestionRecordV1(StrictModel):
    ingestion_schema_version: SemVer
    document_id: str
    document_version: int = Field(gt=0)
    catalog_version: str
    document_type: DocumentType
    module: str
    modules: list[str]
    status: Status
    language: Language
    title: str
    semantic_text: str
    content_hash: SemanticHash
    embedding_model: str
    embedding_dimensions: int = Field(gt=0)
    capabilities: EligibilityCapabilitiesV1
    payload_reference: RelativePath
    ingested_at_epoch_ms: int = Field(ge=0)
    vector: list[float]

    @model_validator(mode="after")
    def coherent(self) -> MilvusIngestionRecordV1:
        if len(self.vector) != self.embedding_dimensions or not all(
            math.isfinite(x) for x in self.vector
        ):
            raise ValueError("vector must match dimensions and contain finite values")
        return self
