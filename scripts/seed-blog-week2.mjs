import { createClient } from '@libsql/client';
import path from 'path';

// ---------------------------------------------------------------------------
// 兔莉的动物城 SNS · Week2(Day8-14) 内容种子。
// 世界圣经见 memory/blog-sns-world-bible.md；剧本见 memory/tori-diary-script-v1.md。
// Day8 CU便利店 / Day9 韩币·敏智教 / Day10 食堂있없 / Day11 Daiso / Day12 咖啡拿铁 /
// Day13 药店感冒·哈鲁关心 / Day14 一个人点单成功(高潮).
// 规则（红线）：
//   - 全部 초급，句子自然简单 해요体；不剧透 Day>unlock_day 剧情。
//   - vocab.word 必须逐字出现在某 sentence.ko（渲染高亮靠这个）。
//   - vocab.meaning / quiz.explanation / comment.zh 纯中文；句子禁中韩混排。
//   - comment.animalId ∈ 卡司 且 ≠ 本帖 author_id 且已登场（Day8 全员已登场）。
//   - 角色名在中文字段用中译：민지→敏智 / 하루→哈鲁 / 준호→俊浩 / 나비→娜比 / 토리→兔莉。
// ---------------------------------------------------------------------------

const url = process.env.TURSO_DATABASE_URL;
const client = createClient({
  url: url || `file:${path.join(process.cwd(), 'data', 'app.db')}`,
  ...(url ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
});

// 剧情时间线基准：Day1 = 2026-07-01。published_at 随 unlock_day 递增。
const D = (day, hour) => Date.UTC(2026, 6, day, hour - 9, 0, 0); // KST≈UTC+9

export const posts = [
  // ═══════════════ DAY 8 · 第一晚独处·想家 ═══════════════
  {
    id: 'blog-w2-01', slug: 'w2-tori-cu', unlock_day: 8,
    title_ko: '혼자 있는 밤, 엄마가 보고 싶어요', title_zh: '独自一人的夜晚，好想妈妈',
    excerpt_ko: '방에 혼자 있어요. 조금 외로워요. 그래도 괜찮아질 거예요.',
    level: '초급', category: '일상', cover_emoji: '🌙', cover_theme: 'purple',
    author_id: 'tori', is_featured: 0, like_count: 14, audio_duration: 0,
    published_at: D(8, 22),
    content: {
      sentences: [
        { ko: '오늘 밤 방에 혼자 있어요.', zh: '今晚一个人待在房间里。' },
        { ko: '조금 외로워요. 엄마가 보고 싶어요. 😢', zh: '有点孤独。好想妈妈。' },
        { ko: '그래도 괜찮아질 거예요. 화이팅! 🌸', zh: '不过会好起来的。加油！' },
      ],
      vocab: [
        { word: '혼자', reading: 'hon-ja', meaning: '独自、一个人' },
        { word: '외로워요', reading: 'oe-ro-wo-yo', meaning: '孤独' },
        { word: '보고 싶어요', reading: 'bo-go si-peo-yo', meaning: '想念' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '밤', reading: 'bam', meaning: '夜晚、晚上' },
        { word: '방', reading: 'bang', meaning: '房间' },
        { word: '조금', reading: 'jo-geum', meaning: '一点、稍微' },
        { word: '엄마', reading: 'eom-ma', meaning: '妈妈' },
        { word: '그래도', reading: 'geu-rae-do', meaning: '不过、即便如此' },
        { word: '괜찮아질 거예요', reading: 'gwaen-cha-na-jil geo-ye-yo', meaning: '会好起来的' },
        { word: '화이팅', reading: 'hwa-i-ting', meaning: '加油' },
      ],
      quiz: [
        {
          question: '토리는 지금 어떤 기분이에요?',
          options: ['조금 외로워요', '아주 신나요', '많이 배불러요', '너무 졸려요'],
          answerIndex: 0,
          explanation: '兔莉说“조금 외로워요(有点孤独)”“엄마가 보고 싶어요(想妈妈)”，第一晚独处有点想家。',
        },
      ],
      comments: [
        { animalId: 'haru', ko: '토리, 내일 같이 아침 먹어요 🌰', zh: '兔莉，明天一起吃早饭吧' },
        { animalId: 'minji', ko: '외로우면 언제든지 연락해요! 💧', zh: '孤独的话随时联系我！' },
      ],
      likedBy: ['minji', 'haru', 'choco', 'darami'],
    },
  },
  {
    id: 'blog-w2-02', slug: 'w2-news-dosirak', unlock_day: 8,
    title_ko: '편의점에 새 도시락이 나왔어요', title_zh: '便利店出了新便当',
    excerpt_ko: '동물시 편의점에 새 도시락이 나왔어요. 가격도 착해요!',
    level: '초급', category: '소식', cover_emoji: '🍱', cover_theme: 'gold',
    author_id: 'news', is_featured: 0, like_count: 9, audio_duration: 0,
    published_at: D(8, 9),
    content: {
      sentences: [
        { ko: '동물시 편의점에 새 도시락이 나왔어요.', zh: '动物城便利店出了新便当。' },
        { ko: '가격은 삼천 원이에요.', zh: '价格是三千韩元。' },
        { ko: '많이 사 주세요! 📡', zh: '请多多购买！' },
      ],
      vocab: [
        { word: '도시락', reading: 'do-si-rak', meaning: '便当' },
        { word: '가격', reading: 'ga-gyeok', meaning: '价格' },
        { word: '삼천', reading: 'sam-cheon', meaning: '三千' },
        { word: '동물시', reading: 'dong-mul-si', meaning: '动物城' },
        { word: '편의점', reading: 'pyeon-ui-jeom', meaning: '便利店' },
        { word: '새', reading: 'sae', meaning: '新的' },
        { word: '나왔어요', reading: 'na-wa-sseo-yo', meaning: '出来了、上市了' },
        { word: '원', reading: 'won', meaning: '韩元' },
        { word: '많이', reading: 'ma-ni', meaning: '很多、多多地' },
        { word: '사 주세요', reading: 'sa ju-se-yo', meaning: '请购买' },
      ],
      quiz: [],
      comments: [
        { animalId: 'choco', ko: '도시락 좋아요! 먹으러 가요 🍫', zh: '便当好耶！去吃吧' },
        { animalId: 'koal', ko: '삼천 원이면 괜찮네요 🌿', zh: '三千韩元的话还不错呢' },
      ],
      likedBy: ['tori', 'choco', 'koal', 'haru'],
    },
  },
  {
    id: 'blog-w2-03', slug: 'w2-koal-sleepy', unlock_day: 8,
    title_ko: '오늘도 조금 졸려요', title_zh: '今天也有点困',
    excerpt_ko: '졸린 하루예요. 커피 한 잔 하고 천천히 가요.',
    level: '초급', category: '일상', cover_emoji: '😴', cover_theme: 'mint',
    author_id: 'koal', is_featured: 0, like_count: 11, audio_duration: 0,
    published_at: D(8, 15),
    content: {
      sentences: [
        { ko: '오늘도 조금 졸려요. 😴', zh: '今天也有点困。' },
        { ko: '편의점에서 커피를 샀어요.', zh: '在便利店买了咖啡。' },
        { ko: '천천히 마셔요. 😌', zh: '慢慢地喝。' },
      ],
      vocab: [
        { word: '졸려요', reading: 'jol-lyeo-yo', meaning: '困、想睡' },
        { word: '커피', reading: 'keo-pi', meaning: '咖啡' },
        { word: '천천히', reading: 'cheon-cheon-hi', meaning: '慢慢地' },
        { word: '오늘도', reading: 'o-neul-do', meaning: '今天也' },
        { word: '조금', reading: 'jo-geum', meaning: '一点、稍微' },
        { word: '편의점', reading: 'pyeon-ui-jeom', meaning: '便利店' },
        { word: '샀어요', reading: 'sa-sseo-yo', meaning: '买了' },
        { word: '마셔요', reading: 'ma-syeo-yo', meaning: '喝' },
      ],
      quiz: [],
      comments: [
        { animalId: 'haru', ko: '푹 쉬어요 🌰', zh: '好好休息' },
        { animalId: 'tori', ko: '저도 커피 좋아해요 ☕', zh: '我也喜欢咖啡' },
      ],
      likedBy: ['tori', 'haru', 'nabi'],
    },
  },

  // ═══════════════ DAY 9 · CU 便利店第一次自己买饭 ═══════════════
  {
    id: 'blog-w2-04', slug: 'w2-tori-money', unlock_day: 9,
    title_ko: '편의점에서 혼자 밥을 샀어요!', title_zh: '在便利店自己买了饭！',
    excerpt_ko: '"이거 주세요. 그리고 이것도요." 혼자 성공했어요!',
    level: '초급', category: '일상', cover_emoji: '🏪', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 13, audio_duration: 0,
    published_at: D(9, 9),
    content: {
      sentences: [
        { ko: '아침에 배가 고파서 편의점에 갔어요.', zh: '早上肚子饿，去了便利店。' },
        { ko: '"이거 주세요. 그리고 이것도요."라고 말했어요.', zh: '我说了“请给我这个，还有这个也要”。' },
        { ko: '삼각김밥하고 바나나우유를 샀어요. 혼자 성공! 😊', zh: '买了三角饭团和香蕉牛奶。自己成功了！' },
      ],
      vocab: [
        { word: '편의점', reading: 'pyeon-ui-jeom', meaning: '便利店' },
        { word: '이거', reading: 'i-geo', meaning: '这个' },
        { word: '삼각김밥', reading: 'sam-gak-gim-bap', meaning: '三角饭团' },
        { word: '아침', reading: 'a-chim', meaning: '早上、早晨' },
        { word: '배가 고파서', reading: 'bae-ga go-pa-seo', meaning: '因为肚子饿' },
        { word: '갔어요', reading: 'ga-sseo-yo', meaning: '去了' },
        { word: '주세요', reading: 'ju-se-yo', meaning: '请给我' },
        { word: '말했어요', reading: 'mal-hae-sseo-yo', meaning: '说了' },
        { word: '바나나우유', reading: 'ba-na-na-u-yu', meaning: '香蕉牛奶' },
        { word: '성공', reading: 'seong-gong', meaning: '成功' },
      ],
      quiz: [
        {
          question: '토리는 편의점에서 뭐라고 말했어요?',
          options: ['이거 주세요.', '얼마예요?', '안녕하세요.', '괜찮아요.'],
          answerIndex: 0,
          explanation: '兔莉说了“이거 주세요”，买眼前的东西时最常用这句。“이것도요”是“这个也要”。',
        },
      ],
      comments: [
        { animalId: 'minji', ko: '오, 혼자 샀어요? 대단해요! 💧', zh: '哦，自己买的？太棒了！' },
        { animalId: 'haru', ko: '바나나우유 맛있죠 🌰', zh: '香蕉牛奶好喝吧' },
      ],
      likedBy: ['minji', 'haru', 'junho'],
    },
  },
  {
    id: 'blog-w2-05', slug: 'w2-minji-won', unlock_day: 9,
    title_ko: '한국 돈, 같이 봐요!', title_zh: '韩国的钱，一起看看！',
    excerpt_ko: '천 원, 오천 원, 만 원! 동전도 있어요. 어렵지 않아요.',
    level: '초급', category: '일상', cover_emoji: '🪙', cover_theme: 'mint',
    author_id: 'minji', is_featured: 0, like_count: 15, audio_duration: 0,
    published_at: D(9, 14),
    content: {
      sentences: [
        { ko: '한국 돈은 조금 어려워요. 같이 봐요! 💧', zh: '韩国的钱有点难。一起看看！' },
        { ko: '천 원, 오천 원, 만 원이 있어요.', zh: '有一千、五千、一万韩元。' },
        { ko: '동전도 있어요. 백 원, 오백 원! 😆', zh: '也有硬币。一百、五百韩元！' },
      ],
      vocab: [
        { word: '천 원', reading: 'cheon-won', meaning: '一千韩元' },
        { word: '동전', reading: 'dong-jeon', meaning: '硬币' },
        { word: '백 원', reading: 'baek-won', meaning: '一百韩元' },
        { word: '한국', reading: 'han-guk', meaning: '韩国' },
        { word: '돈', reading: 'don', meaning: '钱' },
        { word: '어려워요', reading: 'eo-ryeo-wo-yo', meaning: '难' },
        { word: '같이', reading: 'ga-chi', meaning: '一起' },
        { word: '봐요', reading: 'bwa-yo', meaning: '看' },
        { word: '오천 원', reading: 'o-cheon-won', meaning: '五千韩元' },
        { word: '만 원', reading: 'man-won', meaning: '一万韩元' },
        { word: '오백 원', reading: 'o-baek-won', meaning: '五百韩元' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '와, 감사해요! 민지 씨 최고! 🌸', zh: '哇，谢谢！敏智你最棒！' },
        { animalId: 'haru', ko: '민지 씨 친절해요 🌰', zh: '敏智真亲切' },
      ],
      likedBy: ['tori', 'haru', 'choco', 'koal'],
    },
  },

  // ═══════════════ DAY 10 · 学校食堂 있/없 ═══════════════
  {
    id: 'blog-w2-06', slug: 'w2-tori-cafeteria', unlock_day: 10,
    title_ko: '준호랑 식당에서 된장찌개를 먹었어요', title_zh: '和俊浩在食堂吃了大酱汤',
    excerpt_ko: '김치찌개는 없어요. 된장찌개는 있어요! 준호가 도와줬어요.',
    level: '초급', category: '일상', cover_emoji: '🍲', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 12, audio_duration: 0,
    published_at: D(10, 13),
    content: {
      sentences: [
        { ko: '준호랑 학교 식당에 갔어요.', zh: '和俊浩去了学校食堂。' },
        { ko: '"김치찌개 있어요?" 그런데 오늘은 없어요. 😅', zh: '“有泡菜汤吗？”可是今天没有。' },
        { ko: '된장찌개는 있어요! 준호가 뜻을 알려줬어요. 😊', zh: '有大酱汤！俊浩告诉了我它的意思（된장=大酱）。' },
        { ko: '따뜻해서 엄마 생각이 났어요. 🌸', zh: '热乎乎的，想起了妈妈。' },
      ],
      vocab: [
        { word: '식당', reading: 'sik-dang', meaning: '食堂' },
        { word: '김치찌개', reading: 'gim-chi-jji-gae', meaning: '泡菜汤' },
        { word: '된장찌개', reading: 'doen-jang-jji-gae', meaning: '大酱汤' },
        { word: '학교', reading: 'hak-gyo', meaning: '学校' },
        { word: '있어요', reading: 'i-sseo-yo', meaning: '有' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '없어요', reading: 'eop-seo-yo', meaning: '没有' },
        { word: '뜻', reading: 'tteut', meaning: '意思、含义' },
        { word: '알려줬어요', reading: 'al-lyeo-jwo-sseo-yo', meaning: '告诉了、教了' },
        { word: '따뜻해서', reading: 'tta-tteu-tae-seo', meaning: '因为温暖' },
        { word: '생각', reading: 'saeng-gak', meaning: '想法、想起' },
      ],
      quiz: [
        {
          question: '오늘 식당에 뭐가 있어요?',
          options: ['된장찌개', '김치찌개', '불고기', '커피'],
          answerIndex: 0,
          explanation: '今天食堂没有泡菜汤(김치찌개 없어요)，有大酱汤(된장찌개 있어요)。“있어요/없어요”表示“有/没有”。',
        },
      ],
      comments: [
        { animalId: 'junho', ko: '된장찌개 최고지! 🔥', zh: '大酱汤最棒了！' },
        { animalId: 'haru', ko: '따뜻한 국물이 최고예요 🌰', zh: '热乎乎的汤最棒了' },
      ],
      likedBy: ['haru', 'choco', 'minji', 'koal', 'junho'],
    },
  },
  {
    id: 'blog-w2-07', slug: 'w2-darami-morning-d10', unlock_day: 10,
    title_ko: '좋은 아침이에요! 오늘의 단어는 "밥"', title_zh: '早上好！今天的单词是“饭”',
    excerpt_ko: '오늘 서울은 조금 흐려요. 다 같이 밥 먹어요!',
    level: '초급', category: '일상', cover_emoji: '🌅', cover_theme: 'gold',
    author_id: 'darami', is_featured: 0, like_count: 10, audio_duration: 0,
    published_at: D(10, 7),
    content: {
      sentences: [
        { ko: '좋은 아침이에요! 다람쥐예요. 🌅', zh: '早上好！我是松鼠。' },
        { ko: '오늘 서울은 조금 흐려요.', zh: '今天首尔有点阴。' },
        { ko: '오늘의 단어는 "밥"이에요. 다 같이 밥 먹어요! 🍚', zh: '今天的单词是“饭”。大家一起吃饭吧！' },
      ],
      vocab: [
        { word: '아침', reading: 'a-chim', meaning: '早晨、早上' },
        { word: '흐려요', reading: 'heu-ryeo-yo', meaning: '阴天' },
        { word: '밥', reading: 'bap', meaning: '饭' },
        { word: '좋은', reading: 'jo-eun', meaning: '好的' },
        { word: '다람쥐', reading: 'da-ram-jwi', meaning: '松鼠' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '서울', reading: 'seo-ul', meaning: '首尔' },
        { word: '조금', reading: 'jo-geum', meaning: '一点、稍微' },
        { word: '단어', reading: 'da-neo', meaning: '单词' },
        { word: '다 같이', reading: 'da ga-chi', meaning: '大家一起' },
        { word: '먹어요', reading: 'meo-geo-yo', meaning: '吃' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '좋은 아침이에요! 🌸', zh: '早上好！' },
        { animalId: 'koal', ko: '오늘도 화이팅 🌿', zh: '今天也加油' },
      ],
      likedBy: ['tori', 'koal', 'haru', 'choco', 'nabi'],
    },
  },
  {
    id: 'blog-w2-08', slug: 'w2-haru-lunch', unlock_day: 10,
    title_ko: '토리하고 식당에서 밥을 먹었어요', title_zh: '和兔莉在食堂吃了饭',
    excerpt_ko: '오늘 토리하고 같이 점심을 먹었어요. 김치찌개가 맛있었어요.',
    level: '초급', category: '일상', cover_emoji: '🥢', cover_theme: 'gold',
    author_id: 'haru', is_featured: 0, like_count: 13, audio_duration: 0,
    published_at: D(10, 19),
    content: {
      sentences: [
        { ko: '오늘 토리하고 식당에서 밥을 먹었어요.', zh: '今天和兔莉在食堂吃了饭。' },
        { ko: '김치찌개가 정말 맛있었어요. 🌰', zh: '泡菜汤真的很好吃。' },
        { ko: '다음에 또 같이 먹어요, 토리 씨. ☕', zh: '下次再一起吃吧，兔莉。' },
      ],
      vocab: [
        { word: '맛있었어요', reading: 'ma-si-sseo-sseo-yo', meaning: '（过去）好吃' },
        { word: '다음', reading: 'da-eum', meaning: '下次、下一个' },
        { word: '같이', reading: 'ga-chi', meaning: '一起' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '식당', reading: 'sik-dang', meaning: '食堂' },
        { word: '밥', reading: 'bap', meaning: '饭' },
        { word: '먹었어요', reading: 'meo-geo-sseo-yo', meaning: '吃了' },
        { word: '김치찌개', reading: 'gim-chi-jji-gae', meaning: '泡菜汤' },
        { word: '정말', reading: 'jeong-mal', meaning: '真的、非常' },
        { word: '또', reading: 'tto', meaning: '再、又' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '저도 즐거웠어요! 🌸', zh: '我也很开心！' },
        { animalId: 'minji', ko: '둘이 친해요! 💧', zh: '你俩关系真好！' },
      ],
      likedBy: ['tori', 'minji', 'choco', 'koal'],
    },
  },

  // ═══════════════ DAY 11 · Daiso 生活用品 ═══════════════
  {
    id: 'blog-w2-09', slug: 'w2-tori-daiso', unlock_day: 11,
    title_ko: '다이소에서 생활용품을 샀어요', title_zh: '在大创买了生活用品',
    excerpt_ko: '다이소에는 물건이 정말 많아요. 컵하고 수건을 샀어요. 정말 싸요!',
    level: '초급', category: '서울 일기', cover_emoji: '🛍️', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 17, audio_duration: 0,
    published_at: D(11, 20),
    content: {
      sentences: [
        { ko: '오늘은 다이소에 갔어요.', zh: '今天去了大创（Daiso）。' },
        { ko: '다이소에는 물건이 정말 많아요.', zh: '大创里的东西真多。' },
        { ko: '"이거 얼마예요?"라고 물어봤어요.', zh: '我问了“这个多少钱？”。' },
        { ko: '컵하고 수건을 샀어요.', zh: '买了杯子和毛巾。' },
        { ko: '전부 오천 원이었어요. 정말 싸요! 😍', zh: '一共五千韩元。真便宜！' },
      ],
      vocab: [
        { word: '물건', reading: 'mul-geon', meaning: '东西、物品' },
        { word: '컵', reading: 'keop', meaning: '杯子' },
        { word: '수건', reading: 'su-geon', meaning: '毛巾' },
        { word: '싸요', reading: 'ssa-yo', meaning: '便宜' },
        { word: '다이소', reading: 'da-i-so', meaning: '大创（Daiso）' },
        { word: '갔어요', reading: 'ga-sseo-yo', meaning: '去了' },
        { word: '정말', reading: 'jeong-mal', meaning: '真的、非常' },
        { word: '많아요', reading: 'ma-na-yo', meaning: '多' },
        { word: '얼마예요', reading: 'eol-ma-ye-yo', meaning: '多少钱' },
        { word: '물어봤어요', reading: 'mu-reo-bwa-sseo-yo', meaning: '问了' },
        { word: '전부', reading: 'jeon-bu', meaning: '全部、一共' },
      ],
      quiz: [
        {
          question: '토리는 다이소에서 뭘 샀어요?',
          options: ['컵하고 수건', '김치찌개', '삼각김밥', '커피'],
          answerIndex: 0,
          explanation: '兔莉在大创买了杯子和毛巾（컵하고 수건）。“하고”表示“和”，用来连接两个名词。',
        },
      ],
      comments: [
        { animalId: 'minji', ko: '다이소 진짜 최고예요! 💧', zh: '大创真是最棒的！' },
        { animalId: 'nabi', ko: '거기 문구도 예뻐요 ✨', zh: '那里的文具也很漂亮' },
        { animalId: 'haru', ko: '수건 잘 샀어요 🌰', zh: '毛巾买得好' },
      ],
      likedBy: ['minji', 'nabi', 'haru', 'choco', 'koal', 'darami'],
    },
  },
  {
    id: 'blog-w2-10', slug: 'w2-nabi-stationery', unlock_day: 11,
    title_ko: '예쁜 노트를 봤어요', title_zh: '看到了漂亮的笔记本',
    excerpt_ko: '다이소에서 예쁜 노트를 봤어요. 색깔이 정말 예뻐요.',
    level: '초급', category: '일상', cover_emoji: '📔', cover_theme: 'purple',
    author_id: 'nabi', is_featured: 0, like_count: 12, audio_duration: 0,
    published_at: D(11, 16),
    content: {
      sentences: [
        { ko: '다이소에서 예쁜 노트를 봤어요. ✨', zh: '在大创看到了漂亮的笔记本。' },
        { ko: '색깔이 정말 예뻐요.', zh: '颜色真漂亮。' },
        { ko: '사진을 찍었어요. 📷', zh: '拍了照片。' },
      ],
      vocab: [
        { word: '노트', reading: 'no-teu', meaning: '笔记本' },
        { word: '색깔', reading: 'saek-kkal', meaning: '颜色' },
        { word: '사진', reading: 'sa-jin', meaning: '照片' },
        { word: '다이소', reading: 'da-i-so', meaning: '大创（Daiso）' },
        { word: '예쁜', reading: 'ye-ppeun', meaning: '漂亮的' },
        { word: '봤어요', reading: 'bwa-sseo-yo', meaning: '看到了' },
        { word: '정말', reading: 'jeong-mal', meaning: '真的、非常' },
        { word: '예뻐요', reading: 'ye-ppeo-yo', meaning: '漂亮' },
        { word: '찍었어요', reading: 'jji-geo-sseo-yo', meaning: '拍了（照）' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '와, 저도 사고 싶어요! 🌸', zh: '哇，我也想买！' },
        { animalId: 'choco', ko: '나비 씨 사진 잘 찍어요 🍫', zh: '娜比拍照拍得真好' },
      ],
      likedBy: ['tori', 'choco', 'haru', 'koal'],
    },
  },

  // ═══════════════ DAY 12 · 独立咖啡馆·第一杯拿铁 ═══════════════
  {
    id: 'blog-w2-11', slug: 'w2-tori-latte', unlock_day: 12,
    title_ko: '오늘 첫 라떼를 마셨어요', title_zh: '今天喝了第一杯拿铁',
    excerpt_ko: '작은 카페에서 따뜻한 라떼를 주문했어요. 정말 행복해요!',
    level: '초급', category: '일상', cover_emoji: '☕', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 15, audio_duration: 0,
    published_at: D(12, 15),
    content: {
      sentences: [
        { ko: '오늘은 작은 카페에 갔어요. ☕', zh: '今天去了一家小咖啡馆。' },
        { ko: '"따뜻한 라떼 주세요."라고 말했어요.', zh: '我说了“请给我一杯热拿铁”。' },
        { ko: '라떼가 정말 맛있어요. 행복해요! 😊', zh: '拿铁真好吃。好幸福！' },
      ],
      vocab: [
        { word: '카페', reading: 'ka-pe', meaning: '咖啡馆' },
        { word: '따뜻한', reading: 'tta-tteu-tan', meaning: '温热的' },
        { word: '라떼', reading: 'ra-tte', meaning: '拿铁' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '작은', reading: 'ja-geun', meaning: '小的' },
        { word: '갔어요', reading: 'ga-sseo-yo', meaning: '去了' },
        { word: '주세요', reading: 'ju-se-yo', meaning: '请给我' },
        { word: '말했어요', reading: 'mal-hae-sseo-yo', meaning: '说了' },
        { word: '맛있어요', reading: 'ma-si-sseo-yo', meaning: '好吃' },
        { word: '행복해요', reading: 'haeng-bo-kae-yo', meaning: '幸福' },
      ],
      quiz: [
        {
          question: '토리는 뭘 주문했어요?',
          options: ['따뜻한 라떼', '김치찌개', '삼각김밥', '물'],
          answerIndex: 0,
          explanation: '兔莉点了热拿铁（따뜻한 라떼）。“따뜻한”是“热的、温的”，点单时说“주세요”。',
        },
      ],
      comments: [
        { animalId: 'choco', ko: '라떼 최고죠 🍫', zh: '拿铁最棒了' },
        { animalId: 'minji', ko: '이제 혼자 주문도 잘하네요! 💧', zh: '现在自己点单也很拿手了呢！' },
        { animalId: 'haru', ko: '따뜻한 라떼 좋아요 🌰', zh: '热拿铁真好' },
      ],
      likedBy: ['choco', 'minji', 'haru', 'darami', 'koal'],
    },
  },
  {
    id: 'blog-w2-12', slug: 'w2-choco-cake', unlock_day: 12,
    title_ko: '이 카페 케이크가 진짜 맛있어요', title_zh: '这家咖啡馆的蛋糕真好吃',
    excerpt_ko: '초콜릿 케이크를 먹었어요. 여러분도 꼭 드세요!',
    level: '초급', category: '일상', cover_emoji: '🍰', cover_theme: 'mint',
    author_id: 'choco', is_featured: 0, like_count: 14, audio_duration: 0,
    published_at: D(12, 17),
    content: {
      sentences: [
        { ko: '이 카페 케이크가 진짜 맛있어요! 🍫', zh: '这家咖啡馆的蛋糕真好吃！' },
        { ko: '초콜릿 케이크를 먹었어요.', zh: '吃了巧克力蛋糕。' },
        { ko: '여러분도 꼭 드세요! 😋', zh: '大家也一定要尝尝！' },
      ],
      vocab: [
        { word: '케이크', reading: 'ke-i-keu', meaning: '蛋糕' },
        { word: '초콜릿', reading: 'cho-kol-lit', meaning: '巧克力' },
        { word: '여러분', reading: 'yeo-reo-bun', meaning: '大家、各位' },
        { word: '이', reading: 'i', meaning: '这' },
        { word: '카페', reading: 'ka-pe', meaning: '咖啡馆' },
        { word: '진짜', reading: 'jin-jja', meaning: '真的' },
        { word: '맛있어요', reading: 'ma-si-sseo-yo', meaning: '好吃' },
        { word: '먹었어요', reading: 'meo-geo-sseo-yo', meaning: '吃了' },
        { word: '꼭', reading: 'kkok', meaning: '一定、务必' },
        { word: '드세요', reading: 'deu-se-yo', meaning: '请吃、请品尝' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '와, 정말 맛있어요! 🌸', zh: '哇，真好吃！' },
        { animalId: 'haru', ko: '저도 단거 좋아해요 🌰', zh: '我也喜欢甜的' },
      ],
      likedBy: ['tori', 'haru', 'minji', 'koal', 'nabi'],
    },
  },

  // ═══════════════ DAY 13 · 药店·感冒（哈鲁关心） ═══════════════
  {
    id: 'blog-w2-13', slug: 'w2-tori-pharmacy', unlock_day: 13,
    title_ko: '감기에 걸려서 약국에 갔어요', title_zh: '感冒了去了药店',
    excerpt_ko: '어제부터 감기에 걸렸어요. 약국에서 감기약을 샀어요.',
    level: '초급', category: '일상', cover_emoji: '💊', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 16, audio_duration: 0,
    published_at: D(13, 11),
    content: {
      sentences: [
        { ko: '어제부터 감기에 걸렸어요. 😷', zh: '从昨天开始感冒了。' },
        { ko: '그래서 약국에 갔어요.', zh: '所以去了药店。' },
        { ko: '약사님이 감기약을 줬어요. 콧물이 나요.', zh: '药剂师给了感冒药。流鼻涕。' },
      ],
      vocab: [
        { word: '감기', reading: 'gam-gi', meaning: '感冒' },
        { word: '약국', reading: 'yak-guk', meaning: '药店' },
        { word: '콧물', reading: 'kon-mul', meaning: '鼻涕' },
        { word: '어제', reading: 'eo-je', meaning: '昨天' },
        { word: '걸렸어요', reading: 'geol-lyeo-sseo-yo', meaning: '患上了、得了' },
        { word: '그래서', reading: 'geu-rae-seo', meaning: '所以' },
        { word: '갔어요', reading: 'ga-sseo-yo', meaning: '去了' },
        { word: '약사님', reading: 'yak-sa-nim', meaning: '药剂师' },
        { word: '감기약', reading: 'gam-gi-yak', meaning: '感冒药' },
        { word: '나요', reading: 'na-yo', meaning: '流、出（症状）' },
      ],
      quiz: [
        {
          question: '토리는 왜 약국에 갔어요?',
          options: ['감기에 걸렸어요', '배가 고파요', '졸려요', '심심해요'],
          answerIndex: 0,
          explanation: '兔莉因为感冒了（감기에 걸렸어요）才去药店。“~에 걸리다”表示“患上（某种病）”。',
        },
      ],
      comments: [
        { animalId: 'haru', ko: '어머, 푹 쉬어요! 🌰', zh: '哎呀，好好休息！' },
        { animalId: 'minji', ko: '따뜻한 물 많이 마셔요 💧', zh: '多喝热水' },
        { animalId: 'darami', ko: '빨리 나으세요! 🌅', zh: '快点好起来！' },
      ],
      likedBy: ['haru', 'minji', 'darami', 'choco', 'koal', 'nabi'],
    },
  },
  {
    id: 'blog-w2-14', slug: 'w2-haru-care', unlock_day: 13,
    title_ko: '토리가 걱정돼요', title_zh: '很担心兔莉',
    excerpt_ko: '토리가 감기에 걸렸어요. 따뜻한 차를 만들었어요.',
    level: '초급', category: '일상', cover_emoji: '🍵', cover_theme: 'gold',
    author_id: 'haru', is_featured: 0, like_count: 15, audio_duration: 0,
    published_at: D(13, 14),
    content: {
      sentences: [
        { ko: '토리가 감기에 걸렸어요. 걱정돼요. 🌰', zh: '兔莉感冒了。很担心。' },
        { ko: '따뜻한 차를 만들었어요.', zh: '泡了热茶。' },
        { ko: '토리 씨, 빨리 나으세요! ☕', zh: '兔莉，快点好起来！' },
      ],
      vocab: [
        { word: '걱정', reading: 'geok-jeong', meaning: '担心' },
        { word: '차', reading: 'cha', meaning: '茶' },
        { word: '빨리', reading: 'ppal-li', meaning: '快、快点' },
        { word: '감기', reading: 'gam-gi', meaning: '感冒' },
        { word: '걸렸어요', reading: 'geol-lyeo-sseo-yo', meaning: '患上了、得了' },
        { word: '걱정돼요', reading: 'geok-jeong-dwae-yo', meaning: '担心、放心不下' },
        { word: '따뜻한', reading: 'tta-tteu-tan', meaning: '温热的' },
        { word: '만들었어요', reading: 'man-deu-reo-sseo-yo', meaning: '做了、制作了' },
        { word: '나으세요', reading: 'na-eu-se-yo', meaning: '请好起来（康复）' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '하루 씨, 고마워요. 😭🌸', zh: '哈鲁，谢谢你。' },
        { animalId: 'minji', ko: '하루 씨 정말 다정해요 💧', zh: '哈鲁真体贴' },
      ],
      likedBy: ['tori', 'minji', 'choco', 'darami', 'koal'],
    },
  },
  {
    id: 'blog-w2-15', slug: 'w2-darami-morning-d13', unlock_day: 13,
    title_ko: '좋은 아침이에요! 감기 조심해요', title_zh: '早上好！小心感冒',
    excerpt_ko: '요즘 날씨가 추워요. 다 같이 감기 조심해요!',
    level: '초급', category: '일상', cover_emoji: '🧣', cover_theme: 'gold',
    author_id: 'darami', is_featured: 0, like_count: 11, audio_duration: 0,
    published_at: D(13, 7),
    content: {
      sentences: [
        { ko: '좋은 아침이에요! 다람쥐예요. 🌅', zh: '早上好！我是松鼠。' },
        { ko: '요즘 날씨가 추워요.', zh: '最近天气冷。' },
        { ko: '다 같이 감기 조심해요! 🧣', zh: '大家一起小心感冒！' },
      ],
      vocab: [
        { word: '요즘', reading: 'yo-jeum', meaning: '最近' },
        { word: '추워요', reading: 'chu-wo-yo', meaning: '冷' },
        { word: '조심', reading: 'jo-sim', meaning: '小心' },
        { word: '좋은', reading: 'jo-eun', meaning: '好的' },
        { word: '아침', reading: 'a-chim', meaning: '早上、早晨' },
        { word: '다람쥐', reading: 'da-ram-jwi', meaning: '松鼠' },
        { word: '날씨', reading: 'nal-ssi', meaning: '天气' },
        { word: '다 같이', reading: 'da ga-chi', meaning: '大家一起' },
        { word: '감기', reading: 'gam-gi', meaning: '感冒' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '네, 감사해요! 🌸', zh: '好的，谢谢！' },
        { animalId: 'haru', ko: '모두 따뜻하게 입어요 🌰', zh: '大家穿暖和点' },
      ],
      likedBy: ['tori', 'haru', 'koal', 'choco', 'minji'],
    },
  },

  // ═══════════════ DAY 14 · 一个人点单成功（本周高潮） ═══════════════
  {
    id: 'blog-w2-16', slug: 'w2-tori-order-success', unlock_day: 14,
    title_ko: '혼자 주문에 성공했어요!', title_zh: '一个人点单成功了！',
    excerpt_ko: '오늘 혼자 카페에서 아메리카노를 주문했어요. 한국어로 다 말했어요!',
    level: '초급', category: '서울 일기', cover_emoji: '🎉', cover_theme: 'pink',
    author_id: 'tori', is_featured: 1, like_count: 24, audio_duration: 0,
    published_at: D(14, 18),
    content: {
      sentences: [
        { ko: '오늘은 특별한 날이에요.', zh: '今天是特别的一天。' },
        { ko: '혼자 카페에 갔어요.', zh: '一个人去了咖啡馆。' },
        { ko: '"아이스 아메리카노 한 잔 주세요."라고 말했어요.', zh: '我说了“请给我一杯冰美式”。' },
        { ko: '한국어로 다 말했어요. 성공! 🎉', zh: '全部用韩语说了。成功！' },
        { ko: '이제 서울 생활이 조금 편해요. 😊', zh: '现在首尔的生活稍微舒服一点了。' },
      ],
      vocab: [
        { word: '특별한', reading: 'teuk-byeol-han', meaning: '特别的' },
        { word: '혼자', reading: 'hon-ja', meaning: '一个人、独自' },
        { word: '아메리카노', reading: 'a-me-ri-ka-no', meaning: '美式咖啡' },
        { word: '성공', reading: 'seong-gong', meaning: '成功' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '날', reading: 'nal', meaning: '日子、天' },
        { word: '카페', reading: 'ka-pe', meaning: '咖啡馆' },
        { word: '아이스', reading: 'a-i-seu', meaning: '冰（饮品）' },
        { word: '한 잔', reading: 'han-jan', meaning: '一杯' },
        { word: '말했어요', reading: 'mal-hae-sseo-yo', meaning: '说了' },
        { word: '한국어', reading: 'han-gu-geo', meaning: '韩语' },
        { word: '편해요', reading: 'pyeon-hae-yo', meaning: '舒服、方便' },
      ],
      quiz: [
        {
          question: '토리는 카페에서 뭘 주문했어요?',
          options: ['아이스 아메리카노', '따뜻한 라떼', '김치찌개', '삼각김밥'],
          answerIndex: 0,
          explanation: '兔莉点了一杯冰美式（아이스 아메리카노）。“한 잔”是“一杯”，点单结尾说“주세요”。',
        },
      ],
      comments: [
        { animalId: 'minji', ko: '와아! 이제 진짜 서울 사람이에요! 💧', zh: '哇！现在真的是首尔人了！' },
        { animalId: 'haru', ko: '토리 씨, 정말 대단해요! 🌰', zh: '兔莉，真了不起！' },
        { animalId: 'junho', ko: '축하해요!! 🔥🎤', zh: '恭喜！！' },
        { animalId: 'darami', ko: '멋져요! 🌅', zh: '真棒！' },
      ],
      likedBy: ['minji', 'haru', 'junho', 'darami', 'choco', 'koal', 'nabi'],
    },
  },
  {
    id: 'blog-w2-17', slug: 'w2-news-weekly', unlock_day: 14,
    title_ko: '이번 주 동물시 소식', title_zh: '本周动物城消息',
    excerpt_ko: '새 도시락이 인기가 많아요. 날씨가 추워요. 모두 감기 조심하세요!',
    level: '초급', category: '소식', cover_emoji: '📰', cover_theme: 'gold',
    author_id: 'news', is_featured: 0, like_count: 8, audio_duration: 0,
    published_at: D(14, 20),
    content: {
      sentences: [
        { ko: '이번 주 동물시 소식이에요. 📡', zh: '这是本周动物城的消息。' },
        { ko: '새 편의점 도시락이 인기가 많아요.', zh: '新的便利店便当很受欢迎。' },
        { ko: '날씨가 추워요. 모두 감기 조심하세요!', zh: '天气冷。大家小心感冒！' },
      ],
      vocab: [
        { word: '이번 주', reading: 'i-beon-ju', meaning: '这周' },
        { word: '인기', reading: 'in-gi', meaning: '人气、受欢迎' },
        { word: '모두', reading: 'mo-du', meaning: '大家、全部' },
        { word: '동물시', reading: 'dong-mul-si', meaning: '动物城' },
        { word: '소식', reading: 'so-sik', meaning: '消息' },
        { word: '편의점', reading: 'pyeon-ui-jeom', meaning: '便利店' },
        { word: '도시락', reading: 'do-si-rak', meaning: '便当' },
        { word: '날씨', reading: 'nal-ssi', meaning: '天气' },
        { word: '추워요', reading: 'chu-wo-yo', meaning: '冷' },
        { word: '감기', reading: 'gam-gi', meaning: '感冒' },
        { word: '조심하세요', reading: 'jo-sim-ha-se-yo', meaning: '请小心' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '이번 주도 다 지나갔어요! 🌸', zh: '这周也过去了！' },
        { animalId: 'choco', ko: '도시락 진짜 맛있어요 🍫', zh: '便当真好吃' },
        { animalId: 'koal', ko: '저도 조심해요 🌿', zh: '我也小心' },
      ],
      likedBy: ['tori', 'choco', 'koal', 'haru', 'minji'],
    },
  },
];

async function main() {
  let count = 0;
  for (const p of posts) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO blog_posts
        (id, slug, title_ko, title_zh, excerpt_ko, level, category,
         content_json, audio_url, audio_duration, cover_emoji, published_at, is_featured,
         author_id, like_count, cover_image_url, cover_theme,
         unlock_day, author_kind, ai_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'npc', 'passed')`,
      args: [
        p.id, p.slug, p.title_ko, p.title_zh, p.excerpt_ko, p.level, p.category,
        JSON.stringify(p.content), '', p.audio_duration, p.cover_emoji, p.published_at, p.is_featured,
        p.author_id, p.like_count, '', p.cover_theme, p.unlock_day,
      ],
    });
    count++;
  }
  console.log(`Inserted / updated ${count} Week2 posts.`);
  await client.close();
}

if (process.argv[1] && process.argv[1].endsWith('seed-blog-week2.mjs')) {
  main().catch((err) => {
    console.error(err);
    client.close();
    process.exit(1);
  });
}
