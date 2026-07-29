'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, Search, Trash2, Volume2, CheckSquare, Square,
  FolderInput, X, Plus, Loader2,
} from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { speak, speakWord } from '@/lib/tts';
import { TappableText } from '@/components/TappableText';
import GrammarExplainBubble from '@/components/GrammarExplainBubble';
import { getEntryByKorean } from '@/data/vocabulary/index';
import type { Word, WordBook, WordEntry } from '@/types';
import { PageHeader, Button, Modal } from '@/components/ui';
import { displayRomanHyphen } from '@/lib/dictionary';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';

export default function ReviewPoolPage() {
  const { lang } = useLang();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) router.replace('/auth/login?redirect=/vocabulary/review-pool');
  }, [authLoading, user, router]);

  if (authLoading || !user) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-ink-3)', fontSize: 14 }}>{t('common.loading', lang)}</div>
    );
  }

  return <ReviewPoolContent />;
}

function ReviewPoolContent() {
  const { lang } = useLang();
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [totalWordCount, setTotalWordCount] = useState(0);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [managing, setManaging] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [wordBooks, setWordBooks] = useState<WordBook[]>([]);
  const [showImportSheet, setShowImportSheet] = useState(false);
  const [showMoveSheet, setShowMoveSheet] = useState(false);
  const [importingBook, setImportingBook] = useState<string | null>(null);
  const [entriesMap, setEntriesMap] = useState<Map<string, WordEntry>>(new Map());
  const [showBatchDeleteConfirm, setShowBatchDeleteConfirm] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{ id: string; label: string } | null>(null);

  useEffect(() => {
    const needEntry = words.filter(w => {
      const valid = w.examples.filter(ex => ex.text && ex.text !== '[object Object]');
      return valid.length === 0;
    });
    let cancelled = false;
    // 带助词的短语命中不到 → 剥掉尾部助词再查一次
    const stripParticle = (s: string) => s.replace(/(이랑|에서|부터|까지|보다|처럼|을|를|이|가|은|는|에|의|도|만|과|와|랑)$/, '');
    (async () => {
      const uniqueWords = [...new Set(needEntry.map(w => w.word))];
      const results = await Promise.all(uniqueWords.map(async w => {
        const first = await getEntryByKorean(w);
        if (first) return first;
        const stripped = stripParticle(w);
        if (stripped && stripped !== w) return await getEntryByKorean(stripped);
        return undefined;
      }));
      if (cancelled) return;
      const map = new Map<string, WordEntry>();
      uniqueWords.forEach((w, i) => { if (results[i]) map.set(w, results[i]!); });
      setEntriesMap(map);
    })();
    return () => { cancelled = true; };
  }, [words]);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(false);
    try {
      const now = Date.now();
      const [due, total] = await Promise.all([
        db.words.where('nextReview').belowOrEqual(now).toArray()
          .then(ws => ws.filter(w => w.mastery !== 'mastered')),
        db.words.count(),
      ]);
      setWords(due);
      setTotalWordCount(total);
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    db.wordBooks.toArray().then(setWordBooks);
  }, []);

  const filteredWords = useMemo(() => {
    if (!search.trim()) return words;
    const q = search.toLowerCase();
    return words.filter(w =>
      w.word.includes(q) || w.meaning.includes(q) || w.pronunciation.includes(q) ||
      w.examples.some(ex => ex.text.includes(q) || ex.translation.includes(q))
    );
  }, [words, search]);

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === filteredWords.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredWords.map(w => w.id)));
    }
  };

  const handleBatchDelete = () => {
    if (selected.size === 0) return;
    setShowBatchDeleteConfirm(true);
  };

  const doBatchDelete = async () => {
    setShowBatchDeleteConfirm(false);
    try {
      // 先删词表本身
      const wordDeletes = await Promise.allSettled([...selected].map(id => db.words.delete(id)));
      const wordFailed = wordDeletes.filter(r => r.status === 'rejected').length;
      // 再从所有单词本移除
      const allBooks = await db.wordBooks.toArray();
      const bookUpdates = await Promise.allSettled(allBooks.map(book => {
        const newIds = book.wordIds.filter(wid => !selected.has(wid));
        if (newIds.length !== book.wordIds.length) {
          return db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
        }
        return Promise.resolve();
      }));
      const bookFailed = bookUpdates.filter(r => r.status === 'rejected').length;
      if (wordFailed > 0 || bookFailed > 0) {
        alert(t('vocab.rp_partial_delete_fail', lang, { n: wordFailed + bookFailed }));
      }
      // Only remove from UI the words that were successfully deleted
      const successfullyDeleted = [...selected].filter((_, i) => wordDeletes[i].status === 'fulfilled');
      const failedIds = [...selected].filter((_, i) => wordDeletes[i].status === 'rejected');
      setWords(prev => prev.filter(w => !successfullyDeleted.includes(w.id)));
      if (failedIds.length > 0) {
        // Keep only failed items selected for retry; clear if all succeeded
        setSelected(new Set(failedIds));
      } else {
        setSelected(new Set()); setManaging(false);
      }
    } catch (err) {
      alert(t('vocab.err_delete_prefix', lang) + (err instanceof Error ? err.message : t('vocab.err_retry', lang)));
      return;
    }
  };

  const handleMoveToBook = async (bookId: string) => {
    if (selected.size === 0) return;
    try {
      const book = await db.wordBooks.get(bookId);
      if (!book) return;
      const newIds = [...new Set([...book.wordIds, ...[...selected]])];
      await db.wordBooks.update(bookId, { wordIds: newIds, updatedAt: Date.now() });
      setShowMoveSheet(false);
      setSelected(new Set());
      setManaging(false);
    } catch {
      setShowMoveSheet(false);
    }
  };

  const handleImportFromBook = async (bookId: string) => {
    if (importingBook) return;
    setImportingBook(bookId);
    try {
      const book = await db.wordBooks.get(bookId);
      if (!book) return;
      const bookWords = await db.words.where('id').anyOf(book.wordIds).toArray();
      const now = Date.now();
      const existing = new Set(words.map(w => w.word));
      const toImport = bookWords.filter((w): w is Word => w != null && !existing.has(w.word));
      for (const w of toImport) {
        await db.words.update(w.id, { nextReview: now });
      }
      await load();
    } catch { /* ignore */ } finally {
      setImportingBook(null);
      setShowImportSheet(false);
    }
  };

  const masteryLabels: Record<string, string> = {
    new: t('vocab.new_word', lang), learning: t('vocab.learning', lang), reviewing: t('vocab.reviewing', lang), mastered: t('vocab.mastered', lang),
  };
  const masteryColors: Record<string, string> = {
    new: 'bg-[var(--pink-primary)]/8 text-[var(--pink-primary)]',
    learning: 'bg-[var(--peach-soft)]/15 text-[var(--peach-soft)]',
    reviewing: 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]',
    mastered: 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]',
  };

  const confirmPendingDelete = async () => {
    if (!pendingDelete) return;
    const { id: wordId } = pendingDelete;
    setPendingDelete(null);
    try {
      await db.words.delete(wordId);
      const allBooks = await db.wordBooks.toArray();
      await Promise.all(allBooks.map(book => {
        const newIds = book.wordIds.filter(wid => wid !== wordId);
        if (newIds.length !== book.wordIds.length) {
          return db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
        }
        return Promise.resolve();
      }));
    } catch (err) {
      alert(t('vocab.err_delete_prefix', lang) + (err instanceof Error ? err.message : t('vocab.err_retry', lang)));
      return;
    }
    setWords(prev => prev.filter(w => w.id !== wordId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <p className="text-sm text-[var(--color-ink-3)]">{t('vocab.hub_data_load_failed', lang)}</p>
        <button onClick={() => { setLoadError(false); setLoading(true); load(); }} className="text-sm text-[var(--color-pink-strong)] font-medium underline">{t('vocab.hub_reload', lang)}</button>
      </div>
    );
  }

  return (
    <div className="py-4 md:py-6 w-full max-w-2xl md:max-w-none mx-auto md:mx-0 px-4 md:px-8 space-y-4 md:space-y-5 pb-32">
      <Link
        href="/vocabulary"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
          marginBottom: 14,
        }}
      >
        <ArrowLeft size={14} />
        {t('vocab.back_to_vocab', lang)}
      </Link>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 24 }}>
        <PageHeader
          eyebrow="REVIEW POOL"
          title={t('vocab.review_pool_title', lang)}
          subtitle={t('vocab.rp_subtitle', lang, { n: words.length })}
          tone="pink"
          flat
        />
        <Link href="/review" style={{ textDecoration: 'none', flexShrink: 0, marginBottom: 24 }}>
          <Button variant="primary" tone="pink">{t('vocab.rp_start_review', lang)}</Button>
        </Link>
      </div>

      {/* Search + Import + Manage */}
      <div className="flex items-center gap-2">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('vocab.search_word_ph', lang)}
            className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
          />
        </div>
        {!managing && (
          <button
            onClick={() => setShowImportSheet(true)}
            className="shrink-0 flex items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-3 py-2.5 text-sm text-[var(--text-primary)] hover:border-[var(--pink-primary)] transition-colors"
          >
            <Plus size={15} />{t('vocab.rp_import', lang)}
          </button>
        )}
        <button
          onClick={() => { setManaging(!managing); setSelected(new Set()); }}
          className={`shrink-0 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${managing ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]'}`}
        >
          {managing ? t('common.cancel', lang) : t('vocab.manage', lang)}
        </button>
      </div>

      {/* Word list */}
      {filteredWords.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">{search ? '🔍' : totalWordCount === 0 ? '📚' : '🎉'}</span>
          <p className="text-[var(--text-secondary)] text-sm mb-1">
            {search ? t('vocab.rp_no_match', lang) : totalWordCount === 0 ? t('vocab.rp_none_added', lang) : t('vocab.rp_no_due', lang)}
          </p>
          <p className="text-[var(--text-muted)] text-xs mb-4">
            {search ? t('vocab.rp_no_match_hint', lang) : totalWordCount === 0 ? t('vocab.rp_none_added_hint', lang) : t('vocab.rp_all_done_hint', lang)}
          </p>
          {!search && (
            <Link href="/vocabulary/library" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium text-white" style={{ background: 'var(--color-pink-base)' }}>
              {t('vocab.rp_go_add', lang)}
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {managing && (
            <button onClick={toggleSelectAll} className="text-xs text-[var(--pink-primary)] font-medium">
              {selected.size === filteredWords.length ? t('vocab.cancel_select_all', lang) : t('vocab.select_all_n', lang, { n: filteredWords.length })}
            </button>
          )}
          {filteredWords.map(word => {
            const isExpanded = expandedId === word.id;
            return (
              <div
                key={word.id}
                className={`bg-[var(--bg-card)] rounded-xl border overflow-hidden transition-all ${selected.has(word.id) ? 'border-[var(--pink-primary)] bg-[var(--pink-primary)]/5' : 'border-[var(--border-color)]'}`}
                onClick={managing ? () => toggleSelect(word.id) : undefined}
              >
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[var(--bg-card-hover)] transition-colors"
                  onClick={managing ? undefined : () => setExpandedId(isExpanded ? null : word.id)}
                >
                  {managing && (
                    <div className="shrink-0 text-[var(--pink-primary)]">
                      {selected.has(word.id) ? <CheckSquare size={18} /> : <Square size={18} className="text-[var(--text-muted)]" />}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2.5 min-w-0">
                      <span className="ko-text font-bold text-[var(--text-primary)] text-[19px] leading-tight whitespace-nowrap">{word.word}</span>
                      <span className="min-w-0 truncate text-[12.5px] font-semibold tracking-wide text-[var(--pink-primary)]">
                        [{displayRomanHyphen(word.pronunciation, word.word)}]
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 min-w-0">
                      {word.partOfSpeech && (
                        <span className="shrink-0 text-[10.5px] font-semibold px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-muted)]">{word.partOfSpeech}</span>
                      )}
                      <span className="text-sm text-[var(--text-primary)] leading-snug truncate">{word.meaning}</span>
                      {!managing && (
                        <span className={`text-[10.5px] px-2 py-0.5 rounded-full shrink-0 font-semibold ${masteryColors[word.mastery]}`}>
                          {masteryLabels[word.mastery]}
                        </span>
                      )}
                    </div>
                  </div>
                  {!managing && (
                    <div className="flex items-center gap-0.5 shrink-0 ml-2">
                      <button
                        onClick={e => { e.stopPropagation(); speakWord(word.word); }}
                        className="no-touch-min w-9 h-9 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors flex items-center justify-center"
                        aria-label={t('vocab.play', lang)}
                      >
                        <Volume2 size={17} />
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setPendingDelete({ id: word.id, label: word.word });
                        }}
                        className="no-touch-min w-9 h-9 rounded-lg hover:bg-[var(--color-danger-bg)] text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors flex items-center justify-center"
                        aria-label={t('vocab.delete', lang)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {isExpanded && (() => {
                  const validExamples = word.examples.filter(ex => ex.text && ex.text !== '[object Object]');
                  const entry = validExamples.length === 0 ? entriesMap.get(word.word) : null;
                  const examples = validExamples.length > 0
                    ? validExamples
                    : entry?.examples.slice(0, 3).map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })) ?? [];
                  return (
                    <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-3 animate-fade-in">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{word.meaning}</p>
                      {examples.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                          {examples.slice(0, 4).map((ex, i) => (
                            <div key={i} className="bg-[var(--bg-input)] rounded-lg px-3 py-2">
                              <div className="flex items-start gap-2">
                                <div className="flex-1 min-w-0">
                                  <TappableText text={ex.text} className="text-[15px] leading-relaxed text-[var(--text-primary)]" source={t('vocab.src_review', lang)} highlightWord={word.word} />
                                  <p className="text-[13px] text-[var(--text-secondary)] mt-1 leading-snug">{ex.translation}</p>
                                </div>
                                <button
                                  onClick={e => { e.stopPropagation(); speakWord(ex.text); }}
                                  className="p-1 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] shrink-0"
                                >
                                  <Volume2 size={14} />
                                </button>
                              </div>
                              <div onClick={(e) => e.stopPropagation()}>
                                <GrammarExplainBubble sentence={ex.text} translation={ex.translation} variant="compact" />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            );
          })}
        </div>
      )}

      {/* Batch action bar */}
      {managing && selected.size > 0 && !showImportSheet && !showMoveSheet && (
        <div
          className="fixed left-0 right-0 z-[60] flex items-center justify-center px-4 desktop-fixed-rail"
          style={{ bottom: 'calc(56px + env(safe-area-inset-bottom, 0px) + 12px)' }}
        >
          <div className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl px-4 py-3 shadow-lg">
            <span className="text-xs text-[var(--text-secondary)]">{t('vocab.selected_n', lang, { n: selected.size })}</span>
            <button
              onClick={() => setShowMoveSheet(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-input)] text-sm text-[var(--text-primary)]"
            >
              <FolderInput size={15} />{t('vocab.add_to_book', lang)}
            </button>
            <button
              onClick={handleBatchDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-danger-bg)] text-sm text-[var(--color-danger)]"
            >
              <Trash2 size={15} />{t('vocab.delete', lang)}
            </button>
          </div>
        </div>
      )}

      {/* Import from book sheet */}
      {showImportSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={() => setShowImportSheet(false)}>
          <div
            className="w-full max-w-lg bg-[var(--bg-card)] rounded-t-2xl px-5 pt-5 flex flex-col"
            style={{ maxHeight: '65dvh', paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between shrink-0 mb-3">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{t('vocab.rp_import_title', lang)}</p>
              <button onClick={() => setShowImportSheet(false)} className="p-1 text-[var(--text-muted)]"><X size={18} /></button>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-3">{t('vocab.rp_import_sub', lang)}</p>
            <div className="overflow-y-auto flex-1 min-h-0 space-y-2 pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
              {wordBooks.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)] py-4 text-center">{t('vocab.rp_no_books', lang)}</p>
              ) : wordBooks.map(book => (
                <button
                  key={book.id}
                  onClick={() => handleImportFromBook(book.id)}
                  disabled={!!importingBook}
                  className="w-full text-left px-4 py-3 rounded-xl bg-[var(--bg-input)] text-sm flex items-center gap-3 transition-colors hover:bg-[var(--bg-accent)] disabled:opacity-60"
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: book.color || 'var(--pink-primary)' }} />
                  <span className="flex-1 min-w-0 text-[var(--text-primary)] truncate">{book.name}</span>
                  <span className="text-xs text-[var(--text-muted)]">{book.wordIds.length} 词</span>
                  {importingBook === book.id && <Loader2 size={14} className="animate-spin text-[var(--text-muted)]" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Move to book sheet */}
      {showMoveSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={() => setShowMoveSheet(false)}>
          <div
            className="w-full max-w-lg bg-[var(--bg-card)] rounded-t-2xl px-5 pt-5 flex flex-col"
            style={{ maxHeight: '65dvh', paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between shrink-0 mb-3">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{t('vocab.add_to_book', lang)}</p>
              <button onClick={() => setShowMoveSheet(false)} className="p-1 text-[var(--text-muted)]"><X size={18} /></button>
            </div>
            <div className="overflow-y-auto flex-1 min-h-0 space-y-2 pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
              {wordBooks.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)] py-4 text-center">{t('vocab.rp_no_books', lang)}</p>
              ) : wordBooks.map(book => (
                <button
                  key={book.id}
                  onClick={() => handleMoveToBook(book.id)}
                  className="w-full text-left px-4 py-3 rounded-xl bg-[var(--bg-input)] text-sm flex items-center gap-3 transition-colors hover:bg-[var(--bg-accent)]"
                >
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: book.color || 'var(--pink-primary)' }} />
                  <span className="flex-1 min-w-0 text-[var(--text-primary)] truncate">{book.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Modal open={showBatchDeleteConfirm} onClose={() => setShowBatchDeleteConfirm(false)} title={t('vocab.batch_delete_q', lang)} size="sm">
        <p style={{ fontSize: 14, color: 'var(--color-ink-2)', lineHeight: 1.6, marginBottom: 20 }}>
          {t('vocab.batch_delete_confirm', lang, { n: selected.size })}
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" fullWidth onClick={() => setShowBatchDeleteConfirm(false)}>{t('common.cancel', lang)}</Button>
          <Button variant="danger" fullWidth onClick={doBatchDelete}>{t('vocab.delete', lang)}</Button>
        </div>
      </Modal>
      <Modal open={pendingDelete !== null} onClose={() => setPendingDelete(null)} title={t('vocab.delete_confirm_title', lang)} size="sm">
        <p style={{ fontSize: 14, color: 'var(--color-ink-2)', lineHeight: 1.6, marginBottom: 20 }}>
          {t('vocab.delete_confirm_label', lang, { label: pendingDelete?.label ?? '' })}
        </p>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" fullWidth onClick={() => setPendingDelete(null)}>{t('common.cancel', lang)}</Button>
          <Button variant="danger" fullWidth onClick={confirmPendingDelete}>{t('vocab.delete', lang)}</Button>
        </div>
      </Modal>
    </div>
  );
}
