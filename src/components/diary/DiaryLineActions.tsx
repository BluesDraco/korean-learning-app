'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, Mic, Square, Bookmark, BookmarkCheck, Play, Save, Trash2 } from 'lucide-react';
import { speak } from '@/lib/tts';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { AudioRecorder, isRecordingSupported, revokeRecording } from '@/lib/audio/recorder';

interface Props {
  ko: string;
  zh?: string;
  source: string;
  showRecord?: boolean;
  rate?: number;
}

/**
 * 行级操作栏 — 小喇叭 / 跟读录音 / 收藏到我的句子
 * dialogue 行 + grammar 例句通用
 */
export function DiaryLineActions({ ko, zh, source, showRecord = false, rate = 0.85 }: Props) {
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [recState, setRecState] = useState<'idle' | 'recording' | 'preview'>('idle');
  const [recUrl, setRecUrl] = useState<string | null>(null);
  const [recBlob, setRecBlob] = useState<Blob | null>(null);
  const [recDur, setRecDur] = useState(0);
  const [saved, setSaved] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);

  // 查询是否已收藏（按 userId 过滤，防止多账号串）
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const all = await db.sentences.where('korean').equals(ko).toArray();
        const mine = all.find((s) => !s.userId || s.userId === user?.id);
        if (!cancelled && mine) setBookmarked(true);
      } catch { /* ignore */ }
    })();
    return () => { cancelled = true; };
  }, [ko, user?.id]);

  // 卸载清理
  useEffect(() => {
    return () => {
      if (recUrl) revokeRecording(recUrl);
      const r = recorderRef.current;
      if (r && r.state === 'recording') r.cancel();
    };
  }, [recUrl]);

  const handleSpeak = async () => {
    try { await speak(ko, rate); } catch { /* ignore */ }
  };

  const handleBookmark = async () => {
    if (bookmarked) return;
    try {
      const all = await db.sentences.where('korean').equals(ko).toArray();
      const mine = all.find((s) => !s.userId || s.userId === user?.id);
      if (!mine) {
        await db.sentences.add({
          id: crypto.randomUUID(),
          userId: user?.id,
          korean: ko,
          chinese: zh,
          sourceType: 'tori-diary',
          source_type: 'tori-diary',
          sourceId: source,
          source_id: source,
          sourceTitle: '兔莉的韩语日记',
          source_title: '兔莉的韩语日记',
          createdAt: Date.now(),
          created_at: new Date().toISOString(),
        });
      }
      setBookmarked(true);
    } catch { /* ignore */ }
  };

  const handleStartRecord = async () => {
    if (!isRecordingSupported()) {
      setRecError('此浏览器不支持录音');
      return;
    }
    setRecError(null);
    const r = new AudioRecorder(15000);
    recorderRef.current = r;
    const res = await r.start();
    if (res.error) {
      setRecError(res.error);
      recorderRef.current = null;
      return;
    }
    setRecState('recording');
  };

  const handleStopRecord = async () => {
    const r = recorderRef.current;
    if (!r) return;
    const result = await r.stop();
    recorderRef.current = null;
    if (result) {
      setRecUrl(result.url);
      setRecBlob(result.blob);
      setRecDur(result.durationMs);
      setRecState('preview');
    } else {
      setRecState('idle');
    }
  };

  const handlePlayMine = () => {
    if (!recUrl) return;
    const audio = new Audio(recUrl);
    audio.play().catch(() => { /* ignore */ });
  };

  const handleSaveRecording = async () => {
    if (!recBlob) return;
    try {
      const dataUrl = await blobToDataUrl(recBlob);
      await db.recordings.add({
        id: crypto.randomUUID(),
        userId: user?.id,
        type: 'shadowing',
        sourceType: 'tori-diary',
        source_type: 'tori-diary',
        sourceId: source,
        source_id: source,
        korean: ko,
        audioData: dataUrl,
        audio_data: dataUrl,
        durationMs: recDur,
        duration_ms: recDur,
        createdAt: Date.now(),
        created_at: new Date().toISOString(),
      });
      setSaved(true);
    } catch { /* ignore */ }
  };

  const handleDiscardRecording = () => {
    if (recUrl) revokeRecording(recUrl);
    setRecUrl(null);
    setRecBlob(null);
    setRecDur(0);
    setSaved(false);
    setRecState('idle');
  };

  return (
    <>
      <div style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}>
        <ActionBtn onClick={handleSpeak} ariaLabel="朗读">
          <Volume2 size={14} />
        </ActionBtn>

        {showRecord && recState === 'idle' && (
          <ActionBtn onClick={handleStartRecord} ariaLabel="跟读录音">
            <Mic size={14} />
          </ActionBtn>
        )}
        {showRecord && recState === 'recording' && (
          <ActionBtn onClick={handleStopRecord} ariaLabel="停止录音" highlighted>
            <Square size={12} fill="currentColor" />
          </ActionBtn>
        )}

        <ActionBtn onClick={handleBookmark} ariaLabel="收藏到我的句子" disabled={bookmarked}>
          {bookmarked ? <BookmarkCheck size={14} color="#5ea886" /> : <Bookmark size={14} />}
        </ActionBtn>
      </div>

      {recError && (
        <div className="diary-handwriting-zh" style={{ fontSize: 11, color: 'var(--diary-stamp-red)', marginTop: 4 }}>
          {recError}
        </div>
      )}

      {recState === 'preview' && recUrl && (
        <div
          className="diary-anim-fade-up"
          style={{
            marginTop: 8,
            padding: '8px 10px',
            background: 'var(--diary-paper-deep)',
            border: '1px solid var(--diary-line)',
            borderRadius: 'var(--diary-r-sm)',
            display: 'flex',
            gap: 6,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <span className="diary-handwriting-zh" style={{ fontSize: 11, color: 'var(--diary-ink-soft)' }}>
            我的录音 {(recDur / 1000).toFixed(1)}s
          </span>
          <ActionBtn onClick={handlePlayMine} ariaLabel="回放我的录音">
            <Play size={12} />
          </ActionBtn>
          <ActionBtn onClick={handleSpeak} ariaLabel="重听原句">
            <Volume2 size={12} />
          </ActionBtn>
          {!saved ? (
            <button
              onClick={handleSaveRecording}
              className="diary-btn diary-btn-ghost"
              style={{ padding: '3px 10px', fontSize: 11 }}
            >
              <Save size={11} /> 保存
            </button>
          ) : (
            <span className="diary-handwriting-zh" style={{ fontSize: 11, color: '#5ea886' }}>
              已保存到我的录音 ✓
            </span>
          )}
          <button
            onClick={handleDiscardRecording}
            aria-label="丢弃"
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--diary-ink-faint)',
              padding: 4,
              display: 'inline-flex',
            }}
          >
            <Trash2 size={12} />
          </button>
        </div>
      )}
    </>
  );
}

function ActionBtn({
  onClick,
  ariaLabel,
  children,
  disabled,
  highlighted,
}: {
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
  disabled?: boolean;
  highlighted?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        border: '1.5px solid var(--diary-line-strong)',
        background: highlighted ? 'var(--diary-stamp-red)' : 'transparent',
        color: highlighted ? '#fff' : 'var(--diary-gold-deep)',
        cursor: disabled ? 'default' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
  );
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
