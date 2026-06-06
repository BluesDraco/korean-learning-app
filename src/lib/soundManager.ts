// Lightweight sound manager using Web Audio API tones.
// No external audio files needed. Real mp3 files can replace these later.
// All sounds are very low volume, respect user preference, and throttle overlap.

const STORAGE_KEY = 'tori_sound_enabled';
const VOLUME = 0.12;
const THROTTLE_MS = 150;

let audioCtx: AudioContext | null = null;
let enabled: boolean | null = null;
const lastPlayed: Record<string, number> = {};

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    try { audioCtx = new AudioContext(); } catch { return null; }
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  if (enabled === null) {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    enabled = stored === null ? true : stored === 'true';
  }
  return enabled;
}

export function setSoundEnabled(v: boolean): void {
  enabled = v;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, String(v));
  }
}

function throttled(key: string): boolean {
  const now = Date.now();
  const last = lastPlayed[key] || 0;
  if (now - last < THROTTLE_MS) return true;
  lastPlayed[key] = now;
  return false;
}

function playTone(freq: number, duration: number, type: OscillatorType = 'sine', rampDown = true): void {
  if (!isSoundEnabled()) return;
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(VOLUME, ctx.currentTime);
    if (rampDown) {
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    }
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch { /* audio not critical */ }
}

export function playClick(): void {
  if (throttled('click')) return;
  playTone(800, 0.06, 'sine');
}

export function playSuccess(): void {
  if (throttled('success')) return;
  const ctx = getCtx();
  if (!ctx || !isSoundEnabled()) return;
  try {
    [523, 659, 784].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.1);
      gain.gain.setValueAtTime(VOLUME, ctx.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + i * 0.1 + 0.15);
    });
  } catch { /* audio not critical */ }
}

export function playError(): void {
  if (throttled('error')) return;
  playTone(200, 0.25, 'square');
}

export function playComplete(): void {
  if (throttled('complete')) return;
  const ctx = getCtx();
  if (!ctx || !isSoundEnabled()) return;
  try {
    [523, 659, 784, 1047].forEach((f, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, ctx.currentTime + i * 0.12);
      gain.gain.setValueAtTime(VOLUME, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.2);
    });
  } catch { /* audio not critical */ }
}

export function playRecordStart(): void {
  if (throttled('record')) return;
  playTone(440, 0.1, 'sine');
}

export function playRecordStop(): void {
  if (throttled('record')) return;
  playTone(660, 0.08, 'sine');
}
