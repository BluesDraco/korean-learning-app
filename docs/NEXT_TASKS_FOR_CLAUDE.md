# NEXT_TASKS_FOR_CLAUDE.md — 给 Claude Sonnet 的第一批任务

**约束**: 只做审查和小范围修复，不允许一次性大改。

## 任务 1: 代码审查 — 全局扫描 (预计 30 分钟)

逐文件检查以下问题，只报告不改：

1. **硬编码颜色**: 搜索 `#XXXXXX`、`rgb(`、`red`、`amber`、`yellow`、`green` 等在 TSX 中的使用，确认是否应该改用 CSS 变量适配暗色模式
2. **无 Suspense 包裹的 useSearchParams()**: 搜索所有 `useSearchParams()` 调用，确认所在组件被 Suspense 包裹
3. **button 嵌套 button**: 搜索 `<button` 内嵌套 `<button` 的 JSX
4. **setState during render**: 搜索在组件函数体中直接调用的 setState

**输出格式**: 每发现一个问题，报告文件路径:行号 + 问题描述。不要直接修改。

## 任务 2: 逐页可用性审查 (预计 1 小时)

逐个访问以下路由，记录页面的首次加载体验：

1. `/daily` — 今日工作台
2. `/course` — 30天课程地图
3. `/course/1` — Day 1 课程
4. `/korea/kpop` — KPOP 歌曲列表
5. `/korea/kpop/blackpink-hylt` — 歌曲详情 (确认音频可用)
6. `/korea/kpop/news` — 韩娱热帖
7. `/pronunciation` — 发音练习
8. `/shadowing` — 影子跟读列表
9. `/shadowing/1` — 影子跟读详情
10. `/reading` — 文章阅读
11. `/vocabulary` — 词汇库
12. `/grammar` — 语法
13. `/mine` — 我的页面
14. `/stats` — 统计
15. `/admin/dashboard` — 管理后台

**每页检查**: 是否白屏、是否有控制台报错、按钮是否能点击、数据加载是否正常

## 任务 3: 162 个未提交文件的审查 (预计 30 分钟)

当前 `git status` 显示 162 个 modified/deleted 文件。做以下检查：

1. 运行 `git diff --stat` 查看变更范围
2. 确认删除的文件 (`git status | grep deleted`) 是否都是有意为之
3. 确认没有 `.env` / `.env.local` / 密钥文件出现在待提交清单中
4. 列出建议的提交分组 (例如: "导航重构"、"KPOP 详情页"、"Bug 修复" 各一组)

**不要执行 commit**，只输出审查报告。

## 任务 4: 小范围修复 (仅限以下范围)

以下是小而明确的修复任务，不涉及架构改动：

### 4a. KPOP 音频 HEAD 请求优化
- **文件**: `src/app/korea/kpop/[id]/page.tsx`
- **问题**: 页面加载时用 HEAD 请求检查音频是否存在，但 56/57 首都有音频，这个检查可能拖慢首屏
- **修复**: 改为并行预检 + 默认假设有音频，只在加载失败时显示"暂无音频"

### 4b. 暗色模式遗漏检查
- **范围**: `src/components/`, `src/app/` 中所有使用硬编码颜色的组件
- **搜索**: `#[0-9a-fA-F]{6}` 和 `#[0-9a-fA-F]{3}` 在 TSX 文件中的出现
- **判断**: 哪些应该改用 CSS 变量，哪些是设计定稿 (如 KPOP 详情页的 C 常量)

### 4c. 移动端底部 TabBar 高亮修复
- **文件**: `src/components/mobile/BottomTabBar.tsx`
- **检查**: 当前路由高亮是否正确、五分组是否都有对应高亮逻辑

## 任务 5: 构建验证

每次修改后跑:
```bash
npx tsc --noEmit
npm run build
```

记录任何新的 type error 或 build error。

## 禁止

- 不要重构任何页面布局
- 不要改动 KPOP 歌曲详情页 (除 4a 外)
- 不要删除任何文件
- 不要新增 npm 依赖
- 不要改动 `src/lib/kpop/audioSegmentPlayer.ts`
- 不要改动 `src/data/navigation.ts` 的五分组结构
- 不要 commit 任何代码 (由用户自己决定何时 commit)
