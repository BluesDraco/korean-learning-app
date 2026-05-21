'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Loader2, Play, Pause, Volume2, Plus, Check } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { lookupWord, tokenizeKorean, type TokenInfo } from '@/lib/dictionary';
import type { Video, Subtitle, Word } from '@/types';

interface WordDetail {
  originalText: string;
  dictionaryForm: string;
  conjugation: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  examples: { text: string; translation: string }[];
  alreadySaved: boolean;
}

export default function WatchPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [video, setVideo] = useState<Video | null>(null);
  const [subtitles, setSubtitles] = useState<(Subtitle & { tokens: TokenInfo[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedWord, setSelectedWord] = useState<WordDetail | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [lookupLoading, setLookupLoading] = useState(false);
  const playerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const load = async () => {
      const v = await db.videos.get(id);
      if (!v) { router.push('/videos'); return; }
      setVideo(v);
      const subs = await db.subtitles.where('videoId').equals(id).sortBy('start');
      // Tokenize each subtitle
      const tokenized = subs.map((sub) => ({
        ...sub,
        tokens: tokenizeKorean(sub.text),
      }));
      setSubtitles(tokenized);
      setLoading(false);
    };
    load();
  }, [id, router]);

  const handleSubtitleClick = (start: number, index: number) => {
    setActiveIndex(index);
    if (playerRef.current?.contentWindow) {
      playerRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'seekTo', args: [start, true] }),
        '*'
      );
    }
  };

  const handleWordClick = async (token: TokenInfo, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token.isKoreanWord) return;

    setLookupLoading(true);
    setSelectedWord(null);

    try {
      const existing = await db.words.where('word').equals(token.dictionaryForm || token.text).first();

      const result = await lookupWord(token.text);
      setSelectedWord({
        originalText: token.text,
        dictionaryForm: result.dictionaryForm,
        conjugation: result.conjugation,
        pronunciation: result.pronunciation,
        meaning: result.meaning,
        partOfSpeech: result.partOfSpeech,
        examples: result.examples,
        alreadySaved: !!existing,
      });
    } catch {
      setSelectedWord({
        originalText: token.text,
        dictionaryForm: token.dictionaryForm || token.text,
        conjugation: token.conjugation || '未知',
        pronunciation: '',
        meaning: '查询失败',
        partOfSpeech: '未知',
        examples: [],
        alreadySaved: false,
      });
    } finally {
      setLookupLoading(false);
    }
  };

  const handleAddWord = async () => {
    if (!selectedWord || !video || selectedWord.alreadySaved) return;

    const result = await lookupWord(selectedWord.originalText);
    const newWord: Word = {
      id: crypto.randomUUID(),
      word: result.dictionaryForm,
      pronunciation: result.pronunciation,
      meaning: result.meaning,
      partOfSpeech: result.partOfSpeech,
      examples: result.examples.map((ex) => ({ ...ex, source: 'dictionary' as const })),
      sourceVideoId: video.id,
      mastery: 'new',
      srsLevel: 0,
      easeFactor: 2.5,
      interval: 0,
      createdAt: Date.now(),
      lastReviewed: null,
      nextReview: Date.now(),
    };
    await db.words.put(newWord);
    setSelectedWord((prev) => prev ? { ...prev, alreadySaved: true } : null);
  };

  const playSubtitleRange = (startIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current?.contentWindow) return;
    const startTime = subtitles[startIdx]?.start ?? 0;
    playerRef.current.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func: 'seekTo', args: [startTime, true] }),
      '*'
    );
    setIsPlaying(true);
    setActiveIndex(startIdx);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-slate-400" />
      </div>
    );
  }

  if (!video) return null;

  return (
    <div className="py-6 space-y-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-white truncate">{video.title}</h1>
          <p className="text-xs text-slate-500">{video.channelName}</p>
        </div>
      </div>

      {/* Video Player */}
      <div className="aspect-video bg-black rounded-xl overflow-hidden">
        <iframe
          ref={playerRef}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.youtubeId}?enablejsapi=1&controls=1&modestbranding=1&rel=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
            showTranslation ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-800 text-slate-400'
          }`}
        >
          {showTranslation ? '显示译文' : '隐藏译文'}
        </button>
        <span className="text-xs text-slate-500">|</span>
        <span className="text-xs text-slate-500">点击单词查询 · 点击字幕跳转</span>
        <div className="ml-auto">
          <Link
            href={`/review?videoId=${video.id}`}
            className="text-xs px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
          >
            复习该视频单词
          </Link>
        </div>
      </div>

      {/* Subtitles */}
      <div className="space-y-1 max-h-[50vh] overflow-y-auto">
        {subtitles.length === 0 ? (
          <div className="text-center py-12 bg-slate-900 rounded-xl border border-slate-800">
            <Volume2 size={40} className="text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 text-sm">该视频暂无韩语字幕</p>
            <p className="text-slate-600 text-xs mt-1">尝试导入有韩语字幕的 YouTube 视频</p>
          </div>
        ) : (
          subtitles.map((sub, index) => (
            <div
              key={sub.id}
              onClick={() => handleSubtitleClick(sub.start, index)}
              className={`group p-3 rounded-lg cursor-pointer transition-colors ${
                activeIndex === index
                  ? 'bg-blue-600/20 border-l-2 border-l-blue-400'
                  : 'border-l-2 border-l-transparent hover:bg-slate-800/50'
              }`}
            >
              {/* Timestamp + Play */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs text-slate-500 font-mono">
                  {Math.floor(sub.start / 60).toString().padStart(2, '0')}:{Math.floor(sub.start % 60).toString().padStart(2, '0')}
                </span>
                <button
                  onClick={(e) => playSubtitleRange(index, e)}
                  className="text-slate-600 hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  {isPlaying && activeIndex === index ? <Pause size={12} /> : <Play size={12} />}
                </button>
              </div>

              {/* Korean text with clickable words */}
              <p className="text-[15px] text-white leading-relaxed">
                {sub.tokens.map((token, ti) => {
                  if (token.isKoreanWord) {
                    return (
                      <button
                        key={ti}
                        onClick={(e) => handleWordClick(token, e)}
                        className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/15 px-0.5 py-0.5 rounded transition-all active:bg-blue-500/30 cursor-pointer"
                        title="点击查词"
                      >
                        {token.text}
                      </button>
                    );
                  }
                  return <span key={ti}>{token.text}</span>;
                })}
              </p>

              {/* Chinese translation */}
              {showTranslation && sub.textZh && (
                <p className="text-[13px] text-slate-400 mt-1.5 ml-1">{sub.textZh}</p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Word Detail Modal */}
      {selectedWord && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" onClick={() => setSelectedWord(null)}>
          <div className="absolute inset-0 bg-black/70" />
          <div
            className="relative bg-slate-900 border border-slate-700 rounded-t-2xl md:rounded-2xl p-5 w-full md:w-96 max-h-[80vh] overflow-y-auto mx-0 md:mx-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Word & Dictionary Form */}
            <div className="flex items-start justify-between mb-1">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-2xl font-bold text-white">{selectedWord.dictionaryForm}</span>
                  {selectedWord.dictionaryForm !== selectedWord.originalText && (
                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">
                      ← {selectedWord.originalText}
                    </span>
                  )}
                </div>
                {selectedWord.pronunciation && (
                  <span className="text-sm text-slate-400">{selectedWord.pronunciation}</span>
                )}
              </div>
              <button onClick={() => setSelectedWord(null)} className="text-slate-500 hover:text-white text-xl leading-none">&times;</button>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-2 mt-2 mb-3">
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                {selectedWord.partOfSpeech}
              </span>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                {selectedWord.conjugation}
              </span>
            </div>

            {/* Meaning */}
            <div className="bg-slate-800 rounded-xl p-3 mb-3">
              <p className="text-sm text-slate-300 font-medium">释义</p>
              <p className="text-white mt-1">{selectedWord.meaning}</p>
            </div>

            {/* Examples */}
            {selectedWord.examples.length > 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-xs text-slate-500 font-medium">例句</p>
                {selectedWord.examples.map((ex, i) => (
                  <div key={i} className="bg-slate-800 rounded-lg p-3">
                    <p className="text-sm text-white">{ex.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{ex.translation}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Action */}
            <button
              onClick={handleAddWord}
              disabled={selectedWord.alreadySaved}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                selectedWord.alreadySaved
                  ? 'bg-emerald-600/20 text-emerald-400 cursor-default'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              {selectedWord.alreadySaved ? (
                <>
                  <Check size={16} />
                  已加入单词本
                </>
              ) : (
                <>
                  <Plus size={16} />
                  加入单词本
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
