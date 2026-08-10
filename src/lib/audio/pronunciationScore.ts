import { normalizeKorean } from '@/lib/koreanDiff';

export type PronunciationVerdict = 'correct' | 'acceptable' | 'wrong';

export interface PronunciationResult {
  [k: string]: unknown;
  score: number; // 0-100
  verdict: PronunciationVerdict;
}

// 归一化后按字符编辑距离算相似度（0-1）
export function koreanSimilarity(a: string, b: string): number {
  const na = normalizeKorean(a);
  const nb = normalizeKorean(b);
  if (na === nb) return 1;
  if (!na || !nb) return 0;
  const max = Math.max(na.length, nb.length);
  const dp: number[][] = Array.from({ length: na.length + 1 }, (_, i) =>
    Array.from({ length: nb.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= na.length; i++) {
    for (let j = 1; j <= nb.length; j++) {
      dp[i][j] =
        na[i - 1] === nb[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return 1 - dp[na.length][nb.length] / max;
}

export function scorePronunciation(spoken: string, target: string): PronunciationResult {
  const sim = koreanSimilarity(spoken, target);
  const verdict: PronunciationVerdict = sim >= 0.85 ? 'correct' : sim >= 0.6 ? 'acceptable' : 'wrong';
  return { score: Math.round(sim * 100), verdict };
}
