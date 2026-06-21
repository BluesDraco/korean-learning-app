import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch';
import { getAuthFromCookie } from '@/lib/server/auth';

const DASHSCOPE_KEY = process.env.DASHSCOPE_API_KEY;
const ENDPOINT = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation';

export async function POST(req: Request) {
  if (!DASHSCOPE_KEY) {
    return NextResponse.json({ error: 'Qwen TTS not configured' }, { status: 500 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const text: string = body.text || '';
    const voice: string = body.voice || 'Cherry';
    const speechRate: number = body.speechRate || 1.0;

    if (!text || text.length > 600) {
      return NextResponse.json({ error: 'Text required (max 600 chars)' }, { status: 400 });
    }

    // Step 1: Call Qwen3-TTS to generate audio
    const ttsRes = await fetchWithTimeout(ENDPOINT, {
      timeoutMs: 15_000,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DASHSCOPE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'qwen3-tts-flash',
        input: {
          text,
          voice,
          language_type: 'Korean',
        },
        parameters: {
          speech_rate: speechRate,
        },
      }),
    });

    if (!ttsRes.ok) {
      const err = await ttsRes.text().catch(() => 'unknown');
      return NextResponse.json({ error: `Qwen TTS error: ${ttsRes.status}` }, { status: 502 });
    }

    const ttsData = await ttsRes.json();
    const audioUrl: string | undefined = ttsData?.output?.audio?.url;

    if (!audioUrl) {
      return NextResponse.json({ error: 'No audio URL in Qwen response' }, { status: 502 });
    }

    // Step 2: Download the audio from the OSS URL
    const audioRes = await fetchWithTimeout(audioUrl, {
      timeoutMs: 10_000,
    });

    if (!audioRes.ok) {
      return NextResponse.json({ error: `Audio download failed: ${audioRes.status}` }, { status: 502 });
    }

    const audioBuffer = await audioRes.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (e: any) {
    if (e.name === 'AbortError' || e.name === 'FetchTimeoutError') {
      return NextResponse.json({ error: 'Qwen TTS timeout' }, { status: 504 });
    }
    return NextResponse.json({ error: 'TTS service error' }, { status: 500 });
  }
}
