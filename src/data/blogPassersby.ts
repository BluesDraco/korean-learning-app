import type { BlogAuthor } from '@/types';

// 兔莉的动物城 · 首尔市民路人卡司
// 定位：住在首尔、也在用这个 App 学韩语/写日记的其他动物居民。
// 与兔莉主线【无剧情交集】——他们只是同一个广场上的陌生邻居，让 feed 有公共社区感。
// 与 BLOG_CAST 的区别：
//   - 不进「토리와 친구들」侧栏、不进「추천 친구」推荐关注、不可被 follow。
//   - 帖子 author_kind = 'passerby'，不受日记 Day 门控（unlock_day=0，始终可见）。
//   - 全部无封面图（走 feed 默认无图）。
// 但 getBlogAuthor 必须能查到他们，否则帖子作者名/头像 emoji 渲染不出。
export const BLOG_PASSERSBY: BlogAuthor[] = [
  { id: 'gapyeong',  emoji: '🦔', name: '고슴이',   handle: '@gapyeong.hedgehog', badge: '☕', theme: 'gold'   },
  { id: 'busan',     emoji: '🐧', name: '펭펭',     handle: '@busan.penguin',     badge: '🌊', theme: 'mint'   },
  { id: 'nightowl',  emoji: '🦉', name: '부엉',     handle: '@night.owl',         badge: '🌙', theme: 'purple' },
  { id: 'slow',      emoji: '🐢', name: '느림',     handle: '@slow.turtle',       badge: '🌱', theme: 'mint'   },
  { id: 'seolgi',    emoji: '🐰', name: '설기',     handle: '@hongdae.bunny',     badge: '🎨', theme: 'pink'   },
  { id: 'daegu',     emoji: '🦊', name: '단풍',     handle: '@daegu.fox',         badge: '🍁', theme: 'gold'   },
  { id: 'jeju',      emoji: '🐴', name: '조랑',     handle: '@jeju.pony',         badge: '🌴', theme: 'mint'   },
  { id: 'granny',    emoji: '🐐', name: '염소 할매', handle: '@market.goat',       badge: '🧺', theme: 'gold'   },
  { id: 'salaryman', emoji: '🐹', name: '햄직장',   handle: '@gangnam.hamster',   badge: '💼', theme: 'purple' },
  { id: 'student',   emoji: '🐥', name: '삐약',     handle: '@sillim.chick',      badge: '📚', theme: 'gold'   },
  { id: 'runner',    emoji: '🐕', name: '달리',     handle: '@hangang.dog',       badge: '🏃', theme: 'mint'   },
  { id: 'florist',   emoji: '🐻‍❄️', name: '눈송',   handle: '@yangjae.bear',      badge: '🌷', theme: 'pink'   },
  // ── 확장: 직업/신분 + 특수 생활 상태 ──
  { id: 'taxi',      emoji: '🦡', name: '오소리 기사', handle: '@seoul.taxi',        badge: '🚕', theme: 'gold'   },
  { id: 'firefighter', emoji: '🦁', name: '불꽃',    handle: '@119.lion',          badge: '🚒', theme: 'pink'   },
  { id: 'coder',     emoji: '🦝', name: '너굴개발',  handle: '@pangyo.raccoon',    badge: '💻', theme: 'purple' },
  { id: 'nurse',     emoji: '🦌', name: '사슴 간호사', handle: '@night.nurse',       badge: '🩺', theme: 'mint'   },
  { id: 'rider',     emoji: '🐆', name: '치타 라이더', handle: '@baemin.cheetah',    badge: '🛵', theme: 'gold'   },
  { id: 'actor',     emoji: '🦚', name: '공작',      handle: '@daehangno.peacock', badge: '🎭', theme: 'purple' },
  { id: 'baker',     emoji: '🦫', name: '반죽',      handle: '@dawn.beaver',       badge: '🥐', theme: 'gold'   },
  { id: 'newmom',    emoji: '🐑', name: '양떼맘',    handle: '@mapo.sheep',        badge: '🍼', theme: 'pink'   },
  { id: 'founder',   emoji: '🐘', name: '코끼리 대표', handle: '@startup.elephant',  badge: '🚀', theme: 'purple' },
  { id: 'retiree',   emoji: '🐼', name: '판다 어르신', handle: '@bukhan.panda',      badge: '🍵', theme: 'mint'   },
  { id: 'cook1',     emoji: '🐓', name: '꼬꼬',      handle: '@jachwi.rooster',    badge: '🍳', theme: 'gold'   },
  { id: 'carpenter', emoji: '🦬', name: '들소',      handle: '@euljiro.bison',     badge: '🔨', theme: 'mint'   },
];

export const BLOG_PASSERSBY_BY_ID: Record<string, BlogAuthor> = Object.fromEntries(
  BLOG_PASSERSBY.map((a) => [a.id, a]),
);
