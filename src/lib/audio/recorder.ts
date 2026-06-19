// MediaRecorder wrapper for pronunciation practice.
// Handles mimeType detection, permissions, and blob lifecycle.
'use client';

const SUPPORTED_TYPES = [
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/mp4',
  'audio/wav',
  '',
];

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
    if (!isRecordingSupported()) return { error: '此浏览器不支持录音', errorType: 'unavailable' };
    const mimeType = detectMimeType();

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e: any) {
      if (e.name === 'NotAllowedError' || e.name === 'PermissionDeniedError') {
        return { error: '麦克风权限未开启，请在浏览器设置中允许', errorType: 'denied' };
      }
      return { error: '无法访问麦克风，请检查设备', errorType: 'unavailable' };
    }

    this.chunks = [];
    this.recorder = mimeType
      ? new MediaRecorder(this.stream, { mimeType })
      : new MediaRecorder(this.stream);
    this.recorder.ondataavailable = (e) => { if (e.data.size > 0) this.chunks.push(e.data); };
    this.recorder.start();
    this.startTime = Date.now();
    this._state = 'recording';

    this.timeoutId = setTimeout(() => this.stop(), this.maxMs);
    return {};
  }

  async stop(): Promise<RecordingResult | null> {
    if (this._state !== 'recording' || !this.recorder) return null;
    if (this.timeoutId) { clearTimeout(this.timeoutId); this.timeoutId = null; }
    const actualMimeType = this.recorder.mimeType;

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
