// Audio policy layer — all pronunciation requests are classified here.
// Prevents generative AI TTS from being used on jamo / hangul letters / minimal pairs.

import { normalizeKoreanPronunciation } from '@/lib/audio/koreanPronunciation';

export type AudioContentType =
  | 'hangul_letter'
  | 'jamo'
  | 'minimal_pair'
  | 'short_word'
  | 'word'
  | 'sentence'
  | 'paragraph'
  | 'video_original'
  | 'kpop_original';

export type AudioSource = 'browser_tts' | 'cached_qwen_tts' | 'static_audio' | 'original_video' | 'original_music';

export interface AudioPolicyResult {
  source: AudioSource;
  shouldCache: boolean;
  reason: string;
}

/** Content types that must NEVER use generative AI TTS */
const STATIC_ONLY_TYPES: Set<AudioContentType> = new Set([
  'hangul_letter',
  'jamo',
  // minimal_pair removed — NLS handles these fine with sanitized text
]);

const QWEN_ALLOWED_TYPES: Set<AudioContentType> = new Set([
  'minimal_pair',
  'word',
  'sentence',
  'paragraph',
]);

const ORIGINAL_ONLY_TYPES: Set<AudioContentType> = new Set([
  'video_original',
  'kpop_original',
]);

/** Classify text into a content type based on heuristics */
export function classifyContent(text: string, hint?: AudioContentType): AudioContentType {
  if (hint) return hint;

  const cleaned = text.replace(/\s/g, '');

  // Single jamo
  if (/^[ㄱ-ㅎㅏ-ㅣ]$/.test(cleaned)) return 'jamo';

  // Minimal pair pattern: "으 vs 우", "어 vs 오"
  if (/vs/i.test(text) || /\//.test(text)) return 'minimal_pair';

  // Hangul letter range — Korean syllable blocks
  const hangulOnly = /^[가-힣]+$/.test(cleaned);

  if (hangulOnly) {
    if (cleaned.length <= 2) return 'short_word';
    if (cleaned.length <= 6) return 'word';
    return 'sentence';
  }

  // Mixed or long text
  if (cleaned.length <= 3) return 'short_word';
  if (cleaned.length <= 30) return 'sentence';
  return 'paragraph';
}

/** Determine the audio source policy for a given content type */
export function resolveAudioPolicy(type: AudioContentType): AudioPolicyResult {
  if (STATIC_ONLY_TYPES.has(type)) {
    return { source: 'static_audio', shouldCache: false, reason: '基础发音内容，必须使用固定标准音频，不可使用任何形式的 TTS' };
  }
  if (QWEN_ALLOWED_TYPES.has(type)) {
    return { source: 'cached_qwen_tts', shouldCache: true, reason: '可缓存 Qwen TTS，失败回退浏览器' };
  }
  if (ORIGINAL_ONLY_TYPES.has(type)) {
    return { source: 'original_video', shouldCache: false, reason: '必须使用原视频/原曲音频' };
  }
  // Default: allow Qwen with cache
  return { source: 'cached_qwen_tts', shouldCache: true, reason: '默认策略：Qwen TTS + 浏览器回退' };
}

/** Sanitize text before passing to browser TTS. Strips markers that confuse TTS. */
export function sanitizeTTSText(text: string, hint?: AudioContentType): string {
  const cleaned = text
    .replace(/🔊/g, '')
    .replace(/[●◉○◈◇◆▸►▻]/g, '')
    .replace(/\bvs\.?\b/gi, ',')
    .replace(/\s*\/\s*/g, ', ')
    .replace(/,+/g, ',')
    .replace(/\s{2,}/g, ' ')
    .replace(/^,\s*/, '')
    .replace(/,\s*$/, '')
    .trim();
  return normalizeKoreanPronunciation(cleaned);
}
