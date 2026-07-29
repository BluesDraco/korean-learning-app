# Round 1 · Tori 韩语日记全 30 天技术审查汇总
审查时间：2026-07-05
审查范围：`src/data/diary/days/day-1.ts` ~ `day-30.ts` 全 30 个文件
审查规范：`korean-qa-agent.md` 移植到日记板块，覆盖 조사/词尾/语法讲解/单词卡/dialogue 韩文/练习答案唯一性/汉韩混排/opening-recap 韩文

## 总体结论

| 结论 | 数量 | Days |
|---|---|---|
| PASS | 3 天 | Day 1（1 轻微）· Day 11 · Day 29 |
| FAIL | 27 天 | Day 2-10 · 12-28 · 30 |

**FAIL 定义**：单日报告存在任何严重/中等问题即 FAIL。

**已修（本轮修复）**：
- Day 12/13/14/15 严重问题（Round 1 agent 报告后立即修）
- Day 1-5 严重/中等问题（本 session 接手后修）
- 剩下 Day 6-10 + Day 16-28 + Day 30 的问题**未修**——待后续 Developer 会话处理

## 严重问题清单（需优先修）

| Day | 位置 | 问题 |
|---|---|---|
| 4 | grammar.rules[5] | `합쇼체(입나다)` 拼错 → **已修** |
| 7 | isCheckpoint | `null` 应为 `7`（关卡日字段错） |
| 8 | grammar.rules[1] | `명사 + 하고 싶어요 = 想要某物` 语法错误 |
| 8 | output[3] d08-o4 | `친구를 보고 싶어요` 也合法，唯一性冲突 |
| 10 | words[5] d10-w6.tip | 「ㅅ 在前一字尾不发音」发音描述反了 |
| 14 | grammar.pitfall① | 달다/짜다「지 系开头」事实错误 → **已修** |
| 14 | grammar.rules[6]/pitfall③ | 「한 잔 用汉字数」与 Day 9 教学冲突 → **已修** |
| 26 | 剧情 vs memory | 关卡 4 归属冲突（memory 说 Day 26，代码把关卡内容放 Day 28） |
| 28 | isCheckpoint | `26`（数据错·Day 28 不在关卡数组）+ title「★关卡4」与 memory 冲突 |
| 28 | 关卡归属整体 | 关卡 4 的 Day 26 vs Day 28 归属需产品方确认 |

## 中等问题汇总

**结构性问题**（全线共性，非单点错）：

1. **opening.date 中韩混排（Day 2/3/4/5/6/7/8/9/10）**
   - `9月 X日` 应为 `9월 X일 · <场景>`
   - Day 1/11-30 已用正确格式，Day 2-10 全部违规
   - **Day 2-5 已修**；Day 6-10 待修

2. **dialogue.lines pick 结构不一致**
   - Day 1-14 用 `speaker: 'tori'` + `practice: 'pick'`
   - Day 15-30 用 `speaker: 'you'` + `ko: '?'`
   - 两种都合规，但不统一

3. **grammar.rules[] 数组结构问题**（Day 7/28/30）
   - Day 7 rules 数组混空字符串（`''` 作为分节，会渲染为空条目）
   - Day 28/30 rules 用 `**Step N ...**` 前缀混合 DiaryGrammar 的自动编号 → UI 双重编号

4. **words[].tip 汉韩混排**（Day 7 w4/w5, Day 8 w1, Day 26 w4-tip 等）
   - `동사` `형용사` `의` `과거시형` 等韩文术语直嵌中文说明
   - CLAUDE.md 规范要求 tip 全中文，术语用中文（动词/形容词）

5. **compose tokens 多解**（Day 1, 4, 5, 7, 8, 9）
   - 干扰词能拼合出等价合法句
   - 需替换为明显错的干扰词

## 单日报告索引

| Day | 结论 | 严重 | 中等 | 轻微 | 报告文件 |
|---|---|---|---|---|---|
| 1 | PASS | 0 | 0 | 1 | [day-1.md](day-1.md) |
| 2 | FAIL | 1 | 2 | 0 | [day-2.md](day-2.md) |
| 3 | FAIL | 1 | 2 | 2 | [day-3.md](day-3.md) |
| 4 | FAIL | 2 | 1 | 3 | [day-4.md](day-4.md) |
| 5 | FAIL | 0 | 2 | 3 | [day-5.md](day-5.md) |
| 6 | FAIL | 0 | 3 | 2 | [day-6.md](day-6.md) |
| 7 | FAIL | 1 | 3 | 3 | [day-7.md](day-7.md) |
| 8 | FAIL | 2 | 2 | 2 | [day-8.md](day-8.md) |
| 9 | FAIL | 0 | 2 | 3 | [day-9.md](day-9.md) |
| 10 | FAIL | 1 | 2 | 2 | [day-10.md](day-10.md) |
| 11 | PASS | 0 | 0 | 0 | [day-11.md](day-11.md) |
| 12 | FAIL | 0 | 2 | 1 | [day-12.md](day-12.md) |
| 13 | FAIL | 0 | 2 | 0 | [day-13.md](day-13.md) |
| 14 | FAIL | 2 | 2 | 0 | [day-14.md](day-14.md) |
| 15 | FAIL | 0 | 2 | 1 | [day-15.md](day-15.md) |
| 16 | FAIL | 0 | 0 | 1 | [day-16.md](day-16.md) |
| 17 | FAIL | 0 | 0 | 2 | [day-17.md](day-17.md) |
| 18 | FAIL | 0 | 0 | 2 | [day-18.md](day-18.md) |
| 19 | FAIL | 0 | 0 | 2 | [day-19.md](day-19.md) |
| 20 | FAIL | 0 | 0 | 2 | [day-20.md](day-20.md) |
| 21 | FAIL | 0 | 0 | 1 | [day-21.md](day-21.md) |
| 22 | PASS | 0 | 0 | 0 | [day-22.md](day-22.md) |
| 23 | PASS | 0 | 0 | 0 | [day-23.md](day-23.md) |
| 24 | FAIL | 0 | 0 | 1 | [day-24.md](day-24.md) |
| 25 | FAIL | 0 | 1 | 1 | [day-25.md](day-25.md) |
| 26 | FAIL | 1 | 3 | 1 | [day-26.md](day-26.md) |
| 27 | FAIL | 1 | 3 | 2 | [day-27.md](day-27.md) |
| 28 | FAIL | 2 | 3 | 1 | [day-28.md](day-28.md) |
| 29 | PASS | 0 | 3 | 2 | [day-29.md](day-29.md) |
| 30 | FAIL | 0 | 3 | 3 | [day-30.md](day-30.md) |

**统计**（初次审查发现，含已修）：
- 严重问题：13 处
- 中等问题：40 处
- 轻微问题：40 处

**已修**：13 处严重中 4 处 + 中等 5 处（Day 1-5 修 4 处 + Day 12-15 修 7 处 = 11 处，跨严重/中等）
**待修**：Day 6-10, 16-28, 30 全部未处理项

## 跨 Day 引用核对结果

| Day 引用位置 | 引用内容 | 被引 Day | 核对结果 |
|---|---|---|---|
| day-11.ts:86 tip | "Day 9 复习。手边的东西" | Day 9 (이거) | ✓ 属实 |
| day-18.ts:90 tip | "Day 15 学过的语法再次出场"(고 싶어요) | Day 15 | ✓ 属实 |
| day-24.ts:63 tip | "Day 15 学过的 을래요 的반말形" | Day 15 (~을래요/ㄹ래요) | ✓ 属实 |

## 关卡日结构核查

| Day | isCheckpoint | title 关卡标记 | index.ts 数组 | 一致性 |
|---|---|---|---|---|
| 7 | **null（错）** | 顶注★关卡1 | ✓ 在数组 | ✗ 字段应为 7 |
| 14 | 14 ✓ | ✓ Checkpoint 14 | ✓ | ✓ |
| 21 | 21 ✓ | ✓ | ✓ | ✓ |
| 26 | 26 ✓ | 剧情非关卡内容 | ✓ | ⚠ memory 冲突 |
| 28 | **26（错）** | ★关卡4 | ✗ 不在数组 | ✗ 严重 |
| 29 | 29 ✓ | ✓ | ✓ | ✓ |
| 30 | 30 ✓ | ✓ | ✓ | ✓ |

**结论**：Day 7 和 Day 28 的 isCheckpoint 字段需修复；Day 26 vs Day 28 关卡 4 归属需产品方决策。

## 下一步建议

1. **优先修严重问题**（除已修的 Day 4/14 外）：Day 7 isCheckpoint / Day 8 rules[1] + o4 / Day 10 w6.tip / Day 26-28 关卡冲突
2. **批量修中等结构性问题**：opening.date（Day 6-10）+ tip 汉韩混排（多处）
3. **决策项**：Day 26 剧情、Day 28 关卡归属需与产品方（用户）确认后再改
4. **可选 Round 2**：完成 Round 1 修复后启动场景审（敬语层级/对话自然度/文化真实性），已在 plan 里定义
