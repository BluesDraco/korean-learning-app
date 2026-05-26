'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Library, BarChart3, GraduationCap } from 'lucide-react';
import { ThemesSection } from '@/components/vocabulary/ThemesSection';
import { LevelsSection } from '@/components/vocabulary/LevelsSection';
import { YonseiSection } from '@/components/vocabulary/YonseiSection';

const tabs = [
  { key: 'themes', label: '主题词包', icon: Library },
  { key: 'levels', label: '分级词表', icon: BarChart3 },
  { key: 'yonsei', label: '延世教材', icon: GraduationCap },
] as const;

type TabKey = (typeof tabs)[number]['key'];

export default function LibraryPage() {
  const [tab, setTab] = useState<TabKey>('themes');

  return (
    <div className="py-4 space-y-5">
      {/* Header */}
      <div>
        <Link href="/vocabulary" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} />
          返回我的单词
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          📚 词库
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          系统化词汇学习资源，按场景、分级或教材探索
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--border-color)]">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                isActive
                  ? 'border-[var(--pink-primary)] text-[var(--pink-primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon size={16} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div>
        {tab === 'themes' && <ThemesSection />}
        {tab === 'levels' && <LevelsSection />}
        {tab === 'yonsei' && <YonseiSection />}
      </div>
    </div>
  );
}
