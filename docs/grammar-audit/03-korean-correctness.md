# 03 · 韩语正确度审查报告

**扫描工具**：`scripts/audit-grammar-content.mjs`（可 `npx tsx` 直跑）
**扫描范围**：`src/data/grammar-cards-p1.ts` … `p30.ts`（30 部 272 卡）
**扫描日期**：2026-07-07
**初始发现**：49 条 / 25 张卡 → **修复后剩余**：20 条 / 8 张卡（全部为误报或 P1 早期设计问题，见下）

## 修复摘要（批次 1-e）

| 类型 | 修前 | 修后 | 备注 |
|---|---|---|---|
| `zh-in-ko`（scenarios.ko 汉字混排） | 15 | 0 | 全修（p6/p15/p17/p18/p19/p20 共 12 处） |
| `zh-in-wordblocks`（wordBlocks 汉字混排） | 11 | 0 | 全修（p10/p18/p19/p20 共 11 处） |
| `mistake-correct-no-korean` | 3 | 0 | 全修（p15/p23/p26 改写 correct 为韩文示例） |
| `zh-untranslated` | 4 | 4 | **误报**（备注引用韩语术语，语义合理） |
| `quiz-options-count-morph` | 16 | 16 | **P1 早期设计**（P1-L02/L03/L08/L09 morph 只 3 选项） |

**共修复 26 处真错**。P1 morph 3 选项是否补第 4 项，待人工决定（属"L1-L5 早期风格"，可能故意如此）。

已停用的检查：
- 助词校验（`은/는·이/가·을/를·(으)로·이/나`）— 因与动词冠形/连接词尾同形太多，字符串规则识别名词不准，全部误报（前一版本 17 条 100% 误报），改由 `korean-qa` skill 人工审。
- `structures.ko` / `structures.zh` 检查 — 因 structures 是"公式展示层"（含中文标注、连字符、+号），全部误报。

保留的检查：
- 汉韩混排：`scenarios.ko` / `cardExamples.wordBlocks` 里出现中文字符
- 疑似漏译：`zh` 字段里韩文字符 ≥ 中文字符
- specialQuiz：`type='morph'` 必须恰好 4 个 options
- mistakes：`wrong / correct` 至少含韩文字符

---

## 详细清单

### 🔴 汉韩混排（P0，需修）

**P10-L08**
- `cardExamples[2] wordBlocks`: `중요한 单词는노트에써 둬요` → `단어`

**P17-L02**
- `scenarios[4].ko`: `저 선수만큼 빨리 不同고 싶어요.` → `달리고`（不同→달리다改写）

**P17-L03**
- `scenarios[2].ko`: `后面도 들을 수 있게 마이크를 켰어요.` → `뒷사람도`

**P18-L01**
- `cardExamples[3] wordBlocks`: `直接 먹어 봤는데생각보다맛있더라` → `직접`
- `scenarios[4].ko`: `直接 해 봤는데 생각보다 쉽더라.` → `직접`

**P18-L03**
- `scenarios[0].ko`: `폭우로 인하여 도로 部分가 통제됐습니다.` → `일부`

**P18-L04**
- `cardExamples[3] wordBlocks`: `차가 없는 걸 보니已经간 모양이에요` → `이미`
- `scenarios[1].ko`: `表情을 보니 잘 모르는 듯해요.` → `표정`

**P18-L06**
- `scenarios[3].ko`: `사실 저 거기 살았거든요，所以 잘 알아요.` → `그래서`
- `scenarios[4].ko`: `한국어 어렵잖아요，即使如此 재미있어요.` → `그래도`

**P19-L03**
- `scenarios[3].ko`: `맛있고 말고요，一定 먹어 봐요！` → `꼭`

**P19-L05**
- `cardExamples[1] wordBlocks`: `피곤하지 않은 척했지만 事实 많이 힘들었어요` → `사실`
- `cardExamples[2] wordBlocks`: `아이가 자는 척했지만 事实 깨어 있었어요` → `사실`

**P20-L01**
- `cardExamples[3] wordBlocks`: `그 사건에 대한 新闻를 봤어요` → `뉴스`
- `scenarios[3].ko`: `이 주제에 대해서 发表하겠습니다.` → `발표`

**P20-L02**
- `scenarios[5].ko`: `이것까지만 해도 已经 너무 많아요.` → `이미`

**P20-L03**
- `cardExamples[3] wordBlocks`: `이렇게까지 해 줄 需要는 없었는데요` → `필요`

**P20-L04** ⚠️ 汉韩混排最重灾区（拟态语课）
- `cardExamples[0]`: `兴趣로 영화라든가 독서라든가 해요` → `취미`
- `scenarios[0].ko`: `兴趣가 영화라든가 음악이라든가 있어요.` → `취미`
- `scenarios[4].ko`: `여행이라든가 새로운 兴趣라든가 시도해 봐요.` → `취미`

**P20-L05**
- `cardExamples[0]`: `그 사람은 친절한가 하면 偶尔 차갑기도 해요` → `가끔`
- `cardExamples[1]`: `이 영화는 有些难过 하고 재미있기도 해요` → `조금 슬프`
- `cardExamples[3]`: `偶尔 지치기도 但是 계속 하고 싶어요` → `가끔 / 하지만`
- `scenarios[0].ko`: `有些高兴 하고 有些难过 해요.` → `조금 기쁘 / 조금 슬프`
- `scenarios[4].ko`: `힘들기도 但是 보람 있어요.` → `하지만`

### 🟡 疑似漏译（人工审）

**P12-L06 scenarios[4].zh**: `"알다→아세요，ㄹ脱落了。"` — 说明性文本混在 zh 里，不算漏译，OK
**P12-L07 cardExamples[2].zh**: `"头发是黑色的。（까맣다→까매요）"` — 带韩语术语说明，OK
**P15-L07 scenarios[5].zh**: `"咖啡好了。（不用 나오셨습니다）"` — 备注，OK
**P15-L08 scenarios[4].zh**: `"尺寸如何？（不用 사이즈가 어떠십니까?）"` — 备注，OK

结论：`zh-untranslated` 4 条**都是误报**（备注/术语引用是合理的）。

### 🔴 mistake.correct 无韩文

**P15-L05 mistakes[2].correct**: `"语体和敬语要一致"` — 是中文说明，缺具体韩文示例
**P23-L09 mistakes[1].correct**: `"前后必须同倾向"` — 同上
**P26-L05 mistakes[1].correct**: `"(避免用形容词)"` — 同上

修法：把中文说明改为具体韩文对照句，中文改放 note 里。

### 🟠 morph 题型 options ≠ 4（P1 早期设计问题）

- `card-p1-l02` × 4 题（3 options 而非 4）
- `card-p1-l03` × 4 题
- `card-p1-l08` × 4 题
- `card-p1-l09` × 4 题

共 16 条。**这是 P1 的早期设计**：morph 题原始只 3 选项。是否补第 4 选项，取决于新规范是否强制 4 项。

---

## 后续处理

1. **P0 立即修**：汉韩混排 26 处（**P17-L02, P17-L03, P18-L01, P18-L03, P18-L04, P18-L06, P19-L03, P19-L05, P20-L01, P20-L02, P20-L03, P20-L04, P20-L05, P10-L08** 共 14 张卡）
2. **P1 需人工判断**：3 条 mistake.correct 无韩文（改内容而非跳过）
3. **P1 选择性修**：P1 早期 morph 4 张卡共 16 题只 3 options（新规要求 4 项）
4. **误报关闭**：`zh-untranslated` 4 条不算错，脚本可添加"含 → / ← / ↔ 等语法箭头"的白名单
