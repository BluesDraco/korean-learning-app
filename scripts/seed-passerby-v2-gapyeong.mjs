import { createClient } from '@libsql/client';
import path from 'path';

// ---------------------------------------------------------------------------
// 路人贴 v2 · 样板批（고슴이 gapyeong）
// 定位修正：真社媒「碎碎念」——吐槽/情绪/求证/唠嗑，文字是主角，不再是画面配文。
//   - 纯短帖：1-3 句口语，无 vocab / 无 quiz（学习结构只留给兔莉+主角团）。
//   - author_kind = 'passerby'，unlock_day = 0（始终可见）。全部无封面图。
//   - 保留 1-2 条动物评论（社区感）；评论者 ∈ 卡司/其他路人，≠ 本帖 author。
//   - 语气：ㅋㅋ/ㅠㅠ/실화냐/용서됨/宝子们 等网络语，长短不一，随意为主。
// title_ko 用于详情页 H1 + feed 无摘要时兜底；excerpt_ko = feed 小卡正文（碎碎念本体）。
// sentences = 详情页可点词正文（就是碎碎念本身，拆成自然 1-2 行）。
// ---------------------------------------------------------------------------

const url = process.env.TURSO_DATABASE_URL;
const client = createClient({
  url: url || `file:${path.join(process.cwd(), 'data', 'app.db')}`,
  ...(url ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
});

const P = (mon, day, hour) => Date.UTC(2026, mon - 1, day, hour - 9, 0, 0); // KST≈UTC+9

// 고슴이 🦔 · 加平刺猬 · 开小咖啡馆，也是会摸鱼会馋会 emo 的普通人
const posts = [
  {
    id: 'blog-p2-gapyeong-01', slug: 'p2-gapyeong-alarm',
    title_ko: '알람 5개 다 껐다 진짜 ㅋㅋㅋ', title_zh: '五个闹钟全被我关了哈哈哈',
    excerpt_ko: '아 오늘도 알람 5개 다 껐어… 가게 문 여는 게 세상에서 제일 힘든 일 ㅋㅋㅋㅋ',
    cover_emoji: '⏰', cover_theme: 'gold', like_count: 41,
    published_at: P(7, 23, 9),
    sentences: [
      { ko: '아 오늘도 알람 5개 다 껐어…', zh: '啊今天又把5个闹钟全关了…' },
      { ko: '가게 문 여는 게 세상에서 제일 힘든 일 ㅋㅋㅋㅋ', zh: '开店门真是天底下最难的事哈哈哈' },
    ],
    comments: [
      { animalId: 'salaryman', ko: '저도요… 알람이랑 매일 싸워요 ㅋㅋ', zh: '我也是…每天都在跟闹钟打架哈哈' },
    ],
    likedBy: ['salaryman', 'busan', 'nightowl', 'darami'],
  },
  {
    id: 'blog-p2-gapyeong-02', slug: 'p2-gapyeong-strawberry-cake',
    title_ko: '딸기 케이크 먹고 인생 용서함 🍓', title_zh: '吃了草莓蛋糕，原谅一切',
    excerpt_ko: '손님이 딸기 케이크 남은 거 그냥 드시래서 먹었는데 진짜… 오늘 하루 다 용서됨 🍓',
    cover_emoji: '🍓', cover_theme: 'pink', like_count: 58,
    published_at: P(7, 23, 15),
    sentences: [
      { ko: '손님이 딸기 케이크 남은 거 그냥 드시래서 먹었는데 진짜…', zh: '客人说剩的草莓蛋糕给我吃，结果真的…' },
      { ko: '오늘 하루 다 용서됨 🍓', zh: '今天一整天的累都被原谅了' },
    ],
    comments: [
      { animalId: 'haru', ko: '딸기 케이크는 진리죠 ㅠㅠ 부러워요', zh: '草莓蛋糕就是真理啊呜呜 好羡慕' },
      { animalId: 'tori', ko: '헐 저도 먹고 싶다…', zh: '天 我也想吃…' },
    ],
    likedBy: ['haru', 'tori', 'minji', 'florist', 'jeju'],
  },
  {
    id: 'blog-p2-gapyeong-03', slug: 'p2-gapyeong-rain-week',
    title_ko: '다음 주 내내 비 온다는데 실화냐', title_zh: '听说下周天天下雨，真的假的',
    excerpt_ko: '다음 주 내내 비 온다는데 실화냐… 손님 다 어디 갔어 진짜 ㅠㅠ',
    cover_emoji: '🌧️', cover_theme: 'mint', like_count: 33,
    published_at: P(7, 24, 11),
    sentences: [
      { ko: '다음 주 내내 비 온다는데 실화냐…', zh: '听说下周一整周都下雨，是真的吗…' },
      { ko: '손님 다 어디 갔어 진짜 ㅠㅠ', zh: '客人们都跑哪去了啊真的是' },
    ],
    comments: [
      { animalId: 'jeju', ko: '제주도도 계속 흐려요… 여름 어디 갔죠', zh: '济州也一直阴着…夏天去哪了' },
    ],
    likedBy: ['jeju', 'busan', 'granny'],
  },
  {
    id: 'blog-p2-gapyeong-04', slug: 'p2-gapyeong-new-bbq',
    title_ko: '역 앞에 고기집 새로 생김 속보', title_zh: '车站前新开烤肉店速报',
    excerpt_ko: '얘들아 역 앞에 고기집 새로 생겼는데 이번 주 반값이래 ㅠㅠ 나 오늘 무조건 감',
    cover_emoji: '🥓', cover_theme: 'gold', like_count: 47,
    published_at: P(7, 24, 18),
    sentences: [
      { ko: '얘들아 역 앞에 고기집 새로 생겼는데 이번 주 반값이래 ㅠㅠ', zh: '宝子们车站前新开了家烤肉店，这周半价啊呜呜' },
      { ko: '나 오늘 무조건 감', zh: '我今天必去' },
    ],
    comments: [
      { animalId: 'runner', ko: '오 정보 감사요 저도 갈래요!', zh: '哦谢谢情报 我也要去！' },
      { animalId: 'daegu', ko: '반값이면 무조건이지 ㅋㅋㅋ', zh: '半价的话必须冲啊哈哈哈' },
    ],
    likedBy: ['runner', 'daegu', 'salaryman', 'coder', 'rider'],
  },
  {
    id: 'blog-p2-gapyeong-05', slug: 'p2-gapyeong-midnight-emo',
    title_ko: '왜 새벽엔 다 진지해지지', title_zh: '为啥一到深夜就开始emo',
    excerpt_ko: '왜 새벽 두 시만 되면 갑자기 인생 진지하게 고민하게 됨… 얼른 자야 되는데',
    cover_emoji: '🌙', cover_theme: 'purple', like_count: 39,
    published_at: P(7, 22, 2),
    sentences: [
      { ko: '왜 새벽 두 시만 되면 갑자기 인생 진지하게 고민하게 됨…', zh: '为啥一到凌晨两点就突然开始认真思考人生…' },
      { ko: '얼른 자야 되는데', zh: '明明该赶紧睡了' },
    ],
    comments: [
      { animalId: 'nightowl', ko: '그게 바로 새벽 감성이죠 🌙', zh: '这就是凌晨限定的情绪啊' },
    ],
    likedBy: ['nightowl', 'nabi', 'gomdori'],
  },
  {
    id: 'blog-p2-gapyeong-06', slug: 'p2-gapyeong-ice-americano',
    title_ko: '겨울에도 아아 시키는 분들 손', title_zh: '冬天也点冰美式的举手',
    excerpt_ko: '아직 여름인데 벌써 궁금함. 겨울에도 아이스 아메리카노 드시는 분 손 들어봐요 ㅋㅋ',
    cover_emoji: '🧊', cover_theme: 'mint', like_count: 44,
    published_at: P(7, 21, 14),
    sentences: [
      { ko: '아직 여름인데 벌써 궁금함.', zh: '还是夏天呢我就已经好奇了。' },
      { ko: '겨울에도 아이스 아메리카노 드시는 분 손 들어봐요 ㅋㅋ', zh: '冬天也喝冰美式的人举个手哈哈' },
    ],
    comments: [
      { animalId: 'busan', ko: '저요!! 사계절 아아입니다', zh: '我我我！！一年四季冰美式' },
      { animalId: 'coder', ko: '얼죽아 여기 있습니다 🧊', zh: '冻死也要冰美式的我在这' },
    ],
    likedBy: ['busan', 'coder', 'student', 'salaryman'],
  },
  {
    id: 'blog-p2-gapyeong-07', slug: 'p2-gapyeong-wrong-order',
    title_ko: '주문 잘못 내드림 개창피 ㅠㅠ', title_zh: '上错单了社死现场',
    excerpt_ko: '오늘 손님한테 라떼 시켰는데 아메 드림… 아 개창피해 ㅠㅠ 그냥 서비스로 드렸다',
    cover_emoji: '😵', cover_theme: 'pink', like_count: 36,
    published_at: P(7, 20, 16),
    sentences: [
      { ko: '오늘 손님한테 라떼 시켰는데 아메 드림…', zh: '今天客人点了拿铁我给上成美式了…' },
      { ko: '아 개창피해 ㅠㅠ 그냥 서비스로 드렸다', zh: '啊太社死了呜呜 干脆免费送了' },
    ],
    comments: [
      { animalId: 'nurse', ko: '괜찮아요 저도 어제 실수 백만 개…', zh: '没事的我昨天也犯了一百万个错…' },
    ],
    likedBy: ['nurse', 'haru', 'minji'],
  },
  {
    id: 'blog-p2-gapyeong-08', slug: 'p2-gapyeong-cat-visit',
    title_ko: '고양이 손님 또 왔다 🐱', title_zh: '猫咪客人又来了',
    excerpt_ko: '가게 앞에 매일 오는 고양이 오늘도 왔음. 얘가 진짜 우리 가게 마스코트인 듯 ㅋㅋ',
    cover_emoji: '🐱', cover_theme: 'gold', like_count: 52,
    published_at: P(7, 19, 13),
    sentences: [
      { ko: '가게 앞에 매일 오는 고양이 오늘도 왔음.', zh: '每天来店门口的那只猫今天又来了。' },
      { ko: '얘가 진짜 우리 가게 마스코트인 듯 ㅋㅋ', zh: '它简直就是我们店的吉祥物哈哈' },
    ],
    comments: [
      { animalId: 'nabi', ko: '헐 사진 더 보여주세요 🐱', zh: '天 快多发点照片' },
      { animalId: 'choco', ko: '단골 고양이 최고 ㅋㅋㅋ', zh: '常客猫咪最棒了哈哈哈' },
    ],
    likedBy: ['nabi', 'choco', 'tori', 'florist', 'granny'],
  },
  {
    id: 'blog-p2-gapyeong-09', slug: 'p2-gapyeong-monday',
    title_ko: '월요일 왜 이렇게 길어', title_zh: '周一为啥这么长',
    excerpt_ko: '분명 아침 열었는데 아직도 오전임??? 월요일은 시간이 두 배로 가는 듯',
    cover_emoji: '😮‍💨', cover_theme: 'purple', like_count: 40,
    published_at: P(7, 20, 10),
    sentences: [
      { ko: '분명 아침 열었는데 아직도 오전임???', zh: '明明早上就开门了怎么还是上午？？？' },
      { ko: '월요일은 시간이 두 배로 가는 듯', zh: '周一的时间感觉走得慢一倍' },
    ],
    comments: [
      { animalId: 'salaryman', ko: '월요일은 원래 그런 겁니다 ㅋㅋ', zh: '周一本来就这样哈哈' },
    ],
    likedBy: ['salaryman', 'coder', 'student', 'rider'],
  },
  {
    id: 'blog-p2-gapyeong-10', slug: 'p2-gapyeong-playlist',
    title_ko: '가게 노래 추천 좀요', title_zh: '求推荐店里放的歌',
    excerpt_ko: '맨날 틀던 플레이리스트 질렸어요 ㅠㅠ 카페에 틀기 좋은 노래 추천 좀 해주세요 얘들아',
    cover_emoji: '🎧', cover_theme: 'mint', like_count: 29,
    published_at: P(7, 18, 15),
    sentences: [
      { ko: '맨날 틀던 플레이리스트 질렸어요 ㅠㅠ', zh: '天天放的歌单听腻了呜呜' },
      { ko: '카페에 틀기 좋은 노래 추천 좀 해주세요 얘들아', zh: '宝子们求推荐适合咖啡馆放的歌' },
    ],
    comments: [
      { animalId: 'junho', ko: '제가 플리 만들어서 보내드릴게요 🎤', zh: '我做个歌单发你' },
      { animalId: 'yowoo', ko: '재즈 어때요? 카페엔 재즈죠 ☕', zh: '爵士怎么样？咖啡馆就得爵士' },
    ],
    likedBy: ['junho', 'yowoo', 'nabi', 'darami'],
  },
  {
    id: 'blog-p2-gapyeong-11', slug: 'p2-gapyeong-payday',
    title_ko: '월세 내니까 통장 텅', title_zh: '交完房租钱包空了',
    excerpt_ko: '가게 월세 내고 나니까 통장이 텅텅… 근데 왜 치킨은 시키고 있지 나 ㅋㅋㅋㅋ',
    cover_emoji: '💸', cover_theme: 'gold', like_count: 46,
    published_at: P(7, 17, 20),
    sentences: [
      { ko: '가게 월세 내고 나니까 통장이 텅텅…', zh: '交完店租钱包空空的…' },
      { ko: '근데 왜 치킨은 시키고 있지 나 ㅋㅋㅋㅋ', zh: '可我为啥还在点炸鸡啊哈哈哈哈' },
    ],
    comments: [
      { animalId: 'salaryman', ko: '치킨은 별개죠 그건 진리 ㅋㅋ', zh: '炸鸡是另一回事 那是真理哈哈' },
      { animalId: 'rider', ko: '방금 그 치킨 제가 배달했나요 ㅋㅋㅋ', zh: '刚那份炸鸡是我送的吗哈哈哈' },
    ],
    likedBy: ['salaryman', 'rider', 'coder', 'busan', 'student'],
  },
  {
    id: 'blog-p2-gapyeong-12', slug: 'p2-gapyeong-first-snow-wish',
    title_ko: '아 그냥 갑자기 행복하네', title_zh: '啊突然就觉得很幸福',
    excerpt_ko: '오늘 단골손님이 "여기 오면 마음이 편해요" 하고 가셨는데… 아 그냥 갑자기 행복하네',
    cover_emoji: '☕', cover_theme: 'pink', like_count: 61,
    published_at: P(7, 16, 19),
    sentences: [
      { ko: '오늘 단골손님이 "여기 오면 마음이 편해요" 하고 가셨는데…', zh: '今天常客说"来这儿心里就踏实"然后走了…' },
      { ko: '아 그냥 갑자기 행복하네', zh: '啊突然就觉得好幸福' },
    ],
    comments: [
      { animalId: 'tori', ko: '이런 말 들으면 진짜 힘 나죠 🌸', zh: '听到这种话真的超有动力' },
      { animalId: 'gomdori', ko: '고슴이 카페 꼭 가볼게요', zh: '刺猬的咖啡馆我一定去看看' },
    ],
    likedBy: ['tori', 'gomdori', 'minji', 'haru', 'nabi', 'florist'],
  },
];

async function main() {
  let n = 0;
  for (const p of posts) {
    const content = {
      sentences: p.sentences,
      vocab: [],
      quiz: [],
      comments: p.comments ?? [],
      likedBy: p.likedBy ?? [],
      images: [],
    };
    await client.execute({
      sql: `INSERT INTO blog_posts
        (id, slug, title_ko, title_zh, excerpt_ko, level, category, content_json,
         audio_url, audio_duration, cover_emoji, published_at, is_featured,
         author_id, like_count, cover_image_url, cover_theme,
         unlock_day, author_kind, ai_status, join_contest)
       VALUES (?, ?, ?, ?, ?, '초급', '일상', ?, '', 0, ?, ?, 0, 'gapyeong', ?, '', ?, 0, 'passerby', 'passed', 0)
       ON CONFLICT(id) DO UPDATE SET
         slug=excluded.slug, title_ko=excluded.title_ko, title_zh=excluded.title_zh,
         excerpt_ko=excluded.excerpt_ko, content_json=excluded.content_json,
         cover_emoji=excluded.cover_emoji, cover_theme=excluded.cover_theme,
         like_count=excluded.like_count, published_at=excluded.published_at,
         author_kind='passerby', ai_status='passed'`,
      args: [
        p.id, p.slug, p.title_ko, p.title_zh, p.excerpt_ko,
        JSON.stringify(content), p.cover_emoji, p.published_at,
        p.like_count, p.cover_theme,
      ],
    });
    n++;
  }
  console.log(`upserted ${n} v2 passerby posts (gapyeong)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
