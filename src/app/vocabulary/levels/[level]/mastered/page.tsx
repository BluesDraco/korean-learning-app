'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Volume2, ChevronDown, ChevronUp, Check, Trash2, BookmarkPlus, CheckSquare, Square } from 'lucide-react';
import { db } from '@/lib/db';
import { speak } from '@/lib/tts';
import { getLevelWords } from '@/data/vocabulary';
import { AddToBookSheet } from '@/components/vocabulary/AddToBookSheet';
import type { WordEntry } from '@/types';
import { useIsDesktop } from '@/lib/useIsMobile';

export default function LevelMasteredPage() {
  const isDesktop = useIsDesktop();
  const { level: levelStr } = useParams<{ level: string }>();
  const router = useRouter();
  const level = parseInt(levelStr);

  const [masteredWords, setMasteredWords] = useState<WordEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [managing, setManaging] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expandedWord, setExpandedWord] = useState<string | null>(null);
  const [deletePending, setDeletePending] = useState(false);
  const [unmasterPending, setUnmasterPending] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const words = await getLevelWords(level);
        const koreanWords = new Set(words.map(e => e.korean));
        const allUserWords = await db.words.toArray();
        const masteredKeys = new Set(
          allUserWords.filter(w => koreanWords.has(w.word) && w.mastery === 'mastered').map(w => w.word)
        );
        setMasteredWords(words.filter(e => masteredKeys.has(e.korean)));
      } catch { /* ignore */ }
      finally { setLoading(false); }
    })();
  }, [level]);

  const toggleSelect = (k: string) => setSelected(prev => {
    const s = new Set(prev); s.has(k) ? s.delete(k) : s.add(k); return s;
  });

  const allSelected = masteredWords.length > 0 && masteredWords.every(e => selected.has(e.korean));

  const batchUnmaster = async () => {
    const now = Date.now();
    const allUserWords = await db.words.toArray();
    const toUpdate = allUserWords
      .filter(w => selected.has(w.word))
      .map(w => ({ id: w.id, mastery: 'learning', srsLevel: 1, interval: 1, nextReview: now }));
    await db.words.bulkUpdate(toUpdate).catch(() => {});
    setMasteredWords(prev => prev.filter(e => !selected.has(e.korean)));
    setSelected(new Set()); setManaging(false); setUnmasterPending(false);
  };

  const batchDelete = async () => {
    const allUserWords = await db.words.toArray();
    const ids = allUserWords.filter(w => selected.has(w.word)).map(w => w.id);
    await db.words.bulkDelete(ids).catch(() => {});
    setMasteredWords(prev => prev.filter(e => !selected.has(e.korean)));
    setSelected(new Set()); setManaging(false); setDeletePending(false);
  };

  const unmaster = async (entry: WordEntry) => {
    const now = Date.now();
    const existing = await db.words.where('word').equals(entry.korean).first();
    if (existing) await db.words.update(existing.id, { mastery: 'learning', srsLevel: 1, interval: 1, nextReview: now }).catch(() => {});
    setMasteredWords(prev => prev.filter(e => e.korean !== entry.korean));
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--color-surface-1)' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10"
        style={{ background: 'var(--color-surface-1)', borderBottom: '1px solid var(--color-border-1)' }}
      >
        <div
          className={isDesktop ? 'max-w-5xl mx-auto' : ''}
          style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}
        >
          <button onClick={() => router.back()} style={{ padding: 6, background: 'transparent', border: 'none', color: 'var(--color-ink-3)', cursor: 'pointer' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-1)', flex: 1, margin: 0 }}>
            已掌握单词 · {level} 级
          </h1>
          {masteredWords.length > 0 && (
            <button
              onClick={() => { setManaging(m => !m); setSelected(new Set()); setDeletePending(false); setUnmasterPending(false); }}
              style={{ fontSize: 13, color: 'var(--color-ink-3)', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              {managing ? '取消' : '批量管理'}
            </button>
          )}
        </div>
      </div>

      {/* Select all bar */}
      {managing && masteredWords.length > 0 && (
        <div
          style={{ background: 'var(--color-surface-1)', borderBottom: '1px solid var(--color-border-1)' }}
        >
          <div
            className={isDesktop ? 'max-w-5xl mx-auto' : ''}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px' }}
          >
            <button
              onClick={() => setSelected(allSelected ? new Set() : new Set(masteredWords.map(e => e.korean)))}
              style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-pink-strong)', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              {allSelected ? '取消全选' : '全选'}
            </button>
            <span style={{ fontSize: 12, color: 'var(--color-ink-3)' }}>已选 {selected.size} 个</span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={isDesktop ? 'max-w-5xl mx-auto px-4 py-3' : 'px-4 py-3'}>
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 8 }}>
        {loading ? (
          <div className="flex items-center justify-center py-16" style={{ gridColumn: '1 / -1' }}>
            <div className="w-6 h-6 rounded-full border-2 border-[var(--color-pink-base)] border-t-transparent animate-spin" />
          </div>
        ) : masteredWords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0', gridColumn: '1 / -1' }}>
            <p style={{ fontSize: 14, color: 'var(--color-ink-3)' }}>还没有已掌握的单词</p>
            <button
              onClick={() => router.back()}
              style={{ marginTop: 16, fontSize: 13, color: 'var(--color-pink-strong)', textDecoration: 'underline', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              回到词库
            </button>
          </div>
        ) : (
          masteredWords.map(entry => {
            const isExpanded = expandedWord === entry.korean;
            return (
              <div key={entry.id} className={`border rounded-xl overflow-hidden transition-colors ${managing && selected.has(entry.korean) ? 'border-[var(--mint-soft)]' : 'border-[var(--border-color)]'}`}
                style={{ background: managing && selected.has(entry.korean) ? 'rgba(174,227,216,0.08)' : 'white' }}>
                <div className="flex items-center gap-3 px-3 py-2.5" onClick={managing ? () => toggleSelect(entry.korean) : undefined}>
                  {managing && (
                    <div className="shrink-0 text-[var(--mint-soft)]">
                      {selected.has(entry.korean) ? <CheckSquare size={16} /> : <Square size={16} className="text-[var(--text-muted)]" />}
                    </div>
                  )}
                  <span className="text-lg shrink-0">{entry.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-sm text-[var(--text-primary)]">{entry.korean}</span>
                      {entry.partOfSpeech && <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-muted)]">{entry.partOfSpeech}</span>}
                    </div>
                    <span className="text-xs text-[var(--text-muted)]">{entry.meanings[0]?.chinese}</span>
                  </div>
                  {!managing && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); speak(entry.korean, 0.75); }} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0">
                        <Volume2 size={14} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); unmaster(entry); }} className="text-xs px-2 py-1 rounded-lg bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] hover:bg-[var(--mint-soft)]/20 transition-colors shrink-0">
                        取消掌握
                      </button>
                      {entry.examples.length > 0 && (
                        <button onClick={(e) => { e.stopPropagation(); setExpandedWord(isExpanded ? null : entry.korean); }} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0">
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      )}
                    </>
                  )}
                </div>
                {isExpanded && !managing && (
                  <div className="px-3 pb-3 pt-1 space-y-2 border-t border-[var(--border-color)]">
                    {entry.examples.map((ex, i) => (
                      <div key={i} className="flex items-start gap-2 bg-[var(--bg-input)] rounded-lg px-3 py-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-[var(--text-primary)]">{ex.korean}</p>
                          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{ex.chinese}</p>
                        </div>
                        <button onClick={() => speak(ex.korean, 0.75)} className="p-1 text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0">
                          <Volume2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
        </div>
      </div>

      {/* Batch action bar */}
      {managing && selected.size > 0 && (
        <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-20 px-4 pb-3 md:left-[208px] md:bottom-0 md:pb-4">
          <div className="rounded-2xl border border-[var(--border-color)] p-3 flex items-center gap-2 shadow-lg" style={{ background: '#fffbf7' }}>
            {unmasterPending ? (
              <>
                <button onClick={() => setUnmasterPending(false)} className="flex-1 py-2.5 rounded-xl bg-[var(--bg-accent)] text-[var(--text-muted)] text-sm font-medium">
                  取消
                </button>
                <button onClick={batchUnmaster} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--mint-soft)] text-white text-sm font-medium">
                  <Check size={14} />确认取消掌握 {selected.size} 个
                </button>
              </>
            ) : deletePending ? (
              <>
                <button onClick={() => setDeletePending(false)} className="flex-1 py-2.5 rounded-xl bg-[var(--bg-accent)] text-[var(--text-muted)] text-sm font-medium">
                  取消
                </button>
                <button onClick={batchDelete} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium">
                  <Trash2 size={14} />确认删除 {selected.size} 个
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setShowAddBook(true)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] text-sm font-medium">
                  <BookmarkPlus size={14} />加入单词本
                </button>
                <button onClick={() => setUnmasterPending(true)} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] text-sm font-medium">
                  <Check size={14} />取消掌握
                </button>
                <button onClick={() => setDeletePending(true)} className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-50 text-red-500 text-sm font-medium">
                  <Trash2 size={14} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showAddBook && (
        <AddToBookSheet
          word={{ korean: '', pronunciation: '', meaning: '', partOfSpeech: '' }}
          title={`加入单词本（${selected.size} 个词）`}
          onClose={() => setShowAddBook(false)}
          onSelectBook={async (bookId) => {
            for (const k of selected) {
              const dbWord = await db.words.where('word').equals(k).first();
              if (!dbWord) continue;
              const book = await db.wordBooks.get(bookId);
              if (!book) continue;
              if (!book.wordIds.includes(dbWord.id)) {
                await db.wordBooks.update(bookId, { wordIds: [...book.wordIds, dbWord.id] }).catch(() => {});
              }
            }
            setShowAddBook(false);
          }}
        />
      )}
    </div>
  );
}
