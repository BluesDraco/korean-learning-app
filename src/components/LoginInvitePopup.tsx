'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sparkles, X } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const SESSION_FLAG = 'tori-login-invite-shown';
const DELAY_MS = 3000;

// 用户学到一半不打断：练习/考试/日记详情/发音沉浸页跳过弹窗
const BLOCKED_PREFIXES = [
  '/practice/',      // 场景练习中
  '/topik/exam',     // TOPIK 考试中
  '/topik/practice', // TOPIK 题型练习
  '/topik/start',    // TOPIK 开考
  '/diary/beginner', '/diary/intermediate', '/diary/advanced', // 日记详情
  '/phonetics/step', // 40音练习流程
  '/listening/',     // 旧口语练习子页(已重定向)
  '/speaking/',      // 口语练习子页
  '/dictation/',     // 默写练习子页
  '/writing',        // 写作练习
  '/typing',         // 打字练习
  '/reading/',       // 文章阅读
  '/review',         // 闪卡复习
  '/vocabulary/books/', '/vocabulary/themes/', '/vocabulary/levels/',
  '/vocabulary/yonsei/', '/vocabulary/seoul/',
  '/radio',          // 动物城电台（听节目中不打断）
];

function isBlockedPath(p: string | null): boolean {
  if (!p) return false;
  return BLOCKED_PREFIXES.some(prefix => p.startsWith(prefix));
}

const KEYFRAMES = `
  @keyframes login-invite-fade { from { opacity: 0 } to { opacity: 1 } }
  @keyframes login-invite-pop { from { opacity: 0; transform: scale(0.92) translateY(8px) } to { opacity: 1; transform: scale(1) translateY(0) } }
`;

export function LoginInvitePopup() {
  const { lang } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isBlockedPath(pathname)) return;
    try {
      if (sessionStorage.getItem(SESSION_FLAG) === '1') return;
    } catch { /* private mode */ }
    const t = setTimeout(() => {
      try { sessionStorage.setItem(SESSION_FLAG, '1'); } catch { /* ignore */ }
      setOpen(true);
    }, DELAY_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  const close = () => setOpen(false);
  const goLogin = () => {
    close();
    router.push(`/auth/login?redirect=${encodeURIComponent(pathname || '/')}`);
  };

  if (!open) return null;

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
        background: 'rgba(28, 20, 18, 0.72)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'login-invite-fade 0.3s ease',
      }}
    >
      <style>{KEYFRAMES}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-surface-1, #fffbf7)',
          borderRadius: 20,
          padding: '28px 24px 20px',
          maxWidth: `min(380px, calc(100vw - 40px))`, width: '100%',
          boxShadow: '0 24px 60px rgba(28,20,18,0.35)',
          border: '1.5px solid var(--color-border-1, #eee0d8)',
          animation: 'login-invite-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={16} style={{ color: 'var(--color-pink-base, #ff7fa8)' }} />
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--color-pink-base, #ff7fa8)',
            }}>
              {t('loginInvite.badge', lang)}
            </span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={t('loginInvite.close', lang)}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(28,20,18,0.06)',
              color: 'var(--color-ink-2, #4a3d38)',
              border: 'none', cursor: 'pointer',
            }}
          >
            <X size={16} strokeWidth={2.2} />
          </button>
        </div>
        <h2 style={{
          fontSize: 18, fontWeight: 800, color: 'var(--color-ink-1, #241917)',
          margin: '0 0 8px', lineHeight: 1.4,
        }}>
          {t('loginInvite.title', lang)}
        </h2>
        <p style={{
          fontSize: 14, color: 'var(--color-ink-2, #4a3d38)',
          lineHeight: 1.65, margin: '0 0 22px',
        }}>
          {t('loginInvite.desc', lang)}
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={close}
            style={{
              flex: 1, padding: '12px 0',
              borderRadius: 12,
              background: 'rgba(28,20,18,0.06)',
              color: 'var(--color-ink-2, #4a3d38)',
              fontSize: 14, fontWeight: 600,
              border: 'none', cursor: 'pointer',
            }}
          >
            {t('loginInvite.later', lang)}
          </button>
          <button
            onClick={goLogin}
            style={{
              flex: 1, padding: '12px 0',
              borderRadius: 12,
              background: 'var(--color-pink-base, #ff7fa8)',
              color: '#fff', fontSize: 14, fontWeight: 700,
              border: 'none', cursor: 'pointer',
            }}
          >
            {t('loginInvite.login', lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
