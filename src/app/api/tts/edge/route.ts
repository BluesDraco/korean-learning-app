import { NextResponse } from 'next/server';

const TTS_API = 'http://localhost:8800/tts';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text');
  const voice = searchParams.get('voice') || 'sunhi';
  const rate = searchParams.get('rate') || '+0%';

  if (!text) {
    return NextResponse.json({ error: 'text parameter required' }, { status: 400 });
  }

  const url = `${TTS_API}?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(voice)}&rate=${encodeURIComponent(rate)}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) {
      return NextResponse.json({ error: 'TTS upstream failed' }, { status: 502 });
    }
    const blob = await res.blob();
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'TTS upstream unreachable' }, { status: 502 });
  }
}
