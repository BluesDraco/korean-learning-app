// 把 narrate sidecar 的精确时间戳回填到 reading-new.ts 每篇 audioTimings。
//
// sidecar（D:/radio-tts-poc/out-reading/{id}.json）由 reading-narrate.mjs 合成 mp3 时
// 用字节精确算出，与 mp3 同源、逐句精确对齐（无需 whisper 投影）。格式：
//   { id, duration, times: [{start,end}, ...] }  —— times 顺序 = sentences 顺序。
// 只回填 times 句数 == 当前 sentences 句数的文章（防止旧 sidecar 对不上新文本）。
//
// 用法：
//   预演：node scripts/reading-align-timings.mjs --dry-run
//   实写：node scripts/reading-align-timings.mjs
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataFile = join(root, 'src/data/reading-new.ts');
const SIDE = 'D:/radio-tts-poc/out-reading';

let src = readFileSync(dataFile, 'utf8');

// article-level id：id 行后 3 行内出现 title:（排除 sentence 的 'sN' id）
const lines = src.split('\n');
const lineOff = []; { let o = 0; for (const ln of lines) { lineOff.push(o); o += ln.length + 1; } }
const marks = [];
for (let li = 0; li < lines.length; li++) {
  const mm = lines[li].match(/^(\s*)id:\s*['"]([^'"]+)['"],?\s*$/);
  if (!mm) continue;
  if (/\btitle:/.test(lines.slice(li + 1, li + 4).join('\n'))) marks.push({ id: mm[2], indent: mm[1], at: lineOff[li] });
}

let processed = 0, skipped = 0, mismatch = 0;
const report = [], warns = [];

for (let i = marks.length - 1; i >= 0; i--) {
  const id = marks[i].id;
  const start = marks[i].at;
  const end = i + 1 < marks.length ? marks[i + 1].at : src.length;
  let block = src.slice(start, end);

  if (!/audioUrl:/.test(block)) continue;

  const sfile = join(SIDE, id + '.json');
  if (!existsSync(sfile)) { skipped++; continue; }
  // 只回填：今天(07-29)重录过的 sidecar，或本就对得上的 story-a1（已浏览器验证）。
  // 旧 sidecar（对应旧 mp3）不回填，否则高亮会飘。
  const sday = statSync(sfile).mtime.toISOString().slice(0, 10);
  const isFresh = sday === '2026-07-29';
  const isA1 = id.startsWith('story-a1-');
  if (!isFresh && !isA1) { skipped++; continue; }
  const side = JSON.parse(readFileSync(sfile, 'utf8'));
  const times = side.times || [];
  if (times.length === 0) { skipped++; continue; }

  // 数当前 sentences 句数，必须与 sidecar times 一致，否则跳过（旧 sidecar 对不上）
  const sentStart = block.indexOf('sentences:');
  if (sentStart < 0) { skipped++; continue; }
  let sentEnd = block.length;
  for (const key of ['quiz:', 'keySentence:', 'outputTask:', 'coreWords:', 'audioUrl:']) {
    const p = block.indexOf(key, sentStart); if (p > sentStart && p < sentEnd) sentEnd = p;
  }
  const seg = block.slice(sentStart, sentEnd);
  const koRe = /ko:\s*(['"])((?:(?!\1)[^\\]|\\.)*)\1/g;
  let cnt = 0; while (koRe.exec(seg)) cnt++;
  if (cnt !== times.length) {
    warns.push(`⚠ ${id}: 当前${cnt}句 vs sidecar${times.length}句，跳过（需重录该篇）`);
    mismatch++; continue;
  }

  const r2 = (x) => Math.round(x * 100) / 100;
  const timingsStr = 'audioTimings: [' +
    times.map((t) => `{ start: ${r2(t.start)}, end: ${r2(t.end)} }`).join(', ') + '],';

  // 已有 audioTimings 则替换，否则在 audioUrl 行后插入
  const auMatch = block.match(/\n(\s*)audioUrl:[^\n]*\n/);
  if (!auMatch) { skipped++; continue; }
  const indent = auMatch[1];
  let newBlock;
  if (/audioTimings:/.test(block)) {
    newBlock = block.replace(/audioTimings:\s*\[[^\]]*\],?/, timingsStr);
  } else {
    const insertPos = auMatch.index + auMatch[0].length;
    newBlock = block.slice(0, insertPos) + indent + timingsStr + '\n' + block.slice(insertPos);
  }

  report.push(`${id}: ${times.length}句 音频${side.duration}s`);
  processed++;
  if (!dryRun) src = src.slice(0, start) + newBlock + src.slice(end);
}

if (warns.length) console.log('\n' + warns.join('\n') + '\n');
if (dryRun) {
  console.log(`[预演] 将回填 ${processed} 篇，句数不符跳过 ${mismatch} 篇，无 sidecar 跳过 ${skipped} 篇。`);
  console.log(report.reverse().join('\n'));
  console.log('\n未写入。去 --dry-run 实写。');
} else {
  writeFileSync(dataFile, src, 'utf8');
  console.log(`已回填 ${processed} 篇 audioTimings；句数不符跳过 ${mismatch} 篇，无 sidecar 跳过 ${skipped} 篇。`);
}
