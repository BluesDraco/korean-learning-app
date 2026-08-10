import { classifyContent, resolveAudioPolicy, sanitizeTTSText, type AudioContentType } from '@/lib/audio/audioPolicy';
import { getStaticAudio, loadVocabAudioIndex } from '@/lib/audio/audioRegistry';

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
  if (typeof window === 'undefined') return 0.75;
  try {
    const v = localStorage.getItem(TTS_SPEED_KEY);
    return v ? parseFloat(v) : 0.75;
  } catch {
    return 0.75;
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
  for (const el of currentAudioEls) {
    try { el.pause(); el.src = ''; } catch { /* ignore */ }
  }
  currentAudioEls = [];
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
  voice?: string,
  literal = false,
): Promise<void> {
  const rate = explicitRate ?? getSpeechRate();
  const voiceId = voice ?? 'sunhi';
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

  // 直连 URL：不过 registry，不走 TTS，确保真人录音
  const DIRECT_URL: Record<string, string> = {
    '박': '/audio/phonetics/b-01.mp3', '밥': '/audio/phonetics/b-06.mp3',
    '산': '/audio/phonetics/b-02.mp3', '옷': '/audio/phonetics/b-03.mp3',
    '말': '/audio/phonetics/b-04.mp3', '밤': '/audio/phonetics/b-05.mp3',
    '강': '/audio/phonetics/b-07.mp3',
    '기역': '/audio/phonetics/c-01.mp3', '니은': '/audio/phonetics/c-02.mp3',
    '디귿': '/audio/phonetics/c-03.mp3', '리을': '/audio/phonetics/c-04.mp3',
    '미음': '/audio/phonetics/c-05.mp3', '비읍': '/audio/phonetics/c-06.mp3',
    '이응': '/audio/phonetics/c-08.mp3',
  };
  const directUrl = DIRECT_URL[cleaned];
  if (directUrl) {
    try { await playUrl(directUrl, seq); } catch { /* silent */ }
    onEnd?.();
    return;
  }

  // Static audio registry takes precedence (40音 real human recordings).
  // Bypass content classification to avoid 短词 → AI TTS misroute.
  {
    const staticAudio = getStaticAudio(cleaned);
    if (staticAudio) {
      // 词汇静态音频按 baseRate 烘焙（0.75），播放时补偿到用户设置语速；真人录音无 baseRate → 原速
      const pbr = staticAudio.baseRate ? rate / staticAudio.baseRate : undefined;
      try { await playUrl(staticAudio.url, seq, pbr); } catch { /* silent */ }
      onEnd?.();
      return;
    }
  }

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
    try { await speakViaBrowser(sanitizeTTSText(cleaned, undefined, literal), rate); } catch { /* silent */ }
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
  const cacheKey = `${rate}:${sanitizeTTSText(cleaned)}`;
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
      const blobUrl = await speakViaNls(sanitizeTTSText(cleaned), seq);
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
      // NLS failed — retry once before falling back to browser TTS
      try {
        const blobUrl = await speakViaNls(sanitizeTTSText(cleaned), seq);
        if (blobUrl) {
          audioCache.set(cacheKey, { url: blobUrl, ts: Date.now() });
          onEnd?.();
          return;
        }
      } catch (err2: unknown) {
        // Abort on retry also means user moved on — don't blacklist NLS
        if (err2 instanceof Error && err2.name === 'AbortError') { onEnd?.(); return; }
        // Genuine NLS failure — blacklist and fall through to browser TTS
        nlsFailedUntil = Date.now() + 3 * 1000;
      }
      if (seq !== speakSeq) { onEnd?.(); return; }
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

  cancelSpeech();
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

  // iOS Safari 首次 getVoices() 返回空数组，需等 voiceschanged。给最多 800ms。
  // 只等一次：拿到过之后就不再等，避免每次调用都延迟 800ms
  let voices = synth.getVoices();
  if (voices.length === 0 && !browserVoicesTried && typeof synth.addEventListener === 'function') {
    browserVoicesTried = true;
    await new Promise<void>((resolve) => {
      const onChange = () => { synth.removeEventListener('voiceschanged', onChange); resolve(); };
      synth.addEventListener('voiceschanged', onChange);
      setTimeout(() => { synth.removeEventListener('voiceschanged', onChange); resolve(); }, 800);
    });
    voices = synth.getVoices();
  }

  await new Promise<void>((resolve) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    utter.rate = rate;

    // Prefer a native voice for the target language so we don't fall through to
    // the system default (often zh-CN on Chinese devices), which mispronounces Korean.
    const voices = synth.getVoices();
    if (voices.length > 0) {
      const match = voices.find((v) => v.lang === lang) ?? voices.find((v) => v.lang.startsWith(lang.slice(0, 2)));
      if (match) utter.voice = match;
    }

    utter.onend = () => resolve();
    utter.onerror = () => resolve();
    synth.speak(utter);
    // 兜底超时：iOS 有时 onend 不触发，按文本长度估算 max
    const estMs = Math.min(15000, Math.max(2000, text.length * 300));
    setTimeout(finish, estMs);
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
    // Reuse the unlocked Audio element for WeChat/iOS WebView compatibility.
    // WeChat blocks audio.play() after async operations unless the element was
    // already unlocked in a prior gesture handler.
    const audio = unlockedAudio ?? new Audio();
    audio.src = url;
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

// ---------- Multi-segment dialog playback ----------
// 多段对话（例：남자:xxx\n여자:yyy）连续播放，一次 audio.start()。
// 手势栈问题：串行 await audio.play() 会脱离用户手势栈导致 iOS 静默拒绝。
// 方案：并发 fetch → decodeAudioData → concat AudioBuffer → 单次 source.start()。
// AudioContext 一旦解锁，source.start() 不受手势栈限制。

const dialogCache = new Map<string, { buffer: AudioBuffer; ts: number }>();
const DIALOG_CACHE_MAX = 40;
const DIALOG_CACHE_TTL = 15 * 60 * 1000;

const SEG_GAP_SEC = 0.35; // 段间静音（模拟真人换气）

export type DialogSegment = { text: string; voice?: string };

async function fetchAndDecodeSegment(
  seg: DialogSegment,
  rate: number,
  ctx: AudioContext,
  signal: AbortSignal,
): Promise<AudioBuffer> {
  const cleaned = cleanText(seg.text);
  if (!cleaned) throw new Error('empty segment text');
  const rateStr = getEdgeTtsRate(rate);
  const voiceId = seg.voice || 'sunhi';
  const url = `/api/tts/edge?text=${encodeURIComponent(sanitizeTTSText(cleaned))}&voice=${encodeURIComponent(voiceId)}&rate=${encodeURIComponent(rateStr)}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`TTS fetch failed: ${res.status}`);
  const arrayBuf = await res.arrayBuffer();
  // 使用回调形式 decodeAudioData，兼容 iOS Safari（旧版不支持 Promise 形式）
  return await new Promise<AudioBuffer>((resolve, reject) => {
    ctx.decodeAudioData(arrayBuf.slice(0), resolve, reject);
  });
}

function resampleChannel(input: Float32Array, srcRate: number, dstRate: number): Float32Array {
  if (srcRate === dstRate) return input;
  const ratio = srcRate / dstRate;
  const dstLen = Math.round(input.length / ratio);
  const out = new Float32Array(dstLen);
  for (let i = 0; i < dstLen; i++) {
    const srcPos = i * ratio;
    const i0 = Math.floor(srcPos);
    const i1 = Math.min(i0 + 1, input.length - 1);
    const t = srcPos - i0;
    out[i] = input[i0] * (1 - t) + input[i1] * t;
  }
  return out;
}

function concatBuffers(ctx: AudioContext, buffers: AudioBuffer[], gapSec: number): AudioBuffer {
  const sampleRate = Math.max(...buffers.map(b => b.sampleRate));
  const numChannels = Math.min(...buffers.map(b => b.numberOfChannels));
  const gapSamples = Math.round(gapSec * sampleRate);
  const resampled = buffers.map(b => {
    const channels: Float32Array[] = [];
    for (let ch = 0; ch < numChannels; ch++) {
      const srcCh = Math.min(ch, b.numberOfChannels - 1);
      channels.push(resampleChannel(b.getChannelData(srcCh), b.sampleRate, sampleRate));
    }
    return channels;
  });
  const totalLen = resampled.reduce((sum, chs) => sum + chs[0].length, 0) + gapSamples * (buffers.length - 1);
  const out = ctx.createBuffer(numChannels, totalLen, sampleRate);
  for (let ch = 0; ch < numChannels; ch++) {
    const outData = out.getChannelData(ch);
    let offset = 0;
    for (let i = 0; i < resampled.length; i++) {
      const chunk = resampled[i][ch];
      outData.set(chunk, offset);
      offset += chunk.length;
      if (i < resampled.length - 1) offset += gapSamples;
    }
  }
  return out;
}

// 一次点击播放整段多段对话，返回 promise 在整段播完后 resolve。
// 中途被 cancelSpeech() 打断也会 resolve（静默结束）。
// 混合语言（韩+中）：韩语走 Edge TTS，中文段自建 TTS 服务不支持，走浏览器 SpeechSynthesis。
export async function speakDialog(segments: DialogSegment[], rate?: number): Promise<void> {
  if (typeof window === 'undefined' || segments.length === 0) return;
  const ctx = getAudioContext();
  if (!ctx) throw new Error('AudioContext unavailable');
  // unlockAudioContext() 已在手势里同步 resume 了。
  // 不 await——iOS 上 await 会脱离用户手势栈导致 resume 失败。
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});

  cancelSpeech();
  const seq = ++speakSeq;
  const finalRate = rate ?? getSpeechRate();

  // iOS: HTML5 Audio 元素绕过静音开关（Web Audio API 走铃声通道，Audio 元素走媒体通道）
  // iOS 要求 audio.play() 必须在用户手势同步栈内——预创建 Audio 元素在手势内 play()
  // 后再喂 src，绕开"await fetch 后脱手势栈"的限制
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) {
    const rateStr = getEdgeTtsRate(finalRate);
    // 从池里取已被手势解锁过的 audio 元素（每次调用都用不同槽位避免并发冲突）
    const audios: HTMLAudioElement[] = segments.map(() => {
      // 语速已通过 rateStr 烘进 edge-tts 合成的音频，不能再叠 playbackRate（否则双重减速）。
      // 池元素复用，显式重置 playbackRate=1 防残留。
      const a = iosAudioPool.length > 0 ? getIosAudio() : new Audio();
      a.playbackRate = 1;
      return a;
    });
    currentAudioEls = audios;
    // 并行 fetch 所有 segment
    const fetches = segments.map(async (seg) => {
      const cleaned = cleanText(seg.text);
      if (!cleaned) return null;
      const url = `/api/tts/edge?text=${encodeURIComponent(sanitizeTTSText(cleaned))}&voice=${encodeURIComponent(seg.voice || 'sunhi')}&rate=${encodeURIComponent(rateStr)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`TTS fetch failed: ${res.status}`);
      const blob = await res.blob();
      if (seq !== speakSeq) return null;
      return URL.createObjectURL(blob);
    });
    let blobUrls: (string | null)[] = [];
    try {
      blobUrls = await Promise.all(fetches);
    } catch {
      // 静默失败，收拾预创建的 audio 元素
      for (const a of audios) { try { a.pause(); a.src = ''; } catch { /* ignore */ } }
      currentAudioEls = [];
      return;
    }
    if (seq !== speakSeq) {
      for (const u of blobUrls) if (u) URL.revokeObjectURL(u);
      for (const a of audios) { try { a.pause(); a.src = ''; } catch { /* ignore */ } }
      currentAudioEls = [];
      return;
    }
    // 顺序播放：把预创建的 Audio 换 src，之前已经 play() 过所以 iOS 允许后续 play()
    for (let i = 0; i < segments.length; i++) {
      if (seq !== speakSeq) break;
      const url = blobUrls[i];
      const a = audios[i];
      if (!url) continue;
      await new Promise<void>((resolve) => {
        a.onended = () => { URL.revokeObjectURL(url); a.src = ''; resolve(); };
        a.onerror = () => { URL.revokeObjectURL(url); a.src = ''; resolve(); };
        a.src = url;
        a.play().catch(() => { URL.revokeObjectURL(url); a.src = ''; resolve(); });
      });
    }
    for (const a of audios) { try { a.pause(); a.src = ''; } catch { /* ignore */ } }
    currentAudioEls = [];
    return;
  }

  const isChineseVoice = (v?: string) => !!v && /^zh[-_]/i.test(v);
  const koreanSegs = segments.filter(s => !isChineseVoice(s.voice));
  const hasChineseSeg = segments.some(s => isChineseVoice(s.voice));

  // 播放器：韩语段用 AudioBufferSource（合并成一次播放）；中文段用 SpeechSynthesis
  const playKoreanBuffer = async (segs: DialogSegment[]) => {
    if (segs.length === 0) return;
    const cacheKey = segs.map(s => `${s.voice || 'sunhi'}:${s.text}`).join('|') + `:${finalRate}`;
    const cached = dialogCache.get(cacheKey);
    let buffer: AudioBuffer;
    if (cached && Date.now() - cached.ts < DIALOG_CACHE_TTL) {
      buffer = cached.buffer;
      cached.ts = Date.now();
    } else {
      const controller = new AbortController();
      currentFetchController = controller;
      try {
        const decoded = await Promise.all(
          segs.map(seg => fetchAndDecodeSegment(seg, finalRate, ctx, controller.signal)),
        );
        if (seq !== speakSeq) return;
        buffer = concatBuffers(ctx, decoded, SEG_GAP_SEC);
        if (dialogCache.size >= DIALOG_CACHE_MAX) {
          const firstKey = dialogCache.keys().next().value;
          if (firstKey) dialogCache.delete(firstKey);
        }
        dialogCache.set(cacheKey, { buffer, ts: Date.now() });
      } finally {
        if (currentFetchController === controller) currentFetchController = null;
      }
    }
    if (seq !== speakSeq) return;
    await new Promise<void>((resolve) => {
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      currentAudioSource = source;
      source.onended = () => {
        if (currentAudioSource === source) currentAudioSource = null;
        resolve();
      };
      try { source.start(0); } catch (err) {
        if (currentAudioSource === source) currentAudioSource = null;
        resolve();
      }
    });
  };

  // 简单场景：全韩语，走原有单 buffer 路径
  if (!hasChineseSeg) {
    await playKoreanBuffer(koreanSegs);
    return;
  }

  // 混合场景：优先所有段拼成一个 AudioBuffer 一次 source.start（iOS 手势栈最友好）
  // 失败时（例如采样率不匹配）→ 逐段独立 AudioBuffer 播放，中文段也走 AudioBuffer
  // 不再回落 speechSynthesis：iOS/低端安卓 zh/ko voice 质量差，且 speechSynthesis 脱手势栈后 iOS 会静音
  try {
    await playKoreanBuffer(segments);
    return;
  } catch { /* 整段失败 → 逐段 */ }
  for (const seg of segments) {
    if (seq !== speakSeq) return;
    try {
      await playKoreanBuffer([seg]);
    } catch { /* 单段失败不阻塞后续 */ }
  }
}

