// scripts/extract-data-to-public.mjs
// 把 src/data/{yonsei-books,seoul-books,topik-questions}.ts 的运行时数据
// 提取到 public/data/*.json，从此不再打包进 JS bundle。
// 跑法：node scripts/extract-data-to-public.mjs
// 依赖：tsx（项目已有），用它直接 import .ts 文件

import { writeFileSync, mkdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUB = join(ROOT, 'public', 'data');

const importTs = (relPath) => import(pathToFileURL(join(ROOT, relPath)).href);

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

function writeJson(relPath, data) {
  const full = join(PUB, relPath);
  ensureDir(dirname(full));
  writeFileSync(full, JSON.stringify(data));
  const size = statSync(full).size;
  console.log(`  ${relPath.padEnd(40)} ${(size / 1024).toFixed(1)} KB`);
  return size;
}

async function main() {
  console.log('=== Yonsei ===');
  const { yonseiUnits } = await importTs('src/data/yonsei-books.ts');
  await splitByBookTitle('yonsei', yonseiUnits);

  console.log('\n=== Seoul ===');
  const { seoulUnits } = await importTs('src/data/seoul-books.ts');
  await splitByBookTitle('seoul', seoulUnits);

  console.log('\n=== TOPIK ===');
  const topik = await importTs('src/data/topik-questions.ts');
  let total = 0;
  total += writeJson('topik/sections.json', topik.topikSections);
  total += writeJson('topik/exam-sets.json', topik.topikExamSets);
  total += writeJson('topik/questions.json', topik.topikQuestions);
  console.log(`  TOPIK 总计 ${(total / 1024).toFixed(1)} KB`);

  console.log('\n✓ 全部生成完成。');
}

async function splitByBookTitle(prefix, units) {
  // 按 bookTitle 分组
  const byBook = new Map();
  for (const u of units) {
    if (!byBook.has(u.bookTitle)) byBook.set(u.bookTitle, []);
    byBook.get(u.bookTitle).push(u);
  }

  // bookTitle 排序后给一个稳定 bookId（1 开始）
  const titles = [...byBook.keys()].sort();
  const index = [];
  let total = 0;
  titles.forEach((title, i) => {
    const bookId = i + 1;
    const units = byBook.get(title);
    total += writeJson(`${prefix}/book-${bookId}.json`, units);
    units.forEach((u) => {
      index.push({
        id: u.id,
        bookId,
        bookTitle: u.bookTitle,
        unitNumber: u.unitNumber,
        title: u.title,
        titleKo: u.titleKo,
        description: u.description,
        wordCount: u.words.length,
        previewWords: u.words.slice(0, 6).map((w) => w.word),
      });
    });
  });
  total += writeJson(`${prefix}/index.json`, index);
  console.log(`  ${prefix} 总计 ${(total / 1024).toFixed(1)} KB / ${index.length} units / ${titles.length} books`);
}

main().catch((err) => {
  console.error('迁移失败:', err);
  process.exit(1);
});
