import { createClient } from '@libsql/client';
import path from 'path';

// 路人贴 v2 · A组（nightowl / slow / seolgi / daegu / jeju）
// 真社媒碎碎念纯短帖：吐槽/情绪/求证/唠嗑，无 vocab/quiz，网络语气，长短不一。
// author_kind='passerby', unlock_day=0, ai_status='passed', category='일상', level='초급'。
// 评论者 ∈ 卡司/其他路人，≠本帖 author。

const url = process.env.TURSO_DATABASE_URL;
const client = createClient({
  url: url || `file:${path.join(process.cwd(), 'data', 'app.db')}`,
  ...(url ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
});
const P = (mon, day, hour) => Date.UTC(2026, mon - 1, day, hour - 9, 0, 0);

const posts = [
  // ═══════ 부엉 🦉 · 夜猫子猫头鹰 · 失眠/凌晨emo/白天犯困 ═══════
  {
    id: 'blog-p2-nightowl-01', slug: 'p2-nightowl-3am',
    title_ko: '지금 안 자는 사람 손', title_zh: '现在还没睡的举手',
    excerpt_ko: '새벽 세 시인데 눈이 말똥말똥함. 지금 안 자고 이거 보는 사람 우리 친구 하자 ㅋㅋ',
    cover_emoji: '🌙', cover_theme: 'purple', like_count: 62, published_at: P(7, 24, 3),
    sentences: [
      { ko: '새벽 세 시인데 눈이 말똥말똥함.', zh: '凌晨三点了眼睛还贼精神。' },
      { ko: '지금 안 자고 이거 보는 사람 우리 친구 하자 ㅋㅋ', zh: '现在没睡在看这条的咱们做朋友吧哈哈' },
    ],
    comments: [
      { animalId: 'coder', ko: '접니다 야근 중이에요 ㅠㅠ', zh: '是我 加班中呜呜' },
      { animalId: 'nurse', ko: '저도요 지금 야간 근무…', zh: '我也是 现在上夜班…' },
    ],
    likedBy: ['coder', 'nurse', 'gapyeong', 'student'],
  },
  {
    id: 'blog-p2-nightowl-02', slug: 'p2-nightowl-coffee-noon',
    title_ko: '낮에 마신 커피 실화냐', title_zh: '白天喝的咖啡真的假的',
    excerpt_ko: '낮 두 시에 마신 커피 때문에 지금까지 안 잠… 카페인 나한테만 늦게 오나 봄 ㅠㅠ',
    cover_emoji: '☕', cover_theme: 'gold', like_count: 38, published_at: P(7, 23, 2),
    sentences: [
      { ko: '낮 두 시에 마신 커피 때문에 지금까지 안 잠…', zh: '因为下午两点喝的咖啡到现在都没睡…' },
      { ko: '카페인 나한테만 늦게 오나 봄 ㅠㅠ', zh: '咖啡因是不是只对我发作得晚啊呜呜' },
    ],
    comments: [{ animalId: 'gapyeong', ko: '오후엔 디카페인 드세요 ㅋㅋ', zh: '下午喝低因的吧哈哈' }],
    likedBy: ['gapyeong', 'coder', 'salaryman'],
  },
  {
    id: 'blog-p2-nightowl-03', slug: 'p2-nightowl-daytime-sleepy',
    title_ko: '낮엔 좀비 밤엔 멀쩡', title_zh: '白天僵尸晚上精神',
    excerpt_ko: '왜 나는 낮엔 좀비고 밤만 되면 멀쩡해지지. 몸이 시차 적응을 안 하나 봄 ㅋㅋㅋ',
    cover_emoji: '🧟', cover_theme: 'purple', like_count: 45, published_at: P(7, 22, 1),
    sentences: [
      { ko: '왜 나는 낮엔 좀비고 밤만 되면 멀쩡해지지.', zh: '为啥我白天像僵尸一到晚上就精神了。' },
      { ko: '몸이 시차 적응을 안 하나 봄 ㅋㅋㅋ', zh: '我这身体是不是永远倒不过时差哈哈哈' },
    ],
    comments: [{ animalId: 'student', ko: '저랑 똑같아요 밤에 집중 잘 돼요', zh: '跟我一样 晚上才专注' }],
    likedBy: ['student', 'coder', 'jeju'],
  },
  {
    id: 'blog-p2-nightowl-04', slug: 'p2-nightowl-latenight-snack',
    title_ko: '새벽에 라면 참기 힘듦', title_zh: '深夜忍不住想吃泡面',
    excerpt_ko: '새벽에 냄새 없는데도 라면 생각남. 지금 끓이면 지는 거 맞지? 근데 이미 물 올림 ㅋㅋㅋㅋ',
    cover_emoji: '🍜', cover_theme: 'gold', like_count: 57, published_at: P(7, 21, 2),
    sentences: [
      { ko: '새벽에 냄새 없는데도 라면 생각남.', zh: '深夜明明没闻到味也开始想泡面。' },
      { ko: '지금 끓이면 지는 거 맞지? 근데 이미 물 올림 ㅋㅋㅋㅋ', zh: '现在煮就算输了对吧？可我已经把水坐上了哈哈哈哈' },
    ],
    comments: [
      { animalId: 'rider', ko: '드세요 새벽 라면이 제일 맛있어요', zh: '吃吧 深夜泡面最香了' },
      { animalId: 'busan', ko: '이미 물 올렸으면 게임 끝 ㅋㅋ', zh: '水都坐上了那就没得跑了哈哈' },
    ],
    likedBy: ['rider', 'busan', 'coder', 'gapyeong'],
  },
  {
    id: 'blog-p2-nightowl-05', slug: 'p2-nightowl-quiet',
    title_ko: '새벽이 제일 좋은 이유', title_zh: '最喜欢深夜的理由',
    excerpt_ko: '다들 자니까 세상이 조용해서 좋음. 이 시간만큼은 온전히 내 시간인 느낌 🌙',
    cover_emoji: '🌌', cover_theme: 'purple', like_count: 49, published_at: P(7, 20, 2),
    sentences: [
      { ko: '다들 자니까 세상이 조용해서 좋음.', zh: '大家都睡了世界安静下来真好。' },
      { ko: '이 시간만큼은 온전히 내 시간인 느낌 🌙', zh: '唯独这个时间感觉完全属于我自己' },
    ],
    comments: [{ animalId: 'gapyeong', ko: '새벽 감성 인정합니다', zh: '凌晨的这种感觉 我懂' }],
    likedBy: ['gapyeong', 'nabi', 'student'],
  },
  {
    id: 'blog-p2-nightowl-06', slug: 'p2-nightowl-fix-sleep',
    title_ko: '내일부터 일찍 잘 거임 (365일째)', title_zh: '明天开始早睡（第365天）',
    excerpt_ko: '내일부터 진짜 열두 시 전에 잘 거임. 이 말 몇 번째 하는지 나도 모름 ㅋㅋㅋ',
    cover_emoji: '😪', cover_theme: 'mint', like_count: 53, published_at: P(7, 18, 1),
    sentences: [
      { ko: '내일부터 진짜 열두 시 전에 잘 거임.', zh: '明天开始真的要在十二点前睡。' },
      { ko: '이 말 몇 번째 하는지 나도 모름 ㅋㅋㅋ', zh: '这话我说过多少遍自己都不知道了哈哈哈' },
    ],
    comments: [
      { animalId: 'salaryman', ko: '저도 매일 하는 다짐이에요 ㅋㅋ', zh: '我也是每天都在下这个决心哈哈' },
      { animalId: 'coder', ko: '우리 다 같은 거짓말쟁이…', zh: '咱们都是一样的骗子…' },
    ],
    likedBy: ['salaryman', 'coder', 'student', 'gapyeong'],
  },

  // ═══════ 느림 🐢 · 慢乌龟 · 慢节奏/佛系/慢慢来也没关系 ═══════
  {
    id: 'blog-p2-slow-01', slug: 'p2-slow-no-rush',
    title_ko: '천천히 해도 괜찮아', title_zh: '慢慢来也没关系',
    excerpt_ko: '다들 빨리빨리 하는데 나만 느린 것 같을 때… 근데 뭐 어때. 천천히 가도 도착은 함 🐢',
    cover_emoji: '🐢', cover_theme: 'mint', like_count: 71, published_at: P(7, 24, 10),
    sentences: [
      { ko: '다들 빨리빨리 하는데 나만 느린 것 같을 때…', zh: '大家都在赶赶赶感觉只有我很慢的时候…' },
      { ko: '근데 뭐 어때. 천천히 가도 도착은 함 🐢', zh: '但那又怎样。慢慢走也会到的' },
    ],
    comments: [
      { animalId: 'granny', ko: '맞아 ~ 인생 뭐 급할 거 있나', zh: '对呀～人生有啥好急的' },
      { animalId: 'retiree', ko: '느린 게 오래 가요 ㅎㅎ', zh: '慢的才走得远呵呵' },
    ],
    likedBy: ['granny', 'retiree', 'gapyeong', 'jeju'],
  },
  {
    id: 'blog-p2-slow-02', slug: 'p2-slow-morning',
    title_ko: '아침에 일어나는 데 한 시간', title_zh: '早上醒来要花一个小时',
    excerpt_ko: '눈은 떴는데 몸이 안 움직임. 침대에서 나오는 데만 한 시간 걸리는 사람 나만은 아니겠지 ㅋㅋ',
    cover_emoji: '🛏️', cover_theme: 'gold', like_count: 44, published_at: P(7, 23, 8),
    sentences: [
      { ko: '눈은 떴는데 몸이 안 움직임.', zh: '眼睛睁开了身体却不动。' },
      { ko: '침대에서 나오는 데만 한 시간 걸리는 사람 나만은 아니겠지 ㅋㅋ', zh: '光是从床上爬起来就要一小时的人不止我一个吧哈哈' },
    ],
    comments: [{ animalId: 'nightowl', ko: '저는 두 시간 걸립니다 ㅋㅋㅋ', zh: '我要两小时哈哈哈' }],
    likedBy: ['nightowl', 'gapyeong', 'student'],
  },
  {
    id: 'blog-p2-slow-03', slug: 'p2-slow-walk',
    title_ko: '산책하다 꽃 구경만 삼십 분', title_zh: '散步光看花就三十分钟',
    excerpt_ko: '동네 한 바퀴 도는데 꽃 보고 고양이 보고 하늘 보다 보면 시간 순삭임. 이게 힐링이지 뭐',
    cover_emoji: '🌸', cover_theme: 'pink', like_count: 50, published_at: P(7, 22, 11),
    sentences: [
      { ko: '동네 한 바퀴 도는데 꽃 보고 고양이 보고 하늘 보다 보면 시간 순삭임.', zh: '在小区转一圈，看看花看看猫看看天，时间嗖一下就没了。' },
      { ko: '이게 힐링이지 뭐', zh: '这不就是治愈嘛' },
    ],
    comments: [{ animalId: 'florist', ko: '산책 최고죠 🌷 저도 매일 해요', zh: '散步最棒了 我也每天散' }],
    likedBy: ['florist', 'granny', 'retiree', 'jeju'],
  },
  {
    id: 'blog-p2-slow-04', slug: 'p2-slow-todo',
    title_ko: '오늘 할 일 하나만 하기로 함', title_zh: '今天决定只做一件事',
    excerpt_ko: '할 일 열 개 적어놓고 스트레스 받느니 딱 하나만 하기로 함. 그거라도 하면 성공 ㅋㅋ',
    cover_emoji: '✅', cover_theme: 'mint', like_count: 58, published_at: P(7, 21, 13),
    sentences: [
      { ko: '할 일 열 개 적어놓고 스트레스 받느니 딱 하나만 하기로 함.', zh: '与其列十件事然后压力山大，不如就定一件。' },
      { ko: '그거라도 하면 성공 ㅋㅋ', zh: '哪怕就做了那一件也算成功哈哈' },
    ],
    comments: [
      { animalId: 'student', ko: '이거 진짜 마음 편해지는 방법이네요', zh: '这方法真的让人轻松' },
      { animalId: 'salaryman', ko: '저도 오늘부터 이렇게 할래요', zh: '我也从今天开始这么干' },
    ],
    likedBy: ['student', 'salaryman', 'gapyeong', 'coder'],
  },
  {
    id: 'blog-p2-slow-05', slug: 'p2-slow-tea',
    title_ko: '차 한 잔 우리는 시간', title_zh: '泡一杯茶的时间',
    excerpt_ko: '급하게 마시면 맛도 모름. 차 우러나는 거 기다리는 이 시간이 은근 좋음 🍵',
    cover_emoji: '🍵', cover_theme: 'mint', like_count: 41, published_at: P(7, 20, 15),
    sentences: [
      { ko: '급하게 마시면 맛도 모름.', zh: '急着喝的话根本尝不出味。' },
      { ko: '차 우러나는 거 기다리는 이 시간이 은근 좋음 🍵', zh: '等茶慢慢泡开的这段时间意外地喜欢' },
    ],
    comments: [{ animalId: 'retiree', ko: '차는 기다림의 맛이죠 ㅎㅎ', zh: '茶就是等待的味道呵呵' }],
    likedBy: ['retiree', 'granny', 'jeju'],
  },
  {
    id: 'blog-p2-slow-06', slug: 'p2-slow-compare',
    title_ko: '남이랑 비교 안 하기로 함', title_zh: '决定不跟别人比了',
    excerpt_ko: '남들 다 앞서가는 것 같아도 내 속도가 있는 거니까. 오늘부터 비교 그만 ㅋㅋ 마음 편함',
    cover_emoji: '🌱', cover_theme: 'mint', like_count: 66, published_at: P(7, 18, 20),
    sentences: [
      { ko: '남들 다 앞서가는 것 같아도 내 속도가 있는 거니까.', zh: '就算大家好像都跑在前面，我也有我自己的节奏。' },
      { ko: '오늘부터 비교 그만 ㅋㅋ 마음 편함', zh: '从今天起不比了哈哈 心里舒坦' },
    ],
    comments: [
      { animalId: 'student', ko: '이 말 오늘 필요했어요 감사요 ㅠㅠ', zh: '今天正需要这句话 谢谢呜呜' },
      { animalId: 'newmom', ko: '각자 속도 인정 🌱', zh: '各有各的节奏 认同' },
    ],
    likedBy: ['student', 'newmom', 'gapyeong', 'granny', 'jeju'],
  },

  // ═══════ 설기 🐰 · 弘大画画兔 · 画画/灵感/展览/创作焦虑 ═══════
  {
    id: 'blog-p2-seolgi-01', slug: 'p2-seolgi-blank',
    title_ko: '흰 종이가 제일 무서움', title_zh: '空白的纸最可怕',
    excerpt_ko: '그림 그리려고 종이 폈는데 한 시간째 그냥 봄. 흰 종이가 세상에서 제일 무서운 거 실화 ㅠㅠ',
    cover_emoji: '🎨', cover_theme: 'pink', like_count: 54, published_at: P(7, 24, 15),
    sentences: [
      { ko: '그림 그리려고 종이 폈는데 한 시간째 그냥 봄.', zh: '想画画摊开纸，结果盯着看了一小时。' },
      { ko: '흰 종이가 세상에서 제일 무서운 거 실화 ㅠㅠ', zh: '空白的纸是世上最可怕的东西 这是真的呜呜' },
    ],
    comments: [
      { animalId: 'actor', ko: '창작하는 사람들 다 공감할 듯 ㅠㅠ', zh: '搞创作的应该都懂呜呜' },
      { animalId: 'nightowl', ko: '일단 아무 선이라도 그어보세요!', zh: '先随便画根线试试看！' },
    ],
    likedBy: ['actor', 'nightowl', 'tori', 'gapyeong'],
  },
  {
    id: 'blog-p2-seolgi-02', slug: 'p2-seolgi-idea-shower',
    title_ko: '아이디어는 왜 샤워할 때만', title_zh: '灵感为啥只在洗澡时来',
    excerpt_ko: '하루 종일 안 떠오르던 아이디어가 샤워하자마자 폭발함. 물 틀면 뇌도 켜지나 봄 ㅋㅋㅋ',
    cover_emoji: '🚿', cover_theme: 'mint', like_count: 48, published_at: P(7, 23, 21),
    sentences: [
      { ko: '하루 종일 안 떠오르던 아이디어가 샤워하자마자 폭발함.', zh: '一整天都想不出的灵感一洗澡就炸开了。' },
      { ko: '물 틀면 뇌도 켜지나 봄 ㅋㅋㅋ', zh: '一放水脑子是不是也跟着开机了哈哈哈' },
    ],
    comments: [{ animalId: 'coder', ko: '코드도 샤워할 때 풀려요 ㅋㅋ', zh: '写代码也是洗澡时才想通哈哈' }],
    likedBy: ['coder', 'actor', 'student'],
  },
  {
    id: 'blog-p2-seolgi-03', slug: 'p2-seolgi-exhibition',
    title_ko: '주말에 전시 보러 갈 사람', title_zh: '周末有人一起看展吗',
    excerpt_ko: '홍대 근처에서 하는 전시 가보려는데 같이 갈 사람 있나요 얘들아. 혼자 가긴 좀 심심해서 ㅎㅎ',
    cover_emoji: '🖼️', cover_theme: 'pink', like_count: 35, published_at: P(7, 22, 14),
    sentences: [
      { ko: '홍대 근처에서 하는 전시 가보려는데 같이 갈 사람 있나요 얘들아.', zh: '想去弘大附近的一个展，宝子们有没有人一起。' },
      { ko: '혼자 가긴 좀 심심해서 ㅎㅎ', zh: '一个人去有点无聊呵呵' },
    ],
    comments: [
      { animalId: 'actor', ko: '오 저 관심 있어요! 무슨 전시예요?', zh: '哦我有兴趣！什么展啊' },
      { animalId: 'florist', ko: '저도 껴도 되나요 ㅎㅎ', zh: '我也能加入吗呵呵' },
    ],
    likedBy: ['actor', 'florist', 'tori', 'runner'],
  },
  {
    id: 'blog-p2-seolgi-04', slug: 'p2-seolgi-erase',
    title_ko: '세 시간 그린 거 다 지웠다', title_zh: '画了三小时全擦了',
    excerpt_ko: '세 시간 공들여 그렸는데 맘에 안 들어서 다 지움. 아 내가 왜 그랬지 ㅠㅠ 근데 후련하긴 함',
    cover_emoji: '🧽', cover_theme: 'purple', like_count: 43, published_at: P(7, 21, 22),
    sentences: [
      { ko: '세 시간 공들여 그렸는데 맘에 안 들어서 다 지움.', zh: '花三小时精心画的，因为不满意全擦了。' },
      { ko: '아 내가 왜 그랬지 ㅠㅠ 근데 후련하긴 함', zh: '啊我干嘛这样呜呜 但确实挺痛快的' },
    ],
    comments: [{ animalId: 'actor', ko: '그 마음 알아요… 완벽주의의 저주 ㅠㅠ', zh: '懂那种心情…完美主义的诅咒呜呜' }],
    likedBy: ['actor', 'nightowl', 'tori'],
  },
  {
    id: 'blog-p2-seolgi-05', slug: 'p2-seolgi-color',
    title_ko: '오늘 하늘 색 미쳤다', title_zh: '今天天空的颜色绝了',
    excerpt_ko: '퇴근길 하늘이 분홍 보라 섞여서 진짜 그림 같았음. 이런 색은 어떻게 만들지 계속 생각함 🎨',
    cover_emoji: '🌇', cover_theme: 'pink', like_count: 59, published_at: P(7, 20, 19),
    sentences: [
      { ko: '퇴근길 하늘이 분홍 보라 섞여서 진짜 그림 같았음.', zh: '下班路上天空粉紫交织真的像画一样。' },
      { ko: '이런 색은 어떻게 만들지 계속 생각함 🎨', zh: '一直在想这种颜色到底怎么调出来' },
    ],
    comments: [
      { animalId: 'jeju', ko: '제주 노을도 진짜 예뻐요 보러 오세요', zh: '济州的晚霞也超美 来看看吧' },
      { animalId: 'florist', ko: '저도 봤어요 오늘 하늘 대박 🌇', zh: '我也看到了 今天天空绝了' },
    ],
    likedBy: ['jeju', 'florist', 'tori', 'nabi', 'runner'],
  },
  {
    id: 'blog-p2-seolgi-06', slug: 'p2-seolgi-comment',
    title_ko: '내 그림에 댓글 하나 달렸다', title_zh: '我的画收到一条评论',
    excerpt_ko: '올린 그림에 "덕분에 오늘 위로받았어요" 댓글 달렸는데… 아 나 이 맛에 그림 그림 ㅠㅠ',
    cover_emoji: '💌', cover_theme: 'pink', like_count: 68, published_at: P(7, 18, 18),
    sentences: [
      { ko: '올린 그림에 "덕분에 오늘 위로받았어요" 댓글 달렸는데…', zh: '发的画下面有人评论"多亏了它今天被治愈了"…' },
      { ko: '아 나 이 맛에 그림 그림 ㅠㅠ', zh: '啊我就是为了这个才画画的呜呜' },
    ],
    comments: [
      { animalId: 'tori', ko: '그림 진짜 따뜻해요 계속 그려주세요 🌸', zh: '画真的很温暖 请一直画下去' },
      { animalId: 'gapyeong', ko: '이런 댓글 받으면 하루 종일 행복하죠', zh: '收到这种评论能开心一整天' },
    ],
    likedBy: ['tori', 'gapyeong', 'actor', 'florist', 'nabi'],
  },

  // ═══════ 단풍 🦊 · 大邱爱吃狐 · 美食/地方口味/爱辣/吃货 ═══════
  {
    id: 'blog-p2-daegu-01', slug: 'p2-daegu-spicy',
    title_ko: '서울 음식은 왜 안 매워', title_zh: '首尔的菜为啥都不辣',
    excerpt_ko: '여기 매운맛 시켰는데 하나도 안 매움. 대구 사람 입엔 이게 순한 맛이야 진짜 ㅋㅋㅋ',
    cover_emoji: '🌶️', cover_theme: 'gold', like_count: 51, published_at: P(7, 24, 13),
    sentences: [
      { ko: '여기 매운맛 시켰는데 하나도 안 매움.', zh: '这儿点了辣的结果一点都不辣。' },
      { ko: '대구 사람 입엔 이게 순한 맛이야 진짜 ㅋㅋㅋ', zh: '在大邱人嘴里这就是微辣真的哈哈哈' },
    ],
    comments: [
      { animalId: 'busan', ko: '부산도 매운맛 부심 있는데 대구 못 이김 ㅋㅋ', zh: '釜山也自认能吃辣但比不过大邱哈哈' },
      { animalId: 'salaryman', ko: '전 순한 맛도 매워요 ㅠㅠ', zh: '我连微辣都觉得辣呜呜' },
    ],
    likedBy: ['busan', 'salaryman', 'gapyeong', 'rider'],
  },
  {
    id: 'blog-p2-daegu-02', slug: 'p2-daegu-makchang',
    title_ko: '막창 먹고 싶다 진심으로', title_zh: '真心想吃烤肠',
    excerpt_ko: '갑자기 대구 막창 미친 듯이 땡김. 서울에도 파는 데 있나요 얘들아 알려줘요 ㅠㅠ',
    cover_emoji: '🍢', cover_theme: 'gold', like_count: 46, published_at: P(7, 23, 19),
    sentences: [
      { ko: '갑자기 대구 막창 미친 듯이 땡김.', zh: '突然疯狂想吃大邱烤肠。' },
      { ko: '서울에도 파는 데 있나요 얘들아 알려줘요 ㅠㅠ', zh: '首尔有卖的地方吗宝子们告诉我呜呜' },
    ],
    comments: [{ animalId: 'rider', ko: '동대문 쪽에 유명한 집 있어요!', zh: '东大门那边有家有名的！' }],
    likedBy: ['rider', 'busan', 'salaryman'],
  },
  {
    id: 'blog-p2-daegu-03', slug: 'p2-daegu-breakfast',
    title_ko: '아침부터 뭐 먹을지 고민', title_zh: '一早就在纠结吃啥',
    excerpt_ko: '눈 뜨자마자 오늘 점심 뭐 먹을지 고민함. 먹는 게 인생의 낙인 사람 손 🙋',
    cover_emoji: '🍽️', cover_theme: 'gold', like_count: 55, published_at: P(7, 22, 9),
    sentences: [
      { ko: '눈 뜨자마자 오늘 점심 뭐 먹을지 고민함.', zh: '一睁眼就在纠结今天午饭吃啥。' },
      { ko: '먹는 게 인생의 낙인 사람 손 🙋', zh: '把吃当成人生乐趣的举手' },
    ],
    comments: [
      { animalId: 'gapyeong', ko: '저요 ㅋㅋ 먹으려고 삽니다', zh: '我我 哈哈 为了吃而活' },
      { animalId: 'busan', ko: '손 들었습니다 확실히', zh: '手举得稳稳的' },
    ],
    likedBy: ['gapyeong', 'busan', 'rider', 'coder'],
  },
  {
    id: 'blog-p2-daegu-04', slug: 'p2-daegu-diet-fail',
    title_ko: '다이어트 내일부터', title_zh: '减肥明天开始',
    excerpt_ko: '오늘 치킨 시키면서 다이어트는 내일부터라고 함. 근데 내 내일은 왜 안 오지 ㅋㅋㅋㅋ',
    cover_emoji: '🍗', cover_theme: 'gold', like_count: 60, published_at: P(7, 21, 20),
    sentences: [
      { ko: '오늘 치킨 시키면서 다이어트는 내일부터라고 함.', zh: '今天点炸鸡的时候说减肥明天开始。' },
      { ko: '근데 내 내일은 왜 안 오지 ㅋㅋㅋㅋ', zh: '可我的明天为啥总不来哈哈哈哈' },
    ],
    comments: [
      { animalId: 'salaryman', ko: '내일은 영원히 안 옵니다 ㅋㅋ', zh: '明天永远不会来的哈哈' },
      { animalId: 'runner', ko: '같이 뛰어요 그럼 ㅋㅋ', zh: '那一起跑步呗哈哈' },
    ],
    likedBy: ['salaryman', 'runner', 'busan', 'gapyeong'],
  },
  {
    id: 'blog-p2-daegu-05', slug: 'p2-daegu-market',
    title_ko: '시장 국밥이 그리움', title_zh: '想念市场的汤饭',
    excerpt_ko: '서울 밥집도 좋은데 대구 시장 국밥 그 맛이 안 남. 할머니가 막 퍼주시던 그 인심 ㅠㅠ',
    cover_emoji: '🍲', cover_theme: 'gold', like_count: 42, published_at: P(7, 20, 12),
    sentences: [
      { ko: '서울 밥집도 좋은데 대구 시장 국밥 그 맛이 안 남.', zh: '首尔的饭馆也不错，可就是没有大邱市场汤饭那个味。' },
      { ko: '할머니가 막 퍼주시던 그 인심 ㅠㅠ', zh: '奶奶大勺大勺给你盛的那份人情味呜呜' },
    ],
    comments: [{ animalId: 'granny', ko: '시장 인심이 최고지 ~ 담엔 많이 드려요', zh: '市场的人情最好啦～下次给你多盛点' }],
    likedBy: ['granny', 'busan', 'retiree', 'gapyeong'],
  },
  {
    id: 'blog-p2-daegu-06', slug: 'p2-daegu-recommend',
    title_ko: '맛집 추천 좀 진지하게', title_zh: '认真求推荐好吃的',
    excerpt_ko: '서울 온 지 얼마 안 돼서 맛집을 모름. 진짜 맛있는 데만 추천해 줘요 얘들아 실패 싫어 ㅠㅠ',
    cover_emoji: '📍', cover_theme: 'mint', like_count: 39, published_at: P(7, 18, 17),
    sentences: [
      { ko: '서울 온 지 얼마 안 돼서 맛집을 모름.', zh: '来首尔没多久还不认识什么好馆子。' },
      { ko: '진짜 맛있는 데만 추천해 줘요 얘들아 실패 싫어 ㅠㅠ', zh: '宝子们只推真好吃的啊 我怕踩雷呜呜' },
    ],
    comments: [
      { animalId: 'rider', ko: '제가 배달 다니면서 찾은 곳들 알려드릴게요!', zh: '我送外卖时发现的店告诉你！' },
      { animalId: 'gapyeong', ko: '가평 쪽 오면 제가 안내할게요 ㅋㅋ', zh: '来加平这边我给你带路哈哈' },
    ],
    likedBy: ['rider', 'gapyeong', 'busan', 'salaryman', 'coder'],
  },

  // ═══════ 조랑 🐴 · 济州海岛马 · 海岛生活/天气/悠闲/想念大海 ═══════
  {
    id: 'blog-p2-jeju-01', slug: 'p2-jeju-sea-everyday',
    title_ko: '바다 매일 봐도 안 질림', title_zh: '海每天看都看不腻',
    excerpt_ko: '제주 살면 바다 안 질리냐고 묻는데… 안 질림. 매일 색이 달라서 진짜 안 질림 🌊',
    cover_emoji: '🌊', cover_theme: 'mint', like_count: 64, published_at: P(7, 24, 9),
    sentences: [
      { ko: '제주 살면 바다 안 질리냐고 묻는데…', zh: '有人问住济州会不会看海看腻…' },
      { ko: '안 질림. 매일 색이 달라서 진짜 안 질림 🌊', zh: '不腻。每天颜色都不一样 真的不腻' },
    ],
    comments: [
      { animalId: 'busan', ko: '부산 펭귄도 인정 바다는 진리 🌊', zh: '釜山企鹅也认 海就是真理' },
      { animalId: 'seolgi', ko: '바다 색 그리고 싶다 진짜', zh: '真想把海的颜色画下来' },
    ],
    likedBy: ['busan', 'seolgi', 'gapyeong', 'runner'],
  },
  {
    id: 'blog-p2-jeju-02', slug: 'p2-jeju-wind',
    title_ko: '제주 바람 장난 아님', title_zh: '济州的风不是闹着玩的',
    excerpt_ko: '우산 쓰면 바로 뒤집힘. 육지 사람들 제주 바람 무시하지 마세요 진짜 ㅋㅋㅋ',
    cover_emoji: '💨', cover_theme: 'mint', like_count: 47, published_at: P(7, 23, 12),
    sentences: [
      { ko: '우산 쓰면 바로 뒤집힘.', zh: '打伞立马被吹翻。' },
      { ko: '육지 사람들 제주 바람 무시하지 마세요 진짜 ㅋㅋㅋ', zh: '陆地上的各位别小看济州的风真的哈哈哈' },
    ],
    comments: [{ animalId: 'runner', ko: '거기서 뛰면 운동 두 배 되겠네요 ㅋㅋ', zh: '在那儿跑步运动量得翻倍哈哈' }],
    likedBy: ['runner', 'busan', 'gapyeong'],
  },
  {
    id: 'blog-p2-jeju-03', slug: 'p2-jeju-tangerine',
    title_ko: '귤은 겨울에만 먹는 거 아님', title_zh: '橘子不是只有冬天吃',
    excerpt_ko: '육지 친구가 여름에 웬 귤이냐는데 제주는 사시사철 귤 있음. 한라봉 진짜 맛있는데 ㅠㅠ',
    cover_emoji: '🍊', cover_theme: 'gold', like_count: 43, published_at: P(7, 22, 15),
    sentences: [
      { ko: '육지 친구가 여름에 웬 귤이냐는데 제주는 사시사철 귤 있음.', zh: '陆地朋友说夏天哪来的橘子，可济州一年四季都有橘子。' },
      { ko: '한라봉 진짜 맛있는데 ㅠㅠ', zh: '汉拿峰橘子真的超好吃呜呜' },
    ],
    comments: [
      { animalId: 'daegu', ko: '한라봉 최고죠 택배로 시켜 먹어요', zh: '汉拿峰橘最棒了 我都快递订着吃' },
      { animalId: 'granny', ko: '제주 귤은 달기가 다르지 ~', zh: '济州的橘子甜度就是不一样～' },
    ],
    likedBy: ['daegu', 'granny', 'busan', 'gapyeong'],
  },
  {
    id: 'blog-p2-jeju-04', slug: 'p2-jeju-slow-life',
    title_ko: '여기선 다들 천천히 삼', title_zh: '这儿大家都过得慢悠悠',
    excerpt_ko: '서울 갔다 오면 확실히 느낌. 제주는 시간이 천천히 가는 것 같음. 사람들도 안 급함 🐴',
    cover_emoji: '🌴', cover_theme: 'mint', like_count: 56, published_at: P(7, 21, 16),
    sentences: [
      { ko: '서울 갔다 오면 확실히 느낌.', zh: '去趟首尔回来就明显感觉到。' },
      { ko: '제주는 시간이 천천히 가는 것 같음. 사람들도 안 급함 🐴', zh: '济州的时间好像走得慢，人们也不着急' },
    ],
    comments: [
      { animalId: 'slow', ko: '제주 살고 싶다 저랑 잘 맞을 듯 🐢', zh: '好想住济州 感觉跟我很合' },
      { animalId: 'retiree', ko: '은퇴하면 제주 갈까 고민 중 ㅎㅎ', zh: '正纠结退休后要不要去济州呵呵' },
    ],
    likedBy: ['slow', 'retiree', 'gapyeong', 'granny'],
  },
  {
    id: 'blog-p2-jeju-05', slug: 'p2-jeju-ferry',
    title_ko: '배 뜰지 매일 확인함', title_zh: '每天都要查船开不开',
    excerpt_ko: '육지 나가려면 날씨부터 확인. 바람 세면 배 안 떠서 발 묶임 ㅠㅠ 섬 생활의 애환',
    cover_emoji: '⛴️', cover_theme: 'mint', like_count: 38, published_at: P(7, 20, 11),
    sentences: [
      { ko: '육지 나가려면 날씨부터 확인.', zh: '要出岛去陆地得先看天气。' },
      { ko: '바람 세면 배 안 떠서 발 묶임 ㅠㅠ 섬 생활의 애환', zh: '风大了船不开就走不了呜呜 岛上生活的心酸' },
    ],
    comments: [{ animalId: 'busan', ko: '아 그건 진짜 답답하겠다 ㅠㅠ', zh: '啊那真的挺憋屈的呜呜' }],
    likedBy: ['busan', 'slow', 'gapyeong'],
  },
  {
    id: 'blog-p2-jeju-06', slug: 'p2-jeju-come-visit',
    title_ko: '제주 놀러 와요 진짜', title_zh: '真的来济州玩吧',
    excerpt_ko: '여름 휴가 어디 갈지 고민이면 그냥 제주 와요. 바다도 산도 다 있음. 내가 맛집 알려줄게 ㅋㅋ',
    cover_emoji: '🏝️', cover_theme: 'mint', like_count: 50, published_at: P(7, 18, 19),
    sentences: [
      { ko: '여름 휴가 어디 갈지 고민이면 그냥 제주 와요.', zh: '暑假纠结去哪玩的话就来济州吧。' },
      { ko: '바다도 산도 다 있음. 내가 맛집 알려줄게 ㅋㅋ', zh: '有海也有山。好吃的我来告诉你哈哈' },
    ],
    comments: [
      { animalId: 'busan', ko: '이번 여름에 진짜 갈게요!', zh: '这个夏天真的去！' },
      { animalId: 'seolgi', ko: '스케치북 들고 갈래요 🎨', zh: '我要带着速写本去' },
    ],
    likedBy: ['busan', 'seolgi', 'daegu', 'runner', 'gapyeong'],
  },
];

async function main() {
  let n = 0;
  for (const p of posts) {
    const content = { sentences: p.sentences, vocab: [], quiz: [], comments: p.comments ?? [], likedBy: p.likedBy ?? [], images: [] };
    const authorId = p.id.split('-')[2]; // blog-p2-<author>-NN
    await client.execute({
      sql: `INSERT INTO blog_posts
        (id, slug, title_ko, title_zh, excerpt_ko, level, category, content_json,
         audio_url, audio_duration, cover_emoji, published_at, is_featured,
         author_id, like_count, cover_image_url, cover_theme,
         unlock_day, author_kind, ai_status, join_contest)
       VALUES (?, ?, ?, ?, ?, '초급', '일상', ?, '', 0, ?, ?, 0, ?, ?, '', ?, 0, 'passerby', 'passed', 0)
       ON CONFLICT(id) DO UPDATE SET
         slug=excluded.slug, title_ko=excluded.title_ko, title_zh=excluded.title_zh,
         excerpt_ko=excluded.excerpt_ko, content_json=excluded.content_json,
         cover_emoji=excluded.cover_emoji, cover_theme=excluded.cover_theme,
         like_count=excluded.like_count, published_at=excluded.published_at,
         author_kind='passerby', ai_status='passed'`,
      args: [p.id, p.slug, p.title_ko, p.title_zh, p.excerpt_ko, JSON.stringify(content), p.cover_emoji, p.published_at, authorId, p.like_count, p.cover_theme],
    });
    n++;
  }
  console.log(`upserted ${n} v2 passerby posts (groupA: nightowl/slow/seolgi/daegu/jeju)`);
}
main().catch((e) => { console.error(e); process.exit(1); });
