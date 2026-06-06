'use client';

import { usePathname } from 'next/navigation';
import { getPageMeta } from './DesktopSidebar';

export function DesktopTopBar() {
  const pathname = usePathname();
  const [title, desc] = getPageMeta(pathname);

  return (
    <header className="desktop-topbar">
      <div className="desktop-topbar-left">
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      <div className="desktop-search">
        <span style={{ color: '#b8a69e', fontSize: 16 }}>{'⌕'}</span>
        <input placeholder="搜索歌曲、热点、词汇、语法" />
      </div>
      <span className="desktop-badge">内测免费体验</span>
    </header>
  );
}
