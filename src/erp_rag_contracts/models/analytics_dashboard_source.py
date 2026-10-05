"""Public, authorized Generic Analytics source; never an execution or legacy artifact."""

from typing import Annotated, Literal

from pydantic import Field, model_validator

from .runtime import RuntimeContractModel
from .runtime_v2 import ContractId, NonEmptyText


class AnalyticsDashboardSourceBlockV1(RuntimeContractModel):
    block_id: ContractId
    kind: Literal["kpi", "chart", "table"]
    display_title: NonEmptyText
    visual_type: Annotated[str, Field(min_length=1, max_length=128)] | None = None


class AnalyticsDashboardSourceV1(RuntimeContractModel):
    source_kind: Literal["analytics"]
    analytics_artifact_id: ContractId
    display_title: NonEmptyText
    blocks: Annotated[list[AnalyticsDashboardSourceBlockV1], Field(min_length=1)]

    @model_validator(mode="after")
    def unique_blocks(self) -> "AnalyticsDashboardSourceV1":
        if len({block.block_id for block in self.blocks}) != len(self.blocks):
            raise ValueError("block_id must be unique within the durable artifact")
        return self
