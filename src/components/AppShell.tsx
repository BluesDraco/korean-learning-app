import { Navbar } from '@/components/Navbar';
import { VisitorCounter } from '@/components/VisitorCounter';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] md:left-52 bg-gradient-to-r from-[#FFF5EE] via-[#FFF0F5] to-[#FFF5EE] border-b-2 border-dashed border-pink-200 py-1.5 text-center">
        <span className="text-sm font-bold tracking-widest bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] bg-clip-text text-transparent" style={{ fontFamily: "'KaiTi', 'STKaiti', cursive" }}>🐰 内测阶段，全功能免费体验 · 正式版即将上线</span>
      </div>
      <div className="h-[44px]" />
      <Navbar />
      <main className="pb-16 md:pb-6 pl-0 md:pl-52 px-3 md:px-5 lg:px-8 page-container pt-3">
        {children}
      </main>
      <div className="hidden md:block fixed bottom-4 left-[212px] z-40">
        <VisitorCounter />
      </div>
    </>
  );
}
