from __future__ import annotations

from pydantic import TypeAdapter

from erp_rag_contracts.models import runtime_v2


def test_comparison_kpi_proposal_and_materialized_contracts() -> None:
    proposal = TypeAdapter(runtime_v2.PresentationBlockV2).validate_python(
        {
            "block_version": "1.0",
            "block_id": "sales-comparison",
            "kind": "comparison_kpi",
            "title": "Comparación de venta neta",
            "current": {
                "label": "Periodo actual",
                "value": {"source": "field", "field": "VentaNetaActual"},
                "format": "currency",
            },
            "previous": {
                "label": "Periodo anterior",
                "value": {"source": "field", "field": "VentaNetaMesAnterior"},
                "format": "currency",
            },
            "change": {
                "value": {"source": "field", "field": "VariacionPorcentual"},
                "format": "percent",
            },
        }
    )

    assert isinstance(proposal, runtime_v2.ComparisonKpiBlockV1)
    assert proposal.change.format == "percent"

    materialized = TypeAdapter(runtime_v2.MaterializedPresentationBlockV2).validate_python(
        {
            "block_version": "1.0",
            "block_id": "sales-comparison",
            "kind": "comparison_kpi",
            "title": "Comparación de venta neta",
            "current": {"label": "Periodo actual", "value": 0, "format": "currency"},
            "previous": {
                "label": "Periodo anterior",
                "value": 281950.043,
                "format": "currency",
            },
            "change": {
                "value": -100,
                "format": "percent",
                "direction": "down",
                "sentiment": "negative",
            },
            "scope": {"kind": "all_matches", "label": None},
        }
    )

    assert isinstance(materialized, runtime_v2.MaterializedComparisonKpiBlockV1)
    assert materialized.change.direction == "down"
    assert materialized.change.sentiment == "negative"
