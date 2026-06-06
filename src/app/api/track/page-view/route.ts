import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';
import { getAuthFromCookie, generateId } from '@/lib/server/auth';

const BOT_PATTERNS = [
  /bot/i, /crawler/i, /spider/i, /scraper/i, /headless/i,
  /selenium/i, /puppeteer/i, /playwright/i,
];

function isBot(ua: string): boolean {
  if (!ua) return false;
  return BOT_PATTERNS.some((p) => p.test(ua));
}

// In-memory throttle: path+uid → last recorded timestamp
const throttleMap = new Map<string, number>();
const THROTTLE_MS = 30_000;
const MAX_MAP_SIZE = 5000;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { path: pagePath, referrer, userAgent } = body;

    if (!pagePath) {
      return NextResponse.json({ success: false, reason: 'missing path' }, { status: 400 });
    }

    const ua = String(userAgent || '');
    if (isBot(ua)) {
      return NextResponse.json({ success: true, skipped: 'bot' });
    }

    const auth = await getAuthFromCookie();
    const uid = auth?.userId || 'anon';
    const throttleKey = `${uid}:${pagePath}`;
    const lastRecorded = throttleMap.get(throttleKey);
    const now = Date.now();

    if (lastRecorded && now - lastRecorded < THROTTLE_MS) {
      return NextResponse.json({ success: true, skipped: 'throttled' });
    }

    if (throttleMap.size >= MAX_MAP_SIZE) {
      // Clear old entries (simple eviction: wipe half)
      const entries = [...throttleMap.entries()];
      entries.sort((a, b) => a[1] - b[1]);
      for (let i = 0; i < Math.floor(entries.length / 2); i++) {
        throttleMap.delete(entries[i][0]);
      }
    }
    throttleMap.set(throttleKey, now);

    const db = await getDb();
    await db.run(
      `INSERT INTO page_views (id, user_id, path, referrer, user_agent, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [generateId(), uid, pagePath, referrer || '', ua, now]
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, reason: 'internal error' }, { status: 500 });
  }
}
