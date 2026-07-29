// 给 questions.json 回填 examRound / questionType / groupId 字段
// 只在 T 开头的真题上跑，专项练习库（BL/ML/AL/BR/MR/AR）不动
import fs from 'fs';

const QPATH = 'C:/Users/Administrator/Desktop/korean-learning-app/public/data/topik/questions.json';

// TOPIK I 听力题型映射（题号 → questionType）
const I_LISTENING_MAP = [
  { range: [1, 4],   type: 'I-L-response',         group: null },
  { range: [5, 6],   type: 'I-L-followup',         group: null },
  { range: [7, 10],  type: 'I-L-place',            group: null },
  { range: [11, 14], type: 'I-L-topic',            group: null },
  { range: [15, 16], type: 'I-L-picture',          group: null },
  { range: [17, 21], type: 'I-L-detail',           group: null },
  { range: [22, 24], type: 'I-L-mainidea',         group: null },
  { range: [25, 26], type: 'I-L-passage-purpose',  group: 'G25-26' },
  { range: [27, 28], type: 'I-L-passage-topic',    group: 'G27-28' },
  { range: [29, 30], type: 'I-L-passage-main',     group: 'G29-30' },
];

// TOPIK I 阅读题型映射
const I_READING_MAP = [
  { range: [31, 33], type: 'I-R-topic',             group: null },
  { range: [34, 39], type: 'I-R-blank',             group: null },
  { range: [40, 42], type: 'I-R-notice',            group: null },
  { range: [43, 45], type: 'I-R-detail',            group: null },
  { range: [46, 48], type: 'I-R-mainidea',          group: null },
  { range: [49, 50], type: 'I-R-passage-blank',     group: 'G49-50' },
  { range: [51, 52], type: 'I-R-passage-detail',    group: 'G51-52' },
  { range: [53, 54], type: 'I-R-passage-blank2',    group: 'G53-54' },
  { range: [55, 56], type: 'I-R-passage-detail2',   group: 'G55-56' },
  { range: [57, 58], type: 'I-R-sentence-order',    group: null },
  { range: [59, 62], type: 'I-R-passage-insert',    group: 'G59-62' },
  { range: [63, 64], type: 'I-R-passage-purpose',   group: 'G63-64' },
  { range: [65, 66], type: 'I-R-passage-context',   group: 'G65-66' },
  { range: [67, 68], type: 'I-R-passage-mainidea',  group: 'G67-68' },
  { range: [69, 70], type: 'I-R-passage-attitude',  group: 'G69-70' },
];

// TOPIK II 听力题型映射（参考官方分布）
const II_LISTENING_MAP = [
  { range: [1, 3],   type: 'II-L-picture',           group: null },
  { range: [4, 8],   type: 'II-L-followup',          group: null },
  { range: [9, 12],  type: 'II-L-action',            group: null },
  { range: [13, 16], type: 'II-L-detail',            group: null },
  { range: [17, 20], type: 'II-L-mainidea',          group: null },
  { range: [21, 22], type: 'II-L-passage-mainidea',  group: 'G21-22' },
  { range: [23, 24], type: 'II-L-passage-detail',    group: 'G23-24' },
  { range: [25, 26], type: 'II-L-passage-mainidea2', group: 'G25-26' },
  { range: [27, 28], type: 'II-L-passage-intent',    group: 'G27-28' },
  { range: [29, 30], type: 'II-L-passage-identity',  group: 'G29-30' },
  { range: [31, 32], type: 'II-L-passage-opinion',   group: 'G31-32' },
  { range: [33, 34], type: 'II-L-passage-topic',     group: 'G33-34' },
  { range: [35, 36], type: 'II-L-passage-place',     group: 'G35-36' },
  { range: [37, 38], type: 'II-L-passage-attitude',  group: 'G37-38' },
  { range: [39, 40], type: 'II-L-passage-context',   group: 'G39-40' },
  { range: [41, 42], type: 'II-L-passage-lecture',   group: 'G41-42' },
  { range: [43, 44], type: 'II-L-passage-doc',       group: 'G43-44' },
  { range: [45, 46], type: 'II-L-passage-attitude2', group: 'G45-46' },
  { range: [47, 48], type: 'II-L-passage-intent2',   group: 'G47-48' },
  { range: [49, 50], type: 'II-L-passage-attitude3', group: 'G49-50' },
];

// TOPIK II 阅读题型映射
const II_READING_MAP = [
  { range: [1, 2],   type: 'II-R-blank',              group: null },
  { range: [3, 4],   type: 'II-R-meaning',            group: null },
  { range: [5, 8],   type: 'II-R-ad-purpose',         group: null },   // 图片题
  { range: [9, 12],  type: 'II-R-match',              group: null },
  { range: [13, 15], type: 'II-R-sentence-order',     group: null },
  { range: [16, 17], type: 'II-R-passage-blank',      group: 'G16-17' },
  { range: [18, 19], type: 'II-R-passage-detail',     group: 'G18-19' },
  { range: [20, 22], type: 'II-R-passage-mainidea',   group: 'G20-22' },
  { range: [23, 24], type: 'II-R-passage-feeling',    group: 'G23-24' },
  { range: [25, 27], type: 'II-R-headline',           group: null },
  { range: [28, 31], type: 'II-R-passage-blank2',     group: null },
  { range: [32, 34], type: 'II-R-passage-detail2',    group: null },
  { range: [35, 38], type: 'II-R-passage-topic',      group: null },
  { range: [39, 41], type: 'II-R-passage-insert',     group: null },
  { range: [42, 43], type: 'II-R-passage-feeling2',   group: 'G42-43' },
  { range: [44, 45], type: 'II-R-passage-blank3',     group: 'G44-45' },
  { range: [46, 47], type: 'II-R-passage-intent',     group: 'G46-47' },
  { range: [48, 50], type: 'II-R-passage-intent2',    group: 'G48-50' },
];

function pickType(number, map) {
  for (const e of map) {
    if (number >= e.range[0] && number <= e.range[1]) return e;
  }
  return null;
}

function getMap(level, section) {
  if (level === 'I' && section === 'listening') return I_LISTENING_MAP;
  if (level === 'I' && section === 'reading')   return I_READING_MAP;
  if (level === 'II' && section === 'listening') return II_LISTENING_MAP;
  if (level === 'II' && section === 'reading')   return II_READING_MAP;
  return null;
}

// 从 id 解析出 examRound 和 level
function parseId(id) {
  // T35I-L01, T35II-R31, T96I-R45 等
  const m = id.match(/^T(\d+)(II|I)-([LR])(\d+)$/);
  if (!m) return null;
  return {
    round: parseInt(m[1]),
    level: m[2],
    sectionCode: m[3],
    number: parseInt(m[4]),
  };
}

const qs = JSON.parse(fs.readFileSync(QPATH, 'utf8'));

let processed = 0, skipped = 0, unknown = 0;
const unknownIds = [];
const distribution = {};

qs.forEach(q => {
  // 只处理真题（T 开头），专项库不动
  if (!q.id.startsWith('T')) {
    skipped++;
    return;
  }
  const parsed = parseId(q.id);
  if (!parsed) { skipped++; return; }

  const map = getMap(parsed.level, q.section);
  if (!map) { skipped++; return; }

  const entry = pickType(parsed.number, map);
  if (!entry) {
    q.examRound = parsed.round;
    q.questionType = `${parsed.level}-${q.section[0].toUpperCase()}-unknown`;
    q.groupId = null;
    unknown++;
    unknownIds.push(q.id);
    return;
  }

  q.examRound = parsed.round;
  q.questionType = entry.type;
  q.groupId = entry.group ? `T${parsed.round}${parsed.level}-${entry.group}` : null;
  processed++;

  const dk = entry.type;
  distribution[dk] = (distribution[dk] || 0) + 1;
});

// 写回
fs.writeFileSync(QPATH, JSON.stringify(qs, null, 2), 'utf8');

console.log('======= 回填结果 =======');
console.log('总题数:', qs.length);
console.log('真题已回填:', processed);
console.log('专项库跳过:', skipped);
console.log('题号超范围(unknown):', unknown);
if (unknownIds.length > 0) console.log('  unknown ids:', unknownIds.slice(0, 10));
console.log('======= 题型分布 =======');
Object.keys(distribution).sort().forEach(k => {
  console.log('  ' + k.padEnd(35) + ' ' + distribution[k]);
});
