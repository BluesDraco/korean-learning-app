// 简易答题音效 · Web Audio API 合成，无依赖、无 mp3
// correct/wrong 基础音；pop/chime/celebration 次要音（子关卡用）

import { isSoundEnabled } from '@/lib/soundManager';

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (ctx) {
    // 首次交互后可能 suspended，尽力恢复
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }
  try {
    const Ctor = (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext
      ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    return ctx;
  } catch { return null; }
}

function tone(freq: number, dur: number, type: OscillatorType, gain = 0.18, delay = 0): void {
  if (!isSoundEnabled()) return;
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

export function sfxCorrect(): void {
  // 上扬两音 C5 → E5
  tone(523, 0.14, 'sine', 0.2, 0);
  tone(659, 0.18, 'sine', 0.2, 0.08);
}

export function sfxWrong(): void {
  // 下沉一声 G3
  tone(196, 0.22, 'triangle', 0.18, 0);
}

// pop: 极短闷响，选项点击 / 卡片选中（低调不刺耳）
export function sfxPop(): void {
  tone(380, 0.045, 'sine', 0.05, 0);
}

// chime: 柔和铃音，星星点亮 / 阶段完成
export function sfxChime(pitch: 'low' | 'mid' | 'high' = 'mid'): void {
  const freq = pitch === 'low' ? 523 : pitch === 'high' ? 784 : 659;
  tone(freq, 0.45, 'sine', 0.09, 0);
}

// celebration: 4 音上升琶音，全 3 星达成
export function sfxCelebration(): void {
  [523, 659, 784, 1047].forEach((f, i) => {
    tone(f, 0.4, 'triangle', 0.16, i * 0.1);
  });
}
