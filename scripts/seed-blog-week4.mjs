import { createClient } from '@libsql/client';
import path from 'path';

// ---------------------------------------------------------------------------
// 兔莉的动物城 SNS · Week4(Day22-30) 内容种子 · 大结局周。
// 世界圣经见 memory/blog-sns-world-bible.md；剧本见 memory/tori-diary-script-v1.md。
// Day22 해요体登场 / Day23 追星生咖(俊浩) / Day24 邀请约定 / Day25 한강演唱会应援 /
// Day26 Daiso再访(平静日) / Day27 请客聚餐 / Day28 过去时·写日记开始 /
// Day29 韩语日记首次写作(高潮) / Day30 毕业典礼(全员).
// 规则（红线）：
//   - tori 镜像贴保持 초급（初学者范本）。
//   - 고급 深度贴（gomdori 俗语 / yowoo 思辨）unlock_day>=22 才开放；内容用公认俗语/温和思辨，可复现可审。
//   - vocab.word 必须逐字出现在某 sentence.ko。
//   - vocab.meaning / quiz.explanation / comment.zh 纯中文；句子禁中韩混排。
//   - comment.animalId ∈ 卡司 且 ≠ author 且已登场（Day22 全员已登场）。
//   - 中译名：민지→敏智 / 하루→哈鲁 / 준호→俊浩 / 나비→娜比 / 토리→兔莉 / 곰돌이→熊仔 / 여우→狐狸.
// ---------------------------------------------------------------------------

const url = process.env.TURSO_DATABASE_URL;
const client = createClient({
  url: url || `file:${path.join(process.cwd(), 'data', 'app.db')}`,
  ...(url ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
});

const D = (day, hour) => Date.UTC(2026, 6, day, hour - 9, 0, 0); // KST≈UTC+9

export const posts = [
  // ═══════════════ DAY 22 · 해요体登场 + 고급 payoff 开场 ═══════════════
  {
    id: 'blog-w4-01', slug: 'w4-tori-haeyo', unlock_day: 22,
    title_ko: '이제 "해요"를 배웠어요', title_zh: '现在学会了礼貌的口语说法',
    excerpt_ko: '오늘 학교에서 해요체를 배웠어요. 가요, 먹어요, 공부해요!',
    level: '초급', category: '일상', cover_emoji: '📚', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 15, audio_duration: 0,
    published_at: D(22, 13),
    content: {
      sentences: [
        { ko: '오늘 학교에서 해요체를 배웠어요. 📚', zh: '今天在学校学了礼貌的口语说法。' },
        { ko: '가요, 먹어요, 공부해요!', zh: '去、吃、学习！' },
        { ko: '이제 조금 더 자연스러워요. 😊', zh: '现在说话更自然一点了。' },
      ],
      vocab: [
        { word: '배웠어요', reading: 'bae-wo-sseo-yo', meaning: '（已）学了' },
        { word: '공부해요', reading: 'gong-bu-hae-yo', meaning: '学习' },
        { word: '자연스러워요', reading: 'ja-yeon-seu-reo-wo-yo', meaning: '自然' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '학교', reading: 'hak-gyo', meaning: '学校' },
        { word: '해요체', reading: 'hae-yo-che', meaning: '礼貌的口语说法' },
        { word: '가요', reading: 'ga-yo', meaning: '去' },
        { word: '먹어요', reading: 'meo-geo-yo', meaning: '吃' },
        { word: '이제', reading: 'i-je', meaning: '现在' },
        { word: '조금', reading: 'jo-geum', meaning: '一点、稍微' },
      ],
      quiz: [
        {
          question: '"공부하다"를 해요체로 하면?',
          options: ['공부해요', '공부가요', '공부이에요', '공부먹어요'],
          answerIndex: 0,
          explanation: '“공부하다”变成해요体是“공부해요”。“하다”结尾的动词变해요体时变成“해요”。',
        },
      ],
      comments: [
        { animalId: 'junho', ko: '해요체 마스터 가자!! 🔥', zh: '口语说法大师，冲！！' },
        { animalId: 'haru', ko: '진짜 많이 늘었어요 🌰', zh: '真的进步很多' },
      ],
      likedBy: ['junho', 'haru', 'minji', 'choco', 'darami'],
    },
  },
  {
    id: 'blog-w4-02', slug: 'w4-gomdori-proverb-start', unlock_day: 22,
    title_ko: '천 리 길도 한 걸음부터', title_zh: '千里之行，始于足下',
    excerpt_ko: '오늘은 옛 속담 하나를 들려줄게요. 작은 시작이 큰 길을 만든단다.',
    level: '고급', category: '속담', cover_emoji: '📖', cover_theme: 'gold',
    author_id: 'gomdori', is_featured: 0, like_count: 19, audio_duration: 0,
    published_at: D(22, 21),
    content: {
      sentences: [
        { ko: '오늘은 옛 속담 하나를 들려줄게요. 📖', zh: '今天给大家讲一句老俗语。' },
        { ko: '"천 리 길도 한 걸음부터."', zh: '“千里之行，始于足下。”' },
        { ko: '아무리 먼 길도 첫걸음에서 시작한단다.', zh: '再远的路，也是从第一步开始的。' },
        { ko: '토리처럼 매일 한 걸음씩 걸으면 돼요.', zh: '像兔莉一样，每天走一步就好。' },
      ],
      vocab: [
        { word: '속담', reading: 'sok-dam', meaning: '俗语、谚语' },
        { word: '천 리', reading: 'cheon-ri', meaning: '千里（形容很远）' },
        { word: '걸음', reading: 'geo-reum', meaning: '步、脚步' },
        { word: '시작', reading: 'si-jak', meaning: '开始' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '옛', reading: 'yet', meaning: '古老的、旧时的' },
        { word: '하나', reading: 'ha-na', meaning: '一个' },
        { word: '길', reading: 'gil', meaning: '路' },
        { word: '아무리', reading: 'a-mu-ri', meaning: '再怎么、无论多么' },
        { word: '먼', reading: 'meon', meaning: '远的' },
        { word: '첫걸음', reading: 'cheot-geo-reum', meaning: '第一步' },
        { word: '매일', reading: 'mae-il', meaning: '每天' },
      ],
      quiz: [
        {
          question: '"천 리 길도 한 걸음부터"의 뜻은?',
          options: ['큰일도 작은 시작에서 비롯된다', '길이 멀면 포기한다', '한 걸음이면 끝난다', '천 리는 너무 멀다'],
          answerIndex: 0,
          explanation: '这句俗语意思是：再大的事也是从小小的第一步开始的，鼓励人踏实起步。',
        },
      ],
      comments: [
        { animalId: 'tori', ko: '곰돌이 님, 마음에 새길게요 🌸', zh: '熊仔前辈，我会铭记在心' },
        { animalId: 'yowoo', ko: '좋은 말씀이에요 ☕', zh: '说得真好' },
        { animalId: 'haru', ko: '오늘도 한 걸음! 🌰', zh: '今天也走一步！' },
      ],
      likedBy: ['tori', 'yowoo', 'haru', 'minji', 'nabi', 'koal', 'darami'],
    },
  },

  // ═══════════════ DAY 23 · 追星·偶像生咖（俊浩兴奋） ═══════════════
  {
    id: 'blog-w4-03', slug: 'w4-tori-hongdae-idol', unlock_day: 23,
    title_ko: '홍대에서 아이돌을 봤어요', title_zh: '在弘大看到了偶像',
    excerpt_ko: '준호하고 홍대에 갔어요. 진짜 아이돌을 봤어요! 정말 신기해요.',
    level: '초급', category: '일상', cover_emoji: '🌟', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 18, audio_duration: 0,
    published_at: D(23, 16),
    content: {
      sentences: [
        { ko: '오늘 준호하고 홍대에 갔어요. 🌟', zh: '今天和俊浩去了弘大。' },
        { ko: '길에서 진짜 아이돌을 봤어요!', zh: '在街上看到了真的偶像！' },
        { ko: '준호가 너무 좋아했어요. 정말 신기해요. 😆', zh: '俊浩超级开心。真的很神奇。' },
      ],
      vocab: [
        { word: '아이돌', reading: 'a-i-dol', meaning: '偶像、爱豆' },
        { word: '진짜', reading: 'jin-jja', meaning: '真的' },
        { word: '신기해요', reading: 'sin-gi-hae-yo', meaning: '神奇、新奇' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '홍대', reading: 'hong-dae', meaning: '弘大（首尔地名）' },
        { word: '갔어요', reading: 'ga-sseo-yo', meaning: '去了' },
        { word: '길', reading: 'gil', meaning: '路、街上' },
        { word: '봤어요', reading: 'bwa-sseo-yo', meaning: '看到了' },
        { word: '너무', reading: 'neo-mu', meaning: '太、非常' },
        { word: '좋아했어요', reading: 'jo-a-hae-sseo-yo', meaning: '（很）喜欢、（很）开心' },
        { word: '정말', reading: 'jeong-mal', meaning: '真的、非常' },
      ],
      quiz: [
        {
          question: '토리는 홍대에서 누구를 봤어요?',
          options: ['아이돌', '의사', '집주인', '약사'],
          answerIndex: 0,
          explanation: '兔莉在弘大看到了偶像（아이돌）。“진짜”是“真的”，表示惊喜或强调。',
        },
      ],
      comments: [
        { animalId: 'junho', ko: '오늘 진짜 대박이었어!! 🔥🎤', zh: '今天真的太棒了！！' },
        { animalId: 'minji', ko: '우와, 부러워요! 💧', zh: '哇，好羡慕！' },
      ],
      likedBy: ['junho', 'minji', 'haru', 'choco', 'nabi'],
    },
  },
  {
    id: 'blog-w4-04', slug: 'w4-junho-idol', unlock_day: 23,
    title_ko: '오늘 최애를 실제로 봤다!!', title_zh: '今天亲眼见到本命了！！',
    excerpt_ko: '진짜 대박! 홍대에서 최애를 봤어요. 심장이 너무 빨리 뛰어요!',
    level: '초급', category: '일상', cover_emoji: '🎤', cover_theme: 'pink',
    author_id: 'junho', is_featured: 0, like_count: 20, audio_duration: 0,
    published_at: D(23, 17),
    content: {
      sentences: [
        { ko: '진짜 대박!! 오늘 최애를 봤어요! 🎤', zh: '真的太棒了！！今天见到本命了！' },
        { ko: '홍대에서 우연히 만났어요.', zh: '在弘大偶然遇到的。' },
        { ko: '심장이 너무 빨리 뛰어요! 🔥', zh: '心跳得太快了！' },
      ],
      vocab: [
        { word: '대박', reading: 'dae-bak', meaning: '厉害、太棒了' },
        { word: '최애', reading: 'choe-ae', meaning: '最爱、本命' },
        { word: '심장', reading: 'sim-jang', meaning: '心脏' },
        { word: '진짜', reading: 'jin-jja', meaning: '真的' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '봤어요', reading: 'bwa-sseo-yo', meaning: '看到了' },
        { word: '홍대', reading: 'hong-dae', meaning: '弘大（首尔地名）' },
        { word: '우연히', reading: 'u-yeon-hi', meaning: '偶然地' },
        { word: '만났어요', reading: 'man-na-sseo-yo', meaning: '遇到了、见到了' },
        { word: '너무', reading: 'neo-mu', meaning: '太、非常' },
        { word: '빨리', reading: 'ppal-li', meaning: '快、迅速地' },
        { word: '뛰어요', reading: 'ttwi-eo-yo', meaning: '跳动、跑' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '준호 씨 너무 행복해 보여요 🌸', zh: '俊浩看起来太幸福了' },
        { animalId: 'choco', ko: '축하해요!! 🍫', zh: '恭喜！！' },
      ],
      likedBy: ['tori', 'choco', 'haru', 'minji', 'nabi', 'koal'],
    },
  },

  // ═══════════════ DAY 24 · 邀请约定（三人群聊） ═══════════════
  {
    id: 'blog-w4-05', slug: 'w4-tori-invite', unlock_day: 24,
    title_ko: '주말에 같이 콘서트 가요!', title_zh: '周末一起去演唱会吧！',
    excerpt_ko: '준호가 콘서트에 초대했어요. 민지하고 같이 가요!',
    level: '초급', category: '일상', cover_emoji: '🎫', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 16, audio_duration: 0,
    published_at: D(24, 15),
    content: {
      sentences: [
        { ko: '준호가 콘서트에 초대했어요. 🎫', zh: '俊浩邀请我去演唱会。' },
        { ko: '"같이 가요!"라고 했어요.', zh: '他说“一起去吧！”。' },
        { ko: '민지하고 같이 가요. 신나요! 😊', zh: '和敏智一起去。好兴奋！' },
      ],
      vocab: [
        { word: '콘서트', reading: 'kon-seo-teu', meaning: '演唱会、音乐会' },
        { word: '초대', reading: 'cho-dae', meaning: '邀请' },
        { word: '신나요', reading: 'sin-na-yo', meaning: '兴奋、开心' },
        { word: '준호', reading: 'jun-ho', meaning: '俊浩（人名）' },
        { word: '같이', reading: 'ga-chi', meaning: '一起' },
        { word: '가요', reading: 'ga-yo', meaning: '去' },
        { word: '했어요', reading: 'hae-sseo-yo', meaning: '说了、做了' },
        { word: '민지', reading: 'min-ji', meaning: '敏智（人名）' },
      ],
      quiz: [
        {
          question: '토리는 주말에 어디에 가요?',
          options: ['콘서트', '병원', '은행', '학교'],
          answerIndex: 0,
          explanation: '兔莉周末要去演唱会（콘서트）。“같이 가요”是“一起去吧”，邀约时常用。',
        },
      ],
      comments: [
        { animalId: 'junho', ko: '당연하지! 같이 가자! 🎤', zh: '当然啦！一起去！' },
        { animalId: 'minji', ko: '나도 기대돼요! 💧', zh: '我也好期待！' },
      ],
      likedBy: ['junho', 'minji', 'haru', 'choco', 'nabi', 'darami'],
    },
  },
  {
    id: 'blog-w4-06', slug: 'w4-koal-weekend', unlock_day: 24,
    title_ko: '다들 바쁘네요, 저는 낮잠 자요', title_zh: '大家都好忙，我睡午觉',
    excerpt_ko: '다들 콘서트 준비로 바빠요. 저는 조용히 낮잠 자요.',
    level: '초급', category: '일상', cover_emoji: '💤', cover_theme: 'mint',
    author_id: 'koal', is_featured: 0, like_count: 12, audio_duration: 0,
    published_at: D(24, 14),
    content: {
      sentences: [
        { ko: '다들 콘서트 준비로 바빠요.', zh: '大家都在忙着准备演唱会。' },
        { ko: '저는 조용히 낮잠 자요. 💤', zh: '我安静地睡午觉。' },
        { ko: '이것도 행복해요. 😌', zh: '这样也很幸福。' },
      ],
      vocab: [
        { word: '준비', reading: 'jun-bi', meaning: '准备' },
        { word: '바빠요', reading: 'ba-ppa-yo', meaning: '忙' },
        { word: '낮잠', reading: 'nat-jam', meaning: '午觉' },
        { word: '다들', reading: 'da-deul', meaning: '大家都' },
        { word: '콘서트', reading: 'kon-seo-teu', meaning: '演唱会' },
        { word: '저', reading: 'jeo', meaning: '我（谦称）' },
        { word: '조용히', reading: 'jo-yong-hi', meaning: '安静地' },
        { word: '자요', reading: 'ja-yo', meaning: '睡' },
        { word: '이것', reading: 'i-geot', meaning: '这个' },
        { word: '행복해요', reading: 'haeng-bo-kae-yo', meaning: '幸福' },
      ],
      quiz: [],
      comments: [
        { animalId: 'haru', ko: '코알 님 다운 하루 🌰', zh: '很有考拉风格的一天' },
        { animalId: 'nabi', ko: '푹 쉬어요 ✨', zh: '好好休息' },
      ],
      likedBy: ['haru', 'nabi', 'tori'],
    },
  },

  // ═══════════════ DAY 25 · 한강演唱会·应援 ═══════════════
  {
    id: 'blog-w4-07', slug: 'w4-tori-hangang-concert', unlock_day: 25,
    title_ko: '한강에서 콘서트를 봤어요!', title_zh: '在汉江看了演唱会！',
    excerpt_ko: '한강 콘서트에 갔어요. 준호가 응원을 가르쳐 줬어요. 사랑해요!',
    level: '초급', category: '서울 일기', cover_emoji: '🎶', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 21, audio_duration: 0,
    published_at: D(25, 21),
    content: {
      sentences: [
        { ko: '오늘 한강에서 콘서트를 봤어요! 🎶', zh: '今天在汉江看了演唱会！' },
        { ko: '준호가 응원을 가르쳐 줬어요.', zh: '俊浩教了我应援。' },
        { ko: '다 같이 "사랑해요!"라고 외쳤어요.', zh: '大家一起喊“我爱你！”。' },
        { ko: '정말 잊지 못할 밤이에요. 😭', zh: '真是难忘的一夜。' },
      ],
      vocab: [
        { word: '한강', reading: 'han-gang', meaning: '汉江' },
        { word: '응원', reading: 'eung-won', meaning: '应援、加油' },
        { word: '사랑해요', reading: 'sa-rang-hae-yo', meaning: '我爱你' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '콘서트', reading: 'kon-seo-teu', meaning: '演唱会' },
        { word: '봤어요', reading: 'bwa-sseo-yo', meaning: '看了' },
        { word: '가르쳐 줬어요', reading: 'ga-reu-cheo-jwo-sseo-yo', meaning: '教（给我）了' },
        { word: '같이', reading: 'ga-chi', meaning: '一起' },
        { word: '외쳤어요', reading: 'oe-chyeo-sseo-yo', meaning: '喊了、呼喊' },
        { word: '정말', reading: 'jeong-mal', meaning: '真的' },
        { word: '밤', reading: 'bam', meaning: '夜晚' },
      ],
      quiz: [
        {
          question: '다 같이 뭐라고 외쳤어요?',
          options: ['사랑해요!', '안녕히 가세요!', '얼마예요?', '괜찮아요?'],
          answerIndex: 0,
          explanation: '大家一起喊了“사랑해요!”（我爱你！）。“외치다”是“呼喊”，应援时用。',
        },
      ],
      comments: [
        { animalId: 'junho', ko: '우리 응원 완벽했어!! 🔥🎤', zh: '我们的应援太完美了！！' },
        { animalId: 'minji', ko: '진짜 최고의 밤! 💧', zh: '真是最棒的一夜！' },
        { animalId: 'haru', ko: '사진 보니까 너무 좋아 보여요 🌰', zh: '看照片觉得你们太开心了' },
      ],
      likedBy: ['junho', 'minji', 'haru', 'choco', 'nabi', 'koal', 'darami'],
    },
  },

  // ═══════════════ DAY 26 · Daiso 再访（平静日） ═══════════════
  {
    id: 'blog-w4-08', slug: 'w4-tori-daiso-again', unlock_day: 26,
    title_ko: '다이소에서 당근 펜을 샀어요', title_zh: '在大创买了胡萝卜笔',
    excerpt_ko: '오늘은 조용히 다이소에 갔어요. 귀여운 당근 펜을 발견했어요!',
    level: '초급', category: '일상', cover_emoji: '🥕', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 14, audio_duration: 0,
    published_at: D(26, 15),
    content: {
      sentences: [
        { ko: '오늘은 조용히 다이소에 갔어요.', zh: '今天安静地去了大创。' },
        { ko: '귀여운 당근 펜을 발견했어요! 🥕', zh: '发现了可爱的胡萝卜笔！' },
        { ko: '일기를 쓰고 싶어요. 그래서 샀어요. 😊', zh: '想写日记。所以买了它。' },
      ],
      vocab: [
        { word: '귀여운', reading: 'gwi-yeo-un', meaning: '可爱的' },
        { word: '당근', reading: 'dang-geun', meaning: '胡萝卜' },
        { word: '발견', reading: 'bal-gyeon', meaning: '发现' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '조용히', reading: 'jo-yong-hi', meaning: '安静地' },
        { word: '다이소', reading: 'da-i-so', meaning: '大创（生活杂货店）' },
        { word: '갔어요', reading: 'ga-sseo-yo', meaning: '去了' },
        { word: '펜', reading: 'pen', meaning: '笔' },
        { word: '일기', reading: 'il-gi', meaning: '日记' },
        { word: '쓰고 싶어요', reading: 'sseu-go-si-peo-yo', meaning: '想写' },
        { word: '그래서', reading: 'geu-rae-seo', meaning: '所以' },
        { word: '샀어요', reading: 'sa-sseo-yo', meaning: '买了' },
      ],
      quiz: [],
      comments: [
        { animalId: 'nabi', ko: '당근 펜 너무 귀여워요! ✨', zh: '胡萝卜笔太可爱了！' },
        { animalId: 'haru', ko: '일기 쓰는 토리 응원해요 🌰', zh: '给写日记的兔莉加油' },
      ],
      likedBy: ['nabi', 'haru', 'choco', 'minji', 'koal'],
    },
  },

  // ═══════════════ DAY 27 · 请客·聚餐 ═══════════════
  {
    id: 'blog-w4-09', slug: 'w4-tori-treat', unlock_day: 27,
    title_ko: '친구들에게 한턱냈어요', title_zh: '请了朋友们一顿',
    excerpt_ko: '고마운 친구들에게 밥을 샀어요. "오늘은 제가 낼게요!"',
    level: '초급', category: '일상', cover_emoji: '🍜', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 17, audio_duration: 0,
    published_at: D(27, 19),
    content: {
      sentences: [
        { ko: '오늘 친구들에게 밥을 샀어요. 🍜', zh: '今天请朋友们吃了饭。' },
        { ko: '"오늘은 제가 낼게요!"라고 말했어요.', zh: '我说了“今天我来请！”。' },
        { ko: '다들 도와줘서 정말 고마워요. 😊', zh: '大家一直帮我，真的很感谢。' },
      ],
      vocab: [
        { word: '친구', reading: 'chin-gu', meaning: '朋友' },
        { word: '낼게요', reading: 'nael-ge-yo', meaning: '（我来）付、请客' },
        { word: '고마워요', reading: 'go-ma-wo-yo', meaning: '谢谢' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '밥', reading: 'bap', meaning: '饭' },
        { word: '샀어요', reading: 'sa-sseo-yo', meaning: '买了、请（客）了' },
        { word: '제가', reading: 'je-ga', meaning: '我（做主语时）' },
        { word: '말했어요', reading: 'mal-hae-sseo-yo', meaning: '说了' },
        { word: '다들', reading: 'da-deul', meaning: '大家都' },
        { word: '도와줘서', reading: 'do-wa-jwo-seo', meaning: '因为帮助（我）' },
        { word: '정말', reading: 'jeong-mal', meaning: '真的' },
      ],
      quiz: [
        {
          question: '토리는 오늘 뭐라고 말했어요?',
          options: ['제가 낼게요!', '얼마예요?', '주세요.', '안녕히 가세요.'],
          answerIndex: 0,
          explanation: '兔莉说了“제가 낼게요!”，意思是“我来付（请客）！”。“~ㄹ게요”表示说话人的意愿。',
        },
      ],
      comments: [
        { animalId: 'minji', ko: '토리 씨 멋져요! 잘 먹었어요 💧', zh: '兔莉真帅气！吃得很好' },
        { animalId: 'junho', ko: '다음엔 내가 쏜다! 🎤', zh: '下次我请！' },
        { animalId: 'haru', ko: '맛있었어요, 고마워요 🌰', zh: '很好吃，谢谢' },
      ],
      likedBy: ['minji', 'junho', 'haru', 'choco', 'nabi', 'koal'],
    },
  },
  {
    id: 'blog-w4-10', slug: 'w4-choco-dinner', unlock_day: 27,
    title_ko: '토리 덕분에 맛있게 먹었어요', title_zh: '多亏兔莉吃得很开心',
    excerpt_ko: '오늘 토리가 한턱냈어요. 다 같이 국수를 먹었어요. 정말 맛있어요!',
    level: '초급', category: '일상', cover_emoji: '🍲', cover_theme: 'mint',
    author_id: 'choco', is_featured: 0, like_count: 13, audio_duration: 0,
    published_at: D(27, 20),
    content: {
      sentences: [
        { ko: '오늘 토리가 한턱냈어요! 🍲', zh: '今天兔莉请客了！' },
        { ko: '다 같이 국수를 먹었어요.', zh: '大家一起吃了面。' },
        { ko: '정말 맛있어서 배가 불러요. 🍫', zh: '太好吃了，肚子好饱。' },
      ],
      vocab: [
        { word: '국수', reading: 'guk-su', meaning: '面条' },
        { word: '배', reading: 'bae', meaning: '肚子' },
        { word: '불러요', reading: 'bul-leo-yo', meaning: '饱' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '한턱냈어요', reading: 'han-teok-nae-sseo-yo', meaning: '请了客' },
        { word: '다', reading: 'da', meaning: '全部、都' },
        { word: '같이', reading: 'ga-chi', meaning: '一起' },
        { word: '먹었어요', reading: 'meo-geo-sseo-yo', meaning: '吃了' },
        { word: '정말', reading: 'jeong-mal', meaning: '真的' },
        { word: '맛있어서', reading: 'ma-si-sseo-seo', meaning: '因为好吃' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '많이 먹어서 다행이에요 🌸', zh: '你们吃得多真好' },
        { animalId: 'haru', ko: '국수 최고였어요 🌰', zh: '面条太赞了' },
      ],
      likedBy: ['tori', 'haru', 'minji', 'junho', 'koal'],
    },
  },

  // ═══════════════ DAY 28 · 过去时·写日记开始 + yowoo 思辨 payoff ═══════════════
  {
    id: 'blog-w4-11', slug: 'w4-tori-past-tense', unlock_day: 28,
    title_ko: '이제 일기를 쓰기 시작했어요', title_zh: '现在开始写日记了',
    excerpt_ko: '오늘부터 한국어로 일기를 써요. "갔어요, 먹었어요, 만났어요."',
    level: '초급', category: '일상', cover_emoji: '✍️', cover_theme: 'pink',
    author_id: 'tori', is_featured: 0, like_count: 18, audio_duration: 0,
    published_at: D(28, 20),
    content: {
      sentences: [
        { ko: '오늘부터 한국어로 일기를 써요. ✍️', zh: '从今天开始用韩语写日记。' },
        { ko: '"갔어요, 먹었어요, 만났어요."', zh: '“去了、吃了、见了。”' },
        { ko: '과거형을 쓰니까 뿌듯해요. 😊', zh: '会用过去式了，好有成就感。' },
      ],
      vocab: [
        { word: '일기', reading: 'il-gi', meaning: '日记' },
        { word: '과거형', reading: 'gwa-geo-hyeong', meaning: '过去式' },
        { word: '뿌듯해요', reading: 'ppu-deu-tae-yo', meaning: '自豪、有成就感' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '한국어', reading: 'han-gu-geo', meaning: '韩语' },
        { word: '써요', reading: 'sseo-yo', meaning: '写' },
        { word: '갔어요', reading: 'ga-sseo-yo', meaning: '去了' },
        { word: '먹었어요', reading: 'meo-geo-sseo-yo', meaning: '吃了' },
        { word: '만났어요', reading: 'man-na-sseo-yo', meaning: '见了、遇到了' },
        { word: '쓰니까', reading: 'sseu-ni-kka', meaning: '因为写、写了之后' },
      ],
      quiz: [
        {
          question: '"가다"의 과거형은?',
          options: ['갔어요', '가요', '갈게요', '가고'],
          answerIndex: 0,
          explanation: '“가다”的过去式是“갔어요”。过去式用“~았/었어요”，“가다”变成“갔어요”。',
        },
      ],
      comments: [
        { animalId: 'haru', ko: '토리 정말 많이 늘었어요! 🌰', zh: '兔莉真的进步好多！' },
        { animalId: 'minji', ko: '한국어 일기라니, 멋져요! 💧', zh: '用韩语写日记，太厉害了！' },
      ],
      likedBy: ['haru', 'minji', 'junho', 'choco', 'nabi', 'darami'],
    },
  },
  {
    id: 'blog-w4-12', slug: 'w4-yowoo-thinking', unlock_day: 28,
    title_ko: '혼자 산다는 건 무엇일까요?', title_zh: '独自生活意味着什么呢？',
    excerpt_ko: '혼자 사는 건 외로움일까요, 아니면 자유일까요? 함께 생각해 봐요.',
    level: '고급', category: '문화 노트', cover_emoji: '☕', cover_theme: 'purple',
    author_id: 'yowoo', is_featured: 0, like_count: 17, audio_duration: 0,
    published_at: D(28, 22),
    content: {
      sentences: [
        { ko: '오늘은 조용한 밤이에요. ☕', zh: '今天是安静的夜晚。' },
        { ko: '혼자 산다는 건 무엇일까요?', zh: '独自生活意味着什么呢？' },
        { ko: '외로움일까요, 아니면 자유일까요?', zh: '是孤独，还是自由呢？' },
        { ko: '생각해 보면, 둘 다인 것 같아요.', zh: '想一想，也许两者都是。' },
      ],
      vocab: [
        { word: '외로움', reading: 'oe-ro-um', meaning: '孤独' },
        { word: '자유', reading: 'ja-yu', meaning: '自由' },
        { word: '생각', reading: 'saeng-gak', meaning: '想法、思考' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '조용한', reading: 'jo-yong-han', meaning: '安静的' },
        { word: '밤', reading: 'bam', meaning: '夜晚' },
        { word: '혼자', reading: 'hon-ja', meaning: '独自、一个人' },
        { word: '산다는 건', reading: 'san-da-neun-geon', meaning: '生活这件事' },
        { word: '무엇', reading: 'mu-eot', meaning: '什么' },
        { word: '아니면', reading: 'a-ni-myeon', meaning: '还是、或者' },
        { word: '둘 다', reading: 'dul-da', meaning: '两者都' },
      ],
      quiz: [
        {
          question: '여우는 혼자 사는 것을 어떻게 봤어요?',
          options: ['외로움이자 자유', '오직 외로움', '오직 자유', '나쁜 것'],
          answerIndex: 0,
          explanation: '狐狸认为独居既是孤独也是自由（외로움이자 자유），是一种辩证的看法。',
        },
      ],
      comments: [
        { animalId: 'tori', ko: '요즘 저도 그런 생각을 해요 🌸', zh: '最近我也在想这个' },
        { animalId: 'gomdori', ko: '깊은 이야기네요 📖', zh: '很有深度的话题呢' },
        { animalId: 'nabi', ko: '조용한 밤에 어울려요 ✨', zh: '很适合安静的夜晚' },
      ],
      likedBy: ['tori', 'gomdori', 'nabi', 'haru', 'koal'],
    },
  },

  // ═══════════════ DAY 29 · 韩语日记首次写作（故事高潮） ═══════════════
  {
    id: 'blog-w4-13', slug: 'w4-tori-first-diary', unlock_day: 29,
    title_ko: '엄마 당근 펜으로 첫 일기를 썼어요', title_zh: '用妈妈的胡萝卜笔写了第一篇日记',
    excerpt_ko: '엄마가 준 당근 펜으로 한국어 일기를 썼어요. "저는 용기를 냈어요."',
    level: '초급', category: '서울 일기', cover_emoji: '📔', cover_theme: 'pink',
    author_id: 'tori', is_featured: 1, like_count: 28, audio_duration: 0,
    published_at: D(29, 21),
    content: {
      sentences: [
        { ko: '오늘 처음으로 한국어 일기를 썼어요. 📔', zh: '今天第一次写了韩语日记。' },
        { ko: '엄마가 준 당근 펜으로 썼어요.', zh: '用妈妈给的胡萝卜笔写的。' },
        { ko: '갔어요, 먹었어요, 만났어요, 웃었어요.', zh: '去了、吃了、见了、笑了。' },
        { ko: '마지막 문장은 "저는 용기를 냈어요."예요. 🌸', zh: '最后一句是“我鼓起了勇气”。' },
        { ko: '내일은 초급 시험이에요. 조금 떨려요!', zh: '明天是初级考试。有点紧张！' },
      ],
      vocab: [
        { word: '당근', reading: 'dang-geun', meaning: '胡萝卜' },
        { word: '용기', reading: 'yong-gi', meaning: '勇气' },
        { word: '시험', reading: 'si-heom', meaning: '考试' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '처음으로', reading: 'cheo-eu-meu-ro', meaning: '第一次、首次' },
        { word: '한국어', reading: 'han-gu-geo', meaning: '韩语' },
        { word: '일기', reading: 'il-gi', meaning: '日记' },
        { word: '썼어요', reading: 'sseo-sseo-yo', meaning: '写了' },
        { word: '만났어요', reading: 'man-na-sseo-yo', meaning: '见了、遇到了' },
        { word: '웃었어요', reading: 'u-seo-sseo-yo', meaning: '笑了' },
        { word: '마지막', reading: 'ma-ji-mak', meaning: '最后' },
        { word: '내일', reading: 'nae-il', meaning: '明天' },
      ],
      quiz: [
        {
          question: '토리는 무엇으로 일기를 썼어요?',
          options: ['당근 펜', '연필', '노트북', '휴대폰'],
          answerIndex: 0,
          explanation: '兔莉用妈妈给的“당근 펜(胡萝卜笔)”写了日记，呼应第一天妈妈送的勇气胡萝卜。',
        },
      ],
      comments: [
        { animalId: 'haru', ko: '토리, 정말 자랑스러워요 🌰😭', zh: '兔莉，真为你骄傲' },
        { animalId: 'minji', ko: '처음 만난 날이 생각나요 💧', zh: '想起第一次遇见你的那天' },
        { animalId: 'junho', ko: '내일 시험 화이팅!! 🔥🎤', zh: '明天考试加油！！' },
        { animalId: 'gomdori', ko: '한 걸음씩 여기까지 왔구나 📖', zh: '一步一步走到了这里啊' },
      ],
      likedBy: ['haru', 'minji', 'junho', 'gomdori', 'yowoo', 'nabi', 'choco', 'koal', 'darami'],
    },
  },

  // ═══════════════ DAY 30 · 初级月考·升入中级班 ═══════════════
  {
    id: 'blog-w4-14', slug: 'w4-tori-graduation', unlock_day: 30,
    title_ko: '초급 시험 합격! 중급반으로 올라가요 🎓', title_zh: '初级考试合格！要升中级班了',
    excerpt_ko: '월말 시험에 "짐/집" 문제가 나왔어요! 합격해서 중급반으로 올라가요.',
    level: '초급', category: '서울 일기', cover_emoji: '🎓', cover_theme: 'pink',
    author_id: 'tori', is_featured: 1, like_count: 35, audio_duration: 0,
    published_at: D(30, 18),
    content: {
      sentences: [
        { ko: '오늘 초급 월말 시험을 봤어요. ✏️', zh: '今天考了初级月末考试。' },
        { ko: '시험에 "짐"하고 "집" 문제가 나왔어요! 😂', zh: '考卷上出现了“짐(行李)”和“집(家)”的题！' },
        { ko: '삼 일 차 공항이 생각나서 혼자 웃었어요.', zh: '想起第三天在机场的事，一个人笑了。' },
        { ko: '합격했어요! 이제 중급반으로 올라가요. 🎓', zh: '合格了！现在要升中级班了。' },
        { ko: '민지, 하루, 준호… 모두 고마워요! 🌸', zh: '敏智、哈鲁、俊浩……大家都谢谢你们！' },
      ],
      vocab: [
        { word: '시험', reading: 'si-heom', meaning: '考试' },
        { word: '합격', reading: 'hap-gyeok', meaning: '合格、通过' },
        { word: '중급', reading: 'jung-geup', meaning: '中级' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '초급', reading: 'cho-geup', meaning: '初级' },
        { word: '짐', reading: 'jim', meaning: '行李' },
        { word: '집', reading: 'jip', meaning: '家' },
        { word: '문제', reading: 'mun-je', meaning: '题目、问题' },
        { word: '공항', reading: 'gong-hang', meaning: '机场' },
        { word: '웃었어요', reading: 'u-seo-sseo-yo', meaning: '笑了' },
        { word: '올라가요', reading: 'ol-la-ga-yo', meaning: '升上去、上去' },
        { word: '모두', reading: 'mo-du', meaning: '大家、全部' },
      ],
      quiz: [
        {
          question: '토리는 시험에 합격해서 어떻게 됐어요?',
          options: ['중급반으로 올라가요', '집에 돌아가요', '초급반을 다시 해요', '학교를 떠나요'],
          answerIndex: 0,
          explanation: '兔莉通过初级月考（합격），升入中级班（중급반으로 올라가요）——不是离开，是继续学下去。',
        },
      ],
      comments: [
        { animalId: 'minji', ko: '토리, 축하해요! 중급반에서도 화이팅 💧', zh: '兔莉，恭喜！中级班也加油' },
        { animalId: 'haru', ko: '"집이 무거워요" 그때가 생각나요 ㅋㅋ 🌰', zh: '想起“我的家太重了”那时候，哈哈' },
        { animalId: 'junho', ko: '중급반 가도 같이 놀자!! 🎤', zh: '升中级班也一起玩！！' },
        { animalId: 'yowoo', ko: '새로운 시작을 응원해요 ☕', zh: '为你的新开始加油' },
      ],
      likedBy: ['minji', 'haru', 'junho', 'yowoo', 'gomdori', 'nabi', 'choco', 'koal', 'darami', 'news'],
    },
  },
  {
    id: 'blog-w4-15', slug: 'w4-news-graduation', unlock_day: 30,
    title_ko: '동물시 어학당 초급 시험 결과 소식', title_zh: '动物城语学堂初级考试结果消息',
    excerpt_ko: '오늘 초급반 월말 시험이 있었어요. 토리가 합격해서 중급반으로 올라가요!',
    level: '초급', category: '소식', cover_emoji: '🎓', cover_theme: 'gold',
    author_id: 'news', is_featured: 0, like_count: 12, audio_duration: 0,
    published_at: D(30, 12),
    content: {
      sentences: [
        { ko: '오늘 동물시 어학당 초급 시험이 있었어요. 📡', zh: '今天动物城语学堂举行了初级考试。' },
        { ko: '새 친구 토리가 합격했어요!', zh: '新朋友兔莉合格了！' },
        { ko: '이제 중급반으로 올라가요. 모두 축하해 주세요! 🎓', zh: '现在要升中级班了。请大家一起祝贺！' },
      ],
      vocab: [
        { word: '어학당', reading: 'eo-hak-dang', meaning: '语学堂、语言学校' },
        { word: '합격', reading: 'hap-gyeok', meaning: '合格、通过' },
        { word: '축하', reading: 'chu-ka', meaning: '祝贺、恭喜' },
        { word: '오늘', reading: 'o-neul', meaning: '今天' },
        { word: '초급', reading: 'cho-geup', meaning: '初级' },
        { word: '시험', reading: 'si-heom', meaning: '考试' },
        { word: '새', reading: 'sae', meaning: '新的' },
        { word: '친구', reading: 'chin-gu', meaning: '朋友' },
        { word: '이제', reading: 'i-je', meaning: '现在' },
        { word: '중급반', reading: 'jung-geup-ban', meaning: '中级班' },
        { word: '올라가요', reading: 'ol-la-ga-yo', meaning: '升上去、上去' },
        { word: '모두', reading: 'mo-du', meaning: '大家、全部' },
      ],
      quiz: [],
      comments: [
        { animalId: 'tori', ko: '뉴스에 나왔어요! 신기해요 🌸', zh: '上新闻了！好神奇' },
        { animalId: 'haru', ko: '토리 유명인이네요 🌰', zh: '兔莉成名人了呢' },
        { animalId: 'junho', ko: '우리 토리 자랑스럽다! 🎤', zh: '我们兔莉真让人骄傲！' },
      ],
      likedBy: ['tori', 'haru', 'junho', 'minji', 'choco', 'koal', 'nabi'],
    },
  },
  {
    id: 'blog-w4-16', slug: 'w4-gomdori-farewell', unlock_day: 30,
    title_ko: '초급은 끝, 중급은 시작이란다', title_zh: '初级结束，中级开始',
    excerpt_ko: '토리의 중급반 진급을 축하하며, 옛말 하나를 전해요. 시작이 반이란다.',
    level: '고급', category: '속담', cover_emoji: '📖', cover_theme: 'gold',
    author_id: 'gomdori', is_featured: 0, like_count: 16, audio_duration: 0,
    published_at: D(30, 21),
    content: {
      sentences: [
        { ko: '토리의 중급반 진급을 축하하며 옛말 하나를 전해요. 📖', zh: '祝贺兔莉升入中级班，送上一句老话。' },
        { ko: '"시작이 반이다."', zh: '“开始就是成功的一半。”' },
        { ko: '토리는 용기 내어 첫걸음을 내디뎠단다.', zh: '兔莉鼓起勇气迈出了第一步。' },
        { ko: '초급은 끝났지만, 중급은 또 다른 시작이란다.', zh: '初级结束了，但中级是另一个开始。' },
      ],
      vocab: [
        { word: '축하하며', reading: 'chu-ka-ha-myeo', meaning: '一边祝贺、祝贺着' },
        { word: '용기', reading: 'yong-gi', meaning: '勇气' },
        { word: '첫걸음', reading: 'cheot-geo-reum', meaning: '第一步' },
        { word: '중급반', reading: 'jung-geup-ban', meaning: '中级班' },
        { word: '진급', reading: 'jin-geup', meaning: '升级、晋级' },
        { word: '옛말', reading: 'yen-mal', meaning: '古话、老话' },
        { word: '하나', reading: 'ha-na', meaning: '一个' },
        { word: '시작', reading: 'si-jak', meaning: '开始' },
        { word: '반', reading: 'ban', meaning: '一半' },
        { word: '초급', reading: 'cho-geup', meaning: '初级' },
        { word: '또', reading: 'tto', meaning: '又、再' },
      ],
      quiz: [
        {
          question: '"시작이 반이다"의 뜻은?',
          options: ['시작하면 이미 절반은 이룬 것이다', '반만 하면 된다', '시작은 어렵다', '반드시 실패한다'],
          answerIndex: 0,
          explanation: '这句俗语意思是：只要开始了，就已经完成了一半，鼓励人勇敢起步。',
        },
      ],
      comments: [
        { animalId: 'tori', ko: '곰돌이 님, 항상 고마워요 🌸', zh: '熊仔前辈，一直谢谢您' },
        { animalId: 'yowoo', ko: '중급반에서도 잘할 거예요 ☕', zh: '中级班也会做得很好的' },
        { animalId: 'haru', ko: '또 다른 시작, 응원해요 🌰', zh: '另一个开始，加油' },
      ],
      likedBy: ['tori', 'yowoo', 'haru', 'minji', 'nabi', 'koal', 'darami'],
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
  console.log(`Inserted / updated ${count} Week4 posts.`);
  await client.close();
}

if (process.argv[1] && process.argv[1].endsWith('seed-blog-week4.mjs')) {
  main().catch((err) => {
    console.error(err);
    client.close();
    process.exit(1);
  });
}
