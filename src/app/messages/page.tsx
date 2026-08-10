'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Sparkles, Bell, Megaphone, FileText, ChevronDown, Loader2, ArrowLeft } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import type { Announcement, AnnouncementType } from '@/types';
import '../mine/mine-home.css';
import './messages.css';

const TYPE_CONFIG: Record<AnnouncementType, { label: string; icon: React.ComponentType<{ size?: number; color?: string }>; soft: string; strong: string }> = {
  update_log:      { label: 'messages.type_update_log',  icon: FileText,  soft: 'var(--color-mint-soft)',   strong: 'var(--color-mint-strong)' },
  announcement:    { label: 'messages.type_announcement', icon: Megaphone, soft: 'var(--color-purple-soft)', strong: 'var(--color-purple-strong)' },
  private_message: { label: 'messages.type_private',      icon: Bell,      soft: 'var(--color-pink-soft)',   strong: 'var(--color-pink-strong)' },
  popup:           { label: 'messages.type_popup',        icon: Sparkles,  soft: 'var(--color-peach-soft)',  strong: 'var(--color-peach-strong)' },
};

async function markRead(announcementId: string) {
  await fetch('/api/announcements/read', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ announcementId }),
  }).catch(() => {});
}

export default function MessagesPage() {
  const { lang } = useLang();
  const router = useRouter();
  const [messages, setMessages] = useState<(Announcement & { read: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [needLogin, setNeedLogin] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/announcements', { signal: controller.signal })
      .then(async (r) => {
        if (r.status === 401) { setNeedLogin(true); setLoading(false); return; }
        const data = await r.json();
        const list = Array.isArray(data) ? data : [];
        setMessages(list);
        setLoading(false);
        const firstUnread = list.find((m: Announcement & { read: boolean }) => !m.read);
        if (firstUnread) setExpandedId(firstUnread.id);
      })
      .catch((e) => { if (e?.name !== 'AbortError') setLoading(false); });
    return () => controller.abort();
  }, []);

  const handleExpand = useCallback(async (id: string, read: boolean) => {
    setExpandedId((prev) => (prev === id ? null : id));
    if (!read) {
      await markRead(id);
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
    }
  }, []);

  const unreadCount = messages.filter((m) => !m.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={30} className="animate-spin" style={{ color: 'var(--color-ink-4)' }} />
      </div>
    );
  }

  if (needLogin) {
    return (
      <div className="mine-scope mine-bg">
      <div className="msg-wrap mx-auto">
        <div className="msg-empty">
          <div className="msg-empty-ic"><Mail size={30} /></div>
          <p className="msg-empty-t">{t('messages.login_required', lang)}</p>
          <p className="msg-empty-d">{t('messages.login_sub', lang)}</p>
          <a href="/auth/login?redirect=/messages" className="msg-login-btn">{t('messages.login_cta', lang)}</a>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="mine-scope mine-bg">
    <div className="msg-wrap mx-auto">
      <button onClick={() => router.push('/mine')} className="msg-back">
        <ArrowLeft size={15} /> {t('messages.back', lang)}
      </button>

      {/* 英雄区 */}
      <div className="msg-hero">
        <div className="msg-hero-tori">
          <Image src="/images/tori-poses/tori-pose-01.webp" alt="Tori" width={76} height={76} />
          {unreadCount > 0 && <span className="msg-unread-dot">{unreadCount}</span>}
        </div>
        <h1 className="msg-hero-title">내 편지함</h1>
        <p className="msg-hero-sub">
          {unreadCount > 0 ? t('messages.unread_notice', lang, { n: unreadCount }) : t('messages.all_read', lang)}
        </p>
        {messages.length > 0 && (
          <div className="msg-stats">
            <span className="msg-chip"><Mail size={13} />{t('messages.count', lang, { n: messages.length })}</span>
            {unreadCount > 0 && (
              <span className="msg-chip accent"><Sparkles size={13} />{t('messages.unread_count', lang, { n: unreadCount })}</span>
            )}
          </div>
        )}
      </div>

      {/* 列表 */}
      {messages.length === 0 ? (
        <div className="msg-empty">
          <div className="msg-empty-ic"><Mail size={30} /></div>
          <p className="msg-empty-t">{t('messages.empty', lang)}</p>
          <p className="msg-empty-d">{t('messages.empty_sub', lang)}</p>
        </div>
      ) : (
        <div className="msg-list">
          {messages.map((msg) => {
            const config = TYPE_CONFIG[msg.type] ?? TYPE_CONFIG.announcement;
            const Icon = config.icon;
            const isExpanded = expandedId === msg.id;

            return (
              <div key={msg.id} className={`msg-card ${msg.read ? '' : 'unread'} ${isExpanded ? 'expanded' : ''}`}>
                <button className="msg-card-btn" onClick={() => handleExpand(msg.id, msg.read)}>
                  <div className="msg-ic-wrap">
                    <div className="msg-ic" style={{ background: config.soft }}>
                      <Icon size={18} color={config.strong} />
                    </div>
                    {!msg.read && <span className="msg-ic-dot" />}
                  </div>

                  <div className="msg-body">
                    <div className="msg-titleline">
                      <span className={`msg-title ${msg.read ? '' : 'strong'}`}>{msg.title}</span>
                      <span className="msg-type-tag" style={{ background: config.soft, color: config.strong }}>
                        {t(config.label, lang)}
                      </span>
                    </div>
                    <p className="msg-time">
                      {new Date(msg.createdAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  <ChevronDown size={17} className={`msg-chevron ${isExpanded ? 'open' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="msg-expand">
                    <div className="msg-expand-inner">{msg.content}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
}
