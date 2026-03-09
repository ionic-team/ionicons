#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Where Ionicons keeps its JSON catalogue
const IONICONS_JSON_PATH = './dist/ionicons.json';

function findIoniconsJson() {
  if (fs.existsSync(IONICONS_JSON_PATH)) return IONICONS_JSON_PATH;
  console.error(
    '[generate-ionicon-types] Could not find ionicons.json. ' +
      'Did you build dist first? Tried:\n' +
      IONICONS_JSON_PATH,
  );
  process.exit(1);
}

const srcPath = findIoniconsJson();
const outDir = path.resolve(__dirname, '../src/types');
const outFile = path.join(outDir, 'iconicons.d.ts');

const parsed = JSON.parse(fs.readFileSync(srcPath, 'utf-8'));
const names = Array.from(new Set((parsed.icons || []).map((i) => i.name).filter(Boolean))).sort();

// Build the union as nicely wrapped lines
const unionLines = names.map((n) => `  | "${n}"`).join('\n');

const banner = `// AUTO-GENERATED FILE. DO NOT EDIT.
// Generated from: ${path.relative(process.cwd(), srcPath)}
// Run: npm run build.types`;

const content = `${banner}
// 1) Strict union of built-in names
export type IoniconName =
${unionLines};

// 2) Flexible sources: prefer union, still allow any string (URLs, data URIs, etc.)
export type IoniconSource = IoniconName | (string & {});
`;

fs.mkdirSync(outDir, { recursive: true });

// Only write if changed (keeps TS server quiet)
const prev = fs.existsSync(outFile) ? fs.readFileSync(outFile, 'utf-8') : '';
if (prev !== content) {
  fs.writeFileSync(outFile, content);
  console.log(`[generate-ionicon-types] Wrote ${path.relative(process.cwd(), outFile)} with ${names.length} icons.`);
} else {
  console.log('[generate-ionicon-types] No changes.');
}
