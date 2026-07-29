'use client';

import '../radio.css';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { TappableText } from '@/components/TappableText';
import RadioLineExtras from '@/components/radio/RadioLineExtras';
import {
  RADIO_LISTENERS,
  RADIO_LISTENER_COUNT,
  type RadioEpisode,
} from '@/data/radioCast';
import type { RadioCard } from '@/types';
import {
  isFavorite,
  toggleFavorite,
  markListenedToday,
  getResumePosition,
  saveResumePosition,
  clearResumePosition,
  markEpisodeListened,
  getListenedSet,
  getFavorites,
} from '@/lib/radioLocal';
import { AddToBookSheet } from '@/components/vocabulary/AddToBookSheet';
import type { RadioVocab } from '@/data/radioCast';
import { getComments } from '@/data/radioChat';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { speakWord } from '@/lib/tts';
import { Volume2 } from 'lucide-react';

// RadioEpisode 含 RadioCard 全部字段，抽轻量快照存收藏
function toCard(ep: RadioEpisode): RadioCard {
  return {
    id: ep.id,
    program: ep.program,
    title: ep.title,
    titleZh: ep.titleZh,
    host: ep.host,
    hostEmoji: ep.hostEmoji,
    level: ep.level,
    duration: ep.duration,
    scheduleTime: ep.scheduleTime,
    coverColor: ep.coverColor,
    category: ep.category,
    day: ep.day,
  };
}

// 收敛到 5 档：保留两档默认速度(松鼠0.85/晚安熊0.9)，去掉极端 0.5/1.25。
const SPEEDS = [0.75, 0.85, 0.9, 1, 1.1] as const;
// 按节目的初始默认倍速：初级/晚安类放慢，其余常速
const PROGRAM_DEFAULT_SPEED: Record<string, number> = {
  'squirrel-morning': 0.85,
  'bear-night': 0.9,
};
const AV_COLORS = ['pink', 'mint', 'gold', 'purple', 'rose'] as const;

// 4 档中文名（左栏进度面板各档进度用）
const PROGRAM_LABELS: Record<string, string> = {
  'squirrel-morning': '다람쥐 아침',
  'animal-news': '동물시 뉴스',
  'bear-night': '곰의 밤',
  'fox-cafe': '여우 카페',
};

// 所有电台默认 1x 原速播放；用户可手动切换 SPEEDS 档位。

// 秒 → m:ss
function fmt(sec: number): string {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function RadioPlayerClient({
  episode,
  dayEpisodes,
}: {
  episode: RadioEpisode;
  dayEpisodes: RadioCard[];
}) {
  const router = useRouter();
  const { lang } = useLang();
  const goBack = useSmartBack('/radio');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const transcriptListRef = useRef<HTMLDivElement | null>(null);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0); // 当前播放秒
  const [total, setTotal] = useState(0);
  const [speed, setSpeed] = useState(PROGRAM_DEFAULT_SPEED[episode.program] ?? 1);
  const [loop, setLoop] = useState(false); // 单集循环播放
  const [activeIdx, setActiveIdx] = useState(-1);
  const [showZh, setShowZh] = useState(true); // 字幕中文显隐：先盲听测理解再对答案
  const [resumeAt, setResumeAt] = useState(0); // 上次听到的秒（>0 时提示可续播）
  const [vocabToAdd, setVocabToAdd] = useState<RadioVocab | null>(null); // 打开加词面板的生词
  const listenedRef = useRef(false); // 本次是否已记过"听过"，避免重复写
  const streakMarkedRef = useRef(false); // 本次是否已记过"打卡"(播放≥30s)，避免重复写

  // 收藏 + toast
  const [fav, setFav] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 顶部下滑抽屉：合并「学习进度 + 往期存档 + 更多电台清单」，三条杠打开
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [drawerOpen]);
  // 换期时关抽屉（key 重挂已重置，但抽屉里点击切集在同一实例内，需手动关）
  const openInDrawer = useCallback((id: string) => {
    setDrawerOpen(false);
    router.push(`/radio/${id}`);
  }, [router]);

  // 倍速下拉：默认收起，只显示当前速度按钮，点击展开选项
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);

  // 睡眠定时：选 15/30/60 分或"本集结束"，到点暂停
  const [sleepMenuOpen, setSleepMenuOpen] = useState(false);
  const [sleepMin, setSleepMin] = useState(0); // 0=关闭；-1=本集结束；>0=分钟
  const sleepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    setFav(isFavorite(episode.id));
  }, [episode.id]);
  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);
  const toggleFav = useCallback(() => {
    const nowOn = toggleFavorite(toCard(episode));
    setFav(nowOn);
    setToast(nowOn ? '즐겨찾기 추가 ✓' : '즐겨찾기 해제');
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1600);
  }, [episode]);

  // 注：换期由 page.tsx 的 key={episode.id} 强制重挂，所有 state(speed/playing/
  // listenedRef/streakMarkedRef…)随重挂自动重置，无需手动 effect。

  // 左栏用：往期库(archive) + 听过集合 + 收藏数（客户端拉，播放器 SSR 不带这些）
  const [archive, setArchive] = useState<RadioCard[]>([]);
  const [listened, setListened] = useState<Set<string>>(new Set());
  const [favCount, setFavCount] = useState(0);
  useEffect(() => {
    setListened(getListenedSet());
    setFavCount(getFavorites().length);
    let alive = true;
    fetch('/api/radio/archive')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (alive && d && Array.isArray(d.episodes)) setArchive(d.episodes);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [episode.id]);

  const progress = useMemo(() => {
    const total = archive.length;
    const done = archive.filter((e) => listened.has(e.id)).length;
    const byProgram: Record<string, { done: number; total: number; color: string }> = {};
    for (const e of archive) {
      const p = (byProgram[e.program] ||= { done: 0, total: 0, color: e.coverColor });
      p.total += 1;
      if (listened.has(e.id)) p.done += 1;
    }
    return { total, done, byProgram };
  }, [archive, listened]);

  const archiveByDay = useMemo(() => {
    const map = new Map<number, RadioCard[]>();
    for (const e of archive) {
      const arr = map.get(e.day) || [];
      arr.push(e);
      map.set(e.day, arr);
    }
    return [...map.entries()].sort((a, b) => b[0] - a[0]);
  }, [archive]);

  const hasAudio = episode.audioUrl.trim().length > 0;
  const hasSubs = episode.subtitles.length > 0;
  // 访谈档：字幕带 speaker，双人左右分栏渲染
  const isInterview = episode.program === 'fox-interview';
  const guestName = episode.guests[0] || '게스트';

  const openEpisode = (id: string) => router.push(`/radio/${id}`);

  // 分享本期：优先系统分享面板，不支持则复制链接
  const showToastMsg = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1600);
  }, []);
  const onShare = useCallback(async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const shareData = {
      title: `${episode.title} · 동물 도시 라디오`,
      text: `${episode.titleZh} · ${episode.host}`,
      url,
    };
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(shareData);
        return;
      }
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        showToastMsg('링크를 복사했어요 ✓');
        return;
      }
      showToastMsg('공유를 지원하지 않는 환경이에요');
    } catch {
      /* 用户取消分享面板不算错误 */
    }
  }, [episode, showToastMsg]);

  // 上一首 / 下一首：在同一 Day 的 4 档节目里找相邻（SSR 传入的轻量元数据）
  const idx = dayEpisodes.findIndex((e) => e.id === episode.id);
  const prevEp = idx > 0 ? dayEpisodes[idx - 1] : undefined;
  const nextEp = idx >= 0 && idx < dayEpisodes.length - 1 ? dayEpisodes[idx + 1] : undefined;

  // ── 字幕高亮：currentTime 落在哪句 [start,end] 就高亮该句 ──
  useEffect(() => {
    const i = episode.subtitles.findIndex(
      (s) => current >= s.start && current < s.end,
    );
    setActiveIdx(i);
  }, [current, episode.subtitles]);

  // 高亮句滚动到可视区：只在字幕容器内部滚，绝不滚动整页
  // （用 scrollIntoView 会冒泡滚动最近可滚祖先，桌面定高布局下会把整页往下拽）
  useEffect(() => {
    if (activeIdx < 0) return;
    const el = lineRefs.current[activeIdx];
    const list = transcriptListRef.current;
    if (!el || !list) return;
    const elTop = el.offsetTop - list.offsetTop;
    const target = elTop - list.clientHeight / 2 + el.clientHeight / 2;
    list.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
  }, [activeIdx]);

  // ── 原生 audio 事件 ──
  // 播放中：更新进度条 + 播≥30s 记今日打卡 + 每约 5s 存续播位置 + 播到 ≥90% 记"听过"
  const lastSaveRef = useRef(0);
  // 逐句区间播放：非 null 时，播到该秒数即暂停（跟读"听原句"用）
  const segmentEndRef = useRef<number | null>(null);
  const onTimeUpdate = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    setCurrent(a.currentTime);
    const now = a.currentTime;
    if (segmentEndRef.current != null && now >= segmentEndRef.current) {
      a.pause();
      setPlaying(false);
      segmentEndRef.current = null;
      return;
    }
    // 打卡：真正播放累计 ≥30s 才记（避免"打开即打卡"虚高 streak）
    if (!streakMarkedRef.current && now >= 30) {
      streakMarkedRef.current = true;
      markListenedToday();
    }
    if (Math.abs(now - lastSaveRef.current) >= 5) {
      lastSaveRef.current = now;
      saveResumePosition(episode.id, now, a.duration);
    }
    if (!listenedRef.current && isFinite(a.duration) && a.duration > 0 && now >= a.duration * 0.9) {
      listenedRef.current = true;
      markEpisodeListened(episode.id);
    }
  }, [episode.id]);

  const onLoadedMeta = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (isFinite(a.duration)) setTotal(a.duration);
    a.playbackRate = speed; // src 加载后 playbackRate 会被重置为 1，这里套回当前(按档默认)速度
    a.loop = loop;
    // 续播：跳回上次听到的位置（saveResumePosition 已过滤太靠头/尾）
    const at = getResumePosition(episode.id);
    if (at > 0 && isFinite(a.duration) && at < a.duration - 5) {
      a.currentTime = at;
      setCurrent(at);
      setResumeAt(at);
    }
  }, [speed, loop, episode.id]);

  const onEnded = useCallback(() => {
    setPlaying(false);
    if (!listenedRef.current) {
      listenedRef.current = true;
      markEpisodeListened(episode.id);
    }
    clearResumePosition(episode.id); // 播完清掉，下次从头
    if (sleepMin === -1) setSleepMin(0); // "本集结束"定时：播完即解除
  }, [sleepMin, episode.id]);

  // 卸载 / 切集：存一次当前位置（onTimeUpdate 的 5s 节流可能漏掉最后一截）
  useEffect(() => {
    const a = audioRef.current;
    return () => {
      if (a && a.currentTime > 0) saveResumePosition(episode.id, a.currentTime, a.duration);
    };
  }, [episode.id]);

  // 睡眠定时：分钟制用 setTimeout 到点暂停；"本集结束"由 onEnded 处理
  const pickSleep = useCallback((min: number) => {
    setSleepMenuOpen(false);
    if (sleepTimer.current) {
      clearTimeout(sleepTimer.current);
      sleepTimer.current = null;
    }
    setSleepMin(min);
    if (min > 0) {
      sleepTimer.current = setTimeout(() => {
        audioRef.current?.pause();
        setPlaying(false);
        setSleepMin(0);
        setToast('취침 타이머 · 재생을 멈췄어요');
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(''), 2200);
      }, min * 60_000);
      setToast(`${min}분 후 자동 정지`);
    } else if (min === -1) {
      setToast('이번 회 끝나면 정지');
    } else {
      setToast('취침 타이머 해제');
    }
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1600);
  }, []);
  useEffect(() => () => {
    if (sleepTimer.current) clearTimeout(sleepTimer.current);
  }, []);

  const togglePlay = useCallback(() => {
    const a = audioRef.current;
    if (!a || !hasAudio) return;
    segmentEndRef.current = null; // 手动播放时解除逐句区间限制
    if (a.paused) {
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      a.pause();
      setPlaying(false);
    }
  }, [hasAudio]);

  const changeSpeed = useCallback((s: number) => {
    setSpeed(s);
    if (audioRef.current) audioRef.current.playbackRate = s;
    setSpeedMenuOpen(false);
  }, []);

  const toggleLoop = useCallback(() => {
    setLoop((v) => {
      const next = !v;
      if (audioRef.current) audioRef.current.loop = next;
      setToast(next ? '한 곡 반복 켜기 🔁' : '한 곡 반복 끄기');
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToast(''), 1600);
      return next;
    });
  }, []);

  // 点击任意字幕句：跳到该句开头并高亮（不改播放/暂停态，只挪位置）。
  // 无音频时用纯 UI 高亮兜底（setCurrent 落在区间即高亮）。
  const seekToLine = useCallback((start: number) => {
    const a = audioRef.current;
    segmentEndRef.current = null;
    if (a && hasAudio && isFinite(a.duration)) {
      a.currentTime = start;
    }
    setCurrent(start);
  }, [hasAudio]);

  // 逐句"听原句"：跳到 start 播放，onTimeUpdate 到 end 自动暂停
  const playSegment = useCallback((start: number, end: number) => {
    const a = audioRef.current;
    if (!a || !hasAudio) return;
    segmentEndRef.current = end;
    a.currentTime = start;
    a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [hasAudio]);

  // 拖动/点击进度条 seek：clientX 换算成占比 → 设 currentTime
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const seekToClientX = useCallback((clientX: number) => {
    const a = audioRef.current;
    const bar = progressBarRef.current;
    if (!a || !bar || !isFinite(a.duration)) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    segmentEndRef.current = null; // 手动 seek 解除逐句区间限制
    a.currentTime = ratio * a.duration;
    setCurrent(a.currentTime);
  }, []);
  // 仅响应本进度条上发起的拖动：记录 pointerdown 的 pointerId，
  // move 时只认这个 id。避免其他悬浮控件（如可拖动的反馈按钮）拖到进度条上方时误触 seek。
  const seekPointerId = useRef<number | null>(null);
  const onProgressPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!hasAudio) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      seekPointerId.current = e.pointerId;
      seekToClientX(e.clientX);
    },
    [hasAudio, seekToClientX],
  );
  const onProgressPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (seekPointerId.current !== e.pointerId) return; // 只跟随自己发起的拖动
      if (e.buttons !== 1) return; // 仅按住拖动时
      seekToClientX(e.clientX);
    },
    [seekToClientX],
  );
  const onProgressPointerEnd = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (seekPointerId.current === e.pointerId) seekPointerId.current = null;
  }, []);
  const onProgressKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const a = audioRef.current;
      if (!a || !isFinite(a.duration)) return;
      let delta = 0;
      if (e.key === 'ArrowRight') delta = 5;
      else if (e.key === 'ArrowLeft') delta = -5;
      else return;
      e.preventDefault();
      a.currentTime = Math.min(a.duration, Math.max(0, a.currentTime + delta));
      setCurrent(a.currentTime);
    },
    [],
  );

  const progressPct = total > 0 ? (current / total) * 100 : 0;
  const displayTotal = total > 0 ? fmt(total) : episode.duration;

  // ── 各区块（桌面按设计稿分左播放区 / 右侧栏；手机线性堆叠）──

  const coverBlock = (
    <div className="radio-cover-section">
      <div className="radio-cover-wrap">
        <div className={`radio-vinyl-disc radio-cover-${episode.coverColor}${hasAudio && playing ? ' radio-spinning' : ''}`}>
          <div
            className="radio-cover-art radio-cover-img"
            style={{ backgroundImage: `url(/images/radio/${episode.program}.webp)` }}
          />
        </div>
        <div className="radio-cover-ep">
          {isInterview ? `TALK #${String(episode.day).padStart(2, '0')}` : `제${episode.day}회`}
        </div>
        {!isInterview && <div className="radio-cover-time">{episode.scheduleTime} · 매일</div>}
      </div>
    </div>
  );

  const infoBlock = (
    <div className="radio-track-info">
      <div className="radio-track-title-row">
        <div className="radio-track-title">{episode.title}</div>
        <button
          type="button"
          className={`radio-fav-toggle${fav ? ' radio-on' : ''}`}
          onClick={toggleFav}
          aria-label={fav ? t('radio.unfavorite', lang) : t('radio.favorite', lang)}
          aria-pressed={fav}
        >
          {fav ? '⭐' : '☆'}
        </button>
      </div>
      <div className="radio-track-subtitle">
        {episode.titleZh} · {episode.level}
      </div>
      <div className="radio-track-tags">
        <span className="radio-track-tag">{episode.category}</span>
        <span className="radio-track-tag">{isInterview ? guestName : episode.host}</span>
        <span className="radio-track-tag">{episode.level}</span>
      </div>
    </div>
  );

  const transcriptBlock = (
    <div className="radio-transcript-section">
      <div className="radio-transcript-header">
        <div className="radio-transcript-label">실시간 자막 · LIVE</div>
        <button
          type="button"
          className={`radio-zh-toggle${showZh ? ' radio-on' : ''}`}
          onClick={() => setShowZh((v) => !v)}
          aria-pressed={showZh}
        >
          {showZh ? '중문 끄기' : '중문 켜기'}
        </button>
      </div>
      {hasSubs ? (
        <div className={`radio-transcript-list${isInterview ? ' radio-transcript-chat' : ''}`} ref={transcriptListRef}>
          {episode.subtitles.map((s, i) => {
            const who = s.speaker; // 'host' | 'guest' | undefined
            const speakerName = who === 'host' ? episode.host : guestName;
            const speakerEmoji = who === 'host' ? episode.hostEmoji : '💬';
            return (
              <div
                key={i}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                className={`radio-transcript-line${i === activeIdx ? ' radio-active' : ''}${who ? ` radio-turn-${who}` : ''}`}
                onClick={() => seekToLine(s.start)}
              >
                {who && (
                  <span className="radio-turn-who">
                    <span className="radio-turn-emoji">{speakerEmoji}</span>
                    {speakerName}
                  </span>
                )}
                <span className="radio-turn-bubble">
                  <TappableText text={s.ko} source="radio" className="radio-transcript-ko" />
                  {showZh && <div className="radio-transcript-zh">{s.zh}</div>}
                  <RadioLineExtras
                    ko={s.ko}
                    zh={s.zh}
                    start={s.start}
                    end={s.end}
                    onPlaySegment={playSegment}
                    disabled={!hasAudio}
                  />
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="radio-transcript-empty">자막 준비 중…</div>
      )}
    </div>
  );

  const progressBlock = (
    <div className="radio-progress-section">
      <div
        ref={progressBarRef}
        className="radio-progress-bar"
        role="slider"
        tabIndex={0}
        aria-label={t('radio.seek', lang)}
        aria-valuemin={0}
        aria-valuemax={Math.round(total) || 0}
        aria-valuenow={Math.round(current)}
        aria-valuetext={`${fmt(current)} / ${displayTotal}`}
        onPointerDown={onProgressPointerDown}
        onPointerMove={onProgressPointerMove}
        onPointerUp={onProgressPointerEnd}
        onPointerCancel={onProgressPointerEnd}
        onLostPointerCapture={onProgressPointerEnd}
        onKeyDown={onProgressKeyDown}
      >
        <div className="radio-progress-fill" style={{ width: `${progressPct}%` }}>
          <div className="radio-progress-knob" />
        </div>
      </div>
      <div className="radio-progress-times">
        <span>{fmt(current)}</span>
        <span>{displayTotal}</span>
      </div>
      {resumeAt > 0 && (
        <div className="radio-resume-hint">
          <span>▶ {fmt(resumeAt)}부터 이어 듣는 중</span>
          <button
            type="button"
            className="radio-resume-restart"
            onClick={() => {
              const a = audioRef.current;
              if (a) { a.currentTime = 0; setCurrent(0); }
              clearResumePosition(episode.id);
              setResumeAt(0);
            }}
          >
            처음부터
          </button>
        </div>
      )}
    </div>
  );

  const controlsBlock = (
    <div className="radio-controls">
      {/* 倍速 */}
      <div className="radio-speed-wrap">
        <button
          type="button"
          className={`radio-speed-btn${speed !== 1 ? ' radio-active' : ''}`}
          onClick={() => hasAudio && setSpeedMenuOpen((o) => !o)}
          disabled={!hasAudio}
          aria-haspopup="menu"
          aria-expanded={speedMenuOpen}
        >
          {speed}x
        </button>
        {speedMenuOpen && (
          <div className="radio-speed-menu" role="menu">
            {SPEEDS.map((s) => (
              <button
                key={s}
                type="button"
                role="menuitem"
                className={`radio-speed-opt${speed === s ? ' radio-active' : ''}`}
                onClick={() => changeSpeed(s)}
              >
                {s}x
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        className="radio-ctrl-btn"
        onClick={() => prevEp && openEpisode(prevEp.id)}
        disabled={!prevEp}
        aria-label={t('radio.prevTrack', lang)}
      >
        ⏮
      </button>
      <button
        className={`radio-play-btn${playing ? ' radio-playing' : ''}`}
        onClick={togglePlay}
        disabled={!hasAudio}
        aria-label={playing ? t('radio.pause', lang) : t('radio.play', lang)}
      >
        {!playing && '▶'}
      </button>
      <button
        className="radio-ctrl-btn"
        onClick={() => nextEp && openEpisode(nextEp.id)}
        disabled={!nextEp}
        aria-label={t('radio.nextTrack', lang)}
      >
        ⏭
      </button>

      {/* 循环 */}
      <button
        type="button"
        className={`radio-loop-btn${loop ? ' radio-active' : ''}`}
        onClick={toggleLoop}
        disabled={!hasAudio}
        aria-label="한 곡 반복"
        aria-pressed={loop}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17 2l4 4-4 4" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <path d="M7 22l-4-4 4-4" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      </button>

      {/* 睡眠定时 */}
      <div className="radio-sleep-wrap">
        <button
          type="button"
          className={`radio-sleep-btn${sleepMin !== 0 ? ' radio-active' : ''}`}
          onClick={() => hasAudio && setSleepMenuOpen((o) => !o)}
          disabled={!hasAudio}
          aria-haspopup="menu"
          aria-expanded={sleepMenuOpen}
          aria-label="취침 타이머"
        >
          💤{sleepMin > 0 ? ` ${sleepMin}분` : sleepMin === -1 ? ' 이번 회' : ''}
        </button>
        {sleepMenuOpen && (
          <div className="radio-sleep-menu" role="menu">
            {[15, 30, 60].map((m) => (
              <button
                key={m}
                type="button"
                role="menuitem"
                className={`radio-sleep-opt${sleepMin === m ? ' radio-active' : ''}`}
                onClick={() => pickSleep(m)}
              >
                {m}분 후
              </button>
            ))}
            <button
              type="button"
              role="menuitem"
              className={`radio-sleep-opt${sleepMin === -1 ? ' radio-active' : ''}`}
              onClick={() => pickSleep(-1)}
            >
              이번 회 끝까지
            </button>
            {sleepMin !== 0 && (
              <button
                type="button"
                role="menuitem"
                className="radio-sleep-opt radio-sleep-off"
                onClick={() => pickSleep(0)}
              >
                타이머 끄기
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const placeholderBlock = (
    <div className="radio-audio-placeholder" aria-hidden="true">
      <div className="radio-audio-placeholder-icon">▶</div>
      <div className="radio-audio-placeholder-title">음원 준비 중</div>
      <div className="radio-audio-placeholder-sub">TTS 음성이 곧 준비됩니다</div>
    </div>
  );

  const togetherBlock = (
    <div className="radio-sb-section">
      <div className="radio-sb-title">함께 듣는 중</div>
      <div className="radio-together-card">
        <div className="radio-together-avatars">
          {RADIO_LISTENERS.map((l, i) => (
            <div key={i} className={`radio-av radio-av-${AV_COLORS[i % AV_COLORS.length]}`}>
              {l.emoji}
            </div>
          ))}
        </div>
        <div className="radio-together-text">
          <strong>{RADIO_LISTENER_COUNT}명</strong>이 함께 듣고 있어요
        </div>
      </div>
    </div>
  );

  const comments = getComments(episode.program, episode.id, episode.vocab);
  const chatBlock = (
    <div className="radio-sb-section">
      <div className="radio-sb-title">방송 댓글</div>
      <div className="radio-chat-preview">
        {comments.map((c, i) => (
          <div key={i} className="radio-chat-msg radio-chat-rise" style={{ ['--i' as string]: i }}>
            <div className={`radio-chat-avatar radio-av-${AV_COLORS[(i + 1) % AV_COLORS.length]}`}>
              {c.emoji}
            </div>
            <div className="radio-chat-bubble">
              <div className="radio-chat-name">{c.name} · {c.level}</div>
              <div className="radio-chat-text">{c.ko}</div>
              <div className="radio-chat-trans">{c.zh}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const vocabBlock = episode.vocab.length > 0 && (
    <div className="radio-sb-section radio-vocab-section">
      <div className="radio-sb-title">이 에피소드 단어 ({episode.vocab.length})</div>
      <div className="radio-vocab-list">
        {episode.vocab.map((v, i) => (
          <div key={i} className="radio-vocab-item">
            <div className="radio-vocab-head">
              <span className="radio-vocab-ko">
                <TappableText text={v.ko} />
              </span>
              <span className="radio-vocab-pos">{v.pos}</span>
              <span className="radio-vocab-zh">{v.zh}</span>
              <button
                type="button"
                className="radio-vocab-add"
                onClick={() => setVocabToAdd(v)}
                aria-label={`${v.ko} 단어장에 추가`}
                title="단어장에 추가"
              >
                +
              </button>
            </div>
            <div className="radio-vocab-ex">
              <span className="radio-vocab-ex-ko">
                <TappableText text={v.example} />
                <button
                  type="button"
                  className="radio-vocab-ex-play"
                  onClick={() => { void speakWord(v.example); }}
                  aria-label={`${v.example} 듣기`}
                  title="예문 듣기"
                >
                  <Volume2 size={13} />
                </button>
              </span>
              <span className="radio-vocab-ex-zh">{v.exampleZh}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 顶部下滑抽屉：更多电台清单 + 往期存档 + 学习进度（三条杠打开）
  const drawerBlock = (
    <div
      className={`radio-drawer-scrim${drawerOpen ? ' radio-open' : ''}`}
      onClick={() => setDrawerOpen(false)}
      aria-hidden={!drawerOpen}
    >
      <div
        className="radio-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="더 많은 방송"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="radio-drawer-handle" />
        <div className="radio-drawer-head">
          <span className="radio-drawer-title">더 많은 방송</span>
          <button
            type="button"
            className="radio-drawer-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="닫기"
          >
            ✕
          </button>
        </div>
        <div className="radio-drawer-body">
          {/* 更多电台清单（访谈=其它访谈；日播=同期编成表） */}
          <div className="radio-drawer-section">
            <div className="radio-pl-title">{isInterview ? '🎙 다른 인터뷰' : `📻 제${episode.day}회 편성표`}</div>
            <div className="radio-ep-list">
              {dayEpisodes.map((ep, i) => {
                const isCurrent = ep.id === episode.id;
                return (
                  <button
                    key={ep.id}
                    className={`radio-ep-list-item radio-rise${isCurrent ? ' radio-current' : ''}`}
                    style={{ ['--i' as string]: i }}
                    onClick={() => !isCurrent && openInDrawer(ep.id)}
                  >
                    <span className={`radio-ep-list-cover radio-grad-${ep.coverColor}`}>{ep.hostEmoji}</span>
                    <span className="radio-ep-list-info">
                      <div className="radio-ep-list-name">{ep.title}</div>
                      <div className="radio-ep-list-desc">
                        {isInterview
                          ? (isCurrent ? '재생 중' : `TALK #${String(ep.day).padStart(2, '0')}`)
                          : `${ep.level} · ${isCurrent ? '지금 방송 중' : ep.scheduleTime}`}
                      </div>
                    </span>
                    <span className="radio-ep-list-dur">{ep.duration}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 往期存档 */}
          <div className="radio-drawer-section">
            <div className="radio-pl-title">🎞 지난 방송</div>
            <div className="radio-archive-list">
              {archiveByDay.length === 0 ? (
                <div className="radio-archive-empty">아직 지난 방송이 없어요</div>
              ) : (
                archiveByDay.map(([d, eps]) => (
                  <div key={d} className="radio-archive-day">
                    <div className="radio-archive-day-label">제{d}회</div>
                    {eps.map((ep) => (
                      <button
                        key={ep.id}
                        className={`radio-archive-item radio-press${ep.id === episode.id ? ' radio-current' : ''}`}
                        onClick={() => ep.id !== episode.id && openInDrawer(ep.id)}
                      >
                        <span className={`radio-archive-cover radio-grad-${ep.coverColor}`}>
                          {ep.hostEmoji}
                        </span>
                        <span className="radio-archive-info">
                          <span className="radio-archive-name">{ep.title}</span>
                          <span className="radio-archive-sub">{ep.level} · {ep.scheduleTime}</span>
                        </span>
                        {listened.has(ep.id) && <span className="radio-archive-check">✓</span>}
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 学习进度 */}
          <div className="radio-drawer-section">
            <div className="radio-pl-title">📊 내 학습</div>
            <div className="radio-progress-panel">
              <div className="radio-pp-top">
                <div className="radio-pp-ring">
                  <div className="radio-pp-done">{progress.done}</div>
                  <div className="radio-pp-total">/ {progress.total}회</div>
                </div>
                <div className="radio-pp-meta">
                  <div className="radio-pp-fav">⭐ 즐겨찾기 {favCount}</div>
                </div>
              </div>
              <div className="radio-pp-bars">
                {Object.entries(progress.byProgram).map(([prog, s]) => (
                  <div key={prog} className="radio-pp-bar-row">
                    <span className="radio-pp-bar-label">{PROGRAM_LABELS[prog] || prog}</span>
                    <span className="radio-pp-bar-track">
                      <span
                        className={`radio-pp-bar-fill radio-bar-${s.color}`}
                        style={{ width: `${s.total ? (s.done / s.total) * 100 : 0}%` }}
                      />
                    </span>
                    <span className="radio-pp-bar-num">{s.done}/{s.total}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 桌面常驻左栏：学习进度 + 往期存档（手机隐藏，改用顶部抽屉）
  const leftColBlock = (
    <div className="radio-player-left">
      <div className="radio-pl-section">
        <div className="radio-pl-title">📊 내 학습</div>
        <div className="radio-progress-panel">
          <div className="radio-pp-top">
            <div className="radio-pp-ring">
              <div className="radio-pp-done">{progress.done}</div>
              <div className="radio-pp-total">/ {progress.total}회</div>
            </div>
            <div className="radio-pp-meta">
              <div className="radio-pp-fav">⭐ 즐겨찾기 {favCount}</div>
            </div>
          </div>
          <div className="radio-pp-bars">
            {Object.entries(progress.byProgram).map(([prog, s]) => (
              <div key={prog} className="radio-pp-bar-row">
                <span className="radio-pp-bar-label">{PROGRAM_LABELS[prog] || prog}</span>
                <span className="radio-pp-bar-track">
                  <span
                    className={`radio-pp-bar-fill radio-bar-${s.color}`}
                    style={{ width: `${s.total ? (s.done / s.total) * 100 : 0}%` }}
                  />
                </span>
                <span className="radio-pp-bar-num">{s.done}/{s.total}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="radio-pl-section radio-pl-archive">
        <div className="radio-pl-title">🎞 지난 방송</div>
        <div className="radio-archive-list">
          {archiveByDay.length === 0 ? (
            <div className="radio-archive-empty">아직 지난 방송이 없어요</div>
          ) : (
            archiveByDay.map(([d, eps]) => (
              <div key={d} className="radio-archive-day">
                <div className="radio-archive-day-label">제{d}회</div>
                {eps.map((ep) => (
                  <button
                    key={ep.id}
                    className={`radio-archive-item radio-press${ep.id === episode.id ? ' radio-current' : ''}`}
                    onClick={() => ep.id !== episode.id && openEpisode(ep.id)}
                  >
                    <span className={`radio-archive-cover radio-grad-${ep.coverColor}`}>
                      {ep.hostEmoji}
                    </span>
                    <span className="radio-archive-info">
                      <span className="radio-archive-name">{ep.title}</span>
                      <span className="radio-archive-sub">{ep.level} · {ep.scheduleTime}</span>
                    </span>
                    {listened.has(ep.id) && <span className="radio-archive-check">✓</span>}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  // 桌面侧栏「다른 인터뷰/편성표」清单（手机隐藏，在抽屉里）
  const epListBlock = (
    <div className="radio-sb-section radio-ep-list-section radio-desktop-only">
      <div className="radio-sb-title">{isInterview ? '다른 인터뷰' : `제${episode.day}회 편성표`}</div>
      <div className="radio-ep-list">
        {dayEpisodes.map((ep, i) => {
          const isCurrent = ep.id === episode.id;
          return (
            <button
              key={ep.id}
              className={`radio-ep-list-item radio-rise${isCurrent ? ' radio-current' : ''}`}
              style={{ ['--i' as string]: i }}
              onClick={() => !isCurrent && openEpisode(ep.id)}
            >
              <span className={`radio-ep-list-cover radio-grad-${ep.coverColor}`}>{ep.hostEmoji}</span>
              <span className="radio-ep-list-info">
                <div className="radio-ep-list-name">{ep.title}</div>
                <div className="radio-ep-list-desc">
                  {isInterview
                    ? (isCurrent ? '재생 중' : `TALK #${String(ep.day).padStart(2, '0')}`)
                    : `${ep.level} · ${isCurrent ? '지금 방송 중' : ep.scheduleTime}`}
                </div>
              </span>
              <span className="radio-ep-list-dur">{ep.duration}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="radio-root radio-player">
      {toast && <div className="radio-toast">{toast}</div>}
      {vocabToAdd && (
        <AddToBookSheet
          word={{
            korean: vocabToAdd.ko,
            pronunciation: '',
            meaning: vocabToAdd.zh,
            partOfSpeech: vocabToAdd.pos,
            examples: vocabToAdd.example
              ? [{ text: vocabToAdd.example, translation: vocabToAdd.exampleZh }]
              : [],
          }}
          onClose={() => setVocabToAdd(null)}
          onAdded={() => showToastMsg('단어장에 추가했어요 ✓')}
        />
      )}
      {hasAudio && (
        <audio
          ref={audioRef}
          src={episode.audioUrl}
          preload="metadata"
          onTimeUpdate={onTimeUpdate}
          onLoadedMetadata={onLoadedMeta}
          onEnded={onEnded}
        />
      )}

      {/* header：跨两区 */}
      <div className="radio-player-header">
        <div className="radio-player-header-lead">
          <button className="radio-back" onClick={goBack} aria-label={t('radio.back', lang)}>
            ←
          </button>
          <button
            type="button"
            className="radio-player-menu"
            onClick={() => setDrawerOpen(true)}
            aria-label="더 많은 방송"
            aria-expanded={drawerOpen}
          >
            <span /><span /><span />
          </button>
        </div>
        <div className="radio-player-header-title">동물 도시 라디오</div>
        <button
          type="button"
          className="radio-player-header-more"
          onClick={onShare}
          aria-label="공유"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.6" y1="13.5" x2="15.4" y2="17.5" />
            <line x1="15.4" y1="6.5" x2="8.6" y2="10.5" />
          </svg>
        </button>
      </div>

      {/* 桌面常驻左栏：学习进度 + 往期（手机隐藏，改用顶部抽屉） */}
      {leftColBlock}

      {/* 左播放区（桌面居中；手机线性） */}
      <div className="radio-parea">
        {coverBlock}
        {infoBlock}
        {hasAudio ? (
          <>
            {progressBlock}
            {controlsBlock}
          </>
        ) : (
          placeholderBlock
        )}
        {transcriptBlock}
      </div>

      {/* 右侧栏（桌面第3列；手机接在控件下方，倍速下第一块=单词本，再评论/一起听） */}
      <div className="radio-sidebar">
        {vocabBlock}
        {chatBlock}
        {togetherBlock}
        {epListBlock}
      </div>

      {/* 顶部下滑抽屉（仅手机）：学习进度 + 往期存档 + 更多电台清单 */}
      {drawerBlock}
    </div>
  );
}
