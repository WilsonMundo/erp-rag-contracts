import json
from pathlib import Path

import pytest
from jsonschema import Draft202012Validator, FormatChecker
from pydantic import TypeAdapter, ValidationError

from erp_rag_contracts.models.runtime import EntitySetReferenceV1, QuerySqlDraftV3
from erp_rag_contracts.runtime_validation import (
    validate_first_runtime_capability,
    validate_query_sql_draft_invariants,
)

ROOT = Path(__file__).resolve().parents[1]


def load(relative: str) -> object:
    return json.loads((ROOT / relative).read_text(encoding="utf-8"))


@pytest.mark.parametrize("name", ["single.json", "multiple.json", "manual-empty.json"])
def test_entity_set_contract_parity_valid(name: str) -> None:
    payload = load(f"fixtures/runtime/contract-parity/valid/{name}")
    schema = load("contracts/runtime/entity-set-reference-v1.schema.json")
    Draft202012Validator(schema).validate(payload)
    TypeAdapter(EntitySetReferenceV1).validate_python(payload)


@pytest.mark.parametrize(
    "name",
    [
        "single-two-slots.json",
        "multiple-one-slot.json",
        "maximum-exceeds-slots.json",
        "invalid-binding-source.json",
    ],
)
def test_entity_set_contract_parity_invalid(name: str) -> None:
    payload = load(f"fixtures/runtime/contract-parity/invalid/{name}")
    schema = load("contracts/runtime/entity-set-reference-v1.schema.json")
    assert list(Draft202012Validator(schema).iter_errors(payload)) or _pydantic_rejects(payload)


def _pydantic_rejects(payload: object) -> bool:
    try:
        TypeAdapter(EntitySetReferenceV1).validate_python(payload)
    except ValidationError:
        return True
    return False


def test_reference_and_first_capability_validators() -> None:
    draft = QuerySqlDraftV3.model_validate(
        load("fixtures/runtime/first-runtime-capability/valid/branch-multiple-ten-slots.json")
    )
    assert validate_query_sql_draft_invariants(draft) == ()
    assert validate_first_runtime_capability(draft) == ()


def test_reference_validator_reports_relational_violations() -> None:
    payload = load("fixtures/runtime/first-runtime-capability/valid/branch-multiple-ten-slots.json")
    assert isinstance(payload, dict)
    payload["entity_sets"][0]["member_refs"] = ["missing_ref"]
    payload["entity_sets"][0]["parameter_slots"][9] = "missing_parameter"
    draft = QuerySqlDraftV3.model_validate(payload)
    codes = {item.code for item in validate_query_sql_draft_invariants(draft)}
    assert {"MEMBER_REF_NOT_FOUND", "PARAMETER_SLOT_NOT_FOUND"} <= codes


@pytest.mark.parametrize(
    "name,code",
    [("customer.json", "ENTITY_TYPE_UNSUPPORTED"), ("two-sets.json", "MAX_ENTITY_SETS_EXCEEDED")],
)
def test_first_capability_rejects_out_of_scope(name: str, code: str) -> None:
    draft = QuerySqlDraftV3.model_validate(
        load(f"fixtures/runtime/first-runtime-capability/invalid/{name}")
    )
    assert code in {item.code for item in validate_first_runtime_capability(draft)}


@pytest.mark.parametrize(
    "name,valid",
    [
        ("entity-selection-value.json", True),
        ("entity-multi-selection-value.json", True),
        ("entity-selection-with-ids.json", False),
        ("entity-multi-selection-duplicate.json", False),
    ],
)
def test_request_v2_entity_selection_variants(name: str, valid: bool) -> None:
    folder = "valid" if valid else "invalid"
    value = load(f"fixtures/runtime/contract-parity/{folder}/{name}")
    schema = load("contracts/runtime/chat-turn-request-v2.schema.json")
    value_schema = {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$ref": "#/$defs/clarificationResponse/properties/value",
        "$defs": schema["$defs"],  # type: ignore[index]
    }
    errors = list(Draft202012Validator(value_schema).iter_errors(value))
    assert bool(errors) is not valid


@pytest.mark.parametrize("contract", ["chat-turn-request-v2", "chat-turn-response-v2"])
def test_complete_chat_fixtures_match_canonical_schema(contract: str) -> None:
    schema = load(f"contracts/runtime/{contract}.schema.json")
    validator = Draft202012Validator(schema, format_checker=FormatChecker())
    for path in sorted((ROOT / "fixtures" / "runtime" / contract / "valid").glob("*.json")):
        validator.validate(json.loads(path.read_text(encoding="utf-8")))
    for path in sorted((ROOT / "fixtures" / "runtime" / contract / "invalid").glob("*.json")):
        assert list(validator.iter_errors(json.loads(path.read_text(encoding="utf-8")))), path.name


def test_invalid_fixture_expectations_cover_all_complete_chat_failures() -> None:
    expectations = load("fixtures/runtime/invalid-expectations.json")
    assert isinstance(expectations, dict)
    actual = {
        path.relative_to(ROOT / "fixtures" / "runtime").as_posix()
        for contract in ("chat-turn-request-v2", "chat-turn-response-v2")
        for path in (ROOT / "fixtures" / "runtime" / contract / "invalid").glob("*.json")
    }
    assert set(expectations) == actual
    assert set(expectations.values()) == {"SCHEMA_REJECTED"}
