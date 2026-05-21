type TranscriptItem = {
  text: string;
  start: number;
  dur: number;
};

/**
 * Fetch YouTube Korean subtitles.
 * Tries manual → auto-generated → any available Korean track.
 */
export async function fetchYouTubeTranscript(videoId: string): Promise<TranscriptItem[]> {
  const { YoutubeTranscript } = await import('youtube-transcript');

  const errors: string[] = [];

  // Attempt 1: Korean manual captions
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'ko' });
    if (transcript.length > 0) {
      return transcript.map((item: any) => ({
        text: item.text,
        start: item.offset / 1000,
        dur: item.duration / 1000,
      }));
    }
  } catch (e: any) {
    errors.push(`manual ko: ${e.message}`);
  }

  // Attempt 2: Try without lang specification (may return auto-generated)
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    if (transcript && transcript.length > 0) {
      // Check if the transcript language might be Korean
      const sample = transcript.slice(0, 3).map((t: any) => t.text).join(' ');
      const koreanCharCount = (sample.match(/[가-힣]/g) || []).length;
      if (koreanCharCount > 5 || !/[a-zA-Z]{10,}/.test(sample)) {
        return transcript.map((item: any) => ({
          text: item.text,
          start: item.offset / 1000,
          dur: item.duration / 1000,
        }));
      }
    }
  } catch (e: any) {
    errors.push(`auto: ${e.message}`);
  }

  throw new Error(errors.length > 0 ? errors.join('; ') : '该视频没有可用的字幕');
}

/**
 * Extract video ID from various YouTube URL formats.
 */
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Get video info from YouTube oEmbed API (no key needed).
 */
export async function getVideoInfo(videoId: string) {
  const response = await fetch(
    `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
  );
  if (!response.ok) throw new Error('无法获取视频信息');
  const data = await response.json();
  return {
    title: data.title,
    thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    channelName: data.author_name,
  };
}
