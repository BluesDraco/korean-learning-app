'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, BookOpen, Settings, GraduationCap, Compass } from 'lucide-react';
import { useEffect, useState } from 'react';

const tabs = [
  { label: '今日', href: '/daily', icon: Sparkles },
  { label: '词汇', href: '/vocabulary', icon: BookOpen },
  { label: '工具', href: '/tools', icon: Settings },
  { label: '学习', href: '/learning', icon: GraduationCap },
  { label: '探索', href: '/explore', icon: Compass },
];

export function BottomTabBar() {
  const { lang } = useLang();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  // Hide when system keyboard is visible (visualViewport shrinks significantly)
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const check = () => {
      const ratio = vv.height / window.innerHeight;
      setHidden(ratio < 0.75);
    };
    vv.addEventListener('resize', check);
    vv.addEventListener('scroll', check);
    return () => {
      vv.removeEventListener('resize', check);
      vv.removeEventListener('scroll', check);
    };
  }, []);

  if (hidden) return null;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border-color)] bg-[var(--bg-card)] pb-[env(safe-area-inset-bottom,0px)]">
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
