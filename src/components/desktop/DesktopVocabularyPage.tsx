'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const QUICK_LINKS = [
  { icon: '📖', label: '韩语词库', desc: '主题词包 · 分级词表 · 延世教材 · 情景词典', href: '/vocabulary/library', color: '#ff7fa8' },
  { icon: '🔄', label: '闪卡复习', desc: 'SRS 间隔复习，巩固已学单词', href: '/review', color: '#81b5a1' },
  { icon: '📚', label: '我的单词本', desc: '按主题分组管理单词', href: '/vocabulary/books', color: '#b49ccf' },
  { icon: '🔖', label: '我的句子', desc: '保存的句子 · 语法拆解 · 打字练习', href: '/vocabulary?tab=sentences', color: '#e8a87c' },
];

interface Stats {
  total: number;
  mastered: number;
  learning: number;
  dueReview: number;
}

export function DesktopVocabularyPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({ total: 0, mastered: 0, learning: 0, dueReview: 0 });

  useEffect(() => {
    (async () => {
      try {
        const { db } = await import('@/lib/db');
        const now = Date.now();
        const [total, mastered, learning, dueWords] = await Promise.all([
          db.words.count(),
          db.words.where('mastery').equals('mastered').count(),
          db.words.where('mastery').anyOf('learning', 'reviewing').count(),
          db.words.where('nextReview').belowOrEqual(now).toArray(),
        ]);
        const dueReview = dueWords.filter((w: any) => w.mastery !== 'mastered').length;
        setStats({ total, mastered, learning, dueReview });
      } catch { /* ignore */ }
    })();
  }, []);

  return (
    <div style={{ animation: 'fade-in .18s ease-out' }}>
      {/* Hero */}
      <div className="desktop-hero vocabulary">
        <span className="desktop-label">◈ 词汇</span>
        <h2>我的单词与词库</h2>
        <p>保存单词、闪卡复习、整理单词本，把遇到的韩语词汇变成长期记忆。</p>
      </div>

      {/* Stats row */}
      <div className="desktop-stat-row">
        <div className="desktop-stat">
          <b>{stats.total || '—'}</b>
          <span>已保存单词</span>
        </div>
        <div className="desktop-stat">
          <b>{stats.mastered || '—'}</b>
          <span>已掌握</span>
        </div>
        <div className="desktop-stat">
          <b>{stats.learning || '—'}</b>
          <span>学习中</span>
        </div>
        <div className="desktop-stat" style={{ cursor: stats.dueReview > 0 ? 'pointer' : 'default' }} onClick={() => stats.dueReview > 0 && router.push('/review')}>
          <b style={{ color: stats.dueReview > 0 ? '#ff7fa8' : undefined }}>{stats.dueReview || '—'}</b>
          <span>待复习{stats.dueReview > 0 ? ' →' : ''}</span>
        </div>
      </div>

      {/* Quick links grid */}
      <div className="desktop-section" style={{ marginTop: 20 }}>
        <h2>全部功能</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {QUICK_LINKS.map((item) => (
          <div
            key={item.href}
            className="desktop-card"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, transition: 'transform .15s ease' }}
            onClick={() => router.push(item.href)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              background: `${item.color}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
              flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#241917' }}>{item.label}</p>
              <p style={{ fontSize: 12, color: '#89756e', marginTop: 3, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA if due words */}
      {stats.dueReview > 0 && (
        <div
          style={{
            marginTop: 20,
            borderRadius: 20,
            background: 'linear-gradient(135deg, #fff0f5 0%, #eaf8f5 100%)',
            border: '1px solid rgba(255,127,168,.2)',
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
          onClick={() => router.push('/review')}
        >
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#241917' }}>有 {stats.dueReview} 个单词等待复习</p>
            <p style={{ fontSize: 12, color: '#89756e', marginTop: 4 }}>趁记忆还热，现在复习效果最好。</p>
          </div>
          <button style={{
            background: '#ff7fa8',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            padding: '10px 22px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            flexShrink: 0,
          }}>
            开始复习
          </button>
        </div>
      )}
    </div>
  );
}
