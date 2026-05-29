'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, Clock, Volume2, Sparkles, Target,
  ChevronDown, ChevronUp, Loader2, Play,
} from 'lucide-react';
import { getTheme, getThemeWords } from '@/data/vocabulary';
import { db } from '@/lib/db';
import type { WordEntry, ThemePack } from '@/types';
import { speak } from '@/lib/tts';

export default function ThemeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [theme, setTheme] = useState<ThemePack | null>(null);
  const [words, setWords] = useState<WordEntry[]>([]);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [learningIds, setLearningIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [expandedWord, setExpandedWord] = useState<string | null>(null);
  const [addingAll, setAddingAll] = useState(false);
  const [addedCount, setAddedCount] = useState(0);

  useEffect(() => {
    const t = getTheme(id);
    if (!t) { router.push('/vocabulary/themes'); return; }
    setTheme(t);

    const w = getThemeWords(id);
    setWords(w);

    // Check which words user already has in IndexedDB
    (async () => {
      const userWords = await db.words.where('word').anyOf(w.map((e) => e.korean)).toArray();
      const mastered = new Set<string>();
      const learning = new Set<string>();
      for (const uw of userWords) {
        if (uw.mastery === 'mastered') mastered.add(uw.word);
        else if (uw.mastery !== 'new') learning.add(uw.word);
      }
      setMasteredIds(mastered);
      setLearningIds(learning);
      setLoading(false);
    })();
  }, [id, router]);

  const handleAddAllToSRS = async () => {
    if (!theme) return;
    setAddingAll(true);
    let count = 0;

    for (const entry of words) {
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
    // Refresh mastered/learning counts
    const updated = new Set(masteredIds);
    setMasteredIds(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!theme) return null;

  const totalWords = words.length;
  const masteredCount = masteredIds.size;
  const learningCount = learningIds.size;
  const progressPercent = totalWords > 0 ? Math.round(((masteredCount + learningCount) / totalWords) * 100) : 0;

  return (
    <div className="py-4 space-y-5 pb-24">
      {/* Header */}
      <div>
        <Link href="/vocabulary/themes" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} />
          返回词包列表
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{theme.emoji}</span>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">{theme.name}</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">{theme.description}</p>
          </div>
        </div>
      </div>

      {/* Tori quote */}
      <div className="bg-gradient-to-r from-[var(--pink-primary)]/10 to-[var(--purple-soft)]/10 border border-[var(--pink-pale)] rounded-2xl p-4 flex items-start gap-3">
        <span className="text-2xl shrink-0">🐰</span>
        <div>
          <p className="text-sm text-[var(--text-primary)] font-medium">토리</p>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{theme.toriQuote}</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center">
          <BookOpen size={16} className="text-[var(--pink-primary)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)]">{totalWords}</p>
          <p className="text-xs text-[var(--text-muted)]">总词数</p>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center">
          <Clock size={16} className="text-[var(--peach-soft)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)]">{theme.estimatedMinutes}</p>
          <p className="text-xs text-[var(--text-muted)]">分钟</p>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center">
          <Target size={16} className="text-[var(--mint-soft)] mx-auto mb-1" />
          <p className="text-lg font-bold text-[var(--text-primary)]">{progressPercent}%</p>
          <p className="text-xs text-[var(--text-muted)]">已学习</p>
        </div>
      </div>

      {/* Sentence patterns */}
      {theme.sentences.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
            <Sparkles size={15} className="text-[var(--purple-soft)]" />
            场景句型
          </h2>
          <div className="space-y-2">
            {theme.sentences.map((s, i) => (
              <div
                key={i}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 flex items-center gap-3 group"
              >
                <span className="text-xs font-bold text-[var(--text-muted)] w-5 shrink-0">{i + 1}.</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{s.korean}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{s.chinese}</p>
                </div>
                <button
                  onClick={() => speak(s.korean, 0.75)}
                  className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0 opacity-0 group-hover:opacity-100"
                >
                  <Volume2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Word list */}
      <div>
        <h2 className="text-sm font-bold text-[var(--text-primary)] mb-3 flex items-center gap-2">
          <BookOpen size={15} className="text-[var(--pink-primary)]" />
          词条列表 ({totalWords})
        </h2>
        <div className="space-y-2">
          {words.map((entry) => {
            const isExpanded = expandedWord === entry.id;
            const isMastered = masteredIds.has(entry.korean);
            const isLearning = learningIds.has(entry.korean);

            return (
              <div
                key={entry.id}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden"
              >
                {/* Summary row */}
                <button
                  onClick={() => setExpandedWord(isExpanded ? null : entry.id)}
                  className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
                >
                  <span className="text-xl shrink-0">{entry.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[var(--text-primary)] text-sm">{entry.korean}</span>
                      <span className="text-xs text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-1.5 py-0.5 rounded">
                        [{entry.romanization}]
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-secondary)]">
                        {entry.partOfSpeech}
                      </span>
                      {isMastered && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]">已掌握</span>
                      )}
                      {isLearning && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--peach-soft)]/10 text-[var(--peach-soft)]">学习中</span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">
                      {entry.meanings.map((m) => m.chinese).join('；')}
                    </p>
                    {/* Frequency stars */}
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: entry.frequency }).map((_, i) => (
                        <span key={i} className="text-[14px] text-[var(--peach-soft)]">★</span>
                      ))}
                      <span className="text-[13px] text-[var(--text-muted)] ml-1">TOPIK {entry.level}级</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); speak(entry.korean, 0.75); } }}
                      onClick={(e) => { e.stopPropagation(); speak(entry.korean, 0.75); }}
                      className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors cursor-pointer"
                    >
                      <Volume2 size={14} />
                    </span>
                    {isExpanded ? <ChevronUp size={16} className="text-[var(--text-muted)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
                  </div>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-3 animate-slide-up">
                    {/* Meanings */}
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

                    {/* Examples */}
                    {entry.examples.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-[var(--text-muted)]">例句</p>
                        {entry.examples.map((ex, i) => (
                          <div key={i} className="bg-[var(--bg-input)] rounded-lg p-3 flex items-start gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-[var(--text-primary)]">{ex.korean}</p>
                              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.chinese}</p>
                              {ex.scene && (
                                <span className="inline-block text-[13px] text-[var(--text-muted)] mt-1 bg-[var(--bg-card)] px-1.5 py-0.5 rounded">
                                  {ex.scene}
                                </span>
                              )}
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

                    {/* Tags */}
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-secondary)]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          {/* Progress ring (simple version) */}
          <div className="shrink-0 w-12 h-12 rounded-full border-4 border-[var(--border-color)] relative flex items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
              <circle
                cx="24" cy="24" r="20"
                fill="none"
                stroke="var(--pink-primary)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${progressPercent * 1.256} 125.6`}
              />
            </svg>
            <span className="text-xs font-bold text-[var(--text-primary)]">{progressPercent}%</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--text-primary)]">
              {addedCount > 0 ? `已添加 ${addedCount} 个新词到复习队列` : `${masteredCount} 掌握 · ${learningCount} 学习中 · ${totalWords - masteredCount - learningCount} 未接触`}
            </p>
          </div>
          <button
            onClick={handleAddAllToSRS}
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
            {addedCount > 0 ? '已加入复习' : addingAll ? '添加中...' : '开始闪卡学习'}
          </button>
        </div>
      </div>
    </div>
  );
}
