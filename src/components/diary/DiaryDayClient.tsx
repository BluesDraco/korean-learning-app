'use client';

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import type { ToriDay, ToriModuleKind, ToriLevel, ToriModuleState } from '@/types/tori-diary';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/useToast';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { DiaryOpening } from './DiaryOpening';
import { DiaryWords } from './DiaryWords';
import { DiaryFlashcard } from './DiaryFlashcard';
import { DiaryDialogue } from './DiaryDialogue';
import { DiaryGrammar } from './DiaryGrammar';
import { DiaryOutput } from './DiaryOutput';
import { DiaryRecap } from './DiaryRecap';
import { CarrotHelper } from './CarrotHelper';
import { DiaryDay1InvitePopup, DAY1_INVITE_SEEN_KEY } from './DiaryDay1InvitePopup';

const MODULE_ORDER: ToriModuleKind[] = ['opening', 'words', 'flashcard', 'dialogue', 'grammar', 'output', 'recap'];

// 「完成当天」= 做完全部学习模块（recap 是收尾奖励屏，不作为完成门槛）。
// 与列表页 modulesDone.length>=6、子关卡门控保持同一口径。
const REQUIRED_MODULES: ToriModuleKind[] = MODULE_ORDER.filter((m) => m !== 'recap');

const MODULE_LABEL_KEYS: Record<ToriModuleKind, string> = {
  opening: 'diary.day.mod.opening',
  words: 'diary.day.mod.words',
  flashcard: 'diary.day.mod.flashcard',
  dialogue: 'diary.day.mod.dialogue',
  grammar: 'diary.day.mod.grammar',
  output: 'diary.day.mod.output',
  recap: 'diary.day.mod.recap',
};

interface Props {
  day: ToriDay;
  level: ToriLevel;
}

export function DiaryDayClient({ day, level }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const { showToast } = useToast();
  const { lang } = useLang();

  // 韩文日期/地点 → 中文
  const toChinese = (s: string) => s
    .replace(/월/g, '月').replace(/일/g, '日')
    .replace(/월요일/g, '周一').replace(/화요일/g, '周二').replace(/수요일/g, '周三')
    .replace(/목요일/g, '周四').replace(/금요일/g, '周五').replace(/토요일/g, '周六').replace(/일요일/g, '周日')
    .replace(/오전/g, '上午').replace(/오후/g, '下午').replace(/저녁/g, '傍晚')
    .replace(/출발 전날 밤/g, '出发前夜')
    .replace(/비행기 안/g, '飞机上').replace(/인천공항/g, '仁川机场')
    .replace(/한빛 기숙사 로비/g, '韩光宿舍大堂').replace(/한빛 기숙사 복도/g, '韩光宿舍走廊')
    .replace(/한빛 어학원 교실/g, '韩光语学院教室');
  const cnDate = useMemo(() => toChinese(day.opening.date), [day.opening.date]);
  const cnWeather = useMemo(() => toChinese(day.opening.weather || ''), [day.opening.weather]);
  const [currentModule, setCurrentModule] = useState<ToriModuleKind>('opening');
  const [outputResults, setOutputResults] = useState<Array<{ taskId: string; correct: boolean; userText?: string }>>([]);
  const outputResultsRef = useRef(outputResults);
  outputResultsRef.current = outputResults;
  const [modulesDone, setModulesDone] = useState<Set<ToriModuleKind>>(new Set());
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [moduleState, setModuleState] = useState<ToriModuleState>({});
  const moduleStateRef = useRef(moduleState);
  moduleStateRef.current = moduleState;
  const flushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [carrotProgress, setCarrotProgress] = useState<{
    completedDays: number;
    sentencesCount: number;
    recordingsCount: number;
  } | undefined>(undefined);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'
  );

  // 监听 theme 切换
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  const progressId = user ? `${user.id}-${level}-${day.day}` : '';
  const progressIdRef = useRef(progressId);
  progressIdRef.current = progressId;
  const advancingRef = useRef(false);
  const isAdmin = user?.role === 'admin';
  const showAdminSkip = isAdmin;
  const activeOrder = MODULE_ORDER;

  // 加载 / 创建进度记录
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const existing = await db.toriProgress.get(progressId);
        if (existing) {
          const done = new Set(existing.modulesDone as ToriModuleKind[]);
          // completedAt 可能因磁盘满等故障漏写，学习模块全做完就自动补设
          if (!existing.completedAt && REQUIRED_MODULES.every((m) => done.has(m))) {
            db.toriProgress.update(progressId, { completedAt: Date.now() }).catch(() => {});
          }
          setModulesDone(done);
          if (existing.moduleState) setModuleState(existing.moduleState);
          // 恢复到下一个未完成模块；全做完则停在最后一步
          const nextIdx = activeOrder.findIndex((m) => !done.has(m));
          const resumeTo = nextIdx === -1 ? activeOrder[activeOrder.length - 1] : activeOrder[nextIdx];
          if (resumeTo) setCurrentModule(resumeTo);

          // 修复历史 bug：completedAt 已写但 sticker 没写。挂载时静默补写。
          if (existing.completedAt || REQUIRED_MODULES.every((m) => done.has(m))) {
            const stickerId = `sticker-d${String(day.day).padStart(2, '0')}`;
            const ownedId = `${user.id}-${stickerId}`;
            db.toriStickersOwned.get(ownedId).then((owned) => {
              if (!owned) {
                db.toriStickersOwned.put({
                  id: ownedId,
                  userId: user.id,
                  stickerId,
                  acquiredAt: Date.now(),
                }).catch(() => {});
              }
            }).catch(() => {});
          }
        } else {
          await db.toriProgress.put({
            id: progressId,
            userId: user.id,
            level,
            day: day.day,
            modulesDone: [],
            startedAt: Date.now(),
            output: [],
          });
        }
      } catch (e) { console.error('[diary]', e); }
    })();
  }, [progressId, day.day, user]);

  // 算胡萝卜需要的进度数据
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const [allP, allSentences, allRecordings] = await Promise.all([
          db.toriProgress.toArray(),
          db.sentences.orderBy('id').limit(1000).toArray().catch(() => []),
          db.recordings.orderBy('id').limit(500).toArray().catch(() => []),
        ]);
        const userP = allP.filter((p) => p.userId === user.id && p.completedAt);
        const sentences = allSentences.filter(
          (s) => (s.userId === user.id || !s.userId) && (s.sourceType === 'tori-diary' || s.source_type === 'tori-diary')
        );
        const recordings = allRecordings.filter(
          (r) => (r.userId === user.id || !r.userId) && (r.sourceType === 'tori-diary' || r.source_type === 'tori-diary')
        );
        if (!cancelled) {
          setCarrotProgress({
            completedDays: userP.length,
            sentencesCount: sentences.length,
            recordingsCount: recordings.length,
          });
        }
      } catch { /* keep undefined */ }
    })();
    return () => { cancelled = true; };
  }, [user, day.day]);

  // 子模块每翻一张/答一题就调这个，本地立刻更新，400ms 后一次性写库
  const handleModuleState = useCallback(<K extends keyof ToriModuleState>(kind: K, patch: ToriModuleState[K]) => {
    setModuleState((prev) => ({ ...prev, [kind]: { ...prev[kind], ...patch } }));
    if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
    flushTimerRef.current = setTimeout(() => {
      const pid = progressIdRef.current;
      if (!pid) return;
      db.toriProgress.update(pid, { moduleState: moduleStateRef.current }).catch(() => {});
    }, 400);
  }, []);

  // 卸载 / 切换模块时立刻 flush 一次未落盘的小抄本
  useEffect(() => {
    return () => {
      if (flushTimerRef.current) {
        clearTimeout(flushTimerRef.current);
        const pid = progressIdRef.current;
        if (pid) db.toriProgress.update(pid, { moduleState: moduleStateRef.current }).catch(() => {});
      }
    };
  }, []);

  const advance = useCallback(async (currentMod: ToriModuleKind, completionOutput?: typeof outputResults) => {
    // 防止用户快速双击导致 modulesDone 写入两次 + 跳过中间模块
    if (advancingRef.current) return;
    advancingRef.current = true;
    // 若「完成当天」那一步落库失败，则阻断进入收尾屏（否则本会话假完成、重进又变未完成）
    let blockAdvanceOnFailedCompletion = false;
    // 这一步是否会「完成当天」——由数据库 existing 值判定（非 React state，避免闭包陈旧）
    let advanceCompletesDay = false;
    try {
    // 同步读取最新的 progressId 和 user，避免闭包陈旧导致写错用户的进度
    const currentUser = user;
    const currentProgressId = progressIdRef.current;
    if (currentUser && currentProgressId) {
      try {
        let existing = await db.toriProgress.get(currentProgressId);
        // 如果首次进入页面还没创建进度记录，advance 时补建一条
        if (!existing) {
          await db.toriProgress.put({
            id: currentProgressId,
            userId: currentUser.id,
            level,
            day: day.day,
            modulesDone: [],
            startedAt: Date.now(),
            output: [],
          });
          existing = await db.toriProgress.get(currentProgressId);
        }
        if (existing) {
          // 防御：completedAt 已存在则不再覆盖 modulesDone / 时间戳。
          // 但 sticker 每次都补写一次（幂等）——修复上次 completedAt 已写但 sticker 写入失败的旧数据。
          const shouldAward = existing.completedAt
            ? true // 已完成的情况下也补一次 sticker
            : (() => {
                const nextDone = Array.from(new Set([...existing.modulesDone, currentMod]));
                const allDone = REQUIRED_MODULES.every((m) => nextDone.includes(m));
                return allDone;
              })();

          if (existing.completedAt) {
            setModulesDone(new Set(existing.modulesDone as ToriModuleKind[]));
          } else {
            const nextDone = Array.from(new Set([...existing.modulesDone, currentMod]));
            const allDone = REQUIRED_MODULES.every((m) => nextDone.includes(m));
            advanceCompletesDay = allDone;
            await db.toriProgress.update(currentProgressId, {
              modulesDone: nextDone,
              ...(allDone && !existing.completedAt ? { completedAt: Date.now(), output: completionOutput ?? outputResultsRef.current } : {}),
            });
            setModulesDone(new Set(nextDone as ToriModuleKind[]));
            // 邀请裂变：被邀请者完成 beginner Day1 → 通知服务端结算（fire-and-forget）
            if (allDone && day.day === 1 && level === 'beginner') {
              fetch('/api/invite/qualify', { method: 'POST' }).catch(() => {});
              // 完成 Day1 弹一次「晒成就 + 邀请」卡，localStorage 标记防重复打扰
              let seen = false;
              try { seen = localStorage.getItem(DAY1_INVITE_SEEN_KEY) === '1'; } catch { /* ignore */ }
              if (!seen) {
                try { localStorage.setItem(DAY1_INVITE_SEEN_KEY, '1'); } catch { /* ignore */ }
                setShowInvitePopup(true);
              }
            }
          }

          if (shouldAward) {
            const stickerId = `sticker-d${String(day.day).padStart(2, '0')}`;
            const ownedId = `${currentUser.id}-${stickerId}`;
            // 重试 3 次：每次先查是否已有（幂等），没有再写。
            // 覆盖网络抖动 / 服务端 5xx / cookie 过期等场景，最大程度保证贴纸不丢。
            let lastErr: unknown = null;
            for (let attempt = 0; attempt < 3; attempt++) {
              try {
                const owned = await db.toriStickersOwned.get(ownedId);
                if (owned) { lastErr = null; break; }
                await db.toriStickersOwned.put({
                  id: ownedId,
                  userId: currentUser.id,
                  stickerId,
                  acquiredAt: Date.now(),
                });
                lastErr = null;
                break;
              } catch (err) {
                lastErr = err;
                if (attempt < 2) await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
              }
            }
            if (lastErr) console.warn('[diary] sticker write failed after retries', lastErr);
          }
        }
      } catch (e) {
        console.error('[diary] advance failed', e);
        // 完成当天那一步落库失败：不本地标记完成、不进收尾屏，提示重试（保存成功才算通关）
        if (advanceCompletesDay) {
          blockAdvanceOnFailedCompletion = true;
          showToast(t('diary.day.completeSaveFailed', lang), 'error');
        } else {
          // 非完成环节：存储失败不阻塞学习流程，本地内存推进，进度暂存本次会话
          setModulesDone((prev) => new Set([...prev, currentMod]));
          showToast(t('diary.day.progressUnsynced', lang), 'info');
        }
      }
    }
    if (blockAdvanceOnFailedCompletion) return;
    const idx = activeOrder.indexOf(currentMod);
    if (idx < activeOrder.length - 1) {
      setCurrentModule(activeOrder[idx + 1]);
      if (typeof window !== 'undefined') {
        // 手机 .scroll / 桌面 .desk-main 各自都是滚动容器，一并滚回顶部
        document.querySelectorAll('.diary-compare .scroll, .diary-compare .desk-main')
          .forEach((el) => el.scrollTo({ top: 0, behavior: 'smooth' }));
      }
    }
    } finally {
      advancingRef.current = false;
    }
  }, [user, day.day, level, activeOrder, showToast, lang]);

  const handleProgressJump = (target: ToriModuleKind) => {
    // admin 任意切；普通用户只能切已完成或当前
    const targetIdx = activeOrder.indexOf(target);
    const currentIdx = activeOrder.indexOf(currentModule);
    if (isAdmin || targetIdx <= currentIdx || modulesDone.has(target)) {
      setCurrentModule(target);
    }
  };

  const currentIdx = activeOrder.indexOf(currentModule);
  const goBack = useSmartBack('/diary');

  return (
    <div className={`diary-compare ${isDark ? 'D' : 'L'}`} style={{ position: 'fixed', inset: 0, zIndex: 100 }}>

      {/* ═══════════ 手机 · Phone ═══════════ */}
      <div className="phone">
        <div className="topbar">
          <button className="topbar-back" onClick={goBack} aria-label={t('diary.day.backAria', lang)}>←</button>
          <button className="topbar-home" onClick={() => router.push('/diary')} aria-label={t('diary.day.diaryHomeAria', lang)}>{t('diary.day.diaryHome', lang)}</button>
          <button className="topbar-home" onClick={() => router.push('/daily')} aria-label={t('diary.day.mainSiteAria', lang)} style={{ background: 'var(--gold, #d4a574)', color: '#fff', borderColor: 'var(--gold, #d4a574)' }}>🏠 {t('diary.day.mainSite', lang)}</button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="topbar-day">Day {day.day} · {day.title}</div>
            <div className="topbar-step">{t('diary.day.stepCounter', lang, { current: currentIdx + 1, total: activeOrder.length })} · {t(MODULE_LABEL_KEYS[currentModule], lang)}</div>
          </div>
        </div>

        <div className="scroll">
          {/* Hero */}
          <div className="hero">
            <span className="tape tape-tl" />
            <span className="tape tape-tr" />
            <span className="tape tape-br" />
            <div className="hero-date">{cnDate}{cnWeather ? ` · ${cnWeather}` : ''}</div>
            <div className="hero-h">{day.title}</div>
            <div className="hero-sub">{day.subtitle}</div>
            <div className="module-dots">
              {activeOrder.map((m, i) => {
                const done = modulesDone.has(m) || i < currentIdx;
                const cur = m === currentModule;
                const canJump = isAdmin || done || i <= currentIdx;
                return (
                  <button
                    key={m}
                    type="button"
                    aria-label={t('diary.day.jumpToStep', lang, { step: i + 1, name: t(MODULE_LABEL_KEYS[m], lang) })}
                    className={`dot${done ? ' done' : ''}${cur ? ' current' : ''}`}
                    onClick={() => canJump && handleProgressJump(m)}
                    disabled={!canJump}
                    style={{ cursor: canJump ? 'pointer' : 'not-allowed', background: 'transparent', border: 'none', font: 'inherit' }}
                  >
                    {done ? '✓' : i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 当前模块 */}
          <div className="card">
            <span className="tape tape-tl" />
            {showAdminSkip && currentModule !== 'opening' && (
              <button
                onClick={() => advance(currentModule)}
                style={{
                  position: 'absolute', top: 14, right: 16, zIndex: 3,
                  padding: '3px 12px', fontSize: 11, fontWeight: 600,
                  color: 'var(--ink-3)', background: 'var(--paper-deep)',
                  border: '1px solid var(--line)', borderRadius: 999,
                  cursor: 'pointer', fontFamily: "'Inter',sans-serif",
                  letterSpacing: '.04em',
                }}
              >
                {t('diary.day.skip', lang)}
              </button>
            )}
            <div key={currentModule} className="diary-anim-fade-up">
              {currentModule === 'opening' && <DiaryOpening day={day} onComplete={() => advance('opening')} />}
              {currentModule === 'words' && <DiaryWords day={day} onComplete={() => advance('words')} onBack={currentIdx > 0 ? () => setCurrentModule(activeOrder[currentIdx - 1]) : undefined} initialState={moduleState.words} onStateChange={(s) => handleModuleState('words', s)} />}
              {currentModule === 'flashcard' && <DiaryFlashcard day={day} onComplete={() => advance('flashcard')} onBack={currentIdx > 0 ? () => setCurrentModule(activeOrder[currentIdx - 1]) : undefined} initialState={moduleState.flashcard} onStateChange={(s) => handleModuleState('flashcard', s)} />}
              {currentModule === 'dialogue' && <DiaryDialogue day={day} onComplete={() => advance('dialogue')} onBack={currentIdx > 0 ? () => setCurrentModule(activeOrder[currentIdx - 1]) : undefined} initialState={moduleState.dialogue} onStateChange={(s) => handleModuleState('dialogue', s)} />}
              {currentModule === 'grammar' && <DiaryGrammar day={day} onComplete={() => advance('grammar')} onBack={currentIdx > 0 ? () => setCurrentModule(activeOrder[currentIdx - 1]) : undefined} />}
              {currentModule === 'output' && <DiaryOutput day={day} onComplete={(results) => { setOutputResults(results); advance('output', results); }} onBack={currentIdx > 0 ? () => setCurrentModule(activeOrder[currentIdx - 1]) : undefined} initialState={moduleState.output} onStateChange={(s) => handleModuleState('output', s)} />}
              {currentModule === 'recap' && <DiaryRecap day={day} onComplete={() => advance('recap')} />}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════ 桌面 · Desktop ═══════════ */}
      <div className="desktop">
        <div className="desk-side">
          <div className="desk-side-nav">
            <button className="desk-side-back" onClick={() => router.push('/diary')}>{t('diary.day.backToMap', lang)}</button>
            <button className="desk-side-home" onClick={() => router.push('/daily')} aria-label={t('diary.day.mainSiteAria', lang)}>🏠 {t('diary.day.mainSite', lang)}</button>
          </div>
          <div className="desk-side-day">Day {day.day} · {cnDate}</div>
          {cnWeather && <div className="desk-side-weather">{cnWeather}</div>}
          {day.subtitle && <div className="desk-side-sub">{day.subtitle}</div>}

          <div className="modules">
            {activeOrder.map((m, i) => {
              const done = modulesDone.has(m) || i < currentIdx;
              const cur = m === currentModule;
              const canJump = isAdmin || done || i <= currentIdx;
              return (
                <button key={m} className={`mod${done ? ' done' : ''}${cur ? ' current' : ''}`}
                  onClick={() => canJump && handleProgressJump(m)} disabled={!canJump}>
                  <span className="mod-stamp">{done ? '✓' : i + 1}</span>
                  <span className="mod-name">{t(MODULE_LABEL_KEYS[m], lang)}</span>
                  <span className="mod-tag">{m}</span>
                </button>
              );
            })}
          </div>

          <div className="desk-side-progress">
            <div className="prog-row"><span className="prog-label">{t('diary.day.todayProgress', lang)}</span><span className="prog-num">{modulesDone.size} / {activeOrder.length}</span></div>
            <div className="prog-track"><div className="prog-fill" style={{ width: `${Math.round((modulesDone.size / activeOrder.length) * 100)}%` }} /></div>
          </div>

        </div>

        <div className="desk-main">
          <div className="desk-eyebrow">{cnDate}{cnWeather ? ` · ${cnWeather}` : ''} · {t('diary.day.animalCity', lang)}</div>
          <div className="desk-main-h">{day.title}</div>
          <div className="desk-meta">
            <span>📍 한빛 {t('diary.day.dorm301', lang)}</span>
            <span>⏱ {t('diary.day.estMin', lang, { n: day.estimatedMin })}</span>
            <span>📖 {t('diary.day.newWords', lang, { n: day.words.length })}</span>
          </div>

          <div className="desk-content-grid">
            <div className="desk-col-left">
              {/* 日记正文——仅开场模块显示 */}
              {currentModule === 'opening' && (
                <DiaryOpening day={day} onComplete={() => advance('opening')} />
              )}

              {/* 模块内容——开场只显示按钮，其他模块加卡片包装 */}
              {currentModule !== 'opening' && (
                <div className="card" style={{ margin: 0 }}>
                  <span className="tape tape-tl" />
                  <span className="tape tape-tr" />
                  <span className="tag">{t(MODULE_LABEL_KEYS[currentModule], lang)}</span>
                  {showAdminSkip && (
                    <button
                      onClick={() => advance(currentModule)}
                      style={{
                        position: 'absolute', top: 14, right: 16, zIndex: 3,
                        padding: '3px 12px', fontSize: 11, fontWeight: 600,
                        color: 'var(--ink-3)', background: 'var(--paper-deep)',
                        border: '1px solid var(--line)', borderRadius: 999,
                        cursor: 'pointer', fontFamily: "'Inter',sans-serif",
                        letterSpacing: '.04em', transition: 'color .15s, border-color .15s',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--gold-deep)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink-3)'; e.currentTarget.style.borderColor = 'var(--line)'; }}
                    >
                      {t('diary.day.skip', lang)}
                    </button>
                  )}
                  <div key={currentModule} className="diary-anim-fade-up">
                    {currentModule === 'words' && <DiaryWords day={day} onComplete={() => advance('words')} onBack={currentIdx > 0 ? () => setCurrentModule(activeOrder[currentIdx - 1]) : undefined} initialState={moduleState.words} onStateChange={(s) => handleModuleState('words', s)} />}
                    {currentModule === 'flashcard' && <DiaryFlashcard day={day} onComplete={() => advance('flashcard')} onBack={currentIdx > 0 ? () => setCurrentModule(activeOrder[currentIdx - 1]) : undefined} initialState={moduleState.flashcard} onStateChange={(s) => handleModuleState('flashcard', s)} />}
                    {currentModule === 'dialogue' && <DiaryDialogue day={day} onComplete={() => advance('dialogue')} onBack={currentIdx > 0 ? () => setCurrentModule(activeOrder[currentIdx - 1]) : undefined} initialState={moduleState.dialogue} onStateChange={(s) => handleModuleState('dialogue', s)} />}
                    {currentModule === 'grammar' && <DiaryGrammar day={day} onComplete={() => advance('grammar')} onBack={currentIdx > 0 ? () => setCurrentModule(activeOrder[currentIdx - 1]) : undefined} />}
                    {currentModule === 'output' && <DiaryOutput day={day} onComplete={(results) => { setOutputResults(results); advance('output', results); }} onBack={currentIdx > 0 ? () => setCurrentModule(activeOrder[currentIdx - 1]) : undefined} initialState={moduleState.output} onStateChange={(s) => handleModuleState('output', s)} />}
                    {currentModule === 'recap' && <DiaryRecap day={day} onComplete={() => advance('recap')} />}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>

      <CarrotHelper
        key={day.day} day={day} currentModule={currentModule}
        progress={carrotProgress}
      />

      {showInvitePopup && <DiaryDay1InvitePopup onClose={() => setShowInvitePopup(false)} />}
    </div>
  );
}
