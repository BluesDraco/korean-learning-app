'use client';

import { useState } from 'react';
import { MessageSquare, X, Check } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const pathname = usePathname();

  const handleSubmit = async () => {
    if (!message.trim()) return;
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: pathname, type: 'content_error', message }),
      });
      setSent(true);
      setTimeout(() => { setOpen(false); setSent(false); setMessage(''); }, 1500);
    } catch {}
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-20 z-50 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm border border-[var(--border-color)] shadow-lg flex items-center justify-center hover:shadow-xl hover:border-[var(--pink-primary)]/40 transition-all text-[var(--text-muted)] hover:text-[var(--pink-primary)]"
        title="报告错误"
      >
        <MessageSquare size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5 space-y-4 animate-bounce-in border border-[var(--border-color)]">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <MessageSquare size={16} className="text-[var(--pink-primary)]" />
                报告问题
              </h3>
              <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)] transition-colors">
                <X size={16} />
              </button>
            </div>

            {sent ? (
              <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 rounded-full bg-[var(--mint-soft)]/10 flex items-center justify-center mx-auto">
                  <Check size={24} className="text-[var(--mint-soft)]" />
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)]">感谢反馈！</p>
                <p className="text-xs text-[var(--text-muted)]">托里会尽快处理</p>
              </div>
            ) : (
              <>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="描述你发现的问题..."
                  rows={3}
                  className="w-full rounded-xl border border-[var(--border-color)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] bg-[var(--bg-input)] resize-none focus:outline-none focus:border-[var(--pink-primary)]/40 transition-colors"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!message.trim()}
                  className="w-full py-2.5 rounded-xl bg-[var(--pink-primary)] hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-all active:scale-[0.98]"
                >
                  提交反馈
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
