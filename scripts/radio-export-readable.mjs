// 导出 56 期文案的可读版（中韩对照 + 生词），供人工审阅。
// 输出：radio-scripts-cn/{id}.txt（每期一份）+ _全部文案.txt（合并版，一个文件看全）
// 运行：node scripts/radio-export-readable.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'radio-scripts-cn');
mkdirSync(outDir, { recursive: true });

const src = readFileSync(join(root, 'src/lib/server/radioData.ts'), 'utf8');

const PROGRAM_CN = {
  'squirrel-morning': '松鼠的早安电台',
  'animal-news': '动物城新闻',
  'bear-night': '熊的夜晚故事',
  'fox-cafe': '狐狸的思辨咖啡馆',
};

// 按 id 锚点切块
const idRe = /id:\s*'([^']+)'/g;
const marks = [];
let m;
while ((m = idRe.exec(src))) marks.push({ id: m[1], at: m.index });

function field(block, key) {
  const r = new RegExp(`${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`);
  const mm = block.match(r);
  return mm ? mm[1].replace(/\\'/g, "'") : '';
}
function num(block, key) {
  const mm = block.match(new RegExp(`${key}:\\s*(\\d+)`));
  return mm ? mm[1] : '';
}

const episodes = [];
for (let i = 0; i < marks.length; i++) {
  const start = marks[i].at;
  const end = i + 1 < marks.length ? marks[i + 1].at : src.length;
  const block = src.slice(start, end);
  const subStart = block.indexOf('subtitles:');
  if (subStart < 0) continue;
  const vocabStart = block.indexOf('vocab:');
  const subSeg = block.slice(subStart, vocabStart > subStart ? vocabStart : undefined);
  const vocabSeg = vocabStart > subStart ? block.slice(vocabStart) : '';

  // 字幕行：抓每个 {..ko:'',zh:''..}
  const lineRe = /ko:\s*'((?:[^'\\]|\\.)*)'\s*,\s*zh:\s*'((?:[^'\\]|\\.)*)'/g;
  const lines = [];
  let s;
  while ((s = lineRe.exec(subSeg))) {
    lines.push({ ko: s[1].replace(/\\'/g, "'"), zh: s[2].replace(/\\'/g, "'") });
  }
  // 生词：{ko,pos,zh,example,exampleZh}
  const vRe = /ko:\s*'((?:[^'\\]|\\.)*)'\s*,\s*pos:\s*'([^']*)'\s*,\s*zh:\s*'((?:[^'\\]|\\.)*)'/g;
  const vocab = [];
  let v;
  while ((v = vRe.exec(vocabSeg))) {
    vocab.push({ ko: v[1], pos: v[2], zh: v[3].replace(/\\'/g, "'") });
  }

  episodes.push({
    id: marks[i].id,
    program: field(block, 'program'),
    day: num(block, 'day'),
    title: field(block, 'title'),
    titleZh: field(block, 'titleZh'),
    host: field(block, 'host'),
    level: field(block, 'level'),
    duration: field(block, 'duration'),
    scheduleTime: field(block, 'scheduleTime'),
    lines,
    vocab,
  });
}

function render(ep) {
  const head =
    `【${PROGRAM_CN[ep.program] || ep.program}】第${ep.day}期  (${ep.id})\n` +
    `${ep.titleZh}  /  ${ep.title}\n` +
    `主持:${ep.host}  ·  ${ep.level}  ·  ${ep.scheduleTime}  ·  时长${ep.duration}\n` +
    '─'.repeat(48) + '\n';
  const koBlock = '【韩文】\n' + ep.lines.map((l) => l.ko).join('\n');
  const zhBlock = '【中文对照】\n' + ep.lines.map((l) => l.zh).join('\n');
  const body = koBlock + '\n\n' + zhBlock;
  const vocab = ep.vocab.length
    ? '\n\n── 本期生词 ──\n' +
      ep.vocab.map((v) => `· ${v.ko} (${v.pos}) ${v.zh}`).join('\n')
    : '';
  return head + body + vocab + '\n';
}

// 按档 + 期号排序
const ORDER = ['squirrel-morning', 'animal-news', 'bear-night', 'fox-cafe'];
episodes.sort((a, b) => {
  const p = ORDER.indexOf(a.program) - ORDER.indexOf(b.program);
  return p !== 0 ? p : Number(a.day) - Number(b.day);
});

for (const ep of episodes) {
  writeFileSync(join(outDir, `${ep.id}.txt`), render(ep), 'utf8');
}
// 合并版
const all = episodes.map(render).join('\n\n' + '='.repeat(48) + '\n\n');
writeFileSync(join(outDir, '_全部文案.txt'), all, 'utf8');

console.log(`导出 ${episodes.length} 期 → radio-scripts-cn/`);
console.log('单期文件 + _全部文案.txt(合并,一个文件看全)');
