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


def test_typescript_surface_contains_complete_pr01_catalog() -> None:
    declarations = (GENERATED / "index.d.ts").read_text(encoding="utf-8")
    expected = (
        "IntentClassificationV2",
        "PresentationPreferenceV1",
        "QuerySqlDraftV6",
        "ProposedResultSemanticsV2",
        "ResultSetSemanticsV1",
        "ResultSetSelectionV1",
        "ProposedSemanticColumnV2",
        "ValueReferenceV1",
        "ResolvedBusinessReferenceContextV1",
        "ResolvedBusinessReferenceV1",
        "PresentationPlanV2",
        "PresentationBlockV2",
        "KpiBlockV1",
        "DataGridBlockV1",
        "PivotGridBlockV1",
        "ChartBlockV1",
        "GaugeBlockV1",
        "PresentationLayoutV1",
        "PresentationBlockResolutionV1",
        "MaterializedPresentationV2",
        "MaterializedKpiBlockV1",
        "MaterializedGridBlockV1",
        "MaterializedPivotBlockV1",
        "MaterializedChartBlockV1",
        "MaterializedGaugeBlockV1",
        "QueryResultV2",
        "AssistantClientStreamEventV2",
        "AssistantHistoricalResultV2",
        "AssistantHistoricalRequeryResultV2",
        "QueryArtifactV1",
        "QueryArtifactParameterV1",
        "RequeryCapabilityV1",
        "DashboardDefinitionV1",
        "DashboardWidgetV1",
        "DashboardFilterV1",
        "DashboardFilterBindingV1",
        "DashboardFilterMappingV1",
        "DashboardStreamEventV1",
        "DashboardResultV1",
        "ImportOperationV1",
        "ImportPreflightV1",
        "ImportMappingV1",
        "ImportPreviewV1",
        "ImportExecutionRequestV1",
        "ImportResultV1",
        "ImportIssueV1",
        "ImportStreamEventV1",
        "PresentationCapabilityProfileV1",
        "ImportCapabilityDescriptorV1",
    )
    for name in expected:
        assert f" {name} " in declarations or f" {name}=" in declarations
    assert "RuntimeContractsPr01" not in declarations


def test_canonical_fixtures_compile_against_generated_types() -> None:
    subprocess.run(["node", "tools/check-typescript-fixtures.mjs"], cwd=ROOT, check=True)
