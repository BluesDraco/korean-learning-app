'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MobilePageHero } from '@/components/mobile/MobilePageHero';
import { ToriPrimaryButton } from '@/components/mobile/ToriPrimaryButton';
import { ToriSectionHeader } from '@/components/mobile/ToriSectionHeader';
import { DesktopToolsPage } from '@/components/desktop/DesktopToolsPage';

const toolGrid = [
  { label: '查词翻译', desc: '韩语字典', href: '/dictionary', icon: '🔍', color: '#b49ccf' },
  { label: '文章拆解', desc: '文章分析', href: '/reading', icon: '📄', color: '#b49ccf' },
  { label: '语法解释', desc: '句型例句', href: '/grammar', icon: '📖', color: '#e47a94' },
  { label: '韩文打字', desc: '键盘练习', href: '/typing', icon: '⌨️', color: '#e8a87c' },
  { label: 'AI 场景陪练', desc: '情景对话', href: '/ai/chat', icon: '💬', color: '#b49ccf' },
];

const BREADCRUMB_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '首页', item: `${SITE_URL}` },
    { '@type': 'ListItem', position: 2, name: '免费韩语工具', item: `${SITE_URL}/tools` },
  ],
};

const ITEMLIST_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '兔莉韩语工具箱',
  itemListElement: TOOLS.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${SITE_URL}/tools/${t.slug}`,
    name: t.seoName,
  })),
};

export default function ToolsHubPage() {
  const { lang } = useLang();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([BREADCRUMB_JSONLD, ITEMLIST_JSONLD]) }}
      />
      <div className="py-4 max-w-2xl md:max-w-3xl mx-auto">
        <header style={{ padding: '4px 12px 20px' }}>
          <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: 0, letterSpacing: '0.1em' }}>도구</p>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: '4px 0 8px', color: 'var(--color-ink-1)' }}>{t('tools.hub_title', lang)}</h1>
          <p style={{ fontSize: 14, color: 'var(--color-ink-3)', margin: 0, lineHeight: 1.6 }}>
            {t('tools.hub_subtitle', lang)}
          </p>
        </header>

      {/* Featured card */}
      <div className="space-y-2.5">
        {/* Content breakdown */}
        <div className="rounded-[28px] bg-gradient-to-br from-[#ffe4ec] to-[#fff4dc] p-5 shadow-[0_8px_24px_rgba(92,64,38,0.06)]">
          <div className="relative z-10">
            <p className="text-[17px] font-bold text-[#2f2a26]">内容拆解</p>
            <p className="text-[13px] text-[#8c8177] mt-1 leading-relaxed">粘贴一句韩语，Tori 帮你翻译、拆词、解释句子。</p>
            <div className="mt-3">
              <Link href="/ai/analyze">
                <ToriPrimaryButton>开始拆解</ToriPrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tool grid */}
      <div>
        <ToriSectionHeader title="全部工具" className="mb-2.5" />
        <div className="grid grid-cols-2 gap-2.5">
          {toolGrid.map((tool) => (
            <Link key={tool.href} href={tool.href} className="block rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] p-3.5 hover:bg-[var(--bg-card-hover)] transition-colors">
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl mb-2.5" style={{ background: `${tool.color}18` }}>
                {tool.icon}
              </div>
              <p className="text-sm font-bold text-[var(--text-primary)]">{tool.label}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{tool.desc}</p>
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
