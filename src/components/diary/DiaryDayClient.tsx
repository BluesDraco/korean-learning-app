'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
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

interface Props {
  day: ToriDay;
}

export function DiaryDayClient({ day }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const [currentModule, setCurrentModule] = useState<ToriModuleKind>('opening');
  const [outputResults, setOutputResults] = useState<Array<{ taskId: string; correct: boolean; userText?: string }>>([]);
  const [carrotProgress, setCarrotProgress] = useState<{
    completedDays: number;
    checkpointsCleared: number;
    sentencesCount: number;
    recordingsCount: number;
  } | undefined>(undefined);

  const progressId = user ? `${user.id}-${day.day}` : '';

  // 加载 / 创建进度记录
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const existing = await db.toriProgress.get(progressId);
        if (!existing) {
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
          const modulesDone = Array.from(new Set([...existing.modulesDone, currentMod]));
          const allDone = MODULE_ORDER.every((m) => modulesDone.includes(m));
          await db.toriProgress.update(progressId, {
            modulesDone,
            ...(allDone && !existing.completedAt ? { completedAt: Date.now(), output: outputResults } : {}),
          });
          // 完成贴纸落库
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
      // 切到顶部
      if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [progressId, user, outputResults, day.day]);

  return (
    <div className="diary-root diary-page" style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px 16px 40px' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <Link href="/diary" style={{ textDecoration: 'none' }}>
            <button
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-soft)',
                background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
              }}
            >
              <ArrowLeft size={14} />
              回到日记
            </button>
          </Link>
          <span className="diary-handwriting-zh diary-text-soft" style={{ fontSize: 'var(--diary-text-xs)' }}>
            DAY {day.day} · {MODULE_LABELS[currentModule]}
          </span>
        </div>

        {/* 进度点 */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24, justifyContent: 'center' }}>
          {MODULE_ORDER.map((m) => {
            const isPast = MODULE_ORDER.indexOf(m) < MODULE_ORDER.indexOf(currentModule);
            const isCurrent = m === currentModule;
            return (
              <div
                key={m}
                style={{
                  width: isCurrent ? 24 : 8,
                  height: 8,
                  borderRadius: 999,
                  background: isPast || isCurrent ? 'var(--diary-gold)' : 'var(--diary-line)',
                  transition: 'all 0.3s',
                }}
              />
            );
          })}
        </div>

        {/* 主体内容 */}
        <div className="diary-card-paper" style={{ padding: '28px 26px', minHeight: 'auto' }}>
          {/* washi tape 装饰 */}
          <span className="diary-tape diary-tape-pink" style={{ top: -8, left: 32 }} />
          <span className="diary-tape diary-tape-mint" style={{ top: -8, right: 48 }} />

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
              onComplete={() => {
                advance('recap');
                router.push('/diary');
              }}
            />
          )}
        </div>
      </div>

      {/* 悬浮的勇气胡萝卜助手 */}
      <CarrotHelper day={day} currentModule={currentModule} progress={carrotProgress} />
    </div>
  );
}
