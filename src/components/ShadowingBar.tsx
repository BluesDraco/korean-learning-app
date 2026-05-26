'use client';

import { Volume2, Mic, SkipForward, X } from 'lucide-react';

interface ShadowingBarProps {
  korean: string;
  pronunciation: string;
  chinese: string;
  isRecording: boolean;
  onListen: () => void;
  onRecord: () => void;
  onNext: () => void;
  onExit: () => void;
}

export function ShadowingBar({
  korean,
  pronunciation,
  chinese,
  isRecording,
  onListen,
  onRecord,
  onNext,
  onExit,
}: ShadowingBarProps) {
  return (
    <div className="bg-[var(--bg-card)] border-t border-[var(--border-color)] rounded-t-2xl p-4 space-y-3 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--peach-soft)] uppercase tracking-wider">跟读模式</span>
        <button onClick={onExit} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1">
          <X size={16} />
        </button>
      </div>

      {/* Korean sentence — large display */}
      <div className="text-center space-y-1">
        <p className="text-xl font-bold text-[var(--text-primary)] leading-relaxed">{korean}</p>
        <p className="text-xs text-[var(--text-muted)]">{pronunciation}</p>
        <p className="text-sm text-[var(--text-secondary)]">{chinese}</p>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onListen}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-colors text-sm font-medium"
        >
          <Volume2 size={16} />
          听一遍
        </button>
        <button
          onClick={onRecord}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            isRecording
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-[var(--pink-primary)] text-[var(--text-primary)] hover:bg-[var(--pink-primary)]'
          }`}
        >
          <Mic size={16} />
          {isRecording ? '录音中...' : '我来跟读'}
        </button>
        <button
          onClick={onNext}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-colors text-sm font-medium"
        >
          <SkipForward size={16} />
          下一句
        </button>
      </div>
    </div>
  );
}
