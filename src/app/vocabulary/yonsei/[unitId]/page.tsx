'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, Target, Volume2, ChevronDown, ChevronUp,
  Loader2, BarChart3, BookmarkPlus, CheckCircle, Layers, Check, Trash2, CheckSquare, Square, ListChecks,
} from 'lucide-react';
import type { YonseiUnit } from '@/data/yonsei-books';
import { speakWord } from '@/lib/tts';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { AddToBookSheet } from '@/components/vocabulary/AddToBookSheet';
import { TappableText } from '@/components/TappableText';
import { useIsDesktop } from '@/lib/useIsMobile';

export default function YonseiUnitPage() {
  const isWideViewport = useIsDesktop();
  const { unitId } = useParams<{ unitId: string }>();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [unit, setUnit] = useState<YonseiUnit | undefined>(undefined);
  const [allUnits, setAllUnits] = useState<YonseiUnit[]>([]);

  const [masteredSet, setMasteredSet] = useState<Set<string>>(new Set());
  const [learningSet, setLearningSet] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [partFilter, setPartFilter] = useState('全部');
  const [sheetWord, setSheetWord] = useState<{ word: string; pronunciation: string; meaning: string; partOfSpeech: string; examples: { text: string; translation: string }[] } | null>(null);
  const [addAllBook, setAddAllBook] = useState(false);
  const [addingAll, setAddingAll] = useState(false);
  const [addedAll, setAddedAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [managing, setManaging] = useState(false);
  const [selectedWords, setSelectedWords] = useState<Set<string>>(new Set());
  const [deletePending, setDeletePending] = useState(false);
  const [savedSentenceIds, setSavedSentenceIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (managing) document.body.setAttribute('data-batch-managing', '1');
    else document.body.removeAttribute('data-batch-managing');
    return () => document.body.removeAttribute('data-batch-managing');
  }, [managing]);

  useEffect(() => {
    if (!unitId) { setLoading(false); return; }
    (async () => {
      try {
        const { yonseiUnits } = await import('@/data/yonsei-books');
        const found = yonseiUnits.find(u => u.id === unitId);
        if (!found) { setLoading(false); return; }
        setUnit(found);
        setAllUnits(yonseiUnits);
        const koreanWords = new Set(found.words.map(w => w.word));
        const allUserWords = await db.words.toArray();
        const userWords = allUserWords.filter(uw => koreanWords.has(uw.word));
        const mSet = new Set(userWords.filter(uw => uw.mastery === 'mastered').map(uw => uw.word));
        const lSet = new Set(userWords.filter(uw => uw.mastery !== 'mastered' && uw.mastery !== 'new').map(uw => uw.word));
        setMasteredSet(mSet);
        setLearningSet(lSet);
      } catch {}
      finally { setLoading(false); }
    })();
  }, [unitId]);

  const saveSentence = async (korean: string, chinese: string, sourceTitle: string) => {
    if (savedSentenceIds.has(korean)) return;
    const existing = await db.sentences.where('korean').equals(korean).first().catch(() => null);
    if (!existing) {
      await db.sentences.add({ id: crypto.randomUUID(), korean, chinese, source_type: 'vocabulary', source_id: 'yonsei-' + unitId, source_title: sourceTitle, created_at: new Date().toISOString() }).catch(() => {});
    }
    setSavedSentenceIds((prev) => new Set(prev).add(korean));
  };

  const partOptions = useMemo(() => {
    if (!unit) return ['全部'];
    const parts = new Set(unit.words.map(w => w.partOfSpeech).filter(Boolean));
    return ['全部', ...Array.from(parts)];
  }, [unit]);

  const filteredWords = useMemo(() => {
    if (!unit) return [];
    if (partFilter === '全部') return unit.words;
    return unit.words.filter(w => w.partOfSpeech === partFilter);
  }, [unit, partFilter]);

  useEffect(() => {
    setSelectedWords(new Set());
  }, [unit, partFilter]);

  const toggleMastered = async (word: string, pronunciation: string, meaning: string, partOfSpeech: string, examples: { text: string; translation: string }[]) => {
    const now = Date.now();
    if (masteredSet.has(word)) {
      const existing = await db.words.where('word').equals(word).first();
      if (existing) await db.words.update(existing.id, { mastery: 'learning', srsLevel: 1, interval: 1, nextReview: now });
      setMasteredSet(prev => { const s = new Set(prev); s.delete(word); return s; });
      setLearningSet(prev => new Set(prev).add(word));
    } else {
      const existing = await db.words.where('word').equals(word).first();
      if (existing) {
        await db.words.update(existing.id, { mastery: 'mastered', srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now });
      } else {
        await db.words.put({
          id: crypto.randomUUID(),
          word,
          pronunciation,
          meaning,
          partOfSpeech,
          examples: examples.map(ex => ({ text: ex.text, translation: ex.translation, source: 'manual' as const })),
          mastery: 'mastered',
          srsLevel: 5,
          easeFactor: 2.5,
          interval: 21,
          nextReview: now + 21 * 86400000,
          createdAt: now,
          lastReviewed: now,
          source: 'yonsei',
        });
      }
      setMasteredSet(prev => new Set(prev).add(word));
      setLearningSet(prev => { const s = new Set(prev); s.delete(word); return s; });
    }
  };

  const handleAddAllToBook = async (bookId: string) => {
    if (addingAll) return;
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
      const wordIdsToAdd: string[] = [];
      for (const w of filteredWords) {
        const existing = userWordMap.get(w.word);
        if (!existing) {
          const wordId = crypto.randomUUID();
          toInsert.push({
            id: wordId, word: w.word, pronunciation: w.pronunciation,
            meaning: w.meaning, partOfSpeech: w.partOfSpeech,
            examples: w.examples.map(ex => ({ text: ex.text, translation: ex.translation, source: 'manual' as const })),
            mastery: 'new', srsLevel: 0, easeFactor: 2.5, interval: 0,
            nextReview: now, createdAt: now, lastReviewed: null, source: 'yonsei',
          });
          wordIdsToAdd.push(wordId);
        } else if (!existingBookIdSet.has(existing.id)) {
          wordIdsToAdd.push(existing.id);
        }
      }
      await Promise.all([
        toInsert.length > 0 ? db.words.bulkPut(toInsert) : Promise.resolve(),
        wordIdsToAdd.length > 0 ? db.wordBooks.update(bookId, { wordIds: [...book.wordIds, ...wordIdsToAdd], updatedAt: now }) : Promise.resolve(),
      ]);
      setAddedAll(true);
      setTimeout(() => setAddedAll(false), 3000);
    } finally {
      setAddingAll(false);
      setAddAllBook(false);
    }
  };

  const unmasteredFiltered = filteredWords.filter(w => !masteredSet.has(w.word));
  const allSelected = unmasteredFiltered.length > 0 && unmasteredFiltered.every(w => selectedWords.has(w.word));

  const toggleSelect = (word: string) => {
    setSelectedWords(prev => { const s = new Set(prev); s.has(word) ? s.delete(word) : s.add(word); return s; });
  };

  const toggleSelectAll = () => {
    if (allSelected) setSelectedWords(new Set());
    else setSelectedWords(new Set(unmasteredFiltered.map(w => w.word)));
  };

  const exitManage = () => { setManaging(false); setSelectedWords(new Set()); setDeletePending(false); };

  const batchMaster = async () => {
    const now = Date.now();
    const allWords = unit?.words ?? [];
    for (const w of allWords.filter(fw => selectedWords.has(fw.word))) {
      const existing = await db.words.where('word').equals(w.word).first();
      if (existing) {
        await db.words.update(existing.id, { mastery: 'mastered', srsLevel: 5, interval: 21, nextReview: now + 21 * 86400000, lastReviewed: now });
      } else {
        await db.words.put({
          id: crypto.randomUUID(), word: w.word, pronunciation: w.pronunciation,
          meaning: w.meaning, partOfSpeech: w.partOfSpeech,
          examples: w.examples.map(ex => ({ text: ex.text, translation: ex.translation, source: 'manual' as const })),
          mastery: 'mastered', srsLevel: 5, easeFactor: 2.5, interval: 21,
          nextReview: now + 21 * 86400000, createdAt: now, lastReviewed: now, source: 'yonsei',
        });
      }
    }
    setMasteredSet(prev => { const s = new Set(prev); selectedWords.forEach(w => s.add(w)); return s; });
    setLearningSet(prev => { const s = new Set(prev); selectedWords.forEach(w => s.delete(w)); return s; });
    exitManage();
  };

  const batchDelete = async () => {
    for (const word of selectedWords) {
      const existing = await db.words.where('word').equals(word).first();
      if (existing) await db.words.delete(existing.id);
    }
    setMasteredSet(prev => { const s = new Set(prev); selectedWords.forEach(w => s.delete(w)); return s; });
    setLearningSet(prev => { const s = new Set(prev); selectedWords.forEach(w => s.delete(w)); return s; });
    exitManage();
  };

  if (!unit) {
    return (
      <div className="py-4 space-y-4">
        <Link href="/vocabulary/library?tab=yonsei" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={16} /> 返回
        </Link>
        <div className="text-center py-20 text-sm text-[var(--text-muted)]">单元不存在</div>
      </div>
    );
  }

  const total = unit.words.length;
  const mastered = Array.from(masteredSet).filter(w => unit.words.some(e => e.word === w)).length;
  const learning = Array.from(learningSet).filter(w => unit.words.some(e => e.word === w)).length;
  const untouched = total - mastered - learning;

  return (
    <div className={isWideViewport ? 'py-4 max-w-5xl mx-auto pb-[calc(80px+env(safe-area-inset-bottom,0px))]' : 'py-4 max-w-2xl mx-auto pb-[calc(80px+env(safe-area-inset-bottom,0px))]'}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/vocabulary/library?tab=yonsei"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
            marginBottom: 14,
          }}
        >
          <ArrowLeft size={14} />
          返回教材词汇
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 48, height: 48, borderRadius: 'var(--radius-md)',
              background: 'var(--color-mint-base)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 800, flexShrink: 0,
            }}
          >
            {unit.unitNumber}
          </div>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>{unit.title}</h1>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
              {unit.titleKo} · {unit.bookTitle} 第{unit.unitNumber}课
            </p>
          </div>
        </div>
      </div>

      {/* Flashcard entry */}
      <Link
        href={`/vocabulary/yonsei/${unitId}/flashcards`}
        className="flex items-center gap-3 p-4 rounded-xl border transition-colors"
        style={{ background: 'rgba(255,127,168,0.05)', borderColor: 'rgba(255,127,168,0.25)' }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,127,168,0.12)' }}>
          <Layers size={18} style={{ color: '#ff7fa8' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold" style={{ color: '#241917' }}>闪卡学习</p>
          <p className="text-xs mt-0.5" style={{ color: '#89756e' }}>翻卡记词，未接触优先 · 可标记已掌握</p>
        </div>
        <ChevronDown size={16} style={{ color: '#89756e', transform: 'rotate(-90deg)' }} />
      </Link>

      {/* Stats cards */}
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={24} className="animate-spin text-[var(--text-secondary)]" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center">
              <BookOpen size={16} className="text-[var(--pink-primary)] mx-auto mb-1" />
              <p className="text-lg font-bold text-[var(--text-primary)]">{total}</p>
              <p className="text-xs text-[var(--text-muted)]">本单元词</p>
            </div>
            <Link
              href={mastered > 0 ? `/vocabulary/yonsei/${unitId}/mastered` : '#'}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center block"
              style={{ pointerEvents: mastered > 0 ? 'auto' : 'none' }}
            >
              <Target size={16} className="text-[var(--mint-soft)] mx-auto mb-1" />
              <p className="text-lg font-bold text-[var(--mint-soft)]">{mastered}</p>
              <p className="text-xs text-[var(--text-muted)]">已掌握</p>
            </Link>
            <Link
              href={untouched > 0 ? `/vocabulary/yonsei/${unitId}/flashcards?filter=new` : '#'}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center block"
              style={{ pointerEvents: untouched > 0 ? 'auto' : 'none' }}
            >
              <BarChart3 size={16} className="text-[var(--peach-soft)] mx-auto mb-1" />
              <p className="text-lg font-bold text-[var(--peach-soft)]">{untouched}</p>
              <p className="text-xs text-[var(--text-muted)]">未接触</p>
            </Link>
          </div>

          {/* Progress bar */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 space-y-2">
            <div className="flex justify-between text-xs text-[var(--text-muted)]">
              <span>单元进度</span>
              <span>{total > 0 ? Math.round(((mastered + learning) / total) * 100) : 0}%</span>
            </div>
            <div className="w-full bg-[var(--bg-input)] rounded-full h-2.5 flex overflow-hidden">
              <div className="h-full rounded-l-full transition-all" style={{ width: `${total > 0 ? (mastered / total) * 100 : 0}%`, backgroundColor: 'var(--mint-soft)' }} />
              <div className="h-full transition-all" style={{ width: `${total > 0 ? (learning / total) * 100 : 0}%`, backgroundColor: 'var(--peach-soft)' }} />
              <div className="h-full rounded-r-full flex-1" style={{ backgroundColor: 'var(--border-color)' }} />
            </div>
            <div className="flex gap-4 text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--mint-soft)' }} /> 掌握 {mastered}</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--peach-soft)' }} /> 学习 {learning}</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--border-color)' }} /> 未接触 {untouched}</span>
            </div>
          </div>
        </>
      )}

      {/* Part of speech filter */}
      {partOptions.length > 2 && (
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
      )}

      {/* Word list */}
      <div>
        <div className="mb-3">
          <h2 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 mb-2">
            <BookOpen size={15} className="text-[var(--pink-primary)]" />
            词条列表 ({filteredWords.length})
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href={`/vocabulary/yonsei/${unitId}/mastered`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] text-xs font-medium hover:bg-[var(--mint-soft)]/20 transition-colors"
            >
              <Check size={12} />
              已掌握 ({(unit?.words ?? []).filter(w => masteredSet.has(w.word)).length})
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
          {filteredWords.map((w, i) => {
            const isExpanded = expandedId === w.word;
            const isMastered = masteredSet.has(w.word);
            const isLearning = learningSet.has(w.word);
            const isSelected = selectedWords.has(w.word);

            return (
              <div
                key={i}
                className={`bg-[var(--bg-card)] border rounded-xl overflow-hidden transition-colors ${isSelected ? 'border-[var(--mint-soft)] bg-[var(--mint-soft)]/5' : 'border-[var(--border-color)]'}`}
              >
                <div className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--bg-card-hover)] transition-colors">
                  {managing && !isMastered && (
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${isSelected ? 'bg-[var(--mint-soft)] border-[var(--mint-soft)]' : 'border-[var(--border-color)] bg-white'}`}
                      onClick={() => toggleSelect(w.word)}
                    >
                      {isSelected && <Check size={12} className="text-white" />}
                    </div>
                  )}
                  <button
                    onClick={() => { if (managing && !isMastered) { toggleSelect(w.word); return; } setExpandedId(isExpanded ? null : w.word); }}
                    className="flex-1 flex items-center gap-3 min-w-0 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[var(--text-primary)] text-sm">{w.word}</span>
                        {w.pronunciation && w.pronunciation !== w.word && (
                          <span className="text-xs text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-1.5 py-0.5 rounded">
                            [{w.pronunciation}]
                          </span>
                        )}
                        {isMastered && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]">已掌握</span>
                        )}
                        {isLearning && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-[var(--peach-soft)]/10 text-[var(--peach-soft)]">学习中</span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{w.meaning}</p>
                    </div>
                  </button>
                  <div className="flex items-center gap-1 shrink-0">
                    {!managing && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleMastered(w.word, w.pronunciation, w.meaning, w.partOfSpeech, w.examples); }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isMastered
                              ? 'text-[var(--mint-soft)] bg-[var(--mint-soft)]/10'
                              : 'text-[var(--text-muted)] hover:text-[var(--mint-soft)]'
                          }`}
                          title={isMastered ? '取消已掌握' : '标记为已掌握'}
                        >
                          <CheckCircle size={14} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); speakWord(w.word, 0.85); }}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                        >
                          <Volume2 size={14} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); if (authLoading) return; if (!user) { window.location.href = '/auth/login?redirect=' + window.location.pathname; return; } setSheetWord(w); }}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                        >
                          <BookmarkPlus size={14} />
                        </button>
                        <button onClick={() => setExpandedId(isExpanded ? null : w.word)}>
                          {isExpanded ? <ChevronUp size={16} className="text-[var(--text-muted)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
                        </button>
                      </>
                    )}
                    {managing && isMastered && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]">已掌握</span>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-2 animate-slide-up">
                    <div className="bg-[var(--bg-input)] rounded-lg p-3">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{w.meaning}</p>
                      {w.partOfSpeech && (
                        <p className="text-xs text-[var(--text-muted)] mt-1">{w.partOfSpeech}</p>
                      )}
                    </div>
                    {w.examples && w.examples.length > 0 && w.examples.map((ex, i) => (
                      <div key={i} className="bg-[var(--bg-input)] rounded-lg p-3 flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <TappableText text={ex.text} className="text-sm text-[var(--text-primary)]" source="延世词库" highlightWord={w.word} />
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.translation}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); speakWord(ex.text, 0.85); }}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                        >
                          <Volume2 size={14} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); saveSentence(ex.text, ex.translation, w.word); }}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] transition-colors shrink-0"
                          style={{ color: savedSentenceIds.has(ex.text) ? 'var(--pink-primary)' : 'var(--text-muted)' }}
                        >
                          <BookmarkPlus size={14} fill={savedSentenceIds.has(ex.text) ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    ))}
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
            korean: sheetWord.word,
            pronunciation: sheetWord.pronunciation,
            meaning: sheetWord.meaning,
            partOfSpeech: sheetWord.partOfSpeech,
            examples: sheetWord.examples,
          }}
          onClose={() => setSheetWord(null)}
        />
      )}

      {/* Add all sheet */}
      {addAllBook && (
        <AddToBookSheet
          word={{ korean: '', pronunciation: '', meaning: '', partOfSpeech: '' }}
          title={`全部加入单词本（${filteredWords.length} 词）`}
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

      {/* Completion / progress card */}
      {!loading && (mastered + learning > 0) && (() => {
        const parts = unit.id.split('-');
        const bookNum = parseInt(parts[1]);
        const unitNum = parseInt(parts[2]);
        const nextUnitId = `yonsei-${bookNum}-${unitNum + 1}`;
        const nextUnitEntry = allUnits.find(u => u.id === nextUnitId);
        const nextBookId = `yonsei-${bookNum + 1}-1`;
        const nextBookEntry = allUnits.find(u => u.id === nextBookId);
        const isComplete = untouched === 0;
        return (
          <div className={`rounded-2xl p-5 text-center space-y-3 border ${isComplete ? 'bg-gradient-to-b from-[var(--mint-soft)]/10 to-[var(--bg-card)] border-[var(--mint-soft)]/30' : 'bg-[var(--bg-card)] border-[var(--border-color)]'}`}>
            {isComplete ? (
              <>
                <div className="text-3xl">🎉</div>
                <p className="font-bold text-[var(--text-primary)]">第 {unit.unitNumber} 单元完成！</p>
                <p className="text-sm text-[var(--text-secondary)]">已掌握 {mastered} / {total} 词</p>
                <div className="flex gap-2 justify-center flex-wrap pt-1">
                  {nextUnitEntry && (
                    <Link
                      href={`/vocabulary/yonsei/${nextUnitId}`}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                      style={{ backgroundColor: 'var(--mint-soft)' }}
                    >
                      下一单元 →
                    </Link>
                  )}
                  {!nextUnitEntry && nextBookEntry && (
                    <Link
                      href={`/vocabulary/yonsei/${nextBookId}`}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                      style={{ backgroundColor: 'var(--pink-primary)' }}
                    >
                      开始第 {bookNum + 1} 册 →
                    </Link>
                  )}
                  <Link
                    href="/vocabulary/library?tab=yonsei"
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--bg-input)] text-[var(--text-secondary)]"
                  >
                    返回教材词汇
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-medium text-[var(--text-secondary)]">还有 {untouched} 个词未接触，继续加油！</p>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-xs text-[var(--pink-primary)] underline underline-offset-2"
                >
                  回到顶部继续学习
                </button>
              </>
            )}
          </div>
        );
      })()}
    </div>
  );
}
