import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getAuthFromCookie } from '@/lib/server/auth';
import { COMPANION_AVATAR_DIR } from '@/lib/server/companionAvatar';

// 6-26 事故兜底：含鉴权 API 必须 force-dynamic
export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };
const MAX_BYTES = 500 * 1024; // 500KB，客户端已压成 JPEG

// POST — 陪练头像上传（用户可传自担照）。返回可读 URL。
export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: '未登录' }, { status: 401, headers: NO_STORE });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400, headers: NO_STORE });
  }

  const file = form.get('file');
  if (!(file instanceof File) || !file.type.startsWith('image/')) {
    return NextResponse.json({ error: '需要图片文件' }, { status: 400, headers: NO_STORE });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.byteLength === 0 || buf.byteLength > MAX_BYTES) {
    return NextResponse.json({ error: '文件为空或超过 500KB' }, { status: 400, headers: NO_STORE });
  }

  // MIME 可伪造，校验魔数：只接 JPEG(FF D8 FF) / PNG(89 50 4E 47)，落盘统一转 .jpg。
  const isJpeg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  if (!isJpeg && !isPng) {
    return NextResponse.json({ error: '仅支持 JPEG/PNG 图片' }, { status: 400, headers: NO_STORE });
  }

  // 存到 data/uploads/companion/（部署受保护目录）。文件名 {userId}-{timestamp}.jpg，防穿越 + 一人可多图。
  await fs.mkdir(COMPANION_AVATAR_DIR, { recursive: true });
  const fileName = `${auth.userId}-${Date.now()}.jpg`;
  await fs.writeFile(path.join(COMPANION_AVATAR_DIR, fileName), buf);

  const url = `/api/companion/avatar/${fileName}`;
  return NextResponse.json({ ok: true, avatarUrl: url }, { headers: NO_STORE });
}
