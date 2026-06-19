'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, Clock, Volume2, Sparkles, Target,
  ChevronDown, ChevronUp, Loader2, BookmarkPlus, Check, Trash2, CheckSquare, Square, ListChecks, CheckCircle,
} from 'lucide-react';
import { getTheme, getThemeWords } from '@/data/vocabulary';
import { db } from '@/lib/db';
import type { WordEntry, ThemePack } from '@/types';
import { speak } from '@/lib/tts';
import { useAuth } from '@/components/AuthProvider';
import { TappableText } from '@/components/TappableText';
import { AddToBookSheet } from '@/components/vocabulary/AddToBookSheet';

export default function ThemeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [theme, setTheme] = useState<ThemePack | null>(null);
  const [words, setWords] = useState<WordEntry[]>([]);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [learningIds, setLearningIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [expandedSentence, setExpandedSentence] = useState<number | null>(null);
  const [expandedWord, setExpandedWord] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();
  const [sheetWord, setSheetWord] = useState<WordEntry | null>(null);
  const [addingAll, setAddingAll] = useState(false);
  const [addedAll, setAddedAll] = useState(false);
  const [addAllBook, setAddAllBook] = useState(false);
  const [managing, setManaging] = useState(false);
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [deletePending, setDeletePending] = useState(false);

  useEffect(() => {
    if (managing) document.body.setAttribute('data-batch-managing', '1');
    else document.body.removeAttribute('data-batch-managing');
    return () => document.body.removeAttribute('data-batch-managing');
  }, [managing]);

  useEffect(() => {
    const t = getTheme(id);
    if (!t) { router.replace('/vocabulary/library'); return; }
    setTheme(t);

    const w = getThemeWords(id);
    setWords(w);

    // Check which words user already has in IndexedDB
    (async () => {
      try {
        const koreanWords = new Set(w.map((e) => e.korean));
        const allUserWords = await db.words.toArray();
        const userWords = allUserWords.filter((uw) => koreanWords.has(uw.word));
        const mastered = new Set<string>();
        const learning = new Set<string>();
        for (const uw of userWords) {
          if (uw.mastery === 'mastered') mastered.add(uw.word);
          else if (uw.mastery !== 'new') learning.add(uw.word);
        }
        setMasteredIds(mastered);
        setLearningIds(learning);
      } catch {
        // db error — show words without mastery state
      } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  const handleAddAllToBook = async (bookId: string) => {
    if (!theme || addingAll) return;
    setAddingAll(true);
    try {
      const [book, allUserWords] = await Promise.all([
        db.wordBooks.get(bookId),
        db.words.toArray(),
      ]);
      if (!book) return;
      const now = Date.now();
      const userWordMap = new Map(allUserWords.map(w => [w.word, w]));
      const existingBookIdSet = new Set(book.wordIds);
      const toInsert: any[] = [];
      const newWordIds: string[] = [];
      for (const entry of words) {
        const existing = userWordMap.get(entry.korean);
        if (!existing) {
          const wordId = crypto.randomUUID();
          toInsert.push({
            id: wordId, word: entry.korean, pronunciation: entry.romanization,
            meaning: entry.meanings[0]?.chinese || '', partOfSpeech: entry.partOfSpeech,
            examples: entry.examples.map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })),
            sourceEntryId: entry.id, mastery: 'new', srsLevel: 0, easeFactor: 2.5, interval: 0,
            nextReview: now, createdAt: now, lastReviewed: null, source: 'library',
          });
          newWordIds.push(wordId);
        } else if (!existingBookIdSet.has(existing.id)) {
          newWordIds.push(existing.id);
        }
      }
      await Promise.all([
        toInsert.length > 0 ? db.words.bulkPut(toInsert) : Promise.resolve(),
        newWordIds.length > 0 ? db.wordBooks.update(bookId, { wordIds: [...book.wordIds, ...newWordIds], updatedAt: now }) : Promise.resolve(),
      ]);
      setAddedAll(true);
      setTimeout(() => setAddedAll(false), 3000);
    } finally {
      setAddingAll(false);
      setAddAllBook(false);
    }
  };

  const unmasteredWords = words.filter(e => !masteredIds.has(e.korean));
  const allSelected = unmasteredWords.length > 0 && unmasteredWords.every(e => selectedWords.has(e.korean));

  const toggleSelect = (korean: string) => {
    setSelectedWords(prev => { const s = new Set(prev); s.has(korean) ? s.delete(korean) : s.add(korean); return s; });
  };

  const toggleSelectAll = () => {
    if (allSelected) setSelectedWords(new Set());
    else setSelectedWords(new Set(unmasteredWords.map(e => e.korean)));
  };

  const exitManage = () => { setManaging(false); setSelectedWords(new Set()); setDeletePending(false); };

  const batchMaster = async () => {
    const now = Date.now();
    const selected = words.filter(e => selectedWords.has(e.korean));
    const allUserWords = await db.words.toArray();
    const userWordMap = new Map(allUserWords.map(w => [w.word, w]));
    const toUpdate: any[] = [];
    const toInsert: any[] = [];
    for (const entry of selected) {
      const existing = userWordMap.get(entry.korean);
      if (existing) {
        toUpdate.push({ id: existing.id, mastery: 'mastered', srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now });
      } else {
        toInsert.push({
          id: crypto.randomUUID(), word: entry.korean, pronunciation: entry.romanization,
          meaning: entry.meanings[0]?.chinese || '', partOfSpeech: entry.partOfSpeech,
          examples: entry.examples.map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })),
          sourceEntryId: entry.id, mastery: 'mastered', srsLevel: 5, easeFactor: 2.5, interval: 21,
          nextReview: now + 21 * 86400000, createdAt: now, lastReviewed: now, source: 'library',
        });
      }
    }
    await Promise.all([
      toUpdate.length > 0 ? db.words.bulkUpdate(toUpdate) : Promise.resolve(),
      toInsert.length > 0 ? db.words.bulkPut(toInsert) : Promise.resolve(),
    ]);
    setMasteredIds(prev => { const s = new Set(prev); selectedWords.forEach(w => s.add(w)); return s; });
    setLearningIds(prev => { const s = new Set(prev); selectedWords.forEach(w => s.delete(w)); return s; });
    exitManage();
  };

  const batchDelete = async () => {
    const allUserWords = await db.words.toArray();
    const ids = allUserWords.filter(w => selectedWords.has(w.word)).map(w => w.id);
    await db.words.bulkDelete(ids);
    setMasteredIds(prev => { const s = new Set(prev); selectedWords.forEach(w => s.delete(w)); return s; });
    setLearningIds(prev => { const s = new Set(prev); selectedWords.forEach(w => s.delete(w)); return s; });
    exitManage();
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
    <div className="py-4 space-y-5 pb-8">
      {/* Header */}
      <div>
        <Link href="/vocabulary/library?tab=themes" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
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
            {theme.sentences.map((s, i) => {
              const isExpanded = expandedSentence === i;
              const hasBreakdown = s.breakdown && s.breakdown.length > 0;
              return (
                <div key={i} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden">
                  <div
                    className="p-3 flex items-start gap-3 group cursor-pointer"
                    onClick={() => hasBreakdown && setExpandedSentence(isExpanded ? null : i)}
                  >
                    <span className="text-xs font-bold text-[var(--text-muted)] w-5 shrink-0 mt-0.5">{i + 1}.</span>
                    <div className="flex-1 min-w-0">
                      {(s.situation || s.situationNote) && (
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          {s.situation && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: 'rgba(255,127,168,0.1)', color: 'var(--pink-primary)' }}>
                              {s.situation}
                            </span>
                          )}
                          {s.situationNote && (
                            <span className="text-[10px] text-[var(--text-muted)]">{s.situationNote}</span>
                          )}
                        </div>
                      )}
                      <TappableText text={s.korean} className="text-sm font-medium text-[var(--text-primary)]" source="场景句型" />
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{s.chinese}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); speak(s.korean, 0.75); }}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                      >
                        <Volume2 size={14} />
                      </button>
                      {hasBreakdown && (
                        <span className="text-[var(--text-muted)]">
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </span>
                      )}
                    </div>
                  </div>
                  {isExpanded && hasBreakdown && (
                    <div className="px-3 pb-3 pt-0 border-t border-[var(--border-color)]">
                      <div className="flex flex-wrap gap-2 mt-2">
                        {s.breakdown!.map((b, j) => (
                          <div key={j} className="bg-[var(--pink-pale)] rounded-lg px-2 py-1.5 text-center min-w-[52px]">
                            <p className="text-xs font-bold text-[var(--text-primary)]">{b.text}</p>
                            <p className="text-[10px] text-[var(--pink-primary)] mt-0.5">{b.meaning}</p>
                            <p className="text-[10px] text-[var(--text-muted)]">{b.partOfSpeech}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Word list */}
      <div>
        <div className="mb-3">
          <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 mb-2">
            <BookOpen size={15} className="text-[var(--pink-primary)]" />
            词条列表 ({totalWords})
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/vocabulary/themes/${id}/mastered`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] text-xs font-medium hover:bg-[var(--mint-soft)]/20 transition-colors"
            >
              <Check size={12} />
              已掌握 ({words.filter(e => masteredIds.has(e.korean)).length})
            </Link>
            <button
              onClick={() => managing ? exitManage() : setManaging(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${managing ? 'bg-[var(--pink-primary)] text-white' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30'}`}
            >
              <ListChecks size={12} />
              {managing ? '取消批量管理' : '批量管理'}
            </button>
            {!managing && (
              <button
                onClick={() => { if (authLoading) return; if (!user) { window.location.href = '/auth/login?redirect=' + window.location.pathname; return; } setAddAllBook(true); }}
                disabled={addingAll || addedAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] text-xs font-medium hover:bg-[var(--pink-primary)]/20 disabled:opacity-50 transition-colors"
              >
                {addingAll ? <Loader2 size={12} className="animate-spin" /> : <BookmarkPlus size={12} />}
                {addedAll ? '已加入' : '全部加入单词本'}
              </button>
            )}
          </div>
        </div>

        {/* Select-all bar */}
        {managing && (
          <div className="flex items-center justify-between px-1 mb-2">
            <button onClick={toggleSelectAll} className="flex items-center gap-1.5 text-xs text-[var(--pink-primary)] font-medium">
              {allSelected ? <CheckSquare size={14} /> : <Square size={14} />}
              {allSelected ? '取消全选' : '全选未掌握'}
            </button>
            <span className="text-xs text-[var(--text-muted)]">已选 {selectedWords.size} 个</span>
          </div>
        )}

        <div className="space-y-2">
          {words.map((entry) => {
            const isExpanded = expandedWord === entry.id;
            const isMastered = masteredIds.has(entry.korean);
            const isLearning = learningIds.has(entry.korean);
            const isSelected = selectedWords.has(entry.korean);

            return (
              <div
                key={entry.id}
                className={`bg-[var(--bg-card)] border rounded-xl overflow-hidden transition-colors ${isSelected ? 'border-[var(--mint-soft)] bg-[var(--mint-soft)]/5' : 'border-[var(--border-color)]'}`}
              >
                {/* Summary row */}
                <div className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--bg-card-hover)] transition-colors">
                  {managing && !isMastered && (
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${isSelected ? 'bg-[var(--mint-soft)] border-[var(--mint-soft)]' : 'border-[var(--border-color)] bg-white'}`}
                      onClick={() => toggleSelect(entry.korean)}
                    >
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                  )}
                  <button
                    onClick={() => { if (managing && !isMastered) { toggleSelect(entry.korean); return; } setExpandedWord(isExpanded ? null : entry.id); }}
                    className="flex-1 flex items-center gap-3 min-w-0 text-left"
                  >
                    <span className="text-xl shrink-0">{entry.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[var(--text-primary)] text-sm">{entry.korean}</span>
                        <span className="text-xs text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-1.5 py-0.5 rounded">
                          [{entry.romanization}]
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
                      <div className="flex items-center gap-0.5 mt-1">
                        {Array.from({ length: entry.frequency }).map((_, i) => (
                          <span key={i} className="text-[14px] text-[var(--peach-soft)]">★</span>
                        ))}
                        <span className="text-[13px] text-[var(--text-muted)] ml-1">TOPIK {entry.level}级</span>
                      </div>
                    </div>
                  </button>
                  <div className="flex items-center gap-2 shrink-0">
                    {!managing && (
                      <>
                        <button
                          onClick={() => speak(entry.korean, 0.75)}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                        >
                          <Volume2 size={14} />
                        </button>
                        <button
                          onClick={() => { if (authLoading) return; if (!user) { window.location.href = '/auth/login?redirect=' + window.location.pathname; return; } setSheetWord(entry); }}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                        >
                          <BookmarkPlus size={14} />
                        </button>
                        <button onClick={() => setExpandedWord(isExpanded ? null : entry.id)}>
                          {isExpanded ? <ChevronUp size={16} className="text-[var(--text-muted)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
                        </button>
                      </>
                    )}
                  </div>
                </div>

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
                              <TappableText text={ex.korean} className="text-sm text-[var(--text-primary)]" source="主题词库" highlightWord={entry.korean} />
                              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.chinese}</p>
                              {ex.scene && (
                                <span className="inline-block text-[13px] text-[var(--text-muted)] mt-1 bg-[var(--bg-card)] px-1.5 py-0.5 rounded">
                                  {ex.scene}
                                </span>
                              )}
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); speak(ex.korean, 0.75); }}
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

      {/* Single word sheet */}
      {sheetWord && (
        <AddToBookSheet
          word={{
            korean: sheetWord.korean,
            pronunciation: sheetWord.romanization,
            meaning: sheetWord.meanings[0]?.chinese || '',
            partOfSpeech: sheetWord.partOfSpeech,
            examples: sheetWord.examples.map(ex => ({ text: ex.korean, translation: ex.chinese })),
            sourceEntryId: sheetWord.id,
          }}
          onClose={() => setSheetWord(null)}
        />
      )}


      {/* Add all sheet */}
      {addAllBook && (
        <AddToBookSheet
          word={{ korean: '', pronunciation: '', meaning: '', partOfSpeech: '' }}
          title={`全部加入单词本（${totalWords} 词）`}
          onClose={() => setAddAllBook(false)}
          onSelectBook={handleAddAllToBook}
        />
      )}

      {/* Batch action bar */}
      {managing && selectedWords.size > 0 && (
        <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-30 flex justify-center px-4 pb-3 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 shadow-xl flex gap-2">
            {deletePending ? (
              <>
                <button onClick={() => setDeletePending(false)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] text-sm font-semibold">
                  取消
                </button>
                <button onClick={batchDelete} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold">
                  <Trash2 size={14} /> 确认删除 {selectedWords.size} 个
                </button>
              </>
            ) : (
              <>
                <button onClick={batchMaster} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--mint-soft)]/15 text-[var(--mint-soft)] text-sm font-semibold hover:bg-[var(--mint-soft)]/25 transition-colors">
                  <CheckCircle size={14} /> 标记已掌握 ({selectedWords.size})
                </button>
                <button onClick={() => setDeletePending(true)} className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-50 text-red-500 text-sm font-semibold hover:bg-red-100 transition-colors">
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
