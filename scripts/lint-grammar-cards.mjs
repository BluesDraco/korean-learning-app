/**
 * lint-grammar-cards.mjs
 * 语法卡片内容质量检查脚本
 * 用法: node scripts/lint-grammar-cards.mjs
 */

import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// ─── 配置 ───────────────────────────────────────────────────────────────────

const CARD_FILES = [
  'src/data/grammar-cards.ts',
  'src/data/grammar-cards-p1.ts',
  'src/data/grammar-cards-p2.ts',
  'src/data/grammar-cards-p3.ts',
  'src/data/grammar-cards-p4.ts',
  'src/data/grammar-cards-p5.ts',
  'src/data/grammar-cards-p6.ts',
  'src/data/grammar-cards-p7.ts',
  'src/data/grammar-cards-p8.ts',
  'src/data/grammar-cards-p9.ts',
  'src/data/grammar-cards-p10.ts',
  'src/data/grammar-cards-p11.ts',
  'src/data/grammar-cards-p12.ts',
  'src/data/grammar-cards-p13.ts',
  'src/data/grammar-cards-p14.ts',
];

// 汉字范围
const HAN_RE = /[一-鿿㐀-䶿]/;

// specialQuiz 选项不允许的占位符
const PLACEHOLDER_RE = /^[—\-–]+$/;

// 合法的 role 值
const VALID_ROLES = new Set(['subject', 'object', 'verb', 'place', 'time', 'plain']);

// 中文说明字段里明确不允许的完整韩文词
// 这些词是"中文概念词被写成韩文"的典型错误
const KO_WORDS_FORBIDDEN_IN_ZH = [
  /강조/,    // 应写"强调"
  /강調/,    // 混拼
  /동词/,    // 应写"动词"
  /형容词/,  // 应写"形容词"
  /동사词干/, // 应写"动词词干"
  /名词\/동사/, // 混排
  /동사어간/, // 应写"动词词干"
];

// ─── 工具函数 ────────────────────────────────────────────────────────────────

const errors = [];
const warnings = [];

function err(file, cardId, field, msg, snippet = '') {
  errors.push({ file, cardId, field, msg, snippet: String(snippet).slice(0, 80) });
}

function warn(file, cardId, field, msg, snippet = '') {
  warnings.push({ file, cardId, field, msg, snippet: String(snippet).slice(0, 80) });
}

// 检查 overviewHtml/step0Html/compareHtml 里 <div class="ko"> 内容是否含中文汉字
function checkHtmlKoBlocks(file, cardId, field, html) {
  if (!html) return;
  const koBlocks = [...html.matchAll(/<div class="ko">([^<]*)<\/div>/g)];
  for (const [, inner] of koBlocks) {
    if (HAN_RE.test(inner)) {
      err(file, cardId, field, `<div class="ko"> 里含中文汉字`, inner);
    }
  }
}

// 检查中文说明字段里是否有明确禁止的韩文词（严格白名单模式）
function checkForbiddenKoInZh(file, cardId, field, value) {
  if (!value || typeof value !== 'string') return;
  for (const re of KO_WORDS_FORBIDDEN_IN_ZH) {
    const m = value.match(re);
    if (m) {
      err(file, cardId, field, `中文说明字段含禁止韩文词 "${m[0]}"`, value.slice(Math.max(0, value.indexOf(m[0]) - 10), value.indexOf(m[0]) + 20));
    }
  }
}

// ─── 加载卡片数据 ─────────────────────────────────────────────────────────────

function loadCards(filePath) {
  const abs = path.resolve(root, filePath);
  const src = readFileSync(abs, 'utf8');
  try {
    const match = src.match(/export const \w+[^=]*=\s*(\[[\s\S]*\]);?\s*$/);
    if (!match) return [];
    // 去掉 TS 类型断言：`val as 0|1|2|3` / `val as const` 等
    const cleaned = match[1]
      .replace(/\s+as\s+const\b/g, '')
      .replace(/\s+as\s+[A-Za-z_$][\w$]*(\s*<[^>]+>)?(\s*\|\s*[A-Za-z0-9_$|]+)*/g, '')
      .replace(/\s+as\s+\d+(\s*\|\s*\d+)+/g, '');
     
    const cards = Function(`"use strict"; return (${cleaned})`)();
    return Array.isArray(cards) ? cards : [];
  } catch (e) {
    console.error(`  [ERROR] 加载 ${filePath} 失败:`, e.message.slice(0, 120));
    return [];
  }
}

// ─── 检查函数 ─────────────────────────────────────────────────────────────────

function checkCard(file, card) {
  const id = card.id || '(unknown)';

  // 1. structures
  if (Array.isArray(card.structures)) {
    for (const s of card.structures) {
      // ko 字段含中文汉字
      if (s.ko && HAN_RE.test(s.ko)) {
        err(file, id, 'structures.ko', `ko 字段含中文汉字`, s.ko);
      }
      // tokens role 合法性
      if (Array.isArray(s.tokens)) {
        for (const t of s.tokens) {
          if (t.role && !VALID_ROLES.has(t.role)) {
            err(file, id, 'structures.tokens.role', `非法 role 值 "${t.role}"`, t.text);
          }
        }
      }
    }
  }

  // 2. scenarios
  if (Array.isArray(card.scenarios)) {
    for (const s of card.scenarios) {
      if (s.ko && HAN_RE.test(s.ko)) {
        err(file, id, 'scenarios.ko', `ko 字段含中文汉字`, s.ko);
      }
      if ('situation' in s) err(file, id, 'scenarios', `含非法字段 "situation"，应为 "context"`);
      if ('note' in s && !('tip' in s)) err(file, id, 'scenarios', `含非法字段 "note"，应为 "tip"`);
    }
  }

  // 3. cardExamples
  if (Array.isArray(card.cardExamples)) {
    for (const ex of card.cardExamples) {
      if ('ko' in ex) err(file, id, 'cardExamples', `含非法顶层字段 "ko"`);
      if (ex.swapWords) {
        for (const sw of ex.swapWords) {
          if (typeof sw !== 'string') {
            err(file, id, 'cardExamples.swapWords', `swapWords 元素不是 string`, JSON.stringify(sw));
          }
        }
      }
      if (Array.isArray(ex.wordBlocks)) {
        for (const wb of ex.wordBlocks) {
          if (wb.role && !VALID_ROLES.has(wb.role)) {
            err(file, id, 'cardExamples.wordBlocks.role', `非法 role 值 "${wb.role}"`, wb.text);
          }
        }
      }
    }
  }

  // 4. mistakes
  if (Array.isArray(card.mistakes)) {
    for (const m of card.mistakes) {
      if (m.wrong && m.correct && m.wrong.trim() === m.correct.trim()) {
        err(file, id, 'mistakes', `wrong 和 correct 内容相同`, m.wrong);
      }
      // note 字段里的禁止韩文词
      if (m.note) checkForbiddenKoInZh(file, id, 'mistakes.note', m.note);
    }
  }

  // 5. specialQuiz
  if (card.specialQuiz) {
    const quiz = card.specialQuiz;
    // 只有综合练习卡（isPractice）的 fill 类型要求4选项和答案分布
    const isPracticeQuiz = card.isPractice && quiz.type === 'fill';
    if (Array.isArray(quiz.questions)) {
      if (isPracticeQuiz && quiz.questions.length < 8) {
        warn(file, id, 'specialQuiz', `综合练习 fill 类型题目数量 ${quiz.questions.length} < 8`);
      }
      if (isPracticeQuiz) {
        const answers = quiz.questions.map(q => q.answer);
        const counts = [0, 1, 2, 3].map(i => answers.filter(a => a === i).length);
        const maxCount = Math.max(...counts);
        if (maxCount === answers.length) {
          err(file, id, 'specialQuiz', `所有答案均为 ${answers[0]}，分布完全集中`);
        } else if (maxCount > answers.length * 0.6) {
          warn(file, id, 'specialQuiz', `答案分布不均：[0]${counts[0]} [1]${counts[1]} [2]${counts[2]} [3]${counts[3]}`);
        }
      }
      for (const [qi, q] of quiz.questions.entries()) {
        if (isPracticeQuiz && (!q.options || q.options.length !== 4)) {
          err(file, id, 'specialQuiz', `第${qi+1}题 options 数量 ${q.options?.length ?? 0} ≠ 4`);
        }
        if (q.options) {
          for (const opt of q.options) {
            if (PLACEHOLDER_RE.test(String(opt))) {
              err(file, id, 'specialQuiz', `第${qi+1}题含占位符选项 "${opt}"`);
            }
          }
        }
        if (typeof q.answer !== 'number' || q.answer < 0 || q.answer > 3) {
          err(file, id, 'specialQuiz', `第${qi+1}题 answer=${q.answer} 超出 0-3 范围`);
        }
      }
    }
  }

  // 6. connectionRules 禁止韩文词检查（仅 text 字段，examples 放行）
  if (Array.isArray(card.connectionRules)) {
    for (const r of card.connectionRules) {
      if (typeof r === 'object' && r.text) {
        checkForbiddenKoInZh(file, id, 'connectionRules.text', r.text);
      }
    }
  }

  // 7. 中文说明字段禁止韩文词
  for (const field of ['whatItDoes', 'whatItDoesBody', 'structureNote', 'rulesNote', 'scenarioNote']) {
    if (card[field]) checkForbiddenKoInZh(file, id, field, card[field]);
  }

  // 8. HTML 字段 ko div 检查
  for (const field of ['overviewHtml', 'step0Html', 'compareHtml']) {
    if (card[field]) checkHtmlKoBlocks(file, id, field, card[field]);
  }

  // 9. 内容数量下限（非练习卡）
  if (!card.isPractice) {
    if (!Array.isArray(card.structures) || card.structures.length < 2) {
      warn(file, id, 'structures', `数量 ${card.structures?.length ?? 0} < 2`);
    }
    if (!Array.isArray(card.connectionRules) || card.connectionRules.length < 5) {
      warn(file, id, 'connectionRules', `数量 ${card.connectionRules?.length ?? 0} < 5`);
    }
    if (!Array.isArray(card.cardExamples) || card.cardExamples.length < 3) {
      warn(file, id, 'cardExamples', `数量 ${card.cardExamples?.length ?? 0} < 3`);
    }
    if (!Array.isArray(card.scenarios) || card.scenarios.length < 5) {
      warn(file, id, 'scenarios', `数量 ${card.scenarios?.length ?? 0} < 5`);
    }
    if (!Array.isArray(card.mistakes) || card.mistakes.length < 3) {
      warn(file, id, 'mistakes', `数量 ${card.mistakes?.length ?? 0} < 3`);
    }
  }
}

// ─── 主流程 ───────────────────────────────────────────────────────────────────

console.log('=== 语法卡片内容 Lint ===\n');

let totalCards = 0;

for (const file of CARD_FILES) {
  const cards = loadCards(file);
  if (cards.length === 0) {
    console.log(`  [SKIP] ${file}`);
    continue;
  }
  totalCards += cards.length;
  for (const card of cards) {
    checkCard(file, card);
  }
  console.log(`  ✓ ${file} — ${cards.length} 张卡片`);
}

console.log('');

if (errors.length === 0 && warnings.length === 0) {
  console.log(`✅ 全部通过！共检查 ${totalCards} 张卡片，无问题。`);
  process.exit(0);
}

if (errors.length > 0) {
  console.log(`❌ 错误 (${errors.length} 项)：\n`);
  for (const e of errors) {
    const snippet = e.snippet ? `  →  "${e.snippet}"` : '';
    console.log(`  [${e.cardId}] ${e.field}: ${e.msg}${snippet}`);
  }
  console.log('');
}

if (warnings.length > 0) {
  console.log(`⚠️  警告 (${warnings.length} 项)：\n`);
  for (const w of warnings) {
    const snippet = w.snippet ? `  →  "${w.snippet}"` : '';
    console.log(`  [${w.cardId}] ${w.field}: ${w.msg}${snippet}`);
  }
  console.log('');
}

console.log(`共检查 ${totalCards} 张卡片。`);
process.exit(errors.length > 0 ? 1 : 0);
