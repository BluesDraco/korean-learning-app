'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  ArrowLeft, Mic, MicOff, Volume2, VolumeX, Languages,
  Lightbulb, Send, ChevronRight, AlertCircle, LogIn,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { KoreanKeyboard } from '@/components/KoreanKeyboard';
import { useAuth } from '@/components/AuthProvider';
import { speak, cancelSpeech } from '@/lib/tts';

// ── Types ────────────────────────────────────────────────────────

interface ChatMsg {
  id: string;
  sender: 'user' | 'tori';
  ko: string;
  zh?: string;
  correction?: string | null;
}

interface TopicSuggestion {
  emoji: string;
  label: string;
  prompt: string;
}

// ── Topic suggestions for empty state ────────────────────────────

const topics: TopicSuggestion[] = [
  { emoji: '👋', label: '自我介绍', prompt: '안녕하세요! 저는 한국어를 배우고 있어요.' },
  { emoji: '🍜', label: '韩国美食', prompt: '한국 음식 중에 뭐가 제일 맛있어요?' },
  { emoji: '🎬', label: '韩剧推荐', prompt: '요즘 재미있는 한국 드라마 있어요?' },
  { emoji: '✈️', label: '去韩国旅行', prompt: '한국 여행 가면 어디에 가야 돼요?' },
  { emoji: '☀️', label: '今天天气', prompt: '오늘 날씨 어때요?' },
  { emoji: '🎵', label: 'K-pop', prompt: '토리는 어떤 K-pop 좋아해요?' },
];

// ── Helpers ──────────────────────────────────────────────────────

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

// ── Speech Recognition wrapper ───────────────────────────────────

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

function createRecognition(lang: string): any {
  const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Ctor) return null;
  const r = new Ctor();
  r.lang = lang;
  r.interimResults = true;
  r.continuous = true;
  return r;
}

// ═══════════════════════════════════════════════════════════════════
// Voice Chat Page
// ═══════════════════════════════════════════════════════════════════

export default function VoiceChatPage() {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showChinese, setShowChinese] = useState(true);
  const [autoTTS, setAutoTTS] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [error, setError] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);

  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef('');
  const isProcessingRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // Check speech recognition support
  useEffect(() => {
    const r = createRecognition('ko-KR');
    if (!r) setSpeechSupported(false);
  }, []);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, interimText, isThinking]);

  // ── TTS ──────────────────────────────────────────────────────
  const speakKorean = useCallback((text: string) => {
    if (!autoTTS) return;
    speak(text, 0.85);
  }, [autoTTS]);

  // ── Send message to AI ───────────────────────────────────────
  const sendToAI = useCallback(async (userText: string) => {
    if (!userText.trim() || isProcessingRef.current) return;
    isProcessingRef.current = true;

    const userMsg: ChatMsg = {
      id: genId(),
      sender: 'user',
      ko: userText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);
    setError('');

    try {
      fetch('/api/track/study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'voice_chat', details: '语音对话', xpEarned: 5 }),
      }).catch(() => {});

      const context = messagesRef.current.map((m) => ({
        role: m.sender === 'tori' ? 'ai' : 'user',
        content: m.ko,
      }));

      const res = await fetch('/api/ai/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context, userMessage: userText }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();

      const toriMsg: ChatMsg = {
        id: genId(),
        sender: 'tori',
        ko: data.ko,
        zh: data.zh,
        correction: data.correction,
      };
      setMessages((prev) => [...prev, toriMsg]);
      speakKorean(data.ko);
    } catch (err: any) {
      setError(err.message || '网络错误，请重试');
    } finally {
      setIsThinking(false);
      isProcessingRef.current = false;
    }
  }, [speakKorean]);

  // ── Speech Recognition ───────────────────────────────────────
  const startRecording = useCallback(() => {
    if (isProcessingRef.current) return;
    const r = createRecognition('ko-KR');
    if (!r) {
      setSpeechSupported(false);
      return;
    }
    recognitionRef.current = r;
    finalTranscriptRef.current = '';
    setInterimText('');
    setError('');

    r.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscriptRef.current += result[0].transcript + ' ';
        } else {
          interim += result[0].transcript;
        }
      }
      setInterimText(finalTranscriptRef.current + interim);
    };

    r.onerror = (event: any) => {
      if (event.error === 'no-speech' || event.error === 'aborted') return;
      setError(`语音识别错误: ${event.error}`);
      setIsRecording(false);
    };

    r.onend = () => {
      // onend fires automatically after silence. We handle restart in the
      // recording state effect below if user hasn't released the button.
    };

    try {
      r.start();
      setIsRecording(true);
    } catch {
      // Already started
    }
  }, []);

  const stopRecording = useCallback(() => {
    const r = recognitionRef.current;
    if (r) {
      r.onresult = null;
      r.onerror = null;
      r.onend = null;
      try { r.stop(); } catch {}
      recognitionRef.current = null;
    }
    setIsRecording(false);

    const final = finalTranscriptRef.current.trim();
    setInterimText('');
    if (final) {
      sendToAI(final);
    }
  }, [sendToAI]);

  // Restart recognition if it auto-stops while user is still holding
  useEffect(() => {
    if (!isRecording) return;
    const r = recognitionRef.current;
    if (!r) return;

    const restartIfNeeded = () => {
      if (!isRecording || !recognitionRef.current) return;
      try { recognitionRef.current.start(); } catch {}
    };

    r.onend = restartIfNeeded;
    return () => { r.onend = null; };
  }, [isRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const r = recognitionRef.current;
      if (r) {
        r.onresult = null;
        r.onerror = null;
        r.onend = null;
        try { r.stop(); } catch {}
      }
      cancelSpeech();
    };
  }, []);

  // Auto-resize textarea when textInput changes (e.g. from keyboard)
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 100) + 'px';
  }, [textInput]);

  // ── Text input send ──────────────────────────────────────────
  const handleTextSend = useCallback(() => {
    const text = textInput.trim();
    if (!text || isProcessingRef.current) return;
    setTextInput('');
    sendToAI(text);
  }, [textInput, sendToAI]);

  // ── Topic suggestion click ───────────────────────────────────
  const handleTopic = useCallback((prompt: string) => {
    sendToAI(prompt);
  }, [sendToAI]);

  // ── Clear conversation ───────────────────────────────────────
  const handleClear = useCallback(() => {
    cancelSpeech();
    setMessages([]);
    setInterimText('');
    setError('');
  }, []);

  // ═══════════════════════════════════════════════════════════════
  // Render
  // ═══════════════════════════════════════════════════════════════

  const hasMessages = messages.length > 0;

  // ── Auth guard ────────────────────────────────────────────────
  if (!loading && !user) {
    return (
      <div className="flex flex-col h-[calc(100vh-5rem)] -mx-3 md:-mx-5 lg:-mx-8">
        <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-[var(--bg-card)] border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <Link href="/ai" className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xl">🐰</span>
              <h1 className="text-base font-bold text-[var(--text-primary)]">语音对话</h1>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 text-center max-w-md mx-4">
            <div className="text-5xl mb-4">🎤</div>
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">需要登录才能使用语音对话</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              登录后可与AI进行实时韩语语音对话，获得发音纠正和语法反馈
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/auth/login?redirect=/ai/voice"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <LogIn size={16} />
                登录
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-xl text-sm font-medium hover:border-[var(--pink-primary)]/30 transition-colors"
              >
                注册
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col h-[calc(100vh-5rem)] -mx-3 md:-mx-5 lg:-mx-8">
        <div className="shrink-0 flex items-center px-4 py-3 bg-[var(--bg-card)] border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <Link href="/ai" className="p-1.5 rounded-lg text-[var(--text-muted)]">
              <ArrowLeft size={20} />
            </Link>
            <span className="text-xl">🐰</span>
            <h1 className="text-base font-bold text-[var(--text-primary)]">语音对话</h1>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-[var(--text-muted)]">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] -mx-3 md:-mx-5 lg:-mx-8">
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-[var(--bg-card)] border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          <Link
            href="/ai"
            className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl">🐰</span>
            <div>
              <h1 className="text-base font-bold text-[var(--text-primary)]">语音对话</h1>
              <p className="text-xs text-[var(--text-muted)]">음성 대화</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Toggle Chinese */}
          <button
            onClick={() => setShowChinese(!showChinese)}
            className={`p-2 rounded-lg transition-colors text-xs ${
              showChinese
                ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
            }`}
            title={showChinese ? '隐藏中文' : '显示中文'}
          >
            <Languages size={16} />
          </button>

          {/* Toggle auto-TTS */}
          <button
            onClick={() => setAutoTTS(!autoTTS)}
            className={`p-2 rounded-lg transition-colors ${
              autoTTS
                ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
            }`}
            title={autoTTS ? '自动朗读: 开' : '自动朗读: 关'}
          >
            {autoTTS ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Clear */}
          {hasMessages && (
            <button
              onClick={handleClear}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] transition-colors text-xs"
              title="清空对话"
            >
              清空
            </button>
          )}
        </div>
      </div>

      {/* ── Chat Area ────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[var(--bg-primary)]">
        {/* Empty state */}
        {!hasMessages && !isThinking && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
            {/* Tori greeting */}
            <div className="text-center space-y-3">
              <div className="relative inline-block">
                <Image
                  src="/images/tori-poses/tori-pose-01.png"
                  alt="Tori"
                  width={80}
                  height={80}
                  className="object-contain mx-auto"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[var(--mint-soft)] border-2 border-[var(--bg-primary)]" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                来和 토리 聊天吧！
              </h2>
              <p className="text-sm text-[var(--text-muted)] max-w-xs mx-auto leading-relaxed">
                按住话筒对我说韩语，我会用韩语回复你～<br />
                说错了也没关系，我会帮你纠正！
              </p>
            </div>

            {/* Topic suggestions */}
            <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
              {topics.map((t) => (
                <button
                  key={t.label}
                  onClick={() => handleTopic(t.prompt)}
                  disabled={isProcessingRef.current}
                  className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-3.5 py-2.5 text-left hover:border-[var(--pink-primary)]/30 hover:shadow-sm transition-all disabled:opacity-50"
                >
                  <span className="text-lg shrink-0">{t.emoji}</span>
                  <span className="text-sm text-[var(--text-primary)]">{t.label}</span>
                </button>
              ))}
            </div>

            {/* Keyboard toggle hint */}
            <button
              onClick={() => setShowKeyboard(!showKeyboard)}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors flex items-center gap-1"
            >
              <Send size={12} />
              {showKeyboard ? '收起键盘' : '不想说话？用键盘输入'}
            </button>
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 max-w-[88%] animate-slide-up ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm mt-1 ${
              msg.sender === 'tori'
                ? 'bg-[var(--pink-primary)]/15'
                : 'bg-[var(--purple-soft)]/15'
            }`}>
              {msg.sender === 'tori' ? '🐰' : '🙋'}
            </div>

            {/* Bubble */}
            <div className="space-y-1.5 min-w-0">
              <div
                className={`rounded-2xl px-4 py-3 shadow-sm ${
                  msg.sender === 'tori'
                    ? 'bg-[var(--bg-card)] border border-[var(--border-color)] rounded-tl-sm'
                    : 'bg-[var(--pink-primary)]/12 border border-[var(--pink-primary)]/20 rounded-tr-sm'
                }`}
              >
                <p className="text-sm text-[var(--text-primary)] leading-relaxed font-[var(--font-korean)]">
                  {msg.ko}
                </p>
                {msg.zh && showChinese && (
                  <p className="text-xs text-[var(--text-muted)] mt-1.5 pt-1.5 border-t border-[var(--border-color)]">
                    {msg.zh}
                  </p>
                )}
              </div>

              {/* Correction card */}
              {msg.correction && showChinese && (
                <div className="flex items-start gap-1.5 bg-[var(--peach-soft)]/8 border border-[var(--peach-soft)]/20 rounded-xl px-3 py-2 text-xs">
                  <Lightbulb size={12} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                  <span className="text-[var(--text-secondary)]">{msg.correction}</span>
                </div>
              )}

              {/* Speak button for Tori messages */}
              {msg.sender === 'tori' && (
                <button
                  onClick={() => speak(msg.ko, 0.85)}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors flex items-center gap-1 ml-1"
                >
                  <Volume2 size={11} />
                  再听一遍
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Thinking indicator */}
        {isThinking && (
          <div className="flex gap-2.5 max-w-[85%] animate-slide-up">
            <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--pink-primary)]/15 flex items-center justify-center text-sm">
              🐰
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)]">토리 正在想...</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink-primary)]/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink-primary)]/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink-primary)]/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* Error toast */}
        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-sm text-red-500 animate-slide-up">
            <AlertCircle size={14} />
            {error}
            <button
              onClick={() => setError('')}
              className="ml-auto text-red-500/60 hover:text-red-500 text-xs"
            >
              关闭
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Bottom Input Area ─────────────────────────────────── */}
      <div className="shrink-0 bg-[var(--bg-card)] border-t border-[var(--border-color)] px-4 py-4 space-y-3">
        {/* Speech not supported warning */}
        {!speechSupported && (
          <div className="flex items-center gap-2 bg-amber-500/8 border border-amber-500/20 rounded-xl px-4 py-3 text-sm text-amber-600 dark:text-amber-400">
            <AlertCircle size={16} />
            <div>
              <p className="font-medium">语音识别不可用</p>
              <p className="text-xs mt-0.5 text-amber-500">请使用 Chrome 或 Edge 浏览器。如已使用但仍不可用，可能是网络限制导致（语音识别依赖 Google 服务）。</p>
            </div>
          </div>
        )}

        {/* Interim recognition text */}
        {interimText && (
          <div className="text-center">
            <span className="text-sm text-[var(--text-muted)] italic animate-pulse">
              {interimText}
            </span>
          </div>
        )}

        {/* Hold-to-talk mic button */}
        <div className="flex items-center justify-center">
          <button
            onMouseDown={speechSupported ? startRecording : undefined}
            onMouseUp={speechSupported ? stopRecording : undefined}
            onMouseLeave={isRecording ? stopRecording : undefined}
            onTouchStart={speechSupported ? startRecording : undefined}
            onTouchEnd={speechSupported ? stopRecording : undefined}
            disabled={isThinking || isProcessingRef.current}
            className={`relative select-none flex items-center justify-center gap-2 rounded-full font-bold text-base transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
              isRecording
                ? 'w-20 h-20 bg-red-500 text-white shadow-lg shadow-red-500/30 scale-110'
                : 'w-20 h-20 bg-[var(--pink-primary)] text-white shadow-lg shadow-[var(--pink-primary)]/25 hover:shadow-xl hover:shadow-[var(--pink-primary)]/35'
            }`}
            title={speechSupported ? (isRecording ? '松开发送' : '按住说话') : '语音识别不可用，请使用键盘'}
          >
            {isRecording ? (
              <MicOff size={28} className="animate-pulse" />
            ) : (
              <Mic size={28} />
            )}
          </button>
        </div>

        <p className="text-center text-xs text-[var(--text-muted)]">
          {speechSupported
            ? (isRecording ? '松开发送 · 说韩语' : isThinking ? '토리 正在回复...' : '按住话筒说话 · 松开发送')
            : '语音识别不可用 · 请使用键盘输入'}
        </p>

        {/* Keyboard toggle + text input */}
        <div className="space-y-2">
          <button
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={`w-full text-xs flex items-center justify-center gap-1 py-1.5 rounded-lg transition-colors ${
              showKeyboard
                ? 'text-[var(--pink-primary)] bg-[var(--pink-primary)]/5'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Send size={12} />
            {showKeyboard ? '收起键盘' : '打字输入'}
            <ChevronRight size={12} className={`transition-transform ${showKeyboard ? 'rotate-90' : ''}`} />
          </button>

          {showKeyboard && (
            <div className="space-y-2">
              <div className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  value={textInput}
                  onChange={(e) => {
                    setTextInput(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleTextSend();
                    }
                  }}
                  placeholder="输入韩语..."
                  rows={1}
                  disabled={isThinking || isProcessingRef.current}
                  className="flex-1 resize-none bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-[var(--text-placeholder)] focus:outline-none focus:border-[var(--pink-primary)]/50 disabled:opacity-50"
                  style={{ maxHeight: '100px' }}
                />
                <button
                  onClick={handleTextSend}
                  disabled={!textInput.trim() || isThinking || isProcessingRef.current}
                  className="shrink-0 p-2.5 rounded-xl bg-[var(--pink-primary)] text-white hover:opacity-90 disabled:opacity-40 transition-opacity"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        <KoreanKeyboard
          value={textInput}
          onChange={setTextInput}
          visible={showKeyboard}
          onClose={() => setShowKeyboard(false)}
        />
      </div>
    </div>
  );
}
