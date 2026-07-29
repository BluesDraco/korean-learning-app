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
  zh: string;  // 中文行为描述（用户看意图）
  ko: string;  // 韩语可发送的候选句（点击后填入输入框）
}

// ── Preview（表达预习）四段结构 ──
export interface PreviewVocabExample {
  ko: string;
  cn: string;
}
export interface PreviewVocabItem {
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
  title: string;
  items: PreviewVocabItem[];
  context?: string;  // 本组词的使用时机，如「点单选饮品时」
}
export type PatternRole = '主语' | '谓语' | '宾语' | '修饰';
export interface PatternBreakdownItem {
  role: PatternRole;
  text: string;      // 韩文片段
  meaning: string;   // 中文意思
}
export interface PreviewPatternSwap {
  slot: string;                                    // 原句中可替换的韩语片段
  options: { ko: string; cn: string }[];           // 替换选项
}
export interface PreviewPattern {
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
  upgrade?: { ko: string; cn: string };            // 更正式说法
  downgrade?: { ko: string; cn: string };          // 更随意说法
}

export interface SceneIntroFact {
  emoji: string;
  label: string;   // 类似 "78K+" / "1976" 简短数据
  desc: string;    // 说明 8-24 字
}
export interface SceneIntroCard {
  emoji: string;
  title: string;
  body: string;    // 一段 30-100 字介绍
}
export interface SceneIntroDidyouknow {
  q: string;   // 「你知道吗？」问句
  a: string;   // 揭晓答案
}
export interface SceneIntro {
  headline: string;    // 大标题
  lead: string;        // 引言 30-80 字
  facts: SceneIntroFact[];       // 3-4 个数据点
  cards: SceneIntroCard[];       // 3-4 张分主题卡
  didyouknow?: SceneIntroDidyouknow[]; // 2-3 条你知道吗
}
export interface PreviewResponse {
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
  role: 'npc' | 'user';
  ko: string;
  cn: string;
}
export interface PreviewDialogue {
  title: string;
  lines: PreviewDialogueLine[];
}
export interface PreviewCulturalTip {
  emoji: string;
  title: string;
  body: string;
}
/** AI 对话页 · 引导任务节点 */
export interface ChatTask {
  label: string;    // 中文任务名，如「点单」
  emoji: string;    // 一个 emoji
  hint: string;     // 一句话说明「此刻要说什么」
  suggestions: string[];  // 2-3 个韩语候选句，用户可一键填入
}

export interface ScenePreview {
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
  opening?: { ko: string; zh: string };  // AI 开场白（无 aiScenarioId 时必填）
  preview?: ScenePreview;    // 表达预习（可选，缺失时不显示 tabs）
}

export const sceneLocations: SceneLocation[] = [
  // ────── 01 交通枢纽 ──────
  {
    slug: 'incheon-airport', ko: '인공공항', cn: '仁爪机场', icon: '✈️', stars: 2, districtId: 'transit',
    desc: '入境、问路、行李丢失、点餐', npcName: '仙鹤空乘', npcEmoji: '🦢', lockedDay: 2,
    vocab: ['짐', '집', '여권', '환영합니다', '어디예요'],
    hints: [
      { zh: '问行李在哪取', ko: '짐은 어디서 찾아요?' },
      { zh: '说自己来自中国', ko: '저는 중국에서 왔어요.' },
      { zh: '出关问出口方向', ko: '출구가 어디예요?' },
    ],
    opening: { ko: '인공공항에 오신 것을 환영합니다. 짐 찾으시려고요?', zh: '欢迎来到仁爪机场，要找行李吗？' },
  },
  {
    slug: 'subway-station', ko: '지하철역', cn: '地铁站', icon: '🚇', stars: 3, districtId: 'transit',
    desc: '办T-money卡、问路、被问路、紧急求助', npcName: '猫头鹰售票员', npcEmoji: '🦉', lockedDay: 7,
    aiScenarioId: 'subway',
    vocab: ['카드', '충전', '몇 호선', '환승', '도와주세요'],
    hints: [
      { zh: '办张 T-money 卡', ko: '티머니 카드 하나 만들어 주세요.' },
      { zh: '问换乘几号线', ko: '몇 호선으로 환승해요?' },
      { zh: '充值一万元', ko: '만 원 충전해 주세요.' },
    ],
    opening: { ko: '안녕하세요. 어떻게 도와드릴까요?', zh: '你好，需要什么帮助？' },
  },
  {
    slug: 'bus-terminal', ko: '버스터미널', cn: '巴士总站', icon: '🚌', stars: 2, districtId: 'transit',
    desc: '买票、问目的地、确认班次', npcName: '猫头鹰售票员', npcEmoji: '🦉',
    vocab: ['표', '편도', '왕복', '몇 시', '얼마예요'],
    hints: [
      { zh: '买一张去釜山的票', ko: '부산 가는 표 한 장 주세요.' },
      { zh: '问下班车几点', ko: '다음 차 몇 시예요?' },
      { zh: '问票价', ko: '편도 얼마예요?' },
    ],
    opening: { ko: '어디 가세요?', zh: '您去哪里？' },
  },
  {
    slug: 'suul-station', ko: '수울역', cn: '兽尔站', icon: '🚄', stars: 3, districtId: 'transit',
    desc: '选座、和邻座聊天、看时刻表', npcName: '海豹奶奶', npcEmoji: '🦭',
    vocab: ['창가', '복도', '자리', '여기 앉아도 돼요'],
    hints: [
      { zh: '问能否坐这里', ko: '여기 앉아도 돼요?' },
      { zh: '和邻座搭话', ko: '어디까지 가세요?' },
      { zh: '看时刻表询问', ko: '이 기차 부산 가는 거 맞아요?' },
    ],
    opening: { ko: '아이고, 여기 앉아도 돼요?', zh: '哎呀，能坐这里吗？' },
  },

  // ────── 02 生活街区 ──────
  {
    slug: 'cu-mart', ko: 'CU 편의점', cn: 'CU便利店', icon: '🏪', stars: 1, districtId: 'life',
    desc: '买饭团、结账、问有没有袋子', npcName: '考拉店员', npcEmoji: '🐨', lockedDay: 9,
    aiScenarioId: 'convenience',
    vocab: ['삼각김밥', '주세요', '봉투', '얼마예요', '카드'],
    hints: [
      { zh: '买三角饭团', ko: '삼각김밥 하나 주세요.' },
      { zh: '问总共多少钱', ko: '다 해서 얼마예요?' },
      { zh: '要塑料袋', ko: '봉투 하나 주세요.' },
    ],
    opening: { ko: '안녕하세요! 뭐 드릴까요?', zh: '你好！请问要什么？' },
  },
  {
    slug: 'haru-cafe', ko: '하루 카페', cn: '咖啡馆', icon: '☕', stars: 3, districtId: 'life',
    desc: '点单、打工面试、做咖啡、听订单', npcName: '金毛店员', npcEmoji: '🐕', lockedDay: 14,
    aiScenarioId: 'cafe',
    vocab: ['아메리카노', '라떼', '아이스', '뜨거운', '사이즈'],
    hints: [
      { zh: '点一杯冰美式', ko: '아이스 아메리카노 한 잔 주세요.' },
      { zh: '问有没有 wifi', ko: '여기 와이파이 돼요?' },
      { zh: '加一份糖浆', ko: '시럽 좀 추가해 주세요.' },
    ],
    opening: { ko: '안녕하세요. 주문하시겠어요?', zh: '你好，要点单吗？' },
  },
  {
    slug: 'hanbit-dorm', ko: '한빛 기숙사', cn: '宿舍', icon: '🏠', stars: 1, districtId: 'life',
    desc: '入住登记、和邻居聊天、借东西', npcName: '浣熊宿管', npcEmoji: '🦝', lockedDay: 4,
    vocab: ['방', '키', '룸메이트', '와이파이'],
    hints: [
      { zh: '办理入住', ko: '오늘 입주하러 왔어요.' },
      { zh: '问 wifi 密码', ko: '와이파이 비밀번호가 뭐예요?' },
      { zh: '借一下吹风机', ko: '드라이기 좀 빌릴 수 있어요?' },
    ],
    opening: { ko: '어서 오세요. 처음 오시는 거죠?', zh: '欢迎，第一次来对吧？' },
  },
  {
    slug: 'bakery', ko: '베이커리', cn: '烘焙店', icon: '🥐', stars: 2, districtId: 'life',
    desc: '买面包、问口味、预订蛋糕', npcName: '袋鼠阿姨', npcEmoji: '🦘',
    vocab: ['빵', '맛있어요', '추천', '예약', '크림'],
    hints: [
      { zh: '问哪个面包好吃', ko: '어떤 빵이 제일 맛있어요?' },
      { zh: '预订生日蛋糕', ko: '생일 케이크 예약하고 싶어요.' },
      { zh: '要两个甜甜圈', ko: '도넛 두 개 주세요.' },
    ],
    opening: { ko: '오늘 빵 새로 나왔어요. 뭐 드릴까요?', zh: '今天有新出的面包，要什么？' },
  },
  {
    slug: 'hongkong-street', ko: '홍공거리', cn: '弘爪街', icon: '🌃', stars: 4, districtId: 'life',
    desc: '追星、赶路、小巷问路、生카点单', npcName: '鹿店员', npcEmoji: '🦌', lockedDay: 23,
    vocab: ['생카', '응원봉', '팬', '빨리', '어느 쪽'],
    hints: [
      { zh: '问演唱会场地怎么走', ko: '콘서트장이 어느 쪽이에요?' },
      { zh: '问哪里有应援棒卖', ko: '응원봉 어디서 팔아요?' },
      { zh: '赶时间快速点单', ko: '빨리 되는 거로 주세요.' },
    ],
    opening: { ko: '오늘 무슨 일 있어요? 사람 많네요.', zh: '今天有什么活动？人这么多。' },
  },
  {
    slug: 'paws-mall', ko: 'PAWS MALL', cn: 'PAWS购物中心', icon: '🛍️', stars: 3, districtId: 'life',
    desc: '购物、试衣、结账、退换货', npcName: '熊店员', npcEmoji: '🐻',
    vocab: ['입어 봐도 돼요', '사이즈', '계산', '환불', '다른 색'],
    hints: [
      { zh: '问能否试穿', ko: '이거 입어 봐도 돼요?' },
      { zh: '要小一号的', ko: '한 사이즈 작은 거 있어요?' },
      { zh: '问能不能退货', ko: '환불 돼요?' },
    ],
    opening: { ko: '필요한 거 있으세요?', zh: '需要什么吗？' },
  },
  {
    slug: 'daiso', ko: '다이소', cn: '日用品店', icon: '🧴', stars: 2, districtId: 'life',
    desc: '买生活用品、이거/그거/저거练习', npcName: '羊店员', npcEmoji: '🐑', lockedDay: 11,
    vocab: ['이거', '그거', '저거', '얼마', '있어요'],
    hints: [
      { zh: '指物品问价', ko: '이거 얼마예요?' },
      { zh: '问有没有牙刷', ko: '칫솔 있어요?' },
      { zh: '问"那个"在哪', ko: '저거 어디 있어요?' },
    ],
    opening: { ko: '어서 오세요. 찾으시는 거 있으세요?', zh: '欢迎光临，在找什么吗？' },
  },
  {
    slug: 'stationery', ko: '문구점', cn: '文具店', icon: '✏️', stars: 2, districtId: 'life',
    desc: '买文具、问价格、만원发音挑战', npcName: '羊店员', npcEmoji: '🐑', lockedDay: 12,
    vocab: ['볼펜', '노트', '만 원', '얼마', '저거'],
    hints: [
      { zh: '买圆珠笔和笔记本', ko: '볼펜이랑 노트 주세요.' },
      { zh: '问万元的发音', ko: '이거 만 원 맞아요?' },
      { zh: '问那个文件夹多少钱', ko: '저 파일 얼마예요?' },
    ],
    opening: { ko: '뭐 찾으세요?', zh: '在找什么？' },
  },

  // ────── 03 校园区 ──────
  {
    slug: 'hanbit-classroom', ko: '한빛 교실', cn: '教室', icon: '📚', stars: 3, districtId: 'campus',
    desc: '自我介绍、课堂发表、学语法', npcName: '火鹤老师', npcEmoji: '🦩', lockedDay: 6,
    aiScenarioId: 'language_exchange',
    vocab: ['저는', '한국어', '발표', '질문', '문법'],
    hints: [
      { zh: '做自我介绍', ko: '안녕하세요, 저는 토리예요.' },
      { zh: '问语法问题', ko: '이 문법 좀 설명해 주세요.' },
      { zh: '课堂发表', ko: '발표 시작하겠습니다.' },
    ],
    opening: { ko: '오늘 자기소개부터 시작할까요?', zh: '今天从自我介绍开始好吗？' },
  },
  {
    slug: 'library', ko: '도서관', cn: '图书馆', icon: '📖', stars: 3, districtId: 'campus',
    desc: '借书、安静交流、讨论课题', npcName: 'Danielle', npcEmoji: '🦊',
    aiScenarioId: 'study_cafe',
    vocab: ['책', '빌리다', '조용히', '같이', '공부'],
    hints: [
      { zh: '借韩语语法书', ko: '한국어 문법책 빌릴 수 있어요?' },
      { zh: '问能否一起讨论', ko: '같이 공부할래요?' },
      { zh: '小声聊天', ko: '조용히 얘기해도 돼요?' },
    ],
    opening: { ko: '쉿... 같이 공부할래요?', zh: '嘘…要一起学习吗？' },
  },
  {
    slug: 'exam-hall', ko: '시험장', cn: '考试大厅', icon: '📝', stars: 5, districtId: 'campus',
    desc: '月考、毕业演讲、5分钟自述', npcName: '火鹤老师', npcEmoji: '🦩', lockedDay: 30,
    aiScenarioId: 'topik_prep',
    vocab: ['시험', '준비', '발표', '긴장', '잘 부탁드립니다'],
    hints: [
      { zh: '说明备考情况', ko: '한 달 동안 열심히 준비했습니다.' },
      { zh: '做自我介绍开场', ko: '안녕하십니까. 토리라고 합니다.' },
      { zh: '回答考官问题', ko: '잘 부탁드립니다.' },
    ],
    opening: { ko: '준비되셨어요? 자기소개 부탁드려요.', zh: '准备好了吗？请做自我介绍。' },
  },
  {
    slug: 'school-canteen', ko: '학교 식당', cn: '食堂', icon: '🍽️', stars: 2, districtId: 'campus',
    desc: '点餐、있어요/없어요、食堂对话', npcName: '袋鼠阿姨', npcEmoji: '🦘', lockedDay: 10,
    aiScenarioId: 'restaurant',
    vocab: ['김치찌개', '된장찌개', '있어요', '없어요', '맛있어요'],
    hints: [
      { zh: '问今天有什么菜', ko: '오늘 뭐 있어요?' },
      { zh: '点泡菜汤', ko: '김치찌개 하나 주세요.' },
      { zh: '问味道', ko: '맛있어요?' },
    ],
    opening: { ko: '오늘은 김치찌개 있어요!', zh: '今天有泡菜汤！' },
  },

  // ────── 04 生活服务 ──────
  {
    slug: 'samin-bank', ko: '수민은행', cn: '兽民银行', icon: '🏦', stars: 3, districtId: 'service',
    desc: '开户、设密码、存取款', npcName: '乌龟柜员', npcEmoji: '🐢', lockedDay: 18,
    aiScenarioId: 'bank',
    vocab: ['통장', '비밀번호', '입금', '출금', '카드'],
    hints: [
      { zh: '开户', ko: '통장 만들고 싶어요.' },
      { zh: '设密码', ko: '비밀번호 설정할게요.' },
      { zh: '问能否换外币', ko: '환전도 돼요?' },
    ],
    opening: { ko: '안녕하세요. 어떻게 도와드릴까요?', zh: '你好，需要什么帮助？' },
  },
  {
    slug: 'pharmacy', ko: '약국', cn: '药店', icon: '💊', stars: 3, districtId: 'service',
    desc: '描述症状、买药、问用法用量', npcName: '白鹭药剂师', npcEmoji: '🐦', lockedDay: 13,
    aiScenarioId: 'pharmacy',
    vocab: ['감기', '머리', '아파요', '약', '하루'],
    hints: [
      { zh: '说自己头疼', ko: '머리가 너무 아파요.' },
      { zh: '问感冒药用量', ko: '이 약 하루에 몇 번 먹어요?' },
      { zh: '问能否退烧', ko: '열도 내려요?' },
    ],
    opening: { ko: '어디가 안 좋으세요?', zh: '哪里不舒服？' },
  },
  {
    slug: 'hospital', ko: '병원', cn: '医院', icon: '🏥', stars: 4, districtId: 'service',
    desc: '挂号、描述病情、听医嘱', npcName: '兔护士', npcEmoji: '🐰', lockedDay: 19,
    aiScenarioId: 'hospital',
    vocab: ['진료', '예약', '열', '주사', '처방전'],
    hints: [
      { zh: '挂号', ko: '진료 예약하고 싶어요.' },
      { zh: '描述症状', ko: '열이 나고 머리가 아파요.' },
      { zh: '听医嘱', ko: '처방전 받을 수 있어요?' },
    ],
    opening: { ko: '어디 아프세요?', zh: '哪里疼？' },
  },
  {
    slug: 'real-estate', ko: '부동산', cn: '房产中介', icon: '🔑', stars: 4, districtId: 'service',
    desc: '找房、签合同、问条款细节', npcName: '老犬中介', npcEmoji: '🐕‍🦺', lockedDay: 16,
    vocab: ['원룸', '월세', '보증금', '계약', '관리비'],
    hints: [
      { zh: '找一居室', ko: '원룸 보고 있어요.' },
      { zh: '问押金', ko: '보증금이 얼마예요?' },
      { zh: '问管理费包含什么', ko: '관리비에 뭐 포함돼요?' },
    ],
    opening: { ko: '어떤 집 찾으세요?', zh: '在找什么样的房子？' },
  },

  // ────── 05 文化娱乐 ──────
  {
    slug: 'culture-park', ko: '문화공원', cn: '文化公园', icon: '🌳', stars: 2, districtId: 'culture',
    desc: '偶遇偶像、粉丝互动、演唱会应援', npcName: 'LUMI PAW 队员', npcEmoji: '⭐', lockedDay: 7,
    aiScenarioId: 'kpop_talk',
    vocab: ['응원', '사랑해요', '오빠', '최고', '사진'],
    hints: [
      { zh: '粉丝打招呼', ko: '오빠! 진짜 팬이에요!' },
      { zh: '请求合照', ko: '사진 한 장만 같이 찍어 주세요!' },
      { zh: '说应援口号', ko: '오빠 최고! 사랑해요!' },
    ],
    opening: { ko: '어머! 우리 팬이세요?', zh: '哇！您是我们的粉丝吗？' },
  },
  {
    slug: 'fansign-cafe', ko: '생카카페', cn: '签售会', icon: '🎤', stars: 4, districtId: 'culture',
    desc: '对偶像说韩语、签名、表达支持', npcName: '偶像', npcEmoji: '🌟', lockedDay: 28,
    aiScenarioId: 'fansign',
    vocab: ['사인', '응원해요', '평생', '진심', '잊지 못할'],
    hints: [
      { zh: '问偶像近况', ko: '요즘 잘 지내세요?' },
      { zh: '说自己长期支持', ko: '진심으로 평생 응원할게요.' },
      { zh: '请求签名', ko: '사인 하나만 해 주세요.' },
    ],
    opening: { ko: '안녕하세요! 와주셔서 감사해요.', zh: '你好！谢谢你来。' },
  },
  {
    slug: 'cinema', ko: '영화관', cn: '影院', icon: '🎬', stars: 3, districtId: 'culture',
    desc: '买票、选座、讨论剧情', npcName: 'Junho', npcEmoji: '🐯', lockedDay: 48,
    vocab: ['영화', '표', '자리', '재미있어요', '슬퍼요'],
    hints: [
      { zh: '买票', ko: '7시 영화 두 장 주세요.' },
      { zh: '问哪部好看', ko: '요즘 뭐가 재미있어요?' },
      { zh: '看完讨论剧情', ko: '진짜 슬프지 않았어요?' },
    ],
    opening: { ko: '어떤 영화 볼래요?', zh: '想看哪部电影？' },
  },
  {
    slug: 'karaoke', ko: '노래방', cn: 'KTV', icon: '🎵', stars: 3, districtId: 'culture',
    desc: '点歌、唱歌、和朋友互动', npcName: 'Junho/Minji', npcEmoji: '🎤', lockedDay: 43,
    vocab: ['노래', '부르다', '신청', '같이', '잘해요'],
    hints: [
      { zh: '点 KPOP 歌', ko: '이 노래 신청해도 돼요?' },
      { zh: '请朋友一起唱', ko: '같이 부르자!' },
      { zh: '夸朋友唱得好', ko: '진짜 잘하네요!' },
    ],
    opening: { ko: '뭐 부를래요? 신곡 들어왔어요!', zh: '唱什么？有新歌哦！' },
  },
  {
    slug: 'central-park', ko: '중앙공원', cn: '中央公园', icon: '🌸', stars: 2, districtId: 'culture',
    desc: '野餐、散步聊天、户外活动', npcName: 'Minji', npcEmoji: '🦦', lockedDay: 26,
    vocab: ['소풍', '날씨', '예뻐요', '같이', '쉬다'],
    hints: [
      { zh: '评论天气', ko: '오늘 날씨 진짜 좋다!' },
      { zh: '提议野餐', ko: '우리 소풍 갈래요?' },
      { zh: '邀请散步', ko: '같이 좀 걸을래요?' },
    ],
    opening: { ko: '오늘 날씨 정말 좋다!', zh: '今天天气真好！' },
  },
  {
    slug: 'city-hall', ko: '시청', cn: '市政厅', icon: '🏛️', stars: 5, districtId: 'culture',
    desc: '正式场合、公开演讲、辩论', npcName: '火鹤老师', npcEmoji: '🦩', permanentLock: true,
    vocab: ['연설', '시민', '여러분', '말씀드리다', '협력'],
    hints: [
      { zh: '正式演讲开场', ko: '시민 여러분, 안녕하십니까.' },
      { zh: '辩论交锋', ko: '저는 그 의견에 동의할 수 없습니다.' },
      { zh: '面向市民发表观点', ko: '여러분의 협력이 필요합니다.' },
    ],
    opening: { ko: '시민 여러분, 안녕하십니까.', zh: '各位市民，大家好。' },
  },

  // ────── 06 猎食者街区 ──────
  {
    slug: 'predator-street', ko: '사냥꾼거리', cn: '猎食者街道', icon: '🐺', stars: 4, districtId: 'predator',
    desc: '迷路、被警告、紧张对话', npcName: '路过的兔子', npcEmoji: '🐇', lockedDay: 65,
    vocab: ['길을 잃다', '조심하다', '어디', '도와주세요', '무서워'],
    hints: [
      { zh: '问路', ko: '저, 길 좀 물어봐도 될까요?' },
      { zh: '求救', ko: '도와주세요, 길을 잃었어요.' },
      { zh: '小心翼翼地搭话', ko: '여기, 안전한 곳이에요?' },
    ],
    opening: { ko: '여기 어쩐 일이세요? 조심해요...', zh: '怎么会来这里？小心点…' },
  },
  {
    slug: 'predator-store', ko: '포식자 상점', cn: '猎食者便利店', icon: '🦁', stars: 4, districtId: 'predator',
    desc: '面试被拒、被无视、讨公道', npcName: '狮子店长', npcEmoji: '🦁', lockedDay: 66,
    aiScenarioId: 'job_interview',
    vocab: ['아르바이트', '경험', '왜', '차별', '죄송'],
    hints: [
      { zh: '面试打工', ko: '아르바이트 자리 있어요?' },
      { zh: '问为何拒绝', ko: '왜 안 된다는 거예요?' },
      { zh: '提出抗议', ko: '이건 차별 아니에요?' },
    ],
    opening: { ko: '음... 너무 작아서 일이 안 되겠는데?', zh: '嗯…太小了，做不了这工作吧？' },
  },
  {
    slug: 'predator-bar', ko: '포식자 주점', cn: '猎食者酒馆', icon: '🍺', stars: 5, districtId: 'predator',
    desc: '危险对话、谈判、正面交锋', npcName: '감독관', npcEmoji: '🦂', permanentLock: true,
    vocab: ['협상', '조심', '거래', '진심', '경고'],
    hints: [
      { zh: '谈判', ko: '거래 하나 하시죠.' },
      { zh: '小心交涉', ko: '조심스럽게 말씀드립니다.' },
      { zh: '言辞强硬', ko: '이게 마지막 경고입니다.' },
    ],
    opening: { ko: '용기 있군. 무슨 일이야?', zh: '挺有胆量。什么事？' },
  },

  // ────── 07 城市探索 ──────
  {
    slug: 'animal-market', ko: '동물문 시장', cn: '动物门市场', icon: '👕', stars: 3, districtId: 'city',
    desc: '买衣服、试穿、砍价', npcName: '摊主们', npcEmoji: '🐢', lockedDay: 54,
    vocab: ['깎아주세요', '입어 봐도 돼요', '비싸요', '예뻐요', '얼마'],
    hints: [
      { zh: '砍价', ko: '좀 깎아주세요.' },
      { zh: '试穿', ko: '이거 입어 봐도 돼요?' },
      { zh: '问材质', ko: '이거 무슨 소재예요?' },
    ],
    opening: { ko: '한번 보세요! 싸게 드릴게요!', zh: '看看吧！便宜给你！' },
  },
  {
    slug: 'supermarket', ko: '슈퍼마켓', cn: '超市', icon: '🛒', stars: 2, districtId: 'city',
    desc: '买食材、认韩国蔬菜、比价格', npcName: 'Minji', npcEmoji: '🦦', lockedDay: 40,
    vocab: ['배추', '두부', '계란', '신선해요', '할인'],
    hints: [
      { zh: '问蔬菜价格', ko: '배추 한 통 얼마예요?' },
      { zh: '比较两种品牌', ko: '어느 게 더 좋아요?' },
      { zh: '问当日折扣', ko: '오늘 할인 있어요?' },
    ],
    opening: { ko: '뭐 만들어 먹을 거예요?', zh: '要做什么吃？' },
  },
  {
    slug: 'bbq-house', ko: '고기집', cn: '烤肉店', icon: '🥩', stars: 3, districtId: 'city',
    desc: '点菜、请客、结账', npcName: '熊店员', npcEmoji: '🐻', lockedDay: 27,
    vocab: ['삼겹살', '소주', '인분', '잘 먹었습니다', '계산'],
    hints: [
      { zh: '点三人份五花肉', ko: '삼겹살 3인분 주세요.' },
      { zh: '请客付钱', ko: '여기 계산할게요.' },
      { zh: '加点烧酒', ko: '소주 한 병 더 주세요.' },
    ],
    opening: { ko: '어서 오세요! 몇 분이세요?', zh: '欢迎光临！几位？' },
  },
  {
    slug: 'fried-chicken', ko: '치킨집', cn: '炸鸡店', icon: '🍗', stars: 2, districtId: 'city',
    desc: '外卖、堂食、请客', npcName: '熊店员', npcEmoji: '🐻', lockedDay: 53,
    vocab: ['치킨', '양념', '간장', '맥주', '배달'],
    hints: [
      { zh: '点半半炸鸡', ko: '반반 치킨 하나 주세요.' },
      { zh: '问外卖时间', ko: '배달 얼마나 걸려요?' },
      { zh: '加一瓶啤酒', ko: '맥주 한 병도 주세요.' },
    ],
    opening: { ko: '여기 드시고 가실 거예요? 포장이세요?', zh: '这里吃还是打包？' },
  },
  {
    slug: 'underground-mall', ko: '지하상가', cn: '地下商店街', icon: '🔽', stars: 2, districtId: 'city',
    desc: '地下购物、迷路、问方向', npcName: '各种店员', npcEmoji: '🦔',
    vocab: ['어디', '출구', '계단', '나가다', '몇 층'],
    hints: [
      { zh: '问出口在哪', ko: '출구 어디 있어요?' },
      { zh: '迷路求助', ko: '여기서 길을 잃었어요.' },
      { zh: '问几号出口', ko: '몇 번 출구로 나가요?' },
    ],
    opening: { ko: '뭐 찾으세요? 도와드릴까요?', zh: '在找什么？需要帮忙吗？' },
  },
  {
    slug: 'bookstore-24h', ko: '24시 서점', cn: '24小时书店', icon: '📕', stars: 3, districtId: 'city',
    desc: '找书、问推荐、深夜读书', npcName: '猫头鹰店员', npcEmoji: '🦉',
    vocab: ['책', '추천', '베스트셀러', '소설', '한국어'],
    hints: [
      { zh: '问韩语学习书', ko: '한국어 책 어디 있어요?' },
      { zh: '请推荐畅销小说', ko: '요즘 베스트셀러 추천해 주세요.' },
      { zh: '问能否在这看', ko: '여기서 좀 봐도 돼요?' },
    ],
    opening: { ko: '늦은 시간에 어서 오세요. 뭐 찾으세요?', zh: '这么晚还来，欢迎，找什么？' },
  },
];

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

import { getScenePreview } from './scenePreview';

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
