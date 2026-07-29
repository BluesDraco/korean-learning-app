# 手机布局视觉诊断审查方案

> 起因：2026-07-29，用户逐屏核查发现大量"代码能跑但难看"的手机端视觉问题（播放按钮偏左、按钮挡字、孤立字母、拥挤表格），而这些页面此前都被 Claude 声称"已完成"。本方案用于系统化排查，杜绝"tsc/lint/build 过 = 完成"的假绿灯。

## 0. 一条铁律

**代码正确 ≠ 视觉正确。** tsc/lint/build 只验证代码能编译运行，不验证任何一个人看着是否舒服。今天四个 bug 无一是编译错误。**交付视觉修复前，必须在真实手机视口（375/390/430px）看到渲染结果**，Playwright 截图卡住/进不去页面时，如实说"未验证"，绝不用"源码层面正确"收尾。

---

## 1. 根因分类（今天四个 bug 的模式，都会复发）

| 模式 | 今天的实例 | 检测方法 |
|---|---|---|
| **A. 类名与 CSS 不匹配** | `.hr-confused-letter`(单数) 在 CSS 里没定义，元素裸奔无样式竖排 | grep JSX 里所有 `className`，逐一确认 CSS 有定义 |
| **B. 只写桌面/宽屏布局，手机端塌陷** | `.hr-cpos-row` 4列表格在 <720px 塌成竖排乱堆 | 每个 `grid-template-columns: 1fr 1fr...` 都要问：窄屏怎么办 |
| **C. 元素无居中机制，默认靠左** | `.ph-quiz-hero` 手机端漏了 flex 居中，播放按钮靠左 | 固定宽度块级元素(width:Npx 的 div)必须有居中父容器或 margin:auto |
| **D. 悬浮/绝对定位元素在手机遮挡内容** | 字母卡 `▶` 按钮 hover 显现逻辑在无 hover 的手机上定位错乱盖住字 | 所有 `position:absolute` + hover 显现的元素，手机端要么常显要么去掉 |
| **E. 变长内容+固定文案合成一句被溢出破版** | (前修) 用户名+文案 nowrap 截断 | 见 [[feedback_username_plus_text_composed_overflow]] |
| **F. 信息层次混乱：一格塞太多元素** | cpos 每 cell 塞 5 个 span，字号乱跳无主次 | 单个卡片/格子内 >4 个信息元素 = 需要重排 |

---

## 2. 七维逐屏检查清单（每个手机页面过一遍）

对每个页面、每个板块、每个交互状态（默认/点击后/答对/答错/空数据/超长内容）：

1. **溢出**：有没有横向滚动条？最窄 375px 灌真实长内容（长用户名、长韩语句、长释义）。量 `getBoundingClientRect()`，别信 scrollWidth。
2. **居中/对齐**：该居中的居中了吗？同排元素基线对齐吗？固定宽块有没有意外靠左？
3. **层次**：一眼能看出主次吗？主信息够大、次要信息够弱、元数据（"真人示范"这种）是不是根本该删？
4. **遮挡**：有没有元素盖住别的？绝对定位/悬浮按钮在手机上位置对吗？
5. **色彩噪音**：色块是不是太多打架？（cpos 三色块+卡片底=4层）。用色条/留白替代整块填色。
6. **触摸目标**：可点元素 ≥44px？点击区域和视觉区域一致吗？
7. **暗色模式**：切暗色，颜色 token 有值吗？对比度够吗？

---

## 3. 已知高危清单（本次扫描，待逐一验证）

- `whiteSpace:nowrap` 共 **18 处** tsx —— 每处确认：是"单独可截断字段"(OK) 还是"含必须完整显示的内容"(危险，见模式E)
- `display:'flex'` 横排 共 **66 处** —— 抽查含中文/韩文/长内容的，确认有 `min-width:0` + `flex-wrap` 或纵向降级（见 [[feedback_flex_bubble_text_clip]] [[feedback_inline_actions_squeeze_text]]）
- 固定 `width: 三位数px` 共 **6 文件** —— 确认窄屏不溢出
- **所有 `grid-template-columns` 多列** —— 逐个确认有 `@media (max-width)` 单列/竖排降级（这是模式B，今天 cpos 的病根）
- **所有内联 `<style>` 里定义的 hr-* / ph-* 类** —— 与 JSX className 对账，防模式A

---

## 4. 审查执行方式（避免踩过的坑）

- **dev 命令**：`npm run dev`（默认 webpack，Next16 无 --no-turbo），Playwright 用 `domcontentloaded` 不用 `networkidle`（见 [[feedback_dev_command_next16]]）
- **不杀端口**：只操作 3000，禁 taskkill 全局 node（见 [[feedback_dev_server_no_kill]]）
- **多人协作**：确认是否有其他窗口在改同一文件；共享 dev 编译中间态会给假结果，别在不稳定的 dev 上反复试探
- **截图陷阱**：先关弹窗/登录引导再截（见 [[feedback_audit_dismiss_modals]]）；响应式首帧假象要强制 reflow（见 [[feedback_playwright_responsive_firstframe]]）
- **判断缺陷先度量证伪**：报"裁切/溢出/偏移"前量 rect，别凭读图几何错觉（见 [[feedback_visual_bug_verify_by_dom]]）
- **改全局/CSS 变量/主题类 = 翻转型改动**，副作用面 = 全站，改后验对称场景（见 [[feedback_global_toggle_fix_side_effects]]）

---

## 5. 建议的推进顺序

1. **韩语四十音板块（/phonetics）**：今天暴露最集中，先全板块逐 tab（辅音/元音/规则/练习）过一遍七维清单——**不要只对答案（查已修的），要审没被指出的角落**（见 [[feedback_audit_lamppost_not_answer_checking]]）
2. 今日页 /daily、我的页 /mine（含正在重构的 HeroFourCards）
3. 日记 /diary、博客 /blog、电台 /radio、图书馆 /reading 等定高沉浸页（矮视口高危，见 [[feedback_ipad_landscape_short_viewport]]）
4. 练习/语音等交互重页

每板块产出：截图 + 问题清单（按七维分类）+ 修复，逐条打勾，**不批量说"完成"**。
