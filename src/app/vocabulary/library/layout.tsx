import type { Metadata } from 'next';
import { bilingualOg } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

// duplicate content 收敛：/vocabulary/library 与 /vocabulary 重叠严重（同渲染 Themes+Levels）
// 用 canonical 指向 /vocabulary 让 Google 只索引一个版本
const metadataZh: Metadata = {
  title: '韩语词库总览 · 主题词包 · TOPIK 词表',
  description: '韩语词库入口：TOPIK 分级词表、主题词包、教材配套词单一站聚合。',
  alternates: { canonical: '/vocabulary' },
  robots: { index: false, follow: true },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return bilingualOg(metadataZh, lang);
}

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
