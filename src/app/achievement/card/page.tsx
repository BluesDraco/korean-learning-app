'use client';

import { SITE_URL } from '@/lib/seo';
import { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowLeft, Download, Copy, Check, Loader2, Palette, X } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/gamification';
import { ACHIEVEMENT_BY_ID } from '@/data/achievements';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';

// 分享卡由成就墙以 ?type=<成就id> 驱动。展示信息统一从 achievements.ts 解析。
function resolveAch(id: string): { title: string; subtitle: string; icon: string } | null {
  const def = ACHIEVEMENT_BY_ID[id];
  if (!def) return null;
  return { title: def.title, subtitle: def.subtitle, icon: def.icon };
}

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
  def: { title: string; subtitle: string; icon: string },
  stats: { reviews: number; days: number; chats: number },
  nickname: string,
  message: string,
  scheme: ColorScheme,
  lang: Lang,
) {
  const ctx = canvas.getContext('2d')!;
  const W = 1080;
  const H = 1080;
  canvas.width = W;
  canvas.height = H;

  const c = COLORS[scheme];

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
  ctx.fillText(t('achcard.card_brand', lang), W / 2, 100);

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
  const statsText = t('achcard.card_stats', lang, { reviews: stats.reviews, days: stats.days, chats: stats.chats });
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
  ctx.fillText(SITE_URL.replace('https://', ''), W / 2, H - 80);

  // Bottom border
  ctx.fillStyle = c.primary;
  ctx.fillRect(0, H - 8, W, 8);
}

// ── Main Component ─────────────────────────────────────────────────

export default function AchievementCardPage() {
  const { lang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [milestone, setMilestone] = useState<string | null>(null);
  const [scheme, setScheme] = useState<ColorScheme>('pink');
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('학습자');
  const [stats, setStats] = useState({ reviews: 0, days: 0, chats: 0 });
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 由成就墙以 ?type=<成就id> 驱动。解锁检测在墙里完成，本页只负责生成分享卡。
  useEffect(() => {
    (async () => {
      try {
        const profile = await getProfile();
        if (profile) setNickname(profile.nickname || '학습자');

        const allWords = await db.words.orderBy('id').limit(2000).toArray();
        const reviewed = allWords.filter((w) => w.lastReviewed).length;
        let chatRounds = 0;
        try { chatRounds = (await db.studyLogs.filter((l) => l.action === 'ai_chat')).length; } catch { /* ignore */ }
        const dailyLogs = await db.dailyLogs.orderBy('id').limit(1000).toArray();
        setStats({ reviews: reviewed, days: dailyLogs.length, chats: chatRounds });

        const params = new URLSearchParams(window.location.search);
        const typeParam = params.get('type');
        if (typeParam && resolveAch(typeParam)) {
          setMilestone(typeParam);
          setShowModal(true);
          spawnConfetti(document.body);
        }
      } catch { /* db unavailable */ } finally {
        setLoading(false);
      }
    })();
  }, []);

  const def = milestone ? resolveAch(milestone) : null;

  // Draw canvas whenever inputs change
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !def) return;
    drawCard(canvas, def, stats, nickname, message, scheme, lang);
  }, [def, stats, nickname, message, scheme, lang]);

  useEffect(() => { draw(); }, [draw]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `tori-milestone-${milestone}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!def) {
    return (
      <div className="py-6 max-w-lg md:max-w-none mx-auto text-center space-y-6">
        <span className="text-6xl">🐰</span>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">{t('achcard.noneTitle', lang)}</h1>
        <p className="text-sm text-[var(--text-secondary)]">{t('achcard.noneDesc', lang)}</p>
        <Link href="/achievement" className="inline-block px-6 py-2.5 bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium">
          {t('achcard.goStudy', lang)}
        </Link>
      </div>
    );
  }

  return (
    <div className="py-4 max-w-lg md:max-w-none mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/achievement" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-[var(--text-primary)]">{t('achcard.title', lang)}</h1>
      </div>

      {/* Milestone info */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center space-y-2">
        <span className="text-4xl">{def.icon}</span>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">{def.title}</h2>
        <p className="text-sm text-[var(--text-secondary)]">{def.subtitle}</p>
        <div className="flex items-center justify-center gap-4 text-sm text-[var(--text-muted)]">
          <span>{t('achcard.statReviews', lang, { n: stats.reviews })}</span>
          <span>{t('achcard.statDays', lang, { n: stats.days })}</span>
          <span>{t('achcard.statChats', lang, { n: stats.chats })}</span>
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
          <Palette size={16} /> {t('achcard.pickColor', lang)}
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
              <span className="text-xs font-medium text-[var(--text-primary)]">{t(`achcard.color.${key}`, lang)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Custom message */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <p className="text-sm font-medium text-[var(--text-primary)] mb-2">{t('achcard.msgLabel', lang)}</p>
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, 20))}
            placeholder={t('achcard.msgPlaceholder', lang)}
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
          <Download size={18} /> {t('achcard.save', lang)}
        </button>
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl font-medium text-sm text-[var(--text-primary)] hover:border-[var(--pink-pale)]"
        >
          {copied ? <Check size={18} className="text-[var(--mint-soft)]" /> : <Copy size={18} />}
          {copied ? t('achcard.copied', lang) : t('achcard.copyLink', lang)}
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
              {t('achcard.modalLine1', lang)}<br />{t('achcard.modalLine2', lang)}
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-xl font-medium text-white text-sm"
              style={{ backgroundColor: COLORS[scheme].primary }}
            >
              {t('achcard.viewCard', lang)}
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
