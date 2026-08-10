/**
 * 用户题源池 · 从用户的历史学习数据里挑题
 *
 * 优先级链(从高到低):
 *   1. 🧠 高频错词  · db.dictationRecords wrongCount>=2
 *   2. 📌 已保存句  · db.sentences
 *   3. 📚 保存的词  · db.words source in [library/course/kpop/reading/writing/speaking/chat]
 *   4. ⭐ 系统精选  · dictationWords / dictationSentences 兜底
 *
 * 每题都带 origin 标签,UI 可显示"这题来自你自己"。
 */
import { db } from '@/lib/db';
import type { OriginKind } from '@/components/practice/OriginBadge';

// 教学信息查询表 · 用 dictationWords/dictationSentences 作字典,
// 让用户词库来的题也能带 tricky/grammarPoint
let _trickyMap: Map<string, string> | null = null;
let _grammarMap: Map<string, string> | null = null;

const normKey = (s: string) => s.trim().replace(/\s+/g, '').replace(/[.,?!。？！]/g, '');

async function getTrickyMap(): Promise<Map<string, string>> {
  if (_trickyMap) return _trickyMap;
  const { dictationWordPacks } = await import('@/data/dictationWords');
  const m = new Map<string, string>();
  for (const p of dictationWordPacks) {
    for (const w of p.words) {
      if (w.tricky) m.set(normKey(w.korean), w.tricky);
    }
  }
  _trickyMap = m;
  return m;
}

async function getGrammarMap(): Promise<Map<string, string>> {
  if (_grammarMap) return _grammarMap;
  const { dictationSentences } = await import('@/data/dictationSentences');
  const m = new Map<string, string>();
  for (const s of dictationSentences) {
    if (s.grammarPoint) m.set(normKey(s.korean), s.grammarPoint);
  }
  _grammarMap = m;
  return m;
}

/** @deprecated 使用 OriginKind (从 OriginBadge 导出) */
export type PoolOrigin = OriginKind;

export type StudyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface PoolItem {
  [k: string]: unknown;
  korean: string;
  meaning: string;
  type: 'word' | 'sentence';
  origin: OriginKind;
  originLabel?: string; // 更具体的来源描述,如 "咖啡厅主题包" / "저는 아이유 팬이에요"
  tricky?: string;
  grammarPoint?: string;
  level?: StudyLevel; // 系统内容的难度分级,用于按用户水平出题
}

// dictationWords 用 A1/A2/B1 标级,映射到 beginner/intermediate/advanced
const WORD_LEVEL_MAP: Record<string, StudyLevel> = { A1: 'beginner', A2: 'intermediate', B1: 'advanced' };

/** 读用户目标水平(targetLevel),失败/未登录返回 undefined(即不按水平筛) */
async function resolveUserLevel(): Promise<StudyLevel | undefined> {
  try {
    const { getProfile } = await import('@/lib/gamification');
    const p = await getProfile();
    return p?.targetLevel;
  } catch { return undefined; }
}

/** 洗牌 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 拉用户词库(db.words) · 筛掉空词、mastery=mastered 的
 * 单词长度 <= 6 视为词,否则视为短句
 */
async function fetchUserWords(): Promise<PoolItem[]> {
  try {
    const [all, trickyMap, grammarMap] = await Promise.all([
      db.words.toArray(),
      getTrickyMap(),
      getGrammarMap(),
    ]);
    const filtered = all.filter(w =>
      w.word && w.word.trim() && w.meaning && w.meaning.trim() &&
      w.mastery !== 'mastered' &&
      w.word.length <= 20 // 排除超长表达
    );
    return filtered.map(w => {
      const origin: OriginKind =
        w.source === 'reading' ? 'reading'
        : w.source === 'diary' ? 'diary'
        : w.source?.includes('chat') ? 'ai-chat'
        : 'my-word';
      const key = normKey(w.word);
      const type: 'word' | 'sentence' = w.word.length <= 6 && !w.word.includes(' ') ? 'word' : 'sentence';
      return {
        korean: w.word.trim(),
        meaning: w.meaning.split(/[；;,、,]/)[0].trim() || w.meaning.trim(),
        type,
        origin,
        originLabel: w.sourceDetail || w.source || undefined,
        tricky: type === 'word' ? trickyMap.get(key) : undefined,
        grammarPoint: type === 'sentence' ? grammarMap.get(key) : undefined,
      };
    });
  } catch { return []; }
}

/**
 * 拉用户保存的句子(db.sentences · SavedSentence)
 */
export async function fetchUserSentences(): Promise<PoolItem[]> {
  try {
    const [all, grammarMap] = await Promise.all([
      db.sentences.toArray(),
      getGrammarMap(),
    ]);
    return all
      .filter(s => s.korean && s.korean.trim() && s.korean.length >= 4)
      .map(s => {
        const origin: OriginKind =
          s.sourceType === 'reading' || s.source_type === 'reading' ? 'reading'
          : s.sourceType === 'tori-diary' || s.source_type === 'tori-diary' ? 'diary'
          : 'my-sentence';
        return {
          korean: s.korean.trim(),
          meaning: (s.chinese || '').trim() || s.sourceTitle || s.source || '',
          type: 'sentence' as const,
          origin,
          originLabel: s.sourceTitle || s.source || undefined,
          grammarPoint: grammarMap.get(normKey(s.korean)),
        };
      });
  } catch { return []; }
}

/**
 * 拉高频错词(dictationRecords · correct=false 且累计错次>=2 的)
 * 按最近错的排序,只返回错题的 wordId + meaning
 */
export async function fetchMistakeItems(): Promise<PoolItem[]> {
  try {
    // 只看最近 90 天的错题 · 太久远的可能已经忘了或早就掌握了
    const cutoff = Date.now() - 90 * 86400_000;
    const [wrong, trickyMap, grammarMap] = await Promise.all([
      db.dictationRecords.filter(r => !r.correct && r.date >= cutoff),
      getTrickyMap(),
      getGrammarMap(),
    ]);
    const grouped = new Map<string, { count: number; meaning: string; lastAt: number }>();
    for (const r of wrong) {
      const cur = grouped.get(r.wordId) ?? { count: 0, meaning: r.meaning || '', lastAt: 0 };
      cur.count += 1;
      cur.lastAt = Math.max(cur.lastAt, r.date);
      if (!cur.meaning && r.meaning) cur.meaning = r.meaning;
      grouped.set(r.wordId, cur);
    }
    return Array.from(grouped.entries())
      .filter(([, v]) => v.count >= 2) // 只挑错 >= 2 次的顽固错词
      .sort((a, b) => b[1].lastAt - a[1].lastAt) // 最近错的优先
      .map(([korean, v]) => {
        const type: 'word' | 'sentence' = korean.length <= 6 && !korean.includes(' ') ? 'word' : 'sentence';
        const key = normKey(korean);
        return {
          korean,
          meaning: v.meaning || korean,
          type,
          origin: 'mistake' as OriginKind,
          originLabel: `${v.count}`,
          tricky: type === 'word' ? trickyMap.get(key) : undefined,
          grammarPoint: type === 'sentence' ? grammarMap.get(key) : undefined,
        };
      });
  } catch { return []; }
}

/**
 * 混合题源生成器(核心) · 保证有系统兜底
 *
 * @param count 目标题数
 * @param systemFallback 系统词库兜底(不足时补) · 已经 shuffle 过的
 * @param preferType 优先什么类型(word/sentence/both)
 * @param mistakeQuota 保底错题数(前 N 题必是错题,不够就 0)
 */
export async function buildMixedPool(
  count: number,
  systemFallback: PoolItem[],
  preferType: 'word' | 'sentence' | 'both' = 'both',
  mistakeQuota = 3,
  level?: StudyLevel,
): Promise<PoolItem[]> {
  const [mistakes, mySentences, myWords, resolvedLevel] = await Promise.all([
    fetchMistakeItems(),
    fetchUserSentences(),
    fetchUserWords(),
    level ? Promise.resolve(level) : resolveUserLevel(),
  ]);
  level = resolvedLevel;

  // 类型过滤
  const filterByType = (arr: PoolItem[]) => {
    if (preferType === 'both') return arr;
    return arr.filter(i => i.type === preferType);
  };

  // 按用户水平排序系统内容:本级优先,相邻级次之,不丢弃(不足时自动放宽,session 不会变短)
  const LEVEL_ORDER: StudyLevel[] = ['beginner', 'intermediate', 'advanced'];
  const orderByLevel = (arr: PoolItem[]): PoolItem[] => {
    if (!level) return shuffle(arr);
    const target = LEVEL_ORDER.indexOf(level);
    const rank = (it: PoolItem) => {
      if (!it.level) return 2; // 无分级信息的排中间
      return Math.abs(LEVEL_ORDER.indexOf(it.level) - target); // 距目标级越近越靠前
    };
    // 先按与目标级的距离分桶,桶内 shuffle,保证同级随机又优先本级
    return [0, 1, 2].flatMap(d => shuffle(arr.filter(it => rank(it) === d)));
  };

  const finalList: PoolItem[] = [];
  const seen = new Set<string>();

  // 去重添加
  const addAll = (items: PoolItem[], limit: number) => {
    let added = 0;
    for (const it of items) {
      if (added >= limit) break;
      const key = it.korean.replace(/\s+/g, '');
      if (seen.has(key)) continue;
      seen.add(key);
      finalList.push(it);
      added += 1;
    }
    return added;
  };

  // 1. 保底错题 · 前 N 位
  addAll(filterByType(mistakes), Math.min(mistakeQuota, count));

  // 2. 用户保存的句子(shuffle)
  const remainAfterMistakes = count - finalList.length;
  if (remainAfterMistakes > 0) {
    const takeSentences = Math.floor(remainAfterMistakes * (preferType === 'word' ? 0 : 0.5));
    addAll(shuffle(filterByType(mySentences)), takeSentences);
  }

  // 3. 用户词库(shuffle)
  if (finalList.length < count) {
    const remain = count - finalList.length;
    // 优先取 wrongCount>0 或 srsLevel 低的(未掌握的),已经在 filter 里排除了 mastered
    addAll(shuffle(filterByType(myWords)), remain);
  }

  // 4. 系统兜底 · 补足到 count · 按用户水平优先出题(本级优先,不足自动放宽)
  if (finalList.length < count) {
    const remain = count - finalList.length;
    addAll(orderByLevel(filterByType(systemFallback)), remain);
  }

  return finalList.slice(0, count);
}

/**
 * 构建系统兜底的 word items(dictationWordPacks 转 PoolItem)
 */
export async function buildSystemWordPool(): Promise<PoolItem[]> {
  const { dictationWordPacks } = await import('@/data/dictationWords');
  // pack.id(beginner/intermediate/advanced)作为兜底分级,单词自带 A1/A2/B1 优先
  return dictationWordPacks.flatMap(p =>
    p.words.map(w => ({
      korean: w.korean,
      meaning: w.meaning,
      type: 'word' as const,
      origin: 'system' as OriginKind,
      tricky: w.tricky,
      level: (w.level && WORD_LEVEL_MAP[w.level]) || (p.id as StudyLevel),
    }))
  );
}

/**
 * 构建系统兜底的 sentence items
 * = 默写内置句(dictationSentences,带 grammarPoint)+ 全部主题词包例句(themePacks.sentences)
 * 按韩语去重,内置句优先(保留 grammarPoint 语法点)。
 */
export async function buildSystemSentencePool(): Promise<PoolItem[]> {
  const [{ dictationSentences }, { themePacks }] = await Promise.all([
    import('@/data/dictationSentences'),
    import('@/data/vocabulary/themes'),
  ]);

  const seen = new Set<string>();
  const pool: PoolItem[] = [];

  // 1. 内置句优先(带语法点)
  for (const s of dictationSentences) {
    const key = normKey(s.korean);
    if (seen.has(key)) continue;
    seen.add(key);
    pool.push({
      korean: s.korean,
      meaning: s.chinese,
      type: 'sentence',
      origin: 'system',
      grammarPoint: s.grammarPoint,
      level: s.level,
    });
  }

  // 2. 主题词包例句(1300+ 句,去重后并入)· 用主题 difficulty 作分级
  for (const t of themePacks) {
    for (const s of t.sentences ?? []) {
      if (!s.korean?.trim()) continue;
      const key = normKey(s.korean);
      if (seen.has(key)) continue;
      seen.add(key);
      pool.push({
        korean: s.korean.trim(),
        meaning: s.chinese,
        type: 'sentence',
        origin: 'system',
        originLabel: t.name,
        level: t.difficulty,
      });
    }
  }

  return pool;
}
