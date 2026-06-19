export interface DailyWord {
  korean: string;
  pronunciation: string;
  chinese: string;
  partOfSpeech: string;
  emoji: string;
}

export interface DailyGrammar {
  name: string;
  nameKo: string;
  explanation: string;
  pattern: string;
  example: string;
  exampleZh: string;
  grammarId?: string;  // links to GrammarPoint.id in grammar-new.ts
}

export interface DailySentence {
  korean: string;
  pronunciation: string;
  chinese: string;
  scene: string;
}

export interface DailyDictation {
  korean: string;
  pronunciation: string;
  chinese: string;
}

export interface OutputTask {
  prompt: string;
  hint: string;
  exampleAnswer: string;
}

export interface DailyCourse {
  day: number;
  title: string;
  titleKo: string;
  emoji: string;
  description: string;
  words: DailyWord[];
  grammar: DailyGrammar;
  sentences: DailySentence[];
  dictations: DailyDictation[];
  output: OutputTask;
}

// Map grammarId → { day, title } for cross-reference
export function getCourseDayForGrammar(grammarId: string): { day: number; title: string } | null {
  for (const day of thirtyDayCourse) {
    if (day.grammar.grammarId === grammarId) {
      return { day: day.day, title: day.title };
    }
  }
  return null;
}

export const thirtyDayCourse: DailyCourse[] = [
  // ── WEEK 1: 日常问候与自我介绍 (Days 1-7) ──
  {
    day: 1, title: '打招呼', titleKo: '인사', emoji: '👋',
    description: '学会最基本的韩语问候，迈出第一步',
    words: [
      { korean: '안녕하세요', pronunciation: 'an-nyeong-ha-se-yo', chinese: '您好', partOfSpeech: '常用语', emoji: '👋' },
      { korean: '감사합니다', pronunciation: 'gam-sa-ham-ni-da', chinese: '谢谢', partOfSpeech: '常用语', emoji: '🙏' },
      { korean: '네', pronunciation: 'ne', chinese: '是/好的', partOfSpeech: '应答', emoji: '✅' },
      { korean: '아니요', pronunciation: 'a-ni-yo', chinese: '不是', partOfSpeech: '应答', emoji: '❌' },
      { korean: '안녕히 가세요', pronunciation: 'an-nyeong-hi ga-se-yo', chinese: '再见（对走的人）', partOfSpeech: '常用语', emoji: '👋' },
      { korean: '안녕히 계세요', pronunciation: 'an-nyeong-hi gye-se-yo', chinese: '再见（对留的人）', partOfSpeech: '常用语', emoji: '👋' },
      { korean: '반갑습니다', pronunciation: 'ban-gap-seum-ni-da', chinese: '很高兴见到你', partOfSpeech: '常用语', emoji: '😊' },
      { korean: '죄송합니다', pronunciation: 'joe-song-ham-ni-da', chinese: '对不起', partOfSpeech: '常用语', emoji: '🙇' },
    ],
    grammar: {
      name: '입니다 / 입니까?', nameKo: '입니다',
      explanation: '"입니다"相当于"是"，用于名词后做陈述。"입니까?"是疑问形式，相当于"是吗？"。这是韩语最基本的句型。',
      pattern: '名词 + 입니다 / 입니까?',
      example: '학생입니다. / 학생입니까?',
      exampleZh: '我是学生。/ 你是学生吗？',
      grammarId: 'gp-02',
    },
    sentences: [
      { korean: '안녕하세요! 저는 민수입니다.', pronunciation: 'an-nyeong-ha-se-yo! jeo-neun min-su-im-ni-da.', chinese: '您好！我是敏秀。', scene: '初次见面' },
      { korean: '만나서 반갑습니다.', pronunciation: 'man-na-seo ban-gap-seum-ni-da.', chinese: '见到您很高兴。', scene: '互相介绍后' },
      { korean: '안녕히 가세요!', pronunciation: 'an-nyeong-hi ga-se-yo!', chinese: '请慢走！', scene: '道别时' },
    ],
    dictations: [
      { korean: '안녕하세요', pronunciation: 'an-nyeong-ha-se-yo', chinese: '您好' },
      { korean: '감사합니다', pronunciation: 'gam-sa-ham-ni-da', chinese: '谢谢' },
      { korean: '반갑습니다', pronunciation: 'ban-gap-seum-ni-da', chinese: '很高兴见到你' },
      { korean: '안녕히 가세요', pronunciation: 'an-nyeong-hi ga-se-yo', chinese: '再见' },
      { korean: '죄송합니다', pronunciation: 'joe-song-ham-ni-da', chinese: '对不起' },
    ],
    output: {
      prompt: '用韩语和新朋友打招呼，介绍自己的名字。',
      hint: '使用 안녕하세요 + 저는 [名字]입니다',
      exampleAnswer: '안녕하세요! 저는 지민입니다. 만나서 반갑습니다!',
    },
  },

  {
    day: 2, title: '自我介绍', titleKo: '자기소개', emoji: '🙋',
    description: '学会介绍自己的名字、国籍和职业',
    words: [
      { korean: '이름', pronunciation: 'i-reum', chinese: '名字', partOfSpeech: '名词', emoji: '📛' },
      { korean: '중국', pronunciation: 'jung-guk', chinese: '中国', partOfSpeech: '名词', emoji: '🇨🇳' },
      { korean: '한국', pronunciation: 'han-guk', chinese: '韩国', partOfSpeech: '名词', emoji: '🇰🇷' },
      { korean: '사람', pronunciation: 'sa-ram', chinese: '人', partOfSpeech: '名词', emoji: '🧑' },
      { korean: '학생', pronunciation: 'hak-saeng', chinese: '学生', partOfSpeech: '名词', emoji: '🎒' },
      { korean: '선생님', pronunciation: 'seon-saeng-nim', chinese: '老师', partOfSpeech: '名词', emoji: '👩‍🏫' },
      { korean: '회사원', pronunciation: 'hoe-sa-won', chinese: '上班族', partOfSpeech: '名词', emoji: '💼' },
      { korean: '중국 사람', pronunciation: 'jung-guk sa-ram', chinese: '中国人', partOfSpeech: '名词', emoji: '🇨🇳' },
    ],
    grammar: {
      name: '은/는 (主题助词)', nameKo: '은/는',
      explanation: '"은/는"加在名词后表示句子的主题，相当于"…是"。有收音用"은"，无收音用"는"。저는 = "我（是）…"。',
      pattern: '名词 + 은/는 (有收音用은，无收音用는)',
      example: '저는 중국 사람입니다.',
      exampleZh: '我是中国人。',
      grammarId: 'gp-19',
    },
    sentences: [
      { korean: '제 이름은 지민입니다.', pronunciation: 'je i-reu-meun ji-mi-nim-ni-da.', chinese: '我的名字是智敏。', scene: '自我介绍' },
      { korean: '저는 중국 사람입니다.', pronunciation: 'jeo-neun jung-guk sa-ra-mim-ni-da.', chinese: '我是中国人。', scene: '说明国籍' },
      { korean: '저는 학생입니다.', pronunciation: 'jeo-neun hak-ssaeng-im-ni-da.', chinese: '我是学生。', scene: '说明职业' },
    ],
    dictations: [
      { korean: '이름이 뭐예요?', pronunciation: 'i-reu-mi mwo-ye-yo?', chinese: '你叫什么名字？' },
      { korean: '저는 중국 사람이에요', pronunciation: 'jeo-neun jung-guk sa-ra-mi-e-yo', chinese: '我是中国人' },
      { korean: '저는 학생이에요', pronunciation: 'jeo-neun hak-ssaeng-i-e-yo', chinese: '我是学生' },
      { korean: '제 이름은 수현이에요', pronunciation: 'je i-reu-meun su-hyeo-ni-e-yo', chinese: '我的名字是秀贤' },
      { korean: '한국 사람이에요?', pronunciation: 'han-guk sa-ra-mi-e-yo?', chinese: '你是韩国人吗？' },
    ],
    output: {
      prompt: '用韩语写一段自我介绍：名字、国籍、职业。',
      hint: '안녕하세요! 제 이름은... + 저는... 사람입니다 + 저는... 입니다',
      exampleAnswer: '안녕하세요! 제 이름은 왕밍입니다. 저는 중국 사람입니다. 저는 학생입니다.',
    },
  },

  {
    day: 3, title: '点咖啡', titleKo: '카페 주문', emoji: '☕',
    description: '在咖啡厅用韩语点单，学会基本数量表达',
    words: [
      { korean: '커피', pronunciation: 'keo-pi', chinese: '咖啡', partOfSpeech: '名词', emoji: '☕' },
      { korean: '아메리카노', pronunciation: 'a-me-ri-ka-no', chinese: '美式咖啡', partOfSpeech: '名词', emoji: '🫗' },
      { korean: '라떼', pronunciation: 'ra-tte', chinese: '拿铁', partOfSpeech: '名词', emoji: '🥛' },
      { korean: '주세요', pronunciation: 'ju-se-yo', chinese: '请给我', partOfSpeech: '动词', emoji: '🤲' },
      { korean: '하나', pronunciation: 'ha-na', chinese: '一个', partOfSpeech: '数词', emoji: '1️⃣' },
      { korean: '둘', pronunciation: 'dul', chinese: '两个', partOfSpeech: '数词', emoji: '2️⃣' },
      { korean: '차갑다', pronunciation: 'cha-gap-tta', chinese: '冷的/冰的', partOfSpeech: '形容词', emoji: '🧊' },
      { korean: '뜨겁다', pronunciation: 'tteu-geop-tta', chinese: '热的', partOfSpeech: '形容词', emoji: '🔥' },
    ],
    grammar: {
      name: '주세요 (请求)', nameKo: '주세요',
      explanation: '"주세요"加在名词后表示"请给我…"。这是点餐、购物时最常用的句型。아이스 아메리카노 주세요 = "请给我冰美式"。',
      pattern: '名词 + 주세요',
      example: '아메리카노 하나 주세요.',
      exampleZh: '请给我一杯美式咖啡。',
      grammarId: 'gp-04',
    },
    sentences: [
      { korean: '아메리카노 하나 주세요.', pronunciation: 'a-me-ri-ka-no ha-na ju-se-yo.', chinese: '请给我一杯美式咖啡。', scene: '咖啡厅点单' },
      { korean: '아이스로 주세요.', pronunciation: 'a-i-seu-ro ju-se-yo.', chinese: '请给我冰的。', scene: '指定温度' },
      { korean: '얼마예요?', pronunciation: 'eol-ma-ye-yo?', chinese: '多少钱？', scene: '结账时' },
    ],
    dictations: [
      { korean: '아메리카노 하나 주세요', pronunciation: 'a-me-ri-ka-no ha-na ju-se-yo', chinese: '请给我一杯美式' },
      { korean: '라떼 두 잔 주세요', pronunciation: 'ra-tte du jan ju-se-yo', chinese: '请给我两杯拿铁' },
      { korean: '따뜻한 걸로 주세요', pronunciation: 'tta-tteu-tan geol-lo ju-se-yo', chinese: '请给我热的' },
      { korean: '얼마예요?', pronunciation: 'eol-ma-ye-yo?', chinese: '多少钱？' },
      { korean: '맛있어요', pronunciation: 'ma-si-sseo-yo', chinese: '很好喝/好吃' },
    ],
    output: {
      prompt: '用韩语在咖啡厅点一杯你喜欢的咖啡。',
      hint: '[咖啡名] 하나 주세요 + 아이스/따뜻한 걸로 주세요',
      exampleAnswer: '아이스 라떼 하나 주세요. 얼마예요?',
    },
  },

  {
    day: 4, title: '便利店', titleKo: '편의점', emoji: '🏪',
    description: '在韩国便利店买东西，学会提问和表达需求',
    words: [
      { korean: '편의점', pronunciation: 'pyeo-nui-jeom', chinese: '便利店', partOfSpeech: '名词', emoji: '🏪' },
      { korean: '삼각김밥', pronunciation: 'sam-gak-gim-bap', chinese: '三角饭团', partOfSpeech: '名词', emoji: '🍙' },
      { korean: '라면', pronunciation: 'ra-myeon', chinese: '拉面/方便面', partOfSpeech: '名词', emoji: '🍜' },
      { korean: '물', pronunciation: 'mul', chinese: '水', partOfSpeech: '名词', emoji: '💧' },
      { korean: '이거', pronunciation: 'i-geo', chinese: '这个', partOfSpeech: '代词', emoji: '👉' },
      { korean: '어디', pronunciation: 'eo-di', chinese: '哪里', partOfSpeech: '代词', emoji: '❓' },
      { korean: '얼마', pronunciation: 'eol-ma', chinese: '多少', partOfSpeech: '代词', emoji: '💰' },
      { korean: '도시락', pronunciation: 'do-si-rak', chinese: '便当', partOfSpeech: '名词', emoji: '🍱' },
    ],
    grammar: {
      name: '이/가 (主格助词)', nameKo: '이/가',
      explanation: '"이/가"加在名词后表示主语。有收音用"이"，无收音用"가"。和"은/는"不同，"이/가"强调主语本身，常用于回答"谁/什么"问题。',
      pattern: '名词 + 이/가 (有收音用이，无收音用가)',
      example: '라면이 어디에 있어요?',
      exampleZh: '拉面在哪里？',
      grammarId: 'gp-20',
    },
    sentences: [
      { korean: '삼각김밥이 어디에 있어요?', pronunciation: 'sam-gak-gim-ba-bi eo-di-e i-sseo-yo?', chinese: '三角饭团在哪里？', scene: '找商品' },
      { korean: '이거 얼마예요?', pronunciation: 'i-geo eol-ma-ye-yo?', chinese: '这个多少钱？', scene: '问价格' },
      { korean: '라면 하나랑 물 하나 주세요.', pronunciation: 'ra-myeon ha-na-rang mul ha-na ju-se-yo.', chinese: '请给我一个拉面和一个水。', scene: '结账' },
    ],
    dictations: [
      { korean: '이거 얼마예요?', pronunciation: 'i-geo eol-ma-ye-yo?', chinese: '这个多少钱？' },
      { korean: '삼각김밥 하나 주세요', pronunciation: 'sam-gak-gim-bap ha-na ju-se-yo', chinese: '请给我一个三角饭团' },
      { korean: '라면은 어디에 있어요?', pronunciation: 'ra-myeo-neun eo-di-e i-sseo-yo?', chinese: '拉面在哪里？' },
      { korean: '도시락 두 개 주세요', pronunciation: 'do-si-rak du gae ju-se-yo', chinese: '请给我两个便当' },
      { korean: '감사합니다!', pronunciation: 'gam-sa-ham-ni-da!', chinese: '谢谢！' },
    ],
    output: {
      prompt: '在便利店买一个饭团和一瓶水，用韩语表达。',
      hint: '삼각김밥 하나랑 물 하나 주세요',
      exampleAnswer: '삼각김밥 하나랑 물 하나 주세요. 이거 얼마예요?',
    },
  },

  {
    day: 5, title: '问路', titleKo: '길 찾기', emoji: '🗺️',
    description: '学会基本的方向和位置表达',
    words: [
      { korean: '여기', pronunciation: 'yeo-gi', chinese: '这里', partOfSpeech: '代词', emoji: '📍' },
      { korean: '거기', pronunciation: 'geo-gi', chinese: '那里', partOfSpeech: '代词', emoji: '👉' },
      { korean: '오른쪽', pronunciation: 'o-reun-jjok', chinese: '右边', partOfSpeech: '名词', emoji: '➡️' },
      { korean: '왼쪽', pronunciation: 'oen-jjok', chinese: '左边', partOfSpeech: '名词', emoji: '⬅️' },
      { korean: '앞', pronunciation: 'ap', chinese: '前面', partOfSpeech: '名词', emoji: '⬆️' },
      { korean: '뒤', pronunciation: 'dwi', chinese: '后面', partOfSpeech: '名词', emoji: '⬇️' },
      { korean: '화장실', pronunciation: 'hwa-jang-sil', chinese: '洗手间', partOfSpeech: '名词', emoji: '🚻' },
      { korean: '지하철역', pronunciation: 'ji-ha-cheol-yeok', chinese: '地铁站', partOfSpeech: '名词', emoji: '🚇' },
    ],
    grammar: {
      name: '에 있어요 (位置)', nameKo: '에 있어요',
      explanation: '"에"是位置助词，"있어요"表示"在"。合起来表达"在…（地方）"。问位置用"어디에 있어요?"。',
      pattern: '场所 + 에 + 있어요',
      example: '화장실이 어디에 있어요?',
      exampleZh: '洗手间在哪里？',
      grammarId: 'gp-08',
    },
    sentences: [
      { korean: '화장실이 어디에 있어요?', pronunciation: 'hwa-jang-si-ri eo-di-e i-sseo-yo?', chinese: '洗手间在哪里？', scene: '问路' },
      { korean: '오른쪽으로 가세요.', pronunciation: 'o-reun-jjo-geu-ro ga-se-yo.', chinese: '请往右边走。', scene: '指路' },
      { korean: '지하철역은 여기에서 가까워요.', pronunciation: 'ji-ha-cheol-yeok-eun yeo-gi-e-seo ga-kka-wo-yo.', chinese: '地铁站离这里很近。', scene: '说明距离' },
    ],
    dictations: [
      { korean: '화장실이 어디에 있어요?', pronunciation: 'hwa-jang-si-ri eo-di-e i-sseo-yo?', chinese: '洗手间在哪里？' },
      { korean: '오른쪽으로 가세요', pronunciation: 'o-reun-jjo-geu-ro ga-se-yo', chinese: '请向右走' },
      { korean: '지하철역은 멀어요?', pronunciation: 'ji-ha-cheol-yeok-eun meo-reo-yo?', chinese: '地铁站远吗？' },
      { korean: '여기에서 가까워요', pronunciation: 'yeo-gi-e-seo ga-kka-wo-yo', chinese: '离这里很近' },
      { korean: '저기요!', pronunciation: 'jeo-gi-yo!', chinese: '打扰一下！' },
    ],
    output: {
      prompt: '用韩语问路：地铁站怎么走？',
      hint: '저기요! + 지하철역이 어디에 있어요?',
      exampleAnswer: '저기요! 지하철역이 어디에 있어요? 오른쪽으로 가면 돼요?',
    },
  },

  {
    day: 6, title: '数字和年龄', titleKo: '숫자와 나이', emoji: '🔢',
    description: '学会韩语固有数字和年龄表达',
    words: [
      { korean: '하나', pronunciation: 'ha-na', chinese: '一', partOfSpeech: '数词', emoji: '1️⃣' },
      { korean: '둘', pronunciation: 'dul', chinese: '二', partOfSpeech: '数词', emoji: '2️⃣' },
      { korean: '셋', pronunciation: 'set', chinese: '三', partOfSpeech: '数词', emoji: '3️⃣' },
      { korean: '넷', pronunciation: 'net', chinese: '四', partOfSpeech: '数词', emoji: '4️⃣' },
      { korean: '나이', pronunciation: 'na-i', chinese: '年龄', partOfSpeech: '名词', emoji: '🎂' },
      { korean: '살', pronunciation: 'sal', chinese: '岁', partOfSpeech: '量词', emoji: '📅' },
      { korean: '몇', pronunciation: 'myeot', chinese: '几', partOfSpeech: '代词', emoji: '❓' },
      { korean: '스물', pronunciation: 'seu-mul', chinese: '二十', partOfSpeech: '数词', emoji: '🔢' },
    ],
    grammar: {
      name: '固有数字 + 살 (年龄)', nameKo: '고유어 숫자',
      explanation: '韩语有两套数字：汉字数字（일이삼）和固有数字（하나둘셋）。说年龄时用固有数字 + 살。하나 + 살 = 한 살；스물 + 살 = 스무 살。',
      pattern: '固有数字 + 살',
      example: '저는 스무 살이에요.',
      exampleZh: '我20岁。',
    },
    sentences: [
      { korean: '몇 살이에요?', pronunciation: 'myeot sa-ri-e-yo?', chinese: '你几岁了？', scene: '询问年龄' },
      { korean: '저는 스무 살이에요.', pronunciation: 'jeo-neun seu-mu sa-ri-e-yo.', chinese: '我20岁。', scene: '回答年龄' },
      { korean: '커피 두 잔 주세요.', pronunciation: 'keo-pi du jan ju-se-yo.', chinese: '请给我两杯咖啡。', scene: '点单' },
    ],
    dictations: [
      { korean: '몇 살이에요?', pronunciation: 'myeot sa-ri-e-yo?', chinese: '你多大了？' },
      { korean: '스무 살이에요', pronunciation: 'seu-mu sa-ri-e-yo', chinese: '20岁' },
      { korean: '한 개 주세요', pronunciation: 'han gae ju-se-yo', chinese: '请给我一个' },
      { korean: '두 잔이요', pronunciation: 'du ja-ni-yo', chinese: '两杯' },
      { korean: '세 명이에요', pronunciation: 'se myeong-i-e-yo', chinese: '三个人' },
    ],
    output: {
      prompt: '用韩语介绍你的年龄，并点两杯咖啡。',
      hint: '저는 [年龄]살이에요 + 커피 두 잔 주세요',
      exampleAnswer: '저는 스물다섯 살이에요. 아메리카노 두 잔 주세요.',
    },
  },

  {
    day: 7, title: '一周复习', titleKo: '주간 복습', emoji: '📝',
    description: '复习前6天学过的所有单词、语法和句型',
    words: [
      { korean: '복습', pronunciation: 'bok-sseup', chinese: '复习', partOfSpeech: '名词', emoji: '📝' },
      { korean: '공부하다', pronunciation: 'gong-bu-ha-da', chinese: '学习', partOfSpeech: '动词', emoji: '📚' },
      { korean: '이해하다', pronunciation: 'i-hae-ha-da', chinese: '理解', partOfSpeech: '动词', emoji: '💡' },
      { korean: '말하다', pronunciation: 'mal-ha-da', chinese: '说', partOfSpeech: '动词', emoji: '🗣️' },
      { korean: '듣다', pronunciation: 'deut-tta', chinese: '听', partOfSpeech: '动词', emoji: '👂' },
      { korean: '읽다', pronunciation: 'ik-tta', chinese: '读', partOfSpeech: '动词', emoji: '📖' },
      { korean: '쓰다', pronunciation: 'sseu-da', chinese: '写', partOfSpeech: '动词', emoji: '✍️' },
      { korean: '어렵다', pronunciation: 'eo-ryeop-tta', chinese: '难', partOfSpeech: '形容词', emoji: '🤔' },
    ],
    grammar: {
      name: '요体总结 (해요체)', nameKo: '해요체',
      explanation: '本周学了"입니다/입니까"、"주세요"、"에 있어요"等句型。它们都使用"요"结尾的礼貌体（해요체），是日常生活中最常用的敬语等级。',
      pattern: '各种动词/形容词词干 + 아/어요',
      example: '공부해요. / 말해요. / 들어요.',
      exampleZh: '学习。/ 说话。/ 听。',
      grammarId: 'gp-13',
    },
    sentences: [
      { korean: '오늘은 복습하는 날이에요!', pronunciation: 'o-neu-reun bok-sseu-pa-neun na-ri-e-yo!', chinese: '今天是复习日！', scene: '确认计划' },
      { korean: '한국어를 공부해요.', pronunciation: 'han-gu-geo-reul gong-bu-hae-yo.', chinese: '我在学韩语。', scene: '说明近况' },
      { korean: '이해했어요?', pronunciation: 'i-hae-hae-sseo-yo?', chinese: '理解了吗？', scene: '确认对方' },
    ],
    dictations: [
      { korean: '한국어를 공부해요', pronunciation: 'han-gu-geo-reul gong-bu-hae-yo', chinese: '我在学韩语' },
      { korean: '안녕하세요', pronunciation: 'an-nyeong-ha-se-yo', chinese: '您好' },
      { korean: '커피 한 잔 주세요', pronunciation: 'keo-pi han jan ju-se-yo', chinese: '请给我一杯咖啡' },
      { korean: '화장실이 어디에 있어요?', pronunciation: 'hwa-jang-si-ri eo-di-e i-sseo-yo?', chinese: '洗手间在哪' },
      { korean: '저는 학생이에요', pronunciation: 'jeo-neun hak-ssaeng-i-e-yo', chinese: '我是学生' },
    ],
    output: {
      prompt: '用韩语写一段话，介绍你这一周学了什么。',
      hint: '이번 주에... + 배웠어요 (学会了)',
      exampleAnswer: '이번 주에 한국어 인사, 자기소개, 커피 주문을 배웠어요. 재미있어요!',
    },
  },

  // ── WEEK 2: 日常生活 (Days 8-14) ──
  {
    day: 8, title: '天气', titleKo: '날씨', emoji: '🌤️',
    description: '学会描述天气的基本表达',
    words: [
      { korean: '날씨', pronunciation: 'nal-ssi', chinese: '天气', partOfSpeech: '名词', emoji: '🌤️' },
      { korean: '좋다', pronunciation: 'jo-ta', chinese: '好', partOfSpeech: '形容词', emoji: '👍' },
      { korean: '나쁘다', pronunciation: 'na-ppeu-da', chinese: '坏/不好', partOfSpeech: '形容词', emoji: '👎' },
      { korean: '덥다', pronunciation: 'deop-tta', chinese: '热', partOfSpeech: '形容词', emoji: '🥵' },
      { korean: '춥다', pronunciation: 'chup-tta', chinese: '冷', partOfSpeech: '形容词', emoji: '🥶' },
      { korean: '비', pronunciation: 'bi', chinese: '雨', partOfSpeech: '名词', emoji: '🌧️' },
      { korean: '눈', pronunciation: 'nun', chinese: '雪', partOfSpeech: '名词', emoji: '❄️' },
      { korean: '바람', pronunciation: 'ba-ram', chinese: '风', partOfSpeech: '名词', emoji: '💨' },
    ],
    grammar: {
      name: '아/어요 (形容词现在时)', nameKo: '아/어요',
      explanation: '形容词词干 + 아/어요 构成形容词的해요体。阳性元音(ㅏㅗ)后用아요，其他用어요。하다结尾的变成해요。这是日常描述事物最基本的句式。',
      pattern: '形容词词干 + 아요/어요/해요',
      example: '날씨가 좋아요. / 더워요. / 추워요.',
      exampleZh: '天气很好。/ 很热。/ 很冷。',
      grammarId: 'gp-13',
    },
    sentences: [
      { korean: '오늘 날씨가 좋아요!', pronunciation: 'o-neul nal-ssi-ga jo-a-yo!', chinese: '今天天气很好！', scene: '日常对话' },
      { korean: '너무 더워요.', pronunciation: 'neo-mu deo-wo-yo.', chinese: '太热了。', scene: '抱怨天气' },
      { korean: '비가 와요.', pronunciation: 'bi-ga wa-yo.', chinese: '下雨了。', scene: '描述天气变化' },
    ],
    dictations: [
      { korean: '오늘 날씨가 좋아요', pronunciation: 'o-neul nal-ssi-ga jo-a-yo', chinese: '今天天气好' },
      { korean: '너무 추워요', pronunciation: 'neo-mu chu-wo-yo', chinese: '太冷了' },
      { korean: '비가 와요', pronunciation: 'bi-ga wa-yo', chinese: '下雨了' },
      { korean: '날씨가 어때요?', pronunciation: 'nal-ssi-ga eo-ttae-yo?', chinese: '天气怎么样？' },
      { korean: '바람이 불어요', pronunciation: 'ba-ra-mi bu-reo-yo', chinese: '刮风了' },
    ],
    output: {
      prompt: '描述今天的天气。',
      hint: '오늘 날씨가... + (形容词)아/어요',
      exampleAnswer: '오늘 날씨가 좋아요. 그런데 조금 더워요. 바람이 불어서 좋아요.',
    },
  },

  {
    day: 9, title: '时间', titleKo: '시간', emoji: '🕐',
    description: '学会用韩语说时间和安排',
    words: [
      { korean: '시간', pronunciation: 'si-gan', chinese: '时间', partOfSpeech: '名词', emoji: '🕐' },
      { korean: '몇 시', pronunciation: 'myeot si', chinese: '几点', partOfSpeech: '代词', emoji: '❓' },
      { korean: '한 시', pronunciation: 'han si', chinese: '一点', partOfSpeech: '数词', emoji: '🕐' },
      { korean: '지금', pronunciation: 'ji-geum', chinese: '现在', partOfSpeech: '副词', emoji: '⏰' },
      { korean: '오전', pronunciation: 'o-jeon', chinese: '上午', partOfSpeech: '名词', emoji: '🌅' },
      { korean: '오후', pronunciation: 'o-hu', chinese: '下午', partOfSpeech: '名词', emoji: '🌇' },
      { korean: '아침', pronunciation: 'a-chim', chinese: '早上', partOfSpeech: '名词', emoji: '🌄' },
      { korean: '저녁', pronunciation: 'jeo-nyeok', chinese: '晚上', partOfSpeech: '名词', emoji: '🌆' },
    ],
    grammar: {
      name: '에 (时间助词)', nameKo: '에',
      explanation: '"에"加在时间名词后表示"在…时间"。和位置"에"是同一个助词，用于时间时表示动作发生的时间点。',
      pattern: '时间 + 에',
      example: '아침에 커피를 마셔요.',
      exampleZh: '早上喝咖啡。',
    },
    sentences: [
      { korean: '지금 몇 시예요?', pronunciation: 'ji-geum myeot si-ye-yo?', chinese: '现在几点了？', scene: '询问时间' },
      { korean: '아침에 뭐 해요?', pronunciation: 'a-chi-me mwo hae-yo?', chinese: '早上做什么？', scene: '询问日常' },
      { korean: '저녁 7시에 만나요.', pronunciation: 'jeo-nyeok il-gop si-e man-na-yo.', chinese: '晚上7点见。', scene: '约定时间' },
    ],
    dictations: [
      { korean: '지금 몇 시예요?', pronunciation: 'ji-geum myeot si-ye-yo?', chinese: '现在几点？' },
      { korean: '세 시예요', pronunciation: 'se si-ye-yo', chinese: '三点' },
      { korean: '아침에 일어나요', pronunciation: 'a-chi-me i-reo-na-yo', chinese: '早上起床' },
      { korean: '몇 시에 만나요?', pronunciation: 'myeot si-e man-na-yo?', chinese: '几点见？' },
      { korean: '오후에 공부해요', pronunciation: 'o-hu-e gong-bu-hae-yo', chinese: '下午学习' },
    ],
    output: {
      prompt: '描述你一天的时间安排。',
      hint: '아침에... / 오후에... / 저녁에...',
      exampleAnswer: '아침 7시에 일어나요. 오후 3시에 친구를 만나요. 저녁 8시에 한국어를 공부해요.',
    },
  },

  {
    day: 10, title: '家人', titleKo: '가족', emoji: '👨‍👩‍👧‍👦',
    description: '学会介绍家人，用韩语说家庭成员',
    words: [
      { korean: '가족', pronunciation: 'ga-jok', chinese: '家人/家庭', partOfSpeech: '名词', emoji: '👨‍👩‍👧‍👦' },
      { korean: '아빠', pronunciation: 'a-ppa', chinese: '爸爸（口语）', partOfSpeech: '名词', emoji: '👨' },
      { korean: '엄마', pronunciation: 'eom-ma', chinese: '妈妈（口语）', partOfSpeech: '名词', emoji: '👩' },
      { korean: '오빠', pronunciation: 'o-ppa', chinese: '哥哥（女称）', partOfSpeech: '名词', emoji: '👦' },
      { korean: '언니', pronunciation: 'eon-ni', chinese: '姐姐（女称）', partOfSpeech: '名词', emoji: '👧' },
      { korean: '형', pronunciation: 'hyeong', chinese: '哥哥（男称）', partOfSpeech: '名词', emoji: '👦' },
      { korean: '누나', pronunciation: 'nu-na', chinese: '姐姐（男称）', partOfSpeech: '名词', emoji: '👧' },
      { korean: '동생', pronunciation: 'dong-saeng', chinese: '弟弟/妹妹', partOfSpeech: '名词', emoji: '👶' },
    ],
    grammar: {
      name: '의 (所有格)', nameKo: '의',
      explanation: '"의"加在名词后表示"…的"，相当于中文的"的"。口语中常省略或读成"에"。저의 → 제（我的缩写）。',
      pattern: '名词 + 의 + 名词',
      example: '저의 가족은 네 명이에요.',
      exampleZh: '我的家人有四口。',
    },
    sentences: [
      { korean: '가족이 몇 명이에요?', pronunciation: 'ga-jo-gi myeot myeong-i-e-yo?', chinese: '家里有几个人？', scene: '询问家庭' },
      { korean: '우리 가족은 네 명이에요.', pronunciation: 'u-ri ga-jo-geun ne myeong-i-e-yo.', chinese: '我家有四口人。', scene: '介绍家庭' },
      { korean: '언니가 있어요.', pronunciation: 'eon-ni-ga i-sseo-yo.', chinese: '我有姐姐。', scene: '介绍兄弟姐妹' },
    ],
    dictations: [
      { korean: '가족이 몇 명이에요?', pronunciation: 'ga-jo-gi myeot myeong-i-e-yo?', chinese: '家里有几口人？' },
      { korean: '네 명이에요', pronunciation: 'ne myeong-i-e-yo', chinese: '四口人' },
      { korean: '오빠가 있어요', pronunciation: 'o-ppa-ga i-sseo-yo', chinese: '我有哥哥' },
      { korean: '아빠는 회사원이에요', pronunciation: 'a-ppa-neun hoe-sa-wo-ni-e-yo', chinese: '爸爸是上班族' },
      { korean: '동생은 학생이에요', pronunciation: 'dong-saeng-eun hak-ssaeng-i-e-yo', chinese: '弟弟/妹妹是学生' },
    ],
    output: {
      prompt: '用韩语介绍你的家人（人数、都有谁）。',
      hint: '우리 가족은 [数字]명이에요 + [称呼]이/가 있어요',
      exampleAnswer: '우리 가족은 네 명이에요. 아빠, 엄마, 언니, 그리고 저예요. 언니는 회사원이에요.',
    },
  },

  {
    day: 11, title: '爱好', titleKo: '취미', emoji: '🎯',
    description: '用韩语谈论你的兴趣爱好',
    words: [
      { korean: '취미', pronunciation: 'chwi-mi', chinese: '爱好', partOfSpeech: '名词', emoji: '🎯' },
      { korean: '좋아하다', pronunciation: 'jo-a-ha-da', chinese: '喜欢', partOfSpeech: '动词', emoji: '❤️' },
      { korean: '음악', pronunciation: 'eu-mak', chinese: '音乐', partOfSpeech: '名词', emoji: '🎵' },
      { korean: '영화', pronunciation: 'yeong-hwa', chinese: '电影', partOfSpeech: '名词', emoji: '🎬' },
      { korean: '운동', pronunciation: 'un-dong', chinese: '运动', partOfSpeech: '名词', emoji: '⚽' },
      { korean: '요리', pronunciation: 'yo-ri', chinese: '做菜', partOfSpeech: '名词', emoji: '🍳' },
      { korean: '여행', pronunciation: 'yeo-haeng', chinese: '旅行', partOfSpeech: '名词', emoji: '✈️' },
      { korean: '사진', pronunciation: 'sa-jin', chinese: '照片/摄影', partOfSpeech: '名词', emoji: '📷' },
    ],
    grammar: {
      name: '을/를 + 좋아하다', nameKo: '을/를',
      explanation: '"을/를"是宾语助词，有收音用"을"，无收音用"를"。"좋아하다"需要宾语。"名词+을/를 좋아해요" = "喜欢…"。',
      pattern: '名词 + 을/를 + 좋아해요',
      example: '저는 음악을 좋아해요.',
      exampleZh: '我喜欢音乐。',
      grammarId: 'gp-10',
    },
    sentences: [
      { korean: '취미가 뭐예요?', pronunciation: 'chwi-mi-ga mwo-ye-yo?', chinese: '你的爱好是什么？', scene: '初次聊天' },
      { korean: '저는 영화를 좋아해요.', pronunciation: 'jeo-neun yeong-hwa-reul jo-a-hae-yo.', chinese: '我喜欢看电影。', scene: '分享爱好' },
      { korean: '주말에 뭐 해요?', pronunciation: 'ju-ma-re mwo hae-yo?', chinese: '周末做什么？', scene: '询问计划' },
    ],
    dictations: [
      { korean: '취미가 뭐예요?', pronunciation: 'chwi-mi-ga mwo-ye-yo?', chinese: '爱好是什么？' },
      { korean: '음악을 좋아해요', pronunciation: 'eu-ma-geul jo-a-hae-yo', chinese: '我喜欢音乐' },
      { korean: '영화 보는 거 좋아해요', pronunciation: 'yeong-hwa bo-neun geo jo-a-hae-yo', chinese: '喜欢看电影' },
      { korean: '주말에 운동해요', pronunciation: 'ju-ma-re un-dong-hae-yo', chinese: '周末运动' },
      { korean: '같이 갈래요?', pronunciation: 'ga-chi gal-lae-yo?', chinese: '一起去吗？' },
    ],
    output: {
      prompt: '用韩语说说你的爱好和周末安排。',
      hint: '제 취미는... + 名词을/를 좋아해요 + 주말에...',
      exampleAnswer: '제 취미는 음악 감상이에요. 케이팝을 좋아해요. 주말에는 친구랑 영화를 봐요.',
    },
  },

  {
    day: 12, title: '点餐', titleKo: '식당 주문', emoji: '🍽️',
    description: '在韩国餐厅用韩语点餐',
    words: [
      { korean: '식당', pronunciation: 'sik-ttang', chinese: '餐厅', partOfSpeech: '名词', emoji: '🍽️' },
      { korean: '메뉴', pronunciation: 'me-nyu', chinese: '菜单', partOfSpeech: '名词', emoji: '📋' },
      { korean: '비빔밥', pronunciation: 'bi-bim-bap', chinese: '拌饭', partOfSpeech: '名词', emoji: '🍚' },
      { korean: '김치', pronunciation: 'gim-chi', chinese: '泡菜', partOfSpeech: '名词', emoji: '🥬' },
      { korean: '물', pronunciation: 'mul', chinese: '水', partOfSpeech: '名词', emoji: '💧' },
      { korean: '더', pronunciation: 'deo', chinese: '再/更多', partOfSpeech: '副词', emoji: '➕' },
      { korean: '맵다', pronunciation: 'maep-tta', chinese: '辣', partOfSpeech: '形容词', emoji: '🌶️' },
      { korean: '맛있다', pronunciation: 'ma-sit-tta', chinese: '好吃', partOfSpeech: '形容词', emoji: '😋' },
    ],
    grammar: {
      name: '주다 / 드리다 (给)', nameKo: '주다',
      explanation: '"주세요"是"주다(给)"的命令/请求形式。"주다"给平辈或晚辈，"드리다"是敬语，给长辈时用。餐厅里对服务员说"주세요"很自然。',
      pattern: '名词 + 주세요 / 드리세요',
      example: '비빔밥 하나 주세요.',
      exampleZh: '请给我一份拌饭。',
    },
    sentences: [
      { korean: '비빔밥 하나랑 김치찌개 하나 주세요.', pronunciation: 'bi-bim-bap ha-na-rang gim-chi-jji-gae ha-na ju-se-yo.', chinese: '请给我一份拌饭和一份泡菜汤。', scene: '点餐' },
      { korean: '이거 많이 매워요?', pronunciation: 'i-geo ma-ni mae-wo-yo?', chinese: '这个很辣吗？', scene: '确认辣度' },
      { korean: '진짜 맛있어요!', pronunciation: 'jin-jja ma-si-sseo-yo!', chinese: '真的很好吃！', scene: '称赞食物' },
    ],
    dictations: [
      { korean: '메뉴 주세요', pronunciation: 'me-nyu ju-se-yo', chinese: '请给我菜单' },
      { korean: '비빔밥 하나 주세요', pronunciation: 'bi-bim-bap ha-na ju-se-yo', chinese: '请给我一份拌饭' },
      { korean: '물 좀 더 주세요', pronunciation: 'mul jom deo ju-se-yo', chinese: '请再给我一点水' },
      { korean: '너무 매워요!', pronunciation: 'neo-mu mae-wo-yo!', chinese: '太辣了！' },
      { korean: '잘 먹겠습니다', pronunciation: 'jal meok-kket-sseum-ni-da', chinese: '我会好好吃的' },
    ],
    output: {
      prompt: '在韩国餐厅点一份拌饭，并评价食物。',
      hint: '비빔밥 하나 주세요 + 정말 맛있어요!',
      exampleAnswer: '비빔밥 하나 주세요. 그리고 물 좀 주세요. 와, 정말 맛있어요!',
    },
  },

  {
    day: 13, title: '购物', titleKo: '쇼핑', emoji: '🛍️',
    description: '在韩国购物，学会问价格和讲价',
    words: [
      { korean: '가게', pronunciation: 'ga-ge', chinese: '商店', partOfSpeech: '名词', emoji: '🏬' },
      { korean: '옷', pronunciation: 'ot', chinese: '衣服', partOfSpeech: '名词', emoji: '👕' },
      { korean: '신발', pronunciation: 'sin-bal', chinese: '鞋子', partOfSpeech: '名词', emoji: '👟' },
      { korean: '싸다', pronunciation: 'ssa-da', chinese: '便宜', partOfSpeech: '形容词', emoji: '💰' },
      { korean: '비싸다', pronunciation: 'bi-ssa-da', chinese: '贵', partOfSpeech: '形容词', emoji: '💸' },
      { korean: '깎다', pronunciation: 'kkak-tta', chinese: '砍价/减价', partOfSpeech: '动词', emoji: '✂️' },
      { korean: '예쁘다', pronunciation: 'ye-ppeu-da', chinese: '漂亮', partOfSpeech: '形容词', emoji: '✨' },
      { korean: '사다', pronunciation: 'sa-da', chinese: '买', partOfSpeech: '动词', emoji: '🛒' },
    ],
    grammar: {
      name: '도 (也)', nameKo: '도',
      explanation: '"도"加在名词后表示"也、还"。代替은/는或이/가的位置。저도 = "我也是"。이것도 = "这个也"。',
      pattern: '名词 + 도',
      example: '저도 이거 사고 싶어요.',
      exampleZh: '我也想买这个。',
    },
    sentences: [
      { korean: '이거 얼마예요?', pronunciation: 'i-geo eol-ma-ye-yo?', chinese: '这个多少钱？', scene: '问价' },
      { korean: '좀 깎아 주세요.', pronunciation: 'jom kka-kka ju-se-yo.', chinese: '请便宜一点。', scene: '讲价' },
      { korean: '이 옷 정말 예뻐요!', pronunciation: 'i ot jeong-mal ye-ppeo-yo!', chinese: '这件衣服真漂亮！', scene: '赞美商品' },
    ],
    dictations: [
      { korean: '이거 얼마예요?', pronunciation: 'i-geo eol-ma-ye-yo?', chinese: '这个多少钱？' },
      { korean: '좀 비싸요', pronunciation: 'jom bi-ssa-yo', chinese: '有点贵' },
      { korean: '깎아 주세요', pronunciation: 'kka-kka ju-se-yo', chinese: '请便宜点' },
      { korean: '이것도 예뻐요', pronunciation: 'i-geot-tto ye-ppeo-yo', chinese: '这个也漂亮' },
      { korean: '살게요!', pronunciation: 'sal-ge-yo!', chinese: '我买了！' },
    ],
    output: {
      prompt: '在韩国商店看中一件衣服，问价格并尝试讲价。',
      hint: '이거 얼마예요? + 좀 깎아 주세요',
      exampleAnswer: '이 옷 정말 예뻐요! 얼마예요? 3만원이요? 좀 비싸요. 깎아 주세요!',
    },
  },

  {
    day: 14, title: '两周复习', titleKo: '2주 복습', emoji: '🎯',
    description: '复习第二周学过的天气、时间、家人、爱好、点餐、购物',
    words: [
      { korean: '벌써', pronunciation: 'beol-sseo', chinese: '已经', partOfSpeech: '副词', emoji: '⏩' },
      { korean: '많이', pronunciation: 'ma-ni', chinese: '很多', partOfSpeech: '副词', emoji: '📈' },
      { korean: '조금', pronunciation: 'jo-geum', chinese: '一点/稍微', partOfSpeech: '副词', emoji: '🤏' },
      { korean: '정말', pronunciation: 'jeong-mal', chinese: '真的', partOfSpeech: '副词', emoji: '💯' },
      { korean: '아직', pronunciation: 'a-jik', chinese: '还/还没', partOfSpeech: '副词', emoji: '⏳' },
      { korean: '자주', pronunciation: 'ja-ju', chinese: '经常', partOfSpeech: '副词', emoji: '🔄' },
      { korean: '가끔', pronunciation: 'ga-kkeum', chinese: '偶尔', partOfSpeech: '副词', emoji: '🔀' },
      { korean: '항상', pronunciation: 'hang-sang', chinese: '总是', partOfSpeech: '副词', emoji: '♾️' },
    ],
    grammar: {
      name: '副词总结', nameKo: '부사',
      explanation: '韩语副词放在动词/形容词前面修饰。많이 좋아해요 = 很喜欢，조금 매워요 = 有点辣，정말 맛있어요 = 真的很好吃。副词不需要变位。',
      pattern: '副词 + 动词/形容词',
      example: '한국어를 정말 좋아해요.',
      exampleZh: '我真的很喜欢韩语。',
    },
    sentences: [
      { korean: '벌써 2주가 지났어요!', pronunciation: 'beol-sseo i-ju-ga ji-na-sseo-yo!', chinese: '已经过了两周了！', scene: '感叹时间' },
      { korean: '한국어가 조금 어려워요.', pronunciation: 'han-gu-geo-ga jo-geum eo-ryeo-wo-yo.', chinese: '韩语有点难。', scene: '表达感受' },
      { korean: '하지만 정말 재미있어요!', pronunciation: 'ha-ji-man jeong-mal jae-mi-i-sseo-yo!', chinese: '但是真的很有趣！', scene: '表达态度' },
    ],
    dictations: [
      { korean: '한국어를 정말 좋아해요', pronunciation: 'han-gu-geo-reul jeong-mal jo-a-hae-yo', chinese: '我真的很喜欢韩语' },
      { korean: '조금 어려워요', pronunciation: 'jo-geum eo-ryeo-wo-yo', chinese: '有点难' },
      { korean: '많이 배웠어요', pronunciation: 'ma-ni bae-wo-sseo-yo', chinese: '学了很多' },
      { korean: '아직 잘 못 해요', pronunciation: 'a-jik jal mot tae-yo', chinese: '还不太会' },
      { korean: '자주 연습할게요', pronunciation: 'ja-ju yeon-seu-pal-ge-yo', chinese: '我会经常练习的' },
    ],
    output: {
      prompt: '总结这两周学韩语的感受。',
      hint: '벌써 2주가 지났어요 + 한국어가... + 하지만...',
      exampleAnswer: '벌써 2주가 지났어요. 한국어가 조금 어려워요. 하지만 정말 재미있어요! 많이 배웠어요.',
    },
  },

  // ── WEEK 3: 社交与表达 (Days 15-21) ──
  {
    day: 15, title: '打电话', titleKo: '전화하기', emoji: '📞',
    description: '学会用韩语打电话的基本对话',
    words: [
      { korean: '전화', pronunciation: 'jeon-hwa', chinese: '电话', partOfSpeech: '名词', emoji: '📞' },
      { korean: '여보세요', pronunciation: 'yeo-bo-se-yo', chinese: '喂（接电话）', partOfSpeech: '常用语', emoji: '📱' },
      { korean: '통화하다', pronunciation: 'tong-hwa-ha-da', chinese: '通话', partOfSpeech: '动词', emoji: '🗣️' },
      { korean: '문자', pronunciation: 'mun-jja', chinese: '短信', partOfSpeech: '名词', emoji: '💬' },
      { korean: '전화번호', pronunciation: 'jeon-hwa-beon-ho', chinese: '电话号码', partOfSpeech: '名词', emoji: '🔢' },
      { korean: '기다리다', pronunciation: 'gi-da-ri-da', chinese: '等待', partOfSpeech: '动词', emoji: '⏳' },
      { korean: '바꾸다', pronunciation: 'ba-kku-da', chinese: '换/转接', partOfSpeech: '动词', emoji: '🔄' },
      { korean: '끊다', pronunciation: 'kkeun-ta', chinese: '挂断', partOfSpeech: '动词', emoji: '❌' },
    ],
    grammar: {
      name: '지만 (但是)', nameKo: '지만',
      explanation: '"지만"接在动词/形容词词干后，表示转折"虽然…但是…"。口语中使用频率极高。미안하지만 = "不好意思，但是…"。',
      pattern: '词干 + 지만',
      example: '미안하지만 지금 통화할 수 없어요.',
      exampleZh: '不好意思，但现在不方便通话。',
      grammarId: 'gp-26',
    },
    sentences: [
      { korean: '여보세요? 지민 씨 있어요?', pronunciation: 'yeo-bo-se-yo? ji-min ssi i-sseo-yo?', chinese: '喂？智敏在吗？', scene: '打电话找人' },
      { korean: '잠시만 기다리세요.', pronunciation: 'jam-si-man gi-da-ri-se-yo.', chinese: '请稍等一下。', scene: '让对方等候' },
      { korean: '문자 보내 주세요.', pronunciation: 'mun-jja bo-nae ju-se-yo.', chinese: '请发短信给我。', scene: '改用短信' },
    ],
    dictations: [
      { korean: '여보세요?', pronunciation: 'yeo-bo-se-yo?', chinese: '喂？' },
      { korean: '잠시만요', pronunciation: 'jam-si-man-nyo', chinese: '请稍等' },
      { korean: '전화번호가 뭐예요?', pronunciation: 'jeon-hwa-beon-ho-ga mwo-ye-yo?', chinese: '电话号码是多少？' },
      { korean: '문자 보낼게요', pronunciation: 'mun-jja bo-nael-ge-yo', chinese: '我会发短信的' },
      { korean: '나중에 전화할게요', pronunciation: 'na-jung-e jeon-hwa-hal-ge-yo', chinese: '我晚点打给你' },
    ],
    output: {
      prompt: '给朋友打一个电话，约见面时间。',
      hint: '여보세요? + [名字]씨 있어요? + [时间]에 만나요',
      exampleAnswer: '여보세요? 지민 씨 있어요? 저 수현이에요. 내일 오후 3시에 만날 수 있어요?',
    },
  },

  {
    day: 16, title: '表达感受', titleKo: '감정 표현', emoji: '😊',
    description: '用韩语表达开心、难过、担心等各种情绪',
    words: [
      { korean: '기분', pronunciation: 'gi-bun', chinese: '心情', partOfSpeech: '名词', emoji: '💭' },
      { korean: '기쁘다', pronunciation: 'gi-ppeu-da', chinese: '开心/高兴', partOfSpeech: '形容词', emoji: '😊' },
      { korean: '슬프다', pronunciation: 'seul-peu-da', chinese: '悲伤', partOfSpeech: '形容词', emoji: '😢' },
      { korean: '화나다', pronunciation: 'hwa-na-da', chinese: '生气', partOfSpeech: '动词', emoji: '😤' },
      { korean: '걱정하다', pronunciation: 'geok-ijeong-ha-da', chinese: '担心', partOfSpeech: '动词', emoji: '😟' },
      { korean: '피곤하다', pronunciation: 'pi-gon-ha-da', chinese: '疲惫', partOfSpeech: '形容词', emoji: '😫' },
      { korean: '신나다', pronunciation: 'sin-na-da', chinese: '兴奋/激动', partOfSpeech: '动词', emoji: '🎉' },
      { korean: '행복하다', pronunciation: 'haeng-bo-ka-da', chinese: '幸福', partOfSpeech: '形容词', emoji: '💖' },
    ],
    grammar: {
      name: '아/어서 (原因)', nameKo: '아/어서',
      explanation: '"아/어서"接在动词/形容词词干后表示原因，"因为…所以…"。注意：不能用于命令句和请诱句。',
      pattern: '词干 + 아서/어서/해서',
      example: '피곤해서 집에 가고 싶어요.',
      exampleZh: '因为累了，所以想回家。',
      grammarId: 'gp-27',
    },
    sentences: [
      { korean: '오늘 기분이 어때요?', pronunciation: 'o-neul gi-bu-ni eo-ttae-yo?', chinese: '今天心情怎么样？', scene: '关心朋友' },
      { korean: '친구를 만나서 기뻐요.', pronunciation: 'chin-gu-reul man-na-seo gi-ppeo-yo.', chinese: '见到朋友所以很开心。', scene: '解释原因' },
      { korean: '피곤해서 좀 쉬고 싶어요.', pronunciation: 'pi-go-nae-seo jom swi-go si-peo-yo.', chinese: '累了想休息一下。', scene: '表达需要' },
    ],
    dictations: [
      { korean: '기분이 좋아요', pronunciation: 'gi-bu-ni jo-a-yo', chinese: '心情很好' },
      { korean: '너무 슬퍼요', pronunciation: 'neo-mu seul-peo-yo', chinese: '很难过' },
      { korean: '걱정하지 마세요', pronunciation: 'geok-ijeong-ha-ji ma-se-yo', chinese: '别担心' },
      { korean: '정말 행복해요', pronunciation: 'jeong-mal haeng-bo-kae-yo', chinese: '真的很幸福' },
      { korean: '신나요!', pronunciation: 'sin-na-yo!', chinese: '好兴奋！' },
    ],
    output: {
      prompt: '表达你今天的心情，并说明原因。',
      hint: '오늘 기분이... + 原因用아/어서',
      exampleAnswer: '오늘 기분이 좋아요. 친구를 만나서 정말 신나요!',
    },
  },

  {
    day: 17, title: '请求帮助', titleKo: '도움 요청', emoji: '🆘',
    description: '学会用韩语向别人请求帮助',
    words: [
      { korean: '도움', pronunciation: 'do-um', chinese: '帮助', partOfSpeech: '名词', emoji: '🆘' },
      { korean: '도와주다', pronunciation: 'do-wa-ju-da', chinese: '帮助（给帮助）', partOfSpeech: '动词', emoji: '🤝' },
      { korean: '부탁하다', pronunciation: 'bu-ta-ka-da', chinese: '拜托/请求', partOfSpeech: '动词', emoji: '🙏' },
      { korean: '알려 주다', pronunciation: 'al-lyeo ju-da', chinese: '告诉/告知', partOfSpeech: '动词', emoji: 'ℹ️' },
      { korean: '가르치다', pronunciation: 'ga-reu-chi-da', chinese: '教', partOfSpeech: '动词', emoji: '👩‍🏫' },
      { korean: '모르다', pronunciation: 'mo-reu-da', chinese: '不知道', partOfSpeech: '动词', emoji: '🤷' },
      { korean: '알다', pronunciation: 'al-da', chinese: '知道', partOfSpeech: '动词', emoji: '💡' },
      { korean: '괜찮다', pronunciation: 'gwaen-chan-ta', chinese: '没关系/没事', partOfSpeech: '形容词', emoji: '👌' },
    ],
    grammar: {
      name: '아/어 주다 (为某人做)', nameKo: '아/어 주다',
      explanation: '"아/어 주다"表示"为别人做某事"，带有恩惠/服务的意味。도와주세요 = 请帮我。가르쳐 주세요 = 请教我。这是最实用句型之一。',
      pattern: '动词词干 + 아/어 주세요',
      example: '한국어를 가르쳐 주세요.',
      exampleZh: '请教我韩语。',
      grammarId: 'gp-30',
    },
    sentences: [
      { korean: '도와주세요!', pronunciation: 'do-wa-ju-se-yo!', chinese: '请帮帮我！', scene: '紧急求助' },
      { korean: '이거 좀 알려 주세요.', pronunciation: 'i-geo jom al-lyeo ju-se-yo.', chinese: '请告诉我这个。', scene: '请求信息' },
      { korean: '한국어를 가르쳐 주실 수 있어요?', pronunciation: 'han-gu-geo-reul ga-reu-chyeo ju-sil su i-sseo-yo?', chinese: '可以教我韩语吗？', scene: '请求教学' },
    ],
    dictations: [
      { korean: '도와주세요!', pronunciation: 'do-wa-ju-se-yo!', chinese: '请帮帮我！' },
      { korean: '한국어를 가르쳐 주세요', pronunciation: 'han-gu-geo-reul ga-reu-chyeo ju-se-yo', chinese: '请教我韩语' },
      { korean: '잘 모르겠어요', pronunciation: 'jal mo-reu-ge-sseo-yo', chinese: '不太懂' },
      { korean: '알려 주셔서 감사합니다', pronunciation: 'al-lyeo ju-syeo-seo gam-sa-ham-ni-da', chinese: '谢谢你告诉我' },
      { korean: '괜찮아요', pronunciation: 'gwaen-cha-na-yo', chinese: '没关系' },
    ],
    output: {
      prompt: '请教朋友一个韩语单词怎么读。',
      hint: '이거 어떻게 읽어요? + 알려 주세요',
      exampleAnswer: '언니, 이 단어를 어떻게 읽어요? 좀 가르쳐 주세요!',
    },
  },

  {
    day: 18, title: '道歉和原谅', titleKo: '사과와 용서', emoji: '🙇',
    description: '学会道歉、接受道歉和表达原谅',
    words: [
      { korean: '미안하다', pronunciation: 'mi-a-na-da', chinese: '对不起', partOfSpeech: '形容词', emoji: '😔' },
      { korean: '실수', pronunciation: 'sil-ssu', chinese: '失误/错误', partOfSpeech: '名词', emoji: '💢' },
      { korean: '용서', pronunciation: 'yong-seo', chinese: '原谅', partOfSpeech: '名词', emoji: '🕊️' },
      { korean: '늦다', pronunciation: 'neut-tta', chinese: '迟到', partOfSpeech: '动词', emoji: '🏃' },
      { korean: '잊다', pronunciation: 'it-tta', chinese: '忘记', partOfSpeech: '动词', emoji: '💨' },
      { korean: '약속', pronunciation: 'yak-sok', chinese: '约定', partOfSpeech: '名词', emoji: '🤙' },
      { korean: '괜찮다', pronunciation: 'gwaen-chan-ta', chinese: '没关系/没事', partOfSpeech: '形容词', emoji: '👌' },
      { korean: '다음', pronunciation: 'da-eum', chinese: '下次', partOfSpeech: '名词', emoji: '⏭️' },
    ],
    grammar: {
      name: '지 못하다 (不能/没能)', nameKo: '지 못하다',
      explanation: '"지 못하다"表示"没能做到…"，比"안"更正式地表达客观原因导致的无法做到。약속을 지키지 못했어요 = 没能遵守约定。',
      pattern: '动词词干 + 지 못했어요',
      example: '약속을 지키지 못해서 미안해요.',
      exampleZh: '没能遵守约定，对不起。',
      grammarId: 'gp-15',
    },
    sentences: [
      { korean: '늦어서 죄송합니다.', pronunciation: 'neu-jeo-seo joe-song-ham-ni-da.', chinese: '迟到了很抱歉。', scene: '正式道歉' },
      { korean: '미안해요, 깜빡했어요.', pronunciation: 'mi-an-hae-yo, kkam-ppak-hae-sseo-yo.', chinese: '对不起，我忘了。', scene: '忘记某事' },
      { korean: '괜찮아요, 다음에 조심하세요.', pronunciation: 'gwaen-cha-na-yo, da-eu-me jo-si-ma-se-yo.', chinese: '没关系，下次注意。', scene: '原谅对方' },
    ],
    dictations: [
      { korean: '늦어서 미안해요', pronunciation: 'neu-jeo-seo mi-an-hae-yo', chinese: '迟到了对不起' },
      { korean: '깜빡했어요', pronunciation: 'kkam-ppak-hae-sseo-yo', chinese: '我忘了' },
      { korean: '괜찮아요', pronunciation: 'gwaen-cha-na-yo', chinese: '没关系' },
      { korean: '다음에는 안 늦을게요', pronunciation: 'da-eu-me-neun an neu-jeul-ge-yo', chinese: '下次不会迟到了' },
      { korean: '용서해 주세요', pronunciation: 'yong-seo-hae ju-se-yo', chinese: '请原谅我' },
    ],
    output: {
      prompt: '你迟到了，写一段道歉的话。',
      hint: '늦어서 미안해요 + 이유 + 다음에는...',
      exampleAnswer: '늦어서 정말 미안해요. 버스가 안 와서 늦었어요. 다음에는 일찍 나올게요!',
    },
  },

  {
    day: 19, title: '交通', titleKo: '교통', emoji: '🚌',
    description: '在韩国乘坐公共交通工具的基本用语',
    words: [
      { korean: '버스', pronunciation: 'beo-seu', chinese: '公交车', partOfSpeech: '名词', emoji: '🚌' },
      { korean: '지하철', pronunciation: 'ji-ha-cheol', chinese: '地铁', partOfSpeech: '名词', emoji: '🚇' },
      { korean: '택시', pronunciation: 'taek-ssi', chinese: '出租车', partOfSpeech: '名词', emoji: '🚕' },
      { korean: '정류장', pronunciation: 'jeong-nyu-jang', chinese: '站台/车站', partOfSpeech: '名词', emoji: '🚏' },
      { korean: '타다', pronunciation: 'ta-da', chinese: '乘坐', partOfSpeech: '动词', emoji: '🚶' },
      { korean: '내리다', pronunciation: 'nae-ri-da', chinese: '下车', partOfSpeech: '动词', emoji: '🚶‍♂️' },
      { korean: '교통카드', pronunciation: 'gyo-tong-ka-deu', chinese: '交通卡', partOfSpeech: '名词', emoji: '💳' },
      { korean: '갈아타다', pronunciation: 'ga-ra-ta-da', chinese: '换乘', partOfSpeech: '动词', emoji: '🔄' },
    ],
    grammar: {
      name: '에서 (起点) / 까지 (终点)', nameKo: '에서/까지',
      explanation: '"에서"表示动作发生的场所或出发点，"까지"表示到达点。"…에서 …까지" = "从…到…"。',
      pattern: '场所 + 에서 + 场所 + 까지',
      example: '집에서 학교까지 버스로 가요.',
      exampleZh: '从家到学校坐公交去。',
      grammarId: 'gp-09',
    },
    sentences: [
      { korean: '버스 정류장이 어디예요?', pronunciation: 'beo-seu jeong-nyu-jang-i eo-di-ye-yo?', chinese: '公交站在哪里？', scene: '找车站' },
      { korean: '여기에서 내려야 돼요?', pronunciation: 'yeo-gi-e-seo nae-ryeo-ya dwae-yo?', chinese: '这里要下车吗？', scene: '确认下车' },
      { korean: '2호선으로 갈아타야 돼요.', pronunciation: 'i-ho-seo-neu-ro ga-ra-ta-ya dwae-yo.', chinese: '要换乘2号线。', scene: '说明换乘' },
    ],
    dictations: [
      { korean: '지하철역이 어디예요?', pronunciation: 'ji-ha-cheol-yeok-i eo-di-ye-yo?', chinese: '地铁站在哪？' },
      { korean: '버스 타고 가요', pronunciation: 'beo-seu ta-go ga-yo', chinese: '坐公交去' },
      { korean: '여기서 내려요', pronunciation: 'yeo-gi-seo nae-ryeo-yo', chinese: '这里下车' },
      { korean: '몇 호선 타야 돼요?', pronunciation: 'myeot ho-seon ta-ya dwae-yo?', chinese: '坐几号线？' },
      { korean: '택시 불러 주세요', pronunciation: 'taek-ssi bul-leo ju-se-yo', chinese: '请帮我叫出租车' },
    ],
    output: {
      prompt: '说明从你家到学校的交通方式。',
      hint: '집에서... + (交通工具)로 가요 + 시간...',
      exampleAnswer: '집에서 버스를 타고 지하철역까지 가요. 그리고 지하철로 학교에 가요. 30분쯤 걸려요.',
    },
  },

  {
    day: 20, title: '医院', titleKo: '병원', emoji: '🏥',
    description: '在韩国看医生时的基本表达',
    words: [
      { korean: '병원', pronunciation: 'byeong-won', chinese: '医院', partOfSpeech: '名词', emoji: '🏥' },
      { korean: '의사', pronunciation: 'ui-sa', chinese: '医生', partOfSpeech: '名词', emoji: '👨‍⚕️' },
      { korean: '아프다', pronunciation: 'a-peu-da', chinese: '疼/生病', partOfSpeech: '形容词', emoji: '🤒' },
      { korean: '머리', pronunciation: 'meo-ri', chinese: '头', partOfSpeech: '名词', emoji: '🗣️' },
      { korean: '배', pronunciation: 'bae', chinese: '肚子', partOfSpeech: '名词', emoji: '🤰' },
      { korean: '약', pronunciation: 'yak', chinese: '药', partOfSpeech: '名词', emoji: '💊' },
      { korean: '열', pronunciation: 'yeol', chinese: '发烧/烧', partOfSpeech: '名词', emoji: '🌡️' },
      { korean: '감기', pronunciation: 'gam-gi', chinese: '感冒', partOfSpeech: '名词', emoji: '🤧' },
    ],
    grammar: {
      name: '아/어서 (症状说明)', nameKo: '아/어서',
      explanation: '用"아/어서"连接两个句子说明原因。在就医时用于描述症状和原因。감기에 걸려서 = "因为感冒了"。',
      pattern: '症状词干 + 아서/어서 + 后续',
      example: '머리가 아파서 병원에 왔어요.',
      exampleZh: '因为头疼所以来医院了。',
      grammarId: 'gp-27',
    },
    sentences: [
      { korean: '머리가 아파요.', pronunciation: 'meo-ri-ga a-pa-yo.', chinese: '我头疼。', scene: '描述症状' },
      { korean: '열이 나서 병원에 왔어요.', pronunciation: 'yeo-ri na-seo byeong-won-e wa-sseo-yo.', chinese: '发烧了所以来医院。', scene: '说明来意' },
      { korean: '이 약을 하루에 세 번 드세요.', pronunciation: 'i ya-geul ha-ru-e se beon deu-se-yo.', chinese: '这个药一天吃三次。', scene: '医嘱' },
    ],
    dictations: [
      { korean: '머리가 아파요', pronunciation: 'meo-ri-ga a-pa-yo', chinese: '头疼' },
      { korean: '배가 아파요', pronunciation: 'bae-ga a-pa-yo', chinese: '肚子疼' },
      { korean: '감기에 걸렸어요', pronunciation: 'gam-gi-e geol-lyeo-sseo-yo', chinese: '感冒了' },
      { korean: '약을 먹으세요', pronunciation: 'ya-geul meo-geu-se-yo', chinese: '请吃药' },
      { korean: '빨리 나으세요', pronunciation: 'ppal-li na-eu-se-yo', chinese: '祝早日康复' },
    ],
    output: {
      prompt: '描述你的身体不适并说明需要看医生。',
      hint: '…이/가 아파요 + 병원에 가야 돼요',
      exampleAnswer: '어제부터 머리가 아파요. 열도 조금 나요. 병원에 가야 될 것 같아요.',
    },
  },

  {
    day: 21, title: '三周复习', titleKo: '3주 복습', emoji: '🏆',
    description: '回顾前三周内容，检验学习成果',
    words: [
      { korean: '대화', pronunciation: 'dae-hwa', chinese: '对话', partOfSpeech: '名词', emoji: '💬' },
      { korean: '자신있다', pronunciation: 'ja-si-nit-tta', chinese: '有自信', partOfSpeech: '形容词', emoji: '💪' },
      { korean: '실력', pronunciation: 'sil-lyeok', chinese: '实力/水平', partOfSpeech: '名词', emoji: '📊' },
      { korean: '늘다', pronunciation: 'neul-da', chinese: '提高/增长', partOfSpeech: '动词', emoji: '📈' },
      { korean: '자랑하다', pronunciation: 'ja-rang-ha-da', chinese: '炫耀', partOfSpeech: '动词', emoji: '😎' },
      { korean: '소개하다', pronunciation: 'so-gae-ha-da', chinese: '介绍', partOfSpeech: '动词', emoji: '📢' },
      { korean: '이야기하다', pronunciation: 'i-ya-gi-ha-da', chinese: '聊天/讲故事', partOfSpeech: '动词', emoji: '🗣️' },
      { korean: '연습하다', pronunciation: 'yeon-seu-pa-da', chinese: '练习', partOfSpeech: '动词', emoji: '🏋️' },
    ],
    grammar: {
      name: '을/ㄹ 수 있다 (能力)', nameKo: '을/ㄹ 수 있다',
      explanation: '表示"可以/能够做某事"。有收音用"을"，无收音用"ㄹ"。이제 한국어로 대화할 수 있어요 = "现在可以用韩语对话了"。',
      pattern: '动词词干 + 을/ㄹ 수 있다',
      example: '이제 한국어로 주문할 수 있어요!',
      exampleZh: '现在可以用韩语点餐了！',
      grammarId: 'gp-29',
    },
    sentences: [
      { korean: '이제 한국어로 주문할 수 있어요!', pronunciation: 'i-je han-gu-geo-ro ju-mun-hal su i-sseo-yo!', chinese: '现在可以用韩语点餐了！', scene: '展示成果' },
      { korean: '한국어 실력이 많이 늘었어요.', pronunciation: 'han-gu-geo sil-lyeo-gi ma-ni neu-reo-sseo-yo.', chinese: '韩语水平提高了很多。', scene: '评价进步' },
      { korean: '자랑하고 싶어요!', pronunciation: 'ja-rang-ha-go si-peo-yo!', chinese: '好想炫耀一下！', scene: '表达自豪' },
    ],
    dictations: [
      { korean: '이제 대화할 수 있어요', pronunciation: 'i-je dae-hwa-hal su i-sseo-yo', chinese: '现在可以对话了' },
      { korean: '실력이 늘었어요', pronunciation: 'sil-lyeo-gi neu-reo-sseo-yo', chinese: '水平提高了' },
      { korean: '한국어를 잘 하고 싶어요', pronunciation: 'han-gu-geo-reul jal ha-go si-peo-yo', chinese: '想把韩语学好' },
      { korean: '매일 연습할게요', pronunciation: 'mae-il yeon-seu-pal-ge-yo', chinese: '我会每天练习的' },
      { korean: '자신 있어요!', pronunciation: 'ja-si-ni-sseo-yo!', chinese: '我有自信！' },
    ],
    output: {
      prompt: '用韩语写一段话，说说你进步最大的方面。',
      hint: '3주 동안... + 이제... + 을/ㄹ 수 있어요',
      exampleAnswer: '3주 동안 한국어를 열심히 공부했어요. 이제 한국어로 인사하고 주문할 수 있어요. 정말 뿌듯해요!',
    },
  },

  // ── WEEK 4: 进阶日常 (Days 22-28) ──
  {
    day: 22, title: '计划未来', titleKo: '미래 계획', emoji: '🔮',
    description: '用韩语谈论未来的计划和梦想',
    words: [
      { korean: '계획', pronunciation: 'gye-hoek', chinese: '计划', partOfSpeech: '名词', emoji: '📋' },
      { korean: '꿈', pronunciation: 'kkum', chinese: '梦想', partOfSpeech: '名词', emoji: '🌟' },
      { korean: '미래', pronunciation: 'mi-rae', chinese: '未来', partOfSpeech: '名词', emoji: '🔮' },
      { korean: '내년', pronunciation: 'nae-nyeon', chinese: '明年', partOfSpeech: '名词', emoji: '📅' },
      { korean: '취직하다', pronunciation: 'chwi-ji-ka-da', chinese: '就业', partOfSpeech: '动词', emoji: '💼' },
      { korean: '유학', pronunciation: 'yu-hak', chinese: '留学', partOfSpeech: '名词', emoji: '✈️' },
      { korean: '준비하다', pronunciation: 'jun-bi-ha-da', chinese: '准备', partOfSpeech: '动词', emoji: '🎒' },
      { korean: '성공하다', pronunciation: 'seong-gong-ha-da', chinese: '成功', partOfSpeech: '动词', emoji: '🏆' },
    ],
    grammar: {
      name: '을/ㄹ 거예요 (将来)', nameKo: '을/ㄹ 거예요',
      explanation: '表示将来要做某事或将会发生某事，相当于"会…/要…"。有收音用"을"，无收音用"ㄹ"。是最常用的将来时表达。',
      pattern: '动词词干 + 을/ㄹ 거예요',
      example: '내년에 한국에 갈 거예요.',
      exampleZh: '明年要去韩国。',
      grammarId: 'gp-24',
    },
    sentences: [
      { korean: '내년에 한국에 갈 거예요.', pronunciation: 'nae-nyeo-ne han-gu-ge gal geo-ye-yo.', chinese: '明年我要去韩国。', scene: '旅行计划' },
      { korean: '한국어를 계속 공부할 거예요.', pronunciation: 'han-gu-geo-reul gye-sok gong-bu-hal geo-ye-yo.', chinese: '我会继续学韩语。', scene: '学习计划' },
      { korean: '꿈을 위해 열심히 준비할 거예요.', pronunciation: 'kku-meul wi-hae yeol-sim-hi jun-bi-hal geo-ye-yo.', chinese: '为了梦想我会努力准备。', scene: '表达决心' },
    ],
    dictations: [
      { korean: '한국에 갈 거예요', pronunciation: 'han-gu-ge gal geo-ye-yo', chinese: '会去韩国' },
      { korean: '열심히 공부할 거예요', pronunciation: 'yeol-sim-hi gong-bu-hal geo-ye-yo', chinese: '会努力学习' },
      { korean: '꿈이 뭐예요?', pronunciation: 'kku-mi mwo-ye-yo?', chinese: '你梦想是什么？' },
      { korean: '준비 다 했어요', pronunciation: 'jun-bi da hae-sseo-yo', chinese: '准备好了' },
      { korean: '꼭 성공할 거예요', pronunciation: 'kkok seong-gong-hal geo-ye-yo', chinese: '一定会成功的' },
    ],
    output: {
      prompt: '用韩语说说你明年的计划。',
      hint: '내년에... + 을/ㄹ 거예요',
      exampleAnswer: '내년에 한국 여행을 갈 거예요. 한국어를 더 열심히 공부할 거예요. 그리고 한국 친구를 만들고 싶어요.',
    },
  },

  {
    day: 23, title: '比较', titleKo: '비교하기', emoji: '⚖️',
    description: '学会比较事物，表达"比…更…"',
    words: [
      { korean: '더', pronunciation: 'deo', chinese: '更', partOfSpeech: '副词', emoji: '➕' },
      { korean: '보다', pronunciation: 'bo-da', chinese: '比…', partOfSpeech: '助词', emoji: '⚖️' },
      { korean: '제일', pronunciation: 'je-il', chinese: '最', partOfSpeech: '副词', emoji: '🥇' },
      { korean: '비슷하다', pronunciation: 'bi-seu-ta-da', chinese: '差不多', partOfSpeech: '形容词', emoji: '🟰' },
      { korean: '다르다', pronunciation: 'da-reu-da', chinese: '不同', partOfSpeech: '形容词', emoji: '🔀' },
      { korean: '같다', pronunciation: 'gat-tta', chinese: '相同', partOfSpeech: '形容词', emoji: '✅' },
      { korean: '크다', pronunciation: 'keu-da', chinese: '大', partOfSpeech: '形容词', emoji: '📏' },
      { korean: '작다', pronunciation: 'jak-tta', chinese: '小', partOfSpeech: '形容词', emoji: '📐' },
    ],
    grammar: {
      name: '보다 (比较)', nameKo: '보다',
      explanation: '"보다"加在名词后表示比较的对象，"比…"。A보다 B가 더 좋아요 = B比A更好。더常和보다搭配使用。',
      pattern: '名词 + 보다 + 더 + 形容词',
      example: '커피보다 차가 더 좋아요.',
      exampleZh: '比起咖啡，茶更好。（茶比咖啡好）',
    },
    sentences: [
      { korean: '한국어보다 영어가 더 쉬워요.', pronunciation: 'han-gu-geo-bo-da yeong-eo-ga deo swi-wo-yo.', chinese: '比起韩语，英语更简单。', scene: '比较语言' },
      { korean: '이게 저것보다 더 예뻐요.', pronunciation: 'i-ge jeo-geot-ppo-da deo ye-ppeo-yo.', chinese: '这个比那个更漂亮。', scene: '比较商品' },
      { korean: '된장찌개가 제일 맛있어요!', pronunciation: 'doen-jang-jji-gae-ga je-il ma-si-sseo-yo!', chinese: '大酱汤最好吃！', scene: '评价食物' },
    ],
    dictations: [
      { korean: '이게 더 좋아요', pronunciation: 'i-ge deo jo-a-yo', chinese: '这个更好' },
      { korean: '한국이 더 추워요', pronunciation: 'han-gu-gi deo chu-wo-yo', chinese: '韩国更冷' },
      { korean: '뭐가 제일 좋아요?', pronunciation: 'mwo-ga je-il jo-a-yo?', chinese: '什么最好？' },
      { korean: '비슷해요', pronunciation: 'bi-seu-tae-yo', chinese: '差不多' },
      { korean: '달라요', pronunciation: 'dal-la-yo', chinese: '不一样' },
    ],
    output: {
      prompt: '比较中韩两国的饮食或文化差异。',
      hint: '중국보다 한국이... + 더...',
      exampleAnswer: '중국 음식보다 한국 음식이 더 매워요. 하지만 둘 다 정말 맛있어요!',
    },
  },

  {
    day: 24, title: '过去经历', titleKo: '과거 경험', emoji: '📖',
    description: '用韩语描述过去的经历',
    words: [
      { korean: '경험', pronunciation: 'gyeong-heom', chinese: '经历/经验', partOfSpeech: '名词', emoji: '📖' },
      { korean: '예전', pronunciation: 'ye-jeon', chinese: '以前', partOfSpeech: '名词', emoji: '⏪' },
      { korean: '처음', pronunciation: 'cheo-eum', chinese: '第一次', partOfSpeech: '名词', emoji: '1️⃣' },
      { korean: '기억', pronunciation: 'gi-eok', chinese: '记忆', partOfSpeech: '名词', emoji: '🧠' },
      { korean: '여행', pronunciation: 'yeo-haeng', chinese: '旅行', partOfSpeech: '名词', emoji: '✈️' },
      { korean: '재미있다', pronunciation: 'jae-mi-it-tta', chinese: '有趣', partOfSpeech: '形容词', emoji: '😄' },
      { korean: '힘들다', pronunciation: 'him-deul-da', chinese: '辛苦', partOfSpeech: '形容词', emoji: '😥' },
      { korean: '잊다', pronunciation: 'it-tta', chinese: '忘记', partOfSpeech: '动词', emoji: '💨' },
    ],
    grammar: {
      name: '았/었어요 (过去时)', nameKo: '았/었어요',
      explanation: '动词/形容词的过去时。阳性元音(ㅏㅗ)后用았어요，其他用었어요，하다→했어요。这是韩语最基本的过去时表达。',
      pattern: '词干 + 았어요/었어요/했어요',
      example: '작년에 한국에 갔어요.',
      exampleZh: '去年去了韩国。',
      grammarId: 'gp-23',
    },
    sentences: [
      { korean: '작년에 한국에 갔어요.', pronunciation: 'jang-nyeo-ne han-gu-ge ga-sseo-yo.', chinese: '去年去了韩国。', scene: '分享经历' },
      { korean: '처음 한국어를 배울 때 힘들었어요.', pronunciation: 'cheo-eum han-gu-geo-reul bae-ul ttae him-deu-reo-sseo-yo.', chinese: '第一次学韩语时很辛苦。', scene: '回忆过去' },
      { korean: '그때 정말 재미있었어요!', pronunciation: 'geu-ttae jeong-mal jae-mi-i-sseo-sseo-yo!', chinese: '那时候真的很有趣！', scene: '感慨' },
    ],
    dictations: [
      { korean: '한국에 갔어요', pronunciation: 'han-gu-ge ga-sseo-yo', chinese: '去了韩国' },
      { korean: '정말 재미있었어요', pronunciation: 'jeong-mal jae-mi-i-sseo-sseo-yo', chinese: '真的很有趣' },
      { korean: '처음 봤어요', pronunciation: 'cheo-eum bwa-sseo-yo', chinese: '第一次见' },
      { korean: '기억이 안 나요', pronunciation: 'gi-eo-gi an na-yo', chinese: '不记得了' },
      { korean: '잊지 못할 거예요', pronunciation: 'it-ji mo-tal geo-ye-yo', chinese: '忘不了' },
    ],
    output: {
      prompt: '写一段你最难忘的旅行经历。',
      hint: '[时间]에 [地点]에 갔어요 + 정말... + 았/었어요',
      exampleAnswer: '작년 여름에 제주도에 갔어요. 날씨가 정말 좋았어요. 바다도 아름다웠어요. 정말 잊지 못할 여행이었어요.',
    },
  },

  {
    day: 25, title: '建议和推荐', titleKo: '추천과 조언', emoji: '💡',
    description: '学会向别人推荐和给出建议',
    words: [
      { korean: '추천하다', pronunciation: 'chu-cheon-ha-da', chinese: '推荐', partOfSpeech: '动词', emoji: '👍' },
      { korean: '조언', pronunciation: 'jo-eon', chinese: '建议', partOfSpeech: '名词', emoji: '💡' },
      { korean: '꼭', pronunciation: 'kkok', chinese: '一定/务必', partOfSpeech: '副词', emoji: '❗' },
      { korean: '한번', pronunciation: 'han-beon', chinese: '一次/试试', partOfSpeech: '副词', emoji: '👆' },
      { korean: '해 보다', pronunciation: 'hae bo-da', chinese: '试试看', partOfSpeech: '动词', emoji: '🔍' },
      { korean: '좋을 것 같다', pronunciation: 'jo-eul geot gat-tta', chinese: '应该不错', partOfSpeech: '短语', emoji: '🤔' },
      { korean: '최고', pronunciation: 'choe-go', chinese: '最好/最棒', partOfSpeech: '名词', emoji: '👑' },
      { korean: '인기', pronunciation: 'in-gi', chinese: '人气', partOfSpeech: '名词', emoji: '🔥' },
    ],
    grammar: {
      name: '아/어 보다 (尝试)', nameKo: '아/어 보다',
      explanation: '"아/어 보다"表示"试着做…"。한번 해 보세요 = 请试试看。먹어 봤어요? = 你吃过了吗/你试过了吗？',
      pattern: '动词词干 + 아/어 보세요',
      example: '이거 한번 먹어 보세요!',
      exampleZh: '请尝尝这个！',
      grammarId: 'gp-30',
    },
    sentences: [
      { korean: '이거 한번 먹어 보세요!', pronunciation: 'i-geo han-beon meo-geo bo-se-yo!', chinese: '请尝尝这个！', scene: '推荐食物' },
      { korean: '경복궁에 꼭 가 보세요.', pronunciation: 'gyeong-bok-gung-e kkok ga bo-se-yo.', chinese: '一定要去景福宫看看。', scene: '推荐景点' },
      { korean: '매일 조금씩 공부하는 게 좋을 것 같아요.', pronunciation: 'mae-il jo-geum-ssik gong-bu-ha-neun ge jo-eul geot ga-ta-yo.', chinese: '每天学一点比较好。', scene: '给建议' },
    ],
    dictations: [
      { korean: '꼭 해 보세요', pronunciation: 'kkok hae bo-se-yo', chinese: '一定要试试' },
      { korean: '이거 먹어 봤어요?', pronunciation: 'i-geo meo-geo bwa-sseo-yo?', chinese: '吃过这个吗？' },
      { korean: '정말 좋아요', pronunciation: 'jeong-mal jo-a-yo', chinese: '真的很棒' },
      { korean: '인기가 많아요', pronunciation: 'in-gi-ga ma-na-yo', chinese: '很受欢迎' },
      { korean: '최고예요!', pronunciation: 'choe-go-ye-yo!', chinese: '最棒了！' },
    ],
    output: {
      prompt: '给要去首尔旅行的朋友推荐3个地方或美食。',
      hint: '...에 꼭 가 보세요 + ...을/를 꼭 먹어 보세요',
      exampleAnswer: '서울에 가면 홍대에 꼭 가 보세요! 그리고 떡볶이를 꼭 먹어 보세요. 경복궁도 정말 좋아요!',
    },
  },

  {
    day: 26, title: '描述外貌', titleKo: '외모 묘사', emoji: '👤',
    description: '学会描述人的外貌和特征',
    words: [
      { korean: '키', pronunciation: 'ki', chinese: '身高', partOfSpeech: '名词', emoji: '📏' },
      { korean: '크다', pronunciation: 'keu-da', chinese: '高/大', partOfSpeech: '形容词', emoji: '⬆️' },
      { korean: '작다', pronunciation: 'jak-tta', chinese: '矮/小', partOfSpeech: '形容词', emoji: '⬇️' },
      { korean: '예쁘다', pronunciation: 'ye-ppeu-da', chinese: '漂亮', partOfSpeech: '形容词', emoji: '✨' },
      { korean: '잘생기다', pronunciation: 'jal-saeng-gi-da', chinese: '帅', partOfSpeech: '形容词', emoji: '😎' },
      { korean: '눈', pronunciation: 'nun', chinese: '眼睛', partOfSpeech: '名词', emoji: '👁️' },
      { korean: '머리', pronunciation: 'meo-ri', chinese: '头发', partOfSpeech: '名词', emoji: '💇' },
      { korean: '얼굴', pronunciation: 'eol-gul', chinese: '脸', partOfSpeech: '名词', emoji: '😊' },
    ],
    grammar: {
      name: '은/는 + 이/가 (双重主格)', nameKo: '은/는 + 이/가',
      explanation: '韩语中描述一个人的特征常用"은/는…이/가"结构（大主题+小主语）。지민 씨는 키가 커요 = 智敏（主题）身高（主语）高。',
      pattern: '主题은/는 + 小主语이/가 + 形容词',
      example: '지민 씨는 눈이 예뻐요.',
      exampleZh: '智敏眼睛很漂亮。',
    },
    sentences: [
      { korean: '지민 씨는 키가 커요.', pronunciation: 'ji-min ssi-neun ki-ga keo-yo.', chinese: '智敏个子很高。', scene: '描述身高' },
      { korean: '그 배우는 정말 잘생겼어요.', pronunciation: 'geu bae-u-neun jeong-mal jal-saeng-gyeo-sseo-yo.', chinese: '那个演员真的很帅。', scene: '评价外貌' },
      { korean: '언니는 눈이 정말 예뻐요.', pronunciation: 'eon-ni-neun nu-ni jeong-mal ye-ppeo-yo.', chinese: '姐姐眼睛真的很漂亮。', scene: '赞美五官' },
    ],
    dictations: [
      { korean: '키가 커요', pronunciation: 'ki-ga keo-yo', chinese: '个子高' },
      { korean: '눈이 예뻐요', pronunciation: 'nu-ni ye-ppeo-yo', chinese: '眼睛漂亮' },
      { korean: '잘생겼어요', pronunciation: 'jal-saeng-gyeo-sseo-yo', chinese: '很帅' },
      { korean: '머리가 길어요', pronunciation: 'meo-ri-ga gi-reo-yo', chinese: '头发很长' },
      { korean: '얼굴이 작아요', pronunciation: 'eol-gu-ri ja-ga-yo', chinese: '脸很小' },
    ],
    output: {
      prompt: '描述一个你喜欢的明星或朋友的外貌。',
      hint: '[名字] 씨는... + 이/가... + 아/어요',
      exampleAnswer: '제 친구는 키가 크고 눈이 예뻐요. 머리가 길어서 정말 예뻐요!',
    },
  },

  {
    day: 27, title: '韩国文化', titleKo: '한국 문화', emoji: '🇰🇷',
    description: '了解韩国文化礼仪，学会相关韩语表达',
    words: [
      { korean: '문화', pronunciation: 'mun-hwa', chinese: '文化', partOfSpeech: '名词', emoji: '🎭' },
      { korean: '예절', pronunciation: 'ye-jeol', chinese: '礼节', partOfSpeech: '名词', emoji: '🙇' },
      { korean: '한복', pronunciation: 'han-bok', chinese: '韩服', partOfSpeech: '名词', emoji: '👘' },
      { korean: '전통', pronunciation: 'jeon-tong', chinese: '传统', partOfSpeech: '名词', emoji: '🏛️' },
      { korean: '어른', pronunciation: 'eo-reun', chinese: '长辈', partOfSpeech: '名词', emoji: '👴' },
      { korean: '두 손', pronunciation: 'du son', chinese: '双手', partOfSpeech: '名词', emoji: '🤲' },
      { korean: '공경하다', pronunciation: 'gong-gyeong-ha-da', chinese: '尊敬', partOfSpeech: '动词', emoji: '🙏' },
      { korean: '문화 차이', pronunciation: 'mun-hwa cha-i', chinese: '文化差异', partOfSpeech: '名词', emoji: '🌍' },
    ],
    grammar: {
      name: '으면/면 (假设条件)', nameKo: '으면/면',
      explanation: '"으면/면"接在词干后表示"如果…的话"。有收音用"으면"，无收音用"면"。用于给建议或说明条件时非常常用。',
      pattern: '词干 + 으면/면',
      example: '한국에 가면 한복을 입어 보세요.',
      exampleZh: '如果去韩国的话，试试穿韩服吧。',
      grammarId: 'gp-28',
    },
    sentences: [
      { korean: '한국에서는 어른께 두 손으로 물건을 드려요.', pronunciation: 'han-gu-ge-seo-neun eo-reun-kke du so-neu-ro mul-geo-neul deu-ryeo-yo.', chinese: '在韩国给长辈递东西要用双手。', scene: '文化礼仪' },
      { korean: '한국에 가면 한복을 꼭 입어 보세요.', pronunciation: 'han-gu-ge ga-myeon han-bo-geul kkok i-beo bo-se-yo.', chinese: '去韩国的话一定要试试穿韩服。', scene: '文化推荐' },
      { korean: '문화 차이가 재미있어요.', pronunciation: 'mun-hwa cha-i-ga jae-mi-i-sseo-yo.', chinese: '文化差异很有趣。', scene: '文化观察' },
    ],
    dictations: [
      { korean: '두 손으로 드리세요', pronunciation: 'du so-neu-ro deu-ri-se-yo', chinese: '请用双手递' },
      { korean: '한복을 입어 봤어요', pronunciation: 'han-bo-geul i-beo bwa-sseo-yo', chinese: '穿过韩服' },
      { korean: '어른을 공경해요', pronunciation: 'eo-reu-neul gong-gyeong-hae-yo', chinese: '尊敬长辈' },
      { korean: '문화가 달라요', pronunciation: 'mun-hwa-ga dal-la-yo', chinese: '文化不同' },
      { korean: '전통이 중요해요', pronunciation: 'jeon-tong-i jung-yo-hae-yo', chinese: '传统很重要' },
    ],
    output: {
      prompt: '说说中韩文化的异同点。',
      hint: '중국하고 한국은... + 비슷해요/달라요',
      exampleAnswer: '중국하고 한국은 비슷한 점이 많아요. 둘 다 어른을 공경해요. 하지만 인사하는 방법이 달라요.',
    },
  },

  {
    day: 28, title: '四周复习', titleKo: '4주 복습', emoji: '🎓',
    description: '全面复习并检验30天学习成果',
    words: [
      { korean: '졸업', pronunciation: 'jo-reop', chinese: '毕业', partOfSpeech: '名词', emoji: '🎓' },
      { korean: '성취감', pronunciation: 'seong-chwi-gam', chinese: '成就感', partOfSpeech: '名词', emoji: '🏆' },
      { korean: '노력', pronunciation: 'no-ryeok', chinese: '努力', partOfSpeech: '名词', emoji: '💪' },
      { korean: '결과', pronunciation: 'gyeol-gwa', chinese: '结果', partOfSpeech: '名词', emoji: '📊' },
      { korean: '발전', pronunciation: 'bal-jeon', chinese: '进步/发展', partOfSpeech: '名词', emoji: '📈' },
      { korean: '칭찬', pronunciation: 'ching-chan', chinese: '称赞', partOfSpeech: '名词', emoji: '👏' },
      { korean: '자랑스럽다', pronunciation: 'ja-rang-seu-reop-tta', chinese: '感到自豪', partOfSpeech: '形容词', emoji: '😤' },
      { korean: '계속', pronunciation: 'gye-sok', chinese: '继续', partOfSpeech: '副词', emoji: '➡️' },
    ],
    grammar: {
      name: '으면서/면서 (同时)', nameKo: '으면서/면서',
      explanation: '"으면서/면서"表示"一边…一边…"，两个动作同时进行。재미있으면서 힘들었어요 = 虽然有趣但也辛苦。',
      pattern: '词干 + 으면서/면서',
      example: '한국어 공부는 재미있으면서 힘들었어요.',
      exampleZh: '学韩语既有趣又辛苦。',
    },
    sentences: [
      { korean: '30일 동안 정말 열심히 했어요!', pronunciation: 'sam-si-bil dong-an jeong-mal yeol-sim-hi hae-sseo-yo!', chinese: '这30天真的努力了！', scene: '自我肯定' },
      { korean: '한국어 공부는 재미있으면서 힘들었어요.', pronunciation: 'han-gu-geo gong-bu-neun jae-mi-i-sseu-myeon-seo him-deu-reo-sseo-yo.', chinese: '学韩语既有趣又辛苦。', scene: '总结感受' },
      { korean: '앞으로도 계속 공부할 거예요!', pronunciation: 'a-peu-ro-do gye-sok gong-bu-hal geo-ye-yo!', chinese: '以后也会继续学！', scene: '未来决心' },
    ],
    dictations: [
      { korean: '30일 동안 수고했어요', pronunciation: 'sam-si-bil dong-an su-go-hae-sseo-yo', chinese: '这30天辛苦了' },
      { korean: '정말 자랑스러워요', pronunciation: 'jeong-mal ja-rang-seu-reo-wo-yo', chinese: '真的很自豪' },
      { korean: '많이 발전했어요', pronunciation: 'ma-ni bal-jeon-hae-sseo-yo', chinese: '进步了很多' },
      { korean: '계속 해요!', pronunciation: 'gye-sok hae-yo!', chinese: '继续加油！' },
      { korean: '칭찬해 주세요', pronunciation: 'ching-chan-hae ju-se-yo', chinese: '请表扬我' },
    ],
    output: {
      prompt: '用韩语写一段话总结这30天的学习，并鼓励自己继续前进。',
      hint: '30일 동안... + 한국어가... + 앞으로도...',
      exampleAnswer: '30일 동안 정말 열심히 공부했어요. 한국어가 많이 늘었어요. 힘들었지만 재미있었어요. 앞으로도 계속 열심히 할 거예요! 화이팅!',
    },
  },

  // ── Days 29-30: 综合测试 ──
  {
    day: 29, title: '综合测试（上）', titleKo: '종합 테스트 (1)', emoji: '📝',
    description: '前15天内容的综合测试',
    words: [
      { korean: '시험', pronunciation: 'si-heom', chinese: '考试/测试', partOfSpeech: '名词', emoji: '📝' },
      { korean: '문제', pronunciation: 'mun-je', chinese: '题目/问题', partOfSpeech: '名词', emoji: '❓' },
      { korean: '답', pronunciation: 'dap', chinese: '答案', partOfSpeech: '名词', emoji: '✅' },
      { korean: '맞다', pronunciation: 'mat-tta', chinese: '对', partOfSpeech: '动词', emoji: '✔️' },
      { korean: '틀리다', pronunciation: 'teul-li-da', chinese: '错', partOfSpeech: '动词', emoji: '✖️' },
      { korean: '점수', pronunciation: 'jeom-su', chinese: '分数', partOfSpeech: '名词', emoji: '💯' },
      { korean: '확인', pronunciation: 'hwa-gin', chinese: '确认', partOfSpeech: '名词', emoji: '🔍' },
      { korean: '다시', pronunciation: 'da-si', chinese: '重新', partOfSpeech: '副词', emoji: '🔄' },
    ],
    grammar: {
      name: '核心语法回顾 (1-15)', nameKo: '문법 복습',
      explanation: '复习前15天的核心语法：입니다/입니까、은/는、주세요、이/가、에 있어요、固有数字+살、아/어요(现在)、에(时间)、의(所有格)、을/를、주다、도(也)、지만、아/어서(原因)、아/어 주다。',
      pattern: '多种句型混合',
      example: '저는 커피를 좋아해요. 그래서 매일 아침에 마셔요.',
      exampleZh: '我喜欢咖啡。所以每天早上都喝。',
    },
    sentences: [
      { korean: '시험 보기 전에 복습하세요.', pronunciation: 'si-heom bo-gi jeo-ne bok-sseu-pa-se-yo.', chinese: '考试前请复习。', scene: '考试准备' },
      { korean: '답을 확인하고 싶어요.', pronunciation: 'da-beul hwa-gi-na-go si-peo-yo.', chinese: '我想确认答案。', scene: '对答案' },
      { korean: '틀려도 괜찮아요, 다시 하면 돼요!', pronunciation: 'teul-lyeo-do gwaen-cha-na-yo, da-si ha-myeon dwae-yo!', chinese: '错了也没关系，重新来就好！', scene: '鼓励自己' },
    ],
    dictations: [
      { korean: '시험 잘 보세요!', pronunciation: 'si-heom jal bo-se-yo!', chinese: '考试加油！' },
      { korean: '답이 뭐예요?', pronunciation: 'da-bi mwo-ye-yo?', chinese: '答案是什么？' },
      { korean: '몇 점이에요?', pronunciation: 'myeot jeo-mi-e-yo?', chinese: '多少分？' },
      { korean: '다시 한번 해 볼게요', pronunciation: 'da-si han-beon hae bol-ge-yo', chinese: '我会再试一次' },
      { korean: '다 맞았어요!', pronunciation: 'da ma-ja-sseo-yo!', chinese: '全对了！' },
    ],
    output: {
      prompt: '用韩语描述你做测试的感受。',
      hint: '시험이... + 조금... + 하지만...',
      exampleAnswer: '시험이 조금 어려웠어요. 하지만 복습을 열심히 해서 많이 맞았어요!',
    },
  },

  {
    day: 30, title: '综合测试（下）& 毕业', titleKo: '종합 테스트 (2) & 졸업', emoji: '🎉',
    description: '后15天内容测试及30天入门毕业',
    words: [
      { korean: '졸업', pronunciation: 'jo-reop', chinese: '毕业', partOfSpeech: '名词', emoji: '🎓' },
      { korean: '수료증', pronunciation: 'su-ryo-jeung', chinese: '结业证', partOfSpeech: '名词', emoji: '📜' },
      { korean: '자랑', pronunciation: 'ja-rang', chinese: '自豪/炫耀', partOfSpeech: '名词', emoji: '😎' },
      { korean: '기초', pronunciation: 'gi-cho', chinese: '基础', partOfSpeech: '名词', emoji: '🧱' },
      { korean: '중급', pronunciation: 'jung-geup', chinese: '中级', partOfSpeech: '名词', emoji: '⬆️' },
      { korean: '도전', pronunciation: 'do-jeon', chinese: '挑战', partOfSpeech: '名词', emoji: '⚔️' },
      { korean: '화이팅', pronunciation: 'hwa-i-ting', chinese: '加油', partOfSpeech: '常用语', emoji: '💪' },
      { korean: '시작', pronunciation: 'si-jak', chinese: '开始', partOfSpeech: '名词', emoji: '🚀' },
    ],
    grammar: {
      name: '最终语法总结', nameKo: '문법 총정리',
      explanation: '恭喜完成30天入门！你已掌握：敬语体系(해요체)、时态(现在/过去/将来)、助词(은/는/이/가/을/를/에/에서/까지/보다/도/의)、连接词(지만/아서/으면/면서)和句式(주세요/주다/있다/보다/주다/수 있다/거예요)。这是韩语的坚实基础。',
      pattern: '综合运用所有句型',
      example: '30일 동안 한국어 기초를 다 배웠어요. 이제 중급으로 도전할 수 있어요!',
      exampleZh: '这30天已经学完了韩语基础。现在可以挑战中级了！',
    },
    sentences: [
      { korean: '드디어 졸업이에요!', pronunciation: 'deu-di-eo jo-reo-bi-e-yo!', chinese: '终于毕业了！', scene: '庆祝' },
      { korean: '기초를 다 배워서 정말 뿌듯해요.', pronunciation: 'gi-cho-reul da bae-wo-seo jeong-mal ppu-deu-tae-yo.', chinese: '学完了基础真的很充实。', scene: '成就感' },
      { korean: '이제 중급으로 도전해 볼 거예요!', pronunciation: 'i-je jung-geu-beu-ro do-jeon-hae bol geo-ye-yo!', chinese: '现在要挑战中级了！', scene: '展望未来' },
    ],
    dictations: [
      { korean: '수고했어요!', pronunciation: 'su-go-hae-sseo-yo!', chinese: '辛苦了！' },
      { korean: '축하해요!', pronunciation: 'chu-ka-hae-yo!', chinese: '恭喜！' },
      { korean: '화이팅!', pronunciation: 'hwa-i-ting!', chinese: '加油！' },
      { korean: '이제 시작이에요', pronunciation: 'i-je si-ja-gi-e-yo', chinese: '现在才是开始' },
      { korean: '할 수 있어요!', pronunciation: 'hal su i-sseo-yo!', chinese: '你可以的！' },
    ],
    output: {
      prompt: '恭喜完成30天入门！写一段话给自己，回顾收获并展望未来。',
      hint: '30일 동안... + 이제... + 앞으로... + 화이팅!',
      exampleAnswer: '30일 동안 정말 많이 배웠어요. 처음에는 "안녕하세요"도 몰랐는데, 이제 한국어로 대화할 수 있어요! 이게 끝이 아니에요. 앞으로 중급도 도전할 거예요. 모두 화이팅!',
    },
  },
];
