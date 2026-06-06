// 韩娱热点阅读 — Naver News 采集 + DeepSeek 翻译拆解 + 逐句精读
// Data flow: crawl-hot-posts.mjs → enrich-hot-posts.mjs → kpopHotPosts.ts → koreanHotPosts.ts
// Content gate: readingStatus.readingReady + publishStatus='published'

import { kpopHotReadings } from './kpopHotPosts';
import type { KoreanHotReading } from '@/types';

export type { KoreanHotReading };

// ── Content gate ──

function getActivePosts(): KoreanHotReading[] {
  return (kpopHotReadings || []).filter(
    (p) =>
      p.readingStatus?.readingReady === true &&
      p.publishStatus === 'published'
  );
}

export function getHotPosts(): KoreanHotReading[] {
  return getActivePosts()
    .sort((a, b) => b.fetchedAt - a.fetchedAt);
}

export function getHotPostById(id: string): KoreanHotReading | undefined {
  return getActivePosts().find((p) => p.id === id);
}
