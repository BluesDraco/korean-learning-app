'use client'

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
    <div className={containerCls}>
      <Link
        href="/vocabulary"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
          marginBottom: isDesktop ? 4 : 14,
        }}
      >
        <ArrowLeft size={14} />
        {t('vocab.back_to_vocab', lang)}
      </Link>

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

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div>
              <p style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 12, fontWeight: 800,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--color-purple-strong)',
                margin: 0, marginBottom: 14,
              }}>
                <span style={{ width: 22, height: 1.5, background: 'var(--color-purple-strong)', borderRadius: 2 }} />
                {t('vocab.lib_eyebrow', lang)}
              </p>
              <h1 style={{
                fontSize: 44, fontWeight: 900,
                color: 'var(--color-ink-1)',
                margin: 0, lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}>
                {t('vocab.lib_title', lang)}
                <span style={{
                  display: 'block',
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 18, fontWeight: 500,
                  color: 'var(--color-ink-3)',
                  marginTop: 10,
                  letterSpacing: '0.04em',
                }}>
                  {t('vocab.lib_subtitle_kr', lang)}
                </span>
              </h1>
              <p style={{
                fontSize: 14, color: 'var(--color-ink-2)',
                lineHeight: 1.7, marginTop: 14,
                maxWidth: '44ch', margin: '14px 0 0',
              }}>
                {t('vocab.lib_desc', lang)}
              </p>
            </div>
          </div>

        </section>
      ) : (
        <div>
          <p style={{
            fontSize: 12, fontWeight: 800,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--color-purple-strong)',
            margin: 0, marginBottom: 6,
          }}>
            LIBRARY
          </p>
          <h1 style={{
            fontSize: 28, fontWeight: 800,
            color: 'var(--color-ink-1)',
            margin: 0, lineHeight: 1.15,
          }}>
            {t('vocab.lib_title', lang)}
          </h1>
          <p style={{
            fontSize: 14, color: 'var(--color-ink-3)',
            marginTop: 4, lineHeight: 1.5, marginBottom: 0,
          }}>
            {t('vocab.lib_desc_mobile', lang)}
          </p>
        </div>
      )}

      {/* ═════ Tabs ═════ */}
      {isDesktop ? (
        <div style={{ display: 'flex' }}>
          <div
            style={{
              display: 'inline-flex', gap: 4,
              padding: 6,
              background: 'var(--color-surface-3)',
              border: '1px solid var(--color-border-1)',
              borderRadius: 999,
              boxShadow: 'var(--shadow-xs)',
            }}
          >
            {tabs.map((item) => {
              const isActive = tab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 20px',
                    fontSize: 13, fontWeight: 700,
                    color: isActive ? 'var(--color-pink-strong)' : 'var(--color-ink-3)',
                    background: isActive ? 'var(--color-surface-2)' : 'transparent',
                    border: 'none',
                    borderRadius: 999,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                    transition: 'all var(--dur-fast) var(--ease-soft)',
                  }}
                >
                  <item.Icon size={16} strokeWidth={1.75} />
                  {t(item.labelKey, lang)}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex', gap: 4,
            borderBottom: '1px solid var(--color-border-1)',
            overflowX: 'auto', flexWrap: 'nowrap',
            marginBottom: 20,
          }}
        >
          {tabs.map((item) => {
            const isActive = tab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
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
                <item.Icon size={16} strokeWidth={1.75} />
                {t(item.labelKey, lang)}
              </button>
            );
          })}
        </div>
      )}

      {/* ═════ Tab content ═════ */}
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
