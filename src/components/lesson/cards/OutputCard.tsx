'use client';

import { Edit3, Volume2 } from 'lucide-react';
import { speak } from '@/lib/tts';
import type { OutputTask } from '@/data/thirtyDayCourse';

interface Props {
  output: OutputTask;
  text: string;
  setText: (v: string) => void;
  showKeyboard: boolean;
  setShowKeyboard: (v: boolean) => void;
  isMobile: boolean;
}

export function OutputCard({ output, text, setText }: Props) {
  return (
    <div className="w-full text-left space-y-4">
      <div className="flex items-center gap-2">
        <Edit3 size={18} className="text-[var(--pink-primary)]" />
        <span className="text-sm font-bold text-[var(--text-primary)]">输出练习</span>
      </div>
      <p className="text-sm text-[var(--text-primary)]">{output.prompt}</p>
      <p className="text-[11px] text-[var(--text-muted)]">提示：{output.hint}</p>
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="写下你的韩语句子..."
          rows={3}
          className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl p-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] resize-none focus:outline-none focus:border-[var(--pink-pale)]"
        />
      </div>
      {text && (
        <div className="p-3 bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-xl">
          <p className="text-[11px] text-[var(--text-muted)] mb-1">参考例句</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-[var(--text-primary)] flex-1">{output.exampleAnswer}</p>
            <button
              onClick={() => speak(output.exampleAnswer, 0.8)}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-card-hover)] transition-colors shrink-0"
            >
              <Volume2 size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
