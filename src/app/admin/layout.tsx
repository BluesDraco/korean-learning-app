'use client';

import { useAuth } from '@/components/AuthProvider';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard, DollarSign, Users, FileText, Activity, Mail,
  ShieldAlert, LogOut, Home, Menu, X,
} from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', label: '仪表盘', icon: LayoutDashboard },
  { href: '/admin/revenue', label: '收入中心', icon: DollarSign },
  { href: '/admin/users', label: '用户管理', icon: Users },
  { href: '/admin/content', label: '内容管理', icon: FileText },
  { href: '/admin/messages', label: '消息中心', icon: Mail },
  { href: '/admin/system', label: '系统监控', icon: Activity },
];

function SidebarContent({ pathname, onNavClick }: { pathname: string; onNavClick?: () => void }) {
  return (
    <>
      <div className="px-5 py-5 border-b border-[#F5E6E0]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐰</span>
            <div>
              <p className="font-semibold text-sm text-gray-800">토리 관리자</p>
            </div>
          </div>
          {onNavClick && (
            <button onClick={onNavClick} className="lg:hidden text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-2">今天的数据都在这里，토리帮你看着 🐰</p>
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
                  ? 'bg-[#FFF0F4] text-[#FF8FAB] font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-[#F5E6E0] space-y-1">
        <Link href="/" onClick={onNavClick} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
          <Home size={18} />
          返回首页
        </Link>
        <button
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            window.location.href = '/';
          }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-gray-50 hover:text-red-400 transition-colors w-full text-left"
        >
          <LogOut size={18} />
          退出登录
        </button>
      </div>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.replace('/');
    }
  }, [user, loading, router]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFFDF9' }}>
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#FF8FAB] border-t-transparent" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFFDF9' }}>
        <div className="text-center">
          <ShieldAlert size={48} className="mx-auto text-red-400 mb-4" />
          <p className="text-gray-500">无权限访问，正在跳转...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#FFFDF9' }}>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col w-56 bg-white border-r border-[#F5E6E0] shrink-0 min-h-screen sticky top-0 left-0"
        style={{ boxShadow: '2px 0 12px rgba(0,0,0,0.04)' }}
      >
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-white border-r border-[#F5E6E0] flex flex-col z-10 animate-slide-in-left" style={{ boxShadow: '4px 0 20px rgba(0,0,0,0.1)' }}>
            <SidebarContent pathname={pathname} onNavClick={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[#F5E6E0] bg-white">
          <button onClick={() => setMobileOpen(true)} className="text-gray-500 hover:text-[#FF8FAB] transition-colors">
            <Menu size={20} />
          </button>
          <span className="text-lg">🐰</span>
          <span className="text-sm font-semibold text-gray-700">토리 관리자</span>
        </div>
        <div className="p-4 lg:p-6 xl:p-8 max-w-[1400px]">
          {children}
        </div>
      </div>
    </div>
  );
}
