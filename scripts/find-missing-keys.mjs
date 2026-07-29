// Scan all code for t() keys and find which are missing from zh.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Extract all keys from zh.ts
const zhRaw = fs.readFileSync(path.resolve(projectRoot, 'src/locales/zh.ts'), 'utf-8');
const zhKeys = new Set();
const keyRe = /^\s{2}['"]((?:[^'\\]|\\.)*)['"]\s*:/gm;
let m;
while ((m = keyRe.exec(zhRaw)) !== null) {
  zhKeys.add(m[1].replace(/\\'/g, "'").replace(/\\"/g, '"'));
}
console.log(`zh.ts keys: ${zhKeys.size}`);

// Walk directories and find t() calls
function walkDir(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory() && !e.name.startsWith('.') && e.name !== 'node_modules') {
      files.push(...walkDir(full));
    } else if (e.isFile() && /\.(tsx|ts)$/.test(e.name) && !e.name.endsWith('.d.ts')) {
      files.push(full);
    }
  }
  return files;
}

const srcDirs = ['src/app', 'src/components', 'src/lib'];
// Exclude admin pages
const usedKeys = new Set();
const keySourceMap = new Map(); // key -> [file:line]

for (const dir of srcDirs) {
  const fullDir = path.resolve(projectRoot, dir);
  if (!fs.existsSync(fullDir)) continue;
  const files = walkDir(fullDir);
  for (const file of files) {
    if (file.includes('\\admin\\') || file.includes('\\locales\\')) continue;
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Match t('key', ...) or t("key", ...)
      const re = /\bt\s*\(\s*['"]([^'"]+)['"]/g;
      let tm;
      while ((tm = re.exec(line)) !== null) {
        const key = tm[1];
        // Skip dynamic keys (contain ${})
        if (key.includes('${')) continue;
        usedKeys.add(key);
        if (!keySourceMap.has(key)) {
          keySourceMap.set(key, `${file}:${i + 1}`);
        }
      }
    }
  }
}

console.log(`Unique t() keys in code: ${usedKeys.size}`);

// Find keys used in code but missing from zh.ts
const missing = [...usedKeys].filter(k => !zhKeys.has(k)).sort();
console.log(`\n=== Missing from zh.ts: ${missing.length} ===`);
for (const k of missing) {
  console.log(`  ${k}  (${keySourceMap.get(k)})`);
}

// Save to file for bulk processing
const outPath = path.resolve(projectRoot, 'scripts/missing-keys.txt');
fs.writeFileSync(outPath, missing.join('\n'), 'utf-8');
console.log(`\nSaved to ${outPath}`);
