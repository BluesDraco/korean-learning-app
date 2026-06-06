# CLAUDE.md — 韩语学习日记 (Tori Korean) 项目交接指南

## 项目简介

面向 KPOP/韩娱兴趣用户的韩语自学工具箱 PWA。核心不是"系统教你韩语"，而是把用户感兴趣的韩语内容变成**能看懂、能听、能唱、能拆解、能保存、能复习的材料**。

- **产品名**: Tori Korean / 한국어 학습
- **部署域名**: https://torikorean.com
- **服务器**: 207.57.134.171 (宝塔面板), SSH 端口 17478
- **数据库**: Turso (libsql, Tokyo 区域) + 客户端 IndexedDB (Dexie.js)

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Next.js 16.2.6 App Router + React 19.2.4 |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS v4 (PostCSS 插件, 无 config 文件) + 部分 inline styles |
| 服务端数据库 | Turso (@libsql/client) — 用户、进度、KPOP 数据 |
| 客户端数据库 | Dexie.js (IndexedDB) — SRS 状态、学习日志、离线缓存 |
| 认证 | JWT (jose) + bcryptjs, httpOnly cookie |
| AI | DeepSeek API (api.deepseek.com/anthropic 端点, 5 个场景) |
| TTS | 浏览器 speechSynthesis (lang='ko-KR', rate=0.75) |
| 图表 | Recharts 3.8 |
| 图标 | Lucide React |
| 音频 | 腾讯云 COS (香港) + 自定义 SegmentPlayer |

## 启动 / 构建 / 检查命令

```bash
# 开发 (必须用 webpack，Turbopack 有内存 bug)
npm run dev -- --no-turbo

# TypeScript 检查
npx tsc --noEmit

# Lint
npm run lint

# 生产构建
npm run build

# 构建后启动
npm start
```

**验证标准**: 每次修改后必须 `tsc --noEmit` 零错误 + `npm run build` 通过才能部署。

## 部署流程

**严禁在 Windows 上构建后传到 Linux！** `@libsql/client` 跨平台不兼容。必须在服务器上构建。

```bash
# 1. 本地打包源码 (排除重型目录)
tar --exclude='node_modules' --exclude='.next' --exclude='.git' --exclude='*.tar.gz' -czf ../source.tar.gz .

# 2. 上传到服务器 (SSH 端口 17478)
scp -P 17478 ../source.tar.gz root@207.57.134.171:/www/wwwroot/torikorean.com/

# 3. 服务器构建 + 重启
ssh -p 17478 root@207.57.134.171 \
  "export PATH=/www/server/nodejs/v26.2.0/bin:\$PATH && \
   cd /www/wwwroot/torikorean.com && \
   tar -xzf source.tar.gz && \
   npm run build && \
   pm2 restart torikorean"

# 4. 验证
curl -sI https://torikorean.com
```

PM2 路径: `/www/server/nodejs/*/bin/pm2` (Node.js 管理器在宝塔面板下)

## 当前核心模块

### 导航架构 (五分组, 文件: `src/data/navigation.ts`)

| 分组 | 路由 | 内容 |
|---|---|---|
| 今日 (오늘) | `/daily` | 今日工作台、继续学习/跟唱/阅读、今日复习、学习概览 |
| 我的 (내 정보) | `/mine` | 我的词/句子/文章/笔记/练习/录音/跟唱/日记/成就/消息 |
| 工具 (도구) | `/tools` | 内容拆解、查词翻译、发音跟读、听写、闪卡复习、文章拆解、语法、打字、写作、AI陪练 |
| 学习 (학습) | `/learning` | 30天入门、韩文字母、场景模板、TOPIK、发音/阅读/写作入门 |
| 探索 (탐색) | `/explore` | KPOP跟唱、韩娱热帖、影子跟读、绘本馆、韩国小知识、韩剧表达 |

### 关键页面

| 路由 | 说明 | 状态 |
|---|---|---|
| `/daily` | 今日任务聚合器，从课程/SRS/发音/阅读/输出拼装任务 | 已上线 |
| `/course` | 30 天课程地图，有进度状态 | 已上线 |
| `/course/[day]` | 单日课程 (LessonEngine) | 已上线 |
| `/korea/kpop` | KPOP 歌曲列表 | 已上线 |
| `/korea/kpop/[id]` | 歌曲详情页 — 逐句卡片 + 原唱/读音播放 + 跟唱录音 | 刚重构 |
| `/korea/kpop/news` | 韩娱热帖列表 | 有限内容 |
| `/korea/kpop/news/[id]` | 热帖详情 (逐词拆解) | 有限内容 |
| `/learn` | 旧单元制学习 (保留) | 已上线 |
| `/pronunciation` | 发音练习 (Phase 1: 录音/回放/对比, 无 AI 评分) | 已上线 |
| `/shadowing/[id]` | 影子跟读 | 已上线 |
| `/reading/[id]` | 文章拆解阅读 | 有限内容 |
| `/admin/*` | 管理后台 (仅 users 表真实, 其余数据归零) | 已上线 |
| `/auth/login`, `/auth/register` | 注册登录 | 已上线 |

### 数据层

```
src/data/       — 静态数据 (歌曲、课程、词汇、文章等)
src/lib/server/db.ts  — Turso 连接 + 20+ 表的迁移
src/lib/db.ts   — 客户端 IndexedDB (Dexie)
src/types/index.ts    — 全部 TypeScript 类型 (~620行)
src/types/kpop.ts     — KPOP 专用类型
```

## 已定版 UI 规范

### 禁止删除/改名的模块

绘本、韩国文化、韩国美食、韩国旅行、私信/消息、日记、Tori贴纸、成就中心、打字练习、写作练习、TOPIK、发音、听写、文章阅读、语法、词汇、复习

这些模块**只允许**: 改名、移动导航分组、隐藏重复入口、改 UI、复用底层能力。**严禁删除路由/数据/组件**。

### 文案原则

**禁止**: 系统课程、30天学会韩语、专业发音评分、AI老师、官方语法大全
**推荐**: 自学模板、今日工作台、内容拆解、跟读录音、语法解释、韩文打字、韩娱热帖、歌词跟唱、我的学习资料

### 颜色体系

| Token | 色值 | 用途 |
|---|---|---|
| ink | `#241917` | 主文字 |
| muted | `#89756e` | 次要文字 |
| line | `#eee0d8` | 分割线 |
| pink | `#ff7fa8` | 强调色 |
| mint | `#aee3d8` | 辅助色 |
| black | `#201815` | 深色按钮 |
| pinkSoft | `#fff0f5` | 粉色按钮背景 |
| mintBg | `#eaf8f5` | 薄荷按钮背景 |
| bg | `#fffbf7` | 页面背景 |

### 响应式策略

- **手机端 (< 768px)**: App 化界面，底部五栏 TabBar，卡片+图标宫格
- **平板/电脑 (>= 768px)**: 侧边栏布局，208px 宽度 (w-52)

## KPOP 模块要求

### 歌曲详情页 (`/korea/kpop/[id]`) — 已定版，不要大改

**文件**: `src/app/korea/kpop/[id]/page.tsx` (~600行, inline styles)

核心体验：
- 逐句歌词卡片，每卡三行：韩文+原唱按钮 / 罗马音+读音按钮 / 中文翻译
- 底部固定栏：上一句 / 跟唱录音 / 下一句
- 顶部：封面图 + 歌名 + 歌手 + 标签 + 整首播放器(进度条)
- 音频：使用 `SegmentPlayer` (`src/lib/kpop/audioSegmentPlayer.ts`) 从完整音频切段播放
- "原唱"按钮：正常速度播放该句片段
- "读音"按钮：慢速 (0.75x) 播放该句片段
- 整首播放：`sp.playSegment(0, 9999999, false, slowMode)`

### 音频文件状态

- 完整歌曲音频：56/57 首在 COS (`https://torikorean-1436752408.cos.ap-hongkong.myqcloud.com/audio/kpop/{videoId}.webm`)
- 缺失：`VyQz1XZqDLg` (IZ*ONE - FIESTA, 香港区域限制)
- **逐句音频 (`lines/` 和 `spoken/` 目录) 不存在！** 目前用 SegmentPlayer 从完整音频切段代替，效果正常

### COS 存储

- Bucket: `torikorean-1436752408.cos.ap-hongkong.myqcloud.com`
- **不要设置 `crossOrigin='anonymous'`！** COS 没有 CORS 配置，设为 anonymous 会导致 Chrome 阻止请求
- CSP 已配置 `media-src 'self' data: blob: https://torikorean-1436752408.cos.ap-hongkong.myqcloud.com`

### kpopTracks.ts 说明

- `src/data/kpopTracks.ts` 包装 `kpopSongs.ts` 为 `KpopTrack` 类型
- `lineAudioUrl` 和 `spokenAudioUrl` 字段指向不存在的逐句文件 (COS `lines/` 和 `spoken/` 目录没有文件)
- 当前页面不依赖这些 URL 进行播放，用的是 SegmentPlayer 切段

### 歌曲数据

- `src/data/kpopSongs.ts` — 57 首歌曲，含时间轴歌词（秒级）
- `src/data/kpopHotPosts.ts` — 韩娱热帖数据

## 韩娱热点阅读模块 (`/korea/kpop/news`)

**文件**: `src/data/kpopHotPosts.ts`, `src/types/kpop.ts` (KoreanHotReading 等类型)

- 每帖至少 1 句韩文原句 + 中文解释 + 可展开逐词拆解
- 不做评论区、论坛、用户发帖
- **当前内容有限，需要扩充**

## 我的资料库 (`/mine/*`)

- `/mine/words`, `/mine/sentences`, `/mine/articles`, `/mine/notes`, `/mine/practices`, `/mine/recordings`, `/mine/kpop`, `/mine/diary`
- 数据存储在 Turso 对应表中
- 部分子页面功能可能不完整

## Agent 工作规则

### 必须遵守

1. **每次会话开始时检查是否有残留 plan 文件** — 必须询问用户是否要执行，不能假设已批准
2. **写完代码后推演验证** — 编译通过不等于正确，必须跑 `tsc --noEmit` + `lint` + `build` 三步
3. **不要删除旧模块** — 见上方"禁止删除的模块"
4. **不要重构已有页面** — 只做小范围修复和增量改动
5. **先收口导航，再做详情页** — 不要同时改导航和页面
6. **在服务器上构建** — 不要 Windows 构建后传到 Linux
7. **不要恢复旧版 UI** — KPOP 详情页已用 inline styles 匹配设计稿，不要改用 Tailwind 或换布局

### 沟通规则 (用户偏好)

- 简短直接，不用 emoji
- 中文交流
- 不写冗长解释
- 不在每轮结束时做总结
- 不过度确认和询问

## 禁止事项

1. **禁止删除任何路由/页面/数据文件** — 只能改名、移动、隐藏
2. **禁止重构 KPOP 歌曲详情页** — 刚定版，600行 inline styles 是有意为之
3. **禁止给 Audio 元素设置 `crossOrigin='anonymous'`** — COS 无 CORS
4. **禁止在 Windows 上构建后部署**
5. **禁止改动 `src/data/kpopTracks.ts` 中的 URL 生成逻辑** — COS 路径是约定好的
6. **禁止改动 `src/lib/kpop/audioSegmentPlayer.ts`** — 已稳定
7. **禁止删除 `AGENTS.md`** — Next.js 16 的 Agent 兼容标记
8. **禁止用 Turbopack** — 有内存溢出 bug
9. **禁止添加新的 npm 依赖** 除非用户明确要求
10. **禁止创建不需要的 .md 文档文件** 除非用户明确要求
