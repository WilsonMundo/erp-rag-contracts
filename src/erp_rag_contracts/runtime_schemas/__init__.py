from __future__ import annotations

from contextlib import AbstractContextManager
from importlib.resources import as_file, files
from pathlib import Path

_SCHEMAS = {
    ("chat-turn-request", "2"): "chat-turn-request-v2.schema.json",
    ("chat-turn-response", "2"): "chat-turn-response-v2.schema.json",
    ("query-sql-draft", "5"): "query-sql-draft-v5.schema.json",
    ("query-semantic-plan", "1"): "query-semantic-plan-v1.schema.json",
    ("resolved-query-context", "1"): "resolved-query-context-v1.schema.json",
    ("entity-resolution-request", "2"): "entity-resolution-request-v2.schema.json",
    ("entity-resolution-result", "2"): "entity-resolution-result-v2.schema.json",
}


def runtime_schema_path(name: str, version: str) -> AbstractContextManager[Path]:
    try:
        resource = files(__package__).joinpath(_SCHEMAS[(name, version)])
    except KeyError as exc:
        raise KeyError(f"Unknown runtime schema: {name} v{version}") from exc
    return as_file(resource)
