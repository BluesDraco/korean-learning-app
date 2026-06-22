'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';

export function DesktopDailyPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [stats, setStats] = useState({ words: 0, sentences: 0, articlesRead: 0 });

  useEffect(() => {
    (async () => {
      try {
        const words = await db.words.count();
        const sentences = 0;
        const readRows = await db.readingProgress.toArray();
        const articlesRead = readRows.filter((r: any) => r.completedAt).length;
        setStats({ words, sentences, articlesRead });
      } catch { /* ignore */ }
    })();
  }, []);

  return (
    <div style={{ animation: 'fade-in .18s ease-out' }}>
      {/* Hero — flex two-column so Tori fills the full height naturally */}
      <div className="desktop-hero today" style={{ display: 'flex', alignItems: 'stretch', padding: 0, overflow: 'hidden' }}>
        {/* Left: text content */}
        <div style={{ flex: 1, padding: '30px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
          <span className="desktop-label">{'토리的 韩语日记'}</span>
          <h2 style={{ marginTop: 12 }}>你好，{user?.nickname ?? '同学'}</h2>
          <p style={{ marginTop: 10 }}>绘本、韩剧表达、韩娱热点，都可以变成你的学习材料。</p>
        </div>
        {/* Right: Tori image fills full height */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-end', paddingRight: 0 }}>
          <Image
            src="/images/tori-hero-daily-desktop.png"
            alt="Tori"
            width={320}
            height={320}
            priority
            unoptimized
            style={{ display: 'block', height: 280, width: 'auto', objectFit: 'contain', objectPosition: 'bottom right' }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="desktop-stat-row">
        <div className="desktop-stat">
          <b>{stats.words || '--'}</b>
          <span>已保存单词</span>
        </div>
        <div className="desktop-stat">
          <b>{stats.sentences || '--'}</b>
          <span>已保存句子</span>
        </div>
        <div className="desktop-stat">
          <b>{stats.articlesRead || '--'}</b>
          <span>热点阅读</span>
        </div>
      </div>

      {/* Recommended modules */}
      <div className="desktop-section">
        <h2>今日推荐</h2>
      </div>
      <div className="desktop-module-grid">
        <div className="desktop-module" onClick={() => router.push('/ai/analyze')}>
          <div className="mini">{'⚙'}</div>
          <h3>文章拆解工具</h3>
          <p>全文翻译、重点词、重点句和语法卡。</p>
        </div>
      </div>

      {/* 我的 */}
      <div className="desktop-section">
        <h2>我的</h2>
      </div>
      <div className="desktop-module-grid">
        <div className="desktop-module" onClick={() => router.push('/mine/dictation-mistakes')}>
          <div className="mini">✎</div>
          <h3>我的错题</h3>
          <p>默写答错的词，集中复习薄弱项。</p>
        </div>
        <div className="desktop-module" onClick={() => router.push('/mine/recordings')}>
          <div className="mini">🎤</div>
          <h3>我的录音</h3>
          <p>发音练习的录音记录，回听对比。</p>
        </div>
        <div className="desktop-module" onClick={() => router.push('/achievement/card')}>
          <div className="mini">✦</div>
          <h3>我的成就</h3>
          <p>学习里程碑与成就徽章。</p>
        </div>
        <div className="desktop-module" onClick={() => router.push('/messages')}>
          <div className="mini">✉</div>
          <h3>消息</h3>
          <p>系统消息与通知。</p>
        </div>
      </div>
    </div>
  );
}
