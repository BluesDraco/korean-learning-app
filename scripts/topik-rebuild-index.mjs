// 幂等重建 public/data/topik/questions-index.json
// 扫描 questions/E*.json，按 exam 编号升序、同编号 I 在 II 前，
// 每份卷内保持原数组顺序。每条 = {id, section, level, difficulty, questionType}。
// 用法: node scripts/topik-rebuild-index.mjs [--check]
//   --check 只比对不写盘，退出码非 0 表示与磁盘不一致。

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const QDIR = path.join(ROOT, 'public/data/topik/questions');
const INDEX = path.join(ROOT, 'public/data/topik/questions-index.json');

function fileSortKey(base) {
  // base like "E11-I" / "E11-II"
  const m = /^E(\d+)-(I{1,2})$/.exec(base);
  if (!m) return [9999, 9];
  return [parseInt(m[1], 10), m[2] === 'I' ? 0 : 1];
}

function build() {
  const files = fs.readdirSync(QDIR)
    .filter(f => /^E\d+-I{1,2}\.json$/.test(f))
    .map(f => f.replace('.json', ''))
    .sort((a, b) => {
      const [an, al] = fileSortKey(a), [bn, bl] = fileSortKey(b);
      return an - bn || al - bl;
    });

  const index = [];
  for (const base of files) {
    const data = JSON.parse(fs.readFileSync(path.join(QDIR, `${base}.json`), 'utf8'));
    for (const q of data) {
      index.push({
        id: q.id,
        section: q.section,
        level: q.level,
        difficulty: q.difficulty,
        questionType: q.questionType,
      });
    }
  }
  return index;
}

const check = process.argv.includes('--check');
const index = build();
const json = JSON.stringify(index); // 与现有文件一致：紧凑单行

if (check) {
  const cur = fs.existsSync(INDEX) ? fs.readFileSync(INDEX, 'utf8') : '';
  if (cur.trim() === json.trim()) {
    console.log(`✅ 索引已是最新（${index.length} 条）`);
    process.exit(0);
  }
  console.log(`❌ 索引与磁盘不一致（应 ${index.length} 条）。运行不带 --check 重建。`);
  process.exit(1);
}

fs.writeFileSync(INDEX, json);
console.log(`✅ 已重建 questions-index.json：${index.length} 条`);
