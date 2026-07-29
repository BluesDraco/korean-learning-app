# 响应式设计规范

> **改任何响应式/视觉前，先过 [十维审查框架](#十维审查框架) + [设备测试矩阵](#设备测试矩阵)。**
> 过去的教训：审查只有"宽度"一个维度、用桌面环境验证（复现不出真机问题）、把局部修复当全面完成 → 审查后仍冒新 bug。本规范把审查升级成"按固定维度机械覆盖 + 强制真机验收 + 改动影响面分析"。

## 十维审查框架

每次响应式工作（新页面 / 改布局 / 修 bug）**逐维过一遍**，不凭记忆抽查。每一维都来自本项目真实踩过的坑（括号内是 memory 出处）。

| # | 维度 | 检查什么 | 怎么测 |
|---|---|---|---|
| 1 | **宽度轴** | 断点 768/1024/1280 布局正确切换 | 桌面拖宽 + Playwright 分档截图 |
| 2 | **高度轴** ⚠️新 | 矮视口内容不裁；关键操作按钮（播放/暂停/提交）在视口内 | `@media max-height:860` 档 + iPad 横屏真机 |
| 3 | **定高+溢出轴** | `height:100dvh + overflow:hidden` 布局，内部主区必须 `flex:1 + min-height:0 + overflow-y:auto` 弹性滚动，不能固定 height + flex-shrink:0 硬堆 | grep 全库定高清单逐个量；DOM 查内部有无弹性滚动 |
| 4 | **zoom 补偿轴** | 新增 `fixed + 100dvh` 容器在 body zoom 0.92/0.96 两档下补偿高度 | 1024-1279 / 1280-1399 两档实测容器底部不裁 |
| 5 | **PWA 安全区轴** | 三类页顶栏都垫 `env(safe-area-inset-top)`：①AppShell 普通页（有全局兜底）②全屏页（逐个补）③public HTML（逐个补） | 真机 PWA 加主屏，看顶栏不被灵动岛/状态栏压住 |
| 6 | **flex 收缩轴** | 横向 `min-width:0`（防气泡切字）+ 纵向 `min-height:0`（防控件裁切）；flex 子项默认 min-size:auto **不收缩**是万恶之源 | 最窄视口塞真实长内容；逐元素量 rect |
| 7 | **内容溢出轴** | 真实长韩语（keep-all）+ 需登录/动态数据页富文本不右溢 | 登录 testuser/test1234 后逐元素量 `rect.right > 父`，**不看 scrollWidth**（overflow-x:clip 给假绿灯） |
| 8 | **触摸交互轴** | 可点元素 ≥44px；`hover:none` 无幽灵 hover；输入框防缩放（@media hover:none） | 手机真机点一遍 |
| 9 | **同级覆盖轴** | 改页面级布局要覆盖该页**全部 tab + 同级子页**，不只当前碰到那个 | grep tab 定义（`type Tab =` / `.hr-main-tab`）列全清单逐个过 |
| 10 | **回归/影响面轴** | 每个改动先声明影响面；全局开关/CSS 变量/主题类翻转型改动副作用面 = 全站 | 改前列影响面，改后回归验证对称场景 |

## 设备测试矩阵

取代模糊的"三档锚点"。响应式验收按此矩阵逐视口过：

| 设备 | 视口(宽×高) | 模式 | 重点维度 |
|---|---|---|---|
| iPhone 竖 | 390×844 / 430×932 | Safari + PWA | 6,7,8 |
| iPhone 横 | 844×390 | — | 2,3（矮） |
| **iPad mini 横** | **1024×768** | **PWA + Safari** | **2,3,4**（宽够但矮，命中桌面布局） |
| **iPad 10.9 横** | **1180×820** | **PWA + Safari** | **2,3,4** |
| iPad Pro 横 | 1366×1024 | PWA | 1,4 |
| 小笔记本 | 1280×800 | — | 4（zoom 0.96 档） |
| 桌面 | 1440×900+ | — | 1 |

**铁律**：iPad 横屏必测两种高度——PWA 全屏（~834pt）**和** Safari 带地址栏（~770pt），取最矮验证。桌面显示器（高 900-1400）永远复现不出矮视口 bug。

## 验证纪律

### 防"审查后仍出新问题"
- **静态 grep 结论不算通过。** 判溢出/裁切一律真实渲染 + 逐元素 `getBoundingClientRect()` 度量。绝不只看 `scrollWidth`/`docSW`（`overflow-x:clip` 会裁掉溢出给假绿灯）。
- **高危三连**（新板块 + 需登录/动态数据 + 富文本正文）：主代理亲自登录量，不采信子代理"无命中"。
- **无 iPad/手机时**：代码改完必须交用户真机验收 + 附勾选清单，**绝不自称已验证**。

### 防"修复引发新 bug"（回归纪律）
- **改动前写一行影响面声明**：这个改动还会波及哪些元素/页面？
- **翻转型改动**（全局开关 / CSS 变量 / 主题类，如 statusBarStyle default→translucent）：副作用面 = 原问题面 = 全站。按**页面类目**枚举——①AppShell 普通页 ②全屏页 ③public HTML，**第三类最易漏**（不走框架，默认思维想不到）。
- **改完回归验证对称场景**：改了"顶部"就验所有"顶部"，改了 flex 收缩就验所有同款容器。
- **底层兜底 > 逐页手补**：能加框架层默认（如全局 `pt-safe` 兜底）就别靠人逐页记。
- **诚实溯源**：不是所有"改完又坏"都是回归。区分 回归型 / 原生疏漏 / 环境固有，别把一轮 bug 全甩给"上次改坏了"。

## 判断规则（重要）

Tori Korean **三层响应式判断**，各自角色不同，请勿混用：

### 1. 骨架层（Skeleton）—— 决定「手机布局 vs 桌面布局」
**判断依据**：`视口宽 > 高 且 宽 ≥ 1024`（横屏方向 + 至少 iPad mini 横屏）

- 代码位置：`src/lib/useIsMobile.ts` 的 `useIsDesktop()`
- CSS 位置：`@media (orientation: landscape) and (min-width: 1024px)`
- 生效范围：AppShell 双 shell 切换、scene.css `.spv2-phone/.spv2-desktop`、diary.css `.diary-compare .phone/.desktop`、`.diary-list-layout`、`.diary-v4-layout`、globals.css 的 `.desktop-app / .mobile-only / .desktop-only`

**关键契约**：`useIsDesktop` 的阈值、diary.css / scene.css 的 `(min-width: 1024px)`、globals.css 的 `.desktop-app { max-width: 1023px { display: none } }` 必须三者同步。改任何一处都要一起改。

**覆盖矩阵**：

| 设备 | 视口 | 布局 |
|---|---|---|
| iPhone 竖 | 430×932 | 手机 |
| iPhone 横 | 932×430 | 手机（<1024） |
| iPad mini 竖 | 768×1024 | 手机 |
| iPad Pro 竖 | 1024×1366 | 手机 |
| iPad mini 横 | 1024×768 | 桌面 |
| iPad Pro 横 | 1366×1024 | 桌面 |
| PC | 1440+ | 桌面 |

### 2. 内容层（Content）—— 桌面 shell 内部三档
**判断依据**：视口宽度 `min-width: 1024/1280`

- 代码位置：`globals.css` `.desktop-app` 三档（≥1280 全展 / 1024-1279 收窄 / <1024 手机）
- 生效范围：桌面 shell 内部 sidebar 宽度、右侧 panel 显隐、字号 gap

### 3. 细节层（Detail）—— Tailwind `md:` `lg:` `xl:`
**判断依据**：Tailwind 默认宽度断点（sm:640 / md:768 / lg:1024 / xl:1280 / 2xl:1536）+ 自定义 `xs:360`

- 生效范围：卡片列数、按钮尺寸、字号缩放、grid-cols

**三层关系**：
- 骨架层决定「进哪个 shell」
- 内容层决定「shell 内部结构」
- 细节层决定「元素样式细节」

## 断点契约（Tailwind v4）

在 `globals.css` 的 `@theme` 定义：

- `xs`  360 · 小手机（自定义）
- `sm`  640 · Tailwind 默认
- `md`  768 · 平板起
- `lg`  1024 · iPad Pro 竖屏 / 骨架切换点
- `xl`  1280 · 桌面起
- `2xl` 1536 · 大桌面

## 流体 token（`globals.css` @theme）

```css
--fs-caption: clamp(11px, 0.7vw + 6px, 13px);
--fs-body:    clamp(14px, 0.95vw + 8px, 17px);
--fs-lead:    clamp(16px, 1.2vw + 8px, 20px);
--fs-h3:      clamp(18px, 1.4vw + 10px, 24px);
--fs-h2:      clamp(20px, 1.8vw + 10px, 30px);
--fs-h1:      clamp(24px, 2.4vw + 8px, 40px);
```

用法：`style={{ fontSize: 'var(--fs-body)' }}`

## 触摸交互规则

- 所有可点元素 ≥ 44×44（Apple HIG）
- 全局兜底：`@media (max-width: 768px) { button, a, [role="button"] { min-height: 44px; min-width: 44px } }`
- **例外**：列表内相邻小图标按钮加 `.no-touch-min` 类 opt-out（避免误触），保持视觉尺寸 32×32 + 大 gap 死区
- 触屏 hover 兜底：`@media (hover: none) { ...:hover { transform: none; ... } }`，防止幽灵 hover 卡住

## 通用 CSS 模式

**卡片内 flex 防拆**：
- 父级 `flex-wrap: wrap`
- 文本容器 `min-width: 0; word-break: keep-all; overflow-wrap: normal`
- 图标/按钮 `flex-shrink: 0`

**pill 类元素永不折**：
```css
white-space: nowrap;
overflow-wrap: normal;
word-break: keep-all;
flex-shrink: 0;
```

**底部固定 nav**：`fixed bottom-0 z-[60] pb-[env(safe-area-inset-bottom)] px-safe`（骨架切换判断）

**页面主容器**：
```css
.page-container { max-width: min(1476px, 100% - 32px); }
```

## 已知限制

- **SSR 首屏**：`useIsDesktop()` 服务端返回 `false`，桌面用户首屏可能有 100ms 内容闪烁（先 mobile 后 desktop）。这是权衡 —— 用 mounted 门控会导致完全白屏
- **CarrotHelper `[style*="user-select"]`**：iOS 兜底选择器依赖 React 内联样式序列化格式，如换 CSS-in-JS 库会静默失效
- **`--fs-*` clamp token**：目前 0 处使用，为未来新组件预留
- **body zoom 补偿层（1024-1279 = 0.92 / 1280-1399 = 0.96）**：`globals.css` 顶部对整站 body 应用 zoom 来解决 iPad 横屏元素过大问题。副作用：
  1. 视口坐标系被间接缩放，任何 `position: fixed; height: 100dvh` 全屏容器都需要手动加高度补偿（当前已补：`.scene-practice-root` / `.diary-list-page` / `.diary-page`）
  2. Firefox 对 zoom 兼容性历史反复，非最新版可能表现异常
  3. **新加 fixed 全屏组件必须在这两档下手动核实是否需要补偿**

## 部署前必查

- `.env.local` TURSO 已注释
- tar 排除 `./data`
- 备份到 `/www/backup/torikorean/`
