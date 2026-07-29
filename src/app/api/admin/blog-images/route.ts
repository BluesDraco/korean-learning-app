import { NextResponse } from 'next/server';
import { existsSync, promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getBlogAuthor } from '@/data/blogCast';
import { getNpcPostsUpToDay } from '@/lib/server/blogStatic';

export const dynamic = 'force-dynamic';

// NPC 帖配图：图存 public/images/blog/<slug>-<n>.jpg（进 git、随部署），
// slug→图清单存 git 跟踪的 src/data/blogImages.json（绕开 DB/data 部署黑洞）。
const BLOG_IMG_DIR = path.join(process.cwd(), 'public', 'images', 'blog');
const OVERRIDES_FILE = path.join(process.cwd(), 'src', 'data', 'blogImages.json');
const MAX_BYTES = 8 * 1024 * 1024;
const MAX_IMAGES = 10;
// 画廊比例边界（同 PostGallery）：竖图最高 4:5、横图最宽 1.91:1，区间内保原比例，超出裁切
const PORTRAIT_MIN = 0.8;
const LANDSCAPE_MAX = 1.91;
// 落盘长边上限，控制体积
const MAX_EDGE = 1440;
const NO_STORE = { 'Cache-Control': 'private, no-store' };

interface StoredImage { url: string; w: number; h: number }
type Overrides = Record<string, StoredImage[]>;

async function readOverrides(): Promise<Overrides> {
  try {
    const raw = await fs.readFile(OVERRIDES_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as Overrides) : {};
  } catch {
    return {};
  }
}
async function writeOverrides(data: Overrides): Promise<void> {
  await fs.writeFile(OVERRIDES_FILE, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

// slug 已由 seed 写死（w1-tori-departure 之类），只允许安全字符防路径穿越
function isSafeSlug(v: unknown): v is string {
  return typeof v === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(v);
}

// 列全部 NPC 帖（现从静态数据，权威来源），附标题/分类/Day/作者 + 当前配图
export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  // NPC 帖已静态化：全量取（day=Infinity），按 unlock_day/is_featured/slug 排序对齐旧 SQL
  const npc = getNpcPostsUpToDay(Infinity).slice().sort((a, b) =>
    a.unlockDay - b.unlockDay
    || (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
    || (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0),
  );
  const overrides = await readOverrides();

  const posts = npc.map((p) => {
    const authorId = p.authorId || 'tori';
    const author = getBlogAuthor(authorId);
    const images = (overrides[p.slug] ?? []).filter((im) => existsSync(path.join(BLOG_IMG_DIR, path.basename(im.url))));
    return {
      slug: p.slug,
      titleKo: p.titleKo ?? '',
      titleZh: p.titleZh ?? '',
      category: p.category ?? '',
      unlockDay: p.unlockDay,
      isFeatured: p.isFeatured,
      authorId,
      authorName: author.name,
      authorEmoji: author.emoji,
      images,
    };
  });

  const withImg = posts.filter((p) => p.images.length > 0).length;
  return NextResponse.json({ posts, total: posts.length, withImg }, { headers: NO_STORE });
}

// 上传一张图，追加到该帖图清单末尾。第一张=列表封面，全部=详情画廊。
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400, headers: NO_STORE });
  }

  const slug = form.get('slug');
  const file = form.get('file');
  if (!isSafeSlug(slug)) {
    return NextResponse.json({ error: 'slug 非法' }, { status: 400, headers: NO_STORE });
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

  const overrides = await readOverrides();
  const current = overrides[slug] ?? [];
  if (current.length >= MAX_IMAGES) {
    return NextResponse.json({ error: `每帖最多 ${MAX_IMAGES} 张图` }, { status: 400, headers: NO_STORE });
  }

  // 保原比例：只在超出画廊边界(4:5~1.91:1)时裁到边界，区间内不裁；再限制长边体积。
  let out: Buffer;
  let outW: number;
  let outH: number;
  try {
    const meta = await sharp(buf).metadata();
    const ow = meta.width ?? 0;
    const oh = meta.height ?? 0;
    if (!ow || !oh) throw new Error('no dims');
    const ar = Math.min(LANDSCAPE_MAX, Math.max(PORTRAIT_MIN, ow / oh));
    // 目标像素：按裁后比例，长边不超 MAX_EDGE
    let tw: number;
    let th: number;
    if (ar >= 1) { tw = Math.min(MAX_EDGE, ow); th = Math.round(tw / ar); }
    else { th = Math.min(MAX_EDGE, oh); tw = Math.round(th * ar); }
    out = await sharp(buf)
      .resize(tw, th, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    outW = tw;
    outH = th;
  } catch {
    return NextResponse.json({ error: '图片处理失败' }, { status: 400, headers: NO_STORE });
  }

  await fs.mkdir(BLOG_IMG_DIR, { recursive: true });
  // 文件名带序号 + 时间戳，避免同名覆盖导致 CDN/浏览器缓存旧图
  const fileName = `${slug}-${current.length + 1}-${Date.now()}.jpg`;
  await fs.writeFile(path.join(BLOG_IMG_DIR, fileName), out);

  const url = `/images/blog/${fileName}`;
  overrides[slug] = [...current, { url, w: outW, h: outH }];
  await writeOverrides(overrides);

  return NextResponse.json(
    { ok: true, images: overrides[slug], needDeploy: true },
    { headers: NO_STORE },
  );
}

// 删除某帖的某张图（按 url）：删文件 + 从清单移除。
export async function DELETE(req: Request) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  let body: { slug?: unknown; url?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400, headers: NO_STORE });
  }
  const { slug, url } = body;
  if (!isSafeSlug(slug) || typeof url !== 'string') {
    return NextResponse.json({ error: '参数非法' }, { status: 400, headers: NO_STORE });
  }

  const overrides = await readOverrides();
  const current = overrides[slug] ?? [];
  const next = current.filter((im) => im.url !== url);
  if (next.length === current.length) {
    return NextResponse.json({ error: '未找到该图' }, { status: 404, headers: NO_STORE });
  }

  // 删物理文件（basename 防穿越；文件不在也不报错）
  try {
    await fs.unlink(path.join(BLOG_IMG_DIR, path.basename(url)));
  } catch { /* 文件已不在，忽略 */ }

  if (next.length) overrides[slug] = next;
  else delete overrides[slug];
  await writeOverrides(overrides);

  return NextResponse.json({ ok: true, images: next, needDeploy: true }, { headers: NO_STORE });
}
