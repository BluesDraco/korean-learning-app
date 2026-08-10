'use client';

import { Volume2, Check, ThumbsUp, X } from 'lucide-react';
import { speak } from '@/lib/tts';
import { getAlignedDiff } from '@/lib/koreanDiff';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '../../app/practice/practice-redesign.css';
import '../../app/practice/practice-flow.css';

export type FeedbackVerdict = 'correct' | 'acceptable' | 'wrong';

interface PracticeFeedbackCardProps {
  [k: string]: unknown;
  verdict: FeedbackVerdict;
  /** 0-100 分数(可选) */
  score?: number;
  scoreUnit?: string;
  /** 用户输出(说/写/打的) */
  yourValue: string;
  /** 标准答案 */
  target: string;
  /** 其他说法(可选) */
  alternatives?: string[];
  /** 错在哪(可选) */
  reason?: string | null;
  /** 小提示(可选) */
  tip?: string | null;
  /** 相关语法(可选) */
  grammar?: string | null;
  /** 主 CTA · "下一题" / "查看结果" */
  onNext?: () => void;
  nextLabel?: string;
  /** 副 CTA · "再说一次" */
  onRetry?: () => void;
  retryLabel?: string;
  /** 你的值的标签,默认"你说的" */
  yourLabel?: string;
  /** 是否播放 TTS(听说/写作可用,打字不需要) */
  ttsEnabled?: boolean;
  /** 跟读对照的逐字音素提示(可选,如"함→합：尾音 ㅁ→ㅂ") */
  phonemeNotes?: string[];
  /**
   * 是否逐字标红对照。仅跟读(shadow)场景开启——目标与识别文本应逐字对应。
   * 自由表达(看中文说韩语)场景关闭:同义替换会整行标红,与"基本正确"矛盾。
   */
  showCharDiff?: boolean;
}

/** LCS 对齐逐字对照：错字红波浪线、多说的字灰删除线、漏说的字标为占位 */
function renderDiff(user: string, target: string) {
  const { cells } = getAlignedDiff(user, target);
  return cells.map((cell, i) => {
    if (cell.status === 'ok') {
      return <span key={i} style={{ color: 'var(--hr-ink-1)' }}>{cell.char}</span>;
    }
    if (cell.status === 'ins') {
      // 用户多说的字：灰色删除线
      return (
        <span key={i} style={{ color: 'var(--hr-ink-3)', textDecoration: 'line-through', opacity: 0.7 }}>
          {cell.char}
        </span>
      );
    }
    if (cell.status === 'missing') {
      // 用户漏说的字：以标准字提示，虚线框
      return (
        <span
          key={i}
          style={{
            color: 'var(--hr-pink-strong)', opacity: 0.6,
            border: '1px dashed var(--hr-pink-strong)', borderRadius: 4,
            padding: '0 2px', margin: '0 1px',
          }}
        >
          {cell.char}
        </span>
      );
    }
    // sub：读错的字，红色波浪线
    return (
      <span
        key={i}
        style={{
          color: 'var(--hr-pink-strong)',
          textDecoration: 'underline wavy',
          textDecorationSkipInk: 'none',
        }}
      >
        {cell.char}
      </span>
    );
  });
}

const VERDICT_META = {
  correct:    { label: 'prac.fb_correct',    Icon: Check },
  acceptable: { label: 'prac.fb_acceptable', Icon: ThumbsUp },
  wrong:      { label: 'prac.fb_wrong',      Icon: X },
};

export function PracticeFeedbackCard({
  verdict,
  score,
  scoreUnit,
  yourValue,
  target,
  alternatives = [],
  reason,
  tip,
  grammar,
  onNext,
  nextLabel,
  onRetry,
  retryLabel,
  yourLabel,
  ttsEnabled = true,
  phonemeNotes,
  showCharDiff = false,
}: PracticeFeedbackCardProps) {
  const { lang } = useLang();
  const meta = VERDICT_META[verdict];
  const Icon = meta.Icon;
  const scoreUnitText = scoreUnit || t('prac.fb_score_unit', lang);
  const nextText = nextLabel || t('prac.fb_next', lang);
  const retryText = retryLabel || t('prac.fb_retry', lang);
  const yourLabelText = yourLabel || t('prac.fb_your_label', lang);

  return (
    <div className="pr-fb" role="region" aria-label={t('prac.fb_aria', lang, { label: t(meta.label, lang) })}>
      <div className={`pr-fb-head ${verdict}`}>
        <span className="pr-fb-icon" aria-hidden><Icon size={16} strokeWidth={2.5} /></span>
        <span className="pr-fb-label">{t(meta.label, lang)}</span>
        {typeof score === 'number' && (
          <span className="pr-fb-score">
            {score}<span className="pr-fb-score-unit">{scoreUnitText}</span>
          </span>
        )}
      </div>

      <div className="pr-fb-triple">
        {verdict !== 'correct' && (
          <div className="pr-fb-row">
            <span className="pr-fb-row-label">{yourLabelText}</span>
            <span className="pr-fb-row-value">
              {yourValue ? (showCharDiff ? renderDiff(yourValue, target) : yourValue) : t('prac.fb_no_answer', lang)}
            </span>
            <span aria-hidden />
          </div>
        )}
        <div className="pr-fb-row">
          <span className="pr-fb-row-label">{t('prac.fb_standard', lang)}</span>
          <span className="pr-fb-row-value target">{target}</span>
          {ttsEnabled ? (
            <button className="pr-fb-tts-btn" onClick={() => speak(target)} aria-label={t('prac.fb_tts_standard_aria', lang)}>
              <Volume2 size={15} />
            </button>
          ) : <span aria-hidden />}
        </div>
        {alternatives.length > 0 && (
          <div className="pr-fb-row">
            <span className="pr-fb-row-label">{t('prac.fb_other', lang)}</span>
            <div className="pr-fb-alt-chips">
              {alternatives.map((alt, i) => (
                <button
                  key={i}
                  className="pr-fb-alt-chip"
                  onClick={() => ttsEnabled && speak(alt)}
                  aria-label={ttsEnabled ? t('prac.fb_read_aria', lang, { alt }) : alt}
                  type="button"
                >
                  {alt}
                  {ttsEnabled && <Volume2 size={11} />}
                </button>
              ))}
            </div>
            <span aria-hidden />
          </div>
        )}
      </div>

      {showCharDiff && verdict !== 'correct' && phonemeNotes && phonemeNotes.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
          {phonemeNotes.map((note, i) => (
            <span
              key={i}
              style={{
                fontSize: 12, color: 'var(--hr-ink-2)', fontWeight: 600,
                background: 'var(--hr-surface-3)', border: '1px solid var(--hr-border-2)',
                borderRadius: 8, padding: '4px 10px', fontFamily: 'var(--hr-hangul)',
              }}
            >
              {note}
            </span>
          ))}
        </div>
      )}

      {(reason || tip || grammar) && <hr className="pr-fb-sep" />}

      {(reason || tip || grammar) && (
        <div className="pr-fb-blocks">
          {reason && (
            <div className="pr-fb-block reason">
              <span className="pr-fb-block-icon" aria-hidden>🔍</span>
              <div className="pr-fb-block-body">
                <h3 className="pr-fb-block-title">{t('prac.fb_block_wrong', lang)}</h3>
                <p className="pr-fb-block-text">{reason}</p>
              </div>
            </div>
          )}
          {tip && (
            <div className="pr-fb-block tip">
              <span className="pr-fb-block-icon" aria-hidden>💡</span>
              <div className="pr-fb-block-body">
                <h3 className="pr-fb-block-title">{t('prac.fb_block_tip', lang)}</h3>
                <p className="pr-fb-block-text">{tip}</p>
              </div>
            </div>
          )}
          {grammar && (
            <div className="pr-fb-block grammar">
              <span className="pr-fb-block-icon" aria-hidden>📖</span>
              <div className="pr-fb-block-body">
                <h3 className="pr-fb-block-title">{t('prac.fb_block_grammar', lang)}</h3>
                <p className="pr-fb-block-text">{grammar}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {(onNext || (onRetry && verdict !== 'correct')) && (
        <div className="pr-fb-actions">
          {onRetry && verdict !== 'correct' && (
            <button className="pr-fb-btn secondary" onClick={onRetry}>{retryText}</button>
          )}
          {onNext && <button className="pr-fb-btn primary" onClick={onNext}>{nextText}</button>}
        </div>
      )}
    </div>
  );
}
