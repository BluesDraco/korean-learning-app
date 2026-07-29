// 合并 g1+g2 翻译结果，写回 questions.json
import fs from 'fs';

const ROOT = 'C:/Users/Administrator/Desktop/korean-learning-app';
const g1 = JSON.parse(fs.readFileSync(`${ROOT}/.audit-cache/explanation-fix-g1-out.json`, 'utf8'));
const g2 = JSON.parse(fs.readFileSync(`${ROOT}/.audit-cache/explanation-fix-g2-out.json`, 'utf8'));
const merged = { ...g1, ...g2 };
console.log('G1:', Object.keys(g1).length, 'G2:', Object.keys(g2).length, 'merged:', Object.keys(merged).length);

const qPath = `${ROOT}/public/data/topik/questions.json`;
const arr = JSON.parse(fs.readFileSync(qPath, 'utf8'));
const src = Array.isArray(arr) ? arr : Object.values(arr);

let applied = 0, missing = [];
for (const q of src) {
  if (merged[q.id]) {
    q.explanation = merged[q.id];
    applied++;
  }
}
// 找 merged 里有但 questions.json 里没匹配上的
for (const id of Object.keys(merged)) {
  if (!src.find(q => q.id === id)) missing.push(id);
}

fs.writeFileSync(qPath, JSON.stringify(src, null, 2), 'utf8');
console.log('应用:', applied, '条');
if (missing.length) console.log('未匹配 id:', missing);
