# 海外多语言 SEO 方案（境外华人 + 英语圈）

> 决策已定：**独立 .cn 双域名**（上海 .com ¥ / 香港 .cn $）、**真 `/en` 子路径**、目标人群 = **境外华人（中文）+ 英语圈（英文）**。本文档先出方案，动手前请拍板「路径 A 还是路径 B」。

---

## 一、现状诊断

### 已经很扎实（国内 SEO，不用动）
- `layout.tsx` metadata 完整：title 模板、description、keywords、OG、Twitter、robots
- 根 JSON-LD：Organization + WebSite（用 `@id` 供子页引用）
- 7 大搜索引擎站点验证（google/baidu/bing/sogou/360/shenma/naver/yandex）
- `sitemap.ts` 动态生成数百 URL；`robots.ts`；`src/proxy.ts`（= Next 16 middleware）已管公开页白名单
- **`en.ts` 英文翻译包全量就绪**（5554 行，与 zh.ts 1:1，`scripts/i18n-fill.mjs` 自动生成）

### 面向海外的致命缺口
| 问题 | 现状 | 后果 |
|------|------|------|
| 语言信号单一 | `<html lang="zh-CN">` 写死；metadata 全中文；hreflang 只有 `zh-CN` + `x-default` 都指向中文首页 | Google 判定纯中文站，英文搜索词不命中 |
| 英文内容无 URL | 语言切换 = 纯 localStorage（`tori_ui_language`）；`LangProvider` 是 `'use client'` + `useEffect` 初始化，**SSR 首帧永远 `'zh'`** | 爬虫只看到中文 SSR，5554 行英文对 SEO 完全隐形 |
| 海外版没碰 SEO | `.env.overseas` 只切了 Stripe/货币 | 香港 .cn 上线也只是个中文站 |
| BASE 域名硬编码 | `torikorean.com` 散落在 sitemap.ts + 多个 layout.tsx | .cn 站 sitemap/canonical 会指错域名 |

### 架构约束（决定可行性）
- **重客户端 SPA**：核心页如 `grammar/page.tsx` 是 `'use client'`，本身无服务端 metadata；SEO 靠 layout 根 metadata + SSR 首帧 HTML
- **216 处** 调用 `getLang/useLang`，语言状态全活在客户端
- 45 个页面有 metadata（13 个 `generateMetadata` 动态 + 32 个静态 `export const metadata`）
- **Next App Router 铁律：一个 URL 只能 SSR 出一种语言**

---

## 二、两条实现路径（核心抉择）

要让 `/en/*` 真正 SSR 出英文，绕不开「服务端如何知道当前语言」。两条路：

### 路径 A —— `app/[lang]/` 目录重构（教科书正确，但违反"不大重构"）
把所有页面移进 `app/[lang]/`，`lang` 作为动态段。
- ✅ 最标准，每个 URL 天然带语言，`generateMetadata` 可读 `params.lang`
- ❌ 要移动全站几十个路由目录 + 改 216 处 `getLang`（改成读 `params`/`headers`）+ 32 个静态 metadata 全部改成 `generateMetadata`
- ❌ 直接违反 CLAUDE.md「禁止大重构 / 不删旧路由」
- ❌ 高风险，工期以周计

### 路径 B —— proxy 重写 + header 注入语言（推荐，风险可控）✅
不动任何路由目录。利用已有的 `src/proxy.ts`：
1. **proxy 层**：识别 `/en` 前缀 → 内部 `rewrite` 到裸路径（`/en/grammar` → 实际渲染 `/grammar`），同时给请求塞一个 `x-tori-lang: en` header
2. **服务端读语言**：新增 `getServerLang()`，从 `headers()` 读 `x-tori-lang`（SSR 时可用，替代现在永远返回 zh 的逻辑）
3. **layout.tsx**：改成 `generateMetadata()`，按 `getServerLang()` 动态输出 `<html lang>`、title/description/OG（英文用真实搜索词）、hreflang 三件套
4. **首帧语言**：`LangProvider` 初始值从 header 注入的语言取（SSR 与客户端一致，消除 FOUC）
5. **客户端切语言**：切到 EN → `router.push('/en' + path)`；切回中文 → 去掉前缀。localStorage 仍保留做兜底

- ✅ 零目录移动，不碰 216 处调用点的大部分（只改 `getLang` 的取值源）
- ✅ 符合 CLAUDE.md「增量改动、不大重构」
- ✅ `/en/*` 有真实可爬 URL，英文 SSR 首帧真英文
- ⚠️ 唯一技术点：`generateMetadata` + `headers()` 会让 layout 变动态渲染（对 SEO 无害，本就是 SSR）
- ⚠️ proxy rewrite 要处理好静态资源/API 不被加前缀（白名单已有基础）

**推荐路径 B。** 下面的任务清单按 B 写。

---

## 三、分阶段任务（路径 B）

### 阶段 0 · 低风险打底（不改路由，可先独立上线）
> 即使后面不做 /en，这些也该做，先把「有英文版」的信号发出去。
- [ ] `src/lib/seo.ts`（新增）：集中管理 `BASE_URL`（读 `NEXT_PUBLIC_SITE_URL` / edition），中英文 metadata 文案、关键词表
- [ ] 把 sitemap.ts + 各 layout 里硬编码的 `torikorean.com` 换成 `seo.ts` 的 `BASE_URL`
- [ ] 英文关键词表：`learn Korean online` / `Korean alphabet Hangul` / `TOPIK practice test` / `learn Korean for free` / `Korean grammar lessons`（**真实搜索词，非中文直译**）

### 阶段 1 · proxy 语言路由（核心）
- [ ] `src/proxy.ts`：`/en` 前缀检测 → rewrite 到裸路径 + 注入 `x-tori-lang` header；`Accept-Language` 首访 302（欧美浏览器自动进 /en，可选）
- [ ] `src/lib/i18n.ts`：新增 `getServerLang()`（读 `headers()`）；`getLang()` 客户端优先读 URL 前缀再 fallback localStorage
- [ ] `LangProvider.tsx`：接受 SSR 注入的初始 lang，消除首帧闪烁

### 阶段 2 · 语言感知 metadata + hreflang
- [ ] `layout.tsx`：`export const metadata` → `generateMetadata()`，按语言输出 `<html lang>` / title / desc / OG `locale`
- [ ] hreflang 三件套：每页 `alternates.languages` = `{ 'zh-CN': 裸URL, 'en': /en URL, 'x-default': 裸URL }`
- [ ] **双域名互指**：.com 与 .cn 各自 canonical 指向自己；通过 hreflang 声明彼此是地区版本（zh-CN → .com，需 .cn 站也知道 .com 的存在，反之亦然）— 用 `seo.ts` 统一配置两域名

### 阶段 3 · sitemap / robots 双语
- [ ] `sitemap.ts`：每个 URL 生成 zh + `/en` 两条，带 `alternates.languages`
- [ ] `robots.ts`：确认 `/en` 可爬（当前 matcher 已放行，需验证 rewrite 后爬虫拿到 200）

### 阶段 4 · 结构化数据增强（吃 Google 教育富结果）
- [ ] 根 JSON-LD 加 `Course` / `LearningResource` 类型 + `inLanguage`
- [ ] `WebSite` 实体按语言标注 `inLanguage`
- [ ] 英文站 OG image 备一张英文文案版（现 `/tori-og-v2.webp` 是中文）

---

## 四、需要改动的文件清单（路径 B）

| 文件 | 改动 | 风险 |
|------|------|------|
| `src/lib/seo.ts` | 新增，集中 BASE_URL + 双语文案 | 低 |
| `src/proxy.ts` | 加 /en rewrite + header 注入 | 中（要测静态资源/API 不受影响） |
| `src/lib/i18n.ts` | 加 `getServerLang()`，改 `getLang` 取值源 | 中（216 调用点行为变化，需回归） |
| `src/components/LangProvider.tsx` | 接受 SSR 初始 lang | 低 |
| `src/app/layout.tsx` | metadata → generateMetadata，动态 html lang + hreflang | 中 |
| `src/app/sitemap.ts` | 双语 URL + alternates；BASE_URL 参数化 | 低 |
| `src/app/robots.ts` | 验证 /en 可爬 | 低 |
| 多个 `*/layout.tsx` | 硬编码域名换 seo.ts | 低（机械替换） |
| `.env.overseas` | 加 `NEXT_PUBLIC_SITE_URL=https://<香港.cn>` | 低 |

---

## 五、风险点 & 验证

1. **proxy rewrite 误伤**：`/en` 前缀不能加到 `_next`、`/api`、静态资源上。→ rewrite 前先过现有白名单。
2. **`getLang` 行为变更**：216 处调用点，改取值源后可能有页面读到非预期语言。→ 改完全站回归，重点测语言切换按钮、日记/语法等重客户端页。
3. **layout 变动态渲染**：`headers()` 让 layout 退出静态优化。→ 本就是 SSR 站，实测首屏 TTFB 无明显退化即可。
4. **双域名 hreflang 环路**：.com 和 .cn 互相声明时 URL 必须绝对且对称，否则 Google 忽略。→ seo.ts 单一数据源，两域名从同一份配置生成。
5. **CDN 缓存**：EdgeOne 若按 URL 缓存，`/en` 与裸路径必须分开缓存 key（禁止关 CDN 规则仍生效）。

## 六、验证清单（每阶段完成后）
- `curl -H "Accept-Language: en" https://<域名>/en/grammar` → 返回英文 SSR HTML、`<html lang="en">`
- `curl https://<域名>/grammar` → 中文 SSR、`<html lang="zh-CN">`
- 查看源码含正确 hreflang 三件套
- `/sitemap.xml` 含 /en 条目 + alternates
- Google Search Console 提交后确认「国际定位」识别到 en
- tsc + lint + build 三步全过

---

## 七、暂不做（本次范围外）
- 日文 `/ja`（en.ts 有、ja 无；日本人群大但是独立一期工程）
- 内容层英文化的深度校对（UI 已全量英文，但文章/语法讲解正文仍是中文——面向英语圈学习者这是后续内容工程）
