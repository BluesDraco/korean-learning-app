'use client';

import { Volume2, Mic, SkipForward, X, Check, Play, RotateCcw, Bookmark, BookmarkCheck, Save } from 'lucide-react';
import type { DiffSegment } from '@/lib/koreanDiff';
import { ToriCardMascot } from '@/components/mobile/ToriCardMascot';

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
  recordState: 'idle' | 'recording' | 'recorded';
  recordedAudioUrl: string | null;
  isPlayingRecording: boolean;
  isSentenceSaved: boolean;
  isAuthenticated: boolean;
  onListen: () => void;
  onRecord: () => void;
  onPlayRecording: () => void;
  onSaveSentence: () => void;
  onSaveRecording: () => void;
  onNext: () => void;
  onExit: () => void;
  feedback?: ShadowingFeedback | null;
}

export function ShadowingBar({
  korean,
  pronunciation,
  chinese,
  recordState,
  recordedAudioUrl,
  isPlayingRecording,
  isSentenceSaved,
  isAuthenticated,
  onListen,
  onRecord,
  onPlayRecording,
  onSaveSentence,
  onSaveRecording,
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
      <div className="relative overflow-visible text-center space-y-1">
        <p className="text-xl font-bold text-[var(--text-primary)] leading-relaxed">{korean}</p>
        <p className="text-xs text-[var(--text-muted)]">{pronunciation}</p>
        <p className="text-sm text-[var(--text-secondary)]">{chinese}</p>
        <ToriCardMascot customSrc="/images/tori-kpop-lyric.png" size="sm" className="-right-1 -bottom-2" />
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
                        s.status === 'wrong' ? 'text-[var(--color-danger)] line-through' :
                        'text-[var(--peach-soft)] underline'
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
                        'text-[var(--color-danger)]'
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

      {/* Playback bar — shown after recording */}
      {recordState === 'recorded' && recordedAudioUrl && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onPlayRecording}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              isPlayingRecording
                ? 'bg-[var(--mint-soft)]/20 text-[var(--mint-soft)]'
                : 'bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
            }`}
          >
            <Play size={16} />
            {isPlayingRecording ? '播放中...' : '播放我的录音'}
          </button>
          <button
            onClick={onRecord}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-colors text-sm font-medium"
          >
            <RotateCcw size={16} />
            重录
          </button>
        </div>
      )}

      {/* Save buttons — shown after recording */}
      {recordState === 'recorded' && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={onSaveSentence}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              isSentenceSaved
                ? 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]'
                : 'bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
            }`}
          >
            {isSentenceSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            {isSentenceSaved ? '已保存句子' : '保存句子'}
          </button>
          {isAuthenticated && (
            <button
              onClick={onSaveRecording}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-colors"
            >
              <Save size={14} />
              保存录音
            </button>
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

        {recordState !== 'recorded' && (
          <button
            onClick={onRecord}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              recordState === 'recording'
                ? 'bg-[var(--color-danger)] text-white animate-pulse'
                : 'bg-[var(--pink-primary)] text-[var(--text-primary)] hover:bg-[var(--pink-primary)]'
            }`}
          >
            <Mic size={16} />
            {recordState === 'recording' ? '录音中...' : '开始跟读'}
          </button>
        )}

        <button
          onClick={onNext}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
            recordState === 'recorded'
              ? 'bg-[var(--pink-primary)] text-white'
              : 'bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          <SkipForward size={16} />
          下一句
        </button>
      </div>
    </div>
  );
}
