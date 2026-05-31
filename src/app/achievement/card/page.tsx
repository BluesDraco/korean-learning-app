'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowLeft, Download, Copy, Check, Loader2, Palette, X } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/gamification';
import type { MilestoneType, UserAchievement } from '@/types';

// ── Milestone Definitions ─────────────────────────────────────────

const MILESTONES: Record<MilestoneType, { title: string; subtitle: string; icon: string }> = {
  phonetics_complete: { title: '四十音毕业', subtitle: '托里和你一起学完了发音', icon: '🎓' },
  streak_7: { title: '和托里一起坚持了7天', subtitle: '一周的陪伴刚刚开始', icon: '🔥' },
  streak_30: { title: '和托里一起坚持了30天', subtitle: '一个月的成长看得见', icon: '⭐' },
  streak_100: { title: '和托里一起坚持了100天', subtitle: '百天的坚持是奇迹', icon: '👑' },
  reviews_100: { title: '复习突破100词', subtitle: '每次复习都在变强', icon: '📚' },
  reviews_500: { title: '复习突破500词', subtitle: '脑海里都是韩语了', icon: '🏆' },
  first_picture_book: { title: '第一本绘本完成', subtitle: '和托里读完第一个故事', icon: '📖' },
  ai_chat_10: { title: 'AI对话10轮达成', subtitle: '勇敢开口就是进步', icon: '💬' },
  topik_perfect: { title: 'TOPIK首次满分', subtitle: '满分是对努力最好的回报', icon: '💯' },
  days_100: { title: '学习满100天', subtitle: '和托里相伴走过百天', icon: '🌈' },
};

type ColorScheme = 'pink' | 'purple' | 'mint';

const COLORS: Record<ColorScheme, { primary: string; secondary: string; name: string; label: string }> = {
  pink: { primary: '#FF8FAB', secondary: '#FFD4E0', name: '粉色', label: '樱花粉' },
  purple: { primary: '#C9B8E8', secondary: '#E8DFF5', name: '紫色', label: '薰衣草紫' },
  mint: { primary: '#A8D8D0', secondary: '#D4EFEA', name: '薄荷', label: '薄荷绿' },
};

// ── Confetti ───────────────────────────────────────────────────────

function spawnConfetti(container: HTMLElement) {
  const colors = ['#FF8FAB', '#C9B8E8', '#A8D8D0', '#FFD4E0', '#FFEAA7', '#FFB8C6'];
  for (let i = 0; i < 80; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed; top: -10px; left: ${Math.random() * 100}vw;
      width: ${6 + Math.random() * 10}px; height: ${6 + Math.random() * 10}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events: none; z-index: 9999;
      animation: confettiFall ${2 + Math.random() * 3}s ease-in forwards;
      animation-delay: ${Math.random() * 0.5}s;
    `;
    container.appendChild(particle);
    setTimeout(() => particle.remove(), 4000);
  }
}

// ── Canvas Drawing ─────────────────────────────────────────────────

function drawCard(
  canvas: HTMLCanvasElement,
  milestone: MilestoneType,
  stats: { reviews: number; days: number; chats: number },
  nickname: string,
  message: string,
  scheme: ColorScheme,
) {
  const ctx = canvas.getContext('2d')!;
  const W = 1080;
  const H = 1080;
  canvas.width = W;
  canvas.height = H;

  const c = COLORS[scheme];
  const def = MILESTONES[milestone];

  // Background
  ctx.fillStyle = '#FFFDF9';
  ctx.fillRect(0, 0, W, H);

  // Decorative dots
  ctx.fillStyle = c.secondary;
  for (let x = 30; x < W; x += 80) {
    for (let y = 30; y < H; y += 80) {
      ctx.beginPath();
      ctx.arc(x + Math.sin(y * 0.1) * 20, y + Math.cos(x * 0.1) * 20, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Top border
  ctx.fillStyle = c.primary;
  ctx.fillRect(0, 0, W, 8);

  // Brand header
  ctx.fillStyle = '#5C4B51';
  ctx.font = 'bold 36px "Noto Sans SC", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('韩语学习日记', W / 2, 100);

  // Tori emoji
  ctx.font = '120px sans-serif';
  ctx.fillText('🐰', W / 2, 230);

  // Tori jump animation (subtle offset)
  ctx.font = '80px sans-serif';
  ctx.globalAlpha = 0.3;
  ctx.fillText('✨', W / 2 - 180, 200);
  ctx.fillText('✨', W / 2 + 180, 200);
  ctx.globalAlpha = 1;

  // Main milestone text
  ctx.fillStyle = c.primary;
  ctx.font = 'bold 52px "Noto Sans SC", sans-serif';
  ctx.fillText(def.title, W / 2, 360);

  // Subtitle
  ctx.fillStyle = '#8B7E82';
  ctx.font = '30px "Noto Sans SC", sans-serif';
  ctx.fillText(def.subtitle, W / 2, 420);

  // Icon
  ctx.font = '80px sans-serif';
  ctx.fillText(def.icon, W / 2, 530);

  // Stats row
  ctx.fillStyle = '#5C4B51';
  ctx.font = 'bold 28px "Noto Sans SC", sans-serif';
  const statsY = 630;
  const statsText = `复习 ${stats.reviews} 词  ·  学习 ${stats.days} 天  ·  AI对话 ${stats.chats} 次`;
  ctx.fillText(statsText, W / 2, statsY);

  // Custom message
  if (message) {
    ctx.fillStyle = c.primary;
    ctx.font = 'italic 26px "Noto Sans SC", sans-serif';
    ctx.fillText(`"${message}"`, W / 2, statsY + 60);
  }

  // Separator
  ctx.strokeStyle = c.secondary;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(200, statsY + 100);
  ctx.lineTo(W - 200, statsY + 100);
  ctx.stroke();

  // User info
  ctx.fillStyle = '#5C4B51';
  ctx.font = '24px "Noto Sans SC", sans-serif';
  const today = new Date().toISOString().slice(0, 10);
  ctx.fillText(`${nickname}  ·  ${today}`, W / 2, statsY + 150);

  // Bottom domain
  ctx.fillStyle = '#C4B5B9';
  ctx.font = '20px "Noto Sans SC", sans-serif';
  ctx.fillText('korean-learning.app', W / 2, H - 80);

  // Bottom border
  ctx.fillStyle = c.primary;
  ctx.fillRect(0, H - 8, W, 8);
}

// ── Main Component ─────────────────────────────────────────────────

export default function AchievementCardPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [milestone, setMilestone] = useState<MilestoneType | null>(null);
  const [scheme, setScheme] = useState<ColorScheme>('pink');
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('학습자');
  const [stats, setStats] = useState({ reviews: 0, days: 0, chats: 0 });
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [, setSavedId] = useState<string | null>(null);

  // Check for milestone achievement
  useEffect(() => {
    (async () => {
      const profile = await getProfile();
      if (profile) setNickname(profile.nickname || '학습자');

      // Gather stats
      const allWords = await db.words.toArray();
      const reviewed = allWords.filter((w) => w.lastReviewed).length;
      const longestStreak = profile?.longestStreak || 0;

      // Count AI chat rounds
      let chatRounds = 0;
      let booksRead = 0;
      let topikPerfects = 0;
      try {
        chatRounds = (await db.studyLogs.filter((l) => l.action === 'ai_chat')).length;
        booksRead = (await db.studyLogs.filter((l) => l.action === 'picture_book_complete')).length;
        topikPerfects = (await db.studyLogs.filter((l) => l.action === 'topik_perfect')).length;
      } catch { /* ignore */ }

      // Calculate total study days
      const dailyLogs = await db.dailyLogs.toArray();
      const studyDays = dailyLogs.length;

      // Determine which milestones have been reached but not yet card-generated
      const existingAchs = await db.userAchievements.toArray().catch(() => []);
      const existingTypes = new Set(existingAchs.map((a) => a.achievementType));

      let phComplete = false;
      try { phComplete = (await db.studyLogs.filter(l => l.action === 'phonetics_complete')).length > 0; } catch { /* ignore */ }

      const candidates: { type: MilestoneType; condition: boolean }[] = [
        { type: 'phonetics_complete', condition: phComplete },
        { type: 'streak_7', condition: longestStreak >= 7 },
        { type: 'streak_30', condition: longestStreak >= 30 },
        { type: 'streak_100', condition: longestStreak >= 100 },
        { type: 'reviews_100', condition: reviewed >= 100 },
        { type: 'reviews_500', condition: reviewed >= 500 },
        { type: 'first_picture_book', condition: booksRead >= 1 },
        { type: 'ai_chat_10', condition: chatRounds >= 10 },
        { type: 'topik_perfect', condition: topikPerfects >= 1 },
        { type: 'days_100', condition: studyDays >= 100 },
      ];

      // Find first unclaimed milestone
      const unclaimed = candidates.find((c) => c.condition && !existingTypes.has(c.type));

      setStats({ reviews: reviewed, days: studyDays, chats: chatRounds });

      if (unclaimed) {
        setMilestone(unclaimed.type);
        setShowModal(true);
        spawnConfetti(document.body);
        // Save achievement record
        const ach: UserAchievement = {
          id: crypto.randomUUID(),
          achievementType: unclaimed.type,
          achievedAt: Date.now(),
          isCardGenerated: false,
        };
        await db.userAchievements.add(ach).catch(() => {});
        setSavedId(ach.id);
      } else {
        // Check URL param for existing milestone (revisit)
        const params = new URLSearchParams(window.location.search);
        const typeParam = params.get('type') as MilestoneType | null;
        if (typeParam && MILESTONES[typeParam]) {
          setMilestone(typeParam);
          // Find existing achievement
          const existing = existingAchs.find((a) => a.achievementType === typeParam);
          if (existing) setSavedId(existing.id);
        }
      }

      setLoading(false);
    })();
  }, []);

  // Draw canvas whenever inputs change
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !milestone) return;
    drawCard(canvas, milestone, stats, nickname, message, scheme);
  }, [milestone, stats, nickname, message, scheme]);

  useEffect(() => { draw(); }, [draw]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `tori-milestone-${milestone}.webp`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleCopyLink = async () => {
    const token = crypto.randomUUID().replace(/-/g, '').slice(0, 12);
    await navigator.clipboard.writeText(`${window.location.origin}/diary/share/${token}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!milestone) {
    return (
      <div className="py-6 max-w-lg mx-auto text-center space-y-6">
        <span className="text-6xl">🐰</span>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">还没有新的里程碑</h1>
        <p className="text-sm text-[var(--text-secondary)]">继续学习，托里会在这里等你！</p>
        <Link href="/learn" className="inline-block px-6 py-2.5 bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium">
          去学习
        </Link>
      </div>
    );
  }

  const def = MILESTONES[milestone];
  return (
    <div className="py-4 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/learn" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-[var(--text-primary)]">成就卡片</h1>
      </div>

      {/* Milestone info */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center space-y-2">
        <span className="text-4xl">{def.icon}</span>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">{def.title}</h2>
        <p className="text-sm text-[var(--text-secondary)]">{def.subtitle}</p>
        <div className="flex items-center justify-center gap-4 text-sm text-[var(--text-muted)]">
          <span>复习 {stats.reviews} 词</span>
          <span>学习 {stats.days} 天</span>
          <span>对话 {stats.chats} 次</span>
        </div>
      </div>

      {/* Canvas preview (scaled down) */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3">
        <canvas
          ref={canvasRef}
          className="w-full rounded-lg"
          style={{ aspectRatio: '1' }}
        />
      </div>

      {/* Color scheme picker */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <p className="text-sm font-medium text-[var(--text-primary)] mb-3 flex items-center gap-2">
          <Palette size={16} /> 选择配色
        </p>
        <div className="flex gap-3">
          {(Object.entries(COLORS) as [ColorScheme, typeof COLORS['pink']][]).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setScheme(key)}
              className="flex-1 flex flex-col items-center gap-2 py-3 rounded-xl transition-all"
              style={{
                backgroundColor: scheme === key ? val.primary + '20' : 'var(--bg-input)',
                border: scheme === key ? `2px solid ${val.primary}` : '2px solid transparent',
              }}
            >
              <div className="w-8 h-8 rounded-full" style={{ backgroundColor: val.primary }} />
              <span className="text-xs font-medium text-[var(--text-primary)]">{val.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom message */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <p className="text-sm font-medium text-[var(--text-primary)] mb-2">写一句话（选填，最多20字）</p>
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 20))}
            placeholder="比如：托里，我们一起加油！"
            className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:border-[var(--pink-primary)]/50"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)]">{message.length}/20</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--pink-primary)] text-white rounded-xl font-medium text-sm hover:opacity-90"
        >
          <Download size={18} /> 保存图片
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl font-medium text-sm text-[var(--text-primary)] hover:border-[var(--pink-pale)]"
        >
          {copied ? <Check size={18} className="text-[var(--mint-soft)]" /> : <Copy size={18} />}
          {copied ? '已复制' : '复制链接'}
        </button>
      </div>

      {/* Modal for milestone celebration */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-[var(--bg-card)] rounded-3xl p-8 max-w-sm w-full text-center space-y-4 relative overflow-hidden">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X size={20} />
            </button>

            {/* Tori bouncing */}
            <div className="text-7xl animate-bounce">🐰</div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{def.title}</h2>
              <p className="text-[var(--text-secondary)] mt-1">{def.subtitle}</p>
            </div>

            <p className="text-sm text-[var(--text-muted)]">
              托里为你准备了一张纪念卡片<br />可以保存分享给朋友！
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-xl font-medium text-white text-sm"
              style={{ backgroundColor: COLORS[scheme].primary }}
            >
              查看我的卡片
            </button>
          </div>
        </div>
      )}

      {/* Confetti animation styles */}
      <style jsx global>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
