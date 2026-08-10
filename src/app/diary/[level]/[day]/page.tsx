import type { Metadata } from 'next';
import { days as diaryDays, getDay } from '@/data/diary';
import type { ToriLevel } from '@/types/tori-diary';
import DiaryDayClientPage from './DiaryDayClientPage';

const VALID_LEVELS: ReadonlySet<ToriLevel> = new Set(['beginner', 'intermediate', 'advanced']);

export function generateStaticParams() {
  return diaryDays.map((d) => ({ level: d.level, day: String(d.day) }));
}

// 日记是付费内容 —— 用户导流到 /diary 首页即可，详情页不做 SEO 曝光
export async function generateMetadata({ params }: { params: Promise<{ level: string; day: string }> }): Promise<Metadata> {
  const { level, day } = await params;
  const dayNum = parseInt(day, 10);
  const d = VALID_LEVELS.has(level as ToriLevel) && !Number.isNaN(dayNum) ? getDay(level as ToriLevel, dayNum) : undefined;
  return {
    title: d ? `Day ${d.day} · ${d.title}｜韩语日记` : '韩语日记',
    robots: { index: false, follow: false },
    alternates: { canonical: '/diary' },
  };
}

interface Props {
  [k: string]: unknown;
  params: Promise<{ level: string; day: string }>;
}

export default async function Page({ params }: Props) {
  return <DiaryDayClientPage params={params} />;
}
