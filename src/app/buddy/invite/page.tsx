'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Download, Loader2, UserPlus } from 'lucide-react';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/gamification';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';
import type { BuddyInvite } from '@/types';

// 选项值直接存 DB（保持中文标识），显示时经 OPT_LABEL 映射到 i18n key 做双语
const GOALS = ['TOPIK备考', '日常口语', '追星追剧', '旅行备用', '其他'];
const LEVELS = ['零基础', '初级', '中级', '高级'];
const DAILY_TIMES = ['15分钟', '30分钟', '1小时', '1.5小时', '2小时以上'];

const OPT_LABEL: Record<string, string> = {
  'TOPIK备考': 'buddy.goal_topik', '日常口语': 'buddy.goal_speaking', '追星追剧': 'buddy.goal_fandom', '旅行备用': 'buddy.goal_travel', '其他': 'buddy.goal_other',
  '零基础': 'buddy.lv_zero', '初级': 'buddy.lv_beginner', '中级': 'buddy.lv_inter', '高级': 'buddy.lv_advanced',
  '15分钟': 'buddy.time_15', '30分钟': 'buddy.time_30', '1小时': 'buddy.time_60', '1.5小时': 'buddy.time_90', '2小时以上': 'buddy.time_120plus',
};
const optLabel = (v: string, lang: Lang) => (OPT_LABEL[v] ? t(OPT_LABEL[v], lang) : v);

function BuddyInviteContent() {
  const router = useRouter();
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const receivedToken = searchParams.get('token');

  // ── Accept flow state ──
  type AcceptInvite = { learningGoal: string; level: string; dailyMinutes: string; intro: string };
  const [acceptLoading, setAcceptLoading] = useState(!!receivedToken);
  const [invite, setInvite] = useState<AcceptInvite | null>(null);
  const [inviterName, setInviterName] = useState('');
  const [acceptError, setAcceptError] = useState('');
  const [accepting, setAccepting] = useState(false);

  // ── Create flow state ──
  const [goal, setGoal] = useState(GOALS[0]);
  const [level, setLevel] = useState(LEVELS[0]);
  const [daily, setDaily] = useState(DAILY_TIMES[1]);
  const [intro, setIntro] = useState('');
  const [token, setToken] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardDataRef = useRef<{ nickname: string; goal: string; level: string; daily: string; intro: string } | null>(null);

  // ── Load invite for accept flow（走服务端按 token 查，接受方本地库没有邀请人的邀请）──
  useEffect(() => {
    if (!receivedToken) return;
    (async () => {
      try {
        const res = await fetch(`/api/buddy/invites/${encodeURIComponent(receivedToken)}`);
        if (res.status === 404) { setAcceptError(t('buddy.inv_not_exist', lang)); setAcceptLoading(false); return; }
        if (res.status === 410) { setAcceptError(t('buddy.inv_expired', lang)); setAcceptLoading(false); return; }
        if (!res.ok) { setAcceptError(t('buddy.inv_load_failed', lang)); setAcceptLoading(false); return; }
        const data = await res.json();
        setInvite({ learningGoal: data.learningGoal, level: data.level, dailyMinutes: data.dailyMinutes, intro: data.intro });
        setInviterName(data.inviterName || '학습자');
        setAcceptLoading(false);
      } catch {
        setAcceptError(t('buddy.inv_load_failed', lang));
        setAcceptLoading(false);
      }
    })();
  }, [receivedToken, lang]);

  // ── Accept handler ──
  const handleAccept = async () => {
    if (!invite) return;
    setAccepting(true);
    try {
      const res = await fetch('/api/buddy/invites/consume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inviteToken: receivedToken }),
      });
      const data = await res.json();
      if (res.status === 401) { setAcceptError(t('buddy.login_first', lang)); setAccepting(false); return; }
      if (!res.ok) { setAcceptError(data.error || t('buddy.accept_failed', lang)); setAccepting(false); return; }

      // consume 返回服务端生成的 relationId，直接跳转（/buddy/[id] 读的是 relationId）
      router.push(`/buddy/${data.relationId || ''}`);
    } catch (e) {
      setAcceptError(e instanceof Error ? e.message : t('buddy.accept_failed', lang));
      setAccepting(false);
    }
  };

  const handleCreate = async () => {
    if (creating) return;
    setCreateError('');
    setCreating(true);
    try {
      const profile = await getProfile();
      if (!profile) { setCreateError(t('buddy.login_first', lang)); setCreating(false); return; }

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
      // 必须确认落服务端成功再给分享链接，否则对方点开会「邀请不存在」
      await db.buddyInvites.add(invite);

      cardDataRef.current = { nickname: profile.nickname || '학습자', goal, level, daily, intro };
      setToken(inviteToken);
    } catch {
      setCreateError(t('buddy.inv_create_failed', lang));
    } finally {
      setCreating(false);
    }
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
      ctx.fillText(t('buddy.card_title', lang), W / 2, 300);

      ctx.font = '32px "Noto Sans SC", sans-serif';
      ctx.fillText(t('buddy.card_wants', lang, { name: data.nickname }), W / 2, 380);

      ctx.fillStyle = '#8B7E82';
      ctx.font = '28px "Noto Sans SC", sans-serif';
      const details = [
        `🎯 ${t('buddy.card_goal', lang)}${optLabel(data.goal, lang)}`,
        `📊 ${t('buddy.card_level', lang)}${optLabel(data.level, lang)}`,
        `⏰ ${t('buddy.card_daily', lang)}${optLabel(data.daily, lang)}`,
      ];
      details.forEach((d, i) => ctx.fillText(d, W / 2, 460 + i * 50));
      if (data.intro) ctx.fillText(`💬 "${data.intro}"`, W / 2, 460 + details.length * 50);

      ctx.fillStyle = '#C4B5B9';
      ctx.font = '22px "Noto Sans SC", sans-serif';
      ctx.fillText(t('buddy.card_scan', lang), W / 2, H - 120);
      ctx.font = '18px "Noto Sans SC", sans-serif';
      ctx.fillText('korean-learning.app', W / 2, H - 70);
    });
    return () => cancelAnimationFrame(raf);
  }, [token, lang]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/buddy/invite?token=${token}`);
    } catch {
      alert(t('buddy.copy_failed_alert', lang));
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = 'tori-buddy-invite.webp';
    a.href = canvas.toDataURL('image/png');
    a.click();
  };

  return (
    <div className="py-4 max-w-lg md:max-w-none mx-auto space-y-4">
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
              <h1 className="text-lg font-bold text-[var(--text-primary)]">{t('buddy.accept_invite', lang)}</h1>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 text-center space-y-3">
              <p className="text-4xl">😢</p>
              <p className="text-[var(--text-secondary)]">{acceptError}</p>
              <Link href="/buddy" className="inline-block text-sm text-[var(--pink-primary)] hover:underline">
                {t('buddy.back_square', lang)}
              </Link>
            </div>
          </div>
        ) : invite ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Link href="/buddy" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <ArrowLeft size={20} />
              </Link>
              <h1 className="text-lg font-bold text-[var(--text-primary)]">{t('buddy.accept_title', lang)}</h1>
            </div>

            {/* Inviter card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-4">
              <div className="text-center">
                <p className="text-5xl mb-2">🐰</p>
                <p className="text-xl font-bold text-[var(--text-primary)]">{inviterName}</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">{t('buddy.invites_you', lang)}</p>
              </div>

              <div className="bg-[var(--bg-input)] rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[var(--text-muted)] w-16 shrink-0">{t('buddy.field_goal', lang)}</span>
                  <span className="text-[var(--text-primary)] font-medium">{optLabel(invite.learningGoal, lang)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[var(--text-muted)] w-16 shrink-0">{t('buddy.field_level', lang)}</span>
                  <span className="text-[var(--text-primary)] font-medium">{optLabel(invite.level, lang)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[var(--text-muted)] w-16 shrink-0">{t('buddy.field_daily', lang)}</span>
                  <span className="text-[var(--text-primary)] font-medium">{optLabel(String(invite.dailyMinutes), lang)}</span>
                </div>
                {invite.intro && (
                  <div className="flex items-start gap-2 text-sm">
                    <span className="text-[var(--text-muted)] w-16 shrink-0">{t('buddy.field_intro', lang)}</span>
                    <span className="text-[var(--text-primary)]">&ldquo;{invite.intro}&rdquo;</span>
                  </div>
                )}
              </div>

              <button onClick={handleAccept} disabled={accepting}
                className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-xl font-medium text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {accepting ? (
                  <><Loader2 size={18} className="animate-spin" /> {t('buddy.accepting', lang)}</>
                ) : (
                  <><UserPlus size={18} /> {t('buddy.accept_become', lang)}</>
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
            <h1 className="text-lg font-bold text-[var(--text-primary)]">{t('buddy.create_title', lang)}</h1>
          </div>

          {!token ? (
            <div className="space-y-4">
              {/* Goal */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-2">{t('buddy.form_goal', lang)}</p>
                <div className="flex flex-wrap gap-2">
                  {GOALS.map((g) => (
                    <button key={g} onClick={() => setGoal(g)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        goal === g ? 'bg-[var(--pink-primary)] text-white' : 'bg-[var(--bg-input)] text-[var(--text-secondary)]'
                      }`}
                    >{optLabel(g, lang)}</button>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-2">{t('buddy.form_level', lang)}</p>
                <div className="flex flex-wrap gap-2">
                  {LEVELS.map((l) => (
                    <button key={l} onClick={() => setLevel(l)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        level === l ? 'bg-[var(--purple-soft)] text-white' : 'bg-[var(--bg-input)] text-[var(--text-secondary)]'
                      }`}
                    >{optLabel(l, lang)}</button>
                  ))}
                </div>
              </div>

              {/* Daily time */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-2">{t('buddy.form_daily', lang)}</p>
                <div className="flex flex-wrap gap-2">
                  {DAILY_TIMES.map((dt) => (
                    <button key={dt} onClick={() => setDaily(dt)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        daily === dt ? 'bg-[var(--mint-soft)] text-white' : 'bg-[var(--bg-input)] text-[var(--text-secondary)]'
                      }`}
                    >{optLabel(dt, lang)}</button>
                  ))}
                </div>
              </div>

              {/* Intro */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-2">{t('buddy.form_intro', lang)}</p>
                <input
                  type="text" value={intro} onChange={(e) => setIntro(e.target.value.slice(0, 30))}
                  placeholder={t('buddy.form_intro_ph', lang)}
                  className="w-full bg-[var(--bg-input)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:border-[var(--pink-primary)]/50 border border-[var(--border-color)]"
                />
              </div>

              {createError && (
                <p className="text-center text-sm text-[var(--pink-primary)]">{createError}</p>
              )}
              <button onClick={handleCreate} disabled={creating}
                className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-xl font-medium text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {creating ? (<><Loader2 size={18} className="animate-spin" /> {t('buddy.generating', lang)}</>) : t('buddy.gen_card', lang)}
              </button>
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
                ><Download size={18} /> {t('buddy.save_image', lang)}</button>
                <button onClick={handleCopy}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl font-medium text-sm text-[var(--text-primary)]"
                >
                  {copied ? <Check size={18} className="text-[var(--mint-soft)]" /> : <Copy size={18} />}
                  {copied ? t('buddy.copied', lang) : t('buddy.copy_link', lang)}
                </button>
              </div>

              <Link href="/buddy"
                className="block text-center text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >{t('buddy.back_square', lang)}</Link>
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
