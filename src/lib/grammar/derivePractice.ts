import type { GrammarCard, PracticeGroups } from '@/types';

// 从综合练习课自带的知识点字段派生本 part 专属练习题。
// 只派生低风险的三种：sort（排序）、err（改错）、judge（判断）。
// 素材本身已过韩语审查，派生只做字段重组，不生成新韩语。
// fill/morph 派生难度高（要 diff 出空位和诱答项），阶段一不做——
// 无数据时对应 step 由调用方跳过。
//
// Path B（2026-07-20）：空壳综合练习卡（l11）自身 cardExamples/mistakes 为空时，
// 传入本 part 的 l01-l10 兄弟卡，聚合它们已审素材再派生。仍是重组已审字段，
// 不凭空造句。聚合结果限量，避免几十道题刷屏。

type Mistake = GrammarCard['mistakes'][number];

// 空壳 part 聚合兄弟卡素材后的题量上限（有自带数据的 part 不走聚合、不受限）
const CAP_SORT = 5;
const CAP_JUDGE = 6;
const CAP_ERR = 6;
const CAP_SCENARIO = 5;
const CAP_CLOZE = 5;
const CAP_DICTATION = 5;

/** 排序题：从 cardExamples 的 wordBlocks 派生。词块顺序即答案。 */
function deriveSort(examples: GrammarCard['cardExamples']): PracticeGroups['sort'] {
  const out: NonNullable<PracticeGroups['sort']> = [];
  for (const eg of examples) {
    const words = eg.wordBlocks.map(wb => wb.text).filter(Boolean);
    // 至少 3 个词块才有排序价值；2 词唯一解太弱
    if (words.length < 3) continue;
    out.push({ words, answer: words, hint: eg.zh });
  }
  return out.length > 0 ? out : undefined;
}

// 挖空优先级：优先挖实词（宾语/动词/主语），其次地点/时间/其他
const BLANK_PRIORITY = ['object', 'verb', 'subject', 'place', 'time', 'plain'] as const;

/** 词块填空题：从已审例句挖掉一个词块，诱答项取同池同 role 的其他已审词块。
 *  正确项与全部诱答都是原教材词块，不生成新韩语。需同 role 池 ≥4（1 答案+3 诱答）才成题，
 *  故主要在兄弟卡聚合（词汇量大）时生效；单卡 3 例句时同 role 词块不够，自动跳过。 */
function deriveCloze(examples: GrammarCard['cardExamples']): PracticeGroups['cloze'] {
  // 按 role 收集全池词块文本（去重）
  const poolByRole = new Map<string, string[]>();
  for (const eg of examples) {
    for (const wb of eg.wordBlocks) {
      if (!wb.text) continue;
      const arr = poolByRole.get(wb.role) ?? [];
      if (!arr.includes(wb.text)) arr.push(wb.text);
      poolByRole.set(wb.role, arr);
    }
  }

  const out: NonNullable<PracticeGroups['cloze']> = [];
  const usedAns = new Set<string>();
  for (const eg of examples) {
    const blocks = eg.wordBlocks.filter(wb => wb.text);
    if (blocks.length < 2) continue;
    // 找第一个「同 role 有 ≥3 个不同其他词块」的可挖 role
    let targetIdx = -1;
    for (const role of BLANK_PRIORITY) {
      const idx = blocks.findIndex(wb => wb.role === role && !usedAns.has(wb.text));
      if (idx < 0) continue;
      const others = (poolByRole.get(role) ?? []).filter(t => t !== blocks[idx].text);
      if (others.length >= 3) { targetIdx = idx; break; }
    }
    if (targetIdx < 0) continue;

    const target = blocks[targetIdx];
    const others = (poolByRole.get(target.role) ?? []).filter(t => t !== target.text);
    const distractors = others.slice(0, 3);
    // 正确项按题序分散位置（i%4），避免总在同一位
    const options = [...distractors];
    options.splice(out.length % 4, 0, target.text);

    const before = blocks.slice(0, targetIdx).map(b => b.text);
    const after = blocks.slice(targetIdx + 1).map(b => b.text);
    out.push({
      pre: before.length ? before.join(' ') + ' ' : '',
      post: after.join(' '),
      opts: options,
      ans: target.text,
      why: blocks.map(b => b.text).join(' '), // 揭晓时给完整已审句
      hint: eg.zh,
    });
    usedAns.add(target.text);
  }
  return out.length > 0 ? out.slice(0, CAP_CLOZE) : undefined;
}

// 词块拼接成韩语整句（GrammarCardExample 无 ko 字段）。多句 scenario.ko 不适合听力/听写。
function joinKo(eg: GrammarCard['cardExamples'][number]): string {
  return eg.wordBlocks.map(wb => wb.text).filter(Boolean).join(' ');
}

/** 听力选择题：听韩语句选中文意思。题干=已审例句，正确项=eg.zh，
 *  3 诱答从其他例句 zh + 额外 zh 池（本卡 scenarios）取。需去重后 ≥4 个中文才成题。 */
function deriveListeningMC(
  examples: GrammarCard['cardExamples'],
  extraZh: string[] = [],
): PracticeGroups['listening'] {
  const items = examples.map(eg => ({ ko: joinKo(eg), zh: eg.zh })).filter(it => it.ko && it.zh);
  if (items.length === 0) return undefined;
  // 全体中文池（例句 zh + 额外池），去重，用作诱答来源
  const zhPool: string[] = [];
  for (const z of [...items.map(it => it.zh), ...extraZh]) {
    if (z && !zhPool.includes(z)) zhPool.push(z);
  }
  if (zhPool.length < 4) return undefined; // 凑不齐 1 正确 + 3 诱答

  const out: NonNullable<PracticeGroups['listening']> = [];
  const usedKo = new Set<string>();
  for (let i = 0; i < items.length; i++) {
    const cur = items[i];
    if (usedKo.has(cur.ko)) continue;
    usedKo.add(cur.ko);
    const distractors = zhPool.filter(z => z !== cur.zh).slice(0, 3);
    if (distractors.length < 3) continue;
    const options = [...distractors];
    options.splice(out.length % 4, 0, cur.zh); // 答案位置按题序分散
    out.push({ ko: cur.ko, ans: cur.zh, options });
  }
  return out.length > 0 ? out : undefined;
}

/** 听写题（综合测验用）：源句取 join 后的 cardExamples（单句干净），本地比对。 */
function deriveDictation(examples: GrammarCard['cardExamples']): PracticeGroups['dictation'] {
  const out: NonNullable<PracticeGroups['dictation']> = [];
  const seen = new Set<string>();
  for (const eg of examples) {
    const ko = joinKo(eg);
    if (!ko || !eg.zh || seen.has(ko)) continue;
    seen.add(ko);
    out.push({ ko, zh: eg.zh });
  }
  return out.length > 0 ? out : undefined;
}

/** 改错题：mistakes 字段几乎 1:1（wrong/correct/note → wrong/right/why）。 */
function deriveErr(mistakes: Mistake[]): PracticeGroups['err'] {
  if (mistakes.length === 0) return undefined;
  return mistakes.map(m => ({ wrong: m.wrong, right: m.correct, why: m.note }));
}

/** 判断题：wrong/correct 组成 A/B 二选一。
 *  用索引奇偶决定正确项放 A 还是 B（确定性，避免 render 抖动 + 答案不偏向一边）。 */
function deriveJudge(mistakes: Mistake[]): PracticeGroups['judge'] {
  if (mistakes.length === 0) return undefined;
  return mistakes.map((m, i) => {
    const correctIsA = i % 2 === 0;
    return {
      A: correctIsA ? m.correct : m.wrong,
      B: correctIsA ? m.wrong : m.correct,
      ans: (correctIsA ? 'A' : 'B') as 'A' | 'B',
      why: m.note,
    };
  });
}

type Scenario = GrammarCard['scenarios'][number];

/** 情景应用题：给情景（icon/context/中文）选正确韩语句。
 *  正确项是本情景 ko，3 个诱答项从池中其他情景的 ko 取（都是已审韩语，不造新句）。
 *  诱答项按索引确定性选取（i+1/i+2/i+3 环绕），避免 render 抖动。需 ≥4 条才成题。 */
function deriveScenario(scenarios: Scenario[]): PracticeGroups['scenario'] {
  // 去重（同池可能有重复 ko），少于 4 条无法凑 1 正确 + 3 诱答
  const uniq = scenarios.filter((s, i) => s.ko && scenarios.findIndex(x => x.ko === s.ko) === i);
  if (uniq.length < 4) return undefined;
  const out: NonNullable<PracticeGroups['scenario']> = [];
  for (let i = 0; i < uniq.length; i++) {
    const cur = uniq[i];
    const distractors = [uniq[(i + 1) % uniq.length].ko, uniq[(i + 2) % uniq.length].ko, uniq[(i + 3) % uniq.length].ko];
    // 正确项放在 (i % 4) 位置，答案位置分散、确定
    const options = [...distractors];
    options.splice(i % 4, 0, cur.ko);
    out.push({ icon: cur.icon, context: cur.context, zh: cur.zh, ans: cur.ko, options });
  }
  return out;
}

/**
 * 从综合练习课派生 PracticeGroups。
 * mistakes 拆两半：前半给判断题、后半给改错题，避免两个题型出现同一句子对。
 * mistakes 不足 6 条时不拆，全部给改错（更基础），跳过判断。
 */
function buildGroups(
  examples: GrammarCard['cardExamples'],
  mistakes: Mistake[],
  scenarios: Scenario[],
  clozePool: GrammarCard['cardExamples'] = examples,
): PracticeGroups {
  const groups: PracticeGroups = {};

  const sort = deriveSort(examples);
  if (sort) groups.sort = sort;

  if (mistakes.length >= 6) {
    const half = Math.ceil(mistakes.length / 2);
    groups.judge = deriveJudge(mistakes.slice(0, half));
    groups.err = deriveErr(mistakes.slice(half));
  } else if (mistakes.length > 0) {
    groups.err = deriveErr(mistakes);
  }

  const scenario = deriveScenario(scenarios);
  if (scenario) groups.scenario = scenario;

  // cloze 用更大的词块池（诱答项需同 role ≥3），故与 sort 用不同数据源
  const cloze = deriveCloze(clozePool);
  if (cloze) groups.cloze = cloze;

  // 听写题（综合测验）：源句取 clozePool（聚合时是全部兄弟例句），限量
  const dictation = deriveDictation(clozePool)?.slice(0, CAP_DICTATION);
  if (dictation) groups.dictation = dictation;

  return groups;
}

/**
 * @param card 综合练习卡（l11）
 * @param siblings 本 part 的其他卡（l01-l10）。仅当本卡自身无素材时用于聚合。
 */
export function derivePracticeGroups(card: GrammarCard, siblings?: GrammarCard[]): PracticeGroups {
  const ownExamples = card.cardExamples ?? [];
  const ownMistakes = card.mistakes ?? [];

  // 本卡自带素材：走原逻辑，不聚合、不限量（P1-7 / P21-24 等不受影响）
  if (ownExamples.length > 0 || ownMistakes.length > 0) {
    return buildGroups(ownExamples, ownMistakes, card.scenarios ?? []);
  }

  // 空壳卡 + 有兄弟卡：聚合 l01-l10 已审素材再派生，限量避免刷屏
  if (siblings && siblings.length > 0) {
    const allExamples = siblings.flatMap(c => c.cardExamples ?? []);
    const examples = allExamples.slice(0, CAP_SORT);
    const mistakes = siblings.flatMap(c => c.mistakes ?? []).slice(0, CAP_JUDGE + CAP_ERR);
    const scenarios = siblings.flatMap(c => c.scenarios ?? []).slice(0, CAP_SCENARIO);
    // cloze 用全部兄弟例句作诱答池（deriveCloze 内部自限 CAP_CLOZE 道题）
    return buildGroups(examples, mistakes, scenarios, allExamples);
  }

  return {};
}

/**
 * 普通课（l01-l10）单卡听力选择题：听韩语句选中文意思。
 * 诱答池 = 本卡例句 zh + 本卡 scenarios 的 zh（保证 ≥4）。素材不足返回 undefined，步骤省略。
 */
export function deriveRegularListening(card: GrammarCard): PracticeGroups['listening'] {
  const examples = card.cardExamples ?? [];
  const extraZh = (card.scenarios ?? []).map(s => s.zh).filter(Boolean);
  return deriveListeningMC(examples, extraZh);
}

// ── 离线题库加载（命中优先，未命中回落上面的卡片派生）────────────────
import type { GrammarBankFile, GrammarBankEntry } from '@/types';

const bankCache = new Map<number, GrammarBankFile | null>();

/** fetch public/data/grammar-bank/p{N}.json，一 part 一次，缓存；无库返回 null（→回落派生）。 */
export async function loadGrammarBankPart(part: number): Promise<GrammarBankFile | null> {
  if (bankCache.has(part)) return bankCache.get(part)!;
  try {
    const res = await fetch(`/data/grammar-bank/p${part}.json`);
    const file = res.ok ? ((await res.json()) as GrammarBankFile) : null;
    bankCache.set(part, file);
    return file;
  } catch {
    bankCache.set(part, null);
    return null;
  }
}

export function getBankEntry(file: GrammarBankFile | null, cardId: string): GrammarBankEntry | null {
  return file?.entries?.[cardId] ?? null;
}
