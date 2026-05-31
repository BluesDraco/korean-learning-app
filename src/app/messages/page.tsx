'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { Mail, Sparkles, Bell, Megaphone, FileText, ChevronDown, Loader2 } from 'lucide-react';
import type { Announcement, AnnouncementType } from '@/types';

const TYPE_CONFIG: Record<AnnouncementType, { label: string; icon: React.ComponentType<{ size?: number; className?: string; color?: string }>; color: string }> = {
  update_log: { label: '更新日志', icon: FileText, color: 'var(--mint-soft)' },
  announcement: { label: '公告', icon: Megaphone, color: 'var(--purple-soft)' },
  private_message: { label: '私信', icon: Bell, color: 'var(--pink-primary)' },
};

async function markRead(announcementId: string) {
  await fetch('/api/announcements/read', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ announcementId }),
  });
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<(Announcement & { read: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/announcements')
      .then((r) => r.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
        // Auto-expand first unread
        const firstUnread = data.find((m: any) => !m.read);
        if (firstUnread) setExpandedId(firstUnread.id);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleExpand = useCallback(async (id: string, read: boolean) => {
    setExpandedId(expandedId === id ? null : id);
    if (!read) {
      await markRead(id);
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, read: true } : m));
    }
  }, [expandedId]);

  const unreadCount = messages.filter((m) => !m.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  return (
    <div className="py-6 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="relative inline-block">
          <Image
            src="/images/tori-poses/tori-pose-01.webp"
            alt="Tori"
            width={80}
            height={80}
            className="object-contain mx-auto"
          />
          <span className="absolute -top-1 -right-2 text-2xl">✉️</span>
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">
          내 편지함
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          {unreadCount > 0 ? `你有 ${unreadCount} 条未读消息` : '所有消息已读'}
        </p>
      </div>

      {/* Stats row */}
      {messages.length > 0 && (
        <div className="flex items-center gap-3 justify-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
            <Mail size={13} />
            <span>{messages.length} 条消息</span>
          </div>
          {unreadCount > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--pink-primary)]/10 border border-[var(--pink-primary)]/20 text-xs text-[var(--pink-primary)] font-medium">
              <Sparkles size={13} />
              <span>{unreadCount} 条未读</span>
            </div>
          )}
        </div>
      )}

      {/* Messages list */}
      {messages.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <span className="text-5xl">📮</span>
          <p className="text-[var(--text-secondary)] text-sm">还没有收到任何消息</p>
          <p className="text-[var(--text-muted)] text-xs">管理员发布公告或更新日志后会出现在这里</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => {
            const config = TYPE_CONFIG[msg.type] ?? TYPE_CONFIG.announcement;
            const Icon = config.icon;
            const isExpanded = expandedId === msg.id;

            return (
              <div
                key={msg.id}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden transition-all hover:shadow-sm"
              >
                <button
                  onClick={() => handleExpand(msg.id, msg.read)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                >
                  {/* Type icon + unread dot */}
                  <div className="relative shrink-0">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: config.color + '18' }}
                    >
                      <Icon size={17} color={config.color} />
                    </div>
                    {!msg.read && (
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[var(--pink-primary)] rounded-full border-2 border-[var(--bg-card)]" />
                    )}
                  </div>

                  {/* Title + type + time */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm truncate ${!msg.read ? 'font-bold text-[var(--text-primary)]' : 'text-[var(--text-primary)]'}`}>
                        {msg.title}
                      </span>
                      <span
                        className="shrink-0 text-[11px] px-1.5 py-0.5 rounded-md font-medium"
                        style={{ backgroundColor: config.color + '15', color: config.color }}
                      >
                        {config.label}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {new Date(msg.createdAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-[var(--text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[var(--border-color)]">
                    <div className="pt-3 text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
