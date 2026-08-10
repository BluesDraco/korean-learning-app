/**
 * 兽尔动物城场景元数据 — practice/[slug] 页面消费
 *
 * 每个场景包含：
 * - slug (URL key)
 * - 韩文/中文名、icon、描述、难度
 * - NPC 信息（名字+emoji）
 * - 解锁条件（lockedDay 或 permanentLock）
 * - aiScenarioId（软关联到 src/data/aiScenarios.ts，强匹配 8 个）
 * - vocab/hints（场景练习辅助内容）
 *
 * 数据源：public/animal-city.html districts 数组（line 782-867）
 */

export type SceneStars = 1 | 2 | 3 | 4 | 5;

export interface SceneHint {
  [k: string]: unknown;
  zh: string;  // 中文行为描述（用户看意图）
  ko: string;  // 韩语可发送的候选句（点击后填入输入框）
}

// ── Preview（表达预习）四段结构 ──
export interface PreviewVocabExample {
  [k: string]: unknown;
  ko: string;
  cn: string;
}
export interface PreviewVocabItem {
  [k: string]: unknown;
  ko: string;
  cn: string;
  emoji?: string;
  rom?: string;
  example?: PreviewVocabExample;
  tip?: string;
  // ── v2 新增（可选，不填不影响旧数据）──
  pos?: 'noun' | 'verb' | 'adj' | 'expr' | 'counter' | 'adv';
  tier?: 'core' | 'useful' | 'bonus';
  tags?: string[];                                               // 使用时机，如 ['点单时']
  formal?: 'formal' | 'neutral' | 'casual';
  forms?: { label: string; ko: string }[];                      // 动词活用形
  hook?: string;                                                 // 记忆锚点
  confuse?: { ko: string; cn: string; diff: string };           // 易混词
}
export interface PreviewVocabGroup {
  [k: string]: unknown;
  title: string;
  items: PreviewVocabItem[];
  context?: string;  // 本组词的使用时机，如「点单选饮品时」
}
export type PatternRole = '主语' | '谓语' | '宾语' | '修饰';
export interface PatternBreakdownItem {
  [k: string]: unknown;
  role: PatternRole;
  text: string;      // 韩文片段
  meaning: string;   // 中文意思
}
export interface PreviewPatternSwap {
  [k: string]: unknown;
  slot: string;                                    // 原句中可替换的韩语片段
  options: KoCn[];           // 替换选项
}
export interface PreviewPattern {
  [k: string]: unknown;
  ko: string;
  cn: string;
  grammar?: string;
  breakdown?: PatternBreakdownItem[];
  tips?: string[];
  // ── v2 新增（可选）──
  when?: string;                                   // 使用时机
  formal?: 'formal' | 'neutral' | 'casual';
  swaps?: PreviewPatternSwap[];                    // 换词练习
  pitfall?: string;                                // ❌ 易错点
  upgrade?: KoCn;            // 更正式说法
  downgrade?: KoCn;          // 更随意说法
}

export interface SceneIntroFact {
  [k: string]: unknown;
  emoji: string;
  label: string;   // 类似 "78K+" / "1976" 简短数据
  desc: string;    // 说明 8-24 字
}
export interface SceneIntroCard {
  [k: string]: unknown;
  emoji: string;
  title: string;
  body: string;    // 一段 30-100 字介绍
}
export interface SceneIntroDidyouknow {
  [k: string]: unknown;
  q: string;   // 「你知道吗？」问句
  a: string;   // 揭晓答案
}
export interface SceneIntro {
  [k: string]: unknown;
  headline: string;    // 大标题
  lead: string;        // 引言 30-80 字
  facts: SceneIntroFact[];       // 3-4 个数据点
  cards: SceneIntroCard[];       // 3-4 张分主题卡
  didyouknow?: SceneIntroDidyouknow[]; // 2-3 条你知道吗
}
export interface PreviewResponse {
  [k: string]: unknown;
  npcKo: string; npcCn: string;   // 店员会问的
  userKo: string; userCn: string; // 你该怎么回（正确答案）
  distractors?: string[];         // 3 个错误干扰选项（韩语），用于 quiz
  /** 每个干扰选项对应的中文翻译（字面意思），用户点译按钮时和题目一起显示 */
  distractorCn?: string[];
  /** 每个错误选项一行中文解释，用于答后反馈 */
  distractorNotes?: string[];
  /** 正确答案为何合适的一句解释 */
  correctNote?: string;
}
export interface PreviewDialogueLine {
  [k: string]: unknown;
  role: 'npc' | 'user';
  ko: string;
  cn: string;
}
export interface PreviewDialogue {
  [k: string]: unknown;
  title: string;
  lines: PreviewDialogueLine[];
}
export interface PreviewCulturalTip {
  [k: string]: unknown;
  emoji: string;
  title: string;
  body: string;
}
/** AI 对话页 · 引导任务节点 */
export interface ChatTask {
  [k: string]: unknown;
  label: string;    // 中文任务名，如「点单」
  emoji: string;    // 一个 emoji
  hint: string;     // 一句话说明「此刻要说什么」
  suggestions: string[];  // 2-3 个韩语候选句，用户可一键填入
}

export interface ScenePreview {
  [k: string]: unknown;
  vocab: PreviewVocabGroup[];
  patterns: PreviewPattern[];
  responses: PreviewResponse[];
  dialogues: PreviewDialogue[];
  /** 开场页额外内容 */
  openingHighlights?: PreviewDialogueLine[]; // 3-4 条「你会说」预览
  culturalTips?: PreviewCulturalTip[];       // 2-3 条本地文化 tip
  /** 场景介绍页 · 学习兴趣激发 */
  sceneIntro?: SceneIntro;
  /** AI 对话页 · 任务引导节点（5 个左右）*/
  chatTasks?: ChatTask[];
}

export interface SceneLocation {
  [k: string]: unknown;
  slug: string;
  ko: string;
  cn: string;
  icon: string;
  desc: string;
  stars: SceneStars;
  districtId: 'transit' | 'life' | 'campus' | 'service' | 'culture' | 'predator' | 'city' | 'shadow';
  npcName: string;
  npcEmoji: string;
  lockedDay?: number;        // 最早解锁 Day；0/undefined 表示无解锁门槛
  permanentLock?: boolean;   // 永锁（如 시청/포식자 주점）
  aiScenarioId?: string;     // src/data/aiScenarios.ts 的 id（若强匹配）
  vocab: string[];           // 该场景核心词汇（最多 6-8 条）
  hints: SceneHint[];        // 韩语候选回应句 + 中文意图标签
  opening?: KoZh;  // AI 开场白（无 aiScenarioId 时必填）
  preview?: ScenePreview;    // 表达预习（可选，缺失时不显示 tabs）
}

export const sceneLocations: SceneLocation[] = [
  // ────── 01 交通枢纽 ──────
  {
    slug: 'incheon-airport', ko: '인공공항', cn: '仁爪机场', cnEn: 'Incheon Airport', icon: '✈️', stars: 2, districtId: 'transit',
    desc: '入境、问路、行李丢失、点餐', descEn: 'Arrival, asking directions, lost luggage, ordering food', npcName: '仙鹤空乘', npcNameEn: 'Crane flight attendant', npcEmoji: '🦢', lockedDay: 2,
    vocab: ['짐', '집', '여권', '환영합니다', '어디예요'],
    hints: [
      { zh: '问行李在哪取', zhEn: 'Ask where to pick up luggage', ko: '짐은 어디서 찾아요?' },
      { zh: '说自己来自中国', zhEn: 'Say you\'re from China', ko: '저는 중국에서 왔어요.' },
      { zh: '出关问出口方向', zhEn: 'Ask for the exit direction after customs', ko: '출구가 어디예요?' },
    ],
    opening: { ko: '인공공항에 오신 것을 환영합니다. 짐 찾으시려고요?', zh: '欢迎来到仁爪机场，要找行李吗？', zhEn: 'Welcome to Incheon Airport, looking for your luggage?' },
  },
  {
    slug: 'subway-station', ko: '지하철역', cn: '地铁站', cnEn: 'subway station', icon: '🚇', stars: 3, districtId: 'transit',
    desc: '办T-money卡、问路、被问路、紧急求助', descEn: 'Getting a T-money card, asking directions, being asked for directions, emergency help', npcName: '猫头鹰售票员', npcNameEn: 'Owl Ticket Clerk', npcEmoji: '🦉', lockedDay: 7,
    aiScenarioId: 'subway',
    vocab: ['카드', '충전', '몇 호선', '환승', '도와주세요'],
    hints: [
      { zh: '办张 T-money 卡', zhEn: 'Get a T-money card', ko: '티머니 카드 하나 만들어 주세요.' },
      { zh: '问换乘几号线', zhEn: 'Ask which line to transfer to', ko: '몇 호선으로 환승해요?' },
      { zh: '充值一万元', zhEn: 'Recharge 10,000 won', ko: '만 원 충전해 주세요.' },
    ],
    opening: { ko: '안녕하세요. 어떻게 도와드릴까요?', zh: '你好，需要什么帮助？', zhEn: 'Hello, how can I help you?' },
  },
  {
    slug: 'bus-terminal', ko: '버스터미널', cn: '巴士总站', cnEn: 'Bus Terminal', icon: '🚌', stars: 2, districtId: 'transit',
    desc: '买票、问目的地、确认班次', descEn: 'Buying tickets, asking for destinations, confirming schedules', npcName: '猫头鹰售票员', npcNameEn: 'Owl Ticket Clerk', npcEmoji: '🦉',
    vocab: ['표', '편도', '왕복', '몇 시', '얼마예요'],
    hints: [
      { zh: '买一张去釜山的票', zhEn: 'Buy a ticket to Busan', ko: '부산 가는 표 한 장 주세요.' },
      { zh: '问下班车几点', zhEn: 'Ask when the next bus leaves', ko: '다음 차 몇 시예요?' },
      { zh: '问票价', zhEn: 'Asking about the fare', ko: '편도 얼마예요?' },
    ],
    opening: { ko: '어디 가세요?', zh: '您去哪里？', zhEn: 'Where are you headed?' },
  },
  {
    slug: 'suul-station', ko: '수울역', cn: '兽尔站', cnEn: 'Seoul Station', icon: '🚄', stars: 3, districtId: 'transit',
    desc: '选座、和邻座聊天、看时刻表', descEn: 'Choosing seats, chatting with seatmate, checking the timetable', npcName: '海豹奶奶', npcNameEn: 'Grandma Seal', npcEmoji: '🦭',
    vocab: ['창가', '복도', '자리', '여기 앉아도 돼요'],
    hints: [
      { zh: '问能否坐这里', zhEn: 'Ask if you can sit here', ko: '여기 앉아도 돼요?' },
      { zh: '和邻座搭话', zhEn: 'Strike up a conversation with your seatmate', ko: '어디까지 가세요?' },
      { zh: '看时刻表询问', zhEn: 'Check the timetable and ask', ko: '이 기차 부산 가는 거 맞아요?' },
    ],
    opening: { ko: '아이고, 여기 앉아도 돼요?', zh: '哎呀，能坐这里吗？', zhEn: 'Oh, can I sit here?' },
  },

  // ────── 02 生活街区 ──────
  {
    slug: 'cu-mart', ko: 'CU 편의점', cn: 'CU便利店', cnEn: 'CU Convenience Store', icon: '🏪', stars: 1, districtId: 'life',
    desc: '买饭团、结账、问有没有袋子', descEn: 'Buying rice balls, checking out, asking for a bag', npcName: '考拉店员', npcNameEn: 'Koala barista', npcEmoji: '🐨', lockedDay: 9,
    aiScenarioId: 'convenience',
    vocab: ['삼각김밥', '주세요', '봉투', '얼마예요', '카드'],
    hints: [
      { zh: '买三角饭团', zhEn: 'Buy a triangle rice ball', ko: '삼각김밥 하나 주세요.' },
      { zh: '问总共多少钱', zhEn: 'How much is it in total?', ko: '다 해서 얼마예요?' },
      { zh: '要塑料袋', zhEn: 'I\'d like a plastic bag, please.', ko: '봉투 하나 주세요.' },
    ],
    opening: { ko: '안녕하세요! 뭐 드릴까요?', zh: '你好！请问要什么？', zhEn: 'Hi! What can I get for you?' },
  },
  {
    slug: 'haru-cafe', ko: '하루 카페', cn: '咖啡馆', cnEn: 'cafe', icon: '☕', stars: 3, districtId: 'life',
    desc: '点单、打工面试、做咖啡、听订单', descEn: 'Ordering, job interview, making coffee, taking orders', npcName: '金毛店员', npcNameEn: 'Golden retriever barista', npcEmoji: '🐕', lockedDay: 14,
    aiScenarioId: 'cafe',
    vocab: ['아메리카노', '라떼', '아이스', '뜨거운', '사이즈'],
    hints: [
      { zh: '点一杯冰美式', zhEn: 'I\'ll have an iced Americano.', ko: '아이스 아메리카노 한 잔 주세요.' },
      { zh: '问有没有 wifi', zhEn: 'Do you have Wi-Fi?', ko: '여기 와이파이 돼요?' },
      { zh: '加一份糖浆', zhEn: 'Add a shot of syrup.', ko: '시럽 좀 추가해 주세요.' },
    ],
    opening: { ko: '안녕하세요. 주문하시겠어요?', zh: '你好，要点单吗？', zhEn: 'Hi, are you ready to order?' },
  },
  {
    slug: 'hanbit-dorm', ko: '한빛 기숙사', cn: '宿舍', cnEn: 'dormitory', icon: '🏠', stars: 1, districtId: 'life',
    desc: '入住登记、和邻居聊天、借东西', descEn: 'Check-in, chatting with neighbors, borrowing things', npcName: '浣熊宿管', npcNameEn: 'Raccoon Dorm Manager', npcEmoji: '🦝', lockedDay: 4,
    vocab: ['방', '키', '룸메이트', '와이파이'],
    hints: [
      { zh: '办理入住', zhEn: 'Check in, please.', ko: '오늘 입주하러 왔어요.' },
      { zh: '问 wifi 密码', zhEn: 'What\'s the Wi-Fi password?', ko: '와이파이 비밀번호가 뭐예요?' },
      { zh: '借一下吹风机', zhEn: 'Can I borrow a hairdryer?', ko: '드라이기 좀 빌릴 수 있어요?' },
    ],
    opening: { ko: '어서 오세요. 처음 오시는 거죠?', zh: '欢迎，第一次来对吧？', zhEn: 'Welcome, first time here, right?' },
  },
  {
    slug: 'bakery', ko: '베이커리', cn: '烘焙店', cnEn: 'Bakery', icon: '🥐', stars: 2, districtId: 'life',
    desc: '买面包、问口味、预订蛋糕', descEn: 'Buying bread, asking about flavors, ordering cakes', npcName: '袋鼠阿姨', npcNameEn: 'Auntie Kangaroo.', npcEmoji: '🦘',
    vocab: ['빵', '맛있어요', '추천', '예약', '크림'],
    hints: [
      { zh: '问哪个面包好吃', zhEn: 'Which bread is good?', ko: '어떤 빵이 제일 맛있어요?' },
      { zh: '预订生日蛋糕', zhEn: 'I\'d like to order a birthday cake.', ko: '생일 케이크 예약하고 싶어요.' },
      { zh: '要两个甜甜圈', zhEn: 'I\'ll take two donuts.', ko: '도넛 두 개 주세요.' },
    ],
    opening: { ko: '오늘 빵 새로 나왔어요. 뭐 드릴까요?', zh: '今天有新出的面包，要什么？', zhEn: 'We have new bread today—what would you like?' },
  },
  {
    slug: 'hongkong-street', ko: '홍공거리', cn: '弘爪街', cnEn: 'Hongjwa Street', icon: '🌃', stars: 4, districtId: 'life',
    desc: '追星、赶路、小巷问路、生카点单', descEn: 'Fan-chasing, rushing, asking for directions in alleys, ordering at a street stall', npcName: '鹿店员', npcNameEn: 'Deer staff member', npcEmoji: '🦌', lockedDay: 23,
    vocab: ['생카', '응원봉', '팬', '빨리', '어느 쪽'],
    hints: [
      { zh: '问演唱会场地怎么走', zhEn: 'How do I get to the concert venue?', ko: '콘서트장이 어느 쪽이에요?' },
      { zh: '问哪里有应援棒卖', zhEn: 'Where can I buy light sticks?', ko: '응원봉 어디서 팔아요?' },
      { zh: '赶时间快速点单', zhEn: 'Quick order when in a hurry', ko: '빨리 되는 거로 주세요.' },
    ],
    opening: { ko: '오늘 무슨 일 있어요? 사람 많네요.', zh: '今天有什么活动？人这么多。', zhEn: 'What\'s happening today? It\'s so crowded.' },
  },
  {
    slug: 'paws-mall', ko: 'PAWS MALL', cn: 'PAWS购物中心', cnEn: 'PAWS Shopping Mall', icon: '🛍️', stars: 3, districtId: 'life',
    desc: '购物、试衣、结账、退换货', descEn: 'Shopping, trying on clothes, checking out, returns and exchanges', npcName: '熊店员', npcNameEn: 'Bear staff member', npcEmoji: '🐻',
    vocab: ['입어 봐도 돼요', '사이즈', '계산', '환불', '다른 색'],
    hints: [
      { zh: '问能否试穿', zhEn: 'Ask if you can try it on', ko: '이거 입어 봐도 돼요?' },
      { zh: '要小一号的', zhEn: 'Ask for a smaller size', ko: '한 사이즈 작은 거 있어요?' },
      { zh: '问能不能退货', zhEn: 'Ask if you can return it', ko: '환불 돼요?' },
    ],
    opening: { ko: '필요한 거 있으세요?', zh: '需要什么吗？', zhEn: 'Can I help you with anything?' },
  },
  {
    slug: 'daiso', ko: '다이소', cn: '日用品店', cnEn: 'Daily goods store', icon: '🧴', stars: 2, districtId: 'life',
    desc: '买生活用品、이거/그거/저거练习', descEn: 'Buy daily necessities, practice 이거/그거/저거', npcName: '羊店员', npcNameEn: 'Sheep clerk', npcEmoji: '🐑', lockedDay: 11,
    vocab: ['이거', '그거', '저거', '얼마', '있어요'],
    hints: [
      { zh: '指物品问价', zhEn: 'Point at an item and ask the price', ko: '이거 얼마예요?' },
      { zh: '问有没有牙刷', zhEn: 'Ask if they have a toothbrush', ko: '칫솔 있어요?' },
      { zh: '问"那个"在哪', zhEn: 'Ask where "that" is', ko: '저거 어디 있어요?' },
    ],
    opening: { ko: '어서 오세요. 찾으시는 거 있으세요?', zh: '欢迎光临，在找什么吗？', zhEn: 'Welcome! Are you looking for something?' },
  },
  {
    slug: 'stationery', ko: '문구점', cn: '文具店', cnEn: 'Stationery store', icon: '✏️', stars: 2, districtId: 'life',
    desc: '买文具、问价格、만원发音挑战', descEn: 'Buy stationery, ask prices, 만원 pronunciation challenge', npcName: '羊店员', npcNameEn: 'Sheep clerk', npcEmoji: '🐑', lockedDay: 12,
    vocab: ['볼펜', '노트', '만 원', '얼마', '저거'],
    hints: [
      { zh: '买圆珠笔和笔记本', zhEn: 'Buy a ballpoint pen and a notebook', ko: '볼펜이랑 노트 주세요.' },
      { zh: '问万元的发音', zhEn: 'Ask how to pronounce 만원', ko: '이거 만 원 맞아요?' },
      { zh: '问那个文件夹多少钱', zhEn: 'Ask how much that folder is', ko: '저 파일 얼마예요?' },
    ],
    opening: { ko: '뭐 찾으세요?', zh: '在找什么？', zhEn: 'What are you looking for?' },
  },

  // ────── 03 校园区 ──────
  {
    slug: 'hanbit-classroom', ko: '한빛 교실', cn: '教室', cnEn: 'Classroom', icon: '📚', stars: 3, districtId: 'campus',
    desc: '自我介绍、课堂发表、学语法', descEn: 'Self-introduction, class presentation, learning grammar', npcName: '火鹤老师', npcNameEn: 'Teacher Flamingo', npcEmoji: '🦩', lockedDay: 6,
    aiScenarioId: 'language_exchange',
    vocab: ['저는', '한국어', '발표', '질문', '문법'],
    hints: [
      { zh: '做自我介绍', zhEn: 'Introduce yourself', ko: '안녕하세요, 저는 토리예요.' },
      { zh: '问语法问题', zhEn: 'Ask a grammar question', ko: '이 문법 좀 설명해 주세요.' },
      { zh: '课堂发表', zhEn: 'Class presentation', ko: '발표 시작하겠습니다.' },
    ],
    opening: { ko: '오늘 자기소개부터 시작할까요?', zh: '今天从自我介绍开始好吗？', zhEn: 'Shall we start with self-introductions today?' },
  },
  {
    slug: 'library', ko: '도서관', cn: '图书馆', cnEn: 'library', icon: '📖', stars: 3, districtId: 'campus',
    desc: '借书、安静交流、讨论课题', descEn: 'Borrowing books, quiet conversation, discussing topics', npcName: 'Danielle', npcEmoji: '🦊',
    aiScenarioId: 'study_cafe',
    vocab: ['책', '빌리다', '조용히', '같이', '공부'],
    hints: [
      { zh: '借韩语语法书', zhEn: 'Borrow a Korean grammar book', ko: '한국어 문법책 빌릴 수 있어요?' },
      { zh: '问能否一起讨论', zhEn: 'Ask if we can discuss together', ko: '같이 공부할래요?' },
      { zh: '小声聊天', zhEn: 'Whisper and chat', ko: '조용히 얘기해도 돼요?' },
    ],
    opening: { ko: '쉿... 같이 공부할래요?', zh: '嘘…要一起学习吗？', zhEn: 'Shh... want to study together?' },
  },
  {
    slug: 'exam-hall', ko: '시험장', cn: '考试大厅', cnEn: 'Exam Hall', icon: '📝', stars: 5, districtId: 'campus',
    desc: '月考、毕业演讲、5分钟自述', descEn: 'Monthly exam, graduation speech, 5-minute self-introduction', npcName: '火鹤老师', npcNameEn: 'Teacher Flamingo', npcEmoji: '🦩', lockedDay: 30,
    aiScenarioId: 'topik_prep',
    vocab: ['시험', '준비', '발표', '긴장', '잘 부탁드립니다'],
    hints: [
      { zh: '说明备考情况', zhEn: 'Explain exam preparation status', ko: '한 달 동안 열심히 준비했습니다.' },
      { zh: '做自我介绍开场', zhEn: 'Give an opening self-introduction', ko: '안녕하십니까. 토리라고 합니다.' },
      { zh: '回答考官问题', zhEn: 'Answer the examiner\'s questions', ko: '잘 부탁드립니다.' },
    ],
    opening: { ko: '준비되셨어요? 자기소개 부탁드려요.', zh: '准备好了吗？请做自我介绍。', zhEn: 'Ready? Please introduce yourself.' },
  },
  {
    slug: 'school-canteen', ko: '학교 식당', cn: '食堂', cnEn: 'cafeteria', icon: '🍽️', stars: 2, districtId: 'campus',
    desc: '点餐、있어요/없어요、食堂对话', descEn: 'Ordering food, 있어요/없어요, cafeteria conversation', npcName: '袋鼠阿姨', npcNameEn: 'Auntie Kangaroo.', npcEmoji: '🦘', lockedDay: 10,
    aiScenarioId: 'restaurant',
    vocab: ['김치찌개', '된장찌개', '있어요', '없어요', '맛있어요'],
    hints: [
      { zh: '问今天有什么菜', zhEn: 'Ask what dishes are available today', ko: '오늘 뭐 있어요?' },
      { zh: '点泡菜汤', zhEn: 'Order kimchi stew', ko: '김치찌개 하나 주세요.' },
      { zh: '问味道', zhEn: 'Ask about the taste', ko: '맛있어요?' },
    ],
    opening: { ko: '오늘은 김치찌개 있어요!', zh: '今天有泡菜汤！', zhEn: 'We have kimchi stew today!' },
  },

  // ────── 04 生活服务 ──────
  {
    slug: 'samin-bank', ko: '수민은행', cn: '兽民银行', cnEn: 'Beast People\'s Bank', icon: '🏦', stars: 3, districtId: 'service',
    desc: '开户、设密码、存取款', descEn: 'Opening an account, setting a password, deposits and withdrawals', npcName: '乌龟柜员', npcNameEn: 'Turtle Teller', npcEmoji: '🐢', lockedDay: 18,
    aiScenarioId: 'bank',
    vocab: ['통장', '비밀번호', '입금', '출금', '카드'],
    hints: [
      { zh: '开户', zhEn: 'Open an account', ko: '통장 만들고 싶어요.' },
      { zh: '设密码', zhEn: 'Set a password', ko: '비밀번호 설정할게요.' },
      { zh: '问能否换外币', zhEn: 'Ask if you can exchange foreign currency', ko: '환전도 돼요?' },
    ],
    opening: { ko: '안녕하세요. 어떻게 도와드릴까요?', zh: '你好，需要什么帮助？', zhEn: 'Hello, how can I help you?' },
  },
  {
    slug: 'pharmacy', ko: '약국', cn: '药店', cnEn: 'pharmacy', icon: '💊', stars: 3, districtId: 'service',
    desc: '描述症状、买药、问用法用量', descEn: 'Describe symptoms, buy medicine, ask about usage and dosage', npcName: '白鹭药剂师', npcNameEn: 'White Heron Pharmacist', npcEmoji: '🐦', lockedDay: 13,
    aiScenarioId: 'pharmacy',
    vocab: ['감기', '머리', '아파요', '약', '하루'],
    hints: [
      { zh: '说自己头疼', zhEn: 'Say you have a headache', ko: '머리가 너무 아파요.' },
      { zh: '问感冒药用量', zhEn: 'Ask about the dosage for cold medicine', ko: '이 약 하루에 몇 번 먹어요?' },
      { zh: '问能否退烧', zhEn: 'Ask if it can reduce fever', ko: '열도 내려요?' },
    ],
    opening: { ko: '어디가 안 좋으세요?', zh: '哪里不舒服？', zhEn: 'Where does it hurt?' },
  },
  {
    slug: 'hospital', ko: '병원', cn: '医院', cnEn: 'Hospital', icon: '🏥', stars: 4, districtId: 'service',
    desc: '挂号、描述病情、听医嘱', descEn: 'Register, describe symptoms, follow doctor\'s orders', npcName: '兔护士', npcNameEn: 'Rabbit Nurse', npcEmoji: '🐰', lockedDay: 19,
    aiScenarioId: 'hospital',
    vocab: ['진료', '예약', '열', '주사', '처방전'],
    hints: [
      { zh: '挂号', zhEn: 'to register (at a hospital)', ko: '진료 예약하고 싶어요.' },
      { zh: '描述症状', zhEn: 'Describe symptoms', ko: '열이 나고 머리가 아파요.' },
      { zh: '听医嘱', zhEn: 'Follow the doctor\'s orders', ko: '처방전 받을 수 있어요?' },
    ],
    opening: { ko: '어디 아프세요?', zh: '哪里疼？', zhEn: 'Where does it hurt?' },
  },
  {
    slug: 'real-estate', ko: '부동산', cn: '房产中介', cnEn: 'real estate agent', icon: '🔑', stars: 4, districtId: 'service',
    desc: '找房、签合同、问条款细节', descEn: 'Finding housing, signing contracts, asking about terms', npcName: '老犬中介', npcNameEn: 'Old Dog Agent', npcEmoji: '🐕‍🦺', lockedDay: 16,
    vocab: ['원룸', '월세', '보증금', '계약', '관리비'],
    hints: [
      { zh: '找一居室', zhEn: 'Looking for a one-bedroom', ko: '원룸 보고 있어요.' },
      { zh: '问押金', zhEn: 'Asking about the deposit', ko: '보증금이 얼마예요?' },
      { zh: '问管理费包含什么', zhEn: 'Asking what the management fee covers', ko: '관리비에 뭐 포함돼요?' },
    ],
    opening: { ko: '어떤 집 찾으세요?', zh: '在找什么样的房子？', zhEn: 'What kind of place are you looking for?' },
  },

  // ────── 05 文化娱乐 ──────
  {
    slug: 'culture-park', ko: '문화공원', cn: '文化公园', cnEn: 'Culture Park', icon: '🌳', stars: 2, districtId: 'culture',
    desc: '偶遇偶像、粉丝互动、演唱会应援', descEn: 'Running into idols, fan interactions, concert cheering', npcName: 'LUMI PAW 队员', npcNameEn: 'LUMI PAW member', npcEmoji: '⭐', lockedDay: 7,
    aiScenarioId: 'kpop_talk',
    vocab: ['응원', '사랑해요', '오빠', '최고', '사진'],
    hints: [
      { zh: '粉丝打招呼', zhEn: 'Greeting fans', ko: '오빠! 진짜 팬이에요!' },
      { zh: '请求合照', zhEn: 'Asking for a photo', ko: '사진 한 장만 같이 찍어 주세요!' },
      { zh: '说应援口号', zhEn: 'Saying the cheering slogan', ko: '오빠 최고! 사랑해요!' },
    ],
    opening: { ko: '어머! 우리 팬이세요?', zh: '哇！您是我们的粉丝吗？', zhEn: 'Wow! Are you our fan?' },
  },
  {
    slug: 'fansign-cafe', ko: '생카카페', cn: '签售会', cnEn: 'Fan sign event', icon: '🎤', stars: 4, districtId: 'culture',
    desc: '对偶像说韩语、签名、表达支持', descEn: 'Speaking Korean to idols, getting autographs, showing support', npcName: '偶像', npcNameEn: 'Idol', npcEmoji: '🌟', lockedDay: 28,
    aiScenarioId: 'fansign',
    vocab: ['사인', '응원해요', '평생', '진심', '잊지 못할'],
    hints: [
      { zh: '问偶像近况', zhEn: 'Asking about the idol\'s recent activities', ko: '요즘 잘 지내세요?' },
      { zh: '说自己长期支持', zhEn: 'Saying you\'ve been a long-time supporter', ko: '진심으로 평생 응원할게요.' },
      { zh: '请求签名', zhEn: 'Asking for an autograph', ko: '사인 하나만 해 주세요.' },
    ],
    opening: { ko: '안녕하세요! 와주셔서 감사해요.', zh: '你好！谢谢你来。', zhEn: 'Hello! Thanks for coming.' },
  },
  {
    slug: 'cinema', ko: '영화관', cn: '影院', cnEn: 'Cinema', icon: '🎬', stars: 3, districtId: 'culture',
    desc: '买票、选座、讨论剧情', descEn: 'Buying tickets, choosing seats, discussing the plot', npcName: 'Junho', npcEmoji: '🐯', lockedDay: 48,
    vocab: ['영화', '표', '자리', '재미있어요', '슬퍼요'],
    hints: [
      { zh: '买票', zhEn: 'Buying tickets', ko: '7시 영화 두 장 주세요.' },
      { zh: '问哪部好看', zhEn: 'Asking which one is good', ko: '요즘 뭐가 재미있어요?' },
      { zh: '看完讨论剧情', zhEn: 'Discussing the plot after watching', ko: '진짜 슬프지 않았어요?' },
    ],
    opening: { ko: '어떤 영화 볼래요?', zh: '想看哪部电影？', zhEn: 'Which movie do you want to see?' },
  },
  {
    slug: 'karaoke', ko: '노래방', cn: 'KTV', icon: '🎵', stars: 3, districtId: 'culture',
    desc: '点歌、唱歌、和朋友互动', descEn: 'Request songs, sing, and hang out with friends', npcName: 'Junho/Minji', npcEmoji: '🎤', lockedDay: 43,
    vocab: ['노래', '부르다', '신청', '같이', '잘해요'],
    hints: [
      { zh: '点 KPOP 歌', zhEn: 'Request a K-POP song', ko: '이 노래 신청해도 돼요?' },
      { zh: '请朋友一起唱', zhEn: 'Ask a friend to sing along', ko: '같이 부르자!' },
      { zh: '夸朋友唱得好', zhEn: 'Compliment a friend\'s singing', ko: '진짜 잘하네요!' },
    ],
    opening: { ko: '뭐 부를래요? 신곡 들어왔어요!', zh: '唱什么？有新歌哦！', zhEn: 'What should we sing? There are new songs!' },
  },
  {
    slug: 'central-park', ko: '중앙공원', cn: '中央公园', cnEn: 'Central Park', icon: '🌸', stars: 2, districtId: 'culture',
    desc: '野餐、散步聊天、户外活动', descEn: 'Picnic, stroll, chat, and outdoor activities', npcName: 'Minji', npcEmoji: '🦦', lockedDay: 26,
    vocab: ['소풍', '날씨', '예뻐요', '같이', '쉬다'],
    hints: [
      { zh: '评论天气', zhEn: 'Comment on the weather', ko: '오늘 날씨 진짜 좋다!' },
      { zh: '提议野餐', zhEn: 'Suggest a picnic', ko: '우리 소풍 갈래요?' },
      { zh: '邀请散步', zhEn: 'Invite for a walk', ko: '같이 좀 걸을래요?' },
    ],
    opening: { ko: '오늘 날씨 정말 좋다!', zh: '今天天气真好！', zhEn: 'The weather is so nice today!' },
  },
  {
    slug: 'city-hall', ko: '시청', cn: '市政厅', cnEn: 'city hall', icon: '🏛️', stars: 5, districtId: 'culture',
    desc: '正式场合、公开演讲、辩论', descEn: 'Formal settings, public speaking, debates', npcName: '火鹤老师', npcNameEn: 'Teacher Flamingo', npcEmoji: '🦩', permanentLock: true,
    vocab: ['연설', '시민', '여러분', '말씀드리다', '협력'],
    hints: [
      { zh: '正式演讲开场', zhEn: 'Open a formal speech', ko: '시민 여러분, 안녕하십니까.' },
      { zh: '辩论交锋', zhEn: 'Clash in a debate', ko: '저는 그 의견에 동의할 수 없습니다.' },
      { zh: '面向市民发表观点', zhEn: 'Share views with the public', ko: '여러분의 협력이 필요합니다.' },
    ],
    opening: { ko: '시민 여러분, 안녕하십니까.', zh: '各位市民，大家好。', zhEn: 'Hello, dear citizens.' },
  },

  // ────── 06 猎食者街区 ──────
  {
    slug: 'predator-street', ko: '사냥꾼거리', cn: '猎食者街道', cnEn: 'Predator Street', icon: '🐺', stars: 4, districtId: 'predator',
    desc: '迷路、被警告、紧张对话', descEn: 'Lost, warned, tense conversations', npcName: '路过的兔子', npcNameEn: 'A passing rabbit', npcEmoji: '🐇', lockedDay: 65,
    vocab: ['길을 잃다', '조심하다', '어디', '도와주세요', '무서워'],
    hints: [
      { zh: '问路', zhEn: 'Asking for directions', ko: '저, 길 좀 물어봐도 될까요?' },
      { zh: '求救', zhEn: 'Ask for help', ko: '도와주세요, 길을 잃었어요.' },
      { zh: '小心翼翼地搭话', zhEn: 'Carefully strike up a conversation', ko: '여기, 안전한 곳이에요?' },
    ],
    opening: { ko: '여기 어쩐 일이세요? 조심해요...', zh: '怎么会来这里？小心点…', zhEn: 'How did you end up here? Be careful...' },
  },
  {
    slug: 'predator-store', ko: '포식자 상점', cn: '猎食者便利店', cnEn: 'Predator Convenience Store', icon: '🦁', stars: 4, districtId: 'predator',
    desc: '面试被拒、被无视、讨公道', descEn: 'Rejected in an interview, ignored, seeking justice', npcName: '狮子店长', npcNameEn: 'Lion store manager', npcEmoji: '🦁', lockedDay: 66,
    aiScenarioId: 'job_interview',
    vocab: ['아르바이트', '경험', '왜', '차별', '죄송'],
    hints: [
      { zh: '面试打工', zhEn: 'Interview for a part-time job', ko: '아르바이트 자리 있어요?' },
      { zh: '问为何拒绝', zhEn: 'Ask why they refused', ko: '왜 안 된다는 거예요?' },
      { zh: '提出抗议', zhEn: 'Raise an objection', ko: '이건 차별 아니에요?' },
    ],
    opening: { ko: '음... 너무 작아서 일이 안 되겠는데?', zh: '嗯…太小了，做不了这工作吧？', zhEn: 'Hmm... it\'s too small, can\'t do this job, right?' },
  },
  {
    slug: 'predator-bar', ko: '포식자 주점', cn: '猎食者酒馆', cnEn: 'Predator\'s Tavern', icon: '🍺', stars: 5, districtId: 'predator',
    desc: '危险对话、谈判、正面交锋', descEn: 'Dangerous conversations, negotiations, and face-offs', npcName: '감독관', npcEmoji: '🦂', permanentLock: true,
    vocab: ['협상', '조심', '거래', '진심', '경고'],
    hints: [
      { zh: '谈判', zhEn: 'negotiation', ko: '거래 하나 하시죠.' },
      { zh: '小心交涉', zhEn: 'Tread carefully in negotiations', ko: '조심스럽게 말씀드립니다.' },
      { zh: '言辞强硬', zhEn: 'Firm words', ko: '이게 마지막 경고입니다.' },
    ],
    opening: { ko: '용기 있군. 무슨 일이야?', zh: '挺有胆量。什么事？', zhEn: 'Bold of you. What\'s up?' },
  },

  // ────── 07 城市探索 ──────
  {
    slug: 'animal-market', ko: '동물문 시장', cn: '动物门市场', cnEn: 'Animal Gate Market', icon: '👕', stars: 3, districtId: 'city',
    desc: '买衣服、试穿、砍价', descEn: 'Buying clothes, trying them on, haggling', npcName: '摊主们', npcNameEn: 'The stall owners', npcEmoji: '🐢', lockedDay: 54,
    vocab: ['깎아주세요', '입어 봐도 돼요', '비싸요', '예뻐요', '얼마'],
    hints: [
      { zh: '砍价', zhEn: 'Haggling', ko: '좀 깎아주세요.' },
      { zh: '试穿', zhEn: 'trying on', ko: '이거 입어 봐도 돼요?' },
      { zh: '问材质', zhEn: 'Ask about the material', ko: '이거 무슨 소재예요?' },
    ],
    opening: { ko: '한번 보세요! 싸게 드릴게요!', zh: '看看吧！便宜给你！', zhEn: 'Take a look! I\'ll give you a deal!' },
  },
  {
    slug: 'supermarket', ko: '슈퍼마켓', cn: '超市', cnEn: 'Supermarket', icon: '🛒', stars: 2, districtId: 'city',
    desc: '买食材、认韩国蔬菜、比价格', descEn: 'Buying ingredients, recognizing Korean vegetables, comparing prices', npcName: 'Minji', npcEmoji: '🦦', lockedDay: 40,
    vocab: ['배추', '두부', '계란', '신선해요', '할인'],
    hints: [
      { zh: '问蔬菜价格', zhEn: 'Ask about vegetable prices', ko: '배추 한 통 얼마예요?' },
      { zh: '比较两种品牌', zhEn: 'Compare two brands', ko: '어느 게 더 좋아요?' },
      { zh: '问当日折扣', zhEn: 'Ask about daily discounts', ko: '오늘 할인 있어요?' },
    ],
    opening: { ko: '뭐 만들어 먹을 거예요?', zh: '要做什么吃？', zhEn: 'What are you making?' },
  },
  {
    slug: 'bbq-house', ko: '고기집', cn: '烤肉店', cnEn: 'BBQ Restaurant', icon: '🥩', stars: 3, districtId: 'city',
    desc: '点菜、请客、结账', descEn: 'Ordering, treating someone, paying the bill', npcName: '熊店员', npcNameEn: 'Bear staff member', npcEmoji: '🐻', lockedDay: 27,
    vocab: ['삼겹살', '소주', '인분', '잘 먹었습니다', '계산'],
    hints: [
      { zh: '点三人份五花肉', zhEn: 'Order three servings of pork belly', ko: '삼겹살 3인분 주세요.' },
      { zh: '请客付钱', zhEn: 'Treat someone and pay', ko: '여기 계산할게요.' },
      { zh: '加点烧酒', zhEn: 'Add some soju', ko: '소주 한 병 더 주세요.' },
    ],
    opening: { ko: '어서 오세요! 몇 분이세요?', zh: '欢迎光临！几位？', zhEn: 'Welcome! How many people?' },
  },
  {
    slug: 'fried-chicken', ko: '치킨집', cn: '炸鸡店', cnEn: 'Fried chicken restaurant', icon: '🍗', stars: 2, districtId: 'city',
    desc: '外卖、堂食、请客', descEn: 'Takeout, dine-in, treating someone', npcName: '熊店员', npcNameEn: 'Bear staff member', npcEmoji: '🐻', lockedDay: 53,
    vocab: ['치킨', '양념', '간장', '맥주', '배달'],
    hints: [
      { zh: '点半半炸鸡', zhEn: 'Order half-and-half fried chicken', ko: '반반 치킨 하나 주세요.' },
      { zh: '问外卖时间', zhEn: 'Ask about delivery time', ko: '배달 얼마나 걸려요?' },
      { zh: '加一瓶啤酒', zhEn: 'Add a bottle of beer', ko: '맥주 한 병도 주세요.' },
    ],
    opening: { ko: '여기 드시고 가실 거예요? 포장이세요?', zh: '这里吃还是打包？', zhEn: 'Eat here or to-go?' },
  },
  {
    slug: 'underground-mall', ko: '지하상가', cn: '地下商店街', cnEn: 'Underground shopping street', icon: '🔽', stars: 2, districtId: 'city',
    desc: '地下购物、迷路、问方向', descEn: 'Underground shopping, getting lost, asking directions', npcName: '各种店员', npcNameEn: 'Various shop staff', npcEmoji: '🦔',
    vocab: ['어디', '출구', '계단', '나가다', '몇 층'],
    hints: [
      { zh: '问出口在哪', zhEn: 'Ask where the exit is', ko: '출구 어디 있어요?' },
      { zh: '迷路求助', zhEn: 'Ask for help when lost', ko: '여기서 길을 잃었어요.' },
      { zh: '问几号出口', zhEn: 'Ask which exit number', ko: '몇 번 출구로 나가요?' },
    ],
    opening: { ko: '뭐 찾으세요? 도와드릴까요?', zh: '在找什么？需要帮忙吗？', zhEn: 'Looking for something? Need help?' },
  },
  {
    slug: 'bookstore-24h', ko: '24시 서점', cn: '24小时书店', cnEn: '24-hour bookstore', icon: '📕', stars: 3, districtId: 'city',
    desc: '找书、问推荐、深夜读书', descEn: 'Finding books, asking for recommendations, late-night reading', npcName: '猫头鹰店员', npcNameEn: 'Owl staff member', npcEmoji: '🦉',
    vocab: ['책', '추천', '베스트셀러', '소설', '한국어'],
    hints: [
      { zh: '问韩语学习书', zhEn: 'Ask about Korean learning books', ko: '한국어 책 어디 있어요?' },
      { zh: '请推荐畅销小说', zhEn: 'Please recommend a bestselling novel', ko: '요즘 베스트셀러 추천해 주세요.' },
      { zh: '问能否在这看', zhEn: 'Ask if you can read here', ko: '여기서 좀 봐도 돼요?' },
    ],
    opening: { ko: '늦은 시간에 어서 오세요. 뭐 찾으세요?', zh: '这么晚还来，欢迎，找什么？', zhEn: 'Still here this late—welcome! What are you looking for?' },
  },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

import { getScenePreview } from './scenePreview';
import type { KoZh, KoCn } from '@/types/inline';

export function getSceneBySlug(slug: string): SceneLocation | undefined {
  const scene = sceneLocations.find((s) => s.slug === slug);
  if (!scene) return undefined;
  const preview = getScenePreview(slug);
  return preview ? { ...scene, preview } : scene;
}

export function getSceneByKo(ko: string): SceneLocation | undefined {
  return sceneLocations.find((s) => s.ko === ko);
}

/** ko → slug 映射表（供 animal-city.html 渲染时用） */
export function buildKoToSlugMap(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const s of sceneLocations) map[s.ko] = s.slug;
  return map;
}
