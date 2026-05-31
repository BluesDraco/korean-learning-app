import type { Article } from '@/types';

const now = Date.now();

export const readingArticles: Article[] = [
  // ═══════════════════════════════════════════
  // 1. 我喜欢咖啡 (A0)
  // ═══════════════════════════════════════════
  {
    id: 'i-like-coffee',
    title: '我喜欢咖啡',
    titleKo: '저는 커피를 좋아해요',
    emoji: '☕',
    level: 'A0',
    topic: '生活',
    estimatedMinutes: 3,
    learningGoals: [
      '学会表达"我喜欢……"',
      '认识5个日常词汇',
      '读懂5个韩语短句',
    ],
    coreWords: [
      { word: '저', meaning: '我（敬语）', pronunciation: 'jeo' },
      { word: '커피', meaning: '咖啡', pronunciation: 'keo-pi' },
      { word: '좋아해요', meaning: '喜欢', pronunciation: 'jo-a-hae-yo' },
      { word: '오늘', meaning: '今天', pronunciation: 'o-neul' },
      { word: '마셔요', meaning: '喝', pronunciation: 'ma-syeo-yo' },
    ],
    grammarIds: ['gp-13'],
    sentences: [
      {
        id: 's1', ko: '안녕하세요! 저는 토리예요.', zh: '你好！我是 Tori。',
        pronunciation: 'an-nyeong-ha-se-yo! jeo-neun to-ri-ye-yo.',
        words: [
          { word: '안녕하세요', meaning: '你好' },
          { word: '저', meaning: '我' },
        ],
        grammarIds: ['gp-01'],
        difficulty: 'easy',
      },
      {
        id: 's2', ko: '저는 커피를 좋아해요.', zh: '我喜欢咖啡。',
        pronunciation: 'jeo-neun keo-pi-reul jo-a-hae-yo.',
        words: [
          { word: '커피', meaning: '咖啡' },
          { word: '좋아해요', meaning: '喜欢' },
        ],
        grammarIds: ['gp-13'],
        difficulty: 'easy',
      },
      {
        id: 's3', ko: '오늘 커피를 마셔요.', zh: '今天喝咖啡。',
        pronunciation: 'o-neul keo-pi-reul ma-syeo-yo.',
        words: [
          { word: '오늘', meaning: '今天' },
          { word: '마셔요', meaning: '喝' },
        ],
        grammarIds: ['gp-13'],
        difficulty: 'easy',
      },
      {
        id: 's4', ko: '커피가 맛있어요.', zh: '咖啡很好喝。',
        pronunciation: 'keo-pi-ga ma-si-sseo-yo.',
        words: [
          { word: '맛있어요', meaning: '好吃/好喝' },
        ],
        grammarIds: ['gp-20'],
        difficulty: 'easy',
      },
      {
        id: 's5', ko: '저는 아이스 커피도 좋아해요!', zh: '我也喜欢冰咖啡！',
        pronunciation: 'jeo-neun a-i-seu keo-pi-do jo-a-hae-yo!',
        words: [
          { word: '아이스', meaning: '冰的' },
          { word: '~도', meaning: '也' },
        ],
        grammarIds: ['gp-19'],
        difficulty: 'medium',
      },
    ],
    keySentence: {
      ko: '저는 커피를 좋아해요.',
      zh: '我喜欢咖啡。',
      grammarNote: '저는 = "我的话……"（主题），~을/를 = 宾语标记，좋아해요 = "喜欢"的礼貌现在时。整句结构：主题 + 宾语 + 动词。',
    },
    questions: [
      {
        id: 'q1', type: 'main_idea',
        prompt: '这篇文章主要讲了什么？',
        options: ['Tori 的一天', 'Tori 喜欢咖啡', '如何制作咖啡', '咖啡的种类'],
        answer: 'Tori 喜欢咖啡',
        explanation: '整篇文章都在表达 Tori 对咖啡的喜爱。',
      },
      {
        id: 'q2', type: 'vocab',
        prompt: '"맛있어요" 是什么意思？',
        options: ['很热', '很多', '好吃/好喝', '很大'],
        answer: '好吃/好喝',
        explanation: '맛있어요 是"好吃/好喝"的意思，맛 = 味道，있어요 = 有。',
      },
      {
        id: 'q3', type: 'detail',
        prompt: 'Tori 喜欢什么饮料？',
        options: ['우유 牛奶', '커피 咖啡', '주스 果汁', '물 水'],
        answer: '커피 咖啡',
        explanation: '文中多次提到 커피，Tori 特别喜欢咖啡。',
      },
    ],
    outputTask: {
      type: 'fill_blank',
      template: '저는 ___을/를 좋아해요.',
      slots: ['커피', '우유', '주스', '물', '차'],
      example: '저는 커피를 좋아해요. 我喜欢咖啡。',
    },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 2. 去便利店 (A0)
  // ═══════════════════════════════════════════
  {
    id: 'convenience-store',
    title: '去便利店',
    titleKo: '편의점에 가요',
    emoji: '🏪',
    level: 'A0',
    topic: '生活',
    estimatedMinutes: 3,
    learningGoals: [
      '认识便利店相关词汇',
      '学会看懂简单购物表达',
      '用韩语说"我买……"',
    ],
    coreWords: [
      { word: '편의점', meaning: '便利店', pronunciation: 'pyeo-nui-jeom' },
      { word: '김밥', meaning: '紫菜包饭', pronunciation: 'gim-bap' },
      { word: '라면', meaning: '拉面', pronunciation: 'ra-myeon' },
      { word: '물', meaning: '水', pronunciation: 'mul' },
      { word: '사요', meaning: '买', pronunciation: 'sa-yo' },
    ],
    grammarIds: ['gp-13'],
    sentences: [
      {
        id: 's1', ko: '오늘 편의점에 가요.', zh: '今天去便利店。',
        pronunciation: 'o-neul pyeo-nui-jeo-me ga-yo.',
        words: [
          { word: '편의점', meaning: '便利店' },
          { word: '가요', meaning: '去' },
        ],
        grammarIds: ['gp-08'],
        difficulty: 'easy',
      },
      {
        id: 's2', ko: '편의점에는 김밥이 있어요.', zh: '便利店里有紫菜包饭。',
        pronunciation: 'pyeo-nui-jeo-me-neun gim-ba-bi i-sseo-yo.',
        words: [
          { word: '김밥', meaning: '紫菜包饭' },
          { word: '있어요', meaning: '有/在' },
        ],
        grammarIds: ['gp-19', 'gp-05'],
        difficulty: 'easy',
      },
      {
        id: 's3', ko: '라면도 있어요.', zh: '也有拉面。',
        pronunciation: 'ra-myeon-do i-sseo-yo.',
        words: [
          { word: '라면', meaning: '拉面' },
          { word: '~도', meaning: '也' },
        ],
        grammarIds: ['gp-19'],
        difficulty: 'easy',
      },
      {
        id: 's4', ko: '저는 물을 사요.', zh: '我买水。',
        pronunciation: 'jeo-neun mu-reul sa-yo.',
        words: [
          { word: '물', meaning: '水' },
          { word: '사요', meaning: '买' },
        ],
        grammarIds: ['gp-13'],
        difficulty: 'easy',
      },
      {
        id: 's5', ko: '김밥 하나를 사요.', zh: '买一个紫菜包饭。',
        pronunciation: 'gim-bap ha-na-reul sa-yo.',
        words: [
          { word: '하나', meaning: '一个' },
        ],
        grammarIds: [],
        difficulty: 'easy',
      },
      {
        id: 's6', ko: '모두 3000원이에요.', zh: '一共3000韩元。',
        pronunciation: 'mo-du sam-cheo-nwo-ni-e-yo.',
        words: [
          { word: '모두', meaning: '全部/一共' },
          { word: '원', meaning: '韩元' },
        ],
        grammarIds: ['gp-01'],
        difficulty: 'medium',
      },
    ],
    keySentence: {
      ko: '저는 물을 사요.',
      zh: '我买水。',
      grammarNote: '저는 = 我（主题），물을 = 水（宾语），사요 = 买（现在时）。韩语句子是"主语+宾语+动词"顺序。',
    },
    questions: [
      {
        id: 'q1', type: 'main_idea',
        prompt: '这篇文章主要在说什么？',
        options: ['在便利店买东西', '做饭的方法', '去咖啡店', '乘坐地铁'],
        answer: '在便利店买东西',
        explanation: '整篇文章描述了去便利店买东西的过程。',
      },
      {
        id: 'q2', type: 'vocab',
        prompt: '"편의점" 是什么意思？',
        options: ['超市', '便利店', '市场', '百货店'],
        answer: '便利店',
        explanation: '편의 = 便利，점 = 店，편의점 = 便利店。',
      },
      {
        id: 'q3', type: 'detail',
        prompt: '文章里买了什么？',
        options: ['咖啡和面包', '水和紫菜包饭', '拉面和牛奶', '只有水'],
        answer: '水和紫菜包饭',
        explanation: '文中提到 물을 사요（买水）和 김밥 하나를 사요（买一个紫菜包饭）。',
      },
    ],
    outputTask: {
      type: 'fill_blank',
      template: '저는 ___을/를 사요.',
      slots: ['김밥', '라면', '물', '커피', '우유'],
      example: '저는 물을 사요. 我买水。',
    },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 3. 在咖啡店点单 (A0)
  // ═══════════════════════════════════════════
  {
    id: 'cafe-order',
    title: '在咖啡店点单',
    titleKo: '카페에서 주문해요',
    emoji: '🛎️',
    level: 'A0',
    topic: '生活',
    estimatedMinutes: 3,
    learningGoals: [
      '学会用韩语点单',
      '掌握"请给我……"句型',
      '认识咖啡店常用词',
    ],
    coreWords: [
      { word: '카페', meaning: '咖啡店', pronunciation: 'ka-pe' },
      { word: '주세요', meaning: '请给我', pronunciation: 'ju-se-yo' },
      { word: '아이스', meaning: '冰的', pronunciation: 'a-i-seu' },
      { word: '따뜻한', meaning: '热的', pronunciation: 'tta-tteu-tan' },
      { word: '얼마예요', meaning: '多少钱', pronunciation: 'eol-ma-ye-yo' },
    ],
    grammarIds: ['gp-04'],
    sentences: [
      {
        id: 's1', ko: '저는 카페에 가요.', zh: '我去咖啡店。',
        pronunciation: 'jeo-neun ka-pe-e ga-yo.',
        words: [
          { word: '카페', meaning: '咖啡店' },
          { word: '가요', meaning: '去' },
        ],
        grammarIds: ['gp-08'],
        difficulty: 'easy',
      },
      {
        id: 's2', ko: '아이스 아메리카노 주세요.', zh: '请给我一杯冰美式。',
        pronunciation: 'a-i-seu a-me-ri-ka-no ju-se-yo.',
        words: [
          { word: '아이스', meaning: '冰的' },
          { word: '아메리카노', meaning: '美式咖啡' },
          { word: '주세요', meaning: '请给我' },
        ],
        grammarIds: ['gp-04'],
        difficulty: 'easy',
      },
      {
        id: 's3', ko: '따뜻한 라떼도 있어요?', zh: '也有热拿铁吗？',
        pronunciation: 'tta-tteu-tan ra-tte-do i-sseo-yo?',
        words: [
          { word: '따뜻한', meaning: '热的' },
          { word: '라떼', meaning: '拿铁' },
        ],
        grammarIds: ['gp-05'],
        difficulty: 'medium',
      },
      {
        id: 's4', ko: '얼마예요?', zh: '多少钱？',
        pronunciation: 'eol-ma-ye-yo?',
        words: [
          { word: '얼마', meaning: '多少' },
        ],
        grammarIds: ['gp-01'],
        difficulty: 'easy',
      },
      {
        id: 's5', ko: '감사합니다!', zh: '谢谢！',
        pronunciation: 'gam-sa-ham-ni-da!',
        words: [
          { word: '감사합니다', meaning: '谢谢' },
        ],
        grammarIds: [],
        difficulty: 'easy',
      },
    ],
    keySentence: {
      ko: '아이스 아메리카노 주세요.',
      zh: '请给我一杯冰美式。',
      grammarNote: '___ 주세요 = "请给我___"。这是一个非常常用的句型，在餐厅、咖啡店、商店都能用。把想点的东西放在 주세요 前面就行。',
    },
    questions: [
      {
        id: 'q1', type: 'main_idea',
        prompt: '这篇文章主要在讲什么？',
        options: ['在咖啡店点单', '制作咖啡的方法', '咖啡的历史', '韩国的天气'],
        answer: '在咖啡店点单',
        explanation: '文章描述了在咖啡店点单的对话。',
      },
      {
        id: 'q2', type: 'grammar',
        prompt: '"주세요" 的用法是什么？',
        options: ['表示"我做"', '表示"请给我"', '表示"谢谢"', '表示"再见"'],
        answer: '表示"请给我"',
        explanation: '주세요 是"请给我"的意思，点在具体想要的物品名称后面。',
      },
      {
        id: 'q3', type: 'vocab',
        prompt: '"아이스" 是什么意思？',
        options: ['热的', '冰的', '甜的', '小的'],
        answer: '冰的',
        explanation: '아이스 来自英语 ice，是"冰的"意思。',
      },
    ],
    outputTask: {
      type: 'fill_blank',
      template: '___ 주세요.',
      slots: ['아이스 아메리카노', '따뜻한 라떼', '물', '김밥', '커피'],
      example: '아이스 아메리카노 주세요. 请给我一杯冰美式。',
    },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 4. 今天的天气 (A0)
  // ═══════════════════════════════════════════
  {
    id: 'todays-weather',
    title: '今天的天气',
    titleKo: '오늘 날씨',
    emoji: '🌤️',
    level: 'A0',
    topic: '生活',
    estimatedMinutes: 3,
    learningGoals: [
      '学会描述天气',
      '掌握"天气好/不好"表达',
      '认识天气相关词汇',
    ],
    coreWords: [
      { word: '날씨', meaning: '天气', pronunciation: 'nal-ssi' },
      { word: '좋아요', meaning: '好', pronunciation: 'jo-a-yo' },
      { word: '따뜻해요', meaning: '暖和', pronunciation: 'tta-tteu-tae-yo' },
      { word: '추워요', meaning: '冷', pronunciation: 'chu-wo-yo' },
      { word: '비', meaning: '雨', pronunciation: 'bi' },
    ],
    grammarIds: ['gp-13'],
    sentences: [
      {
        id: 's1', ko: '오늘 날씨가 좋아요.', zh: '今天天气好。',
        pronunciation: 'o-neul nal-ssi-ga jo-a-yo.',
        words: [
          { word: '날씨', meaning: '天气' },
          { word: '좋아요', meaning: '好' },
        ],
        grammarIds: ['gp-20'],
        difficulty: 'easy',
      },
      {
        id: 's2', ko: '하늘이 파랗고 예뻐요.', zh: '天空蓝蓝的，很漂亮。',
        pronunciation: 'ha-neu-ri pa-ra-ko ye-ppeo-yo.',
        words: [
          { word: '하늘', meaning: '天空' },
          { word: '파랗다', meaning: '蓝' },
          { word: '예뻐요', meaning: '漂亮' },
        ],
        grammarIds: [],
        difficulty: 'medium',
      },
      {
        id: 's3', ko: '날씨가 따뜻해요.', zh: '天气暖和。',
        pronunciation: 'nal-ssi-ga tta-tteu-tae-yo.',
        words: [
          { word: '따뜻해요', meaning: '暖和' },
        ],
        grammarIds: ['gp-20'],
        difficulty: 'easy',
      },
      {
        id: 's4', ko: '겨울에는 추워요.', zh: '冬天很冷。',
        pronunciation: 'gyeo-u-re-neun chu-wo-yo.',
        words: [
          { word: '겨울', meaning: '冬天' },
          { word: '추워요', meaning: '冷' },
        ],
        grammarIds: ['gp-19'],
        difficulty: 'easy',
      },
      {
        id: 's5', ko: '비가 와요. 우산이 필요해요.', zh: '下雨了。需要雨伞。',
        pronunciation: 'bi-ga wa-yo. u-sa-ni pi-ryo-hae-yo.',
        words: [
          { word: '비', meaning: '雨' },
          { word: '우산', meaning: '雨伞' },
          { word: '필요해요', meaning: '需要' },
        ],
        grammarIds: ['gp-20'],
        difficulty: 'medium',
      },
    ],
    keySentence: {
      ko: '오늘 날씨가 좋아요.',
      zh: '今天天气好。',
      grammarNote: '날씨가 좋아요 是描述天气最常用的表达。~이/가 是主语助词，用在"谁/什么是好的"这类表达中。좋아요 的词典形是 좋다。',
    },
    questions: [
      {
        id: 'q1', type: 'main_idea',
        prompt: '这篇文章主要在讲什么？',
        options: ['今天的天气', '韩国的四季', '如何穿衣服', '天气预报'],
        answer: '今天的天气',
        explanation: '文章描述今天的天气状况。',
      },
      {
        id: 'q2', type: 'vocab',
        prompt: '"추워요" 是什么意思？',
        options: ['热', '冷', '暖和', '凉快'],
        answer: '冷',
        explanation: '추워요 是"冷"的意思，词典形是 춥다。',
      },
      {
        id: 'q3', type: 'detail',
        prompt: '下雨时需要什么？',
        options: ['帽子', '雨伞', '手套', '围巾'],
        answer: '雨伞',
        explanation: '文中说 비가 와요. 우산이 필요해요.（下雨了，需要雨伞。）',
      },
    ],
    outputTask: {
      type: 'fill_blank',
      template: '오늘 날씨가 ___.',
      slots: ['좋아요', '따뜻해요', '추워요', '더워요'],
      example: '오늘 날씨가 좋아요. 今天天气好。',
    },
    createdAt: now,
  },

  // ═══════════════════════════════════════════
  // 5. 我想去韩国 (A0-A1)
  // ═══════════════════════════════════════════
  {
    id: 'want-to-go-korea',
    title: '我想去韩国',
    titleKo: '한국에 가고 싶어요',
    emoji: '✈️',
    level: 'A1',
    topic: '旅行',
    estimatedMinutes: 4,
    learningGoals: [
      '学会表达"想做……"',
      '掌握 ~고 싶어요 句型',
      '认识旅行相关词汇',
    ],
    coreWords: [
      { word: '한국', meaning: '韩国', pronunciation: 'han-guk' },
      { word: '가고 싶어요', meaning: '想去', pronunciation: 'ga-go si-peo-yo' },
      { word: '먹고 싶어요', meaning: '想吃', pronunciation: 'meok-go si-peo-yo' },
      { word: '친구', meaning: '朋友', pronunciation: 'chin-gu' },
      { word: '여행', meaning: '旅行', pronunciation: 'yeo-haeng' },
    ],
    grammarIds: ['gp-14'],
    sentences: [
      {
        id: 's1', ko: '저는 한국에 가고 싶어요.', zh: '我想去韩国。',
        pronunciation: 'jeo-neun han-gu-ge ga-go si-peo-yo.',
        words: [
          { word: '한국', meaning: '韩国' },
          { word: '가고 싶어요', meaning: '想去' },
        ],
        grammarIds: ['gp-14'],
        difficulty: 'easy',
      },
      {
        id: 's2', ko: '한국에서 김밥을 먹고 싶어요.', zh: '想在韩国吃紫菜包饭。',
        pronunciation: 'han-gu-ge-seo gim-ba-beul meok-go si-peo-yo.',
        words: [
          { word: '~에서', meaning: '在（动作发生地）' },
          { word: '먹고 싶어요', meaning: '想吃' },
        ],
        grammarIds: ['gp-09', 'gp-14'],
        difficulty: 'medium',
      },
      {
        id: 's3', ko: '한국 친구를 만나고 싶어요.', zh: '想见韩国朋友。',
        pronunciation: 'han-guk chin-gu-reul man-na-go si-peo-yo.',
        words: [
          { word: '친구', meaning: '朋友' },
          { word: '만나다', meaning: '见面' },
        ],
        grammarIds: ['gp-14'],
        difficulty: 'easy',
      },
      {
        id: 's4', ko: '서울에서 쇼핑도 하고 싶어요.', zh: '也想在首尔购物。',
        pronunciation: 'seo-u-re-seo syo-ping-do ha-go si-peo-yo.',
        words: [
          { word: '서울', meaning: '首尔' },
          { word: '쇼핑', meaning: '购物' },
        ],
        grammarIds: ['gp-14', 'gp-19'],
        difficulty: 'medium',
      },
      {
        id: 's5', ko: '한국 여행이 정말 기대돼요!', zh: '好期待韩国旅行！',
        pronunciation: 'han-guk yeo-haeng-i jeong-mal gi-dae-dwae-yo!',
        words: [
          { word: '여행', meaning: '旅行' },
          { word: '기대돼요', meaning: '期待' },
        ],
        grammarIds: ['gp-20'],
        difficulty: 'medium',
      },
    ],
    keySentence: {
      ko: '저는 한국에 가고 싶어요.',
      zh: '我想去韩国。',
      grammarNote: '~고 싶어요 = "想做……"。动词去掉다，加上고 싶어요。가다 → 가고 싶어요（想去），먹다 → 먹고 싶어요（想吃）。这是韩语里表达愿望最常用的句型。',
    },
    questions: [
      {
        id: 'q1', type: 'main_idea',
        prompt: 'Tori 想做什么？',
        options: ['去韩国旅行', '学习中文', '买房子', '找工作'],
        answer: '去韩国旅行',
        explanation: '整篇文章表达 Tori 对去韩国旅行的期待。',
      },
      {
        id: 'q2', type: 'grammar',
        prompt: '以下哪个是"想吃"的正确韩语表达？',
        options: ['먹고 싶어요', '먹어요', '먹었어요', '먹을 거예요'],
        answer: '먹고 싶어요',
        explanation: '~고 싶어요 表示"想做……"，먹다 → 먹고 싶어요 = 想吃。',
      },
      {
        id: 'q3', type: 'detail',
        prompt: 'Tori 想在首尔做什么？',
        options: ['吃饭', '购物', '学习', '工作'],
        answer: '购物',
        explanation: '文中说 서울에서 쇼핑도 하고 싶어요（想在首尔购物）。',
      },
    ],
    outputTask: {
      type: 'fill_blank',
      template: '저는 ___에 가고 싶어요.',
      slots: ['한국', '서울', '부산', '제주도', '일본'],
      example: '저는 한국에 가고 싶어요. 我想去韩国。',
    },
    createdAt: now,
  },
];

/** 按等级分组 */
export function getArticlesByLevel(level: Article['level']): Article[] {
  return readingArticles.filter((a) => a.level === level);
}

/** 按主题分组 */
export function getArticlesByTopic(topic: string): Article[] {
  return readingArticles.filter((a) => a.topic === topic);
}

/** 获取今日阅读推荐 */
export function getTodayArticle(): Article {
  const idx = new Date().getDate() % readingArticles.length;
  return readingArticles[idx];
}

/** 等级标签 */
export const levelLabel: Record<Article['level'], string> = {
  A0: '零基础',
  A1: '入门',
  A2: '初级',
  B1: '进阶',
  TOPIK: 'TOPIK',
};

/** 等级颜色 */
export const levelColor: Record<Article['level'], string> = {
  A0: 'bg-emerald-100 text-emerald-700',
  A1: 'bg-teal-100 text-teal-700',
  A2: 'bg-sky-100 text-sky-700',
  B1: 'bg-purple-100 text-purple-700',
  TOPIK: 'bg-rose-100 text-rose-700',
};

/** 主题列表 */
export const topics = ['生活', '旅行', '咖啡', 'KPOP', '韩剧', '校园', 'TOPIK'] as const;
