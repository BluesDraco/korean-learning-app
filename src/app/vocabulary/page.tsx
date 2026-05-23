'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  Search, Trash2, X, ChevronDown, ChevronUp,
  BookOpen, GraduationCap, Video, Clock, ArrowRight,
  Sparkles, Hash, Calendar, Filter, Volume2, BookmarkPlus,
} from 'lucide-react';
import { db } from '@/lib/db';
import { AddToBookModal } from '@/components/AddToBookModal';
import type { Word, MasteryLevel } from '@/types';

// ── Mastery display config ──────────────────────────────────────────
const masteryLabel: Record<MasteryLevel, string> = {
  new: '新词',
  learning: '学习中',
  reviewing: '复习中',
  mastered: '已掌握',
};

const masteryColor: Record<MasteryLevel, string> = {
  new: 'bg-[var(--bg-accent)]/60 text-[var(--text-secondary)]',
  learning: 'bg-yellow-500/15 text-[var(--peach-soft)]',
  reviewing: 'bg-blue-500/15 text-[var(--pink-primary)]',
  mastered: 'bg-emerald-500/15 text-[var(--mint-soft)]',
};

const masteryDot: Record<MasteryLevel, string> = {
  new: 'bg-slate-500',
  learning: 'bg-yellow-400',
  reviewing: 'bg-blue-400',
  mastered: 'bg-emerald-400',
};

// ── Helpers ─────────────────────────────────────────────────────────
function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Splits text by the search string and wraps matches in a highlighted <mark>. */
function HighlightText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) return <span>{text}</span>;
  const escaped = escapeRegExp(highlight.trim());
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-yellow-500/25 text-yellow-200 rounded-sm px-0.5 -mx-0.5"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

// ── Filter option definitions ───────────────────────────────────────
const filterOptions: { value: MasteryLevel | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'new', label: '新词' },
  { value: 'learning', label: '学习中' },
  { value: 'reviewing', label: '复习中' },
  { value: 'mastered', label: '已掌握' },
];

// ═══════════════════════════════════════════════════════════════════
//  VocabularyPage
// ═══════════════════════════════════════════════════════════════════
export default function VocabularyPage() {
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<MasteryLevel | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAddToBook, setShowAddToBook] = useState(false);
  const [addToBookWordIds, setAddToBookWordIds] = useState<string[]>([]);

  // ── Load all words ────────────────────────────────────────────
  const loadAllWords = useCallback(async () => {
    setLoading(true);
    const list = await db.words.orderBy('createdAt').reverse().toArray();
    setAllWords(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAllWords();
  }, [loadAllWords]);

  // ── Mastery-level word counts (always from full dataset) ──────
  const masteryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allWords.length };
    for (const level of ['new', 'learning', 'reviewing', 'mastered'] as MasteryLevel[]) {
      counts[level] = allWords.filter((w) => w.mastery === level).length;
    }
    return counts;
  }, [allWords]);

  // ── Filter + search ───────────────────────────────────────────
  const words = useMemo(() => {
    let result = allWords;
    if (filter !== 'all') {
      result = result.filter((w) => w.mastery === filter);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.meaning.toLowerCase().includes(q) ||
          w.pronunciation?.toLowerCase().includes(q) ||
          w.examples.some(
            (ex) =>
              ex.text.toLowerCase().includes(q) ||
              ex.translation.toLowerCase().includes(q),
          ),
      );
    }
    return result;
  }, [allWords, search, filter]);

  // ── Delete handler ────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    await db.words.delete(id);
    await loadAllWords();
  };

  // ── Clear all filters ─────────────────────────────────────────
  const clearFilters = () => {
    setSearch('');
    setFilter('all');
  };

  const hasActiveFilters = search !== '' || filter !== 'all';

  // ═══════════════════════════════════════════════════════════════
  //  Render
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="py-4 space-y-4">
      {/* ─────── Header ─────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <BookOpen size={22} className="text-[var(--pink-primary)]" />
            单词本
          </h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            共{' '}
            <span className="text-[var(--text-primary)] font-medium">{words.length}</span>{' '}
            个单词
            {words.length !== allWords.length && (
              <span className="text-[var(--text-muted)]">
                {' '}
                / 总计 {allWords.length}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/vocabulary/books"
            className="flex items-center gap-1.5 text-sm px-4 py-2.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)] transition-colors"
          >
            <BookmarkPlus size={16} />
            <span className="hidden sm:inline">单词本</span>
          </Link>
          <Link
            href="/learn"
            className="flex items-center gap-1.5 text-sm px-4 py-2.5 rounded-2xl bg-[var(--pink-primary)]/15 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/25 transition-colors"
          >
            <GraduationCap size={16} />
            <span className="hidden sm:inline">去学习</span>
          </Link>
        </div>
      </div>

      {/* ─────── Search Bar ─────── */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索单词、释义、发音或例句..."
          className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl py-3 pl-11 pr-12 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)]/60 focus:ring-2 focus:ring-blue-500/10 transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* ─────── Filter Pills ─────── */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filterOptions.map((opt) => {
          const count = masteryCounts[opt.value];
          const isActive = filter === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`flex items-center gap-2 text-xs px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[var(--pink-primary)] text-[var(--text-primary)] shadow-lg shadow-blue-600/25'
                  : 'bg-[var(--bg-input)]/80 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-accent)]/80'
              }`}
            >
              <span>{opt.label}</span>
              <span
                className={`text-[13px] px-1.5 py-0.5 rounded-md font-mono font-medium tabular-nums ${
                  isActive
                    ? 'bg-white/20 text-[var(--text-primary)]'
                    : 'bg-[var(--bg-accent)] text-[var(--text-muted)]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ═══════ Content Area ═══════ */}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
            <p className="text-sm text-[var(--text-muted)]">加载中...</p>
          </div>
        </div>
      ) : allWords.length === 0 ? (
        /* ─────── Empty: no words at all ─────── */
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-20 h-20 rounded-2xl bg-[var(--bg-input)]/60 flex items-center justify-center mb-5">
            <BookOpen size={36} className="text-[var(--text-placeholder)]" />
          </div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            还没有单词
          </h2>
          <p className="text-sm text-[var(--text-muted)] text-center max-w-xs mb-6">
            开始你的韩语学习之旅，从视频中提取单词，或在学习页面添加新词
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            <Link
              href="/videos"
              className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-primary)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)] transition-all"
            >
              <Video size={16} />
              <span>浏览视频</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/learn"
              className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-[var(--pink-primary)] text-[var(--text-primary)] hover:bg-[var(--pink-primary)] transition-all shadow-lg shadow-blue-600/25"
            >
              <GraduationCap size={16} />
              <span>开始学习</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ) : words.length === 0 ? (
        /* ─────── Empty: filtered / search yielded no results ─────── */
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-20 h-20 rounded-2xl bg-[var(--bg-input)]/60 flex items-center justify-center mb-5">
            <Search size={36} className="text-[var(--text-placeholder)]" />
          </div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
            没有找到匹配的单词
          </h2>
          <p className="text-sm text-[var(--text-muted)] text-center max-w-xs mb-6">
            {search
              ? `没有找到包含"${search}"的单词，试试其他关键词`
              : '当前筛选条件下没有单词'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-primary)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)] transition-all"
            >
              <X size={16} />
              <span>清除筛选</span>
            </button>
          )}
        </div>
      ) : (
        /* ─────── Word List ─────── */
        <div className="space-y-3">
          {words.map((word) => (
            <div
              key={word.id}
              className="bg-white/80 border border-[var(--border-color)]/80 rounded-2xl overflow-hidden hover:border-[var(--pink-pale)]/60 transition-all duration-200"
            >
              {/* ── Card Header (collapsed row) ── */}
              <button
                onClick={() =>
                  setExpandedId(expandedId === word.id ? null : word.id)
                }
                className="w-full flex items-start justify-between p-4 text-left hover:bg-[var(--bg-input)]/40 transition-colors group"
              >
                <div className="min-w-0 flex-1 pr-2">
                  {/* Word + pronunciation + POS */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[var(--text-primary)] font-semibold text-base">
                      <HighlightText text={word.word} highlight={search} />
                    </span>
                    {word.pronunciation && (
                      <span className="text-[var(--text-muted)] text-xs font-mono">
                        [<HighlightText text={word.pronunciation} highlight={search} />]
                      </span>
                    )}
                    {word.partOfSpeech && (
                      <span className="text-[13px] px-1.5 py-0.5 rounded-md bg-[var(--bg-input)] text-[var(--text-muted)] font-medium uppercase tracking-wide">
                        {word.partOfSpeech}
                      </span>
                    )}
                  </div>

                  {/* Meaning */}
                  <div className="text-[var(--text-secondary)] text-sm mt-1.5 line-clamp-1">
                    <HighlightText text={word.meaning} highlight={search} />
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[14px] px-2 py-0.5 rounded-lg font-medium ${masteryColor[word.mastery]}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${masteryDot[word.mastery]}`}
                      />
                      {masteryLabel[word.mastery]}
                    </span>

                    {word.srsLevel > 0 && (
                      <span className="inline-flex items-center gap-1 text-[14px] px-2 py-0.5 rounded-lg bg-purple-500/15 text-[var(--purple-soft)] font-medium">
                        <Hash size={10} />
                        SR {word.srsLevel}
                      </span>
                    )}

                    {word.lastReviewed && (
                      <span className="inline-flex items-center gap-1 text-[14px] px-2 py-0.5 rounded-lg bg-[var(--bg-input)] text-[var(--text-muted)]">
                        <Clock size={10} />
                        {new Date(word.lastReviewed).toLocaleDateString('zh-CN')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2 ml-3 shrink-0">
                  {/* Add to book button */}
                  <span
                      role="button"
                      tabIndex={0}
                      aria-label="加入单词本"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAddToBookWordIds([word.id]);
                        setShowAddToBook(true);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.stopPropagation();
                          setAddToBookWordIds([word.id]);
                          setShowAddToBook(true);
                        }
                      }}
                      className="text-[var(--text-placeholder)] hover:text-[var(--pink-primary)] opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-lg hover:bg-[var(--pink-primary)]/10 cursor-pointer"
                    >
                      <BookmarkPlus size={15} />
                    </span>
                    <span
                    role="button"
                    tabIndex={0}
                    aria-label="删除单词"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(word.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(word.id);
                      }
                    }}
                    className="text-[var(--text-placeholder)] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-lg hover:bg-red-500/10 cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </span>
                  <div className="text-[var(--text-placeholder)]">
                    {expandedId === word.id ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                </div>
              </button>

              {/* ── Expanded Details ── */}
              {expandedId === word.id && (
                <div className="px-4 pb-4 border-t border-[var(--border-color)]/60 pt-4 space-y-3">
                  {/* Examples */}
                  {word.examples.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[14px] text-[var(--text-placeholder)] font-medium uppercase tracking-wide flex items-center gap-1.5">
                        <Sparkles size={11} />
                        例句
                      </p>
                      {word.examples.map((ex, i) => (
                        <div
                          key={i}
                          className="bg-[var(--bg-input)]/60 rounded-xl p-3 border border-[var(--pink-pale)]/40"
                        >
                          <div className="flex items-start gap-2">
                            <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                              <HighlightText text={ex.text} highlight={search} />
                            </p>
                            <button
                              onClick={(e) => { e.stopPropagation(); speakKorean(ex.text); }}
                              className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                              title="听例句发音"
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
                            <HighlightText
                              text={ex.translation}
                              highlight={search}
                            />
                          </p>
                          {ex.source && (
                            <span className="inline-block mt-2 text-[13px] text-[var(--text-placeholder)] bg-[var(--bg-accent)]/50 px-1.5 py-0.5 rounded">
                              {ex.source === 'dictionary'
                                ? '词典'
                                : ex.source === 'video'
                                  ? '视频'
                                  : '手动'}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SRS Metadata */}
                  <div className="flex items-center gap-4 text-xs text-[var(--text-placeholder)] pt-1 flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <Clock size={11} />
                      间隔:{' '}
                      {word.interval < 1
                        ? `${Math.round(word.interval * 1440)}分钟`
                        : `${word.interval}天`}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      下次复习:{' '}
                      {new Date(word.nextReview).toLocaleDateString('zh-CN')}
                    </span>
                    {word.sourceVideoId && (
                      <Link
                        href={`/watch/${word.sourceVideoId}`}
                        className="flex items-center gap-1.5 text-[var(--pink-primary)] hover:text-[var(--pink-primary)] ml-auto"
                      >
                        <Video size={11} />
                        来源视频
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add to Book Modal */}
      {showAddToBook && (
        <AddToBookModal
          mode="select-books"
          preSelectedWordIds={addToBookWordIds}
          onClose={() => setShowAddToBook(false)}
          onDone={() => {}}
        />
      )}
    </div>
  );
}
