'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { FEATURE_ANNOUNCEMENT } from '@/data/feature-announcement';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const STORAGE_PREFIX = `tori-whats-new-${FEATURE_ANNOUNCEMENT.version}:`;
const ITEMS = FEATURE_ANNOUNCEMENT.items;

/**
 * 判断该用户当前是否还没看过功能升级弹窗（且弹窗开关打开）。
 * 供其他弹窗（PopupAnnouncement）先让路使用。
 */
export function isFeatureAnnouncementPending(userId: string): boolean {
  if (typeof window === 'undefined' || !userId) return false;
  if (!FEATURE_ANNOUNCEMENT.enabled) return false;
  try {
    return localStorage.getItem(STORAGE_PREFIX + userId) !== '1';
  } catch {
    return false;
  }
}

interface Props {
  [k: string]: unknown;
  userId: string;
}

const DIARY_ANNOUNCE_KEYFRAMES = `
  @keyframes tori-fade-in { from { opacity: 0 } to { opacity: 1 } }
  @keyframes tori-pop-in { from { opacity: 0; transform: scale(0.92) translateY(8px) } to { opacity: 1; transform: scale(1) translateY(0) } }
`;

export function DiaryDay2Announcement({ userId }: Props) {
  const router = useRouter();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !userId) return;
    if (!FEATURE_ANNOUNCEMENT.enabled) return;
    const key = STORAGE_PREFIX + userId;
    try {
      if (localStorage.getItem(key) === '1') return;
    } catch { /* ignore */ }
    const timer = setTimeout(() => setOpen(true), 800);
    return () => clearTimeout(timer);
  }, [userId]);

  const close = () => {
    try { localStorage.setItem(STORAGE_PREFIX + userId, '1'); } catch { /* ignore */ }
    setOpen(false);
    // 通知其他弹窗（如 PopupAnnouncement）："我关闭了，你可以出场了"
    try { window.dispatchEvent(new CustomEvent('tori-feature-popup-closed')); } catch { /* ignore */ }
  };

  const go = (href: string) => {
    close();
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed',
        // inset:0 贴合视口，不用 100vw/100vh——桌面 body zoom(0.92/0.96) 下视口单位按
        // 缩放坐标系换算，导致遮罩缩水、露出底层页面（iPad 横屏 bug）。
        inset: 0,
        zIndex: 9999,
        background: 'rgba(28, 20, 18, 0.72)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch',
        animation: 'tori-fade-in 0.3s ease',
      }}
    >
      <style>{DIARY_ANNOUNCE_KEYFRAMES}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative', // 关闭按钮用 absolute 定位，需以卡片为定位上下文（否则跑到视口角落）
          background: 'var(--color-surface-1, #fffbf7)',
          borderRadius: 20,
          padding: '32px 28px 24px',
          width: '100%',
          maxWidth: 380,
          maxHeight: '85vh',
          overflowY: 'auto',
          boxSizing: 'border-box',
          textAlign: 'center',
          boxShadow: '0 24px 60px rgba(28,20,18,0.35)',
          border: '1.5px solid var(--color-border-1, #eee0d8)',
          animation: 'tori-pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <button
          type="button"
          onClick={close}
          aria-label={t('diary.d2ann.close_aria', lang)}
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 32, height: 32, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(28,20,18,0.06)',
            color: 'var(--color-ink-2, #4a3d38)',
            border: 'none', cursor: 'pointer',
            zIndex: 2,
          }}
        >
          <X size={16} strokeWidth={2.2} />
        </button>
        <div style={{ fontSize: 48, marginBottom: 8, lineHeight: 1 }}>🎉</div>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--color-pink-base, #ff7fa8)', margin: '0 0 10px',
        }}>
          {FEATURE_ANNOUNCEMENT.eyebrow}
        </p>
        <h2 style={{
          fontSize: 20, fontWeight: 900, color: 'var(--color-ink-1, #241917)',
          margin: '0 0 20px', letterSpacing: '0.01em', lineHeight: 1.4,
        }}>
          {FEATURE_ANNOUNCEMENT.title}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {ITEMS.map((item, i) => {
            const clickable = !!item.link;
            return (
              <div
                key={i}
                onClick={clickable ? () => go(item.link!) : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 16px', borderRadius: 14,
                  border: '1.5px solid var(--color-border-1, #eee0d8)',
                  background: 'var(--color-surface-2, #fdf6f0)',
                  cursor: clickable ? 'pointer' : 'default',
                  textAlign: 'left',
                  width: '100%',
                  boxSizing: 'border-box',
                  transition: 'background 0.15s',
                }}
              >
                <span style={{
                  fontSize: 28, lineHeight: 1, flexShrink: 0,
                  width: 40, height: 40, borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: item.color + '18',
                }}>
                  {item.emoji}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1, #241917)',
                    lineHeight: 1.3, marginBottom: 2,
                  }}>
                    {item.title}
                  </div>
                  <div style={{
                    fontSize: 12, color: 'var(--color-ink-3, #89756e)',
                    lineHeight: 1.5,
                  }}>
                    {item.desc}
                  </div>
                </div>
                {clickable && (
                  <span style={{
                    flexShrink: 0, color: 'var(--color-ink-3, #89756e)',
                    fontSize: 16, fontWeight: 700,
                  }}>
                    →
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={close}
          style={{
            width: '100%', padding: '10px 0',
            background: 'transparent', color: 'var(--color-ink-3, #89756e)',
            fontSize: 13, border: 'none', cursor: 'pointer',
          }}
        >
          {t('diary.d2ann.got_it', lang)}
        </button>
      </div>
    </div>
  );
}
