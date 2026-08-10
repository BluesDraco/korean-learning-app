'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Send,
  Check,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  Trophy,
  Sparkles,
  Star,
  Mic,
  Square,
  Play,
  Pause,
  LogIn,
  Volume2,
  ChevronDown,
  PlusCircle,
} from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { KoreanKeyboard } from '@/components/KoreanKeyboard';
import { useIsDesktop } from '@/lib/useIsMobile';
import { scenarios, type ScenarioData, type ChatMessage } from '@/data/aiScenarios';
import { speak } from '@/lib/tts';
import { detectMimeType, isRecordingSupported } from '@/lib/audio/recorder';
import { KoreanSpeechRecognizer, isSpeechRecognitionSupported } from '@/lib/audio/speechRecognition';
import { db } from '@/lib/db';

// ── Helpers ──────────────────────────────────────────────────────

function genId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

const levelLabel: Record<ScenarioData['level'], string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
};

const levelColor: Record<ScenarioData['level'], string> = {
  beginner: 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]',
  intermediate: 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]',
  advanced: 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]',
};

// ── Main Page Component ──────────────────────────────────────────

export default function AIChatPage() {
  const { user, loading } = useAuth();
  const [phase, setPhase] = useState<'selecting' | 'chatting' | 'finished'>('selecting');
  const [scenario, setScenario] = useState<ScenarioData | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const isProcessingRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showChinese, setShowChinese] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});
  const [savedWords, setSavedWords] = useState<Record<string, boolean>>({});
  const [sttSupported, setSttSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const recognizerRef = useRef<KoreanSpeechRecognizer | null>(null);
  const isDesktop = useIsDesktop();
  const [viewportOffset, setViewportOffset] = useState(0);

  // Handle mobile keyboard via visualViewport API
  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;
    const handleResize = () => {
      const vv = window.visualViewport!;
      const offset = window.innerHeight - vv.height;
      setViewportOffset(offset > 0 ? offset : 0);
    };
    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleResize);
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.visualViewport?.removeEventListener('scroll', handleResize);
    };
  }, []);

  // Detect STT support on client
  useEffect(() => {
    setSttSupported(isSpeechRecognitionSupported());
  }, []);

  // Abort STT on unmount
  useEffect(() => {
    return () => {
      recognizerRef.current?.abort();
    };
  }, []);

  // ── STT handlers ────────────────────────────────────────────
  const startListening = useCallback(() => {
    if (!sttSupported) return;
    const recognizer = new KoreanSpeechRecognizer();
    recognizerRef.current = recognizer;
    recognizer
      .onInterim((text) => setInterimText(text))
      .onFinal((text) => {
        setInterimText('');
        setIsListening(false);
        recognizerRef.current = null;
        if (text) setInputValue((prev) => (prev ? prev + ' ' + text : text));
        inputRef.current?.focus();
      })
      .onError((reason) => {
        setInterimText('');
        setIsListening(false);
        recognizerRef.current = null;
        if (reason === 'denied') {
          alert('麦克风权限未开启，请在浏览器设置中允许后重试');
        } else if (reason === 'network') {
          alert('语音识别需要网络连接，请检查网络后重试');
        }
      });
    recognizer.start();
    setIsListening(true);
  }, [sttSupported]);

  const stopListening = useCallback(() => {
    const interim = interimText;
    recognizerRef.current?.stop();
    recognizerRef.current = null;
    setIsListening(false);
    setInterimText('');
    if (interim) {
      setInputValue((prev) => (prev ? prev + ' ' + interim : interim));
    }
  }, [interimText]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat starts
  useEffect(() => {
    if (phase === 'chatting') {
      inputRef.current?.focus();
    }
  }, [phase]);

  // ── Select scenario ─────────────────────────────────────────
  const handleSelectScenario = useCallback((s: ScenarioData) => {
    setScenario(s);
    setMessages([
      {
        id: genId(),
        sender: 'ai',
        text: s.opening.ko,
        hint: s.opening.zh,
      },
    ]);
    setCurrentStep(0);
    setIsTyping(false);
    isProcessingRef.current = false;
    setPhase('chatting');
  }, []);

  // ── Send message ────────────────────────────────────────────
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const handleSend = useCallback(async () => {
    if (!scenario) return;
    const text = inputValue.trim();
    if (!text || isProcessingRef.current || isTyping || isListening) return;

    isProcessingRef.current = true;
    setInputValue('');
    setShowHints(false);

    const userMsg: ChatMessage = {
      id: genId(),
      sender: 'user',
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    const context = messagesRef.current.map((m) => ({
      role: m.sender,
      content: m.text,
    }));

    try {
      fetch('/api/track/study', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'ai_chat', details: `AI对话: ${scenario.nameZh}`, xpEarned: 0 }) }).catch(() => {});
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: { nameZh: scenario.nameZh, nameKo: scenario.nameKo, level: scenario.level },
          context,
          userMessage: text,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsg.id ? { ...m, feedback: data.feedback } : m,
          ),
        );
        setIsTyping(false);

        await new Promise((r) => setTimeout(r, 800));
        const step = currentStep;
        const aiKo = data.aiResponse.ko;
        setMessages((prev) => [
          ...prev,
          {
            id: genId(),
            sender: 'ai',
            text: aiKo,
            hint: data.aiResponse.zh,
          },
        ]);
        speak(aiKo, 0.85);
        setCurrentStep(step + 1);

        if (step + 1 >= scenario.exchanges.length) {
          await new Promise((r) => setTimeout(r, 500));
          setMessages((prev) =>
            prev.some((m) => m.text === scenario.closing.ko)
              ? prev
              : [...prev, { id: genId(), sender: 'ai', text: scenario.closing.ko, hint: scenario.closing.zh }]
          );
          setPhase('finished');
        }
      } else {
        throw new Error('API failed');
      }
    } catch {
      // Fallback to hardcoded mock
      await new Promise((r) => setTimeout(r, 1200));
      const step = currentStep;
      const exchange = scenario.exchanges[step];
      if (exchange) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsg.id ? { ...m, feedback: exchange.feedback } : m,
          ),
        );
      }
      setIsTyping(false);

      await new Promise((r) => setTimeout(r, 1000));
      if (step < scenario.exchanges.length) {
        const nextAi = scenario.exchanges[step].ai;
        setMessages((prev) => [
          ...prev,
          { id: genId(), sender: 'ai', text: nextAi.ko, hint: nextAi.zh },
        ]);
        speak(nextAi.ko, 0.85);
        setCurrentStep(step + 1);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: genId(), sender: 'ai', text: scenario.closing.ko, hint: scenario.closing.zh },
        ]);
        setPhase('finished');
      }
    }
    isProcessingRef.current = false;
    inputRef.current?.focus();
  }, [inputValue, scenario, currentStep, isTyping]);

  // ── End conversation early ──────────────────────────────────
  const handleEndConversation = useCallback(() => {
    if (!scenario) return;
    if (isProcessingRef.current || isListening) return;

    // Append closing message if not already there
    setMessages((prev) => {
      const lastMsg = prev[prev.length - 1];
      if (lastMsg?.text === scenario.closing.ko) return prev;
      return [
        ...prev,
        {
          id: genId(),
          sender: 'ai' as const,
          text: scenario.closing.ko,
          hint: scenario.closing.zh,
        },
      ];
    });
    setPhase('finished');
  }, [scenario, isListening]);

  // ── Play again / Back ───────────────────────────────────────
  const handlePlayAgain = useCallback(() => {
    if (!scenario) return;
    recognizerRef.current?.abort();
    recognizerRef.current = null;
    setIsListening(false);
    setInterimText('');
    setShowFeedback({});
    setSavedWords({});
    handleSelectScenario(scenario);
  }, [scenario, handleSelectScenario]);

  const handleBackToScenarios = useCallback(() => {
    recognizerRef.current?.abort();
    recognizerRef.current = null;
    setIsListening(false);
    setInterimText('');
    setShowFeedback({});
    setSavedWords({});
    setPhase('selecting');
    setScenario(null);
    setMessages([]);
    setCurrentStep(0);
    setInputValue('');
    setIsTyping(false);
    isProcessingRef.current = false;
  }, []);

  // ── Recording ──────────────────────────────────────────────
  const startRecording = useCallback(async () => {
    if (!isRecordingSupported()) {
      alert('您的浏览器不支持录音功能，请使用 Safari 或 Chrome 最新版本');
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = detectMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const actualType = recorder.mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: actualType });
        const url = URL.createObjectURL(blob);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(url);
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setIsRecording(true);
      setAudioUrl(null);
    } catch {
      alert('无法访问麦克风，请在浏览器设置中允许麦克风权限后重试');
    }
  }, [audioUrl]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  }, []);

  const togglePlayback = useCallback(() => {
    if (!audioRef.current || !audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [isPlaying, audioUrl]);

  useEffect(() => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    audio.onended = () => setIsPlaying(false);
    audio.onplay = () => setIsPlaying(true);
    audio.onpause = () => setIsPlaying(false);
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioUrl]);

  // ── Handle Enter key ────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  // ── Handle input auto-resize ────────────────────────────────
  const handleInput = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }, []);

  // ── Completed exchanges for stats ───────────────────────────
  const completedExchanges = currentStep;

  // ── Auth guard ────────────────────────────────────────────────
  if (!loading && !user) {
    return (
      <div className="py-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">情景对话</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            选择情景，开启沉浸式韩语对话练习
          </p>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 text-center max-w-md mx-auto">
          <div className="text-5xl mb-4">🐰</div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">需要登录才能使用AI对话</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            登录后可使用DeepSeek AI进行实时韩语情景对话，获得发音纠正和语法反馈
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/auth/login?redirect=/ai/chat"
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

        {/* Show scenarios as teaser (read-only) */}
        <div className="mt-8 opacity-40 pointer-events-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {scenarios.slice(0, 4).map((s) => (
              <div key={s.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
                <div className="text-3xl mb-3">{s.emoji}</div>
                <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-tight mb-1">{s.nameZh}</h3>
                <p className="text-xs text-[var(--text-muted)]">{s.nameKo}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-[var(--text-muted)]">加载中...</p>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // PHASE 1: Scenario Selection
  // ═══════════════════════════════════════════════════════════════
  if (phase === 'selecting') {
    return (
      <div className="py-4 space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">情景对话</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            选择情景，开启沉浸式韩语对话练习
          </p>
        </div>

        {/* Scenario Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectScenario(s)}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-left hover:border-[var(--pink-primary)]/40 hover:shadow-[var(--shadow-md)] hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Emoji */}
              <div className="text-3xl mb-3">{s.emoji}</div>

              {/* Name */}
              <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-tight mb-1">
                {s.nameZh}
              </h3>
              <p className="text-xs text-[var(--text-muted)] mb-3">
                {s.nameKo}
              </p>

              {/* Badges */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-[13px] px-2 py-0.5 rounded-full font-medium ${levelColor[s.level]}`}
                >
                  {levelLabel[s.level]}
                </span>
                <span className="text-[13px] text-[var(--text-muted)]">
                  ~{s.turns}轮
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Empty state hint */}
        <div className="text-center py-8">
          <div className="text-4xl mb-3">💬</div>
          <p className="text-sm text-[var(--text-secondary)]">
            选择一个情景开始对话练习
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            每次对话结束后，新词汇将自动加入你的单词库
          </p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // PHASE 2: Chat Interface
  // ═══════════════════════════════════════════════════════════════
  if (!scenario) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--text-secondary)]">未选择情景</p>
        <button
          onClick={handleBackToScenarios}
          className="mt-3 text-sm text-[var(--pink-primary)] hover:text-[var(--pink-primary)] transition-colors"
        >
          返回选择
        </button>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-[calc(100dvh-7rem)] md:h-[calc(100dvh-5rem)] -mx-3 md:-mx-4 lg:-mx-8"
      style={{ paddingBottom: viewportOffset > 0 ? `${viewportOffset}px` : undefined }}
    >
      {/* ── Chat Header ──────────────────────────────────────── */}
      <div className="shrink-0 flex items-center justify-between px-4 py-3 bg-[var(--bg-card)] border-b border-[var(--border-color)] shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleBackToScenarios}
            className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
            title="返回场景"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xl">{scenario.emoji}</span>
              <span className="font-semibold text-[var(--text-primary)] truncate text-sm">
                {scenario.nameZh}
              </span>
              <span
                className={`text-[13px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${levelColor[scenario.level]}`}
              >
                {levelLabel[scenario.level]}
              </span>
            </div>
            <p className="text-[13px] text-[var(--text-muted)] ml-7">
              {scenario.nameKo}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {phase === 'chatting' && (
            <button
              onClick={() => setShowChinese(!showChinese)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                showChinese
                  ? 'bg-[var(--pink-primary)]/10 border-[var(--pink-primary)]/30 text-[var(--pink-primary)]'
                  : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--pink-primary)]/30 hover:text-[var(--pink-primary)]'
              }`}
            >
              显示中文
            </button>
          )}
          {phase === 'chatting' && (
            <button
              onClick={handleEndConversation}
              disabled={isListening}
              className="shrink-0 text-xs px-3 py-1.5 rounded-lg border border-[var(--color-danger)]/30 text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              结束对话
            </button>
          )}
        </div>
      </div>

      {/* ── Messages Area ────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[var(--bg-primary)]">
        {messages.map((msg) => (
          <div key={msg.id}>
            {/* AI message */}
            {msg.sender === 'ai' && (
              <div className="flex gap-2 max-w-[85%] animate-slide-up">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--purple-soft)]/15 flex items-center justify-center text-sm mt-0.5">
                  {scenario.emoji}
                </div>
                <div>
                  <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                      {msg.text}
                    </p>
                    {msg.hint && showChinese && (
                      <p className="text-xs text-[var(--text-muted)] mt-1.5 pt-1.5 border-t border-[var(--border-color)]">
                        {msg.hint}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => speak(msg.text, 0.85)}
                    className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors mt-1 ml-1"
                  >
                    <Volume2 size={12} />
                    听发音
                  </button>
                </div>
              </div>
            )}

            {/* User message + feedback */}
            {msg.sender === 'user' && (
              <div className="flex flex-col items-end max-w-[85%] ml-auto animate-slide-up">
                <div className="bg-[var(--pink-primary)]/12 border border-[var(--pink-primary)]/20 rounded-2xl rounded-tr-sm px-4 py-3">
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                    {msg.text}
                  </p>
                </div>
                <button
                  onClick={() => speak(msg.text, 0.85)}
                  className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors mt-1 mr-1"
                >
                  <Volume2 size={12} />
                  听发音
                </button>

                {/* Feedback toggle + card */}
                {msg.feedback && (
                  <div className="mt-1 w-full">
                    <button
                      onClick={() => setShowFeedback((prev) => ({ ...prev, [msg.id]: !prev[msg.id] }))}
                      className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors mr-1 ml-auto"
                    >
                      <ChevronDown size={12} className={`transition-transform ${showFeedback[msg.id] ? 'rotate-180' : ''}`} />
                      {showFeedback[msg.id] ? '收起反馈' : '查看反馈'}
                    </button>

                    {showFeedback[msg.id] && (
                      <div className="mt-1.5 w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 space-y-2.5 animate-slide-up shadow-sm">
                        {/* Natural */}
                        <div className="flex items-start gap-2 text-xs">
                          <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                          <p className="text-[var(--text-secondary)]">{msg.feedback.natural}</p>
                        </div>

                        {/* Grammar error with highlight */}
                        {msg.feedback.wrongPart && (
                          <div className="flex items-start gap-2 text-xs">
                            <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="line-through text-red-400 font-medium">{msg.feedback.wrongPart}</span>
                                <span className="text-[var(--text-muted)]">→</span>
                                <span className="text-emerald-500 font-medium">{msg.feedback.correctPart}</span>
                              </div>
                              <p className="text-[var(--text-secondary)]">{msg.feedback.grammarError}</p>
                            </div>
                          </div>
                        )}
                        {!msg.feedback.wrongPart && msg.feedback.grammarError && (
                          <div className="flex items-start gap-2 text-xs">
                            <AlertTriangle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[var(--text-secondary)]">{msg.feedback.grammarError}</p>
                          </div>
                        )}

                        {/* Better way */}
                        <div className="flex items-start gap-2 text-xs">
                          <Lightbulb size={14} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
                          <p className="text-[var(--text-secondary)]">{msg.feedback.betterWay}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2 max-w-[85%] animate-slide-up">
            <div className="shrink-0 w-8 h-8 rounded-full bg-[var(--purple-soft)]/15 flex items-center justify-center text-sm animate-wiggle">
              🐰
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)]">토리 생각 중...</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--purple-soft)]/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--purple-soft)]/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--purple-soft)]/60 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        {/* End-of-conversation stats */}
        {phase === 'finished' && (
          <div className="space-y-4 animate-slide-up">
            {/* Stats card */}
            <div className="bg-[var(--bg-card)] border-2 border-[var(--pink-primary)]/20 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Trophy size={20} className="text-[var(--peach-soft)]" />
                <span className="font-bold text-[var(--text-primary)]">
                  对话完成！
                </span>
                <Sparkles size={16} className="text-[var(--purple-soft)]" />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[var(--mint-soft)]/8 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-[var(--mint-soft)]">
                    {scenario.newWords.length}
                  </div>
                  <div className="text-[13px] text-[var(--text-muted)] mt-1">新词数量</div>
                </div>
                <div className="bg-[var(--peach-soft)]/8 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-[var(--peach-soft)]">
                    {Math.min(scenario.grammarErrors, completedExchanges + 1)}
                  </div>
                  <div className="text-[13px] text-[var(--text-muted)] mt-1">语法错误</div>
                </div>
                <div className="bg-[var(--pink-primary)]/8 rounded-xl p-3 text-center">
                  <div className="text-2xl font-bold text-[var(--pink-primary)]">+20</div>
                  <div className="text-[13px] text-[var(--text-muted)] mt-1">本次 XP</div>
                </div>
              </div>

              {/* New words notice */}
              <div className="flex items-center gap-2 bg-[var(--purple-soft)]/5 border border-[var(--purple-soft)]/10 rounded-lg px-3 py-2">
                <Star size={14} className="text-[var(--purple-soft)] shrink-0" />
                <p className="text-xs text-[var(--text-secondary)]">
                  新词已自动加入单词库
                </p>
              </div>

              {/* Grammar error recap */}
              {(() => {
                const errors = messages.filter(
                  (m) => m.sender === 'user' && m.feedback?.wrongPart && m.feedback?.correctPart
                );
                return (
                  <div className="space-y-2">
                    <p className="text-[13px] font-semibold text-[var(--text-primary)]">语法错误复盘</p>
                    {errors.length === 0 ? (
                      <p className="text-xs text-emerald-500">本次对话无语法错误 🎉</p>
                    ) : (
                      errors.map((m) => (
                        <div key={m.id} className="flex items-start justify-between gap-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl p-3">
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap text-xs">
                              <span className="line-through text-red-400 font-medium">{m.feedback!.wrongPart}</span>
                              <span className="text-[var(--text-muted)]">→</span>
                              <span className="text-emerald-500 font-medium">{m.feedback!.correctPart}</span>
                            </div>
                            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{m.feedback!.grammarError}</p>
                          </div>
                          <button
                            disabled={savedWords[m.id]}
                            onClick={async () => {
                              if (savedWords[m.id]) return;
                              try {
                                await db.words.add({
                                  id: crypto.randomUUID(),
                                  word: m.feedback!.correctPart!,
                                  pronunciation: '',
                                  meaning: m.feedback!.grammarError,
                                  partOfSpeech: '',
                                  examples: [],
                                  source: 'ai_chat',
                                  mastery: 'new',
                                  srsLevel: 0,
                                  nextReview: Date.now(),
                                  easeFactor: 2.5,
                                  interval: 1,
                                  correctCount: 0,
                                  wrongCount: 0,
                                  createdAt: Date.now(),
                                  lastReviewed: null,
                                });
                                setSavedWords((prev) => ({ ...prev, [m.id]: true }));
                              } catch {
                                // save failed — do not mark as saved
                              }
                            }}
                            className={`shrink-0 flex items-center gap-1 text-[11px] px-2 py-1 rounded-lg border transition-colors ${
                              savedWords[m.id]
                                ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5 cursor-default'
                                : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--pink-primary)]/40 hover:text-[var(--pink-primary)]'
                            }`}
                          >
                            {savedWords[m.id] ? <Check size={11} /> : <PlusCircle size={11} />}
                            {savedWords[m.id] ? '已收录' : '收录'}
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                );
              })()}

              {/* New words list */}
              <div className="flex flex-wrap gap-1.5">
                {scenario.newWords.map((w) => (
                  <span
                    key={w}
                    className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePlayAgain}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-white font-medium text-sm transition-colors"
              >
                <Sparkles size={16} />
                再来一轮
              </button>
              <button
                onClick={handleBackToScenarios}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--pink-primary)]/30 text-[var(--text-primary)] font-medium text-sm transition-colors"
              >
                <ArrowLeft size={16} />
                返回场景
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ──────────────────────────────────────────── */}
      {phase === 'chatting' && (
        <div className="shrink-0 bg-[var(--bg-card)] border-t border-[var(--border-color)] px-4 py-3">
          {/* Hints bottom drawer */}
          {showHints && (() => {
            const hintsIndex = currentStep > 0 ? currentStep - 1 : 0;
            const activeHints = scenario.exchanges[Math.min(hintsIndex, scenario.exchanges.length - 1)]?.hints;
            if (!activeHints) return null;
            return (
              <div className="mb-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl p-4 animate-slide-up-drawer shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb size={16} className="text-[var(--peach-soft)]" />
                    <span className="text-sm font-semibold text-[var(--text-primary)]">回答参考方向</span>
                  </div>
                  <button
                    onClick={() => setShowHints(false)}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/></svg>
                  </button>
                </div>
                <div className="space-y-2">
                  {activeHints.map((hint, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInputValue(hint.ko);
                        setShowHints(false);
                        inputRef.current?.focus();
                      }}
                      className="w-full text-left bg-[var(--bg-card)] hover:bg-[var(--bg-accent)] border border-[var(--border-color)] hover:border-[var(--pink-primary)]/30 rounded-xl p-3 transition-all group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">
                          {hint.label}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{hint.ko}</p>
                      {showChinese && <p className="text-xs text-[var(--text-muted)] mt-0.5">{hint.zh}</p>}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Audio playback */}
          {audioUrl && (
            <div className="flex items-center gap-2 mb-2 px-1">
              <button
                onClick={togglePlayback}
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isPlaying
                    ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
                    : 'bg-[var(--bg-input)] text-[var(--text-secondary)] hover:bg-[var(--pink-primary)]/10 hover:text-[var(--pink-primary)]'
                }`}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <div className="flex-1 h-1.5 bg-[var(--bg-input)] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${isPlaying ? 'bg-[var(--pink-primary)] animate-pulse' : 'bg-[var(--purple-soft)]/40'}`}
                  style={{ width: isPlaying ? '100%' : '0%' }}
                />
              </div>
              <span className="text-[11px] text-[var(--text-muted)] shrink-0">
                {isPlaying ? '播放中...' : '录音回放'}
              </span>
            </div>
          )}

          <div className="flex items-end gap-2 max-w-2xl mx-auto">
            {/* Mic button — STT if supported, else recorder */}
            {sttSupported ? (
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isTyping || isProcessingRef.current}
                className={`shrink-0 p-2.5 rounded-xl transition-all ${
                  isListening
                    ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)] animate-pulse'
                    : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/10'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isListening ? '停止识别' : '语音输入（韩语）'}
              >
                {isListening ? <Square size={18} /> : <Mic size={18} />}
              </button>
            ) : (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTyping || isProcessingRef.current}
                className={`shrink-0 p-2.5 rounded-xl transition-all ${
                  isRecording
                    ? 'bg-[var(--color-danger)]/15 text-[var(--color-danger)] animate-pulse'
                    : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/10'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isRecording ? '停止录音' : '录音'}
              >
                {isRecording ? <Square size={18} /> : <Mic size={18} />}
              </button>
            )}

            {/* Hints button */}
            <button
              onClick={() => setShowHints(!showHints)}
              disabled={isTyping || isProcessingRef.current || isListening}
              className={`shrink-0 p-2.5 rounded-xl transition-all ${
                showHints
                  ? 'bg-[var(--peach-soft)]/15 text-[var(--peach-soft)]'
                  : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--peach-soft)] hover:bg-[var(--peach-soft)]/10'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="回答参考"
            >
              <Lightbulb size={18} />
            </button>

            <textarea
              ref={inputRef}
              value={isListening && interimText ? inputValue + interimText : inputValue}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? '正在听...' : '用韩语输入你的回复... Enter发送'}
              rows={1}
              disabled={isTyping || isProcessingRef.current || isListening}
              className="flex-1 resize-none bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:border-[var(--pink-primary)]/50 focus:ring-1 focus:ring-[var(--pink-primary)]/25 disabled:opacity-50"
              style={{ maxHeight: '120px' }}
            />
            {isDesktop && (
              <button
                type="button"
                onClick={() => setShowKeyboard(!showKeyboard)}
                className={`shrink-0 p-2.5 rounded-xl transition-colors text-sm font-medium ${showKeyboard ? 'bg-[var(--pink-primary)]/20 text-[var(--pink-primary)]' : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--pink-primary)]'}`}
                title="韩文键盘"
              >한</button>
            )}
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping || isProcessingRef.current || isListening}
              className="shrink-0 p-2.5 rounded-xl bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] disabled:bg-[var(--bg-accent)] disabled:text-[var(--text-muted)] text-white transition-colors"
            >
              <Send size={18} />
            </button>
          </div>

          {/* Hint text */}
          <p className="text-center text-[13px] text-[var(--text-muted)] mt-2">
            Enter 发送 · Shift+Enter 换行 · 建议开启系统韩语键盘
          </p>
          {isDesktop && (
            <KoreanKeyboard value={inputValue} onChange={setInputValue} visible={showKeyboard} onClose={() => setShowKeyboard(false)} />
          )}
        </div>
      )}

      {/* Finished input area (disabled state) */}
      {phase === 'finished' && (
        <div className="shrink-0 bg-[var(--bg-card)] border-t border-[var(--border-color)] px-4 py-3">
          <p className="text-center text-sm text-[var(--text-muted)]">
            对话已结束。选择"再来一轮"或"返回场景"。
          </p>
        </div>
      )}
    </div>
  );
}
