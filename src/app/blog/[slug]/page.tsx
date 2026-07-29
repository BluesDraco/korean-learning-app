import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { getAuthFromCookie } from '@/lib/server/auth';
import { getBlogPostBySlug, getBlogUserStats } from '@/lib/server/blog';
import BlogReaderClient from './BlogReaderClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.titleZh} · ${post.titleKo} · 兔莉的博客`,
    description: post.excerptKo || post.titleZh,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: `${post.titleZh} · ${post.titleKo}`,
      description: post.excerptKo || post.titleZh,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: 'article',
      locale: 'zh_CN',
      siteName: '兔莉的韩语日记',
    },
  };
}

export default async function BlogReaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const auth = await getAuthFromCookie();
  const post = await getBlogPostBySlug(slug, auth?.userId);
  if (!post) notFound();
  // user 帖：作者是当前用户本人（SQL 已按 author_id=uid 门控），用其博客档案渲染作者身份
  const userStats = post.authorKind === 'user' && auth?.userId
    ? await getBlogUserStats(auth.userId)
    : null;
  return <BlogReaderClient key={post.slug} post={post} userStats={userStats} />;
}
