'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Film, Loader2, Trash2, Play, Link2, AlertCircle } from 'lucide-react';
import { db } from '@/lib/db';
import { detectPlatform } from '@/lib/platform-detector';
import type { StudyVideo } from '@/types';

export default function ShadowingListPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<StudyVideo[]>([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  const loadVideos = useCallback(async () => {
    const list = await db.studyVideos.orderBy('addedAt').reverse().toArray();
    setVideos(list);
    setLoading(false);
  }, []);

  useEffect(() => { loadVideos(); }, [loadVideos]);

  const handleAdd = async () => {
    setError('');
    const detected = detectPlatform(url.trim());
    if (detected.platform === 'unknown') {
      setError('暂不支持此平台，请使用B站或YouTube链接');
      return;
    }

    setAdding(true);
    try {
      // Try to get video title via oEmbed or page info
      let title = '';
      let thumbnail = '';
      if (detected.platform === 'bilibili') {
        try {
          const res = await fetch(`https://api.bilibili.com/x/web-interface/view?bvid=${detected.platformId}`);
          const json = await res.json();
          if (json.code === 0) {
            title = json.data.title;
            thumbnail = json.data.pic;
          }
        } catch {}
      }
      if (detected.platform === 'youtube') {
        try {
          const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${detected.platformId}&format=json`);
          const json = await res.json();
          title = json.title;
          thumbnail = json.thumbnail_url;
        } catch {}
      }

      const newVideo: StudyVideo = {
        id: crypto.randomUUID(),
        url: url.trim(),
        platform: detected.platform,
        platformId: detected.platformId,
        title: title || `${detected.platform === 'bilibili' ? 'B站' : 'YouTube'}视频 (${detected.platformId})`,
        thumbnail,
        subtitleSource: 'manual',
        addedAt: Date.now(),
        lastStudiedAt: Date.now(),
      };

      await db.studyVideos.put(newVideo);
      setUrl('');
      router.push(`/shadowing/${newVideo.id}`);
    } catch (err: any) {
      setError(err.message || '添加失败');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (video: StudyVideo) => {
    await db.studySubtitles.where('videoId').equals(video.id).delete();
    await db.videoStudyLogs.where('videoId').equals(video.id).delete();
    await db.studyVideos.delete(video.id);
    await loadVideos();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  return (
    <div className="py-4 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">视频跟读</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">粘贴视频链接，导入字幕，逐句跟读学习</p>
      </div>

      {/* Add video */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Link2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="粘贴B站或YouTube视频链接..."
              className="w-full bg-[var(--bg-input)] border border-[var(--pink-pale)] rounded-lg py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)]"
              disabled={adding}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
          </div>
          <button
            onClick={handleAdd}
            disabled={adding || !url.trim()}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--pink-primary)] hover:opacity-90 disabled:opacity-40 text-[var(--text-primary)] text-sm font-medium rounded-lg transition-opacity"
          >
            {adding ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
            开始学习
          </button>
        </div>
        {error && (
          <div className="flex items-center gap-1.5 text-xs text-[var(--color-danger)]">
            <AlertCircle size={12} />
            {error}
          </div>
        )}
        <p className="text-[11px] text-[var(--text-muted)]">
          支持 B站 (bilibili.com) 和 YouTube 链接。首次打开后上传SRT字幕即可开始跟读。
        </p>
      </div>

      {/* Video list */}
      {videos.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <Film size={48} className="text-[var(--text-placeholder)] mx-auto" />
          <p className="text-[var(--text-muted)] text-sm">还没有学习过的视频</p>
          <p className="text-[var(--text-muted)] text-xs">粘贴链接开始你的第一次视频跟读</p>
        </div>
      ) : (
        <div className="space-y-2">
          <h2 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">学习记录</h2>
          {videos.map((video) => (
            <div
              key={video.id}
              className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 hover:border-[var(--border-hover)] transition-colors"
            >
              <div className="w-20 h-12 rounded-lg bg-[var(--bg-input)] overflow-hidden shrink-0">
                {video.thumbnail ? (
                  <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">
                    <Film size={18} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-[var(--text-primary)] truncate">{video.title}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] text-[var(--text-muted)]">
                    {video.platform === 'bilibili' ? 'B站' : 'YouTube'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href={`/shadowing/${video.id}`}
                  className="p-2 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/10 rounded-lg transition-colors"
                >
                  <Play size={16} />
                </Link>
                <button
                  onClick={() => handleDelete(video)}
                  className="p-2 text-[var(--text-muted)] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
