'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import {
  Search, X, Volume2, Loader2,
  ChevronDown, ChevronUp, BookOpen, BookmarkPlus,
} from 'lucide-react';
import { useToast } from '@/hooks/useToast';
import { speak, speakWord } from '@/lib/tts';
import { displayRoman } from '@/lib/dictionary';
import { TappableText } from '@/components/TappableText';
import { AddToBookSheet } from '@/components/vocabulary/AddToBookSheet';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';
import type { DictEntry, DictListItem } from '@/types';

const LEVEL_STYLE: Record<string, { bg: string; fg: string; labelKey: string }> = {
  '초급': { bg: 'var(--color-mint-soft)', fg: 'var(--color-mint-strong)', labelKey: 'vocab.dict_level_beginner' },
  '중급': { bg: 'var(--color-peach-soft)', fg: 'var(--color-peach-strong)', labelKey: 'vocab.dict_level_intermediate' },
  '고급': { bg: 'var(--color-pink-soft)', fg: 'var(--color-pink-strong)', labelKey: 'vocab.dict_level_advanced' },
};

interface IndexItem { key: string; count: number }

// list item 速览释义：中文对译 > 中文释义 > 韩语释义
function listGloss(it: DictListItem): string {
  return it.zh || it.defZh || it.defKo || '';
}

export function DictEncyclopediaSection({ initialQuery = '' }: { initialQuery?: string }) {
  const { showToast } = useToast();
  const { lang } = useLang();
  const [index, setIndex] = useState<IndexItem[]>([]);
  const [activeInitial, setActiveInitial] = useState('ㄱ');
  const [items, setItems] = useState<DictListItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState('');

  // search
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<DictListItem[] | null>(null);
  const [searching, setSearching] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // per-entry detail (lazy)
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [detailCache, setDetailCache] = useState<Map<string, DictEntry | 'error'>>(new Map());
  const [detailLoading, setDetailLoading] = useState<string | null>(null);

  // 例句点译（key = 例句韩文原文）
  const [exTrans, setExTrans] = useState<Map<string, string | 'loading' | 'error'>>(new Map());
  const translateExample = useCallback(async (ko: string) => {
    const cur = exTrans.get(ko);
    if (cur && cur !== 'error') return;
    setExTrans(prev => new Map(prev).set(ko, 'loading'));
    try {
      const res = await fetch('/api/dict/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: ko }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (isMountedRef.current) setExTrans(prev => new Map(prev).set(ko, data.translation || 'error'));
    } catch {
      if (isMountedRef.current) setExTrans(prev => new Map(prev).set(ko, 'error'));
    }
  }, [exTrans]);

  // 加入单词本弹窗的目标词（加入即自动进复习序列）
  const [sheetWord, setSheetWord] = useState<{ korean: string; pronunciation: string; meaning: string; partOfSpeech: string; examples?: { text: string; translation: string }[]; sourceEntryId?: string } | null>(null);

  const bucketAbortRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  const loadBucket = useCallback(async (initial: string, pageNum: number, append: boolean) => {
    bucketAbortRef.current?.abort();
    const controller = new AbortController();
    bucketAbortRef.current = controller;
    const { signal } = controller;
    setLoading(true);
    try {
      const res = await fetch(`/api/dict/browse?initial=${encodeURIComponent(initial)}&page=${pageNum}`, { cache: 'force-cache', signal });
      if (signal.aborted) return;
      const data = await res.json();
      setItems(prev => append ? [...prev, ...(data.items ?? [])] : (data.items ?? []));
      setHasMore(!!data.hasMore);
      setTotal(data.total ?? 0);
      if (data.index) setIndex(data.index);
      if (data.source) setSource(data.source);
    } catch (e) {
      if ((e as Error)?.name !== 'AbortError' && !append) setItems([]);
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  }, []);

  // 卸载时 abort 未完成的请求 + 标记卸载
  useEffect(() => () => { isMountedRef.current = false; bucketAbortRef.current?.abort(); }, []);

  // 有 initialQuery 时由下方 search effect 负责首屏，避免多余的浏览请求被搜索结果覆盖
  useEffect(() => {
    if (initialQuery.trim()) return;
    loadBucket('ㄱ', 0, false);
  }, [loadBucket, initialQuery]);

  const switchInitial = (initial: string) => {
    if (initial === activeInitial && !searchResults) return;
    setActiveInitial(initial);
    setPage(0);
    setExpandedId(null);
    setSearchQuery('');
    setSearchResults(null);
    loadBucket(initial, 0, false);
  };

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    loadBucket(activeInitial, next, true);
  };

  // ── search (debounced) ──
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    const q = searchQuery.trim();
    if (!q) { setSearchResults(null); setSearching(false); return; }
    setSearching(true);
    const controller = new AbortController();
    searchTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/dict/search?q=${encodeURIComponent(q)}`, { cache: 'no-store', signal: controller.signal });
        const data = await res.json();
        setSearchResults(data.results ?? []);
      } catch (e) {
        if ((e as Error)?.name !== 'AbortError') setSearchResults([]);
      } finally {
        if (!controller.signal.aborted) setSearching(false);
      }
    }, 250);
    return () => { if (searchTimer.current) clearTimeout(searchTimer.current); controller.abort(); };
  }, [searchQuery]);

  // ── load detail for expand ──
  const toggleExpand = async (id: string) => {
    if (expandedId === id) { setExpandedId(null); return; }
    setExpandedId(id);
    if (detailCache.has(id) && detailCache.get(id) !== 'error') return;
    setDetailLoading(id);
    try {
      const res = await fetch(`/api/dict/entry?id=${encodeURIComponent(id)}`, { cache: 'force-cache' });
      const data = await res.json();
      setDetailCache(prev => new Map(prev).set(id, data.entry ?? 'error'));
    } catch {
      setDetailCache(prev => new Map(prev).set(id, 'error'));
    } finally {
      setDetailLoading(null);
    }
  };

  // ── entry → Word 映射 ──
  function entryToWord(e: DictEntry) {
    const first = e.s[0];
    const meaning = first?.zh || first?.defZh || first?.defKo || e.k;
    const examples = e.s.flatMap(s => (s.ex ?? []).map(x => ({ text: x.ex, translation: s.zh || s.defZh || '' }))).slice(0, 4);
    return {
      korean: e.k,
      pronunciation: displayRoman(e.pron, e.k),
      meaning,
      partOfSpeech: e.pos || '',
      examples,
      sourceEntryId: `krdict:${e.id}`,
    };
  }

  // 需要完整 entry（详情）才能拿例句/多义；加入复习时若未加载则现拉
  async function ensureEntry(id: string): Promise<DictEntry | null> {
    const cached = detailCache.get(id);
    if (cached && cached !== 'error') return cached;
    try {
      const res = await fetch(`/api/dict/entry?id=${encodeURIComponent(id)}`, { cache: 'force-cache' });
      const data = await res.json();
      if (data.entry) { if (isMountedRef.current) setDetailCache(prev => new Map(prev).set(id, data.entry)); return data.entry; }
    } catch { /* noop */ }
    return null;
  }

  const openBookSheet = async (it: DictListItem) => {
    const entry = await ensureEntry(it.id);
    setSheetWord(entry ? entryToWord(entry) : {
      korean: it.k, pronunciation: displayRoman(it.pron, it.k), meaning: listGloss(it), partOfSpeech: it.pos || '', examples: [], sourceEntryId: `krdict:${it.id}`,
    });
  };

  const list = searchResults ?? items;
  const isSearchMode = searchResults !== null;

  return (
    <div className="space-y-4 pb-[calc(56px+env(safe-area-inset-bottom,0px))]">
      {/* ═════ Search HERO ═════ */}
      <div
        className="rounded-2xl px-5 pt-6 pb-5"
        style={{
          background: 'linear-gradient(135deg, var(--color-purple-soft), var(--color-surface-2) 75%)',
          border: '1px solid var(--color-border-1)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--color-pink-strong)' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('vocab.dict_search_ph', lang)}
            className="w-full rounded-xl pl-11 pr-11 py-3.5 text-[15px] font-medium text-[var(--text-primary)] placeholder:text-[var(--text-muted)] placeholder:font-normal focus:outline-none transition-shadow"
            style={{
              background: 'var(--color-surface-1)',
              border: '1.5px solid var(--color-border-1)',
              boxShadow: 'var(--shadow-xs)',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-pink-base)'; e.currentTarget.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--color-pink-base) 18%, transparent)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-1)'; e.currentTarget.style.boxShadow = 'var(--shadow-xs)'; }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <X size={18} />
            </button>
          )}
        </div>
        <p className="text-xs mt-2.5 ml-1" style={{ color: 'var(--color-ink-3)' }}>
          {t('vocab.dict_search_hint', lang)}
        </p>

        {/* 초성 index bar — hidden in search mode */}
        {!isSearchMode && (
          <div className="flex gap-1 overflow-x-auto pt-4 mt-4 -mx-1 px-1 scrollbar-none" style={{ borderTop: '1px solid var(--color-border-1)' }}>
            {index.map(({ key, count }) => {
              const active = key === activeInitial;
              const disabled = count === 0;
              return (
                <button
                  key={key}
                  onClick={() => !disabled && switchInitial(key)}
                  disabled={disabled}
                  className="shrink-0 min-w-[34px] h-9 rounded-lg text-sm font-bold transition-colors disabled:opacity-30"
                  style={{
                    background: active ? 'var(--color-pink-base)' : 'var(--color-surface-1)',
                    color: active ? 'var(--text-on-pink)' : 'var(--color-ink-2)',
                    border: `1px solid ${active ? 'var(--color-pink-base)' : 'var(--color-border-1)'}`,
                  }}
                >
                  {key}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* count line */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-[var(--text-muted)]">
          {isSearchMode
            ? (searching ? t('vocab.dict_searching', lang) : t('vocab.dict_n_results', lang, { n: list.length }))
            : t('vocab.dict_initial_total', lang, { initial: activeInitial, total })}
        </p>
      </div>

      {/* Word list */}
      {loading || (initialQuery.trim() && searchResults === null) ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={22} className="animate-spin" style={{ color: 'var(--color-pink-strong)' }} />
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen size={40} className="text-[var(--text-muted)] mx-auto mb-3 opacity-40" />
          <p className="text-sm text-[var(--text-secondary)]">{isSearchMode ? t('vocab.dict_no_match', lang) : t('vocab.dict_empty_initial', lang)}</p>
        </div>
      ) : (
        <div className="space-y-2">
          {list.map((it) => {
            const isExpanded = expandedId === it.id;
            const detail = detailCache.get(it.id);
            const lv = it.lv ? LEVEL_STYLE[it.lv] : null;
            return (
              <div key={it.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleExpand(it.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleExpand(it.id); } }}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--bg-card-hover)] transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-bold text-[var(--text-primary)] text-[18px] leading-tight">{it.k}</span>
                      {it.h && <span className="text-[11px] text-[var(--text-muted)] -ml-1">{it.h}</span>}
                      {(() => {
                        const roman = displayRoman(it.pron, it.k);
                        return roman ? (
                          <span className="text-[13px] text-[var(--text-muted)]">[{roman}]</span>
                        ) : null;
                      })()}
                      {lv && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium" style={{ background: lv.bg, color: lv.fg }}>{t(lv.labelKey, lang)}</span>
                      )}
                    </div>
                    <p className="text-[14px] text-[var(--text-secondary)] mt-1.5 truncate leading-relaxed">
                      {it.pos && <span className="text-[11px] text-[var(--text-muted)] mr-1.5">{it.pos}</span>}
                      {listGloss(it)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); speakWord(it.k); }}
                      className="p-2.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                      aria-label={t('vocab.dict_pronounce', lang)}
                    >
                      <Volume2 size={14} />
                    </button>
                    {isExpanded ? <ChevronUp size={16} className="text-[var(--text-muted)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
                  </div>
                </div>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-3">
                    {detailLoading === it.id ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 size={18} className="animate-spin" style={{ color: 'var(--color-pink-strong)' }} />
                      </div>
                    ) : detail && detail !== 'error' ? (
                      <>
                        {detail.s.map((sense, i) => (
                          <div key={i} className="space-y-1.5">
                            <div className="flex items-baseline gap-2">
                              <span className="text-[11px] font-bold text-[var(--pink-primary)] shrink-0">{detail.s.length > 1 ? `${i + 1}.` : ''}</span>
                              <div className="min-w-0">
                                {sense.zh && <p className="text-sm font-semibold text-[var(--text-primary)]">{sense.zh}</p>}
                                {sense.defZh && <p className="text-[13px] text-[var(--text-secondary)]">{sense.defZh}</p>}
                                <p className="text-[12px] text-[var(--text-muted)] mt-0.5">{sense.defKo}</p>
                              </div>
                            </div>
                            {(sense.ex ?? []).slice(0, 3).map((x, j) => {
                              const tr = exTrans.get(x.ex);
                              return (
                                <div key={j} className="ml-4 bg-[var(--bg-input)] rounded-lg px-3 py-2">
                                  <div className="flex items-start gap-2">
                                    <div className="flex-1 min-w-0">
                                      <TappableText text={x.ex} className="text-[13px] text-[var(--text-primary)]" source="词典百科" highlightWord={detail.k} />
                                    </div>
                                    <button
                                      onClick={() => translateExample(x.ex)}
                                      disabled={tr === 'loading'}
                                      className="px-2 py-1 rounded-lg text-[11px] font-medium hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0 disabled:opacity-50"
                                      title={t('vocab.dict_translate', lang)}
                                    >
                                      {tr === 'loading' ? <Loader2 size={12} className="animate-spin" /> : t('vocab.dict_translate_short', lang)}
                                    </button>
                                    <button onClick={() => speak(x.ex)} className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0">
                                      <Volume2 size={13} />
                                    </button>
                                  </div>
                                  {tr && tr !== 'loading' && (
                                    <p className="text-[12px] text-[var(--text-secondary)] mt-1.5 leading-relaxed">
                                      {tr === 'error' ? <span className="text-[var(--text-muted)]">{t('vocab.dict_translate_failed', lang)}</span> : tr}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                        {detail.cat && (
                          <p className="text-[11px] text-[var(--text-muted)]">{t('vocab.dict_category', lang, { cat: detail.cat })}</p>
                        )}
                        {/* Action：加入单词本即自动进复习序列（同 TOPIK 点词） */}
                        <div className="pt-1">
                          <button
                            onClick={() => openBookSheet(it)}
                            className="w-full flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-[var(--color-pink-base)] text-white text-sm font-bold"
                          >
                            <BookmarkPlus size={15} />{t('vocab.add_to_book', lang)}
                          </button>
                        </div>
                      </>
                    ) : (
                      <p className="text-xs text-[var(--text-muted)] text-center py-2">{t('vocab.dict_load_failed', lang)}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Load more (browse mode only) */}
          {!isSearchMode && hasMore && (
            <button
              onClick={loadMore}
              disabled={loading}
              className="w-full py-3 text-xs text-[var(--pink-primary)] font-medium text-center disabled:opacity-50"
            >
              {loading ? t('common.loading', lang) : t('vocab.dict_load_more', lang, { n: total - list.length })}
            </button>
          )}
        </div>
      )}

      {/* 数据来源署名（CC BY-SA 许可要求） */}
      {source && (
        <p className="text-[10px] text-center pt-2 pb-1" style={{ color: 'var(--color-ink-4)' }}>
          {t('vocab.dict_source', lang, { source })}
        </p>
      )}

      {sheetWord && (
        <AddToBookSheet
          word={sheetWord}
          onClose={() => setSheetWord(null)}
          onAdded={() => showToast(t('vocab.dict_added', lang), 'success')}
        />
      )}
    </div>
  );
}
