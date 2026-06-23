'use client';

import { useCallback, useEffect, useState, type ComponentType } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, BookOpen, Wrench, GraduationCap, Compass, Shield, NotebookPen } from 'lucide-react';
import { BottomTabBar } from '@/components/mobile/BottomTabBar';
import { FloatingDecorations } from '@/components/FloatingDecorations';
import { useAuth } from '@/components/AuthProvider';

const SHORTCUT_KEY = 'tori_shortcuts';

const ALL_SHORTCUTS = [
  { id: 'news',     label: '热点阅读',    href: '/korea/kpop/news', style: { background: 'var(--color-pink-soft)', color: 'var(--color-pink-strong)', border: '1px solid var(--color-border-1)' } },
  { id: 'analyze',  label: '文章拆解',    href: '/ai/analyze',      style: { background: 'var(--color-surface-2)', color: 'var(--color-ink-2)', border: '1px solid var(--color-border-1)' } },
  { id: 'review',   label: '闪卡复习',    href: '/review',          style: { background: 'var(--color-mint-soft)', color: 'var(--color-mint-strong)', border: '1px solid var(--color-border-1)' } },
  { id: 'dict',     label: '查词翻译',    href: '/dictionary',      style: { background: 'var(--color-surface-2)', color: 'var(--color-ink-2)', border: '1px solid var(--color-border-1)' } },
  { id: 'typing',   label: '韩文打字',    href: '/typing',          style: { background: 'var(--color-surface-2)', color: 'var(--color-ink-2)', border: '1px solid var(--color-border-1)' } },
  { id: 'reading',  label: '文章阅读',    href: '/reading',         style: { background: 'var(--color-surface-2)', color: 'var(--color-ink-2)', border: '1px solid var(--color-border-1)' } },
  { id: 'shadow',   label: '影子跟读',    href: '/shadowing',       style: { background: 'var(--color-surface-2)', color: 'var(--color-ink-2)', border: '1px solid var(--color-border-1)' } },
  { id: 'pronounce',label: '发音练习',    href: '/pronunciation',   style: { background: 'var(--color-surface-2)', color: 'var(--color-ink-2)', border: '1px solid var(--color-border-1)' } },
  { id: 'writing',  label: '写作练习',    href: '/writing',         style: { background: 'var(--color-surface-2)', color: 'var(--color-ink-2)', border: '1px solid var(--color-border-1)' } },
];

const DEFAULT_IDS = ['news', 'analyze', 'review'];

function loadShortcuts(): string[] {
  if (typeof window === 'undefined') return DEFAULT_IDS;
  try {
    const v = localStorage.getItem(SHORTCUT_KEY);
    return v ? JSON.parse(v) : DEFAULT_IDS;
  } catch { return DEFAULT_IDS; }
}

function saveShortcuts(ids: string[]) {
  try { localStorage.setItem(SHORTCUT_KEY, JSON.stringify(ids)); } catch {}
}

type NavItem = {
  id: 'today' | 'diary' | 'vocabulary' | 'tools' | 'learn' | 'explore';
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'today',      Icon: Sparkles,      label: '今日', href: '/daily' },
  { id: 'diary',      Icon: NotebookPen,   label: '日记', href: '/diary' },
  { id: 'vocabulary', Icon: BookOpen,      label: '词汇', href: '/vocabulary' },
  { id: 'tools',      Icon: Wrench,        label: '工具', href: '/tools' },
  { id: 'learn',      Icon: GraduationCap, label: '学习', href: '/learning' },
  { id: 'explore',    Icon: Compass,       label: '探索', href: '/explore' },
];

function resolvePageMeta(pathname: string | null) {
  const p = pathname || '/daily';
  if (p.startsWith('/admin')) return { title: '管理后台', activeId: 'today', hidePanel: true };
  if (p === '/daily') return { title: '今日', activeId: 'today', hidePanel: false };
  if (p.startsWith('/diary')) return { title: '兔莉的韩语日记', activeId: 'diary', hidePanel: true };
  if (p.startsWith('/mine') || p.startsWith('/vocabulary')) return { title: '词汇', activeId: 'vocabulary', hidePanel: false };
  if (p.startsWith('/reading')) return { title: '工具', activeId: 'tools', hidePanel: true };
  if (p === '/tools' || p.startsWith('/tools/')
    || p.startsWith('/typing') || p.startsWith('/writing')
    || p.startsWith('/pronunciation') || p.startsWith('/shadowing')
    || p.startsWith('/dictation') || p.startsWith('/review')
    || p.startsWith('/grammar') || p.startsWith('/ai/')
    || p.startsWith('/dictionary')) return { title: '工具', activeId: 'tools', hidePanel: false };
  if (p.startsWith('/learning') || p.startsWith('/course') || p.startsWith('/phonetics')) return { title: '学习', activeId: 'learn', hidePanel: false };
  if (p.startsWith('/explore')
    || p.startsWith('/korea/')) return { title: '探索', activeId: 'explore', hidePanel: false };
  if (p === '/settings') return { title: '设置', activeId: '', hidePanel: true };
  return { title: 'Tori Korean', activeId: 'today', hidePanel: false };
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const meta = resolvePageMeta(pathname);
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isAdmin = mounted && user?.role === 'admin';

  // 全屏沉浸页（自带覆盖层），不显示移动顶部横幅 + 占位
  const isFullscreenPage = pathname?.startsWith('/diary') ?? false;

  const navigate = useCallback((href: string) => {
    router.push(href);
  }, [router]);

  return (
    <>
      {/* ═══ Mobile ═══ */}
      <div className="block md:hidden">
        {!isFullscreenPage && (
          <>
            <div className="fixed top-0 left-0 right-0 z-[60] bg-[var(--bg-card)] border-b border-[var(--border-color)] py-1.5 text-center pt-safe px-4">
              <span className="text-[11px] font-bold tracking-wider text-[var(--pink-primary)]" style={{ fontFamily: "'KaiTi', 'STKaiti', cursive" }}>
                服务器及用户数据库升级完毕
              </span>
            </div>
            <div className="h-[36px] pt-safe" />
          </>
        )}
        <main className="relative min-h-screen min-h-dvh mx-auto w-full max-w-screen-sm px-4 pt-3 overflow-x-hidden bg-[var(--bg-base)] pb-[calc(72px+env(safe-area-inset-bottom,0px))]">
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
                <span className="desktop-navico"><item.Icon size={22} strokeWidth={1.75} /></span>
                <span>{item.label}</span>
              </button>
            ))}
            {/* User entry at bottom */}
            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--desktop-line)' }}>
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="desktop-foot-btn"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
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
                  <Shield size={14} strokeWidth={1.75} aria-hidden />
                  <span className="desktop-foot-label">管理后台</span>
                </button>
              )}
              <button
                onClick={() => navigate('/settings')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 16px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--pink-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>
                  🐰
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
                  {meta.activeId === 'today' && (
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      {user ? `@${user.nickname}` : '未登录'}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>微信 13817498530</span>
                  <span className="desktop-badge">内测体验</span>
                </div>
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
  const [selectedIds, setSelectedIds] = useState<string[]>(DEFAULT_IDS);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setSelectedIds(loadShortcuts());
  }, []);

  const toggleItem = (id: string) => {
    setSelectedIds(prev => {
      const next = prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 4 ? [...prev, id] : prev;
      saveShortcuts(next);
      return next;
    });
  };

  const shortcuts = ALL_SHORTCUTS.filter(s => selectedIds.includes(s.id));

  return (
    <>
      <div className="panel-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>快捷入口</h3>
          <button
            onClick={() => setEditing(!editing)}
            style={{ fontSize: 11, color: editing ? '#f0799b' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: '2px 4px' }}
          >
            {editing ? '完成' : '编辑'}
          </button>
        </div>

        {editing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '0 0 4px' }}>最多选 4 个</p>
            {ALL_SHORTCUTS.map(s => {
              const checked = selectedIds.includes(s.id);
              const disabled = !checked && selectedIds.length >= 4;
              return (
                <button
                  key={s.id}
                  onClick={() => toggleItem(s.id)}
                  disabled={disabled}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '7px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                    cursor: disabled ? 'not-allowed' : 'pointer', textAlign: 'left',
                    background: checked ? '#201815' : '#f5ece7',
                    color: checked ? '#fff' : '#89756e',
                    border: 'none', opacity: disabled ? 0.4 : 1,
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ width: 14, height: 14, borderRadius: '50%', background: checked ? '#ff7fa8' : 'rgba(0,0,0,0.15)', flexShrink: 0, display: 'inline-block' }} />
                  {s.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {shortcuts.map(s => (
              <button
                key={s.id}
                onClick={() => navigate(s.href)}
                style={{ ...s.style, borderRadius: 999, padding: '8px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {activeId === 'today' && <TodayPanel />}
    </>
  );
}

function TodayPanel() {
  interface PanelData { words: number; sentences: number; articlesRead: number; minutes: number; }

  const [data, setData] = useState<PanelData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { db } = await import('@/lib/db');
        const words = await db.words.count();
        const sentences = 0; // TODO: add sentences table
        const articlesRead = 0;
        setData({ words, sentences, articlesRead, minutes: 0 });
      } catch { setData({ words: 0, sentences: 0, articlesRead: 0, minutes: 0 }); }
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
            <><b style={{ fontSize: 20 }}>{data.articlesRead}</b><span style={{ display: 'block', fontSize: 11, color: '#86746d', marginTop: 2 }}>热点阅读</span></>
          ) : (
            <span style={{ fontSize: 11, color: '#86746d' }}>今日暂无记录</span>
          )}
        </div>
      </div>
    </div>
  );
}
