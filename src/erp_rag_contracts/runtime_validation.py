from __future__ import annotations

from dataclasses import dataclass

from erp_rag_contracts.models.runtime import QuerySqlDraftV5


@dataclass(frozen=True)
class RuntimeContractViolation:
    code: str
    path: str


def validate_query_sql_draft_invariants(
    draft: QuerySqlDraftV5,
) -> tuple[RuntimeContractViolation, ...]:
    violations: list[RuntimeContractViolation] = []
    parameter_names = {item.name for item in draft.parameters}
    if len(parameter_names) != len(draft.parameters):
        violations.append(RuntimeContractViolation("PARAMETER_DUPLICATED", "parameters"))
    return tuple(violations)
