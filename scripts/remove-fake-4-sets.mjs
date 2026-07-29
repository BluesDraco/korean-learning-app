// 移除 T64/T83/T91/T96 四届 160 道仿真题
// - 从 questions.json 删除
// - 从 exam-sets.json 清空对应 questionIds
import fs from 'fs';

const ROOT = 'C:/Users/Administrator/Desktop/korean-learning-app';
const REMOVE = ['T64I','T83I','T91I','T96I'];

const qPath = `${ROOT}/public/data/topik/questions.json`;
const sPath = `${ROOT}/public/data/topik/exam-sets.json`;

const questions = JSON.parse(fs.readFileSync(qPath, 'utf8'));
const before = Array.isArray(questions) ? questions.length : Object.keys(questions).length;

const filter = q => !REMOVE.some(s => String(q.id).startsWith(s + '-'));
const kept = (Array.isArray(questions) ? questions : Object.values(questions)).filter(filter);
fs.writeFileSync(qPath, JSON.stringify(kept, null, 2), 'utf8');
console.log(`questions.json: ${before} → ${kept.length} (删除 ${before - kept.length})`);

const sets = JSON.parse(fs.readFileSync(sPath, 'utf8'));
const setsArr = Array.isArray(sets) ? sets : Object.values(sets);
let cleared = 0;
for (const s of setsArr) {
  const round = s.round;
  const level = s.level;
  const codeMatch = REMOVE.find(c => {
    const n = parseInt(c.match(/\d+/)[0]);
    return n === round && level === 'I';
  });
  if (codeMatch) {
    (s.sections || []).forEach(sec => {
      if ((sec.questionIds || []).length > 0) {
        cleared += sec.questionIds.length;
        sec.questionIds = [];
      }
    });
    s.available = false;
  }
}
fs.writeFileSync(sPath, JSON.stringify(setsArr, null, 2), 'utf8');
console.log(`exam-sets.json: 已清空 ${cleared} 条 questionIds，${REMOVE.length} 届设为 available:false`);
