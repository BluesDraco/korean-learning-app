// 把 whisper 词级时间戳映射到 radioData.ts 每期字幕句边界，写回 start/end。
//
// 原理（v2 词级锚点，替代 v1 字符占比插值）：
// whisper words[] 里每个词都有真实 start/end。把词序列建成「累计字符 -> 该词(start,end)」
// 的锚点表。逐句字幕按字符位置在锚点表里定位：
//   句 start = 覆盖该句首字符的词的真实 word.start
//   句 end   = 覆盖该句末字符的词的真实 word.end
// 关键改动 vs v1：
//   1. 句 end 落在真实词末（语音自然停顿处），不再是插值点 —— 消除单句精读切字漏字。
//   2. 句间不再强制无缝（下句 start = 下句首词真实 start），保留真实停顿，
//      末字不会漏到下一句里。
//   3. 精度保留 0.01s（v1 只到 0.1s，round 抖动最多 ±0.05s）。
// 容错：字幕字符流与 whisper 字符流可能不等长（whisper 漏识/幻觉）。用「累计字符占比」
// 做定位基准而非硬 1:1 消费，长度不等时按比例兜底，避免累积错位。字符差过大的期打警告。
//
// 保证：句0 start=0；末句 end=真实时长；时刻单调递增；每句 end>start。
//
// 用法：
//   预演：node scripts/radio-align-subs.mjs --dry-run
//   实写：node scripts/radio-align-subs.mjs
//   只处理某档：加 --prog=squirrel-morning
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
const ALIGN_DIR = 'D:/pytools/radio-align';

let src = readFileSync(dataFile, 'utf8');

// 只数韩文/字母/数字字符（去空格标点），作为对齐基准
const countChars = (s) => (s.match(/[가-힣a-zA-Z0-9]/g) || []).length;

// id 锚点切块
const idRe = /id:\s*'([^']+)'/g;
const marks = [];
let m;
while ((m = idRe.exec(src))) marks.push({ id: m[1], at: m.index });

// 把 whisper 词序列建成锚点表：每个有效词一条 {cumStart, cumEnd, tStart, tEnd}
// cumStart/cumEnd = 该词在词字符流里的起止累计字符数；tStart/tEnd = 真实时刻。
function buildAnchors(words) {
  const anchors = [];
  let cum = 0;
  for (const w of words) {
    const c = countChars(w.word || '');
    if (c === 0) continue;
    anchors.push({ cumStart: cum, cumEnd: cum + c, tStart: w.start, tEnd: w.end });
    cum += c;
  }
  return { anchors, totalChars: cum };
}

// 给定字符位置 pos（0..totalChars），找覆盖它的词，返回 {tStart, tEnd}。
// pos 落在词区间 [cumStart, cumEnd) 内即命中；越界则取首/末词。
function anchorAt(anchors, totalChars, pos) {
  if (anchors.length === 0) return { tStart: 0, tEnd: 0 };
  if (pos <= 0) return anchors[0];
  if (pos >= totalChars) return anchors[anchors.length - 1];
  for (const a of anchors) {
    if (pos < a.cumEnd) return a;
  }
  return anchors[anchors.length - 1];
}

let processed = 0;
let skipped = 0;
const report = [];
const warns = [];

// 从后往前替换，避免偏移错乱
for (let i = marks.length - 1; i >= 0; i--) {
  const id = marks[i].id;
  const prog = id.replace(/-d\d+$/, '');
  if (onlyProg && prog !== onlyProg) continue;

  const start = marks[i].at;
  const end = i + 1 < marks.length ? marks[i + 1].at : src.length;
  let block = src.slice(start, end);

  const jsonPath = join(ALIGN_DIR, id + '.json');
  if (!existsSync(jsonPath)) { skipped++; continue; }

  const aln = JSON.parse(readFileSync(jsonPath, 'utf8'));
  const duration = aln.duration;
  const { anchors, totalChars } = buildAnchors(aln.words || []);
  if (anchors.length === 0) { skipped++; continue; }

  // 抓 subtitles 段（vocab 之前）里的每句 ko
  const subStart = block.indexOf('subtitles:');
  const subEnd = block.indexOf('vocab:');
  if (subStart < 0 || subEnd < 0) { skipped++; continue; }
  const seg = block.slice(subStart, subEnd);
  const koRe = /ko:\s*'((?:[^'\\]|\\.)*)'/g;
  const kos = [];
  let k;
  while ((k = koRe.exec(seg))) kos.push(k[1].replace(/\\'/g, "'"));
  if (kos.length === 0) { skipped++; continue; }

  // 每句字符数 → 字幕字符流里的累计边界
  const lens = kos.map(countChars);
  const subTotal = lens.reduce((a, b) => a + b, 0) || 1;

  // 字符流长度差异告警（whisper 漏识/幻觉）：占比>15% 记警告，仍按比例对齐兜底
  const diff = Math.abs(subTotal - totalChars);
  if (subTotal > 0 && diff / subTotal > 0.15) {
    warns.push(`⚠ ${id}: 字幕${subTotal}字 vs whisper${totalChars}字 差${subTotal - totalChars}（>15%，边界可能偏移，建议人工核验）`);
  }

  // 逐句：把字幕字符位置按比例映射到 whisper 字符流，取真实词边界时刻
  // 句 j 覆盖字幕字符 [cumBefore, cumBefore+lens[j])
  const times = []; // [{s, e}]
  let cumBefore = 0;
  for (let j = 0; j < kos.length; j++) {
    const charStart = cumBefore;
    const charEnd = cumBefore + lens[j];
    cumBefore = charEnd;
    // 映射到 whisper 字符流位置（长度不等时按比例）
    const scale = totalChars / subTotal;
    const wStart = charStart * scale;
    const wEnd = charEnd * scale;
    const aStart = anchorAt(anchors, totalChars, wStart);
    // 句末：取覆盖 (wEnd-1) 的词末，即该句最后一个字所在词的真实结束时刻
    const aEnd = anchorAt(anchors, totalChars, Math.max(wStart, wEnd - 0.5));
    times.push({ s: aStart.tStart, e: aEnd.tEnd });
  }

  // 首句 start=0
  times[0].s = 0;

  // 单调 & 每句 end>start（至少 0.2s）。不强制句间无缝，但保证不倒退。
  // 同时把任何越界(超 duration)的时刻钳回，防止字符差大的期末尾多句挤爆音频尾部。
  for (let j = 0; j < times.length; j++) {
    if (times[j].s > duration) times[j].s = duration;
    if (times[j].e > duration) times[j].e = duration;
    if (j > 0 && times[j].s < times[j - 1].e - 0.05) {
      // 允许句间轻微重叠(词边界误差)，但明显倒退则拉回上句 end
      times[j].s = Math.max(times[j].s, times[j - 1].e - 0.05);
    }
    // 保证 end>start，但绝不超过 duration（尾部多句挤爆时宁可 start 前移）
    if (times[j].e < times[j].s + 0.2) {
      times[j].e = Math.min(duration, times[j].s + 0.2);
      if (times[j].s > times[j].e - 0.05) times[j].s = times[j].e - 0.05;
    }
  }
  // 末句 end 收到真实时长；start 取「计算值」与「上句 end」的较大者，避免倒退，
  // 但不低于 e-0.2 也不越过 e（退化期尾部多句挤压时保证仍单调、end>start）。
  const last = times.length - 1;
  times[last].e = duration;
  const prevE = last > 0 ? times[last - 1].e : 0;
  times[last].s = Math.min(Math.max(times[last].s, prevE), times[last].e - 0.05);
  if (times[last].s < 0) times[last].s = 0;

  const r2 = (x) => Math.round(x * 100) / 100; // 0.01s

  // 逐句替换 { start: X, end: Y, ko: '...' } 里的 start/end
  let newSeg = seg;
  koRe.lastIndex = 0;
  const koPositions = [];
  while ((k = koRe.exec(seg))) koPositions.push(k.index);
  for (let j = kos.length - 1; j >= 0; j--) {
    const koPos = koPositions[j];
    const objStart = newSeg.lastIndexOf('{', koPos);
    const objSlice = newSeg.slice(objStart, koPos);
    const s = r2(times[j].s);
    const e = r2(times[j].e);
    const replaced = objSlice
      .replace(/start:\s*[\d.]+/, `start: ${s}`)
      .replace(/end:\s*[\d.]+/, `end: ${e}`);
    newSeg = newSeg.slice(0, objStart) + replaced + newSeg.slice(koPos);
  }

  report.push(`${id}: ${kos.length}句 音频${duration.toFixed(1)}s 末end=${r2(times[times.length - 1].e)}`);
  processed++;

  if (!dryRun) {
    block = block.slice(0, subStart) + newSeg + block.slice(subEnd);
    src = src.slice(0, start) + block + src.slice(end);
  }
}

if (warns.length) {
  console.log('\n' + warns.join('\n') + '\n');
}
if (dryRun) {
  console.log(`[预演] 将对齐 ${processed} 期，跳过 ${skipped} 期（无 json）。`);
  console.log(report.reverse().join('\n'));
  console.log('\n未写入。确认无误后去掉 --dry-run 实写。');
} else {
  writeFileSync(dataFile, src, 'utf8');
  console.log(`已对齐 ${processed} 期字幕时间戳，跳过 ${skipped} 期。`);
}
