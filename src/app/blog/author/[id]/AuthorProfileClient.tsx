'use client';

import '../../blog.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { BlogAuthor, BlogPost } from '@/types';
import { useSmartBack } from '@/lib/useSmartBack';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { PostCard } from '../../PostCard';
import { AvatarFace } from '../../AvatarFace';

export default function AuthorProfileClient({
  author,
  initialPosts,
  initialHasMore,
  followerCount,
  initialFollowing,
}: {
  author: BlogAuthor;
  initialPosts: BlogPost[];
  initialHasMore: boolean;
  followerCount: number;
  initialFollowing: boolean;
}) {
  const { lang } = useLang();
  const goBack = useSmartBack('/blog');
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadingMore, setLoadingMore] = useState(false);
  const [following, setFollowing] = useState(initialFollowing);
  const [followers, setFollowers] = useState(followerCount);
  const [isDesktop, setIsDesktop] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1800);
  }, []);
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  // 关注/取关：乐观切换 + 粉丝数联动 + 失败回滚 + toast
  const toggleFollow = useCallback(async () => {
    const next = !following;
    setFollowing(next);
    setFollowers((n) => Math.max(0, n + (next ? 1 : -1)));
    showToast(next ? '关注成功 ✓' : '已取消关注');
    try {
      const res = await fetch('/api/blog/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ animalId: author.id, following: next }),
      });
      if (!res.ok) {
        setFollowing(!next);
        setFollowers((n) => Math.max(0, n + (next ? -1 : 1)));
        showToast(t('blog.reader_please_login', lang));
      }
    } catch {
      setFollowing(!next);
      setFollowers((n) => Math.max(0, n + (next ? -1 : 1)));
    }
  }, [following, author.id, showToast, lang]);

  // 点赞/收藏：乐观切换 + 落库 + 失败回滚（复用 feed 的 react 语义：快照整表回滚）
  const react = useCallback(
    async (postId: string, patch: { liked?: boolean } | { saved?: boolean }) => {
      const prev = posts;
      setPosts((cur) => cur.map((p) => (p.id === postId ? { ...p, ...patch } : p)));
      try {
        const res = await fetch('/api/blog/react', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, ...patch }),
        });
        if (!res.ok) setPosts(prev);
      } catch {
        setPosts(prev);
      }
    },
    [posts],
  );
  const toggleLike = useCallback((post: BlogPost) => void react(post.id, { liked: !post.liked }), [react]);
  const toggleSave = useCallback((post: BlogPost) => void react(post.id, { saved: !post.saved }), [react]);

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const next = page + 1;
    try {
      const res = await fetch(`/api/blog/author/${author.id}?page=${next}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.posts)) {
          setPosts((cur) => [...cur, ...data.posts]);
          setPage(next);
          setHasMore(Boolean(data.hasMore));
        }
      }
    } catch { /* 忽略 */ }
    finally { setLoadingMore(false); }
  }, [loadingMore, hasMore, page, author.id]);

  return (
    <div className="blog-root blog-author-root">
      <div className="blog-author-page">
        {/* 顶栏：返回 */}
        <div className="blog-author-topbar">
          <button type="button" className="blog-author-back" onClick={goBack} aria-label={t('blog.aria_back', lang)}>←</button>
          <span className="blog-author-topbar-name">{author.name}</span>
        </div>

        {/* 作者头部卡 */}
        <header className={`blog-author-hero blog-hero-${author.theme}`}>
          <div className={`blog-author-hero-av blog-av-${author.id}`}><AvatarFace author={author} /></div>
          <div className="blog-author-hero-name">
            {author.name}
            {author.badge && <span className="blog-author-hero-badge">{author.badge}</span>}
          </div>
          <div className="blog-author-hero-handle">{author.handle}</div>
          {(lang === 'zh' ? author.bioZh : author.bio) && (
            <p className="blog-author-hero-bio">{lang === 'zh' ? (author.bioZh || author.bio) : author.bio}</p>
          )}
          <div className="blog-author-hero-stats">
            <span><b>{followers}</b> {t('blog.author_followers', lang)}</span>
            <span className="blog-author-hero-dot">·</span>
            <span><b>{posts.length}</b> {t('blog.author_posts', lang)}</span>
          </div>
          <button
            type="button"
            className={`blog-author-follow${following ? ' on' : ''}`}
            aria-pressed={following}
            onClick={() => void toggleFollow()}
          >
            {following ? t('blog.author_following', lang) : t('blog.author_follow', lang)}
          </button>
        </header>

        {/* 帖列表（加 blog-list 让复用的 PostCard 命中列表样式；blog-author-postwrap 中和列表页专属副作用）*/}
        <div className="blog-list blog-author-postwrap blog-author-feed">
          {posts.length === 0 ? (
            <div className="blog-author-empty">
              <span className="blog-author-empty-emoji">{author.emoji}</span>
              <p>{t('blog.author_no_posts', lang)}</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                desktop={isDesktop}
                userStats={null}
                onToggleLike={toggleLike}
                onToggleSave={toggleSave}
              />
            ))
          )}
          {hasMore && (
            <button type="button" className="blog-author-more" onClick={() => void loadMore()} disabled={loadingMore}>
              {loadingMore ? '加载中…' : '查看更多'}
            </button>
          )}
        </div>
      </div>

      {toast && <div className="blog-toast">{toast}</div>}
    </div>
  );
}
