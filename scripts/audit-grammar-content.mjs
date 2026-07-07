// scripts/audit-grammar-content.mjs
// 扫 P1-P30 所有语法卡，找韩语内容问题：
// 1) 助词错误（은/는 · 이/가 · 을/를 · (으)로 · (이)나 与前字받침是否一致）
// 2) tokens/wordBlocks 拼合是否还原 ko 句
// 3) 汉韩混排（字段里同时有汉字和韩文字符）
// 4) specialQuiz.options 数量必须 = 4
// 5) specialQuiz.answer 必须在 0-3
// 6) mistakes 里 wrong !== correct
// 7) mistakes.wrong 是否至少含韩文（不能是纯中文标签）
// 用法：node scripts/audit-grammar-content.mjs [--json out.json]

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');

// -------- 韩语受音（받침）判定 --------
// 判断一个韩文字符是否有받침；给汉字或空格返回 null 表示无法判定
function hasBatchim(ch) {
  if (!ch) return null;
  const code = ch.charCodeAt(0);
  // 韩文音节: 0xAC00-0xD7A3
  if (code < 0xAC00 || code > 0xD7A3) return null;
  const idx = code - 0xAC00;
  const jong = idx % 28; // 0=无받침
  return jong !== 0;
}
// 提取一段文本"最后一个韩文字符"
function lastKoreanChar(s) {
  for (let i = s.length - 1; i >= 0; i--) {
    const ch = s[i];
    const code = ch.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7A3) return ch;
    // 数字/英文/汉字都跳过找不到韩文
  }
  return null;
}

// -------- 助词校验（已停用）--------
// 助词与冠形/连接词尾/复合词尾同形太多（는/은/을/이/가/나/라든가），
// 靠字符串规则识别名词太不准。整体停用，改由 korean-qa skill 人工审。

// -------- tokens/wordBlocks 拼合校验 --------
function normalizeSpace(s) {
  return (s || '').replace(/\s+/g, '').replace(/[.,!?~"'()（）「」【】、。？！]/g, '');
}
function joinTokens(tokens) {
  return (tokens || []).map((t) => t.text || '').join('');
}
function checkTokensSum(ko, tokens) {
  const a = normalizeSpace(ko);
  const b = normalizeSpace(joinTokens(tokens));
  if (a === b) return null;
  return { ko, joined: joinTokens(tokens), diff: `ko="${a}" tokens="${b}"` };
}

// -------- 汉韩混排 --------
// ko 字段严格纯韩（不能有一个汉字）；zh 字段宽松（可以有韩语术语引用），只警告 ko 有汉字
function hasChinese(s) {
  if (typeof s !== 'string') return false;
  return /[一-鿿]/.test(s);
}
function hasKorean(s) {
  if (typeof s !== 'string') return false;
  return /[가-힣]/.test(s);
}
function isPureKorean(s) {
  if (typeof s !== 'string') return true;
  return !/[一-鿿]/.test(s);
}
// zh 里如果**主体是中文**但夹了几个韩文字符可能是引用韩语术语，不算错
// 只当 zh 字段的韩文字符数 > 中文字符数 才报（说明整段可能没翻译）
function zhLooksUntranslated(s) {
  if (typeof s !== 'string') return false;
  const ko = (s.match(/[가-힣]/g) || []).length;
  const zh = (s.match(/[一-鿿]/g) || []).length;
  return ko > 0 && ko >= zh; // 韩文比中文还多 → 疑似漏译
}

// -------- 加载 --------
async function loadPart(partNum) {
  const file = path.join(dataDir, `grammar-cards-p${partNum}.ts`);
  const url = 'file:///' + file.replace(/\\/g, '/');
  const mod = await import(url);
  return mod[`grammarCardsP${partNum}`];
}

// -------- 主流程 --------
const findings = [];
function add(cardId, kind, detail, severity = 'ERROR') {
  findings.push({ cardId, kind, detail, severity });
}

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

    // ---- structures ----
    // 注意：structures.ko 通常是"公式展示"（可含中文括号标注、连字符、+号），
    // 不是完整韩文句子。所以不做助词校验、不做汉字校验、不做拼合校验。
    // 只做基本存在性检查。
    (card.structures || []).forEach((s, i) => {
      if (s && !s.ko) {
        add(cardId, 'structures-empty-ko', `structures[${i}].ko is empty`);
      }
    });

    // ---- cardExamples ----
    // wordBlocks 是词块数组，每个 block 是一个词或短语，拼合是完整句
    // 但脚本"拼合后跑助词"会误把相邻两个 block 当一个词看，误报太多
    // 所以只做汉字检查 + zh 检查，不做拼合后助词校验
    (card.cardExamples || []).forEach((e, i) => {
      const joined = joinTokens(e.wordBlocks);
      if (joined && hasChinese(joined)) {
        add(cardId, 'zh-in-wordblocks', `cardExamples[${i}] wordBlocks contains Chinese: "${joined}"`);
      }
      if (e.zh && zhLooksUntranslated(e.zh)) {
        add(cardId, 'zh-untranslated', `cardExamples[${i}].zh looks untranslated: "${e.zh}"`);
      }
    });

    // ---- scenarios ----
    (card.scenarios || []).forEach((s, i) => {
      if (s.ko && !isPureKorean(s.ko)) {
        add(cardId, 'zh-in-ko', `scenarios[${i}].ko contains Chinese: "${s.ko}"`);
      }
      if (s.zh && zhLooksUntranslated(s.zh)) {
        add(cardId, 'zh-untranslated', `scenarios[${i}].zh looks untranslated: "${s.zh}"`);
      }
    });

    // ---- mistakes ----
    (card.mistakes || []).forEach((m, i) => {
      if (!m.wrong || !m.correct) {
        add(cardId, 'mistake-missing-field', `mistakes[${i}] wrong/correct missing`);
        return;
      }
      if (m.wrong === m.correct) {
        add(cardId, 'mistake-wrong-eq-correct', `mistakes[${i}]: wrong == correct == "${m.wrong}"`);
      }
      if (!/[가-힣]/.test(m.wrong)) {
        add(cardId, 'mistake-wrong-no-korean', `mistakes[${i}].wrong has no Korean: "${m.wrong}"`);
      }
      if (!/[가-힣]/.test(m.correct)) {
        add(cardId, 'mistake-correct-no-korean', `mistakes[${i}].correct has no Korean: "${m.correct}"`);
      }
    });

    // ---- specialQuiz ----
    if (card.specialQuiz && Array.isArray(card.specialQuiz.questions)) {
      const qType = card.specialQuiz.type; // 'morph' | 'judge' | 'fill'
      // morph 必须恰好 4 选项；judge / fill 至少 2 选项即可
      const requireExactFour = qType === 'morph';
      card.specialQuiz.questions.forEach((q, i) => {
        const opts = q.options || [];
        if (requireExactFour) {
          if (opts.length !== 4) {
            add(cardId, 'quiz-options-count-morph', `[${qType}] specialQuiz.questions[${i}].options.length = ${opts.length} (morph 要求恰好 4)`);
          }
        } else {
          if (opts.length < 2) {
            add(cardId, 'quiz-options-too-few', `[${qType}] specialQuiz.questions[${i}].options.length = ${opts.length} (至少 2)`);
          }
        }
        if (typeof q.answer !== 'number' || q.answer < 0) {
          add(cardId, 'quiz-answer-out-of-range', `specialQuiz.questions[${i}].answer = ${q.answer}`);
        } else if (opts.length > 0 && q.answer >= opts.length) {
          add(cardId, 'quiz-answer-overflow', `specialQuiz.questions[${i}].answer = ${q.answer} but only ${opts.length} options`);
        }
        // 无 explanation
        if (!q.explanation) {
          add(cardId, 'quiz-no-explanation', `specialQuiz.questions[${i}] missing explanation`);
        }
        // 空 prompt 只在 morph/fill 报（judge 用 pre/post 或全靠 explanation）
        if (qType !== 'judge' && !q.prompt && !q.pre && !q.post) {
          add(cardId, 'quiz-empty-prompt', `[${qType}] specialQuiz.questions[${i}] has empty prompt/pre/post`);
        }
      });
    }
  }
}

// -------- 输出 --------
const outArg = process.argv.indexOf('--json');
if (outArg > -1 && process.argv[outArg + 1]) {
  const outPath = process.argv[outArg + 1];
  mkdirSync(path.dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(findings, null, 2), 'utf8');
  console.log(`Wrote ${findings.length} findings to ${outPath}`);
}

// 按 cardId 分组打印
const byCard = new Map();
for (const f of findings) {
  if (!byCard.has(f.cardId)) byCard.set(f.cardId, []);
  byCard.get(f.cardId).push(f);
}
// 按 partNumber lessonNumber 排序输出
const sorted = [...byCard.keys()].sort((a, b) => {
  const ma = a.match(/p(\d+)-l(\d+)/);
  const mb = b.match(/p(\d+)-l(\d+)/);
  if (!ma || !mb) return a.localeCompare(b);
  return (Number(ma[1]) - Number(mb[1])) || (Number(ma[2]) - Number(mb[2]));
});

console.log(`\n=== ${findings.length} findings across ${byCard.size} cards ===\n`);
// 按 kind 分类计数
const byKind = new Map();
for (const f of findings) {
  byKind.set(f.kind, (byKind.get(f.kind) || 0) + 1);
}
for (const [k, v] of [...byKind.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${k}: ${v}`);
}
console.log('\n=== Details ===\n');
for (const cid of sorted) {
  console.log(`\n[${cid}]`);
  for (const f of byCard.get(cid)) {
    console.log(`  · ${f.kind}: ${f.detail}`);
  }
}
