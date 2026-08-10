// 韩国小知识（자료실）— 结构化科普文章，阅览室第 3 个子入口。
// 内容形态：中文科普为主 + 穿插韩语词卡。与 reading-new.ts（逐句韩语精读）分家，schema 独立。
// 正文 blocks[] 由旧 korea-articles HTML 结构化迁移而来，ko/ro/scene/zh 逐字保留。

export type KBBlock =
  | { type: 'intro'; text: string; [k: string]: unknown }
  | { type: 'toriQuote'; label?: string; text: string; [k: string]: unknown }
  | { type: 'sectionBreak'; [k: string]: unknown }
  | { type: 'sectionTitle'; emoji: string; title: string; sub?: string; [k: string]: unknown }
  | { type: 'paragraph'; heading?: string; text: string; [k: string]: unknown }
  | { type: 'highlight'; variant: 'tip' | 'warning'; title?: string; text: string; [k: string]: unknown }
  | { type: 'cardGrid'; variant: 'brand' | 'coffee' | 'place' | 'snack' | 'generic'; cards: { emoji?: string; ko?: string; ro?: string; zh?: string; desc?: string; tip?: string; price?: string; tags?: string[]; [k: string]: unknown }[]; [k: string]: unknown }
  | { type: 'featureCard'; emoji?: string; title: string; desc?: string; scenes?: { speaker?: string; ko: string; ro?: string; zh: string; [k: string]: unknown }[]; [k: string]: unknown }
  | { type: 'table'; head: string[]; rows: string[][]; [k: string]: unknown }
  | { type: 'steps'; steps: { label: string; desc?: string; ko?: string; ro?: string; zh?: string; [k: string]: unknown }[]; [k: string]: unknown }
  | { type: 'dialog'; lines: { speaker: string; ko: string; ro?: string; zh: string; [k: string]: unknown }[]; [k: string]: unknown }
  | { type: 'timeline'; items: { emoji?: string; label: string; desc: string; [k: string]: unknown }[]; [k: string]: unknown }
  | { type: 'compareVs'; left: { title: string; items: string[]; [k: string]: unknown }; right: { title: string; items: string[]; [k: string]: unknown }; [k: string]: unknown }
  | { type: 'trivia'; items: { tag: string; q: string; a: string; [k: string]: unknown }[]; [k: string]: unknown }
  | { type: 'phraseList'; title?: string; sub?: string; items: { ko: string; ro?: string; scene?: string; zh: string; [k: string]: unknown }[]; [k: string]: unknown }
  | { type: 'vocabList'; title?: string; items: { ko: string; ro?: string; zh: string; [k: string]: unknown }[]; [k: string]: unknown }
  | { type: 'ending'; text: string; next?: { slug: string; title: string; [k: string]: unknown }; [k: string]: unknown };

export interface KnowledgeArticle {
  [k: string]: unknown;
  slug: string;
  category: 'culture' | 'food' | 'travel';
  title: string;
  subtitle: string; // 韩语见出し（破折号前）+ 说明，沿用旧 subtitle
  emoji: string;
  readMinutes: number;
  bannerImage: string;
  blocks: KBBlock[];
}

export const KNOWLEDGE_CATS = [
  { key: 'culture', zh: '文化', zhEn: 'culture', ko: '문화', emoji: '🏮' },
  { key: 'food', zh: '美食', zhEn: 'Food', ko: '음식', emoji: '🍜' },
  { key: 'travel', zh: '旅行', zhEn: 'Travel', ko: '여행', emoji: '🧳' },
] as const;

export const knowledgeArticles: KnowledgeArticle[] = [
  // ══════════════════ 文化 · 便利店（样板篇）══════════════════
  {
    slug: 'convenience-store',
    category: 'culture',
    title: '韩国便利店完全指南', titleEn: 'The Complete Guide to Korean Convenience Stores',
    subtitle: '편의점 — 不只是一家店，是韩国人的生活方式', subtitleEn: '편의점 — Not Just a Store, It\'s a Korean Lifestyle',
    emoji: '🏪',
    readMinutes: 10,
    bannerImage: '/images/banners/convenience-store.webp',
    blocks: [
      {
        type: 'intro',
        text: '토리上周去首尔，一共去了23次便利店。不是夸张——韩国的便利店真的是另一个世界。你以为便利店只是买个水、买包薯片的地方？在韩国，它是早餐店、咖啡馆、热食餐厅、ATM机、快递站、自习室……有时候还是朋友聚会的地方。今天토리把所有踩过的坑、发现的宝藏，全部整理给你。', textEn: '토리 went to Seoul last week and visited convenience stores 23 times. That\'s not an exaggeration—Korean convenience stores are truly a whole other world. You think a convenience store is just a place to grab water or a bag of chips? In Korea, it\'s a breakfast spot, a café, a hot food restaurant, an ATM, a parcel pickup point, a study room... and sometimes even a place to hang out with friends. Today, 토리 has organized all the pitfalls and hidden gems discovered along the way, just for you.',
      },
      {
        type: 'toriQuote',
        label: '🐰 토리 说', labelEn: '🐰 Tori says',
        text: '韩国便利店不是"便利"的商店，是"必要"的商店。去了就知道，没有它你活不了一周。', textEn: 'Korean convenience stores aren\'t just "convenient"—they\'re "essential." Go once and you\'ll see: you can\'t survive a week without them.',
      },
      { type: 'sectionBreak'},
      {
        type: 'sectionTitle',
        emoji: '🏪',
        title: '三大便利店，性格各不同', titleEn: 'The Big Three convenience stores, each with its own personality',
        sub: 'GS25 · CU · 7-Eleven — 不是随便进哪个都一样的', subEn: 'GS25 · CU · 7-Eleven — not all are created equal',
      },
      {
        type: 'cardGrid',
        variant: 'brand',
        cards: [
          {
            ko: 'GS25',
            zh: 'GS二十五', zhEn: 'GS25',
            tags: ['最多 · 最潮'],
            desc: '韩国便利店数量最多的品牌之一。自有品牌产品最丰富，联名款最多，经常和韩国本土IP推出限定商品。想找最新网红零食，来这里。', descEn: 'One of the biggest convenience store chains in Korea. It has the widest range of private-label products and the most collabs, frequently dropping limited items with local Korean IPs. Hunting for the latest viral snacks? This is your spot.',
            tip: '必买：유어스 자이언트 떡볶이（自有品牌炒年糕）', tipEn: 'Must-buy: Youus Giant Tteokbokki (house-brand rice cakes)',
          },
          {
            ko: 'CU',
            zh: '씨유',
            tags: ['最暖 · 最有韩国味'],
            desc: '前身是Family Mart，现在完全韩国化。自有品牌HereO系列性价比超高。热食区最扎实，关东煮选择多，冬天必来。整体风格最接地气。', descEn: 'Formerly Family Mart, now fully Korean. Its private-label HereO line is a steal. The hot food section is the most solid, with a wide oden selection—a winter must. Overall, it\'s the most down-to-earth of the bunch.',
            tip: '必买：백종원 컵밥（白钟元杯饭系列）', tipEn: 'Must-buy: Baek Jong-won Cupbap (cup rice series)',
          },
          {
            ko: '세븐일레븐',
            zh: '7-Eleven',
            tags: ['最国际 · 最稳定'],
            desc: '国际品牌，品质最稳定。在旅游区和机场最容易找到。外国游客不知道买什么的时候进7-11不会踩雷。自助结账机最普及。', descEn: 'An international brand with the most consistent quality. Easiest to find in tourist areas and airports. Foreign visitors can\'t go wrong stepping into a 7-Eleven when unsure what to grab. Self-checkout machines are the most widespread here.',
            tip: '必买：세븐셀렉트 삼각김밥（三角饭团系列）', tipEn: 'Must-buy: 7-Eleven Select Samgak Kimbap (triangular rice ball series)',
          },
        ],
      },
      {
        type: 'table',
        head: ['对比项', 'GS25', 'CU', '7-Eleven'],
        rows: [
          ['门店数量', '约18,000家', '约18,500家', '约12,000家'],
          ['特色优势', '联名款最多', '热食最好', '最稳定'],
          ['推荐人群', '喜欢尝鲜', '本地生活派', '初来乍到'],
        ],
      },
      { type: 'sectionBreak'},
      {
        type: 'sectionTitle',
        emoji: '🛒',
        title: '必买清单', titleEn: 'Must-buy list',
        sub: '这些是真的好吃，不是因为网红', subEn: 'These are genuinely delicious, not just hype',
      },
      {
        type: 'cardGrid',
        variant: 'snack',
        cards: [
          {
            emoji: '🍙',
            ko: '삼각김밥',
            zh: '三角饭团', zhEn: 'Triangle rice ball',
            desc: '韩国便利店的灵魂单品。金枪鱼沙拉、辣白菜、牛肉是经典口味。打开方式有讲究：按数字顺序拉，1→2→3，拉错了海苔会破。约1,200-1,500韩元。', descEn: 'The soul item of Korean convenience stores. Tuna salad, kimchi, and beef are the classic flavors. There\'s a trick to opening: pull in number order, 1→2→3—pull wrong and the seaweed tears. About 1,200-1,500 won.',
            tip: '包装上有韩文打开说明，打开前先找토리帮你读', tipEn: 'The packaging has Korean opening instructions—ask Tori to read them before you open it',
          },
          {
            emoji: '🍜',
            ko: '컵라면',
            zh: '杯面', zhEn: 'Cup noodles',
            desc: '韩国便利店有专门的热水机，就是为了泡杯面。신라면是经典，육개장是传统，불닭볶음면挑战你的辣度极限。约1,000-1,500韩元。', descEn: 'Korean convenience stores have dedicated hot water machines just for cup noodles. Shin Ramyun is the classic, Yukgaejang is the traditional pick, and Buldak Bokkeum Myun tests your spice limit. About 1,000-1,500 won.',
            tip: '热水机在收银台附近，自助使用', tipEn: 'The hot water machine is near the register—self-serve',
          },
          {
            emoji: '☕',
            ko: '즉석 원두커피',
            zh: '现磨咖啡机', zhEn: 'Freshly ground coffee machines',
            desc: '韩国便利店的现磨咖啡性价比超高，约1,500-2,000韩元，比咖啡厅便宜5倍。GS25的"카페25"、CU的"HEYCAFE"都是自家品牌。', descEn: 'Korean convenience store fresh coffee is an incredible deal at about 1,500-2,000 won—five times cheaper than a café. GS25\'s "Cafe25" and CU\'s "HEYCAFE" are both house brands.',
            tip: '아메리카노 和 라떼 最安全', tipEn: 'Americano and latte are the safest bets',
          },
          {
            emoji: '🍡',
            ko: '떡볶이 · 순대',
            zh: '炒年糕 · 血肠', zhEn: 'Tteokbokki · Sundae',
            desc: '热食区的关东煮摊，年糕和순대是标配。站着吃，蘸辣酱，这才是最正宗的首尔街头感。按份计费，约500-1,000韩元一根。', descEn: 'At the oden stand in the hot food section, rice cakes and sundae are the go-to. Eat standing up, dip in spicy sauce—that\'s the real Seoul street vibe. Priced per piece, about 500-1,000 won each.',
            tip: '冬天一定要吃，边走边吃', tipEn: 'A winter must—eat it on the go',
          },
          {
            emoji: '🥪',
            ko: '샌드위치',
            zh: '三明治', zhEn: 'sandwich',
            desc: '韩国便利店三明治比日本还好吃。蛋沙拉、BLT、鸡胸肉款都是经典。切成三角形装在透明盒子里，约2,000-3,000韩元。', descEn: 'Korean convenience store sandwiches are even better than Japan\'s. Egg salad, BLT, and chicken breast are the classics. Cut into triangles in clear boxes, about 2,000-3,000 won.',
            tip: '看保质期，通常当天生产', tipEn: 'Check the expiration date—usually made the same day',
          },
          {
            emoji: '🧃',
            ko: '비타500 · 박카스',
            zh: '维他命饮料', zhEn: 'Vitamin drink',
            desc: '비타500是韩国版维C饮料，박카스是韩国传说中的功能饮料。韩国年轻人考前、熬夜前必喝。约600-1,500韩元。', descEn: '비타500 is Korea\'s version of a vitamin C drink, and 박카스 is Korea\'s legendary energy drink. Young Koreans drink them before exams and all-nighters. About 600–1,500 won.',
            tip: '박카스在韩国药店也能买到', tipEn: 'You can also buy 박카스 at Korean pharmacies',
          },
        ],
      },
      { type: 'sectionBreak'},
      {
        type: 'sectionTitle',
        emoji: '🔥',
        title: '热食区怎么点', titleEn: 'How to order from the hot food section',
        sub: '从进门到拿到手，照着这个流程走', subEn: 'From walking in to getting your food, just follow this process',
      },
      {
        type: 'steps',
        steps: [
          {
            label: '找到热食区', labelEn: 'Find the hot food section',
            desc: '通常在店内靠后方或侧面，有明显的透明玻璃柜台，里面泡着各种东西。年糕、鱼饼、순대、香肠、鸡蛋都在里面。', descEn: 'Usually at the back or side of the store, with a clear glass counter where everything is simmering. Rice cakes, fish cakes, 순대, sausages, and eggs are all in there.',
          },
          {
            label: '拿夹子自己夹，或告诉店员', labelEn: 'Use the tongs to grab your own, or tell the staff',
            desc: '有些店自助，有些店需要告诉店员你想要什么。指着说就行。', descEn: 'Some stores are self-serve, others you need to tell the staff what you want. Just point and say it.',
            ko: '이거 주세요',
            zh: '这个给我', zhEn: 'I\'ll take this one',
          },
          {
            label: '拿纸杯装汤', labelEn: 'Grab a paper cup for the soup',
            desc: '旁边通常有免费的小纸杯，可以盛一杯汤底喝，这是韩国便利店的文化，不需要额外付费。', descEn: 'There are usually free small paper cups nearby so you can scoop up some broth. It\'s part of Korean convenience store culture—no extra charge.',
          },
          {
            label: '去收银台结账', labelEn: 'Go to the register to pay',
            desc: '拿着夹好的食物去收银台，店员会按根数计算价格。', descEn: 'Take your food to the register and the staff will charge you by the piece.',
            ko: '얼마예요?',
            zh: '多少钱？', zhEn: 'How much is it?',
          },
          {
            label: '找个地方站着吃', labelEn: 'Find a spot to stand and eat',
            desc: '大多数便利店门口或店内有小台子，就是给人站着吃东西的。这就是首尔街头的节奏感。', descEn: 'Most convenience stores have small counters by the entrance or inside, just for standing and eating. That\'s the rhythm of Seoul\'s streets.',
          },
        ],
      },
      { type: 'sectionBreak'},
      {
        type: 'sectionTitle',
        emoji: '🌆',
        title: '便利店不只是买东西', titleEn: 'Convenience stores are more than just for shopping',
        sub: '你可能不知道，在韩国便利店还能做这些', subEn: 'You might not know, but Korean convenience stores can do all this',
      },
      {
        type: 'cardGrid',
        variant: 'generic',
        cards: [
          {
            emoji: '📦',
            zh: '寄快递 · 取快递', zhEn: 'Send packages · Pick up packages',
            desc: '韩国便利店是最重要的快递节点。网上购物可以选"편의점 택배"送到指定便利店取货。大件行李也能从便利店寄到机场，比打车便宜。', descEn: 'Korean convenience stores are the most important delivery hubs. When shopping online, you can choose "편의점 택배" to have packages delivered to a specific store. You can also ship large luggage from a store to the airport—cheaper than a taxi.',
            tags: ['快递'],
          },
          {
            emoji: '🏧',
            zh: '取现 · 转账', zhEn: 'Withdraw cash · Transfer money',
            desc: '韩国便利店里都有ATM机，支持国际银行卡（Visa/Mastercard）。在明洞等旅游区，很多地方只收现金或韩国本地卡。手续费约3,000-5,000韩元/次。', descEn: 'Korean convenience stores all have ATMs that accept international cards (Visa/Mastercard). In tourist areas like Myeongdong, many places only take cash or local Korean cards. Fees are about 3,000–5,000 won per transaction.',
            tags: ['ATM'],
          },
          {
            emoji: '🎭',
            zh: '深夜的社交空间', zhEn: 'A late-night social space',
            desc: '在韩国，深夜的便利店是一种特殊的社交空间。喝着啤酒、吃着炸鸡，坐在便利店门口的塑料椅上聊天——这是韩国年轻人最常见的夜晚形态。你在韩剧里看到的"편의점 데이트"（便利店约会），不是艺术化处理，是真实生活。', descEn: 'In Korea, late-night convenience stores are a special social space. Drinking beer, eating fried chicken, and chatting on the plastic chairs outside the store—this is the most common night scene for young Koreans. The "편의점 데이트" (convenience store date) you see in K-dramas isn\'t dramatized—it\'s real life.',
            tags: ['社交'],
          },
        ],
      },
      {
        type: 'toriQuote',
        label: '🐰 토리 说', labelEn: '🐰 Tori says',
        text: '韩国便利店的塑料椅文化，是理解韩国年轻人生活的一把钥匙。价格不高，但人情味很浓。', textEn: 'The plastic chair culture at Korean convenience stores is a key to understanding the lives of young Koreans. It\'s not expensive, but it\'s full of warmth.',
      },
      { type: 'sectionBreak'},
      {
        type: 'sectionTitle',
        emoji: '⏰',
        title: '什么时候去最合适', titleEn: 'When\'s the best time to go?',
        sub: '不同时段，便利店的气质完全不同', subEn: 'The vibe of a convenience store changes completely depending on the time of day.',
      },
      {
        type: 'timeline',
        items: [
          {
            emoji: '🌅',
            label: '早上 7:00-9:00', labelEn: 'Morning 7:00-9:00',
            desc: '上班族早高峰。三明治、咖啡、饭团刚补货，最新鲜。跟着韩国上班族一起排队，有种奇妙的本地感。', descEn: 'Office worker rush hour. Sandwiches, coffee, and rice balls are freshly stocked. Waiting in line with Korean commuters gives you a strangely local feel.',
          },
          {
            emoji: '🌞',
            label: '下午 2:00-4:00', labelEn: 'Afternoon 2:00-4:00',
            desc: '最安静。客人最少，可以慢慢看每一样东西。探索自有品牌、找限定款零食，最不用排队。', descEn: 'The quietest time. Fewest customers, so you can browse everything slowly. Best for exploring store brands and hunting limited-edition snacks without any lines.',
          },
          {
            emoji: '🌙',
            label: '晚上 10:00-12:00', labelEn: 'Night 10:00-12:00',
            desc: '最有氛围感。韩国年轻人下班聚集，门口塑料椅坐满了人。买瓶맥주坐下来，感受真实的首尔夜晚。', descEn: 'The most atmospheric. Young Koreans gather after work, and the plastic chairs out front are packed. Grab a bottle of 맥주, sit down, and soak in real Seoul nightlife.',
          },
        ],
      },
      { type: 'sectionBreak'},
      {
        type: 'sectionTitle',
        emoji: '💰',
        title: '便利店省钱攻略 — 会员、积分和隐藏玩法', titleEn: 'Convenience Store Money-Saving Guide — Memberships, Points, and Hidden Tricks',
        sub: '同样一瓶水，韩国人付的钱可能比你少一半', subEn: 'For the same bottle of water, Koreans might pay half of what you do.',
      },
      {
        type: 'paragraph',
        text: '韩国便利店的定价看起来透明，但背后的促销体系非常复杂。1+1（买一送一）、2+1（买二送一）、덤증정（加量赠送）几乎覆盖了店内半数商品。与之配套的是每个品牌独立的手机 App 积分系统——韩国本地消费者进店前先打开 App 扫码，几乎成了一种肌肉记忆。以下是最核心的三套体系。',
      },
      {
        type: 'cardGrid',
        variant: 'generic',
        cards: [
          {
            emoji: '📱',
            zh: 'GS25 — 나만의냉장고（我的冰箱）', zhEn: 'GS25 — 나만의냉장고 (My Fridge)',
            desc: 'GS25 的官方 App 核心功能是"虚拟冰箱"：买了 1+1 商品但只需要一件时，剩下的那一件可以免费存放在 App 里，有效期 30-60 天，下次到任何 GS25 门店扫码取出。每月自动赠送 1,000 积分，连续 3 个月消费满 3 万韩元可升级 VIP 获得额外积分。一个月内签到 25 天赠送免费商品。', descEn: 'The core feature of GS25\'s official app is a "virtual fridge": when you buy a 1+1 item but only need one, the extra one can be stored free in the app for 30-60 days, then scanned out at any GS25 store. You get 1,000 points automatically each month, and spending 30,000 KRW for 3 consecutive months upgrades you to VIP for bonus points. Checking in 25 days a month earns you a free item.',
            tip: '结账前先扫 App QR码，累积消费天数', tipEn: 'Scan the app QR code before checkout to accumulate purchase days.',
          },
          {
            emoji: '📱',
            zh: 'CU — 포켓CU（口袋CU）', zhEn: 'CU — 포켓CU (Pocket CU)',
            desc: 'CU 的 App 同样支持 1+1/2+1 商品暂存。每周三固定发放 1+1 优惠券，新用户注册赠送 5,000 韩元等价优惠券。SKT 通讯社用户绑定后可获得额外折扣。积分累积速度为每消费 1 万韩元得 100 积分（VIP 等级 200 积分）。2025 年起 CU 会员数已突破 3,000 万。', descEn: 'CU\'s app also supports storing 1+1/2+1 items. Every Wednesday they release 1+1 coupons, and new users get 5,000 KRW worth of coupons on signup. SKT telecom users can link their accounts for extra discounts. Points accumulate at 100 per 10,000 KRW spent (200 at VIP level). Since 2025, CU membership has surpassed 30 million.',
            tip: '每周三打开 App 领取限时 1+1 券', tipEn: 'Open the app every Wednesday to grab limited-time 1+1 coupons.',
          },
          {
            emoji: '🏷️',
            zh: '临期折扣 — 贴了红标签就快拿走', zhEn: 'Near-Expiry Discounts — Grab It Fast If It Has a Red Label',
            desc: '韩国便利店对即将到期的冷藏食品（도시락/샌드위치/김밥等）会贴上红色或黄色折扣标签，通常在保质期前 4-6 小时开始逐级降价，最终折扣可达 30%-50%。不同门店的降价时间不一致，但晚上 8-10 点是最容易捡到折扣标签的时段。饭团和便当是最常被打折的品类。', descEn: 'Korean convenience stores put red or yellow discount labels on refrigerated items nearing expiry (도시락/샌드위치/김밥, etc.). Prices drop in stages starting 4-6 hours before the expiry date, with final discounts reaching 30%-50%. Markdown times vary by store, but 8-10 PM is the easiest window to find discounted labels. Rice balls and lunch boxes are the most commonly discounted items.',
            tip: '晚上 9 点后去冷藏柜看看红色标签', tipEn: 'Check the refrigerated section for red labels after 9 PM.',
          },
        ],
      },
      { type: 'sectionBreak'},
      {
        type: 'sectionTitle',
        emoji: '🔍',
        title: '知道了会更有趣的冷知识', titleEn: 'Fun Facts That Make It More Interesting',
      },
      {
        type: 'trivia',
        items: [
          {
            tag: '数字冷知识', tagEn: 'Number Fun Facts',
            q: '韩国为什么到处都是便利店？', qEn: 'Why are convenience stores everywhere in Korea?',
            a: '韩国人口约5,100万，便利店约5.4万家（2024年基准），平均每1,000人就有一家。首尔江南区的某些街道，走100米就能看到3家不同品牌。', aEn: 'Korea has a population of about 51 million and roughly 54,000 convenience stores (as of 2024), meaning about one per 1,000 people. On some streets in Seoul\'s Gangnam district, you\'ll spot three different brands within 100 meters.',
          },
          {
            tag: '起源故事', tagEn: 'Origin Story',
            q: '편의점这个词是怎么来的？', qEn: 'Where does the word 편의점 come from?',
            a: '편의（便宜）= 方便，점（店）= 店铺。韩国最早的便利店是1982年短暂存在的乐天Seven（并非7-Eleven）。1989年5月，韩国第一家7-Eleven在首尔松坡区开业，才是真正的现代便利店起点。1990年代进入爆发期，至今全国超过5.3万家。', aEn: '편의 (convenience) = convenient, 점 (store) = shop. Korea\'s earliest convenience store was Lotte Seven, which briefly existed in 1982 (not 7-Eleven). In May 1989, Korea\'s first 7-Eleven opened in Songpa-gu, Seoul, marking the true start of modern convenience stores. They boomed in the 1990s, and today there are over 53,000 nationwide.',
          },
          {
            tag: '文化观察', tagEn: 'Cultural Insight',
            q: '为什么韩剧里的角色总在便利店哭？', qEn: 'Why do characters in K-dramas always cry at convenience stores?',
            a: '便利店是韩国城市里少数24小时开着、不需要理由就能进去的地方。在便利店买一罐咖啡，然后在角落站一会儿——这是被默许的城市人情绪出口。', aEn: 'Convenience stores are one of the few places in Korean cities that are open 24/7 and where you can walk in without any reason. Buying a can of coffee and standing in the corner for a moment—this is an unspoken emotional outlet for city dwellers.',
          },
          {
            tag: '购物小知识', tagEn: 'Shopping Tip',
            q: '买1+1和2+1哪个更划算？', qEn: 'Which is a better deal: 1+1 or 2+1?',
            a: '1+1比2+1更划算——只需要买一个。遇到1+1活动，直接拿两个去结账，收银员会帮你配对，不需要自己找一样的。', aEn: '1+1 is a better deal than 2+1—you only need to buy one. When you see a 1+1 promotion, just grab two and head to the register; the cashier will pair them for you, so you don\'t need to find matching items yourself.',
          },
        ],
      },
      {
        type: 'highlight',
        variant: 'warning',
        title: '⚠️ 去韩国便利店之前要知道', titleEn: '⚠️ What to know before going to a Korean convenience store',
        text: '大多数韩国便利店已支持信用卡，但关东煮等热食可能只收现金，建议随身备一些韩元。韩国便利店没有免费袋子——自带袋子，或在收银台付费购买（约50-100韩元）。', textEn: 'Most Korean convenience stores accept credit cards, but hot foods like oden may be cash-only, so it\'s a good idea to carry some won. Korean convenience stores don\'t provide free bags—bring your own or buy one at the register (about 50-100 won).',
      },
      { type: 'sectionBreak'},
      {
        type: 'phraseList',
        title: '토리 教你说——便利店必备韩语', titleEn: 'Tori teaches you—essential Korean for convenience stores',
        sub: '点击 🔊 听发音，点 + 加入你的词汇本', subEn: 'Tap 🔊 to hear the pronunciation, tap + to add it to your vocabulary list',
        items: [
          { ko: '이거 주세요.', ro: 'i-geo ju-se-yo', scene: '🏪 指着商品说', sceneEn: '🏪 Pointing at an item', zh: '这个给我', zhEn: 'I\'ll take this one' },
          { ko: '봉투 주세요.', ro: 'bong-tu ju-se-yo', scene: '🛍️ 需要袋子时', sceneEn: '🛍️ When you need a bag', zh: '请给我袋子', zhEn: 'Please give me a bag' },
          { ko: '전자레인지 써도 돼요?', ro: 'jeon-ja-re-in-ji sseo-do dwae-yo?', scene: '🍱 加热食物时', sceneEn: '🍱 When heating up food', zh: '可以用微波炉吗？', zhEn: 'Can I use the microwave?' },
          { ko: '1+1 이에요?', ro: 'il-beo-il i-e-yo?', scene: '🎁 确认优惠', sceneEn: '🎁 Checking a deal', zh: '这是买一送一吗？', zhEn: 'Is this buy one get one free?' },
          { ko: '카드 돼요?', ro: 'ka-deu dwae-yo?', scene: '💳 结账前确认', sceneEn: '💳 Confirming before checkout', zh: '可以刷卡吗？', zhEn: 'Can I pay by card?' },
          { ko: '영수증 필요 없어요.', ro: 'yeong-su-jeung pi-ryo eop-seo-yo', scene: '🧾 不需要收据', sceneEn: '🧾 No receipt needed', zh: '不需要收据', zhEn: 'No receipt needed' },
        ],
      },
      {
        type: 'vocabList',
        title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson',
        items: [
          { ko: '편의점', ro: 'pyeon-ui-jeom', zh: '便利店', zhEn: 'Convenience store' },
          { ko: '삼각김밥', ro: 'sam-gak-kim-bap', zh: '三角饭团', zhEn: 'Triangle rice ball' },
          { ko: '컵라면', ro: 'keop-ra-myeon', zh: '杯面', zhEn: 'Cup noodles' },
          { ko: '떡볶이', ro: 'tteok-bokk-i', zh: '炒年糕', zhEn: 'tteokbokki' },
          { ko: '순대', ro: 'sun-dae', zh: '血肠', zhEn: 'blood sausage' },
          { ko: '맥주', ro: 'maek-ju', zh: '啤酒', zhEn: 'beer' },
          { ko: '과자', ro: 'gwa-ja', zh: '零食', zhEn: 'snacks' },
          { ko: '봉투', ro: 'bong-tu', zh: '袋子', zhEn: 'bag' },
          { ko: '택배', ro: 'taek-bae', zh: '快递', zhEn: 'delivery' },
          { ko: '영수증', ro: 'yeong-su-jeung', zh: '收据', zhEn: 'receipt' },
          { ko: '아메리카노', ro: 'a-me-ri-ka-no', zh: '美式咖啡', zhEn: 'Americano' },
          { ko: '샌드위치', ro: 'saen-deu-wi-chi', zh: '三明治', zhEn: 'sandwich' },
        ],
      },
    ],
  },
  {
  slug: 'seoul-cafe',
  category: 'culture',
  title: '首尔咖啡文化', titleEn: 'Seoul\'s coffee culture',
  subtitle: '커피 문화 — 人均每年400杯，亚洲第一的咖啡之国', subtitleEn: 'Coffee culture — 400 cups per person per year, Asia\'s #1 coffee nation',
  emoji: '☕',
  readMinutes: 10,
  bannerImage: '/images/banners/seoul-cafe.webp',
  blocks: [
    {
      type: 'intro',
      text: '토리在首尔的时候做了一件事：从住的地方出门，走100步，数咖啡厅。结果数到了 4家。这不是特别繁华的街道，就是普通的住宅区。韩国人均咖啡消耗量是世界第一，首尔的咖啡厅密度更是让每一个第一次来的人目瞪口呆。但咖啡厅在韩国不只是"喝咖啡的地方"，它是办公室、是约会场所、是独处的避难所、是拍照的舞台……今天토리 带你彻底搞懂首尔的咖啡文化 ☕', textEn: 'When Tori was in Seoul, she did one thing: stepped out of her place, walked 100 steps, and counted coffee shops. She counted 4. This wasn\'t a bustling street—just a typical residential area. Korea ranks #1 in the world for per-capita coffee consumption, and Seoul\'s coffee shop density leaves every first-time visitor stunned. But in Korea, a coffee shop isn\'t just "a place to drink coffee"—it\'s an office, a date spot, a sanctuary for solitude, a stage for photos... Today, Tori takes you deep into Seoul\'s coffee culture ☕',
    },
    {
      type: 'sectionTitle',
      emoji: '📊',
      title: '先被这几个数字震一震', titleEn: 'Let these numbers blow your mind first',
      sub: '你以为自己懂咖啡，直到看到韩国的数据', subEn: 'You think you know coffee—until you see Korea\'s numbers',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        { price: '1位', priceEn: '#1', zh: '韩国人均咖啡消耗量', zhEn: 'Per-capita coffee consumption in Korea', desc: '亚洲第一，年均超过400杯，约全球平均水平的2.7倍', descEn: '#1 in Asia, averaging over 400 cups a year—about 2.7x the global average' },
        { price: '10万+', priceEn: '100,000+', zh: '韩国咖啡厅数量', zhEn: 'Number of coffee shops in Korea', desc: '高峰时全国超过10万家咖啡厅（2022年），首尔约有2.4万家。近年因市场饱和出现关店潮', descEn: 'At its peak, over 100,000 coffee shops nationwide (2022), with about 24,000 in Seoul. In recent years, market saturation has led to a wave of closures' },
        { price: '1,500원', zh: '便利店美式咖啡均价', zhEn: 'Average price of convenience store Americano', desc: '约合人民币8元，韩国咖啡价格跨度极大，从这里到8万韩元都有', descEn: 'About 8 RMB. Coffee prices in Korea vary wildly—from this up to 80,000 KRW' },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🤔',
      title: '为什么首尔到处都是咖啡厅', titleEn: 'Why coffee shops are everywhere in Seoul',
      sub: '不是因为韩国人特别爱喝咖啡，而是因为咖啡厅承担了更多功能', subEn: 'It\'s not that Koreans love coffee that much—it\'s that coffee shops serve way more functions',
    },
    {
      type: 'paragraph',
      heading: '🏢 没有"第三空间"的城市，咖啡厅来填', headingEn: '🏢 A city without "third spaces"—coffee shops fill the gap',
      text: '韩国的城市结构里，公共休闲空间相对有限。图书馆少，公园不够大，咖啡厅成了城市人最重要的"第三空间"——不是家，不是公司，但可以长时间待着的地方。\n在首尔，你会看到很多人一个人坐在咖啡厅里对着电脑工作好几个小时。这不是借用空间，这是韩国人普遍接受的生活方式。一杯美式咖啡，换一个下午的位置，完全正常。', textEn: 'In Korea\'s urban structure, public leisure spaces are relatively limited. Few libraries, not enough parks—so coffee shops have become the city dweller\'s most important "third space": not home, not work, but a place you can stay for hours.\\nIn Seoul, you\'ll see plenty of people sitting alone in coffee shops, working on their laptops for hours. This isn\'t squatting—it\'s a widely accepted lifestyle in Korea. One Americano buys you an afternoon seat. Totally normal.',
    },
    {
      type: 'highlight',
      variant: 'tip',
      text: '토리 观察：在홍대（弘大）的咖啡厅，从早上10点到晚上10点，每张桌子的使用率几乎是100%。学生、设计师、自由职业者、带着电脑的上班族……咖啡厅是首尔的"共享办公室"。', textEn: 'Tori\'s observation: at a coffee shop in Hongdae, from 10 AM to 10 PM, nearly every table is occupied 100% of the time. Students, designers, freelancers, office workers with laptops... Coffee shops are Seoul\'s "shared office."',
    },
    {
      type: 'paragraph',
      heading: '📸 카페는 배경이다——咖啡厅是背景', headingEn: '📸 The cafe is the backdrop',
      text: '韩国有一个词叫做 인스타감성（Instagram 感性），意思是"适合发Instagram的氛围感"。首尔的咖啡厅创业者深知这一点，每一家独立咖啡厅几乎都有自己的视觉主题。\n复古相机装饰、落地窗、木质书架、多肉植物墙、手写菜单板……这些不是随便摆的，是经过精心设计的"出片背景"。用户来喝咖啡，也来拍照，来发小红书（在韩国是发Instagram），这就是韩国咖啡厅的双重价值。', textEn: 'Korea has a term called "Instagram sensibility"—meaning "a vibe that\'s perfect for posting on Instagram." Seoul\'s cafe entrepreneurs know this well; almost every indie coffee shop has its own visual theme.\\nVintage camera decor, floor-to-ceiling windows, wooden bookshelves, succulent walls, handwritten menu boards... These aren\'t random—they\'re carefully designed "photo-ready backdrops." Customers come for coffee, but also for photos, to post on Xiaohongshu (or Instagram in Korea). That\'s the dual value of a Korean coffee shop.',
    },
    {
      type: 'highlight',
      variant: 'tip',
      text: '직접 가봤더니（토리 亲测）：성수동（圣水洞）有一家把整面墙做成绿植的咖啡厅，토리 在那里坐了2小时，看到了至少30个人专门进来拍照，然后买了最便宜的饮料就走。咖啡厅老板说这很正常，这些人会帮他带来更多真正的顾客。', textEn: 'Tori\'s firsthand test: in Seongsu-dong, there\'s a cafe with an entire wall covered in plants. Tori sat there for 2 hours and saw at least 30 people come in just to take photos, buy the cheapest drink, and leave. The owner said that\'s normal—these people bring in more real customers.',
    },
    {
      type: 'paragraph',
      heading: '💔 혼자여도 괜찮아——一个人也没关系', headingEn: '💔 It\'s okay to be alone',
      text: '韩国有一种文化叫 혼카（혼자 카페），意思是"一个人去咖啡厅"。这在中国可能让人觉得有点孤独，但在韩国，一个人去咖啡厅是完全正常的社会现象，甚至是一种享受独处的方式。\n很多首尔咖啡厅专门为"혼카族"设计了单人座位——靠窗的小桌子，带隔断的吧台座位，有插座和台灯。店家知道这类顾客会长时间停留，单人消费也不低。', textEn: 'Korea has a culture called honka (honja cafe), meaning "going to a cafe alone." In China, this might seem a bit lonely, but in Korea, going to a cafe by yourself is completely normal—even a way to enjoy your own company.\\nMany Seoul cafes have single seats designed for the "honka crowd"—small tables by the window, partitioned bar seats with outlets and lamps. Owners know these customers stay long and spend well.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🏪',
      title: '首尔咖啡厅的三种类型', titleEn: 'Three Types of Seoul Cafes',
      sub: '去不同的地方，感受不同的首尔', subEn: 'Visit different spots, feel different sides of Seoul',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        { emoji: '🟣', tags: ['连锁品牌'], ko: '프랜차이즈 카페', desc: '스타벅스、이디야、메가커피、컴포즈커피……品质稳定，到处都有，适合赶时间或不想踩雷时选择。', descEn: 'Starbucks, Ediya, Mega Coffee, Compose Coffee... consistent quality, everywhere, perfect when you\'re in a hurry or don\'t want to risk a bad pick.' },
        { emoji: '🌸', tags: ['独立咖啡厅'], ko: '개인 카페', desc: '首尔最有灵魂的咖啡厅都在这里。每家都有自己的故事和设计，发现一家好的独立咖啡厅，是首尔旅行最大的惊喜之一。', descEn: 'Seoul\'s most soulful cafes are here. Each has its own story and design—finding a great indie cafe is one of the biggest joys of visiting Seoul.' },
        { emoji: '✨', tags: ['主题概念店'], ko: '콘셉트 카페', desc: '猫咖、图书馆咖啡厅、复古胶片咖啡厅、IP联名限定店……韩国人把咖啡厅玩出了无数花样，不去体验一次说不过去。', descEn: 'Cat cafes, library cafes, retro film cafes, IP collab pop-ups... Koreans have taken cafes to endless creative levels—you\'ve got to try at least one.' },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '☕',
      title: '韩国本土连锁品牌，不只有스타벅스', titleEn: 'Korean Homegrown Chains—Not Just Starbucks',
      sub: '这几个才是韩国人自己天天喝的', subEn: 'These are what Koreans actually drink daily',
    },
    {
      type: 'cardGrid',
      variant: 'brand',
      cards: [
        { emoji: '🟣', ko: '이디야커피', zh: 'Ediya Coffee · 上班族最爱', zhEn: 'Ediya Coffee · Office Workers\' Favorite', desc: '韩国本土主要连锁咖啡品牌之一，门店数量长期超过스타벅스（韩国市场约2,000家）。主打高性价比，美式约2,500韩元，是很多上班族的日常选择。没有华丽的设计，但韩国人信任它。', descEn: 'One of Korea\'s major homegrown coffee chains, with more stores than Starbucks for years (about 2,000 in Korea). Known for great value—an americano is around 2,500 won—it\'s a daily staple for many office workers. No fancy design, but Koreans trust it.', tip: '价格是스타벅스的一半，味道差距不大，首选省钱方案', tipEn: 'Half the price of Starbucks, similar taste—top pick for saving money' },
        { emoji: '🩷', ko: '메가커피', zh: 'MEGA Coffee · 年轻人的选择', zhEn: 'MEGA Coffee · The Young Crowd\'s Choice', desc: '以超大杯量和低价格（美式约1,500韩元）快速崛起。杯子比一般连锁大一圈，性价比极高。近几年在韩国大学生和年轻上班族里爆红，排队是常态。', descEn: 'Rising fast with huge cup sizes and low prices (americano around 1,500 won). Cups are a size bigger than typical chains—incredible value. It\'s blown up among college students and young workers lately; lines are the norm.', tip: '메가 사이즈（Mega Size）真的非常大，第一次去建议点中杯', tipEn: 'The Mega Size is seriously huge—go with a medium your first time' },
        { emoji: '🟢', ko: '컴포즈커피', zh: 'COMPOSE Coffee · 最便宜的良心', zhEn: 'COMPOSE Coffee · The Cheapest, Most Honest', desc: '韩国最便宜的连锁咖啡之一，美式约1,500韩元。主要分布在住宅区和大学周边，是韩国学生的口粮咖啡。走简约清新风，没有豪华装修，但喝完觉得合理。', descEn: 'One of Korea\'s cheapest chains—americano around 1,500 won. Mostly in residential areas and near universities, it\'s the go-to for students. Simple and fresh, no luxury decor, but it just makes sense.', tip: '第一次来韩国想省钱喝咖啡，来这里不会错', tipEn: 'If you\'re in Korea for the first time and want cheap coffee, you can\'t go wrong here' },
        { emoji: '⭐', ko: '스타벅스 코리아', zh: '韩国星巴克 · 限定款圣地', zhEn: 'Korean Starbucks · A Haven for Limited Editions', desc: '韩国的星巴克和全球其他国家不太一样——它有大量韩国限定款周边，每季度推出限定杯，排队抢购是韩国星巴克特有的文化现象。来韩国必须看看当季有什么限定。', descEn: 'Korea\'s Starbucks is different from the rest of the world—tons of Korea-only merch, limited cups every season, and lining up to grab them is a unique cultural phenomenon. You\'ve got to check what\'s limited this season.', tip: '每年樱花季和圣诞节的限定周边，抢到了就是赚到了', tipEn: 'Limited merch during cherry blossom season and Christmas—if you snag it, you\'ve scored' },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🗺️',
      title: '토리 推荐：首尔必去的咖啡厅街区', titleEn: 'Tori\'s Picks: Must-Visit Cafe Neighborhoods in Seoul',
      sub: '不同街区，感受完全不一样的咖啡文화', subEn: 'Different neighborhoods, totally different cafe vibes',
    },
    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        { emoji: '🏭', ko: '성수동', zh: '圣水洞 · 首尔最潮的工业风咖啡区', zhEn: 'Seongsu-dong · Seoul\'s Trendiest Industrial Cafe District', desc: '旧工厂改造成的咖啡厅聚集地，韩国"Brooklyn"。高天花板、裸露管道、水泥墙——工业风美学在这里发挥到极致。韩国所有走在最前沿的咖啡品牌，第一家店几乎都开在성수동。', descEn: 'A cluster of cafes in converted old factories—Korea\'s "Brooklyn." High ceilings, exposed pipes, concrete walls—industrial aesthetics at their peak. Almost every cutting-edge Korean coffee brand opens its first store in Seongsu-dong.', tip: '토리 推荐：대림창고（大林仓库），首尔最著名的工业风咖啡厅，必去', tipEn: 'Tori\'s pick: Daerim Warehouse, Seoul\'s most famous industrial-style cafe — a must-visit' },
        { emoji: '🌸', ko: '익선동', zh: '益善洞 · 韩屋里喝咖啡', zhEn: 'Ikseon-dong · Coffee in a Hanok', desc: '首尔保存最好的韩屋（韩国传统建筑）街区，旧韩屋被改造成个性咖啡厅。坐在有瓦片屋顶和木门的空间里喝一杯手冲咖啡，穿越感极强。来这里的人很多都会穿韩服来拍照。', descEn: 'Seoul\'s best-preserved hanok (traditional Korean architecture) neighborhood, where old hanoks have been transformed into unique cafes. Sip a pour-over coffee in a space with tiled roofs and wooden doors — it feels like stepping back in time. Many visitors wear hanbok here for photos.', tip: '토리 推荐：익선다다，韩屋改造的多层咖啡厅，每个角落都是景', tipEn: 'Tori\'s pick: Ikseon Dada, a multi-story cafe in a converted hanok — every corner is a photo spot' },
        { emoji: '🎨', ko: '연남동', zh: '延南洞 · 艺术家的街区', zhEn: 'Yeonnam-dong · The Artists\' Neighborhood', desc: '弘大旁边的安静街区，聚集了大量独立设计师和艺术家开的咖啡厅。没有성수动那么工业感，走的是温柔、有质感的小清新路线。每一家咖啡厅都像是某个艺术家的生活空间。', descEn: 'A quiet neighborhood next to Hongdae, packed with cafes run by independent designers and artists. Less industrial than Seongsu-dong, it leans toward a soft, textured, minimalist aesthetic. Every cafe feels like an artist\'s living space.', tip: '토리 推荐：沿着연남동 골목（胡同）随便走，随便进，很难踩雷', tipEn: 'Tori\'s pick: Just wander down Yeonnam-dong\'s alleys and walk into any cafe — hard to go wrong' },
        { emoji: '🏛️', ko: '북촌 한옥마을 근처', zh: '北村韩屋村周边 · 景福宫脚下喝咖啡', zhEn: 'Around Bukchon Hanok Village · Coffee at the Foot of Gyeongbokgung', desc: '景福宫旁边，有大量把传统和现代融合的咖啡厅。坐在落地窗边，窗外就是600年历史的宫殿屋顶——这种视觉冲击是首尔独有的。价格通常比其他区贵，但值得体验一次。', descEn: 'Next to Gyeongbokgung, there are many cafes blending tradition and modernity. Sit by a floor-to-ceiling window with a 600-year-old palace roof right outside — a visual experience unique to Seoul. Prices are usually higher than other areas, but worth trying once.', tip: '토리 推荐：找一家有景福宫视角的落地窗座位，点一杯拿铁，坐够了再走', tipEn: 'Tori\'s pick: Find a window seat with a Gyeongbokgung view, order a latte, and stay as long as you like' },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '📋',
      title: '韩国咖啡厅点单完全指南', titleEn: 'The Complete Guide to Ordering at Korean Cafes',
      sub: '从走进去到拿到咖啡，每一步都有说法', subEn: 'From walking in to getting your coffee, every step has its own etiquette',
    },
    {
      type: 'paragraph',
      text: '🐰 토리 的咖啡厅点单全流程', textEn: '🐰 Tori\'s Full Cafe Ordering Process',
    },
    {
      type: 'steps',
      steps: [
        { label: '走进去，看菜单板', labelEn: 'Walk in, check the menu board', desc: '大部分韩国咖啡厅的菜单在收银台上方的黑板或电子屏上。先看好再排队，不要排到了再慢慢看。', descEn: 'Most Korean cafes have their menu on a blackboard or digital screen above the counter. Decide before you queue — don\'t take your time once you\'re at the register.' },
        { label: '告诉店员喝什么、几杯、冷还是热', labelEn: 'Tell the staff what you want, how many, and iced or hot', desc: '韩国咖啡厅默认问你冷热，冰的叫 아이스（iced），热的叫 따뜻하게（温热）或 핫（hot）。', descEn: 'Korean cafes always ask if you want it iced or hot. Iced is 아이스 (iced), hot is 따뜻하게 (warm) or 핫 (hot).', ko: '아이스 아메리카노 하나 주세요', ro: 'a-i-seu a-me-ri-ka-no ha-na ju-se-yo', zh: '一杯冰美式', zhEn: 'One iced Americano' },
        { label: '결제（结账）——刷卡、手机、현금', labelEn: 'Payment — card, mobile, or cash', desc: '韩国几乎所有咖啡厅都支持信用卡，三星Pay、카카오페이也很普遍。现金反而越来越少用。', descEn: 'Almost all Korean cafes accept credit cards, and Samsung Pay and KakaoPay are also common. Cash is used less and less.', ko: '카드로 할게요', ro: 'ka-deu-ro hal-ge-yo', zh: '刷卡', zhEn: 'Pay by card' },
        { label: '找座位，等叫号', labelEn: 'Find a seat and wait for your number', desc: '大部分咖啡厅结账后自己找座位，饮料做好了会叫你的号或用震动取餐器通知。记好自己的号码。', descEn: 'Most cafes let you find your own seat after paying. When your drink is ready, they\'ll call your number or buzz a pager. Remember your number.' },
        { label: '喝完自己收盘子', labelEn: 'Clear your own cup when you\'re done', desc: '韩国咖啡厅通常是自助收盘制度，喝完要把杯子送回收餐台。这是礼貌，不这样做会显得很不入乡随俗。', descEn: 'Korean cafes usually have a self-service tray return policy — bring your cup back to the counter when you\'re done. It\'s polite, and not doing it looks out of place.', ko: '반납구는 어디예요？', ro: 'ban-nap-gu-neun eo-di-ye-yo？', zh: '回收处在哪里？', zhEn: 'Where\'s the tray return?' },
      ],
    },
    {
      type: 'sectionTitle',
      emoji: '☕',
      title: '菜单韩语小课堂', titleEn: 'Menu Korean Mini-Lesson',
    },
    {
      type: 'table',
      head: ['韩文', '中文', '说明'],
      rows: [
        ['아메리카노\na-me-ri-ka-no', '美式咖啡', '韩国最受欢迎的咖啡，没有之一。很多韩国人一天两三杯아이스 아메리카노'],
        ['카페라떼\nka-pe-ra-tte', '拿铁', '第二受欢迎，奶味重，适合不喜欢太苦的人'],
        ['달고나커피\ndal-go-na-keo-pi', '达尔戈纳咖啡', '韩国发明，疫情期间风靡全球。打发的咖啡泡沫浮在牛奶上，好喝好拍'],
        ['플랫화이트\npeul-laet-hwa-i-teu', '馥芮白', '在高端咖啡厅越来越流行，浓缩比例更高，奶香更浓'],
        ['아인슈페너\na-in-seu-pe-neo', '维也纳咖啡', '浓缩咖啡上面一层厚厚的奶油，是首尔独立咖啡厅的网红款，拍照必点'],
        ['논카페인\nnon-ka-pe-in', '无咖啡因', '想喝咖啡但怕睡不着，可以点这个。大部分咖啡厅都有'],
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🔍',
      title: '咖啡文化冷知识', titleEn: 'Coffee Culture Fun Facts',
      sub: '这些细节，让你看韩剧的时候更有感触', subEn: 'These details will make you feel more when watching K-dramas',
    },
    {
      type: 'trivia',
      items: [
        { tag: '历史冷知识', tagEn: 'Historical Fun Facts', q: '韩国人从什么时候开始喝咖啡？', qEn: 'When did Koreans start drinking coffee?', a: '1896年，朝鲜高宗在俄国公使馆避难时第一次喝到咖啡，从此爱上。早期咖啡在朝鲜是皇室和贵族的专属，被称为"양탕국"（洋汤）。1950年代韩战后，美军把速溶咖啡带进了普通韩国家庭。', aEn: 'In 1896, King Gojong of Korea first tasted coffee while taking refuge at the Russian legation—and fell in love with it. Early on, coffee was reserved for royalty and nobility, called "양탕국" (foreign soup). After the Korean War in the 1950s, American troops brought instant coffee into ordinary Korean homes.' },
        { tag: '当代文化', tagEn: 'Contemporary Culture', q: '为什么韩国人那么爱아이스 아메리카노？', qEn: 'Why do Koreans love 아이스 아메리카노 so much?', a: '韩国人有个绰号叫"아아인"（아이스 아메리카노人），意思是无论冬夏都喝冰美式的人。即使零下十度的冬天，便利店热食旁边的冷饮柜里，아이스 아메리카노依然是最畅销的。这成了韩国人的一个性格标签。', aEn: 'Koreans have a nickname "아아인" (아이스 아메리카노 people), meaning those who drink iced Americanos regardless of season. Even in minus-ten-degree winters, 아이스 아메리카노 remains the bestseller in the cold drink fridge next to hot food at convenience stores. It\'s become a personality trait of Koreans.' },
        { tag: '咖啡厅礼仪', tagEn: 'Cafe Etiquette', q: '在韩国咖啡厅坐多久才算合适？', qEn: 'How long is it appropriate to sit in a Korean cafe?', a: '韩国咖啡厅默认可以长时间坐，只要你买了东西。没有催促，没有翻桌压力。很多学生在考试季会从开门坐到关门。唯一的潜规则是：高峰期（周末下午）如果座位很紧张，注意周围情况，不要占着两个位置放东西。', aEn: 'Korean cafes default to allowing long stays as long as you\'ve bought something. No rushing, no table-flipping pressure. Many students sit from opening to closing during exam season. The only unwritten rule: during peak hours (weekend afternoons) if seats are scarce, be aware of your surroundings and don\'t occupy two seats with your stuff.' },
        { tag: '韩剧彩蛋', tagEn: 'K-Drama Easter Eggs', q: '韩剧里的咖啡跑腿是真实的吗？', qEn: 'Is the coffee errand in K-dramas real?', a: '완전 진짜（完全是真的）。韩国办公室文化里，给前辈买咖啡是一种约定俗成的礼仪。很多公司会在下午有专门的"커피타임"，后辈去买咖啡回来，大家一起喝。카카오톡（韩国版微信）上有专门的咖啡送餐服务，连外卖都可以。', aEn: '완전 진짜 (totally real). In Korean office culture, buying coffee for seniors is a customary etiquette. Many companies have a dedicated "커피타임" in the afternoon where juniors go buy coffee and everyone drinks together. 카카오톡 (Korea\'s version of WeChat) has a dedicated coffee delivery service—even takeout is possible.' },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '📚',
      title: '카공和스터디카페 — 咖啡厅是韩国人的第二个书房', titleEn: '카공 and 스터디카페 — Cafes are Koreans\' second study room',
      sub: '韩国人把咖啡馆当办公室和图书馆用，催生了全球最发达的自习咖啡厅产业', subEn: 'Koreans use cafes as offices and libraries, spawning the world\'s most developed study cafe industry',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          zh: '스터디카페 · 按时间收费的自习空间', zhEn: '스터디카페 · Pay-by-time study spaces',
          desc: '韩国独有的商业模式：按小时计费（约 1,000-4,000 韩元），日票约 10,000 韩元。提供独立隔间、台灯、电源、打印机、免费咖啡和零食，完全静音。2015 年全国只有 112 家，到 2024 年增长到近 7,000 家——9 年翻了 60 倍。80% 的用户是成年人（上班族和自由职业者），不只是学生。主要连锁品牌 작심(Zaksim) 全国超过 1,000 家门店。', descEn: 'A uniquely Korean business model: charged by the hour (about 1,000-4,000 KRW), with day passes around 10,000 KRW. They offer private cubicles, desk lamps, power outlets, printers, free coffee and snacks, and complete silence. In 2015 there were only 112 nationwide; by 2024 that grew to nearly 7,000—a 60-fold increase in 9 years. 80% of users are adults (office workers and freelancers), not just students. The major chain 작심 (Zaksim) has over 1,000 locations nationwide.',
          tip: '키오스크(自助终端)无人运营，刷卡进出门禁，全程无需与人对话', tipEn: 'Operated unmanned via 키오스크 (self-service kiosks), with card-swipe entry and exit—no human interaction needed the whole time',
        },
        {
          zh: '카공족 · 在普通咖啡厅学习的潜规则', zhEn: '카공족 · Unwritten rules for studying in regular cafes',
          desc: '카공 = 카페 + 공부（在咖啡厅学习）。一杯美式 3,000-5,000 韩元可以坐一个下午，在考试季（4月/6月/10月/12月）大学附近的咖啡厅凌晨 2 点还坐满人。但咖啡厅并非无限时——部分热门店在周末限时 2-3 小时（看门口告示）。注意选角落座位，不要占两个位，别在别人视频会议时外放。', descEn: '카공 = 카페 + 공부 (studying at a cafe). An Americano for 3,000-5,000 KRW lets you sit all afternoon; during exam season (April/June/October/December), cafes near universities are still packed at 2 AM. But cafes aren\'t unlimited—some popular spots limit stays to 2-3 hours on weekends (check the sign at the door). Pick a corner seat, don\'t take up two seats, and don\'t play audio out loud during someone\'s video call.',
          tip: 'Naver 地图搜索 "카공" 找适合学习的咖啡厅', tipEn: 'Search "카공" on Naver Maps to find study-friendly cafes',
        },
      ],
    },
    {
      type: 'highlight',
      variant: 'warning',
      title: '☕ 去韩国咖啡厅前要知道', titleEn: '☕ What to know before going to a Korean cafe',
      text: '韩国大部分咖啡厅有 텀블러 할인（自带杯折扣），带自己的保温杯来可以少付100-300韩元，也更环保。另外，很多独立咖啡厅不接受信用卡，只收现金或특정 카드，进门前可以先问一下 카드 되나요？（可以刷卡吗？）', textEn: 'Most Korean cafes offer 텀블러 할인 (bring-your-own-cup discount)—bring your own tumbler to save 100-300 KRW and be more eco-friendly. Also, many independent cafes don\'t accept credit cards, only cash or 특정 카드 (specific cards); ask 카드 되나요? (Can I pay by card?) before entering.',
    },
    {
      type: 'phraseList',
      title: '토리 教你说——咖啡厅必备韩语', titleEn: 'Tori teaches you—essential Korean for cafés',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        { ko: '아이스 아메리카노 하나 주세요.', ro: 'a-i-seu a-me-ri-ka-no ha-na ju-se-yo', scene: '☕ 点单最常用的一句话', sceneEn: '☕ The most common phrase for ordering', zh: '一杯冰美式', zhEn: 'One iced Americano' },
        { ko: '따뜻하게 해주세요.', ro: 'tta-tteu-ta-ge hae-ju-se-yo', scene: '🔥 要热的时候', sceneEn: '🔥 When you want it hot', zh: '请做热的', zhEn: 'Please make it hot' },
        { ko: '시럽 빼주세요.', ro: 'si-reop bbae-ju-se-yo', scene: '🚫 不要糖浆', sceneEn: '🚫 No syrup', zh: '不要糖浆', zhEn: 'No syrup' },
        { ko: '텀블러 가져왔어요.', ro: 'teom-beul-reo ga-jyeo-wa-sseo-yo', scene: '♻️ 自带杯折扣', sceneEn: '♻️ Discount for bringing your own cup', zh: '我带了自己的杯子', zhEn: 'I brought my own cup' },
        { ko: '콘센트 있어요?', ro: 'kon-sen-teu i-sseo-yo?', scene: '🔌 找插座', sceneEn: '🔌 Looking for an outlet', zh: '有插座吗？', zhEn: 'Is there an outlet?' },
        { ko: '와이파이 비밀번호가 뭐예요?', ro: 'wa-i-pa-i bi-mil-beon-ho-ga mwo-ye-yo?', scene: '📶 问WiFi密码', sceneEn: '📶 Asking for the WiFi password', zh: 'WiFi密码是什么？', zhEn: 'What\'s the WiFi password?' },
      ],
    },
    {
      type: 'sectionTitle',
      emoji: '📖',
      title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson',
    },
    {
      type: 'vocabList',
      items: [
        { ko: '카페', ro: '', zh: '咖啡厅', zhEn: 'Café' },
        { ko: '아메리카노', ro: '', zh: '美式咖啡', zhEn: 'Americano' },
        { ko: '아이스', ro: '', zh: '冰的', zhEn: 'Iced' },
        { ko: '따뜻하게', ro: '', zh: '热的', zhEn: 'Hot' },
        { ko: '라떼', ro: '', zh: '拿铁', zhEn: 'latte' },
        { ko: '시럽', ro: '', zh: '糖浆', zhEn: 'Syrup' },
        { ko: '텀블러', ro: '', zh: '保温杯', zhEn: 'Thermos' },
        { ko: '콘센트', ro: '', zh: '插座', zhEn: 'Outlet' },
        { ko: '와이파이', ro: '', zh: 'WiFi' },
        { ko: '혼카', ro: '', zh: '一人咖啡厅', zhEn: 'Solo café' },
        { ko: '인스타감성', ro: '', zh: '适合发ins的氛围感', zhEn: 'Instagram-worthy vibe' },
        { ko: '달고나', ro: '', zh: '达尔戈纳（糖）', zhEn: 'Dalgona (sugar)' },
      ],
    },
    {
      type: 'ending',
      text: '下次去首尔，토리 带你找最好喝的咖啡厅\n首尔的咖啡厅文化，值得单独花半天去感受。\n不用提前做攻略，随便走进一条胡同，\n推开一扇看起来有意思的门——\n十有八九，里面有一杯值得记住的咖啡。\n下一篇，토리 带你认识韩国人为什么这样打招呼 🙏', textEn: 'Next time you\'re in Seoul, 토리 will take you to the best coffee spots\\nSeoul\'s café culture deserves a half-day all to itself.\\nNo need to plan ahead—just wander into any alley,\\npush open a door that looks interesting—\\nnine times out of ten, there\'s a coffee worth remembering inside.\\nNext up, 토리 shows you why Koreans greet each other this way 🙏',
      next: { slug: '', title: '韩国人的打招呼文化', titleEn: 'Korean greeting culture' },
    },
  ],
},
  {
  slug: 'greeting-culture',
  category: 'culture',
  title: '韩国人的打招呼文化', titleEn: 'Korean greeting culture',
  subtitle: '인사 문화 — 一个"안녕하세요"背后藏着多少学问', subtitleEn: 'Greeting culture—how much lies behind a single "annyeonghaseyo"',
  emoji: '🙇',
  readMinutes: 10,
  bannerImage: '/images/banners/greeting-culture.webp',
  blocks: [
    {
      type: 'toriQuote',
      label: '토리 说', labelEn: 'Tori says',
      text: '토리第一次去韩国的时候，走进一家小餐厅，对着老板说了一句 안녕하세요，老板立刻抬起头，笑着说 어서오세요，整个氛围一下子就不一样了。韩国人对"打招呼"这件事极其重视——它不只是一句客套话，而是判断一个人有没有礼貌、值不值得交往的第一信号。今天토리 带你搞懂韩国打招呼文化背后的那些规则，学完这篇，你在韩国遇到任何人都不会尴尬 🙏', textEn: 'The first time Tori went to Korea, she walked into a small restaurant and said annyeonghaseyo to the owner. He immediately looked up, smiled, and said eoseo oseyo—the whole vibe changed in an instant. Koreans take greetings very seriously—it\'s not just a polite phrase, but the first signal of whether someone is courteous and worth getting to know. Today, Tori will help you understand the rules behind Korean greeting culture. After reading this, you\'ll never feel awkward meeting anyone in Korea 🙏',
    },
    {
      type: 'sectionTitle',
      emoji: '⚡',
      title: '先说最重要的一件事', titleEn: 'First, the most important thing',
      sub: '理解这一点，你就理解了韩国打招呼文化的核心', subEn: 'Understand this, and you\'ll grasp the core of Korean greeting culture',
    },
    {
      type: 'paragraph',
      heading: '🏗️ 韩国社会是垂直结构的', headingEn: '🏗️ Korean society is vertically structured',
      text: '中国文化里，人与人之间的关系可以相对平等，打招呼的方式变化不大。但韩国社会有一套非常明确的垂直等级结构——年龄、职位、入职时间，这些都决定了你和对方的"位置关系"，而位置关系直接决定了你说什么、用什么语气说、要不要鞠躬、鞠多少度。\n\n这不是刻板的压迫，而是一套让所有人都知道"该怎么相处"的社会规则。对韩国人来说，遵守这套规则是一种尊重，不遵守才是失礼。', textEn: 'In Chinese culture, relationships between people can be relatively equal, and greetings don\'t vary much. But Korean society has a very clear vertical hierarchy—age, position, and tenure all determine your "position" relative to the other person, and that position directly dictates what you say, your tone, whether to bow, and how deep.\\n\\nThis isn\'t rigid oppression—it\'s a social code that lets everyone know "how to interact." For Koreans, following this code is a sign of respect; not following it is rude.',
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '토리 说', titleEn: 'Tori says',
      text: '你在韩剧里看到的那些主角对前辈毕恭毕敬、对晚辈随意说话的场景，不是夸张——那是真实的韩国日常。', textEn: 'The scenes in K-dramas where characters are deferential to seniors and casual with juniors aren\'t exaggerated—that\'s real daily life in Korea.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '💬',
      title: '韩语的敬语体系——说话方式就是你的名片', titleEn: 'Korean\'s honorific system—your speech is your business card',
      sub: '用错了体，比说错单词更严重', subEn: 'Using the wrong speech level is worse than using the wrong word',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          emoji: '🎩',
          ko: '합쇼체 / 해요체',
          zh: '正式敬语体 · 最高礼貌', zhEn: 'Formal polite speech · Highest politeness',
          desc: '对陌生人、长辈、上司使用。这是韩语学习者最先学的语体，也是最安全的选择。不确定该用什么体，用这个准没错。', descEn: 'Use this with strangers, elders, and superiors. It\'s the first speech level Korean learners pick up and the safest choice. When unsure, this is always a safe bet.',
          tip: '안녕하세요. 您好。／어디 가세요? 您去哪里？', tipEn: '안녕하세요. Hello. / 어디 가세요? Where are you going?',
        },
        {
          emoji: '🤝',
          ko: '해체 / 반말',
          zh: '非正式体 · 平辈之间', zhEn: 'Informal speech · Between peers',
          desc: '对同龄人、亲近的朋友、比自己小的人使用。注意：必须是双方都同意"말 놓다（说非正式语）"之后才能用，不能单方面切换。在韩国，随便对人说반말是非常失礼的行为。', descEn: 'Use this with same-age peers, close friends, and those younger than you. Note: it\'s only used after both parties agree to "말 놓다 (switch to informal speech)"—you can\'t switch unilaterally. In Korea, casually using 반말 with someone is very rude.',
          tip: '안녕. 嗨。／어디 가? 去哪儿？', tipEn: '안녕. Hey. / 어디 가? Where are you going?',
        },
        {
          emoji: '👑',
          ko: '합쇼체（격식체）',
          zh: '最正式体 · 新闻/演讲/军队', zhEn: 'Most formal speech · News/speeches/military',
          desc: '新闻播报员、总统演讲、军队里使用的最正式语体。日常生活很少用到，但在韩国综艺或新闻里经常听到。作为外国学习者，知道它存在就好。', descEn: 'The most formal speech level, used by news anchors, in presidential speeches, and in the military. Rarely used in daily life, but you\'ll hear it often on Korean variety shows or news. As a foreign learner, just know it exists.',
          tip: '안녕하십니까. （最正式）您好。／감사합니다. 感谢您。', tipEn: '안녕하십니까. (Most formal) Hello. / 감사합니다. Thank you.',
        },
      ],
    },
    {
      type: 'paragraph',
      heading: '🔄 말 놓다——什么时候可以说反语？', headingEn: '🔄 말 놓다—When can you switch to informal speech?',
      text: '韩国人之间，从正式体切换到반말，是一个需要明确"协商"的时刻。通常由年长的一方提出："우리 말 놓자（我们说反语吧）"，年轻的一方同意后，关系就进了一个新阶段。\n\n这个时刻在韩剧里经常出现，是两个人关系突破的标志性场景。对中国人来说可能觉得奇怪——为什么要专门说？但在韩国，这就是礼仪，也是一种尊重。', textEn: 'Among Koreans, switching from formal to 반말 is a moment that requires explicit "negotiation." Usually the older person initiates: "우리 말 놓자 (Let\'s speak informally)", and once the younger one agrees, the relationship enters a new phase.\\n\\nThis moment often appears in K-dramas as a milestone in a relationship. It might seem odd to Chinese people—why make a point of saying it? But in Korea, it\'s etiquette and a form of respect.',
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '중요',
      text: '作为外国学习者，在韩国遇到任何人，先用해요체，等对方说"말 놓자"再切换。永远不要主动用반말，除非你们已经是很熟的朋友。', textEn: 'As a foreign learner, use 해요체 with anyone you meet in Korea, and only switch after they say "말 놓자." Never initiate 반말 yourself unless you\'re already very close friends.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🙏',
      title: '鞠躬文化完全指南', titleEn: 'The complete guide to bowing culture',
      sub: '角度不同，意思完全不同', subEn: 'Different angles, completely different meanings',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          emoji: '😊',
          zh: '轻微点头', zhEn: 'Slight nod',
          desc: '路上遇到熟人、便利店结账后对店员表示谢意、电梯里遇到邻居', descEn: 'When running into an acquaintance on the street, thanking a convenience store clerk after checkout, or meeting a neighbor in the elevator',
          tip: '日常打招呼，随时随地', tipEn: 'Everyday greeting, anytime, anywhere',
          tags: ['15°'],
        },
        {
          emoji: '🫡',
          zh: '标准鞠躬', zhEn: 'Standard bow',
          desc: '见到长辈、上司、第一次见面的人，或表示感谢和道歉的场合', descEn: 'When meeting elders, superiors, or someone for the first time, or in situations of gratitude and apology',
          tip: '最常用的正式鞠躬', tipEn: 'The most common formal bow',
          tags: ['30°'],
        },
        {
          emoji: '🙇',
          zh: '深度鞠躬', zhEn: 'Deep bow',
          desc: '正式道歉、见到非常重要的长者或领导、演艺人员在舞台上向观众致谢', descEn: 'Formal apology, meeting a very important elder or leader, or performers thanking the audience on stage',
          tip: '隆重场合，不常见于日常', tipEn: 'Formal occasions, not common in daily life',
          tags: ['45°–90°'],
        },
      ],
    },
    {
      type: 'paragraph',
      heading: '👀 鞠躬时的细节，韩国人都在看', headingEn: '👀 Details of bowing that Koreans notice',
      text: '鞠躬不只是低头，还有几个细节韩国人会注意：\n\n眼睛：鞠躬时视线向下，不要盯着对方看。抬起来之后再进行眼神交流。\n\n手的位置：男性通常双手垂放在大腿两侧，女性通常双手交叠在腹部前方。\n\n互相鞠躬：如果对方也鞠躬，通常会有几次来回——对方鞠，你再鞠，再来一次。这在外国人看来可能有点好笑，但这是正常的礼仪互动，不需要觉得奇怪。', textEn: 'Bowing isn\'t just lowering your head—there are a few details Koreans pay attention to:\\n\\nEyes: Keep your gaze downward while bowing, don\'t stare at the other person. Make eye contact only after you raise your head.\\n\\nHand position: Men usually keep their hands at their sides, while women place their hands folded in front of their abdomen.\\n\\nMutual bowing: If the other person bows too, there\'s usually a back-and-forth—they bow, you bow, then one more. It might look a bit funny to foreigners, but it\'s normal etiquette, so don\'t feel awkward.',
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '토리 亲测', titleEn: '토리 tested it',
      text: '在韩国买东西，结账完对店员说声 감사합니다 并轻微点头，几乎每次都会收到比刚才更热情的回应。这个细节，比任何韩语口语技巧都管用。', textEn: 'When shopping in Korea, saying 감사합니다 with a slight nod to the cashier after paying almost always gets a warmer response than before. This small detail works better than any Korean speaking tip.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🎭',
      title: '五个真实场景的打招呼示范', titleEn: 'Greeting examples for five real-life scenarios',
      sub: '照着说，保证不出错', subEn: 'Just follow these and you won\'t go wrong',
    },
    {
      type: 'featureCard',
      emoji: '🏢',
      title: '🏢 场景一：第一次见面（正式）', titleEn: '🏢 Scenario 1: First meeting (formal)',
      scenes: [
        {
          speaker: '你', speakerEn: 'You',
          ko: '안녕하세요. 처음 뵙겠습니다.',
          ro: 'an-nyeong-ha-se-yo. cheo-eum boep-get-sseum-ni-da',
          zh: '您好，初次见面。', zhEn: 'Hello, nice to meet you.',
        },
        {
          speaker: '对方', speakerEn: 'The other person',
          ko: '네, 반갑습니다. 잘 부탁드립니다.',
          ro: 'ne, ban-gap-sseum-ni-da. jal bu-tak-deu-rim-ni-da',
          zh: '是，幸会。请多关照。', zhEn: 'Yes, pleased to meet you. Please take care of me.',
        },
        {
          speaker: '你', speakerEn: 'You',
          ko: '저도 잘 부탁드립니다.',
          ro: 'jeo-do jal bu-tak-deu-rim-ni-da',
          zh: '我也请您多关照。', zhEn: 'Please take care of me too.',
        },
      ],
    },
    {
      type: 'featureCard',
      emoji: '🍽️',
      title: '🍽️ 场景二：饭局开始前后', titleEn: '🍽️ Scenario 2: Before and after a meal',
      scenes: [
        {
          speaker: '长辈', speakerEn: 'elders',
          ko: '먹자!',
          ro: 'meok-ja',
          zh: '吃吧！（长辈发出信号才能开始吃）', zhEn: 'Eat up! (Only start eating after an elder gives the signal)',
        },
        {
          speaker: '你', speakerEn: 'You',
          ko: '잘 먹겠습니다!',
          ro: 'jal meok-get-sseum-ni-da',
          zh: '我开动了！（吃之前必说）', zhEn: 'I\'ll eat well! (Must say before eating)',
        },
        {
          speaker: '你', speakerEn: 'You',
          ko: '잘 먹었습니다!',
          ro: 'jal meok-eot-sseum-ni-da',
          zh: '我吃好了！（吃完后必说）', zhEn: 'I\'ve eaten well! (Must say after eating)',
        },
      ],
    },
    {
      type: 'featureCard',
      emoji: '🚪',
      title: '🚪 场景三：进出公司/学校', titleEn: '🚪 Scenario 3: Entering and leaving work/school',
      scenes: [
        {
          speaker: '早上进门', speakerEn: 'Entering in the morning',
          ko: '안녕하세요! 먼저 왔네요.',
          ro: 'an-nyeong-ha-se-yo! meon-jeo wa-seo-yo',
          zh: '你好！你来得真早。（对已经在场的人）', zhEn: 'Hello! You\'re here early. (To someone already there)',
        },
        {
          speaker: '先下班时', speakerEn: 'Leaving work early',
          ko: '먼저 들어가겠습니다.',
          ro: 'meon-jeo deu-reo-ga-get-sseum-ni-da',
          zh: '我先走了。（先离开时必须说）', zhEn: 'I\'m heading out first. (Must say when leaving before others)',
        },
        {
          speaker: '留下来的人', speakerEn: 'The one who stays',
          ko: '수고하셨습니다.',
          ro: 'su-go-ha-syeot-sseum-ni-da',
          zh: '辛苦了。（送别下班的人）', zhEn: 'Good work today. (Said to someone leaving work)',
        },
      ],
    },
    {
      type: 'featureCard',
      emoji: '📱',
      title: '📱 场景四：打电话开头', titleEn: '📱 Scene 4: Starting a phone call',
      scenes: [
        {
          speaker: '你', speakerEn: 'You',
          ko: '여보세요? 저 [이름]인데요.',
          ro: 'yeo-bo-se-yo? jeo [i-reum]-in-de-yo',
          zh: '喂？我是[名字]。', zhEn: 'Hello? This is [name].',
        },
        {
          speaker: '对方', speakerEn: 'The other person',
          ko: '아, 네! 잠깐만요.',
          ro: 'a, ne! jam-kkan-man-yo',
          zh: '啊，好的！稍等一下。', zhEn: 'Oh, okay! Just a moment.',
        },
      ],
    },
    {
      type: 'featureCard',
      emoji: '🛍️',
      title: '🛍️ 场景五：进店和离店', titleEn: '🛍️ Scene 5: Entering and leaving a store',
      scenes: [
        {
          speaker: '店员', speakerEn: 'Store clerk',
          ko: '어서오세요!',
          ro: 'eo-seo-o-se-yo',
          zh: '欢迎光临！', zhEn: 'Welcome!',
        },
        {
          speaker: '你（离开时）', speakerEn: 'You (when leaving)',
          ko: '감사합니다!',
          ro: 'gam-sa-ham-ni-da',
          zh: '谢谢！（离店时说，让店员感到被尊重）', zhEn: 'Thank you! (Said when leaving to show respect to the staff)',
        },
        {
          speaker: '店员', speakerEn: 'Store clerk',
          ko: '감사합니다. 또 오세요!',
          ro: 'gam-sa-ham-ni-da. tto o-se-yo',
          zh: '谢谢。欢迎再来！', zhEn: 'Thank you. Please come again!',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '↔️',
      title: '韩国 vs 中国打招呼文化对比', titleEn: 'Korean vs. Chinese Greeting Culture',
      sub: '了解差异，就不会踩坑', subEn: 'Know the differences, avoid the pitfalls',
    },
    {
      type: 'compareVs',
      left: {
        title: '🇰🇷 韩国的习惯', titleEn: '🇰🇷 Korean customs',
        items: [
          '见面必须主动打招呼，不打是失礼',
          '对长辈用敬语，语体不能混用',
          '吃饭前后有固定的打招呼用语',
          '离开时必须说"먼저 들어가겠습니다"',
          '收到礼物立刻当面打开可能失礼',
          '问"밥 먹었어요？"是打招呼，不是真的问你吃了吗',
        ],
      },
      right: {
        title: '🇨🇳 中国的习惯', titleEn: '🇨🇳 Chinese customs',
        items: [
          '不认识的人可以不打招呼',
          '敬语不如韩语系统化，相对灵活',
          '吃饭前后一般没有固定用语',
          '离开通常说"拜拜"或"走了"',
          '收到礼物当场拆开很正常',
          '"吃了吗"作为打招呼在很多地区也有',
        ],
      },
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🔍',
      title: '打招呼文化冷知识', titleEn: 'Greeting culture trivia',
      sub: '这些你在教科书上学不到', subEn: 'You won\'t learn this in textbooks',
    },
    {
      type: 'trivia',
      items: [
        {
          tag: '语言冷知识', tagEn: 'Language trivia',
          q: '韩国人真的会问"밥 먹었어요？"打招呼吗？', qEn: 'Do Koreans really greet with "밥 먹었어요?"?',
          a: '是真的。特别是中老年人和农村地区，用"밥 먹었어요？（吃饭了吗？）"打招呼非常普遍。这个习惯来自农耕时代——能吃饱饭是幸福的象征。现在年轻人已经不太这样问了，但在亲戚长辈间还很常见。', aEn: 'Yes, it\'s true. Especially among middle-aged and older people and in rural areas, greeting with "밥 먹었어요? (Have you eaten?)" is very common. This habit comes from the farming era—being able to eat well was a symbol of happiness. Nowadays, younger people don\'t ask this as much, but it\'s still common among relatives and elders.',
        },
        {
          tag: '职场文化', tagEn: 'Workplace culture',
          q: '为什么韩国人下班前要跟所有人打招呼？', qEn: 'Why do Koreans greet everyone before leaving work?',
          a: '在韩国职场，先离开的人必须向每个人说"먼저 들어가겠습니다（我先走了）"，留下来的人回应"수고하셨습니다（辛苦了）"。这是职场礼仪的核心，跳过任何一个人都可能造成关系紧张。很多韩国剧场景里都有这个细节。', aEn: 'In Korean workplaces, the person leaving first must say "먼저 들어가겠습니다 (I\'ll head out first)" to everyone, and those staying respond with "수고하셨습니다 (Good work)". This is core workplace etiquette—skipping anyone can cause tension. You\'ll see this detail in many K-drama scenes.',
        },
        {
          tag: '称谓文化', tagEn: 'Forms of address',
          q: '韩国人为什么不直接叫名字？', qEn: 'Why don\'t Koreans call people by their first names?',
          a: '在韩国，直接叫一个人的名字（特别是比你年长的人）是非常失礼的行为。通常用职位称呼（팀장님、사장님）、关系称谓（언니、오빠、선생님），或者加上"씨"（类似"先生/女士"）。아래의 직원에게도 함부로 이름만 부르지 않아요。', aEn: 'In Korea, calling someone directly by their name (especially someone older than you) is very rude. Usually, you use job titles (팀장님, 사장님), relationship terms (언니, 오빠, 선생님), or add "씨" (similar to "Mr./Ms."). Even for the staff below, you shouldn\'t casually call them just by their name.',
        },
        {
          tag: '나이 문화',
          q: '为什么韩国人见面就问年龄？', qEn: 'Why do Koreans ask your age when they first meet?',
          a: '因为语体的使用取决于年龄关系。两个陌生人见面，不知道对方年龄就不知道该用什么体说话——这在韩国是一个实际的语言问题，不只是好奇。问年龄是为了确定"我们是什么关系"，是敬语体系驱动的社会行为。', aEn: 'Because speech levels depend on age. When two strangers meet, not knowing the other\'s age means not knowing which speech level to use—this is a real linguistic problem in Korea, not just curiosity. Asking age is about figuring out "what we are to each other," a social move driven by the honorific system.',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '💼',
      title: '职场和商务场合——问候的升级版', titleEn: 'Work and business settings—greetings, upgraded',
      sub: '面试、实习、见客户——这些场合的规则比日常严格得多', subEn: 'Interviews, internships, client meetings—the rules here are far stricter than everyday life',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          emoji: '🤝',
          zh: '握手 + 鞠躬 —— 两样都要做', zhEn: 'Handshake + bow—do both',
          desc: '韩国商务场合的标准问候是轻微鞠躬（约 15 度），同时右手握手，左手托住右前臂或轻扶对方肘部表示尊敬。只用单手握手且不鞠躬，会被认为随意甚至傲慢。女性在商务场合通常先微笑鞠躬，等对方（特别是男性）主动伸手再握手——直接伸手有时会让传统年长者不适。握手力度不要太强，韩国人偏好轻柔的握手。', descEn: 'The standard business greeting is a slight bow (about 15 degrees) while shaking hands with your right hand, with your left hand supporting your right forearm or lightly touching the other\'s elbow to show respect. A one-handed handshake without a bow comes off as casual or even arrogant. Women in business settings usually smile and bow first, then wait for the other person—especially a man—to extend their hand; reaching out directly can make older, traditional types uncomfortable. Don\'t grip too hard—Koreans prefer a gentle handshake.',
        },
        {
          emoji: '📇',
          zh: '명함（名片）——韩国商务的核心仪式', zhEn: '명함 (business cards)—the core ritual of Korean business',
          desc: '递名片必须双手，文字朝向对方方便阅读。收到名片后不要立刻收进口袋——要先花 5-10 秒认真看名字和职位，然后放在面前的桌上（参会期间一直保持可见）。在名片上写字、把名片放裤后兜、或者当扑克牌一样分发给多人，都是严重失礼。准备韩文/英文双语名片是最基本的诚意。', descEn: 'Always present your business card with both hands, text facing the other person for easy reading. After receiving a card, don\'t pocket it right away—take 5-10 seconds to look at the name and title, then place it on the table in front of you (keep it visible throughout the meeting). Writing on a card, tucking it in your back pocket, or dealing them out like playing cards are all serious faux pas. Having bilingual Korean/English cards is the bare minimum of sincerity.',
        },
        {
          emoji: '🏢',
          zh: '회사에서의 호칭（公司里的称呼）', zhEn: '회사에서의 호칭 (titles at the office)',
          desc: '韩国公司里几乎从不直呼名字。必须用职位 + 님：김 부장님（金部长）、이 과장님（李科长）、박 대리님（朴代理）。사원/신입（新员工）通常被叫"성함 + 씨"。记住对方的准确职位很重要——叫低了会让人不悦。韩剧里下属对上司绝不会叫名字，这是完全符合现实的。', descEn: 'In Korean companies, first names are almost never used. You must use title + 님: 김 부장님 (Manager Kim), 이 과장님 (Section Chief Lee), 박 대리님 (Assistant Manager Park). New employees (사원/신입) are usually called "name + 씨." Getting someone\'s exact title right matters—understating it will annoy them. In K-dramas, subordinates never call bosses by name—that\'s completely accurate.',
        },
      ],
    },
    {
      type: 'highlight',
      variant: 'warning',
      title: '🙏 去韩国之前要知道', titleEn: '🙏 What to know before going to Korea',
      text: '在韩国遇到任何人，先用해요체（안녕하세요），这是最安全的选择。不要因为对方年纪看起来差不多就直接用반말——除非对方明确说"말 놓자"。另外，收到"수고하셨습니다"时，正确回应是同样的"수고하셨습니다"或者"네, 감사합니다"，不是点头就走。', textEn: 'When you meet anyone in Korea, start with 해요체 (안녕하세요)—it\'s the safest choice. Don\'t switch to 반말 just because someone looks your age—unless they explicitly say "말 놓자." Also, when someone says "수고하셨습니다," the right response is the same "수고하셨습니다" or "네, 감사합니다"—not a nod and a walk-off.',
    },
    {
      type: 'phraseList',
      title: '토리 教你说——打招呼必备韩语', titleEn: '토리 teaches you—essential Korean greetings',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        {
          ko: '안녕하세요.',
          ro: 'an-nyeong-ha-se-yo',
          scene: '👋 见面时，任何场合', sceneEn: '👋 When you meet, any occasion',
          zh: '你好 / 您好', zhEn: 'Hello',
        },
        {
          ko: '처음 뵙겠습니다.',
          ro: 'cheo-eum boep-get-sseum-ni-da',
          scene: '🤝 第一次见面', sceneEn: '🤝 First meeting',
          zh: '初次见面', zhEn: 'first meeting',
        },
        {
          ko: '잘 부탁드립니다.',
          ro: 'jal bu-tak-deu-rim-ni-da',
          scene: '🙏 初次见面后', sceneEn: '🙏 After the first meeting',
          zh: '请多关照', zhEn: 'please take care of me',
        },
        {
          ko: '잘 먹겠습니다.',
          ro: 'jal meok-get-sseum-ni-da',
          scene: '🍽️ 吃饭前必说', sceneEn: '🍽️ What to say before eating',
          zh: '我开动了', zhEn: 'I\'ll eat well',
        },
        {
          ko: '수고하셨습니다.',
          ro: 'su-go-ha-syeot-sseum-ni-da',
          scene: '💼 对方结束工作时', sceneEn: '💼 When the other person finishes work',
          zh: '辛苦了', zhEn: 'You\'ve worked hard',
        },
        {
          ko: '먼저 들어가겠습니다.',
          ro: 'meon-jeo deu-reo-ga-get-sseum-ni-da',
          scene: '🚪 比别人先离开时', sceneEn: '🚪 When leaving before others',
          zh: '我先失陪了', zhEn: 'I\'ll take my leave first',
        },
        {
          ko: '안녕히 계세요.',
          ro: 'an-nyeong-hi gye-se-yo',
          scene: '👋 自己离开时对留下的人', sceneEn: '👋 When you leave and others stay',
          zh: '再见（你留下，我走）', zhEn: 'Goodbye (you stay, I go)',
        },
        {
          ko: '안녕히 가세요.',
          ro: 'an-nyeong-hi ga-se-yo',
          scene: '👋 自己留下时对离开的人', sceneEn: '👋 When you stay and others leave',
          zh: '再见（我留下，你走）', zhEn: 'Goodbye (I\'m staying, you\'re leaving)',
        },
      ],
    },
    {
      type: 'sectionTitle',
      emoji: '📖',
      title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson',
    },
    {
      type: 'vocabList',
      items: [
        { ko: '인사', zh: '打招呼·问候', zhEn: 'Greetings & Salutations' },
        { ko: '안녕하세요', zh: '你好', zhEn: 'Hello' },
        { ko: '반갑습니다', zh: '幸会·很高兴', zhEn: 'Nice to Meet You · Pleased' },
        { ko: '감사합니다', zh: '谢谢', zhEn: 'Thank you' },
        { ko: '수고하셨습니다', zh: '辛苦了', zhEn: 'You\'ve worked hard' },
        { ko: '반말', zh: '非正式语·反语', zhEn: 'Informal · Ironic' },
        { ko: '경어', zh: '敬语', zhEn: 'honorifics' },
        { ko: '여보세요', zh: '喂（电话用）', zhEn: 'Hello (on the phone)' },
        { ko: '처음 뵙겠습니다', zh: '初次见面', zhEn: 'first meeting' },
        { ko: '잘 부탁드립니다', zh: '请多关照', zhEn: 'please take care of me' },
        { ko: '어서오세요', zh: '欢迎光临', zhEn: 'Welcome' },
        { ko: '또 오세요', zh: '欢迎再来', zhEn: 'Welcome Back' },
      ],
    },
    {
      type: 'ending',
      text: '打招呼是通向韩国人心里的第一扇门\n\n学会了안녕하세요谁都会说，但知道什么时候用반말、什么时候鞠躬多少度，才是真正懂韩国的人。下一篇，토리 带你认识韩国最重要的两个节日 🎎', textEn: 'Greetings are the first door to a Korean\'s heart\\n\\nAnyone can learn to say 안녕하세요, but knowing when to use 반말 and how deep to bow is what truly makes you understand Korea. Next up, 토리 introduces you to Korea\'s two most important holidays 🎎',
    },
  ],
},
  {
  slug: 'korean-holidays',
  category: 'culture',
  title: '韩国节日完全手册', titleEn: 'The Complete Guide to Korean Holidays',
  subtitle: '명절과 기념일 — 从春节到Pepero Day，一年都在过节', subtitleEn: '명절과 기념일 — From Seollal to Pepero Day, There\'s Always a Holiday',
  emoji: '🎎',
  readMinutes: 10,
  bannerImage: '/images/banners/korean-holidays.webp',
  blocks: [
    {
      type: 'toriQuote',
      label: '토리 说', labelEn: 'Tori says',
      text: '토리刚到首尔的时候赶上了추석前一天，整个城市突然就空了——地铁上没什么人，餐厅关了大半，就连平时排长队的咖啡厅也早早打烊。后来才知道，추석是韩国一年中最重要的节日之一，所有人都回老家了。节日对韩国人来说不是"放个假"，而是整个民族的情感仪式。今天토리 把韩国主要节日全部整理给你——不只告诉你那天做什么，还告诉你为什么这样做 🎎', textEn: 'When 토리 first arrived in Seoul, it was the day before 추석, and the whole city suddenly emptied out—the subway was nearly empty, most restaurants were closed, and even the usually packed coffee shops shut early. Later, I learned that 추석 is one of Korea\'s most important holidays, and everyone goes back to their hometowns. For Koreans, holidays aren\'t just "a day off"—they\'re an emotional ritual for the whole nation. Today, 토리 has compiled all of Korea\'s major holidays for you—not just what to do on that day, but why it\'s done that way 🎎',
    },
    {
      type: 'sectionTitle',
      emoji: '📅',
      title: '韩国节日年历总览', titleEn: 'Korean Holiday Calendar Overview',
      sub: '从正月初一到除夕，一年的节日都在这里', subEn: 'From the first day of the lunar new year to New Year\'s Eve, all the year\'s holidays are here',
    },
    {
      type: 'timeline',
      items: [
        { label: '설날 (설날)', desc: '1月 음력 · 韩国春节 · 农历正月初一 · ★ 最重要', descEn: 'January (lunar) · Seollal (Korean New Year) · 1st day of the 1st lunar month · ★ Most Important' },
        { label: '정월대보름', desc: '1月 음력 · 正月十五 · 大满月节 · 传统节日', descEn: 'January (lunar) · Daeboreum (First Full Moon) · 15th day of the 1st lunar month · Traditional Holiday' },
        { label: '삼일절', desc: '3月 1日 · 三一节 · 独立运动纪念日 · 国家节日', descEn: 'March 1 · Samiljeol (Independence Movement Day) · National Holiday' },
        { label: '어린이날', desc: '5月 5日 · 儿童节 · 国家节日', descEn: 'May 5 · Children\'s Day · National Holiday' },
        { label: '부처님오신날', desc: '5月 음력 · 释迦诞辰日 · 农历四月初八 · 传统节日', descEn: 'May (lunar) · Buddha\'s Birthday · 8th day of the 4th lunar month · Traditional Holiday' },
        { label: '현충일', desc: '6月 6日 · 显忠日 · 烈士纪念日 · 国家节日', descEn: 'June 6 · Memorial Day · National Holiday' },
        { label: '광복절', desc: '8月 15日 · 光复节 · 独立纪念日 · 国家节日', descEn: 'August 15 · Gwangbokjeon (Liberation Day) · National Holiday' },
        { label: '추석 (秋夕)', labelEn: 'Chuseok (Autumn Eve)', desc: '9月 음력 · 韩国中秋 · 农历八月十五 · ★ 最重要', descEn: 'September (lunar) · Chuseok (Korean Thanksgiving) · 15th day of the 8th lunar month · ★ Most Important' },
        { label: '개천절', desc: '10月 3日 · 开天节 · 建国神话纪念日 · 国家节日', descEn: 'October 3 · Gaecheonjeol (National Foundation Day) · National Holiday' },
        { label: '한글날', desc: '10月 9日 · 韩文节 · 훈민정음颁布纪念日 · 国家节日', descEn: 'October 9 · Hangeul Day · Anniversary of the Proclamation of 훈민정음 · National Holiday' },
        { label: '크리스마스', desc: '12月 25日 · 圣诞节 · 节假日', descEn: 'December 25 · Christmas · Public Holiday' },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🎊',
      title: '설날 — 韩国最重要的节日', titleEn: 'Seollal — Korea\'s Most Important Holiday',
      sub: '农历正月初一，全家团聚、祭祖、拜年', subEn: 'The first day of the lunar new year, when families gather, honor ancestors, and exchange New Year greetings',
    },
    {
      type: 'paragraph',
      heading: '설날 · 農曆 正月初一 · 법정공휴일 3일', headingEn: 'Seollal · Lunar New Year\'s Day · Legal holiday for 3 days',
      text: '韩国春节 · 一年中最重要的家庭节日', textEn: 'Korean New Year · The most important family holiday of the year',
    },
    {
      type: 'paragraph',
      heading: '🏠 설날是什么感觉', headingEn: '🏠 What does Seollal feel like?',
      text: '설날前后的首尔，高速公路会出现韩国一年中最严重的堵车——所有人都在往老家赶。韩国有个说法叫 민족 대이동（民族大迁徙），설날前后几天，全国约3000万人在路上移动。传统적으로（传统上），설날是一家人穿上한복（韩服）、进行차례（祭祖仪式）、向长辈行세배（新年大礼）的日子。长辈会给晚辈压岁钱，叫做 세뱃돈。', textEn: 'Around Seollal, Seoul\'s highways see the worst traffic of the year—everyone is heading home. Koreans call this 민족 대이동 (the Great Migration), with about 30 million people on the move nationwide. Traditionally, Seollal is a day when families wear 한복 (hanbok), perform 차례 (ancestral rites), and bow to elders in 세배 (New Year\'s greetings). Elders give younger family members money called 세뱃돈.',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        { emoji: '🍜', ko: '떡국', zh: '年糕汤', zhEn: 'Rice cake soup', desc: '설날必吃，白色年糕切片煮成清汤。吃了一碗떡국就算长了一岁，这是韩国的传统说法。', descEn: 'A must-eat on Seollal, made by slicing white rice cakes into a clear soup. Eating a bowl of 떡국 means you\'ve aged a year, as the tradition goes.' },
        { emoji: '🥟', ko: '만두', zh: '饺子', zhEn: 'dumplings', desc: '설날期间家家包饺子，有时放进떡국里一起煮，叫做 떡만둣국。形状象征财富和好运。', descEn: 'During Seollal, families make dumplings, sometimes added to 떡국 to make 떡만둣국. Their shape symbolizes wealth and good luck.' },
        { emoji: '🍱', ko: '전 (煎饼)', zh: '韩式煎饼', zhEn: 'Korean savory pancakes', desc: '설날祭祀必备供品之一，有海鲜煎饼、蔬菜煎饼、肉煎饼等，全家一起煎，厨房里热热闹闹。', descEn: 'A key offering for Seollal rites, with varieties like seafood, vegetable, and meat jeon. The whole family fries them together, filling the kitchen with lively energy.' },
      ],
    },
    {
      type: 'steps',
      steps: [
        { label: '차례（祭祖仪式）', labelEn: 'Charye (ancestral rite)', desc: '清晨，全家在祖先牌位前摆放供品、进行祭祀仪式。这是설날最神圣的环节，不能缺席。', descEn: 'At dawn, the family sets out offerings before the ancestral tablets and performs the rite. This is the most sacred part of Seollal and not to be missed.' },
        { label: '세배（新年大礼）', labelEn: 'Sebae (New Year\'s bow)', desc: '祭祀完毕，晚辈向长辈行大礼（深度鞠躬），说新年祝福语，长辈给세뱃돈（压岁钱）。', descEn: 'After the rite, younger members bow deeply to elders with New Year\'s wishes, and elders give 세뱃돈 (lucky money).', ko: '새해 복 많이 받으세요', ro: 'sae-hae bok ma-ni ba-deu-se-yo', zh: '新年多福', zhEn: 'Wishing you a new year full of blessings' },
        { label: '떡국 식사（年糕汤早餐）', labelEn: 'Tteokguk meal (rice cake soup breakfast)', desc: '祭祀和拜年结束后，全家一起吃떡국。吃了这碗汤，新的一年正式开始。', descEn: 'After the rites and bows, the family shares 떡국 together. Eating this soup marks the official start of the new year.' },
        { label: '친척 방문（走亲访友）', labelEn: 'Visiting relatives', desc: '下午开始拜访亲戚，到每家都要重复세배流程。对韩国孩子来说，세뱃돈是설날最期待的事。', descEn: 'In the afternoon, we start visiting relatives, repeating the sebae ritual at every house. For Korean kids, sebaetdon is the most anticipated part of Seollal.' },
      ],
    },
    {
      type: 'featureCard',
      title: '설날 祝福语', titleEn: 'Seollal greeting',
      desc: '설날最标准的祝福语，任何场合都能用。对长辈说时要配上鞠躬。年轻人之间也可以简化为 새해 복 많이 받아！', descEn: 'The standard Seollal greeting, suitable for any occasion. Pair it with a bow when saying it to elders. Among friends, it can be shortened to 새해 복 많이 받아!',
      scenes: [
        { ko: '새해 복 많이 받으세요.', ro: 'sae-hae bok ma-ni ba-deu-se-yo', zh: '新年多福。', zhEn: 'Wishing you a new year full of blessings.' },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🌕',
      title: '추석 — 韩国的中秋节', titleEn: 'Chuseok — Korea\'s Thanksgiving',
      sub: '农历八月十五，一年中月亮最圆的夜晚', subEn: 'The 15th day of the 8th lunar month, the night of the fullest moon of the year',
    },
    {
      type: 'paragraph',
      heading: '추석 (秋夕) · 農曆 八月十五 · 법정공휴일 3일', headingEn: 'Chuseok (Autumn Eve) · 15th day of the 8th lunar month · Legal holiday for 3 days',
      text: '韩国中秋 · 丰收与感恩的节日', textEn: 'Korean Chuseok · A Festival of Harvest and Gratitude',
    },
    {
      type: 'paragraph',
      heading: '🌾 추석是什么感觉', headingEn: '🌾 What Does Chuseok Feel Like?',
      text: '如果说설날是"新年的仪式感"，추석就是"丰收的感恩"。农历八月十五，一年的庄稼刚刚收获，韩国人带着新收的粮食、水果、食物回到故乡，祭拜祖先，感谢这一年的恩赐。추석和설날并称韩国两大 명절（大节日），重要程度不相上下。但추석的氛围比설날更轻松——不像설날那样强调礼节，更多是家人聚在一起吃喝玩乐的感觉。', textEn: 'If Seollal is about "the ritual of a new year," Chuseok is about "gratitude for the harvest." On the 15th day of the 8th lunar month, right after the year\'s crops are brought in, Koreans return to their hometowns with freshly harvested grains, fruits, and food to honor their ancestors and give thanks for the year\'s blessings. Chuseok and Seollal are Korea\'s two major holidays (명절), equally important. But Chuseok has a more relaxed vibe than Seollal—less about formal etiquette, more about family gathering to eat, drink, and have fun.',
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '토리 亲测', titleEn: '토리 tested it',
      text: '추석前一周的首尔超市，礼盒区全部爆满。韩国人추석要给长辈、同事、客户送礼，最受欢迎的是SPAM（午餐肉）礼盒、人参、水果礼盒。是的，SPAM在韩国是高档礼品。', textEn: 'A week before Chuseok, the gift set sections in Seoul supermarkets are completely packed. Koreans give gifts to elders, colleagues, and clients during Chuseok, with the most popular being SPAM (luncheon meat) sets, ginseng, and fruit baskets. Yes, SPAM is considered a premium gift in Korea.',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        { emoji: '🍡', ko: '송편', zh: '松糕', zhEn: 'Songpyeon (Half-Moon Rice Cake)', desc: '추석最具代表性的食物，用松树叶蒸制的半月形米糕，内馅有芝麻、豆沙、板栗。全家一起包송편是추석的重要仪式。', descEn: 'The most iconic Chuseok food—a half-moon-shaped rice cake steamed with pine needles, filled with sesame, red bean paste, or chestnut. Making songpyeon together as a family is an important Chuseok tradition.' },
        { emoji: '🥩', ko: '갈비찜', zh: '炖排骨', zhEn: 'Braised Short Ribs', desc: '추석餐桌上几乎必备，用酱油、梨、大蒜慢炖的牛排骨，软烂入味。代表丰盛和团聚。', descEn: 'A Chuseok table staple—beef short ribs slow-braised with soy sauce, pear, and garlic until tender and flavorful. It symbolizes abundance and family reunion.' },
        { emoji: '🍶', ko: '햇과일 · 햇곡식', zh: '新鲜水果谷物', zhEn: 'Fresh Fruits and Grains', desc: '추석祭桌上必须摆当季新收的水果（梨、柿子、苹果）和谷物，象征对大地和祖先的感谢。', descEn: 'Chuseok memorial tables must include freshly harvested seasonal fruits (pears, persimmons, apples) and grains, symbolizing gratitude to the land and ancestors.' },
      ],
    },
    {
      type: 'paragraph',
      heading: '🌕 강강술래——追月的圆圈舞', headingEn: '🌕 Ganggangsullae—The Moonlit Circle Dance',
      text: '추석传统活动中最有名的是강강술래——女性们在月光下手拉手绕圈跳舞，唱着同名歌谣，祈求丰收和幸福。这个传统可以追溯到400多年前的朝鲜时代，现在已经是韩国非物质文化遗产。虽然现代城市年轻人很少真正去跳강강술래，但每年추석节目里一定会出现这个画面，是韩国人集体记忆的一部分。', textEn: 'The most famous traditional Chuseok activity is ganggangsullae—women holding hands and dancing in a circle under the moonlight, singing the song of the same name to pray for a bountiful harvest and happiness. This tradition dates back over 400 years to the Joseon Dynasty and is now a UNESCO-recognized intangible cultural heritage. While modern city youth rarely actually dance ganggangsullae, it always appears in Chuseok TV programs every year—it\'s part of Korea\'s collective memory.',
    },
    {
      type: 'featureCard',
      title: '추석 祝福语', titleEn: 'Chuseok Greetings',
      desc: '추석最常用的祝福语，풍성하다意思是"丰盛、丰收"，完美契合추석的节日精神。也可以说 즐거운 추석 되세요（祝您추석快乐）。', descEn: 'The most common Chuseok greeting. Pungsonghada means "abundant, bountiful," perfectly capturing the spirit of Chuseok. You can also say jeulgeoun chuseok doeseyo (Have a happy Chuseok).',
      scenes: [
        { ko: '풍성한 추석 보내세요.', ro: 'pung-seong-han chu-seok bo-nae-se-yo', zh: '祝您过个丰盛的추석。', zhEn: 'Wishing you a bountiful Chuseok.' },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '↔️',
      title: '설날 vs 추석——两大节日有什么不同', titleEn: 'Seollal vs Chuseok—What\'s the Difference Between Korea\'s Two Biggest Holidays?',
      sub: '同样重要，但氛围和意义不一样', subEn: 'Equally important, but different in mood and meaning',
    },
    {
      type: 'table',
      head: ['对比', '설날 🎊', '추석 🌕'],
      rows: [
        ['时间', '农历正月初一（1-2月）', '农历八月十五（9-10月）'],
        ['核心含义', '新年开始，祈求新年福祉', '丰收感恩，祭拜祖先'],
        ['代表食物', '떡국（年糕汤）、만두', '송편（松糕）、갈비찜'],
        ['氛围感', '庄重、仪式感强', '轻松、丰收欢庆'],
        ['压岁钱', '세뱃돈（孩子必拿）', '없음（没有压岁钱）'],
        ['特有活动', '세배（新年大礼）', '강강술래（圆圈舞）'],
        ['送礼文化', '有但不如추석普遍', '非常重视，职场礼盒文化'],
        ['中国对应', '春节', '中秋节（但意义更接近感恩节）'],
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🗓️',
      title: '其他值得了解的节日', titleEn: 'Other Holidays Worth Knowing',
      sub: '这些节日让韩国文化更立体', subEn: 'These holidays add depth to Korean culture',
    },
    {
      type: 'paragraph',
      heading: '👶 어린이날 5月5日 · 儿童节', headingEn: '👶 Children\'s Day (May 5th)',
      text: '韩国儿童节是正式公众假日，全国所有学校放假。这一天，韩国父母倾尽全力带孩子出去玩，游乐园、动物园、餐厅全部爆满。어린이날的起源来自作家方定焕，他在1923年提倡儿童人权，将这一天定为"儿童节"。如今韩国어린이날比很多国家的儿童节更受重视。', textEn: 'Children\'s Day is an official public holiday in Korea, with all schools closed nationwide. On this day, Korean parents go all out to take their kids out—amusement parks, zoos, and restaurants are completely packed. Children\'s Day originated with writer Bang Jeong-hwan, who advocated for children\'s rights in 1923 and designated this day as "Children\'s Day." Today, Children\'s Day in Korea is taken far more seriously than in many other countries.',
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '토리 说', titleEn: 'Tori says',
      text: '어린이날前后去首尔的话，롯데월드（乐天世界）和에버랜드（爱宝乐园）会排到一两个小时的队，要有心理准备。', textEn: 'If you visit Seoul around Children\'s Day, expect 1-2 hour lines at Lotte World and Everland—be prepared.',
    },
    {
      type: 'paragraph',
      heading: '📜 한글날 10月9日 · 韩文节', headingEn: '📜 Hangeul Day (October 9th)',
      text: '1446年，朝鲜世宗大王颁布훈민정음（训民正音），也就是今天韩文字母的前身。한글날是纪念这一历史时刻的国家节日。对韩国人来说，한글是民族自豪感的核心——在한글被创造之前，朝鲜半岛用汉字书写，普通百姓无法读写。세종대왕创造한글，就是为了让所有人都能识字。这是韩国历史上最伟大的文化贡献之一。', textEn: 'In 1446, King Sejong the Great promulgated Hunminjeongeum, the precursor to today\'s Korean alphabet. Hangeul Day is a national holiday commemorating this historic moment. For Koreans, Hangeul is at the core of national pride—before its creation, the Korean Peninsula was written in Chinese characters, which ordinary people couldn\'t read or write. King Sejong created Hangeul so that everyone could become literate. It\'s one of the greatest cultural contributions in Korean history.',
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '和你学的东西直接相关', titleEn: 'Directly related to what you\'re learning',
      text: '你正在学的韩语字母，就是580年前一位国王专门为普通人发明的。한글날，是感谢세종대왕的日子。', textEn: 'The Korean alphabet you\'re learning was invented 580 years ago by a king specifically for ordinary people. 한글날 is a day to thank 세종대왕.',
    },
    {
      type: 'paragraph',
      heading: '🎄 크리스마스 12月25日 · 圣诞节', headingEn: '🎄 크리스마스 December 25 · Christmas',
      text: '韩国有约30%的人口是基督徒，圣诞节是韩国为数不多在宗教意义上被广泛认可的西方节日，也是唯一的西方节假日。但韩国的圣诞节更多是情侣节日而非家庭节日——类似西方的情人节。首尔的圣诞节满街圣诞树和彩灯，情侣们出来约会，而不是回家和父母吃火鸡。', textEn: 'About 30% of Korea\'s population is Christian, making Christmas one of the few Western holidays widely recognized on a religious level—and the only Western public holiday. But in Korea, Christmas is more of a couples\' holiday than a family one—similar to Valentine\'s Day in the West. On Christmas in Seoul, the streets are full of trees and lights, and couples go out on dates instead of going home to eat turkey with their parents.',
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '토리 说', titleEn: 'Tori says',
      text: '如果설날和추석是家庭的节日，크리스마스是情侣的节日。韩国的情人节实际上有三个：2月14日（女送男）、3月14日白色情人节（男送女）、11月11日빼빼로데이（互送棒棒糖饼干）。', textEn: 'If 설날 and 추석 are family holidays, 크리스마스 is a couples\' holiday. Korea actually has three Valentine\'s Days: February 14 (women give to men), March 14 White Day (men give to women), and November 11 빼빼로데이 (people exchange Pepero sticks).',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🔄',
      title: '명절在改变——年轻一代怎么过节', titleEn: '명절 is changing—how the younger generation celebrates',
      sub: '차례减少、혼추족增多、디지털 세뱃돈——韩国人正在重新定义"过节"', subEn: 'Fewer 차례, more 혼추족, digital 세뱃돈—Koreans are redefining what it means to "celebrate the holidays"',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          zh: '차례（祭祖仪式）在消失', zhEn: '차례 (ancestral rites) are disappearing',
          desc: '2016 年有 74.4% 的家庭在 설날/추석 准备祭祖桌，到 2025 年这个比例降到了 40.4%。20-39 岁年轻人中，约 60% 赞成废除 차례。取而代之的是简化版仪式、全家外出就餐、或者完全跳过。一位银行职员家庭在祖母去世后全票通过了"从此取消 차례，节日改成一起出去吃"的决议。', descEn: 'In 2016, 74.4% of families prepared ancestral rites tables for 설날/추석, but by 2025 that number had dropped to 40.4%. Among young people aged 20-39, about 60% support abolishing 차례. In its place: simplified ceremonies, family outings to restaurants, or skipping it entirely. One bank employee\'s family, after their grandmother passed away, unanimously voted to "cancel 차례 from now on and go out to eat together instead."',
        },
        {
          zh: '혼추족 · 一个人过节很正常', zhEn: '혼추족 · celebrating alone is totally normal',
          desc: '韩国 1 人家庭占比已超过 25%。2024 年调查显示，超过一半受访者计划独自度过 명절。便利店（GS25/CU）在 설날 期间推出的 1 人份 떡국（年糕汤）便当和节日套餐专门瞄准这个群体。송편和전（煎饼）也有了单人份和外卖选项——这对 20 年前的韩国来说是无法想象的。', descEn: 'Single-person households now make up over 25% of Korea. A 2024 survey found that more than half of respondents planned to spend 명절 alone. Convenience stores (GS25/CU) roll out single-serving 떡국 (rice cake soup) lunchboxes and holiday sets during 설날 specifically for this group. 송편 and 전 (pancakes) now come in single portions with delivery options—something unimaginable in Korea 20 years ago.',
        },
        {
          zh: '여행 · 假期不再等于回家', zhEn: '여행 · holidays no longer mean going home',
          desc: '2025 年 추석 期间仁川机场预计接待 245 万旅客（超过疫情前水平）。47% 的受访者计划在 명절 期间旅行（30.5% 国内、16.9% 海外）。最典型的"反传统"选择：飞东南亚海岛度假，全家 WhatsApp 群里发个红包。', descEn: 'During 추석 2025, Incheon Airport is expected to handle 2.45 million passengers (above pre-pandemic levels). 47% of respondents plan to travel during 명절 (30.5% domestic, 16.9% overseas). The most typical "anti-traditional" choice: flying to a Southeast Asian island for vacation and sending a digital red envelope in the family WhatsApp group.',
        },
        {
          zh: '디지털 세뱃돈 · 线上红包取代现金', zhEn: '디지털 세뱃돈 · digital red envelopes replacing cash',
          desc: '超过 41% 的韩国人现在用 카카오톡 송금（KakaoTalk 转账）或 네이버페이 发 세뱃돈（压岁钱）。2025 年 설날 调查显示，最受欢迎的礼物形式依次是：商品券（51%）、肉类（36.8%）、现金转账（32.9%）。传统的 과일세트（水果礼盒）正在被取代。', descEn: 'Over 41% of Koreans now send 세뱃돈 (New Year\'s money) via 카카오톡 송금 (KakaoTalk transfers) or 네이버페이. A 2025 설날 survey showed the most popular gift formats were: gift vouchers (51%), meat (36.8%), and cash transfers (32.9%). The traditional 과일세트 (fruit gift sets) are being phased out.',
        },
      ],
    },
    {
      type: 'sectionTitle',
      emoji: '🔍',
      title: '节日文化冷知识', titleEn: 'Holiday culture fun facts',
      sub: '这些细节让你看韩剧时更有代入感', subEn: 'These details will make you feel more immersed when watching K-dramas',
    },
    {
      type: 'trivia',
      items: [
        { tag: '礼盒文化', tagEn: 'Gift set culture', q: '为什么SPAM午餐肉是韩国명절的豪华礼品？', qEn: 'Why is SPAM luncheon meat a luxury gift for Korean 명절?', a: '韩战时期，美军把SPAM带进了韩国。在物资匮乏的年代，能吃到罐头肉是极大的奢侈。这种印象延续至今，SPAM礼盒在추석和설날是正经的高档礼品，精心包装，售价不低。这是韩国独有的历史文化印记。', aEn: 'During the Korean War, the U.S. military brought SPAM to Korea. In an era of scarcity, being able to eat canned meat was a huge luxury. That impression persists to this day—SPAM gift sets are a legitimate high-end gift for 추석 and 설날, beautifully packaged and not cheap. It\'s a unique historical and cultural mark of Korea.' },
        { tag: '名节堵车', tagEn: 'Holiday traffic jams', q: '韩国명절堵车有多严重？', qEn: 'How bad is traffic during Korean 명절?', a: '평소（平时）从首尔到釜山开车约4小时。설날和추석前后，同样的路程可能需要10-15小时。韩国人为了省时间，有的选择凌晨3点出发，有的干脆买一张火车票提前三个月。명절交通是韩国社会每年都要讨论的大话题。', aEn: '평소 (normally), driving from Seoul to Busan takes about 4 hours. Around 설날 and 추석, the same trip can take 10-15 hours. To save time, some Koreans leave at 3 AM, while others just buy a train ticket three months in advance. 명절 traffic is a major topic Korea discusses every year.' },
        { tag: '세뱃돈经济学', tagEn: 'The economics of 세뱃돈', q: '韩国孩子能收到多少세뱃돈？', qEn: 'How much 세뱃돈 do Korean kids receive?', a: '首尔的孩子一个설날下来，收到几十万韩元（折合人民币几千元）完全正常。韩国有金融机构专门在설날前推出"세뱃돈 예금（压岁钱存款）"产品，给孩子开账户存압.세뱃돈曾经是韩国人的第一个储蓄概念。', aEn: 'It\'s completely normal for a Seoul kid to walk away from a single 설날 with several hundred thousand won (a few thousand RMB). Korean financial institutions even launch "세뱃돈 예금 (New Year\'s money savings)" products before 설날, letting kids open accounts to stash their cash. 세뱃돈 was once Koreans\' first introduction to saving.' },
        { tag: '现代变化', tagEn: 'Modern Changes', q: '现在的韩国年轻人怎么过명절？', qEn: 'How do young Koreans spend 명절 these days?', a: '越来越多的韩国年轻人选择不回老家，在首尔和朋友一起过节，或者去旅行。명절期间机票酒店反而可能有优惠，因为很多人都出国了。传统명절正在经历转变——仪式感保留，但形式在年轻一代中越来越多元。', aEn: 'More and more young Koreans are choosing not to go back to their hometowns, instead spending the holiday with friends in Seoul or traveling. During 명절, flights and hotels might actually have deals because many people go abroad. Traditional 명절 is undergoing a shift—the sense of ritual remains, but the forms are becoming more diverse among the younger generation.' },
      ],
    },
    {
      type: 'highlight',
      variant: 'warning',
      title: '🗓️ 去韩国前要查一下명절时间', titleEn: '🗓️ Check the 명절 dates before going to Korea',
      text: '설날和추석前后3天是韩国法定假日，大量餐厅、商店、景点会关闭，高速公路极度拥堵，火车票和机票需要提前几个月购买。如果不是专门来体验명절文化，建议避开这几天前往韩国。如果想体验，来추석当天的首尔会看到一个完全不同的城市——安静、空旷、有一种平时感受不到的宁静。', textEn: 'The 3 days around 설날 and 추석 are Korean public holidays. Many restaurants, shops, and attractions close, highways get extremely congested, and train and plane tickets need to be booked months in advance. Unless you\'re specifically coming to experience 명절 culture, it\'s best to avoid these days when visiting Korea. If you do want to experience it, coming to Seoul on 추석 itself will show you a completely different city—quiet, empty, with a peace you can\'t feel at other times.',
    },
    {
      type: 'phraseList',
      title: '토리 教你说——节日必备韩语', titleEn: 'Tori teaches you—essential Korean for the holidays',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        { ko: '새해 복 많이 받으세요.', ro: 'sae-hae bok ma-ni ba-deu-se-yo', scene: '🎊 설날祝福语', sceneEn: '🎊 Seollal greetings', zh: '新年多福', zhEn: 'Wishing you a new year full of blessings' },
        { ko: '풍성한 추석 보내세요.', ro: 'pung-seong-han chu-seok bo-nae-se-yo', scene: '🌕 추석祝福语', sceneEn: '🌕 Chuseok greetings', zh: '祝您추석丰盛', zhEn: 'Wishing you a bountiful Chuseok' },
        { ko: '즐거운 명절 되세요.', ro: 'jeul-geo-un myeong-jeol doe-se-yo', scene: '🎉 通用节日祝福', sceneEn: '🎉 General holiday greetings', zh: '祝您节日快乐', zhEn: 'Happy holidays' },
        { ko: '세배 드릴게요.', ro: 'se-bae deu-ril-ge-yo', scene: '🙇 向长辈行설날大礼前', sceneEn: '🙇 Before the big bow to elders on Seollal', zh: '我来向您行新年礼', zhEn: 'I\'m here to give you the New Year bow' },
        { ko: '올해도 건강하세요.', ro: 'ol-hae-do geon-gang-ha-se-yo', scene: '💚 설날对长辈的祝福', sceneEn: '💚 Seollal wishes for elders', zh: '今年也请保持健康', zhEn: 'Please stay healthy this year too' },
        { ko: '선물을 준비했어요.', ro: 'seon-mu-reul jun-bi-haet-seo-yo', scene: '🎁 送礼时', sceneEn: '🎁 When giving gifts', zh: '我准备了礼物', zhEn: 'I\'ve prepared a gift' },
        { ko: '잘 먹겠습니다.', ro: 'jal meok-get-sseum-ni-da', scene: '🍽️ 节日饭桌上', sceneEn: '🍽️ At the holiday table', zh: '我开动了', zhEn: 'I\'ll eat well' },
      ],
    },
    {
      type: 'vocabList',
      title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson',
      items: [
        { ko: '명절', ro: '', zh: '大节日', zhEn: 'Big holiday' },
        { ko: '설날', ro: '', zh: '韩国春节', zhEn: 'Korean New Year' },
        { ko: '추석', ro: '', zh: '韩国中秋', zhEn: 'Korean Thanksgiving' },
        { ko: '차례', ro: '', zh: '祭祖仪式', zhEn: 'Ancestral rite' },
        { ko: '세배', ro: '', zh: '新年大礼', zhEn: 'New Year\'s big bow' },
        { ko: '세뱃돈', ro: '', zh: '压岁钱', zhEn: 'New Year\'s money (pressed money)' },
        { ko: '떡국', ro: '', zh: '年糕汤', zhEn: 'Rice cake soup' },
        { ko: '송편', ro: '', zh: '松糕', zhEn: 'Songpyeon (Half-Moon Rice Cake)' },
        { ko: '한복', ro: '', zh: '韩服', zhEn: 'Hanbok (traditional Korean clothing)' },
        { ko: '강강술래', ro: '', zh: '圆圈舞', zhEn: 'Circle dance' },
        { ko: '선물', ro: '', zh: '礼物', zhEn: 'Gift' },
        { ko: '한글날', ro: '', zh: '韩文节', zhEn: 'Hangul Day' },
      ],
    },
    {
      type: 'ending',
      text: '설날吃떡국，추석包송편，向长辈行세배，说새해 복 많이 받으세요——这些不只是仪式，是韩国人和时间、和家人、和土地之间的情感纽带。下一篇，토리 带你解读韩剧里那些你看了但没看懂的文化密码 📺', textEn: 'Eating tteokguk on Seollal, making songpyeon for Chuseok, bowing to elders with sebae, and saying saehae bok mani badeuseyo—these aren\'t just rituals; they\'re the emotional ties between Koreans and time, family, and the land. Next up, Tori decodes the cultural secrets in K-dramas you\'ve watched but never fully understood 📺',
      next: { slug: 'korean-drama-culture', title: '韩剧里的文化密码', titleEn: 'The Cultural Codes Hidden in K-Dramas' },
    },
  ],
},
  {
  slug: 'kdrama-culture',
  category: 'culture',
  title: '韩剧里的文化密码', titleEn: 'The Cultural Codes Hidden in K-Dramas',
  subtitle: '드라마 속 문화 — 看懂这些细节，才算真正看懂韩剧', subtitleEn: 'Culture in Dramas—Only by Understanding These Details Can You Truly Get K-Dramas',
  emoji: '🎬',
  readMinutes: 10,
  bannerImage: '/images/banners/kdrama-culture.webp',
  blocks: [
    {
      type: 'toriQuote',
      label: '토리 说', labelEn: 'Tori says',
      text: '토리认识很多人，她们看了几百集韩剧，却不知道为什么男主角下跪道歉、为什么女主角一生气就去汉江边、为什么喝酒的时候要把头转开……这些细节不是导演随便加的，是真实的韩国文化在剧里的呈现。今天토리 把最经典的韩剧文化场景全部解密给你——看完这篇再刷剧，每一幕都会有新的理解 📺', textEn: 'Tori knows many people who\'ve watched hundreds of K-drama episodes but never understood why the male lead kneels to apologize, why the female lead heads to the Han River when upset, or why people turn their heads when drinking. These details aren\'t random director choices—they\'re real Korean culture on screen. Today, Tori decodes the most iconic cultural scenes in K-dramas—after reading this, every scene will feel new when you rewatch 📺',
    },

    { type: 'sectionTitle', emoji: '🔐', title: '经典场景文化解密', titleEn: 'Decoding Culture in Classic Scenes', sub: '你以为是剧情需要，其实是真实文化', subEn: 'You Think It\'s Just Plot—It\'s Actually Real Culture' },

    { type: 'sectionTitle', emoji: '🙇', title: '男主角突然跪下来道歉', titleEn: 'The Male Lead Suddenly Kneels to Apologize', sub: '场景 01', subEn: 'Scene 01' },
    {
      type: 'compareVs',
      left: { title: '❓ 你以为', titleEn: '❓ What You Think', items: ['这是剧情夸张，现实生活里不会真的跪下来道歉。'] },
      right: { title: '✓ 真相', titleEn: '✓ The Truth', items: ['在韩国，下跪确实是表达极度歉意和悔恨的方式，不只在剧里，现实中也发生。'] },
    },
    { type: 'paragraph', text: '韩国有很深的儒家传统，身体语言承载着巨大的情感重量。一般道歉说죄송합니다配合鞠躬就够了，但当错误极其严重、或对象是非常重要的长辈时，下跪是表示"我把自己放到最低"的极致姿态。', textEn: 'Korea has deep Confucian roots, and body language carries immense emotional weight. A simple apology with joesonghamnida and a bow usually suffices, but when the mistake is severe or the person is a highly respected elder, kneeling is the ultimate gesture of putting yourself at the lowest position.' },
    { type: 'paragraph', text: '在韩国职场剧里，员工向老板下跪认错；在家庭剧里，儿子向父母下跪求原谅——这些都来自真实文化土壤，不是编剧的想象。', textEn: 'In Korean office dramas, employees kneel to bosses to admit fault; in family dramas, sons kneel to parents to beg forgiveness—these come from real cultural soil, not the writer\'s imagination.' },
    { type: 'toriQuote', label: '토리 说', labelEn: 'Tori says', text: '看到男主下跪的时候，不要觉得夸张。在韩国文化里，这是一个人能做的最低姿态，意味着我愿意放下所有尊严来弥补这个错误。', textEn: 'When you see the male lead kneel, don\'t think it\'s over the top. In Korean culture, it\'s the lowest posture a person can take, meaning I\'m willing to set aside all pride to make up for this mistake.' },

    { type: 'sectionTitle', emoji: '🌉', title: '难过的时候去汉江边坐着', titleEn: 'Sitting by the Han River When Feeling Down', sub: '场景 02', subEn: 'Scene 02' },
    {
      type: 'compareVs',
      left: { title: '❓ 你以为', titleEn: '❓ What You Think', items: ['导演为了取景选了汉江，很美，所以经常出现。'] },
      right: { title: '✓ 真相', titleEn: '✓ The Truth', items: ['汉江公园是首尔人真实的情绪出口，去汉江发呆、哭泣是韩国年轻人的日常行为。'] },
    },
    { type: 'paragraph', text: '汉江公园（한강공원）全长约78公里，横穿首尔市中心，24小时开放。对首尔年轻人来说，它是城市里少数可以真正放空的地方。失恋了去汉江边坐一晚上，和朋友吵架了去汉江边吹吹风，工作压力太大了去汉江边喝一罐啤酒——这是真实的首尔日常。', textEn: 'Hangang Park spans about 78 kilometers through central Seoul and is open 24/7. For young Seoulites, it\'s one of the few places in the city to truly clear their minds. After a breakup, sit by the Han River all night; after a fight with a friend, go there to catch the breeze; when work stress piles up, grab a beer by the river—this is real Seoul daily life.' },
    { type: 'paragraph', text: '汉江公园里有便利店，边哭边吃컵라면这个韩剧经典场景，是真实存在的。', textEn: 'There are convenience stores in Hangang Park—the classic K-drama scene of crying while eating cup ramyeon is real.' },
    { type: 'toriQuote', label: '토리 说', labelEn: 'Tori says', text: '토리 去过汉江公园三次，每次都看到一个人坐着发呆的人。首尔人把汉江当成城市里的呼吸空间，这一点韩剧没有夸张。', textEn: 'Tori has been to Hangang Park three times and each time saw someone sitting alone, lost in thought. Seoulites treat the Han River as the city\'s breathing space—K-dramas don\'t exaggerate this.' },

    { type: 'sectionTitle', emoji: '🥂', title: '晚辈喝酒时把头转开', titleEn: 'Turning the Head Away When Drinking as a Junior', sub: '场景 03', subEn: 'Scene 03' },
    {
      type: 'compareVs',
      left: { title: '❓ 你以为', titleEn: '❓ What You Think', items: ['演员的奇怪动作，或者拍摄角度需要。'] },
      right: { title: '✓ 真相', titleEn: '✓ The Truth', items: ['韩国礼仪：在长辈面前喝酒，要侧身、把头转开，不能正对长辈喝。'] },
    },
    { type: 'paragraph', text: '这是韩国饮酒礼仪的核心规则之一。晚辈在长辈面前直接仰头喝酒是非常失礼的，必须转身90度或侧对长辈，用手遮一下杯子再喝。这个动作在韩国职场聚餐和家庭饭桌上每天都在发生。', textEn: 'This is one of the core rules of Korean drinking etiquette. Drinking directly with your head tilted back in front of an elder is very rude—you must turn 90 degrees or face sideways, covering your glass with your hand. This happens daily at Korean work gatherings and family meals.' },
    { type: 'paragraph', text: '另外：长辈给你倒酒，你要用双手接住杯子；轮到你给长辈倒酒，要用右手拿瓶，左手轻托右前臂——这些细节都是真实的韩国酒桌礼仪。', textEn: 'Also: when an elder pours you a drink, hold your glass with both hands; when it\'s your turn to pour for an elder, hold the bottle with your right hand and lightly support your right forearm with your left—these details are real Korean table etiquette.' },
    { type: 'toriQuote', label: '토리 说', labelEn: 'Tori says', text: '토리 第一次在韩国朋友家吃饭时忘了转头，朋友的妈妈没说什么，但토리 后来知道那是很失礼的。这个细节，外国人最容易忽略。', textEn: 'The first time Tori ate at a Korean friend\'s house, she forgot to turn her head. The friend\'s mom didn\'t say anything, but Tori later learned it was very rude. This detail is the easiest for foreigners to overlook.' },

    { type: 'sectionTitle', emoji: '🍗', title: '失恋或开心都要吃炸鸡配啤酒', titleEn: 'Eating Fried Chicken with Beer Whether Heartbroken or Happy', sub: '场景 04', subEn: 'Scene 04' },
    {
      type: 'compareVs',
      left: { title: '❓ 你以为', titleEn: '❓ What You Think', items: ['广告植入，或者韩剧的特定套路。'] },
      right: { title: '✓ 真相', titleEn: '✓ The Truth', items: ['치맥（炸鸡+啤酒）是韩国真实的国民组合，任何情绪都可以用它解决。'] },
    },
    { type: 'paragraph', text: '치맥（치킨+맥주）是韩国饮食文化的一个符号，地位类似中国的火锅或日本的居酒屋。韩国的炸鸡不是肯德基那种，是用特殊酱料腌制后炸出来的，外皮极酥，有原味、甜辣、大蒜奶油等十多种口味。', textEn: 'Chimaek (chicken + beer) is a symbol of Korean food culture, much like hotpot in China or izakaya in Japan. Korean fried chicken isn\'t like KFC—it\'s marinated in special sauces and fried to an ultra-crispy finish, with over a dozen flavors like original, sweet & spicy, and garlic butter.' },
    { type: 'paragraph', text: '在韩国，晚上11点点炸鸡外卖完全正常，很多炸鸡店营业到凌晨2-3点。《请回答1988》《我的大叔》《蓝色海洋的传说》……几乎每部韩剧都有치맥场景，因为它就是韩国日常生活的一部分。', textEn: 'In Korea, ordering fried chicken delivery at 11 PM is totally normal—many chicken shops stay open until 2-3 AM. Reply 1988, My Mister, Legend of the Blue Sea... almost every K-drama has a chimaek scene, because it\'s just part of everyday Korean life.' },
    { type: 'toriQuote', label: '토리 说', labelEn: 'Tori says', text: '토리 강력 추천：去首尔一定要在치킨집（炸鸡店）坐下来正式吃一顿치맥，不要只在便利店买炸鸡腿。那个感觉完全不一样。', textEn: 'Tori\'s strong recommendation: when you go to Seoul, make sure to sit down at a chicken shop (치킨집) and properly enjoy chimaek—don\'t just grab a drumstick from a convenience store. The experience is completely different.' },

    { type: 'sectionTitle', emoji: '👫', title: '叫对方언니、오빠、선배', titleEn: 'Calling someone 언니, 오빠, 선배', sub: '场景 05', subEn: 'Scene 05' },
    {
      type: 'compareVs',
      left: { title: '❓ 你以为', titleEn: '❓ What You Think', items: ['언니是"姐姐"，오빠是"哥哥"，只有真正的兄弟姐妹才这样叫。'] },
      right: { title: '✓ 真相', titleEn: '✓ The Truth', items: ['这些称谓在韩国被广泛用于非亲属关系，代表一种亲密的上下级情感。'] },
    },
    { type: 'paragraph', text: '韩国的称谓系统不只用于家庭。女生叫比自己年长的女性朋友언니，叫比自己年长的男性朋友或男友오빠。男生叫年长的男性형，叫年长的女性누나。', textEn: 'Korea\'s address system isn\'t just for family. Women call older female friends 언니 and older male friends or boyfriends 오빠. Men call older males 형 and older females 누나.' },
    { type: 'paragraph', text: '在学校、职场，比你早入学或入职的人叫선배（선배님），你叫他们선배，他们叫你후배。这套称谓体系建立了一张无处不在的关系网，每个人都清楚地知道自己和他人的位置。', textEn: 'In school and at work, people who entered before you are called 선배 (선배님); you call them 선배 and they call you 후배. This address system creates a web of relationships everywhere, where everyone knows exactly where they and others stand.' },
    { type: 'toriQuote', label: '토리 说', labelEn: 'Tori says', text: '女生叫男友오빠，是因为她觉得对方像一个可以依靠的哥哥，不只是年龄上的称谓，更是一种感情定位。이걸 알면 韩剧里의 오빠가 다르게 들려요。', textEn: 'A girl calls her boyfriend oppa because she sees him as a dependable older brother—it\'s not just about age, but an emotional role. Knowing this, oppa in K-dramas sounds different.' },

    { type: 'sectionTitle', emoji: '🌧️', title: '分手后男主角在雨里站着', titleEn: 'The male lead standing in the rain after a breakup', sub: '场景 06', subEn: 'Scene 06' },
    {
      type: 'compareVs',
      left: { title: '❓ 你以为', titleEn: '❓ What You Think', items: ['纯粹的戏剧化处理，为了画面好看。'] },
      right: { title: '✓ 真相', titleEn: '✓ The Truth', items: ['韩国文化里，雨有特殊的情感象征意义，淋雨是一种对痛苦的具身体验。'] },
    },
    { type: 'paragraph', text: '在韩国文化和文学传统里，雨代表悲伤、思念、无法控制的命运。淋雨不撑伞，是用身体感受情绪、不逃避的象征。韩语里有个表达비를 맞다（淋雨），有时被用来比喻一个人接受痛苦而不躲避。', textEn: 'In Korean culture and literary tradition, rain represents sadness, longing, and uncontrollable fate. Standing in the rain without an umbrella is a symbol of feeling emotions with your body and not running away. Korean has the expression 비를 맞다 (to get rained on), sometimes used metaphorically for accepting pain without avoiding it.' },
    { type: 'paragraph', text: '这不只是韩剧的视觉语言，在韩国诗歌、歌词中也大量出现。BTS、IU等歌手的歌词里，雨几乎都承载着情感重量。', textEn: 'This isn\'t just K-drama visual language—it appears heavily in Korean poetry and lyrics too. In songs by BTS, IU, and others, rain almost always carries emotional weight.' },
    { type: 'toriQuote', label: '토리 说', labelEn: 'Tori says', text: '学了这个之后，再听韩语歌词里出现비（雨）这个词，感觉会完全不一样。', textEn: 'Once you learn this, hearing 비 (rain) in Korean lyrics will feel completely different.' },

    { type: 'sectionBreak'},

    { type: 'sectionTitle', emoji: '🎬', title: '韩剧取景地——屏幕里的世界可以走进去', titleEn: 'K-Drama Filming Locations—Stepping Into the World on Screen', sub: '超过三分之一的外国游客因为韩剧决定来韩国', subEn: 'Over a third of foreign tourists decided to visit Korea because of K-dramas' },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          zh: '韩流旅游的经济规模', zhEn: 'The Economic Scale of Hallyu Tourism',
          desc: '2023 年韩国文化内容（音乐、影视、游戏）创造了约 151 万亿韩元的经济价值。2024 年韩国接待了 1,637 万国际游客（同比增长 30%），9 月单月 140 万游客创下疫情后最高纪录。韩国观光公社调查显示：超过三分之一的游客表示"接触韩流内容后决定来韩国"。Netflix 数据显示韩剧是其播放量最高的非英语内容。', descEn: 'In 2023, Korean cultural content (music, film, games) generated about 151 trillion KRW in economic value. In 2024, Korea welcomed 16.37 million international visitors (up 30% year-over-year), with September alone hitting 1.4 million—the highest post-pandemic record. A Korea Tourism Organization survey shows over a third of visitors said "contact with Hallyu content made them decide to visit Korea." Netflix data shows K-dramas are its most-watched non-English content.',
        },
        {
          zh: '从屏到现实——真实取景地', zhEn: 'From Screen to Reality—Real Filming Locations',
          desc: '《阳光先生》在论山市（논산）保留了完整的 1900 年代首尔街景复制品，距离首尔约 170 公里。有导游说游客到达后会激动到流泪。《梨泰院Class》的取景地、水原华城（UNESCO 遗产）因《背着善宰跑》和《二十五，二十一》成为打卡圣地。浦项从以造船和钢铁闻名的工业城市，因为《山茶花开时》变成了国际游客的目的地——有苏格兰游客专程飞了 8,800 公里前来。', descEn: 'Mr. Sunshine kept a full-scale replica of 1900s Seoul streets in Nonsan (논산), about 170 km from Seoul—guides say visitors have been moved to tears upon arrival. Itaewon Class filming locations and Suwon Hwaseong Fortress (a UNESCO site) became must-visit spots thanks to Lovely Runner and Twenty-Five Twenty-One. Pohang, once known as an industrial city for shipbuilding and steel, turned into an international destination because of When the Camellia Blooms—one Scottish tourist flew 8,800 km just to see it.',
        },
        {
          zh: '政府投资——建一座韩流好莱坞', zhEn: 'Government Investment—Building a Hallyu Hollywood',
          desc: '韩国政府计划到 2035 年建设一座 3.3 平方公里的"韩流娱乐城"，包含制作设施、专业学校和朝鲜王朝宫殿的全尺寸复制品。同时设立了 1,000 亿韩元基金与海外风投共同投资韩国内容。政府目标是年吸引 3,000 万外国游客。文化体育观光部长官表示："政府画蓝图并提供基础设施。"', descEn: 'The Korean government plans to build a 3.3-square-kilometer "Hallyu Entertainment City" by 2035, featuring production facilities, a professional school, and full-scale replicas of Joseon Dynasty palaces. It also set up a 100 billion KRW fund to co-invest in Korean content with overseas venture capital. The goal is to attract 30 million foreign tourists annually. The Minister of Culture, Sports and Tourism said: "The government draws the blueprint and provides the infrastructure."',
        },
      ],
    },
    { type: 'sectionBreak'},

    { type: 'sectionTitle', emoji: '💬', title: '韩剧高频词汇——你听到了但不知道意思', titleEn: 'High-Frequency K-Drama Words—You\'ve Heard Them But Didn\'t Know What They Meant', sub: '这些词反复出现，因为它们是韩国文化的关键词', subEn: 'These words keep appearing because they\'re key to Korean culture' },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        { ko: '눈치', ro: 'nun-chi', zh: '察言观色的能力', zhEn: 'The ability to read the room', desc: '韩国文化里极重要的社交能力，指能迅速读懂场合氛围和他人情绪，并做出恰当反应。눈치가 없다（没有눈치）是很严重的批评，눈치가 빠르다（눈치敏锐）是极高赞美。', descEn: 'A crucial social skill in Korean culture—the ability to quickly read the mood of a situation and others\' emotions, then respond appropriately. 눈치가 없다 (having no nunchi) is a serious criticism, while 눈치가 빠르다 (quick nunchi) is high praise.', tip: '在《顶楼》《Sky Castle》等剧里频繁出现', tipEn: 'Frequently appears in dramas like \'The Penthouse\' and \'Sky Castle\'' },
        { ko: '빨리빨리', ro: 'ppal-li ppal-li', zh: '快快快的文化', zhEn: 'The culture of hurry, hurry', desc: '韩国独特的"速度文化"，意思是"快一点、再快一点"。韩国人做任何事都追求速度——快餐快速、快递快速、工作快速、恋爱快速。这种文化和韩国的高速经济发展密切相关。', descEn: 'Korea\'s unique \'speed culture\' means \'faster, even faster.\' Koreans pursue speed in everything—fast food, fast delivery, fast work, fast romance. This culture is closely tied to Korea\'s rapid economic growth.', tip: '韩剧里的叫外卖、催人出门、职场加班都能感受到빨리빨리', tipEn: 'In K-dramas, you can feel ppalli ppalli in ordering takeout, urging someone to hurry out, and workplace overtime.' },
        { ko: '눈물', ro: 'nun-mul', zh: '眼泪', zhEn: 'Tears', desc: '韩剧之所以催泪，和韩国文化对情感表达的态度有关。韩国人并不认为在他人面前流泪是软弱，哭泣是情感真实的体现。눈물이 나다（流出眼泪）是一种诗意的表达。', descEn: 'K-dramas are tear-jerking because of how Korean culture views emotional expression. Koreans don\'t see crying in front of others as weakness—tears are a sign of genuine emotion. Nunmuri nada (tears flowing) is a poetic expression.', tip: '几乎每部韩剧都有눈물场景，因为이건 真实的韩国情感文化', tipEn: 'Almost every K-drama has a nunmul scene because this is real Korean emotional culture.' },
        { ko: '한（恨）', ro: 'han', zh: '韩国特有的情感概念', zhEn: 'A uniquely Korean emotional concept', desc: '한是韩国文化中独有的、无法用中文精确翻译的情感——是长期积压的悲伤、遗憾、委屈和对命运的无奈混合在一起的感觉。韩国人相信한是韩国文化艺术创作力的来源。', descEn: 'Han is an emotion unique to Korean culture that can\'t be precisely translated into Chinese—a mix of long-suppressed sorrow, regret, resentment, and helplessness toward fate. Koreans believe han is the source of Korea\'s artistic and cultural creativity.', tip: '《请回答1988》《我的大叔》等写实剧深度呈现了한的情感', tipEn: 'Realistic dramas like \'Reply 1988\' and \'My Mister\' deeply portray the emotion of han.' },
        { ko: '정 (情)', ro: 'jeong', zh: '韩国式的情感纽带', zhEn: 'A Korean-style emotional bond', desc: '정也是韩国特有的概念，指人与人之间因为长时间相处而产生的深厚情感连接，不完全是爱情也不完全是友情，是一种"在一起久了就分不开"的羁绊。정이 들다（产生정）是韩剧里的核心情感逻辑。', descEn: 'Jeong is also a uniquely Korean concept—the deep emotional connection that forms between people who spend a long time together. It\'s not quite love, not quite friendship, but a bond that makes it hard to part once you\'ve been together. Jeongi deulda (developing jeong) is the core emotional logic in K-dramas.', tip: '韩剧里男女主角从讨厌到相爱，核心就是정이 들다的过程', tipEn: 'In K-dramas, when leads go from hating each other to falling in love, the core is the process of jeongi deulda.' },
        { ko: '화이팅', ro: 'hwa-i-ting', zh: '加油！', zhEn: 'Fighting!', desc: '来自英文"Fighting"，但韩国人的용법完全韩国化了。不是"打架"的意思，而是"加油、打起精神、你可以的"。韩国人在任何需要鼓励的场合都会喊화이팅，举起拳头是标准动作。', descEn: 'Derived from the English \'Fighting,\' but Koreans have completely Koreanized its usage. It doesn\'t mean \'fighting\'—it means \'you can do it, cheer up, go for it.\' Koreans shout hwaiting in any situation needing encouragement, with a raised fist as the standard gesture.', tip: '每部韩剧必出现，토리 也天天说：오늘도 화이팅！🐰', tipEn: 'It appears in every K-drama, and Tori says it every day too: Today, hwaiting! 🐰' },
      ],
    },

    { type: 'sectionBreak'},

    { type: 'sectionTitle', emoji: '🍜', title: '韩剧里的饮食——不只是好看', titleEn: 'Food in K-dramas—more than just looks', sub: '每样食物背后都有它出现的理由', subEn: 'Every food has a reason for appearing' },
    { type: 'paragraph', heading: '🍜 해장국——宿醉后的第一碗汤', headingEn: '🍜 Haejangguk—the first soup after a hangover', text: '韩剧里，喝醉酒的第二天，一定有人端着一碗热腾腾的해장국（解酒汤）出现。해장（解酒）+국（汤），是专门为了解宿醉而存在的食物。\n\n最经典的해장국是뼈해장국（猪骨解酒汤）和콩나물국밥（豆芽汤饭）。韩国人相信解酒汤能"唤醒"肠胃，让身体从酒精里恢复过来。韩剧里这个场景几乎是一种关心的表达——准备해장국，是照顾对方的方式。', textEn: 'In K-dramas, the morning after a night of drinking, someone always shows up with a steaming bowl of haejangguk (hangover soup). Haejang (sobering up) + guk (soup)—it exists specifically to cure a hangover.\\n\\nThe most classic haejangguk are ppyeo haejangguk (pork bone hangover soup) and kongnamul gukbap (bean sprout soup with rice). Koreans believe hangover soup \'wakes up\' the stomach and helps the body recover from alcohol. In K-dramas, this scene is almost an expression of care—preparing haejangguk is a way of looking after someone.' },
    { type: 'highlight', variant: 'tip', title: '토리 说', titleEn: 'Tori says', text: '韩国的解酒文化本身就值得专门写一篇。韩国人喝酒喝得豪爽，解酒喝得也认真——这两件事都是文化，不是偶然。', textEn: 'Korea\'s hangover-cure culture deserves its own article. Koreans drink heartily and cure hangovers just as seriously—both are culture, not coincidence.' },
    { type: 'paragraph', heading: '🍳 라면 — 深夜的情感温度', headingEn: '🍳 Ramyeon—emotional warmth at midnight', text: '韩剧里，深夜一起煮泡面是一个非常有分量的场景。字面上是吃面，实际上在韩国文化里有一个众所周知的潜台词——라면 먹고 갈래？（要不要留下来吃泡面？）是邀请对方多待一会儿的暗语。\n\n但抛开这个层面，韩国人对泡面（라면）的感情是真实的。韩国是全球第二大方便面消费国（人均79份/年，仅次于越南），신라면（辛拉面）是韩国文化输出的重要符号之一。在深夜煮一碗泡面，是韩国人处理情绪的方式。', textEn: 'In K-dramas, cooking ramyeon together late at night is a scene with real weight. Literally it\'s about eating noodles, but in Korean culture there\'s a well-known subtext—ramyeon meokgo gallae? (Want to stay for ramyeon?) is a coded invitation to stay longer.\\n\\nBut beyond that, Koreans\' love for ramyeon is genuine. Korea is the world\'s second-largest consumer of instant noodles (79 servings per person per year, second only to Vietnam), and Shin Ramyeon is a major symbol of Korean cultural export. Cooking a pot of ramyeon late at night is how Koreans process their emotions.' },
    { type: 'paragraph', heading: '🥃 소주 — 韩国的国民酒', headingEn: '🥃 Soju—Korea\'s national drink', text: '소주（烧酒）在韩剧里的出现频率，比任何其他食物都高。它在韩国的地位，类似中国的白酒，但更亲民——价格约1,500-2,000韩元一瓶，几乎每家餐厅都有。\n\n소주的喝法有讲究：第一杯通常由最年长的人倒给最年轻的人，然后说干杯。건배（干杯）在正式场合用，朋友之间常说원샷（one shot，一口干）。소주를 섞어 마시다（소주混着其他东西喝）也是文化——소주+맥주=소맥，是韩剧里最常见的组合。', textEn: 'Soju appears in K-dramas more than any other food. Its status in Korea is similar to baijiu in China, but more accessible—about 1,500-2,000 won per bottle, available at almost every restaurant.\\n\\nThere\'s etiquette to drinking soju: the first glass is usually poured by the eldest for the youngest, followed by a toast. Geonbae (cheers) is used in formal settings, while friends often say wonshot (one shot, down it). Sojureul seokkeo masida (mixing soju with other drinks) is also part of the culture—soju + beer = somaek, the most common combo in K-dramas.' },
    { type: 'highlight', variant: 'tip', title: '한 가지 더', text: '韩国人喝酒时，给自己倒酒是不礼貌的。要互相给对方倒，自己的杯子空了，要等旁边的人帮你添。这个细节在韩剧里经常出现，是真实的酒桌礼仪。', textEn: 'When Koreans drink, pouring your own drink is considered impolite. You should pour for each other—when your glass is empty, wait for the person next to you to refill it. This detail often appears in K-dramas and is a real drinking etiquette.' },

    { type: 'sectionBreak'},

    { type: 'sectionTitle', emoji: '🔍', title: '韩剧冷知识', titleEn: 'K-Drama Fun Facts', sub: '这些真相让你对韩国文化的理解更立体', subEn: 'These truths give you a more well-rounded understanding of Korean culture.' },
    {
      type: 'trivia',
      items: [
        { tag: '拍摄文化', tagEn: 'Production Culture', q: '韩剧为什么总是边拍边播？', qEn: 'Why are K-dramas always filmed while airing?', a: '韩国大部分剧集采用"동시제작（同步制作）"模式——一边拍一边播出。编剧会根据观众实时反馈调整剧情走向，这就是为什么有时候韩剧结局会突然改变。这种模式让韩剧和观众有了独特的互动关系，但也让演员极度疲惫——有时候播出当天才拍完那集。', aEn: 'Most Korean dramas use a "동시제작 (simultaneous production)" model—filming while airing. Writers adjust the storyline based on real-time viewer feedback, which is why K-drama endings sometimes change suddenly. This model creates a unique interaction between the show and its audience, but it also exhausts actors—sometimes an episode is only finished filming on the day it airs.' },
        { tag: '财阀文化', tagEn: 'Chaebol Culture', q: '为什么韩剧男主角那么多是财阀？', qEn: 'Why are so many K-drama male leads chaebols?', a: '韩国前30大财阀集团控制了国家GDP的约60%，财阀家族在韩国是真实存在的权力阶层。三星、现代、LG、롯데的家族故事本身就是韩剧素材。韩国人对财阀既有批判又有幻想，这种矛盾情绪直接催生了无数财阀题材韩剧。', aEn: 'Korea\'s top 30 chaebol groups control about 60% of the country\'s GDP, and chaebol families are a real power class in Korea. The family stories of Samsung, Hyundai, LG, and 롯데 are K-drama material in themselves. Koreans have both criticism and fantasies about chaebols, and this ambivalence has directly spawned countless chaebol-themed K-dramas.' },
        { tag: '整容文化', tagEn: 'Plastic Surgery Culture', q: '韩剧演员的外貌为什么普遍很高？', qEn: 'Why do K-drama actors generally have such high visual appeal?', a: '韩国娱乐业对外貌有极高要求，双眼皮手术、鼻梁整形是非常普遍的医美项目，很多人大学毕业前就做了。韩国首尔的江南区是全球整形手术密度最高的地区之一。韩剧演员的"完美外貌"背后，是韩国社会对颜值的高度重视——这既是文化现象也是产业现象。', aEn: 'The Korean entertainment industry has extremely high standards for appearance. Double eyelid surgery and nose reshaping are very common cosmetic procedures, and many people get them done before graduating college. Gangnam in Seoul is one of the areas with the highest density of plastic surgery in the world. Behind K-drama actors\' "perfect looks" is Korean society\'s heavy emphasis on appearance—this is both a cultural and an industry phenomenon.' },
        { tag: '学历文化', tagEn: 'Education Culture', q: '为什么韩剧里那么多名校梗？', qEn: 'Why are there so many prestigious university references in K-dramas?', a: 'SKY（서울대학교、고려대학교、연세대학교）是韩国最顶尖的三所大学，进这三所学校是韩国家庭最重要的教育目标之一。韩国高考（수능）是全国性大事，考试当天飞机减少航班避免噪音、警察护送迟到考生——这是真实发生的事，不是韩剧夸张。', aEn: 'SKY (서울대학교, 고려대학교, 연세대학교) are Korea\'s top three universities, and getting into them is one of the most important educational goals for Korean families. The Korean college entrance exam (수능) is a national event—on exam day, flights are reduced to avoid noise and police escort late students. This really happens; it\'s not K-drama exaggeration.' },
      ],
    },
    { type: 'highlight', variant: 'tip', title: '📺 看韩剧的正确姿势', titleEn: '📺 The Right Way to Watch K-Dramas', text: '看韩剧不只是娱乐——它是了解韩国文化最直观的窗口。下次刷剧时，带着这些文化知识去看：为什么他们这样说话？为什么在这个场合鞠躬？为什么吃这个食物？每一个你看懂的细节，都是你真正进入韩国文化的一步。', textEn: 'Watching K-dramas isn\'t just entertainment—it\'s the most direct window into Korean culture. Next time you binge-watch, go in with this cultural knowledge: Why do they talk this way? Why bow in this situation? Why eat this food? Every detail you understand is a step toward truly entering Korean culture.' },

    {
      type: 'phraseList',
      title: '토리 教你说——韩剧里最常听到的韩语', titleEn: '토리 Teaches You—The Most Common Korean Phrases in K-Dramas',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        { ko: '죄송합니다.', ro: 'joe-song-ham-ni-da', scene: '🙇 正式道歉，比 미안해 更重', sceneEn: '🙇 A formal apology, heavier than 미안해', zh: '非常抱歉', zhEn: 'I\'m very sorry' },
        { ko: '괜찮아요.', ro: 'gwaen-cha-na-yo', scene: '💬 最万能的回应', sceneEn: '💬 The most versatile response', zh: '没关系 / 我没事', zhEn: 'It\'s okay / I\'m fine' },
        { ko: '어떡해.', ro: 'eo-tteok-hae', scene: '😱 遇到麻烦时的感叹', sceneEn: '😱 An exclamation when in trouble', zh: '怎么办啊', zhEn: 'What should I do?' },
        { ko: '진짜요?', ro: 'jin-jja-yo?', scene: '😮 表示惊讶', sceneEn: '😮 Expressing surprise', zh: '真的吗？', zhEn: 'Really?' },
        { ko: '화이팅!', ro: 'hwa-i-ting', scene: '✊ 鼓励时', sceneEn: '✊ When cheering someone on', zh: '加油！', zhEn: 'Fighting!' },
        { ko: '건배!', ro: 'geon-bae', scene: '🥂 举杯时', sceneEn: '🥂 When toasting', zh: '干杯！', zhEn: 'Cheers!' },
        { ko: '보고 싶어.', ro: 'bo-go si-peo', scene: '💜 思念时（반말）', sceneEn: '💜 When missing someone (반말)', zh: '我想你', zhEn: 'I miss you' },
        { ko: '사랑해.', ro: 'sa-rang-hae', scene: '❤️ 告白或对亲近的人', sceneEn: '❤️ For confessions or close friends', zh: '我爱你', zhEn: 'I love you' },
      ],
    },

    { type: 'sectionTitle', emoji: '📖', title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson' },
    {
      type: 'vocabList',
      items: [
        { ko: '눈치', zh: '察言观色能力', zhEn: 'The ability to read the room' },
        { ko: '빨리빨리', zh: '快快快文化', zhEn: 'The \'hurry, hurry\' culture' },
        { ko: '한', zh: '韩国特有的恨/悲伤', zhEn: 'A uniquely Korean feeling of sorrow/resentment' },
        { ko: '정', zh: '情感纽带', zhEn: 'Emotional bond' },
        { ko: '언니', zh: '姐姐（亲密称谓）', zhEn: 'Older sister (affectionate term)' },
        { ko: '오빠', zh: '哥哥（亲密称谓）', zhEn: 'Older brother (affectionate term)' },
        { ko: '선배', zh: '前辈', zhEn: 'Senior' },
        { ko: '치맥', zh: '炸鸡+啤酒', zhEn: 'Fried chicken + beer' },
        { ko: '해장국', zh: '解酒汤', zhEn: 'hangover soup' },
        { ko: '소주', zh: '韩国烧酒', zhEn: 'Korean soju' },
        { ko: '건배', zh: '干杯', zhEn: 'Cheers' },
        { ko: '화이팅', zh: '加油', zhEn: 'You got this' },
      ],
    },

    {
      type: 'ending',
      text: '看剧不只是消遣，是了解韩国的窗口\n\n便利店、咖啡厅、打招呼、节日、韩剧——五篇走完，토리 希望你对韩国的感受不只是"好看"，而是"我理解这里的人为什么这样生活"。这才是学韩语最值得的事：不只学会说话，更学会理解。\n\n오늘도 화이팅！🐰', textEn: 'Watching dramas isn\'t just a pastime—it\'s a window into Korea.\\n\\nConvenience stores, cafés, greetings, holidays, K-dramas—after these five lessons, 토리 hopes you feel about Korea not just "it looks cool," but "I understand why people here live the way they do." That\'s what makes learning Korean truly worthwhile: not just learning to speak, but learning to understand.\\n\\n오늘도 화이팅! 🐰',
    },
  ],
},
  {
  slug: 'kbbq-guide',
  category: 'food',
  title: '韩国烤肉完全指南', titleEn: 'The Complete Guide to Korean BBQ',
  subtitle: '고기 — 从点单到吃法，一篇搞懂', subtitleEn: '고기 — From ordering to eating, all in one guide',
  emoji: '🥩',
  readMinutes: 10,
  bannerImage: '/images/banners/kbbq-guide.webp',
  blocks: [
    {
      type: 'intro',
      text: '토리在韩国吃过很多顿烤肉，每次都觉得"这不只是在吃肉"。韩国烤肉餐厅里，烟雾弥漫，大家围着炭火，互相夹肉、互相倒酒，声音很响，但气氛很暖。韩国人不单独去吃烤肉——烤肉是一件需要一群人一起做的事。今天토리 把烤肉文化从头到尾讲给你听，包括你去餐厅不知道该怎么点、肉怎么烤、生菜包肉怎么包——全部都在这里 🥩🔥', textEn: '토리 has eaten a lot of Korean BBQ and every time thinks, "This isn\'t just about eating meat." In Korean BBQ restaurants, smoke fills the air as everyone gathers around the charcoal fire, feeding each other meat and pouring each other drinks. It\'s loud, but the atmosphere is warm. Koreans don\'t go for BBQ alone—it\'s something you do with a group. Today, 토리 will walk you through BBQ culture from start to finish, including how to order, how to grill the meat, and how to wrap it in lettuce—it\'s all here 🥩🔥',
    },
    {
      type: 'sectionTitle',
      emoji: '🔥',
      title: '烤肉在韩国是一种社交仪式', titleEn: 'BBQ in Korea is a social ritual',
      sub: '不是餐厅，是聚会的理由', subEn: 'Not just a restaurant—a reason to gather',
    },
    {
      type: 'paragraph',
      heading: '🤝 고기는 같이 먹는 거야——肉是要一起吃的', headingEn: '🤝 고기는 같이 먹는 거야—Meat is meant to be shared',
      text: '在中国，一个人去吃火锅正在变得普遍。但在韩国，一个人去烤肉餐厅依然是非常少见的行为——不是因为餐厅不欢迎，而是因为烤肉在文化上就是一件集体行为。\n\n韩国职场文化里，회식（聚餐）几乎等于去烤肉。新人入职、项目完成、季度庆功——烤肉是韩国人庆祝一切事情的方式。大家围在一起，炭火升起，第一杯소주倒上，这个仪式开始了。', textEn: 'In China, eating hotpot alone is becoming common. But in Korea, going to a BBQ restaurant alone is still very rare—not because restaurants don\'t welcome it, but because BBQ is culturally a group activity.\\n\\nIn Korean work culture, 회식 (company dinner) almost always means BBQ. New hire orientation, project completion, quarterly celebrations—BBQ is how Koreans celebrate everything. Everyone gathers around, the charcoal fire rises, the first glass of 소주 is poured, and the ritual begins.',
    },
    {
      type: 'toriQuote',
      label: '토리 说', labelEn: 'Tori says',
      text: '你在首尔看到的那些烤肉餐厅，桌上有烟囱排烟管的，都是正经的고깃집（烤肉店）。排队最长的那家，不一定是最贵的，但一定是本地人觉得值得的。', textEn: 'Those BBQ restaurants you see in Seoul with the exhaust pipes on the tables are all proper 고깃집 (BBQ joints). The one with the longest line isn\'t necessarily the priciest—it\'s just the one locals think is worth the wait.',
    },
    {
      type: 'paragraph',
      heading: '📜 韩国烤肉的历史——从宫廷到街边', headingEn: '📜 The History of Korean BBQ — From Royal Courts to Street Corners',
      text: '韩国烤肉最早的记载可以追溯到고구려（高句丽）时代，当时叫맥적（貊炙），是把肉串在铁签上烤的做法，类似今天的烤串。后来传入宫廷，成为宴席菜肴，做法逐渐精细化，演变成用酱料腌制后烤的风格。\n\n近代的韩国烤肉文化真正普及是在1950年代之后。韩战结束、经济重建，烤肉从贵族食物变成了街边小馆，任何人都能围着炭炉吃一顿。至今，烤肉依然是韩国人最常见的聚餐方式——회식（公司聚餐）、生日、周末聚会，几乎都离不开고깃집。', textEn: 'The earliest records of Korean BBQ trace back to the Goguryeo era, when it was called maekjeok — skewering meat on iron sticks and grilling it, much like today\'s skewers. It later entered the royal court as a banquet dish, becoming more refined and evolving into the style of marinating meat in sauce before grilling.\\n\\nModern Korean BBQ culture truly spread after the 1950s. After the Korean War and economic reconstruction, BBQ went from aristocratic food to street-side eateries, where anyone could gather around a charcoal grill. To this day, BBQ remains the most common way Koreans dine together — whether it\'s hoeshik (company dinners), birthdays, or weekend gatherings, it\'s almost always at a meat restaurant.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🥩',
      title: '必点肉类——토리 的烤肉菜单', titleEn: 'Must-Order Meats — Tori\'s BBQ Menu',
      sub: '第一次去韩国烤肉餐厅，照着这个点', subEn: 'Your go-to guide for your first Korean BBQ restaurant visit',
    },
    {
      type: 'cardGrid',
      variant: 'snack',
      cards: [
        {
          emoji: '🥩',
          ko: '삼겹살',
          zh: '五花肉 · 韩国烤肉之王', zhEn: 'Samgyeopsal · The King of Korean BBQ',
          desc: '韩国最受欢迎的烤肉部位，没有之一。厚切猪五花，油脂丰富，在炭火上烤到边缘焦脆、中间多汁，蘸一点참기름（芝麻油）盐，用생채소（生蔬菜）包着吃。简单但极致。', descEn: 'The most beloved cut of Korean BBQ, hands down. Thick-cut pork belly, rich in fat, grilled over charcoal until the edges are crispy and the center is juicy. Dip it in a bit of sesame oil with salt, wrap it in fresh vegetables. Simple but perfection.',
          tip: '不需要额外腌制，原味烤最香。剪刀剪开比用筷子夹更地道。', tipEn: 'No extra marinating needed — grilling it plain brings out the best flavor. Cutting it with scissors is more authentic than using chopsticks.',
          price: '约15,000–22,000원/份', priceEn: 'About 15,000–22,000 won per serving',
        },
        {
          emoji: '🍖',
          ko: '목살',
          zh: '猪颈肉 · 比五花肉更有嚼劲', zhEn: 'Moksal · Chewier than Pork Belly',
          desc: '猪颈部的肉，脂肪分布均匀，肉质有弹性比五花肉更有嚼头。在韩国，삼겹살和목살经常被同时点——两种口感搭配，吃完一轮再换另一种，是很多本地人的固定点法。', descEn: 'Pork neck meat with evenly distributed fat and a springy, chewier texture than pork belly. In Korea, samgyeopsal and moksal are often ordered together — pairing the two textures, finishing one round then switching to the other, is a classic local move.',
          tip: '목살烤久一点更香，比삼겹살更耐烤，不用担心烤过头。', tipEn: 'Moksal gets more flavorful the longer it cooks — it\'s more forgiving than samgyeopsal, so no need to worry about overcooking.',
          price: '约13,000–18,000원/份', priceEn: 'About 13,000–18,000 won per serving',
        },
        {
          emoji: '🥩',
          ko: '갈비 / LA갈비',
          zh: '排骨 · 腌制版烤肉', zhEn: 'Galbi · The Marinated BBQ',
          desc: '用酱油、梨汁、大蒜、芝麻油腌制后烤的牛肋排。LA갈비是横切带骨的薄切排骨，是韩裔美国人发展出来的切法，现在在韩国也非常流行。甜咸鲜香，肉嫩入味，是很多人的最爱。', descEn: 'Beef short ribs marinated in soy sauce, pear juice, garlic, and sesame oil, then grilled. LA galbi is a cross-cut, thin, bone-in style developed by Korean Americans, now hugely popular in Korea too. Sweet, savory, tender, and packed with flavor — a favorite for many.',
          tip: '갈비有酱汁容易糊，要勤翻面，别烤太久。', tipEn: 'Galbi\'s marinade burns easily, so flip it often and don\'t grill it too long.',
          price: '约18,000–35,000원/份', priceEn: 'About 18,000–35,000 won per serving',
        },
        {
          emoji: '🐄',
          ko: '소고기 （꽃등심/채끝）',
          zh: '牛肉 · 高级烤肉的精髓', zhEn: 'Beef · The Essence of Premium BBQ',
          desc: '꽃등심（肋眼）和채끝（西冷）是韩国高级烤肉的代表部位。雪花纹路丰富，只需轻轻在炭火上过一下，外层熟了就可以吃，保留粉红色内部的鲜嫩多汁。配上생채소和마늘（大蒜）一起吃。', descEn: 'Flower sirloin (ribeye) and strip loin are the signature cuts of premium Korean BBQ. With rich marbling, they only need a quick pass over the charcoal — once the outside is seared, they\'re ready, keeping the pink interior juicy and tender. Enjoy with fresh vegetables and garlic.',
          tip: '高档牛肉不要烤过，七八成熟最好，全熟会可惜了油花。', tipEn: 'Don\'t overcook premium beef — medium-rare to medium is best; well-done wastes the marbling.',
          price: '约30,000–80,000원/份', priceEn: 'About 30,000–80,000 won per serving',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '📋',
      title: '韩国烤肉全流程——从进门到结账', titleEn: 'The Complete Korean BBQ Experience — From Entry to Checkout',
      sub: '第一次去不会尴尬的完整指南', subEn: 'A complete guide so your first time won\'t be awkward',
    },
    {
      type: 'steps',
      steps: [
        {
          label: '进门入座，点肉和小菜', labelEn: 'Enter, sit down, and order meat and side dishes',
          desc: '韩国烤肉餐厅通常有무한리필（无限续菜）的小菜——泡菜、豆芽、菠菜、鸡蛋卷等，都是免费的，吃完可以再要。肉要另外点，按份计费。', descEn: 'Korean BBQ restaurants usually offer unlimited refill side dishes — kimchi, bean sprouts, spinach, egg rolls, etc. — all free, and you can ask for more. Meat is ordered separately, charged per serving.',
          ko: '삼겹살 2인분 주세요',
          ro: 'sam-gyeop-sal i-in-bun ju-se-yo',
          zh: '两人份五花肉', zhEn: 'Two servings of pork belly',
        },
        {
          label: '点酒水饮料', labelEn: 'Order drinks',
          desc: '烤肉配소주是韩国标准组合。不喝酒可以点물（矿泉水）或사이다（雪碧）。很多餐厅不主动问，要主动说。', descEn: 'Samgyeopsal with soju is the standard Korean combo. If you don\'t drink, you can order water or cider. Many restaurants won\'t ask, so speak up.',
          ko: '소주 한 병이랑 맥주 하나 주세요',
          zh: '소주一瓶和一瓶啤酒', zhEn: 'One bottle of soju and one beer',
        },
        {
          label: '炭火/煤气炉升温，开始烤肉', labelEn: 'Charcoal/gas grill heats up, start grilling',
          desc: '大多数餐厅的服务员会帮你点火并开始烤第一轮肉，之后你自己烤。炭火烤肉要比煤气炉香，但现在煤气炉更普遍。烤好的肉用剪刀剪成小块，这是韩国特有的习惯，不用刀。', descEn: 'In most restaurants, the staff will light the grill and cook the first round for you, then you take over. Charcoal grilling is more fragrant than gas, but gas is more common these days. Cooked meat is cut into bite-sized pieces with scissors—a uniquely Korean habit, no knives needed.',
        },
        {
          label: '蘸料 + 生菜包肉', labelEn: 'Dipping sauce + lettuce wraps',
          desc: '烤好的肉配上蘸料，用생채소（生蔬菜）包起来一口吃掉。这个动作叫쌈 먹기，是韩国烤肉的灵魂。', descEn: 'Dip the grilled meat in sauce, wrap it in fresh veggies, and eat it in one bite. This move is called ssam meokgi, the soul of Korean BBQ.',
        },
        {
          label: '续肉、换炉网', labelEn: 'Order more meat, change the grill grate',
          desc: '炉网烤久了会积炭，服务员通常会主动来换。如果没有，可以喊저기요（服务员）请他来换。续肉直接叫就行。', descEn: 'The grate gets charred after a while, and staff usually swap it out proactively. If not, just call out yeogiyo to get their attention. For more meat, just order it.',
          ko: '저기요, 삼겹살 1인분 더 주세요',
          zh: '再来一份五花肉', zhEn: 'One more serving of samgyeopsal',
        },
        {
          label: '끝에 볶음밥（收尾炒饭）', labelEn: 'Finish with bokkeumbap (fried rice)',
          desc: '韩国烤肉有一个收尾传统：最后用烤肉剩余的油脂在炉上炒饭，加泡菜、海苔碎、芝麻，锅气十足。这叫볶음밥（炒饭），很多餐厅需要额外点，问一句就知道。', descEn: 'Korean BBQ has a finishing tradition: using the leftover fat from the meat to fry rice on the grill, with kimchi, seaweed flakes, and sesame seeds—full of wok hei. It\'s called bokkeumbap, and many places require a separate order, so just ask.',
          ko: '볶음밥 해주실 수 있어요？',
          zh: '可以帮我炒饭吗？', zhEn: 'Can you make the fried rice for me?',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🥬',
      title: '쌈 먹기——生菜包肉的正确方式', titleEn: 'Ssam meokgi—the right way to wrap meat in lettuce',
      sub: '韩国烤肉的灵魂动作，有讲究', subEn: 'The signature move of Korean BBQ, with rules to follow',
    },
    {
      type: 'steps',
      steps: [
        { label: '拿一片상추（生菜）或깻잎（紫苏叶）平铺在手心', labelEn: 'Lay a leaf of lettuce or perilla flat on your palm' },
        { label: '放上一片刚烤好、剪成小块的肉', labelEn: 'Place a piece of freshly grilled, cut-up meat on top' },
        { label: '加一点쌈장（包肉酱）——黄豆酱和辣椒酱混合的深色酱料', labelEn: 'Add a bit of ssamjang—a dark paste made from soybean and chili paste' },
        { label: '可以加半瓣마늘（大蒜），烤过的或生的都可以，看个人口味', labelEn: 'You can add half a clove of garlic, grilled or raw, depending on your taste' },
        { label: '包起来，一口吃掉。重点：一口，不要咬一半再放下，这样很不礼貌', labelEn: 'Wrap it up and eat it in one bite. Key point: one bite—don\'t take a half bite and put it down, that\'s rude.' },
      ],
    },
    {
      type: 'toriQuote',
      label: '토리',
      text: '토리 第一次吃的时候包太大，一口塞不下，非常尴尬。宁可包小一点，保证一口吃完。韩国人在帮你包的时候，这是一种关心的表达，收下就好，不用自己动手。', textEn: 'Tori\'s first time, she wrapped it too big and couldn\'t fit it in her mouth—super awkward. Better to wrap it smaller so you can finish it in one bite. When Koreans wrap one for you, it\'s a sign of care—just accept it, no need to do it yourself.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🫙',
      title: '蘸料和配菜——烤肉的灵魂伴侣', titleEn: 'Dipping sauces and sides—the soulmates of BBQ',
      sub: '没有这些，烤肉只完成了一半', subEn: 'Without these, the BBQ is only half done',
    },
    {
      type: 'cardGrid',
      variant: 'snack',
      cards: [
        {
          emoji: '🧂',
          ko: '참기름 소금',
          zh: '芝麻油盐碟', zhEn: 'Sesame oil and salt dip',
          desc: '삼겹살的标配蘸料。小碟子里倒一点芝麻油，撒上盐，烤好的肉蘸一下。香而不腻，凸显肉本身的鲜甜。', descEn: 'The standard dip for samgyeopsal. Pour a little sesame oil in a small dish, sprinkle salt, and dip the grilled meat. Fragrant without being greasy, it highlights the meat\'s natural sweetness.',
        },
        {
          emoji: '🫙',
          ko: '쌈장',
          zh: '包肉酱', zhEn: 'Meat dipping sauce',
          desc: '黄豆酱+辣椒酱+芝麻油混合而成的深色浓酱，用来包进쌈里一起吃。咸香微辣，和生菜肉一起吃层次感十足。', descEn: 'A thick, dark sauce made from soybean paste, chili paste, and sesame oil, meant to be wrapped in 쌈. Savory and slightly spicy, it adds great depth when eaten with lettuce and meat.',
        },
        {
          emoji: '🥢',
          ko: '된장찌개',
          zh: '大酱汤', zhEn: 'soybean paste stew',
          desc: '烤肉餐厅几乎必点的汤，大豆发酵酱做底，加豆腐、蔬菜炖煮。和烤肉交替吃，解腻又暖胃，是韩国人烤肉的固定搭配。', descEn: 'A soup that\'s almost a must-order at BBQ restaurants, made with fermented soybean paste as the base, simmered with tofu and vegetables. Alternating bites with grilled meat cuts through the grease and warms the stomach—a staple pairing for Koreans.',
        },
        {
          emoji: '🧄',
          ko: '구운 마늘',
          zh: '烤大蒜', zhEn: 'Grilled garlic',
          desc: '整瓣大蒜放在炉边一起烤，烤到软糯甜香。韩国人吃烤肉时会一起吃大量大蒜，这不是坏习惯，是健康的文化习俗。', descEn: 'Whole garlic cloves roasted on the grill edge until soft and sweet. Koreans eat lots of garlic with BBQ—it\'s not a bad habit, but a healthy cultural practice.',
        },
        {
          emoji: '🥗',
          ko: '파절이',
          zh: '葱丝沙拉', zhEn: 'Scallion salad',
          desc: '细切大葱用芝麻油、醋、辣椒粉调成的沙拉，酸辣爽口。放在烤好的肉上一起包进生菜里，是提升烤肉体验的关键配料。', descEn: 'A salad of finely sliced scallions dressed with sesame oil, vinegar, and chili powder—tangy and refreshing. Placed on grilled meat and wrapped in lettuce, it\'s a key ingredient that elevates the BBQ experience.',
        },
        {
          emoji: '🥬',
          ko: '깻잎 / 상추',
          zh: '紫苏叶 / 生菜', zhEn: 'Perilla leaves / Lettuce',
          desc: '쌈的主角。상추（生菜）清爽，깻잎（紫苏叶）有独特香气。两种都试试，看你更喜欢哪种包法。깻잎的香气和五花肉脂香是绝配。', descEn: 'The stars of 쌈. 상추 (lettuce) is refreshing, while 깻잎 (perilla leaves) have a unique aroma. Try both and see which wrap you prefer. The fragrance of 깻잎 pairs perfectly with the richness of pork belly.',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🏠',
      title: '烤肉餐厅的类型——去哪家吃', titleEn: 'Types of BBQ restaurants—where to eat',
      sub: '价格差距很大，体验各有不同', subEn: 'Prices vary widely, and each offers a different experience.',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          emoji: '🪵',
          ko: '참숯 고깃집',
          zh: '炭火烤肉餐厅', zhEn: 'Charcoal grill BBQ restaurant',
          desc: '用真实木炭烤肉，香气是煤气炉无法复制的。通常价格更高，环境更正式，适合想吃一顿正宗韩国烤肉的场合。在首尔弘大、梨泰院、江南有很多。', descEn: 'Grilling over real charcoal gives a smoky aroma that gas grills can\'t replicate. Usually pricier and more formal, these are great for an authentic Korean BBQ experience. You\'ll find many in Hongdae, Itaewon, and Gangnam in Seoul.',
          price: '均价：30,000–60,000원/人', priceEn: 'Average price: 30,000–60,000 won per person',
        },
        {
          emoji: '🔥',
          ko: '연탄구이',
          zh: '蜂窝煤烤肉', zhEn: 'Briquette grill BBQ',
          desc: '用蜂窝煤烤肉，是韩国老式烤肉店的代表。价格亲民，氛围接地气，通常在老城区或市场附近找到。烟气很重，衣服会有味道，但味道绝对真实。', descEn: 'Grilling over briquettes is the hallmark of old-school Korean BBQ joints. Affordable and down-to-earth, these are usually found in older neighborhoods or near markets. The smoke is heavy and your clothes will smell, but the flavor is absolutely authentic.',
          price: '均价：15,000–25,000원/人', priceEn: 'Average price: 15,000–25,000 won per person',
        },
        {
          emoji: '⭐',
          ko: '한우 전문점',
          zh: '韩牛专门店', zhEn: 'Hanwoo (Korean beef) specialty restaurant',
          desc: '专卖韩国本土牛肉（한우）的高级烤肉餐厅。한우是韩国国宝级食材，价格是普通牛肉的3-5倍，但雪花丰富、香气浓郁，是在韩国必须体验一次的奢侈。', descEn: 'A premium BBQ restaurant specializing in Korean native beef (한우). Hanwoo is a national treasure ingredient, priced 3-5 times higher than regular beef, but with rich marbling and intense flavor—a luxury you must experience once in Korea.',
          price: '均价：60,000–150,000원/人', priceEn: 'Average price: 60,000–150,000 won per person',
        },
        {
          emoji: '♾️',
          ko: '무한리필 고기집',
          zh: '无限续肉餐厅', zhEn: 'All-you-can-eat BBQ restaurant',
          desc: '固定价格无限吃的烤肉餐厅，通常是猪肉为主。性价比极高，适合胃口大或者想多吃几种的场合。肉质不如专门店，但胜在随心所欲。', descEn: 'A fixed-price, all-you-can-eat BBQ spot, usually pork-focused. Great value, perfect for big appetites or trying a variety. The meat quality isn\'t as high as specialty places, but you can eat as much as you want.',
          price: '均价：12,000–18,000원/人', priceEn: 'Average price: 12,000–18,000 won per person',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🔍',
      title: '烤肉文化冷知识', titleEn: 'Fun facts about BBQ culture',
      sub: '去吃之前先知道，去了之后更有感触', subEn: 'Know these before you go, and you\'ll appreciate it even more once you\'re there.',
    },
    {
      type: 'trivia',
      items: [
        {
          tag: '数字冷知识', tagEn: 'Number Fun Facts',
          q: '韩国人一年吃多少猪肉？', qEn: 'How much pork do Koreans eat in a year?',
          a: '韩国人均猪肉消费量约30公斤/年（2024年数据），位居亚洲前列。其中삼겹살（五花肉）是最受欢迎的猪肉部位——60%的韩国消费者选择삼겹살为最喜爱的猪肉部位。韩国甚至有一个"삼겹살데이"——每年3月3日，因为3월3일谐音삼삼，是韩国畜协专门设立的삼겹살消费促进日。', aEn: 'Koreans consume about 30 kg of pork per person per year (2024 data), ranking among the top in Asia. Among cuts, 삼겹살 (pork belly) is the most popular—60% of Korean consumers pick it as their favorite. Korea even has a "삼겹살데이" (Pork Belly Day) on March 3rd each year, because 3월3일 sounds like 삼삼, and it was established by the Korean Livestock Association to promote pork belly consumption.',
        },
        {
          tag: '剪刀文化', tagEn: 'Scissor Culture',
          q: '为什么用剪刀剪肉而不是刀？', qEn: 'Why use scissors to cut meat instead of a knife?',
          a: '在餐桌上用刀切肉，在韩国文化里有一种攻击性的感觉，不够优雅。剪刀（가위）反而更安全、更方便——在炉子上直接剪，不需要额外的砧板，也不烫手。这个习惯已经成为韩国烤肉文化的标志性符号之一。', aEn: 'Cutting meat with a knife at the table feels aggressive and inelegant in Korean culture. Scissors (가위) are safer and more convenient—you can cut right on the grill without needing a cutting board, and they don\'t burn your hands. This habit has become one of the iconic symbols of Korean BBQ culture.',
        },
        {
          tag: '衣服问题', tagEn: 'The Clothing Issue',
          q: '为什么韩国烤肉餐厅通常有备用衣物？', qEn: 'Why do Korean BBQ restaurants usually have spare clothes?',
          a: '一些高档烤肉餐厅会在入口处准备围裙或备用外套，让顾客换上再烤肉——因为烤肉的油烟会让衣服沾满味道。这在年轻一代韩国人中也催生了一个习惯：去吃烤肉之前不穿贵的衣服，专门穿"烤肉服"。', aEn: 'Some upscale BBQ restaurants provide aprons or spare jackets at the entrance for customers to change into before grilling—because the smoke and oil from BBQ leave clothes smelling. This has also spawned a habit among younger Koreans: don\'t wear expensive clothes to BBQ, wear dedicated "BBQ clothes" instead.',
        },
        {
          tag: '酒桌规则', tagEn: 'Drinking Etiquette',
          q: '烤肉席上的酒桌礼仪？', qEn: 'What\'s the drinking etiquette at a BBQ table?',
          a: '在烤肉会식（聚餐）上：不能给自己倒酒、要用双手接酒杯、长辈先喝晚辈才能喝、在长辈面前喝酒要侧身转头。这些和打招呼文化章节里说的酒桌礼仪完全一致——烤肉会식就是这套礼仪最密集出现的场合。', aEn: 'At a BBQ gathering (회식): you can\'t pour your own drink, you must receive the glass with both hands, juniors can only drink after elders start, and you should turn your head to the side when drinking in front of elders. This is exactly the same drinking etiquette covered in the greeting culture chapter—BBQ 회식 is where this etiquette appears most intensely.',
        },
      ],
    },
    {
      type: 'highlight',
      variant: 'warning',
      title: '🥩 去韩国烤肉餐厅之前要知道', titleEn: '🥩 What to Know Before Going to a Korean BBQ Restaurant',
      text: '고기는 최소 2인분부터（肉最少点两人份）——几乎所有韩国烤肉餐厅的最低起点是两人份，一个人去通常会被礼貌地拒绝或安排特定座位。如果是一个人，可以去무한리필店，通常允许单独入座。另外，韩国烤肉餐厅普遍不接受拆分结账，大家AA制的话要自己算好再付给一个人。', textEn: '고기는 최소 2인분부터 (minimum order is two servings)—almost all Korean BBQ restaurants require a minimum of two servings, and solo diners are usually politely turned away or seated in specific spots. If you\'re alone, try a 무한리필 (all-you-can-eat) place, which typically allows solo seating. Also, Korean BBQ restaurants generally don\'t split bills, so if you\'re going Dutch, calculate your share and pay one person.',
    },
    {
      type: 'phraseList',
      title: '토리 教你说——烤肉餐厅必备韩语', titleEn: 'Tori Teaches You—Essential Korean for BBQ Restaurants',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        {
          ko: '삼겹살 2인분 주세요.',
          ro: 'sam-gyeop-sal i-in-bun ju-se-yo',
          scene: '🥩 点肉，几인분=几人份', sceneEn: '🥩 Ordering Meat, 몇 인분 = How Many Servings',
          zh: '两人份五花肉', zhEn: 'Two servings of pork belly',
        },
        {
          ko: '불 좀 줄여주세요.',
          ro: 'bul jom jul-yeo-ju-se-yo',
          scene: '🔥 火太大时', sceneEn: '🔥 When the Fire Is Too High',
          zh: '请把火调小一点', zhEn: 'Please turn down the heat a bit.',
        },
        {
          ko: '불판 갈아주세요.',
          ro: 'bul-pan ga-ra-ju-se-yo',
          scene: '🍳 炉网变黑时', sceneEn: '🍳 When the Grill Grate Turns Black',
          zh: '请帮我换一下炉网', zhEn: 'Please change the grill grate for me.',
        },
        {
          ko: '반찬 더 주세요.',
          ro: 'ban-chan deo ju-se-yo',
          scene: '🥗 小菜吃完了', sceneEn: '🥗 When the Banchan Runs Out',
          zh: '请再给我一些小菜', zhEn: 'Please bring more side dishes.',
        },
        {
          ko: '볶음밥 해주실 수 있어요?',
          ro: 'bo-keum-bap hae-ju-sil su i-sseo-yo?',
          scene: '🍳 收尾炒饭', sceneEn: '🍳 Finishing with Fried Rice',
          zh: '可以帮我炒饭吗？', zhEn: 'Can you make the fried rice for me?',
        },
        {
          ko: '계산해 주세요.',
          ro: 'gye-san-hae ju-se-yo',
          scene: '💳 结账', sceneEn: '💳 Paying the Bill',
          zh: '请结账', zhEn: 'Please bring the check',
        },
        {
          ko: '잘 먹었습니다!',
          ro: 'jal meok-eot-sseum-ni-da',
          scene: '🙏 吃完后对店家说', sceneEn: '🙏 What to Say to the Staff After Eating',
          zh: '吃得很好，谢谢！', zhEn: 'It was delicious, thank you!',
        },
      ],
    },
    {
      type: 'vocabList',
      title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson',
      items: [
        { ko: '고기', zh: '肉', zhEn: 'meat' },
        { ko: '삼겹살', zh: '五花肉', zhEn: 'pork belly' },
        { ko: '목살', zh: '猪颈肉', zhEn: 'Pork neck' },
        { ko: '갈비', zh: '排骨', zhEn: 'Ribs' },
        { ko: '쌈', zh: '包肉（生菜卷）', zhEn: 'Bossam (lettuce wraps)' },
        { ko: '쌈장', zh: '包肉酱', zhEn: 'Meat dipping sauce' },
        { ko: '상추', zh: '生菜', zhEn: 'lettuce' },
        { ko: '깻잎', zh: '紫苏叶', zhEn: 'Perilla leaves' },
        { ko: '마늘', zh: '大蒜', zhEn: 'Garlic' },
        { ko: '참기름', zh: '芝麻油', zhEn: 'sesame oil' },
        { ko: '된장찌개', zh: '大酱汤', zhEn: 'soybean paste stew' },
        { ko: '볶음밥', zh: '炒饭', zhEn: 'Fried rice' },
        { ko: '회식', zh: '聚餐', zhEn: 'Group gathering (hoesik)' },
        { ko: '무한리필', zh: '无限续点', zhEn: 'Unlimited refills' },
      ],
    },
    {
      type: 'ending',
      text: '下次去首尔，토리 陪你一起烤。烟气升起的那一刻，所有人的距离都近了。韩国烤肉不只是一顿饭，是一种说"我们在一起"的方式。下一篇，토리 带你逛首尔街头小吃 🍡', textEn: 'Next time you\'re in Seoul, Tori will grill with you. The moment the smoke rises, everyone feels closer. Korean BBQ isn\'t just a meal—it\'s a way of saying "we\'re together." Next up, Tori takes you through Seoul\'s street food 🍡',
    },
  ],
},
  {
  slug: 'street-food',
  category: 'food',
  title: '街头小吃地图', titleEn: 'Street Food Map',
  subtitle: '길거리 음식 — 明洞、南大门、广藏市场，边走边吃', subtitleEn: 'Street food — Myeongdong, Namdaemun, Gwangjang Market, eat as you walk',
  emoji: '🍢',
  readMinutes: 10,
  bannerImage: '/images/banners/street-food.webp',
  blocks: [
    {
      type: 'intro',
      text: '토리觉得了解一个地方最快的方式，就是站在街边吃东西。首尔的街头小吃不只是"便宜的食物"，是这座城市最有温度的部分。下午四点的弘大，高中生放学后围着떡볶이摊；冬天的명동，每个人手里都捧着一个热腾腾的호떡；深夜的포장마차，陌生人坐在一起喝소주。今天토리 带你把首尔街头从头吃到尾 🍡', textEn: 'Tori thinks the fastest way to understand a place is to stand on the street and eat. Seoul\'s street food isn\'t just "cheap food"—it\'s the warmest part of the city. At 4 PM in Hongdae, high schoolers crowd around tteokbokki stalls after school; in winter in Myeongdong, everyone holds a steaming hotteok; late at night at pojangmacha, strangers sit together drinking soju. Today, Tori takes you from one end of Seoul\'s streets to the other 🍡',
    },
    {
      type: 'sectionTitle',
      emoji: '🍡',
      title: '떡볶이——韩国街头的灵魂', titleEn: 'Tteokbokki — The Soul of Korean Streets',
      sub: '不只是辣年糕，是一整套文化', subEn: 'Not just spicy rice cakes—it\'s a whole culture',
    },
    {
      type: 'cardGrid',
      variant: 'snack',
      cards: [
        {
          emoji: '🍡',
          ko: '떡볶이',
          zh: '炒年糕 · 韩国街头第一小吃', zhEn: 'Tteokbokki · Korea\'s #1 Street Food',
          price: '약 3,000–5,000원',
          desc: '年糕条（떡）加上辣椒酱（고추장）炒制而成，是韩国街头出现频率最高的食物。你在任何분식집（小吃店）门口都能看到它，在便利店里有杯装版，在高档餐厅里有精致版，甚至有整条街专门卖떡볶이。\n떡볶이最早出现在朝鲜时代宫廷里，叫做궁중떡볶이，用酱油调味，是高雅的宫廷料理。今天我们吃到的红色辣味版本，是1950年代以后才出现的平民化改良版——用当时大量涌入的美军带来的辣椒酱取代酱油，才变成了今天这个味道。', descEn: 'Made by stir-frying rice cake sticks (tteok) with gochujang (chili paste), it\'s the most common food on Korean streets. You\'ll see it outside any bunsikjip (snack bar), find cup versions in convenience stores, refined versions in upscale restaurants, and even entire streets dedicated to selling tteokbokki.\\nTteokbokki first appeared in the royal court of the Joseon Dynasty as gungjung tteokbokki, seasoned with soy sauce—an elegant court dish. The red spicy version we eat today is a平民ized adaptation that emerged after the 1950s, when gochujang brought by the influx of American troops replaced soy sauce, creating the flavor we know today.',
        },
      ],
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '토리 说', titleEn: 'Tori says',
      text: '떡볶이的辣度因店而异，差距极大。外国人第一次建议先点普通版，不要点불닭떡볶이（火鸡辣）。吃辣能力强的可以直接挑战，但先问一句 맵지 않은 걸로 주세요（给我不辣的）很重要。', textEn: 'Tteokbokki\'s spice level varies hugely from place to place. First-timers should order the regular version, not buldak tteokbokki (fire chicken spice). If you can handle heat, go for it, but asking 맵지 않은 걸로 주세요 (give me the non-spicy one) is important.',
    },
    {
      type: 'toriQuote',
      text: '떡볶이配上튀김（炸物）和순대（血肠）是固定组合，叫做분식 3종 세트。街边摊上三样加起来约7,000–10,000원，是最正宗的首尔放学后的味道。', textEn: 'Tteokbokki with twigim (fried snacks) and sundae (blood sausage) is a classic combo called the bunsik 3-item set. At street stalls, all three together cost about 7,000–10,000 won—the most authentic taste of after-school Seoul.',
    },
    {
      type: 'cardGrid',
      variant: 'snack',
      cards: [
        {
          emoji: '🍡',
          ko: '일반 떡볶이',
          zh: '普通炒年糕', zhEn: 'Regular Tteokbokki',
          desc: '고추장（辣椒酱）底，微辣到中辣，配鱼饼、水煮蛋一起煮。最平民最日常的版本，街边摊标配。', descEn: 'Gochujang (chili paste) base, mild to medium spice, cooked with fish cakes and boiled eggs. The most everyday, down-to-earth version—a street stall staple.',
          price: '约 3,000–4,000원', priceEn: 'About 3,000–4,000 won',
        },
        {
          emoji: '🧀',
          ko: '로제 떡볶이',
          zh: '奶油粉红炒年糕', zhEn: 'Creamy Rose Tteokbokki',
          desc: '辣椒酱加奶油调成玫瑰色酱汁，近年韩国最流行的新版本。奶香中带微辣，不那么刺激，适合辣度低的人。', descEn: 'Gochujang mixed with cream into a rose-colored sauce—the newest trend in Korea. Creamy with a mild kick, less intense, perfect for those who prefer less heat.',
          price: '约 5,000–8,000원', priceEn: 'About 5,000–8,000 won',
        },
        {
          emoji: '👑',
          ko: '궁중떡볶이',
          zh: '宫廷炒年糕', zhEn: 'Royal Court Tteokbokki',
          desc: '酱油底，不辣，加牛肉和蔬菜，是最古老的版本。想吃不辣的떡볶이，点这个。高档餐厅和百货美食区有售。', descEn: 'Soy sauce base, not spicy, with beef and vegetables—the oldest version. If you want non-spicy tteokbokki, order this. Available at upscale restaurants and department store food courts.',
          price: '约 8,000–15,000원', priceEn: 'About 8,000–15,000 won',
        },
        {
          emoji: '🔥',
          ko: '엽기떡볶이',
          zh: '变态辣炒年糕', zhEn: 'Insanely Spicy Tteokbokki',
          desc: '连锁品牌"엽기떡볶이"出品，辣度分级，最高级别是韩国辣度天花板。有粉丝专门去挑战，但토리 不太推荐初次体验。', descEn: 'From the chain brand "Yeopgi Tteokbokki," with heat levels that top out at Korea\'s spiciest. Some fans go just to challenge themselves, but Tori doesn\'t recommend it for first-timers.',
          price: '约 15,000원起（两人份）', priceEn: 'About 15,000 won and up (serves two)',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🌭',
      title: '순대——韩国版血肠，比你想象的好吃', titleEn: 'Sundae — Korea\'s blood sausage, tastier than you\'d think',
      sub: '不要因为"血肠"两个字望而却步', subEn: 'Don\'t let the word "blood sausage" scare you off',
    },
    {
      type: 'cardGrid',
      variant: 'snack',
      cards: [
        {
          emoji: '🌭',
          ko: '순대',
          zh: '韩国血肠 · 你一定要试一次', zhEn: 'Korean Sundae · You Have to Try It Once',
          price: '약 3,000–5,000원',
          desc: '순대是把猪血、糯米、蔬菜、粉丝塞进猪肠衣里蒸制而成的食物。这个描述听起来复杂，但吃起来出乎意料地温和——不像中式血肠那么浓郁的血腥气，糯米让口感变得软糯，配上소금（盐）和辣椒粉蘸着吃，完全是另一个味道。\n순대通常和떡볶이、튀김放在同一个摊位上，是韩国분식（小吃）文化的三位一体。한국사람들은 순대를 먹을 때 반드시 소금에 찍어 먹어요——吃순대一定要蘸盐，这是本地人的吃法，不要蘸辣酱。', descEn: 'Sundae is made by stuffing pork blood, glutinous rice, vegetables, and glass noodles into pork intestines and steaming it. That sounds complicated, but it\'s surprisingly mild — not as bloody as Chinese blood sausage. The rice makes it soft and chewy, and dipping it in salt and chili powder transforms it into something else entirely.\\nSundae is usually sold at the same stalls as tteokbokki and fried snacks, forming the holy trinity of Korean bunsik (snack) culture. Koreans always dip sundae in salt — that\'s the local way, not chili sauce.',
        },
      ],
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '兔莉推荐', titleEn: 'Tori\'s Pick',
      text: '순대국밥（순대汤饭）是把순대切块放进猪骨汤里煮成的汤饭，是韩国人最爱的宿醉解酒食物之一，也是冬天最暖心的一碗。', textEn: 'Sundae-gukbap (sundae soup with rice) is made by simmering sundae slices in pork bone broth. It\'s one of Koreans\' favorite hangover cures and the most comforting bowl in winter.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🥚',
      title: '겨울 간식——冬天街头的两大神物', titleEn: 'Winter Snacks — Two Street Food Legends',
      sub: '冷风里一口热的，这是首尔冬天的仪式感', subEn: 'A hot bite in the cold wind — that\'s Seoul winter\'s ritual',
    },
    {
      type: 'cardGrid',
      variant: 'snack',
      cards: [
        {
          emoji: '🥚',
          ko: '계란빵',
          zh: '鸡蛋面包', zhEn: 'egg bread',
          desc: '长方形的烤饼，中间嵌着整颗鸡蛋一起烤。外皮焦香，鸡蛋半熟，是首尔冬天街头最温暖的小吃之一。명동街头最多，边走边吃最地道。', descEn: 'A rectangular griddled cake with a whole egg baked into the middle. Crispy outside, soft-boiled egg inside — one of the warmest street snacks of Seoul winter. Most common in Myeongdong, best enjoyed while walking.',
          price: '약 1,500–2,000원',
        },
        {
          emoji: '🥞',
          ko: '호떡',
          zh: '호떡·韩国糖饼', zhEn: 'Hotteok · Korean Sugar Pancake',
          desc: '发酵面团包着黑糖、肉桂、花生炸制，咬开一口，黑糖浆流出来。烫手烫嘴，但停不下来。冬天必吃，夏天也有店在卖。', descEn: 'Fermented dough stuffed with brown sugar, cinnamon, and peanuts, then fried. One bite and the syrup oozes out. Burns your hands and mouth, but you can\'t stop. A winter must-have, though some shops sell it year-round.',
          price: '약 1,000–2,000원',
        },
        {
          emoji: '🐟',
          ko: '붕어빵',
          zh: '鲫鱼饼·红豆鱼形饼', zhEn: 'Bungeoppang · Red Bean Fish Cake',
          desc: '鱼形铁模烤出来的饼，内馅传统上是红豆，现在有奶油、地瓜等多种口味。韩国人对붕어빵有极深的情感记忆，是"爸爸的味道"。', descEn: 'Fish-shaped cakes baked in an iron mold, traditionally filled with red bean paste, now available in custard, sweet potato, and more. Koreans have deep nostalgic ties to bungeoppang — it\'s "dad\'s taste."',
          price: '약 1,000원/个', priceEn: 'About 1,000 won each',
        },
        {
          emoji: '🌽',
          ko: '군고구마 / 군밤',
          zh: '烤地瓜 / 烤板栗', zhEn: 'Roasted Sweet Potato / Roasted Chestnuts',
          desc: '首尔冬天街头的移动烤炉，烤地瓜和烤板栗装在报纸袋里递给你，握在手里先暖手再吃。这个场景在韩剧里出现过太多次了。', descEn: 'Mobile roasters on Seoul\'s winter streets hand you roasted sweet potatoes and chestnuts in newspaper bags. You warm your hands on them before eating. This scene has appeared in K-dramas way too many times.',
          price: '약 2,000–5,000원',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🍢',
      title: '튀김과 오뎅——炸物和鱼饼', titleEn: 'Twigim and Odeng — Fried Snacks and Fish Cake',
      sub: '분식집的另外两个主角', subEn: 'The other two stars of the bunsik shop',
    },
    {
      type: 'cardGrid',
      variant: 'snack',
      cards: [
        {
          emoji: '🍤',
          ko: '튀김',
          zh: '韩式炸物', zhEn: 'Korean Fried Snacks',
          desc: '炸年糕、炸蔬菜、炸虾、炸乌贼圈……韩式튀김用薄薄的面衣炸得酥脆，比日式天妇罗更厚实。蘸떡볶이酱汁一起吃，是标准搭配。', descEn: 'Fried rice cakes, vegetables, shrimp, squid rings... Korean twigim uses a thin batter for a crispy crunch, heartier than Japanese tempura. Dipping them in tteokbokki sauce is the standard combo.',
          price: '약 500–1,000원/개',
        },
        {
          emoji: '🍢',
          ko: '오뎅 (어묵)',
          zh: '鱼饼串·关东煮', zhEn: 'Fish Cake Skewers · Odeng',
          desc: '鱼饼串在热汤里泡着，一串一串插在铁签上。汤本身也很好喝，通常可以免费喝一杯。冬天站在街边喝一口热鱼饼汤，是首尔最朴实的温暖。', descEn: 'Fish cake skewers soak in hot broth, each one stuck on a metal stick. The broth itself is delicious and usually free to drink. Standing on a street corner in winter, sipping hot fish cake soup—that\'s Seoul\'s simplest warmth.',
          price: '약 500–1,000원/串', priceEn: '약 500–1,000원 per skewer',
        },
        {
          emoji: '🐔',
          ko: '닭꼬치',
          zh: '烤鸡肉串', zhEn: 'Grilled chicken skewers',
          desc: '韩式烤鸡肉串，刷上甜辣酱或原味，在炭火或铁板上烤制。弘大和홍대 앞附近的夜市最多，是夜晚逛街必吃的小吃。', descEn: 'Korean-style grilled chicken skewers, brushed with sweet-spicy sauce or left plain, grilled over charcoal or on a griddle. Most common in the night markets around Hongdae and Hongdae Station—a must-eat when strolling at night.',
          price: '약 2,000–3,500원/串', priceEn: '약 2,000–3,500원 per skewer',
        },
        {
          emoji: '🥔',
          ko: '회오리 감자',
          zh: '旋风土豆', zhEn: 'Tornado potato',
          desc: '整颗土豆螺旋切开、串在棍子上炸制，撒上各种调味粉。在名洞、홍대的街头小吃区最常见，颜值高，边走边吃方便，是很多人来首尔必拍的小吃。', descEn: 'A whole potato spiral-cut, skewered, and deep-fried, then dusted with various seasonings. Most common in the street food areas of Myeongdong and Hongdae—it\'s photogenic, easy to eat on the go, and a must-photo snack for many visiting Seoul.',
          price: '약 3,000–4,000원',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🗺️',
      title: '首尔街头小吃必去地点', titleEn: 'Must-visit spots for Seoul street food',
      sub: '不同街区有不同的街头食物性格', subEn: 'Each neighborhood has its own street food personality',
    },
    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        {
          emoji: '🛍️',
          ko: '명동',
          zh: '明洞 · 街头小吃最密集的地方', zhEn: 'Myeongdong · The densest street food hub',
          desc: '首尔街头小吃的集中展示区，从傍晚到深夜，街道两侧全是小吃摊。旋风土豆、계란빵、닭꼬치、韩式年糕冰激凌……种类最全，但价格比其他区略高，游客众多。', descEn: 'Seoul\'s concentrated street food showcase—from dusk to late night, both sides of the street are lined with stalls. Tornado potatoes, egg bread, chicken skewers, Korean rice cake ice cream... the widest variety, but prices are slightly higher than other areas and it\'s packed with tourists.',
          tip: '토리 必吃：계란빵 + 회오리 감자，边走边吃，体验명동夜晚', tipEn: 'Tori\'s must-eat: Egg bread + tornado potato, eat on the go and experience a Myeongdong night',
        },
        {
          emoji: '🎨',
          ko: '홍대 앞',
          zh: '弘大 · 年轻人的街头食物圣地', zhEn: 'Hongdae · The young crowd\'s street food mecca',
          desc: '韩国大学文化聚集地，주변에 분식집과 포차（路边摊酒馆）最多。这里的떡볶이和튀김是大学生的日常，价格比명동便宜，更接地气。深夜还有포장마차（小摊酒馆）开着。', descEn: 'A hub of Korean university culture, with the most snack bars and street stalls (pocha) around. Here, tteokbokki and fried snacks are a college student\'s daily staple—cheaper and more down-to-earth than Myeongdong. Late at night, tent bars (pojangmacha) are still open.',
          tip: '토리 必吃：분식집의 떡볶이+순대+튀김 세트，大学生同款', tipEn: 'Tori\'s must-eat: Snack bar\'s tteokbokki + sundae + fried snack set—the college student classic',
        },
        {
          emoji: '🏛️',
          ko: '광장시장',
          zh: '广藏市场 · 首尔最古老的室内市场', zhEn: 'Gwangjang Market · Seoul\'s oldest indoor market',
          desc: '1905年开业，是首尔历史最悠久的市场之一。这里的街头食物更传统——마약김밥（迷你紫菜卷）、빈대떡（绿豆煎饼）、육회비빔밥（牛肉拌饭）是代表作。曾被Netflix美食节目专门介绍。', descEn: 'Opened in 1905, it\'s one of Seoul\'s oldest markets. The street food here is more traditional—drug kimbap (mini seaweed rice rolls), bindaetteok (mung bean pancakes), and yukhoe bibimbap (raw beef rice bowl) are the signature items. It\'s been featured on a Netflix food show.',
          tip: '토리 必吃：마약김밥，一口一个，蘸芥末酱油，停不下来', tipEn: 'Tori\'s must-eat: Drug kimbap—pop them one by one, dip in mustard soy sauce, and you can\'t stop',
        },
        {
          emoji: '🌙',
          ko: '포장마차 골목',
          zh: '路边摊酒馆小巷 · 深夜首尔最真实的地方', zhEn: 'Tent bar alleys · The most authentic side of Seoul at night',
          desc: '포장마차是用塑料帐篷搭成的流动摊位，通常在深夜出现，卖소주、맥주、오뎅、순대。坐在折叠椅上，和陌生人相邻而坐，这是韩剧里反复出现的"真实首尔深夜"的场景。', descEn: 'Pojangmacha are mobile stalls made of plastic tents, usually appearing late at night, selling soju, beer, fish cake soup, and sundae. Sitting on folding chairs next to strangers—this is the "real Seoul at night" scene that shows up again and again in K-dramas.',
          tip: '토리 推荐：东大门周边和弘大某些小巷，深夜10点后最热闹', tipEn: 'Tori\'s pick: Alleys around Dongdaemun and certain Hongdae lanes—liveliest after 10 PM',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '⭐',
      title: '광장시장의 마약김밥——上瘾的小紫菜卷', titleEn: 'Gwangjang Market\'s drug kimbap—the addictive mini seaweed rice rolls',
      sub: '마약 = 毒品，因为吃了停不下来', subEn: '마약 = drug, because you can\'t stop eating them',
    },
    {
      type: 'paragraph',
      heading: '🍱 마약김밥是什么', headingEn: '🍱 What is drug kimbap?',
      text: '마약（마약，毒品）+ 김밥（紫菜卷）= 让人上瘾的紫菜卷。광장시장里的마약김밥是迷你版김밥，比普通김밥细很多，里面只有萝卜、菠菜、鸡蛋、胡萝卜几样简单的蔬菜，配上芥末（겨자）酱油蘸着吃。\n神奇的地方在于——食材简单到极致，但配合比例和芥末酱油，吃第一个就停不下来。광장시장的阿줌마（阿姨）们在这里卖마약김밥已经几十年了，配方代代相传，每天从早卖到晚。',
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '토리 실전 경험',
      text: '토리 第一次去，买了1人份（약 3,000원），吃完立刻再买了一份。阿줌마笑着说"마약이라서（因为是마약）"。不是玩笑，真的停不下来。',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🗓️',
      title: '不同季节，街头不同味道', titleEn: 'Different seasons, different street flavors',
      sub: '去首尔的时间不同，吃到的也不同', subEn: 'Different times in Seoul, different foods',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          zh: '草莓季 + 樱花小吃', zhEn: 'Strawberry season + cherry blossom snacks',
          desc: '딸기 (草莓) 甜品大爆发\n딸기찹쌀떡（草莓麻薯）\n벚꽃 (樱花) 限定饮品和甜点\n광장시장的春季鲜蔬煎饼', descEn: 'A strawberry dessert explosion\\nStrawberry chapssal tteok (strawberry mochi)\\nCherry blossom limited-edition drinks and desserts\\nGwangjang Market\'s spring vegetable pancakes',
          tags: ['🌸 春天 · 3–5月'],
        },
        {
          zh: '冰品天下', zhEn: 'A world of icy treats',
          desc: '팥빙수（刨冰+红豆）韩国夏天必吃\n옥수수 아이스크림（玉米冰淇淋）\n수박주스（西瓜汁）街边现榨\n냉면 (冷面) 流行于夏日', descEn: 'Patbingsu (shaved ice with red beans)—a must-eat in Korean summers\\nCorn ice cream\\nFreshly squeezed watermelon juice on the street\\nNaengmyeon (cold noodles) is a summer favorite',
          tags: ['☀️ 夏天 · 6–8月'],
        },
        {
          zh: '糕点和板栗季', zhEn: 'Rice cakes and chestnut season',
          desc: '군밤（烤板栗）开始上市\n고구마 (地瓜) 甜品全面上线\n수능 (高考) 时节的엿（麦芽糖）\n추석 송편（松糕）在传统市场', descEn: 'Roasted chestnuts start hitting the streets\\nSweet potato desserts are everywhere\\nYeot (malt candy) during the CSAT season\\nChuseok songpyeon (rice cakes) at traditional markets',
          tags: ['🍂 秋天 · 9–11月'],
        },
        {
          zh: '热食和暖意', zhEn: 'Hot food and warm vibes',
          desc: '호떡 (糖饼) 冬天街头必备\n군고구마（烤地瓜）暖手又暖胃\n붕어빵（鲫鱼饼）冬天专属\n어묵탕（关东煮汤）站着喝', descEn: 'Hotteok (sweet pancakes)—a winter street essential\\nRoasted sweet potatoes warm your hands and stomach\\nBungeoppang (fish-shaped bread)—a winter exclusive\\nEomuk tang (fish cake soup)—enjoy it standing up',
          tags: ['❄️ 冬天 · 12–2月'],
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '💬',
      title: '街头小吃怎么点——분식집实战指南', titleEn: 'How to order street food—a practical guide to bunsikjip',
      sub: '没有菜单，没有服务员，但很好操作', subEn: 'No menu, no waiters, but easy to navigate',
    },
    {
      type: 'steps',
      steps: [
        {
          label: '走近摊位看清楚卖什么', labelEn: 'Walk up and see what they\'re selling',
          desc: '通常会有价格牌，或者直接看锅里有什么。不确定就指着说이거（这个）。', descEn: 'There\'s usually a price sign, or just look at what\'s in the pot. If you\'re unsure, point and say "igeo" (this one).',
        },
        {
          label: '说你要什么和数量', labelEn: 'Say what you want and how many',
          desc: '最简单的方式是直接指着说"이거 하나（一个这个）"或"이거 두 개（两个这个）"。', descEn: 'The easiest way is to point and say "igeo hana" (one of these) or "igeo du gae" (two of these).',
        },
        {
          label: '说辣度要求（如果有）', labelEn: 'Specify your spice level (if applicable)',
          ko: '덜 맵게 해주세요（少放辣椒酱） / 맵지 않게 해주세요（不要辣）',
        },
        {
          label: '付钱', labelEn: 'Pay',
          desc: '通常边点边结账。街边摊多数接受卡，但小摊位有时只收现금（现金），建议备一些小额韩元现金。', descEn: 'You usually pay as you order. Most street stalls accept cards, but small stands sometimes only take cash, so it\'s a good idea to carry some small won bills.',
        },
        {
          label: '站着或找台子吃', labelEn: 'Eat standing up or find a counter',
          desc: '大部分街头小吃没有座位，就是站着吃。找摊位旁边的高台或边上任何地方放下就是你的临时餐桌。', descEn: 'Most street food has no seating—you just stand and eat. Find a ledge near the stall or anywhere on the side, and that\'s your makeshift table.',
        },
      ],
    },
    {
      type: 'sectionTitle',
      emoji: '🔍',
      title: '街头小吃冷知识', titleEn: 'Street food fun facts',
      sub: '吃之前知道，吃的时候更有感触', subEn: 'Knowing these before you eat makes it more meaningful',
    },
    {
      type: 'trivia',
      items: [
        {
          tag: '분식 문화',
          q: '분식이란 무엇인가？（分食是什么）', qEn: 'What is bunsik (street food)?',
          a: '분식（分食）字面意思是"分粮食"，起源于1960–70年代韩国粮食匮乏时期，政府推广 减少大米消耗的运动，鼓励用面粉制品代替米饭。떡볶이、순대、라면都是这个时代的产物。从政策变成了一种深入人心的饮食文化，如今분식집是韩国最亲民的餐厅类型。', aEn: 'Bunsik literally means "sharing food." It started in the 1960s–70s when Korea faced food shortages, and the government promoted reducing rice consumption by encouraging flour-based foods instead. Tteokbokki, sundae, and ramyeon all came from this era. What began as policy became a beloved food culture—today, bunsik restaurants are Korea\'s most accessible eateries.',
        },
        {
          tag: '오뎅 vs 어묵',
          q: '오뎅和어묵有什么区别？', qEn: 'What\'s the difference between odeng and eomuk?',
          a: '어묵是鱼饼的正式韩语名，오뎅是从日语おでん（关东煮）借来的词。两个词在韩国都在用——어묵更正式、更书面，오뎅更口语、更像街头说法。在분식집摊位上的价格牌写的通常是어묵，但很多韩国人说오뎅하나 주세요（给我一串오뎅）。', aEn: 'Eomuk is the formal Korean name for fish cake, while odeng comes from the Japanese oden. Both are used in Korea—eomuk is more formal and written, while odeng is more casual and street-style. At bunsik stalls, the price signs usually say eomuk, but many Koreans say "odeng hana juseyo" (give me one odeng).',
        },
        {
          tag: '포장마차 문화',
          q: '포장마차在韩国有什么特殊意义？', qEn: 'What\'s the special meaning of pojangmacha in Korea?',
          a: '포장마차（包装马车，即帐篷摊位）在1980–90年代的首尔是重要的社会空间——劳动者、学生、普通市民在这里喝酒聊天。后来城市化管理让许多포장마차消失，但它在韩剧中的出现让它成为了"真实韩国"的文化符号。现在부산 포장마차（釜山路边摊）和首尔东大门一带仍然有保留。', aEn: 'Pojangmacha (tent stalls) were key social spaces in Seoul during the 1980s–90s—workers, students, and everyday people gathered here to drink and chat. Urban management later made many disappear, but their presence in K-dramas turned them into a symbol of "real Korea." Today, you can still find them in Busan and around Seoul\'s Dongdaemun.',
        },
        {
          tag: '가격 문화',
          q: '韩国街头小吃为什么这么便宜？', qEn: 'Why is Korean street food so cheap?',
          a: '韩国政府长期对基本食品价格有补贴和管控传统，특히（特别是）떡볶이, 라면, 순대 这类平民食物的价格增幅远低于其他物价。一碗떡볶이几十年来价格变化幅度极小，这是韩国政府对"서민 음식（平民食物）"的一种隐性保护。', aEn: 'The Korean government has long subsidized and regulated basic food prices, especially for everyday foods like tteokbokki, ramyeon, and sundae, whose price increases have stayed far below other goods. A bowl of tteokbokki has barely changed in price over decades—it\'s a quiet form of protection for "common people\'s food."',
        },
      ],
    },
    {
      type: 'highlight',
      variant: 'warning',
      title: '🍡 逛首尔街头小吃之前要知道', titleEn: '🍡 What to know before hitting Seoul\'s street food',
      text: '街头小吃摊通常不提供湿纸巾，建议自己带。另外，很多小摊位不提供垃圾桶，韩国街头垃圾桶很少，要把包装带到便利店旁边的垃圾桶扔掉，或者找最近的分类垃圾桶。吃完东西在街上随手乱扔，会被认为非常没有素质。', textEn: 'Street food stalls usually don\'t provide wet wipes, so bring your own. Also, many stalls don\'t have trash bins, and Korea has very few public bins—take your packaging to a bin near a convenience store or find the nearest recycling bin. Tossing trash on the street is seen as very rude.',
    },
    {
      type: 'phraseList',
      title: '토리 教你说——街头小吃必备韩语', titleEn: 'Tori teaches you—essential Korean for street food',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        {
          ko: '떡볶이 하나 주세요.',
          ro: 'tteok-bo-kki ha-na ju-se-yo',
          scene: '🍡 点떡볶이', sceneEn: '🍡 Ordering tteokbokki',
          zh: '给我一份炒年糕', zhEn: 'Give me one serving of tteokbokki',
        },
        {
          ko: '덜 맵게 해주세요.',
          ro: 'deol maep-ge hae-ju-se-yo',
          scene: '🌶️ 要求减辣', sceneEn: '🌶️ Asking for less spicy',
          zh: '请少放辣椒酱', zhEn: 'Please use less gochujang',
        },
        {
          ko: '이거랑 이거 주세요.',
          ro: 'i-geo-rang i-geo ju-se-yo',
          scene: '👆 指着两样东西点', sceneEn: '👆 Pointing at two items to order',
          zh: '这个和这个都给我', zhEn: 'Give me this and this',
        },
        {
          ko: '얼마예요?',
          ro: 'eol-ma-ye-yo?',
          scene: '💰 问价格', sceneEn: '💰 Asking the price',
          zh: '多少钱？', zhEn: 'How much is it?',
        },
        {
          ko: '카드 되나요?',
          ro: 'ka-deu doe-na-yo?',
          scene: '💳 确认能否刷卡', sceneEn: '💳 Checking if card is accepted',
          zh: '可以刷卡吗？', zhEn: 'Can I pay by card?',
        },
        {
          ko: '국물도 마실 수 있어요?',
          ro: 'gung-mul-do ma-sil su i-sseo-yo?',
          scene: '🍜 鱼饼摊喝汤', sceneEn: '🍜 Having soup at a fish cake stall',
          zh: '汤也可以喝吗？', zhEn: 'Can I drink the soup too?',
        },
      ],
    },
    {
      type: 'sectionTitle',
      emoji: '📖',
      title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson',
    },
    {
      type: 'vocabList',
      items: [
        { ko: '떡볶이', zh: '炒年糕', zhEn: 'tteokbokki' },
        { ko: '순대', zh: '血肠', zhEn: 'blood sausage' },
        { ko: '튀김', zh: '炸物', zhEn: 'Fried food' },
        { ko: '오뎅', zh: '鱼饼串', zhEn: 'Fish cake skewer' },
        { ko: '호떡', zh: '糖饼', zhEn: 'sweet pancake (hotteok)' },
        { ko: '붕어빵', zh: '鲫鱼饼', zhEn: 'Bungeoppang (fish-shaped pastry)' },
        { ko: '계란빵', zh: '鸡蛋面包', zhEn: 'egg bread' },
        { ko: '군고구마', zh: '烤地瓜', zhEn: 'Roasted sweet potato' },
        { ko: '마약김밥', zh: '上瘾紫菜卷', zhEn: 'Addictive Gimbap' },
        { ko: '분식', zh: '小吃·面食', zhEn: 'Snacks & Noodles' },
        { ko: '포장마차', zh: '路边摊酒馆', zhEn: 'Street Food Pub' },
        { ko: '국물', zh: '汤·汤汁', zhEn: 'Soup & Broth' },
      ],
    },
    {
      type: 'ending',
      text: '首尔的味道，藏在街边的烟气里\n不需要预约，不需要太多钱，\n走进一条小巷，跟着香味走，\n那就是最真实的首尔。\n下一篇，토리 带你探索韩国人为什么这么爱喝汤 🍲', textEn: 'The taste of Seoul hides in the smoky streets.\\nNo reservations, no big budget—\\njust walk down an alley, follow the aroma,\\nand you\'ll find the real Seoul.\\nNext up, Tori takes you into why Koreans love soup so much 🍲',
    },
  ],
},
  {
  slug: 'korean-soup',
  category: 'food',
  title: '韩国人为什么这么爱喝汤', titleEn: 'Why Koreans Love Soup So Much',
  subtitle: '국과 찌개 — 一碗汤的哲学', subtitleEn: 'Guk & Jjigae — The Philosophy of a Bowl of Soup',
  emoji: '🍲',
  readMinutes: 10,
  bannerImage: '/images/banners/korean-soup.webp',
  blocks: [
    {
      type: 'toriQuote',
      label: '토리 说', labelEn: 'Tori says',
      text: '토리在韩国朋友家吃过很多顿饭，发现一件事：无论吃什么，桌上一定有一碗汤。烤肉旁边是된장찌개，白米饭旁边是미역국，解酒早晨是해장국，生日当天是미역국……韩国人和汤的关系，不只是“好喝”，是一种文化里的情感连接。今天토리 把韩国汤文化从头到尾讲给你听，让你看见那碗汤背后的故事 🍲', textEn: 'Tori has eaten many meals at Korean friends\' homes and noticed one thing: no matter what\'s on the table, there\'s always a bowl of soup. Grilled meat comes with doenjang jjigae, white rice with miyeokguk, a hangover morning with haejangguk, and a birthday with miyeokguk... Koreans\' relationship with soup isn\'t just about taste—it\'s an emotional connection rooted in culture. Today, Tori walks you through Korean soup culture from start to finish, so you can see the story behind that bowl 🍲',
    },
    {
      type: 'sectionTitle',
      emoji: '🤔',
      title: '为什么每顿饭都有汤', titleEn: 'Why Every Meal Has Soup',
      sub: '不是偶然，是几百年的饮食哲学', subEn: 'Not by chance—it\'s centuries of food philosophy',
    },
    {
      type: 'paragraph',
      heading: '🌾 从农耕文化说起', headingEn: '🌾 It Starts with Agrarian Culture',
      text: '韩国的汤文化根植于农耕传统。在农耕社会里，劳动量大、消耗高，需要食物既能填饱肚子又能快速补充水分和盐分。汤完美地满足了这个需求——米饭提供碳水，汤提供水分和矿物质，泡菜提供发酵益生菌，这三样构成了韩国饮食的铁三角。', textEn: 'Korea\'s soup culture is rooted in agrarian traditions. In farming society, heavy labor and high energy expenditure demanded food that filled you up while quickly replenishing fluids and salt. Soup fit the bill perfectly—rice provides carbs, soup provides water and minerals, and kimchi provides fermented probiotics. Together, these three form the iron triangle of Korean cuisine.',
    },
    {
      type: 'paragraph',
      text: '韩语里有个说法叫 국밥 한 그릇（一碗汤饭），意思是把米饭泡进汤里吃。这是韩国最朴素、最有历史感的饮食方式，也是韩国人在疲惫或生病时本能选择的食物形态。', textEn: 'There\'s a Korean expression, gukbap han geureut (a bowl of soup rice), meaning rice soaked in soup. It\'s Korea\'s most humble, historically rich way of eating—and the food Koreans instinctively turn to when tired or sick.',
    },
    {
      type: 'toriQuote',
      label: '토리 说', labelEn: 'Tori says',
      text: '韩语里“국물도 없다”（连汤都没有）是一句惯用语，意思是“什么都没有，彻底落空”。汤在韩国文化里是最基本的存在——连最基本的都没有了，那真的是一无所有。', textEn: 'In Korean, \'gukmuldo eopda\' (not even broth) is an idiom meaning \'nothing at all, completely empty.\' Soup is the most basic staple in Korean culture—if you don\'t even have that, you truly have nothing.',
    },
    {
      type: 'paragraph',
      heading: '♨️ 汤是情感的载体', headingEn: '♨️ Soup Carries Emotion',
      text: '在韩国文化里，给人做一碗汤，是一种深沉的关心表达。妈妈给生病的孩子미역국을 끓여주다，奶奶给回家过节的孙子煮一锅大骨汤，老婆给醉酒回来的丈夫端出一碗해장국——这些场景在韩剧里反复出现，因为它们就是真实的韩国生活。', textEn: 'In Korean culture, making someone a bowl of soup is a deep expression of care. A mother simmers miyeokguk for a sick child, a grandmother boils bone broth for a grandchild home for the holidays, a wife serves haejangguk to her husband stumbling in drunk—these scenes repeat in K-dramas because they\'re real Korean life.',
    },
    {
      type: 'paragraph',
      text: '汤不需要语言，它本身就是一句“我想到你了，我在乎你”。这是韩国饮食文化里最温柔的部分。', textEn: 'Soup needs no words—it is itself a message: \'I thought of you, I care about you.\' That\'s the gentlest part of Korean food culture.',
    },
    {
      type: 'toriQuote',
      label: '토리',
      text: '학습 포인트：下次看韩剧，注意角色喝汤的场景。那碗汤是谁做的、为什么做、在什么时候喝——这三个问题的答案，就是这个场景真正要传达的情感。', textEn: 'Learning point: Next time you watch a K-drama, pay attention to soup-drinking scenes. Who made that soup, why, and when it\'s drunk—the answers to these three questions are the real emotion the scene conveys.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🗓️',
      title: '什么场合喝什么汤', titleEn: 'Which Soup for Which Occasion',
      sub: '韩国人的汤，有精确的场合对应关系', subEn: 'Koreans match soups to occasions with precision',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          emoji: '🎂',
          ko: '미역국（裙带菜汤）',
          zh: '생일 · 生日', zhEn: 'Birthday',
          desc: '韩国人生日当天一定喝미역국，来自“妈妈生我们那天喝裙带菜汤”的传统。不喝미역국就像没过生日。考试失败有时会说“오늘 미역국 먹었다”（今天喝了裙带菜汤）——因为미역（裙带菜）滑，象征“滑倒/失败”。', descEn: 'Koreans always drink miyeokguk on their birthday, a tradition from the seaweed soup mothers eat after giving birth. Skipping it feels like not having a birthday. Failing an exam is sometimes called \'oneul miyeokguk meogeotda\' (had seaweed soup today)—because miyeok (seaweed) is slippery, symbolizing \'slipping up/failing.\'',
        },
        {
          emoji: '🌅',
          ko: '해장국（解酒汤）',
          zh: '숙취 · 宿醉后早晨', zhEn: 'Hangover Morning',
          desc: '뼈해장국（猪骨汤）、콩나물국밥（豆芽汤饭）、북엇국（明太鱼汤）……解酒汤种类繁多，但功能一致：补充酒精消耗的盐分和水分，帮助肠胃恢复。韩国有专门的해장국餐厅，从凌晨就开始营业。', descEn: 'Hangover soups come in many varieties—뼈해장국 (pork bone soup), 콩나물국밥 (bean sprout soup with rice), 북엇국 (pollack soup)—but they all serve the same purpose: replenishing the salt and water lost to alcohol and helping your stomach recover. Korea has dedicated 해장국 restaurants that open as early as dawn.',
        },
        {
          emoji: '🤒',
          ko: '삼계탕（参鸡汤）',
          zh: '몸이 아플 때 · 生病时', zhEn: 'When you\'re sick',
          desc: '整只小鸡里塞入人参、糯米、红枣、大蒜慢炖而成。韩国人相信삼계탕有强身健体、补充元气的功效。夏天三伏天（복날）反而要吃삼계탕——“以热攻热”，这是韩国传统养生哲学。', descEn: 'A whole young chicken is stuffed with ginseng, glutinous rice, jujubes, and garlic, then simmered slowly. Koreans believe samgyetang strengthens the body and restores vital energy. Ironically, it\'s eaten during the hottest summer days (복날)—fighting heat with heat, a core principle of Korean traditional wellness.',
        },
        {
          emoji: '❄️',
          ko: '설렁탕 / 곰탕（牛骨汤）',
          zh: '추운 겨울날 · 寒冷的冬天', zhEn: 'On cold winter days',
          desc: '用牛骨、牛肉慢熬十几个小时的乳白色浓汤。汤色雪白、味道醇厚，是首尔冬天最有历史感的一碗汤。점심으로 설렁탕 한 그릇（午饭一碗牛骨汤）是很多首尔上班族的冬季日常。', descEn: 'A milky white broth made by simmering ox bones and beef for over ten hours. Snow-white and deeply savory, it\'s Seoul\'s most historic winter soup. A bowl of seolleongtang for lunch is a winter ritual for many Seoul office workers.',
        },
        {
          emoji: '🏠',
          ko: '된장찌개 / 김치찌개（大酱汤 / 泡菜锅）',
          zh: '일상 식사 · 日常每顿饭', zhEn: 'Everyday meals',
          desc: '韩国家庭餐桌的日常汤，几乎每天都有。된장찌개（大豆酱汤）是最家常的，豆腐、蔬菜、豆酱慢煮；김치찌개（泡菜锅）是泡菜和猪肉煮成的酸辣汤，是韩国人最思念家的味道之一。', descEn: 'The everyday soups on Korean family tables, served almost daily. Doenjang jjigae is the most homey—tofu, vegetables, and soybean paste simmered slowly. Kimchi jjigae is a spicy, tangy stew of kimchi and pork, one of the tastes Koreans miss most when away from home.',
        },
        {
          emoji: '🎊',
          ko: '떡국（年糕汤）',
          zh: '설날 · 韩国春节', zhEn: 'Seollal (Korean New Year)',
          desc: '설날必喝，白色年糕片象征新年、纯洁、长寿。吃了一碗떡국就算过了一岁。这碗汤在韩国文化里承载了时间的流逝和对新年的期望，是설날最重要的仪式食物。', descEn: 'A must-have on Seollal. The white rice cake slices symbolize the new year, purity, and longevity. Eating a bowl of tteokguk means you\'ve turned a year older. This soup carries the passage of time and hopes for the new year—the most important ceremonial food of Seollal.',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🍲',
      title: '六碗必须了解的韩国经典汤', titleEn: 'Six Korean classic soups you need to know',
      sub: '每一碗都有故事，每一碗都有它存在的理由', subEn: 'Every bowl has a story, and every bowl has a reason to exist',
    },
    {
      type: 'featureCard',
      emoji: '🐔',
      title: '삼계탕',
      desc: `参鸡汤 · 韩国最有名的养生汤（复날 필수 / 三伏天必吃）

整只小嫩鸡的腹腔里塞满糯米、人参、红枣、大蒜，放入陶锅里加水慢炖两到三小时。端上桌时鸡汤乳白，鸡肉软烂到用筷子轻轻一拨就脱骨，糯米吸饱了汤汁，一口下去鲜香无比。

韩国人在복날（三伏天）——夏天最热的三天——专门吃삼계탕。这是韩国传统“이열치열（以热攻热）”养生哲学的体现：在最热的天气里吃最热的汤，通过大量出汗排出体内湿气，反而帮助身体适应酷暑。`,
    },
    {
      type: 'toriQuote',
      label: '토리',
      text: '首尔最好的삼계탕餐厅在종로（钟路）一带，有些已经营业超过50年。土요일 점심에 줄이 엄청 길어요——周末午饭时间要排很长的队，建议平日工作日去。', textEn: 'Seoul\'s best samgyetang restaurants are around Jongno, some in business for over 50 years. Lines get incredibly long at lunch on weekends—go on a weekday instead.',
    },
    {
      type: 'featureCard',
      emoji: '🫕',
      title: '된장찌개',
      desc: `大酱汤 · 韩国家庭的味道（매일 먹는 국 / 每天都在喝）

된장（大豆酱）是韩国传统发酵食品，用黄豆发酵制成，含有大量益生菌。된장찌개就是以된장为底料，加入豆腐、蔬菜、蘑菇、辣椒等食材炖煮的汤。

된장찌개没有固定配方，每家的味道都不一样——这正是它的魅力。韩国人对된장찌개有极深的情感认同，离家在外的人最想念的往往是“엄마가 끓여준 된장찌개”（妈妈煮的된장찌개）。这碗汤的味道，就是家的味道。`,
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '된장 vs 미소',
      text: '很多人觉得된장찌개和日本味噌汤（みそ汁）很像，但两者的发酵工艺不同，된장的味道更浓厚、更复杂、发酵程度更深。韩国人对把된장찌개和味噌汤混为一谈这件事，非常在意。', textEn: 'Many people think doenjang jjigae is similar to Japanese miso soup, but the fermentation processes differ—doenjang is richer, more complex, and fermented longer. Koreans really care about this distinction.',
    },
    {
      type: 'cardGrid',
      variant: 'snack',
      cards: [
        {
          emoji: '🌿',
          ko: '미역국',
          zh: '裙带菜汤', zhEn: 'Miyeokguk (seaweed soup)',
          desc: '裙带菜（미역）富含碘和矿物质，韩国产后妈妈必喝，生日当天必喝。味道清淡鲜美，汤色透明。也有用牛肉或蛤蜊熬制的版本，鲜味更浓。', descEn: 'Seaweed (miyeok) is rich in iodine and minerals. Korean mothers drink it after childbirth, and everyone drinks it on their birthday. Light, savory, and clear. Beef or clam versions add even more umami.',
          tags: ['📅 生日 · 产后 · 日常'],
        },
        {
          emoji: '🌶️',
          ko: '김치찌개',
          zh: '泡菜锅', zhEn: 'Kimchi jjigae (kimchi stew)',
          desc: '熟成的泡菜和猪肉（或金枪鱼罐头）一起炖，酸辣鲜香，是韩国人最思乡的味道。发酵过的老泡菜味道更深沉，是做김치찌개的最佳原料。', descEn: 'Aged kimchi stewed with pork (or canned tuna)—spicy, tangy, and savory. It\'s the taste Koreans miss most when homesick. Well-fermented old kimchi has a deeper flavor and makes the best kimchi jjigae.',
          tags: ['📅 日常 · 思乡时 · 配饭首选'],
        },
        {
          emoji: '🦴',
          ko: '설렁탕',
          zh: '牛骨汤', zhEn: 'Seolleongtang (ox bone soup)',
          desc: '牛骨、牛腿肉慢熬十几小时的乳白色浓汤，加盐和葱花调味，配白米饭泡着吃。冬天首尔최고의 위로食（最佳安慰食物）。', descEn: 'A milky broth simmered from ox bones and shank for over ten hours, seasoned with salt and scallions, and eaten with rice soaked in it. Seoul\'s ultimate comfort food in winter.',
          tags: ['📅 冬天 · 午饭 · 疲惫时'],
        },
        {
          emoji: '🫘',
          ko: '순두부찌개',
          zh: '嫩豆腐锅', zhEn: 'Sundubu jjigae (soft tofu stew)',
          desc: '嫩滑豆腐加辣椒底料，配海鲜或猪肉，用陶锅盛上桌时还在沸腾。在嫩豆腐上打一个生鸡蛋，利用余温煮熟，是标准吃法。', descEn: 'Silky soft tofu in a spicy chili base with seafood or pork, served bubbling in a stone pot. Crack a raw egg into the tofu and let the residual heat cook it—that\'s the standard way to eat it.',
          tags: ['📅 早餐 · 轻食 · 任何时候'],
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🥣',
      title: '국밥 문화——汤饭，最朴素的一碗', titleEn: 'Gukbap Culture — The Humblest Bowl of Soup Rice',
      sub: '把饭泡进汤里，这是韩国人最自然的吃法', subEn: 'Soaking rice in soup is the most natural way Koreans eat',
    },
    {
      type: 'paragraph',
      heading: '🍚 밥을 말아 먹다——把饭泡进汤里', headingEn: '🍚 Mixing rice into soup — soaking rice in broth',
      text: '韩国有一种独特的饮食习惯叫做밥을 말아 먹다（把饭泡进汤里吃）。白米饭直接放进汤碗里，用勺子搅拌，让饭吸饱汤汁再吃。这种吃法在西方饮食礼仪里是不雅观的，但在韩国完全正常。', textEn: 'Korea has a unique eating habit called 밥을 말아 먹다 (mixing rice into soup). White rice goes straight into the soup bowl, stirred with a spoon so it soaks up the broth before eating. This might look improper by Western dining etiquette, but in Korea it\'s completely normal.',
    },
    {
      type: 'paragraph',
      text: '국밥专门店是韩国最亲民的餐厅类型，通常从早上就开始营业，价格低廉，一碗完整的热汤饭让人从早上到下午都有力气。在韩国，국밥不只是食物，是“平民的尊严”——任何人都能用很少的钱吃一顿热乎乎的、有肉有汤有饭的正餐。', textEn: 'Gukbap specialty shops are Korea\'s most down-to-earth restaurants, usually open from early morning with low prices — a full bowl of hot soup rice keeps you going from morning to afternoon. In Korea, gukbap isn\'t just food; it\'s \'the dignity of the common people\' — anyone can get a warm, hearty meal with meat, soup, and rice for very little money.',
    },
    {
      type: 'toriQuote',
      label: '토리',
      text: '토리最喜欢的국밥是돼지국밥（猪肉汤饭），부산이 원조（起源于釜山）。猪骨汤加切片猪肉，配上葱花和虾酱，是韩国最有地域特色的국밥之一。去부산에 가면 꼭 먹어봐요。', textEn: 'Tori\'s favorite gukbap is dwaeji gukbap (pork soup rice), which originated in Busan. Pork bone broth with sliced pork, topped with green onions and salted shrimp—one of Korea\'s most regional gukbap dishes. If you go to Busan, you must try it.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '↔️',
      title: '韩国 vs 中国的汤文化', titleEn: 'Korean vs. Chinese Soup Culture',
      sub: '都爱喝汤，但哲学完全不同', subEn: 'Both love soup, but the philosophies are completely different',
    },
    {
      type: 'compareVs',
      left: {
        title: '🇰🇷 韩国的汤', titleEn: '🇰🇷 Korean Soup',
        items: [
          '每顿饭必有一碗汤，不可或缺',
          '汤和饭同时上桌，随时可以喝',
          '喜欢把饭泡进汤里吃（국밥）',
          '汤通常咸而有味，不只是清汤',
          '不同场合喝不同的汤，有精确对应',
          '汤是情感表达的媒介',
        ],
      },
      right: {
        title: '🇨🇳 中国的汤', titleEn: '🇨🇳 Chinese Soup',
        items: [
          '南方比北方更重视喝汤',
          '广东人饭前先喝汤，与韩国顺序不同',
          '很少把饭泡进汤里（除了泡饭文化）',
          '老火靓汤追求清淡鲜甜',
          '汤主要是养生功能，场合感没那么强',
          '汤是营养补充，不太作为情感符号',
        ],
      },
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '☀️',
      title: '복날과 보양식 — 最热的夏天，喝最烫的汤', titleEn: 'Boknal and Boyangshik — The Hottest Soup on the Hottest Days',
      sub: '三伏天喝参鸡汤，韩国人把这叫"以热治热"', subEn: 'Drinking samgyetang during the dog days — Koreans call this \'fighting heat with heat\'',
    },
    {
      type: 'paragraph',
      text: '韩国的 보양식（补养食）文化根深蒂固——韩国人相信"食物就是补药"（음식이 보약이다）。三伏天（초복·중복·말복）喝滚烫的삼계탕（参鸡汤）是其中最具代表性的习俗：在最热的天气里喝最热的汤，用出汗来调节体温，同时补充营养。这被称为 이열치열（以热治热），与中医"天人相应"的理论一脉相承。每年 복날，首尔著名的参鸡汤店（如토속촌）门口会排起数百米的长龙。除了삼계탕，복날 常见的 보양식 还包括 추어탕（泥鳅汤）、장어구이（烤鳗鱼）、전복죽（鲍鱼粥）。', textEn: 'Korea\'s 보양식 (nourishing food) culture runs deep — Koreans believe \'food is medicine\' (음식이 보약이다). Drinking piping-hot 삼계탕 (ginseng chicken soup) during the dog days (초복·중복·말복) is the most iconic tradition: drinking the hottest soup on the hottest days, sweating to regulate body temperature while replenishing nutrients. This is called 이열치열 (fighting heat with heat), rooted in the same principle as traditional Chinese medicine\'s \'harmony between heaven and humanity.\' Every boknal, famous samgyetang spots in Seoul (like Tosokchon) see lines stretching hundreds of meters. Besides 삼계탕, common boknal foods include 추어탕 (loach soup), 장어구이 (grilled eel), and 전복죽 (abalone porridge).',
    },
    {
      type: 'sectionTitle',
      emoji: '🔍',
      title: '汤文化冷知识', titleEn: 'Soup Culture Fun Facts',
      sub: '这些让你对韩国汤的理解更立体', subEn: 'These will give you a fuller picture of Korean soup culture',
    },
    {
      type: 'trivia',
      items: [
        {
          tag: '语言冷知识', tagEn: 'Language trivia',
          q: '국물 없다——这句话什么意思？', qEn: 'Gukmul eopda — What does this mean?',
          a: '字面意思是“连汤也没有”，但在韩语口语里是惯用语，意思是“没门儿、没可能、什么都没有”。因为汤代表最基本的存在，连汤都没有意味着彻底落空。例：취직 국물도 없다（找工作没戏）。', aEn: 'Literally \'there\'s not even soup,\' but in spoken Korean it\'s an idiom meaning \'no way, no chance, nothing at all.\' Since soup represents the most basic existence, having no soup means total failure. Example: 취직 국물도 없다 (no luck finding a job).',
        },
        {
          tag: '생일 문화',
          q: '考试失败为什么说“미역국 먹었다”？', qEn: 'Why does failing an exam mean \'ate miyeokguk\'?',
          a: '미역（裙带菜）表面滑溜，在韩语里被引申为“滑倒、落榜”。考试失败会说“오늘 미역국 먹었다（今天喝了裙带菜汤）”，意思是“落榜了”。反过来，生日喝미역국是祝福；考前千万不要喝，会带来坏运气——这是韩国人真实相信的迷信。', aEn: 'Miyeok (seaweed) is slippery, which in Korean extends to meaning \'slipping up\' or \'failing.\' Failing an exam is expressed as \'오늘 미역국 먹었다\' (I had seaweed soup today), meaning \'I failed.\' On the flip side, drinking miyeokguk on your birthday is a blessing; before an exam, never drink it — it brings bad luck. This is a superstition Koreans genuinely believe.',
        },
        {
          tag: '식사 예절',
          q: '韩国人用勺子喝汤，筷子吃菜？', qEn: 'Koreans use a spoon for soup and chopsticks for side dishes?',
          a: '是的，这是韩国饮食礼仪的一个特点——勺子（숟가락）专门用来喝汤和盛饭，筷子（젓가락）用来夹菜。不能用筷子喝汤，也不能用勺子夹菜，这是礼仪。韩国筷子通常是金属材质（不是木质），因为金属不会被汤汁浸泡变形。', aEn: 'Yes, it\'s a hallmark of Korean dining etiquette — the spoon (숟가락) is for soup and rice, while chopsticks (젓가락) are for picking up side dishes. You shouldn\'t drink soup with chopsticks or pick up food with a spoon; it\'s a matter of manners. Korean chopsticks are usually metal (not wood) because metal won\'t warp from soaking in broth.',
        },
        {
          tag: '건강 문화',
          q: '삼계탕为什么在夏天最热的时候吃？', qEn: 'Why eat samgyetang during the hottest part of summer?',
          a: '韩国传统医学（한의학）认为，夏天人体内部虚寒，需要用温热的食物来补充阳气。“이열치열（以热攻热）”不是让身体更热，而是通过热汤引导体内气血循环，通过出汗排出体内积聚的湿气。삼계탕的人参和鸡肉恰好是温热属性食材，非常符合这个理论。', aEn: 'Korean traditional medicine (한의학) holds that the body\'s interior turns cold and weak in summer, so warming foods are needed to replenish yang energy. \'이열치열\' (fighting heat with heat) isn\'t about making the body hotter — it\'s about using hot soup to boost circulation and sweat out accumulated dampness. The ginseng and chicken in samgyetang are both warming ingredients, perfectly fitting this theory.',
        },
      ],
    },
    {
      type: 'highlight',
      variant: 'warning',
      title: '🍲 点汤的时候要注意', titleEn: '🍲 Things to Note When Ordering Soup',
      text: '韩国的찌개（锅类汤）通常是一锅供所有人分享，不像日本那样每人一碗独立的味噌汤。一锅찌개放在桌子中间，大家用各自的勺子从锅里舀着喝——第一次去韩国餐厅可能会觉得奇怪，但这完全正常。如果你的文化习惯里这样不卫生，可以要求각자 따로（各自分开），但在韩国聚餐文化里，共享一锅汤是亲密感的象征。', textEn: 'Korean jjigae (pot stew) is typically shared by everyone at the table, unlike Japan\'s individual bowls of miso soup. A pot of jjigae sits in the middle, and everyone ladles from it with their own spoon — it might feel odd your first time at a Korean restaurant, but it\'s totally normal. If sharing feels unsanitary by your cultural standards, you can ask for 각자 따로 (separate portions), but in Korean group dining culture, sharing one pot of soup is a symbol of closeness.',
    },
    {
      type: 'phraseList',
      title: '토리 教你说——点汤必备韩语', titleEn: 'Tori teaches you — essential Korean for ordering soup',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        {
          ko: '된장찌개 하나 주세요.',
          ro: 'doen-jang-jji-gae ha-na ju-se-yo',
          scene: '🫕 点大酱汤', sceneEn: '🫕 Ordering Doenjang Jjigae',
          zh: '给我一份大酱汤', zhEn: 'Give me one serving of doenjang jjigae',
        },
        {
          ko: '국물이 정말 맛있어요.',
          ro: 'gung-mu-ri jeong-mal ma-si-sseo-yo',
          scene: '😋 称赞汤的味道', sceneEn: '😋 Praising the soup\'s taste',
          zh: '汤真的很好喝', zhEn: 'The soup is really delicious',
        },
        {
          ko: '국물 더 주실 수 있어요?',
          ro: 'gung-mul deo ju-sil su i-sseo-yo?',
          scene: '🥣 要求加汤', sceneEn: '🥣 Asking for more soup',
          zh: '可以再给我一些汤吗？', zhEn: 'Can I have some more soup?',
        },
        {
          ko: '덜 맵게 해주세요.',
          ro: 'deol maep-ge hae-ju-se-yo',
          scene: '🌶️ 要求减辣', sceneEn: '🌶️ Asking for less spicy',
          zh: '请少放辣', zhEn: 'Go easy on the spice',
        },
        {
          ko: '생일 축하해요!',
          ro: 'saeng-il chu-ka-hae-yo',
          scene: '🎂 生日祝福', sceneEn: '🎂 Birthday wishes',
          zh: '生日快乐！', zhEn: 'Happy birthday!',
        },
        {
          ko: '몸 조심하세요.',
          ro: 'mom jo-sim-ha-se-yo',
          scene: '🤒 对方生病时', sceneEn: '🤒 When someone is sick',
          zh: '请保重身体', zhEn: 'Please take care of yourself',
        },
      ],
    },
    {
      type: 'vocabList',
      title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson',
      items: [
        { ko: '국물', zh: '汤·汤汁', zhEn: 'Soup & Broth' },
        { ko: '찌개', zh: '锅（汤类）', zhEn: 'Pot (soup type)' },
        { ko: '삼계탕', zh: '参鸡汤', zhEn: 'ginseng chicken soup' },
        { ko: '된장찌개', zh: '大酱汤', zhEn: 'soybean paste stew' },
        { ko: '김치찌개', zh: '泡菜锅', zhEn: 'Kimchi jjigae (kimchi stew)' },
        { ko: '미역국', zh: '裙带菜汤', zhEn: 'Miyeokguk (seaweed soup)' },
        { ko: '해장국', zh: '解酒汤', zhEn: 'hangover soup' },
        { ko: '설렁탕', zh: '牛骨汤', zhEn: 'Seolleongtang (ox bone soup)' },
        { ko: '순두부찌개', zh: '嫩豆腐锅', zhEn: 'Sundubu jjigae (soft tofu stew)' },
        { ko: '국밥', zh: '汤饭', zhEn: 'Gukbap (soup with rice)' },
        { ko: '숟가락', zh: '勺子', zhEn: 'spoon' },
        { ko: '이열치열', zh: '以热攻热', zhEn: 'Fighting heat with heat' },
      ],
    },
    {
      type: 'ending',
      text: '那碗汤里，装的是韩国人的心意\n\n一碗汤可以是生日的祝福，可以是宿醉后的关心，可以是离家后最思念的味道，可以是寒冬里最简单的温暖。下次在韩国餐桌上看到那碗汤，你已经知道它为什么在那里了。下一篇，토리 带你跟着韩剧学点餐 🎬', textEn: 'In that bowl of soup lies the heart of Korea\\n\\nA bowl of soup can be a birthday wish, a caring gesture after a hangover, the taste you miss most when away from home, or the simplest warmth on a cold winter day. Next time you see that bowl of soup on a Korean table, you\'ll know why it\'s there. In the next post, Tori takes you learning to order food with K-dramas 🎬',
    },
  ],
},
  {
  slug: 'kdrama-ordering',
  category: 'food',
  title: '跟着韩剧学点餐', titleEn: 'Learning to order food with K-dramas',
  subtitle: '드라마 속 주문 — 韩剧里出镜率最高的那些食物', subtitleEn: 'Orders in dramas — the foods that appear most in K-dramas',
  emoji: '🍗',
  readMinutes: 10,
  bannerImage: '/images/banners/kdrama-ordering.webp',
  blocks: [
    {
      type: 'toriQuote',
      label: '토리 说', labelEn: 'Tori says',
      text: '토리每次看韩剧，都会在某个场景停下来想："那个是什么？在哪里能吃到？"——《请回答1988》里的炸酱面、《我的大叔》里的烧酒花生、《蓝色大海的传说》里的炸鸡啤酒、《顶楼》里的豪华韩餐……韩剧里的食物不是随便安排的，每一样都有文化原因。今天토리 把最经典的韩剧饮食场景全部解码，学完这篇，下次去首尔你知道该去哪里、该点什么 📺🍽️', textEn: 'Every time Tori watches a K-drama, she stops at some scene and thinks: "What\'s that? Where can I eat it?" — The jajangmyeon in Reply 1988, the soju and peanuts in My Mister, the fried chicken and beer in The Legend of the Blue Sea, the luxurious Korean cuisine in Penthouse... The food in K-dramas isn\'t random; each item has a cultural reason. Today Tori decodes all the most iconic K-drama food scenes. After reading this, you\'ll know where to go and what to order next time you\'re in Seoul 📺🍽️',
    },
    {
      type: 'sectionTitle',
      emoji: '🎬',
      title: '经典韩剧饮食场景解码', titleEn: 'Decoding iconic K-drama food scenes',
      sub: '你看了很多遍，但未必知道背后的文化', subEn: 'You\'ve watched them many times, but may not know the culture behind them',
    },
    {
      type: 'featureCard',
      emoji: '🍜',
      title: '搬家那天，一定要吃炸酱面', titleEn: 'On moving day, you must eat jajangmyeon',
      desc: '《请回答1988》응답하라 1988\n\n韩国有一个根深蒂固的传统：搬进新家的第一天，要订一份짜장면（炸酱面）外卖。这个传统起源于1960-70年代——搬家时厨房还没收拾好，没法做饭，又要招待帮忙搬家的人，价格低廉又快速的짜장면就成了默认选择，延续到今天变成了一种仪式感。\n\n《请回答1988》里，德善家搬进双门洞后的那碗짜장면，不只是一顿饭，是那个年代整个街区温情的缩影。', descEn: 'Reply 1988 응답하라 1988\\n\\nKorea has a deep-rooted tradition: on the first day of moving into a new home, you order jajangmyeon (짜장면) delivery. This tradition originated in the 1960s-70s — when moving, the kitchen wasn\'t set up yet, so cooking wasn\'t possible, but you still had to host the people helping you move. Cheap and quick jajangmyeon became the default choice, and it continues today as a ritual.\\n\\nIn Reply 1988, the bowl of jajangmyeon the Deoksun family eats after moving into Ssangmun-dong isn\'t just a meal — it\'s a snapshot of the warmth of the entire neighborhood in that era.',
      scenes: [
        { speaker: '엄마', ko: '이사하면 짜장면이지!', zh: '搬家就要吃炸酱面！', zhEn: 'Moving day means jajangmyeon!' },
      ],
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '현실에서는',
      text: '짜장면在韩国由中国华侨带来，已经完全韩国化——比中国炸酱面更甜、更浓稠、用黄豆酱而非黄豆面酱。与其说它是中餐，不如说它是"韩式中餐"的代表，完全独立的味道。', textEn: 'Jajangmyeon was brought to Korea by Chinese overseas residents and has become fully Koreanized — sweeter and thicker than Chinese zhajiangmian, using black bean paste rather than soybean paste. Rather than Chinese food, it\'s the representative of "Korean-Chinese food," a completely distinct flavor.',
    },
    {
      type: 'toriQuote',
      text: '토리推荐：去首尔인천（仁川）차이나타운，那里是韩式짜장면의 발상지（发源地），吃到最正宗的韩版炸酱面。首尔市区的중국집（中餐馆）也很多，짜장면 하나, 짬뽕 하나（一碗炸酱面一碗辣炒码）是韩国人最常见的点法。', textEn: 'Tori\'s recommendation: head to Incheon (인천) Chinatown in Seoul, the birthplace (발상지) of Korean-style jajangmyeon, for the most authentic Korean version. There are also many Chinese restaurants (중국집) in downtown Seoul — one jajangmyeon and one jjamppong (짜장면 하나, 짬뽕 하나) is the most common way Koreans order.',
    },
    {
      type: 'featureCard',
      emoji: '🥜',
      title: '편의점 소주와 땅콩——人生最朴素的对话', titleEn: 'Convenience store soju and peanuts — life\'s simplest conversation',
      desc: '《我的大叔》나의 아저씨\n\n《我的大叔》里，동훈和지안最重要的几场对话，都发生在편의점（便利店）门口，一人一瓶소주（烧酒），桌上一包땅콩（花生）。没有精心布置，没有高档餐厅，就是这两样最便宜的东西，承载了整部剧最深沉的情感。\n\n소주+땅콩在韩国是最底层的饮食组合——땅콩是소주最便宜的안주（下酒菜），是那些喝不起好酒、吃不起好菜的普通人的选择。韩剧选择这个组合，是在说：有些对话，只能在最简单的地方才能发生。', descEn: 'My Mister 나의 아저씨\\n\\nIn My Mister, the most important conversations between Dong-hoon and Ji-an happen outside a convenience store (편의점), each with a bottle of soju (소주) and a pack of peanuts (땅콩) on the table. No fancy setup, no upscale restaurant—just these two cheapest items carrying the show\'s deepest emotions.\\n\\nSoju + peanuts is the most humble food combo in Korea—peanuts are the cheapest anju (안주, drinking snack) for soju, the choice of ordinary people who can\'t afford good liquor or good food. Korean dramas use this combo to say: some conversations can only happen in the simplest places.',
      scenes: [
        { speaker: '동훈', ko: '한 잔 할래?', zh: '喝一杯吗？', zhEn: 'Want a drink?' },
        { speaker: '지안', ko: '...네.', zh: '...好。', zhEn: '...Sure.' },
      ],
    },
    {
      type: 'toriQuote',
      text: '토리 说：안주（下酒菜）是韩国饮酒文化里一个重要概念——喝酒一定要配食物，단순히 술만 마시는 건 한국 문화가 아니에요（单纯喝酒不配菜不是韩国文化）。안주的选择反映你的心情和处境。', textEn: 'Tori says: Anju (안주, drinking snacks) is a key concept in Korean drinking culture—you always eat with your drinks. 단순히 술만 마시는 건 한국 문화가 아니에요 (drinking without food isn\'t Korean culture). Your anju choice reflects your mood and situation.',
    },
    {
      type: 'featureCard',
      emoji: '🍗',
      title: '치맥——炸鸡啤酒，快乐的最简单形式', titleEn: 'Chimaek—Fried Chicken and Beer, the Simplest Form of Happiness',
      desc: '《蓝色大海的传说》푸른 바다의 전설\n\n치맥（치킨+맥주）在韩剧里的出现频率，几乎等同于배경음악（背景音乐）。《蓝色大海的传说》里，심청（全智贤饰）第一次体验陆地上的快乐，选择的就是치맥——这个选择不是偶然，치맥代表的是韩国年轻人对"简单快乐"的最大公约数。\n\n韩国炸鸡和中国炸鸡是完全不同的食物。韩国치킨用薄薄的面衣包裹，双重炸制——第一次低温炸熟，第二次高温炸脆，外皮极度酥脆而内部多汁。口味有原味、양념（甜辣酱）、간장（酱油蒜香）、치즈（芝士）等多种。', descEn: 'The Legend of the Blue Sea 푸른 바다의 전설\\n\\nChimaek (chicken + beer) appears in Korean dramas almost as often as the background music (배경음악). In The Legend of the Blue Sea, when Shim Cheong (played by Jun Ji-hyun) first experiences the joys of the human world, she chooses chimaek—and that\'s no accident. Chimaek represents the greatest common denominator of "simple happiness" for young Koreans.\\n\\nKorean fried chicken is completely different from Chinese fried chicken. Korean chicken is coated in a thin batter and double-fried—first at low temperature to cook through, then at high heat to crisp up—resulting in an ultra-crunchy exterior and juicy interior. Flavors include original, yangnyeom (sweet and spicy sauce), ganjang (soy garlic), cheese, and more.',
      scenes: [
        { speaker: '준재', ko: '치킨이랑 맥주 시킬까?', zh: '要叫炸鸡和啤酒吗？', zhEn: 'Should we order fried chicken and beer?' },
        { speaker: '심청', ko: '치킨이 뭐예요?', zh: '炸鸡是什么？', zhEn: 'What\'s fried chicken?' },
      ],
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '치킨 주문 방법',
      text: '韩国炸鸡通常叫外卖，앱（App）점 배달의민족（배민）或쿠팡이츠上下单，配送快且方便。也可以直接去치킨집（炸鸡店）堂食。半半치킨（半半鸡）= 一半原味一半양념，是最受欢迎的搭配。', textEn: 'Korean fried chicken is usually ordered for delivery via apps like Baemin (배달의민족) or Coupang Eats—it\'s fast and convenient. You can also dine in at a chicken place (치킨집). Half-half chicken (반반치킨) = half original, half yangnyeom, and it\'s the most popular combo.',
    },
    {
      type: 'featureCard',
      emoji: '🍱',
      title: '한정식——韩国最高规格的传统餐食', titleEn: 'Hanjungsik—Korea\'s Most Formal Traditional Meal',
      desc: '《顶楼》펜트하우스\n\n财阀剧里的豪华饭局，桌上摆满了小碟子——这就是한정식（韩国定食）。한정식是韩国最正式的传统套餐，从古代宫廷料理演变而来，一桌可以有十几道到几十道菜，一道一道端上来，展示食材的多样和厨师的功夫。\n\n한정식餐厅通常是韩屋（传统建筑）改造的，服务员穿韩服，菜品从小菜、汤、腌制品、蒸菜、炒菜到甜点依次呈现。价格从5万韩元到20万韩元一位不等，是韩国人接待重要客人、庆祝重要纪念日的选择。', descEn: 'The Penthouse 펜트하우스\\n\\nIn chaebol dramas, lavish dinners feature tables full of small dishes—that\'s hanjeongsik (한정식, Korean table d\'hôte). Hanjeongsik is Korea\'s most formal traditional meal, evolved from ancient royal court cuisine. A single table can feature anywhere from a dozen to dozens of dishes, served course by course to showcase the variety of ingredients and the chef\'s skill.\\n\\nHanjeongsik restaurants are often housed in traditional hanok buildings, with servers in hanbok. Dishes progress from side dishes, soup, and pickles to steamed items, stir-fries, and dessert. Prices range from 50,000 to 200,000 KRW per person, making it the choice for hosting important guests or celebrating major anniversaries.',
    },
    {
      type: 'toriQuote',
      text: '토리推荐：想体验한정식，去인사동（仁寺洞）或북촌（北村）附近，那里有很多环境绝佳的한정식집。不需要财阀身份，人均6-10万韩元就能体验到真正的한정식文化。', textEn: 'Tori\'s tip: To experience hanjeongsik, head to Insa-dong (인사동) or Bukchon (북촌), where you\'ll find many hanjeongsik restaurants with beautiful settings. No chaebol status needed—for about 60,000–100,000 KRW per person, you can experience authentic hanjeongsik culture.',
    },
    {
      type: 'featureCard',
      emoji: '🍜',
      title: '편의점 라면——深夜的情绪出口', titleEn: 'Convenience Store Ramyeon—The Late-Night Emotional Outlet',
      desc: '《她的私生活》그녀의 사생활 / 各类韩剧\n\n深夜便利店，一个人坐在门口的塑料椅上，面前是一杯热腾腾的컵라면（杯面）——这个画面在韩剧里出现的次数数不清。它代表的不只是饿了要吃东西，而是一种独处的仪式感：这个人此刻需要一个人待着，需要一碗热的，需要时间思考。\n\n컵라면在韩国便利店门口有专门的热水机，这个设计本身就是为这种"边走边泡、站着吃"的生活方式服务的。烫嘴的面条、辣辣的汤底，是韩国年轻人处理各种情绪的万能解药。', descEn: 'Her Private Life 그녀의 사생활 / Various K-dramas\\n\\nLate at night at a convenience store, someone sits alone on a plastic chair outside, a steaming cup of ramyeon (컵라면) in front of them—this scene appears in K-dramas countless times. It\'s not just about eating because you\'re hungry; it\'s a ritual of solitude. This person needs to be alone right now, needs something hot, needs time to think.\\n\\nKorean convenience stores have dedicated hot water dispensers outside for cup ramyeon—a design that serves this very lifestyle of "brew on the go, eat standing up." The scalding noodles and spicy broth are the universal cure for whatever young Koreans are feeling.',
      scenes: [
        { speaker: '직원', ko: '뜨거운 물 여기 있어요.', zh: '热水在这里。', zhEn: 'The hot water is here.' },
        { speaker: '손님', ko: '감사합니다.', zh: '谢谢。', zhEn: 'Thank you.' },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🗣️',
      title: '韩国餐厅点餐实战', titleEn: 'Ordering at a Korean Restaurant—In Practice',
      sub: '从进门到结账，完整的餐厅用语指南', subEn: 'From Walking In to Paying Up: A Complete Guide to Restaurant Phrases',
    },
    {
      type: 'paragraph',
      text: '🐰 토리 的韩国餐厅点餐全流程', textEn: '🐰 Tori\'s Complete Guide to Ordering at a Korean Restaurant',
    },
    {
      type: 'steps',
      steps: [
        { label: '进门，告知人数', labelEn: 'Enter and state your party size', ko: '두 명이요（两个人）· 혼자요（我一个人）' },
        { label: '叫服务员', labelEn: 'Getting the server\'s attention', desc: '韩国不要挥手，直接喊', descEn: 'In Korea, don\'t wave—just call out', ko: '저기요!（이봐요는 안 돼요，不要说이봐요）' },
        { label: '点餐', labelEn: 'order', desc: '说菜名+수량（数量）', descEn: 'Say the dish name + quantity (수량)', ko: '삼겹살 2인분이랑 된장찌개 하나 주세요' },
        { label: '提出특별 요청（特殊要求）', labelEn: 'Make special requests (특별 요청)', ko: '맵지 않게 해주세요（不要辣）\n파 빼주세요（不要葱）\n고수 넣지 마세요（不要香菜）' },
        { label: '追加点餐或续菜', labelEn: 'Order more or get refills', ko: '이거 하나 더 주세요（再来一份这个）\n반찬 더 주세요（小菜再加一些）' },
        { label: '结账', labelEn: 'check, please', desc: '韩国通常在收银台结账，不是桌边', descEn: 'In Korea, you usually pay at the counter, not at the table', ko: '계산해 주세요（请结账）\n카드 돼요?（可以刷卡吗？）' },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '📋',
      title: '看懂韩国菜单——关键词汇', titleEn: 'Decoding Korean Menus — Key Vocabulary',
      sub: '掌握这些词，任何韩国餐厅的菜单都不怕', subEn: 'Master these words and no Korean restaurant menu will intimidate you',
    },
    {
      type: 'sectionTitle',
      emoji: '🍽️',
      title: '烹饪方式', titleEn: 'Cooking Methods',
    },
    {
      type: 'table',
      head: ['韩文', '发音', '意思', '例子'],
      rows: [
        ['구이', 'gu-i', '烤制', '삼겹살구이（烤五花肉）'],
        ['찜', 'jjim', '蒸/炖', '갈비찜（炖排骨）'],
        ['볶음', 'bo-keum', '炒', '낙지볶음（炒章鱼）'],
        ['튀김', 'twi-gim', '炸', '새우튀김（炸虾）'],
        ['국 / 탕', 'guk / tang', '汤', '미역국（裙带菜汤）'],
        ['찌개', 'jji-gae', '锅（浓汤）', '된장찌개（大酱汤）'],
        ['비빔', 'bi-bim', '拌', '비빔밥（拌饭）'],
        ['냉', 'naeng', '冷/冰', '냉면（冷面）'],
      ],
    },
    {
      type: 'sectionTitle',
      emoji: '🥩',
      title: '食材关键词', titleEn: 'Ingredient Keywords',
    },
    {
      type: 'table',
      head: ['韩文', '发音', '意思', '常见搭配'],
      rows: [
        ['소고기', 'so-go-gi', '牛肉', '소불고기、소갈비'],
        ['돼지고기', 'dwae-ji-go-gi', '猪肉', '삼겹살、목살'],
        ['닭고기', 'dak-go-gi', '鸡肉', '닭갈비、삼계탕'],
        ['해물 / 해산물', 'hae-mul', '海鲜', '해물파전、해물탕'],
        ['두부', 'du-bu', '豆腐', '순두부찌개'],
        ['채소', 'chae-so', '蔬菜', '채소볶음'],
        ['김치', 'gim-chi', '泡菜', '김치찌개、김치전'],
      ],
    },
    {
      type: 'sectionTitle',
      emoji: '🌶️',
      title: '口味描述词', titleEn: 'Flavor Descriptors',
    },
    {
      type: 'table',
      head: ['韩文', '发音', '意思', '使用场景'],
      rows: [
        ['맵다', 'maep-da', '辣', '이거 많이 매워요?（这个很辣吗？）'],
        ['달다', 'dal-da', '甜', '달달한 맛（甜甜的味道）'],
        ['짜다', 'jja-da', '咸', '좀 짜네요（有点咸）'],
        ['싱겁다', 'sing-geop-da', '淡', '좀 싱거워요（有点淡）'],
        ['고소하다', 'go-so-ha-da', '香（芝麻/坚果香）', '고소한 맛（香喷喷的味道）'],
        ['담백하다', 'dam-bae-ka-da', '清淡鲜美', '담백한 국물（清淡的汤）'],
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🥢',
      title: '韩国餐桌礼仪——这些细节很重要', titleEn: 'Korean Table Etiquette — These Details Matter',
      sub: '知道这些，你在韩国饭桌上不会失礼', subEn: 'Know these and you won\'t be rude at a Korean dinner table',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🛵',
      title: '韩国外卖文化——全球最发达的外卖国家之一', titleEn: 'Korean Delivery Culture — One of the Most Advanced in the World',
      sub: '凌晨 3 点也能点炸鸡，半小时送达是标配', subEn: 'You can order fried chicken at 3 AM, and 30-minute delivery is the standard',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          zh: '배달 앱 三分天下', zhEn: 'The Big Three Delivery Apps',
          desc: '韩国三大外卖平台：배달의민족（Baemin，市场约 59%）是绝对王者，2024 年月活约 2,200 万；쿠팡이츠（Coupang Eats）凭借 Coupang Wow 会员免配送费政策，2024 年市场份额从 14% 飙升至约 26%，在首尔和京畿道部分区域已反超 Baemin；요기요（Yogiyo）从约 16% 跌至约 10%。三大平台 2024 年月活合计约 3,750 万。', descEn: 'Korea\'s top three delivery platforms: Baemin (배달의민족) is the absolute king with ~59% market share and ~22 million monthly active users in 2024; Coupang Eats (쿠팡이츠) surged from 14% to ~26% in 2024 thanks to free delivery for Coupang Wow members, overtaking Baemin in parts of Seoul and Gyeonggi; Yogiyo (요기요) dropped from ~16% to ~10%. Together, the three platforms had ~37.5 million monthly active users in 2024.',
          tip: '下载 Baemin(배민) 就够了——大部分餐厅都在上面', tipEn: 'Just download Baemin (배민) — most restaurants are on it',
        },
        {
          zh: '韩国外卖和中国有什么不同', zhEn: 'How Korean Delivery Differs from China\'s',
          desc: '韩国外卖不需要骑手抢单——系统自动配单。韩国没有"餐盒押金"或"餐具回收"制度，全部一次性包装。外卖费通常 1,000-3,000 韩元（Coupang Eats Wow 会员免配送费）。大部分 배달 支持线上支付（카카오페이/네이버페이/信用卡）。吃完外卖后食物残余和包装要分开处理：잔반（剩菜）丢 음식물 쓰레기통（食物垃圾桶），包装丢一般垃圾——这是韩国生活的基本功。', descEn: 'Korean delivery doesn\'t rely on riders grabbing orders — the system assigns them automatically. There\'s no "container deposit" or "utensil return" system; everything is single-use packaging. Delivery fees are usually 1,000-3,000 KRW (free for Coupang Eats Wow members). Most deliveries support online payment (KakaoPay/Naver Pay/credit card). After eating, you must separate food waste and packaging: leftover food goes in the food waste bin, and packaging goes in general trash — this is basic life in Korea.',
          tip: '外卖垃圾分类不做好可能被罚，注意小区投放时间', tipEn: 'Improper food waste sorting can lead to fines, so pay attention to your building\'s disposal schedule',
        },
      ],
    },
    {
      type: 'sectionTitle',
      emoji: '🙏',
      title: '饭桌上的规则', titleEn: 'Table Rules',
    },
    {
      type: 'paragraph',
      heading: '等长辈先动筷', headingEn: 'Wait for elders to start eating',
      text: '韩国饮食礼仪中，最重要的一条是长辈先开始吃，晚辈才能动筷子（或勺子）。长辈拿起勺子之前，你不能开始吃——这是基本礼仪，违反了非常失礼。', textEn: 'In Korean dining etiquette, the most important rule is that elders eat first; younger people can only start after. You must not begin eating before an elder picks up their spoon — this is basic manners, and violating it is very rude.',
    },
    {
      type: 'paragraph',
      heading: '勺子喝汤，筷子夹菜', headingEn: 'Use the spoon for soup, chopsticks for side dishes',
      text: '如前文所述，韩国筷子和勺子有明确分工。不能用筷子舀汤，不能用勺子夹菜。', textEn: 'As mentioned earlier, Korean chopsticks and spoons have clear roles. You can\'t scoop soup with chopsticks, and you can\'t pick up food with a spoon.',
    },
    {
      type: 'paragraph',
      heading: '碗不离桌', headingEn: 'Keep the bowl on the table',
      text: '和中国、日本不同，韩国人吃饭时不把碗端起来。碗放在桌上，低头吃或用勺子把食物送到嘴边。把碗端起来是失礼的，因为这看起来像"乞讨的姿势"。', textEn: 'Unlike China and Japan, Koreans don\'t lift their bowls while eating. The bowl stays on the table—you lower your head to eat or use a spoon to bring food to your mouth. Lifting the bowl is considered rude, as it looks like a "begging posture."',
    },
    {
      type: 'paragraph',
      heading: '不要插筷子进食物', headingEn: 'Don\'t stick chopsticks into food',
      text: '把筷子插进饭里，是韩国祭祀时的做法，在饭桌上这样做是非常不吉利的禁忌。', textEn: 'Sticking chopsticks upright into rice is done during Korean ancestral rites—doing it at the dinner table is a highly inauspicious taboo.',
    },
    {
      type: 'toriQuote',
      text: '토리의 경험담：토리 有一次在韩国朋友家，习惯性地把碗端起来吃，朋友妈妈没说什么，但토리 后来知道那是失礼的。韩国饮食礼仪里，碗放在桌上是基本规范。', textEn: 'Tori\'s story: Once at a Korean friend\'s house, Tori habitually lifted the bowl to eat. The friend\'s mom didn\'t say anything, but Tori later learned it was rude. In Korean dining etiquette, keeping the bowl on the table is the basic norm.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🔍',
      title: '韩国饮食冷知识', titleEn: 'Korean Food Trivia',
      sub: '看韩剧时的加分项', subEn: 'A bonus for watching K-dramas',
    },
    {
      type: 'trivia',
      items: [
        {
          tag: '배달 문화',
          q: '韩国的外卖文化有多发达？', qEn: 'How advanced is Korea\'s food delivery culture?',
          a: '韩国是全球外卖文化最发达的国家之一。배달의민족（배민）和쿠팡이츠是最大的两个平台，深夜两点依然可以点到热腾腾的炸鸡、烤肉、海鲜汤。韩国的외식(外食)支出比例在全球名列前茅，"叫外卖"是韩国年轻人的日常，不是偶尔为之。', aEn: 'Korea is one of the countries with the most advanced food delivery culture in the world. Baedal Minjok (Baemin) and Coupang Eats are the two biggest platforms—you can still order hot fried chicken, grilled meat, or seafood soup at 2 AM. Korea\'s spending on eating out ranks among the highest globally. "Ordering delivery" is a daily habit for young Koreans, not an occasional treat.',
        },
        {
          tag: '공기밥 문화',
          q: '为什么韩国餐厅的米饭要额外加钱？', qEn: 'Why do Korean restaurants charge extra for rice?',
          a: '韩国很多餐厅，特别是烤肉店和汤类餐厅，主食（공기밥，白米饭）需要额外单点，不随菜附赠。通常1,000–2,000원一碗。第一次去的人常常不知道，吃完才发现没有饭——要主动说 공기밥 하나 주세요（给我一碗米饭）。', aEn: 'At many Korean restaurants—especially BBQ and soup places—the staple (gonggibap, steamed rice) must be ordered separately and isn\'t included with your dishes. It usually costs 1,000–2,000 won per bowl. First-timers often don\'t realize this and only discover there\'s no rice after finishing—you need to proactively say "gonggibap hana juseyo" (give me one bowl of rice).',
        },
        {
          tag: '불고기 역사',
          q: '불고기（韩式烤牛肉）为什么在全球有名？', qEn: 'Why is bulgogi (Korean grilled beef) famous worldwide?',
          a: '불고기（불=火，고기=肉）是用酱油、梨汁、芝麻油腌制的薄切牛肉，在铁盘上烤制。它是韩国最早被国际市场认知的韩国料理之一——1988年首尔奥运会期间，大量外国运动员和游客第一次接触到불고기，开始了韩国料理走向世界的序幕。', aEn: 'Bulgogi (bul = fire, gogi = meat) is thinly sliced beef marinated in soy sauce, pear juice, and sesame oil, then grilled on a hot plate. It was one of the first Korean dishes recognized internationally—during the 1988 Seoul Olympics, many foreign athletes and visitors tried bulgogi for the first time, marking the beginning of Korean cuisine\'s global rise.',
        },
        {
          tag: '맛집 문화',
          q: '韩国人为什么那么执着于"맛집"（好吃的店）？', qEn: 'Why are Koreans so obsessed with "matjip" (good restaurants)?',
          a: '맛집（맛=味道，집=店）是韩国饮食文化里的核心词汇，意思是"好吃的店、值得去的餐厅"。韩国人对맛집的探索热情极高——小红书（韩国是Instagram）上的맛집帖子、맛집专门博主、맛집地图App……一家店一旦被认定为맛집，排队一两个小时是常事。麦当劳汉堡和맛집汉堡，韩国人毫不犹豫选맛집。', aEn: 'Matjip (mat = taste, jip = shop) is a core term in Korean food culture, meaning "a good restaurant worth visiting." Koreans are extremely passionate about finding matjip—Instagram posts, dedicated matjip bloggers, matjip map apps... Once a place earns matjip status, waiting an hour or two in line is normal. Between a McDonald\'s burger and a matjip burger, Koreans will pick the matjip without hesitation.',
        },
      ],
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '🍽️ 在韩国餐厅用餐前要知道', titleEn: '🍽️ What to know before dining at a Korean restaurant',
      text: '韩国大部分餐厅提供무료 반찬（免费小菜）——泡菜、豆芽、海苔等，可以无限续加，直接说 반찬 더 주세요 即可。但这些小菜不能打包带走，是就餐专享。另外，韩国餐厅普遍没有服务小费文化，结账金额就是最终金额，不需要额外给小费。', textEn: 'Most Korean restaurants offer free banchan (side dishes)—kimchi, bean sprouts, seaweed, etc.—which you can refill unlimited times by simply saying "banchan deo juseyo." However, these sides can\'t be taken to go; they\'re for dining in only. Also, Korean restaurants generally have no tipping culture—the bill amount is the final amount, no extra tip needed.',
    },
    {
      type: 'phraseList',
      title: '토리 教你说——韩国餐厅必备韩语', titleEn: 'Tori teaches you—essential Korean for restaurants',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        { ko: '저기요! 주문할게요.', ro: 'jeo-gi-yo! ju-mun-hal-ge-yo', scene: '📣 叫服务员点餐', sceneEn: '📣 Calling the server to order', zh: '服务员！我要点餐', zhEn: 'Excuse me! I\'d like to order' },
        { ko: '이게 뭐예요?', ro: 'i-ge mwo-ye-yo?', scene: '❓ 指着菜单问', sceneEn: '❓ Pointing at the menu and asking', zh: '这是什么？', zhEn: 'What is this?' },
        { ko: '추천 메뉴가 뭐예요?', ro: 'chu-cheon me-nyu-ga mwo-ye-yo?', scene: '⭐ 问推荐菜', sceneEn: '⭐ Asking for recommendations', zh: '推荐菜是什么？', zhEn: 'What do you recommend?' },
        { ko: '공기밥 하나 더 주세요.', ro: 'gong-gi-bap ha-na deo ju-se-yo', scene: '🍚 追加米饭', sceneEn: '🍚 Ordering more rice', zh: '再来一碗米饭', zhEn: 'One more bowl of rice, please' },
        { ko: '정말 맛있어요!', ro: 'jeong-mal ma-si-sseo-yo!', scene: '😋 称赞食物', sceneEn: '😋 Complimenting food', zh: '真的太好吃了！', zhEn: 'It\'s really delicious!' },
        { ko: '포장해 주세요.', ro: 'po-jang-hae ju-se-yo', scene: '📦 打包', sceneEn: '📦 Takeout', zh: '请帮我打包', zhEn: 'Please pack this up for me' },
        { ko: '따로따로 계산해 주세요.', ro: 'tta-ro-tta-ro gye-san-hae ju-se-yo', scene: '💳 AA制结账', sceneEn: '💳 Splitting the bill', zh: '请分开结账', zhEn: 'Please split the bill' },
      ],
    },
    {
      type: 'sectionTitle',
      emoji: '📖',
      title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson',
    },
    {
      type: 'vocabList',
      items: [
        { ko: '짜장면', zh: '炸酱面', zhEn: 'black bean noodles' },
        { ko: '치맥', zh: '炸鸡+啤酒', zhEn: 'Fried chicken + beer' },
        { ko: '안주', zh: '下酒菜', zhEn: 'Anju (food served with alcohol)' },
        { ko: '한정식', zh: '韩国定食', zhEn: 'Korean table d\'hôte' },
        { ko: '불고기', zh: '韩式烤牛肉', zhEn: 'Bulgogi (Korean grilled beef)' },
        { ko: '맛집', zh: '好吃的店', zhEn: 'A good restaurant' },
        { ko: '배달', zh: '外卖', zhEn: 'takeout' },
        { ko: '공기밥', zh: '一碗米饭', zhEn: 'A bowl of rice' },
        { ko: '반찬', zh: '小菜', zhEn: 'banchan (side dishes)' },
        { ko: '주문', zh: '点餐', zhEn: 'order' },
        { ko: '포장', zh: '打包', zhEn: 'To pack up' },
        { ko: '계산', zh: '结账', zhEn: 'check, please' },
      ],
    },
    {
      type: 'ending',
      text: '看完这篇再刷剧，每一顿饭都有了新的意义。韩剧里的食物不是背景，是剧情。搬家的짜장면、深夜的소주땅콩、约会的치맥、豪门的한정식——每一样都在说一个故事。下一篇，토리 带你探索韩国辣文化的起源 🌶️（下一篇：韩国辣文化——辣椒是哪里来的）', textEn: 'Read this before your next binge-watch, and every meal will take on new meaning. Food in K-dramas isn\'t just background—it\'s the plot. The jjajangmyeon after moving, late-night soju and peanuts, chimaek on a date, hanjeongsik in chaebol homes—each one tells a story. Next up, Tori takes you to explore the origins of Korea\'s spicy culture 🌶️ (Next: Korean Spice Culture—Where Did Chili Peppers Come From?)',
    },
  ],
},
  {
  slug: 'korean-spicy',
  category: 'food',
  title: '韩国辣文化', titleEn: 'Korean Spice Culture',
  subtitle: '매운맛 — 韩国人对辣的执着', subtitleEn: 'Maewunmat — Korea\'s obsession with spice',
  emoji: '🌶️',
  readMinutes: 10,
  bannerImage: '/images/banners/korean-spicy.webp',
  blocks: [
    {
      type: 'toriQuote',
      label: '토리 说', labelEn: 'Tori says',
      text: '토리有一个问题想了很久：韩国人这么爱吃辣，感觉辣是韩国饮食的灵魂，但辣椒是原产于美洲的植物，韩国在400年前才有辣椒——那在辣椒到来之前，韩国人吃什么？泡菜是什么颜色的？이거 진짜 신기하지 않아요？（这不是很神奇吗？）今天토리 带你一起弄清楚韩国辣文化的前世今生，你会对那碗红红的辣椒酱有完全不同的感受 🌶️', textEn: 'Tori has been wondering about something for a long time: Koreans love spicy food so much that spice feels like the soul of Korean cuisine—but chili peppers are native to the Americas, and Korea only got them 400 years ago. So what did Koreans eat before chili peppers arrived? What color was kimchi? Igeo jinjja singihaji anayo? (Isn\'t that amazing?) Today, Tori takes you through the full story of Korea\'s spicy culture, and you\'ll never look at that bowl of red gochujang the same way again 🌶️',
    },
    {
      type: 'sectionTitle',
      emoji: '📜',
      title: '辣椒到来之前——韩国人吃什么', titleEn: 'Before Chili Peppers—What Koreans Ate',
      sub: '这是很多人没有想过的问题', subEn: 'A question many people have never considered',
    },
    {
      type: 'paragraph',
      heading: '🥬 没有辣椒的韩国饮食', headingEn: '🥬 Korean cuisine without chili peppers',
      text: '今天我们看到的韩国饮食——红色的泡菜、鲜红的떡볶이、火红的김치찌개——这些颜色全部来自고추（辣椒）。但고추是原产于中美洲的植物，大约在1600年前后才传入朝鲜半岛，距今不过400年。', textEn: 'The Korean food we see today—red kimchi, scarlet tteokbokki, fiery kimchi jjigae—all that color comes from gochu (chili peppers). But gochu is native to Central America and only reached the Korean Peninsula around the 1600s, just 400 years ago.',
    },
    {
      type: 'paragraph',
      text: '在辣椒到来之前，朝鲜人用 산초（花椒）、겨자（芥末）、생강（生姜）、마늘（大蒜） 来增添食物的辛辣刺激感。当时的泡菜（김치의 전신）是白色的，用盐、大蒜、生姜腌制——没有一点红色。', textEn: 'Before chili peppers arrived, Koreans used sancho (Sichuan pepper), gyeoja (mustard), saenggang (ginger), and maneul (garlic) to add heat and kick to their food. The kimchi of that time (the predecessor of today\'s kimchi) was white—pickled with salt, garlic, and ginger, with not a trace of red.',
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '생각해봐',
      text: '白色的泡菜，没有辣椒的韩国料理……这幅画面很难想象，但那才是400年前朝鲜半岛餐桌的真实样子。辣椒在400年里彻底改变了一个民族的饮食基因。', textEn: 'White kimchi, Korean food without chili peppers... hard to imagine, but that\'s what the Korean table really looked like 400 years ago. In four centuries, chili peppers completely rewrote a nation\'s culinary DNA.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🗓️',
      title: '고추의 역사——辣椒在朝鲜半岛的400年', titleEn: 'The History of Gochu—400 Years of Chili Peppers on the Korean Peninsula',
      sub: '从"毒物"到"灵魂调料"的漫长旅程', subEn: 'A long journey from "poison" to "soul seasoning"',
    },
    {
      type: 'timeline',
      items: [
        {
          label: '约1592年前后 · 임진왜란（壬辰倭乱）——辣椒随战争而来', labelEn: 'Around 1592 · Imjin Waeran (the Imjin War)—chili peppers arrived with the war',
          desc: '历史上最普遍的说法是：辣椒由日本在壬辰倭乱（1592–1598年，丰臣秀吉入侵朝鲜）期间带入朝鲜半岛。日本此前已从欧洲贸易商处得到辣椒，将其作为毒药或战争工具使用的说法流传至今，但史学界仍有争议。另一说法是辣椒经由中国传入。', descEn: 'The most widely accepted theory is that chili peppers were brought to the Korean Peninsula by Japan during the Imjin War (1592–1598, when Toyotomi Hideyoshi invaded Korea). Japan had obtained chili peppers from European traders earlier, and stories of them being used as poison or a weapon of war persist to this day, though historians still debate this. Another theory is that chili peppers came via China.',
        },
        {
          label: '1600年代初期 · 처음에는 독초로 여겼다——最初被认为是毒草', labelEn: 'Early 1600s · At first it was thought to be a poisonous weed',
          desc: '辣椒刚进入朝鲜时，朝鲜人对这种陌生的植物充满警惕。当时的文献记载显示，有人认为辣椒是"倭辛（日本的毒药）"，不敢轻易食用。这种植物外来、刺激、陌生，需要时间才能被接受。', descEn: 'When chili peppers first arrived in Joseon, people were wary of this unfamiliar plant. Records from the time show that some believed chili peppers were "waeshin (Japanese poison)" and dared not eat them. This foreign, pungent, and strange plant needed time to be accepted.',
        },
        {
          label: '1700年代 · 红色김치诞生——历史的转折点', labelEn: '1700s · The birth of red kimchi — a turning point in history',
          desc: '经过约100年的缓慢接受，辣椒开始大规模进入朝鲜饮食。最重要的变化是김치加入了고춧가루（辣椒粉）——白色的김치变成了红色的김치，这一变化彻底重塑了朝鲜饮食的面貌。从此，红色成为韩国饮食最具代表性的颜色。', descEn: 'After about 100 years of gradual acceptance, chili peppers began entering the Joseon diet in a big way. The most important change was adding gochugaru (chili powder) to kimchi — white kimchi turned red, completely reshaping the face of Joseon cuisine. From then on, red became the most iconic color of Korean food.',
        },
        {
          label: '1800–1900年代 · 고추 문화의 정착——辣文化全面扎根', labelEn: '1800s–1900s · The settlement of gochu culture — spicy culture takes root',
          desc: '19世纪，고추已经从舶来品变成了朝鲜半岛最重要的农作物之一。고추장（辣椒酱）作为韩国三大基础酱料之一（与된장、간장并列）正式确立地位。辣椒的种植遍布全国，고추 농사（辣椒农业）成为农民生计的重要来源。', descEn: 'In the 19th century, gochu had gone from a foreign import to one of the most important crops on the Korean Peninsula. Gochujang (chili paste) was officially established as one of Korea\'s three foundational sauces (alongside doenjang and ganjang). Chili cultivation spread nationwide, and gochu farming became a vital source of livelihood for farmers.',
        },
        {
          label: '现代 · 韩国成为全球辣椒消耗量最大的国家之一', labelEn: 'Modern era · Korea becomes one of the world\'s largest consumers of chili peppers',
          desc: '今天韩国人均年消耗辣椒约4公斤，是全球人均辣椒消耗量最高的国家之一。고추장、고춧가루是韩国家庭厨房里不可缺少的基础调料。辣在韩国人的饮食哲学里不只是味道，是健康、文化和身份认同的一部分。', descEn: 'Today, the average Korean consumes about 4 kg of chili peppers per year, making Korea one of the highest per-capita consumers in the world. Gochujang and gochugaru are essential staples in Korean home kitchens. In Korean food philosophy, spiciness isn\'t just a flavor — it\'s part of health, culture, and identity.',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🫙',
      title: '韩国三大基础酱料——발효의 미학', titleEn: 'Korea\'s three foundational sauces — the aesthetics of fermentation',
      sub: '发酵的美学，韩国饮食的根基', subEn: 'The aesthetics of fermentation, the foundation of Korean cuisine',
    },
    {
      type: 'paragraph',
      heading: '🧬 모두 발효로 만들어요——全部由发酵制成', headingEn: '🧬 They\'re all made by fermentation',
      text: '韩国三大基础酱料——고추장（辣椒酱）、된장（大豆酱）、간장（酱油）——都是发酵食品，而且通常由同一批大豆发酵而来。这三种酱料合称 장（酱），是韩国饮食文化的根基，没有这三样，韩国料理就无从谈起。', textEn: 'Korea\'s three foundational sauces — gochujang (chili paste), doenjang (soybean paste), and ganjang (soy sauce) — are all fermented foods, usually made from the same batch of soybeans. Together they\'re called jang (paste/sauce), and they form the root of Korean food culture. Without these three, Korean cuisine wouldn\'t exist.',
    },
    {
      type: 'paragraph',
      text: '传统上，韩国家庭在每年立冬后制作장，在大缸里发酵整个冬天，到春天取出使用。这个过程叫장 담그기，是韩国家庭年复一年最重要的烹饪仪式之一，也是韩国非物质文化遗产的重要组成部分。', textEn: 'Traditionally, Korean households made jang after the start of winter each year, fermenting it in large crocks all winter long and using it in spring. This process is called jang damgeugi, one of the most important annual cooking rituals in Korean homes and a key part of Korea\'s intangible cultural heritage.',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          emoji: '🌶️',
          ko: '고추장',
          zh: '辣椒酱', zhEn: 'gochujang (chili paste)',
          tags: ['辣度：中辣到辣'],
          desc: '糯米、黄豆酱、辣椒粉发酵而成，甜辣咸鲜四味合一。是떡볶이、비빔밥、쌈장的核心原料。韩国最具代表性的调料。', descEn: 'Fermented from glutinous rice, soybean paste, and chili powder, it combines sweet, spicy, salty, and savory in one. It\'s the core ingredient in tteokbokki, bibimbap, and ssamjang. Korea\'s most iconic condiment.',
        },
        {
          emoji: '🫙',
          ko: '된장',
          zh: '大豆酱', zhEn: 'Soybean paste',
          tags: ['辣度：不辣'],
          desc: '黄豆发酵制成的深色酱料，味道浓厚复杂。是된장찌개的灵魂，也是쌈장的主要成分之一。发酵程度越深香气越复杂。', descEn: 'A dark paste made from fermented soybeans with a rich, complex flavor. It\'s the soul of doenjang jjigae and a key ingredient in ssamjang. The deeper the fermentation, the more complex the aroma.',
        },
        {
          emoji: '🍶',
          ko: '간장',
          zh: '酱油', zhEn: 'soy sauce',
          tags: ['辣度：不辣'],
          desc: '与된장同源，从发酵大豆提取的液体。韩国간장分为양조간장（酿造酱油）和조선간장（传统朝鲜酱油），后者颜色更淡，味道更咸。', descEn: 'Made from the same source as doenjang, it\'s the liquid extracted from fermented soybeans. Korean ganjang is divided into yangjo ganjang (brewed soy sauce) and Joseon ganjang (traditional Korean soy sauce), the latter being lighter in color and saltier in taste.',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🔥',
      title: '韩国辣度排行——从入门到地狱', titleEn: 'Korea\'s spiciness scale — from beginner to hell',
      sub: '토리 替你试过了，你只需要知道该点哪个', subEn: 'Tori has tried them all for you — you just need to know what to order',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          emoji: '😊',
          ko: '순한맛 / 궁중떡볶이',
          desc: '不辣或极微辣。궁중떡볶이（宫廷炒年糕）酱油底，不放辣椒；순한맛（温和味）是很多辣食的无辣版本。外国人和不吃辣的人放心选。', descEn: 'Not spicy or barely spicy. Gungjung tteokbokki (royal court tteokbokki) has a soy sauce base with no chili; sunhan-mat (mild flavor) is the no-spice version of many spicy dishes. Safe choices for foreigners and those who don\'t eat spicy food.',
          tags: ['入门'],
        },
        {
          emoji: '🌸',
          ko: '로제떡볶이 / 간장치킨',
          desc: '奶油粉色炒年糕和酱油炸鸡。前者辣椒酱被奶油中和，微辣甜香；后者完全不辣。适合辣度敏感但想体验韩国味道的人。', descEn: 'Creamy pink tteokbokki and soy sauce fried chicken. The former has gochujang tempered by cream — mildly spicy and sweet; the latter is completely non-spicy. Great for those sensitive to spice but wanting to experience Korean flavors.',
          tags: ['微辣'],
        },
        {
          emoji: '🌶️',
          ko: '일반 떡볶이 / 양념치킨',
          desc: '标准版炒年糕和甜辣炸鸡，这是韩国人日常的辣度。对有辣食经验的中国人来说基本没有压力，但辣度零基础的人可能会流汗。', descEn: 'Standard tteokbokki and sweet-spicy fried chicken — this is the everyday spice level for Koreans. For Chinese people with experience eating spicy food, it\'s basically no problem, but complete beginners might break a sweat.',
          tags: ['中辣'],
        },
        {
          emoji: '🔥',
          ko: '엽기떡볶이 / 낙지볶음',
          desc: '连锁品牌엽기떡볶이的标准级别，以及辣炒章鱼。韩国辣食爱好者的日常，但对辣度敏感的人会明显感到刺激，需要备好水。', descEn: 'The standard level at the chain brand Yeopgi Tteokbokki, plus spicy stir-fried octopus. Everyday fare for Korean spicy food lovers, but those sensitive to heat will definitely feel the burn — keep water handy.',
          tags: ['辣'],
        },
        {
          emoji: '😵',
          ko: '불닭볶음면 / 마라탕（한국식）',
          desc: '火鸡面和韩式麻辣烫。불닭볶음면是韩国出口全球的辣面挑战，辣度极高。即使是韩国辣食爱好者，第一次吃也可能眼泪直流。', descEn: 'Buldak noodles and Korean-style mala tang. Buldak Bokkeum Myeon is Korea\'s globally exported spicy noodle challenge with extreme heat. Even Korean spicy food lovers might tear up on their first try.',
          tags: ['极辣'],
        },
        {
          emoji: '💀',
          ko: '핵불닭 / 엽기 최고매운맛',
          desc: '핵불닭（核辣火鸡）和엽기떡볶이最高辣度版本。在韩国是挑战级别，连很多韩国人都无法完成。尝试之前请确认自己对辣有充分准备。', descEn: 'Haeks-buldak (nuclear spicy buldak) and the highest spice level of Yeopgi Tteokbokki. These are challenge-level in Korea — even many Koreans can\'t finish them. Before trying, make sure you\'re fully prepared for the heat.',
          tags: ['地狱级'],
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🌶️',
      title: '三道必须了解的经典辣食', titleEn: 'Three Classic Spicy Foods You Must Know',
      sub: '辣得有道理，辣得有文化', subEn: 'Spicy with Reason, Spicy with Culture',
    },
    {
      type: 'featureCard',
      emoji: '🥬',
      title: '김치',
      desc: '泡菜 · 韩国辣文化最重要的符号 · 🌶️ 微辣到中辣', descEn: 'Kimchi · The Most Important Symbol of Korean Spicy Culture · 🌶️ Mild to Medium',
    },
    {
      type: 'paragraph',
      text: '김치是韩国最重要的发酵食品，用盐腌制白菜后，涂上고춧가루（辣椒粉）、마늘（大蒜）、생강（生姜）、젓갈（鱼露）制成的酱料，发酵数天到数月。김치不只是一道菜，是韩国的文化象征，2013年被列入UNESCO人类非物质文化遗产。', textEn: 'Kimchi is Korea\'s most important fermented food. Cabbage is salted, then coated with a paste made from gochugaru (chili powder), maneul (garlic), saenggang (ginger), and jeotgal (fish sauce), then fermented for days to months. Kimchi isn\'t just a dish—it\'s a cultural symbol of Korea, listed as a UNESCO Intangible Cultural Heritage in 2013.',
    },
    {
      type: 'paragraph',
      text: '韩国家庭每年冬天进行一次大规模的김치腌制活动，叫做 김장（泡菜腌制）。全家人聚在一起，一次腌制足够一整年吃的김치——这不只是食物储备，是凝聚家人、传承文化的仪式。김장也是UNESCO非遗项目。', textEn: 'Korean families hold a large-scale kimchi-making event every winter called gimjang (kimchi-making). The whole family gathers to make enough kimchi for an entire year—it\'s not just food storage, but a ritual that bonds family and passes down culture. Gimjang is also a UNESCO Intangible Cultural Heritage.',
    },
    {
      type: 'toriQuote',
      text: '韩国目前有超过200种김치，不同地区、不同食材、不同季节有不同的版本。最常见的배추김치（白菜泡菜）只是其中之一——还有깍두기（萝卜泡菜）、오이소박이（黄瓜泡菜）、열무김치（嫩萝卜叶泡菜）……', textEn: 'Korea currently has over 200 types of kimchi, with different versions by region, ingredient, and season. The most common baechu-kimchi (cabbage kimchi) is just one—there\'s also ggakdugi (radish kimchi), oi-sobagi (stuffed cucumber kimchi), yeolmu-kimchi (young radish leaf kimchi)...',
    },
    {
      type: 'featureCard',
      emoji: '🍜',
      title: '불닭볶음면',
      desc: '火鸡面 · 韩国辣食的全球名片 · 💀 极辣', descEn: 'Buldak Noodles · Korea\'s Global Spicy Food Icon · 💀 Extremely Spicy',
    },
    {
      type: 'paragraph',
      text: '2012年三养食品推出불닭볶음면，以当时韩国最辣为卖点。没有人预料到它会成为全球现象——YouTube上的"불닭볶음면 챌린지（火鸡面挑战）"视频爆红，让这款面条成为韩国最广为人知的出口食品之一，甚至超越了김치在某些市场的知名度。', textEn: 'In 2012, Samyang Foods launched Buldak Bokkeum-myeon, marketed as the spiciest in Korea at the time. No one predicted it would become a global phenomenon—the "Buldak Bokkeum-myeon Challenge" videos on YouTube went viral, making this noodle one of Korea\'s most well-known export foods, even surpassing kimchi\'s recognition in some markets.',
    },
    {
      type: 'paragraph',
      text: '불닭볶음면的辣度约4,404–12,000史高维尔单位（SHU），远超普通辣椒。三养不断推出更辣的版本——핵불닭（约超过10,000 SHU）、2배불닭（双倍辣）……把"挑战辣度"变成了一个持续的营销策略和文化现象。', textEn: 'Buldak Bokkeum-myeon has a spiciness of about 4,404–12,000 Scoville Heat Units (SHU), far exceeding regular chili peppers. Samyang keeps releasing spicier versions—Haek Buldak (over 10,000 SHU), 2x Buldak (double spicy)... turning "challenging spiciness" into an ongoing marketing strategy and cultural phenomenon.',
    },
    {
      type: 'toriQuote',
      label: '토리 说', labelEn: 'Tori says',
      text: '불닭볶음면在中国叫"火鸡面"，是因为불닭에서 불（火）+ 닭（鸡）= 火鸡。但这和感恩节的火鸡没有关系，只是字面翻译。', textEn: 'Buldak Bokkeum-myeon is called "fire chicken noodles" in Chinese because bul (fire) + dak (chicken) = fire chicken. But it has nothing to do with Thanksgiving turkey—it\'s just a literal translation.',
    },
    {
      type: 'featureCard',
      emoji: '🐙',
      title: '낙지볶음',
      desc: '辣炒章鱼 · 不是挑战，是日常 · 🔥 辣', descEn: 'Spicy Stir-fried Octopus · Not a Challenge, It\'s Everyday · 🔥 Spicy',
    },
    {
      type: 'paragraph',
      text: '낙지（章鱼）用고추장、고춧가루、마늘大量炒制，颜色鲜红，辣味十足，是韩国最正宗的辣食之一。和불닭볶음면那种挑战型的辣不同，낙지볶음是韩国人真实的日常辣食——很多韩国人下班后会去낙지집（章鱼店）点一份낙지볶음下饭。', textEn: 'Nakji (octopus) is stir-fried with generous amounts of gochujang, gochugaru, and garlic, giving it a vivid red color and intense heat—one of Korea\'s most authentic spicy dishes. Unlike the challenge-style heat of Buldak Bokkeum-myeon, nakji-bokkeum is real everyday spicy food for Koreans—many stop by a nakji-jip (octopus restaurant) after work to order a plate with rice.',
    },
    {
      type: 'paragraph',
      text: '낙지볶음有时会和공기밥（米饭）一起做成낙지볶음밥，最后在锅里炒一份볶음밥（炒饭）——这和烤肉餐厅的收尾炒饭一样，是韩国饮食"把锅底用到极致"精神的体现。', textEn: 'Nakji-bokkeum is sometimes made into nakji-bokkeum-bap with gonggi-bap (rice), finishing by stir-frying a portion of bokkeum-bap (fried rice) in the pan—just like the ending fried rice at Korean BBQ restaurants, reflecting the Korean culinary spirit of "using every last bit of the pan."',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '💪',
      title: '韩国人为什么觉得辣的是健康的', titleEn: 'Why Koreans Think Spicy Is Healthy',
      sub: '고추에 대한 한국인의 믿음',
    },
    {
      type: 'paragraph',
      heading: '🏥 辣椒在韩国的健康地位', headingEn: '🏥 The Health Status of Chili Peppers in Korea',
      text: '韩国传统医学（한의학）认为，고추属于温热性食材，适量食用有助于促进血液循环、增强体力、排出体内寒气。这种观念与韩国人爱吃辣的习惯相互强化——吃辣不只是喜好，而是一种对身体有益的选择。', textEn: 'Korean traditional medicine (hanui-hak) holds that gochu (chili peppers) are warming ingredients that, when eaten in moderation, help promote blood circulation, boost energy, and expel cold from the body. This belief reinforces Koreans\' love of spicy food—eating spicy isn\'t just a preference, but a choice seen as beneficial to health.',
    },
    {
      type: 'paragraph',
      text: '现代科学研究也证实，辣椒中的辣椒素（capsaicin）确实有一定的代谢促进和抗炎效果。韩国人拿这些研究来佐证传统믿음（信仰），让"辣的是健康的"这个概念更加根深蒂固。', textEn: 'Modern science has also confirmed that capsaicin in chili peppers does have some metabolism-boosting and anti-inflammatory effects. Koreans use these studies to support traditional mit-eum (beliefs), making the idea that "spicy is healthy" even more deeply rooted.',
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '흥미로운 사실',
      text: '韩国는 전 세계적으로 위암（胃癌）발생률이 높은 나라 중 하나이기도 합니다（韩国同时也是胃癌发生率较高的国家之一）。研究者认为这与大量摄入腌制食品和辣椒有一定关联，但具体机制仍在研究中。辣椒是韩国文化的核心，它的利与弊都是真实存在的。', textEn: 'Korea is also one of the countries with a high incidence of stomach cancer worldwide. Researchers believe this is somewhat linked to heavy consumption of fermented foods and chili peppers, but the exact mechanism is still under study. Chili peppers are central to Korean culture—both their benefits and drawbacks are real.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🌍',
      title: '불닭的全球化——一碗泡面改变世界对韩辣的认知', titleEn: 'The Globalization of Buldak—How One Bowl of Noodles Changed the World\'s View of Korean Spice',
      sub: '2012 年上市的不只是泡面，是现象', subEn: 'What Launched in 2012 Wasn\'t Just Instant Noodles—It Was a Phenomenon',
    },
    {
      type: 'paragraph',
      text: '불닭볶음면（Buldak 火鸡面）2012 年 4 月由三养食品推出，起初辣度为 4,404 SHU。真正引发全球狂热的是 2014 年 YouTube 频道 Korean Englishman 发起的"Fire Noodle Challenge"——挑战不喝水吃完一碗불닭。这个挑战在 TikTok 上催生了超过 4 亿条相关视频，카디비（Cardi B）等全球明星也参与其中。到 2024 年 9 月，불닭系列全球累计售出 66 亿包。2024 年三养食品总收入 1.73 万亿韩元，其中出口占 77%，出口额首次突破 1 万亿韩元（约 10 亿美元）。产品销往 100 多个国家，在美国沃尔玛等主流渠道均有销售。2024 年 6 月丹麦曾以"辣椒素过高可能导致急性中毒"为由召回三款불닭产品——这场争议反而成了史上最好的免费广告。', textEn: 'Buldak Bokkeum-myeon was launched by Samyang Foods in April 2012 with an initial spiciness of 4,404 SHU. What truly sparked the global craze was the "Fire Noodle Challenge" started by the YouTube channel Korean Englishman in 2014—eating a bowl of Buldak without drinking water. The challenge spawned over 400 million related videos on TikTok, with global stars like Cardi B joining in. By September 2024, the Buldak line had sold 6.6 billion packs worldwide. In 2024, Samyang Foods\' total revenue was 1.73 trillion KRW, with exports accounting for 77%—export revenue surpassing 1 trillion KRW (about $1 billion) for the first time. Products are sold in over 100 countries, including mainstream retailers like Walmart in the US. In June 2024, Denmark recalled three Buldak products citing "capsaicin levels high enough to cause acute poisoning"—but the controversy turned out to be the best free advertising ever.',
    },
    {
      type: 'sectionTitle',
      emoji: '🔍',
      title: '辣文化冷知识', titleEn: 'Spicy Culture Fun Facts',
      sub: '这些让你对辣椒和韩国文化的理解更立体', subEn: 'These Will Give You a More Rounded Understanding of Chili Peppers and Korean Culture',
    },
    {
      type: 'trivia',
      items: [
        {
          tag: '역사 미스터리',
          q: '辣椒到底是怎么进入朝鲜的？', qEn: 'How Did Chili Peppers Actually Arrive in Korea?',
          a: '史学界至今没有定论。主流说法有两个：一是壬辰倭乱期间日本传入，二是经由中国贸易传入。朝鲜文献中最早关于고추的记录出现在1614年，但传入时间可能更早。有趣的是，日本的说法在韩国人中引发争议——很多韩国人不愿意接受韩国最重要的食材来自日本这个历史。', aEn: 'Historians still haven\'t reached a consensus. There are two main theories: one is that they were introduced by Japan during the Imjin War, and the other is that they came via trade with China. The earliest record of gochu in Korean literature dates to 1614, but they may have arrived earlier. Interestingly, the Japan theory sparks controversy among Koreans—many are reluctant to accept that Korea\'s most important ingredient came from Japan.',
        },
        {
          tag: '김장 문화',
          q: '韩国的김장到底有多大规模？', qEn: 'How big is Korea\'s kimjang, really?',
          a: '韩国家庭平均每年김장消耗约20–30棵白菜，制作约40–50公斤김치。城市化之后很多家庭开始买现成的김치，但김장문화并没有消失——很多家庭依然坚持自制，把它视为家庭团聚和文化传承的仪式。2013年김장이 유네스코에 등재됐어요（被联合国教科文组织列入非遗）。', aEn: 'On average, Korean households use about 20–30 heads of cabbage per year for kimjang, making 40–50 kg of kimchi. After urbanization, many families started buying ready-made kimchi, but the kimjang culture hasn\'t disappeared—many still insist on making it themselves, treating it as a ritual of family bonding and cultural heritage. In 2013, kimjang was registered with UNESCO (listed as intangible cultural heritage).',
        },
        {
          tag: '글로벌 영향',
          q: '韩国辣文化如何影响全球？', qEn: 'How has Korea\'s spicy culture influenced the world?',
          a: '불닭볶음면的全球爆红是最明显的例子，但韩国辣文化的全球化不止于此。고추장作为调料已经出现在很多国家的超市，韩国泡菜在全球健康食品市场持续增长，"韩式辣"（Korean spicy）成为全球餐饮界的流行标签之一。', aEn: 'The global craze for buldak bokkeum-myeon is the most obvious example, but the globalization of Korean spicy culture goes beyond that. Gochujang has appeared as a condiment in supermarkets in many countries, Korean kimchi keeps growing in the global health food market, and "Korean spicy" has become one of the trendiest labels in the global food scene.',
        },
        {
          tag: '지역 차이',
          q: '韩国不同地区的辣度不同吗？', qEn: 'Do different regions in Korea have different spice levels?',
          a: '明显不同。전라도（全罗道，韩国西南部）以饮食最辣最丰盛著称，특히 광주（光州）的음식이 매운 걸로 유명해요（以辣食闻名）。경상도（庆尚道，东南部）口味也重。相比之下，경기도（首都圈）和서울的饮食辣度相对温和，更符合现代都市口味。外地人到전라도吃饭，经常被辣度惊到。', aEn: 'Definitely. Jeolla-do (southwestern Korea) is known for the spiciest and most lavish food, especially Gwangju, which is famous for its spicy dishes. Gyeongsang-do (southeast) also has heavy flavors. In contrast, Gyeonggi-do (the capital area) and Seoul are relatively milder, fitting modern urban tastes. Outsiders eating in Jeolla-do are often shocked by the spice level.',
        },
      ],
    },
    {
      type: 'highlight',
      variant: 'warning',
      title: '🌶️ 在韩国点辣食之前要知道', titleEn: '🌶️ What to know before ordering spicy food in Korea',
      text: '韩国餐厅的辣度没有全国统一标准，同样叫做"보통 맵기（普通辣度）"，在不同餐厅可能差距很大。不确定辣度时，先问一句：많이 매워요?（很辣吗？）——如果服务员说 네 많이 매워요（是的很辣），那就做好心理准备；如果说 그냥 조금 매워요（就是有点辣），对有辣食经验的人来说通常没有压力。', textEn: 'There\'s no nationwide standard for spice levels in Korean restaurants. The same "보통 맵기 (regular spice)" can vary wildly between places. If you\'re unsure, just ask: 많이 매워요? (Is it very spicy?)—if the server says 네 많이 매워요 (yes, very spicy), brace yourself; if they say 그냥 조금 매워요 (just a little spicy), it\'s usually no problem for anyone used to spicy food.',
    },
    {
      type: 'phraseList',
      title: '토리 教你说——关于辣的必备韩语', titleEn: 'Tori teaches you—essential Korean for spicy food',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        { ko: '많이 매워요?', ro: 'ma-ni mae-wo-yo?', scene: '🌶️ 点菜前确认辣度', sceneEn: '🌶️ Check the spice level before ordering', zh: '很辣吗？', zhEn: 'Is it very spicy?' },
        { ko: '저는 매운 거 못 먹어요.', ro: 'jeo-neun mae-un geo mot meok-eo-yo', scene: '😰 说明自己不吃辣', sceneEn: '😰 Saying you can\'t handle spice', zh: '我不能吃辣的', zhEn: 'I can\'t eat spicy food.' },
        { ko: '맵지 않은 걸로 주세요.', ro: 'maep-ji a-neun geol-lo ju-se-yo', scene: '🥬 要不辣的版本', sceneEn: '🥬 Asking for a non-spicy version', zh: '请给我不辣的', zhEn: 'Please give me the non-spicy one.' },
        { ko: '너무 맵지만 맛있어요!', ro: 'neo-mu maep-ji-man ma-si-sseo-yo', scene: '🔥 又辣又好吃', sceneEn: '🔥 Spicy and delicious', zh: '很辣但很好吃！', zhEn: 'It\'s very spicy but so good!' },
        { ko: '물 한 잔 더 주세요.', ro: 'mul han jan deo ju-se-yo', scene: '💧 吃辣时要水', sceneEn: '💧 Water for when it\'s spicy', zh: '再给我一杯水', zhEn: 'Give me another glass of water.' },
        { ko: '입이 얼얼해요.', ro: 'i-bi eol-eol-hae-yo', scene: '😵 嘴巴麻了', sceneEn: '😵 My mouth is numb', zh: '嘴巴辣麻了', zhEn: 'My mouth is numb from the spice.' },
      ],
    },
    {
      type: 'sectionTitle',
      emoji: '📖',
      title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson',
    },
    {
      type: 'vocabList',
      items: [
        { ko: '고추', zh: '辣椒', zhEn: 'Chili pepper' },
        { ko: '고추장', zh: '辣椒酱', zhEn: 'gochujang (chili paste)' },
        { ko: '고춧가루', zh: '辣椒粉', zhEn: 'chili powder' },
        { ko: '된장', zh: '大豆酱', zhEn: 'Soybean paste' },
        { ko: '간장', zh: '酱油', zhEn: 'soy sauce' },
        { ko: '김장', zh: '泡菜腌制', zhEn: 'Kimchi making' },
        { ko: '맵다', zh: '辣', zhEn: 'spicy' },
        { ko: '순한맛', zh: '温和口味', zhEn: 'Mild flavor' },
        { ko: '불닭볶음면', zh: '火鸡面', zhEn: 'Fire chicken noodles' },
        { ko: '낙지볶음', zh: '辣炒章鱼', zhEn: 'Spicy stir-fried octopus' },
        { ko: '발효', zh: '发酵', zhEn: 'fermentation' },
        { ko: '장', zh: '酱（总称）', zhEn: 'sauce (general term)' },
      ],
    },
    {
      type: 'ending',
      text: '那碗红色的辣，是400年的历史\n从美洲来的辣椒，经由战争来到朝鲜半岛，用100年时间慢慢被接受，再用300年变成韩国人的灵魂调料。今天每一口红色的김치、每一碗炒年糕、每一盘辣炒章鱼——都是那段历史留下的味道。\n오늘도 화이팅！맛있는 한국 음식 많이 드세요 🐰', textEn: 'That bowl of red spice is 400 years of history.\\nChili peppers from the Americas came to the Korean Peninsula through war, took 100 years to be slowly accepted, and 300 more to become the soul seasoning of Koreans. Every bite of red kimchi, every bowl of tteokbokki, every plate of spicy stir-fried octopus today—it\'s all the flavor left by that history.\\nFighting today! Enjoy lots of delicious Korean food 🐰',
    },
  ],
},
  {
  slug: 'seoul-districts',
  category: 'travel',
  title: '首尔街区性格图鉴', titleEn: 'Seoul Neighborhood Personality Guide',
  subtitle: '서울 동네 — 每个区都有它的灵魂', subtitleEn: 'Seoul neighborhoods—each district has its own soul',
  emoji: '🏙️',
  readMinutes: 10,
  bannerImage: '/images/banners/seoul-districts.webp',
  blocks: [
    {
      type: 'toriQuote',
      label: '토리 说', labelEn: 'Tori says',
      text: '很多人去首尔，行程就是明洞、南山、景福宫三点一线，然后说"首尔就这样"。토리 想说：你只看到了首尔的皮肤。首尔是一座有强烈性格分化的城市——弘大是永远18岁的大学生，성수동是想破圈的艺术家，강남是穿西装的精英，북촌是600年前的贵族……每个街区都是不同的宇宙。今天토리 带你认识首尔八个最值得去的街区，找到属于你的那个首尔 🗺️', textEn: 'Many people visit Seoul with a one-track itinerary—Myeongdong, Namsan, Gyeongbokgung—then say, "Seoul is just that." Tori wants to say: you\'ve only seen Seoul\'s skin. Seoul is a city of sharply divided personalities—Hongdae is the forever-18 college student, Seongsu-dong is the artist trying to break through, Gangnam is the suit-wearing elite, Bukchon is the aristocrat from 600 years ago... Each neighborhood is a different universe. Today, Tori introduces you to Seoul\'s eight most worthwhile neighborhoods, and helps you find your Seoul 🗺️',
    },
    {
      type: 'sectionTitle',
      emoji: '🗺️',
      title: '快速对比——哪个街区适合你', titleEn: 'Quick comparison—which neighborhood suits you',
      sub: '先看这个，再决定去哪里', subEn: 'Check this first, then decide where to go',
    },
    {
      type: 'table',
      head: ['街区', '性格关键词', '最适合', '最佳时间'],
      rows: [
        ['홍대 弘大', '年轻、街头、艺术、夜生活', '第一次来首尔的年轻人', '傍晚到深夜'],
        ['성수동 圣水洞', '工业风、网红、创意、咖啡', '追求独特体验的潮人', '周末下午'],
        ['강남 江南', '繁华、时尚、购物、精英', '喜欢高档购物和夜生活', '全天均可'],
        ['북촌 北村', '传统、韩屋、宁静、历史', '喜欢历史文化和拍照', '早上（人少）'],
        ['익선동 益善洞', '复古、小众、仪式感、韩屋咖啡', '喜欢小众文艺感的人', '平日下午'],
        ['연남동 延南洞', '安静、文艺、独立咖啡、散步', '想逃离人群的旅行者', '午后任何时间'],
        ['명동 明洞', '热闹、购物、街头小吃、游客', '想一站购物扫货的人', '下午到夜晚'],
        ['이태원 梨泰院', '国际、多元、美食、酒吧', '想吃异国料理或体验多元文化', '晚上'],
      ],
    },
    { type: 'sectionBreak'},

    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        { emoji: '🎨', ko: '홍대 앞', zh: '弘大 · 永远18岁的首尔', zhEn: 'Hongdae · The eternally 18-year-old Seoul', desc: '✨ 젊음 · 예술 · 자유', tags: ['강북 · 마포구'] },
      ],
    },
    {
      type: 'table',
      head: ['地铁', '氛围', '最佳时间'],
      rows: [['2号线 홍대입구역', '活力 · 街头', '傍晚 → 深夜']],
    },
    {
      type: 'paragraph',
      text: '弘大（홍익대학교周边）是首尔最具青春气息的街区，韩国最顶尖的艺术设计大学弘益大学就在这里，周边聚集了无数独立艺术家、音乐人、设计师。街头涂鸦、独立唱片店、小剧场、地下乐队——这里是首尔最有创作能量的地方。', textEn: 'Hongdae (around Hongik University) is Seoul\'s most youthful neighborhood. Korea\'s top art and design university, Hongik University, is right here, surrounded by countless independent artists, musicians, and designers. Street graffiti, indie record stores, small theaters, underground bands—this is where Seoul\'s creative energy is strongest.',
    },
    {
      type: 'paragraph',
      text: '但弘大不只是艺术。它同时是首尔夜生活最活跃的区域之一——클럽（Club）、포장마차（路边摊酒馆）、24小时营业的편의점……深夜的弘大和白天的弘大是两个完全不同的世界。傍晚之后，街头表演者开始出现，音乐声从每一个角落飘出来。', textEn: 'But Hongdae isn\'t just art. It\'s also one of Seoul\'s most active nightlife areas—clubs, pojangmacha (street stall bars), 24-hour convenience stores... Hongdae at night and Hongdae during the day are two completely different worlds. After dusk, street performers start to appear, and music drifts out from every corner.',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        { emoji: '🏃', zh: '必去地点', zhEn: 'Must-visit spots', desc: '홍대 걷고 싶은 거리 / 상상마당（创意文化中心）/ 연남동 골목（周边小巷）', descEn: 'Hongdae Walking Street / Sangsang Madang (creative culture center) / Yeonnam-dong alleys (surrounding lanes)' },
        { emoji: '🍽️', zh: '必吃必喝', zhEn: 'Must eat and drink', desc: '분식집 떡볶이 / 닭꼬치（烤鸡串）/ 독립 카페 커피', descEn: 'Tteokbokki from snack bars / dakkochi (grilled chicken skewers) / indie café coffee' },
        { emoji: '🛍️', zh: '必买', zhEn: 'Must buy', desc: '독립 브랜드 옷 / 빈티지 숍（古着店）/ 아이돌 굿즈', descEn: 'Independent brand clothes / vintage shops / idol merchandise' },
      ],
    },
    {
      type: 'toriQuote',
      label: '🐰 토리',
      text: '토리의 홍대 루트：지하철 2호선 홍대입구역 9번 출구 나와서 → 걷고 싶은 거리 → 연남동 골목 → 포장마차에서 오뎅과 소주 한 잔. 이 코스면 충분해요. 주말 저녁은 사람이 정말 많으니, 평일 저녁을 추천해요.',
    },
    { type: 'paragraph', heading: '适合', headingEn: 'Best for', text: '처음 서울 여행 · 아이돌 팬 · 야간 활동 · 쇼핑' },

    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        { emoji: '🏭', ko: '성수동', zh: '圣水洞 · 首尔的Brooklyn', zhEn: 'Seongsu-dong · Seoul\'s Brooklyn', desc: '🏭 공장 · 감성 · 힙', tags: ['강북 · 성동구'] },
      ],
    },
    {
      type: 'table',
      head: ['地铁', '氛围', '最佳时间'],
      rows: [['2号线 성수역', '工业 · 创意', '周末下午']],
    },
    {
      type: 'paragraph',
      text: '성수동曾经是首尔的皮革制品工业区，旧工厂、仓库遍布街道。2010年代开始，艺术家和创业者发现了这里的工业美学潜力，把旧厂房改造成咖啡厅、画廊、品牌快闪店——首尔的Brooklyn就此诞生。', textEn: 'Seongsu-dong was once Seoul\'s leather goods industrial district, with old factories and warehouses lining the streets. Starting in the 2010s, artists and entrepreneurs discovered the industrial aesthetic potential here, converting old factory buildings into cafés, galleries, and brand pop-up stores—Seoul\'s Brooklyn was born.',
    },
    {
      type: 'paragraph',
      text: '每一家성수동的咖啡厅都有自己的视觉主题：裸露管道和水泥墙的工业风、用旧机器做装置艺术的复古风、大量绿植的丛林风……韩国所有走在最前沿的品牌，第一家店几乎都开在성수동。', textEn: 'Every café in Seongsu-dong has its own visual theme: industrial style with exposed pipes and concrete walls, retro style using old machines as installation art, jungle style with lots of greenery... Almost every cutting-edge brand in Korea opens its first store in Seongsu-dong.',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        { emoji: '🏃', zh: '必去', zhEn: 'Must visit', desc: '대림창고（工业风咖啡）/ 서울숲（首尔森林公园）/ 팝업스토어 골목', descEn: 'Daerim Warehouse (industrial-style café) / Seoul Forest / pop-up store alley' },
        { emoji: '☕', zh: '必喝', zhEn: 'Must drink', desc: '성수동 카페들 / 아인슈페너（维也纳咖啡）/ 精品手冲咖啡', descEn: 'Seongsu-dong cafés / Einspänner (Viennese coffee) / specialty pour-over coffee' },
        { emoji: '📸', zh: '必拍', zhEn: 'Must-Photograph', desc: '공장 벽면 그래피티 / 카페 내부 인테리어 / 서울숲 자전거길' },
      ],
    },
    {
      type: 'toriQuote',
      label: '🐰 토리',
      text: '성수동의 가장 좋은 점：주말에 팝업스토어가 정말 많아요. 한국 브랜드들이 새 제품을 성수동에서 먼저 선보이는 경우가 많아서, 주말에 가면 예상 못 한 특별한 것을 발견할 수 있어요.',
    },
    { type: 'paragraph', heading: '适合', headingEn: 'Best for', text: '인스타그램 감성 · 카페 투어 · 한국 로컬 브랜드' },

    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        { emoji: '💎', ko: '강남', zh: '江南 · PSY那首歌不是夸张的', zhEn: 'Gangnam · PSY\'s song wasn\'t an exaggeration', desc: '💼 부유 · 세련 · 럭셔리', tags: ['강남구'] },
      ],
    },
    {
      type: 'table',
      head: ['地铁', '氛围', '最佳时间'],
      rows: [['2号线 강남역', '精英 · 繁华', '全天均可']],
    },
    {
      type: 'paragraph',
      text: '汉江以南的강남区是首尔最富裕的区域，全球奢侈品牌在这里的密度堪比巴黎香榭丽舍大街。PSY的《江南Style》之所以成为文化现象，是因为강남在韩国文化里本身就是"富贵"的代名词。', textEn: 'Gangnam, south of the Han River, is Seoul\'s wealthiest district, with a density of global luxury brands rivaling Paris\'s Champs-Élysées. PSY\'s "Gangnam Style" became a cultural phenomenon because Gangnam itself is synonymous with "wealth" in Korean culture.',
    },
    {
      type: 'paragraph',
      text: '강남的核心商业区압구정（狎鸥亭）和청담동（清潭洞）是韩国最高端的购物区，整形外科医院也密集分布在这一带（这不是巧合）。삼성동（三成洞）的COEX购物中心是全亚洲最大的地下购物中心之一。', textEn: 'Gangnam\'s core commercial areas—Apgujeong and Cheongdam-dong—are Korea\'s most upscale shopping districts, with plastic surgery clinics densely clustered here (not a coincidence). The COEX Mall in Samseong-dong is one of Asia\'s largest underground shopping centers.',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        { emoji: '🏃', zh: '必去', zhEn: 'Must visit', desc: 'COEX 아쿠아리움 / 별마당 도서관 / 압구정 로데오거리' },
        { emoji: '🍽️', zh: '必吃', zhEn: 'Must-Eat', desc: '한우 전문점 / 파인다이닝 한정식 / 청담동 베이커리' },
        { emoji: '🛍️', zh: '必逛', zhEn: 'Must-Visit', desc: '명품 브랜드 매장 / 한국 고급 뷰티 브랜드 / COEX 쇼핑몰' },
      ],
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '별마당 도서관이란',
      text: 'COEX商城内部的大型开放图书馆，巨大的书墙从地面延伸到天花板，是강남最值得去的免费景点。不需要会员也可以入内，随意浏览，是首尔最美的公共空间之一。', textEn: 'The massive open library inside COEX Mall, with towering book walls from floor to ceiling, is Gangnam\'s most worthwhile free attraction. No membership needed—just walk in and browse. It\'s one of Seoul\'s most beautiful public spaces.',
    },
    { type: 'paragraph', heading: '适合', headingEn: 'Best for', text: '고급 쇼핑 · 파인다이닝 · 클럽 야경' },

    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        { emoji: '🏯', ko: '북촌 한옥마을', zh: '北村韩屋村 · 走进600年前的首尔', zhEn: 'Bukchon Hanok Village · Step into Seoul 600 years ago', desc: '🏯 전통 · 고요 · 역사', tags: ['종로구 · 경복궁 옆'] },
      ],
    },
    {
      type: 'table',
      head: ['地铁', '氛围', '最佳时间'],
      rows: [['3号线 안국역', '宁静 · 历史', '早上9点前（人少）']],
    },
    {
      type: 'paragraph',
      text: '北村是首尔保存最完好的韩屋（传统建筑）聚居区，位于景福宫和昌德宫之间，朝鲜时代贵族和王室官员曾居住于此。瓦片屋顶、木制门框、蜿蜒的石板小巷——在这里你会感觉时间突然慢下来。', textEn: 'Bukchon is Seoul\'s best-preserved hanok (traditional house) neighborhood, nestled between Gyeongbokgung and Changdeokgung palaces, once home to Joseon-era nobles and royal officials. Tiled roofs, wooden door frames, winding stone alleys—here, time suddenly slows down.',
    },
    {
      type: 'paragraph',
      text: '现在北村的韩屋已经有很多改造成了咖啡厅、工艺品店、博物馆。坐在有瓦片屋顶的空间里喝一杯传统차（茶），窗外就是景福宫的屋脊——这种视觉冲击是首尔独有的。', textEn: 'Many of Bukchon\'s hanoks have been converted into cafés, craft shops, and museums. Sip traditional tea under a tiled roof with Gyeongbokgung\'s ridges outside your window—a visual experience unique to Seoul.',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        { emoji: '🏃', zh: '必去', zhEn: 'Must visit', desc: '북촌8경（八处美景）/ 경복궁 관람 / 인사동 갤러리', descEn: 'Bukchon 8 Scenic Views / Gyeongbokgung Palace Tour / Insadong Galleries' },
        { emoji: '☕', zh: '必体验', zhEn: 'Must-Experience', desc: '한옥 카페에서 전통차 / 한복 체험（韩服体验）/ 전통 공예 체험', descEn: 'Traditional tea at a hanok café / Hanbok experience / Traditional craft workshop' },
        { emoji: '📸', zh: '最佳拍照点', zhEn: 'Best Photo Spots', desc: '북촌 8경 2경（最有名）/ 경복궁 돌담길 / 새벽 빈 골목', descEn: 'Bukchon View #2 (most famous) / Gyeongbokgung stone wall path / Empty alleys at dawn' },
      ],
    },
    {
      type: 'toriQuote',
      label: '🐰 토리',
      text: '중요한 주의사항：북촌은 실제로 사람들이 사는 주거지예요. 조용히 걷고, 큰 소리로 말하지 말고, 사진 찍을 때 개인 집 안을 찍지 마세요. 관광지이기도 하지만, 먼저 주민의 생활 공간이에요. 이른 아침에 가면 사람도 적고 가장 아름다워요.',
    },
    { type: 'paragraph', heading: '适合', headingEn: 'Best for', text: '역사 문화 좋아하는 사람 · 사진 찍기 좋아하는 사람 · 조용한 여행' },

    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        { emoji: '🌸', ko: '익선동', zh: '益善洞 · 首尔最有味道的小巷', zhEn: 'Ikseon-dong · Seoul\'s most charming alleys', desc: '🌸 레트로 · 감성 · 소확행', tags: ['종로구 · 종로3가역 근처'] },
      ],
    },
    {
      type: 'table',
      head: ['地铁', '氛围', '最佳时间'],
      rows: [['1·3·5号线 종로3가역', '复古 · 小众', '平日下午（人少）']],
    },
    {
      type: 'paragraph',
      text: '익선동是首尔保留最好的1930年代韩屋街区之一，和북촌的贵族气质不同，这里曾经是普通市民居住的地方，老旧韩屋挨着挨着，小巷狭窄弯曲。近年独立设计师和咖啡厅老板们发现了这里，把旧韩屋改造成了各种有意思的空间。', textEn: 'Ikseon-dong is one of Seoul\'s best-preserved 1930s hanok neighborhoods. Unlike Bukchon\'s aristocratic vibe, this was once home to ordinary citizens—old hanoks packed together along narrow, winding alleys. In recent years, independent designers and café owners discovered it, transforming old hanoks into all sorts of intriguing spaces.',
    },
    {
      type: 'paragraph',
      text: '익선동的魅力在于"还没被过度开发"的真实感——比弘大安静，比북촌更有生活气息，更多的是探索的乐趣而不是打卡的仪式。', textEn: 'Ikseon-dong\'s charm lies in its "not yet over-commercialized" authenticity—quieter than Hongdae, more lived-in than Bukchon. It\'s about the joy of exploration, not checking off photo spots.',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        { emoji: '🏃', zh: '必去', zhEn: 'Must visit', desc: '익선다다（多层韩屋咖啡）/ 隐藏在小巷的独立书店 / 빈티지 소품샵', descEn: 'Ikseon Dada (multi-level hanok café) / Hidden indie bookstores in alleys / Vintage goods shops' },
        { emoji: '🍽️', zh: '必吃', zhEn: 'Must-Eat', desc: '종로3가 곱창거리 / 낙지볶음 골목 / 한옥 카페 전통 음료' },
        { emoji: '📸', zh: '必拍', zhEn: 'Must-Photograph', desc: '골목 사이 한옥 지붕 / 카페 내부（风格各异）/ 빈티지 소품 디테일', descEn: 'Hanok rooftops between alleys / Café interiors (each unique) / Vintage item details' },
      ],
    },
    { type: 'paragraph', heading: '适合', headingEn: 'Best for', text: '소확행 여행자 · 사진 감성 · 레트로 좋아하는 사람' },

    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        { emoji: '🌿', ko: '연남동', zh: '延南洞 · 首尔最安静的文艺角落', zhEn: 'Yeonnam-dong · Seoul\'s quietest artsy corner', desc: '🌿 조용 · 감성 · 동네', tags: ['마포구 · 홍대 옆'] },
      ],
    },
    {
      type: 'table',
      head: ['地铁', '氛围', '最佳时间'],
      rows: [['2号线 홍대입구역（步行）', '平静 · 文艺', '午后任何时候']],
    },
    {
      type: 'paragraph',
      text: '연남동就在弘大旁边，但和弘大的喧嚣形成鲜明对比。这里是首尔设计师、插画师、独立音乐人最喜欢居住的街区，小路两侧是独立咖啡厅、精品花店、手工艺品店，以及大量对外开放的艺术家工作室。', textEn: 'Yeonnam-dong sits right next to Hongdae but couldn\'t be more different from its hustle and bustle. It\'s the favorite neighborhood for Seoul\'s designers, illustrators, and indie musicians, with independent cafés, boutique flower shops, craft stores, and artist studios open to the public lining the streets.',
    },
    {
      type: 'paragraph',
      text: '贯穿연남동的연남동 경의선숲길（轻铁林荫道）是废弃铁路改造的绿道，两侧种满树木，是首尔最适合散步的地方之一。春天樱花开，夏天绿荫蔽日，每一个季节来都不一样。', textEn: 'The Gyeongui Line Forest Path running through Yeonnam-dong is a greenway converted from a disused railway, lined with trees—one of Seoul\'s best spots for a stroll. Cherry blossoms in spring, lush shade in summer—every season offers something different.',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        { emoji: '🚶', zh: '必做', zhEn: 'Must-Do', desc: '경의선숲길 산책 / 독립 카페 탐방 / 골목 탐험' },
        { emoji: '☕', zh: '必喝', zhEn: 'Must drink', desc: '동네 작은 카페 / 수제 음료 전문점 / 핸드드립 커피' },
        { emoji: '🌸', zh: '应季推荐', zhEn: 'Seasonal Picks', desc: '봄：벚꽃 산책 / 여름：초록 나무 그늘 / 가을：단풍길 걷기' },
      ],
    },
    {
      type: 'toriQuote',
      label: '🐰 토리',
      text: '연남동은 목적지가 아니라 과정이에요. 어디 가야겠다는 계획 없이, 그냥 걷다가 예쁜 카페 보이면 들어가고, 작은 가게 보이면 구경하는 게 이 동네를 즐기는 방법이에요.',
    },
    { type: 'paragraph', heading: '适合', headingEn: 'Best for', text: '혼자 여행 · 조용한 카페 좋아하는 사람 · 산책' },

    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        { emoji: '🛍️', ko: '명동', zh: '明洞 · 来了首尔就一定会来的地方', zhEn: 'Myeongdong · A must-visit when you come to Seoul', desc: '🛍️ 쇼핑 · 길거리 음식 · 관광', tags: ['중구 · 서울의 중심'] },
      ],
    },
    {
      type: 'table',
      head: ['地铁', '氛围', '最佳时间'],
      rows: [['4号线 명동역', '热闹 · 游客', '下午 → 夜晚']],
    },
    {
      type: 'paragraph',
      text: '명동是首尔最重要的商业街区，也是游客密度最高的地方。아모레퍼시픽、이니스프리、에뛰드、네이처리퍼블릭……韩国所有主要美妆品牌都在명동有旗舰店。傍晚时分，街道两侧的小吃摊全部出动，계란빵、회오리감자、닭꼬치……', textEn: 'Myeongdong is Seoul\'s most important shopping district and the most crowded with tourists. Amorepacific, Innisfree, Etude, Nature Republic... all major Korean beauty brands have flagship stores here. In the evening, street food stalls line both sides, offering egg bread, tornado potatoes, and chicken skewers...',
    },
    {
      type: 'paragraph',
      text: '坦白说，명동因为游客太多，已经有点失去了本地人的生活气息。但作为第一次来首尔的人，명동还是值得来一次——集中购买韩国美妆、吃街头小吃、感受首尔的商业活力，一两个小时就能搞定。', textEn: 'Honestly, Myeongdong has lost some of its local charm due to the crowds. But for first-time visitors, it\'s still worth a trip—you can shop for Korean beauty products, grab street food, and soak in Seoul\'s commercial energy in just an hour or two.',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        { emoji: '🛍️', zh: '必买', zhEn: 'Must buy', desc: '한국 뷰티 브랜드 / 면세점 화장품 / 韩国限定商品', descEn: 'Korean beauty brands / duty-free cosmetics / Korea-exclusive products' },
        { emoji: '🍡', zh: '必吃', zhEn: 'Must-Eat', desc: '계란빵（鸡蛋面包）/ 회오리감자 / 닭꼬치', descEn: 'Egg bread / tornado potatoes / chicken skewers' },
        { emoji: '📍', zh: '必到', zhEn: 'Must-visit', desc: '명동성당（天主教堂）/ 남산타워 가는 길 / 면세점 투어', descEn: 'Myeongdong Cathedral / the way to Namsan Tower / duty-free shop tour' },
      ],
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '토리의 명동 팁',
      text: '명동에서 美妆을 살 때, 먼저 한 매장에서 구경하고 가격을 확인한 후, 다른 매장에서도 비교해보세요. 같은 제품이 매장마다 가격이 다를 수 있어요. 그리고 중국어, 일본어 가능한 직원이 많으니 걱정 없이 들어가도 돼요.', textEn: 'When buying beauty products in Myeongdong, first browse in one store and check prices, then compare in other stores. The same product can vary in price from store to store. Also, many staff speak Chinese and Japanese, so feel free to walk in without worry.',
    },
    { type: 'paragraph', heading: '适合', headingEn: 'Best for', text: '한국 뷰티 쇼핑 · 길거리 음식 · 처음 서울 방문' },

    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        { emoji: '🌍', ko: '이태원', zh: '梨泰院 · 首尔最国际化的街区', zhEn: 'Itaewon · Seoul\'s most international neighborhood', desc: '🌍 다양성 · 이국적 · 활기', tags: ['용산구 · 글로벌 서울'] },
      ],
    },
    {
      type: 'table',
      head: ['地铁', '氛围', '最佳时间'],
      rows: [['6号线 이태원역', '国际 · 多元', '夜晚']],
    },
    {
      type: 'paragraph',
      text: '이태원的国际化基因来自驻韩美军——이태원附近曾有大型美军基地，带来了大量国际文化和饮食。今天이태원是首尔唯一一个可以找到全球各地美食的街区：멕시코 타코（墨西哥塔可）、이탈리아 파스타（意大利面）、중동 음식（中东料理）、한국식 버거（韩式汉堡）……同一条街上可以吃遍全球。', textEn: 'Itaewon\'s international character comes from the U.S. military presence—there was a large base nearby, bringing international culture and cuisine. Today, Itaewon is the only neighborhood in Seoul where you can find food from around the world: Mexican tacos, Italian pasta, Middle Eastern dishes, Korean-style burgers... you can eat your way around the globe on one street.',
    },
    {
      type: 'paragraph',
      text: '이태원也是首尔最开放包容的街区，LGBTQ+友好，外国人聚集，各种奇装异服在这里都不奇怪。해방촌（解放村）和경리단길（경리단길）是이태원旁边两个更有味道的小街区，比主街更有探索乐趣。', textEn: 'Itaewon is also Seoul\'s most open and inclusive neighborhood, LGBTQ+-friendly, with a large foreign population. Unusual outfits are nothing strange here. Haebangchon and Gyeongridan-gil are two smaller, more charming areas next to Itaewon, offering more to explore than the main street.',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        { emoji: '🌍', zh: '必体验', zhEn: 'Must-Experience', desc: '세계 각국 음식 / 이국적인 바（酒吧）/ 해방촌 산책', descEn: 'Food from around the world / exotic bars / a stroll through Haebangchon' },
        { emoji: '🍽️', zh: '必吃', zhEn: 'Must-Eat', desc: '멕시코 타코 / 이탈리안 파스타 / 한국식 수제 버거' },
        { emoji: '🌙', zh: '必去', zhEn: 'Must visit', desc: '경리단길 야경 / 루프탑 바（屋顶酒吧）/ 해방촌 야경', descEn: 'Gyeongridan-gil night view / rooftop bars / Haebangchon night view' },
      ],
    },
    { type: 'paragraph', heading: '适合', headingEn: 'Best for', text: '이국적인 음식 · 야경과 술자리 · 다양한 문화 경험' },

    { type: 'sectionBreak'},

    {
      type: 'phraseList',
      title: '토리 教你说——问路必备韩语', titleEn: 'Tori teaches you—essential Korean for asking directions',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        { ko: '홍대 어떻게 가요?', ro: 'hong-dae eo-tteo-ke ga-yo?', scene: '🗺️ 问怎么去弘大', sceneEn: '🗺️ Asking how to get to Hongdae', zh: '请问怎么去弘大？', zhEn: 'How do I get to Hongdae?' },
        { ko: '여기서 걸어서 얼마나 걸려요?', ro: 'yeo-gi-seo geo-reo-seo eol-ma-na geol-lyeo-yo?', scene: '🚶 问步行距离', sceneEn: '🚶 Asking about walking distance', zh: '从这里走过去要多久？', zhEn: 'How long does it take to walk from here?' },
        { ko: '지하철역이 어디예요?', ro: 'ji-ha-cheol-yeok-i eo-di-ye-yo?', scene: '🚇 找地铁站', sceneEn: '🚇 Finding the subway station', zh: '地铁站在哪里？', zhEn: 'Where is the subway station?' },
        { ko: '이 근처에 좋은 카페 있어요?', ro: 'i geun-cheo-e jo-eun ka-pe i-sseo-yo?', scene: '☕ 找附近咖啡厅', sceneEn: '☕ Finding a nearby café', zh: '附近有好的咖啡厅吗？', zhEn: 'Is there a good café nearby?' },
        { ko: '사진 찍어도 돼요?', ro: 'sa-jin jji-geo-do dwae-yo?', scene: '📸 拍照前确认', sceneEn: '📸 Asking before taking a photo', zh: '可以拍照吗？', zhEn: 'Can I take a photo?' },
        { ko: '맛집 추천해 주세요.', ro: 'mat-jip chu-cheon-hae ju-se-yo', scene: '🍽️ 请当地人推荐', sceneEn: '🍽️ Asking locals for recommendations', zh: '请给我推荐好吃的地方', zhEn: 'Please recommend some good places to eat' },
      ],
    },
    {
      type: 'vocabList',
      title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson',
      items: [
        { ko: '동네', zh: '街区·小区', zhEn: 'Neighborhood · District' },
        { ko: '골목', zh: '小巷·胡同', zhEn: 'Alley · Hutong' },
        { ko: '카페', zh: '咖啡厅', zhEn: 'Café' },
        { ko: '한옥', zh: '韩国传统建筑', zhEn: 'Korean traditional architecture' },
        { ko: '지하철', zh: '地铁', zhEn: 'subway' },
        { ko: '출구', zh: '出口', zhEn: 'exit' },
        { ko: '맛집', zh: '好吃的店', zhEn: 'A good restaurant' },
        { ko: '쇼핑', zh: '购物', zhEn: 'Shopping' },
        { ko: '야경', zh: '夜景', zhEn: 'Night view' },
        { ko: '산책', zh: '散步', zhEn: 'walk' },
        { ko: '사진', zh: '照片', zhEn: 'photo' },
        { ko: '근처', zh: '附近', zhEn: 'nearby' },
      ],
    },
    {
      type: 'ending',
      text: '首尔不是一个地方，是八个世界\n弘大的年轻、성수동的创意、강남的繁华、北村的历史、益善洞的复古、延南洞的宁静、明洞的热闹、梨泰院的国际——每个街区都是不同的首尔，去哪里，取决于今天你想成为哪种人。下一篇，토리 带你搞懂首尔地铁 🚇\n\n🚫 文化禁忌 · 📍 必去25个地方 · 🛍️ 购物完全指南', textEn: 'Seoul isn\'t one place—it\'s eight worlds.\\nHongdae\'s youth, Seongsu-dong\'s creativity, Gangnam\'s glamour, Bukchon\'s history, Ikseon-dong\'s retro charm, Yeonnam-dong\'s calm, Myeongdong\'s buzz, Itaewon\'s international vibe—each neighborhood is a different Seoul. Where you go depends on who you want to be today. Next up, Tori takes you through Seoul\'s subway 🚇\\n\\n🚫 Cultural taboos · 📍 25 must-visit places · 🛍️ Complete shopping guide',
      next: { slug: 'seoul-subway', title: '首尔地铁完全攻略', titleEn: 'The Complete Seoul Subway Guide' },
    },
  ],
},
  {
  slug: 'seoul-subway',
  category: 'travel',
  title: '首尔地铁完全攻略', titleEn: 'The Complete Seoul Subway Guide',
  subtitle: '지하철 — 世界上最复杂的地铁系统之一', subtitleEn: 'Jihacheol — One of the world\'s most complex subway systems',
  emoji: '🚇',
  readMinutes: 10,
  bannerImage: '/images/banners/seoul-subway.webp',
  blocks: [
    {
      type: 'toriQuote',
      label: '토리 说', labelEn: 'Tori says',
      text: '首尔地铁是토리见过的最好用的城市交通系统之一。9条主线、300多个站，几乎覆盖首尔每一个值得去的地方，班次密集、准时、干净，每个站都有中文指示牌。最重要的是——它便宜到令人感动，坐遍整个首尔，一次不超过2,500韩元。掌握了地铁，你就掌握了首尔。今天토리 把所有需要知道的都整理在这里 🚇', textEn: 'Seoul\'s subway is one of the best urban transit systems Tori has ever seen. With 9 main lines and over 300 stations, it covers nearly every place worth visiting in Seoul—frequent, punctual, clean, and with Chinese signs at every station. Best of all—it\'s heartbreakingly cheap. You can ride across all of Seoul for under 2,500 won per trip. Master the subway, and you\'ve mastered Seoul. Today, Tori has put everything you need to know right here 🚇',
    },
    {
      type: 'sectionTitle',
      emoji: '🗺️',
      title: '先了解首尔地铁的基本情况', titleEn: 'First, get the basics of Seoul\'s subway',
      sub: '不需要记住所有线路，只需要知道这些', subEn: 'You don\'t need to memorize every line—just these',
    },
    {
      type: 'paragraph',
      heading: '📊 首尔地铁有多发达', headingEn: '📊 How extensive is Seoul\'s subway',
      text: '首尔地铁共有9条主线 + 多条支线，站点超过300个，日均客运量约700万人次，是全球最繁忙的地铁系统之一。运营时间通常从早上5:30到次日凌晨1:00，周末稍有延长。', textEn: 'Seoul\'s subway has 9 main lines plus several branches, with over 300 stations and about 7 million daily riders—one of the busiest systems in the world. It typically runs from 5:30 AM to 1:00 AM, with slightly extended hours on weekends.',
    },
    {
      type: 'paragraph',
      text: '对游客来说最友好的一点是：站内所有指示牌都有韩英中日四种语言，报站广播也是四语轮播，即使完全不懂韩语，也能在首尔地铁里自由穿行。', textEn: 'The most tourist-friendly part: all station signs are in Korean, English, Chinese, and Japanese, and announcements rotate through all four languages. Even with zero Korean, you can navigate Seoul\'s subway freely.',
    },
    {
      type: 'highlight',
      variant: 'tip',
      text: '토리 说：首尔地铁的票价按距离计算，2025年起起步价1,550韩元（交通卡），跨多个区域最高约2,500韩元。在首尔，地铁是最便宜、最准时、最不堵车的交通方式，强烈推荐全程坐地铁。', textEn: 'Tori says: Seoul subway fares are distance-based. From 2025, the base fare is 1,550 won (with a transit card), maxing out around 2,500 won across multiple zones. In Seoul, the subway is the cheapest, most punctual, and most congestion-free way to get around—Tori strongly recommends taking it everywhere.',
    },
    {
      type: 'sectionTitle',
      emoji: '🚇',
      title: '游客最常用的线路', titleEn: 'The lines tourists use most',
      sub: '不需要记住所有线，这几条就够了', subEn: 'No need to memorize every line—these are enough',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          ko: '1호선 · 1号线（深蓝）',
          desc: '서울역 ↔ 청량리 방면',
          zh: '贯穿首尔南北的老线，서울역（首尔站，KTX高铁）、종로（钟路文化区）、동대문（东大门购物）是重要站点。', zhEn: 'An old line running north-south through Seoul, with key stops at Seoul Station (KTX high-speed rail), Jongno (cultural district), and Dongdaemun (shopping).',
          tip: '✓ 东大门 / 首尔站必经', tipEn: '✓ A must for Dongdaemun / Seoul Station',
        },
        {
          ko: '2호선 · 2号线（绿）',
          desc: '순환선（环形线）', descEn: 'Circular line',
          zh: '首尔最重要的环形线，覆盖홍대입구（弘大）、신촌（新村）、강남（江南）、성수（圣水洞）、건대입구（建大）……几乎所有热门街区都在这条线上。', zhEn: 'Seoul\'s most important circular line, covering Hongdae, Sinchon, Gangnam, Seongsu-dong, Konkuk University... nearly every hot neighborhood is on this line.',
          tip: '✓ 游客必乘，覆盖最广', tipEn: '✓ A must-ride for tourists, widest coverage',
        },
        {
          ko: '3호선 · 3号线（橙）',
          desc: '대화 ↔ 오금',
          zh: '安국역（北村/景福宫）、경복궁역、압구정（狎鸥亭）在这条线上。去北村和景福宫从3号线안국역下。',
          tip: '✓ 북촌·경복궁 필수',
        },
        {
          ko: '4호선 · 4号线（浅蓝）',
          desc: '당고개 ↔ 남태령',
          zh: '명동역（明洞）、동대문역사문화공원（东大门历史文化公园）是主要旅游站点。명동购物从4号线명동역出。', zhEn: 'Myeongdong Station and Dongdaemun History & Culture Park are major tourist stops. For Myeongdong shopping, exit at Myeongdong Station on Line 4.',
          tip: '✓ 明洞必经', tipEn: '✓ Must-visit in Myeongdong',
        },
        {
          ko: '6호선 · 6号线（紫）',
          desc: '응암 ↔ 봉화산',
          zh: '이태원역（梨泰院）在6号线。去梨泰院从6号线이태원역出，步行即到主街。', zhEn: 'Itaewon Station is on Line 6. To get to Itaewon, exit at Itaewon Station on Line 6 and walk to the main street.',
          tip: '✓ 이태원 필수',
        },
        {
          ko: '9호선 · 9号线（金/深黄）',
          desc: '개화 ↔ 언주',
          zh: '仁川机场铁路（AREX）可以直达인천공항（仁川机场），但9号线本身连接김포공항（金浦机场）和강남。有快车（급행）和普通车，快车速度快一倍。', zhEn: 'The Incheon Airport Railroad (AREX) goes directly to Incheon Airport, but Line 9 itself connects Gimpo Airport and Gangnam. There are express trains and regular trains—express trains are twice as fast.',
          tip: '✓ 금포공항 이동시',
        },
        {
          ko: '공항철도 AREX（机场铁路）',
          desc: '인천공항 ↔ 서울역',
          zh: '仁川机场到首尔站的专用铁路。直达列车（직통）约43分钟（T1）/ 51分钟（T2），普通列车约60分钟。票价约4,150-9,500韩元不等。到首尔后与地铁网络无缝换乘。', zhEn: 'A dedicated railway from Incheon Airport to Seoul Station. The direct train takes about 43 minutes (T1) / 51 minutes (T2), and the regular train about 60 minutes. Fares range from about 4,150 to 9,500 won. Seamless transfers to the subway network once you reach Seoul.',
          tip: '✓ 从机场入市区必乘', tipEn: '✓ Must-ride from the airport to the city',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '💳',
      title: 'T-Money 교통카드——首尔出行的通行证', titleEn: 'T-Money Card — Your Pass to Getting Around Seoul',
      sub: '买一张，坐遍首尔', subEn: 'Buy one, ride all over Seoul',
    },
    {
      type: 'paragraph',
      heading: 'T-Money 교통카드',
      text: '首尔公共交通通用的预付费交通卡', textEn: 'A prepaid transit card for all of Seoul\'s public transportation',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          zh: '在哪里买', zhEn: 'Where to buy',
          desc: '편의점（便利店）：GS25、CU、7-Eleven / 지하철역 내 자동판매기（地铁站自动售货机）', descEn: 'Convenience stores: GS25, CU, 7-Eleven / Vending machines inside subway stations',
        },
        {
          zh: '卡价格', zhEn: 'Card price',
          desc: '卡本身约 2,500원 / 需要另外充值才能使用', descEn: 'The card itself costs about 2,500 won / You need to load money onto it to use it',
        },
        {
          zh: '怎么充值', zhEn: 'How to top up',
          desc: '편의점 계산대（便利店收银台） / 지하철역 충전기（地铁站充值机） / 最少充值 1,000원', descEn: 'Convenience store checkout counters / Subway station top-up machines / Minimum load is 1,000 won',
        },
        {
          zh: '优惠', zhEn: 'Discount',
          desc: '比单次票便宜约100-200원 / 公交地铁换乘有折扣 / 还能在편의점 购物', descEn: 'About 100-200 won cheaper than single-ride tickets / Discounts on bus-subway transfers / Can also use it at convenience stores',
        },
        {
          zh: '退款', zhEn: 'refund',
          desc: '离开前在편의점 办理退款 / 余额全额退还（卡费不退）', descEn: 'Get a refund at a convenience store before you leave / Full refund of the balance (card fee is non-refundable)',
        },
        {
          zh: '카카오페이 / 네이버페이',
          desc: '手机也可以绑定T-Money功能 / iPhone用户建议买实体卡', descEn: 'You can also link T-Money to your phone / iPhone users are advised to buy a physical card',
        },
      ],
    },
    {
      type: 'toriQuote',
      text: '토리 강력 추천：到首尔的第一件事，去机场出口处或便利店买一张T-Money卡，充值10,000원（约50元人民币），够坐好几天地铁。卡面设计有很多种，选一个喜欢的颜色，也算是首尔的纪念品。', textEn: 'Tori\'s top tip: The first thing to do when you arrive in Seoul is grab a T-Money card at the airport exit or a convenience store. Load 10,000 won (about 50 RMB) and it\'ll cover several days of subway rides. There are many card designs—pick a color you like, and it doubles as a Seoul souvenir.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🎫',
      title: '从进站到出站——完整乘车流程', titleEn: 'From entering to exiting—the complete ride process',
      sub: '第一次坐首尔地铁，照着这个步骤走', subEn: 'Riding the Seoul subway for the first time? Follow these steps.',
    },
    {
      type: 'steps',
      steps: [
        {
          label: '查好目的地站名和线路', labelEn: 'Check your destination station name and line.',
          desc: '用네이버지도（Naver Map）或카카오맵（Kakao Map）输入目的地，选择地铁路线。这两款App都有中文/英文界面，比Google Maps更准确。出发前截图保存路线，防止没网。', descEn: 'Enter your destination in Naver Map or Kakao Map and select the subway route. Both apps have Chinese/English interfaces and are more accurate than Google Maps. Screenshot the route before you leave in case you lose signal.',
        },
        {
          label: '找到正确出口进站', labelEn: 'Find the right exit to enter the station.',
          desc: '首尔地铁每个站有多个출구（出口），出口号码很重要。地图会告诉你从几号出口出更近。进站前确认好出口号，出站时直接找对应的号码。', descEn: 'Every Seoul subway station has multiple exits (출구), and the exit number matters. The map will tell you which exit is closest. Confirm the exit number before entering, then just look for it when you leave.',
          ko: '몇 번 출구예요?',
          zh: '几号出口？', zhEn: 'Which exit?',
        },
        {
          label: '刷T-Money卡进闸机', labelEn: 'Tap your T-Money card at the gate.',
          desc: '把T-Money卡贴近黄色感应区，听到"띠링"声进入。余额不足会被拒绝，进站前确认余额够用。进站时系统会扣除起步费。', descEn: 'Hold your T-Money card against the yellow sensor until you hear a "beep." If your balance is too low, you\'ll be denied, so check it before entering. The base fare is deducted when you tap in.',
        },
        {
          label: '找到正确的方向站台', labelEn: 'Find the correct platform direction.',
          desc: '站台通常分两个方向，看指示牌上的终点站名字。比如坐2号线去홍대，看你在时钟哪边——顺时针还是逆时针更近，选方向站台。站台上有路线图，对照目的地确认。', descEn: 'Platforms usually serve two directions—check the terminal station name on the signs. For example, to get to Hongdae on Line 2, see which side of the clock you\'re on—clockwise or counterclockwise—and pick that platform. There\'s a route map on the platform to double-check your destination.',
        },
        {
          label: '等车、上车、找座位', labelEn: 'Wait, board, and find a seat.',
          desc: '黄线后面等车，地上有排队标志，先下后上。进车厢后，노약자석（老弱病残孕专座，通常是蓝色或深色）不要坐，即使车厢里没有老人，这是明确的社会规范。', descEn: 'Wait behind the yellow line, follow the queue markers on the floor, and let people off before boarding. Once inside, don\'t sit in the priority seats (노약자석, usually blue or dark)—even if no elderly are present, it\'s a clear social rule.',
        },
        {
          label: '到站出闸', labelEn: 'Get off and exit the gate.',
          desc: '报站广播是韩英中日四语，听到目标站名时准备下车。出站时再刷一次T-Money卡，系统根据距离扣费。确认出口号码，从对应出口出去。', descEn: 'Announcements are in Korean, English, Chinese, and Japanese—get ready when you hear your stop. Tap your T-Money card again when exiting; the fare is calculated by distance. Confirm your exit number and head out that way.',
          ko: '다음 역은 홍대입구역입니다',
          zh: '下一站是弘大入口站', zhEn: 'Next stop: Hongik University Station.',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🔄',
      title: '游客最常用的路线', titleEn: 'Most popular routes for tourists.',
      sub: '从机场到各大热门区域怎么坐', subEn: 'How to get from the airport to major hotspots.',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          ko: '✈️ 인천공항 → 명동',
          desc: 'AREX坐到서울역，换1号线到시청역，再换4号선到명동역', descEn: 'Take AREX to Seoul Station, transfer to Line 1 to City Hall Station, then Line 4 to Myeongdong Station.',
          price: '约 70분 · 약 4,500원', priceEn: 'About 70 min · approx. 4,500 won.',
          tags: ['인천공항 출발'],
        },
        {
          ko: '✈️ 인천공항 → 홍대',
          desc: 'AREX直达홍대입구역（공항철도 직통으로 환승 없이）', descEn: 'AREX direct to Hongik University Station (no transfers on the airport railroad).',
          price: '약 53분 · 약 9,000원',
          tags: ['인천공항 출발'],
        },
        {
          ko: '명동역 → 안국역',
          desc: '4号线명동역 → 혜화역 → 换3号线 → 안국역 출口 1번',
          price: '약 15분 · 기본요금',
          tags: ['명동 → 北村'],
        },
        {
          ko: '홍대입구 → 강남역',
          desc: '2号线直达，无需换乘，同一条线顺时针坐到강남역', descEn: 'Line 2 direct, no transfers—stay on the same line clockwise to Gangnam Station.',
          price: '약 30분 · 기본요금',
          tags: ['홍대 → 강남'],
        },
        {
          ko: '강남역 → 성수역',
          desc: '2号线直达，逆时针坐到성수역，步行即到성수동', descEn: 'Line 2 direct, counterclockwise to Seongsu Station, then walk to Seongsu-dong.',
          price: '약 20분 · 기본요금',
          tags: ['강남 → 성수동'],
        },
        {
          ko: '명동역 → 이태원역',
          desc: '4号线到삼각지역，换6号线到이태원역', descEn: 'Line 4 to Samsakji Station, transfer to Line 6 to Itaewon Station.',
          price: '약 15분 · 기본요금',
          tags: ['명동 → 이태원'],
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🙏',
      title: '首尔地铁礼仪——这些细节韩国人都在看', titleEn: 'Seoul subway etiquette—these details Koreans are watching.',
      sub: '做到这些，你就是有素质的旅行者', subEn: 'Do these and you\'re a respectful traveler',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          emoji: '🪑',
          ko: '노약자석 절대 앉지 마세요',
          desc: '老弱病残孕专座（通常是蓝/深色）绝对不坐。即使车厢空无一人，也不坐。这是韩国地铁最基本的社会规范，违反会引来白眼。', descEn: 'Never sit in the priority seats for the elderly, disabled, pregnant women, etc. (usually blue or dark-colored). Even if the car is empty, don\'t sit there. It\'s the most basic social norm on Korean subways—violating it will get you dirty looks.',
        },
        {
          emoji: '🔇',
          ko: '통화는 작은 목소리로',
          desc: '打电话要小声，不要大声讲话。韩国地铁里非常安静，大声说话会非常显眼。如果必须接电话，捂着嘴小声说话是礼仪。', descEn: 'Keep phone calls quiet—no loud talking. Korean subways are very quiet, and loud voices stand out. If you must take a call, covering your mouth and speaking softly is the polite way.',
        },
        {
          emoji: '🎧',
          ko: '이어폰 필수',
          desc: '听音乐或看视频必须戴耳机，外放是非常不礼貌的行为，会引来明显的不满。韩国地铁里几乎所有人都戴着耳机。', descEn: 'You must wear earphones for music or videos. Playing audio out loud is very rude and will draw obvious disapproval. Almost everyone on Korean subways wears earphones.',
        },
        {
          emoji: '🚶',
          ko: '에스컬레이터 오른쪽 서기',
          desc: '站自动扶梯靠右站，左侧留给赶路的人。这是首尔地铁的不成文规定，站错边会被人侧目。', descEn: 'Stand on the right side of escalators, leaving the left for people in a hurry. It\'s an unwritten rule on Seoul\'s subway—stand on the wrong side and you\'ll get sideways glances.',
        },
        {
          emoji: '🍔',
          ko: '음식 섭취 금지',
          desc: '车厢内禁止饮食。饮料通常也不建议在车内喝，特别是有气味的食物绝对不能带进车厢。出站后再吃。', descEn: 'No eating or drinking in the cars. Drinks are generally discouraged too, and strongly scented food is absolutely off-limits. Eat after you exit the station.',
        },
        {
          emoji: '📱',
          ko: '충전 콘센트 사용 가능',
          desc: '首尔地铁很多座位旁边有USB充电口，可以免费给手机充电。这是真的，不是陷阱——韩国地铁的服务真的很好。', descEn: 'Many seats on Seoul\'s subway have USB charging ports for free phone charging. It\'s real, not a trap—Korean subway service is genuinely great.',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '📱',
      title: '必装App——让地铁之旅更顺畅', titleEn: 'Must-have apps—for a smoother subway trip',
      sub: '这两个App比任何攻略都管用', subEn: 'These two apps beat any guidebook',
    },
    {
      type: 'paragraph',
      heading: '🗺️ 네이버지도 (Naver Map) — 首选', headingEn: '🗺️ Naver Map — top pick',
      text: '韩国本地最准确的地图App，支持中文界面。输入目的地，自动规划最优地铁路线，显示换乘站、所需时间、票价。比Google Maps对韩国地铁的覆盖更完整，特别是换乘路线的规划更准确。', textEn: 'Korea\'s most accurate map app, with Chinese interface support. Enter a destination and it automatically plans the best subway route, showing transfer stations, travel time, and fare. Its subway coverage beats Google Maps, especially for transfer route planning.',
    },
    {
      type: 'paragraph',
      text: '使用方法：可以输入中文地名（如"弘大"），也可以输入韩文站名。路线结果会显示几号线、在哪里换乘、从哪个出口出。旅行前建议下载离线地图。', textEn: 'How to use: You can enter Chinese place names (like "Hongdae") or Korean station names. Results show which line, where to transfer, and which exit to take. Download offline maps before your trip.',
    },
    {
      type: 'paragraph',
      heading: '🗺️ 카카오맵 (Kakao Map) — 备用', headingEn: '🗺️ Kakao Map — backup',
      text: '另一款韩国主流地图App，和Naver Map功能相似。优势是和카카오택시（叫出租车）整合，如果地铁不方便，直接在同一个App里叫택시很方便。两款都装，相互备用。', textEn: 'Another major Korean map app, similar to Naver Map. Its edge is integration with Kakao Taxi—if the subway isn\'t convenient, you can hail a taxi right in the same app. Install both as backups for each other.',
    },
    {
      type: 'toriQuote',
      text: '토리 팁：坐地铁时把目的地站名截图存好，没有网络也能看。另外，韩国地铁站内WiFi是免费的，连接"Metro WiFi"，在站台等车时可以刷地图不消耗流量。', textEn: 'Tori tip: Screenshot your destination station name before riding the subway so you can check it without data. Also, WiFi is free inside Korean subway stations—connect to "Metro WiFi" and browse maps on the platform without using data.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🌿',
      title: '기후동행카드 — 首尔无限次交通卡（2024年新推出）', titleEn: 'Climate Companion Card — Seoul\'s unlimited transit card (new in 2024)',
      sub: '留学生和长住者的通勤利器，一个月 62,000 韩元无限坐', subEn: 'A commuter gem for students and long-term residents—unlimited rides for 62,000 won a month',
    },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          zh: '什么是 기후동행카드（气候同行卡）', zhEn: 'What is the Climate Companion Card?',
          desc: '首尔市 2024 年 7 月正式推出的综合交通月票/短期票。一次充值后，在有效期内无限次乘坐首尔地铁（1~9 号线）、市内公交车（含深夜巴士和社区小巴）。名称"气候同行"源于鼓励大众运输以减碳的环保理念。不含新盆唐线、仁川/京畿道地铁区段、广域巴士（红色巴士）、AREX 直达列车。', descEn: 'A comprehensive transit pass launched by Seoul in July 2024, available as monthly or short-term tickets. Once loaded, it offers unlimited rides on Seoul\'s subway (Lines 1–9), city buses (including night buses and community shuttles) within the validity period. The name "Climate Companion" reflects the eco-friendly idea of encouraging public transit to cut carbon. Not valid on the Shinbundang Line, Incheon/Gyeonggi subway sections, express buses (red buses), or the AREX express train.',
          tip: '仁川机场→首尔站：AREX 直达列车不能用，普通列车可以', tipEn: 'Incheon Airport→Seoul Station: AREX express train not covered, but the regular train is',
        },
        {
          zh: '价格方案', zhEn: 'Pricing plans',
          desc: '30 日月票：62,000 韩元（地铁+巴士），加 따릉이 共享单车为 65,000 韩元。19-39 岁青年优惠价分别为 55,000 韩元和 58,000 韩元。短期票：1 日 5,000 韩元、2 日 8,000 韩元、3 日 10,000 韩元、5 日 15,000 韩元、7 日 20,000 韩元。每天坐地铁往返 2 次 + 公交往返 1 次，30 日月票比单次买省约 40%。', descEn: '30-day monthly pass: 62,000 won (subway + bus), or 65,000 won with Ttareungyi bike-sharing. Youth discount (ages 19–39): 55,000 won and 58,000 won respectively. Short-term passes: 1-day 5,000 won, 2-day 8,000 won, 3-day 10,000 won, 5-day 15,000 won, 7-day 20,000 won. If you take the subway round-trip twice and bus round-trip once daily, the 30-day pass saves about 40% versus single fares.',
          tip: '短期券不含共享单车，充值后即刻生效（无法指定开始日期）', tipEn: 'Short-term passes don\'t include bike-sharing and activate immediately upon loading (no start date selection).',
        },
        {
          zh: '怎么买和怎么用', zhEn: 'How to buy and use it',
          desc: '在地铁站内的 GS25/CU/7-Eleven 便利店花 3,000 韩元买一张空卡（实体卡），然后去站内充值机选方案充值。手机用户可在 Mobile Tmoney App 申请电子卡。使用时上下车都刷卡（和 Tmoney 一样），30 日月票可在充值后 5 天内指定开始日期。注意：便利店只卖空卡不提供充值，充值必须用站内机器（建议备现金，充值机的外国卡功能不稳定）。', descEn: 'Buy a blank card (physical) for 3,000 won at GS25/CU/7-Eleven inside subway stations, then load a plan at an in-station top-up machine. Mobile users can apply for an e-card in the Mobile Tmoney app. Tap the card when boarding and alighting (same as Tmoney). The 30-day pass lets you pick a start date within 5 days of loading. Note: convenience stores only sell blank cards, not top-ups—you must use the station machines (bring cash; foreign card support on the machines is unreliable).',
          tip: '跨出首尔范围时需补缴全段费用', tipEn: 'You\'ll need to pay the full fare if you travel beyond Seoul\'s boundaries',
        },
      ],
    },
    {
      type: 'sectionTitle',
      emoji: '🔍',
      title: '首尔地铁冷知识', titleEn: 'Seoul Subway Fun Facts',
      sub: '知道了会对这座城市多一分了解', subEn: 'Knowing these will give you a deeper understanding of the city',
    },
    {
      type: 'trivia',
      items: [
        {
          tag: '역사',
          q: '首尔地铁是什么时候开通的？', qEn: 'When did the Seoul subway first open?',
          a: '首尔地铁1号线于1974年8月15日开通，距今已超过50年。选择8月15日这天是有意义的——那天是韩国광복절（光复节），独立纪念日。第一条线路只有9个站，现在已经发展成覆盖全首尔的庞大网络。', aEn: 'Seoul Subway Line 1 opened on August 15, 1974—over 50 years ago. The date was chosen deliberately: it\'s Korea\'s 광복절 (Liberation Day), its independence day. The first line had only 9 stations, but it\'s since grown into a massive network covering all of Seoul.',
        },
        {
          tag: '설계',
          q: '为什么首尔地铁站那么深？', qEn: 'Why are Seoul subway stations so deep?',
          a: '首尔地铁建设时正值冷战时期，地铁站设计有防空洞功能，建造得很深，有的站台距地面超过30米。这个设计至今仍在——很多首尔地铁站的自动扶梯特别长，就是历史遗留。', aEn: 'The subway was built during the Cold War, so stations were designed to double as bomb shelters and built very deep—some platforms sit over 30 meters underground. That design is still there today, which is why many stations have unusually long escalators. It\'s a relic of history.',
        },
        {
          tag: '문화',
          q: '首尔地铁里为什么那么多人看手机？', qEn: 'Why is everyone on the Seoul subway staring at their phone?',
          a: '韩国地铁全程有LTE/5G信号，不会因为进入隧道就断网（这在很多国家是奢侈的）。韩国人对手机依赖度极高，地铁里每个人都在刷手机是真实现象。네이버웹툰（漫画）和유튜브（YouTube）是最常见的活动。', aEn: 'The subway has full LTE/5G coverage, so you never lose signal in tunnels (a luxury in many countries). Koreans are extremely phone-dependent, and everyone scrolling on the subway is a real sight. 네이버웹툰 (webtoons) and 유튜브 (YouTube) are the most common activities.',
        },
        {
          tag: '서비스',
          q: '首尔地铁里有哪些意想不到的服务？', qEn: 'What unexpected services does the Seoul subway offer?',
          a: '座位旁的USB充电口、站内免费WiFi、清洁到可以吃饭的地板、全程冷气（夏天可能会冷）、전동 휠체어（电动轮椅）无障碍通道完备……首尔地铁的服务细节让很多第一次来的外国人印象深刻。', aEn: 'USB charging ports by the seats, free WiFi in stations, floors clean enough to eat off, full air conditioning (it can get cold in summer), and complete wheelchair accessibility with 전동 휠체어 (electric wheelchairs)... The subway\'s attention to detail impresses many first-time foreign visitors.',
        },
      ],
    },
    {
      type: 'highlight',
      variant: 'warning',
      title: '⚠️ 坐地铁之前要知道', titleEn: '⚠️ What to know before riding the subway',
      text: '首尔地铁最后一班车通常在凌晨1:00前后，具体时间因线路和站点而异。深夜如果赶不上最后一班地铁，需要叫택시（出租车）或카카오택시，费用会贵很多。出行前用Naver Map查好末班车时间，避免在陌生地方叫深夜出租车的麻烦。', textEn: 'The last train usually runs around 1:00 AM, though times vary by line and station. If you miss it late at night, you\'ll need to hail a 택시 (taxi) or use 카카오택시, which costs a lot more. Check the last train time on Naver Map before heading out to avoid the hassle of calling a late-night cab in an unfamiliar area.',
    },
    {
      type: 'phraseList',
      title: '토리 教你说——地铁必备韩语', titleEn: '토리 teaches you—essential subway Korean',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        {
          ko: '홍대입구역 가는 전철 어디서 타요?',
          ro: 'hong-dae-ip-gu-yeok ga-neun jeon-cheol eo-di-seo ta-yo?',
          scene: '🚇 问在哪里乘地铁', sceneEn: '🚇 Asking where to catch the subway',
          zh: '去弘大入口站的地铁在哪里坐？', zhEn: 'Where do I catch the subway to Hongik University Station?',
        },
        {
          ko: 'T-Money 충전해 주세요.',
          ro: 'T-Money chung-jeon-hae ju-se-yo',
          scene: '💳 便利店充T-Money', sceneEn: '💳 Charging T-Money at a convenience store',
          zh: '请帮我充T-Money卡', zhEn: 'Please charge my T-Money card',
        },
        {
          ko: '이 역에서 몇 번 출구로 나가야 해요?',
          ro: 'i yeok-e-seo myeot beon chul-gu-ro na-ga-ya hae-yo?',
          scene: '🚪 问出哪个出口', sceneEn: '🚪 Asking which exit to take',
          zh: '这一站要从几号出口出去？', zhEn: 'Which exit should I take at this station?',
        },
        {
          ko: '환승역이 어디예요?',
          ro: 'hwan-seung-yeok-i eo-di-ye-yo?',
          scene: '🔄 找换乘站', sceneEn: '🔄 Finding the transfer station',
          zh: '换乘站在哪里？', zhEn: 'Where is the transfer station?',
        },
        {
          ko: '이 열차 강남역 가요?',
          ro: 'i yeol-cha gang-nam-yeok ga-yo?',
          scene: '🚄 确认列车方向', sceneEn: '🚄 Confirming the train direction',
          zh: '这列车去江南站吗？', zhEn: 'Does this train go to Gangnam Station?',
        },
        {
          ko: '다음 역이 어디예요?',
          ro: 'da-eum yeok-i eo-di-ye-yo?',
          scene: '❓ 问下一站', sceneEn: '❓ Asking about the next stop',
          zh: '下一站是哪里？', zhEn: 'What\'s the next stop?',
        },
      ],
    },
    {
      type: 'sectionTitle',
      emoji: '📖',
      title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson',
    },
    {
      type: 'vocabList',
      items: [
        { ko: '지하철', zh: '地铁', zhEn: 'subway' },
        { ko: '역', zh: '站', zhEn: 'station' },
        { ko: '출구', zh: '出口', zhEn: 'exit' },
        { ko: '환승', zh: '换乘', zhEn: 'transfer' },
        { ko: '교통카드', zh: '交通卡', zhEn: 'transit card' },
        { ko: '충전', zh: '充值', zhEn: 'recharge' },
        { ko: '노약자석', zh: '老弱专座', zhEn: 'Priority seating for the elderly and disabled' },
        { ko: '에스컬레이터', zh: '自动扶梯', zhEn: 'Escalator' },
        { ko: '급행', zh: '快车', zhEn: 'Express train' },
        { ko: '막차', zh: '末班车', zhEn: 'last train' },
        { ko: '기본요금', zh: '基本票价', zhEn: 'Base fare' },
        { ko: '공항철도', zh: '机场铁路', zhEn: 'Airport Railroad' },
      ],
    },
    {
      type: 'ending',
      text: '地铁是首尔最民主的交通工具\n财阀和普通人坐同一趟地铁，学生和上班族在同一个站台等待，外国人和首尔人用同一张T-Money卡进站。这座城市的公平感，在地铁里体现得最真实。下一篇，토리 带你了解去韩国之前必须知道的文化禁忌 🚫', textEn: 'The subway is Seoul\'s most democratic mode of transport\\nChaebols and ordinary people ride the same train, students and office workers wait on the same platform, and foreigners and Seoulites tap in with the same T-Money card. The city\'s sense of fairness is most real on the subway. Next up, 토리 takes you through the cultural taboos you must know before going to Korea 🚫',
    },
  ],
},
  {
  slug: 'seoul-25-places',
  category: 'travel',
  title: '首尔必去25个地方', titleEn: '25 Must-Visit Places in Seoul',
  subtitle: '서울 명소 — 本地人推荐的清单', subtitleEn: 'Seoul Attractions — A Local\'s Recommended List',
  emoji: '📍',
  readMinutes: 10,
  bannerImage: '/images/banners/seoul-25-places.webp',
  blocks: [
    {
      type: 'intro',
      text: '网上的首尔旅游攻略基本上都是同一份——N首尔塔、明洞购物、景福宫、弘大打卡，然后回国。토리 去过首尔很多次，这25个地方都是토리 认为"值得花时间"的，不只因为好看，而是因为去了之后你会真正理解首尔这座城市。按街区整理，可以当作行程参考——同一区域的地方排在一起，减少奔波 📍', textEn: 'Most online Seoul travel guides are basically the same — N Seoul Tower, Myeongdong shopping, Gyeongbokgung, Hongdae photo ops, then back home. 토리 has been to Seoul many times, and these 25 places are ones 토리 thinks are "worth your time" — not just because they\'re pretty, but because after visiting them, you\'ll truly understand Seoul. Organized by neighborhood, so you can use it as an itinerary — spots in the same area are grouped together to minimize running around 📍'
    },
    {
      type: 'sectionTitle',
      emoji: '🏯',
      title: '종로구 · 중구 — 历史的首尔', titleEn: 'Jongno-gu · Jung-gu — Historic Seoul',
      sub: '景福宫 / 北村 / 益善洞 / 明洞 / 广藏市场', subEn: 'Gyeongbokgung / Bukchon / Ikseon-dong / Myeongdong / Gwangjang Market'
    },
    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        {
          ko: '경복궁 景福宮',
          zh: '景福宫 · 朝鲜王朝的正宫', zhEn: 'Gyeongbokgung · Main Palace of the Joseon Dynasty',
          desc: '朝鲜王朝（1392-1897）最重要的宫殿，占地约43万平方米（文化遗产厅官方登记面积432,703㎡）。宫内有근정전（勤政殿）、경회루（庆会楼）等标志建筑。穿한복免费入场，守卫交接仪式每天有固定场次，值得等待。宫内的国立民俗博物馆免费参观。', descEn: 'The most important palace of the Joseon Dynasty (1392-1897), covering about 430,000 square meters (officially registered as 432,703㎡ by the Cultural Heritage Administration). Inside are iconic structures like Geunjeongjeon (Throne Hall) and Gyeonghoeru (Pavilion). Free entry if you wear a hanbok, and the guard-changing ceremony has set times daily — worth waiting for. The National Folk Museum inside is free to visit.',
          tags: ['무료（한복）', '3号线 경복궁역', '역사'],
          tip: '한복 입고 가면 무료! 근처 한복 대여점에서 빌려 입고 가세요. 아침 일찍 가면 사람도 적고 사진도 예쁘게 찍혀요.'
        },
        {
          ko: '북촌 한옥마을',
          zh: '北村韩屋村 · 600年前的贵族街区', zhEn: 'Bukchon Hanok Village · An Aristocratic Neighborhood from 600 Years Ago',
          desc: '景福宫和昌德宫之间保存最完整的韩屋聚居区，沿石板小巷行走，瓦片屋顶绵延无尽。北村8景（8경）是拍照最佳机位，第2景视角最有名。这里是真实居民区，请保持安静。', descEn: 'The best-preserved hanok neighborhood between Gyeongbokgung and Changdeokgung. Walk along the stone alleys with endless tiled rooftops. The Bukchon 8 Scenic Views (8경) are the best photo spots, with View 2 being the most famous. This is a real residential area, so please keep quiet.',
          tags: ['무료', '3号线 안국역 2번출구', '사진'],
          tip: '아침 9시 전에 가면 사람이 거의 없어요. 주말 낮에는 사람이 너무 많아서 사진 찍기 힘들 수 있어요.'
        },
        {
          ko: '창덕궁 昌德宮',
          zh: '昌德宫 · UNESCO世界遗产', zhEn: 'Changdeokgung · UNESCO World Heritage Site',
          desc: '1997年被列入UNESCO世界文化遗产，是朝鲜时代保存最完好的宫殿之一。宫后的후원（秘苑/御苑）是韩国皇室的私人庭园，需要预约参观，值得专程为此来。秋天红叶季是一年中最美的时候。', descEn: 'Listed as a UNESCO World Heritage Site in 1997, it\'s one of the best-preserved palaces from the Joseon era. The Huwon (Secret Garden) behind the palace was the royal family\'s private garden — it requires a reservation to visit and is worth coming for on its own. Autumn foliage season is the most beautiful time of year.',
          tags: ['입장료 있음', '3号线 안국역', '유네스코'],
          tip: '후원（秘苑）은 별도 예약이 필요해요. 공식 홈페이지에서 미리 예약하세요. 가을 단풍 시즌이 가장 아름다워요.', tipEn: 'The Secret Garden (Huwon) requires a separate reservation. Book in advance on the official website. Autumn foliage season is the most beautiful time.'
        },
        {
          ko: '익선동',
          zh: '益善洞 · 首尔最有味道的小巷', zhEn: 'Ikseon-dong · Seoul\'s most charming alleys',
          desc: '1930年代韩屋改造的文艺街区，独立咖啡厅、复古小店密集。和北村的贵族感不同，这里更有生活气息和探索乐趣。익선다다（多层韩屋咖啡）是必去的标志性空间。旁边的종로3가 곱창거리（羊肠巷）也值得一探。', descEn: 'An artsy neighborhood of 1930s hanoks converted into indie cafés and vintage shops. Unlike Bukchon\'s aristocratic feel, this place has more everyday charm and a sense of discovery. Ikseondada (a multi-level hanok café) is a must-visit landmark. The nearby Jongno 3-ga Gopchang Alley is also worth exploring.',
          tags: ['무료 입장', '1·3·5号线 종로3가역', '카페·레트로'],
          tip: '평일 오후에 가면 여유롭게 즐길 수 있어요. 주말에는 줄 서는 카페가 많아요.'
        },
        {
          ko: '광장시장',
          zh: '广藏市场 · 首尔最古老的室内市场', zhEn: 'Gwangjang Market · Seoul\'s oldest indoor market',
          desc: '1905年开业，首尔历史最悠久的传统市场。마약김밥（迷你紫菜卷）、빈대떡（绿豆煎饼）、육회비빔밥（生牛肉拌饭）是招牌。曾被Netflix美食节目《街头美食斗士》专题报道。白天卖食材，傍晚后街头小吃最热闹。', descEn: 'Opened in 1905, it\'s Seoul\'s oldest traditional market. Signature items include mayak gimbap (mini seaweed rice rolls), bindaetteok (mung bean pancakes), and yukhoe bibimbap (raw beef rice bowl). It was featured on the Netflix food show Street Food. It sells ingredients during the day, but street food stalls get liveliest after sunset.',
          tags: ['무료 입장', '1号线 종로5가역', '길거리 음식'],
          tip: '마약김밥은 꼭 드세요! 芥末酱油蘸着吃，一口一个，진짜 中毒性 있어요.', tipEn: 'You must try the mayak gimbap! Dip it in soy sauce with wasabi, pop them one by one — it\'s seriously addictive.'
        },
        {
          ko: '인사동',
          zh: '仁寺洞 · 传统工艺与现代文化的交汇', zhEn: 'Insadong · Where Traditional Crafts Meet Modern Culture',
          desc: '传统工艺品、书画、陶瓷、手工艺品聚集的文化街道。쌈지길（Ssamziegil）是其中最有设计感的综合文化空间，围绕天井的螺旋式走廊布满独立小店和咖啡厅。买韩国传统手工礼物的最佳地点。', descEn: 'A cultural street lined with traditional crafts, paintings, ceramics, and handmade goods. Ssamziegil is the most design-forward complex here, with a spiral corridor around a courtyard filled with indie shops and cafés. The best place to buy traditional Korean handmade gifts.',
          tags: ['무료', '3号线 안국역 6번출구', '전통·쇼핑'],
          tip: '쌈지길 안의 작은 가게들이 정말 예뻐요. 전통 과자와 먹거리도 다양하게 있어요.'
        },
        {
          ko: '명동',
          zh: '明洞 · 一站式购物与街头小吃', zhEn: 'Myeongdong · One-Stop Shopping & Street Food',
          desc: '首尔最重要的商业街区，韩国所有主要美妆品牌旗舰店集中于此。傍晚后街头小吃摊全部出动——계란빵、회오리감자、닭꼬치……명동성당（天主教堂）是街区内的历史建筑，值得进去看一看。', descEn: 'Seoul\'s most important shopping district, home to flagship stores of all major Korean beauty brands. After sunset, street food stalls come out in full force—egg bread, tornado potatoes, chicken skewers... Myeongdong Cathedral is a historic landmark in the area worth stepping inside.',
          tags: ['무료', '4号线 명동역', '쇼핑·음식'],
          tip: '뷰티 쇼핑은 명동에서 한 번에 해결할 수 있어요. 같은 제품도 매장마다 가격이 달라서 비교하고 사세요.'
        }
      ]
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🎨',
      title: '마포구 — 年轻的首尔', titleEn: 'Mapo-gu — Young Seoul',
      sub: '弘大 / 延南洞 / 합정 / 望遠洞', subEn: 'Hongdae / Yeonnam-dong / Hapjeong / Mangwon-dong'
    },
    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        {
          ko: '홍대 걷고 싶은 거리',
          zh: '弘大·想走走的街道', zhEn: 'Hongdae · Streets Made for Strolling',
          desc: '首尔最有活力的步行街，独立音乐人、街头艺术家、潮流品牌聚集。傍晚后街头表演开始，酒吧和클럽营业到深夜。频道店（아이돌 굿즈 샵）、빈티지샵（古着店）、独立设计品牌密集分布。', descEn: 'Seoul\'s most vibrant pedestrian street, where indie musicians, street artists, and trendy brands gather. Street performances kick off after sunset, and bars and clubs stay open late. Idol merch shops, vintage stores, and independent design brands are packed in here.',
          tags: ['무료', '2号线 홍대입구역 9번출구', '야간·쇼핑'],
          tip: '저녁 6시 이후에 가면 거리가 살아나요. 주말 밤은 서울에서 가장 활기찬 거리 중 하나예요.'
        },
        {
          ko: '연남동 경의선숲길',
          zh: '延南洞·轻铁林荫道', zhEn: 'Yeonnam-dong · The Light Rail Tree-Lined Path',
          desc: '废弃铁路改造的绿道，两侧种满树木，全年四季各有风景。春天樱花、夏天绿荫、秋天红叶、冬天霜白。散步道两侧是延南洞最精致的独立咖啡厅和小店，是首尔最适合放慢脚步的地方之一。', descEn: 'A greenway converted from a disused railway, lined with trees that offer different scenery each season—cherry blossoms in spring, lush shade in summer, red leaves in autumn, and frosty white in winter. Along the path are Yeonnam-dong\'s most charming indie cafés and shops, making it one of Seoul\'s best places to slow down.',
          tags: ['무료', '2号线 홍대입구역（步行10分钟）', '산책·사진'],
          tip: '봄 벚꽃 시즌과 가을 단풍 시즌이 가장 아름다워요. 평일 낮이 가장 한적해요.'
        },
        {
          ko: '상수동·합정동',
          zh: '上水洞·合井洞 · 弘大旁边更安静的角落', zhEn: 'Sangsu-dong & Hapjeong-dong · Quieter Corners Next to Hongdae',
          desc: '弘大喧嚣的对面，这里更宁静也更有质感。汉江边的망원한강공원（望远汉江公园）是首尔人野餐的热门地点，从편의점买好食物直接在汉江边席地而坐，是真实的首尔年轻人生活方式。', descEn: 'On the flip side of Hongdae\'s hustle, this area is calmer and more refined. Mangwon Hangang Park by the river is a favorite picnic spot for Seoulites—grab food from a convenience store and sit right by the Han River. That\'s the real young Seoul lifestyle.',
          tags: ['무료', '6号线 합정역', '한강·산책'],
          tip: '망원한강공원에서 편의점 음식 사서 돗자리 깔고 앉아있는 게 진짜 서울 현지인 느낌이에요.'
        }
      ]
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🏭',
      title: '성동구 — 创意的首尔', titleEn: 'Seongdong-gu — Creative Seoul',
      sub: '圣水洞 / 首尔森林', subEn: 'Seongsu-dong / Seoul Forest'
    },
    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        {
          ko: '성수동 카페거리',
          zh: '圣水洞咖啡街 · 首尔最潮的工业风街区', zhEn: 'Seongsu-dong Café Street · Seoul\'s Trendiest Industrial District',
          desc: '旧皮革工厂改造成的创意空间聚集地，每家咖啡厅都有独特的工业美学主题。대림창고（大林仓库）是最著名的工业风咖啡厅。韩国新兴品牌和快闪店通常选择在성수동首发，周末常有意外收获。', descEn: 'A cluster of creative spaces converted from old leather factories, where every café has its own industrial aesthetic. Daelim Warehouse is the most famous industrial-style café. New Korean brands and pop-ups often launch in Seongsu-dong first, so weekends often bring unexpected finds.',
          tags: ['카페 입장료', '2号线 성수역', '인스타·카페'],
          tip: '주말에 팝업스토어가 열리는 경우가 많아요. 인스타그램에서 \'성수동 팝업\'으로 검색하면 주말 일정을 미리 확인할 수 있어요.'
        },
        {
          ko: '서울숲',
          zh: '首尔森林 · 城市里的大公园', zhEn: 'Seoul Forest · A Big Park in the City',
          desc: '首尔市中心面积最大的公园之一，有草坪区、鹿园（사슴공원，可以近距离接触鹿）、自行车道和湿地区。성수동과 연결되어 있어서（和성수동相连），两个地方可以串联来逛。春天银杏大道是首尔最美的秋景之一。', descEn: 'One of the largest parks in central Seoul, with lawns, a deer park (where you can get close to the deer), bike paths, and wetlands. It\'s connected to Seongsu-dong, so you can visit both in one go. The ginkgo tree avenue is one of Seoul\'s most beautiful autumn sights.',
          tags: ['무료', '수인분당선 서울숲역', '자연·산책'],
          tip: '사슴공원은 아이들뿐만 아니라 어른들도 정말 좋아해요. 사슴 먹이 주기 체험도 있어요.'
        }
      ]
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🗼',
      title: '용산구 — 眺望首尔的地方', titleEn: 'Yongsan-gu — Where You Look Over Seoul',
      sub: '南山 / N首尔塔 / 梨泰院', subEn: 'Namsan / N Seoul Tower / Itaewon'
    },
    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        {
          ko: 'N서울타워',
          zh: 'N首尔塔 · 俯瞰整个首尔', zhEn: 'N Seoul Tower · Overlooking All of Seoul',
          desc: '首尔最著名的地标，海拔480米，晴天可以看到首尔全貌。展望台分室内和室外，夜景尤其壮观。情侣锁（커플 자물쇠）是这里的传统——将刻有名字的锁锁在栏杆上，钥匙扔下山。缆车（케이블카）上山是最快的方式。', descEn: 'Seoul\'s most iconic landmark at 480 meters above sea level—on a clear day you can see the whole city. The observatory has indoor and outdoor sections, and the night view is especially stunning. Couple locks are a tradition here: lock a lock with your names on the railing and toss the key down the mountain. The cable car is the fastest way up.',
          tags: ['입장료 있음', '남산 케이블카 또는 버스', '야경·전망'],
          tip: '맑은 날 낮에는 멀리까지 보이고, 저녁 노을 무렵이 가장 아름다워요. 주말엔 줄이 길 수 있으니 미리 온라인으로 예약하세요.'
        },
        {
          ko: '남산 둘레길',
          zh: '南山环山步道 · 首尔的城市山林', zhEn: 'Namsan Circular Trail · Seoul\'s Urban Forest',
          desc: '不坐缆车，徒步上南山的路线，沿途可以看到首尔城墙遗迹。秋天的남산 단풍（红叶）是首尔最美的季节风景之一。不需要任何登山装备，普通运动鞋就可以，单程约40分钟。', descEn: 'A hiking route up Namsan without the cable car, passing remnants of the Seoul City Wall along the way. The autumn foliage on Namsan is one of Seoul\'s most beautiful seasonal sights. No gear needed—just regular sneakers, about 40 minutes one way.',
          tags: ['무료', '4号线 명동역에서 걸어서', '등산·자연'],
          tip: '가을 단풍 시즌(10월 말~11월 초)에 걸으면 정말 예뻐요. 체력이 있다면 걸어 올라가고 내려올 때 케이블카를 타도 좋아요.'
        },
        {
          ko: '이태원·해방촌',
          zh: '梨泰院·解放村 · 首尔最国际化的角落', zhEn: 'Itaewon & Haebangchon · Seoul\'s Most International Corner',
          desc: '이태원은 세계 각국의 음식과 문화가 공존하는 거리（梨泰院是全球各地饮食和文化共存的街道）。旁边的해방촌（解放村）是更小众的坡地街区，有大量独立酒吧和创意咖啡厅，视角俯瞰首尔市区，夜景绝佳。', descEn: 'Itaewon is a street where food and culture from around the world coexist. Nearby Haebangchon is a more offbeat hillside neighborhood packed with indie bars and creative cafés, offering views over central Seoul—the night scenery is unbeatable.',
          tags: ['무료', '6号线 이태원역', '야경·다국적 음식'],
          tip: '해방촌 골목 야경이 이태원 본거리보다 더 감성적이에요. 저녁에 걸어 올라가면서 야경을 보세요.'
        }
      ]
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '💎',
      title: '강남구 — 繁华的首尔', titleEn: 'Gangnam-gu — Bustling Seoul',
      sub: 'COEX / 别马당图书馆 / 압구정 / 청담동', subEn: 'COEX / Starfield Library / Apgujeong / Cheongdam-dong'
    },
    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        {
          ko: '별마당 도서관',
          zh: '星马当图书馆 · 首尔最美的公共空间', zhEn: 'Starfield Library · Seoul\'s Most Beautiful Public Space',
          desc: 'COEX购物中心内部的巨型开放图书馆，书架从地面延伸到三层楼高的天花板，是首尔最值得去的免费景点之一。不需要会员，任何人都可以入内随意浏览，也可以坐下来读书。Instagram上最多人打卡的首尔室内空间之一。', descEn: 'A massive open library inside COEX Mall, with bookshelves stretching from the floor to the three-story-high ceiling. It\'s one of Seoul\'s best free attractions—no membership needed, anyone can browse or sit down to read. One of the most Instagrammed indoor spaces in Seoul.',
          tags: ['무료', '2号线 삼성역', '도서관·인스타'],
          tip: 'COEX 내부에 있어서 길을 잃기 쉬워요. 입구에서 직원에게 \'별마당 도서관\'이라고 말하면 안내해줘요.'
        },
        {
          ko: 'SM·YG·HYBE 아티스트 팝업',
          zh: 'SM·YG·HYBE 官方周边店', zhEn: 'SM·YG·HYBE Official Merch Stores',
          desc: '首尔有多家官方아이돌 굿즈 매장和체험 공간。HYBE INSIGHT（4号线 한성대입구역附近）是BTS等HYBE艺人的沉浸式体验博物馆，门票需要提前预约。SM엔터테인먼트 관련 카페和팝업 스토어通常在강남·성수동一带。', descEn: 'Seoul has several official idol merch stores and experience spaces. HYBE INSIGHT (near Hansung University Station on Line 4) is an immersive museum for HYBE artists like BTS—tickets need to be booked in advance. SM Entertainment-related cafes and pop-up stores are usually around Gangnam and Seongsu-dong.',
          tags: ['입장료 있음（HYBE）', '위치 다양', '아이돌·굿즈'],
          tip: 'HYBE INSIGHT는 반드시 사전 예약이 필요해요. 공식 홈페이지에서 예약 가능해요. 아이돌 팬이라면 절대 놓치지 마세요.'
        },
        {
          ko: '압구정 로데오거리',
          zh: '狎鸥亭罗德欧街 · 首尔的精品时尚区', zhEn: 'Apgujeong Rodeo Street · Seoul\'s Luxury Fashion District',
          desc: '首尔最高端的购物街区，国际奢侈品牌和韩国高端设计师品牌集中。这里也是韩国整形外科医院最密集的地方之一（압구정 성형외과 거리）。不买东西也值得来逛逛，感受首尔上流社会的日常。', descEn: 'Seoul\'s most upscale shopping street, packed with international luxury brands and high-end Korean designer labels. It\'s also one of the densest areas for plastic surgery clinics in Korea (Apgujeong\'s plastic surgery street). Even if you\'re not shopping, it\'s worth a stroll to glimpse the daily life of Seoul\'s upper class.',
          tags: ['무료 입장', '3号线 압구정역', '명품·패션'],
          tip: '이 동네는 그냥 걷는 것만으로도 서울의 다른 면을 볼 수 있어요. 카페도 다른 동네보다 훨씬 고급스러워요.'
        }
      ]
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🌊',
      title: '한강 — 流淌的首尔', titleEn: 'Han River — The Flowing Heart of Seoul',
      sub: '汉江公园 / 夜游 / 野餐文化', subEn: 'Han River Parks / Night Cruises / Picnic Culture'
    },
    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        {
          ko: '한강공원',
          zh: '汉江公园 · 首尔的客厅', zhEn: 'Han River Park · Seoul\'s Living Room',
          desc: '汉江沿岸共有11个公园区，其中망원한강공원（望远，弘大附近）和뚝섬한강공원（纛岛）最受年轻人欢迎。从편의점买好炸鸡、零食、啤酒，铺上돗자리（野餐垫），席地而坐——这是首尔年轻人最日常的休闲方式。', descEn: 'There are 11 park zones along the Han River, with Mangwon Hangang Park (near Hongdae) and Ttukseom Hangang Park being the most popular among young people. Grab fried chicken, snacks, and beer from a convenience store, lay out a picnic mat, and sit right on the ground—this is the most everyday leisure activity for young Seoulites.',
          tags: ['무료', '각 지하철역에서 접근', '야경·피크닉'],
          tip: '돗자리는 다이소에서 저렴하게 살 수 있어요. 편의점 치킨이랑 맥주 사서 한강에서 먹는 게 진짜 서울 경험이에요.'
        },
        {
          ko: '한강 유람선',
          zh: '汉江游船 · 从水面看首尔', zhEn: 'Han River Cruise · Seeing Seoul from the Water',
          desc: '汉江游船（한강 유람선）提供白天和夜间游览，从水面仰望首尔的天际线是独特视角。여의도（汝矣岛）码头出发，绕行汉江一圈约1小时。夜间游船看汉江大桥的灯光倒影，是首尔浪漫体验之一。', descEn: 'Han River cruises offer daytime and nighttime tours, giving you a unique perspective of Seoul\'s skyline from the water. Departing from Yeouido dock, the loop takes about an hour. Watching the reflections of bridge lights on the water during a night cruise is one of Seoul\'s most romantic experiences.',
          tags: ['입장료 있음', '5号线 여의나루역', '야경·낭만'],
          tip: '야간 유람선이 낮보다 훨씬 아름다워요. 출발 전에 온라인으로 미리 예약하면 할인을 받을 수 있어요.'
        }
      ]
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '⭐',
      title: '특별한 서울 — 不能错过的特别体验', titleEn: 'Special Seoul — Unique Experiences Not to Miss',
      sub: '찜질방 / 노래방 / 전통차 / 야경 포인트'
    },
    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        {
          ko: '찜질방 체험',
          zh: '汗蒸幕体验 · 韩国最特别的文化体验', zhEn: 'Jjimjilbang Experience · Korea\'s Most Unique Cultural Experience',
          desc: '찜질방是韩国特有的综合桑拿文化空间，24小时营业，可以在里面睡觉过夜（有공용 수면실）。入场后换上统一服装，在各种温度的汗蒸房里轮流体验，再去大浴池泡澡。价格约10,000-15,000韩元，非常超值。首尔最著名的찜질방包括용산 드래곤힐스파。', descEn: 'A jjimjilbang is Korea\'s unique all-in-one sauna culture space, open 24 hours, where you can even sleep overnight (there are shared sleeping rooms). After entering, you change into uniform clothes, rotate through sauna rooms at various temperatures, then soak in the big bath. It costs about 10,000–15,000 KRW—great value. Seoul\'s most famous jjimjilbangs include Dragon Hill Spa in Yongsan.',
          tags: ['입장료 약 12,000원', '위치 다양', '문화체험'],
          tip: '한국에 왔으면 찜질방은 꼭 한 번은 가봐야 해요. 처음엔 낯설어도 들어가면 너무 좋아요. 수건과 목욕용품은 제공돼요.'
        },
        {
          ko: '노래방（코인 노래방）',
          zh: 'KTV · 한국노래방문화',
          desc: '韩国노래방和中国KTV不同——是小包厢，价格按时间计费（코인 노래방更便宜，投硬币买时间）。通常深夜朋友聚会后去唱2-3首结束，不是长时间消费的场所。韩国아이돌歌曲曲库非常完整，是练习韩语歌曲的绝佳场合。', descEn: 'Korean noraebang is different from Chinese KTV—it\'s a small private room, priced by time (coin noraebang is cheaper, where you insert coins to buy time). Usually people go after late-night gatherings with friends to sing just 2–3 songs, not for long sessions. The song library for Korean idol music is very complete, making it a perfect place to practice Korean songs.',
          tags: ['코인노래방 약 500원/곡', '전국 어디서나', '문화체험'],
          tip: '코인 노래방은 혼자 가도 전혀 이상하지 않아요. 오히려 혼자서 맘껏 부를 수 있어서 더 좋을 수도 있어요.'
        },
        {
          ko: '인사동·북촌 전통차 카페',
          zh: '传统茶咖啡厅 · 用一杯茶穿越时间', zhEn: 'Traditional Tea Cafes · Travel Through Time with a Cup of Tea',
          desc: '在인사동或북촌的韩屋改造咖啡厅里，点一杯전통차（传统茶）——쌍화차（双花茶）、유자차（柚子茶）、대추차（大枣茶）……端着青瓷茶杯，坐在有瓦片屋顶的空间里，窗外是600年的宫殿——这是首尔给你的穿越感。', descEn: 'At a hanok-converted cafe in Insa-dong or Bukchon, order a cup of traditional tea—ssanghwacha (herbal tea), yujacha (citron tea), daechucha (jujube tea)... Holding a celadon cup in a space with a tiled roof, with a 600-year-old palace outside the window—this is the time-travel feeling Seoul gives you.',
          tags: ['차 한 잔 약 7,000원', '3号线 안국역', '전통·감성'],
          tip: '인사동 \'귀천\' 이나 북촌의 작은 전통 찻집들을 추천해요. 관광지 느낌이 덜한 골목 안 찻집이 더 분위기 있어요.'
        },
        {
          ko: '낙산공원 야경',
          zh: '骆山公园夜景 · 最小众最美的首尔夜景', zhEn: 'Naksan Park Night View · Seoul\'s Best-Kept Secret Nightscape',
          desc: '낙산공원은 서울 성곽길을 따라 걸으며 시내를 내려다볼 수 있는 공원（骆山公园是沿首尔城郭可以俯瞰市区的公园）。不如N首尔塔有名，但夜景同样壮观，游客少、氛围好。旁边의 이화마을（梨花村）有著名的花卉壁画，白天也值得来看。', descEn: 'Naksan Park is a park where you can walk along Seoul\'s city wall and look down over the city. It\'s less famous than N Seoul Tower, but the night view is just as spectacular, with fewer tourists and a better atmosphere. Nearby, Ihwa Mural Village has famous flower murals that are worth visiting during the day too.',
          tags: ['무료', '4号线 혜화역', '야경·소소한 감성'],
          tip: 'N서울타워보다 덜 알려져 있지만, 서울 야경을 공짜로 볼 수 있는 최고의 장소 중 하나예요. 사람도 적어요.'
        },
        {
          ko: '다이소 쇼핑',
          zh: 'DAISO · 性价比最高的首尔购物体验', zhEn: 'DAISO · Seoul\'s Best Value Shopping Experience',
          desc: '说다이소（大创）是首尔必去，很多人会笑——但토리 认真的。韩国다이소不只是1,000韩元的杂货店，里面有大量高颜值的韩国本土设计产品、美妆小样、文具、生活用品，价格极低，性价比远超明洞的化妆品店。离开首尔前来一次다이소扫货是必须的。', descEn: 'People might laugh when you say Daiso is a must-visit in Seoul—but Tori is serious. Korean Daiso isn\'t just a 1,000-won dollar store; it\'s packed with stylish Korean-designed products, beauty samples, stationery, and household goods at incredibly low prices, offering far better value than the cosmetics shops in Myeongdong. A Daiso haul before leaving Seoul is a must.',
          tags: ['전국 어디서나', '지하철역 근처', '쇼핑·가성비'],
          tip: '화장품 소분 용기, 귀여운 소품, 여행용 필수품들이 1,000~5,000원에 살 수 있어요. 한국 여행 마지막 날 들러보세요.'
        }
      ]
    },
    {
      type: 'toriQuote',
      text: '25곳 다 가려면 최소 5일은 있어야 해요. 처음 서울 여행이라면 3-4일에 10-12곳 정도가 현실적이에요. 무리하게 스케줄을 짜는 것보다, 한 동네를 천천히 즐기는 게 더 서울다운 여행이에요. 서울은 속도가 빠른 도시지만, 여행은 천천히 해도 돼요 🐰'
    },
    {
      type: 'phraseList',
      title: '토리 教你说——观光必备韩语', titleEn: 'Tori Teaches You — Essential Korean for Sightseeing',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        { ko: '입장료가 얼마예요?', ro: 'ip-jang-nyo-ga eol-ma-ye-yo?', scene: '🎟️ 问门票价格', sceneEn: '🎟️ Ask about ticket prices', zh: '门票多少钱？', zhEn: 'How much is the ticket?' },
        { ko: '몇 시에 문 닫아요?', ro: 'myeot si-e mun da-da-yo?', scene: '⏰ 问关门时间', sceneEn: '⏰ Ask about closing time', zh: '几点关门？', zhEn: 'What time does it close?' },
        { ko: '한복 대여는 어디서 해요?', ro: 'han-bok dae-yeo-neun eo-di-seo hae-yo?', scene: '👘 找韩服租借', sceneEn: '👘 Find hanbok rental', zh: '在哪里可以租韩服？', zhEn: 'Where can I rent a hanbok?' },
        { ko: '사진 같이 찍어도 돼요?', ro: 'sa-jin ga-chi jji-geo-do dwae-yo?', scene: '📸 请求合照', sceneEn: '📸 Ask for a photo together', zh: '可以一起拍照吗？', zhEn: 'Can we take a photo together?' },
        { ko: '여기서 제일 유명한 게 뭐예요?', ro: 'yeo-gi-seo je-il yu-myeong-han ge mwo-ye-yo?', scene: '⭐ 问最有名的是什么', sceneEn: '⭐ Ask what\'s most famous', zh: '这里最有名的是什么？', zhEn: 'What\'s the most famous thing here?' },
        { ko: '화장실이 어디예요?', ro: 'hwa-jang-si-ri eo-di-ye-yo?', scene: '🚻 找厕所', sceneEn: '🚻 Find the restroom', zh: '厕所在哪里？', zhEn: 'Where is the restroom?' }
      ]
    },
    {
      type: 'vocabList',
      title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson',
      items: [
        { ko: '관광지', zh: '旅游景点', zhEn: 'Tourist attractions' },
        { ko: '입장료', zh: '入场费', zhEn: 'Admission fee' },
        { ko: '무료', zh: '免费', zhEn: 'Free' },
        { ko: '한복 대여', zh: '韩服租借', zhEn: 'Hanbok rental' },
        { ko: '야경', zh: '夜景', zhEn: 'Night view' },
        { ko: '산책로', zh: '步行道', zhEn: 'Walking trail' },
        { ko: '전통차', zh: '传统茶', zhEn: 'Traditional tea' },
        { ko: '찜질방', zh: '汗蒸幕', zhEn: 'Jjimjilbang (sauna)' },
        { ko: '노래방', zh: 'KTV' },
        { ko: '돗자리', zh: '野餐垫', zhEn: 'picnic mat' },
        { ko: '수문장 교대식', zh: '守卫交接仪式', zhEn: 'Guard changing ceremony' },
        { ko: '화장실', zh: '厕所', zhEn: 'Restroom' }
      ]
    },
    {
      type: 'ending',
      text: '不需要全部去完，但每一个去过的地方，都会让你对首尔多一点理解。最好的旅行不是打完所有卡，而是在某个地方停下来，真的感受了一下。下一篇，토리 带你搞定首尔购物 🛍️', textEn: 'You don\'t need to visit them all, but every place you go will give you a little more understanding of Seoul. The best trip isn\'t about checking off every spot—it\'s about stopping somewhere and truly feeling it. Next up, 토리 will help you master Seoul shopping 🛍️',
      next: { slug: 'korea-shopping-guide', title: '韩国购物完全指南', titleEn: 'The Complete Guide to Shopping in Korea' }
    }
  ]
},
  {
  slug: 'korea-shopping',
  category: 'travel',
  title: '韩国购物完全指南', titleEn: 'The Complete Guide to Shopping in Korea',
  subtitle: '쇼핑 — 明洞、弘大、江南、免税店全攻略', subtitleEn: '쇼핑 — Complete guide to Myeongdong, Hongdae, Gangnam, and duty-free shops',
  emoji: '🛍️',
  readMinutes: 10,
  bannerImage: '/images/banners/korea-shopping.webp',
  blocks: [
    {
      type: 'toriQuote',
      label: '토리 说', labelEn: 'Tori says',
      text: '去韩国不购物，就像去日本不吃寿司——当然可以，但你会后悔的。韩国的购物有几个特点：美妆是全球价格洼地、아이돌周边在韩国才齐全、생활용품设计感强且便宜、传统工艺品有文化价值……问题是很多人到了首尔不知道该去哪买、怎么省钱、能不能退税。今天토리 把购物攻略整理清楚，让你每一分钱都花得值 🛍️', textEn: 'Going to Korea without shopping is like going to Japan without eating sushi—you can, but you\'ll regret it. Shopping in Korea has a few key features: beauty products are a global price bargain, 아이돌 merchandise is only complete in Korea, 생활용품 are well-designed and cheap, and traditional crafts have cultural value... The problem is many people arrive in Seoul not knowing where to buy, how to save money, or whether they can get tax refunds. Today, 토리 will organize the shopping guide clearly so every penny you spend is worth it 🛍️',
    },
    {
      type: 'sectionTitle',
      emoji: '💄',
      title: '한국 뷰티——美妆是最值得买的品类', titleEn: 'Korean Beauty — The Most Worthwhile Category to Buy',
      sub: '比国内便宜，比代购直接，品类最全', subEn: 'Cheaper than back home, more direct than a proxy shopper, and the widest selection.',
    },
    { type: 'paragraph', heading: '💄 平价美妆品牌（明洞必扫）', headingEn: '💄 Affordable Beauty Brands (Must-Stop in Myeongdong)', text: '' },
    {
      type: 'cardGrid',
      variant: 'brand',
      cards: [
        {
          ko: '이니스프리 innisfree',
          tags: ['자연주의 스킨케어'],
          desc: '济州岛天然成分护肤，绿茶精华系列全球知名。护肤品和面膜性价比超高，套装购买更划算。', descEn: 'Jeju Island natural ingredient skincare, with a globally renowned green tea essence line. Skincare and masks offer incredible value; buying sets is even more cost-effective.',
          price: '面膜约 1,000원/片', priceEn: 'Masks approx. 1,000 KRW each',
        },
        {
          ko: '에뛰드 ETUDE',
          tags: ['플레이풀 메이크업'],
          desc: '可爱少女风彩妆，唇膏、眼影、腮红颜色选择丰富。价格亲民，适合学生和彩妆新手。', descEn: 'Cute, girly makeup with a wide range of lip, eyeshadow, and blush colors. Budget-friendly, perfect for students and makeup beginners.',
          price: '唇膏约 8,000–15,000원', priceEn: 'Lip products approx. 8,000–15,000 KRW',
        },
        {
          ko: '네이처리퍼블릭',
          tags: ['자연 성분 뷰티'],
          desc: '芦荟胶是网红爆款，多功能保湿修护，大瓶装价格极低。护发素系列也是回购率极高的产品。', descEn: 'The aloe vera gel is a viral bestseller—multi-purpose, hydrating, and repairing, with a huge bottle at a rock-bottom price. The hair conditioner line is also a top repeat-purchase product.',
          price: '芦荟胶大瓶约 8,900원', priceEn: 'Large aloe vera gel approx. 8,900 KRW',
        },
        {
          ko: '더페이스샵 THE FACE SHOP',
          tags: ['기초 스킨케어'],
          desc: '大米发酵精华系列深受中老年女性喜爱，米粒系列护肤是经典款。气垫BB霜也是热门单品。', descEn: 'The rice fermentation essence line is beloved by middle-aged and older women; the rice grain skincare series is a classic. The cushion BB cream is also a hot item.',
          price: '气垫约 15,000–22,000원', priceEn: 'Cushion approx. 15,000–22,000 KRW',
        },
      ],
    },
    { type: 'paragraph', heading: '✨ 中高端美妆（值得投资）', headingEn: '✨ Mid-to-High-End Beauty (Worth the Investment)', text: '' },
    {
      type: 'cardGrid',
      variant: 'brand',
      cards: [
        {
          ko: '설화수 雪花秀',
          tags: ['한방 럭셔리 스킨케어'],
          desc: '韩方高端护肤品，以人参和草本为核心成分。在韩国购买比国内便宜约20-30%，是送礼首选。윤조에센스是标志性产品。', descEn: 'A high-end Korean herbal skincare line centered on ginseng and botanicals. Buying in Korea is about 20–30% cheaper than back home, making it a top gift choice. The First Care Activating Serum is its iconic product.',
          price: '윤조에센스 약 80,000원起', priceEn: 'First Care Activating Serum from approx. 80,000 KRW',
        },
        {
          ko: '아모레퍼시픽 AMOREPACIFIC',
          tags: ['프리미엄 스킨케어'],
          desc: '韩国最大美妆集团旗舰品牌，绿茶系列和时光密令精华是招牌。旗舰店在용산IPARK Mall有专门的体验区。', descEn: 'The flagship brand of Korea\'s largest beauty group, known for its green tea line and Time Treasure essence. The flagship store at Yongsan IPARK Mall has a dedicated experience zone.',
          price: '精华约 100,000원起', priceEn: 'Essence from approx. 100,000 KRW',
        },
        {
          ko: 'VT코스메틱',
          tags: ['콜라겐 · 리들샷'],
          desc: '리들샷（Reedle Shot）是近年全球爆红的韩国美容仪器式精华，BTS代言使其知名度爆炸式增长。在韩国买最实惠最正品。', descEn: 'Reedle Shot is a globally viral Korean beauty-device-style essence, whose fame exploded with BTS as its ambassador. Buying it in Korea gets you the best price and authentic product.',
          price: '리들샷 약 35,000–60,000원',
        },
        {
          ko: 'COSRX',
          tags: ['기능성 스킨케어'],
          desc: '蜗牛精华系列全球知名，主打功效型护肤。痘痘贴、低分子透明质酸精华是全球药妆爱好者必购单品。在韩国比海外便宜。', descEn: 'The snail essence line is globally famous for its functional skincare. Pimple patches and low-molecular-weight hyaluronic acid essence are must-buys for K-beauty enthusiasts worldwide—cheaper in Korea than overseas.',
          price: '蜗牛精华约 22,000원', priceEn: 'Snail essence approx. 22,000 KRW',
        },
      ],
    },
    {
      type: 'toriQuote',
      text: '뷰티 쇼핑 팁：명동에서 살 때 여러 매장을 비교하세요. 같은 브랜드 제품도 매장마다 가격이 조금씩 달라요. 그리고 멤버십 앱에 가입하면 추가 할인이나 쿠폰을 받을 수 있어요. 이니스프리, 에뛰드 모두 앱 회원 가입 시 첫 구매 할인이 있어요.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🫒',
      title: '올리브영（Olive Young）— 韩国第一 H&B 连锁', titleEn: 'Olive Young — Korea\'s #1 H&B Chain',
      sub: '从护肤品到零食到保健品，一家店买遍韩国', subEn: 'From skincare to snacks to supplements, buy all of Korea in one store.',
    },
    {
      type: 'paragraph',
      text: '올리브영（Olive Young）是韩国最大的 헬스앤뷰티（Health & Beauty）连锁店，全国超过 1,300 家门店，地位相当于韩国的"药妆店+屈臣氏升级版"。명동（明洞）旗舰店是规模最大、品类最全的热门打卡点。这里是中国和海外游客购买 K-뷰티 产品的首选地，从护肤品（Torriden、MEDIHEAL、Dr.G）、彩妆（3CE、romand、peripera）、到护发（UNOVE）、零食（Olive Young 自有品牌贝果脆片）、保健品（益生菌）——品类极全。购物满 30,000 韩元可当场退税（出示护照），店内常有 1+1 和独家套装促销，月首/月底折扣活动最密集。下载 Olive Young App 注册会员可获首次购物优惠券。', textEn: 'Olive Young is Korea\'s largest Health & Beauty chain, with over 1,300 stores nationwide—think of it as a step up from a drugstore plus Watsons. The Myeongdong flagship is the biggest and most complete, a must-visit hotspot. It\'s the go-to place for Chinese and international tourists buying K-beauty, from skincare (Torriden, MEDIHEAL, Dr.G) and makeup (3CE, romand, peripera) to hair care (UNOVE), snacks (Olive Young\'s own-brand bagel crisps), and supplements (probiotics)—the selection is massive. Spend 30,000 KRW and get instant tax refund at the store (show your passport). There are frequent 1+1 deals and exclusive sets, with the most promotions at the start and end of each month. Download the Olive Young app and sign up for membership to get a first-purchase coupon.',
    },
    {
      type: 'sectionTitle',
      emoji: '🎤',
      title: '아이돌 굿즈——粉丝必去的购物路线', titleEn: 'Idol Merch — A Must-Visit Shopping Route for Fans',
      sub: '在首尔买，比任何地方都全', subEn: 'Buy it in Seoul—the selection is better than anywhere else.',
    },
    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        {
          emoji: '🏢',
          ko: 'HYBE INSIGHT',
          zh: 'HYBE官方体验博物馆 · BTS粉丝圣地', zhEn: 'HYBE Official Experience Museum · A Holy Place for BTS Fans',
          desc: 'BTS、SEVENTEEN、NewJeans等HYBE艺人的沉浸式体验博物馆，有展览、互动装置、官方굿즈商店。是全球唯一一个能买到完整HYBE官方周边的地方，BTS联名商品只有这里最全。', descEn: 'An immersive experience museum for HYBE artists like BTS, SEVENTEEN, and NewJeans, featuring exhibitions, interactive installations, and an official goods store. It\'s the only place in the world where you can buy the full range of official HYBE merchandise, and it has the most complete selection of BTS collaboration items.',
          tip: '반드시 사전 예약 필수! 현장에서는 입장이 어려울 수 있어요. 공식 홈페이지에서 날짜와 시간을 미리 예약하세요.',
          tags: ['예약 필수', '4号线 한성대입구역', 'BTS·하이브'],
        },
        {
          emoji: '🎁',
          ko: 'SM·JYP·YG 공식 스토어',
          zh: 'SM·JYP·YG官方周边店', zhEn: 'SM·JYP·YG Official Merchandise Stores',
          desc: '각 기획사의 공식 굿즈 스토어（各大公司官方周边店）。SM의 경우 성수동 근처에 공식 매장과 팝업이 열리는 경우가 많고, JYP·YG도 각각 공식 온라인 스토어와 팝업 스토어를 운영해요. 출발 전에 공식 SNS에서 팝업 일정을 확인하세요.', descEn: '각 기획사의 공식 굿즈 스토어 (Official merchandise stores for each agency). SM often opens official stores and pop-ups near Seongsu-dong, and JYP and YG also run their own official online stores and pop-up stores. Check the official SNS for pop-up schedules before you go.',
          tip: '각 기획사 공식 인스타그램에서 팝업 스토어 일정을 미리 확인하면 놓치지 않아요.',
          tags: ['위치 유동적', 'SM·JYP·YG', '팝업'],
        },
        {
          emoji: '🏪',
          ko: '홍대·이태원 굿즈샵',
          zh: '弘大·梨泰院周边店街', zhEn: 'Hongdae & Itaewon Merchandise Street',
          desc: '홍대입구역 주변에 아이돌 굿즈 전문점이 밀집해 있어요（弘大入口站周围有大量아이돌周边专卖店）。비공식 팬메이드 굿즈부터 공식 라이선스 제품까지 다양하게 있어요. 이태원에도 K-POP 굿즈 관련 매장이 있어요.', descEn: '홍대입구역 주변에 아이돌 굿즈 전문점이 밀집해 있어요 (There are many idol merchandise stores around Hongdae Station). You\'ll find everything from unofficial fan-made goods to officially licensed products. There are also K-POP merchandise stores in Itaewon.',
          tip: '팬메이드 제품은 품질 확인 후 구매하세요. 공식 제품과 구분이 필요해요.',
          tags: ['2号线 홍대입구역', '각종 아이돌', '팬메이드'],
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🏬',
      title: '어디서 사야 할까——购物地点完全指南', titleEn: 'Where to Shop — The Complete Shopping Guide',
      sub: '不同购物需求去不同的地方', subEn: 'Different shopping needs call for different places',
    },
    {
      type: 'table',
      head: ['购物地点', '适合买什么', '价格', '退税'],
      rows: [
        ['명동 明洞', '平价美妆、基本款护肤、纪念品', '정가 / 약간 비쌈', '✅ 가능'],
        ['동대문시장 东大门', '衣服、面料、批发价购物', '도매가 가능', '일부 가능'],
        ['올리브영 OLIVE YOUNG', '美妆、护肤、健康食品全品类', '행사가 자주 있음', '✅ 가능'],
        ['다이소 DAISO', '生活用品、文具、小物件', '1,000–5,000원', '❌ 불가'],
        ['면세점 免税店', '高端美妆、奢侈品、韩国品牌', '면세 가격', '이미 면세'],
        ['홍대 빈티지샵', '古着、独立设计师品牌', '가격 다양', '❌ 대부분 불가'],
        ['이마트·롯데마트', '食品、零食、生活用品', '최저가', '❌ 불가'],
      ],
    },
    {
      type: 'cardGrid',
      variant: 'place',
      cards: [
        {
          emoji: '🌿',
          ko: '올리브영 OLIVE YOUNG',
          zh: '橄榄杨 · 韩国美妆超市，不能错过', zhEn: 'Olive Young · Korea\'s Beauty Superstore, Don\'t Miss It',
          desc: '올리브영은 한국의 세포라 같은 곳이에요（OLIVE YOUNG就是韩国的Sephora）. 韩国本土美妆品牌、护肤品、健康食品、香薰全部集中在一起，价格比单独品牌店更便宜，经常有买二送一、满减等活动。首尔명동、홍대、강남都有大型门店，24小时营业的门店也有。', descEn: '올리브영은 한국의 세포라 같은 곳이에요 (OLIVE YOUNG is like Korea\'s Sephora). Korean beauty brands, skincare, health foods, and aromatherapy are all in one place, with prices cheaper than standalone brand stores. They often run deals like buy-two-get-one-free and discounts on minimum spend. There are large stores in Myeongdong, Hongdae, and Gangnam, and some are open 24 hours.',
          tip: '올리브영 앱을 미리 다운받고 회원 가입하면 할인 쿠폰과 행사 정보를 받을 수 있어요. 외국인 관광객 특별 할인도 있는 경우가 있어요.',
          tags: ['전국 어디서나', '미용·건강', '앱 할인'],
        },
        {
          emoji: '👗',
          ko: '동대문 패션 클러스터',
          zh: '东大门时装区 · 韩国批发零售时装圣地', zhEn: 'Dongdaemun Fashion District · Korea\'s Wholesale & Retail Fashion Hub',
          desc: '동대문은 한국 최대의 패션 도매·소매 시장이에요（东大门是韩国最大的时装批发零售市场）. 두타（DOOTA）、쇼핑몰 두타면세점、롯데피트인 등 대형 쇼핑몰부터 새벽에만 열리는 도매시장까지 다양해요. 새벽 3-5시에는 진짜 도매가로 살 수 있어요.', descEn: '동대문은 한국 최대의 패션 도매·소매 시장이에요 (Dongdaemun is Korea\'s largest fashion wholesale and retail market). From big malls like DOOTA, Doota Duty Free, and Lotte Fitin to wholesale markets that only open at dawn, there\'s something for everyone. Between 3-5 AM, you can buy at true wholesale prices.',
          tip: '쇼핑 목적에 따라 시간대를 맞춰가세요. 소매는 낮에, 도매 가격을 원하면 새벽 2시 이후에 가세요.',
          tags: ['2·4·5号线 동대문역사문화공원역', '패션·도매', '24시간'],
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '🎎',
      title: '전통 기념품——送礼最有文化价值的选择', titleEn: 'Traditional Souvenirs — The Most Culturally Meaningful Gifts',
      sub: '不是纪念品店里的那些，是真正值得带走的', subEn: 'Not the ones in souvenir shops, but the ones truly worth taking home',
    },
    { type: 'paragraph', heading: '🎎 真正值得带走的韩国特产', headingEn: '🎎 Korean Specialties Truly Worth Taking Home', text: '' },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          ko: '고려인삼 高丽参',
          tags: ['건강식품'],
          desc: '韩国人参品质世界公认，正官庄（정관장）是最权威的品牌。홍삼（红参）比白参更易保存，有粉末、液体、糖片等多种形态，适合送给长辈。', descEn: 'Korean ginseng is world-renowned for its quality, and CheongKwanJang (정관장) is the most authoritative brand. Red ginseng (홍삼) keeps better than white ginseng and comes in powder, liquid, and tablet forms — perfect for gifting to elders.',
          price: '인삼정 약 30,000–200,000원不等', priceEn: '인삼정 약 30,000–200,000원 (Ginseng extract, approx. 30,000–200,000 KRW)',
        },
        {
          ko: '전통 공예품',
          tags: ['한국 전통문화'],
          desc: '인사동에 韩国传统工艺品店最集中。青瓷（청자）、白瓷（백자）茶具，传统刺绣（자수），彩绘漆器……有文化底蕴的纪念品，比机场那些印着태극기的马克杯有价值得多。', descEn: 'Insadong has the highest concentration of traditional Korean craft shops. Celadon (cheongja), white porcelain (baekja) tea sets, traditional embroidery (jasu), painted lacquerware... Souvenirs with cultural depth are far more valuable than those airport mugs printed with the taegeukgi.',
          price: '차 문화 관련 제품 약 15,000원起', priceEn: '차 문화 관련 제품 약 15,000원 (Tea culture-related items, from approx. 15,000 KRW)',
        },
        {
          ko: '한과 · 전통과자',
          tags: ['전통 식품'],
          desc: '약과（蜂蜜脆饼）近年成为全球爆红的韩国传统点心，약식（药食）、전통 강정、한과 세트适合作为伴手礼。인사동과 광장시장에서 구입 가능해요.', descEn: '약과 (honey cookies) have become a globally popular Korean traditional snack in recent years. 약식 (sweet rice cakes), traditional 강정, and 한과 sets make great gifts. You can buy them in Insa-dong and Gwangjang Market.',
          price: '약과 1박스 약 10,000–30,000원',
        },
        {
          ko: '불닭볶음면 / 김 / 간식류',
          tags: ['식품 기념품'],
          desc: '韩国零食是最受欢迎的伴手礼之一。불닭볶음면、허니버터칩（蜂蜜黄油薯片）、꼬북칩、김（海苔）系列……이마트나 롯데마트에서 가장 저렴하게 살 수 있어요.', descEn: 'Korean snacks are among the most popular souvenirs. 불닭볶음면 (fire noodles), honey butter chips, 꼬북칩, and 김 (seaweed) snacks... You can get them cheapest at E-Mart or Lotte Mart.',
          price: '마트에서 구입 시 가장 저렴',
        },
      ],
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '💰',
      title: 'TAX FREE 退税——买贵的东西必须退', titleEn: 'TAX FREE Refund — You Must Claim It on Expensive Purchases',
      sub: '退税最高可返回购物金额的10%，不退是白白损失', subEn: 'You can get up to 10% back on your purchases — not claiming it is just throwing money away',
    },
    {
      type: 'paragraph',
      heading: '🧾 韩国退税完整流程', headingEn: '🧾 Complete Guide to Tax Refunds in Korea',
      text: '购物满30,000韩元的单张发票，在贴有TAX FREE标志的商店均可申请退税', textEn: 'A single receipt of 30,000 KRW or more can be refunded at any store with a TAX FREE sign.',
    },
    {
      type: 'steps',
      steps: [
        {
          label: '1',
          desc: '购物时告诉店员"택스 리펀 해주세요（请帮我办退税）"，出示护照，店员会打印退税单',
          ko: '택스 리펀 해주세요',
          zh: '请帮我办退税', zhEn: 'Please process my tax refund.',
        },
        { label: '2', desc: '离开韩国时在机场退税窗口（出境大厅，过安检之前）凭退税单+护照+购物发票办理退税', descEn: 'When leaving Korea, go to the airport tax refund counter (in the departure hall, before security) with your tax refund form, passport, and shopping receipts.' },
        { label: '3', desc: '选择退税方式：현금（现金）当场领取，或退回到信用卡（需要几个星期到账）', descEn: 'Choose your refund method: 현금 (cash) received on the spot, or back to your credit card (takes a few weeks).' },
        { label: '4', desc: '部分商场有즉시환급（即时退税）服务，购物时直接扣除税额，不需要机场退税，更方便', descEn: 'Some malls offer 즉시환급 (instant tax refund) — the tax is deducted right at the store, no airport refund needed, much more convenient.' },
        { label: '5', desc: 'Global Blue、KTO Tax Free等退税公司App可以预先登记，机场退税更快', descEn: 'You can pre-register on tax refund apps like Global Blue or KTO Tax Free to speed up the airport process.' },
      ],
    },
    {
      type: 'highlight',
      variant: 'tip',
      title: '환급 금액',
      text: '韩国VAT税率为10%，退税后实际退还约7-9%（扣除手续费）。购买15万韩元的化妆品，大约可以退回约10,000-13,000韩元。金额不大，但值得做——机场办理只需要5分钟。', textEn: 'Korea\'s VAT is 10%, and after the refund you get about 7-9% back (after fees). Buying 150,000 KRW of cosmetics gets you roughly 10,000-13,000 KRW back. It\'s not a huge amount, but worth it — it only takes 5 minutes at the airport.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle',
      emoji: '💡',
      title: '토리 的省钱技巧', titleEn: 'Tori\'s money-saving tips',
      sub: '同样的东西，用这些方法可以少花20-30%', subEn: 'Use these tricks to spend 20-30% less on the same things.',
    },
    { type: 'paragraph', heading: '💡 省钱方法大集合', headingEn: '💡 The ultimate money-saving guide', text: '' },
    {
      type: 'cardGrid',
      variant: 'generic',
      cards: [
        {
          ko: '올리브영 앱 쿠폰',
          tags: ['즉시 할인'],
          desc: '출발 전 앱 설치 후 회원 가입하면 첫 구매 할인 쿠폰이 있어요. 올리브영 행사 기간에 가면 1+1, 2+1 등 할인이 매우 많아요. 가장 쉬운 절약 방법이에요.',
        },
        {
          ko: '이마트·롯데마트',
          tags: ['최저가 식품'],
          desc: '한국 과자, 라면, 커피믹스 등 식품 관련 기념품은 편의점이나 명동보다 마트에서 사는 게 훨씬 저렴해요. 같은 제품이 2배 이상 가격 차이 나는 경우도 있어요.',
        },
        {
          ko: '면세점 사전 예약',
          tags: ['면세 쇼핑'],
          desc: '인터넷 면세점에서 미리 주문하고 공항에서 수령하면 추가 할인 쿠폰이 붙어요. 롯데면세점·신라면세점 앱에서 확인해보세요. 설화수 같은 고가 브랜드는 면세점이 가장 저렴해요.',
        },
        {
          ko: '카카오페이·네이버페이',
          tags: ['결제 할인'],
          desc: '한국에서 카카오페이나 네이버페이로 결제하면 추가 포인트나 할인이 붙는 경우가 많아요. 외국인도 신청 가능한 경우가 있으니 미리 확인해보세요.',
        },
      ],
    },
    {
      type: 'highlight',
      variant: 'warning',
      title: '购物时要注意的事', titleEn: 'Things to watch out for when shopping',
      text: '한국은 대부분 영수증 없이는 환불이 어려워요（韩国大部分情况下没有收据很难退货）。购物时一定要保留收据，特别是美妆产品。另外，开封后的美妆一般不可退换，所以在店里要仔细确认颜色和产品后再购买。피부 트러블이 걱정된다면（如果担心皮肤问题），先买小样试用再买正装。', textEn: '한국은 대부분 영수증 없이는 환불이 어려워요 (In Korea, it\'s hard to return without a receipt). Always keep your receipts, especially for beauty products. Also, opened beauty items generally can\'t be returned or exchanged, so check colors and products carefully in-store before buying. 피부 트러블이 걱정된다면 (If you\'re worried about skin issues), try a sample first before buying the full size.',
    },
    {
      type: 'phraseList',
      title: '토리 教你说——购物必备韩语', titleEn: 'Tori teaches you — essential Korean for shopping',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        { ko: '이거 한번 써봐도 돼요?', ro: 'i-geo han-beon sseo-bwa-do dwae-yo?', scene: '💄 试用美妆品', sceneEn: '💄 Trying beauty products', zh: '可以试用一下这个吗？', zhEn: 'Can I try this?' },
        { ko: '이거랑 비슷한 색 있어요?', ro: 'i-geo-rang bi-seu-tan saek i-sseo-yo?', scene: '🎨 找相似颜色', sceneEn: '🎨 Finding a similar shade', zh: '有和这个相似的颜色吗？', zhEn: 'Do you have a similar color to this?' },
        { ko: '택스 리펀 해주세요.', ro: 'taek-seu ri-peun hae-ju-se-yo', scene: '🧾 申请退税', sceneEn: '🧾 Applying for a tax refund', zh: '请帮我办退税', zhEn: 'Please process my tax refund.' },
        { ko: '더 싼 거 있어요?', ro: 'deo ssan geo i-sseo-yo?', scene: '💰 找更便宜的', sceneEn: '💰 Finding something cheaper', zh: '有更便宜的吗？', zhEn: 'Is there a cheaper one?' },
        { ko: '선물 포장 해주실 수 있어요?', ro: 'seon-mul po-jang hae-ju-sil su i-sseo-yo?', scene: '🎁 礼品包装', sceneEn: '🎁 Gift wrapping', zh: '可以帮我做礼品包装吗？', zhEn: 'Can you gift-wrap this for me?' },
        { ko: '환불 되나요?', ro: 'hwan-bul doe-na-yo?', scene: '↩️ 确认退货政策', sceneEn: '↩️ Checking the return policy', zh: '可以退货吗？', zhEn: 'Can I return this?' },
      ],
    },
    { type: 'sectionTitle', emoji: '📖', title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson' },
    {
      type: 'vocabList',
      items: [
        { ko: '쇼핑', zh: '购物', zhEn: 'Shopping' },
        { ko: '할인', zh: '打折', zhEn: 'Discount' },
        { ko: '면세점', zh: '免税店', zhEn: 'Duty-free shop' },
        { ko: '환불', zh: '退款', zhEn: 'refund' },
        { ko: '영수증', zh: '收据', zhEn: 'receipt' },
        { ko: '택스 리펀', zh: '退税', zhEn: 'Tax refund' },
        { ko: '굿즈', zh: '周边商品', zhEn: 'Merchandise' },
        { ko: '샘플', zh: '小样', zhEn: 'Sample' },
        { ko: '선물 포장', zh: '礼品包装', zhEn: 'Gift wrapping' },
        { ko: '약과', zh: '蜂蜜脆饼', zhEn: 'Honey crisp cookies' },
        { ko: '홍삼', zh: '红参', zhEn: 'Red ginseng' },
        { ko: '행사', zh: '促销活动', zhEn: 'Promotion' },
      ],
    },
    {
      type: 'ending',
      text: '首尔，토리 等你来\n\n五篇走完，你已经知道了首尔的八个街区性格、地铁怎么坐、什么礼仪不能犯、25个值得去的地方、以及在哪里买什么最划算。但首尔最好的部分，永远是那些攻略里写不到的瞬间——一杯咖啡、一条小巷、一个陌生人的微笑。\n\n언제든지 서울에 오면, 토리가 기다리고 있을게요 🐰', textEn: 'Seoul, Tori is waiting for you\\n\\nAfter five chapters, you now know Seoul\'s eight neighborhoods, how to ride the subway, which etiquette to avoid, 25 places worth visiting, and where to get the best deals. But the best part of Seoul is always the moments no guidebook can capture—a cup of coffee, a quiet alley, a stranger\'s smile.\\n\\n언제든지 서울에 오면, 토리가 기다리고 있을게요 🐰',
    },
  ],
},
  {
  slug: 'korea-taboos',
  category: 'travel',
  title: '去韩国之前必须知道的文化禁忌', titleEn: 'Cultural taboos you must know before going to Korea',
  subtitle: '금기사항 — 这些事千万不能做', subtitleEn: '금기사항 — Things you absolutely must not do',
  emoji: '🚫',
  readMinutes: 12,
  bannerImage: '/images/banners/korea-taboos.webp',
  blocks: [
    {
      type: 'intro',
      text: '토리第一次去韩国，犯了好几个让自己事后很尴尬的错误——在饭桌上把碗端起来吃饭，在长辈面前直接喝酒，在北村大声说话……没有人当场纠正我，但토리 后来知道那些都是失礼的行为。这篇文章不是为了让你如履薄冰，而是让你在享受韩国的同时，不会在不知情的情况下冒犯别人。知道这些规则，旅行会更自在 🙏', textEn: 'On Tori\'s first trip to Korea, she made several mistakes that left her embarrassed afterward—picking up her bowl at the table, drinking directly in front of elders, speaking loudly in Bukchon... No one corrected her on the spot, but Tori later learned these were all rude behaviors. This article isn\'t meant to make you walk on eggshells, but to help you enjoy Korea without unknowingly offending others. Knowing these rules will make your trip more comfortable 🙏',
    },
    {
      type: 'sectionTitle', emoji: '🍽️', title: '饮食场合——餐桌上的禁忌最多', titleEn: 'Dining etiquette—the most taboos happen at the table',
      sub: '和韩国人一起吃饭时，这些细节很重要', subEn: 'When eating with Koreans, these details matter',
    },
    {
      type: 'featureCard', emoji: '🥣', title: '不要把碗端起来吃饭', titleEn: 'Don\'t pick up your bowl to eat',
      desc: '在中国，端碗吃饭很正常；在日本，端碗是礼仪。但在韩国，把碗端起来吃饭看起来像"乞讨的姿态"，是非常失礼的行为。\n\n❌ 错误：把饭碗或汤碗端起来，低着头吃\n✓ 正确：碗放在桌上，用勺子将食物送入口中，或低头就着桌上的碗吃', descEn: 'In China, holding your bowl up to eat is normal; in Japan, it\'s proper etiquette. But in Korea, picking up your bowl looks like a "begging posture" and is very rude.\\n\\n❌ Wrong: Lifting your rice or soup bowl and eating with your head down\\n✓ Right: Keep the bowl on the table, use a spoon to bring food to your mouth, or lower your head to eat from the bowl on the table',
    },
    {
      type: 'featureCard', emoji: '⏳', title: '等长辈先动筷子再开始吃', titleEn: 'Wait for elders to start eating first',
      desc: '和韩国人一起吃饭，必须等年纪最长的人拿起勺子（또는 젓가락）之后，其他人才能开始吃。这是韩国儒家饮食礼仪的核心，违反了会让在场所有人感到不舒服。\n\n❌ 错误：食物一上来立刻开始吃，不管长辈有没有动\n✓ 正确：观察一下，等最年长的人先动了，再说"잘 먹겠습니다"然后开始吃', descEn: 'When eating with Koreans, you must wait for the eldest person to pick up their spoon (또는 젓가락) before others can start. This is the core of Korean Confucian dining etiquette, and violating it makes everyone at the table uncomfortable.\\n\\n❌ Wrong: Starting to eat as soon as food arrives, regardless of whether elders have begun\\n✓ Right: Observe, wait for the eldest to start, then say "잘 먹겠습니다" and begin eating',
    },
    {
      type: 'featureCard', emoji: '🥢', title: '筷子不能插进食物里', titleEn: 'Don\'t stick chopsticks upright in food',
      desc: '把筷子竖着插进米饭或食物里，是韩国祭祀时的专属做法——象征给逝去的人上供。在普通饭桌上这样做，是极其不吉利的禁忌，会让韩国人非常不安。\n\n❌ 绝对不行：把筷子竖直插进饭碗或菜里\n✓ 正确：筷子横放在筷子架上，或搭在碗沿，或放在桌上', descEn: 'Sticking chopsticks upright into rice or food is reserved for ancestral rites in Korea—it symbolizes offering food to the deceased. Doing this at a regular meal is an extremely inauspicious taboo that makes Koreans very uneasy.\\n\\n❌ Absolutely not: Sticking chopsticks vertically into your rice bowl or dishes\\n✓ Right: Lay chopsticks across the chopstick rest, on the bowl\'s rim, or on the table',
    },
    {
      type: 'toriQuote', label: '🐰 토리 说', labelEn: '🐰 Tori says',
      text: '이건 중국에서도 마찬가지예요. 한중일 모두 이 금기는 공통이에요. 음식에 젓가락을 꽂으면 안 된다는 건 동아시아 공통 문화예요.',
    },
    {
      type: 'featureCard', emoji: '🥂', title: '在长辈面前喝酒要侧身转头', titleEn: 'Turn your head when drinking in front of elders',
      desc: '在韩国长辈面前喝酒，不能正对着长辈仰头喝，要侧过身子转开头，用手遮一下再喝。这在韩剧里经常出现，是真实的礼仪，不是夸张。另外：不能给自己倒酒，要互相斟酌；接酒时要用双手或用一只手托住另一只手的手肘表示恭敬；长辈的杯子空了要主动添酒。', descEn: 'When drinking in front of Korean elders, you shouldn\'t face them directly and tilt your head back. Instead, turn your body and head to the side, covering your mouth with your hand as you drink. This appears often in K-dramas and is real etiquette, not an exaggeration. Also: don\'t pour your own drink—pour for each other; when receiving a drink, use both hands or support one elbow with the other hand to show respect; refill elders\' cups when they\'re empty.',
    },
    {
      type: 'highlight', variant: 'tip',
      title: '기억하세요',
      text: '한국의 음주 예절은 나이 서열을 중심으로 돌아가요. 술을 따르는 것도, 마시는 것도, 모두 나이 순서가 있어요. 외국인이라도 이 기본 예절을 지키면 한국 사람들이 굉장히 좋아해요.',
    },
    {
      type: 'featureCard', emoji: '🎁', title: '收到礼物不要当场拆开', titleEn: 'Don\'t open gifts right away',
      desc: '在中国收到礼物当场打开很正常，甚至是礼貌。但在韩国，当着送礼人的面立刻拆开礼物，有时会显得过于急切，缺乏含蓄。传统礼仪是先道谢收下，之后再打开。当然，现代韩国年轻人之间这个规矩已经不那么严格了——朋友之间当场拆开完全可以。但在正式场合、对长辈，或者商务礼品场合，等回去再开更稳妥。', descEn: 'In China, opening a gift on the spot is normal and even polite. But in Korea, tearing open a gift immediately in front of the giver can seem too eager and lacking in restraint. Traditional etiquette is to thank the giver, accept the gift, and open it later. Of course, this rule is less strict among modern Korean young people—opening gifts right away among friends is totally fine. But in formal settings, with elders, or for business gifts, it\'s safer to wait until you\'re home.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle', emoji: '🏙️', title: '公共场合——不要让人侧目', titleEn: 'In public—don\'t draw stares',
      sub: '韩国是高度重视公共秩序的社会', subEn: 'Korea is a society that places great importance on public order',
    },
    {
      type: 'featureCard', emoji: '🗣️', title: '公共场合不要大声喧哗', titleEn: 'Don\'t be loud in public places',
      desc: '韩国的公共场合（地铁、咖啡厅、图书馆、餐厅）整体音量偏低，大声说话会非常显眼，引来周围人侧目。这在首尔尤其明显——越是人多的地方，整体反而越安静。특히（特别是）북촌（北村）韩屋村这样的居住区，有专门的"조용히 해주세요（请保持安静）"标识，那里是真实居民的生活区域。\n\n❌ 避免：在地铁里大声打电话、在北村高声说笑、在咖啡厅外放视频音频\n✓ 正确：保持室内音量，电话小声说，看视频戴耳机', descEn: 'Public places in Korea (subways, cafes, libraries, restaurants) are generally quiet. Speaking loudly stands out and draws stares. This is especially true in Seoul—the more crowded a place, the quieter it gets. Residential areas like 북촌 (Bukchon) Hanok Village even have "조용히 해주세요 (Please be quiet)" signs, as real residents live there.\\n\\n❌ Avoid: Loud phone calls on the subway, loud chatting in Bukchon, playing videos/audio out loud in cafes\\n✓ Do: Keep indoor volume, speak softly on the phone, use headphones for videos',
    },
    {
      type: 'featureCard', emoji: '🚯', title: '不要随手乱扔垃圾', titleEn: 'Don\'t litter',
      desc: '韩国街头垃圾桶很少，这不是因为没人收垃圾，而是因为韩国推行"垃圾自带回家处理"的环保政策。在首尔街头随手丢垃圾，不只是不礼貌，被发现可以被处以罚款。处理方式：吃完街头小吃的包装，带到最近的편의점旁边的垃圾桶扔掉；或者带回酒店处理。', descEn: 'Trash cans are rare on Korean streets—not because no one collects trash, but because Korea promotes a "take your trash home" eco-policy. Littering in Seoul isn\'t just rude; if caught, you can be fined. What to do: Take street food wrappers to the trash can next to the nearest 편의점 (convenience store), or bring them back to your hotel.',
    },
    {
      type: 'toriQuote', label: '🐰 토리 说', labelEn: '🐰 Tori says',
      text: '토리의 방법：회오리감자나 떡볶이를 먹고 나면, 그 포장지를 들고 편의점을 찾아요. 편의점 앞에 항상 쓰레기통이 있거든요. 이게 서울에서 쓰레기를 버리는 가장 쉬운 방법이에요.',
    },
    {
      type: 'featureCard', emoji: '📸', title: '拍照前要确认——不是所有地方都能拍', titleEn: 'Check before taking photos—not everywhere is photo-friendly',
      desc: '韩国对拍照有几个需要注意的场景：北村住宅区的很多韩屋是真实住宅，不能对着别人家门口随意拍照，有"촬영 금지"标识的地方要遵守。部分高档商场和网红咖啡厅禁止商业拍摄，个人旅游照片通常没问题。在韩国拍陌生人（特别是近景）需要对方同意，韩国有专门针对偷拍的法律，处罚严厉。\n\n❌ 避免：对着北村居民家门口拍、未经同意拍陌生人特写、无视禁止拍摄标识\n✓ 正确：进入前先看有无禁止标识，拍人前微笑确认，街景和建筑随意拍', descEn: 'Korea has a few photo-related rules to note: Many hanok in Bukchon are real homes, so don\'t snap photos of people\'s doorways; respect areas with "촬영 금지 (No photography)" signs. Some upscale malls and trendy cafes ban commercial shoots, but personal travel photos are usually fine. In Korea, you need consent to photograph strangers (especially close-ups), and there are strict anti-voyeurism laws with heavy penalties.\\n\\n❌ Avoid: Photographing Bukchon residents\' doorways, close-ups of strangers without consent, ignoring no-photo signs\\n✓ Do: Check for signs before entering, smile and confirm before photographing people, freely shoot street scenes and buildings',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle', emoji: '🤝', title: '社交场合——和韩国人相处时', titleEn: 'Social situations—interacting with Koreans',
      sub: '这些细节决定对方对你的第一印象', subEn: 'These details shape their first impression of you',
    },
    {
      type: 'featureCard', emoji: '👋', title: '不要随便直呼名字', titleEn: 'Don\'t call people by name casually',
      desc: '在韩国，直接叫一个比你年长或职位高的人的名字（特别是不加任何称谓）是非常失礼的。应该用职位称谓（선생님/팀장님/사장님）、关系称谓（언니/오빠/선배）或加"씨"（先生/女士）。作为外国游客，遇到韩国人，称呼对方"성함이 어떻게 되세요?（请问怎么称呼您？）"然后用对方的姓+씨称呼，通常都是安全的。', descEn: 'In Korea, calling someone older or higher-ranking by their name (especially without any title) is very rude. Use job titles (선생님/팀장님/사장님), relationship terms (언니/오빠/선배), or add "씨" (Mr./Ms.). As a foreign visitor, ask "성함이 어떻게 되세요? (What\'s your name?)" and then use their surname + 씨—that\'s usually safe.',
    },
    {
      type: 'featureCard', emoji: '🤲', title: '用双手递送和接收物品', titleEn: 'Use both hands to give and receive items',
      desc: '给韩国人递东西（钱、卡、礼物、名片）或接东西，要用双手，或者右手递/接、左手扶住右前臂。单手递东西，特别是面对长辈，会显得不尊重。在便利店付钱时双手接找零，在餐厅接菜单时双手接，收到名片时双手接认真看一眼再放好，不要随手扔进口袋——这些都是韩国日常中真实有意义的细节。\n\n❌ 避免：单手递钱给收银台、接到名片随手揉进口袋\n✓ 正确：双手递接，名片认真看一秒再收好', descEn: 'When giving or receiving items (money, cards, gifts, business cards) from Koreans, use both hands, or use your right hand with your left supporting your right forearm. One-handed gestures, especially toward elders, seem disrespectful. At convenience stores, accept change with both hands; at restaurants, take menus with both hands; when receiving a business card, hold it with both hands, look at it briefly, and put it away properly—not just pocket it. These are real, meaningful daily details in Korea.\\n\\n❌ Avoid: Handing money one-handed at the register, crumpling a business card into your pocket\\n✓ Do: Give and receive with both hands, glance at the card for a second before storing it',
    },
    {
      type: 'featureCard', emoji: '🚪', title: '进门时让长辈先进', titleEn: 'Let elders enter first',
      desc: '进入餐厅、电梯、任何门口，应该请年长的人先进。韩国的长幼秩序在进出门这个细节上体现得很明显。抢先走进去，或者让门直接关上、没有为后面的人扶着门，都会被认为是没有礼貌。在电梯里，到了有长辈要下的楼层，应该先侧身让对方出去，而不是自己先冲出去。', descEn: 'When entering restaurants, elevators, or any doorway, let older people go first. Korea\'s age hierarchy is clear in this small detail. Rushing in ahead, or letting the door close without holding it for the person behind you, is considered impolite. In an elevator, when an elder needs to get off, step aside and let them exit first—don\'t rush out yourself.',
    },
    {
      type: 'featureCard', emoji: '🙅', title: '不要用手指着人', titleEn: 'Don\'t point at people',
      desc: '用食指指着一个人，在韩国是非常不礼貌的肢体语言，有攻击性和侮辱的含义。需要指向某人或某处时，用整个手掌朝向、或者用手肘方向示意。同样，呼唤别人时不要用食指弯曲勾动（在某些文化里这是"过来"的意思，但在韩国通常用于对动物），应该用整只手手心朝下挥动。', descEn: 'Pointing at someone with your index finger is very rude in Korea—it\'s seen as aggressive and insulting. When indicating a person or place, use your whole open palm or gesture with your elbow. Similarly, don\'t curl your index finger to beckon someone (in some cultures it means "come here," but in Korea it\'s usually for animals); instead, wave your whole hand with your palm facing down.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle', emoji: '🏯', title: '特定场所的注意事项', titleEn: 'Special places and their rules',
      sub: '这些地方有专属规则', subEn: 'These places have their own rules',
    },
    {
      type: 'paragraph', heading: '🏯 寺庙（사찰）参观礼仪', headingEn: '🏯 Temple (사찰) visiting etiquette',
      text: '首尔有多座著名寺庙，如조계사（曹溪寺）。参观时：进入大雄殿前脱鞋（会有指示牌）；在佛像面前拍照请保持静肃；不要随意触摸佛像和法器；穿着不要过于暴露（短裤、无袖可能不被允许入内）。部分寺庙提供"템플스테이（寺庙住宿体验）"，如果参与，有更严格的行为规范，工作人员会提前说明。', textEn: 'Seoul has several famous temples, like 조계사 (Jogyesa). When visiting: Take off your shoes before entering the main hall (signs will indicate); stay quiet when taking photos near Buddha statues; don\'t touch statues or ritual objects; avoid overly revealing clothing (shorts or sleeveless tops may not be allowed). Some temples offer "템플스테이 (temple stay)" programs, which have stricter rules—staff will explain them in advance.',
    },
    {
      type: 'paragraph', heading: '🏯 景福宫等宫殿参观', headingEn: '🏯 Visiting palaces like Gyeongbokgung',
      text: '参观宫殿时，穿着한복（韩服）可以免费入场——首尔各主要宫殿都有这个政策。主要宫殿附近有한복 대여점（韩服租借店），价格约15,000-30,000韩元，含饰品，拍照效果非常好。宫殿内禁止跑步、禁止在文物上攀爬和触摸，遵守参观区域划分。守卫仪式（수문장 교대식）每天有固定时间，可以免费观看，非常值得等待。', textEn: 'When visiting palaces, wearing 한복 (hanbok) gets you free entry—this applies at all major palaces in Seoul. Near the main palaces, you\'ll find 한복 대여점 (hanbok rental shops) for about 15,000–30,000 KRW, accessories included, and the photos turn out great. Inside the palaces, no running, no climbing on or touching artifacts, and stick to designated areas. The guard-changing ceremony (수문장 교대식) happens at set times daily, is free to watch, and is well worth waiting for.',
    },
    {
      type: 'paragraph', heading: '🛁 찜질방（汗蒸幕）', headingEn: '🛁 찜질방 (Jjimjilbang)',
      text: '찜질방是韩国特有的桑拿文化场所，男女分区入浴，公共区域混合。进入汤池区域必须裸体（只有公共区域穿提供的统一服装）。不能带手机进入浴室区域（有专用储物柜）；洗澡要认真，不只是泡一泡；不能在汤池里游泳或溅水；离开汤池要自己擦干再进入公共区域。这是韩国人真实的生活方式，不是表演给游客看的。', textEn: '찜질방 is a uniquely Korean sauna culture spot, with separate bathing areas for men and women and mixed common areas. You must be nude in the bath area (uniforms are provided only for common areas). No phones in the bath area (there are lockers); wash thoroughly, not just a quick soak; no swimming or splashing in the pools; dry off before re-entering the common area. This is how Koreans really live—not a show for tourists.',
    },
    { type: 'sectionBreak'},
    {
      type: 'sectionTitle', emoji: '📋', title: '禁忌快速对照表', titleEn: 'Quick taboo reference table',
      sub: '出发前30秒回顾一遍', subEn: 'Review once 30 seconds before departure',
    },
    {
      type: 'table',
      head: ['场景', '可以做 ✓', '不可以做 ✗'],
      rows: [
        ['吃饭时', '碗放桌上吃', '把碗端起来'],
        ['饭桌开始', '等长辈先动筷', '抢先开始吃'],
        ['放筷子', '横放在筷架或碗沿', '竖插进食物里'],
        ['喝酒', '长辈面前侧身转头喝', '正对长辈仰头喝'],
        ['递物品', '双手递接', '单手草率地递'],
        ['地铁里', '安静坐着/戴耳机', '大声打电话/外放音乐'],
        ['북촌', '安静参观，小声说话', '大声喧哗/对着民居拍照'],
        ['垃圾', '带到편의점旁垃圾桶扔', '随手丢在街上'],
        ['指人', '用整只手示意方向', '用食指指着人'],
        ['称呼他人', '用职位/씨/선배称呼', '直接叫长辈名字'],
      ],
    },
    {
      type: 'highlight', variant: 'tip',
      title: '💡 最重要的一句话', titleEn: '💡 The most important phrase',
      text: '做错了不要慌。韩国人对外国游客普遍非常包容，知道你不了解这些规则。最重要的是：如果你意识到自己做了不合适的事，真诚地说一句죄송합니다（对不起），对方几乎一定会微笑着说没关系。诚意比完美更重要。', textEn: 'Don\'t panic if you make a mistake. Koreans are generally very understanding of foreign tourists and know you\'re not familiar with these rules. The most important thing is: if you realize you\'ve done something inappropriate, sincerely say 죄송합니다 (sorry), and the other person will almost certainly smile and say it\'s fine. Sincerity matters more than perfection.',
    },
    {
      type: 'phraseList',
      title: '토리 教你说——道歉与礼貌用语', titleEn: 'Tori teaches you—apologies and polite phrases',
      sub: '点击 + 可加入你的词汇本', subEn: 'Tap + to add to your vocabulary list',
      items: [
        { ko: '죄송합니다.', ro: 'joe-song-ham-ni-da', scene: '🙏 正式道歉，万能', sceneEn: '🙏 Formal apology, all-purpose', zh: '非常抱歉', zhEn: 'I\'m very sorry' },
        { ko: '실례합니다.', ro: 'sil-lye-ham-ni-da', scene: '🚶 经过别人身旁时', sceneEn: '🚶 When passing by someone', zh: '打扰了 / 借过', zhEn: 'Excuse me / Coming through' },
        { ko: '사진 찍어도 될까요?', ro: 'sa-jin jji-geo-do doel-kka-yo?', scene: '📸 拍照前礼貌确认', sceneEn: '📸 Politely confirm before taking a photo', zh: '可以拍照吗？', zhEn: 'Can I take a photo?' },
        { ko: '감사합니다. 잘 먹겠습니다.', ro: 'gam-sa-ham-ni-da. jal meok-get-sseum-ni-da', scene: '🍽️ 饭前感谢', sceneEn: '🍽️ Thanks before a meal', zh: '谢谢，我开动了', zhEn: 'Thank you, I\'ll dig in' },
        { ko: '몰랐어요. 앞으로 조심할게요.', ro: 'mol-ra-sseo-yo. ap-eu-ro jo-sim-hal-ge-yo', scene: '😅 做错了解释', sceneEn: '😅 Explaining a mistake', zh: '我不知道，以后会注意的', zhEn: 'I didn\'t know, I\'ll be careful from now on' },
        { ko: '조용히 해야 하는 곳인가요?', ro: 'jo-yong-hi hae-ya ha-neun got-in-ga-yo?', scene: '🔇 进入不确定的场所时', sceneEn: '🔇 When entering an uncertain place', zh: '这里需要保持安静吗？', zhEn: 'Do I need to keep quiet here?' },
      ],
    },
    {
      type: 'vocabList', title: '本篇出现的词汇', titleEn: 'Vocabulary in this lesson',
      items: [
        { ko: '예의', zh: '礼仪', zhEn: 'etiquette' },
        { ko: '죄송합니다', zh: '非常抱歉', zhEn: 'I\'m very sorry' },
        { ko: '실례합니다', zh: '打扰了', zhEn: 'Excuse me' },
        { ko: '어른', zh: '长辈·成人', zhEn: 'Elders · Adults' },
        { ko: '촬영 금지', zh: '禁止拍照', zhEn: 'No photos' },
        { ko: '조용히', zh: '安静地', zhEn: 'Quietly' },
        { ko: '쓰레기통', zh: '垃圾桶', zhEn: 'Trash can' },
        { ko: '한복', zh: '韩服', zhEn: 'Hanbok (traditional Korean clothing)' },
        { ko: '찜질방', zh: '汗蒸幕', zhEn: 'Jjimjilbang (sauna)' },
        { ko: '사찰', zh: '寺庙', zhEn: 'Temple' },
        { ko: '금기', zh: '禁忌', zhEn: 'taboo' },
        { ko: '몰랐어요', zh: '我不知道', zhEn: 'I don\'t know' },
      ],
    },
    {
      type: 'ending',
      text: '这些禁忌不是束缚，是帮你真正进入韩国文化的钥匙。知道这些的你，会比不知道的人更被韩国人接受和喜爱。旅行最美的事，是在他人的规则里找到真正的连接。', textEn: 'These taboos aren\'t restrictions—they\'re keys to truly entering Korean culture. Knowing them, you\'ll be more accepted and loved by Koreans than those who don\'t. The most beautiful part of travel is finding genuine connection within others\' rules.',
      next: { slug: 'seoul-25-places', title: '首尔必去25个地方', titleEn: '25 Must-Visit Places in Seoul' },
    },
  ],
},
];

export function getKnowledgeArticle(slug: string): KnowledgeArticle | null {
  return knowledgeArticles.find((a) => a.slug === slug) ?? null;
}
