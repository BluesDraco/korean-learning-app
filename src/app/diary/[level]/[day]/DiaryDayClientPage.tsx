'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { getDay, TOTAL_DAYS_PER_LEVEL } from '@/data/diary';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/db';
import { DiaryDayClient } from '@/components/diary/DiaryDayClient';
import type { ToriLevel } from '@/types/tori-diary';
import { useToast } from '@/hooks/useToast';
import { useMembership } from '@/lib/useMembership';
import { canAccessDiaryDay, isPaidTier, canPurchaseMembership } from '@/lib/membership-benefits';
import '@/components/diary/diary.css';
import { QuickHomeButton } from '@/components/QuickHomeButton';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const VALID_LEVELS = new Set<ToriLevel>(['beginner', 'intermediate', 'advanced']);
const MAX_DEVELOPED_DAY = 30;

interface Props {
  [k: string]: unknown;
  params: Promise<{ level: string; day: string }>;
}

export default function DiaryDayClientPage({ params }: Props) {
  const { level: levelStr, day: dayStr } = use(params);
  const router = useRouter();
  const { user, loading } = useAuth();
  const { showToast } = useToast();
  const { lang } = useLang();
  const { tier, matrix, loading: memLoading } = useMembership();
  const [accessChecked, setAccessChecked] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

  const level = VALID_LEVELS.has(levelStr as ToriLevel) ? (levelStr as ToriLevel) : null;
  const dayNum = parseInt(dayStr, 10);

  useEffect(() => {
    if (loading || !level || Number.isNaN(dayNum)) return;
    // 记住当前 level，让列表页返回时保留 tab
    sessionStorage.setItem('diaryActiveLevel', level);
    // 未登录：跳登录页并带 redirect，避免直链永远转圈
    if (!user) {
      showToast(t('diary.dcp.login_required', lang), 'info');
      router.replace(`/auth/login?redirect=/diary/${levelStr}/${dayStr}`);
      return;
    }
    // admin 全部放行
    if (user.role === 'admin') {
      setAccessGranted(true);
      setAccessChecked(true);
      return;
    }
    (async () => {
      try {
        const rows = await db.toriProgress.toArray();
        const userRows = rows.filter((r) => r.userId === user.id && (r.level ?? 'beginner') === level);
        // 完成判定必须与列表页 (diary/page.tsx) 一致：completedAt 存在即完成；
        // 磁盘满等故障可能漏写 completedAt，modulesDone ≥6 也视为完成。
        // 否则列表页算出的 currentDay 比详情页大，点"当前 Day"会被踢回列表。
        const completedDays = userRows
          .filter((r) => r.completedAt || (Array.isArray(r.modulesDone) ? r.modulesDone.length : 0) >= 6)
          .map((r) => r.day);
        const maxCompleted = completedDays.length > 0 ? Math.max(...completedDays) : 0;

        // 已完成的 Day 永远可重看
        if (completedDays.includes(dayNum)) {
          setAccessGranted(true);
          setAccessChecked(true);
          return;
        }
        // 当前 Day = maxCompleted + 1（1 起步）
        const currentDay = Math.min(maxCompleted + 1, TOTAL_DAYS_PER_LEVEL) || 1;
        // 拆掉次日锁：完成 Day N 后立刻可以开始 Day N+1，不再等次日 0 点
        if (dayNum === currentDay) {
          setAccessGranted(true);
          setAccessChecked(true);
          return;
        }
        // 不允许 → 回首页
        router.replace('/diary');
      } catch {
        // DB 异常时不放行 — 防止 cookie 异常 / 网络抖动让用户跳过解锁条件
        // 进入 day 30 等未解锁内容。返回首页让用户重试。
        router.replace('/diary');
      }
    })();
  }, [user, loading, router, level, dayNum, levelStr, dayStr]);

  if (!level || Number.isNaN(dayNum) || dayNum < 1 || dayNum > TOTAL_DAYS_PER_LEVEL) {
    notFound();
  }

  // 超出已开放范围（在 access check 前判断，避免无限 loading）
  if (!loading && user && dayNum > MAX_DEVELOPED_DAY && user.role !== 'admin') {
    return (
      <div className="diary-root diary-page" style={{ minHeight: '100vh' }}>
        <QuickHomeButton />
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🚧</div>
          <h1 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 8 }}>{t('diary.dcp.coming_soon_title', lang)}</h1>
          <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink-soft)', marginBottom: 24 }}>
            {t('diary.dcp.coming_soon_desc', lang)}
          </p>
          <Link href="/diary" style={{ textDecoration: 'none' }}>
            <button className="diary-btn diary-btn-primary">{t('diary.dcp.back', lang)}</button>
          </Link>
        </div>
      </div>
    );
  }

  // 会员内容墙：免费档仅前 N 天（默认 7）。admin 与付费档放行。
  if (!loading && !memLoading && user && user.role !== 'admin'
      && !isPaidTier(tier) && !canAccessDiaryDay(matrix, tier, dayNum)) {
    return (
      <div className="diary-root diary-page" style={{ minHeight: '100vh' }}>
        <QuickHomeButton />
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>👑</div>
          <h1 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 8 }}>{t('diary.dcp.member_wall_title', lang, { n: dayNum })}</h1>
          <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink-soft)', marginBottom: 24 }}>
            {t('diary.dcp.member_wall_desc', lang)}
          </p>
          <button className="diary-btn diary-btn-primary" onClick={() => { if (!canPurchaseMembership()) { showToast(t('membership.coming_soon_toast', lang)); return; } router.push('/membership'); }}>
            {canPurchaseMembership() ? t('diary.dcp.unlock_all', lang) : t('membership.coming_soon', lang)}
          </button>
          <div style={{ marginTop: 12 }}>
            <Link href="/diary" style={{ textDecoration: 'none' }}>
              <button className="diary-btn">{t('diary.dcp.back', lang)}</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !user || !accessChecked || !accessGranted) {
    return (
      <div className="diary-root diary-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <QuickHomeButton />
        <div className="diary-handwriting-zh" style={{ color: 'var(--diary-ink-soft)' }}>{t('diary.dcp.loading', lang)}</div>
      </div>
    );
  }

  const day = getDay(level, dayNum);

  if (!day) {
    return (
      <div className="diary-root diary-page" style={{ minHeight: '100vh' }}>
        <QuickHomeButton />
        <div style={{ maxWidth: 480, margin: '0 auto', padding: '64px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>🐰</div>
          <h1 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 8 }}>{t('diary.dcp.not_ready_title', lang, { n: dayNum })}</h1>
          <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink-soft)', marginBottom: 24 }}>
            {t('diary.dcp.not_ready_desc', lang)}
          </p>
          <Link href="/diary" style={{ textDecoration: 'none' }}>
            <button className="diary-btn diary-btn-primary">{t('diary.dcp.back', lang)}</button>
          </Link>
        </div>
      </div>
    );
  }

  // key 绑定 level+day：切 Day 时强制重挂，避免 currentModule/modulesDone 等 state 残留错帧
  return <DiaryDayClient key={`${level}-${dayNum}`} day={day} level={level} />;
}
