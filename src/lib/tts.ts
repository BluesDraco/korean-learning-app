import { classifyContent, resolveAudioPolicy, sanitizeTTSText, type AudioContentType } from '@/lib/audio/audioPolicy';
import { getStaticAudio } from '@/lib/audio/audioRegistry';

let currentAudio: HTMLAudioElement | null = null;
let qwenFailedUntil = 0;
let speakSeq = 0;

const TTS_SPEED_KEY = 'tts-speed';

// In-memory audio cache: key = "rate:cleanedText", value = blob URL + timestamp
const audioCache = new Map<string, { url: string; ts: number }>();
const CACHE_MAX = 80;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function pruneCache() {
  const now = Date.now();
  for (const [k, v] of audioCache) {
    if (now - v.ts > CACHE_TTL) {
      URL.revokeObjectURL(v.url);
      audioCache.delete(k);
    }
  }
}
// Prune every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(pruneCache, 5 * 60 * 1000);
}

export function getSpeechRate(): number {
  if (typeof window === 'undefined') return 0.8;
  try {
    const v = localStorage.getItem(TTS_SPEED_KEY);
    return v ? parseFloat(v) : 0.8;
  } catch {
    return 0.8;
  }
}

export function setSpeechRate(rate: number): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TTS_SPEED_KEY, String(rate));
  } catch { /* ignore */ }
}

/** Browser-only TTS — bypasses Qwen entirely. Use for practice/exam modes where quality isn't critical. */
export async function speakBrowser(text: string, rate?: number): Promise<void> {
  if (typeof window === 'undefined') return;
  const cleaned = cleanText(text);
  if (!cleaned) return;
  cancelSpeech();
  await speakViaBrowser(cleaned, rate ?? getSpeechRate());
}

export function cancelSpeech() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.onended = null;
    currentAudio.src = '';
    currentAudio = null;
  }
  window.speechSynthesis?.cancel();
  speakSeq++; // invalidate in-flight Qwen requests
}

function cleanText(text: string): string {
  return text
    .replace(/🔊/g, '')
    .replace(/[●◉○◈◇◆▸►▻]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Detect if text is jamo, minimal pair, or very short Korean that Qwen can't handle reliably.
// These must use browser speechSynthesis — NEVER generative AI TTS.
function isShortKoreanText(text: string): boolean {
  const cleaned = text.replace(/\s/g, '');
  if (!cleaned) return false;
  // Single jamo character (consonant or vowel) — Qwen hallucinates on these
  if (/^[ㄱ-ㅎㅏ-ㅣ]$/.test(cleaned)) return true;
  // 1-3 Hangul syllables — short words that Qwen may over-extend
  if (/^[가-힣]{1,3}$/.test(cleaned)) return true;
  // Minimal pair patterns like "으 vs 우", "어 vs 오"
  if (/vs/i.test(text)) return true;
  // Text with "/" separator — likely comparative phonetics like "ㄱ/ㅋ/ㄲ"
  if (/\//.test(text)) return true;
  // Text containing single jamo mixed with separators
  if (/[ㄱ-ㅎㅏ-ㅣ]/.test(cleaned) && cleaned.length <= 6) return true;
  return false;
}

// Detect if text is primarily Chinese (not Korean)
function isChineseText(text: string): boolean {
  const cleaned = text.replace(/\s/g, '');
  if (!cleaned) return false;
  let hangul = 0;
  let hanzi = 0;
  for (const ch of cleaned) {
    const code = ch.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7AF) hangul++;       // Hangul
    else if (code >= 0x4E00 && code <= 0x9FFF) hanzi++;    // CJK
  }
  // If more Chinese characters than Korean, it's Chinese text
  return hanzi > 0 && hanzi > hangul;
}

export async function speak(
  text: string,
  explicitRate?: number,
  onEnd?: () => void,
): Promise<void> {
  const rate = explicitRate ?? getSpeechRate();
  if (typeof window === 'undefined') {
    onEnd?.();
    return;
  }
  const cleaned = cleanText(text);
  if (!cleaned) {
    onEnd?.();
    return;
  }

  cancelSpeech();
  const seq = ++speakSeq;

  // Classify content and resolve audio policy
  const contentType: AudioContentType = classifyContent(cleaned);
  const policy = resolveAudioPolicy(contentType);

  // For static-only types (jamo, hangul letter, minimal pair),
  // prefer fixed static audio; if not available, fall back to browser TTS
  if (policy.source === 'static_audio') {
    const audio = getStaticAudio(cleaned);
    if (audio) {
      try { await playUrl(audio.url, seq); } catch { /* silent */ }
      onEnd?.();
      return;
    }
    // No static audio — fall back to browser TTS rather than silent failure
    try { await speakViaBrowser(sanitizeTTSText(cleaned), rate); } catch { /* silent */ }
    onEnd?.();
    return;
  }

  // Check cache first (for Qwen-allowed content types)
  const cacheKey = `${rate}:${cleaned}`;
  const cached = audioCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    try {
      await playUrl(cached.url, seq);
      cached.ts = Date.now(); // bump
      onEnd?.();
      return;
    } catch {
      audioCache.delete(cacheKey);
    }
  }

  // If text is Chinese, skip Qwen and go straight to browser TTS
  if (isChineseText(cleaned)) {
    try {
      await speakViaBrowser(sanitizeTTSText(cleaned), rate);
      onEnd?.();
    } catch {
      // both failed
    }
    return;
  }

  // Qwen3-TTS (阿里云 — best Korean pronunciation)
  const qwenAvailable = Date.now() > qwenFailedUntil;
  if (qwenAvailable) {
    try {
      const blobUrl = await speakViaQwen(cleaned, rate, seq);
      if (blobUrl) {
        // Cache successful result
        if (audioCache.size >= CACHE_MAX) {
          const first = audioCache.keys().next().value;
          if (first) {
            const old = audioCache.get(first);
            if (old) URL.revokeObjectURL(old.url);
            audioCache.delete(first);
          }
        }
        audioCache.set(cacheKey, { url: blobUrl, ts: Date.now() });
        onEnd?.();
        return;
      }
    } catch {
      // Blacklist Qwen for 5 minutes on failure
      qwenFailedUntil = Date.now() + 5 * 60 * 1000;
    }
  }

  // Browser speechSynthesis fallback
  try {
    await speakViaBrowser(sanitizeTTSText(cleaned), rate);
  } catch {
    // both failed, give up silently
  }
  onEnd?.();
}

async function speakViaBrowser(text: string, rate: number): Promise<void> {
  const synth = window.speechSynthesis;
  if (!synth) throw new Error('speechSynthesis not available');

  synth.cancel();

  const lang = isChineseText(text) ? 'zh-CN' : 'ko-KR';

  await new Promise<void>((resolve) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = rate;
    utter.onend = () => resolve();
    utter.onerror = () => resolve();
    synth.speak(utter);
  });
}

async function speakViaQwen(text: string, rate: number, seq: number): Promise<string | null> {
  const res = await fetch('/api/tts/qwen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, speechRate: rate }),
  });
  if (!res.ok) throw new Error('Qwen failed');

  // Check if this request is still valid
  if (seq !== speakSeq) return null;

  const blob = await res.blob();
  if (seq !== speakSeq) return null;

  const url = URL.createObjectURL(blob);
  await playUrl(url, seq);
  return url;
}

async function playUrl(url: string, _seq: number): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => {
      if (currentAudio === audio) currentAudio = null;
      resolve();
    };
    audio.onerror = () => {
      if (currentAudio === audio) currentAudio = null;
      reject(new Error('playback failed'));
    };
    audio.play().catch((e: any) => {
      if (currentAudio === audio) currentAudio = null;
      if (e.name === 'AbortError') {
        resolve();
      } else {
        reject(e);
      }
    });
  });
}
