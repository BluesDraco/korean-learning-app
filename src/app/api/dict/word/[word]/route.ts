import { NextRequest, NextResponse } from 'next/server';
import { getWordEntry } from '@/lib/server/dict-loader';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ word: string }> }
) {
  const { word } = await params;
  const decoded = decodeURIComponent(word);
  const entry = getWordEntry(decoded);

  if (!entry) {
    return NextResponse.json({ error: '词条未找到' }, { status: 404 });
  }

  return NextResponse.json(entry);
}
