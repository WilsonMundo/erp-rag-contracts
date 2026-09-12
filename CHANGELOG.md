# Changelog

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
