// Static audio registry — maps jamo, letters, and minimal-pair content to fixed audio files.
// All basic pronunciation MUST use static audio, never TTS (browser or AI).
// When audio is missing, callers MUST show "资源未准备好" instead of falling back to TTS.

type AudioEntry = {
  url: string;
  slowUrl?: string;        // Pre-recorded slow version; if absent, use playbackRate < 1
};

// Registry: keyed by Korean text (cleaned, normalized)
const registry = new Map<string, AudioEntry>();

/** Register a static audio entry */
export function registerAudio(key: string, entry: AudioEntry): void {
  registry.set(key.trim(), entry);
}

/** Bulk register from a map */
export function registerMany(entries: Record<string, AudioEntry>): void {
  for (const [k, v] of Object.entries(entries)) {
    registry.set(k.trim(), v);
  }
}

/** Get static audio URL for a given text. Returns null if no static audio is available. */
export function getStaticAudio(text: string): AudioEntry | null {
  return registry.get(text.trim()) || null;
}

/** Check if static audio is available for the given text */
export function hasStaticAudio(text: string): boolean {
  return registry.has(text.trim());
}

// ═══════════════════════════════════════
// Preloaded registry
// ═══════════════════════════════════════
// Add audio files as they are created:
//
// registerMany({
//   'ㅏ': { url: '/audio/letters/a.mp3' },
//   'ㅑ': { url: '/audio/letters/ya.mp3' },
//   'ㄱ': { url: '/audio/letters/giyeok.mp3' },
//   '가': { url: '/audio/syllables/ga.mp3' },
//   // ... 40 jamo + common syllables
// });
