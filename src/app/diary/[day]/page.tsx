'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { getDay } from '@/data/diary';
import { useAuth } from '@/components/AuthProvider';
import { DiaryDayClient } from '@/components/diary/DiaryDayClient';
import '@/components/diary/diary.css';

interface Props {
  params: Promise<{ day: string }>;
}

export default function DiaryDayPage({ params }: Props) {
  const { day: dayStr } = use(params);
  const router = useRouter();
  const { user, loading } = useAuth();

  const dayNum = parseInt(dayStr, 10);

  // 非管理员一律重定向回列表（在列表页弹"本周开放"）
  useEffect(() => {
    if (loading) return;
    if (!user) return; // 未登录交给上层处理
    if (user.role !== 'admin') {
      router.replace('/diary');
    }
  }, [user, loading, router]);

  if (Number.isNaN(dayNum) || dayNum < 1 || dayNum > 30) {
    notFound();
  }

  // 加载中或非管理员 → 不渲染内容
  if (loading || !user || user.role !== 'admin') {
    return (
      <div className="diary-root diary-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="diary-handwriting-zh" style={{ color: 'var(--diary-ink-soft)' }}>加载中…</div>
      </div>
    );
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
