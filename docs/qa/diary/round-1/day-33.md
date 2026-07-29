# Day 33 · 第一封家书 · Round 1 审查

**文件**：src/data/diary/days/day-33.ts
**审查日期**：2026-07-08

## A. 结构正确性
- ✓ A1 类型完整
- ✓ A2 id 前缀 d33
- ✓ A3 pos 合法（名词×4/表达×1/动词×1）
- ✓ A4 数量：words 6 / lines 6 / rules 4 / examples 4 / output 5
- ✓ A5 kind 字段自洽
- ✓ A6 dialogue.pick 1 correct
- ✓ A7 stickerId 唯一

## B. 韩语正确性
- ✓ B1 조사 받침（逐句核）
  - 엄마**한테** / 편지**를** / 저**는** / 한국어**도** / 열심히 / 친구**도** / 세 명 / 엄마**는** / 뭐**를** 省 / 편지**를** / 엄마**한테** 편지**를**
- ✓ B2 종결어미：Tori 해요体书面，妈妈的语音（中文）—合理
- ✗ B3 汉韩混排：**o4.successMsg** 里 "有收음" — 中文"音"错写成韩文"음"（不是教学格式）
- ✓ B4 hangul 罗马音
- ✓ B5 grammar.rules 均含韩文示例
- ✓ B6 examples.highlight 命中
- ✓ B7 composeAnswer 拼 "엄마 저 잘 지내고 있어요"（对话第一行的书面形式）✓
- ✓ B8 干扰项合理
- ✓ B9 pos 一致

## C. 剧情一致性
- ✓ C1..C3
- ✓ C4 提到 준호 민지 하루（韩文全称）与 Day 31 一致（Day 31 是 Junho 英文，此处是 준호 韩文——记录为 warn，不算 blocker，因日记场景各自合理）

## FAIL 清单（blocker，必修）
1. [line 224] `successMsg: 'エンマ 无收音 → **한테**；편지 有收음 → **를**` — "收음"汉韩混排 + 编지末字지其实无收音，事实错反了。

## 修复记录
- line 224 successMsg 改为 `'엄마 → 한테（给人用한테/에게）；편지 末字 지 无收音 → 를。两个助词都要选对。'`

## WARN
- NPC 名称混用：dialogue 里写 준호/민지/하루（韩文），Day 31 写 Junho/Danielle（英/罗马音）。跨天不完全统一，跨 day 汇总时看是否需要规范

## 结论
**FAIL → 修复后 PASS**
