import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { compile } from 'json-schema-to-typescript';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_OUTPUT = join(ROOT, 'generated', 'typescript', 'runtime');
const REQUEST_SCHEMA = join(ROOT, 'contracts', 'runtime', 'chat-turn-request-v2.schema.json');
const RESPONSE_SCHEMA = join(ROOT, 'contracts', 'runtime', 'chat-turn-response-v2.schema.json');
const CHART_V2_SCHEMA = join(ROOT, 'contracts', 'runtime', 'chart-definition-v2.schema.json');
const PR01_SCHEMAS = [
  ['intent-classification-v2', 'IntentClassificationV2'],
  ['presentation-preference-v1', 'PresentationPreferenceV1'],
  ['query-sql-draft-v6', 'QuerySqlDraftV6'],
  ['proposed-result-semantics-v2', 'ProposedResultSemanticsV2'],
  ['result-set-semantics-v1', 'ResultSetSemanticsV1'],
  ['result-set-selection-v1', 'ResultSetSelectionV1'],
  ['result-scope-v1', 'ResultScopeV1'],
  ['result-set-binding-v1', 'ResultSetBindingV1'],
  ['proposed-semantic-column-v2', 'ProposedSemanticColumnV2'],
  ['value-reference-v1', 'ValueReferenceV1'],
  ['resolved-business-reference-context-v1', 'ResolvedBusinessReferenceContextV1'],
  ['resolved-business-reference-v1', 'ResolvedBusinessReferenceV1'],
  ['presentation-plan-v2', 'PresentationPlanV2'],
  ['presentation-block-v2', 'PresentationBlockV2'],
  ['kpi-block-v1', 'KpiBlockV1'],
  ['comparison-kpi-block-v1', 'ComparisonKpiBlockV1'],
  ['data-grid-block-v1', 'DataGridBlockV1'],
  ['pivot-grid-block-v1', 'PivotGridBlockV1'],
  ['chart-block-v1', 'ChartBlockV1'],
  ['gauge-block-v1', 'GaugeBlockV1'],
  ['presentation-layout-v1', 'PresentationLayoutV1'],
  ['presentation-block-resolution-v1', 'PresentationBlockResolutionV1'],
  ['materialized-presentation-v2', 'MaterializedPresentationV2'],
  ['materialized-kpi-block-v1', 'MaterializedKpiBlockV1'],
  ['materialized-comparison-kpi-block-v1', 'MaterializedComparisonKpiBlockV1'],
  ['materialized-grid-block-v1', 'MaterializedGridBlockV1'],
  ['materialized-pivot-block-v1', 'MaterializedPivotBlockV1'],
  ['materialized-chart-block-v1', 'MaterializedChartBlockV1'],
  ['materialized-gauge-block-v1', 'MaterializedGaugeBlockV1'],
  ['query-result-v2', 'QueryResultV2'],
  ['assistant-client-stream-event-v2', 'AssistantClientStreamEventV2'],
  ['spoken-summary-v1', 'SpokenSummaryV1'],
  ['analytics-result-v1', 'AnalyticsResultV1'],
  ['assistant-historical-result-v2', 'AssistantHistoricalResultV2'],
  ['assistant-historical-requery-result-v2', 'AssistantHistoricalRequeryResultV2'],
  ['query-artifact-v1', 'QueryArtifactV1'],
  ['query-artifact-parameter-v1', 'QueryArtifactParameterV1'],
  ['historical-query-artifact-view-v1', 'HistoricalQueryArtifactViewV1'],
  ['historical-requery-parameter-v1', 'HistoricalRequeryParameterV1'],
  ['requery-capability-v1', 'RequeryCapabilityV1'],
  ['dashboard-definition-v1', 'DashboardDefinitionV1'],
  ['dashboard-widget-v1', 'DashboardWidgetV1'],
  ['dashboard-filter-v1', 'DashboardFilterV1'],
  ['dashboard-filter-binding-v1', 'DashboardFilterBindingV1'],
  ['dashboard-filter-mapping-v1', 'DashboardFilterMappingV1'],
  ['dashboard-entity-selection-v1', 'DashboardEntitySelectionV1'],
  ['dashboard-editor-catalog-v1', 'DashboardEditorCatalogV1'],
  ['analytics-dashboard-source-v1', 'AnalyticsDashboardSourceV1'],
  ['analytics-dashboard-source-block-v1', 'AnalyticsDashboardSourceBlockV1'],
  ['dashboard-editor-catalog-item-v1', 'DashboardEditorCatalogItemV1'],
  ['dashboard-editor-catalog-block-v1', 'DashboardEditorCatalogBlockV1'],
  ['dashboard-editor-binding-option-v1', 'DashboardEditorBindingOptionV1'],
  ['dashboard-stream-event-v1', 'DashboardStreamEventV1'],
  ['dashboard-result-v1', 'DashboardResultV1'],
  ['import-operation-v1', 'ImportOperationV1'],
  ['import-preflight-v1', 'ImportPreflightV1'],
  ['import-mapping-v1', 'ImportMappingV1'],
  ['import-preview-v1', 'ImportPreviewV1'],
  ['import-execution-request-v1', 'ImportExecutionRequestV1'],
  ['import-result-v1', 'ImportResultV1'],
  ['import-issue-v1', 'ImportIssueV1'],
  ['import-stream-event-v1', 'ImportStreamEventV1'],
  ['presentation-capability-profile-v1', 'PresentationCapabilityProfileV1'],
  ['import-capability-descriptor-v1', 'ImportCapabilityDescriptorV1'],
  ['analytics-presentation-block-v1', 'AnalyticsPresentationBlockV1'],
  ['generic-analytics-persist-ack-v1', 'GenericAnalyticsPersistenceReceiptV1'],
].map(([slug, typeName]) => [
  slug,
  typeName,
  join(ROOT, 'contracts', 'runtime', `${slug}.schema.json`),
]);
const OUTPUT_ARGUMENT = process.argv.indexOf('--output');
const outputDirectory =
  OUTPUT_ARGUMENT === -1 ? DEFAULT_OUTPUT : resolve(process.argv[OUTPUT_ARGUMENT + 1]);

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const sha256 = (content) => createHash('sha256').update(content).digest('hex');
const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;

const requestSchema = await readJson(REQUEST_SCHEMA);
const responseSchema = await readJson(RESPONSE_SCHEMA);
const chartV2Schema = await readJson(CHART_V2_SCHEMA);
const pr01Schemas = await Promise.all(
  PR01_SCHEMAS.map(async ([slug, typeName, path]) => [slug, typeName, path, await readJson(path)]),
);
const project = (value, title) => ({ ...structuredClone(value), title });

const requestProjection = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'RequestClarificationValueV2',
  oneOf: [
    { $ref: '#/$defs/entitySelectionClarificationValue' },
    { $ref: '#/$defs/entityMultiSelectionClarificationValue' },
  ],
  $defs: {
    opaqueIdentifier: requestSchema.$defs.opaqueIdentifier,
    entitySelectionClarificationValue: project(
      requestSchema.$defs.entitySelectionClarificationValue,
      'EntitySelectionClarificationValueV2',
    ),
    entityMultiSelectionClarificationValue: project(
      requestSchema.$defs.entityMultiSelectionClarificationValue,
      'EntityMultiSelectionClarificationValueV2',
    ),
  },
};

const compilerOptions = {
  bannerComment: '',
  declareExternallyReferenced: true,
  enableConstEnums: false,
  format: true,
  style: { printWidth: 100, semi: true, singleQuote: true, tabWidth: 2, useTabs: false },
  unknownAny: false,
};
const pr01Definitions = {};
for (const [, typeName, , schema] of pr01Schemas) {
  for (const [name, definition] of Object.entries(schema.$defs ?? {})) {
    const existing = pr01Definitions[name];
    if (existing && JSON.stringify(existing) !== JSON.stringify(definition)) {
      throw new Error(`Conflicting JSON Schema definition: ${name}`);
    }
    pr01Definitions[name] = definition;
  }
  const { $schema, $id, description, $defs, ...rootDefinition } = schema;
  void [$schema, $id, description, $defs];
  pr01Definitions[typeName] = { ...rootDefinition, title: typeName };
}
const pr01Projection = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'RuntimeContractsPr01',
  oneOf: PR01_SCHEMAS.map(([, typeName]) => ({ $ref: `#/$defs/${typeName}` })),
  $defs: pr01Definitions,
};
const requestTypes = await compile(
  requestProjection,
  'RequestClarificationValueV2',
  compilerOptions,
);
const responseTypes = await compile(responseSchema, 'ChatTurnResponseV2', compilerOptions);
const chartV2Types = await compile(chartV2Schema, 'ChartDefinitionV2', compilerOptions);
const pr01Types = await compile(pr01Projection, 'RuntimeContractsPr01', compilerOptions);
const pr01ContractTypes = pr01Types.replace(
  /export type RuntimeContractsPr01 =[\s\S]*?;\r?\n/,
  '',
);
const index = [
  '// Generated from canonical JSON Schemas. Do not edit.',
  requestTypes.trim(),
  responseTypes.trim(),
  chartV2Types.trim(),
  pr01ContractTypes.trim(),
  '',
].join('\n\n');

const pyproject = await readFile(join(ROOT, 'pyproject.toml'), 'utf8');
const packageVersion = pyproject.match(/^version = "([^"]+)"$/m)?.[1];
if (!packageVersion) throw new Error('Unable to read the canonical package version.');
const generatorPackage = await readJson(
  join(ROOT, 'node_modules', 'json-schema-to-typescript', 'package.json'),
);
const packageJson = {
  name: '@proyectoz/erp-rag-runtime-contracts',
  version: packageVersion,
  private: true,
  types: './index.d.ts',
  exports: { '.': { types: './index.d.ts' } },
  files: ['index.d.ts', 'generation-metadata.json'],
};
const schemaMetadata = [];
for (const [name, path] of [
  ['chat-turn-request-v2', REQUEST_SCHEMA],
  ['chat-turn-response-v2', RESPONSE_SCHEMA],
  ['chart-definition-v2', CHART_V2_SCHEMA],
  ...PR01_SCHEMAS.map(([slug, , schemaPath]) => [slug, schemaPath]),
]) {
  const bytes = await readFile(path);
  schemaMetadata.push({
    name,
    path: path.slice(ROOT.length + 1).replaceAll('\\', '/'),
    sha256: sha256(bytes),
  });
}
const metadata = {
  contract_package: 'erp-rag-contracts',
  contract_package_version: packageVersion,
  generator: 'json-schema-to-typescript',
  generator_version: generatorPackage.version,
  schemas: schemaMetadata,
  index_sha256: sha256(index),
};

await mkdir(outputDirectory, { recursive: true });
await writeFile(join(outputDirectory, 'index.d.ts'), index, 'utf8');
await writeFile(join(outputDirectory, 'package.json'), stableJson(packageJson), 'utf8');
await writeFile(join(outputDirectory, 'generation-metadata.json'), stableJson(metadata), 'utf8');
