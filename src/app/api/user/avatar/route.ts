import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getAuthFromCookie } from '@/lib/server/auth';

// 6-26 事故兜底：含鉴权 API 必须 force-dynamic
export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };
const MAX_BYTES = 500 * 1024; // 500KB

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

  // 存到 data/uploads/avatars/。data/ 是部署时受保护目录，重新部署不会被删。
  // 客户端已统一压成 JPEG，服务器只写 .jpg；文件名硬编码防目录穿越。
  const dir = path.join(process.cwd(), 'data', 'uploads', 'avatars');
  await fs.mkdir(dir, { recursive: true });
  const fileName = `${auth.userId}.jpg`;
  await fs.writeFile(path.join(dir, fileName), buf);

  const url = `/api/user/avatar/${fileName}?v=${Date.now()}`;
  return NextResponse.json({ ok: true, avatarUrl: url }, { headers: NO_STORE });
}
