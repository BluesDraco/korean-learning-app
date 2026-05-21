'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Mic, MicOff, Play, Pause, SkipForward, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/db';
import type { Video, Subtitle } from '@/types';

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

  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  }, [selectedVideoId]);

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.7;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
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
      silenceTimerRef.current = setTimeout(() => {
        const currentSub = subtitles[currentIdx];
        if (currentSub && final.trim()) {
          const cleanUser = final.trim().replace(/\s+/g, '');
          const cleanTarget = currentSub.text.trim().replace(/\s+/g, '');
          const similarity = cleanUser === cleanTarget ? 100 : Math.round((1 - levenshteinDistance(cleanUser, cleanTarget) / Math.max(cleanUser.length, cleanTarget.length)) * 100);
          setFeedback(similarity >= 90 ? `优秀! 匹配度 ${similarity}%` : similarity >= 60 ? `不错，匹配度 ${similarity}%` : `继续加油，匹配度 ${similarity}%`);
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

  const handleNext = () => {
    if (currentIdx + 1 < subtitles.length) {
      const next = currentIdx + 1;
      setCurrentIdx(next);
      setTranscript('');
      setFeedback('');
      if (autoPlay) speak(subtitles[next].text);
    }
  };

  const handlePlayCurrent = () => {
    if (subtitles[currentIdx]) speak(subtitles[currentIdx].text);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-slate-400" />
      </div>
    );
  }

  const currentSub = subtitles[currentIdx];

  return (
    <div className="py-6 space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white">影子跟读</h1>
        <p className="text-slate-400 text-sm mt-1">模仿发音，跟读韩语句子</p>
      </div>

      {/* Video Selector */}
      {videos.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <Mic size={48} className="text-slate-600 mx-auto" />
          <p className="text-slate-500">还没有视频</p>
          <Link href="/videos" className="text-blue-400 text-sm hover:text-blue-300">
            去导入视频
          </Link>
        </div>
      ) : (
        <>
          <select
            value={selectedVideoId || ''}
            onChange={(e) => setSelectedVideoId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            {videos.map((v) => (
              <option key={v.id} value={v.id}>{v.title}</option>
            ))}
          </select>

          {/* Progress */}
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>{currentIdx + 1} / {subtitles.length}</span>
            <button
              onClick={() => { setAutoPlay(!autoPlay); }}
              className={`text-xs px-3 py-1 rounded-lg transition-colors ${autoPlay ? 'bg-emerald-600/20 text-emerald-400' : 'bg-slate-800 text-slate-400'}`}
            >
              自动播放
            </button>
          </div>

          {currentSub ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
              {/* Target text */}
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-2">
                  {Math.floor(currentSub.start / 60)}:{(Math.floor(currentSub.start) % 60).toString().padStart(2, '0')}
                </p>
                <h2 className="text-2xl font-bold text-white leading-relaxed">{currentSub.text}</h2>
                <p className="text-slate-400 text-sm mt-2">{currentSub.textZh}</p>
              </div>

              {/* Play button */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handlePlayCurrent}
                  className="w-16 h-16 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 flex items-center justify-center transition-colors"
                >
                  <Play size={28} className="text-emerald-400" />
                </button>
              </div>

              {/* Mic toggle */}
              <div className="flex justify-center">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                    isListening
                      ? 'bg-red-500/20 text-red-400 animate-pulse'
                      : 'bg-slate-800 text-slate-400 hover:text-emerald-400'
                  }`}
                >
                  {isListening ? <MicOff size={32} /> : <Mic size={32} />}
                </button>
              </div>

              {/* Speech transcript */}
              {transcript && (
                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-sm text-slate-300">{transcript}</p>
                </div>
              )}

              {/* Feedback */}
              {feedback && (
                <div className={`text-center p-3 rounded-xl ${
                  feedback.includes('优秀') ? 'bg-emerald-500/10 text-emerald-400' :
                  feedback.includes('不错') ? 'bg-yellow-500/10 text-yellow-400' :
                  'bg-orange-500/10 text-orange-400'
                }`}>
                  <p className="font-medium">{feedback}</p>
                </div>
              )}

              {/* Next */}
              <div className="flex justify-center">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors text-sm"
                >
                  下一句
                  <SkipForward size={16} />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 text-center py-8">该视频暂无字幕</p>
          )}
        </>
      )}
    </div>
  );
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
