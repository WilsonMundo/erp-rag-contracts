import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { compile } from 'json-schema-to-typescript';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_OUTPUT = join(ROOT, 'generated', 'typescript', 'runtime');
const REQUEST_SCHEMA = join(ROOT, 'contracts', 'runtime', 'chat-turn-request-v2.schema.json');
const RESPONSE_SCHEMA = join(ROOT, 'contracts', 'runtime', 'chat-turn-response-v2.schema.json');
const OUTPUT_ARGUMENT = process.argv.indexOf('--output');
const outputDirectory =
  OUTPUT_ARGUMENT === -1 ? DEFAULT_OUTPUT : resolve(process.argv[OUTPUT_ARGUMENT + 1]);

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const sha256 = (content) => createHash('sha256').update(content).digest('hex');
const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;

const requestSchema = await readJson(REQUEST_SCHEMA);
const responseSchema = await readJson(RESPONSE_SCHEMA);
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
const requestTypes = await compile(
  requestProjection,
  'RequestClarificationValueV2',
  compilerOptions,
);
const responseTypes = await compile(responseSchema, 'ChatTurnResponseV2', compilerOptions);
const index = [
  '// Generated from canonical JSON Schemas. Do not edit.',
  requestTypes.trim(),
  responseTypes.trim(),
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
