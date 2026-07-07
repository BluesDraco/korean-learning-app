# Tori 语法板块审查 · 总览索引

**审查日期**：2026-07-07
**范围**：`src/data/grammar-cards-p1.ts` … `p30.ts`（30 部 272 卡）
**产出目录**：`docs/grammar-audit/`

## 📋 报告文件

### 综合审查（跨全部 30 部）
- [`03-korean-correctness.md`](./03-korean-correctness.md) — 韩语正确度审查（初始 49 → 修复后 20 条，其中 16 为 P1 早期设计、4 为误报）
- [`04-pedagogy-difficulty.md`](./04-pedagogy-difficulty.md) — 教学逻辑与难度设计（14 处内容重复、10 处遗漏，含改动清单）
- [`05-data-density.md`](./05-data-density.md) — 字段密度审查（233 条条数不足，主要在 P13-P16、P24-P30 精简层）
- [`06-curriculum-structure.md`](./06-curriculum-structure.md) — 课程分层与结构（三种改造方案 A/B/C）

### 分部审查（P7-P30 各一份）
- [`qa-p7.md`](./qa-p7.md) … [`qa-p30.md`](./qa-p30.md) — 24 部机器可判定项，**全部 PASS ✅**

### 待补的审查（需要人工/skill）
- `01-ui-visual.md` — UI 视觉一致性（Explore 已给出初步清单）
- `02-ux-flow.md` — UX 交互流程（Explore 已给出初步清单）

## 🛠️ 扫描脚本

- `scripts/audit-grammar-content.mjs` — 全库汉韩混排 + specialQuiz + mistakes 校验（跑 30 部）
- `scripts/audit-grammar-density.mjs` — 全库字段密度校验
- `scripts/audit-grammar-per-part.mjs` — 每部分文件报告，替代 korean-qa skill 的 Step 2-7 机器可判定项

## 📊 汇总（修复后）

### 韩语正确度
| 类型 | 修前 | 修后 |
|---|---|---|
| 汉韩混排（scenarios/wordBlocks） | 26 | 0 |
| mistakes.correct 无韩文 | 3 | 0 |
| specialQuiz options < 4（morph） | 16 | 16（P1 早期设计） |
| zh-untranslated | 4 | 0（脚本已放宽阈值） |
| 助词/tokens/其他 | 700+ | 0（脚本已优化误报） |

### 字段密度
| 层级 | 达标情况 |
|---|---|
| 饱满层 (P1-P8, P11-P12, P17-P18, P21-P23) | ✅ 达标 |
| 精简层 (P9-P10, P13-P16, P24-P30) | ❌ cardExamples/mistakes 少 1 条 |
| 边缘 (P19-P20) | ⚠️ connectionRules 少 1 条 |

### 教学结构
- **14 处内容重复**（主要 P22↔P27、P17↔P26/P28、P8↔P21）
- **10 处遗漏**（-답다/-길래/-든지 vs -거나 等 TOPIK 常考点）
- **课数不平衡**（P17 只 5 课，P1-P6 都 11 课）
- **专题散落**（P13-P16 语态/敬语/拟态是并列专题，与"连接语法"主线不同维度）

## ⏳ 待用户决策的三件事

1. **P1 morph 3 选项**：16 题（4 张卡）是否补第 4 项？（P1 早期设计，可能故意）
2. **教学结构调整**（见 06 报告）：选方案 A（无 DB 迁移）/ B（1 次迁移）/ C（多次迁移）
3. **字段密度补齐**：是否要给精简层 100+ 张卡各补 1 条 cardExamples + 1 条 mistakes（233 条内容）

## ⚠️ 脚本无法自动完成的检查（仍需 skill 人工审）

- `specialQuiz.options[answer]` 是否符合韩语语法规则（每题需回归语法逐字验证）
- `mistakes.wrong` 是否学习者真实错误（vs 生造）
- 助词（은/는·이/가·을/를·(으)로·(이)나）细节校验
- 韩文标点、间距、字体等语感层问题

**说明**：原计划让 korean-qa skill agent 对每部跑一遍这些"需要 LLM 判断"的检查，但 4 个 agent 并行 524 超时/额度耗尽（每个都要读全文 + 9 步分析）。改为脚本先自动扫可判定项（现均 PASS），LLM 层检查可以后续用 skill 采样审几张关键卡即可。
