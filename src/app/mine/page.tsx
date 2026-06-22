'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Library, BookOpen, MessageSquare, FileText, Mic,
  Music, PenLine, TrendingUp,
  StickyNote, LogIn, Settings,
  Mail, Moon, Sun, Shield,
} from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { useFeedback } from '@/hooks/useFeedback';
import { useTheme } from '@/components/ThemeProvider';
import { useLang } from '@/components/LangProvider';
import { useIsDesktop } from '@/lib/useIsMobile';
import { t } from '@/lib/i18n';
import { PageHeader, Section, Card, Button } from '@/components/ui';

interface MineStats {
  wordCount: number;
  sentenceCount: number;
  articleCount: number;
  recordingCount: number;
}

const TONE_BG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-soft)', mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)', purple: 'var(--color-purple-soft)',
};
const TONE_FG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-strong)', mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)', purple: 'var(--color-purple-strong)',
};

export default function MinePage() {
  const { user, loading: authLoading } = useAuth();
  const { click: feedbackClick } = useFeedback();
  const { theme, toggle } = useTheme();
  const { lang } = useLang();
  const isDesktop = useIsDesktop();
  const [stats, setStats] = useState<MineStats>({ wordCount: 0, sentenceCount: 0, articleCount: 0, recordingCount: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const results = await Promise.allSettled([
        db.words.count(),
        db.sentences.count(),
        db.articles.count(),
        db.recordings.count(),
      ]);
      if (cancelled) return;
      setStats({
        wordCount: results[0].status === 'fulfilled' ? results[0].value : 0,
        sentenceCount: results[1].status === 'fulfilled' ? results[1].value : 0,
        articleCount: results[2].status === 'fulfilled' ? results[2].value : 0,
        recordingCount: results[3].status === 'fulfilled' ? results[3].value : 0,
      });
    })();
    return () => { cancelled = true; };
  }, [user]);

  const containerCls = isDesktop ? 'py-4 max-w-5xl mx-auto' : 'py-4 max-w-2xl mx-auto';

  // ── SSR / initial client render ──
  if (!mounted) {
    return (
      <div className={containerCls}>
        <PageHeader eyebrow="내 정보" title={t('mine.page_title', lang)} subtitle={t('mine.page_desc', lang)} tone="purple" flat />
        <Card variant="default" padding="md">
          <div style={{ height: 16, width: 128, background: 'var(--color-surface-4)', borderRadius: 6, marginBottom: 12 }} />
          <div style={{ height: 12, width: 192, background: 'var(--color-surface-4)', borderRadius: 6 }} />
        </Card>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className={containerCls}>
        <PageHeader eyebrow="내 정보" title={t('mine.page_title', lang)} subtitle={t('mine.page_desc', lang)} tone="purple" flat />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ height: 60, borderRadius: 'var(--radius-md)', background: 'var(--color-surface-3)' }} />
          ))}
        </div>
      </div>
    );
  }

  // ── Unauthenticated ──
  if (!user) {
    const lockedItems = [
      { labelKey: 'mine.locked_words_label', descKey: 'mine.locked_words_desc', Icon: BookOpen, tone: 'pink' as const },
      { labelKey: 'mine.locked_sentences_label', descKey: 'mine.locked_sentences_desc', Icon: MessageSquare, tone: 'purple' as const },
      { labelKey: 'mine.locked_notes_label', descKey: 'mine.locked_notes_desc', Icon: StickyNote, tone: 'mint' as const },
      { labelKey: 'mine.locked_kpop_label', descKey: 'mine.locked_kpop_desc', Icon: Music, tone: 'purple' as const },
      { labelKey: 'mine.locked_diary_label', descKey: 'mine.locked_diary_desc', Icon: PenLine, tone: 'pink' as const },
      { labelKey: 'mine.locked_achievements_label', descKey: 'mine.locked_achievements_desc', Icon: TrendingUp, tone: 'peach' as const },
    ];
    return (
      <div className={containerCls}>
        <PageHeader eyebrow="내 정보" title={t('mine.page_title', lang)} subtitle={t('mine.page_desc', lang)} tone="purple" flat />

        <Section spacing="normal">
          <Card variant="hero" tone="purple" padding="lg">
            <div style={{ textAlign: 'center' }}>
              <Library size={48} color="var(--color-ink-4)" style={{ margin: '0 auto 12px', display: 'block' }} />
              <p style={{ fontSize: 14, color: 'var(--color-ink-3)', margin: '0 0 16px' }}>
                {t('mine.login_prompt', lang)}
              </p>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/auth/login?redirect=/mine" style={{ textDecoration: 'none' }}>
                  <Button variant="primary" tone="pink" icon={<LogIn size={14} />}>{t('mine.login_button', lang)}</Button>
                </Link>
                <Link href="/auth/register" style={{ textDecoration: 'none' }}>
                  <Button variant="secondary">{t('mine.register_button', lang)}</Button>
                </Link>
              </div>
            </div>
          </Card>
        </Section>

        <Section title={t('mine.locked_section_title', lang)} spacing="normal">
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr', gap: 10 }}>
            {lockedItems.map((item) => (
              <Card key={item.labelKey} variant="default" padding="md" style={{ opacity: 0.55 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: 'var(--radius-md)',
                      background: TONE_BG[item.tone], color: TONE_FG[item.tone],
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}
                    aria-hidden
                  >
                    <item.Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>{t(item.labelKey, lang)}</p>
                    <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>{t(item.descKey, lang)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </div>
    );
  }

  // ── Authenticated ──
  const statCards = [
    { labelKey: 'mine.stat_words', value: stats.wordCount },
    { labelKey: 'mine.stat_sentences', value: stats.sentenceCount },
    { labelKey: 'mine.stat_articles', value: stats.articleCount },
    { labelKey: 'mine.stat_recordings', value: stats.recordingCount },
  ];

  const menuSections = [
    {
      titleKey: 'mine.section_materials',
      items: [
        { labelKey: 'mine.item_words_label', descKey: 'mine.item_words_desc', href: '/vocabulary', Icon: BookOpen, tone: 'pink' as const },
        { labelKey: 'mine.item_sentences_label', descKey: 'mine.item_sentences_desc', href: '/vocabulary?tab=sentences', Icon: MessageSquare, tone: 'purple' as const },
        { labelKey: 'mine.item_articles_label', descKey: 'mine.item_articles_desc', href: '/mine/articles', Icon: FileText, tone: 'peach' as const },
        { labelKey: 'mine.item_notes_label', descKey: 'mine.item_notes_desc', href: '/mine/notes', Icon: StickyNote, tone: 'mint' as const },
      ],
    },
    {
      titleKey: 'mine.section_practice',
      items: [
        { labelKey: 'mine.item_recordings_label', descKey: 'mine.item_recordings_desc', href: '/mine/recordings', Icon: Mic, tone: 'mint' as const },
        { labelKey: 'mine.item_kpop_label', descKey: 'mine.item_kpop_desc', href: '/mine/kpop', Icon: Music, tone: 'purple' as const },
        { labelKey: 'mine.item_diary_label', descKey: 'mine.item_diary_desc', href: '/mine/diary', Icon: PenLine, tone: 'pink' as const },
        { labelKey: 'mine.item_achievements_label', descKey: 'mine.item_achievements_desc', href: '/stats', Icon: TrendingUp, tone: 'peach' as const },
      ],
    },
  ];

  return (
    <div className={containerCls}>
      <PageHeader eyebrow="내 정보" title={t('mine.page_title', lang)} subtitle={t('mine.page_desc', lang)} tone="purple" flat />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: isDesktop ? 12 : 8, marginBottom: 28 }}>
        {statCards.map((s) => (
          <Card key={s.labelKey} variant="stat" padding="md">
            <p style={{ fontSize: isDesktop ? 28 : 22, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0, lineHeight: 1 }}>
              {s.value}
            </p>
            <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: '6px 0 0' }}>{t(s.labelKey, lang)}</p>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {stats.wordCount === 0 && stats.sentenceCount === 0 && stats.recordingCount === 0 && (
        <Section spacing="normal">
          <Card variant="default" padding="lg" tone="neutral" style={{ background: 'var(--color-surface-3)', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '0 0 4px' }}>{t('mine.empty_state', lang)}</p>
            <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: 0 }}>{t('mine.empty_state_cta', lang)}</p>
          </Card>
        </Section>
      )}

      {/* Menu sections */}
      {menuSections.map((section) => (
        <Section key={section.titleKey} title={t(section.titleKey, lang)} spacing="normal">
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : '1fr', gap: 10 }}>
            {section.items.map((item) => (
              <Card key={item.href} as="a" href={item.href} onClick={feedbackClick} variant="row" interactive>
                <div
                  style={{
                    width: 40, height: 40, borderRadius: 'var(--radius-md)',
                    background: TONE_BG[item.tone], color: TONE_FG[item.tone],
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}
                  aria-hidden
                >
                  <item.Icon size={18} strokeWidth={1.75} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>{t(item.labelKey, lang)}</p>
                  <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>{t(item.descKey, lang)}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      ))}

      {/* Footer links */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', paddingBottom: 8 }}>
        <Link href="/messages" style={{ textDecoration: 'none' }}>
          <Button variant="secondary" size="sm" icon={<Mail size={13} />}>{t('mine.footer_messages', lang)}</Button>
        </Link>
        <Link href="/settings" style={{ textDecoration: 'none' }}>
          <Button variant="secondary" size="sm" icon={<Settings size={13} />}>{t('mine.footer_settings', lang)}</Button>
        </Link>
        <Button variant="secondary" size="sm" icon={theme === 'light' ? <Moon size={13} /> : <Sun size={13} />} onClick={toggle}>
          {theme === 'light' ? t('mine.footer_dark_mode', lang) : t('mine.footer_light_mode', lang)}
        </Button>
        {user?.role === 'admin' && (
          <Link href="/admin" style={{ textDecoration: 'none' }}>
            <Button variant="primary" tone="pink" size="sm" icon={<Shield size={13} />}>{t('mine.footer_admin', lang)}</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
