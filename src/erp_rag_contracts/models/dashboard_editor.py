"""Read-only dashboard editor catalog; backend owns visibility and compatibility."""

from __future__ import annotations

from typing import Annotated, Literal

from pydantic import Field, model_validator

from .runtime import Identifier, RuntimeContractModel
from .runtime_v2 import ContractId, DashboardFilterMappingV1, NonEmptyText


class DashboardEditorBindingOptionV1(RuntimeContractModel):
    dashboard_filter_id: ContractId
    filter_label: NonEmptyText
    source_path: Literal["value", "start", "end_exclusive"]
    target_parameter: Identifier
    entity_binding: Literal["entity_id", "binding_value"] | None = None

    # Same per-destination source constraint as the durable mapping contract.
    model_config = DashboardFilterMappingV1.model_config

    @model_validator(mode="after")
    def validate_entity_source(self) -> DashboardEditorBindingOptionV1:
        if self.entity_binding is not None and self.source_path != "value":
            raise ValueError("entity binding requires source_path=value")
        return self


class DashboardEditorCatalogBlockV1(RuntimeContractModel):
    block_id: ContractId
    kind: Literal["kpi", "comparison_kpi", "data_grid", "pivot_grid", "chart", "gauge", "table"]
    display_title: NonEmptyText
    visual_type: Annotated[str, Field(min_length=1, max_length=128)] | None = None
    binding_options: list[DashboardEditorBindingOptionV1]


class DashboardEditorCatalogItemV1(RuntimeContractModel):
    source_kind: Literal["query", "analytics"]
    artifact_id: ContractId
    display_title: NonEmptyText
    blocks: Annotated[list[DashboardEditorCatalogBlockV1], Field(min_length=1)]


class DashboardEditorCatalogV1(RuntimeContractModel):
    items: list[DashboardEditorCatalogItemV1]
