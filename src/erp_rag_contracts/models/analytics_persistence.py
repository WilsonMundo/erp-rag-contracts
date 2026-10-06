"""Identity returned by ApiHub after committing Generic Analytics persistence."""

from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, StrictStr, model_validator


class GenericAnalyticsPersistenceReceiptV1(BaseModel):
    model_config = ConfigDict(
        extra="forbid",
        frozen=True,
        json_schema_extra={
            "allOf": [
                {
                    "if": {"properties": {"status": {"const": "succeeded"}}},
                    "then": {"properties": {"analytics_result_id": {"type": "string"}}},
                    "else": {"properties": {"analytics_result_id": {"type": "null"}}},
                }
            ]
        },
    )

    version: Literal["1.0"]
    analytics_artifact_id: StrictStr = Field(min_length=1, max_length=160)
    analytics_execution_id: StrictStr = Field(min_length=1, max_length=160)
    status: Literal["succeeded", "failed"]
    analytics_result_id: StrictStr | None = Field(
        pattern=r"^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
    )

    @model_validator(mode="after")
    def validate_result_identity(self) -> "GenericAnalyticsPersistenceReceiptV1":
        if self.status == "failed":
            if self.analytics_result_id is not None:
                raise ValueError("Failed analytics has no result identity")
        elif (
            self.analytics_result_id is None
            or UUID(self.analytics_result_id).int == 0
            or self.analytics_result_id.lower() == self.analytics_execution_id.lower()
        ):
            raise ValueError("Succeeded analytics requires its distinct durable result identity")
        return self
