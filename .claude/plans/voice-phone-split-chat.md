# 陪练/场景对话统一：语音条 + 电话双按钮（参考豆包）

## 背景与目标
`/companion/[id]`（我的陪练）和 `/practice/[slug]`（场景练习）的语音体验不一致：
- 场景练习正常；陪练页复用了 `VoiceModeOverlay` 但**没引入其 CSS**（`.vmode-*` 只在 `scene.css`），导致覆盖层塌成左下角裸 DOM。
- 之前还叠加了 `voice.*` i18n key 缺失（显示 key 原文）——**已修**（zh.ts/en.ts 已补齐 15 个 key，本次调研确认）。

参考豆包，把语音能力拆成两个独立入口，两个页面统一：
- **右上角 电话按钮**：进入现有**实时对话**（全屏 orb，`VoiceModeOverlay`）。
- **右下角 语音按钮**：**按住说话** → 录音 → 生成**可回放语音条气泡** + **转写韩语文字**，作为一条用户消息发出，NPC 正常回复。

## 关键约束（调研结论）
1. **消息持久化 = 单列 JSON，上限 100KB**（`/api/practice/session` route.ts:55）。→ 音频**不能内联**进消息。
2. **音频存储：IndexedDB 本地**（用户已定）。按 `消息id` 存 Blob，刷新/重进可回放；仅同设备。零服务器成本。
3. 现有 `src/lib/db.ts` 是云端封装、`cache.ts` 是内存缓存——**没有现成的原始 IndexedDB blob 存储**，需新建一个极小的原生 IDB 封装（无依赖）。
4. 录音：`recorder.ts` 产出 `audio/webm;codecs=opus`（iOS 回落 `audio/mp4`），返回 `{ blob, url, mimeType }`。ASR `/api/asr/aliyun` 接受 opus/webm/mp3/wav，返回 `{ text }`。
5. 两个页面**各自有重复的 composer/消息列表 markup**（无共享聊天组件）。`ChatMessage` 结构两页一致：`{ id, role:'npc'|'user'|'divider', ko, cn?, feedback? }`。
6. CSS：`.vmode-*` 块在 `scene.css` **7896–8172 行**，自包含（内部 `@property` + 局部 var），可整体抽出为共享文件。

## 实施步骤

### 第 1 步：修布局塌陷（独立、先落地、低风险）
把 `scene.css` 的 `.vmode-*` 块（7896–8172）抽到新文件 `src/components/practice/voiceOverlay.css`，让 `VoiceModeOverlay.tsx` 自己 `import './voiceOverlay.css'`（组件自带样式，两页都生效，不再依赖页面 css）。
- scene.css 删除该块（避免重复定义）。
- 验证：companion 页点电话按钮，覆盖层全屏正常。

### 第 2 步：新建本地音频存储 `src/lib/audio/voiceStore.ts`
原生 IndexedDB，无依赖，约 30–40 行：
- `putVoice(id: string, blob: Blob): Promise<void>`
- `getVoiceURL(id: string): Promise<string | null>`（内部 `URL.createObjectURL`，调用方负责 revoke）
- `deleteVoice(id)`（清理用，可选）
- 单 object store `voice`，key = 消息 id。

### 第 3 步：语音条气泡组件 `src/components/practice/VoiceBubble.tsx`
- props: `{ msgId, durationMs, transcript }`。
- 挂载时 `getVoiceURL(msgId)` 拿本地音频；渲染播放/暂停按钮 + 简易波形（纯 CSS 条形，不做真实波形分析）+ 时长。
- 音频缺失（换设备）时优雅降级：只显示转写文字 + 小"语音"标，播放键置灰。
- 复用 `unlockAudioContext`（iOS 手势解锁）。

### 第 4 步：`ChatMessage` 增字段 + 录音发送逻辑（两页共用逻辑）
- `ChatMessage` 增：`voice?: { durationMs: number }`（标记这是语音消息；音频本体在 IDB，转写文字仍存 `ko`）。持久化时 `voice` 元数据随 JSON 存（极小），音频不进 JSON。
- 新增 hook `src/lib/audio/useVoiceMessage.ts` 封装：按住开始录音→松开停止→`putVoice(id, blob)`→调 ASR 转写→把 `{id, role:'user', ko: 转写, voice:{durationMs}}` 加入消息并触发既有 NPC 回复链路（复用各页现有 `handleSend` 的"拿到用户韩语文本后"部分）。
- 录音失败/权限/非安全上下文：复用第 262 行那套精确错误分类提示（http 无麦克风等）。

### 第 5 步：双按钮 UI（两页对称改造）
- **右上角电话按钮**：header 右侧加 phone 图标按钮 → 触发现有 `mode='voice'`/`voiceOpen`（打开 VoiceModeOverlay）。
- **右下角语音按钮**：composer 加"按住说话"麦克风按钮（`onPointerDown/Up`）→ 走第 4 步 hook。原有文字输入保留。
- 两页 markup 重复，本次**不强行抽共享组件**（ponytail：避免过度设计），但按钮 className/结构保持一致，样式走各页 css 对齐。
- 新增 i18n key（zh+en 双写）：`voice.hold_to_talk`、`voice.call`、`voice.recording`、`voice.release_to_send`、`voice.too_short`、`voice.play`、`voice.pause`、`voice.transcribing`。

### 第 6 步：验证
- `npx tsc --noEmit` + `npm run build`。
- 桌面 localhost（安全上下文）：录音条→转写→发送→NPC 回复→刷新后气泡仍可播放（IDB 命中）。
- 电话按钮：两页覆盖层全屏正常。
- 边界：录音过短提示、权限拒绝提示、换页面/换设备时音频缺失降级。
- iOS 真机需 https（隧道）验证；桌面无法覆盖 iOS 音频解锁，明确告知用户此项未在真机验证。

## 不做（范围控制）
- 不做真实波形频谱分析（CSS 假波形即可）。
- 不做服务器音频存储/跨设备同步（用户选本地）。
- 不强行把两页合并成一个共享聊天组件（改动过大，收益不明）。

## 风险
- iOS：`audio/mp4` 录音 + IDB Blob 回放需真机验证（桌面测不到）。
- 每页仍是重复 markup，未来第三个页面会再复制一次——本次接受。
