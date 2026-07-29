'use client';

// 练习通用音效 · 统一转发到 soundManager，保证全站音色一致 + 尊重用户的音效开关。
// 历史上本文件曾是独立的 WebAudio 合成实现，但它不检查 isSoundEnabled，
// 导致关掉音效后打字/口语/默写/闪卡仍会响。现改为转发层，废弃独立实现。
import { playSuccess, playError, playComplete as playCompleteSound } from '@/lib/soundManager';

/** 答对 */
export function playCorrectSound() {
  playSuccess();
}

/** 答错 */
export function playWrongSound() {
  playError();
}

/** 完成一轮 */
export function playComplete() {
  playCompleteSound();
}
