# Canonical Registry · 跨场景高频词字段规范

**用途**：审查阶段用于统一 15 高频词在 35 场景中的 `pos` / `tier` / `emoji` / `hook` 主字段。`tags` / `example` / `confuse` 允许场景化差异。

**规则**：
- 主字段冲突时按本表修改
- `tags` 用中文短语，允许场景化差异（超市"结账时" / 咖啡"结账时" 都可）
- `example` 可保留场景化风味
- `confuse` 词对同一场景可以有场景化差异，但**同一词对的 diff 说明**不能相互矛盾

---

## 结账三件套

### 카드（刷卡）
- `pos: 'noun'` · `emoji: '💳'` · `tier: 'core'`
- `hook: 'card 音译，念快跟英文几乎一样：카-드。'`
- 首选 example：`{ ko: '카드로 할게요.', cn: '刷卡。' }`
- 允许场景化 example：付款场景 `카드로 결제할게요` / 便利店 `카드로요` 都可
- 现分布：bus-terminal / cu-mart 均 `noun/core`（一致 ✓），只需归一 example

### 현금（现金）
- `pos: 'noun'` · `emoji: '💵'` · `tier: 'core'`
- `hook: '현금(現金)＝汉字词「现金」，同源直接记。'`
- 现分布：bus-terminal `useful` → **改 core**；cu-mart `core`（已一致）

### 영수증（收据）
- `pos: 'noun'` · `emoji: '🧾'` · `tier: 'core'`
- `hook: '영수(領收)＋증(証)＝领收+证件，汉字词「领收证」。'`
- 现分布：cu-mart `useful` → **改 core**；paws-mall/supermarket `core`（已一致）

---

## 用餐/取货三件套

### 포장（打包）
- `pos: 'noun'` · `emoji: '🎁'` · `tier: 'core'`
- `hook: '포장(包裝)＝汉字词「包装」，同源直接记。'`
- confuse 词对处理：
  - 咖啡/餐厅场景对 **테이크아웃**（意思相同，포장更常用）
  - 炸鸡外卖场景对 **배달**（打包 vs 外送）
  - 咖啡场景 vs **매장**（打包 vs 堂食）
  - 三种 confuse 可共存，只要不同场景不用相同 diff 说明
- 现分布：haru-cafe emoji `🎒` → **改 🎁**；其他已一致

### 매장（店内/堂食）
- `pos: 'noun'` · `emoji: '🏪'` · `tier: 'core'`
- `hook: '매장(賣場)＝汉字词「卖场」，中文里也有"卖场"！'`
- 现分布：haru-cafe emoji `🪑`（可保，独有咖啡座位视觉）；fried-chicken `🏪`
- **例外**：haru-cafe emoji 保 `🪑` 表示咖啡店座位场景性

### 테이크아웃（外带）
- `pos: 'expr'` · `emoji: '🥡'` · `tier: 'useful'`
- `hook: 'Take out 音译，不过韩国人日常更喜欢说 포장(打包)。'`
- 只在咖啡场景高频

---

## 预订/取货二件套

### 예약（预约/预订）
- `pos: 'noun'` · `emoji: '📅'` · `tier: 'core'`
- `hook: '예약(豫約)＝汉字词「预约」，跟中文完全同源。'`
- **cn 允许场景化**：餐饮场景=预订；医院/银行=预约
- 现分布：全部 `noun/core/📅` ✓
- 与 `예매`（预售/购票）区分：예약=预留座位/时间；예매=提前买票（电影/演唱会）

### 픽업（自取）
- `pos: 'noun'` · `emoji: '🛍️'` · `tier: 'useful'`
- `hook: 'pickup 音译，念快跟英文几乎一样：픽-업。'`
- 现分布：bakery emoji `🚶` → **改 🛍️**（更贴"取货"，🚶 语义偏"走"）

---

## 尺寸/照片/加热

### 사이즈（尺寸/尺码）
- `pos: 'noun'` · `emoji: '📏'` · `tier: 'core'`
- `hook: 'size 音译，四音节念快就是 사-이-즈。'`
- **cn 允许场景化**：服装=尺码；咖啡杯=尺寸
- 现分布：paws-mall/animal-market/haru-cafe 一致 ✓

### 사진（照片）
- `pos: 'noun'` · `emoji: '📸'` · `tier: 'core'`
- `hook: '사진(寫真)＝汉字词「写真」，日语同源。'`
- confuse 对 셀카（自拍）
- 现分布：culture-park/fansign-cafe 一致 ✓

### 데우다（加热）
- `pos: 'verb'` · `emoji: '🔥'` · `tier: 'core'`
- `hook: '데우다＝加热的动作。「데워 주세요」是最常听到的活用形。'`
- forms 推荐：`데워 주세요` / `데우지 마세요`
- 现分布：bakery/cu-mart 已一致 ✓

---

## 询问/表达

### 얼마（多少）
- 通常作为疑问句「얼마예요?」出现，不作为独立词条
- 若出现独立词条：`pos: 'noun'` · `tier: 'core'`

### 주세요（请给我）
- 不列为独立词条（谓语后缀，非实词）
- 但作为 pattern breakdown 中的 meaning 必须统一为 `请给我` 或 `请（帮我）`

### 이거（这个）
- `pos: 'noun'` · `emoji: '👆'` · `tier: 'core'`
- `hook: '이것(这)的口语缩写。「이것을」→「이걸」→「이거」，一步步简化。'`

### 맛있어요（好吃）
- `pos: 'expr'` · `emoji: '😋'` · `tier: 'core'`
- 是完整活用句（맛있다 敬语），不是 noun/adj

### 시럽（糖浆）
- 只在咖啡场景高频，不列全库归一
- 保持 haru-cafe 现有 `noun/core/🍯`

---

## 归一化执行清单

按优先级修（改动最小）：

1. **포장 emoji**：haru-cafe.ts:229 `🎒` → `🎁`
2. **현금 tier**：bus-terminal.ts:200 `useful` → `core`
3. **영수증 tier**：cu-mart.ts:178 `useful` → `core`
4. **픽업 emoji**：bakery.ts:161 `🚶` → `🛍️`
5. **카드 example**：bus-terminal.ts:192 `카드로 결제할게요` → `카드로 할게요`（可选，两个都对）

现存已一致的（不动）：
- 카드 pos/tier/emoji ✓
- 예약 pos/tier/emoji ✓
- 사이즈 pos/tier/emoji ✓
- 사진 pos/tier/emoji ✓
- 데우다 pos/tier/emoji ✓
- 매장 pos/tier ✓（haru-cafe emoji 有场景理由保留）
