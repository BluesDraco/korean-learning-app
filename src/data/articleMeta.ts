// Article metadata — client-safe (no Node.js imports)
// Keep in sync with src/lib/koreaArticles.ts

export interface ArticleMeta {
  slug: string;
  category: 'culture' | 'food' | 'travel';
  folder: '문화' | '여행' | '음식';
  filename: string;
  title: string;
  subtitle: string;
  tag: string;
  readTime: string;
  color: string;
  bannerImage: string;
}

export const ARTICLES: ArticleMeta[] = [
  // ── 文化 (5) ──
  {
    slug: 'convenience-store', category: 'culture', folder: '문화',
    filename: '文化模块_01_韩国便利店完全指南.html',
    title: '韩国便利店完全指南', subtitle: '편의점 — 不只是一家店，是韩国人的生活方式',
    tag: '🇰🇷 韩国文化 · 生活方式', readTime: '约10分钟读完', color: '#FF8FAB',
    bannerImage: '/images/banners/convenience-store.webp',
  },
  {
    slug: 'seoul-cafe', category: 'culture', folder: '문화',
    filename: '文化模块_02_首尔咖啡文化.html',
    title: '首尔咖啡文化', subtitle: '커피 문화 — 人均每天2.3杯的咖啡之国',
    tag: '🇰🇷 韩国文化 · 生活方式', readTime: '约10分钟读完', color: '#C9B8E8',
    bannerImage: '/images/banners/seoul-cafe.webp',
  },
  {
    slug: 'greeting-culture', category: 'culture', folder: '문화',
    filename: '文化模块_03_韩国人的打招呼文化.html',
    title: '韩国人的打招呼文化', subtitle: '인사 문화 — 一个"안녕하세요"背后藏着多少学问',
    tag: '🇰🇷 韩国文化 · 礼仪', readTime: '约10分钟读完', color: '#A8D8D0',
    bannerImage: '/images/banners/greeting-culture.webp',
  },
  {
    slug: 'korean-holidays', category: 'culture', folder: '문화',
    filename: '文化模块_04_韩国节日完全手册.html',
    title: '韩国节日完全手册', subtitle: '명절과 기념일 — 从春节到Pepero Day，一年都在过节',
    tag: '🇰🇷 韩国文化 · 节日', readTime: '约10分钟读完', color: '#FF8FAB',
    bannerImage: '/images/banners/korean-holidays.webp',
  },
  {
    slug: 'kdrama-culture', category: 'culture', folder: '문화',
    filename: '文化模块_05_韩剧里的文化密码.html',
    title: '韩剧里的文化密码', subtitle: '드라마 속 문화 — 看懂这些细节，才算真正看懂韩剧',
    tag: '🇰🇷 韩国文化 · 韩剧', readTime: '约10分钟读完', color: '#C9B8E8',
    bannerImage: '/images/banners/kdrama-culture.webp',
  },

  // ── 美食 (5) ──
  {
    slug: 'kbbq-guide', category: 'food', folder: '음식',
    filename: '美食模块_01_韩国烤肉完全指南.html',
    title: '韩国烤肉完全指南', subtitle: '고기 — 从点单到吃法，一篇搞懂',
    tag: '🇰🇷 韩国美食 · 烤肉', readTime: '约10分钟读完', color: '#FF8FAB',
    bannerImage: '/images/banners/kbbq-guide.webp',
  },
  {
    slug: 'street-food', category: 'food', folder: '음식',
    filename: '美食模块_02_街头小吃地图.html',
    title: '街头小吃地图', subtitle: '길거리 음식 — 明洞、南大门、广藏市场，边走边吃',
    tag: '🇰🇷 韩国美食 · 小吃', readTime: '约10分钟读完', color: '#FFE4A0',
    bannerImage: '/images/banners/street-food.webp',
  },
  {
    slug: 'korean-soup', category: 'food', folder: '음식',
    filename: '美食模块_03_韩国人为什么这么爱喝汤.html',
    title: '韩国人为什么这么爱喝汤', subtitle: '국과 찌개 — 一碗汤的哲学',
    tag: '🇰🇷 韩国美食 · 汤文化', readTime: '约10分钟读完', color: '#A8D8D0',
    bannerImage: '/images/banners/korean-soup.webp',
  },
  {
    slug: 'kdrama-ordering', category: 'food', folder: '음식',
    filename: '美食模块_04_跟着韩剧学点餐.html',
    title: '跟着韩剧学点餐', subtitle: '드라마 속 주문 — 韩剧里出镜率最高的那些食物',
    tag: '🇰🇷 韩国美食 · 点餐', readTime: '约10分钟读完', color: '#FF8FAB',
    bannerImage: '/images/banners/kdrama-ordering.webp',
  },
  {
    slug: 'korean-spicy', category: 'food', folder: '음식',
    filename: '美食模块_05_韩国辣文化.html',
    title: '韩国辣文化', subtitle: '매운맛 — 韩国人对辣的执着',
    tag: '🇰🇷 韩国美食 · 辣', readTime: '约10分钟读完', color: '#FF6B6B',
    bannerImage: '/images/banners/korean-spicy.webp',
  },

  // ── 旅行 (5) ──
  {
    slug: 'seoul-districts', category: 'travel', folder: '여행',
    filename: '旅行模块_01_首尔街区性格图鉴.html',
    title: '首尔街区性格图鉴', subtitle: '서울 동네 — 每个区都有它的灵魂',
    tag: '🇰🇷 韩国旅行 · 首尔', readTime: '约10分钟读完', color: '#A8D8D0',
    bannerImage: '/images/banners/seoul-districts.webp',
  },
  {
    slug: 'seoul-subway', category: 'travel', folder: '여행',
    filename: '旅行模块_02_首尔地铁完全攻略.html',
    title: '首尔地铁完全攻略', subtitle: '지하철 — 世界上最复杂的地铁系统之一',
    tag: '🇰🇷 韩国旅行 · 交通', readTime: '约10分钟读完', color: '#C9B8E8',
    bannerImage: '/images/banners/seoul-subway.webp',
  },
  {
    slug: 'korea-taboos', category: 'travel', folder: '여행',
    filename: '旅行模块_03_去韩国之前必须知道的文化禁忌.html',
    title: '去韩国之前必须知道的文化禁忌', subtitle: '금기사항 — 这些事千万不能做',
    tag: '🇰🇷 韩国旅行 · 禁忌', readTime: '约10分钟读完', color: '#FF8FAB',
    bannerImage: '/images/banners/korea-taboos.webp',
  },
  {
    slug: 'seoul-25-places', category: 'travel', folder: '여행',
    filename: '旅行模块_04_首尔必去25个地方.html',
    title: '首尔必去25个地方', subtitle: '서울 명소 — 本地人推荐的清单',
    tag: '🇰🇷 韩国旅行 · 景点', readTime: '约10分钟读完', color: '#FFE4A0',
    bannerImage: '/images/banners/seoul-25-places.webp',
  },
  {
    slug: 'korea-shopping', category: 'travel', folder: '여행',
    filename: '旅行模块_05_韩国购物完全指南.html',
    title: '韩国购物完全指南', subtitle: '쇼핑 — 明洞、弘大、江南、免税店全攻略',
    tag: '🇰🇷 韩国旅行 · 购物', readTime: '约10分钟读完', color: '#FF8FAB',
    bannerImage: '/images/banners/korea-shopping.webp',
  },
];
