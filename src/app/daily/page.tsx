'use client'

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Loader2, Sparkles, Mic, FileText, LogIn, Flame, Bell, Settings, PenLine, X, Clock, Crown } from 'lucide-react';
import { shouldRemind, daysUntil } from '@/lib/membership-reminder';
import type { Tier } from '@/lib/membership-benefits';
import { useMapEntryHidden } from '@/lib/mapEntryPref';
import { useAuth } from '@/components/AuthProvider';
import UserAvatar from '@/components/UserAvatar';
import MembershipBadge from '@/components/MembershipBadge';
import { useFeedback } from '@/hooks/useFeedback';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { announcementReadKey } from '@/lib/announcement-read';
import { getProfile } from '@/lib/gamification';
import Onboarding from '@/components/Onboarding';
import { DailyShell } from '@/components/DailyShell';
import { DesktopDailyPage } from '@/components/desktop/DesktopDailyPage';
import { Section, Card, Button, Modal, EntryCard } from '@/components/ui';
import { HeroFourCards, type HeroProgressData } from '@/components/today/HeroFourCards';
import { getVocabProgress, getDiaryProgress, getPhoneticProgress, getGrammarProgress } from '@/lib/progress/dailyHero';
import { useIsDesktop } from '@/lib/useIsMobile';
import '../learning/learning-visual.css';

export default function DailyPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { click: feedbackClick } = useFeedback();
  const { lang } = useLang();
  const [mapEntryHidden, setMapEntryHidden] = useMapEntryHidden();
  const [planLoading, setPlanLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const [streak, setStreak] = useState(0);
  const isDesktop = useIsDesktop();
  const [unreadMsg, setUnreadMsg] = useState<{ title: string; content: string; id: string } | null>(null);
  const dismissedMsgIdsRef = useRef<Set<string>>(new Set());
  const [heroData, setHeroData] = useState<HeroProgressData | null>(null);
  const [memExpiry, setMemExpiry] = useState<number | null>(null);
  const [memTier, setMemTier] = useState<Tier>('free');
  const [memDismissed, setMemDismissed] = useState(false);

  const loadGenRef = useRef(0);
  const userRef = useRef(user);
  useEffect(() => { userRef.current = user; }, [user]);

  const load = useCallback(async () => {
    const gen = ++loadGenRef.current;
    try {
      setPlanLoading(true);
      const currentUser = userRef.current;
      const profile = await getProfile().catch(() => null);
      if (gen !== loadGenRef.current) return;
      if (profile) setStreak(profile.streak ?? 0);
      if (currentUser && !currentUser.onboardingCompleted) setShowOnboarding(true);
    } catch {
      if (gen !== loadGenRef.current) return;
    } finally {
      if (gen === loadGenRef.current) {
        setOnboardingChecked(true);
        setPlanLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isDesktop) return;
    load();
    const onVisible = () => { if (document.visibilityState === 'visible') load(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [isDesktop, load]);

  const prevUserRef = useRef<typeof user>(undefined);
  useEffect(() => {
    if (prevUserRef.current === undefined) { prevUserRef.current = user; return; }
    if (prevUserRef.current?.id !== user?.id) {
      prevUserRef.current = user;
      dismissedMsgIdsRef.current.clear();
      load();
    }
  }, [user, load]);

  useEffect(() => {
    if (isDesktop) return;
    if (!user) return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    fetch('/api/announcements', { signal: controller.signal })
      .then(r => (r.ok ? r.json() : null))
      .then(data => {
        if (!data) return;
        const msgs: Array<{ id: string; read: boolean; type: string; title: string; content: string }> = Array.isArray(data) ? data : [];
        // 只处理 private_message 私信；popup 类型交给 PopupAnnouncement 组件统一弹，
        // 避免"daily 首屏 Modal + AppShell PopupAnnouncement"同时弹两个公告
        const unread = msgs.find(m => {
          if (m.read) return false;
          if (m.type !== 'private_message') return false;
          if (dismissedMsgIdsRef.current.has(m.id)) return false;
          try { return localStorage.getItem(announcementReadKey(user.id, m.id)) !== '1'; }
          catch { return true; }
        });
        if (unread) setUnreadMsg({ title: unread.title, content: unread.content, id: unread.id });
      })
      .catch(() => {})
      .finally(() => clearTimeout(timer));
    return () => controller.abort();
  }, [user, isDesktop]);

  // 会员到期提醒（reveal-at-read）：登录用户拉当前档位/到期
  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();
    fetch('/api/membership/me', { signal: controller.signal, cache: 'no-store' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => {
        if (d) {
          setMemTier(d.tier ?? 'free');
          setMemExpiry(typeof d.expiry === 'number' ? d.expiry : null);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, [user]);

  // 4 张大卡进度数据
  useEffect(() => {
    if (isDesktop) return;
    if (!user) return;
    let gen = 0;
    const refresh = async () => {
      const cur = ++gen;
      try {
        const [vocab, diary, phonetic, grammar] = await Promise.all([
          getVocabProgress(),
          getDiaryProgress(user.id),
          getPhoneticProgress(user.id),
          getGrammarProgress(user.id),
        ]);
        if (cur !== gen) return;
        const vocabHref = vocab.source && vocab.unitId
          ? `/vocabulary/${vocab.source}/${vocab.unitId}`
          : '/vocabulary';
        setHeroData({
          vocab: { mastered: vocab.mastered, total: vocab.total, lastUnitTitle: vocab.unitTitle, href: vocabHref },
          diary: { currentDay: diary.currentDay, total: diary.total, sceneImageUrl: diary.sceneImageUrl },
          phonetic: { completed: phonetic.completed, total: phonetic.total },
          grammar: { completed: grammar.completed, total: grammar.total },
        });
      } catch { /* heroData stays null, section hidden gracefully */ }
    };
    refresh();
    const onVisible = () => { if (document.visibilityState === 'visible') refresh(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { gen = -1; document.removeEventListener('visibilitychange', onVisible); };
  }, [user, isDesktop]);

  if (isDesktop) return <DesktopDailyPage />;

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  if (!onboardingChecked) {
    return (
      <div className="py-4 max-w-2xl md:max-w-none mx-auto">
        <HeroSection />
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin" color="var(--color-ink-3)" />
        </div>
      </div>
    );
  }

  if (planLoading && user) {
    return (
      <div className="py-4 max-w-2xl md:max-w-none mx-auto">
        <HeroSection />
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin" color="var(--color-ink-3)" />
        </div>
      </div>
    );
  }

  // 未登录访客：用同一套 UI，塞入演示 heroData；任何交互一律跳登录
  const isGuest = !user;
  const effectiveHeroData: HeroProgressData = heroData ?? {
    vocab:    { mastered: 0, total: 0, href: '/vocabulary' },
    diary:    { currentDay: 1, total: 30 },
    phonetic: { completed: 0, total: 40 },
    grammar:  { completed: 0, total: 273 },
  };

  const weekday = lang === 'en'
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['日', '一', '二', '三', '四', '五', '六'];
  const d = new Date();
  const dateStr = lang === 'en'
    ? `${d.toLocaleString('en', { month: 'short' })} ${d.getDate()}, ${weekday[d.getDay()]}`
    : `${d.getMonth() + 1}月${d.getDate()}日 星期${weekday[d.getDay()]}`;
  const displayName = user?.nickname || user?.username || (isGuest ? t('daily.guest', lang) : '');
  const heroTitle = isGuest
    ? t('daily.hero_title_guest', lang)
    : displayName
      ? t('daily.hero_title_named', lang, { name: displayName })
      : t('daily.hero_title_default', lang);
  const streakText = streak >= 2 ? `🔥 ${t('daily.streak_text', lang, { n: String(streak) })}` : null;
  const heroDesc = isGuest
    ? `${dateStr} · ${t('daily.hero_desc_guest', lang)}`
    : `${dateStr}${streakText ? ` · ${streakText}` : ''}`;

  const dismissMsg = () => {
    const msg = unreadMsg;
    // 先本地打标 + 会话内 ref 双保险，避免 useEffect 重跑时把弹窗又弹一次
    if (msg) {
      dismissedMsgIdsRef.current.add(msg.id);
      if (user) {
        try { localStorage.setItem(announcementReadKey(user.id, msg.id), '1'); } catch { /* ignore */ }
      }
    }
    setUnreadMsg(null);
    if (msg && user) {
      fetch('/api/announcements/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ announcementId: msg.id }),
        keepalive: true,
      }).catch((e) => { console.error('Daily: markRead failed', e); });
    }
  };

  return (
    <>
      <Modal open={!!unreadMsg} onClose={dismissMsg} size="sm">
        {unreadMsg && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div
                style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-md)',
                  background: 'var(--color-pink-soft)', color: 'var(--color-pink-strong)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}
                aria-hidden
              >
                <Bell size={18} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-pink-strong)', margin: 0 }}>
                  {t('daily.message_notification_label', lang)}
                </p>
                <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-ink-1)', margin: '2px 0 0', lineHeight: 1.4 }}>
                  {unreadMsg.title}
                </p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--color-ink-2)', lineHeight: 1.7, marginBottom: 18, whiteSpace: 'pre-wrap' }}>
              {unreadMsg.content}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <Button
                  variant="primary"
                  tone="pink"
                  fullWidth
                  onClick={() => { dismissMsg(); router.push('/messages'); }}
                >
                  {t('daily.message_view_button', lang)}
                </Button>
              </div>
              <Button variant="secondary" fullWidth onClick={dismissMsg}>
                {t('daily.message_later_button', lang)}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <DailyShell
        main={
          <div className="learn-visual-root">
            <HeroSection />

            {/* 会员到期提醒（≤7 天，可关闭；试用用户不提示） */}
            {!memDismissed && shouldRemind(memTier, memExpiry) && !(memTier === 'monthly' && memExpiry != null && memExpiry - Date.now() <= 4 * 86400000) && (
              <div style={{
                marginTop: 16, padding: '12px 14px', borderRadius: 14,
                background: 'var(--color-pink-soft, #fff0f5)', border: '1px solid var(--color-pink-base)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <Clock size={18} style={{ color: 'var(--color-pink-base)', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: 'var(--color-ink-1)' }}>
                    {t('daily.membership_expiry', lang, { days: Math.max(0, daysUntil(memExpiry) ?? 0) })}
                  </p>
                  <p style={{ margin: '2px 0 0', fontSize: 11.5, color: 'var(--color-ink-3)' }}>{t('daily.renewal_subtitle', lang)}</p>
                </div>
                <button
                  onClick={() => router.push('/membership')}
                  style={{ flexShrink: 0, padding: '6px 14px', borderRadius: 999, background: 'var(--color-pink-base)', color: '#fff', border: 'none', fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}
                >
                  {t('daily.renew_cta', lang)}
                </button>
                <button onClick={() => setMemDismissed(true)} aria-label={t('ui.modal_close', lang)} style={{ flexShrink: 0, background: 'none', border: 'none', color: 'var(--color-ink-3)', cursor: 'pointer', padding: 2 }}>
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Greeting strip */}
            <Card className="learn-enter" variant="hero" tone="pink" padding="md" style={{ marginTop: 16, marginBottom: 20, '--i': 0 } as React.CSSProperties}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div
                  onClick={() => !isGuest && router.push('/mine')}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1, cursor: isGuest ? 'default' : 'pointer' }}
                >
                  <UserAvatar
                    avatarUrl={user?.avatarUrl}
                    name={displayName}
                    size={40}
                  />
                  <div style={{ minWidth: 0, flex: 1 }}>
                    {isGuest ? (
                      <>
                        <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {heroTitle}
                        </p>
                        <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '4px 0 0' }}>
                          {heroDesc}
                        </p>
                      </>
                    ) : (
                      <>
                        {displayName && (
                          <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {displayName}
                          </p>
                        )}
                        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-ink-2)', margin: displayName ? '2px 0 0' : 0 }}>
                          {t('daily.hero_title_default', lang)}
                        </p>
                        <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '4px 0 0' }}>
                          {dateStr}
                        </p>
                        {streakText && (
                          <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                            {streakText}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {isGuest ? (
                    <Button
                      variant="primary"
                      tone="pink"
                      size="sm"
                      icon={<LogIn size={13} />}
                      onClick={() => router.push('/auth/login?redirect=/daily')}
                    >
                      {t('shell.login', lang)}
                    </Button>
                  ) : (
                    <>
                      <MembershipBadge tier={memTier} size="sm" />
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={<Settings size={13} />}
                        onClick={() => router.push('/settings')}
                      >
                        {t('daily.settings_button', lang)}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>

            {/* 动物城地图入口（可隐藏，隐藏后在设置里重新打开） */}
            {!mapEntryHidden && (
            <div className="learn-enter" style={{ '--i': 0, position: 'relative', marginBottom: 16 } as React.CSSProperties}>
              <Link
                href="/map"
                style={{
                  display: 'block',
                  padding: '13px 40px 13px 16px',
                  background: 'linear-gradient(105deg, oklch(96% 0.04 60), oklch(95% 0.045 350))',
                  border: '1.5px solid oklch(88% 0.06 340)',
                  borderRadius: 'var(--radius-lg)',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(150, 120, 160, 0.10)',
                }}
              >
                <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
                  {t('map.entry_title', lang)}
                </p>
                <p style={{ fontSize: 12.5, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                  {t('map.entry_sub', lang)}
                </p>
              </Link>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMapEntryHidden(true); }}
                aria-label={t('map.entry_hide', lang)}
                title={t('map.entry_hide', lang)}
                style={{
                  position: 'absolute', top: 8, right: 8,
                  display: 'grid', placeItems: 'center',
                  width: 26, height: 26, padding: 0,
                  background: 'transparent', border: 'none', borderRadius: 8,
                  color: 'var(--color-ink-3)', cursor: 'pointer',
                }}
              >
                <X size={15} />
              </button>
            </div>
            )}

            {/* 4 张大卡：词汇 / 日记 / 字母 / 语法（带回归进度） */}
            <div className="learn-enter" style={{ '--i': 1 } as React.CSSProperties}>
              <HeroFourCards data={effectiveHeroData} layout="mobile" guestRedirect={isGuest ? '/auth/login?redirect=/daily' : undefined} />
            </div>

            {/* 我的资料快捷 — 未登录时隐藏（这些是私人数据入口） */}
            {!isGuest && (
            <Section title={t('daily.mine_section_title', lang)} spacing="normal">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {/* 会员入口：横向大卡占满整行，文案随档位变化 */}
                <div style={{ gridColumn: '1 / -1' }}>
                  {(() => {
                    const mem = memTier === 'free'
                      ? { label: t('daily.mem_upgrade_label', lang), detail: t('daily.mem_upgrade_detail', lang), cta: t('daily.mem_upgrade_cta', lang), tone: 'gold' as const }
                      : memTier === 'lifetime'
                        ? { label: t('daily.mem_center_label', lang), detail: t('daily.mem_lifetime_detail', lang), cta: t('daily.mem_view_cta', lang), tone: 'purple' as const }
                        : { label: t('daily.mem_center_label', lang), detail: t('daily.mem_renew_detail', lang), cta: t('daily.mem_manage_cta', lang), tone: memTier === 'yearly' ? 'gold' as const : 'pink' as const };
                    return (
                      <EntryCard
                        href="/mine/membership"
                        icon={<Crown size={20} />}
                        label={mem.label}
                        detail={mem.detail}
                        cta={mem.cta}
                        tone={mem.tone}
                        layout="row"
                      />
                    );
                  })()}
                </div>
                {([
                  { Icon: PenLine,  label: t('daily.mini_card_mistakes_label', lang),     detail: t('daily.mini_card_mistakes_detail', lang),     href: '/mine/mistakes', tone: 'pink' as const },
                  { Icon: Mic,      label: t('daily.mini_card_recordings_label', lang),   detail: t('daily.mini_card_recordings_detail', lang),   href: '/mine/recordings',         tone: 'pink' as const },
                  { Icon: Sparkles, label: t('daily.mini_card_achievements_label', lang), detail: t('daily.mini_card_achievements_detail', lang), href: '/achievement',             tone: 'peach' as const },
                  { Icon: FileText, label: t('daily.mini_card_messages_label', lang),     detail: t('daily.mini_card_messages_detail', lang),     href: '/messages',                tone: 'mint' as const },
                ]).map(({ Icon, label, detail, href, tone }) => (
                  <EntryCard
                    key={href}
                    href={href}
                    icon={<Icon size={18} />}
                    label={label}
                    detail={detail}
                    tone={tone}
                    layout="block"
                  />
                ))}
              </div>
            </Section>
            )}

            {/* 未登录：底部大 CTA 引导注册 */}
            {isGuest && (
              <Card variant="hero" tone="pink" padding="lg" style={{ marginTop: 20, textAlign: 'center' }}>
                <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-ink-1)', margin: '0 0 6px' }}>
                  {t('daily.guest_cta_title', lang)}
                </p>
                <p style={{ fontSize: 12.5, color: 'var(--color-ink-3)', margin: '0 0 14px' }}>
                  {t('daily.guest_cta_desc', lang)}
                </p>
                <Link href="/auth/login?redirect=/daily" style={{ textDecoration: 'none' }}>
                  <Button variant="primary" tone="pink" size="md" icon={<LogIn size={14} />}>
                    {t('shell.login', lang)}
                  </Button>
                </Link>
              </Card>
            )}

            {user?.role === 'admin' && (
              <Link href="/admin" style={{ textDecoration: 'none' }}>
                <Button variant="ghost" fullWidth size="sm">
                  ⚙ {t('daily.admin_button', lang)}
                </Button>
              </Link>
            )}
          </div>
        }
        aside={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 16 }}>
            <Link href={isGuest ? '/auth/login?redirect=/daily' : '/diary'} style={{ textDecoration: 'none' }}>
              <Card variant="hero" tone="pink" padding="md" interactive>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Flame size={22} color="var(--color-pink-strong)" />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
                      {t('daily.aside_continue_title', lang)}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                      {t('daily.aside_continue_subtitle', lang)}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        }
      />
    </>
  );
}

function HeroSection() {
  const { lang } = useLang();
  return (
    <div
      style={{
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border-1)',
      }}
    >
      <Image
        src="/images/tori-hero-daily.webp"
        alt={t('daily.hero_image_alt', lang)}
        width={800}
        height={400}
        priority
        style={{ width: '100%', display: 'block', height: 'auto' }}
      />
    </div>
  );
}

