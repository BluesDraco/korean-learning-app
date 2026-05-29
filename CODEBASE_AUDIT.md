# 韩语学习 App 完整代码审计文档

> 生成日期：2026-05-29 | 为 Claude Code 审查准备

---

## 项目概览

- **框架**: Next.js 16.2.6 (App Router, Turbopack)
- **语言**: TypeScript 5.x
- **数据库**: Turso (libsql/SQLite) — 本地回退 `data/app.db`
- **AI**: DeepSeek API (7 个独立 Key，统一模型 `deepseek-v4-flash`)
- **TTS**: 3 层回退 (Edge WebSocket → Baidu API → Browser speechSynthesis)
- **认证**: JWT (jose, HS256, httpOnly cookie, 7天过期)
- **PWA**: 已有 manifest.json + sw.js + 192/512px 图标

---

## 一、路由结构 (67 个页面)

### 主页
| 路由 | 说明 |
|------|------|
| `/` | 仪表盘 — 用户统计、待复习数、连续打卡图、今日任务、各模块快捷入口 |

### 学习模块
| 路由 | 说明 |
|------|------|
| `/learn` | 30 单元渐进式课程总览 |
| `/learn/picture-books` | 绘本图书馆 — 7 本韩语绘本列表 |
| `/learn/picture-books/[id]` | 绘本阅读器 — 逐页翻页、发音、译文切换、词汇总结 |
| `/phonetics` | 韩语音标学习 — 元音/辅音/收音 3 个 Tab + 测验模式 |
| `/phonetics/rules` | 发音规则 — 连音、鼻音化、送气化等 |
| `/grammar` | 语法库 — 按 TOPIK 等级/分类筛选，敬语对照表 |
| `/knowledge` | 分类词汇 — 时间/天气/家人/颜色等 12 个主题 |
| `/knowledge/[slug]` | 单个分类词汇详情 |
| `/reading` | 阅读文章库 — 按等级分类 |
| `/reading/[id]` | 文章阅读器 — 逐句朗读、全文播放、跟读录音、精读面板 |

### 练习模块
| 路由 | 说明 |
|------|------|
| `/review` | SRS 间隔复习 — 卡片翻转、自我评估 0-5 分、记忆健康度 |
| `/dictation` | 听写练习 — 单词/句子/每日挑战 3 模式，支持打字/手写输入 |
| `/shadowing` | 影子跟读列表 |
| `/shadowing/[id]` | 影子跟读播放器 — 视频+字幕同步、句子循环、录音回放 |
| `/typing` | 韩语打字 — 15 关从字母到歌词 |
| `/writing` | 写作练习 — 韩语键盘+手写板 |
| `/topik` | TOPIK 模拟考试 |
| `/buddy` | 学习搭子广场 |
| `/buddy/[id]` | 搭子详情 — 双方统计、加油互动 |
| `/buddy/invite` | 发起搭子 — 生成分享卡片图片 |
| `/stats` | 学习统计 — XP 图表、打卡日历、单词获取时间线、记忆分布 |

### 词汇模块
| 路由 | 说明 |
|------|------|
| `/vocabulary` | 我的单词本 |
| `/vocabulary/library` | 词汇库 — TOPIK 1-6 级 / 主题包 / 延世教材词汇 |
| `/vocabulary/books` | 自定义词书 |
| `/vocabulary/books/[id]` | 词书详情 |
| `/vocabulary/books/[id]/flashcards` | 词书闪卡模式 |
| `/vocabulary/themes/[id]` | 场景主题包 (咖啡厅/机场/医院...) |
| `/vocabulary/levels/[level]` | 单级 TOPIK 词表 |
| `/vocabulary/yonsei` | 延世教材词汇 |
| `/vocabulary/dictionary` | 内置韩语词典 |
| `/dictionary` | 词典搜索 |

### AI 模块
| 路由 | 说明 |
|------|------|
| `/ai` | AI 工具总览 |
| `/ai/chat` | 情景对话 — 餐厅/医院/酒店等角色扮演 |
| `/ai/analyze` | 句子拆解 — 逐词分析+语法+助词 |
| `/ai/voice` | 语音陪聊 — 토리 兔子韩语口语陪练 |

### 韩国文化
| 路由 | 说明 |
|------|------|
| `/korea/culture` | 文化文章列表 |
| `/korea/culture/[slug]` | 单篇文化文章 |
| `/korea/food` | 美食文章列表 |
| `/korea/food/[slug]` | 单篇美食文章 |
| `/korea/travel` | 旅行文章列表 |
| `/korea/travel/[slug]` | 单篇旅行文章 |
| `/korea/kpop` | K-pop 学韩语 — 歌曲列表 |
| `/korea/kpop/[id]` | 单首歌歌词学习 — 逐行韩文+罗马音+中文翻译 |
| `/korea/kpop/news` | K-pop 资讯 — B站/微博热点聚合+AI翻译 |

### 账户 / 其他
| 路由 | 说明 |
|------|------|
| `/auth/login` | 登录 |
| `/auth/register` | 注册 |
| `/settings` | 设置 — 每日目标、主题、字体 |
| `/messages` | 消息中心 — 系统公告/更新日志/私信 |
| `/diary/[token]` | 公开学习日记分享页 |
| `/tori/stickers` | 토리 贴纸包 |
| `/tori/stickers/[id]` | 单套贴纸详情 |
| `/achievement/card` | 成就卡片生成 |

### 管理后台 (需 admin 角色)
| 路由 | 说明 |
|------|------|
| `/admin/dashboard` | 仪表盘 — DAU、新增用户、学习行为 |
| `/admin/users` | 用户管理 |
| `/admin/users/[id]` | 单用户详情 |
| `/admin/content` | 内容管理 |
| `/admin/revenue` | 营收 (暂无数据) |
| `/admin/system` | 系统监控 |
| `/admin/messages` | 消息管理 |
| `/admin/ambassadors` | 大使管理 |

---

## 二、API 接口 (30 个)

### 认证
| 路由 | 说明 |
|------|------|
| `POST /api/auth/login` | 登录 — bcrypt 验证 + JWT cookie，限流 10次/5分钟 |
| `POST /api/auth/register` | 注册 — 用户名+密码，bcrypt 哈希 |
| `POST /api/auth/logout` | 登出 — 清除 cookie |
| `GET /api/auth/me` | 获取当前用户 |
| `POST /api/auth/onboarding` | 完成新手引导 |

### 核心数据
| 路由 | 说明 |
|------|------|
| `POST /api/user-data` | **统一数据 CRUD** — 支持 getAll/get/add/put/update/delete/query/list/count 操作，覆盖 20+ 张表，内置 user scope 隔离 |

### AI (均使用 DeepSeek)
| 路由 | 说明 | Key |
|------|------|-----|
| `POST /api/ai/chat` | 情景对话 | DEEPSEEK_CHAT_KEY |
| `POST /api/ai/voice` | 语音陪聊 | DEEPSEEK_VOICE_KEY |
| `POST /api/ai/analyze` | 句子拆解 | DEEPSEEK_ANALYZE_KEY |
| `POST /api/ai/handwriting` | 手写 OCR | DEEPSEEK_HANDWRITING_KEY |
| `POST /api/shadowing/translate` | 字幕韩翻中 | DEEPSEEK_TRANSLATE_KEY |
| `POST /api/shadowing/word-lookup` | 视频查词 | DEEPSEEK_LOOKUP_KEY |
| `GET /api/kpop-news` | K-pop 资讯聚合 | DEEPSEEK_NEWS_KEY |

### TTS
| 路由 | 说明 |
|------|------|
| `POST /api/tts` | 百度 TTS (`fanyi.baidu.com/gettts`) |

### 词典
| 路由 | 说明 |
|------|------|
| `GET /api/dict` | 搜索内置词典 |
| `GET /api/dict/word/[word]` | 精确查词 |

### 追踪 & 反馈
| 路由 | 说明 |
|------|------|
| `POST /api/track/page-view` | 页面浏览记录 |
| `POST /api/track/study` | 学习行为记录 |
| `POST /api/feedback` | 用户反馈提交 |

### 公告
| 路由 | 说明 |
|------|------|
| `GET /api/announcements` | 公告列表 |
| `POST /api/announcements/read` | 标记已读 |
| `GET /api/announcements/unread` | 未读数量 |

### 分享
| 路由 | 说明 |
|------|------|
| `GET /api/diary/[token]` | 学习日记分享页数据 |

### 管理后台 (需 admin)
| 路由 | 说明 |
|------|------|
| `GET /api/admin/dashboard` | 仪表盘指标 |
| `GET /api/admin/users` | 用户列表 |
| `GET /api/admin/users/[id]` | 单个用户 |
| `GET /api/admin/content` | 内容统计 |
| `GET /api/admin/revenue` | 营收 |
| `GET /api/admin/system` | 系统状态 |
| `PATCH /api/admin/feedback/[id]` | 处理反馈 |

---

## 三、外部服务依赖

| 服务 | 连接方式 | 用途 |
|------|----------|------|
| DeepSeek API | HTTPS `api.deepseek.com/chat/completions` | AI 翻译/查词/拆解/对话/OCR/资讯 |
| Microsoft Edge TTS | WebSocket `wss://speech.platform.bing.com` | 主 TTS 引擎 |
| Baidu TTS | HTTPS `fanyi.baidu.com/gettts` | TTS 回退方案 |
| Bilibili API | HTTPS `api.bilibili.com` | 视频元数据 + K-pop 资讯抓取 |
| YouTube oEmbed | HTTPS `www.youtube.com/oembed` | 视频标题/缩略图 |
| 微博热搜 | HTTPS `weibo.com/ajax/side/hotSearch` | K-pop 资讯抓取 |
| Turso | libsql 协议 | 生产数据库（待配置） |

---

## 四、数据库表 (27 张)

所有表的 `user_id` 字段都做了索引和外键关联 `users(id)`。

| 表名 | 用途 | 有 user scope |
|------|------|:--:|
| `users` | 用户账号 — username, password_hash, nickname, role | — |
| `user_profiles` | 学习档案 — level, xp, streak, goals, unit, onboarding | ✓ |
| `user_words` | 用户词库 — word, meaning, mastery, SRS 状态 | ✓ |
| `review_sessions` | 复习记录 | ✓ |
| `dictation_records` | 听写记录 | ✓ |
| `shadowing_records` | 跟读记录 | ✓ |
| `daily_logs` | 每日学习日志 | ✓ |
| `achievements` | 成就记录 | ✓ |
| `user_achievements` | 成就卡片 | ✓ |
| `user_share_links` | 分享链接 | ✓ |
| `app_settings` | 用户设置 | ✓ |
| `word_books` | 自定义词书 | ✓ |
| `study_videos` | 学习视频 | ✓ |
| `study_subtitles` | 视频字幕 | ✓ |
| `study_logs` | 通用学习日志 | ✓ |
| `video_study_logs` | 视频学习日志 | ✓ |
| `page_views` | 页面浏览记录 | ✓ |
| `ai_usage` | AI 用量记录 | ✓ |
| `feedbacks` | 用户反馈 | ✓ |
| `announcements` | 系统公告 | — |
| `announcement_reads` | 公告已读标记 | ✓ |
| `sticker_packs` | 贴纸包 | — |
| `stickers` | 贴纸 | — |
| `sticker_downloads` | 贴纸下载记录 | ✓ |
| `buddy_relations` | 搭子关系 (user_a_id + user_b_id) | ✓ (双列) |
| `buddy_invites` | 搭子邀请 | ✓ |

---

## 五、组件 (34 个)

### 全局 Shell
- `AppShell.tsx` — 应用外壳：Navbar + beta banner + VisitorCounter + 内容
- `AuthProvider.tsx` — React Context 认证状态
- `ThemeProvider.tsx` — 明暗主题切换
- `FontProvider.tsx` — 字体风格/大小设置
- `XpOverlay.tsx` — XP 飞行动画浮层
- `Onboarding.tsx` — 新用户引导流程
- `FeedbackButton.tsx` — 浮动反馈按钮
- `PageViewTracker.tsx` — 页面浏览追踪
- `VisitorCounter.tsx` — 访客计数动画
- `FloatingDecorations.tsx` — 飘浮装饰粒子
- `ScrollToTop.tsx` — 路由切换自动回顶

### 学习工具
- `ProgressivePhonetics.tsx` — 渐进式音标教学
- `KoreanKeyboard.tsx` — 虚拟韩语键盘（含字母组合引擎）
- `HandwritingPad.tsx` — Canvas 手写识别板
- `WordCard.tsx` — 单词详情卡片弹窗
- `WordBookCard.tsx` — 词书卡片
- `AddToBookModal.tsx` — 添加到词书的模态框
- `WordAudioPlayer.tsx` — 单词音频播放列表

### 视频学习
- `VideoPlayer.tsx` — embed YouTube/Bilibili 播放器
- `SubtitlePanel.tsx` — 字幕面板（4 种显示模式）
- `ShadowingBar.tsx` — 跟读控制栏
- `SpeedSelector.tsx` — 播放速度选择

### 内容渲染
- `ArticleContent.tsx` — 韩国文化文章渲染器
- `vocabulary/LevelsSection.tsx` — TOPIK 等级列表
- `vocabulary/BooksSection.tsx` — 词书列表
- `vocabulary/ThemesSection.tsx` — 主题包列表
- `vocabulary/YonseiSection.tsx` — 延世教材词汇
- `vocabulary/KnowledgeSection.tsx` — 知识分类
- `vocabulary/ExpressionsSection.tsx` — 惯用语
- `vocabulary/ScenesSection.tsx` — 场景句子
- `korea/CultureSection.tsx` — 文化文章网格
- `korea/HistorySection.tsx` — 韩国历史
- `korea/TravelSection.tsx` — 旅行文章网格
- `korea/FoodSection.tsx` — 美食文章网格

---

## 六、数据文件 (23 个)

| 文件 | 内容量 |
|------|--------|
| `phonetics.ts` | 21 元音 + 19 辅音 + 7 收音 |
| `phonetics-steps.ts` | 7 步渐进课程 |
| `knowledge.ts` | 12 个主题分类，100+ 词 |
| `expressions.ts` | 110+ 惯用语 |
| `grammar.ts` | 40+ 语法点 |
| `grammar-beginner.ts` | 20+ 初级语法点 |
| `articles.ts` | 10+ 篇分级阅读文章 |
| `topik-questions.ts` | 5 套 TOPIK 模拟题 |
| `typingLevels.ts` | 15 关打字练习 |
| `dictationWords.ts` | 70+ 听写单词 |
| `dictationSentences.ts` | 60+ 听写句子 |
| `pictureBooks.ts` | 7 本绘本 |
| `learningUnits.ts` | 30 个单元渐进课程 |
| `korea.ts` | 文化/历史/旅行/美食内容 |
| `kpopSongs.ts` | 10+ 首 K-pop 带歌词注解 |
| `yonsei-books.ts` | 延世教材词汇 |
| `vocabulary/entries.ts` | ~300 基础单词 |
| `vocabulary/entries-intermediate.ts` | 中级词汇 |
| `vocabulary/entries-advanced.ts` | 高级词汇 |
| `vocabulary/themes.ts` | 12 个场景主题包 |
| `vocabulary/levels.ts` | TOPIK 1-6 级词表 |
| `korea-articles/` (15 HTML) | 15 篇韩国文化/美食/旅行文章 |

---

## 七、核心库 (`src/lib/`)

### 客户端
| 文件 | 用途 |
|------|------|
| `db.ts` | 云同步数据库 — 18 张表的 Dexie 风格 API，POST 到 `/api/user-data` |
| `srs.ts` | SM-2 间隔重复算法 — 质量 0-5，间隔 1分→10分→1天→3天→7天→14天→指数增长 |
| `forgetting-curve.ts` | 艾宾浩斯遗忘曲线 — 预估保留率公式 `exp(-days/stability)` |
| `gamification.ts` | 经验值/等级/打卡/成就 — 17 种成就，20 级，打卡奖励 XP |
| `progress.ts` | 5 级韩语水平追踪 — 萌新/入门/初级/中级/进阶 |
| `tts.ts` | TTS 引擎 — Edge WebSocket → Baidu → Browser 3 层回退 |
| `dictionary.ts` | 韩语处理 — 罗马音转换、动词还原、分词、7 种不规则变化 |
| `srt.ts` | SRT 字幕解析器 |
| `platform-detector.ts` | 视频平台识别 (B站/YouTube) |
| `fontSettings.ts` | 字体设置 — 3 种风格 × 4 种大小 |
| `useIsMobile.ts` | 移动端检测 Hook |
| `useAdminData.ts` | 管理端数据获取 Hook |
| `deepseek.ts` | DeepSeek API 客户端 — 6 个函数，统一模型 `deepseek-v4-flash` |

### 服务端 (`src/lib/server/`)
| 文件 | 用途 |
|------|------|
| `db.ts` | SQLite/Turso 数据库初始化 — 27 张表的 CREATE TABLE + 迁移 |
| `auth.ts` | bcrypt + JWT (jose) 认证 — hash/verify/sign/verify/cookie |
| `admin-guard.ts` | Admin 角色验证中间件 |
| `dict-loader.ts` | 韩语词典加载/搜索 — 评分排序 (精确/前缀/子串/中文/汉字) |
| `rate-limit.ts` | 内存限流 — 10次/5分钟，超限封禁15分钟 |

---

## 八、TTS 音频架构

客户端 `src/lib/tts.ts` — `speak(text, rate)` 函数：

```
  speak(text, rate)
    │
    ├─ 1. Edge TTS (首选)
    │     WebSocket → wss://speech.platform.bing.com
    │     语音: ko-KR-SunHiNeural
    │     PCM 24kHz → AudioContext 播放
    │     返回 Promise (onended resolve)
    │
    ├─ 2. Baidu TTS (回退)
    │     HTTP → /api/tts → fanyi.baidu.com
    │     MP3 → Audio 播放
    │     返回 Promise
    │
    └─ 3. Browser TTS (最后回退)
          window.speechSynthesis
          lang: ko-KR, rate: 0.7-1.0
          返回 Promise
```

每次调用 `speak()` 前会先 `cancelSpeech()` 停止当前播放，避免重叠。

---

## 九、数据流

```
浏览器
  │
  ├─ 页面 / 组件
  │   ├─ 静态数据 → import from src/data/*
  │   ├─ 用户数据 → db.xxx.get/put/filter (src/lib/db.ts)
  │   │                │
  │   │                └─ POST /api/user-data
  │   │                     │
  │   │                     └─ src/app/api/user-data/route.ts
  │   │                          │
  │   │                          └─ src/lib/server/db.ts (SQLite/Turso)
  │   │
  │   ├─ AI 功能 → fetch('/api/ai/...')
  │   │              │
  │   │              └─ deepseek.ts → api.deepseek.com
  │   │
  │   ├─ TTS → speak(text, rate)
  │   │         │
  │   │         └─ tts.ts → WebSocket/HTTP/Browser
  │   │
  │   └─ 认证 → AuthProvider → /api/auth/*
  │                                │
  │                                └─ server/auth.ts (bcrypt + JWT)
  │
  └─ PWA: manifest.json + sw.js (已配置, 192/512 图标)
```

---

## 十、待完成事项

### 阻塞上线
| # | 事项 | 说明 |
|---|------|------|
| 1 | Turso 远程数据库 | 需要 `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`。当前用本地 SQLite 回退，重启丢数据 |
| 2 | 搭子邀请接收页 | 分享链接 `buddy/invite?token=xxx` 无接收处理，只有发送 |

### 建议改进
| # | 事项 | 说明 |
|---|------|------|
| 3 | CSP/安全响应头 | next.config.ts 只配了缓存头，缺少 CSP/HSTS/X-Frame-Options |
| 4 | 限流非持久 | rate-limit.ts 用内存 Map，多实例不共享 |
| 5 | DEEPSEEK_PLAN_KEY | 未使用，占位值待替换 |
| 6 | 17 个文件仍用本地 speakKorean | 非 bug，但缺少 Edge TTS 回退 |
