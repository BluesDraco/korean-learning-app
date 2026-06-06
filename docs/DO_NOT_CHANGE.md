# DO_NOT_CHANGE.md — 禁止修改的清单

下列文件/模块/代码段已经定版，**不要重构、不要改布局、不要换技术方案、不要"优化"**。

## 绝对禁止修改

### KPOP 歌曲详情页
```
src/app/korea/kpop/[id]/page.tsx
```
- **状态**: 刚完成重构，匹配 HTML 设计稿
- **为什么不能改**: 用户反复调整才满意，600 行 inline styles 是有意为之
- **允许**: 修 bug、调颜色、加 loading 状态
- **禁止**: 改用 Tailwind、换布局、删除逐句卡片、合并按钮、移除播放器

### 音频播放器
```
src/lib/kpop/audioSegmentPlayer.ts
```
- **状态**: 已稳定，处理了 CORS、缓存竞态、超时兜底
- **禁止**: 加 `crossOrigin='anonymous'`（COS 无 CORS, 会导致 Chrome 阻止请求）、改加载逻辑、改 state machine

### COS 音频 URL 生成
```
src/data/kpopTracks.ts
```
- **禁止**: 改 COS base URL、改路径格式 `audio/kpop/{videoId}.webm`

### 导航配置
```
src/data/navigation.ts
```
- **状态**: 五分组架构已定版
- **允许**: 加新的子项、调顺序
- **禁止**: 删分组、改回旧架构、删除任何现有条目

### 旧模块 (只能改名/移动，不能删除)
```
src/app/learn/                    — 单元制学习
src/app/korea/culture/            — 韩国文化
src/app/korea/food/               — 韩国美食
src/app/korea/travel/             — 韩国旅行
src/app/messages/                 — 消息
src/app/diary/                    — 日记
src/app/tori/stickers/            — 贴纸
src/app/stats/                    — 成就/统计
src/app/typing/                   — 打字练习
src/app/writing/                  — 写作练习
src/app/topik/                    — TOPIK
src/app/pronunciation/            — 发音
src/app/dictation/                — 听写
src/app/reading/                  — 文章阅读
src/app/grammar/                  — 语法
src/app/vocabulary/               — 词汇
src/app/review/                   — 复习
src/app/learn/picture-books/      — 绘本
src/app/shadowing/                — 影子跟读
src/app/dictionary/               — 查词
src/app/auth/                     — 认证
src/app/admin/                    — 管理后台
src/data/kpopSongs.ts             — 歌曲数据
src/data/learningUnits.ts         — 单元学习数据
src/data/thirtyDayCourse.ts       — 30天课程数据
```

## 禁止修改的配置

### next.config.ts
- **CSP `media-src`** — 包含 COS 域名，改了会导致音频加载失败
- **`/korea/kpop/:path*` 的 Cache-Control** — 60s 短缓存是有意为之

### package.json
- **禁止新增 npm 依赖** 除非用户明确要求
- **禁止升级 Next.js / React 主版本** 除非用户明确要求

### 数据库
- **`src/lib/server/db.ts`** — 表 schema 不要改，现有表不要删列
- **Turso 连接配置** (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`) — 在 `.env.local`

## 禁止的部署行为
- **不要在 Windows 上构建传到 Linux** — `@libsql/client` 跨平台不兼容
- **不要改 SSH 端口 17478**
- **不要改 PM2 进程名 `torikorean`**
- **不要用 Turbopack** — 有内存溢出 bug

## 禁止删除的文件
- `AGENTS.md` — Next.js 16 Agent 兼容标记
- `.env.local` — 包含 API keys 和数据库连接
- `public/manifest.json` — PWA 配置
- `data/app.db` — 本地 SQLite 数据库
- `data/dict/` — 韩中词典文件
