import { BLOG_REPLY_POOL, type BlogReplyCategory } from '@/data/blogReplyPool';
import { BLOG_CAST } from '@/data/blogCast';
import type { BlogComment } from '@/types';

// 动物城「活着」的错觉 + 抖音式推流：用户发帖后点赞随时间上涨、动物陆续来留言，
// 但「能涨到多少、涨多快」由这篇帖子的质量分决定 —— 写得好/配了图的帖子被「推」得更猛。
// 全部由 publishedAt + 质量分确定性推算「此刻应长到多少」，访问时补差落库，
// 所以重复访问不会重复增长、不会指数膨胀，也不需要后台定时任务。

// —— 分发分（0-100）：决定这篇帖子的「推流力度」——
// overall 已是 DeepSeek 的韩语综合质量分（含语法/词汇/表达，已隐含「没有错误」）；
// 配图是评分器看不到的独立信号，单独加权；语法近满分再给个「零错误」小加成。
const IMAGE_BONUS = 10;          // 配了图
const CLEAN_GRAMMAR_BONUS = 5;   // 语法≥90（几乎零错误）额外奖励
const CLEAN_GRAMMAR_AT = 90;

export function distributionScore(overall: number, grammar: number, hasImage: boolean): number {
  let s = overall;
  if (hasImage) s += IMAGE_BONUS;
  if (grammar >= CLEAN_GRAMMAR_AT) s += CLEAN_GRAMMAR_BONUS;
  return Math.max(0, Math.min(100, Math.round(s)));
}

// —— 点赞：ceiling 决定「最终能涨到多少」，halflife 决定「涨多快」——
// 高分帖 ceiling 高（曲线放大高分，抖音式：好内容被指数级放大）且 halflife 短（起量快）。
const LIKE_CEILING_MAX_BONUS = 140; // 满分帖相对初始点赞最多再涨这么多
const CEILING_EXP = 2.5;            // >1：放大高分、压低平庸分
const HALF_MIN_MS = 4 * 60 * 60 * 1000;   // 满分帖：4h 到半程
const HALF_MAX_MS = 16 * 60 * 60 * 1000;  // 低分帖：16h 到半程

// 此刻这篇帖子的点赞数「应该」是多少（baseLikes = 发帖时固定的 likedBy 数，永不变）。
export function targetLikeCount(
  baseLikes: number,
  publishedAt: number,
  now: number,
  distScore: number,
): number {
  const elapsed = now - publishedAt;
  if (elapsed <= 0) return baseLikes;

  const factor = Math.pow(distScore / 100, CEILING_EXP);
  const ceilingBonus = Math.round(factor * LIKE_CEILING_MAX_BONUS);
  if (ceilingBonus <= 0) return baseLikes;

  const halflife = HALF_MIN_MS + (1 - distScore / 100) * (HALF_MAX_MS - HALF_MIN_MS);
  const progress = 1 - 1 / (1 + elapsed / halflife); // 0→1，前期快后期缓（推流衰减）

  return baseLikes + Math.round(ceilingBonus * progress);
}

// —— 留言：好帖不仅涨赞，也吸引更多动物来评论 ——
// 留言在 1h / 6h / 24h 各可能多出一条，但「最多几条」由质量分卡：平庸帖只有一两条动静。
const COMMENT_THRESHOLDS_MS = [
  60 * 60 * 1000,       // 1 小时
  6 * 60 * 60 * 1000,   // 6 小时
  24 * 60 * 60 * 1000,  // 24 小时
];

function maxExtraComments(distScore: number): number {
  if (distScore >= 85) return 3;
  if (distScore >= 70) return 2;
  if (distScore >= 50) return 1;
  return 0;
}

// 自发留言只用正向类别（gentleFix 与真实错误绑定，不适合「路过点个赞」的场景）
const GROWTH_CATEGORIES: BlogReplyCategory[] = ['praise', 'encourage', 'topicReact'];

// 需要补写的新留言（已有 existing 条，目标 target 条）。选正向短句 + 尚未留言的动物。
function newComments(existing: BlogComment[], target: number): BlogComment[] {
  const need = target - existing.length;
  if (need <= 0) return [];

  const usedIds = new Set(existing.map((c) => c.animalId));
  const out: BlogComment[] = [];
  for (let i = 0; i < need; i += 1) {
    const category = GROWTH_CATEGORIES[Math.floor(Math.random() * GROWTH_CATEGORIES.length)];
    const pool = BLOG_REPLY_POOL[category] ?? BLOG_REPLY_POOL.encourage;
    const line = pool[Math.floor(Math.random() * pool.length)];

    const avail = BLOG_CAST.filter((a) => !usedIds.has(a.id));
    const animal = (avail.length > 0 ? avail : BLOG_CAST)[
      Math.floor(Math.random() * (avail.length > 0 ? avail.length : BLOG_CAST.length))
    ];
    usedIds.add(animal.id);
    out.push({ animalId: animal.id, ko: line.ko, zh: line.zh });
  }
  return out;
}

// —— 发帖时预计算的增长计划（存 blog_posts.growth_schedule）——
// 把「随时间涨到多少赞、哪只动物在何时来留言」在发帖那一刻就算好、冻结，
// 之后每次读帖只按当前时间在内存里叠加展示值，GET 永不写库（根除刷新涨赞竞态）。
export interface GrowthSchedule {
  likes: { at: number; count: number }[];       // 到达 at(epoch ms) 后点赞至少为 count（递增）
  comments: { at: number; comment: BlogComment }[]; // 到达 at 后这条冻结的动物留言出现
}

// 发帖时调用一次：按质量分算出未来 24h 的涨赞里程碑 + 冻结好的动物留言。
export function buildGrowthSchedule(input: {
  baseLikes: number;              // 发帖时固定的 likedBy 数（永不变，作叠加基线）
  publishedAt: number;
  overall: number;
  grammar: number;
  hasImage: boolean;
  initialComments: BlogComment[]; // 发帖时那条初始动物回应
}): GrowthSchedule {
  const dist = distributionScore(input.overall, input.grammar, input.hasImage);

  // 涨赞：未来 24h 每小时采样一次确定性曲线，去掉与上一个相等的点。
  const likes: GrowthSchedule['likes'] = [];
  let last = -1;
  for (let h = 1; h <= 24; h += 1) {
    const at = input.publishedAt + h * 60 * 60 * 1000;
    const count = targetLikeCount(input.baseLikes, input.publishedAt, at, dist);
    if (count !== last) {
      likes.push({ at, count });
      last = count;
    }
  }

  // 评论：按 1h/6h/24h 阈值补至多 maxExtraComments 条，动物+文案发帖时就冻结。
  const maxExtra = maxExtraComments(dist);
  const frozen = newComments(input.initialComments, input.initialComments.length + maxExtra);
  const comments: GrowthSchedule['comments'] = frozen.map((comment, i) => ({
    at: input.publishedAt + COMMENT_THRESHOLDS_MS[Math.min(i, COMMENT_THRESHOLDS_MS.length - 1)],
    comment,
  }));

  return { likes, comments };
}

// 读帖时调用（纯函数，不写库）：按当前时间把 schedule 叠加到基线上。
export function applyGrowthSchedule(
  baseLikeCount: number,
  baseComments: BlogComment[],
  schedule: GrowthSchedule | null,
  now: number,
): { likeCount: number; comments: BlogComment[] } {
  if (!schedule) return { likeCount: baseLikeCount, comments: baseComments };
  let likeCount = baseLikeCount;
  for (const m of schedule.likes) {
    if (m.at <= now && m.count > likeCount) likeCount = m.count;
  }
  const extra = schedule.comments.filter((c) => c.at <= now).map((c) => c.comment);
  return { likeCount, comments: [...baseComments, ...extra] };
}

// growth_schedule 列（JSON 字符串）→ GrowthSchedule，容错返回 null。
export function parseGrowthSchedule(raw: unknown): GrowthSchedule | null {
  if (typeof raw !== 'string' || !raw) return null;
  try {
    const p = JSON.parse(raw) as Partial<GrowthSchedule>;
    return {
      likes: Array.isArray(p.likes) ? p.likes : [],
      comments: Array.isArray(p.comments) ? p.comments : [],
    };
  } catch {
    return null;
  }
}
