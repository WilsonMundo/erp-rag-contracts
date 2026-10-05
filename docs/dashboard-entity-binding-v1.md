# Dashboard entity binding (PR-75B2B)

The canonical selection sent in `applied_filters[filter_id]` is exactly
`{"entity_type":"customer","entity_id":"123"}`. The new
`dashboard-entity-selection-v1.schema.json` publishes this identity-only shape.
No SQL value, IDT, label, or frontend-supplied binding metadata is accepted there.
The selected type must equal the global filter's explicit `entity_type`.

`dashboard-filter-mapping-v1.entity_binding` belongs to each destination mapping:
`entity_id` or `binding_value`. It never belongs to the global filter. For example:

```json
[
  {"dashboard_filter_mapping_version":"1.0","source_path":"value","target_parameter":"a","entity_binding":"entity_id"},
  {"dashboard_filter_mapping_version":"1.0","source_path":"value","target_parameter":"b","entity_binding":"binding_value"}
]
```

Both mappings may share the same filter/binding/widget. The target remains unique.
Field selection never uses the parameter name, SQL type, filter identity or label.
After choosing the field, ApiHub encodes it using the destination's declared type
and validates range/length and the authority's source type. An incompatible type
fails; it never switches to the other field. For customer 123, A may receive JSON
integer `123` while B receives the authority's textual `IDT` (e.g. `NIT-999`).

## Audit and authority

Persisted mappings previously contained only `source_path` and `target_parameter`.
QueryArtifact parameters persist SQL type, semantic role, constraints and original
value; they do not persist an authoritative choice between the two entity fields.
Original values, names or SQL types cannot supply that missing declaration.
Existing Entity Resolution returns separate identity and binding-value provenance.

ApiHub reuses its existing resolver registry and extends the existing customer and
supplier resolvers with exact identity reads from `IGetClienteQuery.GetCliente` and
`IGetProveedorQuery.GetByIdAsync`. Both existing ERP query authorities return the
physical ID and IDT. The same candidate projection serves mention and identity
paths; chat's mention-search API is unchanged. Branch identity uses the existing
authenticated user's allowed-branch query. Each (type, identity) is read once per
refresh. No public lookup endpoint, new entity resolver or fuzzy fallback is added.

Resolvers without identity support, missing rows, missing requested binding values
and mismatched identity results fail closed. Product, seller and document have no
registered resolver today; classification_level has no exact-identity operation.
Branch exposes entity_id, with no binding_value. These cases are not synthesized.

Applied filters and revision baselines retain the canonical selection. Materialized
values live only in effective Query/Analytics parameters. An Analytics mapping
chooses one representation explicitly, then that same representation reaches its
input Query parameters with their own declared encoding. Existing artifacts and
non-entity/date-range semantics remain unchanged.

## Persistence, compatibility and validation

Manual scripts 019/020 follow 017/018: add nullable mapping `entity_binding`, allow
multiple explicit entity destinations from `source_path=value`, and retain target
uniqueness. No backfill, migration execution or startup DDL occurs.

Read schemas and models keep historical mappings with absent/null entity_binding
readable. Python's `DashboardDefinitionV1.require_entity_bindings()` and ApiHub's
write validator require explicit metadata for new entity writes. Entity refresh
rejects missing metadata and historical scalar string/number selections. A durable
entity default must likewise be an identity object before it can refresh. Non-entity
filters reject entity_binding and retain their existing source uniqueness.

AppWeb and rag-api are unchanged. Their generated shared contracts are updated in
this package; frontend options, editors and refresh UX belong to a later PR.
The source DashboardWidget model also retains the already published Query XOR
Analytics contract: the prior generator's stale Query-only source model could
otherwise remove existing Analytics support when regenerating packaged schemas.

One ApiHub Fact covers the same customer mapped to integer identity and textual
binding value, misleading destination names, type incompatibility, historical
reads, fail-closed cases, production mapping write/read projection, schema/DTO
parity and manifest hashes. No full suite or live ERP/PostgreSQL validation runs.
