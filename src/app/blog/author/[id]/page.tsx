import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getBlogPostsByAuthor, getBlogFollowerCount, getBlogFollows } from '@/lib/server/blog';
import { BLOG_CAST_BY_ID } from '@/data/blogCast';
import AuthorProfileClient from './AuthorProfileClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const author = BLOG_CAST_BY_ID[id];
  if (!author) return {};
  return {
    title: `${author.name} ${author.handle} · 兔莉的博客`,
    description: author.bioZh || author.bio || `${author.name}의 게시물`,
    alternates: { canonical: `/blog/author/${id}` },
  };
}

export default async function BlogAuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const author = BLOG_CAST_BY_ID[id];
  if (!author) notFound();

  const auth = await getAuthFromCookie();
  const [postPage, followerCount, follows] = await Promise.all([
    getBlogPostsByAuthor(id, auth?.userId, 1),
    getBlogFollowerCount(id),
    auth ? getBlogFollows(auth.userId) : Promise.resolve([]),
  ]);

  return (
    <AuthorProfileClient
      author={author}
      initialPosts={postPage.posts}
      initialHasMore={postPage.hasMore}
      followerCount={followerCount}
      initialFollowing={follows.includes(id)}
    />
  );
}
