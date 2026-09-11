# Contrato de vistas SourceV1

`ViewSchemaDocumentSourceV1` y `NormalizedViewSchemaV1` incorporan `view_schema`
a los documentos fuente, efectivos, manifiestos, paquetes y registros normalizados.
El modelo normativo está en `src/erp_rag_contracts/models/contracts.py`; los schemas
se generan con `python tools/generate_artifacts.py` y sus SHA-256 quedan registrados
en `contract-manifest.json`.

Referencia: `examples/valid/view-schema.json`.

- Columnas de vista: tipo SQL no vacío, nulabilidad booleana estricta, descripción,
  términos de negocio y estado de verificación; no requieren claves físicas.
- `logical_key`: combinación lógica de columnas; la unicidad real requiere revisión externa.
- `dependencies`: objetos identificados por esquema, nombre y tipo.
- Relaciones y reglas reutilizan modelos comunes; `sql_expression` y `notes` son opcionales.
- `metadata.source_files`: procedencia informativa, sin exigir DDL adjunto.
- Hash semántico: helper normativo `semantic_content_hash`, nunca un marcador manual.
- El consumidor valida referencias entre documentos, dependencias y columnas;
  la aprobación declarada no reemplaza esas comprobaciones.

Compatibilidad: ampliación del conjunto discriminado de tipos RAG. Los consumidores
que enumeran tipos deben actualizarse antes de recibir vistas. El dialecto documental
sigue siendo `schema_version: "1.0"`; no habilita documentos arbitrarios `2.0`.
Cambio en desarrollo, pendiente de publicación/versionado del paquete; no se añaden
adaptadores ni conversión implícita de tablas a vistas.
