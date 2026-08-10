'use client';

import { useEffect, useState, useCallback } from 'react';
import { useIsDesktop } from '@/lib/useIsMobile';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Plus, Trash2, Volume2, Search, Loader2, CheckSquare, Square, FolderInput, X, Headphones, ChevronUp, ChevronDown } from 'lucide-react';
import { db } from '@/lib/db';
import { AddToBookModal } from '@/components/AddToBookModal';
import { WordAudioPlayer } from '@/components/WordAudioPlayer';
import { speak, speakWord } from '@/lib/tts';
import { TappableText } from '@/components/TappableText';
import { getEntryByKorean } from '@/data/vocabulary/index';
import type { WordBook, Word } from '@/types';

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { lang } = useLang();
  const isWideViewport = useIsDesktop();
  const [book, setBook] = useState<WordBook | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [managing, setManaging] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [allBooks, setAllBooks] = useState<{ id: string; name: string }[]>([]);
  const [showMoveSheet, setShowMoveSheet] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  const load = useCallback(async () => {
    try {
      const b = await db.wordBooks.get(id);
      if (!b) { router.replace('/vocabulary/books'); return; }
      setBook(b);
      const loaded = await db.words.where('id').anyOf(b.wordIds).toArray();
      setWords(loaded.filter((w): w is Word => w != null));
    } catch {
      // db error — leave empty state
    } finally {
      setLoading(false);
    }
  }, [id, router]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    db.wordBooks.toArray().then(books =>
      setAllBooks(books.filter(b => b.id !== id).map(b => ({ id: b.id, name: b.name })))
    );
  }, [id]);

  const toggleSelect = (wordId: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(wordId) ? next.delete(wordId) : next.add(wordId);
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

  const handleBatchRemove = async () => {
    if (!book || selected.size === 0) return;
    if (!confirm(`确定从单词本中移除这 ${selected.size} 个单词？`)) return;
    const newIds = book.wordIds.filter(wid => !selected.has(wid));
    await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
    setBook({ ...book, wordIds: newIds });
    setWords(prev => prev.filter(w => !selected.has(w.id)));
    setSelected(new Set());
    setManaging(false);
  };

  const handleMoveToBook = async (targetBookId: string) => {
    if (!book || selected.size === 0) return;
    try {
      const targetBook = await db.wordBooks.get(targetBookId);
      if (!targetBook) return;
      const newTargetIds = [...new Set([...targetBook.wordIds, ...[...selected]])];
      await db.wordBooks.update(targetBookId, { wordIds: newTargetIds, updatedAt: Date.now() });
      const newIds = book.wordIds.filter(wid => !selected.has(wid));
      await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
      setBook({ ...book, wordIds: newIds });
      setWords(prev => prev.filter(w => !selected.has(w.id)));
      setSelected(new Set());
      setManaging(false);
      setShowMoveSheet(false);
    } catch {
      setShowMoveSheet(false);
    }
  };

  const handleRemoveWord = async (wordId: string) => {
    if (!book) return;
    if (!confirm('从单词本中移除这个单词？')) return;
    const newIds = book.wordIds.filter((wid) => wid !== wordId);
    await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
    setBook({ ...book, wordIds: newIds });
    setWords((prev) => prev.filter((w) => w.id !== wordId));
  };

  const toggleSelectAll = () => {
    if (selected.size === filteredWords.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredWords.map(w => w.id)));
    }
  };

  const handleBatchRemove = async () => {
    if (!book || selected.size === 0) return;
    if (!confirm(t('vocab.bd_confirm_remove_n', lang, { n: selected.size }))) return;
    const newIds = book.wordIds.filter(wid => !selected.has(wid));
    // 先写库再改 UI：若 DB 失败（401/网络/SQLITE）不改 state，避免刷新后"恢复"
    try {
      await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
    } catch (err) {
      alert(t('vocab.err_remove_prefix', lang) + (err instanceof Error ? err.message : t('vocab.err_retry', lang)));
      return;
    }
    setSelected(new Set());
    setManaging(false);
    // 从服务端重新拉一次，确保 UI 与 DB 一致
    await load();
  };

  const handleMoveToBook = async (targetBookId: string) => {
    if (!book || selected.size === 0) return;
    try {
      const targetBook = await db.wordBooks.get(targetBookId);
      if (!targetBook) { setShowMoveSheet(false); return; }
      const newTargetIds = [...new Set([...targetBook.wordIds, ...[...selected]])];
      const newIds = book.wordIds.filter(wid => !selected.has(wid));
      // 先写目标再删源：若第一步失败词仍在源本，不会丢词
      await db.wordBooks.update(targetBookId, { wordIds: newTargetIds, updatedAt: Date.now() });
      await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
    } catch (err) {
      setShowMoveSheet(false);
      alert(t('vocab.err_move_prefix', lang) + (err instanceof Error ? err.message : t('vocab.err_retry', lang)));
      return;
    }
    setSelected(new Set());
    setManaging(false);
    setShowMoveSheet(false);
    await load();
  };

  const markMastered = async (word: Word) => {
    const now = Date.now();
    try {
      await db.words.update(word.id, {
        mastery: 'mastered', srsLevel: 5, interval: 21,
        nextReview: now + 21 * 86400000, lastReviewed: now,
      });
      setWords(prev => prev.map(w => w.id === word.id ? { ...w, mastery: 'mastered' } : w));
    } catch (err) {
      alert(t('vocab.err_mark_prefix', lang) + (err instanceof Error ? err.message : t('vocab.err_retry', lang)));
    }
  };

  const handleRemoveWord = async (wordId: string) => {
    if (!book) return;
    if (!confirm(t('vocab.bd_confirm_remove_one', lang))) return;
    const newIds = book.wordIds.filter((wid) => wid !== wordId);
    try {
      await db.wordBooks.update(book.id, { wordIds: newIds, updatedAt: Date.now() });
    } catch (err) {
      alert(t('vocab.err_remove_prefix', lang) + (err instanceof Error ? err.message : t('vocab.err_retry', lang)));
      return;
    }
    await load();
  };

  const meaningOf = (w: Word) =>
    w.meanings?.length ? w.meanings.map((m) => m.chinese).join('；') : w.meaning;

  const baseWords = filter === 'learning' ? words.filter(w => w.mastery !== 'mastered') : words;
  const filteredWords = search
    ? baseWords.filter((w) => w.word.includes(search) || meaningOf(w).includes(search) || w.pronunciation.includes(search))
    : baseWords;
  const masteredCount = words.filter(w => w.mastery === 'mastered').length;
  const learningCount = words.length - masteredCount;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="py-4 space-y-4 pb-[calc(56px+env(safe-area-inset-bottom,0px)+128px)]">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
        <Link
          href="/vocabulary/books"
          style={{
            display: 'inline-flex', alignItems: 'center',
            color: 'var(--color-ink-2)', textDecoration: 'none',
          }}
        >
          <ArrowLeft size={20} />
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.name}</h1>
          <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
            {book.description || t('vocab.bd_n_words', lang, { n: words.length })}
          </p>
        </div>
      </div>

      {/* Flashcard entry */}
      <Link
        href={`/vocabulary/books/${book.id}/flashcards`}
        className="flex items-center gap-3 p-4 rounded-xl border transition-colors"
        style={{ background: 'var(--color-pink-soft)', borderColor: 'var(--color-pink-soft)', textDecoration: 'none' }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--bg-card)' }}>
          <BookOpen size={18} style={{ color: 'var(--color-pink-base)' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{t('vocab.bd_flashcard', lang)}</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{t('vocab.bd_flashcard_sub', lang)}</p>
        </div>
        <ChevronDown size={16} style={{ color: 'var(--text-muted)', transform: 'rotate(-90deg)' }} />
      </Link>

      {/* Progress stats */}
      {words.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setFilter(f => f === 'learning' ? 'all' : 'learning')}
            className="flex flex-col items-start gap-1 p-3 rounded-2xl border transition-colors text-left"
            style={{
              background: filter === 'learning' ? 'var(--color-peach-soft)' : 'var(--bg-card)',
              borderColor: filter === 'learning' ? 'var(--peach-soft)' : 'var(--border-color)',
            }}
          >
            <span className="text-xs text-[var(--text-muted)]">{t('vocab.bd_learning_filter', lang)}{filter === 'learning' ? t('vocab.bd_filtering', lang) : ''}</span>
            <span className="text-lg font-bold text-[var(--peach-soft)]">{learningCount}</span>
          </button>
          <Link
            href={masteredCount > 0 ? `/vocabulary/books/${book.id}/mastered` : '#'}
            style={{ pointerEvents: masteredCount > 0 ? 'auto' : 'none', background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            className="flex flex-col items-start gap-1 p-3 rounded-2xl border transition-colors text-left"
          >
            <span className="text-xs text-[var(--text-muted)]">{t('vocab.mastered', lang)}</span>
            <span className="text-lg font-bold text-[var(--mint-soft)]">{masteredCount}</span>
          </Link>
        </div>
      )}

      {/* Search + Add */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('vocab.search_word_ph', lang)}
            className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
          />
        </div>
        {!managing && (
          <button
            onClick={() => setShowAddModal(true)}
            className="shrink-0 flex items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] hover:border-[var(--pink-primary)] transition-colors"
          >
            <Plus size={16} />添加
          </button>
        )}
        <button
          onClick={() => { setManaging(!managing); setSelected(new Set()); }}
          className={`shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${managing ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]'}`}
        >
          {managing ? '取消' : '管理'}
        </button>
      </div>

      {/* Word list */}
      {filteredWords.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">📝</span>
          <p className="text-[var(--text-secondary)] text-sm mb-1">
            {search ? t('vocab.no_match_word', lang) : t('vocab.bd_empty', lang)}
          </p>
          <p className="text-[var(--text-muted)] text-xs mb-4">
            {search ? t('vocab.try_other_keyword', lang) : t('vocab.bd_empty_hint', lang)}
          </p>
          {!search && (
            <button onClick={() => setShowAddModal(true)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--color-pink-base)' }}>{t('vocab.bd_add_word', lang)}</button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {managing && (
            <button onClick={toggleSelectAll} className="text-xs text-[var(--pink-primary)] font-medium">
              {selected.size === filteredWords.length ? '取消全选' : `全选 (${filteredWords.length})`}
            </button>
          )}
          {filteredWords.map((word) => {
            const isExpanded = expandedId === word.id;
            const masteryLabels: Record<string, string> = {
              new: '新词', learning: '学习中', reviewing: '复习中', mastered: '已掌握',
            };
            const masteryColors: Record<string, string> = {
              new: 'bg-[var(--pink-primary)]/8 text-[var(--pink-primary)]',
              learning: 'bg-[var(--peach-soft)]/15 text-[var(--peach-soft)]',
              reviewing: 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]',
              mastered: 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]',
            };
            return (
              <div
                key={word.id}
                className={`bg-[var(--bg-card)] rounded-xl border overflow-hidden transition-all ${selected.has(word.id) ? 'border-[var(--pink-primary)] bg-[var(--pink-primary)]/5' : 'border-[var(--border-color)]'}`}
                onClick={managing ? () => toggleSelect(word.id) : undefined}
              >
                {/* Collapsed row */}
                <div
                  className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[var(--bg-card-hover)] transition-colors"
                  onClick={managing ? undefined : () => setExpandedId(isExpanded ? null : word.id)}
                >
                  {managing && (
                    <div className="shrink-0 text-[var(--pink-primary)]">
                      {selected.has(word.id) ? <CheckSquare size={18} /> : <Square size={18} className="text-[var(--text-muted)]" />}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[var(--text-primary)] text-sm">{word.word}</span>
                      <span className="text-xs text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-1.5 py-0.5 rounded">
                        [{word.pronunciation}]
                      </span>
                      {word.source === 'yonsei' && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--purple-soft)]/15 text-[var(--purple-soft)] shrink-0 font-medium">
                          延世单词
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-[var(--text-secondary)] truncate">{word.meaning}</span>
                      {!managing && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 font-medium ${masteryColors[word.mastery]}`}>
                          {masteryLabels[word.mastery]}
                        </span>
                      )}
                    </div>
                  </div>
                  {!managing && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); speakWord(word.word, 0.8); }}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                      >
                        <Volume2 size={14} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRemoveWord(word.id); }}
                        className="p-1.5 rounded-lg hover:bg-[var(--color-danger-bg)] text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                      {isExpanded ? <ChevronUp size={14} className="text-[var(--text-muted)]" /> : <ChevronDown size={14} className="text-[var(--text-muted)]" />}
                    </div>
                  )}
                </div>

                {/* Expanded details */}
                {isExpanded && (() => {
                  const validExamples = word.examples.filter(ex => ex.text && ex.text !== '[object Object]');
                  const entry = validExamples.length === 0 ? getEntryByKorean(word.word) : null;
                  const examples = validExamples.length > 0
                    ? validExamples
                    : entry?.examples.slice(0, 3).map(ex => ({ text: ex.korean, translation: ex.chinese, source: 'dictionary' as const })) ?? [];
                  return (
                  <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-2 animate-fade-in">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{word.meaning}</p>
                    {examples.length > 0 && (
                      <div className="space-y-1.5">
                        {examples.slice(0, 3).map((ex, i) => (
                          <div key={i} className="flex items-start gap-2 bg-[var(--bg-input)] rounded-lg px-3 py-2">
                            <div className="flex-1 min-w-0">
                              <TappableText text={ex.text} className="text-sm text-[var(--text-primary)]" source="单词本" highlightWord={word.word} />
                              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.translation}</p>
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
          };
          if (isWideViewport) {
            return (
              <div className="grid grid-cols-2 gap-3 items-start">
                <div className="space-y-3">{filteredWords.filter((_, i) => i % 2 === 0).map(renderCard)}</div>
                <div className="space-y-3">{filteredWords.filter((_, i) => i % 2 === 1).map(renderCard)}</div>
              </div>
            );
          }
          return <div className="space-y-2">{filteredWords.map(renderCard)}</div>;
          })()}
        </>
      )}

      {/* Listen button — fixed above tab bar */}
      {words.length > 0 && !showAddModal && !showMoveSheet && (
        <div
          className="fixed left-0 right-0 px-4 z-[80] md:left-[208px]"
          style={{ bottom: 'calc(56px + env(safe-area-inset-bottom, 0px) + 8px)' }}
        >
          <button
            onClick={() => setShowAudioPlayer(!showAudioPlayer)}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-lg"
            style={{ background: 'linear-gradient(135deg, #FFE4EC, #EAF8F5)', color: 'var(--pink-primary)' }}
          >
            <Headphones size={18} />
            {showAudioPlayer ? '关闭听单词' : '听单词（一遍韩语一遍中文）'}
          </button>
        </div>
      )}

      {/* Add words modal */}
      {showAddModal && (
        <AddToBookModal
          mode="select-words"
          bookId={book.id}
          onClose={() => setShowAddModal(false)}
          onDone={load}
        />
      )}

      {/* Batch action bar */}
      {managing && selected.size > 0 && (
        <div className="fixed left-0 right-0 z-[60] flex items-center justify-center gap-3 px-4 md:left-[108px] md:bottom-3" style={{ bottom: 'calc(56px + env(safe-area-inset-bottom, 0px) + 12px)' }}>
          <div className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl px-4 py-3 shadow-lg">
            <span className="text-xs text-[var(--text-secondary)]">已选 {selected.size} 个</span>
            <button
              onClick={() => setShowMoveSheet(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--bg-input)] text-sm text-[var(--text-primary)] hover:border-[var(--pink-primary)]"
            >
              <FolderInput size={15} />
              移到单词本
            </button>
            <button
              onClick={handleBatchRemove}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--color-danger-bg)] text-sm text-[var(--color-danger)]"
            >
              <Trash2 size={15} />
              批量删除
            </button>
          </div>
        </div>
      )}

      {/* Move sheet */}
      {showMoveSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }} onClick={() => setShowMoveSheet(false)}>
          <div className="w-full max-w-lg bg-[var(--bg-card)] rounded-t-2xl px-5 pt-5 pb-[calc(20px+env(safe-area-inset-bottom,0px))] flex flex-col max-h-[70dvh]" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between shrink-0 mb-3">
              <span className="text-sm font-medium text-[var(--text-primary)]">移到单词本</span>
              <button onClick={() => setShowMoveSheet(false)} className="p-1 text-[var(--text-muted)]"><X size={18} /></button>
            </div>
            {allBooks.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] py-4 text-center">没有其他单词本</p>
            ) : (
              <div className="space-y-2 overflow-y-auto flex-1 min-h-0" style={{ WebkitOverflowScrolling: 'touch' }}>
                {allBooks.map(b => (
                  <button
                    key={b.id}
                    onClick={() => handleMoveToBook(b.id)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-[var(--bg-input)] text-sm text-[var(--text-primary)] hover:border-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/5 transition-colors"
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Word audio player — hide when any modal is open */}
      {showAudioPlayer && !showAddModal && !showMoveSheet && (
        <WordAudioPlayer
          words={words.map(w => ({ korean: w.word, chinese: w.meaning }))}
          extraBottom={68}
        />
      )}
    </div>
  );
}
