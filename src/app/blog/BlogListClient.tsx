'use client';

import './blog.css';

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import type { BlogPost, BlogUserStats, RadioCard, BlogNotification } from '@/types';
import { BLOG_CAST, getBlogAuthor } from '@/data/blogCast';
import { getBlogAvatar } from '@/data/blogAvatars';
import { stripEmoji } from '@/lib/blogText';
import { PostCard } from './PostCard';
import { AvatarFace } from './AvatarFace';
import { useSmartBack } from '@/lib/useSmartBack';
import BlogOnboarding from './BlogOnboarding';
import BlogComposer from './BlogComposer';
import PlaceIntro from '@/components/PlaceIntro';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';

// 每日热度榜条目（后台二审入选、公开安全字段）
interface RankingEntry {
  [k: string]: unknown;
  slug: string;
  rank: number;
  text: string;
  coverImageUrl: string;
  coverTheme: string;
  coverEmoji: string;
  likeCount: number;
  authorNickname: string;
  authorAnimalId: string;
}

function levelTitle(level: number, lang: Lang): string {
  return t(`blog.level_${Math.min(Math.max(level - 1, 0), 4)}`, lang);
}

// 当前等级内的 XP 进度（levelForXp = floor(xp/100)+1，故每级 100 XP）
function xpProgress(xp: number): { pct: number; into: number; need: number } {
  const into = xp % 100;
  return { pct: into, into, need: 100 };
}


// 左栏功能导航（仿真实社媒：홈/알림/북마크/프로필）
type FuncKey = 'home' | 'notice' | 'bookmark' | 'profile';
const FUNC_NAV: { key: FuncKey; icon: string }[] = [
  { key: 'home', icon: '🏠' },
  { key: 'notice', icon: '🔔' },
  { key: 'bookmark', icon: '🔖' },
  { key: 'profile', icon: '🐾' },
];

function funcNavLabel(key: FuncKey, lang: Lang): string {
  return t(`blog.func_${key}`, lang);
}

// 顶部分类 chips（전체 = 全部）
// ── 城镇 Hero 横幅：动物城世界感入口 ──
function TownHero({ activeCount, currentDay }: { activeCount: number; currentDay: number }) {
  const { lang } = useLang();
  return (
    <div className="blog-town-hero blog-enter-hero">
      <span className="blog-town-hero-spot l" />
      <span className="blog-town-hero-spot r" />
      <div className="blog-town-floats">
        <span className="blog-town-float">🐰</span>
        <span className="blog-town-float">🦊</span>
        <span className="blog-town-float">🐻</span>
      </div>
      <div className="blog-town-hero-inner">
        <div className="blog-town-eyebrow">{t('blog.hero_eyebrow', lang)}</div>
        <div className="blog-town-title">{t('blog.hero_title', lang)}</div>
        <div className="blog-town-sub">{t('blog.hero_sub', lang)}</div>
        <div className="blog-town-status">
          <span className="blog-town-live-dot" />
          {t('blog.status_online', lang, { n: activeCount })}
          <span className="blog-town-day">{t('blog.status_day', lang, { day: currentDay })}</span>
        </div>
      </div>
    </div>
  );
}

// ── 我的资料卡：等级环 + XP 进度 + 统计芯片 + 출석 火苗 ──
function ProfileCard({
  stats,
  currentDay,
  likedCount,
  savedCount,
}: {
  stats: BlogUserStats;
  currentDay: number;
  likedCount: number;
  savedCount: number;
}) {
  const { lang } = useLang();
  const avatar = getBlogAvatar(stats.animalId);
  const { pct, into, need } = xpProgress(stats.xp);
  return (
    <div className="blog-profile-card">
      <div className="blog-profile-card-top">
        <div className="blog-ring" style={{ ['--p' as string]: pct }}>
          <div className="blog-ring-face">{avatar?.emoji ?? '🐰'}</div>
          <span className="blog-ring-lv">Lv.{stats.level}</span>
        </div>
        <div className="blog-profile-card-id">
          <div className="blog-profile-card-nick">{stats.nickname || t('blog.nickname_default', lang)}</div>
          <div className="blog-profile-card-title">{levelTitle(stats.level, lang)}</div>
        </div>
      </div>
      <div className="blog-xp-bar">
        <div className="blog-xp-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="blog-xp-label">
        <span>{t('blog.xp_to_next', lang)}</span>
        <span>{into} / {need} XP</span>
      </div>
      <div className="blog-profile-chips">
        <div className="blog-chip">
          <div className="blog-chip-num">{stats.postCount}</div>
          <div className="blog-chip-lbl">{t('blog.stat_posts', lang)}</div>
        </div>
        <div className="blog-chip">
          <div className="blog-chip-num">{likedCount}</div>
          <div className="blog-chip-lbl">{t('blog.stat_likes', lang)}</div>
        </div>
        <div className="blog-chip">
          <div className="blog-chip-num">{savedCount}</div>
          <div className="blog-chip-lbl">{t('blog.stat_bookmarks', lang)}</div>
        </div>
      </div>
      <div className="blog-streak">
        <span className="blog-streak-fire">🔥</span>
        {t('blog.profile_day', lang, { day: currentDay })}
      </div>
    </div>
  );
}

// ── 关注按钮（受控：真实关注态落库，父级传 following + onToggle）──
function FollowButton({ following, onToggle }: { following: boolean; onToggle: () => void }) {
  const { lang } = useLang();
  return (
    <button
      type="button"
      className={`blog-follow-mini${following ? ' on' : ''}`}
      aria-pressed={following}
      onClick={onToggle}
    >
      {following ? t('blog.following', lang) : t('blog.follow', lang)}
    </button>
  );
}

// ── 单条帖子卡片（mobile feed + desktop 3-col 共用；desktop 展示数字 count）──

// ── 骨架屏占位卡（首屏加载 / 加载更多）──
function PostSkeleton() {
  return (
    <div className="blog-skel" aria-hidden>
      <div className="blog-skel-head">
        <div className="blog-skel-av blog-skel-shimmer" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div className="blog-skel-line blog-skel-shimmer" style={{ width: '40%' }} />
          <div className="blog-skel-line blog-skel-shimmer" style={{ width: '25%' }} />
        </div>
      </div>
      <div className="blog-skel-cover blog-skel-shimmer" />
      <div className="blog-skel-line blog-skel-shimmer" style={{ width: '90%', marginBottom: 8 }} />
      <div className="blog-skel-line blog-skel-shimmer" style={{ width: '70%' }} />
    </div>
  );
}

// ── 电台卡（混入 feed）：动物城电台当天节目，点击跳 /radio/{id} 收听 ──
function RadioFeedCard({ card }: { card: RadioCard }) {
  const { lang } = useLang();
  return (
    <article className="blog-radio-card blog-post-enter">
      <Link href={`/radio/${card.id}`} className={`blog-radio-inner radio-soft-${card.coverColor}`}>
        <span className="blog-radio-badge">
          <span className="blog-radio-live-dot" />
          {t('blog.radio_label', lang)}
        </span>
        <span className="blog-radio-body">
          <span className="blog-radio-cover">{card.hostEmoji}</span>
          <span className="blog-radio-text">
            <span className="blog-radio-title">{card.title}</span>
            <span className="blog-radio-zh">{card.titleZh}</span>
            <span className="blog-radio-meta">
              {card.host} · {card.level} · {card.duration} · {t('blog.radio_schedule_at', lang)} {card.scheduleTime}
            </span>
          </span>
          <span className="blog-radio-play" aria-hidden>▶</span>
        </span>
      </Link>
    </article>
  );
}

export default function BlogListClient() {
  const { lang } = useLang();
  const goBack = useSmartBack('/diary');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // 递增触发路人帖重新采样（下拉/刷新按钮）
  const feedEpochRef = useRef(0); // 刷新/重载时 bump，在途的旧 loadMore 响应据此丢弃，防污染新 feed
  const [refreshing, setRefreshing] = useState(false); // 下拉刷新中（转圈）
  const [pullY, setPullY] = useState(0); // 下拉手势的视觉位移（px）
  const [funcNav, setFuncNav] = useState<FuncKey>('home');
  const [feedMode, setFeedMode] = useState<'recommend' | 'following'>('recommend'); // 홈 顶部「추천/팔로잉」切换
  const [authorFilter, setAuthorFilter] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [stats, setStats] = useState<BlogUserStats | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [needOnboarding, setNeedOnboarding] = useState(false);
  const [showComposer, setShowComposer] = useState(false);
  const [board, setBoard] = useState<RankingEntry[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [activeCount, setActiveCount] = useState(BLOG_CAST.length); // Hero「在线」氛围数（客户端浮动，纯展示不落库）
  const [radioCards, setRadioCards] = useState<RadioCard[]>([]);
  const [notifs, setNotifs] = useState<BlogNotification[]>([]);
  const [unread, setUnread] = useState(0);
  const [follows, setFollows] = useState<Set<string>>(new Set());
  const [menuOpen, setMenuOpen] = useState(false);       // 移动端右上角 ☰ 抽屉
  const [introSignal, setIntroSignal] = useState(0);     // 「再看一次介绍」重开信号
  // 入场动画只在首次进入播一次；播完加 .blog-entered 关掉，之后切 tab 让 Hero 等
  // 元素 remount 时不再重播（原每次点 tab 导航都重播一次）。
  const [entered, setEntered] = useState(false);

  // 入场动画播完（最长 .55s + .15s 延迟）后关闭，避免切 tab 时 Hero 等元素重播
  useEffect(() => {
    const timer = setTimeout(() => setEntered(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // 只有首屏（组件挂载后第一次拉取）显示全屏三骨架；之后切 tab 触发的重拉不再整页替换，
  // 避免북마크↔프로필切换时页面「闪一下重刷」。切 tab 时用 feed 区内联的「불러오는 중…」占位。
  const firstLoadDone = useRef(false);

  // 桌面/移动布局判定（CSS 仅在桌面隐藏 topbar/stories，侧栏需在移动端不渲染）
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // 桌面 cursor glow：跟随鼠标的柔光点（仅精细指针设备）
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia('(min-width: 768px) and (pointer: fine)').matches) return;
    const el = glowRef.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [isDesktop]);

  // 视口变宽到桌面时抽屉 DOM 会消失（!isDesktop 条件），需同步关掉 menuOpen，
  // 否则 body scroll 锁残留且桌面无关闭入口（☰ 仅移动端渲染）
  useEffect(() => {
    if (isDesktop && menuOpen) setMenuOpen(false);
  }, [isDesktop, menuOpen]);

  // 抽屉打开时锁背景滚动 + Esc 关闭
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  interface BlogPage { posts: BlogPost[]; page: number; hasMore: boolean; totalPages: number }

  // 북마크视图：列表改从后端拉「我的收藏」（全量分页），而非只筛已加载的帖
  const savedView = funcNav === 'bookmark';
  // 프로필视图：从后端拉「我发的帖」（全量分页，含未通过审核的）
  const mineView = funcNav === 'profile';
  // feed 后端过滤：我的/收藏视图优先；否则 홈 的「팔로잉」模式只拉已关注动物的帖
  const feedFilter = mineView
    ? '&filter=mine'
    : savedView
      ? '&filter=saved'
      : feedMode === 'following'
        ? '&filter=following'
        : '';

  // 首页加载（也用于出错重试 / 切换收藏视图 / 切换 추천↔팔로잉）：重置到第 1 页
  const loadPosts = useCallback(async () => {
    const epoch = ++feedEpochRef.current; // 新一轮 feed：让在途的旧 loadMore 作废
    setLoading(true);
    setLoadError(false);
    try {
      const r = await fetch(`/api/blog?page=1&limit=20&r=${refreshKey}${feedFilter}`);
      if (feedEpochRef.current !== epoch) return; // 期间又发生了刷新，丢弃本次结果
      if (!r.ok) throw new Error('fetch failed');
      const data = (await r.json()) as BlogPage;
      setPosts(data.posts);
      setPage(1);
      setHasMore(data.hasMore);
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setPullY(0);
      firstLoadDone.current = true;
    }
  }, [feedFilter, refreshKey]);

  // 刷新：bump refreshKey → loadPosts 经 effect 重跑（路人帖换一批）。回顶部。
  const doRefresh = useCallback(() => {
    if (loading || refreshing) return;
    setRefreshing(true);
    setRefreshKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loading, refreshing]);

  // 手机下拉刷新：仅在滚到顶部时捕获下拉手势，位移带阻尼；超过阈值松手触发刷新。
  const PULL_THRESHOLD = 70;
  const pullStartRef = useRef<number | null>(null);
  useEffect(() => {
    if (isDesktop) return;
    const onStart = (e: TouchEvent) => {
      if (window.scrollY <= 0 && !refreshing) pullStartRef.current = e.touches[0].clientY;
      else pullStartRef.current = null;
    };
    const onMove = (e: TouchEvent) => {
      if (pullStartRef.current === null) return;
      const dy = e.touches[0].clientY - pullStartRef.current;
      if (dy <= 0) { setPullY(0); return; }
      setPullY(Math.min(dy * 0.5, 90)); // 阻尼 0.5，封顶 90px
    };
    const onEnd = () => {
      if (pullStartRef.current === null) return;
      setPullY((y) => {
        if (y >= PULL_THRESHOLD) doRefresh();
        return y >= PULL_THRESHOLD ? y : 0; // 触发时保留位移，等 loadPosts 归零
      });
      pullStartRef.current = null;
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [isDesktop, refreshing, doRefresh]);

  // 无限滚动：追加下一页
  const loadMore = useCallback(async () => {
    if (loadingMore || loading || !hasMore) return;
    const epoch = feedEpochRef.current; // 记下发起时的 feed 轮次
    setLoadingMore(true);
    const next = page + 1;
    try {
      const r = await fetch(`/api/blog?page=${next}&limit=20&r=${refreshKey}${feedFilter}`);
      if (!r.ok) throw new Error('fetch failed');
      const data = (await r.json()) as BlogPage;
      if (feedEpochRef.current !== epoch) return; // 期间发生了刷新，别把旧页追加进新 feed
      setPosts((cur) => [...cur, ...data.posts]);
      setPage(next);
      setHasMore(data.hasMore);
    } catch {
      /* 追加失败静默：sentinel 仍在，下次进视口重试 */
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, loading, hasMore, page, feedFilter, refreshKey]);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  // 加载我的博客档案（形象/经验）。未登录 401 → 无档案，不弹引导。
  useEffect(() => {
    let alive = true;
    fetch('/api/blog/profile')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive) return;
        const s: BlogUserStats | null = data?.stats ?? null;
        setStats(s);
        if (typeof data?.currentDay === 'number') setCurrentDay(Math.max(1, data.currentDay));
        setNeedOnboarding(Boolean(data) && (!s || !s.animalId));
      })
      .catch(() => { /* 忽略 */ })
      .finally(() => { if (alive) setProfileLoaded(true); });
    return () => { alive = false; };
  }, []);

  // 加载今日公开热度榜（后台二审入选的 TOP3）
  useEffect(() => {
    let alive = true;
    fetch('/api/blog/ranking')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (alive && data?.board) setBoard(data.board); })
      .catch(() => { /* 忽略 */ });
    return () => { alive = false; };
  }, []);

  // 加载当天电台节目（按用户 Day 解锁，与博客同一时间轴），混入 feed
  useEffect(() => {
    let alive = true;
    fetch('/api/blog/radio')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (alive && Array.isArray(data?.cards)) setRadioCards(data.cards); })
      .catch(() => { /* 忽略 */ });
    return () => { alive = false; };
  }, []);

  // 加载通知（未登录返回空）。unread 用于 알림 tab 红点
  const loadNotifs = useCallback(async () => {
    try {
      const r = await fetch('/api/blog/notifications');
      if (!r.ok) return;
      const data = (await r.json()) as { items: BlogNotification[]; unread: number };
      setNotifs(data.items);
      setUnread(data.unread);
    } catch { /* 忽略 */ }
  }, []);
  useEffect(() => { void loadNotifs(); }, [loadNotifs]);

  // 加载已关注动物（未登录返回空）
  useEffect(() => {
    let alive = true;
    fetch('/api/blog/follow')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => { if (alive && Array.isArray(data?.follows)) setFollows(new Set(data.follows)); })
      .catch(() => { /* 忽略 */ });
    return () => { alive = false; };
  }, []);

  // 关注/取关：乐观切换 + 失败（含 401）回滚
  const toggleFollow = useCallback(async (animalId: string) => {
    const following = !follows.has(animalId);
    setFollows((cur) => {
      const next = new Set(cur);
      if (following) next.add(animalId); else next.delete(animalId);
      return next;
    });
    try {
      const res = await fetch('/api/blog/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ animalId, following }),
      });
      if (!res.ok) throw new Error('failed');
    } catch {
      setFollows((cur) => {
        const next = new Set(cur);
        if (following) next.delete(animalId); else next.add(animalId);
        return next;
      });
    }
  }, [follows]);

  // 乐观切换 + 失败（含 401）回滚
  const react = useCallback(
    async (postId: string, patch: { liked?: boolean } | { saved?: boolean }) => {
      // 回滚只针对这一条 + 只还原本次改的字段：避免存整数组快照造成
      // ①并发点赞/收藏时先发的失败把后成功的抹掉 ②切 tab 后旧请求失败把旧 feed 灌回当前视图。
      const key = 'liked' in patch ? 'liked' : 'saved';
      const revert = (p: BlogPost) =>
        p.id === postId ? { ...p, [key]: !p[key] } : p;
      setPosts((cur) => cur.map((p) => (p.id === postId ? { ...p, ...patch } : p)));
      try {
        const res = await fetch('/api/blog/react', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId, ...patch }),
        });
        if (!res.ok) setPosts((cur) => cur.map(revert)); // 401 未登录 / 其他错误 → 回滚这一条
      } catch {
        setPosts((cur) => cur.map(revert));
      }
    },
    [],
  );

  const toggleLike = useCallback(
    (post: BlogPost) => react(post.id, { liked: !post.liked }),
    [react],
  );
  const toggleSave = useCallback(
    (post: BlogPost) => react(post.id, { saved: !post.saved }),
    [react],
  );

  // 删除自己的帖：乐观从列表移除 + 后端删除。失败则回滚。
  // 用函数式更新捕获快照，不依赖 posts，避免 deletePost/feed 每次 posts 变都重建（入场动画重播）。
  const deletePost = useCallback(async (post: BlogPost) => {
    let snapshot: BlogPost[] = [];
    setPosts((cur) => {
      snapshot = cur;
      return cur.filter((p) => p.id !== post.id);
    });
    // 本地同步 post_count -1（档案卡帖子数即时反映）
    setStats((s) => (s ? { ...s, postCount: Math.max(0, s.postCount - 1) } : s));
    try {
      const res = await fetch('/api/blog/post', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: post.slug }),
      });
      if (!res.ok) throw new Error('delete failed');
    } catch {
      setPosts(snapshot); // 回滚列表
      setStats((s) => (s ? { ...s, postCount: s.postCount + 1 } : s));
      if (typeof window !== 'undefined') window.alert(t('blog.delete_failed', lang));
    }
  }, [lang]);

  // 全部已读：乐观清红点 + 后端标记
  const markAllRead = useCallback(async () => {
    if (unread === 0) return;
    setUnread(0);
    setNotifs((cur) => cur.map((n) => ({ ...n, isRead: true })));
    try { await fetch('/api/blog/notifications/read', { method: 'POST' }); } catch { /* 忽略 */ }
  }, [unread]);

  // 功能导航点击：홈/탐색=回 feed 全部、북마크=只看收藏、알림=打开即全部已读、프로필=无档案则引导
  const onFuncNav = useCallback((key: FuncKey) => {
    setFuncNav(key);
    if (key === 'notice') void markAllRead();
    if (key === 'profile') {
      setStats((s) => {
        if (!s || !s.animalId) setNeedOnboarding(true);
        return s;
      });
    }
  }, [markAllRead]);

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (funcNav !== 'bookmark' || p.saved) &&
          // 我的主页：后端已过滤成"我发的帖"，不再叠加动物作者筛选
          (funcNav === 'profile' || !authorFilter || p.authorId === authorFilter),
      ),
    [posts, funcNav, authorFilter],
  );

  const likedCount = useMemo(() => posts.filter((p) => p.liked).length, [posts]);
  const savedCount = useMemo(() => posts.filter((p) => p.saved).length, [posts]);
  const savedPosts = useMemo(() => posts.filter((p) => p.saved), [posts]);

  // 推荐关注：排除自己(tori)、官方号(news)、已关注的，挑前 4 只做「팔로우」建议
  const suggestFriends = useMemo(
    () => BLOG_CAST.filter((a) => a.id !== 'tori' && a.id !== 'news' && !follows.has(a.id)).slice(0, 4),
    [follows],
  );

  // 电台卡只在「전체 / 🎧 듣기」两个视图混入（分类筛选/북마크视图不混），每隔 4 帖插一张
  const showRadio = radioCards.length > 0 && funcNav === 'home' && feedMode !== 'following';
  const feed = useMemo(() => {
    const items: ReactNode[] = [];
    let r = 0;
    filtered.forEach((post, i) => {
      items.push(
        <PostCard
          key={post.id}
          post={post}
          desktop={isDesktop}
          userStats={stats}
          onToggleLike={toggleLike}
          onToggleSave={toggleSave}
          onDelete={mineView ? deletePost : undefined}
        />,
      );
      // 电台卡只混入第一页（前 20 帖内），每 4 帖插一张，避免在无限滚动里到处散落
      if (showRadio && i < 20 && i % 4 === 3 && r < radioCards.length) {
        items.push(<RadioFeedCard key={`radio-${radioCards[r].id}`} card={radioCards[r]} />);
        r++;
      }
    });
    // 帖子太少（如 Day 1）时按 4 帖间隔插不完，把当天剩余节目补到末尾，保证全天节目都可见
    if (showRadio) {
      for (; r < radioCards.length; r++) {
        items.push(<RadioFeedCard key={`radio-${radioCards[r].id}`} card={radioCards[r]} />);
      }
    }
    return items;
  }, [filtered, showRadio, radioCards, isDesktop, stats, toggleLike, toggleSave, mineView, deletePost]);

  // 滚动逐条上浮：帖子进视口才加 .is-in 触发；同批进入的错开 60ms，播完 unobserve。
  // feed 变（切分类重建 DOM）时重建 observer。SSR 安全：useEffect 仅客户端跑 + IO 支持守卫。
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.blog-post-enter:not(.is-in)'));
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries, obs) => {
        let batch = 0;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${batch * 90}ms`;
          el.classList.add('is-in');
          batch++;
          obs.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [feed]);

  // 无限滚动：sentinel 进视口（提前 400px）→ 加载下一页
  const sentinelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) void loadMore(); },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, loadMore]);

  // feed 三态：加载中 / 出错(可重试) / 空。避免把"加载失败"和"没有帖子"混为一谈。
  const feedStatus =
    loading ? (
      <div className="blog-feed-status" role="status">{t('blog.loading', lang)}</div>
    ) : loadError ? (
      <div className="blog-feed-status">
        <div>{t('blog.load_failed', lang)}</div>
        <button type="button" className="blog-feed-retry" onClick={() => void loadPosts()}>
          {t('blog.retry', lang)}
        </button>
      </div>
    ) : feed.length === 0 && feedMode !== 'following' ? (
      <div className="blog-feed-status">
        {funcNav === 'bookmark' ? (
          <>
            <div>{t('blog.empty_bookmark_title', lang)}</div>
            <div className="blog-feed-status-sub">{t('blog.empty_bookmark_sub', lang)}</div>
          </>
        ) : funcNav === 'profile' ? (
          <>
            <div>{t('blog.empty_mine_title', lang)}</div>
            <div className="blog-feed-status-sub">{t('blog.empty_mine_sub', lang)}</div>
          </>
        ) : (
          <>
            <div>{t('blog.empty_feed_title', lang)}</div>
            <div className="blog-feed-status-sub">{t('blog.empty_feed_sub', lang)}</div>
          </>
        )}
      </div>
    ) : null;

  // 无限滚动页脚：加载更多骨架 → sentinel（还有更多）/ 结束文案（全部加载完）
  const feedFooter = !loading && !loadError && feed.length > 0 ? (
    <>
      {loadingMore && (<><PostSkeleton /><PostSkeleton /></>)}
      {hasMore ? (
        <div ref={sentinelRef} className="blog-feed-sentinel" aria-hidden />
      ) : (
        <div className="blog-feed-end">{t('blog.all_loaded', lang)} 🐾</div>
      )}
    </>
  ) : null;

  // 알림 面板：动物点赞/评论通知列表（打开 tab 即已读；空状态给引导）
  const noticePanel = (
    <div className="blog-notice-panel">
      <div className="blog-notice-head">
        <span className="blog-notice-title">{t('blog.notice_title', lang)}</span>
        {unread > 0 && (
          <button type="button" className="blog-notice-readall" onClick={() => void markAllRead()}>
            {t('blog.read_all', lang)}
          </button>
        )}
      </div>
      {notifs.length === 0 ? (
        <div className="blog-feed-status">
          <div>{t('blog.empty_notice_title', lang)}</div>
          <div className="blog-feed-status-sub">{t('blog.notice_empty_sub', lang)} 🐾</div>
        </div>
      ) : (
        notifs.map((n) => {
          const a = getBlogAuthor(n.fromAnimalId);
          const inner = (
            <>
              <span className={`blog-notice-av blog-av-${a.id}`}><AvatarFace author={a} /></span>
              <span className="blog-notice-body">
                <span className="blog-notice-ko">{n.messageKo}</span>
                <span className="blog-notice-zh">{n.messageZh}</span>
              </span>
              {!n.isRead && <span className="blog-notice-dot" aria-hidden />}
            </>
          );
          // 有帖子的通知可点进详情；无 slug 的（理论不该有）降级为不可点，不跳 #
          return n.postSlug ? (
            <Link key={n.id} href={`/blog/${n.postSlug}`} className={`blog-notice-item${n.isRead ? '' : ' unread'}`}>
              {inner}
            </Link>
          ) : (
            <div key={n.id} className={`blog-notice-item${n.isRead ? '' : ' unread'}`}>
              {inner}
            </div>
          );
        })
      )}
    </div>
  );

  // Hero「在线」数：基线(卡司+帖子) × 时段活跃系数 + 缓慢随机浮动，纯展示氛围（不精确、不落库）
  useEffect(() => {
    const compute = () => {
      const base = BLOG_CAST.length + Math.min(posts.length, 20);
      const h = new Date().getHours();
      // 时段活跃系数：深夜冷清、午间/晚间热闹
      const factor = h >= 0 && h < 7 ? 0.55 : h >= 19 && h < 24 ? 1.25 : h >= 11 && h < 14 ? 1.15 : 1;
      const jitter = Math.floor(Math.random() * 7) - 3; // -3~+3 轻微浮动
      setActiveCount(Math.max(BLOG_CAST.length, Math.round(base * factor) + jitter));
    };
    compute();
    const t = setInterval(compute, 30_000); // 每 30s 微调一次，营造"有人进出"的活感
    return () => clearInterval(t);
  }, [posts.length]);

  // 作者筛选提示条：点 story 后显示"正在看 XX 的帖子 · 清除"，让筛选状态可见可退出
  const authorFilterBar = authorFilter ? (
    <div className="blog-author-filter">
      <span className="blog-author-filter-txt">
        {getBlogAuthor(authorFilter).emoji} <b>{getBlogAuthor(authorFilter).name}</b> {t('blog.author_filter_posts', lang)}
      </span>
      <button type="button" className="blog-author-filter-clear" onClick={() => setAuthorFilter(null)}>
        {t('blog.show_all', lang)}
      </button>
    </div>
  ) : null;

  // 홈 顶部「추천 | 팔로잉」二段切换（仿 Twitter 双 feed）。切 팔로잉 清作者筛选，避免语义冲突。
  const switchFeedMode = useCallback((mode: 'recommend' | 'following') => {
    setFeedMode(mode);
    setAuthorFilter(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const feedModeTabs = (
    <div className="blog-feedmode" role="tablist" aria-label={t('blog.aria_switch_feed', lang)}>
      <button
        type="button"
        role="tab"
        aria-selected={feedMode === 'recommend'}
        className={`blog-feedmode-tab${feedMode === 'recommend' ? ' active' : ''}`}
        onClick={() => switchFeedMode('recommend')}
      >
        {t('blog.tab_recommend', lang)}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={feedMode === 'following'}
        className={`blog-feedmode-tab${feedMode === 'following' ? ' active' : ''}`}
        onClick={() => switchFeedMode('following')}
      >
        {t('blog.tab_following', lang)}
      </button>
    </div>
  );

  // 팔로잉 视图空态：没关注任何动物 / 关注了但没新帖
  const followingEmpty = feedMode === 'following' && !loading && !loadError && posts.length === 0 ? (
    <div className="blog-following-empty">
      <span className="blog-following-empty-emoji">🐾</span>
      <p className="blog-following-empty-title">{t('blog.empty_following_title', lang)}</p>
      <p className="blog-following-empty-sub">{t('blog.empty_following_sub', lang)}</p>
      <button type="button" className="blog-following-empty-btn" onClick={() => switchFeedMode('recommend')}>
        {t('blog.empty_following_btn', lang)}
      </button>
    </div>
  ) : null;

  // 发帖入口：feed 顶部常驻输入条（仿 ins/twitter）。已选形象→开发帖弹层；否则先引导选形象。
  const hasProfile = Boolean(stats && stats.animalId);
  const composerTrigger = profileLoaded ? (
    <button
      type="button"
      className="blog-composer-trigger"
      onClick={() => (hasProfile ? setShowComposer(true) : setNeedOnboarding(true))}
    >
      <span className="blog-composer-trigger-av">
        {hasProfile ? getBlogAvatar(stats!.animalId)?.emoji ?? '🐰' : '🐰'}
      </span>
      <span className="blog-composer-trigger-ph">{t('blog.composer_placeholder', lang)}</span>
      <span className="blog-composer-trigger-img">🖼️</span>
    </button>
  ) : null;

  // 프로필 面板（移动端 tab）：有档案 → ProfileCard + 写帖入口 + 我发的帖；无档案 → 引导选形象
  const profilePanel = (
    <div className="blog-profile-panel">
      {stats && stats.animalId ? (
        <>
          <ProfileCard stats={stats} currentDay={currentDay} likedCount={likedCount} savedCount={savedCount} />
          {composerTrigger}
          <div className="blog-my-posts-title">{t('blog.my_posts_title', lang)}</div>
          {feed}
          {feedStatus}
          {feedFooter}
        </>
      ) : (
        <div className="blog-feed-status">
          <div>{t('blog.empty_profile', lang)}</div>
          <div className="blog-feed-status-sub">{t('blog.pick_animal_first', lang)}</div>
          <button type="button" className="blog-feed-retry" onClick={() => setNeedOnboarding(true)}>
            {t('blog.start', lang)}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className={`blog-root blog-list${entered ? ' blog-entered' : ''}`}>
      <PlaceIntro place="blog" reopenSignal={introSignal} />
      {isDesktop && <div ref={glowRef} className="blog-cursor-glow" aria-hidden />}
      {profileLoaded && needOnboarding && (
        <BlogOnboarding
          onDone={(s) => {
            setStats(s);
            setNeedOnboarding(false);
          }}
          onClose={() => setNeedOnboarding(false)}
        />
      )}
      {showComposer && (
        <BlogComposer
          onClose={() => setShowComposer(false)}
          onPosted={(s) => setStats(s)}
          currentDay={currentDay}
        />
      )}
      {loading && !firstLoadDone.current ? (
        // 桌面用三栏 shell 的中栏骨架（避免首屏先渲染窄居中的移动布局再跳成三栏 = FOUC）
        isDesktop ? (
          <div className="blog-shell">
            <aside className="blog-left" />
            <main className="blog-center" style={{ paddingTop: 16 }}>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </main>
            <aside className="blog-right" />
          </div>
        ) : (
          <div style={{ maxWidth: 560, margin: '0 auto', padding: '16px 12px' }}>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )
      ) : isDesktop ? (
        // ────────── DESKTOP: 3-column shell ──────────
        <div className="blog-shell">
          {/* LEFT sidebar */}
          <aside className="blog-left blog-enter-left">
            <button type="button" className="blog-desk-back" onClick={goBack} aria-label={t('blog.aria_back', lang)}>
              {t('blog.desktop_back', lang)}
            </button>
            <div className="blog-brand">
              <span className="blog-brand-logo">🐰</span> {t('blog.desktop_brand', lang)}
            </div>
            <nav className="blog-nav">
              <Link href="/" className="blog-nav-item blog-nav-home">
                <span className="blog-nav-ico" aria-hidden>🐰</span> {t('blog.desktop_home', lang)}
              </Link>
              {FUNC_NAV.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`blog-nav-item${funcNav === item.key ? ' active' : ''}`}
                  aria-current={funcNav === item.key ? 'page' : undefined}
                  onClick={() => onFuncNav(item.key)}
                >
                  <span className="blog-nav-ico" aria-hidden>{item.icon}</span> {funcNavLabel(item.key, lang)}
                  {item.key === 'bookmark' && savedCount > 0 && (
                    <span className="blog-nav-badge">{savedCount}</span>
                  )}
                  {item.key === 'notice' && unread > 0 && (
                    <span className="blog-nav-badge">{unread}</span>
                  )}
                </button>
              ))}
            </nav>
            {stats && stats.animalId && (
              <>
                <div className="blog-left-divider" />
                <ProfileCard
                  stats={stats}
                  currentDay={currentDay}
                  likedCount={likedCount}
                  savedCount={savedCount}
                />
              </>
            )}
            <div className="blog-left-divider" />
            <div className="blog-mini-panel">
              <div className="blog-mini-title">{t('blog.desktop_my_learning', lang)}</div>
              <div className="blog-stat-row">
                <span className="blog-stat-ico">❤️</span>
                <span className="blog-stat-num">{likedCount}</span>
                <span className="blog-stat-lbl">{t('blog.desktop_stat_likes', lang)}</span>
              </div>
              <div className="blog-stat-row">
                <span className="blog-stat-ico">🔖</span>
                <span className="blog-stat-num">{savedCount}</span>
                <span className="blog-stat-lbl">{t('blog.desktop_stat_bookmarks', lang)}</span>
              </div>
            </div>
          </aside>

          {/* CENTER feed */}
          <main className="blog-center">
            <TownHero activeCount={activeCount} currentDay={currentDay} />
            {funcNav === 'notice' ? (
              noticePanel
            ) : (
              <>
                <div className="blog-feed-head">
                  <span className="blog-feed-head-title">
                    {mineView ? t('blog.my_posts_title', lang) : t('blog.feed_header', lang)}
                  </span>
                  <span className="blog-feed-head-sub">@tori.friends</span>
                  <button
                    type="button"
                    className={`blog-refresh-btn${refreshing ? ' spinning' : ''}`}
                    onClick={doRefresh}
                    disabled={refreshing || loading}
                    aria-label={`${t('blog.refresh', lang)} · ${t('blog.refresh', lang)}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{t('blog.refresh', lang)}</span>
                  </button>
                </div>
                {composerTrigger}
                {!savedView && !mineView && feedModeTabs}
                {!mineView && authorFilterBar}
                {followingEmpty}
                {feed}
                {feedStatus}
                {feedFooter}
              </>
            )}
          </main>

          {/* RIGHT sidebar */}
          <aside className="blog-right blog-enter-right">
            {/* 추천 친구（팔로우 建议，纯装饰交互）*/}
            <div className="blog-r-card">
              <div className="blog-r-card-title">{t('blog.friend_rec_title', lang)}</div>
              <div className="blog-suggest-list">
                {suggestFriends.map((a) => (
                  <div key={a.id} className="blog-suggest">
                    <Link href={`/blog/author/${a.id}`} className="blog-suggest-link">
                      <div className={`blog-suggest-av blog-av-${a.id}`}><AvatarFace author={a} /></div>
                      <div className="blog-suggest-id">
                        <div className="blog-suggest-name">{a.name}</div>
                        <div className="blog-suggest-handle">{a.handle}</div>
                      </div>
                    </Link>
                    <FollowButton following={follows.has(a.id)} onToggle={() => void toggleFollow(a.id)} />
                  </div>
                ))}
              </div>
            </div>

            {/* 친구들 */}
            <div className="blog-r-card">
              <div className="blog-r-card-title">
                {t('blog.friends_title', lang)}
                <span className="blog-r-card-cnt">{t('blog.friends_count', lang, { n: BLOG_CAST.length })}</span>
              </div>
              <div className="blog-friends">
                {BLOG_CAST.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className="blog-friend"
                    aria-pressed={authorFilter === a.id}
                    onClick={() => setAuthorFilter((cur) => (cur === a.id ? null : a.id))}
                  >
                    <div className={`blog-friend-av blog-av-${a.id}`}><AvatarFace author={a} /></div>
                    <div className="blog-friend-name">{a.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 내가 저장한 글 */}
            <div className="blog-r-card">
              <div className="blog-r-card-title">{t('blog.bookmark_title', lang)}</div>
              {savedPosts.length === 0 ? (
                <div style={{ fontSize: 13, color: 'var(--ink-4)' }}>{t('blog.empty_bookmark_title', lang)}</div>
              ) : (
                savedPosts.map((p) => {
                  const author = getBlogAuthor(p.authorId);
                  return (
                    <Link key={p.id} href={`/blog/${p.slug}`} className="blog-saved-item">
                      <div className={`blog-saved-thumb theme-${p.coverTheme}`}>{p.coverEmoji}</div>
                      <div className="blog-saved-txt">
                        <div className="blog-saved-tt">{stripEmoji(p.titleKo)}</div>
                        <div className="blog-saved-mt">
                          {author.emoji} {author.name} · {p.category}
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>

            {/* 오늘의 인기글 TOP3（매일 심사 후 선정, 공개） */}
            <div className="blog-r-card">
              <div className="blog-r-card-title">{t('blog.hot_title', lang)}</div>
              {board.length === 0 ? (
                <div style={{ fontSize: 13, color: 'var(--ink-4)' }}>{t('blog.hot_empty', lang)}</div>
              ) : (
                board.map((b) => (
                  <Link key={b.slug} href={`/blog/${b.slug}`} className="blog-rank-item">
                    <div className={`blog-rank-num rank-${b.rank}`}>{b.rank}</div>
                    <div className="blog-rank-body">
                      <div className="blog-rank-tt">{stripEmoji(b.text)}</div>
                      <div className="blog-rank-lk">
                        {getBlogAvatar(b.authorAnimalId)?.emoji ?? '🐾'} {b.authorNickname} · ❤️ {b.likeCount}
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </aside>
        </div>
      ) : (
        // ────────── MOBILE: Instagram feed ──────────
        <>
          <div className="blog-topbar">
            <button type="button" className="blog-topbar-back" onClick={goBack} aria-label={t('blog.aria_back', lang)}>
              ←
            </button>
            <span className="blog-topbar-brand">
              <span className="blog-tori">{t('blog.desktop_brand', lang)}</span>
              <span className="blog-topbar-brand-en">Tori&apos;s Blog</span>
            </span>
            <button
              type="button"
              className="blog-topbar-menu"
              onClick={() => setMenuOpen(true)}
              aria-label={t('blog.aria_menu', lang)}
            >
              ☰
            </button>
          </div>

          {/* 下拉刷新指示器：下拉时随手势下移+旋转箭头，刷新中转圈 */}
          {(pullY > 0 || refreshing) && (
            <div
              className={`blog-pull-refresh${refreshing ? ' refreshing' : ''}`}
              style={{ height: refreshing ? 44 : pullY }}
              aria-hidden
            >
              <svg
                width="20" height="20" viewBox="0 0 24 24" fill="none"
                style={{ transform: refreshing ? undefined : `rotate(${Math.min(pullY / 70, 1) * 270}deg)` }}
              >
                <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}

          {/* Stories 行：点击按该动物筛选 feed（复用 authorFilter）；选中态高亮环 */}
          <div className="blog-stories">
            {BLOG_CAST.map((a) => (
              <button
                key={a.id}
                type="button"
                className="blog-story"
                aria-pressed={authorFilter === a.id}
                onClick={() => setAuthorFilter((cur) => (cur === a.id ? null : a.id))}
              >
                <div className={`blog-story-ring${authorFilter && authorFilter !== a.id ? ' seen' : ''}`}>
                  <div className="blog-story-av"><AvatarFace author={a} /></div>
                </div>
                <div className="blog-story-name">{a.name}</div>
              </button>
            ))}
          </div>

          <TownHero activeCount={activeCount} currentDay={currentDay} />
          {funcNav === 'notice' ? (
            noticePanel
          ) : funcNav === 'profile' ? (
            profilePanel
          ) : (
            <>
              {stats && stats.animalId && (
                <div style={{ margin: '0 12px 8px' }}>
                  <ProfileCard
                    stats={stats}
                    currentDay={currentDay}
                    likedCount={likedCount}
                    savedCount={savedCount}
                  />
                </div>
              )}
              {composerTrigger}
              {!savedView && feedModeTabs}
              {authorFilterBar}
              {followingEmpty}
              {feed}
              {feedStatus}
              {feedFooter}
            </>
          )}
        </>
      )}

      {/* 移动端右上角 ☰ 抽屉：装下移动 feed 放不下的发现性内容（人气榜/推荐关注/介绍）*/}
      {!isDesktop && menuOpen && (
        <div className="blog-menu-overlay" onClick={() => setMenuOpen(false)}>
          <aside
            className="blog-menu-drawer"
            role="dialog"
            aria-label={t('blog.aria_menu', lang)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="blog-menu-head">
              <span className="blog-menu-title">{t('blog.menu_title', lang)}</span>
              <button
                type="button"
                className="blog-menu-close"
                onClick={() => setMenuOpen(false)}
                aria-label={t('blog.aria_close', lang)}
              >
                ✕
              </button>
            </div>

            {/* 오늘의 인기글 TOP3 */}
            <div className="blog-menu-section">
              <div className="blog-menu-section-title">{t('blog.hot_title', lang)}</div>
              {board.length === 0 ? (
                <div className="blog-menu-empty">{t('blog.hot_empty', lang)}</div>
              ) : (
                board.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/blog/${b.slug}`}
                    className="blog-menu-rank"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className={`blog-menu-rank-num rank-${b.rank}`}>{b.rank}</span>
                    <span className="blog-menu-rank-body">
                      <span className="blog-menu-rank-tt">{stripEmoji(b.text)}</span>
                      <span className="blog-menu-rank-lk">
                        {getBlogAvatar(b.authorAnimalId)?.emoji ?? '🐾'} {b.authorNickname} · ❤️ {b.likeCount}
                      </span>
                    </span>
                  </Link>
                ))
              )}
            </div>

            {/* 추천 친구（팔로우）*/}
            <div className="blog-menu-section">
              <div className="blog-menu-section-title">{t('blog.friend_rec_title', lang)}</div>
              {suggestFriends.map((a) => (
                <div key={a.id} className="blog-menu-friend">
                  <span className={`blog-menu-friend-av blog-av-${a.id}`}><AvatarFace author={a} /></span>
                  <span className="blog-menu-friend-id">
                    <span className="blog-menu-friend-name">{a.name}</span>
                    <span className="blog-menu-friend-handle">@{a.id}</span>
                  </span>
                  <FollowButton following={follows.has(a.id)} onToggle={() => void toggleFollow(a.id)} />
                </div>
              ))}
            </div>

            {/* 再看一次世界观介绍 */}
            <button
              type="button"
              className="blog-menu-link"
              onClick={() => { setMenuOpen(false); setIntroSignal((v) => v + 1); }}
            >
              📖 {t('blog.reopen_intro', lang)}
            </button>
          </aside>
        </div>
      )}

      {/* 移动端底部功能导航（/blog 是全屏页，无全局 TabBar，独占底部）*/}
      {!isDesktop && (
        <nav className="blog-bottom-nav">
          {FUNC_NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`blog-bottom-nav-item${funcNav === item.key ? ' active' : ''}`}
              aria-current={funcNav === item.key ? 'page' : undefined}
              onClick={() => { onFuncNav(item.key); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <span className="blog-bottom-nav-ico" aria-hidden>
                {item.icon}
                {item.key === 'notice' && unread > 0 && (
                  <span className="blog-bottom-nav-dot">{unread}</span>
                )}
                {item.key === 'bookmark' && savedCount > 0 && (
                  <span className="blog-bottom-nav-dot">{savedCount}</span>
                )}
              </span>
              <span className="blog-bottom-nav-lbl">{funcNavLabel(item.key, lang)}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
