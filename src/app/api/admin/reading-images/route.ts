import { NextResponse } from 'next/server';
import { existsSync, promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { requireAdmin } from '@/lib/server/admin-guard';

export const dynamic = 'force-dynamic';

// 阅读文章主题图：6 个主题各一张，同主题所有文章卡片共用。
// 图存 public/images/reading-topics/（进 git、随部署），文件名与 reading 模块的 topicImage.ts 写死映射一致。
// 这里独立定义映射，不 import reading 模块文件（避免与该模块并行改动耦合）。
const TOPIC_IMG_DIR = path.join(process.cwd(), 'public', 'images', 'reading-topics');
const MAX_BYTES = 8 * 1024 * 1024;
// hero 横 16:9 → 1200×675（同 topicImage.ts 注释规格）
const OUT_W = 1200;
const OUT_H = 675;
const NO_STORE = { 'Cache-Control': 'private, no-store' };

// 主题 → 固定文件名（与 src/app/reading/_components/topicImage.ts 保持一致）
const TOPICS: { topic: string; file: string }[] = [
  { topic: '文化', file: 'topic-culture.webp' },
  { topic: '生活', file: 'topic-life.webp' },
  { topic: '旅行', file: 'topic-travel.webp' },
  { topic: '社会', file: 'topic-society.webp' },
  { topic: 'KPOP', file: 'topic-kpop.webp' },
  { topic: '韩剧', file: 'topic-drama.webp' },
];
const FILE_BY_TOPIC = new Map(TOPICS.map((t) => [t.topic, t.file]));

// GET：返回 6 个主题 + 当前图存在性
export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const topics = TOPICS.map((t) => {
    const exists = existsSync(path.join(TOPIC_IMG_DIR, t.file));
    return {
      topic: t.topic,
      file: t.file,
      url: `/images/reading-topics/${t.file}`,
      exists,
    };
  });
  const withImg = topics.filter((t) => t.exists).length;
  return NextResponse.json({ topics, total: topics.length, withImg }, { headers: NO_STORE });
}

// POST：上传替换某主题图。sharp 转 16:9 webp，同名覆盖写回。
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400, headers: NO_STORE });
  }

  const topic = form.get('topic');
  const file = form.get('file');
  if (typeof topic !== 'string' || !FILE_BY_TOPIC.has(topic)) {
    return NextResponse.json({ error: 'topic 非法' }, { status: 400, headers: NO_STORE });
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

  await fs.mkdir(TOPIC_IMG_DIR, { recursive: true });
  const fileName = FILE_BY_TOPIC.get(topic)!;
  await fs.writeFile(path.join(TOPIC_IMG_DIR, fileName), out);

  const publicUrl = `/images/reading-topics/${fileName}`;
  return NextResponse.json(
    { ok: true, url: publicUrl, previewUrl: `${publicUrl}?t=${Date.now()}`, needDeploy: true },
    { headers: NO_STORE },
  );
}
