// scripts/remove-empty-quicktable.mjs
// 删除综合练习卡上的空 quickTable
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');

const files = ['grammar-cards-p12.ts', 'grammar-cards-p13.ts', 'grammar-cards-p14.ts'];

let total = 0;
for (const fname of files) {
  const file = path.join(dataDir, fname);
  let src = readFileSync(file, 'utf8');

  // 匹配空 quickTable 块（多种格式）
  // 1) quickTable: { title: '', headers: [], rows: [], },
  // 2) quickTable: {\n      title: '',\n      headers: [],\n      rows: [],\n    },
  const patterns = [
    /\s*quickTable: \{\s*title: '',\s*headers: \[\],\s*rows: \[\],?\s*\},?\n/g,
  ];
  let count = 0;
  for (const re of patterns) {
    src = src.replace(re, (m) => { count++; return '\n'; });
  }
  if (count > 0) {
    writeFileSync(file, src);
    console.log(`${fname}: ${count} empty quickTable removed`);
    total += count;
  }
}

console.log(`Total: ${total} empty quickTables removed`);
