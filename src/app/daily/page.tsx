'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, Sparkles, BookOpen, Mic, BookMarked, Edit3, Target, GraduationCap, Music, RefreshCw, FileText, LogIn, Flame, Bell, X, Settings, ChevronRight, PenLine } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useFeedback } from '@/hooks/useFeedback';
import { buildDailyPlan, type DailyPlan } from '@/lib/daily/buildDailyPlan';
import { getAllSongProgress } from '@/lib/kpop/progress';
import { getProfile } from '@/lib/gamification';
import { getTrackById } from '@/data/kpopTracks';
import Onboarding from '@/components/Onboarding';
import { ToriHeroCard } from '@/components/mobile/ToriHeroCard';
import { ToriMiniCard } from '@/components/mobile/ToriMiniCard';
import { ToriCard } from '@/components/mobile/ToriCard';
import { ToriSectionHeader } from '@/components/mobile/ToriSectionHeader';
import { DailyShell } from '@/components/DailyShell';
import { DesktopDailyPage } from '@/components/desktop/DesktopDailyPage';
const TASK_ICONS: Record<string, React.ComponentType<any>> = {
  course: GraduationCap,
  srsReview: BookOpen,
  pronunciation: Mic,
  reading: BookMarked,
  output: Edit3,
};

const TASK_COLORS: Record<string, string> = {
  course: '#b49ccf',
  srsReview: '#e8a87c',
  pronunciation: '#e47a94',
  reading: '#81b5a1',
  output: '#d4a853',
};

export default function DailyPage() {
  const { user } = useAuth();
  const { click: feedbackClick } = useFeedback();
  const [plan, setPlan] = useState<DailyPlan | null>(null);
  const [planLoading, setPlanLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const [kpopProg, setKpopProg] = useState<{ songId: string; title: string; artist: string; practicedLines: number; totalLines: number } | null>(null);
  const [streak, setStreak] = useState(0);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.innerWidth >= 1024
  );
  const [unreadMsg, setUnreadMsg] = useState<{ title: string; content: string; id: string } | null>(null);

  const load = useCallback(async (currentUser: typeof user) => {
    let planTimer: ReturnType<typeof setTimeout> | null = null;
    try {
      setPlanLoading(true);
      let prog: { songId: string; practicedLines: number; totalLines: number }[] = [];
      try { prog = getAllSongProgress(); } catch { /* localStorage not available */ }
      const planTimeout = new Promise<null>((resolve) => { planTimer = setTimeout(() => resolve(null), 8000); });
      const profileTimeout = new Promise<null>((resolve) => { setTimeout(() => resolve(null), 8000); });
      const [p, profile] = await Promise.all([Promise.race([buildDailyPlan().catch(() => null), planTimeout]), Promise.race([getProfile().catch(() => null), profileTimeout])]);
      setPlan(p);
      if (profile) setStreak(profile.streak ?? 0);

      // Check onboarding using profile already fetched (avoids duplicate getProfile call)
      if (currentUser && !currentUser.onboardingCompleted) {
        if (profile && !profile.onboardingComplete) setShowOnboarding(true);
      }
      setOnboardingChecked(true);

      const active = prog.find((s) => s.practicedLines > 0 && s.practicedLines < s.totalLines);
      if (active) {
        const track = getTrackById(active.songId);
        setKpopProg({
          songId: active.songId,
          title: track?.title ?? active.songId,
          artist: track?.artist ?? '',
          practicedLines: active.practicedLines,
          totalLines: active.totalLines,
        });
      }
    } catch {
      setOnboardingChecked(true);
    } finally {
      if (planTimer) clearTimeout(planTimer);
      setPlanLoading(false);
    }
  }, []);

  // Start loading immediately on mount — don't wait for auth
  useEffect(() => {
    load(user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-load when user changes (login/logout)
  const prevUserRef = useRef<typeof user>(undefined);
  useEffect(() => {
    if (prevUserRef.current === undefined) { prevUserRef.current = user; return; }
    if (prevUserRef.current?.id !== user?.id) {
      prevUserRef.current = user;
      load(user);
    }
  }, [user, load]);

  // 拉取未读私信，有新消息弹窗提示一次
  useEffect(() => {
    if (!user) return;
    const dismissed = sessionStorage.getItem('msg_dismissed');
    if (dismissed) return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    fetch('/api/announcements', { signal: controller.signal })
      .then(r => r.json())
      .then(data => {
        const msgs: any[] = data.announcements || [];
        const unread = msgs.find(m => !m.read && m.type === 'private_message');
        if (unread) setUnreadMsg({ title: unread.title, content: unread.content, id: unread.id });
      })
      .catch(() => {})
      .finally(() => clearTimeout(timer));
    return () => controller.abort();
  }, [user]);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isDesktop) return <DesktopDailyPage />;

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  if (!onboardingChecked) {
    return (
      <div className="py-4 space-y-4 max-w-2xl mx-auto">
        <HeroSection />
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-[var(--text-muted)]" />
        </div>
      </div>
    );
  }

  if (!user) return <GuestDaily />;

  if (planLoading) {
    return (
      <div className="py-4 space-y-4 max-w-2xl mx-auto">
        <HeroSection />
        <div className="flex items-center justify-center py-20">
          <Loader2 size={28} className="animate-spin text-[var(--text-muted)]" />
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="py-4 space-y-4 max-w-2xl mx-auto">
        <HeroSection />
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-[14px] text-[var(--text-muted)]">加载失败，请刷新重试。</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-[#e47a94] text-white text-[14px] rounded-xl">刷新</button>
        </div>
      </div>
    );
  }

  const weekday = ['日', '一', '二', '三', '四', '五', '六'];
  const d = new Date();
  const dateStr = `${d.getMonth() + 1}月${d.getDate()}日 星期${weekday[d.getDay()]}`;
  const progressPercent = plan.totalCount > 0 ? Math.round((plan.completedCount / plan.totalCount) * 100) : 0;
  const activeTasks = plan.tasks.filter(t => t.key !== 'course' && !t.done);
  const displayName = user?.nickname || user?.username || '';
  const heroTitle = displayName ? `${displayName}，今天继续学什么？` : '今天继续学什么？';
  const streakText = streak >= 2 ? `🔥 已连续学习 ${streak} 天` : null;
  const heroDesc = plan.allDone
    ? `今日任务全部完成！${streakText ? streakText : '太棒了！'}`
    : plan.course
      ? `Day ${plan.courseDay} · ${dateStr}${streakText ? ` · ${streakText}` : ''}`
      : `${dateStr}${streakText ? ` · ${streakText}` : ''}`;

  const quickTools = [
    { label: '拆句', href: '/ai/analyze', icon: Sparkles, color: '#e47a94' },
    { label: '查词', href: '/dictionary', icon: BookOpen, color: '#b49ccf' },
    { label: '听写', href: '/dictation', icon: Edit3, color: '#e8a87c' },
    { label: '闪卡', href: '/review', icon: RefreshCw, color: '#81b5a1' },
  ] as const;

  return (
    <>
      {/* 未读私信弹窗 */}
      {unreadMsg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => { setUnreadMsg(null); sessionStorage.setItem('msg_dismissed', '1'); }} />
          <div className="relative bg-[var(--bg-base)] rounded-[28px] w-full max-w-sm p-6 shadow-2xl z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#fff0f5] flex items-center justify-center shrink-0">
                <Bell size={18} className="text-[#ff7fa8]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-[#ff7fa8] mb-0.5">你有一条新消息</p>
                <p className="text-[15px] font-black text-[var(--text-primary)] truncate">{unreadMsg.title}</p>
              </div>
              <button
                onClick={() => { setUnreadMsg(null); sessionStorage.setItem('msg_dismissed', '1'); }}
                className="w-7 h-7 rounded-full bg-[var(--bg-muted)] flex items-center justify-center text-[var(--text-muted)] shrink-0"
              >
                <X size={14} />
              </button>
            </div>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-5 line-clamp-4">{unreadMsg.content}</p>
            <div className="flex gap-2">
              <Link
                href="/messages"
                onClick={() => { setUnreadMsg(null); sessionStorage.setItem('msg_dismissed', '1'); }}
                className="flex-1 py-2.5 rounded-[14px] bg-[#ff7fa8] text-white text-[13px] font-bold text-center"
              >
                查看消息
              </Link>
              <button
                onClick={() => { setUnreadMsg(null); sessionStorage.setItem('msg_dismissed', '1'); }}
                className="flex-1 py-2.5 rounded-[14px] bg-[var(--bg-muted)] text-[var(--text-secondary)] text-[13px] font-bold"
              >
                稍后再看
              </button>
            </div>
          </div>
        </div>
      )}
    <DailyShell
      main={
        <div className="space-y-4">
          <HeroSection />
          <div className="rounded-[22px] bg-gradient-to-r from-[#fff0f5] via-white to-[#effaf6] border border-[var(--border-default)] px-4 py-3.5 shadow-[0_6px_20px_rgba(78,52,46,.06)] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[16px] font-extrabold text-[var(--text-primary)]">{heroTitle}</p>
              <p className="text-[12px] text-[var(--text-muted)] mt-1">{heroDesc}</p>
            </div>
            <Link
              href="/settings"
              className="flex items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] px-3 py-1.5 text-[12px] font-semibold text-[var(--text-secondary)] shadow-[0_2px_8px_rgba(78,52,46,.06)] shrink-0 whitespace-nowrap"
            >
              <Settings size={13} />
              设置
            </Link>
          </div>
          {plan.allDone && (
            <ToriCard className="bg-[#e8f7ed]/60 border-[#81b5a1]/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-[#81b5a1]/15 flex items-center justify-center shrink-0">
                  <Sparkles size={20} className="text-[#81b5a1]" />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-[#81b5a1]">今日任务全部完成!</p>
                  <p className="text-[13px] text-[var(--text-muted)] mt-0.5">继续探索，保持热度。</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <Link href="/korea/kpop/news" onClick={feedbackClick}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[13px] font-medium text-[var(--text-primary)] active:scale-[0.97] transition-transform">
                  <Music size={14} className="text-[#e47a94]" />
                  看韩娱热帖
                </Link>
                <Link href="/vocabulary/library" onClick={feedbackClick}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[13px] font-medium text-[var(--text-primary)] active:scale-[0.97] transition-transform">
                  <BookOpen size={14} className="text-[#b49ccf]" />
                  浏览词库
                </Link>
              </div>
              {plan.tasks.filter(t => t.key !== 'course' && t.done).length > 0 && (
                <>
                  <p className="text-[11px] font-bold text-[var(--text-muted)] mb-2">今日回顾</p>
                  <div className="space-y-1.5">
                    {plan.tasks.filter(t => t.key !== 'course' && t.done).map(task => {
                      const Icon = TASK_ICONS[task.key] || Target;
                      const color = TASK_COLORS[task.key] || '#8c8177';
                      return (
                        <Link key={task.key} href={task.href} onClick={feedbackClick}
                          className="flex items-center gap-3 rounded-[16px] bg-white/70 border border-[var(--border-default)] px-3 py-2.5 active:bg-[var(--bg-muted)] transition-all">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
                            <Icon size={15} style={{ color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[13px] font-bold text-[var(--text-secondary)]">{task.label}</span>
                            <p className="text-[11px] text-[var(--text-muted)] truncate">{task.detail}</p>
                          </div>
                          <ChevronRight size={14} className="text-[#c4a89e] shrink-0" />
                        </Link>
                      );
                    })}
                  </div>
                </>
              )}
            </ToriCard>
          )}
          {!plan.allDone && (
            <ToriHeroCard
              label="韩语词库"
              desc="按主题、等级整理的韩语词汇，随时查阅、加入复习队列。"
              href="/vocabulary/library"
              actionLabel="浏览词库"
              gradient="from-[#e8f4ff] to-[#f0e8ff]"
            />
          )}
          {activeTasks.length > 0 && (
            <div>
              <ToriSectionHeader title="今日任务" className="mb-2" />
              <div className="space-y-2">
                {activeTasks.map((task) => {
                  const Icon = TASK_ICONS[task.key] || Target;
                  const color = TASK_COLORS[task.key] || '#8c8177';
                  return (
                    <Link key={task.key} href={task.href} onClick={feedbackClick}
                      className="flex items-center gap-3 rounded-[20px] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 shadow-[0_2px_8px_rgba(92,64,38,0.04)] active:bg-[var(--bg-muted)] transition-all">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
                        <Icon size={20} style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[15px] font-bold text-[var(--text-primary)]">{task.label}</span>
                        <p className="text-[12px] text-[var(--text-muted)] mt-0.5 truncate">{task.detail}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 px-3 py-1.5 rounded-xl text-[12px] font-medium" style={{ backgroundColor: `${color}15`, color }}>
                        去完成
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          <div>
            <ToriSectionHeader title="我的" className="mb-2.5" />
            <div className="grid grid-cols-2 gap-2.5">
              <ToriMiniCard icon={<PenLine size={18} className="text-[#e47a94]" />} label="我的错题" detail="听写答错的词" href="/mine/dictation-mistakes" />
              <ToriMiniCard icon={<Mic size={18} className="text-[#e47a94]" />} label="我的录音" detail="发音练习记录" href="/mine/recordings" />
              <ToriMiniCard icon={<Sparkles size={18} className="text-[#e8a87c]" />} label="我的成就" detail="学习里程碑" href="/achievement/card" />
              <ToriMiniCard icon={<FileText size={18} className="text-[#81b5a1]" />} label="我的私信" detail="消息与通知" href="/messages" />
            </div>
          </div>
          {/* Quick tools — mobile only, desktop sees it in aside */}
          <div className="lg:hidden">
            <ToriSectionHeader title="快捷工具" className="mb-2.5" />
            <div className="grid grid-cols-4 gap-2">
              {quickTools.map((tool) => (
                <Link key={tool.href} href={tool.href} onClick={feedbackClick}
                  className="rounded-[20px] border border-[var(--border-default)] bg-[var(--bg-card)] p-3 text-center shadow-[0_2px_8px_rgba(92,64,38,0.04)] active:scale-[0.97] transition-all">
                  <tool.icon size={20} style={{ color: tool.color }} className="mx-auto mb-1" />
                  <span className="text-[12px] font-medium text-[var(--text-primary)]">{tool.label}</span>
                </Link>
              ))}
            </div>
          </div>
          {/* Progress bar — mobile only */}
          <ToriCard className="lg:hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] text-[var(--text-muted)]">今日进度</span>
              <span className="text-[12px] text-[var(--text-muted)]">{plan.completedCount}/{plan.totalCount} 已完成</span>
            </div>
            <div className="w-full bg-[var(--border-default)] rounded-full h-2">
              <div className="h-2 rounded-full bg-gradient-to-r from-[#b49ccf] to-[#e47a94] transition-all duration-500" style={{ width: `${Math.max(4, progressPercent)}%` }} />
            </div>
          </ToriCard>
          {user?.role === 'admin' && (
            <Link
              href="/admin"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border border-dashed border-[#d9cbc3] text-[12px] text-[var(--text-muted)] hover:border-[#e47a94] hover:text-[#e47a94] transition-colors"
            >
              <span>⚙</span> 管理后台
            </Link>
          )}
        </div>
      }
      aside={
        <div className="space-y-4 pt-4">
          <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] p-4 shadow-[0_2px_8px_rgba(92,64,38,0.04)]">
            <p className="text-[13px] font-bold text-[var(--text-primary)] mb-3">今日进度</p>
            <div className="w-full bg-[var(--border-default)] rounded-full h-2 mb-2">
              <div className="h-2 rounded-full bg-gradient-to-r from-[#b49ccf] to-[#e47a94] transition-all duration-500" style={{ width: `${Math.max(4, progressPercent)}%` }} />
            </div>
            <p className="text-[12px] text-[var(--text-muted)]">{plan.completedCount}/{plan.totalCount} 已完成</p>
          </div>
          <div className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] p-4 shadow-[0_2px_8px_rgba(92,64,38,0.04)]">
            <p className="text-[13px] font-bold text-[var(--text-primary)] mb-3">快捷工具</p>
            <div className="grid grid-cols-2 gap-2">
              {quickTools.map((tool) => (
                <Link key={tool.href} href={tool.href} onClick={feedbackClick}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-[var(--border-default)] bg-[var(--bg-base)] p-3 text-center hover:bg-[#fff0f5] transition-colors">
                  <tool.icon size={18} style={{ color: tool.color }} />
                  <span className="text-[11px] font-medium text-[var(--text-primary)]">{tool.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#fff0f5] to-[#eee7ff] border border-[var(--border-default)] p-4 shadow-[0_2px_8px_rgba(92,64,38,0.04)] flex items-center gap-3">
            <Flame size={22} className="text-[#e47a94] shrink-0" />
            <div>
              <p className="text-[13px] font-bold text-[var(--text-primary)]">继续学习</p>
              <p className="text-[11px] text-[var(--text-muted)] mt-0.5">每天打卡，积累最重要</p>
            </div>
          </div>
        </div>
      }
    />
    </>
  );
}

// ── Shared hero section (shown to ALL users) ──

function HeroSection() {
  return (
    <>
      <div className="rounded-[32px] overflow-hidden shadow-[0_26px_68px_rgba(78,52,46,.18)] bg-white border border-white/90">
        <Image
          src="/images/tori-hero-daily.webp"
          alt="Tori 的韩语日记 — 用喜欢的内容学韩语"
          width={800}
          height={400}
          priority
          className="w-full block h-auto"
        />
      </div>

      <div className="mt-3.5">
        <Link
          href="/korea/kpop/news"
          className="flex items-center justify-center h-12 rounded-full bg-[var(--bg-card)] text-[var(--text-secondary)] font-extrabold text-[14px] border border-[var(--border-default)] shadow-[0_10px_26px_rgba(78,52,46,.07)] active:scale-[0.97] transition-transform"
        >
          看韩娱热帖
        </Link>
      </div>
    </>
  );
}

// ── Guest view ──

function GuestDaily() {
  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto md:max-w-3xl">
      <HeroSection />

      <div className="flex items-center justify-between mt-5 mb-3 px-0.5">
        <h2 className="text-[18px] font-bold text-[var(--text-primary)] tracking-[-.3px]">今日继续</h2>
        <span className="text-[12px] font-extrabold text-[#f0799b]">上次进度</span>
      </div>

      <div
        className="flex items-center gap-3.5 rounded-[30px] p-4 min-h-[112px] bg-[var(--bg-card)] border border-[var(--border-default)] relative overflow-hidden opacity-40 cursor-not-allowed"
      >
        <div className="absolute -right-7 -top-8 w-[120px] h-[120px] rounded-full bg-[rgba(255,127,168,.07)]" />
        <div className="w-[60px] h-[60px] rounded-3xl bg-[#201815] text-white grid place-items-center text-[18px] font-extrabold relative z-[1]">影</div>
        <div className="relative z-[1] flex-1 min-w-0">
          <h3 className="text-[17px] font-bold text-[var(--text-primary)] leading-tight">影音跟读</h3>
          <p className="mt-1.5 text-[13px] text-[var(--text-muted)] leading-snug">优化中，即将回归</p>
        </div>
      </div>

      <Link
        href="/review"
        className="flex items-center gap-3.5 rounded-[30px] p-4 min-h-[112px] bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[0_16px_40px_rgba(78,52,46,.10)] relative overflow-hidden active:scale-[0.98] transition-transform"
      >
        <div className="absolute -right-7 -top-8 w-[120px] h-[120px] rounded-full bg-[rgba(174,227,216,.18)]" />
        <div className="w-[60px] h-[60px] rounded-3xl bg-[#fff1f6] text-[#f0799b] grid place-items-center text-[18px] font-extrabold relative z-[1]">复</div>
        <div className="relative z-[1] flex-1 min-w-0">
          <h3 className="text-[17px] font-bold text-[var(--text-primary)] leading-tight">今日复习</h3>
          <p className="mt-1.5 text-[13px] text-[var(--text-muted)] leading-snug">打开闪卡系统，复习你收藏的单词和句子。</p>
        </div>
        <span className="ml-auto text-[#c7b7b0] text-2xl font-extrabold relative z-[1]">›</span>
      </Link>

      <div className="flex items-center justify-between mt-5 mb-3 px-0.5">
        <h2 className="text-[18px] font-bold text-[var(--text-primary)] tracking-[-.3px]">快捷工具</h2>
        <span className="text-[12px] font-extrabold text-[#f0799b]">常用</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {([
          { label: '内容拆解', sub: '粘贴韩文拆词句', href: '/ai/analyze', ch: '拆', bg: '#fff0f5', color: '#f0799b', deco: 'rgba(255,127,168,.07)' },
          { label: '听写练习', sub: '听一句输入韩文', href: '/dictation', ch: '听', bg: '#fff0f5', color: '#f0799b', deco: 'rgba(174,227,216,.12)' },
          { label: '闪卡复习', sub: '轻量三档复习', href: '/review', ch: '卡', bg: '#fff0f5', color: '#f0799b', deco: 'rgba(174,227,216,.12)' },
        ] as const).map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="min-h-[118px] rounded-[26px] p-3.5 bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[0_10px_26px_rgba(78,52,46,.07)] relative overflow-hidden active:scale-[0.97] transition-transform"
          >
            <div className="absolute -right-4 -top-4 w-[70px] h-[70px] rounded-full" style={{ background: tool.deco }} />
            <div className="w-[34px] h-[34px] rounded-[15px] grid place-items-center text-[14px] font-extrabold relative z-[1]" style={{ background: tool.bg, color: tool.color }}>{tool.ch}</div>
            <h3 className="mt-2.5 mb-1 text-[14px] font-bold text-[var(--text-primary)] leading-tight relative z-[1]">{tool.label}</h3>
            <p className="text-[11px] text-[var(--text-muted)] leading-snug relative z-[1]">{tool.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-5 rounded-[28px] p-4 bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[0_16px_40px_rgba(78,52,46,.10)] text-center space-y-3">
        <p className="text-[13px] text-[var(--text-muted)]">登录后可以保存学习记录，解锁完整每日计划。</p>
        <Link
          href="/auth/login?redirect=/daily"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#e47a94] text-white rounded-xl text-[13px] font-medium active:scale-95 transition-transform"
        >
          <LogIn size={14} />登录
        </Link>
      </div>
    </div>
  );
}
