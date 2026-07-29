'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Copy, Check, Delete, ArrowUpFromLine } from 'lucide-react';
import { PageHeader, Section, Card, Button } from '@/components/ui';
import { composeBuffer, decomposeFull, qwertyKeyToJamo } from '@/lib/hangulCompose';
import { romanize } from '@/lib/dictionary';
import { useToast } from '@/hooks/useToast';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

// 두벌식 键盘布局（三行 + 底部功能行）
const ROWS_BASE: { key: string; jamo: string; shiftJamo?: string }[][] = [
  [
    { key: 'q', jamo: 'ㅂ', shiftJamo: 'ㅃ' },
    { key: 'w', jamo: 'ㅈ', shiftJamo: 'ㅉ' },
    { key: 'e', jamo: 'ㄷ', shiftJamo: 'ㄸ' },
    { key: 'r', jamo: 'ㄱ', shiftJamo: 'ㄲ' },
    { key: 't', jamo: 'ㅅ', shiftJamo: 'ㅆ' },
    { key: 'y', jamo: 'ㅛ' },
    { key: 'u', jamo: 'ㅕ' },
    { key: 'i', jamo: 'ㅑ' },
    { key: 'o', jamo: 'ㅐ', shiftJamo: 'ㅒ' },
    { key: 'p', jamo: 'ㅔ', shiftJamo: 'ㅖ' },
  ],
  [
    { key: 'a', jamo: 'ㅁ' },
    { key: 's', jamo: 'ㄴ' },
    { key: 'd', jamo: 'ㅇ' },
    { key: 'f', jamo: 'ㄹ' },
    { key: 'g', jamo: 'ㅎ' },
    { key: 'h', jamo: 'ㅗ' },
    { key: 'j', jamo: 'ㅓ' },
    { key: 'k', jamo: 'ㅏ' },
    { key: 'l', jamo: 'ㅣ' },
  ],
  [
    { key: 'z', jamo: 'ㅋ' },
    { key: 'x', jamo: 'ㅌ' },
    { key: 'c', jamo: 'ㅊ' },
    { key: 'v', jamo: 'ㅍ' },
    { key: 'b', jamo: 'ㅠ' },
    { key: 'n', jamo: 'ㅜ' },
    { key: 'm', jamo: 'ㅡ' },
  ],
];

const QUICK_PHRASES = [
  '안녕하세요',
  '감사합니다',
  '죄송합니다',
  '사랑해요',
  '맛있어요',
  '화이팅',
  '괜찮아요',
  '알겠습니다',
];

export default function KeyboardClient() {
  const { lang } = useLang();
  const [buffer, setBuffer] = useState<string[]>([]);
  const [shift, setShift] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  const composed = composeBuffer(buffer);
  const roman = composed ? romanize(composed) : '';

  const addJamo = useCallback((jamo: string) => {
    setBuffer((prev) => [...prev, jamo]);
    setShift(false);
  }, []);

  const doBackspace = useCallback(() => {
    setBuffer((prev) => (prev.length === 0 ? prev : prev.slice(0, -1)));
  }, []);

  const doSpace = useCallback(() => {
    setBuffer((prev) => [...prev, ' ']);
  }, []);

  const doClear = useCallback(() => {
    setBuffer([]);
    setShift(false);
  }, []);

  const insertPhrase = useCallback((phrase: string) => {
    setBuffer((prev) => [...prev, ...decomposeFull(phrase)]);
  }, []);

  const copyResult = useCallback(async () => {
    if (!composed) return;
    try {
      await navigator.clipboard.writeText(composed);
      setCopied(true);
      showToast(t('tools.copied', lang), 'success');
      setTimeout(() => setCopied(false), 1500);
    } catch {
      showToast(t('tools.copy_failed', lang), 'info');
    }
  }, [composed, showToast, lang]);

  // 物理键盘监听
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // 忽略在真正输入框内的按键（现在无 native input，但预防）
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;

      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Backspace') { e.preventDefault(); doBackspace(); return; }
      if (e.key === ' ') { e.preventDefault(); doSpace(); return; }
      if (e.key === 'Shift') { setShift(true); return; }
      if (e.key === 'Escape') { doClear(); return; }

      const jamo = qwertyKeyToJamo(e.key, e.shiftKey);
      if (jamo) {
        e.preventDefault();
        addJamo(jamo);
        setPressedKey(e.key.toLowerCase());
        setTimeout(() => setPressedKey(null), 120);
      }
    };
    const upHandler = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setShift(false);
    };
    window.addEventListener('keydown', handler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [addJamo, doBackspace, doSpace, doClear]);

  // 输出滚到底
  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [composed]);

  const keyStyle = (isPressed: boolean, isShift = false): React.CSSProperties => ({
    flex: 1,
    minWidth: 32,
    height: 44,
    borderRadius: 8,
    border: 'none',
    background: isPressed ? 'var(--color-pink-base, #ff7fa8)' : (isShift && shift ? 'var(--color-ink-1)' : '#fff'),
    color: isPressed || (isShift && shift) ? '#fff' : 'var(--color-ink-1)',
    boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.1s, color 0.1s',
    padding: 0,
  });

  return (
    <div className="py-4 max-w-2xl md:max-w-3xl mx-auto">
      <PageHeader
        eyebrow="도구"
        title={t('tools.kb_title', lang)}
        subtitle={t('tools.kb_subtitle', lang)}
        tone="pink"
      />

      {/* Output box */}
      <Section title={t('tools.kb_input_area', lang)} spacing="normal">
        <Card padding="md">
          <div
            ref={outputRef}
            style={{
              minHeight: 96,
              maxHeight: 200,
              overflow: 'auto',
              padding: 14,
              fontSize: 22,
              lineHeight: 1.5,
              border: '1px solid var(--color-line)',
              borderRadius: 10,
              background: 'var(--color-surface-2)',
              color: 'var(--color-ink-1)',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
          >
            {composed || <span style={{ color: 'var(--color-ink-4)', fontSize: 14 }}>{t('tools.kb_placeholder', lang)}</span>}
          </div>
          {roman && (
            <div style={{ marginTop: 8, padding: '6px 8px', fontSize: 12, color: 'var(--color-ink-3)', fontFamily: 'ui-monospace, monospace' }}>
              {t('tools.kb_roman_label', lang)}{roman}
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, gap: 8 }}>
            <Button
              variant="secondary"
              size="sm"
              onClick={doClear}
              disabled={buffer.length === 0}
            >
              {t('tools.kb_clear', lang)}
            </Button>
            <Button
              variant="primary"
              tone="black"
              size="sm"
              onClick={copyResult}
              disabled={!composed}
              icon={copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={1.75} />}
            >
              {copied ? t('tools.copied', lang) : t('tools.copy', lang)}
            </Button>
          </div>
        </Card>
      </Section>

      {/* Virtual keyboard */}
      <Section title={t('tools.kb_virtual', lang)} spacing="normal">
        <Card padding="md">
          <div style={{ background: 'var(--color-surface-2)', borderRadius: 12, padding: 10 }}>
            {ROWS_BASE.map((row, ri) => (
              <div key={ri} style={{ display: 'flex', gap: 5, marginBottom: 6, justifyContent: 'center' }}>
                {ri === 2 && (
                  <button
                    type="button"
                    onClick={() => setShift((s) => !s)}
                    aria-pressed={shift}
                    style={{ ...keyStyle(false, true), flex: 1.4, minWidth: 44 }}
                    aria-label="Shift"
                  >
                    <ArrowUpFromLine size={16} strokeWidth={2} />
                  </button>
                )}
                {row.map(({ key, jamo, shiftJamo }) => {
                  const displayed = shift && shiftJamo ? shiftJamo : jamo;
                  const isPressed = pressedKey === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => addJamo(displayed)}
                      style={keyStyle(isPressed)}
                    >
                      <span>{displayed}</span>
                      <span style={{ fontSize: 9, color: 'var(--color-ink-4)', fontWeight: 400, marginTop: 2 }}>
                        {key.toUpperCase()}
                      </span>
                    </button>
                  );
                })}
                {ri === 2 && (
                  <button
                    type="button"
                    onClick={doBackspace}
                    style={{ ...keyStyle(false), flex: 1.4, minWidth: 44 }}
                    aria-label={t('tools.kb_delete', lang)}
                  >
                    <Delete size={16} strokeWidth={1.75} />
                  </button>
                )}
              </div>
            ))}
            {/* Space row */}
            <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 4 }}>
              <button
                type="button"
                onClick={doSpace}
                style={{ ...keyStyle(false), flex: 6, minWidth: 200 }}
              >
                {t('tools.kb_space', lang)}
              </button>
            </div>
          </div>
          <p style={{ marginTop: 10, fontSize: 12, color: 'var(--color-ink-3)', lineHeight: 1.6 }}>
            {t('tools.kb_tip', lang)}
          </p>
        </Card>
      </Section>

      {/* Quick phrases */}
      <Section title={t('tools.kb_quick_phrases', lang)} spacing="normal">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {QUICK_PHRASES.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => insertPhrase(p)}
              style={{
                padding: '8px 12px',
                borderRadius: 999,
                border: '1px solid var(--color-line)',
                background: 'var(--color-surface-1)',
                color: 'var(--color-ink-1)',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </Section>

      {/* QWERTY 对照表 */}
      <Section title={t('tools.kb_qwerty_ref', lang)} spacing="normal">
        <Card padding="md">
          <div style={{ display: 'grid', gap: 6, fontSize: 13, lineHeight: 1.7, color: 'var(--color-ink-2)' }}>
            <p style={{ margin: 0 }}>
              <strong>{t('tools.kb_consonant', lang)}</strong>：Q=ㅂ W=ㅈ E=ㄷ R=ㄱ T=ㅅ；A=ㅁ S=ㄴ D=ㅇ F=ㄹ G=ㅎ；Z=ㅋ X=ㅌ C=ㅊ V=ㅍ
            </p>
            <p style={{ margin: 0 }}>
              <strong>{t('tools.kb_vowel', lang)}</strong>：Y=ㅛ U=ㅕ I=ㅑ O=ㅐ P=ㅔ；H=ㅗ J=ㅓ K=ㅏ L=ㅣ；B=ㅠ N=ㅜ M=ㅡ
            </p>
            <p style={{ margin: 0 }}>
              <strong>Shift</strong>：Q→ㅃ W→ㅉ E→ㄸ R→ㄲ T→ㅆ；O→ㅒ P→ㅖ
            </p>
          </div>
        </Card>
      </Section>
    </div>
  );
}
