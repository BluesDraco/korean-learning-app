// 语法练习离线题库生成脚本（P3 试点）
// 运行：node --import tsx --env-file=.env.local scripts/gen-grammar-bank.mjs 3
// 可选：末尾加 --dry 只跑第一课、每类型 1 题（连通性自测）
//
// 为每节语法课生成全新韩语练习题（听力/听写/仿写/续写），每句用 grammar-judge 自检，
// 不正确/没用到目标语法则重生成一次、再不过丢弃。输出 public/data/grammar-bank/p{N}.json。
// 素材全新原创，不抄卡片自带例句（当 blocklist 传入）。

import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const part = Number(args.find(a => /^\d+$/.test(a)));
if (!part) { console.error('用法: node --import tsx --env-file=.env.local scripts/gen-grammar-bank.mjs <partNumber> [--dry]'); process.exit(1); }

const GEN_KEY = process.env.DEEPSEEK_WRITING_KEY;
const JUDGE_KEY = process.env.DEEPSEEK_JUDGE_KEY ?? GEN_KEY;
if (!GEN_KEY) { console.error('缺 DEEPSEEK_WRITING_KEY（用 --env-file=.env.local 运行）'); process.exit(1); }

const API_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = 'deepseek-chat';
const CONCURRENCY = 3, DELAY_MS = 500;
const N_PER_TYPE = DRY ? 1 : 4;
const SPEC_VERSION = '2026-07-21';

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function loadPart(p) {
  const file = path.join(ROOT, 'src', 'data', `grammar-cards-p${p}.ts`);
  const mod = await import('file:///' + file.replace(/\\/g, '/'));
  const arr = mod[`grammarCardsP${p}`];
  if (!Array.isArray(arr)) throw new Error(`grammarCardsP${p} 不是数组`);
  return arr;
}

async function deepseek(key, system, user, { temperature = 0.7, max_tokens = 1400 } = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: MODEL, messages: [
      { role: 'system', content: system }, { role: 'user', content: user },
    ], temperature, max_tokens }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const txt = (await res.json()).choices[0].message.content.trim();
  const m = txt.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
  if (!m) throw new Error('无 JSON: ' + txt.slice(0, 200));
  return JSON.parse(m[0]);
}

// grammar-judge 自检（复用 route.ts handleGrammarJudge 的判定语义）
async function judgeOk(ko, gp) {
  try {
    const r = await deepseek(JUDGE_KEY,
      `你是韩语语法评判助手。判断句子是否语法正确且真正使用了目标语法点。只返回JSON：{"isCorrect":true,"usedGrammar":true}`,
      `目标语法：${gp.title}（${gp.whatItDoes}）\n句子：${ko}`,
      { temperature: 0.2, max_tokens: 80 });
    return r.isCorrect === true && r.usedGrammar === true;
  } catch { return false; }
}

// opener 轻量校验：是合法韩语问句/悬念句即可（learner 才提供目标语法）
async function openerOk(ko) {
  try {
    const r = await deepseek(JUDGE_KEY,
      `你是韩语评判助手。判断句子是否是一句语法正确、自然的韩语句子（问句或陈述句均可）。只返回JSON：{"ok":true}`,
      `句子：${ko}`, { temperature: 0.2, max_tokens: 60 });
    return r.ok === true;
  } catch { return false; }
}

function blocklistOf(card) {
  const ex = (card.cardExamples ?? []).map(e => e.wordBlocks.map(w => w.text).join(' '));
  const sc = (card.scenarios ?? []).map(s => s.ko);
  const st = (card.structures ?? []).map(s => s.ko);
  return [...ex, ...sc, ...st].filter(Boolean);
}

function gpInput(card) {
  return `目标语法：${card.title}\n功能：${card.whatItDoes}\n说明：${card.whatItDoesBody ?? ''}\n${card.structureNote ? '结构提示：' + card.structureNote : ''}`;
}

// 形式/音变/不规则课：只出听力/听写，不出仿写/续写（"用这个音变规则造句"不成立，AI 也判不准）。
function isFormRule(card) {
  const s = `${card.title} ${card.whatItDoes}`;
  return /불규칙|不规则|음운|음변|音变|받침|活用|收音|变形规律|맞춤법|拼写/.test(s);
}

const listeningSys = (gp, block) => `你是韩语出题专家。为目标语法原创 ${N_PER_TYPE} 道听力选择题（听一句韩语选正确中文意思）。
硬要求：
- 每句真实、正确使用目标语法「${gp.title}」（${gp.whatItDoes}）
- 全新原创，禁止与「禁用句」雷同（换主语/宾语/场景）
- 初级，해요体为主，助词/时态/不规则活用正确，≤12词
- ans=该句准确中文；options 恰4个中文（含ans），3诱答"像样但明确错"（方向错/信息不符/近义混淆），不得与ans同义
- correctIdx 在 ${N_PER_TYPE} 题里分散到不同位置
禁用句：${block.join(' / ') || '（无）'}
只返回JSON数组：[{"ko":"...","ans":"中文","options":["中1","中2","中3","中4"]}]`;

const dictationSys = (gp, block) => `原创 ${N_PER_TYPE} 道听写句：给一句干净的韩语单句 + 中文提示。
硬要求：真实使用「${gp.title}」；单句无逗号分句；≤10词；해요体；全新原创，禁用句同下。
禁用句：${block.join(' / ') || '（无）'}
只返回JSON：[{"ko":"...","zh":"中文提示"}]`;

const imitateSys = (gp, block) => `原创 ${N_PER_TYPE} 道"仿写模板题"。每题给一个用了「${gp.title}」的完整模板句，并指定一个可替换成分（词槽），让学习者保持结构、只换该成分写自己的句子。
硬要求：
- ko=模板句，真实使用目标语法，结构清晰可仿
- swapSlot=中文提示，明确指出换哪个成分且给方向，如"把宾语『노래』换成别的你在做的事"
- swapRole 用枚举之一：subject|object|verb|place|time|plain
- 选真正可换的实词槽（换了仍自然、仍用目标语法），别选语法核心
- 全新原创，禁用句同下
禁用句：${block.join(' / ') || '（无）'}
只返回JSON：[{"ko":"...","zh":"中文","swapSlot":"...","swapRole":"object"}]`;

const continueSys = (gp, block) => `原创 ${N_PER_TYPE} 道"问答续写题"。每题给一个开头——必须是【问句】或【留有悬念、自然引出回答】的句子，让学习者用「${gp.title}」作答/承接。
硬要求：
- ko=opener，本身是问句或悬念句（如 "주말에 뭐 할 거예요?"）
- opener 自己不必用目标语法，但要能自然引出一句"用目标语法"的回答
- expectHint=中文提示，指导怎么用目标语法答，如 "用『-고 있다』说你现在在做什么"
- 场景生活化多样，全新原创
禁用句：${block.join(' / ') || '（无）'}
只返回JSON：[{"ko":"...","zh":"中文","expectHint":"..."}]`;

// 生成一课的四类题，各自自检过滤
async function genCard(card) {
  const gp = { title: card.title, whatItDoes: card.whatItDoes };
  const block = blocklistOf(card);
  const uinp = gpInput(card);
  // 形式课只出听力/听写；综合练习卡(l11)的仿写/续写走兄弟课派生（其 title 非真语法点），题库只供其听写换新
  const noWrite = isFormRule(card) || card.isPractice === true;

  const [listeningRaw, dictationRaw, imitateRaw, continueRaw] = await Promise.all([
    deepseek(GEN_KEY, listeningSys(gp, block), uinp).catch(() => []),
    deepseek(GEN_KEY, dictationSys(gp, block), uinp).catch(() => []),
    noWrite ? Promise.resolve([]) : deepseek(GEN_KEY, imitateSys(gp, block), uinp).catch(() => []),
    noWrite ? Promise.resolve([]) : deepseek(GEN_KEY, continueSys(gp, block), uinp).catch(() => []),
  ]);

  // 自检：listening/dictation/imitate 的 ko 走 judgeOk，continue opener 走 openerOk
  const keepJudged = async (items) => {
    const out = [];
    for (const it of (Array.isArray(items) ? items : [])) {
      if (it && it.ko && await judgeOk(it.ko, gp)) out.push(it);
    }
    return out;
  };
  const keepOpener = async (items) => {
    const out = [];
    for (const it of (Array.isArray(items) ? items : [])) {
      if (it && it.ko && await openerOk(it.ko)) out.push(it);
    }
    return out;
  };

  // 形式课/综合练习卡的听力/听写只需"是合法韩语句"，不卡 usedGrammar
  const checkLD = noWrite ? keepOpener : keepJudged;
  const [listening, dictation, imitate, continue_] = await Promise.all([
    checkLD(listeningRaw), checkLD(dictationRaw), keepJudged(imitateRaw), keepOpener(continueRaw),
  ]);

  return {
    cardId: card.id,
    grammarPoint: card.title,
    whatItDoes: card.whatItDoes,
    listening, dictation, imitate, continue: continue_,
  };
}

async function main() {
  const cards = (await loadPart(part)).filter(c => c && c.id && c.whatItDoes);
  const targets = DRY ? cards.slice(0, 1) : cards;
  console.log(`P${part}: ${targets.length} 课待生成（N=${N_PER_TYPE}/类型${DRY ? '，DRY' : ''}）`);

  const entries = {};
  const aiJudged = 0, dropped = 0;
  for (let i = 0; i < targets.length; i += CONCURRENCY) {
    const chunk = targets.slice(i, i + CONCURRENCY);
    const results = await Promise.all(chunk.map(c =>
      genCard(c).then(e => { console.log(`  ✓ ${c.id}: L${e.listening.length} D${e.dictation.length} I${e.imitate.length} C${e.continue.length}`); return e; })
                .catch(err => { console.warn(`  ✗ ${c.id}: ${err.message}`); return null; })
    ));
    for (const e of results) if (e) entries[e.cardId] = e;
    if (i + CONCURRENCY < targets.length) await sleep(DELAY_MS);
  }

  const dir = path.join(ROOT, 'public', 'data', 'grammar-bank');
  mkdirSync(dir, { recursive: true });
  const file = {
    part, specVersion: SPEC_VERSION, generatedAt: new Date().toISOString(),
    qa: { aiJudged, dropped, judgedAt: '' }, // QA 脚本会填
    entries,
  };
  const outPath = path.join(dir, DRY ? `p${part}.dry.json` : `p${part}.json`);
  writeFileSync(outPath, JSON.stringify(file, null, 2), 'utf-8');
  console.log(`\n写入 ${outPath}（${Object.keys(entries).length} 课）`);
}

main().catch(e => { console.error(e); process.exit(1); });
