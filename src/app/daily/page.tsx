'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, Sparkles, BookOpen, Mic, BookMarked, Edit3, Target, GraduationCap, RefreshCw, FileText, LogIn, Flame, Bell, X, Settings, ChevronRight, PenLine } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useFeedback } from '@/hooks/useFeedback';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { buildDailyPlanFromApi, type DailyPlan } from '@/lib/daily/buildDailyPlan';
import { getProfile } from '@/lib/gamification';
import Onboarding from '@/components/Onboarding';
import { DailyShell } from '@/components/DailyShell';
import { DesktopDailyPage } from '@/components/desktop/DesktopDailyPage';
import { PageHeader, Section, Card, Button, Modal, EntryCard } from '@/components/ui';

const TASK_ICONS: Record<string, React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>> = {
  course: GraduationCap,
  srsReview: BookOpen,
  pronunciation: Mic,
  reading: BookMarked,
  output: Edit3,
};

const TASK_TONE: Record<string, 'pink' | 'mint' | 'peach' | 'purple'> = {
  course: 'purple',
  srsReview: 'peach',
  pronunciation: 'pink',
  reading: 'mint',
  output: 'peach',
};

const TONE_BG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-soft)', mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)', purple: 'var(--color-purple-soft)',
};
const TONE_FG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-strong)', mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)', purple: 'var(--color-purple-strong)',
};

export default function DailyPage() {
  const { user } = useAuth();
  const { click: feedbackClick } = useFeedback();
  const { lang } = useLang();
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [planLoading, setPlanLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 768
  );
  const [unreadMsg, setUnreadMsg] = useState<{ title: string; content: string; id: string } | null>(null);

  const loadGenRef = useRef(0);
  const userRef = useRef(user);
  useEffect(() => { userRef.current = user; }, [user]);

  const load = useCallback(async () => {
    const gen = ++loadGenRef.current;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    try {
      setPlanLoading(true);
      const currentUser = userRef.current;
      const [p, profile] = await Promise.all([
        buildDailyPlanFromApi().catch(() => null),
        getProfile().catch(() => null),
      ]);
      if (gen !== loadGenRef.current) return;
      setPlan(p);
      if (profile) setStreak(profile.streak ?? 0);
      if (currentUser && !currentUser.onboardingCompleted) {
        if (profile && !profile.onboardingComplete) setShowOnboarding(true);
      }
      setOnboardingChecked(true);
    } catch {
      if (gen !== loadGenRef.current) return;
      setOnboardingChecked(true);
    } finally {
      clearTimeout(timeoutId);
      controller.abort();
      if (gen === loadGenRef.current) setPlanLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const onVisible = () => { if (document.visibilityState === 'visible') load(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevUserRef = useRef<typeof user>(undefined);
  useEffect(() => {
    if (prevUserRef.current === undefined) { prevUserRef.current = user; return; }
    if (prevUserRef.current?.id !== user?.id) {
      prevUserRef.current = user;
      load();
    }
  }, [user, load]);

  useEffect(() => {
    if (!user) return;
    const dismissed = sessionStorage.getItem('msg_dismissed');
    if (dismissed) return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    fetch('/api/announcements', { signal: controller.signal })
      .then(r => r.json())
      .then(data => {
        const msgs: Array<{ id: string; read: boolean; type: string; title: string; content: string }> = data.announcements || [];
        const unread = msgs.find(m => !m.read && m.type === 'private_message');
        if (unread) setUnreadMsg({ title: unread.title, content: unread.content, id: unread.id });
      })
      .catch(() => {})
      .finally(() => clearTimeout(timer));
    return () => controller.abort();
  }, [user]);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isDesktop) return <DesktopDailyPage />;

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  if (!onboardingChecked) {
    return (
      <div className="py-4 max-w-2xl mx-auto">
        <HeroSection />
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin" color="var(--color-ink-3)" />
        </div>
      </div>
    );
  }

  if (!user) return <GuestDaily />;

  if (planLoading) {
    return (
      <div className="py-4 max-w-2xl mx-auto">
        <HeroSection />
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin" color="var(--color-ink-3)" />
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="py-4 max-w-2xl mx-auto">
        <HeroSection />
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p style={{ fontSize: 14, color: 'var(--color-ink-3)' }}>{t('daily.load_error', lang)}</p>
          <Button variant="primary" tone="pink" size="md" onClick={() => window.location.reload()}>
            {t('common.retry', lang)}
          </Button>
        </div>
      </div>
    );
  }

  const weekday = lang === 'en'
    ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    : ['日', '一', '二', '三', '四', '五', '六'];
  const d = new Date();
  const dateStr = lang === 'en'
    ? `${d.toLocaleString('en', { month: 'short' })} ${d.getDate()}, ${weekday[d.getDay()]}`
    : `${d.getMonth() + 1}月${d.getDate()}日 星期${weekday[d.getDay()]}`;
  const progressPercent = plan.totalCount > 0 ? Math.round((plan.completedCount / plan.totalCount) * 100) : 0;
  const activeTasks = plan.tasks.filter(task => task.key !== 'course' && !task.done);
  const displayName = user?.nickname || user?.username || '';
  const heroTitle = displayName
    ? t('daily.hero_title_named', lang).replace('{name}', displayName)
    : t('daily.hero_title_default', lang);
  const streakText = streak >= 2 ? `🔥 ${t('daily.streak_text', lang).replace('{n}', String(streak))}` : null;
  const heroDesc = plan.allDone
    ? `${t('daily.all_done_prefix', lang)}${streakText ? ` ${streakText}` : ` ${t('daily.all_done_great', lang)}`}`
    : plan.course
      ? `Day ${plan.courseDay} · ${dateStr}${streakText ? ` · ${streakText}` : ''}`
      : `${dateStr}${streakText ? ` · ${streakText}` : ''}`;

  const quickTools = [
    { label: t('daily.quick_tool_analyze', lang),   href: '/ai/analyze', Icon: Sparkles,  tone: 'pink'   as const },
    { label: t('daily.quick_tool_vocab', lang),     href: '/dictionary', Icon: BookOpen,  tone: 'purple' as const },
    { label: t('daily.quick_tool_dictation', lang), href: '/dictation',  Icon: Edit3,     tone: 'peach'  as const },
    { label: t('daily.quick_tool_flashcard', lang), href: '/review',    Icon: RefreshCw,  tone: 'mint'   as const },
  ];

  const dismissMsg = () => {
    setUnreadMsg(null);
    sessionStorage.setItem('msg_dismissed', '1');
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
                <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-ink-1)', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {unreadMsg.title}
                </p>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'var(--color-ink-2)', lineHeight: 1.6, marginBottom: 18 }}>
              {unreadMsg.content}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link href="/messages" onClick={dismissMsg} style={{ flex: 1, textDecoration: 'none' }}>
                <Button variant="primary" tone="pink" fullWidth>
                  {t('daily.message_view_button', lang)}
                </Button>
              </Link>
              <Button variant="secondary" fullWidth onClick={dismissMsg}>
                {t('daily.message_later_button', lang)}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <DailyShell
        main={
          <div>
            <HeroSection />

            {/* Greeting strip */}
            <Card variant="hero" tone="pink" padding="md" style={{ marginTop: 16, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
                    {heroTitle}
                  </p>
                  <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '4px 0 0' }}>
                    {heroDesc}
                  </p>
                </div>
                <Link href="/settings" style={{ textDecoration: 'none', flexShrink: 0 }}>
                  <Button variant="secondary" size="sm" icon={<Settings size={13} />}>
                    {t('daily.settings_button', lang)}
                  </Button>
                </Link>
              </div>
            </Card>

            {plan.allDone && (
              <Card variant="hero" tone="mint" padding="md" style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 40, height: 40, borderRadius: 'var(--radius-md)',
                      background: 'var(--color-surface-2)', color: 'var(--color-mint-strong)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}
                    aria-hidden
                  >
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 800, color: 'var(--color-mint-strong)', margin: 0 }}>
                      {t('daily.all_done_title', lang)}
                    </p>
                    <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                      {t('daily.all_done_subtitle', lang)}
                    </p>
                  </div>
                </div>
                <Link href="/vocabulary/library" onClick={feedbackClick} style={{ textDecoration: 'none' }}>
                  <Button variant="secondary" fullWidth icon={<BookOpen size={14} />}>
                    {t('daily.browse_vocab_button', lang)}
                  </Button>
                </Link>
              </Card>
            )}

            {!plan.allDone && (
              <Section spacing="normal">
                <Card variant="hero" tone="purple" padding="lg" as="a" href="/vocabulary/library" interactive>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div
                      style={{
                        width: 44, height: 44, borderRadius: 'var(--radius-md)',
                        background: 'var(--color-surface-2)', color: 'var(--color-purple-strong)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}
                      aria-hidden
                    >
                      <BookOpen size={22} strokeWidth={1.75} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
                        {t('daily.vocab_library_label', lang)}
                      </p>
                      <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 12px' }}>
                        {t('daily.vocab_library_desc', lang)}
                      </p>
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-purple-strong)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {t('daily.vocab_library_action', lang)}
                        <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Card>
              </Section>
            )}

            {activeTasks.length > 0 && (
              <Section title={t('daily.tasks_section_title', lang)} spacing="normal">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {activeTasks.map((task) => {
                    const Icon = TASK_ICONS[task.key] || Target;
                    const tone = TASK_TONE[task.key] || 'peach';
                    return (
                      <EntryCard
                        key={task.key}
                        href={task.href}
                        onClick={feedbackClick}
                        icon={<Icon size={20} />}
                        label={task.label}
                        detail={task.detail}
                        tone={tone}
                        layout="row"
                        cta={t('daily.task_go_button', lang)}
                      />
                    );
                  })}
                </div>
              </Section>
            )}

            <Section title={t('daily.mine_section_title', lang)} spacing="normal">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {([
                  { Icon: PenLine,  label: t('daily.mini_card_mistakes_label', lang),     detail: t('daily.mini_card_mistakes_detail', lang),     href: '/mine/dictation-mistakes', tone: 'pink' as const },
                  { Icon: Mic,      label: t('daily.mini_card_recordings_label', lang),   detail: t('daily.mini_card_recordings_detail', lang),   href: '/mine/recordings',         tone: 'pink' as const },
                  { Icon: Sparkles, label: t('daily.mini_card_achievements_label', lang), detail: t('daily.mini_card_achievements_detail', lang), href: '/achievement/card',        tone: 'peach' as const },
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

            <Section title={t('daily.quick_tools_section_title', lang)} spacing="normal">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {quickTools.map(({ label, href, Icon, tone }) => (
                  <EntryCard
                    key={href}
                    href={href}
                    onClick={feedbackClick}
                    icon={<Icon size={18} />}
                    label={label}
                    tone={tone}
                    layout="compact"
                  />
                ))}
              </div>
            </Section>

            <Card variant="default" padding="md" style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--color-ink-3)' }}>{t('daily.progress_label', lang)}</span>
                <span style={{ fontSize: 12, color: 'var(--color-ink-3)' }}>
                  {plan.completedCount}/{plan.totalCount} {t('daily.progress_completed_suffix', lang)}
                </span>
              </div>
              <div style={{ width: '100%', height: 8, borderRadius: 'var(--radius-pill)', background: 'var(--color-surface-4)' }}>
                <div
                  style={{
                    height: 8, borderRadius: 'var(--radius-pill)',
                    background: 'linear-gradient(90deg, var(--color-purple-base), var(--color-pink-base))',
                    width: `${Math.max(4, progressPercent)}%`,
                    transition: 'width var(--dur-slow) var(--ease-soft)',
                  }}
                />
              </div>
            </Card>

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
            <Card variant="default" padding="md">
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-ink-1)', margin: '0 0 12px' }}>
                {t('daily.aside_progress_title', lang)}
              </p>
              <div style={{ width: '100%', height: 8, borderRadius: 'var(--radius-pill)', background: 'var(--color-surface-4)', marginBottom: 8 }}>
                <div
                  style={{
                    height: 8, borderRadius: 'var(--radius-pill)',
                    background: 'linear-gradient(90deg, var(--color-purple-base), var(--color-pink-base))',
                    width: `${Math.max(4, progressPercent)}%`,
                    transition: 'width var(--dur-slow) var(--ease-soft)',
                  }}
                />
              </div>
              <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: 0 }}>
                {plan.completedCount}/{plan.totalCount} {t('daily.aside_progress_completed_suffix', lang)}
              </p>
            </Card>

            <Card variant="default" padding="md">
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-ink-1)', margin: '0 0 12px' }}>
                {t('daily.aside_quick_tools_title', lang)}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {quickTools.map(({ label, href, Icon, tone }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={feedbackClick}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                      padding: 12, borderRadius: 'var(--radius-md)',
                      background: 'var(--color-surface-1)',
                      border: '1px solid var(--color-border-1)',
                      textDecoration: 'none',
                    }}
                  >
                    <Icon size={18} color={TONE_FG[tone]} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-ink-1)' }}>{label}</span>
                  </Link>
                ))}
              </div>
            </Card>

            <Card variant="hero" tone="pink" padding="md">
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

function GuestDaily() {
  const { lang } = useLang();
  return (
    <div className="py-4 max-w-2xl mx-auto">
      <HeroSection />

      <Section title={t('daily.guest_continue_title', lang)} action={{ label: t('daily.guest_last_progress_label', lang), href: '/review' }} spacing="normal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Card variant="default" padding="md" style={{ opacity: 0.4, cursor: 'not-allowed' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 60, height: 60, borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-ink-1)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 800, flexShrink: 0,
                }}
                aria-hidden
              >
                影
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                  {t('daily.guest_shadowing_title', lang)}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 0' }}>
                  {t('daily.guest_shadowing_subtitle', lang)}
                </p>
              </div>
            </div>
          </Card>

          <Card as="a" href="/review" variant="default" padding="md" interactive>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 60, height: 60, borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-pink-soft)', color: 'var(--color-pink-strong)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 800, flexShrink: 0,
                }}
                aria-hidden
              >
                复
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                  {t('daily.guest_review_title', lang)}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 0' }}>
                  {t('daily.guest_review_subtitle', lang)}
                </p>
              </div>
              <ChevronRight size={20} color="var(--color-ink-4)" />
            </div>
          </Card>
        </div>
      </Section>

      <Section title={t('daily.guest_quick_tools_title', lang)} spacing="normal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {([
            { labelKey: 'daily.guest_tool_analyze_label',   subKey: 'daily.guest_tool_analyze_sub',   href: '/ai/analyze', ch: '拆', tone: 'pink' as const },
            { labelKey: 'daily.guest_tool_dictation_label', subKey: 'daily.guest_tool_dictation_sub', href: '/dictation',  ch: '默', tone: 'mint' as const },
            { labelKey: 'daily.guest_tool_review_label',    subKey: 'daily.guest_tool_review_sub',    href: '/review',     ch: '卡', tone: 'purple' as const },
          ] as const).map((tool) => (
            <EntryCard
              key={tool.href}
              href={tool.href}
              icon={<span style={{ fontSize: 14, fontWeight: 800 }}>{tool.ch}</span>}
              label={t(tool.labelKey, lang)}
              detail={t(tool.subKey, lang)}
              tone={tool.tone}
              layout="block"
            />
          ))}
        </div>
      </Section>

      <Card variant="default" padding="lg" style={{ textAlign: 'center', marginTop: 20 }}>
        <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '0 0 14px' }}>
          {t('daily.guest_login_prompt', lang)}
        </p>
        <Link href="/auth/login?redirect=/daily" style={{ textDecoration: 'none' }}>
          <Button variant="primary" tone="pink" icon={<LogIn size={14} />}>
            {t('daily.guest_login_button', lang)}
          </Button>
        </Link>
      </Card>
    </div>
  );
}
