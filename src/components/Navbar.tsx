'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import {
  Home, BookOpen, Gamepad2, LayoutGrid, Flower2, Bot,
  GraduationCap, Grid3X3, Waves, FileText, BookImage,
  RefreshCw, Pencil, Mic, PenLine,
  Library, Video, Bookmark,
  Palette, Landmark, MapPin, UtensilsCrossed,
  MessageSquare, Lightbulb, MessageCircle, Sparkles,
  ChevronRight, X, Sun, Moon, Shield,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface NavChild {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface NavGroup {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  href: string;
  children: NavChild[];
}

const navGroups: NavGroup[] = [
  { icon: Home, label: '首页', href: '/', children: [] },
  {
    icon: BookOpen, label: '学习', href: '/learn', children: [
      { label: '每日学习', href: '/learn', icon: GraduationCap },
      { label: '四十音', href: '/phonetics', icon: Grid3X3 },
      { label: '连读规则', href: '/phonetics/rules', icon: Waves },
      { label: '语法库', href: '/grammar', icon: FileText },
      { label: '绘本学习', href: '/learn/picture-books', icon: BookImage },
      { label: '文章阅读', href: '/reading', icon: BookOpen },
    ],
  },
  {
    icon: Gamepad2, label: '练习', href: '/review', children: [
      { label: 'SRS复习', href: '/review', icon: RefreshCw },
      { label: '听写', href: '/dictation', icon: Pencil },
      { label: '跟读', href: '/shadowing', icon: Mic },
      { label: '写作', href: '/writing', icon: PenLine },
      { label: 'TOPIK模拟', href: '/topik', icon: FileText },
    ],
  },
  {
    icon: LayoutGrid, label: '词汇', href: '/vocabulary', children: [
      { label: '单词库', href: '/vocabulary', icon: BookOpen },
      { label: '自定义单词本', href: '/vocabulary/books', icon: Bookmark },
      { label: '延世教材词书', href: '/vocabulary/yonsei', icon: GraduationCap },
      { label: '知识库', href: '/knowledge', icon: Library },
      { label: '视频库', href: '/videos', icon: Video },
    ],
  },
  {
    icon: Flower2, label: '韩国', href: '/korea', children: [
      { label: '文化', href: '/korea/culture', icon: Palette },
      { label: '历史', href: '/korea/history', icon: Landmark },
      { label: '旅行', href: '/korea/travel', icon: MapPin },
      { label: '美食', href: '/korea/food', icon: UtensilsCrossed },
      { label: '常用表达', href: '/expressions', icon: MessageCircle },
    ],
  },
  {
    icon: Bot, label: 'AI助手', href: '/ai', children: [
      { label: 'AI 总览', href: '/ai', icon: Sparkles },
      { label: '对话拆解', href: '/ai/analyze', icon: MessageSquare },
      { label: '情景对话', href: '/ai/chat', icon: MessageSquare },
      { label: '学习方案', href: '/ai/plan', icon: Lightbulb },
    ],
  },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const [expandedGroup, setExpandedGroup] = useState<number | null>(null);
  const [mobileDrawer, setMobileDrawer] = useState<number | null>(null);

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
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-48 bg-[var(--bg-card)] border-r border-[var(--border-color)] flex-col z-50 shadow-sm"
        style={{
          borderImage: 'repeating-linear-gradient(180deg, var(--pink-pale, #FFD6E0) 0px, var(--pink-pale, #FFD6E0) 2px, transparent 2px, transparent 8px) 1',
          borderRightWidth: '3px',
          borderRightStyle: 'solid',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 px-4 py-4"
          onClick={() => setExpandedGroup(null)}
        >
          <img src="/images/tori-poses/tori-pose-01.png" alt="Tori" className="w-8 h-8 object-contain" />
          <span
            className="text-xl font-bold bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] bg-clip-text text-transparent"
            style={{ fontFamily: "'ZCOOL KuaiLe', cursive" }}
          >
            한국어
          </span>
        </Link>

        {/* Nav groups */}
        <div className="flex-1 px-3 space-y-1 overflow-y-auto">
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
                  className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isGroupActive || isExpanded
                      ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon size={20} />
                  <span className="flex-1 text-left">{group.label}</span>
                  {group.children.length > 0 && (
                    <ChevronRight
                      size={14}
                      className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  )}
                </button>

                {/* Children */}
                {isExpanded && group.children.length > 0 && (
                  <div className="ml-7 mt-1 space-y-0.5">
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
                          <ChildIcon size={15} />
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom: theme toggle + mascot */}
        <div className="px-3 py-3 border-t border-[var(--border-default)] space-y-2.5">
          <button
            onClick={toggle}
            className="w-full flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-2 py-1.5 rounded-lg hover:bg-[var(--bg-card-hover)]"
            title={theme === 'light' ? '切换深色模式' : '切换亮色模式'}
          >
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            <span>{theme === 'light' ? '深色模式' : '亮色模式'}</span>
          </button>
          {user ? (
            <div className="space-y-1.5">
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors px-2 py-1.5 rounded-lg hover:bg-[var(--pink-primary)]/5"
                >
                  <Shield size={14} />
                  <span>管理后台</span>
                </Link>
              )}
              <Link
                href="/settings"
                className="flex items-center gap-2 bg-[var(--bg-soft)] rounded-xl px-3 py-2.5 hover:bg-[var(--bg-accent)] transition-colors cursor-pointer"
              >
                <div className="relative">
                  <img src="/images/tori-poses/tori-pose-01.png" alt="Tori" className="w-7 h-7 object-contain" />
                  <span className="status-dot learning absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5" />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-xs font-medium text-[var(--text-primary)] truncate">{user.nickname || user.username}</span>
                  <span className="text-[13px] text-[var(--text-muted)]">设置</span>
                </div>
              </Link>
              <button
                onClick={() => logout()}
                className="w-full text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-2 py-1"
              >
                退出登录
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              <Link
                href="/auth/login"
                className="flex items-center gap-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-2 py-1.5"
              >
                登录
              </Link>
              <Link
                href="/auth/register"
                className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-2 py-1.5"
              >
                注册
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-card)] border-t border-[var(--border-color)] flex justify-around z-50 pb-safe shadow-lg">
        {navGroups.map((group, i) => {
          const Icon = group.icon;
          const isActive = group.children.length > 0
            ? group.children.some((c) => pathname.startsWith(c.href))
            : pathname === group.href;

          return (
            <button
              key={i}
              onClick={() => {
                if (group.children.length === 0) {
                  router.push(group.href);
                  return;
                }
                setMobileDrawer(i);
              }}
              className={`flex flex-col items-center gap-0.5 py-2 px-1.5 text-[13px] transition-colors ${
                isActive ? 'text-[var(--pink-primary)]' : 'text-[var(--text-muted)]'
              }`}
            >
              <Icon size={22} />
              {group.label}
            </button>
          );
        })}
      </nav>

      {/* Mobile drawer overlay */}
      {mobileDrawer !== null && (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/20" onClick={closeMobileDrawer} />
          <div className="absolute bottom-0 left-0 right-0 bg-[var(--bg-card)] rounded-t-3xl shadow-xl animate-slide-up-drawer max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <span className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "'ZCOOL KuaiLe', cursive" }}>
                {navGroups[mobileDrawer].label}
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
                    {child.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Spacer for desktop sidebar */}
      <div className="hidden md:block w-48 shrink-0" />
    </>
  );
}
