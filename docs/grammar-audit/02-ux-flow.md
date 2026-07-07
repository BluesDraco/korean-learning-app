# 02 · UX 交互流程审查报告

**审查日期**：2026-07-07
**范围**：`src/app/grammar/page.tsx`（GrammarContent / ChaptersTab / GrammarCardView）
**审查方法**：Explore agent + 静态代码检查

---

## 一、从"打开语法" 到"完成一课"的完整旅程

1. `/grammar` 页 → 大 tab（章节 / 词库）
2. 章节 tab → 顶部统计（已完成/进行中/总数）+ 进度条 + "继续学习"横幅
3. 中 tab（初级/中级/高级）→ 信息条（部数/课数/gap 文案）
4. Part 卡片列表 → 展开 → Lesson 列表
5. 点开 Lesson → `GrammarCardView` 全屏
6. GrammarCardView 12 步流程（step0Html → conceptCompare → structure → rules → readingGuide → quickTable → scenarios → mistakes → cardExamples → specialQuiz → judge → done）
7. done 步 → CTA "完成" → 返回列表

---

## 二、已识别的 UX 问题

### 2.1 tab 副标签 P13-P24 与真实 P17+ 不一致（**已修**）

Explore 报告：Advanced tab 显示 `P13-P24`，过滤逻辑用 `>=17`。用户看到副标签会以为高级从 P13 开始。

**状态**：已在 batch 3 修为 `P17-P30`。✅

### 2.2 Part 卡片右上"中级/高级"胶囊冗余（P1）

外层 tab 已经把 30 部按难度分好组，Part 卡片右上再贴一枚"中级"/"高级"胶囊，重复语义。

**建议**：
- 方案 a：去掉胶囊（外层 tab 已定难度）
- 方案 b：胶囊改成 partNumber 编号（"P17"），起导航锚点作用

### 2.3 mistakes 双重消费 UI（P1）

同一课的 `mistakes` 数组被 `GrammarCardView` 渲染两次：
1. 第 8 步「别踩坑」（红/绿对照）
2. 第 11 步「判断对错」（当没 specialQuiz 时）

**用户体验**：看到完全相同的红/绿卡片方案，第二次没有惊喜。

**建议**：
- 「判断对错」步骤重构为**判断题**（wrong/correct 洗牌，让用户选正确的一个）
- 或当没 specialQuiz 时不渲染此步（跳到 done）

### 2.4 P17 短小 Part 进度条跳跃（P2）

P17 只 5 课，每完成一课进度条 +20%，其他 Part（9-11 课）每课 +10% 左右。

**用户体验**：不同 Part 的完成节奏视觉不一致。

**建议**：进度条按"当前 tab 层级的总课数"计算，而非按单 Part 计算。或在 P17 上标注"短小 Part 5 课"提示预期。

### 2.5 未登录用户学习进度写不进 localStorage（P1）

Explore 报告：`grammar_lesson_states:${userId}` 只在有 userId 时写入。未登录用户学完一课**无提示**，回来后进度丢失。

**建议**：
- 未登录时在 Lesson 详情顶部提示"登录以保存进度"
- 或允许写 anonymous localStorage，登录后合并

### 2.6 死代码 Tab type `'practice'`（**已修**）

原 `type Tab = 'chapters' | 'practice' | 'library'`，但主页只挂载 chapters 和 library。

**状态**：已在 batch 3 改为 `'chapters' | 'library'`，但 `PracticeTab` 组件（300+ 行）仍存在。保守起见暂不删，待确认后再清。✅

### 2.7 `GrammarCardView` 12 步流程步骤号错位（P2）

step 索引在动态组装时会跳过不存在的字段（如没有 `conceptCompare` 就跳过），可能导致用户看到"第 3/8 步"下面直接跳到"第 5/8 步"。

**建议**：进度条显示 `step + 1 / total`，其中 total 是动态计算的实际步数，避免"跳号"。看代码是已经这样做了（`step + 1 / total`），但 total 依赖动态数组，需人肉验证在有/无 conceptCompare 情况下都对。

### 2.8 移动端底部悬浮翻页导航层级（P1）

Explore 报告：`bottom: calc(56px + safe-area)`，`zIndex: 60`。

参考用户 memory `feedback_bottom_nav_zindex`：**zIndex:60 + bottom:calc(56px+safe-area)**  已多次犯同一错误（bottom nav 覆盖翻页按钮或反之）。

**待验证**：GrammarCardView 底部翻页 vs 全站 bottom nav 是否会互相遮挡。

---

## 三、"继续学习"横幅逻辑

Explore 报告：顶部横幅推荐"当前进度中最优的一课"。但当前实现（page.tsx 附近）：

- 如果所有课都 not_started → 推第一课
- 如果有 in_progress → 推最近打开的
- 如果全 completed → 推首次达成的下一课？（需验证）

**建议**：**加一句副标签**："上次学到 P3 第 5 课"，让用户明确定位。

---

## 四、Library tab（词库）与主流程割裂

Library tab 是纯粹的"语法点浏览"（用旧 `sentencePatterns` 数据），跟 chapters tab 的 GrammarCard 学习流程**完全无联动**。

**观察**：用户在 library 里"喜欢"某个语法点，不会同步到 chapters tab 的"进行中"。

**建议**：
- 短期：在每个 library 语法卡下加"跳转到对应 lesson"按钮（用 linkedGrammarIds 反查）
- 中期：合并两个 tab 或彻底废弃 library

---

## 五、汇总与优先级

| 优先级 | 问题 | 修法工时 |
|---|---|---|
| ✅ 已修 | tab 副标签 P17-P30 | - |
| ✅ 已修 | Tab type 死代码 | - |
| P0 | mistakes 双重消费 UI | 30min |
| P1 | Part 卡片胶囊冗余 | 15min |
| P1 | 未登录 progress 提示 | 30min |
| P1 | 移动端底部导航 zIndex 复核 | 30min 验证 |
| P2 | P17 进度条跳跃提示 | 15min |
| P2 | GrammarCardView 步骤号错位验证 | 30min 验证 |
| P3 | Library tab 联动 | 4h |
| P3 | PracticeTab 组件清除 | 30min 但影响未知 |

**建议实施顺序**：
1. **P0/P1**：一次性做完（约 2 小时）
2. **P2/P3**：视用户反馈决定

---

## 六、独立可测的验证清单

- [ ] 打开 Lesson 详情，桌面 + 移动 各截图三步：step0 / mistakes / done
- [ ] 暗色模式下同上（对比度 check）
- [ ] 未登录访问 → 学完一课 → 关掉 → 回来看进度是否丢失
- [ ] iPhone Safari 底部悬浮翻页 是否被 bottom nav 遮挡
- [ ] P17 学完一课，看进度条是否跳 20%
- [ ] mistakes 4 条的课，看"别踩坑"和"判断对错"是否内容相同
