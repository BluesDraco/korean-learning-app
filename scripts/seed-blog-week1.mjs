import { createClient } from '@libsql/client';
import path from 'path';

// ---------------------------------------------------------------------------
// 兔莉的动物城 SNS · Week1(Day1-7) 内容种子 + 现有 6 篇重新门控。
// 世界圣经见 memory/blog-sns-world-bible.md。
// 规则（红线）：
//   - 全部 초급，句子自然简单 해요体；不剧透 Day>unlock_day 剧情。
//   - vocab.word 必须逐字出现在某 sentence.ko（渲染高亮靠这个）。
//   - vocab.meaning / quiz.explanation / comment.zh 纯中文；句子禁中韩混排。
//   - comment.animalId ∈ 卡司 且 ≠ 本帖 author_id 且已登场（unlock_day <= 本帖）。
//   - 分享/新闻贴 quiz 可空（[]）。
// 卡司 id: tori news minji haru junho darami gomdori yowoo nabi choco koal
// ---------------------------------------------------------------------------

const url = process.env.TURSO_DATABASE_URL;
const client = createClient({
  url: url || `file:${path.join(process.cwd(), 'data', 'app.db')}`,
  ...(url ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
});

// 剧情时间线基准：Day1 = 2026-07-01。published_at 随 unlock_day 递增，让 feed 顺。
const D = (day, hour) => Date.UTC(2026, 6, day, hour - 9, 0, 0); // KST≈UTC+9

const posts = [
  // ═══════════════ DAY 1 ═══════════════
  {
    id: 'blog-w1-01', slug: 'w1-tori-departure', unlock_day: 1,
    title_ko: '내일 서울로 떠나요', title_zh: '明天出发去首尔',
    excerpt_ko: '드디어 내일 서울로 가요. 조금 떨리지만 정말 행복해요.',
    level: '초급', category: '서울 일기', cover_emoji: '✈️', cover_theme: 'pink',
    author_id: 'tori', is_featured: 1, like_count: 16, audio_duration: 0,
    published_at: D(1, 20),
    content: {
      sentences: [
        { ko: '내일 저는 서울로 떠나요.', zh: '明天我要出发去首尔。' },
        { ko: '엄마가 가방에 당근을 많이 넣어 줬어요.', zh: '妈妈在包里塞了很多胡萝卜。' },
        { ko: '한국어를 잘 못해서 조금 떨려요.', zh: '因为韩语说得不好，有点紧张。' },
        { ko: '그래도 새로운 친구를 만나고 싶어요.', zh: '不过还是想认识新朋友。' },
        { ko: '서울아, 잘 부탁해!', zh: '首尔，请多关照！' },
      ],
      vocab: [
        { word: '내일', reading: 'nae-il', meaning: '明天' },
        { word: '서울', reading: 'seo-ul', meaning: '首尔' },
        { word: '떠나요', reading: 'tteo-na-yo', meaning: '出发、离开' },
        { word: '엄마', reading: 'eom-ma', meaning: '妈妈' },
        { word: '가방', reading: 'ga-bang', meaning: '包、书包' },
        { word: '당근', reading: 'dang-geun', meaning: '胡萝卜' },
        { word: '많이', reading: 'ma-ni', meaning: '很多、多多地' },
        { word: '한국어', reading: 'han-gu-geo', meaning: '韩语' },
        { word: '조금', reading: 'jo-geum', meaning: '一点、稍微' },
        { word: '새로운', reading: 'sae-ro-un', meaning: '新的' },
        { word: '친구', reading: 'chin-gu', meaning: '朋友' },
      ],
      quiz: [
        {
          question: '토리는 내일 어디로 가요?',
          options: ['서울', '부산', '제주', '도쿄'],
          answerIndex: 0,
          explanation: '第一句说“明天我要出发去首尔（서울）”。',
        },
      ],
      comments: [
        { animalId: 'darami', ko: '토리야, 서울에 온 걸 환영해요! 🌅', zh: '兔莉，欢迎来首尔！' },
        { animalId: 'nabi', ko: '우와, 새로운 시작이네요! 응원해요 ✨', zh: '哇，是新的开始呢，为你加油' },
        { animalId: 'choco', ko: '서울에는 맛있는 게 정말 많아요! 🍫', zh: '首尔好吃的真的超多！' },
      ],
      likedBy: ['darami', 'nabi', 'choco', 'news', 'koal'],
    },
  },
  {
    id: 'blog-w1-02', slug: 'w1-darami-morning-d1', unlock_day: 1,
    title_ko: '다람쥐의 아침 · 오늘의 날씨', title_zh: '松鼠的早晨·今天的天气',
    excerpt_ko: '좋은 아침이에요! 오늘 서울 날씨는 맑아요.',
    level: '초급', category: '일상', cover_emoji: '🌅', cover_theme: 'gold',
    author_id: 'darami', is_featured: 0, like_count: 22, audio_duration: 0,
    published_at: D(1, 7),
    content: {
      sentences: [
        { ko: '좋은 아침이에요! 다람쥐예요. 🐿️', zh: '早上好！我是松鼠。' },
        { ko: '오늘 서울 날씨는 맑아요.', zh: '今天首尔的天气很晴朗。' },
        { ko: '오늘의 단어는 "인사"예요. 다 같이 인사해요!', zh: '今天的单词是“打招呼”，大家一起打招呼吧！' },
      ],
      vocab: [
        { word: '아침', reading: 'a-chim', meaning: '早晨、早上' },
        { word: '날씨', reading: 'nal-ssi', meaning: '天气' },
        { word: '맑아요', reading: 'mal-ga-yo', meaning: '晴朗' },
        { word: '인사', reading: 'in-sa', meaning: '打招呼、问候' },
        { word: '좋은', reading: 'jo-eun', meaning: '好的' },
        { word: '다람쥐', reading: 'da-ram-jwi', meaning: '松鼠' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '서울', reading: 'seo-ul', meaning: '首尔' },
        { word: '단어', reading: 'da-neo', meaning: '单词' },
        { word: '같이', reading: 'ga-chi', meaning: '一起' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '좋은 아침이에요! 오늘도 화이팅! 🌸', zh: '早上好！今天也加油！' },
        { animalId: 'koal', ko: '아침이에요…? 조금만 더 잘래요 🐨', zh: '已经早上了…？再睡一会儿嘛' },
      ],
      likedBy: ['tori', 'news', 'nabi', 'choco'],
    },
  },
  {
    id: 'blog-w1-03', slug: 'w1-news-welcome', unlock_day: 4,
    title_ko: '동물시에 새 이웃이 왔어요', title_zh: '动物城来了新邻居',
    excerpt_ko: '이번 주 동물시에 새 이웃이 도착했어요. 다 같이 환영해요!',
    level: '초급', category: '소식', cover_emoji: '📰', cover_theme: 'gold',
    author_id: 'news', is_featured: 0, like_count: 9, audio_duration: 0,
    published_at: D(1, 12),
    content: {
      sentences: [
        { ko: '동물시 뉴스예요.', zh: '这里是动物城新闻。' },
        { ko: '이번 주에 새 이웃이 왔어요.', zh: '这周来了新邻居。' },
        { ko: '우리 다 같이 환영해요!', zh: '我们一起欢迎吧！' },
      ],
      vocab: [
        { word: '이웃', reading: 'i-ut', meaning: '邻居' },
        { word: '이번 주', reading: 'i-beon ju', meaning: '这周' },
        { word: '환영', reading: 'hwan-yeong', meaning: '欢迎' },
        { word: '동물시', reading: 'dong-mul-si', meaning: '动物城' },
        { word: '뉴스', reading: 'nyu-seu', meaning: '新闻' },
        { word: '새', reading: 'sae', meaning: '新的' },
        { word: '왔어요', reading: 'wa-sseo-yo', meaning: '来了' },
        { word: '우리', reading: 'u-ri', meaning: '我们' },
        { word: '다 같이', reading: 'da ga-chi', meaning: '大家一起' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '앗, 저예요! 잘 부탁드려요 🌸', zh: '啊，是我！请多关照' },
        { animalId: 'nabi', ko: '환영해요! 곧 만나요 ✨', zh: '欢迎！回头见~' },
      ],
      likedBy: ['tori', 'darami', 'nabi', 'koal'],
    },
  },

  // ═══════════════ DAY 2 ═══════════════
  {
    id: 'blog-w1-04', slug: 'w1-tori-airplane', unlock_day: 2,
    title_ko: '비행기에서 처음 한국어를 했어요', title_zh: '在飞机上第一次说了韩语',
    excerpt_ko: '비행기 안에서 처음으로 한국어를 했어요. 두근두근!',
    level: '초급', category: '일상', cover_emoji: '🛫', cover_theme: 'mint',
    author_id: 'tori', is_featured: 0, like_count: 14, audio_duration: 0,
    published_at: D(2, 15),
    content: {
      sentences: [
        { ko: '지금 비행기 안이에요.', zh: '现在在飞机上。' },
        { ko: '승무원한테 처음으로 한국어를 했어요.', zh: '第一次对乘务员说了韩语。' },
        { ko: '"물 좀 주세요."라고 말했어요. 성공! 😆', zh: '我说了“请给我水”。成功了！' },
      ],
      vocab: [
        { word: '비행기', reading: 'bi-haeng-gi', meaning: '飞机' },
        { word: '한국어', reading: 'han-gu-geo', meaning: '韩语' },
        { word: '물', reading: 'mul', meaning: '水' },
        { word: '주세요', reading: 'ju-se-yo', meaning: '请给我' },
        { word: '지금', reading: 'ji-geum', meaning: '现在' },
        { word: '안', reading: 'an', meaning: '里面' },
        { word: '승무원', reading: 'seung-mu-won', meaning: '乘务员' },
        { word: '처음으로', reading: 'cheo-eu-meu-ro', meaning: '第一次、初次' },
        { word: '말했어요', reading: 'mal-hae-sseo-yo', meaning: '说了' },
        { word: '성공', reading: 'seong-gong', meaning: '成功' },
      ],
      quiz: [
        {
          question: '토리는 승무원에게 뭐라고 말했어요?',
          options: ['물 좀 주세요', '안녕히 가세요', '얼마예요', '죄송해요'],
          answerIndex: 0,
          explanation: '第三句说她说了“물 좀 주세요（请给我水）”。',
        },
      ],
      comments: [
        { animalId: 'darami', ko: '우와, 벌써 한국어를 했어요? 대단해요! 🌅', zh: '哇，已经说韩语了？好厉害！' },
        { animalId: 'choco', ko: '"주세요"는 진짜 자주 써요! 👍', zh: '“주세요”真的超常用！' },
      ],
      likedBy: ['darami', 'choco', 'nabi', 'news'],
    },
  },
  {
    id: 'blog-w1-05', slug: 'w1-news-arrival-d2', unlock_day: 2,
    title_ko: '오늘 인천공항 소식', title_zh: '今天仁川机场的消息',
    excerpt_ko: '오늘 인천공항에 손님이 많이 도착했어요.',
    level: '초급', category: '소식', cover_emoji: '🛬', cover_theme: 'gold',
    author_id: 'news', is_featured: 0, like_count: 7, audio_duration: 0,
    published_at: D(2, 12),
    content: {
      sentences: [
        { ko: '동물시 뉴스예요.', zh: '这里是动物城新闻。' },
        { ko: '오늘 인천공항에 손님이 많이 왔어요.', zh: '今天仁川机场来了很多客人。' },
        { ko: '모두 안전하게 도착했어요.', zh: '大家都平安到达了。' },
      ],
      vocab: [
        { word: '공항', reading: 'gong-hang', meaning: '机场' },
        { word: '손님', reading: 'son-nim', meaning: '客人' },
        { word: '도착', reading: 'do-chak', meaning: '到达' },
        { word: '인천공항', reading: 'in-cheon-gong-hang', meaning: '仁川机场' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '많이', reading: 'ma-ni', meaning: '很多' },
        { word: '왔어요', reading: 'wa-sseo-yo', meaning: '来了' },
        { word: '모두', reading: 'mo-du', meaning: '大家、全部' },
        { word: '안전하게', reading: 'an-jeon-ha-ge', meaning: '安全地、平安地' },
      ],
      quiz: [],
      comments: [
        { animalId: 'nabi', ko: '공항은 늘 복잡하죠. 다들 고생했어요 ✨', zh: '机场总是很挤呢，大家都辛苦了' },
      ],
      likedBy: ['tori', 'koal', 'darami'],
    },
  },

  // ═══════════════ DAY 3 ═══════════════
  {
    id: 'blog-w1-06', slug: 'w1-tori-meet-minji', unlock_day: 3,
    title_ko: '공항에서 "집이 무거워요"라고 했어요 😂', title_zh: '在机场说成了“我的家太重了”',
    excerpt_ko: '"짐"을 "집"이라고 잘못 말했어요. 그래도 민지가 도와줬어요!',
    level: '초급', category: '일상', cover_emoji: '🦦', cover_theme: 'mint',
    author_id: 'tori', is_featured: 0, like_count: 19, audio_duration: 0,
    published_at: D(3, 16),
    content: {
      sentences: [
        { ko: '공항에서 짐이 너무 무거웠어요. 😥', zh: '在机场行李太重了。' },
        { ko: '그런데 저는 "집이 무거워요"라고 말했어요. 😳', zh: '结果我说成了“我的家太重了”。' },
        { ko: '짐하고 집, 한 글자 차이예요!', zh: '“行李(짐)”和“家(집)”，就差一个字！' },
        { ko: '그때 민지가 웃었어요. 그리고 저를 도와줬어요. 첫 친구예요! 🌸', zh: '那时敏智笑了，然后帮了我。第一个朋友！' },
      ],
      vocab: [
        { word: '짐', reading: 'jim', meaning: '行李' },
        { word: '집', reading: 'jip', meaning: '家' },
        { word: '무거워요', reading: 'mu-geo-wo-yo', meaning: '重' },
        { word: '친구', reading: 'chin-gu', meaning: '朋友' },
        { word: '공항', reading: 'gong-hang', meaning: '机场' },
        { word: '너무', reading: 'neo-mu', meaning: '太、过于' },
        { word: '무거웠어요', reading: 'mu-geo-wo-sseo-yo', meaning: '（曾）重' },
        { word: '글자', reading: 'geul-ja', meaning: '字' },
        { word: '차이', reading: 'cha-i', meaning: '差别、区别' },
        { word: '그때', reading: 'geu-ttae', meaning: '那时' },
        { word: '웃었어요', reading: 'u-seo-sseo-yo', meaning: '笑了' },
        { word: '도와줬어요', reading: 'do-wa-jwo-sseo-yo', meaning: '帮忙了' },
      ],
      quiz: [
        {
          question: '토리가 잘못 말한 단어는 뭐예요?',
          options: ['집', '짐', '길', '친구'],
          answerIndex: 0,
          explanation: '兔莉本想说“짐(行李)”，却说成了“집(家)”，所以变成“我的家太重了”。',
        },
      ],
      comments: [
        { animalId: 'minji', ko: '하하, 그때 진짜 귀여웠어요! 😆💧', zh: '哈哈，那时候真的太可爱了！' },
        { animalId: 'darami', ko: '짐하고 집, 저도 자주 헷갈려요! 🌅', zh: '“行李”和“家”，我也常常搞混！' },
        { animalId: 'nabi', ko: '첫 친구라니, 축하해요 ✨', zh: '第一个朋友，恭喜呀' },
      ],
      likedBy: ['minji', 'nabi', 'darami', 'choco', 'koal'],
    },
  },
  {
    id: 'blog-w1-07', slug: 'w1-minji-newfriend', unlock_day: 3,
    title_ko: '"집이 무거워요"라는 토끼 😂', title_zh: '一只说“家很重”的兔子',
    excerpt_ko: '공항에서 귀여운 토끼를 만났어요. "집이 무거워요"래요! 😆',
    level: '초급', category: '일상', cover_emoji: '💧', cover_theme: 'mint',
    author_id: 'minji', is_featured: 0, like_count: 15, audio_duration: 0,
    published_at: D(3, 18),
    content: {
      sentences: [
        { ko: '오늘 공항에서 토끼 친구를 만났어요.', zh: '今天在机场遇到了一只兔子朋友。' },
        { ko: '토끼가 "집이 무거워요"라고 했어요. 😆', zh: '兔子说“我的家太重了”。' },
        { ko: '"집"이 아니라 "짐"이에요, 토리 씨! 아주 귀여워요.', zh: '不是“家(집)”，是“行李(짐)”啦，兔莉！太可爱了。' },
      ],
      vocab: [
        { word: '토끼', reading: 'to-kki', meaning: '兔子' },
        { word: '집', reading: 'jip', meaning: '家' },
        { word: '짐', reading: 'jim', meaning: '行李' },
        { word: '귀여워요', reading: 'gwi-yeo-wo-yo', meaning: '可爱' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '공항', reading: 'gong-hang', meaning: '机场' },
        { word: '친구', reading: 'chin-gu', meaning: '朋友' },
        { word: '만났어요', reading: 'man-na-sseo-yo', meaning: '遇见了' },
        { word: '아니라', reading: 'a-ni-ra', meaning: '不是（而是）' },
        { word: '아주', reading: 'a-ju', meaning: '非常' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '민지야, 오늘 고마워요! 🌸', zh: '敏智，今天谢谢你！' },
        { animalId: 'choco', ko: '토리 만나고 싶어요! 🍫', zh: '好想见见兔莉！' },
      ],
      likedBy: ['tori', 'choco', 'nabi', 'darami'],
    },
  },

  // ═══════════════ DAY 4 ═══════════════
  {
    id: 'blog-w1-08', slug: 'w1-tori-dorm', unlock_day: 4,
    title_ko: '한빛 기숙사 첫날', title_zh: '韩光宿舍第一天',
    excerpt_ko: '드디어 기숙사에 도착했어요. 방은 삼 층에 있어요.',
    level: '초급', category: '서울 일기', cover_emoji: '🏠', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 13, audio_duration: 0,
    published_at: D(4, 17),
    content: {
      sentences: [
        { ko: '오늘 한빛 기숙사에 도착했어요.', zh: '今天到了韩光宿舍。' },
        { ko: '제 방은 삼 층에 있어요.', zh: '我的房间在三楼。' },
        { ko: '사감 선생님께 인사를 했어요.', zh: '向宿管老师问了好。' },
        { ko: '"안녕하세요, 저는 토리예요."', zh: '“您好，我是兔莉。”' },
        { ko: '방이 깨끗해서 기분이 좋아요.', zh: '房间很干净，心情很好。' },
      ],
      vocab: [
        { word: '기숙사', reading: 'gi-suk-sa', meaning: '宿舍' },
        { word: '방', reading: 'bang', meaning: '房间' },
        { word: '층', reading: 'cheung', meaning: '楼、层' },
        { word: '깨끗해서', reading: 'kkae-kkeu-tae-seo', meaning: '因为干净' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '도착했어요', reading: 'do-cha-kae-sseo-yo', meaning: '到达了' },
        { word: '사감', reading: 'sa-gam', meaning: '宿管、舍监' },
        { word: '선생님', reading: 'seon-saeng-nim', meaning: '老师' },
        { word: '인사', reading: 'in-sa', meaning: '打招呼、问候' },
        { word: '안녕하세요', reading: 'an-nyeong-ha-se-yo', meaning: '您好' },
        { word: '기분', reading: 'gi-bun', meaning: '心情' },
        { word: '좋아요', reading: 'jo-a-yo', meaning: '好' },
      ],
      quiz: [
        {
          question: '토리의 방은 몇 층에 있어요?',
          options: ['삼 층', '일 층', '오 층', '십 층'],
          answerIndex: 0,
          explanation: '第二句说“我的房间在三楼（삼 층）”。',
        },
      ],
      comments: [
        { animalId: 'minji', ko: '방 깨끗해서 좋겠다! 💧', zh: '房间干净真好啊' },
        { animalId: 'darami', ko: '기숙사 생활 잘 적응하길 바라요 🌅', zh: '希望你尽快适应宿舍生活' },
      ],
      likedBy: ['minji', 'darami', 'news', 'nabi'],
    },
  },
  {
    id: 'blog-w1-09', slug: 'w1-darami-morning-d4', unlock_day: 4,
    title_ko: '다람쥐의 아침 · 오늘의 단어 "인사"', title_zh: '松鼠的早晨·今日单词“打招呼”',
    excerpt_ko: '좋은 아침이에요! 오늘은 인사를 배워요.',
    level: '초급', category: '일상', cover_emoji: '🌅', cover_theme: 'gold',
    author_id: 'darami', is_featured: 0, like_count: 18, audio_duration: 0,
    published_at: D(4, 7),
    content: {
      sentences: [
        { ko: '좋은 아침이에요! 🐿️', zh: '早上好！' },
        { ko: '오늘의 단어는 "안녕하세요"예요.', zh: '今天的单词是“您好”。' },
        { ko: '이웃을 만나면 안녕하세요, 하고 인사해요!', zh: '遇到邻居就说“您好”打招呼吧！' },
      ],
      vocab: [
        { word: '단어', reading: 'da-neo', meaning: '单词' },
        { word: '안녕하세요', reading: 'an-nyeong-ha-se-yo', meaning: '您好' },
        { word: '이웃', reading: 'i-ut', meaning: '邻居' },
        { word: '좋은', reading: 'jo-eun', meaning: '好的' },
        { word: '아침', reading: 'a-chim', meaning: '早晨、早上' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '만나면', reading: 'man-na-myeon', meaning: '如果遇到' },
        { word: '인사해요', reading: 'in-sa-hae-yo', meaning: '打招呼' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '안녕하세요! 오늘도 배워요 🌸', zh: '您好！今天也来学习' },
        { animalId: 'nabi', ko: '좋은 아침이에요, 다람쥐 님 ✨', zh: '早上好，松鼠~' },
      ],
      likedBy: ['tori', 'nabi', 'news', 'koal'],
    },
  },

  // ═══════════════ DAY 5 ═══════════════
  {
    id: 'blog-w1-10', slug: 'w1-tori-meet-haru', unlock_day: 5,
    title_ko: '기숙사에서 하루를 만났어요', title_zh: '在宿舍遇见了哈鲁',
    excerpt_ko: '기숙사 아래층에서 이웃 하루를 만났어요. 맞죠?',
    level: '초급', category: '일상', cover_emoji: '🐹', cover_theme: 'gold',
    author_id: 'tori', is_featured: 0, like_count: 17, audio_duration: 0,
    published_at: D(5, 19),
    content: {
      sentences: [
        { ko: '오늘 기숙사 아래층에서 하루를 만났어요.', zh: '今天在宿舍楼下遇见了哈鲁。' },
        { ko: '"우리 같은 층이죠, 맞죠?" 하고 물었어요.', zh: '我问“我们是同一层，对吧？”' },
        { ko: '하루는 조용하지만 아주 따뜻해요.', zh: '哈鲁很安静，但很温暖。' },
      ],
      vocab: [
        { word: '아래층', reading: 'a-rae-cheung', meaning: '楼下' },
        { word: '같은', reading: 'ga-teun', meaning: '相同的' },
        { word: '조용하지만', reading: 'jo-yong-ha-ji-man', meaning: '虽然安静' },
        { word: '따뜻해요', reading: 'tta-tteu-tae-yo', meaning: '温暖' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '기숙사', reading: 'gi-suk-sa', meaning: '宿舍' },
        { word: '만났어요', reading: 'man-na-sseo-yo', meaning: '遇见了' },
        { word: '우리', reading: 'u-ri', meaning: '我们' },
        { word: '물었어요', reading: 'mu-reo-sseo-yo', meaning: '问了' },
        { word: '아주', reading: 'a-ju', meaning: '非常' },
      ],
      quiz: [
        {
          question: '토리는 하루를 어디에서 만났어요?',
          options: ['기숙사 아래층', '공항', '학교', '카페'],
          answerIndex: 0,
          explanation: '第一句说“今天在宿舍楼下（아래층）遇见了하루”。',
        },
      ],
      comments: [
        { animalId: 'haru', ko: '맞아요! 우리 이웃이에요 🌰', zh: '没错！我们是邻居' },
        { animalId: 'minji', ko: '하루도 좋은 친구예요! 💧', zh: '哈鲁也是好朋友哦！' },
      ],
      likedBy: ['haru', 'minji', 'nabi', 'darami'],
    },
  },
  {
    id: 'blog-w1-11', slug: 'w1-haru-newneighbor', unlock_day: 5,
    title_ko: '새 이웃이 이사 왔어요 🌰', title_zh: '新邻居搬来了',
    excerpt_ko: '아래층에 귀여운 토끼 이웃이 왔어요. 도토리 과자를 나눴어요.',
    level: '초급', category: '일상', cover_emoji: '🌰', cover_theme: 'gold',
    author_id: 'haru', is_featured: 0, like_count: 12, audio_duration: 0,
    published_at: D(5, 21),
    content: {
      sentences: [
        { ko: '우리 기숙사에 새 이웃이 이사 왔어요.', zh: '我们宿舍搬来了新邻居。' },
        { ko: '이름은 토리예요. 토끼 친구예요.', zh: '名字叫兔莉，是只兔子朋友。' },
        { ko: '같이 도토리 과자를 먹었어요. 🌰', zh: '一起吃了橡子饼干。' },
      ],
      vocab: [
        { word: '이사', reading: 'i-sa', meaning: '搬家' },
        { word: '과자', reading: 'gwa-ja', meaning: '饼干、点心' },
        { word: '같이', reading: 'ga-chi', meaning: '一起' },
        { word: '우리', reading: 'u-ri', meaning: '我们' },
        { word: '기숙사', reading: 'gi-suk-sa', meaning: '宿舍' },
        { word: '새', reading: 'sae', meaning: '新的' },
        { word: '이웃', reading: 'i-ut', meaning: '邻居' },
        { word: '이름', reading: 'i-reum', meaning: '名字' },
        { word: '토끼', reading: 'to-kki', meaning: '兔子' },
        { word: '도토리', reading: 'do-to-ri', meaning: '橡子' },
        { word: '먹었어요', reading: 'meo-geo-sseo-yo', meaning: '吃了' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '하루야, 과자 정말 맛있었어요! 🌸', zh: '哈鲁，饼干真的很好吃！' },
        { animalId: 'choco', ko: '도토리 과자?! 저도 먹고 싶어요 🍫', zh: '橡子饼干？！我也想吃' },
      ],
      likedBy: ['tori', 'choco', 'minji', 'koal'],
    },
  },

  // ═══════════════ DAY 6 ═══════════════
  {
    id: 'blog-w1-12', slug: 'w1-tori-school', unlock_day: 6,
    title_ko: '어학당 첫 수업 · 반장 준호', title_zh: '语学堂第一课·班长俊浩',
    excerpt_ko: '오늘 어학당 첫 수업이었어요. 반장 준호는 정말 활발해요!',
    level: '초급', category: '일상', cover_emoji: '🐯', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 20, audio_duration: 0,
    published_at: D(6, 18),
    content: {
      sentences: [
        { ko: '오늘 어학당 첫 수업이었어요.', zh: '今天是语学堂的第一节课。' },
        { ko: '반장 준호가 "잘 부탁드려요!" 하고 인사했어요.', zh: '班长俊浩打招呼说“请多关照！”' },
        { ko: '준호는 목소리가 크고 활발해요. 🎤', zh: '俊浩嗓门很大，很活泼。' },
        { ko: '교실 친구들이 다 웃었어요.', zh: '教室里的朋友们都笑了。' },
      ],
      vocab: [
        { word: '어학당', reading: 'eo-hak-dang', meaning: '语学堂、语言学校' },
        { word: '수업', reading: 'su-eop', meaning: '课、上课' },
        { word: '반장', reading: 'ban-jang', meaning: '班长' },
        { word: '활발해요', reading: 'hwal-bal-hae-yo', meaning: '活泼' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '첫', reading: 'cheot', meaning: '第一、首次' },
        { word: '인사했어요', reading: 'in-sa-hae-sseo-yo', meaning: '打招呼了' },
        { word: '목소리', reading: 'mok-so-ri', meaning: '嗓音、声音' },
        { word: '크고', reading: 'keu-go', meaning: '大（而且）' },
        { word: '교실', reading: 'gyo-sil', meaning: '教室' },
        { word: '친구들', reading: 'chin-gu-deul', meaning: '朋友们' },
        { word: '웃었어요', reading: 'u-seo-sseo-yo', meaning: '笑了' },
      ],
      quiz: [
        {
          question: '준호는 어떤 성격이에요?',
          options: ['활발해요', '조용해요', '차가워요', '느려요'],
          answerIndex: 0,
          explanation: '第三句说준호“嗓门大、很活泼（활발해요）”。',
        },
      ],
      comments: [
        { animalId: 'junho', ko: '토리! 우리 반 최고예요! 가자!! 🔥', zh: '兔莉！我们班最棒！冲鸭！！' },
        { animalId: 'haru', ko: '준호는 언제나 힘이 넘쳐요 😆', zh: '俊浩总是充满活力' },
      ],
      likedBy: ['junho', 'haru', 'minji', 'darami', 'nabi'],
    },
  },
  {
    id: 'blog-w1-13', slug: 'w1-junho-newterm', unlock_day: 6,
    title_ko: '새 학기 시작! 화이팅! 🔥', title_zh: '新学期开始！加油！',
    excerpt_ko: '새 학기가 시작됐어요! 새 친구도 많이 왔어요. 가자!!',
    level: '초급', category: '일상', cover_emoji: '🎤', cover_theme: 'pink',
    author_id: 'junho', is_featured: 0, like_count: 24, audio_duration: 0,
    published_at: D(6, 20),
    content: {
      sentences: [
        { ko: '새 학기가 시작됐어요! 🔥', zh: '新学期开始了！' },
        { ko: '우리 반에 새 친구가 많이 왔어요.', zh: '我们班来了很多新朋友。' },
        { ko: '올해도 다 같이 화이팅! 가자!! 🎤', zh: '今年也一起加油！冲鸭！！' },
      ],
      vocab: [
        { word: '학기', reading: 'hak-gi', meaning: '学期' },
        { word: '시작', reading: 'si-jak', meaning: '开始' },
        { word: '화이팅', reading: 'hwa-i-ting', meaning: '加油' },
        { word: '새', reading: 'sae', meaning: '新的' },
        { word: '시작됐어요', reading: 'si-jak-dwae-sseo-yo', meaning: '开始了' },
        { word: '우리', reading: 'u-ri', meaning: '我们' },
        { word: '반', reading: 'ban', meaning: '班级' },
        { word: '친구', reading: 'chin-gu', meaning: '朋友' },
        { word: '많이', reading: 'ma-ni', meaning: '很多' },
        { word: '올해', reading: 'ol-hae', meaning: '今年' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '준호, 오늘 인사 멋있었어요! 🌸', zh: '俊浩，今天打招呼好帅！' },
        { animalId: 'choco', ko: '반장님 파이팅! 🍫', zh: '班长加油！' },
      ],
      likedBy: ['tori', 'choco', 'haru', 'minji', 'nabi'],
    },
  },

  // ═══════════════ DAY 7 ═══════════════
  {
    id: 'blog-w1-14', slug: 'w1-tori-firstweek', unlock_day: 7,
    title_ko: '지하철에서 하루가 제 당근을 주웠어요', title_zh: '地铁上，哈鲁捡起了我的胡萝卜',
    excerpt_ko: '막차, 휴대폰 1%, 그리고 굴러간 용기 당근… 하루가 주워 줬어요.',
    level: '초급', category: '서울 일기', cover_emoji: '🚇', cover_theme: 'pink',
    author_id: 'tori', is_featured: 1, like_count: 28, audio_duration: 0,
    published_at: D(7, 22),
    content: {
      sentences: [
        { ko: '오늘 밤 지하철에서 길을 잃었어요.', zh: '今晚在地铁里迷路了。' },
        { ko: '휴대폰은 1%, 막차도 곧 와요. 무서웠어요. 😥', zh: '手机只剩1%，末班车也快来了。好害怕。' },
        { ko: '그때 엄마 당근이 바닥에 떨어졌어요.', zh: '那时妈妈给的胡萝卜掉到了地上。' },
        { ko: '하루가 당근을 주웠어요. "여기, 괜찮아?" 🌰', zh: '哈鲁捡起胡萝卜。“给你，没事吧？”' },
        { ko: '막차는 놓쳤어요. 그래도 정말 행복해요! 🌸', zh: '虽然没赶上末班车，但真的很幸福！' },
      ],
      vocab: [
        { word: '지하철', reading: 'ji-ha-cheol', meaning: '地铁' },
        { word: '무서웠어요', reading: 'mu-seo-wo-sseo-yo', meaning: '（曾）害怕' },
        { word: '당근', reading: 'dang-geun', meaning: '胡萝卜' },
        { word: '행복해요', reading: 'haeng-bo-kae-yo', meaning: '幸福' },
        { word: '밤', reading: 'bam', meaning: '夜晚' },
        { word: '길', reading: 'gil', meaning: '路' },
        { word: '잃었어요', reading: 'i-reo-sseo-yo', meaning: '迷失、丢了' },
        { word: '휴대폰', reading: 'hyu-dae-pon', meaning: '手机' },
        { word: '막차', reading: 'mak-cha', meaning: '末班车' },
        { word: '그때', reading: 'geu-ttae', meaning: '那时' },
        { word: '엄마', reading: 'eom-ma', meaning: '妈妈' },
        { word: '주웠어요', reading: 'ju-wo-sseo-yo', meaning: '捡起了' },
      ],
      quiz: [
        {
          question: '하루가 지하철에서 뭘 주웠어요?',
          options: ['당근', '휴대폰', '가방', '지갑'],
          answerIndex: 0,
          explanation: '哈鲁捡起了兔莉掉在地上的“妈妈给的胡萝卜(당근)”。',
        },
      ],
      comments: [
        { animalId: 'haru', ko: '그 당근, 정말 소중해 보였어요 🌰', zh: '那根胡萝卜，看起来真的很珍贵' },
        { animalId: 'minji', ko: '막차 놓쳐도 괜찮아요! 😆💧', zh: '没赶上末班车也没关系！' },
        { animalId: 'junho', ko: '하루 완전 멋있다! 🔥', zh: '哈鲁太帅了！' },
        { animalId: 'darami', ko: '토리, 무서웠겠어요. 잘 견뎠어요! 🌅', zh: '兔莉，肯定很害怕吧。你挺过来了！' },
      ],
      likedBy: ['haru', 'minji', 'junho', 'darami', 'nabi', 'choco', 'news', 'koal'],
    },
  },
  {
    id: 'blog-w1-15', slug: 'w1-news-weekreview', unlock_day: 7,
    title_ko: '이번 주 동물시 소식', title_zh: '本周动物城消息',
    excerpt_ko: '이번 주 동물시에는 새 이웃과 새 학기 소식이 있었어요.',
    level: '초급', category: '소식', cover_emoji: '📰', cover_theme: 'gold',
    author_id: 'news', is_featured: 0, like_count: 8, audio_duration: 0,
    published_at: D(7, 12),
    content: {
      sentences: [
        { ko: '동물시 뉴스예요.', zh: '这里是动物城新闻。' },
        { ko: '이번 주에 새 이웃이 왔어요.', zh: '这周来了新邻居。' },
        { ko: '그리고 어학당 새 학기가 시작됐어요.', zh: '而且语学堂新学期开始了。' },
        { ko: '다음 주도 좋은 소식이 많기를 바라요!', zh: '希望下周也有很多好消息！' },
      ],
      vocab: [
        { word: '소식', reading: 'so-sik', meaning: '消息' },
        { word: '학기', reading: 'hak-gi', meaning: '学期' },
        { word: '다음 주', reading: 'da-eum ju', meaning: '下周' },
        { word: '동물시', reading: 'dong-mul-si', meaning: '动物城' },
        { word: '뉴스', reading: 'nyu-seu', meaning: '新闻' },
        { word: '이번 주', reading: 'i-beon ju', meaning: '这周' },
        { word: '새', reading: 'sae', meaning: '新的' },
        { word: '이웃', reading: 'i-ut', meaning: '邻居' },
        { word: '어학당', reading: 'eo-hak-dang', meaning: '语学堂、语言学校' },
        { word: '시작됐어요', reading: 'si-jak-dwae-sseo-yo', meaning: '开始了' },
        { word: '좋은', reading: 'jo-eun', meaning: '好的' },
      ],
      quiz: [],
      comments: [
        { animalId: 'nabi', ko: '이번 주도 평화로웠네요 ✨', zh: '这周也很平和呢' },
        { animalId: 'koal', ko: '다음 주도 잘 부탁해요 🐨', zh: '下周也请多关照' },
      ],
      likedBy: ['tori', 'nabi', 'koal', 'darami'],
    },
  },
  {
    id: 'blog-w1-16', slug: 'w1-nabi-sky', unlock_day: 5,
    title_ko: '오늘 서울 하늘이 예뻐요', title_zh: '今天首尔的天空好美',
    excerpt_ko: '저녁에 하늘이 분홍색이었어요. 사진으로 남기고 싶어요.',
    level: '초급', category: '일상', cover_emoji: '🌆', cover_theme: 'purple',
    author_id: 'nabi', is_featured: 0, like_count: 21, audio_duration: 0,
    published_at: D(5, 19),
    content: {
      sentences: [
        { ko: '오늘 저녁 하늘이 정말 예뻐요.', zh: '今天傍晚的天空真美。' },
        { ko: '하늘이 분홍색이에요. ✨', zh: '天空是粉色的。' },
        { ko: '이런 순간을 사진으로 남기고 싶어요.', zh: '想把这样的瞬间用照片留下来。' },
      ],
      vocab: [
        { word: '하늘', reading: 'ha-neul', meaning: '天空' },
        { word: '저녁', reading: 'jeo-nyeok', meaning: '傍晚、晚上' },
        { word: '분홍색', reading: 'bun-hong-saek', meaning: '粉色' },
        { word: '사진', reading: 'sa-jin', meaning: '照片' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '정말', reading: 'jeong-mal', meaning: '真的、非常' },
        { word: '예뻐요', reading: 'ye-ppeo-yo', meaning: '漂亮、美' },
        { word: '이런', reading: 'i-reon', meaning: '这样的' },
        { word: '순간', reading: 'sun-gan', meaning: '瞬间' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '우와, 하늘 색이 진짜 예뻐요! 🌸', zh: '哇，天空的颜色真美！' },
        { animalId: 'koal', ko: '나비는 사진을 참 잘 찍어요 🐨', zh: '娜比拍照真的很棒' },
      ],
      likedBy: ['tori', 'koal', 'haru', 'choco'],
    },
  },
  {
    id: 'blog-w1-17', slug: 'w1-choco-snack', unlock_day: 6,
    title_ko: '기숙사 앞 붕어빵 발견! 🍫', title_zh: '宿舍前发现了鲷鱼烧！',
    excerpt_ko: '기숙사 앞에서 붕어빵을 팔아요. 진짜 맛있어요!',
    level: '초급', category: '일상', cover_emoji: '🐟', cover_theme: 'mint',
    author_id: 'choco', is_featured: 0, like_count: 26, audio_duration: 0,
    published_at: D(6, 17),
    content: {
      sentences: [
        { ko: '기숙사 앞에서 붕어빵을 팔아요.', zh: '宿舍前面在卖鲷鱼烧。' },
        { ko: '하나에 오백 원이에요. 🍫', zh: '一个五百韩元。' },
        { ko: '따뜻하고 정말 맛있어요!', zh: '热乎乎的，真好吃！' },
      ],
      vocab: [
        { word: '붕어빵', reading: 'bung-eo-ppang', meaning: '鲷鱼烧（豆沙鱼形饼）' },
        { word: '앞', reading: 'ap', meaning: '前面' },
        { word: '맛있어요', reading: 'ma-si-sseo-yo', meaning: '好吃' },
        { word: '기숙사', reading: 'gi-suk-sa', meaning: '宿舍' },
        { word: '팔아요', reading: 'pa-ra-yo', meaning: '卖' },
        { word: '하나', reading: 'ha-na', meaning: '一个' },
        { word: '오백', reading: 'o-baek', meaning: '五百' },
        { word: '원', reading: 'won', meaning: '韩元' },
        { word: '따뜻하고', reading: 'tta-tteu-ta-go', meaning: '温暖（而且）' },
        { word: '정말', reading: 'jeong-mal', meaning: '真的、非常' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '어디예요? 저도 먹고 싶어요! 🌸', zh: '在哪里？我也想吃！' },
        { animalId: 'haru', ko: '겨울엔 붕어빵이죠 🌰', zh: '冬天就要吃鲷鱼烧呀' },
        { animalId: 'junho', ko: '같이 먹으러 가자!! 🔥', zh: '一起去吃吧！！' },
      ],
      likedBy: ['tori', 'haru', 'junho', 'minji', 'nabi'],
    },
  },
];

// 现有 6 篇种子帖 → 按等级重新门控（红线：Day1 新用户不能看到 중급/고급）。
const regate = [
  { id: 'blog-hongdae', unlock_day: 1 },
  { id: 'blog-subway', unlock_day: 2 },
  { id: 'blog-cafe', unlock_day: 15 },
  { id: 'blog-hoesik', unlock_day: 17 },
  { id: 'blog-baedal', unlock_day: 23 },
  { id: 'blog-proverb', unlock_day: 24 },
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
  console.log(`Inserted / updated ${count} Week1 posts.`);

  let regated = 0;
  for (const r of regate) {
    const res = await client.execute({
      sql: `UPDATE blog_posts SET unlock_day = ? WHERE id = ?`,
      args: [r.unlock_day, r.id],
    });
    if (res.rowsAffected > 0) regated++;
  }
  console.log(`Re-gated ${regated} existing seed posts.`);

  await client.close();
}

main().catch((err) => {
  console.error(err);
  client.close();
  process.exit(1);
});
