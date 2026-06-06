// validate-kpop-tracks.mjs — check audio exists, timeline ascending, empty fields, duration
// Usage: node scripts/validate-kpop-tracks.mjs

import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const COS_BASE = 'https://torikorean-1436752408.cos.ap-hongkong.myqcloud.com';

const issues = [];

async function checkUrl(url, label) {
  try {
    const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(10000) });
    return { ok: res.ok, status: res.status };
  } catch (e) {
    return { ok: false, status: e.message };
  }
}

function loadTracks() {
  // Read the built data — try kpopSongs.ts which has the raw data
  const dataPath = resolve(ROOT, 'src/data/kpopSongs.ts');
  if (!existsSync(dataPath)) {
    console.error('kpopSongs.ts not found');
    process.exit(1);
  }
  // Dynamic import won't work cleanly for .ts, so parse the exported array
  const raw = readFileSync(dataPath, 'utf-8');
  // Extract the array body
  const match = raw.match(/export\s+const\s+kpopSongs\s*=\s*(\[[\s\S]*\])\s*as\s+const/);
  if (!match) {
    console.error('Could not parse kpopSongs array');
    process.exit(1);
  }
  // Use Function constructor as a poor-man's eval (safe — it's our own source file)
  try {
    const fn = new Function(`return ${match[1]}`);
    return fn();
  } catch (e) {
    console.error('Failed to evaluate kpopSongs:', e.message);
    process.exit(1);
  }
}

function validateTrack(track, index) {
  const prefix = `[${index}] ${track.id}`;

  // Check required fields
  if (!track.id) issues.push(`${prefix}: missing id`);
  if (!track.title) issues.push(`${prefix}: missing title`);
  if (!track.artist) issues.push(`${prefix}: missing artist`);
  if (!track.videoId) issues.push(`${prefix}: missing videoId`);

  // Check lyrics
  if (!track.lyrics || track.lyrics.length === 0) {
    issues.push(`${prefix}: no lyrics`);
    return;
  }

  // Check timeline ascending
  for (let i = 0; i < track.lyrics.length; i++) {
    const line = track.lyrics[i];
    const start = line.start ?? 0;
    const end = line.end ?? start + 5;

    if (start < 0) issues.push(`${prefix}: line ${i} has negative start`);
    if (end <= start) issues.push(`${prefix}: line ${i} end (${end}) <= start (${start})`);

    // Check for empty Korean text
    if (!line.korean || line.korean.trim() === '') {
      issues.push(`${prefix}: line ${i} has empty korean`);
    }

    // Check timeline: each line should start after previous line's start
    if (i > 0) {
      const prev = track.lyrics[i - 1];
      const prevStart = prev.start ?? 0;
      if (start < prevStart) {
        issues.push(`${prefix}: line ${i} start (${start}) < line ${i-1} start (${prevStart}) — not ascending`);
      }
    }
  }

  // Check total duration (last line end should be reasonable)
  const lastLine = track.lyrics[track.lyrics.length - 1];
  const lastEnd = lastLine.end ?? (lastLine.start ?? 0) + 5;
  if (lastEnd > 600) {
    issues.push(`${prefix}: last line ends at ${lastEnd}s — song seems very long`);
  }
  if (lastEnd < 30) {
    issues.push(`${prefix}: last line ends at ${lastEnd}s — song seems very short`);
  }
}

async function main() {
  console.log('Validating Kpop tracks...\n');

  const tracks = loadTracks();
  console.log(`Found ${tracks.length} tracks\n`);

  for (let i = 0; i < tracks.length; i++) {
    validateTrack(tracks[i], i);
  }

  // Check audio availability (sample first 10)
  console.log('Checking audio availability (sample 10)...');
  const sample = tracks.slice(0, 10);
  let audioOk = 0;
  let audioMissing = 0;
  for (const t of sample) {
    const url = `${COS_BASE}/audio/kpop/${t.videoId || t.id}.webm`;
    const { ok } = await checkUrl(url, t.id);
    if (ok) audioOk++;
    else {
      audioMissing++;
      issues.push(`${t.id}: audio not found at ${url}`);
    }
  }
  console.log(`  Audio OK: ${audioOk}, Missing: ${audioMissing}`);

  // Report
  console.log(`\n${'='.repeat(60)}`);
  if (issues.length === 0) {
    console.log('All checks passed.');
  } else {
    console.log(`${issues.length} issue(s) found:\n`);
    for (const issue of issues) {
      console.log(`  ${issue}`);
    }
  }
}

main().catch(console.error);
