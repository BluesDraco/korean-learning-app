'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Trophy, RotateCcw, BookOpen, ChevronRight, Award, Headphones, FileText, Eye, EyeOff, Clock, Target } from 'lucide-react';
import type { TopikQuestion, TopikSection } from '@/data/topik-questions';
import { loadTopikQuestionsByIds, loadTopikSections } from '@/lib/dataLoader';
import { questionTypeMap } from '@/data/topikQuestionTypes';
import Link from 'next/link';
import { estimateGrade, getScoring, type TopikLevel, type ExamMode } from '@/lib/topik/examRules';
import { saveProgress, loadProgress, TTL_EXAM } from '@/lib/progress-storage';
import { useToast } from '@/hooks/useToast';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '../../topik-redesign.css';
import './result-rail.css';

interface ResultData {
  sectionId: string;
  examSetId?: string;
  examRound?: number;
  level?: 'I' | 'II';
  mode: string;
  examMode?: ExamMode;
  score: number;
  correctCount: number;
  totalCount: number;
  officialTotalQuestions?: number;  // 真实满分基准（含数据缺失题）
  durationSec: number;
  wrongQuestionIds: string[];
  allQuestionIds?: string[];
  answers?: [string, number][];
  masterySnapshot?: Record<string, { attempts: number; correct: number }>;
  dbWriteFailed?: boolean;  // 交卷时 DB 写失败 → 结果页提示"未存入记录"
}

export default function TopikResultPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { lang } = useLang();
  const router = useRouter();
  const { showToast } = useToast();
  const [result, setResult] = useState<ResultData | null>(null);
  const [allQuestions, setAllQuestions] = useState<TopikQuestion[]>([]);
  const [topikSections, setTopikSections] = useState<TopikSection[]>([]);
  const [showAllReview, setShowAllReview] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    let alive = true;
    (async () => {
      const saved = loadProgress<ResultData>(`topik-result-${sessionId}`);
      if (!saved) {
        showToast(t('topik.rs_result_expired', lang), 'error');
        router.replace('/topik');
        return;
      }
      const ids = Array.from(new Set([...(saved.allQuestionIds || []), ...(saved.wrongQuestionIds || [])]));
      const [qs, secs] = await Promise.all([
        loadTopikQuestionsByIds(ids),
        loadTopikSections(),
      ]);
      if (!alive) return;
      setAllQuestions(qs);
      setTopikSections(secs);
      setResult(saved);
      // 交卷时 DB 写失败：成绩已算出可看，但没能存进历史/错题本，提示用户
      if (saved.dbWriteFailed) showToast(t('topik.rs_save_failed', lang), 'error');
    })().catch(() => { if (alive) router.replace('/topik'); });
    return () => { alive = false; };
  }, [sessionId, router, showToast, lang]);

  const allTargets = useMemo(() => {
    if (!result?.allQuestionIds) return [];
    return result.allQuestionIds.map(id => allQuestions.find(q => q.id === id)).filter(Boolean) as TopikQuestion[];
  }, [result, allQuestions]);

  const wrongQuestions = useMemo(() => {
    if (!result) return [];
    return result.wrongQuestionIds.map(id => allQuestions.find(q => q.id === id)).filter(Boolean) as TopikQuestion[];
  }, [result, allQuestions]);

  const answersMap = useMemo(() => new Map(result?.answers || []), [result]);

  // 听阅分数（仅真题模式有意义）
  const sectionStats = useMemo(() => {
    if (!result || allTargets.length === 0) return null;
    const listenTargets = allTargets.filter(q => q.section === 'listening');
    const readTargets   = allTargets.filter(q => q.section === 'reading');
    const correctOf = (arr: TopikQuestion[]) =>
      arr.reduce((acc, q) => acc + (answersMap.get(q.id) === q.correctIdx ? 1 : 0), 0);
    return {
      listening: { correct: correctOf(listenTargets), total: listenTargets.length, score: correctOf(listenTargets) * 2 },
      reading:   { correct: correctOf(readTargets),   total: readTargets.length,   score: correctOf(readTargets) * 2 },
    };
  }, [allTargets, answersMap, result]);

  // 题型正确率 + 掌握率变化（对比 masterySnapshot 里存的"结算前累计"）
  const typeStats = useMemo(() => {
    if (!result || allTargets.length === 0) return [];
    const byType = new Map<string, { correct: number; total: number; sample: string }>();
    allTargets.forEach(q => {
      const t = q.questionType || 'unknown';
      const cur = byType.get(t) || { correct: 0, total: 0, sample: q.testPoint || q.topic || '' };
      cur.total++;
      if (answersMap.get(q.id) === q.correctIdx) cur.correct++;
      byType.set(t, cur);
    });
    const snap = result.masterySnapshot || {};
    return Array.from(byType.entries())
      .map(([type, v]) => {
        const rate = v.total ? v.correct / v.total : 0;
        const prev = snap[type];
        // prev 是本 session 结算前的累计。本次结算后：attempts += v.total, correct += v.correct
        const oldRate = prev && prev.attempts > 0 ? prev.correct / prev.attempts : -1;
        const newAttempts = (prev?.attempts || 0) + v.total;
        const newCorrect = (prev?.correct || 0) + v.correct;
        const newRate = newAttempts > 0 ? newCorrect / newAttempts : 0;
        return { type, ...v, rate, oldRate, newRate, hasHistory: prev !== undefined };
      })
      .sort((a, b) => a.rate - b.rate);
  }, [allTargets, answersMap, result]);

  if (!result) {
    return (
      <div className="tk-scope">
        <div className="tk-fullpage-msg">
          <div className="hint">{t('topik.loading', lang)}</div>
        </div>
      </div>
    );
  }

  const isRealExam = result.examMode != null;
  const level = (result.level || 'I') as TopikLevel;
  const scoring = getScoring(level);
  // 数据缺失警示：本次实际可做题数 < 申报题数
  const missingCount = isRealExam && result.officialTotalQuestions
    ? Math.max(0, result.officialTotalQuestions - result.totalCount)
    : 0;
  const grade = isRealExam ? estimateGrade(level, result.score) : null;
  const mins = Math.floor(result.durationSec / 60);
  const secs = result.durationSec % 60;
  const sectionInfo = topikSections.find(s => s.id === result.sectionId);
  const title = isRealExam ? t('topik.exam_set_default', lang, { round: result.examRound ?? 0, level: result.level ?? '' }) : (sectionInfo?.title || t('topik.ex_stage_practice', lang));

  function practiceMistakes() {
    if (!result || result.wrongQuestionIds.length === 0) return;
    const newSessionId = crypto.randomUUID();
    saveProgress(`topik-exam-${newSessionId}`, {
      sectionId: 'mistakes-review',
      questionIds: result.wrongQuestionIds,
      mode: 'mistakes',
      timeLeft: -1,
      idx: 0,
      answers: [],
      startedAt: Date.now(),
    }, TTL_EXAM);
    router.push(`/topik/exam/${newSessionId}`);
  }

  return (
    <div className="tk-scope">
      <div className="tk-result-layout">
      <div className="tk-result-col">
      <div className="hr-stage" style={{ maxWidth: 780, margin: '0 auto' }}>

        <div className="hr-mobile-back">
          <button className="hr-mobile-back-btn" onClick={() => router.replace('/topik')} aria-label={t('topik.back', lang)}>
            <ArrowLeft size={14} /> {t('topik.back_topik', lang)}
          </button>
        </div>

        <header className="hr-page-head">
          <div className="hr-brand">
            <div className="hr-brand-mark">Tori</div>
            <div className="hr-brand-kr">결과</div>
            <div className="hr-brand-sub">{isRealExam ? t('topik.rs_exam_result', lang) : t('topik.rs_practice_result', lang)}</div>
          </div>
          <div className="hr-brand-sub" data-md-show>{title}</div>
        </header>

        {/* 主分数卡 */}
        {isRealExam ? (
          <div className="tk-result-hero">
            <span className={`tk-result-badge ${grade?.grade ? 'pass' : 'fail'}`}>
              <Award size={36} />
            </span>
            <p className="tk-result-label">{t('topik.rs_est_level', lang)}</p>
            <h2 className={`tk-result-grade${grade?.grade ? '' : ' muted'}`}>{grade?.label}</h2>
            <p className="tk-result-sub">{t('topik.rs_time_ref', lang, { m: mins, s: secs.toString().padStart(2, '0') })}</p>

            <div className="tk-result-score">
              {result.score}<span className="unit">/ {scoring.maxScore}</span>
            </div>
            <p className="tk-result-total">
              {t('topik.rs_answered_of', lang, { correct: result.correctCount, total: result.totalCount, per: scoring.perQuestion })}
            </p>
            {missingCount > 0 && (
              <p className="tk-result-warn">
                {t('topik.rs_missing_warn', lang, { n: missingCount })}
              </p>
            )}

            {sectionStats && (
              <div className="tk-section-scores">
                <div className="tk-section-score listening">
                  <div className="head"><Headphones size={13} /><span>{t('topik.st_listening', lang)}</span></div>
                  <p className="num">{sectionStats.listening.score}</p>
                  <p className="meta">{sectionStats.listening.correct}/{sectionStats.listening.total}{t('topik.pt_rail_pool_unit', lang)}</p>
                </div>
                <div className="tk-section-score reading">
                  <div className="head"><FileText size={13} /><span>{t('topik.st_reading', lang)}</span></div>
                  <p className="num">{sectionStats.reading.score}</p>
                  <p className="meta">{sectionStats.reading.correct}/{sectionStats.reading.total}{t('topik.pt_rail_pool_unit', lang)}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="tk-result-hero">
            <span className={`tk-result-badge ${result.score >= 60 ? 'pass' : 'fail'}`}>
              {result.score >= 60 ? <Trophy size={36} /> : <RotateCcw size={36} />}
            </span>
            <h2 className="tk-result-title">{result.score >= 60 ? t('topik.rs_pass_title', lang) : t('topik.rs_fail_title', lang)}</h2>
            <p className="tk-result-sub">{t('topik.rs_sub_time', lang, { title: sectionInfo?.title || '', m: mins, s: secs.toString().padStart(2, '0') })}</p>
            <div className={`tk-result-score big ${result.score >= 60 ? 'mint' : 'pink'}`}>{result.score}<span className="unit">/ 100</span></div>

            <div className="tk-quick-stats">
              <div className="tk-quick-stat mint">
                <div className="num">{result.correctCount}</div>
                <div className="label">{t('topik.rs_correct', lang)}</div>
              </div>
              <div className="tk-quick-stat pink">
                <div className="num">{result.totalCount - result.correctCount}</div>
                <div className="label">{t('topik.rs_wrong', lang)}</div>
              </div>
              <div className="tk-quick-stat">
                <div className="num">{result.totalCount}</div>
                <div className="label">{t('topik.rs_total_q', lang)}</div>
              </div>
            </div>
          </div>
        )}

        {/* 题型表现 */}
        {typeStats.length > 0 && (
          <div className="tk-card">
            <div className="tk-card-head">
              <p className="tk-card-title">{t('topik.rs_type_perf', lang)}</p>
              <span className="tk-card-hint">{t('topik.rs_type_perf_hint', lang)}</span>
            </div>
            <div className="tk-type-perf-list">
              {typeStats.slice(0, 8).map(s => {
                const meta = questionTypeMap[s.type];
                const label = (meta ? (lang === 'en' ? meta.labelZhEn ?? meta.labelZh : meta.labelZh) : undefined) || prettyType(s.type);
                const oldPct = s.oldRate >= 0 ? Math.round(s.oldRate * 100) : null;
                const newPct = Math.round(s.newRate * 100);
                const delta = oldPct !== null ? newPct - oldPct : null;
                const fillCls = s.rate >= 0.7 ? 'high' : s.rate >= 0.5 ? 'mid' : 'low';
                return (
                  <div key={s.type} className="tk-type-perf-row">
                    <div className="tk-type-perf-head">
                      <span className="tk-type-perf-label">{label}</span>
                      <span className="tk-type-perf-count">{t('topik.rs_this_time', lang, { correct: s.correct, total: s.total })}</span>
                    </div>
                    <div className="tk-type-perf-bar-row">
                      <div className="tk-type-perf-bar">
                        <div className={`tk-type-perf-fill ${fillCls}`} style={{ width: `${s.rate * 100}%` }} />
                      </div>
                      <span className="tk-type-perf-delta">
                        {oldPct === null
                          ? <b className="new">{t('topik.rs_new_mastery', lang, { pct: newPct })}</b>
                          : delta! > 0
                            ? <>{t('topik.rs_cumulative_up', lang, { old: oldPct })}<b className="up">{newPct}% ↑{delta}</b></>
                            : delta! < 0
                              ? <>{t('topik.rs_cumulative_up', lang, { old: oldPct })}<b className="down">{newPct}% ↓{-delta!}</b></>
                              : <>{t('topik.rs_cumulative_flat', lang, { pct: newPct })}</>
                        }
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 逐题回看（仿真） */}
        {isRealExam && allTargets.length > 0 && (
          <div className="tk-card">
            <button className="tk-collapse-head" onClick={() => setShowAllReview(v => !v)}>
              <span className="tk-collapse-title">
                <BookOpen size={15} />{t('topik.rs_review_all', lang)}<span className="count">{t('topik.rs_review_count', lang, { n: allTargets.length })}</span>
              </span>
              {showAllReview ? <EyeOff size={16} color="var(--hr-ink-3)" /> : <Eye size={16} color="var(--hr-ink-3)" />}
            </button>
            {showAllReview && (
              <div className="tk-review-list">
                {allTargets.map(q => {
                  const picked = answersMap.get(q.id);
                  const correct = picked === q.correctIdx;
                  const unanswered = picked === undefined;
                  const itemCls = ['tk-review-item', unanswered ? '' : correct ? 'correct' : 'wrong'].filter(Boolean).join(' ');
                  return (
                    <div key={q.id} className={itemCls}>
                      <div className="tk-review-head">
                        <span className="tk-review-num">{q.section === 'listening' ? t('topik.rs_listen_mark', lang) : t('topik.rs_read_mark', lang)} #{q.number}</span>
                        {unanswered ? <span className="tk-review-tag na">{t('topik.rs_tag_na', lang)}</span>
                          : correct ? <span className="tk-review-tag ok">{t('topik.rs_tag_ok', lang)}</span>
                          : <span className="tk-review-tag no">{t('topik.rs_tag_no', lang)}</span>}
                        {q.testPoint && <span className="tk-review-testpoint">{t('topik.mt_testpoint', lang, { point: q.testPoint })}</span>}
                      </div>
                      <p className="tk-review-prompt">{q.prompt}</p>
                      {!unanswered && !correct && (
                        <p className="tk-review-picked">{t('topik.rs_your_choice', lang)}<b>{String.fromCharCode(65 + (picked as number))}. {q.options[picked as number]}</b></p>
                      )}
                      <p className="tk-review-correct">{t('topik.rs_correct_answer', lang)}<b>{String.fromCharCode(65 + q.correctIdx)}. {q.options[q.correctIdx]}</b></p>
                      <p className="tk-review-explain">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 错题（练习模式） */}
        {!isRealExam && wrongQuestions.length > 0 && (
          <div className="tk-card">
            <div className="tk-card-head">
              <p className="tk-card-title">{t('topik.rs_wrong_analysis', lang)}</p>
              <span className="tk-card-hint">{t('topik.rs_review_count', lang, { n: wrongQuestions.length })}</span>
            </div>
            <div className="tk-review-list">
              {wrongQuestions.map(q => (
                <div key={q.id} className="tk-review-item wrong">
                  <div className="tk-review-head">
                    {q.topic && <span className="tk-mistake-tag">#{q.topic}</span>}
                    {q.testPoint && <span className="tk-review-testpoint">{t('topik.mt_testpoint', lang, { point: q.testPoint })}</span>}
                  </div>
                  <p className="tk-review-prompt">{q.prompt}</p>
                  <p className="tk-review-explain">{q.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="tk-result-actions">
          {wrongQuestions.length > 0 && (
            <button className="tk-action-pink" onClick={practiceMistakes}>
              <RotateCcw size={16} />{t('topik.rs_practice_mistakes', lang, { n: wrongQuestions.length })}
            </button>
          )}
          <Link href="/topik" className="tk-action-back">
            {t('topik.back_topik_home', lang)} <ChevronRight size={16} />
          </Link>
        </div>
      </div>
      </div>{/* /tk-result-col */}

      {/* ── 桌面专属右栏（复盘概要 + 操作） ── */}
      {(() => {
        const totalForPct = result.totalCount || 1;
        const acc = Math.round((result.correctCount / totalForPct) * 100);
        const R = 33, CIRC = 2 * Math.PI * R;
        const passed = isRealExam ? !!grade?.grade : acc >= 60;
        const weak = typeStats.filter(s => s.total > 0).slice(0, 2);
        return (
          <aside className="rr-rail" aria-label={t('topik.rs_rail_summary', lang)}>
            <div className="rr-card">
              <div className="rr-card-title"><Clock size={13} className="rr-ico" /> {t('topik.rs_rail_summary', lang)}</div>
              <div className="rr-ring-wrap">
                <div className="rr-ring">
                  <svg width="78" height="78" viewBox="0 0 78 78">
                    <circle className="rr-ring-track" cx="39" cy="39" r={R} fill="none" strokeWidth="6" />
                    <circle className={`rr-ring-fill ${passed ? 'pass' : 'fail'}`} cx="39" cy="39" r={R} fill="none" strokeWidth="6"
                      strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - acc / 100)} />
                  </svg>
                  <div className="rr-ring-num"><b>{acc}%</b><span>{t('topik.rs_rail_accuracy', lang)}</span></div>
                </div>
                <div className="rr-ring-meta">
                  {isRealExam
                    ? <>{t('topik.rs_rail_est', lang)}<b className={passed ? 'mint' : 'coral'}>{grade?.label}</b><br />{t('topik.rs_rail_score', lang, { score: result.score, max: scoring.maxScore })}</>
                    : <>{t('topik.rs_answered_correct', lang)} <b className="mint">{result.correctCount}</b> / {result.totalCount}<br />{t('topik.rs_rail_time_used', lang, { m: mins, s: secs.toString().padStart(2, '0') })}</>}
                </div>
              </div>
              <div className="rr-stat-grid">
                <div className="rr-stat"><span>{t('topik.rs_correct', lang)}</span><b>{result.correctCount}</b></div>
                <div className="rr-stat"><span>{t('topik.rs_wrong', lang)}</span><b>{Math.max(0, result.totalCount - result.correctCount)}</b></div>
              </div>
            </div>

            {weak.length > 0 && (
              <div className="rr-card">
                <div className="rr-card-title"><Target size={13} className="rr-ico" /> {t('topik.rs_rail_weak_type', lang)}</div>
                {weak.map((s) => {
                  const wmeta = questionTypeMap[s.type];
                  const label = (wmeta ? (lang === 'en' ? wmeta.labelZhEn ?? wmeta.labelZh : wmeta.labelZh) : undefined) || prettyType(s.type);
                  const pct = Math.round(s.rate * 100);
                  return (
                    <div key={s.type} className="rr-weak-row">
                      <div className="rr-weak-head">
                        <span className="rr-weak-label">{label}</span>
                        <span className="rr-weak-count">{s.correct}/{s.total} · {pct}%</span>
                      </div>
                      <div className="rr-weak-bar"><div className="rr-weak-fill" style={{ width: `${Math.max(pct, 4)}%` }} /></div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="rr-actions">
              <button className="rr-btn primary" onClick={practiceMistakes} disabled={wrongQuestions.length === 0}>
                <RotateCcw size={15} />{wrongQuestions.length > 0 ? t('topik.rs_practice_mistakes', lang, { n: wrongQuestions.length }) : t('topik.rs_no_mistakes', lang)}
              </button>
              <button className="rr-btn ghost" onClick={() => router.push('/topik')}>{t('topik.back_topik_home', lang)}</button>
            </div>
          </aside>
        );
      })()}
      </div>{/* /tk-result-layout */}
    </div>
  );
}

// 题型码 → 中文短标签
function prettyType(t: string): string {
  const map: Record<string, string> = {
    'I-L-response': '听句答语',
    'I-L-followup': '听接续句',
    'I-L-place': '判断场所',
    'I-L-topic': '判断话题',
    'I-L-picture': '看图选话',
    'I-L-detail': '听细节',
    'I-L-mainidea': '听中心',
    'I-L-passage-purpose': '听独白意图',
    'I-L-passage-topic': '听独白话题',
    'I-L-passage-main': '听独白中心',
    'I-R-topic': '判断话题',
    'I-R-blank': '完形填空',
    'I-R-notice': '看告示',
    'I-R-detail': '选不符',
    'I-R-mainidea': '选中心',
    'I-R-passage-blank': '阅读填空',
    'I-R-passage-detail': '阅读细节',
    'I-R-passage-blank2': '阅读填空',
    'I-R-passage-detail2': '阅读细节',
    'I-R-sentence-order': '排序',
    'I-R-passage-insert': '段落插入',
    'I-R-passage-purpose': '阅读意图',
    'I-R-passage-context': '阅读语境',
    'I-R-passage-mainidea': '阅读中心',
    'I-R-passage-attitude': '阅读态度',
    'II-L-picture': '看图选话',
    'II-L-followup': '听接续',
    'II-L-action': '听后行动',
    'II-L-detail': '听细节',
    'II-L-mainidea': '听中心',
    'II-R-blank': '完形填空',
    'II-R-meaning': '词义',
    'II-R-ad-purpose': '广告意图',
    'II-R-match': '语句搭配',
    'II-R-sentence-order': '排序',
    'II-R-headline': '新闻标题',
    'II-R-passage-blank': '阅读填空',
    'II-R-passage-blank2': '阅读填空',
    'II-R-passage-blank3': '阅读填空',
    'II-R-passage-detail': '阅读细节',
    'II-R-passage-detail2': '阅读细节',
    'II-R-passage-topic': '阅读话题',
    'II-R-passage-mainidea': '阅读中心',
    'II-R-passage-feeling': '阅读情感',
    'II-R-passage-feeling2': '阅读情感',
    'II-R-passage-intent': '阅读意图',
    'II-R-passage-intent2': '阅读意图',
    'II-R-passage-insert': '段落插入',
  };
  return map[t] || t;
}
