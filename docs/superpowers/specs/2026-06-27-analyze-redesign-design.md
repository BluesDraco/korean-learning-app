# 学习拆解模块全面升级 — 设计文档

**日期**：2026-06-27
**负责**：Tori Korean
**关联代码**：`src/app/ai/analyze/page.tsx`、`src/app/api/ai/analyze/route.ts`、`src/locales/{zh,en}.ts`

## 背景

`/ai/analyze` 是用户输入韩文文本后做翻译 + 拆解的页面，现有 3 个模式：快速翻译 / 学习拆解 / 深度解析。

**用户反馈**：
- 拆解功能"比点词查词都不如"，太单薄
- 快速翻译模式跟通用翻译工具没差异，可砍
- 学习拆解 vs 深度解析现在的区别只是"长度"，用户感知不到
- 深度解析要真的"深"

**根因**（调研发现）：
AI prompt 层已经返回了 12+ 个字段（overview、difficultyReason、grammar.simpleExample、conjugation、example、structure 等），但前端 UI 只渲染了 4 个（pattern、usage、text、meaning），把 AI 已生成的内容**浪费了 70%**。问题不在 AI prompt，在于 UI 没把内容展示出来 + 缺少教学化设计。

## 用户场景（5/5 五五开）

- **A 类（看不懂的句子）**：复制一段韩文进来查，5-15 秒一屏看懂就走
- **B 类（学习教材原文）**：把一段课文进来吃透，3-8 分钟，结果沉淀到个人资源库

## 目标

1. 砍掉「快速翻译」模式，简化为「学习拆解」+「深度解析」两个模式
2. 两个模式做出**质的差异**而非量的差异：
   - 学习拆解 = 句法可视化 + 结构图 + 紧凑教学卡（A 类用户）
   - 深度解析 = 篇章理解 + 资源化沉淀 + 测验闭环（B 类用户）
3. 让前端把 AI 返回的所有字段真正用上

## 非目标（这次不做）

- 不做语音输入
- 不做多语言（保留 zh + en 既有）
- 不动 SRS 算法
- 不为 analyze 单独建 grammarLibrary 表（用现有 `db.sentences` + 既有词库即可）

---

## 模式定位

### 边界

| 维度 | 学习拆解 | 深度解析 |
|------|---------|---------|
| slogan | 一句话看懂 | 一段话学透 |
| 输入限制 | 1-50 字（韩文） | 50-500 字 |
| 输入 < 50 选了深度 | 留在深度，提示"可省时用拆解" | — |
| 输入 > 50 选了拆解 | 提示"内容较长，推荐用深度解析" | — |
| 默认模式 | learn | — |
| 用户预期耗时 | 5-15 秒 | 3-8 分钟 |
| 交互重心 | 看 + 听 + 收藏整句 | 点击下钻 + 沉淀 |

### 砍除清单

- `analyzeModeTranslate` 函数：删除
- `mode === 'translate'` 路由分支：删除
- UI 模式 tab `translate`：删除
- i18n 中 `analyze.mode_translate*` keys：保留但停止引用（向后兼容）

---

## 学习拆解（Learn 模式）

### 内容卡片结构（从上到下，单卡片一屏）

1. **原文 + 罗马音 + 听**
   - 韩文大字（24-28px），下面淡色罗马音
   - 右上角喇叭 + 慢速按钮
2. **翻译**
   - 自然译文（17px 主色）
   - 直译（可折叠，"▸ 直译"展开）
3. **句子结构图**（新功能）
   - 横向 4 列：主语 / 谓语 / 宾语 / 修饰
   - 每列标韩文 + 中文对应 + 角色色块
   - 没有对应成分的列留空
4. **关键词（3-5 个）**
   - 卡片列表，每张：韩文 + 罗马音 + 词性 chip + 中文 + 1 例句 + [+ 加入词库] 按钮
5. **关键语法（1-2 个）**
   - 卡片：句型 + 名称 + level chip + 一句话用法 + 变形对照表（活用形→意思）+ 与近似语法对比 + 常见错误
6. **底部三按钮**：历史 / 保存整句 / 加入复习（保留现有）

### AI 返回 schema（learn mode）

```json
{
  "mode": "learn",
  "romanization": "全句罗马音",
  "fullTranslation": "自然译文",
  "literalTranslation": "直译（可选）",
  "structure": [
    { "role": "主语" | "谓语" | "宾语" | "修饰", "text": "韩文片段", "meaning": "中文对应" }
  ],
  "words": [
    {
      "text": "韩文词",
      "romanization": "罗马音",
      "partOfSpeech": "词性",
      "meaning": "中文",
      "emoji": "📚",
      "example": "原句外的1例句"
    }
    // 3-5 个，按重要度排序
  ],
  "grammar": [
    {
      "pattern": "~은/는",
      "title": "主题助词",
      "level": "初级",
      "usage": "标记话题",
      "conjugation": [
        { "form": "辅音收尾 + 은", "example": "책은" },
        { "form": "元音收尾 + 는", "example": "나는" }
      ],
      "contrast": "vs ~이/가：~은/는 强调话题，~이/가 强调新信息",
      "mistake": "不要把所有主语都用 ~은/는，第一次出现新信息用 ~이/가",
      "examples": ["나는 학생이에요", "책은 책상 위에"]
    }
    // 1-2 个
  ]
}
```

---

## 深度解析（Deep 模式）

### 模块结构（每块可折叠，按阅读顺序）

1. **概览 + 难度** — 常驻展开。主题 / 语气 / 场景三个 chip，难度卡片含依据
2. **全文翻译 + 逐句对照** — 常驻展开。左韩右中，每句独立喇叭，5-15 句
3. **词汇库** — 默认展开。按重要度分组（核心 / 常用 / 进阶），每个词可点开看 3 例句 + 近义词
4. **语法专题** — 默认展开。每个语法独立卡片，含变形表 + 3 例句 + 常见错误
5. **文化/表达注释** — 默认折叠，有就显示，没有不显示
6. **学完测验** — 默认折叠。5 题，题型 4 种（选意 / 选词填空 / 翻译选择 / 找语法）
7. **打包入库** — 底部 chip 区。词汇全部入词库（一键）+ 整段入句库 + 错题入复习池

### AI 返回 schema（deep mode）

```json
{
  "mode": "deep",
  "overview": {
    "topic": "讨论一段周末计划",
    "tone": "随意/口语",
    "scenario": "朋友间对话"
  },
  "difficulty": "中级",
  "difficultyReason": "包含 -(으)면서 + -아/어 보다 中级语法，3 个核心词为TOPIK 3级",
  "fullTranslation": "完整中文",
  "sentences": [
    { "korean": "...", "chinese": "...", "structure": "主谓宾" }
    // 5-15 句
  ],
  "words": [
    {
      "text": "韩文词",
      "romanization": "...",
      "partOfSpeech": "...",
      "meaning": "...",
      "importance": "核心" | "常用" | "进阶",
      "examples": ["例1", "例2", "例3"],
      "synonyms": ["近义词1", "近义词2"]
    }
    // 10-20 个
  ],
  "grammar": [
    {
      "pattern": "-(으)면서",
      "title": "同时进行",
      "level": "中级",
      "meaning": "一边...一边...",
      "usage": "表示两个动作同时进行",
      "conjugation": [
        { "form": "动词词干 + 으면서", "example": "먹으면서" },
        { "form": "动词词干 + 면서", "example": "가면서" }
      ],
      "examples": ["원문例", "教学例1", "教学例2"],
      "mistake": "主语必须一致：'먹으면서 비가 와요'是错的",
      "contrast": "vs -고：-(으)면서 强调同时性"
    }
    // 2-4 个
  ],
  "cultureNotes": [
    { "anchor": "원어 표현", "explanation": "为什么这么说" }
    // 0-3 个，AI 判断有才返回
  ],
  "quiz": [
    {
      "type": "meaning" | "cloze" | "translate" | "grammar",
      "question": "题目",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "为什么"
    }
    // 5 题
  ]
}
```

---

## 视觉规范

延用 CLAUDE.md 颜色体系（`--pink-primary`、`--mint`、`--ink` 等），不引入新色。

- **结构图角色色块**：主语=`--pink-soft`、谓语=`--mint`、宾语=`--purple-soft`、修饰=灰
- **词性 chip**：复用 `/grammar` 已有样式
- **语法 level chip**：初级=mint、中级=pink、高级=coral
- **importance chip**（deep 词汇库）：核心=pink-primary、常用=ink-2、进阶=muted
- **词卡片点开下钻**：用 details/summary 或 useState 折叠

---

## 数据流改动清单

### 已有数据三件套（无需改动）
- `db.words`（IndexedDB，加入词库）
- `db.sentences`（加入句库）
- `db.reviewQueue`（加入复习）

### API 层
- `src/app/api/ai/analyze/route.ts`：删 translate 函数 / 改两个 prompt / max_tokens 上调

### 前端层
- `src/app/ai/analyze/page.tsx`：
  - mode 类型从 `'translate' | 'learn' | 'deep'` 改 `'learn' | 'deep'`
  - 模式 tabs 2 个
  - 新增 `<SentenceStructureChart>`、`<WordCardExpanded>`、`<GrammarTeachingCard>`、`<AnalyzeQuiz>`、`<DeepModuleSection>` 子组件
  - 渲染逻辑大改
- `src/locales/{zh,en}.ts`：新增 keys（`analyze.structure.subject` 等）

### i18n keys 新增
- `analyze.structure.subject` / `predicate` / `object` / `modifier`
- `analyze.word.example_label` / `synonym_label`
- `analyze.grammar.conjugation_label` / `contrast_label` / `mistake_label`
- `analyze.deep.overview` / `difficulty_reason` / `culture_notes` / `quiz` / `pack_all`
- `analyze.quiz.type_meaning` / `cloze` / `translate` / `grammar`
- `analyze.toast_quiz_done`

---

## Phase 分期

### Phase 1（这次做）— 内容密度翻倍
**范围**：让 AI 真正返回新字段，前端把所有字段渲染出来。**不动测验、不动一键打包。**

- API 层改 prompt schema（learn + deep）
- 删 translate 函数 + 路由分支
- 模式 tabs 2 个 + 输入校验提示
- 学习拆解新组件：句子结构图、词卡（含例句）、语法教学卡（变形 + 对比 + 错误）
- 深度解析新组件：概览卡、逐句卡、按 importance 分组的词汇库、独立语法专题卡、文化注释
- 词卡 / 语法卡可下钻展开
- i18n keys 新增（zh + en 同步）

**验收**：
- 模式只剩 2 个
- 学习拆解 ≤ 50 字单卡片完整，结构图 + 直译 + 罗马音三大新元素都呈现
- 深度解析 6 块（除测验、打包外）都正确渲染
- AI 失败错误提示而不是塞迷你词典（沿用 6-27 早些时候改动）
- tsc + lint + build 通过
- 截图对比新旧效果，密度明显提升

### Phase 2（之后）— 资源化沉淀
- 深度解析词汇库底部"全部加入词库"按钮
- 整段保存到 `db.sentences`（已有，接通即可）
- "一键加入复习"扩展为整段所有重点句

### Phase 3（之后）— 测验闭环
- `<AnalyzeQuiz>` 组件：4 种题型 + 判题 + 进度
- 错题自动入复习池
- 测验结果展示

---

## 风险点

| 风险 | 影响 | 应对 |
|------|------|------|
| AI 返回字段更多 → max_tokens 不够 → 截断 | 用户得到不完整 JSON，UI 报错 | learn 上调到 2500，deep 上调到 5000；前端容错：字段缺失时降级显示 |
| 输入超 500 字限制不变，但新 schema 更复杂 | DeepSeek 可能更慢 | 保留 30s/45s timeout；测一下 95 分位响应时间 |
| 旧用户 localStorage 历史记录里有 translate mode 数据 | 加载历史时找不到字段崩溃 | 历史读取时检测 mode === 'translate' → 显示为只读文本 + 提示"老数据，重新分析" |
| 文化注释 AI 给得不靠谱 | 用户看到尴尬内容 | prompt 严格要求"不确定就不返回"；前端 `cultureNotes.length === 0` 时整块不显示 |
| Phase 1 已经是大改动，UI 重排 | 视觉走样 | 改完手动跑一遍三种典型输入（短句 / 短段 / 长段）截图验收 |
| 结构图角色判别准确性 | AI 标错主谓宾 | prompt 加示例 + 加"宁可空也不要错标"约束 |

---

## 测试与验证

1. 用户输入 3 类典型样本：
   - 短句："토끼는 시장에 가요."（学习拆解）
   - 中段（50-150 字）：一段日记（深度解析）
   - 长段（300-500 字）：一篇短文（深度解析）
2. 对比改动前后截图，确认密度提升
3. tsc + lint + build
4. 部署前在本地 dev 跑通
5. 部署后清 EdgeOne 缓存
