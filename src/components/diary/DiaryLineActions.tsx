'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, Mic, Square, Bookmark, BookmarkCheck, Play, Save, Trash2 } from 'lucide-react';
import { speak } from '@/lib/tts';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { AudioRecorder, isRecordingSupported, revokeRecording, parseErrorKey } from '@/lib/audio/recorder';
import { saveRecording } from '@/lib/audio/saveRecording';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  [k: string]: unknown;
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
  const { lang } = useLang();
  const { user } = useAuth();
  const [bookmarked, setBookmarked] = useState(false);
  const [recState, setRecState] = useState<'idle' | 'recording' | 'preview'>('idle');
  const [recUrl, setRecUrl] = useState<string | null>(null);
  const [recBlob, setRecBlob] = useState<Blob | null>(null);
  const [recDur, setRecDur] = useState(0);
  const [saved, setSaved] = useState(false);
  const [recError, setRecError] = useState<string | null>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const myAudioRef = useRef<HTMLAudioElement | null>(null);

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
    if (!user?.id) return;  // 未登录不允许加书签，避免空 userId 数据
    try {
      const all = await db.sentences.where('korean').equals(ko).toArray();
      const mine = all.find((s) => s.userId === user.id);
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
          created_at: Date.now(),
        });
      }
      setBookmarked(true);
    } catch { /* ignore */ }
  };

  const handleStartRecord = async () => {
    if (!isRecordingSupported()) {
      setRecError(t('diary.line.noRecordSupport', lang));
      return;
    }
    setRecError(null);
    const r = new AudioRecorder(15000);
    recorderRef.current = r;
    const res = await r.start();
    if (res.error) {
      const parsed = parseErrorKey(res.error);
      setRecError(t(parsed.key, lang, parsed.params));
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
    // 停掉上一个 audio 实例，防多次点击导致重叠播放 / 内存泄漏
    if (myAudioRef.current) {
      myAudioRef.current.pause();
      myAudioRef.current.src = '';
    }
    const audio = new Audio(recUrl);
    myAudioRef.current = audio;
    audio.play().catch(() => { /* ignore */ });
  };

  const handleSaveRecording = async () => {
    if (!recBlob) return;
    const id = await saveRecording({
      blob: recBlob,
      durationMs: recDur,
      type: 'shadowing',
      sourceType: 'tori-diary',
      sourceId: source,
      korean: ko,
      userId: user?.id,
    });
    if (id) setSaved(true);
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
        <ActionBtn onClick={handleSpeak} ariaLabel={t('diary.line.read', lang)}>
          <Volume2 size={14} />
        </ActionBtn>

        {showRecord && recState === 'idle' && (
          <ActionBtn onClick={handleStartRecord} ariaLabel={t('diary.line.record', lang)}>
            <Mic size={14} />
          </ActionBtn>
        )}
        {showRecord && recState === 'recording' && (
          <ActionBtn onClick={handleStopRecord} ariaLabel={t('diary.line.stopRecord', lang)} highlighted>
            <Square size={12} fill="currentColor" />
          </ActionBtn>
        )}

        <ActionBtn onClick={handleBookmark} ariaLabel={t('diary.line.bookmark', lang)} disabled={bookmarked}>
          {bookmarked ? <BookmarkCheck size={14} color="var(--color-mint-strong)" /> : <Bookmark size={14} />}
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
            {t('diary.line.myRecording', lang, { sec: (recDur / 1000).toFixed(1) })}
          </span>
          <ActionBtn onClick={handlePlayMine} ariaLabel={t('diary.line.playMine', lang)}>
            <Play size={12} />
          </ActionBtn>
          <ActionBtn onClick={handleSpeak} ariaLabel={t('diary.line.replayOriginal', lang)}>
            <Volume2 size={12} />
          </ActionBtn>
          {saved ? (
            <span className="diary-handwriting-zh" style={{ fontSize: 11, color: 'var(--color-mint-strong)' }}>
              {t('diary.line.saved', lang)}
            </span>
          ) : user?.id ? (
            // 仅登录用户显示保存按钮：未登录 saveRecording 会静默返回 null，按钮点了没反应
            <button
              onClick={handleSaveRecording}
              className="diary-btn diary-btn-ghost"
              style={{ padding: '3px 10px', fontSize: 11 }}
            >
              <Save size={11} /> {t('diary.line.save', lang)}
            </button>
          ) : null}
          <button
            onClick={handleDiscardRecording}
            aria-label={t('diary.line.discard', lang)}
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
