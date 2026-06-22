# CLAUDE.md — 韩语学习日记 (Tori Korean) 项目交接指南

## 项目简介

面向 KPOP/韩娱兴趣用户的韩语自学工具箱 PWA。核心不是"系统教你韩语"，而是把用户感兴趣的韩语内容变成**能看懂、能听、能唱、能拆解、能保存、能复习的材料**。

- **产品名**: Tori Korean / 한국어 학습
- **部署域名**: https://torikorean.com
- **服务器**: 207.57.134.171 (宝塔面板), SSH 端口 17478
- **数据库**: Turso (libsql, Tokyo 区域) + 客户端 IndexedDB (CloudTable)

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | Next.js 16.2.6 App Router + React 19.2.4 |
| 语言 | TypeScript 5 |
| 样式 | Tailwind CSS v4 (PostCSS 插件, 无 config 文件) + 部分 inline styles |
| 服务端数据库 | Turso (@libsql/client) — 用户、进度、KPOP 数据 |
| 客户端数据库 | CloudTable (IndexedDB 封装) — SRS 状态、学习日志、离线缓存 |
| 认证 | JWT (jose) + bcryptjs, httpOnly cookie |
| AI | DeepSeek API (api.deepseek.com/anthropic 端点, 5 个场景) |
| TTS | Edge-TTS (自建 API, SunHi/InJoon 韩语神经语音) 为主，浏览器 speechSynthesis 兜底 |
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

**推荐使用 `/tori-deploy` skill**，它会自动执行以下全部步骤。

**手动部署（skill 不可用时）：**

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
   find .next/static -type f \( -name '*.js' -o -name '*.css' \) -exec brotli -f {} \; && \
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
src/lib/db.ts   — 客户端 IndexedDB (CloudTable)
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

### 代码审查五维度

每次完成功能后，必须按以下五个维度逐一审查，不能只靠编译通过就报告完成：

**维度1：功能是否真正接通**
- 新增的 UI 按钮/交互，是否有对应的 handler？
- handler 是否真正调用了 API / DB / 状态更新？
- 不能只写了 UI 没写逻辑，也不能只写了逻辑没有触发入口

**维度2：数据流是否完整**
- 新增数据类型：`src/types/index.ts` 是否导出？
- 新增 CloudTable：`src/lib/db.ts` 是否注册？
- 新增数据库表：`src/lib/server/db.ts` 是否建表？
- 三者缺一不可，任何一环断掉都算未完成

**维度3：SSR 安全**
- 所有访问 `window` / `document` / `navigator` / `localStorage` 的代码，必须在 `useEffect` 内或有 `typeof window !== 'undefined'` 守卫
- 不能在组件顶层同步调用浏览器 API（会导致 hydration 错误或 SSR 时永远返回 false）

**维度4：边界与异常**
- 空值/undefined：新字段如果可选，渲染前必须有空值保护（`field && ...` 或 `field || ''`）
- 相等值：wrongPart === correctPart 这类无意义对比必须过滤
- 错误状态：DB 写失败不能误标成功，API 失败要有 fallback

**维度5：状态清理**
- 切换场景/组件卸载时，正在进行的异步操作（录音、识别、定时器）必须终止
- useEffect cleanup 函数必须 abort/cancel 所有副作用
- 再来一轮/返回场景时，所有相关 state 必须重置到初始值
7. **不要恢复旧版 UI** — KPOP 详情页已用 inline styles 匹配设计稿，不要改用 Tailwind 或换布局

### 沟通规则 (用户偏好)

- 简短直接，不用 emoji
- 中文交流
- 不写冗长解释
- 不在每轮结束时做总结
- 不过度确认和询问

## 40音真人录音规则（强制执行）

所有 40音（21个元音 + 14个辅音 + 5个紧音）的发音**必须使用真人录音静态 MP3**，禁止回落到 TTS 合成。

### 文件映射

| 类型 | 文件范围 | audioRegistry key |
|------|----------|-------------------|
| 元音 | `/audio/phonetics/v-01.mp3` ~ `v-21.mp3` | 元音字母本身：아/야/어/여/오/요/우/유/으/이/애/얘/에/예/와/왜/외/워/웨/위/의 |
| 辅音 | `/audio/phonetics/c-01.mp3` ~ `c-14.mp3` | 字母名称（기역/니은…）**和** CONSONANT_DEMO 音节（가/나/다…） |
| 紧音 | `/audio/phonetics/c-15.mp3` ~ `c-19.mp3` | 字母名称（쌍기역/쌍디귿…）**和** CONSONANT_DEMO 音节（까/따/빠/싸/짜） |

### 注意事项

- `ㅇ` 的 CONSONANT_DEMO 是 `아`，与元音 v-01 冲突 — **不覆盖**，ㅇ 通过 `이응` 键播放
- `한` 是合成音节（ㅎ+ㅏ+ㄴ），不属于 40音范畴，允许 TTS 合成
- 任何新增发音功能若涉及单个자모/40音字母，必须先在 `src/lib/audio/audioRegistry.ts` 注册 key，不能直接调 TTS API
- `SyllableComposer` 和 `pronunciation/` 模块处理任意音节组合，TTS 合成是预期行为，不受本规则约束

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
11. **【P0级】禁止对服务器 `data/` 目录执行任何删除操作** — `data/app.db` 是全部用户数据，无法恢复。部署清理命令必须包含 `! -name 'data'` 排除项
12. **【P0级】禁止在部署前跳过数据库备份步骤** — 每次部署必须先执行 Step 0 备份，备份存放于 `/www/backup/torikorean/`

## 代码地图

### 目录结构

```
src/
├── app/              # 页面 + API 路由
├── components/       # 公共组件
├── lib/              # 工具库
├── data/             # 静态数据
├── types/            # TypeScript 类型
└── middleware.ts     # JWT 验证，保护 /admin/*
```

### 关键页面文件

| 路由 | 文件 | 备注 |
|------|------|------|
| `/korea/kpop/[id]` | `src/app/korea/kpop/[id]/page.tsx` | **禁止重构**，600行 inline styles |
| `/grammar` | `src/app/grammar/page.tsx` | ~2500行 |
| `/course/[day]` | `src/app/course/[day]/page.tsx` | LessonEngine |
| `/topik` | `src/app/topik/page.tsx` | T35I/T35II 听力+阅读 |
| `/review` | `src/app/review/page.tsx` | SRS闪卡+默写+造句 |
| `/ai/chat` | `src/app/ai/chat/page.tsx` | 情景对话 |
| `/mine/vocabulary-mistakes` | `src/app/mine/vocabulary-mistakes/page.tsx` | 错题本 |

### 关键数据文件

| 文件 | 内容 |
|------|------|
| `src/data/aiScenarios.ts` | AI情景对话数据（10个情景） |
| `src/data/kpopTracks.ts` | KPOP歌曲（URL生成逻辑**禁止改动**） |
| `src/data/grammar-cards.ts` | 语法课程卡片（P1~P8） |
| `src/data/navigation.ts` | 五分组导航 |
| `src/data/shadowingClips.ts` | 影子跟读片段 |

### 核心库文件

| 文件 | 说明 |
|------|------|
| `src/lib/tts.ts` | TTS 主逻辑（Edge-TTS 为主 + 浏览器兜底），禁止直接调 `/api/tts/*`，必须走 `speak()` |
| `src/lib/db.ts` | 客户端 Dexie/IndexedDB，所有 CloudTable 在此注册 |
| `src/lib/server/db.ts` | Turso连接 + 所有表迁移，新表写在末尾 |
| `src/lib/server/auth.ts` | `getAuthFromCookie()` — 所有 API 路由认证入口 |
| `src/lib/audio/speechRecognition.ts` | KoreanSpeechRecognizer（Web Speech API封装） |
| `src/lib/kpop/audioSegmentPlayer.ts` | SegmentPlayer（**禁止改动**） |
| `src/types/index.ts` | 全部 TypeScript 类型，新类型追加到末尾 |
| `src/types/kpop.ts` | KPOP专用类型（含 LocalLyricLine） |

### 关键 API 路由

| 路由 | 说明 |
|------|------|
| `GET /api/tts/edge` | Edge-TTS 韩语语音合成，无需登录 |
| `POST /api/tts/aliyun` | 阿里云 NLS TTS（仅中文 `speakChinese()`），需登录 |
| `POST /api/ai/chat` | 情景对话 AI，需登录 |
| `POST /api/ai/sentence-judge` | 造句生成+判断（generate/judge），需登录 |
| `POST /api/ai/word-lookup` | 查词，公开，永久缓存 |
| `POST /api/ai/writing` | 写作批改，需登录 |

### 数据流三件套（新功能必查）

新增持久化数据时，以下三处必须同步：
1. `src/types/index.ts` — 导出类型接口
2. `src/lib/db.ts` — 注册 `CloudTable<T>`
3. `src/lib/server/db.ts` — `CREATE TABLE IF NOT EXISTS`

---

## 多 Agent 分权宪法（内测期强制执行）

### 绝对规则

1. **禁止自我验证**：写完代码后绝对禁止说"已验证没问题"。必须输出《修改报告》，等待 QA Agent 审核。
2. **最小修复原则**：修 Bug 只能改导致问题的核心代码，严禁顺手重构、优化或改动无关逻辑。
3. **先分析后开发**：收到新需求或 Bug 时，必须先输出分析，未经用户允许绝不直接写代码。
4. **每次修改必须报告**：改完代码必须说明改了什么、影响了什么、是否新增依赖或环境变量。

### 工作流协议

```
Developer 完成修改
    → 输出《修改报告》
    → 提示用户：「Developer 已完成，请指示是否切换 QA Agent 审查？」
    → 等待用户确认，绝不自我通过

用户指示 QA 审查（语法卡片必须两步）
    → Step 1: 韩语内容审查 Agent（只读，禁止改代码）
        → 输出《韩语内容审查报告》
        → FAIL → 打回 Developer 修复 → 重新触发韩语审查
        → PASS ↓
    → Step 2: 代码审查 Agent（只读，禁止改代码）
        → 输出《代码审查报告》
        → FAIL → 打回 Developer 修复 → 视情况重新触发韩语/代码审查
        → PASS ↓

用户指示上线
    → 切换 Release Agent（只读，禁止改代码）
    → 输出《上线检查表》
    → 通过才能部署，发现问题一票否决
```

### 模板文件位置

- 修改报告：`docs/templates/修改报告模板.md`
- QA审查报告：`docs/templates/QA审查报告模板.md`
- 上线检查表：`docs/templates/上线检查表模板.md`

---

## 韩语内容审查 Agent 规范

**触发条件**：每次新增或修改 `src/data/grammar-cards-p*.ts` 后，代码审查之前运行。  
**角色**：只读，绝不修改文件。输出《韩语内容审查报告》。

### 9步工作流（全部必须执行）

**Step 1：初始化**
- 读取目标文件全文，列出所有 cardId，确认 isPractice 卡片

**Step 2：结构一致性**
- 非 isPractice 卡片必须包含：`id / partNumber / lessonNumber / title / whatItDoes / whatItDoesBody / structureNote / rulesNote / structures / connectionRules / cardExamples / scenarios / mistakes / overviewHtml / step0Html / compareHtml / quickTable / specialQuiz / linkedGrammarIds`
- isPractice 卡片只需：`id / isPractice / specialQuiz / overviewHtml`

**Step 3：connectionRules 审查**
- rule 字段韩文语法形式是否正确
- 相邻两条 rule 内容是否重复
- usage/note/compare/example 中是否有汉字+韩文混排

**Step 4：cardExamples 审查**
- korean 是完整韩文句子，句意与卡片主题一致
- 조사检查：받침有无 → 은/는、이/가、을/를、(으)로、(이)나 是否正确
- wordBlocks 各 token 拼合是否还原 korean 原句
- swapWords 目标 word 是否在 korean 中确实存在

**Step 5：scenarios 审查**
- korean 语法形式与卡片主题一致
- zh 与 korean 对应

**Step 6：mistakes 审查（高风险）**

逐条执行：
1. 明确写出 `wrong` 值和 `correct` 值
2. **wrong ≠ correct**，若相同立即 FAIL
3. wrong 必须是学习者实际会犯的真实错误
4. correct 对照规则验证合法韩文
5. note 必须解释 wrong→correct 的原因

**Step 7：specialQuiz 审查（最高风险）**

每道题强制执行：
```
Step 7a: 写出四个选项
  Q[n]: options[0]="..." options[1]="..." options[2]="..." options[3]="..."
  answer index = X → options[X] = "..."

Step 7b: 对照语法规则逐字验证 options[answer] 是否真的正确
Step 7c: 验证其他三个选项是否真的错误
Step 7d: explanation 是否解释了 options[answer] 正确的原因，且与题目内容对应
Step 7e: prompt 字段必须存在且非空
```

**Step 8：조사/어미 全局检查**

| 规则 | 检查点 |
|---|---|
| 은/는 | 前字有받침→은，无받침→는 |
| 이/가 | 前字有받침→이，无받침→가 |
| 을/를 | 前字有받침→을，无받침→를 |
| 으로/로 | 有받침（ㄹ除外）→으로，无받침或ㄹ→로 |
| 이나/나 | 有받침→이나，无받침→나 |

**Step 9：输出报告**

```
# 韩语内容审查报告
文件：src/data/grammar-cards-pXX.ts

## 总体结论：PASS / FAIL

## FAIL 列表
| # | 卡片 | 字段 | 原文 | 问题 | 修正建议 |
|---|------|------|------|------|----------|

## 每卡审查摘要
- card-pXX-l01：PASS
- card-pXX-l04：FAIL（N处）

## 审查覆盖
- [x] Step 2 结构一致性
- [x] Step 3 connectionRules
- [x] Step 4 cardExamples
- [x] Step 5 scenarios
- [x] Step 6 mistakes
- [x] Step 7 specialQuiz
- [x] Step 8 조사/어미全局
```

### PASS 标准
- 无 Step 2-8 任何 FAIL
- specialQuiz 每道题 options[answer] 经逐字验证确实正确
- mistakes 每条 wrong ≠ correct 且 wrong 是真实错误
- 조사选择无误

---

## 代码审查 Agent 规范

**触发条件**：韩语内容审查 PASS 之后运行。  
**角色**：只读，绝不修改文件。输出《代码审查报告》。

### 12步工作流（全部必须执行）

**Step 1：接口位置确认**
- 读取 `src/types/index.ts`，找到 GrammarCard 接口，列出所有字段名和类型

**Step 2：顶层字段完整性（每张卡片）**
- 对照 GrammarCard 接口逐字段检查，类型必须匹配
- isPractice 卡片只检查必填子集

**Step 3：connectionRules 结构**
- rule 字段必须存在；可选字段若存在不能为空字符串
- 不能有接口未定义的字段；至少 5 条

**Step 4：cardExamples 结构**
- 必须含 `korean / zh / wordBlocks`；至少 3 个

**Step 5：scenarios 结构**
- 必须含 `korean / zh`；至少 5 个

**Step 6：mistakes 结构**
- 必须含 `wrong / correct / note`，均不能为空；至少 3 个

**Step 7：specialQuiz 结构（高风险）**

```
Step 7a: 检查 type / title / body / questions 字段存在
Step 7b: 每道 question 含 prompt / options / answer / explanation
Step 7c: options 长度 = 4
Step 7d: answer 类型 number，范围 0|1|2|3
Step 7e: questions 至少 4 道
Step 7f: 写出 options[answer] 值（仅验证索引有效性）
```

**Step 8：HTML 字段**
- overviewHtml / step0Html / compareHtml 非空，无 `<script>` 标签，标签成对

**Step 9：quickTable 结构**
- 含 `title / headers / rows`；rows 每行列数等于 headers 长度

**Step 10：linkedGrammarIds**
- string array；每个元素匹配 `card-p\d+-l\d+`；不含自身 cardId

**Step 11：import/export**
- 文件正确 import GrammarCard 类型
- 数组正确 export，命名与 partLoaders 对应
- 读取 `src/app/grammar/page.tsx`，确认 partLoaders 已注册本 Part

**Step 12：输出报告**

```
# 代码审查报告
文件：src/data/grammar-cards-pXX.ts
前置条件：韩语内容审查 PASS ✓

## 总体结论：PASS / FAIL

## FAIL 列表
| # | 卡片 | 步骤 | 字段 | 问题 | 修正建议 |
|---|------|------|------|------|----------|

## 每卡审查摘要
## 审查覆盖（Step 1-11 逐项打勾）
```

### PASS 标准
- Step 1-11 无任何 FAIL
- specialQuiz answer 在 [0,3] 且 prompt 存在
- partLoaders 已注册本 Part

---

## Skills 使用指南

你已安装了 98 个 skills。**不需要手动调用**——根据用户的话题自动激活。
以下是按场景的激活规则。

### 场景 -1：任务执行纪律（最高优先级！必须在所有任务之前执行）

**问题：Agent 拿到多要求指令后直接开干，遗漏部分要求，导致反复修改。**

**以下协议对所有非 trivial 任务强制执行，不可跳过：**

#### 第一步：指令解析（强制！）

收到用户指令后，**不要立即动手**。先做以下操作：

1. **提取所有要求** — 把用户指令中的每一条要求拆成编号列表
2. **识别隐含要求** — 比如"加一个搜索功能"隐含"搜索结果分页""空状态提示""加载状态"等
3. **识别矛盾** — 如果要求之间有冲突，先提出来让用户确认
4. **评估复杂度** — 是否需要先规划

每完成一条要求，立即打勾。不要跳到下一条之前不打勾当前条。如果某条做不了，说明原因，不要假装完成。

#### 第二步：交付前自检（强制！）

在说"完成"之前，必须逐条验证：
- 原始要求 vs 实际交付
- 每一条要求是否真的实现了
- 没实现的要说明原因

**禁止行为：**
- 没做自检就说"完成了"
- 只完成了部分要求却不说哪条没做
- 用"基本完成""差不多好了"模糊表述

#### 何时可以跳过此协议

只有以下情况可以跳过：
- 单一明确操作（"改这个变量名为 X"）
- 用户明确说"直接做，不用规划"
- 纯问答（"这个韩语词什么意思"）

其他所有任务**必须**执行此协议。

---

### 场景 0：记忆管理（跨会话持久记忆）

| 什么时候 | 激活的 skill | 做什么 |
|---------|-------------|--------|
| 会话开始 | **memory** + **remember** | 读取 `~/memory/` 目录，恢复上下文 |
| 做了重要决定 | **remember** | 记录决定到记忆文件 |
| 用户纠正了你 | **remember** | 记录错误到记忆文件，不要重犯 |
| 用户说了偏好 | **remember** | 记录偏好到记忆文件 |
| 会话结束 | **memory** | 把会话重要内容写入记忆文件 |
| 用户说"你还记得..." | **smart-memory-manager** | 搜索记忆库 |

---

### 场景 1：韩语内容创作（最高频）

| 用户说了什么 | 激活的 skill | 原因 |
|-------------|-------------|------|
| 写韩语对话/文章/例句 | **korean** | 让韩语自然、口语化、敬语正确 |
| 设计课程/教学内容 | **language-learning** + **korean** | 课程结构 + 自然韩语 |
| 解释发音/音变规则 | **pronunciation** + **korean** | 发音教练 + 韩语专项 |
| 检查韩语语法错误 | **grammar** + **korean** | 通用语法 + 韩语语感 |
| 生成词汇表/闪卡 | **language-learning** | 语言教学工具 |

### 场景 2：TTS 和音频

| 用户说了什么 | 激活的 skill |
|-------------|-------------|
| 生成韩语单词音频 | **audio** + **korean**（先校验文本再合成） |
| 音频降噪/格式转换 | **audio** |
| 检查 TTS 发音是否正确 | **pronunciation** + **audio** |

### 场景 3：写代码/开发功能

| 用户说了什么 | 激活的 skill |
|-------------|-------------|
| 写新功能/新代码 | **karpathy-guidelines** + **coding-agent** |
| "用 ponytail 模式" / "精简代码" | **ponytail**（砍掉不必要代码） |
| "审查代码" / "audit" | **ponytail-audit** + **karpathy-guidelines** |
| 写测试 | **tdd** |
| 设计 API | **api-design** + **error-handling** |
| 提交代码 | **git-workflow** |
| 复杂功能先规划 | **writing-plans** + **thinking** + **plan** |
| 调试 bug | **debug-pro** + **error-handling** |
| 数据库相关 | **sql** |
| 部署相关 | **deploy** + **docker** |
| 需求不明确时 | **prompt-refiner** 先精炼需求 |
| 需要写需求文档 | **requirements-spec** |
| 任务追踪 | **checklist** + **todo** + **task-protection** |
| 交付前自检 | **self-verify** + **instant-execution-discipline** |

### 场景 4：UI/设计

| 用户说了什么 | 激活的 skill |
|-------------|-------------|
| 做页面/UI 组件 | **impeccable-uxui** + **fullstack-dev** |
| 检查无障碍 | **a11y** |
| 审计现有界面 | **impeccable-uxui** |

### 场景 5：营销/增长

| 用户说了什么 | 激活的 skill |
|-------------|-------------|
| SEO 优化 | **seo-audit** + **product-marketing** |
| 写营销文案 | **copywriting** + **product-marketing** |
| 转化率优化 | **cro** |
| 做落地页 | **copywriting** + **impeccable-uxui** |

### 场景 6：生成文档/材料

| 用户说了什么 | 激活的 skill |
|-------------|-------------|
| 生成 PDF 课件 | **pdf** + **korean** |
| 做 PPT | **pptx** |
| 做Excel词汇表 | **xlsx** + **korean** |
| 生成图表 | **charts** |

### 场景 7：深度分析

| 用户说了什么 | 激活的 skill |
|-------------|-------------|
| "先想清楚" / 复杂问题 | **thinking** |
| 理解代码库结构 | **graphify** |
| 搜索网络资料 | **web-search** + **web-reader** |

---

## Skills 协作规则

1. **korean 永远优先** — 任何涉及韩语文本的任务，korean skill 必须激活
2. **pronunciation 处理音变** — 涉及韩语发音时，pronunciation 负责音变规则解释
3. **ponytail 不碰韩语内容** — ponytail 只管代码精简，不碰韩语文本
4. **TTS 校验流程** — 生成音频前，先用 korean skill 校验文本，再用 audio skill 处理
5. **marketing skills 互引用** — 使用营销 skill 前先读 product-marketing 建立上下文

---

## 禁止激活的组合

以下 skill 不要同时激活（会冲突）：

- **ponytail** + **tdd** 同时写同一段代码 — ponytail 砍代码，tdd 要求先写测试，会矛盾
  - 正确做法：先用 tdd 写测试，再用 ponytail 精简实现
- **impeccable-uxui** + **cro** 同时改一个页面 — 会抢设计方向
  - 正确做法：先 cro 分析转化问题，再 impeccable-uxui 实现设计

---

## 项目特定知识

### TTS API
- 地址: http://localhost:8800
- 声音: sunhi(女声教学) / injoon(男声对话)
- 接口: GET /tts?text={韩语}&voice={声音}
- 自动处理韩语音变（连音/同化/颚化）

### 韩语审核流程
1. 文本审核: korean skill 检查语感 → grammar skill 检查语法
2. 发音审核: pronunciation skill 检查音变规则
3. 音频审核: 用 TTS 生成音频 → 对比标准发音
4. 内容审核: language-learning skill 验证教学层级匹配

### 用户注意事项
- 用户没有韩语基础，所有韩语内容需要附带中文解释
- 用户没有编程经验，代码相关的操作由 Claude Code 完成
- 用户使用 Claude Code 开发网站，skills 安装在 .claude/skills/ 目录

---

## 记忆系统配置（跨会话持续记忆）

### 安装 claude-mem（跨会话持久记忆）

```bash
npx claude-mem install
```

安装后它会自动：
- 捕获每次会话中的工具使用和决策
- AI 压缩成语义摘要
- 下次会话自动注入相关上下文

### 创建记忆目录

```bash
mkdir -p ~/memory/hot
```

### 首次初始化

在新会话中说：
"请读取 ~/memory/ 目录，如果不存在就创建。初始化项目记忆文件。"

### 日常使用

每次开始时会自动读取记忆。做决定时自动记录。被纠正时自动记录。如果你发现忘了什么，直接说"把这个记到记忆里：________"。

---

## 任务执行纪律配置

### 问题

Agent 拿到多要求指令 → 直接开干 → 遗漏部分要求 → 用户反复指出 → 反复修改

### 解决方案：三步执行协议（已在场景 -1 中配置）

Agent 收到指令后会：
1. **先拆解** — 把你的所有要求提取成编号列表
2. **逐条做** — 每完成一条打勾，不跳过
3. **交付前自检** — 逐条对照原始要求验证，报告完成情况

### 推荐的指令格式

编号列表 = Agent 拆解起点。每一行就是一个验证条目。

```
帮我做 XX 功能，要求：
1. [要求1]
2. [要求2]
3. [要求3]
```
