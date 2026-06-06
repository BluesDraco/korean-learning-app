'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { BottomTabBar } from '@/components/mobile/BottomTabBar';
import { FloatingDecorations } from '@/components/FloatingDecorations';
import { useAuth } from '@/components/AuthProvider';

const NAV_ITEMS = [
  { id: 'today',    icon: '⌂', label: '今日', href: '/daily' },
  { id: 'mine',     icon: '●', label: '我的', href: '/mine' },
  { id: 'tools',    icon: '⚙', label: '工具', href: '/tools' },
  { id: 'learn',    icon: '▣', label: '学习', href: '/learning' },
  { id: 'explore',  icon: '◉', label: '探索', href: '/explore' },
] as const;

function resolvePageMeta(pathname: string | null) {
  const p = pathname || '/daily';
  if (p.startsWith('/admin')) return { title: '管理后台', activeId: 'today', hidePanel: true };
  if (p === '/daily') return { title: '今日', activeId: 'today', hidePanel: false };
  if (p.startsWith('/mine')) return { title: '我的', activeId: 'mine', hidePanel: false };
  if (p === '/tools' || p.startsWith('/tools/')
    || p.startsWith('/typing') || p.startsWith('/writing')
    || p.startsWith('/pronunciation') || p.startsWith('/shadowing')
    || p.startsWith('/dictation') || p.startsWith('/review')
    || p.startsWith('/grammar') || p.startsWith('/ai/')
    || p.startsWith('/dictionary') || p.startsWith('/reading')) return { title: '工具', activeId: 'tools', hidePanel: false };
  if (p.startsWith('/learning') || p.startsWith('/course') || p.startsWith('/phonetics')) return { title: '学习', activeId: 'learn', hidePanel: false };
  if (p.startsWith('/explore')
    || p.startsWith('/korea/kpop/news')
    || p.startsWith('/korea/kpop')
    || p.startsWith('/korea/')
    || p.startsWith('/vocabulary')) return { title: '探索', activeId: 'explore', hidePanel: false };
  return { title: 'Tori Korean', activeId: 'today', hidePanel: false };
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const meta = resolvePageMeta(pathname);
  const { user } = useAuth();

  const navigate = useCallback((href: string) => {
    router.push(href);
  }, [router]);

  return (
    <>
      {/* ═══ Mobile ═══ */}
      <div className="block md:hidden">
        <div className="fixed top-0 left-0 right-0 z-[60] bg-[var(--bg-card)]/90 backdrop-blur border-b border-[var(--border-color)] py-1.5 text-center pt-safe px-4">
          <span className="text-[11px] font-bold tracking-wider text-[var(--pink-primary)]" style={{ fontFamily: "'KaiTi', 'STKaiti', cursive" }}>
            内测期间全功能免费体验
          </span>
        </div>
        <div className="h-[36px] pt-safe" />
        <Navbar />
        <main className="relative min-h-dvh mx-auto w-full max-w-screen-sm px-4 pt-3 overflow-x-hidden bg-[var(--bg-base)] pb-[calc(72px+env(safe-area-inset-bottom,0px))]">
          <FloatingDecorations />
          <div className="relative z-[1]">{children}</div>
          {/* Contact footer */}
          <div className="text-center py-5 mt-4 border-t border-[var(--border-color)]">
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
              联系我：微信 13817498530 · 929989569@qq.com
            </p>
          </div>
        </main>
        <BottomTabBar />
      </div>

      {/* ═══ Desktop ═══ */}
      <div className="hidden md:block desktop-body">
        <div className="desktop-app" style={meta.hidePanel ? { gridTemplateColumns: 'var(--desktop-sidebar) minmax(0, 1fr)' } : undefined}>
          {/* Sidebar */}
          <aside className="desktop-sidebar">
            <div className="desktop-logo" onClick={() => navigate('/daily')} title="Tori Korean" />
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={'desktop-navbtn' + (meta.activeId === item.id ? ' active' : '')}
                onClick={() => navigate(item.href)}
              >
                <span className="desktop-navico">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
            {/* User entry at bottom */}
            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--desktop-line)' }}>
              {/* Contact info */}
              <div style={{ padding: '10px 16px 6px', fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                <div style={{ fontWeight: 700, marginBottom: 2 }}>联系我</div>
                <div>微信：13817498530</div>
                <div>邮件：929989569@qq.com</div>
              </div>
              {user?.role === 'admin' && (
                <button
                  onClick={() => navigate('/admin')}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 16px',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid var(--desktop-line)',
                    cursor: 'pointer',
                    color: 'var(--pink-primary)',
                    fontSize: 11,
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                >
                  <span>⚙</span>
                  <span>管理后台</span>
                </button>
              )}
              <button
                onClick={() => navigate('/settings')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  fontSize: 12,
                  textAlign: 'left',
                }}
              >
                <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--pink-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>
                  🐰
                </span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.nickname ?? '未登录'}
                </span>
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="desktop-main">
            <div className="desktop-main-rail">
              <header className="desktop-topbar">
                <div>
                  <h1>{meta.title}</h1>
                </div>
                <span className="desktop-badge">内测体验</span>
              </header>
              <section className="desktop-content">
                {children}
              </section>
            </div>
          </main>

          {/* Right Panel */}
          {!meta.hidePanel && (
          <aside className="desktop-panel">
            <PanelContent activeId={meta.activeId} navigate={navigate} />
          </aside>
          )}
        </div>

      </div>
    </>
  );
}

function PanelContent({ activeId, navigate }: { activeId: string; navigate: (href: string) => void }) {
  return (
    <>
      <div className="panel-card">
        <h3>快捷入口</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
          <button
            onClick={() => navigate('/korea/kpop')}
            style={{ background: '#201815', color: '#fff', border: 'none', borderRadius: 999, padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}
          >
            {'♪  KPOP 跟唱'}
          </button>
          <button
            onClick={() => navigate('/korea/kpop/news')}
            style={{ background: '#fff0f5', color: '#f0799b', border: '1px solid rgba(255,127,168,.18)', borderRadius: 999, padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}
          >
            {'◈  热点阅读'}
          </button>
          <button
            onClick={() => navigate('/ai/analyze')}
            style={{ background: '#fff', color: '#5a4640', border: '1px solid var(--desktop-line)', borderRadius: 999, padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}
          >
            {'⚙  文章拆解'}
          </button>
          <button
            onClick={() => navigate('/review')}
            style={{ background: '#eaf8f5', color: '#4e746d', border: 'none', borderRadius: 999, padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}
          >
            {'◇  闪卡复习'}
          </button>
        </div>
      </div>
      {activeId === 'today' && <TodayPanel />}
    </>
  );
}

function TodayPanel() {
  interface PanelData { words: number; sentences: number; kpopDone: number; articlesRead: number; minutes: number; }

  const [data, setData] = useState<PanelData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { db } = await import('@/lib/db');
        const words = await db.words.count();
        const sentences = 0; // TODO: add sentences table
        const kpopDone = 0;
        const articlesRead = 0;
        setData({ words, sentences, kpopDone, articlesRead, minutes: 0 });
      } catch { setData({ words: 0, sentences: 0, kpopDone: 0, articlesRead: 0, minutes: 0 }); }
    })();
  }, []);

  return (
    <div className="panel-card">
      <h3>今日统计</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
        <div style={{ background: '#fff8f4', borderRadius: 16, padding: '10px 12px', textAlign: 'center' }}>
          {data ? (
            <><b style={{ fontSize: 20 }}>{data.words}</b><span style={{ display: 'block', fontSize: 11, color: '#86746d', marginTop: 2 }}>已保存单词</span></>
          ) : (
            <span style={{ fontSize: 11, color: '#86746d' }}>去保存第一个词</span>
          )}
        </div>
        <div style={{ background: '#fff8f4', borderRadius: 16, padding: '10px 12px', textAlign: 'center' }}>
          {data ? (
            <><b style={{ fontSize: 20 }}>{data.kpopDone}</b><span style={{ display: 'block', fontSize: 11, color: '#86746d', marginTop: 2 }}>跟唱歌曲</span></>
          ) : (
            <span style={{ fontSize: 11, color: '#86746d' }}>今日暂无记录</span>
          )}
        </div>
      </div>
    </div>
  );
}
