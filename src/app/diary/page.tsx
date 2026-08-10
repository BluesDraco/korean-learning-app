'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Lock, ChevronDown } from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { useIsDesktop } from '@/lib/useIsMobile';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { Modal } from '@/components/ui';
import PlaceIntro from '@/components/PlaceIntro';
import { useToast } from '@/hooks/useToast';
import { TOTAL_DAYS_PER_LEVEL, getLevel } from '@/data/diary';
import { hasSubQuest } from '@/data/diary/subquests';
import type { ToriLevel } from '@/types/tori-diary';
import type { ToriSubQuestProgress } from '@/types/tori-subquest';
import '@/components/diary/diary.css';

interface ChapterDef {
  [k: string]: unknown;
  num: string;
  romanNum: string;
  titleKey: string;
  ko: string;
  startDay: number;
  endDay: number;
  tone: 'pink' | 'mint' | 'purple' | 'gold';
}

const CHAPTERS_BY_LEVEL: Record<ToriLevel, ChapterDef[]> = {
  beginner: [
    { num: 'One',          romanNum: 'i',   titleKey: 'diary.chap.beg.1', ko: '첫 발자국 · Day 1–7',        startDay: 1,  endDay: 7,  tone: 'pink' },
    { num: 'Two',          romanNum: 'ii',  titleKey: 'diary.chap.beg.2', ko: '302호의 친구들 · Day 8–14',   startDay: 8,  endDay: 14, tone: 'mint' },
    { num: 'Three',        romanNum: 'iii', titleKey: 'diary.chap.beg.3', ko: '마음의 거리 · Day 15–21',    startDay: 15, endDay: 21, tone: 'purple' },
    { num: 'Four · final', romanNum: 'iv',  titleKey: 'diary.chap.beg.4', ko: '작별과 시작 · Day 22–30',    startDay: 22, endDay: 30, tone: 'gold' },
  ],
  intermediate: [
    { num: 'One',          romanNum: 'i',   titleKey: 'diary.chap.int.1', ko: '새 교실, 새 얼굴 · Day 1–7',      startDay: 1,  endDay: 7,  tone: 'pink' },
    { num: 'Two',          romanNum: 'ii',  titleKey: 'diary.chap.int.2', ko: '엄마의 소포 · Day 8–14',          startDay: 8,  endDay: 14, tone: 'mint' },
    { num: 'Three',        romanNum: 'iii', titleKey: 'diary.chap.int.3', ko: '하루의 생일 · Day 15–21',         startDay: 15, endDay: 21, tone: 'purple' },
    { num: 'Four · final', romanNum: 'iv',  titleKey: 'diary.chap.int.4', ko: '졸업하는 날 · Day 22–30',         startDay: 22, endDay: 30, tone: 'gold' },
  ],
  advanced: [
    { num: 'One',          romanNum: 'i',   titleKey: 'diary.chap.adv.1', ko: '대학 준비반 · Day 1–7',           startDay: 1,  endDay: 7,  tone: 'pink' },
    { num: 'Two',          romanNum: 'ii',  titleKey: 'diary.chap.adv.2', ko: '첫 여행 · Day 8–14',              startDay: 8,  endDay: 14, tone: 'mint' },
    { num: 'Three',        romanNum: 'iii', titleKey: 'diary.chap.adv.3', ko: '나의 한국어 · Day 15–21',         startDay: 15, endDay: 21, tone: 'purple' },
    { num: 'Four · final', romanNum: 'iv',  titleKey: 'diary.chap.adv.4', ko: '이야기는 이제부터 · Day 22–30',   startDay: 22, endDay: 30, tone: 'gold' },
  ],
};

const LEVELS: { key: ToriLevel; labelKey: string; sub: string }[] = [
  { key: 'beginner',     labelKey: 'diary.level.beginner',     sub: 'Day 1–30' },
  { key: 'intermediate', labelKey: 'diary.level.intermediate', sub: 'Day 31–60' },
  { key: 'advanced',     labelKey: 'diary.level.advanced',     sub: 'Day 61–90' },
];

const LEVEL_BOOK_NAME: Record<ToriLevel, string> = {
  beginner:     '이야기 하나',
  intermediate: '이야기 둘',
  advanced:     '이야기 셋',
};

interface SubQuestDef {
  [k: string]: unknown;
  idx: 1 | 2 | 3 | 4 | 5;
  ko: string;
  zhKey: string;
  time: string;
  isBoss?: boolean;
}

const SUB_QUESTS: SubQuestDef[] = [
  { idx: 1, ko: '단어 마스터',    zhKey: 'diary.sq.vocab',    time: '2min' },
  { idx: 2, ko: '귀 트이기',      zhKey: 'diary.sq.listen',   time: '2min' },
  { idx: 3, ko: '문법 체육관',    zhKey: 'diary.sq.grammar',  time: '3min' },
  { idx: 4, ko: '상황 극장',      zhKey: 'diary.sq.scene',    time: '2min' },
  { idx: 5, ko: '종합 테스트',    zhKey: 'diary.sq.boss',    time: '3min', isBoss: true },
];

// 内测期间：所有登录用户绕过冷却与等级锁，可自由进入任何 Day。
// 正式上线前改为 false 并重新部署。
const BETA_MODE = false;
const MAX_DEVELOPED_DAY = 30;

export default function DiaryPage() {
  const router = useRouter();
  // 左上角 X 固定回主页，不用 smartBack（用户明确要求：X 就是回主页，不是上一页）
  const backToMain = useCallback(() => router.push('/daily'), [router]);
  const { user, loading: authLoading } = useAuth();
  const { lang } = useLang();
  const { showToast } = useToast();
  const [activeLevel, setActiveLevel] = useState<ToriLevel>(() => {
    if (typeof window === 'undefined') return 'beginner';
    const stored = sessionStorage.getItem('diaryActiveLevel');
    if (stored === 'beginner' || stored === 'intermediate' || stored === 'advanced') return stored;
    return 'beginner';
  });
  useEffect(() => {
    sessionStorage.setItem('diaryActiveLevel', activeLevel);
  }, [activeLevel]);
  // hero 图加载失败 → 切占位图；切换 level 时重置
  const [heroError, setHeroError] = useState(false);
  useEffect(() => { setHeroError(false); }, [activeLevel]);
  const [completed, setCompleted] = useState<Record<ToriLevel, Set<number>>>({
    beginner: new Set(), intermediate: new Set(), advanced: new Set(),
  });
  const [subStars, setSubStars] = useState<Record<string, number>>({}); // key: `${level}-${day}-${idx}` → stars
  const [loaded, setLoaded] = useState(false);
  const [showSoonModal, setShowSoonModal] = useState(false);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set());

  const isAdmin = user?.role === 'admin' || BETA_MODE;
  const isDesktop = useIsDesktop();

  const [reloadTick, setReloadTick] = useState(0);
  useEffect(() => {
    // 从子关卡回到列表页时刷新星级（visibilitychange + focus）
    const bump = () => setReloadTick((t) => t + 1);
    const onVis = () => { if (document.visibilityState === 'visible') bump(); };
    window.addEventListener('focus', bump);
    document.addEventListener('visibilitychange', onVis);
    return () => {
      window.removeEventListener('focus', bump);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  useEffect(() => {
    if (!user) { setLoaded(true); return; }
    (async () => {
      try {
        const rows = await db.toriProgress.toArray();
        const userRows = rows.filter((r) => r.userId === user.id);
        const next: Record<ToriLevel, Set<number>> = { beginner: new Set(), intermediate: new Set(), advanced: new Set() };
        userRows.forEach((r) => {
          const lvl = (r.level ?? 'beginner') as ToriLevel;
          // completedAt 存在即完成；磁盘满等故障可能导致漏写，modulesDone ≥6 也视为完成
          const doneModules = Array.isArray(r.modulesDone) ? r.modulesDone.length : 0;
          if (r.completedAt || doneModules >= 6) {
            next[lvl].add(r.day);
          }
        });
        setCompleted(next);

        // 子关卡星级
        try {
          const subRows = await db.toriSubQuestProgress.toArray() as ToriSubQuestProgress[];
          const map: Record<string, number> = {};
          subRows.filter((r) => r.userId === user.id).forEach((r) => {
            const lvl = (r.level ?? 'beginner') as ToriLevel;
            map[`${lvl}-${r.day}-${r.idx}`] = r.stars;
          });
          setSubStars(map);
        } catch { /* ignore */ }

        // 默认只展开最新完成的一天，其他 done 天折叠
        const latestDone = Math.max(0, ...Array.from(next[activeLevel]));
        if (latestDone > 0) setExpandedDays(new Set([latestDone]));
      } catch { /* ignore */ }
      finally { setLoaded(true); }
    })();
  }, [user, reloadTick, activeLevel]);

  // 内容开放门控：intermediate/advanced（Day 31–90）尚未上线，
  // 普通用户一律锁定并模糊；仅 admin 可进入测试内容。
  const isLevelUnlocked = (level: ToriLevel): boolean => {
    if (isAdmin) return true;
    return level === 'beginner';
  };

  const completedDays = completed[activeLevel];
  const rawCurrentDay = Math.min(Math.max(0, ...Array.from(completedDays)) + 1, TOTAL_DAYS_PER_LEVEL) || 1;
  const currentDay = rawCurrentDay;
  const allDaysForLevel = getLevel(activeLevel);
  const currentDayData = allDaysForLevel.find((d) => d.day === currentDay);
  const currentDayTitle = currentDayData?.title ?? `Day ${currentDay}`;
  const HERO_FALLBACK = '/images/diary/tori-bedroom-hero.png';
  // Day 31–90 的 hero 图尚未上线（public 只到 day-30）；未解锁级别一律用占位，避免加载缺失图
  const levelUnlockedForHero = isLevelUnlocked(activeLevel);
  const heroSrc = (!levelUnlockedForHero || heroError)
    ? HERO_FALLBACK
    : (currentDayData?.heroImageUrl || HERO_FALLBACK);
  const progressPct = Math.round((completedDays.size / TOTAL_DAYS_PER_LEVEL) * 100);
  const allCleared = completedDays.size >= TOTAL_DAYS_PER_LEVEL;
  const remainDays = TOTAL_DAYS_PER_LEVEL - completedDays.size;
  // 进度门控：完成当前 Day 立即开放下一 Day（无时间冷却），直到 MAX_DEVELOPED_DAY 上限

  const handleDayClick = (day: number) => {
    // 未登录：先提示登录，跳登录页后回到日记 hub
    if (!user) {
      showToast(t('diary.toast.login_day1', lang), 'info');
      setTimeout(() => router.push(`/auth/login?redirect=/diary`), 600);
      return;
    }
    if (!isLevelUnlocked(activeLevel)) {
      setShowSoonModal(true);
      return;
    }
    if (day > MAX_DEVELOPED_DAY && !isAdmin) {
      showToast(t('diary.toast.coming_soon', lang), 'info');
      return;
    }
    if (isAdmin) { router.push(`/diary/${activeLevel}/${day}`); return; }
    if (completedDays.has(day)) { router.push(`/diary/${activeLevel}/${day}`); return; }
    if (day === currentDay) { router.push(`/diary/${activeLevel}/${day}`); return; }
    setShowSoonModal(true);
  };

  // ── Loading
  if (authLoading || !loaded) {
    return (
      <div className="diary-fullscreen">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div className="diary-v4-loading">{t('diary.loading', lang)}</div>
        </div>
      </div>
    );
  }

  // 未登录用户看到与登录用户相同的 hub UI（章节 + Day 卡）；
  // 点具体 Day 详情时由 handleDayClick 拦截跳登录

  const heroContent = (
    <>
      <p className="diary-v4-eyebrow">a story of 90 days</p>
      <p className="diary-v4-ko-title">토리의 한국어 일기</p>
      <h1 className="diary-v4-h1">
        {lang === 'en' ? t('diary.hero.h1', lang) : <>兔莉的<wbr /><span className="diary-v4-h1-br" />韩语日记</>}
      </h1>

      <div className="diary-v4-lead-card">
        <p className="diary-v4-lead" style={{ whiteSpace: 'pre-line' }}>{t('diary.hero.lead', lang)}</p>
      </div>

      <div className={`diary-v4-illust${levelUnlockedForHero ? '' : ' is-locked'}`}>
        <Image
          key={heroSrc}
          src={heroSrc}
          alt={t('diary.hero.img_alt', lang)}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          priority
          onError={() => setHeroError(true)}
          style={{ objectFit: 'cover' }}
        />
        {levelUnlockedForHero ? (
          <span className="diary-v4-illust-tag">{allCleared ? t('diary.status.done', lang) : `${LEVEL_BOOK_NAME[activeLevel]} · Day ${currentDay} · ${currentDayTitle}`}</span>
        ) : (
          <div className="diary-v4-illust-lock">
            <Lock size={22} strokeWidth={2} />
            <span>{t('diary.lock.soon_badge', lang)}</span>
          </div>
        )}
      </div>

      <div className="diary-v4-progress">
        <div className="diary-v4-progress-top">
          <span className="diary-v4-progress-label">your progress · {remainDays > 0 ? t('diary.progress.remain', lang, { n: remainDays }) : t('diary.status.done', lang)}</span>
          <span className="diary-v4-progress-value">
            {completedDays.size}<span className="diary-v4-progress-total">/{TOTAL_DAYS_PER_LEVEL}</span>
          </span>
        </div>
        <div className="diary-v4-progress-bar">
          <div className="diary-v4-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        {!BETA_MODE && activeLevel === 'beginner' && currentDay <= 3 && !allCleared && (
          <p style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 12, color: 'var(--diary-ink-soft)', marginTop: 10, lineHeight: 1.55, letterSpacing: '0.02em' }}>
            {t('diary.pace_tip', lang)}
          </p>
        )}
      </div>

      {/* 博客/电台/贴纸馆/动物城/LUMI 入口：仅桌面左栏显示，手机端隐藏 */}
      {isDesktop && (() => {
        const beginnerDone = completed.beginner;
        const features = [
          // 兽尔动物城 / LUMI PAW 锁状态只看实际进度，不受 BETA_MODE 影响
          // （admin 真账号才完全绕过）
          { key: 'blog',    href: '/blog',            emoji: '📔', label: t('diary.feat.blog.label', lang),    sub: t('diary.feat.blog.sub', lang),    locked: false,                                          unlockAt: '' },
          { key: 'radio',   href: '/radio',           emoji: '📻', label: t('diary.feat.radio.label', lang),   sub: t('diary.feat.radio.sub', lang),   locked: false,                                          unlockAt: '' },
          { key: 'sticker', href: '/sticker.html',     emoji: '🎟️', label: t('diary.feat.sticker.label', lang), sub: t('diary.feat.sticker.sub', lang), locked: false,                                          unlockAt: '' },
          { key: 'animal',  href: '/animal-city.html', emoji: '🏙️', label: t('diary.feat.animal.label', lang),  sub: t('diary.feat.animal.sub', lang),  locked: user?.role !== 'admin' && beginnerDone.size < 3, unlockAt: t('diary.feat.animal.unlock', lang) },
          { key: 'lumi',    href: '/lumi-paw.html',    emoji: '🌟', label: t('diary.feat.lumi.label', lang),    sub: t('diary.feat.lumi.sub', lang),    locked: false,                                          unlockAt: '' },
        ];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '0 0 24px' }}>
            {features.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  if (f.locked) { showToast(t('diary.feat.locked_toast', lang, { at: f.unlockAt }), 'info'); return; }
                  router.push(f.href);
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 16px', borderRadius: 12,
                  border: '1px solid var(--diary-line)',
                  background: 'var(--diary-paper)',
                  cursor: 'pointer',
                  opacity: f.locked ? 0.55 : 1,
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>{f.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 14, fontWeight: 700, color: 'var(--diary-ink)', lineHeight: 1.3 }}>{f.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--diary-ink-soft)', lineHeight: 1.4, marginTop: 2 }}>{f.locked ? f.unlockAt : f.sub}</div>
                </div>
                <span style={{ flexShrink: 0, color: 'var(--diary-ink-soft)', display: 'flex', alignItems: 'center' }}>
                  {f.locked ? <Lock size={14} /> : <span style={{ fontSize: 18, fontFamily: 'var(--diary-v4-serif)' }}>→</span>}
                </span>
              </button>
            ))}
          </div>
        );
      })()}

      {!levelUnlockedForHero ? (
        <button
          type="button"
          className="diary-v4-cta"
          style={{ textDecoration: 'none', border: 'none', font: 'inherit', textAlign: 'left', cursor: 'default', opacity: 0.7 }}
          disabled
        >
          <div className="diary-v4-cta-left">
            <div className="diary-v4-cta-label">{t('diary.lock.soon_badge', lang)}</div>
            <div className="diary-v4-cta-next">{t('diary.lock.soon_title', lang)}</div>
          </div>
          <Lock size={16} strokeWidth={2} />
        </button>
      ) : !user ? (
        <button
          type="button"
          className="diary-v4-cta"
          style={{ textDecoration: 'none', border: 'none', font: 'inherit', textAlign: 'left', cursor: 'pointer' }}
          onClick={() => handleDayClick(currentDay)}
        >
          <div className="diary-v4-cta-left">
            <div className="diary-v4-cta-label">get started</div>
            <div className="diary-v4-cta-next">{t('diary.cta.login_start', lang)}</div>
          </div>
          <span className="diary-list-cta-arrow">→</span>
        </button>
      ) : (
        <Link
          href={allCleared ? '/sticker.html' : `/diary/${activeLevel}/${currentDay}`}
          className="diary-v4-cta"
          style={{ textDecoration: 'none' }}
        >
          <div className="diary-v4-cta-left">
            <div className="diary-v4-cta-label">{allCleared ? 'congratulations' : 'continue'}</div>
            <div className="diary-v4-cta-next">
              {allCleared ? t('diary.cta.congrats', lang) : `Day ${currentDay} · ${currentDayTitle}`}
            </div>
          </div>
          <div className="diary-v4-cta-arrow">→</div>
        </Link>
      )}
    </>
  );

  const levelTabs = (
    <div style={{ display: 'flex', gap: 0, marginBottom: 28, marginTop: 8, borderBottom: '1px solid var(--diary-line)' }}>
      {LEVELS.map((lv) => {
        const active = lv.key === activeLevel;
        const locked = !isLevelUnlocked(lv.key);
        return (
          <button
            key={lv.key}
            onClick={() => { if (locked) return; setActiveLevel(lv.key); }}
            aria-disabled={locked || undefined}
            style={{
              flex: 1,
              padding: '10px 4px 8px',
              background: 'transparent',
              border: 'none',
              borderBottom: active ? '2.5px solid var(--diary-stamp-red)' : '2.5px solid transparent',
              cursor: locked ? 'not-allowed' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              transition: 'opacity 0.15s',
              opacity: locked ? 0.45 : 1,
            }}
          >
            <span style={{
              fontFamily: 'var(--diary-v4-serif)',
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: '0.04em',
              color: active ? 'var(--diary-stamp-red)' : 'var(--diary-ink)',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              {locked && <Lock size={10} />}
              {t(lv.labelKey, lang)}
            </span>
            <span style={{
              fontFamily: 'var(--diary-v4-serif)',
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: '0.06em',
              color: active ? 'var(--diary-stamp-red)' : 'var(--diary-ink-soft)',
            }}>
              {lv.sub}
            </span>
          </button>
        );
      })}
    </div>
  );

  const unlocked = isLevelUnlocked(activeLevel);

  const lockPreview = !unlocked ? (() => {
    const chapters = CHAPTERS_BY_LEVEL[activeLevel];
    return (
      <div className="diary-v4-lockover" aria-label={t('diary.lock.aria', lang)}>
        <span className="diary-v4-lockover-badge">
          <Lock size={12} strokeWidth={2.4} /> {t('diary.lock.soon_badge', lang)}
        </span>
        <p className="diary-v4-lockover-ko">{LEVEL_BOOK_NAME[activeLevel]}</p>
        <h3 className="diary-v4-lockover-title">
          {t('diary.lock.soon_title', lang)}
        </h3>
        <p className="diary-v4-lockover-sub" style={{ whiteSpace: 'pre-line' }}>
          {t('diary.lock.soon_sub', lang, { range: activeLevel === 'intermediate' ? 'Day 31–60' : 'Day 61–90' })}
        </p>
        <div className="diary-v4-lockover-milestones">
          {chapters.map((c) => (
            <span key={c.num} className="diary-v4-lockover-milestone">{t(c.titleKey, lang)}</span>
          ))}
        </div>
        <p className="diary-v4-lockover-progress">
          {t('diary.lock.soon_hint', lang)}
        </p>
      </div>
    );
  })() : null;

  const chaptersContent = (
    <div className="diary-v4-chapters">
      {levelTabs}
      {!unlocked ? (
        <div className="diary-v4-lockshell">
          {lockPreview}
          <div className="diary-v4-lockshell-inner" aria-hidden="true">
            {CHAPTERS_BY_LEVEL[activeLevel].map((ch) => {
              const days: number[] = [];
              for (let d = ch.startDay; d <= ch.endDay; d++) days.push(d);
              return (
                <article key={ch.num} className="diary-v4-chapter" data-tone={ch.tone} data-status="locked">
                  <header className="diary-v4-chapter-band" data-num={ch.romanNum}>
                    <div className="diary-v4-chapter-band-head">
                      <div>
                        <p className="diary-v4-chap-num">Chapter {ch.num}</p>
                        <h2 className="diary-v4-chap-h2">{t(ch.titleKey, lang)}</h2>
                        <p className="diary-v4-chap-ko">{ch.ko}</p>
                      </div>
                      <div className="diary-v4-chap-stats">
                        <span className="diary-v4-chap-stats-num">0/{days.length}</span>
                        <span className="diary-v4-chap-stats-label">{t('diary.chap.locked', lang)}</span>
                      </div>
                    </div>
                  </header>
                  <div className="diary-v4-chapter-body">
                    <div className="diary-v4-days">
                      {days.slice(0, 3).map((d) => (
                        <div key={d} className="diary-v4-day-wrap is-day-locked">
                          <div className="diary-v4-day is-locked">
                            <div className="diary-v4-day-num">{String(d).padStart(2, '0')}</div>
                            <div className="diary-v4-day-body">
                              <div className="diary-v4-day-title">Day {d}</div>
                            </div>
                            <span className="diary-v4-day-marker">·</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        CHAPTERS_BY_LEVEL[activeLevel].map((ch) => {
          const days: number[] = [];
          for (let d = ch.startDay; d <= ch.endDay; d++) days.push(d);
          const chapterDone = days.filter((d) => completedDays.has(d)).length;
          const chapterTotal = days.length;
          const status = chapterDone === chapterTotal ? t('diary.status.done', lang) : chapterDone > 0 ? t('diary.status.active', lang) : t('diary.status.locked', lang);
          const chapterStatus = chapterDone === chapterTotal ? 'done' : chapterDone > 0 ? 'active' : 'locked';

          return (
            <article key={ch.num} className="diary-v4-chapter" data-tone={ch.tone} data-status={chapterStatus}>
              <header className="diary-v4-chapter-band" data-num={ch.romanNum}>
                <div className="diary-v4-chapter-band-head">
                  <div>
                    <p className="diary-v4-chap-num">Chapter {ch.num}</p>
                    <h2 className="diary-v4-chap-h2">{t(ch.titleKey, lang)}</h2>
                    <p className="diary-v4-chap-ko">{ch.ko}</p>
                  </div>
                  <div className="diary-v4-chap-stats">
                    <span className="diary-v4-chap-stats-num">{chapterDone}/{chapterTotal}</span>
                    <span className="diary-v4-chap-stats-label">{status}</span>
                  </div>
                </div>
              </header>
              <div className="diary-v4-chapter-body">
                <div className="diary-v4-days">
                  {days.map((d) => {
                    const dayData = allDaysForLevel.find((x) => x.day === d);
                    const dayTitle = dayData?.title ?? `Day ${d}`;
                    const daySub = dayData?.subtitle ?? '';
                    const done = completedDays.has(d);
                    const current = d === currentDay && !done;
                    const locked = !isAdmin && !done && !current;
                    const dayExpanded = done && expandedDays.has(d);

                    const classNames = [
                      'diary-v4-day',
                      done && 'is-done',
                      current && 'is-current',
                      locked && 'is-locked',
                    ].filter(Boolean).join(' ');

                    return (
                      <div
                        key={d}
                        className={`diary-v4-day-wrap${locked ? ' is-day-locked' : ''}`}
                      >
                        <button
                          onClick={() => handleDayClick(d)}
                          className={classNames}
                        >
                          <div className="diary-v4-day-num">{String(d).padStart(2, '0')}</div>
                          <div className="diary-v4-day-body">
                            <div className="diary-v4-day-title">{dayTitle}</div>
                            {daySub && <div className="diary-v4-day-sub">{daySub}</div>}
                          </div>
                          <span className="diary-v4-day-marker">
                            {current ? 'TODAY' : done ? '✓' : '·'}
                          </span>
                          {done && (
                            <span
                              role="button"
                              tabIndex={0}
                              aria-label={dayExpanded ? t('diary.sq.collapse', lang) : t('diary.sq.expand', lang)}
                              aria-expanded={dayExpanded}
                              className={`diary-v4-day-toggle${dayExpanded ? ' is-open' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedDays((prev) => {
                                  const next = new Set(prev);
                                  if (next.has(d)) next.delete(d); else next.add(d);
                                  return next;
                                });
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setExpandedDays((prev) => {
                                    const next = new Set(prev);
                                    if (next.has(d)) next.delete(d); else next.add(d);
                                    return next;
                                  });
                                }
                              }}
                            >
                              <ChevronDown size={16} strokeWidth={2} />
                            </span>
                          )}
                        </button>

                        {done && dayExpanded && (
                          <div className="diary-v4-subquests" aria-label={t('diary.sq.day_aria', lang, { d })}>
                            {SUB_QUESTS.map((sq) => {
                              const starsKey = `${activeLevel}-${d}-${sq.idx}`;
                              const sqStars = subStars[starsKey] ?? 0;
                              const sqDone = sqStars >= 1;
                              // 前置门控：1-1 直通；2-4 需前一关 ≥1 星；5(Boss) 需 1-4 全 ≥1 星
                              const prevStars = sq.idx > 1 ? (subStars[`${activeLevel}-${d}-${sq.idx - 1}`] ?? 0) : 3;
                              const bossReady = sq.isBoss
                                ? [1, 2, 3, 4].every((i) => (subStars[`${activeLevel}-${d}-${i}`] ?? 0) >= 1)
                                : true;
                              const sqLocked = !isAdmin && (
                                (sq.isBoss && !bossReady) ||
                                (!sq.isBoss && sq.idx > 1 && prevStars < 1)
                              );
                              const sqActive = !sqDone && !sqLocked;

                              const sqClass = [
                                'diary-v4-sq',
                                sq.isBoss && 'is-boss',
                                sqDone && 'is-done',
                                sqActive && 'is-active',
                                sqLocked && 'is-locked',
                              ].filter(Boolean).join(' ');

                              return (
                                <button
                                  key={sq.idx}
                                  className={sqClass}
                                  data-stars={sqStars}
                                  disabled={sqLocked}
                                  aria-label={`${d}-${sq.idx} ${sq.ko}`}
                                  onClick={() => {
                                    if (!user) {
                                      showToast(t('diary.toast.login_sq', lang), 'info');
                                      setTimeout(() => router.push('/auth/login?redirect=/diary'), 600);
                                      return;
                                    }
                                    if (sqLocked) {
                                      if (sq.isBoss) showToast(t('diary.toast.boss_locked', lang), 'info');
                                      else showToast(t('diary.toast.prev_locked', lang), 'info');
                                      return;
                                    }
                                    // 有数据 → 跳子关卡页；无数据 → 兜底 toast
                                    if (hasSubQuest(activeLevel, d, sq.idx)) {
                                      router.push(`/diary/${activeLevel}/${d}/${sq.idx}`);
                                    } else {
                                      showToast(t('diary.toast.developing', lang), 'info');
                                    }
                                  }}
                                >
                                  <span className="diary-v4-sq-num">{d}-{sq.idx}</span>
                                  <span className="diary-v4-sq-labels">
                                    <span className="diary-v4-sq-label-ko">{sq.ko}</span>
                                    <span className="diary-v4-sq-label-zh">{t(sq.zhKey, lang)}</span>
                                  </span>
                                  <span className="diary-v4-sq-time">⏱ {sq.time}</span>
                                  <span className="diary-v4-sq-stars" aria-label={`${sqStars}/3 stars`}>
                                    {[0, 1, 2].map((i) => (
                                      <svg
                                        key={i}
                                        viewBox="0 0 24 24"
                                        className={`diary-v4-sq-star${i < sqStars ? ' is-on' : ''}`}
                                      >
                                        <path d="M12 2.6 L 14.6 9.1 L 21.4 9.7 L 16.2 14.2 L 17.8 21 L 12 17.3 L 6.2 21 L 7.8 14.2 L 2.6 9.7 L 9.4 9.1 Z" />
                                      </svg>
                                    ))}
                                  </span>
                                  <span className="diary-v4-sq-end" aria-hidden="true">
                                    {sqDone ? (
                                      <svg viewBox="0 0 24 24" strokeWidth="2.4">
                                        <path d="M4.5 13.2 Q 8 17 10.4 17.6 Q 13 17 19 6.5" />
                                      </svg>
                                    ) : sqLocked ? (
                                      <svg viewBox="0 0 24 24" strokeWidth="1.8">
                                        <rect x="5" y="11" width="14" height="9" rx="1.5" />
                                        <path d="M8 11 V 7.5 Q 8 4 12 4 Q 16 4 16 7.5 V 11" fill="none" />
                                      </svg>
                                    ) : (
                                      <svg viewBox="0 0 24 24" strokeWidth="2">
                                        <path d="M4 12.2 Q 11 12.6 19 12 M 13.8 6.8 Q 17 10 19 12 Q 17 14.2 13.6 17.4" />
                                      </svg>
                                    )}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })
      )}
    </div>
  );

  return (
    <div className="diary-fullscreen">
      <PlaceIntro place="diary" />
      <button aria-label={t('diary.back_aria', lang)} className="diary-v4-close" onClick={backToMain}>
        <X size={18} strokeWidth={1.75} />
      </button>

      <div className="diary-v4-layout">
        <aside className="diary-v4-sidecol">
          <div className="diary-v4-sidecol-inner">
            <div className="diary-v4-brand-mini">tori diary</div>
            {heroContent}
          </div>
        </aside>
        <main className="diary-v4-maincol">
          {chaptersContent}
        </main>
      </div>

      <Modal open={showSoonModal} onClose={() => setShowSoonModal(false)} size="sm" closeButton={false}>
        <div style={{ textAlign: 'center', padding: '4px 0' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌙</div>
          <h2 style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 20, fontWeight: 800, marginBottom: 10, color: 'var(--color-ink-1)', letterSpacing: '0.02em' }}>
            {t('diary.soon.title', lang)}
          </h2>
          <p style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 14, lineHeight: 1.85, color: 'var(--color-ink-3)', marginBottom: 22, letterSpacing: '0.02em', whiteSpace: 'pre-line' }}>
            {t('diary.soon.body', lang)}
          </p>
          <button onClick={() => setShowSoonModal(false)} className="diary-list-cta" style={{ width: '100%' }}>
            <span style={{ fontFamily: 'var(--diary-v4-serif)', fontSize: 15, fontWeight: 700, letterSpacing: '0.02em', flex: 1 }}>{t('diary.soon.ok', lang)}</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
