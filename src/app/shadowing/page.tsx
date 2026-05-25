'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Mic, MicOff, Play, Pause, SkipForward, Loader2, CheckCircle, Zap, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/db';
import type { Video, Subtitle } from '@/types';
import { awardXp, XP_REWARDS, updateStreak } from '@/lib/gamification';

export default function ShadowingPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [subtitles, setSubtitles] = useState<Subtitle[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [xpIndicator, setXpIndicator] = useState<{ visible: boolean; amount: number }>({ visible: false, amount: 0 });

  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const xpAwardedForIdxs = useRef<Set<number>>(new Set());
  const sessionCompletedRef = useRef(false);

  useEffect(() => {
    const load = async () => {
      const vids = await db.videos.orderBy('addedAt').reverse().toArray();
      setVideos(vids);
      if (vids.length > 0) setSelectedVideoId(vids[0].id);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (!selectedVideoId) return;
    db.subtitles.where('videoId').equals(selectedVideoId).sortBy('start').then(setSubtitles);
    setCurrentIdx(0);
    setTranscript('');
    setFeedback('');
    setSessionComplete(false);
    sessionCompletedRef.current = false;
    xpAwardedForIdxs.current = new Set();
  }, [selectedVideoId]);

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.7;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }, []);

  const showXpIndicator = useCallback((amount: number) => {
    setXpIndicator({ visible: true, amount });
    setTimeout(() => {
      setXpIndicator({ visible: false, amount: 0 });
    }, 2500);
  }, []);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback('您的浏览器不支持语音识别，请使用 Chrome');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event: any) => {
      let final = '';
      for (let i = 0; i < event.results.length; i++) {
        final += event.results[i][0].transcript;
      }
      setTranscript(final);

      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = setTimeout(async () => {
        const currentSub = subtitles[currentIdx];
        if (currentSub && final.trim()) {
          const cleanUser = final.trim().replace(/\s+/g, '');
          const cleanTarget = currentSub.text.trim().replace(/\s+/g, '');
          const similarity = cleanUser === cleanTarget ? 100 : Math.round((1 - levenshteinDistance(cleanUser, cleanTarget) / Math.max(cleanUser.length, cleanTarget.length)) * 100);

          if (similarity >= 90) {
            setFeedback(`优秀! 匹配度 ${similarity}%`);

            // Award XP if not already awarded for this subtitle
            if (!xpAwardedForIdxs.current.has(currentIdx)) {
              xpAwardedForIdxs.current.add(currentIdx);

              // Award XP
              const result = await awardXp(XP_REWARDS.shadowingGood);
              showXpIndicator(XP_REWARDS.shadowingGood);

              // Save shadowing record
              try {
                await db.shadowingRecords.put({
                  id: crypto.randomUUID(),
                  subtitleId: currentSub.id,
                  date: Date.now(),
                  score: similarity,
                });
              } catch (e) {
                // Silently handle record save errors
              }

              // Update daily log shadowing count
              try {
                const todayStart = new Date().setHours(0, 0, 0, 0);
                const logId = `log-${todayStart}`;
                const log = await db.dailyLogs.get(logId);
                if (log) {
                  await db.dailyLogs.update(logId, { shadowingDone: (log.shadowingDone || 0) + 1 });
                }
              } catch (e) {
                // Silently handle
              }
            }

            // Check if this is the last subtitle and session should be marked complete
            if (currentIdx === subtitles.length - 1 && !sessionCompletedRef.current) {
              sessionCompletedRef.current = true;
              await updateStreak();
              setSessionComplete(true);
            }
          } else if (similarity >= 60) {
            setFeedback(`不错，匹配度 ${similarity}%`);
          } else {
            setFeedback(`继续加油，匹配度 ${similarity}%`);
          }
        }
      }, 1500);
    };

    recognition.onerror = () => { setIsListening(false); };
    recognition.onend = () => { if (isListening) recognition.start(); };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
  };

  const handleNext = async () => {
    if (currentIdx + 1 < subtitles.length) {
      const next = currentIdx + 1;
      setCurrentIdx(next);
      setTranscript('');
      setFeedback('');
      if (autoPlay) speak(subtitles[next].text);
    } else {
      // Last subtitle — complete session
      if (!sessionCompletedRef.current) {
        sessionCompletedRef.current = true;
        await updateStreak();
        setSessionComplete(true);
      }
    }
  };

  const handlePlayCurrent = () => {
    if (subtitles[currentIdx]) speak(subtitles[currentIdx].text);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  const currentSub = subtitles[currentIdx];
  const isLastSubtitle = currentIdx === subtitles.length - 1;

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto">
      {/* XP Indicator Toast */}
      {xpIndicator.visible && (
        <div className="fixed top-6 right-6 z-50 animate-slide-down">
          <div className="flex items-center gap-3 bg-emerald-600/90 backdrop-blur-sm text-[var(--text-primary)] px-5 py-3 rounded-2xl shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
            <Zap size={20} className="text-emerald-200" />
            <div>
              <p className="text-sm font-bold">经验值奖励!</p>
              <p className="text-xs text-emerald-200">+{xpIndicator.amount} XP</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">影子跟读</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">模仿发音，跟读韩语句子</p>
        </div>
        <img src="/images/tori-poses/tori-pose-09.png" alt="" className="w-9 h-9 object-contain hidden sm:block" />
      </div>

      {/* Video Selector */}
      {videos.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <Mic size={48} className="text-[var(--text-placeholder)] mx-auto" />
          <p className="text-[var(--text-muted)]">还没有视频</p>
          <Link href="/videos" className="text-[var(--pink-primary)] text-sm hover:text-[var(--pink-primary)]">
            去导入视频
          </Link>
        </div>
      ) : (
        <>
          <select
            value={selectedVideoId || ''}
            onChange={(e) => setSelectedVideoId(e.target.value)}
            className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg py-2.5 px-4 text-sm text-[var(--text-primary)] focus:outline-none focus:border-emerald-500"
          >
            {videos.map((v) => (
              <option key={v.id} value={v.id}>{v.title}</option>
            ))}
          </select>

          {/* Progress */}
          <div className="flex items-center justify-between text-sm text-[var(--text-muted)]">
            <span>{currentIdx + 1} / {subtitles.length}</span>
            <button
              onClick={() => { setAutoPlay(!autoPlay); }}
              className={`text-xs px-3 py-1 rounded-lg transition-colors ${autoPlay ? 'bg-emerald-600/20 text-[var(--mint-soft)]' : 'bg-[var(--bg-input)] text-[var(--text-secondary)]'}`}
            >
              自动播放
            </button>
          </div>

          {currentSub ? (
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 space-y-6">
              {/* Session Complete Banner */}
              {sessionComplete && (
                <div className="flex items-center justify-center gap-2 bg-[var(--mint-soft)]/15 border border-emerald-500/20 rounded-xl py-3 px-4">
                  <CheckCircle size={18} className="text-[var(--mint-soft)]" />
                  <span className="text-[var(--mint-soft)] text-sm font-medium">会话完成! 连续打卡已更新</span>
                </div>
              )}

              {/* Target text with syllable coloring */}
              <div className="text-center">
                <p className="text-xs text-[var(--text-muted)] mb-2">
                  {Math.floor(currentSub.start / 60)}:{(Math.floor(currentSub.start) % 60).toString().padStart(2, '0')}
                </p>
                <div className="flex items-start justify-center gap-2">
                  <div className="text-2xl font-bold text-[var(--text-primary)] leading-relaxed">
                    {(() => {
                      if (!transcript.trim()) {
                        return <span>{currentSub.text}</span>;
                      }
                      // Split into syllable groups for comparison
                      const targetClean = currentSub.text.trim();
                      const userClean = transcript.trim();
                      const targetSyllables = splitKoreanSyllables(targetClean);
                      const userSyllables = splitKoreanSyllables(userClean);

                      return targetSyllables.map((syl, i) => {
                        let color = 'text-[var(--text-primary)]';
                        if (i < userSyllables.length) {
                          const match = syl === userSyllables[i];
                          color = match
                            ? 'text-[var(--mint-soft)]'
                            : syl.replace(/\s/g, '') === userSyllables[i].replace(/\s/g, '')
                              ? 'text-[var(--peach-soft)]'
                              : 'text-[var(--pink-primary)]';
                        } else {
                          color = 'text-[var(--text-placeholder)]';
                        }
                        return (
                          <span key={i} className={color}>
                            {syl}
                          </span>
                        );
                      });
                    })()}
                  </div>
                  <button
                    onClick={() => speak(currentSub.text)}
                    className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0 mt-0.5"
                    title="听发音"
                  >
                    <Volume2 size={14} />
                  </button>
                </div>
                <p className="text-[var(--text-secondary)] text-sm mt-2">{currentSub.textZh}</p>
              </div>

              {/* Play button */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handlePlayCurrent}
                  className="w-16 h-16 rounded-full bg-[var(--mint-soft)]/15 hover:bg-emerald-500/20 flex items-center justify-center transition-colors"
                >
                  <Play size={28} className="text-[var(--mint-soft)]" />
                </button>
              </div>

              {/* Mic toggle */}
              <div className="flex justify-center">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                    isListening
                      ? 'bg-red-500/20 text-red-400 animate-pulse'
                      : 'bg-[var(--bg-input)] text-[var(--text-secondary)] hover:text-[var(--mint-soft)]'
                  }`}
                >
                  {isListening ? <MicOff size={32} /> : <Mic size={32} />}
                </button>
              </div>

              {/* Speech transcript */}
              {transcript && (
                <div className="bg-[var(--bg-input)] rounded-xl p-4">
                  <p className="text-sm text-[var(--text-primary)]">{transcript}</p>
                </div>
              )}

              {/* Feedback */}
              {feedback && (
                <div className={`text-center p-3 rounded-xl ${
                  feedback.includes('优秀') ? 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]' :
                  feedback.includes('不错') ? 'bg-yellow-500/10 text-[var(--peach-soft)]' :
                  'bg-[var(--peach-soft)]/15 text-[var(--peach-soft)]'
                }`}>
                  <p className="font-medium">{feedback}</p>
                </div>
              )}

              {/* Next / Complete */}
              <div className="flex justify-center">
                <button
                  onClick={handleNext}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-colors text-sm ${
                    isLastSubtitle
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-[var(--text-primary)]'
                      : 'bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)]'
                  }`}
                >
                  {isLastSubtitle ? '完成会话' : '下一句'}
                  <SkipForward size={16} />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-[var(--text-muted)] text-center py-8">该视频暂无字幕</p>
          )}
        </>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

function splitKoreanSyllables(text: string): string[] {
  const result: string[] = [];
  for (const char of text) {
    if (char === ' ') {
      result.push(' ');
    } else if (/[가-힣]/.test(char)) {
      result.push(char);
    } else if (/[ㄱ-ㅎㅏ-ㅣ]/.test(char)) {
      result.push(char);
    } else {
      if (result.length > 0 && !result[result.length - 1].match(/[가-힣ㄱ-ㅎㅏ-ㅣ\s]/)) {
        result[result.length - 1] += char;
      } else {
        result.push(char);
      }
    }
  }
  return result;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) matrix[i][j] = matrix[i - 1][j - 1];
      else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[b.length][a.length];
}
