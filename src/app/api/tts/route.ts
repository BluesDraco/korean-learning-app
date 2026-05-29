import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, rate = '1.0' } = await req.json();
    if (!text || text.length > 500) {
      return NextResponse.json({ error: 'Text too long or empty' }, { status: 400 });
    }

    const url = `https://fanyi.sogou.com/reventondc/tts?text=${encodeURIComponent(text)}&lang=ko-KR`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/131.0.0.0' },
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    if (!res.ok) {
      return NextResponse.json({ error: 'TTS fetch failed' }, { status: 502 });
    }

    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=86400' },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
