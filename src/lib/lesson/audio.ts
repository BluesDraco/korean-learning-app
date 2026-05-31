import { speak as rawSpeak, cancelSpeech } from '@/lib/tts';

const audioCache = new Map<string, boolean>();
const COOLDOWN_MS = 400;
let lastSpeakTime = 0;

/** Debounced speak with cooldown. Returns true if played, false if throttled. */
export async function lessonSpeak(text: string, rate: number = 0.75): Promise<boolean> {
  if (!text) return false;

  const now = Date.now();
  if (now - lastSpeakTime < COOLDOWN_MS) return false;
  lastSpeakTime = now;

  cancelSpeech();
  await rawSpeak(text, rate);
  return true;
}

/** Cancel any active speech */
export function lessonCancelSpeech(): void {
  cancelSpeech();
}

/** Check if a word is in the TTS cache (for common words, avoid re-fetch) */
export function isWordCached(word: string): boolean {
  return audioCache.has(word);
}

/** Mark a word as cached */
export function markWordCached(word: string): void {
  audioCache.set(word, true);
}
