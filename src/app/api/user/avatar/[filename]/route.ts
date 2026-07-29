import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// 头像图片是"公开可读"（跟原来 public/uploads 静态文件同语义），无需鉴权
// 允许 CDN/浏览器缓存，靠 URL 上的 ?v=timestamp 打破缓存
export const dynamic = 'force-dynamic';

const AVATAR_DIR = path.join(process.cwd(), 'data', 'uploads', 'avatars');

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // 只允许 {userId}.jpg 形式，防目录穿越
  if (!/^[a-zA-Z0-9-]+\.jpg$/.test(filename)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const filePath = path.join(AVATAR_DIR, filename);
  try {
    const buf = await fs.readFile(filePath);
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}
