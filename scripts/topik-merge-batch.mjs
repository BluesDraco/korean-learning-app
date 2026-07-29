// 把一批校验过的题合并到 questions.json，并同步 exam-sets.json
// 用法：node scripts/topik-merge-batch.mjs <new-questions.json> <examSetId> <sectionType>
//   examSetId: 如 topik-37-I
//   sectionType: listening 或 reading
import fs from 'fs';

const [newPath, examSetId, sectionType] = process.argv.slice(2);
if (!newPath || !examSetId || !sectionType) {
  console.error('用法: node topik-merge-batch.mjs <new-questions.json> <examSetId> <listening|reading>');
  process.exit(1);
}
if (!['listening','reading'].includes(sectionType)) {
  console.error('sectionType 必须是 listening 或 reading');
  process.exit(1);
}

const QPATH = 'C:/Users/Administrator/Desktop/korean-learning-app/public/data/topik/questions.json';
const SPATH = 'C:/Users/Administrator/Desktop/korean-learning-app/public/data/topik/exam-sets.json';

const newQs = JSON.parse(fs.readFileSync(newPath, 'utf8'));
const existing = JSON.parse(fs.readFileSync(QPATH, 'utf8'));
const sets = JSON.parse(fs.readFileSync(SPATH, 'utf8'));

// 安全检查：id 不能和现有重复
const existingIds = new Set(existing.map(q => q.id));
const dups = newQs.filter(q => existingIds.has(q.id));
if (dups.length > 0) {
  console.error('❌ 与现有数据 id 冲突:', dups.map(q => q.id));
  process.exit(1);
}

// 合并
const merged = [...existing, ...newQs];
fs.writeFileSync(QPATH, JSON.stringify(merged, null, 2), 'utf8');
console.log(`合并到 questions.json: 旧 ${existing.length} + 新 ${newQs.length} = ${merged.length}`);

// 同步 exam-sets.json
const set = sets.find(s => s.id === examSetId);
if (!set) {
  console.error('❌ exam-sets.json 找不到', examSetId);
  process.exit(1);
}
let sec = set.sections.find(s => s.type === sectionType);
if (!sec) {
  // 如果 section 不存在就新建
  sec = { type: sectionType, questionIds: [], timeMinutes: sectionType === 'listening' ? 40 : 60 };
  set.sections.push(sec);
}
// 用新题的 id 替换该 section 的 questionIds（按 number 排序）
const newIds = newQs.filter(q => q.section === sectionType).sort((a,b) => a.number - b.number).map(q => q.id);
sec.questionIds = newIds;
console.log(`更新 ${examSetId}.${sectionType}.questionIds: ${newIds.length} 个`);

// 检查是否两个 section 都齐了；只齐听阅都齐才能 available=true（写作不算）
const listenCount = set.sections.find(s => s.type === 'listening')?.questionIds?.length || 0;
const readCount = set.sections.find(s => s.type === 'reading')?.questionIds?.length || 0;
// 由人工决定是否 available，这里不自动改

fs.writeFileSync(SPATH, JSON.stringify(sets, null, 2), 'utf8');
console.log(`exam-sets.json 已更新。当前 ${examSetId}: 听力 ${listenCount} 题、阅读 ${readCount} 题`);
console.log(`(available 状态保留为 ${set.available}，由人工决定开放时机)`);
