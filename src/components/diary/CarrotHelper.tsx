'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, Loader2 } from 'lucide-react';
import type { ToriDay, ToriCarrotMessage, ToriModuleKind } from '@/types/tori-diary';

interface Props {
  day: ToriDay;
  currentModule: ToriModuleKind;
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
  '韩语里怎么自我介绍？',
];

/**
 * 勇气胡萝卜 AI 助手 — 悬浮按钮 + 抽屉面板
 * 历史 localStorage 持久化，最多保留 20 轮
 */
export function CarrotHelper({ day, currentModule }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ToriCarrotMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
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
          history: messages.slice(-10),
          context: {
            day: day.day,
            module: MODULE_LABELS[currentModule],
            dayTitle: day.title,
          },
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
                  <span style={{ fontSize: 32 }}>🐰</span>
                  <p
                    className="diary-handwriting-zh"
                    style={{ fontSize: 13, color: '#6b5544', margin: '8px 0 12px', lineHeight: 1.6 }}
                  >
                    你好，我是兔莉。<br />
                    Day {day.day} · {day.title}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
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

              {messages.map((m, idx) => (
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
              ))}

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
                  兔莉在想…
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
                placeholder="问问兔莉…"
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
