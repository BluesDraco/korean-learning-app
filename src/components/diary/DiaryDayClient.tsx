'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import type { ToriDay, ToriModuleKind } from '@/types/tori-diary';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { DiaryOpening } from './DiaryOpening';
import { DiaryWords } from './DiaryWords';
import { DiaryDialogue } from './DiaryDialogue';
import { DiaryGrammar } from './DiaryGrammar';
import { DiaryOutput } from './DiaryOutput';
import { DiaryRecap } from './DiaryRecap';
import { CarrotHelper } from './CarrotHelper';

const MODULE_ORDER: ToriModuleKind[] = ['opening', 'words', 'dialogue', 'grammar', 'output', 'recap'];

const MODULE_LABELS: Record<ToriModuleKind, string> = {
  opening: '开场',
  words: '单词',
  dialogue: '对话',
  grammar: '语法',
  output: '输出',
  recap: '收尾',
};

const MODULE_EYEBROWS: Record<ToriModuleKind, string> = {
  opening: 'opening · 日记开场',
  words: 'vocabulary · 新词卡',
  dialogue: 'dialogue · 场景对话',
  grammar: 'grammar · 语法小卡',
  output: 'practice · 输出练习',
  recap: 'recap · 今日收尾',
};

type ChapterTone = 'pink' | 'mint' | 'purple' | 'gold';
type ChapterRoman = 'i' | 'ii' | 'iii' | 'iv';

function chapterTone(day: number): ChapterTone {
  if (day <= 7) return 'pink';
  if (day <= 14) return 'mint';
  if (day <= 21) return 'purple';
  return 'gold';
}

function chapterRoman(day: number): ChapterRoman {
  if (day <= 7) return 'i';
  if (day <= 14) return 'ii';
  if (day <= 21) return 'iii';
  return 'iv';
}

interface Props {
  day: ToriDay;
}

export function DiaryDayClient({ day }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const [currentModule, setCurrentModule] = useState<ToriModuleKind>('opening');
  const [outputResults, setOutputResults] = useState<Array<{ taskId: string; correct: boolean; userText?: string }>>([]);
  const [modulesDone, setModulesDone] = useState<Set<ToriModuleKind>>(new Set());
  const [carrotProgress, setCarrotProgress] = useState<{
    completedDays: number;
    checkpointsCleared: number;
    sentencesCount: number;
    recordingsCount: number;
  } | undefined>(undefined);

  const progressId = user ? `${user.id}-${day.day}` : '';
  const tone = chapterTone(day.day);
  const roman = chapterRoman(day.day);
  const isAdmin = user?.role === 'admin';

  // 加载 / 创建进度记录
  useEffect(() => {
    if (!user) return;
    setModulesDone(new Set()); // 切 day 时先重置避免残留
    (async () => {
      try {
        const existing = await db.toriProgress.get(progressId);
        if (existing) {
          setModulesDone(new Set(existing.modulesDone as ToriModuleKind[]));
        } else {
          await db.toriProgress.put({
            id: progressId,
            userId: user.id,
            day: day.day,
            modulesDone: [],
            startedAt: Date.now(),
            output: [],
          });
        }
      } catch { /* ignore */ }
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
          db.sentences.toArray().catch(() => []),
          db.recordings.toArray().catch(() => []),
        ]);
        const checkpoints = new Set([7, 14, 21, 26, 29, 30]);
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
            checkpointsCleared: userP.filter((p) => checkpoints.has(p.day)).length,
            sentencesCount: sentences.length,
            recordingsCount: recordings.length,
          });
        }
      } catch { /* keep undefined */ }
    })();
    return () => { cancelled = true; };
  }, [user, day.day]);

  const advance = useCallback(async (currentMod: ToriModuleKind) => {
    if (user) {
      try {
        const existing = await db.toriProgress.get(progressId);
        if (existing) {
          const nextDone = Array.from(new Set([...existing.modulesDone, currentMod]));
          const allDone = MODULE_ORDER.every((m) => nextDone.includes(m));
          await db.toriProgress.update(progressId, {
            modulesDone: nextDone,
            ...(allDone && !existing.completedAt ? { completedAt: Date.now(), output: outputResults } : {}),
          });
          setModulesDone(new Set(nextDone as ToriModuleKind[]));
          if (allDone) {
            const stickerId = `sticker-d${String(day.day).padStart(2, '0')}`;
            const ownedId = `${user.id}-${stickerId}`;
            const owned = await db.toriStickersOwned.get(ownedId);
            if (!owned) {
              await db.toriStickersOwned.put({
                id: ownedId,
                userId: user.id,
                stickerId,
                acquiredAt: Date.now(),
              });
            }
          }
        }
      } catch { /* ignore */ }
    }
    const idx = MODULE_ORDER.indexOf(currentMod);
    if (idx < MODULE_ORDER.length - 1) {
      setCurrentModule(MODULE_ORDER[idx + 1]);
      if (typeof window !== 'undefined') {
        const scroller = document.querySelector('.diary-detail-page');
        if (scroller) scroller.scrollTo({ top: 0, behavior: 'smooth' });
        else window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [progressId, user, outputResults, day.day]);

  const handleProgressJump = (target: ToriModuleKind) => {
    // admin 任意切；普通用户只能切已完成或当前
    const targetIdx = MODULE_ORDER.indexOf(target);
    const currentIdx = MODULE_ORDER.indexOf(currentModule);
    if (isAdmin || targetIdx <= currentIdx || modulesDone.has(target)) {
      setCurrentModule(target);
    }
  };

  return (
    <div className={`diary-detail-page diary-detail-tone-${tone}`}>
      {/* Sticky 顶栏 */}
      <header className="diary-detail-topbar">
        <div className="diary-detail-topbar-row">
          <button
            aria-label="关闭"
            className="diary-detail-close"
            onClick={() => {
              if (typeof window !== 'undefined' && window.history.length > 1) {
                router.back();
              } else {
                router.push('/diary');
              }
            }}
          >
            <X size={18} strokeWidth={1.75} />
          </button>

          <div className="diary-detail-topbar-title">
            <span className="diary-detail-topbar-day">DAY {String(day.day).padStart(2, '0')}</span>
            <span className="diary-detail-topbar-sep">·</span>
            <span className="diary-detail-topbar-name">{day.title}</span>
          </div>

          <span className="diary-detail-topbar-mod">{MODULE_LABELS[currentModule]}</span>
        </div>

        {/* 6 区进度条 */}
        <div className="diary-detail-progress" role="tablist" aria-label="模块进度">
          {MODULE_ORDER.map((m) => {
            const idx = MODULE_ORDER.indexOf(m);
            const currentIdx = MODULE_ORDER.indexOf(currentModule);
            const isDone = modulesDone.has(m) || idx < currentIdx;
            const isCurrent = m === currentModule;
            const canJump = isAdmin || isDone || idx <= currentIdx;
            return (
              <button
                key={m}
                role="tab"
                aria-selected={isCurrent}
                aria-label={MODULE_LABELS[m]}
                className={[
                  'diary-detail-progress-seg',
                  isDone && 'is-done',
                  isCurrent && 'is-current',
                  !canJump && 'is-locked',
                ].filter(Boolean).join(' ')}
                onClick={() => canJump && handleProgressJump(m)}
                disabled={!canJump}
              >
                <span className="diary-detail-progress-fill" />
              </button>
            );
          })}
        </div>
      </header>

      {/* 章节色带 hero */}
      <section className="diary-detail-hero" data-roman={roman}>
        <div className="diary-detail-hero-inner">
          <p className="diary-detail-hero-eyebrow">Day {day.day} of 30 · Chapter {roman}</p>
          <h1 className="diary-detail-hero-title">{day.title}</h1>
          {day.subtitle && (
            <p className="diary-detail-hero-sub">{day.subtitle}</p>
          )}
        </div>
      </section>

      {/* 信纸主体卡片 */}
      <main className="diary-detail-main">
        <article className="diary-detail-card">
          <div className="diary-detail-card-band" />
          <div className="diary-detail-card-eyebrow">
            <span>{MODULE_EYEBROWS[currentModule]}</span>
            {currentModule !== 'recap' && (
              <button className="diary-detail-skip" onClick={() => advance(currentModule)}>
                跳过 →
              </button>
            )}
          </div>

          <div key={currentModule} className="diary-detail-fade-in diary-root">
            {currentModule === 'opening' && (
              <DiaryOpening day={day} onComplete={() => advance('opening')} />
            )}
            {currentModule === 'words' && (
              <DiaryWords day={day} onComplete={() => advance('words')} />
            )}
            {currentModule === 'dialogue' && (
              <DiaryDialogue day={day} onComplete={() => advance('dialogue')} />
            )}
            {currentModule === 'grammar' && (
              <DiaryGrammar day={day} onComplete={() => advance('grammar')} />
            )}
            {currentModule === 'output' && (
              <DiaryOutput
                day={day}
                onComplete={(results) => {
                  setOutputResults(results);
                  advance('output');
                }}
              />
            )}
            {currentModule === 'recap' && (
              <DiaryRecap
                day={day}
                onComplete={() => advance('recap')}
              />
            )}
          </div>

          {currentModule !== 'opening' && (
            <button
              className="diary-detail-back"
              onClick={() => {
                const idx = MODULE_ORDER.indexOf(currentModule);
                if (idx > 0) setCurrentModule(MODULE_ORDER[idx - 1]);
              }}
            >
              ← 上一步
            </button>
          )}
        </article>
      </main>

      {/* 悬浮的勇气胡萝卜助手 */}
      <CarrotHelper key={day.day} day={day} currentModule={currentModule} progress={carrotProgress} />
    </div>
  );
}
