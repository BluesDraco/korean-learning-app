'use client';
import { useEffect, useState, useCallback } from 'react';
import { Gift, Loader2 } from 'lucide-react';
export default function LifetimeGiftsPage() {
  const [tab, setTab] = useState('domestic');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    setLoading(true);
    try { const scope = tab === 'overseas' ? '?scope=overseas' : ''; const res = await fetch(`/api/admin/lifetime-gifts${scope}`); if (!res.ok) throw new Error('加载失败'); setData(await res.json()); } catch (e) { setData(null); } finally { setLoading(false); }
  }, [tab]);
  useEffect(() => { load(); }, [load]);
  return (<div style={{ padding: 24, maxWidth: 1400 }}>
    <h1 style={{ fontSize: 22, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}><Gift size={24} /> 永久会员礼盒管理</h1>
    <div style={{ display: 'flex', gap: 8, marginTop: 20, marginBottom: 20 }}>
      <button onClick={() => setTab('domestic')} style={{ padding: '8px 16px', background: tab === 'domestic' ? 'var(--pink-primary)' : 'var(--bg-secondary)', color: tab === 'domestic' ? '#fff' : 'var(--text-primary)', border: 'none', borderRadius: 6, cursor: 'pointer' }}>🇨🇳 国内站</button>
      <button onClick={() => setTab('overseas')} style={{ padding: '8px 16px', background: tab === 'overseas' ? 'var(--pink-primary)' : 'var(--bg-secondary)', color: tab === 'overseas' ? '#fff' : 'var(--text-primary)', border: 'none', borderRadius: 6, cursor: 'pointer' }}>🌏 海外站</button>
    </div>
    {loading ? <div style={{ textAlign: 'center', padding: 40 }}><Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} /></div> : data ? <div>
      <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
        <div style={{ flex: 1, padding: 16, borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>永久会员</div><div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-purple-strong)' }}>{data.stats.total}</div></div>
        <div style={{ flex: 1, padding: 16, borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>已填地址</div><div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-amber-strong)' }}>{data.stats.hasAddress}</div></div>
        <div style={{ flex: 1, padding: 16, borderRadius: 10, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}><div style={{ fontSize: 12, color: 'var(--text-muted)' }}>已发货</div><div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-green-strong)' }}>{data.stats.shipped}</div></div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead><tr style={{ background: 'var(--bg-secondary)' }}>{['序号','用户','联系方式','地址','状态'].map(h => <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--text-muted)' }}>{h}</th>)}</tr></thead>
        <tbody>{data.members.map((m: any) => <tr key={m.userId} style={{ borderTop: '1px solid var(--border-color)' }}><td style={{ padding: '10px 14px' }}><span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: '#fff', fontWeight: 700, fontSize: 13 }}>#{m.serialNumber}</span></td><td style={{ padding: '10px 14px' }}><div style={{ fontWeight: 600 }}>{m.nickname || m.username}</div></td><td style={{ padding: '10px 14px', fontSize: 12 }}>{m.recipient || '未填写'}{m.phone ? ` · ${m.phone}` : ''}</td><td style={{ padding: '10px 14px', fontSize: 12, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.address || '未填写'}</td><td style={{ padding: '10px 14px' }}><span style={{ padding: '2px 10px', borderRadius: 99, fontSize: 11, background: 'var(--bg-secondary)' }}>{m.shipStatus}</span></td></tr>)}</tbody></table></div> : <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>暂无数据</div>}
  </div>);
}
