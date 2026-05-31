// ── Korea Culture Data ──────────────────────────────────────────

export interface CultureItem {
  id: string;
  title: string;
  titleKo: string;
  description: string;
  emoji: string;
  tags: string[];
  relatedWords?: { word: string; meaning: string }[];
  updatedAt?: string;
  source?: string;
}

export interface HistoryPeriod {
  id: string;
  name: string;
  nameKo: string;
  years: string;
  description: string;
  emoji: string;
  keyEvents: string[];
  relatedWords: { word: string; meaning: string }[];
  updatedAt?: string;
  source?: string;
}

export interface TravelCity {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  emoji: string;
  attractions: { name: string; nameKo: string; desc: string }[];
  phrases: { ko: string; zh: string }[];
  updatedAt?: string;
  source?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  emoji: string;
  category: 'main' | 'side' | 'soup' | 'snack' | 'drink' | 'dessert';
  phrases: { ko: string; zh: string }[];
  ingredients: string[];
  updatedAt?: string;
  source?: string;
}

// ── Culture ─────────────────────────────────────────────────────
export const cultureItems: CultureItem[] = [
  {
    id: 'c-01', title: '韩服', titleKo: '한복', emoji: '👘',
    description: '韩服是韩国传统服饰，以线条优美、色彩艳丽著称。女性韩服由短上衣(저고리)和高腰裙(치마)组成，男性由短上衣和宽松裤(바지)组成。现代韩服在生活中较少穿着，但在节日(설날, 추석)、婚礼等重要场合仍有穿着传统。',
    tags: ['传统', '服饰', '节日'],
    updatedAt: '2026-05-30', source: '韩国文化财厅',
    relatedWords: [
      { word: '한복', meaning: '韩服' },
      { word: '저고리', meaning: '短上衣' },
      { word: '치마', meaning: '裙子' },
      { word: '설날', meaning: '春节' },
      { word: '추석', meaning: '中秋节' },
    ],
  },
  {
    id: 'c-02', title: '韩文节', titleKo: '한글날', emoji: '📜',
    description: '每年10月9日是韩文节(한글날)，纪念世宗大王于1443年创制训民正音(훈민정음)。韩文被公认为世界上最科学的文字之一，其字母形状模仿发音器官。韩国是唯一一个为文字设立国定假日的国家。',
    tags: ['节日', '文字', '历史'],
    updatedAt: '2026-05-30', source: '国立韩文博物馆',
    relatedWords: [
      { word: '한글날', meaning: '韩文节' },
      { word: '세종대왕', meaning: '世宗大王' },
      { word: '훈민정음', meaning: '训民正音' },
    ],
  },
  {
    id: 'c-03', title: '春节（韩国）', titleKo: '설날', emoji: '🎊',
    description: '※ 春节起源于中国，后传入朝鲜半岛并本土化。在韩国，설날（农历1月1日）是重要传统节日之一。韩国人穿韩服、祭祀祖先(차례)、吃年糕汤(떡국)、给长辈拜年(세배)、玩传统游戏如掷柶(윷놀이)。韩国的春节习俗与中国有所不同，如吃年糕汤（而非饺子）、行礼方式等体现了韩民族特色。',
    tags: ['节日', '传统', '美食', '源自中国'],
    updatedAt: '2026-05-30', source: '韩国民俗博物馆',
    relatedWords: [
      { word: '설날', meaning: '春节（韩式）' },
      { word: '세배', meaning: '韩式拜年' },
      { word: '떡국', meaning: '年糕汤（春节食物）' },
      { word: '윷놀이', meaning: '掷柶游戏' },
      { word: '세뱃돈', meaning: '压岁钱' },
    ],
  },
  {
    id: 'c-04', title: '秋夕（韩国）', titleKo: '추석', emoji: '🌕',
    description: '※ 秋夕的农耕祭祖传统在古代东亚农耕文化圈中普遍存在，中国的中秋节与韩国的秋夕在农历8月15日这一时间点重合，但各自发展出不同的习俗。韩国的추석是感恩丰收、祭拜祖先的节日，家人团聚制作松饼(송편)、扫墓(성묘)、跳圆圈舞(강강술래)，具有独特的韩民族特色。',
    tags: ['节日', '传统', '美食', '家庭', '东亚共有'],
    updatedAt: '2026-05-30', source: '韩国民俗博物馆',
    relatedWords: [
      { word: '추석', meaning: '秋夕（韩式中秋）' },
      { word: '송편', meaning: '松饼（秋夕食物）' },
      { word: '성묘', meaning: '扫墓' },
      { word: '강강술래', meaning: '圆圈舞（韩国非遗）' },
    ],
  },
  {
    id: 'c-05', title: 'K-POP', titleKo: '케이팝', emoji: '🎵',
    description: 'K-POP是韩国流行音乐，自90年代开始蓬勃发展，21世纪通过BTS、BLACKPINK等团体风靡全球。K-POP以精良的制作、同步的群舞(칼군무)、华丽的MV和粉丝文化(팬덤)著称。韩流(한류)不仅包括音乐，还涵盖了韩剧、电影、美妆、时尚等领域。',
    tags: ['现代', '音乐', '娱乐'],
    updatedAt: '2026-05-30', source: '韩国文化产业振兴院',
    relatedWords: [
      { word: '케이팝', meaning: 'K-POP' },
      { word: '한류', meaning: '韩流' },
      { word: '칼군무', meaning: '刀群舞' },
      { word: '팬덤', meaning: '粉丝圈' },
      { word: '아이돌', meaning: '偶像' },
    ],
  },
  {
    id: 'c-06', title: '韩国年龄', titleKo: '한국 나이', emoji: '🎂',
    description: '韩国传统年龄算法比较特别：出生即算1岁，每年1月1日（非生日）增加1岁。所以12月31日出生的婴儿次日就变成2岁。从2023年6月起，韩国正式在行政和法律上改用国际年龄算法（만 나이），但日常对话中"韩国年龄"的习惯仍很普遍。',
    tags: ['社会', '习俗'],
    updatedAt: '2026-05-30', source: '韩国法制处',
    relatedWords: [
      { word: '나이', meaning: '年龄' },
      { word: '만 나이', meaning: '满岁/国际年龄' },
      { word: '생일', meaning: '生日' },
      { word: '빠른 년생', meaning: '早年生（1-2月出生，与上年同级）' },
    ],
  },
  {
    id: 'c-07', title: '韩国礼仪', titleKo: '한국 예절', emoji: '🙇',
    description: '韩国是礼仪之邦(동방예의지국)。鞠躬是最基本的问候方式，度数越深表示越尊重。与长辈喝酒时要侧身转头。递接物品用双手或右手托左臂。进韩国家庭要脱鞋。在公共交通工具上不占用老弱病残孕专座(교통약자석)。',
    tags: ['礼仪', '社会'],
    updatedAt: '2026-05-30', source: '韩国文化观光研究院',
    relatedWords: [
      { word: '예절', meaning: '礼仪' },
      { word: '존댓말', meaning: '敬语' },
      { word: '인사', meaning: '问候' },
      { word: '절', meaning: '鞠躬/磕头' },
    ],
  },
  {
    id: 'c-08', title: '汗蒸房', titleKo: '찜질방', emoji: '🧖',
    description: '汗蒸房(찜질방)是韩国特有的大众洗浴休息场所。有不同温度的汗蒸房（如盐房、黄土房、冰房），配备公共休息区、食堂和游戏区。韩国人常常和朋友、家人甚至约会去汗蒸房。必吃美食：烤鸡蛋(구운 계란)和甜米露(식혜)，必做造型：羊角毛巾头巾(양머리)。',
    tags: ['生活', '休闲'],
    updatedAt: '2026-05-30', source: '韩国观光公社',
    relatedWords: [
      { word: '찜질방', meaning: '汗蒸房' },
      { word: '구운 계란', meaning: '烤鸡蛋' },
      { word: '식혜', meaning: '甜米露' },
      { word: '양머리', meaning: '羊角毛巾' },
    ],
  },
];

// ── History ─────────────────────────────────────────────────────
export const historyPeriods: HistoryPeriod[] = [
  {
    id: 'h-01', name: '古朝鲜', nameKo: '고조선', years: '公元前2333年 - 公元前108年', emoji: '🏛️',
    description: '古朝鲜(고조선)是韩国历史上第一个王朝，由檀君(단군)建立。据《三国遗事》记载，檀君是天神桓因之子桓雄与熊女所生。公元前108年被中国汉朝灭亡，随后进入原三国时代。',
    keyEvents: ['檀君建国 (BC 2333)', '箕子朝鲜 (BC 1122)', '卫满朝鲜 (BC 194)', '汉四郡建立 (BC 108)'],
    relatedWords: [
      { word: '고조선', meaning: '古朝鲜' },
      { word: '단군', meaning: '檀君' },
      { word: '개국', meaning: '建国' },
    ],
  },
  {
    id: 'h-02', name: '三国时代', nameKo: '삼국시대', years: '公元前57年 - 公元668年', emoji: '⚔️',
    description: '三国时代是高句丽(고구려)、百济(백제)、新罗(신라)三足鼎立的时期。高句丽占据北部及满洲，军事实力最强；百济在西南部，以精美的文化和工艺著称；新罗在东南部，最终联合唐朝统一了韩半岛。',
    keyEvents: ['高句丽建国 (BC 37)', '百济建国 (BC 18)', '新罗建国 (BC 57)', '新罗统一三国 (668)'],
    relatedWords: [
      { word: '삼국시대', meaning: '三国时代' },
      { word: '고구려', meaning: '高句丽' },
      { word: '백제', meaning: '百济' },
      { word: '신라', meaning: '新罗' },
    ],
  },
  {
    id: 'h-03', name: '统一新罗', nameKo: '통일신라', years: '668年 - 935年', emoji: '👑',
    description: '新罗联合唐朝灭亡了高句丽和百济后，统一了大同江以南的韩半岛。这一时期佛教文化达到鼎盛，建造了佛国寺(불국사)和石窟庵(석굴암)等世界文化遗产。骨品制(골품제)的等级制度限制了社会流动。',
    keyEvents: ['新罗统一 (668)', '佛国寺建造 (751)', '石窟庵建造 (774)', '后三国分裂 (892)'],
    relatedWords: [
      { word: '통일신라', meaning: '统一新罗' },
      { word: '불국사', meaning: '佛国寺' },
      { word: '석굴암', meaning: '石窟庵' },
      { word: '골품제', meaning: '骨品制' },
    ],
  },
  {
    id: 'h-04', name: '高丽', nameKo: '고려', years: '918年 - 1392年', emoji: '🏯',
    description: '高丽(고려)由王建(왕건)建立，国号"Korea"即源自"高丽"。高丽以佛教为国教，制作了高丽大藏经(팔만대장경)和青瓷(청자)。后期受蒙古(元朝)控制，最终被李成桂推翻建立朝鲜。',
    keyEvents: ['王建建国 (918)', '高丽大藏经制作 (1236-1251)', '青瓷鼎盛 (12世纪)', '李成桂易姓革命 (1392)'],
    relatedWords: [
      { word: '고려', meaning: '高丽' },
      { word: '청자', meaning: '青瓷' },
      { word: '팔만대장경', meaning: '八万大藏经' },
    ],
  },
  {
    id: 'h-05', name: '朝鲜', nameKo: '조선', years: '1392年 - 1910年', emoji: '📖',
    description: '朝鲜王朝(조선)以儒教(유교)立国，持续了518年，是韩国历史上最长的王朝。世宗大王创制了训民正音(한글)。经历了壬辰倭乱(임진왜란, 1592-1598)、丙子胡乱(병자호란, 1636-1637)等外侵。后期实行锁国政策(Hermit Kingdom)。',
    keyEvents: ['李成桂建国 (1392)', '世宗创制训民正音 (1443)', '壬辰倭乱 (1592-1598)', '丙子胡乱 (1636)', '甲午更张 (1894)'],
    relatedWords: [
      { word: '조선', meaning: '朝鲜' },
      { word: '유교', meaning: '儒教' },
      { word: '임진왜란', meaning: '壬辰倭乱' },
      { word: '세종대왕', meaning: '世宗大王' },
    ],
  },
  {
    id: 'h-06', name: '日据时期', nameKo: '일제강점기', years: '1910年 - 1945年', emoji: '🕊️',
    description: '1910年日本吞并韩国，开始了35年的殖民统治。期间韩国人民发起三一独立运动(3.1운동, 1919年)，建立了大韩民国临时政府(대한민국 임시정부, 1919年，上海)。1945年8月15日日本投降后韩国光复(광복)。',
    keyEvents: ['韩日合并 (1910)', '三一运动 (1919.3.1)', '临时政府成立 (1919)', '光复 (1945.8.15)'],
    relatedWords: [
      { word: '일제강점기', meaning: '日据时期' },
      { word: '삼일운동', meaning: '三一运动' },
      { word: '광복', meaning: '光复' },
      { word: '독립', meaning: '独立' },
    ],
  },
  {
    id: 'h-07', name: '大韩民国', nameKo: '대한민국', years: '1948年 - 至今', emoji: '🇰🇷',
    description: '1948年大韩民国政府成立。1950-1953年经历了韩国战争(한국전쟁)，此后韩国创造了举世瞩目的"汉江奇迹"(한강의 기적)，从战后废墟迅速发展为世界经济强国。1987年实现民主化(민주화)，如今韩国在科技、文化、经济等领域都处于世界前列。',
    keyEvents: ['大韩民国政府成立 (1948.8.15)', '韩国战争 (1950-1953)', '4.19革命 (1960)', '5.18光州民主化运动 (1980)', '6月民主抗争 (1987)', '汉江奇迹 (1960s-1990s)', '韩流兴起 (2000s)'],
    relatedWords: [
      { word: '대한민국', meaning: '大韩民国' },
      { word: '한국전쟁', meaning: '韩国战争' },
      { word: '한강의 기적', meaning: '汉江奇迹' },
      { word: '민주화', meaning: '民主化' },
    ],
  },
];

// ── Travel ──────────────────────────────────────────────────────
export const travelCities: TravelCity[] = [
  {
    id: 't-01', name: '首尔', nameKo: '서울', emoji: '🏙️',
    description: '首尔是韩国的首都和最大城市，拥有超过1000万人口。传统与现代在这里完美融合——景福宫(경복궁)紧邻现代摩天大楼，北村韩屋村(북촌한옥마을)的巷子通往咖啡馆林立的仁寺洞(인사동)。',
    attractions: [
      { name: '景福宫', nameKo: '경복궁', desc: '朝鲜王朝的正宫，建于1395年，每日有守门将换岗仪式(수문장 교대의식)' },
      { name: '北村韩屋村', nameKo: '북촌한옥마을', desc: '保留数百栋传统韩屋的住宅区，可远眺南山塔' },
      { name: '明洞', nameKo: '명동', desc: '首尔最繁华的购物区，美妆店、街头小吃、货币兑换齐全' },
      { name: '弘大', nameKo: '홍대', desc: '年轻人聚集的艺术街区，街头表演、独立咖啡厅、夜生活丰富' },
      { name: '南山塔', nameKo: '남산타워', desc: '首尔地标，挂情侣锁的浪漫场所，360度城市全景' },
    ],
    phrases: [
      { ko: '서울역이 어디예요?', zh: '首尔站在哪里？' },
      { ko: '경복궁에 가고 싶어요', zh: '我想去景福宫' },
      { ko: '이거 얼마예요?', zh: '这个多少钱？' },
      { ko: '명동에 어떻게 가요?', zh: '明洞怎么去？' },
    ],
  },
  {
    id: 't-02', name: '釜山', nameKo: '부산', emoji: '🌊',
    description: '韩国第二大城市和最大港口，以美丽的海滩、海鲜市场和国际电影节著称。釜山方言(부산 사투리)语调独特，相比首尔标准语更有抑扬顿挫。',
    attractions: [
      { name: '海云台', nameKo: '해운대', desc: '韩国最著名的海水浴场，夏季人山人海' },
      { name: '甘川文化村', nameKo: '감천문화마을', desc: '彩色房屋错落有致的山坡村庄，被称为"韩国的圣托里尼"' },
      { name: '札嘎其市场', nameKo: '자갈치시장', desc: '韩国最大的海鲜市场，可现场品尝活鱼生鱼片(회)' },
      { name: '广安里', nameKo: '광안리', desc: '以广安大桥夜景著称的海滩，浪漫约会胜地' },
    ],
    phrases: [
      { ko: '해운대 해수욕장에 가고 싶어요', zh: '我想去海云台海水浴场' },
      { ko: '회를 먹어 보고 싶어요', zh: '我想尝尝生鱼片' },
      { ko: '부산 갈매기', zh: '釜山海鸥（著名釜山歌曲）' },
    ],
  },
  {
    id: 't-03', name: '济州岛', nameKo: '제주도', emoji: '🏝️',
    description: '济州岛是韩国最大的岛屿，也是著名的蜜月胜地。以三多(风多、石头多、女人多)和三无(无乞丐、无小偷、无大门)著称。济州方言与大陆差异很大，有独特的海女(해녀)文化。',
    attractions: [
      { name: '汉拿山', nameKo: '한라산', desc: '韩国最高峰(1947m)，世界自然遗产，四季景色各异' },
      { name: '城山日出峰', nameKo: '성산일출봉', desc: '火山喷发形成的凝灰丘，日出绝景' },
      { name: '柱状节理带', nameKo: '주상절리대', desc: '火山熔岩冷却形成的六角形石柱群' },
      { name: '偶来小路', nameKo: '올레길', desc: '环绕济州海岸的徒步路线系统，共26条路线' },
    ],
    phrases: [
      { ko: '제주도에 신혼여행 왔어요', zh: '我来济州岛度蜜月' },
      { ko: '한라산 등반하고 싶어요', zh: '我想爬汉拿山' },
      { ko: '흑돼지 먹으러 가요', zh: '我们去吃黑猪肉吧' },
    ],
  },
  {
    id: 't-04', name: '庆州', nameKo: '경주', emoji: '🏛️',
    description: '"没有围墙的博物馆"——庆州是新罗王朝的千年古都，整个城市遍布联合国教科文组织世界遗产。春天的樱花、秋天的红叶与古墓群(고분군)交相辉映。',
    attractions: [
      { name: '佛国寺', nameKo: '불국사', desc: '新罗佛教艺术的巅峰之作，世界文化遗产' },
      { name: '石窟庵', nameKo: '석굴암', desc: '位于山顶的人造石窟，内有精美的释迦牟尼像' },
      { name: '瞻星台', nameKo: '첨성대', desc: '东方现存最古老的天文台，建于7世纪' },
      { name: '大陵苑', nameKo: '대릉원', desc: '新罗王陵群，天马冢(천마총)出土了天马图等国宝' },
    ],
    phrases: [
      { ko: '경주는 역사가 깊은 도시예요', zh: '庆州是历史悠久的城市' },
      { ko: '불국사가 정말 아름다워요', zh: '佛国寺真美' },
    ],
  },
];

// ── Food ────────────────────────────────────────────────────────
export const foodItems: FoodItem[] = [
  {
    id: 'f-01', name: '韩式烤肉', nameKo: '불고기/삼겹살', emoji: '🥩',
    category: 'main',
    description: '韩式烤肉是最具代表性的韩国料理。불고기(薄切调味烤牛肉)用酱油、梨汁、蒜、芝麻油等腌制后烤制，口感甜嫩。삼겹살(烤五花肉)则直接烤制后蘸酱(쌈장)包生菜吃(쌈)。',
    ingredients: ['牛肉(소고기)', '酱油(간장)', '梨(배)', '蒜(마늘)', '芝麻油(참기름)', '生菜(상추)'],
    phrases: [
      { ko: '삼겹살 2인분 주세요', zh: '请给我两人份五花肉' },
      { ko: '상추 더 주세요', zh: '请再给一些生菜' },
      { ko: '소주 한 병 주세요', zh: '请给我一瓶烧酒' },
    ],
  },
  {
    id: 'f-02', name: '拌饭', nameKo: '비빔밥', emoji: '🍚',
    category: 'main',
    description: '비빔밥（拌饭）是将各种蔬菜(나물)、肉、鸡蛋放在米饭上，加辣椒酱(고추장)拌匀食用。全州拌饭(전주비빔밥)最负盛名，用牛骨汤(육수)来拌饭增加风味。在石锅(돌솥)里做成的石锅拌饭底部有脆香的锅巴。',
    ingredients: ['米饭(밥)', '菠菜(시금치)', '豆芽(콩나물)', '胡萝卜(당근)', '鸡蛋(계란)', '辣椒酱(고추장)'],
    phrases: [
      { ko: '돌솥비빔밥 하나 주세요', zh: '请给我一份石锅拌饭' },
      { ko: '고추장 많이 주세요', zh: '请多给我一些辣椒酱' },
    ],
  },
  {
    id: 'f-03', name: '韩式炸鸡', nameKo: '치킨', emoji: '🍗',
    category: 'snack',
    description: '韩国炸鸡(치킨)文化全球知名——外酥里嫩，酱料多样：原味(후라이드)、甜辣酱(양념)、酱油味(간장)、蜂蜜黄油(허니버터)等。치맥(炸鸡+啤酒)是韩国最受欢迎的夜宵搭配。',
    ingredients: ['鸡(닭)', '面粉(밀가루)', '辣椒酱(고추장)', '蒜(마늘)', '花生(땅콩)'],
    phrases: [
      { ko: '치맥 먹으러 가요', zh: '我们去吃炸鸡啤酒吧' },
      { ko: '양념 반 후라이드 반 주세요', zh: '请一半调味一半原味' },
    ],
  },
  {
    id: 'f-04', name: '泡菜', nameKo: '김치', emoji: '🥬',
    category: 'side',
    description: '김치（泡菜）是韩国餐桌上不可或缺的配菜(반찬)，有超过200种。最常见的是辣白菜泡菜(배추김치)，用辣椒粉(고춧가루)、鱼露(젓갈)、蒜、姜等腌制发酵。富含乳酸菌，2013年"越冬泡菜文化(김장문화)"列入UNESCO非遗。',
    ingredients: ['白菜(배추)', '辣椒粉(고춧가루)', '鱼露(젓갈)', '蒜(마늘)', '姜(생강)', '萝卜(무)'],
    phrases: [
      { ko: '김치 더 주세요', zh: '请再加一些泡菜' },
      { ko: '김치찌개 하나 주세요', zh: '请给我一份泡菜汤' },
    ],
  },
  {
    id: 'f-05', name: '参鸡汤', nameKo: '삼계탕', emoji: '🍲',
    category: 'soup',
    description: '삼계탕（参鸡汤）是在整只童子鸡腹中塞入糯米(찹쌀)、人参(인삼)、红枣(대추)、蒜等，慢炖而成的滋补料理。韩国人在三伏天(복날, 一年中最热的日子)"以热治热(이열치열)"，排队吃参鸡汤补身体。',
    ingredients: ['童子鸡(영계)', '人参(인삼)', '糯米(찹쌀)', '红枣(대추)', '蒜(마늘)', '银杏(은행)'],
    phrases: [
      { ko: '삼계탕 하나 주세요', zh: '请给我一份参鸡汤' },
      { ko: '인삼을 더 넣어 주세요', zh: '请多加人参' },
    ],
  },
  {
    id: 'f-06', name: '紫菜包饭', nameKo: '김밥', emoji: '🍙',
    category: 'snack',
    description: '김밥（紫菜包饭）是用紫菜(김)将米饭、各种蔬菜、鸡蛋、火腿等卷起切段。与日本寿司不同，韩国紫菜包饭的米饭用芝麻油和盐调味（不加醋），口感更香醇，是野餐(소풍)和便当的必备。',
    ingredients: ['紫菜(김)', '米饭(밥)', '黄瓜(오이)', '鸡蛋(계란)', '火腿(햄)', '胡萝卜(당근)', '泡萝卜(단무지)'],
    phrases: [
      { ko: '김밥 한 줄 주세요', zh: '请给我一份紫菜包饭' },
      { ko: '소풍 갈 때 김밥 싸요', zh: '去野餐时包紫菜包饭' },
    ],
  },
  {
    id: 'f-07', name: '辣炒年糕', nameKo: '떡볶이', emoji: '🍢',
    category: 'snack',
    description: '떡볶이（辣炒年糕）是韩国最具代表性的街头小吃(길거리 음식)，在辣椒酱(고추장)调味的甜辣酱汁中煮入圆柱形年糕(가래떡)和鱼饼(어묵)。常在路边摊(포장마차)售卖，是韩国人的童年味道。',
    ingredients: ['年糕(떡)', '鱼饼(어묵)', '辣椒酱(고추장)', '辣椒粉(고춧가루)', '糖(설탕)', '葱(파)'],
    phrases: [
      { ko: '떡볶이 1인분 주세요', zh: '请给我一人份辣炒年糕' },
      { ko: '순대도 같이 주세요', zh: '也请给我米肠' },
    ],
  },
  {
    id: 'f-08', name: '韩式冷面', nameKo: '냉면', emoji: '🍜',
    category: 'main',
    description: '냉면（冷面）是朝鲜半岛北部发源的夏日料理，现已是全国性美食。평양냉면（平壤冷面）用荞麦面配牛肉汤(육수)，맛집（美食店）的水冷面要加醋和芥末酱。함흥냉면（咸兴冷面）则用红薯淀粉面配辣酱(양념장)拌匀吃。',
    ingredients: ['荞麦面(메밀)', '牛肉汤(육수)', '黄瓜(오이)', '梨(배)', '鸡蛋(계란)', '醋(식초)'],
    phrases: [
      { ko: '물냉면 하나 주세요', zh: '请给我一份水冷面' },
      { ko: '비빔냉면 하나 주세요', zh: '请给我一份拌冷面' },
    ],
  },
];

// ── Aggregated exports ──────────────────────────────────────────
export const allCultureItems = cultureItems;
export const allHistoryPeriods = historyPeriods;
export const allTravelCities = travelCities;
export const allFoodItems = foodItems;
