'use client'

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, BarChart3, GraduationCap, Library, MessageCircle, BookText } from 'lucide-react';
import { useIsDesktop } from '@/lib/useIsMobile';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';

const SectionLoading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
    <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--color-pink-base)', borderTopColor: 'transparent', animation: 'tori-spin 0.7s linear infinite' }} />
  </div>
);

function SectionErrorFallback() {
  const { lang } = useLang();
  return (
    <div style={{ textAlign: 'center', padding: '48px 0' }}>
      <p style={{ fontSize: 13, color: 'var(--color-ink-3)', marginBottom: 8 }}>{t('vocab.load_failed_refresh', lang)}</p>
    </div>
  );
}
const ThemesSection = dynamic(
  () => import('@/components/vocabulary/ThemesSection').then(m => m.ThemesSection).catch(() => SectionErrorFallback),
  { loading: SectionLoading }
);
const LevelsSection = dynamic(
  () => import('@/components/vocabulary/LevelsSection').then(m => m.LevelsSection).catch(() => SectionErrorFallback),
  { loading: SectionLoading }
);
const YonseiSection = dynamic(
  () => import('@/components/vocabulary/YonseiSection').then(m => m.YonseiSection).catch(() => SectionErrorFallback),
  { loading: SectionLoading }
);
const ExpressionsSection = dynamic(
  () => import('@/components/vocabulary/ExpressionsSection').then(m => m.ExpressionsSection).catch(() => SectionErrorFallback),
  { loading: SectionLoading }
);
const DictEncyclopediaSection = dynamic(
  () => import('@/components/vocabulary/DictEncyclopediaSection').then(m => m.DictEncyclopediaSection).catch(() => SectionErrorFallback),
  { loading: SectionLoading }
);

const tabs = [
  { key: 'levels',      labelKey: 'vocab.lib_tab_levels',      Icon: BarChart3 },
  { key: 'yonsei',      labelKey: 'vocab.lib_tab_yonsei',      Icon: GraduationCap },
  { key: 'themes',      labelKey: 'vocab.lib_tab_themes',      Icon: Library },
  { key: 'expressions', labelKey: 'vocab.lib_tab_expressions', Icon: MessageCircle },
  { key: 'dictionary',  labelKey: 'vocab.lib_tab_dictionary',  Icon: BookText },
] as const;

type TabKey = (typeof tabs)[number]['key'];
const validKeys = tabs.map(tab => tab.key) as string[];

function LibraryContent() {
  const { lang } = useLang();
  const isDesktop = useIsDesktop();
  const searchParams = useSearchParams();
  const urlTab = searchParams.get('tab');
  const [tab, setTab] = useState<TabKey>(() =>
    validKeys.includes(urlTab ?? '') ? (urlTab as TabKey) : 'levels'
  );

  // 桌面端：主内容槽由 AppShell 控制（--desktop-main-rail: 1088px），
  // 这里让内容占满主槽宽度即可；手机端保持原 max-w-2xl 不动
  const containerCls = isDesktop
    ? 'py-6 w-full px-8 space-y-8'
    : 'py-4 max-w-2xl mx-auto px-4 space-y-4';

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

      {/* ═════ HERO ═════ */}
      {isDesktop ? (
        <section
          style={{
            position: 'relative',
            padding: '36px 40px 32px',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, var(--color-purple-soft), var(--color-surface-2) 70%)',
            border: '1px solid var(--color-border-1)',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden',
          }}
        >
          {/* 背景"단어"淡衬 */}
          <span
            aria-hidden
            style={{
              position: 'absolute',
              top: -30, right: -20,
              fontFamily: "'Noto Serif KR', 'Noto Sans KR', serif",
              fontWeight: 900,
              fontSize: 240,
              lineHeight: 1,
              color: 'var(--color-purple-base)',
              opacity: 0.08,
              letterSpacing: '-0.05em',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            단어
          </span>

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
        {tab === 'dictionary'  && <DictEncyclopediaSection />}
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
