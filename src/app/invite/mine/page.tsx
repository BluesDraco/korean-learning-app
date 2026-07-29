'use client';

import { SITE_URL } from '@/lib/seo';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t as tr } from '@/lib/i18n';
import '../../auth/auth.css';

interface Reward { threshold: number; daysGranted: number; status: string }
interface Progress { code: string; qualifiedCount: number; totalDays: number; pendingDays: number; rewards: Reward[] }

const TIERS = [
  { count: 1, days: 7, label: 'invite.tier_1_label' },
  { count: 5, days: 30, label: 'invite.mine_tier_5_label' },
];

export default function InviteMinePage() {
  const { user, loading } = useAuth();
  const { lang } = useLang();
  const [data, setData] = useState<Progress | null>(null);
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) { setErr(tr('invite.err_login_first', lang)); return; }
    (async () => {
      try {
        const d = await fetch('/api/invite/progress').then((r) => r.json());
        if (d.error) { setErr(d.error); return; }
        if (!d.code) {
          const c = await fetch('/api/invite/code').then((r) => r.json());
          if (c.code) d.code = c.code;
        }
        setData(d);
      } catch { setErr(tr('invite.err_load_failed', lang)); }
    })();
  }, [user, loading, lang]);

  const shareUrl = data?.code ? `${SITE_URL}/invite?code=${data.code}` : '';

  const copy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  };

  return (
    <div className="auth-scope">
      <div style={{ width: '100%', minHeight: '100dvh', background: 'var(--au-bg)', color: 'var(--au-ink-1)', padding: '36px 20px', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'var(--au-serif)', fontSize: 25, margin: '0 0 6px' }}>{tr('invite.mine_title', lang)}</h1>
          <p style={{ fontSize: 14, color: 'var(--au-ink-2)', margin: '0 0 16px', lineHeight: 1.6 }}>
            {tr('invite.mine_sub', lang)}
          </p>

          <Link href="/invite/activity" style={{
            display: 'block', textAlign: 'center', background: 'var(--au-pink)', color: '#fff',
            fontWeight: 700, fontSize: 15, padding: '12px', borderRadius: 12, textDecoration: 'none', marginBottom: 24,
          }}>
            {tr('invite.mine_view_activity', lang)}
          </Link>

          {err && <p style={{ color: 'var(--au-pink-deep)', fontSize: 14 }}>{err}</p>}

          {data && (
            <>
              <div style={card}>
                <div style={{ fontSize: 12, color: 'var(--au-ink-3)', marginBottom: 8 }}>{tr('invite.my_link', lang)}</div>
                <div style={{ fontFamily: 'var(--au-serif)', fontSize: 22, letterSpacing: '.08em', marginBottom: 14 }}>{data.code}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input readOnly value={shareUrl} style={urlInput} onFocus={(e) => e.currentTarget.select()} />
                  <button onClick={copy} style={copyBtn}>{copied ? tr('invite.copied', lang) : tr('invite.copy', lang)}</button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, margin: '16px 0' }}>
                <div style={statCard}>
                  <div style={statNum}>{data.qualifiedCount}</div>
                  <div style={statLbl}>{tr('invite.stat_success', lang)}</div>
                </div>
                <div style={statCard}>
                  <div style={statNum}>{data.totalDays}</div>
                  <div style={statLbl}>{tr('invite.stat_total_days', lang)}</div>
                </div>
              </div>

              {data.pendingDays > 0 && (
                <div style={{ ...card, background: 'var(--au-pink-soft)', fontSize: 13, color: 'var(--au-ink-2)', lineHeight: 1.6 }}
                  dangerouslySetInnerHTML={{ __html: tr('invite.pending_days', lang, { days: `<b style="color:var(--au-pink-deep)">${data.pendingDays}</b>` }) }}
                />
              )}

              <div style={{ marginTop: 20 }}>
                {TIERS.map((t) => {
                  const reached = data.qualifiedCount >= t.count;
                  return (
                    <div key={t.count} style={{ ...tierRow, opacity: reached ? 1 : 0.6 }}>
                      <span>{tr(t.label, lang)}</span>
                      <span style={{ fontWeight: 700, color: reached ? 'var(--au-pink-deep)' : 'var(--au-ink-3)' }}>
                        {reached ? '✓ ' : ''}{tr('invite.days_member', lang, { days: t.days })}
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const card: React.CSSProperties = {
  background: 'var(--au-surface)', border: '1px solid var(--au-border)',
  borderRadius: 16, padding: '18px 20px', boxShadow: '0 6px 18px rgba(58,47,40,.06)',
};
const urlInput: React.CSSProperties = {
  flex: 1, minWidth: 0, border: '1px solid var(--au-border)', borderRadius: 10,
  padding: '9px 12px', fontSize: 13, background: 'var(--au-field)', color: 'var(--au-ink-2)',
};
const copyBtn: React.CSSProperties = {
  background: 'var(--au-pink)', color: '#fff', border: 'none', borderRadius: 10,
  padding: '0 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
};
const statCard: React.CSSProperties = {
  flex: 1, background: 'var(--au-surface)', border: '1px solid var(--au-border)',
  borderRadius: 16, padding: '16px', textAlign: 'center', boxShadow: '0 6px 18px rgba(58,47,40,.06)',
};
const statNum: React.CSSProperties = { fontFamily: 'var(--au-serif)', fontSize: 30, color: 'var(--au-pink-deep)' };
const statLbl: React.CSSProperties = { fontSize: 12, color: 'var(--au-ink-3)', marginTop: 4 };
const tierRow: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '12px 4px', borderBottom: '1px solid var(--au-border)', fontSize: 14,
};
