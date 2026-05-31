import { Metadata } from 'next';
import { DiaryClient } from './DiaryClient';

interface DiaryData {
  nickname: string;
  level: number;
  xp: number;
  streak: number;
  longestStreak: number;
  createdAt: number;
  isAmbassador: boolean;
  totalWords: number;
  masteredWords: number;
  reviewCount: number;
  studyDays: number;
  chatCount: number;
  booksCount: number;
  topWords: { word: string; weight: number }[];
}

async function fetchDiary(token: string): Promise<DiaryData | null> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/diary/${token}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ token: string }> }
): Promise<Metadata> {
  const { token } = await params;
  const data = await fetchDiary(token);
  if (!data) {
    return { title: '页面不存在 - 韩语学习日记' };
  }
  return {
    title: `${data.nickname} 的学习日记 - 韩语学习日记`,
    description: `${data.nickname} 已经坚持学习 ${data.studyDays} 天，掌握了 ${data.totalWords} 个韩语单词！`,
    openGraph: {
      title: `${data.nickname}的韩语学习日记`,
      description: `已学习${data.studyDays}天 · ${data.totalWords}个单词 · 和托里一起成长`,
      type: 'website',
      images: [{ url: '/tori-og.png', width: 1080, height: 1080 }],
    },
  };
}

export default async function DiaryPage(
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const data = await fetchDiary(token);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-soft)]">
        <div className="text-center space-y-4">
          <span className="text-6xl">🐰</span>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">页面不存在或已过期</h1>
          <p className="text-sm text-[var(--text-secondary)]">托里找不到这个成长日记了</p>
        </div>
      </div>
    );
  }

  return <DiaryClient data={data} />;
}
