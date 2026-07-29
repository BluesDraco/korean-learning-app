# Day 32 · 中秋节·一个人的节日 · Round 1 审查

**文件**：src/data/diary/days/day-32.ts
**审查日期**：2026-07-08

## A. 结构正确性
- ✓ A1 类型完整
- ✓ A2 id 前缀：words d32-w1..w6、output d32-o1..o5、stickerId sticker-d32
- ✓ A3 pos：名词×5 / 表达×1
- ✓ A4 数量：words 6 / lines 6 / rules 4 / examples 4 / output 5
- ✓ A5 kind 字段自洽（compose 的 composeAnswer ⊂ tokens；每题 1 correct）
- ✓ A6 dialogue.pick line 6 有 choices 1 correct
- ✓ A7 stickerId 唯一

## B. 韩语正确性
- ✓ B1 조사 받침（逐句核）
  - 연휴**라서**（무 无收音）/ 학교**가** / 엄마**가** / 송편**이에요**（편 有 ㄴ）/ 송편**을** / 고향**이** / 눈물**이** / 저**는** / 엄마**를** / 엄마**는** / 송편**이** 맛있어서 세 개**나**（개 无收音）/ 단맛**과** 짠맛**이**（맛 有 ㅅ）
- ✓ B2 종결어미：Haru 해요体对同学，Tori 内心独白 ~네요，pick 选项 해요体均自然
- ✓ B3 汉韩混排：rules 说明"阳性元音(ㅏ/ㅗ) → 아서" 属教学白名单
- ✓ B4 hangul 罗马音全部合规
- ✓ B5 grammar.rules 每条都给了韩文形式
- ✓ B6 examples.highlight 均在 ko 内命中
- ✓ B7 composeAnswer 拼 "고향이 보고 싶어서 울었어요" 与 zhHint 一致
- ✓ B8 干扰项错得合理（맛있었어서 时态错/송편은 助词错/연휴어서·이라서·라니까 典型学生错）
- ✓ B9 pos 与词性一致

## C. 剧情一致性
- ✓ C1 day=2 + id d32
- ✓ C2 phase expansion
- ✓ C3 level intermediate
- ✓ C4 NPC：Haru（与 Day 31 一致）

## FAIL 清单
无。

## WARN
无。

## 结论
**PASS**
