'use client';

import { useEffect, useState, useCallback } from 'react';
import { Crown, Save, RotateCcw, Loader2, Check, Infinity as InfinityIcon } from 'lucide-react';
import {
  CURRENCY_SYMBOL,
  type Tier, type BenefitGroup, type BenefitMatrix, type BenefitValue,
  type TierPricing,
} from '@/lib/membership-benefits';

interface BenefitsResponse {
  [k: string]: unknown;
  groups: BenefitGroup[];
  tiers: Tier[];
  tierLabels: Record<Tier, string>;
  pricing: Record<Tier, TierPricing>;
  matrix: BenefitMatrix;
}

type TabId = 'benefits' | 'members' | 'lifetime';

const TIER_ACCENT: Record<Tier, string> = {
  free: 'var(--text-muted)',
  monthly: 'var(--pink-primary)',
  yearly: 'var(--color-gold-strong)',
  lifetime: 'var(--color-purple-strong)',
};

function priceLabel(p: TierPricing): string {
  if (p.price == null) return '免费';
  const full = (p.price / 100).toFixed(p.price % 100 === 0 ? 0 : 2);
  if (p.promo != null) {
    const promo = (p.promo / 100).toFixed(p.promo % 100 === 0 ? 0 : 2);
    return `${CURRENCY_SYMBOL}${promo} 首购 / ${CURRENCY_SYMBOL}${full}`;
  }
  return `${CURRENCY_SYMBOL}${full}`;
}

export default function MembershipAdminPage() {
  const [tab, setTab] = useState<TabId>('benefits');
  const [data, setData] = useState<BenefitsResponse | null>(null);
  const [matrix, setMatrix] = useState<BenefitMatrix>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/membership-benefits');
      if (!res.ok) throw new Error('load failed');
      const json: BenefitsResponse = await res.json();
      setData(json);
      setMatrix(structuredClone(json.matrix));
      setDirty(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const setCell = (benefitId: string, tier: Tier, value: BenefitValue) => {
    setMatrix((prev) => ({
      ...prev,
      [benefitId]: { ...prev[benefitId], [tier]: value },
    }));
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    setSaveError(false);
    try {
      const res = await fetch('/api/admin/membership-benefits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matrix }),
      });
      if (!res.ok) throw new Error('save failed');
      const json = await res.json();
      setMatrix(structuredClone(json.matrix));
      setDirty(false);
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2000);
    } catch {
      setSaveError(true);
    } finally {
      setSaving(false);
    }
  };

  const resetChanges = () => {
    if (data) setMatrix(structuredClone(data.matrix));
    setDirty(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Crown size={28} className="text-[var(--pink-primary)]" />
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">会员管理</h1>
          <p className="text-sm text-[var(--text-muted)]">权益矩阵 · 会员名单 · 永久档履约</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[var(--bg-input)] rounded-lg p-1 w-fit">
        {([
          { id: 'benefits', label: '权益总览' },
          { id: 'members', label: '会员名单' },
          { id: 'lifetime', label: '永久档履约' },
        ] as { id: TabId; label: string }[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
              tab === t.id
                ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] font-semibold shadow-sm'
                : 'text-[var(--text-muted)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'benefits' && (
        <BenefitsTab
          loading={loading}
          data={data}
          matrix={matrix}
          setCell={setCell}
          dirty={dirty}
          saving={saving}
          savedFlash={savedFlash}
          saveError={saveError}
          onSave={save}
          onReset={resetChanges}
        />
      )}

      {tab === 'members' && <MembersTab tierLabels={data?.tierLabels} />}
      {tab === 'lifetime' && <LifetimeTab />}
    </div>
  );
}

function BenefitsTab({
  loading, data, matrix, setCell, dirty, saving, savedFlash, saveError, onSave, onReset,
}: {
  loading: boolean;
  data: BenefitsResponse | null;
  matrix: BenefitMatrix;
  setCell: (benefitId: string, tier: Tier, value: BenefitValue) => void;
  dirty: boolean;
  saving: boolean;
  savedFlash: boolean;
  saveError: boolean;
  onSave: () => void;
  onReset: () => void;
}) {
  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-20 text-[var(--text-muted)]">
        <Loader2 className="animate-spin" size={20} />
      </div>
    );
  }

  const { groups, tiers, tierLabels, pricing } = data;

  return (
    <div className="space-y-4">
      {/* Save bar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-muted)]">
          改动实时生效于全站权益解锁。<span className="text-[var(--text-primary)]">值可编辑</span>，行结构固定。
        </p>
        <div className="flex items-center gap-2">
          {dirty && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <RotateCcw size={14} /> 撤销
            </button>
          )}
          <button
            onClick={onSave}
            disabled={!dirty || saving}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-[var(--pink-primary)] text-white disabled:opacity-40 transition-opacity"
          >
            {saving ? <Loader2 size={14} className="animate-spin" />
              : savedFlash ? <Check size={14} /> : <Save size={14} />}
            {savedFlash ? '已保存' : '保存'}
          </button>
        </div>
      </div>

      {saveError && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 dark:bg-red-950/30 dark:border-red-900 dark:text-red-400">
          保存失败，请检查网络后重试。改动仍保留，可再次点击保存。
        </div>
      )}

      {/* Matrix table */}
      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[var(--bg-soft)] border-b border-[var(--border-color)]">
                <th className="text-left px-4 py-3 text-xs text-[var(--text-muted)] font-medium sticky left-0 bg-[var(--bg-soft)] min-w-[180px]">
                  权益
                </th>
                {tiers.map((t) => (
                  <th key={t} className="px-4 py-3 min-w-[130px]">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-sm font-bold" style={{ color: TIER_ACCENT[t] }}>
                        {tierLabels[t]}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] font-normal">
                        {priceLabel(pricing[t])}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <FragmentGroup
                  key={group.id}
                  group={group}
                  tiers={tiers}
                  matrix={matrix}
                  setCell={setCell}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FragmentGroup({
  group, tiers, matrix, setCell,
}: {
  group: BenefitGroup;
  tiers: Tier[];
  matrix: BenefitMatrix;
  setCell: (benefitId: string, tier: Tier, value: BenefitValue) => void;
}) {
  return (
    <>
      <tr className="bg-[var(--bg-soft)]/50">
        <td colSpan={tiers.length + 1} className="px-4 py-2 text-xs font-semibold text-[var(--pink-primary)]">
          {group.label}
        </td>
      </tr>
      {group.rows.map((row) => (
        <tr key={row.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-soft)] transition-colors">
          <td className="px-4 py-2.5 sticky left-0 bg-[var(--bg-card)]">
            <div className="text-[var(--text-primary)]">{row.label}</div>
            {row.note && <div className="text-[10px] text-[var(--text-muted)]">{row.note}</div>}
          </td>
          {tiers.map((t) => (
            <td key={t} className="px-3 py-2 text-center">
              <BenefitCell
                type={row.type}
                unit={row.unit}
                value={matrix[row.id]?.[t]}
                onChange={(v) => setCell(row.id, t, v)}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

function BenefitCell({
  type, unit, value, onChange,
}: {
  type: BenefitGroup['rows'][number]['type'];
  unit?: string;
  value: BenefitValue | undefined;
  onChange: (v: BenefitValue) => void;
}) {
  if (type === 'bool') {
    const on = value === true;
    return (
      <button
        onClick={() => onChange(!on)}
        className={`w-10 h-6 rounded-full relative transition-colors ${on ? 'bg-[var(--pink-primary)]' : 'bg-[var(--border-color)]'}`}
        aria-label={on ? '开启' : '关闭'}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${on ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </button>
    );
  }

  if (type === 'quota') {
    const num = typeof value === 'number' ? value : 0;
    const unlimited = num === -1;
    return (
      <div className="flex items-center justify-center gap-1">
        {unlimited ? (
          <button
            onClick={() => onChange(0)}
            className="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] font-semibold"
            title="点击取消无限"
          >
            <InfinityIcon size={14} /> 无限
          </button>
        ) : (
          <>
            <input
              type="number"
              value={num}
              min={0}
              onChange={(e) => onChange(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-16 px-2 py-1 text-xs text-center rounded-md border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:border-[var(--pink-primary)] focus:outline-none"
            />
            <span className="text-[10px] text-[var(--text-muted)]">{unit}</span>
            <button
              onClick={() => onChange(-1)}
              className="text-[var(--text-muted)] hover:text-[var(--pink-primary)]"
              title="设为无限"
            >
              <InfinityIcon size={13} />
            </button>
          </>
        )}
      </div>
    );
  }

  // content / text
  return (
    <input
      type="text"
      value={typeof value === 'string' ? value : ''}
      placeholder={type === 'text' ? '—' : ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-[120px] px-2 py-1 text-xs text-center rounded-md border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:border-[var(--pink-primary)] focus:outline-none"
    />
  );
}

// ── 会员名单 tab ──

interface MemberRow {
  [k: string]: unknown;
  id: string;
  username: string;
  nickname: string;
  email: string;
  tier: Tier;
  effectiveTier: Tier;
  expiry: number | null;
  createdAt: number;
}

function fmtDate(ts: number | null): string {
  if (!ts) return '—';
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function MembersTab({ tierLabels }: { tierLabels?: Record<Tier, string> }) {
  const labels = tierLabels ?? { free: '免费', monthly: '月度', yearly: '年度', lifetime: '永久' };
  const [counts, setCounts] = useState<Record<Tier, number> | null>(null);
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | Tier>('all');
  const [expiring, setExpiring] = useState(false);
  const [granting, setGranting] = useState<MemberRow | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const PAGE_SIZE = 20;

  // 搜索防抖:输入停 300ms 才真正查询
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  // 搜索/筛选变化时回到第一页
  useEffect(() => { setPage(1); }, [search, tierFilter, expiring]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (search) qs.set('search', search);
      if (tierFilter !== 'all') qs.set('tier', tierFilter);
      if (expiring) qs.set('expiring', '1');
      qs.set('page', String(page));
      qs.set('pageSize', String(PAGE_SIZE));
      const res = await fetch(`/api/admin/members?${qs.toString()}`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setCounts(json.counts);
      setMembers(json.members);
      setTotal(json.total ?? 0);
    } catch {
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, [search, tierFilter, expiring, page]);

  useEffect(() => { load(); }, [load]);

  return (
    <div className="space-y-4">
      {/* 各档人数 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(['free', 'monthly', 'yearly', 'lifetime'] as Tier[]).map((t) => (
          <button
            key={t}
            onClick={() => setTierFilter(tierFilter === t ? 'all' : t)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              tierFilter === t ? 'border-[var(--pink-primary)] bg-[var(--bg-soft)]' : 'border-[var(--border-color)] bg-[var(--bg-card)]'
            }`}
          >
            <div className="text-xs text-[var(--text-muted)]">{labels[t]}会员</div>
            <div className="text-2xl font-bold" style={{ color: TIER_ACCENT[t] }}>
              {counts ? counts[t] : '—'}
            </div>
          </button>
        ))}
      </div>

      {/* 搜索 */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="搜索用户名 / 昵称 / 邮箱"
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:border-[var(--pink-primary)] focus:outline-none"
        />
        <button
          onClick={() => setExpiring((v) => !v)}
          className={`text-xs px-3 py-2 rounded-lg border transition-colors whitespace-nowrap ${
            expiring ? 'border-[var(--pink-primary)] text-[var(--pink-primary)] bg-[var(--bg-soft)]' : 'border-[var(--border-color)] text-[var(--text-muted)]'
          }`}
        >
          7天内到期
        </button>
        {(tierFilter !== 'all' || expiring) && (
          <button onClick={() => { setTierFilter('all'); setExpiring(false); }} className="text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)]">
            清除筛选
          </button>
        )}
      </div>

      {/* 名单表 */}
      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        {loading ? (
          <div className="flex items-center justify-center py-16 text-[var(--text-muted)]"><Loader2 className="animate-spin" size={20} /></div>
        ) : members.length === 0 ? (
          <div className="py-16 text-center text-sm text-[var(--text-muted)]">没有匹配的用户</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg-soft)] border-b border-[var(--border-color)] text-xs text-[var(--text-muted)]">
                  <th className="text-left px-4 py-3 font-medium">用户</th>
                  <th className="text-left px-4 py-3 font-medium">当前档位</th>
                  <th className="text-left px-4 py-3 font-medium">到期</th>
                  <th className="text-right px-4 py-3 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => {
                  const expired = m.tier !== m.effectiveTier;
                  return (
                    <tr key={m.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-soft)] transition-colors">
                      <td className="px-4 py-2.5">
                        <div className="text-[var(--text-primary)] font-medium">{m.nickname || m.username}</div>
                        <div className="text-[10px] text-[var(--text-muted)]">@{m.username}{m.email ? ` · ${m.email}` : ''}</div>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-xs font-semibold" style={{ color: TIER_ACCENT[m.effectiveTier] }}>
                          {labels[m.effectiveTier]}
                        </span>
                        {expired && <span className="ml-1 text-[10px] text-[var(--text-muted)]">(原{labels[m.tier]}已过期)</span>}
                      </td>
                      <td className="px-4 py-2.5 text-xs text-[var(--text-muted)]">
                        {m.tier === 'lifetime' ? '永久' : fmtDate(m.expiry)}
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <button
                          onClick={() => setGranting(m)}
                          className="text-xs px-3 py-1 rounded-md border border-[var(--border-color)] text-[var(--pink-primary)] hover:bg-[var(--bg-soft)] transition-colors"
                        >
                          开通/调整
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* 分页 */}
        {!loading && total > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border-color)]">
            <span className="text-xs text-[var(--text-muted)]">共 {total} 人</span>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-3 py-1 text-xs rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] disabled:opacity-30 hover:border-[var(--pink-primary)] transition-colors"
              >
                上一页
              </button>
              <span className="px-2 py-1 text-xs text-[var(--text-muted)]">第 {page} / {Math.max(1, Math.ceil(total / PAGE_SIZE))} 页</span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page * PAGE_SIZE >= total}
                className="px-3 py-1 text-xs rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] disabled:opacity-30 hover:border-[var(--pink-primary)] transition-colors"
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>

      {granting && (
        <GrantModal
          member={granting}
          labels={labels}
          onClose={() => setGranting(null)}
          onDone={() => { setGranting(null); load(); }}
        />
      )}
    </div>
  );
}

function GrantModal({
  member, labels, onClose, onDone,
}: {
  member: MemberRow;
  labels: Record<Tier, string>;
  onClose: () => void;
  onDone: () => void;
}) {
  const [tier, setTier] = useState<Tier>(member.effectiveTier);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(false);

  const submit = async () => {
    // 降级到免费=退权，属敏感操作，二次确认
    if (tier === 'free' && !confirm(`确认将 ${member.nickname || member.username} 降级为免费用户？会员权益将立即取消。`)) return;
    setSaving(true);
    setErr(false);
    try {
      const res = await fetch('/api/admin/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: member.id, tier, note }),
      });
      if (!res.ok) throw new Error();
      onDone();
    } catch {
      setErr(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] w-full max-w-sm p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">开通 / 调整会员</h3>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">{member.nickname || member.username} · @{member.username}</p>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-[var(--text-muted)]">选择档位</label>
          <div className="grid grid-cols-4 gap-1.5">
            {(['free', 'monthly', 'yearly', 'lifetime'] as Tier[]).map((t) => (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`py-2 text-xs rounded-lg border transition-colors ${
                  tier === t ? 'border-[var(--pink-primary)] bg-[var(--pink-primary)] text-white font-semibold' : 'border-[var(--border-color)] text-[var(--text-muted)]'
                }`}
              >
                {labels[t]}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-[var(--text-muted)]">
            {tier === 'monthly' && '开通后 30 天到期'}
            {tier === 'yearly' && '开通后 365 天到期'}
            {tier === 'lifetime' && '永久有效，自动建周边/开发履约行'}
            {tier === 'free' && `降级为免费（记一条 ${CURRENCY_SYMBOL}0 订单留痕）`}
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs text-[var(--text-muted)]">备注（可选，如微信付款）</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="付款渠道 / 备注"
            className="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:border-[var(--pink-primary)] focus:outline-none"
          />
        </div>

        {err && <p className="text-xs text-red-500">操作失败，请重试。</p>}

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-1.5 text-xs rounded-lg border border-[var(--border-color)] text-[var(--text-muted)]">取消</button>
          <button
            onClick={submit}
            disabled={saving}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[var(--pink-primary)] text-white disabled:opacity-40 flex items-center gap-1.5"
          >
            {saving && <Loader2 size={13} className="animate-spin" />}
            确认
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 永久档履约 tab ──

interface PerkRow {
  [k: string]: unknown;
  id: string;
  userId: string;
  username: string;
  nickname: string;
  perkType: string;
  status: string;
  detail: string;
  createdAt: number;
  updatedAt: number;
}

const PERK_TYPE_LABEL: Record<string, string> = {
  merch: '🎁 定制周边',
  devservice: '🛠 产品共建',
  vip: '💎 VIP 通道',
};
const PERK_STATUS_LABEL: Record<string, string> = {
  pending: '待处理',
  in_progress: '进行中',
  done: '已完成',
};
const PERK_STATUS_NEXT: Record<string, string> = {
  pending: 'in_progress',
  in_progress: 'done',
  done: 'pending',
};

function LifetimeTab() {
  const [perks, setPerks] = useState<PerkRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | string>('all');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
      const res = await fetch(`/api/admin/lifetime-perks${qs}`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setPerks(json.perks);
    } catch {
      setPerks([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  const cycleStatus = async (p: PerkRow) => {
    const next = PERK_STATUS_NEXT[p.status] ?? 'pending';
    // 已完成再点会退回待处理，加确认
    if (p.status === 'done' && next === 'pending') {
      if (!confirm('确认将「已完成」退回「待处理」？')) return;
    }
    setPerks((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: next } : x)));
    try {
      const res = await fetch('/api/admin/lifetime-perks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: p.id, status: next }),
      });
      if (!res.ok) { alert('更新失败，请重试'); load(); }
    } catch {
      alert('网络错误，更新未保存');
      load(); // 失败回读真实状态
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--text-muted)]">筛选状态：</span>
        {(['all', 'pending', 'in_progress', 'done'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`text-xs px-3 py-1 rounded-full transition-colors ${
              statusFilter === s ? 'bg-[var(--pink-primary)] text-white' : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
            }`}
          >
            {s === 'all' ? '全部' : PERK_STATUS_LABEL[s]}
          </button>
        ))}
      </div>

      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        {loading ? (
          <div className="flex items-center justify-center py-16 text-[var(--text-muted)]"><Loader2 className="animate-spin" size={20} /></div>
        ) : perks.length === 0 ? (
          <div className="py-16 text-center text-sm text-[var(--text-muted)]">暂无永久档履约记录</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg-soft)] border-b border-[var(--border-color)] text-xs text-[var(--text-muted)]">
                  <th className="text-left px-4 py-3 font-medium">用户</th>
                  <th className="text-left px-4 py-3 font-medium">权益</th>
                  <th className="text-left px-4 py-3 font-medium">状态</th>
                  <th className="text-left px-4 py-3 font-medium">开通时间</th>
                </tr>
              </thead>
              <tbody>
                {perks.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--border-color)] hover:bg-[var(--bg-soft)] transition-colors">
                    <td className="px-4 py-2.5">
                      <div className="text-[var(--text-primary)] font-medium">{p.nickname || p.username}</div>
                      <div className="text-[10px] text-[var(--text-muted)]">@{p.username}</div>
                    </td>
                    <td className="px-4 py-2.5 text-[var(--text-primary)]">{PERK_TYPE_LABEL[p.perkType] ?? p.perkType}</td>
                    <td className="px-4 py-2.5">
                      <button
                        onClick={() => cycleStatus(p)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium transition-colors ${
                          p.status === 'done' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : p.status === 'in_progress' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
                        }`}
                        title="点击切换状态"
                      >
                        {PERK_STATUS_LABEL[p.status] ?? p.status}
                      </button>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-[var(--text-muted)]">{fmtDate(p.createdAt)}</td>
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
