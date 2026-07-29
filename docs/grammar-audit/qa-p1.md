# P1 韩语内容审查报告

**文件**：`src/data/grammar-cards-p1.ts`
**扫描日期**：2026-07-07
**扫描方式**：静态自动扫描（`scripts/audit-grammar-per-part.mjs`）
**总卡数**：11
**总体结论**：FAIL ❌ (16 处 / 4 张卡)

---

## 覆盖检查项

- [x] Step 2 结构一致性（必填字段）
- [x] Step 3 connectionRules 汉韩混排
- [x] Step 4 cardExamples（wordBlocks 汉韩、zh 漏译）
- [x] Step 5 scenarios（ko 汉韩、zh 漏译、icon/context 齐全）
- [x] Step 6 mistakes（wrong≠correct、wrong/correct 含韩文、note 齐全）
- [x] Step 7 specialQuiz（options 数量、answer 范围、prompt/explanation 齐全）
- [ ] Step 8 조사/어미（脚本无法自动判定，需 skill 人工审）

**注**：以下检查需要 **韩语教师人工审读**，本自动脚本无法完成：
- `options[answer]` 是否符合韩语语法规则
- `mistakes.wrong` 是否学习者真实错误（vs 生造）
- 助词（은/는·이/가·을/를·(으)로·(이)나）细节校验

## FAIL 列表

| # | 卡片 | 字段 | 原文 | 问题 |
|---|------|------|------|------|
| 1 | `card-p1-l02` | `specialQuiz[0]` | options.length=3 | morph 要求恰好 4 选项 |
| 2 | `card-p1-l02` | `specialQuiz[1]` | options.length=3 | morph 要求恰好 4 选项 |
| 3 | `card-p1-l02` | `specialQuiz[2]` | options.length=3 | morph 要求恰好 4 选项 |
| 4 | `card-p1-l02` | `specialQuiz[3]` | options.length=3 | morph 要求恰好 4 选项 |
| 5 | `card-p1-l03` | `specialQuiz[0]` | options.length=3 | morph 要求恰好 4 选项 |
| 6 | `card-p1-l03` | `specialQuiz[1]` | options.length=3 | morph 要求恰好 4 选项 |
| 7 | `card-p1-l03` | `specialQuiz[2]` | options.length=3 | morph 要求恰好 4 选项 |
| 8 | `card-p1-l03` | `specialQuiz[3]` | options.length=3 | morph 要求恰好 4 选项 |
| 9 | `card-p1-l08` | `specialQuiz[0]` | options.length=3 | morph 要求恰好 4 选项 |
| 10 | `card-p1-l08` | `specialQuiz[1]` | options.length=3 | morph 要求恰好 4 选项 |
| 11 | `card-p1-l08` | `specialQuiz[2]` | options.length=3 | morph 要求恰好 4 选项 |
| 12 | `card-p1-l08` | `specialQuiz[3]` | options.length=3 | morph 要求恰好 4 选项 |
| 13 | `card-p1-l09` | `specialQuiz[0]` | options.length=3 | morph 要求恰好 4 选项 |
| 14 | `card-p1-l09` | `specialQuiz[1]` | options.length=3 | morph 要求恰好 4 选项 |
| 15 | `card-p1-l09` | `specialQuiz[2]` | options.length=3 | morph 要求恰好 4 选项 |
| 16 | `card-p1-l09` | `specialQuiz[3]` | options.length=3 | morph 要求恰好 4 选项 |

## 每卡审查摘要

- card-p1-l01: PASS
- card-p1-l02: FAIL (4 处)
- card-p1-l03: FAIL (4 处)
- card-p1-l04: PASS
- card-p1-l05: PASS
- card-p1-l06: PASS
- card-p1-l07: PASS
- card-p1-l08: FAIL (4 处)
- card-p1-l09: FAIL (4 处)
- card-p1-l10: PASS
- card-p1-l11: PASS

