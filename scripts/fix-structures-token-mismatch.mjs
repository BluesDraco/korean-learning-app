// scripts/fix-structures-token-mismatch.mjs
// structures.tokens 里 text 字段被误改成中文，应该和 structures.ko 一致（韩文）
// 自动还原：把中文术语在 token text 内回滚为韩文

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');

// 中文→韩文术语映射
const TERMS = [
  ['动词/形容词', '동사/형용사'],
  ['动词词干', '동사 어간'],
  ['形容词词干', '형용사 어간'],
  ['动词', '동사'],
  ['形容词', '형용사'],
  ['名词', '명사'],
  ['副词', '부사'],
  ['冠词形', '관형형'],
  ['（有收音）', '(받침O)'],
  ['（无收音/ㄹ）', '(받침X/ㄹ)'],
  ['（无收音）', '(받침X)'],
  ['词干', '어간'],
  ['想法', '생각'],
  ['例句', '예시'],
  ['追加', '추가'],
  ['添加了', '추가했습니다'],
  ['越知道越更有趣', '알면 알수록 더 재미있어요'],
];

const TARGETS = ['p4','p5','p6','p9','p10','p11','p12','p13','p14'];

let total = 0;
for (const part of TARGETS) {
  const file = path.join(dataDir, `grammar-cards-${part}.ts`);
  let src = readFileSync(file, 'utf8');

  // 只处理 wordBlocks 和 structures tokens 内的 text 字段
  // 行格式：{ text: '...', role: '...' }
  let count = 0;
  src = src.replace(/(\{\s*text:\s*')([^']*)('\s*,\s*role:\s*'[^']+'\s*\})/g, (m, pre, text, suf) => {
    let newText = text;
    for (const [zh, ko] of TERMS) {
      newText = newText.split(zh).join(ko);
    }
    if (newText !== text) count++;
    return pre + newText + suf;
  });

  if (count > 0) {
    writeFileSync(file, src);
    console.log(`${part}: ${count} token texts fixed`);
    total += count;
  }
}

console.log(`\nTotal: ${total} token texts fixed`);
