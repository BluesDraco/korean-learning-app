import { NextResponse } from 'next/server';
import { existsSync, promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { requireAdmin } from '@/lib/server/admin-guard';
import { getDay } from '@/data/diary';
import type { ToriLevel, ToriImageKind } from '@/types/tori-diary';

export const dynamic = 'force-dynamic';

const LEVELS: ToriLevel[] = ['beginner', 'intermediate', 'advanced'];
const LEVEL_LABEL: Record<ToriLevel, string> = {
  beginner: '入门篇',
  intermediate: '进阶篇',
  advanced: '高级篇',
};
// 全局图片编号偏移：文件名/图片路径用连续编号，beginner=0 intermediate=+30 advanced=+60
const LEVEL_OFFSET: Record<ToriLevel, number> = {
  beginner: 0,
  intermediate: 30,
  advanced: 60,
};
const DAYS_PER_LEVEL = 30;
const DIARY_IMG_DIR = path.join(process.cwd(), 'public', 'images', 'diary');
const MAX_BYTES = 8 * 1024 * 1024;
// hero 横 16:9 → 1280×720；scene 竖 9:16 → 900×1600
const KIND_CONF: Record<ToriImageKind, { w: number; h: number }> = {
  hero: { w: 1280, h: 720 },
  scene: { w: 900, h: 1600 },
};
const NO_STORE = { 'Cache-Control': 'private, no-store' };

// level 内 day(1-30) → 全局图片编号(2 位补零)
function globalNo(level: ToriLevel, day: number): string {
  return String(LEVEL_OFFSET[level] + day).padStart(2, '0');
}
function fileNameFor(level: ToriLevel, day: number, kind: ToriImageKind): string {
  return `day-${globalNo(level, day)}-${kind}.jpg`;
}

function isLevel(v: unknown): v is ToriLevel {
  return v === 'beginner' || v === 'intermediate' || v === 'advanced';
}
function isKind(v: unknown): v is ToriImageKind {
  return v === 'hero' || v === 'scene';
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  const levels = LEVELS.map((level) => {
    const days = [];
    for (let day = 1; day <= DAYS_PER_LEVEL; day++) {
      const d = getDay(level, day);
      const slot = (kind: ToriImageKind, def: string | undefined) => {
        const url = def ?? null;
        return { url, fileExists: !!url && existsSync(path.join(process.cwd(), 'public', url)) };
      };
      days.push({
        day,
        title: d?.title ?? null,
        exists: !!d,
        hero: slot('hero', d?.heroImageUrl),
        scene: slot('scene', d?.recap?.sceneImageUrl),
      });
    }
    return { level, label: LEVEL_LABEL[level], days };
  });

  return NextResponse.json({ levels }, { headers: NO_STORE });
}

// 上传替换：multipart（file + level + day + kind）。sharp 压缩+强制比例，同名写回 public/images/diary/。
// 图进 git、随部署上线；本地上传后需重新部署才在线上生效。
export async function POST(req: Request) {
  const admin = await requireAdmin();
  if (!admin.authorized) return admin.response;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400, headers: NO_STORE });
  }

  const level = form.get('level');
  const kind = form.get('kind');
  const day = Number(form.get('day'));
  const file = form.get('file');

  if (!isLevel(level) || !isKind(kind)) {
    return NextResponse.json({ error: 'level/kind 非法' }, { status: 400, headers: NO_STORE });
  }
  if (!Number.isInteger(day) || day < 1 || day > DAYS_PER_LEVEL) {
    return NextResponse.json({ error: 'day 非法' }, { status: 400, headers: NO_STORE });
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

  const conf = KIND_CONF[kind];
  let out: Buffer;
  try {
    out = await sharp(buf)
      .resize(conf.w, conf.h, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
  } catch {
    return NextResponse.json({ error: '图片处理失败' }, { status: 400, headers: NO_STORE });
  }

  await fs.mkdir(DIARY_IMG_DIR, { recursive: true });
  const fileName = fileNameFor(level, day, kind);
  await fs.writeFile(path.join(DIARY_IMG_DIR, fileName), out);

  // 返回带时间戳查询串的 url，仅供后台预览破缓存；TS 数据里的路径不带查询串。
  const publicUrl = `/images/diary/${fileName}`;
  return NextResponse.json(
    { ok: true, url: publicUrl, previewUrl: `${publicUrl}?t=${Date.now()}`, needDeploy: true },
    { headers: NO_STORE },
  );
}
