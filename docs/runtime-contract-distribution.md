# Distribución de contratos runtime

## Dashboard entity filters (PR-75B2A)

`dashboard-filter-v1.schema.json` now includes all published `DashboardFilterV1`
fields: value_type, scope, impact, default_value, min_value, max_value, unit and
entity_type, in addition to the original identity/type/label/required fields.
The same filter definition is embedded in `dashboard-definition-v1`, packaged for
Python and projected to TypeScript. Manifest hashes track the updated artifacts.

`entity_type` reuses the existing Entity Resolution taxonomy. A non-null value is
only valid with `value_type=entity`; other filters permit absence/null only. The read
schema and Python model accept historical entity filters without metadata. New
ApiHub writes require canonical entity metadata; Python exposes
`DashboardFilterV1.require_entity_metadata()` for the same write boundary. Historical
filters without it are not renderable and must never be inferred or backfilled.
The JSON Schema expresses field and combination constraints; min_value <= max_value
is enforced by the model/ApiHub validator because Draft 2020-12 cannot compare two
arbitrary property values. No filter options are embedded.

ApiHub persists this field via manual SQL scripts 017/018 in AssistantPostgres.
No rag-api or AppWeb implementation changes are required by this addition. Reusable
ERP selector candidates and the missing public generic options contract are recorded
in ApiHub's `Application/Assistant/Dashboards/ENTITY_FILTER_CONTRACT.md`.

The single cross-repository validation is ApiHub's Fact
`PR75B2A_entity_metadata_write_read_and_schema_DTO_parity`. No full suite or DDL is run.

`erp-rag-contracts` es la única fuente editable de los JSON Schema y fixtures
runtime. Los consumidores no mantienen copias fuente de estos archivos.

## Python

El wheel y el sdist incluyen los schemas y fixtures generados. Se acceden con
`runtime_schema_path(name, version)` y `runtime_fixture_path(relative_path)`
mediante `importlib.resources`, tanto desde un checkout como desde un paquete
instalado.

## .NET / ApiHub

Durante el desarrollo coordinado, ApiHub debe vincular los archivos canónicos
del repositorio mediante elementos MSBuild `EmbeddedResource` o `Content` con
rutas relativas hacia `erp-rag-contracts/contracts/runtime` y sus pruebas deben
vincular los fixtures canónicos de `erp-rag-contracts/fixtures/runtime`. Esos
elementos son entradas de compilación, no copias editables.

El pipeline debe fallar si el repositorio contractual no está disponible, si
un hash no coincide con `contract-manifest.json` o si la validación Draft
2020-12 no produce el resultado esperado por los fixtures. Si los repositorios
necesitan construirse de forma independiente en el futuro, se publicará un
paquete de contenido versionado (por ejemplo NuGet) generado desde esta misma
fuente; no se introducirán copias manuales.

ApiHub no consume `QuerySqlDraftV3` en esta fase y no debe crear un DTO C# para
él. `EntitySetReferenceV1` solo requiere paridad de JSON Schema hasta que cruce
una frontera runtime real.

## TypeScript / Angular

La proyección reproducible se publica en `generated/typescript/runtime` como el
paquete privado `@proyectoz/erp-rag-runtime-contracts`. Se genera exclusivamente
desde los schemas canónicos con `npm ci` y `npm run generate:typescript`; no es
una fuente editable.

Angular podrá consumirla mediante una dependencia relativa de workspace o
`file:` hacia el paquete generado. El consumidor no debe usar rutas absolutas
ni copiar `index.d.ts` dentro de su árbol fuente. En esta fase no se modifica ni
se activa funcionalidad en Angular.

La proyección de request exporta solamente los valores de aclaración single y
multiple que Angular construye; no exporta el envelope completo. La proyección
de response exporta `ChatTurnResponseV2`, los response specs single/multiple y
sus dependencias transitivas.

Los tipos generados ayudan durante compilación, pero no validan JSON externo.
Una afirmación de paridad de aceptación o rechazo requiere un validador JSON
Schema runtime contra los schemas canónicos y los mismos fixtures publicados.

## Artifact interno y vista histórica pública

`QueryArtifactV1` es el contrato durable/ejecutable interno y conserva SQL,
parámetros, semántica, plan de presentación, fingerprints y metadata de ejecución.
No debe serializarse hacia AppWeb.

`HistoricalQueryArtifactViewV1` es la única proyección del artifact admitida dentro de
`AssistantHistoricalResultV2`. Contiene solo los parámetros rebindables. El `value` de
cada `HistoricalRequeryParameterV1` procede de los parámetros aplicados por la
`QueryExecution` histórica visualizada, mientras `QueryArtifactParameterV1.value`
permanece como valor inicial inmutable del artifact.

El SQL nunca cruza la frontera `ApiHub → AppWeb`.
