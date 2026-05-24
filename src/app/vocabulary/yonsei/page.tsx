'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, Plus, Check, Loader2, GraduationCap,
  Hash, Bookmark,
} from 'lucide-react';
import { db } from '@/lib/db';
import { yonseiUnits, type YonseiUnit } from '@/data/yonsei-books';
import type { WordBook } from '@/types';

const YONSEI_COLORS = [
  'var(--pink-primary)',
  'var(--purple-soft)',
  'var(--mint-soft)',
  'var(--peach-soft)',
  'var(--blue-soft)',
  'var(--color-vocab)',
  '#FF8FAB',
  '#A8D8D0',
  '#C9B8E8',
  '#FFBEA8',
];

export default function YonseiBooksPage() {
  const [installedIds, setInstalledIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [installing, setInstalling] = useState<string | null>(null);

  const loadInstalled = useCallback(async () => {
    const all = await db.wordBooks.toArray();
    const ids = new Set(all.filter((b) => b.id.startsWith('yonsei-')).map((b) => b.id));
    setInstalledIds(ids);
    setLoading(false);
  }, []);

  useEffect(() => { loadInstalled(); }, [loadInstalled]);

  const handleInstall = async (unit: YonseiUnit) => {
    setInstalling(unit.id);
    const now = Date.now();

    // Create word entries
    const wordIds: string[] = [];
    for (const w of unit.words) {
      const wordId = crypto.randomUUID();
      await db.words.put({
        id: wordId,
        word: w.word,
        pronunciation: w.pronunciation,
        meaning: w.meaning,
        partOfSpeech: w.partOfSpeech,
        examples: [],
        mastery: 'new' as const,
        srsLevel: 0,
        easeFactor: 2.5,
        interval: 0,
        nextReview: now,
        createdAt: now,
        lastReviewed: null,
      });
      wordIds.push(wordId);
    }

    // Create word book
    const colorIdx = parseInt(unit.id.split('-')[2]) - 1;
    await db.wordBooks.put({
      id: unit.id,
      name: `${unit.title} (${unit.bookTitle} 第${unit.unitNumber}课)`,
      description: unit.description,
      wordIds,
      color: YONSEI_COLORS[colorIdx % YONSEI_COLORS.length],
      createdAt: now,
      updatedAt: now,
    });

    setInstalledIds((prev) => new Set(prev).add(unit.id));
    setInstalling(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  return (
    <div className="py-4 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/vocabulary" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">延世教材词书</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">연세 한국어 教材同步词汇表，按单元导入学习</p>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-gradient-to-r from-[var(--purple-soft)]/10 to-[var(--pink-primary)]/10 border border-[var(--purple-soft)]/20 rounded-2xl p-4 flex items-start gap-3">
        <GraduationCap size={20} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">延世大学韩国语学堂 官方教材</p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            词汇选自《연세 한국어 1》教材，共10个单元，每个单元涵盖15个核心词汇。
            导入后会自动创建单词本并加入SRS复习系统。
          </p>
        </div>
      </div>

      {/* Units grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {yonseiUnits.map((unit) => {
          const isInstalled = installedIds.has(unit.id);
          const isCurrent = installing === unit.id;
          const colorIdx = parseInt(unit.id.split('-')[2]) - 1;
          const color = YONSEI_COLORS[colorIdx % YONSEI_COLORS.length];

          return (
            <div
              key={unit.id}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 hover:shadow-lg transition-all"
            >
              {/* Top row: unit number + badge */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  {unit.unitNumber}
                </div>
                {isInstalled ? (
                  <span className="flex items-center gap-1 text-xs text-[var(--mint-soft)] bg-[var(--mint-soft)]/10 px-2 py-0.5 rounded-full font-medium">
                    <Check size={12} />
                    已导入
                  </span>
                ) : (
                  <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-input)] px-2 py-0.5 rounded-full">
                    {unit.words.length}词
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-bold text-[var(--text-primary)] text-sm mb-0.5">
                {unit.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mb-1">
                {unit.titleKo} · {unit.bookTitle}
              </p>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                {unit.description}
              </p>

              {/* Word preview */}
              <div className="flex flex-wrap gap-1 mb-4">
                {unit.words.slice(0, 6).map((w) => (
                  <span
                    key={w.word}
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

              {/* Install button */}
              {isInstalled ? (
                <div className="flex items-center gap-2 text-xs text-[var(--mint-soft)]">
                  <Check size={14} />
                  <span>已加入你的单词本和SRS复习</span>
                </div>
              ) : (
                <button
                  onClick={() => handleInstall(unit)}
                  disabled={!!installing}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 disabled:opacity-50 text-sm font-medium transition-colors"
                >
                  {isCurrent ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      导入中...
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      导入此单元
                    </>
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom nav back */}
      <div className="flex justify-center">
        <Link
          href="/vocabulary/books"
          className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <Bookmark size={14} />
          查看我的单词本
        </Link>
      </div>
    </div>
  );
}
