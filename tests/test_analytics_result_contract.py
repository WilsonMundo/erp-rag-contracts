import hashlib
import json
from pathlib import Path

import pytest
from jsonschema import Draft202012Validator, FormatChecker
from pydantic import ValidationError

from erp_rag_contracts.models.runtime_v2 import AnalyticsResultV1
from erp_rag_contracts.runtime_schemas import runtime_schema_path

ROOT = Path(__file__).resolve().parents[1]


def test_analytics_result_schema_and_manifest_preserve_exact_rows() -> None:
    source = ROOT / "contracts/runtime/analytics-result-v1.schema.json"
    with runtime_schema_path("analytics-result", "1") as packaged:
        assert packaged.read_bytes() == source.read_bytes()
    manifest = json.loads((ROOT / "contract-manifest.json").read_text(encoding="utf-8"))
    entry = next(
        item
        for item in manifest["contracts"]
        if item["path"] == source.relative_to(ROOT).as_posix()
    )
    assert entry["sha256"] == hashlib.sha256(source.read_bytes()).hexdigest()

    period = {
        "start": "2026-08-01T00:00:00-06:00",
        "end_exclusive": "2026-09-01T00:00:00-06:00",
        "timezone": "America/Guatemala",
    }
    payload = {
        "analytics_result_version": "1.0",
        "result_id": "analytics-turn-1",
        "status": "completed",
        "operation": "forecast",
        "metric_concept": "sales",
        "method_id": "daily_run_rate_v1",
        "input_totals": [{"period": period, "value": "170"}],
        "target_period": {
            **period,
            "start": "2026-09-01T00:00:00-06:00",
            "end_exclusive": "2026-10-01T00:00:00-06:00",
        },
        "projected_value": "164.5161290322580645161290323",
        "rows": [
            {"period": "Agosto 2026", "type": "actual", "value": "170"},
            {
                "period": "Septiembre 2026",
                "type": "forecast",
                "value": "164.5161290322580645161290323",
            },
        ],
        "presentation": {
            "kind": "forecast_summary",
            "title": "Proyección de ventas",
            "kpi_title": "Ventas proyectadas",
            "method_label": "Método: promedio diario",
            "chart_enabled": False,
        },
    }
    schema = json.loads(source.read_text(encoding="utf-8"))
    Draft202012Validator(schema, format_checker=FormatChecker()).validate(payload)
    assert AnalyticsResultV1.model_validate(payload).rows[1].value == payload["projected_value"]
    payload["method_explanation"] = {
        "method_id": "daily_run_rate_v1",
        "method_version": "1.0",
        "label": "Promedio diario",
        "description": "Proyecta con el promedio diario.",
        "selection_reason": "single_complete_base_period",
        "calculation": {
            "kind": "daily_run_rate",
            "base_total": "170",
            "base_days": 31,
            "daily_average": "5.4838709677419354838709677419354838709677419354839",
            "target_days": 30,
            "projected_value": payload["projected_value"],
        },
    }
    Draft202012Validator(schema, format_checker=FormatChecker()).validate(payload)
    assert (
        AnalyticsResultV1.model_validate_json(
            AnalyticsResultV1.model_validate(payload).model_dump_json(exclude_none=True)
        ).method_explanation.calculation.base_days
        == 31
    )
    payload["rows"][1]["value"] = "17"
    with pytest.raises(ValidationError):
        AnalyticsResultV1.model_validate(payload)


def test_grouped_result_roundtrips_exact_values_without_global_total() -> None:
    period = {
        "start": "2026-08-01T00:00:00-06:00",
        "end_exclusive": "2026-09-01T00:00:00-06:00",
        "timezone": "America/Guatemala",
    }
    payload = {
        "analytics_result_version": "1.0",
        "result_id": "grouped-1",
        "status": "completed",
        "operation": "forecast",
        "metric_concept": "sales",
        "method_id": "daily_run_rate_v1",
        "input_totals": [],
        "rows": [],
        "target_period": {
            **period,
            "start": "2026-09-01T00:00:00-06:00",
            "end_exclusive": "2026-10-01T00:00:00-06:00",
        },
        "group_by": "branch",
        "base_periods": [period],
        "grouped_rows": [
            {
                "group": {"concept": "branch", "key": "26", "label": "Edison"},
                "base_value": "310.00000000000001",
                "projected_value": "300.0000000000000096774193548",
            }
        ],
        "presentation": {
            "kind": "grouped_forecast",
            "title": "Por sucursal",
            "kpi_title": "Por sucursal",
            "method_label": "Promedio diario",
            "chart_enabled": False,
        },
        "method_explanation": {
            "method_id": "daily_run_rate_v1",
            "method_version": "1.0",
            "label": "Promedio diario",
            "description": "Por sucursal",
            "selection_reason": "single_complete_base_period",
        },
    }
    with runtime_schema_path("analytics-result", "1") as packaged:
        Draft202012Validator(
            json.loads(packaged.read_text(encoding="utf-8")), format_checker=FormatChecker()
        ).validate(payload)
    restored = AnalyticsResultV1.model_validate_json(
        AnalyticsResultV1.model_validate(payload).model_dump_json(exclude_none=True)
    )
    assert restored.projected_value is None
    assert restored.grouped_rows[0].projected_value == "300.0000000000000096774193548"
    payload["grouped_rows"].append(
        {**payload["grouped_rows"][0], "group": {"concept": "branch", "key": "26", "label": "Otro"}}
    )
    with pytest.raises(ValidationError):
        AnalyticsResultV1.model_validate(payload)


def test_inventory_reorder_result_keeps_exact_strings_and_missing_inventory_null() -> None:
    period = {
        "start": "2026-10-01T00:00:00-06:00",
        "end_exclusive": "2026-11-01T00:00:00-06:00",
        "timezone": "America/Guatemala",
    }
    row = {
        "product_id": "7", "product_name": "A",
        "projected_demand": "20.0000000000000001",
        "available_inventory": "5", "shortage": "15.0000000000000001",
        "recommended_reorder": "15.0000000000000001", "row_status": "ready",
    }
    missing = {
        "product_id": "8", "product_name": "B", "projected_demand": "3",
        "available_inventory": None, "shortage": None,
        "recommended_reorder": None, "row_status": "missing_inventory",
    }
    payload = {
        "analytics_result_version": "1.0", "result_id": "reorder-1",
        "status": "completed", "operation": "inventory_reorder",
        "metric_concept": "inventory_reorder", "method_id": "inventory_reorder_v1",
        "method_version": "1.0", "demand_forecast_method_id": "daily_run_rate_v1",
        "demand_forecast_method_version": "1.0", "input_totals": [],
        "target_period": period, "rows": [row, missing],
        "presentation": {"kind": "inventory_reorder_grid", "title": "Reorden sugerido",
                         "kpi_title": "Reorden sugerido", "method_label": "Reorden básico",
                         "chart_enabled": False},
        "group_by": "product", "base_periods": [period],
        "inventory_as_of": "2026-09-17T10:00:00-06:00",
        "method_explanation": {"method_id": "inventory_reorder_v1",
                               "method_version": "1.0", "label": "Reorden básico",
                               "description": "Demanda e inventario",
                               "selection_reason": "registered_inventory_reorder_method",
                               "calculation": "Reorden = máximo(demanda - inventario, 0)."},
        "limitations": ["stock de seguridad"],
    }
    with runtime_schema_path("analytics-result", "1") as packaged:
        Draft202012Validator(
            json.loads(packaged.read_text(encoding="utf-8")), format_checker=FormatChecker()
        ).validate(payload)
    restored = AnalyticsResultV1.model_validate_json(
        AnalyticsResultV1.model_validate(payload).model_dump_json(exclude_none=False)
    )
    assert restored.rows[0].recommended_reorder == "15.0000000000000001"
    assert restored.rows[1].recommended_reorder is None
    payload["rows"] = [{**row, "product_id": str(index)} for index in range(500)]
    with runtime_schema_path("analytics-result", "1") as packaged:
        schema = json.loads(packaged.read_text(encoding="utf-8"))
    Draft202012Validator(schema, format_checker=FormatChecker()).validate(payload)
    assert len(AnalyticsResultV1.model_validate(payload).rows) == 500
    payload["rows"].append({**row, "product_id": "500"})
    with pytest.raises(ValidationError):
        AnalyticsResultV1.model_validate(payload)
    payload["rows"] = [row, missing]
    missing["recommended_reorder"] = "0"
    with pytest.raises(ValidationError):
        AnalyticsResultV1.model_validate(payload)
