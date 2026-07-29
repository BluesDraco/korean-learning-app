// NPC + passerby 静态帖的访问层（数据在 blogStaticData.ts，由脚本生成）。
// 纯内存操作，仅服务端使用。替代原先对 blog_posts 表的 npc/passerby 查询。
import type { BlogPost } from '@/types';
import { STATIC_BLOG_POSTS } from './blogStaticData';

const BY_SLUG = new Map<string, BlogPost>(STATIC_BLOG_POSTS.map((p) => [p.slug, p]));
const BY_ID = new Map<string, BlogPost>(STATIC_BLOG_POSTS.map((p) => [p.id, p]));
const NPC_POSTS = STATIC_BLOG_POSTS.filter((p) => p.authorKind === 'npc');
const PASSERBY_POSTS = STATIC_BLOG_POSTS.filter((p) => p.authorKind === 'passerby');

// tier boost 排序：复刻 blog.ts buildListSql 的 ORDER BY
//   is_featured DESC, (published_at + boost) DESC, id DESC
//   boost: tori +72h / 其余 npc +24h / passerby +0
const BOOST_TORI = 259_200_000;
const BOOST_NPC = 86_400_000;

function boostOf(p: BlogPost): number {
  if (p.authorId === 'tori') return BOOST_TORI;
  if (p.authorKind === 'npc') return BOOST_NPC;
  return 0;
}

// 供 blog.ts 合并静态帖与 user 帖后统一排序（user 帖 authorKind='user' → boost 0，同 passerby）
export function sortByTierBoost(a: BlogPost, b: BlogPost): number {
  const fa = a.isFeatured ? 1 : 0;
  const fb = b.isFeatured ? 1 : 0;
  if (fa !== fb) return fb - fa;                    // is_featured DESC
  const ra = a.publishedAt + boostOf(a);
  const rb = b.publishedAt + boostOf(b);
  if (ra !== rb) return rb - ra;                    // (published_at + boost) DESC
  return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;    // id DESC
}

// 主 feed 的静态部分：已解锁 NPC 帖 + 全部 passerby（passerby 不门控）
export function getStaticFeedPosts(day: number): BlogPost[] {
  return STATIC_BLOG_POSTS.filter(
    (p) => (p.authorKind === 'npc' && p.unlockDay <= day) || p.authorKind === 'passerby',
  );
}

export function getNpcPostsUpToDay(day: number): BlogPost[] {
  return NPC_POSTS.filter((p) => p.unlockDay <= day);
}

export function getPasserbyPosts(): BlogPost[] {
  return PASSERBY_POSTS;
}

// 按 slug 取静态帖（不含门控，调用方自行判 day）
export function getStaticPostBySlug(slug: string): BlogPost | null {
  return BY_SLUG.get(slug) ?? null;
}

export function getStaticPostById(id: string): BlogPost | null {
  return BY_ID.get(id) ?? null;
}

// 某 NPC 动物已解锁帖
export function getNpcPostsByAuthor(animalId: string, day: number): BlogPost[] {
  return NPC_POSTS.filter((p) => p.authorId === animalId && p.unlockDay <= day);
}
