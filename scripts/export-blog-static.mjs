import { createClient } from '@libsql/client';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

// 一次性脚本：把数据库里的 NPC + 现役 passerby 帖导出成静态 TS 数据
// （src/lib/server/blogStaticData.ts），让这些「作者预写、运行时只读」的内容
// 随代码部署上线，不再依赖数据库（部署排除 data/ 导致香港线上库缺这些帖）。
// passerby_hidden（旧版隐藏行）不导出。NPC 帖的覆盖图（blogImages.json）固化进 content.images。

const root = process.cwd();
const db = createClient({ url: `file:${path.join(root, 'data', 'app.db')}` });
const imageOverrides = JSON.parse(
  readFileSync(path.join(root, 'src', 'data', 'blogImages.json'), 'utf8'),
);

// 复刻 blog.ts 的 sanitizeImages：只留形状合法的图
function sanitizeImages(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((it) => !!it && typeof it.url === 'string' && it.url !== '' && Number(it.w) > 0 && Number(it.h) > 0)
    .slice(0, 10)
    .map((it) => ({ url: it.url, w: Number(it.w), h: Number(it.h) }));
}

// 复刻 blog.ts 的 parseContent
function parseContent(raw) {
  const EMPTY = { sentences: [], vocab: [], quiz: [], comments: [], likedBy: [], images: [] };
  if (typeof raw !== 'string' || !raw) return EMPTY;
  try {
    const p = JSON.parse(raw);
    return {
      sentences: Array.isArray(p.sentences) ? p.sentences : [],
      vocab: Array.isArray(p.vocab) ? p.vocab : [],
      quiz: Array.isArray(p.quiz) ? p.quiz : [],
      comments: Array.isArray(p.comments) ? p.comments : [],
      likedBy: Array.isArray(p.likedBy) ? p.likedBy : [],
      images: sanitizeImages(p.images),
    };
  } catch {
    return EMPTY;
  }
}

// 复刻 rowToPost 的字段映射，去掉运行时字段（liked/saved/score/aiReason 等 NPC 无意义的）
function rowToStaticPost(row) {
  const slug = row.slug;
  const authorKind = row.author_kind || 'npc';
  let content = parseContent(row.content_json);
  // 固化覆盖图：NPC 帖自身无图时，把 blogImages.json 的图写进 content.images（运行时不再叠加）
  if (authorKind === 'npc' && !(content.images && content.images.length)) {
    const override = sanitizeImages(imageOverrides[slug]);
    if (override.length) content = { ...content, images: override };
  }
  return {
    id: row.id,
    slug,
    titleKo: row.title_ko,
    titleZh: row.title_zh,
    excerptKo: row.excerpt_ko ?? '',
    level: row.level,
    category: row.category,
    content,
    audioUrl: row.audio_url ?? '',
    audioDuration: Number(row.audio_duration ?? 0),
    coverEmoji: row.cover_emoji ?? '📔',
    coverImageUrl: row.cover_image_url ?? '',
    coverTheme: row.cover_theme || 'pink',
    authorId: row.author_id || 'tori',
    likeCount: Number(row.like_count ?? 0),
    publishedAt: Number(row.published_at ?? 0),
    isFeatured: Number(row.is_featured ?? 0) === 1,
    unlockDay: Number(row.unlock_day ?? 0),
    authorKind,
    aiStatus: row.ai_status || 'passed',
    aiReason: row.ai_reason ?? '',
    moderatedText: row.moderated_text ?? '',
    featureDate: row.feature_date ?? '',
    featureRank: Number(row.feature_rank ?? 0),
  };
}

const result = await db.execute({
  sql: `SELECT * FROM blog_posts
        WHERE author_kind IN ('npc','passerby')
        ORDER BY author_kind, unlock_day, published_at, id`,
  args: [],
});

const posts = result.rows.map(rowToStaticPost);
const npc = posts.filter((p) => p.authorKind === 'npc');
const passerby = posts.filter((p) => p.authorKind === 'passerby');
const withImg = npc.filter((p) => p.content.images.length).length;

const header = `// ⚠️ 自动生成，请勿手改。由 scripts/export-blog-static.mjs 从 data/app.db 导出。
// 仅服务端 import，绝不进客户端 bundle（含全部帖子正文，体积大）。
// NPC 剧情帖 + 现役 passerby 路人帖的静态数据：随代码部署上线，不依赖数据库。
// 用户 UGC 帖（author_kind='user'）仍在数据库，不在此文件。
import type { BlogPost } from '@/types';

export const STATIC_BLOG_POSTS: BlogPost[] = ${JSON.stringify(posts, null, 2)};
`;

const outPath = path.join(root, 'src', 'lib', 'server', 'blogStaticData.ts');
writeFileSync(outPath, header, 'utf8');

console.log(`导出完成 → ${outPath}`);
console.log(`  NPC: ${npc.length} 篇（含固化图 ${withImg} 篇）`);
console.log(`  passerby: ${passerby.length} 篇`);
console.log(`  合计: ${posts.length} 篇`);
console.log(`  NPC unlock_day 范围: ${Math.min(...npc.map((p) => p.unlockDay))}–${Math.max(...npc.map((p) => p.unlockDay))}`);
console.log(`  抽查前 2 个 id/slug: ${posts.slice(0, 2).map((p) => `${p.id}|${p.slug}`).join('  ')}`);
process.exit(0);
