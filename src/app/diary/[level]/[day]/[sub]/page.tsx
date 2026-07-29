import type { Metadata } from 'next';
import { getDay } from '@/data/diary';
import type { ToriLevel } from '@/types/tori-diary';
import DiarySubQuestClient from './DiarySubQuestClient';

const VALID_LEVELS: ReadonlySet<ToriLevel> = new Set(['beginner', 'intermediate', 'advanced']);

const SUB_LABEL: Record<string, string> = {
  '1': '词汇预习',
  '2': '听力速训',
  '3': '语法专攻',
  '4': '场景对话',
  '5': '综合关卡',
};

export async function generateMetadata({ params }: { params: Promise<{ level: string; day: string; sub: string }> }): Promise<Metadata> {
  const { level, day, sub } = await params;
  if (!VALID_LEVELS.has(level as ToriLevel)) return {};
  const dayNum = parseInt(day, 10);
  if (Number.isNaN(dayNum)) return {};
  const d = getDay(level as ToriLevel, dayNum);
  if (!d) return {};
  const subLabel = SUB_LABEL[sub] ?? '子任务';
  return {
    title: `Day ${d.day} ${subLabel} · ${d.title}｜韩语日记`,
    description: `${d.subtitle}｜Day ${d.day} 的${subLabel}训练｜兔莉的韩语日记`,
    alternates: { canonical: `/diary/${level}/${day}/${sub}` },
    robots: { index: false, follow: true },
  };
}

interface Props {
  params: Promise<{ level: string; day: string; sub: string }>;
}

export default function Page({ params }: Props) {
  return <DiarySubQuestClient params={params} />;
}
