import type { BlogAuthor } from '@/types';
import { BLOG_PASSERSBY_BY_ID } from './blogPassersby';

// 兔莉的博客 · 动物伙伴卡司（列表/详情/评论共用的唯一来源）
// 强制关注：tori(主角镜像) + news(动物城新闻官方号)。其余是兔莉的朋友/邻居/NPC，按剧情登场日进场。
// 电台打通：darami=松鼠早安号 / news=늑대 동물 도시 뉴스 / gomdori=熊夜晚故事 / yowoo=狐狸思索咖啡。
export const BLOG_CAST: BlogAuthor[] = [
  // ── 核心角色 ──
  { id: 'tori',   emoji: '🐰', name: '토리',     handle: '@tori.seoul',  badge: '🌸', theme: 'pink',   bio: '서울에서 유학 중인 토끼. 매일 한국어 일기를 써요.', bioZh: '在首尔留学的兔子，每天写韩语日记。', imageUrl: '/images/blog-avatars/npc/tori.png' },
  { id: 'news',   emoji: '📰', name: '동물시 뉴스', handle: '@dongmul.news', badge: '📡', theme: 'gold',   bio: '동물 도시의 소식을 전하는 공식 뉴스 채널.', bioZh: '动物城的官方新闻频道，播报城里大小事。', imageUrl: '/images/blog-avatars/npc/news.png' },
  // ── 剧情登场好友 ──
  { id: 'minji',  emoji: '🦦', name: '민지',     handle: '@minji.otter', badge: '💧', theme: 'mint',   bio: '토리의 첫 서울 친구. 다정한 수달.', bioZh: '兔莉在首尔的第一个朋友，温柔的水獭。', imageUrl: '/images/blog-avatars/npc/minji.png' },
  { id: 'haru',   emoji: '🐹', name: '하루',     handle: '@haru.hamster',badge: '🌰', theme: 'gold',   bio: '하루 카페 사장 햄스터. 라떼가 자신 있어요.', bioZh: '哈鲁咖啡店的仓鼠老板，拿手拿铁。', imageUrl: '/images/blog-avatars/npc/haru.png' },
  { id: 'junho',  emoji: '🐯', name: '준호',     handle: '@junho.tiger', badge: '🎤', theme: 'pink',   bio: '노래하는 호랑이. 홍대에서 버스킹해요.', bioZh: '会唱歌的老虎，在弘大街头卖唱。', imageUrl: '/images/blog-avatars/npc/junho.png' },
  // ── 电台主持人（与动물城电台同源）──
  { id: 'darami', emoji: '🐿️', name: '다람쥐',   handle: '@darami.radio',badge: '🌅', theme: 'gold',   bio: '아침을 여는 다람쥐. 동물 도시 라디오 진행자.', bioZh: '唤醒清晨的松鼠，动物城电台主播。', imageUrl: '/images/blog-avatars/npc/darami.png' },
  { id: 'gomdori',emoji: '🐻', name: '곰돌이',   handle: '@gomdori',     badge: '📖', theme: 'gold',   bio: '밤마다 이야기를 들려주는 곰. 목소리가 포근해요.', bioZh: '每晚讲故事的熊，声音很温暖。', imageUrl: '/images/blog-avatars/npc/gomdori.png' },
  { id: 'yowoo',  emoji: '🦊', name: '여우',     handle: '@yowoo.cafe',  badge: '☕', theme: 'purple', bio: '사색하는 여우. 카페에서 깊은 이야기를 나눠요.', bioZh: '爱思考的狐狸，在咖啡馆聊深度话题。', imageUrl: '/images/blog-avatars/npc/yowoo.png' },
  // ── 常驻邻居/NPC ──
  { id: 'nabi',   emoji: '🐱', name: '나비',     handle: '@nabi.diary',  badge: '✨', theme: 'purple', bio: '느긋한 고양이. 골목을 산책하는 게 취미.', bioZh: '悠闲的猫咪，爱在巷子里散步。', imageUrl: '/images/blog-avatars/npc/nabi.png' },
  { id: 'choco',  emoji: '🐶', name: '초코',     handle: '@choco',       badge: '🍫', theme: 'mint',   bio: '에너지 넘치는 강아지. 한강 러닝 메이트.', bioZh: '活力满满的小狗，汉江跑步搭子。', imageUrl: '/images/blog-avatars/npc/choco.png' },
  { id: 'koal',   emoji: '🐨', name: '코알',     handle: '@koala',       badge: '🌿', theme: 'mint',   bio: '잠이 많은 코알라. 느리지만 다정해요.', bioZh: '爱睡觉的考拉，慢吞吞但很贴心。', imageUrl: '/images/blog-avatars/npc/koal.png' },
];

export const BLOG_CAST_BY_ID: Record<string, BlogAuthor> = Object.fromEntries(
  BLOG_CAST.map((a) => [a.id, a]),
);

// getBlogAuthor 还需能查到「首尔市民」路人（帖子作者名/头像渲染用），但路人不进主角侧栏/推荐关注。
export function getBlogAuthor(id: string): BlogAuthor {
  return BLOG_CAST_BY_ID[id] ?? BLOG_PASSERSBY_BY_ID[id] ?? BLOG_CAST[0];
}
