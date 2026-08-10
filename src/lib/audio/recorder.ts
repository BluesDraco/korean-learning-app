// MediaRecorder wrapper for pronunciation practice.
// Handles mimeType detection, permissions, and blob lifecycle.
// Error messages use i18n keys (audio.*) — callers translate via parseErrorKey() + t().
'use client';

import { floatToWav } from './webmToWav';

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
 * 「网页录音基本无解」的 App 内置 WebView。
 * 微信 X5 / QQ / 微博 / UC / 夸克 / 百度 是 App 内嵌壳，把 getUserMedia 阉割或做残缺，
 * 且系统设置里找不到该壳的麦克风开关，用户开权限也没用 —— 必须引导换系统浏览器。
 */
function isTrueInAppShell(ua: string): boolean {
  return /micromessenger|qq\/|qqbrowser|weibo|ucbrowser|ucweb|quark|baiduboxapp/.test(ua);
}

/**
 * 手机厂商自带浏览器（小米/华为/vivo/oppo/一加）—— 多为完整 Chromium 内核，
 * HTTPS 下大多支持 getUserMedia。不预检拦死，放行去实际申请麦克风，
 * 真失败再由 describeMicError 按 err.name 精确提示（避免误伤"其实能录"的用户）。
 */
function isVendorBrowser(ua: string): boolean {
  return /miuibrowser|huaweibrowser|heytapbrowser|vivobrowser|oppobrowser/.test(ua);
}

/** 命中「真阉割内置壳」或「厂商浏览器」都算 in-app（供 UI 提示判断用，保持兼容）。 */
export function isInAppBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent.toLowerCase();
  return isTrueInAppShell(ua) || isVendorBrowser(ua);
}

/** iOS PWA 独立窗口检测：加主屏后 display-mode=standalone */
function isIosStandalonePwa(): boolean {
  if (typeof window === 'undefined') return false;
  const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());
  return isIOS && window.matchMedia('(display-mode: standalone)').matches;
}

/**
 * 录音前的环境预检：返回 null 表示环境 OK，否则返回该显示的 i18n key。
 * 在点录音的第一步调用，把「微信/国产浏览器打不开」「非 https」「无 API」拦在申请麦克风之前，
 * 避免用户白按、白开权限。
 */
export function precheckRecordingEnv(): string | null {
  if (typeof window !== 'undefined' && !window.isSecureContext) return 'audio.http_required';
  // iOS PWA standalone (加主屏) iOS < 16.4 无 getUserMedia；>= 16.4 理论上支持但需权限独立授权
  if (isIosStandalonePwa()) {
    if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) return 'audio.ios_pwa_unsupported';
    // 能力存在但可能仍失败；先放行，失败时 describeMicError 会提供精确诊断
  }
  // 只拦「真阉割的 App 内置壳」（微信/UC/夸克等）—— 这类改代码也救不了，直接引导换浏览器。
  // 厂商自带浏览器（小米/华为等）不在此拦，放行到下面的能力检测 + 实际 getUserMedia。
  if (typeof navigator !== 'undefined' && isTrueInAppShell(navigator.userAgent.toLowerCase())) return 'audio.use_system_browser';
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
  /** 16k mono PCM WAV — 从 AudioContext 直捕，零有损压缩。ASR 用这个，不用 blob。 */
  wav?: Blob;
}

export class AudioRecorder {
  private stream: MediaStream | null = null;
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private startTime = 0;
  private _state: 'idle' | 'recording' | 'done' = 'idle';
  private maxMs: number;
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private audioCtx: AudioContext | null = null;
  private pcmChunks: Float32Array[] = [];
  private _stopping = false;
  private onAutoStopCb: ((r: RecordingResult | null) => void) | null = null;
  private _pcmRate = 16000; // AudioContext 实际采样率，构造后读取，避免硬编码

  constructor(maxMs: number = 10000) {
    this.maxMs = maxMs;
  }

  get state() { return this._state; }

  /** 录满 maxMs 自动停时的回调。若不设置，超时自动停的录音结果会被静默丢弃。 */
  onAutoStop(cb: (r: RecordingResult | null) => void) { this.onAutoStopCb = cb; return this; }

  async start(): Promise<{ error?: string; errorType?: 'denied' | 'unavailable' }> {
    if (this._state === 'recording') return { error: '已经在录音' };
    const pre = precheckRecordingEnv();
    if (pre) return { error: pre, errorType: 'unavailable' };
    if (!isRecordingSupported()) return { error: 'audio.browser_unsupported', errorType: 'unavailable' };
    const mimeType = detectMimeType();

    try {
      // 关掉 echoCancellation / noiseSuppression：部分 Android 机型激进降噪会把
      // 韩语送气辅音(ㅊ/ㅋ/ㅌ/ㅍ)与紧音的高频爆音当噪声削掉，直接拉低 ASR 准确率。
      // 只保留 autoGainControl 拉平音量。ASR 场景要的是原始清晰的辅音特征，不是通话降噪。
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: true },
        });
      } catch (e1: any) {
        // 小米/华为等国产内核对非标准 audio 约束兼容差，带约束时会抛 NotAllowedError/OverconstrainedError，
        // 而最朴素的 { audio: true } 反而能成功。降级重试一次，救这类"权限其实开着却报未授权"的设备。
        const n1 = e1?.name || '';
        if (n1 === 'NotAllowedError' || n1 === 'PermissionDeniedError' || n1 === 'OverconstrainedError' || n1 === 'TypeError') {
          console.warn('[recorder] custom audio constraints rejected, retrying with plain {audio:true}', n1);
          this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        } else {
          throw e1;
        }
      }
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
    // 并行建一条 AudioContext → ScriptProcessor 管道直捕 16k PCM。
    // 绕过 MediaRecorder 的 Opus 有损压缩，送 ASR 时不丢辅音特征。
    // 失败不阻塞录音——PCM 捕获是优化，MediaRecorder blob 仍是可靠降级。
    this.pcmChunks = [];
    try {
      const Ctor = (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx: AudioContext = new Ctor({ sampleRate: 16000 });
      this.audioCtx = ctx;
      // 部分浏览器不按 sampleRate hint 创建（iOS/Safari 常强制 48k），读回真实采样率，
      // 让 WAV header 诚实标注：本地回放不变调，后端 ASR 也按头里的真实采样率解码。
      this._pcmRate = ctx.sampleRate;
      // iOS Safari 上此 context 建于 getUserMedia 的异步续段（已脱离用户手势栈），
      // 默认 suspended，onaudioprocess 不触发 → pcmChunks 恒空 → 退回 webm 有损往返。
      // 主动 resume 拉起来。resume 是 Promise，不阻塞录音主体。
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      const source = ctx.createMediaStreamSource(this.stream!);
      const scriptNode = ctx.createScriptProcessor(4096, 1, 1);
      scriptNode.onaudioprocess = (e) => {
        if (this._state !== 'recording') return;
        this.pcmChunks.push(new Float32Array(e.inputBuffer.getChannelData(0)));
      };
      // ScriptProcessor 需要连到 destination 才会触发 onaudioprocess，
      // 但直连会产生啸叫回授。用 GainNode 归零哑连。
      const muteGain = ctx.createGain();
      muteGain.gain.value = 0;
      source.connect(scriptNode);
      scriptNode.connect(muteGain);
      muteGain.connect(ctx.destination);
    } catch (e) {
      // PCM 捕获失败不影响录音主体（有 webm→WAV 降级），但记日志便于线上诊断质量退化
      console.warn('[recorder] PCM 直捕管道建立失败，降级 webm→WAV', e);
    }
    this.startTime = Date.now();
    this._state = 'recording';

    // 录满 maxMs 自动停：结果必须交给 onAutoStop 回调，否则录音数据被静默丢弃、
    // hook state 卡在 recording，用户再点停会误报「没听到声音」。
    this.timeoutId = setTimeout(() => {
      void this.stop().then((r) => this.onAutoStopCb?.(r));
    }, this.maxMs);
    return {};
  }

  async stop(): Promise<RecordingResult | null> {
    if (this._state !== 'recording' || !this.recorder || this._stopping) return null;
    this._stopping = true;
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
        // 合并 PCM chunks 编码成 16k mono WAV（零有损，给 ASR 用）
        let wav: Blob | undefined;
        if (this.pcmChunks.length > 0) {
          const totalLen = this.pcmChunks.reduce((s, c) => s + c.length, 0);
          const merged = new Float32Array(totalLen);
          let off = 0;
          for (const c of this.pcmChunks) { merged.set(c, off); off += c.length; }
          wav = floatToWav(merged, this._pcmRate);
        }
        this.cleanup();
        this._state = 'done';
        this._stopping = false;
        resolve({ blob, url, durationMs, wav });
      };
      this.recorder!.stop();
    });
    return result;
  }

  cancel(): void {
    if (this.timeoutId) { clearTimeout(this.timeoutId); this.timeoutId = null; }
    this._stopping = false;
    this.cleanup();
    this._state = 'idle';
  }

  private cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((t) => t.stop());
      this.stream = null;
    }
    this.recorder = null;
    if (this.audioCtx) {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
    this.pcmChunks = [];
  }
}

export function revokeRecording(url: string): void {
  URL.revokeObjectURL(url);
}
