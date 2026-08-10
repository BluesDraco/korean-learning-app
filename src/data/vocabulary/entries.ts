import type { WordEntry } from '@/types';

export const vocabularyEntries: WordEntry[] = [

  // ═══════════════════════════════════════════════════════════════
  // 1. TIME & DATE 时间日期
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'time-01', korean: '시간', romanization: 'sigan', baseForm: '시간', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '时间', chineseEn: 'time', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '시간이 없어요.', chinese: '没有时间。', chineseEn: 'I have no time.', scene: '日常', sceneEn: 'Daily' },
      { korean: '시간이 얼마나 걸려요?', chinese: '需要多长时间？', chineseEn: 'How long does it take?', scene: '出行', sceneEn: 'Travel' },
    ],
    tags: ['日常', '出行'], emotionTags: [], relatedWords: ['time-02', 'time-03'],
  },
  {
    id: 'time-02', korean: '오늘', romanization: 'oneul', baseForm: '오늘', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '今天', chineseEn: 'today', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '오늘 날씨가 좋아요.', chinese: '今天天气很好。', chineseEn: 'The weather is really nice today.', scene: '日常', sceneEn: 'Daily' },
      { korean: '오늘 뭐 해요?', chinese: '今天做什么？', chineseEn: 'What are we doing today?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['time-03', 'time-04'],
  },
  {
    id: 'time-03', korean: '내일', romanization: 'naeil', baseForm: '내일', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '明天', chineseEn: 'Tomorrow', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '내일 만나요.', chinese: '明天见。', chineseEn: 'See you tomorrow.', scene: '日常', sceneEn: 'Daily' },
      { korean: '내일 비가 올까요?', chinese: '明天会下雨吗？', chineseEn: 'Will it rain tomorrow?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['time-02', 'time-04'],
  },
  {
    id: 'time-04', korean: '어제', romanization: 'eoje', baseForm: '어제', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '昨天', chineseEn: 'yesterday', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '어제 뭐 했어요?', chinese: '昨天做了什么？', chineseEn: 'What did you do yesterday?', scene: '日常', sceneEn: 'Daily' },
      { korean: '어제 영화를 봤어요.', chinese: '昨天看了电影。', chineseEn: 'I watched a movie yesterday.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['time-02', 'time-03'],
  },
  {
    id: 'time-05', korean: '지금', romanization: 'jigeum', baseForm: '지금', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '现在', chineseEn: 'Now', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '지금 몇 시예요?', chinese: '现在几点了？', chineseEn: 'What time is it now?', scene: '日常', sceneEn: 'Daily' },
      { korean: '지금 가고 있어요.', chinese: '现在正在去。', chineseEn: 'I\'m on my way now.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['time-01'],
  },
  {
    id: 'time-06', korean: '아침', romanization: 'achim', baseForm: '아침', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '早上；早餐', chineseEn: 'morning; breakfast', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '아침에 일찍 일어나요.', chinese: '早上早起。', chineseEn: 'I wake up early in the morning.', scene: '日常', sceneEn: 'Daily' },
      { korean: '아침 먹었어요?', chinese: '吃早餐了吗？', chineseEn: 'Did you have breakfast?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '时间'], emotionTags: [], relatedWords: ['time-07', 'time-08'],
  },
  {
    id: 'time-07', korean: '저녁', romanization: 'jeonyeok', baseForm: '저녁', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 2,
    meanings: [{ chinese: '傍晚；晚餐', chineseEn: 'evening; dinner', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '저녁에 뭐 먹을까요?', chinese: '晚上吃什么？', chineseEn: 'What should we eat for dinner?', scene: '日常', sceneEn: 'Daily' },
      { korean: '저녁 7시에 만나요.', chinese: '晚上7点见。', chineseEn: 'See you at 7 PM.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '时间'], emotionTags: [], relatedWords: ['time-06', 'time-08'],
  },
  {
    id: 'time-08', korean: '밤', romanization: 'bam', baseForm: '밤', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 2,
    meanings: [{ chinese: '夜晚', chineseEn: 'night', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '밤에 별이 예뻐요.', chinese: '夜晚星星很美。', chineseEn: 'The stars are beautiful at night.', scene: '日常', sceneEn: 'Daily' },
      { korean: '늦은 밤까지 공부했어요.', chinese: '学习到深夜。', chineseEn: 'Studied late into the night.', scene: '学习', sceneEn: 'to study' },
    ],
    tags: ['日常', '时间'], emotionTags: [], relatedWords: ['time-06', 'time-07'],
  },
  {
    id: 'time-09', korean: '주말', romanization: 'jumal', baseForm: '주말', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '周末', chineseEn: 'weekend', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '주말에 뭐 할 거예요?', chinese: '周末打算做什么？', chineseEn: 'What are you planning to do this weekend?', scene: '日常', sceneEn: 'Daily' },
      { korean: '주말 잘 보내세요!', chinese: '周末愉快！', chineseEn: 'Have a nice weekend!', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '时间'], emotionTags: ['开心'], relatedWords: ['time-10'],
  },
  {
    id: 'time-10', korean: '평일', romanization: 'pyeongil', baseForm: '평일', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [{ chinese: '平日/工作日', chineseEn: 'weekday/workday', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '평일에는 바빠요.', chinese: '工作日很忙。', chineseEn: 'Weekdays are busy.', scene: '职场', sceneEn: 'workplace' },
      { korean: '평일 낮에는 한가해요.', chinese: '工作日白天很闲。', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: ['time-09'],
  },
  {
    id: 'time-11', korean: '매일', romanization: 'maeil', baseForm: '매일', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '1', frequency: 3,
    meanings: [{ chinese: '每天', chineseEn: 'every day', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '매일 운동해요.', chinese: '每天运动。', chineseEn: 'Exercise every day.', scene: '日常', sceneEn: 'Daily' },
      { korean: '매일 한국어를 공부해요.', chinese: '每天学韩语。', chineseEn: 'I study Korean every day.', scene: '学习', sceneEn: 'to study' },
    ],
    tags: ['日常', '学习'], emotionTags: [], relatedWords: ['time-01'],
  },
  {
    id: 'time-12', korean: '봄', romanization: 'bom', baseForm: '봄', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [{ chinese: '春天', chineseEn: 'Spring', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '봄에 꽃이 피어요.', chinese: '春天花开。', chineseEn: 'Flowers bloom in spring.', scene: '日常', sceneEn: 'Daily' },
      { korean: '서울의 봄은 정말 예뻐요.', chinese: '首尔的春天真的很美。', chineseEn: 'Seoul\'s spring is really beautiful.', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['日常', '旅行'], emotionTags: ['开心'], relatedWords: ['time-13', 'time-14', 'time-15'],
  },
  {
    id: 'time-13', korean: '여름', romanization: 'yeoreum', baseForm: '여름', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [{ chinese: '夏天', chineseEn: 'summer', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '여름에는 더워요.', chinese: '夏天很热。', chineseEn: 'Summer is hot.', scene: '日常', sceneEn: 'Daily' },
      { korean: '여름 휴가 어디로 갈까요?', chinese: '暑假去哪里呢？', chineseEn: 'Where are you going for summer vacation?', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: ['time-12', 'time-14', 'time-15'],
  },
  {
    id: 'time-14', korean: '가을', romanization: 'gaeul', baseForm: '가을', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [{ chinese: '秋天', chineseEn: 'fall', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '가을 하늘이 예뻐요.', chinese: '秋天的天空很美。', chineseEn: 'The autumn sky is beautiful.', scene: '日常', sceneEn: 'Daily' },
      { korean: '가을에는 단풍을 보러 가요.', chinese: '秋天去看枫叶。', chineseEn: 'In autumn, I go to see the autumn leaves.', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: ['time-12', 'time-13', 'time-15'],
  },
  {
    id: 'time-15', korean: '겨울', romanization: 'gyeoul', baseForm: '겨울', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [{ chinese: '冬天', chineseEn: 'winter', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '겨울에는 눈이 와요.', chinese: '冬天下雪。', chineseEn: 'It snows in winter.', scene: '日常', sceneEn: 'Daily' },
      { korean: '한국 겨울은 정말 추워요.', chinese: '韩国冬天真的很冷。', chineseEn: 'Korean winters are really cold.', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: ['time-12', 'time-13', 'time-14'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 2. GREETINGS & COMMON PHRASES 问候与常用语
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'greet-01', korean: '안녕하세요', romanization: 'annyeonghaseyo', baseForm: '안녕하다', partOfSpeech: '表达', partOfSpeechEn: 'Expression',
    level: '1', frequency: 3,
    meanings: [{ chinese: '你好', chineseEn: 'Hello', nuance: '敬语', nuanceEn: 'honorifics', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '안녕하세요, 처음 뵙겠습니다.', chinese: '你好，初次见面。', chineseEn: 'Hello, nice to meet you.', scene: '社交', sceneEn: 'Social' },
      { korean: '안녕하세요, 잘 지내셨어요?', chinese: '你好，过得好吗？', chineseEn: 'Hello, how are you?', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['社交', '打招呼'], emotionTags: [], relatedWords: ['greet-02', 'greet-03'],
  },
  {
    id: 'greet-02', korean: '감사합니다', romanization: 'gamsahamnida', baseForm: '감사하다', partOfSpeech: '表达', partOfSpeechEn: 'Expression',
    level: '1', frequency: 3,
    meanings: [{ chinese: '谢谢', chineseEn: 'Thank you', nuance: '正式敬语', nuanceEn: 'Formal honorific', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '도와주셔서 감사합니다.', chinese: '感谢您的帮助。', chineseEn: 'Thank you for your help.', scene: '社交', sceneEn: 'Social' },
      { korean: '선물 감사합니다.', chinese: '谢谢礼物。', chineseEn: 'Thank you for the gift.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['社交', '感谢道歉'], emotionTags: ['感谢'], relatedWords: ['greet-03', 'greet-04'],
  },
  {
    id: 'greet-03', korean: '죄송합니다', romanization: 'joesonghamnida', baseForm: '죄송하다', partOfSpeech: '表达', partOfSpeechEn: 'Expression',
    level: '1', frequency: 3,
    meanings: [{ chinese: '对不起', chineseEn: 'sorry', nuance: '正式敬语', nuanceEn: 'Formal honorific', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '늦어서 죄송합니다.', chinese: '迟到了对不起。', chineseEn: 'Sorry for being late.', scene: '社交', sceneEn: 'Social' },
      { korean: '실례했습니다, 죄송합니다.', chinese: '失礼了，对不起。', chineseEn: 'Sorry for being rude.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['社交', '感谢道歉'], emotionTags: ['道歉'], relatedWords: ['greet-02', 'greet-04'],
  },
  {
    id: 'greet-04', korean: '괜찮아요', romanization: 'gwaenchanayo', baseForm: '괜찮다', partOfSpeech: '表达', partOfSpeechEn: 'Expression',
    level: '1', frequency: 3,
    meanings: [{ chinese: '没关系/还可以', chineseEn: 'it\'s okay / not bad', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '괜찮아요, 걱정하지 마세요.', chinese: '没关系，别担心。', chineseEn: 'It\'s okay, don\'t worry.', scene: '社交', sceneEn: 'Social' },
      { korean: '이 정도면 괜찮아요?', chinese: '这样还可以吗？', chineseEn: 'Is this okay?', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['社交', '感谢道歉', '购物'], emotionTags: [], relatedWords: ['greet-03'],
  },
  {
    id: 'greet-05', korean: '안녕히 가세요', romanization: 'annyeonghi gaseyo', baseForm: '안녕하다', partOfSpeech: '表达', partOfSpeechEn: 'Expression',
    level: '1', frequency: 2,
    meanings: [{ chinese: '再见（对离开的人）', chineseEn: 'Goodbye (to someone leaving)', nuance: '敬语', nuanceEn: 'honorifics', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '안녕히 가세요, 내일 봐요.', chinese: '再见，明天见。', chineseEn: 'Goodbye, see you tomorrow.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['社交', '打招呼'], emotionTags: [], relatedWords: ['greet-06'],
  },
  {
    id: 'greet-06', korean: '안녕히 계세요', romanization: 'annyeonghi gyeseyo', baseForm: '안녕하다', partOfSpeech: '表达', partOfSpeechEn: 'Expression',
    level: '1', frequency: 2,
    meanings: [{ chinese: '再见（对留下的人）', chineseEn: 'Goodbye (to someone staying)', nuance: '敬语', nuanceEn: 'honorifics', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '안녕히 계세요, 다음에 또 올게요.', chinese: '再见，下次再来。', chineseEn: 'Goodbye, come again next time.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['社交', '打招呼'], emotionTags: [], relatedWords: ['greet-05'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 3. FOOD & DRINK 饮食
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'food-01', korean: '밥', romanization: 'bap', baseForm: '밥', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '饭；餐', chineseEn: 'meal; food', nuance: '中性，韩语中最核心的饮食词', nuanceEn: 'Neutral, the most core food-related word in Korean', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '밥 먹었어요?', chinese: '吃饭了吗？', chineseEn: 'Have you eaten?', scene: '日常', sceneEn: 'Daily' },
      { korean: '여기 밥이 정말 맛있어요.', chinese: '这里的饭真好吃。', chineseEn: 'The food here is really delicious.', scene: '餐厅', sceneEn: 'Restaurant' },
    ],
    tags: ['餐厅', '日常'], emotionTags: [], relatedWords: ['food-02', 'food-04', 'food-07'],
  },
  {
    id: 'food-02', korean: '물', romanization: 'mul', baseForm: '물', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '水', chineseEn: 'Water', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '물 한 잔 주세요.', chinese: '请给我一杯水。', chineseEn: 'Please give me a glass of water.', scene: '餐厅', sceneEn: 'Restaurant' },
      { korean: '물 좀 마실게요.', chinese: '我喝点水。', chineseEn: 'I\'ll drink some water.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['餐厅', '日常'], emotionTags: [], relatedWords: ['food-03', 'food-09'],
  },
  {
    id: 'food-03', korean: '커피', romanization: 'keopi', baseForm: '커피', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '咖啡', chineseEn: 'coffee', nuance: '外来词（英语）', nuanceEn: 'Loanword (English)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '커피 한 잔 주세요.', chinese: '请给我一杯咖啡。', chineseEn: 'Please give me a coffee.', scene: '咖啡厅', sceneEn: 'Café' },
      { korean: '아침에 커피를 꼭 마셔요.', chinese: '早上一定喝咖啡。', chineseEn: 'I always drink coffee in the morning.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['咖啡厅', '日常'], emotionTags: [], relatedWords: ['food-09', 'food-10'],
  },
  {
    id: 'food-04', korean: '김치', romanization: 'gimchi', baseForm: '김치', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: '泡菜/辛奇', chineseEn: 'kimchi', nuance: '韩国文化标志词', nuanceEn: 'Iconic Korean cultural term', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국 사람은 매일 김치를 먹어요.', chinese: '韩国人每天吃泡菜。', chineseEn: 'Koreans eat kimchi every day.', scene: '日常', sceneEn: 'Daily' },
      { korean: '김치찌개도 주세요.', chinese: '也请给我泡菜汤。', chineseEn: 'Please give me kimchi stew too.', scene: '餐厅', sceneEn: 'Restaurant' },
    ],
    tags: ['餐厅', '韩流'], emotionTags: [], relatedWords: ['food-01', 'food-05'],
  },
  {
    id: 'food-05', korean: '맛있다', romanization: 'masitda', baseForm: '맛있다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '1', frequency: 3,
    meanings: [{ chinese: '好吃', chineseEn: 'delicious', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이거 정말 맛있어요!', chinese: '这个真的很好吃！', chineseEn: 'This is really delicious!', scene: '餐厅', sceneEn: 'Restaurant' },
      { korean: '엄마가 만든 음식이 제일 맛있어요.', chinese: '妈妈做的饭最好吃。', chineseEn: 'Mom\'s cooking is the best.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['餐厅', '咖啡厅'], emotionTags: ['开心'], relatedWords: ['food-06', 'food-01'],
  },
  {
    id: 'food-06', korean: '맛없다', romanization: 'madeopda', baseForm: '맛없다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '2', frequency: 2,
    meanings: [{ chinese: '不好吃', chineseEn: 'Not tasty', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이거 너무 맛없어요.', chinese: '这个太难吃了。', chineseEn: 'This tastes awful.', scene: '餐厅', sceneEn: 'Restaurant' },
    ],
    tags: ['餐厅'], emotionTags: ['不满'], relatedWords: ['food-05'],
  },
  {
    id: 'food-07', korean: '배고프다', romanization: 'baegopeuda', baseForm: '배고프다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '2', frequency: 3,
    meanings: [{ chinese: '肚子饿', chineseEn: 'Hungry', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '배고파요. 밥 먹으러 가요.', chinese: '肚子饿了，去吃饭吧。', chineseEn: 'I\'m hungry, let\'s go eat.', scene: '日常', sceneEn: 'Daily' },
      { korean: '배고픈데 뭐 먹을까요?', chinese: '好饿，吃什么？', chineseEn: 'So hungry, what should we eat?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '餐厅'], emotionTags: [], relatedWords: ['food-08', 'food-01'],
  },
  {
    id: 'food-08', korean: '배부르다', romanization: 'baebureuda', baseForm: '배부르다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '2', frequency: 2,
    meanings: [{ chinese: '饱了', chineseEn: 'I\'m full.', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '배불러요, 더 못 먹겠어요.', chinese: '饱了，吃不下了。', chineseEn: 'I\'m full, can\'t eat anymore.', scene: '餐厅', sceneEn: 'Restaurant' },
      { korean: '배부르게 먹었어요.', chinese: '吃饱了。', chineseEn: 'I\'ve eaten enough.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['餐厅', '日常'], emotionTags: [], relatedWords: ['food-07'],
  },
  {
    id: 'food-09', korean: '차', romanization: 'cha', baseForm: '차', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [{ chinese: '茶', chineseEn: 'tea', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '차 한 잔 드릴까요?', chinese: '来一杯茶吗？', chineseEn: 'Would you like a cup of tea?', scene: '咖啡厅', sceneEn: 'Café' },
      { korean: '녹차 좋아하세요?', chinese: '喜欢绿茶吗？', chineseEn: 'Do you like green tea?', scene: '咖啡厅', sceneEn: 'Café' },
    ],
    tags: ['咖啡厅', '日常'], emotionTags: [], relatedWords: ['food-03', 'food-02'],
  },
  {
    id: 'food-10', korean: '주스', romanization: 'juseu', baseForm: '주스', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [{ chinese: '果汁', chineseEn: 'juice', nuance: '外来词（英语）', nuanceEn: 'Loanword (English)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '오렌지 주스 한 잔 주세요.', chinese: '请给我一杯橙汁。', chineseEn: 'Please give me a glass of orange juice.', scene: '咖啡厅', sceneEn: 'Café' },
    ],
    tags: ['咖啡厅'], emotionTags: [], relatedWords: ['food-03', 'food-02'],
  },
  {
    id: 'food-11', korean: '주문하다', romanization: 'jumunhada', baseForm: '주문하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 2,
    meanings: [{ chinese: '点单/订购', chineseEn: 'Ordering', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '주문하시겠어요?', chinese: '请问要点单吗？', chineseEn: 'May I take your order?', scene: '咖啡厅', sceneEn: 'Café' },
      { korean: '인터넷으로 주문했어요.', chinese: '在网上订购了。', chineseEn: 'I ordered online.', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['咖啡厅', '餐厅', '购物'], emotionTags: [], relatedWords: ['food-12'],
  },
  {
    id: 'food-12', korean: '계산하다', romanization: 'gyesanhada', baseForm: '계산하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '结账', chineseEn: 'check, please', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '계산해 주세요.', chinese: '请结账。', chineseEn: 'Please check out.', scene: '餐厅', sceneEn: 'Restaurant' },
      { korean: '카드로 계산할게요.', chinese: '用卡结账。', chineseEn: 'Pay by card.', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['餐厅', '咖啡厅', '购物'], emotionTags: [], relatedWords: ['food-11'],
  },
  {
    id: 'food-13', korean: '메뉴', romanization: 'menyu', baseForm: '메뉴', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [{ chinese: '菜单', chineseEn: 'menu', nuance: '外来词（英语）', nuanceEn: 'Loanword (English)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '메뉴 좀 보여 주세요.', chinese: '请给我看看菜单。', chineseEn: 'Please show me the menu.', scene: '餐厅', sceneEn: 'Restaurant' },
      { korean: '오늘의 메뉴는 뭐예요?', chinese: '今天的菜单是什么？', chineseEn: 'What\'s today\'s menu?', scene: '餐厅', sceneEn: 'Restaurant' },
    ],
    tags: ['餐厅', '咖啡厅'], emotionTags: [], relatedWords: ['food-11'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 4. SHOPPING 购物
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'shop-01', korean: '얼마', romanization: 'eolma', baseForm: '얼마', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '多少钱', chineseEn: 'How much?', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이거 얼마예요?', chinese: '这个多少钱？', chineseEn: 'How much is this?', scene: '购物', sceneEn: 'Shopping' },
      { korean: '얼마나 기다려야 해요?', chinese: '要等多久？', chineseEn: 'How long will it take?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['购物', '日常'], emotionTags: [], relatedWords: ['shop-02', 'shop-04'],
  },
  {
    id: 'shop-02', korean: '비싸다', romanization: 'bissada', baseForm: '비싸다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '2', frequency: 3,
    meanings: [{ chinese: '贵', chineseEn: 'Expensive', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '너무 비싸요!', chinese: '太贵了！', chineseEn: 'That\'s too expensive!', scene: '购物', sceneEn: 'Shopping' },
      { korean: '서울은 물가가 비싸요.', chinese: '首尔物价贵。', chineseEn: 'Seoul is expensive.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['购物', '日常'], emotionTags: ['不满'], relatedWords: ['shop-03', 'shop-01'],
  },
  {
    id: 'shop-03', korean: '싸다', romanization: 'ssada', baseForm: '싸다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '2', frequency: 2,
    meanings: [{ chinese: '便宜', chineseEn: 'cheap', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '여기는 정말 싸네요!', chinese: '这里真便宜啊！', chineseEn: 'This place is really cheap!', scene: '购物', sceneEn: 'Shopping' },
      { korean: '싼 걸로 주세요.', chinese: '给我便宜的吧。', chineseEn: 'Give me the cheaper one.', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['购物', '免税店'], emotionTags: ['开心'], relatedWords: ['shop-02'],
  },
  {
    id: 'shop-04', korean: '깎다', romanization: 'kkakda', baseForm: '깎다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '砍价/削', chineseEn: 'bargain / cut', nuance: '口语，韩国市场常用', nuanceEn: 'Colloquial, commonly used in Korean markets', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '좀 깎아 주세요.', chinese: '便宜一点吧。', chineseEn: 'Please make it a bit cheaper.', scene: '购物', sceneEn: 'Shopping' },
      { korean: '만원 깎아 드릴게요.', chinese: '给您便宜一万韩元。', chineseEn: 'I\'ll give you 10,000 won off.', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['购物', '市场'], emotionTags: [], relatedWords: ['shop-02', 'shop-03'],
  },
  {
    id: 'shop-05', korean: '사이즈', romanization: 'saijeu', baseForm: '사이즈', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [{ chinese: '尺寸/大小', chineseEn: 'Size', nuance: '外来词（英语）', nuanceEn: 'Loanword (English)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '다른 사이즈 있어요?', chinese: '有其他尺寸吗？', chineseEn: 'Do you have other sizes?', scene: '购物', sceneEn: 'Shopping' },
      { korean: '이 사이즈가 딱 맞아요.', chinese: '这个尺寸正合适。', chineseEn: 'This size fits perfectly.', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['购物', '免税店'], emotionTags: [], relatedWords: ['shop-06'],
  },
  {
    id: 'shop-06', korean: '입다', romanization: 'ipda', baseForm: '입다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '穿（衣服）', chineseEn: 'to wear (clothes)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한복을 입어 보고 싶어요.', chinese: '想试试穿韩服。', chineseEn: 'I want to try wearing a hanbok.', scene: '旅行', sceneEn: 'Travel' },
      { korean: '이 옷 입어 봐도 돼요?', chinese: '这件衣服可以试穿吗？', chineseEn: 'Can I try on this outfit?', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['购物', '旅行'], emotionTags: [], relatedWords: ['shop-05'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 5. TRANSPORTATION 交通出行
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'trans-01', korean: '지하철', romanization: 'jihacheol', baseForm: '지하철', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '地铁', chineseEn: 'subway', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '지하철역이 어디예요?', chinese: '地铁站在哪里？', chineseEn: 'Where is the subway station?', scene: '出行', sceneEn: 'Travel' },
      { korean: '지하철로 갈게요.', chinese: '坐地铁去。', chineseEn: 'Go by subway.', scene: '出行', sceneEn: 'Travel' },
    ],
    tags: ['出行', '地铁'], emotionTags: [], relatedWords: ['trans-02', 'trans-03'],
  },
  {
    id: 'trans-02', korean: '버스', romanization: 'beoseu', baseForm: '버스', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: '公交车', chineseEn: 'bus', nuance: '外来词（英语）', nuanceEn: 'Loanword (English)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '버스 정류장이 어디예요?', chinese: '公交站在哪里？', chineseEn: 'Where is the bus stop?', scene: '出行', sceneEn: 'Travel' },
      { korean: '몇 번 버스를 타야 해요?', chinese: '要坐几路公交？', chineseEn: 'Which bus number should I take?', scene: '出行', sceneEn: 'Travel' },
    ],
    tags: ['出行', '地铁'], emotionTags: [], relatedWords: ['trans-01', 'trans-04'],
  },
  {
    id: 'trans-03', korean: '택시', romanization: 'taeksi', baseForm: '택시', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [{ chinese: '出租车', chineseEn: 'taxi', nuance: '外来词（英语）', nuanceEn: 'Loanword (English)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '택시 타고 갈게요.', chinese: '坐出租车去。', chineseEn: 'Go by taxi.', scene: '出行', sceneEn: 'Travel' },
      { korean: '택시 불러 주세요.', chinese: '请帮我叫出租车。', chineseEn: 'Please call a taxi for me.', scene: '出行', sceneEn: 'Travel' },
    ],
    tags: ['出行'], emotionTags: [], relatedWords: ['trans-01', 'trans-02'],
  },
  {
    id: 'trans-04', korean: '타다', romanization: 'tada', baseForm: '타다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '1', frequency: 3,
    meanings: [{ chinese: '乘坐/搭乘', chineseEn: 'ride/take', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '지하철을 타고 왔어요.', chinese: '坐地铁来的。', chineseEn: 'I came by subway.', scene: '出行', sceneEn: 'Travel' },
      { korean: '2호선을 타야 해요.', chinese: '要坐2号线。', chineseEn: 'Take Line 2.', scene: '地铁', sceneEn: 'subway' },
    ],
    tags: ['出行', '地铁'], emotionTags: [], relatedWords: ['trans-01', 'trans-02'],
  },
  {
    id: 'trans-05', korean: '내리다', romanization: 'naerida', baseForm: '내리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [{ chinese: '下车/下来', chineseEn: 'get off/alight', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '다음 역에서 내려요.', chinese: '下一站下车。', chineseEn: 'Get off at the next stop.', scene: '地铁', sceneEn: 'subway' },
      { korean: '여기서 내리세요.', chinese: '请在这里下车。', chineseEn: 'Please get off here.', scene: '出行', sceneEn: 'Travel' },
    ],
    tags: ['出行', '地铁'], emotionTags: [], relatedWords: ['trans-04'],
  },
  {
    id: 'trans-06', korean: '길', romanization: 'gil', baseForm: '길', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: '路/道路', chineseEn: 'road/street', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '길을 잃어버렸어요.', chinese: '迷路了。', chineseEn: 'I\'m lost.', scene: '出行', sceneEn: 'Travel' },
      { korean: '이 길로 쭉 가세요.', chinese: '请沿着这条路一直走。', chineseEn: 'Please go straight along this road.', scene: '出行', sceneEn: 'Travel' },
    ],
    tags: ['出行', '问路'], emotionTags: [], relatedWords: ['trans-07'],
  },
  {
    id: 'trans-07', korean: '오른쪽', romanization: 'oreunjjok', baseForm: '오른쪽', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '右边', chineseEn: 'right side', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '오른쪽으로 가세요.', chinese: '请向右走。', chineseEn: 'Please go right.', scene: '问路', sceneEn: 'Asking for directions' },
      { korean: '오른쪽에 있어요.', chinese: '在右边。', chineseEn: 'It\'s on the right.', scene: '出行', sceneEn: 'Travel' },
    ],
    tags: ['出行', '问路'], emotionTags: [], relatedWords: ['trans-08'],
  },
  {
    id: 'trans-08', korean: '왼쪽', romanization: 'oenjjok', baseForm: '왼쪽', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '左边', chineseEn: 'left side', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '왼쪽으로 도세요.', chinese: '请左转。', chineseEn: 'Please turn left.', scene: '问路', sceneEn: 'Asking for directions' },
      { korean: '왼쪽에 편의점이 있어요.', chinese: '左边有便利店。', chineseEn: 'There\'s a convenience store on the left.', scene: '出行', sceneEn: 'Travel' },
    ],
    tags: ['出行', '问路'], emotionTags: [], relatedWords: ['trans-07'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 6. EMOTIONS & FEELINGS 情感表达
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'emotion-01', korean: '좋다', romanization: 'jota', baseForm: '좋다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '1', frequency: 3,
    meanings: [{ chinese: '好；喜欢', chineseEn: 'good; like', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '오늘 기분이 좋아요.', chinese: '今天心情很好。', chineseEn: 'I\'m in a good mood today.', scene: '日常', sceneEn: 'Daily' },
      { korean: '한국어가 좋아요.', chinese: '我喜欢韩语。', chineseEn: 'I like Korean.', scene: '学习', sceneEn: 'to study' },
    ],
    tags: ['日常', '表白情感'], emotionTags: ['开心'], relatedWords: ['emotion-02', 'emotion-03'],
  },
  {
    id: 'emotion-02', korean: '싫다', romanization: 'silta', baseForm: '싫다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '2', frequency: 2,
    meanings: [{ chinese: '讨厌/不喜欢', chineseEn: 'to dislike / to hate', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '비 오는 날이 싫어요.', chinese: '讨厌下雨天。', chineseEn: 'I hate rainy days.', scene: '日常', sceneEn: 'Daily' },
      { korean: '혼자 있는 게 싫어요.', chinese: '不喜欢一个人待着。', chineseEn: 'I don\'t like being alone.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '表白情感'], emotionTags: ['不满'], relatedWords: ['emotion-01'],
  },
  {
    id: 'emotion-03', korean: '행복하다', romanization: 'haengbokhada', baseForm: '행복하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '1', frequency: 3,
    meanings: [{ chinese: '幸福', chineseEn: 'happiness', nuance: '正式/书面', nuanceEn: 'Formal/written', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '너랑 있으면 행복해요.', chinese: '跟你在一起很幸福。', chineseEn: 'I\'m happy with you.', scene: '表白情感', sceneEn: 'expressing emotions' },
      { korean: '행복한 하루 보내세요.', chinese: '祝你有幸福的一天。', chineseEn: 'Have a happy day.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['表白情感', '社交'], emotionTags: ['开心'], relatedWords: ['emotion-01', 'emotion-04'],
  },
  {
    id: 'emotion-04', korean: '슬프다', romanization: 'seulpeuda', baseForm: '슬프다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '2', frequency: 3,
    meanings: [{ chinese: '悲伤', chineseEn: 'sadness', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이 노래가 너무 슬퍼요.', chinese: '这首歌太悲伤了。', chineseEn: 'This song is too sad.', scene: '日常', sceneEn: 'Daily' },
      { korean: '슬픈 영화를 봤어요.', chinese: '看了悲伤的电影。', chineseEn: 'Watched a sad movie.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '韩剧'], emotionTags: ['伤心'], relatedWords: ['emotion-05'],
  },
  {
    id: 'emotion-05', korean: '화나다', romanization: 'hwanada', baseForm: '화나다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '生气', chineseEn: 'Angry', nuance: '一般生气，最常用', nuanceEn: 'Generally angry, most commonly used', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '정말 화나요!', chinese: '真的很生气！', chineseEn: 'I\'m really angry!', scene: '日常', sceneEn: 'Daily' },
      { korean: '왜 화났어요?', chinese: '为什么生气了？', chineseEn: 'Why are you angry?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '表达不满'], emotionTags: ['生气'], relatedWords: ['emotion-06', 'emotion-07', 'emotion-08'],
  },
  {
    id: 'emotion-06', korean: '짜증나다', romanization: 'jjajeungnada', baseForm: '짜증나다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '烦躁/不耐烦', chineseEn: 'irritated/impatient', nuance: '口语，比화나다更日常', nuanceEn: 'Colloquial, more everyday than 화나다', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '아, 짜증나!', chinese: '啊，烦死了！', chineseEn: 'Ugh, so annoying!', scene: '日常', sceneEn: 'Daily' },
      { korean: '더워서 짜증나요.', chinese: '太热了好烦躁。', chineseEn: 'It\'s so hot, I\'m so irritated.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '表达不满', '韩剧'], emotionTags: ['生气'], relatedWords: ['emotion-05', 'emotion-07'],
  },
  {
    id: 'emotion-07', korean: '열받다', romanization: 'yeolbatda', baseForm: '열받다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '火大/气炸了', chineseEn: 'furious/exploding with anger', nuance: '网络用语，年轻人常用', nuanceEn: 'Internet slang, commonly used by young people', register: '口语/网络', registerEn: 'Colloquial/internet' },
    ],
    examples: [
      { korean: '진짜 열받아서 말이 안 나와.', chinese: '真的太火大了说不出话。', chineseEn: 'I\'m so furious I can\'t even speak.', scene: '日常', sceneEn: 'Daily' },
      { korean: '열받을 때는 운동이 최고예요.', chinese: '火大的时候运动最好了。', chineseEn: 'Exercising is the best when you\'re angry.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '表达不满', '韩流'], emotionTags: ['生气'], relatedWords: ['emotion-05', 'emotion-06'],
  },
  {
    id: 'emotion-08', korean: '분하다', romanization: 'bunhada', baseForm: '분하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '4', frequency: 1,
    meanings: [
      { chinese: '委屈而愤怒', chineseEn: 'hurt and angry', nuance: '带有不甘的情绪', nuanceEn: 'Carries a feeling of frustration', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '열심히 했는데 안 돼서 분해요.', chinese: '努力了却不行，很委屈。', chineseEn: 'I tried hard but it didn\'t work, so I feel wronged.', scene: '日常', sceneEn: 'Daily' },
      { korean: '분한 마음을 참을 수가 없어요.', chinese: '委屈的心情忍不了。', chineseEn: 'I can\'t stand this feeling of being wronged.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '表达不满'], emotionTags: ['生气', '伤心'], relatedWords: ['emotion-05'],
  },
  {
    id: 'emotion-09', korean: '부끄럽다', romanization: 'bukkeureopda', baseForm: '부끄럽다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 2,
    meanings: [{ chinese: '害羞/不好意思', chineseEn: 'shyness/embarrassment', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '칭찬 받아서 부끄러워요.', chinese: '被夸了不好意思。', chineseEn: 'I feel shy when praised.', scene: '社交', sceneEn: 'Social' },
      { korean: '부끄러워하지 마세요.', chinese: '别害羞。', chineseEn: 'Don\'t be shy.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['社交', '表白情感'], emotionTags: ['害羞'], relatedWords: [],
  },
  {
    id: 'emotion-10', korean: '걱정하다', romanization: 'geokjeonghada', baseForm: '걱정하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 3,
    meanings: [{ chinese: '担心', chineseEn: 'worry', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '걱정하지 마세요.', chinese: '别担心。', chineseEn: 'Don\'t worry.', scene: '日常', sceneEn: 'Daily' },
      { korean: '시험 때문에 걱정돼요.', chinese: '因为考试而担心。', chineseEn: 'Worried about the exam.', scene: '学习', sceneEn: 'to study' },
    ],
    tags: ['日常', '学习', '社交'], emotionTags: ['担心'], relatedWords: ['emotion-11'],
  },
  {
    id: 'emotion-11', korean: '기쁘다', romanization: 'gippeuda', baseForm: '기쁘다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 2,
    meanings: [{ chinese: '高兴/喜悦', chineseEn: 'happiness/joy', nuance: '正式/书面', nuanceEn: 'Formal/written', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '만나서 정말 기뻐요.', chinese: '见到你真的很高兴。', chineseEn: 'I\'m really glad to see you.', scene: '社交', sceneEn: 'Social' },
      { korean: '기쁜 소식이 있어요!', chinese: '有好消息！', chineseEn: 'I have good news!', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['社交', '表白情感'], emotionTags: ['开心'], relatedWords: ['emotion-01'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 7. FAMILY & PEOPLE 家庭与人
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'family-01', korean: '엄마', romanization: 'eomma', baseForm: '엄마', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '妈妈', chineseEn: 'Mom', nuance: '口语，最常用称呼', nuanceEn: 'Colloquial, most common term of address', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '엄마, 사랑해요.', chinese: '妈妈，我爱你。', chineseEn: 'Mom, I love you.', scene: '日常', sceneEn: 'Daily' },
      { korean: '엄마가 요리한 거예요.', chinese: '是妈妈做的菜。', chineseEn: 'It\'s food Mom made.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['family-02', 'family-03'],
  },
  {
    id: 'family-02', korean: '아빠', romanization: 'appa', baseForm: '아빠', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '爸爸', chineseEn: 'dad', nuance: '口语，最常用称呼', nuanceEn: 'Colloquial, most common term of address', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '아빠는 회사에 가셨어요.', chinese: '爸爸去公司了。', chineseEn: 'Dad went to the office.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['family-01', 'family-03'],
  },
  {
    id: 'family-03', korean: '친구', romanization: 'chingu', baseForm: '친구', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '朋友', chineseEn: 'friend', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '제일 친한 친구예요.', chinese: '是最好的朋友。', chineseEn: 'It\'s the best friend.', scene: '社交', sceneEn: 'Social' },
      { korean: '친구랑 같이 왔어요.', chinese: '和朋友一起来的。', chineseEn: 'I came with a friend.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['family-05'],
  },
  {
    id: 'family-04', korean: '가족', romanization: 'gajok', baseForm: '가족', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '家人/家庭', chineseEn: 'family', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '가족이 몇 명이에요?', chinese: '家里有几口人？', chineseEn: 'How many people are in your family?', scene: '社交', sceneEn: 'Social' },
      { korean: '가족과 함께 살아요.', chinese: '和家人一起住。', chineseEn: 'I live with my family.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['family-01', 'family-02'],
  },
  {
    id: 'family-05', korean: '선배', romanization: 'seonbae', baseForm: '선배', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: '前辈/学长/学姐', chineseEn: 'senior', nuance: '韩国文化特色词', nuanceEn: 'Korean Cultural Terms', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '선배님, 질문 있어요.', chinese: '前辈，我有问题。', chineseEn: 'Senior, I have a question.', scene: '学习', sceneEn: 'to study' },
      { korean: '대학교 선배예요.', chinese: '是大学前辈。', chineseEn: 'He\'s a university senior.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['社交', '学习', '韩流'], emotionTags: [], relatedWords: ['family-06'],
  },
  {
    id: 'family-06', korean: '후배', romanization: 'hubae', baseForm: '후배', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [{ chinese: '后辈/学弟/学妹', chineseEn: 'junior', nuance: '韩国文化特色词', nuanceEn: 'Korean Cultural Terms', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '후배가 열심히 하네요.', chinese: '后辈很努力呢。', chineseEn: 'The junior is working hard.', scene: '学习', sceneEn: 'to study' },
    ],
    tags: ['社交', '学习'], emotionTags: [], relatedWords: ['family-05'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 8. COMMON VERBS 常用动词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'verb-01', korean: '하다', romanization: 'hada', baseForm: '하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '1', frequency: 3,
    meanings: [{ chinese: '做', chineseEn: 'do', nuance: '最核心动词', nuanceEn: 'Most core verb', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '뭐 해요?', chinese: '在做什么？', chineseEn: 'What are you doing?', scene: '日常', sceneEn: 'Daily' },
      { korean: '공부하고 있어요.', chinese: '在学习。', chineseEn: 'I\'m studying.', scene: '学习', sceneEn: 'to study' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['verb-02', 'verb-03'],
  },
  {
    id: 'verb-02', korean: '가다', romanization: 'gada', baseForm: '가다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '1', frequency: 3,
    meanings: [{ chinese: '去', chineseEn: 'Go', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '학교에 가요.', chinese: '去学校。', chineseEn: 'Go to school.', scene: '日常', sceneEn: 'Daily' },
      { korean: '한국에 가고 싶어요.', chinese: '想去韩国。', chineseEn: 'I want to go to Korea.', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['日常', '出行', '旅行'], emotionTags: [], relatedWords: ['verb-03', 'trans-04'],
  },
  {
    id: 'verb-03', korean: '오다', romanization: 'oda', baseForm: '오다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '1', frequency: 3,
    meanings: [{ chinese: '来', chineseEn: 'Come', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '여기로 오세요.', chinese: '请过来。', chineseEn: 'Please come here.', scene: '日常', sceneEn: 'Daily' },
      { korean: '비가 와요.', chinese: '下雨了。', chineseEn: 'It rained.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['verb-02'],
  },
  {
    id: 'verb-04', korean: '먹다', romanization: 'meokda', baseForm: '먹다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '1', frequency: 3,
    meanings: [{ chinese: '吃', chineseEn: 'Eat', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '뭐 먹을까요?', chinese: '吃什么？', chineseEn: 'What should we eat?', scene: '日常', sceneEn: 'Daily' },
      { korean: '한국 음식을 먹어 봤어요?', chinese: '吃过韩国料理吗？', chineseEn: 'Have you tried Korean food?', scene: '餐厅', sceneEn: 'Restaurant' },
    ],
    tags: ['日常', '餐厅'], emotionTags: [], relatedWords: ['verb-05', 'food-01'],
  },
  {
    id: 'verb-05', korean: '마시다', romanization: 'masida', baseForm: '마시다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '1', frequency: 3,
    meanings: [{ chinese: '喝', chineseEn: 'Drink', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '커피 마실래요?', chinese: '喝咖啡吗？', chineseEn: 'Would you like some coffee?', scene: '咖啡厅', sceneEn: 'Café' },
      { korean: '술을 잘 못 마셔요.', chinese: '不太能喝酒。', chineseEn: 'I can\'t drink much.', scene: '餐厅', sceneEn: 'Restaurant' },
    ],
    tags: ['日常', '咖啡厅', '餐厅'], emotionTags: [], relatedWords: ['verb-04', 'food-03'],
  },
  {
    id: 'verb-06', korean: '보다', romanization: 'boda', baseForm: '보다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [{ chinese: '看', chineseEn: 'to see', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '영화 보러 갈래요?', chinese: '去看电影吗？', chineseEn: 'Shall we go see a movie?', scene: '日常', sceneEn: 'Daily' },
      { korean: '이거 한번 보세요.', chinese: '请看一下这个。', chineseEn: 'Please take a look at this.', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['日常', '购物', '韩流'], emotionTags: [], relatedWords: ['verb-07'],
  },
  {
    id: 'verb-07', korean: '듣다', romanization: 'deutda', baseForm: '듣다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [{ chinese: '听', chineseEn: 'Listen', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '음악을 들으면서 공부해요.', chinese: '边听音乐边学习。', chineseEn: 'I study while listening to music.', scene: '日常', sceneEn: 'Daily' },
      { korean: '잘 안 들려요.', chinese: '听不太清楚。', chineseEn: 'I can\'t hear very well.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '韩流'], emotionTags: [], relatedWords: ['verb-06', 'verb-08'],
  },
  {
    id: 'verb-08', korean: '말하다', romanization: 'malhada', baseForm: '말하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [{ chinese: '说/讲话', chineseEn: 'to speak/talk', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국어로 말해 주세요.', chinese: '请用韩语说。', chineseEn: 'Please say it in Korean.', scene: '社交', sceneEn: 'Social' },
      { korean: '천천히 말씀해 주세요.', chinese: '请说慢一点。', chineseEn: 'Please speak more slowly.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['日常', '社交', '学习'], emotionTags: [], relatedWords: ['verb-07', 'verb-09'],
  },
  {
    id: 'verb-09', korean: '알다', romanization: 'alda', baseForm: '알다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [{ chinese: '知道/认识', chineseEn: 'to know', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '알겠습니다.', chinese: '我知道了/明白了。', chineseEn: 'I see/Understood.', scene: '日常', sceneEn: 'Daily' },
      { korean: '그 사람을 알아요?', chinese: '认识那个人吗？', chineseEn: 'Do you know that person?', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['日常', '社交', '学习'], emotionTags: [], relatedWords: ['verb-10'],
  },
  {
    id: 'verb-10', korean: '모르다', romanization: 'moreuda', baseForm: '모르다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [{ chinese: '不知道/不认识', chineseEn: 'I don\'t know.', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '모르겠어요.', chinese: '我不知道。', chineseEn: 'I don\'t know.', scene: '日常', sceneEn: 'Daily' },
      { korean: '한국어를 잘 몰라요.', chinese: '不太懂韩语。', chineseEn: 'I don\'t understand Korean well.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['日常', '学习'], emotionTags: [], relatedWords: ['verb-09'],
  },
  {
    id: 'verb-11', korean: '사다', romanization: 'sada', baseForm: '사다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '买', chineseEn: 'Buy', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이거 살게요.', chinese: '我买这个。', chineseEn: 'I\'ll buy this.', scene: '购物', sceneEn: 'Shopping' },
      { korean: '선물을 샀어요.', chinese: '买了礼物。', chineseEn: 'I bought a gift.', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['购物', '免税店'], emotionTags: [], relatedWords: ['verb-12', 'shop-01'],
  },
  {
    id: 'verb-12', korean: '팔다', romanization: 'palda', baseForm: '팔다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [{ chinese: '卖', chineseEn: 'To sell', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '여기서 뭐 팔아요?', chinese: '这里卖什么？', chineseEn: 'What do they sell here?', scene: '购物', sceneEn: 'Shopping' },
      { korean: '다 팔렸어요.', chinese: '都卖完了。', chineseEn: 'Everything\'s sold out.', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['购物'], emotionTags: [], relatedWords: ['verb-11'],
  },
  {
    id: 'verb-13', korean: '주다', romanization: 'juda', baseForm: '주다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '给', chineseEn: 'To give', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '물 좀 주세요.', chinese: '请给我水。', chineseEn: 'Please give me water.', scene: '日常', sceneEn: 'Daily' },
      { korean: '선물을 줬어요.', chinese: '给了礼物。', chineseEn: 'I gave a gift.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['日常', '社交', '购物'], emotionTags: [], relatedWords: ['verb-11'],
  },
  {
    id: 'verb-14', korean: '기다리다', romanization: 'gidarida', baseForm: '기다리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [{ chinese: '等待', chineseEn: 'Wait', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '잠시만 기다려 주세요.', chinese: '请稍等。', chineseEn: 'Please wait a moment.', scene: '日常', sceneEn: 'Daily' },
      { korean: '오래 기다렸어요?', chinese: '等很久了吗？', chineseEn: 'Have you been waiting long?', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['日常', '社交', '咖啡厅', '餐厅'], emotionTags: [], relatedWords: ['verb-01'],
  },
  {
    id: 'verb-15', korean: '공부하다', romanization: 'gongbuhada', baseForm: '공부하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '学习', chineseEn: 'to study', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국어를 공부하고 있어요.', chinese: '在学韩语。', chineseEn: 'I\'m studying Korean.', scene: '学习', sceneEn: 'to study' },
      { korean: '열심히 공부하세요!', chinese: '请努力学习！', chineseEn: 'Please study hard!', scene: '学习', sceneEn: 'to study' },
    ],
    tags: ['学习', '日常'], emotionTags: [], relatedWords: ['verb-01'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 9. COMMON ADJECTIVES 常用形容词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'adj-01', korean: '크다', romanization: 'keuda', baseForm: '크다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '1', frequency: 3,
    meanings: [{ chinese: '大', chineseEn: 'big', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이거 너무 커요.', chinese: '这个太大了。', chineseEn: 'This is too big.', scene: '购物', sceneEn: 'Shopping' },
      { korean: '꿈이 커요.', chinese: '梦想很大。', chineseEn: 'My dream is big.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '购物'], emotionTags: [], relatedWords: ['adj-02'],
  },
  {
    id: 'adj-02', korean: '작다', romanization: 'jakda', baseForm: '작다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '1', frequency: 3,
    meanings: [{ chinese: '小', chineseEn: 'Small.', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '방이 좀 작아요.', chinese: '房间有点小。', chineseEn: 'The room is a bit small.', scene: '日常', sceneEn: 'Daily' },
      { korean: '더 작은 사이즈 있어요?', chinese: '有更小的尺寸吗？', chineseEn: 'Do you have a smaller size?', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['日常', '购物'], emotionTags: [], relatedWords: ['adj-01'],
  },
  {
    id: 'adj-03', korean: '많다', romanization: 'manta', baseForm: '많다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '2', frequency: 3,
    meanings: [{ chinese: '多', chineseEn: 'many', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '사람이 많아요.', chinese: '人很多。', chineseEn: 'There are a lot of people.', scene: '日常', sceneEn: 'Daily' },
      { korean: '돈이 많이 필요해요.', chinese: '需要很多钱。', chineseEn: 'It costs a lot of money.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['adj-04'],
  },
  {
    id: 'adj-04', korean: '적다', romanization: 'jeokda', baseForm: '적다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '2', frequency: 2,
    meanings: [{ chinese: '少', chineseEn: 'few / little', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '시간이 적게 남았어요.', chinese: '时间剩得很少。', chineseEn: 'There\'s very little time left.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['adj-03'],
  },
  {
    id: 'adj-05', korean: '예쁘다', romanization: 'yeppeuda', baseForm: '예쁘다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '1', frequency: 3,
    meanings: [{ chinese: '漂亮', chineseEn: 'Pretty', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '오늘 정말 예뻐요!', chinese: '今天真漂亮！', chineseEn: 'You look really pretty today!', scene: '社交', sceneEn: 'Social' },
      { korean: '예쁜 카페에 가고 싶어요.', chinese: '想去漂亮的咖啡厅。', chineseEn: 'I want to go to a pretty café.', scene: '咖啡厅', sceneEn: 'Café' },
    ],
    tags: ['日常', '社交', '咖啡厅', '表白情感'], emotionTags: ['开心'], relatedWords: ['adj-06', 'shop-05'],
  },
  {
    id: 'adj-06', korean: '멋있다', romanization: 'meositda', baseForm: '멋있다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '2', frequency: 3,
    meanings: [{ chinese: '帅/酷/棒', chineseEn: 'handsome / cool / great', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '오빠 정말 멋있어요!', chinese: '欧巴真的很帅！', chineseEn: 'Oppa is really handsome!', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '멋있는 차네요.', chinese: '好酷的车啊。', chineseEn: 'That\'s a cool car.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '追星', '表白情感', '韩流'], emotionTags: ['开心'], relatedWords: ['adj-05'],
  },
  {
    id: 'adj-07', korean: '어렵다', romanization: 'eoryeopda', baseForm: '어렵다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 3,
    meanings: [{ chinese: '难', chineseEn: 'difficult', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국어가 어려워요.', chinese: '韩语很难。', chineseEn: 'Korean is hard.', scene: '学习', sceneEn: 'to study' },
      { korean: '이 문제는 너무 어려워요.', chinese: '这个问题太难了。', chineseEn: 'This problem is too hard.', scene: '学习', sceneEn: 'to study' },
    ],
    tags: ['学习', '日常'], emotionTags: [], relatedWords: ['adj-08'],
  },
  {
    id: 'adj-08', korean: '쉽다', romanization: 'swipda', baseForm: '쉽다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 2,
    meanings: [{ chinese: '容易', chineseEn: 'easy', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이 책은 쉬워요.', chinese: '这本书很容易。', chineseEn: 'This book is easy.', scene: '学习', sceneEn: 'to study' },
      { korean: '한국어 발음이 생각보다 쉬워요.', chinese: '韩语发音比想象中容易。', chineseEn: 'Korean pronunciation is easier than I thought.', scene: '学习', sceneEn: 'to study' },
    ],
    tags: ['学习'], emotionTags: [], relatedWords: ['adj-07'],
  },
  {
    id: 'adj-09', korean: '덥다', romanization: 'deopda', baseForm: '덥다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 2,
    meanings: [{ chinese: '热', chineseEn: 'hot', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '오늘 진짜 더워요.', chinese: '今天真热。', chineseEn: 'It\'s really hot today.', scene: '日常', sceneEn: 'Daily' },
      { korean: '한국 여름은 너무 더워요.', chinese: '韩国夏天太热了。', chineseEn: 'Korean summers are too hot.', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: ['adj-10'],
  },
  {
    id: 'adj-10', korean: '춥다', romanization: 'chupda', baseForm: '춥다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 2,
    meanings: [{ chinese: '冷', chineseEn: 'Cold', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '밖에 너무 추워요.', chinese: '外面太冷了。', chineseEn: 'It\'s too cold outside.', scene: '日常', sceneEn: 'Daily' },
      { korean: '겨울에는 추우니까 따뜻하게 입어요.', chinese: '冬天冷，多穿点。', chineseEn: 'It\'s cold in winter, dress warmly.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: ['adj-09'],
  },
  {
    id: 'adj-11', korean: '바쁘다', romanization: 'bappeuda', baseForm: '바쁘다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '4', frequency: 3,
    meanings: [{ chinese: '忙', chineseEn: 'busy', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '요즘 너무 바빠요.', chinese: '最近太忙了。', chineseEn: 'I\'ve been so busy lately.', scene: '日常', sceneEn: 'Daily' },
      { korean: '바쁘실 텐데 와 주셔서 감사합니다.', chinese: '百忙之中前来感谢。', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'adj-12', korean: '재미있다', romanization: 'jaemiitda', baseForm: '재미있다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '4', frequency: 3,
    meanings: [{ chinese: '有趣/好玩', chineseEn: 'fun/interesting', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국어 공부가 재미있어요.', chinese: '学韩语很有趣。', chineseEn: 'Learning Korean is fun.', scene: '学习', sceneEn: 'to study' },
      { korean: '이 드라마 진짜 재미있어요!', chinese: '这部剧真有趣！', chineseEn: 'This drama is really interesting!', scene: '韩剧', sceneEn: 'K-drama' },
    ],
    tags: ['日常', '学习', '韩流', '韩剧'], emotionTags: ['开心'], relatedWords: ['adj-13'],
  },
  {
    id: 'adj-13', korean: '심심하다', romanization: 'simsimhada', baseForm: '심심하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '4', frequency: 2,
    meanings: [{ chinese: '无聊', chineseEn: 'boring', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '심심해요, 뭐 할까요?', chinese: '好无聊，做什么呢？', chineseEn: 'So bored, what should I do?', scene: '日常', sceneEn: 'Daily' },
      { korean: '심심할 때 한국 드라마 봐요.', chinese: '无聊的时候看韩剧。', chineseEn: 'Watch Korean dramas when you\'re bored.', scene: '韩剧', sceneEn: 'K-drama' },
    ],
    tags: ['日常', '韩剧'], emotionTags: [], relatedWords: ['adj-12'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 10. HEALTH & BODY 健康身体
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'health-01', korean: '아프다', romanization: 'apeuda', baseForm: '아프다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '1', frequency: 3,
    meanings: [{ chinese: '疼/生病', chineseEn: 'hurt / be sick', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '배가 아파요.', chinese: '肚子疼。', chineseEn: 'My stomach hurts.', scene: '医院', sceneEn: 'Hospital' },
      { korean: '머리가 아파서 집에서 쉬고 있어요.', chinese: '头疼在家休息。', chineseEn: 'I have a headache, so I\'m resting at home.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '医院'], emotionTags: [], relatedWords: ['health-02', 'health-03'],
  },
  {
    id: 'health-02', korean: '병원', romanization: 'byeongwon', baseForm: '병원', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: '医院', chineseEn: 'Hospital', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '병원에 가야 해요.', chinese: '得去医院。', chineseEn: 'I have to go to the hospital.', scene: '医院', sceneEn: 'Hospital' },
      { korean: '가까운 병원이 어디예요?', chinese: '最近的医院在哪里？', chineseEn: 'Where\'s the nearest hospital?', scene: '出行', sceneEn: 'Travel' },
    ],
    tags: ['医院', '出行'], emotionTags: [], relatedWords: ['health-01', 'health-03'],
  },
  {
    id: 'health-03', korean: '약', romanization: 'yak', baseForm: '약', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: '药', chineseEn: 'medicine', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '약을 먹었어요.', chinese: '吃药了。', chineseEn: 'I took my medicine.', scene: '医院', sceneEn: 'Hospital' },
      { korean: '감기약을 사야 해요.', chinese: '得买感冒药。', chineseEn: 'I need to buy cold medicine.', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['医院', '购物'], emotionTags: [], relatedWords: ['health-01', 'health-02'],
  },
  {
    id: 'health-04', korean: '감기', romanization: 'gamgi', baseForm: '감기', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '感冒', chineseEn: 'cold', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '감기에 걸렸어요.', chinese: '感冒了。', chineseEn: 'I caught a cold.', scene: '医院', sceneEn: 'Hospital' },
      { korean: '감기 조심하세요.', chinese: '小心感冒。', chineseEn: 'Be careful not to catch a cold.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '医院'], emotionTags: [], relatedWords: ['health-01', 'health-03'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 11. WORK & STUDY 职场学习
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'work-01', korean: '일', romanization: 'il', baseForm: '일', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: '工作/事情', chineseEn: 'work/matter', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '무슨 일을 하세요?', chinese: '做什么工作？', chineseEn: 'What do you do for work?', scene: '职场', sceneEn: 'workplace' },
      { korean: '일이 너무 많아요.', chinese: '工作太多了。', chineseEn: 'There\'s too much work.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['职场', '日常'], emotionTags: [], relatedWords: ['work-02'],
  },
  {
    id: 'work-02', korean: '회사', romanization: 'hoesa', baseForm: '회사', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '公司', chineseEn: 'company', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '회사에 다녀요.', chinese: '上班。', chineseEn: 'Go to work.', scene: '职场', sceneEn: 'workplace' },
      { korean: '회사까지 한 시간 걸려요.', chinese: '到公司要一个小时。', chineseEn: 'It takes an hour to get to the office.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['职场'], emotionTags: [], relatedWords: ['work-01'],
  },
  {
    id: 'work-03', korean: '학교', romanization: 'hakgyo', baseForm: '학교', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '学校', chineseEn: 'School', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '학교에 가요.', chinese: '去学校。', chineseEn: 'Go to school.', scene: '学习', sceneEn: 'to study' },
      { korean: '학교 근처에 맛집이 많아요.', chinese: '学校附近有很多好吃的。', chineseEn: 'There are lots of good places to eat near school.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['学习', '日常'], emotionTags: [], relatedWords: ['work-04'],
  },
  {
    id: 'work-04', korean: '시험', romanization: 'siheom', baseForm: '시험', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '考试', chineseEn: 'exam', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '다음 주에 시험이 있어요.', chinese: '下周有考试。', chineseEn: 'There\'s an exam next week.', scene: '学习', sceneEn: 'to study' },
      { korean: 'TOPIK 시험을 준비하고 있어요.', chinese: '在准备TOPIK考试。', chineseEn: 'I\'m preparing for the TOPIK exam.', scene: '学习', sceneEn: 'to study' },
    ],
    tags: ['学习', 'TOPIK'], emotionTags: ['担心'], relatedWords: ['verb-15'],
  },
  {
    id: 'work-05', korean: '돈', romanization: 'don', baseForm: '돈', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 3,
    meanings: [{ chinese: '钱', chineseEn: 'money', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '돈이 없어요.', chinese: '没钱。', chineseEn: 'I have no money.', scene: '日常', sceneEn: 'Daily' },
      { korean: '돈을 많이 벌고 싶어요.', chinese: '想赚很多钱。', chineseEn: 'I want to earn a lot of money.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['日常', '职场', '购物'], emotionTags: [], relatedWords: ['shop-01'],
  },
  {
    id: 'work-06', korean: '이메일', romanization: 'imeil', baseForm: '이메일', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '6', frequency: 2,
    meanings: [{ chinese: '邮件', chineseEn: 'email', nuance: '外来词（英语）', nuanceEn: 'Loanword (English)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이메일 보내 주세요.', chinese: '请发邮件。', chineseEn: 'Please send an email.', scene: '职场', sceneEn: 'workplace' },
      { korean: '이메일 확인했어요?', chinese: '确认邮件了吗？', chineseEn: 'Did you check the email?', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['职场'], emotionTags: [], relatedWords: ['work-07'],
  },
  {
    id: 'work-07', korean: '연락하다', romanization: 'yeollakhada', baseForm: '연락하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 3,
    meanings: [{ chinese: '联系', chineseEn: 'to contact', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '나중에 연락할게요.', chinese: '之后联系你。', chineseEn: 'I\'ll contact you later.', scene: '社交', sceneEn: 'Social' },
      { korean: '연락처 좀 알려주세요.', chinese: '请告诉我联系方式。', chineseEn: 'Please give me your contact info.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['社交', '职场', '电话沟通'], emotionTags: [], relatedWords: ['work-06'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 12. K-CULTURE 韩流词汇
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'kculture-01', korean: '오빠', romanization: 'oppa', baseForm: '오빠', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '哥哥（女称）/欧巴', chineseEn: 'older brother (female speaker)/oppa', nuance: '韩国文化标志词，粉丝常用', nuanceEn: 'Iconic Korean cultural term, commonly used by fans', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '오빠, 사랑해요!', chinese: '欧巴，我爱你！', chineseEn: 'Oppa, I love you!', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '우리 오빠가 제일 멋있어요.', chinese: '我家欧巴最帅。', chineseEn: 'My oppa is the most handsome.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '表白情感', '社交'], emotionTags: ['开心'], relatedWords: ['kculture-02', 'kculture-03'],
  },
  {
    id: 'kculture-02', korean: '언니', romanization: 'eonni', baseForm: '언니', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '姐姐（女称）', chineseEn: 'Older sister (female speaker)', nuance: '韩国文化标志词', nuanceEn: 'Iconic Korean cultural term', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '언니, 오늘 진짜 예뻐요!', chinese: '姐姐，今天真漂亮！', chineseEn: 'Unnie, you look so pretty today!', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['追星', '韩流', '社交'], emotionTags: [], relatedWords: ['kculture-01', 'kculture-03'],
  },
  {
    id: 'kculture-03', korean: '누나', romanization: 'nuna', baseForm: '누나', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '姐姐（男称）', chineseEn: 'older sister (male speaker)', nuance: '韩国文化标志词', nuanceEn: 'Iconic Korean cultural term', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '누나가 해 줄게.', chinese: '姐姐给你做。', chineseEn: 'I\'ll make it for you, unnie.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['社交'], emotionTags: [], relatedWords: ['kculture-02'],
  },
  {
    id: 'kculture-04', korean: '팬', romanization: 'paen', baseForm: '팬', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 3,
    meanings: [{ chinese: '粉丝', chineseEn: 'Fan', nuance: '外来词（英语fan）', nuanceEn: 'Loanword (English: fan)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '저는 완전 팬이에요!', chinese: '我是忠实粉丝！', chineseEn: 'I\'m a loyal fan!', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '팬 사인회에 가고 싶어요.', chinese: '想去粉丝签名会。', chineseEn: 'I want to go to a fan signing event.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流'], emotionTags: ['开心'], relatedWords: ['kculture-01', 'kculture-06'],
  },
  {
    id: 'kculture-05', korean: '아이돌', romanization: 'aidol', baseForm: '아이돌', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 3,
    meanings: [{ chinese: '偶像/爱豆', chineseEn: 'idol', nuance: '韩国娱乐文化核心词', nuanceEn: 'Core term in Korean entertainment culture', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '좋아하는 아이돌이 누구예요?', chinese: '喜欢的偶像是谁？', chineseEn: 'Who is your favorite idol?', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '아이돌 연습생이었어요.', chinese: '曾经是偶像练习生。', chineseEn: 'Used to be a trainee idol.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流'], emotionTags: [], relatedWords: ['kculture-01', 'kculture-04'],
  },
  {
    id: 'kculture-06', korean: '드라마', romanization: 'deurama', baseForm: '드라마', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 3,
    meanings: [{ chinese: '电视剧/韩剧', chineseEn: 'TV drama/K-drama', nuance: '外来词（英语drama）', nuanceEn: 'Loanword (English: drama)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '요즘 무슨 드라마 봐요?', chinese: '最近看什么韩剧？', chineseEn: 'What K-drama are you watching these days?', scene: '韩剧', sceneEn: 'K-drama' },
      { korean: '이 드라마 진짜 재미있어요.', chinese: '这部剧真好看。', chineseEn: 'This drama is really good.', scene: '韩剧', sceneEn: 'K-drama' },
    ],
    tags: ['韩剧', '韩流'], emotionTags: [], relatedWords: ['kculture-07', 'adj-12'],
  },
  {
    id: 'kculture-07', korean: '예능', romanization: 'yeneung', baseForm: '예능', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '综艺节目', chineseEn: 'Variety show', nuance: '韩国放送术语', nuanceEn: 'Korean broadcasting term', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국 예능을 보면서 한국어를 배워요.', chinese: '看韩国综艺学韩语。', chineseEn: 'Learn Korean by watching Korean variety shows.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '이 예능 프로그램 정말 웃겨요.', chinese: '这综艺节目真好笑。', chineseEn: 'This variety show is really funny.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '韩流'], emotionTags: ['开心'], relatedWords: ['kculture-06'],
  },
  {
    id: 'kculture-08', korean: '화장품', romanization: 'hwajangpum', baseForm: '화장품', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '6', frequency: 2,
    meanings: [{ chinese: '化妆品', chineseEn: 'Cosmetics', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국 화장품 정말 좋아요.', chinese: '韩国化妆品真的很好。', chineseEn: 'Korean cosmetics are really good.', scene: '美妆', sceneEn: 'Beauty' },
      { korean: '면세점에서 화장품 샀어요.', chinese: '在免税店买了化妆品。', chineseEn: 'Bought cosmetics at the duty-free shop.', scene: '免税店', sceneEn: 'Duty-free shop' },
    ],
    tags: ['美妆', '免税店', '购物'], emotionTags: [], relatedWords: ['shop-05', 'verb-11'],
  },
  {
    id: 'kculture-09', korean: '스킨케어', romanization: 'seukinkeeo', baseForm: '스킨케어', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 1,
    meanings: [{ chinese: '护肤', chineseEn: 'skincare', nuance: '外来词（英语skincare）', nuanceEn: 'Loanword (English: skincare)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국 스킨케어 루틴 따라 해 봤어요.', chinese: '试了韩国护肤流程。', chineseEn: 'Tried the Korean skincare routine.', scene: '美妆', sceneEn: 'Beauty' },
    ],
    tags: ['美妆', '韩流'], emotionTags: [], relatedWords: ['kculture-08'],
  },
  {
    id: 'kculture-10', korean: '대박', romanization: 'daebak', baseForm: '대박', partOfSpeech: '感叹词', partOfSpeechEn: 'Interjection',
    level: '6', frequency: 3,
    meanings: [
      { chinese: '太厉害了/太棒了/天啊', chineseEn: 'Amazing/Awesome/Oh my god', nuance: '口语感叹词，综艺高频', nuanceEn: 'Colloquial exclamation, common in variety shows', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '대박! 이거 진짜 맛있어요.', chinese: '天啊！这个真好吃。', chineseEn: 'Oh my god! This is really delicious.', scene: '日常', sceneEn: 'Daily' },
      { korean: '대박! 어떻게 알았어요?', chinese: '太厉害了！怎么知道的？', chineseEn: 'Amazing! How did you know?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '综艺', '韩流'], emotionTags: ['开心', '惊讶'], relatedWords: [],
  },
  {
    id: 'kculture-11', korean: '콘서트', romanization: 'konseuteu', baseForm: '콘서트', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '演唱会/音乐会', chineseEn: 'Concert', nuance: '外来词（英语concert）', nuanceEn: 'Loanword (English: concert)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '콘서트 티켓을 샀어요.', chinese: '买了演唱会门票。', chineseEn: 'Bought concert tickets.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '콘서트가 너무 감동적이었어요.', chinese: '演唱会太感人了。', chineseEn: 'The concert was so moving.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '音乐'], emotionTags: ['开心', '感动'], relatedWords: ['kculture-04', 'kculture-21'],
  },
  {
    id: 'kculture-12', korean: '앨범', romanization: 'aelbeom', baseForm: '앨범', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '专辑', chineseEn: 'Album', nuance: '外来词（英语album）', nuanceEn: 'Loanword (English: album)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '새 앨범이 나왔어요.', chinese: '新专辑出来了。', chineseEn: 'The new album is out.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '앨범을 예약 구매했어요.', chinese: '预购了专辑。', chineseEn: 'Pre-ordered the album.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '音乐'], emotionTags: ['开心'], relatedWords: ['kculture-05', 'kculture-13'],
  },
  {
    id: 'kculture-13', korean: '노래', romanization: 'norae', baseForm: '노래', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '歌曲/歌', chineseEn: 'Song', nuance: '中性，日常高频词', nuanceEn: 'Neutral, high-frequency in daily use', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이 노래 정말 좋아요.', chinese: '这首歌真的很好听。', chineseEn: 'This song is really good.', scene: '日常', sceneEn: 'Daily' },
      { korean: '노래방에 같이 가요!', chinese: '一起去KTV吧！', chineseEn: 'Let\'s go to karaoke together!', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['音乐', '日常', '追星'], emotionTags: ['开心'], relatedWords: ['kculture-12'],
  },
  {
    id: 'kculture-14', korean: '무대', romanization: 'mudae', baseForm: '무대', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '舞台/演出', chineseEn: 'Stage/Performance', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '무대 위에서 정말 빛났어요.', chinese: '在舞台上真的很闪耀。', chineseEn: 'Really shines on stage.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '오늘 무대 너무 완벽해요.', chinese: '今天的舞台太完美了。', chineseEn: 'Today\'s stage was perfect.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '音乐'], emotionTags: ['感动', '开心'], relatedWords: ['kculture-15', 'kculture-11'],
  },
  {
    id: 'kculture-15', korean: '안무', romanization: 'anmu', baseForm: '안무', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '编舞/舞蹈动作', chineseEn: 'Choreography/Dance moves', nuance: '专业用语', nuanceEn: 'Technical term', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이번 안무가 너무 어려워요.', chinese: '这次的编舞太难了。', chineseEn: 'This choreography is too hard.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '안무 연습 열심히 했어요.', chinese: '认真练习了编舞。', chineseEn: 'I practiced the choreography seriously.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '舞蹈'], emotionTags: [], relatedWords: ['kculture-28', 'kculture-14'],
  },
  {
    id: 'kculture-16', korean: '데뷔', romanization: 'debwi', baseForm: '데뷔', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '出道/首秀', chineseEn: 'debut', nuance: '外来词（法语début）', nuanceEn: 'Loanword (French: début)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '데뷔 몇 년 됐어요?', chinese: '出道几年了？', chineseEn: 'How many years since debut?', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '데뷔 무대가 너무 떨렸어요.', chinese: '出道舞台好紧张。', chineseEn: 'The debut stage was so nerve-wracking.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流'], emotionTags: [], relatedWords: ['kculture-17', 'kculture-05'],
  },
  {
    id: 'kculture-17', korean: '컴백', romanization: 'keombaek', baseForm: '컴백', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '回归/新专辑回归', chineseEn: 'comeback', nuance: '追星常用，外来词（英语comeback）', nuanceEn: 'Common in fandom, loanword (English: comeback)', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '컴백 준비 중이에요.', chinese: '正在准备回归。', chineseEn: 'Preparing for a comeback.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '이번 컴백 진짜 대박이에요!', chinese: '这次回归真的太棒了！', chineseEn: 'This comeback is really amazing!', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流'], emotionTags: ['开心', '期待'], relatedWords: ['kculture-12', 'kculture-16'],
  },
  {
    id: 'kculture-18', korean: '뮤직비디오', romanization: 'myujikbideo', baseForm: '뮤직비디오', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: 'MV/音乐视频', chineseEn: 'MV/music video', nuance: '常简称MV，外来词', nuanceEn: 'Often abbreviated as MV, loanword', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '뮤직비디오 조회수가 1억을 넘었어요.', chinese: 'MV播放量超过了一亿。', chineseEn: 'The MV views exceeded 100 million.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '뮤직비디오 찍는 장소가 어디예요?', chinese: 'MV拍摄地点在哪里？', chineseEn: 'Where was the MV filmed?', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '音乐'], emotionTags: [], relatedWords: ['kculture-12'],
  },
  {
    id: 'kculture-19', korean: '멤버', romanization: 'membeо', baseForm: '멤버', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '成员', chineseEn: 'member', nuance: '外来词（英语member）', nuanceEn: 'Loanword (English: member)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '몇 명의 멤버예요?', chinese: '有几个成员？', chineseEn: 'How many members are there?', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '제 최애 멤버예요.', chinese: '是我最爱的成员。', chineseEn: 'He\'s my favorite member.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流'], emotionTags: [], relatedWords: ['kculture-20', 'kculture-05'],
  },
  {
    id: 'kculture-20', korean: '그룹', romanization: 'geurup', baseForm: '그룹', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '组合/团体', chineseEn: 'group', nuance: '外来词（英语group）', nuanceEn: 'Loanword (English: group)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '좋아하는 그룹이 있어요?', chinese: '有喜欢的组合吗？', chineseEn: 'Do you have a favorite group?', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '그 그룹은 7명이에요.', chinese: '那个组合有7名成员。', chineseEn: 'That group has 7 members.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流'], emotionTags: [], relatedWords: ['kculture-19', 'kculture-21'],
  },
  {
    id: 'kculture-21', korean: '솔로', romanization: 'sollo', baseForm: '솔로', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '单人/独唱', chineseEn: 'solo', nuance: '外来词（英语solo）', nuanceEn: 'Loanword (English: solo)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '솔로 활동도 해요?', chinese: '也有solo活动吗？', chineseEn: 'Do they also do solo activities?', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '솔로 앨범이 나왔어요.', chinese: '出了solo专辑。', chineseEn: 'Released a solo album.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '音乐'], emotionTags: [], relatedWords: ['kculture-20'],
  },
  {
    id: 'kculture-22', korean: '응원', romanization: 'eungwon', baseForm: '응원', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '应援/加油', chineseEn: 'cheer / support', nuance: '中性，追星和日常都用', nuanceEn: 'Neutral, used in both fandom and daily life', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '응원봉을 흔들었어요.', chinese: '挥舞了应援棒。', chineseEn: 'Waved the light stick.', scene: '演唱会', sceneEn: 'Concert' },
      { korean: '항상 응원할게요!', chinese: '永远支持你！', chineseEn: 'I\'ll always support you!', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '社交'], emotionTags: ['开心', '感动'], relatedWords: ['kculture-24', 'kculture-11'],
  },
  {
    id: 'kculture-23', korean: '팬클럽', romanization: 'paenkeullеob', baseForm: '팬클럽', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '粉丝团/官方粉丝会', chineseEn: 'fan club', nuance: '外来词，官方粉丝团专用', nuanceEn: 'Loanword, used for official fan clubs', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '팬클럽에 가입했어요.', chinese: '加入了粉丝团。', chineseEn: 'Joined the fan club.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '팬클럽 이름이 뭐예요?', chinese: '粉丝团名字叫什么？', chineseEn: 'What\'s the fan club name?', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流'], emotionTags: [], relatedWords: ['kculture-04', 'kculture-22'],
  },
  {
    id: 'kculture-24', korean: '사인회', romanization: 'sainhoе', baseForm: '사인회', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [{ chinese: '签名会/见面签售会', chineseEn: 'fan signing event', nuance: '粉丝福利活动', nuanceEn: 'Fan benefit event', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '사인회 당첨됐어요!', chinese: '抽中签名会了！', chineseEn: 'I won the fan signing event!', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '사인회에서 직접 만났어요.', chinese: '在签名会上直接见到了。', chineseEn: 'I met them in person at the signing event.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流'], emotionTags: ['开心', '激动'], relatedWords: ['kculture-04', 'kculture-23'],
  },
  {
    id: 'kculture-25', korean: '직캠', romanization: 'jikkaem', baseForm: '직캠', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [{ chinese: '直拍/固定机位粉丝拍摄', chineseEn: 'Fan cam / fixed-camera fan footage', nuance: '네티즌 용어，专拍某位成员的视频', nuanceEn: 'Netizen term, video focused on one member', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '직캠 영상이 너무 좋아요.', chinese: '直拍视频太好了。', chineseEn: 'The fan cam video is so good.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '직캠 조회수가 폭발했어요.', chinese: '直拍播放量爆了。', chineseEn: 'The fan cam views exploded.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '网络用语'], emotionTags: [], relatedWords: ['kculture-18'],
  },
  {
    id: 'kculture-26', korean: '티켓팅', romanization: 'tikeseutting', baseForm: '티켓팅', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '抢票', chineseEn: 'ticket rush', nuance: '网络用语，指在线抢购演唱会门票', nuanceEn: 'Online slang for snagging concert tickets', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '티켓팅에 성공했어요!', chinese: '抢票成功了！', chineseEn: 'I managed to snag tickets!', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '티켓팅이 너무 어려워요.', chinese: '抢票太难了。', chineseEn: 'Getting tickets is so hard.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流'], emotionTags: ['紧张', '开心'], relatedWords: ['kculture-11'],
  },
  {
    id: 'kculture-27', korean: '최애', romanization: 'choeae', baseForm: '최애', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '最爱/最喜欢的成员', chineseEn: 'Bias / favorite member', nuance: '追星圈用语，最喜欢的偶像或成员', nuanceEn: 'Fandom term, favorite idol or member', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '최애가 누구예요?', chinese: '最爱是谁？', chineseEn: 'Who\'s your bias?', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '제 최애는 이 그룹 리더예요.', chinese: '我的最爱是这个组合的队长。', chineseEn: 'My bias is the group\'s leader.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '网络用语'], emotionTags: ['喜欢'], relatedWords: ['kculture-04', 'kculture-19'],
  },
  {
    id: 'kculture-28', korean: '덕질', romanization: 'deokjil', baseForm: '덕질', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [{ chinese: '粉丝活动/追星日常', chineseEn: 'Fan activities / daily fandom life', nuance: '오타쿠+질 합성어，指追星、收藏周边等粉丝行为', nuanceEn: 'Compound of otaku + jil, refers to fan activities like following idols and collecting merch', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '덕질하는 데 돈을 많이 써요.', chinese: '追星花了很多钱。', chineseEn: 'I\'ve spent a lot of money on fandom.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '덕질이 취미예요.', chinese: '追星是爱好。', chineseEn: 'Being a fan is a hobby.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['追星', '韩流', '网络用语'], emotionTags: ['开心'], relatedWords: ['kculture-29', 'kculture-30'],
  },
  {
    id: 'kculture-29', korean: '입덕', romanization: 'ipdеok', baseForm: '입덕하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '5', frequency: 2,
    meanings: [{ chinese: '入坑/开始追星', chineseEn: 'Falling into the fandom / starting to stan', nuance: '开始成为某偶像粉丝的行为', nuanceEn: 'The act of becoming a fan of an idol', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '언제 입덕했어요?', chinese: '什么时候入坑的？', chineseEn: 'When did you fall into the fandom?', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '그 뮤직비디오 보고 입덕했어요.', chinese: '看了那个MV之后入坑了。', chineseEn: 'I fell in after watching that MV.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '网络用语'], emotionTags: ['喜欢'], relatedWords: ['kculture-28', 'kculture-30'],
  },
  {
    id: 'kculture-30', korean: '탈덕', romanization: 'taldeok', baseForm: '탈덕하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '5', frequency: 1,
    meanings: [{ chinese: '脱坑/不再追某偶像', chineseEn: 'Leaving the fandom / no longer stanning an idol', nuance: '与입덕相对，指退出粉丝圈', nuanceEn: 'Opposite of 입덕, refers to leaving the fandom', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '탈덕하고 싶지 않아요.', chinese: '不想脱坑。', chineseEn: 'I don\'t want to leave the fandom.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '탈덕해도 노래는 좋아해요.', chinese: '就算脱坑了，歌还是喜欢的。', chineseEn: 'Even if I leave the fandom, I still like the songs.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '网络用语'], emotionTags: [], relatedWords: ['kculture-29', 'kculture-28'],
  },
  {
    id: 'kculture-31', korean: '칼군무', romanization: 'kalgunmu', baseForm: '칼군무', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [{ chinese: '刀群舞/整齐划一的集体舞', chineseEn: 'Knife-like dance / perfectly synchronized group dance', nuance: '칼(刀)+군무(群舞)，形容整齐度极高的团体舞蹈', nuanceEn: 'Knife-like group dance, describing highly synchronized group choreography', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '칼군무로 유명한 그룹이에요.', chinese: '是以刀群舞闻名的组合。', chineseEn: 'They\'re a group known for their knife-like dance.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '칼군무 연습이 엄청 힘들었겠다.', chinese: '刀群舞练习一定很累吧。', chineseEn: 'Practicing the knife-like dance must be exhausting.', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '舞蹈'], emotionTags: ['惊讶'], relatedWords: ['kculture-15', 'kculture-14'],
  },
  {
    id: 'kculture-32', korean: '떼창', romanization: 'ttaechang', baseForm: '떼창', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [{ chinese: '集体大合唱/粉丝齐唱', chineseEn: 'Group sing-along / fans singing together', nuance: '떼(一群人)+창(唱)，演唱会粉丝集体唱歌的行为', nuanceEn: 'Fans singing together in unison at a concert', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '떼창 구간에서 소름 돋았어요.', chinese: '集体合唱的部分起鸡皮疙瘩了。', chineseEn: 'The group sing-along part gave me goosebumps.', scene: '演唱会', sceneEn: 'Concert' },
      { korean: '팬들의 떼창이 감동적이었어요.', chinese: '粉丝们的大合唱太感人了。', chineseEn: 'The fans\' sing-along was so moving.', scene: '演唱会', sceneEn: 'Concert' },
    ],
    tags: ['追星', '韩流', '演唱会'], emotionTags: ['感动', '激动'], relatedWords: ['kculture-22', 'kculture-11'],
  },
  {
    id: 'kculture-33', korean: '공방', romanization: 'gongbang', baseForm: '공방', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [{ chinese: '音乐节目现场直播表演', chineseEn: 'Live performance on a music show', nuance: '공개방송(公开广播)的缩写，指在音乐节目上的现场表演', nuanceEn: 'Abbreviation for public broadcast, referring to live performances on music shows', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '공방 직캠 올라왔어요!', chinese: '音乐节目直拍上传了！', chineseEn: 'The music show fancam is uploaded!', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '공방 티켓 어떻게 구해요?', chinese: '音乐节目观众票怎么弄？', chineseEn: 'How do I get audience tickets for a music show?', scene: '追星', sceneEn: 'to be a fan / follow idols' },
    ],
    tags: ['追星', '韩流', '网络用语'], emotionTags: [], relatedWords: ['kculture-25', 'kculture-14'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 13. TRAVEL KOREA 旅行韩国
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'travel-01', korean: '여행', romanization: 'yeohaeng', baseForm: '여행', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '旅行', chineseEn: 'Travel', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국 여행 가고 싶어요.', chinese: '想去韩国旅行。', chineseEn: 'I want to travel to Korea.', scene: '旅行', sceneEn: 'Travel' },
      { korean: '여행 계획을 세웠어요?', chinese: '定好旅行计划了吗？', chineseEn: 'Have you finalized your travel plans?', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['旅行', '日常'], emotionTags: ['开心'], relatedWords: ['travel-02', 'travel-03'],
  },
  {
    id: 'travel-02', korean: '호텔', romanization: 'hotel', baseForm: '호텔', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '酒店', chineseEn: 'hotel', nuance: '外来词（英语hotel）', nuanceEn: 'Loanword (English: hotel)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '호텔을 예약했어요.', chinese: '预订了酒店。', chineseEn: 'I booked a hotel.', scene: '酒店入住', sceneEn: 'Hotel check-in' },
      { korean: '호텔까지 어떻게 가요?', chinese: '到酒店怎么走？', chineseEn: 'How do I get to the hotel?', scene: '出行', sceneEn: 'Travel' },
    ],
    tags: ['旅行', '酒店入住', '出行'], emotionTags: [], relatedWords: ['travel-01', 'travel-03'],
  },
  {
    id: 'travel-03', korean: '예약하다', romanization: 'yeyakhada', baseForm: '예약하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 3,
    meanings: [{ chinese: '预约/预订', chineseEn: 'reservation', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '미리 예약했어요.', chinese: '提前预约了。', chineseEn: 'I made a reservation in advance.', scene: '旅行', sceneEn: 'Travel' },
      { korean: '예약 확인해 주세요.', chinese: '请确认预约。', chineseEn: 'Please confirm the reservation.', scene: '酒店入住', sceneEn: 'Hotel check-in' },
    ],
    tags: ['旅行', '酒店入住', '餐厅'], emotionTags: [], relatedWords: ['travel-02'],
  },
  {
    id: 'travel-04', korean: '여권', romanization: 'yeogwon', baseForm: '여권', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [{ chinese: '护照', chineseEn: 'passport', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '여권 좀 보여 주세요.', chinese: '请出示护照。', chineseEn: 'Please show your passport.', scene: '入境海关', sceneEn: 'Immigration and customs' },
      { korean: '여권을 잃어버렸어요!', chinese: '护照丢了！', chineseEn: 'I lost my passport!', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['旅行', '入境海关'], emotionTags: [], relatedWords: ['travel-05'],
  },
  {
    id: 'travel-05', korean: '비행기', romanization: 'bihaenggi', baseForm: '비행기', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 3,
    meanings: [{ chinese: '飞机', chineseEn: 'airplane', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '비행기 표를 샀어요.', chinese: '买了机票。', chineseEn: 'I bought a plane ticket.', scene: '旅行', sceneEn: 'Travel' },
      { korean: '비행기가 연착됐어요.', chinese: '飞机延误了。', chineseEn: 'The flight is delayed.', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['旅行', '入境海关'], emotionTags: [], relatedWords: ['travel-01', 'travel-04'],
  },
  {
    id: 'travel-06', korean: '관광', romanization: 'gwangwang', baseForm: '관광', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [{ chinese: '观光/旅游', chineseEn: 'Sightseeing/Travel', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '서울 관광 명소 추천해 주세요.', chinese: '请推荐首尔观光景点。', chineseEn: 'Please recommend Seoul sightseeing spots.', scene: '旅行', sceneEn: 'Travel' },
      { korean: '관광하러 왔어요.', chinese: '来旅游的。', chineseEn: 'Here for sightseeing.', scene: '景点打卡', sceneEn: 'Checking in at tourist spots' },
    ],
    tags: ['旅行', '景点打卡'], emotionTags: [], relatedWords: ['travel-01'],
  },
  {
    id: 'travel-07', korean: '사진', romanization: 'sajin', baseForm: '사진', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '照片', chineseEn: 'photo', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '사진 찍어 주세요.', chinese: '请帮我拍照。', chineseEn: 'Please take a photo for me.', scene: '景点打卡', sceneEn: 'Checking in at tourist spots' },
      { korean: '사진 같이 찍을까요?', chinese: '一起拍照吗？', chineseEn: 'Want to take a photo together?', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['旅行', '景点打卡', '社交'], emotionTags: [], relatedWords: ['travel-06'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 14. TECHNOLOGY 科技互联网
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'tech-01', korean: '핸드폰', romanization: 'haendeupon', baseForm: '핸드폰', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '手机', chineseEn: 'phone', nuance: '外来词（英语handphone）', nuanceEn: 'Loanword (English: handphone)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '핸드폰 번호가 뭐예요?', chinese: '手机号是多少？', chineseEn: 'What\'s your phone number?', scene: '社交', sceneEn: 'Social' },
      { korean: '핸드폰을 잃어버렸어요.', chinese: '手机丢了。', chineseEn: 'I lost my phone.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '社交', '网购'], emotionTags: [], relatedWords: ['media-06', 'media-08'],
  },
  {
    id: 'tech-03', korean: '배달', romanization: 'baedal', baseForm: '배달', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 3,
    meanings: [{ chinese: '外卖/配送', chineseEn: 'Delivery', nuance: '韩国生活高频词', nuanceEn: 'High-frequency word for living in Korea', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '배달 시켜 먹을까요?', chinese: '叫外卖吃吗？', chineseEn: 'Shall we order delivery?', scene: '日常', sceneEn: 'Daily' },
      { korean: '배달비가 얼마예요?', chinese: '配送费多少？', chineseEn: 'How much is the delivery fee?', scene: '网购', sceneEn: 'Online shopping' },
    ],
    tags: ['日常', '网购', '餐厅'], emotionTags: [], relatedWords: ['media-06', 'food-11'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 15. MORE VERBS 补充动词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'verb-16', korean: '만나다', romanization: 'mannada', baseForm: '만나다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '见面', chineseEn: 'to meet', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '반갑습니다, 만나서.', chinese: '见到你很开心。', chineseEn: 'Nice to meet you.', scene: '社交', sceneEn: 'Social' },
      { korean: '내일 몇 시에 만날까요?', chinese: '明天几点见面？', chineseEn: 'What time are we meeting tomorrow?', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['社交', '日常', '打招呼'], emotionTags: ['开心'], relatedWords: ['verb-02', 'verb-03'],
  },
  {
    id: 'verb-17', korean: '웃다', romanization: 'utda', baseForm: '웃다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [{ chinese: '笑', chineseEn: 'smile', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '크게 웃으세요!', chinese: '大笑吧！', chineseEn: 'Laugh out loud!', scene: '日常', sceneEn: 'Daily' },
      { korean: '그 농담에 많이 웃었어요.', chinese: '那个笑话让我笑了很多。', chineseEn: 'That joke made me laugh a lot.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['日常', '综艺', '社交'], emotionTags: ['开心'], relatedWords: ['adj-12'],
  },
  {
    id: 'verb-18', korean: '울다', romanization: 'ulda', baseForm: '울다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [{ chinese: '哭', chineseEn: 'Crying', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '슬퍼서 울었어요.', chinese: '因为伤心哭了。', chineseEn: 'I cried because I was sad.', scene: '日常', sceneEn: 'Daily' },
      { korean: '울지 마세요.', chinese: '别哭。', chineseEn: 'Don\'t cry.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '韩剧'], emotionTags: ['伤心'], relatedWords: ['emotion-04'],
  },
  {
    id: 'verb-19', korean: '자다', romanization: 'jada', baseForm: '자다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 3,
    meanings: [{ chinese: '睡觉', chineseEn: 'sleep', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '잘 자요!', chinese: '晚安！', chineseEn: 'Good night!', scene: '日常', sceneEn: 'Daily' },
      { korean: '어젯밤에 잘 잤어요?', chinese: '昨晚睡得好吗？', chineseEn: 'Did you sleep well last night?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '打招呼'], emotionTags: [], relatedWords: ['verb-20'],
  },
  {
    id: 'verb-20', korean: '일어나다', romanization: 'ireonada', baseForm: '일어나다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '起床/起来', chineseEn: 'get up / wake up', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '아침에 일찍 일어났어요.', chinese: '早上起得早。', chineseEn: 'I wake up early in the morning.', scene: '日常', sceneEn: 'Daily' },
      { korean: '일어나세요!', chinese: '起床吧！', chineseEn: 'Get up!', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: ['verb-19', 'time-06'],
  },
  {
    id: 'verb-21', korean: '앉다', romanization: 'anda', baseForm: '앉다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [{ chinese: '坐', chineseEn: 'Sit', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '여기 앉으세요.', chinese: '请坐这里。', chineseEn: 'Please sit here.', scene: '餐厅', sceneEn: 'Restaurant' },
      { korean: '편하게 앉아요.', chinese: '随便坐。', chineseEn: 'Sit anywhere.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['日常', '餐厅', '咖啡厅'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'verb-22', korean: '쉬다', romanization: 'swida', baseForm: '쉬다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [{ chinese: '休息', chineseEn: 'to rest', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '좀 쉬세요.', chinese: '休息一下吧。', chineseEn: 'Let\'s take a break.', scene: '日常', sceneEn: 'Daily' },
      { korean: '주말에는 집에서 쉬어요.', chinese: '周末在家休息。', chineseEn: 'I rest at home on the weekend.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: ['verb-19'],
  },
  {
    id: 'verb-23', korean: '찾다', romanization: 'chatda', baseForm: '찾다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 3,
    meanings: [{ chinese: '找/寻找', chineseEn: 'to look for / to find', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '뭘 찾으세요?', chinese: '您找什么？', chineseEn: 'What are you looking for?', scene: '购物', sceneEn: 'Shopping' },
      { korean: '길을 찾고 있어요.', chinese: '在找路。', chineseEn: 'Looking for the way.', scene: '出行', sceneEn: 'Travel' },
    ],
    tags: ['购物', '出行', '日常'], emotionTags: [], relatedWords: ['verb-09'],
  },
  {
    id: 'verb-24', korean: '도와주다', romanization: 'dowajuda', baseForm: '도와주다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [{ chinese: '帮助', chineseEn: 'help', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '도와주세요!', chinese: '请帮帮我！', chineseEn: 'Please help me!', scene: '日常', sceneEn: 'Daily' },
      { korean: '도와줘서 감사합니다.', chinese: '谢谢你帮我。', chineseEn: 'Thank you for helping me.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['日常', '社交', '出行'], emotionTags: [], relatedWords: ['greet-02'],
  },
  {
    id: 'verb-25', korean: '사랑하다', romanization: 'saranghada', baseForm: '사랑하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '爱', chineseEn: 'love', nuance: '韩剧高频', nuanceEn: 'high-frequency in Korean dramas', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '사랑해요.', chinese: '我爱你。', chineseEn: 'I love you.', scene: '表白情感', sceneEn: 'expressing emotions' },
      { korean: '한국을 사랑해요.', chinese: '我爱韩国。', chineseEn: 'I love Korea.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['表白情感', '韩剧', '社交'], emotionTags: ['开心'], relatedWords: ['emotion-01'],
  },

  // ═══════════════════════════════════════════════════════════════
  // 16. ADVERBS & EXPRESSIONS 副词与表达
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'adv-01', korean: '정말', romanization: 'jeongmal', baseForm: '정말', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '1', frequency: 3,
    meanings: [{ chinese: '真的/非常', chineseEn: 'really / very', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '정말 맛있어요!', chinese: '真的很好吃！', chineseEn: 'It\'s really delicious!', scene: '餐厅', sceneEn: 'Restaurant' },
      { korean: '정말 감사합니다.', chinese: '非常感谢。', chineseEn: 'Thank you very much.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['日常', '社交', '餐厅'], emotionTags: [], relatedWords: ['adv-02'],
  },
  {
    id: 'adv-02', korean: '너무', romanization: 'neomu', baseForm: '너무', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '2', frequency: 3,
    meanings: [{ chinese: '太/过于', chineseEn: 'too / excessively', nuance: '口语高频，可表正面或负面', nuanceEn: 'Common in speech, can be positive or negative', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '너무 좋아요!', chinese: '太好了！', chineseEn: 'That\'s great!', scene: '日常', sceneEn: 'Daily' },
      { korean: '너무 비싸요.', chinese: '太贵了。', chineseEn: 'Too expensive.', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['日常', '购物', '社交'], emotionTags: [], relatedWords: ['adv-01'],
  },
  {
    id: 'adv-03', korean: '조금', romanization: 'jogeum', baseForm: '조금', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '2', frequency: 3,
    meanings: [{ chinese: '一点/稍微', chineseEn: 'a little / slightly', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '조금만 기다려 주세요.', chinese: '请稍等一下。', chineseEn: 'Please wait a moment.', scene: '日常', sceneEn: 'Daily' },
      { korean: '조금 더 주세요.', chinese: '再给我一点。', chineseEn: 'Give me a little more.', scene: '餐厅', sceneEn: 'Restaurant' },
    ],
    tags: ['日常', '餐厅', '购物'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'adv-04', korean: '빨리', romanization: 'ppalli', baseForm: '빨리', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '快点/赶快', chineseEn: 'hurry up / quickly', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '빨리 와요!', chinese: '快来！', chineseEn: 'Come quickly!', scene: '日常', sceneEn: 'Daily' },
      { korean: '빨리빨리 하세요.', chinese: '请快一点。', chineseEn: 'Please hurry.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['日常', '职场', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'adv-05', korean: '천천히', romanization: 'cheoncheonhi', baseForm: '천천히', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '3', frequency: 2,
    meanings: [{ chinese: '慢慢地', chineseEn: 'slowly', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '천천히 말씀해 주세요.', chinese: '请说慢一点。', chineseEn: 'Please speak more slowly.', scene: '社交', sceneEn: 'Social' },
      { korean: '천천히 드세요.', chinese: '请慢用。', chineseEn: 'Please enjoy.', scene: '餐厅', sceneEn: 'Restaurant' },
    ],
    tags: ['日常', '社交', '餐厅'], emotionTags: [], relatedWords: ['adv-04'],
  },
  {
    id: 'adv-06', korean: '같이', romanization: 'gachi', baseForm: '같이', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '4', frequency: 3,
    meanings: [{ chinese: '一起', chineseEn: 'together', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '같이 갈래요?', chinese: '一起去吗？', chineseEn: 'Want to go together?', scene: '日常', sceneEn: 'Daily' },
      { korean: '친구랑 같이 왔어요.', chinese: '和朋友一起来的。', chineseEn: 'I came with a friend.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['family-03'],
  },
  {
    id: 'adv-07', korean: '혼자', romanization: 'honja', baseForm: '혼자', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '4', frequency: 2,
    meanings: [{ chinese: '独自/一个人', chineseEn: 'alone / by oneself', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '혼자 살아요.', chinese: '一个人住。', chineseEn: 'I live alone.', scene: '日常', sceneEn: 'Daily' },
      { korean: '혼자 여행하는 거 좋아해요.', chinese: '喜欢一个人旅行。', chineseEn: 'I like traveling alone.', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: ['adv-06'],
  },
  {
    id: 'adv-08', korean: '항상', romanization: 'hangsang', baseForm: '항상', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '4', frequency: 3,
    meanings: [{ chinese: '总是/一直', chineseEn: 'always / continuously', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '항상 감사합니다.', chinese: '一直很感谢。', chineseEn: 'I\'m always grateful.', scene: '社交', sceneEn: 'Social' },
      { korean: '항상 행복하세요.', chinese: '祝你一直幸福。', chineseEn: 'Wishing you happiness always.', scene: '表白情感', sceneEn: 'expressing emotions' },
    ],
    tags: ['社交', '表白情感'], emotionTags: ['感谢', '开心'], relatedWords: ['greet-02'],
  },


  // ═══════════════════════════════════════════════════════════════
  // THEME EXPANSION 2026-07-16 主题词包扩展专属词条
  // ═══════════════════════════════════════════════════════════════
// ───── theme-airport 机场与航班 (airport-01 ~ airport-40) ─────
{
  id: 'airport-01', korean: '탑승 수속', romanization: 'tapseung susok', baseForm: '탑승 수속', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 3,
  meanings: [
    { chinese: '值机、办理登机手续', chineseEn: 'check-in', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '탑승 수속은 어디서 하나요?', chinese: '值机在哪里办理？', chineseEn: 'Where do I check in?', scene: '机场', sceneEn: 'airport' },
    { korean: '탑승 수속은 두 시간 전부터 시작해요.', chinese: '值机从两小时前开始。', chineseEn: 'Check-in starts two hours before.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-02', korean: '카운터', romanization: 'kaunteo', baseForm: '카운터', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '柜台（值机/航空公司柜台）', chineseEn: 'counter (check-in/airline counter)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '대한항공 카운터가 어디예요?', chinese: '大韩航空柜台在哪里？', chineseEn: 'Where is the Korean Air counter?', scene: '机场', sceneEn: 'airport' },
    { korean: '카운터에서 짐을 부쳤어요.', chinese: '在柜台托运了行李。', chineseEn: 'I checked in my luggage at the counter.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-03', korean: '여권', romanization: 'yeogwon', baseForm: '여권', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '护照', chineseEn: 'passport', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '여권을 보여 주세요.', chinese: '请出示护照。', chineseEn: 'Please show your passport.', scene: '机场', sceneEn: 'airport' },
    { korean: '여권 유효기간을 확인하세요.', chinese: '请确认护照有效期。', chineseEn: 'Please check your passport\'s validity.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '证件'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-04', korean: '항공권', romanization: 'hanggonggwon', baseForm: '항공권', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '机票', chineseEn: 'Flight ticket', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '항공권을 미리 예약했어요.', chinese: '提前订好了机票。', chineseEn: 'I booked the ticket in advance.', scene: '机场', sceneEn: 'airport' },
    { korean: '항공권 이름이 여권과 같아야 해요.', chinese: '机票上的名字必须和护照一致。', chineseEn: 'The name on the ticket must match your passport.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-05', korean: '탑승권', romanization: 'tapseunggwon', baseForm: '탑승권', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [
    { chinese: '登机牌', chineseEn: 'boarding pass', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '탑승권을 보여 주세요.', chinese: '请出示登机牌。', chineseEn: 'Please show your boarding pass.', scene: '机场', sceneEn: 'airport' },
    { korean: '탑승권은 어디서 받아요?', chinese: '登机牌在哪里领？', chineseEn: 'Where do I get my boarding pass?', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-06', korean: '좌석', romanization: 'jwaseok', baseForm: '좌석', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '座位', chineseEn: 'seat', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '좌석 번호가 어떻게 되세요?', chinese: '您的座位号是多少？', chineseEn: 'What\'s your seat number?', scene: '机场', sceneEn: 'airport' },
    { korean: '좌석을 바꿀 수 있을까요?', chinese: '可以换座位吗？', chineseEn: 'Can I change seats?', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-07', korean: '창가 자리', romanization: 'changga jari', baseForm: '창가 자리', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '靠窗座位', chineseEn: 'Window seat', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '창가 자리로 주세요.', chinese: '请给我靠窗的座位。', chineseEn: 'Please give me a window seat.', scene: '机场', sceneEn: 'airport' },
    { korean: '창가 자리는 경치가 좋아요.', chinese: '靠窗的座位风景好。', chineseEn: 'Window seats have a good view.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-08', korean: '통로 자리', romanization: 'tongno jari', baseForm: '통로 자리', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '靠过道座位', chineseEn: 'aisle seat', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '통로 자리가 편해요.', chinese: '靠过道的座位方便。', chineseEn: 'Aisle seats are convenient.', scene: '机场', sceneEn: 'airport' },
    { korean: '통로 자리 있어요?', chinese: '有靠过道的座位吗？', chineseEn: 'Do you have an aisle seat?', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-09', korean: '마일리지', romanization: 'mailliji', baseForm: '마일리지', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '里程（航空积分）', chineseEn: 'miles (airline points)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '마일리지 적립해 주세요.', chinese: '请帮我累积里程。', chineseEn: 'Please add miles to my account.', scene: '机场', sceneEn: 'airport' },
    { korean: '마일리지로 좌석을 업그레이드했어요.', chinese: '用里程升级了座位。', chineseEn: 'I upgraded my seat with miles.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-10', korean: '수하물', romanization: 'suhamul', baseForm: '수하물', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [
    { chinese: '行李（航空用语）', chineseEn: 'baggage (aviation term)', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '수하물은 몇 개까지 되나요?', chinese: '行李最多可以托运几件？', chineseEn: 'How many bags can I check in?', scene: '机场', sceneEn: 'airport' },
    { korean: '수하물을 찾으러 가요.', chinese: '去取行李。', chineseEn: 'Go pick up the luggage.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '行李'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-11', korean: '위탁 수하물', romanization: 'witak suhamul', baseForm: '위탁 수하물', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '托运行李', chineseEn: 'checked luggage', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '위탁 수하물을 부칠게요.', chinese: '我要托运行李。', chineseEn: 'I\'d like to check in my luggage.', scene: '机场', sceneEn: 'airport' },
    { korean: '위탁 수하물은 23kg까지 무료예요.', chinese: '托运行李23公斤以内免费。', chineseEn: 'Checked baggage up to 23kg is free.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '行李'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-12', korean: '기내 반입', romanization: 'ginae banip', baseForm: '기내 반입', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '带上飞机、随身携带', chineseEn: 'carry-on', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '이 가방은 기내 반입 되나요?', chinese: '这个包可以带上飞机吗？', chineseEn: 'Can I take this bag on the plane?', scene: '机场', sceneEn: 'airport' },
    { korean: '액체는 기내 반입이 제한돼요.', chinese: '液体限制带上飞机。', chineseEn: 'Liquid restrictions apply for carry-on items.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '行李'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-13', korean: '무게', romanization: 'muge', baseForm: '무게', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '重量', chineseEn: 'weight', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '짐 무게가 초과됐어요.', chinese: '行李重量超了。', chineseEn: 'Your luggage is over the weight limit.', scene: '机场', sceneEn: 'airport' },
    { korean: '무게를 좀 재 볼게요.', chinese: '我称一下重量。', chineseEn: 'Let me weigh it.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '行李'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-14', korean: '초과', romanization: 'chogwa', baseForm: '초과', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '超过、超出', chineseEn: 'exceed, go over', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '무게가 초과되면 추가 요금이 있어요.', chinese: '重量超了要加收费用。', chineseEn: 'You\'ll be charged extra if the weight is over.', scene: '机场', sceneEn: 'airport' },
    { korean: '3kg 초과예요.', chinese: '超了3公斤。', chineseEn: 'It\'s 3 kilograms over.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '行李'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-15', korean: '캐리어', romanization: 'kaerieo', baseForm: '캐리어', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '行李箱、拉杆箱', chineseEn: 'suitcase, rolling luggage', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '캐리어가 너무 무거워요.', chinese: '行李箱太重了。', chineseEn: 'The suitcase is too heavy.', scene: '机场', sceneEn: 'airport' },
    { korean: '캐리어 바퀴가 고장 났어요.', chinese: '行李箱轮子坏了。', chineseEn: 'The suitcase wheels are broken.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '行李'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-16', korean: '짐', romanization: 'jim', baseForm: '짐', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '行李、东西', chineseEn: 'luggage, belongings', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '짐이 많아요.', chinese: '行李很多。', chineseEn: 'There\'s a lot of luggage.', scene: '机场', sceneEn: 'airport' },
    { korean: '짐을 부칠게요.', chinese: '我要托运行李。', chineseEn: 'I\'d like to check in my luggage.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '行李'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-17', korean: '수하물 찾는 곳', romanization: 'suhamul channeun got', baseForm: '수하물 찾는 곳', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '行李提取处', chineseEn: 'baggage claim', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '수하물 찾는 곳이 어디예요?', chinese: '行李提取处在哪里？', chineseEn: 'Where is baggage claim?', scene: '机场', sceneEn: 'airport' },
    { korean: '수하물 찾는 곳은 1층이에요.', chinese: '行李提取处在一楼。', chineseEn: 'Baggage claim is on the first floor.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '行李'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-18', korean: '보안 검색', romanization: 'boan geomsaek', baseForm: '보안 검색', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '安检、安全检查', chineseEn: 'security check', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '보안 검색을 받아야 해요.', chinese: '需要过安检。', chineseEn: 'You need to go through security.', scene: '机场', sceneEn: 'airport' },
    { korean: '보안 검색대는 저쪽이에요.', chinese: '安检口在那边。', chineseEn: 'The security checkpoint is over there.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '安检'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-19', korean: '출국', romanization: 'chulguk', baseForm: '출국', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '出境、出国', chineseEn: 'departure, going abroad', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '출국 심사를 받으러 가요.', chinese: '去办出境审查。', chineseEn: 'Go handle exit immigration.', scene: '机场', sceneEn: 'airport' },
    { korean: '출국장은 3층이에요.', chinese: '出境大厅在三楼。', chineseEn: 'The departure hall is on the third floor.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '出入境'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-20', korean: '입국', romanization: 'ipguk', baseForm: '입국', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '入境', chineseEn: 'entry, immigration', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '입국 심사가 오래 걸렸어요.', chinese: '入境审查花了很久。', chineseEn: 'Immigration took a long time.', scene: '机场', sceneEn: 'airport' },
    { korean: '입국 신고서를 작성하세요.', chinese: '请填写入境卡。', chineseEn: 'Please fill out the arrival card.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '出入境'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-21', korean: '세관', romanization: 'segwan', baseForm: '세관', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '海关', chineseEn: 'customs', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '세관에서 짐을 검사했어요.', chinese: '海关检查了行李。', chineseEn: 'Customs checked the luggage.', scene: '机场', sceneEn: 'airport' },
    { korean: '신고할 물건이 세관에 있어요?', chinese: '有要向海关申报的东西吗？', chineseEn: 'Do you have anything to declare to customs?', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '出入境'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-22', korean: '면세점', romanization: 'myeonsejeom', baseForm: '면세점', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '免税店', chineseEn: 'Duty-free shop', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '면세점에서 화장품을 샀어요.', chinese: '在免税店买了化妆品。', chineseEn: 'Bought cosmetics at the duty-free shop.', scene: '机场', sceneEn: 'airport' },
    { korean: '면세점은 탑승 전에 들러요.', chinese: '登机前去逛免税店。', chineseEn: 'Go shopping at the duty-free store before boarding.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '购物'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-23', korean: '검색대', romanization: 'geomsaekdae', baseForm: '검색대', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '安检台、检查口', chineseEn: 'security checkpoint', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '검색대에서 노트북을 꺼내세요.', chinese: '在安检台请拿出笔记本电脑。', chineseEn: 'Please take out your laptop at the security checkpoint.', scene: '机场', sceneEn: 'airport' },
    { korean: '검색대 줄이 길어요.', chinese: '安检口排队很长。', chineseEn: 'The line at the security checkpoint is very long.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '安检'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-24', korean: '게이트', romanization: 'geiteu', baseForm: '게이트', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [
    { chinese: '登机口（gate）', chineseEn: 'boarding gate', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '게이트가 어디예요?', chinese: '登机口在哪里？', chineseEn: 'Where is the boarding gate?', scene: '机场', sceneEn: 'airport' },
    { korean: '게이트가 변경됐어요.', chinese: '登机口变了。', chineseEn: 'The boarding gate has changed.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '登机'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-25', korean: '탑승구', romanization: 'tapseunggu', baseForm: '탑승구', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '登机口（正式说法）', chineseEn: 'boarding gate (formal)', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '탑승구는 27번이에요.', chinese: '登机口是27号。', chineseEn: 'The boarding gate is 27.', scene: '机场', sceneEn: 'airport' },
    { korean: '탑승구 앞에서 기다리세요.', chinese: '请在登机口前等候。', chineseEn: 'Please wait in front of the boarding gate.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '登机'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-26', korean: '탑승 시간', romanization: 'tapseung sigan', baseForm: '탑승 시간', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '登机时间', chineseEn: 'boarding time', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '탑승 시간이 언제예요?', chinese: '登机时间是什么时候？', chineseEn: 'What time is boarding?', scene: '机场', sceneEn: 'airport' },
    { korean: '탑승 시간에 늦지 마세요.', chinese: '别错过登机时间。', chineseEn: 'Don\'t miss the boarding time.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '登机'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-27', korean: '탑승하다', romanization: 'tapseunghada', baseForm: '탑승하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '登机、搭乘', chineseEn: 'boarding', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '곧 탑승하겠습니다.', chinese: '马上开始登机。', chineseEn: 'Boarding will begin soon.', scene: '机场', sceneEn: 'airport' },
    { korean: '27번 게이트에서 탑승하세요.', chinese: '请在27号登机口登机。', chineseEn: 'Please board at gate 27.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '登机'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-28', korean: '전광판', romanization: 'jeongwangpan', baseForm: '전광판', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '航班信息显示屏、电子告示牌', chineseEn: 'flight information display', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '전광판에서 게이트를 확인하세요.', chinese: '请在显示屏上确认登机口。', chineseEn: 'Please check the boarding gate on the display.', scene: '机场', sceneEn: 'airport' },
    { korean: '전광판에 연착이라고 떠 있어요.', chinese: '显示屏上写着延误。', chineseEn: 'The display says delayed.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-29', korean: '탑승 안내 방송', romanization: 'tapseung annae bangsong', baseForm: '탑승 안내 방송', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 1,
  meanings: [
    { chinese: '登机广播', chineseEn: 'boarding announcement', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '탑승 안내 방송이 나왔어요.', chinese: '登机广播响了。', chineseEn: 'The boarding announcement has gone off.', scene: '机场', sceneEn: 'airport' },
    { korean: '탑승 안내 방송을 잘 들으세요.', chinese: '请注意听登机广播。', chineseEn: 'Please listen carefully to the boarding announcement.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '登机'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-30', korean: '연착', romanization: 'yeonchak', baseForm: '연착', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '晚点、延误（到达晚）', chineseEn: 'Delay (arriving late)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '비행기가 연착됐어요.', chinese: '飞机延误了。', chineseEn: 'The flight is delayed.', scene: '机场', sceneEn: 'airport' },
    { korean: '연착 이유가 뭐예요?', chinese: '延误的原因是什么？', chineseEn: 'What\'s the reason for the delay?', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '延误'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-31', korean: '결항', romanization: 'gyeolhang', baseForm: '결항', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [
    { chinese: '航班取消、停航', chineseEn: 'Flight cancellation', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '태풍으로 결항됐어요.', chinese: '因为台风航班取消了。', chineseEn: 'The flight was canceled due to the typhoon.', scene: '机场', sceneEn: 'airport' },
    { korean: '결항되면 환불 되나요?', chinese: '航班取消能退款吗？', chineseEn: 'Can I get a refund if the flight is canceled?', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '延误'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-32', korean: '환승', romanization: 'hwanseung', baseForm: '환승', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '中转、转机、换乘', chineseEn: 'Transfer / connection', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '인천에서 환승해요.', chinese: '在仁川转机。', chineseEn: 'Transferring in Incheon.', scene: '机场', sceneEn: 'airport' },
    { korean: '환승 시간이 짧아요.', chinese: '转机时间很短。', chineseEn: 'The connection time is very short.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '中转'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-33', korean: '지연되다', romanization: 'jiyeondoeda', baseForm: '지연되다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '延迟、推迟', chineseEn: 'Delay / postpone', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '출발이 한 시간 지연됐어요.', chinese: '出发推迟了一小时。', chineseEn: 'The departure was delayed by an hour.', scene: '机场', sceneEn: 'airport' },
    { korean: '왜 지연되는지 물어볼게요.', chinese: '我去问一下为什么延迟。', chineseEn: 'Let me ask why it\'s delayed.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '延误'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-34', korean: '놓치다', romanization: 'nochida', baseForm: '놓치다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '错过、没赶上', chineseEn: 'Miss (e.g., a flight)', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '비행기를 놓쳤어요.', chinese: '错过了飞机。', chineseEn: 'Missed the flight.', scene: '机场', sceneEn: 'airport' },
    { korean: '환승 편을 놓칠 뻔했어요.', chinese: '差点没赶上转机。', chineseEn: 'Almost missed the connection.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行', '延误'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-35', korean: '출발', romanization: 'chulbal', baseForm: '출발', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '出发', chineseEn: 'Departure', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '출발 시간이 몇 시예요?', chinese: '出发时间是几点？', chineseEn: 'What time is the departure?', scene: '机场', sceneEn: 'airport' },
    { korean: '출발이 늦어졌어요.', chinese: '出发晚了。', chineseEn: 'The departure was late.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-36', korean: '도착', romanization: 'dochak', baseForm: '도착', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '到达、抵达', chineseEn: 'Arrival', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '도착 시간이 언제예요?', chinese: '到达时间是什么时候？', chineseEn: 'What time is the arrival?', scene: '机场', sceneEn: 'airport' },
    { korean: '도착하면 연락할게요.', chinese: '到了就联系你。', chineseEn: 'I\'ll contact you once I arrive.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-37', korean: '항공사', romanization: 'hanggongsa', baseForm: '항공사', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '航空公司', chineseEn: 'Airline', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '어느 항공사예요?', chinese: '是哪家航空公司？', chineseEn: 'Which airline is it?', scene: '机场', sceneEn: 'airport' },
    { korean: '항공사에 문의해 보세요.', chinese: '请咨询航空公司。', chineseEn: 'Please contact the airline.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-38', korean: '비행기', romanization: 'bihaenggi', baseForm: '비행기', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '1', frequency: 3,
  meanings: [
    { chinese: '飞机', chineseEn: 'airplane', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '비행기가 곧 출발해요.', chinese: '飞机马上出发。', chineseEn: 'The plane is about to depart.', scene: '机场', sceneEn: 'airport' },
    { korean: '비행기 안이 추워요.', chinese: '飞机里面很冷。', chineseEn: 'It\'s cold inside the plane.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-39', korean: '확인하다', romanization: 'hwaginhada', baseForm: '확인하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '确认、查看', chineseEn: 'Check / confirm', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '게이트를 다시 확인하세요.', chinese: '请再确认一下登机口。', chineseEn: 'Please double-check the boarding gate.', scene: '机场', sceneEn: 'airport' },
    { korean: '탑승 시간을 확인했어요.', chinese: '确认了登机时间。', chineseEn: 'The boarding time has been confirmed.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'airport-40', korean: '기다리다', romanization: 'gidarida', baseForm: '기다리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '1', frequency: 3,
  meanings: [
    { chinese: '等待、等', chineseEn: 'wait', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '탑승구에서 기다릴게요.', chinese: '我在登机口等。', chineseEn: 'I\'m waiting at the boarding gate.', scene: '机场', sceneEn: 'airport' },
    { korean: '조금만 기다려 주세요.', chinese: '请稍等一下。', chineseEn: 'Please wait a moment.', scene: '机场', sceneEn: 'airport' },
  ],
  tags: ['机场', '旅行'], emotionTags: [], relatedWords: [],
},

// ───── theme-sightseeing 景点观光购票 (sight-01 ~ sight-40) ─────
{
  id: 'sight-01', korean: '입장권', romanization: 'ipjanggwon', baseForm: '입장권', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [
    { chinese: '门票、入场券', chineseEn: 'ticket, admission', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '입장권 두 장 주세요.', chinese: '请给我两张门票。', chineseEn: 'Please give me two tickets.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '입장권은 매표소에서 사요.', chinese: '门票在售票处买。', chineseEn: 'Tickets are bought at the ticket office.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '购票'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-02', korean: '매표소', romanization: 'maepyoso', baseForm: '매표소', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '售票处', chineseEn: 'Ticket office', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '매표소가 어디예요?', chinese: '售票处在哪里？', chineseEn: 'Where is the ticket office?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '매표소 앞에 줄이 길어요.', chinese: '售票处前排队很长。', chineseEn: 'The line at the ticket office is very long.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '购票'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-03', korean: '성인', romanization: 'seongin', baseForm: '성인', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '成人（票价分类）', chineseEn: 'adult', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '성인 두 명이요.', chinese: '两位成人。', chineseEn: 'Two adults.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '성인 요금은 만 원이에요.', chinese: '成人票是一万韩元。', chineseEn: 'An adult ticket is 10,000 won.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '购票'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-04', korean: '어린이', romanization: 'eorini', baseForm: '어린이', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [
    { chinese: '儿童（票价分类）', chineseEn: 'child', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '어린이는 할인돼요?', chinese: '儿童有优惠吗？', chineseEn: 'Is there a discount for children?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '어린이 한 명 추가할게요.', chinese: '加一个儿童票。', chineseEn: 'Add one child ticket.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '购票'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-05', korean: '할인', romanization: 'harin', baseForm: '할인', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [
    { chinese: '打折、优惠', chineseEn: 'discount', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '학생 할인 되나요?', chinese: '有学生优惠吗？', chineseEn: 'Is there a student discount?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '할인 받으려면 뭐가 필요해요?', chinese: '要享受优惠需要什么？', chineseEn: 'What do you need for the discount?', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '购票'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-06', korean: '무료', romanization: 'muryo', baseForm: '무료', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '免费', chineseEn: 'Free', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '입장이 무료예요.', chinese: '入场免费。', chineseEn: 'Admission is free.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '수요일은 무료 관람이에요.', chinese: '周三免费参观。', chineseEn: 'Free admission on Wednesdays.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '购票'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-07', korean: '통합권', romanization: 'tonghapgwon', baseForm: '통합권', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '联票、通票', chineseEn: 'combo ticket, pass', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '고궁 통합권이 있어요?', chinese: '有故宫联票吗？', chineseEn: 'Is there a palace combo ticket?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '통합권이 더 싸요.', chinese: '联票更便宜。', chineseEn: 'The combo ticket is cheaper.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '购票'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-08', korean: '고궁', romanization: 'gogung', baseForm: '고궁', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '故宫、古代宫殿', chineseEn: 'ancient palace', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '경복궁은 대표적인 고궁이에요.', chinese: '景福宫是代表性的古宫。', chineseEn: 'Gyeongbokgung is a representative ancient palace.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '고궁에서 한복을 입으면 무료예요.', chinese: '在古宫穿韩服可以免费。', chineseEn: 'You can wear hanbok for free at the palace.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '宫殿'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-09', korean: '궁궐', romanization: 'gunggwol', baseForm: '궁궐', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '宫殿、王宫', chineseEn: 'palace', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '이 궁궐은 조선시대에 지었어요.', chinese: '这座宫殿建于朝鲜时代。', chineseEn: 'This palace was built during the Joseon Dynasty.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '궁궐 안이 아주 넓어요.', chinese: '宫殿里面很宽敞。', chineseEn: 'The palace is spacious inside.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '宫殿'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-10', korean: '한복', romanization: 'hanbok', baseForm: '한복', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [
    { chinese: '韩服', chineseEn: 'Hanbok (traditional Korean clothing)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '한복을 빌려 입었어요.', chinese: '租了韩服穿。', chineseEn: 'I rented and wore a hanbok.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '한복 입고 사진 찍었어요.', chinese: '穿韩服拍了照。', chineseEn: 'I took photos wearing a hanbok.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '文化'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-11', korean: '전망대', romanization: 'jeonmangdae', baseForm: '전망대', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '观景台、瞭望台', chineseEn: 'observation deck', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '남산타워 전망대에 올라갔어요.', chinese: '上了南山塔的观景台。', chineseEn: 'I went up to the N Seoul Tower observation deck.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '전망대에서 서울 야경이 보여요.', chinese: '在观景台能看到首尔夜景。', chineseEn: 'You can see Seoul\'s night view from the observation deck.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '南山塔'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-12', korean: '케이블카', romanization: 'keibeulka', baseForm: '케이블카', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '缆车', chineseEn: 'cable car', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '케이블카를 타고 올라가요.', chinese: '坐缆车上去。', chineseEn: 'Take the cable car up.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '케이블카 표는 왕복이에요?', chinese: '缆车票是往返的吗？', chineseEn: 'Is the cable car ticket round-trip?', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '南山塔'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-13', korean: '한강', romanization: 'hangang', baseForm: '한강', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '汉江', chineseEn: 'Han River', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '한강에서 자전거를 탔어요.', chinese: '在汉江骑了自行车。', chineseEn: 'I rode a bike along the Han River.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '한강 야경이 정말 예뻐요.', chinese: '汉江的夜景真美。', chineseEn: 'The night view of the Han River is beautiful.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '汉江'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-14', korean: '유람선', romanization: 'yuramseon', baseForm: '유람선', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '游船、观光船', chineseEn: 'cruise boat', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '한강 유람선을 탔어요.', chinese: '坐了汉江游船。', chineseEn: 'I took a Han River cruise.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '유람선은 한 시간 정도 걸려요.', chinese: '游船大概要一小时。', chineseEn: 'The cruise takes about an hour.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '汉江'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-15', korean: '관람', romanization: 'gwallam', baseForm: '관람', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '参观、观赏', chineseEn: 'visit, view', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '관람 시간이 몇 시까지예요?', chinese: '参观时间到几点？', chineseEn: 'Until what time is visiting allowed?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '관람 순서대로 이동하세요.', chinese: '请按参观顺序移动。', chineseEn: 'Please move in visiting order.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-16', korean: '해설', romanization: 'haeseol', baseForm: '해설', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '讲解、解说', chineseEn: 'guided commentary', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '해설이 언제 시작해요?', chinese: '讲解什么时候开始？', chineseEn: 'When does the guided commentary start?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '해설을 들으면 더 재미있어요.', chinese: '听讲解会更有意思。', chineseEn: 'It\'s more interesting with the commentary.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '讲解'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-17', korean: '해설사', romanization: 'haeseolsa', baseForm: '해설사', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '讲解员、导览员', chineseEn: 'guide', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '해설사가 안내해 줬어요.', chinese: '讲解员带着导览。', chineseEn: 'The guide leads the tour.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '한국어 해설사밖에 없어요?', chinese: '只有韩语讲解员吗？', chineseEn: 'Are there only Korean-speaking guides?', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '讲解'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-18', korean: '오디오 가이드', romanization: 'odio gaideu', baseForm: '오디오 가이드', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '语音导览、语音讲解器', chineseEn: 'Audio guide, audio tour device', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '오디오 가이드를 빌릴 수 있어요?', chinese: '可以租语音导览吗？', chineseEn: 'Can I rent an audio guide?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '오디오 가이드는 중국어도 돼요.', chinese: '语音导览也有中文。', chineseEn: 'The audio guide is also available in Chinese.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '讲解'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-19', korean: '관광 안내소', romanization: 'gwangwang annaeso', baseForm: '관광 안내소', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '旅游咨询处、游客中心', chineseEn: 'Tourist information center, visitor center', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '관광 안내소에서 지도를 받았어요.', chinese: '在游客中心拿了地图。', chineseEn: 'I got a map at the visitor center.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '관광 안내소가 근처에 있어요?', chinese: '附近有游客中心吗？', chineseEn: 'Is there a visitor center nearby?', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-20', korean: '지도', romanization: 'jido', baseForm: '지도', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '地图', chineseEn: 'map', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '지도 한 장 주세요.', chinese: '请给我一张地图。', chineseEn: 'Please give me a map.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '지도에 표시해 주세요.', chinese: '请在地图上标一下。', chineseEn: 'Please mark it on the map.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-21', korean: '사진', romanization: 'sajin', baseForm: '사진', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '1', frequency: 3,
  meanings: [
    { chinese: '照片、相片', chineseEn: 'Photo, picture', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '사진 좀 찍어 주시겠어요?', chinese: '能帮我拍张照吗？', chineseEn: 'Can you take a photo for me?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '사진이 잘 나왔어요.', chinese: '照片拍得很好。', chineseEn: 'The photo turned out great.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '拍照'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-22', korean: '찍다', romanization: 'jjikda', baseForm: '찍다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '拍（照）、照（相）', chineseEn: 'Take (a photo)', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '여기서 사진 찍어도 돼요?', chinese: '这里可以拍照吗？', chineseEn: 'Can I take photos here?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '같이 한 장 찍어요.', chinese: '一起拍一张吧。', chineseEn: 'Let\'s take one together.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '拍照'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-23', korean: '촬영 금지', romanization: 'chwalyeong geumji', baseForm: '촬영 금지', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '禁止拍摄', chineseEn: 'No photography', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '여기는 촬영 금지예요.', chinese: '这里禁止拍摄。', chineseEn: 'Photography is not allowed here.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '촬영 금지 구역에서는 찍지 마세요.', chinese: '禁止拍摄区域内请勿拍照。', chineseEn: 'Please do not take photos in the no-photography zone.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '拍照'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-24', korean: '배경', romanization: 'baegyeong', baseForm: '배경', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '背景（拍照）', chineseEn: 'Background (for photos)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '타워를 배경으로 찍어 주세요.', chinese: '请以塔为背景拍。', chineseEn: 'Please take it with the tower as the background.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '배경이 예쁘게 나왔어요.', chinese: '背景拍得很漂亮。', chineseEn: 'The background looks beautiful in the photo.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '拍照'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-25', korean: '기념품', romanization: 'ginyeompum', baseForm: '기념품', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '纪念品', chineseEn: 'Souvenirs', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '기념품 가게가 어디예요?', chinese: '纪念品店在哪里？', chineseEn: 'Where is the souvenir shop?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '기념품으로 엽서를 샀어요.', chinese: '买了明信片当纪念品。', chineseEn: 'I bought postcards as souvenirs.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '纪念品'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-26', korean: '엽서', romanization: 'yeopseo', baseForm: '엽서', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '明信片', chineseEn: 'postcard', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '엽서 세 장 주세요.', chinese: '请给我三张明信片。', chineseEn: 'Please give me three postcards.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '엽서에 도장을 찍었어요.', chinese: '在明信片上盖了章。', chineseEn: 'I got a stamp on the postcard.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '纪念品'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-27', korean: '자석', romanization: 'jaseok', baseForm: '자석', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 1,
  meanings: [
    { chinese: '磁铁、冰箱贴', chineseEn: 'Magnet, fridge magnet', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '냉장고 자석을 샀어요.', chinese: '买了冰箱贴。', chineseEn: 'I bought a fridge magnet.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '이 자석 얼마예요?', chinese: '这个冰箱贴多少钱？', chineseEn: 'How much is this fridge magnet?', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '纪念品'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-28', korean: '줄을 서다', romanization: 'jureul seoda', baseForm: '줄을 서다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 3,
  meanings: [
    { chinese: '排队', chineseEn: 'stand in line', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '여기서 줄을 서면 돼요?', chinese: '在这里排队就行吗？', chineseEn: 'Is it okay to just line up here?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '줄이 너무 길어요.', chinese: '队伍太长了。', chineseEn: 'The line is too long.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-29', korean: '예매', romanization: 'yemae', baseForm: '예매', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '预订（票）、预售', chineseEn: 'reservation, advance sale', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '표를 미리 예매했어요.', chinese: '提前订好了票。', chineseEn: 'I booked the tickets in advance.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '예매하면 줄 안 서도 돼요.', chinese: '预订的话不用排队。', chineseEn: 'If you reserve, you don\'t have to wait in line.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '购票'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-30', korean: '현장 구매', romanization: 'hyeonjang gumae', baseForm: '현장 구매', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '现场购买', chineseEn: 'on-site purchase', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '현장 구매도 가능해요?', chinese: '现场也能买吗？', chineseEn: 'Can I buy it on-site too?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '현장 구매는 조금 비싸요.', chinese: '现场买稍微贵一点。', chineseEn: 'Buying on-site is a bit more expensive.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '购票'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-31', korean: '입장 시간', romanization: 'ipjang sigan', baseForm: '입장 시간', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '入场时间、开放时间', chineseEn: 'entry time, opening hours', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '입장 시간이 몇 시부터예요?', chinese: '几点开始入场？', chineseEn: 'What time does entry start?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '입장 시간이 지났어요.', chinese: '过了入场时间。', chineseEn: 'We\'ve passed the entry time.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-32', korean: '마감', romanization: 'magam', baseForm: '마감', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '截止、结束（营业/入场）', chineseEn: 'closing, end (business/entry)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '입장 마감이 몇 시예요?', chinese: '几点截止入场？', chineseEn: 'What time is the last entry?', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '표가 마감됐어요.', chinese: '票卖完了。', chineseEn: 'Tickets are sold out.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-33', korean: '휴관일', romanization: 'hyugwanil', baseForm: '휴관일', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '闭馆日、休息日', chineseEn: 'closed day, rest day', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '월요일이 휴관일이에요.', chinese: '周一是闭馆日。', chineseEn: 'Monday is the closed day.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '휴관일에는 문을 안 열어요.', chinese: '闭馆日不开门。', chineseEn: 'It\'s not open on closed days.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-34', korean: '전시', romanization: 'jeonsi', baseForm: '전시', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '展览、展出', chineseEn: 'exhibition, display', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '특별 전시가 열리고 있어요.', chinese: '正在办特别展览。', chineseEn: 'There\'s a special exhibition going on.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '이 전시는 무료예요.', chinese: '这个展览免费。', chineseEn: 'This exhibition is free.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-35', korean: '전통', romanization: 'jeontong', baseForm: '전통', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '传统', chineseEn: 'tradition', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '한국 전통 문화를 체험했어요.', chinese: '体验了韩国传统文化。', chineseEn: 'I experienced traditional Korean culture.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '전통 공연이 곧 시작해요.', chinese: '传统演出马上开始。', chineseEn: 'The traditional performance is about to start.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '文化'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-36', korean: '야경', romanization: 'yagyeong', baseForm: '야경', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '夜景', chineseEn: 'Night view', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '남산 야경이 유명해요.', chinese: '南山的夜景很有名。', chineseEn: 'Namsan\'s night view is famous.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '야경을 보러 올라갔어요.', chinese: '上去看夜景。', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '南山塔'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-37', korean: '전망', romanization: 'jeonmang', baseForm: '전망', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '视野、景观、眺望', chineseEn: 'view, scenery, outlook', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '여기 전망이 정말 좋아요.', chinese: '这里视野真好。', chineseEn: 'The view here is really nice.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '전망이 탁 트였어요.', chinese: '视野很开阔。', chineseEn: 'The view is wide open.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '南山塔'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-38', korean: '들르다', romanization: 'deulleuda', baseForm: '들르다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '顺路去、路过一下', chineseEn: 'drop by, pass by', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '기념품 가게에 들를게요.', chinese: '我去纪念品店逛一下。', chineseEn: 'I\'ll drop by the souvenir shop.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '가는 길에 카페에 들렀어요.', chinese: '路上顺便去了咖啡厅。', chineseEn: 'I stopped by the café on the way.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-39', korean: '구경하다', romanization: 'gugyeonghada', baseForm: '구경하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '观赏、逛、参观', chineseEn: 'view, stroll, visit', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '천천히 구경하세요.', chinese: '请慢慢逛。', chineseEn: 'Take your time looking around.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '궁궐을 구경했어요.', chinese: '逛了宫殿。', chineseEn: 'I visited the palace.', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'sight-40', korean: '입장하다', romanization: 'ipjanghada', baseForm: '입장하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '入场、进场', chineseEn: 'entry, admission', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '표를 보여 주고 입장했어요.', chinese: '出示票后进场了。', chineseEn: 'I showed my ticket and went in.', scene: '景点', sceneEn: 'Tourist attraction' },
    { korean: '몇 시부터 입장할 수 있어요?', chinese: '几点开始可以入场？', chineseEn: 'What time does entry start?', scene: '景点', sceneEn: 'Tourist attraction' },
  ],
  tags: ['景点', '旅行', '购票'], emotionTags: [], relatedWords: [],
},

// ───── theme-guesthouse 民宿与住宿 (ghouse-01 ~ ghouse-40) ─────
{
  id: 'ghouse-01', korean: '게스트하우스', romanization: 'geseuteuhauseu', baseForm: '게스트하우스', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [
    { chinese: '青旅、旅舍、guesthouse', chineseEn: 'hostel, guesthouse', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '홍대 근처 게스트하우스에 묵어요.', chinese: '住在弘大附近的青旅。', chineseEn: 'I\'m staying at a hostel near Hongdae.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '게스트하우스가 호텔보다 싸요.', chinese: '青旅比酒店便宜。', chineseEn: 'Hostels are cheaper than hotels.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '民宿'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-02', korean: '예약', romanization: 'yeyak', baseForm: '예약', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '预订、预约', chineseEn: 'reservation, booking', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '어제 예약했어요.', chinese: '昨天预订了。', chineseEn: 'I made a reservation yesterday.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '예약 확인 좀 해 주세요.', chinese: '请帮我确认一下预订。', chineseEn: 'Please confirm my reservation.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-03', korean: '예약 확인', romanization: 'yeyak hwagin', baseForm: '예약 확인', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '预订确认', chineseEn: 'booking confirmation', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '예약 확인 메일을 받았어요.', chinese: '收到了预订确认邮件。', chineseEn: 'I received the booking confirmation email.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '예약 확인 번호가 뭐예요?', chinese: '预订确认号是多少？', chineseEn: 'What\'s the booking confirmation number?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-04', korean: '체크인', romanization: 'chekeuin', baseForm: '체크인', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [
    { chinese: '入住、办理入住', chineseEn: 'check-in', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '체크인은 몇 시부터예요?', chinese: '几点开始可以入住？', chineseEn: 'What time does check-in start?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '지금 체크인 할 수 있어요?', chinese: '现在可以入住吗？', chineseEn: 'Can I check in now?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-05', korean: '체크아웃', romanization: 'chekeuaut', baseForm: '체크아웃', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [
    { chinese: '退房、办理退房', chineseEn: 'check-out', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '체크아웃은 열한 시예요.', chinese: '退房时间是11点。', chineseEn: 'Check-out time is 11 AM.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '체크아웃 시간을 늦출 수 있어요?', chinese: '退房时间可以晚一点吗？', chineseEn: 'Can check-out time be a bit later?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-06', korean: '도미토리', romanization: 'domitori', baseForm: '도미토리', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '多人间、宿舍房', chineseEn: 'Dorm room, shared room', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '도미토리는 육 인실이에요.', chinese: '多人间是六人房。', chineseEn: 'The dorm room is a six-person room.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '도미토리가 제일 저렴해요.', chinese: '多人间最便宜。', chineseEn: 'The dorm room is the cheapest.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '民宿'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-07', korean: '개인실', romanization: 'gaeinsil', baseForm: '개인실', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '单人间、私人房', chineseEn: 'Single room, private room', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '개인실 있어요?', chinese: '有单人间吗？', chineseEn: 'Do you have a single room?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '개인실은 화장실이 딸려 있어요.', chinese: '单人间带卫生间。', chineseEn: 'The single room has a private bathroom.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '民宿'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-08', korean: '이 인실', romanization: 'i insil', baseForm: '이 인실', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '双人间、两人房', chineseEn: 'Double room, twin room', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '이 인실로 예약했어요.', chinese: '订了双人间。', chineseEn: 'I booked a double room.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '이 인실은 침대가 두 개예요.', chinese: '双人间有两张床。', chineseEn: 'The double room has two beds.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '民宿'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-09', korean: '침대', romanization: 'chimdae', baseForm: '침대', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '1', frequency: 3,
  meanings: [
    { chinese: '床', chineseEn: 'Bed', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '침대가 편해요.', chinese: '床很舒服。', chineseEn: 'The bed is very comfortable.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '이층 침대예요.', chinese: '是上下铺。', chineseEn: 'It\'s bunk beds.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-10', korean: '층', romanization: 'cheung', baseForm: '층', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '层、楼', chineseEn: 'Floor, level', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '방이 몇 층이에요?', chinese: '房间在几楼？', chineseEn: 'What floor is the room on?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '이 층으로 올라가세요.', chinese: '请上到二楼。', chineseEn: 'Please go up to the second floor.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-11', korean: '공용', romanization: 'gongyong', baseForm: '공용', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '公用、共用', chineseEn: 'Shared, communal', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '화장실은 공용이에요.', chinese: '卫生间是公用的。', chineseEn: 'The bathroom is shared.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '공용 주방을 쓸 수 있어요.', chinese: '可以用公用厨房。', chineseEn: 'You can use the shared kitchen.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '民宿'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-12', korean: '주방', romanization: 'jubang', baseForm: '주방', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '厨房', chineseEn: 'Kitchen', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '주방에서 요리해도 돼요?', chinese: '可以在厨房做饭吗？', chineseEn: 'Can I cook in the kitchen?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '주방은 몇 시까지 써요?', chinese: '厨房用到几点？', chineseEn: 'Until what time is the kitchen available?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '民宿'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-13', korean: '화장실', romanization: 'hwajangsil', baseForm: '화장실', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '1', frequency: 3,
  meanings: [
    { chinese: '卫生间、厕所', chineseEn: 'Bathroom, restroom', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '화장실이 방 안에 있어요?', chinese: '卫生间在房间里吗？', chineseEn: 'Is the bathroom in the room?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '화장실 물이 안 내려가요.', chinese: '厕所水冲不下去。', chineseEn: 'The toilet won\'t flush.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-14', korean: '샤워실', romanization: 'syawosil', baseForm: '샤워실', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '淋浴间', chineseEn: 'Shower room', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '샤워실은 복도 끝에 있어요.', chinese: '淋浴间在走廊尽头。', chineseEn: 'The shower is at the end of the hallway.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '샤워실에 뜨거운 물이 안 나와요.', chinese: '淋浴间没有热水。', chineseEn: 'There\'s no hot water in the shower.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '设施问题'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-15', korean: '수건', romanization: 'sugeon', baseForm: '수건', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [
    { chinese: '毛巾', chineseEn: 'Towel', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '수건을 하나 더 주세요.', chinese: '请再给我一条毛巾。', chineseEn: 'Please give me another towel.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '수건은 어디에 있어요?', chinese: '毛巾在哪里？', chineseEn: 'Where are the towels?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '设施'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-16', korean: '이불', romanization: 'ibul', baseForm: '이불', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [
    { chinese: '被子', chineseEn: 'quilt', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '이불이 좀 얇아요.', chinese: '被子有点薄。', chineseEn: 'The blanket is a bit thin.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '이불을 하나 더 받을 수 있어요?', chinese: '可以多要一床被子吗？', chineseEn: 'Can I get an extra blanket?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '设施'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-17', korean: '와이파이', romanization: 'waipai', baseForm: '와이파이', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: 'WiFi、无线网', chineseEn: 'WiFi, wireless internet', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '와이파이 비밀번호가 뭐예요?', chinese: 'WiFi密码是多少？', chineseEn: 'What\'s the WiFi password?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '와이파이가 잘 안 돼요.', chinese: 'WiFi连不上。', chineseEn: 'The WiFi won\'t connect.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '设施'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-18', korean: '비밀번호', romanization: 'bimilbeonho', baseForm: '비밀번호', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '密码', chineseEn: 'PIN', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '현관 비밀번호가 뭐예요?', chinese: '大门密码是多少？', chineseEn: 'What\'s the door code?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '비밀번호를 눌러 주세요.', chinese: '请输入密码。', chineseEn: 'Please enter your PIN.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-19', korean: '현관', romanization: 'hyeongwan', baseForm: '현관', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '玄关、大门口', chineseEn: 'Entryway, front door', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '현관에서 신발을 벗어요.', chinese: '在玄关脱鞋。', chineseEn: 'Take off your shoes at the entryway.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '현관문 비밀번호를 알려 주세요.', chinese: '请告诉我大门密码。', chineseEn: 'Please tell me the door code.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '民宿'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-20', korean: '열쇠', romanization: 'yeolsoe', baseForm: '열쇠', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [
    { chinese: '钥匙', chineseEn: 'Key', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '방 열쇠를 잃어버렸어요.', chinese: '房间钥匙丢了。', chineseEn: 'I lost my room key.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '열쇠를 여기 두고 가세요.', chinese: '请把钥匙放在这里再走。', chineseEn: 'Please leave the key here before you go.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-21', korean: '난방', romanization: 'nanbang', baseForm: '난방', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '暖气、供暖', chineseEn: 'Heating', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '난방이 안 들어와요.', chinese: '暖气不热。', chineseEn: 'The heating isn\'t warm.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '난방 좀 올려 주세요.', chinese: '请把暖气调高一点。', chineseEn: 'Please turn up the heating.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '设施问题'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-22', korean: '에어컨', romanization: 'eeokeon', baseForm: '에어컨', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '空调', chineseEn: 'air conditioner', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '에어컨이 고장 났어요.', chinese: '空调坏了。', chineseEn: 'The air conditioner is broken.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '에어컨 리모컨이 어디 있어요?', chinese: '空调遥控器在哪里？', chineseEn: 'Where\'s the AC remote?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '设施问题'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-23', korean: '온수', romanization: 'onsu', baseForm: '온수', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '热水', chineseEn: 'hot water', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '온수가 안 나와요.', chinese: '不出热水。', chineseEn: 'No hot water is coming out.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '온수는 몇 시부터 나와요?', chinese: '热水几点开始供应？', chineseEn: 'What time does hot water start?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '设施问题'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-24', korean: '고장 나다', romanization: 'gojang nada', baseForm: '고장 나다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 3,
  meanings: [
    { chinese: '坏了、发生故障', chineseEn: 'Broken, malfunctioning', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '변기가 고장 났어요.', chinese: '马桶坏了。', chineseEn: 'The toilet is broken.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '전등이 고장 난 것 같아요.', chinese: '灯好像坏了。', chineseEn: 'The light seems to be broken.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '设施问题'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-25', korean: '수리', romanization: 'suri', baseForm: '수리', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '修理、维修', chineseEn: 'Repair, maintenance', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '수리를 부탁드려도 될까요?', chinese: '能麻烦帮忙修一下吗？', chineseEn: 'Could you help fix it?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '수리하는 데 얼마나 걸려요?', chinese: '修好要多久？', chineseEn: 'How long will the repair take?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '设施问题'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-26', korean: '방을 바꾸다', romanization: 'bangeul bakkuda', baseForm: '방을 바꾸다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '换房间', chineseEn: 'Change room', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '방을 바꿀 수 있을까요?', chinese: '可以换个房间吗？', chineseEn: 'Can I change rooms?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '옆방으로 바꾸고 싶어요.', chinese: '想换到隔壁房间。', chineseEn: 'I\'d like to move to the room next door.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '设施问题'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-27', korean: '시끄럽다', romanization: 'sikkeureopda', baseForm: '시끄럽다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
  level: '2', frequency: 2,
  meanings: [
    { chinese: '吵、吵闹', chineseEn: 'noisy', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '옆방이 너무 시끄러워요.', chinese: '隔壁房间太吵了。', chineseEn: 'The room next door is too noisy.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '밤에 밖이 시끄러웠어요.', chinese: '晚上外面很吵。', chineseEn: 'It\'s very noisy outside at night.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '设施问题'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-28', korean: '조식', romanization: 'josik', baseForm: '조식', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '早餐（住宿用语）', chineseEn: 'breakfast (lodging)', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '조식이 포함돼 있어요?', chinese: '含早餐吗？', chineseEn: 'Does it include breakfast?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '조식은 몇 시부터예요?', chinese: '早餐几点开始？', chineseEn: 'What time does breakfast start?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '设施'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-29', korean: '포함', romanization: 'poham', baseForm: '포함', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '包含、包括', chineseEn: 'include', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '조식 포함이에요?', chinese: '含早餐吗？', chineseEn: 'Does it include breakfast?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '세금이 포함된 가격이에요.', chinese: '是含税的价格。', chineseEn: 'The price includes tax.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-30', korean: '짐 보관', romanization: 'jim bogwan', baseForm: '짐 보관', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '寄存行李', chineseEn: 'store luggage', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '체크아웃 후에 짐 보관 되나요?', chinese: '退房后可以寄存行李吗？', chineseEn: 'Can I store my luggage after checkout?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '짐 보관은 무료예요.', chinese: '寄存行李免费。', chineseEn: 'Luggage storage is free.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-31', korean: '보증금', romanization: 'bojeunggeum', baseForm: '보증금', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '押金、保证金', chineseEn: 'deposit', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '보증금이 있어요?', chinese: '有押金吗？', chineseEn: 'Is there a deposit?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '보증금은 나갈 때 돌려받아요.', chinese: '押金退房时退还。', chineseEn: 'The deposit is refunded at checkout.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-32', korean: '환불', romanization: 'hwanbul', baseForm: '환불', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '退款、退钱', chineseEn: 'refund', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '예약을 취소하면 환불 되나요?', chinese: '取消预订能退款吗？', chineseEn: 'Can I get a refund if I cancel the reservation?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '환불은 며칠 걸려요?', chinese: '退款要几天？', chineseEn: 'How many days does the refund take?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-33', korean: '취소', romanization: 'chwiso', baseForm: '취소', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '取消', chineseEn: 'cancel', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '예약을 취소하고 싶어요.', chinese: '想取消预订。', chineseEn: 'I\'d like to cancel the reservation.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '무료 취소가 가능해요?', chinese: '可以免费取消吗？', chineseEn: 'Can I cancel for free?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-34', korean: '연장', romanization: 'yeonjang', baseForm: '연장', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '延长、续住', chineseEn: 'extend stay', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '하루 더 연장할 수 있어요?', chinese: '可以再续住一天吗？', chineseEn: 'Can I extend my stay for one more day?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '연장하면 요금이 어떻게 돼요?', chinese: '续住的话费用怎么算？', chineseEn: 'How is the cost calculated for extending the stay?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-35', korean: '묵다', romanization: 'mukda', baseForm: '묵다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '住宿、过夜', chineseEn: 'lodging, overnight stay', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '이틀 묵을 거예요.', chinese: '要住两天。', chineseEn: 'I\'ll stay for two days.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '여기서 며칠 묵으세요?', chinese: '您在这里住几天？', chineseEn: 'How many days are you staying here?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-36', korean: '박', romanization: 'bak', baseForm: '박', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '晚、夜（住宿计量）', chineseEn: 'night (unit for lodging)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '이 박 삼 일 일정이에요.', chinese: '是两晚三天的行程。', chineseEn: 'It\'s a two-night, three-day trip.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '삼 박 예약했어요.', chinese: '订了三晚。', chineseEn: 'I booked three nights.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-37', korean: '주인', romanization: 'juin', baseForm: '주인', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [
    { chinese: '房东、主人（民宿）', chineseEn: 'host, owner (of a guesthouse)', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '주인 아저씨가 친절해요.', chinese: '房东大叔很亲切。', chineseEn: 'The host is very kind.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '주인한테 물어볼게요.', chinese: '我去问一下房东。', chineseEn: 'I\'ll ask the host.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '民宿'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-38', korean: '규칙', romanization: 'gyuchik', baseForm: '규칙', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '规则、规矩', chineseEn: 'rules, regulations', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '숙소 규칙을 지켜 주세요.', chinese: '请遵守住宿规则。', chineseEn: 'Please follow the house rules.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '통금 규칙이 있어요?', chinese: '有门禁规则吗？', chineseEn: 'Is there a curfew rule?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '民宿'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-39', korean: '숙소', romanization: 'sukso', baseForm: '숙소', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [
    { chinese: '住处、住宿地', chineseEn: 'accommodation, lodging place', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '숙소가 역에서 가까워요.', chinese: '住处离车站很近。', chineseEn: 'The accommodation is close to the station.', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '숙소까지 어떻게 가요?', chinese: '到住处怎么走？', chineseEn: 'How do I get to the accommodation?', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行', '民宿'], emotionTags: [], relatedWords: [],
},
{
  id: 'ghouse-40', korean: '위치', romanization: 'wichi', baseForm: '위치', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '位置、地点', chineseEn: 'location, place', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '숙소 위치가 어디예요?', chinese: '住处的位置在哪里？', chineseEn: 'Where is the accommodation located?', scene: '住宿', sceneEn: 'Accommodation' },
    { korean: '위치가 정말 좋아요.', chinese: '位置真好。', chineseEn: 'The location is great.', scene: '住宿', sceneEn: 'Accommodation' },
  ],
  tags: ['住宿', '旅行'], emotionTags: [], relatedWords: [],
},

// ───── theme-emergency 突发状况求助 (emerg-01 ~ emerg-40) ─────
{
  id: 'emerg-01', korean: '도와주세요', romanization: 'dowajuseyo', baseForm: '도와주다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '1', frequency: 3,
  meanings: [
    { chinese: '请帮帮我、救命', chineseEn: 'help me, save me', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '누구 좀 도와주세요!', chinese: '谁来帮帮我！', chineseEn: 'Someone help me!', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '길을 잃었어요, 도와주세요.', chinese: '我迷路了，请帮帮我。', chineseEn: 'I\'m lost, please help me.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '紧急'], emotionTags: ['着急'], relatedWords: [],
},
{
  id: 'emerg-02', korean: '길을 잃다', romanization: 'gireul ilta', baseForm: '길을 잃다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '迷路', chineseEn: 'Lost', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '길을 잃어버렸어요.', chinese: '我迷路了。', chineseEn: 'I\'m lost.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '여기가 어딘지 모르겠어요.', chinese: '不知道这里是哪里。', chineseEn: 'I don\'t know where this place is.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '迷路'], emotionTags: ['着急'], relatedWords: [],
},
{
  id: 'emerg-03', korean: '잃어버리다', romanization: 'ireobeorida', baseForm: '잃어버리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 3,
  meanings: [
    { chinese: '弄丢、丢失', chineseEn: 'to lose, misplace', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '지갑을 잃어버렸어요.', chinese: '钱包丢了。', chineseEn: 'I lost my wallet.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '휴대폰을 어디서 잃어버렸는지 모르겠어요.', chinese: '不知道手机在哪儿弄丢了。', chineseEn: 'I lost my phone somewhere and don\'t know where.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '失物'], emotionTags: ['着急'], relatedWords: [],
},
{
  id: 'emerg-04', korean: '여권', romanization: 'yeogwon', baseForm: '여권', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '护照', chineseEn: 'passport', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '여권을 잃어버렸어요.', chinese: '护照丢了。', chineseEn: 'I lost my passport.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '여권 재발급을 받아야 해요.', chinese: '得补办护照。', chineseEn: 'I need to get a new passport.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '证件'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-05', korean: '지갑', romanization: 'jigap', baseForm: '지갑', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '钱包', chineseEn: 'Wallet', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '지갑을 도둑맞았어요.', chinese: '钱包被偷了。', chineseEn: 'My wallet was stolen.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '지갑 안에 카드가 다 있었어요.', chinese: '钱包里的卡都在里面。', chineseEn: 'All my cards were in my wallet.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '失物'], emotionTags: ['着急'], relatedWords: [],
},
{
  id: 'emerg-06', korean: '휴대폰', romanization: 'hyudaepon', baseForm: '휴대폰', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '手机', chineseEn: 'phone', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '휴대폰을 택시에 두고 내렸어요.', chinese: '手机落在出租车上了。', chineseEn: 'I left my phone in the taxi.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '휴대폰이 안 켜져요.', chinese: '手机开不了机。', chineseEn: 'My phone won\'t turn on.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '失物'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-07', korean: '경찰', romanization: 'gyeongchal', baseForm: '경찰', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '警察', chineseEn: 'Police', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '경찰을 불러 주세요.', chinese: '请帮我叫警察。', chineseEn: 'Please call the police for me.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '경찰서가 어디예요?', chinese: '警察局在哪里？', chineseEn: 'Where is the police station?', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '报警'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-08', korean: '경찰서', romanization: 'gyeongchalseo', baseForm: '경찰서', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [
    { chinese: '警察局、派出所', chineseEn: 'police station', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '가까운 경찰서가 어디 있어요?', chinese: '最近的警察局在哪里？', chineseEn: 'Where is the nearest police station?', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '경찰서에서 신고했어요.', chinese: '在警察局报了案。', chineseEn: 'I filed a report at the police station.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '报警'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-09', korean: '신고하다', romanization: 'singohada', baseForm: '신고하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '报案、举报', chineseEn: 'to report (a crime)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '도난 신고를 하고 싶어요.', chinese: '想报失窃案。', chineseEn: 'I want to report a theft.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '112에 신고했어요.', chinese: '打112报警了。', chineseEn: 'I called 112 to report it.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '报警'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-10', korean: '도둑맞다', romanization: 'dodungmatda', baseForm: '도둑맞다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '被偷、被盗', chineseEn: 'stolen', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '가방을 도둑맞았어요.', chinese: '包被偷了。', chineseEn: 'My bag was stolen.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '지하철에서 도둑맞은 것 같아요.', chinese: '好像在地铁上被偷了。', chineseEn: 'I think it was stolen on the subway.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '报警'], emotionTags: ['着急'], relatedWords: [],
},
{
  id: 'emerg-11', korean: '소매치기', romanization: 'somaechigi', baseForm: '소매치기', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '扒手、小偷', chineseEn: 'pickpocket, thief', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '소매치기를 당했어요.', chinese: '遇到扒手了。', chineseEn: 'I ran into a pickpocket.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '소매치기 조심하세요.', chinese: '小心扒手。', chineseEn: 'Beware of pickpockets.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '报警'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-12', korean: '대사관', romanization: 'daesagwan', baseForm: '대사관', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '大使馆', chineseEn: 'embassy', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '중국 대사관에 전화했어요.', chinese: '给中国大使馆打了电话。', chineseEn: 'I called the Chinese embassy.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '대사관 위치가 어디예요?', chinese: '大使馆位置在哪里？', chineseEn: 'Where is the embassy located?', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '大使馆'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-13', korean: '재발급', romanization: 'jaebalgeup', baseForm: '재발급', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [
    { chinese: '补办、重新发放', chineseEn: 'to reissue', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '여권 재발급이 가능해요?', chinese: '护照可以补办吗？', chineseEn: 'Can I get my passport reissued?', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '재발급에 며칠 걸려요?', chinese: '补办要几天？', chineseEn: 'How many days does it take to get a replacement?', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '大使馆'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-14', korean: '분실 신고', romanization: 'bunsil singo', baseForm: '분실 신고', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 1,
  meanings: [
    { chinese: '挂失、遗失申报', chineseEn: 'Report loss, declare loss', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '카드 분실 신고를 했어요.', chinese: '办了银行卡挂失。', chineseEn: 'I reported my bank card as lost.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '분실 신고 서류를 작성하세요.', chinese: '请填写遗失申报单。', chineseEn: 'Please fill out the loss report form.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '失物'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-15', korean: '분실물 센터', romanization: 'bunsilmul senteo', baseForm: '분실물 센터', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 1,
  meanings: [
    { chinese: '失物招领处', chineseEn: 'lost and found', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '분실물 센터에 가 봤어요?', chinese: '去失物招领处看过了吗？', chineseEn: 'Have you checked the lost and found?', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '지하철 분실물 센터에 문의하세요.', chinese: '请咨询地铁失物招领处。', chineseEn: 'Please ask at the subway lost and found.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '失物'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-16', korean: '찾다', romanization: 'chatda', baseForm: '찾다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '1', frequency: 3,
  meanings: [
    { chinese: '找、寻找', chineseEn: 'Find, look for', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '가방을 찾고 있어요.', chinese: '我在找包。', chineseEn: 'I\'m looking for my bag.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '길을 못 찾겠어요.', chinese: '找不到路。', chineseEn: 'I can\'t find my way.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-17', korean: '아프다', romanization: 'apeuda', baseForm: '아프다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
  level: '1', frequency: 3,
  meanings: [
    { chinese: '疼、难受、不舒服', chineseEn: 'Pain, discomfort, feeling unwell', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '배가 너무 아파요.', chinese: '肚子很疼。', chineseEn: 'My stomach hurts a lot.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '갑자기 머리가 아파요.', chinese: '突然头疼。', chineseEn: 'I suddenly got a headache.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '送医'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-18', korean: '병원', romanization: 'byeongwon', baseForm: '병원', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '1', frequency: 3,
  meanings: [
    { chinese: '医院', chineseEn: 'Hospital', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '가까운 병원이 어디예요?', chinese: '最近的医院在哪里？', chineseEn: 'Where\'s the nearest hospital?', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '병원에 데려다주세요.', chinese: '请带我去医院。', chineseEn: 'Please take me to the hospital.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '送医'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-19', korean: '응급실', romanization: 'eunggeupsil', baseForm: '응급실', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '急诊室', chineseEn: 'Emergency room', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '응급실로 가야 할 것 같아요.', chinese: '好像得去急诊室。', chineseEn: 'I think I need to go to the emergency room.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '응급실은 24시간 열어요?', chinese: '急诊室24小时开吗？', chineseEn: 'Is the emergency room open 24 hours?', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '送医'], emotionTags: ['着急'], relatedWords: [],
},
{
  id: 'emerg-20', korean: '구급차', romanization: 'gugeupcha', baseForm: '구급차', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '救护车', chineseEn: 'Ambulance', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '구급차를 불러 주세요.', chinese: '请帮我叫救护车。', chineseEn: 'Please call an ambulance for me.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '119에 구급차를 요청했어요.', chinese: '打119叫了救护车。', chineseEn: 'I called 119 and got an ambulance.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '送医'], emotionTags: ['着急'], relatedWords: [],
},
{
  id: 'emerg-21', korean: '약국', romanization: 'yakguk', baseForm: '약국', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '药店、药房', chineseEn: 'Pharmacy, drugstore', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '근처에 약국이 있어요?', chinese: '附近有药店吗？', chineseEn: 'Is there a pharmacy nearby?', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '약국에서 감기약을 샀어요.', chinese: '在药店买了感冒药。', chineseEn: 'I bought cold medicine at the pharmacy.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '送医'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-22', korean: '다치다', romanization: 'dachida', baseForm: '다치다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '受伤、弄伤', chineseEn: 'Injured, hurt', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '넘어져서 다쳤어요.', chinese: '摔倒受伤了。', chineseEn: 'I fell and got hurt.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '다리를 다쳤어요.', chinese: '腿受伤了。', chineseEn: 'I injured my leg.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '送医'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-23', korean: '사고', romanization: 'sago', baseForm: '사고', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '事故、意外', chineseEn: 'Accident, incident', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '교통사고가 났어요.', chinese: '出交通事故了。', chineseEn: 'I was in a traffic accident.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '사고 현장을 봤어요.', chinese: '看到事故现场了。', chineseEn: 'I saw the accident scene.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '紧急'], emotionTags: ['着急'], relatedWords: [],
},
{
  id: 'emerg-24', korean: '위험하다', romanization: 'wiheomhada', baseForm: '위험하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
  level: '2', frequency: 2,
  meanings: [
    { chinese: '危险', chineseEn: 'Dangerous', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '여기 위험해요!', chinese: '这里危险！', chineseEn: 'It\'s dangerous here!', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '밤에 이 길은 위험해요.', chinese: '晚上这条路很危险。', chineseEn: 'This road is dangerous at night.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '紧急'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-25', korean: '급하다', romanization: 'geupada', baseForm: '급하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '急、紧急', chineseEn: 'urgent, emergency', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '지금 너무 급해요.', chinese: '现在很急。', chineseEn: 'It\'s urgent right now.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '급한 일이 생겼어요.', chinese: '出了急事。', chineseEn: 'Something urgent came up.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '紧急'], emotionTags: ['着急'], relatedWords: [],
},
{
  id: 'emerg-26', korean: '연락하다', romanization: 'yeollakada', baseForm: '연락하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '联系、联络', chineseEn: 'contact', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '가족에게 연락해야 해요.', chinese: '得联系家人。', chineseEn: 'I need to contact my family.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '대사관에 연락해 주세요.', chinese: '请帮我联系大使馆。', chineseEn: 'Please help me contact the embassy.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-27', korean: '통역', romanization: 'tongyeok', baseForm: '통역', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [
    { chinese: '口译、翻译（人）', chineseEn: 'interpreter, translator', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '중국어 통역이 필요해요.', chinese: '需要中文翻译。', chineseEn: 'I need a Chinese interpreter.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '통역을 불러 주실 수 있어요?', chinese: '能帮我叫翻译吗？', chineseEn: 'Can you call an interpreter for me?', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '大使馆'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-28', korean: '증명서', romanization: 'jeungmyeongseo', baseForm: '증명서', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '证明、证明书', chineseEn: 'proof, certificate', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '분실 증명서를 받았어요.', chinese: '拿到了遗失证明。', chineseEn: 'I got the loss report.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '증명서가 있어야 재발급이 돼요.', chinese: '有证明才能补办。', chineseEn: 'You need proof to get a replacement.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '大使馆'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-29', korean: '신분증', romanization: 'sinbunjeung', baseForm: '신분증', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '身份证件', chineseEn: 'ID, identification', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '신분증을 보여 주세요.', chinese: '请出示身份证件。', chineseEn: 'Please show your ID.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '신분증이 없으면 어떻게 해요?', chinese: '没有身份证件怎么办？', chineseEn: 'What if I don\'t have ID?', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '证件'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-30', korean: '주소', romanization: 'juso', baseForm: '주소', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '地址', chineseEn: 'address', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '숙소 주소를 알려 주세요.', chinese: '请告诉我住处的地址。', chineseEn: 'Please tell me the address of where I\'m staying.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '이 주소로 가 주세요.', chinese: '请到这个地址。', chineseEn: 'Please go to this address.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '迷路'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-31', korean: '근처', romanization: 'geuncheo', baseForm: '근처', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '附近', chineseEn: 'nearby', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '근처에 경찰서가 있어요?', chinese: '附近有警察局吗？', chineseEn: 'Is there a police station nearby?', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '이 근처를 잘 몰라요.', chinese: '这附近我不太熟。', chineseEn: 'I\'m not familiar with this area.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '迷路'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-32', korean: '지하철역', romanization: 'jihacheollyeok', baseForm: '지하철역', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '地铁站', chineseEn: 'subway station', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '가장 가까운 지하철역이 어디예요?', chinese: '最近的地铁站在哪里？', chineseEn: 'Where is the nearest subway station?', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '지하철역까지 데려다주세요.', chinese: '请带我到地铁站。', chineseEn: 'Please take me to the subway station.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '迷路'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-33', korean: '길을 알려 주다', romanization: 'gireul allyeo juda', baseForm: '길을 알려 주다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '指路、告诉路怎么走', chineseEn: 'give directions', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '길 좀 알려 주시겠어요?', chinese: '能帮我指下路吗？', chineseEn: 'Can you give me directions?', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '여기 가는 길을 알려 주세요.', chinese: '请告诉我去这里的路。', chineseEn: 'Please tell me the way to get here.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '迷路'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-34', korean: '데려다주다', romanization: 'deryeodajuda', baseForm: '데려다주다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '带（人）过去、送（人）到', chineseEn: 'take (someone) to, drop off', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '병원까지 데려다주세요.', chinese: '请送我到医院。', chineseEn: 'Please take me to the hospital.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '역까지 데려다줄 수 있어요?', chinese: '能送我到车站吗？', chineseEn: 'Can you take me to the station?', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '迷路'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-35', korean: '전화번호', romanization: 'jeonhwabeonho', baseForm: '전화번호', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '电话号码', chineseEn: 'phone number', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '대사관 전화번호가 뭐예요?', chinese: '大使馆的电话号码是多少？', chineseEn: 'What\'s the embassy\'s phone number?', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '연락할 전화번호를 남겨 주세요.', chinese: '请留下联系电话。', chineseEn: 'Please leave a contact number.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-36', korean: '괜찮다', romanization: 'gwaenchanta', baseForm: '괜찮다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
  level: '1', frequency: 3,
  meanings: [
    { chinese: '没关系、没事、还好', chineseEn: 'it\'s okay, no problem, fine', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '괜찮으세요? 다치셨어요?', chinese: '您没事吧？受伤了吗？', chineseEn: 'Are you okay? Are you hurt?', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '저는 괜찮아요.', chinese: '我没事。', chineseEn: 'I\'m fine.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-37', korean: '천천히', romanization: 'cheoncheonhi', baseForm: '천천히', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '慢慢地', chineseEn: 'slowly', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '천천히 말해 주세요.', chinese: '请说慢一点。', chineseEn: 'Please speak more slowly.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '천천히 다시 설명해 주세요.', chinese: '请慢慢再说明一遍。', chineseEn: 'Please explain it again slowly.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-38', korean: '한국어를 잘 못하다', romanization: 'hangugeoreul jal motada', baseForm: '한국어를 잘 못하다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [
    { chinese: '韩语说得不好、不太会韩语', chineseEn: 'not good at Korean, don\'t know much Korean', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '한국어를 잘 못해요.', chinese: '我韩语说得不太好。', chineseEn: 'I don\'t speak Korean very well.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '한국어를 잘 못해서 천천히 말해 주세요.', chinese: '我韩语不好，请说慢一点。', chineseEn: 'My Korean isn\'t good, please speak slowly.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-39', korean: '외국인', romanization: 'oegugin', baseForm: '외국인', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [
    { chinese: '外国人', chineseEn: 'foreigner', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '저는 외국인이에요.', chinese: '我是外国人。', chineseEn: 'I\'m a foreigner.', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '외국인 등록증이 있어요.', chinese: '我有外国人登录证。', chineseEn: 'I have an alien registration card.', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行'], emotionTags: [], relatedWords: [],
},
{
  id: 'emerg-40', korean: '비상', romanization: 'bisang', baseForm: '비상', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [
    { chinese: '紧急、非常（情况）', chineseEn: 'emergency, urgent (situation)', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
  ],
  examples: [
    { korean: '비상 상황이에요!', chinese: '是紧急情况！', chineseEn: 'It\'s an emergency!', scene: '求助', sceneEn: 'Asking for help' },
    { korean: '비상구가 어디예요?', chinese: '紧急出口在哪里？', chineseEn: 'Where is the emergency exit?', scene: '求助', sceneEn: 'Asking for help' },
  ],
  tags: ['求助', '旅行', '紧急'], emotionTags: ['着急'], relatedWords: [],
},
{
    id: 'invite-01', korean: '약속', romanization: 'yaksok', baseForm: '약속', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '约定、约会（和人见面的约）', chineseEn: 'appointment, date (meeting someone)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '오늘 저녁에 약속 있어요?', chinese: '今天晚上有约吗？', chineseEn: 'Do you have plans tonight?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '우리 약속 잊지 마세요.', chinese: '别忘了我们的约。', chineseEn: 'Don\'t forget our appointment.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-02', korean: '초대하다', romanization: 'chodaehada', baseForm: '초대하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '邀请（请对方来参加）', chineseEn: 'invite (to ask someone to come)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '생일 파티에 친구들을 초대했어요.', chinese: '我邀请了朋友们来生日派对。', chineseEn: 'I invited friends to my birthday party.', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '집들이에 초대하고 싶어요.', chinese: '想邀请你来我的乔迁宴。', chineseEn: 'I\'d like to invite you to my housewarming party.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-03', korean: '초대', romanization: 'chodae', baseForm: '초대', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [
      { chinese: '邀请', chineseEn: 'invite', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '초대해 줘서 고마워요.', chinese: '谢谢你邀请我。', chineseEn: 'Thank you for inviting me.', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '초대장을 받았어요.', chinese: '我收到了请柬。', chineseEn: 'I received the invitation.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-04', korean: '만나다', romanization: 'mannada', baseForm: '만나다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '见面、碰面', chineseEn: 'to meet, to see each other', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '내일 몇 시에 만날까요?', chinese: '明天几点见面？', chineseEn: 'What time are we meeting tomorrow?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '오랜만에 만나서 반가웠어요.', chinese: '好久不见，很高兴见到你。', chineseEn: 'Long time no see, nice to see you.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-05', korean: '약속 잡다', romanization: 'yaksok japda', baseForm: '약속 잡다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '定约、敲定见面（安排具体时间地点）', chineseEn: 'to set up a meeting (arrange specific time and place)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '우리 이번 주에 약속 잡을까요?', chinese: '我们这周约一下吧？', chineseEn: 'Let\'s meet up this week?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '날짜부터 약속 잡아요.', chinese: '先把日子定下来吧。', chineseEn: 'Let\'s set a date first.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-06', korean: '시간 되다', romanization: 'sigan doeda', baseForm: '시간 되다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '有空、时间方便', chineseEn: 'to be free, available', nuance: '口语，最常用的问有没有空', nuanceEn: 'Colloquial, the most common way to ask if someone is free', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '이번 주말에 시간 돼요?', chinese: '这周末有空吗？', chineseEn: 'Are you free this weekend?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '저는 언제든지 시간 돼요.', chinese: '我什么时候都有空。', chineseEn: 'I\'m free anytime.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-07', korean: '시간 있다', romanization: 'sigan itda', baseForm: '시간 있다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '有时间', chineseEn: 'to have time', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '내일 오후에 시간 있어요?', chinese: '明天下午有时间吗？', chineseEn: 'Do you have time tomorrow afternoon?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '지금은 시간이 없어요.', chinese: '现在没时间。', chineseEn: 'I don\'t have time right now.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-08', korean: '언제', romanization: 'eonje', baseForm: '언제', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '什么时候', chineseEn: 'When', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '언제가 편해요?', chinese: '你什么时候方便？', chineseEn: 'When is convenient for you?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '언제 한번 밥 먹어요.', chinese: '哪天一起吃个饭吧。', chineseEn: 'Let\'s grab a meal sometime.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-09', korean: '주말', romanization: 'jumal', baseForm: '주말', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '周末', chineseEn: 'weekend', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '주말에 뭐 해요?', chinese: '周末做什么？', chineseEn: 'What are you doing this weekend?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '이번 주말은 좀 바빠요.', chinese: '这个周末有点忙。', chineseEn: 'I\'m a bit busy this weekend.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '时间'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-10', korean: '평일', romanization: 'pyeongil', baseForm: '평일', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [
      { chinese: '平日、工作日（周一到周五）', chineseEn: 'weekdays (Monday to Friday)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '평일에는 일 때문에 바빠요.', chinese: '工作日因为上班很忙。', chineseEn: 'I\'m busy on weekdays because of work.', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '평일 저녁도 괜찮아요?', chinese: '工作日晚上也可以吗？', chineseEn: 'Is a weekday evening okay?', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '时间'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-11', korean: '저녁', romanization: 'jeonyeok', baseForm: '저녁', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '晚上；晚饭', chineseEn: 'evening; dinner', nuance: '一词两义，看语境', nuanceEn: 'One word, two meanings, depends on context', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '저녁에 같이 밥 먹을래요?', chinese: '晚上一起吃饭吗？', chineseEn: 'Shall we have dinner together in the evening?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '오늘 저녁은 제가 살게요.', chinese: '今天晚饭我请。', chineseEn: 'I\'ll treat you to dinner today.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '时间'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-12', korean: '점심', romanization: 'jeomsim', baseForm: '점심', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '午饭；中午', chineseEn: 'lunch; noon', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '점심 같이 먹을까요?', chinese: '一起吃午饭吧？', chineseEn: 'Let\'s have lunch together?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '점심때 잠깐 볼 수 있어요?', chinese: '中午能见一下吗？', chineseEn: 'Can we meet at noon?', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '时间'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-13', korean: '한잔하다', romanization: 'hanjanhada', baseForm: '한잔하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '喝一杯（约酒的委婉说法）', chineseEn: 'have a drink (euphemism for inviting someone for drinks)', nuance: '口语，泛指小酌', nuanceEn: 'Colloquial, generally means having a casual drink', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '오늘 퇴근하고 한잔할래요?', chinese: '今天下班后喝一杯吗？', chineseEn: 'How about a drink after work today?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '오랜만에 한잔해요.', chinese: '好久没喝了，喝一杯吧。', chineseEn: 'It\'s been a while; let\'s grab a drink.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '聚会'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-14', korean: '밥 한번 먹다', romanization: 'bap hanbeon meokda', baseForm: '밥 한번 먹다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '找机会吃个饭（约人见面的常用铺垫，不一定真定日子）', chineseEn: 'find a time to eat (common way to suggest meeting up, not necessarily setting a date)', nuance: '口语客套', nuanceEn: 'Polite small talk', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '우리 언제 밥 한번 먹어요.', chinese: '我们哪天吃个饭吧。', chineseEn: 'Let\'s grab a meal sometime.', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '조만간 밥 한번 먹자.', chinese: '改天一起吃个饭。', chineseEn: 'Let\'s have a meal together another day.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-15', korean: '시간 맞추다', romanization: 'sigan matchuda', baseForm: '시간 맞추다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '协调时间、对时间（凑出双方都行的时段）', chineseEn: 'coordinate schedules (find a time that works for both)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '서로 시간 맞춰서 만나요.', chinese: '互相凑个时间见面吧。', chineseEn: 'Let\'s find a time to meet up.', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '시간 맞추기가 좀 어렵네요.', chinese: '对时间有点难啊。', chineseEn: 'It\'s a bit hard to coordinate a time.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-16', korean: '미루다', romanization: 'mireuda', baseForm: '미루다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '推迟、往后拖', chineseEn: 'postpone, put off', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '약속을 다음 주로 미뤄도 될까요?', chinese: '约会推到下周可以吗？', chineseEn: 'Can we push the date to next week?', scene: '改期', sceneEn: 'Reschedule' },
      { korean: '자꾸 미루면 안 돼요.', chinese: '不能老是往后拖。', chineseEn: 'We can\'t keep putting it off.', scene: '改期', sceneEn: 'Reschedule' },
    ],
    tags: ['改期', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-17', korean: '연기하다', romanization: 'yeongihada', baseForm: '연기하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '延期、改期（比 미루다 更正式）', chineseEn: 'reschedule, postpone (more formal than 미루다)', nuance: '书面/正式', nuanceEn: 'written/formal', register: '书面', registerEn: 'Written' },
    ],
    examples: [
      { korean: '회의를 하루 연기했어요.', chinese: '会议延后了一天。', chineseEn: 'The meeting was postponed by a day.', scene: '改期', sceneEn: 'Reschedule' },
      { korean: '사정이 생겨서 약속을 연기하고 싶어요.', chinese: '有点情况，想把约会改期。', chineseEn: 'Something came up; I\'d like to reschedule our date.', scene: '改期', sceneEn: 'Reschedule' },
    ],
    tags: ['改期', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-18', korean: '취소하다', romanization: 'chwisohada', baseForm: '취소하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '取消', chineseEn: 'cancel', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '죄송하지만 오늘 약속을 취소해야 할 것 같아요.', chinese: '不好意思，今天的约可能得取消。', chineseEn: 'Sorry, I might have to cancel today\'s appointment.', scene: '改期', sceneEn: 'Reschedule' },
      { korean: '예약을 취소했어요.', chinese: '我把预约取消了。', chineseEn: 'I canceled the reservation.', scene: '改期', sceneEn: 'Reschedule' },
    ],
    tags: ['改期', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-19', korean: '바람맞다', romanization: 'barammatda', baseForm: '바람맞다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '被放鸽子（对方没来，自己白等）', chineseEn: 'stood up (the other person didn\'t show, you waited in vain)', nuance: '口语，带无奈', nuanceEn: 'Colloquial, with a sense of helplessness', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '어제 소개팅에서 바람맞았어요.', chinese: '昨天相亲被放鸽子了。', chineseEn: 'I got stood up at the blind date yesterday.', scene: '爽约', sceneEn: 'Stand someone up' },
      { korean: '한 시간 기다리다가 바람맞은 줄 알았어요.', chinese: '等了一小时，还以为被放鸽子了。', chineseEn: 'Waited an hour, thought I\'d been stood up.', scene: '爽约', sceneEn: 'Stand someone up' },
    ],
    tags: ['爽约', '社交'], emotionTags: ['无奈'], relatedWords: [],
  },
  {
    id: 'invite-20', korean: '바람맞히다', romanization: 'barammatchida', baseForm: '바람맞히다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 1,
    meanings: [
      { chinese: '放某人鸽子（让对方白等）', chineseEn: 'stand someone up (make them wait in vain)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '친구를 바람맞혀서 미안해요.', chinese: '放了朋友鸽子，很抱歉。', chineseEn: 'I stood up a friend; I\'m really sorry.', scene: '爽约', sceneEn: 'Stand someone up' },
      { korean: '일부러 바람맞힌 건 아니에요.', chinese: '我不是故意放你鸽子的。', chineseEn: 'I didn\'t mean to stand you up.', scene: '爽约', sceneEn: 'Stand someone up' },
    ],
    tags: ['爽约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-21', korean: '늦다', romanization: 'neutda', baseForm: '늦다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '晚、迟（时间上晚了）', chineseEn: 'late (in terms of time)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '길이 막혀서 조금 늦을 것 같아요.', chinese: '堵车了，可能会晚一点。', chineseEn: 'There\'s traffic; I might be a bit late.', scene: '到场', sceneEn: 'Show up' },
      { korean: '늦어서 정말 죄송해요.', chinese: '来晚了真抱歉。', chineseEn: 'Sorry I\'m late.', scene: '到场', sceneEn: 'Show up' },
    ],
    tags: ['到场', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-22', korean: '지각하다', romanization: 'jigakada', baseForm: '지각하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '迟到（多用于上班上学等正式场合）', chineseEn: 'to be late (often used in formal settings like work or school)', nuance: '中性偏正式', nuanceEn: 'Neutral, slightly formal', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '오늘 늦잠 자서 지각했어요.', chinese: '今天睡过头迟到了。', chineseEn: 'I overslept and was late today.', scene: '到场', sceneEn: 'Show up' },
      { korean: '지각하지 않게 일찍 나가요.', chinese: '早点出门别迟到。', chineseEn: 'Leave early so you won\'t be late.', scene: '到场', sceneEn: 'Show up' },
    ],
    tags: ['到场', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-23', korean: '약속 시간', romanization: 'yaksok sigan', baseForm: '약속 시간', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '约定的时间', chineseEn: 'the agreed time', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '약속 시간이 몇 시였죠?', chinese: '约的是几点来着？', chineseEn: 'What time were we meeting again?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '약속 시간에 딱 맞춰 왔어요.', chinese: '正好卡着约定时间到了。', chineseEn: 'I arrived right on the agreed time.', scene: '到场', sceneEn: 'Show up' },
    ],
    tags: ['邀约', '时间'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-24', korean: '장소', romanization: 'jangso', baseForm: '장소', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '地点、场所', chineseEn: 'place, location', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '만날 장소는 어디로 할까요?', chinese: '见面地点定在哪里？', chineseEn: 'Where should we meet?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '장소는 제가 정할게요.', chinese: '地点我来定。', chineseEn: 'I\'ll pick the place.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-25', korean: '정하다', romanization: 'jeonghada', baseForm: '정하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '定、决定（时间、地点等）', chineseEn: 'to decide, to set (time, place, etc.)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '날짜를 먼저 정해요.', chinese: '先把日子定下来。', chineseEn: 'Let\'s set the date first.', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '메뉴는 아직 안 정했어요.', chinese: '菜还没定。', chineseEn: 'The menu isn\'t decided yet.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-26', korean: '다음에', romanization: 'daeume', baseForm: '다음에', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '下次（婉拒或改约常用）', chineseEn: 'next time (often used to politely decline or reschedule)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '오늘은 좀 그렇고, 다음에 봐요.', chinese: '今天不太方便，下次见吧。', chineseEn: 'Today\'s not great, let\'s meet next time.', scene: '改期', sceneEn: 'Reschedule' },
      { korean: '다음에 꼭 같이 가요.', chinese: '下次一定一起去。', chineseEn: 'Let\'s definitely go together next time.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['改期', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-27', korean: '나중에', romanization: 'najunge', baseForm: '나중에', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '以后、回头（时间上稍后）', chineseEn: 'later, in a bit (slightly later in time)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '나중에 다시 연락할게요.', chinese: '回头再联系你。', chineseEn: 'I\'ll get back to you later.', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '그건 나중에 얘기해요.', chinese: '那个以后再说。', chineseEn: 'Let\'s talk about that later.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-28', korean: '갑자기', romanization: 'gapjagi', baseForm: '갑자기', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '突然（临时改约、有事时常用）', chineseEn: 'suddenly (often used when plans change at the last minute)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '갑자기 일이 생겨서 못 갈 것 같아요.', chinese: '突然有事，可能去不了了。', chineseEn: 'Something came up suddenly, I might not be able to make it.', scene: '改期', sceneEn: 'Reschedule' },
      { korean: '왜 이렇게 갑자기 취소해요?', chinese: '怎么这么突然就取消了？', chineseEn: 'Why did you cancel so suddenly?', scene: '改期', sceneEn: 'Reschedule' },
    ],
    tags: ['改期', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-29', korean: '일이 생기다', romanization: 'iri saenggida', baseForm: '일이 생기다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '有事、出了状况（改约最常用的理由）', chineseEn: 'something came up (the most common reason for rescheduling)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '급한 일이 생겨서요.', chinese: '因为突然有急事。', chineseEn: 'Because something urgent came up.', scene: '改期', sceneEn: 'Reschedule' },
      { korean: '집에 일이 생겨서 못 나가요.', chinese: '家里有事，出不了门。', chineseEn: 'Something came up at home, I can\'t leave.', scene: '改期', sceneEn: 'Reschedule' },
    ],
    tags: ['改期', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-30', korean: '급한 일', romanization: 'geupan il', baseForm: '급한 일', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '急事', chineseEn: 'urgent matter', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '급한 일이 있어서 먼저 갈게요.', chinese: '有急事，我先走了。', chineseEn: 'I have something urgent, so I\'ll head out first.', scene: '改期', sceneEn: 'Reschedule' },
      { korean: '급한 일 아니면 이따 얘기해요.', chinese: '不是急事的话待会儿再说。', chineseEn: 'If it\'s not urgent, let\'s talk about it later.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['改期', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-31', korean: '일정', romanization: 'iljeong', baseForm: '일정', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '日程、行程', chineseEn: 'schedule', nuance: '中性偏正式', nuanceEn: 'Neutral, slightly formal', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이번 주 일정이 어떻게 돼요?', chinese: '你这周的日程怎么样？', chineseEn: 'How\'s your schedule this week?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '일정을 확인하고 다시 알려 줄게요.', chinese: '我确认一下行程再告诉你。', chineseEn: 'Let me check my schedule and get back to you.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-32', korean: '비다', romanization: 'bida', baseForm: '비다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '空、空出来（指时间有空档）', chineseEn: 'free (time slot)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '금요일 저녁이 비어 있어요.', chinese: '周五晚上是空的。', chineseEn: 'Friday evening is free.', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '주말은 완전히 비었어요.', chinese: '周末完全没安排。', chineseEn: 'I have no plans at all this weekend.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '时间'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-33', korean: '어떠세요', romanization: 'eotteoseyo', baseForm: '어떻다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '……怎么样？（敬语征求意见，提议时间地点常用）', chineseEn: 'How about...?', nuance: '敬语', nuanceEn: 'honorifics', register: '敬语', registerEn: 'honorifics' },
    ],
    examples: [
      { korean: '토요일 점심 어떠세요?', chinese: '周六中午怎么样？', chineseEn: 'How about Saturday noon?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '홍대 쪽은 어떠세요?', chinese: '弘大那边怎么样？', chineseEn: 'How about around Hongdae?', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-34', korean: '도착하다', romanization: 'dochakada', baseForm: '도착하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '到达、到了', chineseEn: 'arrive', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '거의 다 도착했어요.', chinese: '我快到了。', chineseEn: 'I\'m almost there.', scene: '到场', sceneEn: 'Show up' },
      { korean: '도착하면 전화 주세요.', chinese: '到了给我打电话。', chineseEn: 'Call me when you arrive.', scene: '到场', sceneEn: 'Show up' },
    ],
    tags: ['到场', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-35', korean: '기다리다', romanization: 'gidarida', baseForm: '기다리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '等、等待', chineseEn: 'wait', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '카페에서 기다리고 있을게요.', chinese: '我在咖啡厅等你。', chineseEn: 'I\'ll wait for you at the café.', scene: '到场', sceneEn: 'Show up' },
      { korean: '조금만 기다려 주세요.', chinese: '请稍等一下。', chineseEn: 'Please wait a moment.', scene: '到场', sceneEn: 'Show up' },
    ],
    tags: ['到场', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-36', korean: '데리러 가다', romanization: 'derireo gada', baseForm: '데리러 가다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '去接（人）', chineseEn: 'pick up (someone)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '제가 지하철역으로 데리러 갈게요.', chinese: '我去地铁站接你。', chineseEn: 'I\'ll pick you up at the subway station.', scene: '到场', sceneEn: 'Show up' },
      { korean: '몇 시에 데리러 가면 돼요?', chinese: '几点去接你好？', chineseEn: 'What time should I pick you up?', scene: '到场', sceneEn: 'Show up' },
    ],
    tags: ['到场', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-37', korean: '모임', romanization: 'moim', baseForm: '모임', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '聚会、聚会活动', chineseEn: 'gathering', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이번 주에 동창 모임이 있어요.', chinese: '这周有同学聚会。', chineseEn: 'There\'s a class reunion this week.', scene: '聚会', sceneEn: 'gathering' },
      { korean: '모임에 꼭 오세요.', chinese: '聚会一定要来哦。', chineseEn: 'Make sure you come to the gathering.', scene: '聚会', sceneEn: 'gathering' },
    ],
    tags: ['聚会', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-38', korean: '회식', romanization: 'hoesik', baseForm: '회식', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '公司聚餐（韩国职场文化里下班后的集体吃喝）', chineseEn: 'company dinner (after-work gathering)', nuance: '职场文化词', nuanceEn: 'Workplace culture term', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '오늘 저녁에 회식이 있어요.', chinese: '今晚有公司聚餐。', chineseEn: 'There\'s a company dinner tonight.', scene: '聚会', sceneEn: 'gathering' },
      { korean: '회식은 보통 몇 시에 끝나요?', chinese: '聚餐一般几点结束？', chineseEn: 'What time does the company dinner usually end?', scene: '聚会', sceneEn: 'gathering' },
    ],
    tags: ['聚会', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-39', korean: '놀다', romanization: 'nolda', baseForm: '놀다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '玩、一起玩耍（朋友间约出去玩）', chineseEn: 'hang out, play together (making plans with friends)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '주말에 같이 놀아요.', chinese: '周末一起玩吧。', chineseEn: 'Let\'s hang out this weekend.', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '오랜만에 나와서 놀아요.', chinese: '好久没聚了，出来玩吧。', chineseEn: 'It\'s been a while—let\'s get together.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-40', korean: '다음 주', romanization: 'daeum ju', baseForm: '다음 주', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '下周', chineseEn: 'next week', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '다음 주는 시간 괜찮아요?', chinese: '下周时间可以吗？', chineseEn: 'Does next week work for you?', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '그럼 다음 주로 미뤄요.', chinese: '那就推到下周吧。', chineseEn: 'Let\'s push it to next week then.', scene: '改期', sceneEn: 'Reschedule' },
    ],
    tags: ['邀约', '时间'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-41', korean: '이따가', romanization: 'ittaga', baseForm: '이따가', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '待会儿、过一会儿（当天稍后）', chineseEn: 'in a bit, later (same day)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '이따가 다시 연락할게요.', chinese: '待会儿再联系你。', chineseEn: 'I\'ll get back to you in a bit.', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '이따가 저녁에 봐요.', chinese: '晚点见。', chineseEn: 'See you later.', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '时间'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-42', korean: '약속 지키다', romanization: 'yaksok jikida', baseForm: '약속 지키다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '守约、遵守约定', chineseEn: 'keep a promise, stick to plans', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이번엔 꼭 약속 지킬게요.', chinese: '这次一定守约。', chineseEn: 'I\'ll definitely keep my promise this time.', scene: '到场', sceneEn: 'Show up' },
      { korean: '약속을 잘 지키는 사람이 좋아요.', chinese: '我喜欢守约的人。', chineseEn: 'I like people who keep their word.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['到场', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-43', korean: '선약', romanization: 'seonyak', baseForm: '선약', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 1,
    meanings: [
      { chinese: '先约、已经有约在先（婉拒时的高级理由）', chineseEn: 'prior commitment, already have plans (polite excuse to decline)', nuance: '略正式', nuanceEn: 'Slightly formal', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '그날은 선약이 있어서요.', chinese: '那天已经有约了。', chineseEn: 'I already have plans that day.', scene: '改期', sceneEn: 'Reschedule' },
      { korean: '미안해요, 선약이 있어서 못 가요.', chinese: '抱歉，已经有约在先，去不了。', chineseEn: 'Sorry, I already have plans, so I can\'t make it.', scene: '改期', sceneEn: 'Reschedule' },
    ],
    tags: ['改期', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'invite-44', korean: '잠깐', romanization: 'jamkkan', baseForm: '잠깐', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '一会儿、片刻（约“见一下”时常用）', chineseEn: 'a moment, a bit (often used when meeting briefly)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '잠깐 얼굴만 보고 가요.', chinese: '就见一面就走。', chineseEn: 'Just a quick meet-up, then I\'ll go.', scene: '邀约', sceneEn: 'Invitation' },
      { korean: '이따 잠깐 시간 돼요?', chinese: '待会儿有一小会儿时间吗？', chineseEn: 'Do you have a few minutes later?', scene: '邀约', sceneEn: 'Invitation' },
    ],
    tags: ['邀约', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-01', korean: '고맙다', romanization: 'gomapda', baseForm: '고맙다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '谢谢、感谢（固有词，语感更亲切）', chineseEn: 'thanks (native Korean, warmer tone)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '정말 고마워요.', chinese: '真的谢谢你。', chineseEn: 'Thank you so much.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '도와줘서 고마워.', chinese: '谢谢你帮我。', chineseEn: 'Thank you for helping me.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: ['感激'], relatedWords: [],
  },
  {
    id: 'grat-02', korean: '감사하다', romanization: 'gamsahada', baseForm: '감사하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '感谢（汉字词，比 고맙다 更郑重）', chineseEn: 'gratitude (Sino-Korean, more formal than 고맙다)', nuance: '正式', nuanceEn: 'formal', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '도와주셔서 감사합니다.', chinese: '感谢您的帮助。', chineseEn: 'Thank you for your help.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '진심으로 감사드려요.', chinese: '衷心地感谢您。', chineseEn: 'I sincerely thank you.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: ['感激'], relatedWords: [],
  },
  {
    id: 'grat-03', korean: '감사합니다', romanization: 'gamsahamnida', baseForm: '감사하다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '谢谢（最标准的正式道谢，对长辈、店员、陌生人都能用）', chineseEn: 'thank you (standard formal, for elders, staff, strangers)', nuance: '格式体敬语', nuanceEn: 'Formal honorific', register: '敬语', registerEn: 'honorifics' },
    ],
    examples: [
      { korean: '안내해 주셔서 감사합니다.', chinese: '谢谢您的指引。', chineseEn: 'Thank you for your guidance.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '오늘 정말 감사합니다.', chinese: '今天真的很感谢。', chineseEn: 'Thank you so much for today.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: ['感激'], relatedWords: [],
  },
  {
    id: 'grat-04', korean: '고마워요', romanization: 'gomawoyo', baseForm: '고맙다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '谢谢（해요体，对平辈、熟人温和又礼貌）', chineseEn: 'thanks (해요 style, polite and friendly to peers)', nuance: '해요体', nuanceEn: '해요 style', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '챙겨 줘서 고마워요.', chinese: '谢谢你照顾我。', chineseEn: 'Thank you for taking care of me.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '와 줘서 고마워요.', chinese: '谢谢你来。', chineseEn: 'Thanks for coming.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: ['感激'], relatedWords: [],
  },
  {
    id: 'grat-05', korean: '고마워', romanization: 'gomawo', baseForm: '고맙다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '谢啦（半语，对亲近的朋友、晚辈）', chineseEn: 'Thanks (casual, to close friends or younger people)', nuance: '半语（반말）', nuanceEn: 'Banmal (informal speech)', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '야, 진짜 고마워.', chinese: '哎，真的谢谢你。', chineseEn: 'Hey, thanks a lot.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '어제는 고마웠어.', chinese: '昨天谢谢你了。', chineseEn: 'Thanks for yesterday.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: ['感激'], relatedWords: [],
  },
  {
    id: 'grat-06', korean: '감사드리다', romanization: 'gamsadeurida', baseForm: '감사드리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '致谢、深表感谢（谦语，最郑重的道谢）', chineseEn: 'To express gratitude, deep thanks (humble, most formal)', nuance: '谦让语', nuanceEn: 'Humble speech', register: '书面', registerEn: 'Written' },
    ],
    examples: [
      { korean: '많은 관심에 감사드립니다.', chinese: '感谢大家的关注。', chineseEn: 'Thank you all for your attention.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '이 자리를 빌려 감사드려요.', chinese: '借此机会向您致谢。', chineseEn: 'I\'d like to take this opportunity to thank you.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '正式'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-07', korean: '덕분에', romanization: 'deokbune', baseForm: '덕분에', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '多亏了、托……的福（把功劳归给对方，很地道的感谢表达）', chineseEn: 'Thanks to, owing to (crediting the other person, a very natural way to say thanks)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '덕분에 잘 끝났어요.', chinese: '多亏了你才顺利结束。', chineseEn: 'Thanks to you, it went smoothly.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '선생님 덕분에 합격했어요.', chinese: '多亏老师我才考上了。', chineseEn: 'Thanks to my teacher, I passed the exam.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: ['感激'], relatedWords: [],
  },
  {
    id: 'grat-08', korean: '신세를 지다', romanization: 'sinsereul jida', baseForm: '신세를 지다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '承蒙关照、欠人情', chineseEn: 'Indebted to, owing a favor', nuance: '略正式', nuanceEn: 'Slightly formal', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이번에 신세 많이 졌어요.', chinese: '这次多承蒙您关照了。', chineseEn: 'Thank you for all your help this time.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '신세만 지는 것 같아 죄송해요.', chinese: '总是麻烦您，很不好意思。', chineseEn: 'I\'m sorry for always troubling you.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-09', korean: '미안하다', romanization: 'mianhada', baseForm: '미안하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '抱歉、对不起（比 죄송하다 轻，对平辈、熟人）', chineseEn: 'Sorry, I apologize (lighter than 죄송하다, to peers or acquaintances)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '늦어서 미안해요.', chinese: '来晚了抱歉。', chineseEn: 'Sorry for being late.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '아까는 미안했어요.', chinese: '刚才对不起。', chineseEn: 'Sorry about earlier.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '社交'], emotionTags: ['歉意'], relatedWords: [],
  },
  {
    id: 'grat-10', korean: '죄송하다', romanization: 'joesonghada', baseForm: '죄송하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '抱歉、非常抱歉（比 미안하다 郑重，对长辈、上司、客人）', chineseEn: 'I apologize, very sorry (more formal than 미안하다, to elders, superiors, or guests)', nuance: '正式', nuanceEn: 'formal', register: '敬语', registerEn: 'honorifics' },
    ],
    examples: [
      { korean: '정말 죄송합니다.', chinese: '真的非常抱歉。', chineseEn: 'I\'m truly very sorry.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '불편을 드려서 죄송해요.', chinese: '给您添麻烦了，抱歉。', chineseEn: 'Sorry for the trouble I\'ve caused you.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '社交'], emotionTags: ['歉意'], relatedWords: [],
  },
  {
    id: 'grat-11', korean: '죄송합니다', romanization: 'joesonghamnida', baseForm: '죄송하다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '对不起（最标准的正式道歉，职场、服务业万能）', chineseEn: 'I\'m sorry (the most standard formal apology, versatile in work and service)', nuance: '格式体敬语', nuanceEn: 'Formal honorific', register: '敬语', registerEn: 'honorifics' },
    ],
    examples: [
      { korean: '기다리게 해서 죄송합니다.', chinese: '让您久等了，抱歉。', chineseEn: 'Sorry for keeping you waiting.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '제 실수입니다, 죄송합니다.', chinese: '是我的失误，对不起。', chineseEn: 'It\'s my mistake, I\'m sorry.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '职场'], emotionTags: ['歉意'], relatedWords: [],
  },
  {
    id: 'grat-12', korean: '미안해', romanization: 'mianhae', baseForm: '미안하다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '对不起（半语，对亲密的人）', chineseEn: 'Sorry (casual, to close people)', nuance: '半语（반말）', nuanceEn: 'Banmal (informal speech)', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '진짜 미안해.', chinese: '真的对不起。', chineseEn: 'I\'m really sorry.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '내가 다 미안해.', chinese: '都是我的错，对不起。', chineseEn: 'It\'s all my fault, I\'m sorry.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '社交'], emotionTags: ['歉意'], relatedWords: [],
  },
  {
    id: 'grat-13', korean: '사과하다', romanization: 'sagwahada', baseForm: '사과하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '道歉、赔礼（正式表达“道歉”这一行为）', chineseEn: 'Apology, apology (formal expression of the act of apologizing)', nuance: '中性偏正式', nuanceEn: 'Neutral, slightly formal', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '먼저 사과할게요.', chinese: '我先向你道歉。', chineseEn: 'Let me apologize to you first.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '진심으로 사과드립니다.', chinese: '我真诚地向您道歉。', chineseEn: 'I sincerely apologize to you.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-14', korean: '사과', romanization: 'sagwa', baseForm: '사과', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '道歉（此处指赔礼，与“苹果”同形异义）', chineseEn: 'Apology (here meaning apology, homonym with \'apple\')', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '진심 어린 사과를 받고 싶어요.', chinese: '我想得到真诚的道歉。', chineseEn: 'I want a sincere apology.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '사과 한마디면 됐어요.', chinese: '一句道歉就够了。', chineseEn: 'One apology is enough.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-15', korean: '용서하다', romanization: 'yongseohada', baseForm: '용서하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '原谅、饶恕', chineseEn: 'Forgive, pardon', nuance: '略正式', nuanceEn: 'Slightly formal', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '한 번만 용서해 주세요.', chinese: '请原谅我这一次。', chineseEn: 'Please forgive me this once.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '용서해 줘서 고마워요.', chinese: '谢谢你原谅我。', chineseEn: 'Thank you for forgiving me.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-16', korean: '실수', romanization: 'silsu', baseForm: '실수', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '失误、失手', chineseEn: 'Mistake, slip', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '제 실수예요, 죄송해요.', chinese: '是我的失误，抱歉。', chineseEn: 'It\'s my mistake, sorry.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '누구나 실수할 수 있어요.', chinese: '谁都会有失误的。', chineseEn: 'Everyone makes mistakes.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-17', korean: '일부러', romanization: 'ilbureo', baseForm: '일부러', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '故意地（辩解“不是故意的”时常用）', chineseEn: 'Deliberately (often used when denying it was intentional)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '일부러 그런 거 아니에요.', chinese: '我不是故意的。', chineseEn: 'I didn\'t mean it.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '일부러 챙겨 왔어요.', chinese: '我特意带来的。', chineseEn: 'I brought it on purpose.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['道歉', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-18', korean: '괜찮다', romanization: 'gwaenchanta', baseForm: '괜찮다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '没关系、不要紧（回应道歉/道谢的万能词）', chineseEn: 'It\'s okay, no problem (all-purpose response to apologies/thanks)', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '괜찮아요, 신경 쓰지 마세요.', chinese: '没关系，别在意。', chineseEn: 'It\'s okay, don\'t worry about it.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '별거 아니에요, 괜찮아요.', chinese: '没什么，没关系。', chineseEn: 'It\'s nothing, no problem.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['道歉', '感谢'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-19', korean: '천만에요', romanization: 'cheonmaneyo', baseForm: '천만에요', partOfSpeech: '感叹词', partOfSpeechEn: 'Interjection',
    level: '2', frequency: 2,
    meanings: [
      { chinese: '不客气、哪里的话（回应感谢，略书面）', chineseEn: 'You\'re welcome, don\'t mention it (responding to thanks, slightly formal)', nuance: '略正式', nuanceEn: 'Slightly formal', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '천만에요, 당연한 일인데요.', chinese: '不客气，这是应该的。', chineseEn: 'You\'re welcome, it\'s my duty.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '천만에요, 도움이 됐다니 다행이에요.', chinese: '不客气，能帮上忙就好。', chineseEn: 'You\'re welcome, glad I could help.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-20', korean: '별말씀을요', romanization: 'byeolmalsseumeuryo', baseForm: '별말씀을요', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '哪里的话、您太客气了（谦逊地回应感谢或称赞）', chineseEn: 'Don\'t mention it, you\'re too kind (humbly responding to thanks or praise)', nuance: '敬语', nuanceEn: 'honorifics', register: '敬语', registerEn: 'honorifics' },
    ],
    examples: [
      { korean: '별말씀을요, 제가 더 감사하죠.', chinese: '哪里的话，该我谢您才对。', chineseEn: 'Don\'t mention it, I should be the one thanking you.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '별말씀을요, 편하게 말씀하세요.', chinese: '您太客气了，请随意。', chineseEn: 'You\'re too kind, please make yourself at home.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-21', korean: '아니에요', romanization: 'anieyo', baseForm: '아니다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '不是啦、不用（口语里回应感谢，最自然常用）', chineseEn: 'No, no need (colloquial response to thanks, most natural and common)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '아니에요, 저야말로 고마워요.', chinese: '不用啦，该我谢你才对。', chineseEn: 'No need, I should be the one thanking you.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '아니에요, 별거 아니에요.', chinese: '没有啦，没什么。', chineseEn: 'It\'s nothing, really.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-22', korean: '선물', romanization: 'seonmul', baseForm: '선물', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '礼物', chineseEn: 'Gift', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '작은 선물 준비했어요.', chinese: '我准备了个小礼物。', chineseEn: 'I prepared a small gift.', scene: '送礼', sceneEn: 'give a gift' },
      { korean: '선물 정말 마음에 들어요.', chinese: '礼物我真的很喜欢。', chineseEn: 'I really love the gift.', scene: '收礼', sceneEn: 'Receiving gifts' },
    ],
    tags: ['送礼', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-23', korean: '선물하다', romanization: 'seonmulhada', baseForm: '선물하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 2,
    meanings: [
      { chinese: '送礼、赠送', chineseEn: 'to give a gift, to present', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '친구한테 향수를 선물했어요.', chinese: '我送了朋友香水。', chineseEn: 'I gave my friend perfume.', scene: '送礼', sceneEn: 'give a gift' },
      { korean: '뭘 선물하면 좋을까요?', chinese: '送什么礼物好呢？', chineseEn: 'What gift should I give?', scene: '送礼', sceneEn: 'give a gift' },
    ],
    tags: ['送礼', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-24', korean: '드리다', romanization: 'deurida', baseForm: '드리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '给、呈上（주다 的谦语，对长辈递东西）', chineseEn: 'to give, to present (humble form of 주다, used when giving to elders)', nuance: '谦让语', nuanceEn: 'Humble speech', register: '敬语', registerEn: 'honorifics' },
    ],
    examples: [
      { korean: '이거 선물로 드릴게요.', chinese: '这个作为礼物送给您。', chineseEn: 'I\'d like to give this to you as a gift.', scene: '送礼', sceneEn: 'give a gift' },
      { korean: '제가 도와 드릴게요.', chinese: '我来帮您。', chineseEn: 'Let me help you.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['送礼', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-25', korean: '챙기다', romanization: 'chaenggida', baseForm: '챙기다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '照顾、张罗、（特意）准备好', chineseEn: 'to take care of, to arrange, (specially) prepare', nuance: '口语，含体贴之意', nuanceEn: 'Colloquial, considerate', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '늘 챙겨 주셔서 감사해요.', chinese: '谢谢您一直照顾我。', chineseEn: 'Thank you for always taking care of me.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '선물까지 챙겨 오셨어요?', chinese: '您连礼物都准备了？', chineseEn: 'You even prepared a gift?', scene: '收礼', sceneEn: 'Receiving gifts' },
    ],
    tags: ['感谢', '社交'], emotionTags: ['感激'], relatedWords: [],
  },
  {
    id: 'grat-26', korean: '마음', romanization: 'maeum', baseForm: '마음', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '心意（送礼收礼时说“这是我的心意”）', chineseEn: 'thoughtfulness, gesture (said when giving/receiving gifts, meaning \'this is my token of appreciation\')', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '작지만 제 마음이에요.', chinese: '虽然不贵，是我的一点心意。', chineseEn: 'It\'s not expensive, but it\'s a small token of my appreciation.', scene: '送礼', sceneEn: 'give a gift' },
      { korean: '마음만 받을게요.', chinese: '你的心意我领了。', chineseEn: 'I appreciate your thoughtfulness.', scene: '收礼', sceneEn: 'Receiving gifts' },
    ],
    tags: ['送礼', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-27', korean: '신경 쓰다', romanization: 'singyeong sseuda', baseForm: '신경 쓰다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '费心、在意（“您太费心了/别在意”）', chineseEn: 'to go to trouble, to care (as in \'you went to too much trouble\' / \'don\'t worry about it\')', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '이렇게 신경 써 주셔서 감사해요.', chinese: '谢谢您这么费心。', chineseEn: 'Thank you for going to all this trouble.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '신경 안 쓰셔도 돼요.', chinese: '您不用费心。', chineseEn: 'You don\'t need to go to any trouble.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['感谢', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-28', korean: '고생하다', romanization: 'gosaenghada', baseForm: '고생하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '辛苦、受累（慰劳对方的付出）', chineseEn: 'hard work, trouble (to acknowledge someone\'s effort)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '오늘 정말 고생하셨어요.', chinese: '今天真是辛苦您了。', chineseEn: 'You really worked hard today.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '저 때문에 고생 많으셨죠.', chinese: '因为我，让您费心了吧。', chineseEn: 'I\'ve caused you trouble, haven\'t I?', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-29', korean: '보답하다', romanization: 'bodapada', baseForm: '보답하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 1,
    meanings: [
      { chinese: '报答、回报', chineseEn: 'to repay, to return a favor', nuance: '略正式', nuanceEn: 'Slightly formal', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이 은혜 꼭 보답할게요.', chinese: '这份恩情我一定报答。', chineseEn: 'I will definitely repay this kindness.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '다음에 꼭 보답할게요.', chinese: '下次一定回报你。', chineseEn: 'I\'ll definitely return the favor next time.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-30', korean: '한턱내다', romanization: 'hanteongnaeda', baseForm: '한턱내다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '请客（为了道谢或庆祝而请对方吃喝）', chineseEn: 'to treat someone (to a meal or drinks, as thanks or celebration)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '고마워서 오늘은 제가 한턱낼게요.', chinese: '为了谢你，今天我请客。', chineseEn: 'To thank you, today\'s on me.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '취직했으니까 한턱내야지.', chinese: '找到工作了，得请客啊。', chineseEn: 'You got a job, you have to treat us.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '聚会'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-31', korean: '고맙게도', romanization: 'gomapgedo', baseForm: '고맙게도', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '4', frequency: 1,
    meanings: [
      { chinese: '难得地、多亏（叙述时带感激语气）', chineseEn: 'Thanks to, fortunately (with gratitude)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' },
    ],
    examples: [
      { korean: '고맙게도 친구가 도와줬어요.', chinese: '难得朋友帮了我。', chineseEn: 'Thanks to a friend who helped me.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '고맙게도 다들 와 주셨어요.', chinese: '大家都来了，很感激。', chineseEn: 'Everyone came, I\'m grateful.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: ['感激'], relatedWords: [],
  },
  {
    id: 'grat-32', korean: '진심으로', romanization: 'jinsimeuro', baseForm: '진심으로', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '真心地、由衷地（加重感谢或道歉的诚意）', chineseEn: 'Sincerely, from the heart (to emphasize gratitude or apology)', nuance: '中性偏正式', nuanceEn: 'Neutral, slightly formal', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '진심으로 감사드립니다.', chinese: '由衷地感谢您。', chineseEn: 'I sincerely thank you.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '진심으로 사과할게요.', chinese: '我真心向你道歉。', chineseEn: 'I sincerely apologize to you.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['感谢', '道歉'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-33', korean: '덕분', romanization: 'deokbun', baseForm: '덕분', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '福气、多亏（常与에一起用，把好结果归功于对方）', chineseEn: 'Fortune, thanks to (often used with 에, attributing good results to the other person)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '다 여러분 덕분입니다.', chinese: '这全靠各位。', chineseEn: 'This is all thanks to everyone.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '그게 다 네 덕분이야.', chinese: '那全是多亏了你。', chineseEn: 'That\'s all thanks to you.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-34', korean: '폐를 끼치다', romanization: 'pyereul kkichida', baseForm: '폐를 끼치다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '添麻烦、打扰（郑重致歉时说“给您添麻烦了”）', chineseEn: 'To cause trouble, to disturb (used in formal apologies like \'Sorry for the trouble\')', nuance: '正式', nuanceEn: 'formal', register: '书面', registerEn: 'Written' },
    ],
    examples: [
      { korean: '폐를 끼쳐서 죄송합니다.', chinese: '给您添麻烦了，抱歉。', chineseEn: 'Sorry for the trouble I\'ve caused you.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '더 이상 폐 끼치고 싶지 않아요.', chinese: '不想再打扰您了。', chineseEn: 'I don\'t want to bother you anymore.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-35', korean: '반성하다', romanization: 'banseonghada', baseForm: '반성하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 1,
    meanings: [
      { chinese: '反省、检讨（深刻道歉时表态）', chineseEn: 'To reflect, to self-examine (used when making a deep apology)', nuance: '略正式', nuanceEn: 'Slightly formal', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '제가 잘못했어요, 반성하고 있어요.', chinese: '是我错了，我在反省。', chineseEn: 'I was wrong, I\'m reflecting on it.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '깊이 반성하겠습니다.', chinese: '我会深刻反省。', chineseEn: 'I will reflect deeply.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-36', korean: '잘못하다', romanization: 'jalmotada', baseForm: '잘못하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '做错、犯错', chineseEn: 'To make a mistake', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '제가 잘못했어요.', chinese: '是我做错了。', chineseEn: 'It was my mistake.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '뭘 잘못했는지 모르겠어요.', chinese: '我不知道自己错在哪。', chineseEn: 'I don\'t know where I went wrong.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-37', korean: '잘못', romanization: 'jalmot', baseForm: '잘못', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '错误、过错', chineseEn: 'Mistake, fault', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '다 제 잘못이에요.', chinese: '都是我的错。', chineseEn: 'It\'s all my fault.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '네 잘못이 아니야.', chinese: '不是你的错。', chineseEn: 'It\'s not your fault.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-38', korean: '이해하다', romanization: 'ihaehada', baseForm: '이해하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '理解、谅解', chineseEn: 'To understand, to forgive', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이해해 주셔서 감사해요.', chinese: '谢谢您的理解。', chineseEn: 'Thank you for your understanding.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '제 입장도 이해해 주세요.', chinese: '也请理解一下我的处境。', chineseEn: 'Please also understand my situation.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-39', korean: '고개를 숙이다', romanization: 'gogaereul sugida', baseForm: '고개를 숙이다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '4', frequency: 1,
    meanings: [
      { chinese: '低头（鞠躬致歉或致谢的肢体动作）', chineseEn: 'bowing (a physical gesture of apology or gratitude)', nuance: '中性', nuanceEn: 'Neutral', register: '书面', registerEn: 'Written' },
    ],
    examples: [
      { korean: '진심으로 고개 숙여 사과드립니다.', chinese: '我真诚地鞠躬致歉。', chineseEn: 'I sincerely bow to apologize.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '고개 숙여 감사 인사를 드렸어요.', chinese: '我低头行礼道谢。', chineseEn: 'I bow to express my thanks.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['道歉', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-40', korean: '몸 둘 바를 모르다', romanization: 'mom dul bareul moreuda', baseForm: '몸 둘 바를 모르다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '5', frequency: 1,
    meanings: [
      { chinese: '受宠若惊、不知如何是好（收到过分的好意或称赞时的谦辞）', chineseEn: 'overwhelmed and at a loss (a humble expression when receiving excessive kindness or praise)', nuance: '书面惯用语', nuanceEn: 'Written idiom', register: '书面', registerEn: 'Written' },
    ],
    examples: [
      { korean: '이렇게까지 챙겨 주시니 몸 둘 바를 모르겠어요.', chinese: '您这么照顾我，真让我受宠若惊。', chineseEn: 'Your care for me is overwhelming.', scene: '收礼', sceneEn: 'Receiving gifts' },
      { korean: '과분한 칭찬에 몸 둘 바를 모르겠네요.', chinese: '过奖了，真让我不知如何是好。', chineseEn: 'You flatter me; I\'m at a loss.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-41', korean: '변명', romanization: 'byeonmyeong', baseForm: '변명', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 1,
    meanings: [
      { chinese: '辩解、找借口', chineseEn: 'to make excuses, to justify', nuance: '中性偏负面', nuanceEn: 'neutral to slightly negative', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '변명 같지만 사정이 있었어요.', chinese: '虽然像是辩解，但确实有原因。', chineseEn: 'It may sound like an excuse, but there\'s a real reason.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '변명하지 않을게요.', chinese: '我不辩解了。', chineseEn: 'I won\'t make excuses anymore.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-42', korean: '앞으로', romanization: 'apeuro', baseForm: '앞으로', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '今后、以后（道歉后表态“今后会注意”）', chineseEn: 'from now on, in the future (used after apologizing to promise to be careful)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '앞으로 조심할게요.', chinese: '今后我会小心的。', chineseEn: 'I\'ll be careful from now on.', scene: '道歉', sceneEn: 'to apologize' },
      { korean: '앞으로 이런 일 없을 거예요.', chinese: '以后不会再有这种事了。', chineseEn: 'This won\'t happen again.', scene: '道歉', sceneEn: 'to apologize' },
    ],
    tags: ['道歉', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-43', korean: '감사 인사', romanization: 'gamsa insa', baseForm: '감사 인사', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '道谢、致谢的问候', chineseEn: 'a greeting of thanks, an expression of gratitude', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '감사 인사부터 드리고 싶었어요.', chinese: '我想先向您道谢。', chineseEn: 'I\'d like to thank you first.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '감사 인사 전하러 왔어요.', chinese: '我是来道谢的。', chineseEn: 'I\'ve come to thank you.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'grat-44', korean: '은혜', romanization: 'eunhye', baseForm: '은혜', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 1,
    meanings: [
      { chinese: '恩情、恩惠', chineseEn: 'favor, kindness, grace', nuance: '略庄重', nuanceEn: 'Somewhat solemn', register: '书面', registerEn: 'Written' },
    ],
    examples: [
      { korean: '이 은혜 잊지 않을게요.', chinese: '这份恩情我不会忘记。', chineseEn: 'I won\'t forget this kindness.', scene: '感谢', sceneEn: 'Thanks' },
      { korean: '베풀어 주신 은혜에 감사드려요.', chinese: '感谢您施予的恩惠。', chineseEn: 'Thank you for the favor you\'ve shown me.', scene: '感谢', sceneEn: 'Thanks' },
    ],
    tags: ['感谢', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-01', korean: '거절하다', romanization: 'geojeolhada', baseForm: '거절하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '拒绝、回绝', chineseEn: 'to refuse, to decline', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '제안을 정중하게 거절했어요.', chinese: '我礼貌地拒绝了提议。', chineseEn: 'I politely declined the offer.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '거절하기가 좀 미안했어요.', chinese: '拒绝的时候有点不好意思。', chineseEn: 'I felt a bit awkward when refusing.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-02', korean: '거절', romanization: 'geojeol', baseForm: '거절', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '拒绝', chineseEn: 'Refuse', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '거절을 잘 못하는 성격이에요.', chinese: '我是不太会拒绝人的性格。', chineseEn: 'I\'m the type who finds it hard to say no.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '완곡한 거절이었어요.', chinese: '那是委婉的拒绝。', chineseEn: 'That was a polite refusal.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-03', korean: '곤란하다', romanization: 'gollanhada', baseForm: '곤란하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '为难、不方便（委婉表示做不到的经典词）', chineseEn: 'difficult, inconvenient (a classic euphemism for being unable to do something)', nuance: '中性偏婉转', nuanceEn: 'Neutral, slightly euphemistic', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '그건 좀 곤란한데요.', chinese: '那个有点为难啊。', chineseEn: 'That\'s a bit difficult.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '지금은 곤란해요.', chinese: '现在不太方便。', chineseEn: 'It\'s not convenient right now.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-04', korean: '어렵다', romanization: 'eoryeopda', baseForm: '어렵다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '难、困难（委婉说“恐怕不行”时用“좀 어려울 것 같아요”）', chineseEn: 'difficult, hard (used to politely say \'I\'m afraid it won\'t work\' with \'좀 어려울 것 같아요\')', nuance: '婉转', nuanceEn: 'Euphemistic', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이번엔 좀 어려울 것 같아요.', chinese: '这次恐怕有点难。', chineseEn: 'I\'m afraid this time might be a bit difficult.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '시간 내기가 어려워요.', chinese: '抽不出时间。', chineseEn: 'I can\'t find the time.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-05', korean: '바쁘다', romanization: 'bappeuda', baseForm: '바쁘다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '忙（婉拒最常见的理由）', chineseEn: 'busy (the most common reason for politely declining)', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '요즘 좀 바빠서요.', chinese: '最近有点忙。', chineseEn: 'I\'ve been a bit busy lately.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '그날은 일이 바빠서 힘들 것 같아요.', chinese: '那天工作忙，恐怕不行。', chineseEn: 'I\'m busy with work that day, so I\'m afraid I can\'t.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-06', korean: '핑계', romanization: 'pinggye', baseForm: '핑계', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '借口、托辞', chineseEn: 'excuse, pretext', nuance: '中性偏负面', nuanceEn: 'neutral to slightly negative', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '핑계 대는 거 아니에요.', chinese: '我不是在找借口。', chineseEn: 'I\'m not making excuses.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '적당한 핑계가 필요해요.', chinese: '得找个合适的借口。', chineseEn: 'I need to find a suitable excuse.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-07', korean: '핑계를 대다', romanization: 'pinggyereul daeda', baseForm: '핑계를 대다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '找借口、拿……当托辞', chineseEn: 'to make excuses, to use... as a pretext', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '자꾸 핑계를 대지 마.', chinese: '别老是找借口。', chineseEn: 'Stop making excuses all the time.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '피곤하다는 핑계로 안 갔어요.', chinese: '借口说累就没去。', chineseEn: 'He used tiredness as an excuse not to go.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-08', korean: '사양하다', romanization: 'sayanghada', baseForm: '사양하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '谢绝、推辞（客气地拒绝好意）', chineseEn: 'to decline, to refuse (politely turning down kindness)', nuance: '正式客套', nuanceEn: 'Formal courtesy', register: '书面', registerEn: 'Written' },
    ],
    examples: [
      { korean: '마음만 받고 사양할게요.', chinese: '心意我领了，就不收了。', chineseEn: 'I appreciate the thought, but I\'ll have to decline.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '괜찮아요, 사양하겠습니다.', chinese: '不用了，我就谢绝了。', chineseEn: 'No thanks, I\'ll pass.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-09', korean: '됐어요', romanization: 'dwaesseoyo', baseForm: '되다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '不用了、够了（婉拒好意，语气随场合，稍不注意会显冷）', chineseEn: 'no thanks, that\'s enough (politely declining kindness; tone varies by situation, can seem cold if not careful)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '아니에요, 됐어요.', chinese: '不用了，没关系。', chineseEn: 'No need, it\'s fine.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '이 정도면 됐어요, 고마워요.', chinese: '这样就够了，谢谢。', chineseEn: 'That\'s enough, thank you.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-10', korean: '괜찮아요', romanization: 'gwaenchanayo', baseForm: '괜찮다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '不用了、没关系（婉拒时的高频“软拒绝”，比 됐어요 更客气）', chineseEn: 'no thanks, it\'s fine (a common soft refusal, more polite than 됐어요)', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '괜찮아요, 다음에 할게요.', chinese: '不用了，下次吧。', chineseEn: 'No thanks, maybe next time.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '저는 괜찮아요, 신경 쓰지 마세요.', chinese: '我没关系，别费心了。', chineseEn: 'I\'m fine, don\'t bother.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-11', korean: '아쉽다', romanization: 'aswipda', baseForm: '아쉽다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '可惜、遗憾（拒绝时先说“真可惜”来缓冲）', chineseEn: 'a pity, regrettable (used to soften a refusal by saying \'what a pity\' first)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '아쉽지만 이번엔 못 갈 것 같아요.', chinese: '很可惜，这次可能去不了。', chineseEn: 'It\'s a pity, but I probably can\'t make it this time.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '정말 아쉬워요, 다음 기회에요.', chinese: '真的很可惜，下次吧。', chineseEn: 'It\'s really a pity, maybe next time.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: ['遗憾'], relatedWords: [],
  },
  {
    id: 'refuse-12', korean: '다음 기회', romanization: 'daeum gihoe', baseForm: '다음 기회', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '下次机会（婉拒的经典收尾“다음 기회에요”）', chineseEn: 'next opportunity (a classic way to end a polite refusal with \'다음 기회에요\')', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '다음 기회에 꼭 같이 가요.', chinese: '下次一定一起去。', chineseEn: 'Let\'s definitely go together next time.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '이번은 다음 기회로 미룰게요.', chinese: '这次先留到下次吧。', chineseEn: 'Let\'s save it for next time.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-13', korean: '선약이 있다', romanization: 'seonyagi itda', baseForm: '선약이 있다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '有约在先（婉拒最体面的理由，对方无法追问）', chineseEn: 'Already have plans (the most polite excuse to decline; the other person can\'t press further)', nuance: '略正式', nuanceEn: 'Slightly formal', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '그날은 선약이 있어서요.', chinese: '那天有约在先。', chineseEn: 'I already have plans that day.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '죄송해요, 이미 선약이 있어요.', chinese: '抱歉，我已经有约了。', chineseEn: 'Sorry, I already have plans.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-14', korean: '컨디션', romanization: 'keondisyeon', baseForm: '컨디션', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '身体状态（“컨디션이 안 좋다”是委婉推掉约的常用理由）', chineseEn: 'Physical condition (“컨디션이 안 좋다” is a common excuse to politely decline plans)', nuance: '外来词，口语', nuanceEn: 'Loanword, colloquial', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '오늘 컨디션이 좀 안 좋아서요.', chinese: '今天身体状态不太好。', chineseEn: 'I\'m not feeling great today.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '컨디션 난조라 쉬어야 할 것 같아요.', chinese: '状态不好，得休息一下。', chineseEn: 'I\'m not in good shape; I need to rest.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-15', korean: '피곤하다', romanization: 'pigonhada', baseForm: '피곤하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '累、疲惫', chineseEn: 'Tired, exhausted', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '오늘은 너무 피곤해서 쉴게요.', chinese: '今天太累了，我要休息。', chineseEn: 'I\'m too tired today; I need to rest.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '피곤해서 일찍 들어가야 할 것 같아요.', chinese: '太累了，得早点回去。', chineseEn: 'I\'m too tired; I need to head back early.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-16', korean: '무리', romanization: 'muri', baseForm: '무리', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '勉强、超出能力（“무리예요”＝做不到、太勉强了）', chineseEn: 'Too much, beyond one\'s ability (“무리예요” = can\'t do it, too much)', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '그건 좀 무리예요.', chinese: '那个有点太勉强了。', chineseEn: 'That\'s a bit too much.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '오늘 안에는 무리일 것 같아요.', chinese: '今天之内恐怕做不到。', chineseEn: 'I\'m afraid I can\'t do it by today.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-17', korean: '부담', romanization: 'budam', baseForm: '부담', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '负担、压力（婉拒好意时“부담스러워요”很常用）', chineseEn: 'Burden, pressure (“부담스러워요” is common when politely declining kindness)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이렇게까지 하시면 부담스러워요.', chinese: '您这么客气我会有负担的。', chineseEn: 'I\'d feel burdened if you\'re so kind.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '부담 갖지 마세요.', chinese: '别有压力。', chineseEn: 'Don\'t feel pressured.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-18', korean: '부담스럽다', romanization: 'budamseureopda', baseForm: '부담스럽다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '感到有负担、觉得为难（好意过重时的委婉回绝）', chineseEn: 'Feel burdened, find it difficult (a polite refusal when kindness is too much)', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '너무 큰 선물은 좀 부담스러워요.', chinese: '太贵重的礼物我会有负担。', chineseEn: 'I\'d feel burdened by such a valuable gift.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '제가 받기엔 부담스러워요.', chinese: '让我收下有点为难。', chineseEn: 'It\'s a bit hard for me to accept.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-19', korean: '생각해 볼게요', romanization: 'saenggakae bolgeyo', baseForm: '생각하다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '我再想想（软性婉拒，往往意味着倾向于不做）', chineseEn: 'I\'ll think about it (a soft decline, often implying leaning toward not doing it)', nuance: '口语委婉', nuanceEn: 'Colloquial, euphemistic', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '음, 생각해 볼게요.', chinese: '嗯，我再想想。', chineseEn: 'Hmm, I\'ll think about it.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '좀 더 생각해 보고 연락드릴게요.', chinese: '我再考虑一下，回头联系您。', chineseEn: 'I\'ll think it over and get back to you.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-20', korean: '다음에 봐요', romanization: 'daeume bwayo', baseForm: '보다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '下次见吧（婉拒当下邀约、留有余地的常用语）', chineseEn: 'See you next time (a common phrase to decline an invitation while leaving room)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '오늘은 힘들고, 다음에 봐요.', chinese: '今天不行，下次见吧。', chineseEn: 'Not today; see you next time.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '다음에 봐요, 꼭 연락할게요.', chinese: '下次见，我一定联系你。', chineseEn: 'See you next time; I\'ll definitely contact you.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-21', korean: '별로', romanization: 'byeollo', baseForm: '별로', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '不太、不怎么（委婉表达不喜欢、不想去）', chineseEn: 'not really, not so much (a gentle way to express dislike or reluctance)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '저는 별로 안 내키는데요.', chinese: '我不太想去啊。', chineseEn: 'I don\'t really want to go.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '거긴 별로 가고 싶지 않아요.', chinese: '那里我不太想去。', chineseEn: 'I don\'t really want to go there.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-22', korean: '내키다', romanization: 'naekida', baseForm: '내키다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 1,
    meanings: [
      { chinese: '有心情、乐意（多用否定“안 내켜요”＝不太想）', chineseEn: 'in the mood, willing (often used in the negative \'안 내켜요\' = not really feeling it)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '오늘은 별로 안 내켜요.', chinese: '今天不太想。', chineseEn: 'I\'m not really feeling it today.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '마음이 안 내키면 안 가도 돼요.', chinese: '不想去的话不去也行。', chineseEn: 'If you don\'t want to go, you don\'t have to.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-23', korean: '눈치', romanization: 'nunchi', baseForm: '눈치', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '眼力见儿、察言观色（韩国社交核心概念，拒绝时靠察觉气氛）', chineseEn: 'reading the room, social awareness (a core concept in Korean socializing; used to sense the mood when declining)', nuance: '文化词', nuanceEn: 'Cultural term', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '눈치껏 자리를 피했어요.', chinese: '我看气氛悄悄避开了。', chineseEn: 'I read the mood and quietly slipped away.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '눈치가 빨라서 먼저 알아채요.', chinese: '他很会看眼色，会先察觉。', chineseEn: 'He\'s good at reading the room and picks up on things first.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-24', korean: '완곡하다', romanization: 'wangokada', baseForm: '완곡하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '5', frequency: 1,
    meanings: [
      { chinese: '委婉、婉转', chineseEn: 'tactful, euphemistic', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' },
    ],
    examples: [
      { korean: '완곡하게 거절하는 게 좋아요.', chinese: '最好委婉地拒绝。', chineseEn: 'It\'s best to decline tactfully.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '완곡한 표현을 썼어요.', chinese: '我用了委婉的说法。', chineseEn: 'I used a euphemistic way of putting it.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-25', korean: '거부하다', romanization: 'geobuhada', baseForm: '거부하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '拒绝、抵制（比 거절 更强硬、正式，多用于制度性场合）', chineseEn: 'refuse, reject (stronger and more formal than 거절, often used in institutional contexts)', nuance: '正式', nuanceEn: 'formal', register: '书面', registerEn: 'Written' },
    ],
    examples: [
      { korean: '그 제안을 단호히 거부했어요.', chinese: '他断然拒绝了那个提议。', chineseEn: 'He flatly rejected the proposal.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '요구를 거부할 권리가 있어요.', chinese: '有权拒绝这个要求。', chineseEn: 'He has the right to refuse this request.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-26', korean: '싫다', romanization: 'silta', baseForm: '싫다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '1', frequency: 3,
    meanings: [
      { chinese: '讨厌、不愿意（直接拒绝，语气强，慎用于长辈）', chineseEn: 'dislike, unwilling (a direct refusal with strong tone; use cautiously with elders)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '저는 그건 좀 싫어요.', chinese: '那个我不太愿意。', chineseEn: 'I\'m not too keen on that.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '억지로 하는 건 싫어요.', chinese: '我不喜欢勉强去做。', chineseEn: 'I don\'t like being forced to do things.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-27', korean: '부탁', romanization: 'butak', baseForm: '부탁', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '请求、拜托（拒绝的对象常是对方的 부탁）', chineseEn: 'request, favor (what you decline is often the other person\'s 부탁)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '부탁 하나만 들어줄 수 있어요?', chinese: '能帮我一个忙吗？', chineseEn: 'Can you do me a favor?', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '그 부탁은 들어주기 어려워요.', chinese: '这个忙恐怕帮不了。', chineseEn: 'I\'m afraid I can\'t help with this one.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-28', korean: '들어주다', romanization: 'deureojuda', baseForm: '들어주다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '答应、满足（对方的请求）', chineseEn: 'accept, fulfill (the other person\'s request)', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이번 부탁은 들어주기 힘들어요.', chinese: '这次的请求恐怕答应不了。', chineseEn: 'I\'m afraid I can\'t grant this request.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '들어주고 싶은데 사정이 안 돼요.', chinese: '我也想答应，但条件不允许。', chineseEn: 'I\'d like to say yes, but the circumstances don\'t allow it.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-29', korean: '사정', romanization: 'sajeong', baseForm: '사정', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '缘由、情况（“사정이 있어서”是不便明说时的挡箭牌）', chineseEn: 'reason, circumstances (\'사정이 있어서\' is a shield when you can\'t say the real reason)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '사정이 있어서 못 가요.', chinese: '有些原因去不了。', chineseEn: 'I can\'t go for some reasons.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '제 사정도 좀 이해해 주세요.', chinese: '也请体谅一下我的情况。', chineseEn: 'Please understand my situation too.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-30', korean: '죄송하지만', romanization: 'joesonghajiman', baseForm: '죄송하다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '不好意思、抱歉（拒绝开头的缓冲垫，几乎必备）', chineseEn: 'Sorry, excuse me (a buffer phrase to start a refusal, almost essential)', nuance: '敬语', nuanceEn: 'honorifics', register: '敬语', registerEn: 'honorifics' },
    ],
    examples: [
      { korean: '죄송하지만 오늘은 어려울 것 같아요.', chinese: '不好意思，今天恐怕不行。', chineseEn: 'Sorry, I\'m afraid today won\'t work.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '죄송하지만 그건 제가 도와드릴 수 없어요.', chinese: '抱歉，那个我帮不了您。', chineseEn: 'Sorry, I can\'t help you with that.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-31', korean: '미안하지만', romanization: 'mianhajiman', baseForm: '미안하다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '不好意思（拒绝平辈、熟人时的缓冲开头）', chineseEn: 'Sorry (a buffer phrase when refusing peers or acquaintances)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '미안하지만 나 먼저 갈게.', chinese: '不好意思，我先走了。', chineseEn: 'Sorry, I\'ll get going now.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '미안하지만 이번엔 못 도와줘.', chinese: '抱歉，这次帮不了你。', chineseEn: 'Sorry, I can\'t help you this time.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-32', korean: '어쩌죠', romanization: 'eojjeojyo', baseForm: '어쩌다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '这可怎么办呢（面露难色的婉拒语气词）', chineseEn: 'What should I do (a hesitant tone for politely refusing)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '어쩌죠, 그날은 안 될 것 같은데.', chinese: '这可怎么办，那天好像不行。', chineseEn: 'What should I do, that day doesn\'t seem to work.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '아, 어쩌죠, 이미 약속이 있어서요.', chinese: '啊，怎么办，我已经有约了。', chineseEn: 'Oh, what to do, I already have plans.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-33', korean: '양해', romanization: 'yanghae', baseForm: '양해', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '谅解、体谅（正式拒绝后请求对方谅解）', chineseEn: 'Understanding, consideration (asking for understanding after a formal refusal)', nuance: '正式', nuanceEn: 'formal', register: '书面', registerEn: 'Written' },
    ],
    examples: [
      { korean: '양해 부탁드립니다.', chinese: '还请您谅解。', chineseEn: 'Please understand.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '너그러운 양해 감사합니다.', chinese: '感谢您的宽容谅解。', chineseEn: 'Thank you for your understanding and patience.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-34', korean: '거리를 두다', romanization: 'georireul duda', baseForm: '거리를 두다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '5', frequency: 1,
    meanings: [
      { chinese: '保持距离（婉拒进一步来往的行为表达）', chineseEn: 'Keeping distance (an act of politely declining further interaction)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '조금 거리를 두고 싶어요.', chinese: '我想保持一点距离。', chineseEn: 'I\'d like to keep some distance.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '요즘은 좀 거리를 두는 편이에요.', chinese: '最近我倾向于保持距离。', chineseEn: 'Lately, I\'ve been leaning toward keeping my distance.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-35', korean: '넘어가다', romanization: 'neomeogada', baseForm: '넘어가다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '略过、揭过（把话题岔开以回避）', chineseEn: 'Skimming over, glossing over (changing the subject to avoid)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '그 얘긴 그냥 넘어가요.', chinese: '那事就翻篇儿吧。', chineseEn: 'Let\'s just move past that.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '오늘은 이쯤에서 넘어갈게요.', chinese: '今天就到这儿吧。', chineseEn: 'Let\'s call it a day.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-36', korean: '거절 못하는 성격', romanization: 'geojeol motaneun seonggyeok', baseForm: '거절 못하는 성격', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '不会拒绝人的性格（韩国人常自嘲的社交困扰）', chineseEn: 'A personality that can\'t say no (a social struggle Koreans often joke about)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '제가 거절 못하는 성격이라서요.', chinese: '我就是不会拒绝人的性格。', chineseEn: 'I\'m just the type who can\'t say no.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '거절 못하는 성격 때문에 늘 손해 봐요.', chinese: '因为不会拒绝，总是吃亏。', chineseEn: 'I always lose out because I can\'t say no.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-37', korean: '기분 상하다', romanization: 'gibun sanghada', baseForm: '기분 상하다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '心情受伤、不高兴（拒绝时最怕让对方 기분 상하다）', chineseEn: 'Feeling hurt, upset (the fear of making someone 기분 상하다 when refusing)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '기분 상하지 않게 말했어요.', chinese: '我说得很小心，怕伤到他。', chineseEn: 'I said it carefully, afraid of hurting him.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '혹시 기분 상하셨어요?', chinese: '您是不是不高兴了？', chineseEn: 'Are you upset?', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-38', korean: '조심스럽다', romanization: 'josimseureopda', baseForm: '조심스럽다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '谨慎、小心翼翼（说难以启齿的拒绝前铺垫）', chineseEn: 'cautious, careful (paving the way before a difficult refusal)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '조심스럽지만 거절할게요.', chinese: '虽然难以启齿，但我还是拒绝。', chineseEn: 'It\'s hard to say, but I have to decline.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '말씀드리기 조심스러운데요.', chinese: '这话说出来有点为难。', chineseEn: 'It\'s a bit awkward to say this.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-39', korean: '빼다', romanization: 'ppaeda', baseForm: '빼다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '推脱、扭捏推辞（口语里“몸을 빼다”式的躲避）', chineseEn: 'dodge, hem and haw (avoiding like \'몸을 빼다\' in colloquial speech)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '자꾸 빼지 말고 같이 가요.', chinese: '别老推脱了，一起去嘛。', chineseEn: 'Stop dodging, just come along.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '괜히 빼는 것 같아서 그냥 갔어요.', chinese: '怕显得矫情，就去了。', chineseEn: 'I went anyway, afraid of seeming fussy.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-40', korean: '거절 의사', romanization: 'geojeol uisa', baseForm: '거절 의사', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 1,
    meanings: [
      { chinese: '拒绝的意向（正式场合表达“拒绝的意思”）', chineseEn: 'intention to decline (formal way to express refusal)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' },
    ],
    examples: [
      { korean: '완곡하게 거절 의사를 밝혔어요.', chinese: '我委婉地表明了拒绝的意向。', chineseEn: 'I politely indicated my intention to decline.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '분명하게 거절 의사를 전했어요.', chinese: '我明确地传达了拒绝之意。', chineseEn: 'I clearly conveyed my refusal.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-41', korean: '난처하다', romanization: 'nancheohada', baseForm: '난처하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '为难、难堪（比 곤란하다 更强调进退两难）', chineseEn: 'awkward, embarrassing (more about being stuck than 곤란하다)', nuance: '略正式', nuanceEn: 'Slightly formal', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '갑자기 물어보시니 좀 난처하네요.', chinese: '您突然这么问，我有点为难。', chineseEn: 'You asking so suddenly puts me in a tough spot.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '입장이 난처해요.', chinese: '我的处境很难堪。', chineseEn: 'I\'m in an awkward situation.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-42', korean: '거절당하다', romanization: 'geojeoldanghada', baseForm: '거절당하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '被拒绝', chineseEn: 'to be rejected', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '고백했다가 거절당했어요.', chinese: '告白后被拒绝了。', chineseEn: 'I got rejected after confessing.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '거절당해도 괜찮아요.', chinese: '被拒绝也没关系。', chineseEn: 'It\'s okay to be rejected.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-43', korean: '단호하다', romanization: 'danhohada', baseForm: '단호하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '5', frequency: 1,
    meanings: [
      { chinese: '果断、坚决（该硬起来拒绝时的态度）', chineseEn: 'decisive, firm (the attitude when you need to refuse firmly)', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이번엔 단호하게 거절했어요.', chinese: '这次我坚决地拒绝了。', chineseEn: 'This time I firmly refused.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '단호한 태도가 필요해요.', chinese: '需要果断的态度。', chineseEn: 'You need a decisive attitude.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'refuse-44', korean: '부담 주다', romanization: 'budam juda', baseForm: '부담 주다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '给人压力、让人为难（拒绝时避免“부담 주는” 说法）', chineseEn: 'pressuring, burdensome (avoid saying \'부담 주는\' when refusing)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '부담 주려는 건 아니에요.', chinese: '我不是想给你压力。', chineseEn: 'I don\'t mean to pressure you.', scene: '拒绝', sceneEn: 'Refuse' },
      { korean: '괜히 부담 주는 것 같아서 말 안 했어요.', chinese: '怕给你添压力，就没说。', chineseEn: 'I didn\'t say it, afraid of burdening you.', scene: '拒绝', sceneEn: 'Refuse' },
    ],
    tags: ['拒绝', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-01', korean: '예능', romanization: 'yeneung', baseForm: '예능', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '综艺节目', chineseEn: 'Variety show', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '요즘 이 예능 진짜 재밌어요.', chinese: '最近这档综艺真好看。', chineseEn: 'This variety show is really good lately.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '주말에 예능 몰아 봤어요.', chinese: '周末刷了一堆综艺。', chineseEn: 'I binge-watched a bunch of variety shows over the weekend.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-02', korean: '자막', romanization: 'jamak', baseForm: '자막', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '字幕（综艺里花字，制作组的吐槽神器）', chineseEn: 'subtitles (the witty captions in shows, the producers\' roast tool)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이 프로는 자막이 진짜 웃겨요.', chinese: '这节目的字幕真的搞笑。', chineseEn: 'The subtitles on this show are hilarious.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '자막 센스가 대박이에요.', chinese: '字幕的梗玩得太绝了。', chineseEn: 'The subtitles\' jokes are absolutely brilliant.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '字幕'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-03', korean: '꿀잼', romanization: 'kkuljaem', baseForm: '꿀잼', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '超有趣、贼好玩（꿀＝蜂蜜＋재미，网络缩语）', chineseEn: 'Super fun, really entertaining (꿀 = honey + 재미, internet slang)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '이번 화 완전 꿀잼이었어요.', chinese: '这一集简直太有意思了。', chineseEn: 'This episode is just so entertaining.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '꿀잼이니까 꼭 보세요.', chinese: '超好看，一定要看。', chineseEn: 'It\'s amazing, you must watch it.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '流行语'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'variety-04', korean: '노잼', romanization: 'nojaem', baseForm: '노잼', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '无聊、没意思（no＋재미）', chineseEn: 'Boring, not fun (no + 재미)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '기대했는데 완전 노잼이었어요.', chinese: '本来挺期待，结果超无聊。', chineseEn: 'I was looking forward to it, but it turned out super boring.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '이번 편은 좀 노잼이네요.', chinese: '这一期有点无聊啊。', chineseEn: 'This episode is a bit boring.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-05', korean: '드립', romanization: 'deurip', baseForm: '드립', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '抖包袱、玩梗（来自 ad-lib，指临场搞笑的话）', chineseEn: 'To drop a punchline, play with memes (from ad-lib, meaning improvised funny remarks)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '아까 그 드립 진짜 웃겼어요.', chinese: '刚才那个梗真的笑死。', chineseEn: 'That joke earlier was hilarious.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '드립이 예술이네요.', chinese: '这包袱抖得绝了。', chineseEn: 'That punchline was perfectly delivered.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '流行语'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'variety-06', korean: '드립 치다', romanization: 'deurip chida', baseForm: '드립 치다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '抖包袱、开玩笑（临场说搞笑的话）', chineseEn: 'To drop a punchline, joke around (saying funny things on the spot)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '또 드립 쳤어요?', chinese: '你又在抖包袱了？', chineseEn: 'Are you dropping punchlines again?', scene: '综艺', sceneEn: 'variety show' },
      { korean: '진지한데 드립 치지 마세요.', chinese: '正经着呢，别开玩笑。', chineseEn: 'I\'m being serious, stop joking around.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['综艺', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-07', korean: '레전드', romanization: 'rejeondeu', baseForm: '레전드', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '传说级、名场面（legend，指经典到载入史册的片段）', chineseEn: 'Legendary, iconic scene (legend, referring to a classic moment that goes down in history)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '이 장면은 레전드예요.', chinese: '这一幕是名场面。', chineseEn: 'This scene is iconic.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '레전드 편은 몇 번을 봐도 웃겨요.', chinese: '经典的那期看多少遍都好笑。', chineseEn: 'The classic episode is funny no matter how many times you watch it.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-08', korean: '짤', romanization: 'jjal', baseForm: '짤', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '截图、表情包图（网络上流传的搞笑图片）', chineseEn: 'Screenshot, meme image (funny pictures shared online)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '이 짤 어디서 났어요?', chinese: '这张图哪来的？', chineseEn: 'Where did this image come from?', scene: '综艺', sceneEn: 'variety show' },
      { korean: '짤로 만들면 대박 나겠다.', chinese: '做成表情包肯定火。', chineseEn: 'It would definitely go viral as a meme.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-09', korean: '움짤', romanization: 'umjjal', baseForm: '움짤', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '动图（움직이는 짤，会动的表情图）', chineseEn: 'Animated image (움직이는 짤, moving meme)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '이 움짤 저장했어요.', chinese: '这个动图我存了。', chineseEn: 'I saved this animated image.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '움짤로 보니까 더 웃겨요.', chinese: '看动图更好笑。', chineseEn: 'It\'s funnier as an animated image.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-10', korean: '통편집', romanization: 'tongpyeonjip', baseForm: '통편집', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '整段被剪掉（통＝整个＋편집，戏份全没了）', chineseEn: 'Entirely cut out (통 = whole + 편집, all scenes removed)', nuance: '综艺行话', nuanceEn: 'Variety show jargon', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '그 장면 통편집됐어요.', chinese: '那段全被剪了。', chineseEn: 'That part was completely cut.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '분량이 통편집돼서 아쉬워요.', chinese: '戏份被整段剪掉了，好可惜。', chineseEn: 'The scenes were entirely cut out, what a shame.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '字幕'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-11', korean: '분량', romanization: 'bullyang', baseForm: '분량', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '戏份、镜头量（综艺里出镜时长）', chineseEn: 'screen time (amount of appearance in a variety show)', nuance: '综艺行话', nuanceEn: 'Variety show jargon', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이번 편은 분량이 많이 나왔어요.', chinese: '这期戏份给得挺多。', chineseEn: 'They gave him a lot of screen time this episode.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '분량 뽑으려고 열심히 하네요.', chinese: '为了多点镜头拼命表现呢。', chineseEn: 'He\'s working hard to get more screen time.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '字幕'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-12', korean: '리액션', romanization: 'riaeksyeon', baseForm: '리액션', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '反应（reaction，综艺里夸张的即时反应）', chineseEn: 'reaction (exaggerated immediate response in variety shows)', nuance: '外来词', nuanceEn: 'Loanwords', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '리액션이 진짜 커요.', chinese: '反应真的很浮夸。', chineseEn: 'The reaction is really over the top.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '리액션 장인이에요.', chinese: '是个反应担当。', chineseEn: 'He\'s the reaction guy.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-13', korean: '갑분싸', romanization: 'gapbunssa', baseForm: '갑분싸', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '突然冷场（갑자기 분위기 싸해짐 的缩语）', chineseEn: 'sudden awkward silence (abbreviation of 갑자기 분위기 싸해짐)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '그 말 하자마자 갑분싸됐어요.', chinese: '那话一出口就冷场了。', chineseEn: 'The moment he said that, it got awkward.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '갑분싸 만드는 데 선수예요.', chinese: '很会把气氛搞冷。', chineseEn: 'He\'s really good at killing the mood.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-14', korean: '국룰', romanization: 'gungnul', baseForm: '국룰', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '大家默认的惯例、约定俗成（국민 룰 的缩语）', chineseEn: 'unspoken rule, common practice (abbreviation of 국민 룰)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '치킨엔 콜라가 국룰이죠.', chinese: '炸鸡配可乐是标配啊。', chineseEn: 'Fried chicken with cola is a must.', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '이건 거의 국룰이에요.', chinese: '这基本是公认的惯例了。', chineseEn: 'This is basically a well-known rule.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['综艺', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-15', korean: '인정', romanization: 'injeong', baseForm: '인정', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '认同、同意（弹幕里刷“ㅇㅈ”表示赞同）', chineseEn: 'agree (typing \'ㅇㅈ\' in comments to show agreement)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '그 말 완전 인정이에요.', chinese: '这话我完全认同。', chineseEn: 'I totally agree with that.', scene: '弹幕', sceneEn: 'Danmaku (bullet comments)' },
      { korean: '인정? 어 인정.', chinese: '认同吗？嗯，认同。', chineseEn: 'Agree? Yeah, agree.', scene: '弹幕', sceneEn: 'Danmaku (bullet comments)' },
    ],
    tags: ['弹幕', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-16', korean: '레알', romanization: 'real', baseForm: '레알', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '真的、确实（real 的音译，弹幕缩写“ㄹㅇ”）', chineseEn: 'really, for real (transliteration of \'real\', abbreviated as \'ㄹㅇ\' in comments)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '레알 웃기네요.', chinese: '真的太好笑了。', chineseEn: 'That\'s really hilarious.', scene: '弹幕', sceneEn: 'Danmaku (bullet comments)' },
      { korean: '이거 레알임?', chinese: '这是真的吗？', chineseEn: 'Is this for real?', scene: '弹幕', sceneEn: 'Danmaku (bullet comments)' },
    ],
    tags: ['弹幕', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-17', korean: '오지다', romanization: 'ojida', baseForm: '오지다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '带劲、绝了（强调程度很高，弹幕高频）', chineseEn: 'awesome, insane (emphasizing high degree, frequent in comments)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '이 무대 진짜 오진다.', chinese: '这个舞台真的绝了。', chineseEn: 'This stage is absolutely insane.', scene: '弹幕', sceneEn: 'Danmaku (bullet comments)' },
      { korean: '실력이 오지네요.', chinese: '实力太顶了。', chineseEn: 'His skills are top-notch.', scene: '弹幕', sceneEn: 'Danmaku (bullet comments)' },
    ],
    tags: ['弹幕', '流行语'], emotionTags: ['兴奋'], relatedWords: [],
  },
  {
    id: 'variety-18', korean: '스트리머', romanization: 'seuteurimeo', baseForm: '스트리머', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '主播（streamer，做直播的人）', chineseEn: 'streamer (someone who does live broadcasts)', nuance: '外来词', nuanceEn: 'Loanwords', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '요즘 이 스트리머 방송 자주 봐요.', chinese: '最近常看这个主播的直播。', chineseEn: 'I\'ve been watching this streamer\'s broadcasts a lot lately.', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '스트리머가 게임을 진짜 잘해요.', chinese: '这主播游戏打得真好。', chineseEn: 'This streamer plays games really well.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['直播', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-19', korean: '생방송', romanization: 'saengbangsong', baseForm: '생방송', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '直播、现场直播', chineseEn: 'live broadcast, live streaming', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '지금 생방송 중이에요.', chinese: '现在正在直播。', chineseEn: 'We\'re live right now.', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '생방송으로 봐야 재밌어요.', chinese: '看直播才有意思。', chineseEn: 'Watching live is way more fun.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['直播', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-20', korean: '실시간', romanization: 'silsigan', baseForm: '실시간', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '实时、实况（实时聊天／实时反应）', chineseEn: 'Live (real-time chat/reactions)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '실시간 채팅이 엄청 빨라요.', chinese: '实时聊天刷得飞快。', chineseEn: 'The live chat is flying by.', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '실시간으로 소통하는 게 좋아요.', chinese: '喜欢实时互动的感觉。', chineseEn: 'I love the feel of real-time interaction.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['直播', '弹幕'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-21', korean: '채팅창', romanization: 'chaetingchang', baseForm: '채팅창', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '聊天框、弹幕框（直播里观众打字的地方）', chineseEn: 'Chat box (where viewers type during a stream)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '채팅창이 난리 났어요.', chinese: '弹幕框都刷疯了。', chineseEn: 'The chat is going crazy.', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '채팅창 좀 천천히 올려 주세요.', chinese: '弹幕刷慢一点吧。', chineseEn: 'Slow down the chat a bit.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['直播', '弹幕'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-22', korean: '시청자', romanization: 'sicheongja', baseForm: '시청자', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '观众、看直播的人', chineseEn: 'Viewers (people watching the stream)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '시청자가 만 명 넘었어요.', chinese: '观众超过一万了。', chineseEn: 'Viewers passed 10,000.', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '시청자들 질문 받을게요.', chinese: '来回答观众的提问。', chineseEn: 'Let\'s answer viewer questions.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['直播', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-23', korean: '도네', romanization: 'done', baseForm: '도네', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 3,
    meanings: [
      { chinese: '打赏（donation 的缩略，配文字念出的付费留言）', chineseEn: 'Donation (paid message read aloud)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '도네 감사합니다!', chinese: '感谢打赏！', chineseEn: 'Thanks for the donation!', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '도네 쏘면 읽어 줘요.', chinese: '打赏留言会被念出来。', chineseEn: 'Donation messages get read out loud.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['直播', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-24', korean: '별풍선', romanization: 'byeolpungseon', baseForm: '별풍선', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '星星气球（아프리카TV 的打赏道具，简称별풍）', chineseEn: 'Star balloon (AfreecaTV donation item, aka Byeolpung)', nuance: '平台专有词', nuanceEn: 'Platform-specific term', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '별풍선 쏴 주셔서 감사해요.', chinese: '谢谢您刷的星星气球。', chineseEn: 'Thanks for the star balloons.', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '별풍 개수가 어마어마하네요.', chinese: '星星气球数量太夸张了。', chineseEn: 'The number of star balloons is insane.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['直播', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-25', korean: '구독', romanization: 'gudok', baseForm: '구독', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '订阅（关注频道）', chineseEn: 'Subscribe (follow the channel)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '구독하고 알림 설정까지 해 주세요.', chinese: '记得订阅还有开启通知哦。', chineseEn: 'Remember to subscribe and turn on notifications.', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '구독자 수가 빠르게 늘어요.', chinese: '订阅数涨得很快。', chineseEn: 'Subscriber count is growing fast.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['直播', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-26', korean: '구독자', romanization: 'gudokja', baseForm: '구독자', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '订阅者、粉丝数', chineseEn: 'Subscribers, follower count', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '구독자 십만 명 축하해요!', chinese: '恭喜订阅破十万！', chineseEn: 'Congrats on hitting 100K subscribers!', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '구독자 여러분 안녕하세요.', chinese: '各位订阅者大家好。', chineseEn: 'Hello to all our subscribers.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['直播', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-27', korean: '좋아요', romanization: 'joayo', baseForm: '좋아요', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '点赞（视频下方的赞）', chineseEn: 'Like (thumbs up under the video)', nuance: '平台用语', nuanceEn: 'Platform terminology', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '영상 마음에 들면 좋아요 눌러 주세요.', chinese: '喜欢视频的话请点赞。', chineseEn: 'If you like the video, please hit like.', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '좋아요가 벌써 만 개예요.', chinese: '点赞已经一万了。', chineseEn: 'The likes have already reached 10,000.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['直播', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-28', korean: '알림 설정', romanization: 'allim seoljeong', baseForm: '알림 설정', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '开启通知（订阅铃铛，上新片时提醒）', chineseEn: 'Turn on notifications (subscribe to the bell to get alerts for new videos)', nuance: '平台用语', nuanceEn: 'Platform terminology', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '알림 설정 꼭 해 주세요.', chinese: '一定要开启通知哦。', chineseEn: 'Make sure to turn on notifications.', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '알림 설정하면 라이브 놓치지 않아요.', chinese: '开了通知就不会错过直播。', chineseEn: 'With notifications on, you won\'t miss the live stream.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['直播', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-29', korean: '치지직', romanization: 'chijijik', baseForm: '치지직', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: 'CHZZK（Naver 推出的游戏直播平台）', chineseEn: 'CHZZK (Naver\'s game live-streaming platform)', nuance: '平台名', nuanceEn: 'Platform name', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '요즘 치지직에서 방송해요.', chinese: '最近在 CHZZK 上直播。', chineseEn: 'I\'ve been streaming on CHZZK lately.', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '치지직으로 넘어온 스트리머가 많아요.', chinese: '很多主播转到 CHZZK 了。', chineseEn: 'Many streamers have moved to CHZZK.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['直播', '平台'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-30', korean: '유튜브', romanization: 'yutyubeu', baseForm: '유튜브', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [
      { chinese: 'YouTube', nuance: '平台名', nuanceEn: 'Platform name', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '유튜브에 영상 올렸어요.', chinese: '我把视频传到 YouTube 了。', chineseEn: 'I uploaded the video to YouTube.', scene: '直播', sceneEn: 'Live broadcast' },
      { korean: '유튜브 라이브로 봐요.', chinese: '在 YouTube 直播上看吧。', chineseEn: 'Watch it on the YouTube live stream.', scene: '直播', sceneEn: 'Live broadcast' },
    ],
    tags: ['直播', '平台'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-31', korean: '본방사수', romanization: 'bonbangsasu', baseForm: '본방사수', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '守着看首播（本방＝首播＋사수＝死守，不看重播）', chineseEn: 'Watching the premiere live (본방 = premiere + 사수 = watching religiously, not the rerun)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '오늘 첫 방송 본방사수할 거예요.', chinese: '今天首播我要守着看。', chineseEn: 'I\'m going to watch today\'s premiere live.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '본방사수 인증합니다!', chinese: '打卡守首播！', chineseEn: 'Checking in to watch the premiere live!', scene: '弹幕', sceneEn: 'Danmaku (bullet comments)' },
    ],
    tags: ['综艺', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-32', korean: '입덕', romanization: 'ipdeok', baseForm: '입덕', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '入坑、开始追（这里指因某综艺片段而喜欢上）', chineseEn: 'Getting hooked, starting to follow (here, falling for something because of a variety show clip)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '이 영상 보고 입덕했어요.', chinese: '看了这个视频就入坑了。', chineseEn: 'I got hooked after watching this video.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '입덕 영상 추천해 주세요.', chinese: '求推荐入坑视频。', chineseEn: 'Please recommend videos to get me hooked.', scene: '弹幕', sceneEn: 'Danmaku (bullet comments)' },
    ],
    tags: ['综艺', '流行语'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'variety-33', korean: '흑역사', romanization: 'heungnyeoksa', baseForm: '흑역사', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '黑历史（不愿被翻出来的过去糗事）', chineseEn: 'Cringe past (embarrassing moments you don\'t want dug up)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '옛날 영상은 흑역사예요.', chinese: '以前的视频都是黑历史。', chineseEn: 'My old videos are all cringe.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '흑역사 소환하지 마세요.', chinese: '别翻我黑历史。', chineseEn: 'Don\'t dig up my cringe past.', scene: '弹幕', sceneEn: 'Danmaku (bullet comments)' },
    ],
    tags: ['综艺', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-34', korean: '편집', romanization: 'pyeonjip', baseForm: '편집', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '剪辑、后期', chineseEn: 'Editing, post-production', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '편집 센스가 진짜 좋아요.', chinese: '剪辑的感觉真好。', chineseEn: 'Editing feels great.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '편집 덕분에 더 웃겨요.', chinese: '多亏剪辑，更好笑了。', chineseEn: 'Thanks to the editing, it\'s funnier.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '字幕'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-35', korean: '자막 장인', romanization: 'jamak jangin', baseForm: '자막 장인', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '字幕匠人（花字玩得神的制作组）', chineseEn: 'Subtitle master (production team that\'s amazing with fancy captions)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '이 프로 자막 장인이 만들었나 봐요.', chinese: '这节目的字幕像匠人手笔。', chineseEn: 'This show\'s subtitles are like a master\'s work.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '자막 장인의 센스가 돋보여요.', chinese: '字幕匠人的功力很出彩。', chineseEn: 'The subtitle master\'s skill really stands out.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '字幕'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-36', korean: '명장면', romanization: 'myeongjangmyeon', baseForm: '명장면', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '名场面、经典片段', chineseEn: 'Iconic scene, classic clip', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이건 명장면으로 남을 거예요.', chinese: '这会成为名场面的。', chineseEn: 'This is going to become a legendary scene.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '명장면만 모아 놓은 영상이에요.', chinese: '这是名场面合集视频。', chineseEn: 'This is a compilation video of iconic scenes.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-37', korean: '애드리브', romanization: 'aedeuribeu', baseForm: '애드리브', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '即兴发挥（ad-lib，没剧本的临场表演）', chineseEn: 'ad-lib (improvised performance without a script)', nuance: '外来词', nuanceEn: 'Loanwords', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '저 대사 애드리브래요.', chinese: '听说那句台词是即兴的。', chineseEn: 'I heard that line was improvised.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '애드리브가 신의 한 수였어요.', chinese: '那段即兴简直神来一笔。', chineseEn: 'That ad-lib was a stroke of genius.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-38', korean: '게스트', romanization: 'geseuteu', baseForm: '게스트', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '嘉宾（guest）', chineseEn: 'guest', nuance: '外来词', nuanceEn: 'Loanwords', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '이번 주 게스트가 대박이에요.', chinese: '这周的嘉宾太厉害了。', chineseEn: 'This week\'s guest is amazing.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '게스트로 누가 나와요?', chinese: '有谁来当嘉宾？', chineseEn: 'Who\'s the guest?', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-39', korean: '엠씨', romanization: 'emssi', baseForm: '엠씨', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '主持人（MC）', chineseEn: 'MC (host)', nuance: '外来词', nuanceEn: 'Loanwords', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '엠씨가 진행을 잘해요.', chinese: '主持人控场很好。', chineseEn: 'The MC handled the show well.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '엠씨 드립에 다들 빵 터졌어요.', chinese: '主持人一抖包袱大家都笑喷了。', chineseEn: 'When the MC dropped the punchline, everyone burst out laughing.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-40', korean: '빵 터지다', romanization: 'ppang teojida', baseForm: '빵 터지다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '笑喷、笑炸（突然被逗得大笑）', chineseEn: 'burst out laughing (suddenly cracking up)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '그 장면에서 빵 터졌어요.', chinese: '看到那一幕就笑喷了。', chineseEn: 'I burst out laughing at that scene.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '채팅창이 빵 터졌어요.', chinese: '弹幕都笑炸了。', chineseEn: 'The comments exploded with laughter.', scene: '弹幕', sceneEn: 'Danmaku (bullet comments)' },
    ],
    tags: ['综艺', '弹幕'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'variety-41', korean: '짤리다', romanization: 'jjallida', baseForm: '짤리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '被剪掉（口语，정확히는 잘리다，指镜头被剪）', chineseEn: 'cut out (slang, meaning the footage was edited out)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '재밌는 부분이 다 짤렸어요.', chinese: '有意思的部分全被剪了。', chineseEn: 'All the funny parts got cut out.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '내 분량 또 짤렸어.', chinese: '我的戏份又被剪了。', chineseEn: 'My part got cut again.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '字幕'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-42', korean: '어그로', romanization: 'eogeuro', baseForm: '어그로', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '带节奏、博眼球（aggro，故意挑事引关注）', chineseEn: 'stir the pot, bait (aggro, deliberately provoking for attention)', nuance: '网络流行语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '괜히 어그로 끌지 마세요.', chinese: '别故意带节奏了。', chineseEn: 'Stop deliberately stirring the pot.', scene: '弹幕', sceneEn: 'Danmaku (bullet comments)' },
      { korean: '제목부터 어그로네요.', chinese: '标题就是博眼球。', chineseEn: 'The title is just clickbait.', scene: '弹幕', sceneEn: 'Danmaku (bullet comments)' },
    ],
    tags: ['弹幕', '流行语'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-43', korean: '고정 멤버', romanization: 'gojeong membeo', baseForm: '고정 멤버', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '固定成员（综艺里每期都在的常驻）', chineseEn: 'regular cast member (permanent member on a variety show)', nuance: '综艺行话', nuanceEn: 'Variety show jargon', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '고정 멤버가 바뀌었어요.', chinese: '固定成员换人了。', chineseEn: 'The regular cast member was replaced.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '고정 멤버 케미가 좋아요.', chinese: '常驻成员的默契很好。', chineseEn: 'The regulars have great chemistry.', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'variety-44', korean: '재방송', romanization: 'jaebangsong', baseForm: '재방송', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '重播', chineseEn: 'replay', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '못 봤으면 재방송으로 보세요.', chinese: '没看的话看重播吧。', chineseEn: 'If you missed it, watch the replay.', scene: '综艺', sceneEn: 'variety show' },
      { korean: '재방송 시간이 언제예요?', chinese: '重播是什么时候？', chineseEn: 'When is the replay?', scene: '综艺', sceneEn: 'variety show' },
    ],
    tags: ['综艺', '韩流'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-01', korean: '콘서트', romanization: 'konseoteu', baseForm: '콘서트', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '演唱会（concert）', chineseEn: 'concert', nuance: '外来词', nuanceEn: 'Loanwords', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '드디어 콘서트에 가요!', chinese: '终于要去看演唱会了！', chineseEn: 'Finally going to see the concert!', scene: '演唱会', sceneEn: 'Concert' },
      { korean: '콘서트 티켓 구했어요.', chinese: '演唱会门票抢到了。', chineseEn: 'Got the concert tickets.', scene: '抢票', sceneEn: 'ticket rush' },
    ],
    tags: ['演唱会', '现场'], emotionTags: ['兴奋'], relatedWords: [],
  },
  {
    id: 'concert-02', korean: '티켓팅', romanization: 'tiketing', baseForm: '티켓팅', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '抢票（ticketing，开票瞬间的抢购大战）', chineseEn: 'ticketing (the mad rush to grab tickets the moment they go on sale)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '내일 티켓팅 성공해야 할 텐데요.', chinese: '明天抢票一定要成功啊。', chineseEn: 'Hope I can score tickets tomorrow.', scene: '抢票', sceneEn: 'ticket rush' },
      { korean: '티켓팅은 정말 전쟁이에요.', chinese: '抢票简直就是打仗。', chineseEn: 'Ticketing is like a battlefield.', scene: '抢票', sceneEn: 'ticket rush' },
    ],
    tags: ['抢票', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-03', korean: '피켓팅', romanization: 'piketing', baseForm: '피켓팅', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '地狱级抢票（피 튀기는 티켓팅＝见血的抢票，秒空）', chineseEn: 'hell-level ticketing (blood-splattered ticketing, sold out in seconds)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '이번 공연은 완전 피켓팅이었어요.', chinese: '这次演出简直是地狱抢票。', chineseEn: 'This show is hell-level ticketing.', scene: '抢票', sceneEn: 'ticket rush' },
      { korean: '피켓팅 뚫고 겨우 성공했어요.', chinese: '杀出重围终于抢到了。', chineseEn: 'Fought through the crowd and finally got them.', scene: '抢票', sceneEn: 'ticket rush' },
    ],
    tags: ['抢票', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-04', korean: '예매', romanization: 'yemae', baseForm: '예매', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '预订、订票（提前买票）', chineseEn: 'booking (buying tickets in advance)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '예매는 몇 시부터 시작해요?', chinese: '订票几点开始？', chineseEn: 'What time does booking start?', scene: '抢票', sceneEn: 'ticket rush' },
      { korean: '예매 페이지가 계속 튕겨요.', chinese: '订票页面一直崩。', chineseEn: 'The booking page keeps crashing.', scene: '抢票', sceneEn: 'ticket rush' },
    ],
    tags: ['抢票', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-05', korean: '선예매', romanization: 'seonyemae', baseForm: '선예매', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '优先预售（팬클럽 会员先买的场次）', chineseEn: 'priority presale (fan club members buy first)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '팬클럽 선예매로 잡았어요.', chinese: '用粉丝会优先购抢到了。', chineseEn: 'Got them through the fan club presale.', scene: '抢票', sceneEn: 'ticket rush' },
      { korean: '선예매가 일반 예매보다 하루 빨라요.', chinese: '优先购比普通订票早一天。', chineseEn: 'Presale is a day earlier than general booking.', scene: '抢票', sceneEn: 'ticket rush' },
    ],
    tags: ['抢票', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-06', korean: '취켓팅', romanization: 'chwiketing', baseForm: '취켓팅', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '捡漏抢退票（취소표 티켓팅，蹲别人退的票）', chineseEn: 'snagging canceled tickets (waiting for others\' cancellations)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '취켓팅으로 겨우 자리 하나 구했어요.', chinese: '靠捡退票好不容易搞到一个位子。', chineseEn: 'Managed to snag a spot from a canceled ticket.', scene: '抢票', sceneEn: 'ticket rush' },
      { korean: '공연 전날 취켓팅 노려 봐요.', chinese: '演出前一天蹲蹲退票吧。', chineseEn: 'Let\'s wait for cancellations the day before the show.', scene: '抢票', sceneEn: 'ticket rush' },
    ],
    tags: ['抢票', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-07', korean: '좌석', romanization: 'jwaseok', baseForm: '좌석', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '座位', chineseEn: 'seat', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '좌석이 무대랑 가까워요.', chinese: '座位离舞台很近。', chineseEn: 'The seat is close to the stage.', scene: '座位', sceneEn: 'seat' },
      { korean: '제 좌석 번호가 몇 번이죠?', chinese: '我的座位号是几号来着？', chineseEn: 'What\'s my seat number again?', scene: '座位', sceneEn: 'seat' },
    ],
    tags: ['座位', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-08', korean: '스탠딩', romanization: 'seutending', baseForm: '스탠딩', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '站席（standing，没有座位、站着看的区域）', chineseEn: 'standing (no seats, standing area)', nuance: '外来词', nuanceEn: 'Loanwords', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '스탠딩은 번호 순서대로 입장해요.', chinese: '站席按号码顺序入场。', chineseEn: 'Standing enters by number order.', scene: '座位', sceneEn: 'seat' },
      { korean: '스탠딩 앞 구역 잡았어요.', chinese: '抢到了站席前排区。', chineseEn: 'Got a spot in the front standing area.', scene: '座位', sceneEn: 'seat' },
    ],
    tags: ['座位', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-09', korean: '지정석', romanization: 'jijeongseok', baseForm: '지정석', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '指定座位、对号入座', chineseEn: 'assigned seating', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '저는 지정석이라 편해요.', chinese: '我是对号座，比较轻松。', chineseEn: 'I have assigned seating, so it\'s more relaxed.', scene: '座位', sceneEn: 'seat' },
      { korean: '지정석은 자리 안 뺏겨요.', chinese: '指定座位不会被抢。', chineseEn: 'Reserved seats won\'t be taken.', scene: '座位', sceneEn: 'seat' },
    ],
    tags: ['座位', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-10', korean: '시야제한석', romanization: 'siyajehanseok', baseForm: '시야제한석', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '视线受限座位（被设备遮挡、看不全舞台的便宜票）', chineseEn: 'Restricted-view seats (cheaper tickets with blocked or partial stage views)', nuance: '现场专有词', nuanceEn: 'Live event term', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '시야제한석이라 좀 가려요.', chinese: '是视线受限座，有点被挡。', chineseEn: 'It\'s a restricted-view seat, a bit blocked.', scene: '座位', sceneEn: 'seat' },
      { korean: '시야제한석은 값이 싸요.', chinese: '视线受限座票价便宜。', chineseEn: 'Restricted-view seats are cheaper.', scene: '座位', sceneEn: 'seat' },
    ],
    tags: ['座位', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-11', korean: '앞자리', romanization: 'apjari', baseForm: '앞자리', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '前排、前面的位子', chineseEn: 'Front row, seats at the front', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '앞자리라서 얼굴이 다 보여요.', chinese: '前排位子脸都看得清清楚楚。', chineseEn: 'In the front row, you can see faces clearly.', scene: '座位', sceneEn: 'seat' },
      { korean: '이번엔 앞자리 당첨됐어요.', chinese: '这次抽到前排了。', chineseEn: 'I got front-row seats this time.', scene: '座位', sceneEn: 'seat' },
    ],
    tags: ['座位', '现场'], emotionTags: ['兴奋'], relatedWords: [],
  },
  {
    id: 'concert-12', korean: '응원봉', romanization: 'eungwonbong', baseForm: '응원봉', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '应援棒、灯棒（每个团专属的官方手灯）', chineseEn: 'Light stick (official fan light unique to each group)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '응원봉 챙겼어요?', chinese: '应援棒带了吗？', chineseEn: 'Did you bring your light stick?', scene: '应援', sceneEn: 'fan support' },
      { korean: '응원봉이 노래에 맞춰 색이 바뀌어요.', chinese: '应援棒会随歌变颜色。', chineseEn: 'The light stick changes color with the song.', scene: '应援', sceneEn: 'fan support' },
    ],
    tags: ['应援', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-13', korean: '슬로건', romanization: 'seullogeon', baseForm: '슬로건', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '应援横幅、口号布条（举着或挂脖上的应援物）', chineseEn: 'Support banner (a banner or slogan strip held up or worn around the neck)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '입구에서 슬로건 나눠 줬어요.', chinese: '入口处发了应援横幅。', chineseEn: 'Support banners were handed out at the entrance.', scene: '应援', sceneEn: 'fan support' },
      { korean: '슬로건 들고 응원했어요.', chinese: '举着横幅应援。', chineseEn: 'Cheering while holding up a banner.', scene: '应援', sceneEn: 'fan support' },
    ],
    tags: ['应援', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-14', korean: '응원법', romanization: 'eungwonbeop', baseForm: '응원법', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '应援口号、应援方式（每首歌该喊的固定词和节奏）', chineseEn: 'Fan chant (the fixed words and rhythm to shout for each song)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '응원법 미리 외워 갔어요.', chinese: '提前把应援口号背好了。', chineseEn: 'I memorized the fan chants in advance.', scene: '应援', sceneEn: 'fan support' },
      { korean: '응원법 영상 보면서 연습했어요.', chinese: '看着应援教学视频练习了。', chineseEn: 'I practiced by watching fan chant tutorial videos.', scene: '应援', sceneEn: 'fan support' },
    ],
    tags: ['应援', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-15', korean: '떼창', romanization: 'ttechang', baseForm: '떼창', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 3,
    meanings: [
      { chinese: '全场大合唱（观众齐声跟唱，韩国演唱会名场面）', chineseEn: 'Full-venue sing-along (the audience singing together, a iconic K-concert moment)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '떼창 소리에 소름 돋았어요.', chinese: '全场合唱听得我起鸡皮疙瘩。', chineseEn: 'The full-venue sing-along gave me goosebumps.', scene: '现场', sceneEn: 'live' },
      { korean: '이 노래는 떼창이 국룰이에요.', chinese: '这首歌全场合唱是惯例。', chineseEn: 'A full-venue sing-along is customary for this song.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['应援', '现场'], emotionTags: ['感动'], relatedWords: [],
  },
  {
    id: 'concert-16', korean: '함성', romanization: 'hamseong', baseForm: '함성', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '呐喊声、欢呼声', chineseEn: 'Cheers, shouts', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '무대에 나오자 함성이 터졌어요.', chinese: '一登台欢呼声就炸了。', chineseEn: 'The cheers exploded the moment they stepped on stage.', scene: '现场', sceneEn: 'live' },
      { korean: '함성 소리가 어마어마했어요.', chinese: '呐喊声大得惊人。', chineseEn: 'The cheering was amazingly loud.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: ['兴奋'], relatedWords: [],
  },
  {
    id: 'concert-17', korean: '앵콜', romanization: 'aengkol', baseForm: '앵콜', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '安可、返场（encore，喊着让偶像再唱一首）', chineseEn: 'Encore (shouting for the idol to sing one more song)', nuance: '外来词', nuanceEn: 'Loanwords', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '앵콜 외치니까 다시 나왔어요.', chinese: '喊安可他们又出来了。', chineseEn: 'They came out again when we shouted encore.', scene: '现场', sceneEn: 'live' },
      { korean: '앵콜 무대가 제일 좋았어요.', chinese: '安可舞台是我最喜欢的。', chineseEn: 'The encore stage is my favorite.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: ['兴奋'], relatedWords: [],
  },
  {
    id: 'concert-18', korean: '퇴근길', romanization: 'toegeungil', baseForm: '퇴근길', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '偶像下班路（演出结束偶像离场时粉丝在门口相送的场面）', chineseEn: 'Idol exit route (the scene where fans see idols off at the entrance after a show ends)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '퇴근길에 손 흔들어 줬어요.', chinese: '下班路上他向我们挥手了。', chineseEn: 'He waved at us on his way out.', scene: '现场', sceneEn: 'live' },
      { korean: '퇴근길 보려고 끝까지 기다렸어요.', chinese: '为了看下班路一直等到最后。', chineseEn: 'I waited until the very end to see the exit route.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: ['兴奋'], relatedWords: [],
  },
  {
    id: 'concert-19', korean: '입장', romanization: 'ipjang', baseForm: '입장', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '入场', chineseEn: 'Entry', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '입장은 몇 시부터예요?', chinese: '几点开始入场？', chineseEn: 'What time does entry start?', scene: '现场', sceneEn: 'live' },
      { korean: '입장할 때 신분증 확인해요.', chinese: '入场时会核对身份证。', chineseEn: 'ID is checked at entry.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '入场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-20', korean: '입장 순서', romanization: 'ipjang sunseo', baseForm: '입장 순서', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '入场顺序（站席按抽到的号码排队进场）', chineseEn: 'Entry order (standing seats queue by drawn number)', nuance: '现场专有词', nuanceEn: 'Live event term', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '입장 순서가 빨라서 앞에 섰어요.', chinese: '入场顺序靠前，站到前面了。', chineseEn: 'My entry order was early, so I got to the front.', scene: '现场', sceneEn: 'live' },
      { korean: '입장 순서는 번호표로 정해요.', chinese: '入场顺序按号码牌决定。', chineseEn: 'Entry order is determined by the number tag.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '入场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-21', korean: '굿즈', romanization: 'gutjeu', baseForm: '굿즈', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '周边（goods，官方商品）', chineseEn: 'Merch (goods, official merchandise)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '굿즈 사려고 일찍 갔어요.', chinese: '为了买周边早早就去了。', chineseEn: 'I went early to buy merch.', scene: '周边', sceneEn: 'Merch.' },
      { korean: '굿즈 줄이 엄청 길어요.', chinese: '买周边的队排得超长。', chineseEn: 'The merch line was super long.', scene: '周边', sceneEn: 'Merch.' },
    ],
    tags: ['周边', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-22', korean: '엠디', romanization: 'emdi', baseForm: '엠디', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '演唱会周边（MD＝merchandise，现场卖的官方商品）', chineseEn: 'Concert merch (MD = merchandise, official goods sold on-site)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '엠디 부스가 어디 있어요?', chinese: '周边摊位在哪儿？', chineseEn: 'Where\'s the merch booth?', scene: '周边', sceneEn: 'Merch.' },
      { korean: '엠디는 현장에서만 팔아요.', chinese: '这周边只在现场卖。', chineseEn: 'This merch is only sold on-site.', scene: '周边', sceneEn: 'Merch.' },
    ],
    tags: ['周边', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-23', korean: '포토카드', romanization: 'potokadeu', baseForm: '포토카드', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '小卡（photo card，简称포카，随机附赠的偶像卡片）', chineseEn: 'Photo card (photo card, short for 포카, random idol card)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '포토카드 최애 뽑았어요!', chinese: '小卡抽到本命了！', chineseEn: 'I pulled my bias in the photo card!', scene: '周边', sceneEn: 'Merch.' },
      { korean: '포토카드 교환하실 분 있어요?', chinese: '有人要换小卡吗？', chineseEn: 'Anyone want to trade photo cards?', scene: '周边', sceneEn: 'Merch.' },
    ],
    tags: ['周边', '现场'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'concert-24', korean: '포카', romanization: 'poka', baseForm: '포카', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 3,
    meanings: [
      { chinese: '小卡（포토카드 的缩语，粉丝口语最常用）', chineseEn: 'Photo card (short for 포토카드, most common in fan slang)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '포카 모으는 재미가 쏠쏠해요.', chinese: '集小卡挺有乐趣的。', chineseEn: 'Collecting photo cards is fun.', scene: '周边', sceneEn: 'Merch.' },
      { korean: '중복 포카는 양도해요.', chinese: '重复的小卡我出。', chineseEn: 'I\'m selling my duplicate photo cards.', scene: '周边', sceneEn: 'Merch.' },
    ],
    tags: ['周边', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-25', korean: '양도', romanization: 'yangdo', baseForm: '양도', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '转让（把多余的票或周边原价让给别人）', chineseEn: 'Resale (selling extra tickets or merch at original price)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '티켓 양도 구해요.', chinese: '求转让门票。', chineseEn: 'Looking to buy a resold ticket.', scene: '抢票', sceneEn: 'ticket rush' },
      { korean: '정가로 양도할게요.', chinese: '原价转让。', chineseEn: 'Selling at original price.', scene: '抢票', sceneEn: 'ticket rush' },
    ],
    tags: ['抢票', '周边'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-26', korean: '플미', romanization: 'peulmi', baseForm: '플미', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '溢价、加价（프리미엄 的缩语，黄牛加价转卖，粉圈很反感）', chineseEn: 'Premium markup (short for 프리미엄, scalpers reselling at a higher price, frowned upon in fandoms)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '플미 양도는 사절이에요.', chinese: '加价转让恕不接受。', chineseEn: 'I won\'t accept premium markups.', scene: '抢票', sceneEn: 'ticket rush' },
      { korean: '플미 붙여서 파는 사람 진짜 싫어요.', chinese: '真讨厌加价倒卖的人。', chineseEn: 'I really hate people who resell at inflated prices.', scene: '抢票', sceneEn: 'ticket rush' },
    ],
    tags: ['抢票', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-27', korean: '오프', romanization: 'opeu', baseForm: '오프', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '线下活动（오프라인 的缩语，指到现场的追星活动）', chineseEn: 'Offline event (short for 오프라인, meaning in-person fan events)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '이번 오프 같이 갈래요?', chinese: '这次线下活动一起去吗？', chineseEn: 'Want to go to this offline event together?', scene: '现场', sceneEn: 'live' },
      { korean: '오프 뛰는 팬들이 많아요.', chinese: '跑线下活动的粉丝很多。', chineseEn: 'A lot of fans attend offline events.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-28', korean: '올콘', romanization: 'olkon', baseForm: '올콘', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '全场演唱会都去（all concert，每一场都不落）', chineseEn: 'Go to every concert (all concert, not missing a single one)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '이번 투어 올콘했어요.', chinese: '这次巡演我全场都去了。', chineseEn: 'I went to every show of this tour.', scene: '现场', sceneEn: 'live' },
      { korean: '올콘하려고 휴가까지 냈어요.', chinese: '为了场场都去连假都请了。', chineseEn: 'I even took time off work to catch every show.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: ['兴奋'], relatedWords: [],
  },
  {
    id: 'concert-29', korean: '막콘', romanization: 'makkon', baseForm: '막콘', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '最后一场（마지막 콘서트，巡演收官场，最催泪）', chineseEn: 'Final show (마지막 콘서트, the last stop of a tour, the most tear-jerking)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '막콘이라 다들 울었어요.', chinese: '因为是收官场大家都哭了。', chineseEn: 'Everyone cried because it was the final show.', scene: '现场', sceneEn: 'live' },
      { korean: '막콘 티켓은 더 치열해요.', chinese: '收官场的票更难抢。', chineseEn: 'Tickets for the final show are even harder to get.', scene: '抢票', sceneEn: 'ticket rush' },
    ],
    tags: ['现场', '应援'], emotionTags: ['感动'], relatedWords: [],
  },
  {
    id: 'concert-30', korean: '첫콘', romanization: 'cheotkon', baseForm: '첫콘', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '首场演唱会（첫 콘서트，巡演开场场次）', chineseEn: 'Opening concert (첫 콘서트, the first stop of a tour)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '첫콘부터 분위기가 뜨거웠어요.', chinese: '首场气氛就很火热。', chineseEn: 'The atmosphere was already on fire at the opening show.', scene: '现场', sceneEn: 'live' },
      { korean: '첫콘 세트리스트 궁금해요.', chinese: '好奇首场的歌单。', chineseEn: 'I\'m curious about the setlist for the opening show.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-31', korean: '세트리스트', romanization: 'seteuriseuteu', baseForm: '세트리스트', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '歌单、曲目表（setlist，简称세트리，当场表演的曲目顺序）', chineseEn: 'Setlist (setlist, short for 세트리, the order of songs performed)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '세트리스트에 명곡이 다 있어요.', chinese: '歌单里名曲全都有。', chineseEn: 'The setlist had all the hits.', scene: '现场', sceneEn: 'live' },
      { korean: '세트리스트 미리 안 봐요, 스포 싫어서요.', chinese: '我不提前看歌单，讨厌剧透。', chineseEn: 'I don\'t look at the setlist beforehand—I hate spoilers.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-32', korean: '직캠', romanization: 'jikkaem', baseForm: '직캠', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 3,
    meanings: [
      { chinese: '直拍（粉丝对着一个成员单独拍的现场视频）', chineseEn: 'Fancam (a fan-filmed video focusing on one member)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '직캠 화질이 진짜 좋아요.', chinese: '直拍画质真的好。', chineseEn: 'The fancam quality is really good.', scene: '现场', sceneEn: 'live' },
      { korean: '최애 직캠만 계속 돌려 봐요.', chinese: '本命的直拍一直循环看。', chineseEn: 'I keep replaying my bias\'s fancam on loop.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-33', korean: '무대', romanization: 'mudae', baseForm: '무대', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [
      { chinese: '舞台', chineseEn: 'Stage', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '무대가 진짜 화려했어요.', chinese: '舞台真的超华丽。', chineseEn: 'The stage was absolutely stunning.', scene: '现场', sceneEn: 'live' },
      { korean: '무대 위에서 빛이 나요.', chinese: '他在台上闪闪发光。', chineseEn: 'He was shining on stage.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: ['感动'], relatedWords: [],
  },
  {
    id: 'concert-34', korean: '무대 인사', romanization: 'mudae insa', baseForm: '무대 인사', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '谢幕致辞、舞台问候（表演间隙偶像的讲话环节）', chineseEn: 'Closing remarks, stage greeting (the idol\'s speech segment during the show)', nuance: '现场专有词', nuanceEn: 'Live event term', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '무대 인사 때 울컥했어요.', chinese: '谢幕致辞时我鼻子一酸。', chineseEn: 'I got choked up during the closing remarks.', scene: '现场', sceneEn: 'live' },
      { korean: '멤버마다 무대 인사를 했어요.', chinese: '每个成员都做了舞台问候。', chineseEn: 'Every member gave a stage greeting.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: ['感动'], relatedWords: [],
  },
  {
    id: 'concert-35', korean: '눈맞춤', romanization: 'nunmatchum', baseForm: '눈맞춤', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [
      { chinese: '对视、眼神交流（粉丝最珍视的“和爱豆对上眼”瞬间）', chineseEn: 'Eye contact (the moment fans treasure most—locking eyes with their idol)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '오늘 눈맞춤했어요, 심장 터질 뻔.', chinese: '今天对上眼了，心脏差点炸。', chineseEn: 'We made eye contact today—my heart almost exploded.', scene: '现场', sceneEn: 'live' },
      { korean: '눈맞춤 한 번에 하루가 행복해요.', chinese: '对视一次就能开心一整天。', chineseEn: 'One eye contact can make you happy all day.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'concert-36', korean: '팬서비스', romanization: 'paenseobiseu', baseForm: '팬서비스', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '粉丝福利、宠粉（fan service，偶像对粉丝的互动招呼，简称팬써）', chineseEn: 'Fan service (interaction with fans, abbreviated as 팬써)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '팬서비스가 정말 좋았어요.', chinese: '宠粉宠得太好了。', chineseEn: 'The fan service was amazing.', scene: '现场', sceneEn: 'live' },
      { korean: '팬서비스로 하트 날려 줬어요.', chinese: '给粉丝比了个爱心。', chineseEn: 'Made a heart sign to the fans.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'concert-37', korean: '공연장', romanization: 'gongyeonjang', baseForm: '공연장', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '演出场馆', chineseEn: 'Concert venue', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '공연장이 지하철역 바로 앞이에요.', chinese: '场馆就在地铁站正前方。', chineseEn: 'The venue is right in front of the subway station.', scene: '现场', sceneEn: 'live' },
      { korean: '공연장 규모가 엄청 커요.', chinese: '场馆规模非常大。', chineseEn: 'The venue is huge.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '入场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-38', korean: '팔찌', romanization: 'paljji', baseForm: '팔찌', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '手环（入场发的LED联动手环，随灯光变色）', chineseEn: 'Light stick band (LED wristband that changes color with the lights)', nuance: '现场专有词', nuanceEn: 'Live event term', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '입장할 때 팔찌를 나눠 줬어요.', chinese: '入场时发了手环。', chineseEn: 'They gave out wristbands at entry.', scene: '现场', sceneEn: 'live' },
      { korean: '팔찌가 음악에 맞춰 반짝여요.', chinese: '手环随音乐闪烁。', chineseEn: 'The wristbands blink with the music.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-39', korean: '자리 맡다', romanization: 'jari matda', baseForm: '자리 맡다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '3', frequency: 2,
    meanings: [
      { chinese: '占位子、留座位', chineseEn: 'Save a spot', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '먼저 가서 자리 맡아 놓을게요.', chinese: '我先去占个位子。', chineseEn: 'I\'ll go save a spot first.', scene: '座位', sceneEn: 'seat' },
      { korean: '스탠딩은 자리 맡기가 치열해요.', chinese: '站席占位很激烈。', chineseEn: 'Saving spots in the standing area is intense.', scene: '座位', sceneEn: 'seat' },
    ],
    tags: ['座位', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-40', korean: '소름 돋다', romanization: 'soreum dotda', baseForm: '소름 돋다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
    level: '4', frequency: 3,
    meanings: [
      { chinese: '起鸡皮疙瘩（被震撼或感动到，现场高频感叹）', chineseEn: 'Get goosebumps (from awe or emotion, common at live events)', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '라이브 듣고 소름 돋았어요.', chinese: '听了现场直接起鸡皮疙瘩。', chineseEn: 'Got goosebumps listening to it live.', scene: '现场', sceneEn: 'live' },
      { korean: '고음 부분에서 소름 돋았어요.', chinese: '高音部分听得我起鸡皮疙瘩。', chineseEn: 'The high notes gave me goosebumps.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: ['感动'], relatedWords: [],
  },
  {
    id: 'concert-41', korean: '라이브', romanization: 'raibeu', baseForm: '라이브', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [
      { chinese: '现场演唱（live，实唱而非对口型）', chineseEn: 'Live performance (singing live, not lip-syncing)', nuance: '外来词', nuanceEn: 'Loanwords', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '라이브 실력이 진짜 대단해요.', chinese: '现场实力真的强。', chineseEn: 'Their live skills are really strong.', scene: '现场', sceneEn: 'live' },
      { korean: '라이브로 들으니까 감동이에요.', chinese: '现场听真的很感动。', chineseEn: 'Listening live is really moving.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: ['感动'], relatedWords: [],
  },
  {
    id: 'concert-42', korean: '팬석', romanization: 'paenseok', baseForm: '팬석', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '粉丝席（팬클럽 专属的座位区）', chineseEn: 'Fan section (exclusive seating for fan club members)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '팬석이라 응원 열기가 대단했어요.', chinese: '粉丝席应援氛围超热烈。', chineseEn: 'The fan section\'s cheering atmosphere was super intense.', scene: '座位', sceneEn: 'seat' },
      { korean: '팬석은 무대 정면이에요.', chinese: '粉丝席正对着舞台。', chineseEn: 'The fan section faces the stage directly.', scene: '座位', sceneEn: 'seat' },
    ],
    tags: ['座位', '应援'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-43', korean: '중블', romanization: 'jungbeul', baseForm: '중블', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 1,
    meanings: [
      { chinese: '中央区块（중앙 블록 的缩语，正对舞台的黄金视野区）', chineseEn: 'Center block (abbreviation for central block, prime view facing the stage)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '口语', registerEn: 'Spoken language' },
    ],
    examples: [
      { korean: '중블이라 시야가 완벽했어요.', chinese: '中央区视野完美。', chineseEn: 'The view from the center section is perfect.', scene: '座位', sceneEn: 'seat' },
      { korean: '중블 자리는 경쟁이 심해요.', chinese: '中央区的位子竞争很激烈。', chineseEn: 'Competition for center section seats is fierce.', scene: '座位', sceneEn: 'seat' },
    ],
    tags: ['座位', '现场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'concert-44', korean: '컴백 무대', romanization: 'keombaek mudae', baseForm: '컴백 무대', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [
      { chinese: '回归舞台（发新专后的首次现场表演）', chineseEn: 'comeback stage (first live performance after releasing a new album)', nuance: '饭圈用语', nuanceEn: 'Fan community slang', register: '通用', registerEn: 'General' },
    ],
    examples: [
      { korean: '컴백 무대를 직관했어요.', chinese: '我到现场看了回归舞台。', chineseEn: 'I went to see the comeback stage live.', scene: '现场', sceneEn: 'live' },
      { korean: '컴백 무대 의상이 예뻤어요.', chinese: '回归舞台的服装好美。', chineseEn: 'The outfits for the comeback stage are so pretty.', scene: '现场', sceneEn: 'live' },
    ],
    tags: ['现场', '应援'], emotionTags: [], relatedWords: [],
  },
// ─── theme-parttime 打工/兼职 (ptime-) ───
{
  id: 'ptime-01', korean: '알바', romanization: 'alba', baseForm: '알바', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '打工；兼职', chineseEn: 'part-time job', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' }],
  examples: [
    { korean: '저 카페에서 알바해요.', chinese: '我在那家咖啡店打工。', chineseEn: 'I work part-time at that coffee shop.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '방학 때 알바 구하고 있어요.', chinese: '放假时在找兼职。', chineseEn: 'I\'m looking for a part-time job during the break.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '职场'], emotionTags: [], relatedWords: ['ptime-02', 'ptime-04'],
},
{
  id: 'ptime-02', korean: '아르바이트', romanization: 'areubaiteu', baseForm: '아르바이트', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '兼职；打工', chineseEn: 'part-time job', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '아르바이트 경험이 있어요?', chinese: '有打工经验吗？', chineseEn: 'Do you have any part-time work experience?', scene: '面试', sceneEn: 'interview' },
    { korean: '주말 아르바이트를 구해요.', chinese: '找周末的兼职。', chineseEn: 'Looking for a weekend part-time job.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '职场'], emotionTags: [], relatedWords: ['ptime-01'],
},
{
  id: 'ptime-03', korean: '시급', romanization: 'sigeup', baseForm: '시급', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '时薪；每小时工资', chineseEn: 'hourly wage', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '시급이 얼마예요?', chinese: '时薪多少？', chineseEn: 'What\'s the hourly wage?', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '시급 만 원이에요.', chinese: '时薪一万韩元。', chineseEn: 'The hourly wage is 10,000 won.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '薪资'], emotionTags: [], relatedWords: ['ptime-04', 'ptime-05'],
},
{
  id: 'ptime-04', korean: '주급', romanization: 'jugeup', baseForm: '주급', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '周薪', chineseEn: 'weekly pay', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '여기는 주급으로 줘요.', chinese: '这里是按周发工资的。', chineseEn: 'They pay weekly here.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '주급은 언제 들어와요?', chinese: '周薪什么时候到账？', chineseEn: 'When does the weekly pay come in?', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '薪资'], emotionTags: [], relatedWords: ['ptime-03', 'ptime-05'],
},
{
  id: 'ptime-05', korean: '월급', romanization: 'wolgeup', baseForm: '월급', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '月薪；工资', chineseEn: 'monthly salary', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '월급날이 25일이에요.', chinese: '发薪日是25号。', chineseEn: 'Payday is on the 25th.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '월급이 통장에 들어왔어요.', chinese: '工资打到账户了。', chineseEn: 'The salary was deposited into my account.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '薪资'], emotionTags: [], relatedWords: ['ptime-03', 'ptime-04'],
},
{
  id: 'ptime-06', korean: '급여', romanization: 'geubyeo', baseForm: '급여', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '薪资；工钱', chineseEn: 'pay; wages', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '급여는 매월 말에 지급됩니다.', chinese: '薪资每月月末发放。', chineseEn: 'Wages are paid at the end of each month.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '급여 명세서를 확인하세요.', chinese: '请确认工资明细单。', chineseEn: 'Please check your pay stub.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '薪资'], emotionTags: [], relatedWords: ['ptime-05'],
},
{
  id: 'ptime-07', korean: '근무', romanization: 'geunmu', baseForm: '근무', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '上班；工作（值勤）', chineseEn: 'to work (a shift)', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '오늘 근무 몇 시부터예요?', chinese: '今天几点开始上班？', chineseEn: 'What time does your shift start today?', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '주 5일 근무예요.', chinese: '一周上5天班。', chineseEn: 'I work 5 days a week.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '排班'], emotionTags: [], relatedWords: ['ptime-08', 'ptime-09'],
},
{
  id: 'ptime-08', korean: '근무 시간', romanization: 'geunmu sigan', baseForm: '근무 시간', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 3,
  meanings: [{ chinese: '工作时间；上班时间', chineseEn: 'work hours', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '근무 시간이 어떻게 돼요?', chinese: '工作时间是怎样的？', chineseEn: 'What are the working hours like?', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '근무 시간은 하루 8시간이에요.', chinese: '工作时间是一天8小时。', chineseEn: 'Working hours are 8 hours a day.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '排班'], emotionTags: [], relatedWords: ['ptime-07'],
},
{
  id: 'ptime-09', korean: '스케줄', romanization: 'seukejul', baseForm: '스케줄', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '排班；日程', chineseEn: 'schedule', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '이번 주 스케줄 나왔어요?', chinese: '这周的排班出来了吗？', chineseEn: 'Has this week\'s schedule come out?', scene: '排班', sceneEn: 'Scheduling shifts' },
    { korean: '스케줄이 바뀌었어요.', chinese: '排班改了。', chineseEn: 'The schedule changed.', scene: '排班', sceneEn: 'Scheduling shifts' },
  ],
  tags: ['打工', '排班'], emotionTags: [], relatedWords: ['ptime-10', 'ptime-11'],
},
{
  id: 'ptime-10', korean: '교대', romanization: 'gyodae', baseForm: '교대', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '换班；轮班', chineseEn: 'shift change', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '몇 시에 교대해요?', chinese: '几点换班？', chineseEn: 'What time is the shift change?', scene: '排班', sceneEn: 'Scheduling shifts' },
    { korean: '오후 타임이랑 교대예요.', chinese: '和下午班的换班。', chineseEn: 'It\'s the shift change with the afternoon shift.', scene: '排班', sceneEn: 'Scheduling shifts' },
  ],
  tags: ['打工', '排班'], emotionTags: [], relatedWords: ['ptime-09', 'ptime-11'],
},
{
  id: 'ptime-11', korean: '타임', romanization: 'taim', baseForm: '타임', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [{ chinese: '（打工的）时段；班次', chineseEn: 'shift', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' }],
  examples: [
    { korean: '저는 오전 타임이에요.', chinese: '我是上午班。', chineseEn: 'I\'m on the morning shift.', scene: '排班', sceneEn: 'Scheduling shifts' },
    { korean: '마감 타임 하실 분 구해요.', chinese: '找能上打烊班的人。', chineseEn: 'Looking for someone who can work the closing shift.', scene: '排班', sceneEn: 'Scheduling shifts' },
  ],
  tags: ['打工', '排班'], emotionTags: [], relatedWords: ['ptime-09', 'ptime-10'],
},
{
  id: 'ptime-12', korean: '오픈', romanization: 'opeun', baseForm: '오픈', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [{ chinese: '开门班（早班）；开张', chineseEn: 'opening shift', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' }],
  examples: [
    { korean: '내일 오픈이라 일찍 나가요.', chinese: '明天是开门班所以要早点去。', chineseEn: 'Tomorrow is the opening shift, so I need to go early.', scene: '排班', sceneEn: 'Scheduling shifts' },
    { korean: '오픈 준비 다 했어요?', chinese: '开门准备都做好了吗？', chineseEn: 'Is the opening prep all done?', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '排班'], emotionTags: [], relatedWords: ['ptime-13'],
},
{
  id: 'ptime-13', korean: '마감', romanization: 'magam', baseForm: '마감', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '打烊班；截止', chineseEn: 'closing shift', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '오늘 마감이라 늦게 끝나요.', chinese: '今天是打烊班所以下班晚。', chineseEn: 'Today is the closing shift, so I get off late.', scene: '排班', sceneEn: 'Scheduling shifts' },
    { korean: '마감 청소 잊지 마세요.', chinese: '别忘了打烊清扫。', chineseEn: 'Don\'t forget the closing cleanup.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '排班'], emotionTags: [], relatedWords: ['ptime-12'],
},
{
  id: 'ptime-14', korean: '야간', romanization: 'yagan', baseForm: '야간', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '夜间；夜班', chineseEn: 'night shift', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '야간에는 시급이 더 높아요.', chinese: '夜间时薪更高。', chineseEn: 'The night shift pays more per hour.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '이번 주는 야간 근무예요.', chinese: '这周是夜班。', chineseEn: 'This week is the night shift.', scene: '排班', sceneEn: 'Scheduling shifts' },
  ],
  tags: ['打工', '排班'], emotionTags: [], relatedWords: ['ptime-07'],
},
{
  id: 'ptime-15', korean: '출근', romanization: 'chulgeun', baseForm: '출근', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '上班；到岗', chineseEn: 'clock in', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '몇 시까지 출근해요?', chinese: '几点前要到岗？', chineseEn: 'What time do I need to clock in by?', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '내일 출근 안 해도 돼요.', chinese: '明天不用上班。', chineseEn: 'I don\'t have to work tomorrow.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '排班'], emotionTags: [], relatedWords: ['ptime-16'],
},
{
  id: 'ptime-16', korean: '퇴근', romanization: 'toegeun', baseForm: '퇴근', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '下班', chineseEn: 'Get off work', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '몇 시에 퇴근해요?', chinese: '几点下班？', chineseEn: 'What time do you get off?', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '이제 퇴근해도 돼요.', chinese: '现在可以下班了。', chineseEn: 'You can clock out now.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '排班'], emotionTags: [], relatedWords: ['ptime-15'],
},
{
  id: 'ptime-17', korean: '지각', romanization: 'jigak', baseForm: '지각', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [{ chinese: '迟到', chineseEn: 'be late', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '차가 막혀서 지각할 것 같아요.', chinese: '堵车了，好像会迟到。', chineseEn: 'Traffic is jammed; I might be late.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '지각하면 사장님한테 연락하세요.', chinese: '迟到的话请联系老板。', chineseEn: 'If you\'re late, contact the boss.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '排班'], emotionTags: [], relatedWords: ['ptime-15'],
},
{
  id: 'ptime-18', korean: '사장님', romanization: 'sajangnim', baseForm: '사장님', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '老板；店长（敬称）', chineseEn: 'boss; manager (honorific)', nuance: '敬语', nuanceEn: 'honorifics', register: '敬语', registerEn: 'honorifics' }],
  examples: [
    { korean: '사장님, 잠깐 시간 괜찮으세요?', chinese: '老板，有空聊一下吗？', chineseEn: 'Boss, got a minute to chat?', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '사장님이 오늘 안 계세요.', chinese: '老板今天不在。', chineseEn: 'The boss isn\'t in today.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '职场'], emotionTags: [], relatedWords: ['ptime-19', 'ptime-20'],
},
{
  id: 'ptime-19', korean: '점장', romanization: 'jeomjang', baseForm: '점장', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '店长', chineseEn: 'manager', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '점장님한테 물어보세요.', chinese: '去问店长吧。', chineseEn: 'Go ask the manager.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '점장이 스케줄을 짜요.', chinese: '店长排班。', chineseEn: 'Manager\'s schedule.', scene: '排班', sceneEn: 'Scheduling shifts' },
  ],
  tags: ['打工', '职场'], emotionTags: [], relatedWords: ['ptime-18'],
},
{
  id: 'ptime-20', korean: '동료', romanization: 'dongnyo', baseForm: '동료', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '同事', chineseEn: 'Colleague', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '같이 일하는 동료가 친절해요.', chinese: '一起工作的同事很亲切。', chineseEn: 'My coworkers are friendly.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '동료한테 부탁했어요.', chinese: '拜托了同事。', chineseEn: 'Asked a coworker for help.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '职场'], emotionTags: [], relatedWords: ['ptime-18'],
},
{
  id: 'ptime-21', korean: '손님', romanization: 'sonnim', baseForm: '손님', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '1', frequency: 3,
  meanings: [{ chinese: '顾客；客人', chineseEn: 'customer; guest', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '손님이 많아서 바빠요.', chinese: '客人多所以很忙。', chineseEn: 'Busy because there are many customers.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '손님, 주문하시겠어요?', chinese: '客人，要点单吗？', chineseEn: 'Sir/Ma\'am, would you like to order?', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '服务'], emotionTags: [], relatedWords: ['ptime-22'],
},
{
  id: 'ptime-22', korean: '응대', romanization: 'eungdae', baseForm: '응대', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '接待；应对（客人）', chineseEn: 'serving; dealing with (customers)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '손님 응대가 제일 힘들어요.', chinese: '接待客人最累。', chineseEn: 'Serving customers is the most tiring.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '친절하게 응대해 주세요.', chinese: '请亲切地接待。', chineseEn: 'Please serve them kindly.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '服务'], emotionTags: [], relatedWords: ['ptime-21'],
},
{
  id: 'ptime-23', korean: '주문', romanization: 'jumun', baseForm: '주문', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '点单；订单', chineseEn: 'order', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '주문 도와드릴게요.', chinese: '我来帮您点单。', chineseEn: 'I\'ll take your order.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '주문이 밀렸어요.', chinese: '订单积压了。', chineseEn: 'Orders are backed up.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '服务'], emotionTags: [], relatedWords: ['ptime-24'],
},
{
  id: 'ptime-24', korean: '계산', romanization: 'gyesan', baseForm: '계산', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '结账；收银', chineseEn: 'checkout; cashier', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '계산은 저쪽에서 도와드려요.', chinese: '结账在那边办理。', chineseEn: 'Checkout is over there.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '계산 실수하면 안 돼요.', chinese: '收银不能出错。', chineseEn: 'No mistakes at the register.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '服务'], emotionTags: [], relatedWords: ['ptime-25'],
},
{
  id: 'ptime-25', korean: '포스기', romanization: 'poseugi', baseForm: '포스기', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: 'POS机；收银机', chineseEn: 'POS machine; cash register', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' }],
  examples: [
    { korean: '포스기 사용법 알려 주세요.', chinese: '请教我用收银机。', chineseEn: 'Please teach me how to use the register.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '포스기가 갑자기 안 돼요.', chinese: '收银机突然用不了了。', chineseEn: 'The register suddenly stopped working.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '服务'], emotionTags: [], relatedWords: ['ptime-24'],
},
{
  id: 'ptime-26', korean: '재고', romanization: 'jaego', baseForm: '재고', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '库存', chineseEn: 'stock', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '이 상품 재고 있어요?', chinese: '这个商品有库存吗？', chineseEn: 'Is this item in stock?', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '재고 정리를 해야 해요.', chinese: '得整理库存。', chineseEn: 'I need to organize the inventory.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '便利店'], emotionTags: [], relatedWords: ['ptime-27'],
},
{
  id: 'ptime-27', korean: '진열', romanization: 'jinyeol', baseForm: '진열', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '陈列；上架', chineseEn: 'display; put on shelves', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '물건 진열 좀 도와줄래요?', chinese: '能帮忙上架商品吗？', chineseEn: 'Can you help put the products on the shelves?', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '유통기한 순으로 진열해요.', chinese: '按保质期顺序陈列。', chineseEn: 'Display them in order of expiration date.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '便利店'], emotionTags: [], relatedWords: ['ptime-26'],
},
{
  id: 'ptime-28', korean: '청소', romanization: 'cheongso', baseForm: '청소', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '1', frequency: 3,
  meanings: [{ chinese: '打扫；清洁', chineseEn: 'clean; tidy up', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '마감 전에 청소해요.', chinese: '打烊前打扫。', chineseEn: 'Clean up before closing.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '바닥 청소 좀 부탁해요.', chinese: '麻烦扫一下地。', chineseEn: 'Please sweep the floor.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '服务'], emotionTags: [], relatedWords: ['ptime-13'],
},
{
  id: 'ptime-29', korean: '유니폼', romanization: 'yunipom', baseForm: '유니폼', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [{ chinese: '工作服；制服', chineseEn: 'work clothes; uniform', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '유니폼은 어디서 갈아입어요?', chinese: '工作服在哪里换？', chineseEn: 'Where do you change into your work clothes?', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '유니폼을 깨끗하게 입어요.', chinese: '穿干净的制服。', chineseEn: 'Wear a clean uniform.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '服务'], emotionTags: [], relatedWords: [],
},
{
  id: 'ptime-30', korean: '면접', romanization: 'myeonjeop', baseForm: '면접', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '面试', chineseEn: 'interview', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '내일 알바 면접 보러 가요.', chinese: '明天去面试兼职。', chineseEn: 'I have a part-time job interview tomorrow.', scene: '面试', sceneEn: 'interview' },
    { korean: '면접 때 뭐 물어봐요?', chinese: '面试时会问什么？', chineseEn: 'What will they ask in the interview?', scene: '面试', sceneEn: 'interview' },
  ],
  tags: ['打工', '面试'], emotionTags: [], relatedWords: ['ptime-31', 'ptime-32'],
},
{
  id: 'ptime-31', korean: '이력서', romanization: 'iryeokseo', baseForm: '이력서', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '简历', chineseEn: 'resume', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '이력서 한 장 가져오세요.', chinese: '请带一份简历来。', chineseEn: 'Please bring a resume.', scene: '面试', sceneEn: 'interview' },
    { korean: '이력서에 사진을 붙였어요.', chinese: '简历上贴了照片。', chineseEn: 'There\'s a photo attached to the resume.', scene: '面试', sceneEn: 'interview' },
  ],
  tags: ['打工', '面试'], emotionTags: [], relatedWords: ['ptime-30'],
},
{
  id: 'ptime-32', korean: '지원하다', romanization: 'jiwonhada', baseForm: '지원하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 2,
  meanings: [{ chinese: '应聘；申请', chineseEn: 'apply for; apply', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '카페 알바에 지원했어요.', chinese: '应聘了咖啡店兼职。', chineseEn: 'I applied for a part-time job at a café.', scene: '面试', sceneEn: 'interview' },
    { korean: '어떻게 지원하면 돼요?', chinese: '怎么应聘呢？', chineseEn: 'How do I apply?', scene: '面试', sceneEn: 'interview' },
  ],
  tags: ['打工', '面试'], emotionTags: [], relatedWords: ['ptime-30'],
},
{
  id: 'ptime-33', korean: '뽑다', romanization: 'ppopda', baseForm: '뽑다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 2,
  meanings: [{ chinese: '录用；招（人）', chineseEn: 'hire; recruit', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' }],
  examples: [
    { korean: '알바생 두 명 뽑아요.', chinese: '招两名兼职。', chineseEn: 'We\'re hiring two part-timers.', scene: '面试', sceneEn: 'interview' },
    { korean: '경험 있는 사람을 뽑아요.', chinese: '招有经验的人。', chineseEn: 'We\'re recruiting people with experience.', scene: '面试', sceneEn: 'interview' },
  ],
  tags: ['打工', '面试'], emotionTags: [], relatedWords: ['ptime-32'],
},
{
  id: 'ptime-34', korean: '교육', romanization: 'gyoyuk', baseForm: '교육', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '培训；教育', chineseEn: 'training; education', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '첫날은 교육받아요.', chinese: '第一天接受培训。', chineseEn: 'I received training on the first day.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '교육 기간에는 시급이 낮아요.', chinese: '培训期时薪较低。', chineseEn: 'The hourly wage is lower during the training period.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '入职'], emotionTags: [], relatedWords: ['ptime-35'],
},
{
  id: 'ptime-35', korean: '인수인계', romanization: 'insu-ingye', baseForm: '인수인계', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '交接（工作）', chineseEn: 'handover (of work)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '다음 사람한테 인수인계했어요.', chinese: '向下一个人做了交接。', chineseEn: 'I handed off to the next person.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '인수인계가 제대로 안 됐어요.', chinese: '交接没做好。', chineseEn: 'The handoff wasn\'t done properly.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '排班'], emotionTags: [], relatedWords: ['ptime-10'],
},
{
  id: 'ptime-36', korean: '대타', romanization: 'daeta', baseForm: '대타', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '替班；顶班', chineseEn: 'cover a shift', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' }],
  examples: [
    { korean: '오늘 대타 뛰어 줄 수 있어요?', chinese: '今天能帮我顶班吗？', chineseEn: 'Can you cover my shift today?', scene: '排班', sceneEn: 'Scheduling shifts' },
    { korean: '아파서 대타를 구했어요.', chinese: '生病了所以找人替班。', chineseEn: 'I got sick, so I found someone to cover my shift.', scene: '排班', sceneEn: 'Scheduling shifts' },
  ],
  tags: ['打工', '排班'], emotionTags: [], relatedWords: ['ptime-10', 'ptime-11'],
},
{
  id: 'ptime-37', korean: '그만두다', romanization: 'geumanduda', baseForm: '그만두다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 2,
  meanings: [{ chinese: '辞职；不干了', chineseEn: 'quit; resign', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' }],
  examples: [
    { korean: '이번 달까지만 하고 그만두려고요.', chinese: '打算做到这个月就辞职。', chineseEn: 'I plan to quit at the end of this month.', scene: '辞职', sceneEn: 'Quit my job' },
    { korean: '알바를 그만뒀어요.', chinese: '把兼职辞了。', chineseEn: 'I quit my part-time job.', scene: '辞职', sceneEn: 'Quit my job' },
  ],
  tags: ['打工', '辞职'], emotionTags: [], relatedWords: ['ptime-38'],
},
{
  id: 'ptime-38', korean: '그만두겠습니다', romanization: 'geumandugetseumnida', baseForm: '그만두다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '4', frequency: 1,
  meanings: [{ chinese: '（正式）我要辞职', chineseEn: 'I\'d like to resign.', nuance: '敬语', nuanceEn: 'honorifics', register: '敬语', registerEn: 'honorifics' }],
  examples: [
    { korean: '죄송하지만 이번 달까지만 하고 그만두겠습니다.', chinese: '抱歉，我做到这个月就辞职。', chineseEn: 'Sorry, I\'ll be quitting at the end of this month.', scene: '辞职', sceneEn: 'Quit my job' },
    { korean: '개인 사정으로 그만두겠습니다.', chinese: '因个人原因我要辞职。', chineseEn: 'I\'m resigning for personal reasons.', scene: '辞职', sceneEn: 'Quit my job' },
  ],
  tags: ['打工', '辞职'], emotionTags: [], relatedWords: ['ptime-37'],
},
{
  id: 'ptime-39', korean: '주휴수당', romanization: 'juhyusudang', baseForm: '주휴수당', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '周休津贴（韩国法定）', chineseEn: 'weekly rest allowance (statutory in Korea)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '주 15시간 이상이면 주휴수당을 받아요.', chinese: '每周15小时以上可以领周休津贴。', chineseEn: 'You can get the weekly rest allowance if you work 15+ hours a week.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '주휴수당도 꼭 챙기세요.', chinese: '周休津贴也一定要争取。', chineseEn: 'Make sure to claim the weekly rest allowance too.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '薪资'], emotionTags: [], relatedWords: ['ptime-03'],
},
{
  id: 'ptime-40', korean: '근로계약서', romanization: 'geullo-gyeyakseo', baseForm: '근로계약서', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '劳动合同', chineseEn: 'labor contract', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '근로계약서를 꼭 써야 해요.', chinese: '一定要签劳动合同。', chineseEn: 'Be sure to sign a labor contract.', scene: '入职', sceneEn: 'Onboarding' },
    { korean: '근로계약서 한 부 주세요.', chinese: '请给我一份劳动合同。', chineseEn: 'Please give me a labor contract.', scene: '入职', sceneEn: 'Onboarding' },
  ],
  tags: ['打工', '入职'], emotionTags: [], relatedWords: ['ptime-39'],
},
{
  id: 'ptime-41', korean: '수습', romanization: 'suseup', baseForm: '수습', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '试用（期）', chineseEn: 'probation (period)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '수습 기간은 한 달이에요.', chinese: '试用期是一个月。', chineseEn: 'The probation period is one month.', scene: '入职', sceneEn: 'Onboarding' },
    { korean: '수습 때는 시급이 조금 낮아요.', chinese: '试用期时薪稍低。', chineseEn: 'The hourly wage is a bit lower during probation.', scene: '入职', sceneEn: 'Onboarding' },
  ],
  tags: ['打工', '入职'], emotionTags: [], relatedWords: ['ptime-34'],
},
{
  id: 'ptime-42', korean: '바쁘다', romanization: 'bappeuda', baseForm: '바쁘다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
  level: '1', frequency: 3,
  meanings: [{ chinese: '忙', chineseEn: 'busy', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '점심시간에 제일 바빠요.', chinese: '午餐时间最忙。', chineseEn: 'Lunchtime is the busiest.', scene: '打工', sceneEn: 'Working part-time' },
    { korean: '오늘은 안 바빠서 다행이에요.', chinese: '今天不忙太好了。', chineseEn: 'It\'s great that it\'s not busy today.', scene: '打工', sceneEn: 'Working part-time' },
  ],
  tags: ['打工', '状态'], emotionTags: [], relatedWords: [],
},

// ─── theme-online-class 线上课/网课 (oclass-) ───
{
  id: 'oclass-01', korean: '화상 수업', romanization: 'hwasang sueop', baseForm: '화상 수업', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 3,
  meanings: [{ chinese: '视频课；线上课', chineseEn: 'video class; online class', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '오늘 화상 수업이 있어요.', chinese: '今天有视频课。', chineseEn: 'I have a video class today.', scene: '网课', sceneEn: 'Online course' },
    { korean: '화상 수업은 집중이 잘 안 돼요.', chinese: '上视频课很难集中。', chineseEn: 'It\'s hard to focus in a video class.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '学习'], emotionTags: [], relatedWords: ['oclass-02', 'oclass-03'],
},
{
  id: 'oclass-02', korean: '온라인 강의', romanization: 'onlain gang-ui', baseForm: '온라인 강의', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 3,
  meanings: [{ chinese: '在线课程；网课', chineseEn: 'online course', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '온라인 강의를 듣고 있어요.', chinese: '正在听网课。', chineseEn: 'I\'m taking an online class.', scene: '网课', sceneEn: 'Online course' },
    { korean: '온라인 강의는 다시 볼 수 있어요.', chinese: '网课可以回看。', chineseEn: 'Online classes can be rewatched.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '学习'], emotionTags: [], relatedWords: ['oclass-01'],
},
{
  id: 'oclass-03', korean: '줌', romanization: 'jum', baseForm: '줌', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: 'Zoom（视频软件）', chineseEn: 'Zoom (video software)', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '줌으로 수업해요.', chinese: '用Zoom上课。', chineseEn: 'We use Zoom for class.', scene: '网课', sceneEn: 'Online course' },
    { korean: '줌 링크 좀 보내 주세요.', chinese: '请发一下Zoom链接。', chineseEn: 'Please send the Zoom link.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '工具'], emotionTags: [], relatedWords: ['oclass-04'],
},
{
  id: 'oclass-04', korean: '링크', romanization: 'lingkeu', baseForm: '링크', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '链接', chineseEn: 'link', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '수업 링크가 어디 있어요?', chinese: '上课链接在哪里？', chineseEn: 'Where is the class link?', scene: '网课', sceneEn: 'Online course' },
    { korean: '링크를 클릭하면 들어가져요.', chinese: '点链接就能进去。', chineseEn: 'Click the link to get in.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '工具'], emotionTags: [], relatedWords: ['oclass-03'],
},
{
  id: 'oclass-05', korean: '입장하다', romanization: 'ipjanghada', baseForm: '입장하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 2,
  meanings: [{ chinese: '进入（会议室）；入场', chineseEn: 'enter (meeting room); join', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '수업방에 입장했어요.', chinese: '进入课堂了。', chineseEn: 'I\'ve entered the class.', scene: '网课', sceneEn: 'Online course' },
    { korean: '5분 전에 입장하세요.', chinese: '请提前5分钟进入。', chineseEn: 'Please enter 5 minutes early.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '操作'], emotionTags: [], relatedWords: ['oclass-06'],
},
{
  id: 'oclass-06', korean: '접속하다', romanization: 'jeopsokhada', baseForm: '접속하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '4', frequency: 2,
  meanings: [{ chinese: '连接；登入', chineseEn: 'connect; log in', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '인터넷에 접속이 안 돼요.', chinese: '连不上网。', chineseEn: 'I can\'t connect to the internet.', scene: '网课', sceneEn: 'Online course' },
    { korean: '다시 접속해 볼게요.', chinese: '我重新连一下。', chineseEn: 'Let me reconnect.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '操作'], emotionTags: [], relatedWords: ['oclass-05'],
},
{
  id: 'oclass-07', korean: '마이크', romanization: 'maikeu', baseForm: '마이크', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '麦克风', chineseEn: 'Microphone', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '마이크가 안 켜져요.', chinese: '麦克风打不开。', chineseEn: 'The microphone won\'t turn on.', scene: '网课', sceneEn: 'Online course' },
    { korean: '마이크 좀 꺼 주세요.', chinese: '请把麦克风关一下。', chineseEn: 'Please turn off the microphone.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '设备'], emotionTags: [], relatedWords: ['oclass-08', 'oclass-09'],
},
{
  id: 'oclass-08', korean: '카메라', romanization: 'kamera', baseForm: '카메라', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '摄像头；相机', chineseEn: 'camera; webcam', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '카메라를 켜 주세요.', chinese: '请打开摄像头。', chineseEn: 'Please turn on your camera.', scene: '网课', sceneEn: 'Online course' },
    { korean: '카메라가 흐릿하게 나와요.', chinese: '摄像头画面很模糊。', chineseEn: 'The camera image is blurry.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '设备'], emotionTags: [], relatedWords: ['oclass-07'],
},
{
  id: 'oclass-09', korean: '음소거', romanization: 'eumsogeo', baseForm: '음소거', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '静音', chineseEn: 'mute', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '음소거를 해 주세요.', chinese: '请静音。', chineseEn: 'Please mute yourself.', scene: '网课', sceneEn: 'Online course' },
    { korean: '음소거 상태예요.', chinese: '现在是静音状态。', chineseEn: 'It\'s on mute now.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '设备'], emotionTags: [], relatedWords: ['oclass-07'],
},
{
  id: 'oclass-10', korean: '화면', romanization: 'hwamyeon', baseForm: '화면', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '画面；屏幕', chineseEn: 'screen; display', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '화면이 잘 보여요?', chinese: '画面看得清吗？', chineseEn: 'Can you see the screen clearly?', scene: '网课', sceneEn: 'Online course' },
    { korean: '화면이 멈췄어요.', chinese: '画面卡住了。', chineseEn: 'The screen is frozen.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '设备'], emotionTags: [], relatedWords: ['oclass-11'],
},
{
  id: 'oclass-11', korean: '화면 공유', romanization: 'hwamyeon gongyu', baseForm: '화면 공유', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 3,
  meanings: [{ chinese: '共享屏幕', chineseEn: 'Share screen', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '화면 공유를 시작할게요.', chinese: '我开始共享屏幕。', chineseEn: 'I\'m starting to share my screen.', scene: '网课', sceneEn: 'Online course' },
    { korean: '화면 공유가 안 돼요.', chinese: '共享屏幕不成功。', chineseEn: 'Screen sharing didn\'t work.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '操作'], emotionTags: [], relatedWords: ['oclass-10'],
},
{
  id: 'oclass-12', korean: '발표', romanization: 'balpyo', baseForm: '발표', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '发表；报告', chineseEn: 'Presentation; report', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '다음 주에 발표가 있어요.', chinese: '下周有发表。', chineseEn: 'There\'s a presentation next week.', scene: '网课', sceneEn: 'Online course' },
    { korean: '제가 먼저 발표할게요.', chinese: '我先来发表。', chineseEn: 'I\'ll present first.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '课堂'], emotionTags: [], relatedWords: ['oclass-13'],
},
{
  id: 'oclass-13', korean: '발표 자료', romanization: 'balpyo jaryo', baseForm: '발표 자료', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [{ chinese: '发表资料；演示材料', chineseEn: 'Presentation materials', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '발표 자료를 공유할게요.', chinese: '我来共享发表资料。', chineseEn: 'I\'ll share the presentation materials.', scene: '网课', sceneEn: 'Online course' },
    { korean: '발표 자료 다 준비했어요?', chinese: '发表资料都准备好了吗？', chineseEn: 'Are the presentation materials ready?', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '课堂'], emotionTags: [], relatedWords: ['oclass-12'],
},
{
  id: 'oclass-14', korean: '채팅', romanization: 'chaeting', baseForm: '채팅', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '聊天（框）', chineseEn: 'Chat (box)', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '질문은 채팅으로 남겨 주세요.', chinese: '问题请写在聊天框里。', chineseEn: 'Please write your questions in the chat box.', scene: '网课', sceneEn: 'Online course' },
    { korean: '채팅창에 링크를 올렸어요.', chinese: '把链接发到聊天框了。', chineseEn: 'I sent the link to the chat box.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '操作'], emotionTags: [], relatedWords: ['oclass-15'],
},
{
  id: 'oclass-15', korean: '댓글', romanization: 'daetgeul', baseForm: '댓글', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [{ chinese: '评论；留言', chineseEn: 'Comment; message', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '강의에 댓글로 질문했어요.', chinese: '在课程下用评论提问了。', chineseEn: 'I asked a question in the comments under the course.', scene: '网课', sceneEn: 'Online course' },
    { korean: '댓글로 답변해 드릴게요.', chinese: '我用评论回复您。', chineseEn: 'I\'ll reply to you in the comments.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '操作'], emotionTags: [], relatedWords: ['oclass-14'],
},
{
  id: 'oclass-16', korean: '녹화', romanization: 'nokhwa', baseForm: '녹화', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '录像；录制', chineseEn: 'Recording', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '수업을 녹화해요.', chinese: '录制课程。', chineseEn: 'Record the class.', scene: '网课', sceneEn: 'Online course' },
    { korean: '녹화본을 나중에 볼게요.', chinese: '回头看录像。', chineseEn: 'Watch the recording later.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '操作'], emotionTags: [], relatedWords: ['oclass-17'],
},
{
  id: 'oclass-17', korean: '다시 보기', romanization: 'dasi bogi', baseForm: '다시 보기', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '2', frequency: 2,
  meanings: [{ chinese: '回看；重播', chineseEn: 'Replay; review', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '못 들은 부분은 다시 보기로 봐요.', chinese: '没听到的部分用回看看。', chineseEn: 'I\'ll use the replay to watch the parts I missed.', scene: '网课', sceneEn: 'Online course' },
    { korean: '다시 보기가 언제 올라와요?', chinese: '回看什么时候上传？', chineseEn: 'When will the replay be uploaded?', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '操作'], emotionTags: [], relatedWords: ['oclass-16'],
},
{
  id: 'oclass-18', korean: '출석', romanization: 'chulseok', baseForm: '출석', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '出勤；点名', chineseEn: 'Attendance; roll call', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '출석 체크할게요.', chinese: '我来点名。', chineseEn: 'I\'ll take attendance.', scene: '网课', sceneEn: 'Online course' },
    { korean: '출석이 인정 안 됐어요.', chinese: '出勤没被认可。', chineseEn: 'My attendance wasn\'t recognized.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '课堂'], emotionTags: [], relatedWords: ['oclass-19'],
},
{
  id: 'oclass-19', korean: '과제', romanization: 'gwaje', baseForm: '과제', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '作业；课题', chineseEn: 'Homework; assignment', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '과제 제출 기한이 언제예요?', chinese: '作业截止是什么时候？', chineseEn: 'When is the homework due?', scene: '网课', sceneEn: 'Online course' },
    { korean: '과제를 이메일로 냈어요.', chinese: '作业用邮件交了。', chineseEn: 'I submitted the homework by email.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '课堂'], emotionTags: [], relatedWords: ['oclass-20'],
},
{
  id: 'oclass-20', korean: '제출하다', romanization: 'jechulhada', baseForm: '제출하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 2,
  meanings: [{ chinese: '提交', chineseEn: 'Submit', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '과제를 아직 제출 못 했어요.', chinese: '作业还没交。', chineseEn: 'I haven\'t submitted the homework yet.', scene: '网课', sceneEn: 'Online course' },
    { korean: '오늘까지 제출해야 해요.', chinese: '得在今天之前提交。', chineseEn: 'I need to submit it before today.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '课堂'], emotionTags: [], relatedWords: ['oclass-19'],
},
{
  id: 'oclass-21', korean: '접속 불량', romanization: 'jeopsok bullyang', baseForm: '접속 불량', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '4', frequency: 2,
  meanings: [{ chinese: '连接不稳；网络不好', chineseEn: 'Unstable connection; poor network', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '접속 불량으로 소리가 끊겨요.', chinese: '因为连接不稳声音断断续续。', chineseEn: 'The sound cuts in and out because the connection is unstable.', scene: '网课', sceneEn: 'Online course' },
    { korean: '접속 불량이 자주 생겨요.', chinese: '经常出现连接问题。', chineseEn: 'Connection issues happen often.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '故障'], emotionTags: [], relatedWords: ['oclass-22'],
},
{
  id: 'oclass-22', korean: '끊기다', romanization: 'kkeunkida', baseForm: '끊기다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 3,
  meanings: [{ chinese: '（信号/声音）断掉', chineseEn: '(Signal/sound) drops out', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '소리가 자꾸 끊겨요.', chinese: '声音老是断。', chineseEn: 'The sound keeps dropping.', scene: '网课', sceneEn: 'Online course' },
    { korean: '방금 화면이 끊겼어요.', chinese: '刚才画面断了。', chineseEn: 'The screen just froze a moment ago.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '故障'], emotionTags: [], relatedWords: ['oclass-21', 'oclass-23'],
},
{
  id: 'oclass-23', korean: '렉 걸리다', romanization: 'rek geollida', baseForm: '렉 걸리다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [{ chinese: '卡顿；卡住（lag）', chineseEn: 'Lag; freeze', nuance: '俚语', nuanceEn: 'Slang', register: '口语', registerEn: 'Spoken language' }],
  examples: [
    { korean: '화면이 렉 걸려서 안 넘어가요.', chinese: '画面卡住翻不过去。', chineseEn: 'The screen is frozen and won\'t scroll.', scene: '网课', sceneEn: 'Online course' },
    { korean: '컴퓨터가 렉 걸렸어요.', chinese: '电脑卡了。', chineseEn: 'The computer is lagging.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '故障'], emotionTags: [], relatedWords: ['oclass-22'],
},
{
  id: 'oclass-24', korean: '버벅거리다', romanization: 'beobeokgeorida', baseForm: '버벅거리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '4', frequency: 1,
  meanings: [{ chinese: '（画面）卡顿；一顿一顿', chineseEn: '(Video) stutters; choppy', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' }],
  examples: [
    { korean: '영상이 버벅거려요.', chinese: '视频一顿一顿的。', chineseEn: 'The video is choppy.', scene: '网课', sceneEn: 'Online course' },
    { korean: '자꾸 버벅거려서 답답해요.', chinese: '老卡顿真让人着急。', chineseEn: 'It\'s so frustrating when it keeps lagging.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '故障'], emotionTags: [], relatedWords: ['oclass-23'],
},
{
  id: 'oclass-25', korean: '와이파이', romanization: 'waipai', baseForm: '와이파이', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: 'Wi-Fi；无线网', chineseEn: 'Wi-Fi; wireless internet', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '와이파이가 느려요.', chinese: 'Wi-Fi很慢。', chineseEn: 'The Wi-Fi is slow.', scene: '网课', sceneEn: 'Online course' },
    { korean: '와이파이를 다시 연결했어요.', chinese: '重新连了Wi-Fi。', chineseEn: 'I reconnected to the Wi-Fi.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '设备'], emotionTags: [], relatedWords: ['oclass-06'],
},
{
  id: 'oclass-26', korean: '들리다', romanization: 'deullida', baseForm: '들리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '2', frequency: 3,
  meanings: [{ chinese: '听得见', chineseEn: 'Can hear', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '제 목소리 잘 들려요?', chinese: '我的声音听得清吗？', chineseEn: 'Can you hear me clearly?', scene: '网课', sceneEn: 'Online course' },
    { korean: '소리가 안 들려요.', chinese: '听不到声音。', chineseEn: 'I can\'t hear any sound.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '设备'], emotionTags: [], relatedWords: ['oclass-27'],
},
{
  id: 'oclass-27', korean: '보이다', romanization: 'boida', baseForm: '보이다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '2', frequency: 3,
  meanings: [{ chinese: '看得见', chineseEn: 'visible', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '화면이 잘 보여요?', chinese: '画面看得清吗？', chineseEn: 'Can you see the screen clearly?', scene: '网课', sceneEn: 'Online course' },
    { korean: '글씨가 작아서 안 보여요.', chinese: '字太小看不清。', chineseEn: 'The text is too small to read.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '设备'], emotionTags: [], relatedWords: ['oclass-26'],
},
{
  id: 'oclass-28', korean: '재접속', romanization: 'jaejeopsok', baseForm: '재접속', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '重新连接', chineseEn: 'Reconnect', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '재접속하니까 괜찮아졌어요.', chinese: '重新连接后就好了。', chineseEn: 'It works fine after reconnecting.', scene: '网课', sceneEn: 'Online course' },
    { korean: '재접속 좀 해 보세요.', chinese: '请试着重新连接一下。', chineseEn: 'Please try reconnecting.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '故障'], emotionTags: [], relatedWords: ['oclass-06'],
},
{
  id: 'oclass-29', korean: '음질', romanization: 'eumjil', baseForm: '음질', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '音质', chineseEn: 'Sound quality', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '음질이 별로 안 좋아요.', chinese: '音质不太好。', chineseEn: 'The sound quality isn\'t great.', scene: '网课', sceneEn: 'Online course' },
    { korean: '이어폰을 쓰면 음질이 나아요.', chinese: '用耳机的话音质会好些。', chineseEn: 'Using earphones will improve the sound quality.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '设备'], emotionTags: [], relatedWords: ['oclass-30'],
},
{
  id: 'oclass-30', korean: '이어폰', romanization: 'eeopon', baseForm: '이어폰', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '耳机', chineseEn: 'earphones', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '이어폰을 끼고 들으세요.', chinese: '请戴耳机听。', chineseEn: 'Please listen with earphones.', scene: '网课', sceneEn: 'Online course' },
    { korean: '이어폰이 한쪽만 들려요.', chinese: '耳机只有一边有声音。', chineseEn: 'Only one side of the earphones has sound.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '设备'], emotionTags: [], relatedWords: ['oclass-29'],
},
{
  id: 'oclass-31', korean: '질문', romanization: 'jilmun', baseForm: '질문', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '提问；问题', chineseEn: 'Question', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '질문 있으면 손 들어 주세요.', chinese: '有问题请举手。', chineseEn: 'If you have a question, please raise your hand.', scene: '网课', sceneEn: 'Online course' },
    { korean: '질문 하나 해도 될까요?', chinese: '可以问个问题吗？', chineseEn: 'Can I ask a question?', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '课堂'], emotionTags: [], relatedWords: ['oclass-32'],
},
{
  id: 'oclass-32', korean: '손 들기', romanization: 'son deulgi', baseForm: '손 들기', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '2', frequency: 2,
  meanings: [{ chinese: '举手（功能）', chineseEn: 'Raise hand (feature)', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '질문 있으면 손 들기 눌러 주세요.', chinese: '有问题请按举手。', chineseEn: 'If you have a question, please use the raise hand feature.', scene: '网课', sceneEn: 'Online course' },
    { korean: '손 들기로 발언 신청했어요.', chinese: '用举手申请发言了。', chineseEn: 'I requested to speak using the raise hand feature.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '操作'], emotionTags: [], relatedWords: ['oclass-31'],
},
{
  id: 'oclass-33', korean: '소회의실', romanization: 'sohoeuisil', baseForm: '소회의실', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '分组讨论室（breakout room）', chineseEn: 'Breakout room', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '소회의실로 나눠서 토론해요.', chinese: '分到讨论室里讨论。', chineseEn: 'We were assigned to a breakout room to discuss.', scene: '网课', sceneEn: 'Online course' },
    { korean: '소회의실에서 조별 발표를 준비해요.', chinese: '在讨论室里准备小组发表。', chineseEn: 'We\'re preparing our group presentation in the breakout room.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '操作'], emotionTags: [], relatedWords: ['oclass-34'],
},
{
  id: 'oclass-34', korean: '조별 과제', romanization: 'jobyeol gwaje', baseForm: '조별 과제', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [{ chinese: '小组作业', chineseEn: 'Group assignment', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '이번 조별 과제 주제가 뭐예요?', chinese: '这次小组作业主题是什么？', chineseEn: 'What\'s the topic for this group assignment?', scene: '网课', sceneEn: 'Online course' },
    { korean: '조별 과제 때문에 회의해요.', chinese: '为了小组作业开会。', chineseEn: 'We\'re having a meeting for the group assignment.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '课堂'], emotionTags: [], relatedWords: ['oclass-33'],
},
{
  id: 'oclass-35', korean: '교수님', romanization: 'gyosunim', baseForm: '교수님', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '教授（敬称）', chineseEn: 'Professor (honorific)', nuance: '敬语', nuanceEn: 'honorifics', register: '敬语', registerEn: 'honorifics' }],
  examples: [
    { korean: '교수님, 소리가 안 들려요.', chinese: '教授，听不到声音。', chineseEn: 'Professor, I can\'t hear any sound.', scene: '网课', sceneEn: 'Online course' },
    { korean: '교수님께 이메일을 보냈어요.', chinese: '给教授发了邮件。', chineseEn: 'I sent an email to the professor.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '课堂'], emotionTags: [], relatedWords: ['oclass-36'],
},
{
  id: 'oclass-36', korean: '수강생', romanization: 'sugangsaeng', baseForm: '수강생', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '听课学生；学员', chineseEn: 'Students; trainees', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '수강생이 백 명이 넘어요.', chinese: '听课学生超过一百人。', chineseEn: 'There are over a hundred students in the class.', scene: '网课', sceneEn: 'Online course' },
    { korean: '수강생 명단을 확인해요.', chinese: '确认学员名单。', chineseEn: 'Check the student roster.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '课堂'], emotionTags: [], relatedWords: ['oclass-35'],
},
{
  id: 'oclass-37', korean: '집중', romanization: 'jipjung', baseForm: '집중', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '集中（注意力）；专注', chineseEn: 'Concentrate; focus', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '집에서는 집중이 잘 안 돼요.', chinese: '在家很难集中。', chineseEn: 'It\'s hard to focus at home.', scene: '网课', sceneEn: 'Online course' },
    { korean: '집중해서 들으세요.', chinese: '请专注地听。', chineseEn: 'Please listen carefully.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '状态'], emotionTags: [], relatedWords: ['oclass-38'],
},
{
  id: 'oclass-38', korean: '졸리다', romanization: 'jollida', baseForm: '졸리다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
  level: '2', frequency: 2,
  meanings: [{ chinese: '困；犯困', chineseEn: 'sleepy; drowsy', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' }],
  examples: [
    { korean: '오후 수업은 너무 졸려요.', chinese: '下午的课太困了。', chineseEn: 'The afternoon class made me so sleepy.', scene: '网课', sceneEn: 'Online course' },
    { korean: '졸려서 집중이 안 돼요.', chinese: '困得没法集中。', chineseEn: 'Too sleepy to focus.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '状态'], emotionTags: [], relatedWords: ['oclass-37'],
},
{
  id: 'oclass-39', korean: '복습', romanization: 'bokseup', baseForm: '복습', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [{ chinese: '复习', chineseEn: 'review', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '수업 끝나고 복습해요.', chinese: '下课后复习。', chineseEn: 'Review after class.', scene: '网课', sceneEn: 'Online course' },
    { korean: '녹화본으로 복습했어요.', chinese: '用录像复习了。', chineseEn: 'I reviewed using the recording.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '学习'], emotionTags: [], relatedWords: ['oclass-40'],
},
{
  id: 'oclass-40', korean: '예습', romanization: 'yeseup', baseForm: '예습', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 1,
  meanings: [{ chinese: '预习', chineseEn: 'preview', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '수업 전에 예습을 해요.', chinese: '上课前预习。', chineseEn: 'Preview before class.', scene: '网课', sceneEn: 'Online course' },
    { korean: '예습을 하면 이해가 쉬워요.', chinese: '预习了理解起来就容易。', chineseEn: 'Previewing makes it easier to understand.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '学习'], emotionTags: [], relatedWords: ['oclass-39'],
},
{
  id: 'oclass-41', korean: '접속 끊기다', romanization: 'jeopsok kkeunkida', baseForm: '접속 끊기다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [{ chinese: '掉线；连接中断', chineseEn: 'disconnect; connection lost', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '갑자기 접속이 끊겼어요.', chinese: '突然掉线了。', chineseEn: 'I suddenly got disconnected.', scene: '网课', sceneEn: 'Online course' },
    { korean: '접속이 끊겨서 다시 들어왔어요.', chinese: '掉线了所以重新进来了。', chineseEn: 'I got disconnected, so I came back in.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '故障'], emotionTags: [], relatedWords: ['oclass-22', 'oclass-28'],
},
{
  id: 'oclass-42', korean: '수업 방', romanization: 'sueop bang', baseForm: '수업 방', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '2', frequency: 2,
  meanings: [{ chinese: '（线上）课堂；会议室', chineseEn: '(online) class; meeting room', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' }],
  examples: [
    { korean: '수업 방 비밀번호가 뭐예요?', chinese: '课堂密码是什么？', chineseEn: 'What\'s the class password?', scene: '网课', sceneEn: 'Online course' },
    { korean: '수업 방에 아직 아무도 없어요.', chinese: '课堂里还没人。', chineseEn: 'No one is in the class yet.', scene: '网课', sceneEn: 'Online course' },
  ],
  tags: ['网课', '操作'], emotionTags: [], relatedWords: ['oclass-05'],
},

// ─── theme-library 图书馆/自习 (lib-) ───
{
  id: 'lib-01', korean: '도서관', romanization: 'doseogwan', baseForm: '도서관', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '1', frequency: 3,
  meanings: [{ chinese: '图书馆', chineseEn: 'library', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '도서관에서 공부해요.', chinese: '在图书馆学习。', chineseEn: 'Study at the library.', scene: '图书馆', sceneEn: 'library' },
    { korean: '도서관은 몇 시에 문 닫아요?', chinese: '图书馆几点关门？', chineseEn: 'What time does the library close?', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '学习'], emotionTags: [], relatedWords: ['lib-02', 'lib-03'],
},
{
  id: 'lib-02', korean: '열람실', romanization: 'yeollamsil', baseForm: '열람실', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '阅览室；自习室', chineseEn: 'reading room; study room', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '열람실은 3층에 있어요.', chinese: '阅览室在3楼。', chineseEn: 'The reading room is on the 3rd floor.', scene: '图书馆', sceneEn: 'library' },
    { korean: '열람실에서는 조용히 해야 해요.', chinese: '阅览室里要保持安静。', chineseEn: 'Keep quiet in the reading room.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '设施'], emotionTags: [], relatedWords: ['lib-01', 'lib-03'],
},
{
  id: 'lib-03', korean: '자습실', romanization: 'jaseupsil', baseForm: '자습실', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '自习室', chineseEn: 'Study Room', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '자습실 자리가 없어요.', chinese: '自习室没座位了。', chineseEn: 'There are no seats left in the study room.', scene: '图书馆', sceneEn: 'library' },
    { korean: '자습실은 24시간 열어요.', chinese: '自习室24小时开放。', chineseEn: 'The study room is open 24 hours.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '设施'], emotionTags: [], relatedWords: ['lib-02'],
},
{
  id: 'lib-04', korean: '좌석', romanization: 'jwaseok', baseForm: '좌석', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '座位', chineseEn: 'seat', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '좌석이 다 찼어요.', chinese: '座位全满了。', chineseEn: 'All seats are taken.', scene: '图书馆', sceneEn: 'library' },
    { korean: '창가 좌석이 좋아요.', chinese: '靠窗的座位好。', chineseEn: 'The window seat is good.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '座位'], emotionTags: [], relatedWords: ['lib-05', 'lib-06'],
},
{
  id: 'lib-05', korean: '자리', romanization: 'jari', baseForm: '자리', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '位子；座位', chineseEn: 'seat; spot', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '이 자리 비었어요?', chinese: '这个位子空着吗？', chineseEn: 'Is this seat taken?', scene: '图书馆', sceneEn: 'library' },
    { korean: '자리 좀 맡아 주세요.', chinese: '帮我占个位子。', chineseEn: 'Save me a seat.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '座位'], emotionTags: [], relatedWords: ['lib-04'],
},
{
  id: 'lib-06', korean: '좌석 예약', romanization: 'jwaseok yeyak', baseForm: '좌석 예약', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 3,
  meanings: [{ chinese: '座位预约', chineseEn: 'Seat Reservation', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '좌석 예약은 앱으로 해요.', chinese: '座位预约用App做。', chineseEn: 'Seat reservations are done through the app.', scene: '图书馆', sceneEn: 'library' },
    { korean: '좌석 예약을 안 하면 못 들어가요.', chinese: '不预约座位就进不去。', chineseEn: 'You can\'t get in without reserving a seat.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '座位'], emotionTags: [], relatedWords: ['lib-04', 'lib-07'],
},
{
  id: 'lib-07', korean: '발권', romanization: 'balgwon', baseForm: '발권', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '取号；出票（座位）', chineseEn: 'Take a number; issue a ticket (seat)', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '입구에서 발권을 하세요.', chinese: '请在入口处取号。', chineseEn: 'Please take a number at the entrance.', scene: '图书馆', sceneEn: 'library' },
    { korean: '발권한 좌석 번호가 뭐예요?', chinese: '取号的座位号是多少？', chineseEn: 'What\'s the seat number on your ticket?', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '座位'], emotionTags: [], relatedWords: ['lib-06'],
},
{
  id: 'lib-08', korean: '학생증', romanization: 'haksaengjeung', baseForm: '학생증', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '学生证', chineseEn: 'Student ID', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '학생증을 찍고 들어가요.', chinese: '刷学生证进去。', chineseEn: 'Swipe your student ID to enter.', scene: '图书馆', sceneEn: 'library' },
    { korean: '학생증을 안 가져왔어요.', chinese: '没带学生证。', chineseEn: 'I didn\'t bring my student ID.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '入场'], emotionTags: [], relatedWords: ['lib-09'],
},
{
  id: 'lib-09', korean: '출입증', romanization: 'churipjeung', baseForm: '출입증', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '出入证；门禁卡', chineseEn: 'Access pass; entry card', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '외부인은 출입증이 필요해요.', chinese: '外来人员需要出入证。', chineseEn: 'Visitors need an access pass.', scene: '图书馆', sceneEn: 'library' },
    { korean: '출입증을 게이트에 대세요.', chinese: '请把出入证贴到闸机上。', chineseEn: 'Please tap your access pass on the gate.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '入场'], emotionTags: [], relatedWords: ['lib-08'],
},
{
  id: 'lib-10', korean: '대출', romanization: 'daechul', baseForm: '대출', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '借阅；借出', chineseEn: 'Borrow; check out', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '책 대출은 어디서 해요?', chinese: '借书在哪里办？', chineseEn: 'Where do I check out books?', scene: '图书馆', sceneEn: 'library' },
    { korean: '한 번에 다섯 권 대출돼요.', chinese: '一次可以借五本。', chineseEn: 'You can borrow five books at a time.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '借还'], emotionTags: [], relatedWords: ['lib-11', 'lib-12'],
},
{
  id: 'lib-11', korean: '반납', romanization: 'bannap', baseForm: '반납', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '归还', chineseEn: 'return', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '책 반납은 언제까지예요?', chinese: '还书截止到什么时候？', chineseEn: 'When is the return deadline?', scene: '图书馆', sceneEn: 'library' },
    { korean: '반납은 1층 기계에서 해요.', chinese: '还书在1楼的机器上办。', chineseEn: 'Returns are done at the machine on the first floor.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '借还'], emotionTags: [], relatedWords: ['lib-10', 'lib-13'],
},
{
  id: 'lib-12', korean: '연장', romanization: 'yeonjang', baseForm: '연장', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '续借；延长', chineseEn: 'Renew; extend', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '대출 기간을 연장할 수 있어요?', chinese: '借阅期可以续借吗？', chineseEn: 'Can I renew the loan period?', scene: '图书馆', sceneEn: 'library' },
    { korean: '한 번만 연장돼요.', chinese: '只能续借一次。', chineseEn: 'You can only renew once.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '借还'], emotionTags: [], relatedWords: ['lib-10', 'lib-13'],
},
{
  id: 'lib-13', korean: '연체', romanization: 'yeonche', baseForm: '연체', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '逾期（未还）', chineseEn: 'Overdue (not returned)', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '연체하면 대출이 안 돼요.', chinese: '逾期就没法借书了。', chineseEn: 'If it\'s overdue, you can\'t borrow books.', scene: '图书馆', sceneEn: 'library' },
    { korean: '이틀 연체됐어요.', chinese: '逾期两天了。', chineseEn: 'It\'s two days overdue.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '借还'], emotionTags: [], relatedWords: ['lib-11', 'lib-14'],
},
{
  id: 'lib-14', korean: '연체료', romanization: 'yeoncheryo', baseForm: '연체료', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '逾期罚款；滞纳金', chineseEn: 'Overdue fine; late fee', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '연체료가 얼마예요?', chinese: '滞纳金是多少？', chineseEn: 'How much is the late fee?', scene: '图书馆', sceneEn: 'library' },
    { korean: '연체료 대신 봉사 시간으로 갚아요.', chinese: '用志愿时间代替滞纳金。', chineseEn: 'You can substitute volunteer hours for the late fee.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '借还'], emotionTags: [], relatedWords: ['lib-13'],
},
{
  id: 'lib-15', korean: '도서', romanization: 'doseo', baseForm: '도서', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '图书；书籍', chineseEn: 'Books; publications', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '도서 검색을 해 볼게요.', chinese: '我来查一下图书。', chineseEn: 'Let me check the book.', scene: '图书馆', sceneEn: 'library' },
    { korean: '이 도서는 대출 중이에요.', chinese: '这本书正在被借出。', chineseEn: 'This book is currently checked out.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '藏书'], emotionTags: [], relatedWords: ['lib-16'],
},
{
  id: 'lib-16', korean: '서가', romanization: 'seoga', baseForm: '서가', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '书架；书库', chineseEn: 'bookshelf; stacks', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '서가에서 책을 찾았어요.', chinese: '在书架上找到了书。', chineseEn: 'Found the book on the shelf.', scene: '图书馆', sceneEn: 'library' },
    { korean: '이 책은 어느 서가에 있어요?', chinese: '这本书在哪个书架？', chineseEn: 'Which shelf is this book on?', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '藏书'], emotionTags: [], relatedWords: ['lib-15', 'lib-17'],
},
{
  id: 'lib-17', korean: '청구기호', romanization: 'cheonggugiho', baseForm: '청구기호', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '索书号', chineseEn: 'Call number.', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '청구기호를 보고 책을 찾아요.', chinese: '看索书号找书。', chineseEn: 'Find the book by looking at the call number.', scene: '图书馆', sceneEn: 'library' },
    { korean: '청구기호가 붙어 있어요.', chinese: '贴着索书号。', chineseEn: 'The call number is attached.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '藏书'], emotionTags: [], relatedWords: ['lib-16'],
},
{
  id: 'lib-18', korean: '검색대', romanization: 'geomsaekdae', baseForm: '검색대', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '检索台；查询机', chineseEn: 'search station; catalog terminal', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '검색대에서 책 위치를 확인해요.', chinese: '在检索台确认书的位置。', chineseEn: 'Check the book\'s location at the search station.', scene: '图书馆', sceneEn: 'library' },
    { korean: '검색대가 저기 있어요.', chinese: '检索台在那边。', chineseEn: 'The search station is over there.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '设施'], emotionTags: [], relatedWords: ['lib-15'],
},
{
  id: 'lib-19', korean: '사서', romanization: 'saseo', baseForm: '사서', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '图书管理员', chineseEn: 'librarian', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '사서한테 물어보세요.', chinese: '去问图书管理员吧。', chineseEn: 'Let\'s ask the librarian.', scene: '图书馆', sceneEn: 'library' },
    { korean: '사서 선생님이 도와주셨어요.', chinese: '图书管理员帮了我。', chineseEn: 'The librarian helped me.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '人员'], emotionTags: [], relatedWords: ['lib-01'],
},
{
  id: 'lib-20', korean: '조용히', romanization: 'joyonghi', baseForm: '조용히', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
  level: '2', frequency: 3,
  meanings: [{ chinese: '安静地；小声地', chineseEn: 'quietly; softly', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '조용히 해 주세요.', chinese: '请安静。', chineseEn: 'Please be quiet.', scene: '图书馆', sceneEn: 'library' },
    { korean: '조용히 들어오세요.', chinese: '请轻声进来。', chineseEn: 'Please come in quietly.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '礼仪'], emotionTags: [], relatedWords: ['lib-21', 'lib-22'],
},
{
  id: 'lib-21', korean: '정숙', romanization: 'jeongsuk', baseForm: '정숙', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '肃静；请保持安静（告示）', chineseEn: 'Silence; Please keep quiet (notice)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '벽에 정숙이라고 써 있어요.', chinese: '墙上写着肃静。', chineseEn: 'The wall says \'Silence.\'', scene: '图书馆', sceneEn: 'library' },
    { korean: '정숙을 지켜 주세요.', chinese: '请保持肃静。', chineseEn: 'Please keep quiet.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '礼仪'], emotionTags: [], relatedWords: ['lib-20'],
},
{
  id: 'lib-22', korean: '소음', romanization: 'soeum', baseForm: '소음', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '噪音', chineseEn: 'Noise', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '소음 때문에 집중이 안 돼요.', chinese: '因为噪音没法集中。', chineseEn: 'I can\'t concentrate because of the noise.', scene: '图书馆', sceneEn: 'library' },
    { korean: '소음을 내지 마세요.', chinese: '请不要发出噪音。', chineseEn: 'Please don\'t make noise.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '礼仪'], emotionTags: [], relatedWords: ['lib-20'],
},
{
  id: 'lib-23', korean: '휴대폰 진동', romanization: 'hyudaepon jindong', baseForm: '휴대폰 진동', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [{ chinese: '手机（调）振动', chineseEn: 'phone (set to) vibrate', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '휴대폰은 진동으로 해 주세요.', chinese: '手机请调成振动。', chineseEn: 'Please set your phone to vibrate.', scene: '图书馆', sceneEn: 'library' },
    { korean: '진동으로 바꿨어요.', chinese: '改成振动了。', chineseEn: 'I\'ve switched it to vibrate.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '礼仪'], emotionTags: [], relatedWords: ['lib-22'],
},
{
  id: 'lib-24', korean: '통화', romanization: 'tonghwa', baseForm: '통화', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 2,
  meanings: [{ chinese: '通话；打电话', chineseEn: 'call; make a phone call', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '통화는 밖에서 해 주세요.', chinese: '打电话请到外面。', chineseEn: 'Please make phone calls outside.', scene: '图书馆', sceneEn: 'library' },
    { korean: '여기서는 통화하면 안 돼요.', chinese: '这里不能打电话。', chineseEn: 'You can\'t make phone calls here.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '礼仪'], emotionTags: [], relatedWords: ['lib-23'],
},
{
  id: 'lib-25', korean: '자리 맡다', romanization: 'jari matda', baseForm: '자리 맡다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [{ chinese: '占座', chineseEn: 'save a seat', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' }],
  examples: [
    { korean: '가방으로 자리를 맡아 놨어요.', chinese: '用包占了座位。', chineseEn: 'Saved a seat with a bag.', scene: '图书馆', sceneEn: 'library' },
    { korean: '자리 맡아 두고 밥 먹으러 갔어요.', chinese: '占好座去吃饭了。', chineseEn: 'Saved a seat and went to eat.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '座位'], emotionTags: [], relatedWords: ['lib-05', 'lib-26'],
},
{
  id: 'lib-26', korean: '자리 비우다', romanization: 'jari biuda', baseForm: '자리 비우다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [{ chinese: '离座；空出座位', chineseEn: 'leave a seat; vacate a seat', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '오래 자리를 비우면 안 돼요.', chinese: '不能长时间离座。', chineseEn: 'You can\'t leave your seat for a long time.', scene: '图书馆', sceneEn: 'library' },
    { korean: '잠깐 자리 비웠어요.', chinese: '暂时离开了一下座位。', chineseEn: 'Stepped away from the seat for a moment.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '座位'], emotionTags: [], relatedWords: ['lib-25'],
},
{
  id: 'lib-27', korean: '이용 시간', romanization: 'iyong sigan', baseForm: '이용 시간', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [{ chinese: '使用时间；开放时间', chineseEn: 'hours of use; opening hours', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '이용 시간이 어떻게 돼요?', chinese: '开放时间是几点到几点？', chineseEn: 'What time are the opening hours?', scene: '图书馆', sceneEn: 'library' },
    { korean: '주말은 이용 시간이 짧아요.', chinese: '周末开放时间短。', chineseEn: 'Opening hours are shorter on weekends.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '设施'], emotionTags: [], relatedWords: ['lib-28'],
},
{
  id: 'lib-28', korean: '퇴실', romanization: 'toesil', baseForm: '퇴실', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '离场；退室', chineseEn: 'leave the premises; exit the room', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '퇴실 시간은 밤 10시예요.', chinese: '离场时间是晚上10点。', chineseEn: 'The closing time is 10 PM.', scene: '图书馆', sceneEn: 'library' },
    { korean: '퇴실 처리를 하고 나가세요.', chinese: '办理离场后再出去。', chineseEn: 'Check out before leaving.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '设施'], emotionTags: [], relatedWords: ['lib-27'],
},
{
  id: 'lib-29', korean: '노트북', romanization: 'noteubuk', baseForm: '노트북', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '笔记本电脑', chineseEn: 'laptop', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '노트북을 가져왔어요.', chinese: '带了笔记本电脑。', chineseEn: 'Brought a laptop.', scene: '图书馆', sceneEn: 'library' },
    { korean: '노트북 쓰는 자리는 따로 있어요.', chinese: '用笔记本的座位是分开的。', chineseEn: 'Seats for laptops are separate.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '设备'], emotionTags: [], relatedWords: ['lib-30'],
},
{
  id: 'lib-30', korean: '콘센트', romanization: 'konsenteu', baseForm: '콘센트', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '插座', chineseEn: 'Outlet', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '콘센트 있는 자리가 좋아요.', chinese: '有插座的座位好。', chineseEn: 'Seats with outlets are better.', scene: '图书馆', sceneEn: 'library' },
    { korean: '콘센트가 어디 있어요?', chinese: '插座在哪里？', chineseEn: 'Where are the outlets?', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '设备'], emotionTags: [], relatedWords: ['lib-29'],
},
{
  id: 'lib-31', korean: '충전', romanization: 'chungjeon', baseForm: '충전', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '充电', chineseEn: 'to recharge', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '휴대폰 충전 좀 하려고요.', chinese: '想给手机充个电。', chineseEn: 'I want to charge my phone.', scene: '图书馆', sceneEn: 'library' },
    { korean: '충전이 다 됐어요.', chinese: '充满电了。', chineseEn: 'It\'s fully charged.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '设备'], emotionTags: [], relatedWords: ['lib-30'],
},
{
  id: 'lib-32', korean: '집중이 잘되다', romanization: 'jipjung-i jaldoeda', baseForm: '집중이 잘되다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [{ chinese: '容易集中；专注得起来', chineseEn: 'easy to focus; can concentrate', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '도서관에서는 집중이 잘돼요.', chinese: '在图书馆容易集中。', chineseEn: 'It\'s easy to focus in the library.', scene: '图书馆', sceneEn: 'library' },
    { korean: '조용해서 집중이 잘돼요.', chinese: '因为安静所以很专注。', chineseEn: 'It\'s quiet, so I can concentrate well.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '状态'], emotionTags: [], relatedWords: ['lib-33'],
},
{
  id: 'lib-33', korean: '공부하다', romanization: 'gongbuhada', baseForm: '공부하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '1', frequency: 3,
  meanings: [{ chinese: '学习', chineseEn: 'to study', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '시험 공부를 하고 있어요.', chinese: '在准备考试。', chineseEn: 'I\'m studying for an exam.', scene: '图书馆', sceneEn: 'library' },
    { korean: '같이 공부할래요?', chinese: '要一起学习吗？', chineseEn: 'Want to study together?', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '学习'], emotionTags: [], relatedWords: ['lib-32'],
},
{
  id: 'lib-34', korean: '시험 기간', romanization: 'siheom gigan', baseForm: '시험 기간', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '2', frequency: 3,
  meanings: [{ chinese: '考试期间', chineseEn: 'during the exam period', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '시험 기간이라 자리가 없어요.', chinese: '因为是考试期间没座位。', chineseEn: 'There are no seats because it\'s exam period.', scene: '图书馆', sceneEn: 'library' },
    { korean: '시험 기간에는 밤새 공부해요.', chinese: '考试期间通宵学习。', chineseEn: 'I studied all night during exams.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '学习'], emotionTags: [], relatedWords: ['lib-33'],
},
{
  id: 'lib-35', korean: '자료실', romanization: 'jaryosil', baseForm: '자료실', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '资料室', chineseEn: 'Reference room', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '옛날 신문은 자료실에 있어요.', chinese: '旧报纸在资料室。', chineseEn: 'Old newspapers are in the reference room.', scene: '图书馆', sceneEn: 'library' },
    { korean: '자료실은 대출이 안 돼요.', chinese: '资料室的东西不能外借。', chineseEn: 'Items in the reference room can\'t be borrowed.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '设施'], emotionTags: [], relatedWords: ['lib-02'],
},
{
  id: 'lib-36', korean: '복사기', romanization: 'boksagi', baseForm: '복사기', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '复印机', chineseEn: 'Copier', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '복사기는 어디 있어요?', chinese: '复印机在哪里？', chineseEn: 'Where is the copier?', scene: '图书馆', sceneEn: 'library' },
    { korean: '복사기가 고장 났어요.', chinese: '复印机坏了。', chineseEn: 'The copier is broken.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '设备'], emotionTags: [], relatedWords: ['lib-37'],
},
{
  id: 'lib-37', korean: '출력', romanization: 'chullyeok', baseForm: '출력', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '打印；输出', chineseEn: 'Print; output', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '자료를 출력하려고요.', chinese: '想打印资料。', chineseEn: 'I want to print some materials.', scene: '图书馆', sceneEn: 'library' },
    { korean: '출력 한 장에 얼마예요?', chinese: '打印一张多少钱？', chineseEn: 'How much is it to print one page?', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '设备'], emotionTags: [], relatedWords: ['lib-36'],
},
{
  id: 'lib-38', korean: '반납함', romanization: 'bannapham', baseForm: '반납함', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '还书箱', chineseEn: 'Book return box', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '문 닫은 뒤에는 반납함에 넣으세요.', chinese: '闭馆后请放进还书箱。', chineseEn: 'Please put it in the book return box after closing.', scene: '图书馆', sceneEn: 'library' },
    { korean: '반납함은 정문 옆에 있어요.', chinese: '还书箱在正门旁边。', chineseEn: 'The book return box is next to the main entrance.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '借还'], emotionTags: [], relatedWords: ['lib-11'],
},
{
  id: 'lib-39', korean: '조용히 해 주세요', romanization: 'joyonghi hae juseyo', baseForm: '조용히 하다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '2', frequency: 3,
  meanings: [{ chinese: '请安静一点', chineseEn: 'Please be quieter.', nuance: '敬语', nuanceEn: 'honorifics', register: '敬语', registerEn: 'honorifics' }],
  examples: [
    { korean: '죄송한데 조용히 해 주세요.', chinese: '不好意思，请安静一点。', chineseEn: 'Excuse me, please be a bit quieter.', scene: '图书馆', sceneEn: 'library' },
    { korean: '여기서는 조용히 해 주세요.', chinese: '在这里请保持安静。', chineseEn: 'Please keep quiet here.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '礼仪'], emotionTags: [], relatedWords: ['lib-20'],
},
{
  id: 'lib-40', korean: '집중석', romanization: 'jipjungseok', baseForm: '집중석', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '专注座（隔间自习座）', chineseEn: 'Focus seat (cubicle study seat)', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '집중석은 칸막이가 있어요.', chinese: '专注座有隔板。', chineseEn: 'Focus seats have dividers.', scene: '图书馆', sceneEn: 'library' },
    { korean: '집중석에서 공부하면 편해요.', chinese: '在专注座学习很舒服。', chineseEn: 'Studying in a focus seat is comfortable.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '座位'], emotionTags: [], relatedWords: ['lib-04', 'lib-41'],
},
{
  id: 'lib-41', korean: '칸막이', romanization: 'kanmagi', baseForm: '칸막이', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '隔板；隔间', chineseEn: 'Divider; cubicle', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '칸막이가 있어서 아늑해요.', chinese: '有隔板所以很有安全感。', chineseEn: 'The divider gives a sense of security.', scene: '图书馆', sceneEn: 'library' },
    { korean: '칸막이 자리를 좋아해요.', chinese: '喜欢带隔板的座位。', chineseEn: 'I like seats with dividers.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '座位'], emotionTags: [], relatedWords: ['lib-40'],
},
{
  id: 'lib-42', korean: '휴게실', romanization: 'hyugesil', baseForm: '휴게실', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '休息室', chineseEn: 'Lounge', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '휴게실에서 잠깐 쉬어요.', chinese: '在休息室歇一会儿。', chineseEn: 'Rest a bit in the lounge.', scene: '图书馆', sceneEn: 'library' },
    { korean: '음식은 휴게실에서 드세요.', chinese: '食物请在休息室吃。', chineseEn: 'Please eat food in the lounge.', scene: '图书馆', sceneEn: 'library' },
  ],
  tags: ['图书馆', '设施'], emotionTags: [], relatedWords: ['lib-27'],
},

// ─── theme-negotiation 谈判与合同 (nego-) ───
{
  id: 'nego-01', korean: '협상', romanization: 'hyeopsang', baseForm: '협상', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '谈判；协商', chineseEn: 'negotiation; consultation', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '협상이 잘 마무리되었습니다.', chinese: '谈判顺利收尾了。', chineseEn: 'The negotiations wrapped up smoothly.', scene: '商务', sceneEn: 'Business' },
    { korean: '가격 협상을 다시 시작하겠습니다.', chinese: '我们重新开始价格谈判。', chineseEn: 'We\'re restarting price negotiations.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-02', 'nego-03'],
},
{
  id: 'nego-02', korean: '조건', romanization: 'jogeon', baseForm: '조건', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '条件', chineseEn: 'condition', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '이 조건은 받아들이기 어렵습니다.', chinese: '这个条件很难接受。', chineseEn: 'This condition is hard to accept.', scene: '商务', sceneEn: 'Business' },
    { korean: '조건을 조금만 조정해 주시겠어요?', chinese: '能稍微调整一下条件吗？', chineseEn: 'Could you adjust the terms a bit?', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '合同'], emotionTags: [], relatedWords: ['nego-01', 'nego-04'],
},
{
  id: 'nego-03', korean: '계약서', romanization: 'gyeyakseo', baseForm: '계약서', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '合同（书）', chineseEn: 'contract (document)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '계약서를 검토하겠습니다.', chinese: '我会审阅合同。', chineseEn: 'I\'ll review the contract.', scene: '合同', sceneEn: 'contract' },
    { korean: '계약서에 서명해 주시기 바랍니다.', chinese: '请在合同上签名。', chineseEn: 'Please sign the contract.', scene: '合同', sceneEn: 'contract' },
  ],
  tags: ['谈判', '合同'], emotionTags: [], relatedWords: ['nego-05', 'nego-06'],
},
{
  id: 'nego-04', korean: '조율하다', romanization: 'joyulhada', baseForm: '조율하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '5', frequency: 2,
  meanings: [{ chinese: '协调；调整（意见/条件）', chineseEn: 'coordination; adjustment (of opinions/conditions)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '양측 입장을 조율하고 있습니다.', chinese: '正在协调双方立场。', chineseEn: 'We\'re coordinating both sides\' positions.', scene: '商务', sceneEn: 'Business' },
    { korean: '세부 사항을 조율하겠습니다.', chinese: '我们来协调细节。', chineseEn: 'Let\'s coordinate the details.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-02'],
},
{
  id: 'nego-05', korean: '조항', romanization: 'johang', baseForm: '조항', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '条款；条项', chineseEn: 'clause; provision', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '이 조항에 대해 문의드립니다.', chinese: '就这一条款向您咨询。', chineseEn: 'I\'d like to consult you on this clause.', scene: '合同', sceneEn: 'contract' },
    { korean: '제3조 조항을 수정하고 싶습니다.', chinese: '想修改第3条条款。', chineseEn: 'I want to revise clause 3.', scene: '合同', sceneEn: 'contract' },
  ],
  tags: ['谈判', '合同'], emotionTags: [], relatedWords: ['nego-03', 'nego-06'],
},
{
  id: 'nego-06', korean: '수정', romanization: 'sujeong', baseForm: '수정', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '修改；修正', chineseEn: 'revision; amendment', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '수정 사항을 정리했습니다.', chinese: '整理好了需要修改的地方。', chineseEn: 'I\'ve organized the points that need revision.', scene: '合同', sceneEn: 'contract' },
    { korean: '수정 후에 다시 보내 드리겠습니다.', chinese: '修改后再发给您。', chineseEn: 'I\'ll send it to you after revising.', scene: '合同', sceneEn: 'contract' },
  ],
  tags: ['谈判', '合同'], emotionTags: [], relatedWords: ['nego-05', 'nego-07'],
},
{
  id: 'nego-07', korean: '수정 요청', romanization: 'sujeong yocheong', baseForm: '수정 요청', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 2,
  meanings: [{ chinese: '修改请求', chineseEn: 'revision request', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '수정 요청 드려도 될까요?', chinese: '可以向您提出修改请求吗？', chineseEn: 'May I make a revision request?', scene: '合同', sceneEn: 'contract' },
    { korean: '수정 요청을 반영하겠습니다.', chinese: '我们会采纳修改请求。', chineseEn: 'We\'ll accept the revision request.', scene: '合同', sceneEn: 'contract' },
  ],
  tags: ['谈判', '合同'], emotionTags: [], relatedWords: ['nego-06'],
},
{
  id: 'nego-08', korean: '납기', romanization: 'napgi', baseForm: '납기', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '交货期；交付期限', chineseEn: 'delivery deadline; due date', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '납기를 맞출 수 있습니까?', chinese: '能赶上交货期吗？', chineseEn: 'Can we meet the delivery deadline?', scene: '商务', sceneEn: 'Business' },
    { korean: '납기가 너무 촉박합니다.', chinese: '交货期太紧了。', chineseEn: 'The delivery deadline is too tight.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '交付'], emotionTags: [], relatedWords: ['nego-09', 'nego-10'],
},
{
  id: 'nego-09', korean: '납품', romanization: 'nappum', baseForm: '납품', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '交货；供货', chineseEn: 'delivery; supply', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '다음 주까지 납품하겠습니다.', chinese: '我们下周前交货。', chineseEn: 'We\'ll deliver by next week.', scene: '商务', sceneEn: 'Business' },
    { korean: '납품이 하루 지연되었습니다.', chinese: '交货延迟了一天。', chineseEn: 'The delivery was delayed by a day.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '交付'], emotionTags: [], relatedWords: ['nego-08'],
},
{
  id: 'nego-10', korean: '기한', romanization: 'gihan', baseForm: '기한', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '期限；截止日', chineseEn: 'deadline; due date', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '기한을 조금 연장해 주시겠어요?', chinese: '能稍微延长一下期限吗？', chineseEn: 'Could you extend the deadline a bit?', scene: '商务', sceneEn: 'Business' },
    { korean: '기한 안에 처리하겠습니다.', chinese: '我们会在期限内处理。', chineseEn: 'We\'ll handle it within the deadline.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '交付'], emotionTags: [], relatedWords: ['nego-08'],
},
{
  id: 'nego-11', korean: '단가', romanization: 'danga', baseForm: '단가', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '单价', chineseEn: 'Unit Price', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '단가를 조금 낮춰 주실 수 있을까요?', chinese: '能稍微降低一下单价吗？', chineseEn: 'Could you lower the unit price a bit?', scene: '商务', sceneEn: 'Business' },
    { korean: '단가가 예상보다 높습니다.', chinese: '单价比预想的高。', chineseEn: 'The unit price is higher than expected.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '价格'], emotionTags: [], relatedWords: ['nego-12', 'nego-13'],
},
{
  id: 'nego-12', korean: '견적', romanization: 'gyeonjeok', baseForm: '견적', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '报价；估价', chineseEn: 'quotation; estimate', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '견적서를 보내 주시겠습니까?', chinese: '能把报价单发给我吗？', chineseEn: 'Could you send me the quotation?', scene: '商务', sceneEn: 'Business' },
    { korean: '견적을 다시 뽑아 보겠습니다.', chinese: '我们重新出一份报价。', chineseEn: 'We\'ll issue a new quotation.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '价格'], emotionTags: [], relatedWords: ['nego-11', 'nego-13'],
},
{
  id: 'nego-13', korean: '할인', romanization: 'harin', baseForm: '할인', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '折扣；优惠', chineseEn: 'discount; special offer', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '대량 주문 시 할인이 가능합니까?', chinese: '大量订购时能打折吗？', chineseEn: 'Can we get a discount for bulk orders?', scene: '商务', sceneEn: 'Business' },
    { korean: '5% 할인을 제안드립니다.', chinese: '我们提议打95折。', chineseEn: 'We propose a 5% discount.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '价格'], emotionTags: [], relatedWords: ['nego-11'],
},
{
  id: 'nego-14', korean: '제안', romanization: 'jean', baseForm: '제안', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '提议；建议', chineseEn: 'proposal; suggestion', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '한 가지 제안을 드리고 싶습니다.', chinese: '我想提一个建议。', chineseEn: 'I\'d like to make a suggestion.', scene: '商务', sceneEn: 'Business' },
    { korean: '좋은 제안 감사합니다.', chinese: '感谢您的好建议。', chineseEn: 'Thank you for your good suggestion.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-15'],
},
{
  id: 'nego-15', korean: '제안하다', romanization: 'jeanhada', baseForm: '제안하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '4', frequency: 3,
  meanings: [{ chinese: '提议；提出', chineseEn: 'to propose; to suggest', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '다른 방안을 제안하겠습니다.', chinese: '我提议另一个方案。', chineseEn: 'I propose another option.', scene: '商务', sceneEn: 'Business' },
    { korean: '이렇게 진행하는 것을 제안드립니다.', chinese: '我建议这样推进。', chineseEn: 'I suggest we proceed this way.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-14'],
},
{
  id: 'nego-16', korean: '검토', romanization: 'geomto', baseForm: '검토', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '审阅；研究讨论', chineseEn: 'review; study and discuss', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '내부 검토가 필요합니다.', chinese: '需要内部审阅。', chineseEn: 'It needs an internal review.', scene: '商务', sceneEn: 'Business' },
    { korean: '검토 후에 답변드리겠습니다.', chinese: '审阅后给您答复。', chineseEn: 'We\'ll get back to you after the review.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '流程'], emotionTags: [], relatedWords: ['nego-17'],
},
{
  id: 'nego-17', korean: '검토하다', romanization: 'geomtohada', baseForm: '검토하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '4', frequency: 3,
  meanings: [{ chinese: '审阅；研讨', chineseEn: 'review; deliberation', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '제안서를 꼼꼼히 검토하겠습니다.', chinese: '我会仔细审阅提案书。', chineseEn: 'I\'ll carefully review the proposal.', scene: '商务', sceneEn: 'Business' },
    { korean: '함께 검토해 보시죠.', chinese: '我们一起看看吧。', chineseEn: 'Let\'s take a look together.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '流程'], emotionTags: [], relatedWords: ['nego-16'],
},
{
  id: 'nego-18', korean: '합의', romanization: 'hab-ui', baseForm: '합의', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '协议；达成一致', chineseEn: 'agreement; reaching a consensus', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '원만하게 합의에 이르렀습니다.', chinese: '圆满地达成了协议。', chineseEn: 'We successfully reached an agreement.', scene: '商务', sceneEn: 'Business' },
    { korean: '합의 내용을 문서로 남기겠습니다.', chinese: '我们把协议内容形成书面。', chineseEn: 'Let\'s put the agreement in writing.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-19'],
},
{
  id: 'nego-19', korean: '타협', romanization: 'tahyeop', baseForm: '타협', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '妥协；让步', chineseEn: 'compromise; concession', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '서로 조금씩 타협하는 게 좋겠습니다.', chinese: '双方各让一步比较好。', chineseEn: 'It\'s better for both sides to give a little.', scene: '商务', sceneEn: 'Business' },
    { korean: '이 부분은 타협이 어렵습니다.', chinese: '这部分很难妥协。', chineseEn: 'This part is hard to compromise on.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-18', 'nego-20'],
},
{
  id: 'nego-20', korean: '양보', romanization: 'yangbo', baseForm: '양보', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '让步；退让', chineseEn: 'concession; yielding', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '가격 면에서 양보하겠습니다.', chinese: '在价格方面我们让步。', chineseEn: 'We\'ll concede on the price.', scene: '商务', sceneEn: 'Business' },
    { korean: '더 이상 양보는 어렵습니다.', chinese: '不能再让步了。', chineseEn: 'We can\'t concede any further.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-19'],
},
{
  id: 'nego-21', korean: '조건부', romanization: 'jogeonbu', baseForm: '조건부', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '附条件的', chineseEn: 'conditional', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '조건부로 수락하겠습니다.', chinese: '我们附条件接受。', chineseEn: 'We accept conditionally.', scene: '商务', sceneEn: 'Business' },
    { korean: '이건 조건부 제안입니다.', chinese: '这是附条件的提议。', chineseEn: 'This is a conditional proposal.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '合同'], emotionTags: [], relatedWords: ['nego-02'],
},
{
  id: 'nego-22', korean: '위약금', romanization: 'wiyakgeum', baseForm: '위약금', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '违约金', chineseEn: 'penalty; liquidated damages', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '계약을 어기면 위약금이 발생합니다.', chinese: '违约会产生违约金。', chineseEn: 'Breach of contract incurs penalties.', scene: '合同', sceneEn: 'contract' },
    { korean: '위약금 조항을 확인해 주세요.', chinese: '请确认违约金条款。', chineseEn: 'Please check the penalty clause.', scene: '合同', sceneEn: 'contract' },
  ],
  tags: ['谈判', '合同'], emotionTags: [], relatedWords: ['nego-23'],
},
{
  id: 'nego-23', korean: '해지', romanization: 'haeji', baseForm: '해지', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '解约；终止（合同）', chineseEn: 'termination; cancellation (of contract)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '계약 해지를 원하시면 미리 통보해 주세요.', chinese: '如需解约请提前通知。', chineseEn: 'Please notify in advance if you need to terminate.', scene: '合同', sceneEn: 'contract' },
    { korean: '중도 해지는 위약금이 있습니다.', chinese: '中途解约有违约金。', chineseEn: 'Early termination incurs a penalty.', scene: '合同', sceneEn: 'contract' },
  ],
  tags: ['谈判', '合同'], emotionTags: [], relatedWords: ['nego-22', 'nego-24'],
},
{
  id: 'nego-24', korean: '갱신', romanization: 'gaengsin', baseForm: '갱신', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '续约；更新', chineseEn: 'renewal; extension', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '계약을 1년 더 갱신하겠습니다.', chinese: '合同再续签一年。', chineseEn: 'Renew the contract for another year.', scene: '合同', sceneEn: 'contract' },
    { korean: '갱신 조건은 동일합니다.', chinese: '续约条件不变。', chineseEn: 'The renewal terms remain unchanged.', scene: '合同', sceneEn: 'contract' },
  ],
  tags: ['谈判', '合同'], emotionTags: [], relatedWords: ['nego-23'],
},
{
  id: 'nego-25', korean: '서명', romanization: 'seomyeong', baseForm: '서명', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '签名；署名', chineseEn: 'signature', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '여기에 서명 부탁드립니다.', chinese: '请在这里签名。', chineseEn: 'Please sign here.', scene: '合同', sceneEn: 'contract' },
    { korean: '서명이 빠졌습니다.', chinese: '漏了签名。', chineseEn: 'Missed the signature.', scene: '合同', sceneEn: 'contract' },
  ],
  tags: ['谈判', '合同'], emotionTags: [], relatedWords: ['nego-26'],
},
{
  id: 'nego-26', korean: '날인', romanization: 'narin', baseForm: '날인', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '盖章；钤印', chineseEn: 'seal; stamp', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '도장으로 날인해 주세요.', chinese: '请用印章盖章。', chineseEn: 'Please stamp it with a seal.', scene: '合同', sceneEn: 'contract' },
    { korean: '서명 또는 날인이 필요합니다.', chinese: '需要签名或盖章。', chineseEn: 'A signature or seal is required.', scene: '合同', sceneEn: 'contract' },
  ],
  tags: ['谈判', '合同'], emotionTags: [], relatedWords: ['nego-25'],
},
{
  id: 'nego-27', korean: '조율 요청', romanization: 'joyul yocheong', baseForm: '조율 요청', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 1,
  meanings: [{ chinese: '协调请求（请求调整）', chineseEn: 'coordination request (request for adjustment)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '일정 조율을 요청드립니다.', chinese: '请求协调一下日程。', chineseEn: 'Please coordinate the schedule.', scene: '商务', sceneEn: 'Business' },
    { korean: '납기 조율을 요청드려도 될까요?', chinese: '可以请求协调交货期吗？', chineseEn: 'Can we request an adjustment to the delivery date?', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '流程'], emotionTags: [], relatedWords: ['nego-04'],
},
{
  id: 'nego-28', korean: '결정 권한', romanization: 'gyeoljeong gwonhan', baseForm: '결정 권한', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 1,
  meanings: [{ chinese: '决定权；决策权限', chineseEn: 'decision-making authority', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '제게는 결정 권한이 없습니다.', chinese: '我没有决定权。', chineseEn: 'I don\'t have the authority to decide.', scene: '商务', sceneEn: 'Business' },
    { korean: '결정 권한은 팀장님께 있습니다.', chinese: '决定权在组长那里。', chineseEn: 'The team lead has the decision-making authority.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-29'],
},
{
  id: 'nego-29', korean: '결재', romanization: 'gyeoljae', baseForm: '결재', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '批准；审批（上级）', chineseEn: 'approval (from a superior)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '결재를 받아야 진행할 수 있습니다.', chinese: '要获批才能推进。', chineseEn: 'We need approval to proceed.', scene: '商务', sceneEn: 'Business' },
    { korean: '결재가 아직 안 났습니다.', chinese: '审批还没下来。', chineseEn: 'Approval hasn\'t come through yet.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '流程'], emotionTags: [], relatedWords: ['nego-28'],
},
{
  id: 'nego-30', korean: '검토 의견', romanization: 'geomto uigyeon', baseForm: '검토 의견', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 1,
  meanings: [{ chinese: '审阅意见；反馈意见', chineseEn: 'review comments; feedback', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '검토 의견을 정리해서 보내겠습니다.', chinese: '整理好审阅意见后发给您。', chineseEn: 'I\'ll organize the review comments and send them to you.', scene: '商务', sceneEn: 'Business' },
    { korean: '검토 의견 주셔서 감사합니다.', chinese: '感谢您给出的审阅意见。', chineseEn: 'Thank you for your feedback.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '流程'], emotionTags: [], relatedWords: ['nego-16'],
},
{
  id: 'nego-31', korean: '입장', romanization: 'ipjang', baseForm: '입장', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '立场；处境', chineseEn: 'position; situation', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '저희 입장도 고려해 주시면 감사하겠습니다.', chinese: '若能考虑我方立场，将不胜感激。', chineseEn: 'We would greatly appreciate it if you could consider our position.', scene: '商务', sceneEn: 'Business' },
    { korean: '서로의 입장을 이해합니다.', chinese: '理解彼此的立场。', chineseEn: 'Understand each other\'s positions.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-32'],
},
{
  id: 'nego-32', korean: '입장 차이', romanization: 'ipjang chai', baseForm: '입장 차이', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 1,
  meanings: [{ chinese: '立场分歧', chineseEn: 'difference in positions', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '아직 입장 차이가 있습니다.', chinese: '目前还有立场分歧。', chineseEn: 'There are still differences in positions.', scene: '商务', sceneEn: 'Business' },
    { korean: '입장 차이를 좁혀 나가겠습니다.', chinese: '我们会逐步缩小立场分歧。', chineseEn: 'We will gradually narrow the gap in our positions.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-31'],
},
{
  id: 'nego-33', korean: '재검토', romanization: 'jaegeomto', baseForm: '재검토', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '重新审阅；重新研讨', chineseEn: 're-review; re-examine', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '이 부분은 재검토가 필요합니다.', chinese: '这部分需要重新审阅。', chineseEn: 'This part needs to be re-reviewed.', scene: '商务', sceneEn: 'Business' },
    { korean: '재검토 후 다시 회신드리겠습니다.', chinese: '重新审阅后再回复您。', chineseEn: 'I\'ll get back to you after re-reviewing.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '流程'], emotionTags: [], relatedWords: ['nego-16'],
},
{
  id: 'nego-34', korean: '회신', romanization: 'hoesin', baseForm: '회신', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '回复；回函', chineseEn: 'reply; response', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '빠른 시일 내에 회신드리겠습니다.', chinese: '会尽快给您回复。', chineseEn: 'I\'ll get back to you as soon as possible.', scene: '商务', sceneEn: 'Business' },
    { korean: '회신이 늦어 죄송합니다.', chinese: '回复晚了，抱歉。', chineseEn: 'Sorry for the late reply.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '流程'], emotionTags: [], relatedWords: ['nego-30'],
},
{
  id: 'nego-35', korean: '최종안', romanization: 'choejong-an', baseForm: '최종안', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '最终方案；定稿', chineseEn: 'final plan; final version', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '최종안을 첨부해 드립니다.', chinese: '附上最终方案。', chineseEn: 'Attached is the final plan.', scene: '商务', sceneEn: 'Business' },
    { korean: '이것이 최종안입니까?', chinese: '这是最终方案吗？', chineseEn: 'Is this the final plan?', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '合同'], emotionTags: [], relatedWords: ['nego-36'],
},
{
  id: 'nego-36', korean: '초안', romanization: 'cho-an', baseForm: '초안', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '草案；初稿', chineseEn: 'draft; preliminary version', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '계약서 초안을 먼저 보내 주세요.', chinese: '请先把合同草案发给我。', chineseEn: 'Please send me the contract draft first.', scene: '合同', sceneEn: 'contract' },
    { korean: '초안을 바탕으로 논의하겠습니다.', chinese: '以草案为基础展开讨论。', chineseEn: 'Let\'s discuss based on the draft.', scene: '合同', sceneEn: 'contract' },
  ],
  tags: ['谈判', '合同'], emotionTags: [], relatedWords: ['nego-35'],
},
{
  id: 'nego-37', korean: '수락하다', romanization: 'surakhada', baseForm: '수락하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '5', frequency: 2,
  meanings: [{ chinese: '接受；答应', chineseEn: 'accept; agree to', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '제안을 수락하겠습니다.', chinese: '我们接受这个提议。', chineseEn: 'We accept this proposal.', scene: '商务', sceneEn: 'Business' },
    { korean: '조건을 수락하기 어렵습니다.', chinese: '很难接受这些条件。', chineseEn: 'It\'s hard to accept these terms.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-38'],
},
{
  id: 'nego-38', korean: '거절하다', romanization: 'geojeolhada', baseForm: '거절하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '4', frequency: 2,
  meanings: [{ chinese: '拒绝；婉拒', chineseEn: 'refuse; politely decline', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '아쉽지만 이번에는 거절할 수밖에 없습니다.', chinese: '很遗憾，这次只能拒绝。', chineseEn: 'Unfortunately, we have to decline this time.', scene: '商务', sceneEn: 'Business' },
    { korean: '정중하게 거절했습니다.', chinese: '礼貌地拒绝了。', chineseEn: 'Politely declined.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-37'],
},
{
  id: 'nego-39', korean: '재고하다', romanization: 'jaegohada', baseForm: '재고하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '5', frequency: 1,
  meanings: [{ chinese: '重新考虑；再斟酌', chineseEn: 'reconsider; think over', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '한 번 더 재고해 주시겠습니까?', chinese: '能请您再重新考虑一下吗？', chineseEn: 'Could you please reconsider?', scene: '商务', sceneEn: 'Business' },
    { korean: '신중하게 재고하겠습니다.', chinese: '我们会慎重再考虑。', chineseEn: 'We\'ll think it over carefully.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-33'],
},
{
  id: 'nego-40', korean: '결렬', romanization: 'gyeollyeol', baseForm: '결렬', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '（谈判）破裂；决裂', chineseEn: 'breakdown (in negotiations); rupture', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '협상이 결렬되었습니다.', chinese: '谈判破裂了。', chineseEn: 'The negotiations broke down.', scene: '商务', sceneEn: 'Business' },
    { korean: '결렬만은 피하고 싶습니다.', chinese: '只想避免谈崩。', chineseEn: 'Just want to avoid a breakdown in talks.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-01'],
},
{
  id: 'nego-41', korean: '조건을 맞추다', romanization: 'jogeoneul matchuda', baseForm: '조건을 맞추다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 1,
  meanings: [{ chinese: '满足条件；对上条件', chineseEn: 'meet conditions; satisfy requirements', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '최대한 조건을 맞춰 보겠습니다.', chinese: '我们尽量满足条件。', chineseEn: 'We\'ll try our best to meet the conditions.', scene: '商务', sceneEn: 'Business' },
    { korean: '그 조건을 맞추기는 어렵습니다.', chinese: '很难满足那个条件。', chineseEn: 'It\'s hard to meet that condition.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-02'],
},
{
  id: 'nego-42', korean: '윈윈', romanization: 'winwin', baseForm: '윈윈', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '双赢', chineseEn: 'win-win', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '서로 윈윈할 수 있는 방향으로 가시죠.', chinese: '我们朝双赢的方向走吧。', chineseEn: 'Let\'s aim for a win-win outcome.', scene: '商务', sceneEn: 'Business' },
    { korean: '윈윈이 가장 이상적입니다.', chinese: '双赢是最理想的。', chineseEn: 'A win-win is the most ideal.', scene: '商务', sceneEn: 'Business' },
  ],
  tags: ['谈判', '商务'], emotionTags: [], relatedWords: ['nego-18'],
},

// ─── theme-presentation 汇报与演示 (pres-) ───
{
  id: 'pres-01', korean: '보고', romanization: 'bogo', baseForm: '보고', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '汇报；报告', chineseEn: 'report; briefing', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '진행 상황을 보고드리겠습니다.', chinese: '我来汇报一下进展情况。', chineseEn: 'Let me report on the progress.', scene: '汇报', sceneEn: 'report' },
    { korean: '보고는 이상입니다.', chinese: '汇报到此结束。', chineseEn: 'That concludes the report.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '商务'], emotionTags: [], relatedWords: ['pres-02', 'pres-03'],
},
{
  id: 'pres-02', korean: '보고하다', romanization: 'bogohada', baseForm: '보고하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '4', frequency: 3,
  meanings: [{ chinese: '汇报；报告', chineseEn: 'report; briefing', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '결과를 팀장님께 보고했습니다.', chinese: '把结果向组长汇报了。', chineseEn: 'I reported the results to the team leader.', scene: '汇报', sceneEn: 'report' },
    { korean: '실적을 보고하겠습니다.', chinese: '我来汇报业绩。', chineseEn: 'I\'ll report on the performance.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '商务'], emotionTags: [], relatedWords: ['pres-01'],
},
{
  id: 'pres-03', korean: '발표', romanization: 'balpyo', baseForm: '발표', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '演示；发表', chineseEn: 'presentation', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '지금부터 발표를 시작하겠습니다.', chinese: '现在开始演示。', chineseEn: 'Let\'s start the presentation now.', scene: '汇报', sceneEn: 'report' },
    { korean: '발표 준비는 다 끝났습니다.', chinese: '演示准备都完成了。', chineseEn: 'All the presentation preparations are done.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-04'],
},
{
  id: 'pres-04', korean: '발표자', romanization: 'balpyoja', baseForm: '발표자', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '演示者；发言人', chineseEn: 'presenter; speaker', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '오늘 발표자는 저입니다.', chinese: '今天的演示者是我。', chineseEn: 'I\'m today\'s presenter.', scene: '汇报', sceneEn: 'report' },
    { korean: '다음 발표자를 소개하겠습니다.', chinese: '介绍下一位发言人。', chineseEn: 'Let me introduce the next speaker.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-03'],
},
{
  id: 'pres-05', korean: '자료', romanization: 'jaryo', baseForm: '자료', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '资料；材料', chineseEn: 'materials; documents', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '자료를 화면에 띄우겠습니다.', chinese: '我把资料投到屏幕上。', chineseEn: 'I\'ll project the materials onto the screen.', scene: '汇报', sceneEn: 'report' },
    { korean: '자료는 이메일로 공유드렸습니다.', chinese: '资料已用邮件分享给大家。', chineseEn: 'The materials have been shared with everyone via email.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-06'],
},
{
  id: 'pres-06', korean: '슬라이드', romanization: 'seullaideu', baseForm: '슬라이드', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '幻灯片；PPT页', chineseEn: 'slide; PPT page', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '다음 슬라이드로 넘어가겠습니다.', chinese: '翻到下一张幻灯片。', chineseEn: 'Let\'s move to the next slide.', scene: '汇报', sceneEn: 'report' },
    { korean: '이 슬라이드를 봐 주시기 바랍니다.', chinese: '请看这张幻灯片。', chineseEn: 'Please look at this slide.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-05', 'pres-07'],
},
{
  id: 'pres-07', korean: '장표', romanization: 'jangpyo', baseForm: '장표', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '（PPT）页面；图表页', chineseEn: '(PPT) page; chart page', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '이 장표부터 설명드리겠습니다.', chinese: '从这一页开始说明。', chineseEn: 'I\'ll explain starting from this page.', scene: '汇报', sceneEn: 'report' },
    { korean: '장표 순서를 조금 바꿨습니다.', chinese: '把页面顺序稍微调整了。', chineseEn: 'I slightly adjusted the order of the pages.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-06'],
},
{
  id: 'pres-08', korean: '데이터', romanization: 'deiteo', baseForm: '데이터', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '数据', chineseEn: 'Data', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '데이터를 바탕으로 설명드리겠습니다.', chinese: '基于数据来说明。', chineseEn: 'I\'ll explain based on the data.', scene: '汇报', sceneEn: 'report' },
    { korean: '데이터가 조금 오래됐습니다.', chinese: '数据有点旧了。', chineseEn: 'The data is a bit outdated.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '数据'], emotionTags: [], relatedWords: ['pres-09', 'pres-10'],
},
{
  id: 'pres-09', korean: '그래프', romanization: 'geuraepeu', baseForm: '그래프', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 2,
  meanings: [{ chinese: '图表；曲线图', chineseEn: 'chart; graph', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '이 그래프를 보시면 추세를 알 수 있습니다.', chinese: '看这张图表就能了解趋势。', chineseEn: 'You can understand the trend by looking at this chart.', scene: '汇报', sceneEn: 'report' },
    { korean: '그래프가 우상향하고 있습니다.', chinese: '图表呈上升趋势。', chineseEn: 'The chart shows an upward trend.', scene: '数据', sceneEn: 'Data' },
  ],
  tags: ['汇报', '数据'], emotionTags: [], relatedWords: ['pres-08'],
},
{
  id: 'pres-10', korean: '수치', romanization: 'suchi', baseForm: '수치', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '数值；数字', chineseEn: 'value; number', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '구체적인 수치로 말씀드리겠습니다.', chinese: '我用具体数值来说明。', chineseEn: 'I\'ll explain with specific numbers.', scene: '数据', sceneEn: 'Data' },
    { korean: '수치가 전분기보다 올랐습니다.', chinese: '数值比上一季度上升了。', chineseEn: 'The numbers have risen compared to last quarter.', scene: '数据', sceneEn: 'Data' },
  ],
  tags: ['汇报', '数据'], emotionTags: [], relatedWords: ['pres-08', 'pres-11'],
},
{
  id: 'pres-11', korean: '증가', romanization: 'jeungga', baseForm: '증가', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '增加；增长', chineseEn: 'increase; grow', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '매출이 20% 증가했습니다.', chinese: '销售额增长了20%。', chineseEn: 'Sales increased by 20%.', scene: '数据', sceneEn: 'Data' },
    { korean: '전년 대비 증가 추세입니다.', chinese: '同比呈增长趋势。', chineseEn: 'It shows an upward trend year-over-year.', scene: '数据', sceneEn: 'Data' },
  ],
  tags: ['汇报', '数据'], emotionTags: [], relatedWords: ['pres-12'],
},
{
  id: 'pres-12', korean: '감소', romanization: 'gamso', baseForm: '감소', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '减少；下降', chineseEn: 'decrease; decline', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '비용이 10% 감소했습니다.', chinese: '成本下降了10%。', chineseEn: 'Costs dropped by 10%.', scene: '数据', sceneEn: 'Data' },
    { korean: '이용자 수가 감소하고 있습니다.', chinese: '用户数在减少。', chineseEn: 'The number of users is decreasing.', scene: '数据', sceneEn: 'Data' },
  ],
  tags: ['汇报', '数据'], emotionTags: [], relatedWords: ['pres-11'],
},
{
  id: 'pres-13', korean: '추세', romanization: 'chuse', baseForm: '추세', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '趋势；走向', chineseEn: 'trend; direction', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '전체적인 추세를 말씀드리겠습니다.', chinese: '我来说明整体趋势。', chineseEn: 'Let me explain the overall trend.', scene: '数据', sceneEn: 'Data' },
    { korean: '상승 추세가 이어지고 있습니다.', chinese: '上升趋势正在延续。', chineseEn: 'The upward trend is continuing.', scene: '数据', sceneEn: 'Data' },
  ],
  tags: ['汇报', '数据'], emotionTags: [], relatedWords: ['pres-09'],
},
{
  id: 'pres-14', korean: '비율', romanization: 'biyul', baseForm: '비율', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '比例；比率', chineseEn: 'ratio; proportion', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '재구매 비율이 높습니다.', chinese: '复购比例很高。', chineseEn: 'The repeat purchase rate is high.', scene: '数据', sceneEn: 'Data' },
    { korean: '비율로 보면 이해가 쉽습니다.', chinese: '用比例来看更容易理解。', chineseEn: 'It\'s easier to understand when viewed as a ratio.', scene: '数据', sceneEn: 'Data' },
  ],
  tags: ['汇报', '数据'], emotionTags: [], relatedWords: ['pres-10'],
},
{
  id: 'pres-15', korean: '요약', romanization: 'yoyak', baseForm: '요약', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '总结；概要', chineseEn: 'summary; overview', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '핵심만 요약해서 말씀드리겠습니다.', chinese: '我只把要点总结一下。', chineseEn: 'Let me just summarize the key points.', scene: '汇报', sceneEn: 'report' },
    { korean: '마지막으로 요약하겠습니다.', chinese: '最后做个总结。', chineseEn: 'Let\'s wrap up with a summary.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '结构'], emotionTags: [], relatedWords: ['pres-16'],
},
{
  id: 'pres-16', korean: '결론', romanization: 'gyeollon', baseForm: '결론', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '结论', chineseEn: 'Conclusion', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '결론부터 말씀드리겠습니다.', chinese: '我先说结论。', chineseEn: 'Let me start with the conclusion.', scene: '汇报', sceneEn: 'report' },
    { korean: '결론적으로 도입을 권장합니다.', chinese: '结论是建议引入。', chineseEn: 'The conclusion is to recommend adoption.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '结构'], emotionTags: [], relatedWords: ['pres-15', 'pres-17'],
},
{
  id: 'pres-17', korean: '핵심', romanization: 'haeksim', baseForm: '핵심', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '核心；重点', chineseEn: 'core; key point', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '핵심 내용은 세 가지입니다.', chinese: '核心内容有三点。', chineseEn: 'There are three core points.', scene: '汇报', sceneEn: 'report' },
    { korean: '핵심만 짚고 넘어가겠습니다.', chinese: '只点一下重点就过去。', chineseEn: 'I\'ll just touch on the key points and move on.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '结构'], emotionTags: [], relatedWords: ['pres-16'],
},
{
  id: 'pres-18', korean: '질의응답', romanization: 'jiruieungdap', baseForm: '질의응답', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '问答；答疑', chineseEn: 'Q&A; Q&A session', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '이제 질의응답 시간을 갖겠습니다.', chinese: '现在进入问答环节。', chineseEn: 'Now let\'s move to the Q&A session.', scene: '汇报', sceneEn: 'report' },
    { korean: '질의응답은 발표 후에 진행하겠습니다.', chinese: '问答在演示后进行。', chineseEn: 'The Q&A will follow the presentation.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '问答'], emotionTags: [], relatedWords: ['pres-19', 'pres-20'],
},
{
  id: 'pres-19', korean: '질문', romanization: 'jilmun', baseForm: '질문', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '2', frequency: 3,
  meanings: [{ chinese: '提问；问题', chineseEn: 'Question', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '질문 있으시면 말씀해 주세요.', chinese: '有问题请提出来。', chineseEn: 'Please raise any questions.', scene: '问答', sceneEn: 'Q&A' },
    { korean: '좋은 질문 감사합니다.', chinese: '感谢您的好问题。', chineseEn: 'Thank you for the great question.', scene: '问答', sceneEn: 'Q&A' },
  ],
  tags: ['汇报', '问答'], emotionTags: [], relatedWords: ['pres-18'],
},
{
  id: 'pres-20', korean: '답변', romanization: 'dapbyeon', baseForm: '답변', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '答复；回答', chineseEn: 'reply; answer', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '답변드리겠습니다.', chinese: '我来回答。', chineseEn: 'Let me answer.', scene: '问答', sceneEn: 'Q&A' },
    { korean: '그 부분은 확인 후 답변드리겠습니다.', chinese: '那部分我确认后再答复。', chineseEn: 'I\'ll confirm that part and get back to you.', scene: '问答', sceneEn: 'Q&A' },
  ],
  tags: ['汇报', '问答'], emotionTags: [], relatedWords: ['pres-19'],
},
{
  id: 'pres-21', korean: '설명하다', romanization: 'seolmyeonghada', baseForm: '설명하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 3,
  meanings: [{ chinese: '说明；解释', chineseEn: 'explanation; clarification', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '자세히 설명드리겠습니다.', chinese: '我来详细说明。', chineseEn: 'Let me explain in detail.', scene: '汇报', sceneEn: 'report' },
    { korean: '한 가지만 더 설명드리겠습니다.', chinese: '再补充说明一点。', chineseEn: 'Let me add one more point.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-22'],
},
{
  id: 'pres-22', korean: '강조하다', romanization: 'gangjohada', baseForm: '강조하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '4', frequency: 2,
  meanings: [{ chinese: '强调', chineseEn: 'emphasize', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '이 점을 특히 강조드리고 싶습니다.', chinese: '我尤其想强调这一点。', chineseEn: 'I especially want to emphasize this point.', scene: '汇报', sceneEn: 'report' },
    { korean: '다시 한번 강조하겠습니다.', chinese: '我再强调一遍。', chineseEn: 'Let me emphasize this again.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-21'],
},
{
  id: 'pres-23', korean: '지표', romanization: 'jipyo', baseForm: '지표', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '指标', chineseEn: 'indicator; metric', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '주요 지표를 말씀드리겠습니다.', chinese: '我来说明主要指标。', chineseEn: 'Let me explain the key indicators.', scene: '数据', sceneEn: 'Data' },
    { korean: '이 지표가 가장 중요합니다.', chinese: '这个指标最重要。', chineseEn: 'This metric is the most important.', scene: '数据', sceneEn: 'Data' },
  ],
  tags: ['汇报', '数据'], emotionTags: [], relatedWords: ['pres-10', 'pres-24'],
},
{
  id: 'pres-24', korean: '실적', romanization: 'siljeok', baseForm: '실적', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '业绩；实绩', chineseEn: 'performance; results', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '이번 분기 실적을 공유드립니다.', chinese: '分享本季度业绩。', chineseEn: 'Let\'s share this quarter\'s results.', scene: '汇报', sceneEn: 'report' },
    { korean: '실적이 목표를 초과했습니다.', chinese: '业绩超过了目标。', chineseEn: 'Performance exceeded the target.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '数据'], emotionTags: [], relatedWords: ['pres-23'],
},
{
  id: 'pres-25', korean: '목표', romanization: 'mokpyo', baseForm: '목표', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '目标', chineseEn: 'Goal', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '올해 목표를 초과 달성했습니다.', chinese: '超额完成了今年目标。', chineseEn: 'We exceeded this year\'s goal.', scene: '汇报', sceneEn: 'report' },
    { korean: '내년 목표를 설정하겠습니다.', chinese: '我们来设定明年目标。', chineseEn: 'Let\'s set next year\'s goals.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '数据'], emotionTags: [], relatedWords: ['pres-24'],
},
{
  id: 'pres-26', korean: '분기', romanization: 'bungi', baseForm: '분기', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '季度', chineseEn: 'quarter', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '3분기 매출이 가장 높았습니다.', chinese: '第三季度销售额最高。', chineseEn: 'Sales were highest in Q3.', scene: '数据', sceneEn: 'Data' },
    { korean: '다음 분기 계획을 말씀드립니다.', chinese: '我来说明下季度计划。', chineseEn: 'Let me explain next quarter\'s plan.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '数据'], emotionTags: [], relatedWords: ['pres-24'],
},
{
  id: 'pres-27', korean: '전년 대비', romanization: 'jeonnyeon daebi', baseForm: '전년 대비', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 2,
  meanings: [{ chinese: '同比；与去年相比', chineseEn: 'year-over-year; compared to last year', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '전년 대비 15% 성장했습니다.', chinese: '同比增长了15%。', chineseEn: 'It grew 15% year-over-year.', scene: '数据', sceneEn: 'Data' },
    { korean: '전년 대비 큰 변화는 없습니다.', chinese: '同比没有大的变化。', chineseEn: 'No major change year-over-year.', scene: '数据', sceneEn: 'Data' },
  ],
  tags: ['汇报', '数据'], emotionTags: [], relatedWords: ['pres-11'],
},
{
  id: 'pres-28', korean: '첨부', romanization: 'cheombu', baseForm: '첨부', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '附件；添加附件', chineseEn: 'attachment; attach file', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '자세한 내용은 첨부 자료를 참고해 주세요.', chinese: '详细内容请参考附件资料。', chineseEn: 'Please refer to the attached materials for details.', scene: '汇报', sceneEn: 'report' },
    { korean: '보고서를 첨부해 드리겠습니다.', chinese: '我把报告书作为附件发给您。', chineseEn: 'I\'ll send you the report as an attachment.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-05'],
},
{
  id: 'pres-29', korean: '참고', romanization: 'chamgo', baseForm: '참고', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '参考', chineseEn: 'Reference', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '참고로 말씀드리면 예산은 넉넉합니다.', chinese: '顺便说一下，预算很充足。', chineseEn: 'By the way, the budget is sufficient.', scene: '汇报', sceneEn: 'report' },
    { korean: '이 자료를 참고해 주시기 바랍니다.', chinese: '请参考这份资料。', chineseEn: 'Please refer to this material.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-28'],
},
{
  id: 'pres-30', korean: '발언권', romanization: 'baleon-gwon', baseForm: '발언권', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '发言权', chineseEn: 'Right to speak', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '발언권을 드리겠습니다.', chinese: '把发言权交给您。', chineseEn: 'I\'ll give you the floor.', scene: '汇报', sceneEn: 'report' },
    { korean: '잠시 발언권을 얻어도 될까요?', chinese: '可以请求发言吗？', chineseEn: 'May I request to speak?', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '问答'], emotionTags: [], relatedWords: ['pres-19'],
},
{
  id: 'pres-31', korean: '이해가 되다', romanization: 'ihaega doeda', baseForm: '이해가 되다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [{ chinese: '能理解；讲得通', chineseEn: 'Makes sense', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '여기까지 이해가 되셨나요?', chinese: '到这里能理解吗？', chineseEn: 'Do you understand up to here?', scene: '汇报', sceneEn: 'report' },
    { korean: '이해가 안 되시면 다시 설명드리겠습니다.', chinese: '如果不理解我再说明。', chineseEn: 'If you don\'t understand, I\'ll explain again.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '问答'], emotionTags: [], relatedWords: ['pres-21'],
},
{
  id: 'pres-32', korean: '보충 설명', romanization: 'bochung seolmyeong', baseForm: '보충 설명', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 1,
  meanings: [{ chinese: '补充说明', chineseEn: 'Supplementary explanation', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '한 가지 보충 설명을 드리겠습니다.', chinese: '我做一点补充说明。', chineseEn: 'Let me add a brief supplementary explanation.', scene: '汇报', sceneEn: 'report' },
    { korean: '보충 설명이 필요하시면 말씀해 주세요.', chinese: '需要补充说明请告诉我。', chineseEn: 'Let me know if you need further clarification.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-21'],
},
{
  id: 'pres-33', korean: '발표 자료', romanization: 'balpyo jaryo', baseForm: '발표 자료', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 3,
  meanings: [{ chinese: '演示资料；汇报材料', chineseEn: 'Presentation materials', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '발표 자료는 미리 배포해 드렸습니다.', chinese: '演示资料已提前分发。', chineseEn: 'The presentation materials were distributed in advance.', scene: '汇报', sceneEn: 'report' },
    { korean: '발표 자료 마지막 장을 봐 주세요.', chinese: '请看演示资料的最后一页。', chineseEn: 'Please look at the last page of the presentation materials.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-05', 'pres-06'],
},
{
  id: 'pres-34', korean: '리허설', romanization: 'riheoseol', baseForm: '리허설', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 1,
  meanings: [{ chinese: '彩排；预演', chineseEn: 'Rehearsal', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '발표 전에 리허설을 했습니다.', chinese: '演示前做了彩排。', chineseEn: 'We had a rehearsal before the presentation.', scene: '汇报', sceneEn: 'report' },
    { korean: '리허설 때 시간을 재 봤습니다.', chinese: '彩排时计了时。', chineseEn: 'We timed it during the rehearsal.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-03'],
},
{
  id: 'pres-35', korean: '발표 시간', romanization: 'balpyo sigan', baseForm: '발표 시간', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '3', frequency: 2,
  meanings: [{ chinese: '演示时间；汇报时长', chineseEn: 'Presentation time', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '발표 시간은 10분입니다.', chinese: '演示时间是10分钟。', chineseEn: 'The presentation is 10 minutes long.', scene: '汇报', sceneEn: 'report' },
    { korean: '발표 시간을 넘기지 않겠습니다.', chinese: '我不会超时。', chineseEn: 'I won\'t go over time.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-03'],
},
{
  id: 'pres-36', korean: '긴장되다', romanization: 'ginjangdoeda', baseForm: '긴장되다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 2,
  meanings: [{ chinese: '紧张', chineseEn: 'nervous', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '발표 앞두고 조금 긴장됩니다.', chinese: '演示前有点紧张。', chineseEn: 'I was a bit nervous before the presentation.', scene: '汇报', sceneEn: 'report' },
    { korean: '긴장돼서 목소리가 떨렸어요.', chinese: '紧张得声音发抖。', chineseEn: 'My voice was trembling from nervousness.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '状态'], emotionTags: ['紧张'], relatedWords: ['pres-03'],
},
{
  id: 'pres-37', korean: '피드백', romanization: 'pideubaek', baseForm: '피드백', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '反馈；意见', chineseEn: 'Feedback', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '피드백 주시면 반영하겠습니다.', chinese: '给我反馈的话我会采纳。', chineseEn: 'I\'ll take your feedback into account.', scene: '汇报', sceneEn: 'report' },
    { korean: '좋은 피드백 감사합니다.', chinese: '感谢您的宝贵反馈。', chineseEn: 'Thank you for your valuable feedback.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '问答'], emotionTags: [], relatedWords: ['pres-20'],
},
{
  id: 'pres-38', korean: '보고서', romanization: 'bogoseo', baseForm: '보고서', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '报告书', chineseEn: 'Report', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '보고서를 오늘 안에 제출하겠습니다.', chinese: '我今天内提交报告书。', chineseEn: 'I will submit the report by today.', scene: '汇报', sceneEn: 'report' },
    { korean: '보고서 초안이 완성됐습니다.', chinese: '报告书初稿完成了。', chineseEn: 'The first draft of the report is done.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '演示'], emotionTags: [], relatedWords: ['pres-01'],
},
{
  id: 'pres-39', korean: '마무리하다', romanization: 'mamurihada', baseForm: '마무리하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '4', frequency: 2,
  meanings: [{ chinese: '收尾；总结结束', chineseEn: 'Wrap-up; concluding', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '이것으로 발표를 마무리하겠습니다.', chinese: '演示到此结束。', chineseEn: 'That concludes the presentation.', scene: '汇报', sceneEn: 'report' },
    { korean: '마지막으로 마무리 말씀을 드리겠습니다.', chinese: '最后说几句收尾。', chineseEn: 'Let me wrap up with a few final words.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '结构'], emotionTags: [], relatedWords: ['pres-15'],
},
{
  id: 'pres-40', korean: '경청', romanization: 'gyeongcheong', baseForm: '경청', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 1,
  meanings: [{ chinese: '倾听；聆听', chineseEn: 'Listen; hear out', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '경청해 주셔서 감사합니다.', chinese: '感谢各位的聆听。', chineseEn: 'Thank you for listening.', scene: '汇报', sceneEn: 'report' },
    { korean: '끝까지 경청해 주셨습니다.', chinese: '大家一直聆听到最后。', chineseEn: 'Everyone listened until the very end.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '礼仪'], emotionTags: [], relatedWords: ['pres-39'],
},
{
  id: 'pres-41', korean: '넘어가다', romanization: 'neomeogada', baseForm: '넘어가다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 3,
  meanings: [{ chinese: '（翻页）过去；进入下一部分', chineseEn: '(Flip) past; move to the next section', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '다음 주제로 넘어가겠습니다.', chinese: '进入下一个主题。', chineseEn: 'Let\'s move on to the next topic.', scene: '汇报', sceneEn: 'report' },
    { korean: '이 부분은 넘어가겠습니다.', chinese: '这部分就跳过了。', chineseEn: 'Let\'s skip this part.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '结构'], emotionTags: [], relatedWords: ['pres-06'],
},
{
  id: 'pres-42', korean: '요약하자면', romanization: 'yoyakhajamyeon', baseForm: '요약하자면', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 2,
  meanings: [{ chinese: '总结来说；概括而言', chineseEn: 'In summary; overall', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '요약하자면 세 가지 결론입니다.', chinese: '总结来说是三个结论。', chineseEn: 'In summary, there are three conclusions.', scene: '汇报', sceneEn: 'report' },
    { korean: '요약하자면 도입할 가치가 있습니다.', chinese: '总结来说值得引入。', chineseEn: 'Overall, it\'s worth introducing.', scene: '汇报', sceneEn: 'report' },
  ],
  tags: ['汇报', '结构'], emotionTags: [], relatedWords: ['pres-15', 'pres-16'],
},

// ─── theme-client 客户/甲方沟通 (client-) ───
{
  id: 'client-01', korean: '클라이언트', romanization: 'keullaieonteu', baseForm: '클라이언트', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '客户；甲方', chineseEn: 'Client; customer', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '클라이언트와 미팅이 잡혔습니다.', chinese: '和客户约好了会议。', chineseEn: 'I scheduled a meeting with the client.', scene: '客户', sceneEn: 'Client' },
    { korean: '클라이언트가 만족하셨습니다.', chinese: '客户很满意。', chineseEn: 'The client is very satisfied.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '商务'], emotionTags: [], relatedWords: ['client-02', 'client-03'],
},
{
  id: 'client-02', korean: '거래처', romanization: 'georaecheo', baseForm: '거래처', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '客户单位；合作方', chineseEn: 'Partner organization; collaborator', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '오래된 거래처입니다.', chinese: '是长期合作方。', chineseEn: 'They\'re a long-term partner.', scene: '客户', sceneEn: 'Client' },
    { korean: '거래처에 연락드리겠습니다.', chinese: '我会联系合作方。', chineseEn: 'I\'ll contact the partner.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '商务'], emotionTags: [], relatedWords: ['client-01'],
},
{
  id: 'client-03', korean: '담당자', romanization: 'damdangja', baseForm: '담당자', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '负责人；经办人', chineseEn: 'Person in charge; handler', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '담당자분과 통화하고 싶습니다.', chinese: '想和负责人通话。', chineseEn: 'I\'d like to speak with the person in charge.', scene: '客户', sceneEn: 'Client' },
    { korean: '제가 이 건의 담당자입니다.', chinese: '这件事由我负责。', chineseEn: 'I\'m in charge of this.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '商务'], emotionTags: [], relatedWords: ['client-04'],
},
{
  id: 'client-04', korean: '요구사항', romanization: 'yogusahang', baseForm: '요구사항', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 3,
  meanings: [{ chinese: '需求；要求事项', chineseEn: 'Requirements; demands', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '요구사항을 정리해서 보내 주시겠어요?', chinese: '能把需求整理后发给我吗？', chineseEn: 'Can you organize the requirements and send them to me?', scene: '客户', sceneEn: 'Client' },
    { korean: '요구사항이 조금 바뀌었습니다.', chinese: '需求稍微变了。', chineseEn: 'The requirements have changed a bit.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '需求'], emotionTags: [], relatedWords: ['client-05', 'client-06'],
},
{
  id: 'client-05', korean: '요청', romanization: 'yocheong', baseForm: '요청', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '请求；委托', chineseEn: 'request; commission', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '요청 주신 자료를 보내 드립니다.', chinese: '发送您所请求的资料。', chineseEn: 'Sending the materials you requested.', scene: '客户', sceneEn: 'Client' },
    { korean: '추가 요청이 있으시면 말씀해 주세요.', chinese: '有额外请求请告诉我。', chineseEn: 'Let me know if you have any additional requests.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '需求'], emotionTags: [], relatedWords: ['client-04'],
},
{
  id: 'client-06', korean: '요청하다', romanization: 'yocheonghada', baseForm: '요청하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '4', frequency: 3,
  meanings: [{ chinese: '请求；要求', chineseEn: 'request; demand', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '수정을 요청하셨습니다.', chinese: '（客户）要求了修改。', chineseEn: 'The client requested revisions.', scene: '客户', sceneEn: 'Client' },
    { korean: '자료를 다시 요청드립니다.', chinese: '再次向您索要资料。', chineseEn: 'Requesting the materials from you again.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '需求'], emotionTags: [], relatedWords: ['client-05'],
},
{
  id: 'client-07', korean: '피드백', romanization: 'pideubaek', baseForm: '피드백', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '反馈；意见', chineseEn: 'Feedback', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '피드백 주셔서 감사합니다.', chinese: '感谢您的反馈。', chineseEn: 'Thank you for your feedback.', scene: '客户', sceneEn: 'Client' },
    { korean: '피드백을 최대한 반영하겠습니다.', chinese: '我们会尽量采纳反馈。', chineseEn: 'We\'ll try to incorporate the feedback.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '需求'], emotionTags: [], relatedWords: ['client-08'],
},
{
  id: 'client-08', korean: '반영하다', romanization: 'banyeonghada', baseForm: '반영하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '5', frequency: 3,
  meanings: [{ chinese: '采纳；反映（到成果中）', chineseEn: 'adopt; reflect (in the outcome)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '의견을 다음 버전에 반영하겠습니다.', chinese: '意见会体现在下一版本。', chineseEn: 'Your opinions will be reflected in the next version.', scene: '客户', sceneEn: 'Client' },
    { korean: '요청사항을 반영했습니다.', chinese: '已采纳了要求事项。', chineseEn: 'The requested items have been adopted.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '需求'], emotionTags: [], relatedWords: ['client-07'],
},
{
  id: 'client-09', korean: '일정', romanization: 'iljeong', baseForm: '일정', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '日程；进度安排', chineseEn: 'schedule; timeline', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '일정을 다시 잡아야 할 것 같습니다.', chinese: '看来得重新安排日程。', chineseEn: 'Looks like we\'ll need to reschedule.', scene: '客户', sceneEn: 'Client' },
    { korean: '일정에 맞춰 진행하겠습니다.', chinese: '会按日程推进。', chineseEn: 'We\'ll proceed according to the schedule.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '日程'], emotionTags: [], relatedWords: ['client-10', 'client-11'],
},
{
  id: 'client-10', korean: '일정 조율', romanization: 'iljeong joyul', baseForm: '일정 조율', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 3,
  meanings: [{ chinese: '日程协调', chineseEn: 'Schedule coordination', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '일정 조율이 필요합니다.', chinese: '需要协调日程。', chineseEn: 'We need to coordinate the schedule.', scene: '客户', sceneEn: 'Client' },
    { korean: '일정 조율은 이메일로 부탁드립니다.', chinese: '日程协调请通过邮件进行。', chineseEn: 'Please coordinate the schedule via email.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '日程'], emotionTags: [], relatedWords: ['client-09'],
},
{
  id: 'client-11', korean: '마감일', romanization: 'magamil', baseForm: '마감일', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '截止日；交稿日', chineseEn: 'deadline; submission date', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '마감일을 지키겠습니다.', chinese: '我们会遵守截止日。', chineseEn: 'We\'ll meet the deadline.', scene: '客户', sceneEn: 'Client' },
    { korean: '마감일을 이틀만 늦춰 주실 수 있을까요?', chinese: '截止日能推迟两天吗？', chineseEn: 'Can the deadline be postponed by two days?', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '日程'], emotionTags: [], relatedWords: ['client-09'],
},
{
  id: 'client-12', korean: '납기일', romanization: 'napgiil', baseForm: '납기일', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '交货日；交付日', chineseEn: 'delivery date; handover date', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '납기일은 이달 말입니다.', chinese: '交付日是本月底。', chineseEn: 'The delivery date is the end of this month.', scene: '客户', sceneEn: 'Client' },
    { korean: '납기일을 반드시 맞추겠습니다.', chinese: '一定按交付日完成。', chineseEn: 'We\'ll definitely finish by the delivery date.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '日程'], emotionTags: [], relatedWords: ['client-11'],
},
{
  id: 'client-13', korean: '견적서', romanization: 'gyeonjeokseo', baseForm: '견적서', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '报价单', chineseEn: 'quotation', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '견적서를 보내 드리겠습니다.', chinese: '我把报价单发给您。', chineseEn: 'I\'ll send you the quotation.', scene: '客户', sceneEn: 'Client' },
    { korean: '견적서를 검토 중입니다.', chinese: '正在审阅报价单。', chineseEn: 'I\'m reviewing the quotation.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '文档'], emotionTags: [], relatedWords: ['client-14'],
},
{
  id: 'client-14', korean: '제안서', romanization: 'jeanseo', baseForm: '제안서', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '提案书；方案书', chineseEn: 'proposal', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '제안서를 첨부해 드렸습니다.', chinese: '已附上提案书。', chineseEn: 'The proposal is attached.', scene: '客户', sceneEn: 'Client' },
    { korean: '제안서 잘 받았습니다.', chinese: '提案书已收到。', chineseEn: 'The proposal has been received.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '文档'], emotionTags: [], relatedWords: ['client-13'],
},
{
  id: 'client-15', korean: '컨펌', romanization: 'keonpeom', baseForm: '컨펌', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '确认；拍板（confirm）', chineseEn: 'confirm', nuance: '口语', nuanceEn: 'Spoken language', register: '口语', registerEn: 'Spoken language' }],
  examples: [
    { korean: '클라이언트 컨펌 받았습니다.', chinese: '拿到客户确认了。', chineseEn: 'We got the client\'s confirmation.', scene: '客户', sceneEn: 'Client' },
    { korean: '컨펌만 주시면 바로 진행하겠습니다.', chinese: '您一确认我们就推进。', chineseEn: 'We\'ll proceed as soon as you confirm.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '流程'], emotionTags: [], relatedWords: ['client-16'],
},
{
  id: 'client-16', korean: '확정', romanization: 'hwakjeong', baseForm: '확정', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '确定；敲定', chineseEn: 'finalize', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '일정이 확정되면 알려 주세요.', chinese: '日程确定后请告诉我。', chineseEn: 'Let me know once the schedule is finalized.', scene: '客户', sceneEn: 'Client' },
    { korean: '최종안이 확정됐습니다.', chinese: '最终方案敲定了。', chineseEn: 'The final plan is set.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '流程'], emotionTags: [], relatedWords: ['client-15'],
},
{
  id: 'client-17', korean: '수정 사항', romanization: 'sujeong sahang', baseForm: '수정 사항', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 3,
  meanings: [{ chinese: '修改事项；需要改的地方', chineseEn: 'revisions', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '수정 사항을 정리해서 보내 주세요.', chinese: '请把修改事项整理后发来。', chineseEn: 'Please organize and send the revisions.', scene: '客户', sceneEn: 'Client' },
    { korean: '수정 사항은 세 가지입니다.', chinese: '修改事项有三处。', chineseEn: 'There are three revisions.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '需求'], emotionTags: [], relatedWords: ['client-08'],
},
{
  id: 'client-18', korean: '보완', romanization: 'bowan', baseForm: '보완', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '补充完善；改进', chineseEn: 'improve', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '부족한 부분을 보완하겠습니다.', chinese: '会完善不足的部分。', chineseEn: 'I\'ll improve the insufficient parts.', scene: '客户', sceneEn: 'Client' },
    { korean: '보완이 필요한 점을 알려 주세요.', chinese: '请告知需要改进的地方。', chineseEn: 'Please let me know what needs improvement.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '需求'], emotionTags: [], relatedWords: ['client-17'],
},
{
  id: 'client-19', korean: '요청드리다', romanization: 'yocheongdeurida', baseForm: '요청드리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '5', frequency: 2,
  meanings: [{ chinese: '（谦辞）请求；恳请', chineseEn: 'humbly request', nuance: '敬语', nuanceEn: 'honorifics', register: '敬语', registerEn: 'honorifics' }],
  examples: [
    { korean: '검토를 요청드립니다.', chinese: '恳请您审阅。', chineseEn: 'I kindly ask for your review.', scene: '客户', sceneEn: 'Client' },
    { korean: '확인을 한 번 더 요청드립니다.', chinese: '再次恳请您确认。', chineseEn: 'I humbly ask for your confirmation again.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '需求'], emotionTags: [], relatedWords: ['client-06'],
},
{
  id: 'client-20', korean: '전달드리다', romanization: 'jeondaldeurida', baseForm: '전달드리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '5', frequency: 2,
  meanings: [{ chinese: '（谦辞）转达；发送给您', chineseEn: 'send to you', nuance: '敬语', nuanceEn: 'honorifics', register: '敬语', registerEn: 'honorifics' }],
  examples: [
    { korean: '자료를 전달드리겠습니다.', chinese: '我把资料发给您。', chineseEn: 'I\'ll send you the materials.', scene: '客户', sceneEn: 'Client' },
    { korean: '내용을 담당자께 전달드리겠습니다.', chinese: '我会把内容转达给负责人。', chineseEn: 'I\'ll relay the details to the person in charge.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '沟通'], emotionTags: [], relatedWords: ['client-19'],
},
{
  id: 'client-21', korean: '문의', romanization: 'munui', baseForm: '문의', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 3,
  meanings: [{ chinese: '咨询；询问', chineseEn: 'inquiry', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '문의 사항이 있으면 언제든 연락 주세요.', chinese: '有咨询随时联系我。', chineseEn: 'Feel free to contact me with any inquiries.', scene: '客户', sceneEn: 'Client' },
    { korean: '문의 주셔서 감사합니다.', chinese: '感谢您的咨询。', chineseEn: 'Thank you for your inquiry.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '沟通'], emotionTags: [], relatedWords: ['client-22'],
},
{
  id: 'client-22', korean: '문의드리다', romanization: 'munuideurida', baseForm: '문의드리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '5', frequency: 2,
  meanings: [{ chinese: '（谦辞）向您咨询', chineseEn: 'To inquire with you (humble form)', nuance: '敬语', nuanceEn: 'honorifics', register: '敬语', registerEn: 'honorifics' }],
  examples: [
    { korean: '한 가지 문의드릴 것이 있습니다.', chinese: '有一件事想向您咨询。', chineseEn: 'There\'s something I\'d like to ask you about.', scene: '客户', sceneEn: 'Client' },
    { korean: '일정에 대해 문의드립니다.', chinese: '就日程向您咨询。', chineseEn: 'I\'d like to consult you about the schedule.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '沟通'], emotionTags: [], relatedWords: ['client-21'],
},
{
  id: 'client-23', korean: '회의', romanization: 'hoeui', baseForm: '회의', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '会议', chineseEn: 'meeting', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '다음 주에 회의를 잡겠습니다.', chinese: '下周约个会议。', chineseEn: 'Let\'s schedule a meeting next week.', scene: '客户', sceneEn: 'Client' },
    { korean: '회의 시간을 조율하고 싶습니다.', chinese: '想协调一下会议时间。', chineseEn: 'I\'d like to coordinate the meeting time.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '会议'], emotionTags: [], relatedWords: ['client-24'],
},
{
  id: 'client-24', korean: '미팅', romanization: 'miting', baseForm: '미팅', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '3', frequency: 3,
  meanings: [{ chinese: '会面；碰头会', chineseEn: 'Meeting; get-together', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '미팅은 화요일 오후가 어떠세요?', chinese: '会面周二下午如何？', chineseEn: 'How about Tuesday afternoon for the meeting?', scene: '客户', sceneEn: 'Client' },
    { korean: '미팅 장소는 어디로 할까요?', chinese: '会面地点定在哪里？', chineseEn: 'Where should we set the meeting location?', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '会议'], emotionTags: [], relatedWords: ['client-23'],
},
{
  id: 'client-25', korean: '회신드리다', romanization: 'hoesindeurida', baseForm: '회신드리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '5', frequency: 2,
  meanings: [{ chinese: '（谦辞）回复您', chineseEn: 'To reply to you (humble form)', nuance: '敬语', nuanceEn: 'honorifics', register: '敬语', registerEn: 'honorifics' }],
  examples: [
    { korean: '확인 후 회신드리겠습니다.', chinese: '确认后回复您。', chineseEn: 'I\'ll get back to you after confirming.', scene: '客户', sceneEn: 'Client' },
    { korean: '늦게 회신드려 죄송합니다.', chinese: '回复晚了，抱歉。', chineseEn: 'Sorry for the late reply.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '沟通'], emotionTags: [], relatedWords: ['client-20'],
},
{
  id: 'client-26', korean: '확인 부탁드리다', romanization: 'hwagin butakdeurida', baseForm: '확인 부탁드리다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 3,
  meanings: [{ chinese: '（谦辞）麻烦您确认', chineseEn: 'To ask you to confirm (humble form)', nuance: '敬语', nuanceEn: 'honorifics', register: '敬语', registerEn: 'honorifics' }],
  examples: [
    { korean: '첨부 파일 확인 부탁드립니다.', chinese: '麻烦您确认附件。', chineseEn: 'Please confirm the attachment.', scene: '客户', sceneEn: 'Client' },
    { korean: '가능 여부 확인 부탁드립니다.', chinese: '麻烦确认是否可行。', chineseEn: 'Please confirm if it\'s feasible.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '沟通'], emotionTags: [], relatedWords: ['client-19'],
},
{
  id: 'client-27', korean: '진행 상황', romanization: 'jinhaeng sanghwang', baseForm: '진행 상황', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '4', frequency: 3,
  meanings: [{ chinese: '进展情况；进度', chineseEn: 'Progress; status', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '진행 상황을 공유드리겠습니다.', chinese: '我来分享进展情况。', chineseEn: 'I\'ll share the progress.', scene: '客户', sceneEn: 'Client' },
    { korean: '진행 상황이 궁금합니다.', chinese: '想了解一下进度。', chineseEn: 'I\'d like to check on the progress.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '流程'], emotionTags: [], relatedWords: ['client-28'],
},
{
  id: 'client-28', korean: '진행하다', romanization: 'jinhaenghada', baseForm: '진행하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 3,
  meanings: [{ chinese: '推进；进行', chineseEn: 'To proceed; to carry out', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '말씀하신 대로 진행하겠습니다.', chinese: '按您说的推进。', chineseEn: 'I\'ll proceed as you\'ve said.', scene: '客户', sceneEn: 'Client' },
    { korean: '다음 단계를 진행해도 될까요?', chinese: '可以进入下一步吗？', chineseEn: 'Can we move on to the next step?', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '流程'], emotionTags: [], relatedWords: ['client-27'],
},
{
  id: 'client-29', korean: '가능 여부', romanization: 'ganeung yeobu', baseForm: '가능 여부', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 2,
  meanings: [{ chinese: '是否可行', chineseEn: 'Whether it\'s feasible', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '가능 여부를 알려 주시면 감사하겠습니다.', chinese: '若能告知是否可行将不胜感激。', chineseEn: 'I\'d appreciate it if you could let me know if it\'s feasible.', scene: '客户', sceneEn: 'Client' },
    { korean: '내부적으로 가능 여부를 확인하겠습니다.', chinese: '我们内部确认是否可行。', chineseEn: 'We\'ll confirm internally if it\'s feasible.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '沟通'], emotionTags: [], relatedWords: ['client-26'],
},
{
  id: 'client-30', korean: '추가 비용', romanization: 'chuga biyong', baseForm: '추가 비용', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '4', frequency: 2,
  meanings: [{ chinese: '额外费用；追加成本', chineseEn: 'Additional cost; extra expense', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '추가 비용이 발생할 수 있습니다.', chinese: '可能会产生额外费用。', chineseEn: 'There may be additional costs.', scene: '客户', sceneEn: 'Client' },
    { korean: '추가 비용은 별도로 청구됩니다.', chinese: '额外费用另行收取。', chineseEn: 'Additional fees will be charged separately.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '费用'], emotionTags: [], relatedWords: ['client-31'],
},
{
  id: 'client-31', korean: '범위', romanization: 'beomwi', baseForm: '범위', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '范围；界限', chineseEn: 'Scope; boundary', nuance: '书面', nuanceEn: 'Written', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '작업 범위를 명확히 하고 싶습니다.', chinese: '想明确一下作业范围。', chineseEn: 'I\'d like to clarify the scope of the work.', scene: '客户', sceneEn: 'Client' },
    { korean: '그건 계약 범위 밖입니다.', chinese: '那超出合同范围了。', chineseEn: 'That\'s beyond the scope of the contract.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '费用'], emotionTags: [], relatedWords: ['client-30'],
},
{
  id: 'client-32', korean: '만족하다', romanization: 'manjokhada', baseForm: '만족하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '3', frequency: 2,
  meanings: [{ chinese: '满意', chineseEn: 'Satisfied', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '결과에 만족하셨습니다.', chinese: '（客户）对结果很满意。', chineseEn: 'The client is very satisfied with the results.', scene: '客户', sceneEn: 'Client' },
    { korean: '만족하실 때까지 수정하겠습니다.', chinese: '会修改到您满意为止。', chineseEn: 'We\'ll revise it until you\'re satisfied.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '状态'], emotionTags: [], relatedWords: ['client-33'],
},
{
  id: 'client-33', korean: '불만', romanization: 'bulman', baseForm: '불만', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '4', frequency: 2,
  meanings: [{ chinese: '不满；意见', chineseEn: 'Dissatisfaction; complaint', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
  examples: [
    { korean: '고객 불만이 접수되었습니다.', chinese: '收到了客户投诉。', chineseEn: 'We received a client complaint.', scene: '客户', sceneEn: 'Client' },
    { korean: '불만 사항을 신속히 처리하겠습니다.', chinese: '会迅速处理不满事项。', chineseEn: 'We\'ll promptly address the complaints.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '状态'], emotionTags: [], relatedWords: ['client-32'],
},
{
  id: 'client-34', korean: '사과드리다', romanization: 'sagwadeurida', baseForm: '사과드리다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '5', frequency: 2,
  meanings: [{ chinese: '（谦辞）向您道歉', chineseEn: '(Humble) Apologize to you', nuance: '敬语', nuanceEn: 'honorifics', register: '敬语', registerEn: 'honorifics' }],
  examples: [
    { korean: '불편을 드려 사과드립니다.', chinese: '给您添麻烦，向您道歉。', chineseEn: 'I apologize for the trouble caused.', scene: '客户', sceneEn: 'Client' },
    { korean: '지연에 대해 사과드립니다.', chinese: '就延误向您致歉。', chineseEn: 'I apologize for the delay.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '沟通'], emotionTags: ['道歉'], relatedWords: ['client-33'],
},
{
  id: 'client-35', korean: '양해', romanization: 'yanghae', baseForm: '양해', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '5', frequency: 2,
  meanings: [{ chinese: '谅解；体谅', chineseEn: 'Understanding; consideration', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '양해 부탁드립니다.', chinese: '恳请您谅解。', chineseEn: 'I kindly ask for your understanding.', scene: '客户', sceneEn: 'Client' },
    { korean: '양해해 주셔서 감사합니다.', chinese: '感谢您的谅解。', chineseEn: 'Thank you for your understanding.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '沟通'], emotionTags: [], relatedWords: ['client-34'],
},
{
  id: 'client-36', korean: '납득하다', romanization: 'napdeukhada', baseForm: '납득하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
  level: '5', frequency: 1,
  meanings: [{ chinese: '认可；接受（理解）', chineseEn: 'Acceptance; acknowledgment', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '고객이 설명을 납득하셨습니다.', chinese: '客户接受了说明。', chineseEn: 'The client accepted the explanation.', scene: '客户', sceneEn: 'Client' },
    { korean: '납득이 안 되시는 부분을 말씀해 주세요.', chinese: '请说说您无法接受的地方。', chineseEn: 'Please tell us what you can\'t accept.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '沟通'], emotionTags: [], relatedWords: ['client-35'],
},
{
  id: 'client-37', korean: '기대에 부응하다', romanization: 'gidaee bueunghada', baseForm: '기대에 부응하다', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '6', frequency: 1,
  meanings: [{ chinese: '不辜负期待；达到期望', chineseEn: 'Meet expectations; live up to expectations', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '기대에 부응하도록 노력하겠습니다.', chinese: '会努力不辜负您的期待。', chineseEn: 'We\'ll strive to meet your expectations.', scene: '客户', sceneEn: 'Client' },
    { korean: '고객의 기대에 부응했습니다.', chinese: '达到了客户的期望。', chineseEn: 'We met the client\'s expectations.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '沟通'], emotionTags: [], relatedWords: ['client-32'],
},
{
  id: 'client-38', korean: '중간 보고', romanization: 'junggan bogo', baseForm: '중간 보고', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 2,
  meanings: [{ chinese: '中期汇报；阶段性报告', chineseEn: 'Interim report; progress report', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '중간 보고를 드리겠습니다.', chinese: '我来做中期汇报。', chineseEn: 'I\'ll give the interim report.', scene: '客户', sceneEn: 'Client' },
    { korean: '중간 보고는 매주 금요일에 드리겠습니다.', chinese: '每周五做中期汇报。', chineseEn: 'We give interim reports every Friday.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '流程'], emotionTags: [], relatedWords: ['client-27'],
},
{
  id: 'client-39', korean: '요구사항 정의서', romanization: 'yogusahang jeonguiseo', baseForm: '요구사항 정의서', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '6', frequency: 1,
  meanings: [{ chinese: '需求定义书', chineseEn: 'Requirements definition document', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '요구사항 정의서를 먼저 작성하겠습니다.', chinese: '先编写需求定义书。', chineseEn: 'First, write the requirements definition document.', scene: '客户', sceneEn: 'Client' },
    { korean: '요구사항 정의서에 서명 부탁드립니다.', chinese: '请在需求定义书上签字。', chineseEn: 'Please sign the requirements definition document.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '文档'], emotionTags: [], relatedWords: ['client-04'],
},
{
  id: 'client-40', korean: '별도로', romanization: 'byeoldoro', baseForm: '별도로', partOfSpeech: '副词', partOfSpeechEn: 'Adverb',
  level: '5', frequency: 2,
  meanings: [{ chinese: '另行；单独地', chineseEn: 'separately; individually', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '자세한 내용은 별도로 안내드리겠습니다.', chinese: '详细内容将另行通知。', chineseEn: 'Details will be notified separately.', scene: '客户', sceneEn: 'Client' },
    { korean: '그 건은 별도로 논의하시죠.', chinese: '那件事我们另行讨论。', chineseEn: 'Let\'s discuss that separately.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '沟通'], emotionTags: [], relatedWords: ['client-30'],
},
{
  id: 'client-41', korean: '재차 확인', romanization: 'jaecha hwagin', baseForm: '재차 확인', partOfSpeech: '词组', partOfSpeechEn: 'Phrase',
  level: '5', frequency: 1,
  meanings: [{ chinese: '再次确认', chineseEn: 'reconfirm', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '일정을 재차 확인드립니다.', chinese: '再次向您确认日程。', chineseEn: 'Let me reconfirm the schedule with you.', scene: '客户', sceneEn: 'Client' },
    { korean: '수량을 재차 확인해 주시겠어요?', chinese: '能麻烦您再次确认数量吗？', chineseEn: 'Could you please reconfirm the quantity?', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '沟通'], emotionTags: [], relatedWords: ['client-26'],
},
{
  id: 'client-42', korean: '차질', romanization: 'chajil', baseForm: '차질', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
  level: '6', frequency: 1,
  meanings: [{ chinese: '差错；闪失（进度出问题）', chineseEn: 'mistake; slip-up (in progress)', nuance: '书面', nuanceEn: 'Written', register: '书面', registerEn: 'Written' }],
  examples: [
    { korean: '일정에 차질이 없도록 하겠습니다.', chinese: '会确保日程不出差错。', chineseEn: 'I\'ll make sure the schedule goes without a hitch.', scene: '客户', sceneEn: 'Client' },
    { korean: '차질이 생겨 죄송합니다.', chinese: '出了差错，很抱歉。', chineseEn: 'Sorry, there was a slip-up.', scene: '客户', sceneEn: 'Client' },
  ],
  tags: ['客户', '流程'], emotionTags: [], relatedWords: ['client-34'],
},
];
