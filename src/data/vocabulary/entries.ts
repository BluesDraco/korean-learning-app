import type { WordEntry } from '@/types';

export const vocabularyEntries: WordEntry[] = [

  // ═══════════════════════════════════════════════════════════════
  // 1. TIME & DATE 时间日期
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'time-01', korean: '시간', romanization: 'sigan', baseForm: '시간', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '⏰',
    meanings: [{ chinese: '时间', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '시간이 없어요.', chinese: '没有时间。', scene: '日常' },
      { korean: '시간이 얼마나 걸려요?', chinese: '需要多长时间？', scene: '出行' },
    ],
    tags: ['日常', '出行'], emotionTags: [], relatedWords: ['time-02', 'time-03'],
  },
  {
    id: 'time-02', korean: '오늘', romanization: 'oneul', baseForm: '오늘', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '📅',
    meanings: [{ chinese: '今天', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '오늘 날씨가 좋아요.', chinese: '今天天气很好。', scene: '日常' },
      { korean: '오늘 뭐 해요?', chinese: '今天做什么？', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['time-03', 'time-04'],
  },
  {
    id: 'time-03', korean: '내일', romanization: 'naeil', baseForm: '내일', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '🔜',
    meanings: [{ chinese: '明天', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '내일 만나요.', chinese: '明天见。', scene: '日常' },
      { korean: '내일 비가 올까요?', chinese: '明天会下雨吗？', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['time-02', 'time-04'],
  },
  {
    id: 'time-04', korean: '어제', romanization: 'eoje', baseForm: '어제', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '⬅️',
    meanings: [{ chinese: '昨天', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '어제 뭐 했어요?', chinese: '昨天做了什么？', scene: '日常' },
      { korean: '어제 영화를 봤어요.', chinese: '昨天看了电影。', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['time-02', 'time-03'],
  },
  {
    id: 'time-05', korean: '지금', romanization: 'jigeum', baseForm: '지금', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '🕛',
    meanings: [{ chinese: '现在', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '지금 몇 시예요?', chinese: '现在几点了？', scene: '日常' },
      { korean: '지금 가고 있어요.', chinese: '现在正在去。', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['time-01'],
  },
  {
    id: 'time-06', korean: '아침', romanization: 'achim', baseForm: '아침', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '🌅',
    meanings: [{ chinese: '早上；早餐', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '아침에 일찍 일어나요.', chinese: '早上早起。', scene: '日常' },
      { korean: '아침 먹었어요?', chinese: '吃早餐了吗？', scene: '日常' },
    ],
    tags: ['日常', '时间'], emotionTags: [], relatedWords: ['time-07', 'time-08'],
  },
  {
    id: 'time-07', korean: '저녁', romanization: 'jeonyeok', baseForm: '저녁', partOfSpeech: '名词',
    level: '1', frequency: 2, emoji: '🌆',
    meanings: [{ chinese: '傍晚；晚餐', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '저녁에 뭐 먹을까요?', chinese: '晚上吃什么？', scene: '日常' },
      { korean: '저녁 7시에 만나요.', chinese: '晚上7点见。', scene: '日常' },
    ],
    tags: ['日常', '时间'], emotionTags: [], relatedWords: ['time-06', 'time-08'],
  },
  {
    id: 'time-08', korean: '밤', romanization: 'bam', baseForm: '밤', partOfSpeech: '名词',
    level: '1', frequency: 2, emoji: '🌙',
    meanings: [{ chinese: '夜晚', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '밤에 별이 예뻐요.', chinese: '夜晚星星很美。', scene: '日常' },
      { korean: '늦은 밤까지 공부했어요.', chinese: '学习到深夜。', scene: '学习' },
    ],
    tags: ['日常', '时间'], emotionTags: [], relatedWords: ['time-06', 'time-07'],
  },
  {
    id: 'time-09', korean: '주말', romanization: 'jumal', baseForm: '주말', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '🎉',
    meanings: [{ chinese: '周末', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '주말에 뭐 할 거예요?', chinese: '周末打算做什么？', scene: '日常' },
      { korean: '주말 잘 보내세요!', chinese: '周末愉快！', scene: '日常' },
    ],
    tags: ['日常', '时间'], emotionTags: ['开心'], relatedWords: ['time-10'],
  },
  {
    id: 'time-10', korean: '평일', romanization: 'pyeongil', baseForm: '평일', partOfSpeech: '名词',
    level: '2', frequency: 2, emoji: '💼',
    meanings: [{ chinese: '平日/工作日', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '평일에는 바빠요.', chinese: '工作日很忙。', scene: '职场' },
      { korean: '평일 낮에는 한가해요.', chinese: '工作日白天很闲。', scene: '职场' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: ['time-09'],
  },
  {
    id: 'time-11', korean: '매일', romanization: 'maeil', baseForm: '매일', partOfSpeech: '副词',
    level: '1', frequency: 3, emoji: '🔄',
    meanings: [{ chinese: '每天', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '매일 운동해요.', chinese: '每天运动。', scene: '日常' },
      { korean: '매일 한국어를 공부해요.', chinese: '每天学韩语。', scene: '学习' },
    ],
    tags: ['日常', '学习'], emotionTags: [], relatedWords: ['time-01'],
  },
  {
    id: 'time-12', korean: '봄', romanization: 'bom', baseForm: '봄', partOfSpeech: '名词',
    level: '2', frequency: 2, emoji: '🌸',
    meanings: [{ chinese: '春天', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '봄에 꽃이 피어요.', chinese: '春天花开。', scene: '日常' },
      { korean: '서울의 봄은 정말 예뻐요.', chinese: '首尔的春天真的很美。', scene: '旅行' },
    ],
    tags: ['日常', '旅行'], emotionTags: ['开心'], relatedWords: ['time-13', 'time-14', 'time-15'],
  },
  {
    id: 'time-13', korean: '여름', romanization: 'yeoreum', baseForm: '여름', partOfSpeech: '名词',
    level: '2', frequency: 2, emoji: '🏖️',
    meanings: [{ chinese: '夏天', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '여름에는 더워요.', chinese: '夏天很热。', scene: '日常' },
      { korean: '여름 휴가 어디로 갈까요?', chinese: '暑假去哪里呢？', scene: '旅行' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: ['time-12', 'time-14', 'time-15'],
  },
  {
    id: 'time-14', korean: '가을', romanization: 'gaeul', baseForm: '가을', partOfSpeech: '名词',
    level: '2', frequency: 2, emoji: '🍂',
    meanings: [{ chinese: '秋天', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '가을 하늘이 예뻐요.', chinese: '秋天的天空很美。', scene: '日常' },
      { korean: '가을에는 단풍을 보러 가요.', chinese: '秋天去看枫叶。', scene: '旅行' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: ['time-12', 'time-13', 'time-15'],
  },
  {
    id: 'time-15', korean: '겨울', romanization: 'gyeoul', baseForm: '겨울', partOfSpeech: '名词',
    level: '2', frequency: 2, emoji: '❄️',
    meanings: [{ chinese: '冬天', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '겨울에는 눈이 와요.', chinese: '冬天下雪。', scene: '日常' },
      { korean: '한국 겨울은 정말 추워요.', chinese: '韩国冬天真的很冷。', scene: '旅行' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: ['time-12', 'time-13', 'time-14'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. GREETINGS & COMMON PHRASES 问候与常用语
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'greet-01', korean: '안녕하세요', romanization: 'annyeonghaseyo', baseForm: '안녕하다', partOfSpeech: '常用语',
    level: '1', frequency: 3, emoji: '👋',
    meanings: [{ chinese: '你好', nuance: '敬语', register: '通用' }],
    examples: [
      { korean: '안녕하세요, 처음 뵙겠습니다.', chinese: '你好，初次见面。', scene: '社交' },
      { korean: '안녕하세요, 잘 지내셨어요?', chinese: '你好，过得好吗？', scene: '社交' },
    ],
    tags: ['社交', '打招呼'], emotionTags: [], relatedWords: ['greet-02', 'greet-03'],
  },
  {
    id: 'greet-02', korean: '감사합니다', romanization: 'gamsahamnida', baseForm: '감사하다', partOfSpeech: '常用语',
    level: '1', frequency: 3, emoji: '🙏',
    meanings: [{ chinese: '谢谢', nuance: '正式敬语', register: '通用' }],
    examples: [
      { korean: '도와주셔서 감사합니다.', chinese: '感谢您的帮助。', scene: '社交' },
      { korean: '선물 감사합니다.', chinese: '谢谢礼物。', scene: '社交' },
    ],
    tags: ['社交', '感谢道歉'], emotionTags: ['感谢'], relatedWords: ['greet-03', 'greet-04'],
  },
  {
    id: 'greet-03', korean: '죄송합니다', romanization: 'joesonghamnida', baseForm: '죄송하다', partOfSpeech: '常用语',
    level: '1', frequency: 3, emoji: '😔',
    meanings: [{ chinese: '对不起', nuance: '正式敬语', register: '通用' }],
    examples: [
      { korean: '늦어서 죄송합니다.', chinese: '迟到了对不起。', scene: '社交' },
      { korean: '실례했습니다, 죄송합니다.', chinese: '失礼了，对不起。', scene: '社交' },
    ],
    tags: ['社交', '感谢道歉'], emotionTags: ['道歉'], relatedWords: ['greet-02', 'greet-04'],
  },
  {
    id: 'greet-04', korean: '괜찮아요', romanization: 'gwaenchanayo', baseForm: '괜찮다', partOfSpeech: '常用语',
    level: '1', frequency: 3, emoji: '😊',
    meanings: [{ chinese: '没关系/还可以', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '괜찮아요, 걱정하지 마세요.', chinese: '没关系，别担心。', scene: '社交' },
      { korean: '이 정도면 괜찮아요?', chinese: '这样还可以吗？', scene: '购物' },
    ],
    tags: ['社交', '感谢道歉', '购物'], emotionTags: [], relatedWords: ['greet-03'],
  },
  {
    id: 'greet-05', korean: '안녕히 가세요', romanization: 'annyeonghi gaseyo', baseForm: '안녕하다', partOfSpeech: '常用语',
    level: '1', frequency: 2, emoji: '👋',
    meanings: [{ chinese: '再见（对离开的人）', nuance: '敬语', register: '通用' }],
    examples: [
      { korean: '안녕히 가세요, 내일 봐요.', chinese: '再见，明天见。', scene: '社交' },
    ],
    tags: ['社交', '打招呼'], emotionTags: [], relatedWords: ['greet-06'],
  },
  {
    id: 'greet-06', korean: '안녕히 계세요', romanization: 'annyeonghi gyeseyo', baseForm: '안녕하다', partOfSpeech: '常用语',
    level: '1', frequency: 2, emoji: '👋',
    meanings: [{ chinese: '再见（对留下的人）', nuance: '敬语', register: '通用' }],
    examples: [
      { korean: '안녕히 계세요, 다음에 또 올게요.', chinese: '再见，下次再来。', scene: '社交' },
    ],
    tags: ['社交', '打招呼'], emotionTags: [], relatedWords: ['greet-05'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. FOOD & DRINK 饮食
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'food-01', korean: '밥', romanization: 'bap', baseForm: '밥', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '🍚',
    meanings: [
      { chinese: '饭；餐', nuance: '中性，韩语中最核心的饮食词', register: '通用' },
    ],
    examples: [
      { korean: '밥 먹었어요?', chinese: '吃饭了吗？', scene: '日常' },
      { korean: '여기 밥이 정말 맛있어요.', chinese: '这里的饭真好吃。', scene: '餐厅' },
    ],
    tags: ['餐厅', '日常'], emotionTags: [], relatedWords: ['food-02', 'food-04', 'food-07'],
  },
  {
    id: 'food-02', korean: '물', romanization: 'mul', baseForm: '물', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '💧',
    meanings: [{ chinese: '水', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '물 한 잔 주세요.', chinese: '请给我一杯水。', scene: '餐厅' },
      { korean: '물 좀 마실게요.', chinese: '我喝点水。', scene: '日常' },
    ],
    tags: ['餐厅', '日常'], emotionTags: [], relatedWords: ['food-03', 'food-09'],
  },
  {
    id: 'food-03', korean: '커피', romanization: 'keopi', baseForm: '커피', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '☕',
    meanings: [{ chinese: '咖啡', nuance: '外来词（英语）', register: '通用' }],
    examples: [
      { korean: '커피 한 잔 주세요.', chinese: '请给我一杯咖啡。', scene: '咖啡厅' },
      { korean: '아침에 커피를 꼭 마셔요.', chinese: '早上一定喝咖啡。', scene: '日常' },
    ],
    tags: ['咖啡厅', '日常'], emotionTags: [], relatedWords: ['food-09', 'food-10'],
  },
  {
    id: 'food-04', korean: '김치', romanization: 'gimchi', baseForm: '김치', partOfSpeech: '名词',
    level: '2', frequency: 3, emoji: '🥬',
    meanings: [{ chinese: '泡菜/辛奇', nuance: '韩国文化标志词', register: '通用' }],
    examples: [
      { korean: '한국 사람은 매일 김치를 먹어요.', chinese: '韩国人每天吃泡菜。', scene: '日常' },
      { korean: '김치찌개도 주세요.', chinese: '也请给我泡菜汤。', scene: '餐厅' },
    ],
    tags: ['餐厅', '韩流'], emotionTags: [], relatedWords: ['food-01', 'food-05'],
  },
  {
    id: 'food-05', korean: '맛있다', romanization: 'masitda', baseForm: '맛있다', partOfSpeech: '形容词',
    level: '1', frequency: 3, emoji: '😋',
    meanings: [{ chinese: '好吃', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '이거 정말 맛있어요!', chinese: '这个真的很好吃！', scene: '餐厅' },
      { korean: '엄마가 만든 음식이 제일 맛있어요.', chinese: '妈妈做的饭最好吃。', scene: '日常' },
    ],
    tags: ['餐厅', '咖啡厅'], emotionTags: ['开心'], relatedWords: ['food-06', 'food-01'],
  },
  {
    id: 'food-06', korean: '맛없다', romanization: 'madeopda', baseForm: '맛없다', partOfSpeech: '形容词',
    level: '2', frequency: 2, emoji: '😖',
    meanings: [{ chinese: '不好吃', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '이거 너무 맛없어요.', chinese: '这个太难吃了。', scene: '餐厅' },
    ],
    tags: ['餐厅'], emotionTags: ['不满'], relatedWords: ['food-05'],
  },
  {
    id: 'food-07', korean: '배고프다', romanization: 'baegopeuda', baseForm: '배고프다', partOfSpeech: '形容词',
    level: '2', frequency: 3, emoji: '😫',
    meanings: [{ chinese: '肚子饿', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '배고파요. 밥 먹으러 가요.', chinese: '肚子饿了，去吃饭吧。', scene: '日常' },
      { korean: '배고픈데 뭐 먹을까요?', chinese: '好饿，吃什么？', scene: '日常' },
    ],
    tags: ['日常', '餐厅'], emotionTags: [], relatedWords: ['food-08', 'food-01'],
  },
  {
    id: 'food-08', korean: '배부르다', romanization: 'baebureuda', baseForm: '배부르다', partOfSpeech: '形容词',
    level: '2', frequency: 2, emoji: '😊',
    meanings: [{ chinese: '饱了', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '배불러요, 더 못 먹겠어요.', chinese: '饱了，吃不下了。', scene: '餐厅' },
      { korean: '배부르게 먹었어요.', chinese: '吃饱了。', scene: '日常' },
    ],
    tags: ['餐厅', '日常'], emotionTags: [], relatedWords: ['food-07'],
  },
  {
    id: 'food-09', korean: '차', romanization: 'cha', baseForm: '차', partOfSpeech: '名词',
    level: '2', frequency: 2, emoji: '🍵',
    meanings: [{ chinese: '茶', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '차 한 잔 드릴까요?', chinese: '来一杯茶吗？', scene: '咖啡厅' },
      { korean: '녹차 좋아하세요?', chinese: '喜欢绿茶吗？', scene: '咖啡厅' },
    ],
    tags: ['咖啡厅', '日常'], emotionTags: [], relatedWords: ['food-03', 'food-02'],
  },
  {
    id: 'food-10', korean: '주스', romanization: 'juseu', baseForm: '주스', partOfSpeech: '名词',
    level: '2', frequency: 2, emoji: '🧃',
    meanings: [{ chinese: '果汁', nuance: '外来词（英语）', register: '通用' }],
    examples: [
      { korean: '오렌지 주스 한 잔 주세요.', chinese: '请给我一杯橙汁。', scene: '咖啡厅' },
    ],
    tags: ['咖啡厅'], emotionTags: [], relatedWords: ['food-03', 'food-02'],
  },
  {
    id: 'food-11', korean: '주문하다', romanization: 'jumunhada', baseForm: '주문하다', partOfSpeech: '动词',
    level: '2', frequency: 2, emoji: '📝',
    meanings: [{ chinese: '点单/订购', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '주문하시겠어요?', chinese: '请问要点单吗？', scene: '咖啡厅' },
      { korean: '인터넷으로 주문했어요.', chinese: '在网上订购了。', scene: '购物' },
    ],
    tags: ['咖啡厅', '餐厅', '购物'], emotionTags: [], relatedWords: ['food-12'],
  },
  {
    id: 'food-12', korean: '계산하다', romanization: 'gyesanhada', baseForm: '계산하다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '💳',
    meanings: [{ chinese: '结账', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '계산해 주세요.', chinese: '请结账。', scene: '餐厅' },
      { korean: '카드로 계산할게요.', chinese: '用卡结账。', scene: '购物' },
    ],
    tags: ['餐厅', '咖啡厅', '购物'], emotionTags: [], relatedWords: ['food-11'],
  },
  {
    id: 'food-13', korean: '메뉴', romanization: 'menyu', baseForm: '메뉴', partOfSpeech: '名词',
    level: '2', frequency: 2, emoji: '📋',
    meanings: [{ chinese: '菜单', nuance: '外来词（英语）', register: '通用' }],
    examples: [
      { korean: '메뉴 좀 보여 주세요.', chinese: '请给我看看菜单。', scene: '餐厅' },
      { korean: '오늘의 메뉴는 뭐예요?', chinese: '今天的菜单是什么？', scene: '餐厅' },
    ],
    tags: ['餐厅', '咖啡厅'], emotionTags: [], relatedWords: ['food-11'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. SHOPPING 购物
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'shop-01', korean: '얼마', romanization: 'eolma', baseForm: '얼마', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '💰',
    meanings: [{ chinese: '多少钱', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '이거 얼마예요?', chinese: '这个多少钱？', scene: '购物' },
      { korean: '얼마나 기다려야 해요?', chinese: '要等多久？', scene: '日常' },
    ],
    tags: ['购物', '日常'], emotionTags: [], relatedWords: ['shop-02', 'shop-04'],
  },
  {
    id: 'shop-02', korean: '비싸다', romanization: 'bissada', baseForm: '비싸다', partOfSpeech: '形容词',
    level: '2', frequency: 3, emoji: '💸',
    meanings: [{ chinese: '贵', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '너무 비싸요!', chinese: '太贵了！', scene: '购物' },
      { korean: '서울은 물가가 비싸요.', chinese: '首尔物价贵。', scene: '日常' },
    ],
    tags: ['购物', '日常'], emotionTags: ['不满'], relatedWords: ['shop-03', 'shop-01'],
  },
  {
    id: 'shop-03', korean: '싸다', romanization: 'ssada', baseForm: '싸다', partOfSpeech: '形容词',
    level: '2', frequency: 2, emoji: '🤑',
    meanings: [{ chinese: '便宜', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '여기는 정말 싸네요!', chinese: '这里真便宜啊！', scene: '购物' },
      { korean: '싼 걸로 주세요.', chinese: '给我便宜的吧。', scene: '购物' },
    ],
    tags: ['购物', '免税店'], emotionTags: ['开心'], relatedWords: ['shop-02'],
  },
  {
    id: 'shop-04', korean: '깎다', romanization: 'kkakda', baseForm: '깎다', partOfSpeech: '动词',
    level: '3', frequency: 2, emoji: '✂️',
    meanings: [
      { chinese: '砍价/削', nuance: '口语，韩国市场常用', register: '通用' },
    ],
    examples: [
      { korean: '좀 깎아 주세요.', chinese: '便宜一点吧。', scene: '购物' },
      { korean: '만원 깎아 드릴게요.', chinese: '给您便宜一万韩元。', scene: '购物' },
    ],
    tags: ['购物', '市场'], emotionTags: [], relatedWords: ['shop-02', 'shop-03'],
  },
  {
    id: 'shop-05', korean: '사이즈', romanization: 'saijeu', baseForm: '사이즈', partOfSpeech: '名词',
    level: '2', frequency: 2, emoji: '📏',
    meanings: [{ chinese: '尺寸/大小', nuance: '外来词（英语）', register: '通用' }],
    examples: [
      { korean: '다른 사이즈 있어요?', chinese: '有其他尺寸吗？', scene: '购物' },
      { korean: '이 사이즈가 딱 맞아요.', chinese: '这个尺寸正合适。', scene: '购物' },
    ],
    tags: ['购物', '免税店'], emotionTags: [], relatedWords: ['shop-06'],
  },
  {
    id: 'shop-06', korean: '입다', romanization: 'ipda', baseForm: '입다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '👕',
    meanings: [{ chinese: '穿（衣服）', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '한복을 입어 보고 싶어요.', chinese: '想试试穿韩服。', scene: '旅行' },
      { korean: '이 옷 입어 봐도 돼요?', chinese: '这件衣服可以试穿吗？', scene: '购物' },
    ],
    tags: ['购物', '旅行'], emotionTags: [], relatedWords: ['shop-05'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. TRANSPORTATION 交通出行
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'trans-01', korean: '지하철', romanization: 'jihacheol', baseForm: '지하철', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '🚇',
    meanings: [{ chinese: '地铁', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '지하철역이 어디예요?', chinese: '地铁站在哪里？', scene: '出行' },
      { korean: '지하철로 갈게요.', chinese: '坐地铁去。', scene: '出行' },
    ],
    tags: ['出行', '地铁'], emotionTags: [], relatedWords: ['trans-02', 'trans-03'],
  },
  {
    id: 'trans-02', korean: '버스', romanization: 'beoseu', baseForm: '버스', partOfSpeech: '名词',
    level: '2', frequency: 3, emoji: '🚌',
    meanings: [{ chinese: '公交车', nuance: '外来词（英语）', register: '通用' }],
    examples: [
      { korean: '버스 정류장이 어디예요?', chinese: '公交站在哪里？', scene: '出行' },
      { korean: '몇 번 버스를 타야 해요?', chinese: '要坐几路公交？', scene: '出行' },
    ],
    tags: ['出行', '地铁'], emotionTags: [], relatedWords: ['trans-01', 'trans-04'],
  },
  {
    id: 'trans-03', korean: '택시', romanization: 'taeksi', baseForm: '택시', partOfSpeech: '名词',
    level: '2', frequency: 2, emoji: '🚕',
    meanings: [{ chinese: '出租车', nuance: '外来词（英语）', register: '通用' }],
    examples: [
      { korean: '택시 타고 갈게요.', chinese: '坐出租车去。', scene: '出行' },
      { korean: '택시 불러 주세요.', chinese: '请帮我叫出租车。', scene: '出行' },
    ],
    tags: ['出行'], emotionTags: [], relatedWords: ['trans-01', 'trans-02'],
  },
  {
    id: 'trans-04', korean: '타다', romanization: 'tada', baseForm: '타다', partOfSpeech: '动词',
    level: '1', frequency: 3, emoji: '🚶',
    meanings: [{ chinese: '乘坐/搭乘', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '지하철을 타고 왔어요.', chinese: '坐地铁来的。', scene: '出行' },
      { korean: '2호선을 타야 해요.', chinese: '要坐2号线。', scene: '地铁' },
    ],
    tags: ['出行', '地铁'], emotionTags: [], relatedWords: ['trans-01', 'trans-02'],
  },
  {
    id: 'trans-05', korean: '내리다', romanization: 'naerida', baseForm: '내리다', partOfSpeech: '动词',
    level: '3', frequency: 2, emoji: '⬇️',
    meanings: [{ chinese: '下车/下来', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '다음 역에서 내려요.', chinese: '下一站下车。', scene: '地铁' },
      { korean: '여기서 내리세요.', chinese: '请在这里下车。', scene: '出行' },
    ],
    tags: ['出行', '地铁'], emotionTags: [], relatedWords: ['trans-04'],
  },
  {
    id: 'trans-06', korean: '길', romanization: 'gil', baseForm: '길', partOfSpeech: '名词',
    level: '2', frequency: 3, emoji: '🛣️',
    meanings: [{ chinese: '路/道路', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '길을 잃어버렸어요.', chinese: '迷路了。', scene: '出行' },
      { korean: '이 길로 쭉 가세요.', chinese: '请沿着这条路一直走。', scene: '出行' },
    ],
    tags: ['出行', '问路'], emotionTags: [], relatedWords: ['trans-07'],
  },
  {
    id: 'trans-07', korean: '오른쪽', romanization: 'oreunjjok', baseForm: '오른쪽', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '👉',
    meanings: [{ chinese: '右边', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '오른쪽으로 가세요.', chinese: '请向右走。', scene: '问路' },
      { korean: '오른쪽에 있어요.', chinese: '在右边。', scene: '出行' },
    ],
    tags: ['出行', '问路'], emotionTags: [], relatedWords: ['trans-08'],
  },
  {
    id: 'trans-08', korean: '왼쪽', romanization: 'oenjjok', baseForm: '왼쪽', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '👈',
    meanings: [{ chinese: '左边', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '왼쪽으로 도세요.', chinese: '请左转。', scene: '问路' },
      { korean: '왼쪽에 편의점이 있어요.', chinese: '左边有便利店。', scene: '出行' },
    ],
    tags: ['出行', '问路'], emotionTags: [], relatedWords: ['trans-07'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. EMOTIONS & FEELINGS 情感表达
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'emotion-01', korean: '좋다', romanization: 'jota', baseForm: '좋다', partOfSpeech: '形容词',
    level: '1', frequency: 3, emoji: '😊',
    meanings: [{ chinese: '好；喜欢', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '오늘 기분이 좋아요.', chinese: '今天心情很好。', scene: '日常' },
      { korean: '한국어가 좋아요.', chinese: '我喜欢韩语。', scene: '学习' },
    ],
    tags: ['日常', '表白情感'], emotionTags: ['开心'], relatedWords: ['emotion-02', 'emotion-03'],
  },
  {
    id: 'emotion-02', korean: '싫다', romanization: 'silta', baseForm: '싫다', partOfSpeech: '形容词',
    level: '2', frequency: 2, emoji: '😞',
    meanings: [{ chinese: '讨厌/不喜欢', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '비 오는 날이 싫어요.', chinese: '讨厌下雨天。', scene: '日常' },
      { korean: '혼자 있는 게 싫어요.', chinese: '不喜欢一个人待着。', scene: '日常' },
    ],
    tags: ['日常', '表白情感'], emotionTags: ['不满'], relatedWords: ['emotion-01'],
  },
  {
    id: 'emotion-03', korean: '행복하다', romanization: 'haengbokhada', baseForm: '행복하다', partOfSpeech: '形容词',
    level: '1', frequency: 3, emoji: '🥰',
    meanings: [{ chinese: '幸福', nuance: '正式/书面', register: '通用' }],
    examples: [
      { korean: '너랑 있으면 행복해요.', chinese: '跟你在一起很幸福。', scene: '表白情感' },
      { korean: '행복한 하루 보내세요.', chinese: '祝你有幸福的一天。', scene: '社交' },
    ],
    tags: ['表白情感', '社交'], emotionTags: ['开心'], relatedWords: ['emotion-01', 'emotion-04'],
  },
  {
    id: 'emotion-04', korean: '슬프다', romanization: 'seulpeuda', baseForm: '슬프다', partOfSpeech: '形容词',
    level: '2', frequency: 3, emoji: '😢',
    meanings: [{ chinese: '悲伤', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '이 노래가 너무 슬퍼요.', chinese: '这首歌太悲伤了。', scene: '日常' },
      { korean: '슬픈 영화를 봤어요.', chinese: '看了悲伤的电影。', scene: '日常' },
    ],
    tags: ['日常', '韩剧'], emotionTags: ['伤心'], relatedWords: ['emotion-05'],
  },
  {
    id: 'emotion-05', korean: '화나다', romanization: 'hwanada', baseForm: '화나다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '😤',
    meanings: [
      { chinese: '生气', nuance: '一般生气，最常用', register: '通用' },
    ],
    examples: [
      { korean: '정말 화나요!', chinese: '真的很生气！', scene: '日常' },
      { korean: '왜 화났어요?', chinese: '为什么生气了？', scene: '日常' },
    ],
    tags: ['日常', '表达不满'], emotionTags: ['生气'], relatedWords: ['emotion-06', 'emotion-07', 'emotion-08'],
  },
  {
    id: 'emotion-06', korean: '짜증나다', romanization: 'jjajeungnada', baseForm: '짜증나다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '😠',
    meanings: [
      { chinese: '烦躁/不耐烦', nuance: '口语，比화나다更日常', register: '口语' },
    ],
    examples: [
      { korean: '아, 짜증나!', chinese: '啊，烦死了！', scene: '日常' },
      { korean: '더워서 짜증나요.', chinese: '太热了好烦躁。', scene: '日常' },
    ],
    tags: ['日常', '表达不满', '韩剧'], emotionTags: ['生气'], relatedWords: ['emotion-05', 'emotion-07'],
  },
  {
    id: 'emotion-07', korean: '열받다', romanization: 'yeolbatda', baseForm: '열받다', partOfSpeech: '动词',
    level: '3', frequency: 2, emoji: '🤬',
    meanings: [
      { chinese: '火大/气炸了', nuance: '网络用语，年轻人常用', register: '口语/网络' },
    ],
    examples: [
      { korean: '진짜 열받아서 말이 안 나와.', chinese: '真的太火大了说不出话。', scene: '日常' },
      { korean: '열받을 때는 운동이 최고예요.', chinese: '火大的时候运动最好了。', scene: '日常' },
    ],
    tags: ['日常', '表达不满', '韩流'], emotionTags: ['生气'], relatedWords: ['emotion-05', 'emotion-06'],
  },
  {
    id: 'emotion-08', korean: '분하다', romanization: 'bunhada', baseForm: '분하다', partOfSpeech: '形容词',
    level: '4', frequency: 1, emoji: '😣',
    meanings: [
      { chinese: '委屈而愤怒', nuance: '带有不甘的情绪', register: '通用' },
    ],
    examples: [
      { korean: '열심히 했는데 안 돼서 분해요.', chinese: '努力了却不行，很委屈。', scene: '日常' },
      { korean: '분한 마음을 참을 수가 없어요.', chinese: '委屈的心情忍不了。', scene: '日常' },
    ],
    tags: ['日常', '表达不满'], emotionTags: ['生气', '伤心'], relatedWords: ['emotion-05'],
  },
  {
    id: 'emotion-09', korean: '부끄럽다', romanization: 'bukkeureopda', baseForm: '부끄럽다', partOfSpeech: '形容词',
    level: '3', frequency: 2, emoji: '😳',
    meanings: [{ chinese: '害羞/不好意思', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '칭찬 받아서 부끄러워요.', chinese: '被夸了不好意思。', scene: '社交' },
      { korean: '부끄러워하지 마세요.', chinese: '别害羞。', scene: '社交' },
    ],
    tags: ['社交', '表白情感'], emotionTags: ['害羞'], relatedWords: [],
  },
  {
    id: 'emotion-10', korean: '걱정하다', romanization: 'geokjeonghada', baseForm: '걱정하다', partOfSpeech: '动词',
    level: '4', frequency: 3, emoji: '😟',
    meanings: [{ chinese: '担心', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '걱정하지 마세요.', chinese: '别担心。', scene: '日常' },
      { korean: '시험 때문에 걱정돼요.', chinese: '因为考试而担心。', scene: '学习' },
    ],
    tags: ['日常', '学习', '社交'], emotionTags: ['担心'], relatedWords: ['emotion-11'],
  },
  {
    id: 'emotion-11', korean: '기쁘다', romanization: 'gippeuda', baseForm: '기쁘다', partOfSpeech: '形容词',
    level: '3', frequency: 2, emoji: '🥳',
    meanings: [{ chinese: '高兴/喜悦', nuance: '正式/书面', register: '通用' }],
    examples: [
      { korean: '만나서 정말 기뻐요.', chinese: '见到你真的很高兴。', scene: '社交' },
      { korean: '기쁜 소식이 있어요!', chinese: '有好消息！', scene: '日常' },
    ],
    tags: ['社交', '表白情感'], emotionTags: ['开心'], relatedWords: ['emotion-01'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. FAMILY & PEOPLE 家庭与人
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'family-01', korean: '엄마', romanization: 'eomma', baseForm: '엄마', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '👩',
    meanings: [{ chinese: '妈妈', nuance: '口语，最常用称呼', register: '口语' }],
    examples: [
      { korean: '엄마, 사랑해요.', chinese: '妈妈，我爱你。', scene: '日常' },
      { korean: '엄마가 요리한 거예요.', chinese: '是妈妈做的菜。', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['family-02', 'family-03'],
  },
  {
    id: 'family-02', korean: '아빠', romanization: 'appa', baseForm: '아빠', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '👨',
    meanings: [{ chinese: '爸爸', nuance: '口语，最常用称呼', register: '口语' }],
    examples: [
      { korean: '아빠는 회사에 가셨어요.', chinese: '爸爸去公司了。', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['family-01', 'family-03'],
  },
  {
    id: 'family-03', korean: '친구', romanization: 'chingu', baseForm: '친구', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '👫',
    meanings: [{ chinese: '朋友', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '제일 친한 친구예요.', chinese: '是最好的朋友。', scene: '社交' },
      { korean: '친구랑 같이 왔어요.', chinese: '和朋友一起来的。', scene: '日常' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['family-05'],
  },
  {
    id: 'family-04', korean: '가족', romanization: 'gajok', baseForm: '가족', partOfSpeech: '名词',
    level: '1', frequency: 3, emoji: '👨‍👩‍👧‍👦',
    meanings: [{ chinese: '家人/家庭', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '가족이 몇 명이에요?', chinese: '家里有几口人？', scene: '社交' },
      { korean: '가족과 함께 살아요.', chinese: '和家人一起住。', scene: '日常' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['family-01', 'family-02'],
  },
  {
    id: 'family-05', korean: '선배', romanization: 'seonbae', baseForm: '선배', partOfSpeech: '名词',
    level: '2', frequency: 3, emoji: '🧑‍🎓',
    meanings: [{ chinese: '前辈/学长/学姐', nuance: '韩国文化特色词', register: '通用' }],
    examples: [
      { korean: '선배님, 질문 있어요.', chinese: '前辈，我有问题。', scene: '学习' },
      { korean: '대학교 선배예요.', chinese: '是大学前辈。', scene: '社交' },
    ],
    tags: ['社交', '学习', '韩流'], emotionTags: [], relatedWords: ['family-06'],
  },
  {
    id: 'family-06', korean: '후배', romanization: 'hubae', baseForm: '후배', partOfSpeech: '名词',
    level: '2', frequency: 2, emoji: '🧑‍🎓',
    meanings: [{ chinese: '后辈/学弟/学妹', nuance: '韩国文化特色词', register: '通用' }],
    examples: [
      { korean: '후배가 열심히 하네요.', chinese: '后辈很努力呢。', scene: '学习' },
    ],
    tags: ['社交', '学习'], emotionTags: [], relatedWords: ['family-05'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. COMMON VERBS 常用动词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'verb-01', korean: '하다', romanization: 'hada', baseForm: '하다', partOfSpeech: '动词',
    level: '1', frequency: 3, emoji: '🔧',
    meanings: [{ chinese: '做', nuance: '最核心动词', register: '通用' }],
    examples: [
      { korean: '뭐 해요?', chinese: '在做什么？', scene: '日常' },
      { korean: '공부하고 있어요.', chinese: '在学习。', scene: '学习' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['verb-02', 'verb-03'],
  },
  {
    id: 'verb-02', korean: '가다', romanization: 'gada', baseForm: '가다', partOfSpeech: '动词',
    level: '1', frequency: 3, emoji: '🚶',
    meanings: [{ chinese: '去', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '학교에 가요.', chinese: '去学校。', scene: '日常' },
      { korean: '한국에 가고 싶어요.', chinese: '想去韩国。', scene: '旅行' },
    ],
    tags: ['日常', '出行', '旅行'], emotionTags: [], relatedWords: ['verb-03', 'trans-04'],
  },
  {
    id: 'verb-03', korean: '오다', romanization: 'oda', baseForm: '오다', partOfSpeech: '动词',
    level: '1', frequency: 3, emoji: '🚶‍♂️',
    meanings: [{ chinese: '来', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '여기로 오세요.', chinese: '请过来。', scene: '日常' },
      { korean: '비가 와요.', chinese: '下雨了。', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['verb-02'],
  },
  {
    id: 'verb-04', korean: '먹다', romanization: 'meokda', baseForm: '먹다', partOfSpeech: '动词',
    level: '1', frequency: 3, emoji: '🍽️',
    meanings: [{ chinese: '吃', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '뭐 먹을까요?', chinese: '吃什么？', scene: '日常' },
      { korean: '한국 음식을 먹어 봤어요?', chinese: '吃过韩国料理吗？', scene: '餐厅' },
    ],
    tags: ['日常', '餐厅'], emotionTags: [], relatedWords: ['verb-05', 'food-01'],
  },
  {
    id: 'verb-05', korean: '마시다', romanization: 'masida', baseForm: '마시다', partOfSpeech: '动词',
    level: '1', frequency: 3, emoji: '🥤',
    meanings: [{ chinese: '喝', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '커피 마실래요?', chinese: '喝咖啡吗？', scene: '咖啡厅' },
      { korean: '술을 잘 못 마셔요.', chinese: '不太能喝酒。', scene: '餐厅' },
    ],
    tags: ['日常', '咖啡厅', '餐厅'], emotionTags: [], relatedWords: ['verb-04', 'food-03'],
  },
  {
    id: 'verb-06', korean: '보다', romanization: 'boda', baseForm: '보다', partOfSpeech: '动词',
    level: '2', frequency: 3, emoji: '👀',
    meanings: [{ chinese: '看', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '영화 보러 갈래요?', chinese: '去看电影吗？', scene: '日常' },
      { korean: '이거 한번 보세요.', chinese: '请看一下这个。', scene: '购物' },
    ],
    tags: ['日常', '购物', '韩流'], emotionTags: [], relatedWords: ['verb-07'],
  },
  {
    id: 'verb-07', korean: '듣다', romanization: 'deutda', baseForm: '듣다', partOfSpeech: '动词',
    level: '2', frequency: 3, emoji: '👂',
    meanings: [{ chinese: '听', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '음악을 들으면서 공부해요.', chinese: '边听音乐边学习。', scene: '日常' },
      { korean: '잘 안 들려요.', chinese: '听不太清楚。', scene: '日常' },
    ],
    tags: ['日常', '韩流'], emotionTags: [], relatedWords: ['verb-06', 'verb-08'],
  },
  {
    id: 'verb-08', korean: '말하다', romanization: 'malhada', baseForm: '말하다', partOfSpeech: '动词',
    level: '2', frequency: 3, emoji: '🗣️',
    meanings: [{ chinese: '说/讲话', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '한국어로 말해 주세요.', chinese: '请用韩语说。', scene: '社交' },
      { korean: '천천히 말씀해 주세요.', chinese: '请说慢一点。', scene: '社交' },
    ],
    tags: ['日常', '社交', '学习'], emotionTags: [], relatedWords: ['verb-07', 'verb-09'],
  },
  {
    id: 'verb-09', korean: '알다', romanization: 'alda', baseForm: '알다', partOfSpeech: '动词',
    level: '2', frequency: 3, emoji: '💡',
    meanings: [{ chinese: '知道/认识', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '알겠습니다.', chinese: '我知道了/明白了。', scene: '日常' },
      { korean: '그 사람을 알아요?', chinese: '认识那个人吗？', scene: '社交' },
    ],
    tags: ['日常', '社交', '学习'], emotionTags: [], relatedWords: ['verb-10'],
  },
  {
    id: 'verb-10', korean: '모르다', romanization: 'moreuda', baseForm: '모르다', partOfSpeech: '动词',
    level: '2', frequency: 3, emoji: '🤷',
    meanings: [{ chinese: '不知道/不认识', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '모르겠어요.', chinese: '我不知道。', scene: '日常' },
      { korean: '한국어를 잘 몰라요.', chinese: '不太懂韩语。', scene: '社交' },
    ],
    tags: ['日常', '学习'], emotionTags: [], relatedWords: ['verb-09'],
  },
  {
    id: 'verb-11', korean: '사다', romanization: 'sada', baseForm: '사다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '🛒',
    meanings: [{ chinese: '买', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '이거 살게요.', chinese: '我买这个。', scene: '购物' },
      { korean: '선물을 샀어요.', chinese: '买了礼物。', scene: '购物' },
    ],
    tags: ['购物', '免税店'], emotionTags: [], relatedWords: ['verb-12', 'shop-01'],
  },
  {
    id: 'verb-12', korean: '팔다', romanization: 'palda', baseForm: '팔다', partOfSpeech: '动词',
    level: '3', frequency: 2, emoji: '🏪',
    meanings: [{ chinese: '卖', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '여기서 뭐 팔아요?', chinese: '这里卖什么？', scene: '购物' },
      { korean: '다 팔렸어요.', chinese: '都卖完了。', scene: '购物' },
    ],
    tags: ['购物'], emotionTags: [], relatedWords: ['verb-11'],
  },
  {
    id: 'verb-13', korean: '주다', romanization: 'juda', baseForm: '주다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '🤲',
    meanings: [{ chinese: '给', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '물 좀 주세요.', chinese: '请给我水。', scene: '日常' },
      { korean: '선물을 줬어요.', chinese: '给了礼物。', scene: '社交' },
    ],
    tags: ['日常', '社交', '购物'], emotionTags: [], relatedWords: ['verb-11'],
  },
  {
    id: 'verb-14', korean: '기다리다', romanization: 'gidarida', baseForm: '기다리다', partOfSpeech: '动词',
    level: '2', frequency: 3, emoji: '⏳',
    meanings: [{ chinese: '等待', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '잠시만 기다려 주세요.', chinese: '请稍等。', scene: '日常' },
      { korean: '오래 기다렸어요?', chinese: '等很久了吗？', scene: '社交' },
    ],
    tags: ['日常', '社交', '咖啡厅', '餐厅'], emotionTags: [], relatedWords: ['verb-01'],
  },
  {
    id: 'verb-15', korean: '공부하다', romanization: 'gongbuhada', baseForm: '공부하다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '📚',
    meanings: [{ chinese: '学习', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '한국어를 공부하고 있어요.', chinese: '在学韩语。', scene: '学习' },
      { korean: '열심히 공부하세요!', chinese: '请努力学习！', scene: '学习' },
    ],
    tags: ['学习', '日常'], emotionTags: [], relatedWords: ['verb-01'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. COMMON ADJECTIVES 常用形容词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'adj-01', korean: '크다', romanization: 'keuda', baseForm: '크다', partOfSpeech: '形容词',
    level: '1', frequency: 3, emoji: '📐',
    meanings: [{ chinese: '大', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '이거 너무 커요.', chinese: '这个太大了。', scene: '购物' },
      { korean: '꿈이 커요.', chinese: '梦想很大。', scene: '日常' },
    ],
    tags: ['日常', '购物'], emotionTags: [], relatedWords: ['adj-02'],
  },
  {
    id: 'adj-02', korean: '작다', romanization: 'jakda', baseForm: '작다', partOfSpeech: '形容词',
    level: '1', frequency: 3, emoji: '📏',
    meanings: [{ chinese: '小', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '방이 좀 작아요.', chinese: '房间有点小。', scene: '日常' },
      { korean: '더 작은 사이즈 있어요?', chinese: '有更小的尺寸吗？', scene: '购物' },
    ],
    tags: ['日常', '购物'], emotionTags: [], relatedWords: ['adj-01'],
  },
  {
    id: 'adj-03', korean: '많다', romanization: 'manta', baseForm: '많다', partOfSpeech: '形容词',
    level: '2', frequency: 3, emoji: '📊',
    meanings: [{ chinese: '多', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '사람이 많아요.', chinese: '人很多。', scene: '日常' },
      { korean: '돈이 많이 필요해요.', chinese: '需要很多钱。', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['adj-04'],
  },
  {
    id: 'adj-04', korean: '적다', romanization: 'jeokda', baseForm: '적다', partOfSpeech: '形容词',
    level: '2', frequency: 2, emoji: '📉',
    meanings: [{ chinese: '少', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '시간이 적게 남았어요.', chinese: '时间剩得很少。', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['adj-03'],
  },
  {
    id: 'adj-05', korean: '예쁘다', romanization: 'yeppeuda', baseForm: '예쁘다', partOfSpeech: '形容词',
    level: '1', frequency: 3, emoji: '✨',
    meanings: [{ chinese: '漂亮', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '오늘 정말 예뻐요!', chinese: '今天真漂亮！', scene: '社交' },
      { korean: '예쁜 카페에 가고 싶어요.', chinese: '想去漂亮的咖啡厅。', scene: '咖啡厅' },
    ],
    tags: ['日常', '社交', '咖啡厅', '表白情感'], emotionTags: ['开心'], relatedWords: ['adj-06', 'shop-05'],
  },
  {
    id: 'adj-06', korean: '멋있다', romanization: 'meositda', baseForm: '멋있다', partOfSpeech: '形容词',
    level: '2', frequency: 3, emoji: '😎',
    meanings: [{ chinese: '帅/酷/棒', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '오빠 정말 멋있어요!', chinese: '欧巴真的很帅！', scene: '追星' },
      { korean: '멋있는 차네요.', chinese: '好酷的车啊。', scene: '日常' },
    ],
    tags: ['日常', '追星', '表白情感', '韩流'], emotionTags: ['开心'], relatedWords: ['adj-05'],
  },
  {
    id: 'adj-07', korean: '어렵다', romanization: 'eoryeopda', baseForm: '어렵다', partOfSpeech: '形容词',
    level: '3', frequency: 3, emoji: '🤔',
    meanings: [{ chinese: '难', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '한국어가 어려워요.', chinese: '韩语很难。', scene: '学习' },
      { korean: '이 문제는 너무 어려워요.', chinese: '这个问题太难了。', scene: '学习' },
    ],
    tags: ['学习', '日常'], emotionTags: [], relatedWords: ['adj-08'],
  },
  {
    id: 'adj-08', korean: '쉽다', romanization: 'swipda', baseForm: '쉽다', partOfSpeech: '形容词',
    level: '3', frequency: 2, emoji: '😌',
    meanings: [{ chinese: '容易', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '이 책은 쉬워요.', chinese: '这本书很容易。', scene: '学习' },
      { korean: '한국어 발음이 생각보다 쉬워요.', chinese: '韩语发音比想象中容易。', scene: '学习' },
    ],
    tags: ['学习'], emotionTags: [], relatedWords: ['adj-07'],
  },
  {
    id: 'adj-09', korean: '덥다', romanization: 'deopda', baseForm: '덥다', partOfSpeech: '形容词',
    level: '3', frequency: 2, emoji: '🥵',
    meanings: [{ chinese: '热', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '오늘 진짜 더워요.', chinese: '今天真热。', scene: '日常' },
      { korean: '한국 여름은 너무 더워요.', chinese: '韩国夏天太热了。', scene: '旅行' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: ['adj-10'],
  },
  {
    id: 'adj-10', korean: '춥다', romanization: 'chupda', baseForm: '춥다', partOfSpeech: '形容词',
    level: '3', frequency: 2, emoji: '🥶',
    meanings: [{ chinese: '冷', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '밖에 너무 추워요.', chinese: '外面太冷了。', scene: '日常' },
      { korean: '겨울에는 추우니까 따뜻하게 입어요.', chinese: '冬天冷，多穿点。', scene: '日常' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: ['adj-09'],
  },
  {
    id: 'adj-11', korean: '바쁘다', romanization: 'bappeuda', baseForm: '바쁘다', partOfSpeech: '形容词',
    level: '4', frequency: 3, emoji: '🏃',
    meanings: [{ chinese: '忙', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '요즘 너무 바빠요.', chinese: '最近太忙了。', scene: '日常' },
      { korean: '바쁘실 텐데 와 주셔서 감사합니다.', chinese: '百忙之中前来感谢。', scene: '职场' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'adj-12', korean: '재미있다', romanization: 'jaemiitda', baseForm: '재미있다', partOfSpeech: '形容词',
    level: '4', frequency: 3, emoji: '😄',
    meanings: [{ chinese: '有趣/好玩', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '한국어 공부가 재미있어요.', chinese: '学韩语很有趣。', scene: '学习' },
      { korean: '이 드라마 진짜 재미있어요!', chinese: '这部剧真有趣！', scene: '韩剧' },
    ],
    tags: ['日常', '学习', '韩流', '韩剧'], emotionTags: ['开心'], relatedWords: ['adj-13'],
  },
  {
    id: 'adj-13', korean: '심심하다', romanization: 'simsimhada', baseForm: '심심하다', partOfSpeech: '形容词',
    level: '4', frequency: 2, emoji: '😴',
    meanings: [{ chinese: '无聊', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '심심해요, 뭐 할까요?', chinese: '好无聊，做什么呢？', scene: '日常' },
      { korean: '심심할 때 한국 드라마 봐요.', chinese: '无聊的时候看韩剧。', scene: '韩剧' },
    ],
    tags: ['日常', '韩剧'], emotionTags: [], relatedWords: ['adj-12'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 10. HEALTH & BODY 健康身体
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'health-01', korean: '아프다', romanization: 'apeuda', baseForm: '아프다', partOfSpeech: '形容词',
    level: '1', frequency: 3, emoji: '🤒',
    meanings: [{ chinese: '疼/生病', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '배가 아파요.', chinese: '肚子疼。', scene: '医院' },
      { korean: '머리가 아파서 집에서 쉬고 있어요.', chinese: '头疼在家休息。', scene: '日常' },
    ],
    tags: ['日常', '医院'], emotionTags: [], relatedWords: ['health-02', 'health-03'],
  },
  {
    id: 'health-02', korean: '병원', romanization: 'byeongwon', baseForm: '병원', partOfSpeech: '名词',
    level: '2', frequency: 3, emoji: '🏥',
    meanings: [{ chinese: '医院', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '병원에 가야 해요.', chinese: '得去医院。', scene: '医院' },
      { korean: '가까운 병원이 어디예요?', chinese: '最近的医院在哪里？', scene: '出行' },
    ],
    tags: ['医院', '出行'], emotionTags: [], relatedWords: ['health-01', 'health-03'],
  },
  {
    id: 'health-03', korean: '약', romanization: 'yak', baseForm: '약', partOfSpeech: '名词',
    level: '2', frequency: 3, emoji: '💊',
    meanings: [{ chinese: '药', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '약을 먹었어요.', chinese: '吃药了。', scene: '医院' },
      { korean: '감기약을 사야 해요.', chinese: '得买感冒药。', scene: '购物' },
    ],
    tags: ['医院', '购物'], emotionTags: [], relatedWords: ['health-01', 'health-02'],
  },
  {
    id: 'health-04', korean: '감기', romanization: 'gamgi', baseForm: '감기', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '😷',
    meanings: [{ chinese: '感冒', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '감기에 걸렸어요.', chinese: '感冒了。', scene: '医院' },
      { korean: '감기 조심하세요.', chinese: '小心感冒。', scene: '日常' },
    ],
    tags: ['日常', '医院'], emotionTags: [], relatedWords: ['health-01', 'health-03'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 11. WORK & STUDY 职场学习
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'work-01', korean: '일', romanization: 'il', baseForm: '일', partOfSpeech: '名词',
    level: '2', frequency: 3, emoji: '💼',
    meanings: [{ chinese: '工作/事情', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '무슨 일을 하세요?', chinese: '做什么工作？', scene: '职场' },
      { korean: '일이 너무 많아요.', chinese: '工作太多了。', scene: '职场' },
    ],
    tags: ['职场', '日常'], emotionTags: [], relatedWords: ['work-02'],
  },
  {
    id: 'work-02', korean: '회사', romanization: 'hoesa', baseForm: '회사', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🏢',
    meanings: [{ chinese: '公司', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '회사에 다녀요.', chinese: '上班。', scene: '职场' },
      { korean: '회사까지 한 시간 걸려요.', chinese: '到公司要一个小时。', scene: '职场' },
    ],
    tags: ['职场'], emotionTags: [], relatedWords: ['work-01'],
  },
  {
    id: 'work-03', korean: '학교', romanization: 'hakgyo', baseForm: '학교', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🏫',
    meanings: [{ chinese: '学校', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '학교에 가요.', chinese: '去学校。', scene: '学习' },
      { korean: '학교 근처에 맛집이 많아요.', chinese: '学校附近有很多好吃的。', scene: '日常' },
    ],
    tags: ['学习', '日常'], emotionTags: [], relatedWords: ['work-04'],
  },
  {
    id: 'work-04', korean: '시험', romanization: 'siheom', baseForm: '시험', partOfSpeech: '名词',
    level: '4', frequency: 3, emoji: '📝',
    meanings: [{ chinese: '考试', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '다음 주에 시험이 있어요.', chinese: '下周有考试。', scene: '学习' },
      { korean: 'TOPIK 시험을 준비하고 있어요.', chinese: '在准备TOPIK考试。', scene: '学习' },
    ],
    tags: ['学习', 'TOPIK'], emotionTags: ['担心'], relatedWords: ['verb-15'],
  },
  {
    id: 'work-05', korean: '돈', romanization: 'don', baseForm: '돈', partOfSpeech: '名词',
    level: '5', frequency: 3, emoji: '💵',
    meanings: [{ chinese: '钱', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '돈이 없어요.', chinese: '没钱。', scene: '日常' },
      { korean: '돈을 많이 벌고 싶어요.', chinese: '想赚很多钱。', scene: '职场' },
    ],
    tags: ['日常', '职场', '购物'], emotionTags: [], relatedWords: ['shop-01'],
  },
  {
    id: 'work-06', korean: '이메일', romanization: 'imeil', baseForm: '이메일', partOfSpeech: '名词',
    level: '6', frequency: 2, emoji: '📧',
    meanings: [{ chinese: '邮件', nuance: '外来词（英语）', register: '通用' }],
    examples: [
      { korean: '이메일 보내 주세요.', chinese: '请发邮件。', scene: '职场' },
      { korean: '이메일 확인했어요?', chinese: '确认邮件了吗？', scene: '职场' },
    ],
    tags: ['职场'], emotionTags: [], relatedWords: ['work-07'],
  },
  {
    id: 'work-07', korean: '연락하다', romanization: 'yeollakhada', baseForm: '연락하다', partOfSpeech: '动词',
    level: '4', frequency: 3, emoji: '📞',
    meanings: [{ chinese: '联系', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '나중에 연락할게요.', chinese: '之后联系你。', scene: '社交' },
      { korean: '연락처 좀 알려주세요.', chinese: '请告诉我联系方式。', scene: '社交' },
    ],
    tags: ['社交', '职场', '电话沟通'], emotionTags: [], relatedWords: ['work-06'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 12. K-CULTURE 韩流词汇
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'kculture-01', korean: '오빠', romanization: 'oppa', baseForm: '오빠', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '💕',
    meanings: [
      { chinese: '哥哥（女称）/欧巴', nuance: '韩国文化标志词，粉丝常用', register: '口语' },
    ],
    examples: [
      { korean: '오빠, 사랑해요!', chinese: '欧巴，我爱你！', scene: '追星' },
      { korean: '우리 오빠가 제일 멋있어요.', chinese: '我家欧巴最帅。', scene: '追星' },
    ],
    tags: ['追星', '韩流', '表白情感', '社交'], emotionTags: ['开心'], relatedWords: ['kculture-02', 'kculture-03'],
  },
  {
    id: 'kculture-02', korean: '언니', romanization: 'eonni', baseForm: '언니', partOfSpeech: '名词',
    level: '4', frequency: 3, emoji: '👩‍🦰',
    meanings: [{ chinese: '姐姐（女称）', nuance: '韩国文化标志词', register: '口语' }],
    examples: [
      { korean: '언니, 오늘 진짜 예뻐요!', chinese: '姐姐，今天真漂亮！', scene: '社交' },
    ],
    tags: ['追星', '韩流', '社交'], emotionTags: [], relatedWords: ['kculture-01', 'kculture-03'],
  },
  {
    id: 'kculture-03', korean: '누나', romanization: 'nuna', baseForm: '누나', partOfSpeech: '名词',
    level: '4', frequency: 2, emoji: '🧑‍🦰',
    meanings: [{ chinese: '姐姐（男称）', nuance: '韩国文化标志词', register: '口语' }],
    examples: [
      { korean: '누나가 해 줄게.', chinese: '姐姐给你做。', scene: '日常' },
    ],
    tags: ['社交'], emotionTags: [], relatedWords: ['kculture-02'],
  },
  {
    id: 'kculture-04', korean: '팬', romanization: 'paen', baseForm: '팬', partOfSpeech: '名词',
    level: '5', frequency: 3, emoji: '⭐',
    meanings: [{ chinese: '粉丝', nuance: '外来词（英语fan）', register: '通用' }],
    examples: [
      { korean: '저는 완전 팬이에요!', chinese: '我是忠实粉丝！', scene: '追星' },
      { korean: '팬 사인회에 가고 싶어요.', chinese: '想去粉丝签名会。', scene: '追星' },
    ],
    tags: ['追星', '韩流'], emotionTags: ['开心'], relatedWords: ['kculture-01', 'kculture-06'],
  },
  {
    id: 'kculture-05', korean: '아이돌', romanization: 'aidol', baseForm: '아이돌', partOfSpeech: '名词',
    level: '5', frequency: 3, emoji: '🌟',
    meanings: [{ chinese: '偶像/爱豆', nuance: '韩国娱乐文化核心词', register: '通用' }],
    examples: [
      { korean: '좋아하는 아이돌이 누구예요?', chinese: '喜欢的偶像是谁？', scene: '追星' },
      { korean: '아이돌 연습생이었어요.', chinese: '曾经是偶像练习生。', scene: '追星' },
    ],
    tags: ['追星', '韩流'], emotionTags: [], relatedWords: ['kculture-01', 'kculture-04'],
  },
  {
    id: 'kculture-06', korean: '드라마', romanization: 'deurama', baseForm: '드라마', partOfSpeech: '名词',
    level: '5', frequency: 3, emoji: '📺',
    meanings: [{ chinese: '电视剧/韩剧', nuance: '外来词（英语drama）', register: '通用' }],
    examples: [
      { korean: '요즘 무슨 드라마 봐요?', chinese: '最近看什么韩剧？', scene: '韩剧' },
      { korean: '이 드라마 진짜 재미있어요.', chinese: '这部剧真好看。', scene: '韩剧' },
    ],
    tags: ['韩剧', '韩流'], emotionTags: [], relatedWords: ['kculture-07', 'adj-12'],
  },
  {
    id: 'kculture-07', korean: '예능', romanization: 'yeneung', baseForm: '예능', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '📺',
    meanings: [{ chinese: '综艺节目', nuance: '韩国放送术语', register: '通用' }],
    examples: [
      { korean: '한국 예능을 보면서 한국어를 배워요.', chinese: '看韩国综艺学韩语。', scene: '综艺' },
      { korean: '이 예능 프로그램 정말 웃겨요.', chinese: '这综艺节目真好笑。', scene: '综艺' },
    ],
    tags: ['综艺', '韩流'], emotionTags: ['开心'], relatedWords: ['kculture-06'],
  },
  {
    id: 'kculture-08', korean: '화장품', romanization: 'hwajangpum', baseForm: '화장품', partOfSpeech: '名词',
    level: '6', frequency: 2, emoji: '💄',
    meanings: [{ chinese: '化妆品', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '한국 화장품 정말 좋아요.', chinese: '韩国化妆品真的很好。', scene: '美妆' },
      { korean: '면세점에서 화장품 샀어요.', chinese: '在免税店买了化妆品。', scene: '免税店' },
    ],
    tags: ['美妆', '免税店', '购物'], emotionTags: [], relatedWords: ['shop-05', 'verb-11'],
  },
  {
    id: 'kculture-09', korean: '스킨케어', romanization: 'seukinkeeo', baseForm: '스킨케어', partOfSpeech: '名词',
    level: '5', frequency: 1, emoji: '🧴',
    meanings: [{ chinese: '护肤', nuance: '外来词（英语skincare）', register: '通用' }],
    examples: [
      { korean: '한국 스킨케어 루틴 따라 해 봤어요.', chinese: '试了韩国护肤流程。', scene: '美妆' },
    ],
    tags: ['美妆', '韩流'], emotionTags: [], relatedWords: ['kculture-08'],
  },
  {
    id: 'kculture-10', korean: '대박', romanization: 'daebak', baseForm: '대박', partOfSpeech: '感叹词',
    level: '6', frequency: 3, emoji: '🤯',
    meanings: [
      { chinese: '太厉害了/太棒了/天啊', nuance: '口语感叹词，综艺高频', register: '口语' },
    ],
    examples: [
      { korean: '대박! 이거 진짜 맛있어요.', chinese: '天啊！这个真好吃。', scene: '日常' },
      { korean: '대박! 어떻게 알았어요?', chinese: '太厉害了！怎么知道的？', scene: '日常' },
    ],
    tags: ['日常', '综艺', '韩流'], emotionTags: ['开心', '惊讶'], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // 13. TRAVEL KOREA 旅行韩国
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'travel-01', korean: '여행', romanization: 'yeohaeng', baseForm: '여행', partOfSpeech: '名词',
    level: '4', frequency: 3, emoji: '✈️',
    meanings: [{ chinese: '旅行', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '한국 여행 가고 싶어요.', chinese: '想去韩国旅行。', scene: '旅行' },
      { korean: '여행 계획을 세웠어요?', chinese: '定好旅行计划了吗？', scene: '旅行' },
    ],
    tags: ['旅行', '日常'], emotionTags: ['开心'], relatedWords: ['travel-02', 'travel-03'],
  },
  {
    id: 'travel-02', korean: '호텔', romanization: 'hotel', baseForm: '호텔', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🏨',
    meanings: [{ chinese: '酒店', nuance: '外来词（英语hotel）', register: '通用' }],
    examples: [
      { korean: '호텔을 예약했어요.', chinese: '预订了酒店。', scene: '酒店入住' },
      { korean: '호텔까지 어떻게 가요?', chinese: '到酒店怎么走？', scene: '出行' },
    ],
    tags: ['旅行', '酒店入住', '出行'], emotionTags: [], relatedWords: ['travel-01', 'travel-03'],
  },
  {
    id: 'travel-03', korean: '예약하다', romanization: 'yeyakhada', baseForm: '예약하다', partOfSpeech: '动词',
    level: '4', frequency: 3, emoji: '📅',
    meanings: [{ chinese: '预约/预订', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '미리 예약했어요.', chinese: '提前预约了。', scene: '旅行' },
      { korean: '예약 확인해 주세요.', chinese: '请确认预约。', scene: '酒店入住' },
    ],
    tags: ['旅行', '酒店入住', '餐厅'], emotionTags: [], relatedWords: ['travel-02'],
  },
  {
    id: 'travel-04', korean: '여권', romanization: 'yeogwon', baseForm: '여권', partOfSpeech: '名词',
    level: '5', frequency: 2, emoji: '📘',
    meanings: [{ chinese: '护照', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '여권 좀 보여 주세요.', chinese: '请出示护照。', scene: '入境海关' },
      { korean: '여권을 잃어버렸어요!', chinese: '护照丢了！', scene: '旅行' },
    ],
    tags: ['旅行', '入境海关'], emotionTags: [], relatedWords: ['travel-05'],
  },
  {
    id: 'travel-05', korean: '비행기', romanization: 'bihaenggi', baseForm: '비행기', partOfSpeech: '名词',
    level: '5', frequency: 3, emoji: '🛫',
    meanings: [{ chinese: '飞机', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '비행기 표를 샀어요.', chinese: '买了机票。', scene: '旅行' },
      { korean: '비행기가 연착됐어요.', chinese: '飞机延误了。', scene: '旅行' },
    ],
    tags: ['旅行', '入境海关'], emotionTags: [], relatedWords: ['travel-01', 'travel-04'],
  },
  {
    id: 'travel-06', korean: '관광', romanization: 'gwangwang', baseForm: '관광', partOfSpeech: '名词',
    level: '5', frequency: 2, emoji: '📸',
    meanings: [{ chinese: '观光/旅游', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '서울 관광 명소 추천해 주세요.', chinese: '请推荐首尔观光景点。', scene: '旅行' },
      { korean: '관광하러 왔어요.', chinese: '来旅游的。', scene: '景点打卡' },
    ],
    tags: ['旅行', '景点打卡'], emotionTags: [], relatedWords: ['travel-01'],
  },
  {
    id: 'travel-07', korean: '사진', romanization: 'sajin', baseForm: '사진', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '📷',
    meanings: [{ chinese: '照片', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '사진 찍어 주세요.', chinese: '请帮我拍照。', scene: '景点打卡' },
      { korean: '사진 같이 찍을까요?', chinese: '一起拍照吗？', scene: '社交' },
    ],
    tags: ['旅行', '景点打卡', '社交'], emotionTags: [], relatedWords: ['travel-06'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 14. TECHNOLOGY 科技互联网
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tech-01', korean: '핸드폰', romanization: 'haendeupon', baseForm: '핸드폰', partOfSpeech: '名词',
    level: '4', frequency: 3, emoji: '📱',
    meanings: [{ chinese: '手机', nuance: '外来词（英语handphone）', register: '通用' }],
    examples: [
      { korean: '핸드폰 번호가 뭐예요?', chinese: '手机号是多少？', scene: '社交' },
      { korean: '핸드폰을 잃어버렸어요.', chinese: '手机丢了。', scene: '日常' },
    ],
    tags: ['日常', '社交', '网购'], emotionTags: [], relatedWords: ['media-06', 'media-08'],
  },
  {
    id: 'tech-03', korean: '배달', romanization: 'baedal', baseForm: '배달', partOfSpeech: '名词',
    level: '5', frequency: 3, emoji: '🛵',
    meanings: [{ chinese: '外卖/配送', nuance: '韩国生活高频词', register: '通用' }],
    examples: [
      { korean: '배달 시켜 먹을까요?', chinese: '叫外卖吃吗？', scene: '日常' },
      { korean: '배달비가 얼마예요?', chinese: '配送费多少？', scene: '网购' },
    ],
    tags: ['日常', '网购', '餐厅'], emotionTags: [], relatedWords: ['media-06', 'food-11'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 15. MORE VERBS 补充动词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'verb-16', korean: '만나다', romanization: 'mannada', baseForm: '만나다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '🤝',
    meanings: [{ chinese: '见面', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '반갑습니다, 만나서.', chinese: '见到你很开心。', scene: '社交' },
      { korean: '내일 몇 시에 만날까요?', chinese: '明天几点见面？', scene: '社交' },
    ],
    tags: ['社交', '日常', '打招呼'], emotionTags: ['开心'], relatedWords: ['verb-02', 'verb-03'],
  },
  {
    id: 'verb-17', korean: '웃다', romanization: 'utda', baseForm: '웃다', partOfSpeech: '动词',
    level: '3', frequency: 2, emoji: '😄',
    meanings: [{ chinese: '笑', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '크게 웃으세요!', chinese: '大笑吧！', scene: '日常' },
      { korean: '그 농담에 많이 웃었어요.', chinese: '那个笑话让我笑了很多。', scene: '综艺' },
    ],
    tags: ['日常', '综艺', '社交'], emotionTags: ['开心'], relatedWords: ['adj-12'],
  },
  {
    id: 'verb-18', korean: '울다', romanization: 'ulda', baseForm: '울다', partOfSpeech: '动词',
    level: '4', frequency: 2, emoji: '😭',
    meanings: [{ chinese: '哭', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '슬퍼서 울었어요.', chinese: '因为伤心哭了。', scene: '日常' },
      { korean: '울지 마세요.', chinese: '别哭。', scene: '日常' },
    ],
    tags: ['日常', '韩剧'], emotionTags: ['伤心'], relatedWords: ['emotion-04'],
  },
  {
    id: 'verb-19', korean: '자다', romanization: 'jada', baseForm: '자다', partOfSpeech: '动词',
    level: '4', frequency: 3, emoji: '😴',
    meanings: [{ chinese: '睡觉', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '잘 자요!', chinese: '晚安！', scene: '日常' },
      { korean: '어젯밤에 잘 잤어요?', chinese: '昨晚睡得好吗？', scene: '日常' },
    ],
    tags: ['日常', '打招呼'], emotionTags: [], relatedWords: ['verb-20'],
  },
  {
    id: 'verb-20', korean: '일어나다', romanization: 'ireonada', baseForm: '일어나다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '⏰',
    meanings: [{ chinese: '起床/起来', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '아침에 일찍 일어났어요.', chinese: '早上起得早。', scene: '日常' },
      { korean: '일어나세요!', chinese: '起床吧！', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['verb-19', 'time-06'],
  },
  {
    id: 'verb-21', korean: '앉다', romanization: 'anda', baseForm: '앉다', partOfSpeech: '动词',
    level: '3', frequency: 2, emoji: '🪑',
    meanings: [{ chinese: '坐', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '여기 앉으세요.', chinese: '请坐这里。', scene: '餐厅' },
      { korean: '편하게 앉아요.', chinese: '随便坐。', scene: '社交' },
    ],
    tags: ['日常', '餐厅', '咖啡厅'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'verb-22', korean: '쉬다', romanization: 'swida', baseForm: '쉬다', partOfSpeech: '动词',
    level: '4', frequency: 2, emoji: '🛋️',
    meanings: [{ chinese: '休息', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '좀 쉬세요.', chinese: '休息一下吧。', scene: '日常' },
      { korean: '주말에는 집에서 쉬어요.', chinese: '周末在家休息。', scene: '日常' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: ['verb-19'],
  },
  {
    id: 'verb-23', korean: '찾다', romanization: 'chatda', baseForm: '찾다', partOfSpeech: '动词',
    level: '4', frequency: 3, emoji: '🔍',
    meanings: [{ chinese: '找/寻找', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '뭘 찾으세요?', chinese: '您找什么？', scene: '购物' },
      { korean: '길을 찾고 있어요.', chinese: '在找路。', scene: '出行' },
    ],
    tags: ['购物', '出行', '日常'], emotionTags: [], relatedWords: ['verb-09'],
  },
  {
    id: 'verb-24', korean: '도와주다', romanization: 'dowajuda', baseForm: '도와주다', partOfSpeech: '动词',
    level: '2', frequency: 3, emoji: '🆘',
    meanings: [{ chinese: '帮助', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '도와주세요!', chinese: '请帮帮我！', scene: '日常' },
      { korean: '도와줘서 감사합니다.', chinese: '谢谢你帮我。', scene: '社交' },
    ],
    tags: ['日常', '社交', '出行'], emotionTags: [], relatedWords: ['greet-02'],
  },
  {
    id: 'verb-25', korean: '사랑하다', romanization: 'saranghada', baseForm: '사랑하다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '❤️',
    meanings: [{ chinese: '爱', nuance: '韩剧高频', register: '通用' }],
    examples: [
      { korean: '사랑해요.', chinese: '我爱你。', scene: '表白情感' },
      { korean: '한국을 사랑해요.', chinese: '我爱韩国。', scene: '日常' },
    ],
    tags: ['表白情感', '韩剧', '社交'], emotionTags: ['开心'], relatedWords: ['emotion-01'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 16. ADVERBS & EXPRESSIONS 副词与表达
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'adv-01', korean: '정말', romanization: 'jeongmal', baseForm: '정말', partOfSpeech: '副词',
    level: '1', frequency: 3, emoji: '💯',
    meanings: [{ chinese: '真的/非常', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '정말 맛있어요!', chinese: '真的很好吃！', scene: '餐厅' },
      { korean: '정말 감사합니다.', chinese: '非常感谢。', scene: '社交' },
    ],
    tags: ['日常', '社交', '餐厅'], emotionTags: [], relatedWords: ['adv-02'],
  },
  {
    id: 'adv-02', korean: '너무', romanization: 'neomu', baseForm: '너무', partOfSpeech: '副词',
    level: '2', frequency: 3, emoji: '📈',
    meanings: [{ chinese: '太/过于', nuance: '口语高频，可表正面或负面', register: '通用' }],
    examples: [
      { korean: '너무 좋아요!', chinese: '太好了！', scene: '日常' },
      { korean: '너무 비싸요.', chinese: '太贵了。', scene: '购物' },
    ],
    tags: ['日常', '购物', '社交'], emotionTags: [], relatedWords: ['adv-01'],
  },
  {
    id: 'adv-03', korean: '조금', romanization: 'jogeum', baseForm: '조금', partOfSpeech: '副词',
    level: '2', frequency: 3, emoji: '🤏',
    meanings: [{ chinese: '一点/稍微', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '조금만 기다려 주세요.', chinese: '请稍等一下。', scene: '日常' },
      { korean: '조금 더 주세요.', chinese: '再给我一点。', scene: '餐厅' },
    ],
    tags: ['日常', '餐厅', '购物'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'adv-04', korean: '빨리', romanization: 'ppalli', baseForm: '빨리', partOfSpeech: '副词',
    level: '3', frequency: 3, emoji: '⚡',
    meanings: [{ chinese: '快点/赶快', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '빨리 와요!', chinese: '快来！', scene: '日常' },
      { korean: '빨리빨리 하세요.', chinese: '请快一点。', scene: '职场' },
    ],
    tags: ['日常', '职场', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'adv-05', korean: '천천히', romanization: 'cheoncheonhi', baseForm: '천천히', partOfSpeech: '副词',
    level: '3', frequency: 2, emoji: '🐢',
    meanings: [{ chinese: '慢慢地', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '천천히 말씀해 주세요.', chinese: '请说慢一点。', scene: '社交' },
      { korean: '천천히 드세요.', chinese: '请慢用。', scene: '餐厅' },
    ],
    tags: ['日常', '社交', '餐厅'], emotionTags: [], relatedWords: ['adv-04'],
  },
  {
    id: 'adv-06', korean: '같이', romanization: 'gachi', baseForm: '같이', partOfSpeech: '副词',
    level: '4', frequency: 3, emoji: '👥',
    meanings: [{ chinese: '一起', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '같이 갈래요?', chinese: '一起去吗？', scene: '日常' },
      { korean: '친구랑 같이 왔어요.', chinese: '和朋友一起来的。', scene: '社交' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['family-03'],
  },
  {
    id: 'adv-07', korean: '혼자', romanization: 'honja', baseForm: '혼자', partOfSpeech: '副词',
    level: '4', frequency: 2, emoji: '🧍',
    meanings: [{ chinese: '独自/一个人', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '혼자 살아요.', chinese: '一个人住。', scene: '日常' },
      { korean: '혼자 여행하는 거 좋아해요.', chinese: '喜欢一个人旅行。', scene: '旅行' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: ['adv-06'],
  },
  {
    id: 'adv-08', korean: '항상', romanization: 'hangsang', baseForm: '항상', partOfSpeech: '副词',
    level: '4', frequency: 3, emoji: '🔄',
    meanings: [{ chinese: '总是/一直', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '항상 감사합니다.', chinese: '一直很感谢。', scene: '社交' },
      { korean: '항상 행복하세요.', chinese: '祝你一直幸福。', scene: '表白情感' },
    ],
    tags: ['社交', '表白情感'], emotionTags: ['感谢', '开心'], relatedWords: ['greet-02'],
  },
];
