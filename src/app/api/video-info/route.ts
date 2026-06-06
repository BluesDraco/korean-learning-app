import { NextResponse } from 'next/server';
import { fetchWithTimeout } from '@/lib/fetch';
import { getAuthFromCookie } from '@/lib/server/auth';

export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json().catch(() => ({}));
    const url: string = body.url || '';

    if (!url) {
      return NextResponse.json({ error: 'URL required' }, { status: 400 });
    }

    // Detect platform
    let platform: 'bilibili' | 'youtube' | 'unknown' = 'unknown';
    let platformId = '';
    let title = '';
    let thumbnail = '';

    // B站
    const bvMatch = url.match(/BV[a-zA-Z0-9]{10,12}/);
    const avMatch = url.match(/av(\d+)/i);
    if (bvMatch || avMatch) {
      platform = 'bilibili';
      platformId = bvMatch ? bvMatch[0] : `av${avMatch![1]}`;

      try {
        const res = await fetchWithTimeout(
          `https://api.bilibili.com/x/web-interface/view?bvid=${platformId}`,
          {
            timeoutMs: 8000,
            headers: {
              'Referer': 'https://www.bilibili.com',
              'User-Agent': 'Mozilla/5.0',
            },
          }
        );
        if (res.ok) {
          const json = await res.json();
          if (json.code === 0) {
            title = json.data.title;
            thumbnail = json.data.pic;
          }
        }
      } catch {}
    }

    // B站短链接 b23.tv
    const b23Match = url.match(/b23\.tv\/([a-zA-Z0-9]+)/);
    if (b23Match && platform === 'unknown') {
      try {
        const redirectRes = await fetch(`https://b23.tv/${b23Match[1]}`, { redirect: 'manual' });
        const location = redirectRes.headers.get('location') || '';
        const realBv = location.match(/BV[a-zA-Z0-9]{10,12}/);
        if (realBv) {
          platform = 'bilibili';
          platformId = realBv[0];
          const res = await fetchWithTimeout(
            `https://api.bilibili.com/x/web-interface/view?bvid=${platformId}`,
            { timeoutMs: 8000, headers: { 'Referer': 'https://www.bilibili.com', 'User-Agent': 'Mozilla/5.0' } }
          );
          if (res.ok) {
            const json = await res.json();
            if (json.code === 0) {
              title = json.data.title;
              thumbnail = json.data.pic;
            }
          }
        }
      } catch {}
    }

    // YouTube
    if (platform === 'unknown') {
      const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
      const ytShort = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
      const ytId = ytMatch?.[1] || ytShort?.[1];
      if (ytId) {
        platform = 'youtube';
        platformId = ytId;
        try {
          const res = await fetchWithTimeout(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${ytId}&format=json`,
            { timeoutMs: 8000 }
          );
          if (res.ok) {
            const json = await res.json();
            title = json.title;
            thumbnail = json.thumbnail_url;
          }
        } catch {}
      }
    }

    return NextResponse.json({ platform, platformId, title, thumbnail });
  } catch (e: any) {
    console.error('[video-info]', e);
    return NextResponse.json({ error: '视频信息获取失败，请检查链接后重试' }, { status: 500 });
  }
}
