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

PR-75C2A1 defines `binding_options` as authorized compatible **choices**, not
as a projection of persisted mappings. The endpoint never creates a mapping.
The same options apply to every selectable block of the artifact because targets
belong to the artifact. No SQL text, SQL type, parameter-name matching, labels,
block titles or Angular inference may establish compatibility.

Existing unambiguous same-artifact destination declarations take precedence:
revalidate them and preserve the exact source path and `entity_binding`. Any
already declared target is reserved, even if incompatible or ambiguous, so
discovery cannot silently replace its authority with another option.

For unoccupied targets, ApiHub applies this fail-closed policy using only durable
parameter definitions, dashboard filters and Analytics input mappings:

| Target | Required evidence for a new option |
| --- | --- |
| Query | Filter `type=value_type=date_range`, `scope=data`, `impact=query`; target is `rebindable` and has exact `semantic_role=period_start` or `period_end_exclusive`, selecting `start` or `end_exclusive` respectively. |
| Analytics scalar | Filter `type=scalar`, non-entity `value_type` (`string`, `integer`, `decimal`, `boolean`); exact parameter `type`, `scope`, `impact` and `entity_type` match; `source_path=value`. |
| Analytics range | Filter `type=value_type=date_range`; exact parameter `type`, `scope`, `impact`, `entity_type` match; source paths come exclusively from canonical boundary roles of its durably mapped Query inputs. |

All choices additionally pass the existing dependency authority. Query impact
must reach a Query input; analysis impact must not reach one. Every downstream
Query destination must exist and be rebindable; all range destinations must carry
canonical boundary roles. Source and scope/impact rules are unchanged. Range
options on Analytics remain alternatives for one target: the editor must preserve
target uniqueness, never persist both alternatives simultaneously. Runtime range
propagation continues to use the complete range and each input's boundary role.

Query definitions do not declare semantic scalar type/scope/impact. A matching
SQL type or convincing parameter name therefore cannot authorize new scalar or
entity candidates. Analytics `entity_type` alone also does not authorize choosing
`entity_id` versus `binding_value`; without an existing explicit destination
encoding, entity candidates are absent. Analysis-only range parameters lacking
contractual source-path evidence are likewise absent. Empty options mean that
compatibility cannot be proved, not that the artifact has no parameters.

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

The one focused backend Fact validates existing exact mappings and new unbound
Query/Analytics candidates, misleading names, rebindability, incompatible scope,
impact/type and entity encoding omission, as well as actual DTO output, exact
block IDs, metadata, denied sources, dashboard
authorization, canonical fixtures, JSON Schema, Python regeneration/model parity,
TypeScript exports, packaged resources and manifest hashes. Live PostgreSQL,
session/authorization and visual E2E remain manual; AppWeb is not changed here.
