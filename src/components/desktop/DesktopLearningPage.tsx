'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LearningEntry {
  label: string;
  desc: string;
  href?: string;
  available: boolean;
  progress?: number;
  icon: string;
  color: string;
}

const ENTRIES: LearningEntry[] = [
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
    label: '默写练习',
    desc: '看中文意思，用韩文默写出来，精准训练拼写能力。',
    href: '/dictation',
    available: true,
    icon: '听',
    color: '#e8a87c',
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

export function DesktopLearningPage() {
  const router = useRouter();
  const [modalEntry, setModalEntry] = useState<LearningEntry | null>(null);

  return (
    <div style={{ animation: 'fade-in .18s ease-out' }}>
      {/* Hero */}
      <div className="desktop-hero tools">
        <span className="desktop-label">▣ 学习</span>
        <h2>学习路线</h2>
        <p>入口保留，完整模板将在正式版上线后陆续推出。</p>
      </div>

      {/* Entries */}
      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        {ENTRIES.map((entry) => (
          <div
            key={entry.label}
            style={{
              borderRadius: 28,
              background: '#fff',
              border: '1px solid var(--desktop-line)',
              boxShadow: '0 10px 26px rgba(78,52,46,.07)',
              padding: '18px 20px',
              cursor: 'pointer',
              transition: 'transform .15s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
            onClick={() => entry.available && entry.href ? router.push(entry.href) : setModalEntry(entry)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{
              width: 52,
              height: 52,
              borderRadius: 18,
              background: `${entry.color}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 800,
              color: entry.color,
              flexShrink: 0,
            }}>
              {entry.icon}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#241917' }}>{entry.label}</p>
              <p style={{ fontSize: 13, color: '#89756e', marginTop: 3, lineHeight: 1.5 }}>{entry.desc}</p>
              {entry.available && entry.progress !== undefined && (
                <div style={{ marginTop: 8, height: 8, borderRadius: 999, background: '#f6ece7', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #aee3d8, #ff7fa8)', width: `${entry.progress}%` }} />
                </div>
              )}
            </div>
            <span style={{
              height: 28,
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0 12px',
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              background: entry.available ? '#fff0f5' : '#f5f0ea',
              color: entry.available ? '#f0799b' : '#a09080',
              border: entry.available ? '1px solid rgba(255,127,168,.16)' : '1px solid #e8ddd5',
              flexShrink: 0,
            }}>
              {entry.available ? '可体验' : '即将推出'}
            </span>
          </div>
        ))}
      </div>

      {/* Coming soon modal */}
      {modalEntry && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.4)' }}
          onClick={() => setModalEntry(null)}
        >
          <div
            style={{ background: '#fff', borderRadius: 28, width: '100%', maxWidth: 400, padding: 28, boxShadow: '0 -8px 40px rgba(0,0,0,.12)', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: `${modalEntry.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: 22, fontWeight: 800, color: modalEntry.color }}>
                {modalEntry.icon}
              </div>
              <p style={{ fontSize: 17, fontWeight: 700, color: '#2f2a26' }}>{modalEntry.label}</p>
              <p style={{ fontSize: 13, color: '#e47a94', fontWeight: 600, marginTop: 4 }}>正式版上线后推出</p>
            </div>
            <div style={{ background: '#fdfaf5', borderRadius: 16, padding: '14px 16px', marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: '#2f2a26', lineHeight: 1.6, textAlign: 'center' }}>
                这个学习路线会在正式版上线后开放。内测阶段你可以先去词汇模块，按级别和场景学习常用韩语单词。
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => { setModalEntry(null); router.push('/vocabulary'); }}
                style={{ flex: 1, padding: '10px 0', borderRadius: 14, border: '1px solid #efe4d8', background: '#fff', color: '#2f2a26', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}
              >
                先去词汇模块
              </button>
            </div>
            <button
              onClick={() => setModalEntry(null)}
              style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: 999, background: '#f5f0ea', border: 'none', cursor: 'pointer', fontSize: 16, color: '#8c8177', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
