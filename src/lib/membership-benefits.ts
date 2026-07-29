// 会员权益矩阵 —— 单一事实来源
//
// 「结构」（有哪些权益行、分组、类型）写在代码里，稳定不可被后台改。
// 「值」（每档每项给多少）有默认值，且可被后台编辑后存进 app_config 表覆盖。
// 后台权益总览页读这里的结构 + DB 覆盖值来渲染；未来各功能的解锁判断也读这份配置。

import { t } from './i18n';
import type { Lang } from './i18n';

export const TIERS = ['free', 'monthly', 'yearly', 'lifetime'] as const;
export type Tier = (typeof TIERS)[number];

// ⚠️ 免费体验期总开关 —— true 时放开所有「内容墙 + 写守卫」（所有人视同付费档解锁全部内容）。
// ⚠️ 但 AI 额度不给无限：免费期按「月度会员」档限量（analyze30/judge30/chat100），防 1 万用户涌入打爆 DeepSeek/TTS 成本。
// 上线结束免费期后改回 false 恢复付费门禁。单点控制：isPaidTier(内容/写守卫) / aiQuotaOf(AI额度) 都读它。
// 开启日期：2026-07-28（免费体验期，配合定价页 MEMBERSHIP_PAUSED=true）
export const BETA_UNLOCK = false;

// 免费体验期 AI 额度对齐的档位：不给无限，按此档的矩阵额度限量。
const BETA_AI_TIER: Tier = 'monthly';

// ⚠️ 会员中心暂停开放（免费体验期）。true 时 /membership 对普通用户显示占位页、无法购买。恢复付费＝改 false。
// 单一事实来源：/membership 页的暂停遮罩、以及各内容墙的「解锁」CTA 是否可跳转，都读这一个开关。
// 与 BETA_UNLOCK 独立，但两者组合决定内容墙行为——见 canPurchaseMembership() 防止两开关不同步造成死锁。
export const MEMBERSHIP_PAUSED = true;

// 会员是否可购买：暂停期（含普通用户）不可购买。内容墙的「解锁全部」CTA 用它决定跳 /membership 还是显示「即将开放」，
// 避免「BETA_UNLOCK=false 收紧内容墙」但「MEMBERSHIP_PAUSED=true 付费页未开」的中间态里，用户点解锁跳去撞占位页的死路。
export function canPurchaseMembership(): boolean {
  return !MEMBERSHIP_PAUSED;
}

export const TIER_LABELS: Record<Tier, string> = {
  free: '免费',
  monthly: '月度',
  yearly: '年度',
  lifetime: '永久',
};

export function getTierLabel(tier: Tier, lang: Lang): string {
  const key = `membership.tier_${tier}`;
  return t(key, lang);
}

// 定价（分）。促销价 = 首购价，origin = 划线原价
export interface TierPricing {
  price: number | null;      // 常规价（分/美分）；free 为 null
  promo: number | null;      // 首购促销价（分/美分）；无促销为 null
  originLabel?: string;      // 展示用原价文案
}

// 部署级区分：国内站(¥) vs 海外站($)。由各服务器的 NEXT_PUBLIC_EDITION 决定，
// build 时静态注入，运行时不判断用户国别（域名已在 DNS 层分流）。
export const EDITION = process.env.NEXT_PUBLIC_EDITION === 'overseas' ? 'overseas' : 'domestic';
export const CURRENCY_SYMBOL = EDITION === 'overseas' ? '$' : '¥';

// orders.amount / TIER_PRICING 均以「分（美分）」存储。展示时统一走这个转成「元」。
export function formatAmount(cents: number): string {
  return (cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const PRICING_DOMESTIC: Record<Tier, TierPricing> = {
  free:     { price: null,  promo: null },
  monthly:  { price: 1500,  promo: 990,  originLabel: '¥15/月' },
  yearly:   { price: 13600, promo: 9900, originLabel: '¥136/年' },
  // 永久：正常价 ¥348，8.31 前创始价 ¥298（走 promo 机制，过期后自动恢复 ¥348 结算）
  lifetime: { price: 34800, promo: 29800, originLabel: '¥348' },
};

// 海外定价：美分存储。月/年参考国内美元等值，主力台/日/印尼。全 .99 心理价。
// 永久档境外无实体礼盒成本，定价低于国内永久档的美元换算等价。
const PRICING_OVERSEAS: Record<Tier, TierPricing> = {
  free:     { price: null,  promo: null },
  monthly:  { price: 399,   promo: 299,  originLabel: '$3.99/月' },
  yearly:   { price: 2999,  promo: 1999, originLabel: '$29.99/年' },
  // 永久：正常价 $59.99，8.31 前创始价 $49.99
  lifetime: { price: 5999,  promo: 4999, originLabel: '$59.99' },
};

export const TIER_PRICING: Record<Tier, TierPricing> =
  EDITION === 'overseas' ? PRICING_OVERSEAS : PRICING_DOMESTIC;

// 上线限时首购福利截止日（含当日）。过了这天，promo 首购价自动失效，结账/展示都回落常规价。
// 感谢内测阶段参与的伙伴，上线限时福利一个月。
export const PROMO_DEADLINE = '2026-08-31';

// 促销是否仍在窗口内（按服务器/浏览器当地日期比较，含截止当日）
export function isPromoActive(now: Date = new Date()): boolean {
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return today <= PROMO_DEADLINE;
}

// 生效定价：促销窗口内保留 promo，过期后 promo 视为 null（即回落常规价）。
// 后端结账与 benefits API 出口都走它，保证前后端一致，绝不出现「后端收原价、前端仍显促销」。
export function effectivePricing(tier: Tier, now: Date = new Date()): TierPricing {
  const p = TIER_PRICING[tier];
  if (isPromoActive(now)) return p;
  return { ...p, promo: null };
}

// 权益项类型
// - content: 内容库解锁范围，值是描述文本（如 "前 7 天" / "全 90 天"）
// - quota:   AI 每日额度，值是数字；-1 = 无限，0 = 不可用
// - bool:    有/无
// - text:    自由文本特权（如 "VIP 通道"）
export type BenefitType = 'content' | 'quota' | 'bool' | 'text';

export interface BenefitRow {
  id: string;
  label: string;
  type: BenefitType;
  unit?: string;              // quota 的单位，如 "/天"
  note?: string;              // 给管理员看的说明
}

export interface BenefitGroup {
  id: string;
  label: string;
  rows: BenefitRow[];
}

// ── 权益行结构（分组）──
export const BENEFIT_GROUPS: BenefitGroup[] = [
  {
    id: 'content',
    label: '内容库',
    rows: [
      { id: 'diary',      label: '兔莉日记',       type: 'content', note: '共 90 天' },
      { id: 'grammar',    label: '语法卡',         type: 'content', note: '共 273 张' },
      { id: 'topik',      label: 'TOPIK 模拟卷',   type: 'content', note: '共 20 套' },
      { id: 'reading',    label: '分级阅读',       type: 'content', note: '共 40 篇' },
      { id: 'vocabulary', label: '词汇（含主题词包/教材）', type: 'content' },
      { id: 'picbooks',   label: '绘本馆',         type: 'content', note: '共 6 本' },
    ],
  },
  {
    id: 'ai',
    label: 'AI 功能（按天限量，-1=无限）',
    rows: [
      { id: 'analyze',   label: 'AI 内容拆解',      type: 'quota', unit: '/天' },
      { id: 'judge',     label: 'AI 口语/写作判定',  type: 'quota', unit: '/天' },
      { id: 'chat',      label: '胡萝卜 AI 对话',    type: 'quota', unit: '/天' },
      { id: 'roleplay',  label: 'AI 场景角色扮演',   type: 'content', note: '共 20 个场景' },
      { id: 'customscene', label: '自定义 AI 场景',   type: 'content', note: '自建专属陪练/情景，每个都 AI 生成' },
      { id: 'voice',     label: '🎙 实时语音对话',   type: 'content', note: '语音每次成本最高' },
    ],
  },
  {
    id: 'perks',
    label: '特权',
    rows: [
      { id: 'report',    label: '月度学习报告 / 错题 AI 精讲', type: 'bool' },
      { id: 'support',   label: '专属客服',          type: 'text' },
      { id: 'updates',   label: '终身免费更新',      type: 'bool' },
      { id: 'beta',      label: '新功能首批内测',    type: 'bool' },
      { id: 'merch',     label: '🎁 定制周边一套',   type: 'bool' },
      { id: 'devservice',label: '🛠 产品共建特权', type: 'bool' },
    ],
  },
];

// 权益值矩阵：benefitId -> { tier -> 值 }
// content/text 值为 string；quota 为 number；bool 为 boolean
export type BenefitValue = string | number | boolean;
export type BenefitMatrix = Record<string, Record<Tier, BenefitValue>>;

// ── 默认值（用户 2026-07-20 拍板的最终版）──
export const DEFAULT_MATRIX: BenefitMatrix = {
  // 内容库
  diary:      { free: '前 7 天',   monthly: '全 90 天', yearly: '全 90 天', lifetime: '全 90 天' },
  grammar:    { free: '仅第一章',  monthly: '全部',   yearly: '全部',   lifetime: '全部' },
  topik:      { free: '2 套体验',  monthly: '全部',    yearly: '全部',    lifetime: '全部' },
  reading:    { free: 'A1 10 篇',  monthly: '全部',    yearly: '全部',    lifetime: '全部' },
  vocabulary: { free: '全部',      monthly: '全部',     yearly: '全部',     lifetime: '全部' },
  picbooks:   { free: '3 本',      monthly: '全部',     yearly: '全部',     lifetime: '全部' },
  // AI 功能
  analyze:    { free: 5,  monthly: 30,  yearly: 100, lifetime: -1 },
  judge:      { free: 3,  monthly: 30,  yearly: 100, lifetime: -1 },
  chat:       { free: 10, monthly: 100, yearly: 300, lifetime: -1 },
  roleplay:   { free: '5 个', monthly: '全部', yearly: '全部', lifetime: '全部' },
  customscene:{ free: '3 个', monthly: '15 个', yearly: '无限', lifetime: '无限' },
  voice:      { free: '❌', monthly: '100 轮/天', yearly: '无限', lifetime: '无限' },
  // 特权
  report:     { free: false, monthly: false, yearly: true,       lifetime: true },
  support:    { free: '',    monthly: '',    yearly: '优先',     lifetime: 'VIP 通道' },
  updates:    { free: false, monthly: false, yearly: false,      lifetime: true },
  beta:       { free: false, monthly: false, yearly: false,      lifetime: true },
  merch:      { free: false, monthly: false, yearly: false,      lifetime: true },
  devservice: { free: false, monthly: false, yearly: false,      lifetime: true },
};

// ── 权益值文案翻译（渲染层用）──
// 矩阵的值同时参与逻辑判断（如 customSceneLimit 用 includes('无限')），故不能改数据本身。
// 渲染时把已知中文短语映射到 i18n key；后台自定义的未知值原样返回（回退中文）。
const BENEFIT_VALUE_KEY: Record<string, string> = {
  '全部': 'mbval.all',
  '无限': 'mbval.unlimited',
  '前 7 天': 'mbval.diary_free',
  '全 90 天': 'mbval.diary_full',
  '仅第一章': 'mbval.grammar_free',
  '2 套体验': 'mbval.topik_free',
  'A1 10 篇': 'mbval.reading_free',
  '3 本': 'mbval.picbooks_free',
  '5 个': 'mbval.roleplay_free',
  '3 个': 'mbval.customscene_free',
  '15 个': 'mbval.customscene_monthly',
  '100 轮/天': 'mbval.voice_monthly',
  '优先': 'mbval.support_priority',
  'VIP 通道': 'mbval.support_vip',
};

/** 把权益矩阵的中文值/label 翻成当前语言；未登记的短语原样返回。 */
export function translateBenefitText(s: string, lang: Lang): string {
  const key = BENEFIT_VALUE_KEY[s.trim()];
  return key ? t(key, lang) : s;
}

// ── 内容解锁判断（纯函数，客户端/服务端共用）──
// 付费档（monthly/yearly/lifetime）解锁全部内容；免费档按矩阵里的 free 值限量。
// 免费阈值从矩阵的 free 值解析，后台改「前 7 天」→「前 14 天」即生效。

export function isPaidTier(tier: Tier): boolean {
  if (BETA_UNLOCK) return true; // 内测：所有人视为付费档，放开全部内容墙 + 写守卫
  return tier !== 'free';
}

// 从内容/文本值里取首个整数（如 "前 7 天"→7、"3 本"→3）
function leadingInt(v: unknown, fallback: number): number {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string') {
    const m = v.match(/\d+/);
    if (m) return parseInt(m[0], 10);
  }
  return fallback;
}

// 兔莉日记：免费仅前 N 天
export function canAccessDiaryDay(matrix: BenefitMatrix, tier: Tier, day: number): boolean {
  if (isPaidTier(tier)) return true;
  return day <= leadingInt(matrix.diary?.free, 7);
}

// 语法：免费仅第一章（partNumber === 1）
export function canAccessGrammarPart(_matrix: BenefitMatrix, tier: Tier, partNumber: number): boolean {
  if (isPaidTier(tier)) return true;
  return partNumber === 1;
}

// TOPIK 模拟卷：免费仅前 N 套（有序列表下标，0-based）
export function topikFreeCount(matrix: BenefitMatrix): number {
  return leadingInt(matrix.topik?.free, 2);
}
export function canAccessTopikIndex(matrix: BenefitMatrix, tier: Tier, index0: number): boolean {
  if (isPaidTier(tier)) return true;
  return index0 < topikFreeCount(matrix);
}

// 分级阅读：免费仅 A1 级
export function canAccessReadingLevel(_matrix: BenefitMatrix, tier: Tier, level: string): boolean {
  if (isPaidTier(tier)) return true;
  return level === 'A1';
}

// 阅读室内容墙：内测期(BETA)也提前收紧，故不读 BETA_UNLOCK，只看真实档位。
// 免费用户仅 A1 免费；其余等级锁。admin 例外见 isReadingLocked。
// 返回 { locked: 显示锁徽章, blocked: 拦截进入 }。admin 看得到锁但可进入。
export function readingLockState(tier: Tier, level: string, isAdmin: boolean): { locked: boolean; blocked: boolean } {
  if (BETA_UNLOCK) return { locked: false, blocked: false }; // 内测期放开：不锁不拦，上线关 BETA 自动收紧
  const restricted = tier === 'free' && level !== 'A1';
  return { locked: restricted, blocked: restricted && !isAdmin };
}

// 绘本馆：免费仅前 N 本（有序列表下标，0-based）
export function picbookFreeCount(matrix: BenefitMatrix): number {
  return leadingInt(matrix.picbooks?.free, 3);
}
export function canAccessBookIndex(matrix: BenefitMatrix, tier: Tier, index0: number): boolean {
  if (isPaidTier(tier)) return true;
  return index0 < picbookFreeCount(matrix);
}

// AI 场景角色扮演：免费仅前 N 个场景（有序列表下标，0-based）
export function roleplayFreeCount(matrix: BenefitMatrix): number {
  return leadingInt(matrix.roleplay?.free, 5);
}
export function canAccessSceneIndex(matrix: BenefitMatrix, tier: Tier, index0: number): boolean {
  if (isPaidTier(tier)) return true;
  return index0 < roleplayFreeCount(matrix);
}

// 实时语音对话：免费无，其余按矩阵文本（monthly 限量 / yearly·lifetime 无限）
export function canUseVoice(matrix: BenefitMatrix, tier: Tier): boolean {
  if (isPaidTier(tier)) return true;
  const v = matrix.voice?.free;
  return typeof v === 'string' && v !== '' && v !== '❌';
}

// AI 每日额度：-1=无限，0=不可用
export function aiQuotaOf(matrix: BenefitMatrix, tier: Tier, benefit: 'analyze' | 'judge' | 'chat'): number {
  // 免费体验期：免费用户内容全放开，但 AI 额度按月度档限量防成本失控（不给无限）。
  // ⚠️ 只降级 free；真实 yearly/lifetime 保持自己更高的额度，不被 BETA 拉低。
  const effTier = (BETA_UNLOCK && tier === 'free') ? BETA_AI_TIER : tier;
  const v = matrix[benefit]?.[effTier];
  return typeof v === 'number' ? v : 0;
}

// benefitId -> 声明的类型，用于校验覆盖值
const BENEFIT_TYPE_BY_ID: Record<string, BenefitType> = Object.fromEntries(
  BENEFIT_GROUPS.flatMap((g) => g.rows.map((r) => [r.id, r.type])),
);

// 覆盖值是否与该权益项声明的类型匹配（防脏数据落库/穿帮）
function isValidValue(type: BenefitType, value: unknown): value is BenefitValue {
  switch (type) {
    case 'quota': return typeof value === 'number' && Number.isFinite(value);
    case 'bool':  return typeof value === 'boolean';
    case 'content':
    case 'text':  return typeof value === 'string';
  }
}

// 合并 DB 覆盖值到默认值（DB 缺失或类型不符的项回落默认）。用于 API 返回给前台。
export function mergeMatrix(override: Partial<BenefitMatrix> | null | undefined): BenefitMatrix {
  if (!override) return structuredClone(DEFAULT_MATRIX);
  const merged = structuredClone(DEFAULT_MATRIX);
  for (const [benefitId, tiers] of Object.entries(override)) {
    if (!merged[benefitId]) continue;                // 忽略结构里没有的行
    const type = BENEFIT_TYPE_BY_ID[benefitId];
    for (const t of TIERS) {
      const v = tiers?.[t];
      if (v !== undefined && isValidValue(type, v)) merged[benefitId][t] = v;  // 类型不符则保留默认
    }
  }
  return merged;
}

// ── 故事集（이야기）专用门控 ──
// 故事集不跟随「免费仅 A1」的分级阅读规则，而是按难度档各放前 N 篇免费，
// 让免费用户在初级、中级都能尝鲜。付费档解锁全部。改这两个数字即可调免费量。
export const STORY_FREE = { beginner: 4, intermediate: 2 } as const; // 初级(A1/A2)4篇 + 中级(B1/B2)2篇免费

// 自定义 AI 场景/陪练：各档累计可拥有的上限（每个都调 DeepSeek 生成，属重度 AI 功能，按档梯度）。
// 返回 -1 = 无限（永久档）。免费体验期(BETA)不放无限，按月度档限量防成本失控——与 aiQuotaOf 同策略。
export function customSceneLimit(matrix: BenefitMatrix, tier: Tier): number {
  const effTier = BETA_UNLOCK ? BETA_AI_TIER : tier;
  const v = matrix.customscene?.[effTier];
  if (typeof v === 'string' && (v.includes('无限') || v.includes('∞'))) return -1;
  return leadingInt(v, 3);
}

type StoryTierKey = 'beginner' | 'intermediate' | 'advanced';
function storyTierOf(level: string): StoryTierKey {
  if (level === 'A1' || level === 'A2') return 'beginner';
  if (level === 'B1' || level === 'B2') return 'intermediate';
  return 'advanced';
}
// 等级升序权重（A1 最前），保证同档内免费名额优先给更简单的故事
const LEVEL_RANK: Record<string, number> = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5 };

// 从「同一 topic 的故事列表」算出免费故事 id 集合。
// 传入的 stories 应为该 topic 下全部非隐藏故事；内部按难度分档、档内按等级升序取前 N 篇。
export function freeStoryIds(stories: { id: string; level: string }[]): Set<string> {
  const free = new Set<string>();
  for (const tierKey of ['beginner', 'intermediate'] as const) {
    const n = STORY_FREE[tierKey];
    const inTier = stories
      .filter((s) => storyTierOf(s.level) === tierKey)
      .sort((a, b) => (LEVEL_RANK[a.level] ?? 9) - (LEVEL_RANK[b.level] ?? 9));
    for (const s of inTier.slice(0, n)) free.add(s.id);
  }
  return free;
}

// 单篇故事是否对当前用户锁定。isFree = 该故事 id 是否在 freeStoryIds 集合内。
// 返回 { locked: 显示锁徽章, blocked: 拦截进入 }。付费档/admin 全放行。
export function storyLockState(tier: Tier, isFree: boolean, isAdmin: boolean): { locked: boolean; blocked: boolean } {
  // 与 readingLockState 一致：内容墙不读 BETA_UNLOCK，只看真实档位（付费/免费）。
  if (tier !== 'free' || isFree) return { locked: false, blocked: false };
  return { locked: true, blocked: !isAdmin };
}
