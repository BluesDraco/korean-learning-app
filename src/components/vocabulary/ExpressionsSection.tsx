'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { Search, X, Volume2, BookmarkPlus, BookmarkCheck, AlertTriangle, Loader2, SearchX } from 'lucide-react';
import { idioms, slangs, loanwords } from '@/data/expressions';
import { romanize } from '@/lib/dictionary';
import { speak } from '@/lib/tts';
import { TappableText } from '@/components/TappableText';
import { AddToBookSheet } from '@/components/vocabulary/AddToBookSheet';
<<<<<<< HEAD
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';
import type { Lang } from '@/lib/i18n';
=======
>>>>>>> recovery-branch

type SubTab = 'idioms' | 'slang' | 'loanword';

interface SheetTarget {
  id: string;
  korean: string;
  meaning: string;
  example: string;
  exampleZh: string;
}

<<<<<<< HEAD
// 外来词按语言来源筛选顺序
const loanOriginOrder = ['chinese', 'english', 'japanese', 'french', 'german', 'portuguese', 'spanish', 'russian', 'other'];

// Filter options derived from data (computed once at module level)
const idiomFilterOptions = ['全部', ...new Set(idioms.flatMap(i => i.tags))];
const slangFilterOptions  = ['全部', ...new Set(slangs.map(s => s.mood))];
const loanFilterOptions   = ['全部', ...loanOriginOrder.filter(o => loanwords.some(l => l.origin === o))];

const originLabelKey: Record<string, string> = {
  chinese: 'vocab.ex_origin_chinese', english: 'vocab.ex_origin_english', japanese: 'vocab.ex_origin_japanese',
  german: 'vocab.ex_origin_german', french: 'vocab.ex_origin_french', spanish: 'vocab.ex_origin_spanish',
  portuguese: 'vocab.ex_origin_portuguese', russian: 'vocab.ex_origin_russian', other: 'vocab.ex_origin_other',
};

const originColor: Record<string, string> = {
  chinese: 'var(--color-purple-base)',
  english: 'var(--color-mint-base)',
  japanese: 'var(--color-peach-base)',
  french: 'var(--color-pink-base)',
  german: 'var(--color-ink-3)',
  portuguese: 'var(--color-mint-strong)',
  spanish: 'var(--color-peach-strong)',
  russian: 'var(--color-purple-strong)',
};

function FilterChips({ options, active, onChange, labelMap, lang }: {
  options: string[];
  active: string;
  onChange: (v: string) => void;
  labelMap?: Record<string, string>;
  lang: Lang;
}) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt === '全部' ? 'all' : opt)}
          className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
            (opt === '全部' ? active === 'all' : active === opt)
              ? 'bg-[var(--color-pink-strong)] text-white'
              : 'bg-[var(--color-surface-3)] text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)]'
          }`}
        >
          {opt === '全部' ? t('vocab.ex_all', lang) : (labelMap?.[opt] ?? opt)}
        </button>
      ))}
    </div>
  );
}

const cardShell = 'bg-[var(--color-surface-2)] border border-[var(--color-border-1)] rounded-2xl p-4 sm:p-5 hover:border-[var(--color-pink-base)] hover:shadow-[var(--shadow-sm)] transition-all';

function toRomaja(text: string): string {
  const chars = Array.from(text);
  const isHangul = (c?: string) => !!c && c.charCodeAt(0) >= 0xAC00 && c.charCodeAt(0) <= 0xD7A3;
  let out = '';
  for (let i = 0; i < chars.length; i++) {
    if (isHangul(chars[i]) && isHangul(chars[i - 1])) out += '-';
    out += romanize(chars[i]);
  }
  return out;
}

function Romaja({ text }: { text: string }) {
  return (
    <p className="text-xs text-[var(--color-ink-3)] font-mono mt-0.5 leading-tight">{toRomaja(text)}</p>
  );
}

function CardActions({ isAdded, isPlaying, onAdd, onPlay, lang }: {
  isAdded: boolean;
  isPlaying: boolean;
  onAdd: () => void;
  onPlay: () => void;
  lang: Lang;
}) {
  return (
    <div className="flex items-center gap-0.5 shrink-0">
      <button
        onClick={() => !isAdded && onAdd()}
        className={`w-7 h-7 inline-flex items-center justify-center rounded-lg transition-colors ${isAdded ? 'text-[var(--color-mint-strong)] bg-[var(--color-mint-strong)]/10' : 'text-[var(--color-ink-3)] hover:text-[var(--color-pink-strong)] hover:bg-[var(--color-surface-3)]'}`}
        title={isAdded ? t('vocab.ex_added', lang) : t('vocab.add_to_book', lang)}
      >
        {isAdded ? <BookmarkCheck size={15} /> : <BookmarkPlus size={15} />}
      </button>
      <button
        onClick={onPlay}
        disabled={isPlaying}
        className="w-7 h-7 inline-flex items-center justify-center rounded-lg hover:bg-[var(--color-surface-3)] text-[var(--color-ink-3)] hover:text-[var(--color-pink-strong)] disabled:opacity-100 transition-colors"
        title={t('vocab.speak', lang)}
      >
        {isPlaying
          ? <Loader2 size={15} className="animate-spin text-[var(--color-pink-strong)]" />
          : <Volume2 size={15} />}
      </button>
    </div>
  );
}

function ExampleBlock({ example, exampleZh, lang, isPlaying, onPlay }: { example: string; exampleZh: string; lang: Lang; isPlaying: boolean; onPlay: () => void }) {
  return (
    <div className="mt-3 pt-3 border-t border-dashed border-[var(--color-border-1)]">
      <div className="flex gap-2 items-start">
        <span className="shrink-0 mt-1 text-[10px] font-semibold text-[var(--color-pink-strong)] bg-[var(--color-pink-soft)] px-1.5 py-0.5 rounded-md leading-none">{t('vocab.ex_example', lang)}</span>
        <div className="min-w-0 flex-1">
          <TappableText text={example} className="text-sm text-[var(--color-ink-1)] leading-relaxed" source="表达用法" />
          <p className="text-xs text-[var(--color-ink-3)] mt-1 leading-relaxed">{exampleZh}</p>
        </div>
        <button
          onClick={onPlay}
          disabled={isPlaying}
          className="shrink-0 w-7 h-7 inline-flex items-center justify-center rounded-lg hover:bg-[var(--color-surface-3)] text-[var(--color-ink-3)] hover:text-[var(--color-pink-strong)] disabled:opacity-100 transition-colors"
          title={t('vocab.speak', lang)}
        >
          {isPlaying
            ? <Loader2 size={14} className="animate-spin text-[var(--color-pink-strong)]" />
            : <Volume2 size={14} />}
        </button>
      </div>
    </div>
  );
}

function EmptyState({ query, lang }: { query: string; lang: Lang }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <SearchX size={28} className="text-[var(--color-ink-4)] mb-3" />
      <p className="text-sm text-[var(--color-ink-2)] font-medium">
        {query ? t('vocab.ex_no_result', lang, { query }) : t('vocab.ex_empty_category', lang)}
      </p>
      <p className="text-xs text-[var(--color-ink-4)] mt-1">{t('vocab.ex_try_other', lang)}</p>
    </div>
  );
}

=======
>>>>>>> recovery-branch
export function ExpressionsSection() {
  const { user } = useAuth();
  const { lang } = useLang();
  const [subTab, setSubTab] = useState<SubTab>('idioms');
  const [search, setSearch] = useState('');
<<<<<<< HEAD
  const [filter, setFilter] = useState('all');
  const [addedExprIds, setAddedExprIds] = useState<Set<string>>(new Set());
  const [sheetTarget, setSheetTarget] = useState<SheetTarget | null>(null);
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const playingKeyRef = useRef<string | null>(null);

  const playAudio = async (key: string, text: string) => {
    if (playingKeyRef.current) return;
    playingKeyRef.current = key;
    setPlayingKey(key);
    try { await speak(text); } catch { /* ignore */ }
    finally { playingKeyRef.current = null; setPlayingKey(null); }
  };

  useEffect(() => {
    if (!user?.id) { setAddedExprIds(new Set()); return; }
    let cancelled = false;
    db.expressionAdded.toArray()
      .then(rows => { if (!cancelled) setAddedExprIds(new Set(rows.map(r => r.id))); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [user?.id]);

  // Reset filter + search when switching tabs
  useEffect(() => { setFilter('all'); setSearch(''); }, [subTab]);

  const markAdded = (id: string) => {
    setAddedExprIds(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev).add(id);
      db.expressionAdded.put({ id, createdAt: Date.now() }).catch(() => {});
      return next;
    });
  };
=======
  const [addedExprIds, setAddedExprIds] = useState<Set<string>>(new Set());
  const [sheetTarget, setSheetTarget] = useState<SheetTarget | null>(null);
>>>>>>> recovery-branch

  const filteredIdioms = useMemo(() => {
    const list = filter === 'all' ? idioms : idioms.filter(i => i.tags.includes(filter));
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(i =>
      i.expression.includes(q) || i.literalMeaning.includes(q) ||
      i.actualMeaning.includes(q) || i.chineseEquivalent.includes(q)
    );
  }, [search, filter]);

  const filteredSlangs = useMemo(() => {
    const list = filter === 'all' ? slangs : slangs.filter(s => s.mood === filter);
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(s =>
      s.expression.includes(q) || s.meaning.includes(q) || s.usage.includes(q) ||
      (s.formalAlternative?.includes(q) ?? false)
    );
  }, [search, filter]);

  const filteredLoanwords = useMemo(() => {
    const list = filter === 'all' ? loanwords : loanwords.filter(l => l.origin === filter);
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(l => l.expression.includes(q) || l.original.includes(q) || l.meaning.includes(q));
  }, [search, filter]);

  const tabs = [
    { k: 'idioms'   as const, l: t('vocab.ex_tab_idiom', lang), count: idioms.length },
    { k: 'slang'    as const, l: t('vocab.ex_tab_slang', lang), count: slangs.length },
    { k: 'loanword' as const, l: t('vocab.ex_tab_loan', lang),  count: loanwords.length },
  ];

  const handleSheetClose = () => {
    if (sheetTarget) setAddedExprIds(prev => new Set(prev).add(sheetTarget.id));
    setSheetTarget(null);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-3)]" />
        <input
          type="search" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={t('vocab.ex_search_ph', lang)}
          className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border-1)] rounded-xl py-2.5 pl-10 pr-10 text-sm text-[var(--color-ink-1)] placeholder:text-[var(--color-ink-3)] focus:outline-none focus:border-[var(--color-pink-strong)]"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X size={14} className="text-[var(--color-ink-3)]" />
          </button>
        )}
      </div>

      {/* Sub-tabs with counts */}
      <div className="flex bg-[var(--color-surface-2)] border border-[var(--color-border-1)] rounded-xl p-1 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.k}
            onClick={() => setSubTab(tab.k)}
            className={`flex-1 text-sm py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              subTab === tab.k ? 'bg-[var(--color-pink-strong)] text-white font-medium' : 'text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)]'
            }`}
          >
            {tab.l}
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
              subTab === tab.k ? 'bg-white/20 text-white' : 'bg-[var(--color-surface-3)] text-[var(--color-ink-3)]'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 惯用语 */}
      {subTab === 'idioms' && (
<<<<<<< HEAD
        <>
          <FilterChips options={idiomFilterOptions} active={filter} onChange={setFilter} lang={lang} />
          {filteredIdioms.length === 0 ? (
            <EmptyState query={search.trim()} lang={lang} />
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredIdioms.map((item) => {
              const isAdded = addedExprIds.has(item.id);
              return (
                <div key={item.id} className={cardShell}>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xl font-bold text-[var(--color-ink-1)] leading-snug">{item.expression}</h4>
                      <Romaja text={item.expression} />
                    </div>
                    <CardActions
                      isAdded={isAdded}
                      isPlaying={playingKey === item.id}
                      onAdd={() => setSheetTarget({ id: item.id, korean: item.expression, meaning: item.actualMeaning, example: item.example, exampleZh: item.exampleZh })}
                      onPlay={() => playAudio(item.id, item.expression)}
                      lang={lang}
                    />
                  </div>
                  <p className="text-base font-semibold text-[var(--color-ink-1)] leading-snug">{item.actualMeaning}</p>
                  <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                    <span className="text-xs text-[var(--color-ink-3)]">{t('vocab.ex_literal', lang, { text: item.literalMeaning })}</span>
                    {item.chineseEquivalent && (
                      <span className="text-xs text-[var(--color-ink-2)] bg-[var(--color-surface-3)] px-2 py-0.5 rounded-full">
                        ≈ {item.chineseEquivalent}
                      </span>
                    )}
                  </div>
                  <ExampleBlock example={item.example} exampleZh={item.exampleZh} lang={lang}
                    isPlaying={playingKey === `${item.id}-ex`}
                    onPlay={() => playAudio(`${item.id}-ex`, item.example)} />
                </div>
              );
            })}
          </div>
          )}
        </>
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredIdioms.map((item) => {
            const isAdded = addedExprIds.has(item.id);
            return (
            <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--pink-pale)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[var(--text-primary)]">{item.expression}</h4>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => !isAdded && setSheetTarget({ id: item.id, korean: item.expression, meaning: item.actualMeaning, example: item.example, exampleZh: item.exampleZh })}
                    className={`p-1 rounded-lg transition-colors ${isAdded ? 'text-[var(--mint-soft)] bg-[var(--mint-soft)]/10' : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-input)]'}`}
                    title={isAdded ? '已添加' : '加入单词本'}
                  >
                    {isAdded ? <BookmarkCheck size={14} /> : <BookmarkPlus size={14} />}
                  </button>
                  <button onClick={() => speak(item.expression, 0.7)} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)]"><Volume2 size={14} /></button>
                </div>
              </div>
              <div className="bg-[var(--bg-input)] rounded-lg p-2.5 mb-2 text-sm">
                <span className="text-[var(--text-muted)]">字面: </span>{item.literalMeaning}
                <span className="text-[var(--pink-primary)] mx-2">→</span>
                <span className="font-medium">{item.actualMeaning}</span>
              </div>
              <TappableText text={item.example} className="text-xs text-[var(--text-placeholder)]" source="表达用法" />
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.exampleZh}</p>
            </div>
            );
          })}
        </div>
>>>>>>> recovery-branch
      )}

      {/* 网络用语 */}
      {subTab === 'slang' && (
<<<<<<< HEAD
        <>
          <FilterChips options={slangFilterOptions} active={filter} onChange={setFilter} lang={lang} />
          {filteredSlangs.length === 0 ? (
            <EmptyState query={search.trim()} lang={lang} />
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredSlangs.map((item) => {
              const isAdded = addedExprIds.has(item.id);
              return (
                <div key={item.id} className={cardShell}>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h4 className="text-xl font-bold text-[var(--color-ink-1)] leading-snug">{item.expression}</h4>
                        <span className="inline-flex items-center gap-0.5 shrink-0">
                          {Array.from({ length: 3 }, (_, i) => (
                            <span key={i} className="inline-block w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: i < item.hotLevel ? 'var(--color-pink-strong)' : 'var(--color-border-2)' }} />
                          ))}
                          <span className="text-[10px] text-[var(--color-ink-3)] ml-1">
                            {item.hotLevel === 3 ? t('vocab.ex_hot_super', lang) : item.hotLevel === 2 ? t('vocab.ex_hot_popular', lang) : t('vocab.ex_hot_common', lang)}
                          </span>
                        </span>
                      </div>
                      <Romaja text={item.expression} />
                    </div>
                    <CardActions
                      isAdded={isAdded}
                      isPlaying={playingKey === item.id}
                      onAdd={() => setSheetTarget({ id: item.id, korean: item.expression, meaning: item.meaning, example: item.example, exampleZh: item.exampleZh })}
                      onPlay={() => playAudio(item.id, item.expression)}
                      lang={lang}
                    />
                  </div>
                  <p className="text-base font-semibold text-[var(--color-ink-1)] leading-snug">{item.meaning}</p>
                  <p className="text-xs text-[var(--color-ink-3)] leading-relaxed mt-1.5">{item.usage}</p>
                  <ExampleBlock example={item.example} exampleZh={item.exampleZh} lang={lang}
                    isPlaying={playingKey === `${item.id}-ex`}
                    onPlay={() => playAudio(`${item.id}-ex`, item.example)} />
                  {item.formalWarning && item.formalAlternative && (
                    <div
                      className="flex items-start gap-1.5 mt-2.5 px-2.5 py-2 rounded-lg text-xs leading-relaxed"
                      style={{ background: 'color-mix(in srgb, var(--color-peach-base) 12%, transparent)' }}
                    >
                      <AlertTriangle size={13} className="shrink-0 mt-0.5 text-[var(--color-peach-strong)]" />
                      <span className="text-[var(--color-ink-2)]">
                        {t('vocab.ex_slang_warn', lang)}{' '}
                        <button
                          onClick={() => playAudio(`${item.id}-formal`, item.formalAlternative!)}
                          className="font-semibold text-[var(--color-peach-strong)] underline decoration-dotted underline-offset-2"
                        >
                          {item.formalAlternative}
                        </button>
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          )}
        </>
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredSlangs.map((item) => {
            const isAdded = addedExprIds.has(item.id);
            return (
            <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--purple-soft)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[var(--text-primary)]">{item.expression}</h4>
                  <span className="flex">{Array.from({ length: item.hotLevel }, (_, i) => <Flame key={i} size={11} className="text-[var(--pink-primary)] fill-[var(--pink-primary)]" />)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => !isAdded && setSheetTarget({ id: item.id, korean: item.expression, meaning: item.meaning, example: item.example, exampleZh: item.exampleZh })}
                    className={`p-1 rounded-lg transition-colors ${isAdded ? 'text-[var(--mint-soft)] bg-[var(--mint-soft)]/10' : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-input)]'}`}
                    title={isAdded ? '已添加' : '加入单词本'}
                  >
                    {isAdded ? <BookmarkCheck size={14} /> : <BookmarkPlus size={14} />}
                  </button>
                  <button onClick={() => speak(item.expression, 0.7)} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)]"><Volume2 size={14} /></button>
                </div>
              </div>
              <p className="text-sm text-[var(--text-primary)] mb-1.5">{item.meaning}</p>
              <p className="text-xs text-[var(--text-secondary)] mb-2">{item.usage}</p>
              <TappableText text={item.example} className="text-xs text-[var(--text-placeholder)]" source="表达用法" />
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.exampleZh}</p>
            </div>
            );
          })}
        </div>
>>>>>>> recovery-branch
      )}

      {/* 外来词 */}
      {subTab === 'loanword' && (
<<<<<<< HEAD
        <>
          <FilterChips options={loanFilterOptions} active={filter} onChange={setFilter} labelMap={Object.fromEntries(Object.entries(originLabelKey).map(([k, key]) => [k, t(key, lang)]))} lang={lang} />
          {filteredLoanwords.length === 0 ? (
            <EmptyState query={search.trim()} lang={lang} />
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {filteredLoanwords.map((item) => {
              const isAdded = addedExprIds.has(item.id);
              const color = originColor[item.origin] ?? 'var(--color-ink-3)';
              return (
                <div key={item.id} className={cardShell}>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <h4 className="text-xl font-bold text-[var(--color-ink-1)] leading-snug">{item.expression}</h4>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                          style={{ color, background: `color-mix(in srgb, ${color} 15%, transparent)` }}
                        >
                          {t(originLabelKey[item.origin] ?? 'vocab.ex_origin_other', lang)}
                        </span>
                      </div>
                      <Romaja text={item.expression} />
                    </div>
                    <CardActions
                      isAdded={isAdded}
                      isPlaying={playingKey === item.id}
                      onAdd={() => setSheetTarget({ id: item.id, korean: item.expression, meaning: item.meaning, example: item.example, exampleZh: item.exampleZh })}
                      onPlay={() => playAudio(item.id, item.expression)}
                      lang={lang}
                    />
                  </div>
                  <p className="text-base font-semibold text-[var(--color-ink-1)] leading-snug">{item.meaning}</p>
                  <p className="text-xs text-[var(--color-ink-3)] mt-1.5">
                    {t('vocab.ex_from', lang)} <span className="text-[var(--color-ink-2)] font-medium">{item.original}</span>
                  </p>
                  <ExampleBlock example={item.example} exampleZh={item.exampleZh} lang={lang}
                    isPlaying={playingKey === `${item.id}-ex`}
                    onPlay={() => playAudio(`${item.id}-ex`, item.example)} />
                </div>
              );
            })}
          </div>
          )}
        </>
      )}

      {sheetTarget && (
        <AddToBookSheet
          word={{ korean: sheetTarget.korean, pronunciation: '', meaning: sheetTarget.meaning, partOfSpeech: 'expression', examples: [{ text: sheetTarget.example, translation: sheetTarget.exampleZh }] }}
          onClose={() => setSheetTarget(null)}
          onAdded={() => { if (sheetTarget) markAdded(sheetTarget.id); }}
        />
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredLoanwords.map((item) => {
            const isAdded = addedExprIds.has(item.id);
            return (
            <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--blue-soft)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[var(--text-primary)]">{item.expression}</h4>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => !isAdded && setSheetTarget({ id: item.id, korean: item.expression, meaning: item.meaning, example: item.example, exampleZh: item.exampleZh })}
                    className={`p-1 rounded-lg transition-colors ${isAdded ? 'text-[var(--mint-soft)] bg-[var(--mint-soft)]/10' : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-input)]'}`}
                    title={isAdded ? '已添加' : '加入单词本'}
                  >
                    {isAdded ? <BookmarkCheck size={14} /> : <BookmarkPlus size={14} />}
                  </button>
                  <button onClick={() => speak(item.expression, 0.7)} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)]"><Volume2 size={14} /></button>
                </div>
              </div>
              <div className="text-sm mb-2"><span className="text-[var(--text-muted)]">{item.original}</span><span className="mx-2">→</span><span className="font-medium">{item.meaning}</span></div>
              <TappableText text={item.example} className="text-xs text-[var(--text-placeholder)]" source="表达用法" />
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.exampleZh}</p>
            </div>
            );
          })}
        </div>
>>>>>>> recovery-branch
      )}

      {sheetTarget && (
        <AddToBookSheet
          word={{ korean: sheetTarget.korean, pronunciation: '', meaning: sheetTarget.meaning, partOfSpeech: 'expression', examples: [{ text: sheetTarget.example, translation: sheetTarget.exampleZh }] }}
          onClose={handleSheetClose}
        />
      )}
    </div>
  );
}
