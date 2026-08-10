'use client';

import { useEffect, useState } from 'react';
import { readSpeakingHistory } from '@/lib/practice/aggregate';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '../../app/practice/practice-flow.css';

const MODES: { key: 'listening'|'dictation'|'writing'|'typing'; tone: string; label: string }[] = [
  { key: 'listening', tone: 'mint',   label: 'prac.mode_listening' },
  { key: 'dictation', tone: 'peach',  label: 'prac.mode_dictation' },
  { key: 'writing',   tone: 'purple', label: 'prac.mode_writing' },
  { key: 'typing',    tone: 'pink',   label: 'prac.mode_typing' },
];

interface PracticeNextHintProps {
  [k: string]: unknown;
  /** 当前正在练的模式 */
  current: 'listening' | 'dictation' | 'writing' | 'typing';
  /** 是否假定当前模式今日已完成(结算屏用,避免首帧闪) */
  assumeCurrentDone?: boolean;
}

type DoneMap = { listening: boolean; dictation: boolean; writing: boolean; typing: boolean };

export function PracticeNextHint({ current, assumeCurrentDone = false }: PracticeNextHintProps) {
  const { user } = useAuth();
  const { lang } = useLang();
  const [done, setDone] = useState<DoneMap | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user?.id) { if (!cancelled) setDone({ listening: false, dictation: false, writing: false, typing: false }); return; }
      const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
      const ts = todayStart.getTime();
      // 只查每张表的今日第一条,不读全量
      const [dictList, writeList, typingList, typingMasteryList] = await Promise.all([
        db.dictationRecords.filter(r => r.date >= ts).catch(() => [] as { date: number }[]),
        db.writingHistory.filter(w => w.createdAt >= ts).catch(() => [] as { createdAt: number }[]),
        db.typingPackProgress.filter(r => r.updatedAt >= ts).catch(() => [] as { updatedAt: number }[]),
        db.typingMastery.filter(m => m.updatedAt >= ts).catch(() => [] as { updatedAt: number }[]),
      ]);
      const spDoneToday = readSpeakingHistory(user.id).some(s => s.timestamp >= ts);
      if (cancelled) return;
      setDone({
        listening: spDoneToday,
        dictation: dictList.length > 0,
        writing: writeList.length > 0,
        typing: typingList.length > 0 || typingMasteryList.length > 0,
      });
    })();
    return () => { cancelled = true; };
  }, [user?.id]);

  return (
    <div className="pr-next-hint" role="status" aria-label={t('prac.hint_progress_aria', lang)}>
      <span className="pr-next-hint-title">{t('prac.hint_today', lang)}</span>
      <div className="pr-next-hint-dots">
        {MODES.map(m => {
          const dbDone = done ? done[m.key] : false;
          const isDone = dbDone || (assumeCurrentDone && m.key === current);
          const isCurrent = m.key === current;
          return (
            <div
              key={m.key}
              className={`pr-next-hint-item ${m.tone}${isDone ? ' done' : ''}${isCurrent ? ' current' : ''}`}
            >
              <span className="pr-next-hint-dot" aria-hidden />
              <span className="pr-next-hint-label">{t(m.label, lang)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
