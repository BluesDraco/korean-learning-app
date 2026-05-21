'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, Video, BookOpen, RefreshCw, Pencil, Mic, BarChart3, Library, FileText,
} from 'lucide-react';

const links = [
  { href: '/', label: '首页', icon: Home },
  { href: '/videos', label: '视频', icon: Video },
  { href: '/vocabulary', label: '单词', icon: BookOpen },
  { href: '/knowledge', label: '知识库', icon: Library },
  { href: '/grammar', label: '语法库', icon: FileText },
  { href: '/review', label: '复习', icon: RefreshCw },
  { href: '/dictation', label: '听写', icon: Pencil },
  { href: '/shadowing', label: '跟读', icon: Mic },
  { href: '/stats', label: '统计', icon: BarChart3 },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-56 bg-slate-900 border-r border-slate-800 flex-col p-4 z-50">
        <Link href="/" className="text-xl font-bold text-blue-400 mb-8 px-3">
          한국어
        </Link>
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-colors ${
                active
                  ? 'bg-blue-600/20 text-blue-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around py-2 z-50 pb-safe">
        {links.slice(0, 5).map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] transition-colors ${
                active ? 'text-blue-400' : 'text-slate-500'
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Spacer for desktop sidebar */}
      <div className="hidden md:block w-56 shrink-0" />
    </>
  );
}
