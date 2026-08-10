'use client';

const GUEST_KEYS = {
  words: 'guest_words',
  sentences: 'guest_sentences',
  recordingsMeta: 'guest_recordings_meta',
};

export interface GuestData {
  [k: string]: unknown;
  words: unknown[];
  sentences: unknown[];
  recordingsMeta: unknown[];
  hasAny: boolean;
}

export function getGuestData(): GuestData {
  const result: GuestData = { words: [], sentences: [], recordingsMeta: [], hasAny: false };
  try {
    for (const [key, lsKey] of Object.entries(GUEST_KEYS)) {
      const raw = localStorage.getItem(lsKey);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          (result as any)[key] = Array.isArray(parsed) ? parsed : [parsed];
          result.hasAny = true;
        } catch { /* ignore malformed */ }
      }
    }
  } catch { /* localStorage unavailable */ }
  return result;
}

export async function migrateGuestData(): Promise<{ synced: number; errors: number }> {
  const guest = getGuestData();
  if (!guest.hasAny) return { synced: 0, errors: 0 };

  let synced = 0;
  let errors = 0;

  // Sync words
  for (const word of guest.words) {
    try {
      const res = await fetch('/api/user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', table: 'words', data: word }),
      });
      if (res.ok) synced++;
      else errors++;
    } catch { errors++; }
  }

  // Sync sentences
  for (const sentence of guest.sentences) {
    try {
      const res = await fetch('/api/user-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', table: 'sentences', data: sentence }),
      });
      if (res.ok) synced++;
      else errors++;
    } catch { errors++; }
  }

  // Clear guest keys after successful sync
  if (synced > 0) {
    try {
      for (const key of Object.values(GUEST_KEYS)) {
        localStorage.removeItem(key);
      }
    } catch { /* ignore */ }
  }

  return { synced, errors };
}

export function hasGuestData(): boolean {
  return getGuestData().hasAny;
}
