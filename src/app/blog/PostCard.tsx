'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { BlogPost, BlogUserStats } from '@/types';
import { getBlogAuthor } from '@/data/blogCast';
import { getBlogAvatar } from '@/data/blogAvatars';
import { stripEmoji } from '@/lib/blogText';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import PostGallery from './PostGallery';
import { useFeedAudio } from './useFeedAudio';
import { AvatarFace } from './AvatarFace';

function fmtDur(sec: number): string {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}

// feed 内联语音条：真播放（全局单例，点一条自动停其他）。NPC 完整卡 + 路人 mini 卡共用。
// compact=true 给路人小卡用（更矮、无时长文字，只 🎧+波形）。
function FeedVoiceBar({ src, duration, wave, compact, lang }: { src: string; duration: number; wave: number[]; compact?: boolean; lang: 'zh' | 'en' }) {
  const { playing, ratio, toggle } = useFeedAudio(src);
  return (
    <div className={`blog-voice${compact ? ' blog-voice-compact' : ''}`} onClick={toggle}>
      <button type="button" className="blog-voice-play" aria-label={playing ? t('blog.aria_pause', lang) : t('blog.aria_play', lang)} onClick={toggle}>
        {playing ? '⏸' : '▶'}
      </button>
      <div className="blog-voice-wave">
        {wave.map((h, i) => (
          <i key={i} className={`blog-voice-bar${i / wave.length < ratio ? ' on' : ''}`} style={{ height: `${h}%` }} />
        ))}
      </div>
      {!compact && <div className="blog-voice-time">{fmtDur(duration)}</div>}
    </div>
  );
}

function relativeTime(ts: number, lang: 'zh' | 'en'): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return t('blog.time_just_now', lang);
  const min = Math.floor(diff / 60_000);
  if (min < 60) return t('blog.time_min_ago', lang, { n: min });
  const hr = Math.floor(min / 60);
  if (hr < 24) return t('blog.time_hr_ago', lang, { n: hr });
  const day = Math.floor(hr / 24);
  if (day === 1) return t('blog.time_yesterday', lang);
  if (day < 7) return t('blog.time_day_ago', lang, { n: day });
  const d = new Date(ts);
  return t('blog.date_format', lang, { month: d.getMonth() + 1, day: d.getDate() });
}

// 反映当前用户点赞后的实时点赞数
function liveLikes(post: BlogPost): number {
  return post.likeCount + (post.liked ? 1 : 0);
}

// 数字变化时短暂 pop 一下（点赞数跳动）
function AnimatedCount({ value }: { value: number }) {
  const [pop, setPop] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setPop(true);
      const timer = setTimeout(() => setPop(false), 320);
      return () => clearTimeout(timer);
    }
  }, [value]);
  return <span className={pop ? 'blog-count-pop' : undefined}>{value}</span>;
}

// 波形柱高（%）——feed 12 根，desktop 16 根
const WAVE_FEED = [40, 70, 100, 60, 85, 45, 75, 55, 90, 35, 65, 50];
const WAVE_DESK = [...WAVE_FEED, 80, 42, 68, 52];

export function PostCard({
  post,
  desktop,
  userStats,
  onToggleLike,
  onToggleSave,
  onDelete,
}: {
  post: BlogPost;
  desktop: boolean;
  userStats: BlogUserStats | null;
  onToggleLike: (post: BlogPost) => void;
  onToggleSave: (post: BlogPost) => void;
  onDelete?: (post: BlogPost) => void; // 仅「我的主页」传入：显示删除入口
}) {
  const { lang } = useLang();
  // user 帖：作者是发帖用户本人，用其预制动物形象 + 昵称（不暴露真实账号）。
  // npc 帖：作者是动物卡司。
  const isUserPost = post.authorKind === 'user';
  // 路人帖 = 背景邻居闲聊：收成紧凑小卡，不整段铺开、不占主线的地
  const isPasserby = post.authorKind === 'passerby';
  const userAvatar = isUserPost && userStats ? getBlogAvatar(userStats.animalId) : undefined;
  const author = isUserPost
    ? {
        id: userAvatar?.id ?? 'me',
        emoji: userAvatar?.emoji ?? '🐰',
        name: userStats?.nickname ?? t('blog.nickname_default', lang),
        handle: '@me',
        badge: '',
      }
    : getBlogAuthor(post.authorId);
  const { comments, likedBy } = post.content;
  const blocked = isUserPost && post.aiStatus === 'blocked';
  const [showZh, setShowZh] = useState(false); // 默认只显示韩语，点按钮才出这一帖的中文

  // ── 路人帖紧凑小卡：头像行 + 两行摘要 + 精简操作栏（无封面/翻译/标签/评论预览）──
  if (isPasserby) {
    return (
      <article className="blog-post blog-post-mini blog-post-enter">
        <Link href={`/blog/${post.slug}`} className="blog-mini-main">
          <span className={`blog-mini-av blog-av-${author.id}`}><AvatarFace author={author} /></span>
          <span className="blog-mini-body">
            <span className="blog-mini-head">
              <b className="blog-mini-name">{author.name}</b>
              <span className="blog-mini-handle">{author.handle}</span>
              <span className="blog-mini-dot">·</span>
              <span className="blog-mini-time">{relativeTime(post.publishedAt, lang)}</span>
            </span>
            <span className="blog-mini-text">{stripEmoji(post.excerptKo)}</span>
          </span>
        </Link>
        <button
          type="button"
          className={`blog-mini-trans-toggle${showZh ? ' on' : ''}`}
          aria-expanded={showZh}
          onClick={() => setShowZh((v) => !v)}
        >
          {t('blog.zh_label', lang)}<span className="blog-trans-caret" aria-hidden>▾</span>
        </button>
        <div className={`blog-trans-drawer${showZh ? ' open' : ''}`}>
          <div className="blog-mini-trans">{post.content.sentences.map((s) => s.zh).join(' ') || post.titleZh}</div>
        </div>
        <div className="blog-mini-actions">
          <button
            type="button"
            className={`blog-heart${post.liked ? ' liked' : ''}`}
            aria-pressed={!!post.liked}
            aria-label={t('blog.aria_like', lang)}
            onClick={() => onToggleLike(post)}
          >
            {post.liked ? '❤️' : '🤍'}
          </button>
          <span className="blog-mini-likes">{liveLikes(post)}</span>
          <Link href={`/blog/${post.slug}`} className="blog-ico" aria-label={t('blog.aria_comments', lang)}>💬</Link>
          <span className="blog-spacer" />
          <button
            type="button"
            className={`blog-ico blog-save${post.saved ? ' saved' : ''}`}
            aria-pressed={!!post.saved}
            aria-label={t('blog.aria_bookmark', lang)}
            onClick={() => onToggleSave(post)}
          >
            🔖
          </button>
        </div>
      </article>
    );
  }

  // 点赞头像行文案：<第一位名字>님 외 <总数>명이 좋아합니다
  const firstLiker = likedBy.length > 0 ? getBlogAuthor(likedBy[0]).name : author.name;
  const wave = desktop ? WAVE_DESK : WAVE_FEED;
  const previewComments = comments.slice(0, desktop ? 2 : Math.min(comments.length, 2));

  // NPC 帖作者有独立主页；user 帖作者是真实用户、无主页
  const authorHref = isUserPost ? null : `/blog/author/${author.id}`;

  return (
    <article className="blog-post blog-post-enter">
      {/* 头部 */}
      <div className="blog-post-head">
        {authorHref ? (
          <Link href={authorHref} className="blog-post-idlink">
            <div className={`blog-post-av blog-av-${author.id}`}><AvatarFace author={author} /></div>
            <div className="blog-post-id">
              <div className="blog-post-name">
                {author.name}
                {author.badge && <span className="blog-post-badge">{author.badge}</span>}
              </div>
              <div className="blog-post-handle">
                {author.handle} · {post.category}
              </div>
            </div>
          </Link>
        ) : (
          <>
            <div className={`blog-post-av blog-av-${author.id}`}><AvatarFace author={author} /></div>
            <div className="blog-post-id">
              <div className="blog-post-name">
                {author.name}
                {author.badge && <span className="blog-post-badge">{author.badge}</span>}
                {isUserPost && !blocked && <span className="blog-post-mine">{t('blog.nickname_default', lang)}</span>}
              </div>
              <div className="blog-post-handle">
                {author.handle} · {post.category}
              </div>
            </div>
          </>
        )}
        {blocked && <span className="blog-post-status blocked">{t('blog.status_pending', lang)}</span>}
        {onDelete && (
          <button
            type="button"
            className="blog-post-del"
            aria-label={t('blog.delete_post', lang)}
            onClick={() => {
              if (window.confirm(t('blog.delete_confirm', lang))) onDelete(post);
            }}
          >
            {t('blog.delete_post', lang)}
          </button>
        )}
      </div>

      {/* 封面：仅后台配了图才展示轮播；无图不显示封面块 */}
      {post.content.images && post.content.images.length > 0 && (
        <PostGallery
          images={post.content.images}
          theme={post.coverTheme}
          alt={post.titleKo}
          href={`/blog/${post.slug}`}
        />
      )}

      {/* 语音条（有音频时）：feed 内联真播放 */}
      {post.audioDuration > 0 && post.audioUrl && (
        <FeedVoiceBar src={post.audioUrl} duration={post.audioDuration} wave={wave} lang={lang} />
      )}

      {/* 操作栏：❤️（数字） 💬 📨 <spacer> 🔖 */}
      <div className="blog-post-actions">
        <button
          type="button"
          className={`blog-heart${post.liked ? ' liked' : ''}`}
          aria-pressed={!!post.liked}
          aria-label={t('blog.aria_like', lang)}
          onClick={() => onToggleLike(post)}
        >
          {post.liked ? '❤️' : '🤍'}
        </button>
        {desktop && (
          <span className="blog-count">
            <AnimatedCount value={liveLikes(post)} />
          </span>
        )}
        <Link href={`/blog/${post.slug}`} className="blog-ico" aria-label={t('blog.aria_comments', lang)}>💬</Link>
        <span className="blog-spacer" />
        <button
          type="button"
          className={`blog-ico blog-save${post.saved ? ' saved' : ''}`}
          aria-pressed={!!post.saved}
          aria-label={t('blog.aria_bookmark', lang)}
          onClick={() => onToggleSave(post)}
        >
          🔖
        </button>
      </div>

      {/* 点赞行 */}
      <div className="blog-post-likes">
        {likedBy.length > 0 && (
          <span className="blog-likes-avs">
            {likedBy.slice(0, 3).map((id) => (
              <span key={id}>{getBlogAuthor(id).emoji}</span>
            ))}
          </span>
        )}
        <span dangerouslySetInnerHTML={{ __html: t('blog.like_attribution', lang, { name: firstLiker, count: liveLikes(post) }) }} />
      </div>

      {/* 正文（作者名 + 摘要）：点正文跳详情，同社媒习惯 */}
      <Link href={`/blog/${post.slug}`} className="blog-post-caption">
        <span className="blog-caption-name">{author.name}</span>
        {stripEmoji(post.excerptKo)}
      </Link>

      {/* 中文翻译：折叠抽屉，点「中文 ▾」展开/收起 */}
      <button
        type="button"
        className={`blog-post-trans-toggle${showZh ? ' on' : ''}`}
        aria-expanded={showZh}
        onClick={() => setShowZh((v) => !v)}
      >
        {t('blog.zh_label', lang)}<span className="blog-trans-caret" aria-hidden>▾</span>
      </button>
      <div className={`blog-trans-drawer${showZh ? ' open' : ''}`}>
        <div className="blog-post-trans">{post.content.sentences.map((s) => s.zh).join(' ') || post.titleZh}</div>
      </div>

      {/* 标签 */}
      <div className="blog-tags">
        <span className="blog-tag">#{post.category}</span>
        <span className="blog-tag lv">#{post.level}</span>
      </div>

      {/* 查看全部评论 */}
      <Link href={`/blog/${post.slug}`} className="blog-post-view-comments">
        {t('blog.view_all_comments', lang, { n: comments.length })}
      </Link>

      {/* 预览评论 */}
      {previewComments.map((c, i) => {
        const animal = getBlogAuthor(c.animalId);
        return (
          <div key={i} className="blog-preview-comment">
            <span className="blog-preview-cn">
              {animal.emoji} {animal.name}
            </span>
            {stripEmoji(c.ko)}
            {showZh && <span className="blog-preview-zh">{c.zh}</span>}
          </div>
        );
      })}

      {/* 时间 */}
      <div className="blog-post-time">{relativeTime(post.publishedAt, lang)}</div>
    </article>
  );
}
