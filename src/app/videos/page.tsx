'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Film, Loader2, Trash2, Play, Search } from 'lucide-react';
import { db } from '@/lib/db';
import { extractYouTubeId, getVideoInfo, fetchYouTubeTranscript } from '@/lib/youtube';
import { translateKoToZh, extractWords, lookupWord } from '@/lib/dictionary';
import { calculateSRS } from '@/lib/srs';
import type { Video, Word } from '@/types';

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [url, setUrl] = useState('');
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState('');

  const loadVideos = useCallback(async () => {
    const list = await db.videos.orderBy('addedAt').reverse().toArray();
    setVideos(list);
  }, []);

  useEffect(() => { loadVideos(); }, [loadVideos]);

  const handleImport = async () => {
    setError('');
    const videoId = extractYouTubeId(url.trim());
    if (!videoId) {
      setError('请输入有效的 YouTube 链接');
      return;
    }

    const existing = await db.videos.where('youtubeId').equals(videoId).first();
    if (existing) {
      setError('该视频已导入');
      return;
    }

    setImporting(true);
    setProgress('获取视频信息...');

    try {
      const info = await getVideoInfo(videoId);
      const newVideo: Video = {
        id: crypto.randomUUID(),
        youtubeId: videoId,
        title: info.title,
        thumbnail: info.thumbnail,
        channelName: info.channelName,
        addedAt: Date.now(),
        tags: [],
      };
      await db.videos.put(newVideo);

      setProgress('获取字幕...');
      try {
        const transcript = await fetchYouTubeTranscript(videoId);
        setProgress(`翻译字幕 (0/${transcript.length})...`);

        for (let i = 0; i < transcript.length; i++) {
          const item = transcript[i];
          const textZh = await translateKoToZh(item.text);
          await db.subtitles.put({
            id: crypto.randomUUID(),
            videoId: newVideo.id,
            start: item.start,
            dur: item.dur,
            text: item.text,
            textZh,
          });

          // Extract words from subtitle
          const words = extractWords(item.text);
          for (const koreanWord of words) {
            const existingWord = await db.words.where('word').equals(koreanWord).first();
            if (!existingWord) {
              try {
                const lookedUp = await lookupWord(koreanWord);
                const newWord: Word = {
                  id: crypto.randomUUID(),
                  word: lookedUp.word,
                  pronunciation: lookedUp.pronunciation,
                  meaning: lookedUp.meaning,
                  partOfSpeech: lookedUp.partOfSpeech,
                  examples: lookedUp.examples,
                  sourceVideoId: newVideo.id,
                  sourceSubtitleId: undefined,
                  mastery: 'new',
                  srsLevel: 0,
                  easeFactor: 2.5,
                  interval: 0,
                  createdAt: Date.now(),
                  lastReviewed: null,
                  nextReview: Date.now(),
                };
                await db.words.put(newWord);
              } catch {
                // skip words that fail lookup
              }
            }
          }

          if (i % 10 === 0) {
            setProgress(`翻译字幕 (${i + 1}/${transcript.length})...`);
          }
        }
      } catch {
        // Video without subtitles is still usable
      }

      setUrl('');
      setProgress('');
      setImporting(false);
      await loadVideos();
    } catch (e: any) {
      setError(e.message || '导入失败');
      setImporting(false);
      setProgress('');
    }
  };

  const handleDelete = async (video: Video) => {
    await db.subtitles.where('videoId').equals(video.id).delete();
    await db.words.where('sourceVideoId').equals(video.id).delete();
    await db.videos.delete(video.id);
    await loadVideos();
  };

  return (
    <div className="py-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">视频库</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">导入你喜欢的 YouTube 视频开始学习</p>
      </div>

      {/* Import Form */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="粘贴 YouTube 链接，如 https://youtube.com/watch?v=..."
              className="w-full bg-[var(--bg-input)] border border-[var(--pink-pale)] rounded-lg py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)]"
              disabled={importing}
              onKeyDown={(e) => e.key === 'Enter' && handleImport()}
            />
          </div>
          <button
            onClick={handleImport}
            disabled={importing || !url.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] disabled:bg-[#FFE0E0] disabled:text-[var(--text-muted)] text-[var(--text-primary)] text-sm font-medium rounded-lg transition-colors"
          >
            {importing ? <Loader2 size={16} className="animate-spin" /> : <Film size={16} />}
            导入
          </button>
        </div>
        {progress && (
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            <Loader2 size={12} className="animate-spin" />
            {progress}
          </div>
        )}
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>

      {/* Video Grid */}
      {videos.length === 0 ? (
        <div className="text-center py-16">
          <Film size={48} className="text-[var(--text-placeholder)] mx-auto mb-4" />
          <p className="text-[var(--text-muted)]">还没有视频，粘贴 YouTube 链接开始导入</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden group">
              <div className="aspect-video bg-[var(--bg-input)] relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                  }}
                />
                <Link
                  href={`/watch/${video.id}`}
                  className="absolute inset-0 flex items-center justify-center bg-[var(--text-primary)]/30 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Play size={40} className="text-[var(--text-primary)]" />
                </Link>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 mb-1">{video.title}</h3>
                <p className="text-xs text-[var(--text-muted)] mb-3">{video.channelName}</p>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/watch/${video.id}`}
                    className="text-xs text-[var(--pink-primary)] hover:text-[var(--pink-primary)] transition-colors"
                  >
                    开始学习
                  </Link>
                  <button
                    onClick={() => handleDelete(video)}
                    className="text-[var(--text-placeholder)] hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
