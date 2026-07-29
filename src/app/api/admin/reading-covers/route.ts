import { NextResponse } from 'next/server';
import { existsSync, promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { requireAdmin } from '@/lib/server/admin-guard';
import { readingArticles } from '@/data/reading-new';

export const dynamic = 'force-dynamic';

// 故事集封面：每个故事一张 3:4 纵版图，存 public/images/reading-covers/{id}.webp（进 git、随部署）。
// 前端 storyCover.ts 按 id 引用；缺图走 CSS 色块兜底。
const COVER_DIR = path.join(process.cwd(), 'public', 'images', 'reading-covers');
const MAX_BYTES = 8 * 1024 * 1024;
// 3:4 纵版 → 600×800
const OUT_W = 600;
const OUT_H = 800;
const NO_STORE = { 'Cache-Control': 'private, no-store' };

// 故事清单：topic 为 이야기（普通故事）或 금서（禁书暗线），都可配封面
function storyList() {
  return readingArticles
    .filter((a) => a.topic === '이야기' || a.topic === '금서')
    .map((a) => ({ id: a.id, title: a.title, titleKo: a.titleKo, emoji: a.emoji, level: a.level, forbidden: a.topic === '금서' }));
}
const VALID_IDS = new Set(storyList().map((s) => s.id));

// GET：返回全部故事 + 当前封面存在性
export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const stories = storyList().map((s) => {
    const exists = existsSync(path.join(COVER_DIR, `${s.id}.webp`));
    return { ...s, url: `/images/reading-covers/${s.id}.webp`, exists };
  });
  const withImg = stories.filter((s) => s.exists).length;
  return NextResponse.json({ stories, total: stories.length, withImg }, { headers: NO_STORE });
}

// POST：上传替换某故事封面。sharp 裁成 3:4 webp，同名覆盖写回。
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400, headers: NO_STORE });
  }

  const id = form.get('id');
  const file = form.get('file');
  if (typeof id !== 'string' || !VALID_IDS.has(id)) {
    return NextResponse.json({ error: 'id 非法' }, { status: 400, headers: NO_STORE });
  }
  if (!(file instanceof File) || !file.type.startsWith('image/')) {
    return NextResponse.json({ error: '需要图片文件' }, { status: 400, headers: NO_STORE });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.byteLength === 0 || buf.byteLength > MAX_BYTES) {
    return NextResponse.json({ error: '文件为空或超过 8MB' }, { status: 400, headers: NO_STORE });
  }
  // 魔数校验：JPEG(FF D8 FF) / PNG(89 50 4E 47) / WebP(RIFF....WEBP)
  const isJpeg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  const isWebp = buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46
    && buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50;
  if (!isJpeg && !isPng && !isWebp) {
    return NextResponse.json({ error: '仅支持 JPEG/PNG/WebP' }, { status: 400, headers: NO_STORE });
  }

  let out: Buffer;
  try {
    out = await sharp(buf)
      .resize(OUT_W, OUT_H, { fit: 'cover', position: 'attention' })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: '图片处理失败' }, { status: 400, headers: NO_STORE });
  }

  await fs.mkdir(COVER_DIR, { recursive: true });
  await fs.writeFile(path.join(COVER_DIR, `${id}.webp`), out);

  const publicUrl = `/images/reading-covers/${id}.webp`;
  return NextResponse.json(
    { ok: true, url: publicUrl, previewUrl: `${publicUrl}?t=${Date.now()}`, needDeploy: true },
    { headers: NO_STORE },
  );
}
