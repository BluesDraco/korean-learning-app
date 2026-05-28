'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Palette, MapPin, UtensilsCrossed, Home } from 'lucide-react';

const tabs = [
  { key: 'culture', label: '文化', icon: Palette, emoji: '👘', href: '/korea/culture' },
  { key: 'travel', label: '旅行', icon: MapPin, emoji: '✈️', href: '/korea/travel' },
  { key: 'food', label: '美食', icon: UtensilsCrossed, emoji: '🍖', href: '/korea/food' },
];

export default function KoreaLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const activeTab = tabs.find((t) => pathname.startsWith(t.href))?.key ?? 'culture';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-soft, #fafafa)' }}>
      {/* Korea top nav bar */}
      <header className="sticky top-[44px] z-40 bg-[var(--bg-card)]/90 backdrop-blur border-b border-[var(--border-color)]">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <Link
              href="/korea"
              className="flex items-center gap-2 text-lg font-bold"
              style={{
                fontFamily: "'ZCOOL KuaiLe', cursive",
                background: 'linear-gradient(135deg, #FF6B6B, #ee5a24)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <span className="text-2xl">🇰🇷</span>
              韩国文化
            </Link>
          </div>
          <nav className="flex items-center gap-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = t.key === activeTab;
              return (
                <Link
                  key={t.key}
                  href={t.href}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] font-medium'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                  }`}
                >
                  <Icon size={13} />
                  <span className="hidden sm:inline">{t.label}</span>
                </Link>
              );
            })}
            <Link
              href="/"
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors ml-1"
            >
              <Home size={13} />
              <span className="hidden sm:inline">主站</span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4">
        {children}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 mt-8 border-t border-[var(--border-color)]">
        <p className="text-xs text-[var(--text-muted)]">
          🇰🇷 韩国文化 · 边看边学韩语
        </p>
      </footer>
    </div>
  );
}
