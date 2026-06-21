import { classifyContent, resolveAudioPolicy, sanitizeTTSText, type AudioContentType } from '@/lib/audio/audioPolicy';
import { getStaticAudio } from '@/lib/audio/audioRegistry';

let currentAudio: HTMLAudioElement | null = null;
let currentAudioSource: AudioBufferSourceNode | null = null;
let currentFetchController: AbortController | null = null;
let nlsFailedUntil = 0;
let speakSeq = 0;
let audioCtxUnlocked = false;

// Minimal silent MP3 (0.1s) as a data URI — used to unlock iOS audio on first gesture
const SILENT_MP3 = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAABAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAATEFN//MUZAYAAAGkAAAAAAAAA0gAAAAATEFN//MUZAkAAAGkAAAAAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';

let unlockedAudio: HTMLAudioElement | null = null;

// Unlock iOS/WeChat audio on first user gesture so async audio.play() works
export function unlockAudioContext() {
  if (audioCtxUnlocked || typeof window === 'undefined') return;
  try {
    // Unlock HTMLAudioElement for WeChat/iOS WebView
    const a = new Audio(SILENT_MP3);
    a.onended = () => { a.src = ''; };  // clear data: src so reuse check works
    a.play().catch(() => {});
    unlockedAudio = a;

    // Also unlock AudioContext for browsers that need it
    const ctx = new AudioContext();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    ctx.close();
    audioCtxUnlocked = true;
  } catch { /* ignore */ }
}

// Auto-unlock on first touchstart/click so all subsequent audio.play() calls work on iOS
if (typeof window !== 'undefined') {
  const autoUnlock = () => { unlockAudioContext(); };
  window.addEventListener('touchstart', autoUnlock, { once: true, passive: true });
  window.addEventListener('click', autoUnlock, { once: true, passive: true });
}

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

/** Word TTS — uses NLS for consistent Korean pronunciation including on iOS. */
export async function speakWord(text: string, rate?: number): Promise<void> {
  if (typeof window === 'undefined') return;
  const cleaned = cleanText(text);
  if (!cleaned) return;
  cancelSpeech();
  await speak(cleaned, rate ?? getSpeechRate());
}

/** Browser-compatible TTS — routes through speak() so NLS is used where available. */
export async function speakBrowser(text: string, rate?: number): Promise<void> {
  if (typeof window === 'undefined') return;
  const cleaned = cleanText(text);
  if (!cleaned) return;
  cancelSpeech();
  await speak(cleaned, rate ?? getSpeechRate());
}

export function cancelSpeech() {
  if (currentFetchController) {
    currentFetchController.abort();
    currentFetchController = null;
  }
  if (currentAudioSource) {
    try { currentAudioSource.stop(); } catch { /* already stopped */ }
    currentAudioSource = null;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.onended = null;
    currentAudio.src = '';
    currentAudio = null;
  }
  window.speechSynthesis?.cancel();
  speakSeq++; // invalidate in-flight NLS requests
}

function cleanText(text: string): string {
  return text
    .replace(/🔊/g, '')
    .replace(/[●◉○◈◇◆▸►▻]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Detect if text is jamo, minimal pair, or very short Korean that NLS can't handle reliably.
// These must use browser speechSynthesis — NEVER generative AI TTS.
function isShortKoreanText(text: string): boolean {
  const cleaned = text.replace(/\s/g, '');
  if (!cleaned) return false;
  // Single jamo character (consonant or vowel) — NLS hallucinates on these
  if (/^[ㄱ-ㅎㅏ-ㅣ]$/.test(cleaned)) return true;
  // Text containing jamo mixed with separators (e.g. "ㄱ/ㅋ/ㄲ")
  if (/[ㄱ-ㅎㅏ-ㅣ]/.test(cleaned)) return true;
  // Minimal pair patterns like "으 vs 우"
  if (/vs/i.test(text) || /\//.test(text)) return true;
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

  unlockAudioContext();
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

  // If static audio exists for this text, always prefer it over NLS.
  // Note: explicitRate/slowUrl are intentionally ignored here — all registered
  // entries currently use a single pre-recorded file at natural speed.
  const staticForWord = getStaticAudio(cleaned);
  if (staticForWord) {
    try { await playUrl(staticForWord.url, seq); } catch { /* silent */ }
    onEnd?.();
    return;
  }

  // Check cache first (for NLS-allowed content types)
  const cacheKey = `${rate}:${sanitizeTTSText(cleaned, undefined, true)}`;
  const cached = audioCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    try {
      await playUrl(cached.url, seq);
      cached.ts = Date.now(); // bump
      onEnd?.();
      return;
    } catch {
      audioCache.delete(cacheKey);
      // fall through to NLS re-request
    }
  }

  // If text is Chinese, skip NLS and go straight to browser TTS
  if (isChineseText(cleaned)) {
    try {
      await speakViaBrowser(sanitizeTTSText(cleaned), rate);
    } catch {
      // failed silently
    }
    onEnd?.();
    return;
  }

  // Aliyun NLS TTS (best Korean pronunciation, works on iOS/iPad)
  const nlsAvailable = Date.now() > nlsFailedUntil;
  if (nlsAvailable) {
    try {
      const blobUrl = await speakViaNls(sanitizeTTSText(cleaned, undefined, true), seq);
      if (blobUrl) {
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
      // blobUrl === null means a newer speak() call superseded this one — abort
      if (seq !== speakSeq) { onEnd?.(); return; }
    } catch (err: unknown) {
      // User cancelled (AbortError) — not an NLS failure, just exit silently
      if (err instanceof Error && err.name === 'AbortError') { onEnd?.(); return; }
      if (seq !== speakSeq) { onEnd?.(); return; }
      // NLS failed — blacklist briefly and fall through to browser TTS
      nlsFailedUntil = Date.now() + 3 * 1000;
    }
  }

  // Browser speechSynthesis fallback
  try {
    await speakViaBrowser(cleaned, rate);
  } catch {
    // both failed, give up silently
  }
  onEnd?.();
}

/** Chinese TTS via Aliyun NLS (Meimei voice), falls back to browser speechSynthesis. */
export async function speakChinese(
  text: string,
  rate?: number,
  onEnd?: () => void,
): Promise<void> {
  if (typeof window === 'undefined') { onEnd?.(); return; }
  const cleaned = cleanText(text);
  if (!cleaned) { onEnd?.(); return; }

  const seq = speakSeq;

  try {
    const controller = new AbortController();
    currentFetchController = controller;
    let res: Response;
    try {
      res = await fetch('/api/tts/aliyun', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleaned, voice: 'zhiyue' }),
        signal: controller.signal,
      });
    } finally {
      if (currentFetchController === controller) currentFetchController = null;
    }
    if (seq !== speakSeq) { onEnd?.(); return; }
    if (res.ok) {
      const blob = await res.blob();
      if (seq !== speakSeq) { onEnd?.(); return; }
      const url = URL.createObjectURL(blob);
      try {
        await playUrlViaElement(url, seq);
      } finally {
        URL.revokeObjectURL(url);
      }
      if (seq !== speakSeq) return;
      onEnd?.();
      return;
    }
  } catch { /* fall through to browser TTS */ }

  if (seq !== speakSeq) { onEnd?.(); return; }
  // Browser fallback
  try {
    await speakViaBrowser(sanitizeTTSText(cleaned), rate ?? getSpeechRate());
  } catch { /* ignore */ }
  if (seq === speakSeq) onEnd?.();
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

    // Prefer a native voice for the target language so we don't fall through to
    // the system default (often zh-CN on Chinese devices), which mispronounces Korean.
    const voices = synth.getVoices();
    if (voices.length > 0) {
      const exact = voices.find((v) => v.lang === lang);
      const fallback = lang === 'zh-CN'
        ? voices.find((v) => v.lang === 'zh-CN' || v.lang === 'zh_CN')
        : voices.find((v) => v.lang.startsWith('ko'));
      const match = exact ?? fallback;
      if (match) utter.voice = match;
    }

    utter.onend = () => resolve();
    utter.onerror = () => resolve();
    synth.speak(utter);
  });
}

async function speakViaNls(text: string, seq: number): Promise<string | null> {
  const controller = new AbortController();
  currentFetchController = controller;
  let res: Response;
  try {
    res = await fetch('/api/tts/aliyun', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: controller.signal,
    });
  } finally {
    if (currentFetchController === controller) currentFetchController = null;
  }
  if (!res.ok) throw new Error('NLS failed');

  if (seq !== speakSeq) return null;

  const blob = await res.blob();
  if (seq !== speakSeq) return null;

  const url = URL.createObjectURL(blob);
  try {
    await playUrlViaElement(url, seq);
  } catch {
    URL.revokeObjectURL(url);
    throw new Error('NLS audio playback failed');
  }
  return url;
}


async function playUrl(url: string, seq: number): Promise<void> {
  await playUrlViaElement(url, seq);
}

async function playUrlViaElement(url: string, seq: number): Promise<void> {
  await new Promise<void>((resolve) => {
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => {
      if (currentAudio === audio) currentAudio = null;
      resolve();
    };
    audio.onerror = () => {
      if (currentAudio === audio) currentAudio = null;
      resolve();
    };
    audio.play().catch(() => resolve());
  });
}
