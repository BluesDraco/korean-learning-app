'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music, Home } from 'lucide-react';

export default function KpopLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/kpop';

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-soft, #fafafa)' }}>
      {/* KPOP top nav bar */}
      <header className="sticky top-[44px] z-40 bg-[var(--bg-card)]/90 backdrop-blur border-b border-[var(--border-color)]">
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <Link
              href="/kpop"
              className="flex items-center gap-2 text-lg font-bold"
              style={{
                fontFamily: "'ZCOOL KuaiLe', cursive",
                background: 'linear-gradient(135deg, #FF69B4, #9B59B6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <span className="text-2xl">🎧</span>
              KPOP 学韩语
            </Link>
            {!isHome && (
              <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
                用你最爱的歌曲学韩语
              </span>
            )}
          </div>
          <nav className="flex items-center gap-2">
            <Link
              href="/kpop"
              className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors ${
                isHome
                  ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] font-medium'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              <Music size={13} />
              曲库
            </Link>
            <Link
              href="/"
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
            >
              <Home size={13} />
              主站
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
          🎧 KPOP 学韩语 · 用你最爱的歌曲学韩语
        </p>
      </footer>
    </div>
  );
}
