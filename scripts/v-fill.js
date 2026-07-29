// 给 vitamin book-2 的单元补例句。小批量、可断点续做。
// 用法:
//   node scripts/v-fill.js next <unitId> <n>       打印接下来 n 个无例句的词
//   node scripts/v-fill.js apply <unitId>          从 stdin 读补丁并写盘, 再打印下一批
// 补丁格式(stdin JSON): [{ "i":<book中1-based序号>, "e":[["韩","中"],["韩","中"]] }, ...]
const fs = require('fs');
const path = require('path');
const FILE = path.join(__dirname, '..', 'public', 'data', 'vitamin', 'book-2.json');

function load() {
  const raw = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  const arr = Array.isArray(raw) ? raw : raw.units;
  return { raw, arr };
}
function findUnit(arr, id) {
  const u = arr.find(x => x.id === id);
  if (!u) throw new Error('unit not found: ' + id);
  return u;
}
function printNext(u, n) {
  const pend = [];
  u.words.forEach((w, idx) => {
    if (!w.examples || w.examples.length === 0) pend.push({ i: idx + 1, w });
  });
  const batch = pend.slice(0, n);
  batch.forEach(({ i, w }) => {
    console.log(i + '|' + w.word + '|' + w.meaning + '|' + w.partOfSpeech);
  });
  console.log('#remaining=' + pend.length);
}

const mode = process.argv[2];
const unitId = process.argv[3];

if (mode === 'next') {
  const { arr } = load();
  const u = findUnit(arr, unitId);
  printNext(u, parseInt(process.argv[4] || '10', 10));
} else if (mode === 'apply') {
  const patch = JSON.parse(fs.readFileSync(0, 'utf8')); // stdin
  const { raw, arr } = load();
  const u = findUnit(arr, unitId);
  let applied = 0;
  patch.forEach(p => {
    const w = u.words[p.i - 1];
    if (!w) throw new Error('bad index ' + p.i);
    w.examples = p.e.map(pair => ({ text: pair[0], translation: pair[1] }));
    applied++;
  });
  fs.writeFileSync(FILE, JSON.stringify(raw, null, 2) + '\n', 'utf8');
  console.log('#applied=' + applied);
  printNext(u, 10);
} else {
  console.log('unknown mode');
}
