import { NextResponse } from 'next/server';
import { getAuthFromCookie, assertActiveUser } from '@/lib/server/auth';
import { aiModerate } from '@/lib/server/blogModerate';
import { scorePost } from '@/lib/server/blogScore';
import { createUserPost, addBlogXp, getUserCurrentDay, getBlogUserStats, deleteUserPost } from '@/lib/server/blog';
import { getServerLang } from '@/lib/server/lang';
import type { BlogCategory, BlogImage } from '@/types';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'private, no-store' };
const MAX_LEN = 1000;
const MAX_IMAGES = 10;
// 用户可选分类白名单（与 Composer 一致；소식 是 NPC 专用不开放给用户）
const ALLOWED_CATEGORIES: BlogCategory[] = ['서울 일기', '일상', '문화 노트', '속담'];

// 只接受本站上传接口返回的图片路径（防止把任意外链塞进正文）+ 宽高必须正整数
function parseImages(raw: unknown): BlogImage[] {
  if (!Array.isArray(raw)) return [];
  const out: BlogImage[] = [];
  for (const it of raw) {
    if (!it || typeof it.url !== 'string') continue;
    if (!it.url.startsWith('/api/blog/upload/')) continue;
    const w = Number(it.w);
    const h = Number(it.h);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) continue;
    out.push({ url: it.url, w: Math.round(w), h: Math.round(h) });
    if (out.length >= MAX_IMAGES) break;
  }
  return out;
}

// POST — 发一篇用户帖。body: { text, mode: 'fill'|'free', coverImageUrl?, targetGrammar? }
export async function POST(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: '未登录' }, { status: 401, headers: NO_STORE });
  }
  if (!(await assertActiveUser(auth.userId))) {
    return NextResponse.json({ error: '账号状态异常，无法发布' }, { status: 403, headers: NO_STORE });
  }

  let body: { text?: unknown; mode?: unknown; images?: unknown; targetGrammar?: unknown; joinContest?: unknown; category?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400, headers: NO_STORE });
  }

  const text = typeof body.text === 'string' ? body.text.trim() : '';
  const mode = body.mode === 'free' ? 'free' : 'fill';
  const images = parseImages(body.images);
  const targetGrammar = typeof body.targetGrammar === 'string' ? body.targetGrammar : undefined;
  const joinContest = body.joinContest === true;
  // 只接受白名单分类，非法值回落默认，避免脏数据进库
  const category = ALLOWED_CATEGORIES.includes(body.category as BlogCategory)
    ? (body.category as BlogCategory)
    : '서울 일기';

  if (!text || text.length > MAX_LEN) {
    return NextResponse.json({ error: '内容为空或过长' }, { status: 400, headers: NO_STORE });
  }
  // 必须先选形象才能发帖
  const stats = await getBlogUserStats(auth.userId);
  if (!stats || !stats.animalId) {
    return NextResponse.json({ error: 'NEED_PROFILE' }, { status: 409, headers: NO_STORE });
  }

  // 1) 一审：AI 自动内容安全审核（本地关键词 + DeepSeek 语义，~10s）。
  //    没有 ICP 许可，UGC 绝不自动公开——通过也只对作者可见 + 动物点赞，不进公开榜单。
  const moderation = await aiModerate(text);

  // 一审拦截：仍存档（作者能看到「未通过」+原因），但不评分、不给动物反馈、不进榜。
  if (moderation.status === 'blocked') {
    const slug = await createUserPost({
      userId: auth.userId,
      text,
      images,
      animalReply: { animalId: 'tori', ko: '', zh: '' },
      score: { overall: 0, dimensions: { grammar: 0, vocabulary: 0, expression: 0 }, usedTargetGrammar: false, comment: '', xpEarned: 0 },
      unlockDay: await getUserCurrentDay(auth.userId),
      aiStatus: 'blocked',
      aiReason: moderation.reason,
      joinContest,
      category,
    });
    return NextResponse.json(
      { slug, aiStatus: 'blocked', aiReason: moderation.reason },
      { headers: NO_STORE },
    );
  }

  // 2) 评分（一次 DeepSeek 调用，返回中文评分 + 从安全池选的韩语回应 + 提取的生词/测验）
  const lang = await getServerLang();
  const { score, reply, vocab, quiz, translations } = await scorePost({ text, mode, targetGrammar }, lang);

  // 3) 存帖（一审通过 → 对作者可见 + 动物开始点赞；勾选了才进后台评选队列）
  const currentDay = await getUserCurrentDay(auth.userId);
  const slug = await createUserPost({
    userId: auth.userId,
    text,
    images,
    animalReply: reply,
    score,
    unlockDay: currentDay,
    aiStatus: 'passed',
    aiReason: '',
    joinContest,
    category,
    vocab,
    quiz,
    translations,
  });

  // 4) 加经验。帖已落库=发帖已成功，加 XP 失败绝不能让接口返 500——
  //    否则前端按 !res.ok 提示失败诱导用户重发，造成重复帖（发帖非事务，无幂等键）。
  //    失败时回落发帖前的 stats（XP 少加一次可接受，重复帖不可接受）。
  let updated = stats;
  try {
    updated = await addBlogXp(auth.userId, score.xpEarned);
  } catch {
    /* XP 落库失败：静默，用旧 stats 回显 */
  }

  return NextResponse.json(
    { slug, aiStatus: 'passed', score, reply, stats: updated, joinContest },
    { headers: NO_STORE },
  );
}

// DELETE — 删除自己发的一篇帖。body: { slug }
export async function DELETE(req: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: '未登录' }, { status: 401, headers: NO_STORE });
  }

  let body: { slug?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400, headers: NO_STORE });
  }

  const slug = typeof body.slug === 'string' ? body.slug : '';
  if (!slug) {
    return NextResponse.json({ error: '缺少帖子标识' }, { status: 400, headers: NO_STORE });
  }

  // 归属校验在 deleteUserPost 内：非本人的帖删不动，返回 false → 404
  const ok = await deleteUserPost(auth.userId, slug);
  if (!ok) {
    return NextResponse.json({ error: '帖子不存在或无权删除' }, { status: 404, headers: NO_STORE });
  }
  return NextResponse.json({ ok: true }, { headers: NO_STORE });
}
