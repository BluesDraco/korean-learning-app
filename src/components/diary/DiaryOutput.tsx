'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ToriDay, ToriOutputTask } from '@/types/tori-diary';
import { ChevronRight, Check, X, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { speak } from '@/lib/tts';
import { sfxCorrect, sfxWrong } from '@/lib/sfx';

interface Props {
  day: ToriDay;
  onComplete: (results: Array<{ taskId: string; correct: boolean; userText?: string }>) => void;
}

type Checked = 'idle' | 'correct' | 'wrong';

export function DiaryOutput({ day, onComplete }: Props) {
  const tasks = day.output;
  const [qIdx, setQIdx] = useState(0);
  const [checked, setChecked] = useState<Checked>('idle');
  const [shaking, setShaking] = useState(false);
  const [results, setResults] = useState<Array<{ taskId: string; correct: boolean; userText?: string }>>([]);

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
    const t = setTimeout(() => setShaking(false), 500);
    return () => clearTimeout(t);
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
  };

  const handleNext = () => {
    if (qIdx < tasks.length - 1) setQIdx(qIdx + 1);
    else onComplete(results);
  };

  if (!task || tasks.length === 0) {
    return (
      <div className="diary-anim-fade-up" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <p className="diary-text-soft" style={{ marginBottom: 20 }}>今天没有练习，收尾吧。</p>
        <button onClick={() => onComplete([])} className="diary-btn diary-btn-primary">
          继续 · 收尾 <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  const isCompose = task.kind === 'fill' || task.kind === 'compose';

  return (
    <div className="diary-anim-fade-up">
      <div style={{ marginBottom: 18 }}>
        <span className="diary-tag" style={{ background: '#5ea886', color: '#fff' }}>OUTPUT · 输出</span>
      </div>
      <h2 className="diary-h2" style={{ marginBottom: 6 }}>{KIND_TITLE[task.kind] ?? '练习'}</h2>
      <p className="diary-text-soft" style={{ fontSize: 13, marginBottom: 20 }}>
        {qIdx + 1}/{tasks.length}
      </p>

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

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button
          onClick={handleNext}
          className="diary-btn diary-btn-primary"
          disabled={!allCleared}
          style={{ opacity: allCleared ? 1 : 0.4, cursor: allCleared ? 'pointer' : 'not-allowed' }}
        >
          {isLast ? '继续 · 收尾' : '下一题'} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

const KIND_TITLE: Partial<Record<ToriOutputTask['kind'], string>> = {
  fill: '组词成句',
  compose: '组词成句',
  'listen-choice': '听韩语选中文',
  'zh-to-ko': '中文翻韩文',
  'particle-error': '找正确的助词',
  'match-pair': '韩中连连看',
};

/* ═══════ Compose / Fill ═══════ */
function ComposeBlock({
  task, picked, setPicked, checked, setChecked, shaking, setShaking, onCorrect, onWrong, onUserAnswer,
}: {
  task: ToriOutputTask;
  picked: number[]; setPicked: (v: number[] | ((p: number[]) => number[])) => void;
  checked: Checked; setChecked: (v: Checked) => void;
  shaking: boolean; setShaking: (v: boolean) => void;
  onCorrect: () => void; onWrong: () => void;
  onUserAnswer: (s: string) => void;
}) {
  const compose = useMemo(() => synthesizeCompose(task), [task]);
  const userTokens = picked.map((i) => compose?.tokens[i] ?? '');
  const isFull = compose ? userTokens.length === compose.composeAnswer.length : false;

  useEffect(() => {
    if (!compose || !isFull || checked !== 'idle') return;
    const userJoin = userTokens.join(' ');
    onUserAnswer(userJoin);
    const correct = userJoin === compose.composeAnswer.join(' ');
    if (correct) {
      setChecked('correct');
      onCorrect();
    } else {
      setChecked('wrong');
      setShaking(true);
      onWrong();
    }
  }, [isFull, checked, userTokens, compose, setChecked, setShaking, onCorrect, onWrong, onUserAnswer]);

  if (!compose) return null;

  return (
    <div className="diary-card-paper" style={{ padding: '20px 22px', background: 'var(--diary-paper)' }}>
      <p style={{ fontSize: 15, color: 'var(--diary-ink-soft)', marginBottom: 18, textAlign: 'center' }}>
        🎯 {task.zhHint}
      </p>

      <div className={shaking ? 'diary-anim-shake' : ''} style={{
        minHeight: 64, padding: '12px 14px',
        background: checked === 'correct' ? 'rgba(94,168,134,0.1)' : checked === 'wrong' ? 'rgba(193,78,58,0.08)' : 'var(--diary-paper-deep)',
        border: checked === 'correct' ? '1.5px solid #5ea886' : checked === 'wrong' ? '1.5px solid var(--diary-stamp-red)' : '1.5px dashed var(--diary-line-strong)',
        borderRadius: 6, marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center',
      }}>
        {userTokens.length === 0 ? (
          <span style={{ fontSize: 13, color: 'var(--diary-ink-faint)', fontStyle: 'italic' }}>点下方词卡组成句子…</span>
        ) : userTokens.map((t, i) => (
          <button key={`${t}-${i}`} onClick={() => { if (checked !== 'correct') { setPicked((p) => p.filter((_, j) => j !== i)); setChecked('idle'); } }} disabled={checked === 'correct'}
            className="diary-stamp-card diary-anim-fade-up" style={{ cursor: checked === 'correct' ? 'default' : 'pointer' }}>
            <span style={{ fontSize: 15 }}>{t}</span>
          </button>
        ))}
        {checked === 'correct' && <Check size={28} strokeWidth={3} color="#5ea886" style={{ marginLeft: 'auto' }} />}
        {checked === 'wrong' && <X size={20} color="var(--diary-stamp-red)" style={{ marginLeft: 'auto' }} />}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {compose.tokens.map((t, i) => {
          const used = picked.includes(i);
          return (
            <button key={i} onClick={() => { if (!used && checked !== 'correct') { setPicked((p) => [...p, i]); setChecked('idle'); } }}
              disabled={used || checked === 'correct'}
              className="diary-stamp-card" style={{ opacity: used ? 0.25 : 1, cursor: used || checked === 'correct' ? 'default' : 'pointer', pointerEvents: used ? 'none' : 'auto' }}>
              <span style={{ fontSize: 15 }}>{t}</span>
            </button>
          );
        })}
      </div>

      {checked === 'wrong' && (
        <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(193,78,58,0.1)', borderRadius: 6, borderLeft: '3px solid var(--diary-stamp-red)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <X size={16} color="var(--diary-stamp-red)" />
          <span style={{ fontSize: 13 }}>顺序不对，点已选词卡拿回来。</span>
          <button onClick={() => { setPicked([]); setChecked('idle'); }} className="diary-btn diary-btn-ghost" style={{ padding: '4px 10px', fontSize: 11, marginLeft: 'auto' }}>
            <RotateCcw size={12} /> 重置
          </button>
        </div>
      )}
    </div>
  );
}

/* ═══════ Choice (listen / zh-to-ko / particle / match) ═══════ */
function ChoiceBlock({
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
    <div className="diary-card-paper" style={{ padding: '20px 22px', background: 'var(--diary-paper)' }}>
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        {isListen && task.audioKo && (
          <button onClick={() => { speak(task.audioKo!, 0.85).catch(() => {}); }}
            style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-pink-base)', color: '#fff', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, boxShadow: 'var(--shadow-sm)' }}>
            <Volume2 size={22} />
          </button>
        )}
        <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--diary-ink)' }}>
          {isListen ? '听一听，兔莉说的是哪句？' : task.zhPrompt ?? task.zhHint ?? '选出正确的'}
        </p>
      </div>

      <div className={shaking ? 'diary-anim-shake' : ''} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {choices.map((c, i) => {
          const isPicked = pickedIdx === i;
          const showResult = checked !== 'idle' && isPicked;
          const correctColor = 'rgba(94,168,134,0.16)';
          const wrongColor = 'rgba(193,78,58,0.12)';
          return (
            <button key={i} onClick={() => handlePick(i)}
              disabled={checked === 'correct'}
              style={{
                padding: '12px 16px', textAlign: 'left', borderRadius: 12,
                border: checked === 'correct' && choices[i]?.correct ? '1.5px solid #5ea886' : showResult && !choices[i]?.correct ? '1.5px solid var(--diary-stamp-red)' : '1.5px solid var(--diary-line)',
                background: checked === 'correct' && choices[i]?.correct ? correctColor : showResult && !choices[i]?.correct ? wrongColor : 'var(--diary-paper-deep)',
                cursor: checked === 'correct' ? 'default' : 'pointer',
                fontSize: isListen ? 14 : 15, fontWeight: 600, color: 'var(--diary-ink)',
                transition: 'all 0.15s',
              }}>
              {c.zh ?? c.ko}
            </button>
          );
        })}
      </div>

      {checked === 'wrong' && (
        <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(193,78,58,0.1)', borderRadius: 6, borderLeft: '3px solid var(--diary-stamp-red)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <X size={16} color="var(--diary-stamp-red)" />
          <span style={{ fontSize: 13 }}>再想想？</span>
          <button onClick={() => { setPickedIdx(null); setChecked('idle'); }} className="diary-btn diary-btn-ghost" style={{ padding: '4px 10px', fontSize: 11, marginLeft: 'auto' }}>
            <RotateCcw size={12} /> 重选
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
  const pairs = task.pairs ?? [];
  const [selKo, setSelKo] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [wrongInfo, setWrongInfo] = useState<{ ko: string; userZh: string; correctZh: string } | null>(null);

  const shuffledKo = useMemo(() => shuffle(pairs.map((p) => p.ko)), [pairs]);
  const shuffledZh = useMemo(() => shuffle(pairs.map((p) => p.zh)), [pairs]);

  useEffect(() => {
    if (!shake) return;
    const t = setTimeout(() => { setShake(false); setWrongZh(null); }, 480);
    return () => clearTimeout(t);
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

  return (
    <div className="diary-card-paper" style={{ padding: '20px 22px', background: 'var(--diary-paper)' }}>
      <p style={{ fontSize: 15, color: 'var(--diary-ink-soft)', marginBottom: 18, textAlign: 'center' }}>
        🔗 点击韩文词卡，再点对应的中文
      </p>
      <div className={shake ? 'diary-anim-shake' : ''} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {shuffledKo.map((ko) => {
            const isMatched = matched.has(pairs.find((p) => p.ko === ko)?.zh ?? '');
            return (
              <button key={ko} onClick={() => handleKo(ko)}
                disabled={isMatched}
                style={{
                  padding: '10px 12px', borderRadius: 10,
                  border: selKo === ko ? '2px solid var(--color-pink-base)' : '1.5px solid var(--diary-line)',
                  background: isMatched ? 'rgba(94,168,134,0.12)' : 'var(--diary-paper-deep)',
                  cursor: isMatched ? 'default' : 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--diary-ink)',
                  opacity: isMatched ? 0.6 : 1,
                }}>
                {ko}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {shuffledZh.map((zh) => {
            const isMatched = matched.has(zh);
            const isWrong = wrongZh === zh;
            return (
              <button key={zh} onClick={() => handleZh(zh)}
                disabled={isMatched}
                style={{
                  padding: '10px 12px', borderRadius: 10,
                  border: isWrong ? '2px solid var(--diary-stamp-red)' : '1.5px solid var(--diary-line)',
                  background: isMatched ? 'rgba(94,168,134,0.12)' : isWrong ? 'rgba(193,78,58,0.14)' : 'var(--diary-paper-deep)',
                  cursor: isMatched ? 'default' : 'pointer', fontSize: 13, color: 'var(--diary-ink)',
                  transition: 'all 0.15s',
                }}>
                {zh}
                {isMatched && <Check size={14} color="#5ea886" style={{ marginLeft: 6, verticalAlign: 'middle', display: 'inline' }} />}
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
  const [text, setText] = useState<string>(isCorrect ? (task.successMsg ?? '答对了。') : '');
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);

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
    try {
      const res = await fetch('/api/ai/carrot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      if (res.ok && data.reply) setText(data.reply);
      else setText('胡萝卜走神了，等一下再问。');
    } catch {
      setText('网络问题，胡萝卜没听清。');
    } finally {
      setLoading(false);
    }
  };

  // 答对：自动调一次（successMsg 之外补一句胡萝卜解释为什么对）
  useEffect(() => {
    if (isCorrect && !requested) {
      const t = setTimeout(fetchExplain, 250);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="diary-anim-fade-up" style={{
      marginTop: 14, padding: '12px 14px',
      background: isCorrect ? 'rgba(94,168,134,0.10)' : 'rgba(255,184,77,0.10)',
      borderRadius: 10,
      borderLeft: `3px solid ${isCorrect ? '#5ea886' : 'var(--color-gold-base, #e0a500)'}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{ fontSize: 22, flexShrink: 0, lineHeight: 1.1 }}>🥕</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--diary-ink-soft)', letterSpacing: '0.06em', marginBottom: 4 }}>
            勇气胡萝卜
          </div>
          {text ? (
            <p style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--diary-ink)', margin: 0, whiteSpace: 'pre-wrap' }}>
              {text}
            </p>
          ) : (
            <button
              onClick={fetchExplain}
              disabled={loading}
              className="diary-btn diary-btn-ghost"
              style={{ padding: '6px 12px', fontSize: 12, gap: 6 }}
            >
              <Sparkles size={13} /> {loading ? '想一下…' : '让胡萝卜解释'}
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
  const composeAnswer = rawTokens.map((t, i) =>
    i === rawTokens.length - 1 ? t.replace(/[.!?。！？]+$/g, '') : t
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
