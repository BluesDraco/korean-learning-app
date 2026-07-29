'use client';

import '@/lib/polyfills';
import { useCallback, useEffect, useState, type ComponentType } from 'react';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, BookOpen, GraduationCap, Compass, Shield, NotebookPen, Settings } from 'lucide-react';
import { BottomTabBar } from '@/components/mobile/BottomTabBar';
import { useIsDesktop } from '@/lib/useIsMobile';
import { FloatingDecorations } from '@/components/FloatingDecorations';
import { useAuth } from '@/components/AuthProvider';
import UserAvatar from '@/components/UserAvatar';
import { DiaryDay2Announcement } from '@/components/diary/DiaryDay2Announcement';
import { PopupAnnouncement } from '@/components/PopupAnnouncement';
import { LoginInvitePopup } from '@/components/LoginInvitePopup';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const GlobalCarrot = dynamic(() => import('@/components/GlobalCarrot').then((m) => m.GlobalCarrot), { ssr: false });

// 全站通用胡萝卜助手挂载判断：日记板块已有专属胡萝卜，blog/radio 属日记全屏内容页，auth/membership 不挂
function shouldShowGlobalCarrot(p: string | null): boolean {
  if (!p || p === '/') return false;
  const excluded = ['/diary', '/blog', '/radio', '/auth', '/membership', '/admin', '/settings'];
  return !excluded.some((x) => p === x || p.startsWith(x + '/'));
}

const SHORTCUT_KEY = 'tori_shortcuts';
const MAX_SHORTCUTS = 6;

type Shortcut = { id: string; groupKey: string; href: string };
type ShortcutGroup = { groupKey: string; items: Shortcut[] };

// 全站可直达入口 · 按板块分类，供右侧「快捷入口」自由选择
// label 走 i18n：分组用 shell.sc_group_<groupKey>，项用 shell.sc_<id>
const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    groupKey: 'learn',
    items: [
      { id: 'map',       groupKey: 'learn', href: '/map' },
      { id: 'phonetics', groupKey: 'learn', href: '/phonetics' },
      { id: 'grammar',   groupKey: 'learn', href: '/grammar' },
      { id: 'topik',     groupKey: 'learn', href: '/topik' },
      { id: 'analyze',   groupKey: 'learn', href: '/ai/analyze' },
    ],
  },
  {
    groupKey: 'practice',
    items: [
      { id: 'practice',  groupKey: 'practice', href: '/practice' },
      { id: 'speaking',  groupKey: 'practice', href: '/speaking' },
      { id: 'dictation', groupKey: 'practice', href: '/dictation' },
      { id: 'writing',   groupKey: 'practice', href: '/writing' },
      { id: 'typing',    groupKey: 'practice', href: '/typing' },
    ],
  },
  {
    groupKey: 'vocab',
    items: [
      { id: 'library',   groupKey: 'vocab', href: '/vocabulary/library' },
      { id: 'books',     groupKey: 'vocab', href: '/vocabulary/books' },
      { id: 'review',    groupKey: 'vocab', href: '/review' },
      { id: 'dictionary',groupKey: 'vocab', href: '/vocabulary/dictionary' },
    ],
  },
  {
    groupKey: 'reading',
    items: [
      { id: 'reading',   groupKey: 'reading', href: '/reading' },
      { id: 'picbooks',  groupKey: 'reading', href: '/reading/picture-books' },
      { id: 'knowledge', groupKey: 'reading', href: '/reading/knowledge' },
    ],
  },
  {
    groupKey: 'interest',
    items: [
      { id: 'diary',     groupKey: 'interest', href: '/diary' },
      { id: 'blog',      groupKey: 'interest', href: '/blog' },
      { id: 'radio',     groupKey: 'interest', href: '/radio' },
      { id: 'korea',     groupKey: 'interest', href: '/korea' },
      { id: 'tools',     groupKey: 'interest', href: '/tools' },
      { id: 'stats',     groupKey: 'interest', href: '/stats' },
    ],
  },
];

const ALL_SHORTCUTS: Shortcut[] = SHORTCUT_GROUPS.flatMap((g) => g.items);

const DEFAULT_IDS = ['map', 'analyze', 'reading', 'grammar'];

function loadShortcuts(): string[] {
  if (typeof window === 'undefined') return DEFAULT_IDS;
  try {
    const v = localStorage.getItem(SHORTCUT_KEY);
    if (!v) return DEFAULT_IDS;
    const ids = JSON.parse(v) as string[];
    return ids.filter(id => ALL_SHORTCUTS.some(s => s.id === id));
  } catch { return DEFAULT_IDS; }
}

function saveShortcuts(ids: string[]) {
  try { localStorage.setItem(SHORTCUT_KEY, JSON.stringify(ids)); } catch {}
}

type NavItem = {
  id: 'today' | 'diary' | 'vocabulary' | 'learn' | 'explore';
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  labelKey: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { id: 'today',      Icon: Sparkles,      labelKey: 'nav.today', href: '/daily' },
  { id: 'vocabulary', Icon: BookOpen,      labelKey: 'nav.vocab', href: '/vocabulary' },
  { id: 'diary',      Icon: NotebookPen,   labelKey: 'nav.diary', href: '/diary' },
  { id: 'learn',      Icon: GraduationCap, labelKey: 'nav.learn', href: '/learning' },
  { id: 'explore',    Icon: Compass,       labelKey: 'nav.explore', href: '/explore' },
];

function resolvePageMeta(pathname: string | null) {
  const p = pathname || '/daily';
  if (p.startsWith('/admin')) return { titleKey: 'shell.title_admin', activeId: 'today', hidePanel: true };
  if (p === '/daily') return { titleKey: 'shell.title_today', activeId: 'today', hidePanel: false };
  if (p.startsWith('/diary')) return { titleKey: 'shell.title_diary', activeId: 'diary', hidePanel: true };
  // 兔莉的博客：自带页头的全屏独立页（走 isFullscreenPage 分支，不挂 AppShell 外壳），归属日记板块
  if (p.startsWith('/blog')) return { titleKey: 'shell.title_blog', activeId: 'diary', hidePanel: true };
  // 动物城电台：自带页头的全屏独立页（走 isFullscreenPage 分支，不挂 AppShell 外壳），归属日记板块
  if (p.startsWith('/radio')) return { titleKey: 'shell.title_radio', activeId: 'diary', hidePanel: true };
  // 词汇板块：闪卡类子页面是全屏交互工具，隐藏右侧快捷面板；其他入口/列表/详情页显示
  if (p.startsWith('/vocabulary')) {
    const isFlashcard = p.includes('/flashcards') || p.includes('/mastered');
    return { titleKey: 'shell.title_vocab', activeId: 'vocabulary', hidePanel: isFlashcard };
  }
  // 「我的」板块（主页+错题+录音）：动物城小家，暖奶油满宽布局，隐右侧快捷入口
  if (p.startsWith('/mine')) return { titleKey: 'shell.title_mine', activeId: 'vocabulary', hidePanel: true, hideTopbar: true, wideMain: true };
  // 成就墙 / 消息：暖奶油小家风，隐右栏 + 隐 topbar + 满宽（与 /mine 一致，页面自带返回）
  if (p.startsWith('/achievement')) return { titleKey: 'shell.title_mine', activeId: 'vocabulary', hidePanel: true, hideTopbar: true, wideMain: true };
  if (p.startsWith('/messages')) return { titleKey: 'shell.title_mine', activeId: 'vocabulary', hidePanel: true, hideTopbar: true, wideMain: true };
  // 四十音页面要全宽沉浸：屏蔽顶部 bar + 撑满主区，但保留右侧快捷面板
  if (p.startsWith('/phonetics')) return { titleKey: 'shell.title_phonetics', activeId: 'learn', hidePanel: true, hideTopbar: true, wideMain: true };
  // 语法入门：走 phonetics 风皮肤，撑满主区去掉外层径向色块（保留 topbar + panel）
  if (p.startsWith('/grammar')) return { titleKey: 'shell.title_grammar', activeId: 'learn', hidePanel: true, hideTopbar: true, wideMain: true };
  // TOPIK 备考：走 phonetics 风皮肤
  if (p.startsWith('/topik')) return { titleKey: 'shell.title_topik', activeId: 'learn', hidePanel: true, hideTopbar: true, wideMain: true };
  // 练习中心：走 phonetics/grammar 同款皮肤（奶油底 + 无 topbar + 撑满主区）
  if (p.startsWith('/practice')) return { titleKey: 'shell.title_practice_center', activeId: 'learn', hidePanel: true, hideTopbar: true, wideMain: true };
  // 练习四模式子路由同款皮肤,内部已有 hr-brand 标头
  if (p.startsWith('/speaking')  || p.startsWith('/listening') || p.startsWith('/dictation')
    || p.startsWith('/writing')   || p.startsWith('/typing'))
    return { titleKey: 'shell.title_practice', activeId: 'learn', hidePanel: true, hideTopbar: true, wideMain: true };
  // 学习入口（桌面）：走 phonetics 风皮肤
  if (p === '/learning') return { titleKey: 'shell.title_learn', activeId: 'learn', hidePanel: false };
  // 内容拆解：三栏工作台需要完整宽度，隐掉右侧快捷入口 + 外层 topbar（页面内有自己的顶栏）
  if (p.startsWith('/ai/analyze')) return { titleKey: 'shell.title_analyze', activeId: 'learn', hidePanel: true, wideMain: true, hideTopbar: true };
  // 文章阅读（동물 도시 도서관）：自带页头的全屏独立页（走 isFullscreenPage 分支，不挂 AppShell 外壳）
  if (p.startsWith('/reading')) return { titleKey: 'shell.title_reading', activeId: 'learn', hidePanel: true };
  // 学习相关：系统课程 + 工具箱
  if (p.startsWith('/review')) return { titleKey: 'shell.title_learn', activeId: 'learn', hidePanel: false };
  // 绘本阅读器（详情页）：沉浸式翻页书，走 wide 皮肤（无 topbar + 无 panel + 撑满主区），避免被外壳挤成窄栏
  if (p.startsWith('/learn/picture-books/')) return { titleKey: 'shell.title_picbook', activeId: 'explore', hidePanel: true, hideTopbar: true, wideMain: true };
  // 绘本馆列表页：暖奶油故事书屋皮肤（页面自带 hero + 返回），走 wide 去掉外壳 topbar/panel
  if (p.startsWith('/learn/picture-books')) return { titleKey: 'shell.title_picbook', activeId: 'explore', hidePanel: true, hideTopbar: true, wideMain: true };
  // 探索：兴趣发现、知识库（韩国小知识已迁入 /reading/knowledge）
  if (p.startsWith('/explore')
    || p.startsWith('/korea/')) return { titleKey: 'shell.title_explore', activeId: 'explore', hidePanel: false };
  // /tools 旧入口已删除，下方探索保持不变
  if (p === '/settings') return { titleKey: 'shell.title_settings', activeId: '', hidePanel: true, wideMain: true };
  // 品牌 / 兴趣内容 fallback：/tori、/mine 归属正确的 tab
  if (p.startsWith('/tori')) return { titleKey: 'shell.title_tori', activeId: 'today', hidePanel: false };
  return { titleKey: 'shell.title_default', activeId: 'today', hidePanel: false };
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  const pathname = usePathname();
  const router = useRouter();
  const meta = resolvePageMeta(pathname);
  const { user, loading: authLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isAdmin = mounted && user?.role === 'admin';
  const isDesktop = useIsDesktop();

  // 全屏沉浸页（自带覆盖层），不显示移动顶部横幅 + 占位 + 底部导航
  // '/' 落地页只对未登录访客渲染，与 /auth 同款全屏沉浸视觉
  const isFullscreenPage = (pathname === '/' || pathname?.startsWith('/diary') || pathname?.startsWith('/blog') || pathname?.startsWith('/radio') || pathname?.startsWith('/reading') || pathname?.startsWith('/practice/') || pathname?.startsWith('/companion/') || pathname?.startsWith('/map') || pathname === '/membership' || pathname?.startsWith('/membership/') || pathname?.startsWith('/auth')) ?? false;

  const navigate = useCallback((href: string) => {
    router.push(href);
  }, [router]);

  // iPad 横屏 zoom 档下 .desktop-body 是 overflow 滚动容器（globals.css），
  // Next.js 的路由滚动恢复只作用于 window，不重置该容器 → 跨页导航后新页面停在上一页
  // 的滚动位置。这里在 pathname 变化时手动把容器滚回顶部（非滚动容器时置 0 也无害）。
  useEffect(() => {
    document.querySelector('.desktop-body')?.scrollTo(0, 0);
  }, [pathname]);

  // 全屏页（diary / practice）：只挂载一次 children，避免 mobile+desktop 双 mount
  // 导致 createPortal 的组件（如 CarrotHelper）出现两个副本
  if (isFullscreenPage) {
    return (
      <>
        {children}
        {mounted && user && <DiaryDay2Announcement userId={user.id} />}
        {mounted && user && !pathname?.startsWith('/admin') && <PopupAnnouncement userId={user.id} />}
        {mounted && !user && pathname !== '/' && pathname !== '/membership' && !pathname?.startsWith('/auth') && <LoginInvitePopup />}
        {mounted && user && shouldShowGlobalCarrot(pathname) && <GlobalCarrot sectionName={t(meta.titleKey, lang)} />}
      </>
    );
  }

  // Hydration 前：服务端不知道视口尺寸，若直接输出 mobile 或 desktop 分叉，
  // 客户端 mount 时 useIsDesktop 会得出不同结论，触发 hydration mismatch。
  // 先渲染不分叉的中性壳（只包 children），mount 后再切进 mobile/desktop 分叉。
  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
        {children}
      </div>
    );
  }

  return (
    <>
      {/* ═══ Mobile ═══ 竖屏或小屏（含 SSR 首屏，避免白屏闪烁）
          用 flex column + min-h-dvh 让整个壳严格等于视口高。
          main 用 flex-1 自适应，内容少时不会多出可下滑空白。 */}
      {!isDesktop && (
      <div className="flex flex-col min-h-screen min-h-dvh">
        <div className="h-[8px] pt-safe shrink-0" />
        {/* pb-[72+safe] = BottomTabBar 高 56px + 16px 呼吸带；避免内容被 TabBar 遮挡 */}
        <main className="relative flex-1 mx-auto w-full max-w-screen-md md:max-w-none pl-[max(16px,env(safe-area-inset-left,0px))] pr-[max(16px,env(safe-area-inset-right,0px))] md:pl-8 md:pr-8 pt-3 overflow-x-hidden bg-[var(--bg-base)] pb-[calc(72px+env(safe-area-inset-bottom,0px))]">
          <FloatingDecorations />
          <div className="relative z-[1]">{children}</div>
          {/* Contact footer */}
          <div className="text-center py-5 mt-4 border-t border-[var(--border-color)]">
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">
              {t('shell.footer_contact', lang)}
            </p>
          </div>
        </main>
        <BottomTabBar />
      </div>
      )}

      {/* ═══ Desktop ═══ 宽>高 且 宽≥1024（横屏 iPad / PC） */}
      {isDesktop && (
      <div className="desktop-body">
        {(
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
                <span>{t(item.labelKey, lang)}</span>
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
                    gap: 10,
                    padding: '12px 16px',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid var(--desktop-line)',
                    cursor: 'pointer',
                    color: 'var(--pink-primary)',
                    fontSize: 12,
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                >
                  <Shield size={15} strokeWidth={1.75} aria-hidden />
                  <span className="desktop-foot-label">{t('shell.admin', lang)}</span>
                </button>
              )}
              {user && (
                <button
                  onClick={() => navigate('/settings')}
                  className="desktop-foot-btn"
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 10,
                    padding: '12px 16px',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid var(--desktop-line)',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)',
                    fontSize: 12,
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                >
                  <Settings size={15} strokeWidth={1.75} aria-hidden />
                  <span className="desktop-foot-label">{t('shell.settings', lang)}</span>
                </button>
              )}
              {user ? (
                <button
                  onClick={() => navigate('/mine')}
                  aria-label={t('shell.title_mine', lang)}
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
                  <UserAvatar
                    avatarUrl={user.avatarUrl}
                    name={user.nickname || user.username}
                    size={32}
                  />
                </button>
              ) : (!mounted || authLoading) ? (
                // 鉴权未完成时占位,避免首帧闪出"登录/注册"再切回头像
                <div aria-hidden style={{ height: 40, margin: '10px 8px' }} />
              ) : (
                <button
                  onClick={() => navigate(`/auth/login?redirect=${encodeURIComponent(pathname || '/')}`)}
                  aria-label={t('shell.login', lang)}
                  style={{
                    width: 'calc(100% - 16px)',
                    margin: '10px 8px',
                    padding: '10px 12px',
                    background: 'var(--pink-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 12,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {t('shell.login', lang)}
                </button>
              )}
            </div>
          </aside>

          {/* Main */}
          <main className={'desktop-main' + ((meta as { wideMain?: boolean }).wideMain ? ' desktop-main-wide' : '')}>
            <div className={'desktop-main-rail' + ((meta as { wideMain?: boolean }).wideMain ? ' desktop-main-rail-wide' : '')}>
              {!(meta as { hideTopbar?: boolean }).hideTopbar && (
                <header className="desktop-topbar">
                  <div>
                    <h1>{t(meta.titleKey, lang)}</h1>
                    {meta.activeId === 'today' && (
                      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                        {user ? `@${user.nickname || user.username}` : t('shell.not_logged_in', lang)}
                      </p>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{t('shell.topbar_wechat', lang)}</span>
                    <span className="desktop-badge">{t('shell.badge', lang)}</span>
                  </div>
                </header>
              )}
              <section className="desktop-content">
                {children}
              </section>
            </div>
          </main>

          {/* Right Panel */}
          {!meta.hidePanel && (
          <aside className="desktop-panel">
            <PanelContent navigate={navigate} />
          </aside>
          )}
        </div>
        )}

      </div>
      )}
      {mounted && user && <DiaryDay2Announcement userId={user.id} />}
      {mounted && user && !pathname?.startsWith('/admin') && (
        <PopupAnnouncement userId={user.id} />
      )}
      {mounted && !user && pathname !== '/' && pathname !== '/membership' && !pathname?.startsWith('/auth') && <LoginInvitePopup />}
      {mounted && user && shouldShowGlobalCarrot(pathname) && <GlobalCarrot sectionName={t(meta.titleKey, lang)} />}
    </>
  );
}

function PanelContent({ navigate }: { navigate: (href: string) => void }) {
  const { lang } = useLang();
  const [selectedIds, setSelectedIds] = useState<string[]>(DEFAULT_IDS);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setSelectedIds(loadShortcuts());
  }, []);

  const toggleItem = (id: string) => {
    setSelectedIds(prev => {
      const next = prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < MAX_SHORTCUTS ? [...prev, id] : prev;
      saveShortcuts(next);
      return next;
    });
  };

  // 按用户选择顺序渲染（filter ALL_SHORTCUTS 会丢失顺序）
  const shortcuts = selectedIds
    .map(id => ALL_SHORTCUTS.find(s => s.id === id))
    .filter((s): s is Shortcut => Boolean(s));

  return (
    <>
      <div className="panel-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>{t('shell.panel_title', lang)}</h3>
          <button
            onClick={() => setEditing(!editing)}
            style={{ fontSize: 11, color: editing ? 'var(--color-pink-strong)' : 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, padding: '2px 4px' }}
          >
            {editing ? t('shell.panel_done', lang) : t('shell.panel_edit', lang)}
          </button>
        </div>

        {editing ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '0 0 2px' }}>
              {t('shell.panel_limit', lang, { max: MAX_SHORTCUTS, n: selectedIds.length })}
            </p>
            {SHORTCUT_GROUPS.map(g => (
              <div key={g.groupKey} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase', margin: 0 }}>
                  {t('shell.sc_group_' + g.groupKey, lang)}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {g.items.map(s => {
                    const checked = selectedIds.includes(s.id);
                    const disabled = !checked && selectedIds.length >= MAX_SHORTCUTS;
                    return (
                      <button
                        key={s.id}
                        onClick={() => toggleItem(s.id)}
                        disabled={disabled}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          padding: '6px 11px', borderRadius: 999, fontSize: 12, fontWeight: 700,
                          cursor: disabled ? 'not-allowed' : 'pointer',
                          background: checked ? 'var(--color-ink-1)' : 'var(--bg-muted)',
                          color: checked ? 'var(--color-surface-1)' : 'var(--text-muted)',
                          border: 'none', opacity: disabled ? 0.4 : 1,
                          transition: 'all 0.15s',
                        }}
                      >
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: checked ? 'var(--color-pink-base)' : 'var(--color-border-2)', flexShrink: 0, display: 'inline-block' }} />
                        {t('shell.sc_' + s.id, lang)}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : shortcuts.length === 0 ? (
          <button
            onClick={() => setEditing(true)}
            style={{
              display: 'block', width: '100%',
              background: 'var(--bg-muted)', color: 'var(--text-muted)',
              border: '1px dashed var(--color-border-2)',
              borderRadius: 12, padding: '14px', fontSize: 12, fontWeight: 700,
              cursor: 'pointer', textAlign: 'center',
            }}
          >
            {t('shell.panel_empty', lang)}
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {shortcuts.map(s => (
              <button
                key={s.id}
                onClick={() => navigate(s.href)}
                style={{
                  background: 'var(--color-surface-2)', color: 'var(--color-ink-2)',
                  border: '1px solid var(--color-border-1)',
                  borderRadius: 999, padding: '8px 14px', fontSize: 12, fontWeight: 700,
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                {t('shell.sc_' + s.id, lang)}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
