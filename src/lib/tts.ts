import { classifyContent, resolveAudioPolicy, sanitizeTTSText, type AudioContentType } from '@/lib/audio/audioPolicy';
import { getStaticAudio, loadVocabAudioIndex } from '@/lib/audio/audioRegistry';

let currentAudio: HTMLAudioElement | null = null;
let currentAudioSource: AudioBufferSourceNode | null = null;
let currentFetchController: AbortController | null = null;
let currentAudioEls: HTMLAudioElement[] = [];
// 每 text 独立黑名单：某一句 NLS 失败只短暂拒绝该句，其他句子仍尝试
// 之前是全局 nlsFailedUntil，导致 challenge 页面快速切题时后续题目静音
const nlsTextBlacklist = new Map<string, number>();
function isNlsBlacklisted(text: string): boolean {
  const until = nlsTextBlacklist.get(text);
  if (!until) return false;
  if (Date.now() > until) { nlsTextBlacklist.delete(text); return false; }
  return true;
}
function markNlsFailed(text: string): void {
  nlsTextBlacklist.set(text, Date.now() + 500);
  // 兜底清理：超过 100 条时清除已过期项
  if (nlsTextBlacklist.size > 100) {
    const now = Date.now();
    for (const [k, v] of nlsTextBlacklist) if (v <= now) nlsTextBlacklist.delete(k);
  }
}
let speakSeq = 0;
// 只在 cancelSpeech() 里自增：用于 speakWordRepeated 判断"这段连读有没有被别人打断"。
// 连读循环自己每调一次 speak() 会触发恰好一次 cancelSpeech()（+1），路径不同（NLS/缓存/
// 浏览器兜底）都不影响这个计数；外部翻页/新点击也各 +1。故循环可用「预测 +1」精确核对。
let cancelGen = 0;
let audioCtxUnlocked = false;
let sharedAudioCtx: AudioContext | null = null;
let browserVoicesTried = false;

// URL ?debug=audio 时打开音频诊断日志（生产可用于排查 iOS 无声）
function isAudioDebug(): boolean {
  if (typeof window === 'undefined') return false;
  try { return new URLSearchParams(window.location.search).has('debug'); } catch { return false; }
}
function audioLog(...args: unknown[]): void {
  if (isAudioDebug()) console.log('[audio]', ...args);
}

export function isAudioContextRunning(): boolean {
  if (typeof window === 'undefined') return false;
  return !!sharedAudioCtx && sharedAudioCtx.state === 'running';
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (sharedAudioCtx && sharedAudioCtx.state !== 'closed') return sharedAudioCtx;
  try {
    // 旧 ctx 已关闭，AudioBuffer 缓存与旧 ctx 绑定，必须清空
    if (sharedAudioCtx && sharedAudioCtx.state === 'closed') {
      dialogCache.clear();
    }
    const Ctor = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext
      ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    sharedAudioCtx = new Ctor();
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

// Minimal silent MP3 (0.1s) as a data URI — used to unlock iOS audio on first gesture
const SILENT_MP3 = 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//OEAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAABAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//MUZAAAAAGkAAAAAAAAA0gAAAAATEFN//MUZAMAAAGkAAAAAAAAA0gAAAAATEFN//MUZAYAAAGkAAAAAAAAA0gAAAAATEFN//MUZAkAAAGkAAAAAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';

let unlockedAudio: HTMLAudioElement | null = null;
// iOS 复用池：用户手势解锁过的 audio 元素能在后续异步栈内直接 .src = ...; .play()
// 大小 8 够多段对话/多词循环并行使用
const iosAudioPool: HTMLAudioElement[] = [];
let iosAudioPoolCursor = 0;
function getIosAudio(): HTMLAudioElement {
  const a = iosAudioPool[iosAudioPoolCursor];
  iosAudioPoolCursor = (iosAudioPoolCursor + 1) % iosAudioPool.length;
  return a;
}

// Unlock iOS/WeChat audio on first user gesture so async audio.play() works.
// 必须在**用户手势的同步栈**里调用，不能 await 之后再调。
// iOS 长时间无操作后 AudioContext 会自动 suspended，所以每次手势都要重新 resume + 静音 start。
export function unlockAudioContext() {
  if (typeof window === 'undefined') return;
  try {
    // 首次：起一批 <audio> 静音 MP3，把 HTMLAudioElement 通道也解锁
    // iOS 上同一个 audio 元素被手势 play() 过一次后，之后异步 .src=; .play() 就不需要手势
    if (!audioCtxUnlocked) {
      const a = new Audio(SILENT_MP3);
      a.onended = () => { a.src = ''; };
      a.play().catch(() => {});
      unlockedAudio = a;
      if (iosAudioPool.length === 0) {
        for (let i = 0; i < 8; i++) {
          const b = new Audio(SILENT_MP3);
          b.onended = () => { b.src = ''; b.onended = null; };
          b.play().catch(() => {});
          iosAudioPool.push(b);
        }
      }
    } else if (iosAudioPool.length > 0) {
      // 后续手势：只对完全空闲（无 src）且不在正在使用列表里的池元素心跳一次静音
      // 有 src 的元素说明是业务音频（正在播 / 播完暂停 / 被 cancel 后残留），绝不能重播
      // currentAudioEls 覆盖 speakDialog fetch 中但 src 未设置的空窗期，防止 race
      const inUse = new Set(currentAudioEls);
      for (const b of iosAudioPool) {
        if (b.src || inUse.has(b)) continue;
        try {
          b.src = SILENT_MP3;
          b.onended = () => { b.src = ''; b.onended = null; };
          b.play().catch(() => {});
        } catch { /* ignore */ }
      }
    }

    const ctx = getAudioContext();
    if (ctx) {
      // iOS: resume 必须在 source.start() 之前，否则 suspended context 上调度的 source 会在 resume 时被清掉
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
      audioLog('unlock', { state: ctx.state, sr: ctx.sampleRate });
    }
    audioCtxUnlocked = true;
  } catch (err) {
    // 一次失败不代表永久失败，下次手势再试
    audioCtxUnlocked = false;
    unlockedAudio = null;
    audioLog('unlock failed', err);
  }
}

// Auto-unlock on first user gesture so audio.play() works on iOS / WeChat.
// 不用 { once: true } —— unlock 失败时 listener 已被消费，后续点击再也触发不到。
// 改为 unlock 成功后才解绑。
if (typeof window !== 'undefined') {
  // 每次手势都跑一遍 unlockAudioContext（内部按需 resume + 静音 start），不解绑
  const autoUnlock = () => { unlockAudioContext(); };
  window.addEventListener('touchstart', autoUnlock, { passive: true });
  window.addEventListener('click', autoUnlock, { passive: true });
  // 词汇/例句预生成音频索引：加载后 speak() 命中静态文件，绕开实时 TTS
  loadVocabAudioIndex();
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

const TTS_REPEAT_KEY = 'tts-repeat';
const REPEAT_GAP_MS = 1000; // 每遍之间静音 1 秒

/** 闪卡自动朗读遍数（1/2/3/5），默认 1。 */
export function getSpeakRepeat(): number {
  if (typeof window === 'undefined') return 1;
  try {
    const v = parseInt(localStorage.getItem(TTS_REPEAT_KEY) || '1', 10);
    return Number.isFinite(v) && v >= 1 ? v : 1;
  } catch {
    return 1;
  }
}

export function setSpeakRepeat(count: number): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TTS_REPEAT_KEY, String(count));
  } catch { /* ignore */ }
}

/** Word TTS — uses NLS for consistent Korean pronunciation including on iOS.
 * 单词/例句朗读统一走用户设置语速：忽略调用方传入的 rate(历史上各页硬编码 0.7~0.85,
 * 导致设置页调倍速对例句/单词全无效)。需要独立语速的场景(发音教学/对话)直接调 speak()。 */
export async function speakWord(text: string, _rate?: number): Promise<void> {
  if (typeof window === 'undefined') return;
  const cleaned = cleanText(text);
  if (!cleaned) return;
  cancelSpeech();
  await speak(cleaned, getSpeechRate());
}

/**
 * 连读同一个词 N 遍，每遍间隔 1 秒。闪卡自动播放用。
 * count 省略时读用户设置的遍数。切卡/新点击（会调 cancelSpeech / 新 speak）→ speakSeq 变化 → 间隔期间检测到后停，不再排下一遍。
 * 每遍播完后捕获 speakSeq 稳定值；间隔期间若被外部调用改动则中断（speak 内部自己的 ++speakSeq 已在捕获前完成，不会误判）。
 */
export async function speakWordRepeated(text: string, rate?: number, count?: number): Promise<void> {
  if (typeof window === 'undefined') return;
  const cleaned = cleanText(text);
  if (!cleaned) return;
  const times = Math.max(1, count ?? getSpeakRepeat());
  const r = rate ?? getSpeechRate();
  // 用 cancelGen 判断连读是否被打断。循环自己每调一次 speak() 会触发恰好一次
  // cancelSpeech()（cancelGen +1），无论走 NLS/缓存/浏览器兜底哪条路都一样。外部翻页/
  // 新点击也各 +1。故每遍后的预测值就是 expected+1；对不上=有别人插进来，立刻停，
  // 绝不再排下一遍——否则上一张卡的剩余连读会和新卡音频叠在一起。
  let expected = cancelGen;
  for (let i = 0; i < times; i++) {
    await speak(cleaned, r);
    expected += 1; // 本遍自己的 speak() 触发了一次 cancelSpeech()
    if (cancelGen !== expected) return; // 播放期间被抢占
    if (i === times - 1) return;
    await new Promise((res) => setTimeout(res, REPEAT_GAP_MS));
    if (cancelGen !== expected) return; // 间隔期间被抢占
  }
}

/** Browser-compatible TTS — routes through speak() so NLS is used where available. */
export async function speakBrowser(text: string, rate?: number, voice?: string): Promise<void> {
  if (typeof window === 'undefined') return;
  const cleaned = cleanText(text);
  if (!cleaned) return;
  cancelSpeech();
  await speak(cleaned, rate ?? getSpeechRate(), undefined, voice);
}

/**
 * 播放预录音源（绘本狐狸配音等），命中则播文件，缺文件/失败回落 edge-tts。
 * 复用 speak() 的 iOS 解锁 + cancelSpeech + speakSeq + playUrl 路径，翻页/暂停可中断。
 */
export async function speakPreRecorded(
  url: string,
  fallbackText: string,
  rate?: number,
  onEnd?: () => void,
): Promise<void> {
  if (typeof window === 'undefined') { onEnd?.(); return; }
  unlockAudioContext();
  cancelSpeech();
  const seq = ++speakSeq;
  try {
    await playUrl(url, seq);
    onEnd?.();
  } catch {
    // 被新点击抢占则静默退出，不回落（否则会叠播）
    if (seq !== speakSeq) { onEnd?.(); return; }
    // 文件缺失/解码失败 → 回落 edge-tts（speak 内部自带 unlock/cancel/seq）
    await speak(fallbackText, rate, onEnd);
  }
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
  cancelGen++; // 供 speakWordRepeated 判断连读是否被打断
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

  // Check cache first (for Edge-TTS content). Cache key must include voice + literal flag.
  const cacheKey = `${voiceId}:${rate}:${literal ? 'L:' : ''}${cleaned}`;
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
      await speakViaBrowser(sanitizeTTSText(cleaned, undefined, literal), rate);
    } catch {
      // failed silently
    }
    onEnd?.();
    return;
  }

  // Aliyun NLS TTS (best Korean pronunciation, works on iOS/iPad)
  // sanitizeTTSText 兜底：清理 vs / 斜杠等分隔符，防 NLS 把它们朗读出来
  // literal=true 时跳过 normalize，保留字面写法（"写"按钮场景）
  const cleanedForTts = sanitizeTTSText(cleaned, undefined, literal);
  const nlsAvailable = !isNlsBlacklisted(cleanedForTts);
  if (nlsAvailable) {
    try {
      const blobUrl = await speakViaNls(cleanedForTts, seq, rate, voiceId);
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
      // NLS failed — blacklist briefly. Do NOT fall back to system speechSynthesis:
      // user devices (esp. low-end Android / iOS without ko voice pack) produce
      // robotic, non-human Korean that users find disturbing. Prefer silence.
      markNlsFailed(cleanedForTts);
    }
  }

  onEnd?.();
}

/**
 * 语音对话专用 TTS — 走 MiniMax(Korean_SweetGirl)，与其他板块的 edge-tts 分离。
 * 签名对齐 speak()：(text, rate, onEnd)。复用 speakSeq/cancelSpeech 及 iOS 音频池播放路径。
 */
export async function speakViaMinimax(text: string, rate?: number, onEnd?: () => void, voice?: 'male' | 'female', animalId?: string): Promise<void> {
  if (typeof window === 'undefined') { onEnd?.(); return; }
  const cleaned = cleanText(text);
  if (!cleaned) { onEnd?.(); return; }

  unlockAudioContext();
  cancelSpeech();
  const seq = ++speakSeq;

  try {
    const controller = new AbortController();
    currentFetchController = controller;
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    let res: Response;
    try {
      res = await fetch('/api/tts/minimax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // animalId 命中卡司则服务端用角色音色，否则回落 voice(male/female)
        body: JSON.stringify({ text: cleaned, rate: rate ?? getSpeechRate(), voice: voice ?? 'female', animalId: animalId ?? '' }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
      if (currentFetchController === controller) currentFetchController = null;
    }
    if (seq !== speakSeq) { onEnd?.(); return; }
    if (!res.ok) { onEnd?.(); return; } // 失败静默(与 edge-tts 一致，不回落系统 TTS)
    const blob = await res.blob();
    if (seq !== speakSeq) { onEnd?.(); return; }
    const url = URL.createObjectURL(blob);
    try {
      await playUrlViaPool(url, seq);
    } finally {
      URL.revokeObjectURL(url);
    }
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') { onEnd?.(); return; }
    // 合成/播放失败静默
  }
  if (seq === speakSeq) onEnd?.();
}

/** 预加载音频到缓存 — 后台静默生成，不播放。进入页面时调用，后续点击秒播。 */
export async function prefetchAudio(text: string, rate?: number): Promise<void> {
  if (typeof window === 'undefined') return;
  const cleaned = cleanText(text);
  if (!cleaned || isChineseText(cleaned)) return;

  const r = rate ?? getSpeechRate();
  // 与 speak() 的 key 一致（voiceId:rate:literal:text），确保 prefetch 后 speak() 命中缓存
  const cacheKey = `sunhi:${r}:${cleaned}`;
  if (audioCache.has(cacheKey)) return; // 已缓存

  // 静态音频不需要预加载
  if (getStaticAudio(cleaned)) return;

  if (isNlsBlacklisted(cleaned)) return;

  try {
    const controller = new AbortController();
    const rateStr = getEdgeTtsRate(r);
    const ttsUrl = `/api/tts/edge?text=${encodeURIComponent(cleaned)}&voice=sunhi&rate=${encodeURIComponent(rateStr)}`;
    const res = await fetch(ttsUrl, { signal: controller.signal });
    if (!res.ok) return;
    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    // 仅缓存，不播放
    if (audioCache.size >= CACHE_MAX) {
      const first = audioCache.keys().next().value;
      if (first) {
        const old = audioCache.get(first);
        if (old) URL.revokeObjectURL(old.url);
        audioCache.delete(first);
      }
    }
    audioCache.set(cacheKey, { url: blobUrl, ts: Date.now() });
  } catch { /* 预加载失败不影响使用，点击时再试 */ }
}
export async function speakChinese(
  text: string,
  rate?: number,
  onEnd?: () => void,
): Promise<void> {
  if (typeof window === 'undefined') { onEnd?.(); return; }
  const cleaned = cleanText(text);
  if (!cleaned) { onEnd?.(); return; }

  // 自建独立 seq token（与 speak() 对齐），否则先前的 cancelSpeech 会作废本次调用
  const seq = ++speakSeq;

  try {
    const controller = new AbortController();
    currentFetchController = controller;
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    let res: Response;
    const rateStr = getEdgeTtsRate(rate ?? getSpeechRate());
    try {
      res = await fetch(`/api/tts/edge?text=${encodeURIComponent(cleaned)}&voice=zh-CN-XiaoxiaoNeural&rate=${encodeURIComponent(rateStr)}`, {
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
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

    if (voices.length > 0) {
      // 匹配顺序：完全匹配 → 前缀匹配（zh 或 ko）→ 系统默认
      const exact = voices.find((v) => v.lang === lang);
      const prefix = lang === 'zh-CN'
        ? voices.find((v) => v.lang.toLowerCase().startsWith('zh'))
        : voices.find((v) => v.lang.toLowerCase().startsWith('ko'));
      const match = exact ?? prefix;
      if (match) utter.voice = match;
    }

    let done = false;
    const finish = () => { if (!done) { done = true; resolve(); } };
    utter.onend = finish;
    utter.onerror = finish;
    synth.speak(utter);
    // 兜底超时：iOS 有时 onend 不触发，按文本长度估算 max
    const estMs = Math.min(15000, Math.max(2000, text.length * 300));
    setTimeout(finish, estMs);
  });
}

function getEdgeTtsRate(userRate: number): string {
  const pct = Math.round((userRate - 1) * 100);
  if (pct >= 0) return `+${pct}%`;
  return `${pct}%`;
}

async function speakViaNls(text: string, seq: number, rate?: number, voice?: string): Promise<string | null> {
  const controller = new AbortController();
  currentFetchController = controller;
  // 8 秒超时兜底：Edge TTS 偶发慢请求时不让用户干等
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  const rateStr = getEdgeTtsRate(rate ?? getSpeechRate());
  const voiceId = voice ?? 'sunhi';
  const ttsUrl = `/api/tts/edge?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(voiceId)}&rate=${encodeURIComponent(rateStr)}`;
  let res: Response;
  try {
    res = await fetch(ttsUrl, { signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
    if (currentFetchController === controller) currentFetchController = null;
  }
  if (!res.ok) throw new Error('TTS failed');

  if (seq !== speakSeq) return null;

  const blob = await res.blob();
  if (seq !== speakSeq) return null;

  const blobUrl = URL.createObjectURL(blob);
  try {
    await playUrlViaElement(blobUrl, seq);
  } catch {
    URL.revokeObjectURL(blobUrl);
    throw new Error('TTS audio playback failed');
  }
  return blobUrl;
}


async function playUrl(url: string, seq: number, playbackRate?: number): Promise<void> {
  await playUrlViaElement(url, seq, playbackRate);
}

// iOS 专用：语音对话的兔莉发声在 VAD 异步回调里触发，脱离用户手势栈，
// new Audio().play() 会被 iOS Safari 静默拒绝（症状：能识别、有文字、无声）。
// 复用点 orb 时 unlockAudioContext() 解锁过的池元素——它们被手势 play() 过，
// 之后异步 .src=;.play() 不再需要手势。非 iOS 走原路径。
async function playUrlViaPool(url: string, seq: number): Promise<void> {
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (!isIOS || iosAudioPool.length === 0) {
    await playUrlViaElement(url, seq);
    return;
  }
  const a = getIosAudio();
  currentAudioEls = [a];
  await new Promise<void>((resolve) => {
    a.onended = () => { a.onended = null; a.src = ''; resolve(); };
    a.onerror = () => { a.onerror = null; a.src = ''; resolve(); };
    a.src = url;
    a.play().catch(() => { a.src = ''; resolve(); });
  });
  currentAudioEls = [];
}

async function playUrlViaElement(url: string, seq: number, playbackRate?: number): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const audio = new Audio(url);
    if (playbackRate && playbackRate > 0) audio.playbackRate = playbackRate;
    currentAudio = audio;
    audio.onended = () => {
      if (currentAudio === audio) currentAudio = null;
      resolve();
    };
    audio.onerror = () => {
      if (currentAudio === audio) currentAudio = null;
      // 被新点击抢占（cancelSpeech 把 src='' 触发 onerror）→ 静默
      if (seq !== speakSeq) { resolve(); return; }
      reject(new Error('audio playback failed'));
    };
    audio.play().catch((err) => {
      if (currentAudio === audio) currentAudio = null;
      if (seq !== speakSeq) { resolve(); return; }
      reject(err instanceof Error ? err : new Error('audio play rejected'));
    });
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

