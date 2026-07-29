# 电台逐句「跟读 + 语法解析」附赠功能

## 目标与约束
在电台每句字幕下增加两个**附赠**功能:①逐句跟读(复读原句+录音+发音打分)②语法解析(词素级拆解)。
硬约束(用户反复强调):**不打扰主体验**——默认零多余 UI,只在句尾放小图标,点击才展开;不改动播放/字幕主逻辑;桌面与移动、普通电台与访谈聊天气泡两种布局都要摆对。

## 关键事实(已逐行核实)
- 字幕每句有 `start`/`end`/`speaker`/`ko`/`zh` 时间戳 → 区间播放无需切音频文件。
- 普通电台与访谈**共用同一段渲染**(`RadioPlayerClient.tsx` 444-468),区别仅外层 CSS 类 `radio-transcript-chat`。小图标挂在 `radio-turn-bubble` 内即可覆盖两种布局。
- 语法接口 `/api/ai/grammar-breakdown` 已存在:入参 `{sentence, grammarTitle?}`,出参 `{tokens:[{text,role}]}`(词素+≤15字中文标注),走 DeepSeek,需登录。**直接复用,不新建接口。**
- 发音打分逻辑在 `src/app/listening/shadow/page.tsx`:`similarity()`(normalizeKorean+编辑距离,0-1)+分档(≥.85/≥.6/<.6)。**抽成共享工具复用。**
- 录音基建 `src/lib/audio/recorder.ts`(`AudioRecorder`、`requestMicPermission`)、识别 `KoreanSpeechRecognizer`、`normalizeKorean` 均现成。

## 用户已确认的决策
1. 跟读 = 复读原句 + 录音 + 发音打分
2. 语法 = 词素级拆解,复用现有 `/api/ai/grammar-breakdown`
3. 语法结果缓存(localStorage,不碰数据库)
4. 入口 = 每句尾部小图标,点击才展开(默认收起)
5. 上线范围 = 电台全部(4常规 + 访谈)

## 实现步骤

### 1. 抽共享发音打分工具(不复制粘贴)
- 新建 `src/lib/audio/pronunciationScore.ts`:导出 `scorePronunciation(spoken, target) => {score:0-100, verdict:'correct'|'acceptable'|'wrong'}`,内容搬自 shadow 页的 `similarity()`+分档。
- 重构 `shadow/page.tsx` 改用该工具(去重,行为不变)。

### 2. 语法解析 hook + 缓存
- 新建 `src/lib/hooks/useGrammarBreakdown.ts`:输入句子,查 localStorage(key=`gram:${sha1(ko)}`)命中直接返回;未命中调 `/api/ai/grammar-breakdown`(body `{sentence:ko}`,grammarTitle 留空),成功后写缓存。返回 `{tokens, loading, error}`。
- 401(未登录)→ 返回可识别错误码,UI 提示"登录后可用",不报错崩溃。

### 3. 新组件 `RadioLineExtras`(句尾图标 + 展开面板)
- 新建 `src/components/radio/RadioLineExtras.tsx`,props:`{ ko, start, end, onPlaySegment, disabled }`。
- 默认渲染:两个小图标(🔊跟读 / 语 语法),`radio-line-extras` 容器,尺寸小、低透明度,不换行挤压气泡。
- 点跟读图标 → 展开跟读面板:①"听原句"按钮 → 调 `onPlaySegment(start,end)` ②"录音"按钮 → `AudioRecorder`+`KoreanSpeechRecognizer` → 出分数条(复用 step1 工具)。麦克风权限失败 → 面板内提示,不影响播放。
- 点语法图标 → 展开语法面板:调 step2 hook,渲染 tokens(词素+中文标注),loading 骨架,错误兜底。
- 同一时间只展开一个面板;再次点图标收起。

### 4. 区间播放(挂到播放器)
- 在 `RadioPlayerClient.tsx` 加 `playSegment(start,end)`:`audioRef.current.currentTime=start; play();` 并用 `timeupdate` 到 `end` 时 pause()(用 ref 存当前段终点,避免多次绑定)。
- 该函数经 props 传给每行的 `RadioLineExtras`。

### 5. 挂载到字幕行
- 在 444-468 的 `.map` 里,`radio-turn-bubble` 内、中文 `radio-transcript-zh` 之后,渲染 `<RadioLineExtras ...>`。
- 因普通/访谈共用此段,一处改动两种布局同时生效。

### 6. 样式(radio.css)
- `.radio-line-extras`:flex、gap 小、margin-top 6px、图标 opacity .5 hover 提亮;移动端点击热区≥32px。
- 展开面板:半透明卡片,贴合气泡宽度,不溢出(吸取上次 scale 溢出教训,不用 transform 放大)。
- 访谈聊天气泡内(`radio-transcript-chat`)单独校准对齐(guest 右对齐时面板不顶出)。

## 不做(避免过度工程)
- 不做打分历史/成就/存库。
- 不新建语法接口,不做整句总结/例句(用户选了词素级)。
- 不加"总开关",图标本身已足够低干扰。

## 验证(按记忆:必须真机视口滚完整页)
- Playwright 390×844:普通电台 + 访谈两个页面,分别点开跟读面板、语法面板,截图确认:①默认收起不挤压字幕 ②面板不溢出气泡 ③桌面 1440 不回归。
- 手动:点"听原句"确认只播该句区间;录音出分;语法 tokens 渲染;同句二次点开走缓存(秒出)。
- `npx tsc --noEmit` 通过。
- 真机麦克风/刘海边距由用户复核(模拟器 safe-area=0)。
