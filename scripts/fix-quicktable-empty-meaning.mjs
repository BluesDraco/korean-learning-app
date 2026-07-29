// scripts/fix-quicktable-empty-meaning.mjs
// 修 P9-P12 的 quickTable："意思/用法" 列 ko 为空，
// 而前一列（"例句"）的 zh 含中文意思 → 移到第4列 ko

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');

const TARGETS = ['p9', 'p10', 'p11', 'p12'];

let totalFixed = 0;

for (const part of TARGETS) {
  const file = path.join(dataDir, `grammar-cards-${part}.ts`);
  let src = readFileSync(file, 'utf8');
  const origLen = src.length;

  // 找形如：
  //   [{ ko: 'X', zh: '' }, { ko: 'Y', zh: '' }, { ko: 'Z', zh: 'CHINESE' }, { ko: '', zh: '' }],
  // 改成：
  //   [{ ko: 'X', zh: '' }, { ko: 'Y', zh: '' }, { ko: 'Z', zh: '' }, { ko: 'CHINESE', zh: '' }],
  const re = /\[\{ ko: '([^']*)', zh: '' \}, \{ ko: '([^']*)', zh: '' \}, \{ ko: '([^']*)', zh: '([^']+)' \}, \{ ko: '', zh: '' \}\]/g;

  let count = 0;
  src = src.replace(re, (_, a, b, c, d) => {
    count++;
    return `[{ ko: '${a}', zh: '' }, { ko: '${b}', zh: '' }, { ko: '${c}', zh: '' }, { ko: '${d}', zh: '' }]`;
  });

  if (count > 0) {
    writeFileSync(file, src);
    console.log(`${part}: ${count} rows fixed`);
    totalFixed += count;
  } else {
    console.log(`${part}: no match`);
  }
}

console.log(`\nTotal: ${totalFixed} rows fixed`);
