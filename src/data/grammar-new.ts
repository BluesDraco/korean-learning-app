import type { GrammarPoint } from '@/types';

export const sentencePatterns: GrammarPoint[] = [

  // ═══════════════════════════════════════════
  //  Group 1: Self-introduction
  // ═══════════════════════════════════════════

  {
    id: 'gp-01',
    title: '이에요/예요',
    displayTitle: '我是…… / 这是……',
    pattern: '이에요/예요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '终结',
    functionZh: '用来说明身份或事物，相当于中文的"是……"',
    shortExplanation: '韩语的"是"会根据前面名词有无收音变化：有收音用 이에요，无收音用 예요。',
    structure: ['有收音名词 + 이에요', '无收音名词 + 예요'],
    tags: ['自我介绍', '判断句', '初级必备'],
    useCases: ['自我介绍', '介绍他人', '说明物品'],
    examples: [
      { ko: '저는 학생이에요.', zh: '我是学生。', highlight: '학생이에요' },
      { ko: '저는 토리예요.', zh: '我是 Tori。', highlight: '토리예요' },
      { ko: '이것은 책이에요.', zh: '这是书。', highlight: '책이에요' },
    ],
    practiceTemplates: [
      {
        id: 'gp-01-sub',
        type: 'substitution',
        prompt: '用 이에요/예요 完成句子',
        template: '저는 ___이에요/예요.',
        slots: ['학생', '토리', '중국 사람', '회사원'],
      },
      {
        id: 'gp-01-ch1',
        type: 'choice',
        prompt: '"我是学生"哪句正确？',
        options: ['저는 학생예요.', '저는 학생이에요.', '저는 학생입니다.'],
        answer: '저는 학생이에요.',
        explanation: '학생 有收音(ㄱ)，所以接 이에요。',
      },
      {
        id: 'gp-01-ch2',
        type: 'choice',
        prompt: '"我是 Tori"哪句正确？',
        options: ['저는 토리이에요.', '저는 토리예요.'],
        answer: '저는 토리예요.',
        explanation: '토리 无收音，所以接 예요。',
      },
      {
        id: 'gp-01-out',
        type: 'output',
        prompt: '用韩语介绍自己（用 이에요/예요）',
        template: '저는 ___이에요/예요.',
      },
    ],
    commonMistakes: [
      { wrong: '저는 학생예요.', correct: '저는 학생이에요.', reason: '학생 有收音，必须接 이에요。' },
      { wrong: '저는 토리이에요.', correct: '저는 토리예요.', reason: '토리 无收音，接 예요 就够了。' },
    ],
    toriTip: '最简单判断法：看前面字的最后一个音。학생 → 最后一个音 ㅇ(收音) → 이에요。토리 → 最后一个音 ㅣ(无收音) → 예요。',
  },

  {
    id: 'gp-02',
    title: '입니다',
    displayTitle: '我是……（正式）',
    pattern: '입니다 / 입니까?',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '终结',
    functionZh: '正式的"是……"，用于正式场合、商务、对长辈',
    shortExplanation: '입니다 是 이에요/예요 的正式体。陈述用 입니다，疑问用 입니까?',
    structure: ['名词 + 입니다（陈述）', '名词 + 입니까?（疑问）'],
    tags: ['自我介绍', '正式场合', '初级必备'],
    useCases: ['正式自我介绍', '商务场合', '对长辈说话'],
    examples: [
      { ko: '저는 김민수입니다.', zh: '我是金敏秀。' },
      { ko: '학생입니까?', zh: '你是学生吗？' },
      { ko: '처음 뵙겠습니다.', zh: '初次见面。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-02-sub',
        type: 'substitution',
        prompt: '用 입니다 正式介绍自己',
        template: '저는 ___입니다.',
        slots: ['김민수', '중국 사람', '학생', '회사원'],
      },
      {
        id: 'gp-02-ch1',
        type: 'choice',
        prompt: '正式场合说"我是学生"，用哪个？',
        options: ['저는 학생이에요.', '저는 학생입니다.', '나는 학생이야.'],
        answer: '저는 학생입니다.',
        explanation: '正式场合用 입니다。이에요 是礼貌体，不是正式体。',
      },
      {
        id: 'gp-02-out',
        type: 'output',
        prompt: '用 입니다 用韩语正式介绍自己的名字',
        template: '저는 ___입니다.',
      },
    ],
    commonMistakes: [
      { wrong: '저는 학생입니다다.', correct: '저는 학생입니다.', reason: '입니다 本身已经是终结形式，不用再加 다。' },
    ],
    toriTip: '面试、演讲、第一次见长辈时用 입니다。平时跟朋友说 이에요/예요 就行。',
  },

  {
    id: 'gp-03',
    title: '___ 사람이에요',
    displayTitle: '我是……人',
    pattern: '名词 + 사람이에요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型',
    functionZh: '说明某人的国籍/身份/类别',
    shortExplanation: '사람 是"人"，前面加国家/城市名表示"某国人"。사람 有收音 ㅁ，所以接 이에요。',
    structure: ['国家/城市 + 사람이에요'],
    tags: ['自我介绍', '国籍', '初级必备'],
    useCases: ['说明国籍', '说明身份类别', '自我介绍'],
    examples: [
      { ko: '저는 중국 사람이에요.', zh: '我是中国人。' },
      { ko: '저는 한국 사람이에요.', zh: '我是韩国人。' },
      { ko: '저는 서울 사람이에요.', zh: '我是首尔人。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-03-sub',
        type: 'substitution',
        prompt: '用 ___ 사람이에요 造句',
        template: '저는 ___ 사람이에요.',
        slots: ['중국', '한국', '일본', '미국'],
      },
      {
        id: 'gp-03-out',
        type: 'output',
        prompt: '用韩语说你是哪国人',
        template: '저는 ___ 사람이에요.',
      },
    ],
    commonMistakes: [],
    toriTip: '사람 后总是接 이에요，因为 ㅁ 是收音。不要写成 사람예요！',
  },

  // ═══════════════════════════════════════════
  //  Group 2: Requests & Ordering
  // ═══════════════════════════════════════════

  {
    id: 'gp-04',
    title: '주세요',
    displayTitle: '请给我……',
    pattern: '名词 + 주세요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型',
    functionZh: '请求别人给自己某物，点单、购物必备',
    shortExplanation: '주세요 来自 주다（给）+ 세요（请）。前面加想要的东西，礼貌地请求别人给。',
    structure: ['名词 + 주세요'],
    tags: ['点单', '购物', '请求', '初级必备'],
    useCases: ['点咖啡', '购物', '请别人帮忙递东西'],
    examples: [
      { ko: '커피 주세요.', zh: '请给我咖啡。' },
      { ko: '물 주세요.', zh: '请给我水。' },
      { ko: '김밥 하나 주세요.', zh: '请给我一份紫菜包饭。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-04-sub',
        type: 'substitution',
        prompt: '用 주세요 点你想要的东西',
        template: '___ 주세요.',
        slots: ['커피', '물', '빵', '우유', '라면', '김밥'],
      },
      {
        id: 'gp-04-ch1',
        type: 'choice',
        prompt: '在咖啡厅说"请给我一杯美式咖啡"？',
        options: ['아메리카노 있어요.', '아메리카노 주세요.', '아메리카노 좋아해요.'],
        answer: '아메리카노 주세요.',
        explanation: '주세요 是"请给我"，点单场景用。있어요 是"有吗"，좋아해요 是"喜欢"。',
      },
      {
        id: 'gp-04-out',
        type: 'output',
        prompt: '用韩语点一杯你想要的东西',
        template: '___ 주세요.',
      },
    ],
    commonMistakes: [
      { wrong: '커피를 주세요.', correct: '커피 주세요.', reason: '口语中 을/를 可以省略，更自然。' },
    ],
    toriTip: '주세요 是最实用的句型之一。去韩国咖啡厅、便利店、餐厅第一句就靠它！',
  },

  {
    id: 'gp-05',
    title: '있어요?',
    displayTitle: '有……吗？',
    pattern: '名词 + 있어요?',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型',
    functionZh: '问有没有某样东西',
    shortExplanation: '있어요 来自 있다（有/在），加 요 变成礼貌体。疑问句用语调上扬即可。',
    structure: ['名词 + 있어요?（疑问）', '名词 + 있어요.（陈述，有）', '名词 + 없어요.（陈述，没有）'],
    tags: ['购物', '询问', '初级必备'],
    useCases: ['问店里有没有某物', '问别人有没有某物', '表示存在'],
    examples: [
      { ko: '커피 있어요?', zh: '有咖啡吗？' },
      { ko: '시간 있어요?', zh: '有时间吗？' },
      { ko: '한국어 책 있어요?', zh: '有韩语书吗？' },
    ],
    practiceTemplates: [
      {
        id: 'gp-05-sub',
        type: 'substitution',
        prompt: '用 있어요? 问有没有某物',
        template: '___ 있어요?',
        slots: ['커피', '빵', '시간', '돈', '질문'],
      },
      {
        id: 'gp-05-ch1',
        type: 'choice',
        prompt: '想表达"没有水"，选哪个？',
        options: ['물 있어요.', '물 없어요.', '물 주세요.'],
        answer: '물 없어요.',
        explanation: '없어요 是"没有"。있어요 是"有"，주세요 是"请给我"。',
      },
      {
        id: 'gp-05-out',
        type: 'output',
        prompt: '用韩语问一样东西有没有',
        template: '___ 있어요?',
      },
    ],
    commonMistakes: [
      { wrong: '커피가 있어요?', correct: '커피 있어요?', reason: '口语中 이/가 常省略，更自然。' },
    ],
    toriTip: '있어요 / 없어요 是一个超级高频的对子。问用 있어요?，有说 있어요，没有说 없어요。',
  },

  {
    id: 'gp-06',
    title: '얼마예요?',
    displayTitle: '多少钱？',
    pattern: '名词 + 얼마예요?',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型',
    functionZh: '问价格，购物必备',
    shortExplanation: '얼마 是"多少"，加 예요（是）就是"是多少？"即"多少钱？"。',
    structure: ['名词 + 얼마예요?'],
    tags: ['购物', '询问价格', '初级必备'],
    useCases: ['问价格', '市场购物', '便利店'],
    examples: [
      { ko: '이거 얼마예요?', zh: '这个多少钱？' },
      { ko: '커피 얼마예요?', zh: '咖啡多少钱？' },
      { ko: '김밥 얼마예요?', zh: '紫菜包饭多少钱？' },
    ],
    practiceTemplates: [
      {
        id: 'gp-06-sub',
        type: 'substitution',
        prompt: '用 얼마예요? 问价格',
        template: '___ 얼마예요?',
        slots: ['이거', '커피', '빵', '책'],
      },
      {
        id: 'gp-06-out',
        type: 'output',
        prompt: '用韩语问一个东西的价格',
        template: '___ 얼마예요?',
      },
    ],
    commonMistakes: [],
    toriTip: '이거 是"这个"，저거 是"那个"。시장에서 이거 얼마예요? 说完这句就可以开始砍价了！',
  },

  // ═══════════════════════════════════════════
  //  Group 3: Location & Action
  // ═══════════════════════════════════════════

  {
    id: 'gp-07',
    title: '에 가요',
    displayTitle: '去……',
    pattern: '地点 + 에 가요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型',
    functionZh: '表示去某个地方',
    shortExplanation: '에 是方向/目的地助词，가요 来自 가다（去）的礼貌体。',
    structure: ['地点 + 에 가요'],
    tags: ['移动', '方向', '初级必备'],
    useCases: ['说去哪里', '问去哪里', '旅行计划'],
    examples: [
      { ko: '학교에 가요.', zh: '去学校。' },
      { ko: '집에 가요.', zh: '回家。' },
      { ko: '한국에 가요.', zh: '去韩国。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-07-sub',
        type: 'substitution',
        prompt: '用 에 가요 说去哪里',
        template: '___에 가요.',
        slots: ['학교', '집', '한국', '서울', '카페'],
      },
      {
        id: 'gp-07-ch1',
        type: 'choice',
        prompt: '"去咖啡厅"用韩语怎么说？',
        options: ['카페에 있어요.', '카페에 가요.', '카페에서 먹어요.'],
        answer: '카페에 가요.',
        explanation: '에 가요 是"去……"。에 있어요 是"在……"，에서 먹어요 是"在……吃"。',
      },
      {
        id: 'gp-07-out',
        type: 'output',
        prompt: '用韩语说你要去哪里',
        template: '___에 가요.',
      },
    ],
    commonMistakes: [
      { wrong: '학교를 가요.', correct: '학교에 가요.', reason: '去某个地方，目的地用 에，不用 을/를。' },
    ],
    toriTip: '에 = 方向箭头 →。想象有一个箭头指向你要去的地方。',
  },

  {
    id: 'gp-08',
    title: '에 있어요',
    displayTitle: '在……',
    pattern: '地点 + 에 있어요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型',
    functionZh: '表示某物/某人在某个地方',
    shortExplanation: '에 标记地点，있어요 是"在/有"。说人或东西"在"某处时用。',
    structure: ['地点 + 에 있어요'],
    tags: ['位置', '存在', '初级必备'],
    useCases: ['说在哪里', '问路', '描述位置'],
    examples: [
      { ko: '학교에 있어요.', zh: '在学校。' },
      { ko: '집에 있어요.', zh: '在家。' },
      { ko: '책상 위에 있어요.', zh: '在桌子上。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-08-sub',
        type: 'substitution',
        prompt: '用 에 있어요 说在哪里',
        template: '___에 있어요.',
        slots: ['학교', '집', '카페', '회사'],
      },
      {
        id: 'gp-08-ch1',
        type: 'choice',
        prompt: '"咖啡在桌子上"，选哪个？',
        options: ['커피가 책상 위에 있어요.', '커피가 책상 위에 가요.', '커피가 책상 위에서 있어요.'],
        answer: '커피가 책상 위에 있어요.',
        explanation: '에 있어요 = 在。에서 是动作发生地，不搭配 있다。',
      },
      {
        id: 'gp-08-out',
        type: 'output',
        prompt: '用韩语说你现在在哪里',
        template: '___에 있어요.',
      },
    ],
    commonMistakes: [
      { wrong: '집에서 있어요.', correct: '집에 있어요.', reason: '있다 表示存在用 에，不用 에서。' },
    ],
    toriTip: '에 있어요 和 에 가요 的区别：있어요 是已经在那个地方，가요 是在去的路上。',
  },

  {
    id: 'gp-09',
    title: '에서 ___요',
    displayTitle: '在……做……',
    pattern: '地点 + 에서 + 动词',
    level: 'beginner',
    topikLevel: 1,
    category: '句型',
    functionZh: '表示在某个地方做某个动作',
    shortExplanation: '에서 标记动作发生的地点，后面加动作动词。与 에 不同，에서 强调"在这里做某事"。',
    structure: ['地点 + 에서 + 动作动词'],
    tags: ['位置', '动作', '初级必备'],
    useCases: ['说在哪做什么', '问在哪做什么'],
    examples: [
      { ko: '카페에서 커피를 마셔요.', zh: '在咖啡厅喝咖啡。' },
      { ko: '집에서 공부해요.', zh: '在家学习。' },
      { ko: '식당에서 밥을 먹어요.', zh: '在餐厅吃饭。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-09-sub',
        type: 'substitution',
        prompt: '用 에서 说在哪做什么',
        template: '___에서 ___요.',
        slots: ['카페', '집', '학교', '식당'],
      },
      {
        id: 'gp-09-ch1',
        type: 'choice',
        prompt: '"在学校学习"选哪个？',
        options: ['학교에 공부해요.', '학교에서 공부해요.', '학교를 공부해요.'],
        answer: '학교에서 공부해요.',
        explanation: '에서 标记动作发生地。에 是目的地/存在地。',
      },
      {
        id: 'gp-09-out',
        type: 'output',
        prompt: '用韩语说你在哪里做什么',
        template: '___에서 ___요.',
      },
    ],
    commonMistakes: [
      { wrong: '학교에 공부해요.', correct: '학교에서 공부해요.', reason: '做动作的地方用 에서，静止存在才用 에。' },
    ],
    toriTip: '에 vs 에서 一句话区分：에 있어요（在那里），에서 해요（在那里做）。',
  },

  // ═══════════════════════════════════════════
  //  Group 4: Likes & Wishes
  // ═══════════════════════════════════════════

  {
    id: 'gp-10',
    title: '좋아해요',
    displayTitle: '喜欢……',
    pattern: '名词 + 좋아해요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型',
    functionZh: '表达喜欢某物/某人',
    shortExplanation: '좋아해요 来自 좋아하다（喜欢）的礼貌体。前面加 을/를 也可以，口语中常省略。',
    structure: ['名词 + (을/를) 좋아해요'],
    tags: ['喜好', '表达', '初级必备'],
    useCases: ['说喜欢什么', '问别人喜欢什么', '介绍爱好'],
    examples: [
      { ko: '커피 좋아해요.', zh: '喜欢咖啡。' },
      { ko: '한국 음식 좋아해요.', zh: '喜欢韩国料理。' },
      { ko: '뭐 좋아해요?', zh: '喜欢什么？' },
    ],
    practiceTemplates: [
      {
        id: 'gp-10-sub',
        type: 'substitution',
        prompt: '用 좋아해요 说你喜欢什么',
        template: '___ 좋아해요.',
        slots: ['커피', '한국', '음악', '영화', '운동'],
      },
      {
        id: 'gp-10-ch1',
        type: 'choice',
        prompt: '"我喜欢韩语"选哪个？',
        options: ['한국어 좋아해요.', '한국어 싫어해요.', '한국어 배워요.'],
        answer: '한국어 좋아해요.',
        explanation: '좋아해요 = 喜欢，싫어해요 = 不喜欢，배워요 = 学习。',
      },
      {
        id: 'gp-10-out',
        type: 'output',
        prompt: '用韩语说一个你喜欢的东西',
        template: '___ 좋아해요.',
      },
    ],
    commonMistakes: [],
    toriTip: '口语里 뭐 좋아해요? 是最常用的"你喜欢什么？"，记得 뭐 就是"什么"。',
  },

  {
    id: 'gp-11',
    title: '싫어해요',
    displayTitle: '不喜欢……',
    pattern: '名词 + 싫어해요',
    level: 'beginner',
    topikLevel: 1,
    category: '句型',
    functionZh: '表达不喜欢某物/某人',
    shortExplanation: '싫어해요 来自 싫어하다（不喜欢/讨厌）的礼貌体。与 좋아해요 正相反。',
    structure: ['名词 + (을/를) 싫어해요'],
    tags: ['喜好', '否定', '表达'],
    useCases: ['说不喜欢什么', '表达偏好'],
    examples: [
      { ko: '매운 음식 싫어해요.', zh: '不喜欢辣的食物。' },
      { ko: '비 오는 날 싫어해요.', zh: '不喜欢下雨天。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-11-sub',
        type: 'substitution',
        prompt: '用 싫어해요 说你不喜欢什么',
        template: '___ 싫어해요.',
        slots: ['매운 음식', '추운 날씨', '숙제', '아침'],
      },
      {
        id: 'gp-11-out',
        type: 'output',
        prompt: '用韩语说一个你不喜欢的东西',
        template: '___ 싫어해요.',
      },
    ],
    commonMistakes: [],
    compareWith: ['gp-10'],
    difference: '좋아해요 = 喜欢，싫어해요 = 不喜欢。注意 싫어해요 的 ㅎ 在连读时可能不发音。',
  },

  {
    id: 'gp-12',
    title: '고 싶어요',
    displayTitle: '想做……',
    pattern: '动词词干 + 고 싶어요',
    level: 'beginner',
    topikLevel: 1,
    category: '句型',
    functionZh: '表达想做某事的愿望',
    shortExplanation: '动词词干去掉 다 后加 고 싶어요，表示"想做……"。这是韩语最常用的愿望表达。',
    structure: ['动词词干 + 고 싶어요'],
    tags: ['愿望', '表达', '初级必备'],
    useCases: ['说想做什么', '点单表达愿望', '旅行计划', '自我介绍'],
    examples: [
      { ko: '한국에 가고 싶어요.', zh: '想去韩国。' },
      { ko: '커피를 마시고 싶어요.', zh: '想喝咖啡。' },
      { ko: '한국어를 배우고 싶어요.', zh: '想学韩语。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-12-sub',
        type: 'substitution',
        prompt: '用 고 싶어요 说你想要做什么',
        template: '___고 싶어요.',
        slots: ['한국에 가', '커피 마시', '한국어 배우', '친구 만나', '영화 보'],
      },
      {
        id: 'gp-12-ch1',
        type: 'choice',
        prompt: '"想喝咖啡"用韩语怎么说？',
        options: ['커피 마시고 싶어요.', '커피 마시 싶어요.', '커피 마싣고 싶어요.'],
        answer: '커피 마시고 싶어요.',
        explanation: '마시다 → 마시 + 고 싶어요 = 마시고 싶어요。',
      },
      {
        id: 'gp-12-out',
        type: 'output',
        prompt: '用韩语说一件你想做的事',
        template: '___고 싶어요.',
      },
    ],
    commonMistakes: [
      { wrong: '커피 마시다 싶어요.', correct: '커피 마시고 싶어요.', reason: '고 싶어요 是完整结构，不能只写 싶어요。' },
    ],
    toriTip: '고 싶어요 是最能帮你"开口说韩语"的句型。只要记住动词去 다 加 고 싶어요，就能表达无数愿望！',
  },

  // ═══════════════════════════════════════════
  //  Group 5: Present Tense
  // ═══════════════════════════════════════════

  {
    id: 'gp-13',
    title: '아/어요 现在时',
    displayTitle: '现在做……',
    pattern: '动词词干 + 아/어요',
    level: 'beginner',
    topikLevel: 1,
    category: '终结',
    functionZh: '韩语最基本的礼貌现在时终结语尾',
    shortExplanation: '韩语动词现在时最基本的形式就是 아/어요。根据词干的最后元音决定加 아요 还是 어요。',
    structure: [
      '词干最后元音是 ㅏ 或 ㅗ → + 아요（如：가다 → 가요）',
      '其他元音 → + 어요（如：먹다 → 먹어요）',
      '하다 → 해요（特殊）',
    ],
    tags: ['时态', '终结', '初级必备'],
    useCases: ['日常对话', '所有现在时表达'],
    examples: [
      { ko: '가요.', zh: '去。' },
      { ko: '먹어요.', zh: '吃。' },
      { ko: '해요.', zh: '做。' },
      { ko: '봐요.', zh: '看。' },
      { ko: '와요.', zh: '来。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-13-ch1',
        type: 'choice',
        prompt: '가다（去）的 아/어요 形式是？',
        options: ['가어요.', '가요.', '가아요.'],
        answer: '가요.',
        explanation: '가 的最后元音是 ㅏ，加 아요 → 가 + 아요 → 가요（缩合）。',
      },
      {
        id: 'gp-13-ch2',
        type: 'choice',
        prompt: '먹다（吃）的 아/어요 形式是？',
        options: ['먹어요.', '먹아요.', '먹요.'],
        answer: '먹어요.',
        explanation: '먹 的最后元音是 ㅓ，不是 ㅏ/ㅗ，所以加 어요 → 먹어요。',
      },
      {
        id: 'gp-13-sub',
        type: 'substitution',
        prompt: '把动词变成 아/어요 形式',
        template: '___ → ___요',
        slots: ['가다 → 가', '먹다 → 먹어', '보다 → 봐', '오다 → 와', '하다 → 해'],
      },
      {
        id: 'gp-13-out',
        type: 'output',
        prompt: '用 아/어요 写一个你现在正在做的动作',
      },
    ],
    commonMistakes: [
      { wrong: '가어요.', correct: '가요.', reason: '가 + 아요 缩合成 가요，两个元音合并。' },
      { wrong: '먹아요.', correct: '먹어요.', reason: '먹 的元音是 ㅓ，属于"其他"，加 어요。' },
    ],
    toriTip: '口诀：ㅏㅗ 用 아，其他用 어，하다 变 해。记住这三个规则，80% 的动词现在时你都会了！',
  },

  {
    id: 'gp-14',
    title: '高频动词现在时',
    displayTitle: '5个最常用动词',
    pattern: '가요 / 먹어요 / 봐요 / 해요 / 와요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '终结',
    functionZh: '韩语中使用频率最高的 5 个动词的现在时',
    shortExplanation: '这 5 个动词覆盖了日常对话 50% 以上的动作表达。练熟它们，日常对话就能开口。',
    structure: [
      '가다 → 가요（去）',
      '먹다 → 먹어요（吃）',
      '보다 → 봐요（看）',
      '하다 → 해요（做）',
      '오다 → 와요（来）',
    ],
    tags: ['高频', '动词', '初级必备'],
    useCases: ['日常对话', '基础表达'],
    examples: [
      { ko: '학교에 가요.', zh: '去学校。' },
      { ko: '밥 먹어요.', zh: '吃饭。' },
      { ko: '티비 봐요.', zh: '看电视。' },
      { ko: '공부해요.', zh: '学习。' },
      { ko: '친구가 와요.', zh: '朋友来。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-14-sub',
        type: 'substitution',
        prompt: '用正确的动词完成句子',
        template: '___요.',
        slots: ['학교에 가', '밥 먹어', '티비 봐', '공부해', '친구가 와'],
      },
      {
        id: 'gp-14-ch1',
        type: 'choice',
        prompt: '"吃饭"的韩语是？',
        options: ['밥 가요.', '밥 먹어요.', '밥 해요.'],
        answer: '밥 먹어요.',
        explanation: '먹다 = 吃。가다 = 去，하다 = 做。',
      },
      {
        id: 'gp-14-out',
        type: 'output',
        prompt: '用这 5 个动词之一造一个韩语句子',
      },
    ],
    commonMistakes: [
      { wrong: '보다 → 보요', correct: '보다 → 봐요', reason: '보 + 아요 → 봐요，缩合后 ㅂ 变成 ㅘ。' },
    ],
    toriTip: '这 5 个词的 아/어요 变化都记住，你就掌握了韩语现在时 90% 的规律！',
  },

  // ═══════════════════════════════════════════
  //  Group 6: Negation & Questions
  // ═══════════════════════════════════════════

  {
    id: 'gp-15',
    title: '안 ___',
    displayTitle: '不……',
    pattern: '안 + 动词',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '否定',
    functionZh: '简单否定，"不做某事"',
    shortExplanation: '안 放在动词前面，直接否定动作。这是韩语最简单的否定方式。',
    structure: ['안 + 动词'],
    tags: ['否定', '初级必备'],
    useCases: ['说不要做某事', '拒绝', '表达否定意愿'],
    examples: [
      { ko: '안 가요.', zh: '不去。' },
      { ko: '안 먹어요.', zh: '不吃。' },
      { ko: '커피 안 마셔요.', zh: '不喝咖啡。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-15-sub',
        type: 'substitution',
        prompt: '用 안 说不要做某事',
        template: '안 ___요.',
        slots: ['가', '먹어', '봐', '해', '마셔'],
      },
      {
        id: 'gp-15-ch1',
        type: 'choice',
        prompt: '"不喝咖啡"选哪个？',
        options: ['커피 안 마셔요.', '커피 마셔 안요.', '안 커피 마셔요.'],
        answer: '커피 안 마셔요.',
        explanation: '안 放在动词前面：안 + 마셔요。',
      },
      {
        id: 'gp-15-out',
        type: 'output',
        prompt: '用 안 说一件你不做的事',
        template: '___ 안 ___요.',
      },
    ],
    commonMistakes: [
      { wrong: '안커피 마셔요.', correct: '커피 안 마셔요.', reason: '안 否定的是动词动作，不是名词。안 放动词前。' },
    ],
    toriTip: '안 是最简单的否定，直接放动词前面就行。口语里比 -지 않다 好用得多！',
  },

  {
    id: 'gp-16',
    title: '아니에요',
    displayTitle: '不是……',
    pattern: '名词 + 이/가 아니에요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '否定',
    functionZh: '否定事物身份/属性，"不是……"',
    shortExplanation: '아니에요 是 아니다（不是）的礼貌体。前面名词加 이/가。',
    structure: ['名词 + 이/가 아니에요'],
    tags: ['否定', '初级必备'],
    useCases: ['否认身份', '纠正别人', '说不是某物'],
    examples: [
      { ko: '학생이 아니에요.', zh: '不是学生。' },
      { ko: '한국 사람이 아니에요.', zh: '不是韩国人。' },
      { ko: '제 책이 아니에요.', zh: '不是我的书。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-16-sub',
        type: 'substitution',
        prompt: '用 아니에요 说不是……',
        template: '___이/가 아니에요.',
        slots: ['학생', '한국 사람', '선생님'],
      },
      {
        id: 'gp-16-ch1',
        type: 'choice',
        prompt: '"我不是学生"选哪个？',
        options: ['저는 학생 아니에요.', '저는 학생이 아니에요.', '저는 학생은 아니에요.'],
        answer: '저는 학생이 아니에요.',
        explanation: '아니다 前面用 이/가。학생 有收音，所以加 이。',
      },
      {
        id: 'gp-16-out',
        type: 'output',
        prompt: '用 아니에요 说一件你不是的东西',
        template: '___이/가 아니에요.',
      },
    ],
    commonMistakes: [
      { wrong: '학생 아니에요.', correct: '학생이 아니에요.', reason: '아니에요 前面一般要加 이/가，尤其是正式语境。' },
    ],
    toriTip: '이에요 = 是，아니에요 = 不是。这是你最需要的一对正反面句型。',
  },

  {
    id: 'gp-17',
    title: '예요?',
    displayTitle: '是……吗？',
    pattern: '名词 + 예요? / 이에요?',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型',
    functionZh: '询问身份/事物，相当于"是……吗？"',
    shortExplanation: '이에요/예요 的疑问形式。韩国语里疑问句和陈述句的语尾一样，靠语调上扬来区分。',
    structure: ['名词 + 이에요?（有收音）', '名词 + 예요?（无收音）'],
    tags: ['疑问', '初级必备'],
    useCases: ['问身份', '确认事物', '日常对话'],
    examples: [
      { ko: '학생이에요?', zh: '你是学生吗？' },
      { ko: '한국 사람이에요?', zh: '你是韩国人吗？' },
      { ko: '뭐예요?', zh: '是什么？' },
    ],
    practiceTemplates: [
      {
        id: 'gp-17-sub',
        type: 'substitution',
        prompt: '用 이에요/예요 提问',
        template: '___이에요/예요?',
        slots: ['학생', '한국 사람', '중국 사람'],
      },
      {
        id: 'gp-17-ch1',
        type: 'choice',
        prompt: '"这是什么？"韩语怎么说？',
        options: ['뭐예요?', '누구예요?', '어디예요?'],
        answer: '뭐예요?',
        explanation: '뭐 = 什么，누구 = 谁，어디 = 哪里。',
      },
      {
        id: 'gp-17-out',
        type: 'output',
        prompt: '用韩语问一个问题（用 이에요/예요?）',
        template: '___이에요/예요?',
      },
    ],
    commonMistakes: [],
    toriTip: '韩语问句不需要改变语序！语调上扬就够了。학생이에요（↘陈述）vs 학생이에요?（↗疑问）。',
  },

  {
    id: 'gp-18',
    title: '없어요',
    displayTitle: '没有……',
    pattern: '名词 + 없어요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '否定',
    functionZh: '表示某物不存在或没有某物',
    shortExplanation: '없어요 来自 없다（没有）的礼貌体。与 있어요（有）是反义词。',
    structure: ['名词 + 없어요'],
    tags: ['否定', '存在', '初级必备'],
    useCases: ['说没有某物', '拒绝', '表示缺少'],
    examples: [
      { ko: '돈 없어요.', zh: '没有钱。' },
      { ko: '시간 없어요.', zh: '没有时间。' },
      { ko: '커피 없어요.', zh: '没有咖啡。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-18-sub',
        type: 'substitution',
        prompt: '用 없어요 说没有某物',
        template: '___ 없어요.',
        slots: ['돈', '시간', '커피', '질문'],
      },
      {
        id: 'gp-18-ch1',
        type: 'choice',
        prompt: '"没时间"选哪个？',
        options: ['시간 있어요.', '시간 없어요.', '시간 아니에요.'],
        answer: '시간 없어요.',
        explanation: '없어요 = 没有。있어요 = 有，아니에요 = 不是。',
      },
      {
        id: 'gp-18-out',
        type: 'output',
        prompt: '用 없어요 说一件你没有的东西',
        template: '___ 없어요.',
      },
    ],
    commonMistakes: [],
    compareWith: ['gp-05'],
    difference: '있어요 = 有/在，없어요 = 没有/不在。一对反义词。',
  },

  // ═══════════════════════════════════════════
  //  Group 7: Particles (Markers)
  // ═══════════════════════════════════════════

  {
    id: 'gp-19',
    title: '은/는',
    displayTitle: '至于……（主题）',
    pattern: '은/는',
    level: 'beginner',
    topikLevel: 1,
    category: '助词',
    functionZh: '标记句子主题，"说到XX的话……"，用于对比和强调',
    shortExplanation: '은/는 放在名词后，表示"关于这个话题……"或用于对比。相当于中文的"至于……""说到……的话"。',
    structure: ['有收音名词 + 은', '无收音名词 + 는'],
    tags: ['助词', '主题', '对比'],
    useCases: ['自我介绍', '对比', '引出话题'],
    examples: [
      { ko: '저는 학생이에요.', zh: '（至于）我，我是学生。' },
      { ko: '오늘은 날씨가 좋아요.', zh: '今天（的话），天气好。' },
      { ko: '커피는 좋아해요. 그런데 차는 싫어해요.', zh: '咖啡喜欢，但是茶不喜欢。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-19-sub',
        type: 'substitution',
        prompt: '用 은/는 引出话题',
        template: '___은/는 ___이에요/예요.',
        slots: ['저', '오늘', '이것', '그것'],
      },
      {
        id: 'gp-19-ch1',
        type: 'choice',
        prompt: '"저___ 학생이에요" 空格填什么？',
        options: ['는', '은', '가', '를'],
        answer: '는',
        explanation: '저 无收音，加 는。',
      },
      {
        id: 'gp-19-ch2',
        type: 'choice',
        prompt: '"책___ 재미있어요"（책 有收音）空格填什么？',
        options: ['는', '가', '은', '를'],
        answer: '은',
        explanation: '책 有收音 ㄱ，所以加 은。',
      },
      {
        id: 'gp-19-out',
        type: 'output',
        prompt: '用 은/는 介绍你自己',
        template: '저는 ___이에요/예요.',
      },
    ],
    commonMistakes: [
      { wrong: '저은 학생이에요.', correct: '저는 학생이에요.', reason: '저 无收音，加 는。' },
    ],
    compareWith: ['gp-20'],
    difference: '은/는 = 主题（大话题，"至于……"），이/가 = 主语（聚焦"谁/什么"）。',
    toriTip: '은/는 像是舞台上的聚光灯，把一个人/东西"打到台前"来说。',
  },

  {
    id: 'gp-20',
    title: '이/가',
    displayTitle: '……（主语）',
    pattern: '이/가',
    level: 'beginner',
    topikLevel: 1,
    category: '助词',
    functionZh: '标记主语，聚焦"谁/什么做了……"或"谁/什么是……"',
    shortExplanation: '이/가 放在名词后标记主语，回答"谁？""什么？"时使用。',
    structure: ['有收音名词 + 이', '无收音名词 + 가'],
    tags: ['助词', '主语'],
    useCases: ['回答谁的问题', '描述主语状态', '中性陈述'],
    examples: [
      { ko: '날씨가 좋아요.', zh: '天气好。' },
      { ko: '누가 왔어요?', zh: '谁来了？' },
      { ko: '배가 고파요.', zh: '肚子饿。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-20-sub',
        type: 'substitution',
        prompt: '用 이/가 标记主语',
        template: '___이/가 ___요.',
        slots: ['날씨', '배', '친구'],
      },
      {
        id: 'gp-20-ch1',
        type: 'choice',
        prompt: '"谁来了？" 选哪个？',
        options: ['누가 왔어요?', '누는 왔어요?', '누를 왔어요?'],
        answer: '누가 왔어요?',
        explanation: '누구 + 가 = 누가，"谁"后面用 이/가。',
      },
      {
        id: 'gp-20-out',
        type: 'output',
        prompt: '用 이/가 造一个描述主语的句子',
        template: '___이/가 ___요.',
      },
    ],
    commonMistakes: [
      { wrong: '친구는 왔어요.（回答"谁来了"）', correct: '친구가 왔어요.', reason: '回答"谁"的问题用 이/가，不用 은/는。' },
    ],
    compareWith: ['gp-19'],
    toriTip: '问句里 누가/뭐가 → 答句里也用 이/가。이/가 = 聚光灯打在"谁"上。',
  },

  {
    id: 'gp-21',
    title: '을/를',
    displayTitle: '把……（宾语）',
    pattern: '을/를',
    level: 'beginner',
    topikLevel: 1,
    category: '助词',
    functionZh: '标记动作的宾语，"把……"',
    shortExplanation: '을/를 放在名词后，标记这个名词是动作的对象（宾语）。相当于中文的"把……"。',
    structure: ['有收音名词 + 을', '无收音名词 + 를'],
    tags: ['助词', '宾语'],
    useCases: ['所有及物动词句'],
    examples: [
      { ko: '커피를 마셔요.', zh: '喝咖啡。' },
      { ko: '책을 읽어요.', zh: '读书。' },
      { ko: '한국어를 공부해요.', zh: '学韩语。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-21-sub',
        type: 'substitution',
        prompt: '用 을/를 完成句子',
        template: '___을/를 ___요.',
        slots: ['커피', '책', '한국어', '밥'],
      },
      {
        id: 'gp-21-ch1',
        type: 'choice',
        prompt: '"喝咖啡"选哪个？',
        options: ['커피를 마셔요.', '커피가 마셔요.', '커피은 마셔요.'],
        answer: '커피를 마셔요.',
        explanation: '커피 是 마시다（喝）的对象，用 을/를。',
      },
      {
        id: 'gp-21-out',
        type: 'output',
        prompt: '用 을/를 造一个带宾语的句子',
        template: '___을/를 ___요.',
      },
    ],
    commonMistakes: [],
    toriTip: '口语中 을/를 经常省略。但写作和正式表达中最好加上。',
  },

  // ═══════════════════════════════════════════
  //  Group 8: Location Markers
  // ═══════════════════════════════════════════

  {
    id: 'gp-22',
    title: '에 vs 에서',
    displayTitle: '在…… vs 在……做',
    pattern: '에 vs 에서',
    level: 'beginner',
    topikLevel: 1,
    category: '助词',
    functionZh: '区分"存在的地点"和"动作发生的地点"',
    shortExplanation: '에 用于表示存在、方向、时间。에서 用于表示动作发生的地点。一句话：에 = 在哪儿，에서 = 在哪儿做什么。',
    structure: ['地点 + 에 + 있다/가다/오다（存在/移动）', '地点 + 에서 + 动作动词'],
    tags: ['助词', '对比', '易混'],
    useCases: ['区分存在和动作地点'],
    examples: [
      { ko: '집에 있어요.', zh: '在家。（存在）' },
      { ko: '집에서 공부해요.', zh: '在家学习。（动作）' },
      { ko: '학교에 가요.', zh: '去学校。（方向）' },
      { ko: '학교에서 친구를 만나요.', zh: '在学校见朋友。（动作）' },
    ],
    practiceTemplates: [
      {
        id: 'gp-22-ch1',
        type: 'choice',
        prompt: '"在咖啡厅喝咖啡"用 에 还是 에서？',
        options: ['카페에 커피 마셔요.', '카페에서 커피 마셔요.'],
        answer: '카페에서 커피 마셔요.',
        explanation: '마시다 是动作动词，用 에서。',
      },
      {
        id: 'gp-22-ch2',
        type: 'choice',
        prompt: '"在咖啡厅"（说位置）用 에 还是 에서？',
        options: ['카페에 있어요.', '카페에서 있어요.'],
        answer: '카페에 있어요.',
        explanation: '있다 是存在动词，用 에。',
      },
      {
        id: 'gp-22-out',
        type: 'output',
        prompt: '用 에 和 에서 各造一个句子',
      },
    ],
    commonMistakes: [
      { wrong: '집에서 있어요.', correct: '집에 있어요.', reason: '있다/없다 表示存在永远用 에。' },
      { wrong: '학교에 공부해요.', correct: '학교에서 공부해요.', reason: '공부하다 是动作，用 에서。' },
    ],
    toriTip: '에 = 图钉📍（固定位置），에서 = 活动区🎯（动作区域）。这样记永远不会混！',
  },

  // ═══════════════════════════════════════════
  //  Group 9: Tense
  // ═══════════════════════════════════════════

  {
    id: 'gp-23',
    title: '았/었/였-',
    displayTitle: '……了（过去）',
    pattern: '动词词干 + 았/었/였어요',
    level: 'beginner',
    topikLevel: 1,
    category: '时制',
    functionZh: '表示过去发生的动作或状态，相当于中文的"……了"',
    shortExplanation: '韩语过去时由词干加 았/었/였 构成，规则与 아/어요 相同。',
    structure: [
      '词干最后元音 ㅏ/ㅗ → + 았어요（가다 → 갔어요）',
      '其他元音 → + 었어요（먹다 → 먹었어요）',
      '하다 → 했어요',
    ],
    tags: ['时态', '过去', '初级必备'],
    useCases: ['说做过什么', '问做过什么', '讲故事'],
    examples: [
      { ko: '어제 학교에 갔어요.', zh: '昨天去了学校。' },
      { ko: '밥 먹었어요.', zh: '吃饭了。' },
      { ko: '한국어 공부했어요.', zh: '学韩语了。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-23-sub',
        type: 'substitution',
        prompt: '把动词变成过去时',
        template: '___ → ___',
        slots: ['가다 → 갔어요', '먹다 → 먹었어요', '보다 → 봤어요', '하다 → 했어요'],
      },
      {
        id: 'gp-23-ch1',
        type: 'choice',
        prompt: '"去了学校"选哪个？',
        options: ['학교에 가요.', '학교에 갔어요.', '학교에 갈 거예요.'],
        answer: '학교에 갔어요.',
        explanation: '갔어요 = 가 + 았어요（过去）。가요 = 现在，갈 거예요 = 将来。',
      },
      {
        id: 'gp-23-out',
        type: 'output',
        prompt: '用过去时说一件你昨天做的事',
        template: '어제 ___었/았어요.',
      },
    ],
    commonMistakes: [
      { wrong: '가었어요.', correct: '갔어요.', reason: '가 + 았어요 缩合成 갔어요。' },
    ],
    toriTip: '过去时就是 아/어요 多加一个 ㅆ。아요 → 았어요，어요 → 었어요。简单！',
  },

  {
    id: 'gp-24',
    title: '(으)ㄹ 거예요',
    displayTitle: '会…… / 要……（将来）',
    pattern: '动词词干 + (으)ㄹ 거예요',
    level: 'beginner',
    topikLevel: 1,
    category: '时制',
    functionZh: '表示将来的动作或计划，"会/要……"',
    shortExplanation: '词干后加 (으)ㄹ 거예요 表示将来、打算或推测。有无收音决定加 을 还是 ㄹ。',
    structure: [
      '有收音 → 을 거예요（먹다 → 먹을 거예요）',
      '无收音/ㄹ收音 → ㄹ 거예요（가다 → 갈 거예요）',
    ],
    tags: ['时态', '将来', '初级必备'],
    useCases: ['说计划', '说打算', '推测'],
    examples: [
      { ko: '내일 학교에 갈 거예요.', zh: '明天会去学校。' },
      { ko: '주말에 뭐 할 거예요?', zh: '周末要做什么？' },
      { ko: '한국어를 배울 거예요.', zh: '会学韩语。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-24-sub',
        type: 'substitution',
        prompt: '用 (으)ㄹ 거예요 说你的计划',
        template: '___ (으)ㄹ 거예요.',
        slots: ['가다 → 갈', '먹다 → 먹을', '배우다 → 배울', '만나다 → 만날'],
      },
      {
        id: 'gp-24-ch1',
        type: 'choice',
        prompt: '"要去学校"选哪个？',
        options: ['학교에 가요.', '학교에 갔어요.', '학교에 갈 거예요.'],
        answer: '학교에 갈 거예요.',
        explanation: '갈 거예요 = 要去/会去。가요 = 现在去，갔어요 = 去了。',
      },
      {
        id: 'gp-24-out',
        type: 'output',
        prompt: '用 (으)ㄹ 거예요 说一件你明天要做的事',
        template: '내일 ___ (으)ㄹ 거예요.',
      },
    ],
    commonMistakes: [
      { wrong: '가을 거예요.', correct: '갈 거예요.', reason: '가 无收音，加 ㄹ 거예요 → 갈 거예요。' },
    ],
    toriTip: '거예요 前面是 ㄹ 结尾，不是 을。가다 → 갈 거예요。记住这个最常见的就行了！',
  },

  // ═══════════════════════════════════════════
  //  Group 10: Connectives
  // ═══════════════════════════════════════════

  {
    id: 'gp-25',
    title: '-고',
    displayTitle: '……和…… / ……然后……',
    pattern: '动词/名词 + 고',
    level: 'beginner',
    topikLevel: 1,
    category: '连接',
    functionZh: '连接两个动作或两个事物，"和/然后"',
    shortExplanation: '-고 连接两个动词或两个名词，表示并列或先后顺序。',
    structure: ['动词词干 + 고 + 动词', '名词 + 하고 + 名词（口语）'],
    tags: ['连接', '并列', '初级必备'],
    useCases: ['列举动作', '说先后顺序', '列举事物'],
    examples: [
      { ko: '밥을 먹고 커피를 마셔요.', zh: '吃饭然后喝咖啡。' },
      { ko: '사과하고 바나나 주세요.', zh: '请给我苹果和香蕉。' },
      { ko: '친구를 만나고 영화를 봤어요.', zh: '见了朋友然后看了电影。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-25-sub',
        type: 'substitution',
        prompt: '用 -고 连接两个动作',
        template: '___고 ___요.',
        slots: ['먹고 마셔요', '만나고 이야기해요', '듣고 따라해요'],
      },
      {
        id: 'gp-25-ch1',
        type: 'choice',
        prompt: '"吃饭然后去学校"选哪个？',
        options: ['밥을 먹어서 학교에 가요.', '밥을 먹고 학교에 가요.', '밥을 먹지만 학교에 가요.'],
        answer: '밥을 먹고 학교에 가요.',
        explanation: '-고 = 然后。아/어서 = 因为/所以，-지만 = 但是。',
      },
      {
        id: 'gp-25-out',
        type: 'output',
        prompt: '用 -고 连接你今天做的两件事',
        template: '___고 ___요.',
      },
    ],
    commonMistakes: [],
    toriTip: '-고 是最简单的连接词。记住：名词用 하고，动词用 고。',
  },

  {
    id: 'gp-26',
    title: '-지만',
    displayTitle: '……但是……',
    pattern: '动词词干 + 지만',
    level: 'beginner',
    topikLevel: 2,
    category: '连接',
    functionZh: '表示转折，"虽然……但是……"',
    shortExplanation: '-지만 放在动词词干后，表示转折。与英语的"but"一样的用法。',
    structure: ['动词/形容词词干 + 지만'],
    tags: ['连接', '转折'],
    useCases: ['表达对比', '表达相反情况'],
    examples: [
      { ko: '한국어는 어렵지만 재미있어요.', zh: '韩语虽然难但是有趣。' },
      { ko: '비싸지만 맛있어요.', zh: '虽然贵但是好吃。' },
      { ko: '피곤하지만 공부해요.', zh: '虽然累但是学习。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-26-sub',
        type: 'substitution',
        prompt: '用 -지만 说"虽然……但是……"',
        template: '___지만 ___요.',
        slots: ['어렵지만 재미있어요', '비싸지만 맛있어요', '피곤하지만 해요'],
      },
      {
        id: 'gp-26-ch1',
        type: 'choice',
        prompt: '"虽然贵但好吃"选哪个？',
        options: ['비싸고 맛있어요.', '비싸지만 맛있어요.', '비싸서 맛있어요.'],
        answer: '비싸지만 맛있어요.',
        explanation: '-지만 = 但是。-고 = 和，-아서 = 因为。',
      },
      {
        id: 'gp-26-out',
        type: 'output',
        prompt: '用 -지만 造一个转折句',
        template: '___지만 ___요.',
      },
    ],
    commonMistakes: [],
    toriTip: '-지만 放在任何动词/形容词后面都不用考虑收音，直接加就行！最简单的连接词之一。',
  },

  {
    id: 'gp-27',
    title: '-아/어서',
    displayTitle: '因为……所以……',
    pattern: '动词词干 + 아/어서',
    level: 'beginner',
    topikLevel: 2,
    category: '连接',
    functionZh: '表示原因和结果，"因为……所以……"',
    shortExplanation: '아/어서 连接原因（前句）和结果（后句）。规则与 아/어요 一样。',
    structure: ['词干 + 아/어서 + 结果'],
    tags: ['连接', '因果'],
    useCases: ['解释原因', '说明理由'],
    examples: [
      { ko: '배가 고파서 밥을 먹었어요.', zh: '因为肚子饿所以吃饭了。' },
      { ko: '날씨가 좋아서 산책했어요.', zh: '因为天气好所以散步了。' },
      { ko: '한국어가 재미있어서 매일 공부해요.', zh: '因为韩语有趣所以每天学。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-27-ch1',
        type: 'choice',
        prompt: '"因为饿所以吃饭"选哪个？',
        options: ['배가 고프고 밥을 먹었어요.', '배가 고파서 밥을 먹었어요.', '배가 고프지만 밥을 먹었어요.'],
        answer: '배가 고파서 밥을 먹었어요.',
        explanation: '아/어서 = 因为……所以。-고 = 然后，-지만 = 但是。',
      },
      {
        id: 'gp-27-sub',
        type: 'substitution',
        prompt: '用 아/어서 解释原因',
        template: '___아/어서 ___요.',
        slots: ['배가 고파서', '날씨가 좋아서', '피곤해서', '바빠서'],
      },
      {
        id: 'gp-27-out',
        type: 'output',
        prompt: '用 아/어서 解释你为什么做某件事',
        template: '___아/어서 ___요.',
      },
    ],
    commonMistakes: [
      { wrong: '배고파고 밥 먹었어요.', correct: '배고파서 밥 먹었어요.', reason: '原因用 아/어서，不是 고。' },
    ],
    toriTip: '아/어서 = "因为A所以B"。注意 서 前面的变化规则和 아/어요 一模一样！',
  },

  {
    id: 'gp-28',
    title: '-(으)면',
    displayTitle: '如果……',
    pattern: '动词词干 + (으)면',
    level: 'beginner',
    topikLevel: 2,
    category: '连接',
    functionZh: '表示假设条件，"如果……的话"',
    shortExplanation: '(으)면 表示"如果做了某事"，条件假设。有无收音决定加 으면 还是 면。',
    structure: ['有收音 → 으면', '无收音/ㄹ收音 → 면'],
    tags: ['连接', '条件'],
    useCases: ['假设', '提建议', '说计划的条件'],
    examples: [
      { ko: '시간 있으면 커피 마실래요?', zh: '如果有时间，要喝咖啡吗？' },
      { ko: '한국에 가면 뭐 할 거예요?', zh: '如果去韩国要做什么？' },
      { ko: '비가 오면 집에 있을 거예요.', zh: '如果下雨就在家。' },
    ],
    practiceTemplates: [
      {
        id: 'gp-28-sub',
        type: 'substitution',
        prompt: '用 (으)면 造条件句',
        template: '___으면/면 ___요.',
        slots: ['시간 있으면', '한국에 가면', '비가 오면', '배고프면'],
      },
      {
        id: 'gp-28-ch1',
        type: 'choice',
        prompt: '"如果有时间"选哪个？',
        options: ['시간 있어서', '시간 있으면', '시간 있고'],
        answer: '시간 있으면',
        explanation: '(으)면 = 如果。아/어서 = 因为，-고 = 然后。',
      },
      {
        id: 'gp-28-out',
        type: 'output',
        prompt: '用 (으)면 造一个假设句',
        template: '___으면/면 ___ (으)ㄹ 거예요.',
      },
    ],
    commonMistakes: [],
    toriTip: '中文"如果……的话" = (으)면。韩剧里最常听到的条件句！',
  },

  // ═══════════════════════════════════════════
  //  Group 11: Ability & Experience
  // ═══════════════════════════════════════════

  {
    id: 'gp-29',
    title: '-(으)ㄹ 수 있어요',
    displayTitle: '能…… / 会……',
    pattern: '动词词干 + (으)ㄹ 수 있어요',
    level: 'beginner',
    topikLevel: 2,
    category: '句型',
    functionZh: '表示能力或可能性，"能/会/可以……"',
    shortExplanation: '(으)ㄹ 수 있다 表示"能做某事"。有无收音决定 을 还是 ㄹ。',
    structure: ['有收音 → 을 수 있어요', '无收音/ㄹ收音 → ㄹ 수 있어요'],
    tags: ['能力', '可能', '高频'],
    useCases: ['说能做什么', '问能不能做', '表达可能性'],
    examples: [
      { ko: '한국어 할 수 있어요.', zh: '会说韩语。' },
      { ko: '김치 먹을 수 있어요?', zh: '能吃泡菜吗？' },
      { ko: '여기서 사진 찍을 수 있어요?', zh: '这里可以拍照吗？' },
    ],
    practiceTemplates: [
      {
        id: 'gp-29-sub',
        type: 'substitution',
        prompt: '用 (으)ㄹ 수 있어요 说你能做什么',
        template: '___ (으)ㄹ 수 있어요.',
        slots: ['한국어 하다 → 할', '김치 먹다 → 먹을', '수영하다 → 수영할'],
      },
      {
        id: 'gp-29-ch1',
        type: 'choice',
        prompt: '"会说韩语"选哪个？',
        options: ['한국어 해요.', '한국어 할 수 있어요.', '한국어 하고 싶어요.'],
        answer: '한국어 할 수 있어요.',
        explanation: '할 수 있어요 = 会说/能做。해요 = 做，하고 싶어요 = 想做。',
      },
      {
        id: 'gp-29-out',
        type: 'output',
        prompt: '用 (으)ㄹ 수 있어요 说一件你能做的事',
        template: '___ (으)ㄹ 수 있어요.',
      },
    ],
    commonMistakes: [],
    toriTip: '할 수 있어요 = can do！韩语里最常见的"能不能"句型。없어요 否定形式 = 할 수 없어요（不能）。',
  },

  {
    id: 'gp-30',
    title: '-아/어 보다',
    displayTitle: '试着做……',
    pattern: '动词词干 + 아/어 보다',
    level: 'beginner',
    topikLevel: 2,
    category: '句型',
    functionZh: '表示尝试做某事，"试着做做看"',
    shortExplanation: '아/어 보다 表示"试着做某事"，带有尝试的意味。보다 本身是"看"，加上去就是"做做看"。',
    structure: ['动词词干 + 아/어 보다 → 아/어 봐요'],
    tags: ['尝试', '经验', '高频'],
    useCases: ['建议尝试', '说试过什么', '鼓励别人'],
    examples: [
      { ko: '이거 먹어 보세요.', zh: '尝尝这个。' },
      { ko: '한국에 가 보고 싶어요.', zh: '想去韩国看看。' },
      { ko: '한번 해 보세요!', zh: '试试看！' },
    ],
    practiceTemplates: [
      {
        id: 'gp-30-sub',
        type: 'substitution',
        prompt: '用 아/어 보다 说试一试',
        template: '___ 아/어 보세요.',
        slots: ['먹어 보세요', '해 보세요', '입어 보세요', '가 보세요'],
      },
      {
        id: 'gp-30-ch1',
        type: 'choice',
        prompt: '"尝尝这个"选哪个？',
        options: ['이거 먹어요.', '이거 먹어 보세요.', '이거 먹고 싶어요.'],
        answer: '이거 먹어 보세요.',
        explanation: '먹어 보세요 = 尝尝看（尝试）。먹어요 = 吃，먹고 싶어요 = 想吃。',
      },
      {
        id: 'gp-30-out',
        type: 'output',
        prompt: '用 아/어 보다 邀请别人尝试一件事',
        template: '___ 아/어 보세요!',
      },
    ],
    commonMistakes: [],
    toriTip: '아/어 보다 = 做做看。韩语里非常口语化，听到 보다 不要只想到"看"，它经常是"尝试"的意思！',
  },

];

/** Grammar ID → course day mapping (reverse of COURSE_GRAMMAR_MAP in recordLesson.ts) */
export const GRAMMAR_TO_COURSE_DAY: Record<string, number> = {
  'gp-02': 1,
  'gp-19': 2,
  'gp-04': 3,
  'gp-20': 4,
  'gp-08': 5,
  'gp-13': 7,
  'gp-14': 8,
  'gp-10': 11,
  'gp-26': 15,
  'gp-27': 16,
  'gp-09': 19,
  'gp-29': 21,
  'gp-24': 22,
  'gp-23': 24,
  'gp-30': 25,
  'gp-28': 27,
};

/** Get today's grammar pattern (cycles through 30 patterns by day) */
const LEVEL_ORDER: Record<string, number> = {
  absolute_beginner: 0,
  beginner: 1,
  elementary: 2,
  intermediate: 3,
};

export function getTodayPattern(studiedIds?: string[]): GrammarPoint {
  // Prefer an unstudied pattern for today
  if (studiedIds && studiedIds.length > 0) {
    const unstudied = sentencePatterns.filter((g) => !studiedIds.includes(g.id));
    if (unstudied.length > 0) {
      // Pick by date from unstudied pool, then fall back to first
      const idx = new Date().getDate() % unstudied.length;
      return unstudied[idx];
    }
    // All studied — pick one due for review by date
    const idx = new Date().getDate() % sentencePatterns.length;
    return sentencePatterns[idx];
  }
  // No study history — start from the beginning
  const idx = new Date().getDate() % sentencePatterns.length;
  return sentencePatterns[idx];
}

/** Get grammar patterns by category */
export function getPatternsByCategory(cat: string): GrammarPoint[] {
  return sentencePatterns.filter((g) => g.category === cat);
}

/** Get recommended next patterns (not yet studied), sorted by difficulty */
export function getRecommendedPatterns(studiedIds: string[], count: number = 4): GrammarPoint[] {
  return sentencePatterns
    .filter((g) => !studiedIds.includes(g.id))
    .sort((a, b) => (LEVEL_ORDER[a.level] ?? 99) - (LEVEL_ORDER[b.level] ?? 99))
    .slice(0, count);
}
