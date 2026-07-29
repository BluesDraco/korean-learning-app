import { createClient } from '@libsql/client';
import path from 'path';

// 路人贴 v2 · 批次1（펭펭 busan + 너굴개발 coder）—— 多角色风格校准
// 真社媒碎碎念：吐槽/情绪/求证/唠嗑，纯短帖(无 vocab/quiz)，网络语气，长短不一。
// author_kind='passerby', unlock_day=0, ai_status='passed', category='일상', level='초급'。
// 评论者 ∈ 卡司/其他路人，≠本帖 author。

const url = process.env.TURSO_DATABASE_URL;
const client = createClient({
  url: url || `file:${path.join(process.cwd(), 'data', 'app.db')}`,
  ...(url ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
});
const P = (mon, day, hour) => Date.UTC(2026, mon - 1, day, hour - 9, 0, 0);

const posts = [
  // ═══════ 펭펭 🐧 · 釜山企鹅 · 海边长大、爱冲浪爱吃、大嗓门 ═══════
  {
    id: 'blog-p2-busan-01', slug: 'p2-busan-sea',
    title_ko: '바다 안 보이면 답답해 죽음', title_zh: '看不到海就憋得慌',
    excerpt_ko: '서울 놀러 왔는데 바다가 없어 진짜… 부산 펭귄은 바다 안 보이면 답답해 죽음 ㅋㅋ',
    cover_emoji: '🌊', cover_theme: 'mint', like_count: 43, published_at: P(7, 24, 12),
    sentences: [
      { ko: '서울 놀러 왔는데 바다가 없어 진짜…', zh: '来首尔玩结果没有海真的是…' },
      { ko: '부산 펭귄은 바다 안 보이면 답답해 죽음 ㅋㅋ', zh: '釜山企鹅看不到海就憋得慌哈哈' },
    ],
    comments: [{ animalId: 'jeju', ko: '제주도 오세요 바다 천지예요 🌊', zh: '来济州吧 到处都是海' }],
    likedBy: ['jeju', 'runner', 'gapyeong'],
  },
  {
    id: 'blog-p2-busan-02', slug: 'p2-busan-milmyeon',
    title_ko: '서울 밀면은 왜 이래', title_zh: '首尔的小麦冷面为啥这样',
    excerpt_ko: '서울에서 밀면 시켰는데 이게 밀면이라고?? 부산 가고 싶다 진심 ㅠㅠ',
    cover_emoji: '🍜', cover_theme: 'gold', like_count: 38, published_at: P(7, 23, 13),
    sentences: [
      { ko: '서울에서 밀면 시켰는데 이게 밀면이라고??', zh: '在首尔点了小麦冷面，这也叫小麦冷面？？' },
      { ko: '부산 가고 싶다 진심 ㅠㅠ', zh: '真心想回釜山啊呜呜' },
    ],
    comments: [
      { animalId: 'daegu', ko: '지역 음식은 현지가 진리죠 ㅋㅋ', zh: '地方美食还得是本地的哈哈' },
      { animalId: 'granny', ko: '집밥이 그리운 게지 ~', zh: '是想家里的饭了吧～' },
    ],
    likedBy: ['daegu', 'granny', 'salaryman', 'gapyeong'],
  },
  {
    id: 'blog-p2-busan-03', slug: 'p2-busan-loud',
    title_ko: '목소리 크다고 또 혼남 ㅋㅋ', title_zh: '又因为嗓门大被说了哈哈',
    excerpt_ko: '카페에서 친구랑 얘기했는데 목소리 크다고 눈치 줌… 나 부산 사람인데 어쩌라고 ㅋㅋㅋ',
    cover_emoji: '📢', cover_theme: 'pink', like_count: 47, published_at: P(7, 22, 16),
    sentences: [
      { ko: '카페에서 친구랑 얘기했는데 목소리 크다고 눈치 줌…', zh: '在咖啡馆跟朋友聊天，因为嗓门大被人瞪…' },
      { ko: '나 부산 사람인데 어쩌라고 ㅋㅋㅋ', zh: '我釜山人啊你让我咋办哈哈哈' },
    ],
    comments: [{ animalId: 'busan', ko: '', zh: '' }].filter((c) => c.ko), // (self placeholder removed)
    likedBy: ['runner', 'coder', 'student'],
  },
  {
    id: 'blog-p2-busan-04', slug: 'p2-busan-surf',
    title_ko: '주말에 서핑 갈 사람', title_zh: '周末有人一起冲浪吗',
    excerpt_ko: '이번 주말에 서핑 가려는데 같이 갈 사람 없나요 얘들아 초보도 환영 🏄',
    cover_emoji: '🏄', cover_theme: 'mint', like_count: 34, published_at: P(7, 21, 18),
    sentences: [
      { ko: '이번 주말에 서핑 가려는데 같이 갈 사람 없나요 얘들아', zh: '这周末想去冲浪，宝子们有没有人一起' },
      { ko: '초보도 환영 🏄', zh: '新手也欢迎' },
    ],
    comments: [
      { animalId: 'runner', ko: '오 저 관심 있어요! 어디로 가요?', zh: '哦我有兴趣！去哪儿啊' },
      { animalId: 'rider', ko: '주말 근무라 ㅠㅠ 다음에 꼭', zh: '周末要上班呜呜 下次一定' },
    ],
    likedBy: ['runner', 'rider', 'jeju', 'coder'],
  },
  {
    id: 'blog-p2-busan-05', slug: 'p2-busan-hot',
    title_ko: '서울 여름 왜 이렇게 더워', title_zh: '首尔的夏天怎么这么热',
    excerpt_ko: '바닷바람도 없고 그냥 찜통임… 서울 여름 이거 실화냐 진짜 ㅠㅠ',
    cover_emoji: '🥵', cover_theme: 'gold', like_count: 41, published_at: P(7, 20, 14),
    sentences: [
      { ko: '바닷바람도 없고 그냥 찜통임…', zh: '没有海风就是个大蒸笼…' },
      { ko: '서울 여름 이거 실화냐 진짜 ㅠㅠ', zh: '首尔的夏天这是真的吗呜呜' },
    ],
    comments: [{ animalId: 'salaryman', ko: '에어컨 없이 못 살죠 요즘 ㅋㅋ', zh: '最近没空调真活不了哈哈' }],
    likedBy: ['salaryman', 'gapyeong', 'nurse'],
  },
  {
    id: 'blog-p2-busan-06', slug: 'p2-busan-homesick',
    title_ko: '갑자기 엄마 보고 싶다', title_zh: '突然好想妈妈',
    excerpt_ko: '혼자 밥 먹다가 갑자기 엄마 생각남. 부산 내려가고 싶다 그냥… ㅠㅠ',
    cover_emoji: '🥲', cover_theme: 'purple', like_count: 52, published_at: P(7, 18, 21),
    sentences: [
      { ko: '혼자 밥 먹다가 갑자기 엄마 생각남.', zh: '一个人吃饭突然想起妈妈。' },
      { ko: '부산 내려가고 싶다 그냥… ㅠㅠ', zh: '就是好想回釜山啊…呜呜' },
    ],
    comments: [
      { animalId: 'granny', ko: '전화 한 통 드려 ~ 좋아하실 거야', zh: '打个电话吧～她会很开心的' },
      { animalId: 'newmom', ko: '엄마 생각나는 날 있죠 ㅠㅠ', zh: '总有想妈妈的日子呢呜呜' },
    ],
    likedBy: ['granny', 'newmom', 'gapyeong', 'nabi', 'haru'],
  },

  // ═══════ 너굴개발 🦝 · 板桥程序员浣熊 · 加班/bug/咖啡因续命/自嘲 ═══════
  {
    id: 'blog-p2-coder-01', slug: 'p2-coder-friday-deploy',
    title_ko: '금요일 저녁 배포는 누가 시킴', title_zh: '谁让周五晚上上线的',
    excerpt_ko: '금요일 저녁에 배포하자는 사람 진짜… 주말에 서버 터지면 누가 책임짐 ㅋㅋㅋ 퇴근 못 함',
    cover_emoji: '💻', cover_theme: 'purple', like_count: 49, published_at: P(7, 24, 19),
    sentences: [
      { ko: '금요일 저녁에 배포하자는 사람 진짜…', zh: '提议周五晚上上线的那个人真的是…' },
      { ko: '주말에 서버 터지면 누가 책임짐 ㅋㅋㅋ 퇴근 못 함', zh: '周末服务器炸了谁负责啊哈哈哈 下不了班' },
    ],
    comments: [{ animalId: 'salaryman', ko: '금요일 배포 국룰 위반이죠 ㅋㅋ', zh: '周五上线属于违反常识哈哈' }],
    likedBy: ['salaryman', 'founder', 'gapyeong'],
  },
  {
    id: 'blog-p2-coder-02', slug: 'p2-coder-bug',
    title_ko: '어제까지 됐는데 왜 안 됨', title_zh: '昨天还好好的今天咋就不行了',
    excerpt_ko: '분명 어제까지 잘 됐는데 오늘 갑자기 에러남. 코드는 안 건드렸는데 왜… 컴퓨터가 미쳤나 봄',
    cover_emoji: '🐛', cover_theme: 'gold', like_count: 55, published_at: P(7, 23, 22),
    sentences: [
      { ko: '분명 어제까지 잘 됐는데 오늘 갑자기 에러남.', zh: '明明昨天还好好的今天突然报错。' },
      { ko: '코드는 안 건드렸는데 왜… 컴퓨터가 미쳤나 봄', zh: '代码我又没动为啥…电脑是不是疯了' },
    ],
    comments: [
      { animalId: 'coder', ko: '', zh: '' },
      { animalId: 'nightowl', ko: '그거 원래 안 건드렸다고 하죠 ㅋㅋㅋ', zh: '大家都说自己没动过哈哈哈' },
    ].filter((c) => c.ko),
    likedBy: ['nightowl', 'founder', 'student', 'salaryman'],
  },
  {
    id: 'blog-p2-coder-03', slug: 'p2-coder-coffee',
    title_ko: '오늘 커피 6잔째', title_zh: '今天第6杯咖啡了',
    excerpt_ko: '오늘 커피 여섯 잔째인데 아직도 졸림. 이쯤 되면 커피가 물인 듯 ㅋㅋㅋ',
    cover_emoji: '☕', cover_theme: 'gold', like_count: 40, published_at: P(7, 22, 15),
    sentences: [
      { ko: '오늘 커피 여섯 잔째인데 아직도 졸림.', zh: '今天喝到第6杯咖啡了还是困。' },
      { ko: '이쯤 되면 커피가 물인 듯 ㅋㅋㅋ', zh: '到这份上咖啡跟水没区别了哈哈哈' },
    ],
    comments: [{ animalId: 'gapyeong', ko: '우리 카페 오세요 일곱 잔째 서비스 ☕', zh: '来我们咖啡馆吧 第7杯免费' }],
    likedBy: ['gapyeong', 'nurse', 'busan'],
  },
  {
    id: 'blog-p2-coder-04', slug: 'p2-coder-meeting',
    title_ko: '이 회의 메일로 됐잖아', title_zh: '这会开成邮件不就完了',
    excerpt_ko: '한 시간짜리 회의였는데 결론은 "다음에 다시 얘기하자"임. 이거 그냥 메일로 됐잖아 진짜 ㅋㅋ',
    cover_emoji: '😑', cover_theme: 'purple', like_count: 46, published_at: P(7, 21, 17),
    sentences: [
      { ko: '한 시간짜리 회의였는데 결론은 "다음에 다시 얘기하자"임.', zh: '开了一小时的会，结论是"下次再聊"。' },
      { ko: '이거 그냥 메일로 됐잖아 진짜 ㅋㅋ', zh: '这不发封邮件就完事了哈哈' },
    ],
    comments: [{ animalId: 'founder', ko: '회의 문화 저도 반성합니다 ㅠㅠ', zh: '开会文化这点我也反省呜呜' }],
    likedBy: ['founder', 'salaryman', 'actor'],
  },
  {
    id: 'blog-p2-coder-05', slug: 'p2-coder-weekend-plan',
    title_ko: '주말엔 진짜 아무것도 안 할 거임', title_zh: '这周末真的啥都不干',
    excerpt_ko: '이번 주말엔 침대랑 한 몸 될 거임. 아무도 나 찾지 마세요 ㅋㅋㅋ 폰도 꺼둘 거야',
    cover_emoji: '🛏️', cover_theme: 'mint', like_count: 44, published_at: P(7, 19, 20),
    sentences: [
      { ko: '이번 주말엔 침대랑 한 몸 될 거임.', zh: '这周末我要和床合为一体。' },
      { ko: '아무도 나 찾지 마세요 ㅋㅋㅋ 폰도 꺼둘 거야', zh: '谁都别找我哈哈哈 手机也要关机' },
    ],
    comments: [
      { animalId: 'student', ko: '저도 데려가 주세요 침대로…', zh: '也把我一起带去床上吧…' },
      { animalId: 'nightowl', ko: '주말 계획 완벽 ㅋㅋ', zh: '周末计划完美哈哈' },
    ],
    likedBy: ['student', 'nightowl', 'rider', 'salaryman'],
  },
  {
    id: 'blog-p2-coder-06', slug: 'p2-coder-it-works',
    title_ko: '갑자기 됨 왜 되는지 모름', title_zh: '突然又好了 不知道为啥',
    excerpt_ko: '아까 그 에러 갑자기 해결됨. 근데 왜 되는지 모르겠어서 더 무서움 ㅋㅋㅋㅋ',
    cover_emoji: '🎉', cover_theme: 'gold', like_count: 51, published_at: P(7, 17, 23),
    sentences: [
      { ko: '아까 그 에러 갑자기 해결됨.', zh: '刚才那个报错突然就好了。' },
      { ko: '근데 왜 되는지 모르겠어서 더 무서움 ㅋㅋㅋㅋ', zh: '但不知道为啥好的反而更怕了哈哈哈哈' },
    ],
    comments: [{ animalId: 'founder', ko: '되면 건드리지 마세요 ㅋㅋㅋ', zh: '能跑就别动它哈哈哈' }],
    likedBy: ['founder', 'nightowl', 'coder', 'gapyeong', 'student'],
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
  console.log(`upserted ${n} v2 passerby posts (batch1: busan + coder)`);
}
main().catch((e) => { console.error(e); process.exit(1); });
