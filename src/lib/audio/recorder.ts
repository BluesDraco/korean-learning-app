// MediaRecorder wrapper for pronunciation practice.
// Handles mimeType detection, permissions, and blob lifecycle.
// Error messages use i18n keys (audio.*) — callers translate via parseErrorKey() + t().
'use client';

const SUPPORTED_TYPES = [
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/mp4',
  'audio/wav',
  '',
];

/** Parse an i18n error key with optional param: "audio.key||paramValue" → { key, params } */
export function parseErrorKey(raw: string): { key: string; params?: Record<string, string> } {
  const idx = raw.indexOf('||');
  if (idx === -1) return { key: raw };
  return { key: raw.slice(0, idx), params: { name: raw.slice(idx + 2) } };
}

/**
 * 检测「网页录音基本无解」的 App 内置浏览器 / 国产内核。
 * 微信 X5、QQ、微博、UC、部分手机自带浏览器把 getUserMedia 阉割或做残缺，
 * 且系统设置里找不到该壳的麦克风开关，用户开权限也没用。命中就该引导换系统浏览器。
 */
export function isInAppBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent.toLowerCase();
  return /micromessenger|qq\/|qqbrowser|weibo|ucbrowser|ucweb|quark|baiduboxapp|miuibrowser|huaweibrowser|heytapbrowser|vivobrowser|oppobrowser/.test(ua);
}

/**
 * 录音前的环境预检：返回 null 表示环境 OK，否则返回该显示的 i18n key。
 * 在点录音的第一步调用，把「微信/国产浏览器打不开」「非 https」「无 API」拦在申请麦克风之前，
 * 避免用户白按、白开权限。
 */
export function precheckRecordingEnv(): string | null {
  if (typeof window !== 'undefined' && !window.isSecureContext) return 'audio.http_required';
  if (isInAppBrowser()) return 'audio.use_system_browser';
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) return 'audio.browser_unsupported';
  return null;
}

/**
 * 把 getUserMedia 的失败归类成精确的 i18n key（供各录音入口共用）。
 * 先做环境预检（非 https / 微信国产壳 / 无 mediaDevices），再按 err.name 分类；
 * 未分类的附带真实 err.name（`||name`）供线上诊断，避免一律误报「无权限」。
 * 调用前先 parseErrorKey() 再 t()。
 */
export function describeMicError(err?: unknown): string {
  const pre = precheckRecordingEnv();
  if (pre) return pre;
  const name = (err as { name?: string })?.name || '';
  if (name === 'NotAllowedError' || name === 'PermissionDeniedError' || name === 'SecurityError') return 'audio.mic_permission_denied';
  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') return 'audio.mic_not_found';
  if (name === 'NotReadableError' || name === 'TrackStartError') return 'audio.mic_busy';
  if (name === 'AbortError') return 'audio.mic_interrupted';
  const detail = name || (err as { message?: string })?.message || 'unknown';
  return `audio.mic_access_error||${detail}`;
}

// Only cache after client-side detection (not during SSR)
let cachedMimeType: string | null | undefined = undefined;

export function detectMimeType(): string | null {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') return null;
  if (cachedMimeType !== undefined) return cachedMimeType;
  for (const t of SUPPORTED_TYPES) {
    if (t === '' || MediaRecorder.isTypeSupported(t)) {
      cachedMimeType = t || null;
      return cachedMimeType;
    }
  }
  cachedMimeType = null;
  return null;
}

export function isRecordingSupported(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof MediaRecorder === 'undefined') return false;
  if (!navigator.mediaDevices?.getUserMedia) return false;
  return true;
}

export async function requestMicPermission(): Promise<'granted' | 'denied' | 'unavailable'> {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    return 'unavailable';
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((t) => t.stop());
    return 'granted';
  } catch (e: any) {
    if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') return 'denied';
    return 'unavailable';
  }
}

export interface RecordingResult {
  blob: Blob;
  url: string;
  durationMs: number;
}

export class AudioRecorder {
  private stream: MediaStream | null = null;
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private startTime = 0;
  private _state: 'idle' | 'recording' | 'done' = 'idle';
  private maxMs: number;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(maxMs: number = 10000) {
    this.maxMs = maxMs;
  }

  get state() { return this._state; }

  async start(): Promise<{ error?: string; errorType?: 'denied' | 'unavailable' }> {
    if (this._state === 'recording') return { error: '已经在录音' };
    const pre = precheckRecordingEnv();
    if (pre) return { error: pre, errorType: 'unavailable' };
    if (!isRecordingSupported()) return { error: 'audio.browser_unsupported', errorType: 'unavailable' };
    const mimeType = detectMimeType();

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e: any) {
      const name = e?.name || 'unknown';
      if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        return { error: 'audio.mic_permission_denied', errorType: 'denied' };
      }
      if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
        return { error: 'audio.mic_not_found', errorType: 'unavailable' };
      }
      if (name === 'NotReadableError' || name === 'TrackStartError') {
        return { error: 'audio.mic_busy', errorType: 'unavailable' };
      }
      if (name === 'AbortError') {
        return { error: 'audio.mic_interrupted', errorType: 'unavailable' };
      }
      return { error: `audio.mic_access_error||${name}`, errorType: 'unavailable' };
    }

    // 检查 stream 是否真的有 audio track（微信/X5 内核有时返回空 stream）
    const audioTracks = this.stream.getAudioTracks();
    if (audioTracks.length === 0 || !audioTracks[0].enabled) {
      this.cleanup();
      return { error: 'audio.no_audio_track', errorType: 'unavailable' };
    }

    this.chunks = [];
    try {
      this.recorder = mimeType
        ? new MediaRecorder(this.stream, { mimeType })
        : new MediaRecorder(this.stream);
    } catch (e: any) {
      this.cleanup();
      return { error: `audio.unsupported_format||${e?.name || 'unknown'}`, errorType: 'unavailable' };
    }
    this.recorder.ondataavailable = (e) => { if (e.data.size > 0) this.chunks.push(e.data); };
    // 传 timeslice：iOS Safari 上无参 start() 有时会导致 stop() flush 出空 blob。
    // 每 250ms 主动 emit chunk 可稳定拿到数据。
    try {
      this.recorder.start(250);
    } catch (e: any) {
      this.cleanup();
      return { error: `audio.recording_start_failed||${e?.name || 'unknown'}`, errorType: 'unavailable' };
    }
    this.startTime = Date.now();
    this._state = 'recording';

    this.timeoutId = setTimeout(() => this.stop(), this.maxMs);
    return {};
  }

  async stop(): Promise<RecordingResult | null> {
    if (this._state !== 'recording' || !this.recorder) return null;
    if (this.timeoutId) { clearTimeout(this.timeoutId); this.timeoutId = null; }
    const actualMimeType = this.recorder.mimeType;

    // stop() 前强制 flush 当前 buffer：timeslice(250ms) 模式下，说完立刻点停时
    // 最后不满一片的尾音（如「학교」的「교」）可能不被 flush 进 blob，导致 ASR 只收到半个词。
    // requestData() 立即 emit 一个 chunk，把尾音补回。
    try { this.recorder.requestData(); } catch { /* inactive 时忽略 */ }

    const result = await new Promise<RecordingResult>((resolve) => {
      this.recorder!.onstop = () => {
        const blob = new Blob(this.chunks, { type: actualMimeType || 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const durationMs = Date.now() - this.startTime;
        this.cleanup();
        this._state = 'done';
        resolve({ blob, url, durationMs });
      };
      this.recorder!.stop();
    });
    return result;
  }

  cancel(): void {
    if (this.timeoutId) { clearTimeout(this.timeoutId); this.timeoutId = null; }
    this.cleanup();
    this._state = 'idle';
  }

  private cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
    this.recorder = null;
  }
}

export function revokeRecording(url: string): void {
  URL.revokeObjectURL(url);
}
