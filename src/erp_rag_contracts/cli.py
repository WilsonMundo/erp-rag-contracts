"""Command-line tools for compatibility checking and safe module scaffolding."""

from __future__ import annotations

import argparse
import importlib
import json
import os
import sys
import tempfile
from collections import Counter
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator  # type: ignore[import-untyped]
from pydantic import TypeAdapter, ValidationError

from .hashing import release_file_hash, semantic_content_hash
from .models.contracts import (
    FunctionSchemaDocumentSourceV1,
    NormalizedCatalogRecordV1,
    QueryExampleCatalogV1,
    QueryExampleDocumentEffectiveV1,
    TableFamilyDocumentSourceV1,
    TableSchemaDocumentSourceV1,
    ViewSchemaDocumentSourceV1,
)
from .normalization import normalize_document

MODELS = {
    "function_schema": FunctionSchemaDocumentSourceV1,
    "query_example": QueryExampleDocumentEffectiveV1,
    "table_schema": TableSchemaDocumentSourceV1,
    "view_schema": ViewSchemaDocumentSourceV1,
    "table_family": TableFamilyDocumentSourceV1,
}
REVIEWER_MODELS = {
    "function_schema": "FunctionSchemaDocumentSourceV1",
    "view_schema": "ViewSchemaDocumentSourceV1",
    "query_example": "ValidatedQueryExampleV1",
    "table_schema": "ValidatedTableSchemaV1",
    "table_family": "ValidatedTableFamilyV1",
}


def _json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def _atomic_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fd, temporary = tempfile.mkstemp(dir=path.parent, prefix=path.name, suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as stream:
            json.dump(value, stream, ensure_ascii=False, sort_keys=True, indent=2)
            stream.write("\n")
        os.replace(temporary, path)
    except BaseException:
        Path(temporary).unlink(missing_ok=True)
        raise


def _snapshot(root: Path) -> dict[str, str]:
    return {
        p.relative_to(root).as_posix(): release_file_hash(p.read_bytes())
        for p in sorted(root.rglob("*"))
        if p.is_file()
    }


def _schema_errors(model: Any, value: Any) -> list[str]:
    schema = TypeAdapter(model).json_schema(mode="validation")
    return [
        f"/{'/'.join(map(str, e.absolute_path))}: {e.message}"
        for e in Draft202012Validator(schema).iter_errors(value)
    ]


def _pydantic_errors(model: Any, value: Any) -> list[str]:
    try:
        TypeAdapter(model).validate_python(value)
        return []
    except ValidationError as exc:
        return [f"/{'/'.join(map(str, e['loc']))}: {e['msg']}" for e in exc.errors()]


def _load_reviewer_models(reviewer: Path) -> Any:
    sys.path.insert(0, str(reviewer))
    return importlib.import_module("reviewer.models")


def _discover(release: Path) -> tuple[list[dict[str, Any]], int]:
    rows: list[dict[str, Any]] = []
    source_files = 0
    for path in sorted((release / "query-catalogs").glob("*.json")):
        source_files += 1
        catalog = _json(path)
        QueryExampleCatalogV1.model_validate(catalog)
        envelope = {
            key: catalog[key] for key in ("schema_version", "catalog_version", "module", "language")
        }
        for document in catalog["documents"]:
            effective = dict(document)
            conflicts = []
            for key, value in envelope.items():
                if key in effective and effective[key] != value:
                    conflicts.append(key)
                else:
                    effective[key] = value
            rows.append(
                {
                    "file": path.relative_to(release).as_posix(),
                    "bytes": path.read_bytes(),
                    "raw": document,
                    "effective": effective,
                    "envelope": envelope,
                    "conflicts": conflicts,
                }
            )
    for folder in ("tables", "families", "views", "functions"):
        for path in sorted((release / "sql-knowledge" / folder).glob("*.json")):
            source_files += 1
            document = _json(path)
            rows.append(
                {
                    "file": path.relative_to(release).as_posix(),
                    "bytes": path.read_bytes(),
                    "raw": document,
                    "effective": document,
                    "envelope": None,
                    "conflicts": [],
                }
            )
    return rows, source_files


def compatibility_check(release: Path, reviewer: Path, report: Path) -> int:
    release, reviewer, report = release.resolve(), reviewer.resolve(), report.resolve()
    if (
        not (release / "reports" / "validation-report.json").is_file()
        or not (reviewer / "reviewer" / "models.py").is_file()
    ):
        raise FileNotFoundError("release or reviewer layout is invalid")
    before = _snapshot(release)
    reviewer_models = _load_reviewer_models(reviewer)
    rows, source_files = _discover(release)
    results = []
    normalized = []
    for row in rows:
        value, dtype = row["effective"], row["effective"].get("document_type")
        model = MODELS.get(dtype)
        if model is None:
            results.append(
                {
                    "document_id": value.get("document_id"),
                    "document_type": dtype,
                    "source_json_schema_errors": ["unknown document_type"],
                    "source_pydantic_errors": ["unknown document_type"],
                }
            )
            continue
        source_json = _schema_errors(model, value)
        source_pydantic = _pydantic_errors(model, value)
        reviewer_model = getattr(reviewer_models, REVIEWER_MODELS[dtype])
        reviewer_json = _schema_errors(reviewer_model, value)
        reviewer_pydantic = _pydantic_errors(reviewer_model, value)
        normalized_value = None
        normalized_json: list[str] = []
        normalized_pydantic: list[str] = []
        if not source_pydantic and not row["conflicts"]:
            normalized_model = normalize_document(
                value, source_reference=row["file"], source_bytes=row["bytes"], envelope=None
            )
            normalized_value = normalized_model.model_dump(mode="json", by_alias=True)
            normalized_json = _schema_errors(NormalizedCatalogRecordV1, normalized_value)
            normalized_pydantic = _pydantic_errors(NormalizedCatalogRecordV1, normalized_value)
            normalized.append(normalized_value)
        results.append(
            {
                "file": row["file"],
                "document_id": value.get("document_id"),
                "document_type": dtype,
                "envelope_conflicts": row["conflicts"],
                "reviewer_json_schema_errors": reviewer_json,
                "reviewer_pydantic_errors": reviewer_pydantic,
                "source_v1_json_schema_errors": source_json,
                "source_v1_pydantic_errors": source_pydantic,
                "normalized_v1_json_schema_errors": normalized_json,
                "normalized_v1_pydantic_errors": normalized_pydantic,
                "semantic_hash_valid": bool(
                    normalized_value
                    and normalized_value["content_hash"]
                    == semantic_content_hash(normalized_value["semantic_text"])
                ),
            }
        )
    physical_ids = {str(x["document_id"]) for x in results}
    physical_columns = [
        column
        for row in rows
        if row["effective"].get("document_type") == "table_schema"
        for column in row["effective"].get("table", {}).get("columns", [])
    ]
    eligibility = _json(release / "reports" / "eligibility-report.json")
    declared_rows = [x for x in eligibility.get("documents", []) if isinstance(x, dict)]
    eligible_ids = {
        str(x.get("document_id"))
        for x in declared_rows
        if x.get("usable_for_sql_generation") is True
    }
    ineligible_ids = {
        str(x.get("document_id"))
        for x in declared_rows
        if x.get("usable_for_sql_generation") is False
    }
    excluded_ids: set[str] = set()
    declared_ids = eligible_ids | ineligible_ids | excluded_ids
    counts = {
        "source_files": source_files,
        "physical_documents": len(results),
        "declared_documents": len(declared_ids),
        "eligible_documents": len(eligible_ids),
        "ineligible_documents": len(ineligible_ids),
        "excluded_documents": len(excluded_ids),
        "orphan_documents": len(physical_ids - declared_ids),
        "missing_documents": len(declared_ids - physical_ids),
        "unique_documents": len(physical_ids),
        "physical_sql_type_unknown": sum(
            column.get("sql_type") is None for column in physical_columns
        ),
        "physical_nullable_unknown": sum(
            column.get("nullable") is None for column in physical_columns
        ),
        "by_document_type": dict(sorted(Counter(str(x["document_type"]) for x in results).items())),
        "module_memberships": dict(
            sorted(Counter(m for x in normalized for m in x["modules"]).items())
        ),
        "by_status": dict(sorted(Counter(str(x["effective"].get("status")) for x in rows).items())),
        "reviewer_json_schema_pass": sum(not x["reviewer_json_schema_errors"] for x in results),
        "reviewer_pydantic_pass": sum(not x["reviewer_pydantic_errors"] for x in results),
        "source_v1_json_schema_pass": sum(not x["source_v1_json_schema_errors"] for x in results),
        "source_v1_pydantic_pass": sum(not x["source_v1_pydantic_errors"] for x in results),
        "normalized_v1_json_schema_pass": sum(
            not x["normalized_v1_json_schema_errors"] and not x["source_v1_pydantic_errors"]
            for x in results
        ),
        "normalized_v1_pydantic_pass": sum(
            not x["normalized_v1_pydantic_errors"] and not x["source_v1_pydantic_errors"]
            for x in results
        ),
        "semantic_hash_pass": sum(x["semantic_hash_valid"] for x in results),
        "retrieval_eligible": sum(x["capabilities"]["retrieval_eligible"] for x in normalized),
        "embedding_eligible": sum(x["capabilities"]["embedding_eligible"] for x in normalized),
        "sql_generation_eligible": sum(
            x["capabilities"]["sql_generation_eligible"] for x in normalized
        ),
        "physical_metadata_complete": sum(
            x["capabilities"]["physical_metadata_complete"] for x in normalized
        ),
    }
    after = _snapshot(release)
    if before != after:
        return 3
    compatible = (
        all(
            counts[key] == len(results)
            for key in (
                "reviewer_json_schema_pass",
                "reviewer_pydantic_pass",
                "source_v1_json_schema_pass",
                "source_v1_pydantic_pass",
                "normalized_v1_json_schema_pass",
                "normalized_v1_pydantic_pass",
                "semantic_hash_pass",
            )
        )
        and counts["orphan_documents"] == 0
        and counts["missing_documents"] == 0
    )
    output = {
        "report_schema_version": "1.0.0",
        "result": "compatible" if compatible else "incompatible",
        "paths": {"release": str(release), "reviewer": str(reviewer)},
        "counts": counts,
        "sets": {
            "physical_ids": sorted(physical_ids),
            "declared_ids": sorted(declared_ids),
            "eligible_ids": sorted(eligible_ids),
            "ineligible_ids": sorted(ineligible_ids),
            "excluded_ids": [],
        },
        "documents": results,
        "sources_modified": False,
    }
    _atomic_json(report, output)
    print(
        json.dumps(
            {
                "result": output["result"],
                "report": str(report),
                "counts": counts,
                "sources_modified": False,
            },
            ensure_ascii=False,
        )
    )
    return 0 if compatible else 1


def scaffold_module(args: argparse.Namespace) -> int:
    output = args.output.resolve()
    files = {
        "module-package.json": {
            "contract_version": "1.0.0",
            "schema_version": "1.0.0",
            "catalog_version": args.catalog_version,
            "module": args.module,
            "language": args.language,
            "manifest": "module-manifest.json",
            "query_examples": [],
            "table_schemas": [],
            "table_families": [],
            "dependencies": [],
        },
        "module-manifest.json": {
            "contract_version": "1.0.0",
            "schema_version": "1.0.0",
            "catalog_version": args.catalog_version,
            "module": args.module,
            "documents": [],
            "dependencies": [],
        },
    }
    plan = {
        "mode": "apply" if args.apply else "dry-run",
        "output": str(output),
        "files": sorted(files),
    }
    if args.apply:
        for name, value in files.items():
            _atomic_json(output / name, value)
    print(json.dumps(plan, ensure_ascii=False))
    return 0


def parser() -> argparse.ArgumentParser:
    root = argparse.ArgumentParser(prog="erp-rag-contracts")
    sub = root.add_subparsers(dest="command", required=True)
    check = sub.add_parser("compatibility-check")
    check.add_argument("--release", type=Path, required=True)
    check.add_argument("--reviewer", type=Path, required=True)
    check.add_argument("--report", type=Path, required=True)
    scaffold = sub.add_parser("scaffold-module")
    scaffold.add_argument("--module", required=True)
    scaffold.add_argument("--catalog-version", required=True)
    scaffold.add_argument("--language", default="es")
    scaffold.add_argument("--output", type=Path, required=True)
    scaffold.add_argument("--dry-run", action="store_true")
    scaffold.add_argument("--apply", action="store_true")
    return root


def main() -> int:
    args = parser().parse_args()
    try:
        if args.command == "compatibility-check":
            return compatibility_check(args.release, args.reviewer, args.report)
        if args.dry_run and args.apply:
            raise ValueError("--dry-run and --apply are mutually exclusive")
        return scaffold_module(args)
    except (FileNotFoundError, ValueError, ValidationError, json.JSONDecodeError) as exc:
        print(str(exc), file=sys.stderr)
        return 2
    except Exception as exc:  # noqa: BLE001
        print(f"{type(exc).__name__}: {exc}", file=sys.stderr)
        return 4


if __name__ == "__main__":
    raise SystemExit(main())
