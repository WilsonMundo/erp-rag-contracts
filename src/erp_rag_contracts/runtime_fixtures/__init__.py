from __future__ import annotations

from contextlib import AbstractContextManager
from importlib.resources import as_file, files
from pathlib import Path


def runtime_fixture_path(relative_path: str) -> AbstractContextManager[Path]:
    if relative_path.startswith(("/", "\\")) or ".." in Path(relative_path).parts:
        raise ValueError("Runtime fixture path must be relative and cannot traverse directories")
    return as_file(files(__package__).joinpath(relative_path))
