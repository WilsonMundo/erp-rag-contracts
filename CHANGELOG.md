# Changelog

## 2.10.0

- PR-75C2A: publica el read-model de catálogo del editor de dashboards con
  artifacts, bloques durables, metadata humana y opciones de binding explícitas.
- No incluye ejecuciones, SQL, presentation definitions editables ni persistencia
  de título de widget. ApiHub decide visibilidad y compatibilidad.

## 2.9.0

- Declara selección canónica de dashboard `{entity_type, entity_id}` y
  `entity_binding` opcional histórico por mapping destino; la escritura nueva y
  el refresh entity exigen metadata explícita, sin inferencias.
- Permite destinos entity 1:N desde una misma selección, conservando unicidad de
  parámetros destino y compatibilidad de filtros no-entity.

## 2.8.0

- Permite publicar múltiples `ResultScopeV1` de una misma ejecución mediante
  `available_result_scopes`, manteniendo `active_result_scope` como scope primario compatible.
- Declara opcionalmente `primary_result_scope_entity` en la semántica propuesta para seleccionar
  de forma determinista el scope principal sin transportar IDs materiales.

## 2.7.0

- Distingue rankings `top_n` globales y por grupo mediante `scope` y
  `partition_fields`, conservando compatibilidad con artefactos globales previos.
- Permite transportar el `result_set_binding` lógico del artefacto anterior en
  `ChatTurnRequestV2`, sin materializar IDs ni detalles físicos del TVP.

## 2.6.0

- Publica `ResultSetBindingV1` como referencia lógica a un conjunto durable previo,
  sin IDs materiales ni detalles físicos de TVP.
- Permite que `QueryArtifactV1` conserve opcionalmente el binding lógico para
  reautorizar y rematerializar el conjunto en cada ejecución.

## 2.5.0

- Publica `ResultScopeV1` con referencia durable a `QueryExecution`, entidad,
  claves semánticas ordenadas, selección `displayed_result` y cantidad de filas.
- Agrega `active_result_scope` opcional al contexto de consulta anterior para
  conservar compatibilidad con estados conversacionales existentes.

## 2.4.0

- Incorpora `comparison_kpi` como bloque propuesto y materializado para presentar
  periodo actual, periodo anterior y cambio en una sola tarjeta comparativa.
- Amplía `ChartBlockV1` y `MaterializedChartBlockV1` con invariantes condicionales
  para `family=circular`, limitado a una serie `pie` o `doughnut` sin eje,
  orientación ni agregación adicional.
- Conserva sin cambios el comportamiento contractual de los charts cartesianos.

## 2.3.0

- Publica `HistoricalQueryArtifactViewV1` y `HistoricalRequeryParameterV1` como
  proyecciones públicas redacted para historial y requery.
- `AssistantHistoricalResultV2.query_artifact` deja de exponer el
  `QueryArtifactV1` durable, incluido su SQL y metadata interna.
- Conserva `QueryArtifactV1` completo para uso interno y no modifica
  `AssistantHistoricalRequeryResultV2`, `QuerySqlDraftV6` ni `PresentationPlanV2`.

## 2.2.0

- Completa aditivamente `PresentationCapabilityProfileV1` con metadata del renderer y
  capabilities semánticas tipadas para DataGrid, PivotGrid, Chart y Gauge.
- Permite que los blocks soliciten features de grid/pivot, tipo de gauge y las opciones
  semánticas de eje y orientación que faltaban para charts.
- Conserva válidos los payloads V2/V6 existentes y mantiene intactos V1/V5.

## 2.1.0

- Publica la familia contractual completa de PR-01 para query/presentation V2/V6,
  referencias empresariales, Query Artifacts, dashboards, importaciones y stream/history.
- Genera y verifica representaciones Python, TypeScript y C# sin migrar consumidores V1/V5.

## Sin publicar - funciones escalares

- Agrega FunctionSchemaDocumentSourceV1 y NormalizedFunctionSchemaV1.
- Integra function_schema en manifiestos, paquetes y auditoria contractual.
- Firma ordenada, retorno, reglas, ejemplos y notas opcionales de rendimiento.
- Los consumidores deben actualizar sus discriminadores antes de recibir funciones.


## Sin publicar ? soporte de vistas

- A?ade `ViewSchemaDocumentSourceV1` y `NormalizedViewSchemaV1`, sus schemas y pruebas de paridad.
- Integra `view_schema` en manifiestos, paquetes y auditor?a de compatibilidad.
- `source_files` es informativo; las reglas permiten omitir `sql_expression`.
- Los consumidores deben reconocer el nuevo discriminador antes de recibir vistas.

## 2.0.0

- `EmbeddingArtifactV1` exige `schema_version` y `embedding_provider`.
- Se incorpora `EmbeddingReleaseManifestV1` para trazabilidad de releases de embeddings.

## 1.0.0 - línea base previa a publicación

- Modela ReviewerSourceV1 y ReviewerEffectiveV1 con objetos anidados estrictos.
- Añade NormalizedV1 sin pérdida, procedencia, divergencias y elegibilidad por capacidad.
- Separa hashes semánticos, de fuente y de release.
- Separa manifiestos fuente, release, funcionales y de módulo.
- Añade `compatibility-check` y `scaffold-module` de solo lectura/dry-run por defecto.

## 1.0.0 - Contratos iniciales

- Publicación inicial de contratos fuente, normalizados y del pipeline futuro.
- Políticas oficiales de identidad, versiones, herencia, hash, texto semántico y elegibilidad.
- Modelos Pydantic v2, plantillas y pruebas de conformidad sin servicios externos.
