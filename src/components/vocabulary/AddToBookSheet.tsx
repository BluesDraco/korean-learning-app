'use client';

import { useState, useEffect } from 'react';
import { X, Check, Plus, Loader2, BookMarked } from 'lucide-react';
import { db } from '@/lib/db';

interface WordData {
  korean: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  examples?: { text: string; translation: string }[];
  sourceEntryId?: string;
}

interface Props {
  word: WordData;
  onClose: () => void;
  onSelectBook?: (bookId: string) => Promise<void>;
  title?: string;
}

export function AddToBookSheet({ word, onClose, onSelectBook, title }: Props) {
  const [books, setBooks] = useState<{ id: string; name: string; color: string }[]>([]);
  const [adding, setAdding] = useState<string | null>(null);
  const [done, setDone] = useState<Set<string>>(new Set());
  const [creating, setCreating] = useState(false);
  const [newBookName, setNewBookName] = useState('');
  const [creatingBook, setCreatingBook] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    db.wordBooks.toArray().then(all =>
      setBooks(all.map(b => ({ id: b.id, name: b.name, color: b.color || 'var(--pink-primary)' })))
    );
  }, []);

  const handleAdd = async (bookId: string) => {
    if (done.has(bookId) || adding) return;
    setAdding(bookId);
    setError(null);
    try {
      if (onSelectBook) {
        await onSelectBook(bookId);
        setDone(prev => new Set(prev).add(bookId));
        return;
      }
      const book = await db.wordBooks.get(bookId);
      if (!book) { setError('单词本不存在，请刷新后重试'); return; }
      const now = Date.now();
      const wordId = crypto.randomUUID();
      await db.words.put({
        id: wordId,
        word: word.korean,
        pronunciation: word.pronunciation,
        meaning: word.meaning,
        partOfSpeech: word.partOfSpeech,
        examples: (word.examples ?? []).map(ex => ({ text: ex.text, translation: ex.translation, source: 'dictionary' as const })),
        sourceEntryId: word.sourceEntryId,
        mastery: 'new',
        srsLevel: 0,
        easeFactor: 2.5,
        interval: 0,
        nextReview: now,
        createdAt: now,
        lastReviewed: null,
        source: 'library',
      });
      await db.wordBooks.update(bookId, {
        wordIds: [...book.wordIds, wordId],
        updatedAt: now,
      });
      setDone(prev => new Set(prev).add(bookId));
    } catch (e) {
      console.error('[AddToBookSheet] handleAdd failed:', e);
      setError('添加失败，请重试');
    } finally {
      setAdding(null);
    }
  };

  const handleCreateBook = async () => {
    const name = newBookName.trim();
    if (!name || creatingBook) return;
    setCreatingBook(true);
    try {
      const now = Date.now();
      const bookId = crypto.randomUUID();
      const COLORS = ['var(--pink-primary)', 'var(--mint-soft)', 'var(--purple-soft)', 'var(--peach-soft)', 'var(--blue-soft)'];
      const color = COLORS[books.length % COLORS.length];
      await db.wordBooks.put({ id: bookId, name, description: '', wordIds: [], color, createdAt: now, updatedAt: now }).catch(() => {});
      const newBook = { id: bookId, name, color };
      setBooks(prev => [...prev, newBook]);
      setNewBookName('');
      setCreating(false);
      // Auto-add word to the newly created book
      await handleAdd(bookId);
    } finally {
      setCreatingBook(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }} onClick={onClose}>
      <div
        className="w-full max-w-lg bg-[var(--bg-card)] rounded-t-2xl px-5 pt-5 pb-5 flex flex-col"
        style={{ maxHeight: '65dvh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between shrink-0 mb-3">
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
              <BookMarked size={15} className="text-[var(--pink-primary)]" />
              {title ?? '加入单词本'}
            </p>
            {!title && (
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{word.korean} · {word.meaning}</p>
            )}
          </div>
          <button onClick={onClose} className="p-1 text-[var(--text-muted)]"><X size={18} /></button>
        </div>

        {/* Book list */}
        <div className="overflow-y-auto flex-1 min-h-0 space-y-2 pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
          {error && (
            <p className="text-xs text-red-500 px-1 py-2">{error}</p>
          )}
          {books.length === 0 && !creating && (
            <p className="text-sm text-[var(--text-muted)] py-4 text-center">还没有单词本，先新建一个吧</p>
          )}
          {books.map(b => (
            <button
              key={b.id}
              onClick={() => handleAdd(b.id)}
              disabled={!!adding || done.has(b.id)}
              className="w-full text-left px-4 py-3 rounded-xl bg-[var(--bg-input)] text-sm flex items-center gap-3 transition-colors hover:bg-[var(--bg-accent)] disabled:opacity-60"
            >
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
              <span className="flex-1 text-[var(--text-primary)] truncate">{b.name}</span>
              {done.has(b.id) ? (
                <Check size={16} className="text-[var(--mint-soft)] shrink-0" />
              ) : adding === b.id ? (
                <Loader2 size={14} className="animate-spin text-[var(--text-muted)] shrink-0" />
              ) : (
                <Plus size={15} className="text-[var(--text-muted)] shrink-0" />
              )}
            </button>
          ))}

          {/* New book input */}
          {creating && (
            <div className="flex items-center gap-2 px-1">
              <input
                autoFocus
                type="text"
                value={newBookName}
                onChange={e => setNewBookName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleCreateBook(); if (e.key === 'Escape') setCreating(false); }}
                placeholder="单词本名称"
                className="flex-1 bg-[var(--bg-input)] border border-[var(--pink-primary)]/40 rounded-xl px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)]"
              />
              <button
                onClick={handleCreateBook}
                disabled={!newBookName.trim() || creatingBook}
                className="px-3 py-2 rounded-xl bg-[var(--pink-primary)] text-white text-sm font-medium disabled:opacity-50"
              >
                {creatingBook ? <Loader2 size={14} className="animate-spin" /> : '创建'}
              </button>
              <button onClick={() => setCreating(false)} className="p-2 text-[var(--text-muted)]">
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Footer: new book button */}
        {!creating && (
          <button
            onClick={() => setCreating(true)}
            className="shrink-0 mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:border-[var(--pink-primary)] hover:text-[var(--pink-primary)] transition-colors"
          >
            <Plus size={15} />
            新建单词本
          </button>
        )}
      </div>
    </div>
  );
}
