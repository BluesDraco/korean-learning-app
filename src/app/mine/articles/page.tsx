'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { db } from '@/lib/db';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader, Section, Card, Button } from '@/components/ui';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { fmtDate } from '@/lib/datetime';

interface Article {
  [k: string]: unknown;
  id: string;
  title: string;
  originalText?: string;
  translatedText?: string;
  sourceUrl?: string;
  createdAt?: number;
}

export default function MineArticlesPage() {
  const { lang } = useLang();
  const isDesktop = useIsDesktop();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const reload = () => {
    setLoadError(false);
    setLoading(true);
    db.articles.orderBy('createdAt').reverse().toArray()
      .then((rows) => setArticles(rows as Article[]))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => { reload(); }, []);

  const containerCls = isDesktop ? 'py-4 max-w-none mx-auto' : 'py-4 max-w-2xl mx-auto';

  return (
    <div className={containerCls}>
      <Link
        href="/mine"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
          marginBottom: 14,
        }}
      >
        <ArrowLeft size={14} />
        {t('mine.back', lang)}
      </Link>

      <PageHeader
        eyebrow="MY ARTICLES"
        title={t('mine.articles_title', lang)}
        subtitle={articles.length > 0 ? t('mine.articles_count', lang, { n: articles.length }) : t('mine.articles_subtitle', lang)}
        tone="peach"
        flat
      />

      {loading ? (
        <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 24, height: 24, borderRadius: '50%',
              border: '2px solid var(--color-pink-base)', borderTopColor: 'transparent',
              animation: 'tori-spin 0.7s linear infinite',
              margin: '0 auto',
            }}
          />
        </Card>
      ) : loadError ? (
        <Card variant="hero" padding="lg">
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: 'var(--color-ink-3)', marginBottom: 12 }}>{t('mine.common_load_error', lang)}</p>
            <Button variant="primary" tone="black" onClick={reload}>{t('mine.common_retry', lang)}</Button>
          </div>
        </Card>
      ) : articles.length === 0 ? (
        <Card variant="hero" tone="peach" padding="lg">
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 64, height: 64, borderRadius: 'var(--radius-lg)',
                background: 'var(--color-surface-2)', color: 'var(--color-peach-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px',
              }}
              aria-hidden
            >
              <FileText size={28} strokeWidth={1.75} />
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: '0 0 6px' }}>
              {t('mine.articles_empty_title', lang)}
            </h2>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '0 0 20px', lineHeight: 1.6 }}>
              {t('mine.articles_empty_desc', lang)}
            </p>
            <Link href="/reading" style={{ textDecoration: 'none' }}>
              <Button variant="primary" tone="black">{t('mine.articles_empty_cta', lang)}</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Section spacing="normal">
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 10 }}>
            {articles.map((article) => {
              const isExpanded = expandedId === article.id;
              return (
                <Card key={article.id} variant="default" padding="md">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : article.id)}
                    className="w-full text-left bg-transparent border-none cursor-pointer p-0"
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3
                          style={{
                            fontSize: 15, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0,
                            overflow: 'hidden', display: '-webkit-box',
                            WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' as const,
                          }}
                        >
                          {article.title}
                        </h3>
                        {article.originalText && (
                          <p
                            style={{
                              fontSize: 12, color: 'var(--color-ink-3)', margin: '6px 0 0', lineHeight: 1.6,
                              overflow: 'hidden', display: isExpanded ? 'block' : '-webkit-box',
                              WebkitLineClamp: isExpanded ? undefined : 2, WebkitBoxOrient: 'vertical' as const,
                              whiteSpace: isExpanded ? 'pre-wrap' : undefined,
                            }}
                          >
                            {article.originalText}
                          </p>
                        )}
                      </div>
                      <span aria-hidden style={{ flexShrink: 0, color: 'var(--color-ink-4)', marginTop: 2 }}>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    </div>
                  </button>
                  {isExpanded && article.translatedText && (
                    <div style={{ marginTop: 10, padding: 10, background: 'var(--color-surface-3)', borderRadius: 10, fontSize: 12, color: 'var(--color-ink-2)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                      {article.translatedText}
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, gap: 8 }}>
                    {article.createdAt ? (
                      <p style={{ fontSize: 11, color: 'var(--color-ink-4)', margin: 0 }}>
                        {fmtDate(article.createdAt, lang)}
                      </p>
                    ) : <span />}
                    {article.sourceUrl && (
                      <a
                        href={article.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--color-pink-strong)', textDecoration: 'none' }}
                      >
                        {t('mine.articles_source', lang)} <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>
      )}
    </div>
  );
}
