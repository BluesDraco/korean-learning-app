// 把 narrate.mjs 生成的 sidecar 精确时间戳 + audioUrl 回填进 radioData.ts。
//
// narrate.mjs 逐句合成时按 PCM 字节精确算出每句 start/end（1:1 对应字幕句，
// 不是占比投影，无需 whisper）。sidecar 在 D:/radio-tts-poc/out-narrate/{id}.json，
// 结构：{ id, program, duration, times:[{start,end}, ...] }（times 顺序=字幕句顺序）。
//
// 本脚本：对每个有 sidecar + 磁盘有 mp3 的期，
//   ① 回填 audioUrl（若为空）
//   ② 用 sidecar times 覆盖该期 subtitles 的 start/end
// 校验 times 条数 == 该期字幕句数，不等则跳过并报警（防止错位）。
//
// 用法：
//   node scripts/radio-narrate-writeback.mjs --dry-run   # 预演
//   node scripts/radio-narrate-writeback.mjs             # 实写
//   加 --prog=squirrel-morning 只处理某档
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const progArg = args.find((a) => a.startsWith('--prog='));
const onlyProg = progArg ? progArg.slice('--prog='.length) : null;

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dataFile = join(root, 'src/lib/server/radioData.ts');
const SIDE_DIR = 'D:/radio-tts-poc/out-narrate';
const AUDIO_ROOT = join(root, 'public/audio/radio');

let src = readFileSync(dataFile, 'utf8');

const idRe = /id:\s*'([^']+)'/g;
const marks = [];
let m;
while ((m = idRe.exec(src))) marks.push({ id: m[1], at: m.index });

let processed = 0, skipped = 0, filledUrl = 0;
const report = [];
const warns = [];

// 从后往前，避免偏移错乱
for (let i = marks.length - 1; i >= 0; i--) {
  const id = marks[i].id;
  const prog = id.replace(/-d\d+$/, '');
  if (onlyProg && prog !== onlyProg) continue;

  const sidePath = join(SIDE_DIR, id + '.json');
  const mp3Path = join(AUDIO_ROOT, prog, id + '.mp3');
  if (!existsSync(sidePath) || !existsSync(mp3Path)) { skipped++; continue; }

  const side = JSON.parse(readFileSync(sidePath, 'utf8'));
  const times = side.times || [];

  const start = marks[i].at;
  const end = i + 1 < marks.length ? marks[i + 1].at : src.length;
  let block = src.slice(start, end);

  const subStart = block.indexOf('subtitles:');
  const subEnd = block.indexOf('vocab:');
  if (subStart < 0 || subEnd < 0) { skipped++; continue; }
  const seg = block.slice(subStart, subEnd);

  // 定位每句 ko 及其对象起点
  const koRe = /ko:\s*'((?:[^'\\]|\\.)*)'/g;
  const koPositions = [];
  let k;
  while ((k = koRe.exec(seg))) koPositions.push(k.index);
  if (koPositions.length !== times.length) {
    warns.push(`⚠️ ${id}: 字幕${koPositions.length}句 ≠ sidecar${times.length}时刻，跳过防错位`);
    skipped++;
    continue;
  }

  // ① audioUrl 回填（仅当空）
  const wantUrl = `/audio/radio/${prog}/${id}.mp3`;
  const urlM = block.match(/audioUrl:\s*'([^']*)'/);
  if (urlM && urlM[1].trim().length === 0) {
    block = block.replace(/audioUrl:\s*'[^']*'/, `audioUrl: '${wantUrl}'`);
    filledUrl++;
  }

  // ② 覆盖 start/end（重取 seg，因 audioUrl 替换可能移位）
  const subStart2 = block.indexOf('subtitles:');
  const subEnd2 = block.indexOf('vocab:');
  let newSeg = block.slice(subStart2, subEnd2);
  const koPos2 = [];
  koRe.lastIndex = 0;
  while ((k = koRe.exec(newSeg))) koPos2.push(k.index);
  for (let j = times.length - 1; j >= 0; j--) {
    const koPos = koPos2[j];
    const objStart = newSeg.lastIndexOf('{', koPos);
    const objSlice = newSeg.slice(objStart, koPos);
    const replaced = objSlice
      .replace(/start:\s*[\d.]+/, `start: ${times[j].start}`)
      .replace(/end:\s*[\d.]+/, `end: ${times[j].end}`);
    newSeg = newSeg.slice(0, objStart) + replaced + newSeg.slice(koPos);
  }

  report.push(`${id}: ${times.length}句, 音频${side.duration}s, 末句end=${times[times.length - 1].end}`);
  processed++;

  if (!dryRun) {
    block = block.slice(0, subStart2) + newSeg + block.slice(subEnd2);
    src = src.slice(0, start) + block + src.slice(end);
  }
}

if (warns.length) console.log(warns.join('\n') + '\n');
if (dryRun) {
  console.log(`[预演] 将回填 ${processed} 期(其中 ${filledUrl} 期补 audioUrl)，跳过 ${skipped} 期。`);
  console.log(report.reverse().join('\n'));
  console.log('\n未写入。确认无误后去掉 --dry-run 实写。');
} else {
  writeFileSync(dataFile, src, 'utf8');
  console.log(`已回填 ${processed} 期(补 audioUrl ${filledUrl} 期)，跳过 ${skipped} 期。`);
}
