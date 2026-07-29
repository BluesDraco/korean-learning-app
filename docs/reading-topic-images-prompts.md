# 阅读板块图片 · 生成提示词总表

阅读板块「동물 도시 도서관（动物城图书馆）」有**两套图**：

| 套别 | 用途 | 比例 | 数量 | 现状 |
|---|---|---|---|---|
| **A. 主题横幅** | 主打大卡 / 纪实文章卡顶部横幅 | **16:9**（1200×675） | 7 张 | 全缺，走 CSS 纯色兜底 |
| **B. 故事竖封面** | 故事集 + 禁书 每本书的书封 | **3:4**（900×1200 建议） | 35 张 | CSS 已支持 `<img>`，但代码未接入 → 全纯色 |

> ⚠️ B 套竖封面：`.cover` 样式已支持背景图（library.css:708），但 `page.tsx` 目前只渲染 emoji+标题。要显示竖图需先改代码接入 `<img>`。命名建议 `public/images/reading-covers/{id}.webp`。

**通用风格基调**：暖奶油色调、柔和光线、扁平插画或柔焦绘本风，无文字、无 logo。动物城世界观（松鼠 / 熊 / 狐狸 / 兔子等拟人动物居民）。喂 Midjourney 结尾加 `--ar 16:9` 或 `--ar 3:4`。

---

# A. 主题横幅（16:9，7 张）

放 `public/images/reading-topics/`，后台 `/admin/reading-images` 可上传（이야기那张后台管不到，需手动放 `topic-story.webp`）。

| # | 主题 | 文件名 | 提示词（中） | Prompt (EN) |
|---|---|---|---|---|
| 1 | 이야기 故事 | `topic-story.webp` | 翻开的书里飘出温暖光点和星星，奶油色背景，童话绘本风，治愈 | open storybook with warm glowing dots and stars floating out, cream background, cozy fairytale illustration |
| 2 | 文化 | `topic-culture.webp` | 韩国传统元素拼贴，韩屋屋檐、韩服纹样、窗棂，暖色扁平插画，雅致 | Korean traditional culture collage, hanok roof, hanbok patterns, warm-tone flat illustration, elegant |
| 3 | 生活 | `topic-life.webp` | 韩国日常街景，便利店、街边小店、路灯，傍晚暖光，扁平插画 | Korean everyday street, convenience store, small shops, street lamp, warm evening light, flat illustration |
| 4 | 旅行 | `topic-travel.webp` | 韩国旅行风景，城市天际线与山、行李箱相机，清新蓝天，扁平插画 | Korean travel landscape, city skyline and mountains, suitcase and camera, fresh blue sky, flat illustration |
| 5 | 社会 | `topic-society.webp` | 现代韩国城市街景，人群、地铁、高楼剪影，暖灰色调，都市感 | modern Korean city, crowd, subway, building silhouettes, warm-gray tone, urban feel |
| 6 | KPOP | `topic-kpop.webp` | 舞台灯光麦克风、耳机、飘动音符，粉紫霓虹渐变，活力时尚 | stage lights, microphone, headphones, floating music notes, pink-purple neon gradient, energetic |
| 7 | 韩剧 | `topic-drama.webp` | 咖啡馆窗边两个身影、樱花或落叶，柔焦电影感，暖色浪漫 | two figures by a cafe window, cherry blossoms or falling leaves, soft cinematic focus, warm romantic |

---

# B. 故事竖封面（3:4，30 张）

动物城故事集，绘本 / 治愈 / 轻悬疑风。文件名 `{id}.webp`。

| # | 标题 | 文件名 | 提示词（简，无文字，绘本风，3:4） |
|---|---|---|---|
| 1 | 消失的鲷鱼烧车 사라진 붕어빵 트럭 | `story-bungeoppang-truck.webp` | 雪夜空荡街角，一辆消失的鲷鱼烧小车留下热气，暖黄路灯，温情绘本风 |
| 2 | 倒着走路的客人 거꾸로 걷는 손님 | `story-backward-walker.webp` | 一位背对倒着走路的神秘客人剪影，黄昏街道，轻悬疑绘本风 |
| 3 | 只当一天大人 하루만 어른 | `story-grownup-for-a-day.webp` | 小孩穿着过大的西装照镜子映出大人，温馨奇幻绘本风 |
| 4 | 走丢的声音 잃어버린 목소리 | `story-lost-voice.webp` | 一个张嘴却无声的小动物，飘走的音符化作光，梦幻绘本风 |
| 5 | 午夜12点的便利店 밤 12시 편의점 | `story-midnight-store.webp` | 深夜发着暖光的便利店，窗外漆黑，孤独治愈绘本风 |
| 6 | 一模一样的一天 똑같은 하루 | `story-same-day.webp` | 重复循环的日历与时钟环绕，同一场景层叠，轻超现实绘本风 |
| 7 | 秘密纸条的主人 비밀 쪽지의 주인 | `story-secret-note.webp` | 一张折起的手写纸条落在长椅上，微风，悬念绘本风 |
| 8 | 被困电梯那天 엘리베이터에 갇힌 날 | `story-stuck-elevator.webp` | 电梯门半开困住的小动物，昏黄灯光，紧张又温馨绘本风 |
| 9 | 会说话的自动贩卖机 말하는 자판기 | `story-talking-vending.webp` | 一台发光会眨眼的自动贩卖机对着小动物说话，俏皮奇幻绘本风 |
| 10 | 谁拿了我的伞？ 누가 내 우산을 가져갔지? | `story-whose-umbrella.webp` | 雨天伞架上少了一把伞，湿漉漉的门口，轻悬疑绘本风 |
| 11 | 电梯里的镜子 엘리베이터 안의 거울 | `story-elevator-mirror.webp` | 电梯镜中映出不一样的倒影，冷调神秘，轻惊悚绘本风 |
| 12 | 最后一位客人 마지막 손님 | `story-last-customer.webp` | 打烊的小店里最后一位戴耳机的客人背影，暖光孤寂绘本风 |
| 13 | 深夜食堂的推理 심야 식당의 추리 | `story-late-night-diner.webp` | 深夜小食堂热腾腾的拉面，一位思考的侦探小动物，温暖推理绘本风 |
| 14 | 给十年后的我 10년 후의 나에게 | `story-letter-to-future.webp` | 一封信封与飘向星空的信纸，温暖怀旧，治愈绘本风 |
| 15 | 失物招领处 분실물 센터 | `story-lost-and-found.webp` | 堆满遗失物品（手套、钥匙、玩偶）的招领窗口，暖调怀旧绘本风 |
| 16 | 迷路的小狗 길 잃은 강아지 | `story-lost-puppy.webp` | 雨中路口一只迷路的小狗仰望，柔软温情绘本风 |
| 17 | 一个小谎 거짓말 하나 | `story-one-little-lie.webp` | 小动物背后藏着东西红着脸，一朵谎言小云，俏皮温馨绘本风 |
| 18 | 隔壁的钢琴声 옆집 피아노 소리 | `story-piano-next-door.webp` | 夜晚窗户透出琴键光与飘出的音符，温柔治愈绘本风 |
| 19 | 雨天的常客 비 오는 날의 단골손님 | `story-rainy-day-regular.webp` | 雨天咖啡馆窗边固定座位的熟客剪影，暖光柔和绘本风 |
| 20 | 快递拿错了 택배가 바뀌었어요 | `story-wrong-parcel.webp` | 门口两个贴错标签的快递纸箱，俏皮日常绘本风 |
| 21 | 喜欢什么颜色 무슨 색을 좋아해요? | `story-a1-favorite-color.webp` | 一只小动物身边散落彩色气球与颜料，明亮童趣绘本风 |
| 22 | 请给我一个苹果 사과 하나 주세요 | `story-a1-give-me-apple.webp` | 水果摊上递出一个红苹果的小手，明亮可爱绘本风 |
| 23 | 肚子饿了 배고파요 | `story-a1-im-hungry.webp` | 一只摸着肚子看向热饭碗的小动物，温馨童趣绘本风 |
| 24 | 下雨了 비가 와요 | `story-a1-its-raining.webp` | 小动物撑伞踩水坑，蓝灰雨天暖黄雨衣，可爱绘本风 |
| 25 | 喜欢，不喜欢 좋아요, 싫어요 | `story-a1-like-dislike.webp` | 一只小动物一边爱心一边皱眉，对比表情，俏皮童趣绘本风 |
| 26 | 早上问好 아침 인사 | `story-a1-morning-greeting.webp` | 清晨阳光窗前伸懒腰打招呼的小动物，温暖明亮绘本风 |
| 27 | 我的一天 나의 하루 | `story-a1-my-day.webp` | 从日出到日落的一天小图拼贴，温暖生活感绘本风 |
| 28 | 我的家人 우리 가족 | `story-a1-my-family.webp` | 一家拟人小动物依偎合影，温馨家庭绘本风 |
| 29 | 一二三 하나, 둘, 셋 | `story-a1-one-two-three.webp` | 数字 1 2 3 与小动物们排队数数，明亮童趣绘本风 |
| 30 | 在哪里呢？ 어디에 있어요? | `story-a1-where-is-it.webp` | 一只小动物拿放大镜四处找东西，俏皮寻找绘本风 |

---

# C. 禁书竖封面（3:4，5 张）

动物城「禁书」系列 — 暗黑悬疑，冷色调、烛光、阴影，与故事集区隔（对应 `.cover-forbidden` 深色书封）。

| # | 标题 | 文件名 | 提示词（暗黑悬疑，无文字，3:4） |
|---|---|---|---|
| 1 | 消失的邻居们 사라진 이웃들 | `story-forbidden-vanished-neighbors.webp` | 一排亮着灯的窗户中几扇突然全黑，冷调夜色，悬疑暗黑绘本风 |
| 2 | 地下室的声音 지하실의 소리 | `story-forbidden-basement-sound.webp` | 昏暗地下室半开的门缝透出微光与阴影，烛光惊悚绘本风 |
| 3 | 一张旧地图 오래된 지도 | `story-forbidden-old-map.webp` | 烛光下泛黄的旧地图标着神秘红圈，古旧悬疑绘本风 |
| 4 | 市长的秘密 시장의 비밀 | `story-forbidden-mayor-secret.webp` | 阴影中一把钥匙与紧锁的门，冷调权谋悬疑绘本风 |
| 5 | 动物城之夜 동물 도시의 밤 | `story-forbidden-city-night.webp` | 月下动物城剪影，一盏孤独烛光的窗，暗黑氛围绘本风 |

---

## 命名与接入备注
- **A 横幅**：文件名系统写死，后台上传即用（이야기除外，手动放）。
- **B/C 竖封面**：建议 `public/images/reading-covers/{id}.webp`，尺寸 3:4（900×1200）。目前 `page.tsx` 未接入 `<img>`，需要我改代码才能显示——告诉我一声即可一并做。
- 所有提示词偏「封面介绍级」，可直接喂 Midjourney / Flux / 即梦 / Nano Banana。
