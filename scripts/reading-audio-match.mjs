// 判定每篇文章的 mp3 是否与当前文本匹配：
// whisper 转写的「音频实际内容」 vs 当前 reading-new.ts 的整篇 ko 文本，做字符级相似度。
// 相似度高 = mp3 与文本同源，可直接回填 sidecar 时间戳。
// 相似度低 = 文本被改过，mp3 对不上，需 reading-narrate.mjs --force 重录。
//
// 用法：node scripts/reading-audio-match.mjs
import { readFileSync, existsSync, readdirSync } from 'node:fs';

const ALIGN = 'D:/pytools/reading-align';   // whisper 转写 json
const SIDE = 'D:/radio-tts-poc/out-reading'; // narrate 生成的精确时间戳
const CUR = 'src/data/reading-new.ts';

// 归一化：只留韩文/字母/数字，去空格标点大小写
const norm = (s) => (s || '').toLowerCase().match(/[가-힣a-z0-9]/g)?.join('') || '';

// 字符 2-gram Dice 相似度（对措辞小改动稳健，对整篇换文本敏感）
function dice(a, b) {
  if (!a.length && !b.length) return 1;
  if (a.length < 2 || b.length < 2) return a === b ? 1 : 0;
  const grams = (s) => { const m = new Map(); for (let i = 0; i < s.length - 1; i++) { const g = s.slice(i, i + 2); m.set(g, (m.get(g) || 0) + 1); } return m; };
  const ma = grams(a), mb = grams(b);
  let inter = 0;
  for (const [g, c] of ma) if (mb.has(g)) inter += Math.min(c, mb.get(g));
  const total = (a.length - 1) + (b.length - 1);
  return (2 * inter) / total;
}

function parseCur() {
  const src = readFileSync(CUR, 'utf8');
  const lines = src.split('\n');
  const lineOff = []; { let o = 0; for (const ln of lines) { lineOff.push(o); o += ln.length + 1; } }
  const marks = [];
  for (let li = 0; li < lines.length; li++) {
    const m = lines[li].match(/^\s*id:\s*['"]([^'"]+)['"],?\s*$/);
    if (!m) continue;
    if (/\btitle:/.test(lines.slice(li + 1, li + 4).join('\n'))) marks.push({ id: m[1], at: lineOff[li] });
  }
  const map = {};
  for (let i = 0; i < marks.length; i++) {
    const id = marks[i].id;
    const block = src.slice(marks[i].at, i + 1 < marks.length ? marks[i + 1].at : src.length);
    const sentStart = block.indexOf('sentences:');
    if (sentStart < 0) continue;
    let sentEnd = block.length;
    for (const key of ['quiz:', 'keySentence:', 'outputTask:', 'coreWords:', 'audioUrl:']) {
      const p = block.indexOf(key, sentStart); if (p > sentStart && p < sentEnd) sentEnd = p;
    }
    const seg = block.slice(sentStart, sentEnd);
    const koRe = /ko:\s*(['"])((?:(?!\1)[^\\]|\\.)*)\1/g;
    const kos = []; let k;
    while ((k = koRe.exec(seg))) kos.push(k[2].replace(/\\'/g, "'").replace(/\\"/g, '"'));
    map[id] = { kos, hasAudio: /audioUrl:/.test(block), hasTimings: /audioTimings:/.test(block) };
  }
  return map;
}

const cur = parseCur();
const jsons = existsSync(ALIGN) ? readdirSync(ALIGN).filter(f => f.endsWith('.json')) : [];
const MATCH_TH = 0.72; // Dice >= 阈值视为同源

const results = [];
for (const f of jsons) {
  const id = f.replace(/\.json$/, '');
  if (!cur[id]) continue;
  const aln = JSON.parse(readFileSync(`${ALIGN}/${f}`, 'utf8'));
  const heard = norm(aln.segments.map(s => s.text).join(''));
  const text = norm(cur[id].kos.join(''));
  const sim = dice(heard, text);
  results.push({ id, sim: +sim.toFixed(3), heardLen: heard.length, textLen: text.length, hasTimings: cur[id].hasTimings });
}

results.sort((a, b) => a.sim - b.sim);
const bad = results.filter(r => r.sim < MATCH_TH);
const good = results.filter(r => r.sim >= MATCH_TH);

console.log(`已转写 ${results.length} 篇，阈值 Dice>=${MATCH_TH}\n`);
console.log(`=== 对不上（需 --force 重录）: ${bad.length} 篇 ===`);
for (const r of bad) console.log(`  ${r.sim}  ${r.id}  (听到${r.heardLen}字/文本${r.textLen}字)`);
console.log(`\n=== 对得上（可直接回填 sidecar）: ${good.length} 篇 ===`);
for (const r of good) console.log(`  ${r.sim}  ${r.id}${r.hasTimings ? ' [已有timings]' : ''}`);

const pending = Object.keys(cur).filter(id => cur[id].hasAudio && !jsons.includes(id + '.json'));
if (pending.length) console.log(`\n=== 尚未转写 ${pending.length} 篇（等 whisper 跑完）===\n  ${pending.join(', ')}`);
