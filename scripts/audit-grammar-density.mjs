// scripts/audit-grammar-density.mjs
// 扫 P1-P30 所有语法卡的字段密度，对照 grammar-lesson-design.md 下限：
// - structures ≥ 2
// - connectionRules ≥ 7
// - cardExamples ≥ 4
// - scenarios ≥ 6
// - mistakes ≥ 4
// - specialQuiz.questions ≥ 4
// - overviewHtml 非空
// isPractice 卡不校验前面的 structures/cardExamples/scenarios/mistakes，只校验 specialQuiz 和 overviewHtml。
// 用法：node scripts/audit-grammar-density.mjs [--json out.json]

import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');

async function loadPart(partNum) {
  const file = path.join(dataDir, `grammar-cards-p${partNum}.ts`);
  const url = 'file:///' + file.replace(/\\/g, '/');
  const mod = await import(url);
  return mod[`grammarCardsP${partNum}`];
}

// 下限
const MIN = {
  structures: 2,
  connectionRules: 7,
  cardExamples: 4,
  scenarios: 6,
  mistakes: 4,
  specialQuizQuestions: 4,
};

const findings = [];
const summaryRows = []; // {cardId, isPractice, structures, connectionRules, cardExamples, scenarios, mistakes, specialQuiz, overviewHtml, verdict}

const files = readdirSync(dataDir).filter((f) => /^grammar-cards-p\d+\.ts$/.test(f));
const partNums = files
  .map((f) => Number(f.match(/p(\d+)/)[1]))
  .sort((a, b) => a - b);

for (const p of partNums) {
  let cards;
  try {
    cards = await loadPart(p);
  } catch (e) {
    console.error(`P${p} load fail:`, e.message);
    continue;
  }
  for (const card of cards) {
    const cardId = card.id;
    const isPractice = !!card.isPractice;
    const strCount = (card.structures || []).length;
    const crCount = (card.connectionRules || []).length;
    const ceCount = (card.cardExamples || []).length;
    const scCount = (card.scenarios || []).length;
    const msCount = (card.mistakes || []).length;
    const sqCount = card.specialQuiz?.questions?.length ?? 0;
    const hasOverview = !!card.overviewHtml && card.overviewHtml.trim().length > 0;
    const hasStep0 = !!card.step0Html && card.step0Html.trim().length > 0;
    const hasCompare = !!card.compareHtml && card.compareHtml.trim().length > 0;

    summaryRows.push({
      cardId,
      isPractice,
      structures: strCount,
      connectionRules: crCount,
      cardExamples: ceCount,
      scenarios: scCount,
      mistakes: msCount,
      specialQuiz: sqCount,
      overview: hasOverview ? '✓' : '—',
      step0: hasStep0 ? '✓' : '—',
      compare: hasCompare ? '✓' : '—',
    });

    if (isPractice) {
      // 综合练习卡：只校验 specialQuiz.questions >= 4 + overviewHtml
      if (sqCount < MIN.specialQuizQuestions) {
        findings.push({ cardId, kind: 'practice-specialQuiz', detail: `isPractice 卡 specialQuiz.questions = ${sqCount} < ${MIN.specialQuizQuestions}` });
      }
      if (!hasOverview) {
        findings.push({ cardId, kind: 'practice-overview', detail: `isPractice 卡 overviewHtml empty` });
      }
      continue;
    }

    // 普通卡
    if (strCount < MIN.structures) findings.push({ cardId, kind: 'structures-low', detail: `${strCount} < ${MIN.structures}` });
    if (crCount < MIN.connectionRules) findings.push({ cardId, kind: 'connectionRules-low', detail: `${crCount} < ${MIN.connectionRules}` });
    if (ceCount < MIN.cardExamples) findings.push({ cardId, kind: 'cardExamples-low', detail: `${ceCount} < ${MIN.cardExamples}` });
    if (scCount < MIN.scenarios) findings.push({ cardId, kind: 'scenarios-low', detail: `${scCount} < ${MIN.scenarios}` });
    if (msCount < MIN.mistakes) findings.push({ cardId, kind: 'mistakes-low', detail: `${msCount} < ${MIN.mistakes}` });
    if (sqCount > 0 && sqCount < MIN.specialQuizQuestions) findings.push({ cardId, kind: 'specialQuiz-low', detail: `${sqCount} < ${MIN.specialQuizQuestions}` });
    if (!hasOverview) findings.push({ cardId, kind: 'overview-empty', detail: `overviewHtml empty` });
  }
}

// -------- 输出 --------
const outArg = process.argv.indexOf('--json');
if (outArg > -1 && process.argv[outArg + 1]) {
  const outPath = process.argv[outArg + 1];
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify({ findings, summary: summaryRows }, null, 2), 'utf8');
  console.log(`Wrote ${findings.length} findings + ${summaryRows.length} cards to ${outPath}`);
}

// 摘要计数
const byKind = new Map();
for (const f of findings) byKind.set(f.kind, (byKind.get(f.kind) || 0) + 1);
console.log(`\n=== ${findings.length} findings across ${new Set(findings.map(f => f.cardId)).size} cards ===`);
console.log(`Total cards scanned: ${summaryRows.length}`);
for (const [k, v] of [...byKind.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}

// 按 partNumber 分组统计
const byPart = new Map();
for (const row of summaryRows) {
  const p = row.cardId.match(/p(\d+)/)[1];
  if (!byPart.has(p)) byPart.set(p, []);
  byPart.get(p).push(row);
}

console.log('\n=== 每部 平均字段密度 ===');
console.log('Part | avg struct | avg CR | avg ex | avg sc | avg ms | avg quiz');
for (const [p, rows] of [...byPart.entries()].sort((a, b) => Number(a[0]) - Number(b[0]))) {
  const nonPractice = rows.filter((r) => !r.isPractice);
  if (nonPractice.length === 0) continue;
  const avg = (key) => (nonPractice.reduce((s, r) => s + r[key], 0) / nonPractice.length).toFixed(1);
  console.log(`P${p.padStart(2, ' ')}  |  ${avg('structures').padStart(8)}  |  ${avg('connectionRules').padStart(4)}  |  ${avg('cardExamples').padStart(4)}  |  ${avg('scenarios').padStart(4)}  |  ${avg('mistakes').padStart(4)}  |  ${avg('specialQuiz').padStart(4)}`);
}

console.log('\n=== Findings 详情（前 60 条）===');
findings.slice(0, 60).forEach((f) => console.log(`  [${f.cardId}] ${f.kind}: ${f.detail}`));
if (findings.length > 60) console.log(`  ... 还有 ${findings.length - 60} 条`);
