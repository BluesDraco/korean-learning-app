'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Dumbbell, Headphones, Mic, PenLine } from 'lucide-react';
import { db } from '@/lib/db';

export default function MinePracticesPage() {
  const [dictationCount, setDictationCount] = useState<number | null>(null);
  const [pronunciationCount, setPronunciationCount] = useState<number | null>(null);
  const [shadowingCount, setShadowingCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      db.dictationRecords.count().catch(() => 0),
      db.pronunciationAttempts.count().catch(() => 0),
      db.shadowingRecords.count().catch(() => 0),
    ]).then(([d, p, s]) => {
      setDictationCount(d);
      setPronunciationCount(p);
      setShadowingCount(s);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const total = (dictationCount ?? 0) + (pronunciationCount ?? 0) + (shadowingCount ?? 0);

  const items = [
    { icon: <Headphones size={20} className="text-[var(--blue-soft)]" />, label: '听写练习', count: dictationCount, href: '/dictation', desc: '次' },
    { icon: <Mic size={20} className="text-[var(--mint-soft)]" />, label: '发音练习', count: pronunciationCount, href: '/pronunciation', desc: '次' },
    { icon: <PenLine size={20} className="text-[var(--purple-soft)]" />, label: '影子跟读', count: shadowingCount, href: '/shadowing', desc: '次' },
  ];

  return (
    <div className="py-4 space-y-4">
      <div className="flex items-center gap-2 text-[13px]">
        <Link href="/mine" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
          <ArrowLeft size={14} />返回
        </Link>
        <span className="text-[var(--border-color)]">/</span>
        <span className="text-[var(--text-secondary)] font-medium">我的练习</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-bold text-[var(--text-primary)]">我的练习</h1>
        {!loading && total > 0 && (
          <span className="text-[12px] text-[var(--text-muted)]">共 {total} 次</span>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-6 h-6 rounded-full border-2 border-[var(--pink-primary)] border-t-transparent animate-spin" />
        </div>
      ) : total === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--bg-muted)] flex items-center justify-center mb-4">
            <Dumbbell size={28} className="text-[var(--border-color)]" />
          </div>
          <h2 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">还没有练习记录</h2>
          <p className="text-[13px] text-[var(--text-muted)] max-w-xs leading-relaxed">
            完成听写、发音或跟读练习后，记录会显示在这里
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 rounded-[20px] bg-[var(--bg-card)] border border-[var(--border-color)] px-5 py-4 shadow-[0_2px_8px_rgba(92,64,38,0.04)] active:scale-[0.98] transition-all"
            >
              <div className="w-11 h-11 rounded-[14px] bg-[var(--bg-muted)] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-[15px] font-bold text-[var(--text-primary)]">{item.label}</p>
                <p className="text-[12px] text-[var(--text-muted)] mt-0.5">
                  {item.count !== null && item.count > 0
                    ? `已完成 ${item.count} ${item.desc}`
                    : '点击开始练习'}
                </p>
              </div>
              <span className="text-[22px] font-extrabold text-[var(--text-primary)]">
                {item.count ?? '—'}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
