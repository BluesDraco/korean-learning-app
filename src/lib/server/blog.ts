import { getDb, rowsToObjects } from '@/lib/server/db';
import type { BlogPost, BlogContent, BlogImage, BlogLevel, BlogCategory, BlogCoverTheme, BlogPostScore, BlogUserStats, BlogComment, BlogVocab, BlogQuizItem, BlogNotification, BlogUserComment } from '@/types';
import { BLOG_CAST, getBlogAuthor } from '@/data/blogCast';
import { buildGrowthSchedule, applyGrowthSchedule, parseGrowthSchedule, type GrowthSchedule } from '@/lib/server/blogGrow';
import { BLOG_REPLY_POOL, type BlogReplyCategory } from '@/data/blogReplyPool';
import { filterContent } from '@/lib/contentFilter';
import { aiModerate } from '@/lib/server/blogModerate';
import { generateCommentReplyDeepSeek } from '@/lib/deepseek';
import {
  getStaticFeedPosts, getNpcPostsUpToDay, getPasserbyPosts,
  getStaticPostBySlug, getStaticPostById, getNpcPostsByAuthor, sortByTierBoost,
} from '@/lib/server/blogStatic';
import type { KoZh } from '@/types/inline';

const EMPTY_CONTENT: BlogContent = { sentences: [], vocab: [], quiz: [], comments: [], likedBy: [], images: [] };

// 一篇静态帖对当前用户是否可见（NPC 按 unlock_day 门控；passerby 不门控）
function isStaticPostVisible(post: BlogPost, currentDay: number): boolean {
  if (post.authorKind === 'npc') return post.unlockDay <= currentDay;
  return post.authorKind === 'passerby';
}

// 给静态帖贴上当前用户的点赞/收藏状态（静态帖不在库，reactions 仍在 blog_reactions 表按 post_id 匹配）。
// 一次查库把该用户对这批帖的反应取回，map 回帖对象。userId 为空则全 false。
async function attachReactions(userId: string, posts: BlogPost[]): Promise<BlogPost[]> {
  if (!userId || posts.length === 0) return posts.map((p) => ({ ...p, liked: false, saved: false }));
  const db = await getDb();
  const ids = posts.map((p) => p.id);
  // 占位符片段拆到变量（只是固定数量的 ?，无用户值），避免在 exec() 调用处出现 ${} 插值告警
  const placeholders = ids.map(() => '?').join(',');
  const reactSql = `SELECT post_id, liked, saved FROM blog_reactions WHERE user_id = ? AND post_id IN (${placeholders})`;
  const rows = rowsToObjects(await db.exec(reactSql, [userId, ...ids]));
  const react = new Map<string, { liked: boolean; saved: boolean }>();
  for (const r of rows) {
    react.set(r.post_id as string, { liked: Number(r.liked) === 1, saved: Number(r.saved) === 1 });
  }
  return posts.map((p) => {
    const r = react.get(p.id);
    return { ...p, liked: r?.liked ?? false, saved: r?.saved ?? false };
  });
}

// 列表卡裁剪：passerby 保留 sentences.zh（mini 卡显示中文），其余清空正文，统一只留社交证明。
function trimForList(p: BlogPost): BlogPost {
  const sentences = p.authorKind === 'passerby'
    ? p.content.sentences.map((s) => ({ ko: '', zh: s.zh }))
    : [];
  return {
    ...p,
    content: { sentences, vocab: [], quiz: [], comments: p.content.comments, likedBy: p.content.likedBy, images: p.content.images },
  };
}

// 只留形状合法的图（url 是字符串 + w/h 正数），脏数据丢弃，防坏比例撑爆版式
function sanitizeImages(raw: unknown): BlogImage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((it): it is BlogImage =>
      !!it && typeof it.url === 'string' && it.url !== '' &&
      Number(it.w) > 0 && Number(it.h) > 0)
    .slice(0, 10)
    .map((it) => ({ url: it.url, w: Number(it.w), h: Number(it.h) }));
}

function parseContent(raw: unknown): BlogContent {
  if (typeof raw !== 'string' || !raw) return EMPTY_CONTENT;
  try {
    const parsed = JSON.parse(raw) as Partial<BlogContent>;
    return {
      sentences: Array.isArray(parsed.sentences) ? parsed.sentences : [],
      vocab: Array.isArray(parsed.vocab) ? parsed.vocab : [],
      quiz: Array.isArray(parsed.quiz) ? parsed.quiz : [],
      comments: Array.isArray(parsed.comments) ? parsed.comments : [],
      likedBy: Array.isArray(parsed.likedBy) ? parsed.likedBy : [],
      images: sanitizeImages(parsed.images),
    };
  } catch {
    return EMPTY_CONTENT;
  }
}

function rowToPost(row: Record<string, unknown>): BlogPost {
  const slug = row.slug as string;
  const authorKind = ((row.author_kind as string) || 'npc') as 'npc' | 'user' | 'passerby';
  const content = parseContent(row.content_json);
  return {
    id: row.id as string,
    slug,
    titleKo: row.title_ko as string,
    titleZh: row.title_zh as string,
    excerptKo: (row.excerpt_ko as string) ?? '',
    level: row.level as BlogLevel,
    category: row.category as BlogCategory,
    content,
    audioUrl: (row.audio_url as string) ?? '',
    audioDuration: Number(row.audio_duration ?? 0),
    coverEmoji: (row.cover_emoji as string) ?? '📔',
    coverImageUrl: (row.cover_image_url as string) ?? '',
    coverTheme: ((row.cover_theme as string) || 'pink') as BlogCoverTheme,
    authorId: (row.author_id as string) || 'tori',
    likeCount: Number(row.like_count ?? 0),
    publishedAt: Number(row.published_at ?? 0),
    isFeatured: Number(row.is_featured ?? 0) === 1,
    unlockDay: Number(row.unlock_day ?? 0),
    authorKind,
    score: parseScore(row.score_json),
    aiStatus: ((row.ai_status as string) || 'passed') as 'pending' | 'passed' | 'blocked',
    aiReason: (row.ai_reason as string) ?? '',
    moderatedText: (row.moderated_text as string) ?? '',
    featureDate: (row.feature_date as string) ?? '',
    featureRank: Number(row.feature_rank ?? 0),
    liked: Number(row.liked ?? 0) === 1,
    saved: Number(row.saved ?? 0) === 1,
  };
}

function parseScore(raw: unknown): BlogPostScore | undefined {
  if (typeof raw !== 'string' || !raw) return undefined;
  try {
    return JSON.parse(raw) as BlogPostScore;
  } catch {
    return undefined;
  }
}

// 读时把发帖时冻结的 growth_schedule 按当前时间叠加到基线上（纯内存，不写库）。
// 所有读路径（列表/详情/榜单/后台）都走这里，DB 里的 like_count/comments 始终只是基线。
function rowToGrownPost(row: Record<string, unknown>): BlogPost {
  const post = rowToPost(row);
  if (post.authorKind !== 'user' || post.aiStatus !== 'passed') return post;
  const schedule = parseGrowthSchedule(row.growth_schedule);
  const { likeCount, comments } = applyGrowthSchedule(
    post.likeCount,
    post.content.comments,
    schedule,
    Date.now(),
  );
  return { ...post, likeCount, content: { ...post.content, comments } };
}

// 列名常量与查询语句分开定义并整体拼好，避免在 exec() 调用处出现 ${} 插值（触发 SQL 拼值告警）。
// 这里拼进去的只是固定列名（无用户输入）；所有用户值仍走 ? 占位符。
const _COLS = `p.id, p.slug, p.title_ko, p.title_zh, p.excerpt_ko, p.level, p.category,
  p.content_json, p.audio_url, p.audio_duration, p.cover_emoji,
  p.cover_image_url, p.cover_theme, p.author_id, p.like_count,
  p.published_at, p.is_featured, p.unlock_day, p.author_kind, p.score_json,
  p.ai_status, p.ai_reason, p.moderated_text, p.feature_date, p.feature_rank,
  p.growth_schedule`;

// —— NPC/passerby 帖已静态化（见 blogStatic.ts）；以下 SQL 只查数据库里的 user UGC 帖。——
// feed 排序用 sortByTierBoost 在内存里对「静态帖 + user 帖」统一排序（复刻原 tier boost）。

// 当前用户的全部 UGC 帖（自己发的，对他人不可见），带点赞/收藏状态。量小，一次全取进内存合并。
const SQL_USER_POSTS = `SELECT ${_COLS},
    COALESCE(r.liked, 0) AS liked, COALESCE(r.saved, 0) AS saved
  FROM blog_posts p
  LEFT JOIN blog_reactions r ON r.post_id = p.id AND r.user_id = ?
  WHERE p.author_kind = 'user' AND p.author_id = ?`;

// 按 slug 取 user 帖（详情页兜底：静态帖未命中时查库）。门控：只有作者本人可见。
const SQL_USER_BY_SLUG = `SELECT ${_COLS},
    COALESCE(r.liked, 0) AS liked, COALESCE(r.saved, 0) AS saved
  FROM blog_posts p
  LEFT JOIN blog_reactions r ON r.post_id = p.id AND r.user_id = ?
  WHERE p.slug = ? AND p.author_kind = 'user' AND p.author_id = ?`;

// 每日热度榜：管理员二审入选帖，按当日 feature_rank 排序（公开）。带作者动物昵称/形象
const SQL_RANKING = `SELECT ${_COLS}, s.nickname AS author_nickname, s.animal_id AS author_animal, 0 AS liked, 0 AS saved
  FROM blog_posts p
  LEFT JOIN blog_user_stats s ON s.user_id = p.author_id
  WHERE p.feature_date = ? AND p.feature_rank > 0
  ORDER BY p.feature_rank ASC
  LIMIT 3`;

// 后台二审队列：一审通过 + 用户勾选参赛的 user 帖，附作者昵称
const SQL_ADMIN_REVIEW = `SELECT ${_COLS}, s.nickname AS author_nickname, 0 AS liked, 0 AS saved
  FROM blog_posts p
  LEFT JOIN blog_user_stats s ON s.user_id = p.author_id
  WHERE p.author_kind = 'user' AND p.ai_status = 'passed' AND p.join_contest = 1
  ORDER BY p.published_at DESC
  LIMIT 200`;

// 列表页：不需要正文，但需要每帖的当前用户点赞/收藏状态（userId 为空则全 0）
// 用户当前日记 Day（Day 门控用）。取 user_tori_progress 里的最大 day。
// 未登录 / 还没开始日记的用户默认 Day 1，让新人也能逛到第一天的动物城。
export async function getUserCurrentDay(userId?: string): Promise<number> {
  if (!userId) return 1;
  const db = await getDb();
  const result = await db.exec(
    `SELECT MAX(day) AS d FROM user_tori_progress WHERE user_id = ?`,
    [userId],
  );
  const rows = rowsToObjects(result);
  const d = rows.length ? Number(rows[0].d ?? 0) : 0;
  return Math.max(1, d);
}

export interface BlogPostPage {
  [k: string]: unknown;
  posts: BlogPost[];
  page: number;
  hasMore: boolean;
  totalPages: number;
}

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

// 路人帖每日露出上限：150 篇全放会刷屏主线，只挑这么多进 feed（每人每天不同）。
const PASSERBY_PER_DAY = 24;

// 确定性哈希（FNV-1a 变体）：同 seed 恒定输出，用于每人每天稳定抽样路人帖。
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// 挑出「今天这个用户」能看到的路人帖白名单（从静态数组，纯内存）。
// seed = userId + 天序号 + refreshKey：每人不同、每天换一批、刷新(refreshKey变)再抽一批。
// 做法：给每个 slug 算 hash(seed + slug) 稳定打分，取分数最小的前 K 个 → 确定性、可分页、可复现。
function pickDailyPasserby(userId: string, refreshKey: number): BlogPost[] {
  const dayIdx = Math.floor(Date.now() / 86_400_000); // 每日切换
  const seed = `${userId || 'guest'}:${dayIdx}:${refreshKey}`;
  return getPasserbyPosts()
    .map((post) => ({ post, score: hashStr(`${seed}:${post.slug}`) }))
    .sort((a, b) => a.score - b.score)
    .slice(0, PASSERBY_PER_DAY)
    .map((x) => x.post);
}

// 取当前用户的全部 UGC 帖（内存合并用），已叠加涨赞/评论增长。
async function getUserOwnPosts(uid: string): Promise<BlogPost[]> {
  if (!uid) return [];
  const db = await getDb();
  const rows = rowsToObjects(await db.exec(SQL_USER_POSTS, [uid, uid]));
  return rows.map(rowToGrownPost);
}

// 内存分页：对已排序数组切片，返回标准分页结构。
function paginate(sorted: BlogPost[], safePage: number, safeLimit: number, offset: number): BlogPostPage {
  const total = sorted.length;
  const posts = sorted.slice(offset, offset + safeLimit).map(trimForList);
  return {
    posts,
    page: safePage,
    hasMore: offset + posts.length < total,
    totalPages: Math.max(1, Math.ceil(total / safeLimit)),
  };
}

// 列表分页：每页 limit 条（默认 20，封顶 50）。
// NPC/passerby 来自静态数据，user 帖来自库（涨赞内存叠加）；合并后按 tier boost 排序内存分页。
// GET 不写任何库（根除多人刷新的涨赞竞态）。列表卡剔除正文只留社交证明减小负载。
export async function getBlogPosts(
  userId?: string,
  page = 1,
  limit = DEFAULT_LIMIT,
  savedOnly = false,
  refreshKey = 0,
  followingOnly = false,
  mineOnly = false,
): Promise<BlogPostPage> {
  const uid = userId ?? '';
  const safeLimit = Math.min(MAX_LIMIT, Math.max(1, Math.floor(limit) || DEFAULT_LIMIT));
  const safePage = Math.max(1, Math.floor(page) || 1);
  const offset = (safePage - 1) * safeLimit;

  // 收藏/关注/我的 筛选需登录；未登录直接空
  if ((savedOnly || followingOnly || mineOnly) && !uid) return { posts: [], page: safePage, hasMore: false, totalPages: 1 };

  // 我的主页：只看自己发的、已过审的帖，按发布时间倒序（未过审的不展示，与真实社媒主页一致）。
  if (mineOnly) {
    const mine = (await getUserOwnPosts(uid)).filter((p) => p.aiStatus === 'passed');
    mine.sort((a, b) => b.publishedAt - a.publishedAt || (a.id < b.id ? 1 : -1));
    return paginate(mine, safePage, safeLimit, offset);
  }

  const currentDay = await getUserCurrentDay(userId);

  // 关注视图：只看已关注 NPC 动物的已解锁帖（纯静态）。没关注任何动物直接空。
  if (followingOnly) {
    const followIds = await getBlogFollows(uid);
    if (followIds.length === 0) return { posts: [], page: safePage, hasMore: false, totalPages: 1 };
    const followSet = new Set(followIds);
    const npc = getNpcPostsUpToDay(currentDay).filter((p) => followSet.has(p.authorId));
    const withReact = await attachReactions(uid, npc);
    withReact.sort(sortByTierBoost);
    return paginate(withReact, safePage, safeLimit, offset);
  }

  // 收藏视图：存过的帖始终可见（不受今日采样限制）。先查 saved 的 post_id + 收藏时间，
  // 再从静态帖 + user 帖里取出来按收藏时间倒序。
  if (savedOnly) {
    const db = await getDb();
    const savedRows = rowsToObjects(
      await db.exec(
        `SELECT post_id, updated_at FROM blog_reactions WHERE user_id = ? AND saved = 1`,
        [uid],
      ),
    );
    const savedAt = new Map<string, number>();
    for (const r of savedRows) savedAt.set(r.post_id as string, Number(r.updated_at ?? 0));
    const staticSaved = getStaticFeedPosts(currentDay).filter((p) => savedAt.has(p.id));
    const userSaved = (await getUserOwnPosts(uid)).filter((p) => savedAt.has(p.id));
    const merged = await attachReactions(uid, [...staticSaved, ...userSaved]);
    merged.sort((a, b) => (savedAt.get(b.id) ?? 0) - (savedAt.get(a.id) ?? 0) || (a.id < b.id ? 1 : -1));
    return paginate(merged, safePage, safeLimit, offset);
  }

  // 普通 feed：已解锁 NPC + 今日采样路人 + 自己的 UGC 帖，合并按 tier boost 排序。
  const npc = getNpcPostsUpToDay(currentDay);
  const passerby = pickDailyPasserby(uid, refreshKey);
  const userPosts = await getUserOwnPosts(uid);
  const staticMerged = await attachReactions(uid, [...npc, ...passerby]);
  const all = [...staticMerged, ...userPosts];
  all.sort(sortByTierBoost);
  return paginate(all, safePage, safeLimit, offset);
}

export async function getBlogPostBySlug(slug: string, userId?: string): Promise<BlogPost | null> {
  const uid = userId ?? '';
  const currentDay = await getUserCurrentDay(userId);

  // 先查静态帖（NPC 按 unlock_day 门控，passerby 放行）
  const staticPost = getStaticPostBySlug(slug);
  if (staticPost) {
    if (!isStaticPostVisible(staticPost, currentDay)) return null;
    const [withReact] = await attachReactions(uid, [staticPost]);
    return withReact;
  }

  // 否则查 user 帖（只有作者本人可见）
  const db = await getDb();
  const rows = rowsToObjects(await db.exec(SQL_USER_BY_SLUG, [uid, slug, uid]));
  if (!rows.length) return null;
  return rowToGrownPost(rows[0]);
}

// 作者主页：某 NPC 动物已解锁帖分页（纯静态）。列表卡不展开正文，只留社交证明。
export async function getBlogPostsByAuthor(
  animalId: string,
  userId?: string,
  page = 1,
  limit = DEFAULT_LIMIT,
): Promise<BlogPostPage> {
  const uid = userId ?? '';
  const safeLimit = Math.min(MAX_LIMIT, Math.max(1, Math.floor(limit) || DEFAULT_LIMIT));
  const safePage = Math.max(1, Math.floor(page) || 1);
  const offset = (safePage - 1) * safeLimit;
  const currentDay = await getUserCurrentDay(userId);

  const posts = getNpcPostsByAuthor(animalId, currentDay);
  const withReact = await attachReactions(uid, posts);
  withReact.sort(sortByTierBoost);
  return paginate(withReact, safePage, safeLimit, offset);
}

// 某动物的粉丝数（关注它的用户数），作者主页展示用
export async function getBlogFollowerCount(animalId: string): Promise<number> {
  const db = await getDb();
  const rows = rowsToObjects(
    await db.exec(`SELECT COUNT(*) AS n FROM blog_follows WHERE animal_id = ?`, [animalId])
  );
  return rows.length ? Number(rows[0].n ?? 0) : 0;
}

// —— 每日热度榜（公开）——
// 管理员二审入选的帖子，按 feature_date 当日 + feature_rank 排序，全站可见。
// 公开正文用 moderated_text（管理员改写版），作者身份只用动物昵称/形象，绝不暴露真实账号。
export interface RankingEntry {
  [k: string]: unknown;
  slug: string;
  rank: number;
  text: string;              // 公开正文（管理员改写版）
  coverImageUrl: string;
  coverTheme: BlogCoverTheme;
  coverEmoji: string;
  likeCount: number;
  authorNickname: string;    // 动物昵称
  authorAnimalId: string;    // 预制动物形象 id
}

export async function getRankingBoard(date: string): Promise<RankingEntry[]> {
  const db = await getDb();
  const result = await db.exec(SQL_RANKING, [date]);
  return rowsToObjects(result).map((row) => {
    const post = rowToGrownPost(row);
    return {
      slug: post.slug,
      rank: post.featureRank,
      text: post.moderatedText,
      coverImageUrl: post.coverImageUrl,
      coverTheme: post.coverTheme,
      coverEmoji: post.coverEmoji,
      likeCount: post.likeCount,
      authorNickname: (row.author_nickname as string) || '익명의 동물',
      authorAnimalId: (row.author_animal as string) || '',
    };
  });
}

// —— 后台审核：列出待二审的帖子（一审已通过的 user 帖）——
// 附综合分（score.overall）+ 当前真实点赞/评论数，供管理员判断是否入选。
export interface AdminReviewPost {
  [k: string]: unknown;
  id: string;
  slug: string;
  authorId: string;
  authorNickname: string;
  text: string;                 // 作者原文（拼接 sentences）
  moderatedText: string;        // 已改写版（若有）
  coverImageUrl: string;
  overall: number;              // 综合评分
  likeCount: number;            // 当前真实点赞（含推流增长）
  commentCount: number;         // 当前评论数
  publishedAt: number;
  featureDate: string;
  featureRank: number;
}

export async function getAdminReviewPosts(): Promise<AdminReviewPost[]> {
  const db = await getDb();
  const result = await db.exec(SQL_ADMIN_REVIEW);
  return rowsToObjects(result).map((row) => {
    const post = rowToGrownPost(row);
    return {
      id: post.id,
      slug: post.slug,
      authorId: post.authorId,
      authorNickname: (row.author_nickname as string) || '',
      text: post.content.sentences.map((s) => s.ko).join('\n'),
      moderatedText: post.moderatedText,
      coverImageUrl: post.coverImageUrl,
      overall: post.score?.overall ?? 0,
      likeCount: post.likeCount,
      commentCount: post.content.comments.length,
      publishedAt: post.publishedAt,
      featureDate: post.featureDate,
      featureRank: post.featureRank,
    };
  });
}

// —— 后台审核：入选榜单（改写正文 + 设日期名次）或撤销 ——
export async function featureBlogPost(input: {
  postId: string;
  moderatedText: string;
  featureDate: string;   // 'YYYY-MM-DD'，空字符串=撤销入选
  featureRank: number;   // 1-3，0=撤销
  adminName: string;
}): Promise<void> {
  const db = await getDb();
  await db.run(
    `UPDATE blog_posts
       SET moderated_text = ?, feature_date = ?, feature_rank = ?,
           moderated_at = ?, moderated_by = ?
     WHERE id = ? AND author_kind = 'user'`,
    [input.moderatedText, input.featureDate, input.featureRank, Date.now(), input.adminName, input.postId]
  );
}

// 点赞/收藏：写入用户真实反应（每人每帖一行，upsert）
export async function setBlogReaction(
  userId: string,
  postId: string,
  patch: { liked?: boolean; saved?: boolean }
): Promise<{ liked: boolean; saved: boolean }> {
  const db = await getDb();
  const now = Date.now();
  // 纵深防御：只能对当前可见的帖子反应（NPC 按 unlock_day、user 帖限作者本人），
  // 防止用 postId 对未解锁/他人私密帖点赞。NPC/passerby 查静态数组，user 帖查库。
  const currentDay = await getUserCurrentDay(userId);
  const staticPost = getStaticPostById(postId);
  let visible = false;
  if (staticPost) {
    visible = isStaticPostVisible(staticPost, currentDay);
  } else {
    const rows = rowsToObjects(
      await db.exec(
        `SELECT 1 FROM blog_posts WHERE id = ? AND author_kind = 'user' AND author_id = ?`,
        [postId, userId],
      ),
    );
    visible = rows.length > 0;
  }
  if (!visible) throw new Error('POST_NOT_VISIBLE');
  const existing = rowsToObjects(
    await db.exec(`SELECT liked, saved FROM blog_reactions WHERE user_id = ? AND post_id = ?`, [userId, postId])
  );
  const prevLiked = existing.length ? Number(existing[0].liked) === 1 : false;
  const prevSaved = existing.length ? Number(existing[0].saved) === 1 : false;
  const liked = patch.liked ?? prevLiked;
  const saved = patch.saved ?? prevSaved;

  await db.run(
    `INSERT INTO blog_reactions (user_id, post_id, liked, saved, updated_at)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(user_id, post_id) DO UPDATE SET liked = ?, saved = ?, updated_at = ?`,
    [userId, postId, liked ? 1 : 0, saved ? 1 : 0, now, liked ? 1 : 0, saved ? 1 : 0, now]
  );
  return { liked, saved };
}

// ── 关注动物卡司（NPC 作者）──

// 当前用户已关注的动物 id 列表
export async function getBlogFollows(userId: string): Promise<string[]> {
  const db = await getDb();
  return rowsToObjects(
    await db.exec(`SELECT animal_id FROM blog_follows WHERE user_id = ?`, [userId])
  ).map((r) => r.animal_id as string);
}

// 关注/取关切换：following=true 插入、false 删除。animalId 必须是卡司成员。
export async function setBlogFollow(
  userId: string,
  animalId: string,
  following: boolean,
): Promise<{ animalId: string; following: boolean }> {
  // 白名单校验：animalId 必须是卡司成员（getBlogAuthor 对未知 id 有兜底，不能用来判存在）
  if (!BLOG_CAST.some((a) => a.id === animalId)) {
    throw new Error('UNKNOWN_ANIMAL');
  }
  const db = await getDb();
  if (following) {
    // follow_day = 关注当下的日记进度：只对之后解锁的帖发通知，避免关注老角色被历史帖刷屏
    const followDay = await getUserCurrentDay(userId);
    await db.run(
      `INSERT INTO blog_follows (user_id, animal_id, created_at, follow_day) VALUES (?, ?, ?, ?)
       ON CONFLICT(user_id, animal_id) DO NOTHING`,
      [userId, animalId, Date.now(), followDay]
    );
  } else {
    await db.run(`DELETE FROM blog_follows WHERE user_id = ? AND animal_id = ?`, [userId, animalId]);
  }
  return { animalId, following };
}

// ── 博客专属用户档案（动物形象 + 经验/等级）──

function rowToStats(row: Record<string, unknown>): BlogUserStats {
  return {
    userId: row.user_id as string,
    animalId: (row.animal_id as string) ?? '',
    nickname: (row.nickname as string) ?? '',
    xp: Number(row.xp ?? 0),
    level: Number(row.level ?? 1),
    postCount: Number(row.post_count ?? 0),
  };
}

export async function getBlogUserStats(userId: string): Promise<BlogUserStats | null> {
  const db = await getDb();
  const rows = rowsToObjects(
    await db.exec(`SELECT * FROM blog_user_stats WHERE user_id = ?`, [userId])
  );
  return rows.length ? rowToStats(rows[0]) : null;
}

// 选形象/设昵称：首次创建档案（已存在则更新形象与昵称）
export async function setBlogProfile(
  userId: string,
  animalId: string,
  nickname: string
): Promise<BlogUserStats> {
  const db = await getDb();
  const now = Date.now();
  await db.run(
    `INSERT INTO blog_user_stats (user_id, animal_id, nickname, xp, level, post_count, created_at, updated_at)
     VALUES (?, ?, ?, 0, 1, 0, ?, ?)
     ON CONFLICT(user_id) DO UPDATE SET animal_id = ?, nickname = ?, updated_at = ?`,
    [userId, animalId, nickname, now, now, animalId, nickname, now]
  );
  return (await getBlogUserStats(userId))!;
}

// 发帖后加经验：xp 累加、帖数 +1，等级按累计 xp 重算
export async function addBlogXp(userId: string, xp: number): Promise<BlogUserStats> {
  const db = await getDb();
  const now = Date.now();
  // 无档案时兜底建一条（理论上选形象时已建）
  await db.run(
    `INSERT INTO blog_user_stats (user_id, animal_id, nickname, xp, level, post_count, created_at, updated_at)
     VALUES (?, '', '', ?, 1, 1, ?, ?)
     ON CONFLICT(user_id) DO UPDATE SET
       xp = xp + ?,
       post_count = post_count + 1,
       updated_at = ?`,
    [userId, xp, now, now, xp, now]
  );
  const stats = (await getBlogUserStats(userId))!;
  const level = levelForXp(stats.xp);
  if (level !== stats.level) {
    await db.run(`UPDATE blog_user_stats SET level = ? WHERE user_id = ?`, [level, userId]);
    stats.level = level;
  }
  return stats;
}

// 等级阈值：每级所需累计 xp（简单线性，后续可调）
export function levelForXp(xp: number): number {
  return Math.max(1, Math.floor(xp / 100) + 1);
}

const COVER_THEMES: BlogCoverTheme[] = ['pink', 'gold', 'purple', 'mint'];

// 随机挑 n 只动物 id（点赞社交证明用）
function randomAnimals(n: number): string[] {
  const ids = BLOG_CAST.map((a) => a.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.slice(0, Math.min(n, ids.length));
}

export interface CreateUserPostInput {
  [k: string]: unknown;
  userId: string;
  text: string;                     // 用户写的韩语正文
  images?: BlogImage[];             // 配图（可选，0-10 张，带宽高）
  animalReply: BlogComment;         // 从安全池选好的动物回应（含 animalId/ko/zh）
  score: BlogPostScore;             // 评分结果
  unlockDay: number;                // 发帖时用户所处 Day（自己始终可见，门控对他人）
  aiStatus: 'passed' | 'blocked';   // 一审结果：passed 才有动物点赞、才可能进榜
  aiReason: string;                 // 一审拦截原因（blocked 时给作者看）
  joinContest: boolean;             // 用户是否勾选「参加每日评选」（勾了后台才收到）
  category: BlogCategory;           // 用户选的分类（不再硬编码 서울 일기）
  vocab?: BlogVocab[];              // DeepSeek 从原文提取的生词（passed 才有）
  quiz?: BlogQuizItem[];            // DeepSeek 基于原文生成的测验（passed 才有）
  translations?: string[];          // DeepSeek 逐句中文翻译，与正文非空行一一对应
}

// 用户帖难度按综合分动态定级（只用于展示/筛选，不影响涨赞算法）
function levelForScore(overall: number): BlogLevel {
  if (overall >= 90) return '고급';
  if (overall >= 75) return '중급';
  return '초급';
}

// 写入一篇用户 UGC 帖，返回它的 slug
export async function createUserPost(input: CreateUserPostInput): Promise<string> {
  const db = await getDb();
  const now = Date.now();
  const slug = `u-${input.userId.slice(0, 6)}-${now}`;

  // 正文按换行拆句，zh 填 DeepSeek 逐句翻译（按顺序对齐；缺失回落空串）
  const translations = input.translations ?? [];
  const sentences = input.text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((ko, i) => ({ ko, zh: translations[i] ?? '' }));

  // 一审通过才有初始动物点赞/回应；被拦截的帖子无社交反馈
  const passed = input.aiStatus === 'passed';
  const likedBy = passed ? randomAnimals(3 + Math.floor(Math.random() * 3)) : []; // 3-5 只
  const images = sanitizeImages(input.images);
  const content: BlogContent = {
    sentences,
    vocab: passed ? (input.vocab ?? []) : [],
    quiz: passed ? (input.quiz ?? []) : [],
    comments: passed ? [input.animalReply] : [],
    likedBy,
    images,
  };

  const title = (sentences[0]?.ko ?? '나의 하루').slice(0, 30);
  const theme = COVER_THEMES[Math.floor(Math.random() * COVER_THEMES.length)];
  // blocked 帖 score 全 0 → 定级 초급；passed 按综合分定级
  const level: BlogLevel = passed ? levelForScore(input.score.overall) : '초급';

  // 发帖时一次性冻结未来 24h 的涨赞/留言计划；读时按当前时间叠加，不再写库。
  // 一审通过的帖才有增长；blocked 帖无社交反馈 → 空计划。
  const schedule = passed
    ? buildGrowthSchedule({
        baseLikes: likedBy.length,
        publishedAt: now,
        overall: input.score.overall,
        grammar: input.score.dimensions.grammar,
        hasImage: images.length > 0,
        initialComments: content.comments,
      })
    : { likes: [], comments: [] };

  await db.run(
    `INSERT INTO blog_posts
      (id, slug, title_ko, title_zh, excerpt_ko, level, category, content_json,
       audio_url, audio_duration, cover_emoji, published_at, is_featured,
       author_id, like_count, cover_image_url, cover_theme,
       unlock_day, author_kind, score_json, ai_status, ai_reason, join_contest, growth_schedule)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, '', 0, ?, ?, 0, ?, ?, ?, ?, ?, 'user', ?, ?, ?, ?, ?)`,
    [
      slug, slug, title, '', title, level, input.category, JSON.stringify(content),
      '📝', now,
      input.userId, likedBy.length, images[0]?.url ?? '', theme,
      input.unlockDay, JSON.stringify(input.score), input.aiStatus, input.aiReason,
      input.joinContest ? 1 : 0, JSON.stringify(schedule),
    ]
  );

  // 发帖时把「谁点赞、谁评论」的通知按未来时间预写好（passed 才有社交反馈）
  if (passed) {
    await writePostNotifications(db, input.userId, slug, now, likedBy, schedule);
  }

  return slug;
}

// 删除自己发的帖：校验归属（只能删自己的 user 帖），连带清理反应/通知/评论，并把 post_count 减 1。
// 返回是否删成功（false = 帖不存在或不属于该用户）。
export async function deleteUserPost(userId: string, slug: string): Promise<boolean> {
  const db = await getDb();
  // 归属校验：必须是该用户发的 user 帖（id === slug）
  const owned = rowsToObjects(
    await db.exec(
      `SELECT id FROM blog_posts WHERE slug = ? AND author_kind = 'user' AND author_id = ?`,
      [slug, userId],
    ),
  );
  if (owned.length === 0) return false;

  await db.run(`DELETE FROM blog_posts WHERE slug = ? AND author_id = ?`, [slug, userId]);
  await db.run(`DELETE FROM blog_reactions WHERE post_id = ?`, [slug]);
  await db.run(`DELETE FROM blog_notifications WHERE user_id = ? AND post_slug = ?`, [userId, slug]);
  await db.run(`DELETE FROM blog_user_comments WHERE user_id = ? AND post_slug = ?`, [userId, slug]);
  // post_count 同步 -1（不低于 0）
  await db.run(
    `UPDATE blog_user_stats SET post_count = MAX(0, post_count - 1), updated_at = ? WHERE user_id = ?`,
    [Date.now(), userId],
  );
  return true;
}

// ── 博客通知 ──
// 发帖时预写：初始点赞的动物错峰在 15min 内到齐，涨赞里程碑各配一个新动物点赞通知，
// 评论（初始回应 + 冻结的增长评论）按各自 reveal 时间生成通知。全部带未来 createdAt。
async function writePostNotifications(
  db: Awaited<ReturnType<typeof getDb>>,
  userId: string,
  slug: string,
  publishedAt: number,
  likedBy: string[],
  schedule: GrowthSchedule,
): Promise<void> {
  const rows: { type: string; animalId: string; ko: string; zh: string; at: number }[] = [];

  // 初始点赞：3-5 只动物在发帖后 2/4/6… 分钟错峰点赞
  likedBy.forEach((animalId, i) => {
    const name = getBlogAuthor(animalId).name;
    rows.push({
      type: 'like',
      animalId,
      ko: `${name}님이 회원님의 게시물을 좋아합니다`,
      zh: `${name} 赞了你的帖子`,
      at: publishedAt + (i + 1) * 2 * 60 * 1000,
    });
  });

  // 涨赞里程碑：每个新增里程碑挑一只未点赞的动物，在该时间点点赞
  const used = new Set(likedBy);
  for (const m of schedule.likes) {
    const avail = BLOG_CAST.filter((a) => !used.has(a.id));
    if (avail.length === 0) break;
    const animal = avail[Math.floor(Math.random() * avail.length)];
    used.add(animal.id);
    rows.push({
      type: 'like',
      animalId: animal.id,
      ko: `${animal.name}님이 회원님의 게시물을 좋아합니다`,
      zh: `${animal.name} 赞了你的帖子`,
      at: m.at,
    });
  }

  // 评论通知：每条冻结的动物评论在其 reveal 时间生成一条
  for (const c of schedule.comments) {
    const name = getBlogAuthor(c.comment.animalId).name;
    rows.push({
      type: 'comment',
      animalId: c.comment.animalId,
      ko: `${name}님이 댓글을 남겼어요: ${c.comment.ko}`,
      zh: `${name} 评论了你的帖子`,
      at: c.at,
    });
  }

  for (const r of rows) {
    await db.run(
      `INSERT INTO blog_notifications (id, user_id, type, post_slug, from_animal_id, message_ko, message_zh, created_at, is_read)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [`${slug}-${r.type}-${r.animalId}-${r.at}`, userId, r.type, slug, r.animalId, r.ko, r.zh, r.at]
    );
  }
}

function rowToNotification(row: Record<string, unknown>): BlogNotification {
  return {
    id: row.id as string,
    type: ((row.type as string) || 'like') as 'like' | 'comment' | 'radio' | 'follow_post',
    postSlug: (row.post_slug as string) ?? '',
    fromAnimalId: (row.from_animal_id as string) ?? '',
    messageKo: (row.message_ko as string) ?? '',
    messageZh: (row.message_zh as string) ?? '',
    createdAt: Number(row.created_at ?? 0),
    isRead: Number(row.is_read ?? 0) === 1,
  };
}

// 惰性补生成「关注的动物发新帖」通知：读通知时按当前进度算，无 cron。
// 只对每只已关注动物 unlock_day 在 (follow_day, currentDay] 区间的帖发一条（关注后才解锁的新帖）。
// 确定性 id (follow-<slug>-<userId>) + INSERT OR IGNORE 去重，重复读不会灌通知。
async function syncFollowPostNotifications(
  db: Awaited<ReturnType<typeof getDb>>,
  userId: string,
): Promise<void> {
  const currentDay = await getUserCurrentDay(userId);
  // NPC 帖已静态化：先查关注列表（含 follow_day），再内存过滤静态 NPC 帖。
  // 该发通知 = 已关注动物 × 其 unlock_day 落在 (follow_day, currentDay] 的帖（关注后才解锁的新帖）。
  const follows = rowsToObjects(
    await db.exec(
      `SELECT animal_id, follow_day FROM blog_follows WHERE user_id = ?`,
      [userId]
    )
  );
  const followDayByAnimal = new Map<string, number>();
  for (const f of follows) followDayByAnimal.set(f.animal_id as string, Number(f.follow_day ?? 0));

  const rows = getNpcPostsUpToDay(currentDay)
    .filter((p) => {
      const fd = followDayByAnimal.get(p.authorId);
      return fd !== undefined && p.unlockDay > fd;
    })
    .map((p) => ({ slug: p.slug, animal_id: p.authorId, at: p.publishedAt }));

  for (const r of rows) {
    const slug = r.slug;
    const animalId = r.animal_id;
    const name = getBlogAuthor(animalId).name;
    // 帖已按 Day 门控解锁（正文可读），通知就该立即揭晓。若 publishedAt 是未来墙钟时间
    // （日记模拟未来日期），直接用它会让通知因 created_at>now 被 getBlogNotifications 永久隐藏。
    const at = Math.min(Number(r.at ?? Date.now()), Date.now());
    await db.run(
      `INSERT OR IGNORE INTO blog_notifications
        (id, user_id, type, post_slug, from_animal_id, message_ko, message_zh, created_at, is_read)
       VALUES (?, ?, 'follow_post', ?, ?, ?, ?, ?, 0)`,
      [
        `follow-${slug}-${userId}`, userId, slug, animalId,
        `${name}님이 새 글을 올렸어요`, `${name} 发布了新帖`, at,
      ]
    );
  }
}

// 读通知：只返回已到揭晓时间（created_at <= now）的，最新在前，最多 50 条 + 未读数
export async function getBlogNotifications(
  userId: string,
): Promise<{ items: BlogNotification[]; unread: number }> {
  const db = await getDb();
  const now = Date.now();
  await syncFollowPostNotifications(db, userId);
  const items = rowsToObjects(
    await db.exec(
      `SELECT * FROM blog_notifications
       WHERE user_id = ? AND created_at <= ?
       ORDER BY created_at DESC LIMIT 50`,
      [userId, now]
    )
  ).map(rowToNotification);
  const unread = items.filter((n) => !n.isRead).length;
  return { items, unread };
}

// 全部已读：只标已揭晓的（未来的先不动，等揭晓后仍是未读）
export async function markBlogNotificationsRead(userId: string): Promise<void> {
  const db = await getDb();
  await db.run(
    `UPDATE blog_notifications SET is_read = 1 WHERE user_id = ? AND created_at <= ?`,
    [userId, Date.now()]
  );
}

// ── 用户私密评论（NPC 帖下，只本人可见）──
// 用户评论立即可见；作者动物从安全池选一句在 25-75s 后揭晓回复 + 写一条通知。
// 与 growth/通知同一套「写时冻结未来 reveal、读时按 created_at 揭晓、无 cron」哲学。

const COMMENT_MAX_LEN = 300;

function rowToUserComment(row: Record<string, unknown>): BlogUserComment {
  return {
    id: row.id as string,
    author: ((row.author as string) || 'me') as 'me' | 'animal',
    animalId: (row.animal_id as string) ?? '',
    ko: (row.ko as string) ?? '',
    zh: (row.zh as string) ?? '',
    createdAt: Number(row.created_at ?? 0),
  };
}

function pickReplyLine(): KoZh {
  // 用户评论内容不做 AI 生成回应，只从人工审过的正向安全池选句（praise/encourage/topicReact）
  const cats: BlogReplyCategory[] = ['praise', 'encourage', 'topicReact'];
  const cat = cats[Math.floor(Math.random() * cats.length)];
  const pool = BLOG_REPLY_POOL[cat] ?? BLOG_REPLY_POOL.encourage;
  const line = pool[Math.floor(Math.random() * pool.length)];
  if (!line) return { ko: '고마워요! 잘 읽었어요 🙂', zh: '谢谢你！我认真看啦', zhEn: 'Thank you! I read it carefully' };
  return { ko: line.ko, zh: line.zh };
}

// 读：本人在某帖下已揭晓（created_at <= now）的评论/回复，按时间正序，最多 100 条
export async function getUserComments(userId: string, slug: string): Promise<BlogUserComment[]> {
  const db = await getDb();
  return rowsToObjects(
    await db.exec(
      `SELECT * FROM blog_user_comments
       WHERE user_id = ? AND post_slug = ? AND created_at <= ?
       ORDER BY created_at ASC LIMIT 100`,
      [userId, slug, Date.now()]
    )
  ).map(rowToUserComment);
}

// 写：用户在 NPC 帖下发一条评论。校验帖子对本人可见（NPC 帖 + Day 门控）+ 帖子作者是谁，
// 立刻写用户评论，同时把作者动物的回复按未来 reveal 时间冻结好 + 写一条通知。
// 返回刚写的用户评论（立即回显）。回复的揭晓时间不回传前端，由前端轮询/通知发现。
export async function addUserComment(
  userId: string,
  slug: string,
  text: string,
): Promise<BlogUserComment> {
  const db = await getDb();
  const now = Date.now();
  const body = text.trim().slice(0, COMMENT_MAX_LEN);
  if (!body) throw new Error('EMPTY_COMMENT');

  // 私密评论只本人可见，用本地同步过滤挡政治红线/广告/隐私即可，不走 DeepSeek 重审
  const filtered = filterContent(body, 'user_content');
  if (!filtered.ok) throw new Error(`BLOCKED:${filtered.reason}`);

  // 只能评论对本人可见的 NPC 帖（Day 门控）。路人帖是只读闲聊、用户 UGC 帖无公开互动，均不开评论。
  // 与前端 isNpcPost 对齐；且只有 NPC 帖 generateAnimalReply 才会回复，放行路人帖会造成「评论假超时」。
  const currentDay = await getUserCurrentDay(userId);
  const post = getStaticPostBySlug(slug);
  if (!post || post.authorKind !== 'npc' || !isStaticPostVisible(post, currentDay)) {
    throw new Error('POST_NOT_VISIBLE');
  }
  const authorId = post.authorId || 'tori';

  const mineId = `c-${slug}-${now}-${Math.random().toString(36).slice(2, 8)}`;
  await db.run(
    `INSERT INTO blog_user_comments (id, user_id, post_slug, author, animal_id, ko, zh, created_at)
     VALUES (?, ?, ?, 'me', '', ?, '', ?)`,
    [mineId, userId, slug, body, now]
  );

  // 动物回复不在此同步生成（会拖慢用户评论回显）。由前端提交成功后并发触发
  // /api/blog/comments/reply → generateAnimalReply 调 DeepSeek 生成真实回应，短延迟揭晓。
  // authorId 已在上方校验时取得，回复端点会自行重新解析。
  void authorId;

  return rowToUserComment({
    id: mineId, author: 'me', animal_id: '', ko: body, zh: '', created_at: now,
  });
}

// ── AI 动物回复：针对用户评论内容，用角色口吻生成正确韩语回应 ──
// 由 /api/blog/comments/reply 在用户评论写入后触发（前端并发调用）。
// DeepSeek 成功用真回复，任何失败（无 key / 超时 / 审核拦截 / 解析失败）回落静态安全池，绝不冷场。
// 短延迟揭晓（8-20s）+ 前端轮询，保留「动物过会儿看到才回」的社媒感。
const AI_REPLY_MIN_MS = 8 * 1000;
const AI_REPLY_MAX_MS = 20 * 1000;

export async function generateAnimalReply(userId: string, slug: string, skipAi = false): Promise<void> {
  const db = await getDb();

  // 只对本人可见的 NPC 帖生成回复（Day 门控）；路人帖/用户帖不走 AI。NPC 帖查静态数组。
  const currentDay = await getUserCurrentDay(userId);
  const post = getStaticPostBySlug(slug);
  if (!post || post.authorKind !== 'npc' || post.unlockDay > currentDay) return; // 非 NPC 帖或未解锁，静默不回
  const authorId = post.authorId || 'tori';
  const postExcerpt = post.excerptKo || '';

  // 找最新一条「用户已发但还没配对动物回复」的评论：
  // 取该帖下本人最后一条 me 评论；若它之后已有 animal 回复则说明已回过，跳过（幂等防重复触发）。
  const mine = rowsToObjects(
    await db.exec(
      `SELECT id, ko, created_at FROM blog_user_comments
       WHERE user_id = ? AND post_slug = ? AND author = 'me'
       ORDER BY created_at DESC LIMIT 1`,
      [userId, slug]
    )
  );
  if (!mine.length) return;
  const lastMineAt = Number(mine[0].created_at ?? 0);
  const userComment = (mine[0].ko as string) || '';
  const laterReply = rowsToObjects(
    await db.exec(
      `SELECT 1 FROM blog_user_comments
       WHERE user_id = ? AND post_slug = ? AND author = 'animal' AND created_at > ?
       LIMIT 1`,
      [userId, slug, lastMineAt]
    )
  );
  if (laterReply.length) return; // 已生成过回复，幂等跳过

  const name = getBlogAuthor(authorId).name;
  const bio = getBlogAuthor(authorId).bio || '';

  // 生成回复：DeepSeek 优先，任何异常回落静态池
  let reply: KoZh;
  try {
    if (skipAi) throw new Error('skip ai'); // 超限：直接回落静态池
    const apiKey = process.env.DEEPSEEK_LOOKUP_KEY;
    if (!apiKey) throw new Error('no key');
    // 先审用户评论安全（防诱导 AI 输出不当内容）；拦截则回落静态池
    const mod = await aiModerate(userComment);
    if (mod.status !== 'passed') throw new Error('moderation blocked');
    reply = await generateCommentReplyDeepSeek(
      { animalName: name, animalBio: bio, postExcerpt, userComment },
      apiKey,
    );
  } catch {
    reply = pickReplyLine(); // 回落人工审过的静态安全池
  }

  const now = Date.now();
  const replyAt = now + AI_REPLY_MIN_MS + Math.floor(Math.random() * (AI_REPLY_MAX_MS - AI_REPLY_MIN_MS));
  const replyId = `c-${slug}-${replyAt}-${Math.random().toString(36).slice(2, 8)}`;
  await db.run(
    `INSERT INTO blog_user_comments (id, user_id, post_slug, author, animal_id, ko, zh, created_at)
     VALUES (?, ?, ?, 'animal', ?, ?, ?, ?)`,
    [replyId, userId, slug, authorId, reply.ko, reply.zh, replyAt]
  );

  // 通知：作者动物回复了你的评论（按 replyAt 揭晓）
  await db.run(
    `INSERT INTO blog_notifications (id, user_id, type, post_slug, from_animal_id, message_ko, message_zh, created_at, is_read)
     VALUES (?, ?, 'comment', ?, ?, ?, ?, ?, 0)`,
    [`${replyId}-notif`, userId, slug, authorId, `${name}님이 답글을 남겼어요: ${reply.ko}`, `${name} 回复了你的评论`, replyAt]
  );
}
