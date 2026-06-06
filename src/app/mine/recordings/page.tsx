'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mic, Play, Trash2 } from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';

interface Recording {
  id: string;
  userId?: string;
  type?: string;
  text?: string;
  textZh?: string;
  source?: string;
  audioDataUrl?: string;
  duration?: number;
  createdAt?: number;
}

export default function MineRecordingsPage() {
  const { user } = useAuth();
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState<string | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    db.recordings.orderBy('createdAt').reverse().toArray()
      .then((rows) => setRecordings(rows as Recording[]))
      .catch(() => setRecordings([]))
      .finally(() => setLoading(false));
  }, [user]);

  const handlePlay = (recording: Recording) => {
    if (!recording.audioDataUrl) return;
    if (audioEl) { audioEl.pause(); }
    const audio = new Audio(recording.audioDataUrl);
    audio.onended = () => setPlaying(null);
    audio.onerror = () => setPlaying(null);
    audio.play().catch(() => setPlaying(null));
    setAudioEl(audio);
    setPlaying(recording.id);
  };

  const handleDelete = async (id: string) => {
    if (audioEl && playing === id) { audioEl.pause(); setPlaying(null); }
    await db.recordings.delete(id);
    setRecordings((prev) => prev.filter((r) => r.id !== id));
  };

  const typeLabel = (type?: string) => {
    switch (type) {
      case 'shadowing': return '影子跟读';
      case 'kpop': return 'KPOP跟唱';
      case 'pronunciation': return '发音练习';
      default: return type || '录音';
    }
  };

  return (
    <div className="py-4 space-y-4">
      <div className="flex items-center gap-2 text-[13px]">
        <Link href="/mine" className="text-[#8c8177] hover:text-[#2f2a26] transition-colors flex items-center gap-1">
          <ArrowLeft size={14} />返回
        </Link>
        <span className="text-[#c7b7b0]">/</span>
        <span className="text-[#8b766e] font-medium">我的录音</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#f0ebe3] border-t-[#e47a94] rounded-full animate-spin" />
        </div>
      ) : recordings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#fbf7f0] flex items-center justify-center mb-4">
            <Mic size={28} className="text-[#d4ccc4]" />
          </div>
          <h2 className="text-[16px] font-bold text-[#2f2a26] mb-2">这里会展示你的录音</h2>
          <p className="text-[13px] text-[#8b766e] max-w-xs leading-relaxed">
            在影子跟读、KPOP 跟唱和发音练习中录制的音频，会出现在这里
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-[12px] text-[#8c8177]">共 {recordings.length} 条录音</p>
          {recordings.map((rec) => (
            <div
              key={rec.id}
              className="bg-white border border-[#efe4d8] rounded-[18px] p-4 shadow-[0_2px_8px_rgba(92,64,38,0.03)]"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-[#f5f0ea] text-[#8c8177]">
                    {typeLabel(rec.type)}
                  </span>
                  {rec.text && (
                    <p className="text-[14px] font-bold text-[#2f2a26] mt-1.5 leading-relaxed">
                      {rec.text}
                    </p>
                  )}
                  {rec.textZh && (
                    <p className="text-[12px] text-[#8b766e] mt-0.5">{rec.textZh}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {rec.audioDataUrl && (
                  <button
                    onClick={() => handlePlay(rec)}
                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-xl transition-all ${
                      playing === rec.id
                        ? 'bg-[#e47a94]/15 text-[#e47a94]'
                        : 'bg-[#f5f0ea] text-[#8c8177] hover:bg-[#efe4d8] active:scale-95'
                    }`}
                  >
                    <Play size={12} />
                    {playing === rec.id ? '播放中' : '播放'}
                  </button>
                )}
                <button
                  onClick={() => handleDelete(rec.id)}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-1.5 rounded-xl text-[#c7b7b0] hover:text-red-400 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
                {rec.createdAt && (
                  <span className="text-[10px] text-[#c7b7b0] ml-auto">
                    {new Date(rec.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
