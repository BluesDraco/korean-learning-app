'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, Loader2, Check, User, Megaphone, FileText, Bell } from 'lucide-react';
import type { AnnouncementType } from '@/types';

const TYPE_LABEL: Record<string, string> = {
  announcement: '公告',
  update_log: '更新日志',
  private_message: '私信',
  popup: '弹窗公告',
};

export default function AdminMessagesPage() {
  const searchParams = useSearchParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // 现在只保留弹窗公告一种类型
  const type = 'popup' as const;
  const [targetUserId, setTargetUserId] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [users, setUsers] = useState<{ id: string; username: string; nickname: string }[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [usersLoading, setUsersLoading] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    const userId = searchParams.get('userId');

    // Load user list
    fetch('/api/admin/users?pageSize=50')
      .then((r) => r.json())
      .then((data) => {
        if (data.users) setUsers(data.users);
      })
      .catch(() => {});

    // If coming from feedback reply, fetch the specific user directly
    if (userId) {
      setType('private_message');
      setTargetUserId(userId);
      fetch(`/api/admin/users/${userId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.id) {
            setUsers((prev) => {
              const exists = prev.some((u) => u.id === data.id);
              return exists ? prev : [{ id: data.id, username: data.username, nickname: data.nickname }, ...prev];
            });
          }
        })
        .catch(() => {});
    }
  }, [searchParams]);

  useEffect(() => {
    const userId = searchParams.get('userId');

    if (userId) {
      // 从其他 admin 页面（feedback/content）跳过来带上 userId，作为该用户专属的弹窗
      setTargetUserId(userId);
      fetch(`/api/admin/users/${userId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.id) {
            setUsers((prev) => {
              const exists = prev.some((u) => u.id === data.id);
              return exists ? prev : [{ id: data.id, username: data.username, nickname: data.nickname }, ...prev];
            });
          }
        })
        .catch(() => {});
    }

    loadHistory();
  }, [searchParams, loadHistory]);

  // 用户搜索走服务端 ?search=，不限制到已加载的 50 个里
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!userSearch.trim()) {
      // 清空搜索 → 重新加载初始 50 个
      fetch('/api/admin/users?pageSize=50')
        .then((r) => r.json())
        .then((data) => { if (data.users) setUsers(data.users); })
        .catch(() => {});
      return;
    }
    setUsersLoading(true);
    debounceRef.current = setTimeout(() => {
      fetch(`/api/admin/users?search=${encodeURIComponent(userSearch.trim())}&pageSize=20`)
        .then((r) => r.json())
        .then((data) => {
          if (data.users) setUsers(data.users);
        })
        .catch(() => {})
        .finally(() => setUsersLoading(false));
    }, 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [userSearch]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedUser = users.find((u) => u.id === targetUserId);

  const handleSend = useCallback(async () => {
    if (!title.trim() || !content.trim()) return;

    setSending(true);
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim(),
        content: content.trim(),
        type,
        targetUserId: targetUserId.trim() || null,
      }),
    });

    if (res.ok) {
      setTitle('');
      setContent('');
      setTargetUserId('');
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      loadHistory();
    } else {
      const err = await res.json().catch(() => ({}));
      alert(`发送失败：${err.error || res.status}`);
    }
    setSending(false);
  }, [title, content, type, targetUserId, loadHistory]);

  const handleWithdraw = useCallback(async (id: string) => {
    if (!confirm('确认撤回这条消息？撤回后用户将不再看到。')) return;
    const res = await fetch(`/api/announcements/${id}`, { method: 'DELETE' });
    if (res.ok) loadHistory();
    else alert('撤回失败，请重试');
  }, [loadHistory]);

  // 当前生效的弹窗公告（针对全体用户，target_user_id 为 null）
  const activePopups = history.filter((h) => h.type === 'popup' && h.isActive && !h.targetUserId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">消息中心</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">编辑消息并发送给用户</p>
      </div>

      {/* 当前生效的弹窗公告 —— 用户进入网站时会弹的那条 */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 lg:p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-[var(--pink-primary)]" />
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">当前生效的弹窗公告</h2>
          <span className="text-xs text-[var(--text-muted)]">
            · 用户下次进入网站会看到（每人只弹一次）
          </span>
        </div>
        {activePopups.length === 0 ? (
          <p className="text-sm text-[var(--text-muted)] py-4 text-center bg-[var(--bg-soft)] rounded-xl">
            当前没有生效中的全站弹窗
          </p>
        ) : (
          <div className="space-y-3">
            {activePopups.map((p) => (
              <div key={p.id} className="flex flex-col lg:flex-row lg:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs text-[var(--text-muted)]">
                      {new Date(p.createdAt).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button
                      onClick={() => handleWithdraw(p.id)}
                      className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1 px-2 py-1 rounded hover:bg-red-500/10"
                    >
                      <Trash2 size={12} />
                      撤回
                    </button>
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">{p.title}</div>
                  <div className="text-xs text-[var(--text-muted)] whitespace-pre-wrap leading-relaxed">{p.content}</div>
                </div>
                <div className="w-full lg:w-[320px] flex-shrink-0">
                  <div className="text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wider">用户看到的样子</div>
                  <PopupPreview title={p.title} content={p.content} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 功能升级弹窗（代码内置，改动需重新部署） */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 lg:p-6">
        <div className="flex items-center gap-2 mb-1">
          <Rocket size={16} className="text-[var(--pink-primary)]" />
          <h2 className="text-sm font-semibold text-[var(--text-primary)]">功能升级弹窗</h2>
          <span className={`text-xs px-2 py-0.5 rounded ${FEATURE_ANNOUNCEMENT.enabled ? 'bg-green-500/15 text-green-500' : 'bg-gray-500/15 text-gray-500'}`}>
            {FEATURE_ANNOUNCEMENT.enabled ? '生效中' : '已禁用'}
          </span>
        </div>
        <p className="text-xs text-[var(--text-muted)] mb-4">
          代码内置的产品更新弹窗，每个用户只弹一次（存 localStorage）。修改内容/开关需要改 <code className="px-1 rounded bg-[var(--bg-soft)]">src/data/feature-announcement.ts</code> 后重新部署。
        </p>
        <div className="flex flex-col lg:flex-row lg:items-start gap-4">
          <div className="flex-1 min-w-0 space-y-2">
            <div className="text-xs text-[var(--text-muted)]">
              <span className="font-semibold">版本 key</span>: {FEATURE_ANNOUNCEMENT.version}
              <span className="ml-3 opacity-60">改版本号可让所有用户重新看到</span>
            </div>
            <div className="text-xs text-[var(--text-muted)]">
              <span className="font-semibold">标题</span>: {FEATURE_ANNOUNCEMENT.eyebrow} · {FEATURE_ANNOUNCEMENT.title}
            </div>
            <div className="mt-2">
              <div className="text-xs text-[var(--text-muted)] mb-1 font-semibold">条目</div>
              <ul className="space-y-1.5">
                {FEATURE_ANNOUNCEMENT.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-base leading-none pt-0.5">{it.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[var(--text-primary)] font-medium">{it.title}</div>
                      <div className="text-[var(--text-muted)]">{it.desc}{it.link && <> · <code className="opacity-70">{it.link}</code></>}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <div className="text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wider">用户看到的样子</div>
            <FeaturePopupPreview />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Form */}
        <div className="flex-1 min-w-0 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5">
          <div className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-soft)] rounded-lg">
            <Sparkles size={16} className="text-[var(--pink-primary)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">弹窗公告</span>
            <span className="text-xs text-[var(--text-muted)]">· 用户进入网站时弹出一次，关闭后进入私信页存档</span>
          </div>

          <div ref={dropdownRef} className="relative">
            <label className="text-sm font-medium text-[var(--text-primary)] mb-2 block">
              目标用户 <span className="text-xs text-[var(--text-muted)] font-normal">（留空则发给全体用户）</span>
            </label>
              {selectedUser ? (
                <div className="flex items-center gap-2 p-3 bg-[var(--bg-soft)] border border-[var(--pink-primary)]/20 rounded-xl">
                  <User size={16} className="text-[var(--pink-primary)]" />
                  <span className="text-sm font-medium text-[var(--text-primary)]">{selectedUser.nickname || selectedUser.username}</span>
                  <span className="text-xs text-[var(--text-muted)]">@{selectedUser.username}</span>
                  <button
                    onClick={() => { setTargetUserId(''); setUserSearch(''); }}
                    className="ml-auto text-xs text-[var(--text-muted)] hover:text-red-400"
                  >
                    取消
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => { setUserSearch(e.target.value); setShowUserDropdown(true); }}
                    onFocus={() => setShowUserDropdown(true)}
                    placeholder="搜索用户（留空 = 全体）..."
                    className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-2.5 px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)]"
                  />
                  {showUserDropdown && (
                    <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {usersLoading
                        ? <div className="flex items-center justify-center py-4"><Loader2 size={16} className="animate-spin text-[var(--text-muted)]" /></div>
                        : users.length === 0
                          ? <div className="px-4 py-3 text-sm text-[var(--text-muted)]">未找到匹配用户</div>
                          : users.slice(0, 20).map((u) => (
                            <button
                              key={u.id}
                              onClick={() => { setTargetUserId(u.id); setUserSearch(''); setShowUserDropdown(false); }}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-[var(--bg-soft)] transition-colors"
                            >
                              <User size={15} className="text-[var(--text-muted)]" />
                              <span className="text-[var(--text-primary)] font-medium">{u.nickname || u.username}</span>
                              <span className="text-[var(--text-muted)] text-xs">@{u.username}</span>
                            </button>
                          ))
                      }
                    </div>
                  )}
                </>
              )}
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-primary)] mb-2 block">标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="输入消息标题..."
              className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-2.5 px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[var(--text-primary)] mb-2 block">内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="输入消息内容（支持换行）..."
              rows={6}
              className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] resize-none"
            />
          </div>

          <button
            onClick={handleSend}
            disabled={sending || !title.trim() || !content.trim()}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
              sent
                ? 'bg-green-500 text-white'
                : 'bg-[var(--pink-primary)] text-white hover:brightness-90 disabled:bg-[var(--bg-input)] disabled:text-[var(--text-muted)]'
            }`}
          >
            {sending ? <Loader2 size={17} className="animate-spin" /> : sent ? <><Check size={17} />发送成功</> : <><Send size={17} />一键发送</>}
          </button>

          <p className="text-xs text-[var(--text-muted)] text-center">
            弹窗公告会在用户进入网站时弹出一次，关闭后进入私信页存档
          </p>
        </div>

        {/* Right: 用户端预览（桌面端） */}
        <div className="hidden lg:block w-[380px] flex-shrink-0">
          <div className="sticky top-4">
            <div className="text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-wider">用户端预览</div>
            <PopupPreview title={title || '标题预览'} content={content || '正文内容预览...'} />
          </div>
        </div>
      </div>

      {/* Sent history + withdraw */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowHistory(v => !v)}
          className="w-full flex items-center justify-between px-6 py-4 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-soft)]"
        >
          <span>已发消息（最近 50 条）</span>
          {showHistory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {showHistory && (
          <div className="border-t border-[var(--border-color)]">
            {historyLoading ? (
              <div className="flex justify-center py-8"><Loader2 size={18} className="animate-spin text-[var(--text-muted)]" /></div>
            ) : history.length === 0 ? (
              <p className="text-center text-sm text-[var(--text-muted)] py-8">还没有发过消息</p>
            ) : (
              <ul className="divide-y divide-[var(--border-color)]">
                {history.map(h => (
                  <li key={h.id} className={`px-4 lg:px-6 py-3 flex items-start gap-3 ${!h.isActive ? 'opacity-50' : ''}`}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded bg-[var(--bg-soft)] text-[var(--text-muted)] whitespace-nowrap">{TYPE_LABEL[h.type] || h.type}</span>
                        {h.targetUsername ? (
                          <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">→ @{h.targetUsername}</span>
                        ) : (
                          <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">→ 全体</span>
                        )}
                        {!h.isActive && <span className="text-xs text-red-400 whitespace-nowrap">已撤回</span>}
                        <span className="text-xs text-[var(--text-muted)] whitespace-nowrap lg:ml-auto">{new Date(h.createdAt).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="text-sm text-[var(--text-primary)] font-medium break-words">{h.title}</div>
                      <div className="text-xs text-[var(--text-muted)] break-words mt-0.5 line-clamp-2">{h.content}</div>
                    </div>
                    {h.isActive && (
                      <button
                        onClick={() => handleWithdraw(h.id)}
                        className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1 px-2 py-1 rounded hover:bg-red-500/10 flex-shrink-0"
                      >
                        <Trash2 size={13} />
                        撤回
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// 功能升级弹窗 preview — 与 DiaryDay2Announcement 视觉对齐
function FeaturePopupPreview() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 text-center">
      <div className="text-4xl mb-1">🎉</div>
      <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--pink-primary)] mb-2">
        {FEATURE_ANNOUNCEMENT.eyebrow}
      </p>
      <h3 className="text-lg font-black text-[var(--text-primary)] mb-4">
        {FEATURE_ANNOUNCEMENT.title}
      </h3>
      <div className="flex flex-col gap-2.5 mb-4">
        {FEATURE_ANNOUNCEMENT.items.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50 text-left"
          >
            <span
              className="text-xl leading-none w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: it.color + '18' }}
            >
              {it.emoji}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-[var(--text-primary)] leading-tight mb-0.5">{it.title}</div>
              <div className="text-[11px] text-[var(--text-muted)] leading-snug">{it.desc}</div>
            </div>
            {it.link && <span className="text-gray-400 font-bold">→</span>}
          </div>
        ))}
      </div>
      <button className="w-full py-2 text-xs text-[var(--text-muted)]">知道了</button>
    </div>
  );
}

// Popup preview — 与 PopupAnnouncement 组件视觉尽量对齐
function PopupPreview({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-[var(--pink-primary)]" />
        <span className="text-xs font-semibold text-[var(--pink-primary)] uppercase tracking-wider">公告</span>
      </div>
      <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">{content}</p>
      <button className="w-full py-2.5 rounded-xl bg-[var(--pink-primary)] text-white text-sm font-medium">
        知道了 · 可在私信查看
      </button>
    </div>
  );
}

export default function AdminMessagesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-32"><Loader2 className="animate-spin" size={24} /></div>}>
      <AdminMessagesContent />
    </Suspense>
  );
}
