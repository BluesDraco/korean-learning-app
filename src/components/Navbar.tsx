'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import {
  Home, BookOpen, LayoutGrid, RefreshCw,
  ChevronRight, X, Sun, Moon, Shield, MessageSquare,
  Ellipsis, User,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { navGroups, type NavGroup } from '@/data/navigation';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [mobileDrawer, setMobileDrawer] = useState<number | null>(null);
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

  const closeMobileDrawer = useCallback(() => setMobileDrawer(null), []);

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
          <Image src="/images/tori-poses/tori-pose-01.png" alt="Tori" width={32} height={32} className="object-contain shrink-0" />
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

                {/* Children — inline on desktop, popover on tablet */}
                {isExpanded && group.children.length > 0 && (
                  <div className="lg:ml-7 mt-1 space-y-0.5 lg:relative">
                    {/* On tablet: popover card */}
                    <div className="lg:hidden fixed left-[56px] z-50 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-xl p-2 space-y-0.5 min-w-[180px] animate-fade-in">
                      {group.children.map((child, j) => {
                        const ChildIcon = child.icon;
                        const isActive = pathname.startsWith(child.href) &&
                          (child.href !== '/' || pathname === '/');
                        return (
                          <Link
                            key={j}
                            href={child.href}
                            onClick={() => setExpandedGroup(i)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                              isActive
                                ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] font-medium'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                            }`}
                          >
                            <ChildIcon size={15} className="shrink-0" />
                            <span>{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
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
                <Image src="/images/tori-poses/tori-pose-01.png" alt="Tori" width={24} height={24} className="object-contain" />
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
                  <Image src="/images/tori-poses/tori-pose-01.png" alt="Tori" width={28} height={28} className="object-contain" />
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

      {/* Mobile bottom bar — 5 core items: 首页 / 学习 / 复习 / 词汇 / 更多 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex justify-around z-50 pb-safe shadow-lg">
        {/* 首页 */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 py-2 px-1.5 text-[13px] transition-colors ${
            pathname === '/' ? 'text-[var(--pink-primary)]' : 'text-[var(--text-muted)]'
          }`}
        >
          <Home size={22} />首页
        </Link>

        {/* 学习 */}
        <button
          onClick={() => setMobileDrawer(1)}
          className={`flex flex-col items-center gap-0.5 py-2 px-1.5 text-[13px] transition-colors ${
            navGroups[1].children.some((c) => pathname.startsWith(c.href))
              ? 'text-[var(--pink-primary)]' : 'text-[var(--text-muted)]'
          }`}
        >
          <BookOpen size={22} />学习
        </button>

        {/* 复习 */}
        <button
          onClick={() => setMobileDrawer(2)}
          className={`flex flex-col items-center gap-0.5 py-2 px-1.5 text-[13px] transition-colors ${
            navGroups[2].children.some((c) => pathname.startsWith(c.href))
              ? 'text-[var(--pink-primary)]' : 'text-[var(--text-muted)]'
          }`}
        >
          <RefreshCw size={22} />复习
        </button>

        {/* 词汇 */}
        <button
          onClick={() => setMobileDrawer(3)}
          className={`flex flex-col items-center gap-0.5 py-2 px-1.5 text-[13px] transition-colors ${
            navGroups[3].children.some((c) => pathname.startsWith(c.href))
              ? 'text-[var(--pink-primary)]' : 'text-[var(--text-muted)]'
          }`}
        >
          <LayoutGrid size={22} />词汇
        </button>

        {/* 更多 — shows all groups as drawer */}
        <button
          onClick={() => setMobileDrawer(-1)}
          className={`flex flex-col items-center gap-0.5 py-2 px-1.5 text-[13px] transition-colors ${
            pathname.startsWith('/settings') || pathname.startsWith('/messages') || pathname.startsWith('/korea') || pathname.startsWith('/ai') || pathname.startsWith('/expressions')
              ? 'text-[var(--pink-primary)]' : 'text-[var(--text-muted)]'
          }`}
        >
          <Ellipsis size={22} />更多
        </button>
      </nav>

      {/* Mobile drawer overlay */}
      {mobileDrawer !== null && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/20" onClick={closeMobileDrawer} />
          <div className="absolute bottom-0 left-0 right-0 bg-[var(--bg-card)] rounded-t-3xl shadow-xl animate-slide-up-drawer max-h-[65vh] overflow-y-auto">
            {/* "更多" mode: show all groups */}
            {mobileDrawer === -1 ? (
              <>
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <span className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "'KaiTi', 'STKaiti', cursive" }}>
                    更多
                  </span>
                  <button onClick={closeMobileDrawer} className="p-1 text-[var(--text-secondary)]">
                    <X size={22} />
                  </button>
                </div>
                <div className="px-3 pb-6 space-y-4">
                  {navGroups.map((group, i) => {
                    const GroupIcon = group.icon;
                    return (
                      <div key={i}>
                        <div className="flex items-center gap-2 px-4 py-1 text-xs text-[var(--text-muted)]">
                          <GroupIcon size={14} />
                          <span>{group.label}</span>
                        </div>
                        <div className="space-y-0.5 mt-1">
                          {group.children.length === 0 ? (
                            <Link
                              href={group.href}
                              onClick={closeMobileDrawer}
                              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]"
                            >
                              <GroupIcon size={18} />
                              <span>{group.label}</span>
                            </Link>
                          ) : (
                            group.children.map((child, j) => {
                              const ChildIcon = child.icon;
                              const isActive = pathname === child.href ||
                                (child.href !== '/' && pathname.startsWith(child.href));
                              return (
                                <Link
                                  key={j}
                                  href={child.href}
                                  onClick={closeMobileDrawer}
                                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all ${
                                    isActive
                                      ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] font-medium'
                                      : 'text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                                  }`}
                                >
                                  <ChildIcon size={18} />
                                  <span>{child.label}</span>
                                  <span className="text-xs text-[var(--text-muted)]">{child.ko}</span>
                                </Link>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {/* Settings & Messages quick links */}
                  <div className="border-t border-[var(--border-color)] pt-3 space-y-1">
                    {user && (
                      <Link href="/messages" onClick={closeMobileDrawer}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]"
                      >
                        <MessageSquare size={18} />私信
                      </Link>
                    )}
                    <Link href="/settings" onClick={closeMobileDrawer}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]"
                    >
                      <User size={18} />设置
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between px-5 pt-5 pb-3">
                  <span className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "'KaiTi', 'STKaiti', cursive" }}>
                    {navGroups[mobileDrawer].label}
                    <span className="text-sm font-normal text-[var(--text-muted)] ml-2">{navGroups[mobileDrawer].ko}</span>
                  </span>
                  <button onClick={closeMobileDrawer} className="p-1 text-[var(--text-secondary)]">
                    <X size={22} />
                  </button>
                </div>
                <div className="px-3 pb-6 space-y-1">
                  {navGroups[mobileDrawer].children.map((child, j) => {
                    const ChildIcon = child.icon;
                    const isActive = pathname === child.href ||
                      (child.href !== '/' && pathname.startsWith(child.href));
                    return (
                      <Link
                        key={j}
                        href={child.href}
                        onClick={closeMobileDrawer}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-all ${
                          isActive
                            ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] font-medium'
                            : 'text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                        }`}
                      >
                        <ChildIcon size={18} />
                        <span>{child.label}</span>
                        <span className="text-xs text-[var(--text-muted)]">{child.ko}</span>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Spacer for desktop sidebar — matches sidebar width */}
      <div className="hidden md:block md:w-14 lg:w-52 shrink-0 transition-[width] duration-200" />
    </>
  );
}
