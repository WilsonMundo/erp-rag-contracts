import json
from pathlib import Path

import pytest
from jsonschema import Draft202012Validator
from pydantic import TypeAdapter, ValidationError

from erp_rag_contracts.models.contracts import NormalizedCatalogRecordV1, ViewSchemaDocumentSourceV1
from erp_rag_contracts.normalization import normalize_document

ROOT = Path(__file__).resolve().parents[1]


def document():
    return json.loads((ROOT / "examples/valid/view-schema.json").read_text(encoding="utf-8"))


def test_view_source_and_normalized_schema_parity():
    raw = document()
    schema = json.loads((ROOT / "contracts/source/view-schema-document-v1.schema.json").read_text())
    Draft202012Validator(schema).validate(raw)
    ViewSchemaDocumentSourceV1.model_validate(raw)
    normalized = normalize_document(raw, source_reference="view.json", source_bytes=b"fixture")
    assert normalized.document_type == "view_schema"
    assert normalized.object_kind == "view"
    assert normalized.capabilities.sql_generation_eligible
    assert normalized.source.view.logical_key == ["NivelClasificacion", "IdClasificacion"]
    TypeAdapter(NormalizedCatalogRecordV1).validate_python(normalized.model_dump(by_alias=True))
    schema = json.loads(
        (ROOT / "contracts/normalized/normalized-catalog-record-v1.schema.json").read_text()
    )
    Draft202012Validator(schema).validate(normalized.model_dump(mode="json", by_alias=True))


@pytest.mark.parametrize("value", [None, "false", 0])
def test_view_rejects_unknown_or_coerced_nullability(value):
    raw = document()
    raw["view"]["columns"][0]["nullable"] = value
    with pytest.raises(ValidationError):
        ViewSchemaDocumentSourceV1.model_validate(raw)
    assert list(
        Draft202012Validator(ViewSchemaDocumentSourceV1.model_json_schema()).iter_errors(raw)
    )


def test_view_ineligible_for_bad_hash_or_unapproved_column():
    raw = document()
    raw["retrieval"]["content_hash"] = "sha256:" + "0" * 64
    result = normalize_document(raw, source_reference="view.json", source_bytes=b"fixture")
    assert not result.capabilities.sql_generation_eligible
    raw = document()
    raw["view"]["columns"][0]["verification_status"] = "needs_review"
    result = normalize_document(raw, source_reference="view.json", source_bytes=b"fixture")
    assert not result.capabilities.sql_generation_eligible
