'use client';

import { useAuth } from '@/components/AuthProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, DollarSign, Users, FileText, Activity, Mail,
  ShieldAlert, LogOut, Home, Menu, X, Music, MessageSquare, Video,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: '仪表盘', icon: LayoutDashboard },
  { href: '/admin/revenue', label: '收入中心', icon: DollarSign },
  { href: '/admin/membership', label: '会员管理', icon: Crown },
  { href: '/admin/lifetime-gifts', label: '永久礼盒', icon: Package },
  { href: '/admin/invite', label: '邀请裂变', icon: Gift },
  { href: '/admin/users', label: '用户管理', icon: Users },
  { href: '/admin/users/registrations', label: '注册分析', icon: BarChart2 },
  { href: '/admin/ambassadors', label: '学习大使', icon: Star },
  { href: '/admin/content', label: '内容管理', icon: FileText },
  { href: '/admin/shadowing', label: '影子跟读', icon: Video },
  { href: '/admin/feedback', label: '用户反馈', icon: MessageSquare },
  { href: '/admin/messages', label: '消息中心', icon: Mail },
  { href: '/admin/system', label: '系统监控', icon: Activity },
];

function SidebarContent({ pathname, onNavClick, onLogout }: { pathname: string; onNavClick?: () => void; onLogout: () => void }) {
  return (
    <>
      <div className="px-5 py-5 border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐰</span>
            <div>
              <p className="font-semibold text-sm text-[var(--text-primary)]">토리 관리자</p>
            </div>
          </div>
          {onNavClick && (
            <button onClick={onNavClick} className="lg:hidden text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
              <X size={20} />
            </button>
          )}
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-2">今天的数据都在这里，토리帮你看着 🐰</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-[var(--bg-soft)] text-[var(--pink-primary)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-input)] hover:text-[var(--text-primary)]'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-[var(--border-color)] space-y-1">
        <Link href="/daily" onClick={onNavClick} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-muted)] hover:bg-[var(--bg-input)] hover:text-[var(--text-primary)] transition-colors">
          <Home size={18} />
          返回首页
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-muted)] hover:bg-[var(--bg-input)] hover:text-red-400 transition-colors w-full text-left"
        >
          <LogOut size={18} />
          退出登录
        </button>
      </div>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.replace('/daily');
    }
  }, [user, loading, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-soft)' }}>
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FF8FAB] border-t-transparent" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-soft)' }}>
        <div className="text-center">
          <ShieldAlert size={48} className="mx-auto text-red-400 mb-4" />
          <p className="text-[var(--text-muted)]">无权限访问，正在跳转...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    window.location.href = '/auth/login';
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-soft)' }}>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-56 bg-[var(--bg-card)] border-r border-[var(--border-color)] shrink-0 min-h-screen sticky top-0 left-0"
        style={{ boxShadow: '2px 0 12px rgba(0,0,0,0.04)' }}
      >
        <SidebarContent pathname={pathname} onLogout={handleLogout} />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-[var(--bg-card)] border-r border-[var(--border-color)] flex flex-col z-10 animate-slide-in-left" style={{ boxShadow: '4px 0 20px rgba(0,0,0,0.1)' }}>
            <SidebarContent pathname={pathname} onNavClick={() => setMobileOpen(false)} onLogout={handleLogout} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-card)]">
          <button onClick={() => setMobileOpen(true)} className="text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors">
            <Menu size={20} />
          </button>
          <span className="text-lg">🐰</span>
          <span className="text-sm font-semibold text-[var(--text-primary)]">토리 관리자</span>
        </div>
        <div className="p-4 lg:p-6 xl:p-8 max-w-[1400px]">
          {children}
        </div>
      </div>
    </div>
  );
}
