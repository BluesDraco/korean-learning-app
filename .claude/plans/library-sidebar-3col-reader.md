# 图书馆侧栏 + 三栏阅读屏重做

## 背景 / 为什么

上一轮我把设计图（`Downloads/library-light-desktop.html`）里的**左侧栏**和**三栏阅读详情页**都砍掉了，判断错误。本次按设计图补回，分类保持"主题+难度"（不恢复动物作者）。

关键发现（决定了低风险实现路径）：
- 旧 reader（`src/app/reading/[id]/ArticleReaderClient.tsx`，1090 行）全靠 **~15 个 CSS 变量**着色（`--mint-soft` ×53、`--bg-card`、`--text-primary`…）。→ 在 library 作用域重映射这些变量即可换肤，**不重写 JSX**。
- 旧 reader 已有完整功能：7 步流、双查词（本地 `ArticleWord` gloss + AI `WordTapSheet`）、逐句 TTS、全文听力、收藏词/句、测验、输出、XP、IndexedDB 进度。全部保留。
- `/reading` 和 `/reading/[id]` 都是 `isFullscreenPage`（不挂全局 AppShell 外壳）→ 有干净画布放图书馆自己的侧栏。

已确认的三个方向（用户拍板）：
1. 补回图书馆专属侧栏（内容导航，与全局功能导航不重复，可共存）
2. 阅读详情页做成**三栏（正文 + 右栏进度环/生词/相关）**，测验/输出/结算**保留为读完后的后续步骤**
3. 分类保持主题+难度，不恢复动物作者

用户额外要求：**"HTML 三栏视觉有问题，自己合理优化"** —— 不照抄，按 UX 规范优化（见下）。

## 设计图规格（已提取，实现时依据）

- 侧栏 `.sidebar` 260px：品牌区（동물성 도서관 / Animal City Library）、搜索框、分组导航（읽는 中 / 按分类）、`.nav-item`（+active/hover/count 角标）、彩色圆点
- 三栏 grid：`sidebar 260px | 正文 1fr | 右栏 ~300px`
- 右栏 widget：环形进度（SVG，읽기 진행/还剩X分）、생词表（이 글에서 만난 단어）、相关（같은 작가의 다른 글 → 改为"같은 주제/난이도"）
- 全套 OKLCH 暖色 token（已在现有 `library.css` `:root`）
- 字体：Fraunces（display）+ Noto Serif SC（中）+ Pretendard（韩）

## 我要做的合理优化（不照抄 HTML）

1. **正文行长**：设计图正文全宽偏长，收窄到 `max-width: 68ch` 居中，符合最佳阅读宽度。
2. **右栏防拥挤**：设计图右栏三个卡片堆叠显重。改为：进度环 sticky 常驻；生词表/相关折叠或轻量化（少卡片、多留白）。窄屏（≤1100）右栏收起为顶部横条或抽屉。
3. **深色模式**：按规范降琥珀饱和 + 用表面提亮代替阴影（不是直接反色）。
4. **中韩混排**：韩文 Pretendard、中文 Noto Serif SC，行高分开调。
5. **侧栏 active 态**跟随当前分类/文章高亮。

## 实现步骤

### 阶段 1：共享侧栏组件
- 新建 `src/app/reading/_components/LibrarySidebar.tsx`（client）：props = 当前分类/文章、统计、筛选回调。
- 内容：品牌 + 搜索 + "읽는 中"（reading 状态文章）+ 按主题/难度导航 + 底部统计。
- 首页和详情页共用。

### 阶段 2：首页接入侧栏（`src/app/reading/page.tsx`）
- 外层改为 `.lib-shell`（grid: sidebar + main）。
- 主区保留现有 hero/stats/主题分区/筛选/搜索，去掉顶部面包屑里的重复导航（搜索移入侧栏或保留双份待定）。
- 手机端：侧栏转抽屉（汉堡按钮），主区全宽。

### 阶段 3：阅读详情页三栏化（`ArticleReaderClient.tsx`）
- 最外层包 `.lib-scope .lib-reader`，注入 library 侧栏。
- **CSS 变量重映射**：在 `.lib-reader` 作用域把 `--mint-soft`→琥珀、`--bg-card`→暖表面 等 15 个变量重定义，一次性给 7 步换肤，不动 JSX 结构。
- **reading 步骤**改三栏：现有"正文 + 逐句拆解"两列 → 正文列（内联点词，收窄 68ch）+ 右栏（进度环 SVG + 生词表 = 已收藏词 + 相关文章 = 同主题/难度）。
- 测验/输出/结算：保留为 reading 之后的步骤，套用换肤 token。
- 全文听力按钮保留。

### 阶段 4：library.css
- 加 `.lib-shell`（grid）、`.sidebar` 全套、`.lib-reader` 变量重映射块、右栏 widget（`.progress-ring`/`.vocab-list`/`.related`）、响应式（≤1100 收右栏、≤900 侧栏转抽屉）。
- 复用上一轮已建的卡片/hero/stats/chips 样式。

### 阶段 5：验证
- tsc + lint + build 三步全过。
- Playwright 实测：首页（桌面/手机 × 明/暗）侧栏+抽屉、详情页三栏（桌面/手机 × 明/暗）、点词查词、全文听力、测验流转、右栏进度环。
- 清理临时脚本。**不部署**（等用户说）。

## 风险 / 不做

- **不重写 reader 的 7 步 JSX**（换肤靠变量重映射，降风险）。
- **不恢复动物作者**分类。
- 侧栏搜索与首页顶部搜索可能短暂重复，阶段 2 视觉定稿时决定去留。
- 跟读录音仍不在本次范围（另立任务）。

## 涉及文件
- 新增：`src/app/reading/_components/LibrarySidebar.tsx`
- 改：`src/app/reading/page.tsx`、`src/app/reading/[id]/ArticleReaderClient.tsx`、`src/app/reading/library.css`
