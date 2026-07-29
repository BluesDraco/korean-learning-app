import { NextResponse } from 'next/server';
import { getEpisodeById } from '@/lib/server/radioData';

// 单期完整数据（含 subtitles/vocab）。内容静态，可缓存。
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ep = getEpisodeById(id);
  if (!ep) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }
  return NextResponse.json(ep);
}
