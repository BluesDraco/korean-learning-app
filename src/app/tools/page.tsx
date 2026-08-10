'use client';

import Link from 'next/link';
import { SITE_URL } from '@/lib/seo';
import { ArrowLeftRight, Keyboard, UserRoundPen } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';

const TOOLS = [
  { slug: 'korean-name', seoName: 'Korean Name Generator', nameKey: 'tools.name_korean_name', descKey: 'tools.desc_korean_name', Icon: UserRoundPen, tone: 'pink' },
  { slug: 'romanization', seoName: 'Korean Romanization Converter', nameKey: 'tools.name_romanization', descKey: 'tools.desc_romanization', Icon: ArrowLeftRight, tone: 'mint' },
  { slug: 'keyboard', seoName: 'Online Korean Keyboard', nameKey: 'tools.name_keyboard', descKey: 'tools.desc_keyboard', Icon: Keyboard, tone: 'peach' },
];

function buildJsonLd(lang: Lang) {
  const isEn = lang === 'en';
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : '首页', item: `${SITE_URL}` },
      { '@type': 'ListItem', position: 2, name: isEn ? 'Free Korean Tools' : '免费韩语工具', item: `${SITE_URL}/tools` },
    ],
  };
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isEn ? 'Tori Korean Toolbox' : '兔莉韩语工具箱',
    itemListElement: TOOLS.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/tools/${t.slug}`,
      name: t.seoName,
    })),
  };
  return [breadcrumb, itemList];
}

export default function ToolsHubPage() {
  const { lang } = useLang();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
      />
      <div className="py-4 max-w-2xl md:max-w-3xl mx-auto">
        <header style={{ padding: '4px 12px 20px' }}>
          <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: 0, letterSpacing: '0.1em' }}>도구</p>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: '4px 0 8px', color: 'var(--color-ink-1)' }}>{t('tools.hub_title', lang)}</h1>
          <p style={{ fontSize: 14, color: 'var(--color-ink-3)', margin: 0, lineHeight: 1.6 }}>
            {t('tools.hub_subtitle', lang)}
          </p>
        </header>

        <div style={{ display: 'grid', gap: 12, padding: '0 12px' }}>
          {TOOLS.map(({ slug, nameKey, descKey, Icon, tone }) => (
            <Link
              key={slug}
              href={`/tools/${slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: 16,
                borderRadius: 14,
                background: 'var(--color-surface-1)',
                border: '1px solid var(--color-line)',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background:
                    tone === 'pink' ? 'var(--color-pink-soft, #fff0f5)' :
                    tone === 'mint' ? 'var(--color-mint-soft)' :
                    'var(--color-surface-2)',
                  color:
                    tone === 'pink' ? 'var(--color-pink-strong)' :
                    tone === 'mint' ? 'var(--color-mint-strong)' :
                    'var(--color-ink-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={24} strokeWidth={1.75} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>{t(nameKey, lang)}</p>
                <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 0', lineHeight: 1.5 }}>{t(descKey, lang)}</p>
              </div>
            </Link>
          ))}
        </div>

        <section style={{ padding: '28px 12px 8px' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px', color: 'var(--color-ink-2)' }}>{t('tools.about_title', lang)}</h2>
          <p style={{ fontSize: 13, color: 'var(--color-ink-3)', lineHeight: 1.7, margin: 0 }}>
            {t('tools.about_desc', lang)}
          </p>
        </section>
      </div>
    </>
  );
}
