'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import {
  ChevronRight, X, Sun, Moon, Shield, MessageSquare,
  User, Sparkles, Wrench, GraduationCap, Compass,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { navGroups, type NavGroup } from '@/data/navigation';

const mobileTabs = [
  { label: '今日', href: '/daily',   icon: Sparkles },
  { label: '我的', href: '/mine',     icon: User },
  { label: '工具', href: '/tools',    icon: Wrench },
  { label: '学习', href: '/learning', icon: GraduationCap },
  { label: '探索', href: '/explore',  icon: Compass },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread message count
  useEffect(() => {
    if (!user) return;
    fetch('/api/announcements/unread')
      .then((r) => r.json())
      .then((d) => setUnreadCount(d.count ?? 0))
      .catch(() => {});
  }, [user]);

  // Auto-expand the group containing current path
  useEffect(() => {
    const idx = navGroups.findIndex((g) =>
      g.children.some((c) => pathname.startsWith(c.href)) ||
      (g.href !== '/' && pathname.startsWith(g.href)) ||
      (g.href === '/' && pathname === '/')
    );
    if (idx >= 0) setExpandedGroup(idx);
  }, [pathname]);

  const handleGroupClick = (group: NavGroup, i: number) => {
    if (group.children.length === 0) {
      router.push(group.href);
      return;
    }
    setExpandedGroup(expandedGroup === i ? null : i);
  };

  return (
    <>
      {/* Desktop sidebar — retro journal binder */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 md:w-14 lg:w-52 bg-[var(--bg-card)] border-r border-[var(--border-color)] flex-col z-50 shadow-sm transition-[width] duration-200"
        style={{
          borderImage: 'repeating-linear-gradient(180deg, var(--pink-pale, #FFD6E0) 0px, var(--pink-pale, #FFD6E0) 2px, transparent 2px, transparent 8px) 1',
          borderRightWidth: '3px',
          borderRightStyle: 'solid',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 md:justify-center lg:justify-start md:px-2 lg:px-4 py-4"
          onClick={() => setExpandedGroup(null)}
        >
          <Image src="/images/tori-poses/tori-pose-01.webp" alt="Tori" width={32} height={32} className="object-contain shrink-0" />
          <span
            className="hidden lg:inline text-xl font-bold bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] bg-clip-text text-transparent"
            style={{ fontFamily: "'KaiTi', 'STKaiti', cursive" }}
          >
            한국어
          </span>
        </Link>

        {/* Nav groups */}
        <div className="flex-1 px-1.5 lg:px-3 space-y-1 overflow-y-auto">
          {navGroups.map((group, i) => {
            const Icon = group.icon;
            const isExpanded = expandedGroup === i;
            const isGroupActive = group.children.length > 0
              ? group.children.some((c) => pathname.startsWith(c.href))
              : pathname === group.href;

            return (
              <div key={i}>
                {/* Group header */}
                <button
                  onClick={() => handleGroupClick(group, i)}
                  title={`${group.label} ${group.ko}`}
                  className={`w-full flex items-center gap-2 md:justify-center lg:justify-start md:px-1.5 lg:px-2.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isGroupActive || isExpanded
                      ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon size={20} />
                  <div className="hidden lg:flex flex-1 text-left min-w-0">
                    <span className="whitespace-nowrap">{group.label}<span className="text-[11px] text-[var(--text-muted)] ml-1">{group.ko}</span></span>
                  </div>
                  {group.children.length > 0 && (
                    <ChevronRight
                      size={14}
                      className={`hidden lg:block transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  )}
                </button>

                {/* Children — inline on desktop, drawer on tablet */}
                {isExpanded && group.children.length > 0 && (
                  <div className="lg:ml-7 mt-1 space-y-0.5 lg:relative">
                    {/* On tablet: full-height drawer */}
                    <div className="lg:hidden fixed left-14 top-0 bottom-0 w-52 z-40 bg-[var(--bg-card)] border-r border-[var(--border-color)] shadow-2xl py-16 px-3 space-y-0.5 overflow-y-auto animate-slide-in-left">
                      <div className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider px-2 pb-2 border-b border-[var(--border-color)] mb-2">
                        {group.label}<span className="ml-1 font-normal normal-case text-[var(--text-placeholder)]">{group.ko}</span>
                      </div>
                      {group.children.map((child, j) => {
                        const ChildIcon = child.icon;
                        const isActive = pathname.startsWith(child.href) &&
                          (child.href !== '/' || pathname === '/');
                        return (
                          <Link
                            key={j}
                            href={child.href}
                            onClick={() => setExpandedGroup(null)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                              isActive
                                ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] font-medium'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                            }`}
                          >
                            <ChildIcon size={16} className="shrink-0" />
                            <div className="min-w-0">
                              <span>{child.label}</span>
                              <span className="text-[11px] text-[var(--text-muted)] ml-1">{child.ko}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    {/* On tablet: backdrop */}
                    <div className="lg:hidden fixed inset-0 z-30 bg-black/10" onClick={() => setExpandedGroup(null)} />
                    {/* On desktop: inline */}
                    <div className="hidden lg:block">
                      {group.children.map((child, j) => {
                        const ChildIcon = child.icon;
                        const isActive = pathname.startsWith(child.href) &&
                          (child.href !== '/' || pathname === '/');
                        return (
                          <Link
                            key={j}
                            href={child.href}
                            onClick={() => setExpandedGroup(i)}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-all ${
                              isActive
                                ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] font-medium'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                            }`}
                          >
                            <ChildIcon size={15} className="shrink-0" />
                            <div className="min-w-0">
                              <span className="whitespace-nowrap">{child.label}<span className="text-[11px] text-[var(--text-muted)] ml-1">{child.ko}</span></span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom: messages + theme toggle + mascot */}
        <div className="px-1.5 lg:px-3 py-3 border-t border-[var(--border-default)] space-y-2.5">
          {user && (
            <Link
              href="/messages"
              title="我的私信"
              className="w-full flex items-center justify-center lg:justify-start gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors md:px-1 lg:px-2 py-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] relative"
            >
              <span className="relative">
                <Image src="/images/tori-poses/tori-pose-01.webp" alt="Tori" width={24} height={24} className="object-contain" />
                <span className="absolute -top-0.5 -right-1.5 text-sm">✉️</span>
              </span>
              <span className="hidden lg:inline">我的私信</span>
              {unreadCount > 0 && (
                <span className="hidden lg:flex ml-auto bg-[var(--pink-primary)] text-white text-[11px] font-bold min-w-[18px] h-[18px] rounded-full items-center justify-center px-1">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>
          )}
          <button
            onClick={toggle}
            className="w-full flex items-center justify-center lg:justify-start gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors md:px-1 lg:px-2 py-1.5 rounded-lg hover:bg-[var(--bg-card-hover)]"
            title={theme === 'light' ? '切换深色模式' : '切换亮色模式'}
          >
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            <span className="hidden lg:inline">{theme === 'light' ? '深色模式' : '亮色模式'}</span>
          </button>
          {user ? (
            <div className="space-y-1.5">
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  title="管理后台"
                  className="flex items-center justify-center lg:justify-start gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors md:px-1 lg:px-2 py-1.5 rounded-lg hover:bg-[var(--pink-primary)]/5"
                >
                  <Shield size={14} />
                  <span className="hidden lg:inline">管理后台</span>
                </Link>
              )}
              <Link
                href="/settings"
                title="设置"
                className="flex items-center justify-center lg:justify-start gap-2 bg-[var(--bg-soft)] rounded-xl md:px-2 lg:px-3 py-2.5 hover:bg-[var(--bg-accent)] transition-colors cursor-pointer"
              >
                <div className="relative">
                  <Image src="/images/tori-poses/tori-pose-01.webp" alt="Tori" width={28} height={28} className="object-contain" />
                  <span className="status-dot learning absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5" />
                </div>
                <div className="hidden lg:flex flex-col flex-1 min-w-0">
                  <span className="text-xs font-medium text-[var(--text-primary)] truncate">{user.nickname || user.username}</span>
                  <span className="text-[13px] text-[var(--text-muted)]">设置</span>
                </div>
              </Link>
              <button
                onClick={() => logout()}
                title="退出登录"
                className="w-full text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors md:px-1 lg:px-2 py-1"
              >
                <span className="hidden lg:inline">退出登录</span>
                <span className="lg:hidden">退出</span>
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <Link
                href="/auth/login"
                title="登录"
                className="flex items-center justify-center lg:justify-start gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors md:px-1 lg:px-2 py-1.5"
              >
                <span className="hidden lg:inline">登录</span>
              </Link>
              <Link
                href="/auth/register"
                title="注册"
                className="flex items-center justify-center lg:justify-start gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors md:px-1 lg:px-2 py-1.5"
              >
                <span className="hidden lg:inline">注册</span>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile bottom bar — 5 tabs: 今日｜我的｜工具｜学习｜探索 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex justify-around z-50 pb-safe shadow-lg">
        {mobileTabs.map((tab) => {
          const active = tab.href === '/daily'
            ? pathname === '/daily' || pathname === '/'
            : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 py-2 px-1.5 text-[13px] transition-colors ${
                active ? 'text-[var(--pink-primary)]' : 'text-[var(--text-muted)]'
              }`}
            >
              <Icon size={22} />
              <span className="text-[11px]">{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Spacer for desktop sidebar — matches sidebar width */}
      <div className="hidden md:block md:w-14 lg:w-52 shrink-0 transition-[width] duration-200" />
    </>
  );
}
