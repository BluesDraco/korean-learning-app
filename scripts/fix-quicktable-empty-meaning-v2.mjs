// scripts/fix-quicktable-empty-meaning-v2.mjs
// 修剩余 24 处 quickTable 空"意思/用法"列
// 放宽正则：只要第3列 zh 有内容、第4列 ko/zh 都空，就把第3列的 zh 移到第4列 ko

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');

const TARGETS = ['p9', 'p10', 'p11', 'p12'];

let totalFixed = 0;

for (const part of TARGETS) {
  const file = path.join(dataDir, `grammar-cards-${part}.ts`);
  const src = readFileSync(file, 'utf8');

  // 通用：四列 row，第3列 zh 非空，第4列 ko/zh 全空
  // [{ ko: '...', zh: '...' }, { ko: '...', zh: '...' }, { ko: '...', zh: 'CHN' }, { ko: '', zh: '' }],
  const re = /(\[\{ ko: '[^']*', zh: '[^']*' \}, \{ ko: '[^']*', zh: '[^']*' \}, \{ ko: '([^']*)', zh: ')([^']+)(' \}, \{ ko: ')('(?:, zh: '')?)( \}\])/g;

  // 注意上面正则结构不对，简单分步处理：
  // 用更直观的实现 - line by line
  const lines = src.split('\n');
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    // 找四列 row 数据行
    const m = ln.match(/^(\s*)\[\{ ko: '([^']*)', zh: '([^']*)' \}, \{ ko: '([^']*)', zh: '([^']*)' \}, \{ ko: '([^']*)', zh: '([^']*)' \}, \{ ko: '', zh: '' \}\],?(\s*)$/);
    if (!m) continue;
    const [, indent, k0, z0, k1, z1, k2, z2, trail] = m;
    if (!z2) continue; // 第3列 zh 空 → 跳
    // 把第3列 zh 移到第4列 ko，第3列 zh 清空
    lines[i] = `${indent}[{ ko: '${k0}', zh: '${z0}' }, { ko: '${k1}', zh: '${z1}' }, { ko: '${k2}', zh: '' }, { ko: '${z2}', zh: '' }],${trail || ''}`;
    count++;
  }

  if (count > 0) {
    writeFileSync(file, lines.join('\n'));
    console.log(`${part}: ${count} rows fixed (v2)`);
    totalFixed += count;
  }
}

console.log(`Total v2: ${totalFixed} rows fixed`);
