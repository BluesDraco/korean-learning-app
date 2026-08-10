/**
 * SRT subtitle parser — parses SRT format into structured data.
 */
export interface SrtEntry {
  [k: string]: unknown;
  index: number;
  start: number; // seconds
  end: number;   // seconds
  text: string;
}

function parseTimestamp(ts: string): number {
  // "00:01:23,456" → seconds
  const match = ts.match(/^(\d{2}):(\d{2}):(\d{2})[,.](\d{3})$/);
  if (!match) return 0;
  const h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const s = parseInt(match[3], 10);
  const ms = parseInt(match[4], 10);
  return h * 3600 + m * 60 + s + ms / 1000;
}

/**
 * Parse SRT text content into an array of entries sorted by start time.
 */
export function parseSrt(srtText: string): SrtEntry[] {
  const normalized = srtText.replace(/\r\n/g, '\n').trim();
  const blocks = normalized.split(/\n\s*\n/);
  const entries: SrtEntry[] = [];

  for (const block of blocks) {
    const lines = block.trim().split('\n');
    if (lines.length < 3) continue;

    const index = parseInt(lines[0].trim(), 10);
    if (isNaN(index)) continue;

    const timeMatch = lines[1].match(
      /(\d{2}:\d{2}:\d{2}[,.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,.]\d{3})/
    );
    if (!timeMatch) continue;

    const start = parseTimestamp(timeMatch[1]);
    const end = parseTimestamp(timeMatch[2]);
    const text = lines.slice(2).join('\n').replace(/<[^>]*>/g, '').trim();

    entries.push({ index, start, end, text });
  }

  return entries.sort((a, b) => a.start - b.start);
}

/**
 * Parse bilingual SRT where Korean and Chinese are on separate lines
 * within the same block. Returns paired entries.
 *
 * Common format:
 * 1
 * 00:00:01,000 --> 00:00:03,000
 * 안녕하세요
 * 你好
 *
 * If only one text line, translation field will be empty.
 */
export function parseBilingualSrt(srtText: string): { entries: SrtEntry[]; isBilingual: boolean } {
  const entries = parseSrt(srtText);
  const bilingualEntries: SrtEntry[] = [];
  let isBilingual = false;

  for (const entry of entries) {
    const lines = entry.text.split('\n').filter((l) => l.trim());
    if (lines.length >= 2 && /[가-힣]/.test(lines[0]) && /[一-鿿]/.test(lines[1])) {
      // Korean on first line, Chinese on second
      isBilingual = true;
      bilingualEntries.push({
        ...entry,
        text: lines[0].trim(),
        // We store Chinese separately in caller
      });
    } else if (lines.length >= 2 && /[一-鿿]/.test(lines[0]) && /[가-힣]/.test(lines[1])) {
      // Chinese on first, Korean on second — still bilingual
      isBilingual = true;
      bilingualEntries.push({
        ...entry,
        text: lines[1].trim(),
      });
    } else {
      bilingualEntries.push(entry);
    }
  }

  return { entries: bilingualEntries, isBilingual };
}

/**
 * Generate simple SRT from an array of entries (for export or Whisper response parsing).
 */
export function toSrt(entries: SrtEntry[]): string {
  return entries
    .map((e, i) => {
      const start = formatSrtTime(e.start);
      const end = formatSrtTime(e.end);
      return `${i + 1}\n${start} --> ${end}\n${e.text}\n`;
    })
    .join('\n');
}

function formatSrtTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 1000);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
}
