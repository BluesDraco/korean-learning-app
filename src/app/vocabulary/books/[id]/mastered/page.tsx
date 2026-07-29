'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Volume2, Check, Trash2, CheckSquare, Square } from 'lucide-react';
import { db } from '@/lib/db';
import { speakWord } from '@/lib/tts';
import { useIsDesktop } from '@/lib/useIsMobile';
import { displayRomanHyphen } from '@/lib/dictionary';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import type { WordBook, Word } from '@/types';

export default function BookMasteredPage() {
  const { lang } = useLang();
  const isDesktop = useIsDesktop();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [book, setBook] = useState<WordBook | null | undefined>(undefined);
  const [masteredWords, setMasteredWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [managing, setManaging] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletePending, setDeletePending] = useState(false);

  const load = useCallback(async () => {
    try {
      const b = await db.wordBooks.get(id);
      if (!b) { setBook(null); router.replace(`/vocabulary/books`); return; }
      setBook(b);
      const loaded = await db.words.where('id').anyOf(b.wordIds).toArray();
      setMasteredWords(loaded.filter((w): w is Word => w != null && w.mastery === 'mastered'));
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, [id, router]);

  useEffect(() => { load(); }, [load]);

  const meaningOf = (w: Word) =>
    w.meanings?.length ? w.meanings.map(m => m.chinese).join('；') : w.meaning;

  const toggleSelect = (wid: string) => setSelected(prev => {
    const s = new Set(prev); s.has(wid) ? s.delete(wid) : s.add(wid); return s;
  });

  const allSelected = masteredWords.length > 0 && masteredWords.every(w => selected.has(w.id));

  const unmaster = async (w: Word) => {
    const now = Date.now();
    try {
      await db.words.update(w.id, { mastery: 'learning', srsLevel: 1, interval: 1, nextReview: now });
      setMasteredWords(prev => prev.filter(x => x.id !== w.id));
    } catch { /* ignore */ }
  };

  const batchUnmaster = async () => {
    const now = Date.now();
    const ids = [...selected];
    const results = await Promise.allSettled(ids.map(wid =>
      db.words.update(wid, { mastery: 'learning', srsLevel: 1, interval: 1, nextReview: now })
    ));
    const doneIds = new Set(ids.filter((_, i) => results[i].status === 'fulfilled'));
    setMasteredWords(prev => prev.filter(w => !doneIds.has(w.id)));
    setSelected(new Set(ids.filter(id => !doneIds.has(id)))); setManaging(false);
    if (doneIds.size < ids.length) alert(t('vocab.fc_op_failed', lang));
  };

  const batchRemoveFromBook = async () => {
    if (!book) return;
    const newIds = book.wordIds.filter(wid => !selected.has(wid));
    try {
      await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
    } catch (err) {
      alert(t('vocab.err_remove_prefix', lang) + (err instanceof Error ? err.message : t('vocab.err_retry', lang)));
      return;
    }
    setMasteredWords(prev => prev.filter(w => !selected.has(w.id)));
    setSelected(new Set()); setManaging(false); setDeletePending(false);
  };

  return (
    <div className="min-h-screen pb-[calc(40px+env(safe-area-inset-bottom,0px))]" style={{ background: 'var(--color-surface-1)' }}>
      <div className="sticky top-0 z-10" style={{ background: 'var(--color-surface-1)', borderBottom: '1px solid var(--color-border-1)' }}>
        <div className={isDesktop ? 'max-w-5xl mx-auto' : ''} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px' }}>
          <button onClick={() => router.push(`/vocabulary/books/${id}`)} style={{ padding: 6, background: 'transparent', border: 'none', color: 'var(--color-ink-3)', cursor: 'pointer' }}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-1)', flex: 1, margin: 0 }}>
            {t('vocab.bd_mastered_title', lang)}{book?.name ? ` · ${book.name}` : ''}
          </h1>
          {masteredWords.length > 0 && (
            <button onClick={() => { setManaging(m => !m); setSelected(new Set()); setDeletePending(false); }} style={{ fontSize: 13, color: 'var(--color-ink-3)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              {managing ? t('common.cancel', lang) : t('vocab.manage', lang)}
            </button>
          )}
        </div>
      </div>

      {managing && masteredWords.length > 0 && (
        <div style={{ background: 'var(--color-surface-1)', borderBottom: '1px solid var(--color-border-1)' }}>
          <div className={isDesktop ? 'max-w-5xl mx-auto' : ''} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px' }}>
            <button onClick={() => setSelected(allSelected ? new Set() : new Set(masteredWords.map(w => w.id)))} style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-pink-strong)', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              {allSelected ? t('vocab.cancel_select_all', lang) : t('vocab.select_all', lang)}
            </button>
            <span style={{ fontSize: 12, color: 'var(--color-ink-3)' }}>{t('vocab.selected_n', lang, { n: selected.size })}</span>
          </div>
        </div>
      )}

      <div className={isDesktop ? 'max-w-5xl mx-auto px-4 py-3' : 'px-4 py-3'}>
        <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 8 }}>
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 rounded-full border-2 border-[var(--pink-primary)] border-t-transparent animate-spin" />
            </div>
          ) : masteredWords.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-[var(--text-muted)]">{t('vocab.no_mastered_yet', lang)}</p>
              <button onClick={() => router.back()} className="mt-4 text-sm text-[var(--pink-primary)] underline underline-offset-2">{t('vocab.bd_back_to_book', lang)}</button>
            </div>
          ) : (
            masteredWords.map(w => {
              const isExpanded = expandedId === w.id;
              const validExamples = w.examples.filter(ex => ex.text && ex.text !== '[object Object]');
              return (
                <div key={w.id} className={`border rounded-xl overflow-hidden transition-colors ${managing && selected.has(w.id) ? 'border-[var(--mint-soft)]' : 'border-[var(--border-color)]'}`}
                  style={{ background: managing && selected.has(w.id) ? 'rgba(174,227,216,0.08)' : 'var(--color-surface-2)' }}>
                  <div className={`flex items-center gap-3 px-4 py-2.5 ${managing || validExamples.length > 0 ? 'cursor-pointer' : ''}`} onClick={managing ? () => toggleSelect(w.id) : (validExamples.length > 0 ? () => setExpandedId(isExpanded ? null : w.id) : undefined)}>
                    {managing && (
                      <div className="shrink-0 text-[var(--mint-soft)]">
                        {selected.has(w.id) ? <CheckSquare size={16} /> : <Square size={16} className="text-[var(--text-muted)]" />}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2.5 min-w-0">
                        <span className="ko-text font-bold text-[19px] leading-tight whitespace-nowrap text-[var(--text-primary)]">{w.word}</span>
                        <span className="min-w-0 truncate text-[12.5px] font-semibold tracking-wide text-[var(--pink-primary)]">[{displayRomanHyphen(w.pronunciation, w.word)}]</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 min-w-0">
                        {w.partOfSpeech && (
                          <span className="shrink-0 text-[10.5px] font-semibold px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-muted)]">{w.partOfSpeech}</span>
                        )}
                        <span className="text-sm text-[var(--text-primary)] leading-snug truncate">{meaningOf(w)}</span>
                      </div>
                    </div>
                    {!managing && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={(e) => { e.stopPropagation(); speakWord(w.word); }} className="no-touch-min w-9 h-9 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-card-hover)] transition-colors">
                          <Volume2 size={17} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); unmaster(w); }} className="text-xs px-2.5 py-1.5 rounded-lg bg-[var(--mint-soft)]/12 text-[var(--mint-soft)] hover:bg-[var(--mint-soft)]/20 transition-colors shrink-0 font-medium">
                          {t('vocab.unmaster', lang)}
                        </button>
                      </div>
                    )}
                  </div>
                  {isExpanded && !managing && (
                    <div className="px-3 pb-3 pt-1 space-y-2 border-t border-[var(--border-color)]">
                      {validExamples.map((ex, i) => (
                        <div key={i} className="flex items-start gap-2 bg-[var(--bg-input)] rounded-lg px-3 py-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-[15px] leading-relaxed text-[var(--text-primary)]">{ex.text}</p>
                            <p className="text-[13px] text-[var(--text-muted)] mt-1 leading-snug">{ex.translation}</p>
                          </div>
                          <button onClick={() => speakWord(ex.text)} className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0">
                            <Volume2 size={15} />
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

      {managing && selected.size > 0 && (
        <div className="fixed bottom-[calc(56px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[60] px-4 pb-3 md:left-[208px] md:bottom-0 md:pb-4">
          <div className="rounded-2xl border border-[var(--border-color)] p-3 flex items-center gap-2 shadow-lg" style={{ background: 'var(--color-surface-1)' }}>
            {deletePending ? (
              <>
                <button onClick={() => setDeletePending(false)} className="flex-1 py-2.5 rounded-xl bg-[var(--bg-accent)] text-[var(--text-muted)] text-sm font-medium">{t('common.cancel', lang)}</button>
                <button onClick={batchRemoveFromBook} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium">
                  <Trash2 size={14} />{t('vocab.bd_remove_from_book_n', lang, { n: selected.size })}
                </button>
              </>
            ) : (
              <>
                <button onClick={batchUnmaster} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] text-sm font-medium">
                  <Check size={14} />{t('vocab.unmaster', lang)}
                </button>
                <button onClick={() => setDeletePending(true)} className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-50 text-red-500 text-sm font-medium">
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
