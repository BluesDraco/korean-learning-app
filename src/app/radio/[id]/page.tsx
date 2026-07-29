import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { getEpisodeById, getEpisodesByDay, getEpisodeSlugs, getInterviewEpisodes } from '@/lib/server/radioData';
import RadioPlayerClient from './RadioPlayerClient';

export function generateStaticParams() {
  return getEpisodeSlugs().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const ep = getEpisodeById(id);
  if (!ep) return {};
  return {
    title: `${ep.title} · ${ep.titleZh} · 동물 도시 라디오`,
    description: `${ep.titleZh} · ${ep.host} · ${ep.level}，实时字幕边听边学韩语。`,
    alternates: { canonical: `/radio/${ep.id}` },
    openGraph: {
      title: `${ep.title} · ${ep.titleZh}`,
      description: `${ep.host} · ${ep.level} · ${ep.duration}`,
      url: `${SITE_URL}/radio/${ep.id}`,
      type: 'music.song',
      locale: 'zh_CN',
      siteName: '兔莉的韩语日记',
    },
  };
}

export default async function RadioPlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ep = getEpisodeById(id);
  if (!ep) notFound();
  // 侧栏同档清单：访谈档给 10 期访谈，日播给同期 4 档（不含字幕/生词）
  const dayEpisodes =
    ep.program === 'fox-interview' ? getInterviewEpisodes() : getEpisodesByDay(ep.day);
  // key=id：上/下一首切集时强制重挂，一次性重置所有播放态(playing/current/total/
  // resumeAt/speed…)，根治"同组件复用导致上期状态残留"（播放键图标错、语速残留）。
  return <RadioPlayerClient key={ep.id} episode={ep} dayEpisodes={dayEpisodes} />;
}
