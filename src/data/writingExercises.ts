import type { ComponentType } from 'react';
import { PenLine, Sparkles, BookOpen, History } from 'lucide-react';

export type WritingMode = 'imitation' | 'free' | 'cloze' | 'history';

export interface HistoryRecord {
  [k: string]: unknown;
  id: string;
  date: string;
  mode: string;
  modeLabel: string;
  score: string;
  snippet: string;
  details: any;
}

export interface ImitationPrompt {
  [k: string]: unknown;
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
  [k: string]: unknown;
  title: string;
  titleKo: string;
  prompt: string;
  keywords: string[];
  level?: 'A1' | 'A2' | 'B1';
}

export interface ClozeExercise {
  [k: string]: unknown;
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
  [k: string]: unknown;
  key: WritingMode;
  label: string;
  icon: ComponentType<{ size?: number }>;
  desc: string;
}

export const modeConfig: ModeConfig[] = [
  { key: 'imitation', label: '仿写', labelEn: 'paraphrase', icon: PenLine, desc: '看中文写韩语', descEn: 'write Korean from Chinese' },
  { key: 'free', label: '自由写', labelEn: 'free writing', icon: Sparkles, desc: '话题写作', descEn: 'Topic Writing' },
  { key: 'cloze', label: '填空', labelEn: 'Fill in the Blank', icon: BookOpen, desc: '补全助词/语尾', descEn: 'Complete the Particle/Ending' },
  { key: 'history', label: '写作历史', labelEn: 'Writing History', icon: History, desc: '查看记录', descEn: 'View Records' },
];

export const imitationPrompts: ImitationPrompt[] = [
  // ═══ A1 · 基础判断句 & 现在时 & 过去时 (8 题) ═══
  { zh: '我是学生。', zhEn: 'I am a student.', ko: '저는 학생입니다.', hint: '저는 ~ 입니다 (我是~)', hintEn: '저는 ~ 입니다 (I am ~)', grammarPoint: 'N은/는 N입니다 · 名词判断句 습니다体', grammarPointEn: 'N은/는 N입니다 · Noun Predicate Sentence (습니다 Form)', level: 'A1', pitfall: '主题助词按 收音: 저→는, 학생→은', pitfallEn: 'Topic particle by final consonant: 저→는, 학생→은' },
  { zh: '今天天气很好。', zhEn: 'The weather is really nice today.', ko: '오늘 날씨가 좋아요.', hint: '날씨가 좋아요 (天气好)', hintEn: '날씨가 좋아요 (The weather is nice)', grammarPoint: 'N이/가 A-아요/어요 · 形容词谓语句', grammarPointEn: 'N이/가 A-아요/어요 · Adjective Predicate Sentence', level: 'A1', pitfall: '主格助词 이/가 按收音选:날씨→가', pitfallEn: 'Subject particle 이/가 by final consonant: 날씨→가' },
  { zh: '请给我一杯咖啡。', zhEn: 'Please give me a coffee.', ko: '커피 한 잔 주세요.', hint: '한 잔 주세요 (给我一杯)', hintEn: '한 잔 주세요 (Give me one cup)', grammarPoint: 'V-(으)세요 · 命令/请求敬语 · 固有数词+量词', grammarPointEn: 'V-(으)세요 · Command/Request Honorific · Native Numbers + Counters', level: 'A1', pitfall: '数词用固有数词 하나→한,不是 일', pitfallEn: 'Use native number 하나→한, not 일' },
  { zh: '昨天看了电影。', zhEn: 'I watched a movie yesterday.', ko: '어제 영화를 봤어요.', hint: '~았/었어요 (过去时)', hintEn: '~았/었어요 (Past Tense)', grammarPoint: 'V-았/었어요 · 过去时词尾', grammarPointEn: 'V-았/었어요 · Past Tense Ending', level: 'A1', pitfall: '보다→봤어요 缩略;宾格用 을/를,영화→를', pitfallEn: '보다→봤어요 contraction; object particle 을/를, 영화→를' },
  { zh: '我不喜欢辣的。', zhEn: 'I don\'t like spicy food.', ko: '매운 것을 안 좋아해요.', hint: '안 + 动词 (不~)', hintEn: '안 + Verb (not ~)', grammarPoint: '否定副词 안 · A-(으)ㄴ 것 定语形+名词化', grammarPointEn: 'Negative Adverb 안 · A-(으)ㄴ 것 Adnominal Form + Nominalization', level: 'A1', pitfall: '안 单独放动词前,不要写成 좋아해요 안', pitfallEn: 'Place 안 before the verb, not 좋아해요 안' },
  { zh: '有妹妹吗？', zhEn: 'Do you have a younger sister?', ko: '여동생이 있어요?', hint: 'N이/가 있다 (有~)', hintEn: 'N이/가 있다 (to have ~)', grammarPoint: 'N이/가 있다/없다 · 存在句 · ?号语调', grammarPointEn: 'N이/가 있다/없다 · Existential Sentence · Rising Intonation', level: 'A1', pitfall: '否定用 없다,不是 안 있다', pitfallEn: 'Use 없다 for negation, not 안 있다' },
  { zh: '我住在首尔。', zhEn: 'I live in Seoul.', ko: '저는 서울에 살아요.', hint: '~에 살다 (住在~)', hintEn: '~에 살다 (to live in~)', grammarPoint: 'N에 살다 · 居住地用 에,不是 에서', grammarPointEn: 'N에 살다 · Use 에 for location of residence, not 에서', level: 'A1', pitfall: '살다 是 ㄹ 不规则:살+아요 = 살아요(现在时不脱落)', pitfallEn: '살다 is a ㄹ irregular: 살+아요 = 살아요 (no drop in present tense)' },
  { zh: '我几点见？', zhEn: 'What time do I meet?', ko: '몇 시에 만나요?', hint: '몇 시에 (几点)', hintEn: '몇 시에 (what time)', grammarPoint: '몇 疑问词 · 时间点用 N에', grammarPointEn: '몇 question word · Use N에 for specific times', level: 'A1', pitfall: '몇 后接量词:몇 시(几点)/몇 명(几人)', pitfallEn: '몇 is followed by a counter: 몇 시 (what time)/몇 명 (how many people)' },

  // ═══ A2 · 连接词尾 & 情态 & 推测 (10 题) ═══
  { zh: '我想吃韩国料理。', zhEn: 'I want to eat Korean food.', ko: '한국 요리를 먹고 싶어요.', hint: '~고 싶어요 (想~)', hintEn: '~고 싶어요 (want to~)', grammarPoint: 'V-고 싶다 · 想做,主语是"我"时用', grammarPointEn: 'V-고 싶다 · Want to do; use when the subject is "I"', level: 'A2', pitfall: '第三人称用 V-고 싶어하다,不是 싶다', pitfallEn: 'For third person, use V-고 싶어하다, not 싶다' },
  { zh: '我在学韩语。', zhEn: 'I\'m learning Korean.', ko: '한국어를 배우고 있어요.', hint: '~고 있어요 (正在)', hintEn: '~고 있어요 (currently~)', grammarPoint: 'V-고 있다 · 现在进行时', grammarPointEn: 'V-고 있다 · Present progressive tense', level: 'A2', pitfall: '있다/계시다/알다 等状态动词不能再套 -고 있다', pitfallEn: 'State verbs like 있다/계시다/알다 cannot take -고 있다' },
  { zh: '这里可以拍照吗？', zhEn: 'Can I take photos here?', ko: '여기서 사진 찍어도 돼요?', hint: '~아/어도 돼요? (可以~吗?)', hintEn: '~아/어도 돼요? (May I~?)', grammarPoint: 'V-아/어도 되다 · 允许', grammarPointEn: 'V-아/어도 되다 · Permission', level: 'A2', pitfall: '否定用 안 되다 或 -(으)면 안 되다', pitfallEn: 'For negation, use 안 되다 or -(으)면 안 되다' },
  { zh: '比想象中更难。', zhEn: 'It\'s harder than I thought.', ko: '생각보다 더 어려워요.', hint: 'N보다 더 (比~更)', hintEn: 'N보다 더 (more than~)', grammarPoint: 'N보다 (더) A · 比较句', grammarPointEn: 'N보다 (더) A · Comparative sentence', level: 'A2', pitfall: '어렵다 是 ㅂ 不规则:어렵+어요 → 어려워요', pitfallEn: '어렵다 is a ㅂ irregular: 어렵+어요 → 어려워요' },
  { zh: '因为下雨没能出门。', zhEn: 'I couldn\'t go out because it rained.', ko: '비가 와서 못 나갔어요.', hint: 'V-아/어서 (因为~) + 못 V (没能~)', hintEn: 'V-아/어서 (because~) + 못 V (couldn\'t~)', grammarPoint: 'V-아/어서 · 原因 · 前后主语一致 + 못 · 能力否定', grammarPointEn: 'V-아/어서 · Reason · Same subject before and after + 못 · Ability negation', level: 'A2', pitfall: '못 表能力否定,안 表主观不做;分不清就错', pitfallEn: '못 indicates inability, 안 indicates unwillingness; mixing them up is a mistake' },
  { zh: '一边喝咖啡一边看书。', zhEn: 'Drinking coffee while reading a book.', ko: '커피를 마시면서 책을 읽어요.', hint: '~(으)면서 (一边~一边)', hintEn: '~(으)면서 (while doing)', grammarPoint: 'V-(으)면서 · 同时进行两个动作', grammarPointEn: 'V-(으)면서 · doing two actions simultaneously', level: 'A2', pitfall: '两个动作主语必须相同,不同主语用 -는 동안', pitfallEn: 'The subject must be the same for both actions; if different, use -는 동안' },
  { zh: '今天好像会下雨。', zhEn: 'It seems like it will rain today.', ko: '오늘 비가 올 것 같아요.', hint: 'V-(으)ㄹ 것 같다 (推测未来)', hintEn: 'V-(으)ㄹ 것 같다 (future speculation)', grammarPoint: 'V-(으)ㄹ 것 같다 · 未来推测/委婉', grammarPointEn: 'V-(으)ㄹ 것 같다 · Future speculation/polite', level: 'A2', pitfall: '推测过去用 V-았/었을 것 같다', pitfallEn: 'For past speculation, use V-았/었을 것 같다' },
  { zh: '朋友说她明天来。', zhEn: 'My friend said she will come tomorrow.', ko: '친구가 내일 온다고 했어요.', hint: '~다고 하다 (间接引用陈述)', hintEn: '~다고 하다 (indirect quotation of statements)', grammarPoint: 'V-ㄴ/는다고 하다 · 陈述句间接引用', grammarPointEn: 'V-ㄴ/는다고 하다 · Indirect quotation of declarative sentences', level: 'A2', pitfall: '动词现在时引用要加 -ㄴ다/는다,不是原型', pitfallEn: 'When quoting present tense verbs, add -ㄴ다/는다, not the base form' },
  { zh: '虽然很累但很开心。', zhEn: 'Although I\'m tired, I\'m happy.', ko: '힘들지만 재미있어요.', hint: '~지만 (虽然但是)', hintEn: '~지만 (although/but)', grammarPoint: 'A/V-지만 · 转折连接', grammarPointEn: 'A/V-지만 · Contrastive connector', level: 'A2', pitfall: '过去时用 -았/었지만,如 배웠지만 · 学过但...', pitfallEn: 'For past tense, use -았/었지만, e.g., 배웠지만 · learned but...' },
  { zh: '如果有时间就学习。', zhEn: 'If I have time, I study.', ko: '시간이 있으면 공부해요.', hint: '~(으)면 (如果)', hintEn: '~(으)면 (if)', grammarPoint: 'V-(으)면 · 条件/假设', grammarPointEn: 'V-(으)면 · Condition/hypothesis', level: 'A2', pitfall: '收音后加 -으면,无收音直接 -면', pitfallEn: 'Add -으면 after a final consonant, use -면 directly without one' },

  // ═══ B1 · 引用/被动/多重从句 (6 题) ═══
  { zh: '越学越有意思。', zhEn: 'The more I study, the more interesting it gets.', ko: '배우면 배울수록 재미있어요.', hint: '-(으)면 -(으)ㄹ수록 (越~越~)', hintEn: '-(으)면 -(으)ㄹ수록 (the more... the more...)', grammarPoint: 'V-(으)면 V-(으)ㄹ수록 · 递进', grammarPointEn: 'V-(으)면 V-(으)ㄹ수록 · Progressive', level: 'B1', pitfall: '两个动词必须是同一个,不能混用', pitfallEn: 'The two verbs must be the same; they cannot be mixed' },
  { zh: '这道菜是我妈做的。', zhEn: 'My mom made this dish.', ko: '이 음식은 엄마가 만드신 거예요.', hint: '-(으)신 (尊敬定语)', hintEn: '-(으)신 (honorific modifier)', grammarPoint: '尊敬 -(으)시- + V-(으)ㄴ 것이다 · 强调施事', grammarPointEn: 'Honorific -(으)시- + V-(으)ㄴ 것이다 · emphasizes the doer', level: 'B1', pitfall: '만들다 ㄹ 前脱落 → 만드신', pitfallEn: '만들다 drops ㄹ before → 만드신' },
  { zh: '好像很久没见了。', zhEn: 'It seems like it\'s been a while.', ko: '오랜만에 만난 것 같아요.', hint: '오랜만에 (好久) + -(으)ㄴ 것 같다', hintEn: '오랜만에 (after a long time) + -(으)ㄴ 것 같다', grammarPoint: '오랜만에 + V-(으)ㄴ 것 같다 · 过去推测', grammarPointEn: '오랜만에 + V-(으)ㄴ 것 같다 · past speculation', level: 'B1', pitfall: '不用 오래된만에,是固定表达 오랜만에', pitfallEn: 'Not 오래된만에, it\'s the fixed expression 오랜만에' },
  { zh: '这本书被翻译成韩语了。', zhEn: 'This book was translated into Korean.', ko: '이 책은 한국어로 번역되었어요.', hint: 'N-되다 (被动)', hintEn: 'N-되다 (passive)', grammarPoint: 'N + -되다 · 汉字词被动 · N(으)로 · 译成/变成', grammarPointEn: 'N + -되다 · Sino-Korean passive · N(으)로 · translated into/becomes', level: 'B1', pitfall: '되었어요 = 됐어요(缩略),两种都对', pitfallEn: '되었어요 = 됐어요 (contraction), both are correct' },
  { zh: '我打算下个月去韩国。', zhEn: 'I plan to go to Korea next month.', ko: '다음 달에 한국에 가려고 해요.', hint: 'V-(으)려고 하다 (打算)', hintEn: 'V-(으)려고 하다 (intend to)', grammarPoint: 'V-(으)려고 하다 · 计划/打算', grammarPointEn: 'V-(으)려고 하다 · plan/intention', level: 'B1', pitfall: '与 V-(으)ㄹ 거예요 意思相近,前者更强调意图', pitfallEn: 'Similar to V-(으)ㄹ 거예요, but the former emphasizes intention more' },
  { zh: '越努力越能提高。', zhEn: 'The harder you try, the more you improve.', ko: '노력할수록 실력이 향상돼요.', hint: '-(으)ㄹ수록 (越~) + N-되다', hintEn: '-(으)ㄹ수록 (the more~) + N-되다', grammarPoint: 'V-(으)ㄹ수록 · 单独用也可以 + N-되다 变化', grammarPointEn: 'V-(으)ㄹ수록 · can be used alone + N-되다 change', level: 'B1', pitfall: '향상하다(动作)/향상되다(结果)/향상시키다(使动)三形区分', pitfallEn: 'Distinguish 향상하다 (action)/향상되다 (result)/향상시키다 (causative)' },
];

export const freeTopics: FreeTopic[] = [
  // ─── A1 · 简单描述 ───
  { title: '自我介绍', titleEn: 'Self-introduction', titleKo: '자기소개', prompt: '用韩语写一段自我介绍(3-5 句),包含名字、职业/身份、兴趣爱好。', promptEn: 'Write a self-introduction in Korean (3-5 sentences), including your name, job/status, and hobbies.', keywords: ['이름', '직업', '취미', '살다', '좋아하다'], level: 'A1' },
  { title: '我的一天', titleEn: 'My Day', titleKo: '하루 일과', prompt: '描述你的一天。从早上起床到晚上睡觉,你通常会做什么?', promptEn: 'Describe your day. From waking up in the morning to going to bed at night, what do you usually do?', keywords: ['아침', '점심', '저녁', '공부', '운동'], level: 'A1' },
  { title: '最喜欢的食物', titleEn: 'Favorite Food', titleKo: '좋아하는 음식', prompt: '说说你最喜欢的食物。是什么?为什么喜欢?多久吃一次?', promptEn: 'Talk about your favorite food. What is it? Why do you like it? How often do you eat it?', keywords: ['음식', '맛있다', '좋아하다', '자주'], level: 'A1' },
  { title: '我的家人', titleEn: 'My Family', titleKo: '우리 가족', prompt: '介绍你的家人。有几口人?他们是做什么的?你和谁最亲近?', promptEn: 'Introduce your family. How many people are there? What do they do? Who are you closest to?', keywords: ['가족', '부모님', '형제', '살다', '일하다'], level: 'A1' },

  // ─── A2 · 场景叙述 ───
  { title: '上周末', titleEn: 'Last Weekend', titleKo: '지난 주말', prompt: '描述你上周末做了什么。去了哪里?见了谁?做了什么有趣的事?', promptEn: 'Describe what you did last weekend. Where did you go? Who did you see? What fun things did you do?', keywords: ['주말', '친구', '만나다', '재미있다'], level: 'A2' },
  { title: '一次旅行', titleEn: 'A Trip', titleKo: '기억에 남는 여행', prompt: '写一次让你印象深刻的旅行。什么时候去的?和谁去的?最难忘的是什么?', promptEn: 'Write about a memorable trip. When did you go? Who did you go with? What was the most unforgettable part?', keywords: ['여행', '기억', '풍경', '먹다', '재미있다'], level: 'A2' },
  { title: '给朋友的邀请', titleEn: 'Invitation to a Friend', titleKo: '친구에게 초대', prompt: '给一位韩国朋友写一段邀请话,请他/她周末来家里吃饭。写清时间、地点、菜品。', promptEn: 'Write an invitation to a Korean friend, asking them to come over for a meal this weekend. Include the time, place, and dishes.', keywords: ['주말', '집', '초대', '만들다', '기다리다'], level: 'A2' },
  { title: '未来计划', titleEn: 'Future Plans', titleKo: '앞으로의 계획', prompt: '接下来 1 年你打算做什么?学什么?去哪里?有什么目标?', promptEn: 'What do you plan to do in the next year? What will you learn? Where will you go? What goals do you have?', keywords: ['계획', '여행', '공부', '목표', '(으)려고 하다'], level: 'A2' },

  // ─── B1 · 观点/对比 ───
  { title: '喜欢的季节', titleEn: 'Favorite Season', titleKo: '좋아하는 계절', prompt: '你最喜欢哪个季节?说明理由,并举一件那个季节最爱做的事。', promptEn: 'Which season do you like best? Explain why, and give one thing you love to do in that season.', keywords: ['계절', '기후', '풍경', '이유', '가장'], level: 'B1' },
  { title: '城市 vs 农村', titleEn: 'City vs. Countryside', titleKo: '도시와 시골', prompt: '你更愿意住在城市还是农村?请从生活便利、环境、人际关系三方面对比。', promptEn: 'Would you rather live in a city or the countryside? Compare them in terms of convenience, environment, and relationships.', keywords: ['도시', '시골', '편리하다', '환경', '이웃'], level: 'B1' },
  { title: '学韩语的原因', titleEn: 'Reasons for learning Korean', titleKo: '한국어를 배우는 이유', prompt: '你为什么开始学韩语?学的过程中最难/最有趣的是什么?未来想用韩语做什么?', promptEn: 'Why did you start learning Korean? What was the hardest/most interesting part? What do you want to do with Korean in the future?', keywords: ['시작하다', '어렵다', '재미있다', '앞으로'], level: 'B1' },
  { title: '一次失败', titleEn: 'A failure', titleKo: '실패한 경험', prompt: '写一次让你觉得失败的经历。发生了什么?你从中学到了什么?', promptEn: 'Write about a time you felt like you failed. What happened? What did you learn from it?', keywords: ['실패', '경험', '배우다', '느끼다', '그래서'], level: 'B1' },
];

export const clozeExercises: ClozeExercise[] = [
  // ══════ 助词 6 题 (最高频,A1-A2) ══════
  {
    sentence: '저___ 학생입니다.',
    options: ['가', '는', '를', '도'],
    correct: 1,
    explanation: '主语"저"后面用主题助词"는"(收音有无:은/는)。这里 저 无收音选 는。', explanationEn: 'The subject "저" takes the topic particle "는" (with/without final consonant: 은/는). Here, 저 has no final consonant, so choose 는.',
    full: '저는 학생입니다.',
    meaning: '我是学生。', meaningEn: 'I am a student.',
    topic: '助词', topicEn: 'Particle', level: 'A1',
  },
  {
    sentence: '책___ 읽어요.',
    options: ['에', '이', '을', '와'],
    correct: 2,
    explanation: '"책"是宾语,用宾格助词"을/를"。책 有收音 ㄱ 选 을。', explanationEn: '"책" is the object, so use the object particle "을/를". 책 has the final consonant ㄱ, so choose 을.',
    full: '책을 읽어요.',
    meaning: '读书。', meaningEn: 'Reading a book.',
    topic: '助词', topicEn: 'Particle', level: 'A1',
  },
  {
    sentence: '학교___ 가요.',
    options: ['도', '을', '는', '에'],
    correct: 3,
    explanation: '"에"表示动作的目的地。区分:에(去/在静态)vs 에서(在...做事)。', explanationEn: '"에" indicates the destination of an action. Distinguish: 에 (going to/being at a static place) vs. 에서 (doing something at a place).',
    full: '학교에 가요.',
    meaning: '去学校。', meaningEn: 'Go to school.',
    topic: '助词', topicEn: 'Particle', level: 'A1',
  },
  {
    sentence: '도서관___ 공부해요.',
    options: ['와', '에', '을', '에서'],
    correct: 3,
    explanation: '在某地做动态动作用"에서"。공부하다 是动作,选 에서。', explanationEn: 'Use "에서" for dynamic actions done at a place. 공부하다 is an action, so choose 에서.',
    full: '도서관에서 공부해요.',
    meaning: '在图书馆学习。', meaningEn: 'Study at the library.',
    topic: '助词', topicEn: 'Particle', level: 'A1',
  },
  {
    sentence: '친구___ 같이 먹었어요.',
    options: ['을', '와', '에', '보다'],
    correct: 1,
    explanation: '"和...一起"用"와/과"。有收音+과,无收音+와。친구 无收音选 와。', explanationEn: 'Use "와/과" for "together with". With final consonant + 과, without + 와. 친구 has no final consonant, so choose 와.',
    full: '친구와 같이 먹었어요.',
    meaning: '和朋友一起吃了。', meaningEn: 'I ate with a friend.',
    topic: '助词', topicEn: 'Particle', level: 'A2',
  },
  {
    sentence: '언니___ 예뻐요.',
    options: ['가', '보다', '만', '도'],
    correct: 1,
    explanation: '"보다"用于比较。N보다 (더) A · "比 N 更 A"。', explanationEn: '"보다" is used for comparison. N보다 (더) A · "more A than N".',
    full: '언니보다 예뻐요.',
    meaning: '(她)比姐姐漂亮。', meaningEn: '(She) is prettier than her older sister.',
    topic: '助词', topicEn: 'Particle', level: 'A2',
  },

  // ══════ 时态 6 题 (过去/进行/将来,A1-A2) ══════
  {
    sentence: '어제 영화를 ___어요.',
    options: ['봤', '보', '보고', '봐요'],
    correct: 0,
    explanation: '过去时:보다 → 봤어요(缩略自 보+았어요)。어제 提示过去。', explanationEn: 'Past tense: 보다 → 봤어요 (contracted from 보+았어요). 어제 indicates the past.',
    full: '어제 영화를 봤어요.',
    meaning: '昨天看了电影。', meaningEn: 'I watched a movie yesterday.',
    topic: '时态', topicEn: 'Tense', level: 'A1',
  },
  {
    sentence: '지금 밥을 먹고 ___어요.',
    options: ['있', '없', '가', '와'],
    correct: 0,
    explanation: '"V-고 있다"表示正在进行。지금(现在)明确提示进行时。', explanationEn: '"V-고 있다" indicates an ongoing action. 지금 (now) clearly signals the progressive tense.',
    full: '지금 밥을 먹고 있어요.',
    meaning: '现在正在吃饭。', meaningEn: 'I\'m eating right now.',
    topic: '时态', topicEn: 'Tense', level: 'A2',
  },
  {
    sentence: '내일 서울에 ___ 거예요.',
    options: ['가는', '가을', '갈', '갔을'],
    correct: 2,
    explanation: '将来时"V-(으)ㄹ 거예요":动词词干+ㄹ 거예요。가+ㄹ = 갈。', explanationEn: 'Future tense "V-(으)ㄹ 거예요": verb stem + ㄹ 거예요. 가+ㄹ = 갈.',
    full: '내일 서울에 갈 거예요.',
    meaning: '明天要去首尔。', meaningEn: 'I\'m going to Seoul tomorrow.',
    topic: '时态', topicEn: 'Tense', level: 'A1',
  },
  {
    sentence: '한국에 ___ 적이 있어요.',
    options: ['가는', '간', '갈', '가서'],
    correct: 1,
    explanation: '"V-(으)ㄴ 적이 있다"表示经历过。가+ㄴ = 간。', explanationEn: '"V-(으)ㄴ 적이 있다" indicates having experienced something. 가+ㄴ = 간.',
    full: '한국에 간 적이 있어요.',
    meaning: '去过韩国。', meaningEn: 'I\'ve been to Korea.',
    topic: '时态', topicEn: 'Tense', level: 'A2',
  },
  {
    sentence: '지금 회의 ___에요.',
    options: ['중이', '중에', '중는', '중이야'],
    correct: 0,
    explanation: '"N + 중이다"表示进行中。会议中 = 회의 중이에요。空格填 중이,连上 -에요 就是 중이에요。', explanationEn: '"N + 중이다" indicates something is in progress. In a meeting = 회의 중이에요. Fill in the blank with 중이, and with -에요 attached it becomes 중이에요.',
    full: '지금 회의 중이에요.',
    meaning: '现在正在开会。', meaningEn: 'We\'re in a meeting right now.',
    topic: '时态', topicEn: 'Tense', level: 'A2',
  },
  {
    sentence: '10년 전에 ___ 곳이에요.',
    options: ['가', '갈', '간', '갔던'],
    correct: 3,
    explanation: '"V-았/었던"表示回忆中已完成的动作。10년 전(10年前)提示过去回忆。간(V-(으)ㄴ)也语法上对,但语义偏客观陈述;갔던 更贴合"回忆中的地方"。', explanationEn: '"V-았/었던" indicates an action completed in the past that you\'re recalling. 10년 전 (10 years ago) signals a past memory. 간 (V-(으)ㄴ) is grammatically correct but sounds more objective; 갔던 fits better with "a place from memory."',
    full: '10년 전에 갔던 곳이에요.',
    meaning: '这是10年前去过的地方。', meaningEn: 'This is a place I went to 10 years ago.',
    topic: '时态', topicEn: 'Tense', level: 'B1',
  },

  // ══════ 连接词尾 6 题 (因果/转折/条件,A2-B1) ══════
  {
    sentence: '비가 ___ 못 나갔어요.',
    options: ['오면', '와서', '오고', '오지만'],
    correct: 1,
    explanation: '"V-아/어서"表示原因。오+아서 → 와서。前后主语可不同,但结果句不能是命令。', explanationEn: '"V-아/어서" expresses cause. 오+아서 → 와서. The subjects can differ, but the result clause can\'t be a command.',
    full: '비가 와서 못 나갔어요.',
    meaning: '因为下雨没能出门。', meaningEn: 'I couldn\'t go out because it rained.',
    topic: '连接词尾', topicEn: 'Connective ending', level: 'A2',
  },
  {
    sentence: '피곤___ 계속 일해요.',
    options: ['해서', '하지만', '하면', '하고'],
    correct: 1,
    explanation: '"A/V-지만"表示转折"虽然但是"。前后语义相反选 지만。', explanationEn: '"A/V-지만" expresses contrast, "although/but." Choose 지만 when the clauses are semantically opposite.',
    full: '피곤하지만 계속 일해요.',
    meaning: '虽然累但还在继续工作。', meaningEn: 'I\'m tired, but I\'m still working.',
    topic: '连接词尾', topicEn: 'Connective ending', level: 'A2',
  },
  {
    sentence: '시간이 ___ 같이 가요.',
    options: ['있어서', '있고', '있으면', '있지만'],
    correct: 2,
    explanation: '"V-(으)면"表示条件/假设"如果...就..."。', explanationEn: '"V-(으)면" expresses a condition or hypothesis, "if... then..."',
    full: '시간이 있으면 같이 가요.',
    meaning: '有时间的话一起去吧。', meaningEn: 'If you have time, let\'s go together.',
    topic: '连接词尾', topicEn: 'Connective ending', level: 'A2',
  },
  {
    sentence: '음악을 ___ 공부해요.',
    options: ['들어서', '들으면', '들으면서', '들고'],
    correct: 2,
    explanation: '"V-(으)면서"表示同时进行。듣다 是 ㄷ 不规则,ㄷ → ㄹ + 으면서 = 들으면서。', explanationEn: '"V-(으)면서" indicates simultaneous actions. 듣다 is a ㄷ-irregular verb: ㄷ → ㄹ + 으면서 = 들으면서.',
    full: '음악을 들으면서 공부해요.',
    meaning: '一边听音乐一边学习。', meaningEn: 'I study while listening to music.',
    topic: '连接词尾', topicEn: 'Connective ending', level: 'A2',
  },
  {
    sentence: '아무리 ___ 잘 안 돼요.',
    options: ['해도', '해서', '하면', '하고'],
    correct: 0,
    explanation: '"아무리 V-아/어도" · 无论怎么...也...。让步语气,搭配 아무리 使用。', explanationEn: '"아무리 V-아/어도" means "no matter how..." It\'s concessive and pairs with 아무리.',
    full: '아무리 해도 잘 안 돼요.',
    meaning: '再怎么做也不成功。', meaningEn: 'No matter how I try, it doesn\'t work.',
    topic: '连接词尾', topicEn: 'Connective ending', level: 'B1',
  },
  {
    sentence: '한국에 ___ 김치찌개를 자주 먹어요.',
    options: ['오는데', '오고 나서', '오려면', '와서는'],
    correct: 1,
    explanation: '"V-고 나서"表示一个动作结束后再做另一个。오다 → 오고 나서。', explanationEn: '"V-고 나서" means doing one action after another finishes. 오다 → 오고 나서.',
    full: '한국에 오고 나서 김치찌개를 자주 먹어요.',
    meaning: '来韩国以后经常吃泡菜锅。', meaningEn: 'Since coming to Korea, I often eat kimchi stew.',
    topic: '连接词尾', topicEn: 'Connective ending', level: 'B1',
  },

  // ══════ 敬语与情态 6 题 (A2-B1) ══════
  {
    sentence: '할머니께서 오___어요.',
    options: ['았', '셨', '으셨', '셔서'],
    correct: 1,
    explanation: '尊敬语 -(으)시- + 过去 -었- = -(으)셨-。오다 无收音直接接 -셨-(不加 으)。', explanationEn: 'Honorific -(으)시- + past -었- = -(으)셨-. 오다 has no final consonant, so it directly takes -셨- (no 으).',
    full: '할머니께서 오셨어요.',
    meaning: '奶奶来了。', meaningEn: 'Grandmother came.',
    topic: '敬语与情态', topicEn: 'Honorifics and Modality', level: 'A2',
  },
  {
    sentence: '사진 좀 ___ 주세요.',
    options: ['찍은', '찍고', '찍어', '찍을'],
    correct: 2,
    explanation: '"V-아/어 주세요"请对方为自己做某事。찍다 + 어 주세요 = 찍어 주세요。', explanationEn: '"V-아/어 주세요" asks someone to do something for you. 찍다 + 어 주세요 = 찍어 주세요.',
    full: '사진 좀 찍어 주세요.',
    meaning: '请帮我拍张照。', meaningEn: 'Please take a picture for me.',
    topic: '敬语与情态', topicEn: 'Honorifics and Modality', level: 'A1',
  },
  {
    sentence: '커피 한 잔 ___어요?',
    options: ['드시', '드셨', '드시겠', '드셔야'],
    correct: 2,
    explanation: '"V-(으)시겠어요?"是很礼貌的建议/意愿询问。먹다→드시다(尊敬替换词)。', explanationEn: '"V-(으)시겠어요?" is a very polite suggestion or inquiry about intention. 먹다→드시다 (honorific substitute).',
    full: '커피 한 잔 드시겠어요?',
    meaning: '(您)要来一杯咖啡吗？', meaningEn: 'Would you like a cup of coffee?',
    topic: '敬语与情态', topicEn: 'Honorifics and Modality', level: 'A2',
  },
  {
    sentence: '지금 나가___ 안 돼요.',
    options: ['면', '아도', '기', '려고'],
    correct: 0,
    explanation: '"V-(으)면 안 되다"表示禁止"不可以做"。나가 + 면 안 돼요。', explanationEn: '"V-(으)면 안 되다" expresses prohibition, "can\'t do." 나가 + 면 안 돼요.',
    full: '지금 나가면 안 돼요.',
    meaning: '现在不能出去。', meaningEn: 'I can\'t go out right now.',
    topic: '敬语与情态', topicEn: 'Honorifics and Modality', level: 'A2',
  },
  {
    sentence: '내일까지 끝내___ 해요.',
    options: ['면', '고', '야', '지'],
    correct: 2,
    explanation: '"V-아/어야 하다/되다"表示必须/应当。끝내 + 야 해요。', explanationEn: '"V-아/어야 하다/되다" expresses obligation or necessity. 끝내 + 야 해요.',
    full: '내일까지 끝내야 해요.',
    meaning: '明天之前得完成。', meaningEn: 'I have to finish it by tomorrow.',
    topic: '敬语与情态', topicEn: 'Honorifics and Modality', level: 'A2',
  },
  {
    sentence: '어제 늦게 ___거든요.',
    options: ['잤', '자는', '잔', '자'],
    correct: 0,
    explanation: '"V-았/었거든요"回答式解释"因为(过去)...嘛"。终结词尾 -거든요,过去时用 -았/었거든요。', explanationEn: '"V-았/었거든요" is a response-style explanation, "because (in the past)..." It\'s a sentence-ending ending -거든요, with past tense -았/었거든요.',
    full: '어제 늦게 잤거든요.',
    meaning: '因为昨天睡得晚嘛。', meaningEn: 'Because I went to bed late yesterday.',
    topic: '敬语与情态', topicEn: 'Honorifics and Modality', level: 'B1',
  },
];
