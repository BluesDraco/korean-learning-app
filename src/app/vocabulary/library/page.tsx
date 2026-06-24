'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, BarChart3, GraduationCap, Library, MessageCircle } from 'lucide-react';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader } from '@/components/ui';

const SectionLoading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
    <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--color-pink-base)', borderTopColor: 'transparent', animation: 'tori-spin 0.7s linear infinite' }} />
  </div>
);

const ThemesSection = dynamic(() => import('@/components/vocabulary/ThemesSection').then(m => m.ThemesSection), { loading: SectionLoading });
const LevelsSection = dynamic(() => import('@/components/vocabulary/LevelsSection').then(m => m.LevelsSection), { loading: SectionLoading });
const YonseiSection = dynamic(() => import('@/components/vocabulary/YonseiSection').then(m => m.YonseiSection), { loading: SectionLoading });
const ExpressionsSection = dynamic(() => import('@/components/vocabulary/ExpressionsSection').then(m => m.ExpressionsSection), { loading: SectionLoading });

const tabs = [
  { key: 'levels',      label: 'TOPIK 词表', Icon: BarChart3 },
  { key: 'yonsei',      label: '教材词汇',   Icon: GraduationCap },
  { key: 'themes',      label: '主题词包',   Icon: Library },
  { key: 'expressions', label: '活用表达',   Icon: MessageCircle },
] as const;

type TabKey = (typeof tabs)[number]['key'];
const validKeys = tabs.map(t => t.key) as string[];

function LibraryContent() {
  const isDesktop = useIsDesktop();
  const searchParams = useSearchParams();
  const urlTab = searchParams.get('tab');
  const [tab, setTab] = useState<TabKey>(() =>
    validKeys.includes(urlTab ?? '') ? (urlTab as TabKey) : 'levels'
  );

  const containerCls = isDesktop ? 'py-6 max-w-5xl mx-auto px-4 space-y-5' : 'py-4 max-w-2xl mx-auto px-4 space-y-4';

  return (
    <div className={containerCls}>
      <Link
        href="/vocabulary"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
          marginBottom: 14,
        }}
      >
        <ArrowLeft size={14} />
        返回词汇
      </Link>

      <PageHeader
        eyebrow="LIBRARY"
        title="词库"
        subtitle="系统化词汇学习资源，按场景、分级或教材探索"
        tone="purple"
        flat
      />

      {/* Tabs */}
      <div
        style={{
          display: 'flex', gap: 4,
          borderBottom: '1px solid var(--color-border-1)',
          overflowX: 'auto', flexWrap: 'nowrap',
          marginBottom: 20,
        }}
      >
        {tabs.map((t) => {
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 16px', fontSize: 13, fontWeight: 600,
                borderBottom: '2px solid',
                borderBottomColor: isActive ? 'var(--color-pink-base)' : 'transparent',
                color: isActive ? 'var(--color-pink-strong)' : 'var(--color-ink-3)',
                background: 'transparent', border: 'none', borderRadius: 0,
                whiteSpace: 'nowrap', cursor: 'pointer',
                transition: 'all var(--dur-fast) var(--ease-soft)',
              }}
            >
              <t.Icon size={16} strokeWidth={1.75} />
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
    <Suspense fallback={
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <div
          style={{
            width: 24, height: 24, borderRadius: '50%',
            border: '2px solid var(--color-pink-base)', borderTopColor: 'transparent',
            animation: 'tori-spin 0.7s linear infinite',
          }}
        />
      </div>
    }>
      <LibraryContent />
    </Suspense>
  );
}
