'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ToriDay, ToriOutputTask, ToriModuleState } from '@/types/tori-diary';
import { ChevronRight, Check, X, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { speak } from '@/lib/tts';
import { sfxCorrect, sfxWrong } from '@/lib/sfx';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  day: ToriDay;
  onComplete: (results: Array<{ taskId: string; correct: boolean; userText?: string }>) => void;
  onBack?: () => void;
  initialState?: ToriModuleState['output'];
  onStateChange?: (patch: ToriModuleState['output']) => void;
}

type Checked = 'idle' | 'correct' | 'wrong';
export type { Checked };
export { synthesizeCompose };

export function DiaryOutput({ day, onComplete, onBack, initialState, onStateChange }: Props) {
  const { lang } = useLang();
  const tasks = day.output;
  const [qIdx, setQIdx] = useState(initialState?.qIdx ?? 0);
  const [checked, setChecked] = useState<Checked>('idle');
  const [shaking, setShaking] = useState(false);
  const [results, setResults] = useState<Array<{ taskId: string; correct: boolean; userText?: string }>>(initialState?.results ?? []);
  const maxHearts = 3;
  const [hearts, setHearts] = useState(initialState?.hearts ?? maxHearts);

  useEffect(() => {
    onStateChange?.({ qIdx, hearts, results });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIdx, hearts, results]);

  // compose
  const [picked, setPicked] = useState<number[]>([]);
  const [composeChecked, setComposeChecked] = useState<Checked>('idle');
  // match-pair
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongZh, setWrongZh] = useState<string | null>(null);
  // 通用选项
  const [pickedIdx, setPickedIdx] = useState<number | null>(null);
  // 当前题用户最后一次答（给胡萝卜解释用）
  const [lastUserAnswer, setLastUserAnswer] = useState<string>('');

  useEffect(() => {
    if (!shaking) return;
    const timer = setTimeout(() => setShaking(false), 500);
    return () => clearTimeout(timer);
  }, [shaking]);

  useEffect(() => {
    setChecked('idle');
    setComposeChecked('idle');
    setPicked([]);
    setPickedIdx(null);
    setMatched(new Set());
    setWrongZh(null);
    setShaking(false);
    setLastUserAnswer('');
  }, [qIdx]);

  const task = tasks[qIdx];
  const isLast = qIdx === tasks.length - 1;
  const allCleared = checked === 'correct' || composeChecked === 'correct';
  const currentChecked: Checked = task?.kind === 'fill' || task?.kind === 'compose' ? composeChecked : checked;

  const handleCorrect = (taskId: string, userText?: string) => {
    setResults((rs) => [...rs, { taskId, correct: true, userText }]);
    sfxCorrect();
  };
  const handleWrong = () => {
    sfxWrong();
    setHearts(h => Math.max(0, h - 1));
  };

  const handlePrev = () => {
    if (qIdx === 0) return;
    setQIdx(qIdx - 1);
  };

  const handleCardNext = () => {
    if (!allCleared) return;
    if (qIdx < tasks.length - 1) setQIdx(qIdx + 1);
  };

  const [submittedRef] = useState({ current: false });
  const handleModuleNext = () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    onComplete(results);
  };

  if (hearts === 0) {
    return (
      <div className="diary-anim-fade-up" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <div style={{ fontSize: 64, marginBottom: 8, animation: 'diary-heart-break 1s ease forwards' }}>💔</div>
        <p className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 8 }}>{t('diary.out.heartsGoneTitle', lang)}</p>
        <p className="diary-text-soft" style={{ marginBottom: 24 }}>{t('diary.out.heartsGoneDesc', lang)}</p>
        <div style={{ display: 'flex', gap: 12 }}>
          {onBack && (
            <button onClick={onBack} style={{ flex: 1, height: 52, borderRadius: 14, background: 'var(--diary-paper-deep)', color: 'var(--diary-ink-2)', border: '1px solid var(--diary-line)', cursor: 'pointer', fontSize: 16, fontWeight: 600, fontFamily: 'var(--diary-font-zh)' }}>{t('diary.out.prevStep', lang)}</button>
          )}
          <button onClick={() => {
          setHearts(maxHearts); setQIdx(0); setResults([]);
          setChecked('idle'); setComposeChecked('idle');
          setPicked([]); setPickedIdx(null);
          setMatched(new Set()); setWrongZh(null);
          setShaking(false); setLastUserAnswer('');
        }} className="diary-btn diary-btn-primary" style={{ flex: 2 }}>
            {t('diary.out.retryChallenge', lang)}
          </button>
        </div>
      </div>
    );
  }

  if (!task || tasks.length === 0) {
    return (
      <div className="diary-anim-fade-up" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <p className="diary-text-soft" style={{ marginBottom: 20 }}>{t('diary.out.noPractice', lang)}</p>
        <div style={{ display: 'flex', gap: 12 }}>
          {onBack && (
            <button onClick={onBack} style={{ flex: 1, height: 52, borderRadius: 14, background: 'var(--diary-paper-deep)', color: 'var(--diary-ink-2)', border: '1px solid var(--diary-line)', cursor: 'pointer', fontSize: 16, fontWeight: 600, fontFamily: 'var(--diary-font-zh)' }}>{t('diary.out.prevStep', lang)}</button>
          )}
          <button onClick={() => onComplete([])} className="diary-btn diary-btn-primary" style={{ flex: 2 }}>
            {t('diary.out.continueWrapup', lang)} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const isCompose = task.kind === 'fill' || task.kind === 'compose';
  const lastHeartIdx = maxHearts - hearts; // 最近碎的那个🥕的index

  return (
    <div className="diary-anim-fade-up">
      {/* 顶栏：标签 + 爱心血量 */}
      <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="diary-tag" style={{ background: 'var(--color-mint-strong)', color: '#fff' }}>{t('diary.out.tagOutput', lang)}</span>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {Array.from({ length: maxHearts }, (_, i) => {
            const lost = i < maxHearts - hearts;
            const justBroke = lost && i === lastHeartIdx - 1;
            return (
              <span key={i} style={{
                fontSize: 18,
                opacity: lost ? 0.15 : 1,
                transform: lost ? 'scale(.75)' : 'scale(1)',
                transition: 'opacity .4s, transform .4s',
                animation: justBroke ? 'diary-heart-break .5s ease forwards' : undefined,
              }}>🥕</span>
            );
          })}
        </div>
      </div>

      {/* 标题 + 进度 */}
      <h2 className="diary-h2" style={{ marginBottom: 4 }}>{KIND_TITLE[task.kind] ? t(KIND_TITLE[task.kind]!, lang) : t('diary.out.kindDefault', lang)}</h2>
      <p className="diary-text-soft" style={{ fontSize: 13, marginBottom: task.sceneContext ? 14 : 20 }}>
        {qIdx + 1}/{tasks.length} · {task.kind === 'compose' || task.kind === 'fill' ? t('diary.out.hintCompose', lang) : task.kind === 'match-pair' ? t('diary.out.hintMatch', lang) : task.kind === 'listen-choice' ? t('diary.out.hintListen', lang) : t('diary.out.hintChoice', lang)}
      </p>

      {/* 场景上下文 */}
      {task.sceneContext && (
        <div className="diary-scene-break diary-anim-fade-up">
          {task.sceneContext.split('\n').map((line, i, arr) => (
            <p key={i} style={{ margin: 0, color: i === arr.length - 1 ? '#fff' : 'rgba(255,255,255,0.65)', fontWeight: i === arr.length - 1 ? 700 : 400 }}>{line}</p>
          ))}
        </div>
      )}

      {isCompose ? (
        <ComposeBlock
          key={task.id}
          task={task}
          picked={picked}
          setPicked={setPicked}
          checked={composeChecked}
          setChecked={setComposeChecked}
          shaking={shaking}
          setShaking={setShaking}
          onCorrect={() => handleCorrect(task.id)}
          onWrong={handleWrong}
          onUserAnswer={setLastUserAnswer}
        />
      ) : (
        <ChoiceBlock
          key={task.id}
          task={task}
          checked={checked}
          setChecked={setChecked}
          pickedIdx={pickedIdx}
          setPickedIdx={setPickedIdx}
          shaking={shaking}
          setShaking={setShaking}
          matched={matched}
          setMatched={setMatched}
          wrongZh={wrongZh}
          setWrongZh={setWrongZh}
          onCorrect={() => handleCorrect(task.id)}
          onWrong={handleWrong}
          onUserAnswer={setLastUserAnswer}
        />
      )}

      {/* match-pair 在自己组件里渲染错题解释；这里只接管其余题型 */}
      {currentChecked !== 'idle' && task.kind !== 'match-pair' && (
        <CarrotExplain
          key={`${task.id}-${currentChecked}`}
          task={task}
          isCorrect={currentChecked === 'correct'}
          userAnswer={lastUserAnswer}
        />
      )}
      {/* match-pair 全部连对后由父级显示答对解释 */}
      {currentChecked === 'correct' && task.kind === 'match-pair' && (
        <CarrotExplain
          key={`${task.id}-correct`}
          task={task}
          isCorrect
          userAnswer="全部连对"
        />
      )}

      {/* 题卡导航：上一题 / 下一题 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 22 }}>
        <button onClick={handlePrev} disabled={qIdx === 0}
          className="diary-btn diary-btn-ghost"
          style={{ fontSize: 12, padding: '4px 14px', opacity: qIdx === 0 ? 0.25 : 1 }}
        >
          {t('diary.out.prevQuestion', lang)}
        </button>
        <span className="diary-text-soft" style={{ fontSize: 12, minWidth: '3em', textAlign: 'center' }}>{qIdx + 1} / {tasks.length}</span>
        <button onClick={handleCardNext} disabled={!allCleared || isLast}
          className="diary-btn diary-btn-ghost"
          style={{ fontSize: 12, padding: '4px 14px', opacity: (!allCleared || isLast) ? 0.25 : 1 }}
        >
          {!allCleared ? t('diary.out.answerFirst', lang) : t('diary.out.nextQuestion', lang)}
        </button>
      </div>

      {/* 模块导航：上一步(1/3) + 继续·收尾(2/3) */}
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        {onBack && (
          <button onClick={onBack} style={{ flex: 1, height: 52, borderRadius: 14, background: 'var(--diary-paper-deep)', color: 'var(--diary-ink-2)', border: '1px solid var(--diary-line)', cursor: 'pointer', fontSize: 16, fontWeight: 600, fontFamily: 'var(--diary-font-zh)' }}>{t('diary.out.prevStep', lang)}</button>
        )}
        <button
          onClick={handleModuleNext}
          className="diary-btn diary-btn-primary"
          disabled={!isLast || !allCleared}
          style={{ flex: 2, opacity: (isLast && allCleared) ? 1 : 0.4, cursor: (isLast && allCleared) ? 'pointer' : 'not-allowed' }}
        >
          {t('diary.out.continueWrapup', lang)} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

const KIND_TITLE: Partial<Record<ToriOutputTask['kind'], string>> = {
  fill: 'diary.out.kindCompose',
  compose: 'diary.out.kindCompose',
  'listen-choice': 'diary.out.kindListen',
  'zh-to-ko': 'diary.out.kindZhToKo',
  'particle-error': 'diary.out.kindParticle',
  'match-pair': 'diary.out.kindMatch',
};

/* ═══════ Compose / Fill ═══════ */
export function ComposeBlock({
  task, picked, setPicked, checked, setChecked, shaking, setShaking, onCorrect, onWrong, onUserAnswer,
}: {
  task: ToriOutputTask;
  picked: number[]; setPicked: (v: number[] | ((p: number[]) => number[])) => void;
  checked: Checked; setChecked: (v: Checked) => void;
  shaking: boolean; setShaking: (v: boolean) => void;
  onCorrect: () => void; onWrong: () => void;
  onUserAnswer: (s: string) => void;
}) {
  const { lang } = useLang();
  const compose = useMemo(() => synthesizeCompose(task), [task]);
  const userTokens = picked.map((i) => compose?.tokens[i] ?? '');
  const isFull = compose ? userTokens.length === compose.composeAnswer.length : false;
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (checked === 'idle') setSubmitted(false);
  }, [checked]);

  const handleConfirm = () => {
    if (!compose || !isFull || checked !== 'idle') return;
    const userJoin = userTokens.join(' ');
    onUserAnswer(userJoin);
    const correct = userJoin === compose.composeAnswer.join(' ');
    setSubmitted(true);
    if (correct) {
      setChecked('correct');
      onCorrect();
    } else {
      setChecked('wrong');
      setShaking(true);
      onWrong();
    }
  };

  const handleReset = () => {
    setPicked([]);
    setChecked('idle');
    setSubmitted(false);
  };

  if (!compose) return null;

  const isLocked = checked === 'correct';

  return (
    <div
      className={`diary-card-paper${shaking ? ' diary-card-shake' : ''}`}
      style={{ padding: '24px 22px', background: 'var(--diary-paper)', position: 'relative', overflow: 'hidden' }}
    >
      {checked === 'correct' && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 40%, rgba(94,168,134,.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      <div style={{ textAlign: 'center', marginBottom: 20, position: 'relative' }}>
        <span style={{
          display: 'inline-block', padding: '3px 10px', borderRadius: 6,
          background: 'var(--diary-gold-soft)', color: 'var(--diary-gold-deep)',
          fontSize: 11, fontWeight: 700, letterSpacing: '.06em', marginBottom: 10,
        }}>
          {t('diary.out.composeBadge', lang)}
        </span>
        <p style={{
          fontSize: 17, fontWeight: 700, color: 'var(--diary-ink)',
          lineHeight: 1.5, margin: 0,
        }}>
          {task.zhHint}
        </p>
      </div>

      {/* 已选词卡区 */}
      <div style={{
        minHeight: 68, padding: '16px 14px',
        background: checked === 'correct'
          ? 'rgba(94,168,134,.08)'
          : checked === 'wrong'
            ? 'rgba(193,78,58,.06)'
            : 'var(--diary-paper-deep)',
        border: checked === 'correct'
          ? '2px solid var(--color-mint-strong)'
          : checked === 'wrong'
            ? '2px solid var(--diary-stamp-red)'
            : '2px dashed var(--diary-line-strong)',
        borderRadius: 14, marginBottom: 18,
        display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center',
        transition: 'border-color .25s, background .25s',
        position: 'relative',
      }}>
        {userTokens.length === 0 ? (
          <span style={{ fontSize: 13, color: 'var(--diary-ink-faint)', fontStyle: 'italic', userSelect: 'none' }}>
            {t('diary.out.tapChipsHint', lang)}
          </span>
        ) : userTokens.map((tok, i) => (
          <button
            key={`pick-${tok}-${i}`}
            onClick={() => {
              if (!isLocked) { setPicked((p) => p.filter((_, j) => j !== i)); setChecked('idle'); }
            }}
            disabled={isLocked}
            className="diary-chip-entrance"
            style={{
              padding: '8px 14px', borderRadius: 10,
              background: isLocked ? 'rgba(94,168,134,.18)' : 'var(--diary-paper)',
              border: isLocked ? '1.5px solid var(--color-mint-strong)' : '1.5px solid var(--diary-line-strong)',
              cursor: isLocked ? 'default' : 'pointer',
              fontSize: 16, fontWeight: 700, color: 'var(--diary-ink)',
              fontFamily: 'var(--diary-font-ko)',
              animationDelay: `${i * 60}ms`,
              transition: 'transform .15s, box-shadow .15s',
              boxShadow: 'var(--shadow-sm)',
              display: 'inline-flex', alignItems: 'center', gap: 4,
            }}
            onMouseEnter={(e) => { if (!isLocked) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,.08)'; } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            <span>{tok}</span>
            {!isLocked && <span style={{ fontSize: 10, color: 'var(--diary-ink-faint)', marginLeft: 2 }}>×</span>}
          </button>
        ))}
        {checked === 'correct' && (
          <Check size={30} strokeWidth={3} color="var(--color-mint-strong)" style={{ marginLeft: 'auto', flexShrink: 0 }} />
        )}
        {checked === 'wrong' && (
          <X size={22} color="var(--diary-stamp-red)" style={{ marginLeft: 'auto', flexShrink: 0 }} />
        )}
      </div>

      {/* 候选词卡池 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: isFull && checked === 'idle' ? 14 : 0 }}>
        {compose.tokens.map((tok, i) => {
          const used = picked.includes(i);
          return (
            <button
              key={i}
              onClick={() => {
                if (!used && !isLocked) { setPicked((p) => [...p, i]); setChecked('idle'); }
              }}
              disabled={used || isLocked}
              className={!used && !isLocked ? 'diary-chip-entrance' : ''}
              style={{
                padding: '8px 14px', borderRadius: 10,
                background: used ? 'transparent' : 'var(--diary-paper-deep)',
                border: used ? '1.5px solid transparent' : '1.5px solid var(--diary-line)',
                cursor: used || isLocked ? 'default' : 'pointer',
                fontSize: 15, fontWeight: 600, color: used ? 'transparent' : 'var(--diary-ink)',
                fontFamily: 'var(--diary-font-ko)',
                opacity: used ? 0 : 1,
                transition: 'transform .15s, opacity .2s, background .2s, border-color .2s',
                pointerEvents: used ? 'none' : 'auto',
                animationDelay: `${i * 40}ms`,
                transform: used ? 'scale(.8)' : '',
              }}
              onMouseEnter={(e) => { if (!used && !isLocked) e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { if (!used && !isLocked) e.currentTarget.style.transform = ''; }}
            >
              {tok}
            </button>
          );
        })}
      </div>

      {/* 确认 / 重置按钮 */}
      {checked === 'idle' && isFull && (
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button onClick={handleReset}
            className="diary-btn diary-btn-ghost"
            style={{ flex: 1, padding: '10px 16px', fontSize: 13, borderRadius: 12 }}
          >
            <RotateCcw size={12} /> {t('diary.out.reset', lang)}
          </button>
          <button onClick={handleConfirm}
            className="diary-btn diary-btn-primary diary-confirm-glow"
            style={{ flex: 2, fontSize: 15, borderRadius: 12, padding: '12px 20px' }}
          >
            {t('diary.out.confirmAnswer', lang)}
          </button>
        </div>
      )}

      {/* 答错反馈 */}
      {checked === 'wrong' && (
        <div style={{
          marginTop: 16, padding: '12px 14px',
          background: 'rgba(193,78,58,.08)', borderRadius: 10,
          borderLeft: '3px solid var(--diary-stamp-red)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <X size={18} color="var(--diary-stamp-red)" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 13, flex: 1 }}>{t('diary.out.wrongOrder', lang)}</span>
          <button onClick={handleReset}
            className="diary-btn diary-btn-ghost"
            style={{ padding: '5px 12px', fontSize: 12 }}
          >
            <RotateCcw size={12} /> {t('diary.out.redo', lang)}
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════ Choice (listen / zh-to-ko / particle / match) ═══════ */
export function ChoiceBlock({
  task, checked, setChecked, pickedIdx, setPickedIdx, shaking, setShaking, matched, setMatched, wrongZh, setWrongZh, onCorrect, onWrong, onUserAnswer,
}: {
  task: ToriOutputTask; checked: Checked; setChecked: (v: Checked) => void;
  pickedIdx: number | null; setPickedIdx: (v: number | null) => void;
  shaking: boolean; setShaking: (v: boolean) => void;
  matched: Set<string>; setMatched: (v: Set<string>) => void;
  wrongZh: string | null; setWrongZh: (v: string | null) => void;
  onCorrect: () => void; onWrong: () => void;
  onUserAnswer: (s: string) => void;
}) {
  const { lang } = useLang();
  if (task.kind === 'match-pair' && task.pairs) {
    return <MatchBlock key={task.id} task={task} matched={matched} setMatched={setMatched} wrongZh={wrongZh} setWrongZh={setWrongZh} checked={checked} setChecked={setChecked} onCorrect={onCorrect} onWrong={onWrong} onUserAnswer={onUserAnswer} />;
  }

  const choices = task.choices ?? [];
  const isListen = task.kind === 'listen-choice';

  const handlePick = (idx: number) => {
    if (checked === 'correct' || checked === 'wrong') return;
    setPickedIdx(idx);
    const c = choices[idx];
    onUserAnswer(c?.ko ?? c?.zh ?? c?.text ?? '');
    if (c?.correct) {
      setChecked('correct');
      onCorrect();
    } else {
      setChecked('wrong');
      setShaking(true);
      onWrong();
    }
  };

  return (
    <div
      className={`diary-card-paper${shaking ? ' diary-card-shake' : ''}`}
      style={{ padding: '24px 22px', background: 'var(--diary-paper)', position: 'relative', overflow: 'hidden' }}
    >
      {checked === 'correct' && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 40%, rgba(94,168,134,.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      {/* 标题 + 播放按钮 */}
      <div style={{ textAlign: 'center', marginBottom: 22, position: 'relative' }}>
        {isListen && task.audioKo && (
          <button
            onClick={() => { speak(task.audioKo!).catch(() => {}); }}
            className="diary-listen-pulse"
            style={{
              width: 54, height: 54, borderRadius: '50%',
              background: 'var(--color-pink-base)', color: '#fff', border: 'none',
              cursor: 'pointer', marginBottom: 14,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform .15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
          >
            <Volume2 size={24} />
          </button>
        )}
        <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--diary-ink)', margin: 0 }}>
          {isListen ? t('diary.out.listenPrompt', lang) : task.zhPrompt ?? task.zhHint ?? t('diary.out.choicePrompt', lang)}
        </p>
        {isListen && (
          <p style={{ fontSize: 12, color: 'var(--diary-ink-faint)', marginTop: 6 }}>
            {t('diary.out.replayHint', lang)}
          </p>
        )}
      </div>

      {/* 选项卡片 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {choices.map((c, i) => {
          const isPicked = pickedIdx === i;
          const showResult = checked !== 'idle' && isPicked;
          const revealCorrect = checked === 'correct' && choices[i]?.correct;

          let border = '1.5px solid var(--diary-line)';
          let bg = 'var(--diary-paper-deep)';
          let transform = '';
          if (revealCorrect) {
            border = '2px solid var(--color-mint-strong)';
            bg = 'rgba(94,168,134,.14)';
          } else if (showResult && !choices[i]?.correct) {
            border = '2px solid var(--diary-stamp-red)';
            bg = 'rgba(193,78,58,.1)';
          }

          return (
            <button
              key={i}
              onClick={() => handlePick(i)}
              disabled={checked === 'correct'}
              style={{
                padding: '14px 18px', textAlign: 'left', borderRadius: 14,
                border, background: bg,
                cursor: checked === 'correct' ? 'default' : 'pointer',
                fontSize: isListen ? 14 : 16, fontWeight: 600, color: 'var(--diary-ink)',
                display: 'flex', alignItems: 'center', gap: 12,
                transition: 'all .2s cubic-bezier(.34,1.56,.64,1)',
                transform,
                animationDelay: `${i * 50}ms`,
                position: 'relative',
              }}
              className="diary-chip-entrance"
              onMouseEnter={(e) => {
                if (checked !== 'correct' && checked !== 'wrong') {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.borderColor = 'var(--color-pink-base)';
                  e.currentTarget.style.background = 'rgba(255,127,168,.06)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.background = '';
              }}
            >
              <span style={{
                width: 28, height: 28, borderRadius: '50%',
                background: revealCorrect ? 'var(--color-mint-strong)' : isPicked && checked === 'wrong' ? 'var(--diary-stamp-red)' : 'var(--diary-line)',
                color: revealCorrect || (isPicked && checked === 'wrong') ? '#fff' : 'var(--diary-ink-soft)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, flexShrink: 0,
                transition: 'background .2s, color .2s',
              }}>
                {revealCorrect ? <Check size={14} color="#fff" /> : isPicked && checked === 'wrong' ? <X size={14} color="#fff" /> : String.fromCharCode(65 + i)}
              </span>
              <span style={{ flex: 1, minWidth: 0, overflowWrap: 'break-word' }}>{c.zh ?? c.ko}</span>
              {revealCorrect && <Check size={20} color="var(--color-mint-strong)" style={{ flexShrink: 0 }} />}
              {showResult && !choices[i]?.correct && <X size={20} color="var(--diary-stamp-red)" style={{ flexShrink: 0 }} />}
            </button>
          );
        })}
      </div>

      {/* 答错反馈 */}
      {checked === 'wrong' && (
        <div style={{
          marginTop: 16, padding: '12px 14px',
          background: 'rgba(193,78,58,.08)', borderRadius: 10,
          borderLeft: '3px solid var(--diary-stamp-red)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <X size={18} color="var(--diary-stamp-red)" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 13, flex: 1 }}>{t('diary.out.wrongTryAgain', lang)}</span>
          <button onClick={() => { setPickedIdx(null); setChecked('idle'); }}
            className="diary-btn diary-btn-ghost"
            style={{ padding: '5px 12px', fontSize: 12 }}
          >
            <RotateCcw size={12} /> {t('diary.out.reselect', lang)}
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════ Match Pair ═══════ */
function MatchBlock({
  task, matched, setMatched, wrongZh, setWrongZh, checked, setChecked, onCorrect, onWrong, onUserAnswer,
}: {
  task: ToriOutputTask; matched: Set<string>; setMatched: (v: Set<string>) => void;
  wrongZh: string | null; setWrongZh: (v: string | null) => void;
  checked: Checked; setChecked: (v: Checked) => void;
  onCorrect: () => void; onWrong: () => void;
  onUserAnswer: (s: string) => void;
}) {
  const { lang } = useLang();
  const pairs = task.pairs ?? [];
  const [selKo, setSelKo] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [wrongInfo, setWrongInfo] = useState<{ ko: string; userZh: string; correctZh: string } | null>(null);

  const shuffledKo = useMemo(() => shuffle(pairs.map((p) => p.ko)), [pairs]);
  const shuffledZh = useMemo(() => shuffle(pairs.map((p) => p.zh)), [pairs]);

  useEffect(() => {
    if (!shake) return;
    const timer = setTimeout(() => { setShake(false); setWrongZh(null); }, 480);
    return () => clearTimeout(timer);
  }, [shake, setWrongZh]);

  const handleKo = (ko: string) => {
    if (matched.has(pairs.find((p) => p.ko === ko)?.zh ?? '')) return;
    setSelKo(ko);
  };
  const handleZh = (zh: string) => {
    if (!selKo || matched.has(zh)) return;
    const pair = pairs.find((p) => p.ko === selKo && p.zh === zh);
    if (pair) {
      const next = new Set(matched); next.add(zh);
      setMatched(next);
      setSelKo(null);
      sfxCorrect();
      setWrongInfo(null);
      if (next.size === pairs.length) {
        setChecked('correct');
        onUserAnswer('全部连对');
        onCorrect();
      }
    } else {
      setWrongZh(zh);
      setShake(true);
      onWrong();
      const wrongPair = pairs.find((p) => p.ko === selKo);
      const correctZh = wrongPair?.zh ?? '';
      onUserAnswer(`${selKo} ↔ ${zh}（应该是 ${selKo} ↔ ${correctZh}）`);
      setWrongInfo({ ko: selKo, userZh: zh, correctZh });
      setSelKo(null);
    }
  };

  const allMatched = matched.size === pairs.length;

  return (
    <div
      className={`diary-card-paper${shake ? ' diary-card-shake' : ''}`}
      style={{ padding: '24px 22px', background: 'var(--diary-paper)', position: 'relative', overflow: 'hidden' }}
    >
      {allMatched && checked === 'correct' && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 40%, rgba(94,168,134,.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      )}

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={{
          display: 'inline-block', padding: '3px 10px', borderRadius: 6,
          background: 'var(--diary-gold-soft)', color: 'var(--diary-gold-deep)',
          fontSize: 11, fontWeight: 700, letterSpacing: '.06em', marginBottom: 10,
        }}>
          {t('diary.out.matchBadge', lang)}
        </span>
        <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--diary-ink)', margin: 0 }}>
          {selKo ? t('diary.out.matchMeaningOf', lang, { ko: selKo }) : t('diary.out.matchPickHint', lang)}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {shuffledKo.map((ko) => {
            const pairZh = pairs.find((p) => p.ko === ko)?.zh ?? '';
            const isMatched = matched.has(pairZh);
            const isSelected = selKo === ko;
            return (
              <button
                key={ko}
                onClick={() => handleKo(ko)}
                disabled={isMatched}
                className={!isMatched ? 'diary-chip-entrance' : ''}
                style={{
                  padding: '12px 14px', borderRadius: 12,
                  border: isSelected ? '2px solid var(--color-pink-base)' : isMatched ? '1.5px solid var(--color-mint-strong)' : '1.5px solid var(--diary-line)',
                  background: isMatched ? 'rgba(94,168,134,.12)' : isSelected ? 'rgba(255,127,168,.08)' : 'var(--diary-paper-deep)',
                  cursor: isMatched ? 'default' : 'pointer',
                  fontSize: 15, fontWeight: 700, color: 'var(--diary-ink)',
                  fontFamily: 'var(--diary-font-ko)',
                  opacity: isMatched ? 0.5 : 1,
                  transition: 'all .15s',
                  transform: isSelected ? 'scale(1.03)' : '',
                }}
              >
                {ko}
                {isMatched && <Check size={15} color="var(--color-mint-strong)" style={{ marginLeft: 6, verticalAlign: 'middle' }} />}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {shuffledZh.map((zh) => {
            const isMatched = matched.has(zh);
            const isWrong = wrongZh === zh;
            return (
              <button
                key={zh}
                onClick={() => handleZh(zh)}
                disabled={isMatched}
                className={!isMatched ? 'diary-chip-entrance' : ''}
                style={{
                  padding: '12px 14px', borderRadius: 12,
                  border: isWrong ? '2px solid var(--diary-stamp-red)' : isMatched ? '1.5px solid var(--color-mint-strong)' : '1.5px solid var(--diary-line)',
                  background: isMatched ? 'rgba(94,168,134,.12)' : isWrong ? 'rgba(193,78,58,.14)' : 'var(--diary-paper-deep)',
                  cursor: isMatched ? 'default' : 'pointer',
                  fontSize: 14, fontWeight: 600, color: 'var(--diary-ink)',
                  transition: 'all .15s',
                }}
              >
                {zh}
                {isMatched && <Check size={15} color="var(--color-mint-strong)" style={{ marginLeft: 6, verticalAlign: 'middle' }} />}
              </button>
            );
          })}
        </div>
      </div>

      {wrongInfo && checked !== 'correct' && (
        <CarrotExplain
          key={`${task.id}-wrong-${wrongInfo.ko}-${wrongInfo.userZh}`}
          task={task}
          isCorrect={false}
          userAnswer={`${wrongInfo.ko} ↔ ${wrongInfo.userZh}（正确：${wrongInfo.ko} ↔ ${wrongInfo.correctZh}）`}
        />
      )}
    </div>
  );
}

/* ═══════ Carrot Explain ═══════ */
function CarrotExplain({
  task, isCorrect, userAnswer,
}: { task: ToriOutputTask; isCorrect: boolean; userAnswer: string }) {
  const { lang } = useLang();
  const [text, setText] = useState<string>(isCorrect ? (task.successMsg ?? t('diary.out.correctDefault', lang)) : '');
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => () => abortRef.current?.abort(), []);

  const correctAnswer = useMemo(() => {
    if (task.composeAnswer) return task.composeAnswer.join(' ');
    if (task.choices) {
      const c = task.choices.find((x) => x.correct);
      return c?.ko ?? c?.zh ?? c?.text ?? '';
    }
    if (task.pairs) return task.pairs.map((p) => `${p.ko}↔${p.zh}`).join('，');
    return task.answer ?? '';
  }, [task]);

  const fetchExplain = async () => {
    if (loading || requested) return;
    setLoading(true);
    setRequested(true);
    setError(false);
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch('/api/ai/carrot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: ctrl.signal,
        body: JSON.stringify({
          explain: {
            kind: task.kind,
            zhHint: task.zhHint ?? task.zhPrompt ?? '',
            userAnswer,
            correctAnswer,
            isCorrect,
          },
        }),
      });
      const data = await res.json();
      if (res.ok && data.reply) {
        setText(data.reply);
      } else {
        // AI 失败：标记 error 状态，UI 显示"再试一次"按钮而不是塞假台词
        setError(true);
        setRequested(false);
      }
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
      setError(true);
      setRequested(false);
    } finally {
      if (abortRef.current === ctrl) abortRef.current = null;
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isCorrect && !requested) {
      const timer = setTimeout(fetchExplain, 250);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="diary-anim-fade-up" style={{
      marginTop: 14, padding: '12px 14px',
      background: isCorrect ? 'rgba(94,168,134,.08)' : 'rgba(255,184,77,.08)',
      borderRadius: 12,
      borderLeft: `3px solid ${isCorrect ? 'var(--color-mint-strong)' : 'var(--color-gold-base)'}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1.1 }}>🥕</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--diary-ink-soft)', letterSpacing: '.06em', marginBottom: 4 }}>
            {t('diary.out.carrotTitle', lang)}
          </div>
          {text ? (
            <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--diary-ink)', margin: 0, whiteSpace: 'pre-wrap' }}>
              {text}
            </p>
          ) : error ? (
            <button
              onClick={fetchExplain}
              disabled={loading}
              className="diary-btn diary-btn-ghost"
              style={{ padding: '6px 12px', fontSize: 12, gap: 6 }}
            >
              <Sparkles size={13} /> {loading ? t('diary.out.thinking', lang) : t('diary.out.carrotRetry', lang)}
            </button>
          ) : (
            <button
              onClick={fetchExplain}
              disabled={loading}
              className="diary-btn diary-btn-ghost"
              style={{ padding: '6px 12px', fontSize: 12, gap: 6 }}
            >
              <Sparkles size={13} /> {loading ? t('diary.out.thinking', lang) : t('diary.out.carrotExplain', lang)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════ Compose helpers ═══════ */
interface ComposeData { taskId: string; zhHint: string; fullSentence: string; composeAnswer: string[]; tokens: string[]; successMsg?: string; }

function synthesizeCompose(task: ToriOutputTask): ComposeData | null {
  if (task.tokens && task.composeAnswer && task.tokens.length > 0) {
    return { taskId: task.id, zhHint: task.zhHint ?? '', fullSentence: task.composeAnswer.join(' '), composeAnswer: task.composeAnswer, tokens: shuffle(task.tokens), successMsg: task.successMsg };
  }
  const answer = task.answer;
  if (!task.prompt || !answer) return null;
  const filled = task.prompt.replace(/_+/g, answer);
  const rawTokens = filled.trim().split(/\s+/).filter(Boolean);
  const composeAnswer = rawTokens.map((tok, i) =>
    i === rawTokens.length - 1 ? tok.replace(/[.!?。！？]+$/g, '') : tok
  ).filter(Boolean);
  if (composeAnswer.length === 0) return null;
  const distractors = [
    '은', '는', '이', '가', '을', '를', '에', '에서', '도', '만',
    '예요', '이에요', '입니다', '아요', '어요', '해요', '요', '하세요',
    '있어요', '없어요', '주세요', '드릴게요', '돼요', '안',
  ].filter((d) => !composeAnswer.includes(d));
  const tokens = shuffle([...composeAnswer, ...distractors.slice(0, 2)]);
  return { taskId: task.id, zhHint: task.zhHint ?? '', fullSentence: filled, composeAnswer, tokens, successMsg: task.successMsg };
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
