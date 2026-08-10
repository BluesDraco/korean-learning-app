'use client';

import '../blog.css';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { BlogAuthor, BlogPost, BlogUserComment, BlogUserStats } from '@/types';
import { getBlogAuthor, BLOG_CAST } from '@/data/blogCast';
import { getBlogAvatar } from '@/data/blogAvatars';
import { useSmartBack } from '@/lib/useSmartBack';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { TappableText } from '@/components/TappableText';
import { speakWord, speakViaMinimax, speakPreRecorded, cancelSpeech, unlockAudioContext } from '@/lib/tts';
import { stripEmoji } from '@/lib/blogText';
import { saveProgress, loadProgress, TTL_FLASHCARD } from '@/lib/progress-storage';
import PostGallery from '../PostGallery';
import { AvatarFace } from '../AvatarFace';
import BlogEditModal from '../BlogEditModal';

// 波形柱高（%）——详情页 20 根
const WAVE = [40, 70, 95, 55, 80, 35, 60, 90, 45, 75, 100, 50, 65, 40, 78, 42, 68, 52, 88, 48];

// 评论语音条波形（10 根，短气泡用）
const WAVE_MINI = [45, 80, 55, 95, 60, 40, 85, 50, 70, 42];

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${pad2(s)}`;
}
function fmtDate(ts: number, lang: string): string {
  const d = new Date(ts);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return lang === 'zh' ? `${m}月${day}日` : `${m}/${day}`;
}

export default function BlogReaderClient({ post, userStats }: { post: BlogPost; userStats: BlogUserStats | null }) {
  const { lang } = useLang();
  const goBack = useSmartBack('/blog');
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  // 单句跳播：点某句时把整段播放器 seek 到该句起点、记下句末时刻，timeupdate 到点即停。
  // 整段播放时恒 null，不干扰。
  const segmentEndRef = useRef<number | null>(null);

  const { sentences, vocab, quiz, comments, likedBy } = post.content;
  // user 帖：作者是发帖用户本人，用其预制动物形象 + 昵称（与 PostCard 一致，不暴露真实账号）。
  // 否则回落 getBlogAuthor（NPC/路人卡司）。缺兜底会命中 BLOG_CAST[0]=토리 而误显作者。
  const isUserPost = post.authorKind === 'user';
  const userAvatar = isUserPost && userStats ? getBlogAvatar(userStats.animalId) : undefined;
  const author: BlogAuthor = isUserPost
    ? {
        id: userAvatar?.id ?? 'me',
        emoji: userAvatar?.emoji ?? '🐰',
        name: userStats?.nickname ?? t('blog.nickname_default', lang),
        handle: '@me',
        badge: '',
        theme: 'pink',
        imageUrl: userAvatar?.imageUrl,
      }
    : getBlogAuthor(post.authorId);
  const hasAudio = Boolean(post.audioUrl);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(post.audioDuration);
  const quizKey = `blog-quiz-${post.slug}-${userStats?.userId ?? 'guest'}`;
  const [quizPicks, setQuizPicks] = useState<Record<number, number>>(() => loadProgress<Record<number, number>>(quizKey) ?? {});

  useEffect(() => {
    saveProgress(quizKey, quizPicks, TTL_FLASHCARD);
  }, [quizPicks, quizKey]);

  // 点赞 / 收藏（真实持久化 + 乐观 + 回滚）
  const [liked, setLiked] = useState(Boolean(post.liked));
  const [saved, setSaved] = useState(Boolean(post.saved));
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [following, setFollowing] = useState(false);
  const [followLoaded, setFollowLoaded] = useState(false);
  const [showZh, setShowZh] = useState(false); // 默认只显示韩语，点按钮才显示中文翻译
  const [toast, setToast] = useState('');
  const [progress, setProgress] = useState(0);
  const [burst, setBurst] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 私密评论/关注：仅 NPC 帖开放（动物会延迟回复、可关注）。
  // passerby 路人帖是只读闲聊——generateAnimalReply(blog.ts) 只对 npc 生成回复、
  // setBlogFollow 白名单也不含路人 id，若开放会导致「评论假超时永远等不到」+「关注 400 误报请登录」。
  const isNpcPost = post.authorKind === 'npc';
  const [myComments, setMyComments] = useState<BlogUserComment[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [waitingReply, setWaitingReply] = useState(false);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 评论语音播放：同一时刻只放一条，key = 评论唯一标识
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1600);
  }, []);

  // 删除自己的帖（仅 user 帖显示入口）：二次确认 → 后端删除 → 跳回博客列表
  const handleDelete = useCallback(async () => {
    if (deleting) return;
    if (!window.confirm(t('blog.delete_confirm', lang))) return;
    setDeleting(true);
    try {
      const res = await fetch('/api/blog/post', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: post.slug }),
      });
      if (!res.ok) throw new Error('delete failed');
      router.replace('/blog');
    } catch {
      setDeleting(false);
      showToast(t('blog.delete_failed', lang));
    }
  }, [deleting, lang, post.slug, router, showToast]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.scrollingElement || document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 相关推荐：拉公开 feed 首页，优先同分类、排除自己，取前 3。
  // 注意 /api/blog 返回 { posts, ... } 对象，取 .posts（旧代码当数组用致 related 恒空）。
  useEffect(() => {
    let alive = true;
    fetch('/api/blog?page=1&limit=12')
      .then((r) => (r.ok ? (r.json() as Promise<{ posts: BlogPost[] }>) : null))
      .then((data) => {
        if (!alive || !data) return;
        const others = data.posts.filter((p) => p.slug !== post.slug);
        const same = others.filter((p) => p.category === post.category);
        const rest = others.filter((p) => p.category !== post.category);
        setRelated([...same, ...rest].slice(0, 3));
      })
      .catch(() => { /* 忽略 */ });
    return () => { alive = false; };
  }, [post.slug, post.category]);

  // ----- audio wiring -----
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTime = () => {
      setCurrentTime(el.currentTime);
      // 单句跳播到句末：暂停并清标记（整段播放时 segmentEndRef 恒 null，跳过）
      if (segmentEndRef.current != null && el.currentTime >= segmentEndRef.current) {
        el.pause();
        segmentEndRef.current = null;
      }
    };
    const onMeta = () => { if (Number.isFinite(el.duration) && el.duration > 0) setDuration(el.duration); };
    const onEnd = () => { setIsPlaying(false); setCurrentTime(0); };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('loadedmetadata', onMeta);
    el.addEventListener('ended', onEnd);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    return () => {
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('loadedmetadata', onMeta);
      el.removeEventListener('ended', onEnd);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
    };
  }, []);

  // iOS 手势栈：点击到 audio.play() 之间不能 await
  const togglePlay = useCallback(() => {
    const el = audioRef.current;
    if (!el || !hasAudio) return;
    segmentEndRef.current = null;
    if (el.paused) {
      unlockAudioContext();
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(() => setIsPlaying(false));
    } else {
      el.pause();
    }
  }, [hasAudio]);

  // 点正文单句 🔊：整段有录音+该句有时间戳 → 跳播整段里这一段（句末自动停）。
  // 否则回落 edge-tts 逐句合成（user 帖无 audio / 老帖无 timing）。
  // 点击是用户手势，同步 seek+play，iOS 手势栈安全（同 togglePlay）。
  const playSentence = useCallback((s: { ko: string; t?: [number, number] }) => {
    const el = audioRef.current;
    if (hasAudio && el && s.t) {
      unlockAudioContext();
      segmentEndRef.current = s.t[1];
      el.currentTime = s.t[0];
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(() => { segmentEndRef.current = null; });
      return;
    }
    void speakWord(stripEmoji(s.ko));
  }, [hasAudio]);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = audioRef.current;
    if (!el || !hasAudio || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    el.currentTime = ratio * duration;
    setCurrentTime(el.currentTime);
  }, [hasAudio, duration]);

  const progressRatio = duration > 0 ? Math.min(1, currentTime / duration) : 0;

  // ----- like / save：乐观切换 + 失败（含 401）回滚 -----
  const react = useCallback(
    async (patch: { liked?: boolean } | { saved?: boolean }) => {
      const prevLiked = liked;
      const prevSaved = saved;
      if ('liked' in patch && patch.liked !== undefined) setLiked(patch.liked);
      if ('saved' in patch && patch.saved !== undefined) setSaved(patch.saved);
      try {
        const res = await fetch('/api/blog/react', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ postId: post.id, ...patch }),
        });
        if (!res.ok) {
          // 只回滚本次操作的字段，避免并发 like→save 时覆盖另一个的成功结果
          if ('liked' in patch) setLiked(prevLiked);
          if ('saved' in patch) setSaved(prevSaved);
          if (res.status === 401) showToast(t('blog.reader_login_to_interact', lang));
        }
      } catch {
        if ('liked' in patch) setLiked(prevLiked);
        if ('saved' in patch) setSaved(prevSaved);
      }
    },
    [liked, saved, post.id],
  );

  const toggleLike = useCallback(() => { void react({ liked: !liked }); }, [react, liked]);
  const toggleSave = useCallback(() => {
    const next = !saved;
    void react({ saved: next });
    showToast(t(next ? 'blog.reader_bookmarked' : 'blog.reader_unbookmarked', lang));
  }, [react, saved, showToast, lang]);

  // 双击封面点赞：未点赞则点赞，无论如何都放爆心动画
  const dblLike = useCallback(() => {
    if (!liked) void react({ liked: true });
    setBurst(false);
    requestAnimationFrame(() => setBurst(true));
  }, [react, liked]);

  // 双击/双触检测：onDoubleClick 触屏不触发（会被识别为缩放），统一用 tap 间隔判定，
  // 桌面移动端都走同一逻辑（IG 双击点赞本是移动端主场景）。
  const lastTap = useRef(0);
  const onCoverTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      lastTap.current = 0;
      dblLike();
    } else {
      lastTap.current = now;
    }
  }, [dblLike]);

  useEffect(() => {
    if (!burst) return;
    const t = setTimeout(() => setBurst(false), 800);
    return () => clearTimeout(t);
  }, [burst]);

  const scrollToComments = useCallback(() => {
    document.getElementById('blog-comments')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // 点击评论语音条：正在放的再点=停；否则用该动物角色音色朗读。
  // 固定评论有预录 audioUrl → 直接播文件；动态回复无 → 实时 MiniMax(按 animalId 取角色音色)。
  // 两条路径内部都自带 cancelSpeech 互斥。
  const toggleCommentSpeak = useCallback((key: string, ko: string, animalId: string, audioUrl?: string) => {
    if (speakingKey === key) {
      cancelSpeech();
      setSpeakingKey(null);
      return;
    }
    setSpeakingKey(key);
    const onEnd = () => setSpeakingKey((k) => (k === key ? null : k));
    if (audioUrl) {
      void speakPreRecorded(audioUrl, stripEmoji(ko), undefined, onEnd);
    } else {
      void speakViaMinimax(stripEmoji(ko), undefined, onEnd, 'female', animalId);
    }
  }, [speakingKey]);

  // 组件卸载时停掉正在播放的评论语音
  useEffect(() => () => { cancelSpeech(); }, []);

  // 关注态：仅 NPC 帖（作者是动物卡司）有意义。挂载时拉当前关注列表。
  useEffect(() => {
    if (!isNpcPost) { setFollowLoaded(true); return; }
    let alive = true;
    fetch('/api/blog/follow')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive) return;
        if (Array.isArray(data?.follows)) setFollowing(data.follows.includes(post.authorId));
      })
      .catch(() => { /* 忽略 */ })
      .finally(() => { if (alive) setFollowLoaded(true); });
    return () => { alive = false; };
  }, [isNpcPost, post.authorId]);

  // 关注/取关：乐观切换 + 落库 + 失败回滚 + toast
  const toggleFollow = useCallback(async () => {
    const next = !following;
    setFollowing(next);
    showToast(t(next ? 'blog.reader_followed' : 'blog.reader_unfollowed', lang));
    try {
      const res = await fetch('/api/blog/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ animalId: post.authorId, following: next }),
      });
      if (!res.ok) { setFollowing(!next); showToast(t('blog.reader_please_login', lang)); }
    } catch {
      setFollowing(!next);
    }
  }, [following, post.authorId, showToast, lang]);

  // 拉本人在该帖下已揭晓的评论/回复
  const loadMyComments = useCallback(async (): Promise<BlogUserComment[]> => {
    try {
      const res = await fetch(`/api/blog/comments?slug=${encodeURIComponent(post.slug)}`);
      if (!res.ok) return [];
      const data = (await res.json()) as { items?: BlogUserComment[] };
      const items = data.items ?? [];
      setMyComments(items);
      return items;
    } catch {
      return [];
    }
  }, [post.slug]);

  // 挂载时加载既往评论（仅 NPC 帖开评论）
  useEffect(() => {
    if (!isNpcPost) return;
    void loadMyComments();
  }, [isNpcPost, loadMyComments]);

  // 组件卸载时清轮询定时器
  useEffect(() => () => { if (pollTimer.current) clearTimeout(pollTimer.current); }, []);
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  // 轮询等待动物回复揭晓：15s/次、最多 ~90s（原 8s×100s=12+ 次请求过重）。
  // 命中即停并提示；超时不静默，提示稍后再来看，避免"typing 气泡永远转"的错觉。
  const pollForReply = useCallback((sinceCount: number, deadline: number) => {
    if (pollTimer.current) clearTimeout(pollTimer.current);
    pollTimer.current = setTimeout(async () => {
      const items = await loadMyComments();
      const replied = items.filter((c) => c.author === 'animal').length > sinceCount;
      if (replied) {
        setWaitingReply(false);
        showToast(t('blog.reader_new_reply', lang));
      } else if (Date.now() < deadline) {
        pollForReply(sinceCount, deadline);
      } else {
        setWaitingReply(false);
        showToast(t('blog.reader_reply_later', lang));
      }
    }, 15000);
  }, [loadMyComments, showToast, lang]);

  const submitComment = useCallback(async () => {
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);
    const priorReplies = myComments.filter((c) => c.author === 'animal').length;
    try {
      const res = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: post.slug, text }),
      });
      if (res.status === 401) { showToast(t('blog.reader_please_login', lang)); return; }
      if (res.status === 400) {
        const info = (await res.json().catch(() => null)) as { error?: string } | null;
        const reason = info?.error && info.error !== 'empty' ? info.error : t('blog.reader_check_content', lang);
        showToast(reason);
        return;
      }
      if (!res.ok) { showToast(t('blog.reader_send_failed', lang)); return; }
      const data = (await res.json()) as { item?: BlogUserComment };
      if (data.item) setMyComments((prev) => [...prev, data.item!]);
      setDraft('');
      setWaitingReply(true);
      // 并发触发动物回复生成（服务端调 DeepSeek 真实回应，失败回落静态池）。
      // 不 await——UI 不阻塞，回复靠下方轮询揭晓。请求失败也无所谓（服务端已兜底）。
      void fetch('/api/blog/comments/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: post.slug }),
      }).catch(() => { /* 服务端已兜底静态池，静默 */ });
      pollForReply(priorReplies, Date.now() + 90000);
    } catch {
      showToast(t('blog.reader_network_error', lang));
    } finally {
      setSending(false);
    }
  }, [draft, sending, myComments, post.slug, showToast, pollForReply, lang]);

  const sharePost = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        showToast(t('blog.reader_link_copied', lang));
      }
    } catch {
      // 用户取消分享或复制失败，静默
    }
  }, [showToast, lang]);

  // 阅读时长 / 单词数（从正文估算）
  const { wordCount, readMin } = useMemo(() => {
    const words = sentences.reduce(
      (n, s) => n + s.ko.trim().split(/\s+/).filter(Boolean).length,
      0,
    );
    return { wordCount: words, readMin: Math.max(1, Math.round(words / 90)) };
  }, [sentences]);

  // 点赞人数 / 文案
  const totalLikes = post.likeCount + (liked ? 1 : 0);
  const firstLiker = likedBy.length > 0 ? getBlogAuthor(likedBy[0]).name : author.name;
  const likedAvatars = likedBy.slice(0, 3);

  // 文章正文（mobile + desktop 共用）。边读边听：正文不折叠，与全文音频对齐。
  const articleBody = (
    <div className="blog-article">
      {sentences.map((s, si) => (
        <div className="blog-sentence" key={si}>
          <div className="blog-ko-row">
            <TappableText text={stripEmoji(s.ko)} className="blog-ko" source="blog-post" />
            <button
              type="button"
              className="blog-ko-speak"
              onClick={() => playSentence(s)}
              aria-label={t('a11y.play_audio', lang)}
            >
              🔊
            </button>
          </div>
          {showZh && s.zh && <p className="blog-zh">{s.zh}</p>}
        </div>
      ))}
    </div>
  );

  // 语音播放器（mobile + desktop 共用）。无音频时不伪装可播：波形静置 + 준비 中提示。
  const voicePlayer = hasAudio ? (
    <>
      <div className="blog-voice">
        <button
          type="button"
          className="blog-voice-play"
          onClick={togglePlay}
          aria-label={isPlaying ? t('blog.reader_pause', lang) : t('blog.reader_play', lang)}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <div className="blog-voice-wave" onClick={seek}>
          {WAVE.map((h, i) => {
            const on = i / WAVE.length < progressRatio;
            return <i key={i} className={`blog-voice-bar${on ? ' on' : ''}`} style={{ height: `${h}%` }} />;
          })}
        </div>
        <div className="blog-voice-time">
          <b>{formatTime(currentTime)}</b> / {formatTime(duration)}
        </div>
      </div>
      <div className="blog-voice-caption">{t('blog.reader_tts_caption', lang, { name: author.name })}</div>
    </>
  ) : (
    <>
      <div className="blog-voice pending" aria-disabled="true">
        <div className="blog-voice-play" aria-hidden>🎧</div>
        <div className="blog-voice-wave">
          {WAVE.map((h, i) => (
            <i key={i} className="blog-voice-bar" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="blog-voice-caption">{t('blog.reader_voice_pending', lang)}</div>
    </>
  );

  // 话题标签
  const tagsBlock = (
    <div className="blog-tags">
      <span className="blog-tag">#{post.category}</span>
      <span className="blog-tag lv">#{post.level}</span>
    </div>
  );

  // 评论流 + 视觉版输入框（mobile + desktop 共用）
  const commentsBlock = (
    <div className="blog-comments" id="blog-comments">
      <h2 className="blog-comments-title">💬 {t('blog.reader_comments_count', lang, { n: comments.length })}</h2>
      {comments.map((c, i) => {
        const ca = getBlogAuthor(c.animalId);
        return (
          <div className="blog-comment" key={i}>
            <div className={`blog-comment-av blog-av-${ca.id}`}><AvatarFace author={ca} /></div>
            <div className="blog-comment-bubble">
              <div className="blog-comment-name">{ca.name}</div>
              <TappableText text={stripEmoji(c.ko)} className="blog-comment-ko" source="blog-comment" />
              {showZh && <div className="blog-comment-zh">{c.zh}</div>}
              {(() => {
                const key = `c-${i}`;
                const on = speakingKey === key;
                return (
                  <button
                    type="button"
                    className={`blog-cvoice${on ? ' on' : ''}`}
                    onClick={() => toggleCommentSpeak(key, c.ko, c.animalId, c.audioUrl)}
                    aria-label={t(on ? 'blog.reader_pause' : 'blog.reader_play', lang)}
                  >
                    <span className="blog-cvoice-ico">{on ? '⏸' : '▶'}</span>
                    <span className="blog-cvoice-wave" data-on={on}>
                      {WAVE_MINI.map((h, wi) => (
                        <i key={wi} className="blog-cvoice-bar" style={{ height: `${h}%`, animationDelay: `${wi * 0.08}s` }} />
                      ))}
                    </span>
                  </button>
                );
              })()}
            </div>
          </div>
        );
      })}
      {isNpcPost && (
        <div className="blog-mine">
          <div className="blog-mine-head">
            <span className="blog-mine-title">{t('blog.reader_my_comment', lang)}</span>
            <span className="blog-mine-sub">{t('blog.reader_mine_sub', lang, { name: author.name })}</span>
          </div>

          {myComments.map((c) => (
            c.author === 'me' ? (
              <div className="blog-mine-row me" key={c.id}>
                <div className="blog-mine-bubble me">{c.ko}</div>
                <div className="blog-mine-av me">🙂</div>
              </div>
            ) : (
              <div className="blog-mine-row" key={c.id}>
                <div className={`blog-mine-av blog-av-${c.animalId}`}><AvatarFace author={getBlogAuthor(c.animalId)} /></div>
                <div className="blog-mine-bubble">
                  <div className="blog-mine-name">{getBlogAuthor(c.animalId).name}</div>
                  <TappableText text={c.ko} className="blog-mine-ko" source="blog-comment" />
                  {c.zh && <div className="blog-mine-zh">{c.zh}</div>}
                  {(() => {
                    const key = `m-${c.id}`;
                    const on = speakingKey === key;
                    return (
                      <button
                        type="button"
                        className={`blog-cvoice${on ? ' on' : ''}`}
                        onClick={() => toggleCommentSpeak(key, c.ko, c.animalId)}
                        aria-label={t(on ? 'blog.reader_pause' : 'blog.reader_play', lang)}
                      >
                        <span className="blog-cvoice-ico">{on ? '⏸' : '▶'}</span>
                        <span className="blog-cvoice-wave" data-on={on}>
                          {WAVE_MINI.map((h, wi) => (
                            <i key={wi} className="blog-cvoice-bar" style={{ height: `${h}%`, animationDelay: `${wi * 0.08}s` }} />
                          ))}
                        </span>
                      </button>
                    );
                  })()}
                </div>
              </div>
            )
          ))}

          {waitingReply && (
            <div className="blog-mine-row">
              <div className={`blog-mine-av blog-av-${author.id}`}><AvatarFace author={author} /></div>
              <div className="blog-mine-typing"><i /><i /><i /></div>
            </div>
          )}

          <div className="blog-composer">
            <div className="blog-composer-av blog-av-tori">🙂</div>
            <input
              className="blog-composer-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) { e.preventDefault(); void submitComment(); } }}
              placeholder={t('blog.reader_comment_ph', lang, { name: author.name })}
              maxLength={300}
              disabled={sending}
            />
            <button
              type="button"
              className="blog-composer-send"
              onClick={() => void submitComment()}
              disabled={sending || !draft.trim()}
              aria-label={t('blog.reader_send', lang)}
            >
              {sending ? '…' : '↑'}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // 可选测验（仅当有数据时；复用 quiz 卡样式）
  const quizBlock = quiz.length > 0 && (
    <div className="blog-quiz">
      <h2 className="blog-quiz-title">✏️ {t('blog.reader_quiz_title', lang)}</h2>
      {quiz.map((q, qi) => {
        const picked = quizPicks[qi];
        const answered = picked !== undefined;
        return (
          <div key={qi}>
            <p className="blog-quiz-q">{q.question}</p>
            {q.options.map((opt, oi) => {
              let cls = 'blog-quiz-option';
              if (answered) {
                if (oi === q.answerIndex) cls += ' correct';
                else if (oi === picked) cls += ' wrong';
              }
              return (
                <button
                  key={oi}
                  type="button"
                  className={cls}
                  disabled={answered}
                  onClick={() => setQuizPicks((p) => ({ ...p, [qi]: oi }))}
                >
                  {opt}
                </button>
              );
            })}
            {answered && q.explanation && <p className="blog-quiz-exp">💡 {q.explanation}</p>}
          </div>
        );
      })}
    </div>
  );

  // 点赞头像行（sidebar / mobile 共用 span 列表）
  const likeAvatarSpans = likedAvatars.map((id) => (
    <span key={id}>{getBlogAuthor(id).emoji}</span>
  ));

  return (
    <div className="blog-root">
      <div className="blog-progress" style={{ width: `${progress}%` }} />
      {toast && <div className="blog-toast">{toast}</div>}
      <div className="blog-reader">
        {/* ===== 顶部栏（mobile: center+more；desktop: inner breadcrumb+quick-act）===== */}
        <header className="blog-topbar">
          <div className="blog-topbar-inner">
            <button type="button" className="blog-back" onClick={goBack} aria-label={t('blog.reader_back', lang)}>←</button>

            {/* mobile 作者简讯 */}
            <div className="blog-topbar-center">
              <div className={`blog-topbar-av blog-av-${author.id}`}><AvatarFace author={author} /></div>
              <div>
                <div className="blog-topbar-name">{author.name}</div>
                <div className="blog-topbar-handle">{author.handle}</div>
              </div>
            </div>

            {/* desktop 面包屑 */}
            <div className="blog-breadcrumb">
              {t('blog.crumb_title', lang)} <span className="blog-crumb-sep">·</span>
              <span className="blog-crumb-mut">{post.category}</span>
            </div>

            {/* desktop 快捷点赞/收藏 */}
            <div className="blog-topbar-actions">
              <button
                type="button"
                className={`blog-quick-act${liked ? ' liked' : ''}`}
                onClick={toggleLike}
                aria-pressed={liked}
              >
                ❤️ <span className="blog-quick-act-n">{totalLikes}</span>
              </button>
              <button
                type="button"
                className={`blog-quick-act${saved ? ' saved' : ''}`}
                onClick={toggleSave}
                aria-pressed={saved}
              >
                🔖 <span className="blog-quick-act-n">{t(saved ? 'blog.reader_saved' : 'blog.reader_save', lang)}</span>
              </button>
            </div>

            {/* 自己的帖：编辑 + 删除入口（blocked 帖不给编辑，走重发）；否则装饰性更多 */}
            {isUserPost ? (
              <div className="blog-topbar-acts">
                {post.aiStatus !== 'blocked' && (
                  <button
                    type="button"
                    className="blog-topbar-edit"
                    onClick={() => setEditing(true)}
                    disabled={deleting}
                    aria-label={t('blog.edit_post', lang)}
                  >
                    {t('blog.edit_post', lang)}
                  </button>
                )}
                <button
                  type="button"
                  className="blog-topbar-del"
                  onClick={handleDelete}
                  disabled={deleting}
                  aria-label={t('blog.delete_post', lang)}
                >
                  {t('blog.delete_post', lang)}
                </button>
              </div>
            ) : (
              <div className="blog-topbar-more" aria-hidden="true">⋯</div>
            )}
          </div>
        </header>

        {/* ===== 两栏页面（desktop grid；mobile 为普通流）===== */}
        <div className="blog-page">
          {/* 左：阅读主体 */}
          <article className="blog-reader-card">
            {/* 作者头 + 关注 */}
            <div className="blog-author">
              <div className={`blog-author-av blog-av-${author.id}`}><AvatarFace author={author} /></div>
              <div className="blog-author-id">
                <div className="blog-author-name">
                  {author.name} {author.badge && <span>{author.badge}</span>}
                </div>
                <div className="blog-author-sub">{author.handle}</div>
              </div>
              {isNpcPost && followLoaded && (
                <button
                  type="button"
                  className={`blog-follow-btn${following ? ' following' : ''}`}
                  aria-pressed={following}
                  onClick={() => void toggleFollow()}
                >
                  {t(following ? 'blog.following' : 'blog.follow', lang)}
                </button>
              )}
            </div>

            {/* 封面：仅后台配了图才展示轮播（双击点赞爆心）；无图不显示封面块 */}
            {post.content.images && post.content.images.length > 0 && (
              <PostGallery
                images={post.content.images}
                theme={post.coverTheme}
                alt={post.titleKo}
                onTap={onCoverTap}
              >
                <span className="blog-cat-chip">{post.category}</span>
                <span className="blog-level-badge">{post.level}</span>
                <span className="blog-cover-watermark">{author.name}</span>
                {burst && <span className="blog-burst-heart" aria-hidden>❤️</span>}
              </PostGallery>
            )}

            {/* 标题 */}
            <div className="blog-title-block">
              <h1 className="blog-title">{stripEmoji(post.titleKo)}</h1>
              {showZh && <p className="blog-title-sub">{post.titleZh}</p>}
              <div className="blog-meta-row">
                <div className="blog-meta-badges">
                  <span className="blog-meta-badge">{t('blog.reader_read_time', lang, { min: readMin })}</span>
                  <span className="blog-meta-badge">{t('blog.reader_word_count', lang, { n: wordCount })}</span>
                  <span className="blog-meta-badge">{fmtDate(post.publishedAt, lang)}</span>
                </div>
                <button
                  type="button"
                  className={`blog-zh-toggle${showZh ? ' on' : ''}`}
                  aria-pressed={showZh}
                  onClick={() => setShowZh((v) => !v)}
                >
                  {t(showZh ? 'blog.reader_ko_only' : 'blog.reader_show_zh', lang)}
                </button>
              </div>
            </div>

            {/* 语音播放器 */}
            {voicePlayer}

            {/* 正文 */}
            {articleBody}

            {/* 话题标签 */}
            {tagsBlock}

            {/* mobile 社交操作栏（desktop 由 CSS 隐藏）*/}
            <div className="blog-actions">
              <button
                type="button"
                className={`blog-heart${liked ? ' liked' : ''}`}
                onClick={toggleLike}
                aria-pressed={liked}
                aria-label={t('blog.aria_like', lang)}
              >
                ❤️
              </button>
              <span className="blog-cnt">{totalLikes}</span>
              <button type="button" className="blog-ico" onClick={scrollToComments} aria-label={t('blog.aria_comments', lang)}>💬</button>
              <span className="blog-cnt">{comments.length}</span>
              <button type="button" className="blog-ico" onClick={sharePost} aria-label={t('blog.aria_share', lang)}>📨</button>
              <span className="blog-spacer" />
              <button
                type="button"
                className={`blog-save${saved ? ' saved' : ''}`}
                onClick={toggleSave}
                aria-pressed={saved}
                aria-label={t('blog.aria_bookmark', lang)}
              >
                🔖
              </button>
            </div>

            {/* mobile 点赞行（desktop 由 CSS 隐藏）*/}
            <div className="blog-likes">
              {likedAvatars.length > 0 && <span className="blog-likes-avs">{likeAvatarSpans}</span>}
              <span dangerouslySetInnerHTML={{ __html: t('blog.like_attribution', lang, { name: firstLiker, count: totalLikes }) }} />
            </div>

            {/* 可选测验 */}
            {quizBlock}

            {/* 评论流（desktop 用负 margin 破格到卡片边缘）*/}
            {commentsBlock}
          </article>

          {/* 右：desktop sticky 侧栏（mobile 由 CSS 不显示；此处始终渲染，同一状态/处理器）*/}
          <aside className="blog-sidebar">
            {/* 卡片 0 — 作者卡（头像/关注/简介）*/}
            <div className="blog-side-card blog-author-card">
              <div className={`blog-author-card-av blog-av-${author.id}`}><AvatarFace author={author} /></div>
              <div className="blog-author-card-name">
                {author.name}
                {author.badge && <span className="blog-author-card-badge">{author.badge}</span>}
              </div>
              <div className="blog-author-card-handle">{author.handle}</div>
              {isNpcPost && (
                <button
                  type="button"
                  className={`blog-author-card-follow${following ? ' on' : ''}`}
                  aria-pressed={following}
                  onClick={() => void toggleFollow()}
                >
                  {t(following ? 'blog.following' : 'blog.follow', lang)}
                </button>
              )}
            </div>

            {/* 卡片 A — 社交操作 */}
            <div className="blog-side-card">
              <button
                type="button"
                className={`blog-act-btn like${liked ? ' on' : ''}`}
                onClick={toggleLike}
                aria-pressed={liked}
              >
                ❤️ {t('blog.like', lang)} {totalLikes}
              </button>
              <div className="blog-act-row">
                <button
                  type="button"
                  className={`blog-act-btn save${saved ? ' on' : ''}`}
                  style={{ flex: 1 }}
                  onClick={toggleSave}
                  aria-pressed={saved}
                >
                  🔖 {t(saved ? 'blog.reader_saved' : 'blog.reader_save', lang)}
                </button>
              </div>
              <div className="blog-act-row">
                <button type="button" className="blog-act-mini" onClick={scrollToComments}>💬 {t('blog.reader_comments_count', lang, { n: comments.length })}</button>
                <button type="button" className="blog-act-mini" onClick={sharePost}>📨 {t('blog.aria_share', lang)}</button>
              </div>
              <div className="blog-likes-line">
                {likedAvatars.length > 0 && <span className="blog-likes-avs">{likeAvatarSpans}</span>}
                {t('blog.likes_received', lang)} <b>{totalLikes}</b>
              </div>
            </div>

            {/* 卡片 B — 이 글의 새 단어 */}
            {vocab.length > 0 && (
              <div className="blog-side-card">
                <h3 className="blog-side-title">{t('blog.reader_vocab', lang)}</h3>
                {vocab.map((v, i) => (
                  <div className="blog-vocab-row" key={i}>
                    <div className="blog-vocab-main">
                      <div className="blog-vocab-ko">
                        {v.word}
                        {v.reading && <span className="blog-vocab-rd">{v.reading}</span>}
                      </div>
                      {showZh && <div className="blog-vocab-mean">{v.meaning}</div>}
                    </div>
                    <button
                      type="button"
                      className="blog-vocab-spk"
                      aria-label={`${t('blog.reader_read_aloud', lang)} ${v.word}`}
                      onClick={() => void speakWord(v.word)}
                    >
                      🔊
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 卡片 B2 — 관련 글 추천 */}
            {related.length > 0 && (
              <div className="blog-side-card">
                <h3 className="blog-side-title">📖 {t('blog.related_posts', lang)}</h3>
                <div className="blog-related-list">
                  {related.map((r) => {
                    const ra = getBlogAuthor(r.authorId);
                    return (
                      <Link key={r.slug} href={`/blog/${r.slug}`} className="blog-related-item">
                        <div className={`blog-related-thumb theme-${r.coverTheme}`}>
                          {r.coverImageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={r.coverImageUrl} alt={r.titleKo} />
                          ) : (
                            <span>{r.coverEmoji}</span>
                          )}
                        </div>
                        <div className="blog-related-txt">
                          <div className="blog-related-tt">{stripEmoji(r.titleKo)}</div>
                          <div className="blog-related-mt">{ra.emoji} {ra.name} · ❤️ {r.likeCount}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 卡片 C — 토리와 친구들 */}
            <div className="blog-side-card">
              <h3 className="blog-side-title">🐾 {t('blog.cast_title', lang)}</h3>
              <div className="blog-cast-grid">
                {BLOG_CAST.map((a) => (
                  <div className="blog-cast-item" key={a.id}>
                    <div className={`blog-cast-av blog-av-${a.id}`}><AvatarFace author={a} /></div>
                    <div className="blog-cast-name">{a.name}</div>
                  </div>
                ))}
              </div>
              <div className="blog-cast-count">{t('blog.cast_count', lang, { n: BLOG_CAST.length })}</div>
            </div>
          </aside>
        </div>
      </div>

      {/* 真实 audio 元素 */}
      {hasAudio && <audio ref={audioRef} src={post.audioUrl} preload="metadata" />}

      {editing && (
        <BlogEditModal
          post={post}
          onClose={() => setEditing(false)}
          onSaved={() => { setEditing(false); router.refresh(); }}
        />
      )}
    </div>
  );
}
