# Analyze 模块全面升级 — Phase 1 实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 把 `/ai/analyze` 从"翻译 + 单薄词卡"升级成"句法可视化 + 教学化词卡 + 篇章级深度解析"，砍掉快速翻译模式。

**Architecture:** 改后端 AI prompt schema（让 AI 多返回结构化字段），改前端 UI 把 AI 已返回的字段全部渲染出来。两个模式做出质的差异：学习拆解=单卡片紧凑、深度解析=多模块可下钻。

**Tech Stack:** Next.js 16 / React 19 / TypeScript / DeepSeek API / Tailwind v4 / IndexedDB (Dexie)

**Spec 参考:** `docs/superpowers/specs/2026-06-27-analyze-redesign-design.md`

**关键约束:**
- 项目无单测，验证靠手工跑 dev + tsc + lint + build + 截图
- 改完每个 Task 都要跑 `npx tsc --noEmit` 确认类型不破
- 部署不在本计划范围（用户说"部署"才执行）

---

## 回滚策略

每个 Task 都独立提交。出问题 `git revert <task-commit-sha>` 可回到改前。三条不可回滚红线：
- Task 1 删 translate 模式后，旧 localStorage 历史里 `mode: 'translate'` 数据会变只读 — 这是预期行为
- Task 3 改 AI prompt 后，旧缓存 `analyze_cache` 里的结果 schema 跟新 UI 不匹配 — 旧缓存自然过期（TTL 30天）或手工清表
- Phase 1 不动数据库 schema（IndexedDB、Turso），所以不存在数据迁移风险

---

## Task 1: 砍掉 translate 模式（后端 + 前端）

**文件：**
- Modify: `src/app/api/ai/analyze/route.ts`（删 `analyzeModeTranslate` 函数 + `mode === 'translate'` 分支）
- Modify: `src/app/ai/analyze/page.tsx`（mode union 改 `'learn' | 'deep'`、tabs 从 3 个变 2 个、删 translate 相关 UI 块）
- Modify: `src/locales/zh.ts`、`src/locales/en.ts`（停止使用 mode_translate keys，但**保留 key 不删**，旧历史记录加载时可能引用）

**Step 1: 改后端 route.ts**

`src/app/api/ai/analyze/route.ts` 改动：
- 删除 `analyzeModeTranslate` 整个函数（第 11-40 行）
- POST handler 里 `if (resolvedMode === 'translate')` 分支删除
- `effectiveMode = mode || 'learn'` 保留
- 由于 translate 模式没了，`resolvedMode !== 'translate'` 的条件不再需要

**Step 2: 跑 tsc**

```bash
npx tsc --noEmit 2>&1 | tail -10
```

预期：无错误。

**Step 3: 改前端 mode 类型**

`src/app/ai/analyze/page.tsx`：
- 搜 `'translate' | 'learn' | 'deep'` 全部改为 `'learn' | 'deep'`
- 搜 `mode === 'translate'` 整个分支 + 相关 JSX 删除
- mode tabs 渲染从 3 项变 2 项（去掉数组里 mode_translate 那一项）
- 默认 mode 保持 'learn'

**Step 4: 改 i18n（保留旧 key 兼容历史记录）**

`src/locales/zh.ts` 和 `en.ts`：
- 新增 key `analyze.input_hint_too_long`: '内容较长，推荐用「深度解析」'
- 新增 key `analyze.input_hint_too_short_for_deep`: '内容较短，"学习拆解"会更快'
- 新增 key `analyze.legacy_translate_notice`: '这是老数据，建议重新分析'
- `analyze.mode_translate*` 全部保留（兼容老历史记录展示）

**Step 5: 历史记录兼容**

`src/app/ai/analyze/page.tsx` 加载历史时，如果 `item.result.mode === 'translate'`：
- 渲染只读卡片显示翻译文本 + 提示 `legacy_translate_notice`
- 不让用户在 translate 模式下继续操作

**Step 6: 跑 tsc + lint + build**

```bash
npx tsc --noEmit && npm run lint 2>&1 | tail -5 && npm run build 2>&1 | tail -5
```

**Step 7: 手工验证**

跑 dev server，用三种输入测：
- 短句"안녕하세요" → 默认 learn 模式 → 能正常返回结果
- 切到深度解析 → 能切（之前是 3 tabs，现在是 2 tabs）
- 打开历史 → 老的 translate 记录显示为只读 + 提示

**Step 8: Commit**

```bash
git add src/app/api/ai/analyze/route.ts src/app/ai/analyze/page.tsx src/locales/zh.ts src/locales/en.ts
git commit -m "refactor: remove quick-translate mode from analyze, keep 2 modes only"
```

---

## Task 2: 输入校验提示（< 50 推荐学习、≥ 50 推荐深度）

**文件：**
- Modify: `src/app/ai/analyze/page.tsx`

**Step 1: 加 input 长度推荐逻辑**

在 input 区下方加 helper 文案：
- 当前模式 = learn 且输入韩文字符数 ≥ 50 → 显示 `analyze.input_hint_too_long`
- 当前模式 = deep 且输入韩文字符数 < 50 → 显示 `analyze.input_hint_too_short_for_deep`
- 其他情况不显示

韩文字符数：`input.replace(/\s/g, '').length`（沿用现有 isLong 逻辑）

**Step 2: 跑 tsc + 手工测**

```bash
npx tsc --noEmit
```

dev server 验证：
- 输入"안녕하세요"，当前 learn 模式 → 不显示提示
- 输入长段（60+ 字），当前 learn 模式 → 显示"内容较长，推荐..."
- 切到 deep，输入"안녕하세요" → 显示"内容较短，..."

**Step 3: Commit**

```bash
git add src/app/ai/analyze/page.tsx
git commit -m "feat: add input length hint based on mode"
```

---

## Task 3: 改 AI prompt — learn 模式 schema 升级

**文件：**
- Modify: `src/app/api/ai/analyze/route.ts`（`analyzeModeLearn` 函数 prompt + max_tokens）
- Modify: `src/types/index.ts` 或对应类型文件（如果有 AnalysisResult 类型）

**Step 1: 找类型定义**

```bash
grep -rn "AnalysisResult" src/ --include="*.ts" --include="*.tsx" | head -10
```

如果类型在 `page.tsx` 内部：直接在 page.tsx 里改。如果在 types/index.ts：去那改。

**Step 2: 扩 AnalysisResult 类型**

新增可选字段：
```typescript
type StructureRole = '主语' | '谓语' | '宾语' | '修饰';
type StructureItem = { role: StructureRole; text: string; meaning: string };
type ConjugationItem = { form: string; example: string };

// words 加 romanization、example
// grammar 加 level、conjugation、contrast、mistake（examples 已有）
// 顶层加 romanization、literalTranslation、structure
```

字段全部 optional（向后兼容旧 cached 数据）。

**Step 3: 改 prompt**

`analyzeModeLearn` 函数里的 system prompt 重写：
- 要求返回 romanization（全句罗马音）
- 要求返回 literalTranslation（直译）
- 要求返回 structure 数组（主谓宾修饰）
- words 每个加 romanization、example（原句之外的例句）
- grammar 每个加 level（"初级"|"中级"|"高级"）、conjugation 数组（活用形→例）、contrast（与近似语法对比）、mistake（常见错误）
- 关键词限制 3-5 个
- 语法限制 1-2 个

max_tokens: 1500 → 2500。

**Step 4: 测后端 API**

```bash
curl -X POST http://localhost:3000/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{"sentence":"토끼는 시장에 가요.","mode":"learn"}' \
  | jq .
```

确认返回 JSON 包含 romanization、literalTranslation、structure 数组、words 含 example、grammar 含 conjugation/contrast/mistake。

**Step 5: 跑 tsc**

```bash
npx tsc --noEmit
```

旧 UI 此时还没渲染新字段，但不应报类型错（新字段全 optional）。

**Step 6: Commit**

```bash
git add src/app/api/ai/analyze/route.ts src/types/index.ts
git commit -m "feat(api): expand learn-mode schema with structure/conjugation/contrast/mistake"
```

---

## Task 4: 改 AI prompt — deep 模式 schema 升级

**文件：**
- Modify: `src/app/api/ai/analyze/route.ts`（`analyzeModeDeep` 函数 prompt + max_tokens）
- Modify: AnalysisResult 类型（继续扩）

**Step 1: 扩类型**

```typescript
type Importance = '核心' | '常用' | '进阶';
type DeepOverview = { topic: string; tone: string; scenario: string };
type CultureNote = { anchor: string; explanation: string };
// words 加 importance、examples (string[])、synonyms (string[])
// 顶层加 overview (DeepOverview)、difficultyReason、cultureNotes
// （quiz 字段 Phase 3 才加，本期不加）
```

全部 optional。

**Step 2: 改 prompt**

`analyzeModeDeep` 函数 prompt 重写：
- overview 对象（topic / tone / scenario）
- difficulty + difficultyReason
- sentences 5-15 句（已有，扩字段保持现有 structure 即可）
- words 10-20 个，每个带 importance、examples（3 个）、synonyms（2 个）
- grammar 2-4 个，schema 跟 learn 同款（conjugation/contrast/mistake/examples）
- cultureNotes 0-3 个（不确定就不返回）
- **不加 quiz**（Phase 3）

max_tokens: 3000 → 5000。

**Step 3: 测后端**

```bash
curl -X POST http://localhost:3000/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{"sentence":"오늘은 시장에 다녀왔어요. 사과와 배추, 고기를 샀어요. 저녁에 김치찌개를 끓이고 가족과 함께 먹을 거예요.","mode":"deep"}' \
  | jq .
```

确认 overview、difficultyReason、words[].importance、grammar[].conjugation、cultureNotes（可能为空）都在。

**Step 4: 跑 tsc**

```bash
npx tsc --noEmit
```

**Step 5: Commit**

```bash
git add src/app/api/ai/analyze/route.ts src/types/index.ts
git commit -m "feat(api): expand deep-mode schema with overview/importance/culture notes"
```

---

## Task 5: 学习拆解 UI — 原文 + 罗马音 + 直译

**文件：**
- Modify: `src/app/ai/analyze/page.tsx`（learn 模式渲染块）
- Modify: `src/locales/{zh,en}.ts`（新 i18n keys）

**Step 1: 新增 i18n keys**

zh.ts / en.ts 加：
- `analyze.literal_label`: '直译' / 'Literal'
- `analyze.toggle_literal`: '▸ 显示直译' / '▸ Show literal'
- `analyze.toggle_literal_hide`: '▾ 隐藏直译' / '▾ Hide literal'
- `analyze.romanization_label`: '罗马音' / 'Romanization'

**Step 2: 改 learn 模式翻译卡**

现有翻译卡（page.tsx 第 904-934 行）：
- 在原文行加 romanization（淡色小字，14px，cream-2 色）
- 在自然译文下方加可折叠的"直译"区（useState 控制）

**Step 3: 手工验证**

dev server：
- learn 模式输入"안녕하세요" → 原文下方有罗马音 → 自然译文下方有"▸ 显示直译"按钮 → 点击展开

**Step 4: 跑 tsc + lint**

```bash
npx tsc --noEmit && npm run lint 2>&1 | tail -3
```

**Step 5: Commit**

```bash
git add src/app/ai/analyze/page.tsx src/locales/zh.ts src/locales/en.ts
git commit -m "feat(analyze/learn): render romanization and literal translation"
```

---

## Task 6: 学习拆解 UI — 句子结构图（新组件）

**文件：**
- Create: `src/components/analyze/SentenceStructureChart.tsx`
- Modify: `src/app/ai/analyze/page.tsx`（接入新组件）
- Modify: `src/locales/{zh,en}.ts`（角色标签）

**Step 1: 新 i18n keys**

- `analyze.structure.subject`: '主语' / 'Subject'
- `analyze.structure.predicate`: '谓语' / 'Predicate'
- `analyze.structure.object`: '宾语' / 'Object'
- `analyze.structure.modifier`: '修饰' / 'Modifier'
- `analyze.structure_title`: '句子结构' / 'Sentence Structure'

**Step 2: 写 SentenceStructureChart 组件**

`src/components/analyze/SentenceStructureChart.tsx`：

```tsx
'use client';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';

type Role = '主语' | '谓语' | '宾语' | '修饰';
type Item = { role: Role; text: string; meaning: string };
const ROLE_COLOR: Record<Role, { bg: string; ink: string; key: string }> = {
  '主语': { bg: 'var(--color-pink-soft)',   ink: 'var(--color-pink-strong)', key: 'analyze.structure.subject' },
  '谓语': { bg: 'var(--color-mint-soft)',   ink: 'var(--color-mint-strong)', key: 'analyze.structure.predicate' },
  '宾语': { bg: 'var(--color-purple-soft)', ink: 'var(--color-ink-2)',       key: 'analyze.structure.object' },
  '修饰': { bg: 'var(--color-surface-2)',   ink: 'var(--color-ink-3)',       key: 'analyze.structure.modifier' },
};

export function SentenceStructureChart({ items }: { items: Item[] }) {
  const { lang } = useLang();
  if (!items || items.length === 0) return null;
  return (
    <div>
      <h3 style={{ fontSize: 13, fontWeight: 800, margin: '12px 0 8px', color: 'var(--color-ink-3)' }}>
        {t('analyze.structure_title', lang)}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, gap: 6 }}>
        {items.map((it, i) => {
          const c = ROLE_COLOR[it.role] ?? ROLE_COLOR['修饰'];
          return (
            <div key={i} style={{ padding: 10, borderRadius: 14, background: c.bg, textAlign: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: c.ink, marginBottom: 4 }}>
                {t(c.key, lang)}
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-ink)', marginBottom: 2 }}>
                {it.text}
              </div>
              <div style={{ fontSize: 11, color: 'var(--color-ink-3)' }}>{it.meaning}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

注意：颜色变量必须确认存在于现有 globals.css，不存在的话改成已有的 var。

**Step 3: 验证颜色变量存在**

```bash
grep -E "(--color-pink-soft|--color-mint-soft|--color-purple-soft|--color-surface-2)" src/app/globals.css | head
```

任何缺失：替换为现有的（如 `--color-pink-soft` → `--pink-soft`，看实际命名）。

**Step 4: 接入 page.tsx**

learn 模式渲染中（翻译卡和词卡之间）插入 `<SentenceStructureChart items={result.structure ?? []} />`。

**Step 5: 手工验证**

dev server：
- learn 模式分析"토끼는 시장에 가요" → 翻译卡下方出现 4 列结构图（主语/修饰/宾语/谓语）
- 老缓存命中（不带 structure） → 结构图不显示（空数组）

**Step 6: tsc + lint**

```bash
npx tsc --noEmit && npm run lint 2>&1 | tail -3
```

**Step 7: Commit**

```bash
git add src/components/analyze/SentenceStructureChart.tsx src/app/ai/analyze/page.tsx src/locales/zh.ts src/locales/en.ts
git commit -m "feat(analyze/learn): add sentence structure chart"
```

---

## Task 7: 学习拆解 UI — 词卡升级（含罗马音 / 词性 / 例句）

**文件：**
- Create: `src/components/analyze/AnalyzeWordCard.tsx`
- Modify: `src/app/ai/analyze/page.tsx`（接入）
- Modify: `src/locales/{zh,en}.ts`

**Step 1: 新 i18n keys**

- `analyze.word.example_label`: '例句' / 'Example'
- `analyze.word.expand`: '展开' / 'Expand'
- `analyze.word.collapse`: '收起' / 'Collapse'

**Step 2: 写 AnalyzeWordCard 组件**

`src/components/analyze/AnalyzeWordCard.tsx`：

```tsx
'use client';
import { useState } from 'react';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';

type Word = {
  text: string;
  romanization?: string;
  partOfSpeech?: string;
  meaning: string;
  emoji?: string;
  example?: string;
};

type Props = {
  word: Word;
  saved: boolean;
  onSave: () => void;
  onSpeak: (text: string) => void;
};

export function AnalyzeWordCard({ word, saved, onSave, onSpeak }: Props) {
  const { lang } = useLang();
  const [expanded, setExpanded] = useState(false);
  const hasDetails = !!word.example;
  return (
    <div style={{ padding: 12, borderRadius: 18, background: 'var(--color-cream)', border: '1px solid var(--color-line)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {word.emoji && <span style={{ fontSize: 18 }}>{word.emoji}</span>}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <strong style={{ fontSize: 15 }}>{word.text}</strong>
            {word.romanization && <span style={{ fontSize: 11, color: 'var(--color-ink-3)' }}>{word.romanization}</span>}
            {word.partOfSpeech && <span style={{ fontSize: 10, padding: '1px 6px', borderRadius: 6, background: 'var(--color-surface-2)', color: 'var(--color-ink-3)' }}>{word.partOfSpeech}</span>}
          </div>
          <div style={{ fontSize: 12, color: 'var(--color-ink-2)', marginTop: 2 }}>{word.meaning}</div>
        </div>
        <button onClick={() => onSpeak(word.text)} aria-label="speak" style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14 }}>🔊</button>
        <button onClick={onSave} style={{
          height: 28, padding: '0 10px', borderRadius: 999, fontSize: 11, fontWeight: 800,
          border: '1px solid var(--color-line)',
          background: saved ? 'var(--color-mint-soft)' : 'var(--color-pink-soft)',
          color: saved ? 'var(--color-mint-strong)' : 'var(--color-pink-strong)',
          cursor: 'pointer',
        }}>
          {saved ? '✓' : '+'}
        </button>
      </div>
      {hasDetails && (
        <>
          <button onClick={() => setExpanded(v => !v)} style={{ marginTop: 6, fontSize: 11, color: 'var(--color-ink-3)', border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}>
            {expanded ? '▾ ' + t('analyze.word.collapse', lang) : '▸ ' + t('analyze.word.expand', lang)}
          </button>
          {expanded && word.example && (
            <div style={{ marginTop: 6, padding: 8, borderRadius: 10, background: 'var(--color-surface-2)', fontSize: 12, color: 'var(--color-ink-2)' }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-ink-3)', marginRight: 4 }}>
                {t('analyze.word.example_label', lang)}
              </span>
              {word.example}
            </div>
          )}
        </>
      )}
    </div>
  );
}
```

**Step 3: 接入 page.tsx**

learn 模式现有词卡 grid 渲染替换为 `<AnalyzeWordCard ... />`，slice 改 3-5 个（learn mode 关键词限制）。

**Step 4: 手工验证 + tsc + lint**

```bash
npx tsc --noEmit && npm run lint 2>&1 | tail -3
```

dev：
- learn 模式分析句子 → 词卡显示罗马音 + 词性 chip + 例句可展开
- 点喇叭能听单词
- 点 + 加入词库正常工作

**Step 5: Commit**

```bash
git add src/components/analyze/AnalyzeWordCard.tsx src/app/ai/analyze/page.tsx src/locales/zh.ts src/locales/en.ts
git commit -m "feat(analyze/learn): upgrade word card with romanization/POS/example"
```

---

## Task 8: 学习拆解 UI — 语法教学卡（含变形表 / 对比 / 常见错误）

**文件：**
- Create: `src/components/analyze/GrammarTeachingCard.tsx`
- Modify: `src/app/ai/analyze/page.tsx`
- Modify: `src/locales/{zh,en}.ts`

**Step 1: 新 i18n keys**

- `analyze.grammar.conjugation_label`: '变形' / 'Conjugation'
- `analyze.grammar.contrast_label`: '对比' / 'Contrast'
- `analyze.grammar.mistake_label`: '注意' / 'Watch out'
- `analyze.grammar.examples_label`: '例句' / 'Examples'
- `analyze.grammar.level.beginner`: '初级' / 'Beginner'
- `analyze.grammar.level.intermediate`: '中级' / 'Intermediate'
- `analyze.grammar.level.advanced`: '高级' / 'Advanced'

**Step 2: 写 GrammarTeachingCard 组件**

`src/components/analyze/GrammarTeachingCard.tsx`：

```tsx
'use client';
import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';

type Conj = { form: string; example: string };
type Grammar = {
  pattern: string;
  title?: string;
  level?: '初级' | '中级' | '高级';
  usage?: string;
  meaning?: string;
  conjugation?: Conj[];
  contrast?: string;
  mistake?: string;
  examples?: string[];
};

const LEVEL_COLOR: Record<string, { bg: string; ink: string; labelKey: string }> = {
  '初级': { bg: 'var(--color-mint-soft)', ink: 'var(--color-mint-strong)', labelKey: 'analyze.grammar.level.beginner' },
  '中级': { bg: 'var(--color-pink-soft)', ink: 'var(--color-pink-strong)', labelKey: 'analyze.grammar.level.intermediate' },
  '高级': { bg: 'var(--color-coral, #fff0e6)', ink: '#c4583c', labelKey: 'analyze.grammar.level.advanced' },
};

export function GrammarTeachingCard({ g }: { g: Grammar }) {
  const { lang } = useLang();
  const lvl = g.level && LEVEL_COLOR[g.level];
  return (
    <div style={{ padding: 14, borderRadius: 20, background: 'var(--color-mint-bg)', marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
        <strong style={{ fontSize: 15, color: 'var(--color-ink)' }}>{g.pattern}</strong>
        {g.title && <span style={{ fontSize: 13, color: 'var(--color-ink-2)' }}>{g.title}</span>}
        {lvl && (
          <span style={{ fontSize: 10, padding: '1px 8px', borderRadius: 999, background: lvl.bg, color: lvl.ink, fontWeight: 800 }}>
            {t(lvl.labelKey, lang)}
          </span>
        )}
      </div>
      {(g.meaning || g.usage) && (
        <div style={{ marginTop: 6, fontSize: 13, color: 'var(--color-ink-2)', lineHeight: 1.6 }}>
          {g.meaning ?? g.usage}
        </div>
      )}
      {g.conjugation && g.conjugation.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-ink-3)', marginBottom: 4 }}>
            {t('analyze.grammar.conjugation_label', lang)}
          </div>
          <div style={{ display: 'grid', gap: 4 }}>
            {g.conjugation.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--color-ink-2)' }}>
                <span style={{ fontWeight: 700, minWidth: '40%' }}>{c.form}</span>
                <span style={{ color: 'var(--color-ink-3)' }}>{c.example}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {g.examples && g.examples.length > 0 && (
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-ink-3)', marginBottom: 4 }}>
            {t('analyze.grammar.examples_label', lang)}
          </div>
          {g.examples.slice(0, 3).map((ex, i) => (
            <div key={i} style={{ fontSize: 12, color: 'var(--color-ink-2)', lineHeight: 1.6 }}>· {ex}</div>
          ))}
        </div>
      )}
      {g.contrast && (
        <div style={{ marginTop: 10, padding: 8, borderRadius: 10, background: 'rgba(255,255,255,0.5)', fontSize: 12, color: 'var(--color-ink-2)' }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: 'var(--color-ink-3)', marginRight: 4 }}>
            {t('analyze.grammar.contrast_label', lang)}
          </span>
          {g.contrast}
        </div>
      )}
      {g.mistake && (
        <div style={{ marginTop: 8, padding: 8, borderRadius: 10, background: 'rgba(255, 200, 200, 0.3)', fontSize: 12, color: '#8a3a3a' }}>
          <span style={{ fontSize: 10, fontWeight: 800, marginRight: 4 }}>
            ⚠ {t('analyze.grammar.mistake_label', lang)}
          </span>
          {g.mistake}
        </div>
      )}
    </div>
  );
}
```

**Step 3: 接入 page.tsx**

learn 模式现有 grammar 渲染（page.tsx 第 982-991 行）替换为 `<GrammarTeachingCard g={g} />`，slice 限制 1-2 个。

**Step 4: 手工验证 + tsc + lint**

dev：
- learn 模式分析含 ~은/는 的句子 → 语法卡显示 pattern + 标题 + 难度 chip + 变形对照 + 例句 + 对比 + 错误提示

**Step 5: Commit**

```bash
git add src/components/analyze/GrammarTeachingCard.tsx src/app/ai/analyze/page.tsx src/locales/zh.ts src/locales/en.ts
git commit -m "feat(analyze/learn): teaching grammar card with conjugation/contrast/mistake"
```

---

## Task 9: 深度解析 UI — 概览模块

**文件：**
- Modify: `src/app/ai/analyze/page.tsx`（deep 模式块）
- Modify: `src/locales/{zh,en}.ts`

**Step 1: 新 i18n keys**

- `analyze.deep.overview_title`: '概览' / 'Overview'
- `analyze.deep.topic_label`: '主题' / 'Topic'
- `analyze.deep.tone_label`: '语气' / 'Tone'
- `analyze.deep.scenario_label`: '场景' / 'Scenario'
- `analyze.deep.difficulty_reason_label`: '判断依据' / 'Why this level'

**Step 2: 改 deep 模式渲染**

deep 渲染入口（page.tsx 第 997 行）之前插入概览卡：

```tsx
{mode === 'deep' && result.overview && (
  <div style={{ padding: 16, borderRadius: 24, background: C.cream, border: '1px solid ' + C.line, marginBottom: 12 }}>
    <h3 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 10px', color: C.muted }}>
      {t('analyze.deep.overview_title', lang)}
    </h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {[
        { k: 'topic_label', v: result.overview.topic },
        { k: 'tone_label', v: result.overview.tone },
        { k: 'scenario_label', v: result.overview.scenario },
      ].filter(x => x.v).map((x, i) => (
        <span key={i} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 999, background: C.pinkSoft }}>
          <span style={{ color: C.muted, marginRight: 4 }}>{t('analyze.deep.' + x.k, lang)}:</span>
          <strong>{x.v}</strong>
        </span>
      ))}
    </div>
    {result.difficulty && (
      <div style={{ marginTop: 10, fontSize: 13 }}>
        <strong style={{ color: 'var(--color-pink-strong)' }}>{result.difficulty}</strong>
        {result.difficultyReason && (
          <span style={{ color: C.muted, marginLeft: 6 }}>· {result.difficultyReason}</span>
        )}
      </div>
    )}
  </div>
)}
```

**Step 3: 手工验证 + tsc**

```bash
npx tsc --noEmit
```

dev：deep 模式分析段落 → 顶部出现概览卡（topic/tone/scenario chip + 难度 + 依据）

**Step 4: Commit**

```bash
git add src/app/ai/analyze/page.tsx src/locales/zh.ts src/locales/en.ts
git commit -m "feat(analyze/deep): overview card with topic/tone/scenario and difficulty reason"
```

---

## Task 10: 深度解析 UI — 词汇库按 importance 分组

**文件：**
- Modify: `src/app/ai/analyze/page.tsx`
- Modify: `src/locales/{zh,en}.ts`

**Step 1: 新 i18n keys**

- `analyze.deep.importance_core`: '核心' / 'Core'
- `analyze.deep.importance_common`: '常用' / 'Common'
- `analyze.deep.importance_advanced`: '进阶' / 'Advanced'

**Step 2: 改 deep 模式词汇库渲染**

现有 deep 词汇 chip flat list（第 1020-1038 行）改为按 importance 分组（3 个 section）。复用 `<AnalyzeWordCard>`（Task 7 已建），每个词支持点开 + 例句（deep 模式 examples 是数组，取第一个）。

按 importance：核心 → 常用 → 进阶 顺序展示，每组前面有 section header。

**Step 3: tsc + lint + dev 验证**

```bash
npx tsc --noEmit && npm run lint 2>&1 | tail -3
```

dev：deep 模式 → 词汇库按"核心 / 常用 / 进阶"分 3 段显示

**Step 4: Commit**

```bash
git add src/app/ai/analyze/page.tsx src/locales/zh.ts src/locales/en.ts
git commit -m "feat(analyze/deep): vocab grouped by importance with expandable cards"
```

---

## Task 11: 深度解析 UI — 语法专题（复用 GrammarTeachingCard）

**文件：**
- Modify: `src/app/ai/analyze/page.tsx`

**Step 1: 替换 deep 语法渲染**

现有 deep grammar 渲染（第 1041-1054 行）替换为多张独立的 `<GrammarTeachingCard g={g} />`，每张独立卡片不再共用容器。

**Step 2: 手工验证**

deep 模式 → 每个语法独立成卡，含变形/对比/错误。

**Step 3: tsc + lint + Commit**

```bash
npx tsc --noEmit && npm run lint 2>&1 | tail -3
git add src/app/ai/analyze/page.tsx
git commit -m "feat(analyze/deep): full grammar teaching cards in deep mode"
```

---

## Task 12: 深度解析 UI — 文化注释模块

**文件：**
- Modify: `src/app/ai/analyze/page.tsx`
- Modify: `src/locales/{zh,en}.ts`

**Step 1: 新 i18n key**

- `analyze.deep.culture_title`: '文化与表达' / 'Culture & Expression'

**Step 2: 渲染**

deep 模式语法块之后插入：

```tsx
{mode === 'deep' && result.cultureNotes && result.cultureNotes.length > 0 && (
  <div style={{ marginBottom: 16 }}>
    <h3 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 10px', color: C.muted }}>
      {t('analyze.deep.culture_title', lang)}
    </h3>
    {result.cultureNotes.map((n, i) => (
      <div key={i} style={{ padding: 12, borderRadius: 16, background: C.pinkSoft, marginBottom: 8 }}>
        <strong style={{ fontSize: 13 }}>{n.anchor}</strong>
        <p style={{ margin: '4px 0 0', fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{n.explanation}</p>
      </div>
    ))}
  </div>
)}
```

**Step 3: 验证 + Commit**

```bash
npx tsc --noEmit
git add src/app/ai/analyze/page.tsx src/locales/zh.ts src/locales/en.ts
git commit -m "feat(analyze/deep): culture notes section"
```

---

## Task 13: AI 失败错误处理验收（已在前期改过，回归测试）

**文件：** 无需改动，回归验证

**Step 1: 模拟 AI 失败**

临时把 `DEEPSEEK_API_URL` 改为错误地址，dev 跑一次 → 应显示"AI 分析失败，请重试" toast，不显示假数据。

**Step 2: 改回**

恢复 API URL。

**Step 3: 验证无回归**

```bash
git status  # 应该是 clean
```

---

## Task 14: 全量验收 — 三类典型输入截图比对

**Step 1: 准备 3 类输入**

- 短句：`토끼는 시장에 가요.` (learn)
- 中段：`오늘은 시장에 다녀왔어요. 사과와 배추, 고기를 샀어요. 저녁에 김치찌개를 끓이고 가족과 함께 먹을 거예요.` (deep)
- 长段：找一段 300+ 字的韩文新闻或短文 (deep)

**Step 2: 在 dev server 跑这三类输入**

```bash
npm run dev -- --no-turbo
```

依次输入三段、切对应模式、截图。

**Step 3: 验证关键点**

- [ ] 短句 learn：原文有罗马音、有结构图、词卡 3-5 个含例句、语法卡含变形/对比/错误
- [ ] 中段 deep：有概览（topic/tone/scenario）、有难度依据、词汇按 importance 分组、语法卡完整
- [ ] 长段 deep：所有字段都在、不截断、AI 响应在 timeout 内

**Step 4: tsc + lint + build 全过**

```bash
npx tsc --noEmit && npm run lint && npm run build 2>&1 | tail -5
```

**Step 5: 把验证截图存到 `tmp/analyze-phase1-verification/`**

```bash
mkdir -p tmp/analyze-phase1-verification
# 手工保存截图到此目录（命名：short-learn.png、medium-deep.png、long-deep.png）
```

**Step 6: 不 commit 截图（在 .gitignore 的 tmp/）**

Phase 1 完成。

---

## 完成清单

- [ ] Task 1: 砍 translate 模式
- [ ] Task 2: 输入长度推荐提示
- [ ] Task 3: learn prompt schema 升级
- [ ] Task 4: deep prompt schema 升级
- [ ] Task 5: learn UI — 罗马音 + 直译
- [ ] Task 6: learn UI — 句子结构图
- [ ] Task 7: learn UI — 词卡升级
- [ ] Task 8: learn UI — 语法教学卡
- [ ] Task 9: deep UI — 概览模块
- [ ] Task 10: deep UI — 词汇按 importance 分组
- [ ] Task 11: deep UI — 语法专题
- [ ] Task 12: deep UI — 文化注释
- [ ] Task 13: AI 失败回归验证
- [ ] Task 14: 三类典型输入全量验收

完成后 Phase 1 闭环。Phase 2（资源化沉淀）+ Phase 3（测验闭环）另立计划。
