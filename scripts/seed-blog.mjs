import { createClient } from '@libsql/client';
import path from 'path';

const url = process.env.TURSO_DATABASE_URL;
const client = createClient({
  url: url || `file:${path.join(process.cwd(), 'data', 'app.db')}`,
  ...(url ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
});

// ---------------------------------------------------------------------------
// 6 SNS-style blog posts.
// content_json = { sentences, vocab, quiz, comments, likedBy }.
// Rules:
//   - every vocab.word must appear verbatim inside at least one sentence.ko
//   - vocab.meaning / quiz.explanation / comment.zh are PURE Chinese
//   - comment.animalId ∈ CAST_IDS and ≠ the post's own author_id
// Animal cast (src/data/blogCast.ts): tori, gomdori, nabi, choco, yowoo, koal
// ---------------------------------------------------------------------------

const CAST_IDS = ['tori', 'gomdori', 'nabi', 'choco', 'yowoo', 'koal'];

const posts = [
  // 1) FEATURED — 홍대에서의 하루 · 초급 · 서울 일기 · tori · pink
  {
    id: 'blog-hongdae',
    slug: 'hongdae-hana',
    unlock_day: 24,
    title_ko: '홍대에서의 하루',
    title_zh: '在弘大的一天',
    excerpt_ko: '친구랑 홍대에 가서 보낸 즐거운 하루 이야기예요.',
    level: '초급',
    category: '서울 일기',
    cover_emoji: '🎨',
    audio_url: '',
    audio_duration: 300,
    is_featured: 1,
    author_id: 'tori',
    like_count: 24,
    cover_theme: 'pink',
    published_at: Date.UTC(2026, 6, 15, 9, 0, 0),
    content: {
      sentences: [
        { ko: '오늘은 날씨가 정말 좋아서 친구랑 홍대에 갔어요.', zh: '今天天气特别好，所以和朋友一起去了弘大。' },
        { ko: '홍대는 한국의 젊은 문화가 모이는 곳이에요.', zh: '弘大是韩国年轻文化聚集的地方。' },
        { ko: '거리에서 노래를 부르는 사람들을 많이 봤어요.', zh: '在街上看到很多唱歌的人。' },
        { ko: '우리는 맛있는 커피를 마시면서 이야기를 많이 나눴어요.', zh: '我们一边喝着好喝的咖啡，一边聊了很多。' },
        { ko: '정말 즐거운 하루였어요!', zh: '真是愉快的一天！' },
      ],
      vocab: [
        { word: '날씨', reading: 'nal-ssi', meaning: '天气' },
        { word: '친구', reading: 'chin-gu', meaning: '朋友' },
        { word: '홍대', reading: 'hong-dae', meaning: '弘大（首尔地名）' },
        { word: '문화', reading: 'mun-hwa', meaning: '文化' },
        { word: '거리', reading: 'geo-ri', meaning: '街道、大街' },
        { word: '노래', reading: 'no-rae', meaning: '歌曲' },
        { word: '사람들', reading: 'sa-ram-deul', meaning: '人们' },
        { word: '커피', reading: 'keo-pi', meaning: '咖啡' },
        { word: '이야기', reading: 'i-ya-gi', meaning: '谈话、故事' },
        { word: '하루', reading: 'ha-ru', meaning: '一天' },
        { word: '즐거운', reading: 'jeul-geo-un', meaning: '愉快的、快乐的' },
      ],
      quiz: [
        {
          question: '글쓴이는 오늘 누구와 홍대에 갔어요?',
          options: ['친구', '가족', '혼자', '선생님'],
          answerIndex: 0,
          explanation: '第一句说“今天天气好，所以和朋友一起去了弘大”。',
        },
      ],
      comments: [
        { animalId: 'nabi', ko: '우와~ 홍대 진짜 재밌겠다! 🥰', zh: '哇 弘大肯定超好玩' },
        { animalId: 'choco', ko: '다음엔 나도 데려가 줘 ㅠㅠ', zh: '下次也带我去嘛' },
        { animalId: 'yowoo', ko: '사진 진짜 예쁘다 👍', zh: '照片真好看' },
        { animalId: 'gomdori', ko: '좋은 하루 보냈구나 :)', zh: '度过了美好的一天呢' },
      ],
      likedBy: ['gomdori', 'nabi', 'choco'],
    },
  },

  // 2) 서울 일기 · 초급 — 아침 지하철 · tori · mint
  {
    id: 'blog-subway',
    slug: 'subway-morning',
    unlock_day: 7,
    title_ko: '아침 지하철',
    title_zh: '早晨的地铁',
    excerpt_ko: '매일 아침 지하철을 타고 학교에 가는 이야기예요.',
    level: '초급',
    category: '서울 일기',
    cover_emoji: '🚇',
    audio_url: '',
    audio_duration: 150,
    is_featured: 0,
    author_id: 'tori',
    like_count: 12,
    cover_theme: 'mint',
    published_at: Date.UTC(2026, 6, 4, 9, 0, 0),
    content: {
      sentences: [
        { ko: '저는 아침마다 지하철을 타고 학교에 가요.', zh: '我每天早上坐地铁去学校。' },
        { ko: '지하철역은 우리 집에서 아주 가까워요.', zh: '地铁站离我家很近。' },
        { ko: '아침에는 사람이 정말 많아요.', zh: '早上人特别多。' },
        { ko: '그래서 저는 항상 이어폰으로 음악을 들어요.', zh: '所以我总是用耳机听音乐。' },
        { ko: '지하철 요금은 카드로 내면 편해요.', zh: '地铁的费用用卡付很方便。' },
        { ko: '창밖으로 한강이 보이면 기분이 좋아요.', zh: '从窗外看到汉江时，心情很好。' },
        { ko: '학교까지 삼십 분쯤 걸려요.', zh: '到学校大约要三十分钟。' },
      ],
      vocab: [
        { word: '아침', reading: 'a-chim', meaning: '早晨、早上' },
        { word: '지하철', reading: 'ji-ha-cheol', meaning: '地铁' },
        { word: '지하철역', reading: 'ji-ha-cheol-yeok', meaning: '地铁站' },
        { word: '학교', reading: 'hak-gyo', meaning: '学校' },
        { word: '집', reading: 'jip', meaning: '家、房子' },
        { word: '이어폰', reading: 'i-eo-pon', meaning: '耳机' },
        { word: '음악', reading: 'eum-ak', meaning: '音乐' },
        { word: '요금', reading: 'yo-geum', meaning: '费用、票价' },
        { word: '카드', reading: 'ka-deu', meaning: '卡、卡片' },
        { word: '창밖', reading: 'chang-bak', meaning: '窗外' },
        { word: '한강', reading: 'han-gang', meaning: '汉江（首尔的河）' },
        { word: '기분', reading: 'gi-bun', meaning: '心情、情绪' },
      ],
      quiz: [
        {
          question: '글쓴이는 아침에 무엇을 타고 학교에 가요?',
          options: ['지하철', '버스', '자전거', '택시'],
          answerIndex: 0,
          explanation: '第一句说“每天早上坐地铁去学校”。',
        },
      ],
      comments: [
        { animalId: 'choco', ko: '지하철 아침엔 진짜 붐비죠 ㅠㅠ', zh: '地铁早上真的很挤' },
        { animalId: 'koal', ko: '저는 버스 타요~', zh: '我坐公交呀' },
        { animalId: 'gomdori', ko: '음악 들으면 시간 금방 가지 :)', zh: '听着音乐时间过得很快呢' },
      ],
      likedBy: ['choco', 'koal', 'nabi'],
    },
  },

  // 3) 서울 일기 · 중급 — 주말의 한옥 카페 · tori · mint
  {
    id: 'blog-cafe',
    slug: 'weekend-cafe',
    unlock_day: 15,
    title_ko: '주말의 한옥 카페',
    title_zh: '周末的韩屋咖啡馆',
    excerpt_ko: '오래된 한옥을 개조한 카페에서 보낸 여유로운 주말이에요.',
    level: '중급',
    category: '서울 일기',
    cover_emoji: '☕',
    audio_url: '',
    audio_duration: 210,
    is_featured: 0,
    author_id: 'tori',
    like_count: 15,
    cover_theme: 'mint',
    published_at: Date.UTC(2026, 6, 12, 9, 0, 0),
    content: {
      sentences: [
        { ko: '지난 주말에 저는 친구와 함께 서촌에 있는 카페에 갔어요.', zh: '上个周末我和朋友一起去了西村的一家咖啡馆。' },
        { ko: '그 카페는 오래된 한옥을 개조해서 만든 곳이에요.', zh: '那家咖啡馆是由一座老韩屋改造而成的。' },
        { ko: '문을 열자마자 고소한 커피 향이 났어요.', zh: '一推开门，就飘来香浓的咖啡香。' },
        { ko: '우리는 창가에 앉아서 따뜻한 차를 마셨어요.', zh: '我们坐在窗边喝了热茶。' },
        { ko: '사장님이 직접 만든 케이크도 정말 맛있었어요.', zh: '老板亲手做的蛋糕也非常好吃。' },
        { ko: '창밖으로는 조용한 골목이 보였어요.', zh: '窗外能看到安静的小巷。' },
        { ko: '도시 한가운데에서 이렇게 여유로운 시간을 보내니 기분이 좋았어요.', zh: '在城市正中央度过这样悠闲的时光，心情很好。' },
        { ko: '다음에는 가족과 다시 오고 싶어요.', zh: '下次想和家人再来。' },
      ],
      vocab: [
        { word: '주말', reading: 'ju-mal', meaning: '周末' },
        { word: '서촌', reading: 'seo-chon', meaning: '西村（首尔地名）' },
        { word: '카페', reading: 'ka-pe', meaning: '咖啡馆' },
        { word: '한옥', reading: 'han-ok', meaning: '韩屋（韩国传统房屋）' },
        { word: '개조', reading: 'gae-jo', meaning: '改造' },
        { word: '향', reading: 'hyang', meaning: '香气' },
        { word: '창가', reading: 'chang-ga', meaning: '窗边' },
        { word: '차', reading: 'cha', meaning: '茶' },
        { word: '사장님', reading: 'sa-jang-nim', meaning: '老板' },
        { word: '케이크', reading: 'ke-i-keu', meaning: '蛋糕' },
        { word: '골목', reading: 'gol-mok', meaning: '小巷、胡同' },
        { word: '도시', reading: 'do-si', meaning: '城市' },
        { word: '여유로운', reading: 'yeo-yu-ro-un', meaning: '悠闲的、从容的' },
      ],
      quiz: [
        {
          question: '그 카페는 무엇을 개조해서 만들었어요?',
          options: ['한옥', '아파트', '학교', '시장'],
          answerIndex: 0,
          explanation: '第二句说这家咖啡馆是由一座老韩屋改造而成的。',
        },
        {
          question: '두 사람은 카페에서 무엇을 마셨어요?',
          options: ['따뜻한 차', '맥주', '주스', '우유'],
          answerIndex: 0,
          explanation: '第四句说他们坐在窗边喝了热茶。',
        },
      ],
      comments: [
        { animalId: 'nabi', ko: '한옥 카페 분위기 최고죠 ✨', zh: '韩屋咖啡馆的氛围超棒' },
        { animalId: 'yowoo', ko: '케이크 사진 봤어? 침 고인다 ㅋㅋ', zh: '看到蛋糕照片了吗 流口水了哈哈' },
        { animalId: 'koal', ko: '조용해서 좋겠다~', zh: '安静真好呀' },
      ],
      likedBy: ['nabi', 'yowoo', 'koal'],
    },
  },

  // 4) 문화 노트 · 중급 — 회식 문화 · nabi · purple
  {
    id: 'blog-hoesik',
    slug: 'hoesik-culture',
    unlock_day: 17,
    title_ko: '변화하는 회식 문화',
    title_zh: '正在变化的聚餐文化',
    excerpt_ko: '술자리 중심이던 회식이 요즘 어떻게 달라지고 있을까요.',
    level: '중급',
    category: '문화 노트',
    cover_emoji: '🍶',
    audio_url: '',
    audio_duration: 260,
    is_featured: 0,
    author_id: 'nabi',
    like_count: 31,
    cover_theme: 'purple',
    published_at: Date.UTC(2026, 6, 10, 9, 0, 0),
    content: {
      sentences: [
        { ko: '회식은 한국 직장 문화를 이해하는 중요한 열쇠이다.', zh: '聚餐是理解韩国职场文化的一把重要钥匙。' },
        { ko: '회식은 단순히 함께 밥을 먹는 자리가 아니라 동료 사이의 관계를 다지는 시간이다.', zh: '聚餐不只是一起吃饭的场合，而是巩固同事之间关系的时间。' },
        { ko: '예전에는 회식이 끝난 뒤 늦게까지 술을 마시는 경우가 많았다.', zh: '以前聚餐结束后，常常喝酒喝到很晚。' },
        { ko: '상사가 권하는 술을 거절하기 어려운 분위기도 있었다.', zh: '当时也存在难以拒绝上司劝酒的氛围。' },
        { ko: '그러나 최근에는 이러한 문화가 조금씩 바뀌고 있다.', zh: '然而最近这种文化正在一点点改变。' },
        { ko: '젊은 세대는 개인의 시간과 사생활을 더 중요하게 여기기 때문이다.', zh: '因为年轻一代更重视个人的时间和私生活。' },
        { ko: '그래서 요즘은 술 대신 점심을 함께 먹거나 공연을 보러 가는 회식도 늘고 있다.', zh: '所以最近以吃午饭或看演出来代替喝酒的聚餐也在增多。' },
        { ko: '이러한 변화는 일과 삶의 균형을 중시하는 사회 분위기를 잘 보여 준다.', zh: '这种变化很好地体现了重视工作与生活平衡的社会氛围。' },
        { ko: '결국 회식의 형태는 시대에 따라 계속 달라지고 있다.', zh: '归根结底，聚餐的形式随着时代不断变化。' },
      ],
      vocab: [
        { word: '회식', reading: 'hoe-sik', meaning: '公司聚餐' },
        { word: '직장', reading: 'jik-jang', meaning: '职场、工作单位' },
        { word: '열쇠', reading: 'yeol-soe', meaning: '钥匙' },
        { word: '동료', reading: 'dong-nyo', meaning: '同事' },
        { word: '관계', reading: 'gwan-gye', meaning: '关系' },
        { word: '술', reading: 'sul', meaning: '酒' },
        { word: '상사', reading: 'sang-sa', meaning: '上司' },
        { word: '거절', reading: 'geo-jeol', meaning: '拒绝' },
        { word: '분위기', reading: 'bun-wi-gi', meaning: '氛围、气氛' },
        { word: '세대', reading: 'se-dae', meaning: '世代、一代人' },
        { word: '사생활', reading: 'sa-saeng-hwal', meaning: '私生活、隐私' },
        { word: '공연', reading: 'gong-yeon', meaning: '演出、表演' },
        { word: '균형', reading: 'gyun-hyeong', meaning: '均衡、平衡' },
      ],
      quiz: [
        {
          question: '예전 회식에서 거절하기 어려웠던 것은 무엇인가요?',
          options: ['상사가 권하는 술', '늦은 점심', '회사 공연', '개인 시간'],
          answerIndex: 0,
          explanation: '第四句提到，当时难以拒绝上司劝的酒。',
        },
        {
          question: '젊은 세대가 더 중요하게 여기는 것은 무엇인가요?',
          options: ['회사의 이익', '개인의 시간과 사생활', '늦은 술자리', '상사의 권유'],
          answerIndex: 1,
          explanation: '第六句说年轻一代更重视个人的时间和私生活。',
        },
      ],
      comments: [
        { animalId: 'yowoo', ko: '나 회식 좋아하는데 ㅋㅋ', zh: '我挺喜欢聚餐的哈哈' },
        { animalId: 'choco', ko: '요즘은 1차만 하죠!', zh: '最近只去第一场啦' },
        { animalId: 'tori', ko: '술 대신 점심 회식 좋아요!', zh: '用午饭代替喝酒的聚餐真好' },
      ],
      likedBy: ['choco', 'koal', 'tori'],
    },
  },

  // 5) 문화 노트 · 고급 — 배달 음식의 세계 · choco · mint
  {
    id: 'blog-baedal',
    slug: 'baedal-food',
    unlock_day: 30,
    title_ko: '배달 음식의 세계',
    title_zh: '外卖的世界',
    excerpt_ko: '치킨부터 커피까지, 한국의 발달한 배달 문화를 들여다봐요.',
    level: '고급',
    category: '문화 노트',
    cover_emoji: '🍜',
    audio_url: '',
    audio_duration: 240,
    is_featured: 0,
    author_id: 'choco',
    like_count: 27,
    cover_theme: 'mint',
    published_at: Date.UTC(2026, 6, 9, 9, 0, 0),
    content: {
      sentences: [
        { ko: '한국은 배달 음식의 천국이라고 불릴 만큼 배달 문화가 발달했다.', zh: '韩国发达的外卖文化甚至让它被称为外卖的天堂。' },
        { ko: '치킨부터 족발, 심지어 커피까지 거의 모든 음식을 집 앞까지 받을 수 있다.', zh: '从炸鸡到猪蹄，甚至连咖啡，几乎所有食物都能送到家门口。' },
        { ko: '스마트폰 앱 하나만 있으면 몇 번의 터치로 주문이 끝난다.', zh: '只要有一个手机应用，点几下就能完成下单。' },
        { ko: '늦은 밤에도 배달이 가능해서 야식 문화가 자연스럽게 자리 잡았다.', zh: '深夜也能配送，所以夜宵文化自然而然地扎下了根。' },
        { ko: '예전에는 중국집이나 치킨집 정도만 배달을 했다.', zh: '以前只有中餐馆或炸鸡店之类才提供外卖。' },
        { ko: '그러나 배달 앱이 등장하면서 작은 식당들도 쉽게 배달을 시작할 수 있게 되었다.', zh: '然而随着外卖应用的出现，小餐馆也能轻松开始配送。' },
        { ko: '물론 잦은 배달은 일회용 쓰레기 문제를 낳기도 한다.', zh: '当然，频繁的外卖也带来了一次性垃圾的问题。' },
        { ko: '그래서 최근에는 다회용기를 쓰는 친환경 배달 서비스도 늘고 있다.', zh: '因此最近使用可循环餐具的环保外卖服务也在增多。' },
      ],
      vocab: [
        { word: '배달', reading: 'bae-dal', meaning: '配送、外卖' },
        { word: '음식', reading: 'eum-sik', meaning: '食物、饮食' },
        { word: '천국', reading: 'cheon-guk', meaning: '天堂' },
        { word: '치킨', reading: 'chi-kin', meaning: '炸鸡' },
        { word: '스마트폰', reading: 'seu-ma-teu-pon', meaning: '智能手机' },
        { word: '주문', reading: 'ju-mun', meaning: '点餐、下单' },
        { word: '야식', reading: 'ya-sik', meaning: '夜宵' },
        { word: '등장', reading: 'deung-jang', meaning: '登场、出现' },
        { word: '식당', reading: 'sik-dang', meaning: '餐馆、饭店' },
        { word: '쓰레기', reading: 'sseu-re-gi', meaning: '垃圾' },
        { word: '일회용', reading: 'il-hoe-yong', meaning: '一次性' },
        { word: '친환경', reading: 'chin-hwan-gyeong', meaning: '环保' },
      ],
      quiz: [
        {
          question: '글에 따르면 한국에서 배달할 수 있는 음식은?',
          options: ['거의 모든 음식', '치킨만', '커피만', '중국 음식만'],
          answerIndex: 0,
          explanation: '第二句说从炸鸡到咖啡，几乎所有食物都能送到家门口。',
        },
        {
          question: '잦은 배달이 낳는 문제는 무엇인가요?',
          options: ['일회용 쓰레기 문제', '교통사고', '음식 가격 상승', '앱 오류'],
          answerIndex: 0,
          explanation: '第七句说频繁的外卖会带来一次性垃圾的问题。',
        },
      ],
      comments: [
        { animalId: 'tori', ko: '배달 음식 없으면 못 살아요 ㅠㅠ', zh: '没有外卖我可活不下去' },
        { animalId: 'gomdori', ko: '환경도 생각해야겠구나', zh: '也得为环境着想呢' },
        { animalId: 'yowoo', ko: '나 어제도 치킨 시켰는데 ㅋㅋ', zh: '我昨天也点了炸鸡哈哈' },
      ],
      likedBy: ['tori', 'yowoo', 'koal'],
    },
  },

  // 6) 속담 · 고급 — 가는 말이 고와야 오는 말이 곱다 · gomdori · gold (listening-flavored)
  {
    id: 'blog-proverb',
    slug: 'proverb-ganeun-mal',
    unlock_day: 30,
    title_ko: '가는 말이 고와야 오는 말이 곱다',
    title_zh: '你说话和气，别人才会和气',
    excerpt_ko: '말의 힘을 일깨우는 한국 속담 하나를 소개해요.',
    level: '고급',
    category: '속담',
    cover_emoji: '🌾',
    audio_url: '',
    audio_duration: 48,
    is_featured: 0,
    author_id: 'gomdori',
    like_count: 18,
    cover_theme: 'gold',
    published_at: Date.UTC(2026, 6, 6, 9, 0, 0),
    content: {
      sentences: [
        { ko: "'가는 말이 고와야 오는 말이 곱다'라는 속담이 있다.", zh: '有一句俗语说“去话说得好听，来话才会好听”。' },
        { ko: '이 말은 내가 남에게 곱게 말해야 남도 나에게 곱게 말한다는 뜻이다.', zh: '这句话的意思是，我对别人说话和气，别人才会对我说话和气。' },
        { ko: '즉, 말은 서로 주고받는 것이라는 지혜가 담겨 있다.', zh: '也就是说，其中蕴含着“言语是相互往来的”这一智慧。' },
        { ko: '우리는 기분이 나쁠 때 무심코 거친 말을 내뱉기 쉽다.', zh: '我们在心情不好时，容易无意间说出粗话。' },
        { ko: '그러나 거친 말은 결국 상대의 마음을 상하게 하고 나에게 돌아온다.', zh: '然而粗话最终会伤害对方的心，并回到自己身上。' },
        { ko: '반대로 따뜻한 말 한마디는 상대의 마음을 열고 좋은 관계를 만든다.', zh: '相反，一句温暖的话能打开对方的心，建立良好的关系。' },
        { ko: '그래서 한국 사람들은 말의 힘을 매우 소중하게 여긴다.', zh: '所以韩国人非常珍视言语的力量。' },
        { ko: '작은 말투 하나가 사람의 관계를 바꿀 수 있다는 것을 잊지 말아야 한다.', zh: '不要忘记，一个小小的语气也能改变人与人之间的关系。' },
      ],
      vocab: [
        { word: '속담', reading: 'sok-dam', meaning: '俗语、谚语' },
        { word: '곱다', reading: 'gop-da', meaning: '（话）和气好听；美丽' },
        { word: '뜻', reading: 'tteut', meaning: '意思、含义' },
        { word: '지혜', reading: 'ji-hye', meaning: '智慧' },
        { word: '기분', reading: 'gi-bun', meaning: '心情、情绪' },
        { word: '거친', reading: 'geo-chin', meaning: '粗鲁的、粗糙的' },
        { word: '상대', reading: 'sang-dae', meaning: '对方、对象' },
        { word: '마음', reading: 'ma-eum', meaning: '心、心意' },
        { word: '한마디', reading: 'han-ma-di', meaning: '一句话' },
        { word: '관계', reading: 'gwan-gye', meaning: '关系' },
        { word: '힘', reading: 'him', meaning: '力量、力气' },
        { word: '말투', reading: 'mal-tu', meaning: '语气、说话的口气' },
      ],
      quiz: [
        {
          question: '이 속담이 말하려는 것은 무엇인가요?',
          options: [
            '내가 곱게 말해야 남도 곱게 말한다',
            '말은 많이 할수록 좋다',
            '침묵이 언제나 가장 좋다',
            '큰 소리로 말해야 한다',
          ],
          answerIndex: 0,
          explanation: '第二句解释了这句话的意思——我对别人说话和气，别人才会对我说话和气。',
        },
      ],
      comments: [
        { animalId: 'tori', ko: '곰돌이 오빠 최고예요! 👏', zh: '熊哥哥最棒了' },
        { animalId: 'yowoo', ko: '말 진짜 예쁘게 하시네요 ✨', zh: '说话真的好温柔' },
        { animalId: 'nabi', ko: '마음에 새길게요 :)', zh: '我会记在心里的' },
      ],
      likedBy: ['tori', 'nabi', 'choco'],
    },
  },
];

// ---------------------------------------------------------------------------
// Self-checks:
//   1. every vocab.word must be a substring of some sentence.ko
//   2. quiz answerIndex in range
//   3. comment.animalId ∈ CAST_IDS and ≠ post's own author_id
// ---------------------------------------------------------------------------
let problems = 0;
for (const p of posts) {
  const body = p.content.sentences.map((s) => s.ko).join('  ');
  for (const v of p.content.vocab) {
    if (!body.includes(v.word)) {
      problems++;
      console.error(`[VOCAB MISMATCH] ${p.slug}: "${v.word}" not found in any sentence`);
    }
  }
  for (const q of p.content.quiz) {
    if (q.answerIndex < 0 || q.answerIndex >= q.options.length) {
      problems++;
      console.error(`[QUIZ BAD INDEX] ${p.slug}: ${q.question}`);
    }
  }
  if (!CAST_IDS.includes(p.author_id)) {
    problems++;
    console.error(`[AUTHOR BAD] ${p.slug}: author_id "${p.author_id}" not in cast`);
  }
  for (const c of p.content.comments) {
    if (!CAST_IDS.includes(c.animalId)) {
      problems++;
      console.error(`[COMMENT BAD ID] ${p.slug}: "${c.animalId}" not in cast`);
    }
    if (c.animalId === p.author_id) {
      problems++;
      console.error(`[COMMENT SELF] ${p.slug}: comment by own author "${c.animalId}"`);
    }
  }
  for (const id of p.content.likedBy) {
    if (!CAST_IDS.includes(id)) {
      problems++;
      console.error(`[LIKEDBY BAD ID] ${p.slug}: "${id}" not in cast`);
    }
  }
}
if (problems > 0) {
  console.error(`\nAborting: ${problems} self-check problem(s).`);
  process.exit(1);
}
console.log('Self-checks passed for all posts (vocab / quiz / comments / likedBy).');

// ---------------------------------------------------------------------------
// Schema (idempotent) + upsert
// ---------------------------------------------------------------------------
async function main() {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title_ko TEXT NOT NULL,
      title_zh TEXT NOT NULL,
      excerpt_ko TEXT NOT NULL DEFAULT '',
      level TEXT NOT NULL DEFAULT '초급',
      category TEXT NOT NULL DEFAULT '서울 일기',
      content_json TEXT NOT NULL DEFAULT '{}',
      audio_url TEXT NOT NULL DEFAULT '',
      audio_duration INTEGER NOT NULL DEFAULT 0,
      cover_emoji TEXT NOT NULL DEFAULT '📔',
      published_at INTEGER NOT NULL,
      is_featured INTEGER NOT NULL DEFAULT 0,
      author_id TEXT NOT NULL DEFAULT 'tori',
      like_count INTEGER NOT NULL DEFAULT 0,
      cover_image_url TEXT NOT NULL DEFAULT '',
      cover_theme TEXT NOT NULL DEFAULT 'pink'
    )
  `);

  // Prune stale seed rows so the blog is exactly the canonical 6 posts
  // (idempotent: removes retired posts like the old 존댓말 entry).
  const keepIds = posts.map((p) => p.id);
  const placeholders = keepIds.map(() => '?').join(', ');
  const pruned = await client.execute({
    sql: `DELETE FROM blog_posts WHERE id NOT IN (${placeholders})`,
    args: keepIds,
  });
  if (pruned.rowsAffected > 0) {
    console.log(`Pruned ${pruned.rowsAffected} stale blog post(s).`);
  }

  let count = 0;
  for (const p of posts) {
    await client.execute({
      sql: `INSERT OR REPLACE INTO blog_posts
        (id, slug, title_ko, title_zh, excerpt_ko, level, category,
         content_json, audio_url, audio_duration, cover_emoji, published_at, is_featured,
         author_id, like_count, cover_image_url, cover_theme, unlock_day)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        p.id,
        p.slug,
        p.title_ko,
        p.title_zh,
        p.excerpt_ko,
        p.level,
        p.category,
        JSON.stringify(p.content),
        p.audio_url,
        p.audio_duration,
        p.cover_emoji,
        p.published_at,
        p.is_featured,
        p.author_id,
        p.like_count,
        '',
        p.cover_theme,
        p.unlock_day ?? 0,
      ],
    });
    count++;
  }

  console.log(`Inserted / updated ${count} blog posts.`);
  await client.close();
}

main().catch((err) => {
  console.error(err);
  client.close();
  process.exit(1);
});
