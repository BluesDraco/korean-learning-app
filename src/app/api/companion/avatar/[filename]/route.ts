import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// 陪练头像公开可读，长缓存（文件名含时间戳天然唯一）
export const dynamic = 'force-dynamic';

const COMPANION_AVATAR_DIR = path.join(process.cwd(), 'data', 'uploads', 'companion');

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // 只允许 {userId}-{timestamp}.jpg 形式，防目录穿越
  if (!/^[a-zA-Z0-9-]+\.jpg$/.test(filename)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const filePath = path.join(COMPANION_AVATAR_DIR, filename);
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
