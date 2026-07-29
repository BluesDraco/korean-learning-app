# CLAUDE.md — Tori Korean 项目

## 项目
韩语学习 PWA。Next.js 16 + React 19 + Tailwind v4 + Turso + IndexedDB。
部署: https://torikorean.com | 服务器: 207.57.134.171:17478

## 命令
```bash
npm run dev -- --no-turbo   # 开发（禁用 Turbopack）
npx tsc --noEmit             # 类型检查
npm run lint                 # Lint
npm run build                # 构建
```
每次改完代码必须跑 tsc + lint + build 三步全过才算完成。

## P0 级禁令（违反=灾难）
1. **🔥 禁止 git 回滚/重置/丢弃未提交文件** — 包括但不限于 `git reset --hard`、`git checkout -- <file>`、`git checkout <commit>`、`git restore`、`git clean -f`、`git stash drop`、`git rebase`。这类操作直接销毁未提交工作，多次导致全部记录丢失。**唯一允许的 git 操作：`git status`、`git diff`、`git log`、`git add`、`git commit`。** 其他任何 git 命令必须先问用户。
2. 禁止删除 data/ 目录 — app.db 是全部用户数据
3. 禁止在 Windows 构建后部署到 Linux — @libsql/client 跨平台不兼容
4. 部署前必须备份数据库到 /www/backup/torikorean/
5. 禁止对 Audio 元素设置 crossOrigin='anonymous' — COS 无 CORS

## 禁止改动
- src/lib/kpop/audioSegmentPlayer.ts — 已稳定
- src/data/kpopTracks.ts 的 URL 生成逻辑
- src/app/korea/kpop/[id]/page.tsx — 600行 inline styles 是有意的
- 禁止删除任何已有路由/页面/数据文件
- 禁止添加新 npm 依赖除非用户明确要求
- 禁止用 Turbopack
- 禁止删除 AGENTS.md

## 工作规则
0. ponytail 模式默认开启 — 最少代码量解决问题，不抽象不预判
1. 先搜后改 — 收到修改指令先 grep 全库，列出所有需改位置
2. 逐条打勾 — 每改完一处输出 ✅ X/Y，禁止只说"完成了"
3. 交付前反向验证 — 说"完成"前必须 grep 反向确认无遗漏
4. 改完跑 tsc + lint + build 三步
5. 不删旧模块，不大重构，只做增量改动和定向修复
6. 先收口导航再改详情页，不要同时改

## 代码审查5维度（每次必做）
1. 功能接通：UI按钮有handler，handler真正调了API/DB
2. 数据流完整：types/index.ts + db.ts + server/db.ts 三处同步
3. SSR安全：window/document/navigator 必须在 useEffect 或 typeof window 守卫内
4. 边界异常：空值保护、wrong≠correct、DB写失败不误标成功
5. 状态清理：组件卸载时 abort 异步操作、重置 state

## 响应式规则（改布局/视觉/修响应式 bug 必查）
完整框架见 `docs/responsive.md`「十维审查框架 + 设备测试矩阵 + 验证纪律」。核心红线：
- **高度轴**：iPad 横屏是"宽够但矮"（宽 1024-1194 命中桌面布局 / 高仅 740-834）。桌面显示器永远复现不出矮视口 bug（电台点不到暂停就是漏了这个）。
- **定高+溢出轴**：`height:100dvh + overflow:hidden` 布局，内部承载主操作的区必须 `flex:1 + min-height:0 + overflow-y:auto` 弹性滚动，关键按钮区 `flex-shrink:0` 钉底。禁止固定 height + flex-shrink:0 硬堆（矮屏裁控件）。
- **zoom 补偿轴**：`globals.css` body 在 1024-1279（zoom:0.92）/ 1280-1399（zoom:0.96）缩放视口坐标系。新增 `fixed + 100dvh` 容器必须在这两档手动补偿高度，否则底部被裁。
- **回归/影响面**：改全局开关/CSS 变量/主题类是"翻转型改动"，副作用面 = 全站，按页面类目枚举（①AppShell 普通页 ②全屏页 ③public HTML，第三类最易漏）。改前声明影响面，改后验对称场景。
- **验证**：静态 grep 不算通过，判溢出/裁切逐元素量 `getBoundingClientRect()`（别信 scrollWidth）。无 iPad/手机时代码改完必须交用户真机验收，绝不自称已验证。

## PWA 顶部安全区规则（新建/改顶栏必查）
全站 `layout.tsx` 设 `statusBarStyle: 'black-translucent'` + `viewportFit: 'cover'`，PWA 加主屏(standalone)后状态栏透明覆盖页面顶部。普通浏览器有地址栏占位看不出，PWA 全屏后顶栏会被灵动岛/状态栏压住（点不到返回键）。桌面/Playwright 复现不出（env 恒 0），必须真机 PWA 验证。
- **普通页**走 AppShell mobile 分支，已有 `h-[8px] pt-safe` 全局兜底，无需处理。
- **全屏页**（isFullscreenPage：/、diary、blog、radio、reading、practice/[slug]、companion/[id]、map、membership、auth）AppShell 直接 return children，**顶栏第一个可见元素必须自己垫 `env(safe-area-inset-top)`**。
- **public/*.html 静态页**（animal-city / lumi-paw / sticker）完全不走 AppShell，顶栏 `top`/`padding-top` 必须带 env()，标记注释 `PWA-SAFE-TOP`，复制新建时勿删。
- 写法：sticky/relative 顶栏 `padding-top: calc(Npx + env(safe-area-inset-top,0px))`；fixed/absolute 浮层 `top: calc(Npx + env(...))`；固定高度 topbar 用 `height: calc(Npx + env(...))` + padding-top。**同一 class 若有 @media 手机覆盖，两处都要带 env()**，否则覆盖会撤销修复。

## 40音规则
40音必须用真人录音 MP3（/audio/phonetics/），禁止回落 TTS。
audioRegistry.ts 注册 key 后才能播放，不能直接调 TTS API。
合成音节（한等）允许 TTS。

## 数据流三件套（新增持久化数据必查）
1. src/types/index.ts — 导出类型
2. src/lib/db.ts — 注册 CloudTable
3. src/lib/server/db.ts — CREATE TABLE
三者缺一算未完成。

## 颜色体系
ink #241917 | muted #89756e | line #eee0d8 | pink #ff7fa8 | mint #aee3d8
black #201815 | pinkSoft #fff0f5 | mintBg #eaf8f5 | bg #fffbf7

## 沟通偏好
简短直接，中文，不写冗长解释，不在每轮结尾总结，不过度确认。

## 关键文件
| 文件 | 说明 |
|------|------|
| src/lib/tts.ts | TTS主逻辑，走speak()不直接调API |
| src/lib/db.ts | 客户端IndexedDB |
| src/lib/server/db.ts | Turso连接+表迁移 |
| src/lib/server/auth.ts | getAuthFromCookie() |
| src/types/index.ts | 全部TS类型，新类型追加末尾 |
| src/data/navigation.ts | 五分组导航 |
| src/data/kpopSongs.ts | 57首歌+时间轴歌词 |
| src/data/grammar-cards.ts | 语法卡片 P1-P8 |

## Skill 声明（强制）
回复第一行必须写：`🎯 Skills: [skill名]` 或 `🎯 Skills: 无`
禁止虚假声明 — 说了用就必须真用了。
