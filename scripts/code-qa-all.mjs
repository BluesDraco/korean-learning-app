// scripts/code-qa-all.mjs
// 严格对照 types/index.ts 的 GrammarCard interface 验证 145 张卡

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');

// 从 types/index.ts 反向解析 GrammarCard 字段（已读过，硬编码）
const REQUIRED = ['id', 'partNumber', 'lessonNumber', 'title', 'whatItDoes', 'whatItDoesBody', 'structures', 'connectionRules', 'cardExamples', 'scenarios', 'mistakes', 'linkedGrammarIds'];
const OPTIONAL = ['isPractice','structureNote','rulesNote','scenarioNote','conceptCompare','readingGuide','quickTable','specialQuiz','step0Html','compareHtml','compareLabel','overviewHtml'];
const VALID_FIELDS = new Set([...REQUIRED, ...OPTIONAL]);

const VALID_ROLES = new Set(['subject','object','verb','place','plain','time']);
const VALID_CR_TYPES = new Set(['rule','note','compare','example','vocab','usage']);
const VALID_QUIZ_TYPES = new Set(['morph','judge','fill']);

const findings = [];
function add(cardId, step, kind, detail) { findings.push({ cardId, step, kind, detail }); }

async function loadAll() {
  const all = [];
  for (let p = 1; p <= 14; p++) {
    const mod = await import('file:///' + path.join(dataDir, `grammar-cards-p${p}.ts`).replace(/\\/g, '/'));
    for (const c of mod[`grammarCardsP${p}`]) all.push({ part: p, card: c });
  }
  return all;
}

const all = await loadAll();
console.log(`Loaded ${all.length} cards\n`);

// Step 11: partLoaders 检查
const pageTsx = readFileSync(path.join(__dirname, '..', 'src', 'app', 'grammar', 'page.tsx'), 'utf8');
for (let p = 1; p <= 14; p++) {
  if (!pageTsx.includes(`p${p}: () => import('@/data/grammar-cards-p${p}')`)) {
    add(`(global)`, 11, 'partLoader-missing', `p${p} not registered`);
  }
}

for (const { card } of all) {
  const id = card.id;
  const isPractice = card.isPractice === true;

  // Step 2: 顶层字段完整性
  if (!isPractice) {
    for (const f of REQUIRED) {
      if (!(f in card)) add(id, 2, 'missing-field', f);
    }
  } else {
    for (const f of ['id', 'partNumber', 'lessonNumber', 'title', 'isPractice']) {
      if (!(f in card)) add(id, 2, 'missing-field-practice', f);
    }
  }
  // 字段类型
  if (typeof card.partNumber !== 'number') add(id, 2, 'bad-type', 'partNumber not number');
  if (typeof card.lessonNumber !== 'number') add(id, 2, 'bad-type', 'lessonNumber not number');
  if ('isPractice' in card && typeof card.isPractice !== 'boolean') add(id, 2, 'bad-type', 'isPractice not boolean');
  for (const f of ['structures','connectionRules','cardExamples','scenarios','mistakes','linkedGrammarIds']) {
    if (f in card && !Array.isArray(card[f])) add(id, 2, 'bad-type', `${f} not array`);
  }
  // 接口外字段
  for (const f of Object.keys(card)) {
    if (!VALID_FIELDS.has(f)) add(id, 2, 'unknown-field', f);
  }

  if (!isPractice) {
    // Step 3: connectionRules
    if (Array.isArray(card.connectionRules)) {
      card.connectionRules.forEach((r, i) => {
        if (typeof r === 'string') return; // 兼容旧版字符串
        if (!r.type) add(id, 3, 'cr-no-type', `[${i}]`);
        else if (!VALID_CR_TYPES.has(r.type)) add(id, 3, 'cr-bad-type', `[${i}] type=${r.type}`);
        if (!r.text || typeof r.text !== 'string') add(id, 3, 'cr-no-text', `[${i}]`);
      });
    }

    // Step 4: cardExamples
    if (Array.isArray(card.cardExamples)) {
      card.cardExamples.forEach((ex, i) => {
        if (!Array.isArray(ex.wordBlocks)) add(id, 4, 'ex-no-blocks', `[${i}]`);
        else {
          ex.wordBlocks.forEach((b, j) => {
            if (!b.text) add(id, 4, 'block-no-text', `[${i}][${j}]`);
            if (!b.role || !VALID_ROLES.has(b.role)) add(id, 4, 'block-bad-role', `[${i}][${j}] role=${b.role}`);
          });
        }
        if (typeof ex.zh !== 'string') add(id, 4, 'ex-no-zh', `[${i}]`);
        if (ex.swapWords && !Array.isArray(ex.swapWords)) add(id, 4, 'ex-bad-swap', `[${i}]`);
        if (ex.swapRole && !VALID_ROLES.has(ex.swapRole)) add(id, 4, 'ex-bad-swaprole', `[${i}] swapRole=${ex.swapRole}`);
      });
    }

    // Step 5: scenarios
    if (Array.isArray(card.scenarios)) {
      card.scenarios.forEach((sc, i) => {
        if (!sc.icon) add(id, 5, 'sc-no-icon', `[${i}]`);
        if (!sc.context) add(id, 5, 'sc-no-context', `[${i}]`);
        if (!sc.ko) add(id, 5, 'sc-no-ko', `[${i}]`);
        if (!sc.zh) add(id, 5, 'sc-no-zh', `[${i}]`);
      });
    }

    // Step 6: mistakes
    if (Array.isArray(card.mistakes)) {
      card.mistakes.forEach((m, i) => {
        for (const f of ['wrong', 'correct', 'note']) {
          if (typeof m[f] !== 'string' || !m[f].trim()) add(id, 6, 'mistake-empty', `[${i}].${f}`);
        }
      });
    }

    // Step 9: quickTable
    if (card.quickTable) {
      const qt = card.quickTable;
      if (!qt.title) add(id, 9, 'qt-no-title', '');
      if (!Array.isArray(qt.headers)) add(id, 9, 'qt-bad-headers', '');
      if (!Array.isArray(qt.rows)) add(id, 9, 'qt-bad-rows', '');
      else {
        qt.rows.forEach((row, ri) => {
          if (!Array.isArray(row)) add(id, 9, 'qt-row-not-array', `[${ri}]`);
          else if (row.length !== qt.headers.length) {
            add(id, 9, 'qt-col-mismatch', `row${ri} has ${row.length}, headers=${qt.headers.length}`);
          }
        });
      }
    }
  }

  // Step 7: specialQuiz (所有卡都查)
  if (card.specialQuiz) {
    const q = card.specialQuiz;
    if (!q.type || !VALID_QUIZ_TYPES.has(q.type)) add(id, 7, 'quiz-bad-type', q.type);
    if (typeof q.title !== 'string' || !q.title) add(id, 7, 'quiz-no-title', '');
    if (typeof q.body !== 'string') add(id, 7, 'quiz-bad-body', '');
    if (!Array.isArray(q.questions)) {
      add(id, 7, 'quiz-no-questions', '');
    } else {
      q.questions.forEach((qq, i) => {
        if (!Array.isArray(qq.options)) add(id, 7, 'q-bad-options', `Q${i+1}`);
        else if (qq.options.length < 2) add(id, 7, 'q-too-few-options', `Q${i+1} (${qq.options.length})`);
        if (typeof qq.answer !== 'number') add(id, 7, 'q-answer-not-number', `Q${i+1} answer=${qq.answer}`);
        else if (Array.isArray(qq.options) && (qq.answer < 0 || qq.answer >= qq.options.length)) {
          add(id, 7, 'q-answer-out-of-range', `Q${i+1} answer=${qq.answer} options.len=${qq.options.length}`);
        }
        if (typeof qq.explanation !== 'string' || !qq.explanation) add(id, 7, 'q-no-explanation', `Q${i+1}`);
        // prompt / pre+post 必须有一种
        const hasPrompt = !!qq.prompt;
        const hasPrePost = !!(qq.pre || qq.post);
        // judge 类型不强求
        if (q.type !== 'judge' && !hasPrompt && !hasPrePost) {
          add(id, 7, 'q-no-prompt', `Q${i+1}`);
        }
      });
    }
  }

  // Step 8: HTML 字段
  for (const f of ['step0Html', 'compareHtml', 'overviewHtml']) {
    if (f in card) {
      if (typeof card[f] !== 'string') add(id, 8, 'html-bad-type', f);
      else if (card[f].includes('<script')) add(id, 8, 'html-has-script', f);
    }
  }

  // Step 10: linkedGrammarIds (允许 g\d+ 或 card-pX-lY)
  if (Array.isArray(card.linkedGrammarIds)) {
    card.linkedGrammarIds.forEach((lid, i) => {
      if (typeof lid !== 'string' || !lid) add(id, 10, 'linked-empty', `[${i}]`);
      else if (lid === id) add(id, 10, 'linked-self', `[${i}] self-reference`);
      else if (!/^(g\d+|card-p\d+-l\d+)$/.test(lid)) add(id, 10, 'linked-bad-format', `[${i}] ${lid}`);
    });
  }
}

// 输出
console.log(`==== Code-QA 全章审查 ====\n`);
console.log(`卡片总数：${all.length}`);
console.log(`问题总数：${findings.length}\n`);

const byStep = {};
for (const f of findings) (byStep[f.step] ||= []).push(f);
const stepNames = {2:'结构字段',3:'connectionRules',4:'cardExamples',5:'scenarios',6:'mistakes',7:'specialQuiz',8:'HTML字段',9:'quickTable',10:'linkedGrammarIds',11:'partLoaders'};

for (const [step, items] of Object.entries(byStep).sort((a, b) => +a[0] - +b[0])) {
  console.log(`\n## Step ${step} (${stepNames[step]}) — ${items.length} 处`);
  const byKind = {};
  for (const f of items) (byKind[f.kind] ||= []).push(f);
  for (const [k, list] of Object.entries(byKind)) {
    console.log(`  [${k}] (${list.length})`);
    for (const f of list.slice(0, 8)) console.log(`    ${f.cardId}: ${f.detail}`);
    if (list.length > 8) console.log(`    ...(${list.length-8} more)`);
  }
}

if (!findings.length) console.log('\n✅ Code-QA 全 PASS');
