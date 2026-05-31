import { speak as rawSpeak, cancelSpeech } from '@/lib/tts';

/** Speak with no cooldown — callers handle debounce via request sequencing. */
export async function lessonSpeak(text: string, rate: number = 0.75): Promise<boolean> {
  if (!text) return false;
  try {
    await rawSpeak(text, rate);
    return true;
  } catch {
    return false;
  }
}

export function lessonCancelSpeech(): void {
  cancelSpeech();
}
