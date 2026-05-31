'use client';

import { memo, useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import type { TokenInfo } from '@/lib/dictionary';
import type { StudySubtitle } from '@/types';

interface SubtitlePanelProps {
  subtitles: StudySubtitle[];
  activeIndex: number;
  subtitleMode: 'bilingual' | 'korean' | 'chinese' | 'hidden';
  onSubtitleClick: (index: number) => void;
  onWordClick: (token: TokenInfo, subtitleIndex: number) => void;
  onLoopClick: (index: number) => void;
  loopIndex: number | null;
}

export const SubtitlePanel = memo(function SubtitlePanel({
  subtitles,
  activeIndex,
  subtitleMode,
  onSubtitleClick,
  onWordClick,
  onLoopClick,
  loopIndex,
}: SubtitlePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to keep active subtitle in view
  useEffect(() => {
    if (activeIndex < 0 || !containerRef.current) return;
    const items = containerRef.current.children;
    if (items[activeIndex]) {
      items[activeIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeIndex]);

  if (subtitleMode === 'hidden') {
    return (
      <div className="flex items-center justify-center py-16 text-[var(--text-muted)] text-sm">
        字幕已隐藏 · 练听力模式
      </div>
    );
  }

  if (subtitles.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-[var(--text-muted)] text-sm">
        暂无字幕，请上传SRT文件
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-1 max-h-full overflow-y-auto">
      {subtitles.map((sub, i) => {
        const isActive = activeIndex === i;
        const isLooping = loopIndex === i;
        let tokens: TokenInfo[] = [];
        try {
          tokens = JSON.parse(sub.tokens || '[]');
        } catch {}

        return (
          <div
            key={sub.id}
            onClick={() => onSubtitleClick(i)}
            className={`group p-3 rounded-lg cursor-pointer transition-all ${
              isActive
                ? 'bg-[var(--pink-primary)]/15 border-l-[3px] border-l-[var(--pink-primary)]'
                : 'border-l-[3px] border-l-transparent hover:bg-[var(--bg-card-hover)]'
            } ${isLooping ? 'ring-1 ring-[var(--peach-soft)]/50' : ''}`}
          >
            {/* Timestamp + controls */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] text-[var(--text-muted)] font-mono tabular-nums">
                {formatTime(sub.start)}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); onLoopClick(i); }}
                className={`text-[11px] px-1.5 py-0.5 rounded-md transition-colors ${
                  isLooping
                    ? 'bg-[var(--peach-soft)]/15 text-[var(--peach-soft)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--peach-soft)] opacity-0 group-hover:opacity-100'
                }`}
                title={isLooping ? '退出循环' : '循环影子跟读此句'}
              >
                <RefreshCw size={12} className={isLooping ? 'animate-spin' : ''} />
              </button>
            </div>

            {/* Korean text */}
            {(subtitleMode === 'bilingual' || subtitleMode === 'korean') && (
              <p className={`text-[15px] leading-relaxed transition-colors ${
                isActive ? 'text-[var(--pink-primary)] font-medium' : 'text-[var(--text-primary)]'
              }`}>
                {tokens.length > 0 ? (
                  tokens.map((token, ti) => {
                    if (token.isKoreanWord) {
                      return (
                        <button
                          key={ti}
                          onClick={(e) => { e.stopPropagation(); onWordClick(token, i); }}
                          className="text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/10 px-0.5 py-0.5 rounded transition-colors cursor-pointer"
                        >
                          {token.text}
                        </button>
                      );
                    }
                    return <span key={ti}>{token.text}</span>;
                  })
                ) : (
                  sub.text
                )}
              </p>
            )}

            {/* Chinese translation */}
            {(subtitleMode === 'bilingual' || subtitleMode === 'chinese') && sub.textZh && (
              <p className="text-[13px] text-[var(--text-secondary)] mt-1.5 ml-1">{sub.textZh}</p>
            )}
          </div>
        );
      })}
    </div>
  );
});

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
