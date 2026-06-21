'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Send,
  Check,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  Sparkles,
  Mic,
  Square,
  Play,
  Pause,
  LogIn,
  Volume2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { KoreanKeyboard } from '@/components/KoreanKeyboard';
import { useIsDesktop } from '@/lib/useIsMobile';
import { scenarios, type ScenarioData, type ChatMessage } from '@/data/aiScenarios';
import { speak } from '@/lib/tts';
import { detectMimeType, isRecordingSupported } from '@/lib/audio/recorder';
import { KoreanSpeechRecognizer, isSpeechRecognitionSupported } from '@/lib/audio/speechRecognition';
import { db } from '@/lib/db';
import type { AiChatNewWord } from '@/types';

// ── GrammarMistakeCard ───────────────────────────────────────────

function GrammarMistakeCard({ msg, hasRealError }: { msg: ChatMessage; hasRealError: boolean }) {
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (saved || saving || !msg.feedback) return;
    setSaving(true);
    try {
      const word = msg.feedback.correctPart || msg.text;
      await db.words.add({
        id: crypto.randomUUID(),
        front: word,
        back: msg.feedback.grammarError || '',
        meaning: msg.feedback.grammarError || '',
        partOfSpeech: '',
        note: `来自AI对话纠错`,
        example: '',
        mastery: 'new' as const,
        srsLevel: 0,
        easeFactor: 2.5,
        interval: 1,
        nextReview: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        reviewCount: 0,
        correctCount: 0,
        incorrectCount: 0,
        tags: [],
        sourceType: 'manual' as const,
      } as any);
      setSaved(true);
    } catch {
      // already exists or other error — don't mark saved
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-3 py-2 text-xs space-y-1">
      {hasRealError && (
        <>
          <p className="text-[var(--text-muted)] line-through">{msg.feedback!.wrongPart}</p>
          <p className="text-[var(--mint-soft)]">→ {msg.feedback!.correctPart}</p>
        </>
      )}
      {msg.feedback!.grammarError && (
        <p className="text-[var(--text-secondary)]">{msg.feedback!.grammarError}</p>
      )}
      <button
        onClick={handleSave}
        disabled={saved || saving}
        className="mt-1 text-[11px] px-2 py-0.5 rounded-full border transition-colors"
        style={{
          borderColor: saved ? 'var(--mint-soft)' : 'var(--border-color)',
          color: saved ? 'var(--mint-soft)' : 'var(--text-muted)',
          background: 'transparent',
          cursor: saved ? 'default' : 'pointer',
        }}
      >
        {saved ? '✓ 已收录' : saving ? '收录中...' : '收录'}
      </button>
    </div>
  );
}

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

const categoryConfig = {
  daily: { label: '日常生活', color: 'var(--peach-soft)', emoji: '🌸' },
  kpop:  { label: '韩娱 KPOP', color: 'var(--pink-primary)', emoji: '💜' },
  study: { label: '学习场景', color: 'var(--purple-soft)', emoji: '📖' },
} as const;

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
  const recognizerRef = useRef<KoreanSpeechRecognizer | null>(null);
  const [useSpeechRecognition, setUseSpeechRecognition] = useState(false);

  useEffect(() => {
    setUseSpeechRecognition(isSpeechRecognitionSupported());
  }, []);

  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [expandedFeedback, setExpandedFeedback] = useState<Set<string>>(new Set());
  const [expandedTranslations, setExpandedTranslations] = useState<Set<string>>(new Set());
  const [chatTheme, setChatTheme] = useState<'cream' | 'deep'>('cream');
  const [collectedWords, setCollectedWords] = useState<AiChatNewWord[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'daily' | 'kpop' | 'study'>('all');
  const isDesktop = useIsDesktop();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [viewportTop, setViewportTop] = useState(0);

  // Handle mobile keyboard via visualViewport API
  useEffect(() => {
    if (typeof window === 'undefined' || !window.visualViewport) return;
    const vv = window.visualViewport!;
    const handleResize = () => {
      const kbHeight = window.innerHeight - vv.height - vv.offsetTop;
      setKeyboardHeight(kbHeight > 0 ? kbHeight : 0);
      setViewportTop(vv.offsetTop > 0 ? vv.offsetTop : 0);
    };
    handleResize();
    vv.addEventListener('resize', handleResize);
    vv.addEventListener('scroll', handleResize);
    return () => {
      vv.removeEventListener('resize', handleResize);
      vv.removeEventListener('scroll', handleResize);
    };
  }, []);

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
    recognizerRef.current?.abort();
    setIsRecording(false);
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
    setExpandedFeedback(new Set());
    setCollectedWords([]);
    setPhase('chatting');
  }, []);

  // ── Send message ────────────────────────────────────────────
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const handleSend = useCallback(async () => {
    if (!scenario) return;
    const text = inputValue.trim();
    if (!text || isProcessingRef.current || isTyping) return;

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

        // Auto-save grammar mistake (fire-and-forget)
        if (data.feedback?.wrongPart && data.feedback.wrongPart !== data.feedback.correctPart) {
          db.aiChatMistakes.add({
            id: crypto.randomUUID(),
            scenarioId: scenario.id,
            scenarioName: scenario.nameZh,
            userInput: text,
            wrongPart: data.feedback.wrongPart,
            correctPart: data.feedback.correctPart,
            grammarError: data.feedback.grammarError || '',
            reviewed: 0,
            createdAt: Date.now(),
          }).catch(() => {});
        }

        // Auto-save new words (fire-and-forget, UNIQUE constraint deduplicates)
        if (data.newWords?.length) {
          for (const w of data.newWords) {
            const word: AiChatNewWord = {
              id: crypto.randomUUID(),
              ko: w.ko,
              zh: w.zh,
              partOfSpeech: w.partOfSpeech || '',
              scenarioId: scenario.id,
              createdAt: Date.now(),
            };
            db.aiChatNewWords.add(word).then(() =>
              setCollectedWords(prev => [...prev, word])
            ).catch(() => {});
          }
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsg.id ? { ...m, feedback: data.feedback } : m,
          ),
        );
        setIsTyping(false);

        await new Promise((r) => setTimeout(r, 800));
        const step = currentStep;
        const aiText = data.aiResponse.ko;
        setMessages((prev) => [
          ...prev,
          {
            id: genId(),
            sender: 'ai',
            text: aiText,
            hint: data.aiResponse.zh,
          },
        ]);
        speak(aiText, 0.85);
        setCurrentStep(step + 1);

        if (step + 1 >= scenario.turns) {
          await new Promise((r) => setTimeout(r, 500));
          setMessages((prev) =>
            prev.some((m) => m.text === scenario.closing.ko)
              ? prev
              : [...prev, { id: genId(), sender: 'ai', text: scenario.closing.ko, hint: scenario.closing.zh }]
          );
          fetch('/api/track/study', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'ai_chat_complete', details: `完成AI对话: ${scenario.nameZh}`, xpEarned: 20 }) }).catch(() => {});
          setPhase('finished');
        }
      } else {
        throw new Error('API failed');
      }
    } catch {
      // Fallback to hardcoded mock
      await new Promise((r) => setTimeout(r, 1200));
      const step = currentStep;
      const exchange = scenario.exchanges?.[step];
      if (exchange) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === userMsg.id ? { ...m, feedback: exchange.feedback } : m,
          ),
        );
      }
      setIsTyping(false);

      await new Promise((r) => setTimeout(r, 1000));
      if (scenario.exchanges && step < scenario.exchanges.length) {
        const nextAi = scenario.exchanges[step].ai;
        setMessages((prev) => [
          ...prev,
          { id: genId(), sender: 'ai', text: nextAi.ko, hint: nextAi.zh },
        ]);
        speak(nextAi.ko, 0.85);
        setCurrentStep(step + 1);
        if (step + 1 >= scenario.turns) {
          await new Promise((r) => setTimeout(r, 500));
          setMessages((prev) =>
            prev.some((m) => m.text === scenario.closing.ko)
              ? prev
              : [...prev, { id: genId(), sender: 'ai', text: scenario.closing.ko, hint: scenario.closing.zh }]
          );
          fetch('/api/track/study', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'ai_chat_complete', details: `完成AI对话: ${scenario.nameZh}`, xpEarned: 20 }) }).catch(() => {});
          setPhase('finished');
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { id: genId(), sender: 'ai', text: scenario.closing.ko, hint: scenario.closing.zh },
        ]);
        fetch('/api/track/study', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'ai_chat_complete', details: `完成AI对话: ${scenario.nameZh}`, xpEarned: 20 }) }).catch(() => {});
        setPhase('finished');
      }
    }
    isProcessingRef.current = false;
    inputRef.current?.focus();
  }, [inputValue, scenario, currentStep, isTyping]);

  // ── End conversation early ──────────────────────────────────
  const handleEndConversation = useCallback(() => {
    if (!scenario) return;
    if (isProcessingRef.current) return;

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
    fetch('/api/track/study', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'ai_chat_complete', details: `完成AI对话: ${scenario.nameZh}`, xpEarned: 20 }) }).catch(() => {});
    setPhase('finished');
  }, [scenario]);

  // ── Play again / Back ───────────────────────────────────────
  const handlePlayAgain = useCallback(() => {
    if (!scenario) return;
    handleSelectScenario(scenario);
  }, [scenario, handleSelectScenario]);

  const handleBackToScenarios = useCallback(() => {
    recognizerRef.current?.abort();
    setIsRecording(false);
    setPhase('selecting');
    setScenario(null);
    setMessages([]);
    setCurrentStep(0);
    setInputValue('');
    setIsTyping(false);
    setCollectedWords([]);
    isProcessingRef.current = false;
  }, []);

  // ── Voice input ────────────────────────────────────────────
  const startRecording = useCallback(async () => {
    if (useSpeechRecognition) {
      // Web Speech API path
      if (!recognizerRef.current) {
        recognizerRef.current = new KoreanSpeechRecognizer();
        recognizerRef.current
          .onInterim((t) => setInputValue(t))
          .onFinal((t) => {
            setInputValue(t);
            setIsRecording(false);
          })
          .onError((reason) => {
            setIsRecording(false);
            if (reason === 'denied') alert('请在浏览器设置中允许麦克风权限');
          });
      }
      recognizerRef.current.start();
      setIsRecording(true);
      return;
    }
    // Fallback: MediaRecorder
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
  }, [audioUrl, useSpeechRecognition]);

  const stopRecording = useCallback(() => {
    if (useSpeechRecognition) {
      recognizerRef.current?.stop();
      setIsRecording(false);
      return;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  }, [useSpeechRecognition]);

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

  // Cleanup recognizer on unmount
  useEffect(() => {
    return () => { recognizerRef.current?.abort(); };
  }, []);

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
  const grammarMistakes = messages.filter(
    (m) => m.sender === 'user' && m.feedback?.wrongPart,
  );

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
    const filteredScenarios = categoryFilter === 'all'
      ? scenarios
      : scenarios.filter(s => s.category === categoryFilter);

    const groups: Array<{ key: 'daily' | 'kpop' | 'study'; items: ScenarioData[] }> =
      categoryFilter === 'all'
        ? (['daily', 'kpop', 'study'] as const)
            .map(key => ({ key, items: scenarios.filter(s => s.category === key) }))
            .filter(g => g.items.length > 0)
        : [{ key: categoryFilter as 'daily' | 'kpop' | 'study', items: filteredScenarios }];

    return (
      <div className="py-4 space-y-5">
        {/* Header */}
        <div>
          <h1 className="text-[22px] font-black text-[var(--text-primary)]">情景对话</h1>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            {scenarios.length} 个场景 · AI 实时对话 · 错误自动记录
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {(['all', 'daily', 'kpop', 'study'] as const).map(key => {
            const isActive = categoryFilter === key;
            const cfg = key === 'all' ? null : categoryConfig[key];
            return (
              <button
                key={key}
                onClick={() => setCategoryFilter(key)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--pink-primary)]/30'
                }`}
                style={isActive ? { background: cfg ? cfg.color : 'var(--pink-primary)' } : {}}
              >
                {key === 'all' ? '全部' : `${cfg!.emoji} ${cfg!.label}`}
              </button>
            );
          })}
        </div>

        {/* Grouped scenario list */}
        <div className="space-y-6">
          {groups.map(({ key, items }) => {
            const cfg = categoryConfig[key];
            return (
              <div key={key}>
                {/* Group header — only in 全部 mode */}
                {categoryFilter === 'all' && (
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-black px-2 py-0.5 rounded-md"
                      style={{ background: `color-mix(in srgb, ${cfg.color} 12%, transparent)`, color: cfg.color }}
                    >
                      {cfg.emoji} {cfg.label}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">{items.length} 个场景</span>
                  </div>
                )}

                {/* Scenario row cards */}
                <div className="space-y-2">
                  {items.map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleSelectScenario(s)}
                      className="w-full flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3.5 text-left hover:border-[var(--pink-primary)]/30 hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-150 shadow-[0_2px_8px_rgba(78,52,46,0.05)]"
                    >
                      {/* Emoji block */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                        style={{ background: `color-mix(in srgb, ${cfg.color} 12%, transparent)` }}
                      >
                        {s.emoji}
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[var(--text-primary)] truncate">{s.nameZh}</p>
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{s.nameKo}</p>
                      </div>

                      {/* Right: level + turns */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${levelColor[s.level]}`}>
                          {levelLabel[s.level]}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">~{s.turns}轮</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
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

  // ── Theme tokens ────────────────────────────────────────────
  const theme = chatTheme === 'cream' ? {
    // Cream minimal (style 2)
    bg: 'var(--bg-primary)',
    headerBg: 'var(--bg-card)',
    headerBorder: 'var(--border-color)',
    backBg: 'var(--bg-input)',
    backColor: 'var(--text-secondary)',
    titleColor: 'var(--text-primary)',
    subColor: 'var(--text-muted)',
    endBtnBg: 'transparent',
    endBtnBorder: 'var(--border-color)',
    endBtnColor: 'var(--text-muted)',
    progressBg: 'var(--border-color)',
    progressFill: 'linear-gradient(90deg, var(--purple-soft), var(--pink-primary))',
    messagesBg: 'linear-gradient(180deg, color-mix(in srgb, var(--purple-soft) 4%, var(--bg-primary)) 0%, var(--bg-primary) 40%)',
    aiBubbleBg: 'var(--bg-card)',
    aiBubbleShadow: '0 2px 12px rgba(100,80,60,0.07), 0 1px 3px rgba(100,80,60,0.05)',
    aiBubbleBorder: '1px solid var(--border-color)',
    aiNotchColor: 'var(--bg-card)',
    aiText: 'var(--text-primary)',
    trBtnColor: 'var(--text-muted)',
    trTextColor: 'var(--text-muted)',
    userBubbleBg: '#ff8fab',
    userBubbleShadow: '0 1px 4px rgba(255,143,171,0.30)',
    userNotchColor: '#ff8fab',
    userText: '#ffffff',
    typingBg: 'var(--bg-card)',
    typingBorder: '1px solid var(--border-color)',
    typingLabel: 'var(--text-muted)',
    dotColor: 'var(--pink-primary)',
    inputAreaBg: 'var(--bg-card)',
    inputAreaBorder: 'var(--border-color)',
    inputBg: 'var(--bg-input)',
    inputBorder: 'var(--border-color)',
    inputColor: 'var(--text-primary)',
    inputPlaceholder: 'var(--text-placeholder)',
    themeBtnBg: 'var(--bg-input)',
    themeBtnColor: 'var(--text-muted)',
    avatarBg: 'linear-gradient(135deg, var(--purple-soft), var(--pink-primary))',
    listenColor: 'var(--text-muted)',
    listenHover: 'var(--pink-primary)',
    feedbackErrorBg: 'color-mix(in srgb, #ff5a5a 6%, var(--bg-card))',
    feedbackNormalBg: 'var(--bg-card)',
    feedbackNormalBorder: '1px solid var(--border-color)',
    hintsBg: 'var(--bg-primary)',
    hintsBorder: 'var(--border-color)',
    hintsItemBg: 'var(--bg-card)',
    hintsItemBorder: 'var(--border-color)',
    feedbackMutedColor: 'var(--text-muted)',
    feedbackSecondaryColor: 'var(--text-secondary)',
  } : {
    // Deep space (style 3)
    bg: 'linear-gradient(160deg, #12101e 0%, #0d0d18 60%, #0a0a0f 100%)',
    headerBg: 'rgba(255,255,255,0.02)',
    headerBorder: 'rgba(255,255,255,0.05)',
    backBg: 'rgba(255,255,255,0.06)',
    backColor: 'rgba(255,255,255,0.5)',
    titleColor: 'rgba(255,255,255,0.92)',
    subColor: 'rgba(255,255,255,0.3)',
    endBtnBg: 'rgba(124,58,237,0.15)',
    endBtnBorder: 'rgba(124,58,237,0.3)',
    endBtnColor: 'rgba(167,139,250,0.9)',
    progressBg: 'rgba(255,255,255,0.04)',
    progressFill: 'linear-gradient(90deg, #7c3aed, #c026d3)',
    messagesBg: 'transparent',
    aiBubbleBg: 'rgba(255,255,255,0.06)',
    aiBubbleShadow: '0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
    aiBubbleBorder: '1px solid rgba(255,255,255,0.09)',
    aiNotchColor: 'rgba(255,255,255,0.06)',
    aiText: 'rgba(255,255,255,0.9)',
    trBtnColor: 'rgba(255,255,255,0.25)',
    trTextColor: 'rgba(255,255,255,0.35)',
    userBubbleBg: 'linear-gradient(135deg, rgba(124,58,237,0.55), rgba(192,38,211,0.45))',
    userBubbleShadow: '0 4px 16px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
    userNotchColor: 'rgba(124,58,237,0.55)',
    userText: 'rgba(255,255,255,0.92)',
    typingBg: 'rgba(255,255,255,0.06)',
    typingBorder: '1px solid rgba(255,255,255,0.09)',
    typingLabel: 'rgba(255,255,255,0.25)',
    dotColor: '#a78bfa',
    inputAreaBg: 'rgba(255,255,255,0.02)',
    inputAreaBorder: 'rgba(255,255,255,0.05)',
    inputBg: 'rgba(255,255,255,0.05)',
    inputBorder: 'rgba(255,255,255,0.08)',
    inputColor: 'rgba(255,255,255,0.85)',
    inputPlaceholder: 'rgba(255,255,255,0.18)',
    themeBtnBg: 'rgba(124,58,237,0.2)',
    themeBtnColor: 'rgba(167,139,250,0.9)',
    avatarBg: 'linear-gradient(135deg, #7c3aed, #c026d3)',
    listenColor: 'rgba(255,255,255,0.25)',
    listenHover: 'rgba(167,139,250,0.8)',
    feedbackErrorBg: 'rgba(255,60,60,0.1)',
    feedbackNormalBg: 'rgba(255,255,255,0.05)',
    feedbackNormalBorder: '1px solid rgba(255,255,255,0.08)',
    hintsBg: 'rgba(255,255,255,0.04)',
    hintsBorder: 'rgba(255,255,255,0.08)',
    hintsItemBg: 'rgba(255,255,255,0.04)',
    hintsItemBorder: 'rgba(255,255,255,0.08)',
    feedbackMutedColor: 'rgba(255,255,255,0.35)',
    feedbackSecondaryColor: 'rgba(255,255,255,0.55)',
  };

  return (
    <div
      className={isDesktop ? 'flex flex-col h-full' : 'flex flex-col'}
      style={isDesktop ? {
        background: chatTheme === 'deep' ? 'linear-gradient(160deg, #12101e 0%, #0d0d18 60%, #0a0a0f 100%)' : undefined,
      } : {
        position: 'fixed',
        top: `calc(36px + env(safe-area-inset-top, 0px))`,
        bottom: keyboardHeight > 0 ? 0 : `calc(56px + env(safe-area-inset-bottom, 0px))`,
        left: 0,
        right: 0,
        zIndex: 40,
        transform: viewportTop > 0 ? `translateY(${viewportTop}px)` : undefined,
        transition: 'bottom 0.15s ease, transform 0.15s ease',
        background: chatTheme === 'deep' ? 'linear-gradient(160deg, #12101e 0%, #0d0d18 60%, #0a0a0f 100%)' : undefined,
      }}
    >
      {/* ── Chat Header ──────────────────────────────────────── */}
      <div
        className="relative shrink-0 flex items-center justify-between px-4 py-3"
        style={{
          background: theme.headerBg,
          borderBottom: `1px solid ${theme.headerBorder}`,
          backdropFilter: chatTheme === 'deep' ? 'blur(20px)' : undefined,
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={handleBackToScenarios}
            className="p-1.5 rounded-full shrink-0 transition-colors"
            style={{ background: theme.backBg }}
            title="返回场景"
          >
            <ArrowLeft size={18} style={{ color: theme.backColor }} />
          </button>
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xl shrink-0"
              style={{ background: theme.avatarBg }}
            >
              {scenario.emoji}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-black text-sm truncate" style={{ color: theme.titleColor }}>
                  {scenario.nameZh}
                </span>
              </div>
              <p className="text-[11px]" style={{ color: theme.subColor }}>{scenario.nameKo}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme toggle button */}
          <button
            onClick={() => setChatTheme(t => t === 'cream' ? 'deep' : 'cream')}
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all"
            style={{ background: theme.themeBtnBg, color: theme.themeBtnColor }}
            title={chatTheme === 'cream' ? '切换深色' : '切换浅色'}
          >
            {chatTheme === 'cream' ? '🌙' : '☀️'}
          </button>
          {phase === 'chatting' && (
            <button
              onClick={handleEndConversation}
              disabled={isRecording}
              className="shrink-0 text-xs px-3 py-1.5 rounded-lg border transition-all font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: theme.endBtnBg, color: theme.endBtnColor, borderColor: theme.endBtnBorder }}
            >
              结束
            </button>
          )}
        </div>

        {/* Progress bar */}
        {phase === 'chatting' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: theme.progressBg }}>
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${Math.min((currentStep / scenario.turns) * 100, 100)}%`, background: theme.progressFill }}
            />
          </div>
        )}
      </div>

      {/* ── Messages Area ────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        style={{ background: theme.messagesBg }}
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            {/* AI message */}
            {msg.sender === 'ai' && (
              <div className="flex gap-2.5 max-w-[85%] animate-slide-up">
                <div
                  className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg mt-0.5"
                  style={{ background: theme.avatarBg }}
                >
                  {scenario.emoji}
                </div>
                <div>
                  <div
                    className="relative rounded-2xl rounded-tl-none px-4 py-3"
                    style={{
                      background: theme.aiBubbleBg,
                      boxShadow: theme.aiBubbleShadow,
                      border: theme.aiBubbleBorder,
                      backdropFilter: chatTheme === 'deep' ? 'blur(24px)' : undefined,
                    }}
                  >
                    {/* 左上角尖角 */}
                    <div style={{
                      position: 'absolute', left: -6, top: 0,
                      width: 0, height: 0,
                      borderTop: `8px solid ${theme.aiNotchColor}`,
                      borderLeft: '7px solid transparent',
                    }} />
                    <p className="text-sm leading-relaxed" style={{ color: theme.aiText }}>
                      {msg.text}
                    </p>
                    {msg.hint && (
                      <div>
                        <button
                          onClick={() => setExpandedTranslations(prev => {
                            const next = new Set(prev);
                            next.has(msg.id) ? next.delete(msg.id) : next.add(msg.id);
                            return next;
                          })}
                          className="flex items-center gap-0.5 mt-1.5 transition-colors"
                          style={{ fontSize: 11, color: theme.trBtnColor }}
                        >
                          译 {expandedTranslations.has(msg.id) ? '▲' : '▾'}
                        </button>
                        {expandedTranslations.has(msg.id) && (
                          <p className="mt-1 leading-relaxed" style={{ fontSize: 12, color: theme.trTextColor }}>
                            {msg.hint}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => speak(msg.text, 0.85)}
                    className="flex items-center gap-1 text-[11px] transition-colors mt-1 ml-1"
                    style={{ color: theme.listenColor }}
                  >
                    <Volume2 size={11} />
                    听发音
                  </button>
                </div>
              </div>
            )}

            {/* User message + feedback */}
            {msg.sender === 'user' && (
              <div className="flex flex-col items-end max-w-[85%] ml-auto animate-slide-up">
                <div
                  className="relative rounded-2xl rounded-tr-none px-4 py-3"
                  style={{
                    background: theme.userBubbleBg,
                    boxShadow: theme.userBubbleShadow,
                    backdropFilter: chatTheme === 'deep' ? 'blur(12px)' : undefined,
                  }}
                >
                  {/* 右上角尖角 */}
                  <div style={{
                    position: 'absolute', right: -6, top: 0,
                    width: 0, height: 0,
                    borderTop: `8px solid ${theme.userNotchColor}`,
                    borderRight: '7px solid transparent',
                  }} />
                  <p className="text-sm leading-relaxed" style={{ color: theme.userText }}>
                    {msg.feedback?.wrongPart && msg.text.includes(msg.feedback.wrongPart)
                      ? (() => {
                          const idx = msg.text.indexOf(msg.feedback.wrongPart);
                          return (
                            <>
                              {msg.text.slice(0, idx)}
                              <span style={{ background: 'rgba(255,255,255,0.22)', textDecoration: 'underline wavy rgba(255,255,255,0.85)', borderRadius: 3, padding: '0 3px' }}>
                                {msg.feedback.wrongPart}
                              </span>
                              {msg.text.slice(idx + msg.feedback.wrongPart.length)}
                            </>
                          );
                        })()
                      : msg.text}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-1 mr-1">
                  <button
                    onClick={() => speak(msg.text, 0.85)}
                    className="flex items-center gap-1 text-[11px] transition-colors"
                    style={{ color: theme.listenColor }}
                  >
                    <Volume2 size={11} />
                    听发音
                  </button>
                  {msg.feedback && !msg.feedback.wrongPart && (
                    <button
                      onClick={() => setExpandedFeedback((prev) => {
                        const next = new Set(prev);
                        if (next.has(msg.id)) next.delete(msg.id); else next.add(msg.id);
                        return next;
                      })}
                      className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-medium transition-all"
                      style={expandedFeedback.has(msg.id)
                        ? { background: 'color-mix(in srgb, var(--purple-soft) 15%, transparent)', border: '1px solid color-mix(in srgb, var(--purple-soft) 40%, transparent)', color: 'var(--purple-soft)' }
                        : { background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }
                      }
                    >
                      {expandedFeedback.has(msg.id) ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                      查看反馈
                    </button>
                  )}
                </div>

                {/* Feedback card */}
                {msg.feedback && (msg.feedback.wrongPart || expandedFeedback.has(msg.id)) && (
                  <div
                    className="mt-2 w-full rounded-xl p-3 space-y-2 animate-slide-up"
                    style={msg.feedback.wrongPart
                      ? { background: theme.feedbackErrorBg, borderLeft: '3px solid #ff5a5a', boxShadow: '0 2px 8px rgba(255,90,90,0.10)' }
                      : { background: theme.feedbackNormalBg, border: theme.feedbackNormalBorder, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }
                    }
                  >
                    {msg.feedback.wrongPart ? (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs flex-wrap">
                          <span className="line-through opacity-70" style={{ color: theme.feedbackMutedColor }}>{msg.feedback.wrongPart}</span>
                          <span style={{ color: theme.feedbackMutedColor }}>→</span>
                          <span className="font-semibold" style={{ color: 'var(--mint-soft)' }}>{msg.feedback.correctPart}</span>
                        </div>
                        {msg.feedback.grammarError && (
                          <p className="text-[11px]" style={{ color: theme.feedbackSecondaryColor }}>{msg.feedback.grammarError}</p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-2 text-xs">
                          <Check size={13} className="shrink-0 mt-0.5" style={{ color: 'var(--mint-soft)' }} />
                          <div>
                            <span className="font-semibold" style={{ color: 'var(--mint-soft)' }}>表达自然</span>
                            <p className="mt-0.5" style={{ color: theme.feedbackSecondaryColor }}>{msg.feedback.natural}</p>
                          </div>
                        </div>
                        {msg.feedback.betterWay && (
                          <div className="flex items-start gap-2 text-xs">
                            <Lightbulb size={13} className="shrink-0 mt-0.5" style={{ color: 'var(--purple-soft)' }} />
                            <div>
                              <span className="font-semibold" style={{ color: 'var(--purple-soft)' }}>更地道的说法</span>
                              <p className="mt-0.5" style={{ color: theme.feedbackSecondaryColor }}>{msg.feedback.betterWay}</p>
                            </div>
                          </div>
                        )}
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
          <div className="flex gap-2.5 max-w-[85%] animate-slide-up">
            <div
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-lg animate-wiggle"
              style={{ background: theme.avatarBg }}
            >
              🐰
            </div>
            <div
              className="relative rounded-2xl rounded-tl-none px-4 py-3"
              style={{
                background: theme.typingBg,
                border: theme.typingBorder,
                boxShadow: theme.aiBubbleShadow,
                backdropFilter: chatTheme === 'deep' ? 'blur(24px)' : undefined,
              }}
            >
              <div style={{
                position: 'absolute', left: -6, top: 0,
                width: 0, height: 0,
                borderTop: `8px solid ${theme.aiNotchColor}`,
                borderLeft: '7px solid transparent',
              }} />
              <div className="flex items-center gap-1.5">
                <span className="text-xs mr-1" style={{ color: theme.typingLabel }}>토리 생각 중</span>
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: theme.dotColor, opacity: 0.8, animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: theme.dotColor, opacity: 0.8, animationDelay: '160ms' }} />
                <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: theme.dotColor, opacity: 0.8, animationDelay: '320ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ──────────────────────────────────────────── */}
      {phase === 'chatting' && (
        <div className="shrink-0 px-4 py-3 relative" style={{ background: theme.inputAreaBg, borderTop: `1px solid ${theme.inputAreaBorder}` }}>
          {/* Hints bottom drawer */}
          {showHints && (() => {
            const hintsIndex = currentStep > 0 ? currentStep - 1 : 0;
            const activeHints = scenario.exchanges?.[Math.min(hintsIndex, (scenario.exchanges?.length ?? 1) - 1)]?.hints;
            if (!activeHints) return null;
            return (
              <div className="mb-3 rounded-2xl p-4 animate-slide-up-drawer shadow-lg" style={{ background: theme.hintsBg, border: `1px solid ${theme.hintsBorder}` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb size={16} className="text-[var(--peach-soft)]" />
                    <span className="text-sm font-semibold" style={{ color: theme.titleColor }}>参考方向</span>
                    <span className="text-[11px]" style={{ color: theme.subColor }}>点击填入</span>
                  </div>
                  <button
                    onClick={() => setShowHints(false)}
                    style={{ color: theme.subColor }}
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
                      className="w-full text-left rounded-xl p-3 transition-all"
                      style={{ background: theme.hintsItemBg, border: `1px solid ${theme.hintsItemBorder}` }}
                    >
                      <p className="text-sm font-medium" style={{ color: theme.aiText }}>{hint.ko}</p>
                      <p className="text-xs mt-0.5" style={{ color: theme.trTextColor }}>{hint.zh}</p>
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
            {/* Mic button */}
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isTyping || isProcessingRef.current}
              className={`shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                isRecording
                  ? 'bg-[var(--color-danger)]/15 text-[var(--color-danger)] animate-pulse'
                  : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/10'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title={isRecording ? '停止录音' : '语音输入'}
            >
              {isRecording ? <Square size={18} /> : <Mic size={18} />}
            </button>

            {/* Hints button */}
            <button
              onClick={() => setShowHints(!showHints)}
              disabled={isTyping || isProcessingRef.current || isRecording || !scenario.exchanges?.[currentStep > 0 ? currentStep - 1 : 0]?.hints}
              className={`shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
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
              value={inputValue}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder={isRecording ? '正在识别语音...' : '用韩语输入你的回复...'}
              rows={1}
              disabled={isTyping || isProcessingRef.current}
              className="flex-1 resize-none rounded-2xl px-4 py-2.5 text-sm focus:outline-none disabled:opacity-50 transition-all"
              style={{
                maxHeight: '120px',
                background: theme.inputBg,
                border: `1px solid ${theme.inputBorder}`,
                color: theme.inputColor,
              }}
            />
            {isDesktop && (
              <button
                type="button"
                onClick={() => setShowKeyboard(!showKeyboard)}
                className={`shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center transition-colors text-sm font-bold ${showKeyboard ? 'bg-[var(--pink-primary)]/20 text-[var(--pink-primary)]' : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--pink-primary)]'}`}
                title="韩文键盘"
              >한</button>
            )}
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping || isProcessingRef.current || isRecording}
              className="shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center text-white transition-all disabled:opacity-40"
              style={{
                background: inputValue.trim() && !isTyping && !isProcessingRef.current && !isRecording
                  ? 'linear-gradient(135deg, var(--pink-primary) 0%, #ff6b9d 100%)'
                  : 'var(--bg-accent)',
                boxShadow: inputValue.trim() && !isTyping ? '0 4px 15px rgba(255,143,171,0.40)' : 'none',
                color: inputValue.trim() && !isTyping ? 'white' : 'var(--text-muted)',
              }}
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

      {/* Finished completion panel */}
      {phase === 'finished' && (
        <div className="shrink-0 overflow-y-auto max-h-[55vh]">
          {/* Hero */}
          <div
            className="px-4 pt-4 pb-8 flex items-center gap-3"
            style={{ background: 'linear-gradient(135deg, var(--purple-soft) 0%, var(--pink-primary) 100%)' }}
          >
            <div className="text-4xl">🏆</div>
            <div>
              <p className="text-white font-black text-base">对话完成！</p>
              <p className="text-white/70 text-xs mt-0.5">{completedExchanges} 轮对话 · +20 XP</p>
            </div>
            <Sparkles size={18} className="ml-auto text-white/60" />
          </div>

          {/* Stats card — overlaps hero */}
          <div
            className="mx-3 -mt-4 bg-[var(--bg-card)] rounded-2xl p-4 space-y-3"
            style={{ boxShadow: '0 8px 32px rgba(78,52,46,0.12)' }}
          >
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[var(--mint-soft)]/10 rounded-xl p-2.5 text-center">
                <div className="text-2xl font-black text-[var(--mint-soft)]">{collectedWords.length}</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">新词</div>
              </div>
              <div className="bg-[var(--peach-soft)]/10 rounded-xl p-2.5 text-center">
                <div className="text-2xl font-black text-[var(--peach-soft)]">{grammarMistakes.length}</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">语法错误</div>
              </div>
              <div className="bg-[var(--pink-primary)]/10 rounded-xl p-2.5 text-center">
                <div className="text-2xl font-black text-[var(--pink-primary)]">+20</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">XP</div>
              </div>
            </div>

            {/* New words horizontal scroll */}
            {collectedWords.length > 0 && (
              <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                {collectedWords.map(w => (
                  <span key={w.id} className="shrink-0 text-xs px-2 py-0.5 rounded-full bg-[var(--purple-soft)]/10 border border-[var(--purple-soft)]/20 text-[var(--text-secondary)]">
                    {w.ko} {w.zh}
                  </span>
                ))}
              </div>
            )}

            {/* Grammar errors — collapsible */}
            {grammarMistakes.length > 0 ? (
              <details className="group">
                <summary className="flex items-center gap-1.5 text-xs text-[var(--peach-soft)] font-semibold cursor-pointer list-none">
                  <AlertTriangle size={12} />
                  语法错误回顾 ({grammarMistakes.length})
                  <ChevronDown size={12} className="ml-auto group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2 space-y-1.5">
                  {grammarMistakes.map(m => {
                    const wp = m.feedback!.wrongPart;
                    const cp = m.feedback!.correctPart;
                    const hasRealError = wp && cp && wp !== cp;
                    return <GrammarMistakeCard key={m.id} msg={m} hasRealError={!!hasRealError} />;
                  })}
                </div>
              </details>
            ) : (
              <div className="flex items-center gap-2 bg-[var(--mint-soft)]/8 rounded-lg px-3 py-2">
                <Check size={12} className="text-[var(--mint-soft)] shrink-0" />
                <p className="text-xs text-[var(--text-secondary)]">本次无语法错误 🎉</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={handlePlayAgain}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white font-black text-sm"
                style={{
                  background: 'linear-gradient(135deg, var(--pink-primary) 0%, #ff6b9d 100%)',
                  boxShadow: '0 4px 15px rgba(255,143,171,0.40)',
                }}
              >
                <Sparkles size={15} />
                再来一轮
              </button>
              <button
                onClick={handleBackToScenarios}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-black text-sm bg-[var(--bg-input)] text-[var(--text-primary)] hover:bg-[var(--bg-accent)] transition-colors"
              >
                换个场景
              </button>
            </div>
            {grammarMistakes.length > 0 && (
              <Link
                href="/mine/ai-mistakes"
                className="flex items-center justify-center gap-1.5 text-xs text-[var(--peach-soft)] py-1"
              >
                <AlertTriangle size={12} />
                复习语法错题 ({grammarMistakes.length}) →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
