'use client';

import './radio.css';

import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import {
  RADIO_LISTENERS,
  RADIO_LISTENER_COUNT,
  isReleased,
  releaseLabel,
  pickNowPlaying,
} from '@/data/radioCast';
import type { RadioCard } from '@/types';
import {
  getFavorites,
  toggleFavorite,
  getStreak,
  todayStr,
  getListenedSet,
  MODE_KEY,
  type RadioStreak,
  type BroadcastMode,
} from '@/lib/radioLocal';
import PlaceIntro from '@/components/PlaceIntro';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const AV_COLORS = ['pink', 'mint', 'gold', 'purple'] as const;
const WEEK_LABELS = ['월', '화', '수', '목', '금', '토', '일'] as const;

// 4 档中文名（进度面板各档进度用）
const PROGRAM_LABELS: Record<string, string> = {
  'squirrel-morning': '다람쥐 아침',
  'animal-news': '동물시 뉴스',
  'bear-night': '곰의 밤',
  'fox-cafe': '여우 카페',
};

// ── 编成表行（模块级 + memo，props 全为基本类型/稳定引用）──
const ScheduleRow = memo(function ScheduleRow({
  ep,
  idx,
  locked,
  active,
  releaseText,
  onOpen,
}: {
  ep: RadioCard;
  idx: number;
  locked: boolean;
  active: boolean;
  releaseText: string;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      disabled={locked}
      onClick={locked ? undefined : () => onOpen(ep.id)}
      style={{ ['--i' as string]: idx }}
      className={`radio-sched-item radio-rise${locked ? '' : ' radio-press'}${active ? ' radio-active' : ''}${locked ? ' radio-sched-locked' : ''}`}
    >
      <span className={`radio-sched-bar radio-bar-${ep.coverColor}`} />
      <span className="radio-sched-time">{ep.scheduleTime}</span>
      <span className="radio-sched-info">
        <div className="radio-sched-name">
          {ep.hostEmoji} {ep.title}
        </div>
        <div className="radio-sched-desc">
          {locked
            ? releaseText
            : `${ep.level} · ${ep.duration}${active ? ' · 지금 방송 중' : ''}`}
        </div>
      </span>
      <span
        className={`radio-sched-play ${active ? 'radio-active' : 'radio-inactive'}`}
      >
        {locked ? '🔒' : ''}
      </span>
    </button>
  );
});

// ── 节目卡（전체 프로그램）模块级 + memo ──
const ShowCard = memo(function ShowCard({
  ep,
  idx,
  onOpen,
}: {
  ep: RadioCard;
  idx: number;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      className="radio-show-card radio-press radio-rise"
      style={{ ['--i' as string]: idx }}
      onClick={() => onOpen(ep.id)}
    >
      <span className={`radio-show-bar radio-bar-${ep.coverColor}`} />
      <span className={`radio-show-icon radio-grad-${ep.coverColor}`}>
        {ep.hostEmoji}
      </span>
      <div className="radio-show-name">{ep.title}</div>
      <div className="radio-show-zh">{ep.titleZh}</div>
      <div className="radio-show-schedule">
        매일 {ep.scheduleTime} · {ep.level}
      </div>
      <span className="radio-show-stats">
        <span>🎙 {ep.host}</span>
        <span>⏱ {ep.duration}</span>
      </span>
    </button>
  );
});

// ── 收藏卡（횡向滚动，复用 ep-card 样式）──
const FavCard = memo(function FavCard({
  ep,
  idx,
  onOpen,
}: {
  ep: RadioCard;
  idx: number;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      className="radio-ep-card radio-press radio-rise"
      style={{ ['--i' as string]: idx }}
      onClick={() => onOpen(ep.id)}
    >
      <span
        className={`radio-ep-cover radio-grad-${ep.coverColor} radio-cover-img`}
        style={{ backgroundImage: `url(/images/radio/${ep.program}.webp)` }}
      >
        <span className="radio-ep-num">{ep.category}</span>
        <span className="radio-ep-dur">{ep.duration}</span>
      </span>
      <div className="radio-ep-title">{ep.title}</div>
      <div className="radio-ep-sub">
        {ep.titleZh} · {ep.level}
      </div>
      <div className="radio-ep-meta">⭐ 즐겨찾기</div>
    </button>
  );
});

export default function RadioHomeClient() {
  const router = useRouter();
  const { lang } = useLang();
  const goBack = useSmartBack('/daily');

  // 电台内容独立于日记剧情，但发布节奏跟进度走：按用户当前进度解锁到第 N 期。
  // 节目数据（301KB）改为服务端按 Day 取轻量元数据，客户端 fetch，不再打进 bundle。
  const [day, setDay] = useState(1);
  const [episodes, setEpisodes] = useState<RadioCard[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    fetch('/api/radio/episodes')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d) return;
        if (typeof d.day === 'number') setDay(d.day);
        if (Array.isArray(d.episodes)) setEpisodes(d.episodes);
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  // 访谈专区特写（王炸门面）：独立于日播 Day 门控，取第一期做 hero
  const [interviewFeatured, setInterviewFeatured] = useState<RadioCard | null>(null);
  useEffect(() => {
    let alive = true;
    fetch('/api/radio/interview')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d || !Array.isArray(d.episodes) || d.episodes.length === 0) return;
        setInterviewFeatured(d.episodes[0]);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // 往期库（已解锁 Day 1..当前，新→旧）；独立 fetch，不阻塞首屏
  const [archive, setArchive] = useState<RadioCard[]>([]);
  useEffect(() => {
    let alive = true;
    fetch('/api/radio/archive')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d || !Array.isArray(d.episodes)) return;
        setArchive(d.episodes);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // 听过的期（localStorage），用于往期列表 ✓ 标记 + 进度统计
  const [listened, setListened] = useState<Set<string>>(new Set());
  useEffect(() => {
    setListened(getListenedSet());
  }, []);

  // header 静止透明、滚动才淡入毛玻璃底（避免静止时实底盖住页面光晕显得像浮起卡片）
  // 仅手机壳(≤1023px，与 CSS 断点一致)用；桌面 header 不吃 scrolled，跳过监听避免无用 re-render
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!window.matchMedia('(max-width: 1023px)').matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 4);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // 收藏（localStorage 快照，跨 Day 可渲染）
  const [favorites, setFavorites] = useState<RadioCard[]>([]);
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // 打卡（localStorage 真实数据）
  const [streak, setStreak] = useState<RadioStreak>({
    dates: [],
    currentStreak: 0,
    longestStreak: 0,
  });
  useEffect(() => {
    setStreak(getStreak());
  }, []);

  // toast 反馈
  const [toast, setToast] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 1600);
  }, []);
  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  // 手机分段：오늘 편성 / 지난 방송 / 내 기록（桌面三栏 = 手机三 tab，概念一致）
  const [mTab, setMTab] = useState<'today' | 'archive' | 'me'>('today');

  // 收听模式（实时编成 / 自由收听），存 localStorage，onboarding 里首次选。
  const [mode, setMode] = useState<BroadcastMode>('free');
  useEffect(() => {
    try {
      const saved = localStorage.getItem(MODE_KEY);
      if (saved === 'live' || saved === 'free') setMode(saved);
    } catch {
      /* ignore */
    }
  }, []);

  // 实时编成模式要按真实时间解锁，分钟级刷新当前时间。
  const [nowHm, setNowHm] = useState(() => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  });
  useEffect(() => {
    if (mode !== 'live') return;
    const t = setInterval(() => {
      const d = new Date();
      setNowHm(d.getHours() * 60 + d.getMinutes());
    }, 60_000);
    return () => clearInterval(t);
  }, [mode]);

  const toggleMode = () => {
    const next: BroadcastMode = mode === 'live' ? 'free' : 'live';
    setMode(next);
    try {
      localStorage.setItem(MODE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const locked = useCallback(
    (ep: RadioCard) => mode === 'live' && !isReleased(ep, nowHm),
    [mode, nowHm],
  );

  const nowPlaying = pickNowPlaying(episodes, nowHm);
  // live 模式且当天首档都还没到点（清晨），now-playing 进入"准备中"等待态
  const npLocked = nowPlaying ? locked(nowPlaying) : false;
  const openEpisode = useCallback(
    (id: string) => router.push(`/radio/${id}`),
    [router],
  );

  const npFav = nowPlaying ? favorites.some((f) => f.id === nowPlaying.id) : false;
  const toggleFav = useCallback(
    (card: RadioCard) => {
      const nowOn = toggleFavorite(card);
      setFavorites(getFavorites());
      showToast(nowOn ? '즐겨찾기 추가 ✓' : '즐겨찾기 해제');
    },
    [showToast],
  );

  // 编成表按 scheduleTime 升序
  const schedule = useMemo(
    () => [...episodes].sort((a, b) => a.scheduleTime.localeCompare(b.scheduleTime)),
    [episodes],
  );

  // 本周打卡状态（월~일）
  const weekDays = useMemo(() => {
    const now = new Date();
    const dow = (now.getDay() + 6) % 7; // 周一=0
    const monday = new Date(now);
    monday.setDate(now.getDate() - dow);
    const today = todayStr(now);
    const doneSet = new Set(streak.dates);
    return WEEK_LABELS.map((label, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const ds = todayStr(d);
      const isToday = ds === today;
      return {
        label,
        done: doneSet.has(ds),
        isToday,
        isFuture: !isToday && d > now,
      };
    });
  }, [streak]);

  // 学习进度统计：听过总数 / 已解锁总数 / 各档进度
  const progress = useMemo(() => {
    const total = archive.length;
    const done = archive.filter((e) => listened.has(e.id)).length;
    const byProgram: Record<string, { done: number; total: number }> = {};
    for (const e of archive) {
      const p = (byProgram[e.program] ||= { done: 0, total: 0 });
      p.total += 1;
      if (listened.has(e.id)) p.done += 1;
    }
    return { total, done, byProgram };
  }, [archive, listened]);

  // 真·最近听过（archive 已按 Day 新→旧；过滤 listened，取前 6）
  const recentListened = useMemo(
    () => archive.filter((e) => listened.has(e.id)).slice(0, 6),
    [archive, listened],
  );

  // 往期按 Day 分组（新→旧），供左栏/手机往期列表
  const archiveByDay = useMemo(() => {
    const map = new Map<number, RadioCard[]>();
    for (const e of archive) {
      const arr = map.get(e.day) || [];
      arr.push(e);
      map.set(e.day, arr);
    }
    return [...map.entries()].sort((a, b) => b[0] - a[0]); // [day, eps][]
  }, [archive]);

  const listenerAvatars = RADIO_LISTENERS.map((l, i) => (
    <span key={i} className={`radio-av radio-av-${AV_COLORS[i % 4]}`}>
      {l.emoji}
    </span>
  ));

  // ── 复用块：学习进度面板 ──────────────────────────────
  const progressPanel = (
    <div className="radio-progress-panel">
      <div className="radio-pp-top">
        <div className="radio-pp-ring">
          <div className="radio-pp-done">{progress.done}</div>
          <div className="radio-pp-total">/ {progress.total}회</div>
        </div>
        <div className="radio-pp-meta">
          <div className="radio-pp-streak">🔥 {streak.currentStreak}일 연속</div>
          <div className="radio-pp-fav">⭐ 즐겨찾기 {favorites.length}</div>
        </div>
      </div>
      <div className="radio-pp-bars">
        {Object.entries(progress.byProgram).map(([prog, s]) => (
          <div key={prog} className="radio-pp-bar-row">
            <span className="radio-pp-bar-label">{PROGRAM_LABELS[prog] || prog}</span>
            <span className="radio-pp-bar-track">
              <span
                className={`radio-pp-bar-fill radio-bar-${archive.find((e) => e.program === prog)?.coverColor || 'pink'}`}
                style={{ width: `${s.total ? (s.done / s.total) * 100 : 0}%` }}
              />
            </span>
            <span className="radio-pp-bar-num">{s.done}/{s.total}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // ── 复用块：往期电台（按 Day 分组，✓ 标记听过）─────────
  const archiveList = (
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
                className="radio-archive-item radio-press"
                onClick={() => openEpisode(ep.id)}
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
  );

  // 打卡卡点击 → 跳最近一期节目（优先 nowPlaying）
  const openStreakTarget = () => {
    if (nowPlaying) openEpisode(nowPlaying.id);
  };

  // 骨架屏：节目元数据 fetch 未回来前（含空态兜底），避免 nowPlaying 未定义
  if (loading || !nowPlaying) {
    return (
      <div className="radio-root radio-home">
        <div className="radio-skeleton">
          <div className="radio-sk-header" />
          <div className="radio-sk-np" />
          <div className="radio-sk-row" />
          <div className="radio-sk-row" />
          <div className="radio-sk-row" />
          <div className="radio-sk-row" />
        </div>
      </div>
    );
  }

  const streakGlow = streak.currentStreak >= 3;

  return (
    <div className="radio-root radio-home">
      <PlaceIntro place="radio" onModePick={setMode} />
      {toast && <div className="radio-toast">{toast}</div>}
      {/* ══════════════════ MOBILE ══════════════════ */}
      <div className="radio-home-m">
        {/* header */}
        <div className={`radio-header${scrolled ? ' radio-scrolled' : ''}`}>
          <div className="radio-header-lead">
            <button className="radio-back" onClick={goBack} aria-label={t('radio.back', lang)}>
              ←
            </button>
            <h1 className="radio-header-brand">
              📻 <span className="radio-brand-name">동물 도시 라디오</span>
            </h1>
          </div>
          <div className="radio-live-badge">
            <div className="radio-live-dot" />
            <span>LIVE</span>
          </div>
        </div>

        {/* 访谈电台特写（王炸门面） */}
        {interviewFeatured && (
          <button
            className="radio-itv-hero radio-press"
            onClick={() => router.push('/radio/interview')}
          >
            <span className="radio-itv-hero-glow" />
            <span className="radio-itv-hero-badge">{t('radio.heroBadge', lang)}</span>
            <span className="radio-itv-hero-brand-zh">{t('radio.foxCafeBrand', lang)}</span>
            <span className="radio-itv-hero-kicker">🦊 여우의 인터뷰 카페</span>
            <span className="radio-itv-hero-ep">
              <span className="radio-itv-hero-play">▶</span>
              <span className="radio-itv-hero-ep-title">{interviewFeatured.title.replace(/^.*·\s*/, '')}</span>
              <span className="radio-itv-hero-meta">{interviewFeatured.duration}</span>
            </span>
          </button>
        )}

        {/* now playing（方案A：脉冲入口卡，无假进度条/假控件；⭐ 收藏为独立按钮） */}
        <div className="radio-np-wrap">
          <button
            className="radio-now-playing"
            disabled={npLocked}
            onClick={npLocked ? undefined : () => openEpisode(nowPlaying.id)}
          >
            <span className="radio-np-top">
              <span
                className={`radio-np-cover radio-grad-${nowPlaying.coverColor} radio-cover-img`}
                style={{ backgroundImage: `url(/images/radio/${nowPlaying.program}.webp)` }}
              >
                <span className="radio-ep-badge">제{day}회</span>
              </span>
              <span className="radio-np-info">
                <span className={`radio-np-label${npLocked ? '' : ' radio-np-pulse'}`}>
                  {npLocked ? `● 방송 준비 중 · ${releaseLabel(nowPlaying)}` : '지금 방송 중'}
                </span>
                <div className="radio-np-title">{nowPlaying.title}</div>
                <div className="radio-np-subtitle">
                  {nowPlaying.titleZh} · {nowPlaying.level}
                </div>
                <div className="radio-np-desc">
                  {nowPlaying.hostEmoji} {nowPlaying.host} · {nowPlaying.category}
                </div>
              </span>
            </span>
            <span className="radio-np-cta">
              <span className="radio-np-cta-play">▶</span>
              <span className="radio-np-cta-text">
                {npLocked ? releaseLabel(nowPlaying) : '지금 듣기'}
              </span>
              <span className="radio-np-cta-meta">{nowPlaying.scheduleTime} · {nowPlaying.duration}</span>
            </span>
          </button>
          <button
            type="button"
            className={`radio-fav-toggle${npFav ? ' radio-on' : ''}`}
            onClick={() => toggleFav(nowPlaying)}
            aria-label={npFav ? t('radio.unfavorite', lang) : t('radio.favorite', lang)}
            aria-pressed={npFav}
          >
            {npFav ? '⭐' : '☆'}
          </button>
        </div>

        {/* together bar */}
        <button className="radio-together-bar" onClick={() => openEpisode(nowPlaying.id)}>
          <span className="radio-together-avatars">{listenerAvatars}</span>
          <span className="radio-together-text">
            <div className="radio-t1">
              {RADIO_LISTENER_COUNT}명이 함께 듣는 중
            </div>
            <div className="radio-t2">같이 듣기 →</div>
          </span>
          <span className="radio-together-fire">🔥</span>
        </button>

        {/* 分段切换：오늘 편성 / 지난 방송 / 내 기록 */}
        <div className="radio-seg" role="tablist">
          <button
            role="tab"
            aria-selected={mTab === 'today'}
            className={`radio-seg-btn${mTab === 'today' ? ' radio-active' : ''}`}
            onClick={() => setMTab('today')}
          >
            오늘 편성
          </button>
          <button
            role="tab"
            aria-selected={mTab === 'archive'}
            className={`radio-seg-btn${mTab === 'archive' ? ' radio-active' : ''}`}
            onClick={() => setMTab('archive')}
          >
            지난 방송
          </button>
          <button
            role="tab"
            aria-selected={mTab === 'me'}
            className={`radio-seg-btn${mTab === 'me' ? ' radio-active' : ''}`}
            onClick={() => setMTab('me')}
          >
            내 기록
          </button>
        </div>

        {/* ── TAB: 내 기록（进度 + 收藏）── */}
        {mTab === 'me' && (
          <>
            <div className="radio-section-title">
              <span className="radio-sec-head">
                <span className="radio-kicker">학습 현황</span>
                <h2>내 학습</h2>
              </span>
            </div>
            {progressPanel}
            {favorites.length > 0 && (
              <>
                <div className="radio-section-title">
                  <span className="radio-sec-head">
                    <span className="radio-kicker">즐겨찾기 {favorites.length}</span>
                    <h2>내 즐겨찾기</h2>
                  </span>
                </div>
                <div className="radio-recent-row">
                  {favorites.map((ep, i) => (
                    <FavCard key={ep.id} ep={ep} idx={i} onOpen={openEpisode} />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* ── TAB: 지난 방송（往期库）── */}
        {mTab === 'archive' && (
          <>
            <div className="radio-section-title">
              <span className="radio-sec-head">
                <span className="radio-kicker">아카이브</span>
                <h2>지난 방송</h2>
              </span>
            </div>
            {archiveList}
          </>
        )}

        {/* ── TAB: 오늘 편성（编成表 + 最近 + 全部）── */}
        {mTab === 'today' && (
        <>
        {/* schedule */}
        <div className="radio-section-title">
          <span className="radio-sec-head">
            <span className="radio-kicker">제{day}회 · 오늘</span>
            <h2>편성표</h2>
          </span>
          <button
            type="button"
            className="radio-mode-toggle"
            onClick={toggleMode}
            aria-label={t('radio.modeToggle', lang)}
          >
            {mode === 'live' ? '🔴 실시간 편성' : '🎶 자유 청취'}
          </button>
        </div>
        <div className="radio-schedule">
          {schedule.map((ep, i) => (
            <ScheduleRow
              key={ep.id}
              ep={ep}
              idx={i}
              locked={locked(ep)}
              active={!locked(ep) && ep.id === nowPlaying.id}
              releaseText={releaseLabel(ep)}
              onOpen={openEpisode}
            />
          ))}
        </div>

        {/* all shows */}
        <div className="radio-section-title">
          <span className="radio-sec-head">
            <span className="radio-kicker">4개 채널</span>
            <h2>전체 프로그램</h2>
          </span>
        </div>
        <div className="radio-shows-grid">
          {episodes.map((ep, i) => (
            <ShowCard key={ep.id} ep={ep} idx={i} onOpen={openEpisode} />
          ))}
        </div>
        </>
        )}

      </div>

      {/* ══════════════════ DESKTOP ══════════════════ */}
      <div className="radio-home-d">
        <div className="radio-layout">
          {/* left column: 学习进度 + 往期电台 */}
          <div className="radio-left-col">
            <div className="radio-side-section">
              <div className="radio-side-title">📊 내 학습</div>
              {progressPanel}
            </div>
            <div className="radio-side-section radio-left-archive">
              <div className="radio-side-title">🎞 지난 방송</div>
              {archiveList}
            </div>
          </div>

          {/* main column */}
          <div className="radio-main-col">
            <div className="radio-header">
              <div className="radio-header-left">
                <button className="radio-back" onClick={goBack} aria-label={t('radio.back', lang)}>
                  ←
                </button>
                <div>
                  <h1>동물 도시 라디오</h1>
                  <div className="radio-subtitle">{t('radio.subtitle', lang)} · 매일 새 에피소드</div>
                </div>
              </div>
              <div className="radio-live-badge">
                <div className="radio-live-dot" />
                <span>LIVE</span>
              </div>
            </div>

            {/* 访谈电台特写（王炸门面） */}
            {interviewFeatured && (
              <button
                className="radio-itv-hero radio-press"
                onClick={() => router.push('/radio/interview')}
              >
                <span className="radio-itv-hero-glow" />
                <span className="radio-itv-hero-badge">{t('radio.heroBadge', lang)}</span>
                <span className="radio-itv-hero-brand-zh">{t('radio.foxCafeBrand', lang)}</span>
                <span className="radio-itv-hero-kicker">🦊 여우의 인터뷰 카페</span>
                <span className="radio-itv-hero-ep">
                  <span className="radio-itv-hero-play">▶</span>
                  <span className="radio-itv-hero-ep-title">{interviewFeatured.title.replace(/^.*·\s*/, '')}</span>
                  <span className="radio-itv-hero-meta">{interviewFeatured.duration}</span>
                </span>
              </button>
            )}

            {/* now playing（方案A：无假进度条/假控件；⭐ 独立按钮） */}
            <div className="radio-np-wrap">
              <button
                className="radio-now-playing"
                disabled={npLocked}
                onClick={npLocked ? undefined : () => openEpisode(nowPlaying.id)}
              >
                <span
                  className={`radio-np-cover radio-grad-${nowPlaying.coverColor} radio-cover-img`}
                  style={{ backgroundImage: `url(/images/radio/${nowPlaying.program}.webp)` }}
                >
                  <span className="radio-ep-badge">제{day}회</span>
                </span>
                <span className="radio-np-info">
                  <span className={`radio-np-label${npLocked ? '' : ' radio-np-pulse'}`}>
                    {npLocked ? `● 방송 준비 중 · ${releaseLabel(nowPlaying)}` : '지금 방송 중'}
                  </span>
                  <div className="radio-np-title">{nowPlaying.title}</div>
                  <div className="radio-np-subtitle">
                    {nowPlaying.titleZh} · {nowPlaying.level}
                  </div>
                  <span className="radio-np-tags">
                    <span className="radio-np-tag">{nowPlaying.category}</span>
                    <span className="radio-np-tag">{nowPlaying.host}</span>
                    <span className="radio-np-tag">{nowPlaying.level}</span>
                  </span>
                  <span className="radio-np-cta">
                    <span className="radio-np-cta-play">▶</span>
                    <span className="radio-np-cta-text">
                      {npLocked ? releaseLabel(nowPlaying) : '지금 듣기'}
                    </span>
                    <span className="radio-np-cta-meta">{nowPlaying.scheduleTime} · {nowPlaying.duration}</span>
                  </span>
                </span>
              </button>
              <button
                type="button"
                className={`radio-fav-toggle${npFav ? ' radio-on' : ''}`}
                onClick={() => toggleFav(nowPlaying)}
                aria-label={npFav ? t('radio.unfavorite', lang) : t('radio.favorite', lang)}
                aria-pressed={npFav}
              >
                {npFav ? '⭐' : '☆'}
              </button>
            </div>

            {/* schedule */}
            <div className="radio-section-title">
              <span className="radio-sec-head">
                <span className="radio-kicker">제{day}회 · 오늘</span>
                <h2>편성표</h2>
              </span>
              <button
                type="button"
                className="radio-mode-toggle"
                onClick={toggleMode}
                aria-label={t('radio.modeToggle', lang)}
              >
                {mode === 'live' ? '🔴 실시간 편성' : '🎶 자유 청취'}
              </button>
            </div>
            <div className="radio-schedule">
              {schedule.map((ep, i) => (
                <ScheduleRow
                  key={ep.id}
                  ep={ep}
                  idx={i}
                  locked={locked(ep)}
                  active={!locked(ep) && ep.id === nowPlaying.id}
                  releaseText={releaseLabel(ep)}
                  onOpen={openEpisode}
                />
              ))}
            </div>

            {/* all shows (3-col) */}
            <div className="radio-section-title">
              <span className="radio-sec-head">
                <span className="radio-kicker">4개 채널</span>
                <h2>전체 프로그램</h2>
              </span>
            </div>
            <div className="radio-shows-grid">
              {episodes.map((ep, i) => (
                <ShowCard key={ep.id} ep={ep} idx={i} onOpen={openEpisode} />
              ))}
            </div>
          </div>

          {/* sidebar */}
          <div className="radio-side-col">
            <div className="radio-side-section">
              <div className="radio-side-title">함께 듣는 중</div>
              <button className="radio-together-card" onClick={() => openEpisode(nowPlaying.id)}>
                <span className="radio-together-avatars">{listenerAvatars}</span>
                <div className="radio-t1">
                  {RADIO_LISTENER_COUNT}명이 함께 듣는 중
                </div>
                <div className="radio-t2">같이 듣기 →</div>
              </button>
            </div>

            {favorites.length > 0 && (
              <div className="radio-side-section">
                <div className="radio-side-title">⭐ 즐겨찾기 {favorites.length}</div>
                <div className="radio-recent-list">
                  {favorites.map((ep) => (
                    <button
                      key={ep.id}
                      className="radio-recent-item radio-press"
                      onClick={() => openEpisode(ep.id)}
                    >
                      <span className={`radio-recent-cover radio-grad-${ep.coverColor}`}>
                        {ep.hostEmoji}
                      </span>
                      <span className="radio-recent-info">
                        <div className="radio-recent-name">{ep.title}</div>
                        <div className="radio-recent-sub">
                          {ep.titleZh} · {ep.level}
                        </div>
                      </span>
                      <span className="radio-recent-time">⭐</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="radio-side-section">
              <div className="radio-side-title">🔥 연속 청취</div>
              <button
                type="button"
                className={`radio-streak-card${streakGlow ? ' radio-streak-glow' : ''}`}
                onClick={openStreakTarget}
              >
                <div className="radio-streak-num">{streak.currentStreak}</div>
                <div className="radio-streak-label">일 연속 라디오 청취</div>
                {streak.currentStreak >= 7 && (
                  <div className="radio-streak-badge">일주일 연속! 🎉</div>
                )}
                <div className="radio-streak-days">
                  {weekDays.map((d, i) => (
                    <div
                      key={i}
                      className={`radio-streak-day${
                        d.isToday
                          ? ' radio-today'
                          : d.done
                            ? ' radio-done'
                            : d.isFuture
                              ? ' radio-future'
                              : ''
                      }`}
                    >
                      {d.done && !d.isToday ? '✓' : d.label}
                    </div>
                  ))}
                </div>
              </button>
            </div>

            {recentListened.length > 0 && (
              <div className="radio-side-section">
                <div className="radio-side-title">최근 들은 에피소드</div>
                <div className="radio-recent-list">
                  {recentListened.map((ep) => (
                    <button
                      key={ep.id}
                      className="radio-recent-item radio-press"
                      onClick={() => openEpisode(ep.id)}
                    >
                      <span className={`radio-recent-cover radio-grad-${ep.coverColor}`}>
                        {ep.hostEmoji}
                      </span>
                      <span className="radio-recent-info">
                        <div className="radio-recent-name">{ep.title}</div>
                        <div className="radio-recent-sub">
                          제{ep.day}회 · {ep.level}
                        </div>
                      </span>
                      <span className="radio-recent-time">✓</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
