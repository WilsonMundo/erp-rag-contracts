import { execFileSync } from 'node:child_process';
import { readFile, unlink, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const GENERATED = join(ROOT, 'generated', 'typescript', 'runtime');
const CHECK_FILE = join(GENERATED, '.fixture-conformance.ts');
const readJson = async (path) => JSON.parse(await readFile(join(ROOT, path), 'utf8'));
const literal = (value) => JSON.stringify(value, null, 2);

const requestSingle = await readJson(
  'fixtures/runtime/chat-turn-request-v2/valid/entity-selection.json',
);
const requestMultiOne = await readJson(
  'fixtures/runtime/chat-turn-request-v2/valid/entity-multi-selection-one.json',
);
const requestMultiTen = await readJson(
  'fixtures/runtime/chat-turn-request-v2/valid/entity-multi-selection-ten.json',
);
const responses = await Promise.all(
  ['normal.json', 'entity-selection.json', 'entity-multi-selection.json', 'entity-multi-selection-ten.json'].map(
    (name) => readJson(`fixtures/runtime/chat-turn-response-v2/valid/${name}`),
  ),
);
const valueOf = (request) => request.input.clarification_response.value;
const pr01Fixtures = await Promise.all(
  [
    'query-presentation',
    'business-references',
    'query-artifact',
    'dashboard',
    'import',
    'stream-history',
  ].map((family) => readJson(`fixtures/runtime/pr01-${family}/valid/minimum.json`)),
);
const source = `import type {
  AssistantClientStreamEventV2,
  ChatTurnResponseV2,
  DashboardDefinitionV1,
  EntityMultiSelectionClarificationValueV2,
  EntitySelectionClarificationValueV2,
  ImportPreflightV1,
  QueryArtifactV1,
  QuerySqlDraftV6,
  ResolvedBusinessReferenceContextV1,
} from './index.js';

const requestSingle: EntitySelectionClarificationValueV2 = ${literal(valueOf(requestSingle))};
const requestMultiOne: EntityMultiSelectionClarificationValueV2 = ${literal(valueOf(requestMultiOne))};
const requestMultiTen: EntityMultiSelectionClarificationValueV2 = ${literal(valueOf(requestMultiTen))};
const responses: ChatTurnResponseV2[] = ${literal(responses)};
const queryDraft: QuerySqlDraftV6 = ${literal(pr01Fixtures[0])};
const businessReferences: ResolvedBusinessReferenceContextV1 = ${literal(pr01Fixtures[1])};
const queryArtifact: QueryArtifactV1 = ${literal(pr01Fixtures[2])};
const dashboard: DashboardDefinitionV1 = ${literal(pr01Fixtures[3])};
const importPreflight: ImportPreflightV1 = ${literal(pr01Fixtures[4])};
const streamEvent: AssistantClientStreamEventV2 = ${literal(pr01Fixtures[5])};
void [
  requestSingle,
  requestMultiOne,
  requestMultiTen,
  responses,
  queryDraft,
  businessReferences,
  queryArtifact,
  dashboard,
  importPreflight,
  streamEvent,
];
`;

await writeFile(CHECK_FILE, source, 'utf8');
try {
  execFileSync(
    process.execPath,
    [
      join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc'),
      '--noEmit',
      '--strict',
      '--skipLibCheck',
      '--target',
      'ES2022',
      '--module',
      'NodeNext',
      '--moduleResolution',
      'NodeNext',
      CHECK_FILE,
    ],
    { cwd: ROOT, stdio: 'inherit' },
  );
} finally {
  await unlink(CHECK_FILE).catch(() => undefined);
}
