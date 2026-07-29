// 平衡单份卷的答案位置分布，使 correctIdx 尽量均匀（每档约 1/4）。
// 做法：逐题重排 options 顺序并同步更新 correctIdx；同步：
//   - picture 题：options 带圈号前缀 + 并行 imageDescriptions，重排后重新编号前缀、图描述跟随。
//   - explanation 里引用的圈号（①②③④）按"旧位置→新位置"映射重写，保证解析序号仍指向同一选项。
// 只动数组顺序、前缀数字、解析里的圈号；绝不改韩语/中文文本本身。
// 用法: node scripts/topik-rebalance-answers.mjs E15-I [E13-I ...] | --all [--dry]

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QDIR = path.join(__dirname, '..', 'public/data/topik/questions');

const CIRCLED = ['①', '②', '③', '④']; // ①②③④
const CIRCLED_RE = /[①②③④]/g;

function makeRng(seed) {
  let s = 0;
  for (const c of seed) s = (s * 31 + c.charCodeAt(0)) >>> 0;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function hasCircledPrefix(opt) {
  return CIRCLED.includes(opt.trim()[0]);
}
function stripPrefix(opt) {
  const t = opt.trim();
  return CIRCLED.includes(t[0]) ? t.slice(1).trim() : t;
}

function assignTargets(n, rng) {
  const per = Math.floor(n / 4);
  const rem = n % 4;
  const quota = [per, per, per, per];
  for (let i = 0; i < rem; i++) quota[i]++;
  const targets = [];
  for (let i = 0; i < n; i++) {
    const max = Math.max(...quota);
    const cands = [];
    for (let k = 0; k < 4; k++) if (quota[k] === max) cands.push(k);
    const pick = cands[Math.floor(rng() * cands.length)];
    targets.push(pick);
    quota[pick]--;
  }
  for (let i = targets.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [targets[i], targets[j]] = [targets[j], targets[i]];
  }
  return targets;
}

function rebalanceFile(base, dry) {
  const file = path.join(QDIR, base + '.json');
  if (!fs.existsSync(file)) { console.log('跳过（不存在）: ' + base); return; }
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const rng = makeRng(base);

  const before = [0, 0, 0, 0];
  data.forEach(q => before[q.correctIdx]++);

  const targets = assignTargets(data.length, rng);

  data.forEach((q, qi) => {
    const target = targets[qi];
    const isPicture = q.options.some(hasCircledPrefix);
    const bare = q.options.map(stripPrefix);
    const imgs = Array.isArray(q.imageDescriptions) ? q.imageDescriptions.slice() : null;

    const items = bare.map((txt, i) => ({
      txt,
      img: imgs ? imgs[i] : null,
      oldIdx: i,
      correct: i === q.correctIdx,
    }));

    const correctItem = items.find(it => it.correct);
    const others = items.filter(it => !it.correct);
    for (let i = others.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [others[i], others[j]] = [others[j], others[i]];
    }
    const arranged = [];
    let oi = 0;
    for (let slot = 0; slot < 4; slot++) {
      if (slot === target) arranged.push(correctItem);
      else arranged.push(others[oi++]);
    }

    // 旧下标 -> 新下标
    const oldToNew = {};
    arranged.forEach((it, newIdx) => { oldToNew[it.oldIdx] = newIdx; });

    if (isPicture) {
      q.options = arranged.map((it, i) => CIRCLED[i] + it.txt);
      if (imgs) q.imageDescriptions = arranged.map(it => it.img);
    } else {
      q.options = arranged.map(it => it.txt);
    }
    q.correctIdx = target;

    // 重写解析里的圈号（/g replace 不重扫替换结果，不会连锁误替）
    if (typeof q.explanation === 'string') {
      q.explanation = q.explanation.replace(CIRCLED_RE, ch =>
        CIRCLED[oldToNew[CIRCLED.indexOf(ch)]]
      );
    }
    // testPoint 里若也有圈号一并重写
    if (typeof q.testPoint === 'string') {
      q.testPoint = q.testPoint.replace(CIRCLED_RE, ch =>
        CIRCLED[oldToNew[CIRCLED.indexOf(ch)]]
      );
    }
  });

  const after = [0, 0, 0, 0];
  data.forEach(q => after[q.correctIdx]++);

  console.log(base + ': [' + before.join('/') + '] -> [' + after.join('/') + ']' + (dry ? ' (dry)' : ''));
  if (!dry) fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

const args = process.argv.slice(2);
const dry = args.includes('--dry');
let targets = args.filter(a => !a.startsWith('--'));
if (args.includes('--all')) {
  targets = fs.readdirSync(QDIR).filter(f => /^E\d+-I{1,2}\.json$/.test(f)).map(f => f.replace('.json', ''));
}
if (targets.length === 0) { console.error('用法: node scripts/topik-rebalance-answers.mjs E15-I [...] | --all [--dry]'); process.exit(2); }
for (const t of targets) rebalanceFile(t, dry);
