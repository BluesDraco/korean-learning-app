import type { ComponentType } from 'react';
import { PenLine, Sparkles, BookOpen, History } from 'lucide-react';

export type WritingMode = 'imitation' | 'free' | 'cloze' | 'history';

export interface HistoryRecord {
  id: string;
  date: string;
  mode: string;
  modeLabel: string;
  score: string;
  snippet: string;
  details: any;
}

export interface ImitationPrompt {
  zh: string;
  ko: string;
  hint: string;
  grammarPoint: string;
  /** 难度 · A1=基础判断句/时态 / A2=连接/推测/请求 / B1=引用/被动/多重从句 */
  level?: 'A1' | 'A2' | 'B1';
  /** 常见错误提示(教学向,做完可以看) */
  pitfall?: string;
}

export interface FreeTopic {
  title: string;
  titleKo: string;
  prompt: string;
  keywords: string[];
  level?: 'A1' | 'A2' | 'B1';
}

export interface ClozeExercise {
  sentence: string;
  options: string[];
  correct: number;
  explanation: string;
  full: string;
  meaning: string;
  /** 分组标签 · 助词/时态/连接词尾/敬语 */
  topic?: '助词' | '时态' | '连接词尾' | '敬语与情态';
  /** 难度 A1/A2/B1 */
  level?: 'A1' | 'A2' | 'B1';
}

export interface ModeConfig {
  key: WritingMode;
  label: string;
  icon: ComponentType<{ size?: number }>;
  desc: string;
}

export const modeConfig: ModeConfig[] = [
  { key: 'imitation', label: '仿写', icon: PenLine, desc: '看中文写韩语' },
  { key: 'free', label: '自由写', icon: Sparkles, desc: '话题写作' },
  { key: 'cloze', label: '填空', icon: BookOpen, desc: '补全助词/语尾' },
  { key: 'history', label: '写作历史', icon: History, desc: '查看记录' },
];

export const imitationPrompts: ImitationPrompt[] = [
  // ═══ A1 · 基础判断句 & 现在时 & 过去时 (8 题) ═══
  { zh: '我是学生。', ko: '저는 학생입니다.', hint: '저는 ~ 입니다 (我是~)', grammarPoint: 'N은/는 N입니다 · 名词判断句 습니다体', level: 'A1', pitfall: '主题助词按 收音: 저→는, 학생→은' },
  { zh: '今天天气很好。', ko: '오늘 날씨가 좋아요.', hint: '날씨가 좋아요 (天气好)', grammarPoint: 'N이/가 A-아요/어요 · 形容词谓语句', level: 'A1', pitfall: '主格助词 이/가 按收音选:날씨→가' },
  { zh: '请给我一杯咖啡。', ko: '커피 한 잔 주세요.', hint: '한 잔 주세요 (给我一杯)', grammarPoint: 'V-(으)세요 · 命令/请求敬语 · 固有数词+量词', level: 'A1', pitfall: '数词用固有数词 하나→한,不是 일' },
  { zh: '昨天看了电影。', ko: '어제 영화를 봤어요.', hint: '~았/었어요 (过去时)', grammarPoint: 'V-았/었어요 · 过去时词尾', level: 'A1', pitfall: '보다→봤어요 缩略;宾格用 을/를,영화→를' },
  { zh: '我不喜欢辣的。', ko: '매운 것을 안 좋아해요.', hint: '안 + 动词 (不~)', grammarPoint: '否定副词 안 · A-(으)ㄴ 것 定语形+名词化', level: 'A1', pitfall: '안 单独放动词前,不要写成 좋아해요 안' },
  { zh: '有妹妹吗？', ko: '여동생이 있어요?', hint: 'N이/가 있다 (有~)', grammarPoint: 'N이/가 있다/없다 · 存在句 · ?号语调', level: 'A1', pitfall: '否定用 없다,不是 안 있다' },
  { zh: '我住在首尔。', ko: '저는 서울에 살아요.', hint: '~에 살다 (住在~)', grammarPoint: 'N에 살다 · 居住地用 에,不是 에서', level: 'A1', pitfall: '살다 是 ㄹ 不规则:살+아요 = 살아요(现在时不脱落)' },
  { zh: '我几点见？', ko: '몇 시에 만나요?', hint: '몇 시에 (几点)', grammarPoint: '몇 疑问词 · 时间点用 N에', level: 'A1', pitfall: '몇 后接量词:몇 시(几点)/몇 명(几人)' },

  // ═══ A2 · 连接词尾 & 情态 & 推测 (10 题) ═══
  { zh: '我想吃韩国料理。', ko: '한국 요리를 먹고 싶어요.', hint: '~고 싶어요 (想~)', grammarPoint: 'V-고 싶다 · 想做,主语是"我"时用', level: 'A2', pitfall: '第三人称用 V-고 싶어하다,不是 싶다' },
  { zh: '我在学韩语。', ko: '한국어를 배우고 있어요.', hint: '~고 있어요 (正在)', grammarPoint: 'V-고 있다 · 现在进行时', level: 'A2', pitfall: '있다/계시다/알다 等状态动词不能再套 -고 있다' },
  { zh: '这里可以拍照吗？', ko: '여기서 사진 찍어도 돼요?', hint: '~아/어도 돼요? (可以~吗?)', grammarPoint: 'V-아/어도 되다 · 允许', level: 'A2', pitfall: '否定用 안 되다 或 -(으)면 안 되다' },
  { zh: '比想象中更难。', ko: '생각보다 더 어려워요.', hint: 'N보다 더 (比~更)', grammarPoint: 'N보다 (더) A · 比较句', level: 'A2', pitfall: '어렵다 是 ㅂ 不规则:어렵+어요 → 어려워요' },
  { zh: '因为下雨没能出门。', ko: '비가 와서 못 나갔어요.', hint: 'V-아/어서 (因为~) + 못 V (没能~)', grammarPoint: 'V-아/어서 · 原因 · 前后主语一致 + 못 · 能力否定', level: 'A2', pitfall: '못 表能力否定,안 表主观不做;分不清就错' },
  { zh: '一边喝咖啡一边看书。', ko: '커피를 마시면서 책을 읽어요.', hint: '~(으)면서 (一边~一边)', grammarPoint: 'V-(으)면서 · 同时进行两个动作', level: 'A2', pitfall: '两个动作主语必须相同,不同主语用 -는 동안' },
  { zh: '今天好像会下雨。', ko: '오늘 비가 올 것 같아요.', hint: 'V-(으)ㄹ 것 같다 (推测未来)', grammarPoint: 'V-(으)ㄹ 것 같다 · 未来推测/委婉', level: 'A2', pitfall: '推测过去用 V-았/었을 것 같다' },
  { zh: '朋友说她明天来。', ko: '친구가 내일 온다고 했어요.', hint: '~다고 하다 (间接引用陈述)', grammarPoint: 'V-ㄴ/는다고 하다 · 陈述句间接引用', level: 'A2', pitfall: '动词现在时引用要加 -ㄴ다/는다,不是原型' },
  { zh: '虽然很累但很开心。', ko: '힘들지만 재미있어요.', hint: '~지만 (虽然但是)', grammarPoint: 'A/V-지만 · 转折连接', level: 'A2', pitfall: '过去时用 -았/었지만,如 배웠지만 · 学过但...' },
  { zh: '如果有时间就学习。', ko: '시간이 있으면 공부해요.', hint: '~(으)면 (如果)', grammarPoint: 'V-(으)면 · 条件/假设', level: 'A2', pitfall: '收音后加 -으면,无收音直接 -면' },

  // ═══ B1 · 引用/被动/多重从句 (6 题) ═══
  { zh: '越学越有意思。', ko: '배우면 배울수록 재미있어요.', hint: '-(으)면 -(으)ㄹ수록 (越~越~)', grammarPoint: 'V-(으)면 V-(으)ㄹ수록 · 递进', level: 'B1', pitfall: '两个动词必须是同一个,不能混用' },
  { zh: '这道菜是我妈做的。', ko: '이 음식은 엄마가 만드신 거예요.', hint: '-(으)신 (尊敬定语)', grammarPoint: '尊敬 -(으)시- + V-(으)ㄴ 것이다 · 强调施事', level: 'B1', pitfall: '만들다 ㄹ 前脱落 → 만드신' },
  { zh: '好像很久没见了。', ko: '오랜만에 만난 것 같아요.', hint: '오랜만에 (好久) + -(으)ㄴ 것 같다', grammarPoint: '오랜만에 + V-(으)ㄴ 것 같다 · 过去推测', level: 'B1', pitfall: '不用 오래된만에,是固定表达 오랜만에' },
  { zh: '这本书被翻译成韩语了。', ko: '이 책은 한국어로 번역되었어요.', hint: 'N-되다 (被动)', grammarPoint: 'N + -되다 · 汉字词被动 · N(으)로 · 译成/变成', level: 'B1', pitfall: '되었어요 = 됐어요(缩略),两种都对' },
  { zh: '我打算下个月去韩国。', ko: '다음 달에 한국에 가려고 해요.', hint: 'V-(으)려고 하다 (打算)', grammarPoint: 'V-(으)려고 하다 · 计划/打算', level: 'B1', pitfall: '与 V-(으)ㄹ 거예요 意思相近,前者更强调意图' },
  { zh: '越努力越能提高。', ko: '노력할수록 실력이 향상돼요.', hint: '-(으)ㄹ수록 (越~) + N-되다', grammarPoint: 'V-(으)ㄹ수록 · 单独用也可以 + N-되다 变化', level: 'B1', pitfall: '향상하다(动作)/향상되다(结果)/향상시키다(使动)三形区分' },
];

export const freeTopics: FreeTopic[] = [
  // ─── A1 · 简单描述 ───
  { title: '自我介绍', titleKo: '자기소개', prompt: '用韩语写一段自我介绍(3-5 句),包含名字、职业/身份、兴趣爱好。', keywords: ['이름', '직업', '취미', '살다', '좋아하다'], level: 'A1' },
  { title: '我的一天', titleKo: '하루 일과', prompt: '描述你的一天。从早上起床到晚上睡觉,你通常会做什么?', keywords: ['아침', '점심', '저녁', '공부', '운동'], level: 'A1' },
  { title: '最喜欢的食物', titleKo: '좋아하는 음식', prompt: '说说你最喜欢的食物。是什么?为什么喜欢?多久吃一次?', keywords: ['음식', '맛있다', '좋아하다', '자주'], level: 'A1' },
  { title: '我的家人', titleKo: '우리 가족', prompt: '介绍你的家人。有几口人?他们是做什么的?你和谁最亲近?', keywords: ['가족', '부모님', '형제', '살다', '일하다'], level: 'A1' },

  // ─── A2 · 场景叙述 ───
  { title: '上周末', titleKo: '지난 주말', prompt: '描述你上周末做了什么。去了哪里?见了谁?做了什么有趣的事?', keywords: ['주말', '친구', '만나다', '재미있다'], level: 'A2' },
  { title: '一次旅行', titleKo: '기억에 남는 여행', prompt: '写一次让你印象深刻的旅行。什么时候去的?和谁去的?最难忘的是什么?', keywords: ['여행', '기억', '풍경', '먹다', '재미있다'], level: 'A2' },
  { title: '给朋友的邀请', titleKo: '친구에게 초대', prompt: '给一位韩国朋友写一段邀请话,请他/她周末来家里吃饭。写清时间、地点、菜品。', keywords: ['주말', '집', '초대', '만들다', '기다리다'], level: 'A2' },
  { title: '未来计划', titleKo: '앞으로의 계획', prompt: '接下来 1 年你打算做什么?学什么?去哪里?有什么目标?', keywords: ['계획', '여행', '공부', '목표', '(으)려고 하다'], level: 'A2' },

  // ─── B1 · 观点/对比 ───
  { title: '喜欢的季节', titleKo: '좋아하는 계절', prompt: '你最喜欢哪个季节?说明理由,并举一件那个季节最爱做的事。', keywords: ['계절', '기후', '풍경', '이유', '가장'], level: 'B1' },
  { title: '城市 vs 农村', titleKo: '도시와 시골', prompt: '你更愿意住在城市还是农村?请从生活便利、环境、人际关系三方面对比。', keywords: ['도시', '시골', '편리하다', '환경', '이웃'], level: 'B1' },
  { title: '学韩语的原因', titleKo: '한국어를 배우는 이유', prompt: '你为什么开始学韩语?学的过程中最难/最有趣的是什么?未来想用韩语做什么?', keywords: ['시작하다', '어렵다', '재미있다', '앞으로'], level: 'B1' },
  { title: '一次失败', titleKo: '실패한 경험', prompt: '写一次让你觉得失败的经历。发生了什么?你从中学到了什么?', keywords: ['실패', '경험', '배우다', '느끼다', '그래서'], level: 'B1' },
];

export const clozeExercises: ClozeExercise[] = [
  // ══════ 助词 6 题 (最高频,A1-A2) ══════
  {
    sentence: '저___ 학생입니다.',
    options: ['가', '는', '를', '도'],
    correct: 1,
    explanation: '主语"저"后面用主题助词"는"(收音有无:은/는)。这里 저 无收音选 는。',
    full: '저는 학생입니다.',
    meaning: '我是学生。',
    topic: '助词', level: 'A1',
  },
  {
    sentence: '책___ 읽어요.',
    options: ['에', '이', '을', '와'],
    correct: 2,
    explanation: '"책"是宾语,用宾格助词"을/를"。책 有收音 ㄱ 选 을。',
    full: '책을 읽어요.',
    meaning: '读书。',
    topic: '助词', level: 'A1',
  },
  {
    sentence: '학교___ 가요.',
    options: ['도', '을', '는', '에'],
    correct: 3,
    explanation: '"에"表示动作的目的地。区分:에(去/在静态)vs 에서(在...做事)。',
    full: '학교에 가요.',
    meaning: '去学校。',
    topic: '助词', level: 'A1',
  },
  {
    sentence: '도서관___ 공부해요.',
    options: ['와', '에', '을', '에서'],
    correct: 3,
    explanation: '在某地做动态动作用"에서"。공부하다 是动作,选 에서。',
    full: '도서관에서 공부해요.',
    meaning: '在图书馆学习。',
    topic: '助词', level: 'A1',
  },
  {
    sentence: '친구___ 같이 먹었어요.',
    options: ['을', '와', '에', '보다'],
    correct: 1,
    explanation: '"和...一起"用"와/과"。有收音+과,无收音+와。친구 无收音选 와。',
    full: '친구와 같이 먹었어요.',
    meaning: '和朋友一起吃了。',
    topic: '助词', level: 'A2',
  },
  {
    sentence: '언니___ 예뻐요.',
    options: ['가', '보다', '만', '도'],
    correct: 1,
    explanation: '"보다"用于比较。N보다 (더) A · "比 N 更 A"。',
    full: '언니보다 예뻐요.',
    meaning: '(她)比姐姐漂亮。',
    topic: '助词', level: 'A2',
  },

  // ══════ 时态 6 题 (过去/进行/将来,A1-A2) ══════
  {
    sentence: '어제 영화를 ___어요.',
    options: ['봤', '보', '보고', '봐요'],
    correct: 0,
    explanation: '过去时:보다 → 봤어요(缩略自 보+았어요)。어제 提示过去。',
    full: '어제 영화를 봤어요.',
    meaning: '昨天看了电影。',
    topic: '时态', level: 'A1',
  },
  {
    sentence: '지금 밥을 먹고 ___어요.',
    options: ['있', '없', '가', '와'],
    correct: 0,
    explanation: '"V-고 있다"表示正在进行。지금(现在)明确提示进行时。',
    full: '지금 밥을 먹고 있어요.',
    meaning: '现在正在吃饭。',
    topic: '时态', level: 'A2',
  },
  {
    sentence: '내일 서울에 ___ 거예요.',
    options: ['가는', '가을', '갈', '갔을'],
    correct: 2,
    explanation: '将来时"V-(으)ㄹ 거예요":动词词干+ㄹ 거예요。가+ㄹ = 갈。',
    full: '내일 서울에 갈 거예요.',
    meaning: '明天要去首尔。',
    topic: '时态', level: 'A1',
  },
  {
    sentence: '한국에 ___ 적이 있어요.',
    options: ['가는', '간', '갈', '가서'],
    correct: 1,
    explanation: '"V-(으)ㄴ 적이 있다"表示经历过。가+ㄴ = 간。',
    full: '한국에 간 적이 있어요.',
    meaning: '去过韩国。',
    topic: '时态', level: 'A2',
  },
  {
    sentence: '지금 회의 ___에요.',
    options: ['중이', '중에', '중는', '중이야'],
    correct: 0,
    explanation: '"N + 중이다"表示进行中。会议中 = 회의 중이에요。空格填 중이,连上 -에요 就是 중이에요。',
    full: '지금 회의 중이에요.',
    meaning: '现在正在开会。',
    topic: '时态', level: 'A2',
  },
  {
    sentence: '10년 전에 ___ 곳이에요.',
    options: ['가', '갈', '간', '갔던'],
    correct: 3,
    explanation: '"V-았/었던"表示回忆中已完成的动作。10년 전(10年前)提示过去回忆。간(V-(으)ㄴ)也语法上对,但语义偏客观陈述;갔던 更贴合"回忆中的地方"。',
    full: '10년 전에 갔던 곳이에요.',
    meaning: '这是10年前去过的地方。',
    topic: '时态', level: 'B1',
  },

  // ══════ 连接词尾 6 题 (因果/转折/条件,A2-B1) ══════
  {
    sentence: '비가 ___ 못 나갔어요.',
    options: ['오면', '와서', '오고', '오지만'],
    correct: 1,
    explanation: '"V-아/어서"表示原因。오+아서 → 와서。前后主语可不同,但结果句不能是命令。',
    full: '비가 와서 못 나갔어요.',
    meaning: '因为下雨没能出门。',
    topic: '连接词尾', level: 'A2',
  },
  {
    sentence: '피곤___ 계속 일해요.',
    options: ['해서', '하지만', '하면', '하고'],
    correct: 1,
    explanation: '"A/V-지만"表示转折"虽然但是"。前后语义相反选 지만。',
    full: '피곤하지만 계속 일해요.',
    meaning: '虽然累但还在继续工作。',
    topic: '连接词尾', level: 'A2',
  },
  {
    sentence: '시간이 ___ 같이 가요.',
    options: ['있어서', '있고', '있으면', '있지만'],
    correct: 2,
    explanation: '"V-(으)면"表示条件/假设"如果...就..."。',
    full: '시간이 있으면 같이 가요.',
    meaning: '有时间的话一起去吧。',
    topic: '连接词尾', level: 'A2',
  },
  {
    sentence: '음악을 ___ 공부해요.',
    options: ['들어서', '들으면', '들으면서', '들고'],
    correct: 2,
    explanation: '"V-(으)면서"表示同时进行。듣다 是 ㄷ 不规则,ㄷ → ㄹ + 으면서 = 들으면서。',
    full: '음악을 들으면서 공부해요.',
    meaning: '一边听音乐一边学习。',
    topic: '连接词尾', level: 'A2',
  },
  {
    sentence: '아무리 ___ 잘 안 돼요.',
    options: ['해도', '해서', '하면', '하고'],
    correct: 0,
    explanation: '"아무리 V-아/어도" · 无论怎么...也...。让步语气,搭配 아무리 使用。',
    full: '아무리 해도 잘 안 돼요.',
    meaning: '再怎么做也不成功。',
    topic: '连接词尾', level: 'B1',
  },
  {
    sentence: '한국에 ___ 김치찌개를 자주 먹어요.',
    options: ['오는데', '오고 나서', '오려면', '와서는'],
    correct: 1,
    explanation: '"V-고 나서"表示一个动作结束后再做另一个。오다 → 오고 나서。',
    full: '한국에 오고 나서 김치찌개를 자주 먹어요.',
    meaning: '来韩国以后经常吃泡菜锅。',
    topic: '连接词尾', level: 'B1',
  },

  // ══════ 敬语与情态 6 题 (A2-B1) ══════
  {
    sentence: '할머니께서 오___어요.',
    options: ['았', '셨', '으셨', '셔서'],
    correct: 1,
    explanation: '尊敬语 -(으)시- + 过去 -었- = -(으)셨-。오다 无收音直接接 -셨-(不加 으)。',
    full: '할머니께서 오셨어요.',
    meaning: '奶奶来了。',
    topic: '敬语与情态', level: 'A2',
  },
  {
    sentence: '사진 좀 ___ 주세요.',
    options: ['찍은', '찍고', '찍어', '찍을'],
    correct: 2,
    explanation: '"V-아/어 주세요"请对方为自己做某事。찍다 + 어 주세요 = 찍어 주세요。',
    full: '사진 좀 찍어 주세요.',
    meaning: '请帮我拍张照。',
    topic: '敬语与情态', level: 'A1',
  },
  {
    sentence: '커피 한 잔 ___어요?',
    options: ['드시', '드셨', '드시겠', '드셔야'],
    correct: 2,
    explanation: '"V-(으)시겠어요?"是很礼貌的建议/意愿询问。먹다→드시다(尊敬替换词)。',
    full: '커피 한 잔 드시겠어요?',
    meaning: '(您)要来一杯咖啡吗？',
    topic: '敬语与情态', level: 'A2',
  },
  {
    sentence: '지금 나가___ 안 돼요.',
    options: ['면', '아도', '기', '려고'],
    correct: 0,
    explanation: '"V-(으)면 안 되다"表示禁止"不可以做"。나가 + 면 안 돼요。',
    full: '지금 나가면 안 돼요.',
    meaning: '现在不能出去。',
    topic: '敬语与情态', level: 'A2',
  },
  {
    sentence: '내일까지 끝내___ 해요.',
    options: ['면', '고', '야', '지'],
    correct: 2,
    explanation: '"V-아/어야 하다/되다"表示必须/应当。끝내 + 야 해요。',
    full: '내일까지 끝내야 해요.',
    meaning: '明天之前得完成。',
    topic: '敬语与情态', level: 'A2',
  },
  {
    sentence: '어제 늦게 ___거든요.',
    options: ['잤', '자는', '잔', '자'],
    correct: 0,
    explanation: '"V-았/었거든요"回答式解释"因为(过去)...嘛"。终结词尾 -거든요,过去时用 -았/었거든요。',
    full: '어제 늦게 잤거든요.',
    meaning: '因为昨天睡得晚嘛。',
    topic: '敬语与情态', level: 'B1',
  },
];
