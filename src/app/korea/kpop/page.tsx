'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, BookOpen, Music, Loader2, Play, ChevronRight, Mic, Volume2, Clock, ExternalLink, AlertTriangle } from 'lucide-react';
import type { KpopTrack, KpopImportJob } from '@/types/kpop';
import { getAllTracks, getTracksByLevel, searchTracks } from '@/data/kpopTracks';
import { getAllSongProgress, fetchProgressFromServer } from '@/lib/kpop/progress';

import { useAuth } from '@/components/AuthProvider';
import { DesktopKpopPage } from '@/components/desktop/DesktopKpopPage';

const LEVEL_CONFIG: Record<string, { label: string; color: string }> = {
  beginner: { label: '入门', color: '#81b5a1' },
  intermediate: { label: '中级', color: '#e8a87c' },
};

const ASSET_STATUS_CONFIG: Record<string, { label: string; color: string; icon: 'ready' | 'missing' | 'processing' }> = {
  ready: { label: '歌词已对齐', color: '#81b5a1', icon: 'ready' },
  uncalibrated: { label: '歌词待校准', color: '#e8a87c', icon: 'processing' },
  processing: { label: '整理中', color: '#e8a87c', icon: 'processing' },
  missing_audio: { label: '缺音频', color: '#c7b7b0', icon: 'missing' },
  missing_lyrics: { label: '缺歌词', color: '#c7b7b0', icon: 'missing' },
};

const IMPORT_STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  queued: { label: '排队中', color: '#8c8177', icon: <Clock size={12} /> },
  analyzing_link: { label: '识别中', color: '#e8a87c', icon: <Loader2 size={12} className="animate-spin" /> },
  fetching_metadata: { label: '获取信息', color: '#e8a87c', icon: <Loader2 size={12} className="animate-spin" /> },
  matching_lyrics: { label: '匹配歌词', color: '#e8a87c', icon: <Loader2 size={12} className="animate-spin" /> },
  aligning_timestamps: { label: '对齐时间', color: '#e8a87c', icon: <Loader2 size={12} className="animate-spin" /> },
  generating_learning_cards: { label: '生成卡片', color: '#e8a87c', icon: <Loader2 size={12} className="animate-spin" /> },
  needs_review: { label: '待审核', color: '#b49ccf', icon: <Clock size={12} /> },
  ready: { label: '已完成', color: '#81b5a1', icon: <Music size={12} /> },
  failed: { label: '失败', color: '#e47a94', icon: <AlertTriangle size={12} /> },
};

function uniqueKoreanWords(lyrics: KpopTrack['lyrics']): number {
  const all = lyrics
    .filter((l) => /[가-힣]/.test(l.korean))
    .flatMap((l) => l.korean.split(/[\s,.'"!?\-…]+/))
    .filter((w) => /[가-힣]/.test(w) && w.length > 1);
  return new Set(all).size;
}

export default function KpopPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [importUrl, setImportUrl] = useState('');
  const [importSubmitting, setImportSubmitting] = useState(false);
  const [progressMap, setProgressMap] = useState<Record<string, { practiced: number; total: number; songId: string; title: string; artist: string }>>({});

  const { user } = useAuth();
  const [importJobs, setImportJobs] = useState<KpopImportJob[]>([]);

  const allTracks = useMemo(() => getAllTracks(), []);

  useEffect(() => {
    (async () => {
      const local = getAllSongProgress();
      const serverProgress = user ? await fetchProgressFromServer().catch(() => []) : [];

      const merged = new Map<string, typeof local[0]>();
      for (const p of local) merged.set(p.songId, p);
      for (const p of serverProgress) merged.set(p.songId, p);

      const map: Record<string, { practiced: number; total: number; songId: string; title: string; artist: string }> = {};
      for (const p of merged.values()) {
        const track = allTracks.find((t) => t.id === p.songId);
        map[p.songId] = {
          practiced: p.practicedLines,
          total: p.totalLines,
          songId: p.songId,
          title: track?.title ?? p.songId,
          artist: track?.artist ?? '',
        };
      }
      setProgressMap(map);
    })();
  }, [allTracks, user]);

  useEffect(() => {
    if (!user) return;
    fetch('/api/kpop/import')
      .then((res) => res.ok ? res.json() : [])
      .then((jobs) => setImportJobs(jobs))
      .catch(() => {});
  }, [user]);

  const handleImportSubmit = async () => {
    if (!importUrl.trim() || importSubmitting) return;
    setImportSubmitting(true);
    router.push(`/korea/kpop/create?url=${encodeURIComponent(importUrl.trim())}`);
  };

  const filtered = useMemo(() => {
    let tracks = allTracks;
    if (levelFilter !== 'all') tracks = getTracksByLevel(levelFilter as KpopTrack['level']);
    if (search) tracks = searchTracks(search);
    return tracks;
  }, [search, levelFilter, allTracks]);

  const inProgressSongs = Object.values(progressMap)
    .filter((p) => p.practiced > 0 && p.practiced < p.total)
    .sort((a, b) => b.practiced - a.practiced);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isDesktop) return <DesktopKpopPage />;

  return (
    <div className="py-4 space-y-5 max-w-3xl mx-auto">
      {/* Demo notice banner */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-2xl bg-[#fff8f0] border border-[#f5d9b0]">
        <span className="text-[18px] mt-0.5">🎵</span>
        <div>
          <p className="text-[12px] font-black text-[#b07030]">演示模式 · 暂不开放</p>
          <p className="text-[11px] text-[#c09060] mt-0.5 leading-relaxed">歌词跟唱功能正在内测中，内容尚未实装，仅供演示参考。</p>
        </div>
      </div>

      {/* Hero — dark gradient matching demo */}
      <div className="rounded-[32px] bg-gradient-to-br from-[#201815] via-[#47342f] to-[#ff8eb0] p-5 border border-white/10 shadow-[0_26px_70px_rgba(78,52,46,0.18)]">
        <span className="inline-flex items-center gap-2 h-[34px] px-3.5 rounded-full bg-white/15 border border-white/15 text-[12px] font-black text-white">
          <span className="w-2 h-2 rounded-full bg-white" />
          KPOP 歌词跟唱
        </span>
        <h1 className="text-[29px] font-black text-white leading-[1.1] tracking-[-0.8px] mt-3.5">
          听原唱，一句一句跟着唱
        </h1>
        <p className="text-[13px] text-white/70 leading-relaxed mt-2.5 max-w-[280px]">
          精选歌曲库为主，粘贴链接只作为 Beta 候补，不让用户上传任何文件。
        </p>
      </div>

      {/* Action buttons */}
      <div className={`grid gap-2.5 ${inProgressSongs.length > 0 ? 'grid-cols-[1.08fr_0.92fr]' : 'grid-cols-1'}`}>
        {inProgressSongs.length > 0 && (
          <Link
            href={`/korea/kpop/${inProgressSongs[0].songId}`}
            className="flex items-center justify-center h-12 rounded-full bg-[var(--text-primary)] text-white text-[14px] font-black shadow-[0_14px_28px_rgba(32,24,21,0.18)] active:scale-95 transition-all"
          >
            继续跟唱
          </Link>
        )}
        <a
          href="#song-library"
          className="flex items-center justify-center h-12 rounded-full bg-white text-[#5a4640] text-[14px] font-black border border-[var(--border-color)] shadow-[0_10px_26px_rgba(78,52,46,0.07)] active:scale-95 transition-all"
        >
          查看歌单
        </a>
      </div>

      {/* Submit song card */}
      <div className="rounded-[30px] p-4 bg-[var(--bg-card)] border border-[var(--border-color)] shadow-[0_16px_42px_rgba(78,52,46,0.10)]">
        <h3 className="text-[16px] font-black text-[var(--text-primary)]">提交想练的歌曲</h3>
        <p className="text-[13px] text-[var(--text-muted)] mt-1.5 leading-relaxed">
          粘贴 YouTube / B站 / 视频链接，Tori 会记录到生成候补。正式逐句材料需要后台整理与校准。
        </p>
        <div className="flex gap-2 mt-3.5 p-1.5 rounded-full bg-[var(--bg-input)] border border-[var(--border-color)]">
          <input
            type="text"
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
            placeholder="粘贴歌曲链接，不需要上传文件"
            className="flex-1 min-w-0 bg-transparent border-0 outline-none px-2 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            onKeyDown={(e) => { if (e.key === 'Enter') handleImportSubmit(); }}
          />
          <button
            onClick={handleImportSubmit}
            disabled={!importUrl.trim() || importSubmitting}
            className="h-9 px-3.5 rounded-full bg-[var(--text-primary)] text-white text-[12px] font-black disabled:opacity-40 active:scale-95 transition-all"
          >
            提交
          </button>
        </div>
      </div>

      {/* Continue singing section */}
      {inProgressSongs.length > 0 && (
        <div>
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-[18px] font-black text-[var(--text-primary)]">继续跟唱</h2>
            <span className="text-[12px] font-black text-[var(--pink-primary)]">上次进度</span>
          </div>
          <div className="space-y-2.5">
            {inProgressSongs.slice(0, 2).map((prog) => {
              const track = allTracks.find((t) => t.id === prog.songId);
              return (
                <Link
                  key={prog.songId}
                  href={`/korea/kpop/${prog.songId}`}
                  className="flex items-center gap-3 rounded-[28px] bg-[var(--bg-card)] p-3.5 shadow-[0_10px_26px_rgba(78,52,46,0.07)] active:scale-[0.98] transition-all"
                >
                  <div className="w-[72px] h-[72px] rounded-[22px] shrink-0 bg-gradient-to-br from-[#ffe1eb] to-[#eaf8f5] overflow-hidden relative">
                    {track?.coverUrl && (
                      <Image src={track.coverUrl} alt="" fill className="object-cover" sizes="72px" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-1.5 flex-wrap mb-1">
                      <span className="text-[11px] font-black text-[var(--pink-primary)] bg-[var(--pink-primary)]/8 px-2 py-1 rounded-full">原唱音频</span>
                      {track?.timingVerified && (
                        <span className="text-[11px] font-black text-[var(--pink-primary)] bg-[var(--pink-primary)]/8 px-2 py-1 rounded-full">已校准</span>
                      )}
                    </div>
                    <h3 className="text-[15px] font-black text-[var(--text-primary)]">{prog.artist} · {prog.title}</h3>
                    <p className="text-[12px] text-[var(--text-muted)] mt-1.5">
                      第 {prog.practiced} / {prog.total} 句
                      {track?.lyrics[prog.practiced - 1]?.section ? ` · ${track.lyrics[prog.practiced - 1].section}段落` : ''}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Song library */}
      <div id="song-library">
        <div className="flex items-end justify-between mb-3">
          <h2 className="text-[18px] font-black text-[var(--text-primary)]">精选歌曲</h2>
          <div className="flex gap-1.5">
            {(['all', 'beginner', 'intermediate'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setLevelFilter(level)}
                className={`text-[11px] font-black px-2.5 py-1 rounded-lg transition-all ${
                  levelFilter === level
                    ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {level === 'all' ? '全部' : LEVEL_CONFIG[level].label}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]/50" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索歌名或歌手..."
            className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-2.5 pl-9 pr-4 text-[13px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <Music size={32} className="text-[var(--text-muted)]/30 mx-auto" />
            <p className="text-[13px] font-bold text-[var(--text-muted)]">没有找到匹配的歌曲</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map((track) => {
              const wordCount = uniqueKoreanWords(track.lyrics);
              const level = LEVEL_CONFIG[track.level];
              const prog = progressMap[track.id];
              const effectiveAssetStatus = track.assetStatus === 'ready' && !track.timingVerified ? 'uncalibrated' : track.assetStatus;
              const asset = ASSET_STATUS_CONFIG[effectiveAssetStatus] ?? ASSET_STATUS_CONFIG.missing_audio;

              return (
                <Link
                  key={track.id}
                  href={`/korea/kpop/${track.id}`}
                  className="flex items-center gap-3 rounded-[28px] bg-[var(--bg-card)] p-3.5 shadow-[0_10px_26px_rgba(78,52,46,0.07)] active:scale-[0.98] transition-all"
                >
                  <div className="w-[72px] h-[72px] rounded-[22px] shrink-0 bg-gradient-to-br from-[#ffe1eb] to-[#eaf8f5] overflow-hidden relative">
                    {track.coverUrl && (
                      <Image src={track.coverUrl} alt="" fill className="object-cover" sizes="72px" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-1.5 flex-wrap mb-1">
                      <span className="text-[10px] font-black px-2 py-1 rounded-full bg-[var(--bg-input)] text-[#7a665f]">
                        {asset.label}
                      </span>
                      <span className="text-[10px] font-black px-2 py-1 rounded-full bg-[var(--bg-input)] text-[#7a665f]">
                        {track.lyrics.length}句
                      </span>
                      <span className="text-[10px] font-black px-2 py-1 rounded-full bg-[var(--bg-input)] text-[#7a665f]">
                        {level.label}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-black text-[var(--text-primary)]">{track.title}</h3>
                    <p className="text-[12px] text-[var(--text-muted)] mt-1.5">
                      {track.artist}
                      {track.year && ` · ${track.year}`}
                    </p>
                    {prog && prog.practiced > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 rounded-full bg-[var(--bg-input)] overflow-hidden max-w-[120px]">
                          <div
                            className="h-full rounded-full bg-[var(--pink-primary)]"
                            style={{ width: `${(prog.practiced / prog.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-[var(--text-muted)]">{prog.practiced}/{prog.total} 句</span>
                      </div>
                    )}
                  </div>
                  <ChevronRight size={16} className="text-[var(--text-muted)]/30 shrink-0" />
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Practice preview */}
      <div className="rounded-[32px] p-4 bg-[var(--text-primary)] text-white shadow-[0_20px_50px_rgba(32,24,21,0.18)]">
        <h3 className="text-[17px] font-black">逐句跟唱预览</h3>
        <div className="mt-3.5 rounded-3xl p-4 bg-white/10 border border-white/10">
          <p className="text-[20px] font-black leading-[1.35]">
            넌 내게 완전히 빠져들게 만들어
          </p>
          <p className="mt-2 text-white/70 text-[13px]">
            你让我完全沉浸其中。
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <button className="h-[38px] rounded-full bg-white/12 text-white text-[12px] font-black active:scale-95 transition-all">
            听这一句
          </button>
          <button className="h-[38px] rounded-full bg-white/12 text-white text-[12px] font-black active:scale-95 transition-all">
            循环
          </button>
          <button className="h-[38px] rounded-full bg-white/12 text-white text-[12px] font-black active:scale-95 transition-all">
            慢速
          </button>
        </div>
      </div>

      {/* TEDx / 세바시 */}
      <Link
        href="/tedx"
        className="flex items-center gap-4 rounded-[20px] bg-gradient-to-r from-[#e7fbef] to-[#ffffff] border border-[#c7e8d4] px-4 py-4 shadow-[0_4px_14px_rgba(92,64,38,0.05)] active:scale-[0.98] transition-all"
      >
        <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#81b5a1] to-[#5fa08a] flex items-center justify-center shrink-0 text-white">
          <Mic size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-bold text-[var(--text-primary)]">TEDx / 세바시 演讲跟读</p>
          <p className="text-[11px] text-[var(--text-muted)] mt-0.5">5 个韩语演讲 · 中韩字幕 · COS 加速</p>
        </div>
        <ChevronRight size={18} className="text-[#81b5a1] shrink-0" />
      </Link>

      {/* My generated songs */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[30px] p-4 shadow-[0_16px_42px_rgba(78,52,46,0.10)]">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-[18px] font-black text-[var(--text-primary)]">我的生成歌曲</h2>
          <Link href="/korea/kpop/create" className="text-[12px] font-black text-[var(--pink-primary)] hover:underline">
            新建
          </Link>
        </div>
        {importJobs.length > 0 ? (
          <div className="space-y-2">
            {importJobs.slice(0, 5).map((job) => {
              const status = IMPORT_STATUS_CONFIG[job.status] ?? IMPORT_STATUS_CONFIG.queued;
              return (
                <div
                  key={job.id}
                  className="flex items-center gap-3 rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)]/50 p-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: status.color + '18' }}
                  >
                    {status.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-[var(--text-primary)] truncate">
                      {job.title || (() => { try { return new URL(job.url).hostname + ' 歌曲'; } catch { return '导入任务'; } })()}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] truncate">{job.url}</p>
                  </div>
                  <span
                    className="text-[10px] font-black px-2 py-0.5 rounded-full shrink-0"
                    style={{ backgroundColor: status.color + '15', color: status.color }}
                  >
                    {status.label}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6">
            <Music size={24} className="text-[var(--text-muted)]/30 mx-auto mb-2" />
            <p className="text-[12px] font-bold text-[var(--text-muted)]">已提交的歌曲跟唱材料处理完成后会出现在这里</p>
            <Link
              href="/korea/kpop/create"
              className="inline-block mt-2 text-[12px] font-black text-[var(--pink-primary)] hover:underline"
            >
              新建生成 →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
