# 阅读模块接入真实 banner 大图（去 emoji 化 · 保守方案）

## 背景 / 已确认的事实
- `public/images/banners/`（15 张）是**成品级整幅 hero 大图**：粉紫托里兔风格，中文标题+韩文副标题+`토리实测·约N分钟·分类`meta **全烧进图里**。和现有图书馆审美一致。
- `public/images/scenes/`（41 张）是写实 3D「动物城」风格，与当前风格冲突 + 绑定已砍掉的动物作者概念 → **不用**。
- banner 每张只能用于**它自己那篇文章**（标题烧死，不能张冠李戴/当通用缩略图）。
- `Article` 类型**目前没有图片字段**。
- 用户决策：**只用能对得上的 banner**，用到对应文章；其余文章保持现有 emoji+渐变，风格不割裂。

## 经逐张视觉核对，确认的映射（banner 文件名 → 文章 id）
**强匹配（标题+主题都吻合）：**
1. `convenience-store` → `convenience-store-culture`（"韩国便利店完全指南"≈"韩国便利店的一切"）
2. `seoul-subway` → `seoul-subway`（"首尔地铁完全攻略"≈"首尔地铁初体验"）
3. `seoul-cafe` → `korean-cafe`（"首尔咖啡文化"≈"韩国咖啡馆文化"）
4. `street-food` → `korean-street-food`（"首尔街头小吃地图"≈"韩国街头小吃"）

**软匹配（主题吻合但标题不完全一致，纳入但可回退）：**
5. `korean-holidays` → `korean-holiday-chuseok`（banner是"节日完全手册"泛指설날+추석；文章专讲추석。汉服+茶礼场景吻合）
6. `kdrama-culture` → `korean-drama-expressions`（banner"韩剧里的文化密码" vs 文章"韩剧里的常见表达"，主题近但标题偏差较大）

> 其余 9 张 banner（greeting-culture, kbbq-guide, kdrama-ordering, korea-shopping, korea-taboos, korean-soup, korean-spicy, seoul-25-places, seoul-districts）对应文章**不存在**，本次不用。

## 实施步骤

### 1. 类型：给 Article 加可选图片字段
`src/types/index.ts` 的 `Article` interface 加：
```ts
heroBanner?: string;   // 如 '/images/banners/seoul-subway.webp'，有则用整幅大图替代 emoji hero
```
可选字段 → 不破坏其余 34 篇。

### 2. 数据：给 6 篇文章填 heroBanner
`src/data/reading-new.ts`，在对应文章对象里加一行 `heroBanner: '/images/banners/xxx.webp'`。
仅改 6 篇，其余不动。

### 3. 阅读器 goals 步骤 hero（主用途 · `ArticleReaderClient.tsx` ~476-500）
当前：小 emoji 方块 + 标题 + 副标题的 header。
改为：**若 `article.heroBanner` 存在** → 渲染整幅 banner 图（`next/image`，圆角，宽度撑满、2:1），因为标题/meta 已在图里，隐藏重复的 emoji 方块+标题文字块；**否则** → 保持现有 emoji+标题 header 不变。
用 `next/image`：`<Image src={article.heroBanner} width={1280} height={640} className="..." priority />`，外层 `rounded-2xl overflow-hidden`。

### 4. 首页 hero-feature（`page.tsx` ~257，可选联动）
`today` 若命中这 6 篇之一 → hero-feature-img 用 banner 图替代大 emoji（banner 本就是 2:1 hero 比例，完美贴合）。否则保持 emoji。
小卡片 avatar（154）**不动**——banner 是宽图不适合小方块，且会造成"部分卡片有图部分没图"的割裂，明确不做。

### 5. 验证
- `npx tsc --noEmit`（可选字段不应报错）
- `npm run build`
- Playwright 截图：打开 `seoul-subway` 和 `convenience-store-culture` 的 goals 步骤，确认 banner 整幅显示、无重复标题；再打开一篇无 banner 的文章（如任意 B2 篇）确认仍是原 emoji header 不变；明/暗模式各一张。

## 明确不做（避免风格割裂 / 越界）
- 不用任何 scenes/ 动物城图
- 不给 40 张小卡片配缩略图
- 不为"缺图文章"强行凑图
- 不新生成图片

## 回退点
软匹配的 #5 #6 若你觉得标题对不上不满意，删掉那两行 `heroBanner` 即可，其余 4 篇强匹配保留。
