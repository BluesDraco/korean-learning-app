'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, Target, Volume2, ChevronDown, ChevronUp,
  Loader2, Sparkles, Play, BarChart3,
} from 'lucide-react';
import { getLevel, getLevelWords } from '@/data/vocabulary';
import { db } from '@/lib/db';
import type { WordEntry, LevelWordList } from '@/types';
import { speak } from '@/lib/tts';

const levelNames: Record<number, string> = {
  1: '1级 · 入门', 2: '2级 · 基础', 3: '3级 · 进阶',
  4: '4级 · 中级', 5: '5级 · 高级', 6: '6级 · 精通',
};

export default function LevelDetailPage() {
  const { level: levelStr } = useParams<{ level: string }>();
  const router = useRouter();
  const level = parseInt(levelStr);

  const [lvl, setLvl] = useState<LevelWordList | null>(null);
  const [words, setWords] = useState<WordEntry[]>([]);
  const [masteredSet, setMasteredSet] = useState<Set<string>>(new Set());
  const [learningSet, setLearningSet] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [partFilter, setPartFilter] = useState<string>('全部');
  const [addingAll, setAddingAll] = useState(false);
  const [addedCount, setAddedCount] = useState(0);

  useEffect(() => {
    if (isNaN(level) || level < 1 || level > 6) { router.push('/vocabulary/levels'); return; }
    const l = getLevel(level);
    if (!l) { router.push('/vocabulary/levels'); return; }
    setLvl(l);
    const w = getLevelWords(level);
    setWords(w);

    (async () => {
      const koreanWords = w.map((e) => e.korean);
      const userWords = await db.words.where('word').anyOf(koreanWords).toArray();
      const mSet = new Set(userWords.filter((uw) => uw.mastery === 'mastered').map((uw) => uw.word));
      const lSet = new Set(userWords.filter((uw) => uw.mastery !== 'mastered' && uw.mastery !== 'new').map((uw) => uw.word));
      setMasteredSet(mSet);
      setLearningSet(lSet);
      setLoading(false);
    })();
  }, [level, router]);

  // Part of speech filter options
  const partOptions = useMemo(() => {
    const parts = new Set(words.map((w) => w.partOfSpeech));
    return ['全部', ...Array.from(parts)];
  }, [words]);

  const filteredWords = useMemo(() => {
    if (partFilter === '全部') return words;
    return words.filter((w) => w.partOfSpeech === partFilter);
  }, [words, partFilter]);

  const handleAddAll = async () => {
    setAddingAll(true);
    let count = 0;
    for (const entry of filteredWords) {
      const exists = await db.words.where('word').equals(entry.korean).first();
      if (!exists) {
        await db.words.put({
          id: crypto.randomUUID(),
          word: entry.korean,
          pronunciation: entry.romanization,
          meaning: entry.meanings[0]?.chinese || '',
          partOfSpeech: entry.partOfSpeech,
          examples: entry.examples.map((ex) => ({
            text: ex.korean,
            translation: ex.chinese,
            source: 'dictionary' as const,
          })),
          sourceEntryId: entry.id,
          mastery: 'new',
          srsLevel: 0,
          easeFactor: 2.5,
          interval: 0,
          createdAt: Date.now(),
          lastReviewed: null,
          nextReview: Date.now(),
        });
        count++;
      }
    }
    setAddedCount(count);
    setAddingAll(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!lvl) return null;

  const total = words.length;
  const mastered = Array.from(masteredSet).filter((w) => words.some((e) => e.korean === w)).length;
  const learning = Array.from(learningSet).filter((w) => words.some((e) => e.korean === w)).length;
  const untouched = total - mastered - learning;

  return (
    <div className="py-4 space-y-5 pb-24">
      {/* Header */}
      <div>
        <Link href="/vocabulary/levels" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} />
          返回分级词表
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-[var(--pink-primary)]">{level}级</span>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">{levelNames[level]}</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              TOPIK {level <= 2 ? 'I' : 'II'} · 核心词汇 {lvl.totalCount.toLocaleString()} 词
            </p>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center">
          <BookOpen size={16} className="text-[var(--pink-primary)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)]">{total}</p>
          <p className="text-xs text-[var(--text-muted)]">本级别词</p>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center">
          <Target size={16} className="text-[var(--mint-soft)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--mint-soft)]">{mastered}</p>
          <p className="text-xs text-[var(--text-muted)]">已掌握</p>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center">
          <BarChart3 size={16} className="text-[var(--peach-soft)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--peach-soft)]">{untouched}</p>
          <p className="text-xs text-[var(--text-muted)]">未接触</p>
        </div>
      </div>

      {/* Three-color progress bar */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-xs text-[var(--text-muted)]">
          <span>级别进度</span>
          <span>{total > 0 ? Math.round(((mastered + learning) / total) * 100) : 0}%</span>
        </div>
        <div className="w-full bg-[var(--bg-input)] rounded-full h-2.5 flex overflow-hidden">
          <div
            className="h-full rounded-l-full transition-all"
            style={{ width: `${total > 0 ? (mastered / total) * 100 : 0}%`, backgroundColor: 'var(--mint-soft)' }}
          />
          <div
            className="h-full transition-all"
            style={{ width: `${total > 0 ? (learning / total) * 100 : 0}%`, backgroundColor: 'var(--peach-soft)' }}
          />
          <div className="h-full rounded-r-full flex-1" style={{ backgroundColor: 'var(--border-color)' }} />
        </div>
        <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--mint-soft)' }} /> 掌握 {mastered}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--peach-soft)' }} /> 学习 {learning}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--border-color)' }} /> 未接触 {untouched}
          </span>
        </div>
      </div>

      {/* Part of speech filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {partOptions.map((part) => (
          <button
            key={part}
            onClick={() => setPartFilter(part)}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full transition-colors ${
              partFilter === part
                ? 'bg-[var(--pink-primary)] text-white'
                : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30'
            }`}
          >
            {part}
          </button>
        ))}
      </div>

      {/* Word list */}
      <div className="space-y-2">
        {filteredWords.map((entry) => {
          const isExpanded = expandedId === entry.id;
          const isMastered = masteredSet.has(entry.korean);
          const isLearning = learningSet.has(entry.korean);

          return (
            <div
              key={entry.id}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
              >
                <span className="text-lg shrink-0">{entry.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[var(--text-primary)] text-sm">{entry.korean}</span>
                    <span className="text-xs text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-1.5 py-0.5 rounded">
                      [{entry.romanization}]
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-secondary)]">
                      {entry.partOfSpeech}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">
                      {Array.from({ length: entry.frequency }).map((_, i) => (
                        <span key={i} className="text-[14px] text-[var(--peach-soft)]">★</span>
                      ))}
                    </div>
                    {isMastered && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]">已掌握</span>
                    )}
                    {isLearning && (
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--peach-soft)]/10 text-[var(--peach-soft)]">学习中</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    onClick={(e) => { e.stopPropagation(); speak(entry.korean, 0.75); }}
                    className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); speak(entry.korean, 0.75); } }}
                  >
                    <Volume2 size={14} />
                  </span>
                  {isExpanded ? <ChevronUp size={16} className="text-[var(--text-muted)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-3 animate-slide-up">
                  {entry.meanings.map((m, i) => (
                    <div key={i} className="bg-[var(--bg-input)] rounded-lg p-3">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-medium bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] px-1.5 py-0.5 rounded">
                          {m.nuance}
                        </span>
                        <span className="text-xs bg-[var(--bg-accent)] text-[var(--text-secondary)] px-1.5 py-0.5 rounded">
                          {m.register}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-primary)]">{m.chinese}</p>
                    </div>
                  ))}

                  {entry.examples.map((ex, i) => (
                    <div key={i} className="bg-[var(--bg-input)] rounded-lg p-3 flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--text-primary)]">{ex.korean}</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.chinese}</p>
                      </div>
                      <button
                        onClick={() => speak(ex.korean, 0.75)}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredWords.length === 0 && words.length > 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-[var(--text-secondary)]">该分类下暂无词条</p>
        </div>
      )}

      {/* Bottom action */}
      <div className="fixed left-0 right-0 z-30 px-4 pt-3 bg-[var(--bg-card)] border-t border-[var(--border-color)]" style={{ bottom: "calc(56px + env(safe-area-inset-bottom, 0px))" }}>
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              {addedCount > 0 ? `已添加 ${addedCount} 个新词到复习队列` : `筛选：${filteredWords.length} 词 · ${untouched} 词未接触`}
            </p>
          </div>
          <button
            onClick={handleAddAll}
            disabled={addingAll || addedCount > 0}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] disabled:bg-[var(--bg-accent)] disabled:text-[var(--text-muted)] text-white rounded-xl text-sm font-medium transition-colors shrink-0"
          >
            {addingAll ? (
              <Loader2 size={16} className="animate-spin" />
            ) : addedCount > 0 ? (
              <Sparkles size={16} />
            ) : (
              <Play size={16} />
            )}
            {addedCount > 0 ? '已加入复习' : '加入复习队列'}
          </button>
        </div>
      </div>
    </div>
  );
}
