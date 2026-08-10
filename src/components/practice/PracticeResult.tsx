'use client';

import { type ReactNode } from 'react';
import { Trophy } from 'lucide-react';
import { type PracticeTone } from './PracticeSessionShell';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '../../app/practice/practice-redesign.css';
import '../../app/practice/practice-session.css';

export interface PracticeResultStat { num: number | string; label: string; }

interface PracticeResultProps {
  tone: PracticeTone;
  /** 主分数(0-100 或纯数字如 WPM) */
  score: number;
  /** 分数单位(% / WPM 等) */
  scoreUnit?: string;
  /** 一句话概括 */
  caption?: string;
  /** 3 个小指标 */
  stats?: PracticeResultStat[];
  /** XP 奖励(≥1 时显示 pill) */
  xp?: number;
  /** 主按钮 */
  primaryLabel: string;
  onPrimary: () => void;
  /** 副按钮 */
  secondaryLabel?: string;
  onSecondary?: () => void;
  /** 底部软引导(如 PracticeNextHint) */
  footer?: ReactNode;
}

export function PracticeResult({
  tone,
  score,
  scoreUnit = '%',
  caption,
  stats = [],
  xp = 0,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  footer,
}: PracticeResultProps) {
  const { lang } = useLang();
  return (
    <div className="pr-scope">
      <div className={`pr-result ${tone}`} role="region" aria-label={t('prac.result_aria', lang)}>
        <div className="pr-result-trophy" aria-hidden>
          <Trophy size={44} strokeWidth={1.75} />
        </div>

        <div>
          <span className="pr-result-score">{score}</span>
          {scoreUnit && <span className="pr-result-score-unit">{scoreUnit}</span>}
        </div>

        {caption && <p className="pr-result-caption">{caption}</p>}

        {stats.length > 0 && (
          <div className="pr-result-stats">
            {stats.map((s, i) => (
              <div key={i} className="pr-result-stat">
                <div className="pr-result-stat-num">{s.num}</div>
                <div className="pr-result-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {xp > 0 && (
          <div className="pr-result-xp">{t('prac.result_xp_earned', lang, { n: xp })}</div>
        )}

        <div className="pr-result-foot">
          {footer}
          <div className="pr-result-actions">
            <button className="pr-ss-cta" onClick={onPrimary}>{primaryLabel}</button>
            {secondaryLabel && onSecondary && (
              <button className="pr-ss-cta ghost" onClick={onSecondary}>{secondaryLabel}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
