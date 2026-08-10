'use client';

import { useState, useEffect, useRef } from 'react';
import { Volume2 } from 'lucide-react';
import Link from 'next/link';
import { speak } from '@/lib/tts';
import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';
import { SentenceJudgeResult, type JudgeResult } from './SentenceJudgeResult';
import { KoreanKeyboardDisplay } from '@/components/dictation/KoreanKeyboardDisplay';
import { KeyboardHint } from '@/components/practice/KeyboardHint';
import { useHangulIme } from '@/lib/useHangulIme';
import { useIsDesktop } from '@/lib/useIsMobile';

interface Props {
  [k: string]: unknown;
  mode: 'imitate' | 'continue';
  grammarPoint: string;
  whatItDoes?: string;
  stem: { ko: string; zh: string; context?: string };
  swapHint?: string;      // 仿写：换词槽提示（题库模板才有）
  continueHint?: string;  // 续写：作答提示（题库 opener 才有）
  lang: Lang;
  onScore?: (s: { correct: number; total: number }) => void;
}

type Phase = 'writing' | 'judging' | 'done' | 'login' | 'quota' | 'error';

// 仿写/续写：给例句/开头句，用户写自己的句子，AI 批改。批改失败/未登录/超额都可跳过，不阻断完课。
export function GrammarWriteExercise({ mode, grammarPoint, whatItDoes, stem, swapHint, continueHint, lang, onScore }: Props) {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<Phase>('writing');
  const [result, setResult] = useState<JudgeResult | null>(null);
  const [submitted, setSubmitted] = useState('');
  const abortRef = useRef<AbortController | null>(null);
  const isDesktop = useIsDesktop();

  // 桌面 App 接管输入(自立 IME);Enter 提交批改。judge 定义在后,用 ref 转发。
  const judgeRef = useRef<() => void>(() => {});
  const ime = useHangulIme({ onChange: setText, onEnter: () => judgeRef.current() });

  // 换题（stem 变）时重置
  useEffect(() => {
    setText(''); setPhase('writing'); setResult(null); setSubmitted(''); ime.reset();
    return () => abortRef.current?.abort();
  }, [stem.ko, mode]);

  const judge = async () => {
    const sentence = text.trim();
    if (!sentence || phase === 'judging') return;
    setPhase('judging');
    setSubmitted(sentence);
    const controller = new AbortController();
    abortRef.current = controller;
    const timer = setTimeout(() => controller.abort(), 20_000);
    try {
      const res = await fetch('/api/ai/sentence-judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          action: 'grammar-judge',
          grammarPoint,
          whatItDoes,
          sentence,
          precedingSentence: mode === 'continue' ? stem.ko : undefined,
        }),
      });
      if (res.status === 401) { setPhase('login'); return; }
      if (res.status === 429) { setPhase('quota'); return; }
      if (!res.ok) { setPhase('error'); return; }
      const data: JudgeResult = await res.json();
      setResult(data);
      setPhase('done');
      onScore?.({ correct: data.isCorrect ? 1 : 0, total: 1 });
    } catch {
      setPhase('error');
    } finally {
      clearTimeout(timer);
    }
  };

  judgeRef.current = judge;
  const locked = phase === 'judging' || phase === 'done';

  const hintLabel = mode === 'continue' ? t('grammar.practice_continue_hint', lang) : t('grammar.practice_imitate_hint', lang);

  return (
    <div>
      {/* 要用的语法 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-pink-strong)', background: 'var(--color-pink-soft)', padding: '3px 10px', borderRadius: 99 }}>
          {t('grammar.practice_write_target', lang)}
        </span>
        <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>{grammarPoint}</span>
      </div>

      {/* 例句 / 开头句 */}
      <div style={{ padding: '12px 14px', borderRadius: 14, background: 'var(--bg-muted)', border: '1px solid var(--border-default)', marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          {stem.context ? `${hintLabel} · ${stem.context}` : hintLabel}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.6, color: 'var(--text-primary)' }}>{stem.ko}</div>
            <div style={{ fontSize: 12.5, color: 'var(--text-muted)', marginTop: 2 }}>{stem.zh}</div>
          </div>
          <button onClick={() => speak(stem.ko)} className="gr-card-play sm" aria-label={t('gsess.play_audio', lang)} style={{ flexShrink: 0 }}><Volume2 size={13} /></button>
        </div>
      </div>

      {/* 换词槽 / 作答提示（题库题才有）*/}
      {(swapHint || continueHint) && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '10px 12px', borderRadius: 12, background: 'var(--color-mint-soft)', marginBottom: 12 }}>
          <span style={{ fontSize: 14, flexShrink: 0 }}>{mode === 'imitate' ? '🔤' : '💡'}</span>
          <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{swapHint || continueHint}</span>
        </div>
      )}

      {/* 输入 · 桌面 App 接管输入(显示区 + 常驻可点击键盘);手机用系统输入法 */}
      {isDesktop ? (
        <div
          {...ime.keyProps}
          role="textbox"
          aria-label={t('grammar.practice_write_placeholder', lang)}
          style={{
            width: '100%', padding: '12px 14px', borderRadius: 14, minHeight: 54,
            fontSize: 16, fontWeight: 600, lineHeight: 1.6, color: 'var(--text-primary)',
            background: 'var(--bg-card)', border: '1.5px solid var(--border-default)', outline: 'none',
            boxSizing: 'border-box', display: 'flex', alignItems: 'center', flexWrap: 'wrap',
            cursor: 'text', pointerEvents: locked ? 'none' : 'auto', opacity: locked ? 0.6 : 1,
          }}
        >
          {text ? <span>{text}</span> : <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{t('grammar.practice_write_placeholder', lang)}</span>}
          <span aria-hidden style={{ display: 'inline-block', width: 2, height: 22, marginLeft: 2, background: 'var(--color-pink-strong)', animation: 'dictCaretBlink 1s step-end infinite' }} />
        </div>
      ) : (
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={locked}
          placeholder={t('grammar.practice_write_placeholder', lang)}
          rows={2}
          maxLength={200}
          style={{ width: '100%', padding: '12px 14px', borderRadius: 14, fontSize: 16, fontWeight: 600, lineHeight: 1.6, color: 'var(--text-primary)', background: 'var(--bg-card)', border: '1.5px solid var(--border-default)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
        />
      )}
      {text.length > 0 && (
        <div style={{ textAlign: 'right', fontSize: 11, color: text.length >= 180 ? 'var(--color-status-danger)' : 'var(--text-muted)', marginTop: 4 }}>{text.length}/200</div>
      )}
      {!isDesktop && <div style={{ marginTop: 8 }}><KeyboardHint /></div>}
      {isDesktop && !locked && (
        <div style={{ marginTop: 10 }}>
          <KoreanKeyboardDisplay composingText={text} pressedKey={ime.pressedKey} onJamo={ime.inputJamo} onBackspace={ime.backspace} onSpace={ime.space} />
        </div>
      )}

      {/* 提示信息（未登录/超额/报错） */}
      {(phase === 'login' || phase === 'quota' || phase === 'error') && (
        <div style={{ margin: '10px 0 0' }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 8px' }}>
            {phase === 'login' ? t('grammar.practice_write_login', lang)
              : phase === 'quota' ? t('grammar.practice_write_quota', lang)
              : t('grammar.practice_write_error', lang)}
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {phase === 'login' && (
              <Link href="/auth/login?redirect=/grammar" style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-pink-base)', textDecoration: 'none', padding: '6px 14px', borderRadius: 99, background: 'var(--color-pink-soft)' }}>{t('grammar.practice_write_login_cta', lang)}</Link>
            )}
            {phase === 'quota' && (
              <Link href="/mine/membership" style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-pink-base)', textDecoration: 'none', padding: '6px 14px', borderRadius: 99, background: 'var(--color-pink-soft)' }}>{t('grammar.practice_write_upgrade_cta', lang)}</Link>
            )}
            {phase === 'error' && (
              <button onClick={() => { setPhase('writing'); judge(); }} style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-pink-base)', padding: '6px 14px', borderRadius: 99, background: 'var(--color-pink-soft)', border: 'none', cursor: 'pointer' }}>{t('grammar.practice_write_retry', lang)}</button>
            )}
          </div>
        </div>
      )}

      {/* 批改结果 */}
      {phase === 'done' && result && (
        <div style={{ marginTop: 14 }}>
          <SentenceJudgeResult result={result} userSentence={submitted} lang={lang} />
        </div>
      )}

      {/* 操作按钮 */}
      {phase !== 'done' && (
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button
            onClick={judge}
            disabled={!text.trim() || phase === 'judging'}
            style={{ flex: 1, padding: '11px 0', borderRadius: 99, fontSize: 14, fontWeight: 800, border: 'none', cursor: text.trim() && phase !== 'judging' ? 'pointer' : 'default', color: text.trim() ? 'var(--color-surface-1)' : 'var(--text-muted)', background: text.trim() ? 'var(--text-primary)' : 'var(--border-default)' }}>
            {phase === 'judging' ? t('grammar.practice_write_judging', lang) : t('grammar.practice_write_submit', lang)}
          </button>
        </div>
      )}

    </div>
  );
}
