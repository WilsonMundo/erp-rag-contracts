# Generic Analytics persistence ACK V1

ApiHub returns the existing `AssistantGenericAnalyticsPersistAckV1` as the
`generic-analytics-persist-ack-v1` runtime schema. Python consumes it as
`GenericAnalyticsPersistenceReceiptV1`. These are the existing consumer names.

The ACK carries `version: "1.0"`, `analytics_artifact_id`,
`analytics_execution_id`, `status`, and `analytics_result_id`.
For `succeeded`, the last field is the exact nonempty UUID committed to
`assistant.analytics_results`, distinct from the execution identity.
For `failed`, it is null. An idempotent replay returns the stored row identity,
not a new UUID or the latest execution. ApiHub returns the ACK after commit.
An absent, invalid or mismatched ACK fails closed in Python.

Both direct and resumed Generic Analytics use the same persistence boundary and
the existing ChatTurnResponseV2 `data_view`: `result_id` carries this durable
result UUID; `execution_id` carries the separate execution identity.
The existing freeform `summary` contains the explicit `analytics_artifact_id`
and artifact `title`. This metadata identifies the Generic Analytics reference;
neither title nor operation is used to discover an identity.

AppWeb projects this reference into its existing History result action and opens
the existing Generic Analytics workspace. The History request uses the response's
`result_id` in `.../turns/{turn_id}/analytics/{analytics_result_id}`.
There is no new result shape, renderer, resume contract or database migration.
GenericAnalyticsResultV1 remains unchanged. Deploy the ACK producer and consumers
together; old ACKs intentionally cannot produce a successful result response.
