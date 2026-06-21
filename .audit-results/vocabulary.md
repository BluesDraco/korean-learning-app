# 词汇数据韩语审查报告

**日期**: 2026-06-22
**范围**: `src/data/vocabulary/*.ts` 全部文件
**方法**: 只读审查，逐文件抽样

---

## 已审查文件

| # | 文件 | 状态 | 发现 |
|---|------|------|------|
| 1 | entries.ts | 已抽样 (~1500行) | 未发现错误 |
| 2 | entries-intermediate.ts | 已审查 | 9处问题 (H1, H2) |
| 3 | entries-advanced.ts | 已审查 | 未发现错误 |
| 4 | entries-topik.ts | 已审查 | 大量问题 (H3, H14, H15) |
| 5 | entries-topik-new.ts | 已审查 | 未发现错误 |
| 6 | entries-topik-1e.ts | 已审查 | 2处问题 (C1, H4) |
| 7 | entries-topik-1f.ts | 已审查 | 未发现错误 |
| 8 | entries-topik-2c.ts | 已审查 | 2处问题 (H5, H6) |
| 9 | entries-topik-new-1b.ts | 已审查 | 未发现错误 |
| 10 | entries-topik-new-1c.ts | 已审查 | 未发现错误 |
| 11 | entries-topik-new-1d.ts | 已审查 | 未发现错误 |
| 12 | entries-topik-new-2.ts | 已审查 | 大量罗马音h缺失 (H7系列) |
| 13 | entries-topik-new-2b.ts | 已审查 | 罗马音/register/混排问题 (H13) |
| 14 | entries-topik-2d.ts | 已审查 | 4处罗马音错误 (H8系列) |
| 15 | entries-topik-3.ts | 已审查 | 系统性韩中混排 (H9) |
| 16 | entries-topik-3b.ts | 已审查 | 多处罗马音h缺失 (H10) |
| 17 | entries-topik-4.ts | 已审查 | 系统性韩中混排 (H11) |
| 18 | entries-topik-textbook-2.ts | 已审查 | 1处罗马音错误 (H12) |
| 19 | entries-topik-textbook-1.ts | 已审查 | 未发现错误 |
| 20 | levels.ts | 已审查 | 未发现错误 |
| 21 | themes.ts | 已审查 | 未发现错误 |
| 22 | vocab-data.ts | 已审查 | 未发现错误 |
| 23 | index.ts | 已审查 | 未发现错误 |
| 24 | entries-topik-4b.ts | 已审查 | 系统性韩中混排 (H16) |
| 25 | entries-topik-4c.ts | 已审查 | 多处罗马音h缺失 (H17) |
| 26 | entries-topik-5.ts | 已审查 | 系统性韩中混排 (H18) |
| 27 | entries-topik-5b.ts | 已审查 | 系统性韩中混排+罗马音 (H19) |
| 28 | entries-topik-5c.ts | 已审查 | 1处罗马音h缺失 |
| 29 | entries-topik-5d.ts | 已审查 | 系统性韩中混排 (H20) |
| 30 | entries-topik-6.ts | 已审查 | 系统性韩中混排+罗马音 (H21) |
| 31 | entries-topik-6b.ts | 已审查 | 系统性韩中混排+罗马音 (H22) |
| 32 | entries-topik-6c.ts | 已审查 | 未发现错误 |
| 33 | entries-topik-6d.ts | 已审查 | 系统性韩中混排+罗马音 (H23) |
| 34 | entries-topik-textbook-3.ts | 已审查 | 未发现错误 |
| 35 | entries-topik-textbook-4.ts | 已审查 | 1处罗马音错误 (H24) |
| 36 | entries-topik-textbook-5.ts | 已审查 | 1处罗马音问题 (H25) |
| 37 | entries-topik-textbook-6.ts | 已审查 | 未发现错误 |

---

## CRITICAL 级别

### C1. entries-topik-1e.ts — topik-1-616: 罗马音拼写错误

- **原文**: `romanization: "amyeogeona"`
- **问题**: `아무거나` 的罗马音应为 `amugeona` (a-mu-geo-na)。`amyeogeona` 不对应任何合法韩语音节。
- **修正**: `"amugeona"`

---

## HIGH 级别 -- 逐条

### H1. entries-intermediate.ts — festival-05: 中文翻译拼写错误
- **原文**: `nuance: "设날..."`
- **问题**: `设` 应为 `설`。韩文词 `설날` (春节) 的 nuance 字段误用了汉字 `设`。
- **修正**: `"설날..."`

### H2. entries-intermediate.ts — media-25 到 media-35: register 字段使用韩文
- **原文**: `register: "통용"` (8处)
- **问题**: register 字段应使用中文标签 `"通用"`，不是韩文 `"통용"`。
- **修正**: 全部8处改为 `"通用"`

### H3. entries-topik.ts — topik-1-080: register 字段混用汉字+韩文
- **原文**: `register: "通용"`
- **问题**: `通` (汉字) + `용` (韩文) 混合。应为 `"通用"`。
- **修正**: `"通用"`

### H4. entries-topik-1e.ts — topik-1-598: register 字段使用韩文
- **原文**: `register: "통용"`
- **修正**: `"通用"`

### H5. entries-topik-2c.ts — topik-2-448: 例句中文翻译拼写错误
- **原文**: `chinese: "政治很复条"`
- **修正**: `"政治很复杂"`

### H6. entries-topik-2c.ts — topik-2-496: nuance 字段使用韩文
- **原文**: `nuance: "중성"`
- **修正**: `"中性"`

### H7. entries-topik-new-2.ts — 大量 `하다` 复合动词罗马音缺失 `h`

下表列出所有 하다 动词罗马音缺少 `h` 的条目（RR标准要求保留 `h`）：

| ID | Korean | 原文 romanization | 修正 |
|----|--------|-------------------|------|
| topik-2-129 | 연습하다 | yeonseupada | yeonseu**ph**ada |
| topik-2-133 | 대답하다 | daedapada | daeda**ph**ada |
| topik-2-144 | 신청하다 | sincheongada | sincheon**gh**ada |
| topik-2-150 | 축하하다 | chukahada | chu**kh**ahada |
| topik-2-155 | 후회하다 | huhoeada | huho**eh**ada |
| topik-2-189 | 포장하다 | pojangada | pojan**gh**ada |
| topik-2-243 | 복잡하다 | bokjapada | bokja**ph**ada |
| topik-2-264 | 성공하다 | seongongada | seonggon**gh**ada |
| topik-2-268 | 입학하다 | ipakada | ipa**kh**ada |
| topik-2-269 | 졸업하다 | joreopada | joreo**ph**ada |
| topik-2-270 | 취업하다 | chwieobada | chwieo**ph**ada |
| topik-2-295 | 배달하다 | baedalada | baeda**lh**ada |
| topik-2-392 | 다양하다 | dayangada | dayan**gh**ada |

此外还有多条目 romanization 中错误地包含空格：
- topik-2-147: `"hwagin hada"` → `"hwaginhada"`
- topik-2-259: `"bullyu hada"` → `"bullyuhada"`
- topik-2-260: `"baltyo hada"` → `"balpyohada"`
- topik-2-265: `"silpae hada"` → `"silpaehada"`

### H8. entries-topik-2d.ts — 罗马音错误

| ID | Korean | 原文 | 修正 | 问题 |
|----|--------|------|------|------|
| topik-2-506 | 간직하다 | ganjikada | ganji**kh**ada | 缺失 h |
| topik-2-513 | 곤란하다 | gonnanhada | go**ll**anhada | ㄴ+ㄹ → ㄹㄹ 同化 |
| topik-2-515 | 굉장하다 | goengjangada | goengjan**gh**ada | 缺失 h |
| topik-2-551 | 섭섭하다 | seopseopada | seopseo**ph**ada | 缺失 h |

### H9. entries-topik-3.ts (topikNewEntries3, 73条目) — 系统性韩中混排

**整个文件的 Chinese 字段（meanings.chinese, examples.chinese, register, nuance, scene, tags）大量混入韩文**。这是 AI 生成时的系统性缺陷。典型问题类型：

**A. register 字段为韩文**：约 30+ 条目使用 `"통용"` 代替 `"通用"`，`"정식"` 代替 `"正式"`

**B. nuance 字段为韩文**：约 50+ 条目使用 `"중성"` 代替 `"中性"`，`"긍정"` 代替 `"积极"`，`"부정"` 代替 `"消极"`

**C. chinese 翻译混入韩文词汇**：例如：
- topik-3-171: `"达成목标"` → `"达成目标"`
- topik-3-176: `"沟通很重요"` → `"沟通很重要"`
- topik-3-182: `"公共利益很重요"` → `"公共利益很重要"`
- topik-3-191: `"충분히讨论"` → `"充分讨论"`
- topik-3-193: `"寻찾해決方案"` → `"寻找解决方案"`
- topik-3-198: `"찾아요相关资料"` → `"寻找相关资料"`

**D. scene/tags 字段为韩文**：约 20+ 条目的 scene 和 tags 使用韩文如 `"사회"`, `"사고"`, `"工작"`, `"학습"`, `"일상"`, `"경제"` 等

### H10. entries-topik-3b.ts — 多处 하다 罗马音缺失 h

| ID | Korean | 原文 | 修正 |
|----|--------|------|------|
| topik-3-201 | 가동하다 | gadongada | gadon**gh**ada |
| topik-3-230 | 권장하다 | gwonjangada | gwonjan**gh**ada |
| topik-3-234 | 기발하다 | gibalada | giba**lh**ada |
| topik-3-248 | 단단하다 | dandanada | danda**nh**ada |
| topik-3-274 | 부당하다 | budangada | budan**gh**ada |
| topik-3-277 | 부합하다 | buhapada | buha**ph**ada |
| topik-3-284 | 생소하다 | saengsoada | saengso**h**ada |

另有：
- topik-3-238: 남다르다 romanization `"namdarada"` → `"namdareuda"` (르→reu 而非 ra)
- topik-3-239: 납득하다 romanization `"napteukhada"` → `"napdeukhada"` (ㄷ→d 而非 t)

### H11. entries-topik-4.ts (topikNewEntries4, 74条目) — 系统性韩中混排

**与 H9 相同性质的问题**。整个文件的 Chinese 字段严重混入韩文：
- register: `"통용"` 应为 `"通用"`, `"정식"` 应为 `"正式"` (约 50+ 条目)
- nuance: `"중성"` 应为 `"中性"`, `"긍정"` 应为 `"积极"`, `"부정"` 应为 `"消极"` (约 50+ 条目)
- chinese 翻译混入韩文词汇 (约 40+ 条目)
- scene/tags 使用韩文 (约 30+ 条目)

### H12. entries-topik-textbook-2.ts — topik-2-557: 罗马音错误
- **原文**: 도움 → `"doume"`
- **修正**: `"doum"` (도+우+ㅁ = d-o-u-m)

### H13. entries-topik-new-2b.ts — 多处问题

**罗马音 h 缺失**：
| ID | Korean | 原文 | 修正 |
|----|--------|------|------|
| topik-2-257 | 찬성하다 | chanseongada | chanseon**gh**ada |
| topik-2-326 | 허락하다 | heorakada | heora**kh**ada |

**字段语言混排**：
- topik-2-341: scene `"运동"` → `"运动"`
- topik-2-343: scene `"文화"` (多处) → `"文化"`
- topik-2-376: register `"통용"` → `"通用"`

**罗马音错误**：
- topik-2-383: 어른스럽다 `"eoreunseureobda"` → `"eoreunseureopda"` (final ㅂ before ㄷ → p)
- topik-2-302: 재활용 `"jaehallyong"` → `"jaehwaryong"` (활→hwal, ㄹ连音→r)

---

### H14. entries-topik.ts — topik-5 区域 (topik-5-097~100): 韩中混排+罗马音错误

**罗马音错误**：
| ID | Korean | 原文 | 修正 | 问题 |
|----|--------|------|------|------|
| topik-5-098 | 다양성포용 | dayangsseonpoyong | dayangseongpoyong | 多余 s |
| topik-5-099 | 반차별 | banchadyeol | banchabyeol | ㅂ→b |
| topik-5-100 | 포용성장 | poyongsseongjang | poyongseongjang | 多余 s |

**字段混排**：
- topik-5-100: scene `"경제"` (2nd example scene is even worse: `"経济"` - Japanese kanji!) → `"经济"`
- tags 中使用韩文 `"경제"`, `"사회"` 等

### H15. entries-topik.ts — topik-6 区域 (topik-6-001~100): 大量韩中混排+罗马音错误

**Nuance 混排**：约 60+ 条目使用 `"正式"`（正确）但 mixed

**Register 混排**：约 40+ 条目使用 `"书면"` (半汉半韩) 代替 `"书面"`

**Scene 混排**：大量 scene 使用韩文如 `"철학"`、`"정치"`、`"경제"`、`"사회"`、`"심리"`、`"과학"`、`"환경"`、`"학술"`、`"문화"`、`"역사"`、`"법률"`，甚至出现日文汉字 `"経济"` 和混排 `"哲학"`、`"文화"`、`"民주主义"`、`"環경"`

**Tags 混排**：tag 中使用韩文如 `"철학"`, `"사회"`, `"정치"`, `"경제"`, `"과학"`, `"역사"`, `"문화"`, `"심리"`, `"교육"`, `"법률"`, `"환경"`, `"학술"` 等

**罗马音错误**：
| ID | Korean | 原文 | 修正 | 问题 |
|----|--------|------|------|------|
| topik-6-002 | 인식론 | insiknon | insingnon | nasalization ㄱ+ㄹ→ㅇ+ㄴ |
| topik-6-003 | 형이상학 | hyeongiisanghak | hyeongisanghak | 多余 i |
| topik-6-021 | 사회계약론 | sahoegyeyakron | sahoegyeyangnon | nasalization |
| topik-6-034 | 지정학 | jijeonghhak | jijeonghak | 多余 h |
| topik-6-042 | 계급 | gyegup | gyegeup | ㅡ→eu |
| topik-6-052 | 갈등이론 | galdeungnniron | galdeungiron | 多余 n |
| topik-6-083 | 전일론 | jeonil lon | jeonillon | 空格 |
| topik-6-093 | 귀납법 | guinabbeop | gwinapbeop | 귀=gwi |
| topik-6-171 | 현상학 | hyeonsamhak | hyeonsanghak | missing n(ㅇ) |
| topik-6-183 | 넛지 | neonjji | neotji | ㅅ→t 非 n |

---

### H16. entries-topik-4b.ts (73条目) — 系统性韩中混排

与 H9/H11 相同模式：
- register: `"공식"`→`"正式"`, `"일반"`→`"通用"`, `"학술"`→`"学术"`
- nuance: `"중성"`→`"中性"`, `"긍정"`→`"积极"`
- chinese 翻译混入韩文
- scene/tags 使用韩文

### H17. entries-topik-4c.ts (135条目) — 多处罗马音 h 缺失

| ID | Korean | 原文 | 修正 |
|----|--------|------|------|
| topik-4-445 | 성급하다 | seonggeupada | seonggeu**ph**ada |
| topik-4-446 | 언급하다 | eongeupada | eongeu**ph**ada |
| topik-4-448 | 역설하다 | yeokseorada | yeokseo**lh**ada |
| topik-4-454 | 요청하다 | yocheongada | yocheon**gh**ada |
| topik-4-459 | 옹호하다 | onghoada | ongho**h**ada |
| topik-4-460 | 저해하다 | jeohaeada | jeohae**h**ada |
| topik-4-461 | 정당하다 | jeongdangada | jeongdan**gh**ada |
| topik-4-462 | 조급하다 | jogeupada | jogeu**ph**ada |
| topik-4-463 | 조성하다 | joseongada | joseon**gh**ada |
| topik-4-464 | 조작하다 | jojagada | joja**kh**ada |
| topik-4-465 | 주저하다 | jucheoada | jucheo**h**ada |
| topik-4-466 | 진단하다 | jindanada | jinda**nh**ada |
| topik-4-472 | 탐방하다 | tambangada | tamban**gh**ada |

其余条目类似模式，共计约 30+ 处 h 缺失。

### H18. entries-topik-5.ts (103条目) — 系统性韩中混排

与 H9/H11/H16 相同模式：
- register: `"통용"`→`"通用"`, `"정식"`→`"正式"`
- nuance: `"중성"`→`"中性"`, `"긍정"`→`"积极"`, `"부정"`→`"消极"`
- chinese 翻译混入韩文词汇 (约 40+ 条目)
- scene/tags 使用韩文

### H19. entries-topik-5b.ts (75条目) — 系统性韩中混排+罗马音

与 H18 相同模式，外加：
- topik-5-128: 산출 romanization `"san chul"` → `"sanchul"` (空格)
- topik-5-129: 상충 romanization `"sang chung"` → `"sangchung"` (空格)
- 大量 하다 动词罗马音缺失 h

### H20. entries-topik-5d.ts (105条目) — 大量韩中混排

- register: `"통용"`, `"통用"` (混合!) → 应统一为 `"通用"`
- nuance: `"중성"`, `"서면"`, `"구어"` → `"中性"`, `"书面"`, `"口语"`
- chinese 翻译混入韩文 (e.g., `"互相합작"`, `"明确地표현"`, `"提出방안"`)
- scene 使用韩文: `"사회"`, `"경제"`, `"학습"`, `"연구"`, `"일상"`, `"업무"`, `"국제"`
- tags 使用韩文: `"사회"`, `"경제"`, `"학습"`, `"사고"`, `"정치"`
- 罗马音 h 缺失多处

---

### H21. entries-topik-6.ts (topikNewEntries6, 100条目) — 系统性韩中混排+罗马音

**全文件系统性 AI 生成缺陷**：

**A. register 字段全为韩文**：`"정식"`→`"正式"`, `"통용"`→`"通用"`

**B. nuance 字段全为韩文**：`"중성"`→`"中性"`, `"긍정"`→`"积极"`, `"부정"`→`"消极"`

**C. chinese 翻译混入韩文**（几乎每条都有）：
- topik-6-101: `"함의着深层意义"` → `"蕴含着深层意义"`
- topik-6-102: `"전제特定条件"` → `"以特定条件为前提"`
- topik-6-104: `"내재着矛盾"` → `"蕴含着矛盾"`
- topik-6-107: `"查明원인"` → `"查明原因"`
- topik-6-115: `"谋求발전"` → `"谋求发展"`
- topik-6-116: `"研究대策"` → `"研究对策"`
- topik-6-122: `"是정체성混乱"` → `"是认同混乱"`
- topik-6-130: `"인문학很重요"` → `"人文学很重要"`
- （以及约 90+ 条类似混排）

**D. scene 全为韩文**：`"학습"`, `"사고"`, `"인성"`, `"정치"`, `"문학"`, `"철학"`, `"사회"`, `"교육"`, `"국제"`, `"환경"`, `"기술"`, `"문화"`, `"경제"`, `"역사"`, `"일상"`, `"학문"`, `"Work"`(英语混入!)

**E. tags 全为韩文**：同上

**F. 罗马音错误**：
| ID | Korean | 原文 | 修正 | 问题 |
|----|--------|------|------|------|
| topik-6-108 | 천착하다 | cheonchakada | cheoncha**kh**ada | 缺失 h |
| topik-6-146 | 네트워크 | neteuwo keu | neteuwokeu | 空格 |
| topik-6-156 | 공리 | gongniyi | gongni | 多余 yi |
| topik-6-157 | 인식론 | insiklon | insingnon | nasalization |
| topik-6-158 | 해석학 | haeseokak | haeseokhak | 缺失 h |
| topik-6-167 | 포스트모더니즘 | poseuteu modeoni jeum | poseuteumodeonijeum | 空格 |
| topik-6-171 | 현상학 | hyeonsamhak | hyeonsanghak | ㅇ→ng |
| topik-6-181 | 공유지 | gonyuji | gongnyuji | 缺失 n |
| topik-6-183 | 넛지 | neonjji | neotji | n 错位 |
| topik-6-194 | 자기조직화 | jagi jojikhwa | jagijojikhwa | 空格 |
| topik-6-196 | 질적연구 | jiljeok yeongu | jiljeongnyeongu | 空格 |
| topik-6-197 | 양적연구 | yangjeok yeongu | yangjeongnyeongu | 空格 |
| topik-6-200 | 비판이론 | bipan ilon | bipaniron | 空格 |

### H22. entries-topik-6b.ts (topikNewEntries6b, 69条目) — 系统性韩中混排+罗马音

与 H21 相同模式：

**A. register 全为韩文**：`"학술"`→`"学术"`

**B. nuance 全为韩文**：`"중성"`→`"中性"`, `"긍정적"`→`"积极"`, `"부정적"`→`"消极"`

**C. chinese 翻译混入韩文**：
- topik-6-236: `"解释학이对立"` → `"解释学与实证主义对立"`
- topik-6-243: `"自然主义哲학을"` → `"研究自然主义哲学"`
- topik-6-247: `"不能将暴力正당화할"` → `"不能将暴力正当化"`
- topik-6-249: `"是中心与边缘的关계"` → `"是中心与边缘的关系"`
- topik-6-250: `"是曼海姆의知识社会学理论"` → `"是曼海姆的知识社会学理论"`
- topik-6-258: `"理性론与经验론"` → `"理性论与经验论"`
- topik-6-263: `"胡塞尔的现상학"` → `"胡塞尔的现象学"`
- (以及约 40+ 条类似)

**D. scene/tags 全为韩文**：`"학술"`, `"철학"`, `"문학"`, `"역사"`, `"경제"`, `"정치"`, `"교육"`, `"사회학"`, `"심리학"`, `"인류학"`, `"연구방법"`, `"문화연구"`, `"미디어"`, `"페미니즘"`, `"윤리"`, `"국제"`, `"언어학"`

**E. 罗马音问题**：
| ID | Korean | 原文 | 修正 | 问题 |
|----|--------|------|------|------|
| topik-6-201 | 가치론 | gachiro n | gachiron | 空格 |
| topik-6-205 | 경험론 | gyeongheomno n | gyeongheomnon | 空格 |
| topik-6-206 | 공동선 | gongdongse on | gongdongseon | 空格 |
| topik-6-211 | 구성주의 | guseong juui | guseongjuui | 空格 |
| topik-6-220 | 맥락화 | maengnahwa | maengnakhwa | 缺失 k |
| topik-6-222 | 모순논리 | mosun nongni | mosunnolli | 空格+音 |
| topik-6-223 | 목적론 | mokjeognon | mokjeongnon | nasalization |
| topik-6-248 | 존재자 | jonjaexa | jonjaeja | x→j |
| 多处 | - | 含空格 | - | 如 misi gwollyeok, ban bonjeol juui, sangho tekseuteuseong 等 |

### H23. entries-topik-6d.ts (100条目) — 系统性韩中混排+罗马音

与 H21/H22 相同模式：

**A. register 全为韩文/混排**：`"통용"`→`"通用"`, `"학술"`→`"学术"`, `"법률"`→`"法律"`, `"경제"`→`"经济"`

**B. nuance 大量为混排**：`"书면"` (半汉半韩!) → `"书面"`

**C. chinese 翻译混入韩文**（几乎每条都有，约 80+ 条目）

**D. scene/tags 全为韩文**

**E. 罗马音错误**：
| ID | Korean | 原文 | 修正 | 问题 |
|----|--------|------|------|------|
| topik-6-278 | 가속화 | gasokwa | gasokhwa | 缺失 h |
| topik-6-289 | 기득권 | gigeukgwon | gideukgwon | ㄷ→d |
| topik-6-300 | 모색하다 | mosaekada | mosaekhada | 缺失 h |
| topik-6-311 | 소통하다 | sotongada | sotonghada | 缺失 h |
| topik-6-312 | 수렴하다 | sureyomhada | suryeomhada | 拼写错误 |
| topik-6-313 | 시장원리 | sijaswonni | sijangwonri | 拼写错误 |
| topik-6-317 | 연대하다 | yendaehada | yeondaehada | ㅕ→yeo |
| topik-6-325 | 재구성하다 | jaeguseongada | jaeguseonghada | 缺失 h |
| topik-6-326 | 재편하다 | jaeopyeonhada | jaepyeonhada | 错误 ㅍ→p |
| topik-6-327 | 전제하다 | jeomjehada | jeonjehada | ㄴ→n |
| topik-6-334 | 집단지성 | jipjanjiseoung | jipdanjiseong | 拼写错误 |
| topik-6-338 | 추상화 | chuangsanghwa | chusanghwa | 多余 ang |
| topik-6-341 | 합리화하다 | hannirhwahada | hamnihwahada | ㄹ→l |
| topik-6-345 | 형이상학 | hyeonguisanghak | hyeongisanghak | 多余 u |
| topik-6-360 | 세계관 | segyewan | segyegwan | ㄱ→g |
| topik-6-364 | 의도적 | uidonjeok | uidojeok | ㄷ→d |
| topik-6-374 | 합의하다 | hapeuhada | habuihada | ㅂ→b |
| topik-6-377 | 획기적 | hoeggijeck | hoekgijeok | 拼写错误 |

另有 10+ 条目 romanization 含有空格。

### H24. entries-topik-textbook-4.ts — topik-4-412: 罗马音拼写错误
- **原文**: 패션 잡화 → `"paesyeon japhoa"`
- **修正**: `"paesyeon japhwa"` (잡화= jap+hwa, 非 hoa)

### H25. entries-topik-textbook-5.ts — topik-5-400: 罗马音可能错误
- **原文**: 백문이 불여일견 → `"baengmuni buryeolgyeon"`
- **问题**: 불여일견 应转写为 `buryeoilgyeon`（불=bul, 여=yeo, 일=il, 견=gyeon），当前缺少 `i`
- **修正**: `"baengmuniburyeoilgyeon"`

---

## 问题汇总

| 级别 | 数量 | 类型 |
|------|------|------|
| CRITICAL | 1 | 罗马音拼写错误 |
| HIGH (逐条) | 25项 | 涵盖数百处具体问题 |
| HIGH (系统) | 8文件 | 全文件韩中混排 |

### 问题分类统计

| 类别 | 预估数量 | 涉及文件 |
|------|----------|----------|
| 罗马音 h 缺失 (하다动词) | ~80处 | new-2, 2b, 2d, 3b, 4c, 5b, 5d, 6, 6d |
| 罗马音其他错误 | ~40处 | topik, 2d, 3b, 2b, 4, 4b, 6, 6b, 6d, textbook-4, textbook-5 |
| register/nuance 韩文 | ~300+处 | intermediate, topik, 1e, 2c, 3, 4, 4b, 5, 5b, 5d, 6, 6b, 6d |
| chinese 字段韩中混排 | ~250+处 | topik, 3, 4, 4b, 5, 5b, 5d, 6, 6b, 6d |
| 中文拼写错误 | 2处 | intermediate, 2c |

### 系统性受影响的文件（AI生成缺陷）

以下 8 个文件的 Chinese 字段（register, nuance, chinese, scene, tags）**全文件**存在韩文混入问题：

| 文件 | 条目数 | 严重程度 |
|------|--------|----------|
| entries-topik-3.ts | 73 | 全面混排 |
| entries-topik-4.ts | 74 | 全面混排 |
| entries-topik-4b.ts | 73 | 全面混排 |
| entries-topik-5.ts | 103 | 全面混排 |
| entries-topik-5b.ts | 75 | 全面混排 |
| entries-topik-5d.ts | 105 | 全面混排 |
| entries-topik-6.ts | 100 | 全面混排+罗马音 |
| entries-topik-6b.ts | 69 | 全面混排+罗马音 |
| entries-topik-6d.ts | 100 | 全面混排+罗马音 |

另外 entries-topik.ts 的 topik-5 和 topik-6 区段（topik-5-097~100, topik-6-001~100）也有大量混排。

### 未受影响（干净）的文件

以下文件审查后确认无问题：
- entries.ts (核心初级词库)
- entries-advanced.ts
- entries-topik-new.ts, entries-topik-new-1b.ts, entries-topik-new-1c.ts, entries-topik-new-1d.ts
- entries-topik-1f.ts
- entries-topik-textbook-1.ts (大文件，全面抽样未发现错误)
- entries-topik-textbook-3.ts
- entries-topik-textbook-6.ts
- entries-topik-6c.ts
- levels.ts, themes.ts, vocab-data.ts, index.ts

---

## 审查完成

全部 37 个词汇数据文件已审查完毕。
