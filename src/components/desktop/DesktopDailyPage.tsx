'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PenLine, Mic, Trophy, MessageSquare, ChevronRight, X, Clock, Crown } from 'lucide-react';
import { shouldRemind, daysUntil } from '@/lib/membership-reminder';
import type { Tier } from '@/lib/membership-benefits';
import { useMapEntryHidden } from '@/lib/mapEntryPref';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { Section, Card } from '@/components/ui';
import { HeroFourCards, type HeroProgressData } from '@/components/today/HeroFourCards';
import { getVocabProgress, getDiaryProgress, getPhoneticProgress, getGrammarProgress } from '@/lib/progress/dailyHero';
import { getProfile } from '@/lib/gamification';
import { FloatingDecorations } from '@/components/FloatingDecorations';
import Onboarding from '@/components/Onboarding';
import MembershipBadge from '@/components/MembershipBadge';
import '@/app/learning/learning-visual.css';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const TONE_BG: Record<'pink' | 'mint' | 'peach' | 'purple' | 'gold', string> = {
  pink: 'var(--color-pink-soft)', mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)', purple: 'var(--color-purple-soft)',
  gold: 'var(--color-gold-soft)',
};
const TONE_FG: Record<'pink' | 'mint' | 'peach' | 'purple' | 'gold', string> = {
  pink: 'var(--color-pink-strong)', mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)', purple: 'var(--color-purple-strong)',
  gold: 'var(--color-gold-strong)',
};

const MINE = [
  { Icon: PenLine,        labelKey: 'daily.mini_card_mistakes_label',     descKey: 'daily.mini_card_mistakes_detail',     href: '/mine/mistakes',   tone: 'pink' as const },
  { Icon: Mic,            labelKey: 'daily.mini_card_recordings_label',   descKey: 'daily.mini_card_recordings_detail',   href: '/mine/recordings', tone: 'pink' as const },
  { Icon: Trophy,         labelKey: 'daily.mini_card_achievements_label', descKey: 'daily.mini_card_achievements_detail', href: '/achievement',     tone: 'peach' as const },
  { Icon: MessageSquare,  labelKey: 'daily.mini_card_messages_label',     descKey: 'daily.mini_card_messages_detail',     href: '/messages',        tone: 'mint' as const },
];

export function DesktopDailyPage() {
  const { lang } = useLang();
  const router = useRouter();
  const { user } = useAuth();
  const [mapEntryHidden, setMapEntryHidden] = useMapEntryHidden();
  const [stats, setStats] = useState({ words: 0 });
  const [streak, setStreak] = useState(0);
  const [heroData, setHeroData] = useState<HeroProgressData | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [greeting, setGreeting] = useState<{ ko: string; zh: string } | null>(null);
  const [memTier, setMemTier] = useState<Tier>('free');
  const [memExpiry, setMemExpiry] = useState<number | null>(null);
  const [memDismissed, setMemDismissed] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(
      h < 5 || h >= 18
        ? { ko: '좋은 저녁이에요', zh: t('daily.greeting_evening', lang) }
        : h < 12
        ? { ko: '좋은 아침이에요', zh: t('daily.greeting_morning', lang) }
        : { ko: '좋은 오후예요', zh: t('daily.greeting_afternoon', lang) },
    );
  }, [lang]);

  useEffect(() => {
    (async () => {
      try {
        const words = await db.words.count();
        setStats({ words });
        const profile = await getProfile();
        setStreak(profile.streak);
        if (user && !user.onboardingCompleted) setShowOnboarding(true);
      } catch { /* ignore */ }
    })();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      const [vocab, diary, phonetic, grammar] = await Promise.all([
        getVocabProgress(),
        getDiaryProgress(user.id),
        getPhoneticProgress(user.id),
        getGrammarProgress(user.id),
      ]);
      if (cancelled) return;
      const vocabHref = vocab.source && vocab.unitId
        ? `/vocabulary/${vocab.source}/${vocab.unitId}`
        : '/vocabulary';
      setHeroData({
        vocab: { mastered: vocab.mastered, total: vocab.total, lastUnitTitle: vocab.unitTitle, href: vocabHref },
        diary: { currentDay: diary.currentDay, total: diary.total, sceneImageUrl: diary.sceneImageUrl },
        phonetic: { completed: phonetic.completed, total: phonetic.total },
        grammar: { completed: grammar.completed, total: grammar.total },
      });
    })();
    return () => { cancelled = true; };
  }, [user]);

  // 会员到期提醒（reveal-at-read）：登录用户拉当前档位/到期
  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();
    fetch('/api/membership/me', { signal: controller.signal, cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (d) { setMemTier(d.tier ?? 'free'); setMemExpiry(typeof d.expiry === 'number' ? d.expiry : null); } })
      .catch(() => {});
    return () => controller.abort();
  }, [user]);

  const isGuest = !user;
  const displayName = user?.nickname ?? (isGuest ? t('daily.guest', lang) : t('daily.classmate', lang));
  // 游客用演示数据渲染 4 张卡（否则整块空白），卡片一律跳登录
  const effectiveHeroData: HeroProgressData = heroData ?? {
    vocab:    { mastered: 0, total: 0, href: '/vocabulary' },
    diary:    { currentDay: 1, total: 30 },
    phonetic: { completed: 0, total: 40 },
    grammar:  { completed: 0, total: 273 },
  };

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="learn-visual-root">
      <FloatingDecorations />
      {/* Hero：左问候卡 + 右 banner 卡，两个独立容器 */}
      <header
        className="learn-enter"
        style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 20,
          marginBottom: 24,
          '--i': 0,
        } as React.CSSProperties}
      >
        <div
          style={{
            flex: 1,
            minWidth: 0,
            padding: 'clamp(36px, 3.6vw, 52px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 28,
            background: 'linear-gradient(135deg, color-mix(in oklch, var(--color-pink-soft) 55%, var(--color-surface-2)), var(--color-surface-2))',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-pink-strong)', letterSpacing: '0.04em', margin: '0 0 18px' }}>
            {greeting?.ko ?? ' '}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 'clamp(36px, 3.4vw, 48px)', fontWeight: 800, color: 'var(--color-ink-1)', margin: 0, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              {t('daily.greeting_compose', lang, { greeting: greeting?.zh ?? t('daily.greeting_fallback', lang), name: displayName })}
            </h1>
            {user && <MembershipBadge tier={memTier} />}
          </div>
          {streak > 0 && (
            <p style={{ fontSize: 15, color: 'var(--color-ink-2)', margin: '22px 0 0', lineHeight: 1.8, fontVariantNumeric: 'tabular-nums' }}
              dangerouslySetInnerHTML={{ __html: t('daily.streak_congrats', lang, { streak }) }} />
          )}
          </div>

          {heroData && heroData.diary.currentDay > 0 ? (
            <div style={{ fontVariantNumeric: 'tabular-nums' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-ink-2)' }}>{'일기 여정 · '}{t('daily.diary_label', lang)}</span>
                <span style={{ fontSize: 15, color: 'var(--color-ink-3)' }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-ink-1)' }}>Day {heroData.diary.currentDay}</span>
                  <span style={{ opacity: 0.55 }}> / {heroData.diary.total}</span>
                </span>
              </div>
              <div style={{ height: 8, borderRadius: 999, background: 'color-mix(in oklch, var(--color-pink-strong) 16%, transparent)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(100, Math.round(((heroData.diary.currentDay - 1) / heroData.diary.total) * 100))}%`,
                  borderRadius: 999,
                  background: 'linear-gradient(90deg, var(--color-pink-strong), color-mix(in oklch, var(--color-pink-strong) 70%, var(--color-peach-strong)))',
                }} />
              </div>
            </div>
          ) : (
            <p style={{ fontSize: 15, color: 'var(--color-ink-3)', margin: 0, lineHeight: 1.6 }}>
              {t('daily.diary_empty', lang)}
            </p>
          )}
        </div>
        <div
          style={{
            flex: '0 0 46%',
            minWidth: 0,
            aspectRatio: '1400 / 788',
            alignSelf: 'flex-start',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            border: '1px solid var(--color-border-1)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <Image
            src="/images/tori-hero-daily-desktop.png"
            alt={t('daily.diary_alt', lang)}
            width={1400}
            height={788}
            priority
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </header>

      {/* 会员到期提醒（≤7 天，可关闭） */}
      {!memDismissed && shouldRemind(memTier, memExpiry) && (
        <div className="learn-enter" style={{
          '--i': 0.4, display: 'flex', alignItems: 'center', gap: 12,
          margin: '0 0 20px', padding: '14px 20px', borderRadius: 'var(--radius-lg)',
          background: 'var(--color-pink-soft)', border: '1px solid var(--color-pink-base)',
        } as React.CSSProperties}>
          <Clock size={20} style={{ color: 'var(--color-pink-base)', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--color-ink-1)' }}>
              {t('daily.membership_expiry', lang, { days: Math.max(0, daysUntil(memExpiry) ?? 0) })}
            </p>
            <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--color-ink-3)' }}>{t('daily.renewal_prompt', lang)}</p>
          </div>
          <button
            onClick={() => router.push('/membership')}
            style={{ flexShrink: 0, padding: '8px 18px', borderRadius: 999, background: 'var(--color-pink-base)', color: '#fff', border: 'none', fontSize: 13.5, fontWeight: 700, cursor: 'pointer' }}
          >
            {t('daily.renew_cta', lang)}
          </button>
          <button onClick={() => setMemDismissed(true)} aria-label={t('ui.modal_close', lang)} style={{ flexShrink: 0, background: 'none', border: 'none', color: 'var(--color-ink-3)', cursor: 'pointer', padding: 4 }}>
            <X size={18} />
          </button>
        </div>
      )}

      {/* 使用教程入口（新手第一眼，可隐藏，隐藏后在设置里重新打开） */}
      {!mapEntryHidden && (
      <div className="learn-enter" style={{ '--i': 0.5, position: 'relative', margin: '0 0 20px' } as React.CSSProperties}>
      <Link
        href="/map"
        style={{
          '--i': 0.5,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '16px 48px 16px 20px',
          margin: 0,
          background: 'linear-gradient(100deg, oklch(96.5% 0.045 55), oklch(95.5% 0.05 345))',
          border: '2px dashed oklch(82% 0.08 45)',
          borderRadius: 'var(--radius-lg)',
          textDecoration: 'none',
          boxShadow: '0 6px 20px oklch(70% 0.06 40 / 0.14)',
          overflow: 'hidden',
        } as React.CSSProperties}
      >
        <Image
          src="/images/map/tori-map.png"
          alt=""
          width={72}
          height={72}
          style={{ width: 64, height: 64, objectFit: 'contain', flexShrink: 0, filter: 'drop-shadow(0 4px 8px oklch(60% 0.06 40 / 0.2))' }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-caveat, Caveat), cursive', fontSize: 15, fontWeight: 700, color: 'oklch(58% 0.14 30)', margin: '0 0 2px' }}>
            {t('map.entry_kicker', lang)}
          </p>
          <p style={{ fontFamily: 'var(--font-fraunces, Fraunces), serif', fontSize: 19, fontWeight: 600, color: 'var(--color-ink-1)', margin: 0, lineHeight: 1.2 }}>
            {t('map.entry_title', lang)}
          </p>
          <p style={{ fontSize: 13, color: 'var(--color-ink-2)', margin: '3px 0 0' }}>
            {t('map.entry_sub', lang)}
          </p>
        </div>
        <ChevronRight size={22} color="oklch(62% 0.12 40)" style={{ flexShrink: 0 }} />
      </Link>
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMapEntryHidden(true); }}
          aria-label={t('map.entry_hide', lang)}
          title={t('map.entry_hide', lang)}
          style={{
            position: 'absolute', top: 12, right: 12,
            display: 'grid', placeItems: 'center',
            width: 30, height: 30, padding: 0,
            background: 'transparent', border: 'none', borderRadius: 8,
            color: 'var(--color-ink-3)', cursor: 'pointer',
          }}
        >
          <X size={17} />
        </button>
      </div>
      )}

      {/* Stats — 平板 2 列，桌面 3 列 */}
      <div className="learn-enter grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6" style={{ '--i': 1 } as React.CSSProperties}>
        {[
          { value: stats.words,               label: t('daily.stat_saved_words', lang) },
          { value: streak,                    label: t('daily.stat_streak', lang) },
          { value: heroData?.vocab.mastered,  label: t('daily.stat_mastered_words', lang) },
        ].map((s) => (
          <Card key={s.label} variant="stat" tone="neutral" padding="md">
            <p style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0, lineHeight: 1 }}>
              {s.value || '—'}
            </p>
            <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '6px 0 0' }}>{s.label}</p>
          </Card>
        ))}
      </div>

      {/* 4 张大卡：1 + 3 不对称（日记占大格）。游客用演示数据 + 卡片跳登录 */}
      <div className="learn-enter" style={{ '--i': 2 } as React.CSSProperties}>
        <HeroFourCards data={effectiveHeroData} layout="desktop" guestRedirect={isGuest ? '/auth/login?redirect=/daily' : undefined} />
      </div>

      {/* 未登录：底部大 CTA 引导注册 */}
      {isGuest && (
        <Card variant="hero" tone="pink" padding="lg" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: '0 0 6px' }}>
            {t('daily.guest_cta_title_desktop', lang)}
          </p>
          <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '0 0 16px' }}>
            {t('daily.guest_cta_desc', lang)}
          </p>
          <button
            onClick={() => router.push('/auth/login?redirect=/daily')}
            style={{ padding: '10px 28px', borderRadius: 999, background: 'var(--color-pink-base)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            {t('shell.login', lang)}
          </button>
        </Card>
      )}

      {/* 我的（游客隐藏） */}
      {!isGuest && (
      <Section title={t('daily.section_mine', lang)} spacing="normal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {/* 会员入口：横向大卡占满整行，文案随档位变化 */}
          {(() => {
            const mem = memTier === 'free'
              ? { label: t('daily.mem_upgrade_label', lang), desc: t('daily.mem_upgrade_detail', lang), cta: t('daily.mem_upgrade_cta', lang), tone: 'gold' as const }
              : memTier === 'lifetime'
                ? { label: t('daily.mem_center_label', lang), desc: t('daily.mem_lifetime_detail', lang), cta: t('daily.mem_view_cta', lang), tone: 'purple' as const }
                : { label: t('daily.mem_center_label', lang), desc: t('daily.mem_renew_detail', lang), cta: t('daily.mem_manage_cta', lang), tone: memTier === 'yearly' ? 'gold' as const : 'pink' as const };
            return (
              <div style={{ gridColumn: '1 / -1' }}>
                <Card as="button" onClick={() => router.push('/mine/membership')} variant="default" padding="md" interactive>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%' }}>
                    <div
                      style={{
                        width: 48, height: 48, borderRadius: 'var(--radius-md)',
                        background: TONE_BG[mem.tone], color: TONE_FG[mem.tone],
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}
                      aria-hidden
                    >
                      <Crown size={24} strokeWidth={1.75} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                      <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>{mem.label}</p>
                      <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '3px 0 0', lineHeight: 1.5 }}>{mem.desc}</p>
                    </div>
                    <span style={{
                      fontSize: 13, fontWeight: 700, color: TONE_FG[mem.tone], background: TONE_BG[mem.tone],
                      padding: '7px 16px', borderRadius: 'var(--radius-pill)', flexShrink: 0,
                    }}>{mem.cta}</span>
                  </div>
                </Card>
              </div>
            );
          })()}
          {MINE.map(({ Icon, labelKey, descKey, href, tone }) => (
            <Card key={href} as="button" onClick={() => router.push(href)} variant="default" padding="md" interactive>
              <div
                style={{
                  width: 44, height: 44, borderRadius: 'var(--radius-md)',
                  background: TONE_BG[tone], color: TONE_FG[tone],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 12,
                }}
                aria-hidden
              >
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>{t(labelKey, lang)}</p>
              <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '4px 0 0', lineHeight: 1.5 }}>{t(descKey, lang)}</p>
            </Card>
          ))}
        </div>
      </Section>
      )}
    </div>
  );
}
