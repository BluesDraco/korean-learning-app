'use client';

import { useState } from 'react';
import { PenLine, Check, X, Lightbulb, RefreshCw, Sparkles, BookOpen, Clock, ChevronDown, ChevronUp, Trophy, Loader2, BookmarkCheck, Bookmark } from 'lucide-react';
import { KoreanKeyboard } from '@/components/KoreanKeyboard';
import { useIsMobile } from '@/lib/useIsMobile';
import { useFeedback } from '@/hooks/useFeedback';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/db';
import { useToast } from '@/hooks/useToast';
import { modeConfig, imitationPrompts, freeTopics, clozeExercises, type WritingMode, type HistoryRecord } from '@/data/writingExercises';

function normalizeKorean(v: string): string {
  return v.normalize('NFC').trim().replace(/\s+/g, ' ');
}

function getCharDiff(user: string, answer: string) {
  const result: { char: string; status: 'correct' | 'incorrect' | 'extra' | 'missing' }[] = [];
  const maxLen = Math.max(user.length, answer.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < user.length && i < answer.length) {
      result.push({ char: user[i] || ' ', status: user[i] === answer[i] ? 'correct' : 'incorrect' });
    } else if (i < user.length) {
      result.push({ char: user[i], status: 'extra' });
    } else {
      result.push({ char: answer[i], status: 'missing' });
    }
  }
  return result;
}

function getScoreColor(score: number) {
  if (score >= 80) return 'text-[var(--mint-soft)]';
  if (score >= 60) return 'text-[var(--peach-soft)]';
  return 'text-[var(--color-danger)]';
}


export default function WritingPage() {
  const [mode, setMode] = useState<WritingMode>('imitation');
  const [history, setHistory] = useState<HistoryRecord[]>([]);

  const addRecord = (record: Omit<HistoryRecord, 'id' | 'date'>) => {
    const newRecord: HistoryRecord = {
      ...record,
      id: `h${Date.now()}`,
      date: new Date().toLocaleString('zh-CN', { hour12: false }),
    };
    setHistory(prev => [newRecord, ...prev]);
  };

  return (
    <div className="py-4 space-y-3 max-w-2xl mx-auto md:max-w-3xl">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">写作练习</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">三种模式，从仿写到自由表达，逐步提升韩语写作能力</p>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-1.5 overflow-x-auto">
        {modeConfig.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                mode === m.key
                  ? 'bg-[var(--pink-primary)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
              }`}
            >
              <Icon size={15} />
              {m.label}
            </button>
          );
        })}
      </div>

      {mode === 'imitation' && <ImitationMode onAddRecord={addRecord} />}
      {mode === 'free' && <FreeWritingMode onAddRecord={addRecord} />}
      {mode === 'cloze' && <ClozeMode onAddRecord={addRecord} />}
      {mode === 'history' && <HistoryMode records={history} />}
    </div>
  );
}

function ImitationMode({ onAddRecord }: { onAddRecord: (r: Omit<HistoryRecord, 'id' | 'date'>) => void }) {
  const isMobile = useIsMobile();
  const { success: feedbackSuccess, error: feedbackError, click: feedbackClick } = useFeedback();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const prompt = imitationPrompts[currentIdx];
  const userClean = normalizeKorean(userInput);
  const answerClean = normalizeKorean(prompt.ko);
  const isCorrect = userClean === answerClean;
  const charDiff = submitted ? getCharDiff(normalizeKorean(userInput), normalizeKorean(prompt.ko)) : null;

  const handleSubmit = () => {
    if (!userInput.trim()) return;
    setSubmitted(true);
    const correct = userClean === answerClean;
    if (correct) { setScore((s) => s + 1); feedbackSuccess('完全正确!'); }
    else feedbackError('再看看标准答案');

    onAddRecord({
      mode: 'imitation',
      modeLabel: '仿写',
      score: correct ? '✓ 正确' : '✗ 错误',
      snippet: userInput.trim().slice(0, 50),
      details: {
        type: 'imitation',
        prompt: prompt.zh,
        userAnswer: userInput.trim(),
        modelAnswer: prompt.ko,
        correct,
        grammarPoint: prompt.grammarPoint,
      },
    });
  };

  const handleNext = () => {
    if (currentIdx + 1 >= imitationPrompts.length) {
      setCurrentIdx(0);
      setScore(0);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
    setUserInput('');
    setSubmitted(false);
  };

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--text-muted)]">第 {currentIdx + 1} / {imitationPrompts.length} 题</span>
        <span className="text-[var(--text-muted)]">正确: <span className="text-[var(--mint-soft)] font-medium">{score}</span></span>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5">
        {/* Chinese prompt */}
        <div className="text-center">
          <p className="text-xs text-[var(--text-muted)] mb-2">请将以下中文翻译为韩语</p>
          <p className="text-xl font-bold text-[var(--text-primary)]">{prompt.zh}</p>
        </div>

        {/* Hint */}
        <div className="flex items-start gap-2 bg-[var(--purple-soft)]/5 border border-[var(--purple-soft)]/10 rounded-xl p-3">
          <Lightbulb size={16} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-[var(--purple-soft)] font-medium">提示</p>
            <p className="text-sm text-[var(--text-secondary)]">{prompt.hint}</p>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onFocus={() => { if (isMobile) setShowKeyboard(true); }}
              disabled={submitted}
              readOnly={isMobile}
              placeholder="在这里输入韩语..."
              rows={2}
              className="flex-1 bg-[var(--bg-input)] border border-[var(--pink-pale)] rounded-xl p-4 text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] text-base text-center resize-none focus:outline-none focus:border-[var(--pink-primary)]/50"
              style={{ fontFamily: "'system-ui', 'sans-serif'" }}
              inputMode={isMobile ? 'none' : 'text'}
            />
            <button
              type="button"
              onClick={() => setShowKeyboard(!showKeyboard)}
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={(e) => e.preventDefault()}
              className={`self-start px-3 py-3 rounded-xl transition-colors text-sm font-medium ${
                showKeyboard
                  ? 'bg-[var(--pink-primary)]/20 text-[var(--pink-primary)]'
                  : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--pink-pale)]/20'
              }`}
              title={showKeyboard ? '关闭韩文键盘' : '打开韩文键盘'}
              aria-label={showKeyboard ? '关闭韩文键盘' : '打开韩文键盘'}
            >
              한
            </button>
          </div>
          <KoreanKeyboard
            value={userInput}
            onChange={setUserInput}
            visible={showKeyboard}
            onClose={() => setShowKeyboard(false)}
          />
        </div>

        {/* Action button */}
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!userInput.trim()}
            className="w-full py-3 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] disabled:bg-[var(--bg-accent)] disabled:text-[var(--text-muted)] text-white rounded-xl font-medium transition-colors"
          >
            提交
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-3 bg-[var(--purple-soft)] hover:bg-[var(--purple-soft)] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
          >
            下一题
            <RefreshCw size={14} />
          </button>
        )}

        {/* 批改反馈 */}
        {submitted && (
          <div className="space-y-4 animate-fade-in border-t border-[var(--border-color)] pt-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Check size={16} className="text-[var(--pink-primary)]" />
              批改反馈
            </h3>

            {/* 你的答案 */}
            <div className="bg-[var(--bg-input)] rounded-xl p-4">
              <p className="text-xs text-[var(--text-muted)] mb-1.5">你的答案</p>
              <p className="text-base text-[var(--text-primary)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                {userInput.trim() || '(未作答)'}
              </p>
            </div>

            {/* 标准答案 */}
            <div className="bg-[var(--mint-soft)]/5 border border-[var(--mint-soft)]/15 rounded-xl p-4">
              <p className="text-xs text-[var(--mint-soft)] mb-1.5 font-medium">标准答案</p>
              <p className="text-base text-[var(--text-primary)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                {prompt.ko}
              </p>
            </div>

            {/* 错误标注 */}
            <div className="bg-[var(--bg-input)] rounded-xl p-4">
              <p className="text-xs text-[var(--text-muted)] mb-2 font-medium">错误标注</p>
              {isCorrect ? (
                <p className="text-sm text-[var(--mint-soft)]">完全没有错误，非常好！</p>
              ) : (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {charDiff?.map((d, i) => (
                      <span
                        key={i}
                        className={`inline-block px-1 py-0.5 rounded text-sm font-medium ${
                          d.status === 'correct'
                            ? 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]'
                            : d.status === 'incorrect'
                            ? 'bg-[var(--color-danger)]/10 text-[var(--color-danger)] line-through'
                            : d.status === 'extra'
                            ? 'bg-[var(--peach-soft)]/10 text-[var(--peach-soft)]'
                            : 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]'
                        }`}
                        style={{ fontFamily: "'system-ui', 'sans-serif'" }}
                        title={
                          d.status === 'correct' ? '正确' :
                          d.status === 'incorrect' ? '错误字符' :
                          d.status === 'extra' ? '多余字符' : '缺失字符'
                        }
                      >
                        {d.char}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 text-xs">
                    <span className="flex items-center gap-1 text-[var(--text-muted)]">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[var(--mint-soft)]/40" /> 正确
                    </span>
                    <span className="flex items-center gap-1 text-[var(--text-muted)]">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[var(--color-danger)]/40" /> 错误
                    </span>
                    <span className="flex items-center gap-1 text-[var(--text-muted)]">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[var(--peach-soft)]/40" /> 多余
                    </span>
                    <span className="flex items-center gap-1 text-[var(--text-muted)]">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[var(--purple-soft)]/40" /> 缺失
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 语法说明 */}
            <div className="flex items-start gap-2 bg-[var(--pink-primary)]/5 border border-[var(--pink-primary)]/10 rounded-xl p-4">
              <BookOpen size={16} className="text-[var(--pink-primary)] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-[var(--pink-primary)] font-medium mb-1">语法说明</p>
                <p className="text-sm text-[var(--text-secondary)]">{prompt.grammarPoint}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FreeWritingMode({ onAddRecord }: { onAddRecord: (r: Omit<HistoryRecord, 'id' | 'date'>) => void }) {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [uniqueWords, setUniqueWords] = useState(0);
  const [scoring, setScoring] = useState(false);
  const [feedback, setFeedback] = useState<{
    original: string; corrected: string; reason: string; isCorrect: boolean; saveExpression: string;
  } | null>(null);
  const [expressionSaved, setExpressionSaved] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const topic = freeTopics[selectedTopic];

  const updateStats = (value: string) => {
    setText(value);
    const words = value.split(/\s+/).filter(Boolean);
    setWordCount(words.length);
    setUniqueWords(new Set(words.map((w) => w.replace(/[.,!?~]$/, ''))).size);
  };

  const handleTopicChange = (idx: number) => {
    setSelectedTopic(idx);
    setText('');
    setWordCount(0);
    setUniqueWords(0);
    setFeedback(null);
    setExpressionSaved(false);
  };

  const handleScore = async () => {
    if (!text.trim()) return;
    setScoring(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/ai/writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), topic: topic.title }),
      });
      if (res.ok) {
        const data = await res.json();
        setFeedback(data);
        onAddRecord({
          mode: 'free', modeLabel: '自由写',
          score: data.isCorrect ? '✓ 自然' : '已批改',
          snippet: text.trim().slice(0, 50),
          details: { type: 'free', topic: topic.title, text: text.trim(), corrected: data.corrected, reason: data.reason },
        });
      } else if (res.status === 401) {
        showToast('请登录后使用 AI 批改', 'error');
      } else {
        throw new Error('failed');
      }
    } catch {
      showToast('AI 批改暂时不可用，请稍后重试', 'error');
    } finally {
      setScoring(false);
    }
  };

  const handleSaveExpression = async () => {
    if (!feedback?.saveExpression || expressionSaved || !user) return;
    try {
      await db.sentences.put({
        id: `writing-expr-${Date.now()}`,
        userId: user.id,
        korean: feedback.saveExpression.split('—')[0]?.trim() || feedback.saveExpression,
        chinese: feedback.saveExpression.split('—')[1]?.trim() || '',
        sourceType: 'writing',
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      setExpressionSaved(true);
      showToast('已保存到我的句子', 'success');
    } catch {
      showToast('保存失败', 'error');
    }
  };

  return (
    <div className="space-y-4">
      {/* Topic selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {freeTopics.map((t, i) => (
          <button key={i} onClick={() => handleTopicChange(i)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm transition-colors ${
              i === selectedTopic
                ? 'bg-[var(--pink-primary)] text-white font-medium'
                : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)]'
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* Topic card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{topic.titleKo}</span>
          <span className="text-[var(--text-primary)] font-medium">{topic.title}</span>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">{topic.prompt}</p>
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs text-[var(--text-muted)]">关键词：</span>
          {topic.keywords.map((kw) => (
            <span key={kw} className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--pink-primary)]">{kw}</span>
          ))}
        </div>
      </div>

      {/* Writing area */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <div className="flex gap-2">
          <textarea value={text} onChange={(e) => updateStats(e.target.value)}
            onFocus={() => { if (isMobile) setShowKeyboard(true); }}
            placeholder="在这里自由书写韩语（1-3句即可）..."
            rows={6} readOnly={isMobile}
            className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] text-sm resize-none focus:outline-none"
            style={{ fontFamily: "'system-ui', 'sans-serif'" }}
            inputMode={isMobile ? 'none' : 'text'}
          />
          <button type="button" onClick={() => setShowKeyboard(!showKeyboard)}
            onMouseDown={(e) => e.preventDefault()} onTouchStart={(e) => e.preventDefault()}
            className={`self-start px-3 py-3 rounded-xl transition-colors text-sm font-medium ${
              showKeyboard ? 'bg-[var(--pink-primary)]/20 text-[var(--pink-primary)]'
                : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--pink-pale)]/20'
            }`}
          >
            한
          </button>
        </div>
        <KoreanKeyboard value={text} onChange={(val) => updateStats(val)} visible={showKeyboard} onClose={() => setShowKeyboard(false)} />
        <div className="flex items-center justify-between pt-3 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
          <span>{wordCount} 词</span>
          {!user && <span className="text-[var(--pink-primary)]">登录后可使用 AI 批改</span>}
        </div>
      </div>

      {/* Submit button */}
      {!feedback && (
        <button onClick={handleScore} disabled={!text.trim() || scoring}
          className="w-full py-3 bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] disabled:from-[var(--bg-accent)] disabled:to-[var(--bg-accent)] disabled:text-[var(--text-muted)] text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
        >
          {scoring ? <><Loader2 size={16} className="animate-spin" />Tori 批改中...</> : <><Sparkles size={16} />提交，Tori 帮我改</>}
        </button>
      )}

      {/* AI Feedback */}
      {feedback && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Sparkles size={16} className="text-[var(--pink-primary)]" />
            Tori 的批改
          </h3>

          <div className="bg-[var(--bg-input)] rounded-xl p-4">
            <p className="text-xs text-[var(--text-muted)] mb-1">你写的</p>
            <p className="text-sm text-[var(--text-primary)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>{feedback.original}</p>
          </div>

          {feedback.isCorrect ? (
            <div className="bg-[var(--mint-soft)]/8 border border-[var(--mint-soft)]/20 rounded-xl p-4 flex items-center gap-3">
              <Check size={20} className="text-[var(--mint-soft)] shrink-0" />
              <p className="text-sm text-[var(--mint-soft)] font-medium">表达很自然！</p>
            </div>
          ) : (
            <div className="bg-[var(--mint-soft)]/5 border border-[var(--mint-soft)]/15 rounded-xl p-4">
              <p className="text-xs text-[var(--mint-soft)] mb-1.5 font-medium">更自然的写法</p>
              <p className="text-sm text-[var(--text-primary)] font-medium" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>{feedback.corrected}</p>
            </div>
          )}

          <div className="bg-[var(--purple-soft)]/5 border border-[var(--purple-soft)]/10 rounded-xl p-4">
            <p className="text-xs text-[var(--purple-soft)] mb-1 font-medium">原因</p>
            <p className="text-sm text-[var(--text-secondary)]">{feedback.reason}</p>
          </div>

          {feedback.saveExpression && (
            <div className="bg-[var(--pink-primary)]/5 border border-[var(--pink-primary)]/10 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--pink-primary)] mb-1 font-medium">可保存表达</p>
                  <p className="text-sm text-[var(--text-primary)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>{feedback.saveExpression}</p>
                </div>
                <button onClick={handleSaveExpression} disabled={expressionSaved || !user}
                  className={`p-2 rounded-lg transition-colors shrink-0 ${expressionSaved ? 'text-[var(--mint-soft)]' : 'text-[var(--text-muted)] hover:text-[var(--mint-soft)]'}`}
                >
                  {expressionSaved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                </button>
              </div>
            </div>
          )}

          <button onClick={() => { setFeedback(null); setText(''); setWordCount(0); setUniqueWords(0); setExpressionSaved(false); }}
            className="w-full py-2.5 border border-[var(--border-color)] rounded-xl text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={14} />再写一段
          </button>
        </div>
      )}
    </div>
  );
}

function ClozeMode({ onAddRecord }: { onAddRecord: (r: Omit<HistoryRecord, 'id' | 'date'>) => void }) {
  const { success: feedbackSuccess, error: feedbackError, click: feedbackClick } = useFeedback();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const exercise = clozeExercises[currentIdx];
  const isLastQuestion = currentIdx + 1 >= clozeExercises.length;
  const percentage = clozeExercises.length > 0 ? Math.round((score / clozeExercises.length) * 100) : 0;
  const xpQualified = percentage >= 80;

  const handleSelect = (idx: number) => {
    if (answered) return;
    feedbackClick();
    setSelectedAnswer(idx);
    setAnswered(true);
    if (idx === exercise.correct) { setScore((s) => s + 1); feedbackSuccess('正确!'); }
    else feedbackError('不对哦');
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Add record and show completion
      // We already incremented score in handleSelect
      const finalPercentage = Math.round((score / clozeExercises.length) * 100);

      onAddRecord({
        mode: 'cloze',
        modeLabel: '填空',
        score: `${score}/${clozeExercises.length} 正确`,
        snippet: clozeExercises.map(e => e.full).join(', ').slice(0, 50),
        details: {
          type: 'cloze',
          total: clozeExercises.length,
          correct: score,
          percentage: finalPercentage,
        },
      });

      if (xpQualified) {
        setAllDone(true);
      } else {
        // Reset for retry
        setCurrentIdx(0);
        setScore(0);
        setSelectedAnswer(null);
        setAnswered(false);
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
  };

  // XP completion screen
  if (allDone) {
    return (
      <div className="space-y-4">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 text-center space-y-6">
          <Trophy size={56} className="text-[var(--peach-soft)] mx-auto" />
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">全部完成！</h2>
            <p className="text-[var(--text-secondary)] mt-1">
              正确 {score} / {clozeExercises.length} ({percentage}%)
            </p>
          </div>

          {/* XP reward */}
          {xpQualified && (
            <div className="bg-gradient-to-r from-[var(--peach-soft)]/10 to-[var(--pink-primary)]/10 border border-[var(--peach-soft)]/20 rounded-2xl p-5 animate-fade-in">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles size={24} className="text-[var(--peach-soft)]" />
                <span className="text-lg font-bold text-[var(--peach-soft)]">已获得XP</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                正确率达到 {percentage}%，表现优秀！经验值已到账
              </p>
              <span className="inline-block text-3xl font-bold text-[var(--peach-soft)]">+50 XP</span>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={resetAll}
              className="px-5 py-2.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium transition-colors"
            >
              再来一次
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--text-muted)]">第 {currentIdx + 1} / {clozeExercises.length} 题</span>
        <span className="text-[var(--text-muted)]">正确: <span className="text-[var(--mint-soft)] font-medium">{score}</span></span>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5">
        {/* Sentence with blank */}
        <div className="text-center">
          <p className="text-xs text-[var(--text-muted)] mb-3">选择正确的助词/语尾填入空格</p>
          <p className="text-2xl text-[var(--text-primary)] font-medium" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
            {exercise.sentence.split('___').map((part, i) => (
              <span key={i}>
                {i > 0 && (
                  <span className={`inline-block min-w-[3rem] mx-1 border-b-2 ${
                    answered
                      ? selectedAnswer === exercise.correct
                        ? 'border-[var(--mint-soft)] text-[var(--mint-soft)]'
                        : 'border-[var(--color-danger)] text-[var(--color-danger)]'
                      : 'border-[var(--pink-primary)]'
                  }`}>
                    {answered ? exercise.options[selectedAnswer!] : '　'}
                  </span>
                )}
                {part}
              </span>
            ))}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {exercise.options.map((opt, i) => {
            let btnStyle = 'bg-[var(--bg-card-hover)] border border-[var(--border-color)] hover:border-[var(--pink-primary)]/30 text-[var(--text-primary)]';
            if (answered) {
              if (i === exercise.correct) {
                btnStyle = 'bg-[var(--mint-soft)]/10 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]';
              } else if (i === selectedAnswer) {
                btnStyle = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50 text-[var(--color-danger)]';
              } else {
                btnStyle = 'bg-[var(--bg-card-hover)] border-[var(--border-color)] text-[var(--text-placeholder)] opacity-50';
              }
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={answered}
                className={`p-4 rounded-xl text-center text-xl font-bold transition-all ${btnStyle}`}
                style={{ fontFamily: "'system-ui', 'sans-serif'" }}
              >
                {opt}
                {answered && i === exercise.correct && <Check size={16} className="inline ml-1 text-[var(--mint-soft)]" />}
                {answered && i === selectedAnswer && i !== exercise.correct && <X size={16} className="inline ml-1 text-[var(--color-danger)]" />}
              </button>
            );
          })}
        </div>

        {/* Explanation after answering */}
        {answered && (
          <div className="space-y-3 animate-fade-in">
            <div className="bg-[var(--bg-card-hover)] rounded-xl p-4">
              <p className="text-sm text-[var(--text-primary)] font-medium" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                {exercise.full}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">{exercise.meaning}</p>
            </div>
            <div className="flex items-start gap-2 bg-[var(--purple-soft)]/5 border border-[var(--purple-soft)]/10 rounded-xl p-3">
              <Lightbulb size={14} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--text-secondary)]">{exercise.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-3 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isLastQuestion ? '完成' : '下一题'}
              <RefreshCw size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function HistoryMode({ records }: { records: HistoryRecord[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const getModeBadgeColor = (mode: string) => {
    switch (mode) {
      case 'imitation': return 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]';
      case 'free': return 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]';
      case 'cloze': return 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]';
      default: return 'bg-[var(--bg-accent)] text-[var(--text-secondary)]';
    }
  };

  const renderDetails = (record: HistoryRecord) => {
    const d = record.details;
    if (!d) return <p className="text-sm text-[var(--text-muted)]">无详细信息</p>;

    switch (d.type) {
      case 'imitation':
        return (
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">中文提示</p>
              <p className="text-sm text-[var(--text-primary)]">{d.prompt}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">你的答案</p>
              <p className="text-sm text-[var(--text-primary)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                {d.userAnswer}
              </p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">标准答案</p>
              <p className="text-sm text-[var(--mint-soft)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                {d.modelAnswer}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${d.correct ? 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]' : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'}`}>
                {d.correct ? '正确' : '错误'}
              </span>
            </div>
            {d.grammarPoint && (
              <div className="bg-[var(--pink-primary)]/5 border border-[var(--pink-primary)]/10 rounded-xl p-3">
                <p className="text-xs text-[var(--pink-primary)] font-medium mb-1">相关语法</p>
                <p className="text-xs text-[var(--text-secondary)]">{d.grammarPoint}</p>
              </div>
            )}
          </div>
        );
      case 'free':
        return (
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">写作话题</p>
              <p className="text-sm text-[var(--text-primary)] font-medium">{d.topic}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">写作内容</p>
              <p className="text-sm text-[var(--text-primary)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>
                {d.text}
              </p>
            </div>
            {d.corrected && (
              <div className="bg-[var(--mint-soft)]/5 border border-[var(--mint-soft)]/15 rounded-xl p-3">
                <p className="text-xs text-[var(--mint-soft)] mb-1 font-medium">批改建议</p>
                <p className="text-sm text-[var(--text-primary)]" style={{ fontFamily: "'system-ui', 'sans-serif'" }}>{d.corrected}</p>
              </div>
            )}
            {d.reason && (
              <div className="bg-[var(--purple-soft)]/5 border border-[var(--purple-soft)]/10 rounded-xl p-3">
                <p className="text-xs text-[var(--purple-soft)] mb-1 font-medium">批改原因</p>
                <p className="text-xs text-[var(--text-secondary)]">{d.reason}</p>
              </div>
            )}
          </div>
        );
      case 'cloze':
        return (
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">完成情况</p>
              <p className="text-sm text-[var(--text-primary)]">
                共 {d.total} 题，正确 {d.correct} 题
              </p>
            </div>
            <div className="w-full bg-[var(--bg-input)] rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full transition-all"
                style={{
                  width: `${d.percentage || 0}%`,
                  backgroundColor: (d.percentage || 0) >= 80 ? 'var(--mint-soft)' : (d.percentage || 0) >= 60 ? 'var(--peach-soft)' : 'var(--color-danger)',
                }}
              />
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              正确率: <span className={getScoreColor(d.percentage || 0)}>{d.percentage || 0}%</span>
            </p>
            {(d.percentage || 0) >= 80 && (
              <div className="bg-gradient-to-r from-[var(--peach-soft)]/10 to-[var(--pink-primary)]/10 border border-[var(--peach-soft)]/20 rounded-xl p-3 flex items-center gap-2">
                <Trophy size={18} className="text-[var(--peach-soft)]" />
                <span className="text-sm font-bold text-[var(--peach-soft)]">已获得 +50 XP</span>
              </div>
            )}
          </div>
        );
      default:
        return <p className="text-sm text-[var(--text-muted)]">无详细信息</p>;
    }
  };

  return (
    <div className="space-y-4">
      {records.length === 0 ? (
        <div className="text-center py-16">
          <Clock size={40} className="text-[var(--text-placeholder)] mx-auto mb-3" />
          <p className="text-sm text-[var(--text-secondary)]">暂无写作记录</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">完成写作练习后，记录将显示在这里</p>
        </div>
      ) : (
        records.map((record) => (
          <div
            key={record.id}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden transition-all"
          >
            {/* Card header */}
            <button
              onClick={() => toggleExpand(record.id)}
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
            >
              <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                record.mode === 'imitation' ? 'bg-[var(--pink-primary)]/10' :
                record.mode === 'free' ? 'bg-[var(--purple-soft)]/10' : 'bg-[var(--mint-soft)]/10'
              }`}>
                {record.mode === 'imitation' ? <PenLine size={18} className="text-[var(--pink-primary)]" /> :
                 record.mode === 'free' ? <Sparkles size={18} className="text-[var(--purple-soft)]" /> :
                 <BookOpen size={18} className="text-[var(--mint-soft)]" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[13px] px-1.5 py-0.5 rounded-full font-medium ${getModeBadgeColor(record.mode)}`}>
                    {record.modeLabel}
                  </span>
                  <span className="text-[13px] text-[var(--text-muted)]">{record.date}</span>
                </div>
                <p className="text-sm text-[var(--text-primary)] truncate">{record.snippet}</p>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-sm font-bold text-[var(--text-primary)]">{record.score}</span>
              </div>
              {expandedId === record.id ? (
                <ChevronUp size={18} className="text-[var(--text-muted)]" />
              ) : (
                <ChevronDown size={18} className="text-[var(--text-muted)]" />
              )}
            </button>

            {/* Expanded details */}
            {expandedId === record.id && (
              <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-4 animate-fade-in">
                {renderDetails(record)}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
