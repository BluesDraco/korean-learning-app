'use client';

import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, BookMarked } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { loadYonseiIndex, loadSeoulIndex, loadVitaminIndex, type UnitMeta } from '@/lib/dataLoader';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';

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

const VITAMIN_BOOK_COLORS = [
  'var(--pink-primary)',
  'var(--mint-soft)',
  'var(--peach-soft)',
  'var(--blue-soft)',
];

// 各教材册数（book 选择器按册数生成，标签 = 教材短名 + 册号）
const YONSEI_BOOK_COUNT = 6;
const SEOUL_BOOK_COUNT = 4;
const VITAMIN_BOOK_COUNT = 2;

type TextbookType = 'yonsei' | 'seoul' | 'vitamin';

export function YonseiSection() {
  const { lang } = useLang();
  const [textbook, setTextbook] = useState<TextbookType>('yonsei');
  const [selectedBook, setSelectedBook] = useState(1);
  const [units, setUnits] = useState<UnitMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(false);
    (async () => {
      try {
        const index = textbook === 'yonsei'
          ? await loadYonseiIndex()
          : textbook === 'seoul'
          ? await loadSeoulIndex()
          : await loadVitaminIndex();
        if (!cancelled) setUnits(index);
      } catch { if (!cancelled) setLoadError(true); } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [textbook, retryCount]);

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

  const bookCount = textbook === 'yonsei' ? YONSEI_BOOK_COUNT : textbook === 'seoul' ? SEOUL_BOOK_COUNT : VITAMIN_BOOK_COUNT;
  const bookShortKey = textbook === 'yonsei' ? 'vocab.ys_short_yonsei' : textbook === 'seoul' ? 'vocab.ys_short_seoul' : 'vocab.ys_short_vitamin';
  const bookLabels = Array.from({ length: bookCount }, (_, i) => `${t(bookShortKey, lang)} ${i + 1}`);
  const bookColors = textbook === 'yonsei' ? YONSEI_BOOK_COLORS : textbook === 'seoul' ? SEOUL_BOOK_COLORS : VITAMIN_BOOK_COLORS;
  const routePrefix = textbook;
  const idPrefix = textbook;

  const visibleUnits = units.filter(u => u.id.startsWith(`${idPrefix}-${selectedBook}-`));

  return (
    <div className="space-y-4">
      {/* Textbook tab switcher */}
      <div className="flex gap-2 p-1 rounded-xl bg-[var(--bg-input)]">
        <button
          onClick={() => handleTextbookSwitch('yonsei')}
          className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
          style={textbook === 'yonsei'
            ? { background: 'var(--color-surface-1)', color: 'var(--color-ink-1)', boxShadow: '0 1px 4px rgba(78,52,46,.10)' }
            : { color: 'var(--text-secondary)' }
          }
        >
          {t('vocab.ys_tab_yonsei', lang)}
        </button>
        <button
          onClick={() => handleTextbookSwitch('seoul')}
          className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
          style={textbook === 'seoul'
            ? { background: 'var(--color-surface-1)', color: 'var(--color-ink-1)', boxShadow: '0 1px 4px rgba(78,52,46,.10)' }
            : { color: 'var(--text-secondary)' }
          }
        >
          {t('vocab.ys_tab_seoul', lang)}
        </button>
        <button
          onClick={() => handleTextbookSwitch('vitamin')}
          className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
          style={textbook === 'vitamin'
            ? { background: 'var(--color-surface-1)', color: 'var(--color-ink-1)', boxShadow: '0 1px 4px rgba(78,52,46,.10)' }
            : { color: 'var(--text-secondary)' }
          }
        >
          {t('vocab.ys_tab_vitamin', lang)}
        </button>
      </div>

      <div className="bg-gradient-to-r from-[var(--purple-soft)]/10 to-[var(--pink-primary)]/10 border border-[var(--purple-soft)]/20 rounded-2xl p-4 flex items-start gap-3">
        <GraduationCap size={20} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {textbook === 'yonsei' ? t('vocab.ys_head_yonsei', lang) : textbook === 'seoul' ? t('vocab.ys_head_seoul', lang) : t('vocab.ys_head_vitamin', lang)}
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {textbook === 'yonsei'
              ? t('vocab.ys_desc_yonsei', lang)
              : textbook === 'seoul'
              ? t('vocab.ys_desc_seoul', lang)
              : t('vocab.ys_desc_vitamin', lang)
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
                ? { backgroundColor: bookColors[i], color: 'var(--color-ink-1)' }
                : { backgroundColor: 'var(--bg-input)', color: 'var(--text-secondary)' }
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {loading ? (
          <div className="col-span-2 lg:col-span-3 py-12 text-center text-sm text-[var(--text-muted)]">{t('common.loading', lang)}</div>
        ) : loadError ? (
          <div className="text-center py-16">
            <p className="text-sm text-[var(--text-secondary)] mb-3">{t('vocab.load_failed', lang)}</p>
            <button onClick={() => setRetryCount(c => c + 1)} className="text-sm text-[var(--pink-primary)] underline">{t('vocab.retry', lang)}</button>
          </div>
        ) : visibleUnits.length === 0 ? (
          <div className="col-span-2 lg:col-span-3 py-12 text-center text-sm text-[var(--text-muted)]">
            {t('vocab.ys_no_data', lang)}
          </div>
        ) : visibleUnits.map((unit) => {
          const bookIdx = parseInt(unit.id.split('-')[1]) - 1;
          const color = bookColors[bookIdx % bookColors.length];
          const isEmpty = unit.wordCount === 0;

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
                    <BookMarked size={11} />{t('vocab.ys_organizing', lang)}
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

              {unit.wordCount > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {unit.previewWords.map((w, wi) => (
                    <span
                      key={wi}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-secondary)]"
                    >
                      {w}
                    </span>
                  ))}
                  {unit.wordCount > unit.previewWords.length && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)]">
                      +{unit.wordCount - unit.previewWords.length}
                    </span>
                  )}
                </div>
              )}

              {isEmpty ? (
                <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium opacity-40 cursor-not-allowed" style={{ background: 'var(--bg-input)', color: 'var(--text-muted)' }}>
                  <BookOpen size={14} />
                  {t('vocab.ys_organizing_soon', lang)}
                </div>
              ) : (
                <Link
                  href={`/vocabulary/${routePrefix}/${unit.id}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ background: `${color}20`, color }}
                >
                  <BookOpen size={14} />
                  {t('vocab.ys_enter_study', lang)}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
