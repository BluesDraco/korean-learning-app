'use client';

import { Volume2 } from 'lucide-react';
import { speak } from '@/lib/tts';
import { t } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';

export interface JudgeResult {
  [k: string]: unknown;
  isCorrect: boolean;
  score: number;
  wrongPart: string;
  correctPart: string;
  explanation: string;
  betterWay: string;
  userTranslation: string;
  betterTranslation: string;
  improvement: string;
}

// 复用 review 页造句反馈面板：状态行 + 你的句子 + 更地道 + 解析。
// 走 CSS var，明暗自适应。userSentence 直接传原字符串（不从词块索引算）。
export function SentenceJudgeResult({ result, userSentence, lang }: { result: JudgeResult; userSentence: string; lang: Lang }) {
  const same = result.betterWay && result.betterWay.replace(/\s/g, '') === userSentence.replace(/\s/g, '');
  return (
    <div className="rounded-2xl p-4 space-y-3.5"
      style={{ background: result.isCorrect ? 'var(--bg-muted)' : 'var(--bg-soft)', border: `1px solid ${result.isCorrect ? 'var(--color-mint-soft)' : 'var(--color-pink-soft)'}` }}>
      <div className="flex items-center gap-2">
        <span className="text-lg leading-none">{result.isCorrect ? '✅' : '❌'}</span>
        <span className="text-sm font-black" style={{ color: result.isCorrect ? 'var(--color-mint-strong)' : 'var(--color-pink-strong)' }}>
          {result.isCorrect ? t('review.sentence_correct_label', lang) : t('review.sentence_needs_improvement_label', lang)}
        </span>
        <span className="text-xs ml-auto" style={{ color: 'var(--text-muted)' }}>{t('review.sentence_score', lang, { n: String(result.score) })}</span>
      </div>

      <div>
        <div className="text-[10px] font-bold mb-1" style={{ letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t('grammar.practice_your_sentence', lang)}</div>
        <div className="grid gap-2" style={{ gridTemplateColumns: '1fr auto' }}>
          <div className="min-w-0">
            <div className="text-[13.5px] font-bold leading-relaxed break-words" style={{ color: 'var(--text-primary)' }}>{userSentence}</div>
            {result.userTranslation && (
              <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{result.userTranslation}</div>
            )}
          </div>
          <button onClick={() => speak(userSentence)} className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 self-start"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--color-pink-base)' }} aria-label={t('gsess.read_your_sentence', lang)}>
            <Volume2 size={14} />
          </button>
        </div>
      </div>

      {result.betterWay && !same && (
        <div>
          <div className="flex items-baseline gap-2 flex-wrap mb-1">
            <span className="text-[10px] font-bold" style={{ letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-mint-strong)' }}>{t('grammar.practice_better_way', lang)}</span>
            {result.improvement && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(174,227,216,.25)', color: 'var(--color-mint-strong)' }}>
                {result.improvement}
              </span>
            )}
          </div>
          <div className="grid gap-2" style={{ gridTemplateColumns: '1fr auto' }}>
            <div className="min-w-0">
              <div className="text-[13.5px] font-bold leading-relaxed break-words" style={{ color: 'var(--color-mint-strong)' }}>{result.betterWay}</div>
              {result.betterTranslation && (
                <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{result.betterTranslation}</div>
              )}
            </div>
            <button onClick={() => speak(result.betterWay)} className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 self-start"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', color: 'var(--color-mint-strong)' }} aria-label={t('gsess.read_better_way', lang)}>
              <Volume2 size={14} />
            </button>
          </div>
        </div>
      )}

      {result.explanation && (
        <p className="text-[12.5px] leading-relaxed pt-2" style={{ color: 'var(--text-secondary)', borderTop: '1px dashed var(--border-default)' }}>
          💡 {result.explanation}
        </p>
      )}
    </div>
  );
}
