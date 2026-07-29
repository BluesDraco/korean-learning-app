// 一次性拆包脚本：
// 1) 过滤 questions.json 里的 T 系列老真题
// 2) 按 exam id 前缀（E01I / E10II 等）拆分到 public/data/topik/questions/{setId}.json
// 3) 生成 questions-index.json（只含 id/section/level/difficulty），供主页 + 专项练习计数用
// 4) 清理 exam-sets.json 里的老真题条目（保留 mock === true）
// 5) 删除原 questions.json

import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('public/data/topik');
const QUESTIONS_FILE = path.join(ROOT, 'questions.json');
const EXAM_SETS_FILE = path.join(ROOT, 'exam-sets.json');
const OUT_DIR = path.join(ROOT, 'questions');
const INDEX_FILE = path.join(ROOT, 'questions-index.json');

const raw = JSON.parse(fs.readFileSync(QUESTIONS_FILE, 'utf8'));
const questions = Array.isArray(raw) ? raw : (raw.questions || []);

// 从 id 里抽 exam-set key（E01I / E10II / T35I ...）
function parseSetKey(id) {
  const m = /^([ET]\d+I{1,2})-/.exec(id);
  return m ? m[1] : null;
}
function setKeyToFileName(key) {
  // E01II → E01-II，E10I → E10-I
  const m = /^([ET])(\d+)(I{1,2})$/.exec(key);
  if (!m) return key;
  return `${m[1]}${m[2]}-${m[3]}`;
}

const buckets = new Map();
let skipped = 0;
for (const q of questions) {
  const key = parseSetKey(q.id);
  if (!key || key.startsWith('T')) { skipped++; continue; }
  if (!buckets.has(key)) buckets.set(key, []);
  buckets.get(key).push(q);
}

if (fs.existsSync(OUT_DIR)) {
  fs.rmSync(OUT_DIR, { recursive: true });
}
fs.mkdirSync(OUT_DIR, { recursive: true });

const index = [];
const setSizes = [];
for (const [key, list] of [...buckets.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  const fileName = `${setKeyToFileName(key)}.json`;
  const outPath = path.join(OUT_DIR, fileName);
  list.sort((a, b) => (a.number || 0) - (b.number || 0));
  fs.writeFileSync(outPath, JSON.stringify(list), 'utf8');
  const bytes = fs.statSync(outPath).size;
  setSizes.push({ key, count: list.length, kb: (bytes / 1024).toFixed(1) });
  for (const q of list) {
    index.push({
      id: q.id,
      section: q.section,
      level: q.level,
      difficulty: q.difficulty || 'medium',
      questionType: q.questionType || 'unknown',
    });
  }
}
fs.writeFileSync(INDEX_FILE, JSON.stringify(index), 'utf8');

// 清理 exam-sets.json：只保留 mock === true
const setsRaw = JSON.parse(fs.readFileSync(EXAM_SETS_FILE, 'utf8'));
const setsArr = Array.isArray(setsRaw) ? setsRaw : (setsRaw.examSets || []);
const kept = setsArr.filter(s => s.mock === true);
const removed = setsArr.length - kept.length;
fs.writeFileSync(EXAM_SETS_FILE, JSON.stringify(kept), 'utf8');

// 删原 questions.json
fs.unlinkSync(QUESTIONS_FILE);

// 汇总
console.log('拆包结果:');
setSizes.forEach(s => console.log(`  ${s.key.padEnd(6)} ${String(s.count).padStart(3)} 题  ${s.kb.padStart(6)} KB`));
console.log(`\n总包数: ${setSizes.length}`);
console.log(`跳过老真题: ${skipped} 题`);
console.log(`\nindex 大小: ${(fs.statSync(INDEX_FILE).size / 1024).toFixed(1)} KB (${index.length} 条)`);
console.log(`exam-sets.json 保留: ${kept.length} / ${setsArr.length}  (删除 ${removed})`);
console.log(`\n已删除: questions.json`);
