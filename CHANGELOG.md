# Changelog

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
