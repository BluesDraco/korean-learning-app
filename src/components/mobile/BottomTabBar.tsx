'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, User, Wrench, GraduationCap, Compass } from 'lucide-react';

const tabs = [
  { label: '今日', href: '/daily', icon: Sparkles },
  { label: '我的', href: '/mine', icon: User },
  { label: '工具', href: '/tools', icon: Wrench },
  { label: '学习', href: '/learning', icon: GraduationCap },
  { label: '探索', href: '/explore', icon: Compass },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border-color)] bg-[var(--bg-card)]/95 backdrop-blur pb-[env(safe-area-inset-bottom,0px)]">
      <div className="mx-auto grid h-[56px] max-w-screen-sm grid-cols-5 px-2">
        {tabs.map((tab) => {
          const isHome = tab.href === '/daily';
          const active = isHome
            ? pathname === '/daily'
            : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center gap-0.5 rounded-2xl transition-colors px-3 py-1 ${
                active
                  ? 'text-[var(--pink-primary)] bg-[var(--bg-soft)]'
                  : 'text-[var(--text-muted)] active:text-[var(--text-secondary)]'
              }`}
            >
              <Icon size={24} strokeWidth={active ? 2.5 : 1.8} />
              <span className={`text-[12px] ${active ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
