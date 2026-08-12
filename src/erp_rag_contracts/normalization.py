"""Deterministic, read-only ReviewerSourceV1 to NormalizedV1 conversion."""

from __future__ import annotations

import re
from typing import Any

from .conformance import effective_envelope
from .hashing import semantic_content_hash, source_file_sha256
from .models.contracts import (
    EligibilityCapabilitiesV1,
    NormalizedCatalogRecordV1,
    NormalizedJoinV1,
    NormalizedQueryExampleV1,
    NormalizedTableFamilyV1,
    NormalizedTableSchemaV1,
    ProvenanceV1,
    QueryExampleDocumentEffectiveV1,
    SqlAnalysisAliasV1,
    SqlAnalysisObjectV1,
    SqlObjectAnalysisV1,
    TableFamilyDocumentSourceV1,
    TableSchemaDocumentSourceV1,
)

POLICY_VERSION = "1.0.0"
NORMALIZER_VERSION = "1.0.0"
PARAM_RE = re.compile(r"@[A-Za-z_][A-Za-z0-9_]*")


def query_semantic_text(document: QueryExampleDocumentEffectiveV1) -> str:
    parts = [
        f"Módulo: {document.module}",
        "Tipo: query_example",
        f"Intento: {document.intent_id}",
        f"Título: {document.title}",
        f"Pregunta: {document.questions.canonical}",
        "Paráfrasis: " + "; ".join(document.questions.paraphrases),
        f"Objetivo: {document.business_goal}",
        f"Análisis: {document.analysis_type}",
        f"Entidad: {document.entity.label}",
        "Métricas: " + "; ".join(item.label for item in document.metrics),
        "Dimensiones: " + "; ".join(item.label for item in document.dimensions),
        "Campos requeridos: " + "; ".join(item.name for item in document.required_fields),
        "Palabras clave: " + "; ".join(document.retrieval.keywords),
    ]
    return "\n".join(parts).strip()


def analyze_query_objects(document: QueryExampleDocumentEffectiveV1) -> SqlObjectAnalysisV1:
    physical: list[SqlAnalysisObjectV1] = []
    ctes: list[SqlAnalysisObjectV1] = []
    derived: list[SqlAnalysisObjectV1] = []
    aliases: list[SqlAnalysisAliasV1] = []
    for item in document.tables_used:
        target = SqlAnalysisObjectV1(name=item.name, alias=item.alias, object_kind=item.object_kind)
        if item.object_kind == "cte":
            ctes.append(target)
        elif item.object_kind == "derived_table":
            derived.append(target)
        else:
            physical.append(target)
        aliases.append(
            SqlAnalysisAliasV1(
                alias=item.alias, target_name=item.name, target_object_kind=item.object_kind
            )
        )
    return SqlObjectAnalysisV1(
        physical_tables=physical, ctes=ctes, derived_tables=derived, aliases=aliases
    )


def _capabilities(status: str, sql_ok: bool, physical_complete: bool) -> EligibilityCapabilitiesV1:
    approved = status == "approved"
    reasons: list[str] = []
    if not approved:
        reasons.append("STATUS_NOT_APPROVED")
    if not sql_ok:
        reasons.append("SQL_GENERATION_REQUIREMENTS_NOT_MET")
    if not physical_complete:
        reasons.append("PHYSICAL_METADATA_INCOMPLETE")
    return EligibilityCapabilitiesV1(
        retrieval_eligible=approved,
        embedding_eligible=approved,
        sql_generation_eligible=approved and sql_ok,
        physical_metadata_complete=physical_complete,
        reasons=reasons,
        policy_version=POLICY_VERSION,
    )


def normalize_document(
    raw: dict[str, Any],
    *,
    source_reference: str,
    source_bytes: bytes,
    envelope: dict[str, Any] | None = None,
) -> NormalizedCatalogRecordV1:
    effective = effective_envelope(raw, envelope or {})
    dtype = effective.get("document_type")
    transformations = ["effective-envelope-v1"] if envelope else []
    divergences: list[str] = []
    provenance = ProvenanceV1(
        source_reference=source_reference,
        source_file_sha256=source_file_sha256(source_bytes),
        normalizer_version=NORMALIZER_VERSION,
        transformations=transformations,
        divergences=divergences,
    )
    if dtype == "query_example":
        query_source = QueryExampleDocumentEffectiveV1.model_validate(effective)
        semantic = query_semantic_text(query_source)
        content_hash = semantic_content_hash(semantic)
        analysis = analyze_query_objects(query_source)
        for name, old, new in (
            ("semantic_text", query_source.semantic_text, semantic),
            ("content_hash", query_source.content_hash, content_hash),
            ("sql_object_analysis", query_source.sql_object_analysis, analysis),
        ):
            if old is not None and old != new:
                divergences.append(f"DERIVED_{name.upper()}_DIVERGENCE")
        declared = {"@" + item.name for item in query_source.parameters}
        used = set(PARAM_RE.findall(query_source.sql_template))
        aliases = {item.alias for item in query_source.tables_used}
        joins_ok = all(
            j.left_alias in aliases and j.right_alias in aliases for j in query_source.joins_used
        )
        normalized_joins = [
            NormalizedJoinV1(
                left_table=join.left_table,
                left_alias=join.left_alias,
                left_columns=[join.left_column]
                if isinstance(join.left_column, str)
                else join.left_column,
                right_table=join.right_table,
                right_alias=join.right_alias,
                right_columns=[join.right_column]
                if isinstance(join.right_column, str)
                else join.right_column,
                join_type=join.join_type.lower(),
                condition=join.expression,
                purpose=join.purpose,
                verification_status="source_declared",
                resolution_status="resolved"
                if join.left_alias in aliases and join.right_alias in aliases
                else "unresolved",
            )
            for join in query_source.joins_used
        ]
        sql_ok = bool(query_source.sql_template.strip()) and used <= declared and joins_ok
        capabilities = _capabilities(query_source.status, sql_ok, True)
        if (
            query_source.usable_for_sql_generation is not None
            and query_source.usable_for_sql_generation != capabilities.sql_generation_eligible
        ):
            divergences.append("DERIVED_USABLE_FOR_SQL_GENERATION_DIVERGENCE")
        return NormalizedQueryExampleV1(
            contract_version="1.0.0",
            schema_version=query_source.schema_version,
            catalog_version=query_source.catalog_version,
            document_id=query_source.document_id,
            document_version=query_source.document_version,
            document_type="query_example",
            module=query_source.module,
            modules=[query_source.module],
            status=query_source.status,
            language=query_source.language,
            title=query_source.title,
            semantic_text=semantic,
            content_hash=content_hash,
            sql_object_analysis=analysis,
            capabilities=capabilities,
            provenance=provenance,
            joins=normalized_joins,
            source=query_source,
        )
    if dtype == "table_schema":
        table_source = TableSchemaDocumentSourceV1.model_validate(effective)
        physical_complete = all(
            c.sql_type is not None and c.nullable is not None for c in table_source.table.columns
        )
        capabilities = _capabilities(table_source.status, physical_complete, physical_complete)
        table_semantic = table_source.retrieval.semantic_text
        table_content_hash = semantic_content_hash(table_semantic)
        if table_source.retrieval.content_hash != table_content_hash:
            divergences.append("DERIVED_CONTENT_HASH_DIVERGENCE")
        if (
            table_source.usable_for_sql_generation is not None
            and table_source.usable_for_sql_generation != capabilities.sql_generation_eligible
        ):
            divergences.append("DERIVED_USABLE_FOR_SQL_GENERATION_DIVERGENCE")
        return NormalizedTableSchemaV1(
            contract_version="1.0.0",
            schema_version=table_source.schema_version,
            catalog_version=table_source.catalog_version,
            document_id=table_source.document_id,
            document_version=table_source.document_version,
            document_type="table_schema",
            module=table_source.table.modules[0],
            modules=table_source.table.modules,
            status=table_source.status,
            language=table_source.language,
            title=table_source.table.canonical_name,
            semantic_text=table_semantic,
            content_hash=table_content_hash,
            sql_object_analysis=None,
            capabilities=capabilities,
            provenance=provenance,
            source=table_source,
        )
    family_source = TableFamilyDocumentSourceV1.model_validate(effective)
    family_semantic = family_source.retrieval.semantic_text
    family_content_hash = semantic_content_hash(family_semantic)
    capabilities = _capabilities(family_source.status, False, False)
    return NormalizedTableFamilyV1(
        contract_version="1.0.0",
        schema_version=family_source.schema_version,
        catalog_version=family_source.catalog_version,
        document_id=family_source.document_id,
        document_version=family_source.document_version,
        document_type="table_family",
        module=family_source.family.modules[0],
        modules=family_source.family.modules,
        status=family_source.status,
        language=family_source.language,
        title=family_source.family.name,
        semantic_text=family_semantic,
        content_hash=family_content_hash,
        sql_object_analysis=None,
        capabilities=capabilities,
        provenance=provenance,
        source=family_source,
    )
