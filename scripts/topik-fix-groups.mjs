// 修两类 groupId 错误：
//   1. T35II-G23-24 同 id 被听阅共用 → groupId 加 section 前缀（L/R）
//   2. G59-62 实际是 59-60 + 61-62 两组文章 → 拆开
import fs from 'fs';
const QPATH = 'C:/Users/Administrator/Desktop/korean-learning-app/public/data/topik/questions.json';

const qs = JSON.parse(fs.readFileSync(QPATH, 'utf8'));

let renamedCount = 0;
let splitCount = 0;

qs.forEach(q => {
  if (!q.groupId) return;
  const m = q.groupId.match(/^T(\d+)(II|I)-G(\d+)-(\d+)$/);
  if (!m) return;
  const [, round, level, startStr, endStr] = m;
  const start = parseInt(startStr), end = parseInt(endStr);
  const secCode = q.section === 'listening' ? 'L' : 'R';

  // 处理 G59-62：拆成 G59-60 + G61-62
  if (start === 59 && end === 62) {
    if (q.number === 59 || q.number === 60) {
      q.groupId = `T${round}${level}-${secCode}-G59-60`;
    } else if (q.number === 61 || q.number === 62) {
      q.groupId = `T${round}${level}-${secCode}-G61-62`;
    }
    splitCount++;
    return;
  }

  // 其他题组：加 section 前缀以区分听阅
  if (!q.groupId.includes(`-${secCode}-`)) {
    q.groupId = `T${round}${level}-${secCode}-G${start}-${end}`;
    renamedCount++;
  }
});

fs.writeFileSync(QPATH, JSON.stringify(qs, null, 2), 'utf8');

console.log('renamed (加section前缀):', renamedCount);
console.log('split   (G59-62 → 59-60+61-62):', splitCount);

// 校验：再扫一遍，看现在还有没有大题组
const groups = {};
qs.filter(q => q.groupId).forEach(q => {
  if (!groups[q.groupId]) groups[q.groupId] = [];
  groups[q.groupId].push({ number: q.number, section: q.section });
});
const bad = Object.entries(groups).filter(([gid, items]) => {
  // 同一题组里不能有重复 number，且不能跨 section
  const sections = new Set(items.map(x => x.section));
  if (sections.size > 1) return true;
  const numbers = items.map(x => x.number);
  if (new Set(numbers).size !== numbers.length) return true;
  return false;
});
console.log('剩余异常题组:', bad.length);
bad.forEach(([gid, items]) => console.log('  ' + gid + ' : ' + JSON.stringify(items)));
