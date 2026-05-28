'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Send, Loader2, Check, Users, User, Megaphone, FileText, Bell } from 'lucide-react';
import type { AnnouncementType } from '@/types';

const TYPE_OPTIONS: { value: AnnouncementType; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { value: 'announcement', label: '公告（全员）', icon: Megaphone },
  { value: 'update_log', label: '更新日志', icon: FileText },
  { value: 'private_message', label: '私信（指定用户）', icon: Bell },
];

export default function AdminMessagesPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<AnnouncementType>('announcement');
  const [targetUserId, setTargetUserId] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [users, setUsers] = useState<{ id: string; username: string; nickname: string }[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/admin/users')
      .then((r) => r.json())
      .then((data) => {
        if (data.users) setUsers(data.users);
      })
      .catch(() => {});
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredUsers = users.filter(
    (u) => !userSearch || u.username.includes(userSearch) || u.nickname.includes(userSearch)
  );

  const selectedUser = users.find((u) => u.id === targetUserId);

  const handleSend = useCallback(async () => {
    if (!title.trim() || !content.trim()) return;
    if (type === 'private_message' && !targetUserId.trim()) return;

    setSending(true);
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title.trim(),
        content: content.trim(),
        type,
        targetUserId: type === 'private_message' ? targetUserId.trim() : null,
      }),
    });

    if (res.ok) {
      setTitle('');
      setContent('');
      setTargetUserId('');
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }
    setSending(false);
  }, [title, content, type, targetUserId]);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">消息中心</h1>
        <p className="text-sm text-gray-500 mt-1">编辑消息并发送给用户</p>
      </div>

      <div className="bg-white border border-[#F5E6E0] rounded-2xl p-6 space-y-5">
        {/* Type selector */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">消息类型</label>
          <div className="grid grid-cols-3 gap-2">
            {TYPE_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() => { setType(opt.value); setTargetUserId(''); }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    type === opt.value
                      ? 'bg-[#FFF0F4] text-[#FF8FAB] border border-[#FF8FAB]/30'
                      : 'bg-gray-50 text-gray-500 border border-transparent hover:bg-gray-100'
                  }`}
                >
                  <Icon size={15} />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Target user selector (only for private messages) */}
        {type === 'private_message' && (
          <div ref={dropdownRef} className="relative">
            <label className="text-sm font-medium text-gray-700 mb-2 block">目标用户</label>
            {selectedUser ? (
              <div className="flex items-center gap-2 p-3 bg-[#FFF0F4] border border-[#FF8FAB]/20 rounded-xl">
                <User size={16} className="text-[#FF8FAB]" />
                <span className="text-sm font-medium text-gray-700">{selectedUser.nickname || selectedUser.username}</span>
                <span className="text-xs text-gray-400">@{selectedUser.username}</span>
                <button
                  onClick={() => { setTargetUserId(''); setUserSearch(''); }}
                  className="ml-auto text-xs text-gray-400 hover:text-red-400"
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
                  placeholder="搜索用户..."
                  className="w-full bg-gray-50 border border-[#F5E6E0] rounded-xl py-2.5 px-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#FF8FAB]"
                />
                {showUserDropdown && filteredUsers.length > 0 && (
                  <div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-[#F5E6E0] rounded-xl shadow-lg max-h-48 overflow-y-auto">
                    {filteredUsers.slice(0, 20).map((u) => (
                      <button
                        key={u.id}
                        onClick={() => { setTargetUserId(u.id); setUserSearch(''); setShowUserDropdown(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-[#FFF0F4] transition-colors"
                      >
                        <User size={15} className="text-gray-400" />
                        <span className="text-gray-700 font-medium">{u.nickname || u.username}</span>
                        <span className="text-gray-400 text-xs">@{u.username}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Title */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">标题</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入消息标题..."
            className="w-full bg-gray-50 border border-[#F5E6E0] rounded-xl py-2.5 px-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#FF8FAB]"
          />
        </div>

        {/* Content */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">内容</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="输入消息内容（支持换行）..."
            rows={6}
            className="w-full bg-gray-50 border border-[#F5E6E0] rounded-xl py-3 px-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#FF8FAB] resize-none"
          />
        </div>

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={sending || !title.trim() || !content.trim()}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
            sent
              ? 'bg-green-500 text-white'
              : 'bg-[#FF8FAB] text-white hover:bg-[#FF7A9A] disabled:bg-gray-200 disabled:text-gray-400'
          }`}
        >
          {sending ? (
            <Loader2 size={17} className="animate-spin" />
          ) : sent ? (
            <>
              <Check size={17} />
              发送成功
            </>
          ) : (
            <>
              <Send size={17} />
              一键发送
            </>
          )}
        </button>

        {/* Info */}
        <p className="text-xs text-gray-400 text-center">
          {type === 'private_message'
            ? '私信仅目标用户可见'
            : type === 'update_log'
              ? '更新日志将对所有用户可见'
              : '公告将对所有用户可见'}
        </p>
      </div>
    </div>
  );
}
