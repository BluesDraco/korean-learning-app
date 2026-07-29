'use client';

import { useCallback, useState } from 'react';
import { useMicRecorder } from '@/lib/audio/useMicRecorder';
import { scorePronunciation, type PronunciationResult } from '@/lib/audio/pronunciationScore';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  ko: string;
  zh?: string;
  start: number;
  end: number;
  onPlaySegment: (start: number, end: number) => void;
  disabled?: boolean; // 无音频时禁用"听原句"
}

type Panel = 'none' | 'shadow' | 'grammar';

// 结构化语法剖析（对齐闪卡 GrammarExplainBubble：句型主干/助词/词尾变化/易错点）
interface GrammarParticle { text: string; role: string; }
interface GrammarEnding { text: string; base: string; meaning: string; }
interface GrammarExplain {
  skeleton: { subject: string; predicate: string; object: string };
  translation: string;
  particles: GrammarParticle[];
  endings: GrammarEnding[];
  pitfalls: string[];
}

export default function RadioLineExtras({ ko, zh, start, end, onPlaySegment, disabled }: Props) {
  const { lang } = useLang();
  const verdictText: Record<PronunciationResult['verdict'], string> = {
    correct: t('rlx.verdict_correct', lang),
    acceptable: t('rlx.verdict_acceptable', lang),
    wrong: t('rlx.verdict_wrong', lang),
  };
  const [panel, setPanel] = useState<Panel>('none');
  const [result, setResult] = useState<PronunciationResult | null>(null);
  const [heard, setHeard] = useState('');
  const [micError, setMicError] = useState('');

  // 语法剖析状态（结构化，调 /api/ai/grammar-explain）
  const [gram, setGram] = useState<GrammarExplain | null>(null);
  const [gramLoading, setGramLoading] = useState(false);
  // 错误分两类：retriable(网络/AI 抖动，可点重试) vs 不可重试(未登录——重点它只会再 401)
  const [gramError, setGramError] = useState<{ msg: string; retriable: boolean } | null>(null);

  const fetchGrammar = useCallback(async () => {
    setGramLoading(true);
    setGramError(null);
    try {
      const res = await fetch('/api/ai/grammar-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ sentence: ko, translation: zh }),
      });
      if (res.status === 401) { setGramError({ msg: t('rlx.gram_login', lang), retriable: false }); return; }
      const json = await res.json();
      if (!res.ok) { setGramError({ msg: json.error || t('rlx.gram_unavailable', lang), retriable: true }); return; }
      setGram(json);
    } catch {
      setGramError({ msg: t('rlx.gram_neterr', lang), retriable: true });
    } finally {
      setGramLoading(false);
    }
  }, [ko, zh, lang]);

  const mic = useMicRecorder({
    onResult: (text) => {
      setHeard(text);
      setResult(scorePronunciation(text, ko));
    },
    onError: (msg) => {
      setMicError(
        msg === 'denied'
          ? t('rlx.mic_denied', lang)
          : msg === 'unavailable'
            ? t('rlx.mic_unavailable', lang)
            : t('rlx.mic_error', lang),
      );
    },
  });

  const toggle = useCallback(
    (target: Panel) => {
      setPanel((cur) => {
        const next = cur === target ? 'none' : target;
        if (next !== 'shadow' && mic.state !== 'idle') mic.cancel();
        if (target === 'grammar' && next === 'grammar' && !gram && !gramLoading) {
          fetchGrammar();
        }
        return next;
      });
    },
    [gram, gramLoading, fetchGrammar, mic],
  );

  const onRecordClick = useCallback(() => {
    setMicError('');
    if (mic.state === 'recording') {
      mic.stop();
    } else if (mic.state === 'idle') {
      setResult(null);
      setHeard('');
      mic.start();
    }
  }, [mic]);

  return (
    <div className="radio-line-extras" onClick={(e) => e.stopPropagation()}>
      <div className="radio-line-icons">
        <button
          type="button"
          className="radio-line-icon"
          onClick={() => onPlaySegment(start, end)}
          disabled={disabled}
          aria-label={t('rlx.listen_aria', lang)}
        >
          <span aria-hidden="true">🔊</span> {t('rlx.listen', lang)}
        </button>
        <button
          type="button"
          className={`radio-line-icon${panel === 'shadow' ? ' radio-active' : ''}`}
          onClick={() => toggle('shadow')}
          aria-label={t('rlx.shadow_aria', lang)}
          aria-expanded={panel === 'shadow'}
        >
          <span aria-hidden="true">🎙</span> {t('rlx.shadow', lang)}
        </button>
        <button
          type="button"
          className={`radio-line-icon${panel === 'grammar' ? ' radio-active' : ''}`}
          onClick={() => toggle('grammar')}
          aria-label={t('rlx.grammar_aria', lang)}
          aria-expanded={panel === 'grammar'}
        >
          <span aria-hidden="true">✦</span> {t('rlx.grammar', lang)}
        </button>
      </div>

      {panel === 'shadow' && (
        <div className="radio-line-panel radio-shadow-panel">
          <div className="radio-shadow-row">
            <button
              type="button"
              className="radio-shadow-btn"
              onClick={() => onPlaySegment(start, end)}
              disabled={disabled}
            >
              ▶ {t('rlx.play_original', lang)}
            </button>
            <button
              type="button"
              className={`radio-shadow-btn radio-shadow-rec${mic.state === 'recording' ? ' radio-recording' : ''}`}
              onClick={onRecordClick}
              disabled={mic.state === 'recognizing'}
            >
              {mic.state === 'recording' ? `■ ${t('rlx.stop', lang)}` : mic.state === 'recognizing' ? t('rlx.recognizing', lang) : `● ${t('rlx.record', lang)}`}
            </button>
          </div>
          {micError && <div className="radio-shadow-err">{micError}</div>}
          {result && (
            <div className={`radio-shadow-result radio-v-${result.verdict}`}>
              <span className="radio-shadow-score">{result.score}</span>
              <span className="radio-shadow-verdict">{verdictText[result.verdict]}</span>
              {heard && <span className="radio-shadow-heard">{t('rlx.heard', lang, { text: heard })}</span>}
            </div>
          )}
        </div>
      )}

      {panel === 'grammar' && (
        <div className="radio-line-panel radio-gram-panel">
          {gramLoading && <div className="radio-gram-loading">{t('rlx.gram_loading', lang)}</div>}
          {gramError && (
            gramError.retriable ? (
              <button type="button" className="radio-gram-retry" onClick={fetchGrammar}>
                {gramError.msg}
              </button>
            ) : (
              <div className="radio-gram-loading">{gramError.msg}</div>
            )
          )}
          {gram && (
            <div className="radio-gram-body">
              {/* 句型主干 */}
              <section className="radio-gram-block">
                <div className="radio-gram-label">{t('rlx.gram_skeleton', lang)}</div>
                <div className="radio-gram-skeleton">
                  {gram.skeleton.subject && (
                    <span className="radio-gram-tok">
                      <span className="radio-gram-tok-role">{t('rlx.gram_subject', lang)}</span>
                      <span className="radio-gram-tok-ko">{gram.skeleton.subject}</span>
                    </span>
                  )}
                  {gram.skeleton.object && (
                    <span className="radio-gram-tok">
                      <span className="radio-gram-tok-role">{t('rlx.gram_object', lang)}</span>
                      <span className="radio-gram-tok-ko">{gram.skeleton.object}</span>
                    </span>
                  )}
                  {gram.skeleton.predicate && (
                    <span className="radio-gram-tok radio-gram-tok-hi">
                      <span className="radio-gram-tok-role">{t('rlx.gram_predicate', lang)}</span>
                      <span className="radio-gram-tok-ko">{gram.skeleton.predicate}</span>
                    </span>
                  )}
                </div>
                {gram.translation && <div className="radio-gram-trans">→ {gram.translation}</div>}
              </section>

              {/* 助词 */}
              {gram.particles.length > 0 && (
                <section className="radio-gram-block">
                  <div className="radio-gram-label radio-gram-label-pink">{t('rlx.gram_particles', lang)}</div>
                  <div className="radio-gram-particles">
                    {gram.particles.map((p, i) => (
                      <span key={i} className="radio-gram-particle">
                        <span className="radio-gram-particle-ko">{p.text}</span>
                        <span className="radio-gram-particle-role">{p.role}</span>
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* 词尾变化 */}
              {gram.endings.length > 0 && (
                <section className="radio-gram-block">
                  <div className="radio-gram-label">{t('rlx.gram_endings', lang)}</div>
                  <div className="radio-gram-endings">
                    {gram.endings.map((e, i) => (
                      <div key={i} className="radio-gram-ending">
                        <span className="radio-gram-ending-ko">{e.text}</span>
                        <span className="radio-gram-ending-base">← {e.base}</span>
                        <span className="radio-gram-ending-mean">{e.meaning}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 易错点 */}
              {gram.pitfalls.length > 0 && (
                <section className="radio-gram-block">
                  <div className="radio-gram-label radio-gram-label-gold">{t('rlx.gram_pitfalls', lang)}</div>
                  <ul className="radio-gram-pitfalls">
                    {gram.pitfalls.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
