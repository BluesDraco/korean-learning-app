'use client';

import { useMemo } from 'react';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import SingingMode from '@/components/kpop/SingingMode';
import { talks, type TedxTalk } from '@/data/tedxTalks';
import { koSubs, zhSubs } from '@/data/subs';
import type { KpopTrack, KpopLine } from '@/types/kpop';

function subwayToLyric(sub: { s: number; e: number; t: string }, zh?: string): KpopLine {
  return {
    startMs: Math.round(sub.s * 1000),
    endMs: Math.round(sub.e * 1000),
    korean: sub.t,
    pronunciation: '',
    chinese: zh ?? '',
  };
}

export default function TedxPlayerPage() {
  const { id } = useParams<{ id: string }>();
  const talk: TedxTalk | undefined = useMemo(() => talks.find((t) => t.id === id), [id]);

  const lyrics: KpopLine[] = useMemo(() => {
    if (!talk) return [];
    const koLines = koSubs[talk.videoId] ?? [];
    const zhLines = zhSubs[talk.videoId] ?? null;
    return koLines.map((line, i) => subwayToLyric(line, zhLines?.[i]?.t));
  }, [talk]);

  if (!talk) { notFound(); }

  const song: KpopTrack = {
    id: talk.id,
    title: talk.title,
    artist: talk.speaker,
    album: talk.event,
    year: 2024,
    coverUrl: '',
    audioUrl: `https://torikorean-1436752408.cos.ap-hongkong.myqcloud.com/audio/tedx/${talk.videoId}.webm`,
    assetStatus: 'ready',
    sourceType: 'curated',
    level: 'intermediate',
    color: '#81b5a1',
    tags: talk.tags,
    lyrics,
  };

  return <SingingMode song={song} startIndex={0} onClose={() => window.history.back()} audioType="tedx" />;
}
