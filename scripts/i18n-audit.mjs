// i18n audit script — compares zh.ts and en.ts for parity issues
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const zhPath = path.resolve(projectRoot, 'src/locales/zh.ts');
const enPath = path.resolve(projectRoot, 'src/locales/en.ts');

const zhRaw = fs.readFileSync(zhPath, 'utf-8');
const enRaw = fs.readFileSync(enPath, 'utf-8');

// Extract keys and values from a locale file
// Handles all 4 quote-style combinations: 'k':'v' / 'k':"v" / "k":'v' / "k":"v"
function extractKeysValues(raw) {
  const map = new Map();
  const lines = raw.split('\n');
  const patterns = [
    /^\s{2}'((?:[^'\\]|\\.)*)'\s*:\s*'((?:[^'\\]|\\.)*)',?$/,
    /^\s{2}'((?:[^'\\]|\\.)*)'\s*:\s*"((?:[^"\\]|\\.)*)",?$/,
    /^\s{2}"((?:[^"\\]|\\.)*)"\s*:\s*'((?:[^'\\]|\\.)*)',?$/,
    /^\s{2}"((?:[^"\\]|\\.)*)"\s*:\s*"((?:[^"\\]|\\.)*)",?$/,
  ];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let matched = null;
    for (const re of patterns) {
      matched = line.match(re);
      if (matched) break;
    }
    if (!matched) continue;
    try {
      const key = JSON.parse(`"${matched[1].replace(/\\'/g, "'").replace(/\\"/g, '\\"')}"`);
      const value = JSON.parse(`"${matched[2].replace(/\\'/g, "'").replace(/\\"/g, '\\"')}"`);
      map.set(key, { value, line: i + 1 });
    } catch {}
  }
  return map;
}

const zh = extractKeysValues(zhRaw);
const en = extractKeysValues(enRaw);

console.log(`=== KEY COUNTS ===`);
console.log(`zh.ts keys: ${zh.size}`);
console.log(`en.ts keys: ${en.size}`);

// 1. Keys in zh but NOT in en (missing English translations)
console.log(`\n=== MISSING IN en.ts (keys in zh but not en) ===`);
const missingInEn = [];
for (const [key, { line }] of zh) {
  if (!en.has(key)) {
    missingInEn.push({ key, zhLine: line });
  }
}
if (missingInEn.length === 0) {
  console.log('None found! All zh keys have en counterparts.');
} else {
  console.log(`Found ${missingInEn.length} missing keys:`);
  for (const { key, zhLine } of missingInEn) {
    console.log(`  [zh:${zhLine}] "${key}" = "${zh.get(key).value}"`);
  }
}

// 2. Keys in en but NOT in zh (orphaned/dead keys)
console.log(`\n=== ORPHANED IN en.ts (keys in en but not zh) ===`);
const orphaned = [];
for (const [key, { line }] of en) {
  if (!zh.has(key)) {
    orphaned.push({ key, enLine: line });
  }
}
if (orphaned.length === 0) {
  console.log('None found!');
} else {
  console.log(`Found ${orphaned.length} orphaned keys:`);
  for (const { key, enLine } of orphaned) {
    console.log(`  [en:${enLine}] "${key}" = "${en.get(key).value}"`);
  }
}

// 3. Empty translations in en
console.log(`\n=== EMPTY TRANSLATIONS in en.ts ===`);
const empty = [];
for (const [key, { value, line }] of en) {
  if (!value || value.trim() === '') {
    empty.push({ key, enLine: line, zhValue: zh.get(key)?.value || '(zh key missing)' });
  }
}
if (empty.length === 0) {
  console.log('None found!');
} else {
  console.log(`Found ${empty.length} empty translations:`);
  for (const { key, enLine, zhValue } of empty) {
    console.log(`  [en:${enLine}] "${key}" → zh: "${zhValue}"`);
  }
}

// 4. Chinese characters in en values
console.log(`\n=== RESIDUAL CHINESE in en.ts ===`);
const chineseRegex = /[一-鿿㐀-䶿]/;
const residual = [];
for (const [key, { value, line }] of en) {
  if (chineseRegex.test(value)) {
    residual.push({ key, enLine: line, enValue: value, zhValue: zh.get(key)?.value || '' });
  }
}
if (residual.length === 0) {
  console.log('None found!');
} else {
  console.log(`Found ${residual.length} entries with Chinese characters:`);
  for (const { key, enLine, enValue, zhValue } of residual) {
    console.log(`  [en:${enLine}] "${key}"`);
    console.log(`    zh: "${zhValue}"`);
    console.log(`    en: "${enValue}"`);
  }
}

// 5. Placeholder consistency
console.log(`\n=== PLACEHOLDER MISMATCH ===`);
const placeholderRegex = /\{(\w+)\}/g;
const mismatches = [];
for (const [key, { value: zhValue }] of zh) {
  const enEntry = en.get(key);
  if (!enEntry) continue;
  const enValue = enEntry.value;

  const zhPlaceholders = new Set();
  let m;
  while ((m = placeholderRegex.exec(zhValue)) !== null) {
    zhPlaceholders.add(m[1]);
  }
  const enPlaceholders = new Set();
  while ((m = placeholderRegex.exec(enValue)) !== null) {
    enPlaceholders.add(m[1]);
  }

  const missingInEnVal = [...zhPlaceholders].filter(p => !enPlaceholders.has(p));
  const extraInEnVal = [...enPlaceholders].filter(p => !zhPlaceholders.has(p));

  if (missingInEnVal.length > 0 || extraInEnVal.length > 0) {
    mismatches.push({ key, zhValue, enValue, missingInEnVal, extraInEnVal });
  }
}
if (mismatches.length === 0) {
  console.log('None found! All placeholders match.');
} else {
  console.log(`Found ${mismatches.length} placeholder mismatches:`);
  for (const { key, zhValue, enValue, missingInEnVal, extraInEnVal } of mismatches) {
    console.log(`  "${key}"`);
    console.log(`    zh: "${zhValue}"`);
    console.log(`    en: "${enValue}"`);
    if (missingInEnVal.length) console.log(`    MISSING in en: {${missingInEnVal.join('}, {')}}`);
    if (extraInEnVal.length) console.log(`    EXTRA in en: {${extraInEnVal.join('}, {')}}`);
  }
}

// 6. Identical zh==en (possibly untranslated)
console.log(`\n=== IDENTICAL zh=en (possibly untranslated) ===`);
const identical = [];
for (const [key, { value: zhValue }] of zh) {
  const enEntry = en.get(key);
  if (!enEntry) continue;
  if (zhValue === enEntry.value && zhValue.length > 0 && /[一-鿿]/.test(zhValue)) {
    identical.push({ key, value: zhValue });
  }
}
if (identical.length === 0) {
  console.log('None found!');
} else {
  console.log(`Found ${identical.length} identical zh=en entries (Chinese in both):`);
  for (const { key, value } of identical.slice(0, 30)) {
    console.log(`  "${key}" = "${value}"`);
  }
  if (identical.length > 30) console.log(`  ... and ${identical.length - 30} more`);
}

// Summary
console.log(`\n=== SUMMARY ===`);
console.log(`Total issues: missing=${missingInEn.length} orphaned=${orphaned.length} empty=${empty.length} residualCN=${residual.length} placeholderMismatch=${mismatches.length} identical=${identical.length}`);
