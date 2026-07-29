// 回填 radioData.ts 的 audioUrl。TTS 音频放好后运行。
//
// 【本地方案】音频放在 public/audio/radio/{档}/{id}.mp3，
//   按 episode id 前缀自动归档，生成的 URL 形如：
//     /audio/radio/squirrel-morning/squirrel-morning-d1.mp3
//   （public/ 下的文件，站点根路径直接可访问，无需前缀）
//
// 用法：
//   预演（不写文件，只列将填哪些 + 校验音频是否存在）：
//     node scripts/radio-fill-audio.mjs --dry-run
//   实填：
//     node scripts/radio-fill-audio.mjs
//   自定义扩展名（默认 .mp3）：加 --ext=.wav
//
// 只填当前 audioUrl 为空('')的期；已填的不覆盖（可重复安全运行）。
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const extArg = args.find((a) => a.startsWith('--ext='));
const ext = extArg ? extArg.slice('--ext='.length) : '.mp3';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataFile = join(root, 'src/lib/server/radioData.ts');
const audioRoot = join(root, 'public/audio/radio');
let src = readFileSync(dataFile, 'utf8');

// id 形如 {program}-d{n}，program = 除去最后 "-d数字" 的部分，即所属档子文件夹
function programOf(id) {
  const mm = id.match(/^(.*)-d\d+$/);
  return mm ? mm[1] : id;
}
// 站点根相对 URL（public/ 下文件的公开路径）
function urlOf(id) {
  return `/audio/radio/${programOf(id)}/${id}${ext}`;
}
// 磁盘路径（用于校验文件是否已放好）
function diskPathOf(id) {
  return join(audioRoot, programOf(id), `${id}${ext}`);
}

// 按 id 锚点把源码切成每期一块（与 radio-extract-tts.mjs 同法，已验证 56 期）
const idRe = /id:\s*'([^']+)'/g;
const marks = [];
let m;
while ((m = idRe.exec(src))) marks.push({ id: m[1], at: m.index });

let filled = 0;
let already = 0;
let missing = 0;
const plan = [];
// 从后往前替换，避免位移影响前面块的绝对偏移
for (let i = marks.length - 1; i >= 0; i--) {
  const start = marks[i].at;
  const end = i + 1 < marks.length ? marks[i + 1].at : src.length;
  const block = src.slice(start, end);
  const rel = block.search(/audioUrl:\s*''/);
  if (rel < 0) {
    if (/audioUrl:\s*'[^']+'/.test(block)) already++;
    continue;
  }
  const id = marks[i].id;
  const url = urlOf(id);
  const exists = existsSync(diskPathOf(id));
  if (!exists) {
    missing++;
    plan.push(`✗缺文件(跳过)  ${id}  ->  ${url}`);
    continue; // 只填磁盘上确实有 mp3 的期，缺文件的保持空 audioUrl（播放器显示占位）
  }
  plan.push(`✓  ${id}  ->  ${url}`);
  if (!dryRun) {
    const absStart = start + rel;
    src =
      src.slice(0, absStart) +
      `audioUrl: '${url}'` +
      src.slice(absStart + "audioUrl: ''".length);
  }
  filled++;
}

plan.reverse();
if (dryRun) {
  console.log(`[预演] 将回填 ${filled} 期（磁盘有 mp3）；${already} 期已填跳过；${missing} 期缺文件保持空占位。`);
  console.log(plan.join('\n'));
  console.log('\n未写入文件。✗缺文件的期保持空 audioUrl，补录 mp3 后重跑本脚本会自动补填。去掉 --dry-run 实填。');
} else {
  writeFileSync(dataFile, src, 'utf8');
  console.log(`回填 ${filled} 期 audioUrl（已填 ${already} 期跳过；${missing} 期缺文件保持空占位）。`);
}
