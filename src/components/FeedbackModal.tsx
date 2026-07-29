'use client';

import { useState } from 'react';
import { MessageSquare, X, Check } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

/** 反馈/报告问题弹窗（受控）。原全站悬浮按钮已移除，改由设置页入口触发。 */
export function FeedbackModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useLang();
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
      setTimeout(() => { onClose(); setSent(false); setMessage(''); }, 1500);
    } catch {}
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 pb-[calc(72px+env(safe-area-inset-bottom,0px))] sm:pb-4">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative bg-[var(--bg-card)] rounded-2xl shadow-2xl w-full max-w-sm p-5 space-y-4 animate-bounce-in border border-[var(--border-color)]">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
            <MessageSquare size={16} className="text-[var(--pink-primary)]" />
            {t('feedback.report_title', lang)}
          </h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)] transition-colors">
            <X size={16} />
          </button>
        </div>

        {sent ? (
          <div className="text-center py-6 space-y-2">
            <div className="w-12 h-12 rounded-full bg-[var(--mint-soft)]/10 flex items-center justify-center mx-auto">
              <Check size={24} className="text-[var(--mint-soft)]" />
            </div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{t('feedback.sent_title', lang)}</p>
            <p className="text-xs text-[var(--text-muted)]">{t('feedback.sent_sub', lang)}</p>
          </div>
        ) : (
          <>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('feedback.placeholder', lang)}
              rows={3}
              className="w-full rounded-xl border border-[var(--border-color)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] bg-[var(--bg-input)] resize-none focus:outline-none focus:border-[var(--pink-primary)]/40 transition-colors"
            />
            <button
              onClick={handleSubmit}
              disabled={!message.trim()}
              className="w-full py-2.5 rounded-xl bg-[var(--pink-primary)] hover:brightness-95 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors transition-opacity transition-shadow transition-[filter] active:scale-[0.98]"
            >
              {t('feedback.submit', lang)}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
