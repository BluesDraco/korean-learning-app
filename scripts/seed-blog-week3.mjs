import { createClient } from '@libsql/client';
import path from 'path';

// ---------------------------------------------------------------------------
// 兔莉的动物城 SNS · Week3(Day15-21) 内容种子。
// 世界圣经见 memory/blog-sns-world-bible.md；剧本见 memory/tori-diary-script-v1.md。
// Day15 看房(원룸/보증금/월세) / Day16 问路(어디/방향) / Day17 地铁(티머니) /
// Day18 银行(통장) / Day19 看医生(내과/기침/열·哈鲁) / Day20 合同细节 / Day21 签合同(高潮).
// 规则（红线）：
//   - tori 镜像贴保持 초급（她是初学者范本）；本周 중급 深度贴由已入库 weekend-cafe(D15)/hoesik(D17) 承担。
//   - vocab.word 必须逐字出现在某 sentence.ko。
//   - vocab.meaning / quiz.explanation / comment.zh 纯中文；句子禁中韩混排。
//   - comment.animalId ∈ 卡司 且 ≠ author 且已登场（Day15 全员已登场）。
//   - 中译名：민지→敏智 / 하루→哈鲁 / 준호→俊浩 / 나비→娜比 / 토리→兔莉。
// ---------------------------------------------------------------------------

const url = process.env.TURSO_DATABASE_URL;
const client = createClient({
  url: url || `file:${path.join(process.cwd(), 'data', 'app.db')}`,
  ...(url ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
});

const D = (day, hour) => Date.UTC(2026, 6, day, hour - 9, 0, 0); // KST≈UTC+9

export const posts = [
  // ═══════════════ DAY 15 · 看房 ═══════════════
  {
    id: 'blog-w3-01', slug: 'w3-tori-house-hunt', unlock_day: 15,
    title_ko: '오늘 원룸을 보러 갔어요', title_zh: '今天去看了单间房',
    excerpt_ko: '기숙사 다음에는 원룸에 살고 싶어요. 보증금이 조금 비싸요.',
    level: '초급', category: '일상', cover_emoji: '🏠', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 14, audio_duration: 0,
    published_at: D(15, 15),
    content: {
      sentences: [
        { ko: '오늘은 원룸을 보러 갔어요. 🏠', zh: '今天去看了单间房。' },
        { ko: '방이 작지만 깨끗해요.', zh: '房间小但很干净。' },
        { ko: '그런데 보증금이 조금 비싸요. 😥', zh: '不过押金有点贵。' },
      ],
      vocab: [
        { word: '원룸', reading: 'won-rum', meaning: '单间房、开间' },
        { word: '방', reading: 'bang', meaning: '房间' },
        { word: '보증금', reading: 'bo-jeung-geum', meaning: '押金、保证金' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '보러', reading: 'bo-reo', meaning: '去看（为了看）' },
        { word: '갔어요', reading: 'ga-sseo-yo', meaning: '去了' },
        { word: '작지만', reading: 'jak-ji-man', meaning: '虽然小' },
        { word: '깨끗해요', reading: 'kkae-kkeu-tae-yo', meaning: '干净' },
        { word: '그런데', reading: 'geu-reon-de', meaning: '不过、可是' },
        { word: '조금', reading: 'jo-geum', meaning: '一点、稍微' },
        { word: '비싸요', reading: 'bi-ssa-yo', meaning: '贵' },
      ],
      quiz: [
        {
          question: '토리는 오늘 뭘 보러 갔어요?',
          options: ['원룸', '병원', '은행', '지하철'],
          answerIndex: 0,
          explanation: '兔莉去看了单间房（원룸）。“보러 가다”表示“去看（某物）”，是“보다+러 가다”。',
        },
      ],
      comments: [
        { animalId: 'minji', ko: '원룸 구하기 힘들죠 💧', zh: '找单间房不容易吧' },
        { animalId: 'haru', ko: '깨끗하면 좋아요! 🌰', zh: '干净就好！' },
      ],
      likedBy: ['minji', 'haru', 'choco', 'koal', 'darami'],
    },
  },
  {
    id: 'blog-w3-02', slug: 'w3-minji-tip-deposit', unlock_day: 15,
    title_ko: '집 구할 때 이것만 기억해요', title_zh: '找房子时记住这些就好',
    excerpt_ko: '보증금하고 월세를 꼭 확인해요. 계약 전에 방을 잘 봐요!',
    level: '초급', category: '일상', cover_emoji: '🔑', cover_theme: 'mint',
    author_id: 'minji', is_featured: 0, like_count: 16, audio_duration: 0,
    published_at: D(15, 18),
    content: {
      sentences: [
        { ko: '집 구할 때 이것만 기억해요! 💧', zh: '找房子时记住这些就好！' },
        { ko: '보증금하고 월세를 꼭 확인해요.', zh: '一定要确认押金和月租。' },
        { ko: '방을 잘 보고 계약해요. 😊', zh: '好好看房再签约。' },
      ],
      vocab: [
        { word: '월세', reading: 'wol-se', meaning: '月租' },
        { word: '확인', reading: 'hwa-gin', meaning: '确认' },
        { word: '계약', reading: 'gye-yak', meaning: '合同、签约' },
        { word: '집', reading: 'jip', meaning: '家、房子' },
        { word: '구할', reading: 'gu-hal', meaning: '找、寻求' },
        { word: '때', reading: 'ttae', meaning: '时候' },
        { word: '기억해요', reading: 'gi-eo-kae-yo', meaning: '记住' },
        { word: '꼭', reading: 'kkok', meaning: '一定、务必' },
        { word: '방', reading: 'bang', meaning: '房间' },
        { word: '잘', reading: 'jal', meaning: '好好地' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '와, 도움이 돼요! 감사해요 🌸', zh: '哇，很有帮助！谢谢' },
        { animalId: 'haru', ko: '민지 씨는 척척박사예요 🌰', zh: '敏智真是万事通' },
      ],
      likedBy: ['tori', 'haru', 'choco', 'koal', 'nabi'],
    },
  },

  // ═══════════════ DAY 16 · 问路 ═══════════════
  {
    id: 'blog-w3-03', slug: 'w3-tori-ask-way', unlock_day: 16,
    title_ko: '길을 물어봤어요', title_zh: '问了路',
    excerpt_ko: '길을 잃어서 물어봤어요. "쭉 가서 오른쪽이에요." 성공!',
    level: '초급', category: '일상', cover_emoji: '🧭', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 13, audio_duration: 0,
    published_at: D(16, 14),
    content: {
      sentences: [
        { ko: '오늘 길을 잃었어요. 😵', zh: '今天迷路了。' },
        { ko: '그래서 "지하철역이 어디예요?"라고 물어봤어요.', zh: '所以问了“地铁站在哪里？”。' },
        { ko: '"쭉 가서 오른쪽이에요."라고 알려줬어요. 성공! 😊', zh: '对方说“一直走然后在右边”。成功！' },
      ],
      vocab: [
        { word: '길', reading: 'gil', meaning: '路' },
        { word: '어디예요', reading: 'eo-di-ye-yo', meaning: '在哪里' },
        { word: '오른쪽', reading: 'o-reun-jjok', meaning: '右边' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '잃었어요', reading: 'i-reo-sseo-yo', meaning: '弄丢了、迷失了' },
        { word: '그래서', reading: 'geu-rae-seo', meaning: '所以' },
        { word: '지하철역', reading: 'ji-ha-cheol-lyeok', meaning: '地铁站' },
        { word: '물어봤어요', reading: 'mu-reo-bwa-sseo-yo', meaning: '问了' },
        { word: '쭉', reading: 'jjuk', meaning: '一直、直直地' },
        { word: '알려줬어요', reading: 'al-lyeo-jwo-sseo-yo', meaning: '告诉了' },
        { word: '성공', reading: 'seong-gong', meaning: '成功' },
      ],
      quiz: [
        {
          question: '지하철역은 어느 쪽에 있어요?',
          options: ['오른쪽', '왼쪽', '뒤쪽', '위쪽'],
          answerIndex: 0,
          explanation: '对方说“쭉 가서 오른쪽이에요”，地铁站在右边（오른쪽）。“쭉”是“一直、直直地”。',
        },
      ],
      comments: [
        { animalId: 'choco', ko: '길 찾기 어렵죠 🍫', zh: '找路不容易吧' },
        { animalId: 'minji', ko: '이제 물어보기도 잘하네요! 💧', zh: '现在问路也很拿手了呢！' },
      ],
      likedBy: ['choco', 'minji', 'haru', 'koal'],
    },
  },
  {
    id: 'blog-w3-04', slug: 'w3-koal-walk', unlock_day: 16,
    title_ko: '천천히 동네를 걸었어요', title_zh: '慢慢地在小区散了步',
    excerpt_ko: '오늘은 천천히 동네를 걸었어요. 골목이 조용해요.',
    level: '초급', category: '일상', cover_emoji: '🚶', cover_theme: 'mint',
    author_id: 'koal', is_featured: 0, like_count: 10, audio_duration: 0,
    published_at: D(16, 17),
    content: {
      sentences: [
        { ko: '오늘은 천천히 동네를 걸었어요. 🚶', zh: '今天慢慢地在小区散了步。' },
        { ko: '골목이 조용해요.', zh: '小巷很安静。' },
        { ko: '기분이 좋아요. 😌', zh: '心情很好。' },
      ],
      vocab: [
        { word: '동네', reading: 'dong-ne', meaning: '小区、街区' },
        { word: '골목', reading: 'gol-mok', meaning: '小巷、胡同' },
        { word: '조용해요', reading: 'jo-yong-hae-yo', meaning: '安静' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '천천히', reading: 'cheon-cheon-hi', meaning: '慢慢地' },
        { word: '걸었어요', reading: 'geo-reo-sseo-yo', meaning: '走了、散步了' },
        { word: '기분', reading: 'gi-bun', meaning: '心情' },
        { word: '좋아요', reading: 'jo-a-yo', meaning: '好' },
      ],
      quiz: [],
      comments: [
        { animalId: 'nabi', ko: '산책 좋아요 ✨', zh: '散步真好' },
        { animalId: 'tori', ko: '저도 같이 걷고 싶어요 🌸', zh: '我也想一起散步' },
      ],
      likedBy: ['tori', 'nabi', 'haru'],
    },
  },

  // ═══════════════ DAY 17 · 地铁·交通卡 ═══════════════
  {
    id: 'blog-w3-05', slug: 'w3-tori-tmoney', unlock_day: 17,
    title_ko: '티머니카드를 샀어요', title_zh: '买了交通卡',
    excerpt_ko: '지하철을 타려고 티머니카드를 샀어요. 충전도 했어요!',
    level: '초급', category: '서울 일기', cover_emoji: '🚇', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 15, audio_duration: 0,
    published_at: D(17, 13),
    content: {
      sentences: [
        { ko: '오늘 지하철을 타려고 티머니카드를 샀어요. 🚇', zh: '今天为了坐地铁买了交通卡。' },
        { ko: '편의점에서 카드를 충전했어요.', zh: '在便利店给卡充了值。' },
        { ko: '이제 지하철이 편해요. 😊', zh: '现在坐地铁很方便。' },
      ],
      vocab: [
        { word: '지하철', reading: 'ji-ha-cheol', meaning: '地铁' },
        { word: '티머니카드', reading: 'ti-meo-ni-ka-deu', meaning: 'T-money 交通卡' },
        { word: '충전', reading: 'chung-jeon', meaning: '充值、充电' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '타려고', reading: 'ta-ryeo-go', meaning: '为了乘坐' },
        { word: '샀어요', reading: 'sa-sseo-yo', meaning: '买了' },
        { word: '편의점', reading: 'pyeo-nui-jeom', meaning: '便利店' },
        { word: '카드', reading: 'ka-deu', meaning: '卡' },
        { word: '이제', reading: 'i-je', meaning: '现在、如今' },
        { word: '편해요', reading: 'pyeo-nae-yo', meaning: '方便、舒服' },
      ],
      quiz: [
        {
          question: '토리는 어디에서 카드를 충전했어요?',
          options: ['편의점', '은행', '병원', '카페'],
          answerIndex: 0,
          explanation: '兔莉在便利店（편의점）给交通卡充值。“충전하다”是“充值”。',
        },
      ],
      comments: [
        { animalId: 'junho', ko: '지하철 타고 콘서트 가자!! 🔥', zh: '坐地铁去演唱会吧！！' },
        { animalId: 'minji', ko: '티머니 충전 편하죠 💧', zh: '交通卡充值很方便吧' },
      ],
      likedBy: ['junho', 'minji', 'haru', 'choco', 'koal'],
    },
  },
  {
    id: 'blog-w3-06', slug: 'w3-news-subway-line', unlock_day: 17,
    title_ko: '동물시 지하철 새 노선 소식', title_zh: '动物城地铁新线路消息',
    excerpt_ko: '동물시에 새 지하철 노선이 생겼어요. 더 편해졌어요!',
    level: '초급', category: '소식', cover_emoji: '🚉', cover_theme: 'gold',
    author_id: 'news', is_featured: 0, like_count: 9, audio_duration: 0,
    published_at: D(17, 9),
    content: {
      sentences: [
        { ko: '동물시에 새 지하철 노선이 생겼어요. 📡', zh: '动物城新增了一条地铁线路。' },
        { ko: '이제 학교까지 더 가까워요.', zh: '现在去学校更近了。' },
        { ko: '많이 이용해 주세요!', zh: '请多多乘坐！' },
      ],
      vocab: [
        { word: '노선', reading: 'no-seon', meaning: '线路' },
        { word: '학교', reading: 'hak-gyo', meaning: '学校' },
        { word: '가까워요', reading: 'ga-kka-wo-yo', meaning: '近' },
        { word: '동물시', reading: 'dong-mul-si', meaning: '动物城' },
        { word: '새', reading: 'sae', meaning: '新的' },
        { word: '지하철', reading: 'ji-ha-cheol', meaning: '地铁' },
        { word: '생겼어요', reading: 'saeng-gyeo-sseo-yo', meaning: '出现了、新增了' },
        { word: '이제', reading: 'i-je', meaning: '现在、如今' },
        { word: '더', reading: 'deo', meaning: '更、更加' },
        { word: '많이', reading: 'ma-ni', meaning: '多多地、大量' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '와, 좋은 소식이에요! 🌸', zh: '哇，好消息！' },
        { animalId: 'junho', ko: '학교 가기 편하겠다 🎤', zh: '去学校会很方便呢' },
      ],
      likedBy: ['tori', 'junho', 'haru', 'koal', 'minji'],
    },
  },

  // ═══════════════ DAY 18 · 银行 ═══════════════
  {
    id: 'blog-w3-07', slug: 'w3-tori-bank', unlock_day: 18,
    title_ko: '은행에서 통장을 만들었어요', title_zh: '在银行办了存折',
    excerpt_ko: '외국인등록증으로 통장을 만들었어요. 조금 긴장했어요!',
    level: '초급', category: '일상', cover_emoji: '🏦', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 14, audio_duration: 0,
    published_at: D(18, 14),
    content: {
      sentences: [
        { ko: '오늘 은행에 갔어요. 🏦', zh: '今天去了银行。' },
        { ko: '외국인등록증으로 통장을 만들었어요.', zh: '用外国人登录证办了存折。' },
        { ko: '비밀번호도 정했어요. 조금 긴장했어요! 😅', zh: '也设了密码。有点紧张！' },
      ],
      vocab: [
        { word: '은행', reading: 'eun-haeng', meaning: '银行' },
        { word: '통장', reading: 'tong-jang', meaning: '存折、账户' },
        { word: '비밀번호', reading: 'bi-mil-beon-ho', meaning: '密码' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '갔어요', reading: 'ga-sseo-yo', meaning: '去了' },
        { word: '외국인등록증', reading: 'oe-gu-gin-deung-nok-jjeung', meaning: '外国人登录证' },
        { word: '만들었어요', reading: 'man-deu-reo-sseo-yo', meaning: '做了、办了' },
        { word: '정했어요', reading: 'jeong-hae-sseo-yo', meaning: '决定了、设定了' },
        { word: '조금', reading: 'jo-geum', meaning: '一点、稍微' },
        { word: '긴장했어요', reading: 'gin-jang-hae-sseo-yo', meaning: '紧张了' },
      ],
      quiz: [
        {
          question: '토리는 은행에서 뭘 만들었어요?',
          options: ['통장', '티머니카드', '여권', '학생증'],
          answerIndex: 0,
          explanation: '兔莉在银行办了存折/账户（통장）。“만들다”是“做、办、制作”。',
        },
      ],
      comments: [
        { animalId: 'minji', ko: '통장 만들기 성공! 💧', zh: '办账户成功！' },
        { animalId: 'haru', ko: '이제 진짜 서울 사람이에요 🌰', zh: '现在真的是首尔人了' },
      ],
      likedBy: ['minji', 'haru', 'choco', 'koal', 'darami'],
    },
  },
  {
    id: 'blog-w3-08', slug: 'w3-darami-morning-d18', unlock_day: 18,
    title_ko: '좋은 아침이에요! 오늘의 단어는 "은행"', title_zh: '早上好！今天的单词是“银行”',
    excerpt_ko: '오늘 서울은 맑아요. 오늘의 단어는 "은행"이에요.',
    level: '초급', category: '일상', cover_emoji: '🌅', cover_theme: 'gold',
    author_id: 'darami', is_featured: 0, like_count: 10, audio_duration: 0,
    published_at: D(18, 7),
    content: {
      sentences: [
        { ko: '좋은 아침이에요! 다람쥐예요. 🌅', zh: '早上好！我是松鼠。' },
        { ko: '오늘 서울은 맑아요.', zh: '今天首尔很晴朗。' },
        { ko: '오늘의 단어는 "은행"이에요. 🏦', zh: '今天的单词是“银行”。' },
      ],
      vocab: [
        { word: '아침', reading: 'a-chim', meaning: '早晨、早上' },
        { word: '맑아요', reading: 'mal-ga-yo', meaning: '晴朗' },
        { word: '은행', reading: 'eun-haeng', meaning: '银行' },
        { word: '좋은', reading: 'jo-eun', meaning: '好的' },
        { word: '다람쥐', reading: 'da-ram-jwi', meaning: '松鼠' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '서울', reading: 'seo-ul', meaning: '首尔' },
        { word: '단어', reading: 'da-neo', meaning: '单词' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '오늘 은행에 가요! 🌸', zh: '今天要去银行！' },
        { animalId: 'koal', ko: '오늘도 좋은 하루 🌿', zh: '今天也是好日子' },
      ],
      likedBy: ['tori', 'koal', 'haru', 'nabi', 'choco'],
    },
  },

  // ═══════════════ DAY 19 · 看医生（哈鲁陪同） ═══════════════
  {
    id: 'blog-w3-09', slug: 'w3-tori-clinic', unlock_day: 19,
    title_ko: '약국 약으로 안 나아서 병원에 갔어요', title_zh: '药店的药没治好，去了医院',
    excerpt_ko: '지난번 약이 부족했어요. 기침하고 열이 나서 병원에 갔어요.',
    level: '초급', category: '일상', cover_emoji: '🏥', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 15, audio_duration: 0,
    published_at: D(19, 11),
    content: {
      sentences: [
        { ko: '지난번 약국 약은 삼 일만 먹었어요. 그런데 또 아파요. 😷', zh: '上次药店的药只吃了三天。可是又难受了。' },
        { ko: '오늘은 기침하고 열이 나서 병원에 갔어요. 🏥', zh: '今天咳嗽又发烧，去了医院。' },
        { ko: '하루가 또 같이 갔어요. 정말 고마워요.', zh: '哈鲁又一起去了。真的谢谢。' },
        { ko: '의사 선생님이 약을 줬어요. 이제 괜찮아요. 😊', zh: '医生给了药。现在没事了。' },
      ],
      vocab: [
        { word: '병원', reading: 'byeong-won', meaning: '医院' },
        { word: '기침', reading: 'gi-chim', meaning: '咳嗽' },
        { word: '열', reading: 'yeol', meaning: '发烧、热' },
        { word: '약국', reading: 'yak-guk', meaning: '药店、药房' },
        { word: '약', reading: 'yak', meaning: '药' },
        { word: '먹었어요', reading: 'meo-geo-sseo-yo', meaning: '吃了' },
        { word: '아파요', reading: 'a-pa-yo', meaning: '疼、难受' },
        { word: '의사', reading: 'ui-sa', meaning: '医生' },
        { word: '줬어요', reading: 'jwo-sseo-yo', meaning: '给了' },
        { word: '괜찮아요', reading: 'gwaen-cha-na-yo', meaning: '没事、还好' },
      ],
      quiz: [
        {
          question: '토리는 왜 병원에 갔어요?',
          options: ['기침하고 열이 나서', '배가 고파서', '심심해서', '졸려서'],
          answerIndex: 0,
          explanation: '兔莉因为咳嗽又发烧（기침하고 열이 나서）去了医院。“~아서/어서”表示原因“因为…所以”。',
        },
      ],
      comments: [
        { animalId: 'haru', ko: '옆에 있어서 다행이에요 🌰', zh: '能陪在旁边真好' },
        { animalId: 'minji', ko: '푹 쉬어요, 토리 씨! 💧', zh: '好好休息，兔莉！' },
        { animalId: 'darami', ko: '얼른 나으세요 🌅', zh: '快点好起来' },
      ],
      likedBy: ['haru', 'minji', 'darami', 'choco', 'koal', 'nabi'],
    },
  },
  {
    id: 'blog-w3-10', slug: 'w3-haru-hospital', unlock_day: 19,
    title_ko: '토리하고 병원에 갔다 왔어요', title_zh: '陪兔莉去了趟医院',
    excerpt_ko: '토리가 아파서 같이 병원에 갔어요. 이제 괜찮아서 다행이에요.',
    level: '초급', category: '일상', cover_emoji: '🤝', cover_theme: 'gold',
    author_id: 'haru', is_featured: 0, like_count: 14, audio_duration: 0,
    published_at: D(19, 16),
    content: {
      sentences: [
        { ko: '오늘 토리하고 병원에 갔다 왔어요. 🤝', zh: '今天陪兔莉去了趟医院。' },
        { ko: '토리가 많이 아팠어요.', zh: '兔莉病得挺重。' },
        { ko: '이제 괜찮아서 다행이에요. 🌰', zh: '现在没事了，真是万幸。' },
      ],
      vocab: [
        { word: '아팠어요', reading: 'a-pa-sseo-yo', meaning: '（曾）疼、生病' },
        { word: '괜찮아서', reading: 'gwaen-cha-na-seo', meaning: '因为没事、因为还好' },
        { word: '다행', reading: 'da-haeng', meaning: '万幸、幸好' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '병원', reading: 'byeong-won', meaning: '医院' },
        { word: '왔어요', reading: 'wa-sseo-yo', meaning: '回来了、来了' },
        { word: '많이', reading: 'ma-ni', meaning: '很、非常' },
        { word: '이제', reading: 'i-je', meaning: '现在、如今' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '하루 씨, 정말 고마워요 😭🌸', zh: '哈鲁，真的谢谢你' },
        { animalId: 'minji', ko: '둘이 진짜 친해요 💧', zh: '你俩真要好' },
      ],
      likedBy: ['tori', 'minji', 'choco', 'koal', 'darami'],
    },
  },

  // ═══════════════ DAY 20 · 合同细节 ═══════════════
  {
    id: 'blog-w3-11', slug: 'w3-tori-contract-prep', unlock_day: 20,
    title_ko: '내일 계약을 해요', title_zh: '明天要签约',
    excerpt_ko: '드디어 원룸을 정했어요! 보증금하고 월세, 관리비를 확인했어요.',
    level: '초급', category: '일상', cover_emoji: '📝', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 16, audio_duration: 0,
    published_at: D(20, 19),
    content: {
      sentences: [
        { ko: '드디어 원룸을 정했어요! 📝', zh: '终于定好单间房了！' },
        { ko: '보증금하고 월세, 관리비를 확인했어요.', zh: '确认了押金、月租和管理费。' },
        { ko: '내일 계약을 해요. 조금 떨려요. 😊', zh: '明天签约。有点小紧张。' },
      ],
      vocab: [
        { word: '정했어요', reading: 'jeong-hae-sseo-yo', meaning: '（已）决定、定下' },
        { word: '관리비', reading: 'gwal-li-bi', meaning: '管理费' },
        { word: '내일', reading: 'nae-il', meaning: '明天' },
        { word: '드디어', reading: 'deu-di-eo', meaning: '终于' },
        { word: '원룸', reading: 'won-rum', meaning: '单间房、开间' },
        { word: '보증금', reading: 'bo-jeung-geum', meaning: '押金、保证金' },
        { word: '월세', reading: 'wol-se', meaning: '月租' },
        { word: '확인했어요', reading: 'hwa-gin-hae-sseo-yo', meaning: '确认了' },
        { word: '계약', reading: 'gye-yak', meaning: '合同、签约' },
        { word: '조금', reading: 'jo-geum', meaning: '一点、稍微' },
        { word: '떨려요', reading: 'tteol-lyeo-yo', meaning: '发抖、紧张' },
      ],
      quiz: [
        {
          question: '토리는 내일 뭘 해요?',
          options: ['계약', '시험', '여행', '이사'],
          answerIndex: 0,
          explanation: '兔莉明天要签约（계약）。“계약을 하다”是“签合同、签约”。',
        },
      ],
      comments: [
        { animalId: 'minji', ko: '축하해요! 좋은 집이에요 💧', zh: '恭喜！是个好房子' },
        { animalId: 'haru', ko: '이사 도와줄게요 🌰', zh: '搬家我来帮忙' },
      ],
      likedBy: ['minji', 'haru', 'choco', 'koal', 'nabi', 'darami'],
    },
  },
  {
    id: 'blog-w3-12', slug: 'w3-nabi-room-photo', unlock_day: 20,
    title_ko: '작은 방도 예쁘게 꾸며요', title_zh: '小房间也能布置得漂亮',
    excerpt_ko: '작은 원룸도 예쁘게 꾸밀 수 있어요. 화분 하나면 충분해요!',
    level: '초급', category: '일상', cover_emoji: '🪴', cover_theme: 'purple',
    author_id: 'nabi', is_featured: 0, like_count: 13, audio_duration: 0,
    published_at: D(20, 15),
    content: {
      sentences: [
        { ko: '작은 방도 예쁘게 꾸며요. ✨', zh: '小房间也要布置得漂亮。' },
        { ko: '화분 하나면 기분이 좋아요.', zh: '有一盆花心情就很好。' },
        { ko: '사진으로 남겨요. 📷', zh: '拍照留念。' },
      ],
      vocab: [
        { word: '예쁘게', reading: 'ye-ppeu-ge', meaning: '漂亮地' },
        { word: '화분', reading: 'hwa-bun', meaning: '花盆' },
        { word: '기분', reading: 'gi-bun', meaning: '心情' },
        { word: '작은', reading: 'ja-geun', meaning: '小的' },
        { word: '방', reading: 'bang', meaning: '房间' },
        { word: '꾸며요', reading: 'kku-myeo-yo', meaning: '布置、装饰' },
        { word: '하나', reading: 'ha-na', meaning: '一个' },
        { word: '좋아요', reading: 'jo-a-yo', meaning: '好' },
        { word: '사진', reading: 'sa-jin', meaning: '照片' },
        { word: '남겨요', reading: 'nam-gyeo-yo', meaning: '留下、留存' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '와, 저도 화분 놓고 싶어요! 🌸', zh: '哇，我也想摆盆花！' },
        { animalId: 'choco', ko: '나비 씨 방 진짜 예뻐요 🍫', zh: '娜比的房间真漂亮' },
      ],
      likedBy: ['tori', 'choco', 'haru', 'koal'],
    },
  },

  // ═══════════════ DAY 21 · 签合同（本周高潮） ═══════════════
  {
    id: 'blog-w3-13', slug: 'w3-tori-signed', unlock_day: 21,
    title_ko: '드디어 계약을 했어요!', title_zh: '终于签合同了！',
    excerpt_ko: '오늘 집주인 아저씨하고 계약을 했어요. 이제 제 방이 생겼어요!',
    level: '초급', category: '서울 일기', cover_emoji: '🎊', cover_theme: 'pink',
    author_id: 'tori', is_featured: 1, like_count: 26, audio_duration: 0,
    published_at: D(21, 18),
    content: {
      sentences: [
        { ko: '오늘은 정말 특별한 날이에요.', zh: '今天是非常特别的一天。' },
        { ko: '집주인 아저씨하고 계약을 했어요. 🎊', zh: '和房东大叔签了合同。' },
        { ko: '이제 제 방이 생겼어요!', zh: '现在我有自己的房间了！' },
        { ko: '열쇠고리에 작은 당근이 있어요. 🥕', zh: '钥匙扣上挂着一个小胡萝卜。' },
        { ko: '엄마 당근하고 똑같아요. 조금 울었어요. 😊', zh: '和妈妈给的胡萝卜一模一样。有点哭了。' },
      ],
      vocab: [
        { word: '집주인', reading: 'jip-ju-in', meaning: '房东、房主' },
        { word: '생겼어요', reading: 'saeng-gyeo-sseo-yo', meaning: '有了、出现了' },
        { word: '당근', reading: 'dang-geun', meaning: '胡萝卜' },
        { word: '정말', reading: 'jeong-mal', meaning: '真的、非常' },
        { word: '특별한', reading: 'teuk-byeol-han', meaning: '特别的' },
        { word: '아저씨', reading: 'a-jeo-ssi', meaning: '大叔' },
        { word: '계약', reading: 'gye-yak', meaning: '合同、签约' },
        { word: '열쇠고리', reading: 'yeol-soe-go-ri', meaning: '钥匙扣' },
        { word: '엄마', reading: 'eom-ma', meaning: '妈妈' },
        { word: '똑같아요', reading: 'ttok-ga-ta-yo', meaning: '一模一样' },
        { word: '울었어요', reading: 'u-reo-sseo-yo', meaning: '哭了' },
      ],
      quiz: [
        {
          question: '토리는 오늘 누구하고 계약을 했어요?',
          options: ['집주인 아저씨', '의사 선생님', '은행 직원', '약사님'],
          answerIndex: 0,
          explanation: '兔莉和房东大叔（집주인 아저씨）签了合同。“하고”在这里表示“和（某人一起）”。',
        },
      ],
      comments: [
        { animalId: 'minji', ko: '축하해요!! 이제 진짜 독립이에요! 💧', zh: '恭喜！！现在真的独立了！' },
        { animalId: 'haru', ko: '토리 씨, 너무 멋져요! 🌰', zh: '兔莉，太厉害了！' },
        { animalId: 'junho', ko: '집들이 하자!! 🔥🎤', zh: '办乔迁派对吧！！' },
        { animalId: 'nabi', ko: '방 꾸미기 도와줄게요 ✨', zh: '布置房间我来帮忙' },
      ],
      likedBy: ['minji', 'haru', 'junho', 'nabi', 'darami', 'choco', 'koal'],
    },
  },
  {
    id: 'blog-w3-14', slug: 'w3-news-weekly-d21', unlock_day: 21,
    title_ko: '이번 주 동물시 소식', title_zh: '本周动物城消息',
    excerpt_ko: '새 지하철 노선이 인기예요. 날씨가 맑아요. 좋은 주말 보내세요!',
    level: '초급', category: '소식', cover_emoji: '📰', cover_theme: 'gold',
    author_id: 'news', is_featured: 0, like_count: 8, audio_duration: 0,
    published_at: D(21, 20),
    content: {
      sentences: [
        { ko: '이번 주 동물시 소식이에요. 📡', zh: '这是本周动物城的消息。' },
        { ko: '새 지하철 노선이 인기예요.', zh: '新地铁线路很受欢迎。' },
        { ko: '날씨가 맑아요. 좋은 주말 보내세요!', zh: '天气晴朗。周末愉快！' },
      ],
      vocab: [
        { word: '이번 주', reading: 'i-beon-ju', meaning: '这周' },
        { word: '주말', reading: 'ju-mal', meaning: '周末' },
        { word: '인기', reading: 'in-gi', meaning: '人气、受欢迎' },
        { word: '동물시', reading: 'dong-mul-si', meaning: '动物城' },
        { word: '소식', reading: 'so-sik', meaning: '消息' },
        { word: '새', reading: 'sae', meaning: '新的' },
        { word: '지하철', reading: 'ji-ha-cheol', meaning: '地铁' },
        { word: '노선', reading: 'no-seon', meaning: '线路' },
        { word: '날씨', reading: 'nal-ssi', meaning: '天气' },
        { word: '맑아요', reading: 'mal-ga-yo', meaning: '晴朗' },
        { word: '좋은', reading: 'jo-eun', meaning: '好的' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '이번 주도 잘 보냈어요! 🌸', zh: '这周也过得很好！' },
        { animalId: 'koal', ko: '주말엔 푹 쉬어요 🌿', zh: '周末好好休息' },
      ],
      likedBy: ['tori', 'koal', 'haru', 'choco', 'minji'],
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
  console.log(`Inserted / updated ${count} Week3 posts.`);
  await client.close();
}

if (process.argv[1] && process.argv[1].endsWith('seed-blog-week3.mjs')) {
  main().catch((err) => {
    console.error(err);
    client.close();
    process.exit(1);
  });
}
