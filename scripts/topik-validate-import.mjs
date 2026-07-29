// 录入校验脚本：导入一批题前必须跑这个，避免污染数据
// 用法：node scripts/topik-validate-import.mjs <new-questions.json>
import fs from 'fs';

const argv = process.argv.slice(2);
if (argv.length < 1) {
  console.error('用法: node topik-validate-import.mjs <new-questions.json>');
  process.exit(1);
}

const newQs = JSON.parse(fs.readFileSync(argv[0], 'utf8'));
const existing = JSON.parse(fs.readFileSync('C:/Users/Administrator/Desktop/korean-learning-app/public/data/topik/questions.json', 'utf8'));

const errors = [];
const existingIds = new Set(existing.map(q => q.id));

newQs.forEach((q, i) => {
  const ctx = `[${i}] ${q.id || '???'}`;
  if (!q.id) errors.push(`${ctx}: missing id`);
  if (q.id && existingIds.has(q.id)) errors.push(`${ctx}: id 已存在于库中`);
  if (!q.section) errors.push(`${ctx}: missing section`);
  if (!['listening','reading'].includes(q.section)) errors.push(`${ctx}: section 必须是 listening/reading`);
  if (!q.level) errors.push(`${ctx}: missing level`);
  if (typeof q.number !== 'number') errors.push(`${ctx}: number 必须是数字`);
  if (!q.prompt) errors.push(`${ctx}: missing prompt`);
  if (!q.promptZh) errors.push(`${ctx}: missing promptZh`);
  if (!Array.isArray(q.options)) errors.push(`${ctx}: options 必须是数组`);
  else if (q.options.length !== 4) errors.push(`${ctx}: options 必须 4 个，当前 ${q.options.length}`);
  else if (q.options.some(o => typeof o !== 'string' || !o.trim())) errors.push(`${ctx}: options 含空项`);
  if (typeof q.correctIdx !== 'number') errors.push(`${ctx}: correctIdx 必须是数字`);
  else if (q.correctIdx < 0 || q.correctIdx > 3) errors.push(`${ctx}: correctIdx 越界 (${q.correctIdx})`);
  if (!q.explanation || q.explanation.length < 30) errors.push(`${ctx}: explanation 过短或缺失`);
  if (!Array.isArray(q.vocabulary)) errors.push(`${ctx}: vocabulary 必须是数组`);
  if (q.section === 'listening' && !q.audioText) errors.push(`${ctx}: 听力题必须有 audioText`);
  if (typeof q.examRound !== 'number') errors.push(`${ctx}: missing examRound`);
  if (!q.questionType) errors.push(`${ctx}: missing questionType`);
});

// 重复 id 检查（在新批次内）
const idSeen = new Map();
newQs.forEach((q, i) => {
  if (q.id && idSeen.has(q.id)) errors.push(`重复 id: ${q.id} 在 [${idSeen.get(q.id)}] 和 [${i}]`);
  if (q.id) idSeen.set(q.id, i);
});

if (errors.length > 0) {
  console.error('❌ 校验失败:');
  errors.forEach(e => console.error('  ' + e));
  process.exit(1);
}
console.log(`✅ 校验通过: ${newQs.length} 题`);
