import type { GrammarPoint } from '@/types';

export const sentencePatterns: GrammarPoint[] = [

  // ═══════════════════════════════════════════
  //  Group 1: Self-introduction
  // ═══════════════════════════════════════════

  {
    id: 'gp-01',
    title: '이에요/예요',
    displayTitle: '我是…… / 这是……', displayTitleEn: 'I am... / This is...',
    pattern: '이에요/예요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '终结', categoryEn: 'Ending',
    functionZh: '用来说明身份或事物，相当于中文的"是……"', functionZhEn: 'Used to state identity or things, equivalent to "is/am/are" in Chinese',
    shortExplanation: '韩语的"是"会根据前面名词有无收音变化：有收音用 이에요，无收音用 예요。', shortExplanationEn: 'In Korean, "to be" changes based on whether the preceding noun has a final consonant: use 이에요 with a batchim, 예요 without.',
    structure: ['有收音名词 + 이에요', '无收音名词 + 예요'],
    tags: ['自我介绍', '判断句', '初级必备'],
    useCases: ['自我介绍', '介绍他人', '说明物品'],
    examples: [
      { ko: '저는 학생이에요.', zh: '我是学生。', zhEn: 'I am a student.', highlight: '학생이에요' },
      { ko: '저는 토리예요.', zh: '我是 Tori。', zhEn: 'I am Tori.', highlight: '토리예요' },
      { ko: '이것은 책이에요.', zh: '这是书。', zhEn: 'This is a book.', highlight: '책이에요' },
    ],
    practiceTemplates: [
      {
        id: 'gp-01-sub',
        type: 'substitution',
        prompt: '用 이에요/예요 完成句子', promptEn: 'Complete the sentence with 이에요/예요',
        template: '저는 ___이에요/예요.',
        slots: ['학생', '토리', '중국 사람', '회사원'],
      },
      {
        id: 'gp-01-ch1',
        type: 'choice',
        prompt: '"我是学生"哪句正确？', promptEn: 'Which is correct for "I am a student"?',
        options: ['저는 학생예요.', '저는 학생이에요.', '저는 학생입니다.'],
        answer: '저는 학생이에요.',
        explanation: '학생 有收音(ㄱ)，所以接 이에요。', explanationEn: '학생 has a final consonant (ㄱ), so use 이에요.',
      },
      {
        id: 'gp-01-ch2',
        type: 'choice',
        prompt: '"我是 Tori"哪句正确？', promptEn: 'Which is correct for "I am Tori"?',
        options: ['저는 토리이에요.', '저는 토리예요.'],
        answer: '저는 토리예요.',
        explanation: '토리 无收音，所以接 예요。', explanationEn: '토리 has no batchim, so 예요 is used.',
      },
      {
        id: 'gp-01-out',
        type: 'output',
        prompt: '用韩语介绍自己（用 이에요/예요）', promptEn: 'Introduce yourself in Korean (using 이에요/예요)',
        template: '저는 ___이에요/예요.',
      },
    ],
    commonMistakes: [
      { wrong: '저는 학생예요.', correct: '저는 학생이에요.', reason: '학생 有收音，必须接 이에요。', reasonEn: '학생 has a batchim, so 이에요 must be used.' },
      { wrong: '저는 토리이에요.', correct: '저는 토리예요.', reason: '토리 无收音，接 예요 就够了。', reasonEn: '토리 has no batchim, so 예요 is enough.' },
    ],
    toriTip: '最简单判断法：看前面字的最后一个音。학생 → 最后一个音 ㅇ(收音) → 이에요。토리 → 最后一个音 ㅣ(无收音) → 예요。', toriTipEn: 'The simplest way to tell: look at the last sound of the preceding word. 학생 → last sound ㅇ (batchim) → 이에요. 토리 → last sound ㅣ (no batchim) → 예요.',
  },

  {
    id: 'gp-02',
    title: '입니다',
    displayTitle: '我是……（正式）', displayTitleEn: 'I am... (formal)',
    pattern: '입니다 / 입니까?',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '终结', categoryEn: 'Ending',
    functionZh: '正式的"是……"，用于正式场合、商务、对长辈', functionZhEn: 'Formal "to be," used in formal settings, business, and with elders',
    shortExplanation: '입니다 是 이에요/예요 的正式体。陈述用 입니다，疑问用 입니까?', shortExplanationEn: '입니다 is the formal form of 이에요/예요. Use 입니다 for statements and 입니까? for questions.',
    structure: ['名词 + 입니다（陈述）', '名词 + 입니까?（疑问）'],
    tags: ['自我介绍', '正式场合', '初级必备'],
    useCases: ['正式自我介绍', '商务场合', '对长辈说话'],
    examples: [
      { ko: '저는 김민수입니다.', zh: '我是金敏秀。', zhEn: 'I am Kim Min-su.' },
      { ko: '학생입니까?', zh: '你是学生吗？', zhEn: 'Are you a student?' },
      { ko: '처음 뵙겠습니다.', zh: '初次见面。', zhEn: 'Nice to meet you.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-02-sub',
        type: 'substitution',
        prompt: '用 입니다 正式介绍自己', promptEn: 'Introduce yourself formally using 입니다',
        template: '저는 ___입니다.',
        slots: ['김민수', '중국 사람', '학생', '회사원'],
      },
      {
        id: 'gp-02-ch1',
        type: 'choice',
        prompt: '正式场合说"我是学生"，用哪个？', promptEn: 'In a formal setting, to say "I am a student," which do you use?',
        options: ['저는 학생이에요.', '저는 학생입니다.', '나는 학생이야.'],
        answer: '저는 학생입니다.',
        explanation: '正式场合用 입니다。이에요 是礼貌体，不是正式体。', explanationEn: 'Use 입니다 in formal settings. 이에요 is polite, not formal.',
      },
      {
        id: 'gp-02-out',
        type: 'output',
        prompt: '用 입니다 用韩语正式介绍自己的名字', promptEn: 'Formally introduce your name in Korean using 입니다',
        template: '저는 ___입니다.',
      },
    ],
    commonMistakes: [
      { wrong: '저는 학생입니다다.', correct: '저는 학생입니다.', reason: '입니다 本身已经是终结形式，不用再加 다。', reasonEn: '입니다 is already a final form, so don\'t add 다.' },
    ],
    toriTip: '面试、演讲、第一次见长辈时用 입니다。平时跟朋友说 이에요/예요 就行。', toriTipEn: 'Use 입니다 in interviews, speeches, and when first meeting elders. With friends, just use 이에요/예요.',
  },

  {
    id: 'gp-03',
    title: '___ 사람이에요',
    displayTitle: '我是……人', displayTitleEn: 'I am from...',
    pattern: '名词 + 사람이에요', patternEn: 'Noun + 사람이에요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型', categoryEn: 'Sentence pattern',
    functionZh: '说明某人的国籍/身份/类别', functionZhEn: 'Indicates someone\'s nationality, identity, or category',
    shortExplanation: '사람 是"人"，前面加国家/城市名表示"某国人"。사람 有收音 ㅁ，所以接 이에요。', shortExplanationEn: '사람 means "person." Add a country or city name before it to mean "a person from..." Since 사람 ends in the batchim ㅁ, it takes 이에요.',
    structure: ['国家/城市 + 사람이에요'],
    tags: ['自我介绍', '国籍', '初级必备'],
    useCases: ['说明国籍', '说明身份类别', '自我介绍'],
    examples: [
      { ko: '저는 중국 사람이에요.', zh: '我是中国人。', zhEn: 'I am Chinese.' },
      { ko: '저는 한국 사람이에요.', zh: '我是韩国人。', zhEn: 'I am Korean.' },
      { ko: '저는 서울 사람이에요.', zh: '我是首尔人。', zhEn: 'I am from Seoul.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-03-sub',
        type: 'substitution',
        prompt: '用 ___ 사람이에요 造句', promptEn: 'Make a sentence using ___ 사람이에요',
        template: '저는 ___ 사람이에요.',
        slots: ['중국', '한국', '일본', '미국'],
      },
      {
        id: 'gp-03-out',
        type: 'output',
        prompt: '用韩语说你是哪国人', promptEn: 'Say what country you\'re from in Korean',
        template: '저는 ___ 사람이에요.',
      },
    ],
    commonMistakes: [],
    toriTip: '사람 后总是接 이에요，因为 ㅁ 是收音。不要写成 사람예요！', toriTipEn: '사람 is always followed by 이에요 because ㅁ is a batchim. Don\'t write 사람예요!',
  },

  // ═══════════════════════════════════════════
  //  Group 2: Requests & Ordering
  // ═══════════════════════════════════════════

  {
    id: 'gp-04',
    title: '주세요',
    displayTitle: '请给我……', displayTitleEn: 'Please give me...',
    pattern: '名词 + 주세요', patternEn: 'Noun + 주세요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型', categoryEn: 'Sentence pattern',
    functionZh: '请求别人给自己某物，点餐、购物必备', functionZhEn: 'Ask for something politely — essential for ordering and shopping',
    shortExplanation: '주세요 来自 주다（给）+ 세요（请）。前面加想要的东西，礼貌地请求别人给。', shortExplanationEn: '주세요 comes from 주다 (to give) + 세요 (please). Add the thing you want before it to politely ask for it.',
    structure: ['名词 + 주세요'],
    tags: ['点单', '购物', '请求', '初级必备'],
    useCases: ['点咖啡', '购物', '请别人帮忙递东西'],
    examples: [
      { ko: '커피 주세요.', zh: '请给我咖啡。', zhEn: 'Please give me coffee.' },
      { ko: '물 주세요.', zh: '请给我水。', zhEn: 'Please give me water.' },
      { ko: '김밥 하나 주세요.', zh: '请给我一份紫菜包饭。', zhEn: 'Please give me one kimbap.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-04-sub',
        type: 'substitution',
        prompt: '用 주세요 点你想要的东西', promptEn: 'Use 주세요 to order what you want',
        template: '___ 주세요.',
        slots: ['커피', '물', '빵', '우유', '라면', '김밥'],
      },
      {
        id: 'gp-04-ch1',
        type: 'choice',
        prompt: '在咖啡厅说"请给我一杯美式咖啡"？', promptEn: 'At a café, say "Please give me an Americano"?',
        options: ['아메리카노 있어요.', '아메리카노 주세요.', '아메리카노 좋아해요.'],
        answer: '아메리카노 주세요.',
        explanation: '주세요 是"请给我"，点单场景用。있어요 是"有吗"，좋아해요 是"喜欢"。', explanationEn: '주세요 means "please give me," used when ordering. 있어요 means "is there?" and 좋아해요 means "like."',
      },
      {
        id: 'gp-04-out',
        type: 'output',
        prompt: '用韩语点一杯你想要的东西', promptEn: 'Order something you want in Korean',
        template: '___ 주세요.',
      },
    ],
    commonMistakes: [
      { wrong: '커피를 주세요.', correct: '커피 주세요.', reason: '口语中 을/를 可以省略，更自然。', reasonEn: 'In speech, 을/를 can be dropped for a more natural feel.' },
    ],
    toriTip: '주세요 是最实用的句型之一。去韩国咖啡厅、便利店、餐厅第一句就靠它！', toriTipEn: '주세요 is one of the most useful patterns. It\'s your go-to first phrase at Korean cafés, convenience stores, and restaurants!',
  },

  {
    id: 'gp-05',
    title: '있어요?',
    displayTitle: '有……吗？', displayTitleEn: 'Is there...?',
    pattern: '名词 + 있어요?', patternEn: 'Noun + 있어요?',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型', categoryEn: 'Sentence pattern',
    functionZh: '问有没有某样东西', functionZhEn: 'Ask if something exists',
    shortExplanation: '있어요 来自 있다（有/在），加 요 变成礼貌体。疑问句用语调上扬即可。', shortExplanationEn: '있어요 comes from 있다 (to have/exist) plus 요 for politeness. For questions, just raise your intonation.',
    structure: ['名词 + 있어요?（疑问）', '名词 + 있어요.（陈述，有）', '名词 + 없어요.（陈述，没有）'],
    tags: ['购物', '询问', '初级必备'],
    useCases: ['问店里有没有某物', '问别人有没有某物', '表示存在'],
    examples: [
      { ko: '커피 있어요?', zh: '有咖啡吗？', zhEn: 'Is there coffee?' },
      { ko: '시간 있어요?', zh: '有时间吗？', zhEn: 'Do you have time?' },
      { ko: '한국어 책 있어요?', zh: '有韩语书吗？', zhEn: 'Is there a Korean book?' },
    ],
    practiceTemplates: [
      {
        id: 'gp-05-sub',
        type: 'substitution',
        prompt: '用 있어요? 问有没有某物', promptEn: 'Use 있어요? to ask if something is available',
        template: '___ 있어요?',
        slots: ['커피', '빵', '시간', '돈', '질문'],
      },
      {
        id: 'gp-05-ch1',
        type: 'choice',
        prompt: '想表达"没有水"，选哪个？', promptEn: 'Which one do you pick to say "there\'s no water"?',
        options: ['물 있어요.', '물 없어요.', '물 주세요.'],
        answer: '물 없어요.',
        explanation: '없어요 是"没有"。있어요 是"有"，주세요 是"请给我"。', explanationEn: '없어요 means "there isn\'t." 있어요 means "there is," and 주세요 means "please give me."',
      },
      {
        id: 'gp-05-out',
        type: 'output',
        prompt: '用韩语问一样东西有没有', promptEn: 'Ask if something exists in Korean',
        template: '___ 있어요?',
      },
    ],
    commonMistakes: [
      { wrong: '커피가 있어요?', correct: '커피 있어요?', reason: '口语中 이/가 常省略，更自然。', reasonEn: 'In speech, 이/가 is often dropped for a more natural feel.' },
    ],
    toriTip: '있어요 / 없어요 是一个超级高频的对子。问用 있어요?，有说 있어요，没有说 없어요。', toriTipEn: '있어요 / 없어요 is a super common pair. Ask with 있어요?, say 있어요 if there is, and 없어요 if there isn\'t.',
  },

  {
    id: 'gp-06',
    title: '얼마예요?',
    displayTitle: '多少钱？', displayTitleEn: 'How much is it?',
    pattern: '名词 + 얼마예요?', patternEn: 'Noun + 얼마예요?',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型', categoryEn: 'Sentence pattern',
    functionZh: '问价格，购物必备', functionZhEn: 'Asking prices, essential for shopping',
    shortExplanation: '얼마 是"多少"，加 예요（是）就是"是多少？"即"多少钱？"。', shortExplanationEn: '얼마 means "how much," and adding 예요 (is) makes it "how much is it?" i.e., "how much does it cost?"',
    structure: ['名词 + 얼마예요?'],
    tags: ['购物', '询问价格', '初级必备'],
    useCases: ['问价格', '市场购物', '便利店'],
    examples: [
      { ko: '이거 얼마예요?', zh: '这个多少钱？', zhEn: 'How much is this?' },
      { ko: '커피 얼마예요?', zh: '咖啡多少钱？', zhEn: 'How much is the coffee?' },
      { ko: '김밥 얼마예요?', zh: '紫菜包饭多少钱？', zhEn: 'How much is the gimbap?' },
    ],
    practiceTemplates: [
      {
        id: 'gp-06-sub',
        type: 'substitution',
        prompt: '用 얼마예요? 问价格', promptEn: 'Use 얼마예요? to ask the price',
        template: '___ 얼마예요?',
        slots: ['이거', '커피', '빵', '책'],
      },
      {
        id: 'gp-06-out',
        type: 'output',
        prompt: '用韩语问一个东西的价格', promptEn: 'Ask the price of something in Korean',
        template: '___ 얼마예요?',
      },
    ],
    commonMistakes: [],
    toriTip: '이거 是"这个"，저거 是"那个"。시장에서 이거 얼마예요? 说完这句就可以开始砍价了！', toriTipEn: '이거 means "this," 저거 means "that." At the market, say 이거 얼마예요? and you\'re ready to bargain!',
  },

  // ═══════════════════════════════════════════
  //  Group 3: Location & Action
  // ═══════════════════════════════════════════

  {
    id: 'gp-07',
    title: '에 가요',
    displayTitle: '去……', displayTitleEn: 'Go to...',
    pattern: '地点 + 에 가요', patternEn: 'Place + 에 가요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型', categoryEn: 'Sentence pattern',
    functionZh: '表示去某个地方', functionZhEn: 'Indicates going to a place',
    shortExplanation: '에 是方向/目的地助词，가요 来自 가다（去）的礼貌体。', shortExplanationEn: '에 is the direction/destination particle, and 가요 comes from 가다 (to go) in polite form.',
    structure: ['地点 + 에 가요'],
    tags: ['移动', '方向', '初级必备'],
    useCases: ['说去哪里', '问去哪里', '旅行计划'],
    examples: [
      { ko: '학교에 가요.', zh: '去学校。', zhEn: 'Go to school.' },
      { ko: '집에 가요.', zh: '回家。', zhEn: 'Go home.' },
      { ko: '한국에 가요.', zh: '去韩国。', zhEn: 'Go to Korea.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-07-sub',
        type: 'substitution',
        prompt: '用 에 가요 说去哪里', promptEn: 'Use 에 가요 to say where you\'re going',
        template: '___에 가요.',
        slots: ['학교', '집', '한국', '서울', '카페'],
      },
      {
        id: 'gp-07-ch1',
        type: 'choice',
        prompt: '"去咖啡厅"用韩语怎么说？', promptEn: 'How do you say "go to a café" in Korean?',
        options: ['카페에 있어요.', '카페에 가요.', '카페에서 먹어요.'],
        answer: '카페에 가요.',
        explanation: '에 가요 是"去……"。에 있어요 是"在……"，에서 먹어요 是"在……吃"。', explanationEn: '에 가요 means "go to..." 에 있어요 means "be at..." and 에서 먹어요 means "eat at..."',
      },
      {
        id: 'gp-07-out',
        type: 'output',
        prompt: '用韩语说你要去哪里', promptEn: 'Say where you\'re going in Korean',
        template: '___에 가요.',
      },
    ],
    commonMistakes: [
      { wrong: '학교를 가요.', correct: '학교에 가요.', reason: '去某个地方，目的地用 에，不用 을/를。', reasonEn: 'When going somewhere, use 에 for the destination, not 을/를.' },
    ],
    toriTip: '에 = 方向箭头 →。想象有一个箭头指向你要去的地方。', toriTipEn: '에 = direction arrow →. Imagine an arrow pointing to where you\'re going.',
  },

  {
    id: 'gp-08',
    title: '에 있어요',
    displayTitle: '在……', displayTitleEn: 'At...',
    pattern: '地点 + 에 있어요', patternEn: 'Place + 에 있어요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型', categoryEn: 'Sentence pattern',
    functionZh: '表示某物/某人在某个地方', functionZhEn: 'Indicates something/someone is at a place',
    shortExplanation: '에 标记地点，있어요 是"在/有"。说人或东西"在"某处时用。', shortExplanationEn: '에 marks the location, and 있어요 means "to be/exist." Use it to say someone or something is at a place.',
    structure: ['地点 + 에 있어요'],
    tags: ['位置', '存在', '初级必备'],
    useCases: ['说在哪里', '问路', '描述位置'],
    examples: [
      { ko: '학교에 있어요.', zh: '在学校。', zhEn: 'At school.' },
      { ko: '집에 있어요.', zh: '在家。', zhEn: 'At home.' },
      { ko: '책상 위에 있어요.', zh: '在桌子上。', zhEn: 'On the table.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-08-sub',
        type: 'substitution',
        prompt: '用 에 있어요 说在哪里', promptEn: 'Use 에 있어요 to say where something is',
        template: '___에 있어요.',
        slots: ['학교', '집', '카페', '회사'],
      },
      {
        id: 'gp-08-ch1',
        type: 'choice',
        prompt: '"咖啡在桌子上"，选哪个？', promptEn: '"The coffee is on the table" — which one?',
        options: ['커피가 책상 위에 있어요.', '커피가 책상 위에 가요.', '커피가 책상 위에서 있어요.'],
        answer: '커피가 책상 위에 있어요.',
        explanation: '에 있어요 = 在。에서 是动作发生地，不搭配 있다。', explanationEn: '에 있어요 = to be at. 에서 marks where an action happens and doesn\'t go with 있다.',
      },
      {
        id: 'gp-08-out',
        type: 'output',
        prompt: '用韩语说你现在在哪里', promptEn: 'Say where you are now in Korean.',
        template: '___에 있어요.',
      },
    ],
    commonMistakes: [
      { wrong: '집에서 있어요.', correct: '집에 있어요.', reason: '있다 表示存在用 에，不用 에서。', reasonEn: '있다 (to exist) uses 에, not 에서.' },
    ],
    toriTip: '에 있어요 和 에 가요 的区别：있어요 是已经在那个地方，가요 是在去的路上。', toriTipEn: 'Difference between 에 있어요 and 에 가요: 있어요 means you\'re already there, 가요 means you\'re on the way.',
  },

  {
    id: 'gp-09',
    title: '에서 ___요',
    displayTitle: '在……做……', displayTitleEn: 'Do ... at ...',
    pattern: '地点 + 에서 + 动词', patternEn: 'Place + 에서 + verb',
    level: 'beginner',
    topikLevel: 1,
    category: '句型', categoryEn: 'Sentence pattern',
    functionZh: '表示在某个地方做某个动作', functionZhEn: 'Indicates doing an action in a certain place.',
    shortExplanation: '에서 标记动作发生的地点，后面加动作动词。与 에 不同，에서 强调"在这里做某事"。', shortExplanationEn: '에서 marks the place where an action happens, followed by an action verb. Unlike 에, 에서 emphasizes "doing something here."',
    structure: ['地点 + 에서 + 动作动词'],
    tags: ['位置', '动作', '初级必备'],
    useCases: ['说在哪做什么', '问在哪做什么'],
    examples: [
      { ko: '카페에서 커피를 마셔요.', zh: '在咖啡厅喝咖啡。', zhEn: 'Drink coffee at a café.' },
      { ko: '집에서 공부해요.', zh: '在家学习。', zhEn: 'Study at home.' },
      { ko: '식당에서 밥을 먹어요.', zh: '在餐厅吃饭。', zhEn: 'Eat at a restaurant.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-09-sub',
        type: 'substitution',
        prompt: '用 에서 说在哪做什么', promptEn: 'Use 에서 to say where you do something.',
        template: '___에서 ___요.',
        slots: ['카페', '집', '학교', '식당'],
      },
      {
        id: 'gp-09-ch1',
        type: 'choice',
        prompt: '"在学校学习"选哪个？', promptEn: '"Study at school" — which one?',
        options: ['학교에 공부해요.', '학교에서 공부해요.', '학교를 공부해요.'],
        answer: '학교에서 공부해요.',
        explanation: '에서 标记动作发生地。에 是目的地/存在地。', explanationEn: '에서 marks where an action happens. 에 is for destination/existence.',
      },
      {
        id: 'gp-09-out',
        type: 'output',
        prompt: '用韩语说你在哪里做什么', promptEn: 'Say in Korean what you\'re doing and where.',
        template: '___에서 ___요.',
      },
    ],
    commonMistakes: [
      { wrong: '학교에 공부해요.', correct: '학교에서 공부해요.', reason: '做动作的地方用 에서，静止存在才用 에。', reasonEn: 'Use 에서 for where an action happens; use 에 for static existence.' },
    ],
    toriTip: '에 vs 에서 一句话区分：에 있어요（在那里），에서 해요（在那里做）。', toriTipEn: '에 vs 에서 in one sentence: 에 있어요 (be there), 에서 해요 (do it there).',
  },

  // ═══════════════════════════════════════════
  //  Group 4: Likes & Wishes
  // ═══════════════════════════════════════════

  {
    id: 'gp-10',
    title: '좋아해요',
    displayTitle: '喜欢……', displayTitleEn: 'Like ...',
    pattern: '名词 + 좋아해요', patternEn: 'Noun + 좋아해요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型', categoryEn: 'Sentence pattern',
    functionZh: '表达喜欢某物/某人', functionZhEn: 'Expresses liking something/someone.',
    shortExplanation: '좋아해요 来自 좋아하다（喜欢）的礼貌体。前面加 을/를 也可以，口语中常省略。', shortExplanationEn: '좋아해요 comes from the polite form of 좋아하다 (to like). You can add 을/를 before it, but it\'s often dropped in speech.',
    structure: ['名词 + (을/를) 좋아해요'],
    tags: ['喜好', '表达', '初级必备'],
    useCases: ['说喜欢什么', '问别人喜欢什么', '介绍爱好'],
    examples: [
      { ko: '커피 좋아해요.', zh: '喜欢咖啡。', zhEn: 'I like coffee.' },
      { ko: '한국 음식 좋아해요.', zh: '喜欢韩国料理。', zhEn: 'I like Korean food.' },
      { ko: '뭐 좋아해요?', zh: '喜欢什么？', zhEn: 'What do you like?' },
    ],
    practiceTemplates: [
      {
        id: 'gp-10-sub',
        type: 'substitution',
        prompt: '用 좋아해요 说你喜欢什么', promptEn: 'Use 좋아해요 to say what you like',
        template: '___ 좋아해요.',
        slots: ['커피', '한국', '음악', '영화', '운동'],
      },
      {
        id: 'gp-10-ch1',
        type: 'choice',
        prompt: '"我喜欢韩语"选哪个？', promptEn: 'Which one means "I like Korean"?',
        options: ['한국어 좋아해요.', '한국어 싫어해요.', '한국어 배워요.'],
        answer: '한국어 좋아해요.',
        explanation: '좋아해요 = 喜欢，싫어해요 = 不喜欢，배워요 = 学习。', explanationEn: '좋아해요 = like, 싫어해요 = dislike, 배워요 = learn.',
      },
      {
        id: 'gp-10-out',
        type: 'output',
        prompt: '用韩语说一个你喜欢的东西', promptEn: 'Say something you like in Korean',
        template: '___ 좋아해요.',
      },
    ],
    commonMistakes: [],
    toriTip: '口语里 뭐 좋아해요? 是最常用的"你喜欢什么？"，记得 뭐 就是"什么"。', toriTipEn: 'In spoken Korean, 뭐 좋아해요? is the most common way to say "What do you like?" — remember 뭐 means "what."',
  },

  {
    id: 'gp-11',
    title: '싫어해요',
    displayTitle: '不喜欢……', displayTitleEn: 'Dislike...',
    pattern: '名词 + 싫어해요', patternEn: 'Noun + 싫어해요',
    level: 'beginner',
    topikLevel: 1,
    category: '句型', categoryEn: 'Sentence pattern',
    functionZh: '表达不喜欢某物/某人', functionZhEn: 'Express disliking something/someone',
    shortExplanation: '싫어해요 来自 싫어하다（不喜欢/讨厌）的礼貌体。与 좋아해요 正相反。', shortExplanationEn: '싫어해요 comes from the polite form of 싫어하다 (to dislike/hate). It\'s the opposite of 좋아해요.',
    structure: ['名词 + (을/를) 싫어해요'],
    tags: ['喜好', '否定', '表达'],
    useCases: ['说不喜欢什么', '表达偏好'],
    examples: [
      { ko: '매운 음식 싫어해요.', zh: '不喜欢辣的食物。', zhEn: 'I don\'t like spicy food.' },
      { ko: '비 오는 날 싫어해요.', zh: '不喜欢下雨天。', zhEn: 'I don\'t like rainy days.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-11-sub',
        type: 'substitution',
        prompt: '用 싫어해요 说你不喜欢什么', promptEn: 'Use 싫어해요 to say what you don\'t like',
        template: '___ 싫어해요.',
        slots: ['매운 음식', '추운 날씨', '숙제', '아침'],
      },
      {
        id: 'gp-11-out',
        type: 'output',
        prompt: '用韩语说一个你不喜欢的东西', promptEn: 'Say something you don\'t like in Korean',
        template: '___ 싫어해요.',
      },
    ],
    commonMistakes: [],
    compareWith: ['gp-10'],
    difference: '좋아해요 = 喜欢，싫어해요 = 不喜欢。注意 싫어해요 的 ㅎ 在连读时可能不发音。', differenceEn: '좋아해요 = like, 싫어해요 = dislike. Note that the ㅎ in 싫어해요 may be silent when linked.',
  },

  {
    id: 'gp-12',
    title: '고 싶어요',
    displayTitle: '想做……', displayTitleEn: 'Want to do...',
    pattern: '动词词干 + 고 싶어요', patternEn: 'Verb stem + 고 싶어요',
    level: 'beginner',
    topikLevel: 1,
    category: '句型', categoryEn: 'Sentence pattern',
    functionZh: '表达想做某事的愿望', functionZhEn: 'Express a desire to do something',
    shortExplanation: '动词词干去掉 다 后加 고 싶어요，表示"想做……"。这是韩语最常用的愿望表达。', shortExplanationEn: 'Drop 다 from the verb stem and add 고 싶어요 to mean "want to do..." This is the most common way to express wishes in Korean.',
    structure: ['动词词干 + 고 싶어요'],
    tags: ['愿望', '表达', '初级必备'],
    useCases: ['说想做什么', '点单表达愿望', '旅行计划', '自我介绍'],
    examples: [
      { ko: '한국에 가고 싶어요.', zh: '想去韩国。', zhEn: 'I want to go to Korea.' },
      { ko: '커피를 마시고 싶어요.', zh: '想喝咖啡。', zhEn: 'I want to drink coffee.' },
      { ko: '한국어를 배우고 싶어요.', zh: '想学韩语。', zhEn: 'Want to learn Korean.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-12-sub',
        type: 'substitution',
        prompt: '用 고 싶어요 说你想要做什么', promptEn: 'Use 고 싶어요 to say what you want to do',
        template: '___고 싶어요.',
        slots: ['한국에 가', '커피 마시', '한국어 배우', '친구 만나', '영화 보'],
      },
      {
        id: 'gp-12-ch1',
        type: 'choice',
        prompt: '"想喝咖啡"用韩语怎么说？', promptEn: 'How do you say "I want to drink coffee" in Korean?',
        options: ['커피 마시고 싶어요.', '커피 마시 싶어요.', '커피 마싣고 싶어요.'],
        answer: '커피 마시고 싶어요.',
        explanation: '마시다 → 마시 + 고 싶어요 = 마시고 싶어요。',
      },
      {
        id: 'gp-12-out',
        type: 'output',
        prompt: '用韩语说一件你想做的事', promptEn: 'Say something you want to do in Korean',
        template: '___고 싶어요.',
      },
    ],
    commonMistakes: [
      { wrong: '커피 마시다 싶어요.', correct: '커피 마시고 싶어요.', reason: '고 싶어요 是完整结构，不能只写 싶어요。', reasonEn: '고 싶어요 is a complete structure; you can\'t just write 싶어요.' },
    ],
    toriTip: '고 싶어요 是最能帮你"开口说韩语"的句型。只要记住动词去 다 加 고 싶어요，就能表达无数愿望！', toriTipEn: '고 싶어요 is the pattern that\'ll help you "start speaking Korean" the most. Just remember: drop 다 from the verb and add 고 싶어요, and you can express countless wishes!',
  },

  // ═══════════════════════════════════════════
  //  Group 5: Present Tense
  // ═══════════════════════════════════════════

  {
    id: 'gp-13',
    title: '아/어요 现在时', titleEn: '아/어요 present tense',
    displayTitle: '现在做……', displayTitleEn: 'Doing... now',
    pattern: '动词词干 + 아/어요', patternEn: 'Verb stem + 아/어요',
    level: 'beginner',
    topikLevel: 1,
    category: '终结', categoryEn: 'Ending',
    functionZh: '韩语最基本的礼貌现在时终结语尾', functionZhEn: 'The most basic polite present tense ending in Korean',
    shortExplanation: '韩语动词现在时最基本的形式就是 아/어요。根据词干的最后元音决定加 아요 还是 어요。', shortExplanationEn: 'The most basic present tense form for Korean verbs is 아/어요. Whether you add 아요 or 어요 depends on the last vowel of the stem.',
    structure: [
      '词干最后元音是 ㅏ 或 ㅗ → + 아요（如：가다 → 가요）',
      '其他元音 → + 어요（如：먹다 → 먹어요）',
      '하다 → 해요（特殊）',
    ],
    tags: ['时态', '终结', '初级必备'],
    useCases: ['日常对话', '所有现在时表达'],
    examples: [
      { ko: '가요.', zh: '去。', zhEn: 'Go.' },
      { ko: '먹어요.', zh: '吃。', zhEn: 'Eat.' },
      { ko: '해요.', zh: '做。', zhEn: 'Do.' },
      { ko: '봐요.', zh: '看。', zhEn: 'Watch.' },
      { ko: '와요.', zh: '来。', zhEn: 'Come.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-13-ch1',
        type: 'choice',
        prompt: '가다（去）的 아/어요 形式是？', promptEn: 'What is the 아/어요 form of 가다 (to go)?',
        options: ['가어요.', '가요.', '가아요.'],
        answer: '가요.',
        explanation: '가 的最后元音是 ㅏ，加 아요 → 가 + 아요 → 가요（缩合）。', explanationEn: 'The last vowel of 가 is ㅏ, so add 아요 → 가 + 아요 → 가요 (contracted).',
      },
      {
        id: 'gp-13-ch2',
        type: 'choice',
        prompt: '먹다（吃）的 아/어요 形式是？', promptEn: 'What is the 아/어요 form of 먹다 (to eat)?',
        options: ['먹어요.', '먹아요.', '먹요.'],
        answer: '먹어요.',
        explanation: '먹 的最后元音是 ㅓ，不是 ㅏ/ㅗ，所以加 어요 → 먹어요。', explanationEn: 'The last vowel of 먹 is ㅓ, not ㅏ/ㅗ, so add 어요 → 먹어요.',
      },
      {
        id: 'gp-13-sub',
        type: 'substitution',
        prompt: '把动词变成 아/어요 形式', promptEn: 'Change the verb into the 아/어요 form',
        template: '___ → ___요',
        slots: ['가다 → 가', '먹다 → 먹어', '보다 → 봐', '오다 → 와', '하다 → 해'],
      },
      {
        id: 'gp-13-out',
        type: 'output',
        prompt: '用 아/어요 写一个你现在正在做的动作', promptEn: 'Write an action you are doing right now using 아/어요',
      },
    ],
    commonMistakes: [
      { wrong: '가어요.', correct: '가요.', reason: '가 + 아요 缩合成 가요，两个元音合并。', reasonEn: '가 + 아요 contracts to 가요, merging the two vowels.' },
      { wrong: '먹아요.', correct: '먹어요.', reason: '먹 的元音是 ㅓ，属于"其他"，加 어요。', reasonEn: 'The vowel of 먹 is ㅓ, which falls under \'others,\' so add 어요.' },
    ],
    toriTip: '口诀：ㅏㅗ 用 아，其他用 어，하다 变 해。记住这三个规则，80% 的动词现在时你都会了！', toriTipEn: 'Mnemonic: ㅏㅗ takes 아, others take 어, 하다 becomes 해. Remember these three rules, and you\'ll master 80% of verb present tense!',
  },

  {
    id: 'gp-14',
    title: '高频动词现在时', titleEn: 'Present tense of high-frequency verbs',
    displayTitle: '5个最常用动词', displayTitleEn: 'The 5 most common verbs',
    pattern: '가요 / 먹어요 / 봐요 / 해요 / 와요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '终结', categoryEn: 'Ending',
    functionZh: '韩语中使用频率最高的 5 个动词的现在时', functionZhEn: 'The present tense of the 5 most frequently used verbs in Korean',
    shortExplanation: '这 5 个动词覆盖了日常对话 50% 以上的动作表达。练熟它们，日常对话就能开口。', shortExplanationEn: 'These 5 verbs cover over 50% of action expressions in daily conversation. Master them, and you\'ll be able to speak in everyday situations.',
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
      { ko: '학교에 가요.', zh: '去学校。', zhEn: 'Go to school.' },
      { ko: '밥 먹어요.', zh: '吃饭。', zhEn: 'Eat a meal.' },
      { ko: '티비 봐요.', zh: '看电视。', zhEn: 'Watch TV.' },
      { ko: '공부해요.', zh: '学习。', zhEn: 'Study.' },
      { ko: '친구가 와요.', zh: '朋友来。', zhEn: 'A friend comes.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-14-sub',
        type: 'substitution',
        prompt: '用正确的动词完成句子', promptEn: 'Complete the sentence with the correct verb',
        template: '___요.',
        slots: ['학교에 가', '밥 먹어', '티비 봐', '공부해', '친구가 와'],
      },
      {
        id: 'gp-14-ch1',
        type: 'choice',
        prompt: '"吃饭"的韩语是？', promptEn: 'What\'s the Korean for "to eat"?',
        options: ['밥 가요.', '밥 먹어요.', '밥 해요.'],
        answer: '밥 먹어요.',
        explanation: '먹다 = 吃。가다 = 去，하다 = 做。', explanationEn: '먹다 = to eat. 가다 = to go, 하다 = to do.',
      },
      {
        id: 'gp-14-out',
        type: 'output',
        prompt: '用这 5 个动词之一造一个韩语句子', promptEn: 'Make a Korean sentence using one of these 5 verbs.',
      },
    ],
    commonMistakes: [
      { wrong: '보다 → 보요', correct: '보다 → 봐요', reason: '보 + 아요 → 봐요，缩合后 ㅂ 变成 ㅘ。', reasonEn: '보 + 아요 → 봐요, where ㅂ changes to ㅘ after contraction.' },
    ],
    toriTip: '这 5 个词的 아/어요 变化都记住，你就掌握了韩语现在时 90% 的规律！', toriTipEn: 'Memorize the 아/어요 changes for these 5 words, and you\'ll master 90% of Korean present tense rules!',
  },

  // ═══════════════════════════════════════════
  //  Group 6: Negation & Questions
  // ═══════════════════════════════════════════

  {
    id: 'gp-15',
    title: '안 ___',
    displayTitle: '不……', displayTitleEn: 'Not...',
    pattern: '안 + 动词', patternEn: '안 + verb',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '否定', categoryEn: 'Negation',
    functionZh: '简单否定，"不做某事"', functionZhEn: 'Simple negation, "not doing something"',
    shortExplanation: '안 放在动词前面，直接否定动作。这是韩语最简单的否定方式。', shortExplanationEn: 'Place 안 before the verb to directly negate the action. This is the simplest way to negate in Korean.',
    structure: ['안 + 动词'],
    tags: ['否定', '初级必备'],
    useCases: ['说不要做某事', '拒绝', '表达否定意愿'],
    examples: [
      { ko: '안 가요.', zh: '不去。', zhEn: 'I\'m not going.' },
      { ko: '안 먹어요.', zh: '不吃。', zhEn: 'I won\'t eat.' },
      { ko: '커피 안 마셔요.', zh: '不喝咖啡。', zhEn: 'I don\'t drink coffee.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-15-sub',
        type: 'substitution',
        prompt: '用 안 说不要做某事', promptEn: 'Use 안 to say you don\'t do something',
        template: '안 ___요.',
        slots: ['가', '먹어', '봐', '해', '마셔'],
      },
      {
        id: 'gp-15-ch1',
        type: 'choice',
        prompt: '"不喝咖啡"选哪个？', promptEn: 'Which one means "I don\'t drink coffee"?',
        options: ['커피 안 마셔요.', '커피 마셔 안요.', '안 커피 마셔요.'],
        answer: '커피 안 마셔요.',
        explanation: '안 放在动词前面：안 + 마셔요。', explanationEn: 'Place 안 before the verb: 안 + 마셔요.',
      },
      {
        id: 'gp-15-out',
        type: 'output',
        prompt: '用 안 说一件你不做的事', promptEn: 'Use 안 to say something you don\'t do',
        template: '___ 안 ___요.',
      },
    ],
    commonMistakes: [
      { wrong: '안커피 마셔요.', correct: '커피 안 마셔요.', reason: '안 否定的是动词动作，不是名词。안 放动词前。', reasonEn: '안 negates the verb action, not the noun. Put 안 before the verb.' },
    ],
    toriTip: '안 是最简单的否定，直接放动词前面就行。口语里比 -지 않다 好用得多！', toriTipEn: '안 is the simplest negation—just put it before the verb. It\'s much more common in speech than -지 않다!',
  },

  {
    id: 'gp-16',
    title: '아니에요',
    displayTitle: '不是……', displayTitleEn: 'Not...',
    pattern: '名词 + 이/가 아니에요', patternEn: 'noun + 이/가 아니에요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '否定', categoryEn: 'Negation',
    functionZh: '否定事物身份/属性，"不是……"', functionZhEn: 'Negates identity/attribute, "is not..."',
    shortExplanation: '아니에요 是 아니다（不是）的礼貌体。前面名词加 이/가。', shortExplanationEn: '아니에요 is the polite form of 아니다 (to not be). Add 이/가 to the preceding noun.',
    structure: ['名词 + 이/가 아니에요'],
    tags: ['否定', '初级必备'],
    useCases: ['否认身份', '纠正别人', '说不是某物'],
    examples: [
      { ko: '학생이 아니에요.', zh: '不是学生。', zhEn: 'I\'m not a student.' },
      { ko: '한국 사람이 아니에요.', zh: '不是韩国人。', zhEn: 'I\'m not Korean.' },
      { ko: '제 책이 아니에요.', zh: '不是我的书。', zhEn: 'It\'s not my book.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-16-sub',
        type: 'substitution',
        prompt: '用 아니에요 说不是……', promptEn: 'Use 아니에요 to say "is not..."',
        template: '___이/가 아니에요.',
        slots: ['학생', '한국 사람', '선생님'],
      },
      {
        id: 'gp-16-ch1',
        type: 'choice',
        prompt: '"我不是学生"选哪个？', promptEn: 'Which one means "I\'m not a student"?',
        options: ['저는 학생 아니에요.', '저는 학생이 아니에요.', '저는 학생은 아니에요.'],
        answer: '저는 학생이 아니에요.',
        explanation: '아니다 前面用 이/가。학생 有收音，所以加 이。', explanationEn: 'Use 이/가 before 아니다. 학생 ends in a consonant, so add 이.',
      },
      {
        id: 'gp-16-out',
        type: 'output',
        prompt: '用 아니에요 说一件你不是的东西', promptEn: 'Use 아니에요 to say something you are not.',
        template: '___이/가 아니에요.',
      },
    ],
    commonMistakes: [
      { wrong: '학생 아니에요.', correct: '학생이 아니에요.', reason: '아니에요 前面一般要加 이/가，尤其是正式语境。', reasonEn: '아니에요 is usually preceded by 이/가, especially in formal contexts.' },
    ],
    toriTip: '이에요 = 是，아니에요 = 不是。这是你最需要的一对正反面句型。', toriTipEn: '이에요 = is, 아니에요 = is not. This is the most essential positive/negative pair you need.',
  },

  {
    id: 'gp-17',
    title: '예요?',
    displayTitle: '是……吗？', displayTitleEn: 'Is it...?',
    pattern: '名词 + 예요? / 이에요?', patternEn: 'Noun + 예요? / 이에요?',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '句型', categoryEn: 'Sentence pattern',
    functionZh: '询问身份/事物，相当于"是……吗？"', functionZhEn: 'Asks about identity/things, equivalent to "Is it...?"',
    shortExplanation: '이에요/예요 的疑问形式。韩国语里疑问句和陈述句的语尾一样，靠语调上扬来区分。', shortExplanationEn: 'The question form of 이에요/예요. In Korean, questions and statements share the same ending; rising intonation distinguishes them.',
    structure: ['名词 + 이에요?（有收音）', '名词 + 예요?（无收音）'],
    tags: ['疑问', '初级必备'],
    useCases: ['问身份', '确认事物', '日常对话'],
    examples: [
      { ko: '학생이에요?', zh: '你是学生吗？', zhEn: 'Are you a student?' },
      { ko: '한국 사람이에요?', zh: '你是韩国人吗？', zhEn: 'Are you Korean?' },
      { ko: '뭐예요?', zh: '是什么？', zhEn: 'What is it?' },
    ],
    practiceTemplates: [
      {
        id: 'gp-17-sub',
        type: 'substitution',
        prompt: '用 이에요/예요 提问', promptEn: 'Ask using 이에요/예요',
        template: '___이에요/예요?',
        slots: ['학생', '한국 사람', '중국 사람'],
      },
      {
        id: 'gp-17-ch1',
        type: 'choice',
        prompt: '"这是什么？"韩语怎么说？', promptEn: 'How do you say "What is this?" in Korean?',
        options: ['뭐예요?', '누구예요?', '어디예요?'],
        answer: '뭐예요?',
        explanation: '뭐 = 什么，누구 = 谁，어디 = 哪里。', explanationEn: '뭐 = what, 누구 = who, 어디 = where.',
      },
      {
        id: 'gp-17-out',
        type: 'output',
        prompt: '用韩语问一个问题（用 이에요/예요?）', promptEn: 'Ask a question in Korean (using 이에요/예요?)',
        template: '___이에요/예요?',
      },
    ],
    commonMistakes: [],
    toriTip: '韩语问句不需要改变语序！语调上扬就够了。학생이에요（↘陈述）vs 학생이에요?（↗疑问）。', toriTipEn: 'Korean questions don\'t change word order! Just raise your intonation. 학생이에요 (↘ statement) vs 학생이에요? (↗ question).',
  },

  {
    id: 'gp-18',
    title: '없어요',
    displayTitle: '没有……', displayTitleEn: 'There is no...',
    pattern: '名词 + 없어요', patternEn: 'Noun + 없어요',
    level: 'absolute_beginner',
    topikLevel: 1,
    category: '否定', categoryEn: 'Negation',
    functionZh: '表示某物不存在或没有某物', functionZhEn: 'Indicates that something doesn\'t exist or you don\'t have something.',
    shortExplanation: '없어요 来自 없다（没有）的礼貌体。与 있어요（有）是反义词。', shortExplanationEn: '없어요 comes from 없다 (to not have) in polite form. It\'s the opposite of 있어요 (to have).',
    structure: ['名词 + 없어요'],
    tags: ['否定', '存在', '初级必备'],
    useCases: ['说没有某物', '拒绝', '表示缺少'],
    examples: [
      { ko: '돈 없어요.', zh: '没有钱。', zhEn: 'No money.' },
      { ko: '시간 없어요.', zh: '没有时间。', zhEn: 'I have no time.' },
      { ko: '커피 없어요.', zh: '没有咖啡。', zhEn: 'There\'s no coffee.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-18-sub',
        type: 'substitution',
        prompt: '用 없어요 说没有某物', promptEn: 'Use 없어요 to say you don\'t have something.',
        template: '___ 없어요.',
        slots: ['돈', '시간', '커피', '질문'],
      },
      {
        id: 'gp-18-ch1',
        type: 'choice',
        prompt: '"没时间"选哪个？', promptEn: 'Which one means "no time"?',
        options: ['시간 있어요.', '시간 없어요.', '시간 아니에요.'],
        answer: '시간 없어요.',
        explanation: '없어요 = 没有。있어요 = 有，아니에요 = 不是。', explanationEn: '없어요 = don\'t have. 있어요 = have, 아니에요 = is not.',
      },
      {
        id: 'gp-18-out',
        type: 'output',
        prompt: '用 없어요 说一件你没有的东西', promptEn: 'Say something you don\'t have using 없어요',
        template: '___ 없어요.',
      },
    ],
    commonMistakes: [],
    compareWith: ['gp-05'],
    difference: '있어요 = 有/在，없어요 = 没有/不在。一对反义词。', differenceEn: '있어요 = to have/exist, 없어요 = to not have/not exist. They\'re antonyms.',
  },

  // ═══════════════════════════════════════════
  //  Group 7: Particles (Markers)
  // ═══════════════════════════════════════════

  {
    id: 'gp-19',
    title: '은/는',
    displayTitle: '至于……（主题）', displayTitleEn: 'As for... (topic)',
    pattern: '은/는',
    level: 'beginner',
    topikLevel: 1,
    category: '助词', categoryEn: 'Particle',
    functionZh: '标记句子主题，"说到XX的话……"，用于对比和强调', functionZhEn: 'Marks the sentence topic, \'speaking of XX...\' used for contrast and emphasis',
    shortExplanation: '은/는 放在名词后，表示"关于这个话题……"或用于对比。相当于中文的"至于……""说到……的话"。', shortExplanationEn: '은/는 goes after a noun to mean \'about this topic...\' or for contrast. It\'s like saying \'as for...\' or \'speaking of...\' in Chinese.',
    structure: ['有收音名词 + 은', '无收音名词 + 는'],
    tags: ['助词', '主题', '对比'],
    useCases: ['自我介绍', '对比', '引出话题'],
    examples: [
      { ko: '저는 학생이에요.', zh: '（至于）我，我是学生。', zhEn: '(As for) me, I\'m a student.' },
      { ko: '오늘은 날씨가 좋아요.', zh: '今天（的话），天气好。', zhEn: 'Today (speaking of), the weather is nice.' },
      { ko: '커피는 좋아해요. 그런데 차는 싫어해요.', zh: '咖啡喜欢，但是茶不喜欢。', zhEn: 'I like coffee, but I don\'t like tea.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-19-sub',
        type: 'substitution',
        prompt: '用 은/는 引出话题', promptEn: 'Use 은/는 to introduce a topic',
        template: '___은/는 ___이에요/예요.',
        slots: ['저', '오늘', '이것', '그것'],
      },
      {
        id: 'gp-19-ch1',
        type: 'choice',
        prompt: '"저___ 학생이에요" 空格填什么？', promptEn: 'What goes in the blank for \'저___ 학생이에요\'?',
        options: ['는', '은', '가', '를'],
        answer: '는',
        explanation: '저 无收音，加 는。', explanationEn: '저 has no final consonant, so add 는.',
      },
      {
        id: 'gp-19-ch2',
        type: 'choice',
        prompt: '"책___ 재미있어요"（책 有收音）空格填什么？', promptEn: 'What goes in the blank for \'책___ 재미있어요\' (책 has a final consonant)?',
        options: ['는', '가', '은', '를'],
        answer: '은',
        explanation: '책 有收音 ㄱ，所以加 은。', explanationEn: '책 has the final consonant ㄱ, so add 은.',
      },
      {
        id: 'gp-19-out',
        type: 'output',
        prompt: '用 은/는 介绍你自己', promptEn: 'Introduce yourself using 은/는',
        template: '저는 ___이에요/예요.',
      },
    ],
    commonMistakes: [
      { wrong: '저은 학생이에요.', correct: '저는 학생이에요.', reason: '저 无收音，加 는。', reasonEn: '저 has no final consonant, so add 는.' },
    ],
    compareWith: ['gp-20'],
    difference: '은/는 = 主题（大话题，"至于……"），이/가 = 主语（聚焦"谁/什么"）。', differenceEn: '은/는 = topic (big topic, \'as for...\'), 이/가 = subject (focusing on \'who/what\').',
    toriTip: '은/는 像是在舞台上先布好背景，告诉大家\'接下来要说的是关于XX的事\'', toriTipEn: '은/는 is like setting the stage first, telling everyone \'what I\'m about to talk about is XX\'',
  },

  {
    id: 'gp-20',
    title: '이/가',
    displayTitle: '……（主语）', displayTitleEn: '... (subject)',
    pattern: '이/가',
    level: 'beginner',
    topikLevel: 1,
    category: '助词', categoryEn: 'Particle',
    functionZh: '标记主语，聚焦"谁/什么做了……"或"谁/什么是……"', functionZhEn: 'Marks the subject, focusing on \'who/what did...\' or \'who/what is...\'',
    shortExplanation: '이/가 放在名词后标记主语，回答"谁？""什么？"时使用。', shortExplanationEn: '이/가 goes after a noun to mark the subject, used when answering \'who?\' or \'what?\'',
    structure: ['有收音名词 + 이', '无收音名词 + 가'],
    tags: ['助词', '主语'],
    useCases: ['回答谁的问题', '描述主语状态', '中性陈述'],
    examples: [
      { ko: '날씨가 좋아요.', zh: '天气好。', zhEn: 'The weather is nice.' },
      { ko: '누가 왔어요?', zh: '谁来了？', zhEn: 'Who came?' },
      { ko: '배가 고파요.', zh: '肚子饿。', zhEn: 'I\'m hungry.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-20-sub',
        type: 'substitution',
        prompt: '用 이/가 标记主语', promptEn: 'Use 이/가 to mark the subject',
        template: '___이/가 ___요.',
        slots: ['날씨', '배', '친구'],
      },
      {
        id: 'gp-20-ch1',
        type: 'choice',
        prompt: '"谁来了？" 选哪个？', promptEn: 'Which one for \'Who came?\'?',
        options: ['누가 왔어요?', '누는 왔어요?', '누를 왔어요?'],
        answer: '누가 왔어요?',
        explanation: '누구 + 가 = 누가，"谁"后面用 이/가。', explanationEn: '누구 + 가 = 누가, use 이/가 after \'who\'.',
      },
      {
        id: 'gp-20-out',
        type: 'output',
        prompt: '用 이/가 造一个描述主语的句子', promptEn: 'Make a sentence using 이/가 to describe the subject',
        template: '___이/가 ___요.',
      },
    ],
    commonMistakes: [
      { wrong: '친구는 왔어요.（回答"谁来了"）', wrongEn: '친구는 왔어요. (Answering "who came?")', correct: '친구가 왔어요.', reason: '回答"谁"的问题用 이/가，不用 은/는。', reasonEn: 'Use 이/가 to answer "who" questions, not 은/는.' },
    ],
    compareWith: ['gp-19'],
    toriTip: '问句里 누가/뭐가 → 答句里也用 이/가。이/가 = 聚光灯打在"谁"上。', toriTipEn: 'In questions, 누가/뭐가 → in answers, use 이/가 too. 이/가 = the spotlight is on "who."',
  },

  {
    id: 'gp-21',
    title: '을/를',
    displayTitle: '把……（宾语）', displayTitleEn: '(object marker)',
    pattern: '을/를',
    level: 'beginner',
    topikLevel: 1,
    category: '助词', categoryEn: 'Particle',
    functionZh: '标记动作的宾语，"把……"', functionZhEn: 'Marks the object of an action, like "..." in Chinese',
    shortExplanation: '을/를 放在名词后，标记这个名词是动作的对象（宾语）。相当于中文的"把……"。', shortExplanationEn: '을/를 goes after a noun to mark it as the object of the action. It\'s like "..." in Chinese.',
    structure: ['有收音名词 + 을', '无收音名词 + 를'],
    tags: ['助词', '宾语'],
    useCases: ['所有及物动词句'],
    examples: [
      { ko: '커피를 마셔요.', zh: '喝咖啡。', zhEn: 'Drink coffee.' },
      { ko: '책을 읽어요.', zh: '读书。', zhEn: 'Reading a book.' },
      { ko: '한국어를 공부해요.', zh: '学韩语。', zhEn: 'Study Korean.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-21-sub',
        type: 'substitution',
        prompt: '用 을/를 完成句子', promptEn: 'Complete the sentence using 을/를',
        template: '___을/를 ___요.',
        slots: ['커피', '책', '한국어', '밥'],
      },
      {
        id: 'gp-21-ch1',
        type: 'choice',
        prompt: '"喝咖啡"选哪个？', promptEn: 'Which one for "drink coffee"?',
        options: ['커피를 마셔요.', '커피가 마셔요.', '커피은 마셔요.'],
        answer: '커피를 마셔요.',
        explanation: '커피 是 마시다（喝）的对象，用 을/를。', explanationEn: '커피 is the object of 마시다 (to drink), so use 을/를.',
      },
      {
        id: 'gp-21-out',
        type: 'output',
        prompt: '用 을/를 造一个带宾语的句子', promptEn: 'Make a sentence with an object using 을/를',
        template: '___을/를 ___요.',
      },
    ],
    commonMistakes: [],
    toriTip: '口语中 을/를 经常省略。但写作和正式表达中最好加上。', toriTipEn: 'In speech, 을/를 is often dropped. But in writing and formal speech, it\'s best to include it.',
  },

  // ═══════════════════════════════════════════
  //  Group 8: Location Markers
  // ═══════════════════════════════════════════

  {
    id: 'gp-22',
    title: '에 vs 에서',
    displayTitle: '在…… vs 在……做', displayTitleEn: 'at vs. doing at',
    pattern: '에 vs 에서',
    level: 'beginner',
    topikLevel: 1,
    category: '助词', categoryEn: 'Particle',
    functionZh: '区分"存在的地点"和"动作发生的地点"', functionZhEn: 'Distinguish between "place of existence" and "place where an action happens"',
    shortExplanation: '에 用于表示存在、方向、时间。에서 用于表示动作发生的地点。一句话：에 = 在哪儿，에서 = 在哪儿做什么。', shortExplanationEn: '에 is for existence, direction, and time. 에서 is for where an action happens. In short: 에 = where, 에서 = where you do something.',
    structure: ['地点 + 에 + 있다/가다/오다（存在/移动）', '地点 + 에서 + 动作动词'],
    tags: ['助词', '对比', '易混'],
    useCases: ['区分存在和动作地点'],
    examples: [
      { ko: '집에 있어요.', zh: '在家。（存在）', zhEn: 'At home. (existence)' },
      { ko: '집에서 공부해요.', zh: '在家学习。（动作）', zhEn: 'Study at home. (action)' },
      { ko: '학교에 가요.', zh: '去学校。（方向）', zhEn: 'Go to school. (direction)' },
      { ko: '학교에서 친구를 만나요.', zh: '在学校见朋友。（动作）', zhEn: 'Meet a friend at school. (action)' },
    ],
    practiceTemplates: [
      {
        id: 'gp-22-ch1',
        type: 'choice',
        prompt: '"在咖啡厅喝咖啡"用 에 还是 에서？', promptEn: 'For "drink coffee at a cafe," use 에 or 에서?',
        options: ['카페에 커피 마셔요.', '카페에서 커피 마셔요.'],
        answer: '카페에서 커피 마셔요.',
        explanation: '마시다 是动作动词，用 에서。', explanationEn: '마시다 is an action verb, so use 에서.',
      },
      {
        id: 'gp-22-ch2',
        type: 'choice',
        prompt: '"在咖啡厅"（说位置）用 에 还是 에서？', promptEn: 'For "at the cafe" (stating location), use 에 or 에서?',
        options: ['카페에 있어요.', '카페에서 있어요.'],
        answer: '카페에 있어요.',
        explanation: '있다 是存在动词，用 에。', explanationEn: '있다 is an existence verb, so use 에.',
      },
      {
        id: 'gp-22-out',
        type: 'output',
        prompt: '用 에 和 에서 各造一个句子', promptEn: 'Make one sentence with 에 and one with 에서',
      },
    ],
    commonMistakes: [
      { wrong: '집에서 있어요.', correct: '집에 있어요.', reason: '있다/없다 表示存在永远用 에。', reasonEn: '있다/없다 (to exist/not exist) always use 에 for existence.' },
      { wrong: '학교에 공부해요.', correct: '학교에서 공부해요.', reason: '공부하다 是动作，用 에서。', reasonEn: '공부하다 is an action, so use 에서.' },
    ],
    toriTip: '에 = 图钉📍（固定位置），에서 = 活动区🎯（动作区域）。这样记永远不会混！', toriTipEn: '에 = pushpin 📍 (fixed location), 에서 = activity zone 🎯 (action area). Remember it this way and you\'ll never mix them up!',
  },

  // ═══════════════════════════════════════════
  //  Group 9: Tense
  // ═══════════════════════════════════════════

  {
    id: 'gp-23',
    title: '았/었/였-',
    displayTitle: '……了（过去）', displayTitleEn: '…았/었어요 (past)',
    pattern: '动词词干 + 았/었/였어요', patternEn: 'Verb stem + 았/었/였어요',
    level: 'beginner',
    topikLevel: 1,
    category: '时制', categoryEn: 'Tense',
    functionZh: '表示过去发生的动作或状态，相当于中文的"……了"', functionZhEn: 'Indicates an action or state that happened in the past, equivalent to Chinese "…了"',
    shortExplanation: '韩语过去时由词干加 았/었/였 构成，规则与 아/어요 相同。', shortExplanationEn: 'Korean past tense is formed by adding 았/었/였 to the stem, following the same rules as 아/어요.',
    structure: [
      '词干最后元音 ㅏ/ㅗ → + 았어요（가다 → 갔어요）',
      '其他元音 → + 었어요（먹다 → 먹었어요）',
      '하다 → 했어요',
    ],
    tags: ['时态', '过去', '初级必备'],
    useCases: ['说做过什么', '问做过什么', '讲故事'],
    examples: [
      { ko: '어제 학교에 갔어요.', zh: '昨天去了学校。', zhEn: 'I went to school yesterday.' },
      { ko: '밥 먹었어요.', zh: '吃饭了。', zhEn: 'I ate.' },
      { ko: '한국어 공부했어요.', zh: '学韩语了。', zhEn: 'I studied Korean.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-23-sub',
        type: 'substitution',
        prompt: '把动词变成过去时', promptEn: 'Change the verb to past tense',
        template: '___ → ___',
        slots: ['가다 → 갔어요', '먹다 → 먹었어요', '보다 → 봤어요', '하다 → 했어요'],
      },
      {
        id: 'gp-23-ch1',
        type: 'choice',
        prompt: '"去了学校"选哪个？', promptEn: 'Which one means "went to school"?',
        options: ['학교에 가요.', '학교에 갔어요.', '학교에 갈 거예요.'],
        answer: '학교에 갔어요.',
        explanation: '갔어요 = 가 + 았어요（过去）。가요 = 现在，갈 거예요 = 将来。', explanationEn: '갔어요 = 가 + 았어요 (past). 가요 = present, 갈 거예요 = future.',
      },
      {
        id: 'gp-23-out',
        type: 'output',
        prompt: '用过去时说一件你昨天做的事', promptEn: 'Say something you did yesterday using the past tense',
        template: '어제 ___었/았어요.',
      },
    ],
    commonMistakes: [
      { wrong: '가었어요.', correct: '갔어요.', reason: '가 + 았어요 缩合成 갔어요。', reasonEn: '가 + 았어요 contracts to 갔어요.' },
    ],
    toriTip: '过去时就是 아/어요 多加一个 ㅆ。아요 → 았어요，어요 → 었어요。简单！', toriTipEn: 'Past tense is just adding ㅆ to 아/어요. 아요 → 았어요, 어요 → 었어요. Easy!',
  },

  {
    id: 'gp-24',
    title: '(으)ㄹ 거예요',
    displayTitle: '会…… / 要……（将来）', displayTitleEn: 'Will… / going to… (future)',
    pattern: '动词词干 + (으)ㄹ 거예요', patternEn: 'Verb stem + (으)ㄹ 거예요',
    level: 'beginner',
    topikLevel: 1,
    category: '时制', categoryEn: 'Tense',
    functionZh: '表示将来的动作或计划，"会/要……"', functionZhEn: 'Indicates a future action or plan, "will/going to…"',
    shortExplanation: '词干后加 (으)ㄹ 거예요 表示将来、打算或推测。有无收音决定加 을 还是 ㄹ。', shortExplanationEn: 'Add (으)ㄹ 거예요 to the stem to express future, intention, or speculation. Whether to add 을 or ㄹ depends on the presence of a final consonant.',
    structure: [
      '有收音 → 을 거예요（먹다 → 먹을 거예요）',
      '无收音/ㄹ收音 → ㄹ 거예요（가다 → 갈 거예요）',
    ],
    tags: ['时态', '将来', '初级必备'],
    useCases: ['说计划', '说打算', '推测'],
    examples: [
      { ko: '내일 학교에 갈 거예요.', zh: '明天会去学校。', zhEn: 'I will go to school tomorrow.' },
      { ko: '주말에 뭐 할 거예요?', zh: '周末要做什么？', zhEn: 'What are you going to do this weekend?' },
      { ko: '한국어를 배울 거예요.', zh: '会学韩语。', zhEn: 'I will study Korean.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-24-sub',
        type: 'substitution',
        prompt: '用 (으)ㄹ 거예요 说你的计划', promptEn: 'Talk about your plans using (으)ㄹ 거예요',
        template: '___ (으)ㄹ 거예요.',
        slots: ['가다 → 갈', '먹다 → 먹을', '배우다 → 배울', '만나다 → 만날'],
      },
      {
        id: 'gp-24-ch1',
        type: 'choice',
        prompt: '"要去学校"选哪个？', promptEn: 'Which one means "going to school"?',
        options: ['학교에 가요.', '학교에 갔어요.', '학교에 갈 거예요.'],
        answer: '학교에 갈 거예요.',
        explanation: '갈 거예요 = 要去/会去。가요 = 现在去，갔어요 = 去了。', explanationEn: '갈 거예요 = going to go/will go. 가요 = going now, 갔어요 = went.',
      },
      {
        id: 'gp-24-out',
        type: 'output',
        prompt: '用 (으)ㄹ 거예요 说一件你明天要做的事', promptEn: 'Use (으)ㄹ 거예요 to say something you\'ll do tomorrow.',
        template: '내일 ___ (으)ㄹ 거예요.',
      },
    ],
    commonMistakes: [
      { wrong: '가을 거예요.', correct: '갈 거예요.', reason: '가 无收音，加 ㄹ 거예요 → 갈 거예요。', reasonEn: '가 has no final consonant, add ㄹ 거예요 → 갈 거예요.' },
    ],
    toriTip: '거예요 前面是 ㄹ 结尾，不是 을。가다 → 갈 거예요。记住这个最常见的就行了！', toriTipEn: '거예요 comes after a ㄹ ending, not 을. 가다 → 갈 거예요. Just remember this most common one!',
  },

  // ═══════════════════════════════════════════
  //  Group 10: Connectives
  // ═══════════════════════════════════════════

  {
    id: 'gp-25',
    title: '-고',
    displayTitle: '……和…… / ……然后……', displayTitleEn: '...and... / ...and then...',
    pattern: '动词/名词 + 고', patternEn: 'Verb/Noun + 고',
    level: 'beginner',
    topikLevel: 1,
    category: '连接', categoryEn: 'Connecting',
    functionZh: '连接两个动作或两个事物，"和/然后"', functionZhEn: 'Connects two actions or two things, "and/then"',
    shortExplanation: '-고 连接两个动词表示并列或先后；名词并列用 하고', shortExplanationEn: '-고 connects two verbs for listing or sequence; nouns use 하고',
    structure: ['动词词干 + 고 + 动词', '名词 + 하고 + 名词（口语）'],
    tags: ['连接', '并列', '初级必备'],
    useCases: ['列举动作', '说先后顺序', '列举事物'],
    examples: [
      { ko: '밥을 먹고 커피를 마셔요.', zh: '吃饭然后喝咖啡。', zhEn: 'Eat and then drink coffee.' },
      { ko: '사과하고 바나나 주세요.', zh: '请给我苹果和香蕉。', zhEn: 'Please give me apples and bananas.' },
      { ko: '친구를 만나고 영화를 봤어요.', zh: '见了朋友然后看了电影。', zhEn: 'Met a friend and then watched a movie.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-25-sub',
        type: 'substitution',
        prompt: '用 -고 连接两个动作', promptEn: 'Use -고 to connect two actions',
        template: '___고 ___요.',
        slots: ['먹고 마셔요', '만나고 이야기해요', '듣고 따라해요'],
      },
      {
        id: 'gp-25-ch1',
        type: 'choice',
        prompt: '"吃饭然后去学校"选哪个？', promptEn: 'Which one for "eat and then go to school"?',
        options: ['밥을 먹어서 학교에 가요.', '밥을 먹고 학교에 가요.', '밥을 먹지만 학교에 가요.'],
        answer: '밥을 먹고 학교에 가요.',
        explanation: '-고 = 然后。아/어서 = 因为/所以，-지만 = 但是。', explanationEn: '-고 = and then. 아/어서 = because/so, -지만 = but.',
      },
      {
        id: 'gp-25-out',
        type: 'output',
        prompt: '用 -고 连接你今天做的两件事', promptEn: 'Use -고 to connect two things you did today',
        template: '___고 ___요.',
      },
    ],
    commonMistakes: [],
    toriTip: '-고 是最简单的连接词。记住：名词用 하고，动词用 고。', toriTipEn: '-고 is the simplest connector. Remember: nouns use 하고, verbs use 고.',
  },

  {
    id: 'gp-26',
    title: '-지만',
    displayTitle: '……但是……', displayTitleEn: '...but...',
    pattern: '动词词干 + 지만', patternEn: 'Verb stem + 지만',
    level: 'beginner',
    topikLevel: 2,
    category: '连接', categoryEn: 'Connecting',
    functionZh: '表示转折，"虽然……但是……"', functionZhEn: 'Indicates contrast, "although...but..."',
    shortExplanation: '-지만 放在动词词干后，表示转折。与英语的"but"一样的用法。', shortExplanationEn: '-지만 goes after the verb stem to show contrast. Same usage as "but" in English.',
    structure: ['动词/形容词词干 + 지만'],
    tags: ['连接', '转折'],
    useCases: ['表达对比', '表达相反情况'],
    examples: [
      { ko: '한국어는 어렵지만 재미있어요.', zh: '韩语虽然难但是有趣。', zhEn: 'Korean is hard but fun.' },
      { ko: '비싸지만 맛있어요.', zh: '虽然贵但是好吃。', zhEn: 'It\'s pricey but delicious.' },
      { ko: '피곤하지만 공부해요.', zh: '虽然累但是学习。', zhEn: 'I\'m tired but I study.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-26-sub',
        type: 'substitution',
        prompt: '用 -지만 说"虽然……但是……"', promptEn: 'Use -지만 to say "although...but..."',
        template: '___지만 ___요.',
        slots: ['어렵지만 재미있어요', '비싸지만 맛있어요', '피곤하지만 해요'],
      },
      {
        id: 'gp-26-ch1',
        type: 'choice',
        prompt: '"虽然贵但好吃"选哪个？', promptEn: 'Which one means "expensive but delicious"?',
        options: ['비싸고 맛있어요.', '비싸지만 맛있어요.', '비싸서 맛있어요.'],
        answer: '비싸지만 맛있어요.',
        explanation: '-지만 = 但是。-고 = 和，-아서 = 因为。', explanationEn: '-지만 = but. -고 = and, -아서 = because.',
      },
      {
        id: 'gp-26-out',
        type: 'output',
        prompt: '用 -지만 造一个转折句', promptEn: 'Make a contrast sentence using -지만',
        template: '___지만 ___요.',
      },
    ],
    commonMistakes: [],
    toriTip: '-지만 放在任何动词/形容词后面都不用考虑收音，直接加就行！最简单的连接词之一。', toriTipEn: '-지만 can be added directly after any verb or adjective without worrying about the final consonant! One of the simplest connectors.',
  },

  {
    id: 'gp-27',
    title: '-아/어서',
    displayTitle: '因为……所以……', displayTitleEn: 'because... so...',
    pattern: '动词词干 + 아/어서', patternEn: 'Verb stem + 아/어서',
    level: 'beginner',
    topikLevel: 2,
    category: '连接', categoryEn: 'Connecting',
    functionZh: '表示原因和结果，"因为……所以……"', functionZhEn: 'Expresses cause and result, "because... so..."',
    shortExplanation: '아/어서 连接原因（前句）和结果（后句）。规则与 아/어요 一样。', shortExplanationEn: '아/어서 connects the cause (first clause) and result (second clause). The rules are the same as with 아/어요.',
    structure: ['词干 + 아/어서 + 结果'],
    tags: ['连接', '因果'],
    useCases: ['解释原因', '说明理由'],
    examples: [
      { ko: '배가 고파서 밥을 먹었어요.', zh: '因为肚子饿所以吃饭了。', zhEn: 'I ate because I was hungry.' },
      { ko: '날씨가 좋아서 산책했어요.', zh: '因为天气好所以散步了。', zhEn: 'I took a walk because the weather was nice.' },
      { ko: '한국어가 재미있어서 매일 공부해요.', zh: '因为韩语有趣所以每天学。', zhEn: 'I study Korean every day because it\'s fun.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-27-ch1',
        type: 'choice',
        prompt: '"因为饿所以吃饭"选哪个？', promptEn: 'Which one means "I eat because I\'m hungry"?',
        options: ['배가 고프고 밥을 먹었어요.', '배가 고파서 밥을 먹었어요.', '배가 고프지만 밥을 먹었어요.'],
        answer: '배가 고파서 밥을 먹었어요.',
        explanation: '아/어서 = 因为……所以。-고 = 然后，-지만 = 但是。', explanationEn: '아/어서 = because... so. -고 = and then, -지만 = but.',
      },
      {
        id: 'gp-27-sub',
        type: 'substitution',
        prompt: '用 아/어서 解释原因', promptEn: 'Explain a reason using 아/어서',
        template: '___아/어서 ___요.',
        slots: ['배가 고파서', '날씨가 좋아서', '피곤해서', '바빠서'],
      },
      {
        id: 'gp-27-out',
        type: 'output',
        prompt: '用 아/어서 解释你为什么做某件事', promptEn: 'Use 아/어서 to explain why you do something',
        template: '___아/어서 ___요.',
      },
    ],
    commonMistakes: [
      { wrong: '배고파고 밥 먹었어요.', correct: '배고파서 밥 먹었어요.', reason: '原因用 아/어서，不是 고。', reasonEn: 'Use 아/어서 for reasons, not 고.' },
    ],
    toriTip: '아/어서 = "因为A所以B"。注意 서 前面的变化规则和 아/어요 一模一样！', toriTipEn: '아/어서 = "because A, so B". Note that the changes before 서 are exactly the same as with 아/어요!',
  },

  {
    id: 'gp-28',
    title: '-(으)면',
    displayTitle: '如果……', displayTitleEn: 'If...',
    pattern: '动词词干 + (으)면', patternEn: 'Verb stem + (으)면',
    level: 'beginner',
    topikLevel: 2,
    category: '连接', categoryEn: 'Connecting',
    functionZh: '表示假设条件，"如果……的话"', functionZhEn: 'Expresses a hypothetical condition, "if..."',
    shortExplanation: '(으)면 表示"如果做了某事"，条件假设。有无收音决定加 으면 还是 면。', shortExplanationEn: '(으)면 means "if you do something," a conditional hypothesis. Whether you add 으면 or 면 depends on the final consonant.',
    structure: ['有收音 → 으면', '无收音/ㄹ收音 → 면'],
    tags: ['连接', '条件'],
    useCases: ['假设', '提建议', '说计划的条件'],
    examples: [
      { ko: '시간 있으면 커피 마실래요?', zh: '如果有时间，要喝咖啡吗？', zhEn: 'If you have time, would you like to get coffee?' },
      { ko: '한국에 가면 뭐 할 거예요?', zh: '如果去韩国要做什么？', zhEn: 'What would you do if you went to Korea?' },
      { ko: '비가 오면 집에 있을 거예요.', zh: '如果下雨就在家。', zhEn: 'If it rains, I\'ll stay home.' },
    ],
    practiceTemplates: [
      {
        id: 'gp-28-sub',
        type: 'substitution',
        prompt: '用 (으)면 造条件句', promptEn: 'Make a conditional sentence using (으)면',
        template: '___으면/면 ___요.',
        slots: ['시간 있으면', '한국에 가면', '비가 오면', '배고프면'],
      },
      {
        id: 'gp-28-ch1',
        type: 'choice',
        prompt: '"如果有时间"选哪个？', promptEn: 'Which one means "if you have time"?',
        options: ['시간 있어서', '시간 있으면', '시간 있고'],
        answer: '시간 있으면',
        explanation: '(으)면 = 如果。아/어서 = 因为，-고 = 然后。', explanationEn: '(으)면 = if. 아/어서 = because, -고 = and then.',
      },
      {
        id: 'gp-28-out',
        type: 'output',
        prompt: '用 (으)면 造一个假设句', promptEn: 'Make a conditional sentence using (으)면',
        template: '___으면/면 ___ (으)ㄹ 거예요.',
      },
    ],
    commonMistakes: [],
    toriTip: '中文"如果……的话" = (으)면。韩剧里最常听到的条件句！', toriTipEn: 'Chinese "if... then" = (으)면. The most common conditional in K-dramas!',
  },

  // ═══════════════════════════════════════════
  //  Group 11: Ability & Experience
  // ═══════════════════════════════════════════

  {
    id: 'gp-29',
    title: '-(으)ㄹ 수 있어요',
    displayTitle: '能…… / 会……', displayTitleEn: 'can / will',
    pattern: '动词词干 + (으)ㄹ 수 있어요', patternEn: 'Verb stem + (으)ㄹ 수 있어요',
    level: 'beginner',
    topikLevel: 2,
    category: '句型', categoryEn: 'Sentence pattern',
    functionZh: '表示能力或可能性，"能/会/可以……"', functionZhEn: 'Indicates ability or possibility, "can/will/be able to..."',
    shortExplanation: '(으)ㄹ 수 있다 表示"能做某事"。有无收音决定 을 还是 ㄹ。', shortExplanationEn: '(으)ㄹ 수 있다 means "can do something." Whether there\'s a final consonant determines 을 or ㄹ.',
    structure: ['有收音 → 을 수 있어요', '无收音/ㄹ收音 → ㄹ 수 있어요'],
    tags: ['能力', '可能', '高频'],
    useCases: ['说能做什么', '问能不能做', '表达可能性'],
    examples: [
      { ko: '한국어 할 수 있어요.', zh: '会说韩语。', zhEn: 'I can speak Korean.' },
      { ko: '김치 먹을 수 있어요?', zh: '能吃泡菜吗？', zhEn: 'Can you eat kimchi?' },
      { ko: '여기서 사진 찍을 수 있어요?', zh: '这里可以拍照吗？', zhEn: 'Can I take photos here?' },
    ],
    practiceTemplates: [
      {
        id: 'gp-29-sub',
        type: 'substitution',
        prompt: '用 (으)ㄹ 수 있어요 说你能做什么', promptEn: 'Say what you can do using (으)ㄹ 수 있어요',
        template: '___ (으)ㄹ 수 있어요.',
        slots: ['한국어 하다 → 할', '김치 먹다 → 먹을', '수영하다 → 수영할'],
      },
      {
        id: 'gp-29-ch1',
        type: 'choice',
        prompt: '"会说韩语"选哪个？', promptEn: 'Which one means "can speak Korean"?',
        options: ['한국어 해요.', '한국어 할 수 있어요.', '한국어 하고 싶어요.'],
        answer: '한국어 할 수 있어요.',
        explanation: '할 수 있어요 = 会说/能做。해요 = 做，하고 싶어요 = 想做。', explanationEn: '할 수 있어요 = can speak/do. 해요 = do, 하고 싶어요 = want to do.',
      },
      {
        id: 'gp-29-out',
        type: 'output',
        prompt: '用 (으)ㄹ 수 있어요 说一件你能做的事', promptEn: 'Say one thing you can do using (으)ㄹ 수 있어요',
        template: '___ (으)ㄹ 수 있어요.',
      },
    ],
    commonMistakes: [],
    toriTip: '할 수 있어요 = can do！韩语里最常见的"能不能"句型。없어요 否定形式 = 할 수 없어요（不能）。', toriTipEn: '할 수 있어요 = can do! The most common "can/can\'t" pattern in Korean. Negative form 없어요 = 할 수 없어요 (can\'t).',
  },

  {
    id: 'gp-30',
    title: '-아/어 보다',
    displayTitle: '试着做……', displayTitleEn: 'try doing...',
    pattern: '动词词干 + 아/어 보다', patternEn: 'Verb stem + 아/어 보다',
    level: 'beginner',
    topikLevel: 2,
    category: '句型', categoryEn: 'Sentence pattern',
    functionZh: '表示尝试做某事，"试着做做看"', functionZhEn: 'Indicates trying something, "try doing it"',
    shortExplanation: '아/어 보다 表示"试着做某事"，带有尝试的意味。보다 本身是"看"，加上去就是"做做看"。', shortExplanationEn: '아/어 보다 means "try doing something," with a sense of attempting. 보다 itself means "see," so adding it gives "try and see."',
    structure: ['动词词干 + 아/어 보다 → 아/어 봐요'],
    tags: ['尝试', '经验', '高频'],
    useCases: ['建议尝试', '说试过什么', '鼓励别人'],
    examples: [
      { ko: '이거 먹어 보세요.', zh: '尝尝这个。', zhEn: 'Try this.' },
      { ko: '한국에 가 보고 싶어요.', zh: '想去韩国看看。', zhEn: 'I want to go see Korea.' },
      { ko: '한번 해 보세요!', zh: '试试看！', zhEn: 'Try it!' },
    ],
    practiceTemplates: [
      {
        id: 'gp-30-sub',
        type: 'substitution',
        prompt: '用 아/어 보다 说试一试', promptEn: 'Say "try it" using 아/어 보다',
        template: '___ 아/어 보세요.',
        slots: ['먹어 보세요', '해 보세요', '입어 보세요', '가 보세요'],
      },
      {
        id: 'gp-30-ch1',
        type: 'choice',
        prompt: '"尝尝这个"选哪个？', promptEn: 'Which one means "try this"?',
        options: ['이거 먹어요.', '이거 먹어 보세요.', '이거 먹고 싶어요.'],
        answer: '이거 먹어 보세요.',
        explanation: '먹어 보세요 = 尝尝看（尝试）。먹어요 = 吃，먹고 싶어요 = 想吃。', explanationEn: '먹어 보세요 = try eating (attempt). 먹어요 = eat, 먹고 싶어요 = want to eat.',
      },
      {
        id: 'gp-30-out',
        type: 'output',
        prompt: '用 아/어 보다 邀请别人尝试一件事', promptEn: 'Using 아/어 보다 to invite someone to try something',
        template: '___ 아/어 보세요!',
      },
    ],
    commonMistakes: [],
    toriTip: '아/어 보다 = 做做看。韩语里非常口语化，听到 보다 不要只想到"看"，它经常是"尝试"的意思！', toriTipEn: '아/어 보다 = give it a try. It\'s very colloquial in Korean—when you hear 보다, don\'t just think "see"; it often means "try"!',
  },

];

/** Get today's grammar pattern (cycles through 30 patterns by day) */
const LEVEL_ORDER: Record<string, number> = {
  absolute_beginner: 0,
  beginner: 1,
  elementary: 2,
  intermediate: 3,
};

export function getTodayPattern(studiedIds?: string[]): GrammarPoint {
  if (sentencePatterns.length === 0) throw new Error('sentencePatterns is empty');
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
