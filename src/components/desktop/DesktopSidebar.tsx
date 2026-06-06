'use client';

import { usePathname, useRouter } from 'next/navigation';

interface NavItem {
  id: string;
  icon: string;
  label: string;
  route: string;
  matchRoutes: string[];
}

const NAV_ITEMS: NavItem[] = [
  { id: 'today', icon: '⌂', label: '今日', route: '/daily', matchRoutes: ['/daily'] },
  { id: 'learn', icon: '▣', label: '学习', route: '/learning', matchRoutes: ['/learning', '/course'] },
  { id: 'kpop', icon: '♪', label: 'KPOP', route: '/korea/kpop', matchRoutes: ['/korea/kpop', '/kpop'] },
  { id: 'news', icon: '◈', label: '热点', route: '/korea/kpop/news', matchRoutes: ['/korea/kpop/news', '/news'] },
  { id: 'practice', icon: '✎', label: '练习', route: '/tools', matchRoutes: ['/tools', '/typing', '/writing', '/pronunciation', '/shadowing'] },
  { id: 'vocab', icon: '◇', label: '词库', route: '/mine/words', matchRoutes: ['/mine/words', '/mine/sentences', '/review'] },
  { id: 'tools', icon: '⚙', label: '工具', route: '/ai/analyze', matchRoutes: ['/ai/analyze', '/grammar', '/dictation'] },
  { id: 'mine', icon: '●', label: '我的', route: '/mine', matchRoutes: ['/mine', '/mine/recordings', '/mine/kpop', '/mine/diary', '/mine/notes', '/mine/practices', '/mine/articles'] },
];

const META: Record<string, [string, string]> = {
  today: ['今日', '用喜欢的内容学韩语'],
  learn: ['学习', '30天课程、韩文字母、场景表达'],
  kpop: ['KPOP', '逐句歌词学习，原唱 + 读音 + 中文'],
  news: ['热点', '韩娱热点阅读，点词看懂韩语'],
  practice: ['练习', '写作、打字、闪卡复习'],
  vocab: ['词库', '保存的单词、句子、语法'],
  tools: ['工具', '文章拆解、查词翻译、听写练习'],
  mine: ['我的', '学习记录与资产'],
};

function resolveActiveNav(pathname: string): string {
  for (const item of NAV_ITEMS) {
    for (const r of item.matchRoutes) {
      if (pathname === r || pathname.startsWith(r + '/')) {
        return item.id;
      }
    }
  }
  return 'today';
}

export function getPageMeta(pathname: string): [string, string] {
  const id = resolveActiveNav(pathname);
  return META[id] || ['Tori Korean', ''];
}

export function DesktopSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const active = resolveActiveNav(pathname);

  return (
    <aside className="desktop-sidebar">
      <div
        className="desktop-logo"
        onClick={() => router.push('/daily')}
        title="Tori Korean"
      />
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`desktop-navbtn${active === item.id ? ' active' : ''}`}
          onClick={() => router.push(item.route)}
        >
          <span className="desktop-navico">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </aside>
  );
}
