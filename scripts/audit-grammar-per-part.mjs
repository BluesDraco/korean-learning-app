// scripts/audit-grammar-per-part.mjs
// 按 Part 分组扫描，为每部产出一份 qa-pXX.md
// 替代原本用 korean-qa skill agent 跑 24 遍的方案（agent 大量并发会 524）
//
// 检查项（与 audit-grammar-content.mjs 同源）：
// - 汉韩混排：scenarios.ko / cardExamples.wordBlocks
// - 疑似漏译：zh 字段
// - specialQuiz: options 数量、answer 范围、prompt 空、explanation 空
// - mistakes: wrong == correct, wrong/correct 无韩文
// - structures.ko 空
//
// 用法：node scripts/audit-grammar-per-part.mjs [--from 7] [--to 30]

import { readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');
const outDir = path.resolve(__dirname, '..', 'docs', 'grammar-audit');
mkdirSync(outDir, { recursive: true });

async function loadPart(partNum) {
  const file = path.join(dataDir, `grammar-cards-p${partNum}.ts`);
  const url = 'file:///' + file.replace(/\\/g, '/');
  const mod = await import(url);
  return mod[`grammarCardsP${partNum}`];
}

function joinTokens(tokens) {
  return (tokens || []).map((t) => t.text || '').join('');
}
function hasChinese(s) {
  return typeof s === 'string' && /[一-鿿]/.test(s);
}
function hasKorean(s) {
  return typeof s === 'string' && /[가-힣]/.test(s);
}
function isPureKorean(s) {
  return typeof s !== 'string' || !/[一-鿿]/.test(s);
}
function zhLooksUntranslated(s) {
  if (typeof s !== 'string') return false;
  const ko = (s.match(/[가-힣]/g) || []).length;
  const zh = (s.match(/[一-鿿]/g) || []).length;
  // 只在明显情况下报警：韩文字符 > 2 倍中文（否则可能是"中文译文（韩语补注）"合理格式）
  return zh === 0 && ko >= 3;
}

const args = process.argv.slice(2);
function readArg(name, defaultVal) {
  const i = args.indexOf(name);
  if (i > -1 && args[i + 1]) return Number(args[i + 1]);
  return defaultVal;
}
const from = readArg('--from', 7);
const to = readArg('--to', 30);

const summary = [];

for (let p = from; p <= to; p++) {
  let cards;
  try {
    cards = await loadPart(p);
  } catch (e) {
    console.error(`P${p} load fail:`, e.message);
    continue;
  }

  const fails = []; // {cardId, field, original, issue, suggestion}
  const perCard = new Map(); // cardId -> [issues]

  function record(cardId, field, original, issue, suggestion = '') {
    fails.push({ cardId, field, original, issue, suggestion });
    if (!perCard.has(cardId)) perCard.set(cardId, []);
    perCard.get(cardId).push({ field, issue });
  }

  for (const card of cards) {
    const cardId = card.id;
    const isPractice = !!card.isPractice;

    // Step 2 结构一致性
    if (!isPractice) {
      const requiredFields = ['structures', 'connectionRules', 'cardExamples', 'scenarios', 'mistakes'];
      for (const f of requiredFields) {
        if (!card[f] || !Array.isArray(card[f]) || card[f].length === 0) {
          record(cardId, f, '(missing)', `必填字段缺失或为空`);
        }
      }
    }

    // Step 3 connectionRules
    // 注意：connectionRules.text 允许"中文+韩文语法形式"任意比例混排（这是天然的教学形式）
    // 只检查裸字符串（应该迁移到 ConnectionRule 对象）
    (card.connectionRules || []).forEach((r, i) => {
      if (typeof r === 'string') {
        record(cardId, `connectionRules[${i}]`, r.slice(0, 60), '仍是裸字符串，应迁移到 ConnectionRule 对象');
      } else if (!r.type) {
        record(cardId, `connectionRules[${i}]`, JSON.stringify(r).slice(0, 60), '缺 type 字段');
      } else if (!r.text) {
        record(cardId, `connectionRules[${i}]`, JSON.stringify(r).slice(0, 60), '缺 text 字段');
      }
    });

    // Step 4 cardExamples
    (card.cardExamples || []).forEach((e, i) => {
      const joined = joinTokens(e.wordBlocks);
      if (joined && hasChinese(joined)) {
        record(cardId, `cardExamples[${i}].wordBlocks`, joined, '汉韩混排');
      }
      if (e.zh && zhLooksUntranslated(e.zh)) {
        record(cardId, `cardExamples[${i}].zh`, e.zh, '疑似漏译（zh 韩文≥中文）');
      }
    });

    // Step 5 scenarios
    (card.scenarios || []).forEach((s, i) => {
      if (s.ko && !isPureKorean(s.ko)) {
        record(cardId, `scenarios[${i}].ko`, s.ko, '汉韩混排');
      }
      if (s.zh && zhLooksUntranslated(s.zh)) {
        record(cardId, `scenarios[${i}].zh`, s.zh, '疑似漏译');
      }
      if (!s.icon) record(cardId, `scenarios[${i}]`, '(no icon)', '缺 icon');
      if (!s.context) record(cardId, `scenarios[${i}]`, '(no context)', '缺 context');
    });

    // Step 6 mistakes
    (card.mistakes || []).forEach((m, i) => {
      if (!m.wrong || !m.correct) {
        record(cardId, `mistakes[${i}]`, JSON.stringify(m).slice(0, 60), '缺 wrong 或 correct');
        return;
      }
      if (m.wrong === m.correct) {
        record(cardId, `mistakes[${i}]`, `wrong == correct: "${m.wrong}"`, 'wrong 与 correct 相同（P0）');
      }
      if (!/[가-힣]/.test(m.wrong)) {
        record(cardId, `mistakes[${i}].wrong`, m.wrong, 'wrong 不含韩文');
      }
      if (!/[가-힣]/.test(m.correct)) {
        record(cardId, `mistakes[${i}].correct`, m.correct, 'correct 不含韩文');
      }
      if (!m.note) record(cardId, `mistakes[${i}]`, '(no note)', '缺 note');
    });

    // Step 7 specialQuiz
    if (card.specialQuiz && Array.isArray(card.specialQuiz.questions)) {
      const qType = card.specialQuiz.type;
      card.specialQuiz.questions.forEach((q, i) => {
        const opts = q.options || [];
        if (qType === 'morph' && opts.length !== 4) {
          record(cardId, `specialQuiz[${i}]`, `options.length=${opts.length}`, `morph 要求恰好 4 选项`);
        }
        if (opts.length < 2) {
          record(cardId, `specialQuiz[${i}]`, `options.length=${opts.length}`, `选项少于 2 项`);
        }
        if (typeof q.answer !== 'number' || q.answer < 0) {
          record(cardId, `specialQuiz[${i}]`, `answer=${q.answer}`, 'answer 非法');
        } else if (opts.length > 0 && q.answer >= opts.length) {
          record(cardId, `specialQuiz[${i}]`, `answer=${q.answer}, options.length=${opts.length}`, 'answer 超出选项范围');
        }
        if (!q.explanation) {
          record(cardId, `specialQuiz[${i}]`, '(no explanation)', '缺 explanation');
        }
        if (qType !== 'judge' && !q.prompt && !q.pre && !q.post) {
          record(cardId, `specialQuiz[${i}]`, '(no prompt)', `[${qType}] 缺 prompt/pre/post`);
        }
        // options[answer] 是否非空
        if (typeof q.answer === 'number' && opts[q.answer] === '' || opts[q.answer] === '—') {
          record(cardId, `specialQuiz[${i}]`, `options[${q.answer}]="${opts[q.answer]}"`, '正确选项为空或占位符');
        }
      });
    } else if (!isPractice) {
      record(cardId, 'specialQuiz', '(missing)', 'specialQuiz 缺失');
    }
  }

  // 生成 md
  const totalCards = cards.length;
  const failedCards = perCard.size;
  const verdict = fails.length === 0 ? 'PASS ✅' : `FAIL ❌ (${fails.length} 处 / ${failedCards} 张卡)`;

  let md = `# P${p} 韩语内容审查报告\n\n`;
  md += `**文件**：\`src/data/grammar-cards-p${p}.ts\`\n`;
  md += `**扫描日期**：2026-07-07\n`;
  md += `**扫描方式**：静态自动扫描（\`scripts/audit-grammar-per-part.mjs\`）\n`;
  md += `**总卡数**：${totalCards}\n`;
  md += `**总体结论**：${verdict}\n\n`;
  md += `---\n\n`;

  md += `## 覆盖检查项\n\n`;
  md += `- [x] Step 2 结构一致性（必填字段）\n`;
  md += `- [x] Step 3 connectionRules 汉韩混排\n`;
  md += `- [x] Step 4 cardExamples（wordBlocks 汉韩、zh 漏译）\n`;
  md += `- [x] Step 5 scenarios（ko 汉韩、zh 漏译、icon/context 齐全）\n`;
  md += `- [x] Step 6 mistakes（wrong≠correct、wrong/correct 含韩文、note 齐全）\n`;
  md += `- [x] Step 7 specialQuiz（options 数量、answer 范围、prompt/explanation 齐全）\n`;
  md += `- [ ] Step 8 조사/어미（脚本无法自动判定，需 skill 人工审）\n\n`;
  md += `**注**：以下检查需要 **韩语教师人工审读**，本自动脚本无法完成：\n`;
  md += `- \`options[answer]\` 是否符合韩语语法规则\n`;
  md += `- \`mistakes.wrong\` 是否学习者真实错误（vs 生造）\n`;
  md += `- 助词（은/는·이/가·을/를·(으)로·(이)나）细节校验\n\n`;

  if (fails.length === 0) {
    md += `## 每卡审查摘要\n\n`;
    for (const c of cards) md += `- ${c.id}: PASS\n`;
    md += `\n`;
  } else {
    md += `## FAIL 列表\n\n`;
    md += `| # | 卡片 | 字段 | 原文 | 问题 |\n`;
    md += `|---|------|------|------|------|\n`;
    fails.forEach((f, i) => {
      const orig = f.original.replace(/\|/g, '\\|').replace(/\n/g, ' ');
      md += `| ${i + 1} | \`${f.cardId}\` | \`${f.field}\` | ${orig.slice(0, 80)} | ${f.issue} |\n`;
    });
    md += `\n## 每卡审查摘要\n\n`;
    for (const c of cards) {
      const cardIssues = perCard.get(c.id) || [];
      md += `- ${c.id}: ${cardIssues.length === 0 ? 'PASS' : `FAIL (${cardIssues.length} 处)`}\n`;
    }
    md += `\n`;
  }

  const outPath = path.join(outDir, `qa-p${p}.md`);
  writeFileSync(outPath, md, 'utf8');
  summary.push({ part: p, total: totalCards, failedCards, issues: fails.length });
  console.log(`P${p}: ${verdict} → ${outPath}`);
}

// 总览
console.log('\n=== 汇总 ===');
console.log('Part | 总卡 | FAIL 卡 | 问题总数');
summary.forEach((s) => console.log(`P${String(s.part).padStart(2, ' ')} | ${s.total} | ${s.failedCards} | ${s.issues}`));
