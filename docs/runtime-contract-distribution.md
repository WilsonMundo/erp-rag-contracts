# Distribución de contratos runtime

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
