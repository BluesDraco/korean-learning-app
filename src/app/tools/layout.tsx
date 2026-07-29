import type { Metadata } from 'next';
import { bilingualOg, SITE_URL } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

const metadataZh: Metadata = {
  title: '免费韩语工具｜罗马音互转 · 在线韩语键盘',
  description: '兔莉韩语工具箱：罗马音与韩文双向互转、免安装在线韩语键盘（Dubeolsik）等实用工具，全部免费在线使用。',
  alternates: { canonical: '/tools' },
  openGraph: {
    title: '免费韩语工具｜罗马音互转 · 在线韩语键盘',
    description: '罗马音互转、在线韩语键盘等免费工具，学韩语、追星、旅行都能用。',
    url: `${SITE_URL}/tools`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '免费韩语工具' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return bilingualOg(metadataZh, lang);
}

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
