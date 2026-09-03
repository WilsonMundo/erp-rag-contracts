from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GENERATED = ROOT / "generated" / "typescript" / "runtime"


def test_typescript_generation_is_byte_reproducible(tmp_path: Path) -> None:
    output = tmp_path / "runtime"
    subprocess.run(
        ["node", "tools/generate-typescript-contracts.mjs", "--output", str(output)],
        cwd=ROOT,
        check=True,
    )
    expected = {path.name: path.read_bytes() for path in GENERATED.iterdir() if path.is_file()}
    actual = {path.name: path.read_bytes() for path in output.iterdir() if path.is_file()}
    assert actual == expected


def test_typescript_surface_is_scoped_and_named() -> None:
    declarations = (GENERATED / "index.d.ts").read_text(encoding="utf-8")
    for name in (
        "ChatTurnResponseV2",
        "EntitySelectionResponseSpec",
        "EntityMultiSelectionResponseSpec",
        "EntitySelectionClarificationValueV2",
        "EntityMultiSelectionClarificationValueV2",
    ):
        assert name in declarations
    assert "ChatTurnRequestV2" not in declarations
    assert "kind: 'entity_selection'" in declarations
    assert "kind: 'entity_multi_selection'" in declarations
    assert "type: 'entity_selection'" in declarations
    assert "type: 'entity_multi_selection'" in declarations


def test_canonical_fixtures_compile_against_generated_types() -> None:
    subprocess.run(["node", "tools/check-typescript-fixtures.mjs"], cwd=ROOT, check=True)
