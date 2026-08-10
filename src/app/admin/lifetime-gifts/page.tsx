'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Gift, Loader2, MapPin, Check, X } from 'lucide-react';

interface LifetimeMember { serialNumber: number; userId: string; username: string; nickname: string; userEmail: string; userPhone: string; wechat: string; shipEmail: string; recipient: string; shipPhone: string; address: string; shipStatus: string; trackingNo: string; note: string; firstPurchase: number; }
interface GiftsData { members: LifetimeMember[]; stats: { total: number; shipped: number; hasAddress: number }; peerError?: string; }

const STATUS_LABELS: Record<string, string> = { pending: '待处理', prepared: '已备货', shipped: '已发货', delivered: '已签收' };
const STATUS_COLORS: Record<string, string> = { pending: 'var(--text-muted)', prepared: 'var(--color-amber-strong)', shipped: 'var(--color-sky-strong)', delivered: 'var(--color-green-strong)' };
type TabId = 'domestic' | 'overseas';

function fmtDate(ts: number) { const d = new Date(ts); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }

export default function LifetimeGiftsPage() {
  const [tab, setTab] = useState<TabId>('domestic');
  const [data, setData] = useState<GiftsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState('');
  const [editTracking, setEditTracking] = useState('');
  const [editNote, setEditNote] = useState('');
  const [saving, setSaving] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    abortRef.current?.abort(); const ctrl = new AbortController(); abortRef.current = ctrl;
    setLoading(true); setError(''); setData(null);
    try {
      const scope = tab === 'overseas' ? '?scope=overseas' : '';
      const res = await fetch(`/api/admin/lifetime-gifts${scope}`, { signal: ctrl.signal });
      if (!res.ok) throw new Error(await res.text().catch(() => '加载失败'));
      const json: GiftsData = await res.json();
      if (!ctrl.signal.aborted) setData(json);
    } catch (e) { if (!ctrl.signal.aborted) setError(e instanceof Error ? e.message : '加载失败'); }
    finally { if (!ctrl.signal.aborted) setLoading(false); }
  }, [tab]);

  useEffect(() => { load(); return () => abortRef.current?.abort(); }, [load]);

  const startEdit = (m: LifetimeMember) => { setEditing(m.userId); setEditStatus(m.shipStatus || 'pending'); setEditTracking(m.trackingNo || ''); setEditNote(m.note || ''); };
  const cancelEdit = () => { setEditing(null); setEditStatus(''); setEditTracking(''); setEditNote(''); };
  const saveEdit = async (userId: string) => {
    setSaving(true); setError('');
    try {
      const res = await fetch('/api/admin/lifetime-gifts', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, shipStatus: editStatus, trackingNo: editTracking, note: editNote }) });
      if (!res.ok) throw new Error(await res.text().catch(() => '保存失败'));
      setEditing(null); load();
    } catch (e) { setError(e instanceof Error ? e.message : '保存失败'); }
    finally { setSaving(false); }
  };

  return (<div style={{ padding: '24px 28px', maxWidth: 1400 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
      <div><h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}><Gift size={24} /> 永久会员礼盒管理</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>创始人定制卡片 · 序号按永久会员下单时间自动分配</p></div></div>

    <div style={{ display: 'flex', gap: 0, marginBottom: 20, borderBottom: '2px solid var(--border-color)' }}>
      {(['domestic', 'overseas'] as TabId[]).map(id => (<button key={id} onClick={() => setTab(id)} style={{ padding: '10px 20px', fontSize: 14, fontWeight: tab === id ? 600 : 400, color: tab === id ? 'var(--pink-primary)' : 'var(--text-muted)', borderBottom: tab === id ? '2px solid var(--pink-primary)' : '2px solid transparent', marginBottom: -2, background: 'none', border: 'none', cursor: 'pointer' }}>{id === 'domestic' ? '🇨🇳 国内站' : '🌏 海外站'}</button>))}
      <div style={{ flex: 1 }} />
      <button onClick={load} disabled={loading} style={{ padding: '6px 12px', fontSize: 12, color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, cursor: 'pointer', alignSelf: 'center' }}>{loading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : '刷新'}</button></div>

    {error && <div style={{ padding: '12px 16px', background: '#fff0f0', borderRadius: 8, marginBottom: 16, color: '#c00', fontSize: 13 }}>{error}</div>}
    {data?.peerError && <div style={{ padding: '12px 16px', background: '#fff8e6', borderRadius: 8, marginBottom: 16, color: '#b45309', fontSize: 13 }}>海外站连接失败：{data.peerError}</div>}

    {loading && !data ? (<div style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}><Loader2 size={24} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 8px' }} />加载中...</div>) : data ? (<>
      <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        {[['永久会员总数', data.stats.total, 'var(--color-purple-strong)'], ['已填地址', data.stats.hasAddress, 'var(--color-amber-strong)'], ['已发货', data.stats.shipped, 'var(--color-green-strong)']].map(([label, value, color]) => (
          <div key={label as string} style={{ flex: 1, padding: '16px 20px', borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}><div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{label as string}</div><div style={{ fontSize: 28, fontWeight: 700, color: color as string }}>{value as number}</div></div>))}</div>

      <div style={{ borderRadius: 10, border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead><tr style={{ background: 'var(--bg-secondary)', textAlign: 'left' }}>{['序号','用户','联系方式','地址','下单时间','状态','物流单号','操作'].map(h => <th key={h} style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--text-muted)', fontSize: 12 }}>{h}</th>)}</tr></thead>
          <tbody>{data.members.length === 0 ? <tr><td colSpan={8} style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>暂无数据</td></tr> : data.members.map(m => (
            <tr key={m.userId} style={{ borderTop: '1px solid var(--border-color)' }}>
              <td style={{ padding: '10px 14px' }}><span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: '#fff', fontWeight: 700, fontSize: 13 }}>#{m.serialNumber}</span></td>
              <td style={{ padding: '10px 14px' }}><div style={{ fontWeight: 600 }}>{m.nickname || m.username}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>@{m.username}</div></td>
              <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text-secondary)', maxWidth: 180 }}>{m.recipient ? <div><MapPin size={13} style={{ display: 'inline', marginRight: 4 }} />{m.recipient}{m.shipPhone ? ` · ${m.shipPhone}` : m.userPhone ? ` · ${m.userPhone}` : ''}{m.wechat ? <div>微信: {m.wechat}</div> : null}</div> : <span style={{ color: 'var(--text-muted)' }}>未填写</span>}</td>
              <td style={{ padding: '10px 14px', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 12, color: m.address ? 'var(--text-secondary)' : 'var(--text-muted)' }}>{m.address || '未填写'}</td>
              <td style={{ padding: '10px 14px', fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{fmtDate(m.firstPurchase)}</td>
              <td style={{ padding: '10px 14px' }}>{editing === m.userId ? <select value={editStatus} onChange={e => setEditStatus(e.target.value)} style={{ padding: '4px 8px', fontSize: 12, borderRadius: 6, border: '1px solid var(--border-color)' }}>{Object.entries(STATUS_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}</select> : <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 99, fontSize: 11, fontWeight: 500, color: STATUS_COLORS[m.shipStatus] || 'var(--text-muted)', background: `${STATUS_COLORS[m.shipStatus] || 'var(--text-muted)'}18` }}>{STATUS_LABELS[m.shipStatus] || m.shipStatus}</span>}</td>
              <td style={{ padding: '10px 14px' }}>{editing === m.userId ? <input value={editTracking} onChange={e => setEditTracking(e.target.value)} placeholder="物流单号" style={{ width: 120, padding: '4px 8px', fontSize: 12, borderRadius: 6, border: '1px solid var(--border-color)' }} /> : <span style={{ fontSize: 12, color: m.trackingNo ? 'var(--text-secondary)' : 'var(--text-muted)' }}>{m.trackingNo || '-'}</span>}</td>
              <td style={{ padding: '10px 14px' }}>{editing === m.userId ? <div style={{ display: 'flex', gap: 6 }}><button onClick={() => saveEdit(m.userId)} disabled={saving} style={{ padding: '4px 10px', fontSize: 12, fontWeight: 500, color: '#fff', background: 'var(--pink-primary)', border: 'none', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><Check size={13} />保存</button><button onClick={cancelEdit} style={{ padding: '4px 10px', fontSize: 12, color: 'var(--text-secondary)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}><X size={13} />取消</button></div> : <button onClick={() => startEdit(m)} style={{ padding: '4px 12px', fontSize: 12, color: 'var(--pink-primary)', background: 'transparent', border: '1px solid var(--pink-primary)', borderRadius: 6, cursor: 'pointer' }}>编辑</button>}</td></tr>))}</tbody></table></div></>) : null}</div>);
}
