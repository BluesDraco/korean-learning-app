'use client';

import { useState, useCallback, useRef } from 'react';
import { Volume2, Mic, Square } from 'lucide-react';
import { speak } from '@/lib/tts';
import type { DailySentence } from '@/data/thirtyDayCourse';

function hasSpeechRecognition(): boolean {
  return !!(typeof window !== 'undefined' &&
    (window.SpeechRecognition || (window as any).webkitSpeechRecognition));
}

export function SentenceIntroCard({ sentence, revealed }: { sentence: DailySentence; revealed: boolean }) {
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [transcript, setTranscript] = useState('');
  const [recError, setRecError] = useState('');
  const recognitionRef = useRef<any>(null);

  const startRecording = useCallback(async () => {
    if (!hasSpeechRecognition()) {
      setRecError('此浏览器不支持语音识别，请使用 Chrome');
      return;
    }
    setRecError('');
    setScore(null);
    setTranscript('');

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SpeechRecognition();
    recognitionRef.current = rec;
    rec.lang = 'ko-KR';
    rec.interimResults = false;
    rec.maxAlternatives = 3;

    rec.onresult = (event: any) => {
      const results: string[] = [];
      for (let i = 0; i < event.results.length; i++) {
        for (let j = 0; j < event.results[i].length; j++) {
          results.push(event.results[i][j].transcript.trim());
        }
      }
      const best = results[0] || '';
      setTranscript(best);
      const targetLower = sentence.korean.replace(/\s+/g, '').toLowerCase();
      const spokenLower = best.replace(/\s+/g, '').toLowerCase();
      const targetSet = new Set(targetLower.split(''));
      const spokenSet = new Set(spokenLower.split(''));
      let overlap = 0;
      for (const c of spokenSet) { if (targetSet.has(c)) overlap++; }
      const union = new Set([...targetSet, ...spokenSet]).size;
      const jaccard = union > 0 ? overlap / union : 0;
      setScore(targetLower === spokenLower ? 100 : Math.round(jaccard * 100));
    };

    rec.onerror = (event: any) => {
      if (event.error === 'no-speech') setRecError('未检测到语音，请再试一次');
      else if (event.error !== 'aborted') setRecError(`识别错误: ${event.error}`);
      setIsRecording(false);
    };

    rec.onend = () => setIsRecording(false);

    try {
      await rec.start();
      setIsRecording(true);
    } catch (e: any) {
      setRecError(`无法启动麦克风: ${e.message}`);
    }
  }, [sentence.korean]);

  const stopRecording = useCallback(() => {
    recognitionRef.current?.abort();
    setIsRecording(false);
  }, []);

  return (
    <>
      <span className="text-[11px] text-[var(--text-muted)] bg-[var(--bg-input)] px-2 py-0.5 rounded-full mb-4">{sentence.scene}</span>
      <div className="flex items-center gap-2 mb-3">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] leading-relaxed flex-1">{sentence.korean}</h2>
        <button
          onClick={(e) => { e.stopPropagation(); speak(sentence.korean, 0.8); }}
          className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-card-hover)] transition-colors shrink-0"
        >
          <Volume2 size={18} />
        </button>
      </div>
      {!revealed ? (
        <p className="text-sm text-[var(--text-muted)]">点击显示翻译</p>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <p className="text-lg font-medium text-[var(--pink-primary)]">{sentence.chinese}</p>
          <p className="text-sm text-[var(--text-muted)] font-mono">{sentence.pronunciation}</p>

          {/* 跟读区域 */}
          <div className="border-t border-[var(--border-color)] pt-4 space-y-3">
            <p className="text-xs font-bold text-[var(--text-muted)]">跟读练习</p>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); speak(sentence.korean, 0.7); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] text-xs font-medium hover:bg-[var(--pink-primary)]/20 transition-colors"
              >
                <Volume2 size={13} />慢速示读
              </button>
              {!isRecording ? (
                <button
                  onClick={(e) => { e.stopPropagation(); startRecording(); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-dashed border-[var(--pink-pale)] text-[var(--pink-primary)] text-xs font-medium hover:bg-[var(--pink-primary)]/5 transition-colors"
                >
                  <Mic size={13} />开始跟读
                </button>
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); stopRecording(); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 text-[var(--color-danger)] text-xs font-medium animate-pulse"
                >
                  <Square size={13} />停止录音
                </button>
              )}
            </div>

            {score !== null && (
              <div className={`p-3 rounded-xl text-center ${
                score >= 80 ? 'bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20' :
                score >= 50 ? 'bg-[var(--peach-soft)]/10 border border-[var(--peach-soft)]/20' :
                'bg-[var(--color-danger-bg)] border border-[var(--color-danger)]/10'
              }`}>
                <p className={`text-xl font-extrabold ${
                  score >= 80 ? 'text-[var(--mint-soft)]' :
                  score >= 50 ? 'text-[var(--peach-soft)]' :
                  'text-[var(--color-danger)]'
                }`}>{score}分</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">识别：{transcript || '(无)'}</p>
                {score >= 80 && <p className="text-xs text-[var(--mint-soft)] mt-0.5">发音很好！</p>}
                {score >= 50 && score < 80 && <p className="text-xs text-[var(--peach-soft)] mt-0.5">再练练</p>}
                {score < 50 && <p className="text-xs text-[var(--color-danger)] mt-0.5">多听几遍再试</p>}
              </div>
            )}
            {recError && <p className="text-xs text-[var(--color-danger)]">{recError}</p>}
          </div>
        </div>
      )}
    </>
  );
}
