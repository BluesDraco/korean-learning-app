// 边转写边重录：轮询 whisper 输出，每篇转写完就判 mp3 是否与当前文本同源；
// 对不上（Dice<0.72）的立即按当前文本 --force 重录 mp3+新 sidecar。
// whisper 后台继续跑，本脚本独立轮询直到 65 篇（有音频、非已匹配）全判完。
//
// 用法：node scripts/reading-rerecord-watch.mjs
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const ALIGN = 'D:/pytools/reading-align';
const NARRATE_DIR = 'D:/radio-tts-poc';
const CUR = 'src/data/reading-new.ts';
const MATCH_TH = 0.72;

const norm = (s) => (s || '').toLowerCase().match(/[가-힣a-z0-9]/g)?.join('') || '';
function dice(a, b) {
  if (!a.length && !b.length) return 1;
  if (a.length < 2 || b.length < 2) return a === b ? 1 : 0;
  const grams = (s) => { const m = new Map(); for (let i = 0; i < s.length - 1; i++) { const g = s.slice(i, i + 2); m.set(g, (m.get(g) || 0) + 1); } return m; };
  const ma = grams(a), mb = grams(b);
  let inter = 0; for (const [g, c] of ma) if (mb.has(g)) inter += Math.min(c, mb.get(g));
  return (2 * inter) / ((a.length - 1) + (b.length - 1));
}
function parseCur() {
  const src = readFileSync(CUR, 'utf8');
  const lines = src.split('\n'); const off = []; { let o = 0; for (const l of lines) { off.push(o); o += l.length + 1; } }
  const marks = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s*id:\s*['"]([^'"]+)['"],?\s*$/); if (!m) continue;
    if (/\btitle:/.test(lines.slice(i + 1, i + 4).join('\n'))) marks.push({ id: m[1], at: off[i] });
  }
  const map = {};
  for (let i = 0; i < marks.length; i++) {
    const id = marks[i].id;
    const b = src.slice(marks[i].at, i + 1 < marks.length ? marks[i + 1].at : src.length);
    const ss = b.indexOf('sentences:'); if (ss < 0) continue;
    let se = b.length; for (const k of ['quiz:', 'keySentence:', 'outputTask:', 'coreWords:', 'audioUrl:']) { const p = b.indexOf(k, ss); if (p > ss && p < se) se = p; }
    const seg = b.slice(ss, se); const re = /ko:\s*(['"])((?:(?!\1)[^\\]|\\.)*)\1/g; const kos = []; let k;
    while ((k = re.exec(seg))) kos.push(k[2].replace(/\\'/g, "'").replace(/\\"/g, '"'));
    map[id] = { kos, hasAudio: /audioUrl:/.test(b) };
  }
  return map;
}

const cur = parseCur();
// 目标集合：有音频的文章（含已转写、待转写）
const targets = Object.keys(cur).filter((id) => cur[id].hasAudio);
console.log(`目标 ${targets.length} 篇（有音频）。轮询 whisper 输出，判定+即时重录…\n`);

const judged = new Set();
const rerecorded = [], matched = [];
const startTime = Date.now();

function rerecord(id) {
  console.log(`  🔴 ${id} 对不上 → 立即重录…`);
  const r = spawnSync('node', ['reading-narrate.mjs', '--force', id], { cwd: NARRATE_DIR, encoding: 'utf8', timeout: 15 * 60 * 1000 });
  const ok = r.status === 0 && existsSync(`${NARRATE_DIR}/out-reading/${id}.json`);
  console.log(ok ? `  ✅ ${id} 重录完成` : `  ❌ ${id} 重录失败: ${(r.stderr || r.stdout || '').slice(-200)}`);
  return ok;
}

function pass() {
  const files = existsSync(ALIGN) ? readdirSync(ALIGN).filter((f) => f.endsWith('.json')) : [];
  for (const f of files) {
    const id = f.replace(/\.json$/, '');
    if (judged.has(id) || !cur[id]) continue;
    let aln;
    try { aln = JSON.parse(readFileSync(`${ALIGN}/${f}`, 'utf8')); } catch { continue; } // 半写入，下轮再判
    if (!aln.segments) continue;
    judged.add(id);
    const heard = norm(aln.segments.map((s) => s.text).join(''));
    const text = norm(cur[id].kos.join(''));
    const sim = dice(heard, text);
    if (sim < MATCH_TH) {
      const ok = rerecord(id);
      rerecorded.push({ id, sim: +sim.toFixed(3), ok });
    } else {
      matched.push({ id, sim: +sim.toFixed(3) });
      console.log(`  🟢 ${id} 对得上 (${sim.toFixed(3)})，用现成时间戳`);
    }
  }
}

const timer = setInterval(() => {
  pass();
  const done = targets.filter((id) => judged.has(id)).length;
  if (done >= targets.length) {
    clearInterval(timer);
    const mins = ((Date.now() - startTime) / 60000).toFixed(1);
    console.log(`\n=== 全部判完 ${done}/${targets.length}（${mins}分）===`);
    console.log(`对得上（免费回填）: ${matched.length} 篇`);
    console.log(`重录: ${rerecorded.length} 篇（成功 ${rerecorded.filter((r) => r.ok).length}）`);
    const failed = rerecorded.filter((r) => !r.ok);
    if (failed.length) console.log(`⚠️ 重录失败: ${failed.map((r) => r.id).join(', ')}`);
    console.log(`\n下一步：node scripts/reading-align-timings.mjs --dry-run（回填所有 sidecar 到 audioTimings）`);
  }
}, 8000);
