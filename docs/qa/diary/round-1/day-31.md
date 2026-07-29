# Day 31 · 升入中级班 · Round 1 审查

**文件**：src/data/diary/days/day-31.ts
**审查日期**：2026-07-08

## A. 结构正确性
- ✓ A1 类型完整（level/day/phase/title/subtitle/estimatedMin/opening/words/dialogue/grammar/output/recap 全）
- ✓ A2 id 前缀：words d31-w1..w6、output d31-o1..o5、stickerId sticker-d31
- ✓ A3 pos 枚举：名词×3 / 形容词×3
- ✓ A4 数量：words 6 / lines 6 / rules 4 / examples 4 / output 5
- ✓ A5 kind 字段自洽：
  - o1 compose：composeAnswer `['발음이','유창하네요']` ⊂ tokens
  - o2 listen-choice：audioKo + 4 choices（1 correct）
  - o3 zh-to-ko：zhPrompt + 4 ko choices（1 correct）
  - o4 particle-error：zhHint + 4 ko choices（1 correct）
  - o5 match-pair：5 pairs
- ✓ A6 dialogue.pick line 6 有 choices，正好 1 correct
- ✓ A7 stickerId 唯一

## B. 韩语正确性
- ✓ B1 조사 받침（逐句核）
  - 여러분**은** / 중급반**이에요** / 친구**를** / 다니엘**이에요**（엘 有 ㄹ）/ 사람**이에요** / 발음**이** / 실력**이** / 중급반**이네요** / 한국어**가** / 학생**이네요** / 저**는** / 토리**예요** / 토리**야**
- ✓ B2 종결어미：老师해요体、Danielle하십시오+해요混、Junho对同学반말（토리도 인사해）— 关系匹配
- ✓ B3 汉韩混排：rules/pitfall 中韩文单字均为韩文形式引用（教学白名单）
- ✓ B4 hangul 罗马音：全部为 romanization，非韩文本身；pick 行 ko='?' hangul='' 为占位设计
- ✓ B5 grammar.rules 有韩文形式示例
- ✓ B6 examples.highlight 均在 ko 内命中
- ✓ B7 composeAnswer 拼接 `발음이 유창하네요` 与对话意图一致
- ✓ B8 choices 干扰项错得合理（대단하다요 / 학생네요 等属典型学生错误）
- ✓ B9 pos 与词性一致

## C. 剧情一致性
- ✓ C1 day=1（相对）+ id 前缀 d31
- ✓ C2 phase='expansion'
- ✓ C3 level='intermediate'
- 记录 NPC：火鹤老师 / Danielle / Junho（跨天基线）

## FAIL 清单
无。

## WARN
- opening.diaryText 里 Danielle 首次出现未用中文标注（"一只毛色雪白的狐狸"已足够），后续 Day 若继续用 Danielle 需保持一致（跨天验证事项）

## 结论
**PASS**
