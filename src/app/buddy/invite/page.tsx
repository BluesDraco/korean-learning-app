'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Download, Loader2, UserPlus } from 'lucide-react';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/gamification';
import type { BuddyInvite, BuddyRelation } from '@/types';

const GOALS = ['TOPIK备考', '日常口语', '追星追剧', '旅行备用', '其他'];
const LEVELS = ['零基础', '初级', '中级', '高级'];
const DAILY_TIMES = ['15分钟', '30分钟', '1小时', '1.5小时', '2小时以上'];

function BuddyInviteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const receivedToken = searchParams.get('token');

  // ── Accept flow state ──
  const [acceptLoading, setAcceptLoading] = useState(!!receivedToken);
  const [invite, setInvite] = useState<BuddyInvite | null>(null);
  const [inviterName, setInviterName] = useState('');
  const [acceptError, setAcceptError] = useState('');
  const [accepting, setAccepting] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // ── Create flow state ──
  const [goal, setGoal] = useState(GOALS[0]);
  const [level, setLevel] = useState(LEVELS[0]);
  const [daily, setDaily] = useState(DAILY_TIMES[1]);
  const [intro, setIntro] = useState('');
  const [token, setToken] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardDataRef = useRef<{ nickname: string; goal: string; level: string; daily: string; intro: string } | null>(null);

  // ── Load invite for accept flow ──
  useEffect(() => {
    if (!receivedToken) return;
    (async () => {
      try {
        const invites = await db.buddyInvites.filter((i) => i.inviteToken === receivedToken);
        if (invites.length === 0) {
          setAcceptError('邀请不存在或已过期');
          setAcceptLoading(false);
          return;
        }
        const inv = invites[0];
        if (inv.expiresAt < Date.now()) {
          setAcceptError('邀请已过期');
          setAcceptLoading(false);
          return;
        }
        setInvite(inv);

        const profiles = await db.userProfiles.toArray();
        const p = profiles.find((pr) => pr.id.includes(inv.userId.slice(0, 8)));
        setInviterName(p?.nickname || '학습자');
        setAcceptLoading(false);
      } catch (e: any) {
        setAcceptError('加载邀请失败');
        setAcceptLoading(false);
      }
    })();
  }, [receivedToken]);

  // ── Accept handler ──
  const handleAccept = async () => {
    if (!invite) return;
    setAccepting(true);
    try {
      const profile = await getProfile();
      if (!profile) { setAcceptError('请先登录'); setAccepting(false); return; }
      if (profile.id === invite.userId) { setAcceptError('不能接受自己的邀请'); setAccepting(false); return; }

      const existing = await db.buddyRelations.filter(
        (r) => r.status === 'active' &&
          ((r.userAId === profile.id && r.userBId === invite.userId) ||
           (r.userAId === invite.userId && r.userBId === profile.id))
      );
      if (existing.length > 0) {
        setAccepted(true);
        router.push(`/buddy/${existing[0].id}`);
        return;
      }

      const rel: BuddyRelation = {
        id: crypto.randomUUID(),
        userAId: invite.userId,
        userBId: profile.id,
        status: 'active',
        createdAt: Date.now(),
      };
      await db.buddyRelations.add(rel);
      await db.buddyInvites.delete(invite.id);

      setAccepted(true);
      router.push(`/buddy/${rel.id}`);
    } catch (e: any) {
      setAcceptError(e.message || '接受失败');
      setAccepting(false);
    }
  };

  const handleCreate = async () => {
    const profile = await getProfile();
    if (!profile) return;

    const inviteToken = crypto.randomUUID().replace(/-/g, '');
    const invite: BuddyInvite = {
      id: crypto.randomUUID(),
      userId: profile.id,
      inviteToken,
      learningGoal: goal,
      level,
      dailyMinutes: daily,
      intro,
      expiresAt: Date.now() + 30 * 86400000,
    };
    await db.buddyInvites.add(invite);

    cardDataRef.current = { nickname: profile.nickname || '학습자', goal, level, daily, intro };
    setToken(inviteToken);
  };

  // Draw card after canvas mounts
  useEffect(() => {
    if (!token) return;
    const data = cardDataRef.current;
    if (!data) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const raf = requestAnimationFrame(() => {
      const W = 1080; const H = 1080;
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#FFFDF9';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#FF8FAB';
      ctx.fillRect(0, 0, W, 8);
      ctx.fillRect(0, H - 8, W, 8);

      ctx.font = '120px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🐰', W / 2, 180);

      ctx.fillStyle = '#5C4B51';
      ctx.font = 'bold 48px "Noto Sans SC", sans-serif';
      ctx.fillText('找个学习搭子', W / 2, 300);

      ctx.font = '32px "Noto Sans SC", sans-serif';
      ctx.fillText(`${data.nickname} 想找个搭子一起学韩语`, W / 2, 380);

      ctx.fillStyle = '#8B7E82';
      ctx.font = '28px "Noto Sans SC", sans-serif';
      const details = [
        `🎯 目标：${data.goal}`,
        `📊 水平：${data.level}`,
        `⏰ 每天：${data.daily}`,
      ];
      details.forEach((d, i) => ctx.fillText(d, W / 2, 460 + i * 50));
      if (data.intro) ctx.fillText(`💬 "${data.intro}"`, W / 2, 460 + details.length * 50);

      ctx.fillStyle = '#C4B5B9';
      ctx.font = '22px "Noto Sans SC", sans-serif';
      ctx.fillText('扫描二维码或点击链接，和托里一起学习吧', W / 2, H - 120);
      ctx.font = '18px "Noto Sans SC", sans-serif';
      ctx.fillText('korean-learning.app', W / 2, H - 70);
    });
    return () => cancelAnimationFrame(raf);
  }, [token]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}/buddy/invite?token=${token}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = 'tori-buddy-invite.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  return (
    <div className="py-4 max-w-lg mx-auto space-y-4">
      {/* ═══ Accept Flow ═══ */}
      {receivedToken ? (
        acceptLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-[var(--pink-primary)]" />
          </div>
        ) : acceptError ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Link href="/buddy" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-lg font-bold text-[var(--text-primary)]">接受邀请</h1>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 text-center space-y-3">
              <p className="text-4xl">😢</p>
              <p className="text-[var(--text-secondary)]">{acceptError}</p>
              <Link href="/buddy" className="inline-block text-sm text-[var(--pink-primary)] hover:underline">
                返回搭子广场
              </Link>
            </div>
          </div>
        ) : invite ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Link href="/buddy" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-lg font-bold text-[var(--text-primary)]">接受学习搭子邀请</h1>
            </div>

            {/* Inviter card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-4">
              <div className="text-center">
                <p className="text-5xl mb-2">🐰</p>
                <p className="text-xl font-bold text-[var(--text-primary)]">{inviterName}</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">邀请你一起学韩语</p>
              </div>

              <div className="bg-[var(--bg-input)] rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[var(--text-muted)] w-16 shrink-0">目标</span>
                  <span className="text-[var(--text-primary)] font-medium">{invite.learningGoal}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[var(--text-muted)] w-16 shrink-0">水平</span>
                  <span className="text-[var(--text-primary)] font-medium">{invite.level}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[var(--text-muted)] w-16 shrink-0">每天</span>
                  <span className="text-[var(--text-primary)] font-medium">{invite.dailyMinutes}</span>
                </div>
                {invite.intro && (
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-[var(--text-muted)] w-16 shrink-0">介绍</span>
                    <span className="text-[var(--text-primary)]">&ldquo;{invite.intro}&rdquo;</span>
                  </div>
                )}
              </div>

              <button onClick={handleAccept} disabled={accepting}
                className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-xl font-medium text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {accepting ? (
                  <><Loader2 size={18} className="animate-spin" /> 接受中...</>
                ) : (
                  <><UserPlus size={18} /> 接受邀请，成为搭子</>
                )}
              </button>
            </div>
          </div>
        ) : null
      ) : (
        /* ═══ Create Flow ═══ */
        <>
          <div className="flex items-center gap-3">
            <Link href="/buddy" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-lg font-bold text-[var(--text-primary)]">发起学习搭子</h1>
          </div>

          {!token ? (
            <div className="space-y-4">
              {/* Goal */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-2">学习目标</p>
                <div className="flex flex-wrap gap-2">
                  {GOALS.map((g) => (
                    <button key={g} onClick={() => setGoal(g)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        goal === g ? 'bg-[var(--pink-primary)] text-white' : 'bg-[var(--bg-input)] text-[var(--text-secondary)]'
                      }`}
                    >{g}</button>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-2">当前水平</p>
                <div className="flex flex-wrap gap-2">
                  {LEVELS.map((l) => (
                    <button key={l} onClick={() => setLevel(l)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        level === l ? 'bg-[var(--purple-soft)] text-white' : 'bg-[var(--bg-input)] text-[var(--text-secondary)]'
                      }`}
                    >{l}</button>
                  ))}
                </div>
              </div>

              {/* Daily time */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-2">每天学习时间</p>
                <div className="flex flex-wrap gap-2">
                  {DAILY_TIMES.map((t) => (
                    <button key={t} onClick={() => setDaily(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        daily === t ? 'bg-[var(--mint-soft)] text-white' : 'bg-[var(--bg-input)] text-[var(--text-secondary)]'
                      }`}
                    >{t}</button>
                  ))}
                </div>
              </div>

              {/* Intro */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-2">一句话介绍（选填，最多30字）</p>
                <input
                  type="text" value={intro} onChange={(e) => setIntro(e.target.value.slice(0, 30))}
                  placeholder="比如：想找个一起备考TOPIK的搭子"
                  className="w-full bg-[var(--bg-input)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:border-[var(--pink-primary)]/50 border border-[var(--border-color)]"
                />
              </div>

              <button onClick={handleCreate}
                className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-xl font-medium text-sm hover:opacity-90"
              >生成邀请卡片</button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Canvas preview */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3">
                <canvas ref={canvasRef} className="w-full rounded-lg" style={{ aspectRatio: '1' }} />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--pink-primary)] text-white rounded-xl font-medium text-sm hover:opacity-90"
                ><Download size={18} /> 保存图片</button>
                <button onClick={handleCopy}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl font-medium text-sm text-[var(--text-primary)]"
                >
                  {copied ? <Check size={18} className="text-[var(--mint-soft)]" /> : <Copy size={18} />}
                  {copied ? '已复制' : '复制链接'}
                </button>
              </div>

              <Link href="/buddy"
                className="block text-center text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >返回搭子广场</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function BuddyInvitePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-[var(--pink-primary)]" />
      </div>
    }>
      <BuddyInviteContent />
    </Suspense>
  );
}
