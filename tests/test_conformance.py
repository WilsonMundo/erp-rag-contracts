from __future__ import annotations

import hashlib
import json
import subprocess
import sys
from pathlib import Path

import pytest
from jsonschema import Draft202012Validator
from jsonschema import ValidationError as JsonSchemaValidationError
from pydantic import TypeAdapter, ValidationError

from erp_rag_contracts.conformance import EnvelopeFieldConflict, effective_envelope
from erp_rag_contracts.hashing import canonicalize_semantic_text, semantic_text_hash
from erp_rag_contracts.models.contracts import (
    ModuleManifestSourceV1,
    QueryExampleDocumentSourceV1,
    SourceDocument,
    SQLObjectRegistryV1,
    TableFamilyDocumentSourceV1,
    TableSchemaDocumentSourceV1,
)

ROOT = Path(__file__).parents[1]


def load(path: str) -> dict[str, object]:
    return json.loads((ROOT / path).read_text(encoding="utf-8"))


@pytest.mark.parametrize(
    ("example", "schema", "model"),
    [
        (
            "query-example.json",
            "query-example-document-v1.schema.json",
            QueryExampleDocumentSourceV1,
        ),
        ("table-schema.json", "table-schema-document-v1.schema.json", TableSchemaDocumentSourceV1),
        ("table-family.json", "table-family-document-v1.schema.json", TableFamilyDocumentSourceV1),
        ("module-manifest.json", "module-manifest-v1.schema.json", ModuleManifestSourceV1),
        ("sql-object-registry.json", "sql-object-registry-v1.schema.json", SQLObjectRegistryV1),
    ],
)
def test_valid_examples_json_schema_and_pydantic(example: str, schema: str, model: object) -> None:
    data = load(f"examples/valid/{example}")
    schema_data = load(f"contracts/source/{schema}")
    Draft202012Validator.check_schema(schema_data)
    Draft202012Validator(schema_data).validate(data)
    TypeAdapter(model).validate_python(data)


@pytest.mark.parametrize(
    ("name", "schema", "model"),
    [
        (
            "additional-field.json",
            "query-example-document-v1.schema.json",
            QueryExampleDocumentSourceV1,
        ),
        (
            "unknown-type.json",
            "query-example-document-v1.schema.json",
            QueryExampleDocumentSourceV1,
        ),
        (
            "table-schema-with-family.json",
            "table-schema-document-v1.schema.json",
            TableSchemaDocumentSourceV1,
        ),
        (
            "table-family-with-table.json",
            "table-family-document-v1.schema.json",
            TableFamilyDocumentSourceV1,
        ),
        ("path-traversal.json", "module-manifest-v1.schema.json", ModuleManifestSourceV1),
        (
            "version-zero.json",
            "query-example-document-v1.schema.json",
            QueryExampleDocumentSourceV1,
        ),
        ("invalid-id.json", "query-example-document-v1.schema.json", QueryExampleDocumentSourceV1),
    ],
)
def test_invalid_examples_have_parity(name: str, schema: str, model: object) -> None:
    data = load(f"examples/invalid/{name}")
    with pytest.raises(JsonSchemaValidationError):
        Draft202012Validator(load(f"contracts/source/{schema}")).validate(data)
    with pytest.raises(ValidationError):
        TypeAdapter(model).validate_python(data)


def test_discriminated_union() -> None:
    adapter = TypeAdapter(SourceDocument)
    assert (
        adapter.validate_python(load("examples/valid/table-schema.json")).document_type
        == "table_schema"
    )
    with pytest.raises(ValidationError):
        adapter.validate_python(load("examples/invalid/unknown-type.json"))


def test_envelope_inheritance_and_conflict() -> None:
    document = load("examples/valid/query-example-inherits-envelope.json")
    effective = effective_envelope(document, {"module": "example.sales", "language": "es"})
    assert effective["module"] == "example.sales"
    with pytest.raises(EnvelopeFieldConflict):
        effective_envelope(load("examples/valid/query-example.json"), {"module": "example.other"})


def test_hash_vectors_unicode_crlf_and_trailing_spaces() -> None:
    decomposed = "  Cafe\u0301  \r\nLínea   \r"
    composed = "Café\nLínea"
    assert canonicalize_semantic_text(decomposed) == composed
    assert semantic_text_hash(decomposed) == semantic_text_hash(composed)
    assert semantic_text_hash(composed) == "sha256:" + hashlib.sha256(composed.encode()).hexdigest()


def test_every_schema_is_draft_2020_12_and_recursively_strict() -> None:
    for path in (ROOT / "contracts").rglob("*.schema.json"):
        schema = json.loads(path.read_text(encoding="utf-8"))
        assert schema["$schema"] == "https://json-schema.org/draft/2020-12/schema"
        assert schema["$id"].startswith("urn:erp-rag-contracts:schema:")
        Draft202012Validator.check_schema(schema)
        stack: list[object] = [schema]
        while stack:
            node = stack.pop()
            if isinstance(node, dict):
                if node.get("type") == "object":
                    assert (
                        node.get("additionalProperties") is False
                        or node.get("x-dynamic-map") is True
                        or isinstance(node.get("additionalProperties"), dict)
                    ), path
                stack.extend(node.values())
            elif isinstance(node, list):
                stack.extend(node)


def test_manifest_hashes_and_generation_are_deterministic() -> None:
    manifest = load("contract-manifest.json")
    for entry in manifest["contracts"]:  # type: ignore[index]
        content = (ROOT / entry["path"]).read_bytes()
        assert hashlib.sha256(content).hexdigest() == entry["sha256"]
    for entry in manifest["runtime_fixtures"]:  # type: ignore[index]
        content = (ROOT / entry["path"]).read_bytes()
        assert hashlib.sha256(content).hexdigest() == entry["sha256"]
    for entry in manifest["generated_artifacts"]:  # type: ignore[index]
        content = (ROOT / entry["path"]).read_bytes()
        assert hashlib.sha256(content).hexdigest() == entry["sha256"]
    generated_paths = sorted(
        {
            ROOT / "contract-manifest.json",
            *(ROOT / "contracts" / "runtime").glob("*.schema.json"),
            *(ROOT / "fixtures" / "runtime").rglob("*.json"),
            *(ROOT / "src" / "erp_rag_contracts" / "runtime_schemas").glob("*.json"),
            *(ROOT / "src" / "erp_rag_contracts" / "runtime_fixtures").rglob("*.json"),
            *(ROOT / "generated" / "typescript" / "runtime").glob("*"),
        }
    )
    before = {path: path.read_bytes() for path in generated_paths}
    subprocess.run([sys.executable, "tools/generate_artifacts.py"], cwd=ROOT, check=True)
    assert {path: path.read_bytes() for path in generated_paths} == before


def test_stable_reason_codes() -> None:
    data = load("policies/reason-codes-v1.json")
    codes = {item["code"] for item in data["codes"]}  # type: ignore[index]
    assert {"PARAMETER_UNDECLARED", "PARAMETER_UNUSED", "DOCUMENT_VERSION_REGRESSION"} <= codes
    unused = next(item for item in data["codes"] if item["code"] == "PARAMETER_UNUSED")  # type: ignore[index]
    assert unused["severity"] == "warning" and not unused["blocks_eligibility"]


def test_pipeline_stages_are_separate() -> None:
    normalized = load("contracts/normalized/normalized-query-example-v1.schema.json")
    text = json.dumps(normalized)
    assert (
        '"vector"' not in text
        and '"embedding_model"' not in text
        and '"ingested_at_epoch_ms"' not in text
    )


def test_no_prohibited_dependencies_or_imports() -> None:
    pyproject = (ROOT / "pyproject.toml").read_text(encoding="utf-8").lower()
    assert (
        "openai" not in pyproject and "pymilvus" not in pyproject and "langgraph" not in pyproject
    )
    source = "\n".join(p.read_text(encoding="utf-8").lower() for p in (ROOT / "src").rglob("*.py"))
    assert (
        "import openai" not in source
        and "import pymilvus" not in source
        and "import langgraph" not in source
    )
