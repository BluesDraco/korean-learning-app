// 通用题源构建 · 把 9 种来源统一产出 PoolItem[]（korean/meaning/type/origin/originLabel）。
// 口语/默写/打字练习共用。UI 见 src/components/practice/SourcePicker.tsx。

import type { PoolItem } from './userPool';
import {
  buildMixedPool, buildSystemWordPool, buildSystemSentencePool,
  fetchMistakeItems, fetchUserSentences,
} from './userPool';
import { db } from '@/lib/db';
import type { OriginKind } from '@/components/practice/OriginBadge';
import { t, type Lang } from '@/lib/i18n';

export type SourceKind =
  | 'smart'        // 智能混合（错题优先 + 我的词句 + 系统兜底）
  | 'topik'        // TOPIK 分级词表 1-6
  | 'theme'        // 主题词包
  | 'textbook'     // 教材词汇（延世/首尔/维生素）
  | 'expression'   // 活用表达（惯用语/流行语/外来词）
  | 'builtin'      // 内置词包（初/中/高）
  | 'wordbook'     // 我的单词本
  | 'my-sentence'  // 我的句子
  | 'mistake';     // 我的错题

export type ContentFilter = 'word' | 'sentence' | 'both';

export interface PracticeSourceConfig {
  [k: string]: unknown;
  kind: SourceKind;
  contentFilter: ContentFilter;
  count: number;
  topik?: { level: number };
  theme?: { id: string; name: string };
  textbook?: { series: 'yonsei' | 'seoul' | 'vitamin'; unitId: string; unitName: string };
  expression?: { type: 'idiom' | 'slang' | 'loanword' };
  builtin?: { packId: 'beginner' | 'intermediate' | 'advanced' };
  wordbook?: { id: string; name: string };
}

/** 能提供句子的来源 · 其余为纯词源，选「句子」筛选时无内容 */
export const SENTENCE_CAPABLE: ReadonlySet<SourceKind> = new Set<SourceKind>([
  'smart', 'theme', 'builtin', 'expression', 'my-sentence', 'mistake',
]);

export const DEFAULT_SOURCE_CONFIG: PracticeSourceConfig = {
  kind: 'smart',
  contentFilter: 'both',
  count: 12,
};

/** "全部" 哨兵 · 传给 slice(0, count) 时取满整个池子(池子实际最多几十条) */
export const COUNT_ALL = 9999;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const firstMeaning = (s: string) => s.split(/[；;,、,]/)[0].trim() || s.trim();
const asType = (ko: string): 'word' | 'sentence' =>
  ko.trim().length <= 6 && !ko.trim().includes(' ') ? 'word' : 'sentence';

function applyFilter(items: PoolItem[], filter: ContentFilter): PoolItem[] {
  if (filter === 'both') return items;
  return items.filter(i => i.type === filter);
}

/** 统一入口 · 按 config 产出题目池 */
export async function buildItemsFromSource(config: PracticeSourceConfig, lang: Lang = 'zh'): Promise<PoolItem[]> {
  const { kind, contentFilter, count } = config;

  // 智能混合 · 委托 buildMixedPool（错题优先逻辑），内部已排序/去重
  if (kind === 'smart') {
    const preferType = contentFilter === 'both' ? 'both' : contentFilter;
    const [wordPool, sentPool] = await Promise.all([buildSystemWordPool(), buildSystemSentencePool()]);
    const fallback = contentFilter === 'sentence' ? sentPool
      : contentFilter === 'word' ? wordPool
      : [...wordPool, ...sentPool];
    return buildMixedPool(count, fallback, preferType, Math.min(3, count));
  }

  let items: PoolItem[] = [];

  if (kind === 'topik' && config.topik) {
    const { getLevelWords } = await import('@/data/vocabulary');
    const entries = await getLevelWords(config.topik.level);
    items = entries.map(e => ({
      korean: e.korean,
      meaning: firstMeaning(e.meanings?.[0]?.chinese ?? ''),
      type: 'word' as const,
      origin: 'system' as OriginKind,
      originLabel: t('prac.src_topik_level', lang, { n: config.topik!.level }),
    }));
  } else if (kind === 'theme' && config.theme) {
    const { getThemeWords, getTheme } = await import('@/data/vocabulary');
    if (contentFilter === 'sentence') {
      const theme = await getTheme(config.theme.id);
      const sents = theme?.sentences ?? [];
      items = sents.map(s => ({
        korean: s.korean, meaning: s.chinese, type: 'sentence' as const,
        origin: 'system' as OriginKind, originLabel: config.theme!.name,
      }));
    } else {
      const entries = await getThemeWords(config.theme.id);
      items = entries.map(e => ({
        korean: e.korean, meaning: firstMeaning(e.meanings?.[0]?.chinese ?? ''),
        type: 'word' as const, origin: 'system' as OriginKind, originLabel: config.theme!.name,
      }));
    }
  } else if (kind === 'textbook' && config.textbook) {
    const { loadYonseiUnit, loadSeoulUnit, loadVitaminUnit } = await import('@/lib/dataLoader');
    const loader = config.textbook.series === 'seoul' ? loadSeoulUnit
      : config.textbook.series === 'vitamin' ? loadVitaminUnit : loadYonseiUnit;
    const unit = await loader(config.textbook.unitId);
    items = (unit?.words ?? []).map(w => ({
      korean: w.word, meaning: firstMeaning(w.meaning),
      type: 'word' as const, origin: 'system' as OriginKind, originLabel: config.textbook!.unitName,
    }));
  } else if (kind === 'expression' && config.expression) {
    const mod = await import('@/data/expressions');
    if (config.expression.type === 'idiom') {
      items = mod.idioms.map(x => ({
        korean: x.expression, meaning: x.actualMeaning, type: 'sentence' as const,
        origin: 'system' as OriginKind, originLabel: t('prac.src_idiom', lang),
      }));
    } else if (config.expression.type === 'slang') {
      items = mod.slangs.map(x => ({
        korean: x.expression, meaning: x.meaning, type: 'sentence' as const,
        origin: 'system' as OriginKind, originLabel: t('prac.src_slang', lang),
      }));
    } else {
      items = mod.loanwords.map(x => ({
        korean: x.expression, meaning: x.meaning, type: 'word' as const,
        origin: 'system' as OriginKind, originLabel: t('prac.src_loanword', lang),
      }));
    }
  } else if (kind === 'builtin' && config.builtin) {
    const [{ dictationWordPacks }, { dictationSentences }] = await Promise.all([
      import('@/data/dictationWords'), import('@/data/dictationSentences'),
    ]);
    const packId = config.builtin.packId;
    const words: PoolItem[] = (dictationWordPacks.find(p => p.id === packId)?.words ?? [])
      .map(w => ({ korean: w.korean, meaning: w.meaning, type: 'word' as const, origin: 'system' as OriginKind, tricky: w.tricky }));
    const sents: PoolItem[] = dictationSentences.filter(s => s.level === packId)
      .map(s => ({ korean: s.korean, meaning: s.chinese, type: 'sentence' as const, origin: 'system' as OriginKind, grammarPoint: s.grammarPoint }));
    items = [...words, ...sents];
  } else if (kind === 'wordbook' && config.wordbook) {
    const book = await db.wordBooks.get(config.wordbook.id);
    if (book) {
      const words = await db.words.where('id').anyOf(book.wordIds).toArray();
      items = words.filter(Boolean).map(w => ({
        korean: w.word, meaning: firstMeaning(w.meaning),
        type: asType(w.word), origin: 'my-word' as OriginKind, originLabel: config.wordbook!.name,
      }));
    }
  } else if (kind === 'my-sentence') {
    items = await fetchUserSentences();
  } else if (kind === 'mistake') {
    items = await fetchMistakeItems();
  }

  return shuffle(applyFilter(items, contentFilter)).slice(0, count);
}
