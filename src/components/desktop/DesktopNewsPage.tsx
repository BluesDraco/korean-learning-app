'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getHotPosts } from '@/data/koreanHotPosts';
import type { KoreanHotReading } from '@/types';
import { db } from '@/lib/db';

export function DesktopNewsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<KoreanHotReading[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setPosts(getHotPosts());
    (async () => {
      try {
        const all = await db.readingProgress.toArray();
        setReadIds(new Set(all.filter((r: any) => r.completedAt).map((r: any) => r.postId)));
      } catch {}
    })();
  }, []);

  const firstPost = posts[0];

  return (
    <div style={{ animation: 'fade-in .18s ease-out' }}>
      {/* Hero — compact, no large image */}
      <div className="desktop-hero news">
        <span className="desktop-label">韩娱热点阅读</span>
        <h2>读真实热点，点词看懂韩语</h2>
        <p>Naver News 韩文原文 + AI 翻译 + 逐词拆解 + 语法解析。</p>
        <div className="desktop-btnrow">
          {firstPost && (
            <button className="desktop-btn black" onClick={() => router.push(`/korea/kpop/news/${firstPost.id}`)}>
              开始阅读
            </button>
          )}
          <button className="desktop-btn white" onClick={() => router.push('/korea/kpop/news')}>
            浏览全部
          </button>
        </div>
      </div>

      {/* Article list */}
      <div className="desktop-section">
        <h2>今日热点阅读</h2>
        <span>{posts.length} 篇</span>
      </div>
      <div className="desktop-article-list">
        {posts.slice(0, 6).map((post) => (
          <ArticleItem
            key={post.id}
            post={post}
            isRead={readIds.has(post.id)}
            onClick={() => router.push(`/korea/kpop/news/${post.id}`)}
          />
        ))}
        {posts.length === 0 && (
          <div className="desktop-card">
            <p style={{ textAlign: 'center', padding: '40px 0' }}>暂无热点内容，敬请期待。</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ArticleItem({ post, isRead, onClick }: { post: KoreanHotReading; isRead: boolean; onClick: () => void }) {
  const totalSentences = post.paragraphs?.reduce((sum, p) => sum + p.sentences.length, 0) ?? 0;
  const totalTokens = post.paragraphs?.reduce((sum, p) => sum + p.sentences.reduce((s, sen) => s + sen.tokens.length, 0), 0) ?? 0;
  const totalGrammar = post.paragraphs?.reduce((sum, p) => sum + p.sentences.reduce((s, sen) => s + sen.grammarNotes.length, 0), 0) ?? 0;

  return (
    <div className="desktop-article" onClick={onClick}>
      <div className="desktop-article-img" />
      <div className="desktop-item-main">
        <h3>{post.originalTitleKo}</h3>
        <p>{post.titleZh}</p>
        <div className="desktop-pills">
          <span>{post.sourceName}</span>
          <span>{totalSentences} 原文句</span>
          <span>{totalTokens} 可点词</span>
          <span>{totalGrammar} 语法点</span>
        </div>
      </div>
      <span className="desktop-status-pill">{isRead ? '已读' : '阅读'}</span>
    </div>
  );
}
