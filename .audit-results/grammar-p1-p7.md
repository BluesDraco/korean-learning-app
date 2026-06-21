# 韩语语法卡片审查报告 (grammar-cards-p1 ~ p7)

**审查日期**: 2026-06-22
**审查范围**: `src/data/grammar-cards-p1.ts` ~ `grammar-cards-p7.ts`（共7文件，73张卡片）
**审查类型**: 只读审查

---

## 总体结论：FAIL

主要原因：P3-P7 全部缺失 specialQuiz（49张卡片），P1 也有 1 张缺失 + 2 张题目不足，lessonNumber 错乱涉及 5 个文件。

---

## CRITICAL 发现：specialQuiz 缺失

非 isPractice 卡片必须包含 specialQuiz 字段（至少 4 道题）。

| # | 文件 | 卡片 | 问题 |
|---|------|------|------|
| 1 | p1 | card-p1-l10 (Progressive tense) | 完全缺失 specialQuiz |
| 2 | p3 | card-p3-l01 ~ l10 (全部10张) | 完全缺失 specialQuiz |
| 3 | p4 | card-p4-l01 ~ l10 (全部10张) | 完全缺失 specialQuiz |
| 4 | p5 | card-p5-l01 ~ l10 (全部10张) | 完全缺失 specialQuiz |
| 5 | p6 | card-p6-l01 ~ l10 (全部10张) | 完全缺失 specialQuiz |
| 6 | p7 | card-p7-l01 ~ l08 (全部8张) | 完全缺失 specialQuiz |

**合计：49 张非 isPractice 卡片缺失 specialQuiz 字段。**

---

## HIGH 发现

### 1. specialQuiz 题目数量不足

| # | 文件 | 卡片 | 问题 |
|---|------|------|------|
| 1 | p1 | card-p1-l01 (Sentence structure) | 仅 3 题，需要至少 4 题 |
| 2 | p1 | card-p1-l06 (에) | 仅 3 题，需要至少 4 题 |

### 2. lessonNumber 错乱

| # | 文件 | 卡片 | 实际 lessonNumber | 预期 lessonNumber |
|---|------|------|-------------------|-------------------|
| 1 | p2 | card-p2-l03 (-ㅂ시다/읍시다) | 4 | 3 |
| 2 | p2 | card-p2-l04 (Numbers/counters) | 5 | 4 |
| 3 | p2 | card-p2-l05 (의, 도, 만) | 7 | 5 |
| 4 | p2 | card-p2-l07 (이/가, 이/그/저) | 3 | 7 |
| 5 | p2 | card-p2-l08 (부터...까지) | 6 | 8 |
| 6 | p3 | card-p3-l02 (-았었/었었) | 5 | 2 |
| 7 | p3 | card-p3-l04 (ㄹ irregular) | 10 | 4 |
| 8 | p3 | card-p3-l06 (무슨/어느/어떤) | 2 | 6 |
| 9 | p4 | card-p4-l02 (-아/어/여야 하다) | 3 | 2 |
| 10 | p4 | card-p4-l09 (에게서, 한테서) | 2 | 9 |
| 11 | p5 | card-p5-l03 | 4 | 3 |
| 12 | p5 | card-p5-l04 | 3 | 4 |
| 13 | p6 | card-p6-l01 | 2 | 1 |
| 14 | p6 | card-p6-l02 | 3 | 2 |
| 15 | p6 | card-p6-l03 | 1 | 3 |
| 16 | p6 | card-p6-l05 | 8 | 5 |
| 17 | p6 | card-p6-l07 | 5 | 7 |

### 3. mistakes 中 wrong 字段非实际错误形式

以下 mistakes 条目的 `wrong` 字段是元描述/中文/概念说明，而非学习者实际会写出的错误韩文形式：

| # | 文件 | 卡片 | wrong 值 | 问题 |
|---|------|------|----------|------|
| 1 | p2 | card-p2-l05 | `'저의 = 제（一律替换）'` | 是语法描述，不是错误形式 |
| 2 | p4 | card-p4-l04 | `'只翻成"但是"'` | 中文翻译建议，不是韩语错误 |
| 3 | p4 | card-p4-l06 | `'보다 쓸 때 항상 동사 "보다"라고 생각함'` | 概念说明，不是错误韩语句子 |
| 4 | p4 | card-p4-l10 | `'初级阶段就想学完整套敬语'` | 中文学习建议，不是韩语错误 |
| 5 | p5 | card-p5-l10 | `'-다가 后句没有变化（如学完继续学）'` | 中文教学描述，不是错误韩语形式 |

#### 3b. mistakes 中 wrong == correct（同文异注）

以下条目 wrong 和 correct 的韩语文本完全相同，仅括号内的语境说明不同：

| # | 文件 | 卡片 | wrong | correct | 问题 |
|---|------|------|-------|---------|------|
| 1 | p5 | card-p5-l03 | `'아마 갈 거예요. (太确定)'` | `'아마 갈 거예요.（语气本身没错，注意翻译不要说"一定会去"）'` | 韩语完全一致，仅翻译建议不同 |
| 2 | p6 | card-p6-l01 | `'날씨가 좋겠군요. (刚查了天气)'` | `'날씨가 좋겠군요. (听别人说完后感叹)'` | 韩语完全一致，仅语境不同 |

这两条应改为：保留使用语境正确的 correct 文本，将 wrong 改为截然不同的错误形式。

### 4. 混排语言内容 (mixed language)

| # | 文件 | 卡片 | 字段 | 内容 |
|---|------|------|------|------|
| 1 | p2 | card-p2-l06 | compareHtml | "이/가 와 지시사" — 韩文+日文/中文混排 |
| 2 | p2 | card-p2-l06 | compareHtml | "시간 읽기 핵심" — 不相关的时间阅读内容出现在否定课 |

### 5. P4-L09 mistakes 误判

`wrong: '친구에게서 선물을 받아요. (口语场合)'` — 이 문장은 실제로 올바른 한국어입니다. 한테서가 더 구어체라는 설명은 맞지만, 에게서도 문법적으로 올바르므로 "wrong"으로 분류하는 것은 부적절합니다.

---

## 每文件审查摘要

### P1 (grammar-cards-p1.ts, 11张)

| 卡片 | 状态 | 备注 |
|------|------|------|
| card-p1-l01 | FAIL | specialQuiz 仅 3 题 |
| card-p1-l02 | PASS | specialQuiz 4题，已验证答案索引正确 |
| card-p1-l03 | PASS | specialQuiz 4题，已验证 |
| card-p1-l04 | PASS | specialQuiz 4题（fill-type，选项['은','는']） |
| card-p1-l05 | PASS | specialQuiz 4题 |
| card-p1-l06 | FAIL | specialQuiz 仅 3 题 |
| card-p1-l07 | PASS | specialQuiz 4题 |
| card-p1-l08 | PASS | specialQuiz 4题 |
| card-p1-l09 | PASS | specialQuiz 4题 |
| card-p1-l10 | FAIL | 缺失 specialQuiz |
| card-p1-l11 | PASS | isPractice（不需要 specialQuiz） |

**文件统计**: 11张卡片，3张 FAIL，8张 PASS

### P2 (grammar-cards-p2.ts, 11张)

| 卡片 | 状态 | 备注 |
|------|------|------|
| card-p2-l01 | PASS | specialQuiz 4题 |
| card-p2-l02 | PASS | specialQuiz 4题 |
| card-p2-l03 | HIGH | lessonNumber=4 应为 3 |
| card-p2-l04 | HIGH | lessonNumber=5 应为 4 |
| card-p2-l05 | HIGH | lessonNumber=7 应为 5；mistakes 有元描述条目 |
| card-p2-l06 | HIGH | compareHtml 含不相关内容+混排语言 |
| card-p2-l07 | HIGH | lessonNumber=3 应为 7 |
| card-p2-l08 | HIGH | lessonNumber=6 应为 8 |
| card-p2-l09 | PASS | specialQuiz 4题 |
| card-p2-l10 | PASS | specialQuiz 4题 |
| card-p2-l11 | PASS | isPractice |

**文件统计**: 11张卡片，6张 HIGH issues，无 CRITICAL（specialQuiz 齐全）

### P3 (grammar-cards-p3.ts, 10张)

| 卡片 | 状态 | 备注 |
|------|------|------|
| card-p3-l01 | FAIL | 缺失 specialQuiz |
| card-p3-l02 | FAIL | 缺失 specialQuiz；lessonNumber=5 应为 2 |
| card-p3-l03 | FAIL | 缺失 specialQuiz |
| card-p3-l04 | FAIL | 缺失 specialQuiz；lessonNumber=10 应为 4 |
| card-p3-l05 | FAIL | 缺失 specialQuiz |
| card-p3-l06 | FAIL | 缺失 specialQuiz；lessonNumber=2 应为 6 |
| card-p3-l07 | FAIL | 缺失 specialQuiz |
| card-p3-l08 | FAIL | 缺失 specialQuiz |
| card-p3-l09 | FAIL | 缺失 specialQuiz |
| card-p3-l10 | FAIL | 缺失 specialQuiz |

**文件统计**: 10张卡片，全部 FAIL — 无任何 specialQuiz，3张 lessonNumber 错误

### P4 (grammar-cards-p4.ts, 11张)

| 卡片 | 状态 | 备注 |
|------|------|------|
| card-p4-l01 | FAIL | 缺失 specialQuiz |
| card-p4-l02 | FAIL | 缺失 specialQuiz；lessonNumber=3 应为 2 |
| card-p4-l03 | FAIL | 缺失 specialQuiz |
| card-p4-l04 | FAIL | 缺失 specialQuiz；mistakes 有中文元描述条目 |
| card-p4-l05 | FAIL | 缺失 specialQuiz |
| card-p4-l06 | FAIL | 缺失 specialQuiz；mistakes 有元描述条目 |
| card-p4-l07 | FAIL | 缺失 specialQuiz |
| card-p4-l08 | FAIL | 缺失 specialQuiz |
| card-p4-l09 | FAIL | 缺失 specialQuiz；lessonNumber=2 应为 9；mistakes 误判正确韩语为错误 |
| card-p4-l10 | FAIL | 缺失 specialQuiz；mistakes 有中文元描述条目 |
| card-p4-l11 | PASS | isPractice |

**文件统计**: 11张卡片，10 FAIL + 1 PASS（isPractice）

### P5 (grammar-cards-p5.ts, 11张)

| 卡片 | 状态 | 备注 |
|------|------|------|
| card-p5-l01 | FAIL | 缺失 specialQuiz |
| card-p5-l02 | FAIL | 缺失 specialQuiz |
| card-p5-l03 | FAIL | 缺失 specialQuiz；lessonNumber=4 应为 3；mistakes 有 wrong==correct 条目 |
| card-p5-l04 | FAIL | 缺失 specialQuiz；lessonNumber=3 应为 4 |
| card-p5-l05 | FAIL | 缺失 specialQuiz |
| card-p5-l06 | FAIL | 缺失 specialQuiz |
| card-p5-l07 | FAIL | 缺失 specialQuiz |
| card-p5-l08 | FAIL | 缺失 specialQuiz |
| card-p5-l09 | FAIL | 缺失 specialQuiz |
| card-p5-l10 | FAIL | 缺失 specialQuiz；mistakes 有中文元描述条目 |
| card-p5-l11 | PASS | isPractice |

**文件统计**: 11张卡片，10 FAIL + 1 PASS（isPractice）— 全部缺失 specialQuiz

### P6 (grammar-cards-p6.ts, 11张)

| 卡片 | 状态 | 备注 |
|------|------|------|
| card-p6-l01 | FAIL | 缺失 specialQuiz；lessonNumber=2 应为 1；mistakes 有 wrong==correct 条目 |
| card-p6-l02 | FAIL | 缺失 specialQuiz；lessonNumber=3 应为 2 |
| card-p6-l03 | FAIL | 缺失 specialQuiz；lessonNumber=1 应为 3 |
| card-p6-l04 | FAIL | 缺失 specialQuiz |
| card-p6-l05 | FAIL | 缺失 specialQuiz；lessonNumber=8 应为 5 |
| card-p6-l06 | FAIL | 缺失 specialQuiz |
| card-p6-l07 | FAIL | 缺失 specialQuiz；lessonNumber=5 应为 7 |
| card-p6-l08 | FAIL | 缺失 specialQuiz |
| card-p6-l09 | FAIL | 缺失 specialQuiz |
| card-p6-l10 | FAIL | 缺失 specialQuiz |
| card-p6-l11 | PASS | isPractice |

**文件统计**: 11张卡片，10 FAIL + 1 PASS（isPractice）— 全部缺失 specialQuiz，lessonNumber 错乱最严重

### P7 (grammar-cards-p7.ts, 9张)

| 卡片 | 状态 | 备注 |
|------|------|------|
| card-p7-l01 | FAIL | 缺失 specialQuiz |
| card-p7-l02 | FAIL | 缺失 specialQuiz |
| card-p7-l03 | FAIL | 缺失 specialQuiz |
| card-p7-l04 | FAIL | 缺失 specialQuiz |
| card-p7-l05 | FAIL | 缺失 specialQuiz |
| card-p7-l06 | FAIL | 缺失 specialQuiz |
| card-p7-l07 | FAIL | 缺失 specialQuiz |
| card-p7-l08 | FAIL | 缺失 specialQuiz |
| card-p7-l09 | PASS | isPractice |

**文件统计**: 9张卡片，8 FAIL + 1 PASS（isPractice）— 全部缺失 specialQuiz

---

## 审查覆盖清单

- [x] specialQuiz 存在性（全部73张卡）
- [x] specialQuiz 题目数量（P1 已逐卡检查，P2 已逐卡检查）
- [x] specialQuiz 答案索引验证（P1-P2 已逐题验证）
- [x] mistakes wrong≠correct（P1-P7 已逐条检查，P5-L03/P6-L01 发现 2 条 wrong==correct）
- [x] mistakes wrong 是实际错误形式（P1-P7 已检查，发现 5 条元描述/中文条目）
- [x] lessonNumber 一致性（全部 7 文件已比对）
- [x] cardExamples 韩语自然性（P1-P4 已抽查）
- [x] scenarios 韩语自然性（P1-P4 已抽查）
- [x] connectionRules 重复/准确性（P1-P4 已检查）
- [x] isPractice 识别（全部 7 文件已确认）
- [ ] specialQuiz 逐题选项验证（P3-P7 因无 specialQuiz 跳过）
- [ ] cardExamples 조사 逐条验证（仅抽查，未全量）
- [ ] scenarios 조사 逐条验证（仅抽查，未全量）

---

## 统计总览

| 文件 | 总卡片 | isPractice | 需 specialQuiz | 已含 specialQuiz | 缺失 | lessonNumber 错误 |
|------|--------|------------|----------------|-----------------|------|------------------|
| P1 | 11 | 1 | 10 | 9 | 1 | 0 |
| P2 | 11 | 1 | 10 | 10 | 0 | 5 |
| P3 | 10 | 0 | 10 | 0 | 10 | 3 |
| P4 | 11 | 1 | 10 | 0 | 10 | 2 |
| P5 | 11 | 1 | 10 | 0 | 10 | 2 |
| P6 | 11 | 1 | 10 | 0 | 10 | 5 |
| P7 | 9 | 1 | 8 | 0 | 8 | 0 |
| **合计** | **74** | **6** | **68** | **19** | **49** | **17** |

---

## 优先修复建议

1. **P1-L10**: 补充 specialQuiz（至少4题）
2. **P1-L01, P1-L06**: 补充第4题
3. **P3-P7**: 为全部 49 张缺失 specialQuiz 的卡片编写题目（至少4题/卡）
4. **lessonNumber**: 修正 17 处 lessonNumber 错误
5. **mistakes 元描述**: 修正 5 处元描述/中文条目（P2-L05, P4-L04, P4-L06, P4-L10, P5-L10），改为实际韩语错误形式
6. **mistakes wrong==correct**: 修正 2 处 wrong 与 correct 韩语相同的条目（P5-L03, P6-L01），wrong 必须与 correct 截然不同
7. **P2-L06**: 清理 compareHtml 中无关内容和混排语言
