# Day 37 · 火锅派对 · Round 1 审查

**文件**：src/data/diary/days/day-37.ts

## A. 结构正确性
- ✓ A1..A7

## B. 韩语正确性
- ✓ B1 조사 받침
  - 우리 집**에서** / 훠궈 / 재료 / 몇 시**에** / 뭐 / 산책**할까요** / 밥**이랑** / 국**이** / 땀**이** / 냄새**가** / 친구들**을**
- ✓ B2 종결어미：Tori 对朋友用 반말（먹을래? / 준비할게），符合关系；grammar 明确 반말/해요 두 层级
- ✓ B3 汉韩混排（原 "无收음" 已在 Day 35 批处理中修）
- ✓ B4 hangul
- ✓ B5..B9
- ✓ B7 composeAnswer "오늘 밤에 우리 집에서 훠궈 먹을래" 匹配 dialogue line 1

## C. 剧情一致性
- ✓ 全过；NPC：Junho/Minji/Haru 一致

## FAIL
- 无（原 line 179 "无收음" 已在 Day 35 批处理时统一修复）

## WARN
- o2 audioKo "같이 먹으니까 더 맛있어요" 场景语句选得偏常规，不完全贴 dialogue 原文，但语法/pos 正确不修

## 结论
**PASS**
