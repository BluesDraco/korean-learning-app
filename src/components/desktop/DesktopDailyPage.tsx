'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { db } from '@/lib/db';
import { getAllSongProgress } from '@/lib/kpop/progress';

export function DesktopDailyPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ words: 0, sentences: 0, kpopDone: 0, articlesRead: 0 });

  useEffect(() => {
    (async () => {
      try {
        const words = await db.words.count();
        const sentences = 0;
        const prog = getAllSongProgress();
        const kpopDone = prog.filter((p: any) => p.practicedLines > 0 && p.practicedLines >= p.totalLines).length;
        const readRows = await db.readingProgress.toArray();
        const articlesRead = readRows.filter((r: any) => r.completedAt).length;
        setStats({ words, sentences, kpopDone, articlesRead });
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
          <h2 style={{ marginTop: 12 }}>用喜欢的内容学韩语</h2>
          <p style={{ marginTop: 10 }}>KPOP、韩娱热点、绘本和韩剧表达，都可以变成你的学习材料。</p>
          <div className="desktop-btnrow" style={{ marginTop: 20 }}>
            <button className="desktop-btn black" onClick={() => router.push('/korea/kpop')}>
              继续 KPOP 跟唱
            </button>
            <button className="desktop-btn white" onClick={() => router.push('/korea/kpop/news')}>
              读一篇热点
            </button>
          </div>
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
          <b>{stats.kpopDone || '--'}</b>
          <span>跟唱歌曲</span>
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
        <div className="desktop-module" onClick={() => router.push('/korea/kpop')}>
          <div className="mini">{'♪'}</div>
          <h3>KPOP 逐句歌词学习</h3>
          <p>原唱怎么唱、正常韩语怎么读、中文是什么意思。</p>
        </div>
        <div className="desktop-module" onClick={() => router.push('/korea/kpop/news')}>
          <div className="mini">{'◈'}</div>
          <h3>韩娱热点阅读</h3>
          <p>先读完整原文，再逐句精读和点词保存。</p>
        </div>
        <div className="desktop-module" onClick={() => router.push('/ai/analyze')}>
          <div className="mini">{'⚙'}</div>
          <h3>文章拆解工具</h3>
          <p>全文翻译、重点词、重点句和语法卡。</p>
        </div>
      </div>
    </div>
  );
}
