'use client';

import { Pencil, Trash2, BookOpen } from 'lucide-react';
import Link from 'next/link';
import type { WordBook } from '@/types';

interface Props {
  book: WordBook;
  wordCount: number;
  onRename: (book: WordBook) => void;
  onDelete: (id: string) => void;
}

const COLORS: Record<string, string> = {
  'var(--color-vocab)': 'from-[var(--yellow-soft)] to-[var(--peach-soft)]',
  'var(--pink-primary)': 'from-[var(--pink-light)] to-[var(--pink-primary)]',
  'var(--mint-soft)': 'from-[var(--mint-soft)]/60 to-[var(--mint-soft)]',
  'var(--purple-soft)': 'from-[var(--purple-soft)]/60 to-[var(--purple-soft)]',
  'var(--blue-soft)': 'from-[var(--blue-soft)]/60 to-[var(--blue-soft)]',
};

export function WordBookCard({ book, wordCount, onRename, onDelete }: Props) {
  return (
    <div className="card-washi group relative" style={{ '--washi-color': book.color } as React.CSSProperties}>
      {/* Color strip at top */}
      <div
        className="h-2 rounded-t-2xl bg-gradient-to-r"
        style={{
          backgroundImage: `linear-gradient(to right, ${book.color}, transparent)`,
          backgroundColor: book.color,
          opacity: 0.3,
        }}
      />

      <div className="p-4">
        {/* Book name + actions */}
        <div className="flex items-start justify-between mb-2">
          <Link
            href={`/vocabulary/books/${book.id}`}
            className="text-base font-bold text-[var(--text-primary)] hover:text-[var(--pink-primary)] transition-colors line-clamp-1 flex-1 mr-2"
          >
            {book.name}
          </Link>
          <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRename(book); }}
              className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(book.id); }}
              className="p-1.5 rounded-lg hover:bg-[var(--color-danger-bg)] text-[var(--text-muted)] hover:text-[var(--color-danger)] transition-colors"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {/* Description */}
        {book.description && (
          <p className="text-xs text-[var(--text-secondary)] mb-2 line-clamp-1">{book.description}</p>
        )}

        {/* Word count + study link */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-[var(--text-muted)]">{wordCount} 个单词</span>
          <Link
            href={`/vocabulary/books/${book.id}/flashcards`}
            className="flex items-center gap-1 text-xs font-medium text-[var(--pink-primary)] hover:text-[var(--pink-primary)]/70 transition-colors"
          >
            <BookOpen size={13} />
            开始学习
          </Link>
        </div>
      </div>
    </div>
  );
}
