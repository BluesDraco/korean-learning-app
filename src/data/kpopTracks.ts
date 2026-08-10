// Static KPOP track library removed.
// P1 local karaoke uses user-imported audio + DeepSeek generated lyrics.
// These stubs are kept for TS compatibility with pages that haven't been migrated yet.

import type { KpopTrack } from '@/types/kpop';

export function getAllTracks(): KpopTrack[] {
  return [];
}

export function getTrackById(_id: string): KpopTrack | undefined {
  return undefined;
}

export function getTracksByLevel(_level: KpopTrack['level']): KpopTrack[] {
  return [];
}

export function searchTracks(_q: string): KpopTrack[] {
  return [];
}
