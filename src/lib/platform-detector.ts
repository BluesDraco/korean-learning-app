/**
 * Platform detection — identifies video URL platform and extracts platform ID.
 */
export type VideoPlatform = 'bilibili' | 'youtube' | 'unknown';

export interface DetectedVideo {
  platform: VideoPlatform;
  platformId: string;
  embedUrl: string;
}

/**
 * Extract B站 BV ID from URL.
 * Supports: bilibili.com/video/BV..., b23.tv/..., bilibili.com/video/av...
 */
export function extractBilibiliId(url: string): string | null {
  // BV号格式: BV1xx411c7mD
  const bvMatch = url.match(/BV[a-zA-Z0-9]{10,12}/);
  if (bvMatch) return bvMatch[0];

  // av号格式: av123456
  const avMatch = url.match(/av(\d+)/i);
  if (avMatch) return `av${avMatch[1]}`;

  return null;
}

/**
 * Extract YouTube video ID from URL.
 */
export function extractYouTubeId(url: string): string | null {
  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // youtu.be/VIDEO_ID
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // m.youtube.com
  const mMatch = url.match(/m\.youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/);
  if (mMatch) return mMatch[1];

  return null;
}

/**
 * Detect platform from a video URL and extract ID + embed URL.
 */
export function detectPlatform(url: string): DetectedVideo {
  const cleanUrl = url.trim();

  const bvId = extractBilibiliId(cleanUrl);
  if (bvId) {
    return {
      platform: 'bilibili',
      platformId: bvId,
      embedUrl: `https://player.bilibili.com/player.html?bvid=${bvId}&page=1&high_quality=1&autoplay=0`,
    };
  }

  const ytId = extractYouTubeId(cleanUrl);
  if (ytId) {
    return {
      platform: 'youtube',
      platformId: ytId,
      embedUrl: `https://www.youtube.com/embed/${ytId}?enablejsapi=1&controls=1&modestbranding=1&rel=0`,
    };
  }

  return { platform: 'unknown', platformId: '', embedUrl: '' };
}
