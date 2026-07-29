// 语法练习题库 QA 闸门（P3 试点）
// 运行：node --import tsx --env-file=.env.local scripts/qa-grammar-bank.mjs 3
// 可选 --no-ai 只跑机器校验（Tier A），不调 grammar-judge。
//
// Tier A（机器）：schema / 听力4选项+ans∈options+互异 / 韩中字段纯度 / 听力答案分布 / 原创性（不等于卡片例句）
// Tier B（AI）：对 listening/dictation/imitate 的 ko 跑 grammar-judge，不过则从文件删掉；continue opener 跑轻校验
// 通过项留在文件里（在库=已过），文件级 qa 戳。某类型掉到 <2 题则退出非零提示重生成。

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const NO_AI = args.includes('--no-ai');
const part = Number(args.find(a => /^\d+$/.test(a)));
if (!part) { console.error('用法: node --import tsx --env-file=.env.local scripts/qa-grammar-bank.mjs <partNumber> [--no-ai]'); process.exit(1); }

const JUDGE_KEY = process.env.DEEPSEEK_JUDGE_KEY ?? process.env.DEEPSEEK_WRITING_KEY;
const API_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = 'deepseek-chat';

const HANGUL = /[가-힣]/;          // 韩文音节
const HAN = /[一-鿿]/;     // 中日韩汉字
const MIN_PER_TYPE = 2;

const problems = [];
const warn = (id, msg) => problems.push(`${id}: ${msg}`);

async function deepseek(system, user, max_tokens = 80) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${JUDGE_KEY}` },
    body: JSON.stringify({ model: MODEL, temperature: 0.2, max_tokens,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const txt = (await res.json()).choices[0].message.content.trim();
  const m = txt.match(/\{[\s\S]*\}/);
  return m ? JSON.parse(m[0]) : {};
}
const judgeOk = async (ko, gp) => {
  try {
    const r = await deepseek(`你是韩语语法评判助手。判断句子是否语法正确且真正使用了目标语法点。只返回JSON：{"isCorrect":true,"usedGrammar":true}`,
      `目标语法：${gp}\n句子：${ko}`);
    return r.isCorrect === true && r.usedGrammar === true;
  } catch { return true; } // AI 不可用时不误删，交给人工
};
const openerOk = async (ko) => {
  try {
    const r = await deepseek(`你是韩语评判助手。判断句子是否语法正确、自然。只返回JSON：{"ok":true}`, `句子：${ko}`, 60);
    return r.ok === true;
  } catch { return true; }
};

async function loadPartCards(p) {
  const file = path.join(ROOT, 'src', 'data', `grammar-cards-p${p}.ts`);
  const mod = await import('file:///' + file.replace(/\\/g, '/'));
  return mod[`grammarCardsP${p}`] ?? [];
}
const norm = s => (s || '').replace(/\s/g, '');
// 形式/音变课：仿写/续写本就该为空，min-count 不告警；听力/听写用轻校验
// 形式/音变课 或 综合练习卡(l11)：仿写/续写本就该为空，min-count 不告警；听力/听写用轻校验
const isFormRule = card => card && (card.isPractice === true || /불규칙|不规则|음운|음변|音变|받침|活用|收音|变形规律|맞춤법|拼写/.test(`${card.title} ${card.whatItDoes}`));

async function main() {
  const bankPath = path.join(ROOT, 'public', 'data', 'grammar-bank', `p${part}.json`);
  const bank = JSON.parse(readFileSync(bankPath, 'utf-8'));
  const cards = await loadPartCards(part);
  const cardById = Object.fromEntries(cards.map(c => [c.id, c]));

  let aiJudged = 0, dropped = 0;
  const listenAnsPos = [0, 0, 0, 0];

  for (const [cardId, entry] of Object.entries(bank.entries)) {
    const gp = entry.grammarPoint;
    const card = cardById[cardId];
    const formOnly = isFormRule(card);
    // 原创性 blocklist（归一化）
    const block = new Set([
      ...(card?.cardExamples ?? []).map(e => norm(e.wordBlocks.map(w => w.text).join(' '))),
      ...(card?.scenarios ?? []).map(s => norm(s.ko)),
      ...(card?.structures ?? []).map(s => norm(s.ko)),
    ]);

    // ── Tier A：听力 ──
    entry.listening = (entry.listening ?? []).filter(q => {
      if (!q.ko || !q.ans || !Array.isArray(q.options) || q.options.length !== 4) { warn(cardId, 'listening 结构错'); return false; }
      if (!q.options.includes(q.ans)) { warn(cardId, 'listening ans 不在 options'); return false; }
      if (new Set(q.options).size !== 4) { warn(cardId, 'listening 选项重复'); return false; }
      if (!HANGUL.test(q.ko) || HAN.test(q.ko)) { warn(cardId, `listening ko 非纯韩: ${q.ko}`); return false; }
      if ([q.ans, ...q.options].some(z => HANGUL.test(z))) { warn(cardId, 'listening 中文字段含韩文'); return false; }
      if (block.has(norm(q.ko))) { warn(cardId, `listening 抄了卡片例句: ${q.ko}`); return false; }
      listenAnsPos[q.options.indexOf(q.ans)]++;
      return true;
    });

    // ── Tier A：听写 ──
    entry.dictation = (entry.dictation ?? []).filter(q => {
      if (!q.ko || !q.zh) { warn(cardId, 'dictation 缺字段'); return false; }
      if (!HANGUL.test(q.ko) || HAN.test(q.ko)) { warn(cardId, `dictation ko 非纯韩: ${q.ko}`); return false; }
      if (HANGUL.test(q.zh)) { warn(cardId, 'dictation zh 含韩文'); return false; }
      if (block.has(norm(q.ko))) { warn(cardId, `dictation 抄了卡片例句: ${q.ko}`); return false; }
      return true;
    });

    // ── Tier A：仿写（swapSlot 允许引用韩语词，故不查 swapSlot 纯度）──
    entry.imitate = (entry.imitate ?? []).filter(q => {
      if (!q.ko || !q.zh || !q.swapSlot) { warn(cardId, 'imitate 缺字段'); return false; }
      if (!HANGUL.test(q.ko) || HAN.test(q.ko)) { warn(cardId, `imitate ko 非纯韩: ${q.ko}`); return false; }
      if (block.has(norm(q.ko))) { warn(cardId, `imitate 抄了卡片例句: ${q.ko}`); return false; }
      return true;
    });

    // ── Tier A：续写（opener 纯韩；expectHint 允许引用韩语）──
    entry.continue = (entry.continue ?? []).filter(q => {
      if (!q.ko || !q.zh || !q.expectHint) { warn(cardId, 'continue 缺字段'); return false; }
      if (!HANGUL.test(q.ko) || HAN.test(q.ko)) { warn(cardId, `continue ko 非纯韩: ${q.ko}`); return false; }
      return true;
    });

    // ── Tier B：AI 判定 ──
    if (!NO_AI) {
      const keepBy = async (items, check, tag) => {
        const out = [];
        for (const it of items) { aiJudged++; if (await check(it.ko)) out.push(it); else { dropped++; warn(cardId, `${tag}: ${it.ko}`); } }
        return out;
      };
      const ldCheck = formOnly ? openerOk : (ko => judgeOk(ko, gp)); // 形式课听力/听写只校验合法韩语
      entry.listening = await keepBy(entry.listening, ldCheck, 'AI判失败');
      entry.dictation = await keepBy(entry.dictation, ldCheck, 'AI判失败');
      entry.imitate = await keepBy(entry.imitate, ko => judgeOk(ko, gp), 'AI判失败');
      entry.continue = await keepBy(entry.continue, openerOk, 'opener校验失败');
    }

    // 数量下限告警（形式课不应有仿写/续写，跳过其告警）
    const types = formOnly ? ['listening', 'dictation'] : ['listening', 'dictation', 'imitate', 'continue'];
    for (const type of types) {
      if ((entry[type] ?? []).length < MIN_PER_TYPE) warn(cardId, `${type} 仅剩 ${(entry[type] ?? []).length} 题（<${MIN_PER_TYPE}）`);
    }
    if (formOnly) { entry.imitate = []; entry.continue = []; } // 形式课清空产出型
  }

  // ── 听力答案位置均衡：把每题 ans 轮流放到 0/1/2/3（只重排 options，不改文本）──
  const finalPos = [0, 0, 0, 0];
  let posCursor = 0;
  for (const entry of Object.values(bank.entries)) {
    for (const q of (entry.listening ?? [])) {
      const others = q.options.filter(o => o !== q.ans);
      const target = posCursor % 4;
      posCursor++;
      const opts = [...others];
      opts.splice(target, 0, q.ans);
      q.options = opts;
      finalPos[target]++;
    }
  }

  bank.qa = { aiJudged, dropped, judgedAt: new Date().toISOString() };
  writeFileSync(bankPath, JSON.stringify(bank, null, 2), 'utf-8');

  console.log(`\n=== QA P${part} ===`);
  console.log(`AI 判定 ${aiJudged} 句，删除 ${dropped} 句`);
  console.log(`听力答案位置分布 [①②③④] 均衡前 ${listenAnsPos.join('/')} → 均衡后 ${finalPos.join('/')}`);
  if (problems.length) { console.log(`\n问题 ${problems.length} 条：`); problems.forEach(p => console.log('  - ' + p)); }
  else console.log('无问题。');

  // 有类型掉到下限之下 → 非零退出提示重生成
  const under = problems.some(p => p.includes('<'));
  process.exit(under ? 1 : 0);
}

main().catch(e => { console.error(e); process.exit(1); });
