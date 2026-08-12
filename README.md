# erp-rag-contracts

Paquete independiente y versionado que define los contratos oficiales para entregar conocimiento de módulos ERP a un sistema RAG. La versión inicial es `1.0.0` y JSON Schema Draft 2020-12 es la fuente normativa; los modelos Pydantic v2 son la implementación de referencia.

## Frontera

Este repositorio solo define, documenta, versiona y prueba contratos. No valida catálogos productivos, normaliza entregas reales, genera `semantic_text`, calcula embeddings, genera o ejecuta SQL, ni conecta con ERP, OpenAI o Milvus. Tampoco contiene LangGraph. El flujo futuro es:

```text
módulo conforme al contrato
→ proyecto principal valida
→ proyecto principal normaliza
→ proyecto principal genera embeddings
→ proyecto principal ingiere en Milvus
```

## Estructura de un módulo

Cada entrega tiene un sobre `ModuleCatalogPackageSourceV1`, un manifiesto que solo actúa como índice y documentos individuales autoritativos. El manifiesto referencia identidad, versión, tipo, módulo, ruta relativa y hash; nunca mantiene una segunda copia editable. Puede referenciar consultas, esquemas, familias, registro SQL, pruebas doradas y dependencias entre módulos.

Para crear un módulo nuevo:

1. Copie las plantillas a un directorio propio y reemplace todos los valores `example.*`, `ExampleTable` y textos de demostración.
2. Asigne un `document_id` estable, minúsculo y jerárquico, por ejemplo `sales.query.revenue-by-customer`.
3. Inicie `document_version` en 1. Increméntelo si cambia SQL, significado, tablas, joins, métricas, dimensiones o reglas decisivas.
4. Incremente `catalog_version` para identificar una entrega completa, conforme a la política SemVer.
5. Registre el archivo autoritativo en el manifiesto usando una ruta relativa segura y su hash.

Los nombres SQL sin esquema usan `dbo`. `lookup_key` es insensible a mayúsculas y se almacena en minúsculas, mientras `original_name` conserva la escritura original. En v1 solo `table` puede ser físicamente resoluble; alias, CTE, temporales y derivadas no son tablas físicas, y vistas, sinónimos y funciones quedan para contratos futuros.

## Dialectos y etapas contractuales

La línea base 1.0.0 distingue `reviewer-source-v1`, `reviewer-effective-v1`,
`normalized-v1`, `source-manifest-v1`, `release-manifest-v1`, los dos manifiestos
funcionales, `module-package-v1`, `embedding-artifact-v1` y
`milvus-ingestion-record-v1`. `schema_version: "1.0"`, una versión calendario
como `catalog_version: "2026.08"` y la versión SemVer del paquete son conceptos
independientes.

- `contracts/source`: documentos editables autoritativos y sus índices.
- `contracts/normalized`: exige sobre resuelto, `semantic_text`, hash y elegibilidad, conservando el documento fuente intacto en `payload`.
- `contracts/pipeline/embedding-artifact-v1`: resultado futuro de embeddings.
- `contracts/pipeline/milvus-ingestion-record-v1`: representación futura de escritura, con referencia al payload y `document_id` como identidad lógica activa.

La regla de herencia es: valor del documento cuando existe; de lo contrario, valor del sobre. Una diferencia explícita produce `ENVELOPE_FIELD_CONFLICT`; jamás se corrige silenciosamente.

`semantic_text` usa la plantilla `query-example-es-v1`. Solo admite los campos enumerados en `policies/normalization-policy-v1.json`; una regla crítica entra únicamente mediante `retrieval.semantic_disambiguators`. SQL completo, hashes, timestamps, metadata técnica, payloads y vectores están prohibidos. Esquemas y familias que ya aporten texto serán validados por el consumidor, no regenerados silenciosamente.

El hash canónico aplica NFC, saltos LF, eliminación de espacios finales por línea, `strip`, UTF-8 y SHA-256. Se almacena como `sha256:<hex minúsculo>`. No cambia mayúsculas, espacios internos, orden de listas ni ausencia frente a vacío.

## Versiones y compatibilidad

`contract_version` versiona este paquete; `schema_version`, el formato contractual; `document_version`, una revisión lógica; `catalog_version`, una entrega; `text_template_version`, la plantilla semántica; e `ingestion_schema_version`, el formato futuro de Milvus. PATCH aclara sin cambiar validez, MINOR añade campos opcionales compatibles y MAJOR rompe compatibilidad o exige campos nuevos. Una revisión anterior nunca reemplaza una posterior (`DOCUMENT_VERSION_REGRESSION`).

Para migrar, lea `CHANGELOG.md`, compare `contract-manifest.json`, seleccione contratos compatibles y valide primero en un entorno no productivo. El manifiesto lista hashes SHA-256 verificables de cada contrato.

## Consumo Python

```python
from erp_rag_contracts.models.contracts import QueryExampleDocumentSourceV1

document = QueryExampleDocumentSourceV1.model_validate(data)
```

Instalación y verificación local:

```console
python -m pip install -e ".[dev]"
ruff format --check .
ruff check .
mypy src
pytest
python -m build
```

Compatibilidad externa de solo lectura:

```console
python -m erp_rag_contracts.cli compatibility-check --release <release> --reviewer <Revisor-RAG> --report <resultado.json>
```

Scaffold seguro (no escribe sin `--apply`):

```console
python -m erp_rag_contracts.cli scaffold-module --module ventas --catalog-version 2026.09 --language es --output <directorio> --dry-run
```

Las plantillas son sintácticamente válidas y no contienen datos productivos. Los fixtures de `examples/valid` muestran consultas, tablas, familias, herencia, evolución y resolución `dbo.ExampleTable`; `examples/invalid` documenta fallos esperados.

## Diferencias inevitables

Draft 2020-12 no puede expresar que `len(vector) == embedding_dimensions` sin fijar una dimensión concreta. Los esquemas exigen números y dimensiones positivas; Pydantic añade la igualdad dinámica y finitud. Asimismo, los fixtures de conflicto de sobre, duplicidad y ambigüedad representan validaciones entre documentos, fuera del alcance de un único JSON Schema.

python .codex\skills\audit-rag-compatibility\scripts\compatibility_check.py --release "D:\ProyectosW\ProyectoZ\Revisor-Rag\validated-releases\2026-09-08-v1"
