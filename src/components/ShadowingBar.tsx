'use client';

import { Volume2, Mic, SkipForward, X, Check } from 'lucide-react';
import type { DiffSegment } from '@/lib/koreanDiff';

interface ShadowingFeedback {
  userDiff: DiffSegment[];
  correctDiff: DiffSegment[];
  notes: string[];
  transcript: string;
}

interface ShadowingBarProps {
  korean: string;
  pronunciation: string;
  chinese: string;
  isRecording: boolean;
  onListen: () => void;
  onRecord: () => void;
  onNext: () => void;
  onExit: () => void;
  feedback?: ShadowingFeedback | null;
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
  feedback,
}: ShadowingBarProps) {
  return (
    <div className="bg-[var(--bg-card)] border-t border-[var(--border-color)] rounded-t-2xl p-4 space-y-3 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[var(--peach-soft)] uppercase tracking-wider">影子跟读</span>
        <button onClick={onExit} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1">
          <X size={16} />
        </button>
      </div>

      {/* Korean sentence */}
      <div className="text-center space-y-1">
        <p className="text-xl font-bold text-[var(--text-primary)] leading-relaxed">{korean}</p>
        <p className="text-xs text-[var(--text-muted)]">{pronunciation}</p>
        <p className="text-sm text-[var(--text-secondary)]">{chinese}</p>
      </div>

      {/* Feedback display */}
      {feedback && (
        <div className="bg-[var(--bg-input)] rounded-xl p-3 space-y-2 animate-fade-in">
          {feedback.notes.length === 0 ? (
            <div className="flex items-center justify-center gap-2 text-[var(--mint-soft)] text-sm">
              <Check size={16} /> 发音完美！
            </div>
          ) : (
            <>
              <div className="space-y-1 text-sm">
                <div>
                  <span className="text-xs text-[var(--text-muted)]">你说: </span>
                  <span className="font-mono text-base">
                    {feedback.userDiff.map((s, i) => (
                      <span key={i} className={
                        s.status === 'correct' ? 'text-[var(--mint-soft)]' :
                        s.status === 'wrong' ? 'text-red-400 line-through' :
                        'text-yellow-400 underline'
                      }>{s.char}</span>
                    ))}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[var(--text-muted)]">原文: </span>
                  <span className="font-mono text-base">
                    {feedback.correctDiff.map((s, i) => (
                      <span key={i} className={
                        s.status === 'correct' ? 'text-[var(--mint-soft)]' :
                        s.status === 'wrong' ? 'text-[var(--pink-primary)] font-bold' :
                        'text-red-400'
                      }>{s.char}</span>
                    ))}
                  </span>
                </div>
              </div>
              <div className="space-y-0.5">
                {feedback.notes.map((n, i) => (
                  <p key={i} className="text-xs text-[var(--text-secondary)]">• {n}</p>
                ))}
              </div>
            </>
          )}
        </div>
      )}

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
          {isRecording ? '录音中...' : '开始跟读'}
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
