import { NextResponse } from 'next/server';
import { getDb } from '@/lib/server/db';

export async function GET() {
  const startedAt = Date.now();
  try {
    const db = await getDb();
    await db.exec('SELECT 1');

    return NextResponse.json({
      ok: true,
      service: 'torikorean',
      database: 'ok',
      timestamp: new Date().toISOString(),
      latencyMs: Date.now() - startedAt,
    });
  } catch (_) {
    return NextResponse.json(
      {
        ok: false,
        service: 'torikorean',
        database: 'error',
        timestamp: new Date().toISOString(),
        latencyMs: Date.now() - startedAt,
      },
      { status: 500 }
    );
  }
}
