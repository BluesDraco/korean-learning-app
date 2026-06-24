'use client';

import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, BookMarked } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/db';

interface VocabUnit {
  id: string;
  unitNumber: number;
  title: string;
  titleKo: string;
  bookTitle: string;
  description: string;
  words: { word: string }[];
}

const YONSEI_BOOK_COLORS = [
  'var(--mint-soft)',
  'var(--pink-primary)',
  'var(--purple-soft)',
  'var(--peach-soft)',
  'var(--blue-soft)',
  'var(--color-vocab)',
];

const SEOUL_BOOK_COLORS = [
  'var(--peach-soft)',
  'var(--blue-soft)',
  'var(--color-vocab)',
  'var(--purple-soft)',
];

const YONSEI_LABELS = ['延世 1', '延世 2', '延世 3', '延世 4', '延世 5', '延世 6'];
const SEOUL_LABELS = ['首尔 1', '首尔 2', '首尔 3', '首尔 4'];

type TextbookType = 'yonsei' | 'seoul';

export function YonseiSection() {
  const [textbook, setTextbook] = useState<TextbookType>('yonsei');
  const [selectedBook, setSelectedBook] = useState(1);
  const [units, setUnits] = useState<VocabUnit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const [{ yonseiUnits }, { seoulUnits }] = await Promise.all([
          import('@/data/yonsei-books'),
          import('@/data/seoul-books'),
        ]);
        setUnits(textbook === 'yonsei' ? yonseiUnits : seoulUnits);
      } catch {} finally {
        setLoading(false);
      }
    })();
  }, [textbook]);

  useEffect(() => {
    // One-time migration: remove old yonsei words imported before v2 data correction
    const migrated = localStorage.getItem('yonsei_v2_migrated');
    if (!migrated) {
      (async () => {
        try {
          const allWords = await db.words.toArray();
          const oldWords = allWords.filter((w) => w.source === 'yonsei');
          if (oldWords.length > 0) {
            const oldIds = oldWords.map((w) => w.id);
            await Promise.all(oldIds.map((id) => db.words.delete(id)));
            const books = await db.wordBooks.toArray();
            for (const book of books) {
              const filtered = book.wordIds.filter((id) => !oldIds.includes(id));
              if (filtered.length !== book.wordIds.length) {
                await db.wordBooks.update(book.id, { wordIds: filtered });
              }
            }
          }
          const allBooks = await db.wordBooks.toArray();
          for (const book of allBooks.filter((b) => b.id.startsWith('yonsei-'))) {
            await db.wordBooks.delete(book.id);
          }
        } catch (e) {
          console.warn('yonsei migration error', e);
        }
        localStorage.setItem('yonsei_v2_migrated', '1');
      })();
    }
  }, []);

  // Reset book selection when switching textbook
  const handleTextbookSwitch = (t: TextbookType) => {
    setTextbook(t);
    setSelectedBook(1);
  };

  const bookLabels = textbook === 'yonsei' ? YONSEI_LABELS : SEOUL_LABELS;
  const bookColors = textbook === 'yonsei' ? YONSEI_BOOK_COLORS : SEOUL_BOOK_COLORS;
  const routePrefix = textbook === 'yonsei' ? 'yonsei' : 'seoul';
  const idPrefix = textbook === 'yonsei' ? 'yonsei' : 'seoul';

  const visibleUnits = units.filter(u => u.id.startsWith(`${idPrefix}-${selectedBook}-`));

  return (
    <div className="space-y-4">
      {/* Textbook tab switcher */}
      <div className="flex gap-2 p-1 rounded-xl bg-[var(--bg-input)]">
        <button
          onClick={() => handleTextbookSwitch('yonsei')}
          className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
          style={textbook === 'yonsei'
            ? { background: '#fff', color: '#241917', boxShadow: '0 1px 4px rgba(78,52,46,.10)' }
            : { color: 'var(--text-secondary)' }
          }
        >
          延世韩国语
        </button>
        <button
          onClick={() => handleTextbookSwitch('seoul')}
          className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
          style={textbook === 'seoul'
            ? { background: '#fff', color: '#241917', boxShadow: '0 1px 4px rgba(78,52,46,.10)' }
            : { color: 'var(--text-secondary)' }
          }
        >
          首尔韩国语
        </button>
      </div>

      <div className="bg-gradient-to-r from-[var(--purple-soft)]/10 to-[var(--pink-primary)]/10 border border-[var(--purple-soft)]/20 rounded-2xl p-4 flex items-start gap-3">
        <GraduationCap size={20} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {textbook === 'yonsei' ? '延世大学韩国语学堂 官方教材' : '首尔大学语言教育院 官方教材'}
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {textbook === 'yonsei'
              ? '词汇选自《연세 한국어 1-6》教材，按单元学习，可加入单词本复习。'
              : '词汇选自《서울대 한국어 1-4》教材，按单元学习，可加入单词本复习。'
            }
          </p>
        </div>
      </div>

      {/* Book selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {bookLabels.map((label, i) => {
          const bookNum = i + 1;
          const isActive = selectedBook === bookNum;
          return (
            <button
              key={bookNum}
              onClick={() => setSelectedBook(bookNum)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={isActive
                ? { backgroundColor: bookColors[i], color: '#241917' }
                : { backgroundColor: 'var(--bg-input)', color: 'var(--text-secondary)' }
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {loading ? (
          <div className="col-span-2 py-12 text-center text-sm text-[var(--text-muted)]">加载中...</div>
        ) : visibleUnits.length === 0 ? (
          <div className="col-span-2 py-12 text-center text-sm text-[var(--text-muted)]">
            暂无数据，词汇即将上线，敬请期待
          </div>
        ) : visibleUnits.map((unit) => {
          const bookIdx = parseInt(unit.id.split('-')[1]) - 1;
          const color = bookColors[bookIdx % bookColors.length];
          const isEmpty = unit.words.length === 0;

          return (
            <div
              key={unit.id}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {unit.unitNumber}
                </div>
                {isEmpty && (
                  <span
                    className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full opacity-50"
                    style={{ background: 'rgba(255,127,168,0.1)', color: 'var(--pink-primary)' }}
                  >
                    <BookMarked size={11} />整理中
                  </span>
                )}
              </div>

              <h3 className="font-bold text-[var(--text-primary)] text-sm mb-0.5">
                {unit.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mb-1">
                {unit.titleKo} · {unit.bookTitle}
              </p>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                {unit.description}
              </p>

              {unit.words.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {unit.words.slice(0, 6).map((w, wi) => (
                    <span
                      key={wi}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-secondary)]"
                    >
                      {w.word}
                    </span>
                  ))}
                  {unit.words.length > 6 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)]">
                      +{unit.words.length - 6}
                    </span>
                  )}
                </div>
              )}

              {isEmpty ? (
                <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium opacity-40 cursor-not-allowed" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                  <BookOpen size={14} />
                  整理中，即将上线
                </div>
              ) : (
                <Link
                  href={`/vocabulary/${routePrefix}/${unit.id}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ background: `${color}20`, color }}
                >
                  <BookOpen size={14} />
                  进入学习
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
