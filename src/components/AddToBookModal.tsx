'use client';

import { useState, useEffect } from 'react';
import { X, Search, Check, Plus } from 'lucide-react';
import { db } from '@/lib/db';
import type { WordBook, Word } from '@/types';

interface Props {
  mode: 'select-books' | 'select-words';
  preSelectedWordIds?: string[];  // for select-books mode: words to add
  bookId?: string;                // for select-words mode: target book
  onClose: () => void;
  onDone: () => void;
}

export function AddToBookModal({ mode, preSelectedWordIds, bookId, onClose, onDone }: Props) {
  const [books, setBooks] = useState<WordBook[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [search, setSearch] = useState('');
  const [selectedBookIds, setSelectedBookIds] = useState<Set<string>>(new Set());
  const [selectedWordIds, setSelectedWordIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (mode === 'select-books') {
        setBooks(await db.wordBooks.orderBy('createdAt').reverse().toArray());
      } else if (bookId) {
        const book = await db.wordBooks.get(bookId);
        const allWords = await db.words.orderBy('createdAt').reverse().toArray();
        const existingIds = new Set(book?.wordIds || []);
        // Show words NOT already in the book
        setWords(allWords.filter((w) => !existingIds.has(w.id)));
      }
      setLoading(false);
    };
    load();
  }, [mode, bookId]);

  const handleSave = async () => {
    if (mode === 'select-books' && preSelectedWordIds) {
      // Add words to selected books
      for (const bid of selectedBookIds) {
        const book = await db.wordBooks.get(bid);
        if (book) {
          const existing = new Set(book.wordIds);
          for (const wid of preSelectedWordIds) {
            if (!existing.has(wid)) {
              book.wordIds.push(wid);
            }
          }
          await db.wordBooks.update(bid, { wordIds: book.wordIds, updatedAt: Date.now() });
        }
      }
    } else if (mode === 'select-words' && bookId) {
      // Add selected words to the book
      const book = await db.wordBooks.get(bookId);
      if (book) {
        const existing = new Set(book.wordIds);
        for (const wid of selectedWordIds) {
          if (!existing.has(wid)) {
            book.wordIds.push(wid);
          }
        }
        await db.wordBooks.update(bookId, { wordIds: book.wordIds, updatedAt: Date.now() });
      }
    }
    onDone();
    onClose();
  };

  const toggleBook = (id: string) => {
    setSelectedBookIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleWord = (id: string) => {
    setSelectedWordIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const filteredBooks = search
    ? books.filter((b) => b.name.includes(search))
    : books;

  const filteredWords = search
    ? words.filter((w) => w.word.includes(search) || w.meaning.includes(search))
    : words;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-[var(--bg-card)] rounded-t-3xl sm:rounded-2xl border border-[var(--border-color)] shadow-xl w-full sm:max-w-md max-h-[70vh] flex flex-col animate-slide-up-drawer">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            {mode === 'select-books' ? '添加到单词本' : '添加单词'}
          </h2>
          <button onClick={onClose} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pb-3 shrink-0">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={mode === 'select-books' ? '搜索单词本...' : '搜索单词...'}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-5 pb-4">
          {loading ? (
            <div className="text-center py-8 text-[var(--text-muted)] text-sm">加载中...</div>
          ) : mode === 'select-books' ? (
            filteredBooks.length === 0 ? (
              <div className="text-center py-8 text-[var(--text-muted)] text-sm">
                {books.length === 0 ? '还没有创建单词本，请先创建' : '没有匹配的单词本'}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredBooks.map((book) => (
                  <button
                    key={book.id}
                    onClick={() => toggleBook(book.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      selectedBookIds.has(book.id)
                        ? 'bg-[var(--pink-primary)]/10 border border-[var(--pink-primary)]/30'
                        : 'hover:bg-[var(--bg-card-hover)] border border-transparent'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                        selectedBookIds.has(book.id)
                          ? 'bg-[var(--pink-primary)] text-white'
                          : 'border-2 border-[var(--border-color)]'
                      }`}
                    >
                      {selectedBookIds.has(book.id) && <Check size={12} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[var(--text-primary)] truncate">{book.name}</div>
                      <div className="text-xs text-[var(--text-muted)]">{book.wordIds.length} 个单词</div>
                    </div>
                  </button>
                ))}
              </div>
            )
          ) : (
            filteredWords.length === 0 ? (
              <div className="text-center py-8 text-[var(--text-muted)] text-sm">
                {words.length === 0 ? '没有可添加的单词' : '没有匹配的单词'}
              </div>
            ) : (
              <div className="space-y-1">
                {filteredWords.map((word) => (
                  <button
                    key={word.id}
                    onClick={() => toggleWord(word.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      selectedWordIds.has(word.id)
                        ? 'bg-[var(--pink-primary)]/10 border border-[var(--pink-primary)]/30'
                        : 'hover:bg-[var(--bg-card-hover)] border border-transparent'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all ${
                        selectedWordIds.has(word.id)
                          ? 'bg-[var(--pink-primary)] text-white'
                          : 'border-2 border-[var(--border-color)]'
                      }`}
                    >
                      {selectedWordIds.has(word.id) && <Check size={12} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[var(--text-primary)]">{word.word}</span>
                        <span className="text-xs text-[var(--text-muted)]">{word.pronunciation}</span>
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] truncate">{word.meaning}</div>
                    </div>
                  </button>
                ))}
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[var(--border-color)] shrink-0">
          <button
            onClick={handleSave}
            disabled={
              (mode === 'select-books' && selectedBookIds.size === 0) ||
              (mode === 'select-words' && selectedWordIds.size === 0)
            }
            className="w-full py-2.5 rounded-xl text-sm font-medium text-white bg-[var(--pink-primary)] hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center justify-center gap-1.5"
          >
            <Plus size={16} />
            {mode === 'select-books'
              ? `添加到 ${selectedBookIds.size} 个单词本`
              : `添加 ${selectedWordIds.size} 个单词`}
          </button>
        </div>
      </div>
    </div>
  );
}
