from __future__ import annotations

from dataclasses import dataclass

from erp_rag_contracts.models.runtime import QuerySqlDraftV3


@dataclass(frozen=True)
class RuntimeContractViolation:
    code: str
    path: str


def validate_query_sql_draft_invariants(
    draft: QuerySqlDraftV3,
) -> tuple[RuntimeContractViolation, ...]:
    violations: list[RuntimeContractViolation] = []
    references = {item.ref: item for item in draft.entity_references}
    parameter_names = {item.name for item in draft.parameters}
    reference_parameters: set[str] = set()
    claimed_slots: set[str] = set()

    if len(references) != len(draft.entity_references):
        violations.append(RuntimeContractViolation("ENTITY_REF_DUPLICATED", "entity_references"))
    if len(parameter_names) != len(draft.parameters):
        violations.append(RuntimeContractViolation("PARAMETER_DUPLICATED", "parameters"))
    if len({item.set_ref for item in draft.entity_sets}) != len(draft.entity_sets):
        violations.append(RuntimeContractViolation("ENTITY_SET_REF_DUPLICATED", "entity_sets"))

    for index, reference in enumerate(draft.entity_references):
        if reference.parameter not in parameter_names:
            violations.append(
                RuntimeContractViolation(
                    "PARAMETER_NOT_FOUND", f"entity_references.{index}.parameter"
                )
            )
        if reference.parameter in reference_parameters:
            violations.append(
                RuntimeContractViolation(
                    "REFERENCE_PARAMETER_REUSED", f"entity_references.{index}.parameter"
                )
            )
        reference_parameters.add(reference.parameter)
        for dependency_index, dependency in enumerate(reference.dependencies or []):
            if dependency not in references:
                violations.append(
                    RuntimeContractViolation(
                        "DEPENDENCY_REF_NOT_FOUND",
                        f"entity_references.{index}.dependencies.{dependency_index}",
                    )
                )

    for set_index, entity_set in enumerate(draft.entity_sets):
        for slot_index, slot in enumerate(entity_set.parameter_slots):
            path = f"entity_sets.{set_index}.parameter_slots.{slot_index}"
            if slot not in parameter_names:
                violations.append(RuntimeContractViolation("PARAMETER_SLOT_NOT_FOUND", path))
            if slot in claimed_slots:
                violations.append(RuntimeContractViolation("PARAMETER_SLOT_SHARED", path))
            claimed_slots.add(slot)
        for member_index, member_ref in enumerate(entity_set.member_refs):
            path = f"entity_sets.{set_index}.member_refs.{member_index}"
            member = references.get(member_ref)
            if member is None:
                violations.append(RuntimeContractViolation("MEMBER_REF_NOT_FOUND", path))
                continue
            if member.entity_type != entity_set.entity_type:
                violations.append(RuntimeContractViolation("ENTITY_TYPE_MISMATCH", path))
            if member.parameter not in entity_set.parameter_slots:
                violations.append(RuntimeContractViolation("MEMBER_PARAMETER_NOT_IN_SET", path))
    return tuple(violations)


def validate_first_runtime_capability(
    draft: QuerySqlDraftV3,
) -> tuple[RuntimeContractViolation, ...]:
    violations = list(validate_query_sql_draft_invariants(draft))
    if len(draft.entity_sets) > 1:
        violations.append(RuntimeContractViolation("MAX_ENTITY_SETS_EXCEEDED", "entity_sets"))
    for index, entity_set in enumerate(draft.entity_sets):
        prefix = f"entity_sets.{index}"
        if entity_set.entity_type != "branch":
            violations.append(
                RuntimeContractViolation("ENTITY_TYPE_UNSUPPORTED", f"{prefix}.entity_type")
            )
        if entity_set.selection_mode != "multiple" or len(entity_set.parameter_slots) != 10:
            violations.append(
                RuntimeContractViolation(
                    "BRANCH_SLOT_POLICY_VIOLATION", f"{prefix}.parameter_slots"
                )
            )
        if entity_set.binding_source != "entity_id":
            violations.append(
                RuntimeContractViolation("BINDING_SOURCE_UNSUPPORTED", f"{prefix}.binding_source")
            )
    return tuple(violations)
