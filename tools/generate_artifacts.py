"""Deterministically generate schemas, templates, examples, and contract manifest."""

from __future__ import annotations

import hashlib
import json
import subprocess
from copy import deepcopy
from pathlib import Path
from typing import Any

from pydantic import TypeAdapter

from erp_rag_contracts.models import runtime_v2
from erp_rag_contracts.models.contracts import (
    EmbeddingArtifactV1,
    EmbeddingReleaseManifestV1,
    FunctionalKnowledgeManifestV1,
    FunctionalQueryManifestV1,
    FunctionSchemaDocumentSourceV1,
    MilvusIngestionRecordV1,
    ModuleCatalogPackageSourceV1,
    ModuleManifestSourceV1,
    NormalizedCatalogRecordV1,
    NormalizedFunctionSchemaV1,
    NormalizedQueryExampleV1,
    NormalizedTableFamilyV1,
    NormalizedTableSchemaV1,
    NormalizedViewSchemaV1,
    QueryExampleCatalogV1,
    QueryExampleDocumentEffectiveV1,
    QueryExampleDocumentSourceV1,
    ReleaseManifestV1,
    SourceManifestV1,
    SQLObjectRegistryV1,
    TableFamilyDocumentSourceV1,
    TableSchemaDocumentSourceV1,
    ViewSchemaDocumentSourceV1,
)
from erp_rag_contracts.models.runtime import (
    ChartDefinitionV2,
    EntityResolutionRequestV2,
    EntityResolutionResultV2,
    ProposedPresentationV1,
    QuerySemanticPlanV1,
    QuerySqlDraftV5,
    ResolvedQueryContextV1,
)
from erp_rag_contracts.version import __version__ as package_version

ROOT = Path(__file__).resolve().parents[1]
SCHEMA_URI = "https://json-schema.org/draft/2020-12/schema"
SCHEMAS: dict[str, tuple[Any, str]] = {
    "contracts/source/function-schema-document-v1.schema.json": (
        FunctionSchemaDocumentSourceV1,
        "reviewer-function-source",
    ),
    "contracts/normalized/normalized-function-schema-v1.schema.json": (
        NormalizedFunctionSchemaV1,
        "normalized-function",
    ),
    "contracts/source/view-schema-document-v1.schema.json": (
        ViewSchemaDocumentSourceV1,
        "reviewer-view-source",
    ),
    "contracts/normalized/normalized-view-schema-v1.schema.json": (
        NormalizedViewSchemaV1,
        "normalized-view",
    ),
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
    "contracts/pipeline/embedding-release-manifest-v1.schema.json": (
        EmbeddingReleaseManifestV1,
        "embedding-release-manifest",
    ),
    "contracts/pipeline/milvus-ingestion-record-v1.schema.json": (
        MilvusIngestionRecordV1,
        "milvus-ingestion-record",
    ),
}
RUNTIME_SCHEMAS: dict[str, tuple[Any | None, str, str]] = {
    "contracts/runtime/chat-turn-request-v2.schema.json": (None, "chat-turn-request", "2"),
    "contracts/runtime/chat-turn-response-v2.schema.json": (None, "chat-turn-response", "2"),
    "contracts/runtime/query-sql-draft-v5.schema.json": (QuerySqlDraftV5, "query-sql-draft", "5"),
    "contracts/runtime/query-semantic-plan-v1.schema.json": (
        QuerySemanticPlanV1,
        "query-semantic-plan",
        "1",
    ),
    "contracts/runtime/entity-resolution-request-v2.schema.json": (
        EntityResolutionRequestV2,
        "entity-resolution-request",
        "2",
    ),
    "contracts/runtime/entity-resolution-result-v2.schema.json": (
        EntityResolutionResultV2,
        "entity-resolution-result",
        "2",
    ),
    "contracts/runtime/resolved-query-context-v1.schema.json": (
        ResolvedQueryContextV1,
        "resolved-query-context",
        "1",
    ),
    "contracts/runtime/proposed-presentation-v1.schema.json": (
        ProposedPresentationV1,
        "proposed-presentation",
        "1",
    ),
    "contracts/runtime/chart-definition-v2.schema.json": (
        ChartDefinitionV2,
        "chart-definition",
        "2",
    ),
}

RUNTIME_V2_SCHEMA_MODELS: tuple[tuple[str, Any, str], ...] = (
    ("intent-classification-v2", runtime_v2.IntentClassificationV2, "2"),
    ("presentation-preference-v1", runtime_v2.PresentationPreferenceV1, "1"),
    ("query-sql-draft-v6", runtime_v2.QuerySqlDraftV6, "6"),
    ("proposed-result-semantics-v2", runtime_v2.ProposedResultSemanticsV2, "2"),
    ("result-set-semantics-v1", runtime_v2.ResultSetSemanticsV1, "1"),
    ("result-set-selection-v1", runtime_v2.ResultSetSelectionV1, "1"),
    ("proposed-semantic-column-v2", runtime_v2.ProposedSemanticColumnV2, "2"),
    ("value-reference-v1", runtime_v2.ValueReferenceV1, "1"),
    (
        "resolved-business-reference-context-v1",
        runtime_v2.ResolvedBusinessReferenceContextV1,
        "1",
    ),
    ("resolved-business-reference-v1", runtime_v2.ResolvedBusinessReferenceV1, "1"),
    ("presentation-plan-v2", runtime_v2.PresentationPlanV2, "2"),
    ("presentation-block-v2", runtime_v2.PresentationBlockV2, "2"),
    ("kpi-block-v1", runtime_v2.KpiBlockV1, "1"),
    ("data-grid-block-v1", runtime_v2.DataGridBlockV1, "1"),
    ("pivot-grid-block-v1", runtime_v2.PivotGridBlockV1, "1"),
    ("chart-block-v1", runtime_v2.ChartBlockV1, "1"),
    ("gauge-block-v1", runtime_v2.GaugeBlockV1, "1"),
    ("presentation-layout-v1", runtime_v2.PresentationLayoutV1, "1"),
    ("presentation-block-resolution-v1", runtime_v2.PresentationBlockResolutionV1, "1"),
    ("materialized-presentation-v2", runtime_v2.MaterializedPresentationV2, "2"),
    ("materialized-kpi-block-v1", runtime_v2.MaterializedKpiBlockV1, "1"),
    ("materialized-grid-block-v1", runtime_v2.MaterializedGridBlockV1, "1"),
    ("materialized-pivot-block-v1", runtime_v2.MaterializedPivotBlockV1, "1"),
    ("materialized-chart-block-v1", runtime_v2.MaterializedChartBlockV1, "1"),
    ("materialized-gauge-block-v1", runtime_v2.MaterializedGaugeBlockV1, "1"),
    ("query-result-v2", runtime_v2.QueryResultV2, "2"),
    ("assistant-client-stream-event-v2", runtime_v2.AssistantClientStreamEventV2, "2"),
    ("assistant-historical-result-v2", runtime_v2.AssistantHistoricalResultV2, "2"),
    (
        "assistant-historical-requery-result-v2",
        runtime_v2.AssistantHistoricalRequeryResultV2,
        "2",
    ),
    ("query-artifact-v1", runtime_v2.QueryArtifactV1, "1"),
    ("query-artifact-parameter-v1", runtime_v2.QueryArtifactParameterV1, "1"),
    ("requery-capability-v1", runtime_v2.RequeryCapabilityV1, "1"),
    ("dashboard-definition-v1", runtime_v2.DashboardDefinitionV1, "1"),
    ("dashboard-widget-v1", runtime_v2.DashboardWidgetV1, "1"),
    ("dashboard-filter-v1", runtime_v2.DashboardFilterV1, "1"),
    ("dashboard-filter-binding-v1", runtime_v2.DashboardFilterBindingV1, "1"),
    ("dashboard-filter-mapping-v1", runtime_v2.DashboardFilterMappingV1, "1"),
    ("dashboard-stream-event-v1", runtime_v2.DashboardStreamEventV1, "1"),
    ("dashboard-result-v1", runtime_v2.DashboardResultV1, "1"),
    ("import-operation-v1", runtime_v2.ImportOperationV1, "1"),
    ("import-preflight-v1", runtime_v2.ImportPreflightV1, "1"),
    ("import-mapping-v1", runtime_v2.ImportMappingV1, "1"),
    ("import-preview-v1", runtime_v2.ImportPreviewV1, "1"),
    ("import-execution-request-v1", runtime_v2.ImportExecutionRequestV1, "1"),
    ("import-result-v1", runtime_v2.ImportResultV1, "1"),
    ("import-issue-v1", runtime_v2.ImportIssueV1, "1"),
    ("import-stream-event-v1", runtime_v2.ImportStreamEventV1, "1"),
    (
        "presentation-capability-profile-v1",
        runtime_v2.PresentationCapabilityProfileV1,
        "1",
    ),
    ("import-capability-descriptor-v1", runtime_v2.ImportCapabilityDescriptorV1, "1"),
)

RUNTIME_SCHEMAS.update(
    {
        f"contracts/runtime/{slug}.schema.json": (model, slug.removesuffix(f"-v{version}"), version)
        for slug, model, version in RUNTIME_V2_SCHEMA_MODELS
    }
)


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


def runtime_schema_for(model: Any, slug: str, version: str) -> dict[str, Any]:
    schema = TypeAdapter(model).json_schema(mode="validation")
    schema["$schema"] = SCHEMA_URI
    schema["$id"] = f"urn:erp-rag-contracts:schema:{slug}:v{version}"
    schema["description"] = f"Contrato normativo runtime {slug} versión {version}."
    return schema


def generate_chat_runtime_fixtures() -> None:
    request_schema = json.loads(
        (ROOT / "contracts/runtime/chat-turn-request-v2.schema.json").read_text(encoding="utf-8")
    )
    response_schema = json.loads(
        (ROOT / "contracts/runtime/chat-turn-response-v2.schema.json").read_text(encoding="utf-8")
    )
    user_message = deepcopy(request_schema["examples"][0])
    clarification_base = {
        "contract_version": "2.0",
        "request_id": "req-selection",
        "conversation_id": "conv-selection",
        "turn_id": "turn-selection",
        "expected_state_revision": 1,
        "runtime_context": {
            "current_datetime": "2026-09-02T12:00:00-06:00",
            "timezone": "America/Guatemala",
            "locale": "es-GT",
        },
        "input": {
            "type": "clarification_response",
            "clarification_response": {
                "clarification_id": "clar-selection",
                "field": "entity",
                "value": {},
            },
        },
    }

    def request_with_value(value: dict[str, Any]) -> dict[str, Any]:
        fixture = deepcopy(clarification_base)
        fixture["input"]["clarification_response"]["value"] = value
        return fixture

    multi_ids = [str(index) for index in range(1, 11)]
    valid_requests = {
        "user-message.json": user_message,
        "entity-selection.json": request_with_value(
            {"kind": "entity_selection", "entity_type": "branch", "entity_id": "17"}
        ),
        "entity-multi-selection-one.json": request_with_value(
            {"kind": "entity_multi_selection", "entity_type": "branch", "entity_ids": ["17"]}
        ),
        "entity-multi-selection-ten.json": request_with_value(
            {"kind": "entity_multi_selection", "entity_type": "branch", "entity_ids": multi_ids}
        ),
    }
    invalid_requests = {
        "entity-ids-empty.json": request_with_value(
            {"kind": "entity_multi_selection", "entity_type": "branch", "entity_ids": []}
        ),
        "entity-ids-eleven.json": request_with_value(
            {
                "kind": "entity_multi_selection",
                "entity_type": "branch",
                "entity_ids": [*multi_ids, "11"],
            }
        ),
        "entity-ids-duplicated.json": request_with_value(
            {
                "kind": "entity_multi_selection",
                "entity_type": "branch",
                "entity_ids": ["17", "17"],
            }
        ),
        "unknown-property.json": {**deepcopy(user_message), "unknown": True},
        "previous-contract-version.json": {**deepcopy(user_message), "contract_version": "1.0"},
    }
    for name, value in valid_requests.items():
        dump(f"fixtures/runtime/chat-turn-request-v2/valid/{name}", value)
    for name, value in invalid_requests.items():
        dump(f"fixtures/runtime/chat-turn-request-v2/invalid/{name}", value)

    normal_response = deepcopy(response_schema["examples"][0])

    def selection_response(response_spec: dict[str, Any]) -> dict[str, Any]:
        return {
            "contract_version": "2.0",
            "request_id": "req-selection",
            "conversation_id": "conv-selection",
            "turn_id": "turn-selection",
            "status": "needs_clarification",
            "message": "Selecciona la entidad.",
            "state_revision": 1,
            "action": {
                "kind": "clarification",
                "clarification_id": "clar-selection",
                "field": "entity",
                "question": "Selecciona la entidad.",
                "response_spec": response_spec,
            },
        }

    entity = {"entity_type": "branch", "search_owner": "dotnet"}
    valid_responses = {
        "normal.json": normal_response,
        "entity-selection.json": selection_response(
            {
                "type": "entity_selection",
                "required": True,
                "allow_free_text": False,
                "entity": entity,
                "options": [{"id": "17", "label": "Edison"}],
            }
        ),
        "entity-multi-selection.json": selection_response(
            {
                "type": "entity_multi_selection",
                "required": True,
                "allow_free_text": False,
                "entity": entity,
                "minimum_selections": 1,
                "maximum_selections": 10,
                "options": [],
                "selected_entity_ids": ["17"],
            }
        ),
        "entity-multi-selection-ten.json": selection_response(
            {
                "type": "entity_multi_selection",
                "required": True,
                "allow_free_text": False,
                "entity": entity,
                "minimum_selections": 1,
                "maximum_selections": 10,
                "options": [],
                "selected_entity_ids": multi_ids,
            }
        ),
    }
    invalid_responses = {
        "single-without-options.json": selection_response(
            {"type": "entity_selection", "required": True, "entity": entity}
        ),
        "multiple-with-single-type.json": selection_response(
            {
                "type": "entity_selection",
                "required": True,
                "entity": entity,
                "entity_ids": ["17", "21"],
                "options": [{"id": "17", "label": "Edison"}],
            }
        ),
        "unknown-property.json": {**deepcopy(normal_response), "unknown": True},
    }
    for name, value in valid_responses.items():
        dump(f"fixtures/runtime/chat-turn-response-v2/valid/{name}", value)
    for name, value in invalid_responses.items():
        dump(f"fixtures/runtime/chat-turn-response-v2/invalid/{name}", value)

    expectations = {
        **{f"chat-turn-request-v2/invalid/{name}": "SCHEMA_REJECTED" for name in invalid_requests},
        **{
            f"chat-turn-response-v2/invalid/{name}": "SCHEMA_REJECTED" for name in invalid_responses
        },
    }
    dump("fixtures/runtime/invalid-expectations.json", expectations)


def generate_pr01_runtime_fixtures() -> None:
    sha = "sha256:" + "a" * 64
    semantics = {
        "version": "2.0",
        "shape": "ranking",
        "result_set": {
            "result_set_semantics_version": "1.0",
            "selection": {
                "kind": "top_n",
                "limit": 10,
                "order_field": "VentaTotal",
                "direction": "descending",
            },
        },
        "columns": [
            {
                "proposed_semantic_column_version": "2.0",
                "ordinal": 0,
                "key": "VentaTotal",
                "role": "measure",
                "semantic_type": "currency",
                "aggregation": "sum",
                "presentation_support": False,
            }
        ],
    }
    layout = {"presentation_layout_version": "1.0", "mode": "flow", "columns": None}
    plan = {
        "presentation_plan_version": "2.0",
        "title": "Top 10 ventas",
        "capability_profile": "devextreme-26",
        "blocks": [
            {
                "block_version": "1.0",
                "block_id": "sales_kpi",
                "kind": "kpi",
                "title": "Ventas",
                "value": {
                    "source": "result_aggregate",
                    "scope": "result_set",
                    "field": "VentaTotal",
                    "aggregation": "sum",
                },
                "format": "currency",
            }
        ],
        "layout": layout,
    }
    query_draft = {
        "query_sql_draft_version": "6.0",
        "sql": "SELECT TOP (@limit) VentaTotal FROM dbo.Ventas ORDER BY VentaTotal DESC",
        "parameters": [{"name": "limit", "sql_type": "int", "nullable": False, "value": 10}],
        "proposed_result_semantics": semantics,
        "presentation_plan": plan,
    }
    business_references = {
        "resolved_business_reference_context_version": "1.0",
        "references": [
            {
                "resolved_business_reference_version": "1.0",
                "reference_id": "sales_monthly_target",
                "reference_type": "target",
                "label": "Meta mensual",
                "value": 100000,
                "semantic_type": "currency",
                "source_id": "authorized-target-2026-09",
                "resolved_at": "2026-09-11T10:00:00-06:00",
            }
        ],
    }
    artifact = {
        "query_artifact_version": "1.0",
        "query_artifact_id": "artifact-001",
        "sql": "SELECT VentaTotal FROM dbo.Ventas WHERE Fecha >= @period_start AND Fecha < @period_end",
        "parameters": [
            {
                "query_artifact_parameter_version": "1.0",
                "name": "period_start",
                "sql_type": "datetime2",
                "semantic_role": "period_start",
                "rebindable": True,
                "nullable": False,
                "value": "2026-09-01T00:00:00-06:00",
            },
            {
                "query_artifact_parameter_version": "1.0",
                "name": "period_end",
                "sql_type": "datetime2",
                "semantic_role": "period_end_exclusive",
                "rebindable": True,
                "nullable": False,
                "value": "2026-10-01T00:00:00-06:00",
            },
        ],
        "semantics": semantics,
        "presentation_plan": plan,
        "ast_fingerprint": sha,
        "catalog_sha256": sha,
        "capability_profile": "devextreme-26",
        "requery": {
            "requery_capability_version": "1.0",
            "available": True,
            "mode": "rebind_parameters",
            "rebindable_parameters": ["period_start", "period_end"],
        },
    }
    dashboard = {
        "dashboard_definition_version": "1.0",
        "dashboard_id": "dashboard-sales",
        "title": "Ventas",
        "status": "draft",
        "global_filters": [
            {
                "dashboard_filter_version": "1.0",
                "filter_id": "period",
                "type": "date_range",
                "label": "Período",
                "required": True,
            }
        ],
        "widgets": [
            {
                "dashboard_widget_version": "1.0",
                "widget_id": "sales_total",
                "query_artifact_id": "artifact-001",
                "block_id": "sales_kpi",
                "layout": {"x": 0, "y": 0, "w": 3, "h": 2},
                "filter_bindings": [
                    {
                        "dashboard_filter_binding_version": "1.0",
                        "filter_id": "period",
                        "mappings": [
                            {
                                "dashboard_filter_mapping_version": "1.0",
                                "source_path": "start",
                                "target_parameter": "period_start",
                            },
                            {
                                "dashboard_filter_mapping_version": "1.0",
                                "source_path": "end_exclusive",
                                "target_parameter": "period_end",
                            },
                        ],
                    }
                ],
            }
        ],
        "grid_layout": {"columns": 12, "row_height": 80},
    }
    operation = {
        "import_operation_version": "1.0",
        "action_id": "catalog.products.import",
        "entity": "product",
        "operation": "import",
        "write_mode": "upsert",
        "policy_id": "catalog.products.import.v1",
    }
    preflight = {
        "import_preflight_version": "1.0",
        "preflight_id": "preflight-001",
        "attachment_sha256": sha,
        "operation": operation,
        "mapping": {
            "import_mapping_version": "1.0",
            "mapping_id": "mapping-001",
            "version": 1,
            "entries": [{"source_column": "Código", "target_field": "Codigo", "required": True}],
        },
        "preview": {
            "import_preview_version": "1.0",
            "columns": ["Código"],
            "rows": [{"row": 2, "values": {"Código": "P-001"}, "valid": True}],
            "truncated": False,
        },
        "issues": [],
        "status": "awaiting_confirmation",
    }
    stream_event = {
        "event_id": "event-001",
        "sequence": 0,
        "timestamp": "2026-09-11T10:00:00-06:00",
        "event_version": "2.0",
        "request_id": "request-001",
        "conversation_id": "conversation-001",
        "turn_id": "turn-001",
        "type": "query.result",
        "payload": {"result_id": "result-001"},
    }
    families = {
        "query-presentation": ("query-sql-draft-v6", query_draft),
        "business-references": (
            "resolved-business-reference-context-v1",
            business_references,
        ),
        "query-artifact": ("query-artifact-v1", artifact),
        "dashboard": ("dashboard-definition-v1", dashboard),
        "import": ("import-preflight-v1", preflight),
        "stream-history": ("assistant-client-stream-event-v2", stream_event),
    }
    for family, (schema_name, valid) in families.items():
        dump(f"fixtures/runtime/pr01-{family}/valid/minimum.json", valid)
        invalid = deepcopy(valid)
        version_key = next(key for key in invalid if key.endswith("version"))
        invalid[version_key] = "0.0"
        dump(f"fixtures/runtime/pr01-{family}/invalid/version-mismatch.json", invalid)
        dump(
            f"fixtures/runtime/pr01-{family}/fixture-metadata.json",
            {"schema": schema_name},
        )


QUERY = {
    "document_id": "example.query.sales",
    "document_version": 1,
    "document_type": "query_example",
    "status": "draft",
    "module": "ventas",
    "schema_version": "2.0",
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
    "schema_version": "2.0",
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
    "schema_version": "2.0",
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
    for path, (model, slug, version) in sorted(RUNTIME_SCHEMAS.items()):
        if model is not None:
            dump(path, runtime_schema_for(model, slug, version))
    package_schema_directory = ROOT / "src" / "erp_rag_contracts" / "runtime_schemas"
    package_schema_directory.mkdir(parents=True, exist_ok=True)
    for path in RUNTIME_SCHEMAS:
        source = ROOT / path
        (package_schema_directory / source.name).write_bytes(source.read_bytes())
    generate_chat_runtime_fixtures()
    generate_pr01_runtime_fixtures()
    package_fixture_directory = ROOT / "src" / "erp_rag_contracts" / "runtime_fixtures"
    for source in (ROOT / "fixtures" / "runtime").rglob("*.json"):
        relative = source.relative_to(ROOT / "fixtures" / "runtime")
        target = package_fixture_directory / relative
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(source.read_bytes())
    subprocess.run(["node", "tools/generate-typescript-contracts.mjs"], cwd=ROOT, check=True)
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
    for path, (_, slug, version) in sorted(RUNTIME_SCHEMAS.items()):
        data = (ROOT / path).read_bytes()
        parsed = json.loads(data)
        entries.append(
            {
                "id": parsed["$id"],
                "path": path,
                "type": slug,
                "status": "stable",
                "compatibility": f"{version}.x",
                "sha256": hashlib.sha256(data).hexdigest(),
            }
        )
    dump(
        "contract-manifest.json",
        {
            "contract_version": package_version,
            "package": "erp-rag-contracts",
            "json_schema_version": "2020-12",
            "published_on": "2026-08-11",
            "contracts": entries,
            "runtime_fixtures": [
                {
                    "path": path.relative_to(ROOT).as_posix(),
                    "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
                }
                for path in sorted((ROOT / "fixtures" / "runtime").rglob("*.json"))
            ],
            "generated_artifacts": [
                {
                    "path": path.relative_to(ROOT).as_posix(),
                    "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
                }
                for path in sorted((ROOT / "generated" / "typescript" / "runtime").glob("*"))
                if path.is_file()
            ],
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
