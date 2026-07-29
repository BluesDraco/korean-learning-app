// 分层抽样 300 题：每卷 30 题（听 15 + 读 15），按难度 6/18/6 分配
import fs from 'node:fs';

const questions = JSON.parse(fs.readFileSync('public/data/topik/questions.json', 'utf-8'));
const targetQs = questions.filter(q => /^E(0[1-9]|10)II-/.test(q.id));

// 确定性哈希——按 id 排序即可保证可复现
function pickN(pool, n) {
  return pool.slice(0, n);
}

const samples = [];
for (let i = 1; i <= 10; i++) {
  const prefix = `E${String(i).padStart(2, '0')}II`;
  const setQs = targetQs.filter(q => q.id.startsWith(prefix + '-'));

  for (const sec of ['listening', 'reading']) {
    const secQs = setQs.filter(q => q.section === sec);
    // 按 difficulty 分桶（顺序即 id 顺序，稳定）
    const easy = secQs.filter(q => q.difficulty === 'easy');
    const medium = secQs.filter(q => q.difficulty === 'medium');
    const hard = secQs.filter(q => q.difficulty === 'hard');

    // 目标 3/9/3 = 15
    const picked = [
      ...pickN(easy, Math.min(3, easy.length)),
      ...pickN(medium, Math.min(9, medium.length)),
      ...pickN(hard, Math.min(3, hard.length)),
    ];
    // 补齐到 15
    while (picked.length < 15) {
      const remaining = secQs.filter(q => !picked.includes(q));
      if (!remaining.length) break;
      picked.push(remaining[0]);
    }
    samples.push(...picked.slice(0, 15));
  }
}

console.log('抽样总数:', samples.length);
console.log('per set:', samples.reduce((m, q) => {
  const set = q.id.slice(0, 5);
  m[set] = (m[set] || 0) + 1;
  return m;
}, {}));

// 按卷分组输出
const bySet = {};
samples.forEach(q => {
  const set = q.id.slice(0, 5);
  if (!bySet[set]) bySet[set] = [];
  bySet[set].push(q);
});

// 输出精简 JSON 供后续人工审查
fs.writeFileSync(
  'scripts/topik-e0X-sample.json',
  JSON.stringify(samples.map(q => ({
    id: q.id,
    section: q.section,
    difficulty: q.difficulty,
    questionType: q.questionType,
    testPoint: q.testPoint,
    audioText: q.audioText,
    passage: q.passage,
    prompt: q.prompt,
    options: q.options,
    correctIdx: q.correctIdx,
    correctText: q.options?.[q.correctIdx],
    explanation: q.explanation,
    groupId: q.groupId,
  })), null, 2),
  'utf-8'
);

console.log('已写入 scripts/topik-e0X-sample.json');
