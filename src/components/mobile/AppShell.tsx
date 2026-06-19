'use client';

import { Navbar } from '@/components/Navbar';
import { VisitorCounter } from '@/components/VisitorCounter';
import { BottomTabBar } from '@/components/mobile/BottomTabBar';
import { FloatingDecorations } from '@/components/FloatingDecorations';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] md:left-14 lg:left-52 bg-[var(--bg-card)]/90 md:bg-[var(--bg-soft)] backdrop-blur md:backdrop-blur-0 border-b border-[var(--border-color)] md:border-b-2 md:border-dashed md:border-[var(--pink-pale)] py-1.5 text-center pt-safe px-4">
        <span className="text-[11px] md:text-sm font-bold tracking-wider md:tracking-widest text-[var(--pink-primary)] md:text-transparent md:bg-gradient-to-r md:from-[var(--pink-primary)] md:to-[var(--purple-soft)] md:bg-clip-text" style={{ fontFamily: "'KaiTi', 'STKaiti', cursive" }}>
          <span className="md:hidden">内测期间全功能免费体验</span>
          <span className="hidden md:inline">内测期间全功能免费体验</span>
        </span>
      </div>
      <div className="h-[36px] md:h-[44px] pt-safe" />

      <Navbar />

      <main className="relative min-h-dvh md:min-h-dvh mx-auto w-full max-w-screen-sm md:max-w-none px-4 md:pl-14 md:pr-6 lg:pl-52 lg:pr-12 pt-3 overflow-x-hidden bg-[var(--bg-base)] md:bg-transparent"
        style={{ paddingBottom: 'calc(88px + env(safe-area-inset-bottom, 0px))' }}
      >
        <FloatingDecorations />
        <div className="relative z-[1]">{children}</div>
      </main>

      <BottomTabBar />

      <div className="hidden md:block fixed bottom-4 left-[70px] lg:left-[212px] z-40 transition-all duration-200">
        <VisitorCounter />
      </div>
    </>
  );
}
