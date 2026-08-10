'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PenLine, Sparkles, BookOpen, Clock, ChevronDown, ChevronUp, Trophy, Loader2, BookmarkCheck, Bookmark, ArrowLeft, Lightbulb } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '../practice/practice-redesign.css';
import '../practice/practice-flow.css';
import { useIsDesktop } from '@/lib/useIsMobile';
import { KoreanKeyboardDisplay } from '@/components/dictation/KoreanKeyboardDisplay';
import { useHangulIme } from '@/lib/useHangulIme';
import { FloatingKoreanKeyboard } from '@/components/FloatingKoreanKeyboard';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/db';
import { useToast } from '@/hooks/useToast';
import { useSmartBack } from '@/lib/useSmartBack';
import { modeConfig, imitationPrompts, freeTopics, clozeExercises, type WritingMode, type HistoryRecord } from '@/data/writingExercises';
import { normalizeKorean } from '@/lib/koreanDiff';
import { awardXp, updateStreak } from '@/lib/gamification';
import { playSuccess, playError, playComplete } from '@/lib/soundManager';
import { PracticeResult } from '@/components/practice/PracticeResult';
import { PracticeNextHint } from '@/components/practice/PracticeNextHint';
import { PracticeFeedbackCard } from '@/components/practice/PracticeFeedbackCard';
import { KeyboardHint } from '@/components/practice/KeyboardHint';

const WRITING_HISTORY_MAX = 50;

// 分数 → 语义色档:≥85 优秀(mint)/ ≥70 尚可(peach)/ 其余待加强(pink)
function scoreLv(n: number): 'pr-score-lv-high' | 'pr-score-lv-mid' | 'pr-score-lv-low' {
  return n >= 85 ? 'pr-score-lv-high' : n >= 70 ? 'pr-score-lv-mid' : 'pr-score-lv-low';
}

export default function WritingPage() {
  const { lang } = useLang();
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlTab = searchParams.get('tab');
  const validModes: WritingMode[] = ['imitation', 'free', 'cloze', 'history'];
  const initialMode: WritingMode = validModes.includes(urlTab as WritingMode) ? (urlTab as WritingMode) : 'imitation';
  const [mode, setMode] = useState<WritingMode>(initialMode);

  const switchMode = (next: WritingMode) => {
    setMode(next);
    const url = new URL(window.location.href);
    if (next === 'imitation') url.searchParams.delete('tab'); else url.searchParams.set('tab', next);
    window.history.replaceState({}, '', url.toString());
  };

  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const smartBack = useSmartBack('/practice');

  useEffect(() => {
    if (!user?.id) { setHistory([]); return; }
    let cancelled = false;
    db.writingHistory.orderBy('createdAt').reverse().limit(WRITING_HISTORY_MAX).toArray()
      .then(rows => {
        if (cancelled) return;
        setHistory(rows.map(r => ({
          id: r.id,
          date: r.date,
          mode: r.mode,
          modeLabel: r.modeLabel,
          score: r.score,
          snippet: r.snippet,
          details: r.detailsJson ? JSON.parse(r.detailsJson) : undefined,
        })));
      })
      .catch(e => console.error('[writing] history load failed', e));
    return () => { cancelled = true; };
  }, [user?.id]);

  const addRecord = (record: Omit<HistoryRecord, 'id' | 'date'>) => {
    const now = Date.now();
    const newRecord: HistoryRecord = {
      ...record,
      id: `h${now}-${Math.random().toString(36).slice(2, 8)}`,
      date: new Date(now).toLocaleString('zh-CN', { hour12: false }),
    };
    setHistory(prev => [newRecord, ...prev].slice(0, WRITING_HISTORY_MAX));
    db.writingHistory.put({
      id: newRecord.id,
      date: newRecord.date,
      mode: newRecord.mode,
      modeLabel: newRecord.modeLabel,
      score: newRecord.score,
      snippet: newRecord.snippet,
      detailsJson: newRecord.details !== undefined ? JSON.stringify(newRecord.details) : '',
      createdAt: now,
    }).catch(e => console.error('[writing] history add failed', e));
  };

  return (
    <div className="pr-scope">
      <div className="hr-stage" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
        <div className="hr-mobile-back" style={{ display: 'block' }}>
          <button
            className="hr-mobile-back-btn"
            onClick={smartBack}
            aria-label={t('writing.back_to_practice_aria', lang)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <ArrowLeft size={14} /> {t('writing.back_to_practice', lang)}
          </button>
        </div>

        <header className="hr-page-head">
          <div className="hr-brand">
            <div className="hr-brand-mark">Tori</div>
            <div className="hr-brand-kr">쓰기</div>
            <div className="hr-brand-sub">{t('writing.page_subtitle', lang)}</div>
          </div>
          <div className="hr-brand-sub" data-md-show>{t('writing.modes_tagline', lang)}</div>
        </header>

        <nav className="hr-main-tabs" role="tablist" aria-label={t('writing.modes_aria', lang)}>
          {modeConfig.map((m) => {
            const Icon = m.icon;
            return (
              <button
                key={m.key}
                role="tab"
                aria-selected={mode === m.key}
                className={`hr-main-tab${mode === m.key ? ' active' : ''}`}
                onClick={() => switchMode(m.key)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Icon size={14} />
                {t(`writing.mode_${m.key}`, lang)}
              </button>
            );
          })}
        </nav>

        <section role="tabpanel" className="pr-screen">
          <div style={{ display: mode === 'imitation' ? 'block' : 'none' }}>
            <ImitationMode onAddRecord={addRecord} />
          </div>
          <div style={{ display: mode === 'free' ? 'block' : 'none' }}>
            <FreeWritingMode onAddRecord={addRecord} />
          </div>
          <div style={{ display: mode === 'cloze' ? 'block' : 'none' }}>
            <ClozeMode onAddRecord={addRecord} />
          </div>
          <div style={{ display: mode === 'history' ? 'block' : 'none' }}>
            <HistoryMode records={history} />
          </div>
        </section>
      </div>
    </div>
  );
}

function ImitationMode({ onAddRecord }: { onAddRecord: (r: Omit<HistoryRecord, 'id' | 'date'>) => void }) {
  const isDesktop = useIsDesktop();
  const { lang } = useLang();
  const { user } = useAuth();
  const router = useRouter();
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
  // 判定结果 · exact/acceptable 都算过,wrong 才算错
  const [verdict, setVerdict] = useState<'correct' | 'acceptable' | 'wrong'>('wrong');
  const [aiReason, setAiReason] = useState<string | null>(null);
  const [aiTip, setAiTip] = useState<string | null>(null);

  const prompt = imitationPrompts[currentIdx];

  // 记录并计分 · 一句多译:精确匹配直接过,否则交 AI 判语义等价
  const finalize = (v: 'correct' | 'acceptable' | 'wrong') => {
    setVerdict(v);
    const passed = v === 'correct' || v === 'acceptable';
    if (passed) playSuccess(); else playError();
    if (passed) {
      setScore(s => s + 1);
      const xp = v === 'correct' ? 8 : 6;
      setXpEarned(x => x + xp);
      awardXp(xp).catch(e => console.error('[writing] awardXp failed', e));
      updateStreak().catch(e => console.error('[writing] updateStreak failed', e));
      if (user) {
        db.sentences.put({
          id: `writing-im-${Date.now()}`,
          userId: user.id,
          korean: prompt.ko,
          chinese: prompt.zh,
          sourceType: 'writing',
          createdAt: Date.now(),
        }).catch(e => console.error('[writing] sentences put failed', e));
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
    if (!userInput.trim() || judging) return;
    setSkipped(false);
    setAiReason(null);
    setAiTip(null);

    // 1. 精确匹配 · 免费秒过
    if (normalizeKorean(userInput) === normalizeKorean(prompt.ko)) {
      setSubmitted(true);
      finalize('correct');
      return;
    }

    // 2. 不完全一致 → AI 判语义等价(韩语一句多译:이에요/입니다、同义替换等)
    setJudging(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      const res = await fetch('/api/ai/speaking-judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spoken: userInput.trim(), target: prompt.ko, meaning: prompt.zh, type: 'sentence' }),
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
      // AI 不可用 → 回退到严格判定(与原行为一致,不误放过)
      setSubmitted(true);
      finalize('wrong');
    } finally {
      setJudging(false);
    }
  };

  submitRef.current = handleSubmit;

  const handleNext = () => {
    if (currentIdx + 1 >= imitationPrompts.length) {
      playComplete();
      setFinished(true);
      return;
    }
    setCurrentIdx(currentIdx + 1);
    setUserInput('');
    ime.reset();
    setSubmitted(false);
    setSkipped(false);
    setAiReason(null);
    setAiTip(null);
  };

  const handleSkip = () => {
    setSubmitted(true);
    setSkipped(true);
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setWrongCount(0);
    setXpEarned(0);
    setFinished(false);
    setUserInput('');
    ime.reset();
    setSubmitted(false);
    setSkipped(false);
    setAiReason(null);
    setAiTip(null);
  };

  if (finished) {
    const total = imitationPrompts.length;
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720, margin: '0 auto', paddingBottom: 20 }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0, height: 6, background: 'var(--hr-border-1)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(currentIdx / imitationPrompts.length) * 100}%`, background: 'var(--hr-purple-base)', borderRadius: 999, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 11, color: 'var(--hr-ink-3)', whiteSpace: 'nowrap', letterSpacing: '.05em' }}>{currentIdx + 1} / {imitationPrompts.length}</span>
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
          {prompt.zh}
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
            <p style={{ fontSize: 13, color: 'var(--hr-ink-2)', margin: '3px 0 0', lineHeight: 1.55 }}>{prompt.hint}</p>
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
            isDesktop ? (
              <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', textAlign: 'center', lineHeight: 1.6, padding: '16px 12px', margin: 0 }}>
                {t('prac.hw_guide_desktop', lang)}
              </p>
            ) : (
              <div style={{ padding: '8px 2px' }}>
                <KeyboardHint text={t('prac.hw_guide_mobile', lang)} />
              </div>
            )
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
      ) : (
        <PracticeFeedbackCard
          verdict={skipped ? 'acceptable' : verdict}
          yourValue={skipped ? t('writing.your_value_skipped', lang) : (userInput.trim() || t('writing.your_value_empty', lang))}
          yourLabel={t('writing.your_label', lang)}
          target={prompt.ko}
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
          nextLabel={currentIdx + 1 >= imitationPrompts.length ? t('writing.view_result', lang) : t('writing.next_question', lang)}
          onRetry={skipped ? undefined : () => { setUserInput(''); setSubmitted(false); }}
          retryLabel={t('writing.write_again', lang)}
          ttsEnabled
        />
      )}
    </div>
  );
}

function FreeWritingMode({ onAddRecord }: { onAddRecord: (r: Omit<HistoryRecord, 'id' | 'date'>) => void }) {
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
    setWordCount(value.split(/\s+/).filter(Boolean).length);
  };

  const handleTopicChange = (idx: number) => {
    setSelectedTopic(idx);
    setText('');
    setWordCount(0);
    setFeedback(null);
    setExpressionSaved(false);
  };

  const handleScore = async () => {
    if (!text.trim()) return;
    if (!user) { showToast(t('writing.toast_login_required', lang), 'error'); return; }
    setScoring(true);
    setFeedback(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
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
        const xp = data.isCorrect ? 15 : 8;
        setTotalXp(n => n + xp);
        awardXp(xp).catch(e => console.error('[writing] awardXp failed', e));
        updateStreak().catch(e => console.error('[writing] updateStreak failed', e));
        onAddRecord({
          mode: 'free', modeLabel: t('writing.mode_free', lang),
          score: typeof overall === 'number' ? String(overall) : (data.isCorrect ? 'natural' : 'corrected'),
          snippet: text.trim().slice(0, 50),
          details: { type: 'free', topic: topic.title, text: text.trim(), corrected: data.corrected, reason: data.reason, scores: data.scores },
        });
      } else if (res.status === 401) {
        showToast(t('writing.toast_login_required', lang), 'error');
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
      await db.sentences.put({
        id: `writing-expr-${Date.now()}`,
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720, margin: '0 auto', paddingBottom: 20 }}>
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
            {t.title}
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
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--hr-ink-1)' }}>{topic.title}</span>
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
          isDesktop ? (
            <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', textAlign: 'center', lineHeight: 1.6, padding: '16px 12px', margin: 0 }}>
              {t('prac.hw_guide_desktop', lang)}
            </p>
          ) : (
            <div style={{ padding: '8px 2px' }}>
              <KeyboardHint text={t('prac.hw_guide_mobile', lang)} />
            </div>
          )
        ) : (
        <div style={{ display: 'flex', gap: 8 }}>
          <textarea
            value={text}
            onChange={(e) => updateStats(e.target.value)}
            placeholder={t('writing.free_placeholder', lang)}
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

      {/* Submit button */}
      {!feedback && (
        <button
          onClick={handleScore}
          disabled={!text.trim() || scoring}
          className="pr-btn primary block"
          style={{ padding: '14px 0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
        >
          {scoring ? <><Loader2 size={16} className="animate-spin" /> {t('writing.tori_correcting', lang)}</> : <><Sparkles size={16} /> {t('writing.submit_tori_correct', lang)}</>}
        </button>
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

function ClozeMode({ onAddRecord }: { onAddRecord: (r: Omit<HistoryRecord, 'id' | 'date'>) => void }) {
  const { lang } = useLang();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);
  const [showWrongReview, setShowWrongReview] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const xpAwardedRef = useRef(false);
  const streakUpdatedRef = useRef(false);

  const exercise = clozeExercises[currentIdx];
  const isLastQuestion = currentIdx + 1 >= clozeExercises.length;
  const percentage = clozeExercises.length > 0 ? Math.round((score / clozeExercises.length) * 100) : 0;
  const xpQualified = percentage >= 80;

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
      const finalPct = Math.round((finalScore / clozeExercises.length) * 100);
      const xp = finalPct >= 80 ? 50 : 10;
      awardXp(xp).catch(e => console.error('[writing] awardXp failed', e));
      if (!streakUpdatedRef.current) {
        streakUpdatedRef.current = true;
        updateStreak().catch(e => console.error('[writing] updateStreak failed', e));
      }
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Add record and show completion
      // We already incremented score in handleSelect
      const finalPercentage = Math.round((score / clozeExercises.length) * 100);

      onAddRecord({
        mode: 'cloze',
        modeLabel: t('writing.mode_cloze', lang),
        score: `${score}/${clozeExercises.length}`,
        snippet: clozeExercises.map(e => e.full).join(', ').slice(0, 50),
        details: {
          type: 'cloze',
          total: clozeExercises.length,
          correct: score,
          percentage: finalPercentage,
        },
      });

      if (xpQualified) {
        if (!xpAwardedRef.current) {
          awardXp(50).catch(e => console.error('[writing] awardXp failed', e));
          if (!streakUpdatedRef.current) {
            streakUpdatedRef.current = true;
            updateStreak().catch(e => console.error('[writing] updateStreak failed', e));
          }
        }
        playComplete();
        setAllDone(true);
      } else {
        if (!xpAwardedRef.current) {
          awardXp(10).catch(e => console.error('[writing] awardXp failed', e));
          if (!streakUpdatedRef.current) {
            streakUpdatedRef.current = true;
            updateStreak().catch(e => console.error('[writing] updateStreak failed', e));
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
    setCurrentIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setAllDone(false);
    setWrongIndices([]);
    setReviewMode(false);
    xpAwardedRef.current = false;
    streakUpdatedRef.current = false;
  };

  // 未通关: 错题回看
  if (showWrongReview) {
    const finalPct = Math.round((score / clozeExercises.length) * 100);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720, margin: '0 auto', paddingBottom: 20 }}>
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <p style={{ fontFamily: 'var(--hr-serif)', fontStyle: 'italic', fontSize: 40, fontWeight: 700, color: 'var(--hr-ink-1)', margin: 0, letterSpacing: '-.02em' }}>{finalPct}<span style={{ fontSize: 22 }}>%</span></p>
          <p style={{ fontSize: 14, color: 'var(--hr-ink-2)', margin: '4px 0 0', fontWeight: 600 }}>{t('writing.almost_passed', lang)}</p>
          <p style={{ fontSize: 12, color: 'var(--hr-ink-3)', margin: '2px 0 0' }}>{t('writing.review_wrong_hint', lang, { n: wrongIndices.length })}</p>
        </div>
        {wrongIndices.map((qi) => {
          const ex = clozeExercises[qi];
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720, margin: '0 auto', paddingBottom: 20 }}>
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
          const q = clozeExercises[i];
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
          caption={t('writing.cloze_result_caption', lang, { correct: score, total: clozeExercises.length })}
          stats={[
            { num: score, label: t('writing.stat_correct', lang) },
            { num: clozeExercises.length - score, label: t('writing.stat_wrong', lang) },
            { num: xpQualified ? '+50' : '+10', label: 'XP' },
          ]}
          xp={xpQualified ? 50 : 10}
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720, margin: '0 auto', paddingBottom: 20 }}>
      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0, height: 6, background: 'var(--hr-border-1)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(currentIdx / clozeExercises.length) * 100}%`, background: 'var(--hr-purple-base)', borderRadius: 999, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 11, color: 'var(--hr-ink-3)', whiteSpace: 'nowrap', letterSpacing: '.05em' }}>
          {currentIdx + 1} / {clozeExercises.length} · {t('writing.cloze_progress_correct', lang, { n: score })}
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
              {i > 0 && (
                <span style={{
                  display: 'inline-block', minWidth: 60, margin: '0 6px',
                  borderBottom: `3px solid ${answered ? (selectedAnswer === exercise.correct ? 'var(--hr-mint-base)' : 'var(--hr-pink-base)') : 'var(--hr-purple-base)'}`,
                  color: answered ? (selectedAnswer === exercise.correct ? 'var(--hr-mint-strong)' : 'var(--hr-pink-strong)') : 'inherit',
                  fontWeight: 800,
                }}>
                  {answered ? exercise.options[selectedAnswer!] : '　'}
                </span>
              )}
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

      {/* Explanation */}
      {answered && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: 'var(--hr-surface-3)', border: '1px solid var(--hr-border-1)', borderRadius: 12, padding: '12px 14px' }}>
            <p style={{ fontFamily: 'var(--hr-hangul)', fontSize: 15, color: 'var(--hr-ink-1)', margin: 0, fontWeight: 700 }}>{exercise.full}</p>
            <p style={{ fontSize: 12, color: 'var(--hr-ink-3)', margin: '4px 0 0' }}>{exercise.meaning}</p>
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

function HistoryMode({ records }: { records: HistoryRecord[] }) {
  const { lang } = useLang();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const getModeTone = (mode: string) => {
    switch (mode) {
      case 'imitation': return { bg: 'var(--hr-pink-soft)', color: 'var(--hr-pink-strong)', border: 'var(--hr-pink-base)' };
      case 'free':      return { bg: 'var(--hr-purple-soft)', color: 'var(--hr-purple-strong)', border: 'var(--hr-purple-base)' };
      case 'cloze':     return { bg: 'var(--hr-mint-soft)', color: 'var(--hr-mint-strong)', border: 'var(--hr-mint-base)' };
      default:          return { bg: 'var(--hr-surface-3)', color: 'var(--hr-ink-3)', border: 'var(--hr-border-2)' };
    }
  };

  const scoreColor = (pct: number) => pct >= 80 ? 'var(--hr-mint-strong)' : pct >= 60 ? 'var(--hr-peach-strong)' : 'var(--hr-pink-strong)';

  const renderDetails = (record: HistoryRecord) => {
    const d = record.details;
    if (!d) return <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: 0 }}>{t('writing.no_details', lang)}</p>;

    const labelStyle: React.CSSProperties = { fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-ink-3)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0, fontWeight: 700 };
    const valueStyle: React.CSSProperties = { fontSize: 14, color: 'var(--hr-ink-1)', margin: '4px 0 0', fontFamily: 'var(--hr-hangul)', lineHeight: 1.55 };

    switch (d.type) {
      case 'imitation':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div><p style={labelStyle}>{t('writing.detail_chinese_prompt', lang)}</p><p style={{ ...valueStyle, fontFamily: 'var(--hr-sans)' }}>{d.prompt}</p></div>
            <div><p style={labelStyle}>{t('writing.detail_your_answer', lang)}</p><p style={valueStyle}>{d.userAnswer}</p></div>
            <div>
              <p style={labelStyle}>{t('writing.detail_model_answer', lang)}</p>
              <p style={{ ...valueStyle, color: 'var(--hr-mint-strong)', fontWeight: 700 }}>{d.modelAnswer}</p>
            </div>
            <span style={{
              alignSelf: 'flex-start', fontFamily: 'var(--hr-mono)', fontSize: 10.5,
              padding: '3px 10px', borderRadius: 99, letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 700,
              color: d.correct ? 'var(--hr-mint-strong)' : 'var(--hr-pink-strong)',
              background: d.correct ? 'var(--hr-mint-soft)' : 'var(--hr-pink-soft)',
              border: `1px solid ${d.correct ? 'var(--hr-mint-base)' : 'var(--hr-pink-base)'}`,
            }}>{d.correct ? t('writing.stat_correct', lang) : t('writing.stat_wrong', lang)}</span>
            {d.grammarPoint && (
              <div style={{ background: 'var(--hr-pink-soft)', border: '1.5px solid var(--hr-pink-base)', borderRadius: 12, padding: '10px 12px' }}>
                <p style={{ ...labelStyle, color: 'var(--hr-pink-strong)' }}>{t('writing.detail_related_grammar', lang)}</p>
                <p style={{ fontSize: 12.5, color: 'var(--hr-ink-2)', margin: '4px 0 0', lineHeight: 1.6 }}>{d.grammarPoint}</p>
              </div>
            )}
          </div>
        );
      case 'free':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div><p style={labelStyle}>{t('writing.detail_topic', lang)}</p><p style={{ ...valueStyle, fontFamily: 'var(--hr-sans)', fontWeight: 700 }}>{d.topic}</p></div>
            <div><p style={labelStyle}>{t('writing.detail_content', lang)}</p><p style={valueStyle}>{d.text}</p></div>
            {d.scores && (
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {([['score_overall_short', d.scores.overall], ['score_vocabulary', d.scores.vocabulary], ['score_grammar', d.scores.grammar], ['score_naturalness', d.scores.naturalness]] as const).map(([label, val]) => (
                  <span key={label} style={{ fontSize: 12, color: 'var(--hr-ink-2)' }}>
                    {t(`writing.${label}`, lang)} <b style={{ color: 'var(--hr-purple-strong)', fontFamily: 'var(--hr-mono)' }}>{val}</b>
                  </span>
                ))}
              </div>
            )}
            {d.corrected && (
              <div style={{ background: 'var(--hr-mint-soft)', border: '1.5px solid var(--hr-mint-base)', borderRadius: 12, padding: '10px 12px' }}>
                <p style={{ ...labelStyle, color: 'var(--hr-mint-strong)' }}>{t('writing.detail_correction', lang)}</p>
                <p style={valueStyle}>{d.corrected}</p>
              </div>
            )}
            {d.reason && (
              <div style={{ background: 'var(--hr-purple-soft)', border: '1.5px solid var(--hr-purple-base)', borderRadius: 12, padding: '10px 12px' }}>
                <p style={{ ...labelStyle, color: 'var(--hr-purple-strong)' }}>{t('writing.detail_correction_reason', lang)}</p>
                <p style={{ fontSize: 12.5, color: 'var(--hr-ink-2)', margin: '4px 0 0', lineHeight: 1.6 }}>{d.reason}</p>
              </div>
            )}
          </div>
        );
      case 'cloze': {
        const pct = d.percentage || 0;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <p style={labelStyle}>{t('writing.detail_completion', lang)}</p>
              <p style={{ ...valueStyle, fontFamily: 'var(--hr-sans)' }}>{t('writing.detail_completion_value', lang, { total: d.total, correct: d.correct })}</p>
            </div>
            <div style={{ height: 8, background: 'var(--hr-border-1)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: scoreColor(pct), borderRadius: 999, transition: 'width .3s' }} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--hr-ink-3)', margin: 0 }}>
              {t('writing.detail_accuracy', lang)} <b style={{ color: scoreColor(pct), fontFamily: 'var(--hr-serif)', fontStyle: 'italic', fontSize: 14 }}>{pct}%</b>
            </p>
            {pct >= 80 && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--hr-peach-soft)', border: '1.5px solid var(--hr-peach-base)', borderRadius: 12, padding: '10px 14px' }}>
                <Trophy size={16} style={{ color: 'var(--hr-peach-strong)' }} />
                <span style={{ fontSize: 13, color: 'var(--hr-peach-strong)', fontWeight: 700 }}>{t('writing.earned_50_xp', lang)}</span>
              </div>
            )}
          </div>
        );
      }
      default:
        return <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: 0 }}>{t('writing.no_details', lang)}</p>;
    }
  };

  if (records.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '48px 20px', textAlign: 'center' }}>
        <Clock size={40} style={{ color: 'var(--hr-ink-4)' }} />
        <p style={{ fontSize: 14, color: 'var(--hr-ink-2)', margin: 0, fontWeight: 600 }}>{t('writing.empty_title', lang)}</p>
        <p style={{ fontSize: 12, color: 'var(--hr-ink-3)', margin: 0 }}>{t('writing.empty_hint', lang)}</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720, margin: '0 auto', paddingBottom: 20 }}>
      {records.map((record) => {
        const tone = getModeTone(record.mode);
        const Icon = record.mode === 'imitation' ? PenLine : record.mode === 'free' ? Sparkles : BookOpen;
        const isOpen = expandedIds.has(record.id);
        return (
          <div
            key={record.id}
            style={{
              background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
              borderRadius: 14, overflow: 'hidden',
              boxShadow: 'var(--hr-shadow-sm)',
              transition: 'border-color .15s var(--hr-ease)',
            }}
          >
            <button
              onClick={() => toggleExpand(record.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
              }}
            >
              <div style={{
                flexShrink: 0, width: 40, height: 40, borderRadius: 12,
                background: tone.bg, border: `1px solid ${tone.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={18} style={{ color: tone.color }} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                  <span style={{
                    fontFamily: 'var(--hr-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 700,
                    padding: '2px 8px', borderRadius: 99,
                    background: tone.bg, color: tone.color, border: `1px solid ${tone.border}`,
                  }}>{record.mode ? t(`writing.mode_${record.mode}`, lang) : record.modeLabel}</span>
                  <span style={{ fontSize: 11.5, color: 'var(--hr-ink-3)', fontFamily: 'var(--hr-mono)', letterSpacing: '.03em' }}>{record.date}</span>
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--hr-ink-1)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'var(--hr-hangul)' }}>{record.snippet}</p>
              </div>
              <div style={{ flexShrink: 0, fontSize: 13, fontWeight: 700, color: 'var(--hr-ink-1)' }}>
                {record.mode === 'imitation'
                  ? t(`writing.verdict_${record.score}`, lang)
                  : record.mode === 'free'
                    ? (!isNaN(Number(record.score)) ? t('writing.score_points', lang, { n: Number(record.score) }) : t(`writing.score_${record.score}`, lang))
                    : record.mode === 'cloze'
                      ? (() => { const [c, t2] = record.score.split('/').map(Number); return !isNaN(c) && !isNaN(t2) ? t('writing.cloze_score', lang, { correct: c, total: t2 }) : record.score; })()
                      : record.score
                }
              </div>
              {isOpen ? <ChevronUp size={18} style={{ color: 'var(--hr-ink-3)', flexShrink: 0 }} /> : <ChevronDown size={18} style={{ color: 'var(--hr-ink-3)', flexShrink: 0 }} />}
            </button>

            {isOpen && (
              <div style={{ padding: '14px 16px 16px', borderTop: '1px solid var(--hr-border-1)' }}>
                {renderDetails(record)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
