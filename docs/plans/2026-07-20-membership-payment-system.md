# 会员支付体系 — 设计文档 (v1)

> 状态：**设计待 review**，未实现。用户已拍板的决策见「关键决策」。
> 创建：2026-07-20

---

## 目标

给兔莉韩语日记引入付费会员体系：免费 / 月度 / 年度 / 永久 四档。核心诉求：
1. 月度和年度**功能上要有真实差别**（不只是价格差）
2. 永久档额外含**定制周边一套 + 个性开发服务 1 个**
3. 定价：月度 ¥15（首月 ¥9.9）、年度 ¥136（首年 ¥99）、永久 ¥260

---

## 现状审查（实现前的真实起点）

**结论：会员功能在数据层基本是从零开始，现有的只是「空壳标签」。**

| 现状项 | 事实 |
|---|---|
| `membershipType` 类型 | 已定义 `'free'\|'monthly'\|'yearly'`（`src/types/admin.ts:134`），**无 lifetime 档** |
| 用户表 membership 字段 | **不存在**。`db.ts` 的 `CREATE TABLE users` 没有 `membership_type`/`membership_expiry` 列 |
| 管理后台用户列表的会员字段 | **硬编码 `'free'`**（`src/app/api/admin/users/route.ts:113`），并非真实读库 |
| 收入统计 API | **空壳**，直接返回全 0（`src/app/api/admin/revenue/route.ts`，注释 "No payment system yet"） |
| 订单表 | **不存在** |
| 支付网关 | **未接入** |
| 功能是否按会员解锁 | **完全没有**。没有任何代码读 `membershipType` 去 gate 功能 |

**已存在、可直接复用的计费基础设施：**
- `checkAiRateLimit(userId, endpoint, customLimit?)`（`src/lib/server/rate-limit.ts:99`）——已支持传 `customLimit` 覆盖默认额度。**这就是按档位调额度的现成接口**。
- `ai_usage` 表——已按 `user_id + endpoint + 日期` 记录每日调用次数。
- 访客额度 `GUEST_AI_DAILY_LIMIT = 10`，登录用户默认 `AI_DAILY_LIMIT = 200`。

---

## AI 成本地图（付费分层的经济依据）

每次调用花真金白银的功能（按成本从高到低）：

| 功能 | 路由 | 后端 | 现额度/天 | 成本 |
|---|---|---|---|---|
| **实时语音对话** | `/api/ai/realtime-chat` | DeepSeek + ASR + TTS | 150 | **最高** |
| AI 内容拆解 | `/ai/analyze` | DeepSeek | 30 | 高 |
| AI 判定（口语/写作/复述/句子） | `/api/practice/score` 等 | DeepSeek | 共享 30 | 高 |
| 胡萝卜 AI 对话 | `/api/ai/chat` | DeepSeek | 200 | 中 |
| 手写识别 | 通义千问 VL | 200 | 中 |
| TTS 真人音频 | Edge/MiniMax/阿里 NLS | 按需（有缓存） | 中 |
| ASR 语音识别 | 阿里 | 400 | 中 |

**关键发现：语音不是独立功能，而是「对话练习」里的一个模式。**
`/practice/[slug]` 场景练习有**文字/语音双模式**（`MODE_PREF_KEY = 'tori-practice-mode-pref'` + `VoiceModeOverlay`，进对话时二选一）。所以正确的切法是：

> **文字模式对话 = 月度可用；语音模式 = 年度专属。**

这比"把整个场景扮演锁给年度"更合理——月度用户能玩场景对话（文字），年度用户才解锁最贵的语音交互。经济上成立、产品上平滑。

⚠️ **注意 `BETA_MODE` 闸门**：`/practice/[slug]` 目前有 `BETA_MODE = true` 无条件解锁所有场景。上线会员时必须把它改成读会员状态。

---

## 内容库盘点（可做免费/付费墙的有限内容）

| 内容 | 数量 | 免费层放量（推荐方案） |
|---|---|---|
| 兔莉日记 | 90 天 | Day 1–7 |
| 语法卡 | 273 张 | 基础 ~20 张 |
| TOPIK 模拟卷 | 20 套 / 3400 题 | 1 套体验 |
| 分级阅读 | 40 篇（A1×10/A2×10/B1×5/B2×5/C1×5/C2×5） | A1 级 10 篇 |
| 主题词包 | 38 个 + 3 套教材（首尔/延世/Vitamin） | ❌ 全付费 |
| 绘本馆 | 6 本 | 1 本 |

**保持永久免费（留客钩子 + SEO）：** 每日任务、学习统计、40 音全套、基础词库 + SRS 复习、韩国探索/小知识/工具。

---

## 关键决策（用户已拍板 2026-07-20）

1. **先不接真支付** → 第一期只做「权益闸门 + 定价页 + 后台手动开通」。支付网关（微信/支付宝或第三方聚合）后面再接。
2. **月度给语音尝鲜额度** → 月度不是完全没有语音，而是给限量（如实时语音 10 分钟/天、场景语音 3 次/天）；年度无限/高额度。转化更平滑。
3. **免费层按推荐方案**（见上表）→ 够体验、能养成每日习惯，内容浅尝辄止。
4. **月度/年度差异点**：文字对话 = 月度；语音模式 + 额度翻倍 + 学习报告/错题精讲 = 年度。

---

## 四档权益矩阵

> **最终版（用户 2026-07-20 拍板）**

| 权益 | 免费 | 月度 ¥15(首¥9.9) | 年度 ¥136(首¥99) | 永久 ¥260 |
|---|:--:|:--:|:--:|:--:|
| 40音 / 基础词库 / SRS 复习 | ✅ | ✅ | ✅ | ✅ |
| 每日任务 / 学习统计 | ✅ | ✅ | ✅ | ✅ |
| **所有词汇（主题词包+3教材）** | ✅ | ✅ | ✅ | ✅ |
| 兔莉日记 | Day 1-7 | 全 90 天 | 全 90 天 | 全 90 天 |
| 语法卡 | 仅第一章 | 全 273 | 全 273 | 全 273 |
| TOPIK 模拟卷 | 2 套(topik1+2) | 全 20 | 全 20 | 全 20 |
| 分级阅读 | A1 10篇 | 全 40 | 全 40 | 全 40 |
| 绘本馆 | 3 本 | 全 6 | 全 6 | 全 6 |
| AI 内容拆解 | 5/天 | 30/天 | **100/天** | **无限** |
| AI 口语/写作判定 | 3/天 | 30/天 | **100/天** | **无限** |
| 胡萝卜 AI 对话 | 10/天 | 100/天 | **300/天** | **无限** |
| AI 场景角色扮演 | 仅 5 个 | 全 20 个 | 全 20 个 | 全 20 个 |
| 🎙 AI 场景对话（语音模式） | ❌ | **大额度** | **✅ 无限** | **无限** |
| 🎙 实时语音对话 | ❌ | **1 小时/天** | **✅ 无限** | **无限** |
| 📊 月度学习报告 / 错题 AI 精讲 | ❌ | ❌ | **✅** | ✅ |
| 专属客服 | — | — | **优先** | **VIP 通道** |
| 新功能 | — | 跟随 | 跟随 | **首批内测体验** |
| 终身免费更新 | — | — | — | **✅** |
| 🎁 定制周边一套 | — | — | — | **✅** |
| 🛠 个性开发服务 1 个 | — | — | — | **✅** |

**改动说明（相对初版）：**
- 词汇全部免费（主题词包不再付费）
- 语法免费收紧到仅第一章；TOPIK 免费放宽到 2 套；绘本免费放宽到 3 本；拆解免费放宽到 5/天
- 场景角色扮演免费给 5 个（共 20），月度起全解锁
- **月度也给语音**：实时语音 1 小时/天、场景语音大额度（年度/永久无限）。取代初版「月度无语音」
- 删除会员徽章
- 永久档强化：所有 AI 无限、终身免费更新、VIP 客服、首批内测
- 年度加：专属客服优先

**定价校验：** 年度 ¥136 → ¥11.3/月（首年 ¥99 → ¥8.25/月 ✅）；永久 ¥260 vs 年度 ¥136 → **1.9 年回本** ✅。

---

## 技术实现方案

### 1. 数据层（新增）

`db.ts` 给 users 表补列（用现有 `ALTER TABLE ... try/catch` 模式）：

```sql
ALTER TABLE users ADD COLUMN membership_type TEXT DEFAULT 'free';   -- free|monthly|yearly|lifetime
ALTER TABLE users ADD COLUMN membership_expiry INTEGER;             -- unix ms; lifetime=NULL 且 type=lifetime
```

新建订单表（即便先不接支付，后台手动开通也走这张表，方便后续接网关）：

```sql
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  plan TEXT NOT NULL,                -- monthly|yearly|lifetime
  amount_cents INTEGER NOT NULL,     -- 实付分
  status TEXT DEFAULT 'paid',        -- pending|paid|refunded|failed（手动开通直接 paid）
  channel TEXT DEFAULT 'manual',     -- manual|wechat|alipay
  created_at INTEGER NOT NULL,
  paid_at INTEGER,
  note TEXT DEFAULT ''
);
```

永久档履约（周边 + 定制开发）单独一张，避免污染订单表：

```sql
CREATE TABLE IF NOT EXISTS lifetime_perks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  merch_status TEXT DEFAULT 'pending',   -- pending|shipped|done（周边发货）
  merch_address TEXT DEFAULT '',
  dev_status TEXT DEFAULT 'pending',     -- pending|in_progress|done（定制开发）
  dev_request TEXT DEFAULT '',
  created_at INTEGER NOT NULL
);
```

`ai_usage` 表复用，无需改。

### 2. 会员状态读取（新增核心工具）

新建 `src/lib/server/membership.ts`：

```ts
export type Tier = 'free' | 'monthly' | 'yearly' | 'lifetime';

// 从库读，判断是否过期（lifetime 永不过期）
export async function getUserTier(userId: string): Promise<Tier>;

// 各档 AI 每日额度表 → 喂给 checkAiRateLimit 的 customLimit
export const AI_QUOTA: Record<Tier, Record<string, number>>;

// 内容解锁判断
export function canAccessDiaryDay(tier: Tier, day: number): boolean;   // free: day<=7
export function canAccessGrammar(tier: Tier, cardId: string): boolean;
// ... TOPIK / reading / vocab 同理
```

### 3. 权益闸门层（改造现有）

- **AI 额度**：各 AI 路由把 `checkAiRateLimit(uid, endpoint)` 改成 `checkAiRateLimit(uid, endpoint, AI_QUOTA[tier][endpoint])`。改动点少（rate-limit 已支持 customLimit）。
- **语音尝鲜**：realtime-chat / 场景语音模式额外查 tier，月度限量、年度放开。语音「分钟数」需要在 `ai_usage` 加一个按时长计的 endpoint（或按次数近似）。
- **内容墙**：日记/语法/TOPIK/阅读/词包/绘本的详情页 + 列表页，用 `canAccessX(tier, id)` 判断，锁住的显示「升级会员解锁」遮罩。
- **翻 `BETA_MODE`**：`/practice/[slug]` 的 `BETA_MODE = true` 改为读 tier。

### 4. 会员 UI（新增）

- **定价页** `/membership`（或 `/pricing`）：用品牌「暖奶油悬浮卡」视觉（对齐 `brand-visual-system`），四档卡片、首购促销价、权益对比表。
- **会员中心** `/mine/membership`：当前档位、到期日、续费入口、永久档的周边地址填写 + 定制需求提交。
- **升级遮罩组件** `<UpgradeGate>`：锁定内容上的统一遮罩 + CTA。

### 5. 后台（改造现有）

- `/admin/users/[id]`：加「手动开通/调整会员」操作（写 users.membership_* + orders）。
- `/admin/revenue`：把空壳 API 接上真实 orders 表统计。
- 新增 `/admin/lifetime`（或并入 users 详情）：永久档周边发货状态 + 定制开发需求管理。

---

## 分期计划

**Phase 1（本期，不接支付）：**
1. DB：补 membership 列 + orders + lifetime_perks 表
2. `membership.ts`：tier 读取 + 额度表 + 内容解锁判断
3. AI 额度闸门接入（各路由 customLimit）
4. 内容墙 + UpgradeGate 组件 + 翻 BETA_MODE
5. 定价页（品牌视觉）+ 会员中心
6. 后台手动开通 + 收入 API 接真数据 + 永久档履约管理

**Phase 2（接真支付）：**
- 接微信/支付宝或第三方聚合（虎皮椒/XorPay/易支付）
- 订单回调、状态机、自动开通、续费提醒

---

## 待确认

- **支付网关路线**（Phase 2 才需要）：有无营业执照决定走官方商户号还是第三方聚合。
- **语音尝鲜额度具体值**：月度实时语音「10 分钟/天、场景语音 3 次/天」是否合适（分钟制需要 ai_usage 记时长）。
- **定价页路由命名**：`/membership` vs `/pricing` vs `/vip`。
- **免费日记放量**：Day 1-7 是否合适（7 天是养成习惯的常见锚点）。
