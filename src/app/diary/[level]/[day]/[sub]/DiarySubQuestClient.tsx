'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/db';
import { getSubQuest } from '@/data/diary/subquests';
import { SubQuestClient } from '@/components/diary/SubQuestClient';
import ListenQuestClient from '@/components/diary/ListenQuestClient';
import GrammarQuestClient from '@/components/diary/GrammarQuestClient';
import SceneQuestClient from '@/components/diary/SceneQuestClient';
import BossQuestClient from '@/components/diary/BossQuestClient';
import type { ToriLevel } from '@/types/tori-diary';
import type { ToriSubQuestIdx, ToriSubQuestProgress } from '@/types/tori-subquest';
import '@/components/diary/diary.css';
import { QuickHomeButton } from '@/components/QuickHomeButton';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const VALID_LEVELS = new Set<ToriLevel>(['beginner', 'intermediate', 'advanced']);

interface Props {
  [k: string]: unknown;
  params: Promise<{ level: string; day: string; sub: string }>;
}

export default function DiarySubQuestClient({ params }: Props) {
  const { level: levelStr, day: dayStr, sub: subStr } = use(params);
  const router = useRouter();
  const { lang } = useLang();
  const { user, loading } = useAuth();

  const level = VALID_LEVELS.has(levelStr as ToriLevel) ? (levelStr as ToriLevel) : null;
  const dayNum = parseInt(dayStr, 10);
  const subNum = parseInt(subStr, 10);
  const invalidParams = !level || Number.isNaN(dayNum) || Number.isNaN(subNum) || subNum < 1 || subNum > 5 || dayNum < 1 || dayNum > 90;

  const [accessChecked, setAccessChecked] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    if (invalidParams) return;
    if (loading || !level || Number.isNaN(dayNum) || Number.isNaN(subNum)) return;
    // 记住当前 level，让列表页返回时保留 tab
    sessionStorage.setItem('diaryActiveLevel', level);
    let cancelled = false;
    if (!user) {
      router.replace(`/auth/login?redirect=/diary/${levelStr}/${dayStr}/${subStr}`);
      return;
    }
    if (user.role === 'admin') {
      setAccessGranted(true);
      setAccessChecked(true);
      return;
    }

    (async () => {
      try {
        // 1) 主 Day 必须完成
        const rows = await db.toriProgress.toArray();
        if (cancelled) return;
        const dayDone = rows.some((r) => {
          if (r.userId !== user.id) return false;
          const lvl = (r.level ?? 'beginner') as ToriLevel;
          if (lvl !== level || r.day !== dayNum) return false;
          const doneModules = Array.isArray(r.modulesDone) ? r.modulesDone.length : 0;
          return !!r.completedAt || doneModules >= 6;
        });
        if (!dayDone) {
          router.replace(`/diary/${level}/${dayNum}`);
          return;
        }

        // 2) 前置子关卡门控
        const subRows = await db.toriSubQuestProgress.toArray() as ToriSubQuestProgress[];
        if (cancelled) return;
        const starsFor = (i: number): number => {
          const row = subRows.find((r) => r.userId === user.id && (r.level ?? 'beginner') === level && r.day === dayNum && r.idx === i);
          return row?.stars ?? 0;
        };
        if (subNum === 5) {
          // Boss 需前 4 关都 ≥1 星
          if ([1, 2, 3, 4].some((i) => starsFor(i) < 1)) {
            router.replace('/diary');
            return;
          }
        } else if (subNum >= 2 && subNum <= 4) {
          if (starsFor(subNum - 1) < 1) {
            router.replace('/diary');
            return;
          }
        }

        if (cancelled) return;
        setAccessGranted(true);
      } catch {
        if (cancelled) return;
        router.replace('/diary');
      } finally {
        if (!cancelled) setAccessChecked(true);
      }
    })();
    return () => { cancelled = true; };
  }, [user, loading, router, level, dayNum, subNum, levelStr, dayStr, subStr, invalidParams]);

  if (invalidParams) {
    notFound();
  }

  if (loading || !user || !accessChecked || !accessGranted) {
    return (
      <div className="diary-root diary-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <QuickHomeButton />
        <div className="diary-handwriting-zh" style={{ color: 'var(--diary-ink-soft)' }}>{t('diary.dsq.loading', lang)}</div>
      </div>
    );
  }

  const data = getSubQuest(level, dayNum, subNum as ToriSubQuestIdx);
  if (!data) {
    return (
      <div className="diary-root diary-page" style={{ minHeight: '100vh' }}>
        <QuickHomeButton />
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🚧</div>
          <h1 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 8 }}>{t('diary.dsq.wip_title', lang)}</h1>
          <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink-soft)', marginBottom: 24 }}>
            {t('diary.dsq.wip_desc', lang, { n: dayNum })}
          </p>
          <Link href="/diary" style={{ textDecoration: 'none' }}>
            <button className="diary-btn diary-btn-primary">{t('diary.dsq.back', lang)}</button>
          </Link>
        </div>
      </div>
    );
  }

  if (data.kind === 'vocab') return <SubQuestClient data={data} level={level} day={dayNum} />;
  if (data.kind === 'listen') return <ListenQuestClient data={data} />;
  if (data.kind === 'grammar') return <GrammarQuestClient data={data} />;
  if (data.kind === 'scene') return <SceneQuestClient data={data} />;
  if (data.kind === 'boss') return <BossQuestClient data={data} />;
  return null;
}
