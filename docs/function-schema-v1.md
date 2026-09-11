# FunctionSchemaDocumentSourceV1

El contrato fuente de funciones escalares usa `document_type: "function_schema"`
y `function.kind: "scalar"`. Consulte `examples/valid/function-schema.json`.

Reutiliza `KnowledgeMetadataV1`, `KnowledgeRetrievalV1`, dependencias y reglas
comunes. `performance_notes` y `sql_expression` de reglas son opcionales.
`metadata.source_files` es informativo. Las dependencias utilizan
`object_kind: "function"`, sin adaptar implicitamente `scalar_function`.

Firma: nombres sin @, unicos ignorando mayusculas, posiciones consecutivas desde 1,
tipos SQL no vacios y estados de verificacion explicitos. El retorno exige tipo SQL
y nulabilidad booleana. Pydantic verifica unicidad y secuencia entre parametros;
JSON Schema valida los campos individuales. Esta diferencia se prueba explicitamente.

La normalizacion conserva la fuente y calcula el hash semantico y capacidades;
el consumidor comprueba dependencias entre documentos y aplica sus resultados a
la elegibilidad SQL. No se analizan ni ejecutan llamadas SQL por este contrato.

Ampliacion en desarrollo del conjunto discriminado SourceV1 y NormalizedV1,
incluida en manifiestos y paquetes. Requiere actualizar consumidores antes de
publicar funciones; no cambia el dialecto documental 1.0 ni publica el paquete.
