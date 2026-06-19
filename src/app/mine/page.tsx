'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Library, BookOpen, MessageSquare, FileText, Mic,
  Music, PenLine, TrendingUp,
  Loader2, StickyNote, LogIn, Settings,
  Mail, Moon, Sun,
} from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { useFeedback } from '@/hooks/useFeedback';
import { useTheme } from '@/components/ThemeProvider';
import { MobilePageHero } from '@/components/mobile/MobilePageHero';
import { ToriCard } from '@/components/mobile/ToriCard';
import { ToriListRow } from '@/components/mobile/ToriListRow';
import { ToriStatCard } from '@/components/mobile/ToriStatCard';
import { ToriSectionHeader } from '@/components/mobile/ToriSectionHeader';

interface MineStats {
  wordCount: number;
  sentenceCount: number;
  articleCount: number;
  recordingCount: number;
}

export default function MinePage() {
  const { user, loading: authLoading } = useAuth();
  const { click: feedbackClick } = useFeedback();
  const { theme, toggle } = useTheme();
  const [stats, setStats] = useState<MineStats>({ wordCount: 0, sentenceCount: 0, articleCount: 0, recordingCount: 0 });
  const [loadError, setLoadError] = useState(false);
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

  // ── SSR / initial client render ──
  if (!mounted) {
    return (
      <div className="py-4 space-y-5 max-w-2xl mx-auto md:max-w-3xl">
        <MobilePageHero title="我的学习资料" description="你保存过的内容都在这里。" variant="blue" />
        <div className="animate-pulse">
          <div className="rounded-[24px] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 shadow-[0_8px_24px_rgba(92,64,38,0.08)]">
            <div className="h-4 w-32 bg-[var(--bg-muted)] rounded mb-3" />
            <div className="h-3 w-48 bg-[var(--bg-muted)] rounded" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-20 bg-[var(--bg-muted)] rounded" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[60px] rounded-[18px] border border-[var(--border-default)] bg-[var(--bg-card)]" />
          ))}
        </div>
      </div>
    );
  }

  // ── Error ──
  if (loadError) {
    return (
      <div className="py-4 space-y-5 max-w-2xl mx-auto md:max-w-3xl">
        <MobilePageHero title="我的学习资料" description="你保存过的内容都在这里。" variant="blue" />
        <ToriCard className="text-center space-y-3">
          <p className="text-[14px] text-[var(--text-muted)]">加载失败，请刷新重试</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-[#e47a94] text-white text-[13px] rounded-xl active:scale-95 transition-transform">
            刷新
          </button>
        </ToriCard>
      </div>
    );
  }

  // ── Auth loading — show skeleton instead of blank spinner ──
  if (authLoading) {
    return (
      <div className="py-4 space-y-5 max-w-2xl mx-auto md:max-w-3xl">
        <MobilePageHero title="我的学习资料" description="你保存过的内容都在这里。" variant="blue" />
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[60px] rounded-[18px] border border-[var(--border-default)] bg-[var(--bg-card)]" />
          ))}
        </div>
      </div>
    );
  }

  // ── Unauthenticated ──
  if (!user) {
    return (
      <div className="py-4 space-y-5 max-w-2xl mx-auto md:max-w-3xl">
        <MobilePageHero title="我的学习资料" description="你保存过的内容都在这里。" variant="blue" />

        <ToriCard className="text-center space-y-3">
          <Library size={48} className="text-[#d4ccc4] mx-auto" />
          <p className="text-[14px] text-[var(--text-muted)]">登录后可以保存你的单词、句子、文章、笔记、录音、跟唱进度和学习记录。</p>
          <div className="flex gap-2 justify-center">
            <Link href="/auth/login?redirect=/mine" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#e47a94] text-white rounded-xl text-[13px] font-medium active:scale-95 transition-transform">
              <LogIn size={14} />登录
            </Link>
            <Link href="/auth/register" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--bg-muted)] text-[var(--text-primary)] rounded-xl text-[13px] font-medium border border-[var(--border-default)] active:scale-95 transition-transform">
              注册
            </Link>
          </div>
        </ToriCard>

        <div>
          <ToriSectionHeader title="登录后可保存" className="mb-2" />
          <div className="space-y-2">
            {[
              { label: '我的词', desc: '收藏的单词和学习记录', icon: BookOpen, color: '#e47a94' },
              { label: '我的句子', desc: '收藏的句子和表达', icon: MessageSquare, color: '#b49ccf' },
              { label: '我的笔记', desc: '学习笔记和备忘', icon: StickyNote, color: '#81b5a1' },
              { label: '我的跟唱', desc: 'KPOP歌词跟唱进度', icon: Music, color: '#b49ccf' },
              { label: '我的日记', desc: '学习日记', icon: PenLine, color: '#e47a94' },
              { label: '我的成就', desc: '学习成就和徽章', icon: TrendingUp, color: '#e8a87c' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-[18px] bg-[var(--bg-card)] border border-[var(--border-default)] px-4 py-3.5 shadow-[0_2px_8px_rgba(92,64,38,0.03)] opacity-50">
                <div className="w-9 h-9 rounded-[14px] bg-[var(--bg-muted)] flex items-center justify-center shrink-0">
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-[var(--text-primary)]">{item.label}</p>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Authenticated ──
  const statCards = [
    { label: '词', value: stats.wordCount, color: '#e47a94' },
    { label: '句子', value: stats.sentenceCount, color: '#b49ccf' },
    { label: '文章', value: stats.articleCount, color: '#e8a87c' },
    { label: '录音', value: stats.recordingCount, color: '#81b5a1' },
  ];

  const menuSections = [
    {
      title: '我的资料',
      items: [
        { label: '我的词', desc: '已保存的单词和学习记录', href: '/vocabulary', icon: BookOpen, color: '#e47a94' },
        { label: '我的句子', desc: '已保存的句子和表达', href: '/vocabulary?tab=sentences', icon: MessageSquare, color: '#b49ccf' },
        { label: '我的文章', desc: '已保存的文章', href: '/mine/articles', icon: FileText, color: '#e8a87c' },
        { label: '我的笔记', desc: '学习笔记和备忘', href: '/mine/notes', icon: StickyNote, color: '#81b5a1' },
      ],
    },
    {
      title: '我的练习',
      items: [
        { label: '我的录音', desc: '发音跟读录音', href: '/mine/recordings', icon: Mic, color: '#81b5a1' },
        { label: '我的跟唱', desc: 'KPOP歌词跟唱进度', href: '/mine/kpop', icon: Music, color: '#b49ccf' },
        { label: '我的日记', desc: '学习日记', href: '/mine/diary', icon: PenLine, color: '#e47a94' },
        { label: '我的成就', desc: '学习成就和徽章', href: '/stats', icon: TrendingUp, color: '#e8a87c' },
      ],
    },
  ];

  return (
    <div className="py-4 space-y-5 max-w-2xl mx-auto md:max-w-3xl">
      <MobilePageHero title="我的学习资料" description="你保存过的内容都在这里。" variant="blue" />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {statCards.map((s) => (
          <ToriStatCard key={s.label} value={s.value} label={s.label} />
        ))}
      </div>

      {/* Empty state guidance for new users */}
      {stats.wordCount === 0 && stats.sentenceCount === 0 && stats.recordingCount === 0 && (
        <ToriCard className="text-center space-y-2 bg-[var(--bg-muted)]">
          <p className="text-[13px] text-[var(--text-muted)]">还没有保存内容。</p>
          <p className="text-[12px] text-[var(--text-muted)]">去拆一句韩语、跟唱一句 KPOP 或查一个词，保存你的第一个学习资产。</p>
        </ToriCard>
      )}

      {/* Menu sections */}
      {menuSections.map((section) => (
        <div key={section.title}>
          <ToriSectionHeader title={section.title} className="mb-2" />
          <div className="space-y-2">
            {section.items.map((item) => (
              <ToriListRow
                key={item.href}
                icon={<item.icon size={18} style={{ color: item.color }} />}
                label={item.label}
                desc={item.desc}
                href={item.href}
                onClick={feedbackClick}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Footer links */}
      <div className="flex gap-2 justify-center flex-wrap pb-2">
        <Link href="/messages" className="inline-flex items-center gap-1.5 text-[12px] text-[#8c8177] hover:text-[#e47a94] transition-colors px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <Mail size={13} />消息
        </Link>
        <Link href="/settings" className="inline-flex items-center gap-1.5 text-[12px] text-[#8c8177] hover:text-[#e47a94] transition-colors px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          <Settings size={13} />设置
        </Link>
        <button onClick={toggle} className="inline-flex items-center gap-1.5 text-[12px] text-[#8c8177] hover:text-[#e47a94] transition-colors px-3 py-1.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)]">
          {theme === 'light' ? <Moon size={13} /> : <Sun size={13} />}
          {theme === 'light' ? '深色模式' : '亮色模式'}
        </button>
        {user?.role === 'admin' && (
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-[12px] text-[#e47a94] hover:text-[#c75a78] transition-colors px-3 py-1.5 rounded-xl bg-[#fff0f4] border border-[#f8c8d4] font-medium">
            ⚙ 管理后台
          </Link>
        )}
      </div>
    </div>
  );
}
