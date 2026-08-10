'use client';

import { SITE_URL } from '@/lib/seo';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import QRCode from 'qrcode';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t as tr, type Lang } from '@/lib/i18n';
import { EDITION } from '@/lib/membership-benefits';
import '../../auth/auth.css';
import './activity.css';

interface Reward { threshold: number; daysGranted: number; status: string }
interface ShipmentState { threshold: number; status: string }
interface Progress {
  code: string; qualifiedCount: number; totalDays: number; pendingDays: number; rewards: Reward[];
  lottery: 'won' | 'lost' | null;
  shipments: ShipmentState[];
}

type TierType = 'member' | 'lottery' | 'gift';
interface DisplayTier { count: number; type: TierType; label: string; reward: string }

// 8/12 人档是实体礼盒奖励，海外站发不了货 → 只保留 1/5 人会员天数档
const DISPLAY_TIERS: DisplayTier[] = EDITION === 'overseas'
  ? [
      { count: 1, type: 'member', label: 'invite.tier_1_label', reward: 'invite.tier_1_reward' },
      { count: 5, type: 'member', label: 'invite.tier_5_label', reward: 'invite.tier_5_reward' },
    ]
  : [
      { count: 1, type: 'member', label: 'invite.tier_1_label', reward: 'invite.tier_1_reward' },
      { count: 5, type: 'member', label: 'invite.tier_5_label', reward: 'invite.tier_5_reward' },
      { count: 8, type: 'lottery', label: 'invite.tier_8_label', reward: 'invite.tier_8_reward' },
      { count: 12, type: 'gift', label: 'invite.tier_12_label', reward: 'invite.tier_12_reward' },
    ];

const SHIP_STATUS_KEY: Record<string, string> = {
  pending: 'invite.ship_pending', approved: 'invite.ship_approved', shipped: 'invite.ship_shipped', done: 'invite.ship_done', rejected: 'invite.ship_rejected',
};
const MAX_COUNT = EDITION === 'overseas' ? 5 : 12;
const NODES = EDITION === 'overseas' ? [1, 5] : [1, 5, 8, 12];
const PROD_ORIGIN = `${SITE_URL}`;

export default function InviteActivityPage() {
  const { user, loading } = useAuth();
  const { lang } = useLang();
  const [data, setData] = useState<Progress | null>(null);
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);
  const [posterReady, setPosterReady] = useState(false);
  const [posterBusy, setPosterBusy] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modal, setModal] = useState<'lottery' | 'address' | null>(null);
  const [addrThreshold, setAddrThreshold] = useState<8 | 12>(8);
  const [lotteryBusy, setLotteryBusy] = useState(false);
  const [addr, setAddr] = useState({ recipient: '', phone: '', address: '' });
  const [addrBusy, setAddrBusy] = useState(false);
  const [addrErr, setAddrErr] = useState('');

  useEffect(() => {
    if (loading) return;
    if (!user) { setErr(tr('invite.err_login_first', lang)); return; }
    (async () => {
      try {
        const d = await fetch('/api/invite/progress').then((r) => r.json());
        if (d.error) { setErr(d.error); return; }
        // 从未生成过邀请码 → 补生成一次
        if (!d.code) {
          const c = await fetch('/api/invite/code').then((r) => r.json());
          if (c.code) d.code = c.code;
        }
        setData(d);
      } catch { setErr(tr('invite.err_load_failed', lang)); }
    })();
  }, [user, loading, lang]);

  const code = data?.code || '';
  const shareUrl = code ? `${PROD_ORIGIN}/invite?code=${code}` : '';
  const qualified = data?.qualifiedCount ?? 0;
  const fillPct = Math.min(qualified / MAX_COUNT, 1) * 100;
  const nextTier = DISPLAY_TIERS.find((t) => qualified < t.count);
  const remain = nextTier ? nextTier.count - qualified : 0;

  const lottery = data?.lottery ?? null;
  const ship8 = data?.shipments.find((s) => s.threshold === 8);
  const ship12 = data?.shipments.find((s) => s.threshold === 12);

  const copy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* ignore */ }
  };

  async function refreshProgress() {
    try {
      const d = await fetch('/api/invite/progress').then((r) => r.json());
      if (!d.error) setData((prev) => (prev ? { ...prev, ...d } : d));
    } catch { /* ignore */ }
  }

  async function drawLottery() {
    if (lotteryBusy) return;
    setLotteryBusy(true);
    try {
      const r = await fetch('/api/invite/lottery', { method: 'POST' }).then((x) => x.json());
      if (r.ok) { await refreshProgress(); setModal('lottery'); }
      else setErr(r.error || tr('invite.err_lottery', lang));
    } catch { setErr(tr('invite.err_lottery_retry', lang)); } finally { setLotteryBusy(false); }
  }

  function openAddress(threshold: 8 | 12) {
    setAddrThreshold(threshold);
    setAddr({ recipient: '', phone: '', address: '' });
    setAddrErr('');
    setModal('address');
  }

  async function submitAddress() {
    if (addrBusy) return;
    if (!addr.recipient.trim()) { setAddrErr(tr('invite.err_need_recipient', lang)); return; }
    if (!/^[0-9+\-\s]{6,20}$/.test(addr.phone.trim())) { setAddrErr(tr('invite.err_bad_phone', lang)); return; }
    if (addr.address.trim().length < 5) { setAddrErr(tr('invite.err_addr_short', lang)); return; }
    setAddrBusy(true);
    try {
      const r = await fetch('/api/invite/shipment', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threshold: addrThreshold, ...addr }),
      }).then((x) => x.json());
      if (r.ok) { setModal(null); await refreshProgress(); }
      else setAddrErr(r.error || tr('invite.err_submit', lang));
    } catch { setAddrErr(tr('invite.err_submit_retry', lang)); } finally { setAddrBusy(false); }
  }

  function renderTierAction(t: DisplayTier, hit: boolean) {
    const remainTxt = <span style={{ fontWeight: 700, color: 'var(--au-ink-3)', whiteSpace: 'nowrap' }}>{tr('invite.remain_people', lang, { n: Math.max(0, t.count - qualified) })}</span>;
    const badge = (txt: string) => <span style={comingBadge}>{txt}</span>;

    if (t.type === 'member') {
      return hit
        ? <span style={{ fontWeight: 700, color: 'var(--au-pink-deep)', whiteSpace: 'nowrap' }}>{tr('invite.achieved', lang)}</span>
        : remainTxt;
    }
    if (t.type === 'lottery') {
      if (!hit) return remainTxt;
      if (lottery === null) return <button onClick={drawLottery} disabled={lotteryBusy} style={miniBtn}>{lotteryBusy ? tr('invite.drawing', lang) : tr('invite.draw_now', lang)}</button>;
      if (lottery === 'lost') return badge(tr('invite.thanks_join', lang));
      // won
      if (ship8) return badge(tr(SHIP_STATUS_KEY[ship8.status] ?? '', lang) || ship8.status);
      return <button onClick={() => openAddress(8)} style={miniBtn}>{tr('invite.fill_address', lang)}</button>;
    }
    // gift (12)
    if (!hit) return remainTxt;
    if (ship12) return badge(tr(SHIP_STATUS_KEY[ship12.status] ?? '', lang) || ship12.status);
    return <button onClick={() => openAddress(12)} style={miniBtn}>{tr('invite.claim_gift', lang)}</button>;
  }

  function loadImg(src: string): Promise<HTMLImageElement | null> {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  function drawPoster(canvas: HTMLCanvasElement, tori: HTMLImageElement | null, qr: HTMLImageElement | null) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const W = 1080, H = 1080;
    canvas.width = W; canvas.height = H;

    ctx.fillStyle = '#FFFDF9';
    ctx.fillRect(0, 0, W, H);

    // 装饰点阵
    ctx.fillStyle = 'rgba(255,127,168,0.10)';
    for (let x = 30; x < W; x += 80) {
      for (let y = 30; y < H; y += 80) {
        ctx.beginPath();
        ctx.arc(x + Math.sin(y * 0.1) * 20, y + Math.cos(x * 0.1) * 20, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // 顶部描边
    ctx.fillStyle = '#FF7FA8';
    ctx.fillRect(0, 0, W, 8);

    ctx.textAlign = 'center';

    // 兔莉主形象（真图或 emoji 降级）
    if (tori) {
      ctx.drawImage(tori, W / 2 - 140, 70, 280, 280);
    } else {
      ctx.font = '200px sans-serif';
      ctx.fillText('🐰', W / 2, 300);
    }

    // 主标语
    ctx.fillStyle = '#E85F8C';
    ctx.font = 'bold 52px "Noto Serif SC", serif';
    ctx.fillText(tr('invite.poster_title', lang), W / 2, 440);

    // 副标语
    ctx.fillStyle = '#8B7E82';
    ctx.font = '30px "Noto Sans SC", sans-serif';
    ctx.fillText(tr('invite.poster_sub', lang), W / 2, 500);

    // 邀请码大字
    ctx.fillStyle = '#E85F8C';
    ctx.font = 'bold 60px "Noto Sans SC", sans-serif';
    ctx.fillText(tr('invite.poster_code', lang, { code }), W / 2, 610);

    // 二维码
    if (qr) {
      ctx.drawImage(qr, W / 2 - 120, 670, 240, 240);
    }
    ctx.fillStyle = '#8B7E82';
    ctx.font = '26px "Noto Sans SC", sans-serif';
    ctx.fillText(tr('invite.poster_scan', lang), W / 2, 950);

    // 底部域名条
    ctx.fillStyle = '#3A2F28';
    ctx.font = 'bold 30px "Noto Sans SC", sans-serif';
    ctx.fillText(SITE_URL.replace('https://', ''), W / 2, H - 40);
    ctx.fillStyle = '#FF7FA8';
    ctx.fillRect(0, H - 8, W, 8);
  }

  async function generatePoster() {
    if (!code || posterBusy) return;
    setPosterBusy(true);
    try {
      const qrDataUrl = await QRCode.toDataURL(shareUrl, {
        margin: 1, width: 240, color: { dark: '#3A2F28', light: '#FFFDF9' },
      });
      const [tori, qr] = await Promise.all([
        loadImg('/images/tori-hero-wave.webp'),
        loadImg(qrDataUrl),
      ]);
      try { await document.fonts.ready; } catch { /* ignore */ }
      const canvas = canvasRef.current;
      if (!canvas) return;
      drawPoster(canvas, tori, qr);
      setPosterReady(true);
    } catch {
      setErr(tr('invite.err_poster', lang));
    } finally {
      setPosterBusy(false);
    }
  }

  function downloadPoster() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.download = `tori-invite-${code}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
  }

  function sharePoster() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) { downloadPoster(); return; }
      const file = new File([blob], `tori-invite-${code}.png`, { type: 'image/png' });
      if (typeof navigator !== 'undefined' && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: tr('invite.share_title', lang), text: shareUrl });
          return;
        } catch { /* 用户取消或失败 → 降级 */ }
      }
      downloadPoster();
      copy();
    }, 'image/png');
  }

  return (
    <div className="auth-scope">
      <div style={{ width: '100%', minHeight: '100dvh', background: 'var(--au-bg)', color: 'var(--au-ink-1)', padding: '32px 20px', boxSizing: 'border-box' }}>
        <div className="ia-container">
          <Link href="/membership" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 14, color: 'var(--au-ink-2)', textDecoration: 'none', marginBottom: 16 }}>
            <ArrowLeft size={16} /> {tr('invite.back', lang)}
          </Link>
          {/* 头图 */}
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto' }}>
              <Image src="/images/tori-hero-wave.webp" alt="Tori" fill sizes="120px" priority style={{ objectFit: 'contain' }} />
            </div>
            <h1 style={{ fontFamily: 'var(--au-serif)', fontSize: 24, margin: '10px 0 4px' }}>{tr('invite.act_title', lang)}</h1>
            <p style={{ fontSize: 13, color: 'var(--au-ink-2)', margin: 0, lineHeight: 1.6 }}>
              {tr('invite.act_sub', lang)}
            </p>
          </div>

          {err && <p style={{ color: 'var(--au-pink-deep)', fontSize: 14, textAlign: 'center', marginTop: 20 }}>{err}</p>}

          {data && (
            <>
              {/* 爬格子进度条 */}
              <div style={{ ...card, marginTop: 20, paddingTop: 34, paddingBottom: 22 }}>
                <div style={{ position: 'relative', height: 44 }}>
                  <div style={track} />
                  <div style={{ ...trackFill, width: `${fillPct}%` }} />
                  {NODES.map((n) => {
                    const reached = qualified >= n;
                    return (
                      <div key={n} style={{ ...node, left: `${(n / MAX_COUNT) * 100}%`,
                        background: reached ? 'var(--au-pink-deep)' : 'var(--au-surface)',
                        borderColor: reached ? 'var(--au-pink-deep)' : 'var(--au-border)',
                        color: reached ? '#fff' : 'var(--au-ink-3)' }}>
                        {reached ? '✓' : n}
                      </div>
                    );
                  })}
                  <div style={{ ...toriDot, left: `${fillPct}%` }}>🐰</div>
                </div>
                <p style={{ fontSize: 13, color: 'var(--au-ink-2)', textAlign: 'center', margin: '14px 0 0' }}
                  {...(nextTier
                    ? { dangerouslySetInnerHTML: { __html: tr('invite.unlock_next', lang, { n: remain, reward: tr(nextTier.reward, lang) }) } }
                    : { children: tr('invite.all_done', lang) })}
                />

              </div>

              <div className="ia-grid">
              <div className="ia-col">
              {/* 两个统计卡 */}
              <div style={{ display: 'flex', gap: 12, margin: '16px 0' }}>
                <div style={statCard}><div style={statNum}>{qualified}</div><div style={statLbl}>{tr('invite.stat_success', lang)}</div></div>
                <div style={statCard}><div style={statNum}>{data.totalDays}</div><div style={statLbl}>{tr('invite.stat_total_days', lang)}</div></div>
              </div>

              {data.pendingDays > 0 && (
                <div style={{ ...card, background: 'var(--au-pink-soft)', fontSize: 13, color: 'var(--au-ink-2)', lineHeight: 1.6 }}
                  dangerouslySetInnerHTML={{ __html: tr('invite.pending_days', lang, { days: data.pendingDays }) }}
                />
              )}

              {/* 完整阶梯清单 */}
              <div style={{ ...card, marginTop: 16 }}>
                {DISPLAY_TIERS.map((t) => {
                  const hit = qualified >= t.count;
                  return (
                    <div key={t.count} style={{ ...tierRow, opacity: hit || t.type !== 'member' ? 1 : 0.7 }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{tr(t.label, lang)}</div>
                        <div style={{ fontSize: 12, color: 'var(--au-ink-3)', marginTop: 2 }}>{tr(t.reward, lang)}</div>
                        {t.count === 8 && hit && (
                          <Link href="/invite/rewards" style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, color: 'var(--au-pink-deep)', marginTop: 6 }}>
                            {tr('invite.view_reward_pack', lang)} →
                          </Link>
                        )}
                      </div>
                      {renderTierAction(t, hit)}
                    </div>
                  );
                })}
              </div>
              </div>

              <div className="ia-col">
              {/* 邀请码 + 复制 */}
              <div style={{ ...card, marginTop: 16 }}>
                <div style={{ fontSize: 12, color: 'var(--au-ink-3)', marginBottom: 8 }}>{tr('invite.my_link', lang)}</div>
                <div style={{ fontFamily: 'var(--au-serif)', fontSize: 22, letterSpacing: '.08em', marginBottom: 14 }}>{code}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input readOnly value={shareUrl} style={urlInput} onFocus={(e) => e.currentTarget.select()} />
                  <button onClick={copy} style={copyBtn}>{copied ? tr('invite.copied', lang) : tr('invite.copy', lang)}</button>
                </div>
              </div>

              {/* 海报操作区。canvas 始终挂载（display 切换），避免重挂丢失已绘内容 */}
              <div style={{ marginTop: 16 }}>
                {!posterReady && (
                  <button onClick={generatePoster} disabled={posterBusy} style={{ ...primaryBtn, opacity: posterBusy ? 0.6 : 1 }}>
                    {posterBusy ? tr('invite.poster_generating', lang) : tr('invite.poster_generate', lang)}
                  </button>
                )}
                <div style={{ ...card, textAlign: 'center', display: posterReady ? 'block' : 'none' }}>
                  <canvas ref={canvasRef} style={{ width: '100%', maxWidth: 320, borderRadius: 12, boxShadow: '0 6px 18px rgba(58,47,40,.12)' }} />
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button onClick={downloadPoster} style={{ ...primaryBtn, flex: 1 }}>{tr('invite.poster_download', lang)}</button>
                    <button onClick={sharePoster} style={{ ...ghostBtn, flex: 1 }}>{tr('invite.poster_share', lang)}</button>
                  </div>
                </div>
              </div>
              </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <Link href="/invite/mine" style={{ fontSize: 13, color: 'var(--au-ink-3)' }}>{tr('invite.view_simple', lang)}</Link>
              </div>
            </>
          )}
        </div>

        {/* 抽奖结果弹层 */}
        {modal === 'lottery' && (
          <div style={overlay} onClick={() => setModal(null)}>
            <div style={modalCard} onClick={(e) => e.stopPropagation()}>
              {lottery === 'won' ? (
                <>
                  <div style={{ fontSize: 48 }}>🎉</div>
                  <h3 style={{ fontFamily: 'var(--au-serif)', fontSize: 22, margin: '10px 0 6px' }}>{tr('invite.won_title', lang)}</h3>
                  <p style={{ fontSize: 14, color: 'var(--au-ink-2)', margin: '0 0 18px' }}>{tr('invite.won_body', lang)}</p>
                  <button onClick={() => openAddress(8)} style={primaryBtn}>{tr('invite.won_cta', lang)}</button>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 48 }}>🎁</div>
                  <h3 style={{ fontFamily: 'var(--au-serif)', fontSize: 22, margin: '10px 0 6px' }}>{tr('invite.thanks_join', lang)}</h3>
                  <p style={{ fontSize: 14, color: 'var(--au-ink-2)', margin: '0 0 18px' }}>{tr('invite.lost_body', lang)}</p>
                  <button onClick={() => setModal(null)} style={ghostBtn}>{tr('invite.got_it', lang)}</button>
                </>
              )}
            </div>
          </div>
        )}

        {/* 收货地址表单弹层 */}
        {modal === 'address' && (
          <div style={overlay} onClick={() => setModal(null)}>
            <div style={modalCard} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontFamily: 'var(--au-serif)', fontSize: 20, margin: '0 0 4px' }}>{tr('invite.addr_title', lang)}</h3>
              <p style={{ fontSize: 12, color: 'var(--au-ink-3)', margin: '0 0 16px' }}>
                {addrThreshold === 8 ? tr('invite.addr_from_lottery', lang) : tr('invite.addr_from_12', lang)}
              </p>
              <input placeholder={tr('invite.addr_recipient', lang)} value={addr.recipient} maxLength={40}
                onChange={(e) => setAddr({ ...addr, recipient: e.target.value })} style={formInput} />
              <input placeholder={tr('invite.addr_phone', lang)} value={addr.phone} maxLength={20}
                onChange={(e) => setAddr({ ...addr, phone: e.target.value })} style={formInput} />
              <textarea placeholder={tr('invite.addr_detail', lang)} value={addr.address} maxLength={200} rows={3}
                onChange={(e) => setAddr({ ...addr, address: e.target.value })} style={{ ...formInput, resize: 'vertical' }} />
              {addrErr && <p style={{ color: 'var(--au-pink-deep)', fontSize: 13, margin: '4px 0 0' }}>{addrErr}</p>}
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <button onClick={() => setModal(null)} style={{ ...ghostBtn, flex: 1 }}>{tr('invite.cancel', lang)}</button>
                <button onClick={submitAddress} disabled={addrBusy} style={{ ...primaryBtn, flex: 1, opacity: addrBusy ? 0.6 : 1 }}>
                  {addrBusy ? tr('invite.submitting', lang) : tr('invite.submit', lang)}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const card: React.CSSProperties = {
  background: 'var(--au-surface)', border: '1px solid var(--au-border)',
  borderRadius: 16, padding: '18px 20px', boxShadow: '0 6px 18px rgba(58,47,40,.06)',
};
const miniBtn: React.CSSProperties = {
  background: 'var(--au-pink)', color: '#fff', border: 'none', borderRadius: 999,
  padding: '6px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
};
const overlay: React.CSSProperties = {
  position: 'fixed', inset: 0, background: 'rgba(58,47,40,.45)', zIndex: 1000,
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
};
const modalCard: React.CSSProperties = {
  background: 'var(--au-surface)', borderRadius: 20, padding: '26px 24px',
  maxWidth: 360, width: '100%', textAlign: 'center', boxShadow: '0 18px 48px rgba(58,47,40,.22)',
};
const formInput: React.CSSProperties = {
  width: '100%', border: '1px solid var(--au-border)', borderRadius: 10,
  padding: '10px 12px', fontSize: 14, background: 'var(--au-field)', color: 'var(--au-ink-1)',
  marginBottom: 10, textAlign: 'left',
};
const track: React.CSSProperties = {
  position: 'absolute', top: 20, left: 0, right: 0, height: 8,
  background: 'var(--au-border)', borderRadius: 999,
};
const trackFill: React.CSSProperties = {
  position: 'absolute', top: 20, left: 0, height: 8, borderRadius: 999,
  background: 'linear-gradient(90deg, var(--au-pink), var(--au-pink-deep))',
  transition: 'width .6s ease',
};
const node: React.CSSProperties = {
  position: 'absolute', top: 12, transform: 'translateX(-50%)',
  width: 24, height: 24, borderRadius: '50%', border: '2px solid',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 11, fontWeight: 700, zIndex: 2,
};
const toriDot: React.CSSProperties = {
  position: 'absolute', top: -14, transform: 'translateX(-50%)',
  fontSize: 26, transition: 'left .6s ease', zIndex: 3,
};
const statCard: React.CSSProperties = {
  flex: 1, background: 'var(--au-surface)', border: '1px solid var(--au-border)',
  borderRadius: 16, padding: '16px', textAlign: 'center', boxShadow: '0 6px 18px rgba(58,47,40,.06)',
};
const statNum: React.CSSProperties = { fontFamily: 'var(--au-serif)', fontSize: 30, color: 'var(--au-pink-deep)' };
const statLbl: React.CSSProperties = { fontSize: 12, color: 'var(--au-ink-3)', marginTop: 4 };
const tierRow: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '12px 4px', borderBottom: '1px solid var(--au-border)', fontSize: 14, gap: 12,
};
const comingBadge: React.CSSProperties = {
  fontSize: 11, fontWeight: 700, color: 'var(--au-ink-3)', background: 'var(--au-field)',
  border: '1px solid var(--au-border)', borderRadius: 999, padding: '3px 10px', whiteSpace: 'nowrap',
};
const urlInput: React.CSSProperties = {
  flex: 1, minWidth: 0, border: '1px solid var(--au-border)', borderRadius: 10,
  padding: '9px 12px', fontSize: 13, background: 'var(--au-field)', color: 'var(--au-ink-2)',
};
const copyBtn: React.CSSProperties = {
  background: 'var(--au-pink)', color: '#fff', border: 'none', borderRadius: 10,
  padding: '0 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
};
const primaryBtn: React.CSSProperties = {
  width: '100%', background: 'var(--au-pink)', color: '#fff', border: 'none', borderRadius: 12,
  padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
};
const ghostBtn: React.CSSProperties = {
  background: 'var(--au-surface)', color: 'var(--au-pink-deep)', border: '1px solid var(--au-pink)',
  borderRadius: 12, padding: '14px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
};
