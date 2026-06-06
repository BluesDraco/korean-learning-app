// Kpop progress tracking — localStorage first, API interface ready for backend migration
'use client';

export interface KpopLineRecording {
  id: string;
  songId: string;
  lineIndex: number;
  blobUrl: string;
  durationMs: number;
  attemptIndex: number;
  createdAt: number;
  _uploaded?: boolean;
}

export interface KpopSongProgress {
  songId: string;
  totalLines: number;
  practicedLines: number;
  completedLineIndices: number[];
  currentLineIndex: number;
  lastPracticedAt: number;
  totalRecordings: number;
}

// ── localStorage keys ──

const PROGRESS_PREFIX = 'kpop_progress:';
const RECORDING_PREFIX = 'kpop_recording:';

function progressKey(songId: string) { return PROGRESS_PREFIX + songId; }
function recordingKey(songId: string, lineIndex: number) { return `${RECORDING_PREFIX}${songId}:${lineIndex}`; }

// ── Progress API ──

export function getSongProgress(songId: string): KpopSongProgress | null {
  try {
    const raw = localStorage.getItem(progressKey(songId));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export async function saveSongProgress(progress: KpopSongProgress): Promise<void> {
  // Always update localStorage as cache
  try {
    localStorage.setItem(progressKey(progress.songId), JSON.stringify(progress));
  } catch { /* quota exceeded */ }
  // Sync to server (non-blocking)
  syncProgressToServer(progress);
}

export async function loadSongProgress(songId: string): Promise<KpopSongProgress | null> {
  // Try server first
  try {
    const res = await fetch(`/api/kpop/progress?songId=${encodeURIComponent(songId)}`);
    if (res.ok) {
      const data = await res.json();
      // API returns object for single song, array for all songs
      const r = Array.isArray(data) ? data[0] : data;
      if (r) {
        const p: KpopSongProgress = {
          songId: r.song_id || r.songId,
          totalLines: r.total_lines || r.totalLines || 0,
          practicedLines: r.practiced_lines || r.practicedLines || 0,
          completedLineIndices: Array.isArray(r.completed_line_indices || r.completedLineIndices)
            ? (r.completed_line_indices || r.completedLineIndices)
            : [],
          currentLineIndex: r.current_line_index ?? r.currentLineIndex ?? 0,
          lastPracticedAt: r.last_practiced_at || r.lastPracticedAt || 0,
          totalRecordings: r.total_recordings ?? r.totalRecordings ?? 0,
        };
        // Cache locally
        try { localStorage.setItem(progressKey(songId), JSON.stringify(p)); } catch {}
        return p;
      }
    }
  } catch { /* network error — fall through to localStorage */ }

  // Fallback to localStorage
  try {
    const raw = localStorage.getItem(progressKey(songId));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function initSongProgress(songId: string, totalLines: number): KpopSongProgress {
  const existing = getSongProgress(songId);
  if (existing) return existing;
  const p: KpopSongProgress = {
    songId,
    totalLines,
    practicedLines: 0,
    completedLineIndices: [],
    currentLineIndex: 0,
    lastPracticedAt: Date.now(),
    totalRecordings: 0,
  };
  saveSongProgress(p);
  return p;
}

export async function markLinePracticed(songId: string, lineIndex: number): Promise<void> {
  const p = getSongProgress(songId);
  if (!p) return;
  if (!p.completedLineIndices.includes(lineIndex)) {
    p.completedLineIndices.push(lineIndex);
    p.practicedLines = p.completedLineIndices.length;
  }
  p.currentLineIndex = lineIndex;
  p.lastPracticedAt = Date.now();
  await saveSongProgress(p);
}

export function getAllSongProgress(): KpopSongProgress[] {
  try {
    const results: KpopSongProgress[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(PROGRESS_PREFIX)) {
        const raw = localStorage.getItem(key);
        if (raw) results.push(JSON.parse(raw));
      }
    }
    return results.sort((a, b) => b.lastPracticedAt - a.lastPracticedAt);
  } catch { return []; }
}

// ── Recording API ──

export async function saveLineRecording(songId: string, lineIndex: number, blob: Blob, durationMs: number): Promise<KpopLineRecording> {
  // Revoke previous recording URL for this line
  deleteLineRecording(songId, lineIndex);

  const id = `${songId}:${lineIndex}:${Date.now()}`;
  const url = URL.createObjectURL(blob);
  const existing = getSongProgress(songId);
  const recording: KpopLineRecording = {
    id,
    songId,
    lineIndex,
    blobUrl: url,
    durationMs,
    attemptIndex: existing?.totalRecordings ?? 0,
    createdAt: Date.now(),
  };

  // Increment recording counter (this is where recordings actually happen)
  if (existing) {
    existing.totalRecordings++;
    saveSongProgress(existing);
  }

  // Store metadata only (no base64 — server is the source of truth)
  try {
    localStorage.setItem(recordingKey(songId, lineIndex), JSON.stringify({
      id,
      songId,
      lineIndex,
      durationMs,
      attemptIndex: recording.attemptIndex,
      createdAt: recording.createdAt,
    }));
  } catch { /* quota exceeded */ }

  // Primary persistence: upload to server
  const uploaded = await uploadRecordingToServer(songId, lineIndex, blob, durationMs);

  return { ...recording, _uploaded: uploaded };
}

export function getLineRecording(songId: string, lineIndex: number): KpopLineRecording | null {
  try {
    const raw = localStorage.getItem(recordingKey(songId, lineIndex));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export async function fetchLineRecordingFromServer(songId: string, lineIndex: number): Promise<KpopLineRecording | null> {
  try {
    const res = await fetch(`/api/kpop/recording?songId=${encodeURIComponent(songId)}&lineIndex=${encodeURIComponent(lineIndex)}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (!data) return null;
    // Reconstruct blobUrl from download endpoint
    const blobUrl = `/api/kpop/recording?download=1&songId=${encodeURIComponent(songId)}&lineIndex=${encodeURIComponent(lineIndex)}`;
    return {
      id: data.id || `${songId}:${lineIndex}`,
      songId,
      lineIndex,
      blobUrl,
      durationMs: data.durationMs || data.duration_ms || 0,
      attemptIndex: data.attemptIndex || 0,
      createdAt: data.createdAt || data.created_at || Date.now(),
    };
  } catch { return null; }
}

export function deleteLineRecording(songId: string, lineIndex: number): void {
  const existing = getLineRecording(songId, lineIndex);
  if (existing?.blobUrl && existing.blobUrl.startsWith('blob:')) {
    URL.revokeObjectURL(existing.blobUrl);
  }
  try { localStorage.removeItem(recordingKey(songId, lineIndex)); } catch { /* ignore */ }
}

// ── Server sync ──

export async function syncProgressToServer(progress: KpopSongProgress): Promise<boolean> {
  try {
    const res = await fetch('/api/kpop/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        songId: progress.songId,
        totalLines: progress.totalLines,
        practicedLines: progress.practicedLines,
        completedLineIndices: progress.completedLineIndices,
        currentLineIndex: progress.currentLineIndex,
        totalRecordings: progress.totalRecordings,
        totalPracticeSeconds: 0,
        status: progress.practicedLines >= progress.totalLines ? 'completed' : 'in_progress',
      }),
    });
    return res.ok;
  } catch { return false; }
}

export async function fetchProgressFromServer(): Promise<KpopSongProgress[]> {
  try {
    const res = await fetch('/api/kpop/progress');
    if (!res.ok) return [];
    const rows = await res.json();
    return (rows || []).map((r: any) => ({
      songId: r.song_id || r.songId,
      totalLines: r.total_lines || r.totalLines || 0,
      practicedLines: r.practiced_lines || r.practicedLines || 0,
      completedLineIndices: Array.isArray(r.completed_lines || r.completedLineIndices)
        ? (r.completed_lines || r.completedLineIndices)
        : [],
      currentLineIndex: r.current_line_index ?? r.currentLineIndex ?? 0,
      lastPracticedAt: r.last_practiced_at || r.lastPracticedAt || 0,
      totalRecordings: r.total_recordings ?? r.totalRecordings ?? 0,
    }));
  } catch { return []; }
}

export async function uploadRecordingToServer(
  songId: string,
  lineIndex: number,
  blob: Blob,
  durationMs: number,
): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append('audio', blob, `recording-${lineIndex}.webm`);
    formData.append('songId', songId);
    formData.append('lineIndex', String(lineIndex));
    formData.append('durationMs', String(durationMs));

    const res = await fetch('/api/kpop/recording', {
      method: 'POST',
      body: formData,
    });
    return res.ok;
  } catch { return false; }
}

export async function deleteRecordingFromServer(songId: string, lineIndex: number): Promise<boolean> {
  try {
    const res = await fetch(`/api/kpop/recording?songId=${encodeURIComponent(songId)}&lineIndex=${encodeURIComponent(lineIndex)}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch { return false; }
}

// ── Backend store interfaces ──

export interface KpopProgressStore {
  get(songId: string): Promise<KpopSongProgress | null>;
  save(progress: KpopSongProgress): Promise<void>;
  listAll(): Promise<KpopSongProgress[]>;
}

export interface KpopRecordingStore {
  save(songId: string, lineIndex: number, blob: Blob, durationMs: number): Promise<KpopLineRecording>;
  get(songId: string, lineIndex: number): Promise<KpopLineRecording | null>;
  remove(songId: string, lineIndex: number): Promise<void>;
}
