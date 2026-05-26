import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/server/admin-guard';
import type { ContentResponse } from '@/types/admin';

function randAround(base: number, pct: number) {
  return Math.round(base * (1 + (Math.random() - 0.5) * pct * 2));
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const { searchParams } = new URL(request.url);
  const feedbackStatus = searchParams.get('feedbackStatus') || 'pending';

  const moduleStats = [
    { module: '主题词包', icon: '📦', totalItems: 14, lastUpdated: Date.now() - randAround(3, 80) * 86400000 },
    { module: '分级词表', icon: '📊', totalItems: 143, lastUpdated: Date.now() - randAround(1, 80) * 86400000 },
    { module: '情景词典', icon: '🔍', totalItems: 143, lastUpdated: Date.now() - randAround(2, 80) * 86400000 },
    { module: '跟读素材', icon: '🎤', totalItems: randAround(85, 20), lastUpdated: Date.now() - randAround(5, 80) * 86400000 },
    { module: '常用表达', icon: '💬', totalItems: 198, lastUpdated: Date.now() - randAround(4, 80) * 86400000 },
    { module: '视频素材', icon: '🎬', totalItems: randAround(42, 20), lastUpdated: Date.now() - randAround(7, 80) * 86400000 },
  ];

  const feedbackTypes = ['word_error', 'translation_error', 'audio_error', 'other'] as const;
  const sampleUsers = ['韩语喵', '小星星', '바다', '樱花兔', '열공모드', '初雪'];
  const sampleContents = [
    'emotion-01 开心', 'food-03 泡菜', 'travel-05 预订', 'kculture-02 아이돌',
    'work-08 회의', 'daily-01 起床', 'shadowing-line-42', 'dictation-word-17',
  ];

  const allFeedbacks = Array.from({ length: 25 }, (_, i) => ({
    id: `feedback-${i + 1}`,
    userId: `user-${randAround(50, 80)}`,
    username: sampleUsers[Math.floor(Math.random() * sampleUsers.length)],
    type: feedbackTypes[Math.floor(Math.random() * feedbackTypes.length)],
    content: [
      '这个词的罗马音好像拼错了，应该是 haengbokhada 而不是 haengbokada',
      '中文翻译不太准确，这里的语境应该是"道歉"而不是"遗憾"',
      '音频发音好像用错了音高，听起来不太自然',
      '这个单词在 TOPIK 考试中应该是 3 级，不是 2 级',
      '例句中有一个错别字：应该是 "一起去" 不是 "一起起"',
      '这个词的emoji不太合适，换个更贴切的吧',
    ][Math.floor(Math.random() * 6)],
    targetEntryId: `entry-${randAround(100, 90)}`,
    targetEntryName: sampleContents[Math.floor(Math.random() * sampleContents.length)],
    status: (i < 8 ? 'pending' : i < 16 ? 'resolved' : 'ignored') as 'pending' | 'resolved' | 'ignored',
    createdAt: Date.now() - randAround(14, 90) * 86400000,
    ...(i >= 8 ? { resolvedAt: Date.now() - randAround(7, 90) * 86400000, resolvedBy: 'admin' } : {}),
  }));

  const filtered = allFeedbacks.filter((f) => f.status === feedbackStatus);
  const total = feedbackStatus === 'all' ? allFeedbacks.length : filtered.length;

  const response: ContentResponse = {
    moduleStats,
    feedbacks: feedbackStatus === 'all' ? allFeedbacks : filtered,
    total,
  };

  return NextResponse.json(response);
}
