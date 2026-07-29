'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { CampaignConfigDTO, InviteFraudResponse } from '@/types/admin';

function fmtDate(ts: number): string {
  if (!ts) return '-';
  const d = new Date(ts + 8 * 3600000);
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
}

// ── 发货审核 ──

interface ShipRow {
  id: string; userId: string; username: string; nickname: string;
  threshold: number; status: string; recipient: string; phone: string;
  address: string; trackingNo: string; createdAt: number;
}

const SHIP_STATUS_LABEL: Record<string, string> = {
  pending: '待审核', approved: '已通过', shipped: '已发货', done: '已签收', rejected: '已拒绝',
};
const SHIP_STATUS_NEXT: Record<string, string> = {
  pending: 'approved', approved: 'shipped', shipped: 'done', done: 'pending', rejected: 'pending',
};

function ShipmentsTab() {
  const [rows, setRows] = useState<ShipRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | string>('all');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
      const res = await fetch(`/api/admin/invite/shipments${qs}`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setRows(json.shipments);
    } catch { setRows([]); } finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  const postUpdate = async (id: string, body: Record<string, unknown>) => {
    try {
      const res = await fetch('/api/admin/invite/shipments', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...body }),
      });
      if (!res.ok) { alert('更新失败，请重试'); load(); }
    } catch { alert('网络错误，更新未保存'); load(); }
  };

  const cycleStatus = async (r: ShipRow) => {
    const next = SHIP_STATUS_NEXT[r.status] ?? 'pending';
    // done/rejected 再点会回退到待审核，属破坏已完成记录，加确认
    if ((r.status === 'done' || r.status === 'rejected') && next === 'pending') {
      if (!confirm(`确认将「${SHIP_STATUS_LABEL[r.status]}」退回「待审核」？`)) return;
    }
    setRows((prev) => prev.map((x) => (x.id === r.id ? { ...x, status: next } : x)));
    postUpdate(r.id, { status: next });
  };

  const setRejected = async (r: ShipRow) => {
    if (!confirm(`确认拒绝 ${r.nickname || r.username} 的礼盒申请？`)) return;
    setRows((prev) => prev.map((x) => (x.id === r.id ? { ...x, status: 'rejected' } : x)));
    postUpdate(r.id, { status: 'rejected' });
  };

  const saveTracking = async (r: ShipRow, trackingNo: string) => {
    if (trackingNo === r.trackingNo) return;
    setRows((prev) => prev.map((x) => (x.id === r.id ? { ...x, trackingNo } : x)));
    postUpdate(r.id, { trackingNo });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-[var(--text-muted)]">筛选状态：</span>
        {(['all', 'pending', 'approved', 'shipped', 'done', 'rejected'] as const).map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              statusFilter === s ? 'bg-[var(--pink-primary)] text-white' : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
            }`}>
            {s === 'all' ? '全部' : SHIP_STATUS_LABEL[s]}
          </button>
        ))}
      </div>

      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        {loading ? (
          <div className="flex items-center justify-center py-16 text-[var(--text-muted)]"><Loader2 className="animate-spin" size={20} /></div>
        ) : rows.length === 0 ? (
          <div className="py-16 text-center text-sm text-[var(--text-muted)]">暂无发货记录</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg-soft)] border-b border-[var(--border-color)] text-xs text-[var(--text-muted)]">
                  <th className="text-left px-4 py-3 font-medium">用户</th>
                  <th className="text-left px-4 py-3 font-medium">档位</th>
                  <th className="text-left px-4 py-3 font-medium">收件人</th>
                  <th className="text-left px-4 py-3 font-medium">手机</th>
                  <th className="text-left px-4 py-3 font-medium">地址</th>
                  <th className="text-left px-4 py-3 font-medium">物流单号</th>
                  <th className="text-left px-4 py-3 font-medium">状态</th>
                  <th className="text-left px-4 py-3 font-medium">申请时间</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-soft)] transition-colors">
                    <td className="px-4 py-2.5">
                      <div className="text-[var(--text-primary)] font-medium">{r.nickname || r.username}</div>
                      <div className="text-[10px] text-[var(--text-muted)]">@{r.username}</div>
                    </td>
                    <td className="px-4 py-2.5 text-[var(--text-primary)]">{r.threshold === 8 ? '🎲 抽奖中奖' : '🎁 满12人'}</td>
                    <td className="px-4 py-2.5 text-[var(--text-primary)]">{r.recipient}</td>
                    <td className="px-4 py-2.5 text-[var(--text-muted)]">{r.phone}</td>
                    <td className="px-4 py-2.5 text-[var(--text-muted)] max-w-[220px]">{r.address}</td>
                    <td className="px-4 py-2.5">
                      <input defaultValue={r.trackingNo} placeholder="填单号"
                        onBlur={(e) => saveTracking(r, e.target.value.trim())}
                        className="w-28 text-xs px-2 py-1 rounded border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)]" />
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-1">
                        <button onClick={() => cycleStatus(r)}
                          className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                            r.status === 'done' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : r.status === 'shipped' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                            : r.status === 'approved' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            : r.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
                          }`} title="点击推进状态">
                          {SHIP_STATUS_LABEL[r.status] ?? r.status}
                        </button>
                        {r.status !== 'rejected' && r.status !== 'done' && (
                          <button onClick={() => setRejected(r)} className="text-[10px] text-red-400 hover:underline">拒绝</button>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-[var(--text-muted)]">{fmtDate(r.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── K因子看板 ──

interface StatsData {
  metrics: { totalInvites: number; qualified: number; convRate: number; kFactor: number; inviters: number; reached8: number; reached12: number };
  funnel: Record<string, { total: number; rate: number }>;
  dailyTrend: { date: string; qualified: number }[];
}

function StatCard({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <p className="text-sm text-[var(--text-muted)] mb-2">{label}</p>
      <p className="text-3xl font-extrabold text-[var(--text-primary)]">{value}{suffix}</p>
    </div>
  );
}

function StatsTab() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/invite/stats');
        if (!res.ok) throw new Error();
        setData(await res.json());
      } catch { setData(null); } finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-16 text-[var(--text-muted)]"><Loader2 className="animate-spin" size={20} /></div>;
  if (!data) return <div className="py-16 text-center text-sm text-[var(--text-muted)]">暂无数据</div>;

  const m = data.metrics;
  const funnelRows = [
    { label: '总邀请', ...data.funnel.invited },
    { label: '完成Day1(合格)', ...data.funnel.qualified },
    { label: '达8人档', ...data.funnel.tier8 },
    { label: '达12人档', ...data.funnel.tier12 },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard label="参与邀请人数" value={m.inviters} />
        <StatCard label="总邀请数" value={m.totalInvites} />
        <StatCard label="成功合格数" value={m.qualified} />
        <StatCard label="合格转化率" value={m.convRate} suffix="%" />
        <StatCard label="K因子(人均拉新)" value={m.kFactor} />
      </div>

      <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">邀请漏斗</h3>
        <div className="space-y-2">
          {funnelRows.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="text-xs text-[var(--text-muted)] w-32 shrink-0">{f.label}</span>
              <div className="flex-1 bg-[var(--bg-input)] rounded-full h-6 overflow-hidden">
                <div className="h-full bg-[var(--pink-primary)] rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${Math.max(f.rate, 6)}%` }}>
                  <span className="text-[10px] text-white font-semibold">{f.total}</span>
                </div>
              </div>
              <span className="text-xs text-[var(--text-muted)] w-12 text-right">{f.rate}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">近30天每日合格趋势</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data.dailyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--border-color)', fontSize: 12 }} />
            <Line type="monotone" dataKey="qualified" name="合格数" stroke="#FF8FAB" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── 活动配置 ──

function CampaignTab() {
  const [config, setConfig] = useState<CampaignConfigDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/invite/campaign');
      if (!res.ok) throw new Error();
      const json = await res.json();
      setConfig(json.config);
    } catch { setConfig(null); } finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  const update = (patch: Partial<CampaignConfigDTO>) => setConfig((c) => (c ? { ...c, ...patch } : c));
  const updateTier = (i: number, key: 'count' | 'days', val: number) =>
    setConfig((c) => c ? { ...c, tiers: c.tiers.map((t, idx) => idx === i ? { ...t, [key]: val } : t) } : c);
  const addTier = () => setConfig((c) => c ? { ...c, tiers: [...c.tiers, { count: 1, days: 7 }] } : c);
  const removeTier = (i: number) => setConfig((c) => c ? { ...c, tiers: c.tiers.filter((_, idx) => idx !== i) } : c);

  const save = async () => {
    if (!config) return;
    if (config.tiers.some((t) => t.count <= 0 || t.days <= 0)) { alert('每档 count/days 必须为正整数'); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/invite/campaign', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config }),
      });
      if (!res.ok) { const e = await res.json().catch(() => ({})); alert(`保存失败：${e.error || res.status}`); return; }
      const json = await res.json();
      setConfig(json.config);
      alert('活动配置已保存');
    } finally { setSaving(false); }
  };

  if (loading) return <div className="flex items-center justify-center py-16 text-[var(--text-muted)]"><Loader2 className="animate-spin" size={20} /></div>;
  if (!config) return <div className="py-16 text-center text-sm text-[var(--text-muted)]">加载失败</div>;

  return (
    <div className="max-w-2xl space-y-5">
      <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <label className="flex items-center justify-between gap-4 mb-5">
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">活动开关</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">关闭后前端邀请页停止发放阶梯奖励</p>
          </div>
          <button
            onClick={() => update({ enabled: !config.enabled })}
            className={`relative w-11 h-6 rounded-full transition-colors ${config.enabled ? 'bg-[var(--pink-primary)]' : 'bg-[var(--bg-input)]'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${config.enabled ? 'translate-x-5' : ''}`} />
          </button>
        </label>

        <div className="mb-4">
          <p className="text-sm font-medium text-[var(--text-primary)] mb-2">奖励阶梯（邀请 N 人 → 送 M 天会员）</p>
          <div className="space-y-2">
            {config.tiers.map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)]">邀请</span>
                <input type="number" min={1} value={t.count}
                  onChange={(e) => updateTier(i, 'count', Number(e.target.value))}
                  className="w-20 text-sm px-2 py-1 rounded border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)]" />
                <span className="text-xs text-[var(--text-muted)]">人 → 送</span>
                <input type="number" min={1} value={t.days}
                  onChange={(e) => updateTier(i, 'days', Number(e.target.value))}
                  className="w-20 text-sm px-2 py-1 rounded border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)]" />
                <span className="text-xs text-[var(--text-muted)]">天</span>
                <button onClick={() => removeTier(i)} disabled={config.tiers.length <= 1}
                  className="text-xs text-red-400 hover:underline disabled:opacity-30 ml-1">删除</button>
              </div>
            ))}
          </div>
          <button onClick={addTier} className="text-xs text-[var(--pink-primary)] hover:underline mt-2">+ 增加一档</button>
        </div>

        <label className="flex items-center gap-2 mb-1">
          <span className="text-sm text-[var(--text-primary)]">封顶天数（cap）</span>
          <input type="number" min={0} value={config.cap}
            onChange={(e) => update({ cap: Number(e.target.value) })}
            className="w-24 text-sm px-2 py-1 rounded border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)]" />
        </label>
        <p className="text-xs text-[var(--text-muted)]">累计赠送会员天数上限，0 表示不封顶</p>
      </div>

      <button onClick={save} disabled={saving}
        className="px-6 py-2 rounded-lg text-sm font-semibold text-white disabled:opacity-40 transition-colors"
        style={{ background: 'linear-gradient(135deg, #FF8FAB, #FFB8C9)' }}>
        {saving ? '保存中...' : '保存配置'}
      </button>
    </div>
  );
}

// ── 防刷监控 ──

function FraudTab() {
  const [data, setData] = useState<InviteFraudResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/invite/fraud');
        if (!res.ok) throw new Error();
        setData(await res.json());
      } catch { setData(null); } finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-16 text-[var(--text-muted)]"><Loader2 className="animate-spin" size={20} /></div>;
  if (!data) return <div className="py-16 text-center text-sm text-[var(--text-muted)]">暂无数据</div>;

  return (
    <div className="space-y-4">
      <p className="text-xs text-[var(--text-muted)]">
        以下为同一 IP 下产生 ≥ {data.threshold} 条邀请归因的聚合（邀请消费已按设备指纹去重，IP 仅打标）。请人工研判是否刷量，可在用户管理封禁或撤销奖励。
      </p>
      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        {data.groups.length === 0 ? (
          <div className="py-16 text-center text-sm text-[var(--text-muted)]">未发现可疑聚合 🎉</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--bg-soft)] border-b border-[var(--border-color)] text-xs text-[var(--text-muted)]">
                <th className="text-left px-4 py-3 font-medium">IP</th>
                <th className="text-right px-4 py-3 font-medium">邀请条数</th>
                <th className="text-right px-4 py-3 font-medium">涉及邀请人</th>
                <th className="text-right px-4 py-3 font-medium">已合格</th>
              </tr>
            </thead>
            <tbody>
              {data.groups.map((g) => (
                <tr key={g.ip} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-soft)] transition-colors">
                  <td className="px-4 py-2.5 font-mono text-[var(--text-primary)]">{g.ip}</td>
                  <td className="px-4 py-2.5 text-right text-[var(--text-primary)] font-semibold">{g.count}</td>
                  <td className="px-4 py-2.5 text-right text-[var(--text-muted)]">{g.inviters}</td>
                  <td className="px-4 py-2.5 text-right text-[var(--text-muted)]">{g.qualified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default function AdminInvitePage() {
  const [tab, setTab] = useState<'shipments' | 'stats' | 'campaign' | 'fraud'>('shipments');
  return (
    <div className="p-1 space-y-5">
      <div>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">邀请裂变</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">发货审核 · 数据看板 · 活动配置 · 防刷监控</p>
      </div>
      <div className="flex gap-1 bg-[var(--bg-input)] rounded-lg p-0.5 w-fit flex-wrap">
        {([['shipments', '发货审核'], ['stats', 'K因子看板'], ['campaign', '活动配置'], ['fraud', '防刷监控']] as const).map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
              tab === k ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] font-semibold shadow-sm' : 'text-[var(--text-muted)]'
            }`}>
            {label}
          </button>
        ))}
      </div>
      {tab === 'shipments' && <ShipmentsTab />}
      {tab === 'stats' && <StatsTab />}
      {tab === 'campaign' && <CampaignTab />}
      {tab === 'fraud' && <FraudTab />}
    </div>
  );
}
