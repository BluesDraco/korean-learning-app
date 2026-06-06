'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Loader2, Sparkles, BookOpen, Mic, BookMarked, Edit3, Target, GraduationCap, Music, RefreshCw, FileText, LogIn, Flame } from 'lucide-react';
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
  const [planLoading, setPlanLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const [kpopProg, setKpopProg] = useState<{ songId: string; title: string; artist: string; practicedLines: number; totalLines: number } | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check onboarding status from IndexedDB (API may be stale for newly registered users)
  useEffect(() => {
    if (user && !user.onboardingCompleted) {
      getProfile().then(p => {
        if (!p.onboardingComplete) setShowOnboarding(true);
      }).catch(() => {}).finally(() => setOnboardingChecked(true));
    } else {
      setOnboardingChecked(true);
    }
  }, [user]);

  const load = useCallback(async () => {
    try {
      setPlanLoading(true);
      let prog: { songId: string; practicedLines: number; totalLines: number }[] = [];
      try { prog = getAllSongProgress(); } catch { /* localStorage not available */ }
      const [p] = await Promise.all([buildDailyPlan()]);
      setPlan(p);
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
      // silently fail
    } finally {
      setPlanLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) load();
  }, [user, load]);

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
          <Loader2 size={28} className="animate-spin text-[#8c8177]" />
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
          <Loader2 size={28} className="animate-spin text-[#8c8177]" />
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="py-4 space-y-4 max-w-2xl mx-auto">
        <HeroSection />
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-[14px] text-[#8c8177]">加载失败，请刷新重试。</p>
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
  const heroDesc = plan.allDone
    ? '今日任务全部完成！太棒了！'
    : plan.course
      ? `Day ${plan.courseDay} · ${dateStr} · 连续学习，Tori 帮你整理好了。`
      : `${dateStr} · Tori 帮你整理好了。`;

  const quickTools = [
    { label: '拆句', href: '/ai/analyze', icon: Sparkles, color: '#e47a94' },
    { label: '查词', href: '/dictionary', icon: BookOpen, color: '#b49ccf' },
    { label: '听写', href: '/dictation', icon: Edit3, color: '#e8a87c' },
    { label: '闪卡', href: '/review', icon: RefreshCw, color: '#81b5a1' },
  ] as const;

  return (
    <DailyShell
      main={
        <div className="space-y-4">
          <HeroSection />
          <div className="rounded-[22px] bg-gradient-to-r from-[#fff0f5] via-white to-[#effaf6] border border-[#efe0d9] px-4 py-3.5 shadow-[0_6px_20px_rgba(78,52,46,.06)]">
            <p className="text-[16px] font-extrabold text-[#241917]">{heroTitle}</p>
            <p className="text-[12px] text-[#8b766e] mt-1">{heroDesc}</p>
          </div>
          {plan.allDone && (
            <ToriCard className="bg-[#e8f7ed]/60 border-[#81b5a1]/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#81b5a1]/15 flex items-center justify-center shrink-0">
                <Sparkles size={20} className="text-[#81b5a1]" />
              </div>
              <div>
                <p className="text-[15px] font-bold text-[#81b5a1]">今日任务全部完成!</p>
                <p className="text-[13px] text-[#8c8177] mt-0.5">太棒了，继续保持!</p>
              </div>
            </ToriCard>
          )}
          {!plan.allDone && plan.course && (
            <ToriHeroCard
              label="继续上次学习"
              desc={`Day ${plan.courseDay} · ${plan.course.title} — ${plan.course.words.length} 单词 · 1 语法 · ${plan.course.sentences.length} 句子`}
              href={`/course/${plan.courseDay}?source=daily`}
              actionLabel="继续课程"
              gradient="from-[#ffe4ec] to-[#eee7ff]"
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
                      className="flex items-center gap-3 rounded-[20px] border border-[#efe4d8] bg-white p-4 shadow-[0_2px_8px_rgba(92,64,38,0.04)] active:bg-[#fdfaf5] transition-all">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
                        <Icon size={20} style={{ color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[15px] font-bold text-[#2f2a26]">{task.label}</span>
                        <p className="text-[12px] text-[#8c8177] mt-0.5 truncate">{task.detail}</p>
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
            <ToriSectionHeader title="继续探索" className="mb-2.5" />
            <div className="grid grid-cols-2 gap-2.5">
              {kpopProg ? (
                <ToriMiniCard icon={<Music size={18} className="text-[#e47a94]" />} label="继续跟唱" detail={`${kpopProg.artist} — ${kpopProg.title} (${kpopProg.practicedLines}/${kpopProg.totalLines})`} href="/korea/kpop" />
              ) : (
                <ToriMiniCard icon={<Music size={18} className="text-[#e47a94]" />} label="KPOP 跟唱" detail="用喜欢的歌学韩语" href="/korea/kpop" />
              )}
              <ToriMiniCard icon={<RefreshCw size={18} className="text-[#e8a87c]" />} label="今日复习" detail={plan.srsReview.dueCount > 0 ? `${plan.srsReview.dueCount} 个单词待复习` : '已完成'} href="/review" />
              <ToriMiniCard icon={<BookMarked size={18} className="text-[#81b5a1]" />} label="继续阅读" detail={plan.reading.done ? '已完成今日阅读' : '韩语文章或绘本'} href="/reading" />
              <ToriMiniCard icon={<FileText size={18} className="text-[#8c8177]" />} label="影子跟读" detail="演讲 · 访谈 · 原声" href="/shadowing" />
            </div>
          </div>
          {/* Quick tools — mobile only, desktop sees it in aside */}
          <div className="lg:hidden">
            <ToriSectionHeader title="快捷工具" className="mb-2.5" />
            <div className="grid grid-cols-4 gap-2">
              {quickTools.map((tool) => (
                <Link key={tool.href} href={tool.href} onClick={feedbackClick}
                  className="rounded-[20px] border border-[#efe4d8] bg-white p-3 text-center shadow-[0_2px_8px_rgba(92,64,38,0.04)] active:scale-[0.97] transition-all">
                  <tool.icon size={20} style={{ color: tool.color }} className="mx-auto mb-1" />
                  <span className="text-[12px] font-medium text-[#2f2a26]">{tool.label}</span>
                </Link>
              ))}
            </div>
          </div>
          {/* Progress bar — mobile only */}
          <ToriCard className="lg:hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] text-[#8c8177]">今日进度</span>
              <span className="text-[12px] text-[#8c8177]">{plan.completedCount}/{plan.totalCount} 已完成</span>
            </div>
            <div className="w-full bg-[#efe4d8] rounded-full h-2">
              <div className="h-2 rounded-full bg-gradient-to-r from-[#b49ccf] to-[#e47a94] transition-all duration-500" style={{ width: `${Math.max(4, progressPercent)}%` }} />
            </div>
          </ToriCard>
        </div>
      }
      aside={
        <div className="space-y-4 pt-4">
          <div className="rounded-2xl bg-white border border-[#efe4d8] p-4 shadow-[0_2px_8px_rgba(92,64,38,0.04)]">
            <p className="text-[13px] font-bold text-[#241917] mb-3">今日进度</p>
            <div className="w-full bg-[#efe4d8] rounded-full h-2 mb-2">
              <div className="h-2 rounded-full bg-gradient-to-r from-[#b49ccf] to-[#e47a94] transition-all duration-500" style={{ width: `${Math.max(4, progressPercent)}%` }} />
            </div>
            <p className="text-[12px] text-[#8c8177]">{plan.completedCount}/{plan.totalCount} 已完成</p>
          </div>
          <div className="rounded-2xl bg-white border border-[#efe4d8] p-4 shadow-[0_2px_8px_rgba(92,64,38,0.04)]">
            <p className="text-[13px] font-bold text-[#241917] mb-3">快捷工具</p>
            <div className="grid grid-cols-2 gap-2">
              {quickTools.map((tool) => (
                <Link key={tool.href} href={tool.href} onClick={feedbackClick}
                  className="flex flex-col items-center gap-1.5 rounded-xl border border-[#efe4d8] bg-[#fdfaf7] p-3 text-center hover:bg-[#fff0f5] transition-colors">
                  <tool.icon size={18} style={{ color: tool.color }} />
                  <span className="text-[11px] font-medium text-[#2f2a26]">{tool.label}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-[#fff0f5] to-[#eee7ff] border border-[#efe0d9] p-4 shadow-[0_2px_8px_rgba(92,64,38,0.04)] flex items-center gap-3">
            <Flame size={22} className="text-[#e47a94] shrink-0" />
            <div>
              <p className="text-[13px] font-bold text-[#241917]">继续学习</p>
              <p className="text-[11px] text-[#8c8177] mt-0.5">每天打卡，积累最重要</p>
            </div>
          </div>
        </div>
      }
    />
  );
}

// ── Shared hero section (shown to ALL users) ──

function HeroSection() {
  return (
    <>
      <div className="rounded-[32px] overflow-hidden shadow-[0_26px_68px_rgba(78,52,46,.18)] bg-white border border-white/90">
        <img
          src="/images/tori-hero-daily.webp"
          alt="Tori 的韩语日记 — 用喜欢的内容学韩语"
          className="w-full block h-auto"
        />
      </div>

      <div className="grid grid-cols-[1.08fr_.92fr] gap-2.5 mt-3.5">
        <Link
          href="/korea/kpop"
          className="flex items-center justify-center h-12 rounded-full bg-[#201815] text-white font-extrabold text-[14px] shadow-[0_14px_28px_rgba(32,24,21,.18)] active:scale-[0.97] transition-transform"
        >
          进入 KPOP
        </Link>
        <Link
          href="/korea/kpop/news"
          className="flex items-center justify-center h-12 rounded-full bg-white text-[#5a4640] font-extrabold text-[14px] border border-[#efe0d9] shadow-[0_10px_26px_rgba(78,52,46,.07)] active:scale-[0.97] transition-transform"
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
        <h2 className="text-[18px] font-bold text-[#241917] tracking-[-.3px]">今日继续</h2>
        <span className="text-[12px] font-extrabold text-[#f0799b]">上次进度</span>
      </div>

      <Link
        href="/shadowing"
        className="flex items-center gap-3.5 rounded-[30px] p-4 min-h-[112px] bg-white border border-[#efe0d9] shadow-[0_16px_40px_rgba(78,52,46,.10)] relative overflow-hidden active:scale-[0.98] transition-transform"
      >
        <div className="absolute -right-7 -top-8 w-[120px] h-[120px] rounded-full bg-[rgba(255,127,168,.07)]" />
        <div className="w-[60px] h-[60px] rounded-3xl bg-[#201815] text-white grid place-items-center text-[18px] font-extrabold relative z-[1] shadow-[0_12px_26px_rgba(32,24,21,.18)]">影</div>
        <div className="relative z-[1] flex-1 min-w-0">
          <h3 className="text-[17px] font-bold text-[#241917] leading-tight">继续影音跟读</h3>
          <p className="mt-1.5 text-[13px] text-[#8b766e] leading-snug">从上次位置继续听原声、跟读、保存表达。</p>
        </div>
        <span className="ml-auto text-[#c7b7b0] text-2xl font-extrabold relative z-[1]">›</span>
      </Link>

      <Link
        href="/review"
        className="flex items-center gap-3.5 rounded-[30px] p-4 min-h-[112px] bg-white border border-[#efe0d9] shadow-[0_16px_40px_rgba(78,52,46,.10)] relative overflow-hidden active:scale-[0.98] transition-transform"
      >
        <div className="absolute -right-7 -top-8 w-[120px] h-[120px] rounded-full bg-[rgba(174,227,216,.18)]" />
        <div className="w-[60px] h-[60px] rounded-3xl bg-[#fff1f6] text-[#f0799b] grid place-items-center text-[18px] font-extrabold relative z-[1]">复</div>
        <div className="relative z-[1] flex-1 min-w-0">
          <h3 className="text-[17px] font-bold text-[#241917] leading-tight">今日复习</h3>
          <p className="mt-1.5 text-[13px] text-[#8b766e] leading-snug">打开闪卡系统，复习你收藏的单词和句子。</p>
        </div>
        <span className="ml-auto text-[#c7b7b0] text-2xl font-extrabold relative z-[1]">›</span>
      </Link>

      <div className="flex items-center justify-between mt-5 mb-3 px-0.5">
        <h2 className="text-[18px] font-bold text-[#241917] tracking-[-.3px]">快捷工具</h2>
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
            className="min-h-[118px] rounded-[26px] p-3.5 bg-white border border-[#efe0d9] shadow-[0_10px_26px_rgba(78,52,46,.07)] relative overflow-hidden active:scale-[0.97] transition-transform"
          >
            <div className="absolute -right-4 -top-4 w-[70px] h-[70px] rounded-full" style={{ background: tool.deco }} />
            <div className="w-[34px] h-[34px] rounded-[15px] grid place-items-center text-[14px] font-extrabold relative z-[1]" style={{ background: tool.bg, color: tool.color }}>{tool.ch}</div>
            <h3 className="mt-2.5 mb-1 text-[14px] font-bold text-[#241917] leading-tight relative z-[1]">{tool.label}</h3>
            <p className="text-[11px] text-[#8b766e] leading-snug relative z-[1]">{tool.sub}</p>
          </Link>
        ))}
      </div>

      <div className="mt-5 rounded-[28px] p-4 bg-white border border-[#efe0d9] shadow-[0_16px_40px_rgba(78,52,46,.10)] text-center space-y-3">
        <p className="text-[13px] text-[#8b766e]">登录后可以保存学习记录，解锁完整每日计划。</p>
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
