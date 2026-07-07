# P20 韩语内容审查报告

**文件**：`src/data/grammar-cards-p20.ts`
**扫描日期**：2026-07-07
**扫描方式**：静态自动扫描（`scripts/audit-grammar-per-part.mjs`）
**总卡数**：6
**总体结论**：PASS ✅

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

## 每卡审查摘要

- card-p20-l01: PASS
- card-p20-l02: PASS
- card-p20-l03: PASS
- card-p20-l04: PASS
- card-p20-l05: PASS
- card-p20-l06: PASS

