'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, BookOpen, NotebookPen, GraduationCap, Compass } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const tabs = [
  { labelKey: 'nav.today', href: '/daily', icon: Sparkles },
  { labelKey: 'nav.vocab', href: '/vocabulary', icon: BookOpen },
  // 日记位居中，是王牌产品入口；图标 NotebookPen 暂用，待用户提供专属图标替换
  { labelKey: 'nav.diary', href: '/diary', icon: NotebookPen, featured: true },
  { labelKey: 'nav.learn', href: '/learning', icon: GraduationCap },
  { labelKey: 'nav.explore', href: '/explore', icon: Compass },
];

export function BottomTabBar() {
  const { lang } = useLang();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  // Paths that belong to the "学习" tab but don't start with /learning
  const LEARNING_PATHS = ['/review', '/grammar', '/reading', '/typing', '/writing', '/phonetics', '/dictation', '/ai', '/listen', '/practice'];
  // Paths that belong to "词汇" tab
  const VOCAB_PATHS = ['/mine'];

  function isTabActive(href: string): boolean {
    if (href === '/daily') return pathname === '/daily';
    if (href === '/learning') return pathname.startsWith('/learning') || LEARNING_PATHS.some(p => pathname.startsWith(p));
    if (href === '/explore') {
      if (pathname.startsWith('/explore')) return true;
      // /learn exactly or /learn/... but NOT /learning
      if (pathname === '/learn' || pathname.startsWith('/learn/')) return true;
      return ['/korea', '/knowledge'].some(p => pathname.startsWith(p));
    }
    if (href === '/vocabulary') return pathname.startsWith('/vocabulary') || VOCAB_PATHS.some(p => pathname.startsWith(p));
    return pathname.startsWith(href);
  }

  // Hide when system keyboard is visible (visualViewport shrinks significantly)
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    let rafId = 0;
    const check = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const ratio = vv.height / window.innerHeight;
        setHidden(prev => {
          // Hysteresis: prevent flickering when viewport ratio oscillates near threshold
          if (prev) return ratio < 0.85;
          return ratio < 0.75;
        });
      });
    };
    vv.addEventListener('resize', check);
    vv.addEventListener('scroll', check);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      vv.removeEventListener('resize', check);
      vv.removeEventListener('scroll', check);
    };
  }, []);

  if (hidden) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[60] border-t border-[var(--border-color)] bg-[var(--bg-card)] pb-[env(safe-area-inset-bottom,0px)] px-safe">
      <div className="mx-auto grid h-[56px] max-w-screen-sm grid-cols-5 px-2">
        {tabs.map((tab) => {
          const active = isTabActive(tab.href);
          const Icon = tab.icon;
          if (tab.featured) {
            // 中间日记项：圆形悬浮按钮风格，比其他 tab 更突出
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="relative flex flex-col items-center justify-center"
              >
                <div
                  className={`absolute -top-3 flex h-12 w-12 items-center justify-center rounded-full transition-all ${
                    active
                      ? 'bg-gradient-to-br from-[#ff7fa8] to-[#ff9d7a] text-white shadow-lg'
                      : 'bg-[var(--bg-card)] text-[var(--pink-primary)] border border-[var(--pink-primary)]/30 shadow-md'
                  }`}
                  style={{ boxShadow: active ? '0 8px 20px rgba(255,127,168,0.35)' : '0 4px 12px rgba(78,52,46,0.08)' }}
                >
                  <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                </div>
                <span
                  className={`mt-7 text-[12px] ${
                    active ? 'font-bold text-[var(--pink-primary)]' : 'font-medium text-[var(--text-muted)]'
                  }`}
                >
                  {t(tab.labelKey, lang)}
                </span>
              </Link>
            );
          }
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
                {t(tab.labelKey, lang)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
