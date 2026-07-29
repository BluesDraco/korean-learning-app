# TOPIK I 实战题出题规范

> 版本：v1（2026-07-01 定版，基于 E01 项目经验）
> 目标：出全新的 TOPIK I 模拟卷（非真题），保证内容原创、质量可控、可批量生产

---

## 0. 红线（必读）

1. **绝不参考真题具体内容**：不看已录入的 T35I~T60I 任何题目的题干、对话、场景、选项、人物、地点、事件
2. **只用公开题型骨架**：题号分布、题型名称、分数结构、时间分配——这些是 TOPIK 官方公布的考纲信息，属公共知识
3. **场景/对话/人物/干扰项 100% 原创**：每题从零设计
4. **不做「参考真题 + 换名词」的伪原创**——法律上是衍生作品，仍侵权

违反红线的题目一律作废，不入库。

---

## 1. 命名规范

### 卷子

- **对内 id**：`topik-e{NN}-I`，NN 为两位数（e01/e02/...）
- **对外 displayName**：`TOPIK I 实战题 {NN}`
- **exam-set 字段**：`mock: true` 必填，`year: {今年}`，`round: 100+{NN}`（避开真实届数 1-96）

### 题目

- **id 格式**：`E{NN}I-{L|R}{NN}`
  - `E01I-L01` ~ `E01I-L30`：听力 30 题
  - `E01I-R31` ~ `E01I-R70`：阅读 40 题
- **groupId**（仅配对题）：`E{NN}I-{L|R}-G{起-止}`，如 `E01I-L-G25-26`

### 文件位置

- 数据源：`public/data/topik/questions.json`（整库）+ `public/data/topik/exam-sets.json`
- 出题过程稿：`.audit-cache/e{NN}-{section}-{范围}.json`
- 每次入库前备份到 `public/data/topik/*.backup.before-{说明}.{时间戳}.json`

---

## 2. 题型骨架（TOPIK I 官方结构）

### 听力（30 题 / 40 分钟）

| 题号 | 题型 | questionType | 难度 | audioText 长度 |
|------|------|--------------|------|---------------|
| 1-4 | 问答应答 | I-L-response | easy | 单句 |
| 5-6 | 接续应答 | I-L-followup | easy | 单句 |
| 7-10 | 地点推断 | I-L-place | easy | 双句对话 |
| 11-14 | 主题判断 | I-L-topic | easy | 双句对话 |
| 15-16 | 看图选话 | I-L-picture | medium | 双句对话 + imageDescriptions |
| 17-21 | 内容一致 | I-L-detail | medium | 4-6 轮对话 |
| 22-24 | 中心思想 | I-L-mainidea | medium | 4 轮对话 |
| 25-26 | 广播/公告目的+一致（配对） | I-L-passage-purpose | medium | 独白 3-5 句 |
| 27-28 | 对话主题+一致（配对） | I-L-passage-topic | medium | 4-6 轮对话 |
| 29-30 | 访谈理由+一致（配对） | I-L-passage-main | hard | 5-7 轮对话 |

### 阅读（40 题 / 60 分钟）

| 题号 | 题型 | questionType | 难度 |
|------|------|--------------|------|
| 31-33 | 短句判话题 | I-R-topic | easy |
| 34-39 | 填空选词 | I-R-fill-{verb,noun,particle,adv,adj} | easy |
| 40-42 | 公告选不符 | I-R-wrong-info | medium |
| 43-45 | 短文内容一致 | I-R-content-match | medium |
| 46-48 | 短文中心思想 | I-R-mainidea | medium |
| 49-50 | 长文·填空+中心（配对） | I-R-passage-fill | medium |
| 51-52 | 长文·连接词+主题（配对） | I-R-passage-conn | medium |
| 53-54 | 长文·填空+一致（配对） | I-R-passage-fill | medium |
| 55-56 | 长文·连接词+主题（配对） | I-R-passage-conn | medium |
| 57-58 | 句子排序 | I-R-order | medium |
| 59-60 | 长文·句子插入+一致（配对） | I-R-passage-insert | medium |
| 61-62 | 长文·填空+一致（配对） | I-R-passage-fill | medium |
| 63-64 | 邮件目的+一致（配对） | I-R-passage-purpose | medium |
| 65-66 | 长文·填空+中心（配对） | I-R-passage-fill | medium |
| 67-68 | 长文·填空+一致（配对） | I-R-passage-fill | hard |
| 69-70 | 长文·理由+一致（配对） | I-R-passage-purpose | hard |

配对题两题共享同一 `audioText`（听力）或同一 `prompt`（阅读段落），且 `groupId` 相同。

---

## 3. 字段结构

### 必填字段（所有题）

```json
{
  "id": "E01I-L01",
  "section": "listening" | "reading",
  "level": "beginner",
  "topic": "日常/장소/주제/직업 等（韩语或中文类别名）",
  "number": 1-70,
  "type": "multiple-choice",
  "difficulty": "easy" | "medium" | "hard",
  "testPoint": "考点简述（韩语或中文，本题测什么）",
  "prompt": "题干（韩语）",
  "promptZh": "题干中文翻译",
  "options": ["选项1", "选项2", "选项3", "选项4"],
  "correctIdx": 0-3,
  "explanation": "中文解析（含正解理由 + 每个干扰项为什么错 + 要点提示）",
  "vocabulary": ["关键词1", "关键词2"],
  "examRound": 100+NN,
  "questionType": "见题型骨架表",
  "groupId": null | "E01I-L-G25-26"
}
```

### 听力题额外必填

- `audioText`: 韩语原文对话（TTS 会读这个）

### 图片题（L15-L16）额外必填

- `imageDescriptions`: `[string, string, string, string]` 与 options 平行
- **options 文本必须自带 ①②③④ 前缀**（如 `"①街道上..."`），因为图片题的选项在 UI 里靠这个前缀区分
- prompt 里加提示：`"(이 문제는 그림 선택 문제입니다. 아래 그림 설명을 보고 선택해 주세요.)"`

---

## 4. 韩语质量标准

### 强制检查项（每题过一遍）

- **조사**（받침有无 → 은/는、이/가、을/를、으로/로、이나/나）
- **尊敬阶一致**：一题内不混用 -습니다/-어요；对话可有 尊敬-半말 落差但要合理（长辈-晚辈）
- **动词变形**：ㅂ/ㄹ/르/ㅎ 不规则正确
- **口语自然度**：audioText 用真实口语（뭐/무엇 缩略、-잖아요、-네요 等），不写像书面语
- **禁止汉韩混排**：韩语字段里不夹汉字（人名除外）
- **敬语用词**：涉及长辈/客户/店员场景须用 -(으)세요、-어 주세요、께서 等

### 场景选材建议

日常常见素材（选一即可，混用增加多样性）：
- 校园/办公室/家/餐厅/咖啡店/便利店/超市/市场/百货店/银行/邮局/图书馆/公园/健身房/理发店/照相馆/医院/药店/服装店
- 天气/时间/交通/兴趣/家庭/旅游/健康/购物/预约/搬家/学习/工作

**避免使用**（跟真题重合率高）：
- "우산이 있어요?"、"공책이에요?"、"공항/식당/병원/은행/서점" 等 TOPIK 反复出现的经典短语（这些是 T35~T60 高频素材）
- 人名：不要用 "민수"（真题反复出现），改用 지혜/도현/유진/태호/서연/성민/하늘 等

---

## 5. 干扰项设计原则

### 单一正解原则

**每题只能有一个可辩护的答案**。如果两个选项都能勉强说通，改题。

### 干扰项要有明确干扰理由

不允许"随便凑一个"。每个干扰项应属于以下类别之一：

- **答非所问**（답 방향 다름）：应答类问句用另一种问句的答案（问 어디 用 언제 答）
- **同义近词误用**（유사어 오용）：意思相近但语义或搭配错
- **场景错位**：语法对但场景不搭（如 다녀오겠습니다 回 안녕히 가세요）
- **主观颠倒**：立场跟正解相反
- **时态/数字/主语不符**：细节题常用

### 干扰项内容也必须原创

不能从真题里"顺手抄"干扰项。

---

## 6. 答案分布均衡

**目标分布**：70 题里 ①②③④ 各约 17-18 道（±2）

**AI 出题的偏差警告**：LLM 潜意识倾向把正解放中间位置。E01 出完时曾出现 ②=35/70（50%），必须均衡处理。

### 均衡方法

出完全部题目后，跑 `.audit-cache/e01-rebalance.mjs` 类脚本：
1. 统计当前分布
2. 从超额桶（如 ②）抽题，与欠额桶（如 ④）位置对换
3. **同步更换 explanation 里的 ①②③④ 标记**（否则解析对不上位置）
4. **图片题排除换位**（选项文本自带 ①②③④ 前缀，换位会错乱）

标记同步替换法（swap 位置 a↔b）：
```js
q.explanation = q.explanation
  .replace(/①②③④[a]/g, '★TMP★')
  .replace(/①②③④[b]/g, '①②③④[a]')
  .replace(/★TMP★/g, '①②③④[b]');
```

---

## 7. 分批产出流程

### 推荐分批

1. 听力 1-6（应答+接续）
2. 听力 7-14（地点+主题）
3. 听力 15-24（图片+一致+中心）
4. 听力 25-30（三组配对）
5. 阅读 31-42（话题+填空+公告）
6. 阅读 43-58（内容+中心+短文配对）
7. 阅读 59-70（长文六组配对）

### 每批完成后必做

1. **JSON 有效性**：跑 `JSON.parse` 确认无语法错
2. **korean-qa skill**：抽 5-6 题过审查
3. **答案唯一性自查**：读每个干扰项，确认没有第二个可辩护正解
4. **人名/场景检查**：不与前批重复过多

---

## 8. 合并入库流程

### Step 1：备份

```
questions.json → questions.json.backup.before-{名字}.{时间戳}.json
exam-sets.json → exam-sets.json.backup.before-{名字}.{时间戳}.json
```

### Step 2：合并脚本要做的校验

- ID 完整性：`E{NN}I-L01~L30` + `E{NN}I-R31~R70` 全齐
- 每题字段：`section` ∈ {listening, reading}、`level=beginner`、`options.length=4`、`correctIdx` ∈ [0,3]、`examRound=100+NN`

### Step 3：更新 exam-set

```json
{
  "id": "topik-e{NN}-I",
  "displayName": "TOPIK I 实战题 {NN}",
  "mock": true,
  "available": true,       // 出题完成后开
  "sections": [
    { "type": "listening", "questionIds": [...30], "timeMinutes": 40 },
    { "type": "reading",   "questionIds": [...40], "timeMinutes": 60 }
  ]
}
```

### Step 4：均衡答案分布

跑 rebalance 脚本，把分布拉到 17-18/17-18/17-18/17-18。

### Step 5：三步验证

- `npx tsc --noEmit` 通过
- `npm run lint`（只关新增文件的错，旧代码 lint warnings 不管）
- `npm run build` 通过（首批必跑，后续套次只动数据可选跑）

---

## 9. 常见坑

1. **JSON 里裸双引号**：`"值得...的"` 会截断字符串。用中文引号 `「」"..."` 或去掉引号。
2. **图片题不能位置换**：options 文本自带 ①②③④ 前缀，位置换后前缀跟位置不匹配。均衡时排除。
3. **explanation 换位不同步**：只换 options 不换解析里的 ①②③④ 标记 → 解析变错。
4. **examRound 影响 TTS 播放次数**：`getListeningPlayCount(round)`——round ≤ 35 播 2 次，> 35 播 1 次（现代 TOPIK 模式）。模拟卷用 round ≥ 101 保证 1 次。
5. **前端硬编码 `第{round}回 TOPIK`**：已通过 `displayName || 原样` fallback 处理，不要再改回。
6. **audioUrl 字段**：项目已明确不用真人音频，TTS 读 audioText。不加 audioUrl。

---

## 10. 检查清单（每套卷子终审）

- [ ] 70 题全齐（30 L + 40 R）
- [ ] 每题字段完整（无缺 correctIdx / explanation 等）
- [ ] 答案分布 17-18/17-18/17-18/17-18
- [ ] 韩语审查 PASS（每批抽查过）
- [ ] 每题唯一正解可辩护
- [ ] 场景/人名与真题库不重复
- [ ] JSON parse 无错
- [ ] tsc 通过
- [ ] questions.json + exam-sets.json 都已备份
- [ ] displayName、mock、available 三字段正确
- [ ] 首页"历年真题"tab 卡片显示正确
- [ ] 从 start 页进入考试可正常做题

---

## 参考

- 相关记忆：[[project-topik-shizhan]]、[[feedback-topik-copyright]]、[[korean-qa-agent]]
- 首批产出：E01（`topik-e01-I`，2026-07-01 交付）
- 数据来源：`public/data/topik/questions.json` 中 id 前缀 `E01I-` 的 70 条
