'use client';

import { useEffect, useRef, useState } from 'react';
import type { ToriDay, ToriDialogueLine, ToriModuleState } from '@/types/tori-diary';
import { ChevronRight, ChevronDown, MessageCircle, Volume2, Mic, Square, Play, RotateCcw } from 'lucide-react';
import { speak } from '@/lib/tts';
import { AudioRecorder, isRecordingSupported, revokeRecording, parseErrorKey } from '@/lib/audio/recorder';
import { TappableText } from '@/components/TappableText';
import { DiaryLineActions } from './DiaryLineActions';
import { sfxCorrect, sfxWrong, sfxPop } from '@/lib/sfx';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import type { KoZhChoice } from '@/types/inline';

interface Props {
  [k: string]: unknown;
  day: ToriDay;
  onComplete: () => void;
  onBack?: () => void;
  initialState?: ToriModuleState['dialogue'];
  onStateChange?: (patch: ToriModuleState['dialogue']) => void;
}

export function DiaryDialogue({ day, onComplete, onBack, initialState, onStateChange }: Props) {
  const { lang } = useLang();
  const lines = day.dialogue?.lines ?? [];
  const [currentIdx, setCurrentIdx] = useState(initialState?.currentIdx ?? 0);
  const [picked, setPicked] = useState<Record<number, number>>(initialState?.picked ?? {});
  const [shadowedIdx, setShadowedIdx] = useState<Set<number>>(new Set(initialState?.shadowed ?? []));

  useEffect(() => {
    onStateChange?.({ currentIdx, picked, shadowed: Array.from(shadowedIdx) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx, picked, shadowedIdx]);
  const completedRef = useRef(false);
  const safeComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  // shadow 自动推进定时器，卸载/切换 day 时清理
  const shadowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (shadowTimerRef.current) clearTimeout(shadowTimerRef.current);
  }, []);

  // 数据缺失守卫（day-X.ts 写错时不至于整页崩）
  if (!day.dialogue || lines.length === 0) {
    return (
      <div className="diary-anim-fade-up" style={{ padding: 24, textAlign: 'center' }}>
        <p className="diary-text-soft" style={{ marginBottom: 16 }}>{t('diary.dlg.empty', lang)}</p>
        <button onClick={safeComplete} className="diary-btn diary-btn-primary">{t('diary.dlg.next', lang)}</button>
      </div>
    );
  }

  const currentLine = lines[currentIdx];
  const isLast = currentIdx === lines.length - 1;
  const lastLinePassed =
    isLast &&
    (currentLine.practice !== 'pick' ||
      (picked[currentIdx] !== undefined && currentLine.choices?.[picked[currentIdx]]?.correct));

  const handlePick = (lineIdx: number, choiceIdx: number) => {
    setPicked((p) => ({ ...p, [lineIdx]: choiceIdx }));
    const correct = lines[lineIdx]?.choices?.[choiceIdx]?.correct === true;
    if (correct) sfxCorrect(); else sfxWrong();
    // 选对后不再自动跳，让用户看清正解与译文；由「下一句」按钮手动推进
  };

  // 当前 pick 行是否已选对（用于「下一句」按钮的启用/禁用）
  const currentPickPassed =
    currentLine.practice === 'pick'
      ? picked[currentIdx] !== undefined && currentLine.choices?.[picked[currentIdx]]?.correct === true
      : true;

  const handleShadow = (lineIdx: number) => {
    setShadowedIdx((s) => new Set(s).add(lineIdx));
    if (lineIdx < lines.length - 1) {
      if (shadowTimerRef.current) clearTimeout(shadowTimerRef.current);
      shadowTimerRef.current = setTimeout(() => setCurrentIdx((i) => Math.max(i, lineIdx + 1)), 600);
    }
  };

  const handleListenAdvance = () => {
    if (!isLast) {
      setCurrentIdx((i) => i + 1);
    }
  };

  return (
    <div className="diary-anim-fade-up">
      <div style={{ marginBottom: 18 }}>
        <span className="diary-tag diary-tag-mint">{t('diary.dlg.tag', lang)}</span>
      </div>
      <h2 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 6 }}>
        {day.dialogue.scene}
      </h2>
      <p className="diary-handwriting-zh diary-text-soft" style={{ marginBottom: 20 }}>
        📍 {day.dialogue.setting.place} · {day.dialogue.setting.time}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
        {lines.slice(0, currentIdx + 1).map((line, idx) => (
          <DialogueLine
            key={idx}
            line={line}
            idx={idx}
            day={day.day}
            isCurrent={idx === currentIdx}
            pickedChoice={picked[idx]}
            isShadowed={shadowedIdx.has(idx)}
            onPick={(ci) => handlePick(idx, ci)}
            onShadow={() => handleShadow(idx)}
            onListenAdvance={handleListenAdvance}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={{
            flex: 1, height: 52, borderRadius: 14,
            background: 'var(--diary-paper-deep)', color: 'var(--diary-ink-2)',
            border: '1px solid var(--diary-line)', cursor: 'pointer',
            fontSize: 16, fontWeight: 600, fontFamily: 'var(--diary-font-zh)',
          }}>
            {t('diary.dlg.prev', lang)}
          </button>
        )}
        {isLast ? (
          <button
            onClick={() => { sfxPop(); safeComplete(); }}
            disabled={!lastLinePassed}
            className="diary-btn diary-btn-primary"
            style={{ flex: 2, opacity: lastLinePassed ? 1 : 0.4, cursor: lastLinePassed ? 'pointer' : 'not-allowed' }}
            aria-label={lastLinePassed ? t('diary.dlg.toGrammarAria', lang) : t('diary.dlg.finishFirstAria', lang)}
          >
            {t('diary.dlg.nextGrammar', lang)} <ChevronRight size={16} />
          </button>
        ) : currentLine.practice === 'pick' ? (
          <button
            onClick={() => { sfxPop(); setCurrentIdx((i) => i + 1); }}
            disabled={!currentPickPassed}
            className="diary-btn diary-btn-primary"
            style={{ flex: 2, opacity: currentPickPassed ? 1 : 0.4, cursor: currentPickPassed ? 'pointer' : 'not-allowed' }}
            aria-label={currentPickPassed ? t('diary.dlg.nextLineAria', lang) : t('diary.dlg.pickCorrectAria', lang)}
          >
            {t('diary.dlg.nextLine', lang)} <ChevronRight size={16} />
          </button>
        ) : (
          // shadow/listen 行会自动推进，底部按钮仅作为兜底跳过
          <button
            onClick={() => { sfxPop(); setCurrentIdx((i) => i + 1); }}
            className="diary-btn diary-btn-primary"
            style={{ flex: 2 }}
            aria-label={t('diary.dlg.skipToNextAria', lang)}
          >
            {t('diary.dlg.skipNextLine', lang)} <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

interface LineProps {
  [k: string]: unknown;
  line: ToriDialogueLine;
  idx: number;
  day: number;
  isCurrent: boolean;
  pickedChoice?: number;
  isShadowed: boolean;
  onPick: (idx: number) => void;
  onShadow: () => void;
  onListenAdvance: () => void;
}

function DialogueLine({ line, day, isCurrent, pickedChoice, isShadowed, onPick, onShadow, onListenAdvance }: LineProps) {
  const { lang } = useLang();
  const isTori = line.speaker === 'tori';
  const isNpc = line.speaker === 'npc';
  const isInner = !!line.isInnerVoice;
  // 默认展开（罗马音+中文永远可见）；用户仍可点箭头折叠单行
  const [expanded, setExpanded] = useState<boolean>(true);

  const labelColor = isTori ? 'var(--diary-gold-deep)' : 'var(--diary-stamp-red)';
  const speakerName = isInner ? t('diary.dlg.inner', lang) : isTori ? t('diary.dlg.toriYou', lang) : isNpc ? line.npcName ?? t('diary.dlg.other', lang) : t('diary.dlg.you', lang);
  const source = `tori-diary-day-${day}`;

  // 内心独白：斜体灰色气泡，居中，折叠展开同普通行
  if (isInner) {
    return (
      <div className="diary-anim-fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ fontSize: 'var(--diary-text-xs)', color: 'var(--diary-ink-faint)', fontWeight: 600, marginBottom: 4, letterSpacing: '0.08em' }}>
          ✦ {t('diary.dlg.inner', lang)} ✦
        </span>
        <div style={{
          maxWidth: '85%',
          padding: '12px 16px',
          background: 'transparent',
          border: '1px dashed var(--diary-line-strong)',
          borderRadius: 'var(--diary-r-sm)',
          textAlign: 'left',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <div className="diary-ko" style={{ fontSize: 'var(--diary-text-xl)', flex: 1, minWidth: 0, overflowWrap: 'break-word', fontStyle: 'italic', color: 'var(--diary-ink-soft)' }}>
              <TappableText text={line.ko} source={source} />
            </div>
            <button
              onClick={() => setExpanded(v => !v)}
              aria-label={expanded ? t('diary.dlg.collapse', lang) : t('diary.dlg.expand', lang)}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 4, color: 'var(--diary-ink-faint)', display: 'inline-flex', transition: 'transform 0.2s', transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)', marginTop: 4 }}
            >
              <ChevronDown size={16} />
            </button>
          </div>
          {expanded && (
            <div className="diary-anim-fade-up" style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed var(--diary-line)' }}>
              <div className="diary-romaji" style={{ marginBottom: 4 }}>{line.hangul}</div>
              <div className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-soft)', marginBottom: 8, fontStyle: 'italic' }}>
                {line.zh}
              </div>
              <DiaryLineActions ko={line.ko} zh={line.zh} source={source} showRecord={true} />
            </div>
          )}
        </div>
        {isCurrent && (
          <button onClick={onListenAdvance} className="diary-btn diary-btn-ghost" style={{ marginTop: 8, padding: '5px 14px', fontSize: 'var(--diary-text-sm)' }}>
            {t('diary.dlg.continue', lang)}
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isTori ? 'flex-start' : 'flex-end',
      }}
      className="diary-anim-fade-up"
    >
      <span style={{ fontSize: 'var(--diary-text-xs)', color: labelColor, fontWeight: 700, marginBottom: 4, letterSpacing: '0.05em' }}>
        {speakerName}
      </span>

      <div
        className="diary-card-paper"
        style={{
          minWidth: 'min(280px, 85%)',
          maxWidth: '85%',
          padding: '14px 16px',
          background: isTori ? 'var(--diary-paper)' : 'var(--diary-paper-deep)',
          borderLeft: isTori ? '3px solid var(--diary-gold)' : '3px solid var(--diary-stamp-red)',
        }}
      >
        {/* 韩文 + 翻译（pick 行不显示韩文，需要思考） */}
        {line.practice !== 'pick' && (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <div className="diary-ko" style={{ fontSize: 'var(--diary-text-xl)', flex: 1, minWidth: 0, overflowWrap: 'break-word' }}>
                <TappableText text={line.ko} source={source} />
              </div>
              <button
                onClick={() => setExpanded((v) => !v)}
                aria-label={expanded ? t('diary.dlg.collapse', lang) : t('diary.dlg.expand', lang)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  padding: 4,
                  color: 'var(--diary-gold-deep)',
                  display: 'inline-flex',
                  transition: 'transform 0.2s',
                  transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                  marginTop: 4,
                }}
              >
                <ChevronDown size={16} />
              </button>
            </div>
            {expanded && (
              <div
                className="diary-anim-fade-up"
                style={{ marginTop: 8, paddingTop: 8, borderTop: '1px dashed var(--diary-line)' }}
              >
                <div className="diary-romaji" style={{ marginBottom: 4 }}>{line.hangul}</div>
                <div className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-soft)', marginBottom: 8 }}>
                  {line.zh}
                </div>
                <DiaryLineActions
                  ko={line.ko}
                  zh={line.zh}
                  source={source}
                  showRecord={true}
                />
              </div>
            )}
          </>
        )}

        {/* pick 行 */}
        {line.practice === 'pick' && (
          <>
            <div className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink)', marginBottom: 12 }}>
              <MessageCircle size={14} style={{ display: 'inline', marginRight: 6 }} />
              {line.zh}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {line.choices?.map((c, ci) => {
                const isPicked = pickedChoice === ci;
                const correctPicked =
                  pickedChoice !== undefined && line.choices?.[pickedChoice]?.correct === true;
                const showCorrect = correctPicked && c.correct;
                const showThisWrong = isPicked && !c.correct;
                const bg = showCorrect
                  ? 'rgba(94, 168, 134, 0.18)'
                  : showThisWrong
                    ? 'rgba(193, 78, 58, 0.14)'
                    : 'var(--diary-paper-deep)';
                const border = showCorrect
                  ? '1.5px solid var(--color-mint-strong)'
                  : showThisWrong
                    ? '1.5px solid var(--diary-stamp-red)'
                    : '1.5px solid var(--diary-line)';
                return (
                  <PickChoice
                    key={ci}
                    c={c}
                    ci={ci}
                    bg={bg}
                    border={border}
                    correctPicked={correctPicked}
                    onPick={onPick}
                  />
                );
              })}
            </div>
            {pickedChoice !== undefined && line.choices?.[pickedChoice]?.correct === false && (
              <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-stamp-red)', marginTop: 10 }}>
                {t('diary.dlg.tryAgain', lang)}
              </p>
            )}
          </>
        )}
      </div>

      {/* 行操作按钮 */}
      {isCurrent && (
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          {line.practice === 'listen' && (
            <button onClick={onListenAdvance} className="diary-btn diary-btn-ghost" style={{ padding: '6px 16px', fontSize: 'var(--diary-text-sm)' }}>
              {t('diary.dlg.listened', lang)}
            </button>
          )}
          {line.practice === 'shadow' && !isShadowed && (
            <ShadowRecordBlock ko={line.ko} onDone={onShadow} />
          )}
        </div>
      )}
    </div>
  );
}

function ShadowRecordBlock({ ko, onDone }: { ko: string; onDone: () => void }) {
  const { lang } = useLang();
  const [state, setState] = useState<'idle' | 'rec' | 'preview'>('idle');
  const [url, setUrl] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const recRef = useRef<AudioRecorder | null>(null);
  const playbackRef = useRef<HTMLAudioElement | null>(null);
  const supported = isRecordingSupported();

  useEffect(() => () => { if (url) revokeRecording(url); }, [url]);
  useEffect(() => () => {
    recRef.current?.cancel();
    if (playbackRef.current) { try { playbackRef.current.pause(); } catch { /* ignore */ } playbackRef.current = null; }
  }, []);

  const playOrig = () => speak(ko).catch(() => {});
  const playMine = () => {
    if (!url) return;
    if (playbackRef.current) { try { playbackRef.current.pause(); } catch { /* ignore */ } }
    const audio = new Audio(url);
    playbackRef.current = audio;
    audio.onended = () => { if (playbackRef.current === audio) playbackRef.current = null; };
    audio.play().catch(() => { if (playbackRef.current === audio) playbackRef.current = null; });
  };

  const start = async () => {
    // guard：重复点击（iOS 权限弹窗后 await 期间又被点）不再建实例导致 recRef 覆盖
    if (recRef.current || state !== 'idle') return;
    setErr(null);
    const r = new AudioRecorder(15000);
    recRef.current = r;
    const res = await r.start();
    if (res.error) { const parsed = parseErrorKey(res.error); setErr(t(parsed.key, lang, parsed.params)); recRef.current = null; return; }
    setState('rec');
  };

  const stop = async () => {
    const r = recRef.current;
    recRef.current = null;
    if (!r) { setErr(t('diary.dlg.recError', lang)); setState('idle'); return; }
    const res = await r.stop();
    if (res && res.blob.size > 0) {
      setUrl(res.url);
      setState('preview');
    } else {
      setErr(t('diary.dlg.noSound', lang));
      setState('idle');
    }
  };

  const retry = () => {
    if (url) revokeRecording(url);
    setUrl(null);
    setErr(null);
    setState('idle');
  };

  return (
    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <button onClick={playOrig} className="diary-btn diary-btn-ghost" style={{ padding: '5px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
          <Volume2 size={12} /> {t('diary.dlg.playOriginal', lang)}
        </button>
        {supported && state === 'idle' && (
          <button onClick={start} className="diary-btn diary-btn-ghost" style={{ padding: '5px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Mic size={12} /> {t('diary.dlg.startShadow', lang)}
          </button>
        )}
        {state === 'rec' && (
          <button onClick={stop} style={{ padding: '5px 12px', fontSize: 12, background: 'var(--diary-stamp-red)', color: '#fff', border: 'none', borderRadius: 'var(--diary-r-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Square size={10} fill="currentColor" /> {t('diary.dlg.stop', lang)}
          </button>
        )}
      </div>
      {err && (
        <span className="diary-handwriting-zh" style={{ fontSize: 11, color: 'var(--diary-stamp-red)' }}>{err}</span>
      )}
      {state === 'preview' && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={playMine} className="diary-btn diary-btn-ghost" style={{ padding: '5px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Play size={12} /> {t('diary.dlg.playMine', lang)}
          </button>
          <button onClick={playOrig} className="diary-btn diary-btn-ghost" style={{ padding: '5px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Volume2 size={12} /> {t('diary.dlg.playOriginal', lang)}
          </button>
          <button onClick={retry} className="diary-btn diary-btn-ghost" style={{ padding: '5px 10px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            <RotateCcw size={11} /> {t('diary.dlg.redo', lang)}
          </button>
          <button onClick={onDone} className="diary-btn diary-btn-primary" style={{ padding: '5px 14px', fontSize: 12 }}>
            {t('diary.dlg.done', lang)}
          </button>
        </div>
      )}
      {state !== 'preview' && (
        <button onClick={onDone} style={{ fontSize: 11, color: 'var(--diary-ink-faint)', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
          {t('diary.dlg.skipShadow', lang)}
        </button>
      )}
    </div>
  );
}

function PickChoice({
  c, ci, bg, border, correctPicked, onPick,
}: {
  c: KoZhChoice;
  ci: number;
  bg: string;
  border: string;
  correctPicked: boolean;
  onPick: (ci: number) => void;
}) {
  const { lang } = useLang();
  const [manualShowZh, setManualShowZh] = useState(false);
  const showZh = correctPicked || manualShowZh;
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => !correctPicked && onPick(ci)}
        disabled={correctPicked}
        style={{
          width: '100%', padding: '10px 44px 10px 14px',
          background: bg, border, borderRadius: 'var(--diary-r-sm)',
          cursor: correctPicked ? 'default' : 'pointer',
          textAlign: 'left', transition: 'all 0.15s',
        }}
      >
        <div className="diary-ko" style={{ fontSize: 'var(--diary-text-md)' }}>{c.ko}</div>
        {showZh && (
          <div className="diary-handwriting-zh diary-anim-fade-up" style={{ fontSize: 'var(--diary-text-sm)', color: 'var(--diary-ink-soft)', marginTop: 3 }}>
            {c.zh}
          </div>
        )}
      </button>
      {!correctPicked && (
        <button
          onClick={e => { e.stopPropagation(); setManualShowZh(v => !v); }}
          title={manualShowZh ? t('diary.dlg.hideTranslation', lang) : t('diary.dlg.showTranslation', lang)}
          style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            border: '1px solid var(--diary-line)', borderRadius: 4,
            background: 'var(--diary-paper)', padding: '2px 6px',
            fontSize: 10, color: 'var(--diary-ink-faint)', cursor: 'pointer',
            fontFamily: 'var(--diary-v4-serif)', letterSpacing: '0.03em',
          }}
        >
          {manualShowZh ? t('diary.dlg.transToggleOn', lang) : t('diary.dlg.transToggle', lang)}
        </button>
      )}
    </div>
  );
}
