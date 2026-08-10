'use client';

// 实时语音对话覆盖层 —— 呼吸·极简沉浸。
// 没有聊天气泡列表：中央一颗随状态呼吸/变色的有机光晕 orb，下方单行焦点字幕（角色的韩语，可点词）。
// 用户上一句以极小字安静浮在焦点上方；纠错收进一个可展开的软卡片，不打断沉浸。
// orb 本身即控制键（点开始/停）—— iOS 音频解锁在 start() 同步栈内完成。
// 纠错/新词落库复用现有 db 结构，与 handleSend 保持一致。

import { useCallback, useEffect, useRef, useState } from 'react';
import { X, Mic } from 'lucide-react';
import './voiceOverlay.css';
import { db } from '@/lib/db';
import { stripParticle } from '@/lib/koreanParticles';
import { getSpeechRate } from '@/lib/tts';
import { TappableText } from '@/components/TappableText';
import { useRealtimeVoice, type VoiceMeta } from '@/lib/audio/useRealtimeVoice';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  open: boolean;
  onClose: () => void;
  systemHint: string;
  sceneSlug: string;
  sceneCn: string;
  sceneKo: string;
  sceneLevel: string;
  npcName: string;                    // 当前场景对话角色名（非「兔莉」）
  npcEmoji?: string;
  currentTaskLabel?: string | null;   // 当前引导任务（可选，透传给纠错链路判定 taskCompleted）
  onTaskCompleted?: () => void;
}

// orb 下方状态：韩语为主词（沉浸），中文走 i18n t()。speaking 的中文在渲染时按角色名填充。
const STATE_COPY: Record<string, { ko: string }> = {
  idle: { ko: '준비됐어요' },
  loading: { ko: '잠시만요' },
  listening: { ko: '듣고 있어요' },
  thinking: { ko: '음…' },
  speaking: { ko: '말하는 중' },
};

const VOICE_KEY = 'tori-voice-gender';

export function VoiceModeOverlay({
  open, onClose, systemHint, sceneSlug, sceneCn, sceneKo, sceneLevel, npcName, npcEmoji, currentTaskLabel, onTaskCompleted,
}: Props) {
  const { lang } = useLang();
  const [toast, setToast] = useState<string | null>(null);
  const [showFix, setShowFix] = useState(false);
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>('female');
  // 兔莉当前这句的翻译：{ text: 被翻译的原句, zh: 译文 }。切到新一句时按 text 比对自动失效。
  const [trans, setTrans] = useState<{ text: string; zh: string } | null>(null);
  const [transLoading, setTransLoading] = useState(false);

  // 恢复上次选择
  useEffect(() => {
    try {
      const v = localStorage.getItem(VOICE_KEY);
      if (v === 'male' || v === 'female') setVoiceGender(v);
    } catch { /* ignore */ }
  }, []);

  const voiceGenderRef = useRef<'male' | 'female'>('female');
  voiceGenderRef.current = voiceGender;

  const pickVoice = useCallback((g: 'male' | 'female') => {
    setVoiceGender(g);
    try { localStorage.setItem(VOICE_KEY, g); } catch { /* ignore */ }
  }, []);
  // 每个 user 气泡序号 → 该轮元数据（纠错等）
  const [metaByMsg, setMetaByMsg] = useState<Record<number, VoiceMeta>>({});
  const taskCbRef = useRef(onTaskCompleted);
  taskCbRef.current = onTaskCompleted;

  const showToast = useCallback((m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2400);
  }, []);

  // 纠错 & 新词落库（与 handleSend 逻辑一致）
  const persistMeta = useCallback((userText: string, meta: VoiceMeta | null) => {
    if (!meta) return;
    const fb = meta.feedback;
    if (fb?.wrongPart && fb.wrongPart !== fb.correctPart) {
      db.aiChatMistakes.add({
        id: crypto.randomUUID(),
        scenarioId: sceneSlug,
        scenarioName: sceneCn,
        userInput: userText,
        wrongPart: fb.wrongPart,
        correctPart: fb.correctPart || '',
        grammarError: fb.grammarError || '',
        reviewed: 0,
        createdAt: Date.now(),
      }).catch(e => console.error('[VoiceModeOverlay] aiChatMistakes.add failed', e));
    }
    if (meta.newWords?.length) {
      for (const w of meta.newWords) {
        if (!w?.ko) continue;
        db.words.add({
          id: crypto.randomUUID(),
          word: stripParticle(w.ko),
          pronunciation: '',
          meaning: w.zh || '',
          partOfSpeech: w.partOfSpeech || '',
          examples: [],
          source: 'practice-scene',
          sourceDetail: sceneCn,
          mastery: 'new' as const,
          srsLevel: 0,
          nextReview: Date.now(),
          easeFactor: 2.5,
          interval: 1,
          createdAt: Date.now(),
          lastReviewed: null,
        }).catch(e => console.error('[VoiceModeOverlay] db.words.add failed', e));
      }
    }
    if (meta.taskCompleted) taskCbRef.current?.();
  }, [sceneSlug, sceneCn]);

  // 追踪本会话已 push 的 user 气泡数，用于把纠错 meta 对齐到对应轮
  const userMsgCountRef = useRef(0);

  // 纠错链路：并行调 /api/ai/chat（强制 JSON，稳定），拿 feedback/newWords/任务
  const fetchCorrection = useCallback(async (userText: string, context: { role: string; content: string }[], userBubbleIdx: number) => {
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          scenario: { nameZh: sceneCn, nameKo: sceneKo, level: sceneLevel, systemHint },
          context,
          userMessage: userText,
          currentTask: currentTaskLabel
            ? { label: currentTaskLabel, hint: currentTaskLabel }
            : null,
        }),
      });
      if (!res.ok) return;
      const data = await res.json();
      const meta: VoiceMeta = {
        feedback: data.feedback,
        newWords: data.newWords,
        taskCompleted: data.taskCompleted,
      };
      persistMeta(userText, meta);
      setMetaByMsg((prev) => ({ ...prev, [userBubbleIdx]: meta }));
    } catch { /* 纠错失败静默，不影响对话流 */ }
  }, [sceneCn, sceneKo, sceneLevel, systemHint, currentTaskLabel, persistMeta]);

  const voice = useRealtimeVoice({
    systemHint,
    getRate: () => getSpeechRate(),
    getVoice: () => voiceGenderRef.current,
    onUserFinal: (text, context) => {
      const idx = userMsgCountRef.current;
      userMsgCountRef.current += 1;
      setShowFix(false); // 新一轮，收起上一条纠错
      void fetchCorrection(text, context.map((m) => ({ role: m.role, content: m.content })), idx);
    },
    onError: showToast,
  });

  const { state, messages, start, stop, prewarm } = voice;

  // 打开时预热 VAD 模块（省点 orb 后的等待）；关闭时停 VAD 并重置
  useEffect(() => {
    if (open) {
      prewarm();
    } else {
      stop();
      userMsgCountRef.current = 0;
      setMetaByMsg({});
      setShowFix(false);
      setTrans(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = () => { stop(); onClose(); };

  // 翻译兔莉当前这句。已翻过（同一句）直接切换显示/隐藏，避免重复请求。
  const handleTranslate = useCallback(async (text: string) => {
    if (!text) return;
    if (trans?.text === text) { setTrans(null); return; } // 再点收起
    setTransLoading(true);
    try {
      const res = await fetch('/api/dict/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ text }),
      });
      if (!res.ok) { showToast(t('voice.translate_failed', lang)); return; }
      const data = await res.json();
      if (data.translation) setTrans({ text, zh: data.translation });
      else showToast(t('voice.translate_failed', lang));
    } catch {
      showToast(t('voice.translate_failed', lang));
    } finally {
      setTransLoading(false);
    }
  }, [trans, showToast, lang]);

  if (!open) return null;

  // 从对话流里取「当前焦点」：兔莉最新一句（大字焦点）+ 用户最新一句（小字回声）
  const userMsgs = messages.filter((m) => m.role === 'user');
  const aiMsgs = messages.filter((m) => m.role === 'ai');
  const lastUser = userMsgs[userMsgs.length - 1]?.content ?? '';
  const lastAi = aiMsgs[aiMsgs.length - 1]?.content ?? '';
  const lastUserSeq = userMsgs.length - 1;
  const meta = lastUserSeq >= 0 ? metaByMsg[lastUserSeq] : undefined;
  const fb = meta?.feedback;
  const hasFix = !!fb && !!(fb.wrongPart || fb.grammarError || fb.betterWay || fb.natural);

  const baseCopy = STATE_COPY[state] ?? STATE_COPY.idle;
  const stateCn = state === 'speaking'
    ? t('voice.state_speaking', lang, { name: npcName })
    : t(`voice.state_${state in STATE_COPY ? state : 'idle'}`, lang);
  const copy = { ko: baseCopy.ko, cn: stateCn };
  const started = messages.length > 0 || state !== 'idle';

  return (
    <div className="vmode-overlay" data-state={state}>
      <button className="vmode-x" onClick={handleClose} aria-label={t('voice.close', lang)}><X size={20} /></button>
      <span className="vmode-scene">{npcEmoji ? `${npcEmoji} ` : ''}{npcName} · {sceneCn}</span>

      {/* 音色切换：女声 / 男声，随选随生效（下一句起） */}
      <div className="vmode-voice" role="radiogroup" aria-label={t('voice.pick_voice', lang)}>
        <button
          className="vmode-voice-opt"
          data-on={voiceGender === 'female'}
          role="radio"
          aria-checked={voiceGender === 'female'}
          onClick={() => pickVoice('female')}
        >
          여 {t('voice.female', lang)}
        </button>
        <button
          className="vmode-voice-opt"
          data-on={voiceGender === 'male'}
          role="radio"
          aria-checked={voiceGender === 'male'}
          onClick={() => pickVoice('male')}
        >
          남 {t('voice.male', lang)}
        </button>
      </div>

      {/* orb —— 有机光晕，随状态呼吸/变色，点击开始或停止 */}
      <div className="vmode-orb-wrap">
        <button
          className="vmode-orb"
          data-state={state}
          onClick={() => { if (state === 'idle') void start(); else stop(); }}
          disabled={state === 'loading'}
          aria-label={state === 'idle' ? t('voice.orb_start', lang) : t('voice.orb_stop', lang)}
        >
          <span className="vmode-orb-core" />
          {state === 'idle' && <Mic className="vmode-orb-mic" size={30} />}
        </button>
      </div>

      {/* 焦点字幕：兔莉最新一句大字（可点词），用户上一句小字安静浮上方 */}
      <div className="vmode-focus">
        {!started ? (
          <p className="vmode-teach">
            {t('voice.teach_line1', lang)}<br />
            {t('voice.teach_line2', lang, { name: npcName })}<br />
            <span className="vmode-teach-dim">{t('voice.teach_line3', lang, { name: npcName })}</span>
          </p>
        ) : (
          <>
            {lastUser && (
              <div className="vmode-echo">
                <span className="vmode-echo-text">{lastUser}</span>
                {hasFix && (
                  <button className="vmode-fix-chip" onClick={() => setShowFix((v) => !v)} aria-expanded={showFix}>
                    {showFix ? t('voice.fix_collapse', lang) : '고쳐보기'}
                  </button>
                )}
                <div className="vmode-fix-panel" data-open={showFix && hasFix}>
                  <div className="vmode-fix-inner">
                    {fb?.natural && <div className="vmode-fix-row">📝 {fb.natural}</div>}
                    {fb?.grammarError && <div className="vmode-fix-row">⚠️ {fb.grammarError}</div>}
                    {fb?.wrongPart && fb?.correctPart && (
                      <div className="vmode-fix-row">
                        <span className="vmode-fix-wrong">{fb.wrongPart}</span>
                        {' → '}
                        <span className="vmode-fix-right">{fb.correctPart}</span>
                      </div>
                    )}
                    {fb?.betterWay && (
                      <div className="vmode-fix-row">
                        💡 {fb.betterWay}
                        {fb.betterWayZh && <span className="vmode-fix-zh">（{fb.betterWayZh}）</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="vmode-hero" key={aiMsgs.length}>
              {lastAi
                ? <TappableText text={lastAi} source={`voice-${sceneSlug}`} />
                : <span className="vmode-hero-wait">…</span>}
            </div>
            {/* 翻译：仅当兔莉这句已说完（非流式中）显示按钮，点开在下方展开译文 */}
            {lastAi && state !== 'speaking' && state !== 'thinking' && (
              <div className="vmode-trans">
                <button
                  className="vmode-fix-chip"
                  onClick={() => handleTranslate(lastAi)}
                  disabled={transLoading}
                  aria-expanded={trans?.text === lastAi}
                >
                  {transLoading
                    ? t('voice.translate_loading', lang)
                    : trans?.text === lastAi
                      ? t('voice.fix_collapse', lang)
                      : t('voice.translate', lang)}
                </button>
                <div className="vmode-trans-panel" data-open={trans?.text === lastAi}>
                  <div className="vmode-trans-inner">{trans?.zh}</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* 极简状态：韩语主词 + 中文极小辅助 */}
      <div className="vmode-state">
        <span className="vmode-state-ko">{copy.ko}</span>
        <span className="vmode-state-cn">{copy.cn}</span>
      </div>

      {toast && <div className="vmode-toast">{toast}</div>}
    </div>
  );
}
