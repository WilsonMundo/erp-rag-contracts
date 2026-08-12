"""Deterministically generate schemas, templates, examples, and contract manifest."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path
from typing import Any

from pydantic import TypeAdapter

from erp_rag_contracts.models.contracts import (
    EmbeddingArtifactV1,
    FunctionalKnowledgeManifestV1,
    FunctionalQueryManifestV1,
    MilvusIngestionRecordV1,
    ModuleCatalogPackageSourceV1,
    ModuleManifestSourceV1,
    NormalizedCatalogRecordV1,
    NormalizedQueryExampleV1,
    NormalizedTableFamilyV1,
    NormalizedTableSchemaV1,
    QueryExampleCatalogV1,
    QueryExampleDocumentEffectiveV1,
    QueryExampleDocumentSourceV1,
    ReleaseManifestV1,
    SourceManifestV1,
    SQLObjectRegistryV1,
    TableFamilyDocumentSourceV1,
    TableSchemaDocumentSourceV1,
)

ROOT = Path(__file__).resolve().parents[1]
SCHEMA_URI = "https://json-schema.org/draft/2020-12/schema"
SCHEMAS: dict[str, tuple[Any, str]] = {
    "contracts/source/query-example-document-v1.schema.json": (
        QueryExampleDocumentSourceV1,
        "reviewer-query-source",
    ),
    "contracts/source/query-example-effective-v1.schema.json": (
        QueryExampleDocumentEffectiveV1,
        "reviewer-query-effective",
    ),
    "contracts/source/query-example-catalog-v1.schema.json": (
        QueryExampleCatalogV1,
        "reviewer-query-catalog",
    ),
    "contracts/source/table-schema-document-v1.schema.json": (
        TableSchemaDocumentSourceV1,
        "reviewer-table-source",
    ),
    "contracts/source/table-family-document-v1.schema.json": (
        TableFamilyDocumentSourceV1,
        "reviewer-family-source",
    ),
    "contracts/source/source-manifest-v1.schema.json": (SourceManifestV1, "source-manifest"),
    "contracts/source/release-manifest-v1.schema.json": (ReleaseManifestV1, "release-manifest"),
    "contracts/source/functional-query-manifest-v1.schema.json": (
        FunctionalQueryManifestV1,
        "functional-query-manifest",
    ),
    "contracts/source/functional-knowledge-manifest-v1.schema.json": (
        FunctionalKnowledgeManifestV1,
        "functional-knowledge-manifest",
    ),
    "contracts/source/module-manifest-v1.schema.json": (ModuleManifestSourceV1, "module-manifest"),
    "contracts/source/module-catalog-package-v1.schema.json": (
        ModuleCatalogPackageSourceV1,
        "module-package",
    ),
    "contracts/source/sql-object-registry-v1.schema.json": (
        SQLObjectRegistryV1,
        "sql-object-registry",
    ),
    "contracts/normalized/normalized-query-example-v1.schema.json": (
        NormalizedQueryExampleV1,
        "normalized-query",
    ),
    "contracts/normalized/normalized-table-schema-v1.schema.json": (
        NormalizedTableSchemaV1,
        "normalized-table",
    ),
    "contracts/normalized/normalized-table-family-v1.schema.json": (
        NormalizedTableFamilyV1,
        "normalized-family",
    ),
    "contracts/normalized/normalized-catalog-record-v1.schema.json": (
        NormalizedCatalogRecordV1,
        "normalized-record",
    ),
    "contracts/pipeline/embedding-artifact-v1.schema.json": (
        EmbeddingArtifactV1,
        "embedding-artifact",
    ),
    "contracts/pipeline/milvus-ingestion-record-v1.schema.json": (
        MilvusIngestionRecordV1,
        "milvus-ingestion-record",
    ),
}


def dump(relative: str, value: Any) -> None:
    path = ROOT / relative
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(value, ensure_ascii=False, sort_keys=True, indent=2) + "\n",
        encoding="utf-8",
        newline="\n",
    )


def schema_for(model: Any, slug: str) -> dict[str, Any]:
    schema = TypeAdapter(model).json_schema(mode="validation")
    schema["$schema"] = SCHEMA_URI
    schema["$id"] = f"urn:erp-rag-contracts:schema:{slug}:v1"
    schema["description"] = f"Contrato normativo {slug} versión 1."
    return schema


QUERY = {
    "document_id": "example.query.sales",
    "document_version": 1,
    "document_type": "query_example",
    "status": "draft",
    "module": "ventas",
    "schema_version": "1.0",
    "catalog_version": "2026.08",
    "language": "es",
    "intent_id": "sales",
    "title": "Ventas",
    "questions": {"canonical": "¿Ventas?", "paraphrases": []},
    "business_goal": "Analizar ventas.",
    "required_fields": [],
    "optional_fields": [],
    "analysis_type": "summary",
    "entity": {"id": "sale", "label": "Venta"},
    "metrics": [],
    "dimensions": [],
    "tables_used": [],
    "joins_used": [],
    "columns_used": [],
    "business_rules": [],
    "sql_template": "SELECT 1",
    "parameters": [],
    "expected_output": {
        "columns": [{"name": "Value", "label": "Valor", "type": "integer"}],
        "default_order": "Value",
        "presentation": "table",
    },
    "retrieval": {"keywords": ["ventas"], "text_template_version": "query-es-v1"},
    "source_examples": [],
    "metadata": {
        "created_at": "2026-08-11",
        "reviewed_at": "2026-08-11",
        "reviewed_by": "pending",
        "source": "scaffold",
        "review_notes": [],
    },
}

TABLE = {
    "schema_version": "1.0",
    "catalog_version": "2026.08",
    "document_id": "erp.table.example.v1",
    "document_version": 1,
    "document_type": "table_schema",
    "status": "draft",
    "language": "es",
    "table": {
        "name": "Example",
        "canonical_name": "example",
        "alias": "e",
        "description": "Ejemplo.",
        "grain": "Una fila",
        "primary_key": ["Id"],
        "columns": [
            {
                "name": "Id",
                "sql_type": None,
                "nullable": None,
                "primary_key": True,
                "foreign_key": False,
                "description": "Identificador",
                "business_terms": [],
                "verification_status": "needs_review",
            }
        ],
        "modules": ["ventas"],
        "used_for": [],
    },
    "relationships": [],
    "business_rules": [],
    "common_filters": [],
    "common_outputs": [],
    "metadata": {
        "normalized_at": "2026-08-11",
        "normalized_by": "scaffold",
        "source": "scaffold",
        "source_files": [],
        "review_notes": [],
    },
    "retrieval": {
        "keywords": ["ejemplo"],
        "semantic_text": "Tabla de ejemplo",
        "content_hash": "sha256:1caad7b25be4d83d0981643c84cb91834455288d5dd002e3f4a6e711e8daa942",
        "text_template_version": "table-es-v1",
    },
}

FAMILY = {
    "schema_version": "1.0",
    "catalog_version": "2026.08",
    "document_id": "erp.table_family.example.v1",
    "document_version": 1,
    "document_type": "table_family",
    "status": "draft",
    "language": "es",
    "family": {
        "name": "example",
        "description": "Familia futura.",
        "modules": ["ventas"],
        "table_pattern": "Example",
        "primary_key_pattern": "Id",
        "columns_template": [],
        "relationships_template": [],
        "known_mappings": [],
        "business_rules": [],
    },
    "retrieval": {
        "keywords": ["ejemplo"],
        "semantic_text": "Familia de ejemplo",
        "content_hash": "sha256:e0e25e46fb73b1840877a1a26b6e7a361525a0a347be94192d020157e4d3b85a",
        "text_template_version": "family-es-v1",
    },
    "metadata": {
        "normalized_at": "2026-08-11",
        "normalized_by": "scaffold",
        "source": "scaffold",
        "source_files": [],
        "review_notes": [],
    },
}


def main() -> None:
    for path, (model, slug) in sorted(SCHEMAS.items()):
        dump(path, schema_for(model, slug))
    manifest = {
        "contract_version": "1.0.0",
        "schema_version": "1.0.0",
        "catalog_version": "2026.08",
        "module": "ventas",
        "documents": [],
        "dependencies": [],
    }
    package = {
        "contract_version": "1.0.0",
        "schema_version": "1.0.0",
        "catalog_version": "2026.08",
        "module": "ventas",
        "language": "es",
        "manifest": "module-manifest.json",
        "query_examples": [],
        "table_schemas": [],
        "table_families": [],
        "dependencies": [],
    }
    registry = {"schema_version": "1.0", "catalog_version": "2026.08", "entries": []}
    for name, value in {
        "query-example.json": QUERY,
        "table-schema.json": TABLE,
        "table-family.json": FAMILY,
        "module-manifest.json": manifest,
        "sql-object-registry.json": registry,
    }.items():
        dump(f"examples/valid/{name}", value)
    inherited = dict(QUERY)
    inherited.pop("module")
    inherited.pop("language")
    dump("examples/valid/query-example-inherits-envelope.json", inherited)
    evolved = {**QUERY, "document_version": 2, "title": "Ventas revisión 2"}
    dump("examples/valid/query-example-version-2.json", evolved)
    for name, value in {
        "query-example.template.json": QUERY,
        "table-schema.template.json": TABLE,
        "table-family.template.json": FAMILY,
        "module-manifest.template.json": manifest,
        "module-package.template.json": package,
        "sql-object-registry.template.json": registry,
        "golden-test.template.json": {
            "test_id": "example",
            "question": "¿Ventas?",
            "expected_document_id": QUERY["document_id"],
            "language": "es",
        },
    }.items():
        dump(f"templates/{name}", value)
    invalid = {
        "additional-field.json": {**QUERY, "unexpected": True},
        "unknown-type.json": {**QUERY, "document_type": "report"},
        "table-schema-with-family.json": {**TABLE, "family": FAMILY["family"]},
        "table-family-with-table.json": {**FAMILY, "table": TABLE["table"]},
        "path-traversal.json": {
            **manifest,
            "documents": [
                {
                    "document_id": "x",
                    "document_version": 1,
                    "document_type": "query_example",
                    "module": "ventas",
                    "relative_path": "../x.json",
                }
            ],
        },
        "version-zero.json": {**QUERY, "document_version": 0},
        "invalid-id.json": {**QUERY, "document_type": "invalid"},
        "envelope-conflict.json": {
            "envelope": {"module": "ventas"},
            "document": {**QUERY, "module": "compras"},
        },
        "duplicate-conflict.json": {"documents": [QUERY, {**QUERY, "title": "Conflicto"}]},
        "ambiguous-sql-object.json": {
            "reference": "Example",
            "matches": ["dbo.Example", "archive.Example"],
        },
    }
    for name, value in invalid.items():
        dump(f"examples/invalid/{name}", value)
    entries = []
    for path, (_, slug) in sorted(SCHEMAS.items()):
        data = (ROOT / path).read_bytes()
        parsed = json.loads(data)
        entries.append(
            {
                "id": parsed["$id"],
                "path": path,
                "type": slug,
                "status": "stable",
                "compatibility": "1.x",
                "sha256": hashlib.sha256(data).hexdigest(),
            }
        )
    dump(
        "contract-manifest.json",
        {
            "contract_version": "1.0.0",
            "package": "erp-rag-contracts",
            "json_schema_version": "2020-12",
            "published_on": "2026-08-11",
            "contracts": entries,
            "policies": sorted(
                p.relative_to(ROOT).as_posix() for p in (ROOT / "policies").glob("*.json")
            ),
            "templates": sorted(
                p.relative_to(ROOT).as_posix() for p in (ROOT / "templates").glob("*.json")
            ),
        },
    )


if __name__ == "__main__":
    main()
