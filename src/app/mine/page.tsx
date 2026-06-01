'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Library, BookOpen, MessageSquare, FileText, Mic,
  Music, PenLine, TrendingUp, ChevronRight,
  Loader2, Sparkles, Volume2,
} from 'lucide-react';
import { db } from '@/lib/db';

interface MineStats {
  wordCount: number;
  sentenceCount: number;
  recordingCount: number;
  singingCount: number;
}

export default function MinePage() {
  const [stats, setStats] = useState<MineStats | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [words, shadowingRecords, pronunciationAttempts] = await Promise.all([
          db.words.count(),
          db.shadowingRecords.count(),
          db.pronunciationAttempts.count(),
        ]);
        setStats({
          wordCount: words,
          sentenceCount: 0, // TODO: sentences table
          recordingCount: shadowingRecords + pronunciationAttempts,
          singingCount: 0, // TODO: kpop recordings
        });
      } catch { setStats(null); }
    })();
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  const statCards = [
    { label: '我的词', value: stats.wordCount, icon: BookOpen, color: 'var(--pink-primary)' },
    { label: '我的句子', value: stats.sentenceCount, icon: MessageSquare, color: 'var(--purple-soft)' },
    { label: '我的录音', value: stats.recordingCount, icon: Mic, color: 'var(--peach-soft)' },
    { label: '我的跟唱', value: stats.singingCount, icon: Music, color: 'var(--mint-soft)' },
  ];

  const menuSections = [
    {
      title: '我的资料',
      items: [
        { label: '我的词', desc: '收藏的单词和学习记录', href: '/vocabulary', icon: BookOpen, color: 'var(--pink-primary)' },
        { label: '我的句子', desc: '收藏的句子和表达', href: '/vocabulary?tab=sentences', icon: MessageSquare, color: 'var(--purple-soft)' },
        { label: '我的文章', desc: '阅读过的文章', href: '/reading', icon: FileText, color: 'var(--peach-soft)' },
      ],
    },
    {
      title: '我的练习',
      items: [
        { label: '我的录音', desc: '发音跟读录音', href: '/shadowing', icon: Mic, color: 'var(--mint-soft)' },
        { label: '我的跟唱', desc: 'KPOP歌词跟唱', href: '/korea/kpop?tab=my', icon: Music, color: 'var(--purple-soft)' },
        { label: '我的日记', desc: '学习日记', href: '/diary', icon: PenLine, color: 'var(--pink-primary)' },
        { label: '我的成就', desc: '学习成就和徽章', href: '/stats', icon: TrendingUp, color: 'var(--peach-soft)' },
      ],
    },
  ];

  return (
    <div className="py-4 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">我的学习资料</h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">你已经积累了什么？</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {statCards.map((s) => (
          <div key={s.label} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3 text-center">
            <s.icon size={18} style={{ color: s.color }} className="mx-auto mb-1" />
            <div className="text-lg font-bold text-[var(--text-primary)]">{s.value}</div>
            <div className="text-[10px] text-[var(--text-muted)]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Menu sections */}
      {menuSections.map((section) => (
        <div key={section.title}>
          <h2 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 px-1">{section.title}</h2>
          <div className="space-y-1.5">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 hover:border-[var(--border-hover)] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                  <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                </div>
                <ChevronRight size={16} className="text-[var(--text-muted)]" />
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Bottom links */}
      <div className="flex gap-2 justify-center">
        <Link href="/messages" className="text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors px-3 py-1.5 rounded-lg bg-[var(--bg-input)]">
          消息
        </Link>
        <Link href="/settings" className="text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors px-3 py-1.5 rounded-lg bg-[var(--bg-input)]">
          设置
        </Link>
      </div>
    </div>
  );
}
