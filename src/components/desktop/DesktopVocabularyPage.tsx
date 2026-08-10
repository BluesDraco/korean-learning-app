'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Library, RefreshCw, BookOpen, Bookmark, Sparkles } from 'lucide-react';
import { Section, Card, Button } from '@/components/ui';
import { FloatingDecorations } from '@/components/FloatingDecorations';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '@/app/learning/learning-visual.css';

const QUICK_LINKS = [
  { Icon: Library,    labelKey: 'vocab.hub_lib_label',        descKey: 'vocab.hub_lib_detail',            href: '/vocabulary/library',           tone: 'pink'   as const },
  { Icon: RefreshCw,  labelKey: 'vocab.hub_desktop_flashcard', descKey: 'vocab.hub_desktop_flashcard_sub', href: '/review',                       tone: 'mint'   as const },
  { Icon: BookOpen,   labelKey: 'vocab.hub_my_books',         descKey: 'vocab.hub_desktop_books_sub',     href: '/vocabulary/books',             tone: 'purple' as const },
  { Icon: Bookmark,   labelKey: 'vocab.hub_my_sentences',     descKey: 'vocab.hub_sentences_detail',      href: '/vocabulary?tab=sentences',     tone: 'peach'  as const },
];

const TONE_BG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-soft)', mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)', purple: 'var(--color-purple-soft)',
};
const TONE_FG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-strong)', mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)', purple: 'var(--color-purple-strong)',
};

interface Stats {
  [k: string]: unknown;
  total: number;
  mastered: number;
  learning: number;
  dueReview: number;
}

export function DesktopVocabularyPage() {
  const { lang } = useLang();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<Stats>({ total: 0, mastered: 0, learning: 0, dueReview: 0 });

  useEffect(() => {
    if (!user) { setStats({ total: 0, mastered: 0, learning: 0, dueReview: 0 }); return; }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    (async () => {
      try {
        const res = await fetch('/api/vocabulary/home', { signal: controller.signal, cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (data.stats) setStats(data.stats);
      } catch { /* ignore */ }
      finally { clearTimeout(timer); }
    })();
    return () => { clearTimeout(timer); controller.abort(); };
  }, [user?.id]);

  return (
    <div className="learn-visual-root">
      <FloatingDecorations />
      {/* 头部对齐学习页:Tori 단어 我的词汇 横向品牌栏 + 分割线 */}
      <header className="learn-head learn-enter" style={{ '--i': 0 } as React.CSSProperties}>
        <div className="learn-brand">
          <span className="learn-brand-mark">Tori</span>
          <span className="learn-brand-kr">단어</span>
          <span className="learn-brand-sub">{t('vocab.hub_brand_sub', lang)}</span>
        </div>
      </header>

      {/* 未登录引导 —— 对齐移动版：登录 CTA + 免费浏览公开词表 */}
      {!authLoading && !user && (
        <div className="learn-enter" style={{ '--i': 1 } as React.CSSProperties}>
          <div style={{ textAlign: 'center', padding: '32px 20px 20px' }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-ink-1)', marginBottom: 8 }}>{t('vocab.hub_login_to_view', lang)}</p>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', marginBottom: 18 }}>{t('vocab.hub_login_sub', lang)}</p>
            <a href="/auth/login?redirect=/vocabulary" style={{ display: 'inline-block', padding: '10px 32px', borderRadius: 999, background: 'var(--color-pink-base)', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>{t('vocab.hub_login_register', lang)}</a>
          </div>
          <div style={{ padding: '8px 0 8px' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 12px' }}>{t('vocab.hub_browse_free', lang)}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <a href="/vocabulary/library?tab=themes" style={{ display: 'block', padding: '16px 14px', borderRadius: 14, background: 'var(--color-surface-2)', border: '1px solid var(--color-border-1)', textDecoration: 'none', color: 'var(--color-ink-1)' }}>
                <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 4px' }}>{t('vocab.hub_free_themes', lang)}</p>
                <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: 0 }}>{t('vocab.hub_free_themes_sub', lang)}</p>
              </a>
              <a href="/vocabulary/library?tab=levels" style={{ display: 'block', padding: '16px 14px', borderRadius: 14, background: 'var(--color-surface-2)', border: '1px solid var(--color-border-1)', textDecoration: 'none', color: 'var(--color-ink-1)' }}>
                <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 4px' }}>{t('vocab.hub_free_levels', lang)}</p>
                <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: 0 }}>{t('vocab.hub_free_levels_sub', lang)}</p>
              </a>
              <a href="/vocabulary/library?tab=expressions" style={{ display: 'block', padding: '16px 14px', borderRadius: 14, gridColumn: '1 / -1', background: 'var(--color-pink-soft)', border: '1px solid var(--color-pink-base)', textDecoration: 'none', color: 'var(--color-ink-1)' }}>
                <p style={{ fontSize: 14, fontWeight: 700, margin: '0 0 4px', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Sparkles size={13} style={{ color: 'var(--color-pink-strong)' }} />
                  {t('vocab.hub_free_expr', lang)}
                </p>
                <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: 0 }}>{t('vocab.hub_free_expr_sub', lang)}</p>
              </a>
            </div>
          </div>
        </div>
      )}

      {!(authLoading || !user) && (<>

      {/* Stats — 平板 2 列，桌面 4 列 */}
      <div className="learn-enter grid grid-cols-2 xl:grid-cols-4 gap-3 mb-6" style={{ '--i': 1 } as React.CSSProperties}>
        {[
          { value: stats.total,     labelKey: 'vocab.hub_stat_saved' },
          { value: stats.mastered,  labelKey: 'vocab.mastered' },
          { value: stats.learning,  labelKey: 'vocab.learning' },
          { value: stats.dueReview, labelKey: stats.dueReview > 0 ? 'vocab.hub_due_review_arrow' : 'vocab.hub_due_review', action: () => router.push('/vocabulary/review-pool') },
        ].map((s) => {
          const isInteractive = !!s.action;
          return (
            <Card
              key={s.labelKey}
              variant="stat"
              tone="neutral"
              padding="md"
              {...(isInteractive ? { as: 'button', onClick: s.action, interactive: true } : {})}
            >
              <p style={{ fontSize: 30, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0, lineHeight: 1 }}>
                {s.value || '—'}
              </p>
              <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '6px 0 0' }}>{t(s.labelKey, lang)}</p>
            </Card>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="learn-enter" style={{ '--i': 2 } as React.CSSProperties}>
      <Section title={t('vocab.hub_all_features', lang)} spacing="normal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {QUICK_LINKS.map(({ Icon, labelKey, descKey, href, tone }) => (
            <Card key={href} as="button" onClick={() => router.push(href)} variant="default" padding="md" interactive>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  style={{
                    width: 48, height: 48, borderRadius: 'var(--radius-md)',
                    background: TONE_BG[tone], color: TONE_FG[tone],
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                  aria-hidden
                >
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                    {t(labelKey, lang)}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '4px 0 0', lineHeight: 1.5 }}>
                    {t(descKey, lang)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>
      </div>

      {/* Due review CTA */}
      {stats.dueReview > 0 && (
        <Card variant="hero" tone="pink" padding="lg" style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
                {t('vocab.hub_due_banner', lang, { n: stats.dueReview })}
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 0' }}>
                {t('vocab.hub_due_banner_sub', lang)}
              </p>
            </div>
            <Button variant="primary" tone="pink" onClick={() => router.push('/vocabulary/review-pool')}>
              {t('vocab.hub_go_manage', lang)}
            </Button>
          </div>
        </Card>
      )}
      </>)}
    </div>
  );
}
