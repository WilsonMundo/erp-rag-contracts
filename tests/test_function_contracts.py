import json
from pathlib import Path

import pytest
from jsonschema import Draft202012Validator
from pydantic import TypeAdapter, ValidationError

from erp_rag_contracts.models.contracts import (
    FunctionSchemaDocumentSourceV1,
    NormalizedCatalogRecordV1,
)
from erp_rag_contracts.normalization import normalize_document

ROOT = Path(__file__).resolve().parents[1]


def document():
    return json.loads((ROOT / "examples/valid/function-schema.json").read_text(encoding="utf-8"))


def test_function_schema_and_normalization_parity():
    raw = document()
    for name, value, model in [
        ("source/function-schema-document-v1", raw, FunctionSchemaDocumentSourceV1)
    ]:
        schema = json.loads((ROOT / f"contracts/{name}.schema.json").read_text(encoding="utf-8"))
        Draft202012Validator(schema).validate(value)
        model.model_validate(value)
    result = normalize_document(raw, source_reference="function.json", source_bytes=b"fixture")
    payload = result.model_dump(mode="json", by_alias=True)
    schema = json.loads(
        (ROOT / "contracts/normalized/normalized-catalog-record-v1.schema.json").read_text(
            encoding="utf-8"
        )
    )
    Draft202012Validator(schema).validate(payload)
    TypeAdapter(NormalizedCatalogRecordV1).validate_python(payload)
    assert result.object_kind == "function"
    assert result.source.function.kind == "scalar"
    assert result.capabilities.sql_generation_eligible
    assert result.source.function.parameters[3].name == "Cant"
    assert result.source.function.performance_notes == raw["function"]["performance_notes"]


@pytest.mark.parametrize("value", [None, "false", 0])
def test_return_nullable_rejects_invalid_values(value):
    raw = document()
    raw["function"]["returns"]["nullable"] = value
    with pytest.raises(ValidationError):
        FunctionSchemaDocumentSourceV1.model_validate(raw)
    assert list(
        Draft202012Validator(FunctionSchemaDocumentSourceV1.model_json_schema()).iter_errors(raw)
    )


@pytest.mark.parametrize("change", ["positions", "names", "hash", "approval"])
def test_signature_and_eligibility(change):
    raw = document()
    if change == "positions":
        raw["function"]["parameters"][1]["position"] = 1
    if change == "names":
        raw["function"]["parameters"][1]["name"] = "flagdesc"
    if change in ["positions", "names"]:
        with pytest.raises(ValidationError):
            FunctionSchemaDocumentSourceV1.model_validate(raw)
    else:
        if change == "hash":
            raw["retrieval"]["content_hash"] = "sha256:" + "0" * 64
        if change == "approval":
            raw["function"]["returns"]["verification_status"] = "needs_review"
        result = normalize_document(raw, source_reference="function.json", source_bytes=b"fixture")
        assert not result.capabilities.sql_generation_eligible
