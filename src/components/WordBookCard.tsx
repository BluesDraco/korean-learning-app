'use client';

import { Pencil, Trash2, BookOpen, Star } from 'lucide-react';
import Link from 'next/link';
import type { WordBook } from '@/types';
import { FAVORITES_BOOK_ID } from '@/lib/db';

interface Props {
  book: WordBook;
  wordCount: number;
  masteredCount?: number;
  onRename: (book: WordBook) => void;
  onDelete: (id: string) => void;
}

export function WordBookCard({ book, wordCount, onRename, onDelete }: Props) {
  const isFavorites = book.id === FAVORITES_BOOK_ID;

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
            className="text-base font-bold text-[var(--text-primary)] hover:text-[var(--pink-primary)] transition-colors line-clamp-1 flex-1 mr-2 flex items-center gap-1.5"
          >
            {isFavorites && <Star size={14} fill="#f5a623" style={{ color: '#f5a623', flexShrink: 0 }} />}
            {book.name}
          </Link>
          {!isFavorites && (
            <div className="flex items-center gap-0.5 shrink-0">
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
          )}
        </div>

        {/* Description */}
        {book.description && (
          <p className="text-xs text-[var(--text-secondary)] mb-2 line-clamp-1">{book.description}</p>
        )}

        {/* 掌握进度条 —— 只在有单词时展示 */}
        {wordCount > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-[var(--text-muted)]">
                {t('wbcard.mastered', lang, { m: masteredCount, total: wordCount })}
              </span>
              <span className="text-[11px] font-bold" style={{ color: progress >= 100 ? 'var(--color-mint-strong)' : 'var(--text-muted)' }}>
                {progress}%
              </span>
            </div>
            <div className="h-[4px] rounded-full overflow-hidden" style={{ background: 'var(--border-default)' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: progress >= 100 ? 'var(--color-mint-strong)' : 'var(--color-pink-base)' }}
              />
            </div>
          </div>
        )}

        {/* Word count + study link */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-[var(--text-muted)]">
            {wordCount === 0 ? t('wbcard.noWords', lang) : t('wbcard.wordCount', lang, { n: wordCount })}
          </span>
          <Link
            href={`/vocabulary/books/${book.id}/flashcards`}
            className="flex items-center gap-1 text-xs font-medium text-[var(--pink-primary)] hover:text-[var(--pink-primary)]/70 transition-colors"
          >
            <BookOpen size={13} />
            {t('wbcard.startStudy', lang)}
          </Link>
        </div>
      </div>
    </div>
  );
}
