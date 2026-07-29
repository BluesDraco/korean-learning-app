# TOPIK 自出卷生成规范（生成/审查子代理共用）

你在为一个韩语学习 App 自出 **原创 TOPIK 模拟题**。这是从零创作的原创作品，**绝对不允许参考、改写、搬运任何真实 TOPIK 真题**的题干、对话、选项、短文、场景。只允许使用公开的题型骨架（题号对应哪种题型），每一题的场景/对话/选项/短文都必须是你独立原创的。**不要去查找、回忆或复现任何真实 TOPIK 考试内容。**

## 输出格式

输出一个 JSON 数组，写入指定文件（如 `public/data/topik/questions/E11-I.json`）。每个元素是一道题，字段如下：

```jsonc
{
  "id": "E11I-L01",          // 见下方 ID 规则
  "section": "listening",     // "listening" | "reading"
  "level": "beginner",        // TOPIK I 卷全部 "beginner"；TOPIK II 卷用 "intermediate"，最难题可 "advanced"
  "topic": "일상",            // 韩语主题标签（短词）
  "number": 1,                // 见下方编号规则
  "type": "multiple-choice",  // 固定
  "difficulty": "easy",       // "easy" | "medium" | "hard"，按蓝图指定
  "testPoint": "있다 존재 응답", // 考点简述（韩或中，短）
  "audioText": "여자: 지갑이 있어요?",  // 仅听力题：对话/独白原文韩语。阅读题不要此字段
  "prompt": "남자의 대답으로 알맞은 것은?",  // 题干（韩语）。短文题把短文正文写进这里
  "promptZh": "有钱包吗？（选正确答语）",   // 题干中文翻译（纯中文）
  "options": ["...", "...", "...", "..."], // 恰 4 个选项（韩语）
  "correctIdx": 3,            // 正确项下标 0..3
  "explanation": "...",       // 纯中文解析：为什么对 + 逐一排除错项 + 요점。见下方规则
  "vocabulary": ["지갑", "있다"], // 该题核心词（韩语），2-4 个
  "examRound": 111,           // 见下方
  "questionType": "I-L-response", // 见蓝图
  "groupId": null             // 单题 null；短文题组填组ID（见下方）
}
```

听力"看图题"(picture) 额外带 `"imageDescriptions": ["中文描述①","②","③","④"]`（四个场景的中文描述，与 options 一一对应），且 options 用韩语写场景描述（如 `"①두 사람이 식당에서 주문하고 있다"`）。听力题可加 `"audioUrl": null`。

## ID 与编号规则

- 文件 `E{NN}-I.json`（NN 如 11）：**TOPIK I**
  - 听力 30 题：id `E{NN}I-L01`..`L30`，number **1..30**
  - 阅读 40 题：id `E{NN}I-R31`..`R70`，number **31..70**（接续听力编号）
  - examRound = 110 + NN（E11→111, E12→112 ... E20→120）
- 文件 `E{NN}-II.json`：**TOPIK II**
  - 听力 50 题：id `E{NN}II-L01`..`L50`，number **1..50**
  - 阅读 50 题：id `E{NN}II-R01`..`R50`，number **1..50**（阅读重新从 1 编号）
  - examRound = 111 + NN（E11→112, E12→113 ... E20→121）
- id 里的数字部分两位补零（L01 不是 L1）。

## 短文题组 groupId

多题共用一段短文/对话时，这些题 `groupId` 填同一个值，格式 `E{NN}{I|II}-{L|R}-G{起}-{止}`，例如 `E11II-R-G20-22`、`E11I-L-G25-26`。**短文/对话正文直接完整写进组内每一题的 `prompt` 字段**（组内重复），然后接该题自己的设问。同组各题的短文正文必须字字一致。

## explanation 规则（重要）

- **主体必须是中文**。讲清：①正确项为什么对；②其余三项为什么错（逐一）；③一句"요점/要点"点出考点。
- 可以引用韩语词句作为讲解对象（如「N이/가 있어요?」问存在），但解析的叙述语言是中文。
- 不要写成纯韩语解析。

## 质量硬要求

0. **答案位置必须均匀分布**（极重要）：整份卷里正确答案落在 ①②③④ 四个位置的次数要大致相等（各约占 1/4）。**绝对不要让大多数题的答案都是①或②**。出题时有意识地把正确项轮流放到不同位置，correctIdx 在 0/1/2/3 之间均衡使用。解析里引用选项序号（①②③④）时，序号必须与该选项的实际位置一致。
1. **韩语必须正确**：조사（은/는/이/가/을/를/에/에서…）、时态、敬语阶（해요体为主，正式场合합니다体）、不规则活用、分かち書き 都要对。
2. **答案唯一且正确**：正确项无争议，三个干扰项都明确错（但要"像样"，不能太蠢一眼看穿；错要错得有道理——方向错/信息不符/语法不搭）。
3. **四选项等长感**、风格一致，不要正确项明显更长更详细。
4. **场景全部原创**、生活化、多样（购物/交通/天气/学校/职场/医院/餐厅/旅行/爱好/环保/科技/文化…），同一份卷内主题不要重复堆叠。
5. **难度符合蓝图**：easy 单句直给；medium 需要理解；hard 需要推理/把握全文态度或意图。
6. **promptZh 纯中文**，是 prompt 的准确翻译。
7. TOPIK I 面向初级（TOPIK 1-2 级），词汇语法简单；TOPIK II 面向中高级（3-6 级），可用复杂句、书面语、惯用表达、新闻/说明/论说文体。

## 题型蓝图（照结构出全新内容）

### TOPIK I（70 题）
**听力 (L01-L30)**
- 1-4 `I-L-response` [easy]：听一句问话/说话，选最合适的"应答"
- 5-6 `I-L-followup` [easy]：听两句对话，选自然的"接续"话
- 7-10 `I-L-place` [easy]：听对话选"发生的场所"（options 是地点名词）
- 11-14 `I-L-topic` [easy]：听对话选"话题"（options 是话题名词：날씨/취미/가족…）
- 15-16 `I-L-picture` [medium]：看图选话（带 imageDescriptions）
- 17-21 `I-L-detail` [medium]：听较长对话选"与内容一致"的细节
- 22-24 `I-L-mainidea` [medium]：听对话选说话人的"中心想法"
- 25-26 `I-L-passage-purpose` [medium] (组 G25-26)：听一段独白，25 问目的/26 问细节
- 27-28 `I-L-passage-topic` [medium] (组 G27-28)：听对话，两问
- 29-30 `I-L-passage-main` [hard] (组 G29-30)：听较长独白，两问（中心+细节）

**阅读 (R31-R70)**
- 31-33 `I-R-topic` [easy]：读两三短句选"话题"（무엇에 대한 이야기입니까）
- 34 `I-R-fill-verb`、35 `I-R-fill-noun`、36 `I-R-fill-particle`、37 `I-R-fill-adv`、38 `I-R-fill-adj`、39 `I-R-fill-verb` [easy]：填空选词（按词性）
- 40-42 `I-R-wrong-info` [medium]：读短文/告示选"与内容不符"的一项
- 43-45 `I-R-content_match` [medium]：读短文选"与内容一致"的一项
- 46-48 `I-R-mainidea` [medium]：读短文选中心想法
- 49-56：短文题组，`I-R-passage-fill`（填空）/`I-R-passage-conn`（衔接/指代）交替，两两成组 (G49-50, G51-52, G53-54, G55-56)
- 57-58 `I-R-order` [medium]：句子排序（options 是 4 种顺序如 "(가)-(다)-(나)-(라)"）
- 59-70：短文题组 [medium→hard]，`I-R-passage-insert`（插入句）/`I-R-passage-fill`/`I-R-passage-purpose`（目的/心情）两两成组，末段(67-70)难度 hard

### TOPIK II（100 题）
**听力 (L01-L50)**
- 1-3 `II-L-picture` [easy]：看图/图表选合适的话
- 4-8 `II-L-followup` [easy]：对话接续
- 9-12 `II-L-action` [easy]：听对话选"女子/男子接下来会做的行动"
- 13-16 `II-L-detail` [medium]：选与内容一致
- 17-20 `II-L-mainidea` [medium]：选中心想法
- 21-50 短文题组 (每 2 题一组，共 15 组) [medium，末段 hard]：听独白/对话/访谈/讲座，每组两问。questionType 用 `II-L-passage-*` 系列（mainidea/detail/intent/identity/opinion/topic/place/attitude/context/lecture/doc 等，可复用组合），组ID `E{NN}II-L-G{起}-{止}`

**阅读 (R01-R50)**
- 1-2 `II-R-blank` [easy]：语法填空（选合适的语尾/连接）
- 3-4 `II-R-meaning` [easy]：选与划线部分意思相近的表达
- 5-8 `II-R-topic`/广告告示题 [easy]：看短广告/告示选主题或对象
- 9-12 `II-R-detail`/`II-R-match` [easy-medium]：图文/短文选一致
- 13-15 `II-R-order` [medium]：排序
- 16-30 `II-R-blank`/`II-R-passage-*` [medium]：填空+短文细节+话题+中心
- 31-41 `II-R-passage-*` [medium-hard]：说明文/论说文，填空/插入/主题/细节
- 42-50 `II-R-passage-*` [hard]：长篇论说/文学，态度/心情/意图/填空，两两成组

> 蓝图是"结构模板"，questionType 命名沿用 E01 参考卷已有的值即可（不要发明太多新名）。若需要确认某题型的确切写法，可只读 `public/data/topik/questions/E01-I.json` 或 `E01-II.json` 的**同题号**做**格式**参考——但**内容必须全新原创**，不得复制其场景/选项/短文。

## ⚠️ 分段写文件（强制，防止输出流卡死）

**绝对不要一次 Write 出全部题目**（70/100 题的 JSON 太大会把输出流冲垮导致任务失败）。必须分批：

TOPIK I（70题）分 3 批：
1. 先 Write 一个**只含听力 30 题**的完整 JSON 数组到目标文件（`[ {L01}, ... {L30} ]`）。
2. 再 Read 该文件，用 Edit 把末尾的 `]` 替换成 `,` + 阅读 31-50（20题）+ `]`。
3. 再 Read，用 Edit 把末尾 `]` 替换成 `,` + 阅读 51-70（20题）+ `]`。

TOPIK II（100题，短文长）分 5-6 批、**每批只写 15-20 题**（25题仍可能冲垮流）：听力 L01-15 → L16-30 → L31-50 → 阅读 R01-18 → R19-35 → R36-50，用"先Write再Read+Edit续写"，每批之间喘口气。

每批之间可以停下来喘口气。这样单次输出不超过约 25 题，稳定不卡。写完最后一批再跑校验脚本。

## 自检（生成后）

输出前自查：题量对、编号连续、id 与 number 匹配、每题恰 4 选项、correctIdx 在 0..3、听力题有 audioText、短文组 prompt 含正文且组内一致、explanation 是中文、promptZh 是中文、答案确实正确且唯一。
