'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BarChart3, GraduationCap, Library, MessageCircle } from 'lucide-react';
import { ThemesSection } from '@/components/vocabulary/ThemesSection';
import { LevelsSection } from '@/components/vocabulary/LevelsSection';
import { YonseiSection } from '@/components/vocabulary/YonseiSection';
import { ExpressionsSection } from '@/components/vocabulary/ExpressionsSection';

const tabs = [
  { key: 'levels',      label: 'TOPIK词表', icon: BarChart3 },
  { key: 'yonsei',      label: '教材词汇',  icon: GraduationCap },
  { key: 'themes',      label: '主题词包',  icon: Library },
  { key: 'expressions', label: '活用表达',  icon: MessageCircle },
] as const;

type TabKey = (typeof tabs)[number]['key'];
const validKeys = tabs.map(t => t.key) as string[];

function LibraryContent() {
  const searchParams = useSearchParams();
  const urlTab = searchParams.get('tab');
  const [tab, setTab] = useState<TabKey>(() =>
    validKeys.includes(urlTab ?? '') ? (urlTab as TabKey) : 'levels'
  );

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
      <div className="flex gap-2 border-b border-[var(--border-color)] overflow-x-auto flex-nowrap">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
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
        {tab === 'levels'      && <LevelsSection />}
        {tab === 'yonsei'      && <YonseiSection />}
        {tab === 'themes'      && <ThemesSection />}
        {tab === 'expressions' && <ExpressionsSection />}
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center py-20"><div className="w-6 h-6 rounded-full border-2 border-[var(--pink-primary)] border-t-transparent animate-spin" /></div>}>
      <LibraryContent />
    </Suspense>
  );
}
