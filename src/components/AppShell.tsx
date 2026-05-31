import { Navbar } from '@/components/Navbar';
import { VisitorCounter } from '@/components/VisitorCounter';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] md:left-14 lg:left-52 bg-[var(--bg-soft)] border-b-2 border-dashed border-[var(--pink-pale)] py-1.5 text-center">
        <span className="text-xs md:text-sm font-bold tracking-widest bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] bg-clip-text text-transparent" style={{ fontFamily: "'KaiTi', 'STKaiti', cursive" }}>🐰 内测阶段，全功能免费体验 · 正式版即将上线</span>
      </div>
      <div className="h-[44px]" />
      <Navbar />
      <main className="min-h-dvh pb-16 md:pb-6 pl-0 md:pl-14 lg:pl-52 px-3 md:px-4 lg:px-8 page-container pt-3 transition-[padding] duration-200"
        style={{ paddingBottom: 'calc(64px + env(safe-area-inset-bottom, 0px))' }}
      >
        {children}
      </main>
      <div className="hidden md:block fixed bottom-4 left-[70px] lg:left-[212px] z-40 transition-all duration-200">
        <VisitorCounter />
      </div>
    </>
  );
}
