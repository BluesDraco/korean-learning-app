// scripts/full-audit-grammar.mjs
// 全面审查 P1-P14 所有语法卡（韩语内容 + 代码结构）

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');

// ========== 工具 ==========
function hasBatchim(syl) {
  // 韩文音节最后一个字符是否有终声
  if (!syl) return false;
  const ch = syl[syl.length - 1];
  const code = ch.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return null; // 非韩文音节
  return ((code - 0xAC00) % 28) !== 0;
}
function lastKoreanSyllable(str) {
  // 取字符串中最后一个韩文音节
  for (let i = str.length - 1; i >= 0; i--) {
    const c = str.charCodeAt(i);
    if (c >= 0xAC00 && c <= 0xD7A3) return str[i];
  }
  return null;
}

// ========== 加载全部卡 ==========
async function loadAll() {
  const all = [];
  for (let p = 1; p <= 14; p++) {
    const file = path.join(dataDir, `grammar-cards-p${p}.ts`);
    const url = 'file:///' + file.replace(/\\/g, '/');
    const mod = await import(url);
    const cards = mod[`grammarCardsP${p}`];
    for (const c of cards) all.push({ part: p, card: c });
  }
  return all;
}

const findings = [];
function add(cardId, kind, detail) { findings.push({ cardId, kind, detail }); }

// ========== 规则集 ==========
const REQUIRED_FIELDS = ['id','partNumber','lessonNumber','title','whatItDoes','whatItDoesBody','structures','connectionRules','cardExamples','scenarios','mistakes','linkedGrammarIds'];
const PRACTICE_REQUIRED = ['id','partNumber','lessonNumber','title','isPractice']; // specialQuiz 改为可选

// 汉韩混排检测：中文术语紧贴韩文助词 = 病句
const KOREAN_PARTICLES = /[가-힣]?(信息|注意|里面|时间|空间|发音|语法|准备|结果|条件|想法|事实|意见|原因|方法|帮助|移动|说话人|听话人|主语|宾语|谓语)(이|을|는|에|를|로|의|과|와|도|만|에서)/;

async function main() {
  const all = await loadAll();
  console.log(`Loaded ${all.length} cards from P1-P14`);

  for (const { part, card } of all) {
    const cardId = card.id;
    const isPractice = card.isPractice === true;

    // -- 1) 结构字段检查 --
    const required = isPractice ? PRACTICE_REQUIRED : REQUIRED_FIELDS;
    for (const f of required) {
      if (!(f in card)) add(cardId, 'missing-field', f);
    }

    // -- 2) ID 格式 --
    if (!/^card-p\d+-l\d+$/.test(cardId)) add(cardId, 'bad-id-format', cardId);
    const expectedPart = `card-p${card.partNumber}-`;
    if (!cardId.startsWith(expectedPart)) add(cardId, 'partNumber-mismatch', `${cardId} vs partNumber ${card.partNumber}`);

    if (isPractice) continue;

    // -- 3) structures 数量（仅普通卡，综合卡放宽）--
    if (!card.structures || card.structures.length < 3) {
      add(cardId, 'structures-too-few', `${card.structures?.length || 0} (要≥3)`);
    }
    // structures token text 拼接是否还原 ko
    if (Array.isArray(card.structures)) {
      card.structures.forEach((s, i) => {
        if (!s.ko) { add(cardId, 'structures-no-ko', `[${i}]`); return; }
        if (Array.isArray(s.tokens)) {
          // 比较时忽略：空格 / 标点 / "+"号（语法结构占位符）
          const clean = (str) => str.replace(/[\s.,。，?？!！·:：;；++()（）]+/g, '');
          const joined = clean(s.tokens.map(t => t.text).join(''));
          const koClean = clean(s.ko);
          if (joined !== koClean) {
            add(cardId, 'structures-token-mismatch', `[${i}] tokens="${joined}" vs ko="${koClean}"`);
          }
        }
      });
    }

    // -- 4) connectionRules 数量 + 内容 --
    if (!card.connectionRules || card.connectionRules.length < 5) {
      add(cardId, 'connectionRules-too-few', `${card.connectionRules?.length || 0} (要≥5)`);
    }
    if (Array.isArray(card.connectionRules)) {
      card.connectionRules.forEach((r, i) => {
        if (typeof r === 'string') return;
        if (!r.text) add(cardId, 'connectionRule-no-text', `[${i}]`);
        // 汉韩混排
        const allFields = [r.text, r.examples].filter(Boolean).join(' ');
        if (KOREAN_PARTICLES.test(allFields)) {
          add(cardId, 'connectionRule-mixed-script', `[${i}] ${r.text?.slice(0, 60)}`);
        }
      });
      // 相邻 rule 重复
      for (let i = 1; i < card.connectionRules.length; i++) {
        const a = card.connectionRules[i - 1];
        const b = card.connectionRules[i];
        if (a && b && a.text && a.text === b.text) {
          add(cardId, 'connectionRule-duplicate', `[${i-1},${i}] ${a.text.slice(0, 50)}`);
        }
      }
    }

    // -- 5) cardExamples 检查 --
    if (!card.cardExamples || card.cardExamples.length < 3) {
      add(cardId, 'cardExamples-too-few', `${card.cardExamples?.length || 0} (要≥3)`);
    }
    if (Array.isArray(card.cardExamples)) {
      card.cardExamples.forEach((ex, i) => {
        if (!ex.wordBlocks || !ex.wordBlocks.length) add(cardId, 'cardExample-no-blocks', `[${i}]`);
        if (!ex.zh) add(cardId, 'cardExample-no-zh', `[${i}]`);
        // swapWords[0] 是替换组的第一项（用于替换练习），可以不在 wordBlocks 内 — 这是设计模式，不检查
      });
    }

    // -- 6) scenarios 检查 --
    if (!card.scenarios || card.scenarios.length < 5) {
      add(cardId, 'scenarios-too-few', `${card.scenarios?.length || 0} (要≥5)`);
    }
    if (Array.isArray(card.scenarios)) {
      card.scenarios.forEach((s, i) => {
        if (!s.ko) add(cardId, 'scenario-no-ko', `[${i}]`);
        if (!s.zh) add(cardId, 'scenario-no-zh', `[${i}]`);
        if (KOREAN_PARTICLES.test(s.ko || '')) {
          add(cardId, 'scenario-mixed-script', `[${i}] "${s.ko?.slice(0, 50)}"`);
        }
      });
    }

    // -- 7) mistakes 检查（高风险）--
    if (!card.mistakes || card.mistakes.length < 3) {
      add(cardId, 'mistakes-too-few', `${card.mistakes?.length || 0} (要≥3)`);
    }
    if (Array.isArray(card.mistakes)) {
      card.mistakes.forEach((m, i) => {
        if (!m.wrong || !m.correct || !m.note) {
          add(cardId, 'mistake-missing-field', `[${i}]`); return;
        }
        // 提取核心韩文部分（去掉中文括号注释）
        const wrongCore = (m.wrong.split('（')[0] || m.wrong).trim();
        const correctCore = (m.correct.split('（')[0] || m.correct).trim();
        if (wrongCore === correctCore) {
          add(cardId, 'mistake-wrong-eq-correct', `[${i}] "${wrongCore}"`);
        }
        if (KOREAN_PARTICLES.test(m.wrong) || KOREAN_PARTICLES.test(m.correct)) {
          add(cardId, 'mistake-mixed-script', `[${i}]`);
        }
      });
    }

    // -- 8) specialQuiz 检查（最高风险）--
    if (card.specialQuiz) {
      const q = card.specialQuiz;
      if (!q.type || !['morph', 'judge', 'fill'].includes(q.type)) {
        add(cardId, 'quiz-bad-type', q.type);
      }
      if (!Array.isArray(q.questions) || q.questions.length < 4) {
        add(cardId, 'quiz-too-few-questions', `${q.questions?.length || 0} (要≥4)`);
      }
      if (Array.isArray(q.questions)) {
        q.questions.forEach((qq, i) => {
          if (!Array.isArray(qq.options) || qq.options.length < 2) {
            add(cardId, 'quiz-bad-options', `Q${i+1}`);
            return;
          }
          if (typeof qq.answer !== 'number') {
            add(cardId, 'quiz-answer-not-number', `Q${i+1} answer=${qq.answer}`);
          }
          if (qq.answer < 0 || qq.answer >= qq.options.length) {
            add(cardId, 'quiz-answer-out-of-range', `Q${i+1} answer=${qq.answer} options.len=${qq.options.length}`);
          }
          if (!qq.explanation) add(cardId, 'quiz-no-explanation', `Q${i+1}`);
          // prompt or pre/post 必须有一种（judge 类型可以只看 options）
          if (q.type !== 'judge' && !qq.prompt && !qq.pre && !qq.post) {
            add(cardId, 'quiz-no-prompt-or-prepost', `Q${i+1}`);
          }
        });
      }
    }

    // -- 9) linkedGrammarIds 格式 --
    if (Array.isArray(card.linkedGrammarIds)) {
      card.linkedGrammarIds.forEach((lid, i) => {
        if (typeof lid !== 'string' || !lid) {
          add(cardId, 'linked-bad-format', `[${i}] ${lid}`);
        }
        if (lid === cardId) {
          add(cardId, 'linked-self', `[${i}] self-reference`);
        }
      });
    }

    // -- 10) HTML 字段不含 <script> --
    for (const f of ['step0Html', 'compareHtml', 'overviewHtml']) {
      if (card[f] && /<script/i.test(card[f])) {
        add(cardId, 'html-has-script', f);
      }
    }
  }

  // ========== 输出 ==========
  console.log(`\n==== 全面审查报告 ====\n`);
  console.log(`卡片总数：${all.length}`);
  console.log(`总问题数：${findings.length}\n`);

  const byKind = {};
  for (const f of findings) (byKind[f.kind] ||= []).push(f);

  // 按严重程度排序
  const severityOrder = [
    'mistake-wrong-eq-correct',
    'quiz-answer-out-of-range',
    'quiz-answer-not-number',
    'structures-token-mismatch',
    'cardExample-swap-orphan',
    'connectionRule-mixed-script',
    'scenario-mixed-script',
    'mistake-mixed-script',
    'connectionRule-duplicate',
    'connectionRule-no-text',
    'mistake-missing-field',
    'quiz-bad-options',
    'quiz-no-explanation',
    'quiz-no-prompt-or-prepost',
    'quiz-too-few-questions',
    'quiz-bad-type',
    'missing-field',
    'bad-id-format',
    'partNumber-mismatch',
    'structures-too-few',
    'connectionRules-too-few',
    'cardExamples-too-few',
    'scenarios-too-few',
    'mistakes-too-few',
    'linked-bad-format',
    'linked-self',
    'html-has-script',
    'cardExample-no-blocks',
    'cardExample-no-zh',
    'scenario-no-ko',
    'scenario-no-zh',
    'structures-no-ko',
  ];

  for (const kind of severityOrder) {
    if (!byKind[kind]) continue;
    const items = byKind[kind];
    console.log(`\n[${kind}] (${items.length})`);
    for (const f of items) console.log(`  ${f.cardId}: ${f.detail}`);
  }
  // 列出剩下未在 severityOrder 的
  for (const [kind, items] of Object.entries(byKind)) {
    if (severityOrder.includes(kind)) continue;
    console.log(`\n[${kind}] (${items.length})`);
    for (const f of items) console.log(`  ${f.cardId}: ${f.detail}`);
  }

  if (findings.length === 0) console.log('\n✅ 全部通过，无问题');
}

main();
