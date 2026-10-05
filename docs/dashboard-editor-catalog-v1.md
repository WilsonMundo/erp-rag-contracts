# Dashboard editor catalog V1 (PR-75C2A)

`GET /api/assistant/dashboards/{dashboardId}/editor/catalog` is a read-only ApiHub
projection, scoped to the authenticated tenant and dashboard creator. Its schemas
are `dashboard-editor-catalog-v1`, `dashboard-editor-catalog-item-v1`,
`dashboard-editor-catalog-block-v1` and `dashboard-editor-binding-option-v1`.
They are registered by SHA-256 in the manifest and distributed to Python and
TypeScript; ApiHub's DTOs must preserve exactly these fields.

The root contains only `items`. An item has `source_kind` (`query` or `analytics`),
`artifact_id`, `display_title` and `blocks`. A block has exact `block_id`, durable
`kind`, `display_title`, optional nullable `visual_type`, and `binding_options`.
IDs are internal selection identities, never editable labels. No executions,
SQL, chart DSL, rows or editable presentation definitions are included.

Query items use the active creator-owned QueryArtifact's `presentation_plan`:
its title, block title/kind, chart family or gauge type are projected unchanged.
An absent block title can only fall back to the durable presentation plan title.
Analytics uses the active creator-owned **generic** AnalyticsArtifact's
`presentation_definition`; its block has no separate title, so `display_title`
is the durable artifact title. Chart type comes from `block.chart.type`.
Legacy artifacts without valid selectable blocks/required renderer bindings are
ineligible. Nothing is executed to discover or preview sources.

ApiHub rechecks Query static authorization, AST fingerprint, capabilities,
requery availability and presentation profile with the existing authorities.
Analytics items require all durable query inputs to pass these checks and
ownership restrictions. Lifecycle is not an ACL; visibility does not grant PUT
permission or change execution authorization.

## Binding authority

V1 is deliberately conservative: candidate associations come only from durable
widget bindings already declared **in this dashboard for the same artifact**.
They are available across that artifact's selectable blocks, since the parameter
belongs to the artifact. No associations are synthesized by parameter name,
SQL type, label or matching entity names. An unbound artifact has an empty options
list; empty means no explicitly declared compatible option, not no parameters.
Creating a new semantic association requires an explicit contractual authority
in a later change; the frontend must not fill this gap with heuristics.

Each option contains `dashboard_filter_id`, `filter_label`, `source_path`, exact
`target_parameter` and nullable `entity_binding`. ApiHub revalidates scalar/range
source paths, scope/impact, rebindable query targets, Analytics declared type,
scope/impact/entity_type and downstream parameter mappings. Existing dependency
rules reject query-versus-analysis impact conflicts and invalid propagation.
Date range boundaries use only the query parameter's declared `semantic_role`.
Ambiguous declarations with multiple authorities for the same target are omitted.

Entity mappings require canonical filter `entity_type`, `source_path=value` and
an existing explicit `entity_id` or `binding_value`. The option copies that value
unchanged. The catalog does not resolve an identity or predict whether a particular
runtime identity will have a binding value. Canonical AppWeb selection remains
`{entity_type, entity_id}`; runtime authority and value encoding remain unchanged.

The options describe allowed destinations, not a new widget persistence model.
The later editor groups them into existing `filter_bindings/mappings`, preserving
1:N destinations and applying current uniqueness rules. Save still uses the full
definition PUT with `expected_updated_at`. There is no widget display-title field.

The one focused backend Fact validates actual DTO output, exact Query/Analytics
block IDs, metadata, bindings, incompatibility omission, denied sources, dashboard
authorization, canonical fixtures, JSON Schema, Python regeneration/model parity,
TypeScript exports, packaged resources and manifest hashes. Live PostgreSQL,
session/authorization and visual E2E remain manual; AppWeb is not changed here.
