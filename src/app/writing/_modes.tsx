'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2, BookmarkCheck, Bookmark, Lightbulb } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { enVal, t } from '@/lib/i18n';
import '../practice/practice-redesign.css';
import '../practice/practice-flow.css';
import { useIsDesktop } from '@/lib/useIsMobile';
import { KoreanKeyboardDisplay } from '@/components/dictation/KoreanKeyboardDisplay';
import { useHangulIme } from '@/lib/useHangulIme';
import { FloatingKoreanKeyboard } from '@/components/FloatingKoreanKeyboard';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/db';
import { useToast } from '@/hooks/useToast';
import { imitationPrompts, freeTopics, clozeExercises, type HistoryRecord } from '@/data/writingExercises';
import { normalizeKorean } from '@/lib/koreanDiff';
import { awardXp, updateStreak, recordElapsedMinutes } from '@/lib/gamification';
import { playSuccess, playError, playComplete } from '@/lib/soundManager';
import { PracticeResult } from '@/components/practice/PracticeResult';
import { PracticeNextHint } from '@/components/practice/PracticeNextHint';
import { PracticeFeedbackCard } from '@/components/practice/PracticeFeedbackCard';
import { KeyboardHint } from '@/components/practice/KeyboardHint';
import { HandwritingInput } from '@/components/practice/HandwritingInput';

// 分数 → 语义色档:≥85 优秀(mint)/ ≥70 尚可(peach)/ 其余待加强(pink)
function scoreLv(n: number): 'pr-score-lv-high' | 'pr-score-lv-mid' | 'pr-score-lv-low' {
  return n >= 85 ? 'pr-score-lv-high' : n >= 70 ? 'pr-score-lv-mid' : 'pr-score-lv-low';
}

// Fisher-Yates 洗牌(返回新数组,不改原数组)。用于每轮打乱题序,避免每次都从第 1 题固定顺序开始。
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useWritingAddRecord() {
  return (record: Omit<HistoryRecord, 'id' | 'date'>) => {
    const now = Date.now();
    db.writingHistory.put({
      id: `h${now}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date(now).toLocaleString('zh-CN', { hour12: false }),
      mode: record.mode,
      modeLabel: record.modeLabel,
      score: record.score,
      snippet: record.snippet,
      detailsJson: record.details !== undefined ? JSON.stringify(record.details) : '',
      createdAt: now,
    }).catch(e => console.error('[writing] history add failed', e));
  };
}

export function ImitationMode({ onAddRecord }: { onAddRecord: (r: Omit<HistoryRecord, 'id' | 'date'>) => void }) {
  const isDesktop = useIsDesktop();
  const { lang } = useLang();
  const { user } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  // 每轮题序打乱存进 state(不能用 useMemo:React 内存压力下会丢弃重算导致题目/答案错乱)。
  // 惰性初始化只在挂载时洗一次;handleRestart 里再重洗,保证「再来一组」题序不同。
  const [prompts, setPrompts] = useState(() => shuffle(imitationPrompts));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [inputMode, setInputMode] = useState<'type' | 'hand'>('type');
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const submitRef = useRef<() => void>(() => {});
  const ime = useHangulIme({ onChange: setUserInput, onEnter: () => submitRef.current() });
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [finished, setFinished] = useState(false);
  const [judging, setJudging] = useState(false);
  const judgingRef = useRef(false);
  const sessionStartRef = useRef(Date.now());
  // 已给过分的题索引(防"再写一次"在同题反复答对刷 XP)
  const scoredIdxRef = useRef<Set<number>>(new Set());
  // 判定结果 · exact/acceptable 都算过,wrong 才算错
  const [verdict, setVerdict] = useState<'correct' | 'acceptable' | 'wrong'>('wrong');
  const [aiReason, setAiReason] = useState<string | null>(null);
  const [aiTip, setAiTip] = useState<string | null>(null);
  // AI 批改不可用(超时/服务异常):不判对错、不计分,让用户重试或跳过看答案
  const [judgeFailed, setJudgeFailed] = useState(false);

  const prompt = prompts[currentIdx];

  // 记录并计分 · 一句多译:精确匹配直接过,否则交 AI 判语义等价
  const finalize = (v: 'correct' | 'acceptable' | 'wrong') => {
    setVerdict(v);
    const passed = v === 'correct' || v === 'acceptable';
    if (passed) playSuccess(); else playError();
    // 同一题只计一次分/存一次生词,防"再写一次"反复答对刷 XP
    const firstPass = passed && !scoredIdxRef.current.has(currentIdx);
    if (passed) {
      if (firstPass) {
        scoredIdxRef.current.add(currentIdx);
        setScore(s => s + 1);
        const xp = v === 'correct' ? 8 : 6;
        setXpEarned(x => x + xp);
        awardXp(xp).catch(e => { console.error('[writing] awardXp failed', e); showToast(t('common.save_failed', lang), 'error'); });
        updateStreak().catch(e => { console.error('[writing] updateStreak failed', e); showToast(t('common.save_failed', lang), 'error'); });
        if (user) {
          db.sentences.add({
            id: crypto.randomUUID(),
            userId: user.id,
            korean: prompt.ko,
            chinese: prompt.zh,
            sourceType: 'writing',
            createdAt: Date.now(),
          }).catch(e => { console.error('[writing] sentences add failed', e); showToast(t('common.sentence_save_failed', lang), 'error'); });
        }
      }
    } else {
      setWrongCount(w => w + 1);
    }
    onAddRecord({
      mode: 'imitation',
      modeLabel: t('writing.mode_imitation', lang),
      score: v,
      snippet: userInput.trim().slice(0, 50),
      details: {
        type: 'imitation',
        prompt: prompt.zh,
        userAnswer: userInput.trim(),
        modelAnswer: prompt.ko,
        correct: passed,
        grammarPoint: prompt.grammarPoint,
      },
    });
  };

  const handleSubmit = async () => {
    if (!userInput.trim() || judgingRef.current) return;
    setSkipped(false);
    setJudgeFailed(false);
    setAiReason(null);
    setAiTip(null);

    // 1. 精确匹配 · 免费秒过
    if (normalizeKorean(userInput) === normalizeKorean(prompt.ko)) {
      setSubmitted(true);
      finalize('correct');
      return;
    }

    // 2. 不完全一致 → AI 判语义等价(韩语一句多译:이에요/입니다、同义替换等)
    judgingRef.current = true;
    setJudging(true);
    try {
      const controller = new AbortController();
      // 前端超时须 ≥ 后端(speaking-judge 15s),否则前端先超时误判
      const timeoutId = setTimeout(() => controller.abort(), 17000);
      const res = await fetch('/api/ai/speaking-judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spoken: userInput.trim(), target: prompt.ko, meaning: prompt.zh, type: 'sentence', alternatives: prompt.alternatives }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(String(res.status));
      const jr = await res.json();
      const v: 'correct' | 'acceptable' | 'wrong' = ['correct', 'acceptable', 'wrong'].includes(jr.result) ? jr.result : 'wrong';
      setAiReason(jr.errorReason ?? null);
      setAiTip(jr.tip ?? null);
      setSubmitted(true);
      finalize(v);
    } catch {
      // AI 不可用/超时/额度耗尽 → 不判对错、不计分(避免答对被误判为错扣分)。
      // 展示中性"暂时无法批改"卡,用户可重试或跳过看答案。
      setSubmitted(true);
      setJudgeFailed(true);
    } finally {
      judgingRef.current = false;
      setJudging(false);
    }
  };

  submitRef.current = handleSubmit;

  const handleNext = () => {
    if (currentIdx + 1 >= prompts.length) {
      playComplete();
      recordElapsedMinutes(sessionStartRef.current, 30).catch(e => console.error('[writing] recordElapsedMinutes failed', e));
      setFinished(true);
      return;
    }
    setCurrentIdx(currentIdx + 1);
    setUserInput('');
    ime.reset();
    setSubmitted(false);
    setSkipped(false);
    setJudgeFailed(false);
    setAiReason(null);
    setAiTip(null);
  };

  const handleSkip = () => {
    setSubmitted(true);
    setSkipped(true);
  };

  const handleRestart = () => {
    setPrompts(shuffle(imitationPrompts));  // 再来一组:重新打乱题序
    scoredIdxRef.current.clear();
    setCurrentIdx(0);
    setScore(0);
    setWrongCount(0);
    setXpEarned(0);
    setFinished(false);
    setUserInput('');
    ime.reset();
    setSubmitted(false);
    setSkipped(false);
    setJudgeFailed(false);
    setAiReason(null);
    setAiTip(null);
  };

  if (finished) {
    const total = prompts.length;
    const pct = Math.round((score / total) * 100);
    return (
      <div className="pr-scope">
        <PracticeResult
          tone="purple"
          score={pct}
          scoreUnit="%"
          caption={t('writing.result_caption', lang, { correct: score, wrong: wrongCount, skipped: total - score - wrongCount })}
          stats={[
            { num: score, label: t('writing.stat_correct', lang) },
            { num: wrongCount, label: t('writing.stat_wrong', lang) },
            { num: `+${xpEarned}`, label: 'XP' },
          ]}
          xp={xpEarned}
          primaryLabel={t('writing.another_round', lang)}
          onPrimary={handleRestart}
          secondaryLabel={t('writing.back_to_practice', lang)}
          onSecondary={() => { router.push('/practice'); }}
          footer={<PracticeNextHint current="writing" assumeCurrentDone />}
        />
      </div>
    );
  }

  return (
    <div className="pr-focus">
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0, height: 6, background: 'var(--hr-border-1)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(currentIdx / prompts.length) * 100}%`, background: 'var(--hr-purple-base)', borderRadius: 999, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 11, color: 'var(--hr-ink-3)', whiteSpace: 'nowrap', letterSpacing: '.05em' }}>{currentIdx + 1} / {prompts.length}</span>
      </div>

      {/* Prompt 卡 */}
      <div style={{
        background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
        borderRadius: 16, padding: isDesktop ? '32px 32px 28px' : '32px 20px 28px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
        boxShadow: 'var(--hr-shadow-sm)',
      }}>
        <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: 'var(--hr-ink-3)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0 }}>
          Translate to Korean
        </p>
        <p style={{ fontSize: isDesktop ? 28 : 23, fontWeight: 700, color: 'var(--hr-ink-1)', margin: 0, textAlign: 'center', lineHeight: 1.4, letterSpacing: '.01em' }}>
          {enVal(prompt, 'zh', lang)}
        </p>
        {prompt.level && (
          <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: 'var(--hr-ink-3)', background: 'var(--hr-surface-3)', border: '1px solid var(--hr-border-2)', borderRadius: 99, padding: '3px 12px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
            {prompt.level}
          </span>
        )}
        <div style={{
          display: 'flex', gap: 10, alignItems: 'flex-start',
          background: 'var(--hr-purple-soft)', border: '1px solid var(--hr-purple-base)',
          borderRadius: 12, padding: '10px 14px', width: '100%', maxWidth: 560,
        }}>
          <Lightbulb size={16} style={{ color: 'var(--hr-purple-strong)', flexShrink: 0, marginTop: 2 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-purple-strong)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>Hint</p>
            <p style={{ fontSize: 13, color: 'var(--hr-ink-2)', margin: '3px 0 0', lineHeight: 1.55 }}>{enVal(prompt, 'hint', lang)}</p>
          </div>
        </div>
      </div>

      {/* 答题区 */}
      {!submitted ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 4, background: 'var(--hr-surface-3)', borderRadius: 999, padding: 4 }}>
            {(['type', 'hand'] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  // 切到桌面自绘打字前同步已有内容进 IME buffer，防第一键覆盖手写内容
                  if (m === 'type' && isDesktop) ime.syncExternal(userInput);
                  setInputMode(m);
                }}
                style={{
                  flex: 1, padding: '9px 0', borderRadius: 999, border: 'none', cursor: 'pointer',
                  fontSize: 13.5, fontWeight: 700, fontFamily: 'var(--hr-hangul)',
                  background: inputMode === m ? 'var(--hr-surface-1)' : 'transparent',
                  color: inputMode === m ? 'var(--hr-purple-strong)' : 'var(--hr-ink-3)',
                  boxShadow: inputMode === m ? '0 2px 8px rgba(58,46,41,.08)' : 'none',
                  transition: 'all .2s var(--hr-ease)',
                }}
              >
                {m === 'type' ? t('writing.input_type', lang) : t('writing.input_hand', lang)}
              </button>
            ))}
          </div>
          {inputMode === 'hand' ? (
            <HandwritingInput value={userInput} onChange={setUserInput} />
          ) : isDesktop ? (
            // 桌面 · App 接管输入(只读显示区 + 常驻可点击键盘)
            <div
              {...ime.keyProps}
              role="textbox"
              aria-label={t('writing.input_placeholder', lang)}
              style={{
                width: '100%', padding: '16px 18px', borderRadius: 14, minHeight: 60,
                border: '2px solid var(--hr-border-2)', fontSize: 20, color: 'var(--hr-ink-1)',
                fontFamily: 'var(--hr-hangul)', boxSizing: 'border-box', background: 'var(--hr-surface-2)',
                outline: 'none', cursor: 'text', display: 'flex', alignItems: 'center', flexWrap: 'wrap',
                pointerEvents: submitted ? 'none' : 'auto', opacity: submitted ? 0.6 : 1,
              }}
            >
              {userInput ? <span>{userInput}</span> : <span style={{ color: 'var(--hr-ink-4)' }}>{t('writing.input_placeholder', lang)}</span>}
              <span aria-hidden style={{ display: 'inline-block', width: 2, height: 26, marginLeft: 2, background: 'var(--hr-purple-strong)', animation: 'dictCaretBlink 1s step-end infinite' }} />
            </div>
          ) : (
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (!submitted && userInput.trim()) handleSubmit();
                }
              }}
              placeholder={t('writing.input_placeholder', lang)}
              lang="ko"
              autoCapitalize="off"
              rows={2}
              style={{
                width: '100%', padding: '14px 16px', borderRadius: 14,
                border: '2px solid var(--hr-border-2)', fontSize: 17, color: 'var(--hr-ink-1)',
                outline: 'none', fontFamily: 'var(--hr-hangul)', boxSizing: 'border-box',
                background: 'var(--hr-surface-2)', caretColor: 'var(--hr-purple-strong)', resize: 'none',
                transition: 'border-color .15s var(--hr-ease), box-shadow .15s var(--hr-ease)',
              }}
              onFocus={e => { e.target.style.borderColor = 'var(--hr-purple-base)'; e.target.style.boxShadow = '0 0 0 4px rgba(168,150,217,.15)'; }}
              onBlur={e => { e.target.style.borderColor = 'var(--hr-border-2)'; e.target.style.boxShadow = 'none'; }}
            />
          )}
          {inputMode === 'type' && !isDesktop && <KeyboardHint />}
          {inputMode === 'type' && isDesktop && !submitted && (
            <div style={{ marginTop: 10 }}>
              <KoreanKeyboardDisplay composingText={userInput} pressedKey={ime.pressedKey} onJamo={ime.inputJamo} onBackspace={ime.backspace} onSpace={ime.space} />
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button
              onClick={handleSkip}
              className="pr-btn ghost"
              style={{ padding: isDesktop ? '14px 22px' : '13px 18px', whiteSpace: 'nowrap' }}
            >{t('writing.skip_show_answer', lang)}</button>
            <button
              onClick={handleSubmit}
              disabled={!userInput.trim() || judging}
              className="pr-btn primary"
              style={{
                flex: 1, minWidth: 0, padding: isDesktop ? '14px 0' : '13px 0',
                cursor: userInput.trim() && !judging ? 'pointer' : 'not-allowed',
                transition: 'background .15s var(--hr-ease)',
              }}
            >{judging ? t('writing.judging', lang) : t('writing.submit', lang)}</button>
          </div>
        </div>
      ) : judgeFailed ? (
        // AI 批改不可用:不判对错、不计分。可重试或跳过看答案。
        <div style={{
          background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
          borderRadius: 16, padding: '24px 20px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 14, boxShadow: 'var(--hr-shadow-sm)',
        }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--hr-ink-1)', margin: 0, textAlign: 'center' }}>
            {t('writing.judge_unavailable_title', lang)}
          </p>
          <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: 0, textAlign: 'center', lineHeight: 1.55 }}>
            {t('writing.judge_unavailable_desc', lang)}
          </p>
          <div style={{ display: 'flex', gap: 10, width: '100%', marginTop: 4 }}>
            <button
              onClick={() => { setSubmitted(false); setJudgeFailed(false); }}
              className="pr-btn ghost"
              style={{ flex: 1, padding: '13px 0' }}
            >{t('writing.judge_retry', lang)}</button>
            <button
              onClick={() => { setJudgeFailed(false); setSkipped(true); }}
              className="pr-btn primary"
              style={{ flex: 1, padding: '13px 0' }}
            >{t('writing.skip_show_answer', lang)}</button>
          </div>
        </div>
      ) : (
        <PracticeFeedbackCard
          verdict={skipped ? 'acceptable' : verdict}
          yourValue={skipped ? t('writing.your_value_skipped', lang) : (userInput.trim() || t('writing.your_value_empty', lang))}
          yourLabel={t('writing.your_label', lang)}
          target={prompt.ko}
          alternatives={prompt.alternatives}
          showCharDiff={!skipped}
          reason={
            skipped ? null
            : verdict === 'wrong' ? (aiReason ?? t('writing.reason_wrong', lang))
            : verdict === 'acceptable' ? (aiReason ?? t('writing.reason_acceptable', lang))
            : null
          }
          tip={
            skipped
              ? t('writing.tip_skipped', lang)
              : verdict === 'wrong'
                ? (aiTip ?? prompt.pitfall ?? null)
                : verdict === 'acceptable'
                  ? (aiTip ?? t('writing.tip_acceptable', lang))
                  : (prompt.level ? t('writing.tip_correct_leveled', lang, { level: prompt.level }) : (aiTip ?? null))
          }
          grammar={prompt.grammarPoint}
          onNext={handleNext}
          nextLabel={currentIdx + 1 >= prompts.length ? t('writing.view_result', lang) : t('writing.next_question', lang)}
          onRetry={skipped ? undefined : () => { setUserInput(''); setSubmitted(false); }}
          retryLabel={t('writing.write_again', lang)}
          ttsEnabled
        />
      )}
    </div>
  );
}


export function FreeWritingMode({ onAddRecord }: { onAddRecord: (r: Omit<HistoryRecord, 'id' | 'date'>) => void }) {
  const isDesktop = useIsDesktop();
  const { lang } = useLang();
  const { user } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [inputMode, setInputMode] = useState<'type' | 'hand'>('type');
  const [scoring, setScoring] = useState(false);
  const pieceStartRef = useRef(Date.now());
  // 已给过 XP 的文本(去重,防同一篇反复提交刷 XP)
  const scoredTextsRef = useRef<Set<string>>(new Set());
  const scoreAbortRef = useRef<AbortController | null>(null);
  const [feedback, setFeedback] = useState<{
    original: string; corrected: string; reason: string; isCorrect: boolean; saveExpression: string;
    scores?: { vocabulary: number; grammar: number; naturalness: number; overall: number };
  } | null>(null);
  const [expressionSaved, setExpressionSaved] = useState(false);
  const [sessionWritten, setSessionWritten] = useState(0);
  const [totalXp, setTotalXp] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const topic = freeTopics[selectedTopic];

  const updateStats = (value: string) => {
    setText(value);
    // 韩语靠 띄어쓰기不靠空格,按空格数"词"无意义;改为去空格后的字符数
    setWordCount([...value.replace(/\s/g, '')].length);
  };

  const handleTopicChange = (idx: number) => {
    setSelectedTopic(idx);
    setText('');
    setWordCount(0);
    setFeedback(null);
    setExpressionSaved(false);
    if (scoreAbortRef.current) { scoreAbortRef.current.abort(); scoreAbortRef.current = null; }
  };

  const handleScore = async () => {
    if (!text.trim()) return;
    if (!user) { showToast(t('writing.toast_login_required', lang), 'error'); return; }
    setScoring(true);
    setFeedback(null);

    if (scoreAbortRef.current) { scoreAbortRef.current.abort(); }
    const controller = new AbortController();
    scoreAbortRef.current = controller;
    // 前端超时须大于后端(writing API 30s),否则长文前端先超时误报失败
    const timeoutId = setTimeout(() => controller.abort(), 32000);
    try {
      const res = await fetch('/api/ai/writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), topic: topic.title }),
        signal: controller.signal,
      });
      if (res.ok) {
        const data = await res.json();
        setFeedback(data);
        if (data.isCorrect) playSuccess(); else playError();
        setSessionWritten(n => n + 1);
        const overall = data.scores?.overall;
        // XP 去重:同一篇文本只给一次,防反复批改刷 XP
        const key = text.trim();
        if (!scoredTextsRef.current.has(key)) {
          scoredTextsRef.current.add(key);
          const xp = data.isCorrect ? 15 : 8;
          setTotalXp(n => n + xp);
          awardXp(xp).catch(e => { console.error('[writing] awardXp failed', e); showToast(t('common.save_failed', lang), 'error'); });
          updateStreak().catch(e => { console.error('[writing] updateStreak failed', e); showToast(t('common.save_failed', lang), 'error'); });
        }
        recordElapsedMinutes(pieceStartRef.current, 30).catch(e => console.error('[writing] recordElapsedMinutes failed', e));
        pieceStartRef.current = Date.now();
        onAddRecord({
          mode: 'free', modeLabel: t('writing.mode_free', lang),
          score: typeof overall === 'number' ? String(overall) : (data.isCorrect ? 'natural' : 'corrected'),
          snippet: text.trim().slice(0, 50),
          details: { type: 'free', topic: topic.title, text: text.trim(), corrected: data.corrected, reason: data.reason, scores: data.scores },
        });
      } else if (res.status === 401) {
        showToast(t('writing.toast_login_required', lang), 'error');
      } else if (res.status === 429) {
        showToast(t('writing.toast_quota_exhausted', lang), 'error');
      } else {
        throw new Error('failed');
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        showToast(t('writing.toast_ai_timeout', lang), 'error');
      } else {
        showToast(t('writing.toast_ai_unavailable', lang), 'error');
      }
    } finally {
      clearTimeout(timeoutId);
      setScoring(false);
    }
  };

  const handleSaveExpression = async () => {
    if (!feedback?.saveExpression || expressionSaved || !user) return;
    try {
      await db.sentences.add({
        id: crypto.randomUUID(),
        userId: user.id,
        korean: (feedback.saveExpression.split(/[—\-–]/)[0]?.trim() || feedback.saveExpression),
        chinese: (feedback.saveExpression.split(/[—\-–]/)[1]?.trim() || ''),
        sourceType: 'writing',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      setExpressionSaved(true);
      showToast(t('writing.toast_saved', lang), 'success');
    } catch {
      showToast(t('writing.toast_save_failed', lang), 'error');
    }
  };

  return (
    <div className="pr-focus">
      {/* Topic selector */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
        {freeTopics.map((t, i) => (
          <button
            key={i}
            onClick={() => handleTopicChange(i)}
            style={{
              flexShrink: 0, padding: '8px 16px', borderRadius: 999,
              border: '1.5px solid var(--hr-border-2)',
              background: i === selectedTopic ? 'var(--hr-ink-1)' : 'var(--hr-surface-2)',
              color: i === selectedTopic ? 'var(--hr-surface-1)' : 'var(--hr-ink-2)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all .15s var(--hr-ease)',
            }}
          >
            {lang === 'en' && t.titleEn ? t.titleEn : t.title}
          </button>
        ))}
      </div>

      {/* Topic card */}
      <div style={{
        background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
        borderRadius: 16, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10,
        boxShadow: 'var(--hr-shadow-sm)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--hr-hangul)', fontSize: 18, fontWeight: 700, color: 'var(--hr-ink-1)' }}>{topic.titleKo}</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--hr-ink-1)' }}>{lang === 'en' && topic.titleEn ? topic.titleEn : topic.title}</span>
          {topic.level && (
            <span style={{
              marginLeft: 'auto', fontFamily: 'var(--hr-mono)', fontSize: 10.5,
              color: 'var(--hr-mint-strong)', background: 'var(--hr-mint-soft)',
              border: '1px solid var(--hr-mint-base)', borderRadius: 99, padding: '2px 10px',
              letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 700,
            }}>{topic.level}</span>
          )}
        </div>
        <p style={{ fontSize: 13, color: 'var(--hr-ink-2)', margin: 0, lineHeight: 1.55 }}>{topic.prompt}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-ink-3)', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 700 }}>Keywords</span>
          {topic.keywords.map((kw) => (
            <span key={kw} style={{
              fontSize: 12, padding: '2px 10px', borderRadius: 99,
              background: 'var(--hr-purple-soft)', color: 'var(--hr-purple-strong)',
              border: '1px solid var(--hr-purple-base)', fontFamily: 'var(--hr-hangul)',
            }}>{kw}</span>
          ))}
        </div>
      </div>

      {/* Writing area */}
      <div style={{
        background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
        borderRadius: 16, padding: 16, display: 'flex', flexDirection: 'column', gap: 10,
        boxShadow: 'var(--hr-shadow-sm)',
      }}>
        <div style={{ display: 'flex', gap: 4, background: 'var(--hr-surface-3)', borderRadius: 999, padding: 4 }}>
          {(['type', 'hand'] as const).map(m => (
            <button
              key={m}
              type="button"
              onClick={() => setInputMode(m)}
              style={{
                flex: 1, padding: '9px 0', borderRadius: 999, border: 'none', cursor: 'pointer',
                fontSize: 13.5, fontWeight: 700, fontFamily: 'var(--hr-hangul)',
                background: inputMode === m ? 'var(--hr-surface-1)' : 'transparent',
                color: inputMode === m ? 'var(--hr-purple-strong)' : 'var(--hr-ink-3)',
                boxShadow: inputMode === m ? '0 2px 8px rgba(58,46,41,.08)' : 'none',
                transition: 'all .2s var(--hr-ease)',
              }}
            >
              {m === 'type' ? t('writing.input_type', lang) : t('writing.input_hand', lang)}
            </button>
          ))}
        </div>
        {inputMode === 'hand' ? (
          <HandwritingInput value={text} onChange={updateStats} />
        ) : (
        <div style={{ display: 'flex', gap: 8 }}>
          <textarea
            value={text}
            onChange={(e) => updateStats(e.target.value)}
            placeholder={t('writing.free_placeholder', lang)}
            lang="ko"
            autoCapitalize="off"
            rows={6}
            style={{
              flex: 1, minWidth: 0, background: 'transparent', color: 'var(--hr-ink-1)',
              fontSize: 15, resize: 'none', outline: 'none', border: 'none',
              fontFamily: 'var(--hr-hangul)', lineHeight: 1.6,
            }}
          />
          {isDesktop && (
            <button
              type="button"
              onClick={() => setShowKeyboard(!showKeyboard)}
              style={{
                alignSelf: 'flex-start', padding: '10px 12px', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer',
                border: '1.5px solid var(--hr-border-2)',
                background: showKeyboard ? 'var(--hr-purple-soft)' : 'var(--hr-surface-3)',
                color: showKeyboard ? 'var(--hr-purple-strong)' : 'var(--hr-ink-3)',
              }}
            >한</button>
          )}
        </div>
        )}
        {/* 自由写是长文(多行/字数统计),需真 textarea 的光标与选中,故桌面用可拖拽悬浮键盘;
            而仿写是单句,用 inline 只读显示区 + 常驻键盘(见 ImitationMode)。两种形态刻意不同。 */}
        {inputMode === 'type' && isDesktop && (
          <FloatingKoreanKeyboard value={text} onChange={(val) => updateStats(val)} visible={showKeyboard} onClose={() => setShowKeyboard(false)} />
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--hr-border-1)', fontSize: 11, color: 'var(--hr-ink-3)', fontFamily: 'var(--hr-mono)', letterSpacing: '.05em' }}>
          <span>{t('writing.word_count', lang, { n: wordCount })}</span>
        </div>
        {inputMode === 'type' && !isDesktop && <KeyboardHint />}
      </div>

      {/* 提交批改 · 一步直达(写完直接交兔莉批改,不再有中间"提交"空步骤) */}
      {!feedback && (
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handleScore}
            disabled={!text.trim() || scoring}
            className="pr-btn primary"
            style={{ flex: 1, padding: '14px 0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            {scoring ? <><Loader2 size={16} className="animate-spin" /> {t('writing.tori_correcting', lang)}</> : <><Sparkles size={16} /> {t('writing.submit_tori_correct', lang)}</>}
          </button>
          {sessionWritten > 0 && (
            <button
              onClick={() => setShowSummary(true)}
              className="pr-btn ghost"
              style={{ padding: '14px 22px' }}
            >{t('writing.done', lang)}</button>
          )}
        </div>
      )}

      {/* AI Feedback */}
      {feedback && (
        <div style={{
          background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
          borderRadius: 16, padding: 20, display: 'flex', flexDirection: 'column', gap: 14,
          boxShadow: 'var(--hr-shadow-sm)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={16} style={{ color: 'var(--hr-purple-strong)' }} />
            <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 11, color: 'var(--hr-ink-3)', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 700 }}>{t('writing.tori_feedback', lang)}</span>
          </div>

          <div style={{ background: 'var(--hr-surface-3)', border: '1px solid var(--hr-border-1)', borderRadius: 12, padding: '12px 14px' }}>
            <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-ink-3)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>{t('writing.your_label', lang)}</p>
            <p style={{ fontSize: 14, color: 'var(--hr-ink-1)', margin: '4px 0 0', fontFamily: 'var(--hr-hangul)', lineHeight: 1.55 }}>{feedback.original}</p>
          </div>

          {feedback.scores && (
            <div className="pr-score-card">
              <div className="pr-score-overall">
                <p className={`pr-score-overall-num ${scoreLv(feedback.scores.overall)}`}>{feedback.scores.overall}</p>
                <p className="pr-score-overall-label">{t('writing.score_overall', lang)}</p>
              </div>
              <div className="pr-score-bars">
                {([['vocabulary', feedback.scores.vocabulary], ['grammar', feedback.scores.grammar], ['naturalness', feedback.scores.naturalness]] as const).map(([label, val]) => {
                  const lv = scoreLv(val);
                  return (
                    <div key={label} className="pr-score-row">
                      <span className="pr-score-row-label">{t(`writing.score_${label}`, lang)}</span>
                      <div className="pr-score-track">
                        <div className={`pr-score-fill ${lv}`} style={{ ['--pct' as string]: `${val}%` }} />
                      </div>
                      <span className={`pr-score-row-val ${lv}`}>{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {feedback.isCorrect ? (
            <div style={{ background: 'var(--hr-mint-soft)', border: '1.5px solid var(--hr-mint-base)', borderRadius: 12, padding: '12px 14px' }}>
              <p style={{ fontSize: 14, color: 'var(--hr-mint-strong)', fontWeight: 700, margin: 0 }}>{t('writing.expression_natural', lang)}</p>
            </div>
          ) : (
            <div style={{ background: 'var(--hr-mint-soft)', border: '1.5px solid var(--hr-mint-base)', borderRadius: 12, padding: '12px 14px' }}>
              <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-mint-strong)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>{t('writing.more_natural', lang)}</p>
              <p style={{ fontSize: 15, color: 'var(--hr-ink-1)', margin: '4px 0 0', fontFamily: 'var(--hr-hangul)', lineHeight: 1.55, fontWeight: 700 }}>{feedback.corrected}</p>
            </div>
          )}

          <div style={{ background: 'var(--hr-purple-soft)', border: '1.5px solid var(--hr-purple-base)', borderRadius: 12, padding: '12px 14px' }}>
            <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-purple-strong)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>Why</p>
            <p style={{ fontSize: 13, color: 'var(--hr-ink-2)', margin: '4px 0 0', lineHeight: 1.6 }}>{feedback.reason}</p>
          </div>

          {feedback.saveExpression && (
            <div style={{ background: 'var(--hr-pink-soft)', border: '1.5px solid var(--hr-pink-base)', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-pink-strong)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>{t('writing.saveable_expression', lang)}</p>
                <p style={{ fontSize: 14, color: 'var(--hr-ink-1)', margin: '4px 0 0', fontFamily: 'var(--hr-hangul)', lineHeight: 1.55 }}>{feedback.saveExpression}</p>
              </div>
              <button
                onClick={handleSaveExpression}
                disabled={expressionSaved || !user}
                style={{
                  padding: 8, borderRadius: 10, border: 'none', cursor: expressionSaved ? 'default' : 'pointer',
                  background: 'transparent',
                  color: expressionSaved ? 'var(--hr-mint-strong)' : 'var(--hr-ink-3)',
                }}
              >
                {expressionSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              </button>
            </div>
          )}

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => { setFeedback(null); setText(''); setWordCount(0); setExpressionSaved(false); }}
              className="pr-btn primary"
              style={{ flex: 1, padding: '12px 0' }}
            >{t('writing.write_another', lang)}</button>
            <button
              onClick={() => setShowSummary(true)}
              className="pr-btn ghost"
              style={{ padding: '12px 22px' }}
            >{t('writing.done', lang)}</button>
          </div>

          {sessionWritten > 0 && (
            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--hr-ink-3)', margin: 0 }}>
              {t('writing.session_written_prefix', lang)} <b style={{ color: 'var(--hr-purple-strong)', fontFamily: 'var(--hr-serif)', fontStyle: 'italic', fontSize: 14 }}>{sessionWritten}</b> {t('writing.session_written_suffix', lang)}
              {sessionWritten >= 3 && ` ${t('writing.session_well_done', lang)}`}
            </p>
          )}
        </div>
      )}

      {showSummary && (
        <div className="pr-scope">
          <PracticeResult
            tone="purple"
            score={sessionWritten}
            scoreUnit={t('writing.unit_paragraph', lang)}
            caption={t('writing.free_summary_caption', lang, { xp: totalXp })}
            stats={[
              { num: sessionWritten, label: t('writing.stat_paragraphs', lang) },
              { num: typeof feedback?.scores?.overall === 'number' ? feedback.scores.overall : (feedback?.isCorrect ? '✓' : '—'), label: t('writing.stat_latest_score', lang) },
              { num: `+${totalXp}`, label: 'XP' },
            ]}
            xp={totalXp}
            primaryLabel={t('writing.keep_writing', lang)}
            onPrimary={() => setShowSummary(false)}
            secondaryLabel={t('writing.back_to_practice', lang)}
            onSecondary={() => { router.push('/practice'); }}
            footer={<PracticeNextHint current="writing" assumeCurrentDone />}
          />
        </div>
      )}
    </div>
  );
}


export function ClozeMode({ onAddRecord }: { onAddRecord: (r: Omit<HistoryRecord, 'id' | 'date'>) => void }) {
  const { lang } = useLang();
  const { showToast } = useToast();
  // 每轮题序打乱存进 state(不用 useMemo,避免被 React 丢弃重算)。wrongIndices 存的是本数组的索引,
  // 回看错题也读同一个 exercises,保证索引一致不串位。重来时重洗。
  const [exercises, setExercises] = useState(() => shuffle(clozeExercises));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);
  const [showWrongReview, setShowWrongReview] = useState(false);
  const sessionStartRef = useRef(Date.now());
  const [reviewMode, setReviewMode] = useState(false);
  const xpAwardedRef = useRef(false);
  const streakUpdatedRef = useRef(false);
  // 是否已正常写过历史(最后一题结算时)。中途退出补记时靠它防重复。
  const recordedRef = useRef(false);

  const exercise = exercises[currentIdx];
  const isLastQuestion = currentIdx + 1 >= exercises.length;
  const percentage = exercises.length > 0 ? Math.round((score / exercises.length) * 100) : 0;
  const xpQualified = percentage >= 80;

  // 持有最新快照供卸载时补记(cleanup 闭包否则拿到旧值)
  const snapshotRef = useRef({ score, answered, currentIdx, exercises, onAddRecord });
  snapshotRef.current = { score, answered, currentIdx, exercises, onAddRecord };

  // 中途退出补记:答过题但没走到正常结算(recordedRef=false)时,记一条"未完成"历史。
  // 只在真正卸载时触发一次。
  useEffect(() => {
    return () => {
      const s = snapshotRef.current;
      // 答过至少一题(currentIdx>0 或当前题已作答)且未正常结算过
      const answeredAny = s.currentIdx > 0 || s.answered;
      if (recordedRef.current || !answeredAny) return;
      s.onAddRecord({
        mode: 'cloze',
        modeLabel: t('writing.mode_cloze', lang),
        score: `${s.score}/${s.exercises.length}`,
        snippet: s.exercises.map(e => e.full).join(', ').slice(0, 50),
        details: {
          type: 'cloze',
          total: s.exercises.length,
          correct: s.score,
          percentage: s.exercises.length > 0 ? Math.round((s.score / s.exercises.length) * 100) : 0,
        },
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelectedAnswer(idx);
    setAnswered(true);
    const isCorrect = idx === exercise.correct;
    if (isCorrect) {
      setScore((s) => s + 1);
      playSuccess();
    } else {
      setWrongIndices((prev) => prev.includes(currentIdx) ? prev : [...prev, currentIdx]);
      playError();
    }
    // 最后一题立刻发 XP,避免用户关闭页面未点"完成"导致 XP丢失
    if (isLastQuestion && !xpAwardedRef.current) {
      xpAwardedRef.current = true;
      const finalScore = isCorrect ? score + 1 : score;
      const finalPct = Math.round((finalScore / exercises.length) * 100);
      const xp = finalPct >= 80 ? 30 : 10;
      awardXp(xp).catch(e => { console.error('[writing] awardXp failed', e); showToast(t('common.save_failed', lang), 'error'); });
      recordElapsedMinutes(sessionStartRef.current, 20).catch(e => console.error('[writing] recordElapsedMinutes failed', e));
      if (!streakUpdatedRef.current) {
        streakUpdatedRef.current = true;
        updateStreak().catch(e => { console.error('[writing] updateStreak failed', e); showToast(t('common.save_failed', lang), 'error'); });
      }
    }
  };

  // 跳过本题:揭晓答案但不计对不计错,不进错题回看(selectedAnswer=null)。
  // 最后一题跳过也要结算 XP(按未答对处理),避免漏发。
  const handleSkip = () => {
    if (answered) return;
    setSelectedAnswer(null);
    setAnswered(true);
    if (isLastQuestion && !xpAwardedRef.current) {
      xpAwardedRef.current = true;
      const finalPct = Math.round((score / exercises.length) * 100);
      const xp = finalPct >= 80 ? 30 : 10;
      awardXp(xp).catch(e => { console.error('[writing] awardXp failed', e); showToast(t('common.save_failed', lang), 'error'); });
      recordElapsedMinutes(sessionStartRef.current, 20).catch(e => console.error('[writing] recordElapsedMinutes failed', e));
      if (!streakUpdatedRef.current) {
        streakUpdatedRef.current = true;
        updateStreak().catch(e => { console.error('[writing] updateStreak failed', e); showToast(t('common.save_failed', lang), 'error'); });
      }
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Add record and show completion
      // We already incremented score in handleSelect
      const finalPercentage = Math.round((score / exercises.length) * 100);

      onAddRecord({
        mode: 'cloze',
        modeLabel: t('writing.mode_cloze', lang),
        score: `${score}/${exercises.length}`,
        snippet: exercises.map(e => e.full).join(', ').slice(0, 50),
        details: {
          type: 'cloze',
          total: exercises.length,
          correct: score,
          percentage: finalPercentage,
        },
      });
      recordedRef.current = true;

      if (xpQualified) {
        if (!xpAwardedRef.current) {
          awardXp(30).catch(e => { console.error('[writing] awardXp failed', e); showToast(t('common.save_failed', lang), 'error'); });
          if (!streakUpdatedRef.current) {
            streakUpdatedRef.current = true;
            updateStreak().catch(e => { console.error('[writing] updateStreak failed', e); showToast(t('common.save_failed', lang), 'error'); });
          }
        }
        playComplete();
        setAllDone(true);
      } else {
        if (!xpAwardedRef.current) {
          awardXp(10).catch(e => { console.error('[writing] awardXp failed', e); showToast(t('common.save_failed', lang), 'error'); });
          if (!streakUpdatedRef.current) {
            streakUpdatedRef.current = true;
            updateStreak().catch(e => { console.error('[writing] updateStreak failed', e); showToast(t('common.save_failed', lang), 'error'); });
          }
        }
        setShowWrongReview(true);
      }
    } else {
      setCurrentIdx(currentIdx + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  const resetAll = () => {
    setExercises(shuffle(clozeExercises));  // 再来一组:重新打乱题序
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setAllDone(false);
    setWrongIndices([]);
    setReviewMode(false);
    xpAwardedRef.current = false;
    streakUpdatedRef.current = false;
    recordedRef.current = false;
  };

  // 未通关: 错题回看
  if (showWrongReview) {
    const finalPct = Math.round((score / exercises.length) * 100);
    return (
      <div className="pr-focus" style={{ gap: 14 }}>
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <p style={{ fontFamily: 'var(--hr-serif)', fontStyle: 'italic', fontSize: 40, fontWeight: 700, color: 'var(--hr-ink-1)', margin: 0, letterSpacing: '-.02em' }}>{finalPct}<span style={{ fontSize: 22 }}>%</span></p>
          <p style={{ fontSize: 14, color: 'var(--hr-ink-2)', margin: '4px 0 0', fontWeight: 600 }}>{t('writing.almost_passed', lang)}</p>
          <p style={{ fontSize: 12, color: 'var(--hr-ink-3)', margin: '2px 0 0' }}>{t('writing.review_wrong_hint', lang, { n: wrongIndices.length })}</p>
        </div>
        {wrongIndices.map((qi) => {
          const ex = exercises[qi];
          if (!ex) return null;
          return (
            <div key={qi} style={{ background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)', borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6, boxShadow: 'var(--hr-shadow-sm)' }}>
              <p style={{ fontSize: 14, color: 'var(--hr-ink-2)', margin: 0, fontFamily: 'var(--hr-hangul)', lineHeight: 1.5 }}>
                {ex.sentence?.replace('___', `(${ex.options?.[ex.correct] ?? ''})`) ?? ex.full}
              </p>
              <p style={{ fontSize: 13, color: 'var(--hr-purple-strong)', margin: 0, fontWeight: 700 }}>{t('writing.correct_answer_label', lang)} {ex.options?.[ex.correct]}</p>
            </div>
          );
        })}
        <button
          onClick={() => {
            setExercises(shuffle(clozeExercises));  // 重试整套:重新打乱题序
            setShowWrongReview(false);
            setCurrentIdx(0);
            setScore(0);
            setSelectedAnswer(null);
            setAnswered(false);
            setWrongIndices([]);
            xpAwardedRef.current = false;
            streakUpdatedRef.current = false;
          }}
          className="pr-btn primary block"
          style={{ padding: '14px 0' }}
        >{t('writing.retry', lang)}</button>
      </div>
    );
  }

  // Review wrong answers (通关后可选)
  if (allDone && reviewMode) {
    return (
      <div className="pr-focus" style={{ gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 11, color: 'var(--hr-ink-3)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>Review</p>
            <p style={{ fontSize: 18, color: 'var(--hr-ink-1)', margin: '2px 0 0', fontWeight: 700 }}>{t('writing.wrong_review_title', lang)}</p>
          </div>
          <button
            onClick={() => setReviewMode(false)}
            style={{ background: 'transparent', border: '1.5px solid var(--hr-border-2)', color: 'var(--hr-ink-2)', padding: '8px 14px', borderRadius: 999, fontSize: 12, cursor: 'pointer', fontWeight: 600 }}
          >{t('writing.back_to_result', lang)}</button>
        </div>
        {wrongIndices.map((i) => {
          const q = exercises[i];
          return (
            <div key={i} style={{ background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)', borderRadius: 14, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6, boxShadow: 'var(--hr-shadow-sm)' }}>
              <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: 'var(--hr-ink-3)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>{t('writing.question_n', lang, { n: i + 1 })}</p>
              <p style={{ fontSize: 15, color: 'var(--hr-ink-1)', margin: 0, fontFamily: 'var(--hr-hangul)', lineHeight: 1.5 }}>{q.sentence}</p>
              <p style={{ fontSize: 13, color: 'var(--hr-mint-strong)', margin: 0, fontWeight: 700 }}>{t('writing.correct_answer_check', lang)} {q.options[q.correct]}</p>
              {q.explanation && (
                <p style={{ fontSize: 12, color: 'var(--hr-ink-2)', margin: 0, lineHeight: 1.6 }}>{q.explanation}</p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // XP completion screen
  if (allDone) {
    return (
      <div className="pr-scope">
        <PracticeResult
          tone="purple"
          score={percentage}
          scoreUnit="%"
          caption={t('writing.cloze_result_caption', lang, { correct: score, total: exercises.length })}
          stats={[
            { num: score, label: t('writing.stat_correct', lang) },
            { num: exercises.length - score, label: t('writing.stat_wrong', lang) },
            { num: xpQualified ? '+30' : '+10', label: 'XP' },
          ]}
          xp={xpQualified ? 30 : 10}
          primaryLabel={t('writing.retry', lang)}
          onPrimary={resetAll}
          secondaryLabel={wrongIndices.length > 0 ? t('writing.view_wrong_questions', lang, { n: wrongIndices.length }) : t('writing.go_back', lang)}
          onSecondary={() => wrongIndices.length > 0 ? setReviewMode(true) : window.history.back()}
          footer={<PracticeNextHint current="writing" assumeCurrentDone />}
        />
      </div>
    );
  }

  return (
    <div className="pr-focus">
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0, height: 6, background: 'var(--hr-border-1)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(currentIdx / exercises.length) * 100}%`, background: 'var(--hr-purple-base)', borderRadius: 999, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 11, color: 'var(--hr-ink-3)', whiteSpace: 'nowrap', letterSpacing: '.05em' }}>
          {currentIdx + 1} / {exercises.length} · {t('writing.cloze_progress_correct', lang, { n: score })}
        </span>
      </div>

      {/* Sentence card */}
      <div style={{
        background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
        borderRadius: 16, padding: '32px 24px 28px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        boxShadow: 'var(--hr-shadow-sm)',
      }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {exercise.topic && (
            <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-purple-strong)', background: 'var(--hr-purple-soft)', border: '1px solid var(--hr-purple-base)', borderRadius: 99, padding: '2px 10px', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 700 }}>{exercise.topic}</span>
          )}
          {exercise.level && (
            <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-mint-strong)', background: 'var(--hr-mint-soft)', border: '1px solid var(--hr-mint-base)', borderRadius: 99, padding: '2px 10px', letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 700 }}>{exercise.level}</span>
          )}
        </div>
        <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: 'var(--hr-ink-3)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>Fill the Blank</p>
        <p style={{ fontFamily: 'var(--hr-hangul)', fontSize: 24, color: 'var(--hr-ink-1)', margin: 0, fontWeight: 700, textAlign: 'center', lineHeight: 1.5 }}>
          {exercise.sentence.split('___').map((part, i) => (
            <span key={i}>
              {i > 0 && (() => {
                // 跳过(selectedAnswer=null):中性色显示正确答案;答对:mint;答错:pink
                const skipped = answered && selectedAnswer === null;
                const isRight = answered && selectedAnswer === exercise.correct;
                const bd = !answered ? 'var(--hr-purple-base)' : skipped ? 'var(--hr-purple-base)' : isRight ? 'var(--hr-mint-base)' : 'var(--hr-pink-base)';
                const cl = !answered ? 'inherit' : skipped ? 'var(--hr-purple-strong)' : isRight ? 'var(--hr-mint-strong)' : 'var(--hr-pink-strong)';
                const shown = !answered ? '　' : skipped ? exercise.options[exercise.correct] : exercise.options[selectedAnswer!];
                return (
                  <span style={{
                    display: 'inline-block', minWidth: 60, margin: '0 6px',
                    borderBottom: `3px solid ${bd}`, color: cl, fontWeight: 800,
                  }}>{shown}</span>
                );
              })()}
              {part}
            </span>
          ))}
        </p>
      </div>

      {/* Options */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        {exercise.options.map((opt, i) => {
          let bg = 'var(--hr-surface-2)';
          let border = '1.5px solid var(--hr-border-2)';
          let color = 'var(--hr-ink-1)';
          let opacity = 1;
          if (answered) {
            if (i === exercise.correct) {
              bg = 'var(--hr-mint-soft)'; border = '1.5px solid var(--hr-mint-base)'; color = 'var(--hr-mint-strong)';
            } else if (i === selectedAnswer) {
              bg = 'var(--hr-pink-soft)'; border = '1.5px solid var(--hr-pink-base)'; color = 'var(--hr-pink-strong)';
            } else { opacity = 0.5; }
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              style={{
                padding: '16px 12px', borderRadius: 14, background: bg, border, color, opacity,
                fontSize: 20, fontWeight: 800, cursor: answered ? 'default' : 'pointer',
                fontFamily: 'var(--hr-hangul)', textAlign: 'center',
                transition: 'all .15s var(--hr-ease)', boxShadow: 'var(--hr-shadow-sm)',
              }}
            >{opt}</button>
          );
        })}
      </div>

      {/* 未作答时:跳过(不会做)按钮 */}
      {!answered && (
        <button
          onClick={handleSkip}
          className="pr-btn ghost block"
          style={{ padding: '12px 0' }}
        >{t('writing.cloze_skip', lang)}</button>
      )}

      {/* Explanation */}
      {answered && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: 'var(--hr-surface-3)', border: '1px solid var(--hr-border-1)', borderRadius: 12, padding: '12px 14px' }}>
            <p style={{ fontFamily: 'var(--hr-hangul)', fontSize: 15, color: 'var(--hr-ink-1)', margin: 0, fontWeight: 700 }}>{exercise.full}</p>
            <p style={{ fontSize: 12, color: 'var(--hr-ink-3)', margin: '4px 0 0' }}>{enVal(exercise, 'meaning', lang)}</p>
          </div>
          <div style={{ background: 'var(--hr-purple-soft)', border: '1.5px solid var(--hr-purple-base)', borderRadius: 12, padding: '12px 14px', display: 'flex', gap: 10 }}>
            <Lightbulb size={14} style={{ color: 'var(--hr-purple-strong)', flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 12.5, color: 'var(--hr-ink-2)', margin: 0, lineHeight: 1.6 }}>{exercise.explanation}</p>
          </div>
          <button
            onClick={handleNext}
            className="pr-btn primary block"
            style={{ padding: '14px 0' }}
          >{isLastQuestion ? t('writing.done', lang) : t('writing.next_question', lang)}</button>
        </div>
      )}
    </div>
  );
}
