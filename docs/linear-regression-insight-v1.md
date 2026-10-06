# Linear regression historical insight V1

Generic Analytics keeps `ordinary_least_squares_v1`, `x = 0..N-1`, the minimum
observation count, and the original `actual`/`fitted` output rows unchanged.
Python is the authority for the operation-specific metadata. No forecast,
causal inference, LLM narrative, business favorability or frontend analytical
calculation is introduced.

`LinearRegressionMetadataV1` in rag-api adds `mean_actual`,
`slope_relative_per_period = slope / mean_actual`, and
`explained_variance_percent = r_squared * 100`. The relative slope is explicitly
null for a zero mean, including envelopes serialized with `exclude_none`.
Raw `r_squared` retains its original value. Tooltip deviations are supplied in
`point_deviations`, keyed by the exact output period and calculated from the
unchanged serialized `actual - fitted` values in Python.

`interpretation_version = "1.0"` defines a descriptive presentation policy:

| Metadata | Rule |
|---|---|
| `trend_direction` | sign of slope: increasing / decreasing / flat |
| `fit_strength = negligible` | R² < 0.10 |
| `fit_strength = weak` | 0.10 ≤ R² < 0.30 |
| `fit_strength = moderate` | 0.30 ≤ R² < 0.70 |
| `fit_strength = strong` | R² ≥ 0.70 |
| Small relative change | absolute slope / mean < 0.01 per observation |

These are versioned descriptive heuristics, not statistical significance
thresholds. A negligible fit produces “No se observa una tendencia lineal
relevante.” Direction, relative magnitude and explained variation describe
only the historical fit. Units are monthly only when civil output dates are
consecutive months with the same day; otherwise the unit is observation.
Undefined relative magnitude is displayed as unavailable, never zero.

The normative `analytics-presentation-block-v1.schema.json` summary continues
to resolve closed `source`/`field` references. Its optional item `role` defaults
to evidence; supported roles are evidence, conclusion, explanation, technical,
title, subtitle, chart_title and chart_context. `unit_field` references operation
metadata text. Optional precision (0–8) controls numeric display only.
`fraction_percent` formats a raw fractional slope as a percentage, whereas
`percent` displays the already computed percentage points. An identical field
may appear in different roles, but (source, field, role) must be unique.

The insight workspace composes one completed summary with a conclusion role
and one completed chart from the same Generic Analytics result. Optional grids
appear inside the collapsed model details. The workspace uses the declared
title/subtitle, conclusion/explanation, evidence, chart headings and technical
items. The intercept is technical only. Existing summaries without roles keep
their evidence presentation. Missing presentation or failed/loading/blocked
results do not fabricate an insight or retain an earlier result.

Chart series retain explicit human labels and existing actual/fitted bindings.
Optional `color_role` (primary/secondary) and `line_style` (solid/dash) refer to
ERP theme semantics. Optional `evidence` declares a metadata field containing
per-category values, a human label and a format. Python, ApiHub and Angular
validate this binding; none of the consumers recompute deviations. Civil date
chart arguments remain exact `YYYY-MM-DD` strings, avoiding UTC-to-local date
shifts. The existing DevExtreme renderer presents both series and the declared
evidence in its native shared tooltip and exposes it on point click.
Optional `category_labels_field` references a per-category metadata text map.
Python supplies monthly labels through `period_labels`; generic civil-date
charts without this declaration display the full day. The frontend does not
infer monthly cadence from date strings.

Distribution: canonical JSON Schema, packaged Python schema, generated
TypeScript and manifest hashes remain aligned. ApiHub DTOs accept the same
roles, formats, precision and chart bindings. No SQL migration is needed.

Validation is one focused rag-api test:
`tests/unit/test_analysis_linear_regression_contract.py::test_linear_regression_declares_summary_references_labels_and_result_values`.
It executes the Python pipeline and the real Angular adapter/workspace/renderer
configuration through an in-memory Node assertion leg. It validates canonical
and packaged schema parity. It does not compile ApiHub/Angular, render browser
DOM or replace user visual verification of light/dark and responsive layouts.
