'use client';

// 专属陪练独立聊天页。桌面双栏（左联系人列表 + 右聊天详情），手机全屏单聊。
// 复用 /api/ai/chat（韩语回复+纠错）、错题/新词落库、TappableText 点词、WordbookPanel 生词本、
// VoiceModeOverlay 语音、/api/practice/session 会话持久化。system prompt 走 companionPrompt。

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/db';
import { speak, speakWord, cancelSpeech } from '@/lib/tts';
import { stripParticle } from '@/lib/koreanParticles';
import { getSceneCastById } from '@/data/sceneCast';
import { buildCompanionSystemHint, type CompanionDifficulty } from '@/lib/companionPrompt';
import { TappableText } from '@/components/TappableText';
import { WordbookPanel } from '@/components/practice/WordbookPanel';
import { VoiceModeOverlay } from '@/components/practice/VoiceModeOverlay';
import { VoiceBubble } from '@/components/practice/VoiceBubble';
import { useMicRecorder, type MicResultMeta } from '@/lib/audio/useMicRecorder';
import { putVoice } from '@/lib/audio/voiceStore';
import { Phone, Keyboard } from 'lucide-react';
import { FloatingKoreanKeyboard } from '@/components/FloatingKoreanKeyboard';
import { useIsDesktop } from '@/lib/useIsMobile';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import './companion.css';

interface ChatMessage {
  id: string;
  role: 'npc' | 'user' | 'divider';
  ko: string;
  cn?: string;
  feedback?: { natural?: string; grammarError?: string; wrongPart?: string; correctPart?: string; betterWay?: string; betterWayZh?: string };
  suggestion?: { ko: string; zh: string };  // NPC 消息附带的「建议回应句」
  voice?: { durationMs: number };  // 语音消息：音频本体在本地 IDB(按 id 存)，此处只留时长元数据
  error?: boolean;
}

interface CompanionData {
  id: string;
  companionName: string;
  companionNameZh: string;
  verbalTic: string;
  difficulty: CompanionDifficulty;
  characterId: string;
  avatarUrl: string;
  emoji: string;
  openingKo: string;
  openingZh: string;
}

interface ContactItem {
  id: string;
  companionName: string;
  avatarUrl: string;
  emoji: string;
  preview: string;
  mode?: string;
}

function genId() { return Math.random().toString(36).slice(2); }

function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((m): m is ChatMessage => {
    if (!m || typeof m !== 'object') return false;
    const o = m as Record<string, unknown>;
    return typeof o.id === 'string' && (o.role === 'npc' || o.role === 'user') && typeof o.ko === 'string';
  });
}

export default function CompanionChatPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { lang } = useLang();
  const isDesktop = useIsDesktop();
  const id = params?.id ?? '';

  // 返回动物城：能回同源上一页就回，否则回动物城地图（静态页，用 location.href）
  const backToCity = useCallback(() => {
    const canBack = typeof window !== 'undefined' && window.history.length > 1
      && (!document.referrer || new URL(document.referrer).origin === window.location.origin);
    if (canBack) router.back();
    else window.location.href = '/animal-city.html';
  }, [router]);

  const [companion, setCompanion] = useState<CompanionData | null>(null);
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [loadState, setLoadState] = useState<'loading' | 'ok' | 'fail'>('loading');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [wordbookOpen, setWordbookOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false); // 手机端联系人抽屉
  const [hintOpen, setHintOpen] = useState(false); // 「不知道怎么回」建议句展开
  const [openActionsId, setOpenActionsId] = useState<string | null>(null); // 点气泡展开的动作条（听/译/换说法）
  const [hiddenTranslations, setHiddenTranslations] = useState<Set<string>>(new Set()); // 被用户主动隐藏翻译的消息（翻译默认显示）
  const [rephrasingMsgId, setRephrasingMsgId] = useState<string | null>(null);
  const rephraseAbortRef = useRef<AbortController | null>(null);
  const [toast, setToast] = useState<string | null>(null); // 语音错误提示
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = useCallback((m: string) => {
    setToast(m);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const messagesRef = useRef<ChatMessage[]>([]);
  messagesRef.current = messages;
  const sendAbortRef = useRef<AbortController | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.replace(`/auth/login?redirect=/companion/${id}`);
  }, [user, authLoading, router, id]);

  // 加载当前陪练 + 联系人列表
  useEffect(() => {
    if (!user || !id) return;
    let cancelled = false;
    (async () => {
      setLoadState('loading');
      try {
        const res = await fetch(`/api/practice/custom/${encodeURIComponent(id)}`, { credentials: 'same-origin', cache: 'no-store' });
        if (!res.ok) throw new Error('not found');
        const d = await res.json();
        if (cancelled) return;
        if (d.mode !== 'free') { router.replace(`/practice/${id}`); return; }
        const cast = getSceneCastById(d.character_id || 'tori');
        const diff: CompanionDifficulty = ['beginner', 'intermediate', 'advanced'].includes(d.difficulty) ? d.difficulty : 'intermediate';
        setCompanion({
          id,
          companionName: d.companion_name || cast.nameKo,
          companionNameZh: d.companion_name_zh || '',
          verbalTic: d.verbal_tic || '',
          difficulty: diff,
          characterId: d.character_id || 'tori',
          avatarUrl: d.avatar_url || '',
          emoji: cast.emoji,
          openingKo: d.opening_ko || '안녕하세요!',
          openingZh: d.opening_zh || t('companion.default_opening', lang),
        });
        setLoadState('ok');
      } catch {
        if (!cancelled) setLoadState('fail');
      }
    })();
    // 联系人列表（所有 free 陪练）
    (async () => {
      try {
        const res = await fetch('/api/practice/custom', { credentials: 'same-origin', cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        const list: ContactItem[] = (Array.isArray(data.scenes) ? data.scenes : [])
          .filter((s: { mode?: string }) => s.mode === 'free')
          .map((s: { id: string; companionName?: string; title_ko?: string; icon?: string; avatarUrl?: string; preview?: string }) => ({
            id: s.id,
            companionName: s.companionName || s.title_ko || '나의 짝꿍',
            avatarUrl: s.avatarUrl || '',
            emoji: s.icon || '💛',
            preview: s.preview || '',
          }));
        setContacts(list);
      } catch { /* 列表失败不阻塞聊天 */ }
    })();
    return () => { cancelled = true; };
  }, [user, id, router]);

  // 恢复会话 / 注入开场白
  useEffect(() => {
    if (loadState !== 'ok' || !companion) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/practice/session?slug=${encodeURIComponent(id)}`, { credentials: 'same-origin', cache: 'no-store' });
        const d = res.ok ? await res.json() : {};
        if (cancelled) return;
        const restored = sanitizeMessages(d.messages);
        if (restored.length > 0) {
          setMessages(restored);
        } else {
          setMessages([{ id: genId(), role: 'npc', ko: companion.openingKo, cn: companion.openingZh }]);
        }
      } catch {
        if (!cancelled) setMessages([{ id: genId(), role: 'npc', ko: companion.openingKo, cn: companion.openingZh }]);
      }
    })();
    return () => { cancelled = true; };
  }, [loadState, companion, id]);

  // 滚到底
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // 会话保存（防抖）
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (loadState !== 'ok' || messages.length === 0) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      fetch('/api/practice/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ slug: id, messages, hasSent: true }),
      }).catch(e => console.error('[companion] session save failed', e));
    }, 700);
    return () => { if (saveTimerRef.current) clearTimeout(saveTimerRef.current); };
  }, [messages, loadState, id]);

  useEffect(() => () => { cancelSpeech(); sendAbortRef.current?.abort(); rephraseAbortRef.current?.abort(); }, []);

  const systemHint = companion
    ? buildCompanionSystemHint({
        companionName: companion.companionName,
        characterNameZh: getSceneCastById(companion.characterId).nameZh,
        verbalTic: companion.verbalTic,
        difficulty: companion.difficulty,
      })
    : '';

  const doSend = useCallback(async (text: string, retryFor?: string, voiceMeta?: { msgId: string; durationMs: number }) => {
    if (!companion || !text.trim() || isTyping) return;
    const trimmed = text.trim();
    let userMsgId = retryFor ?? '';
    if (!retryFor) {
      userMsgId = voiceMeta?.msgId ?? genId();
      const userMsg: ChatMessage = { id: userMsgId, role: 'user', ko: trimmed };
      if (voiceMeta) userMsg.voice = { durationMs: voiceMeta.durationMs };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
    }
    setIsTyping(true);

    const ctrl = new AbortController();
    sendAbortRef.current = ctrl;
    const timeoutId = setTimeout(() => ctrl.abort(), 30000);

    const context = messagesRef.current.map((m) => ({ role: m.role === 'npc' ? 'ai' : 'user', content: m.ko }));
    if (!retryFor) context.push({ role: 'user', content: trimmed });

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctrl.signal,
        credentials: 'same-origin',
        body: JSON.stringify({
          scenario: { nameZh: companion.companionNameZh || companion.companionName, nameKo: companion.companionName, level: companion.difficulty, systemHint },
          context,
          userMessage: trimmed,
          currentTask: null,
        }),
      });
      if (!res.ok) {
        if (res.status === 429) { setIsTyping(false); setMessages((prev) => prev.map((m) => m.id === userMsgId ? { ...m, error: true } : m)); return; }
        throw new Error('API failed');
      }
      const data = await res.json();

      // 错题落库
      if (data.feedback?.wrongPart && data.feedback.wrongPart !== data.feedback.correctPart) {
        db.aiChatMistakes.add({
          id: crypto.randomUUID(),
          scenarioId: id,
          scenarioName: companion.companionName,
          userInput: trimmed,
          wrongPart: data.feedback.wrongPart,
          correctPart: data.feedback.correctPart,
          grammarError: data.feedback.grammarError || '',
          reviewed: 0,
          createdAt: Date.now(),
        }).catch(e => console.error('[companion] db.aiChatMistakes.add failed', e));
      }
      // 新词落库
      if (data.newWords?.length) {
        for (const w of data.newWords) {
          db.words.add({
            id: crypto.randomUUID(),
            word: stripParticle(w.ko),
            pronunciation: '',
            meaning: w.zh,
            partOfSpeech: w.partOfSpeech || '',
            examples: [],
            source: 'companion-chat',
            sourceDetail: companion.companionName,
            mastery: 'new' as const,
            srsLevel: 0,
            nextReview: Date.now(),
            easeFactor: 2.5,
            interval: 1,
            createdAt: Date.now(),
            lastReviewed: null,
          }).catch(e => console.error('[companion] db.words.add failed', e));
        }
      }
      // 用户消息附 feedback
      if (data.feedback) {
        setMessages((prev) => prev.map((m) => m.id === userMsgId ? { ...m, feedback: data.feedback, error: false } : m));
      }
      await new Promise((r) => setTimeout(r, 400));
      const aiKo = data.aiResponse?.ko || '...';
      const aiCn = data.aiResponse?.zh || '';
      const sug = data.suggestion && data.suggestion.ko ? { ko: data.suggestion.ko, zh: data.suggestion.zh || '' } : undefined;
      setMessages((prev) => [...prev, { id: genId(), role: 'npc', ko: aiKo, cn: aiCn, suggestion: sug }]);
      setHintOpen(false);
      setIsTyping(false);
      speak(aiKo).catch(e => console.error('[companion] TTS speak failed', e));
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
      setIsTyping(false);
      setMessages((prev) => prev.map((m) => m.id === userMsgId ? { ...m, error: true } : m));
    } finally {
      clearTimeout(timeoutId);
      if (sendAbortRef.current === ctrl) sendAbortRef.current = null;
    }
  }, [companion, isTyping, systemHint, id]);

  // 换说法：追加一条更简单的同义 NPC 消息
  const handleRephrase = async (msgId: string, npcKo: string) => {
    if (!companion || rephrasingMsgId) return;
    if (rephraseAbortRef.current) rephraseAbortRef.current.abort();
    const ctrl = new AbortController();
    rephraseAbortRef.current = ctrl;
    setRephrasingMsgId(msgId);
    try {
      const context = messagesRef.current.map((m) => ({ role: m.role === 'npc' ? 'ai' : 'user', content: m.ko }));
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctrl.signal,
        credentials: 'same-origin',
        body: JSON.stringify({
          scenario: { nameZh: companion.companionNameZh || companion.companionName, nameKo: companion.companionName, level: companion.difficulty, systemHint },
          context,
          userMessage: '（换种简单说法）',
          rephraseOf: npcKo,
        }),
      });
      if (!res.ok) throw new Error('rephrase failed');
      const data = await res.json();
      const newKo = data.aiResponse?.ko;
      const newCn = data.aiResponse?.zh;
      if (newKo) {
        setMessages((prev) => {
          if (!prev.some((m) => m.id === msgId)) return prev;
          return [...prev, { id: genId(), role: 'npc', ko: newKo, cn: newCn ? `${t('practice.sc_rephrase_prefix', lang)}${newCn}` : t('practice.sc_rephrase_label', lang) }];
        });
        speak(newKo).catch(e => console.error('[companion] TTS speak rephrase failed', e));
      }
    } catch (err) {
      if ((err as { name?: string })?.name !== 'AbortError') showToast(t('practice.sc_rephrase_failed', lang));
    } finally {
      if (rephraseAbortRef.current === ctrl) rephraseAbortRef.current = null;
      setRephrasingMsgId(null);
    }
  };

  // 语音条：按住录音 → 转写韩语 → 存音频到本地 IDB → 作为语音消息发出
  const onVoiceResult = useCallback(async (text: string, meta?: MicResultMeta) => {
    if (!meta) { void doSend(text); return; }
    const msgId = genId();
    await putVoice(msgId, meta.wav);
    void doSend(text, undefined, { msgId, durationMs: meta.durationMs });
  }, [doSend]);
  const mic = useMicRecorder({ onResult: onVoiceResult, onError: showToast, minMs: 800, tooShortMsg: t('voice.too_short', lang) });

  if (authLoading || !user || loadState === 'loading') {
    return <div className="cmc-root cmc-center"><div className="cmc-loading">{t('companion.loading', lang)}</div></div>;
  }
  if (loadState === 'fail' || !companion) {
    return (
      <div className="cmc-root cmc-center">
        <div className="cmc-loading">{t('companion.not_found', lang)}</div>
        <button className="cmc-back-btn" onClick={backToCity}>← {t('companion.back_city', lang)}</button>
      </div>
    );
  }

  const cast = getSceneCastById(companion.characterId);
  const headerAvatar = companion.avatarUrl
    ? <img src={companion.avatarUrl} alt={companion.companionName} />
    : <span className="cmc-emoji">{companion.emoji || cast.emoji}</span>;

  return (
    <div className="cmc-root">
      {/* 手机端抽屉遮罩 */}
      {sideOpen && <div className="cmc-side-scrim" onClick={() => setSideOpen(false)} />}

      {/* 左栏：联系人列表（桌面常驻，手机抽屉） */}
      <aside className={`cmc-side${sideOpen ? ' open' : ''}`}>
        <div className="cmc-side-head">
          <button className="cmc-side-back" onClick={backToCity}>← {t('companion.back_city', lang)}</button>
          <div className="cmc-side-title">내 짝꿍 <small>My Companions</small></div>
        </div>
        <div className="cmc-side-list">
          {contacts.map((c) => (
            <button
              key={c.id}
              className={`cmc-contact${c.id === id ? ' on' : ''}`}
              onClick={() => { setSideOpen(false); if (c.id !== id) router.push(`/companion/${c.id}`); }}
            >
              <span className="cmc-c-avatar">
                {c.avatarUrl ? <img src={c.avatarUrl} alt={c.companionName} /> : <span className="cmc-emoji">{c.emoji}</span>}
              </span>
              <span className="cmc-c-body">
                <span className="cmc-c-name">{c.companionName}</span>
                {c.preview && <span className="cmc-c-preview">{c.preview}</span>}
              </span>
            </button>
          ))}
          <button className="cmc-c-new" onClick={() => { setSideOpen(false); router.push('/practice/custom/new?mode=free'); }}>
            <span className="cmc-c-new-plus">＋</span>
            <span className="cmc-c-new-txt"><b>{t('companion.new_title', lang)}</b><small>{t('companion.new_sub', lang)}</small></span>
          </button>
        </div>
      </aside>

      {/* 右栏：聊天详情 */}
      <div className="cmc-chat">
        <header className="cmc-topbar">
          <button className="cmc-tb-menu" onClick={() => setSideOpen(true)} aria-label={t('companion.contacts', lang)}>☰</button>
          <button className="cmc-tb-back" onClick={backToCity} aria-label={t('companion.back', lang)}>←</button>
          <span className="cmc-tb-avatar">{headerAvatar}</span>
          <div className="cmc-tb-meta">
            <div className="cmc-tb-name">{companion.companionName}<span className="cmc-tb-tag">{t('companion.fav_tag', lang)}</span></div>
            <div className="cmc-tb-status">{isTyping ? t('companion.typing', lang) : t('companion.online', lang)}</div>
          </div>
          <div className="cmc-tb-actions">
            <button className="cmc-tb-btn cmc-tb-call" onClick={() => setVoiceOpen(true)} title={t('voice.call', lang)} aria-label={t('voice.call', lang)}><Phone size={19} /></button>
            <button className="cmc-tb-btn" onClick={() => setWordbookOpen(true)} title={t('companion.wordbook', lang)}>📓</button>
            <button className="cmc-tb-btn" onClick={() => router.push('/daily')} title={t('companion.home', lang)}>🏠</button>
          </div>
        </header>

        <div className="cmc-msgs">
          <div className="cmc-msgs-inner">
            {messages.map((m, mi) => {
              if (m.role === 'user') {
                return (
                  <div key={m.id} className="cmc-block cmc-block-me">
                    <div className="cmc-msg cmc-msg-me">
                      <div className="cmc-bubble cmc-bubble-me">
                        {m.voice && <VoiceBubble msgId={m.id} durationMs={m.voice.durationMs} />}
                        {m.ko}
                      </div>
                    </div>
                    {m.error && (
                      <button className="cmc-retry" onClick={() => doSend(m.ko, m.id)}>{t('companion.retry', lang)}</button>
                    )}
                    {(() => {
                      const fb = m.feedback;
                      if (!fb) return null;
                      const hasError = !!(fb.wrongPart && fb.correctPart && fb.wrongPart !== fb.correctPart);
                      const hasBetter = !!(fb.betterWay && fb.betterWay.trim());
                      if (hasError) {
                        return (
                          <div className="cmc-corr">
                            <span className="cmc-corr-ico">✎</span>
                            <div className="cmc-corr-body">
                              <div className="cmc-corr-fix"><s>{fb.wrongPart}</s> → <b>{fb.correctPart}</b></div>
                              {fb.grammarError && <div className="cmc-corr-note">{fb.grammarError}</div>}
                              {hasBetter && (
                                <div className="cmc-corr-better">💡 {t('companion.more_natural', lang)}{fb.betterWay}{fb.betterWayZh ? `（${fb.betterWayZh}）` : ''}</div>
                              )}
                            </div>
                          </div>
                        );
                      }
                      // 无语法错：给自然度肯定 + 可选更地道说法
                      if ((fb.natural && fb.natural.trim()) || hasBetter) {
                        return (
                          <div className="cmc-corr cmc-corr-ok">
                            <span className="cmc-corr-ico">✓</span>
                            <div className="cmc-corr-body">
                              {fb.natural && fb.natural.trim() && <div className="cmc-corr-note">{fb.natural}</div>}
                              {hasBetter && (
                                <div className="cmc-corr-better">💡 {t('companion.more_natural', lang)}{fb.betterWay}{fb.betterWayZh ? `（${fb.betterWayZh}）` : ''}</div>
                              )}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                );
              }
              return (
                <div key={m.id} className="cmc-block cmc-block-npc">
                  <div className="cmc-msg cmc-msg-npc">
                    <span className="cmc-m-avatar">{headerAvatar}</span>
                    <div className="cmc-m-col">
                      <div className="cmc-m-sender">{companion.companionName}</div>
                      <div
                        className="cmc-bubble cmc-bubble-npc"
                        onClick={() => setOpenActionsId((cur) => (cur === m.id ? null : m.id))}
                      >
                        <TappableText text={m.ko} source="companion-chat" />
                        {m.cn && !hiddenTranslations.has(m.id) && <span className="cmc-b-cn">{m.cn}</span>}
                      </div>
                      {openActionsId === m.id && (
                        <div className="cmc-msg-actions">
                          <button onClick={() => speak(m.ko).catch(e => console.error('[companion] TTS listen failed', e))}>{t('practice.sc_msg_listen', lang)}</button>
                          {m.cn && (
                            <button onClick={() => setHiddenTranslations((prev) => { const next = new Set(prev); if (next.has(m.id)) next.delete(m.id); else next.add(m.id); return next; })}>
                              {hiddenTranslations.has(m.id) ? t('practice.sc_msg_translate', lang) : t('practice.sc_msg_hide', lang)}
                            </button>
                          )}
                          <button
                            className={rephrasingMsgId === m.id ? 'rephrasing' : ''}
                            onClick={() => handleRephrase(m.id, m.ko)}
                            disabled={rephrasingMsgId !== null}
                          >{rephrasingMsgId === m.id ? t('practice.sc_msg_generating', lang) : t('practice.sc_msg_rephrase', lang)}</button>
                        </div>
                      )}
                      {/* 对话指引：仅最后一条 NPC 消息、且不在输入中时显示 */}
                      {mi === messages.length - 1 && !isTyping && m.suggestion?.ko && (
                        hintOpen ? (
                          <div className="cmc-hint">
                            <div className="cmc-hint-label">💡 {t('companion.hint_label', lang)}</div>
                            <div className="cmc-hint-ko">
                              <span>{m.suggestion.ko}</span>
                              <button
                                type="button"
                                className="cmc-hint-speak"
                                onClick={() => speakWord(m.suggestion!.ko)}
                                aria-label={t('a11y.play_audio', lang)}
                              >🔊</button>
                            </div>
                            {m.suggestion.zh && <div className="cmc-hint-zh">{m.suggestion.zh}</div>}
                            <button className="cmc-hint-use" onClick={() => { setInput(m.suggestion!.ko); setHintOpen(false); }}>{t('companion.hint_use', lang)}</button>
                          </div>
                        ) : (
                          <button className="cmc-hint-toggle" onClick={() => setHintOpen(true)}>💡 {t('companion.hint_toggle', lang)}</button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {isTyping && (
              <div className="cmc-block cmc-block-npc">
                <div className="cmc-msg cmc-msg-npc">
                  <span className="cmc-m-avatar">{headerAvatar}</span>
                  <div className="cmc-bubble cmc-bubble-npc cmc-typing"><span></span><span></span><span></span></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="cmc-inputbar">
          <div className="cmc-inputbar-inner">
            <input
              className="cmc-field"
              value={input}
              maxLength={200}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing) doSend(input); }}
              placeholder={t('companion.input_ph', lang, { name: companion.companionName })}
            />
            {isDesktop && (
            <button
              className="cmc-mic"
              data-active={showKeyboard}
              onClick={() => setShowKeyboard((v) => !v)}
              aria-label={t('keyboard.toggle', lang)}
              title={t('keyboard.toggle', lang)}
            ><Keyboard size={18} strokeWidth={2} /></button>
            )}
            <button
              className="cmc-mic"
              data-recording={mic.state === 'recording'}
              disabled={isTyping || mic.state === 'recognizing'}
              onPointerDown={(e) => { e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); mic.start(); }}
              onPointerUp={(e) => { e.preventDefault(); mic.stop(); }}
              onContextMenu={(e) => e.preventDefault()}
              aria-label={t('voice.hold_to_talk', lang)}
              title={t('voice.hold_to_talk', lang)}
            >🎤</button>
            <button className="cmc-send" onClick={() => doSend(input)} disabled={!input.trim() || isTyping} aria-label={t('companion.send', lang)}>➤</button>
          </div>
        </div>
      </div>

      {isDesktop && <FloatingKoreanKeyboard value={input} onChange={setInput} visible={showKeyboard} onClose={() => setShowKeyboard(false)} onSend={() => doSend(input)} />}

      <WordbookPanel open={wordbookOpen} onClose={() => setWordbookOpen(false)} onPick={(ko) => { setInput((v) => v + ko); setWordbookOpen(false); }} />
      <VoiceModeOverlay
        open={voiceOpen}
        onClose={() => setVoiceOpen(false)}
        systemHint={systemHint}
        sceneSlug={id}
        sceneCn={companion.companionNameZh || companion.companionName}
        sceneKo={companion.companionName}
        sceneLevel={companion.difficulty}
        npcName={companion.companionName}
        npcEmoji={companion.emoji}
      />
      {toast && <div className="cmc-voice-toast">{toast}</div>}
    </div>
  );
}
