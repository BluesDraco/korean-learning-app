// MediaRecorder wrapper for pronunciation practice.
// Handles mimeType detection, permissions, and blob lifecycle.
'use client';

const SUPPORTED_TYPES = [
  'audio/webm;codecs=opus',
  'audio/webm',
  'audio/mp4',
  'audio/wav',
];

let cachedMimeType: string | null = null;

function detectMimeType(): string | null {
  if (cachedMimeType) return cachedMimeType;
  for (const t of SUPPORTED_TYPES) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(t)) {
      cachedMimeType = t;
      return t;
    }
  }
  return null;
}

export function isRecordingSupported(): boolean {
  return typeof window !== 'undefined' && typeof MediaRecorder !== 'undefined' && detectMimeType() !== null;
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

  async start(): Promise<{ error?: string }> {
    if (this._state === 'recording') return { error: '已经在录音' };
    const mimeType = detectMimeType();
    if (!mimeType) return { error: '此浏览器不支持录音' };

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e: any) {
      if (e.name === 'NotAllowedError') return { error: '麦克风权限未开启，请在浏览器设置中允许' };
      return { error: '无法访问麦克风，请检查设备' };
    }

    this.chunks = [];
    this.recorder = new MediaRecorder(this.stream, { mimeType });
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

    const result = await new Promise<RecordingResult>((resolve) => {
      this.recorder!.onstop = () => {
        const blob = new Blob(this.chunks, { type: detectMimeType() || 'audio/webm' });
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
