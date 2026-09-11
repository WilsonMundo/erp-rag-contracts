from __future__ import annotations

from contextlib import AbstractContextManager
from importlib.resources import as_file, files
from pathlib import Path

def runtime_schema_path(name: str, version: str) -> AbstractContextManager[Path]:
    resource = files(__package__).joinpath(f"{name}-v{version}.schema.json")
    if not resource.is_file():
        raise KeyError(f"Unknown runtime schema: {name} v{version}")
    return as_file(resource)
