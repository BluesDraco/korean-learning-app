'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Plus } from 'lucide-react';
import { db } from '@/lib/db';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader, Section, Card, Button } from '@/components/ui';

interface Article {
  id: string;
  title: string;
  originalText?: string;
  translatedText?: string;
  sourceUrl?: string;
  createdAt?: number;
}

export default function MineArticlesPage() {
  const isDesktop = useIsDesktop();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.articles.orderBy('createdAt').reverse().toArray()
      .then((rows) => setArticles(rows as Article[]))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  const containerCls = isDesktop ? 'py-4 max-w-5xl mx-auto' : 'py-4 max-w-2xl mx-auto';

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
        返回我的
      </Link>

      <PageHeader
        eyebrow="MY ARTICLES"
        title="我的文章"
        subtitle={articles.length > 0 ? `共 ${articles.length} 篇` : '保存阅读过的文章，方便回顾'}
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
              还没有保存文章
            </h2>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '0 0 20px', lineHeight: 1.6 }}>
              在阅读文章时点击保存，内容会出现在这里
            </p>
            <Link href="/reading" style={{ textDecoration: 'none' }}>
              <Button variant="primary" tone="black" icon={<Plus size={15} />}>去阅读</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <Section spacing="normal">
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 10 }}>
            {articles.map((article) => (
              <Card key={article.id} variant="default" padding="md">
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
                      overflow: 'hidden', display: '-webkit-box',
                      WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
                    }}
                  >
                    {article.originalText}
                  </p>
                )}
                {article.createdAt && (
                  <p style={{ fontSize: 11, color: 'var(--color-ink-4)', margin: '8px 0 0' }}>
                    {new Date(article.createdAt).toLocaleDateString('zh-CN')}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
