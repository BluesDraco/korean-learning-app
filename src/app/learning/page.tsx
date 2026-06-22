'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ArrowRight } from 'lucide-react';
import { DesktopLearningPage } from '@/components/desktop/DesktopLearningPage';

interface LearningEntry {
  label: string;
  desc: string;
  href?: string;
  available: boolean;
  progress?: number;
  icon: string;
  color: string;
}

const entries: LearningEntry[] = [
  {
    label: '韩文字母入门',
    desc: '从 40 音开始，听标准发音，再学习音节拼装。',
    href: '/phonetics',
    available: true,
    progress: 58,
    icon: '音',
    color: '#b49ccf',
  },
  {
    label: '30 天入门模板',
    desc: '适合第一次开始自学韩语的人，每天一个小任务。',
    available: false,
    icon: '课',
    color: '#e47a94',
  },
  {
    label: 'TOPIK 备考模板',
    desc: '按题型整理词汇、阅读和写作练习路线。',
    href: '/topik',
    available: true,
    icon: '考',
    color: '#b49ccf',
  },
  {
    label: '发音跟读',
    desc: '录音对比标准发音，练习韩语语调和单音。',
    href: '/pronunciation',
    available: true,
    icon: '音',
    color: '#e47a94',
  },
  {
    label: '听说练习',
    desc: '看中文意思，用韩语说出来。语音识别自动判断准确度。',
    href: '/listening',
    available: true,
    icon: '听',
    color: '#e8a87c',
  },
  {
    label: '默写练习',
    desc: '看中文意思，用韩文默写出来，精准训练拼写能力。',
    href: '/dictation',
    available: true,
    icon: '默',
    color: '#81b5a1',
  },
  {
    label: '写作练习',
    desc: '用韩语写句子，AI 给出参考例句对照。',
    href: '/writing',
    available: true,
    icon: '写',
    color: '#81b5a1',
  },
];

export default function LearningPage() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEntry, setModalEntry] = useState<LearningEntry | null>(null);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isDesktop) return <DesktopLearningPage />;

  const openModal = (entry: LearningEntry) => {
    if (entry.available) return;
    setModalEntry(entry);
    setModalOpen(true);
  };

  return (
    <div className="py-4 space-y-3 max-w-2xl mx-auto md:max-w-3xl">
      {/* Compact header card */}
      <div className="rounded-[30px] bg-gradient-to-br from-white via-[#fff2f6] to-[#effaf6] border border-[var(--border-default)] shadow-[0_16px_40px_rgba(78,52,46,.10)] p-4 relative overflow-hidden mb-4">
        <div className="absolute -right-7 -top-7 w-[120px] h-[120px] rounded-full bg-[rgba(255,127,168,.08)]" />
        <div className="flex items-center gap-3.5 relative z-[1]">
          <div className="w-[58px] h-[58px] rounded-3xl bg-[#fff0f5] text-[#f0799b] grid place-items-center text-[18px] font-extrabold shrink-0">路</div>
          <div>
            <h1 className="text-[23px] font-bold text-[var(--text-primary)] tracking-[-.5px] leading-tight">学习路线</h1>
            <p className="mt-1.5 text-[13px] text-[var(--text-muted)] leading-snug">入口保留，完整模板将在正式版上线后陆续推出。</p>
          </div>
        </div>
      </div>

      {/* Learning entries */}
      {entries.map((entry) => {
        const inner = (
          <div className="rounded-[28px] p-4 bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[0_16px_40px_rgba(78,52,46,.10)]">
            <div className="flex items-start justify-between gap-2.5">
              <h3 className="text-[16px] font-bold text-[var(--text-primary)]">{entry.label}</h3>
              <span className={`inline-flex items-center h-[26px] px-2.5 rounded-full text-[11px] font-extrabold border shrink-0 whitespace-nowrap ${
                entry.available
                  ? 'bg-[#fff0f5] text-[#f0799b] border-[rgba(255,127,168,.16)]'
                  : 'bg-[#fff0f5] text-[#f0799b] border-[rgba(255,127,168,.16)]'
              }`}>
                {entry.available ? '可体验' : '即将推出'}
              </span>
            </div>
            <p className="mt-1.5 text-[13px] text-[var(--text-muted)] leading-snug">{entry.desc}</p>
            {entry.available && entry.progress !== undefined && (
              <div className="mt-3.5 h-[9px] rounded-full bg-[#f6ece7] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#aee3d8] to-[#ff7fa8]" style={{ width: `${entry.progress}%` }} />
              </div>
            )}
          </div>
        );

        if (entry.available && entry.href) {
          return (
            <Link key={entry.label} href={entry.href} className="block active:scale-[0.98] transition-transform">
              {inner}
            </Link>
          );
        }

        return (
          <button
            key={entry.label}
            onClick={() => openModal(entry)}
            className="block w-full text-left active:scale-[0.98] transition-transform"
          >
            {inner}
          </button>
        );
      })}

      {/* Coming Soon Modal */}
      {modalOpen && modalEntry && (
        <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }} onClick={() => setModalOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative bg-[var(--bg-card)] rounded-t-[28px] sm:rounded-[28px] w-full sm:max-w-sm p-6 pb-[calc(24px+env(safe-area-inset-bottom,0px))] sm:pb-6 space-y-5 animate-slide-up shadow-[0_-8px_40px_rgba(0,0,0,0.12)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="w-10 h-1 rounded-full bg-[var(--border-default)] mx-auto sm:hidden" />

            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto" style={{ backgroundColor: `${modalEntry.color}18` }}>
                <span className="text-[22px] font-extrabold" style={{ color: modalEntry.color }}>{modalEntry.icon}</span>
              </div>
              <div>
                <p className="text-[17px] font-bold text-[var(--text-primary)]">{modalEntry.label}</p>
                <p className="text-[13px] text-[#e47a94] font-medium mt-1">正式版上线后推出</p>
              </div>
            </div>

            <div className="bg-[var(--bg-muted)] rounded-2xl p-4 text-center space-y-2">
              <p className="text-[13px] text-[var(--text-primary)] leading-relaxed">
                这个学习路线会在正式版上线后开放。
              </p>
              <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">
                内测阶段你可以先去词汇模块，按级别和场景学习常用韩语单词。
              </p>
              <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">
                正式版中，这里会提供更完整的自学路径和每日学习任务。
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setModalOpen(false)}
                className="w-full py-3 bg-[#e47a94] text-white rounded-2xl text-[14px] font-bold active:scale-95 transition-transform"
              >
                我知道了
              </button>
              <div className="flex gap-2">
                <Link
                  href="/vocabulary"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 flex items-center justify-center gap-1 py-2.5 border border-[var(--border-default)] text-[var(--text-primary)] rounded-2xl text-[13px] font-medium active:scale-95 transition-transform"
                >
                  先去词汇模块
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--bg-muted)] flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--bg-accent)] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
