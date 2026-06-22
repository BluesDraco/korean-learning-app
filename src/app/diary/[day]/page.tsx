'use client';

import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDay } from '@/data/diary';
import { DiaryDayClient } from '@/components/diary/DiaryDayClient';
import '@/components/diary/diary.css';

interface Props {
  params: Promise<{ day: string }>;
}

export default function DiaryDayPage({ params }: Props) {
  const { day: dayStr } = use(params);
  const dayNum = parseInt(dayStr, 10);

  if (Number.isNaN(dayNum) || dayNum < 1 || dayNum > 30) {
    notFound();
  }

  const day = getDay(dayNum);

  if (!day) {
    return (
      <div className="diary-root diary-page" style={{ minHeight: '100vh' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🐰</div>
          <h1 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 8 }}>
            Day {dayNum} 还没写好
          </h1>
          <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink-soft)', marginBottom: 24 }}>
            兔莉正在赶稿…先回到上一天看看吧。
          </p>
          <Link href="/diary" style={{ textDecoration: 'none' }}>
            <button className="diary-btn diary-btn-primary">回到日记</button>
          </Link>
        </div>
      </div>
    );
  }

  return <DiaryDayClient day={day} />;
}
