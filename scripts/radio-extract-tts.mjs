// 抽取电台 56 期韩语文案 → radio-tts/{id}.txt，供 TTS 合成。
// 去 emoji、去装饰引号，保留标点（TTS 需要断句）。
// 运行：node scripts/radio-extract-tts.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataFile = join(root, 'src/lib/server/radioData.ts');
const outDir = join(root, 'radio-tts');
mkdirSync(outDir, { recursive: true });

const src = readFileSync(dataFile, 'utf8');

// emoji + 变体选择符 + 零宽字符
const EMOJI_RE =
  /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/gu;

function clean(s) {
  return s
    .replace(EMOJI_RE, '')
    .replace(/[""]/g, '') // 装饰引号（TTS 不需要）
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// 逐期解析：抓 id + 该期 subtitles 里的所有 ko:'...'
// 用 id 锚点切块，避免跨期串行
const idRe = /id:\s*'([^']+)'/g;
const blocks = [];
let m;
const marks = [];
while ((m = idRe.exec(src))) marks.push({ id: m[1], at: m.index });
for (let i = 0; i < marks.length; i++) {
  const start = marks[i].at;
  const end = i + 1 < marks.length ? marks[i + 1].at : src.length;
  blocks.push({ id: marks[i].id, text: src.slice(start, end) });
}

// 只保留真正的 episode（有 subtitles 的块）
const koRe = /ko:\s*'((?:[^'\\]|\\.)*)'/g;
let count = 0;
const summary = [];
for (const b of blocks) {
  // 只取 subtitles 段的 ko（排除 vocab[].ko 生词）
  const subStart = b.text.indexOf('subtitles:');
  const subEnd = b.text.indexOf('vocab:');
  const seg =
    subStart >= 0 && subEnd > subStart ? b.text.slice(subStart, subEnd) : '';
  const lines = [];
  let k;
  koRe.lastIndex = 0;
  while ((k = koRe.exec(seg))) {
    const raw = k[1].replace(/\\'/g, "'");
    const line = clean(raw);
    if (line) lines.push(line);
  }
  if (lines.length === 0) continue; // 非 episode 块（如 vocab-only 无 ko 的不会到这）
  // 每句一行，TTS 可整段读、也可逐句对齐时间戳
  const body = lines.join('\n');
  writeFileSync(join(outDir, `${b.id}.txt`), body + '\n', 'utf8');
  summary.push(`${b.id}\t${lines.length}句\t${body.replace(/\n/g, '').length}字`);
  count++;
}

writeFileSync(join(outDir, '_index.txt'), summary.join('\n') + '\n', 'utf8');
console.log(`导出 ${count} 期 → radio-tts/`);
console.log(summary.slice(0, 6).join('\n'));
