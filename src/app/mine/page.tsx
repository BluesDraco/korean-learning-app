'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Library, BookOpen, MessageSquare, FileText, Mic,
  Music, PenLine, TrendingUp,
  Loader2, StickyNote, LogIn, Settings,
  Mail, AlertCircle,
} from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/gamification';
import { checkAchievements } from '@/lib/achievements/check';
import { ACHIEVEMENT_BY_ID } from '@/data/achievements';
import UserAvatar from '@/components/UserAvatar';
import type { Tier } from '@/lib/membership-benefits';
import type { AchievementProgress } from '@/types';
import './mine-home.css';

interface HomeData {
  level: number;
  streak: number;
  unlocked: number;
  achTotal: number;
  nextAch: { icon: string; title: string; rarity: string } | null;
  mistakes: { dict: number; vocab: number; ai: number; total: number; preview: { ko: string; zh: string; tag: string }[] };
  recordings: number;
  unread: number;
  msgPreview: { title: string; isNew: boolean }[];
}

export default function MineHomePage() {
  const { lang } = useLang();
  const { user } = useAuth();
  const router = useRouter();
  const [tier, setTier] = useState<Tier>('free');
  const [expiry, setExpiry] = useState<number | null>(null);
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    if (!user) return;
    const ctrl = new AbortController();

    // 会员状态
    fetch('/api/membership/me', { signal: ctrl.signal, cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) { setTier(d.tier ?? 'free'); setExpiry(typeof d.expiry === 'number' ? d.expiry : null); } })
      .catch(() => {});

    // 本地数据聚合
    (async () => {
      const [profile, achRes, dictAll, vocab, ai, recs] = await Promise.all([
        getProfile().catch(() => null),
        checkAchievements(user.id).catch(() => null),
        db.dictationRecords.filter(r => !r.correct).catch(() => []),
        db.spellingMistakes.toArray().catch(() => []),
        db.aiChatMistakes.toArray().catch(() => []),
        db.recordings.toArray().catch(() => []),
      ]);

      // 错题去重预览（默写按 wordId 去重取前 2）
      const dictWords = new Map<string, string>();
      for (const r of dictAll) if (!dictWords.has(r.wordId)) dictWords.set(r.wordId, r.meaning || '');
      const preview: { ko: string; zh: string; tag: string }[] = [];
      for (const [ko, zh] of dictWords) { if (preview.length < 2) preview.push({ ko, zh, tag: t('minehome.tag_dictation', lang) }); }
      for (const m of vocab) { if (preview.length < 2) preview.push({ ko: m.word, zh: m.meaning || '', tag: t('minehome.tag_vocab', lang) }); }

      // 下一个成就
      let nextAch: HomeData['nextAch'] = null;
      if (achRes) {
        let best: { p: AchievementProgress; ratio: number } | null = null;
        for (const p of achRes.list) {
          const def = ACHIEVEMENT_BY_ID[p.id];
          if (!def || p.unlocked || def.goal <= 1) continue;
          const ratio = p.current / def.goal;
          if (ratio > 0 && (!best || ratio > best.ratio)) best = { p, ratio };
        }
        if (best) { const d = ACHIEVEMENT_BY_ID[best.p.id]; nextAch = { icon: d.icon, title: d.title, rarity: d.rarity }; }
      }

      // 未读消息 + 预览
      let unread = 0;
      let msgPreview: HomeData['msgPreview'] = [];
      try {
        const [uRes, listRes] = await Promise.all([
          fetch('/api/announcements/unread', { cache: 'no-store' }).then(r => r.ok ? r.json() : { count: 0 }),
          fetch('/api/announcements', { cache: 'no-store' }).then(r => r.ok ? r.json() : []),
        ]);
        unread = uRes?.count ?? 0;
        if (Array.isArray(listRes)) msgPreview = listRes.slice(0, 2).map((m: { title: string; read: boolean }) => ({ title: m.title, isNew: !m.read }));
      } catch { /* ignore */ }

      const dictCount = dictWords.size;
      setData({
        level: achRes?.level ?? profile?.level ?? 1,
        streak: achRes?.longestStreak ?? profile?.longestStreak ?? 0,
        unlocked: achRes?.unlockedCount ?? 0,
        achTotal: achRes?.list.length ?? 30,
        nextAch,
        mistakes: { dict: dictCount, vocab: vocab.length, ai: ai.length, total: dictCount + vocab.length + ai.length, preview },
        recordings: recs.length,
        unread,
        msgPreview,
      });
    })();

  // ── SSR / initial client render ──
  if (!mounted) {
    return (
      <div className="py-4 space-y-5 max-w-2xl mx-auto md:max-w-3xl">
        <MobilePageHero title="我的学习资料" description="你保存过的内容都在这里。" variant="blue" />
        <div className="animate-pulse">
          <div className="rounded-[24px] border p-4 shadow-[0_8px_24px_rgba(92,64,38,0.08)]" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-card)' }}>
            <div className="h-4 w-32 rounded mb-3" style={{ background: 'var(--bg-muted)' }} />
            <div className="h-3 w-48 rounded" style={{ background: 'var(--bg-muted)' }} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-5 w-20 rounded" style={{ background: 'var(--bg-muted)' }} />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[60px] rounded-[18px] border" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-card)' }} />
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
          <p className="text-[14px]" style={{ color: 'var(--text-muted)' }}>加载失败，请刷新重试</p>
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
            <div key={i} className="h-[60px] rounded-[18px] border" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-card)' }} />
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
          <Library size={48} style={{ color: 'var(--border-color)' }} className="mx-auto" />
          <p className="text-[14px]" style={{ color: 'var(--text-muted)' }}>登录后可以保存你的单词、句子、文章、笔记、录音、跟唱进度和学习记录。</p>
          <div className="flex gap-2 justify-center">
            <Link href="/auth/login?redirect=/mine" className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#e47a94] text-white rounded-xl text-[13px] font-medium active:scale-95 transition-transform">
              <LogIn size={14} />登录
            </Link>
            <Link href="/auth/register" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-medium border active:scale-95 transition-transform" style={{ background: 'var(--bg-muted)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
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
              <div key={item.label} className="flex items-center gap-3 rounded-[18px] border px-4 py-3.5 shadow-[0_2px_8px_rgba(92,64,38,0.03)] opacity-50" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                <div className="w-9 h-9 rounded-[14px] flex items-center justify-center shrink-0" style={{ background: 'var(--bg-muted)' }}>
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
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
        { label: '我的错题', desc: '默写和造句错误记录', href: '/mine/vocabulary-mistakes', icon: AlertCircle, color: '#f0799b' },
      ],
    },
  ];

  return (
    <div className="mine-scope mine-bg">
      <div className="mine-stage">

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {statCards.map((s) => (
          <ToriStatCard key={s.label} value={s.value} label={s.label} />
        ))}
      </div>

      {/* Empty state guidance for new users */}
      {stats.wordCount === 0 && stats.sentenceCount === 0 && stats.recordingCount === 0 && (
        <ToriCard className="text-center space-y-2" style={{ background: 'var(--bg-muted)' }}>
          <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>还没有保存内容。</p>
          <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>去拆一句韩语、跟唱一句 KPOP 或查一个词，保存你的第一个学习资产。</p>
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

      {/* Footer links */}
      <div className="flex gap-2 justify-center flex-wrap pb-2">
        <Link href="/messages" className="inline-flex items-center gap-1.5 text-[12px] hover:text-[#e47a94] transition-colors px-3 py-1.5 rounded-xl border" style={{ color: 'var(--text-muted)', background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <Mail size={13} />消息
        </Link>
        <Link href="/settings" className="inline-flex items-center gap-1.5 text-[12px] hover:text-[#e47a94] transition-colors px-3 py-1.5 rounded-xl border" style={{ color: 'var(--text-muted)', background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <Settings size={13} />设置
        </Link>
        {user?.role === 'admin' && (
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-[12px] text-[#e47a94] hover:text-[#c75a78] transition-colors px-3 py-1.5 rounded-xl bg-[#fff0f4] border border-[#f8c8d4] font-medium">
            ⚙ 管理后台
          </Link>
        )}
      </div>
    </div>
  );
}
