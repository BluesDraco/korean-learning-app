# Day 11 · Round 1 技术审查报告
文件：src/data/diary/days/day-11.ts
审查时间：2026-07-05
审查员：Round 1 Agent (Day 11-15)

## 总体结论：PASS

## FAIL 列表
（无）

## Day 11 专属：跨 Day 引用核对
- **day-11.ts:86** tip 归属：`words[3]` = `d11-w4` = 「이거」，tip 内容："Day 9 复习。手边的东西"
- 核对 day-9.ts：day-9.ts 第 82-90 行确有 `d09-w4` 「이거」词条，example 为 `이거 주세요.`，tip 讲的正是"手边的东西"（"口语用「이거」…指着东西时用"）
- 结论：**引用属实**（依据：day-9.ts:82-90 已教过 이거 = 这个，与 day-11 表述完全一致）

## 每项审查摘要

### Step 1 · 조사/词尾
| 检查点 | 结果 |
|---|---|
| 이거도（이거无받침 + 도） | ✓（例 line 153, o3） |
| 이거는 / 저거는（무받침 + 는） | ✓ rule 2 解释无误 |
| 이거를（무받침 + 를） | ✓ rule 3 |
| 예요/이에요：거→无받침→예요；원→ㄴ받침→이에요 | ✓ examples 全对 |
| 세 개（固有数 셋→세 + 量词 개） | ✓ o4 successMsg |
| 좋아해요（하다 → 해요） | ✓ rule 5 / example 5 |

### Step 2 · 语法讲解正确性
- `grammar.rules[]` 8 条全部准确
- `grammar.pitfall` 四条真实易错点（对方手边用 그거、话题 vs 宾格 은/는 vs 을/를、口语省略 을/를、存在词直接接指示词）
- `grammar.examples[6]` 每条 note 与例句对应正确

### Step 3 · 单词卡准确性
- 6 个词汇 korean/hangul/pos/example 全对
- 罗马音：syam-pu / su-geon / seul-li-peo / i-geo / geu-geo / jeo-geo 均标准
- 例句조사使用正确

### Step 4 · Dialogue 韩文
- 6 行对话，1 行 pick 题
- 저기요/저거/천 원/그럼/세 개/이거도 全部语法正确
- pick 正解「이거도 주세요.」唯一，两个干扰项确实语境不合

### Step 5 · 练习答案唯一性
- o1 compose「저거 얼마예요 ?」唯一 ✓
- o2 listen-choice「那个 1000 元。」唯一 ✓
- o3 zh-to-ko「이거도 주세요.」唯一（이거를/저거도/이거가 均语法错或语义错）✓
- o4 particle-error「저거 세 개 주세요.」唯一（셋 개 / 삼 개 / 세 잔 都错）✓
- o5 match-pair 5 对精确对应 ✓

### Step 6 · 汉韩混排
未发现同一节点韩汉裸混排。**加粗** 韩文关键词嵌中文说明为允许结构。

### Step 7 · Opening / Recap 韩文
- opening.diaryText 嵌入 다이소 / 저거 얼마예요 / 저거요? 천 원이에요 / 이거도 주세요 均正确
- recap.preview 全中文，无韩文错误

## 统计
- 严重：0
- 中等：0
- 轻微：0
