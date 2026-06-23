'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Loader2, Sparkles } from 'lucide-react';
import type { ToriDay, ToriCarrotMessage, ToriModuleKind } from '@/types/tori-diary';

interface CarrotProgress {
  completedDays: number;
  checkpointsCleared: number;
  sentencesCount: number;
  recordingsCount: number;
}

interface Props {
  day: ToriDay;
  currentModule: ToriModuleKind;
  progress?: CarrotProgress;
}

const MODULE_LABELS: Record<ToriModuleKind, string> = {
  opening: '开场',
  words: '单词',
  dialogue: '对话',
  grammar: '语法',
  output: '输出',
  recap: '收尾',
};

const SUGGESTED_QUESTIONS = [
  '今天的语法点能再讲一遍吗？',
  '我说错了怎么纠正？',
  '韩语里这一句是什么意思？',
];

const SUMMARY_TAG = '__summary__';
const SUMMARIZE_COOLDOWN_MS = 60_000;

function pickGreeting(day: number, p?: CarrotProgress): string {
  // Day 1 新人
  if (day === 1) {
    return '少年，第一次见面。我是兔莉妈妈塞过来的胡萝卜——别问为什么，我也没想通。30 天后我们再聊聊你变成什么样了。';
  }
  // 关卡前一天
  if ([6, 13, 20, 25, 28, 29].includes(day)) {
    return '少年，明天打 boss。这根胡萝卜没什么好嘱咐的——你前面练的那些就是答案。早点睡，别临时抱佛脚。';
  }
  if (!p) {
    return '小同学，又见面了。问我吧，我陪你。';
  }
  // 长时间未来 — currentDay 远超 completedDays
  if (p.completedDays > 0 && day > p.completedDays + 3) {
    return '小同学，我以为你忘了我。也行——抽屉里也挺暖和的。从哪天落下的就从哪天接着，不用补，回来就回来了。';
  }
  // 蜜月期 Day 5-7
  if (day >= 5 && day <= 7 && p.sentencesCount > 0) {
    return `小同学，看到你已经收藏了 ${p.sentencesCount} 句话——挺有眼光。这个劲儿别丢。`;
  }
  // 倦怠期 Day 8-14
  if (day >= 8 && day <= 14) {
    return '学徒，第二周了。倦怠期是正常的——这根胡萝卜不催你。要问就问。';
  }
  return '少年，我在这儿。问我吧。';
}

/**
 * 勇气胡萝卜 AI 助手 — 悬浮按钮 + 抽屉面板
 * 历史 localStorage 持久化，最多保留 20 轮
 */
export function CarrotHelper({ day, currentModule, progress }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ToriCarrotMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lastSummarizeAt, setLastSummarizeAt] = useState(0);
  const [now, setNow] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const storageKey = `tori-carrot-history-${day.day}`;

  useEffect(() => { setMounted(true); }, []);

  // 加载历史
  useEffect(() => {
    if (!mounted) return;
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setMessages(JSON.parse(raw));
    } catch { /* ignore */ }
  }, [mounted, storageKey]);

  // 保存历史
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(messages.slice(-20)));
    } catch { /* ignore */ }
  }, [messages, storageKey, mounted]);

  // 滚到底部
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  // 节流倒计时刷新
  useEffect(() => {
    if (!lastSummarizeAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [lastSummarizeAt]);

  const cooldownLeft = useMemo(() => {
    if (!lastSummarizeAt) return 0;
    return Math.max(0, SUMMARIZE_COOLDOWN_MS - (now - lastSummarizeAt));
  }, [lastSummarizeAt, now]);

  const canSummarize = !loading && cooldownLeft === 0 && progress !== undefined;

  const greeting = useMemo(() => pickGreeting(day.day, progress), [day.day, progress]);

  const buildContext = () => ({
    day: day.day,
    module: MODULE_LABELS[currentModule],
    dayTitle: day.title,
    ...progress,
  });

  const handleSend = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;

    const newUserMsg: ToriCarrotMessage = { role: 'user', text: userText, ts: Date.now() };
    setMessages((m) => [...m, newUserMsg]);
    setInput('');
    setLoading(true);

    try {
      const resp = await fetch('/api/ai/carrot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: userText,
          history: messages.slice(-10).map((m) => ({
            ...m,
            text: m.text.startsWith(SUMMARY_TAG) ? m.text.slice(SUMMARY_TAG.length) : m.text,
          })),
          context: buildContext(),
        }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        setMessages((m) => [...m, { role: 'tori', text: data.error || '助手开小差了…', ts: Date.now() }]);
      } else {
        setMessages((m) => [...m, { role: 'tori', text: data.reply ?? '?', ts: Date.now() }]);
      }
    } catch {
      setMessages((m) => [...m, { role: 'tori', text: '网络好像不太好。等下再试？', ts: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    if (!canSummarize) return;
    setLastSummarizeAt(Date.now());
    setNow(Date.now());
    setLoading(true);
    try {
      const resp = await fetch('/api/ai/carrot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summarize: true,
          context: buildContext(),
        }),
      });
      const data = await resp.json();
      const text = resp.ok ? (data.reply ?? '?') : (data.error || '总结失败，等下再试？');
      setMessages((m) => [...m, { role: 'tori', text: `${SUMMARY_TAG}${text}`, ts: Date.now() }]);
    } catch {
      setMessages((m) => [...m, { role: 'tori', text: '网络好像不太好。等下再试？', ts: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* 浮按钮 */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="勇气胡萝卜助手"
          style={{
            position: 'fixed',
            right: 16,
            bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',
            zIndex: 250,
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff9d4a, #ffc070)',
            border: 'none',
            boxShadow: '0 8px 22px rgba(255, 157, 74, 0.42)',
            color: '#fff',
            fontSize: 28,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.15s',
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.92)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          🥕
        </button>
      )}

      {/* 抽屉 */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 249,
              background: 'rgba(58, 42, 30, 0.45)',
            }}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            style={{
              position: 'fixed',
              right: 16,
              bottom: 'calc(72px + env(safe-area-inset-bottom, 0px))',
              zIndex: 250,
              width: 'min(420px, calc(100vw - 32px))',
              height: 'min(560px, calc(100vh - 160px))',
              background: '#fcf7ec',
              borderRadius: 24,
              boxShadow: '0 24px 56px rgba(58, 42, 30, 0.32)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid #efe1da',
            }}
          >
            {/* 头部 */}
            <div
              style={{
                padding: '14px 18px',
                borderBottom: '1px solid #efe1da',
                background: 'linear-gradient(135deg, #fdf4e3, #fcf7ec)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>🥕</span>
                <div>
                  <p
                    className="diary-handwriting-zh"
                    style={{ fontSize: 14, fontWeight: 700, color: '#3a2a1e', margin: 0 }}
                  >
                    勇气胡萝卜
                  </p>
                  <p style={{ fontSize: 11, color: '#897167', margin: 0 }}>
                    问我吧，我陪你
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <button
                  onClick={handleSummarize}
                  disabled={!canSummarize}
                  title={
                    progress === undefined
                      ? '加载进度中…'
                      : cooldownLeft > 0
                      ? `稍等 ${Math.ceil(cooldownLeft / 1000)} 秒`
                      : '让胡萝卜总结一下你的学习'
                  }
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '5px 11px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: canSummarize ? '#9c7637' : '#bdab97',
                    background: canSummarize ? 'rgba(200,153,91,0.14)' : 'rgba(200,153,91,0.06)',
                    border: '1px solid #c8995b',
                    borderRadius: 999,
                    cursor: canSummarize ? 'pointer' : 'not-allowed',
                    transition: 'background 0.15s',
                  }}
                >
                  <Sparkles size={11} />
                  {cooldownLeft > 0 ? `${Math.ceil(cooldownLeft / 1000)}s` : '总结'}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'transparent', border: 'none',
                    color: '#897167', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  aria-label="关闭"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 对话区 */}
            <div
              ref={scrollRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              {messages.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <span style={{ fontSize: 32 }}>🥕</span>
                  <p
                    className="diary-handwriting-zh"
                    style={{ fontSize: 13, color: '#3a2a1e', margin: '12px 0', lineHeight: 1.7, padding: '0 12px' }}
                  >
                    {greeting}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => handleSend(q)}
                        className="diary-handwriting-zh"
                        style={{
                          padding: '7px 12px',
                          fontSize: 12,
                          color: '#3a2a1e',
                          background: '#fdf4e3',
                          border: '1px solid #c8995b',
                          borderRadius: 999,
                          cursor: 'pointer',
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, idx) => {
                const isSummary = m.role === 'tori' && m.text.startsWith(SUMMARY_TAG);
                if (isSummary) {
                  return (
                    <div
                      key={idx}
                      style={{
                        alignSelf: 'flex-start',
                        maxWidth: '92%',
                        background: '#fff8ea',
                        borderLeft: '3px solid #c8995b',
                        border: '1px solid #efe1da',
                        borderLeftWidth: 3,
                        borderLeftColor: '#c8995b',
                        borderRadius: '4px 14px 14px 4px',
                        padding: '10px 12px 10px 14px',
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          color: '#9c7637',
                          fontWeight: 700,
                          letterSpacing: 0.4,
                          marginBottom: 4,
                        }}
                      >
                        🌿 进度回顾
                      </div>
                      <div
                        className="diary-handwriting-zh"
                        style={{
                          fontSize: 13,
                          lineHeight: 1.6,
                          color: '#3a2a1e',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {m.text.slice(SUMMARY_TAG.length)}
                      </div>
                    </div>
                  );
                }
                return (
                  <div
                    key={idx}
                    style={{
                      alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      padding: '8px 12px',
                      borderRadius: 14,
                      background: m.role === 'user' ? '#3a2a1e' : '#fff8ea',
                      color: m.role === 'user' ? '#fcf7ec' : '#3a2a1e',
                      fontSize: 13,
                      lineHeight: 1.6,
                      border: m.role === 'tori' ? '1px solid #efe1da' : 'none',
                      whiteSpace: 'pre-wrap',
                    }}
                    className={m.role === 'tori' ? 'diary-handwriting-zh' : ''}
                  >
                    {m.text}
                  </div>
                );
              })}

              {loading && (
                <div
                  style={{
                    alignSelf: 'flex-start',
                    padding: '8px 12px',
                    background: '#fff8ea',
                    border: '1px solid #efe1da',
                    borderRadius: 14,
                    color: '#897167',
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <Loader2 size={12} className="animate-spin" />
                  胡萝卜在想…
                </div>
              )}
            </div>

            {/* 输入区 */}
            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid #efe1da',
                display: 'flex',
                gap: 8,
                background: '#fcf7ec',
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="问问胡萝卜…"
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '8px 14px',
                  fontSize: 13,
                  background: '#fff8ea',
                  border: '1px solid #efe1da',
                  borderRadius: 999,
                  outline: 'none',
                  color: '#3a2a1e',
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: input.trim() && !loading ? '#3a2a1e' : '#d6c5b0',
                  color: '#fcf7ec',
                  border: 'none',
                  cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
                aria-label="发送"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </>
      )}
    </>,
    document.body
  );
}
