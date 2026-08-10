'use client';

import { useEffect, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { isFeatureAnnouncementPending } from '@/components/diary/DiaryDay2Announcement';
import { announcementReadKey } from '@/lib/announcement-read';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  [k: string]: unknown;
  userId: string;
}

interface AnnouncementItem {
  [k: string]: unknown;
  id: string;
  title: string;
  content: string;
  type: string;
  read?: boolean;
  isActive?: boolean;
}

const POPUP_KEYFRAMES = `
  @keyframes popup-fade-in { from { opacity: 0 } to { opacity: 1 } }
  @keyframes popup-pop-in { from { opacity: 0; transform: scale(0.92) translateY(8px) } to { opacity: 1; transform: scale(1) translateY(0) } }
`;

// 每会话每用户只 fetch 一次，避免翻页每次触发 SQL
const SESSION_FLAG_PREFIX = 'popup-announcement-checked:';

export function PopupAnnouncement({ userId }: Props) {
  const { lang } = useLang();
  const [item, setItem] = useState<AnnouncementItem | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !userId) return;
    // 本会话已检查过 → 跳过 fetch（关闭标签重新进入才会再拉）
    const flagKey = SESSION_FLAG_PREFIX + userId;
    try {
      if (sessionStorage.getItem(flagKey) === '1') return;
      // 立即打标：防止路由切换导致 AppShell 分支切换、组件重挂后又弹一次
      sessionStorage.setItem(flagKey, '1');
    } catch { /* private mode ignored */ }

    const controller = new AbortController();
    const doFetch = () => {
      fetch('/api/announcements', { cache: 'no-store', signal: controller.signal })
        .then(r => r.ok ? r.json() : [])
        .then((data) => {
          if (controller.signal.aborted) return;
          const list: AnnouncementItem[] = Array.isArray(data) ? data : [];
          const found = list.find(m => {
            if (m.type !== 'popup' || m.read) return false;
            try {
              return localStorage.getItem(announcementReadKey(userId, m.id)) !== '1';
            } catch { return true; }
          });
          if (found) setItem(found);
        })
        .catch(() => { /* aborted or offline */ });
    };

    // 若功能升级弹窗还没被这个用户看过 → 让功能弹窗先出场，我们等它关闭后再拉
    if (isFeatureAnnouncementPending(userId)) {
      const onFeatureClosed = () => {
        window.removeEventListener('tori-feature-popup-closed', onFeatureClosed);
        doFetch();
      };
      window.addEventListener('tori-feature-popup-closed', onFeatureClosed);
      return () => {
        window.removeEventListener('tori-feature-popup-closed', onFeatureClosed);
        controller.abort();
      };
    }

    doFetch();
    return () => controller.abort();
  }, [userId]);

  const close = () => {
    if (!item) return;
    const id = item.id;
    // 立即消失，不等网络
    try { localStorage.setItem(announcementReadKey(userId, id), '1'); } catch { /* ignore */ }
    setItem(null);
    // 服务端标记后台跑，失败也无所谓（localStorage 已兜底）
    fetch('/api/announcements/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ announcementId: id }),
      keepalive: true,
    }).catch(() => { /* ignore */ });
  };

  if (!item) return null;

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed',
        // inset:0 贴合视口，不用 100vw/100vh——桌面 body zoom(0.92/0.96) 下视口单位会
        // 按缩放坐标系换算，导致遮罩缩水、露出底层页面（iPad 横屏 bug）。
        inset: 0,
        zIndex: 9999,
        background: 'rgba(28, 20, 18, 0.72)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        WebkitOverflowScrolling: 'touch',
        animation: 'popup-fade-in 0.3s ease',
      }}
    >
      <style>{POPUP_KEYFRAMES}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--color-surface-1, #fffbf7)',
          borderRadius: 20,
          padding: '28px 24px 20px',
          width: '100%',
          maxWidth: 380,
          maxHeight: '85vh',
          boxSizing: 'border-box',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(28,20,18,0.35)',
          border: '1.5px solid var(--color-border-1, #eee0d8)',
          animation: 'popup-pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
          marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={16} style={{ color: 'var(--color-pink-base, #ff7fa8)' }} />
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--color-pink-base, #ff7fa8)',
            }}>
              {t('announce.badge', lang)}
            </span>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={t('announce.close', lang)}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(28,20,18,0.06)',
              color: 'var(--color-ink-2, #4a3d38)',
              border: 'none', cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <X size={16} strokeWidth={2.2} />
          </button>
        </div>
        <h2 style={{
          fontSize: 18, fontWeight: 800, color: 'var(--color-ink-1, #241917)',
          margin: '0 0 12px', lineHeight: 1.4,
        }}>
          {item.title}
        </h2>
        <div style={{
          flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden',
          margin: '0 -4px 22px', padding: '0 4px',
        }}>
          <p style={{
            fontSize: 14, color: 'var(--color-ink-2, #4a3d38)',
            lineHeight: 1.65, whiteSpace: 'pre-wrap',
            wordBreak: 'break-word', overflowWrap: 'break-word',
            margin: 0,
          }}>
            {item.content}
          </p>
        </div>
        <button
          onClick={close}
          style={{
            width: '100%', padding: '12px 0',
            borderRadius: 12,
            background: 'var(--color-pink-base, #ff7fa8)',
            color: '#fff', fontSize: 14, fontWeight: 700,
            border: 'none', cursor: 'pointer',
          }}
        >
          {t('announce.got_it', lang)}
        </button>
      </div>
    </div>
  );
}
