# 01 · UI 视觉一致性审查报告

**审查日期**：2026-07-07
**范围**：`src/app/grammar/page.tsx`（2559 行）、`src/components/grammar/GrammarSession.tsx`、`src/lib/theme.ts`
**数据来源**：Explore agent 深度扫读 + 静态代码检查

---

## 一、色板混乱（P0）

### 硬编码 hex 色（未进 token）

`GRAMMAR_STYLES` 常量（page.tsx L96-L200）里出现 13 个未 token 化的 hex：

| Hex | 用途 | 应映射到 |
|---|---|---|
| `#ff7fa8` | 粉主 · verb tag | `C.pink` ✅ 已有 token |
| `#2db89b` | mint · subject tag | `C.mint` ✅ 已有 |
| `#b49ccf` | 紫 · object tag / P13-P24 heading | 未 token 化 |
| `#6b7ff0` | 蓝 · quickTable heading / step badge | 未 token 化 |
| `#b89020` | 金 · time tag / quiz badge | 未 token 化 |
| `#92400e` | 棕 · place tag | 未 token 化 |
| `#be185d` | 深粉 · quickTable th | 未 token 化 |
| `#6b21a8` | 深紫 · overview section 分割线 | 未 token 化 |
| `#1a7a4a` | 深绿 · 韩剧场景 chip | 未 token 化 |
| `#1e40af` | 深蓝 · KPOP 场景 chip | 未 token 化 |
| `#475569` | slate · muted 文字 | `C.muted`？（可能重叠） |
| `#e05555` | 红 · mistakes 错误标记 | 未 token 化 |
| `#fff8d0` | 淡黄 · quiz box 底 | 未 token 化 |

**问题**：暗色模式下 `#ff7fa8` 直接混 `--bg-card`（用 `color-mix` API），对比度未经验证。深色下可能出现"粉底+粉字"看不清。

**建议**：把 13 个 hex 抽到 `src/lib/theme.ts` 的 `TOKEN_C`，然后暗色主题在 `:root[data-theme=dark]` 里覆写，暗色对比度重新校准。

---

## 二、圆角家族杂乱

统计 `borderRadius` 全部值：

| 值 | 出现次数 | 用途 |
|---|---|---|
| 8 | 少 | 小按钮 |
| 10 | 中 | badge |
| 12 | 高 | tok pill / mistake row |
| 14 | 中 | reminder-box |
| 15 | 少 | 编号方块（正好用一次） |
| 16 | 高 | mobile 卡片 · pill 按钮 |
| 18 | 高 | 底部翻页按钮 |
| 22 | 高 | desktop 卡片 |
| 24 | 中 | Part 列表卡片 |
| 28 | 少 | overview-hero |
| 99 | 高 | 完整胶囊 |

**问题**：11 个不同圆角值，视觉上层次感被打散。

**建议**：收敛到 5 档：`4 / 8 / 14 / 22 / 99`（依 Material 三档 + 全圆）。

---

## 三、字号不统一

同类型控件出现多种字号：

| 元素 | 字号并存 | 建议 |
|---|---|---|
| Section 标题 | 21 / 22 / 24 | 统一 22 |
| 正文 | 15 / 16 / 17 | 统一 16 |
| Badge | 11 / 12 / 13 | 统一 12 |
| Muted 副标 | 13 / 14 / 15 | 统一 14 |
| 大标题 | 20 / 25 / 26 / 28 | 保留 26 / 20（大/中） |

---

## 四、样式并存重复（P1，代码卫生）

### 4.1 `.mistake` CSS 类 vs 内联 `<div className="mistake">`

Page.tsx L176-L187 定义了 `.mistake` `.m-w` `.m-r` `.bx` `.bo` `.m-txt` 一整套；同时 `GrammarCardView` React 组件里（L1002-L1027）又用**内联 style** 手绘了同样一套 mistake row。

现象：
- 老 HTML 原型注入（`overviewHtml` `step0Html`）走 CSS 类
- 新 React 组件走内联 style
- **两套代码渲染同一视觉**，但字号/间距略有出入

**建议**：把内联版本改用 className；或反过来把 CSS 版本改用 style。二选一。

### 4.2 quickTable 双套渲染

移动端 = 卡片堆叠（内联 grid）；桌面 = 表格（CSS）。断点切换时视觉不平滑。

### 4.3 `.hook-box` / `.reminder-box` / `.compare-grid` / `.cmp-block`

四个 class 都在描述"内容分块"，功能重叠。`.hook-box` 用在 step0，`.compare-grid`/`.cmp-block` 用在对比页——命名混乱。

---

## 五、层级 UI 冗余（P2）

### 5.1 三级 tab 视觉层级模糊

Explore 报告：
1. 大 tab（chapters/library）：pill 按钮组
2. 中 tab（beginner/intermediate/advanced）：pill 按钮组，样式**几乎与大 tab 相同**
3. Part 卡片右上"中级/高级"胶囊：外层 tab 已选中难度层时**冗余**

**建议**：
- 大 tab 用一种视觉（如 pill 组）
- 中 tab 换一种（如 underline tab 或 segmented control）
- 或去掉 Part 卡片胶囊（当外层 tab 已选定难度时）

### 5.2 mistakes 双重消费

同一份 `mistakes` 数组被同一课渲染两次：
1. `⚠️ 别踩坑` 步骤：红/绿双卡展示
2. `🧐 判断对错` 步骤（当没 specialQuiz 时）：Judge 题型题目也用 mistakes

**问题**：用户看到完全相同的红/绿方案两次。

**建议**：判断对错步骤改用**变形**（把 correct/wrong 洗牌成 A/B 选择题），或干脆不重复渲染。

---

## 六、暗色模式暴露的具体问题

`src/lib/theme.ts` 的 `LIGHT_C` 和 `DARK_C` **完全指向同一个 `TOKEN_C`**，暗色靠 `:root[data-theme=dark]` 覆写 CSS 变量。但 `GRAMMAR_STYLES` 里大量硬编码 hex 没走 CSS 变量：

| 组件 | 暗色下可能的问题 |
|---|---|
| `.quickTable th` 背景 `#be185d` | 深粉底 + 白字，深色下 OK 但与其他 section 头不协调 |
| `.mistake` 红/绿 hex | `#e05555` 红 + 深底 → 对比度可能不足 |
| KPOP 场景 chip `#1e40af` 蓝 | 深底 + 深蓝几乎看不见 |
| Overview `.ov-hero` 内联 style `#ff7fa8` | 深底 + 粉字 → 对比度低 |

**未验证的对比度**：至少上述 4 处需人肉在暗色下截图检查。

---

## 七、汇总与优先级

| 优先级 | 问题 | 修法工时 | 风险 |
|---|---|---|---|
| P0 | 13 处硬编码 hex 未 token 化 | 1h | 中（30 Part 视觉都受影响） |
| P1 | mistakes 双重消费 UI 重复 | 30min | 低 |
| P1 | `.mistake` CSS + 内联 style 并存 | 1h | 中 |
| P2 | 圆角字号杂乱 | 2h | 低 |
| P2 | 三级 tab 视觉分层 | 1h | 低 |
| P3 | quickTable 双套渲染 | 2h | 中 |
| P3 | 暗色对比度校准 | 2h + 人肉验证 | 高 |

**建议实施顺序**：
1. **先 P0**（token 化）→ 一次性打好基础
2. **再 P1**（重复 UI 清理）
3. **P2/P3 视用户反馈决定**（可能一半问题不痛不痒）

**跳过建议**：暗色对比度校准是深水区，不到用户抱怨不建议投入。
