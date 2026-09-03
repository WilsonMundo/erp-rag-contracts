# AGENTS.md

## Ownership contractual

Este repositorio es la fuente normativa única de los contratos de conocimiento RAG y de los contratos runtime compartidos por rag-api, ApiHub y Angular.

- `contracts/source`, `contracts/normalized` y `contracts/pipeline` conservan los contratos RAG existentes.
- `contracts/runtime` contiene los envelopes y contratos de coordinación runtime.
- Los consumidores pueden generar modelos idiomáticos, pero no mantener schemas fuente divergentes.
- Todo schema publicado usa JSON Schema Draft 2020-12, se registra con SHA-256 en `contract-manifest.json` y requiere pruebas de paridad.
- Los cambios incompatibles reemplazan la versión activa de forma coordinada en desarrollo; no se agregan adaptadores, dual parsing ni fallbacks sin una decisión contractual explícita.
