export interface GrammarExample {
  [k: string]: unknown;
  ko: string;
  zh: string;
  note?: string;
}

export interface GrammarExercise {
  [k: string]: unknown;
  mcq: { question: string; options: string[]; correctIdx: number }[];
  fillBlank: { sentence: string; answer: string; hint: string }[];
  sentenceCreate: { prompt: string; hint: string }[];
}

export interface GrammarPoint {
  [k: string]: unknown;
  id: string;
  title: string;
  pattern: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topik: string;
  category: string;
  usage: string;
  explanation: string;
  conjugation: string;
  examples: GrammarExample[];
  similarPatterns?: string[];
  difference?: string;
  toriTip?: string;
  exercises?: GrammarExercise;
}

export const grammarPoints: GrammarPoint[] = [

  // =====================================================================
  //  CATEGORY: 조사 (Particles / 助词)
  // =====================================================================

  {
    id: 'g1', title: '主语/主题助词', titleEn: 'Subject/Topic Particles', pattern: '은/는',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '조사',
    usage: '表示句子的主题，或用于对比、强调', usageEn: 'Indicates the topic of a sentence, or used for contrast and emphasis.',
    explanation: '은/는 放在名词后面，表示这个名词是句子的话题。与 이/가 不同，은/는 侧重于"关于这个话题……"的意思。当说话人想要对比或强调时使用。', explanationEn: '은/는 is placed after a noun to mark it as the topic of the sentence. Unlike 이/가, 은/는 focuses on "as for this topic..." It\'s used when the speaker wants to contrast or emphasize.',
    conjugation: '有收音的名词 + 은 (如：책은)\n无收音的名词 + 는 (如：나는)', conjugationEn: 'Nouns ending in a consonant + 은 (e.g., 책은)\\nNouns ending in a vowel + 는 (e.g., 나는)',
    examples: [
      { ko: '저는 학생입니다.', zh: '我是学生。', zhEn: 'I am a student.', note: '话题引出：我是学生', noteEn: 'Introducing a topic: I am a student.' },
      { ko: '오늘은 날씨가 좋아요.', zh: '今天天气很好。（强调"今天"）', zhEn: 'The weather is nice today. (Emphasizing "today")', note: '对比强调：突出今天', noteEn: 'Contrastive emphasis: highlighting today.' },
      { ko: '사과는 있는데 배는 없어요.', zh: '苹果有但梨没有。（对比）', zhEn: 'There are apples, but no pears. (Contrast)', note: '对比：苹果vs梨', noteEn: 'Contrast: apples vs. pears.' },
    ],
    similarPatterns: ['이/가'],
    difference: '은/는 是主题助词（大话题），이/가 是主格助词（主语）。"코끼리는 코가 길다"（大象鼻子长）—은/는 引出话题，이/가 标记具体主语。', differenceEn: '은/는 is a topic particle (broad topic), while 이/가 is a subject particle (specific subject). "코끼리는 코가 길다" (An elephant\'s nose is long) — 은/는 introduces the topic, 이/가 marks the specific subject.',
    toriTip: '🐰 最简单的判断法：第一次提到某人/物用 이/가，再次提到或大家都知道的话题用 은/는。"저는 토리예요"（我是토리，大家都看到我了）vs "토리가 왔어요"（토리来了，第一次出现）。', toriTipEn: '🐰 The simplest rule: use 이/가 when mentioning someone/something for the first time, and 은/는 for topics already mentioned or known to everyone. "저는 토리예요" (I\'m Tori, everyone can see me) vs "토리가 왔어요" (Tori came, first mention).',
    exercises: {
      mcq: [
        { question: '"저___ 학생입니다." 空格中应填入？', questionEn: '"저___ 학생입니다." What goes in the blank?', options: ['는', '가', '를', '도'], correctIdx: 0 },
        { question: '"오늘___ 날씨가 좋아요."（强调"今天"）空格中应填入？', questionEn: '"오늘___ 날씨가 좋아요." (emphasizing "today") What goes in the blank?', options: ['이', '은', '을', '에'], correctIdx: 1 },
        { question: '"책___ 재미있어요."（책 有收音）空格中应填入？', questionEn: '"책___ 재미있어요." (책 has a final consonant) What goes in the blank?', options: ['는', '가', '은', '를'], correctIdx: 2 },
      ],
      fillBlank: [
        { sentence: '저___ 토리예요.', answer: '는', hint: '无收音，主题助词', hintEn: 'No final consonant, topic particle' },
        { sentence: '이것___ 사과예요.', answer: '은', hint: '有收音，主题助词', hintEn: 'Has final consonant, topic particle' },
        { sentence: '저___ 학생이고, 친구___ 선생님이에요.', answer: '는|는', hint: '对比两个主语，都无收音', hintEn: 'Comparing two subjects, both without final consonants' },
      ],
      sentenceCreate: [
        { prompt: '用 은/는 介绍自己的名字', promptEn: 'Use 은/는 to introduce your name', hint: '저는 [이름]입니다' },
        { prompt: '用 은/는 对比两样东西', promptEn: 'Use 은/는 to compare two things', hint: 'A은/는 ~고 B은/는 ~' },
      ],
    },
  },
  {
    id: 'g2', title: '主格助词', titleEn: 'Subject particle', pattern: '이/가',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '조사',
    usage: '表示动作或状态的主体', usageEn: 'Marks the subject of an action or state',
    explanation: '이/가 放在名词后面，标记句子的主语。与 은/는 不同，이/가 侧重于"谁/什么做了……"或"谁/什么是……"。', explanationEn: '이/가 goes after a noun to mark the subject of the sentence. Unlike 은/는, 이/가 focuses on "who/what did..." or "who/what is...".',
    conjugation: '有收音 + 이\n无收音 + 가', conjugationEn: 'Final consonant + 이\\nNo final consonant + 가',
    examples: [
      { ko: '날씨가 좋아요.', zh: '天气好。', zhEn: 'The weather is nice.', note: '主语标记：天气是主语', noteEn: 'Subject marker: weather is the subject' },
      { ko: '누가 왔어요?', zh: '谁来了？', zhEn: 'Who came?', note: '疑问主语：谁做的', noteEn: 'Question subject: who did it' },
      { ko: '친구가 선물을 줬어요.', zh: '朋友送了礼物。', zhEn: 'A friend gave a gift.', note: '主语标记：朋友是主语', noteEn: 'Subject marker: friend is the subject' },
    ],
    similarPatterns: ['은/는'],
    difference: '이/가 强调主语本身，은/는 强调话题或对比。', differenceEn: '이/가 emphasizes the subject itself, while 은/는 emphasizes the topic or contrast.',
    toriTip: '🐰 问"谁做的？"用 이/가："누가 했어요?"。回答"我做的"也用 이/가："제가 했어요"。이/가 把焦点放在"谁"上面。', toriTipEn: '🐰 To ask "who did it?" use 이/가: "누가 했어요?" To answer "I did" also use 이/가: "제가 했어요". 이/가 puts the focus on "who".',
    exercises: {
      mcq: [
        { question: '"날씨___ 좋아요." 空格中应填入？', questionEn: '"날씨___ 좋아요." What goes in the blank?', options: ['는', '가', '를', '도'], correctIdx: 1 },
        { question: '"누___ 왔어요?"（谁来...）空格中应填入？', questionEn: '"누___ 왔어요?" (who came...) What goes in the blank?', options: ['가', '는', '를', '에'], correctIdx: 0 },
        { question: '"친구___ 선물을 줬어요."（친구 无收音）空格中应填入？', questionEn: '"친구___ 선물을 줬어요." (친구 has no final consonant) What goes in the blank?', options: ['은', '이', '가', '을'], correctIdx: 2 },
      ],
      fillBlank: [
        { sentence: '날씨___ 좋아요.', answer: '가', hint: '无收音，主格助词', hintEn: 'No final consonant, subject particle' },
        { sentence: '책___ 재미있어요.', answer: '이', hint: '有收音，主格助词', hintEn: 'Has final consonant, subject particle' },
      ],
      sentenceCreate: [
        { prompt: '用 이/가 描述天气', promptEn: 'Use 이/가 to describe the weather', hint: '날씨가 [形容词]', hintEn: 'The weather is [adjective]' },
        { prompt: '用 이/가 问谁做了什么', promptEn: 'Use 이/가 to ask who did what', hint: '누가 [动词]?', hintEn: 'Who [verb]?' },
      ],
    },
  },
  {
    id: 'g3', title: '宾格助词', titleEn: 'Object particle', pattern: '을/를',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '조사',
    usage: '表示动作的宾语', usageEn: 'Marks the object of an action',
    explanation: '을/를 放在名词后面，标记动作的对象或目标。在口语中经常被省略。', explanationEn: '을/를 goes after a noun to mark the object or target of an action. It\'s often omitted in spoken Korean.',
    conjugation: '有收音的名词 + 을 (如：책을)\n无收音的名词 + 를 (如：사과를)', conjugationEn: 'Nouns with a final consonant + 을 (e.g., 책을)\\nNouns without a final consonant + 를 (e.g., 사과를)',
    examples: [
      { ko: '밥을 먹어요.', zh: '吃饭。', zhEn: 'Eat a meal.', note: '宾语标记：饭是宾语', noteEn: 'Object marker: rice is the object' },
      { ko: '저는 한국어를 공부해요.', zh: '我学韩语。', zhEn: 'I study Korean.', note: '宾语标记：韩语是宾语', noteEn: 'Object marker: Korean is the object' },
      { ko: '영화를 봤어요.', zh: '看了电影。', zhEn: 'I watched a movie.', note: '宾语标记：电影是宾语', noteEn: 'Object marker: movie is the object' },
    ],
    toriTip: '🐰 韩语口语中经常省略 을/를！"밥 먹었어?"（吃饭了吗）比"밥을 먹었어?"更自然。初学时加上不会错，但听懂别人省略了也很重要。', toriTipEn: '🐰 을/를 is often dropped in spoken Korean! "밥 먹었어?" (Did you eat?) sounds more natural than "밥을 먹었어?". Adding it when you\'re a beginner is fine, but understanding when others drop it is also important.',
    similarPatterns: ['이/가'],
    difference: '을/를 标记宾语（动作的对象），이/가 标记主语（动作的执行者）。"제가 밥을 먹어요"——제가(주어+이/가) 밥을(목적어+을/를)，两者不可互换。', differenceEn: '을/를 marks the object (what the action is done to), and 이/가 marks the subject (who does the action). In "제가 밥을 먹어요" — 제가 (subject + 이/가) and 밥을 (object + 을/를) — the two can\'t be swapped.',
  },
  {
    id: 'g4', title: '时间/地点/方向助词', titleEn: 'Time/place/direction particle', pattern: '에',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '조사',
    usage: '表示时间点、存在地点、方向目的地', usageEn: 'Marks a point in time, a place of existence, or a direction/destination',
    explanation: '에 是最多功能的基础助词之一：①表示动作发生的时间；②与 있다/없다 搭配表示存在的场所；③与 가다/오다 等移动动词搭配表示目的地。', explanationEn: '에 is one of the most versatile basic particles: ① marks when an action happens; ② with 있다/없다, marks where something exists; ③ with movement verbs like 가다/오다, marks the destination.',
    conjugation: '名词 + 에\n注意：动作发生场所用 에서，存在地点用 에', conjugationEn: 'Noun + 에\\nNote: use 에서 for where an action takes place, and 에 for where something exists',
    examples: [
      { ko: '아침 7시에 일어나요.', zh: '早上7点起床。（时间）', zhEn: 'I get up at 7 a.m. (time)', note: '时间：早上七点', noteEn: 'Time: 7 a.m.' },
      { ko: '책상 위에 책이 있어요.', zh: '书桌上有书。（存在）', zhEn: 'There\'s a book on the desk. (existence)', note: '存在位置：书桌上', noteEn: 'Place of existence: on the desk' },
      { ko: '내일 학교에 가요.', zh: '明天去学校。（目的地）', zhEn: 'I\'m going to school tomorrow. (destination)', note: '目的地：去学校', noteEn: 'Destination: going to school' },
    ],
    similarPatterns: ['에서'],
    difference: '에 表示存在地点或目的地，에서 表示动作进行的场所。방에 있어요（在房间里）vs 방에서 공부해요（在房间里学习）。', differenceEn: '에 marks a place of existence or destination, while 에서 marks where an action takes place. 방에 있어요 (I\'m in the room) vs 방에서 공부해요 (I study in the room).',
    toriTip: '🐰 记住这个口诀："에 是静止的（在/去），에서 是动态的（做）"。있다（在）/ 없다（不在）/ 가다（去）/ 오다（来）前面用 에；공부하다（学习）/ 먹다（吃）/ 일하다（工作）前面用 에서。', toriTipEn: '🐰 Remember this trick: "에 is static (being/going), 에서 is dynamic (doing)". Use 에 before 있다 (to be)/ 없다 (not to be)/ 가다 (to go)/ 오다 (to come); use 에서 before 공부하다 (to study)/ 먹다 (to eat)/ 일하다 (to work).',
  },
  {
    id: 'g5', title: '动作场所助词', titleEn: 'Action location particle', pattern: '에서',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '조사',
    usage: '表示动作发生的场所或出发点', usageEn: 'Indicates the place where an action occurs or the point of departure',
    explanation: '에서 标记动作进行的场所，与表示存在/目的地的 에 形成对比。也可表示"从某地出发"。', explanationEn: '에서 marks the place where an action takes place, contrasting with 에, which indicates existence or destination. It can also mean "from a place."',
    conjugation: '名词 + 에서', conjugationEn: 'Noun + 에서',
    examples: [
      { ko: '도서관에서 공부해요.', zh: '在图书馆学习。', zhEn: 'Study at the library.', note: '动作场所：图书馆学习', noteEn: 'Action location: studying at the library' },
      { ko: '회사에서 일해요.', zh: '在公司工作。', zhEn: 'Work at the company.', note: '动作场所：公司工作', noteEn: 'Action location: working at the company' },
      { ko: '서울에서 왔어요.', zh: '从首尔来的。', zhEn: 'Came from Seoul.', note: '出发点：从首尔', noteEn: 'Point of departure: from Seoul' },
    ],
    similarPatterns: ['에'],
    difference: '에서 = 动作进行场所，에 = 存在/目的地。', differenceEn: '에서 = place of action, 에 = existence/destination.',
    toriTip: '🐰 "도서관에서 책을 읽어요"（在图书馆读书）— 读书是动作，用 에서。"도서관에 책이 있어요"（图书馆里有书）— 书在那里，用 에。', toriTipEn: '🐰 "도서관에서 책을 읽어요" (reading at the library) — reading is an action, so use 에서. "도서관에 책이 있어요" (there\'s a book at the library) — the book is there, so use 에.',
  },
  {
    id: 'g6', title: '包含/也', titleEn: 'Inclusion/also', pattern: '도',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '조사',
    usage: '表示"也"、"还"、"都"', usageEn: 'Means "also," "too," or "even"',
    explanation: '도 放在名词后，表示"也"的意思。在否定句中可表示"连……也……"。可以替代 은/는、이/가、을/를。', explanationEn: '도 goes after a noun to mean "also." In negative sentences, it can mean "not even." It can replace 은/는, 이/가, and 을/를.',
    conjugation: '名词 + 도 (直接加，不受收音影响)', conjugationEn: 'Noun + 도 (added directly, regardless of final consonant)',
    examples: [
      { ko: '저도 학생이에요.', zh: '我也是学生。', zhEn: 'I\'m a student too.', note: '添加：我也是', noteEn: 'Addition: me too' },
      { ko: '한국어도 배우고 싶어요.', zh: '也想学韩语。', zhEn: 'I want to learn Korean too.', note: '添加：韩语也想学', noteEn: 'Addition: want to learn Korean too' },
      { ko: '한 명도 안 왔어요.', zh: '一个人也没来。', zhEn: 'Not even one person came.', note: '强调：连一个都没', noteEn: 'Emphasis: not even one' },
    ],
    toriTip: '🐰 도 是韩语里最好用的词之一！加在任何名词后面就是"也"的意思。"나도!"（我也是！）、"이것도!"（这个也要！），两个字就能表达自己，超简单。', toriTipEn: '🐰 도 is one of the most useful words in Korean! Add it to any noun and it means "too." "나도!" (me too!), "이것도!" (this too!) — two words and you\'ve expressed yourself. Super easy.',
    similarPatterns: ['조차', '마저'],
    difference: '도 是普通"也"；조차/마저 强调"连……都……"，带有意外或极端语气（"连这个都不行"）。日常用 도，强调极端情况才用 조차/마저。', differenceEn: '도 is the regular "also"; 조차/마저 emphasize "even..." with a sense of surprise or extremity ("even this doesn\'t work"). Use 도 in daily speech, and 조차/마저 only for extreme emphasis.',
  },
  {
    id: 'g7', title: '所属助词', titleEn: 'Possessive particle', pattern: '의',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '조사',
    usage: '表示所属关系，"……的"', usageEn: 'Indicates possession, "...\'s"',
    explanation: '의 是韩语的属格助词，相当于中文的"的"。在口语中常读作 [에]。口语中常用 저의 → 제, 나의 → 내, 너의 → 네 的缩略形式。', explanationEn: '의 is the Korean genitive particle, equivalent to "\'s" in English. In speech, it\'s often pronounced [에]. Common contractions: 저의 → 제, 나의 → 내, 너의 → 네.',
    conjugation: '名词 + 의', conjugationEn: 'Noun + 의',
    examples: [
      { ko: '이것은 저의 (제) 책이에요.', zh: '这是我的书。', zhEn: 'This is my book.', note: '所属：我的书', noteEn: 'Belongs to: my book' },
      { ko: '선생님의 설명을 잘 들으세요.', zh: '请好好听老师的说明。', zhEn: 'Please listen carefully to the teacher\'s explanation.', note: '所属：老师的说明', noteEn: 'Belongs to: teacher\'s explanation' },
      { ko: '한국의 전통 문화가 정말 아름다워요.', zh: '韩国的传统文化非常美。', zhEn: 'Korea\'s traditional culture is very beautiful.', note: '所属：韩国的文化', noteEn: 'Belongs to: Korean culture' },
    ],
    toriTip: '🐰 口语中说"我的"几乎永远用 제（저의 的缩写）或 내（나의 的缩写），而不是 저의/나의。"제 책이에요"比"저의 책이에요"自然100倍！', toriTipEn: '🐰 In spoken Korean, "my" is almost always 제 (short for 저의) or 내 (short for 나의), not 저의/나의. "제 책이에요" is 100 times more natural than "저의 책이에요"!',
    similarPatterns: ['에게/한테'],
    difference: '의 表示所属关系（A의 B = A的B），에게/한테 表示给予/对象方向（A에게 B를 주다 = 给A某物）。"선생님의 책"（老师的书，所属）vs "선생님에게 책을 드렸어요"（给老师书，对象）。', differenceEn: '의 shows possession (A의 B = A\'s B), while 에게/한테 marks the recipient or target (A에게 B를 주다 = give B to A). "선생님의 책" (teacher\'s book, possession) vs "선생님에게 책을 드렸어요" (gave a book to the teacher, recipient).',
  },
  {
    id: 'g8', title: '给予对象助词', titleEn: 'Recipient particle', pattern: '에게/한테',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '조사',
    usage: '表示动作的对象（人/动物），"给……"、"对……"', usageEn: 'Marks the target of an action (person/animal), "to...", "for..."',
    explanation: '에게 用于书面语或正式场合，한테 用于口语。表示给予的对象或动作指向的人/动物。对事物用 -에。', explanationEn: '에게 is used in writing or formal settings, 한테 in speech. Both mark the recipient or target of an action (person/animal). For things, use -에.',
    conjugation: '名词 + 에게/한테\n给长辈时 + 께', conjugationEn: 'Noun + 에게/한테\\nFor elders, add + 께',
    examples: [
      { ko: '친구한테 선물을 줬어요.', zh: '给朋友送了礼物。', zhEn: 'I gave a gift to a friend.', note: '给予对象：给朋友', noteEn: 'Recipient: to a friend' },
      { ko: '선생님에게 물어보세요.', zh: '请问老师吧。', zhEn: 'Let\'s ask the teacher.', note: '询问对象：问老师', noteEn: 'Target of inquiry: ask the teacher' },
      { ko: '엄마한테 전화했어요.', zh: '给妈妈打了电话。', zhEn: 'I called my mom.', note: '给予对象：给妈妈', noteEn: 'Recipient: to mom' },
    ],
    toriTip: '🐰 朋友/平辈用 한테，正式场合/书面用 에게，长辈用 께。"친구한테 말했어"（跟朋友说了）→"선생님에게 말씀드렸어요"（跟老师说了）→"할머니께 말씀드렸어요"（跟奶奶说了），三种场合三个助词！', toriTipEn: '🐰 Use 한테 for friends/peers, 에게 for formal/written, 께 for elders. "친구한테 말했어" (told a friend) → "선생님에게 말씀드렸어요" (told a teacher) → "할머니께 말씀드렸어요" (told grandma) — three situations, three particles!',
    similarPatterns: ['에'],
    difference: '에게/한테 接人或动物（"친구에게 편지를 썼어요"给朋友写信），에 接事物/场所（"학교에 편지를 보냈어요"寄信到学校）。向人传递信息/物品时用 에게/한테，向地点发送时用 에。', differenceEn: '에게/한테 attach to people or animals ("친구에게 편지를 썼어요" wrote a letter to a friend), 에 attaches to things/places ("학교에 편지를 보냈어요" sent a letter to school). Use 에게/한테 when sending info/items to a person, 에 when sending to a place.',
  },
  {
    id: 'g9', title: '方向/手段/资格', titleEn: 'Direction/means/qualification', pattern: '-(으)로',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '조사',
    usage: '表示方向（"往……"）、手段（"用……"）、资格（"作为……"）', usageEn: 'Marks direction ("toward..."), means ("with..."), or qualification ("as...")',
    explanation: '一个多功能的助词，根据语境可以有不同含义：①方向/目的地；②工具/手段；③原因/理由；④资格/身份；⑤选择。', explanationEn: 'A versatile particle with different meanings depending on context: ① direction/destination; ② tool/means; ③ cause/reason; ④ qualification/status; ⑤ choice.',
    conjugation: '无收音/ㄹ + 로\n有收音 (除ㄹ外) + 으로', conjugationEn: 'No final consonant/ㄹ + 로\\nFinal consonant (except ㄹ) + 으로',
    examples: [
      { ko: '오른쪽으로 가세요.', zh: '请往右边走。（方向）', zhEn: 'Please go to the right. (Direction)', note: '方向：往右走', noteEn: 'Direction: Go right' },
      { ko: '연필로 쓰세요.', zh: '请用铅笔写。（工具）', zhEn: 'Please write with a pencil. (Tool)', note: '工具：用铅笔', noteEn: 'Tool: Use a pencil' },
      { ko: '학생 대표로 회의에 참가했어요.', zh: '作为学生代表参加了会议。（资格）', zhEn: 'Attended the meeting as a student representative. (Status)', note: '资格：作为代表', noteEn: 'Status: As a representative' },
      { ko: '감기로 결석했어요.', zh: '因感冒缺席了。（原因）', zhEn: 'Was absent due to a cold. (Reason)', note: '原因：因为感冒', noteEn: 'Reason: Because of a cold' },
    ],
    toriTip: '🐰 -(으)로 是韩语的万能介词！记住四种用法：方向（往哪儿）、工具（用什么）、身份（作为什么）、原因（因为什么）。看到路牌上的"오른쪽으로"就是"往右"的意思！', toriTipEn: '🐰 -(으)로 is Korean\'s all-purpose particle! Remember four uses: direction (where to), tool (what with), status (as what), reason (because of what). Seeing "오른쪽으로" on a sign means "to the right"!',
    similarPatterns: ['에'],
    difference: '方向义上：에 表示静态目的地/位置（"서울에 있어요"在首尔），-(으)로 表示动态方向/经过（"서울로 가요"往首尔方向走）。-(으)로 还有工具/手段、资格/身份等 에 没有的用法。', differenceEn: 'For direction: 에 indicates a static destination/location ("서울에 있어요" in Seoul), while -(으)로 indicates dynamic direction/passage ("서울로 가요" heading toward Seoul). -(으)로 also has uses like tool/means and status/identity that 에 doesn\'t have.',
  },
  {
    id: 'g10', title: '比较', titleEn: 'Comparison', pattern: '보다',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '조사',
    usage: '表示比较，"比……"', usageEn: 'Indicates comparison, "than..."',
    explanation: '用于名词后，表示比较的对象。常与 더（更）搭配使用。', explanationEn: 'Used after nouns to indicate the object of comparison. Often paired with 더 (more).',
    conjugation: '名词 + 보다', conjugationEn: 'Noun + 보다',
    examples: [
      { ko: '이게 저것보다 더 예뻐요.', zh: '这个比那个更好看。', zhEn: 'This one is prettier than that one.', note: '比较：比那个好看', noteEn: 'Comparison: Prettier than that one' },
      { ko: '한국어가 생각보다 어려워요.', zh: '韩语比想象中难。', zhEn: 'Korean is harder than I imagined.', note: '比较：比想象中难', noteEn: 'Comparison: Harder than imagined' },
      { ko: '오늘이 어제보다 더워요.', zh: '今天比昨天热。', zhEn: 'Today is hotter than yesterday.', note: '比较：今天比昨天热', noteEn: 'Comparison: Today is hotter than yesterday' },
    ],
    toriTip: '🐰 보다 是"比"的意思，常搭配 더（更）。"A보다 B가 더 좋아요"= B比A更好。韩语的语序和中文相反：先说比较对象（A보다），再说比较结果！', toriTipEn: '🐰 보다 means "than," often paired with 더 (more). "A보다 B가 더 좋아요" = B is better than A. Korean word order is opposite to Chinese: state the comparison target first (A보다), then the result!',
    similarPatterns: ['만큼'],
    difference: 'A보다 B가 더 크다（B比A大，有差距），A만큼 B가 크다（B和A一样大，表示相当）。보다 强调差异，만큼 强调相等或达到某种程度。', differenceEn: 'A보다 B가 더 크다 (B is bigger than A, showing a difference), A만큼 B가 크다 (B is as big as A, showing equivalence). 보다 emphasizes difference, while 만큼 emphasizes equality or reaching a certain degree.',
  },
  {
    id: 'g11', title: '范围起点/终点', titleEn: 'Range start/end', pattern: '부터 / 까지',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '조사',
    usage: '表示时间或空间的起点/终点，"从……到……"', usageEn: 'Indicates the start/end of time or space, "from... to..."',
    explanation: '-부터 表示时间或空间上的起点（"从……"），-까지 表示终点（"到……"）。两者经常搭配使用。', explanationEn: '-부터 indicates the starting point in time or space ("from..."), and -까지 indicates the endpoint ("to..."). They are often used together.',
    conjugation: '名词 + 부터 (起点)\n名词 + 까지 (终点)', conjugationEn: 'Noun + 부터 (starting point)\\nNoun + 까지 (end point)',
    examples: [
      { ko: '9시부터 6시까지 일해요.', zh: '从9点到6点工作。', zhEn: 'I work from 9 to 6.', note: '起点终点：9点到6点', noteEn: 'Start and end: 9 to 6' },
      { ko: '처음부터 끝까지 재미있었어요.', zh: '从头到尾都很有趣。', zhEn: 'It was fun from start to finish.', note: '起点终点：从头到尾', noteEn: 'Start and end: from start to finish' },
      { ko: '집부터 학교까지 걸어서 10분 걸려요.', zh: '从家到学校走路需要10分钟。', zhEn: 'It takes 10 minutes to walk from home to school.', note: '空间范围：家到学校', noteEn: 'Spatial range: home to school' },
    ],
    toriTip: '🐰 부터 = 从……开始，까지 = 到……为止。两个经常一起用。"언제부터 언제까지?"（从什么时候到什么时候？）是韩剧里最常见的时间询问句。', toriTipEn: '🐰 부터 means \'from\' and 까지 means \'until.\' They\'re often used together. "언제부터 언제까지?" (From when to when?) is the most common time question in K-dramas.',
    similarPatterns: ['에서'],
    difference: '时间和空间起点都可用 부터（"3시부터"从3点，"서울부터"从首尔）；에서 强调动作出发点（移动动词语境，"서울에서 출발해요"从首尔出发）。두 조사 모두 공간 기점에 쓸 수 있지만，에서 는 출발 동작을 강조，부터 는 범위의 시작점을 강조。"서울부터 부산까지"（从首尔到釜山，范围）vs "서울에서 부산까지"（从首尔出发到釜山，强调出发动作）。', differenceEn: 'Both time and spatial starting points can use 부터 ("3시부터" from 3 o\'clock, "서울부터" from Seoul); 에서 emphasizes the point of departure (in movement verb contexts, "서울에서 출발해요" depart from Seoul). Both particles can be used for spatial starting points, but 에서 emphasizes the departure action, while 부터 emphasizes the start of a range. "서울부터 부산까지" (from Seoul to Busan, range) vs "서울에서 부산까지" (from Seoul to Busan, emphasizing departure).',
  },
  {
    id: 'g12', title: '并列助词', titleEn: 'Coordinating particle', pattern: '와/과 / 하고 / (이)랑',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '조사',
    usage: '连接两个或多个名词，"……和……"', usageEn: 'Connects two or more nouns, \'...and...\'',
    explanation: '韩语有多种"和"的表达：와/과 用于书面和口语；하고 偏口语；(이)랑 最口语化。三者可以互换使用。', explanationEn: 'Korean has several ways to say \'and\': 와/과 is used in writing and speech; 하고 is more colloquial; (이)랑 is the most casual. They\'re interchangeable.',
    conjugation: '와/과：无收音 + 와，有收音 + 과\n하고：统一使用\n(이)랑：无收音 + 랑，有收音 + 이랑', conjugationEn: '와/과: no final consonant + 와, final consonant + 과\\n하고: always the same\\n(이)랑: no final consonant + 랑, final consonant + 이랑',
    examples: [
      { ko: '사과와 바나나를 샀어요.', zh: '买了苹果和香蕉。', zhEn: 'I bought apples and bananas.', note: '并列：苹果和香蕉', noteEn: 'Coordinating: apples and bananas' },
      { ko: '친구하고 영화 봤어요.', zh: '和朋友看了电影。', zhEn: 'I watched a movie with a friend.', note: '并列：和朋友', noteEn: 'Coordinating: with a friend' },
      { ko: '선생님이랑 같이 갔어요.', zh: '和老师一起去了。', zhEn: 'I went with the teacher.', note: '并列：和老师', noteEn: 'Coordinating: with the teacher' },
    ],
    toriTip: '🐰 日常口语最推荐 하고 和 (이)랑！와/과 偏书面，说出来有点正式。和韩国朋友聊天时用"친구랑"比"친구와"自然得多。', toriTipEn: '🐰 For everyday speech, 하고 and (이)랑 are the best! 와/과 is more written and sounds a bit formal. When chatting with Korean friends, "친구랑" sounds much more natural than "친구와."',
    similarPatterns: ['(이)나'],
    difference: '와/과/하고/(이)랑 表示并列（A和B都……），(이)나 表示选择（A或B，选其一）。"사과하고 바나나를 먹었어요"（苹果和香蕉都吃了）vs "사과나 바나나를 먹을래요?"（苹果或香蕉，选一个）。', differenceEn: '와/과/하고/(이)랑 indicate coordination (both A and B...), while (이)나 indicates choice (A or B, pick one). "사과하고 바나나를 먹었어요" (ate both apples and bananas) vs "사과나 바나나를 먹을래요?" (apples or bananas, pick one).',
  },

  // =====================================================================
  //  CATEGORY: 어미 (Verb Endings / 语尾)
  // =====================================================================

  {
    id: 'g13', title: '名词化语尾', titleEn: 'Nominalizing ending', pattern: '-기',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '어미',
    usage: '将动词/形容词变为名词形式', usageEn: 'Turns verbs/adjectives into noun form',
    explanation: '将动作或状态名词化，可以像名词一样使用。常见搭配：-기 좋다（适合做……）、-기 싫다（讨厌做……）、-기 때문에（因为……）。', explanationEn: 'Nominalizes actions or states so they can be used like nouns. Common patterns: -기 좋다 (good for...), -기 싫다 (don\'t want to...), -기 때문에 (because...).',
    conjugation: '动词/形容词词干 + 기', conjugationEn: 'Verb/adjective stem + 기',
    examples: [
      { ko: '한국어 공부하기가 재미있어요.', zh: '学韩语很有趣。', zhEn: 'Learning Korean is fun.', note: '名词化：学习这件事', noteEn: 'Nominalization: the act of studying' },
      { ko: '혼자 밥 먹기가 싫어요.', zh: '不喜欢一个人吃饭。', zhEn: 'I don\'t like eating alone.', note: '名词化：吃饭这件事', noteEn: 'Nominalization: the act of eating' },
      { ko: '이 영화는 보기가 편해요.', zh: '这部电影看起来轻松。', zhEn: 'This movie seems light and easy.', note: '名词化：看这件事', noteEn: 'Nominalization: the act of watching' },
    ],
    toriTip: '🐰 -기 是把动词变名词的魔法！"공부하다"（学习）→"공부하기"（学习这件事）。和 -는 것 用法类似但 -기 更常用于搭配：-기 좋다（适合做）、-기 싫다（讨厌做）、-기 때문에（因为做）。', toriTipEn: '🐰 -기 is the magic that turns verbs into nouns! "공부하다" (to study) → "공부하기" (studying). It\'s similar to -는 것, but -기 is more common in set phrases: -기 좋다 (good to do), -기 싫다 (hate doing), -기 때문에 (because of doing).',
    similarPatterns: ['-는 것'],
    difference: '-기 와 -는 것 都能名词化，但 -기 多用于固定搭配（-기 좋다/싫다/시작하다），-는 것 更自由，可以加修饰或作主题（"운동하는 것이 건강에 좋아요"）。', differenceEn: 'Both -기 and -는 것 can nominalize, but -기 is mostly used in fixed phrases (-기 좋다/싫다/시작하다), while -는 것 is more flexible—it can take modifiers or serve as a topic ("운동하는 것이 건강에 좋아요").',
  },
  {
    id: 'g14', title: '建议/疑问语尾', titleEn: 'Suggestive/Question Ending', pattern: '-ㄹ/을까요?',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '어미',
    usage: '提出建议或表达疑问推测', usageEn: 'To make a suggestion or express a speculative question',
    explanation: '当说话人想征求对方意见或表达推测时使用。"我们……好吗？"或"会不会……呢？"', explanationEn: 'Used when the speaker wants to ask for the other person\'s opinion or express a guess. "Shall we...?" or "I wonder if...?"',
    conjugation: '无收音 + ㄹ까요\n有收音 + 을까요', conjugationEn: 'No final consonant + ㄹ까요\\nWith final consonant + 을까요',
    examples: [
      { ko: '뭐 먹을까요?', zh: '吃什么呢？', zhEn: 'What should we eat?', note: '推测疑问：吃什么呢', noteEn: 'Speculative question: what to eat' },
      { ko: '같이 갈까요?', zh: '一起去好吗？', zhEn: 'Shall we go together?', note: '建议：一起去好吗', noteEn: 'Suggestion: shall we go together' },
      { ko: '내일 날씨가 좋을까요?', zh: '明天天气会好吗？', zhEn: 'Will the weather be nice tomorrow?', note: '推测疑问：天气会好吗', noteEn: 'Speculative question: will the weather be nice' },
    ],
    toriTip: '🐰 -ㄹ까요 是你最需要学会的句型之一！两个核心用法：①提议"我们一起……好吗？"→"같이 갈까요?"；②推测疑问"会不会……呢？"→"비가 올까요?"（会不会下雨呢）。日常对话无处不在！', toriTipEn: '🐰 -ㄹ까요 is one of the most essential patterns you\'ll learn! Two core uses: ① Suggestion "Shall we...?" → "같이 갈까요?"; ② Speculative question "I wonder if..." → "비가 올까요?" (I wonder if it\'ll rain). It\'s everywhere in daily conversation!',
    similarPatterns: ['-(으)ㄹ래요?'],
    difference: '-ㄹ까요 征求对方意见或表达共同疑问（"我们……好吗？"），-(으)ㄹ래요 直接询问对方意愿（"你想……吗？"）。提议一起做某事两个都可以，但 -ㄹ까요 更温柔，-ㄹ래요 更直接。', differenceEn: '-ㄹ까요 asks for the other person\'s opinion or expresses a shared question ("Shall we...?"), while -(으)ㄹ래요 directly asks about the other person\'s intention ("Do you want to...?"). Both work for suggesting something together, but -ㄹ까요 is softer, and -ㄹ래요 is more direct.',
  },
  {
    id: 'g15', title: '否定表达', titleEn: 'Negative Expressions', pattern: '안 / -지 않다',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '어미',
    usage: '表示否定，"不……"/"没……"', usageEn: 'To express negation, "not..." / "didn\'t..."',
    explanation: '韩语有两种否定方式：短型（안 + 动词/形容词）和长型（-지 않다）。短型用于口语，长型更正式或用于复杂表达。', explanationEn: 'Korean has two ways to negate: the short form (안 + verb/adjective) and the long form (-지 않다). The short form is used in speech, while the long form is more formal or used in complex expressions.',
    conjugation: '短型：안 + 动词/形容词\n长型：词干 + 지 않다', conjugationEn: 'Short form: 안 + verb/adjective\\nLong form: stem + 지 않다',
    examples: [
      { ko: '오늘 학교에 안 가요.', zh: '今天不去学校。', zhEn: 'I\'m not going to school today.', note: '意志否定：不想去', noteEn: 'Volitional negation: don\'t want to go' },
      { ko: '이 음식은 맵지 않아요.', zh: '这道菜不辣。', zhEn: 'This dish isn\'t spicy.', note: '状态否定：不辣', noteEn: 'State negation: not spicy' },
      { ko: '그 영화는 재미없어요. (재미있지 않아요)', zh: '那部电影没意思。', zhEn: 'That movie is boring.', note: '意志否定：没意思', noteEn: 'Volitional negation: not interesting' },
    ],
    toriTip: '🐰 口语中用短型 안 就够了！"안 가요" 比 "가지 않아요" 更常用。"안" 放在动词前面，像中文的"不"一样简单。但形容词用 안 时要注意：재미있다 → 재미없다（不是 안 재미있다）。', toriTipEn: '🐰 In spoken Korean, the short form 안 is enough! "안 가요" is more common than "가지 않아요." Just put 안 before the verb, like "不" in Chinese. But with adjectives, be careful: 재미있다 → 재미없다 (not 안 재미있다).',
    similarPatterns: ['못 / -지 못하다'],
    difference: '안/-지 않다 是意志否定（"不想/不愿意做"），못/-지 못하다 是能力否定（"做不到/没能力做"）。"안 가요"＝不想去，"못 가요"＝去不了（有原因）。', differenceEn: '안/-지 않다 is volitional negation ("don\'t want to do"), while 못/-지 못하다 is ability negation ("can\'t do"). "안 가요" = don\'t want to go, "못 가요" = can\'t go (due to a reason).',
  },
  {
    id: 'g16', title: '发现/感叹', titleEn: 'Discovery/exclamation', pattern: '-네요',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '어미',
    usage: '表示即时的发现、感叹或轻微惊讶', usageEn: 'Expresses immediate discovery, exclamation, or slight surprise',
    explanation: '用于说话人当场发现或意识到某事时的感叹。带有"呢"、"啊"、"原来……啊"的语感。口语中使用频率极高。', explanationEn: 'Used for exclamations when the speaker discovers or realizes something on the spot. Carries the nuance of "oh," "wow," or "so that\'s how it is." Extremely common in spoken Korean.',
    conjugation: '动词词干 + 네요\n形容词词干 + 네요\n名词 + (이)네요\n过去时: 았/었네요', conjugationEn: 'Verb stem + 네요\\nAdjective stem + 네요\\nNoun + (이)네요\\nPast tense: 았/었네요',
    examples: [
      { ko: '오늘 날씨가 참 좋네요!', zh: '今天天气真好啊！', zhEn: 'The weather is really nice today!', note: '即时发现：天气真好', noteEn: 'Immediate discovery: the weather is nice' },
      { ko: '한국어를 정말 잘하시네요.', zh: '韩语说得真好啊。', zhEn: 'You speak Korean really well!', note: '新发现感叹：说得好', noteEn: 'New discovery exclamation: speaks well' },
      { ko: '벌써 10시네요. 얼른 가야겠어요.', zh: '已经10点了啊，得赶紧走了。', zhEn: 'It\'s already 10 o\'clock—I need to get going.', note: '即时发现：已经10点', noteEn: 'Immediate discovery: it\'s already 10' },
    ],
    similarPatterns: ['-군요 / -구나'],
    difference: '-네요 是当场即时发现的感叹（眼前看到/听到就说），-군요 是经过理解后恍然大悟的感叹（"原来如此"）。"맛있네요!"（当场吃到觉得好吃）vs "그렇군요!"（听完解释才明白）。', differenceEn: '-네요 is an exclamation of immediate discovery (said right when you see/hear it), while -군요 is an exclamation of realization after understanding ("I see"). "맛있네요!" (tasting it and finding it delicious) vs "그렇군요!" (understanding after an explanation).',
    toriTip: '🐰 -네요 是韩语最自然的夸人句型！"한국어 잘하시네요"（韩语说得好啊）、"예쁘네요"（好漂亮啊）——当场看到就说，语气诚恳不做作。比直接说"좋아요"更有感叹的温度。', toriTipEn: '🐰 -네요 is the most natural way to compliment someone in Korean! "한국어 잘하시네요" (you speak Korean well), "예쁘네요" (so pretty)—say it the moment you see it, and it sounds sincere, not forced. It carries more warmth than just saying "좋아요."',
  },
  {
    id: 'g17', title: '领悟/感叹', titleEn: 'Realization/exclamation', pattern: '-군요 / -구나',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '어미',
    usage: '表示新了解到的事实，带感叹语气', usageEn: 'Expresses newly learned facts with an exclamatory tone',
    explanation: '与 -네요 类似但更正式、更具领悟感。-군요 用于较正式的感叹，-구나 用于自言自语的感叹。', explanationEn: 'Similar to -네요 but more formal and with a stronger sense of realization. -군요 is used for more formal exclamations, while -구나 is for talking to oneself.',
    conjugation: '动词词干 + 는군요\n形容词词干 + 군요\n名词 + (이)군요\n过去时 + 았/었군요\n推测+感叹 + 겠군요（如 힘드시겠군요）', conjugationEn: 'Verb stem + 는군요\\nAdjective stem + 군요\\nNoun + (이)군요\\nPast tense + 았/었군요\\nConjecture + exclamation + 겠군요 (e.g., 힘드시겠군요)',
    examples: [
      { ko: '그렇군요! 이제 이해했어요.', zh: '原来如此！现在我理解了。', zhEn: 'I see! Now I understand.', note: '领悟感叹：恍然大悟', noteEn: 'Realization exclamation: it all makes sense now' },
      { ko: '벌써 결혼했군요. 축하해요!', zh: '原来已经结婚了啊，祝贺！', zhEn: 'Oh, you\'re already married—congratulations!', note: '感叹：得知新事实', noteEn: 'Exclamation: realizing new information' },
      { ko: '생각보다 어렵구나...', zh: '比想象中难啊……', zhEn: 'It\'s harder than I thought...', note: '自言自语感叹：真难', noteEn: 'Talking to oneself: it\'s really hard' },
    ],
    similarPatterns: ['-네요'],
    difference: '-군요 是恍然大悟的感叹（"原来……啊"），-네요 是即时感受的感叹（"……呢/啊"）。', differenceEn: '-군요 is an exclamation of sudden realization ("so that\'s how it is"), while -네요 is an exclamation of immediate impression ("...huh/oh").',
    toriTip: '🐰 -네요 是即时发现（当场看到/听到就说），-군요 是领悟（理解了之后才说的）。看到好吃的→"맛있네요!"，迟到了才知道原因→"그렇군요!"（原来如此！）。', toriTipEn: '🐰 -네요 is for immediate discovery (you say it the moment you see/hear it), while -군요 is for realization (you say it after understanding). See something delicious → "맛있네요!" (It\'s delicious!), find out the reason for being late → "그렇군요!" (I see!).',
  },
  {
    id: 'g18', title: '反诘/确认', titleEn: 'Rhetorical question/confirmation', pattern: '-잖아요',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '어미',
    usage: '表示"不是……嘛"、"你知道的……"', usageEn: 'Means "isn\'t it..." or "you know..."',
    explanation: '用于提醒对方已知的信息，带有"你知道的呀"的语感。可以表示轻微的反驳或确认共识。口语非常高频率使用。', explanationEn: 'Used to remind the other person of information they already know, with a nuance of "you know this." Can express mild pushback or confirm shared understanding. Very high-frequency in spoken Korean.',
    conjugation: '动词词干 + 잖아요\n形容词词干 + 잖아요\n名词 + (이)잖아요', conjugationEn: 'Verb stem + 잖아요\\nAdjective stem + 잖아요\\nNoun + (이)잖아요',
    examples: [
      { ko: '내가 말했잖아요!', zh: '我不是说了嘛！', zhEn: 'Didn\'t I tell you!', note: '提醒共知：我说过的', noteEn: 'Reminding shared knowledge: I told you' },
      { ko: '이 집 진짜 맛있잖아요.', zh: '这家真的很好吃不是吗。', zhEn: 'This place is really good, isn\'t it.', note: '确认共知：好吃你知道', noteEn: 'Confirming shared knowledge: you know it\'s good' },
      { ko: '내일이 시험이잖아요. 공부해야죠.', zh: '明天不是考试嘛，得学习吧。', zhEn: 'Tomorrow\'s the exam, right? I should study.', note: '提醒共知：明天考试', noteEn: 'Reminding shared knowledge: exam tomorrow' },
    ],
    toriTip: '🐰 这是韩国人日常最高频的语尾之一！"좋잖아요"（这不挺好的嘛）、"알잖아요"（你知道的呀）、"내가 말했잖아요"（我不是说了嘛）。学会它，说话马上更像韩国人。', toriTipEn: '🐰 This is one of the most frequent endings in everyday Korean! "좋잖아요" (It\'s good, isn\'t it), "알잖아요" (You know it), "내가 말했잖아요" (Didn\'t I say so). Learn it and you\'ll sound way more Korean right away.',
    similarPatterns: ['-거든요'],
    difference: '-잖아요 用于提醒双方都知道的信息（"你应该知道的"），-거든요 用于向对方补充说明对方不知道的信息（"我来解释一下"）。"내일 시험이잖아요"（明天不是考试嘛，你也知道的）vs "내일 시험이거든요"（因为明天有考试，对方不一定知道）。', differenceEn: '-잖아요 is for reminding the other person of shared information ("you should know this"), while -거든요 is for explaining information the other person doesn\'t know ("let me explain"). "내일 시험이잖아요" (Tomorrow\'s the exam, you know) vs "내일 시험이거든요" (Because there\'s an exam tomorrow—they might not know).',
  },
  {
    id: 'g19', title: '解释/说明', titleEn: 'Explanation/description', pattern: '-거든요',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '어미',
    usage: '向对方解释原因或背景，语气柔和', usageEn: 'Explaining a reason or background to the other person, with a soft tone',
    explanation: '用于向对方解释自己的情况或行为的原因。带有"你听我说……"的语感。只用于口语的第二人称对话。', explanationEn: 'Used to explain the reason for your situation or actions to the other person. Has a nuance of "let me tell you..." Only used in spoken second-person conversation.',
    conjugation: '动词/形容词词干 + 거든요\n名词 + (이)거든요', conjugationEn: 'Verb/adjective stem + 거든요\\nNoun + (이)거든요',
    examples: [
      { ko: '어제 못 갔어요. 갑자기 일이 생겼거든요.', zh: '昨天没去成，因为突然有事。', zhEn: 'I couldn\'t go yesterday because something came up.', note: '补充解释：突然有事', noteEn: 'Supplementary explanation: something came up' },
      { ko: '이거 추천해요. 제가 써 봤거든요.', zh: '推荐这个，因为我用过。', zhEn: 'I recommend this one because I\'ve used it.', note: '补充解释：用过所以推荐', noteEn: 'Additional note: I\'ve used it, so I recommend it.' },
      { ko: '배 고파요. 아직 아침을 안 먹었거든요.', zh: '好饿，因为还没吃早饭呢。', zhEn: 'I\'m so hungry because I haven\'t had breakfast yet.', note: '补充解释：没吃早饭', noteEn: 'Additional note: haven\'t had breakfast' },
    ],
    similarPatterns: ['-니까/으니까'],
    difference: '-거든요 是事后补充解释（先说结果，再说原因），-니까 是先铺垫原因（原因在前，结论在后）。"못 갔어요, 바빴거든요"（没去成，因为很忙）vs "바쁘니까 못 가요"（因为忙所以不能去）。', differenceEn: '-거든요 is for giving an explanation after the fact (state the result first, then the reason), while -니까 sets up the reason first (reason before conclusion). "못 갔어요, 바빴거든요" (I couldn\'t go, because I was busy) vs "바쁘니까 못 가요" (Because I\'m busy, I can\'t go).',
    toriTip: '🐰 -거든요 是韩语最重要的"解释体"！先说事情，然后补一句"거든요"给理由。"늦었어요, 길이 막혔거든요"（晚了，因为堵车）— 不是借口，是体贴地解释背景，韩国人日常对话超高频！', toriTipEn: '🐰 -거든요 is Korean\'s most important "explanation form"! State something first, then add "거든요" to give the reason. "늦었어요, 길이 막혔거든요" (I\'m late, because of traffic) — it\'s not an excuse, but a considerate way to explain the background. Super common in everyday Korean conversation!',
  },
  {
    id: 'g20', title: '冠形词形', titleEn: 'Adnominal form', pattern: '-는 것',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '어미',
    usage: '将动词变为名词形式，表示"……的事/……的东西"', usageEn: 'Turn a verb into a noun form, meaning "the act of.../the thing that..."',
    explanation: '将动词或形容词变成冠形词形来修饰 것（东西/事情），形成名词短语。这是一种非常高频的韩语结构，可用于各种语境。', explanationEn: 'Change a verb or adjective into its adnominal form to modify 것 (thing/matter), forming a noun phrase. This is a very high-frequency Korean structure used in many contexts.',
    conjugation: '动词现在时 + 는 것\n动词过去时 + (으)ㄴ 것\n动词将来时 + (으)ㄹ 것\n形容词 + (으)ㄴ 것', conjugationEn: 'Verb present tense + 는 것\\nVerb past tense + (으)ㄴ 것\\nVerb future tense + (으)ㄹ 것\\nAdjective + (으)ㄴ 것',
    examples: [
      { ko: '한국어 배우는 것이 정말 재미있어요.', zh: '学韩语真的很有趣。', zhEn: 'Learning Korean is really fun.', note: '名词化：学习这件事', noteEn: 'Nominalization: the act of studying' },
      { ko: '어제 산 것이 마음에 들어요.', zh: '昨天买的东西很满意。', zhEn: 'I\'m very satisfied with what I bought yesterday.', note: '名词化：买的东西', noteEn: 'Nominalization: what I bought' },
      { ko: '제가 하고 싶은 것은 여행이에요.', zh: '我想做的是旅行。', zhEn: 'What I want to do is travel.', note: '名词化：想做的事', noteEn: 'Nominalization: what I want to do' },
    ],
    similarPatterns: ['-기'],
    difference: '-는 것 和 -기 都能名词化，但 -는 것 可以加修饰语（"제가 좋아하는 것"），语气更自然；-기 多用于固定搭配（-기 좋다/싫다/시작하다）。两者在很多情况下可以互换，但 -는 것 更通用。', differenceEn: 'Both -는 것 and -기 can nominalize, but -는 것 can take modifiers ("제가 좋아하는 것") and sounds more natural; -기 is often used in fixed expressions (-기 좋다/싫다/시작하다). They\'re often interchangeable, but -는 것 is more versatile.',
    toriTip: '🐰 -는 것 是韩语"万能名词化"！把任何动词变成"这件事"。"먹는 것"（吃这件事）、"자는 것"（睡觉这件事）。"제가 좋아하는 것은 음악이에요"（我喜欢的是音乐）— 介绍自己爱好时的完美句型。', toriTipEn: '🐰 -는 것 is Korean\'s "all-purpose nominalizer"! Turn any verb into "this thing." "먹는 것" (eating), "자는 것" (sleeping). "제가 좋아하는 것은 음악이에요" (What I like is music) — the perfect pattern for introducing your hobbies.',
  },

  // =====================================================================
  //  CATEGORY: 연결 (Connectives / 连接语尾)
  // =====================================================================

  {
    id: 'g21', title: '并列连接', titleEn: 'Coordinating connection', pattern: '-고',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '연결',
    usage: '连接两个动作或状态，表示"……和……"、"……然后……"', usageEn: 'Connect two actions or states, meaning "...and..." or "...and then..."',
    explanation: '连接动词或形容词，表示并列关系。可以连接两个动作的先后顺序，也可以连接两个并列的状态。', explanationEn: 'Connect verbs or adjectives to show coordination. Can link two actions in sequence or two parallel states.',
    conjugation: '动词/形容词词干 + 고', conjugationEn: 'Verb/adjective stem + 고',
    examples: [
      { ko: '밥을 먹고 학교에 가요.', zh: '吃饭然后去学校。', zhEn: 'Eat and then go to school.', note: '先后顺序：吃饭再去', noteEn: 'Sequence: eat first, then go' },
      { ko: '이 옷은 예쁘고 싸요.', zh: '这件衣服又漂亮又便宜。', zhEn: 'This outfit is both pretty and cheap.', note: '并列状态：漂亮又便宜', noteEn: 'Parallel states: pretty and cheap' },
      { ko: '어제 친구를 만나고 영화를 봤어요.', zh: '昨天见了朋友然后看了电影。', zhEn: 'Yesterday I met a friend and then watched a movie.', note: '先后顺序：见友后看电影', noteEn: 'Sequence: meet friend, then watch movie' },
    ],
    toriTip: '🐰 -고 是韩语最基本的连接词，相当于"然后"或"和"。造长句的秘诀就是 -고！"일어나고 씻고 밥 먹고 학교 가요"（起床→洗漱→吃饭→去学校），一口气说完一天的事！', toriTipEn: '🐰 -고 is Korean\'s most basic connector, meaning "and then" or "and." The secret to long sentences is -고! "일어나고 씻고 밥 먹고 학교 가요" (wake up → wash up → eat → go to school), say your whole day in one breath!',
    similarPatterns: ['-(으)면서'],
    difference: '-고 连接先后动作或并列状态（两个动作不必同时），-(으)면서 强调两个动作同时进行且主语相同。"밥을 먹고 TV를 봤어요"（吃完饭然后看电视，先后）vs "밥을 먹으면서 TV를 봤어요"（一边吃饭一边看电视，同时）。', differenceEn: '-고 connects sequential actions or parallel states (actions don\'t need to be simultaneous), while -(으)면서 emphasizes two actions happening at the same time with the same subject. "밥을 먹고 TV를 봤어요" (ate and then watched TV, sequential) vs "밥을 먹으면서 TV를 봤어요" (watched TV while eating, simultaneous).',
  },
  {
    id: 'g22', title: '转折连接', titleEn: 'Contrastive connector', pattern: '-지만',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '연결',
    usage: '表示转折，"虽然……但是……"', usageEn: 'Indicates contrast, "although...but..."',
    explanation: '连接前后两个分句，表示后句与前句的逻辑相反。相当于中文的"虽然……但是……"。', explanationEn: 'Connects two clauses, showing the second clause is logically opposite to the first. Equivalent to "although... but..." in Chinese.',
    conjugation: '动词/形容词词干 + 지만', conjugationEn: 'Verb/adjective stem + 지만',
    examples: [
      { ko: '비싸지만 맛있어요.', zh: '虽然贵但好吃。', zhEn: 'It\'s expensive but tasty.', note: '转折：虽贵但好吃', noteEn: 'Contrast: expensive but tasty' },
      { ko: '한국어는 어렵지만 재미있어요.', zh: '韩语虽然难但有趣。', zhEn: 'Korean is hard but fun.', note: '转折：虽难但有趣', noteEn: 'Contrast: hard but fun' },
      { ko: '피곤하지만 숙제를 해야 해요.', zh: '虽然累但必须做作业。', zhEn: 'I\'m tired but I have to do homework.', note: '转折：虽累但要做', noteEn: 'Contrast: tired but must do' },
    ],
    similarPatterns: ['-는데'],
    difference: '-지만 是明确的转折（= 但是），-는데 更柔和，常用于提供背景信息或隐约对比。', differenceEn: '-지만 is a clear contrast (= but), while -는데 is softer, often used to provide background info or a subtle contrast.',
    toriTip: '🐰 想强烈对比时用 -지만："비싸지만 맛있어요"（虽然贵但好吃）。想委婉表达或铺垫时用 -는데："비싼데 맛있어요"（有点贵，不过挺好吃的）。韩国人更爱用 -는데，因为更柔和。', toriTipEn: '🐰 Use -지만 for a strong contrast: "비싸지만 맛있어요" (expensive but tasty). Use -는데 for a softer tone or to set up context: "비싼데 맛있어요" (a bit pricey, but pretty tasty). Koreans prefer -는데 because it\'s gentler.',
  },
  {
    id: 'g23', title: '原因/顺序', titleEn: 'Reason/sequence', pattern: '-아서/어서/여서',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '연결',
    usage: '表示原因（"因为……所以……"）或动作先后顺序', usageEn: 'Indicates reason ("because... so...") or sequence of actions',
    explanation: '接在动词/形容词后，表示因果关系或时间先后。注意：不能用过去时"았/었서"，不能用命令/请诱句结尾。', explanationEn: 'Attaches to verbs/adjectives to show cause-effect or time sequence. Note: can\'t use past tense "았/었서" and can\'t end with commands or suggestions.',
    conjugation: '词干最后元音 ㅏ/ㅗ → 아서\n其他元音 → 어서\n하다 → 해서 (하여서)', conjugationEn: 'Final vowel of stem ㅏ/ㅗ → 아서\\nOther vowels → 어서\\n하다 → 해서 (하여서)',
    examples: [
      { ko: '배가 아파서 병원에 갔어요.', zh: '因为肚子疼所以去了医院。', zhEn: 'I went to the hospital because my stomach hurt.', note: '原因：肚子疼去医院', noteEn: 'Reason: stomachache, went to hospital' },
      { ko: '날씨가 좋아서 산책했어요.', zh: '因为天气好所以散了步。', zhEn: 'I took a walk because the weather was nice.', note: '原因：天气好散步', noteEn: 'Reason: nice weather, took a walk' },
      { ko: '한국어를 공부해서 한국 회사에 취직했어요.', zh: '因为学了韩语所以在韩国公司就业了。', zhEn: 'I got a job at a Korean company because I studied Korean.', note: '先后顺序：学了再就业', noteEn: 'Sequence: studied, then got a job' },
    ],
    similarPatterns: ['-니까'],
    difference: '-아서/어서 用于客观、一般性原因；-니까 用于主观原因、命令句/请诱句。不能说"배 아파서 병원에 가세요"（X），应该说"배 아프니까 병원에 가세요"（O）。', differenceEn: '-아서/어서 is for objective, general reasons; -니까 is for subjective reasons, commands, or suggestions. You can\'t say "배 아파서 병원에 가세요" (X), but "배 아프니까 병원에 가세요" (O) is correct.',
    toriTip: '🐰 最简单的记忆方法：给别人建议/命令时用 -니까，单纯说原因用 -아서/어서。"추우니까 따뜻하게 입으세요"（天冷，穿暖和点吧）— 因为是建议，用 니까！', toriTipEn: '🐰 The easiest way to remember: use -니까 for suggestions/commands, and -아서/어서 for just stating a reason. "추우니까 따뜻하게 입으세요" (It\'s cold, so dress warmly) — since it\'s a suggestion, use 니까!',
  },
  {
    id: 'g24', title: '原因/根据', titleEn: 'Reason/Basis', pattern: '-니까/으니까',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '연결',
    usage: '表示主观原因，或作为命令/请诱的依据', usageEn: 'Indicates a subjective reason or the basis for a command/suggestion',
    explanation: '用于表达说话人的主观判断、发现或命令/请诱的原因。前后主语可以不同，可以用过去时。', explanationEn: 'Used to express the speaker\'s subjective judgment, discovery, or the reason for a command/suggestion. The subjects before and after can differ, and past tense can be used.',
    conjugation: '词干 + (으)니까\n无받침/ㄹ받침 + 니까（ㄹ받침示例：알다→아니까）\n其他有받침 + 으니까',
    examples: [
      { ko: '날씨가 추우니까 따뜻하게 입으세요.', zh: '天气冷，穿暖和点吧。', zhEn: 'It\'s cold, so dress warmly.', note: '建议依据：因为冷', noteEn: 'Basis for suggestion: because it\'s cold' },
      { ko: '배 고프니까 같이 밥 먹으러 갈래요?', zh: '饿了，一起去吃饭好吗？', zhEn: 'I\'m hungry, so shall we go eat together?', note: '主观原因：因为饿', noteEn: 'Subjective reason: because hungry' },
      { ko: '생각해 보니까 그 말이 맞는 것 같아요.', zh: '想了想，觉得那句话是对的。', zhEn: 'After thinking about it, I felt that statement was right.', note: '主观发现：想了想', noteEn: 'Subjective discovery: after thinking' },
    ],
    similarPatterns: ['-아서/어서'],
    difference: '命令句、请诱句中只能用 -니까，不能用 -아서/어서。', differenceEn: 'In imperative and propositive sentences, only -니까 can be used, not -아서/어서.',
    toriTip: '🐰 -니까 是你给建议/命令时的"王牌连接词"。"배 고프니까 같이 먹으러 가요"（饿了所以一起去吃吧）— 因为是提议，用 니까！如果是单纯说原因"배 고파서 혼자 먹었어요"（因为饿了所以自己吃了）。', toriTipEn: '🐰 -니까 is your "ace connector" for suggestions/commands. "배 고프니까 같이 먹으러 가요" (I\'m hungry, so let\'s go eat together) — since it\'s a suggestion, use 니까! If just stating a reason: "배 고파서 혼자 먹었어요" (I ate alone because I was hungry).',
  },
  {
    id: 'g25', title: '目的移动', titleEn: 'Movement for a purpose', pattern: '-러/으러',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '연결',
    usage: '表示去某处做某事的目的', usageEn: 'Indicates the purpose of going somewhere to do something',
    explanation: '接在移动动词（가다, 오다, 다니다 等）前面，表示"为了做……而去/来"。', explanationEn: 'Attaches before movement verbs (가다, 오다, 다니다, etc.) to mean "go/come to do..."',
    conjugation: '词干 + 러 (无收音)、으러 (有收音)\nㄹ받침 + 러（ㄹ不脱落，如 놀다→놀러）',
    examples: [
      { ko: '밥 먹으러 식당에 가요.', zh: '去餐厅吃饭。', zhEn: 'Go to a restaurant to eat.', note: '目的移动：去吃饭', noteEn: 'Purpose movement: go to eat' },
      { ko: '친구 만나러 홍대에 갔어요.', zh: '去弘大见朋友。', zhEn: 'Go to Hongdae to meet a friend.', note: '目的移动：去见朋友', noteEn: 'Purpose movement: to meet a friend' },
      { ko: '책 빌리러 도서관에 왔어요.', zh: '来图书馆借书。', zhEn: 'Come to the library to borrow books.', note: '目的移动：来借书', noteEn: 'Purpose movement: come to borrow' },
    ],
    toriTip: '🐰 -러 只能和移动动词（가다/오다/다니다）搭配！"看电影"是"영화 보러 가요"，不是"영화 볼러 가요"。记住：러 前面是目的，러 后面是移动。', toriTipEn: '🐰 -러 only pairs with movement verbs (가다/오다/다니다)! "Watch a movie" is "영화 보러 가요", not "영화 볼러 가요". Remember: before 러 is the purpose, after 러 is the movement.',
    similarPatterns: ['-려고'],
    difference: '-러/으러 只能接移动动词（가다/오다/다니다 等），表示"去/来做某事"；-려고 可接所有动词，表示"打算/为了做某事"，不限于移动。"밥 먹으러 가요"（去吃饭）= -러+移动；"밥 먹으려고 준비해요"（为了吃饭在准备）= -려고+任何动词。', differenceEn: '-러/으러 only attaches to movement verbs (가다/오다/다니다, etc.), meaning "go/come to do something"; -려고 can attach to all verbs, meaning "intend to/do something for", not limited to movement. "밥 먹으러 가요" (go to eat) = -러 + movement; "밥 먹으려고 준비해요" (preparing to eat) = -려고 + any verb.',
  },
  {
    id: 'g26', title: '背景/对比', titleEn: 'Background/Contrast', pattern: '-는데/ㄴ데/은데',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '연결',
    usage: '提供背景信息，或委婉地表达对比/转折', usageEn: 'Provide background info, or softly express contrast/turn',
    explanation: '韩语中最重要的连接语尾之一。用于：①提供背景后引出后续内容；②委婉转折；③反期待（"居然……"）。用法非常灵活。', explanationEn: 'One of the most important connective endings in Korean. Used for: ① providing background before leading into the main point; ② soft contrast; ③ unexpectedness ("turns out..."). Very versatile.',
    conjugation: '动词：词干 + 는데 (现在时)、았/었는데 (过去时)\n形容词：有收音 + 은데，无收音 + ㄴ데\n名词 + 인데', conjugationEn: 'Verbs: stem + 는데 (present), 았/었는데 (past)\\nAdjectives: with batchim + 은데, without batchim + ㄴ데\\nNouns + 인데',
    examples: [
      { ko: '밖에 비가 오는데 우산 있어요?', zh: '外面下雨了，有伞吗？（背景+询问）', zhEn: 'It\'s raining outside—do you have an umbrella? (background + question)', note: '背景铺垫：下雨引出问题', noteEn: 'Background setup: rain leads to the question' },
      { ko: '어제 갔는데 문이 닫혀 있었어요.', zh: '昨天去了，但门关着的。', zhEn: 'I went yesterday, but the door was closed.', note: '委婉转折：去了但关门', noteEn: 'Soft contrast: went but it was closed' },
      { ko: '생각보다 괜찮은데요?', zh: '比想象的好啊？（委婉评价）', zhEn: 'Better than I thought, huh? (soft evaluation)', note: '委婉评价：比想象好', noteEn: 'Soft evaluation: better than expected' },
    ],
    similarPatterns: ['-지만'],
    difference: '-지만 是明确的"虽然……但是……"，-는데 更柔和、多功能。', differenceEn: '-지만 is a clear "although... but...", while -는데 is softer and more multi-purpose.',
    toriTip: '🐰 -는데 是韩语的"万能连接词"！日常对话无处不在。核心用法：先说背景用 -는데，再引出正题。"배 고픈데 뭐 먹을래요?"（我饿了，吃点什么呢？）— 前半句背景，后半句正题。', toriTipEn: '🐰 -는데 is Korean\'s "all-purpose connector"! It\'s everywhere in daily conversation. Core usage: set the background with -는데, then bring up the main point. "배 고픈데 뭐 먹을래요?" (I\'m hungry, what should we eat?) — first half is background, second half is the main point.',
  },
  {
    id: 'g27', title: '目的小句', titleEn: 'Purpose clause', pattern: '-도록',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '연결',
    usage: '表示目的（"以便……"）或程度（"到……程度"）', usageEn: 'Indicates purpose ("so that...") or degree ("to the extent of...")',
    explanation: '①表示"为了使……"的目的；②表示达到某种程度。比 -게 更正式、更强调目的性。', explanationEn: '① Indicates purpose ("in order to..."); ② indicates reaching a certain degree. More formal and purpose-focused than -게.',
    conjugation: '动词词干 + 도록', conjugationEn: 'Verb stem + 도록',
    examples: [
      { ko: '늦지 않도록 서두르세요.', zh: '请快点，以免迟到。', zhEn: 'Please hurry so you won\'t be late.', note: '目的：为了不迟到', noteEn: 'Purpose: to avoid being late' },
      { ko: '잘 보이도록 크게 써 주세요.', zh: '请写大一点以便看清楚。', zhEn: 'Please write it bigger so it\'s easy to see.', note: '目的：为了看清楚', noteEn: 'Purpose: to make it clear to see' },
      { ko: '밤새도록 공부했어요.', zh: '熬夜学习了一整夜。（程度用法：到深夜的程度）', zhEn: 'I stayed up studying all night. (degree usage: to the extent of all night)', note: '程度：到整夜的程度', noteEn: 'Degree: to the extent of the whole night' },
    ],
    similarPatterns: ['-게'],
    difference: '-도록 比 -게 更书面、更强调目的性。口语更常用 -게（"잘 보이게 써 주세요"），-도록 多见于说明书、公告或正式场合。程度用法（밤새도록）是固定搭配，不能换成 -게。', differenceEn: '-도록 is more written and purpose-focused than -게. In speech, -게 is more common ("잘 보이게 써 주세요"), while -도록 appears more in manuals, announcements, or formal settings. The degree usage (밤새도록) is a fixed expression and can\'t be replaced with -게.',
    toriTip: '🐰 日常口语更喜欢用 -게！"잘 보이게 크게 써 주세요" 和 "잘 보이도록 크게 써 주세요" 都对，但和朋友说用前者更自然。-도록 在说明书、公告里更常见。', toriTipEn: '🐰 In everyday speech, -게 is preferred! "잘 보이게 크게 써 주세요" and "잘 보이도록 크게 써 주세요" are both correct, but the former sounds more natural with friends. -도록 is more common in manuals and announcements.',
  },
  {
    id: 'g28', title: '条件/如果', titleEn: 'Condition/if', pattern: '-(으)면',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '연결',
    usage: '表示条件，"如果……的话"', usageEn: 'Indicates a condition, "if..."',
    explanation: '最常用的条件表达。可用于假设、一般条件、或"每当……的时候"。', explanationEn: 'The most common conditional expression. Used for hypotheses, general conditions, or "whenever..."',
    conjugation: '无收音/ㄹ + 면\n有收音 + 으면', conjugationEn: 'No batchim/ㄹ + 면\\nWith batchim + 으면',
    examples: [
      { ko: '시간 있으면 같이 가요.', zh: '有时间的话一起去吧。', zhEn: 'If you have time, let\'s go together.', note: '假设条件：有时间的话', noteEn: 'Hypothetical condition: if you have time' },
      { ko: '봄이 되면 꽃이 피어요.', zh: '一到春天花就开。', zhEn: 'Flowers bloom as soon as spring comes.', note: '规律性条件：到春天就开花', noteEn: 'Regular condition: blooms in spring' },
      { ko: '괜찮으면 이걸로 할게요.', zh: '可以的话就用这个吧。', zhEn: 'If possible, use this one.', note: '假设条件：可以的话', noteEn: 'Hypothetical condition: if possible' },
    ],
    toriTip: '🐰 -(으)면 是韩语的"如果"/"当……的时候"，使用频率超高。"돈 많이 벌면 뭐 할 거예요?"（赚了很多钱的话要做什么？）— 学会用 -(으)면，你就能说各种假设和计划了。', toriTipEn: '🐰 -(으)면 is Korean for "if"/"when," and it\'s super common. "돈 많이 벌면 뭐 할 거예요?" (What would you do if you made a lot of money?) — Master -(으)면 and you can talk about all kinds of hypotheticals and plans.',
    similarPatterns: ['-아/어도', '-거든'],
    difference: '-(으)면 是中性条件（如果……就……），-아/어도 是让步条件（即使……也……），语气相反。"비가 오면 안 가요"（如果下雨就不去）vs "비가 와도 가요"（即使下雨也去）。-거든 用于条件后接说明/建议，语气更口语。', differenceEn: '-(으)면 is a neutral condition (if...then), while -아/어도 is a concessive condition (even if...), with opposite nuance. "비가 오면 안 가요" (If it rains, I won\'t go) vs "비가 와도 가요" (Even if it rains, I\'ll go). -거든 is used for conditions followed by explanations/suggestions, and sounds more colloquial.',
  },
  {
    id: 'g29', title: '强原因', titleEn: 'Strong reason', pattern: '-기 때문에 / -때문에',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '연결',
    usage: '表示强烈的因果关系', usageEn: 'Expresses a strong cause-and-effect relationship',
    explanation: '比 -아/어서 更正式、更强烈的因果关系。可以用于书面语和正式场合。名词 + 때문에 表示"因为……"，动词/形容词 + 기 때문에 表示"因为做……"。', explanationEn: 'A more formal and stronger cause-and-effect than -아/어서. Used in writing and formal settings. Noun + 때문에 means "because of...", verb/adjective + 기 때문에 means "because..."',
    conjugation: '名词 + 때문에\n动词/形容词词干 + 기 때문에', conjugationEn: 'Noun + 때문에\\nVerb/adjective stem + 기 때문에',
    examples: [
      { ko: '비 때문에 소풍을 못 갔어요.', zh: '因为下雨不能去郊游。', zhEn: 'We can\'t go on the trip because of the rain.', note: '强原因：名词+때문에', noteEn: 'Strong reason: noun+때문에' },
      { ko: '열심히 공부했기 때문에 합격했어요.', zh: '因为努力学习了所以合格了。', zhEn: 'I passed because I studied hard.', note: '强原因：动词+기 때문에', noteEn: 'Strong reason: verb+기 때문에' },
      { ko: '한국어를 좋아하기 때문에 매일 공부해요.', zh: '因为喜欢韩语所以每天学习。', zhEn: 'I study every day because I like Korean.', note: '强原因：书面强调', noteEn: 'Strong reason: written emphasis' },
    ],
    toriTip: '🐰 때문에 是韩语里的"因为"加强版！比 -아/어서 更有强调感。和朋友抱怨时用"비 때문에"比用"비가 와서"更能表达"都是因为下雨"的语气。名词直接用 때문에，动词用 기 때문에。', toriTipEn: '🐰 때문에 is the "amped-up" version of "because" in Korean! It carries more emphasis than -아/어서. When complaining to friends, "비 때문에" conveys "it\'s all because of the rain" better than "비가 와서." Use 때문에 directly after nouns, and 기 때문에 after verbs.',
    similarPatterns: ['-아서/어서', '-니까'],
    difference: '-기 때문에 最正式、强调性最强，书面语常用；-아서/어서 最自然、口语常用，但不接命令/请诱；-니까 口语、可接命令/请诱，带主观判断语气。同一个意思"因为累"：피곤하기 때문에（书面）/ 피곤해서（日常）/ 피곤하니까（主观强调）。', differenceEn: '-기 때문에 is the most formal and emphatic, common in writing; -아서/어서 is the most natural and colloquial, but can\'t be used with commands/requests; -니까 is colloquial, works with commands/requests, and adds a subjective tone. Same meaning "because I\'m tired": 피곤하기 때문에 (written) / 피곤해서 (everyday) / 피곤하니까 (subjective emphasis).',
  },
  {
    id: 'g30', title: '同时进行', titleEn: 'Simultaneous actions', pattern: '-(으)면서',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '연결',
    usage: '表示两个动作同时进行', usageEn: 'Indicates two actions happening at the same time',
    explanation: '连接两个由同一主语进行的动作，表示"一边……一边……"。前后动作必须是同一主语。', explanationEn: 'Connects two actions done by the same subject, meaning "while doing...". Both actions must share the same subject.',
    conjugation: '无收音/ㄹ + 면서\n有收音 + 으면서', conjugationEn: 'No batchim/ㄹ + 면서\\nWith batchim + 으면서',
    examples: [
      { ko: '음악을 들으면서 공부해요.', zh: '一边听音乐一边学习。', zhEn: 'I study while listening to music.', note: '同时进行：听音乐+学习', noteEn: 'Simultaneous actions: listening to music + studying' },
      { ko: '밥 먹으면서 이야기하지 마세요.', zh: '不要一边吃饭一边说话。', zhEn: 'Don\'t talk while eating.', note: '同时进行：吃饭+说话', noteEn: 'Simultaneous actions: eating + talking' },
      { ko: '일하면서 한국어도 배우고 있어요.', zh: '一边工作一边学韩语。', zhEn: 'Study Korean while working.', note: '同时进行：工作+学习', noteEn: 'Simultaneous actions: working + studying' },
    ],
    toriTip: '🐰 -(으)면서 必须是同一个主语在做两件事！"我"一边听音乐一边学习 ✓。"我吃饭妈妈说话"不能用 -(으)면서 ✗。注意前后动作必须是同一个人做的。', toriTipEn: '🐰 -(으)면서 requires the same subject to do both actions! "I" listen to music and study ✓. "I eat, mom talks" can\'t use -(으)면서 ✗. Note that both actions must be done by the same person.',
    similarPatterns: ['-는 동안'],
    difference: '-(으)면서 要求前后主语相同，强调同时进行；-는 동안 前后主语可以不同，强调某动作持续的时间段内另一事发生。"음악을 들으면서 공부해요"（我一边听音乐一边学习）vs "내가 공부하는 동안 친구는 게임을 해요"（我学习期间朋友在玩游戏，主语不同）。', differenceEn: '-(으)면서 requires the same subject for both actions, emphasizing simultaneity; -는 동안 allows different subjects, emphasizing that one thing happens during the time another action lasts. "음악을 들으면서 공부해요" (I study while listening to music) vs "내가 공부하는 동안 친구는 게임을 해요" (While I study, my friend plays games—different subjects).',
  },
  {
    id: 'g31', title: '推测因果', titleEn: 'Conjectured cause', pattern: '-아/어서 그런지',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '연결',
    usage: '推测因果关系，"可能是因为……"', usageEn: 'Conjectural cause-and-effect, "might be because..."',
    explanation: '表达说话人对某种结果的推测性原因。带有一点不确定的语气。', explanationEn: 'Expresses the speaker\'s conjectural reason for a result. Carries a slightly uncertain tone.',
    conjugation: '词干 + 아/어서 그런지', conjugationEn: 'Stem + 아/어서 그런지',
    examples: [
      { ko: '어제 늦게 자서 그런지 너무 졸려요.', zh: '可能是因为昨晚睡得晚，太困了。', zhEn: 'Maybe because I slept late last night, I\'m so sleepy.', note: '推测因果：可能因为睡晚', noteEn: 'Conjectured cause: maybe because of sleeping late' },
      { ko: '비가 와서 그런지 손님이 별로 없어요.', zh: '可能是因为下雨，没什么客人。', zhEn: 'Maybe because it\'s raining, there aren\'t many customers.', note: '推测因果：可能因为下雨', noteEn: 'Conjectured cause: maybe because of rain' },
      { ko: '많이 먹어서 그런지 배가 좀 불편해요.', zh: '可能是吃多了，肚子有点不舒服。', zhEn: 'Maybe because I ate too much, my stomach feels a bit off.', note: '推测因果：可能吃多了', noteEn: 'Conjectured cause: maybe ate too much' },
    ],
    similarPatterns: ['-아서/어서', '-기 때문에'],
    difference: '-아서 그런지 表示推测性因果（"可能是因为……"，有不确定语气），-아서 和 -기 때문에 表示确定的因果（"因为……"，说话人确信原因）。', differenceEn: '-아서 그런지 indicates conjectural cause ("might be because...", uncertain tone), while -아서 and -기 때문에 indicate definite cause ("because...", the speaker is sure of the reason).',
    toriTip: '🐰 그런지 让"因为"带上了"好像是因为……吧"的不确定语气。韩国人很爱这种委婉表达！"감기 걸려서 그런지 머리가 아파요"（可能是感冒了所以头疼）— 不铁定说死，留有余地。', toriTipEn: '🐰 그런지 adds an uncertain "seems like it\'s because..." tone to "because." Koreans love this euphemistic expression! "감기 걸려서 그런지 머리가 아파요" (Maybe because I caught a cold, my head hurts) — not stating it definitively, leaving room.',
  },
  {
    id: 'g32', title: '让步/即使', titleEn: 'Concession/even if', pattern: '-아/어도',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '연결',
    usage: '表示"即使……也……"', usageEn: 'Means "even if... still..."',
    explanation: '表示让步条件，前面情况发生或不发生，后面的结果都不变。', explanationEn: 'Indicates a concessive condition: whether or not the preceding situation happens, the following result stays the same.',
    conjugation: '词干 + 아/어도', conjugationEn: 'Stem + 아/어도',
    examples: [
      { ko: '아무리 바빠도 밥은 먹어야 해요.', zh: '再忙也要吃饭。', zhEn: 'Even if you\'re busy, you should still eat.', note: '让步：再忙也要吃饭', noteEn: 'Concession: Even if busy, you must eat' },
      { ko: '비가 와도 갈 거예요.', zh: '即使下雨也要去。', zhEn: 'Even if it rains, I\'ll go.', note: '让步：即使下雨也去', noteEn: 'Concession: Go even if it rains' },
      { ko: '늦어도 10시까지는 올게요.', zh: '再晚也会十点前到。', zhEn: 'Even if late, I\'ll arrive before 10.', note: '让步：再晚也会到', noteEn: 'Concession: Arrive even if late' },
    ],
    toriTip: '🐰 "아무리 A해도 B" = 无论多么A也B。"아무리 바빠도"（再忙也）、"아무리 어려워도"（再难也）。韩剧里经常出现的励志句型，搭配 아무리 使用更地道。', toriTipEn: '🐰 "아무리 A해도 B" = No matter how A, B. "아무리 바빠도" (even if busy), "아무리 어려워도" (even if hard). A common motivational pattern in K-dramas; using it with 아무리 sounds more natural.',
    similarPatterns: ['-더라도'],
    difference: '-아/어도 是日常让步（"即使……也"），-더라도 是强调让步（"就算……也"，语气更强、更书面）。口语多用 -아/어도，书面或强调极端假设时用 -더라도。', differenceEn: '-아/어도 is everyday concession ("even if..."), -더라도 is emphatic concession ("even if..." with stronger, more formal tone). Use -아/어도 in speech, -더라도 in writing or for extreme hypotheticals.',
  },
  {
    id: 'g33', title: '强让步', titleEn: 'Strong concession', pattern: '-더라도',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '强调让步，"就算……也……"/"即使……也不……"', usageEn: 'Emphatic concession, "even if..." / "even if... not..."',
    explanation: '比 -아/어도 更强的让步表达。用于强调"即使某个极端情况发生，结果也不会变"。常见于辩论和书面语。', explanationEn: 'A stronger concession than -아/어도. Used to emphasize that even if an extreme situation occurs, the result won\'t change. Common in debates and formal writing.',
    conjugation: '词干 + 더라도', conjugationEn: 'Stem + 더라도',
    examples: [
      { ko: '아무리 힘들더라도 포기하지 않을 거예요.', zh: '再难也不会放弃。', zhEn: 'Even if it\'s hard, I won\'t give up.', note: '强让步：再难也不放弃', noteEn: 'Strong concession: Won\'t give up even if hard' },
      { ko: '결과가 좋지 않더라도 최선을 다하겠습니다.', zh: '结果不好也会尽最大努力。', zhEn: 'Even if the result is bad, I\'ll do my best.', note: '强让步：结果不好也努力', noteEn: 'Strong concession: Try even if result is bad' },
      { ko: '거짓말을 했더라도 용서해 주세요.', zh: '就算撒了谎也请原谅我。', zhEn: 'Even if I lied, please forgive me.', note: '强让步：就算撒谎也原谅', noteEn: 'Strong concession: Forgive even if lied' },
    ],
    toriTip: '🐰 -더라도 是 -아/어도 的强势版本！用在表决心、承诺的场合。日常口语用 -아/어도 足够，正式场合或要强调时用 -더라도。"죽더라도 못 해"（死也做不到）= 打死我也不行。', toriTipEn: '🐰 -더라도 is the stronger version of -아/어도! Use it for resolutions and promises. In everyday speech, -아/어도 is enough; use -더라도 in formal settings or for emphasis. "죽더라도 못 해" (can\'t do even if I die) = I absolutely can\'t.',
    similarPatterns: ['-아/어도'],
    difference: '-더라도 比 -아/어도 语气更强，强调"即使极端情况发生也不会变"，多用于正式场合、书面语或强调决心；-아/어도 是日常让步表达，语气较轻。"비가 와도 가요"（下雨也去，日常）vs "비가 오더라도 반드시 가겠습니다"（即使下雨也一定去，强调决心）。', differenceEn: '-더라도 is stronger than -아/어도, emphasizing that even extreme situations won\'t change the outcome; used in formal settings, writing, or for strong resolve. -아/어도 is everyday concession with a lighter tone. "비가 와도 가요" (go even if it rains, casual) vs "비가 오더라도 반드시 가겠습니다" (will definitely go even if it rains, emphatic).',
  },
  {
    id: 'g34', title: '取舍否定', titleEn: 'Trade-off negation', pattern: '-느니',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"与其……不如……"', usageEn: 'Means "rather than... better to..."',
    explanation: '前句提出一个不太好的选择，后句提出更好的替代。"与其做A不如做B"。常与 차라리（干脆）搭配使用。', explanationEn: 'The first clause offers a poor option, the second a better alternative. "Rather than A, better to B." Often used with 차라리 (rather).',
    conjugation: '动词词干 + 느니', conjugationEn: 'Verb stem + 느니',
    examples: [
      { ko: '이런 걸 먹느니 차라리 굶겠어요.', zh: '与其吃这个，不如饿着。', zhEn: 'Rather than eat this, I\'d rather starve.', note: '取舍：与其吃宁可饿', noteEn: 'Trade-off: Rather than eat, starve' },
      { ko: '여기서 기다리느니 집에 가는 게 나아요.', zh: '与其在这里等，不如回家。', zhEn: 'Rather than wait here, I\'d rather go home.', note: '取舍：与其等不如回家', noteEn: 'Rather than wait, just go home' },
      { ko: '버스를 타느니 걸어가는 게 빨라요.', zh: '与其坐公交，走路更快。', zhEn: 'Walking is faster than taking the bus.', note: '取舍：与其坐车不如走', noteEn: 'Rather than ride, just walk' },
    ],
    toriTip: '🐰 -느니 是表达"宁可……也不……"的高级语法。核心结构：A느니 (차라리) B = 与其A不如B。搭配 차라리（干脆）使用更有力量感。日常吐槽时偶尔用一次很惊艳。', toriTipEn: '🐰 -느니 is an advanced grammar for expressing "would rather... than...". Core structure: A느니 (차라리) B = rather than A, better to B. Pairing it with 차라리 (just) adds punch. Using it occasionally in everyday complaints is striking.',
    similarPatterns: ['-는 것보다'],
    difference: '-느니 强调排斥前项、选择后项的取舍（"与其A不如B"，A是不情愿的选项），-는 것보다 是中性比较（"比起A，B更好"，没有强烈排斥感）。"택시를 타느니 걷겠어"（与其坐出租车不如走）vs "택시보다 걷는 게 더 좋아요"（比起坐出租车更喜欢走路）。', differenceEn: '-느니 emphasizes rejecting A and choosing B ("rather than A, B"; A is an unwilling option), while -는 것보다 is a neutral comparison ("compared to A, B is better"; no strong rejection). "택시를 타느니 걷겠어" (rather than take a taxi, I\'d walk) vs "택시보다 걷는 게 더 좋아요" (compared to a taxi, I prefer walking).',
  },
  {
    id: 'g35', title: '递进变化', titleEn: 'Progressive change', pattern: '-ㄹ/을수록',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"越……越……"', usageEn: 'Means "the more... the more..."',
    explanation: '表达两个变化成正比的递进关系。常与 -면 搭配使用形成 -(으)면 -(으)ㄹ수록 的强调形式。', explanationEn: 'Expresses a proportional progression between two changes. Often paired with -면 to form the emphatic -(으)면 -(으)ㄹ수록 pattern.',
    conjugation: '无收音 + ㄹ수록\n有收音 + 을수록', conjugationEn: 'No final consonant + ㄹ수록\\nWith final consonant + 을수록',
    examples: [
      { ko: '갈수록 어려워져요.', zh: '越往后越难。', zhEn: 'The further you go, the harder it gets.', note: '递进：越往后越难', noteEn: 'Progression: the further, the harder' },
      { ko: '생각할수록 화가 나요.', zh: '越想越生气。', zhEn: 'The more I think about it, the angrier I get.', note: '递进：越想越生气', noteEn: 'Progression: the more I think, the angrier' },
      { ko: '보면 볼수록 매력 있어요.', zh: '越看越有魅力。', zhEn: 'The more you look, the more charming it is.', note: '递进：越看越有魅力', noteEn: 'Progression: the more you look, the more charming' },
    ],
    toriTip: '🐰 -ㄹ수록 叠加使用才地道！"-(으)면 -(으)ㄹ수록" = 越……越……。"보면 볼수록"（越看越）、"먹으면 먹을수록"（越吃越）、"생각하면 생각할수록"（越想越）— 用这个句型表达强烈感受。', toriTipEn: '🐰 -ㄹ수록 is most natural when stacked! "-(으)면 -(으)ㄹ수록" = the more... the more... "보면 볼수록" (the more you look), "먹으면 먹을수록" (the more you eat), "생각하면 생각할수록" (the more you think) — use this pattern for strong feelings.',
    similarPatterns: ['-아/어지다', '-게 되다'],
    difference: '-ㄹ수록 单独使用时表示"随着程度增加……"（"갈수록 어려워요"越往后越难），与 -(으)면 搭配成"-(으)면 -(으)ㄹ수록"时递进感更强（"보면 볼수록"越看越……）。-아/어지다 表示状态渐变（"좋아져요"变好了），-게 되다 强调达成结果（"알게 됐어요"终于知道了），三者都可表达变化，但侧重不同。', differenceEn: '-ㄹ수록 alone means "as the degree increases..." ("갈수록 어려워요" the further, the harder), and with -(으)면 as "-(으)면 -(으)ㄹ수록" the progression is stronger ("보면 볼수록" the more you look...). -아/어지다 indicates gradual state change ("좋아져요" got better), -게 되다 emphasizes reaching a result ("알게 됐어요" finally came to know). All three express change but with different focuses.',
  },
  {
    id: 'g36', title: '观察因果', titleEn: 'Observed cause', pattern: '-길래',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"因为看到/发现……所以……"，口语色彩浓', usageEn: 'Means "because I saw/found... so...", very colloquial',
    explanation: '用于口语中，表达"因为发现/看到/觉得……所以做了……"。说话人以自己观察到的情况为根据做某事。主语通常是第一人称。', explanationEn: 'Used in speech to express "because I noticed/saw/felt... I did...". The speaker acts based on what they observed. The subject is usually first person.',
    conjugation: '词干 + 길래', conjugationEn: 'Stem + 길래',
    examples: [
      { ko: '맛있어 보이길래 하나 샀어요.', zh: '看着好吃就买了一个。', zhEn: 'It looked tasty, so I bought one.', note: '观察因果：看着好吃就买', noteEn: 'Observed cause: looked tasty, so bought' },
      { ko: '친구가 슬퍼 보이길래 위로해 줬어요.', zh: '朋友看起来很伤心就安慰了一下。', zhEn: 'My friend looked sad, so I comforted them a bit.', note: '观察因果：看起来伤心就安慰', noteEn: 'Observed cause: looked sad, so comforted' },
      { ko: '날씨가 좋길래 산책 나왔어요.', zh: '天气好就出来散步了。', zhEn: 'The weather was nice, so I went out for a walk.', note: '观察因果：天气好就散步', noteEn: 'Observing cause and effect: nice weather → walk' },
    ],
    toriTip: '🐰 -길래 是口语中表达"看到……所以……"的超自然表达。主语一般是"我"，因为"我看到了/感觉到了所以做了某事"。韩国人日常说话超爱用。"배 고파 보이길래 김밥 사줬어"（看你饿了就给你买了紫菜包饭）。', toriTipEn: '🐰 -길래 is a super natural spoken expression meaning "seeing... so...". The subject is usually "I" because "I saw/felt something, so I did something." Koreans love using it in everyday speech. "배 고파 보이길래 김밥 사줬어" (I saw you looked hungry, so I bought you gimbap).',
    similarPatterns: ['-아서/어서', '-니까'],
    difference: '-길래 是说话人观察到某情况后做出反应（强调亲眼所见/亲身感受，主语通常是第一人称），-아서/어서 是客观因果，-니까 是主观判断原因。"맛있어 보이길래 샀어요"（看起来好吃所以买了，强调视觉判断）vs "맛있어서 샀어요"（因为好吃所以买了，客观原因）。', differenceEn: '-길래 is used when the speaker reacts after observing a situation (emphasizing what was seen/felt firsthand, usually first-person subject), -아서/어서 is objective cause-and-effect, and -니까 is subjective reasoning. "맛있어 보이길래 샀어요" (It looked delicious, so I bought it — emphasizes visual judgment) vs "맛있어서 샀어요" (It was delicious, so I bought it — objective reason).',
  },
  {
    id: 'g37', title: '程度强调', titleEn: 'Degree emphasis', pattern: '-ㄹ/을 정도로',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '연결',
    usage: '表示"到了……的程度"', usageEn: 'Indicates "to the point of..."',
    explanation: '强调某种情况达到了相当高的程度。可以用来夸张或强调。', explanationEn: 'Emphasizes that a situation has reached a fairly high degree. Can be used for exaggeration or emphasis.',
    conjugation: '无收音 + ㄹ 정도로\n有收音 + 을 정도로', conjugationEn: 'No batchim + ㄹ 정도로\\nBatchim + 을 정도로',
    examples: [
      { ko: '다리가 아플 정도로 많이 걸었어요.', zh: '走了很多路，腿都疼了。', zhEn: 'I walked so much that my legs hurt.', note: '程度：走到腿疼的程度', noteEn: 'Degree: to the point of leg pain' },
      { ko: '눈물이 날 정도로 감동했어요.', zh: '感动得眼泪都出来了。', zhEn: 'I was so moved that tears came out.', note: '程度：感动到要流泪', noteEn: 'Degree: moved to tears' },
      { ko: '이해할 수 없을 정도로 어려운 문제예요.', zh: '难到无法理解的程度。', zhEn: 'It\'s so hard that it\'s beyond understanding.', note: '程度：难到无法理解', noteEn: 'Degree: too hard to understand' },
    ],
    toriTip: '🐰 -ㄹ 정도로 是韩语的"到了……的程度"。夸张表达的神器！"죽을 정도로 힘들어"（累到要死的程度）、"말로 표현할 수 없을 정도로 예뻐"（漂亮到无法用语言形容）。韩国人很爱这个夸张句型。', toriTipEn: '🐰 -ㄹ 정도로 is Korean for "to the point of...". The ultimate exaggeration tool! "죽을 정도로 힘들어" (so tired I could die), "말로 표현할 수 없을 정도로 예뻐" (so pretty words can\'t describe it). Koreans love this dramatic pattern.',
    similarPatterns: ['-만큼'],
    difference: '-ㄹ 정도로 强调程度极端、接近极限（"到了……的程度"，常含夸张），-만큼 是比较程度相当（"和……一样程度"，不含夸张）。"울 정도로 감동했어요"（感动到要哭的程度）vs "그만큼 감동했어요"（那么程度地感动了）。', differenceEn: '-ㄹ 정도로 emphasizes an extreme degree close to the limit ("to the point of...", often with exaggeration), while -만큼 compares equal degrees ("to the same extent as...", no exaggeration). "울 정도로 감동했어요" (moved to the point of crying) vs "그만큼 감동했어요" (moved to that extent).',
  },
  {
    id: 'g38', title: '递进补充', titleEn: 'Progressive addition', pattern: '-(으)ㄹ 뿐만 아니라',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"不仅……而且……"', usageEn: 'Indicates "not only... but also..."',
    explanation: '用于补充说明，连接两个都成立的条件或事实。A不仅成立，B也成立。是书面语中的常用递进结构。', explanationEn: 'Used to add supplementary information, connecting two conditions or facts that both hold true. Not only A is true, but B is also true. A common progressive structure in written language.',
    conjugation: '无收音 + ㄹ 뿐만 아니라\n有收音 + 을 뿐만 아니라\n名词 + 일 뿐만 아니라', conjugationEn: 'No batchim + ㄹ 뿐만 아니라\\nBatchim + 을 뿐만 아니라\\nNoun + 일 뿐만 아니라',
    examples: [
      { ko: '그 가수는 노래를 잘할 뿐만 아니라 춤도 잘 춰요.', zh: '那位歌手不仅歌唱得好，舞也跳得好。', zhEn: 'That singer not only sings well, but also dances well.', note: '递进：不仅唱好舞也好', noteEn: 'Progressive: not only sings well, dances well too' },
      { ko: '한국어는 재미있을 뿐만 아니라 배울수록 매력적이에요.', zh: '韩语不仅有趣，而且越学越有魅力。', zhEn: 'Korean is not only interesting, but the more you learn it, the more charming it becomes.', note: '递进：不仅有趣还越来越好', noteEn: 'Progressive: not only interesting, gets better and better' },
      { ko: '이 호텔은 시설이 좋을 뿐만 아니라 서비스도 훌륭해요.', zh: '这家酒店不仅设施好，服务也很棒。', zhEn: 'This hotel has great facilities, and the service is excellent too.', note: '递进：不仅设施好服务也棒', noteEn: 'Progression: Not only are the facilities good, the service is great too.' },
    ],
    toriTip: '🐰 -ㄹ 뿐만 아니라 = 不仅……而且……。这个句型特别适合用在写作和正式表达中。口语里可以改用 -고 或 -(으)ㄴ데 会更自然，但在 TOPIK 写作中用它加分！', toriTipEn: '🐰 -ㄹ 뿐만 아니라 = not only... but also... This pattern is great for writing and formal expressions. In speech, -고 or -(으)ㄴ데 sounds more natural, but using it in TOPIK writing earns you points!',
    similarPatterns: ['-고도'],
    difference: '-(으)ㄹ 뿐만 아니라 是书面/正式的"不仅A而且B"，强调递进补充；-고도 是"做了A还B"，更口语，带轻微意外/让步感。"노래를 잘할 뿐만 아니라 춤도 잘 춰요"（书面）vs "노래를 잘하고도 춤까지 잘 춰요"（唱歌好，还连舞也跳得好，口语）。', differenceEn: '-(으)ㄹ 뿐만 아니라 is the formal/written "not only A but also B," emphasizing progressive addition; -고도 means "did A and also B," more colloquial, with a slight sense of surprise/concession. "노래를 잘할 뿐만 아니라 춤도 잘 춰요" (written) vs "노래를 잘하고도 춤까지 잘 춰요" (sings well and even dances well too, colloquial).',
  },
  {
    id: 'g39', title: '即刻先后', titleEn: 'Immediate sequence', pattern: '-자마자',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"一……就马上……"', usageEn: 'Means "as soon as... immediately..."',
    explanation: '强调前后两个动作几乎同时发生，间隔极短。', explanationEn: 'Emphasizes that two actions happen almost simultaneously with very little gap.',
    conjugation: '动词词干 + 자마자', conjugationEn: 'Verb stem + 자마자',
    examples: [
      { ko: '집에 오자마자 잤어요.', zh: '一到家就睡了。', zhEn: 'I fell asleep as soon as I got home.', note: '即刻：一到家就睡', noteEn: 'Immediate: Sleep as soon as you get home' },
      { ko: '전화를 받자마자 나갔어요.', zh: '一接电话就出去了。', zhEn: 'He went out as soon as he answered the phone.', note: '即刻：一接电话就出去', noteEn: 'Immediate: Go out as soon as you answer the phone' },
      { ko: '봄이 되자마자 꽃이 피기 시작했어요.', zh: '一到春天花就开始开了。', zhEn: 'Flowers start blooming as soon as spring comes.', note: '即刻：一到春天就开花', noteEn: 'Immediate: Bloom as soon as spring arrives' },
    ],
    toriTip: '🐰 -자마자 = 一……就马上……。强调几乎没有时间间隔！"집에 도착하자마자 전화해"（一到家就给我打电话）— 比 -고 나서 更强调"立刻"。和中文"一……就……"结构一模一样，特别好记。', toriTipEn: '🐰 -자마자 = as soon as... immediately... Emphasizes almost no time gap! "집에 도착하자마자 전화해" (call me as soon as you get home) — emphasizes "right away" more than -고 나서. It matches the Chinese "一...就..." structure perfectly, so it\'s easy to remember.',
    similarPatterns: ['-고 나서'],
    difference: '-자마자 强调前后动作几乎同时发生，间隔极短（"一……就马上……"）；-고 나서 只表示完成前者后再做后者，没有"立刻"的含义。"집에 오자마자 잤어요"（一到家就立刻睡了）vs "집에 오고 나서 잤어요"（回家之后睡了，没有立刻的含义）。', differenceEn: '-자마자 emphasizes that two actions happen almost simultaneously with a very short gap ("as soon as... immediately..."); -고 나서 only means doing the latter after completing the former, without the "immediately" nuance. "집에 오자마자 잤어요" (I slept as soon as I got home) vs "집에 오고 나서 잤어요" (I slept after coming home, no immediate nuance).',
  },
  {
    id: 'g40', title: '选择连接', titleEn: 'Choice connection', pattern: '-거나',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '연결',
    usage: '表示"或者"，在两个或多个动作/状态中选择', usageEn: 'Means "or," choosing between two or more actions/states',
    explanation: '用于连接两个动词或形容词，表示"或"的意思。可以与名词的"或"形式 -(이)나 对比学习。', explanationEn: 'Used to connect two verbs or adjectives, meaning "or." Can be compared with the noun form -(이)나.',
    conjugation: '动词/形容词词干 + 거나', conjugationEn: 'Verb/adjective stem + 거나',
    examples: [
      { ko: '주말에는 보통 책을 읽거나 운동을 해요.', zh: '周末通常读书或者运动。', zhEn: 'On weekends I usually read or exercise.', note: '选择：读书或运动', noteEn: 'Choice: Read or exercise' },
      { ko: '심심하거나 힘들 때 음악을 들어요.', zh: '无聊或者累的时候听音乐。', zhEn: 'I listen to music when I\'m bored or tired.', note: '选择：无聊或累时', noteEn: 'Choice: When bored or tired' },
      { ko: '아침에는 빵을 먹거나 죽을 먹어요.', zh: '早上吃面包或者喝粥。', zhEn: 'In the morning I eat bread or have porridge.', note: '选择：吃面包或喝粥', noteEn: 'Choose: eat bread or drink porridge' },
    ],
    toriTip: '🐰 -거나 连接动词/形容词表示"或"。注意：名词的"或"用 -(이)나（如 커피나 차 = 咖啡或茶），动词/形容词的"或"用 -거나（如 먹거나 마시다 = 吃或喝）。', toriTipEn: '🐰 -거나 connects verbs/adjectives to mean "or." Note: for nouns, use -(이)나 (e.g., 커피나 차 = coffee or tea); for verbs/adjectives, use -거나 (e.g., 먹거나 마시다 = eat or drink).',
    similarPatterns: ['-(이)나'],
    difference: '-거나 连接动词/形容词（"책을 읽거나 음악을 들어요"读书或听音乐），-(이)나 连接名词（"커피나 차를 마셔요"喝咖啡或茶）。功能相同但接续对象不同，不可混用。', differenceEn: '-거나 connects verbs/adjectives (e.g., "책을 읽거나 음악을 들어요" = read a book or listen to music), while -(이)나 connects nouns (e.g., "커피나 차를 마셔요" = drink coffee or tea). They serve the same function but attach to different parts of speech—don\'t mix them up.',
  },
  {
    id: 'g41', title: '中途转换', titleEn: 'Mid-action switch', pattern: '-다가',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '연결',
    usage: '表示动作进行中转而做另一件事', usageEn: 'Indicates switching to another action while one is in progress',
    explanation: '表示正在做A的时候停下来转而做B，或持续做A的过程中发生了B的情况。是口语中非常高频的连接语尾。', explanationEn: 'Indicates stopping action A to do action B, or B happening while A continues. A very common connective ending in spoken Korean.',
    conjugation: '动词词干 + 다가', conjugationEn: 'Verb stem + 다가',
    examples: [
      { ko: '공부하다가 잠들었어요.', zh: '学习着学习着睡着了。', zhEn: 'I fell asleep while studying.', note: '中途转换：学着睡着了', noteEn: 'Mid-action switch: fell asleep while studying' },
      { ko: '집에 가다가 친구를 만났어요.', zh: '回家路上遇见了朋友。', zhEn: 'I ran into a friend on the way home.', note: '中途转换：回家途中遇友', noteEn: 'Mid-action switch: met a friend on the way home' },
      { ko: '밥을 먹다가 전화를 받았어요.', zh: '吃饭吃到一半接了电话。', zhEn: 'I answered the phone in the middle of eating.', note: '中途转换：吃饭时接电话', noteEn: 'Mid-action switch: took a call while eating' },
    ],
    toriTip: '🐰 -다가 是口语中的高频连接词！表示"正做A的过程中，转而做B/发生了B"。韩国人日常对话离不开它。"가다가"（走着走着）、"보다가"（看着看着）、"먹다가"（吃着吃着）— 都是真实的生活场景。', toriTipEn: '🐰 -다가 is a super common connective in spoken Korean! It means "while doing A, switch to B / B happens." Koreans use it all the time in daily conversation. "가다가" (walking along), "보다가" (watching), "먹다가" (eating)—all real-life situations.',
    similarPatterns: ['-고 나서', '-는 동안'],
    difference: '-다가 强调"中途转换/中断"（做A做到一半，转向B）；-고 나서 强调"完成A后再做B"（A做完了才开始B）；-는 동안 强调"A进行期间B同时发生"（两件事并行）。', differenceEn: '-다가 emphasizes a mid-action switch/interruption (doing A halfway, then turning to B); -고 나서 emphasizes completing A before doing B (finish A, then start B); -는 동안 emphasizes B happening simultaneously during A (two actions in parallel).',
  },
  {
    id: 'g42', title: '之前', titleEn: 'before', pattern: '-기 전에',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '연결',
    usage: '表示"在……之前"', usageEn: 'Means "before..."',
    explanation: '将动词名词化后连接 전에（之前），表示在一个动作发生之前做另一个动作。日常使用频率很高。', explanationEn: 'After nominalizing a verb, attach 전에 (before) to express doing one action before another. Very common in everyday speech.',
    conjugation: '动词词干 + 기 전에', conjugationEn: 'Verb stem + 기 전에',
    examples: [
      { ko: '밥 먹기 전에 손 씻으세요.', zh: '吃饭前请洗手。', zhEn: 'Please wash your hands before eating.', note: '之前：吃饭前洗手', noteEn: 'Before: wash hands before eating' },
      { ko: '자기 전에 책을 읽어요.', zh: '睡觉前读书。', zhEn: 'I read before sleeping.', note: '之前：睡觉前读书', noteEn: 'Before: read before sleeping' },
      { ko: '한국에 오기 전에 한국어를 공부했어요.', zh: '来韩国之前学了韩语。', zhEn: 'I studied Korean before coming to Korea.', note: '之前：来韩前学语言', noteEn: 'Before: studied language before coming to Korea' },
    ],
    similarPatterns: ['-(으)ㄴ 후에'],
    difference: '-기 전에 是"在……之前"，-(으)ㄴ 후에 是"在……之后"。前者用 -기 名词化，后者用 -(으)ㄴ 冠形词形，接续方式不同。', differenceEn: '-기 전에 means "before..." and -(으)ㄴ 후에 means "after..." The former uses -기 to nominalize, the latter uses the -(으)ㄴ adnominal form—they attach differently.',
    toriTip: '🐰 记住这组反义词：吃饭前洗手 = "밥 먹기 전에 손 씻어요"，吃饭后刷牙 = "밥 먹은 후에 양치해요"。기 전에 ← 之前，은 후에 ← 之后。', toriTipEn: '🐰 Remember this antonym pair: wash hands before eating = "밥 먹기 전에 손 씻어요", brush teeth after eating = "밥 먹은 후에 양치해요". 기 전에 ← before, 은 후에 ← after.',
  },
  {
    id: 'g43', title: '之后', titleEn: 'after', pattern: '-(으)ㄴ 후에',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '연결',
    usage: '表示"在……之后"', usageEn: 'means "after"',
    explanation: '将动词变为冠形词形式后连接 후에（之后），表示一个动作完成后再做另一个动作。', explanationEn: 'After changing the verb into an adnominal form, attach 후에 (after) to indicate that one action is completed before another action begins.',
    conjugation: '动词词干 + (으)ㄴ 후에\n无收音/ㄹ + ㄴ 후에\n有收音 + 은 후에', conjugationEn: 'Verb stem + (으)ㄴ 후에\\nNo batchim/ㄹ + ㄴ 후에\\nWith batchim + 은 후에',
    examples: [
      { ko: '수업이 끝난 후에 만나요.', zh: '下课后见面。', zhEn: 'Let\'s meet after class.', note: '之后：下课后见面', noteEn: 'After: meet after class' },
      { ko: '밥을 먹은 후에 약을 드세요.', zh: '饭后请吃药。', zhEn: 'Please take medicine after meals.', note: '之后：饭后吃药', noteEn: 'After: take medicine after meals' },
      { ko: '대학교를 졸업한 후에 유학을 갈 거예요.', zh: '大学毕业后去留学。', zhEn: 'I\'ll study abroad after graduating from university.', note: '之后：毕业后留学', noteEn: 'After: study abroad after graduation' },
    ],
    similarPatterns: ['-기 전에'],
    difference: '-(으)ㄴ 후에 是"在……之后"，-기 전에 是"在……之前"。注意 후에 前用冠形词形 -(으)ㄴ，전에 前用名词化 -기，接续方式完全不同。', differenceEn: '-(으)ㄴ 후에 means "after", -기 전에 means "before". Note that 후에 takes the adnominal form -(으)ㄴ, while 전에 takes the nominalized form -기 — the connecting patterns are completely different.',
    toriTip: '🐰 最简单的记忆：후 = 后，전 = 前。밥 먹은 후에 = 吃完饭之后，밥 먹기 전에 = 吃饭之前。记住了 후/전 这两个汉字词就永远不会搞混！', toriTipEn: '🐰 Easiest way to remember: 후 = after, 전 = before. 밥 먹은 후에 = after eating, 밥 먹기 전에 = before eating. Once you remember these two Sino-Korean words, you\'ll never mix them up!',
  },
  {
    id: 'g44', title: '期间', titleEn: 'Period', pattern: '-는 동안',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '연결',
    usage: '表示"在……期间"、"在……的同时"', usageEn: 'means "during" or "while"',
    explanation: '表示某个动作或状态持续的时间段内，发生了另一件事。前后动作的主语可以不同。', explanationEn: 'Indicates that another event occurs during the time period when an action or state continues. The subjects of the two actions can be different.',
    conjugation: '动词词干 + 는 동안\n名词 + 동안', conjugationEn: 'Verb stem + 는 동안\\nNoun + 동안',
    examples: [
      { ko: '제가 없는 동안 잘 지냈어요?', zh: '我不在的时候过得好吗？', zhEn: 'Did you do well while I was away?', note: '期间：我不在的那段时间', noteEn: 'During: the time I was away' },
      { ko: '비행기를 기다리는 동안 책을 읽었어요.', zh: '等飞机的时候读了书。', zhEn: 'I read a book while waiting for the plane.', note: '期间：等飞机时读书', noteEn: 'During: read while waiting for the plane' },
      { ko: '방학 동안 한국어를 배웠어요.', zh: '放假期间学了韩语。', zhEn: 'I studied Korean during the vacation.', note: '期间：假期期间学韩语', noteEn: 'During: study Korean during vacation' },
    ],
    toriTip: '🐰 -는 동안 = "在……的期间"。前面主语和后面主语可以不同，这点和 -(으)면서 不一样！"내가 자는 동안 엄마가 청소했어"（我睡觉期间妈妈打扫了）— 两个人做不同的事也可以用 동안。', toriTipEn: '🐰 -는 동안 = "during". The subject before and after can be different, unlike -(으)면서! "내가 자는 동안 엄마가 청소했어" (Mom cleaned while I was sleeping) — two people doing different things is fine with 동안.',
    similarPatterns: ['-(으)면서'],
    difference: '-는 동안 前后主语可以不同（A做某事的期间，B做另一件事）；-(으)면서 要求前后主语相同（同一个人同时做两件事）。"내가 자는 동안 엄마가 청소했어"（동안✓）但不能用 면서（주어가 달라서）。', differenceEn: '-는 동안 allows different subjects before and after (while A does something, B does another); -(으)면서 requires the same subject (one person doing two things simultaneously). "내가 자는 동안 엄마가 청소했어" (동안✓) but 면서 is not possible (because the subjects differ).',
  },
  {
    id: 'g45', title: '比喻/类似', titleEn: 'metaphor/similar', pattern: '-듯이 / -는 듯이',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"好像……一样"、"仿佛……"', usageEn: 'Means "as if..." / "as though..."',
    explanation: '用于比喻或类比，表示某一行为或状态与另一情况相似。可以搭配 마치（好像）使用。', explanationEn: 'Used for metaphors or comparisons, indicating that an action or state is similar to another situation. Can be used with 마치 (as if).',
    conjugation: '动词词干 + 는 듯이\n形容词词干 + (으)ㄴ 듯이\n过去 + 았/었듯이', conjugationEn: 'Verb stem + 는 듯이\\nAdjective stem + (으)ㄴ 듯이\\nPast + 았/었듯이',
    examples: [
      { ko: '아는 듯이 말하지 마세요.', zh: '不要装作知道的样子说话。', zhEn: 'Don\'t talk as if you know.', note: '比喻：装作知道的样子', noteEn: 'Metaphor: acting like you know' },
      { ko: '물이 쏟아지듯이 비가 와요.', zh: '雨像泼水一样下着。', zhEn: 'It\'s raining as if pouring water.', note: '比喻：雨像泼水一样', noteEn: 'Metaphor: rain like pouring water' },
      { ko: '그는 마치 모든 것을 다 안다는 듯이 행동해요.', zh: '他表现得好像什么都知道似的。', zhEn: 'He acts as if he knows everything.', note: '比喻：好像什么都知道', noteEn: 'Metaphor: as if knowing everything' },
    ],
    toriTip: '🐰 -듯이 描绘"好像……一样"的画面感。搭配 마치（仿佛/好像）使用更完整。"마치 꿈인 듯이"（像做梦一样）— 韩剧和韩语歌词里的高频表达。', toriTipEn: '🐰 -듯이 paints the picture of "as if...". Pair it with 마치 (as if) for a fuller effect. "마치 꿈인 듯이" (like a dream) — a high-frequency expression in K-dramas and Korean lyrics.',
    similarPatterns: ['-처럼'],
    difference: '-듯이 多用于动词性比喻（"물이 쏟아지듯이"像水泼出来一样），-(으)ㄴ/는 것처럼 更通用，名词/动词/形容词都能接（"어린아이처럼"像小孩一样）。口语中 -처럼 更常用，-듯이 语感更文学化。', differenceEn: '-듯이 is mostly used for verb-based metaphors ("물이 쏟아지듯이" like water pouring out), while -(으)ㄴ/는 것처럼 is more general and can attach to nouns, verbs, and adjectives ("어린아이처럼" like a child). In speech, -처럼 is more common; -듯이 feels more literary.',
  },
  {
    id: 'g46', title: '反事实假设', titleEn: 'Counterfactual Hypothesis', pattern: '-았/었/였더라면',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '연결',
    usage: '表示"如果当初……了的话（会怎样）"', usageEn: 'Means "if only... had (done something)"',
    explanation: '对已经发生且无法改变的事情做反事实假设。"如果那时……的话……"的遗憾或假设语气。常与"았/었/였을 거예요"或"았/었/였을 텐데"搭配。', explanationEn: 'A counterfactual assumption about something that already happened and can\'t be changed. Conveys regret or hypothetical "if only... then..." tone. Often paired with "았/었/였을 거예요" or "았/었/였을 텐데".',
    conjugation: '词干 + 았/었/였더라면', conjugationEn: 'Stem + 았/었/였더라면',
    examples: [
      { ko: '조금만 더 일찍 출발했더라면 늦지 않았을 거예요.', zh: '要是再早一点出发的话就不会迟到了。', zhEn: 'If I had left a bit earlier, I wouldn\'t have been late.', note: '反事实：早出发就不迟到', noteEn: 'Counterfactual: leaving early = not late' },
      { ko: '그때 그 말을 안 했더라면 좋았을 텐데...', zh: '当时要是没说过那句话就好了……', zhEn: 'I wish I hadn\'t said that back then...', note: '反事实：没说那话就好了', noteEn: 'Counterfactual: not saying that would\'ve been better' },
      { ko: '열심히 공부했더라면 합격했을 거예요.', zh: '要是当时努力学习了的话就会合格的。', zhEn: 'If I had studied hard back then, I would have passed.', note: '反事实：努力了就合格了', noteEn: 'Counterfactual: studying = passing' },
    ],
    toriTip: '🐰 -았/었더라면 是韩语的"如果当初……就好了"。表达后悔、遗憾的神器。常和 -았/었을 거예요（会……的）或 -았/었을 텐데（应该会……可惜）搭配。韩剧里后悔场景的标配语法。', toriTipEn: '🐰 -았/었더라면 is Korean for "if only I had...". The go-to grammar for regret and remorse. Often paired with -았/었을 거예요 (would have...) or -았/었을 텐데 (would have... too bad). Standard grammar for regret scenes in K-dramas.',
    similarPatterns: ['-(으)면'],
    difference: '-았/었더라면 是反事实假设（对已发生的事做假设，现实中没成真，常含遗憾），-(으)면 是一般条件假设（对未来或不确定情况，中性）。"열심히 공부했더라면 합격했을 거예요"（如果当时用功了就合格了，但实际没用功）vs "열심히 공부하면 합격할 거예요"（如果用功的话会合格，面向未来）。', differenceEn: '-았/었더라면 is a counterfactual (hypothesizing about what already happened, not true in reality, often with regret), while -(으)면 is a general conditional (about future or uncertain situations, neutral). "열심히 공부했더라면 합격했을 거예요" (If I had studied hard, I would have passed — but I didn\'t) vs "열심히 공부하면 합격할 거예요" (If I study hard, I\'ll pass — future-oriented).',
  },

  // =====================================================================
  //  CATEGORY: 시제 (Tense / 时制)
  // =====================================================================

  {
    id: 'g47', title: '过去时', titleEn: 'Past tense', pattern: '-았/었/였-',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '시제',
    usage: '表示过去发生的动作或状态', usageEn: 'Indicates a past action or state',
    explanation: '韩语的过去时由词干 + 았/었/였 构成。这是韩语最基本的时态表达之一。', explanationEn: 'Korean past tense is formed with stem + 았/었/였. This is one of the most basic tense expressions in Korean.',
    conjugation: '词干元音 ㅏ/ㅗ → 았어요\n其他 → 었어요\n하 → 했어요 (하였어요)', conjugationEn: 'Stem vowel ㅏ/ㅗ → 았어요\\nOthers → 었어요\\n하 → 했어요 (하였어요)',
    examples: [
      { ko: '어제 뭐 했어요?', zh: '昨天做了什么？', zhEn: 'What did you do yesterday?', note: '疑问：问昨天做什么', noteEn: 'Question: asking what was done yesterday' },
      { ko: '점심에 비빔밥을 먹었어요.', zh: '中午吃了拌饭。', zhEn: 'I had bibimbap for lunch.', note: '过去时：已完成动作', noteEn: 'Past tense: completed action' },
      { ko: '주말에 친구를 만났어요.', zh: '周末见了朋友。', zhEn: 'I met a friend over the weekend.', note: '过去时：见了朋友', noteEn: 'Past tense: met a friend' },
    ],
    toriTip: '🐰 判断 았/었 的秘诀：看词干最后一个元音！ㅏ/ㅗ → 았다 (갔다, 좋았다)，其他 → 었다 (먹었다, 읽었다)。하다 永远变 했다！背下这三条规则，过去时零失误。', toriTipEn: '🐰 The trick to choosing 았/었: look at the last vowel of the stem! ㅏ/ㅗ → 았다 (갔다, 좋았다), others → 었다 (먹었다, 읽었다). 하다 always becomes 했다! Memorize these three rules and you\'ll never mess up the past tense.',
    similarPatterns: ['-던'],
    difference: '-았/었 是单纯的完成过去（强调动作已结束），-던 是带回想色彩的过去（强调"以前经常/曾经……"的记忆感）。"먹었어요"（吃了，动作完成）vs "자주 먹던 음식"（以前常吃的食物，带怀念语感）。', differenceEn: '-았/었 is a simple completed past (emphasizing the action is finished), while -던 is a past with a nostalgic feel (emphasizing the memory of "used to often/once..."). "먹었어요" (ate, action completed) vs "자주 먹던 음식" (food I used to eat often, with a wistful tone).',
  },
  {
    id: 'g48', title: '将来/推测', titleEn: 'Future / Speculation', pattern: '-ㄹ/을 거예요',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '시제',
    usage: '表示将来的计划或推测', usageEn: 'Indicates a future plan or speculation',
    explanation: '用于表达说话人打算做的事情或对未来情况的推测。在日常口语中非常常用。', explanationEn: 'Used to express what the speaker intends to do or to speculate about a future situation. Very common in everyday speech.',
    conjugation: '无收音 + ㄹ 거예요\n有收音 + 을 거예요\nㄹ结尾词干 + 거예요 (如 살다 → 살 거예요)', conjugationEn: 'No final consonant + ㄹ 거예요\\nFinal consonant + 을 거예요\\nStem ending in ㄹ + 거예요 (e.g., 살다 → 살 거예요)',
    examples: [
      { ko: '내일 뭐 할 거예요?', zh: '明天打算做什么？', zhEn: 'What do you plan to do tomorrow?', note: '将来：询问明天计划', noteEn: 'Future: asking about tomorrow\'s plans' },
      { ko: '아마 비가 올 거예요.', zh: '可能会下雨。', zhEn: 'It might rain.', note: '推测：可能会下雨', noteEn: 'Speculation: it might rain' },
      { ko: '한국에 갈 거예요.', zh: '打算去韩国。', zhEn: 'I plan to go to Korea.', note: '将来：打算去韩国', noteEn: 'Future: planning to go to Korea' },
    ],
    similarPatterns: ['-겠어요'],
    difference: '-ㄹ 거예요 是有计划的"打算做"（事先决定），-겠어요 是当场决定的"会做/要做"（即时表态）。\n例："한국에 갈 거예요"（已经计划好去韩国）vs "제가 하겠습니다"（当场表态"我来做"）。', differenceEn: '-ㄹ 거예요 is a planned "intend to do" (decided in advance), while -겠어요 is an on-the-spot "will do" (immediate commitment).\\nExample: "한국에 갈 거예요" (already planned to go to Korea) vs "제가 하겠습니다" (immediately saying "I\'ll do it").',
    toriTip: '🐰 韩国人说"我会做"时，-ㄹ 거예요 和 -겠어요 都能用，但有微妙区别！计划好的事情用 -ㄹ 거예요，当场拍胸脯用 -겠어요。面试时说"열심히 하겠습니다!"（我会努力的！）就是当场表态。', toriTipEn: '🐰 When Koreans say "I\'ll do it," both -ㄹ 거예요 and -겠어요 work, but there\'s a subtle difference! Use -ㄹ 거예요 for planned things, and -겠어요 for on-the-spot commitments. Saying "열심히 하겠습니다!" (I\'ll work hard!) in an interview is an immediate commitment.',
  },
  {
    id: 'g49', title: '现在进行时', titleEn: 'Present progressive', pattern: '-고 있다',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '시제',
    usage: '表示正在进行的动作', usageEn: 'Indicates an action in progress',
    explanation: '相当于中文的"正在……"，接在动词后表示动作正在进行中。', explanationEn: 'Equivalent to "currently doing..." in Chinese; attached to a verb to show an action is in progress.',
    conjugation: '动词词干 + 고 있다', conjugationEn: 'Verb stem + 고 있다',
    examples: [
      { ko: '지금 뭐 하고 있어요?', zh: '现在在做什么？', zhEn: 'What are you doing now?', note: '进行时：正在做什么', noteEn: 'Progressive: What are you doing' },
      { ko: '한국어를 공부하고 있어요.', zh: '正在学韩语。', zhEn: 'I\'m learning Korean.', note: '进行时：正在学习', noteEn: 'Progressive: Studying now' },
      { ko: '밖에 비가 오고 있어요.', zh: '外面正在下雨。', zhEn: 'It\'s raining outside.', note: '进行时：正在下雨', noteEn: 'Progressive: It\'s raining' },
    ],
    toriTip: '🐰 "지금 뭐 하고 있어요?" 是你在韩剧里听到最多的句子之一！等于英文的 "What are you doing now?"。回答只要动词 + 고 있어요："밥 먹고 있어요"（在吃饭）、"공부하고 있어요"（在学习）。', toriTipEn: '🐰 "지금 뭐 하고 있어요?" is one of the most common lines you\'ll hear in K-dramas! It\'s like saying "What are you doing now?" in English. To answer, just use verb + 고 있어요: "밥 먹고 있어요" (eating), "공부하고 있어요" (studying).',
    similarPatterns: ['-아/어 있다'],
    difference: '-고 있다 强调动作正在进行（"지금 밥을 먹고 있어요"正在吃饭，动作过程），-아/어 있다 强调动作结果的持续状态（"의자에 앉아 있어요"坐着，结果状态持续）。"문이 열고 있다"❌ 应该说"문이 열려 있다"（门是开着的状态）。', differenceEn: '-고 있다 emphasizes an action in progress ("지금 밥을 먹고 있어요" eating now, the process), while -아/어 있다 emphasizes the ongoing state after an action ("의자에 앉아 있어요" sitting, the state continues). "문이 열고 있다"❌ You should say "문이 열려 있다" (the door is open).',
  },
  {
    id: 'g50', title: '回想/持续', titleEn: 'Recollection/Continuation', pattern: '-던',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '시제',
    usage: '表示过去持续或反复的动作，带有回想意味', usageEn: 'Indicates a past ongoing or repeated action, with a sense of recollection',
    explanation: '用于回忆过去经常做或持续进行的事情。与单纯过去时 -았/었 不同，-던 带有"回想"的语感。', explanationEn: 'Used to recall things you often did or that continued in the past. Unlike the simple past -았/었, -던 carries a nostalgic, reflective feel.',
    conjugation: '动词词干 + 던', conjugationEn: 'Verb stem + 던',
    examples: [
      { ko: '예전에 자주 가던 카페가 문을 닫았어요.', zh: '以前常去的咖啡馆关门了。', zhEn: 'The café I used to go to closed down.', note: '回想：以前常去的地方', noteEn: 'Recollection: A place I used to visit often' },
      { ko: '어릴 때 살던 동네에 다녀왔어요.', zh: '去了小时候住过的街区。', zhEn: 'I went to the neighborhood where I lived as a kid.', note: '回想：小时候住过的地方', noteEn: 'Recollection: Where I lived as a child' },
      { ko: '아까 보던 책이 어디 갔지?', zh: '刚才在看的书去哪了？', zhEn: 'Where\'s the book I was just reading?', note: '回想：刚才在看的书', noteEn: 'Recollection: The book I was just reading' },
    ],
    toriTip: '🐰 -던 带有温暖的"回忆滤镜"。和单纯过去时 -았/었 不同，-던 让你说的话带着回忆感。"자주 먹던 음식"（以前常吃的食物）比"자주 먹은 음식"更有"怀念那个味道"的感觉。', toriTipEn: '🐰 -던 adds a warm "nostalgia filter." Unlike the simple past -았/었, -던 gives your words a reflective tone. "자주 먹던 음식" (food I used to eat often) feels more like "missing that taste" than "자주 먹은 음식."',
    similarPatterns: ['-(으)ㄴ'],
    difference: '-던 强调过去持续或反复的动作，带有回想语气（"以前经常……的"）；-(으)ㄴ 是单纯过去完成冠形词形（"做过了……的"）。"자주 가던 카페"（以前常去的咖啡馆）vs "어제 간 카페"（昨天去过的咖啡馆）。', differenceEn: '-던 emphasizes a past ongoing or repeated action with a nostalgic tone ("used to..."); -(으)ㄴ is the simple past adnominal form ("did..."). "자주 가던 카페" (a café I used to go to often) vs "어제 간 카페" (the café I went to yesterday).',
  },
  {
    id: 'g51', title: '推测/意志', titleEn: 'Conjecture/Intention', pattern: '-겠-',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '시제',
    usage: '表示说话人的意志（"会/要"）或推测（"应该/会"）', usageEn: 'Indicates the speaker\'s intention ("will") or conjecture ("probably")',
    explanation: '-겠- 有两大用法：①意志/承诺（第一人称为主："我会……"）；②推测（基于现场感官的即时推测："应该会……"）。比 -ㄹ 거예요 更正式，意志用法语气更强，推测用法则更直觉化而非基于思考。', explanationEn: '-겠- has two main uses: ① intention/commitment (mainly first person: "I will..."); ② conjecture (immediate guess based on what you see/hear: "it should..."). It\'s more formal than -ㄹ 거예요; the intention use is stronger, and the conjecture use is more intuitive than reasoned.',
    conjugation: '动词/形容词词干 + 겠다\n과거: 았/었겠', conjugationEn: 'Verb/adjective stem + 겠다\\nPast: 았/었겠',
    examples: [
      { ko: '제가 하겠습니다.', zh: '我来做。（意志/承诺）', zhEn: 'I\'ll do it. (intention/commitment)', note: '意志：当场表态我来做', noteEn: 'Intention: Deciding on the spot to do it' },
      { ko: '내일은 날씨가 좋겠어요.', zh: '明天天气应该会好。', zhEn: 'The weather should be nice tomorrow.', note: '推测：基于感官的推测', noteEn: 'Guess: based on sensory observation' },
      { ko: '맛있겠다!', zh: '看起来好好吃！（直接判断）', zhEn: 'Looks delicious! (direct judgment)', note: '推测：看着好吃的感叹', noteEn: 'Guess: exclamation about how good it looks' },
    ],
    similarPatterns: ['-ㄹ/을 것 같다', '-ㄹ/을 거예요'],
    difference: '-겠- 是基于现场感官的直接推测（"맛있겠다!"看起来好吃），-ㄹ 것 같다 是基于思考的推测（"아마 맛있을 것 같아요"，根据经验推断），-ㄹ 거예요 是有把握的推测或计划（"내일 비가 올 거예요"）。', differenceEn: '-겠- is a direct guess based on what you see or sense ("맛있겠다!" looks tasty), -ㄹ 것 같다 is a guess based on reasoning ("아마 맛있을 것 같아요", inferred from experience), and -ㄹ 거예요 is a confident guess or plan ("내일 비가 올 거예요").',
    toriTip: '🐰 -겠- 有两种感觉：①下决心（"제가 하겠습니다!"我来做！语气坚定）；②当场感叹推测（"맛있겠다!"看起来好吃！）。服务员问点什么，你说"이걸로 하겠습니다"（我要这个）就是用的这个语法。', toriTipEn: '🐰 -겠- has two vibes: ① making a firm decision ("제가 하겠습니다!" I\'ll do it!); ② exclaiming a guess on the spot ("맛있겠다!" looks yummy!). When the waiter asks what you want and you say "이걸로 하겠습니다" (I\'ll take this), that\'s this grammar.',
  },
  {
    id: 'g52', title: '回想+背景', titleEn: 'Recollection + background', pattern: '-던데',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '시제',
    usage: '回想过去经历 + 为后续内容提供背景', usageEn: 'Recalling a past experience + providing background for what follows',
    explanation: '-던데 是 -던 + -ㄴ데 的组合，表示"我记得之前……（所以……）"。常用于提供自己过去观察到的信息作为接下来的建议或提问的铺垫。', explanationEn: '-던데 is a combination of -던 + -ㄴ데, meaning "I remember that... (so...)". It\'s often used to share something you observed in the past as a lead-in to advice or a question.',
    conjugation: '动词词干 + 던데\n形容词词干 + 던데', conjugationEn: 'Verb stem + 던데\\nAdjective stem + 던데',
    examples: [
      { ko: '그 영화 정말 재미있던데 같이 볼래요?', zh: '那部电影好像很好看，一起看吗？', zhEn: 'That movie looked really good—want to watch it together?', note: '回想背景：记得好看引出建议', noteEn: 'Recalled background: remembering it was good leads to a suggestion' },
      { ko: '날씨가 좀 쌀쌀하던데 따뜻하게 입으세요.', zh: '天气好像有点凉，穿暖和点吧。', zhEn: 'The weather seems a bit chilly—dress warmly.', note: '回想背景：记得凉引出建议', noteEn: 'Recalled background: remembering it\'s cold leads to advice' },
      { ko: '그 식당 음식이 맛있던데 같이 가 볼래요?', zh: '那家餐厅的食物好像很好吃，一起去试试吗？', zhEn: 'That restaurant\'s food looked delicious—want to go try it together?', note: '回想背景：记得好吃引出邀请', noteEn: 'Recalled background: remembering it was tasty leads to an invitation' },
    ],
    toriTip: '🐰 -던데 是回忆 + 铺垫的结合体。"我记得之前……（所以现在……）"的语感。和朋友分享信息超级好用："이거 진짜 맛있던데 한번 먹어 봐"（这个真的很好吃，你尝尝看）。', toriTipEn: '🐰 -던데 is a mix of memory + setup. It feels like "I remember that... (so now...)". It\'s super handy for sharing info with friends: "이거 진짜 맛있던데 한번 먹어 봐" (This is really good—you should try it).',
    similarPatterns: ['-는데 / -(으)ㄴ데'],
    difference: '-던데 带有"回忆"色彩（说话人过去亲身经历过），-는데/-(으)ㄴ데 只是提供背景信息（无回忆语感）。"맛있던데"（记得之前吃过很好吃）vs "맛있는데"（现在感觉好吃，或单纯提供背景）。', differenceEn: '-던데 has a "recollection" feel (the speaker personally experienced it in the past), while -는데/-(으)ㄴ데 just provides background info (no recollection vibe). "맛있던데" (I remember it was tasty from before) vs "맛있는데" (it tastes good now, or just giving background).',
  },

  // =====================================================================
  //  CATEGORY: 존대 (Honorifics / 敬语)
  // =====================================================================

  {
    id: 'g53', title: '主语敬语后缀', titleEn: 'Subject honorific suffix', pattern: '-(으)시',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '존대',
    usage: '主语敬语后缀，用于抬高句子主语的身份', usageEn: 'Subject honorific suffix, used to elevate the status of the sentence\'s subject',
    explanation: '-(으)시 是韩语最基础的敬语语法。当主语是需要尊敬的人（长辈、上级、陌生人）时，在动词/形容词词干后加上 -(으)시。所有其他敬语形式都基于 -(으)시 衍生。无论句子结尾是什么格式，只要主语是需要尊敬的对象就要加。', explanationEn: '-(으)시 is the most basic honorific grammar in Korean. When the subject is someone to be respected (elders, superiors, strangers), you add -(으)시 to the verb/adjective stem. All other honorific forms are derived from -(으)시. No matter what the sentence ending is, if the subject deserves respect, you add it.',
    conjugation: '无收音词干 + 시 (가다→가시다)\n有收音词干 + 으시 (읽다→읽으시다)\n注意：ㄹ收音脱落 + 시 (살다→사시다)', conjugationEn: 'Stem without batchim + 시 (가다→가시다)\\nStem with batchim + 으시 (읽다→읽으시다)\\nNote: ㄹ batchim drops + 시 (살다→사시다)',
    examples: [
      { ko: '선생님께서 오셨어요.', zh: '老师来了。（오다 + 시 + 었어요）', zhEn: 'The teacher came. (오다 + 시 + 었어요)', note: '敬语：主语为尊者加시', noteEn: 'Honorific: adding 시 when the subject is respected' },
      { ko: '할머니께서 김치를 만드세요.', zh: '奶奶在做泡菜。', zhEn: 'Grandma is making kimchi.', note: '敬语：尊者动作加시', noteEn: 'Honorific: adding 시 for a respected person\'s action' },
      { ko: '아버지께서 신문을 읽으세요.', zh: '爸爸在看报纸。', zhEn: 'Dad is reading the newspaper.', note: '敬语：尊者动作加으시', noteEn: 'Honorific: Add 으시 to actions for respected people' },
    ],
    similarPatterns: ['-시겠어요?', '-(으)세요'],
    difference: '-(으)시 是基础敬语后缀，需要结合终结语尾使用。-(으)세요 是 -(으)시 + 아/어요 的缩写形式，更常用于口语命令句。', differenceEn: '-(으)시 is a basic honorific suffix that needs to be combined with a sentence-ending. -(으)세요 is a shortened form of -(으)시 + 아/어요, more commonly used in spoken commands.',
    toriTip: '🐰 敬语的关键规则：主语是要尊敬的人 → 动词加 -(으)시。说"奶奶吃饭"是"할머니께서 진지 드세요"，드시다 = 들다 + 시，两个敬语元素叠加！韩语敬语就是"层层加码"。', toriTipEn: '🐰 Key rule for honorifics: If the subject is someone you respect → add -(으)시 to the verb. Saying "Grandma eats" is "할머니께서 진지 드세요" — 드시다 = 들다 + 시, two honorific elements stacked! Korean honorifics are all about layering up.',
  },
  {
    id: 'g54', title: '正式敬语终结语尾', titleEn: 'Formal honorific sentence-ending', pattern: '-ㅂ니다/습니다',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '존대',
    usage: '正式场合的敬语终结语尾，用于陈述句', usageEn: 'Formal honorific sentence-ending used for statements',
    explanation: '用于正式场合（会议、演讲、新闻、军队）的陈述句结尾。表达对听者的最高敬意。疑问句用 -ㅂ니까/습니까，命令句用 -ㅂ시오/으십시오。', explanationEn: 'Used at the end of statements in formal settings (meetings, speeches, news, military). Shows the highest respect to the listener. For questions use -ㅂ니까/습니까, for commands use -ㅂ시오/으십시오.',
    conjugation: '无收音词干 + ㅂ니다 (가다→갑니다)\n有收音词干 + 습니다 (먹다→먹습니다)\nㄹ收音脱落 + ㅂ니다 (살다→삽니다)', conjugationEn: 'Stem without final consonant + ㅂ니다 (가다→갑니다)\\nStem with final consonant + 습니다 (먹다→먹습니다)\\nㄹ final consonant drops + ㅂ니다 (살다→삽니다)',
    examples: [
      { ko: '감사합니다.', zh: '谢谢。', zhEn: 'Thank you.', note: '正式体：正式场合致谢', noteEn: 'Formal style: Expressing thanks in formal settings' },
      { ko: '내일 회의가 있겠습니다.', zh: '明天有会议。', zhEn: 'There\'s a meeting tomorrow.', note: '正式体：正式通知', noteEn: 'Formal style: Formal announcement' },
      { ko: '저는 한국어를 공부합니다.', zh: '我学习韩语。', zhEn: 'I study Korean.', note: '正式体：正式陈述', noteEn: 'Formal style: Formal statement' },
    ],
    similarPatterns: ['-아/어요'],
    difference: '-ㅂ니다/습니다 是正式敬语（합쇼체），用于正式场合、陌生人、公共场合。-아/어요 是非正式敬语（해요체），用于日常对话、熟人之间。', differenceEn: '-ㅂ니다/습니다 is formal honorific (합쇼체), used in formal settings, with strangers, and in public. -아/어요 is informal honorific (해요체), used in everyday conversation and between acquaintances.',
    toriTip: '🐰 面试、演讲、见对方父母 → 用 -ㅂ니다！和朋友、同事、日常 → 用 -아/어요！最简单的切换：不确定用哪个时，-아/어요 绝对不会错，-ㅂ니다 只在正式场合才需要。', toriTipEn: '🐰 Job interviews, speeches, meeting your partner\'s parents → use -ㅂ니다! With friends, coworkers, everyday → use -아/어요! Easiest switch: when unsure, -아/어요 is always safe; -ㅂ니다 is only needed in formal settings.',
  },
  {
    id: 'g55', title: '非正式敬语终结语尾', titleEn: 'Informal honorific sentence-ending', pattern: '-아/어요',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '존대',
    usage: '日常对话中最常用的敬语终结语尾', usageEn: 'The most common honorific sentence-ending in everyday conversation',
    explanation: '这是韩语日常对话中最常用的敬语体（해요체）。比 -ㅂ니다/습니다 更亲切自然，但仍保持对听者的尊重。用于熟人之间、一般社交场合。', explanationEn: 'This is the most common honorific style in everyday Korean conversation (해요체). It\'s friendlier and more natural than -ㅂ니다/습니다, but still shows respect to the listener. Used between acquaintances and in general social situations.',
    conjugation: '词干元音 ㅏ/ㅗ → 아요 (가다→가요)\n其他元音 → 어요 (먹다→먹어요)\n하다 → 해요', conjugationEn: 'Stem vowel ㅏ/ㅗ → 아요 (가다→가요)\\nOther vowels → 어요 (먹다→먹어요)\\n하다 → 해요',
    examples: [
      { ko: '좋아요.', zh: '好。/喜欢。', zhEn: 'Good. / I like it.', note: '日常体：日常回应', noteEn: 'Everyday style: Casual response' },
      { ko: '오늘 날씨가 정말 좋아요.', zh: '今天天气真好。', zhEn: 'The weather is really nice today.', note: '日常体：日常描述', noteEn: 'Everyday style: Casual description' },
      { ko: '같이 점심 드실래요? 네, 좋아요.', zh: '要一起吃午饭吗？好的。', zhEn: 'Want to have lunch together? Sure.', note: '日常体：日常对话', noteEn: 'Everyday style: Casual conversation' },
    ],
    similarPatterns: ['-ㅂ니다/습니다', '-(으)세요'],
    difference: '-아/어요 是非正式敬语，在日常对话中使用频率最高。-ㅂ니다/습니다 是正式敬语，在公开场合使用。', differenceEn: '-아/어요 is informal honorific, the most frequently used in everyday conversation. -ㅂ니다/습니다 is formal honorific, used in public settings.',
    toriTip: '🐰 -아/어요 是你用最多的韩语语尾！90%的日常对话都用它。从"밥 먹었어요?"（吃饭了吗）到"좋아요!"（好的！），全是用 -아/어요。学会它就等于学会了韩语的基础。', toriTipEn: '🐰 -아/어요 is the most-used Korean ending! 90% of daily conversations use it. From "밥 먹었어요?" (Did you eat?) to "좋아요!" (Good!), it\'s all -아/어요. Master it and you\'ve mastered the basics of Korean.',
  },
  {
    id: 'g56', title: '敬语命令句', titleEn: 'Polite imperative', pattern: '-(으)세요',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '존대',
    usage: '敬语命令句，表示"请……"', usageEn: 'Polite imperative, meaning "please..."',
    explanation: '-(으)세요 是 -(으)시 + 아/어요 的缩写，用于礼貌地请求或命令对方做某事。是日常口语中使用频率最高的命令句式。', explanationEn: '-(으)세요 is a contraction of -(으)시 + 아/어요, used to politely ask or command someone to do something. It\'s the most frequently used imperative form in everyday speech.',
    conjugation: '无收音词干 + 세요 (가다→가세요)\n有收音词干 + 으세요 (읽다→읽으세요)\nㄹ收音脱落 + 세요 (만들다→만드세요)', conjugationEn: 'No batchim stem + 세요 (가다→가세요)\\nWith batchim stem + 으세요 (읽다→읽으세요)\\nㄹ batchim drops + 세요 (만들다→만드세요)',
    examples: [
      { ko: '여기 앉으세요.', zh: '请坐这里。', zhEn: 'Please sit here.', note: '请求：请坐这里', noteEn: 'Request: Please sit here' },
      { ko: '천천히 드세요.', zh: '请慢用。', zhEn: 'Please enjoy.', note: '请求：请慢用', noteEn: 'Request: Please enjoy your meal' },
      { ko: '내일 10시까지 와 주세요.', zh: '请明天10点之前来。', zhEn: 'Please come by 10 o\'clock tomorrow.', note: '请求：请10点前来', noteEn: 'Request: Please come before 10' },
    ],
    similarPatterns: ['-(으)십시오', '-시지요'],
    difference: '-(으)세요 是非正式敬语命令，日常使用。-(으)십시오 是正式敬语命令，用于官方场合、书面语。', differenceEn: '-(으)세요 is an informal polite imperative used in daily life. -(으)십시오 is a formal polite imperative for official or written contexts.',
    toriTip: '🐰 -(으)세요 是"请……"的最常用表达！餐馆点餐、问路、请人帮忙都用它。"여기 앉으세요"（请坐）、"조금만 기다리세요"（请稍等）— 韩国人每天都在说。', toriTipEn: '🐰 -(으)세요 is the most common way to say "please..."! Use it when ordering at restaurants, asking directions, or requesting help. "여기 앉으세요" (Please sit here), "조금만 기다리세요" (Please wait a moment) — Koreans say these every day.',
  },
  {
    id: 'g57', title: '敬语询问', titleEn: 'Polite inquiry', pattern: '-시겠어요?',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '존대',
    usage: '礼貌地询问对方的意愿或计划', usageEn: 'Politely asking about someone\'s intention or plans',
    explanation: '-시겠어요? 由 -(으)시 + 겠 + 어요 构成。用于礼貌地询问对方的意愿、意向或计划。在服务行业、客服场景中非常常用。', explanationEn: '-시겠어요? is formed from -(으)시 + 겠 + 어요. It\'s used to politely ask about someone\'s intention, will, or plans. Very common in service and customer support settings.',
    conjugation: '无收音词干 + 시겠어요\n有收音词干 + 으시겠어요\nㄹ收音脱落 + 시겠어요', conjugationEn: 'No batchim stem + 시겠어요\\nWith batchim stem + 으시겠어요\\nㄹ batchim drops + 시겠어요',
    examples: [
      { ko: '가시겠어요?', zh: '您要走吗？/要出发吗？', zhEn: 'Are you leaving? / Ready to go?', note: '委婉询问：您要走吗', noteEn: 'Polite inquiry: Are you leaving?' },
      { ko: '뭘 드시겠어요?', zh: '您想吃点什么？', zhEn: 'What would you like to eat?', note: '服务询问：想吃什么', noteEn: 'Service inquiry: What would you like?' },
      { ko: '좀 도와주시겠어요?', zh: '能帮我一下吗？', zhEn: 'Could you help me?', note: '委婉请求：请帮个忙', noteEn: 'Polite request: Please help me' },
    ],
    similarPatterns: ['-(으)ㄹ래요?', '-(으)세요'],
    difference: '-시겠어요? 比 -(으)ㄹ래요 更正式、更客气，常用于服务场合。-(으)ㄹ래요 更偏日常、朋友间的礼貌询问。', differenceEn: '-시겠어요? is more formal and polite than -(으)ㄹ래요, often used in service settings. -(으)ㄹ래요 is more casual, a polite inquiry among friends.',
    toriTip: '🐰 去韩国咖啡厅必用！"주문하시겠어요?"（您要点单吗？）是店员标准用语。你回应时用客气一点的 -(으)ㄹ래요："아메리카노 마실래요"（我想喝美式）。一个收一个放，完美配合。', toriTipEn: '🐰 A must for Korean cafés! "주문하시겠어요?" (Would you like to order?) is the standard staff phrase. Respond with the polite -(으)ㄹ래요: "아메리카노 마실래요" (I\'ll have an Americano). One asks, one answers — perfect teamwork.',
  },
  {
    id: 'g58', title: '正式敬语命令', titleEn: 'Formal polite imperative', pattern: '-(으)십시오',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '존대',
    usage: '正式场合的敬语命令句', usageEn: 'Formal polite imperative for official situations',
    explanation: '用于正式场合、公共场所（机场、车站广播、官方告示等）的命令句。比 -(으)세요 更正式、更具权威性。', explanationEn: 'Used for formal settings and public places (airport, station announcements, official notices, etc.). More formal and authoritative than -(으)세요.',
    conjugation: '无收音词干 + 십시오 (가다→가십시오)\n有收音词干 + 으십시오 (앉다→앉으십시오)', conjugationEn: 'No final consonant stem + 십시오 (가다→가십시오)\\nFinal consonant stem + 으십시오 (앉다→앉으십시오)',
    examples: [
      { ko: '들어오십시오.', zh: '请进。', zhEn: 'Please come in.', note: '正式命令：请进', noteEn: 'Formal command: Please come in' },
      { ko: '잠시만 기다려 주십시오.', zh: '请稍等。', zhEn: 'Please wait a moment.', note: '正式命令：请稍等', noteEn: 'Formal command: Please wait a moment' },
      { ko: '여권을 준비해 주십시오.', zh: '请准备好护照。', zhEn: 'Please have your passport ready.', note: '正式命令：请准备护照', noteEn: 'Formal command: Please prepare your passport' },
    ],
    similarPatterns: ['-(으)세요'],
    difference: '-(으)십시오 是正式敬语命令（합쇼체），用于官方/公共场所。-(으)세요 是非正式敬语命令（해요체），用于日常对话。', differenceEn: '-(으)십시오 is a formal polite command (합쇼체), used in official/public settings. -(으)세요 is an informal polite command (해요체), used in everyday conversation.',
    toriTip: '🐰 -(으)십시오 非常正式，机场广播、官方公告才会用。日常说话不要用，不然听起来像机器人。和朋友用 -(으)세요 就够了，-십시오 留着写作和正式场合。', toriTipEn: '🐰 -(으)십시오 is very formal—only used in airport announcements and official notices. Don\'t use it in daily speech, or you\'ll sound like a robot. With friends, -(으)세요 is enough; save -십시오 for writing and formal occasions.',
  },
  {
    id: 'g59', title: '敬语助词', titleEn: 'Honorific particle', pattern: '께서/께/께서는',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '존대',
    usage: '敬语助词，代替普通助词在敬语语境中使用', usageEn: 'Honorific particle, used in place of regular particles in honorific contexts',
    explanation: '当主语是需要尊敬的人时，用 께서 代替 이/가（主格），께서는 代替 은/는（主题），께 代替 에게/한테（与格）。这些是韩语敬语体系的重要组成部分。敬语助词必须与敬语谓词 (-(으)시) 搭配使用。', explanationEn: 'When the subject is someone deserving respect, use 께서 instead of 이/가 (subject), 께서는 instead of 은/는 (topic), and 께 instead of 에게/한테 (dative). These are key parts of Korean honorifics. Honorific particles must be used with honorific predicates (-(으)시).',
    conjugation: '께서 = 敬语主格助词 (替代 이/가)\n께서는 = 敬语主题助词 (替代 은/는)\n께 = 敬语与格助词 (替代 에게/한테)', conjugationEn: '께서 = Honorific subject particle (replaces 이/가)\\n께서는 = Honorific topic particle (replaces 은/는)\\n께 = Honorific dative particle (replaces 에게/한테)',
    examples: [
      { ko: '선생님께서 말씀하셨어요.', zh: '老师说了。', zhEn: 'The teacher said it.', note: '主语敬词：께서替代이/가', noteEn: 'Subject honorific: 께서 replaces 이/가' },
      { ko: '할머니께 꽃을 드렸어요.', zh: '给了奶奶花。', zhEn: 'Gave flowers to Grandma.', note: '对象敬词：께替代에게', noteEn: 'Object honorific: 께 replaces 에게' },
      { ko: '사장님께서는 지금 회의 중이십니다.', zh: '社长现在正在开会中。', zhEn: 'The president is in a meeting right now.', note: '主题敬词：께서는替代은/는', noteEn: 'Topic honorific: 께서는 replaces 은/는' },
    ],
    similarPatterns: ['-(으)시', '드리다', '이/가', '에게/한테'],
    difference: '敬语助词必须与敬语谓词 (-(으)시) 搭配使用。说"할머니가 말했어요"在对长辈时是不自然的，应该说"할머니께서 말씀하셨어요"。', differenceEn: 'Honorific particles must be used with honorific predicates (-(으)시). Saying "할머니가 말했어요" to elders is unnatural; you should say "할머니께서 말씀하셨어요".',
    toriTip: '🐰 提到长辈时，三件套必须同时升级：①助词用 께서（代替 이/가）；②动词加 -(으)시；③用敬语名词（如 말→말씀）。缺一个都不自然！"선생님께서 말씀하셨어요" = 三件套齐全。', toriTipEn: '🐰 When referring to elders, all three must upgrade together: ① Use 께서 for the particle (instead of 이/가); ② Add -(으)시 to the verb; ③ Use honorific nouns (e.g., 말→말씀). Missing any one sounds unnatural! "선생님께서 말씀하셨어요" = all three in place.',
  },
  {
    id: 'g60', title: '敬语名词', titleEn: 'Honorific nouns', pattern: '분/댁/연세/성함/말씀/진지',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '존대',
    usage: '用于尊称的特殊名词，替代普通名词', usageEn: 'Special nouns for showing respect, replacing regular nouns',
    explanation: '韩语有一整套敬语名词体系，在提及长辈或尊者的相关事物时必须使用。这些词分别对应普通名词的敬语形式。', explanationEn: 'Korean has a full system of honorific nouns, used when referring to things related to elders or respected people. These correspond to honorific forms of regular nouns.',
    conjugation: '분 = 人/位 (替代 사람/명)\n댁 = 家/府上 (替代 집)\n연세 = 年龄/高龄 (替代 나이)\n성함 = 姓名/贵姓 (替代 이름)\n말씀 = 话/言语 (替代 말)\n진지 = 饭/膳食 (替代 밥)', conjugationEn: '분 = person (replaces 사람/명)\\n댁 = home (replaces 집)\\n연세 = age (replaces 나이)\\n성함 = name (replaces 이름)\\n말씀 = words/speech (replaces 말)\\n진지 = meal (replaces 밥)',
    examples: [
      { ko: '그 분이 누구세요?', zh: '那位是谁？', zhEn: 'Who is that person?', note: '敬语名词：분替代사람', noteEn: 'Honorific noun: 분 replaces 사람' },
      { ko: '성함이 어떻게 되세요?', zh: '您贵姓？/请问您叫什么名字？', zhEn: 'What is your name? / May I ask your name?', note: '敬语名词：성함替代이름', noteEn: 'Honorific noun: 성함 replaces 이름' },
      { ko: '할아버지, 진지 드세요.', zh: '爷爷，请吃饭。', zhEn: 'Grandfather, please eat.', note: '敬语名词：진지替代밥', noteEn: 'Honorific noun: 진지 replaces 밥' },
      { ko: '선생님 연세가 어떻게 되세요?', zh: '老师您的年龄是？', zhEn: 'Teacher, may I ask your age?', note: '敬语名词：연세替代나이', noteEn: 'Honorific noun: 연세 replaces 나이' },
      { ko: '말씀 좀 여쭤봐도 될까요?', zh: '可以问您句话吗？', zhEn: 'May I ask you something?', note: '敬语名词：말씀替代말', noteEn: 'Honorific noun: 말씀 replaces 말' },
      { ko: '선생님 댁이 어디세요?', zh: '老师府上在哪里？', zhEn: 'Teacher, where is your home?', note: '敬语名词：댁替代집', noteEn: 'Honorific noun: 댁 replaces 집' },
    ],
    similarPatterns: ['드시다/주무시다/계시다'],
    difference: '敬语名词与敬语动词配合使用，构成完整的敬语表达体系。说"할아버지 밥 드세요"虽然语法正确，但用 진지 更尊敬。', differenceEn: 'Honorific nouns work with honorific verbs to form a complete honorific system. Saying "할아버지 밥 드세요" is grammatically correct, but using 진지 is more respectful.',
    toriTip: '🐰 记住6个敬语名词活用场景：问名字→성함、问年龄→연세、提到家→댁、说话→말씀、吃饭→진지、称呼人→분。对长辈用这6个词，韩国人会对你刮目相看！', toriTipEn: '🐰 Remember 6 honorific noun scenarios: asking name→성함, asking age→연세, mentioning home→댁, speaking→말씀, eating→진지, addressing people→분. Use these 6 words for elders, and Koreans will be impressed!',
  },
  {
    id: 'g61', title: '敬语动词', titleEn: 'Honorific verbs', pattern: '드시다/주무시다/계시다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '존대',
    usage: '特殊敬语动词，替代普通动词用于尊敬对象', usageEn: 'Special honorific verbs that replace regular verbs for respectful subjects',
    explanation: '某些常用动词有专门的敬语形式，需要整体替换而不是简单加 -(으)시。这些是最常用的敬语动词，必须单独记忆。', explanationEn: 'Some common verbs have dedicated honorific forms that require full replacement rather than simply adding -(으)시. These are the most common honorific verbs and must be memorized separately.',
    conjugation: '드시다 = 吃/喝 (替代 먹다/마시다 的敬语)\n  → 드세요 / 드셨어요 / 드십시오\n주무시다 = 睡 (替代 자다 的敬语)\n  → 주무세요 / 주무셨어요\n계시다 = 在 (替代 있다 的敬语)\n  → 계세요 / 계셨어요', conjugationEn: '드시다 = eat/drink (honorific for 먹다/마시다)\\n  → 드세요 / 드셨어요 / 드십시오\\n주무시다 = sleep (honorific for 자다)\\n  → 주무세요 / 주무셨어요\\n계시다 = be/exist (honorific for 있다)\\n  → 계세요 / 계셨어요',
    examples: [
      { ko: '아버지께서 지금 계세요.', zh: '父亲现在在（家）。', zhEn: 'Father is at home now.', note: '敬语动词：계시다替代있다', noteEn: 'Honorific verb: 계시다 replaces 있다' },
      { ko: '할머니, 진지 드세요.', zh: '奶奶，请吃饭。', zhEn: 'Grandmother, please eat.', note: '敬语动词：드시다替代먹다', noteEn: 'Honorific verb: 드시다 replaces 먹다' },
      { ko: '안녕히 주무셨어요?', zh: '（早上问候）睡得好吗？', zhEn: '(Morning greeting) Did you sleep well?', note: '敬语动词：주무시다替代자다', noteEn: 'Honorific verb: 주무시다 replaces 자다' },
    ],
    similarPatterns: ['분/댁/연세/성함/말씀/진지'],
    difference: '敬语动词是需要整体替换的特殊词汇，不能通过规则变形得到。먹다 → 먹으시다 虽语法上存在但极不自然，对长辈必须用专用敬语动词 드시다。있다 → 있으시다 用于尊重对方的物品/情况，계시다 用于人在场。', differenceEn: 'Honorific verbs are special words that require full replacement and cannot be formed through regular conjugation. 먹다 → 먹으시다 exists grammatically but is highly unnatural; for elders, you must use the dedicated honorific verb 드시다. 있다 → 있으시다 is used to respect someone\'s belongings/situation, while 계시다 is used when a person is present.',
    toriTip: '🐰 三个敬语动词必须死记：먹다→드시다、자다→주무시다、있다→계시다。不存在"먹으세요"这种说法！"많이 드세요"（请多吃）才是正确的。记不住就想想：长辈不是"吃"饭，是"进膳"。', toriTipEn: '🐰 Memorize these three honorific verbs by heart: 먹다→드시다, 자다→주무시다, 있다→계시다. There\'s no such thing as "먹으세요"! "많이 드세요" (please eat a lot) is correct. If you can\'t remember, think: elders don\'t "eat" meals, they "dine".',
  },
  {
    id: 'g62', title: '敬语建议', titleEn: 'Honorific Suggestion', pattern: '-시지요',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '존대',
    usage: '礼貌地提出建议或劝告', usageEn: 'Politely make a suggestion or give advice',
    explanation: '-시지요 是 -(으)시 + 지요 的组合，用于礼貌地建议对方做某事。语气比 -(으)세요 更柔和，带有"何不……呢？"的劝说意味。', explanationEn: '-시지요 is a combination of -(으)시 + 지요, used to politely suggest that someone do something. It\'s softer than -(으)세요, with a persuasive nuance of "Why not...?"',
    conjugation: '无收音词干 + 시지요\n有收音词干 + 으시지요\nㄹ收音脱落 + 시지요', conjugationEn: 'No batchim stem + 시지요\\nBatchim stem + 으시지요\\nㄹ batchim drops + 시지요',
    examples: [
      { ko: '어서 드시지요.', zh: '快请吃吧。', zhEn: 'Please go ahead and eat.', note: '婉转建议：请快吃吧', noteEn: 'Soft suggestion: Please eat quickly' },
      { ko: '이쪽으로 오시지요.', zh: '请往这边走吧。', zhEn: 'Please come this way.', note: '婉转建议：请往这边走', noteEn: 'Soft suggestion: Please come this way' },
      { ko: '함께 가시지요.', zh: '一起走吧。（礼貌建议）', zhEn: 'Let\'s go together. (Polite suggestion)', note: '婉转建议：一起走吧', noteEn: 'Soft suggestion: Let\'s go together' },
    ],
    similarPatterns: ['-(으)세요', '-시겠어요?'],
    difference: '-시지요 语气更温和友善，带有劝说/建议意味。-(으)세요 更直接的命令/请求。', differenceEn: '-시지요 is more gentle and friendly, with a persuasive/suggestive tone. -(으)세요 is a more direct command/request.',
    toriTip: '🐰 -시지요 是韩国长辈最爱的温和建议说法。"어서 드시지요"（快请吃吧）— 比"드세요"多了份亲切的劝说感。对长辈回话时用它："이쪽으로 오시지요"（请往这边走）。', toriTipEn: '🐰 -시지요 is the gentle suggestion form that Korean elders love. "어서 드시지요" (Please eat quickly) — it has a warmer, more persuasive feel than "드세요". Use it when responding to elders: "이쪽으로 오시지요" (Please come this way).',
  },
  {
    id: 'g63', title: '礼貌询问意愿', titleEn: 'Politely Ask Intentions', pattern: '-(으)ㄹ래요?',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '문형',
    usage: '礼貌地询问对方的意愿或建议', usageEn: 'Politely ask about someone\'s intentions or make a suggestion',
    explanation: '用于询问对方的意愿、计划，或提议一起做某事。在日常会话中使用频率极高，语气亲切自然。', explanationEn: 'Used to ask about someone\'s intentions, plans, or to suggest doing something together. It\'s extremely common in everyday conversation and has a friendly, natural tone.',
    conjugation: '无收音词干 + ㄹ래요 (가다→갈래요?)\n有收音词干 + 을래요 (먹다→먹을래요?)\nㄹ收音 + 래요 (만들다→만들래요?)', conjugationEn: 'No batchim stem + ㄹ래요 (가다→갈래요?)\\nBatchim stem + 을래요 (먹다→먹을래요?)\\nㄹ batchim + 래요 (만들다→만들래요?)',
    examples: [
      { ko: '뭐 먹을래요?', zh: '想吃什么？', zhEn: 'What do you want to eat?', note: '意愿询问：想吃什么', noteEn: 'Intention question: What do you want to eat?' },
      { ko: '같이 영화 볼래요?', zh: '一起看电影好吗？', zhEn: 'Want to watch a movie together?', note: '意愿询问：一起看吗', noteEn: 'Intention question: Watch together?' },
      { ko: '커피 마실래요? 아니면 차 마실래요?', zh: '喝咖啡还是喝茶？', zhEn: 'Coffee or tea?', note: '意愿询问：咖啡还是茶', noteEn: 'Intention question: Coffee or tea?' },
    ],
    similarPatterns: ['-시겠어요?', '-고 싶다'],
    difference: '-(으)ㄹ래요 在日常对话中更自然亲切，适合朋友或熟悉的人之间。-시겠어요 更正式礼貌，适合服务场合或不太熟的人。', differenceEn: '-(으)ㄹ래요 is more natural and friendly in everyday conversation, suitable for friends or people you know well. -시겠어요 is more formal and polite, suitable for service situations or people you don\'t know well.',
    toriTip: '🐰 -(으)ㄹ래요 是你每天都会用的词！"뭐 먹을래?"（想吃什么？）、"갈래?"（去吗？）、"볼래?"（看吗？）。朋友之间用它比 -고 싶다 更自然。但要记住：对陌生人用 -시겠어요 更有礼貌。', toriTipEn: '🐰 -(으)ㄹ래요 is a word you\'ll use every day! "뭐 먹을래?" (What do you want to eat?), "갈래?" (Want to go?), "볼래?" (Want to see?). It\'s more natural than -고 싶다 among friends. But remember: use -시겠어요 with strangers to be more polite.',
  },
  {
    id: 'g64', title: '为长辈做某事', titleEn: 'Doing Something for Elders', pattern: '-아/어 드리다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '존대',
    usage: '表示为长辈/尊者做某事（谦让语）', usageEn: 'Expresses doing something for an elder/superior (humble form)',
    explanation: '드리다 是 주다（给）的敬语形式。将 아/어 주다 中的 주다 替换为 드리다，表示"为您做……"的谦让之意。这是韩语中非常重要的谦让表达。', explanationEn: '드리다 is the honorific form of 주다 (to give). Replace 주다 in 아/어 주다 with 드리다 to express the humble meaning of "doing something for you." This is a very important humble expression in Korean.',
    conjugation: '词干 + 아/어/여 + 드리다\n元音 ㅏ/ㅗ → 아 드리다\n其他元音 → 어 드리다\n하다 → 해 드리다', conjugationEn: 'Stem + 아/어/여 + 드리다\\nVowel ㅏ/ㅗ → 아 드리다\\nOther vowels → 어 드리다\\n하다 → 해 드리다',
    examples: [
      { ko: '제가 도와 드릴게요.', zh: '我来帮您吧。', zhEn: 'Let me help you.', note: '谦让：为您做某事', noteEn: 'Humble: doing something for you' },
      { ko: '어머니께 선물을 사 드렸어요.', zh: '给妈妈买了礼物。', zhEn: 'I bought a gift for Mom.', note: '谦让：为长辈购物', noteEn: 'Humble: shopping for an elder' },
      { ko: '할아버지께 편지를 읽어 드렸어요.', zh: '给爷爷读了信。', zhEn: 'I read the letter to Grandpa.', note: '谦让：为长辈朗读', noteEn: 'Humble: reading aloud for an elder' },
      { ko: '무거워 보이는데 들어 드릴까요?', zh: '看起来很重，我帮您拿吧？', zhEn: 'That looks heavy—shall I carry it for you?', note: '谦让：为您搬东西', noteEn: 'Humble: carrying things for you' },
    ],
    similarPatterns: ['-아/어 주다', '께'],
    difference: '-아/어 주다 用于平辈或晚辈（"帮你做……"），-아/어 드리다 用于长辈或尊者（"为您做……"）。动作的接受者是长辈时必须用 드리다。', differenceEn: '-아/어 주다 is used for peers or younger people ("doing something for you"), while -아/어 드리다 is used for elders or superiors ("doing something for you"). If the recipient of the action is an elder, you must use 드리다.',
    toriTip: '🐰 帮平辈用 -아/어 주다（"도와줘" 帮我），帮长辈用 -아/어 드리다（"도와 드릴게요" 我来帮您）。判断标准：对方是不是要尊敬的人？是→드리다，不是→주다。最简单的敬语辨别法。', toriTipEn: '🐰 Use -아/어 주다 for peers ("도와줘" help me) and -아/어 드리다 for elders ("도와 드릴게요" I\'ll help you). The rule: Is the other person someone you should respect? Yes → 드리다, No → 주다. The simplest way to tell honorifics apart.',
  },

  // =====================================================================
  //  CATEGORY: 문형 (Sentence Patterns / 句型)
  // =====================================================================

  {
    id: 'g65', title: '尝试/经验', titleEn: 'Try/Experience', pattern: '-아/어 보다',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '문형',
    usage: '表示尝试做某事或曾经做过某事', usageEn: 'Indicates trying something or having done something before',
    explanation: '表示"试着做……"或"……过"的经历。与过去时连用表示"曾经做过……"。', explanationEn: 'Indicates the experience of "trying something" or "having done something." When used with the past tense, it means "have done... before."',
    conjugation: '词干 + 아/어/여 + 보다', conjugationEn: 'Stem + 아/어/여 + 보다',
    examples: [
      { ko: '이거 먹어 보세요.', zh: '请尝尝这个。', zhEn: 'Please try this.', note: '尝试：试着吃一下', noteEn: 'Try: give it a taste' },
      { ko: '한복을 입어 봤어요.', zh: '穿过韩服。', zhEn: 'I\'ve worn a hanbok.', note: '经历：曾经穿过', noteEn: 'Experience: have worn before' },
      { ko: '생각해 볼게요.', zh: '我会考虑的（试着想想）。', zhEn: 'I\'ll think about it (give it some thought).', note: '尝试：试着考虑', noteEn: 'Try: consider it' },
    ],
    toriTip: '🐰 -아/어 보다 是韩语中最实用的句型之一！两种用法：①现在时 = "试试"（먹어 보세요 请尝尝）；②过去时 = "……过"（먹어 봤어요 吃过）。记住这个区分就够了！', toriTipEn: '🐰 -아/어 보다 is one of the most useful patterns in Korean! Two uses: ① Present tense = "try" (먹어 보세요 please taste it); ② Past tense = "have done" (먹어 봤어요 have tried it). Just remember this distinction!',
    similarPatterns: ['-ㄴ/은 적이 있다'],
    difference: '-아/어 봤다 强调"尝试过"（侧重体验行为本身），-ㄴ 적이 있다 强调"有过……的经历"（侧重经历事实）。"한국에 가 봤어요"（体验过去韩国）vs "한국에 간 적이 있어요"（有去过韩国的经历）。日常对话更常用 -아/어 봤다。', differenceEn: '-아/어 봤다 emphasizes "having tried" (focusing on the experience itself), while -ㄴ 적이 있다 emphasizes "having had the experience" (focusing on the fact). "한국에 가 봤어요" (experienced going to Korea) vs "한국에 간 적이 있어요" (have the experience of going to Korea). In daily conversation, -아/어 봤다 is more common.',
  },
  {
    id: 'g66', title: '愿望表达', titleEn: 'Expressing Wishes', pattern: '-고 싶다',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '문형',
    usage: '表示"想做……"的愿望', usageEn: 'Indicates the desire to "want to do..."',
    explanation: '接在动词后，表达说话人的愿望。第三人称使用时需要改为 -고 싶어하다。', explanationEn: 'Attached to a verb stem to express the speaker\'s wish. When used for a third person, it changes to -고 싶어하다.',
    conjugation: '动词词干 + 고 싶다', conjugationEn: 'Verb stem + 고 싶다',
    examples: [
      { ko: '한국에 가고 싶어요.', zh: '想去韩国。', zhEn: 'I want to go to Korea.', note: '愿望：想去韩国', noteEn: 'Wish: want to go to Korea' },
      { ko: '뭐 먹고 싶어요?', zh: '想吃什么？', zhEn: 'What do you want to eat?', note: '愿望：询问对方想吃', noteEn: 'Wish: asking what the other person wants to eat' },
      { ko: '친구가 한국어를 배우고 싶어해요.', zh: '朋友想学韩语。（第三人称用 싶어하다）', zhEn: 'My friend wants to learn Korean. (Third person uses 싶어하다)', note: '愿望：第三人称愿望', noteEn: 'Wish: third-person wish' },
    ],
    toriTip: '🐰 只有自己才知道自己"想"什么！所以说"我想"用 -고 싶다，"他想"用 -고 싶어하다。"친구가 가고 싶어해요"（朋友想去）— 因为你不能替别人说"他想"哦。', toriTipEn: '🐰 Only you know what you "want"! So "I want" uses -고 싶다, "he wants" uses -고 싶어하다. "친구가 가고 싶어해요" (my friend wants to go) — because you can\'t say "he wants" for someone else.',
    similarPatterns: ['-(으)ㄹ까 하다'],
    difference: '-고 싶다 是明确的愿望（"想做……"，情感直接），-(으)ㄹ까 하다 是犹豫/考虑中的意向（"在想要不要……"，语气不确定）。"한국에 가고 싶어요"（想去韩国，明确愿望）vs "한국에 갈까 해요"（在考虑要不要去韩国，还没决定）。', differenceEn: '-고 싶다 is a clear wish ("want to do...", direct emotion), while -(으)ㄹ까 하다 is a hesitant/considering intention ("thinking about whether to...", uncertain tone). "한국에 가고 싶어요" (want to go to Korea, clear wish) vs "한국에 갈까 해요" (considering whether to go to Korea, not decided yet).',
  },
  {
    id: 'g67', title: '能力/可能性', titleEn: 'Ability/Possibility', pattern: '-ㄹ/을 수 있다/없다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示能力（"会/能"）或可能性（"可能"）', usageEn: 'Indicates ability ("can") or possibility ("might")',
    explanation: '既可以表示人的能力（会做某事），也可以表示客观可能性。其否定形式表示"不会/不能/不可能"。', explanationEn: 'Can indicate a person\'s ability (know how to do something) or objective possibility. Its negative form means "can\'t / not able / impossible."',
    conjugation: '无收音 + ㄹ 수 있다 → 할 수 있다\n有收音 + 을 수 있다 → 먹을 수 있다', conjugationEn: 'No final consonant + ㄹ 수 있다 → 할 수 있다\\nWith final consonant + 을 수 있다 → 먹을 수 있다',
    examples: [
      { ko: '한국어를 할 수 있어요.', zh: '会说韩语。', zhEn: 'I can speak Korean.', note: '能力：会说韩语', noteEn: 'Ability: can speak Korean' },
      { ko: '혼자서는 할 수 없어요.', zh: '一个人做不了。', zhEn: 'One person can\'t do it.', note: '能力否定：做不到', noteEn: 'Ability negative: can\'t do it' },
      { ko: '누구나 실수할 수 있어요.', zh: '谁都有可能犯错。', zhEn: 'Anyone can make mistakes.', note: '可能性：谁都可能犯错', noteEn: 'Possibility: anyone can make mistakes' },
    ],
    toriTip: '🐰 -ㄹ 수 있다 的两种含义靠语境区分："저는 한국어를 할 수 있어요"= 我会说韩语（能力）；"비가 올 수 있어요"= 可能会下雨（可能性）。注意："不会做"是 -ㄹ 줄 모르다，"不能做"是 -ㄹ 수 없다。', toriTipEn: '🐰 The two meanings of -ㄹ 수 있다 are distinguished by context: "저는 한국어를 할 수 있어요" = I can speak Korean (ability); "비가 올 수 있어요" = it might rain (possibility). Note: "don\'t know how to do" is -ㄹ 줄 모르다, "can\'t do" is -ㄹ 수 없다.',
    similarPatterns: ['-ㄹ/을 줄 알다/모르다'],
    difference: '-ㄹ 수 있다 表示能力或可能性（条件具备就能做），-ㄹ 줄 알다 专指技能性能力（通过学习掌握的技能）。"수영할 수 있어요"（能游泳，可能指今天水温合适）vs "수영할 줄 알아요"（会游泳，学过这项技能）。', differenceEn: '-ㄹ 수 있다 indicates ability or possibility (can do if conditions are met), while -ㄹ 줄 알다 specifically refers to skill-based ability (a skill learned through study). "수영할 수 있어요" (can swim, maybe the water temperature is right today) vs "수영할 줄 알아요" (know how to swim, learned this skill).',
  },
  {
    id: 'g68', title: '许可/禁止', titleEn: 'Permission/Prohibition', pattern: '-아/어도 되다 / -(으)면 안 되다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示允许（"可以……"）或禁止（"不可以……"）', usageEn: 'Indicates permission ("may...") or prohibition ("must not...")',
    explanation: '许可形：아/어도 되다（可以做……）。禁止形：(으)면 안 되다（不可以做……）。注意禁止形不要和中文思维混淆——是"如果做了就不行"。', explanationEn: 'Permission form: 아/어도 되다 (may do...). Prohibition form: (으)면 안 되다 (must not do...). Note that the prohibition form shouldn\'t be confused with Chinese thinking — it\'s "if you do it, it\'s not okay."',
    conjugation: '许可：词干 + 아/어도 되다\n禁止：词干 + (으)면 안 되다', conjugationEn: 'Permission: stem + 아/어도 되다\\nProhibition: stem + (으)면 안 되다',
    examples: [
      { ko: '여기 앉아도 돼요?', zh: '可以坐这里吗？', zhEn: 'Can I sit here?', note: '许可：询问是否可以', noteEn: 'Permission: asking if it\'s okay' },
      { ko: '사진 찍어도 돼요.', zh: '可以拍照。', zhEn: 'You may take photos.', note: '许可：允许拍照', noteEn: 'Permission: Photos allowed' },
      { ko: '여기서 담배 피우면 안 돼요.', zh: '不可以在这里抽烟。', zhEn: 'You can\'t smoke here.', note: '禁止：不可以抽烟', noteEn: 'Prohibited: No smoking' },
    ],
    toriTip: '🐰 "……해도 돼요?"（可以做……吗？）是生活中最实用的句型之一。问许可的黄金句式："들어가도 돼요?"（可以进去吗？）、"먹어도 돼요?"（可以吃吗？）。禁止用 "-(으)면 안 돼요"。', toriTipEn: '🐰 "...해도 돼요?" (Can I do...?) is one of the most useful sentence patterns in daily life. The golden pattern for asking permission: "들어가도 돼요?" (Can I go in?), "먹어도 돼요?" (Can I eat?). For prohibition, use "-(으)면 안 돼요".',
    similarPatterns: ['-아/어야 하다'],
    difference: '-아/어도 되다 表示许可（"可以做"），-아/어야 하다 表示义务（"必须做"），-(으)면 안 되다 表示禁止（"不可以做"）。"먹어도 돼요"（可以吃）vs "먹어야 해요"（必须吃）vs "먹으면 안 돼요"（不可以吃）。', differenceEn: '-아/어도 되다 indicates permission ("can do"), -아/어야 하다 indicates obligation ("must do"), and -(으)면 안 되다 indicates prohibition ("can\'t do"). "먹어도 돼요" (can eat) vs "먹어야 해요" (must eat) vs "먹으면 안 돼요" (can\'t eat).',
  },
  {
    id: 'g69', title: '推测表达', titleEn: 'Expressing conjecture', pattern: '-ㄹ/을 것 같다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示推测，"好像……"/"可能……"', usageEn: 'Expresses conjecture, "seems like..."/"might..."',
    explanation: '用于表达说话人基于某种根据的推测。比 -겠- 的语气更柔和、更不确定。口语中使用频率极高。', explanationEn: 'Used to express the speaker\'s conjecture based on some evidence. It\'s softer and more uncertain than -겠-. Extremely common in spoken language.',
    conjugation: '动词/形容词 + ㄹ/을 것 같다\n过去推测：았/었을 것 같다', conjugationEn: 'Verb/Adjective + ㄹ/을 것 같다\\nPast conjecture: 았/었을 것 같다',
    examples: [
      { ko: '내일 비가 올 것 같아요.', zh: '明天好像会下雨。', zhEn: 'It seems like it will rain tomorrow.', note: '推测：明天可能下雨', noteEn: 'Conjecture: It might rain tomorrow' },
      { ko: '이 영화 재미있을 것 같아요.', zh: '这部电影看起来应该好看。', zhEn: 'This movie looks like it should be good.', note: '推测：电影应该好看', noteEn: 'Conjecture: The movie should be good' },
      { ko: '그 분은 이미 알고 있을 것 같아요.', zh: '那个人好像已经知道了。', zhEn: 'That person seems to already know.', note: '推测：对方可能已知', noteEn: 'Conjecture: The other person might already know' },
    ],
    toriTip: '🐰 韩国人说话爱留余地，所以 -ㄹ 것 같다 比 -ㄹ 거예요 更常用！"맛있을 것 같아요"（好像很好吃）比"맛있을 거예요"（会好吃的）更自然、更谦虚。不确定时就用 -ㄹ 것 같다！', toriTipEn: '🐰 Koreans like to leave room when speaking, so -ㄹ 것 같다 is more common than -ㄹ 거예요! "맛있을 것 같아요" (seems delicious) is more natural and humble than "맛있을 거예요" (it will be delicious). When unsure, use -ㄹ 것 같다!',
    similarPatterns: ['-겠-'],
    difference: '-ㄹ 것 같다 是基于思考/推断的推测（"感觉好像……"，语气柔和），-겠- 是基于现场感官的直接判断（"맛있겠다!"看起来好吃，更直接）。"비가 올 것 같아요"（感觉好像会下雨，思考后的推测）vs "비가 오겠어요"（看样子会下雨，基于现场观察）。', differenceEn: '-ㄹ 것 같다 is conjecture based on thought/inference ("feels like...", soft tone), while -겠- is a direct judgment based on immediate senses ("맛있겠다!" looks delicious, more direct). "비가 올 것 같아요" (feels like it might rain, inference after thinking) vs "비가 오겠어요" (looks like it\'ll rain, based on observation).',
  },
  {
    id: 'g70', title: '义务/必要', titleEn: 'Obligation/Necessity', pattern: '-아/어야 하다 / 되다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"必须……"、"得……"', usageEn: 'Indicates "must...", "have to..."',
    explanation: '表达做某事的必要性或义务。-아/어야 하다 更强调主观义务，-아/어야 되다 是客观需要。但在口语中两者经常混用。', explanationEn: 'Expresses the necessity or obligation to do something. -아/어야 하다 emphasizes subjective obligation, while -아/어야 되다 is objective necessity. But in spoken language, they\'re often used interchangeably.',
    conjugation: '词干 + 아/어야 하다/되다', conjugationEn: 'Stem + 아/어야 하다/되다',
    examples: [
      { ko: '내일까지 숙제를 해야 해요.', zh: '明天之前必须做作业。', zhEn: 'I have to do my homework by tomorrow.', note: '义务：必须做作业', noteEn: 'Obligation: Must do homework' },
      { ko: '한국어를 열심히 공부해야 돼요.', zh: '必须努力学习韩语。', zhEn: 'I must study Korean hard.', note: '必要：必须努力学', noteEn: 'Necessity: Must study hard' },
      { ko: '지금 안 가면 늦을 거예요. 가야 해요!', zh: '现在不走会迟到的，必须走了！', zhEn: 'If I don\'t leave now, I\'ll be late—I have to go!', note: '紧迫义务：必须走', noteEn: 'Urgent obligation: must go' },
    ],
    toriTip: '🐰 -아/어야 해요 和 -아/어야 돼요 在日常对话中可以互换！但有个小差别：해야 해요 更偏"我有义务做"，해야 돼요 更偏"情况要求我必须做"。不用纠结，用哪个韩国人都听得懂。', toriTipEn: '🐰 -아/어야 해요 and -아/어야 돼요 are interchangeable in everyday conversation! But there\'s a small difference: 해야 해요 leans more toward "I have an obligation to do it," while 해야 돼요 leans more toward "the situation requires me to do it." Don\'t overthink it—Koreans understand either one.',
    similarPatterns: ['-지 않아도 되다'],
    difference: '-아/어야 하다 表示义务/必要（"必须做"），-지 않아도 되다 是其否定形式（"不必做/不用做"）。注意：-지 않아야 하다（"必须不做"）≠ -지 않아도 되다（"不用做"），意思完全不同。', differenceEn: '-아/어야 하다 expresses obligation/necessity ("must do"), and -지 않아도 되다 is its negative form ("don\'t have to do"). Note: -지 않아야 하다 ("must not do") ≠ -지 않아도 되다 ("don\'t have to do")—they mean completely different things.',
  },
  {
    id: 'g71', title: '必然规律', titleEn: 'Inevitable pattern', pattern: '-기 마련이다',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"必然会……"、"……是理所当然的"', usageEn: 'Indicates "will inevitably..." or "...is only natural."',
    explanation: '用于表达某种普遍真理或必然规律。相当于中文的"自然就会……"、"总是会……的"。', explanationEn: 'Used to express a universal truth or inevitable pattern. Equivalent to "naturally..." or "always ends up..." in English.',
    conjugation: '词干 + 기 마련이다', conjugationEn: 'Stem + 기 마련이다',
    examples: [
      { ko: '열심히 노력하면 성공하기 마련이에요.', zh: '努力就必然会成功。', zhEn: 'If you work hard, success is inevitable.', note: '必然规律：努力必成功', noteEn: 'Inevitable pattern: effort leads to success' },
      { ko: '시간이 지나면 잊어버리기 마련이죠.', zh: '时间过去自然就会忘记的。', zhEn: 'As time passes, you naturally forget.', note: '必然规律：时间过会忘', noteEn: 'Inevitable pattern: time makes you forget' },
      { ko: '자주 만나면 친해지기 마련이에요.', zh: '经常见面自然就会变亲近。', zhEn: 'If you meet often, you naturally grow close.', note: '必然规律：常见必亲近', noteEn: 'Inevitable pattern: frequent meetings breed closeness' },
    ],
    toriTip: '🐰 -기 마련이다 = "自然会……"。表达人生哲理的标配语法。"자주 안 만나면 멀어지기 마련이에요"（不常见面自然会疏远）— 说起来很有哲理的感觉。', toriTipEn: '🐰 -기 마련이다 = "naturally..." It\'s the go-to grammar for expressing life wisdom. "자주 안 만나면 멀어지기 마련이에요" (If you don\'t meet often, you naturally drift apart)—sounds very philosophical.',
    similarPatterns: ['-는 법이다'],
    difference: '-기 마련이다 强调必然性、客观规律（"本来就会……"），-는 법이다 强调道理/应然（"按理应该……"）。"노력하면 성공하기 마련이에요"（努力了必然会成功，规律）vs "노력하면 성공하는 법이에요"（努力了就应该会成功，道理）。两者常可互换，但 -기 마련이다 更强调不可避免。', differenceEn: '-기 마련이다 emphasizes inevitability and objective laws ("it\'s bound to..."), while -는 법이다 emphasizes principle/ought ("it stands to reason that..."). "노력하면 성공하기 마련이에요" (If you work hard, success is inevitable—a law) vs "노력하면 성공하는 법이에요" (If you work hard, success should follow—a principle). They\'re often interchangeable, but -기 마련이다 stresses unavoidability more.',
  },
  {
    id: 'g72', title: '倾向归类', titleEn: 'Tendency categorization', pattern: '-는/ㄴ/은 편이다',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"算得上是……一类"、"倾向于是……的"', usageEn: 'Indicates "counts as..." or "tends to be..."',
    explanation: '委婉地表达某种倾向或归类。不是绝对的判断，而是"相对来说属于……"的语感。非常符合韩国人委婉表达的交际习惯。', explanationEn: 'Euphemistically expresses a tendency or categorization. It\'s not an absolute judgment but a sense of "relatively speaking, it falls into..." This fits Koreans\' habit of indirect communication perfectly.',
    conjugation: '动词：词干 + 는 편이다\n形容词：有收音 + 은 편、无收音 + ㄴ 편', conjugationEn: 'Verbs: stem + 는 편이다\\nAdjectives: with batchim + 은 편, without batchim + ㄴ 편',
    examples: [
      { ko: '한국어 발음이 좋은 편이에요.', zh: '韩语发音算是不错的。', zhEn: 'My Korean pronunciation is pretty good, I\'d say.', note: '倾向归类：算是不错', noteEn: 'Tendency: pretty good' },
      { ko: '저는 매운 음식을 잘 먹는 편이에요.', zh: '我算是能吃辣的。', zhEn: 'I can handle spicy food, relatively speaking.', note: '倾向归类：算是能吃辣', noteEn: 'Tendency: can eat spicy' },
      { ko: '이 동네는 조용한 편이에요.', zh: '这个小区算是安静的。', zhEn: 'This neighborhood is on the quiet side.', note: '倾向归类：算是安静', noteEn: 'Tendency: on the quiet side' },
    ],
    toriTip: '🐰 -는 편이다 让你说话留有分寸。"잘하는 편이에요"（算是不错的）比"잘해요"（很好）更谦虚、更自然。符合韩语"不要太绝对"的交际习惯。面试和自我介绍时用它特别得体。', toriTipEn: '🐰 -는 편이다 helps you speak with tact. "잘하는 편이에요" (pretty good) is more modest and natural than "잘해요" (very good). It fits the Korean communication style of avoiding absolutes. It\'s especially appropriate for interviews and self-introductions.',
    similarPatterns: ['-ㄹ/을 것 같다'],
    difference: '-는 편이다 是客观归类（"算是属于……这类"，有比较基准），-ㄹ 것 같다 是主观推测（"好像是……"，说话人不确定）。"매운 음식을 잘 먹는 편이에요"（算是能吃辣的，客观自我评价）vs "매운 걸 잘 먹을 것 같아요"（好像能吃辣，推测）。', differenceEn: '-는 편이다 is objective categorization ("kind of falls into this category," with a comparative basis), while -ㄹ 것 같다 is subjective speculation ("seems like..." — the speaker isn\'t sure). "매운 음식을 잘 먹는 편이에요" (I\'m pretty good at eating spicy food — objective self-assessment) vs "매운 걸 잘 먹을 것 같아요" (I think I can eat spicy food — speculation).',
  },
  {
    id: 'g73', title: '变得/最终', titleEn: 'become / end up', pattern: '-게 되다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"变成……"、"最终……了"', usageEn: 'indicates "become..." or "end up..."',
    explanation: '表示某种变化的结果或自然的演变过程。语气上弱化了动作的主动性，带有"自然而然地……"或"由于外部原因而……"的微妙语感。', explanationEn: 'Indicates the result of a change or a natural progression. It softens the sense of deliberate action, carrying a subtle nuance of "naturally..." or "due to external reasons..."',
    conjugation: '词干 + 게 되다', conjugationEn: 'stem + 게 되다',
    examples: [
      { ko: '한국에 오게 됐어요.', zh: '（各种原因导致）来到了韩国。', zhEn: '(Due to various reasons) ended up coming to Korea.', note: '变化结果：自然来到韩国', noteEn: 'Result of change: naturally came to Korea' },
      { ko: '그 사람을 좋아하게 됐어요.', zh: '（不知不觉）喜欢上了那个人。', zhEn: '(Before I knew it) ended up liking that person.', note: '变化结果：渐渐喜欢上', noteEn: 'Result of change: gradually fell for them' },
      { ko: '열심히 공부해서 한국어를 잘하게 됐어요.', zh: '努力学习后韩语变好了。', zhEn: 'After studying hard, my Korean ended up improving.', note: '变化结果：韩语变好了', noteEn: 'Result of change: Korean improved' },
    ],
    similarPatterns: ['-아/어지다'],
    difference: '-게 되다 强调结果的达成（"最终……了"），-아/어지다 强调状态的自然变化（"变得……"）。', differenceEn: '-게 되다 emphasizes the achievement of a result ("ended up..."), while -아/어지다 emphasizes a natural change in state ("became...").',
    toriTip: '🐰 -게 되다 是韩国人的万能"甩锅"句型！不用强调主观意志，而是"各种原因导致了……的结果"。"한국에 오게 됐어요"（就来了韩国）— 比"한국에 왔어요"（我来了韩国）听起来更谦虚、更自然。', toriTipEn: '🐰 -게 되다 is Koreans\' go-to "pass the buck" pattern! Instead of emphasizing personal will, it\'s "various reasons led to..." "한국에 오게 됐어요" (ended up coming to Korea) — sounds more humble and natural than "한국에 왔어요" (I came to Korea).',
  },
  {
    id: 'g74', title: '决定/约定', titleEn: 'decide / promise', pattern: '-기로 하다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"决定做……"、"约定做……"', usageEn: 'indicates "decide to do..." or "promise to do..."',
    explanation: '表达自己或团体的决定、约定、计划。通常用于陈述已经做出的决定，语气比 -(으)ㄹ 거예요 更确定。', explanationEn: 'Expresses a decision, promise, or plan made by oneself or a group. Usually states a decision already made, with a more definite tone than -(으)ㄹ 거예요.',
    conjugation: '动词词干 + 기로 하다', conjugationEn: 'verb stem + 기로 하다',
    examples: [
      { ko: '내일부터 운동을 시작하기로 했어요.', zh: '决定从明天开始运动。', zhEn: 'Decided to start exercising from tomorrow.', note: '决定：决定开始运动', noteEn: 'Decision: decided to start exercising' },
      { ko: '친구와 주말에 만나기로 했어요.', zh: '和朋友约好周末见面。', zhEn: 'Promised to meet a friend on the weekend.', note: '约定：约好周末见面', noteEn: 'Promise: agreed to meet on the weekend' },
      { ko: '한국어를 열심히 공부하기로 마음먹었어요.', zh: '下定决心努力学习韩语。', zhEn: 'Resolved to study Korean hard.', note: '决定：下决心学韩语', noteEn: 'Decision: resolved to study Korean' },
    ],
    toriTip: '🐰 -기로 하다 = "决定/约定做……"。比 -(으)ㄹ 거예요 更有确定感。"운동하기로 했어요"（决定了要运动）和"운동할 거예요"（打算运动）— 前者是已经下定决心的，后者还只是计划中。', toriTipEn: '🐰 -기로 하다 = "decide/promise to do..." It carries more certainty than -(으)ㄹ 거예요. "운동하기로 했어요" (I\'ve decided to exercise) vs "운동할 거예요" (I plan to exercise) — the former is a firm decision, the latter is still just a plan.',
    similarPatterns: ['-(으)ㄹ까 하다'],
    difference: '-기로 하다 表示已经做出的决定（"决定了……"，确定），-(으)ㄹ까 하다 表示还在考虑、未决定（"在想是不是要……"，不确定）。"부산에 가기로 했어요"（决定去釜山了）vs "부산에 갈까 해요"（在考虑要不要去釜山）。', differenceEn: '-기로 하다 indicates a decision already made ("decided to...", certain), while -(으)ㄹ까 하다 indicates still considering, undecided ("thinking about whether to...", uncertain). "부산에 가기로 했어요" (decided to go to Busan) vs "부산에 갈까 해요" (considering whether to go to Busan).',
  },
  {
    id: 'g75', title: '会不会做', titleEn: 'whether one can do it', pattern: '-(으)ㄹ 줄 알다/모르다',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"会/不会做……"（技能）或"知道/不知道将……"（预知）', usageEn: 'Indicates "know how to / don\'t know how to do..." (skill) or "know / don\'t know that... will happen" (anticipation).',
    explanation: '有两种含义：①表示是否掌握某种技能（"会不会做……"）；②表示是否预知某结果（"知道/不知道会……"）。语境决定具体含义。', explanationEn: 'Has two meanings: ① whether one has a skill ("know how to do..."); ② whether one anticipates an outcome ("know/don\'t know that... will"). Context determines the meaning.',
    conjugation: '无收音 + ㄹ 줄 알다\n有收音 + 을 줄 알다\n过去: 았/었을 줄 알다', conjugationEn: 'No batchim + ㄹ 줄 알다\\nWith batchim + 을 줄 알다\\nPast: 았/었을 줄 알다',
    examples: [
      { ko: '한국어 할 줄 알아요!', zh: '我会说韩语！（技能）', zhEn: 'I can speak Korean! (skill)', note: '技能：会说韩语', noteEn: 'Skill: can speak Korean' },
      { ko: '김치찌개 만들 줄 몰라요.', zh: '不会做泡菜锅。（技能）', zhEn: 'I don\'t know how to make kimchi stew. (skill)', note: '技能否定：不会做', noteEn: 'Skill negation: don\'t know how to' },
      { ko: '비가 올 줄 몰랐어요.', zh: '没想到会下雨。（未预知）', zhEn: 'I didn\'t expect it to rain. (not anticipated)', note: '预知：没料到会下雨', noteEn: 'Anticipation: didn\'t expect rain' },
    ],
    toriTip: '🐰 -ㄹ 줄 알다 有两种完全不同的意思：①"会做某事"（技能）→"수영할 줄 알아요"（会游泳）；②"以为会……"（预知）→"비가 올 줄 알았어요"（我以为会下雨）。根据语境判断！', toriTipEn: '🐰 -ㄹ 줄 알다 has two completely different meanings: ① "know how to do something" (skill) → "수영할 줄 알아요" (can swim); ② "thought that... would" (anticipation) → "비가 올 줄 알았어요" (I thought it would rain). Judge by context!',
    similarPatterns: ['-ㄹ/을 수 있다'],
    difference: '-(으)ㄹ 줄 알다 强调掌握方法/技能（"知道怎么做"），-ㄹ/을 수 있다 强调有能力/可能性（"能做到"）。"수영할 줄 알아요"（会游泳，掌握技能）vs "수영할 수 있어요"（能游泳，有能力/条件允许）。不会某技能用 -ㄹ 줄 모르다，没有能力/条件用 -ㄹ 수 없다。', differenceEn: '-(으)ㄹ 줄 알다 emphasizes knowing the method/skill ("know how to"), while -ㄹ/을 수 있다 emphasizes ability/possibility ("can do"). "수영할 줄 알아요" (can swim, have the skill) vs "수영할 수 있어요" (can swim, able/allowed). For not knowing a skill, use -ㄹ 줄 모르다; for lack of ability/condition, use -ㄹ 수 없다.',
  },
  {
    id: 'g76', title: '犹豫/打算', titleEn: 'hesitating/planning', pattern: '-(으)ㄹ까 하다',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示正在考虑做某事，还没有完全决定', usageEn: 'Indicates considering doing something, not fully decided yet.',
    explanation: '表达说话人正在犹豫、考虑做某事的状态。"我在想是不是要……"的语感。比 -기로 하다 更不确定，比 -고 싶다 更柔和。', explanationEn: 'Expresses the speaker\'s state of hesitating or considering doing something. Feels like "I\'m thinking about whether to...". More uncertain than -기로 하다, softer than -고 싶다.',
    conjugation: '无收音 + ㄹ까 하다\n有收音 + 을까 하다', conjugationEn: 'No batchim + ㄹ까 하다\\nWith batchim + 을까 하다',
    examples: [
      { ko: '주말에 부산에 갈까 해요.', zh: '我考虑周末去釜山。', zhEn: 'I\'m thinking about going to Busan this weekend.', note: '犹豫：考虑去釜山', noteEn: 'Hesitation: considering going to Busan' },
      { ko: '이 가방을 살까 하는데 어떡할까요?', zh: '我在想要不要买这个包，怎么办？', zhEn: 'I\'m wondering whether to buy this bag, what should I do?', note: '犹豫：要不要买包', noteEn: 'Hesitation: whether to buy the bag' },
      { ko: '그 회사에 지원해 볼까 합니다.', zh: '我在考虑要不要申请那个公司。', zhEn: 'I\'m considering whether to apply to that company.', note: '犹豫：考虑要不要投', noteEn: 'Hesitation: considering whether to apply' },
    ],
    toriTip: '🐰 -(으)ㄹ까 하다 表达"我在犹豫要不要……"。韩国人委婉表达计划的最佳选择。比"할 거예요"（要做）更柔和，给自己留了改变主意的余地。"갈까 해요"= 我琢磨着要去（但还没完全定）。', toriTipEn: '🐰 -(으)ㄹ까 하다 expresses "I\'m hesitating about whether to...". It\'s Koreans\' best choice for expressing plans politely. Softer than "할 거예요" (will do), leaving room to change your mind. "갈까 해요" = I\'m thinking of going (but not fully decided).',
    similarPatterns: ['-기로 하다'],
    difference: '-(으)ㄹ까 하다 表示还在考虑、未决定（"我在想是不是要……"），-기로 하다 表示已经决定（"我决定要……"）。"부산에 갈까 해요"（在考虑去釜山）vs "부산에 가기로 했어요"（决定去釜山了）。', differenceEn: '-(으)ㄹ까 하다 indicates still considering, undecided ("I\'m thinking about whether to..."), while -기로 하다 indicates already decided ("I decided to..."). "부산에 갈까 해요" (considering going to Busan) vs "부산에 가기로 했어요" (decided to go to Busan).',
  },
  {
    id: 'g77', title: '途中/顺便', titleEn: 'on the way / by the way', pattern: '-는 길이다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"正在去/来的路上"，或"顺便做……"', usageEn: 'Indicates being on the way to/from somewhere, or doing something along the way.',
    explanation: '表示正在前往某处的途中。常用表达：가는 길이다（正在去的路上）、오는 길이다（正在来的路上）。也可以表示"顺路顺便……"。', explanationEn: 'Indicates being on the way to somewhere. Common expressions: 가는 길이다 (on the way there), 오는 길이다 (on the way back). Can also mean \'doing something along the way.\'',
    conjugation: '动词词干 + 는 길이다\n가는 길이다 / 오는 길이다 / 돌아가는 길이다\n（不限于移动动词，퇴근하는 길에 等也可用）', conjugationEn: 'Verb stem + 는 길이다\\n가는 길이다 / 오는 길이다 / 돌아가는 길이다\\n(Not limited to movement verbs; can also be used with 퇴근하는 길에, etc.)',
    examples: [
      { ko: '지금 집에 가는 길이에요.', zh: '现在正在回家的路上。', zhEn: 'I\'m on my way home right now.', note: '途中：回家路上', noteEn: 'On the way: going home' },
      { ko: '퇴근하는 길에 슈퍼에 들렀어요.', zh: '下班路上顺便去了超市。', zhEn: 'I stopped by the supermarket on my way home from work.', note: '顺便：下班顺路买东西', noteEn: 'By the way: running errands on the way home from work' },
      { ko: '마침 오는 길이었어요. 같이 가요.', zh: '正好在来的路上，一起走吧。', zhEn: 'I\'m on my way here anyway, let\'s go together.', note: '途中：正好在来路上', noteEn: 'On the way: already on the way here' },
    ],
    similarPatterns: ['-는 중이다'],
    difference: '-는 길이다 强调"路途中"的场景（正在去/来的途中），-는 중이다 强调"动作正在进行中"（不限于移动）。"가는 길이에요"（在路上呢）vs "가는 중이에요"（正在去中，更强调动作进行）。', differenceEn: '-는 길이다 emphasizes the \'on the way\' scenario (in the middle of going/coming), while -는 중이다 emphasizes an action in progress (not limited to movement). \'가는 길이에요\' (on the way) vs \'가는 중이에요\' (in the middle of going, more emphasis on the action in progress).',
    toriTip: '🐰 -는 길이다 专用于"路上"场景。"가는 길이에요"（在去的路上）、"오는 길이에요"（在来的路上）。接电话时说"지금 가는 길이에요!"（在路上了！）— 韩国人催朋友时的标配表达。', toriTipEn: '🐰 -는 길이다 is specifically for \'on the way\' scenarios. \'가는 길이에요\' (on the way there), \'오는 길이에요\' (on the way back). When answering the phone, say \'지금 가는 길이에요!\' (I\'m on my way!) — the standard expression Koreans use when friends are rushing them.',
  },

  // =====================================================================
  //  CATEGORY: 인용 (Quotation / 引用)
  // =====================================================================

  {
    id: 'g78', title: '间接引语', titleEn: 'Indirect speech', pattern: '-다고/라고/냐고/자고',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '인용',
    usage: '转述他人的话或自己的想法', usageEn: 'Reporting someone else\'s words or one\'s own thoughts',
    explanation: '用于引述陈述、疑问、命令、请求等。口语中常缩写为 -대요/-래요/-냬요/-재요。', explanationEn: 'Used to quote statements, questions, commands, requests, etc. In spoken language, often abbreviated to -대요/-래요/-냬요/-재요.',
    conjugation: '陈述：动词 + ㄴ/는다고、形容词 + 다고、名词 + (이)라고\n疑问：-냐고/느냐고\n命令：-(으)라고\n请诱：-자고', conjugationEn: 'Statements: verb + ㄴ/는다고, adjective + 다고, noun + (이)라고\\nQuestions: -냐고/느냐고\\nCommands: -(으)라고\\nSuggestions: -자고',
    examples: [
      { ko: '친구가 내일 온다고 했어요.', zh: '朋友说明天来。', zhEn: 'My friend said they\'re coming tomorrow.', note: '陈述引语：朋友说来', noteEn: 'Statement quote: friend said coming' },
      { ko: '엄마가 뭐 먹었냐고 물어봤어요.', zh: '妈妈问我吃了什么。', zhEn: 'Mom asked me what I ate.', note: '疑问引语：转述问句', noteEn: 'Question quote: reporting a question' },
      { ko: '선생님이 숙제하라고 하셨어요.', zh: '老师让我们做作业。', zhEn: 'The teacher told us to do our homework.', note: '命令引语：老师让做作业', noteEn: 'Command quote: teacher told to do homework' },
    ],
    toriTip: '🐰 间接引语是韩语里的"转述神器"。四种类型记住：陈述 = -다고、疑问 = -냐고、命令 = -라고、提议 = -자고。口语里常缩略成 -대요/-냬요/-래요/-재요，更常用的是缩略版。', toriTipEn: '🐰 Indirect speech is Korean\'s \'quoting tool.\' Remember the four types: statements = -다고, questions = -냐고, commands = -라고, suggestions = -자고. In spoken Korean, these are often shortened to -대요/-냬요/-래요/-재요, and the shortened versions are more common.',
    similarPatterns: ['-대요/-래요/-냬요/-재요'],
    difference: '-다고/라고/냐고/자고 해요 是完整形式（书面、正式或强调时用），-대요/-래요/-냬요/-재요 是口语缩略形式（日常对话更常用）。意思完全相同，只是语体差异。"온다고 해요"= "온대요"，"오라고 해요"= "오래요"。', differenceEn: '-다고/라고/냐고/자고 해요 is the full form (used in writing, formal speech, or for emphasis), while -대요/-래요/-냬요/-재요 is the spoken abbreviated form (more common in everyday conversation). The meaning is identical, just a difference in register. \'온다고 해요\' = \'온대요\', \'오라고 해요\' = \'오래요\'.',
  },
  {
    id: 'g79', title: '间接引语缩略形', titleEn: 'Abbreviated form of indirect speech', pattern: '-대요 / -래요 / -냬요 / -재요',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '인용',
    usage: '口语中常用的间接引语缩写形式', usageEn: 'Common abbreviated forms of indirect quotation in spoken language',
    explanation: '在口语中 -다고 해요 缩略为 -대요，-라고 해요 缩略为 -래요，-냐고 해요 缩略为 -냬요，-자고 해요 缩略为 -재요。这些缩略形式在日常对话中频率极高。', explanationEn: 'In spoken Korean, -다고 해요 is shortened to -대요, -라고 해요 to -래요, -냐고 해요 to -냬요, and -자고 해요 to -재요. These shortened forms are extremely common in everyday conversation.',
    conjugation: '陈述：-ㄴ/는대요 (动词)、-대요 (形容词)、-(이)래요 (名词)\n疑问：-냬요\n命令：-(으)래요\n请诱：-재요', conjugationEn: 'Statement: -ㄴ/는대요 (verbs), -대요 (adjectives), -(이)래요 (nouns)\\nQuestion: -냬요\\nCommand: -(으)래요\\nSuggestion: -재요',
    examples: [
      { ko: '내일 비 온대요.', zh: '听说明天要下雨。', zhEn: 'I heard it\'s going to rain tomorrow.', note: '缩略陈述引语：听说下雨', noteEn: 'Abbreviated statement quote: heard it\'s raining' },
      { ko: '친구가 같이 밥 먹재요.', zh: '朋友说一起吃饭吧。', zhEn: 'My friend said let\'s eat together.', note: '缩略提议引语：说一起吃', noteEn: 'Abbreviated suggestion quote: said to eat together' },
      { ko: '엄마가 뭐 하냬요.', zh: '妈妈问我在干嘛。', zhEn: 'Mom asked what I was doing.', note: '缩略疑问引语：问干嘛', noteEn: 'Abbreviated question quote: asked what doing' },
      { ko: '선생님이 조용하래요.', zh: '老师说要安静。', zhEn: 'The teacher said to be quiet.', note: '缩略命令引语：让安静', noteEn: 'Abbreviated command quote: told to be quiet' },
    ],
    toriTip: '🐰 日常口语中，韩国人几乎不用 -다고 해요 全称，直接说缩略版！"비 온대"（听说要下雨）、"밥 먹재"（说一起吃饭）、"뭐 하냬"（问在干嘛）。学会缩略版，听力瞬间提升一个档次。', toriTipEn: '🐰 In everyday speech, Koreans almost never use the full -다고 해요 form—they just say the shortened version! "비 온대" (heard it\'s raining), "밥 먹재" (said let\'s eat), "뭐 하냬" (asked what doing). Learn the shortened forms and your listening comprehension will instantly level up.',
    similarPatterns: ['-다고/라고/냐고/자고'],
    difference: '-대요/-래요/-냬요/-재요 是口语缩略形式（日常对话首选），-다고/라고/냐고/자고 해요 是完整形式（书面或正式场合）。两者意思相同，只是语体不同。听韩国人说话大量出现缩略版，写作时用完整版。', differenceEn: '-대요/-래요/-냬요/-재요 are spoken shortened forms (preferred in daily conversation), while -다고/라고/냐고/자고 해요 are the full forms (used in writing or formal settings). They mean the same thing, just differ in register. You\'ll hear the shortened versions constantly when listening to Koreans, but use the full forms in writing.',
  },
  {
    id: 'g80', title: '疑问间接', titleEn: 'Indirect question', pattern: '-(으)ㄴ/는지',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '인용',
    usage: '表示疑问内容的间接引用或不确定', usageEn: 'Indirect quotation of a question or expression of uncertainty',
    explanation: '用于间接引用疑问句，或表达"不知道/不确定……"的内容。常与 알다/모르다（知道/不知道）、기억나다（记得）等搭配。', explanationEn: 'Used to indirectly quote a question, or to express "not knowing/being unsure about..." Often paired with 알다/모르다 (know/don\'t know), 기억나다 (remember), etc.',
    conjugation: '动词现在: 는지\n形容词: (으)ㄴ지\n过去: 았/었는지\n名词: 인지', conjugationEn: 'Verb present: 는지\\nAdjective: (으)ㄴ지\\nPast: 았/었는지\\nNoun: 인지',
    examples: [
      { ko: '그 사람이 누군지 몰라요.', zh: '不知道那个人是谁。', zhEn: 'I don\'t know who that person is.', note: '疑问间接：不知道是谁', noteEn: 'Indirect question: don\'t know who' },
      { ko: '내일 날씨가 좋을지 모르겠어요.', zh: '不知道明天天气好不好。', zhEn: 'I don\'t know if the weather will be good tomorrow.', note: '不确定：不知道天气', noteEn: 'Uncertainty: don\'t know weather' },
      { ko: '이 김치찌개가 너무 매운지 입에서 불이 나요.', zh: '不知道是不是这泡菜锅太辣了，嘴像着了火。', zhEn: 'I don\'t know if this kimchi stew is too spicy—my mouth is on fire.', note: '不确定原因：不知是否太辣', noteEn: 'Uncertain cause: not sure if too spicy' },
    ],
    toriTip: '🐰 -는지 最常和 모르다（不知道）搭配。"언제 끝날지 몰라요"（不知道什么时候结束）、"누가 올지 몰라요"（不知道谁会来）。你的日常"不确定"表达全靠它。', toriTipEn: '🐰 -는지 is most often paired with 모르다 (don\'t know). "언제 끝날지 몰라요" (don\'t know when it\'ll end), "누가 올지 몰라요" (don\'t know who\'ll come). It\'s your go-to for expressing "not sure" in daily life.',
    similarPatterns: ['-다고/라고/냐고/자고'],
    difference: '-(으)ㄴ/는지 引用疑问内容或表达不确定（"不知道……"，常搭配 모르다/알다），-냐고 是转述他人的疑问（"某人问……"）。"언제 오는지 몰라요"（不知道什么时候来，自己不确定）vs "언제 오냐고 물어봤어요"（问了什么时候来，转述问话）。', differenceEn: '-(으)ㄴ/는지 quotes question content or expresses uncertainty ("don\'t know...", often with 모르다/알다), while -냐고 relays someone else\'s question ("someone asked..."). "언제 오는지 몰라요" (don\'t know when coming—my own uncertainty) vs "언제 오냐고 물어봤어요" (asked when coming—relaying a question).',
  },

  // =====================================================================
  //  CATEGORY: 사동/피동 (Causative/Passive / 使动被动)
  // =====================================================================

  {
    id: 'g81', title: '间接使动', titleEn: 'Indirect causative', pattern: '-게 하다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '사동/피동',
    usage: '表示使动，"让……做……"', usageEn: 'Causative: "make/let someone do something"',
    explanation: '接在动词/形容词后，表示使别人做某事或使某物处于某种状态。是非直接使动（-이/히/리/기/우 是直接使动）。', explanationEn: 'Attaches after verbs/adjectives to indicate making someone do something or causing something to be in a certain state. This is the indirect causative (-이/히/리/기/우 are direct causatives).',
    conjugation: '词干 + 게 하다', conjugationEn: 'Stem + 게 하다',
    examples: [
      { ko: '선생님이 학생들에게 책을 읽게 했어요.', zh: '老师让学生们读书。', zhEn: 'The teacher has the students read.', note: '间接使动：让学生读书', noteEn: 'Indirect causative: make students read' },
      { ko: '엄마가 아이에게 밥을 먹게 했어요.', zh: '妈妈让孩子吃饭。', zhEn: 'Mom makes the child eat.', note: '间接使动：让孩子吃饭', noteEn: 'Indirect causative: make the child eat' },
      { ko: '음악이 나를 행복하게 해요.', zh: '音乐让我幸福。', zhEn: 'Music makes me happy.', note: '间接使动：使我感到幸福', noteEn: 'Indirect causative: make me feel happy' },
    ],
    toriTip: '🐰 -게 하다 = "让……做……"。和形容词搭配也很常用："행복하게 해요"（让我幸福）、"슬프게 해요"（让我伤心）。韩剧OST歌词里这个用法超多。', toriTipEn: '🐰 -게 하다 = "make/let someone do something." It\'s also commonly used with adjectives: "행복하게 해요" (make me happy), "슬프게 해요" (make me sad). This usage is super common in K-drama OST lyrics.',
    similarPatterns: ['-이/히/리/기-'],
    difference: '-게 하다 是间接使动（任何动词/形容词都能用，结构灵活），-이/히/리/기 是直接使动（只有特定动词有对应形式，更简洁）。"밥을 먹게 했어요"（让吃了饭，间接）= "밥을 먹였어요"（喂了饭，直接）。没有直接使动形式的动词只能用 -게 하다。', differenceEn: '-게 하다 is the indirect causative (works with any verb/adjective, flexible structure), while -이/히/리/기 is the direct causative (only specific verbs have corresponding forms, more concise). "밥을 먹게 했어요" (made someone eat, indirect) = "밥을 먹였어요" (fed someone, direct). Verbs without a direct causative form can only use -게 하다.',
  },
  {
    id: 'g82', title: '直接被动/使动', titleEn: 'Direct passive/causative', pattern: '-이/히/리/기-',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '사동/피동',
    usage: '表示被动（"被……"）或直接使动', usageEn: 'Indicates passive ("be...") or direct causative',
    explanation: '韩语的被动/使动由词干 + 이/히/리/기 构成。不是所有动词都能变被动/使动。被动：主语被动接受动作；使动：主语让他人做某事。', explanationEn: 'Korean passive/causative is formed with stem + 이/히/리/기. Not all verbs can become passive/causative. Passive: subject passively receives the action; Causative: subject makes someone else do something.',
    conjugation: '【被动】词干 + 이/히/리/기（主语被动接受）\n이: 보다→보이다, 쓰다→쓰이다\n히: 읽다→읽히다, 먹다→먹히다\n리: 열다→열리다, 듣다→들리다\n기: 끊다→끊기다, 안다→안기다\n【使动】词干 + 이/히/리/기（主语让他人做）\n이: 먹다→먹이다（喂食）, 보다→보이다（给……看）\n히: 앉다→앉히다（让坐）, 읽다→읽히다（让读）\n리: 울다→울리다（让哭）, 날다→날리다（让飞）\n기: 웃다→웃기다（逗笑）, 벗다→벗기다（让脱）', conjugationEn: '【Passive】Stem + 이/히/리/기 (subject passively receives action)\\n이: 보다→보이다, 쓰다→쓰이다\\n히: 읽다→읽히다, 먹다→먹히다\\n리: 열다→열리다, 듣다→들리다\\n기: 끊다→끊기다, 안다→안기다\\n【Causative】Stem + 이/히/리/기 (subject makes someone else do)\\n이: 먹다→먹이다 (feed), 보다→보이다 (show)\\n히: 앉다→앉히다 (make sit), 읽다→읽히다 (make read)\\n리: 울다→울리다 (make cry), 날다→날리다 (make fly)\\n기: 웃다→웃기다 (make laugh), 벗다→벗기다 (make take off)',
    examples: [
      { ko: '문이 열렸어요.', zh: '门被打开了。（被动）', zhEn: 'The door was opened. (Passive)', note: '被动：门被打开', noteEn: 'Passive: the door was opened' },
      { ko: '멀리서 음악 소리가 들려요.', zh: '从远处传来音乐声。（被动）', zhEn: 'Music can be heard from afar. (Passive)', note: '被动：声音被听到', noteEn: 'Passive: the sound is heard' },
      { ko: '엄마가 아이에게 밥을 먹였어요.', zh: '妈妈喂孩子吃饭了。（使动）', zhEn: 'Mom fed the child. (Causative)', note: '使动：喂孩子吃饭', noteEn: 'Causative: feed the child' },
      { ko: '선생님이 학생들에게 책을 읽혔어요.', zh: '老师让学生们读书。（使动）', zhEn: 'The teacher made the students read. (Causative)', note: '使动：让学生读书', noteEn: 'Causative: make students read' },
      { ko: '그 개그맨은 항상 사람들을 웃겨요.', zh: '那个喜剧演员总是逗大家笑。（使动）', zhEn: 'That comedian always makes everyone laugh. (Causative)', note: '使动：逗大家笑', noteEn: 'Causative: make everyone laugh' },
    ],
    toriTip: '🐰 韩语被动和使动用的是同一套后缀，区分靠语境！"먹이다"——妈妈喂孩子是使动，"먹히다"——食物被吃是被动。高频被动词值得单独背：보이다/들리다/열리다/팔리다/잡히다。', toriTipEn: '🐰 In Korean, passive and causative use the same suffixes—context tells them apart! "먹이다"—mom feeding a child is causative, "먹히다"—food being eaten is passive. High-frequency passive verbs are worth memorizing separately: 보이다/들리다/열리다/팔리다/잡히다.',
    similarPatterns: ['-게 하다', '-아/어지다'],
    difference: '-이/히/리/기 使动 是直接使动（主语直接让某人做，动词形式固定），-게 하다 是间接使动（万能，任何动词均可）；-이/히/리/기 被动 是直接被动，-아/어지다 是自然变化被动（强调状态渐变）。"문을 열었어요"（开门，主动）→"문이 열렸어요"（门被开了，直接被动）vs "문이 열려졌어요"（❌双重被动，禁止）。', differenceEn: '-이/히/리/기 causative is direct (subject directly makes someone do something, fixed verb form), -게 하다 is indirect (universal, works with any verb); -이/히/리/기 passive is direct passive, -아/어지다 is natural-change passive (emphasizes gradual state change). "문을 열었어요" (opened the door, active) → "문이 열렸어요" (the door was opened, direct passive) vs "문이 열려졌어요" (❌ double passive, forbidden).',
  },
  {
    id: 'g83', title: '变化/被动结果', titleEn: 'Change/passive result', pattern: '-아/어지다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '사동/피동',
    usage: '表示"变得……"或自然被动的结果', usageEn: 'Indicates "becomes..." or a natural passive result',
    explanation: '-아/어지다 有两个核心用法：①与形容词结合表示"变得……"（状态变化）；②与部分动词结合表示某种自然而然的被动结果。', explanationEn: '-아/어지다 has two core uses: ① with adjectives, it means "becomes..." (state change); ② with some verbs, it indicates a natural passive result.',
    conjugation: '形容词/动词词干 + 아/어지다', conjugationEn: 'Adjective/verb stem + 아/어지다',
    examples: [
      { ko: '날씨가 따뜻해졌어요.', zh: '天气变暖和了。', zhEn: 'The weather is getting warmer.', note: '变化：天气变暖', noteEn: 'Change: weather gets warmer' },
      { ko: '방이 깨끗해졌어요.', zh: '房间变干净了。', zhEn: 'The room got clean.', note: '变化：房间变干净', noteEn: 'Change: room becomes clean' },
      { ko: '한국 생활이 많이 익숙해졌어요.', zh: '韩国生活变得很习惯了。', zhEn: 'Life in Korea has become familiar.', note: '变化：生活变习惯', noteEn: 'Change: life becomes familiar' },
      { ko: '이 책은 쉽게 읽히지 않아요.', zh: '这本书不容易读。', zhEn: 'This book isn\'t easy to read.', note: '被动结果：不容易被读', noteEn: 'Passive result: not easily read' },
    ],
    toriTip: '🐰 -아/어지다 和形容词搭配表示"变得……"：좋다→좋아지다（变好）、예쁘다→예뻐지다（变漂亮）。这是描述变化的万能语法！"한국어가 점점 재미있어져요"（韩语越来越有趣了）— 学韩语的你一定会用到这句话。', toriTipEn: '🐰 -아/어지다 with adjectives means "becomes...": 좋다→좋아지다 (gets better), 예쁘다→예뻐지다 (gets prettier). It\'s the go-to grammar for describing change! "한국어가 점점 재미있어져요" (Korean is getting more and more fun)—you\'ll definitely use this sentence as a Korean learner.',
  },

  // =====================================================================
  //  批量提炼扩充 B1（P1-P6，初级/中级补充）
  // =====================================================================

  // src: card-p2-l03
  {
    id: 'g84', title: '共动句', titleEn: 'Cohortative sentence', pattern: '-ㅂ시다/읍시다',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '어미',
    usage: '提议"我们一起……吧"', usageEn: 'Proposing "let\'s... together"',
    explanation: '共动句终结语尾，用于提议大家一起做某事，相当于中文的"（我们）……吧"。属于正式敬语体（합쇼체），语气比 -아/어요 更郑重。日常口语中提议一起做某事更常用 -아/어요（如"같이 가요"）或 -(으)ㄹ까요，-ㅂ시다 略显正式，对长辈慎用。', explanationEn: 'A cohortative ending used to propose doing something together, equivalent to "let\'s..." in English. It\'s in the formal polite style (합쇼체), more solemn than -아/어요. In everyday speech, -아/어요 (like "같이 가요") or -(으)ㄹ까요 is more common for suggestions; -ㅂ시다 is a bit formal, so use it cautiously with elders.',
    conjugation: '无收音词干 + ㅂ시다 (가다→갑시다)\n有收音词干 + 읍시다 (먹다→먹읍시다)\nㄹ收音脱落 + ㅂ시다 (놀다→놉시다)', conjugationEn: 'Stem without batchim + ㅂ시다 (가다→갑시다)\\nStem with batchim + 읍시다 (먹다→먹읍시다)\\nㄹ batchim drops + ㅂ시다 (놀다→놉시다)',
    examples: [
      { ko: '같이 한국어 공부합시다!', zh: '我们一起学韩语吧！', zhEn: 'Let\'s learn Korean together!', note: '提议：一起学习', noteEn: 'Proposal: study together' },
      { ko: '같이 따라 불러 봅시다!', zh: '我们一起跟着唱吧！', zhEn: 'Let\'s sing along together!', note: '提议：一起跟唱', noteEn: 'Proposal: sing along together' },
      { ko: '내일 아침에 같이 운동합시다!', zh: '明天早上一起运动吧！', zhEn: 'Let\'s exercise together tomorrow morning!', note: '提议：一起运动', noteEn: 'Proposal: exercise together' },
    ],
    similarPatterns: ['-(으)ㄹ까요?', '-아/어요'],
    difference: '-ㅂ시다 是较正式的共动句（"我们……吧"，直接提议），-(으)ㄹ까요 更柔和（"……好吗？"，征求意见）。对长辈或需要客气时用 -(으)ㄹ까요 或 -(으)시겠어요 更得体，-ㅂ시다 带有一点号召/命令的语气，多用于平辈或对下。', differenceEn: '-ㅂ시다 is a more formal cohortative ("let\'s...", direct suggestion), while -(으)ㄹ까요 is softer ("shall we...?", asking for input). For elders or when being polite, -(으)ㄹ까요 or -(으)시겠어요 is more appropriate; -ㅂ시다 has a slightly rallying/commanding tone, used mostly with peers or those below you.',
    toriTip: '🐰 -ㅂ시다 是"一起……吧"，但语气比想象中正式，别对长辈用。和朋友说"一起走吧"，用"같이 가요"更自然；正式场合或带头号召时才用"갑시다"。', toriTipEn: '🐰 -ㅂ시다 means "let\'s...", but it\'s more formal than you\'d think—don\'t use it with elders. With friends, "같이 가요" is more natural; use "갑시다" in formal settings or when leading a call to action.',
  },

  // src: card-p2-l05
  {
    id: 'g85', title: '限定助词', titleEn: 'Limiting particle', pattern: '만',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '조사',
    usage: '表示"只、仅仅"，限定范围', usageEn: 'Indicates "only, just," limiting the scope',
    explanation: '만 接在名词后，表示"只有、仅仅"，把范围限定在这一项。可以替代或叠加在其他助词上（如 만을、만이、에만、만 하다）。强调"除此之外没有别的"。', explanationEn: '만 attaches to nouns to mean "only, just," limiting the scope to that one thing. It can replace or stack with other particles (like 만을, 만이, 에만, 만 하다). It emphasizes "nothing else besides this."',
    conjugation: '名词 + 만 (直接加，不受收音影响)\n可与其他助词叠加：에만、만을、만이', conjugationEn: 'Noun + 만 (attached directly, regardless of final consonant)\\nCan stack with other particles: 에만, 만을, 만이',
    examples: [
      { ko: '저는 커피만 마셔요. 차는 별로예요.', zh: '我只喝咖啡，茶不太喜欢。', zhEn: 'I only drink coffee; I don\'t really like tea.', note: '限定：只喝咖啡', noteEn: 'Limit: only drink coffee' },
      { ko: '오늘만 특별 할인이에요!', zh: '只有今天是特别折扣！', zhEn: 'Only today is a special discount!', note: '限定：仅限今天', noteEn: 'Limit: only today' },
      { ko: '집에 물만 있어요. 장 보러 가야 해요.', zh: '家里只有水了，得去买菜。', zhEn: 'There\'s only water left at home; I need to go buy groceries.', note: '限定：只剩水', noteEn: 'Limit: only water left' },
    ],
    similarPatterns: ['도', '밖에'],
    difference: '만 表示"只"（肯定语气，"只有这个"），밖에 也表示"只"但必须接否定谓语（"물밖에 없어요"＝只有水／除了水没别的）。도 相反，表示"也、还"（添加）。"커피만 마셔요"（只喝咖啡）vs "커피도 마셔요"（咖啡也喝）。', differenceEn: '만 means "only" (affirmative, "just this"), while 밖에 also means "only" but requires a negative predicate ("물밖에 없어요" = only water / nothing but water). 도, on the other hand, means "also, too" (additive). "커피만 마셔요" (only drink coffee) vs "커피도 마셔요" (also drink coffee).',
    toriTip: '🐰 만 = "只"，超好用。"이것만 주세요"（只要这个）、"조금만요"（就一点点）。想说"除了…没有"时，换成 밖에 + 否定："시간이 조금밖에 없어요"（只有一点点时间）。', toriTipEn: '🐰 만 = "only," super handy. "이것만 주세요" (just this), "조금만요" (just a little). To say "nothing but...", switch to 밖에 + negative: "시간이 조금밖에 없어요" (only a little time).',
  },

  // src: card-p2-l02
  {
    id: 'g86', title: '存在句', titleEn: 'Existential sentence', pattern: '이/가 있다/없다',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '문형',
    usage: '表示"有/没有"、"在/不在"', usageEn: 'Expresses "have/don\'t have" and "be here/not here"',
    explanation: '있다（有/在）和 없다（没有/不在）是韩语最基础的存在动词。表示事物的存在或所有：主语 + 이/가 + 있다/없다。既能表示"有没有"（所有），也能表示"在不在"（存在位置，常与 에 搭配）。', explanationEn: '있다 (have/be) and 없다 (not have/not be) are Korean\'s most basic existential verbs. They express existence or possession: subject + 이/가 + 있다/없다. They can mean "have or not" (possession) or "be here or not" (location, often with 에).',
    conjugation: '有收音名词 + 이 있다/없다 (시간이 있어요)\n无收音名词 + 가 있다/없다 (차가 없어요)\n位置：장소 + 에 + 있다/없다', conjugationEn: 'Noun with final consonant + 이 있다/없다 (시간이 있어요)\\nNoun without final consonant + 가 있다/없다 (차가 없어요)\\nLocation: place + 에 + 있다/없다',
    examples: [
      { ko: '제 휴대폰이 어디에 있어요?', zh: '我的手机在哪里？', zhEn: 'Where is my phone?', note: '存在位置：手机在哪', noteEn: 'Location: where\'s the phone' },
      { ko: '내일 시간이 있어요? 같이 카페에 가요!', zh: '明天有时间吗？一起去咖啡店！', zhEn: 'Do you have time tomorrow? Let\'s go to a café together!', note: '所有：有没有时间', noteEn: 'Possession: do you have time' },
      { ko: '책상 위에 책하고 커피가 있어요.', zh: '桌子上有书和咖啡。', zhEn: 'There are books and coffee on the table.', note: '存在位置：桌上有东西', noteEn: 'Location: something\'s on the table' },
    ],
    similarPatterns: ['에', '계시다'],
    difference: '있다/없다 用于事物或平辈（"친구가 있어요"有朋友）；主语是需要尊敬的人时，"在"要用敬语动词 계시다（"할머니께서 계세요"奶奶在）。表示所有时敬语用 있으시다（"시간이 있으세요?"您有时间吗）。', differenceEn: '있다/없다 is used for things or peers ("친구가 있어요" I have a friend); when the subject is someone to be respected, "be here" uses the honorific verb 계시다 ("할머니께서 계세요" Grandma is here). For possession, the honorific is 있으시다 ("시간이 있으세요?" Do you have time?).',
    toriTip: '🐰 있다/없다 是你最早学会的两个动词！"있어요"＝有/在，"없어요"＝没有/不在。问路、问时间、找东西全靠它。注意：尊敬的人"在"要用 계시다，不能说"할머니가 있어요"。', toriTipEn: '🐰 있다/없다 are the first two verbs you\'ll learn! "있어요" = have/be here, "없어요" = don\'t have/not here. Asking directions, time, or finding things all rely on it. Note: for someone respected, "be here" uses 계시다, not "할머니가 있어요".',
  },

  // src: card-p3-l02
  {
    id: 'g87', title: '大过去时', titleEn: 'Pluperfect tense', pattern: '-았었/었었/였었-',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '시제',
    usage: '表示"以前曾经……（现在已不同）"', usageEn: 'Expresses "used to... (but now it\'s different)"',
    explanation: '在过去时 -았/었 后再加 -었-，构成"大过去时"，强调某事发生在过去且与现在的状态形成对比（"以前是那样，现在不一样了"）。带有"那已经是过去、如今已改变"的语感。', explanationEn: 'Adding -었- after the past tense -았/었 forms the "pluperfect," emphasizing that something happened in the past and contrasts with the present state ("it used to be that way, but now it\'s different"). It carries the nuance of "that\'s in the past, things have changed."',
    conjugation: '词干元音 ㅏ/ㅗ → 았었 (살다→살았었다)\n其他元音 → 었었 (먹다→먹었었다)\n하다 → 했었 (공부하다→공부했었다)', conjugationEn: 'Stem vowel ㅏ/ㅗ → 았었 (살다→살았었다)\\nOther vowels → 었었 (먹다→먹었었다)\\n하다 → 했었 (공부하다→공부했었다)',
    examples: [
      { ko: '예전에 한국어를 공부했었어요.', zh: '以前学过韩语。', zhEn: 'I used to study Korean.', note: '大过去：以前学过（现在没学了）', noteEn: 'Pluperfect: used to study (not anymore)' },
      { ko: '예전에 서울에 살았었어요.', zh: '以前在首尔住过。', zhEn: 'I used to live in Seoul.', note: '大过去：曾住首尔（现已搬走）', noteEn: 'Pluperfect: used to live in Seoul (moved away)' },
      { ko: '어렸을 때 이 동네에 살았었어요. 지금은 다른 곳에 살아요.', zh: '小时候住在这个小区，现在住在别的地方了。', zhEn: 'I used to live in this neighborhood as a kid, but now I live elsewhere.', note: '对比：过去与现在不同', noteEn: 'Contrast: past vs. present difference' },
    ],
    similarPatterns: ['-았/었-', '-던'],
    difference: '-았었 强调"过去发生且如今已改变"的断裂感（"살았었어요"以前住过、现在不住了）；-았/었 是单纯完成过去（"살았어요"住过，不强调对比）；-던 带回想色彩（"살던 집"以前住的房子，怀念）。想突出"今非昔比"时用 -았었。', differenceEn: '-았었 emphasizes the break of "happened in the past and has since changed" ("살았었어요" used to live there, not anymore); -았/었 is simply completed past ("살았어요" lived there, no contrast implied); -던 has a nostalgic tone ("살던 집" the house I used to live in). Use -았었 to highlight "things are different now."',
    toriTip: '🐰 -았었 = 过去时再加一层"但现在不一样了"。"서울에 살았어요"只是说住过，"서울에 살았었어요"暗示"现在不住了"。想强调物是人非的对比，就叠这一层。', toriTipEn: '🐰 -았었 = past tense plus an extra layer of "but now it\'s different." "서울에 살았어요" just says you lived there, "서울에 살았었어요" implies "I don\'t live there now." To emphasize how things have changed, stack this layer.',
  },

  // src: card-p5-l01
  {
    id: 'g88', title: '意图条件', titleEn: 'Intentional condition', pattern: '-(으)려면',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '연결',
    usage: '表示"要想……的话，就得……"', usageEn: 'Means \'if you want to... you have to...\'',
    explanation: '由 -(으)려고 하면 缩略而来，表示"如果打算/想要做某事的话"，后句通常给出为达成该目的所需的条件、方法或建议。前句是意图，后句是必要条件。', explanationEn: 'Shortened from -(으)려고 하면, meaning \'if you intend/want to do something.\' The following clause usually gives the condition, method, or advice needed to achieve that goal. The first clause is the intention, the second is the necessary condition.',
    conjugation: '无收音/ㄹ词干 + 려면 (가다→가려면)\n有收音词干 + 으려면 (먹다→먹으려면)', conjugationEn: 'No batchim/ㄹ stem + 려면 (가다→가려면)\\nBatchim stem + 으려면 (먹다→먹으려면)',
    examples: [
      { ko: '한국어를 잘하려면 매일 연습해야 해요.', zh: '想把韩语学好，就要每天练习。', zhEn: 'If you want to get good at Korean, you need to practice every day.', note: '意图条件：想学好就得练', noteEn: 'Intentional condition: To learn well, you have to practice' },
      { ko: '이 노래를 부르려면 가사를 먼저 봐야 해요.', zh: '想唱这首歌，就要先看歌词。', zhEn: 'If you want to sing this song, you need to look at the lyrics first.', note: '意图条件：想唱就先看词', noteEn: 'Intentional condition: To sing, first look at the lyrics' },
      { ko: '시험에 합격하려면 열심히 공부해야 해요.', zh: '想通过考试，就要努力学习。', zhEn: 'If you want to pass the exam, you need to study hard.', note: '意图条件：想合格就用功', noteEn: 'Intentional condition: To pass, you have to study hard' },
    ],
    similarPatterns: ['-(으)면', '-(으)려고'],
    difference: '-(으)려면 专指"为了实现某意图的条件"（"합격하려면 공부해야 해요"想合格就得学，前句是目的），-(으)면 是一般条件（"시간이 있으면"如果有时间，不含意图）。后句常搭配 -아/어야 하다（必须）给出方法。', differenceEn: '-(으)려면 specifically means \'the condition to achieve an intention\' (e.g., \'합격하려면 공부해야 해요\' to pass, you must study—the first clause is the goal), while -(으)면 is a general condition (e.g., \'시간이 있으면\' if there\'s time, no intention involved). The second clause often pairs with -아/어야 하다 (must) to give the method.',
    toriTip: '🐰 -(으)려면 后面几乎总跟"该怎么做"。"살을 빼려면 운동해야 돼요"（想减肥就得运动）。想说"要想…就得…"，这个句型一步到位。', toriTipEn: '🐰 -(으)려면 is almost always followed by \'what to do.\' E.g., \'살을 빼려면 운동해야 돼요\' (to lose weight, you have to exercise). Want to say \'if you want to... you have to...\'? This pattern nails it.',
  },

  // src: card-p5-l03
  {
    id: 'g89', title: '意图/打算', titleEn: 'Intention/plan', pattern: '-(으)려고 하다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"打算/想要做……"', usageEn: 'Means \'intend to / want to do...\'',
    explanation: '接在动词后，表示说话人的意图或计划（"打算做……"），也可表示某事即将发生的趋势（"眼看要……"）。比 -(으)ㄹ 거예요 更强调"意图/心里的打算"。', explanationEn: 'Attached to verbs, it expresses the speaker\'s intention or plan (\'intend to do...\'), and can also indicate something is about to happen (\'on the verge of...\'). It emphasizes \'intention/inner plan\' more than -(으)ㄹ 거예요.',
    conjugation: '无收音/ㄹ词干 + 려고 하다 (가다→가려고 하다)\n有收音词干 + 으려고 하다 (먹다→먹으려고 하다)', conjugationEn: 'No batchim/ㄹ stem + 려고 하다 (가다→가려고 하다)\\nBatchim stem + 으려고 하다 (먹다→먹으려고 하다)',
    examples: [
      { ko: '오늘 단어를 복습하려고 해요.', zh: '今天打算复习单词。', zhEn: 'I plan to review vocabulary today.', note: '打算：打算复习', noteEn: 'Plan: Planning to review' },
      { ko: '이 노래를 따라 하려고 해요.', zh: '打算跟唱这首歌。', zhEn: 'I plan to sing along to this song.', note: '打算：打算跟唱', noteEn: 'Plan: Planning to sing along' },
      { ko: '시험이 있어서 복습하려고 해요.', zh: '因为有考试，所以打算复习。', zhEn: 'I plan to review because there\'s an exam.', note: '打算：因考试打算复习', noteEn: 'Plan: Planning to study for the exam' },
    ],
    similarPatterns: ['-(으)ㄹ 거예요', '-기로 하다'],
    difference: '-(으)려고 하다 强调"心里的意图/打算"（可能还没最终定，也可表示即将发生）；-(으)ㄹ 거예요 是较确定的计划或推测；-기로 하다 是已下定的决定/约定。"가려고 해요"（打算去、想去）vs "가기로 했어요"（决定去了）。', differenceEn: '-(으)려고 하다 emphasizes \'inner intention/plan\' (may not be final, can also indicate imminent action); -(으)ㄹ 거예요 is a more definite plan or guess; -기로 하다 is a firm decision/commitment. \'가려고 해요\' (planning to go, want to go) vs \'가기로 했어요\' (decided to go).',
    toriTip: '🐰 -(으)려고 하다 = "打算…"。还有个隐藏用法：表示"眼看要…"，如"비가 오려고 해요"（眼看要下雨了）。看到乌云密布时就能用上。', toriTipEn: '🐰 -(으)려고 하다 = \'plan to...\' It also has a hidden use: indicating \'about to...\' like \'비가 오려고 해요\' (it\'s about to rain). Perfect when you see dark clouds.',
  },

  // src: card-p5-l06
  {
    id: 'g90', title: '请求/施惠', titleEn: 'Request/favor', pattern: '-아/어 주다',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '문형',
    usage: '表示"（请）为我做……"、"帮……做……"', usageEn: 'Means \'(please) do... for me\' or \'help do...\'',
    explanation: '动词 + 아/어 주다，表示为对方或替对方做某事。命令形 -아/어 주세요 是最常用的礼貌请求（"请帮我……"）。对长辈或尊者要把 주다 换成敬语 드리다（见"-아/어 드리다"）。', explanationEn: 'Verb + 아/어 주다 means doing something for or on behalf of someone. The imperative form -아/어 주세요 is the most common polite request (\'please... for me\'). For elders or superiors, replace 주다 with the honorific 드리다 (see \'-아/어 드리다\').',
    conjugation: '词干元音 ㅏ/ㅗ → 아 주다 (사다→사 주다)\n其他元音 → 어 주다 (읽다→읽어 주다)\n하다 → 해 주다\n礼貌请求：-아/어 주세요', conjugationEn: 'Stem vowel ㅏ/ㅗ → 아 주다 (사다→사 주다)\\nOther vowels → 어 주다 (읽다→읽어 주다)\\n하다 → 해 주다\\nPolite request: -아/어 주세요',
    examples: [
      { ko: '다시 한번 말해 주세요.', zh: '请再说一遍。', zhEn: 'Please say that again.', note: '请求：请再说一次', noteEn: 'Request: Please say it again' },
      { ko: '이 단어를 저장해 주세요.', zh: '请保存这个单词。', zhEn: 'Please save this word.', note: '请求：请帮忙保存', noteEn: 'Request: Please save it for me' },
      { ko: '천천히 들려 주세요.', zh: '请慢慢放给我听。', zhEn: 'Please play it slowly for me.', note: '请求：请慢慢播放', noteEn: 'Request: Please play it slowly' },
    ],
    similarPatterns: ['-아/어 드리다', '-(으)세요'],
    difference: '-아/어 주다 是"为对方做"（接受者是平辈/晚辈，或请对方为自己做）；-아/어 드리다 是其敬语形，为长辈/尊者做（"도와 드릴게요"我来帮您）。单纯的 -(으)세요 是命令（"앉으세요"请坐），-아/어 주세요 更强调"帮我这个忙"。', differenceEn: '-아/어 주다 means "doing for someone" (the recipient is a peer or junior, or asking someone to do for you); -아/어 드리다 is its honorific form, used for elders or superiors ("도와 드릴게요" I\'ll help you). Plain -(으)세요 is a command ("앉으세요" please sit), while -아/어 주세요 emphasizes "do me this favor."',
    toriTip: '🐰 "-아/어 주세요"是韩国生活求助万能句！"도와주세요"（请帮帮我）、"사진 찍어 주세요"（请帮我拍照）。对长辈把 주세요 升级成 드리다："제가 해 드릴게요"（我来帮您做）。', toriTipEn: '🐰 "-아/어 주세요" is the all-purpose request phrase in Korean daily life! "도와주세요" (please help me), "사진 찍어 주세요" (please take a photo for me). For elders, upgrade 주세요 to 드리다: "제가 해 드릴게요" (I\'ll do it for you).',
  },

  // src: card-p5-l06
  {
    id: 'g91', title: '确认语气', titleEn: 'Confirming tone', pattern: '-지요? / -죠?',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '어미',
    usage: '向对方确认"……对吧？"', usageEn: 'Confirming with the other person "...right?"',
    explanation: '-지요（口语缩略为 -죠）用于向对方确认自己已知或猜测的事，寻求认同，相当于"……对吧？""……吧？"。也可用于陈述、委婉命令或提议，语气亲切柔和。', explanationEn: '-지요 (colloquially shortened to -죠) is used to confirm something you already know or guess with the other person, seeking agreement—equivalent to "...right?" or "...isn\'t it?" It can also be used for statements, gentle commands, or suggestions, with a friendly and soft tone.',
    conjugation: '动词/形容词词干 + 지요/죠\n名词 + (이)지요\n过去 + 았/었지요', conjugationEn: 'Verb/adjective stem + 지요/죠\\nNoun + (이)지요\\nPast + 았/었지요',
    examples: [
      { ko: '이 문법은 어렵지요?', zh: '这个语法很难吧？', zhEn: 'This grammar is hard, isn\'t it?', note: '确认：难吧', noteEn: 'Confirming: It\'s hard, right?' },
      { ko: '재미있죠?', zh: '有意思吧？', zhEn: 'Interesting, right?', note: '确认：有意思吧', noteEn: 'Confirming: It\'s interesting, right?' },
      { ko: '내일 같이 가시죠.', zh: '明天一起去吧。', zhEn: 'Let\'s go together tomorrow.', note: '提议：一起去吧', noteEn: 'Suggestion: Let\'s go together' },
    ],
    similarPatterns: ['-잖아요', '-네요'],
    difference: '-지요? 向对方求证共识（"맛있지요?"好吃吧？期待认同），-잖아요 是提醒对方本该知道的事（"맛있잖아요"这不好吃嘛，你也知道），-네요 是当场的新发现感叹（"맛있네요"好吃啊）。-지요 是问、-잖아요 是提醒、-네요 是感叹。', differenceEn: '-지요? seeks consensus from the other person ("맛있지요?" It\'s delicious, right? expecting agreement), -잖아요 reminds the other person of something they should already know ("맛있잖아요" It\'s delicious, you know), and -네요 is an exclamation of a new discovery on the spot ("맛있네요" Oh, it\'s delicious!). -지요 is asking, -잖아요 is reminding, -네요 is exclaiming.',
    toriTip: '🐰 -죠 是韩国人聊天的黏合剂！"그렇죠"（对吧）、"좋죠"（好啊）、"맞죠?"（没错吧？）。想跟对方确认或拉近距离时加个 죠，语气立刻软下来。', toriTipEn: '🐰 -죠 is the glue of Korean conversation! "그렇죠" (right), "좋죠" (sounds good), "맞죠?" (that\'s right, isn\'t it?). Add 죠 when you want to confirm with someone or get closer, and the tone instantly softens.',
  },

  // src: card-p5-l05
  {
    id: 'g92', title: '冠形词形', titleEn: 'Adnominal form', pattern: '-는/-(으)ㄴ/-(으)ㄹ (관형사형)',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '어미',
    usage: '用动词/形容词修饰名词，"……的+名词"', usageEn: 'Using verbs/adjectives to modify nouns, "...\'s + noun"',
    explanation: '把动词或形容词变成定语来修饰后面的名词，相当于中文"……的"。时态不同用不同形式：动词现在用 -는，过去用 -(으)ㄴ，将来/推测用 -(으)ㄹ；形容词用 -(으)ㄴ。这是构成复杂句的核心结构。', explanationEn: 'Turn verbs or adjectives into attributive forms to modify the following noun, equivalent to Chinese "...的." Different tenses use different forms: present tense verbs use -는, past uses -(으)ㄴ, future/supposition uses -(으)ㄹ; adjectives use -(으)ㄴ. This is the core structure for building complex sentences.',
    conjugation: '动词现在 + 는 (먹는 사람)\n动词过去 + (으)ㄴ (먹은 사람)\n动词将来 + (으)ㄹ (먹을 사람)\n形容词 + (으)ㄴ (예쁜 사람)\n形容词现在也可 + 는（있다/없다类：맛있는）', conjugationEn: 'Verb present + 는 (먹는 사람)\\nVerb past + (으)ㄴ (먹은 사람)\\nVerb future + (으)ㄹ (먹을 사람)\\nAdjective + (으)ㄴ (예쁜 사람)\\nAdjectives can also take present + 는 (있다/없다 type: 맛있는)',
    examples: [
      { ko: '한국어를 공부하는 사람이에요.', zh: '是学习韩语的人。', zhEn: 'They are people learning Korean.', note: '现在冠形：正在学的人', noteEn: 'Present attributive: the person studying' },
      { ko: '지금 듣는 노래가 정말 좋아요.', zh: '现在听的歌真的很好听。', zhEn: 'The song I\'m listening to now is really, really good.', note: '现在冠形：在听的歌', noteEn: 'Present attributive: the song listening to' },
      { ko: '오늘 배울 문법이 어렵지 않아요.', zh: '今天要学的语法不难。', zhEn: 'The grammar we\'re learning today isn\'t hard.', note: '将来冠形：要学的语法', noteEn: 'Future attributive: the grammar to learn' },
    ],
    similarPatterns: ['-는 것', '-던'],
    difference: '冠形词形直接修饰名词（"먹는 사람"吃的人）；接 것 就名词化成"……的事/东西"（"먹는 것"吃这件事）。表过去时，-(으)ㄴ 是单纯完成（"먹은 빵"吃过的面包），-던 带回想（"먹던 빵"以前常吃/吃了一半的面包）。', differenceEn: 'The attributive form directly modifies a noun ("먹는 사람" the person eating); attached to 것 it nominalizes into "...thing/matter" ("먹는 것" the act of eating). For past tense, -(으)ㄴ indicates simple completion ("먹은 빵" bread that was eaten), while -던 carries recollection ("먹던 빵" bread you used to eat / half-eaten bread).',
    toriTip: '🐰 冠形词形是韩语造长句的关键！记住时态三件套：현재-는、과거-(으)ㄴ、미래-(으)ㄹ。"내가 좋아하는 사람"（我喜欢的人）、"어제 산 옷"（昨天买的衣服）、"내일 만날 친구"（明天要见的朋友）。', toriTipEn: '🐰 The attributive form is key to making long Korean sentences! Remember the tense trio: present -는, past -(으)ㄴ, future -(으)ㄹ. "내가 좋아하는 사람" (the person I like), "어제 산 옷" (the clothes I bought yesterday), "내일 만날 친구" (the friend I\'ll meet tomorrow).',
  },

  // src: card-p5-l04
  {
    id: 'g93', title: '否定判断', titleEn: 'Negative judgment', pattern: '이/가 아니다',
    level: 'beginner', topik: 'TOPIK 1级', topikEn: 'TOPIK Level 1', category: '문형',
    usage: '表示"不是……"', usageEn: 'Expressing "is not..."',
    explanation: '아니다 是 이다（是）的否定形，表示"不是……"。名词 + 이/가 + 아니다。常见句型"A가 아니라 B"表示"不是A而是B"，用于纠正或对比。', explanationEn: '아니다 is the negative form of 이다 (to be), meaning "is not..." Noun + 이/가 + 아니다. A common pattern is "A가 아니라 B" meaning "not A but B," used for correction or contrast.',
    conjugation: '有收音名词 + 이 아니다 (학생이 아니에요)\n无收音名词 + 가 아니다 (의사가 아니에요)\n对比：A이/가 아니라 B', conjugationEn: 'Noun with final consonant + 이 아니다 (학생이 아니에요)\\nNoun without final consonant + 가 아니다 (의사가 아니에요)\\nContrast: A이/가 아니라 B',
    examples: [
      { ko: '저는 선생님이 아니에요.', zh: '我不是老师。', zhEn: 'I\'m not a teacher.', note: '否定判断：不是老师', noteEn: 'Negative judgment: not a teacher' },
      { ko: '이건 커피가 아니라 차예요.', zh: '这不是咖啡，而是茶。', zhEn: 'This isn\'t coffee, it\'s tea.', note: '对比：不是A而是B', noteEn: 'Contrast: not A but B' },
      { ko: '외우는 게 아니라 이해해야 해요.', zh: '不是背，而是要理解。', zhEn: 'It\'s not about memorizing, but understanding.', note: '对比：不是A而是B', noteEn: 'Contrast: not A but B' },
    ],
    similarPatterns: ['이다', '안'],
    difference: '이/가 아니다 是名词谓语"是"的否定（"학생이 아니에요"不是学生）；안/-지 않다 是动词/形容词的否定（"안 가요"不去、"예쁘지 않아요"不漂亮）。判断名词身份用 아니다，否定动作/状态用 안。', differenceEn: '이/가 아니다 is the negative of the noun predicate "to be" ("학생이 아니에요" = not a student); 안/-지 않다 is the negative of verbs/adjectives ("안 가요" = don\'t go, "예쁘지 않아요" = not pretty). Use 아니다 to negate noun identity, and 안 for actions/states.',
    toriTip: '🐰 이다（是）的反义就是 아니다（不是）。"학생이에요"（是学生）↔"학생이 아니에요"（不是学生）。想纠正对方时用"A가 아니라 B"："제 게 아니라 친구 거예요"（不是我的，是朋友的）。', toriTipEn: '🐰 The opposite of 이다 (to be) is 아니다 (to not be). "학생이에요" (is a student) ↔ "학생이 아니에요" (is not a student). To correct someone, use "A가 아니라 B": "제 게 아니라 친구 거예요" (It\'s not mine, it\'s my friend\'s).',
  },

  // src: card-p6-l01
  {
    id: 'g94', title: '承诺/意志', titleEn: 'Promise/Intention', pattern: '-(으)ㄹ게요',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '어미',
    usage: '表示"我会……的"（对听者的承诺）', usageEn: 'Indicates "I will..." (a promise to the listener)',
    explanation: '表示说话人对听者做出的承诺或意志表态，"我（会为你）……"。主语只能是第一人称，且含有考虑到对方、回应对方的语感。与单纯陈述计划的 -(으)ㄹ 거예요 不同，-(으)ㄹ게요 是"说给对方听的承诺"。', explanationEn: 'Indicates a promise or expression of intention made by the speaker to the listener, "I (will) ... for you." The subject can only be first person, and it carries a nuance of considering and responding to the other person. Unlike -(으)ㄹ 거예요, which simply states a plan, -(으)ㄹ게요 is a promise spoken to the listener.',
    conjugation: '无收音/ㄹ词干 + ㄹ게요 (가다→갈게요)\n有收音词干 + 을게요 (먹다→먹을게요)', conjugationEn: 'No batchim/ㄹ stem + ㄹ게요 (가다→갈게요)\\nWith batchim stem + 을게요 (먹다→먹을게요)',
    examples: [
      { ko: '제가 먼저 시작할게요.', zh: '我先开始。', zhEn: 'I\'ll start first.', note: '意志：我先来', noteEn: 'Intention: I\'ll go first' },
      { ko: '도착하면 바로 연락할게요.', zh: '到了马上联系你。', zhEn: 'I\'ll contact you as soon as I arrive.', note: '承诺：到了就联系', noteEn: 'Promise: I\'ll contact you when I arrive' },
      { ko: '제가 오늘 저녁 준비할게요.', zh: '今天晚饭我来准备。', zhEn: 'I\'ll prepare dinner today.', note: '承诺：我来准备晚饭', noteEn: 'Promise: I\'ll prepare dinner' },
    ],
    similarPatterns: ['-(으)ㄹ 거예요', '-겠어요'],
    difference: '-(으)ㄹ게요 是"考虑对方、说给对方听的承诺"（主语只能是"我"，"제가 할게요"我来做）；-(으)ㄹ 거예요 是单纯陈述计划/推测（可用于任何人称）；-겠어요 是当场决意表态。回应别人时用 -(으)ㄹ게요 最自然。', differenceEn: '-(으)ㄹ게요 is a promise made with the listener in mind (subject can only be "I," e.g., "제가 할게요" = I\'ll do it); -(으)ㄹ 거예요 simply states a plan/prediction (usable with any person); -겠어요 expresses an immediate decision. When responding to someone, -(으)ㄹ게요 is most natural.',
    toriTip: '🐰 -(으)ㄹ게요 是"我来/我会…（放心交给我）"。"제가 할게요"（我来做）、"기다릴게요"（我等你）。注意只能说自己，不能说别人——"친구가 올게요"是错的，要用"친구가 올 거예요"。', toriTipEn: '🐰 -(으)ㄹ게요 means "I\'ll do it / I will... (trust me)." "제가 할게요" (I\'ll do it), "기다릴게요" (I\'ll wait for you). Note: you can only use it about yourself, not others — "친구가 올게요" is wrong; use "친구가 올 거예요."',
  },

  // src: card-p6-l04
  {
    id: 'g95', title: '完成先后', titleEn: 'Completion order', pattern: '-고 나서',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '연결',
    usage: '表示"做完……之后（再）……"', usageEn: 'Indicates "after finishing... (then)..."',
    explanation: '接在动词后，强调前一动作彻底完成之后再做后一动作，比单纯的 -고 更突出"先完成、再进行"的先后顺序。前后主语通常相同。', explanationEn: 'Attached to a verb, it emphasizes that the first action is fully completed before the next one, highlighting the sequence of "finish first, then proceed" more than plain -고. The subject before and after is usually the same.',
    conjugation: '动词词干 + 고 나서', conjugationEn: 'Verb stem + 고 나서',
    examples: [
      { ko: '단어를 외우고 나서 문장을 만들어요.', zh: '背完单词之后造句。', zhEn: 'Make sentences after memorizing the vocabulary.', note: '先后：背完再造句', noteEn: 'Sequence: memorize then make sentences' },
      { ko: '원곡을 듣고 나서 따라 해 봐요.', zh: '听完原唱之后跟着唱。', zhEn: 'Sing along after listening to the original.', note: '先后：听完再跟唱', noteEn: 'Sequence: listen then sing along' },
      { ko: '이 챕터를 다 읽고 나서 복습할게요.', zh: '这章全读完之后复习。', zhEn: 'Review after reading the whole chapter.', note: '先后：读完再复习', noteEn: 'Sequence: read then review' },
    ],
    similarPatterns: ['-고', '-(으)ㄴ 후에', '-아/어서'],
    difference: '-고 나서 强调"前一动作完成后"再做（比 -고 更突出完成感）；-고 只是并列先后；-(으)ㄴ 후에 也表"之后"但更中性；-아/어서 前后动作有关联/连贯（"앉아서 먹어요"坐下来吃）。想强调"彻底做完再进行下一步"用 -고 나서。', differenceEn: '-고 나서 emphasizes doing something "after the previous action is completed" (more completion-focused than -고); -고 just lists sequence; -(으)ㄴ 후에 also means "after" but is more neutral; -아/어서 implies the actions are connected/sequential ("앉아서 먹어요" = sit down and eat). To emphasize "finish completely before moving on," use -고 나서.',
    toriTip: '🐰 -고 나서 = "做完…然后…"，比普通的 -고 多了"搞定了才继续"的踏实感。"숙제 하고 나서 놀 거예요"（做完作业才去玩）— 妈妈最爱听的一句话。', toriTipEn: '🐰 -고 나서 = "after doing... then...", adding a sense of "only after it\'s done do I move on" compared to plain -고. "숙제 하고 나서 놀 거예요" (I\'ll play after finishing homework) — a mom\'s favorite sentence.',
  },

  // src: card-p6-l05
  {
    id: 'g96', title: '完成/遗憾', titleEn: 'Completion/Regret', pattern: '-아/어 버리다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示动作彻底完成，带负担解除或惋惜的语感', usageEn: 'Indicates an action is fully completed, with a nuance of relief or regret',
    explanation: '动词 + 아/어 버리다，表示动作已经彻底完成、无法挽回。根据语境带两种情绪：①负担解除的痛快（"终于做完了"）；②惋惜、遗憾（"竟然……掉了"）。强调结果的"彻底性"和说话人的情绪。', explanationEn: 'Verb + 아/어 버리다 indicates an action is completely done and irreversible. Depending on context, it carries two emotions: ① relief that a burden is lifted ("finally done"); ② regret or disappointment ("it ended up..."). It emphasizes the "completeness" of the result and the speaker\'s emotion.',
    conjugation: '词干元音 ㅏ/ㅗ → 아 버리다 (가다→가 버리다)\n其他元音 → 어 버리다 (먹다→먹어 버리다)\n하다 → 해 버리다', conjugationEn: 'Stem vowel ㅏ/ㅗ → 아 버리다 (가다→가 버리다)\\nOther vowels → 어 버리다 (먹다→먹어 버리다)\\n하다 → 해 버리다',
    examples: [
      { ko: '배터리가 다 나가 버렸어요.', zh: '电池全没了。', zhEn: 'The battery is completely dead.', note: '惋惜：电全没了', noteEn: 'Regret: The battery\'s completely dead' },
      { ko: '리포트를 밤새 써 버렸어요.', zh: '熬夜把报告写完了。', zhEn: 'I stayed up all night and finished the report.', note: '完成：一口气写完', noteEn: 'Completion: Wrote it all in one go' },
      { ko: '도시락을 벌써 다 먹어 버렸어요.', zh: '便当已经全吃完了。', zhEn: 'I\'ve already eaten the whole lunchbox.', note: '完成/惋惜：全吃光了', noteEn: 'Completion/Regret: Ate it all up' },
    ],
    similarPatterns: ['-고 말다', '-아/어 두다'],
    difference: '-아/어 버리다 强调"彻底做完"并带情绪（痛快或惋惜，"먹어 버렸어요"吃光了）；-고 말다 强调"终究还是……了"的遗憾结局（"울고 말았어요"终究还是哭了）；-아/어 두다 是"做好放着备用"（"사 두다"买好备着）。버리다 侧重"没了/干净了"的彻底感。', differenceEn: '-아/어 버리다 emphasizes "completely finishing" with emotion (relief or regret, e.g., "먹어 버렸어요" = ate it all up); -고 말다 emphasizes the regrettable outcome of "it ended up..." (e.g., "울고 말았어요" = ended up crying); -아/어 두다 means "do it and leave it for later" (e.g., "사 두다" = buy and keep). 버리다 focuses on the sense of "gone/clean" completion.',
    toriTip: '🐰 -아/어 버리다 = 动作"彻底完成"+情绪。可以是爽快（"다 끝내 버렸어!"全搞定了！），也可以是懊恼（"지갑을 잃어버렸어요"钱包丢了）。同一个语法，情绪靠语境读。', toriTipEn: '🐰 -아/어 버리다 = action "fully completed" + emotion. It can be satisfying ("다 끝내 버렸어!" = All done!) or frustrating ("지갑을 잃어버렸어요" = I lost my wallet). Same grammar, emotion depends on context.',
  },

  // src: card-p6-l02
  {
    id: 'g97', title: '委婉疑问', titleEn: 'Euphemistic question', pattern: '-나요? / -(으)ㄴ가요?',
    level: 'beginner', topik: 'TOPIK 2级', topikEn: 'TOPIK Level 2', category: '어미',
    usage: '比"-아/어요?"更柔和的疑问', usageEn: 'A softer question than "-아/어요?"',
    explanation: '用于委婉、温和地提问，语气比普通疑问 -아/어요? 更柔软客气。动词用 -나요，形容词/名词用 -(으)ㄴ가요。常带有不冒昧、留有余地的语感，适合询问不太熟的人或想显得礼貌时。', explanationEn: 'Used for polite, gentle questioning—softer and more courteous than the standard -아/어요?. Verbs take -나요, adjectives/nouns take -(으)ㄴ가요. It carries a non-intrusive, considerate tone, ideal for asking people you don\'t know well or when you want to be polite.',
    conjugation: '动词词干 + 나요 (가나요? 먹나요?)\n形容词词干 + (으)ㄴ가요 (예쁜가요? 좋은가요?)\n名词 + 인가요 (학생인가요?)\n过去 + 았/었나요', conjugationEn: 'Verb stem + 나요 (가나요? 먹나요?)\\nAdjective stem + (으)ㄴ가요 (예쁜가요? 좋은가요?)\\nNoun + 인가요 (학생인가요?)\\nPast + 았/었나요',
    examples: [
      { ko: '콘서트 티켓 예매했나요?', zh: '你预订演唱会门票了吗？', zhEn: 'Did you book concert tickets?', note: '委婉疑问：订票了吗', noteEn: 'Euphemistic question: Did you book the ticket?' },
      { ko: '이 가수 좋아하나요?', zh: '你喜欢这个歌手吗？', zhEn: 'Do you like this singer?', note: '委婉疑问：喜欢吗', noteEn: 'Euphemistic question: Do you like it?' },
      { ko: '이 문법 이해됐나요?', zh: '这个语法理解了吗？', zhEn: 'Did you understand this grammar?', note: '委婉疑问：理解了吗', noteEn: 'Euphemistic question: Did you understand?' },
    ],
    similarPatterns: ['-아/어요?', '-지요?'],
    difference: '-나요?/-(으)ㄴ가요? 比 -아/어요? 更柔和委婉（"어렵나요?"难吗？语气软），-아/어요? 是中性直接的疑问（"어려워요?"难吗？）；-지요? 是求认同的确认（"어렵지요?"很难吧？已有预期）。想显得客气不冒昧时用 -나요。', differenceEn: '-나요?/-(으)ㄴ가요? is softer and more euphemistic than -아/어요? ("어렵나요?" = Is it hard?—gentler tone), while -아/어요? is a neutral, direct question ("어려워요?" = Is it hard?); -지요? seeks agreement ("어렵지요?" = It\'s hard, right?—already expecting). Use -나요 when you want to be polite and non-intrusive.',
    toriTip: '🐰 -나요 让问题变温柔。"시간 있어요?"（有时间吗？）→"시간 있나요?"（不知您方不方便…有时间吗？）。多一个 나，语气就多一分体贴，适合问不太熟的人。', toriTipEn: '🐰 -나요 makes questions gentler. "시간 있어요?" (Do you have time?) → "시간 있나요?" (I wonder if you might have a moment...). That extra 나 adds a touch of thoughtfulness—great for asking people you don\'t know well.',
  },

  // =====================================================================
  //  批量提炼扩充 B2（P7-P9，中级补充）
  // =====================================================================

  // src: card-p7-l02
  {
    id: 'g98', title: '时间经过', titleEn: 'Time elapsed', pattern: '-(으)ㄴ 지 + 시간 + 되다/지나다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"做某事以来过了多长时间"', usageEn: 'Indicates how much time has passed since doing something',
    explanation: '动词冠形词形 -(으)ㄴ 지 后接时间 + 되다/지나다/흐르다，表示从某动作发生到现在经过了多长时间。这里的 지 是表示"时间间隔"的依存名词，与表示"是否"的语尾 -는지 不同，需分写。', explanationEn: 'The adnominal form -(으)ㄴ 지 followed by a time expression + 되다/지나다/흐르다 indicates how much time has passed since an action occurred. Here, 지 is a dependent noun meaning "time interval," distinct from the ending -는지 (whether), and must be written separately.',
    conjugation: '动词词干 + (으)ㄴ 지 + 时间 + 되다/지나다\n无收音/ㄹ + ㄴ 지 (오다→온 지)\n有收音 + 은 지 (먹다→먹은 지)', conjugationEn: 'Verb stem + (으)ㄴ 지 + time + 되다/지나다\\nNo batchim/ㄹ + ㄴ 지 (오다→온 지)\\nWith batchim + 은 지 (먹다→먹은 지)',
    examples: [
      { ko: '한국어를 배운 지 얼마나 됐어요? 저는 1년이 됐어요.', zh: '学韩语多久了？我已经一年了。', zhEn: 'How long have you been learning Korean? It\'s been a year for me.', note: '时间经过：学了一年', noteEn: 'Time elapsed: Studied for a year' },
      { ko: '한국에 온 지 얼마나 됐어요? 6개월 됐어요.', zh: '来韩国多久了？六个月了。', zhEn: 'How long have you been in Korea? Six months.', note: '时间经过：来了半年', noteEn: 'Time elapsed: Came six months ago' },
      { ko: '이 회사에서 일한 지 3년이 됐어요.', zh: '在这家公司工作已经三年了。', zhEn: 'I\'ve been working at this company for three years.', note: '时间经过：工作三年', noteEn: 'Time elapsed: Worked for three years' },
    ],
    similarPatterns: ['-(으)ㄴ/는지', '동안'],
    difference: '-(으)ㄴ 지（分写，依存名词"…以来的时间"）表时间经过，后接时间量+되다（"온 지 3년 됐어요"来了3年）；-는지（连写，语尾）表"是否/疑问间接"（"오는지 몰라요"不知来不来）。两者形近义完全不同，靠是否分写和后续成分区分。', differenceEn: '-(으)ㄴ 지 (written separately, dependent noun "time since...") indicates elapsed time, followed by a time amount + 되다 ("온 지 3년 됐어요" = It\'s been 3 years since I came); -는지 (written together, ending) indicates "whether/indirect question" ("오는지 몰라요" = I don\'t know if he\'s coming). They look similar but differ completely in meaning—distinguished by spacing and what follows.',
    toriTip: '🐰 "-은 지 얼마나 됐어요?"是韩国人套近乎的常用问句——"来韩国多久啦？""学韩语多久啦？"。注意这个 지 要跟动词分开写，和"모르는지"那个连写的 지 不是一回事。', toriTipEn: '🐰 "-은 지 얼마나 됐어요?" is a common icebreaker Koreans use—"How long have you been in Korea?" "How long have you studied Korean?" Note that this 지 is written separately from the verb, unlike the attached 지 in "모르는지."',
  },

  // src: card-p7-l04
  {
    id: 'g99', title: '全否定', titleEn: 'Full negation', pattern: '아무+N+도 / 하나도 + 否定', patternEn: '아무 + N + 도 / 하나도 + negation',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"什么都不…/一个也没…"的全称否定', usageEn: 'Full negation: \'nothing... / not a single...\'',
    explanation: '아무 后接名词加 도，或用 하나도、전혀 等，与否定谓语搭配，表示彻底否定（"谁都不、什么都没、一点也不"）。必须与否定形式（안、못、없다、-지 않다）连用。常见：아무것도（什么都）、아무도（谁都）、아무 데도（哪儿都）、아무 말도（什么话都）。', explanationEn: '아무 + noun + 도, or use 하나도, 전혀, etc., with a negative predicate to express total negation (\'no one, nothing, not at all\'). Must be used with negative forms (안, 못, 없다, -지 않다). Common: 아무것도 (nothing), 아무도 (no one), 아무 데도 (nowhere), 아무 말도 (nothing to say).',
    conjugation: '아무 + 名词 + 도 + 否定谓语\n아무것도 / 아무도 / 아무 데도 + 안/못/없다\n하나도 + 否定（一点也不）', conjugationEn: '아무 + noun + 도 + negative predicate\\n아무것도 / 아무도 / 아무 데도 + 안/못/없다\\n하나도 + negative (not at all)',
    examples: [
      { ko: '오늘은 아무 말도 하고 싶지 않아요.', zh: '今天什么都不想说。', zhEn: 'I don\'t want to say anything today.', note: '全否定：一句话都不想说', noteEn: 'Full negation: don\'t want to say a word' },
      { ko: '배가 아파서 아무것도 못 먹었어요.', zh: '肚子疼所以什么都没吃。', zhEn: 'My stomach hurt, so I didn\'t eat anything.', note: '全否定：什么都没吃', noteEn: 'Full negation: ate nothing' },
      { ko: '이 시험은 하나도 안 어려웠어요!', zh: '这个考试一点都不难！', zhEn: 'This exam isn\'t hard at all!', note: '全否定：一点也不难', noteEn: 'Full negation: not hard at all' },
    ],
    similarPatterns: ['안', '못'],
    difference: '아무+N+도 / 하나도 是"全称否定"（必须配否定谓语，强调"完全没有/完全不"）；单纯的 안/못 只否定单个动作（"안 먹어요"不吃）。아무도 왔어요（❌）不成立，必须"아무도 안 왔어요"（谁都没来）。', differenceEn: '아무+N+도 / 하나도 is \'full negation\' (must pair with a negative predicate, emphasizing \'completely not\'); plain 안/못 only negates a single action (\'안 먹어요\' don\'t eat). 아무도 왔어요 (❌) is invalid; must be \'아무도 안 왔어요\' (no one came).',
    toriTip: '🐰 아무+X+도 是"X都…没/不"的万能框架：아무도(谁都)、아무것도(什么都)、아무 데도(哪儿都)、아무 말도(什么话都)。铁律是后面必须跟否定——"아무도 없어요"（一个人都没有）。', toriTipEn: '🐰 아무+X+도 is the all-purpose frame for \'X all... not\': 아무도 (no one), 아무것도 (nothing), 아무 데도 (nowhere), 아무 말도 (nothing to say). Iron rule: must be followed by a negative — \'아무도 없어요\' (there\'s no one).',
  },

  // src: card-p7-l05
  {
    id: 'g100', title: '附加处所', titleEn: 'Attaching location', pattern: '에다(가)',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '조사',
    usage: '表示动作附加、放置的地点或对象，"往…上/里"', usageEn: 'Indicates the place or object where an action is attached or placed: \'onto/into...\'',
    explanation: '에다가（可缩略为 에다）接在处所名词后，表示把某物放置、书写、添加到某处，强调"附加/放到某个地方"这一动作方向。比单纯的 에 更突出"往…上加"的动作感，常与 넣다/쓰다/붙이다/바르다 等动词搭配。', explanationEn: '에다가 (can be shortened to 에다) attaches to location nouns to indicate placing, writing, or adding something somewhere, emphasizing the direction of \'adding/putting onto a place\'. It highlights the action of \'putting onto\' more than plain 에, and often pairs with verbs like 넣다/쓰다/붙이다/바르다.',
    conjugation: '处所名词 + 에다(가)\n口语常缩略为 에다', conjugationEn: 'Location noun + 에다(가)\\nOften shortened to 에다 in speech',
    examples: [
      { ko: '중요한 내용은 노트에다가 꼭 메모해요.', zh: '重要的内容一定要在笔记本上记下来。', zhEn: 'Be sure to write down important things in your notebook.', note: '附加：往笔记本上记', noteEn: 'Attaching: write in the notebook' },
      { ko: '가방에다가 물이랑 지갑을 넣었어요.', zh: '把水和钱包放进包里了。', zhEn: 'I put water and my wallet in my bag.', note: '附加：往包里放', noteEn: 'Attaching: put in the bag' },
      { ko: '방 벽에다가 좋아하는 포스터를 붙였어요.', zh: '在房间墙上贴了喜欢的海报。', zhEn: 'I put up a poster I like on the wall of my room.', note: '附加：往墙上贴', noteEn: 'Attaching: stick on the wall' },
    ],
    similarPatterns: ['에'],
    difference: '에다(가) 强调"把东西附加/放置到某处"的动作方向（"노트에다가 써요"往本子上写，带动作感）；에 是中性的存在/目的地标记（"노트에 있어요"在本子上）。放置类动词（넣다/쓰다/붙이다）用 에다가 更生动，静态存在用 에。', differenceEn: '에다(가) emphasizes the direction of \'attaching/placing something somewhere\' (\'노트에다가 써요\' write in the notebook, with a sense of action); 에 is a neutral marker of existence/destination (\'노트에 있어요\' it\'s in the notebook). Placement verbs (넣다/쓰다/붙이다) are more vivid with 에다가; static existence uses 에.',
    toriTip: '🐰 에다가 = "往…上/里"，比 에 多了"动手放上去"的画面感。"여기에다가 쓰세요"（写在这里）、"가방에다 넣어"（放包里）。口语里常省成 에다，说快了就是 여기다가。', toriTipEn: '🐰 에다가 = \'onto/into...\', more vivid than 에 with the image of \'physically putting it there\'. \'여기에다가 쓰세요\' (write here), \'가방에다 넣어\' (put it in the bag). In speech it\'s often shortened to 에다, and said fast it becomes 여기다가.',
  },

  // src: card-p7-l07
  {
    id: 'g101', title: '忙于…而未能', titleEn: 'Busy doing... and couldn\'t', pattern: '-느라고',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '연결',
    usage: '表示"因忙于做…而没能…"，多带负面结果', usageEn: 'Indicates \'because I was busy doing..., I couldn\'t...\', often with a negative result',
    explanation: '接在动词后，表示前一动作占用了时间/精力，导致后句（多为负面结果，如没做到、累、迟到）。前后主语必须相同，且前句是持续性动作。后句不能用命令/请诱句。', explanationEn: 'Attaches to a verb, indicating the first action took up time/energy, leading to the second clause (often a negative result like failing, being tired, being late). The subject must be the same in both clauses, and the first action must be ongoing. The second clause cannot be a command or suggestion.',
    conjugation: '动词词干 + 느라고\n（口语也常说 -느라）', conjugationEn: 'Verb stem + 느라고\\n(-느라 is also common in speech)',
    examples: [
      { ko: '자느라고 전화를 못 받았어요. 미안해요.', zh: '因为在睡觉，没能接电话。对不起。', zhEn: 'I couldn\'t answer the phone because I was sleeping. Sorry.', note: '未能：睡觉没接到电话', noteEn: 'Couldn\'t: slept and missed the call' },
      { ko: '아르바이트하느라고 숙제를 못 했어요.', zh: '因为在打工，没能做作业。', zhEn: 'I couldn\'t do my homework because I was working part-time.', note: '未能：打工没做作业', noteEn: 'Couldn\'t: worked and didn\'t do homework' },
      { ko: '운동하느라고 많이 피곤해요.', zh: '因为在运动，很累。', zhEn: 'I\'m tired because I was exercising.', note: '负面结果：运动很累', noteEn: 'Negative result: exercising made me tired' },
    ],
    similarPatterns: ['-아서/어서', '-(으)니까'],
    difference: '-느라고 强调"因忙于前一动作而付出代价/没能做后事"（前后同主语，后句多负面："자느라고 못 받았어요"睡着了没接到）；-아서/어서 是中性因果；-(으)니까 是主观原因且可接命令。-느라고 特有"占用精力导致没做成"的语感。', differenceEn: '-느라고 emphasizes "paying a price for being busy with the previous action / not being able to do the follow-up" (same subject before and after, the latter clause is often negative: "자느라고 못 받았어요" fell asleep and didn\'t get it); -아서/어서 is a neutral cause-and-effect; -(으)니까 is a subjective reason and can be followed by commands. -느라고 has the unique nuance of "being occupied and thus failing to do something."',
    toriTip: '🐰 -느라고 是"忙着…结果…（没做到/累了）"的道歉神器。"공부하느라고 답장 못 했어"（忙着学习没回你消息）——既解释了原因又暗示"我也不容易"，比干巴巴的"바빠서"更有温度。', toriTipEn: '🐰 -느라고 is the apology tool for "busy doing... so... (didn\'t manage/drained)." "공부하느라고 답장 못 했어" (was busy studying so didn\'t reply) — it explains the reason while hinting "I\'m not having it easy either," warmer than a plain "바빠서."',
  },

  // src: card-p8-l03
  {
    id: 'g102', title: '差点', titleEn: 'Almost', pattern: '-(으)ㄹ 뻔하다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"差一点就…（但没发生）"', usageEn: 'Indicates "almost... (but didn\'t happen)"',
    explanation: '接在动词后，表示某种（通常不好的）情况差点发生但最终没发生。总是用过去时 -을 뻔했다。带有回想起来后怕或庆幸的语感。', explanationEn: 'Attached after verbs, it indicates that something (usually bad) almost happened but ultimately didn\'t. Always used in past tense -을 뻔했다. Carries a sense of relief or lingering fear when looking back.',
    conjugation: '无收音/ㄹ + ㄹ 뻔하다 (가다→갈 뻔하다)\n有收音 + 을 뻔하다 (넘어지다→넘어질 뻔하다)\n固定用过去时：-을 뻔했다/했어요', conjugationEn: 'No batchim/ㄹ + ㄹ 뻔하다 (가다→갈 뻔하다)\\nWith batchim + 을 뻔하다 (넘어지다→넘어질 뻔하다)\\nAlways past tense: -을 뻔했다/했어요',
    examples: [
      { ko: '길을 걷다가 차에 치일 뻔했어요! 너무 무서웠어요.', zh: '走路的时候差点被车撞！太可怕了。', zhEn: 'I almost got hit by a car while walking! So scary.', note: '差点：差点被撞', noteEn: 'Almost: almost got hit' },
      { ko: '오늘 늦잠을 자서 지각할 뻔했어요.', zh: '今天睡懒觉，差点迟到。', zhEn: 'I slept in today and almost got late.', note: '差点：差点迟到', noteEn: 'Almost: almost late' },
      { ko: '넘어질 뻔했어요.', zh: '差点摔倒了。', zhEn: 'I almost fell.', note: '差点：差点摔倒', noteEn: 'Almost: almost fell' },
    ],
    similarPatterns: ['-(으)ㄹ 것 같다'],
    difference: '-(으)ㄹ 뻔하다 是"差点发生但没发生"的既成事实（固定过去时，"넘어질 뻔했어요"差点摔倒——其实没摔）；-(으)ㄹ 것 같다 是对未发生事的推测（"넘어질 것 같아요"感觉要摔）。前者庆幸后怕，后者预感。', differenceEn: '-(으)ㄹ 뻔하다 is a done deal of "almost happened but didn\'t" (fixed past tense, "넘어질 뻔했어요" almost fell — but didn\'t); -(으)ㄹ 것 같다 is a guess about something not yet happened ("넘어질 것 같아요" feels like it\'ll fall). The former is relief/lingering fear, the latter is a hunch.',
    toriTip: '🐰 -을 뻔했다 = "差点就…"，永远用过去时。"죽을 뻔했어요"（差点没命）、"울 뻔했어요"（差点哭出来）。韩国人讲惊险经历的口头禅，说完往往还要拍拍胸口。', toriTipEn: '🐰 -을 뻔했다 = "almost..." always in past tense. "죽을 뻔했어요" (almost died), "울 뻔했어요" (almost cried). Koreans\' go-to for scary stories, often followed by a pat on the chest.',
  },

  // src: card-p8-l06
  {
    id: 'g103', title: '退让选择', titleEn: 'Fallback choice', pattern: '-(이)라도',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '조사',
    usage: '表示"哪怕是…也（退而求其次）"', usageEn: 'Indicates "even if it\'s... (settling for less)"',
    explanation: '接在名词后，表示虽然不是最理想的选择，但退一步接受它也可以，相当于"…也行、哪怕…"。常用于提议或将就的语境，带有"没有更好的，这个也凑合"的语感。', explanationEn: 'Attached after nouns, it means even if it\'s not the ideal choice, accepting it as a step down is okay, equivalent to "...is fine, even...". Often used in suggestions or making do, with a sense of "no better option, this\'ll do."',
    conjugation: '无收音名词 + 라도 (차라도)\n有收音名词 + 이라도 (빵이라도)', conjugationEn: 'No batchim noun + 라도 (차라도)\\nWith batchim noun + 이라도 (빵이라도)',
    examples: [
      { ko: '차라도 한 잔 드릴까요? 잠깐 기다려 주세요.', zh: '要喝杯茶吗？请稍等一下。', zhEn: 'Would you like some tea? Just a moment.', note: '退让：喝杯茶也好', noteEn: 'Fallback: even a cup of tea is fine' },
      { ko: '밥이 없으면 빵이라도 먹을까요?', zh: '如果没有饭，吃点面包也行吗？', zhEn: 'If there\'s no rice, is it okay to just have some bread?', note: '退让：没饭吃面包也行', noteEn: 'Fallback: if no rice, bread is fine' },
      { ko: '물이라도 마실래요?', zh: '喝点水也好，要喝吗？', zhEn: 'Having some water is fine, want some?', note: '退让：喝点水也行', noteEn: 'Fallback: even some water is fine' },
    ],
    similarPatterns: ['-더라도', '만'],
    difference: '-(이)라도 是名词后的"退让选择"（哪怕是次选也接受，"빵이라도 먹어요"没别的、吃面包也行）；-더라도 是动词/形容词后的"强让步"连接（即使…也，"힘들더라도 해요"再难也做）。前者接名词表将就，后者接谓词表决心。', differenceEn: '-(이)라도 is a "fallback choice" after nouns (accept even a second-best, "빵이라도 먹어요" no other option, bread is fine); -더라도 is a "strong concession" connector after verbs/adjectives (even if..., "힘들더라도 해요" do it even if hard). The former attaches to nouns for settling, the latter to predicates for resolve.',
    toriTip: '🐰 -(이)라도 是"退而求其次"的温柔句型。"커피라도 마실까?"（要不喝杯咖啡吧？）——虽然不是什么大餐，但"至少来点这个"。请客、提议时用它，显得体贴不勉强。', toriTipEn: '🐰 -(이)라도 is the gentle pattern for "settling for less." "커피라도 마실까?" (How about at least a coffee?) — not a big meal, but "at least this." Use it when treating or suggesting, it feels considerate and not pushy.',
  },

  // src: card-p8-l07
  {
    id: 'g104', title: '只要就行', titleEn: 'Just need to', pattern: '-(으)면 되다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"只要做…就行了"', usageEn: 'Indicates "just do... and it\'s enough"',
    explanation: '条件语尾 -(으)면 加 되다，表示满足某条件就足够、没有更多要求，相当于"只要…就可以了"。用于说明做法、给对方宽心或简化要求。其反义是表禁止的 -(으)면 안 되다。', explanationEn: 'Conditional ending -(으)면 plus 되다, meaning meeting a condition is enough with no further demands, equivalent to "just... is fine." Used to explain how-to, reassure, or simplify requirements. Its opposite is the prohibitive -(으)면 안 되다.',
    conjugation: '无收音/ㄹ + 면 되다 (하다→하면 되다)\n有收音 + 으면 되다 (누르다→누르면 되다)', conjugationEn: 'No batchim/ㄹ + 면 되다 (하다→하면 되다)\\nWith batchim + 으면 되다 (누르다→누르면 되다)',
    examples: [
      { ko: '이 서류 작성하고 제출하면 돼요. 어렵지 않아요.', zh: '填写这份文件提交就行了，不难的。', zhEn: 'Just fill out this form and submit it—it\'s not hard.', note: '只要就行：填了提交就行', noteEn: 'Just need to: just fill it in and submit' },
      { ko: '여기 누르면 돼요. 간단하죠?', zh: '按这里就行了，简单吧？', zhEn: 'Just press here—simple, right?', note: '只要就行：按这里就行', noteEn: 'Just need to: just press here' },
      { ko: '이 쿠폰만 보여 주면 돼요. 따로 준비 안 해도 돼요.', zh: '只要出示这张优惠券就行了，不需要另外准备。', zhEn: 'Just show this coupon—no need to prepare anything else.', note: '只要就行：出示券就行', noteEn: 'Just show the ticket and you\'re good.' },
    ],
    similarPatterns: ['-(으)면 안 되다', '-아/어야 하다'],
    difference: '-(으)면 되다 是"只要…就够了"（宽松，满足条件即可，"누르면 돼요"按一下就行）；-(으)면 안 되다 是禁止（"누르면 안 돼요"不能按）；-아/어야 하다 是义务（"눌러야 해요"必须按）。되다＝足够，안 되다＝禁止，야 하다＝必须。', differenceEn: '-(으)면 되다 means "just... is enough" (relaxed, meeting the condition suffices, e.g., "누르면 돼요" just press it); -(으)면 안 되다 means prohibition ("누르면 안 돼요" you can\'t press it); -아/어야 하다 means obligation ("눌러야 해요" you must press it). 되다 = enough, 안 되다 = forbidden, 야 하다 = must.',
    toriTip: '🐰 -(으)면 돼요 是给人宽心的一句话——"这样就行了，别担心"。教别人操作时超好用："여기 클릭하면 돼요"（点这里就好）。语气轻松，让复杂的事听起来很简单。', toriTipEn: '🐰 -(으)면 돼요 is a reassuring phrase—"that\'s all you need, don\'t worry." It\'s great for guiding someone: "여기 클릭하면 돼요" (just click here). The tone is light, making complex things sound simple.',
  },

  // src: card-p9-l04
  {
    id: 'g105', title: '每/每当', titleEn: 'Every / Whenever', pattern: '마다 / -(으)ㄹ 때마다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '조사',
    usage: '表示"每…/每逢…都…"的反复', usageEn: 'Indicates repetition of "every... / whenever..."',
    explanation: '마다 接在名词后表示"每一个（都）"（날마다 每天、주말마다 每周末）；-(으)ㄹ 때마다 接在动词后表示"每当…的时候就…"，强调每次都规律发生的情况。', explanationEn: '마다 attaches to nouns to mean "every" (날마다 every day, 주말마다 every weekend); -(으)ㄹ 때마다 attaches to verbs to mean "whenever...", emphasizing that it happens regularly each time.',
    conjugation: '名词 + 마다（不受收音影响）\n动词/形容词词干 + (으)ㄹ 때마다\n无收音/ㄹ + ㄹ 때마다 (보다→볼 때마다)\n有收音 + 을 때마다 (듣다→들을 때마다)', conjugationEn: 'Noun + 마다 (no batchim restriction)\\nVerb/adjective stem + (으)ㄹ 때마다\\nNo batchim/ㄹ + ㄹ 때마다 (보다→볼 때마다)\\nWith batchim + 을 때마다 (듣다→들을 때마다)',
    examples: [
      { ko: '이 노래를 들을 때마다 그 시절이 생각나요.', zh: '每次听这首歌都会想起那段时光。', zhEn: 'Every time I hear this song, I think of those times.', note: '每当：每次听都想起', noteEn: 'Whenever: I think of it every time I listen.' },
      { ko: '날마다 30분씩 운동하려고 해요.', zh: '打算每天运动30分钟。', zhEn: 'I plan to exercise for 30 minutes every day.', note: '每：每天运动', noteEn: 'Every: I exercise every day.' },
      { ko: '이 드라마를 볼 때마다 행복해요.', zh: '每次看这部剧都很幸福。', zhEn: 'Every time I watch this show, I feel happy.', note: '每当：每次看都幸福', noteEn: 'Whenever: I\'m happy every time I see it.' },
    ],
    similarPatterns: ['동안', '-(으)면'],
    difference: '마다/-(으)ㄹ 때마다 强调"每一次都规律发生"（"볼 때마다 행복해요"每次看都幸福）；동안 是"在…期间"的持续时间段（"보는 동안"看的期间）；-(으)면 是单纯条件（"보면"如果看）。마다 突出"每次无一例外"的反复性。', differenceEn: '마다/-(으)ㄹ 때마다 emphasizes "happens regularly every time" ("볼 때마다 행복해요" happy every time I see it); 동안 is a duration period ("보는 동안" while watching); -(으)면 is a simple condition ("보면" if you see). 마다 highlights the repetition of "every time without exception."',
    toriTip: '🐰 名词后加 마다＝"每"：날마다(每天)、사람마다(每个人)、나라마다(每个国家)。动词后用"-을 때마다"＝"每当…就…"："널 볼 때마다 설레"（每次见到你都心动）——K-pop歌词最爱的句型。', toriTipEn: '🐰 Adding 마다 to a noun = "every": 날마다 (every day), 사람마다 (every person), 나라마다 (every country). After verbs, use "-을 때마다" = "whenever...": "널 볼 때마다 설레" (my heart flutters every time I see you)—a favorite K-pop lyric pattern.',
  },

  // src: card-p9-l05
  {
    id: 'g106', title: '姑且承认', titleEn: 'Concede for now', pattern: '-기는 하다',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"…倒是…（但是）"，先承认再转折', usageEn: 'Indicates "...is true, but...", conceding first then contrasting.',
    explanation: '把动词/形容词用 -기는 名词化后接 하다，表示姑且承认前项属实，但随后往往跟出保留、限制或转折（"倒是…不过…"）。中间的谓语可重复本动词（먹기는 먹다），口语常说 -긴 하다。', explanationEn: 'Nominalize a verb/adjective with -기는 and attach 하다 to concede the first part is true, but then add a reservation, limitation, or contrast ("it\'s true, but..."). The predicate can repeat the verb (먹기는 먹다); in speech, -긴 하다 is common.',
    conjugation: '动词/形容词词干 + 기는 하다（口语 -긴 하다）\n过去 + 기는 했다\n后半常接 -는데/-지만 引出转折', conjugationEn: 'Verb/adjective stem + 기는 하다 (colloquial -긴 하다)\\nPast + 기는 했다\\nOften followed by -는데/-지만 for contrast',
    examples: [
      { ko: '그 가수 좋아하기는 하는데 요즘 노래는 별로예요.', zh: '倒是喜欢那个歌手，但最近的歌不太行。', zhEn: 'I do like that singer, but their recent songs aren\'t great.', note: '姑且承认：喜欢是喜欢，但…', noteEn: 'Concede: I like it, but...' },
      { ko: '매운 거 먹기는 하는데 많이는 못 먹어요.', zh: '辣的倒是吃，但吃不了太多。', zhEn: 'I do eat spicy food, but I can\'t handle too much.', note: '姑且承认：吃是吃，但…', noteEn: 'Concede: I\'ll eat it, but...' },
      { ko: '공부하기는 했는데 시험이 너무 어려웠어요.', zh: '倒是学了，但考试太难了。', zhEn: 'I did study, but the exam was too hard.', note: '姑且承认：学是学了，但…', noteEn: 'Concede: I studied, but...' },
    ],
    similarPatterns: ['-지만', '-는데'],
    difference: '-기는 하다 先"部分承认某点属实"再转折，焦点在"…这一点是成立的，只是…"（"좋아하기는 해요"喜欢是喜欢的）；-지만/-는데 是直接连接两个分句的转折/背景，不带"姑且承认"的语感。想强调"这点我认，但…"时用 -기는 하다。', differenceEn: '-기는 하다 first "partially admits a point is true" then contrasts, focusing on "this point holds, but..." ("좋아하기는 해요" I do like it); -지만/-는데 directly connects two clauses for contrast/background without the "concede" nuance. Use -기는 하다 to emphasize "I admit this, but..."',
    toriTip: '🐰 -기는 하다（口语 -긴 하다）是"…是…，但是"的欲扬先抑。"예쁘긴 한데 좀 비싸요"（好看是好看，就是有点贵）。想委婉给出保留意见时，先用它认一半，对方更容易接受后半句。', toriTipEn: '🐰 -기는 하다 (colloquial -긴 하다) is the "it\'s true, but..." of praising then qualifying. "예쁘긴 한데 좀 비싸요" (it\'s pretty, but a bit pricey). To give a gentle reservation, concede half first—the other person will accept the second half more easily.',
  },

  // src: card-p9-l08
  {
    id: 'g107', title: '开始', titleEn: 'start', pattern: '-기 시작하다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"开始做…"', usageEn: 'Indicates "begin to do..."',
    explanation: '把动词用 -기 名词化后接 시작하다，表示某动作或状态的开始。是描述动作起点的高频结构，可自由搭配时间状语（작년부터、갑자기 等）。', explanationEn: 'Nominalize a verb with -기 and attach 시작하다 to indicate the start of an action or state. A common structure for describing a starting point, freely combinable with time adverbs (작년부터, 갑자기, etc.).',
    conjugation: '动词词干 + 기 시작하다\n过去 + 기 시작했다', conjugationEn: 'Verb stem + 기 시작하다\\nPast + 기 시작했다',
    examples: [
      { ko: '작년부터 한국어를 배우기 시작했어요.', zh: '从去年开始学韩语了。', zhEn: 'I started learning Korean last year.', note: '开始：去年开始学', noteEn: 'Start: I started learning last year.' },
      { ko: '한국어를 배우기 시작했어요.', zh: '开始学韩语了。', zhEn: 'I started learning Korean.', note: '开始：开始学习', noteEn: 'Start: Begin Learning' },
      { ko: '그 노래를 좋아하기 시작했어요.', zh: '开始喜欢上那首歌了。', zhEn: 'I started liking that song.', note: '开始：开始喜欢', noteEn: 'Start: Begin to Like' },
    ],
    similarPatterns: ['-자마자', '-게 되다'],
    difference: '-기 시작하다 强调动作的"起点/开端"（"비가 오기 시작했어요"开始下雨了）；-자마자 强调"一…就立刻…"的紧接先后（"도착하자마자"一到就）；-게 되다 强调自然演变的结果。前者标记开始，后两者分别标记紧接和结果。', differenceEn: '-기 시작하다 emphasizes the "starting point/beginning" of an action ("비가 오기 시작했어요" it started raining); -자마자 emphasizes the immediate sequence of "as soon as..." ("도착하자마자" as soon as arriving); -게 되다 emphasizes the result of a natural change. The former marks the start, while the latter two mark immediacy and result, respectively.',
    toriTip: '🐰 -기 시작하다 = "开始…"。任何动词加 -기 시작하다 就是它的起点："운동하기 시작했어요"（开始运动了）、"울기 시작했어요"（哭起来了）。想说自己养成了新习惯，用它开头正合适。', toriTipEn: '🐰 -기 시작하다 = "to start...". Add -기 시작하다 to any verb to mark its starting point: "운동하기 시작했어요" (started exercising), "울기 시작했어요" (started crying). If you want to say you\'ve picked up a new habit, this is the perfect way to start.',
  },

  // src: card-p9-l09
  {
    id: 'g108', title: '多亏', titleEn: 'Thanks to', pattern: '-(으)ㄴ 덕분에 / N 덕분에',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '연결',
    usage: '表示"多亏了…（才有好结果）"', usageEn: 'Indicates "thanks to... (a good result)"',
    explanation: '表示因为某人/某事的正面帮助而得到好结果，相当于"多亏了、托…的福"。名词直接加 덕분에，动词用冠形词形 -(으)ㄴ/는 덕분에。后句一定是好结果。其反义是表负面原因的 -(으)ㄴ 탓에。', explanationEn: 'Indicates a good result due to someone\'s/something\'s positive help, equivalent to "thanks to" or "owing to." Add 덕분에 directly to nouns, and use the adnominal form -(으)ㄴ/는 덕분에 with verbs. The following clause must be a positive outcome. Its opposite is -(으)ㄴ 탓에, which indicates a negative cause.',
    conjugation: '名词 + 덕분에 (선생님 덕분에)\n动词过去 + (으)ㄴ 덕분에 (도와준 덕분에)\n动词现在 + 는 덕분에', conjugationEn: 'Noun + 덕분에 (선생님 덕분에)\\nVerb past + (으)ㄴ 덕분에 (도와준 덕분에)\\nVerb present + 는 덕분에',
    examples: [
      { ko: '선생님 덕분에 시험에 합격했어요. 정말 감사합니다.', zh: '多亏了老师，我考过了。真的非常感谢。', zhEn: 'Thanks to my teacher, I passed the exam. I\'m really grateful.', note: '多亏：多亏老师合格', noteEn: 'Thanks to: Passed thanks to the teacher' },
      { ko: '네 덕분에 버텼어. 고마워.', zh: '多亏有你我才撑过来的。谢谢你。', zhEn: 'Thanks to you, I got through it. Thank you.', note: '多亏：多亏你撑住', noteEn: 'Thanks to: Held on thanks to you' },
      { ko: '오빠 덕분에 매일 행복해요. 항상 응원할게요.', zh: '多亏了欧巴，每天都很幸福。我会一直支持你的。', zhEn: 'Thanks to oppa, I\'m happy every day. I\'ll always support you.', note: '多亏：多亏欧巴幸福', noteEn: 'Thanks to: Happy thanks to oppa' },
    ],
    similarPatterns: ['-(으)ㄴ 탓에', '때문에'],
    difference: '덕분에 只接好结果（正面感谢，"덕분에 합격했어요"多亏了才合格）；-(으)ㄴ 탓에 只接坏结果（归咎，"탓에 실패했어요"因…才失败）；때문에 中性，好坏皆可。感谢用 덕분에，抱怨用 탓에。', differenceEn: '덕분에 only pairs with positive results (grateful, "덕분에 합격했어요" passed thanks to it); -(으)ㄴ 탓에 only pairs with negative results (blaming, "탓에 실패했어요" failed because of it); 때문에 is neutral, usable for both. Use 덕분에 to thank, 탓에 to complain.',
    toriTip: '🐰 덕분에 是道谢的黄金搭档，后面永远跟好事。"덕분에 잘 지냈어요"（托您的福过得很好）是韩国人的客套标配。想抱怨谁"都怪…"，就换成 탓에——两个词感情色彩正好相反。', toriTipEn: '🐰 덕분에 is the golden partner for saying thanks, and it\'s always followed by something good. "덕분에 잘 지냈어요" (I\'ve been well, thanks to you) is a standard Korean pleasantry. If you want to complain that something is "all someone\'s fault," switch to 탓에—the two words have exactly opposite tones.',
  },

  // =====================================================================
  //  批量提炼扩充 B3（P10-P12，中级补充）
  // =====================================================================

  // src: card-p10-l01
  {
    id: 'g109', title: '仅仅', titleEn: 'Merely', pattern: '-(으)ㄹ 뿐(이다)',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '强调"只不过…而已"，限定范围', usageEn: 'Emphasizes "just... that\'s all," limiting the scope',
    explanation: '接在动词/形容词后，强调"仅仅、只不过是这样，没有别的"。常用 -(으)ㄹ 뿐이다 收尾表示"只是…罢了"，或 -(으)ㄹ 뿐(이고/아니라) 接续。名词用 일 뿐이다。带有淡化、澄清或谦虚的语气。', explanationEn: 'Attached after verbs/adjectives, it emphasizes "merely, just this and nothing else." Commonly ends with -(으)ㄹ 뿐이다 meaning "just... that\'s all," or continues with -(으)ㄹ 뿐(이고/아니라). For nouns, use 일 뿐이다. It carries a tone of downplaying, clarifying, or modesty.',
    conjugation: '无收音/ㄹ + ㄹ 뿐이다 (도와주다→도와줄 뿐이다)\n有收音 + 을 뿐이다 (먹다→먹을 뿐이다)\n名词 + 일 뿐이다\n过去 + 았/었을 뿐이다', conjugationEn: 'No batchim/ㄹ + ㄹ 뿐이다 (도와주다→도와줄 뿐이다)\\nWith batchim + 을 뿐이다 (먹다→먹을 뿐이다)\\nNoun + 일 뿐이다\\nPast + 았/었을 뿐이다',
    examples: [
      { ko: '저는 그냥 도와주려고 했을 뿐이에요. 나쁜 뜻은 없었어요.', zh: '我只是想帮忙而已，没有恶意。', zhEn: 'I just wanted to help—no ill intent.', note: '仅仅：只是想帮忙', noteEn: 'Merely: Just wanted to help' },
      { ko: '미안해. 나한테 넌 그냥 친구일 뿐이야.', zh: '对不起，对我来说你只是朋友而已。', zhEn: 'Sorry, but to me, you\'re just a friend.', note: '仅仅：只是朋友', noteEn: 'Merely: Just friends' },
      { ko: '저는 아직 배우는 중일 뿐이에요. 잘 부탁드립니다.', zh: '我还只是在学习中而已，请多关照。', zhEn: 'I\'m still just learning, so please take care of me.', note: '仅仅：只是在学习', noteEn: 'Merely: Just studying' },
    ],
    similarPatterns: ['-(으)ㄹ 뿐만 아니라', '만'],
    difference: '-(으)ㄹ 뿐(이다) 强调"仅仅、只不过如此"（淡化/澄清，"친구일 뿐이야"只是朋友而已）；-(으)ㄹ 뿐만 아니라 是"不仅…而且"的递进（g38，"잘할 뿐만 아니라 춤도"）。同是 뿐，前者收尾表"只是"，后者接 만 아니라 表"不仅"。', differenceEn: '-(으)ㄹ 뿐(이다) emphasizes "merely, just that" (downplaying/clarifying, "친구일 뿐이야" just friends); -(으)ㄹ 뿐만 아니라 is the additive "not only... but also" (g38, "잘할 뿐만 아니라 춤도"). Both use 뿐, but the former ends with "just," while the latter adds 만 아니라 for "not only."',
    toriTip: '🐰 -(으)ㄹ 뿐이에요 是澄清和谦虚的利器。"그냥 할 일을 했을 뿐이에요"（我只是做了该做的而已）——被夸时用它谦虚一下，既得体又不做作。', toriTipEn: '🐰 -(으)ㄹ 뿐이에요 is a great tool for clarifying and being modest. "그냥 할 일을 했을 뿐이에요" (I just did what I had to do)—use it to brush off praise gracefully without sounding fake.',
  },

  // src: card-p10-l02
  {
    id: 'g110', title: '愿望', titleEn: 'Wish', pattern: '-았/었으면 좋겠다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"要是…就好了、希望…"', usageEn: 'Indicates "if only... would be nice, hope..."',
    explanation: '用条件 -(으)면（常配过去时 -았/었으면）加 좋겠다，表达说话人的愿望或期盼，相当于"要是…就好了"。既可用于对未来的期望，也可表达当下难以实现的希望。', explanationEn: 'Uses the conditional -(으)면 (often with past tense -았/었으면) plus 좋겠다 to express the speaker\'s wish or hope, equivalent to "if only... would be nice." It can be used for future hopes or wishes that are hard to fulfill now.',
    conjugation: '词干 + (으)면 좋겠다\n常用过去形式 + 았/었으면 좋겠다（愿望语气更强）', conjugationEn: 'Stem + (으)면 좋겠다\\nCommonly past form + 았/었으면 좋겠다 (stronger wish)',
    examples: [
      { ko: '빨리 나았으면 좋겠어요.', zh: '希望你早日康复。', zhEn: 'I hope you recover soon.', note: '愿望：希望康复', noteEn: 'Wish: I hope to recover' },
      { ko: '내일 날씨가 맑았으면 좋겠다.', zh: '希望明天天气晴朗。', zhEn: 'I hope the weather is clear tomorrow.', note: '愿望：希望天晴', noteEn: 'Wish: I hope it clears up' },
      { ko: '많이 힘들죠? 빨리 나았으면 좋겠어요. 푹 쉬세요.', zh: '很难受吧？希望你早日康复，好好休息。', zhEn: 'It\'s tough, right? I hope you recover soon and get plenty of rest.', note: '愿望：希望快好起来', noteEn: 'Wish: I hope to get better soon' },
    ],
    similarPatterns: ['-기(를) 바라다', '-고 싶다'],
    difference: '-(으)면 좋겠다 是口语化的愿望（"나았으면 좋겠어요"要是好了就好了，对自己/对他人都可）；-기를 바라다 更正式书面（"합격하기를 바라요"祝愿合格）；-고 싶다 是自己想做某事（"가고 싶어요"我想去）。愿望用前两个，自己的欲望用 -고 싶다。', differenceEn: '-(으)면 좋겠다 is a colloquial wish ("나았으면 좋겠어요" = I hope you get better; can be used for yourself or others); -기를 바라다 is more formal/written ("합격하기를 바라요" = I hope you pass); -고 싶다 is for something you want to do yourself ("가고 싶어요" = I want to go). Use the first two for wishes, and -고 싶다 for your own desires.',
    toriTip: '🐰 -았으면 좋겠다 是许愿句型，注意常用过去时 았/었 但说的是现在/未来的愿望。"돈이 많았으면 좋겠다"（要是有很多钱就好了）——这个"过去时"其实是虚拟愿望，别被字面骗了。', toriTipEn: '🐰 -았으면 좋겠다 is a wish pattern. Note it often uses the past tense 았/었 but refers to present/future wishes. "돈이 많았으면 좋겠다" (I wish I had a lot of money) — this "past tense" is actually a hypothetical wish, don\'t be fooled by the literal form.',
  },

  // src: card-p10-l02
  {
    id: 'g111', title: '祝愿', titleEn: 'wish', pattern: '-기(를) 바라다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"希望/祝愿…"，较正式', usageEn: 'Expresses "hope/wish for...", more formal',
    explanation: '把动词/形容词用 -기 名词化后接 바라다（希望），表示说话人的期望或祝愿。比 -(으)면 좋겠다 更正式、更书面，常用于致辞、书信、正式祝福。', explanationEn: 'Nominalize a verb/adjective with -기 and attach 바라다 (to hope), expressing the speaker\'s expectation or wish. More formal and written than -(으)면 좋겠다, often used in speeches, letters, and formal blessings.',
    conjugation: '动词/形容词词干 + 기(를) 바라다\n口语 바라요 / 书面 바랍니다', conjugationEn: 'Verb/adjective stem + 기(를) 바라다\\nColloquial: 바라요 / Written: 바랍니다',
    examples: [
      { ko: '건강하시기를 바랍니다.', zh: '祝您身体健康。', zhEn: 'I wish you good health.', note: '祝愿：祝健康', noteEn: 'Wish: Wishing you health' },
      { ko: '시험에 합격하기를 바라요.', zh: '希望你能考过。', zhEn: 'I hope you pass the exam.', note: '祝愿：祝考过', noteEn: 'Wish: Wishing you pass the exam' },
      { ko: '내일 시험 잘 보기를 바라요. 잘 할 수 있을 거예요!', zh: '希望你明天考试顺利。你一定可以的！', zhEn: 'I hope your exam goes well tomorrow. You\'ve got this!', note: '祝愿：祝考试顺利', noteEn: 'Wish: Wishing you success on your exam' },
    ],
    similarPatterns: ['-(으)면 좋겠다'],
    difference: '-기를 바라다 更正式书面（致辞、祝福语，"건강하시기를 바랍니다"祝您健康）；-(으)면 좋겠다 更口语亲切（"건강했으면 좋겠어요"希望你健康）。正式场合、写贺卡用前者，日常聊天用后者。', differenceEn: '-기를 바라다 is more formal/written (speeches, blessings, "건강하시기를 바랍니다" = Wishing you health); -(으)면 좋겠다 is more colloquial and friendly ("건강했으면 좋겠어요" = I hope you\'re healthy). Use the former for formal occasions and cards, the latter for everyday chat.',
    toriTip: '🐰 -기를 바랍니다 是正式祝福的标准句式，毕业致辞、贺卡、颁奖都用它。"행복하기를 바랍니다"（祝你幸福）。和朋友随口说愿望，换成口语的 -았으면 좋겠어 更自然。', toriTipEn: '🐰 -기를 바랍니다 is the standard pattern for formal blessings, used in graduation speeches, cards, and award ceremonies. "행복하기를 바랍니다" (Wishing you happiness). For casual wishes with friends, switch to the colloquial -았으면 좋겠어 for a more natural tone.',
  },

  // src: card-p10-l04
  {
    id: 'g112', title: '目的', titleEn: 'Purpose', pattern: '-기 위해서 / N을/를 위해서',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '연결',
    usage: '表示"为了…（而做）"', usageEn: 'Expresses "in order to..."',
    explanation: '表示行为的目的。动词用 -기 위해서（为了做…），名词用 을/를 위해서（为了…）。后句是为达成该目的所进行的动作。比口语的 -(으)려고 更正式，常用于书面和郑重表达。', explanationEn: 'Indicates the purpose of an action. Use -기 위해서 with verbs (to do...), and 을/를 위해서 with nouns (for...). The following clause is the action taken to achieve that purpose. More formal than the colloquial -(으)려고, often used in writing and solemn expressions.',
    conjugation: '动词词干 + 기 위해서 (따다→따기 위해서)\n名词 + 을/를 위해서 (가족을 위해서)\n也作 -기 위해 / 을 위해（更书面）', conjugationEn: 'Verb stem + 기 위해서 (따다→따기 위해서)\\nNoun + 을/를 위해서 (가족을 위해서)\\nAlso as -기 위해 / 을 위해 (more written)',
    examples: [
      { ko: '한국어를 잘하기 위해서 매일 공부해요.', zh: '为了学好韩语，每天都学习。', zhEn: 'I study every day to learn Korean well.', note: '目的：为学好韩语', noteEn: 'Purpose: To study Korean well' },
      { ko: '가족을 위해서 열심히 일해요.', zh: '为了家人努力工作。', zhEn: 'I work hard for my family.', note: '目的：为了家人', noteEn: 'Purpose: For my family' },
      { ko: 'TOPIK 6급을 따기 위해서 하루에 두 시간씩 공부해요.', zh: '为了拿到TOPIK 6级，每天学习两小时。', zhEn: 'I study two hours a day to get TOPIK Level 6.', note: '目的：为拿6级', noteEn: 'Purpose: To get Level 6' },
    ],
    similarPatterns: ['-(으)려고', '-도록'],
    difference: '-기 위해서 是较正式的"为了目的"（可接名词 을/를 위해서，"가족을 위해서"为了家人）；-(으)려고 是口语的意图（只接动词，"먹으려고"为了吃）；-도록 强调"使…能够/达到某程度"。正式书面表目的用 -기 위해서。', differenceEn: '-기 위해서 is the more formal "for the purpose of" (can take nouns as 을/를 위해서, "가족을 위해서" = for family); -(으)려고 is colloquial intent (verbs only, "먹으려고" = to eat); -도록 emphasizes "making something possible/reaching a certain degree". For formal written purposes, use -기 위해서.',
    toriTip: '🐰 -기 위해서 = "为了…"，比口语的 -(으)려고 正式。写目标、写计划时用它显得郑重："꿈을 이루기 위해서 노력해요"（为了实现梦想而努力）。名词直接用 을/를 위해서："너를 위해서"（为了你）。', toriTipEn: '🐰 -기 위해서 = "in order to...", more formal than the colloquial -(으)려고. Use it when writing goals or plans to sound serious: "꿈을 이루기 위해서 노력해요" (I work hard to achieve my dreams). For nouns, use 을/를 위해서 directly: "너를 위해서" (for you).',
  },

  // src: card-p10-l05
  {
    id: 'g113', title: '范围之中', titleEn: 'Among a range', pattern: '중에서',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '조사',
    usage: '表示"在…之中、…当中"', usageEn: 'Indicates "among...", "within..."',
    explanation: '接在名词后，表示从一定范围或群体中选取、比较，相当于"在…当中、…里面"。常与最高级或选择性疑问搭配（제일、가장、어떤 것）。', explanationEn: 'Attached to nouns, it indicates selecting or comparing from a certain range or group, equivalent to "among...", "within...". Often used with superlatives or selective questions (제일, 가장, 어떤 것).',
    conjugation: '名词 + 중에서\n口语可缩略为 중에', conjugationEn: 'Noun + 중에서\\nColloquially can be shortened to 중에',
    examples: [
      { ko: '이 중에서 어떤 게 제일 마음에 들어요?', zh: '在这些当中，哪个最合你心意？', zhEn: 'Among these, which one suits you best?', note: '范围之中：这些里选一个', noteEn: 'Within a range: pick one from these' },
      { ko: '세 명 중에서 한 명만 합격했어요.', zh: '三人当中只有一人通过了。', zhEn: 'Only one out of the three passed.', note: '范围之中：三人里一人', noteEn: 'Within a range: one out of three people' },
      { ko: '메뉴 중에서 뭐가 제일 맛있어요? 추천해 주세요.', zh: '菜单里哪个最好吃？请推荐一下。', zhEn: 'Which is the most delicious on the menu? Please recommend one.', note: '范围之中：菜单里选', noteEn: 'Within a range: choose from the menu' },
    ],
    similarPatterns: ['에서', '가운데'],
    difference: '중에서 强调"从一群/一定范围中"选取比较（"셋 중에서"三个当中）；单纯的 에서 是动作场所或出发点（"학교에서"在学校）。표示"…当中最…"时用 중에서，不用 에서。가운데 与 중에서 义近，更书面。', differenceEn: '중에서 emphasizes selection from a group or range ("셋 중에서" = among three); regular 에서 marks the location of an action or starting point ("학교에서" = at school). When expressing "the most among..." use 중에서, not 에서. 가운데 is similar to 중에서 but more formal/literary.',
    toriTip: '🐰 중에서 = "…当中"，选择和比较必备。"이 중에서 골라 보세요"（从这些里面挑吧）、"친구들 중에서 제일 친해요"（在朋友里最要好）。想问"哪个最…"，前面加个"…중에서"就地道了。', toriTipEn: '🐰 중에서 = "among...", essential for choosing and comparing. "이 중에서 골라 보세요" (pick from these), "친구들 중에서 제일 친해요" (closest among friends). To ask "which is the most...", just add "...중에서" before it.',
  },

  // src: card-p10-l07
  {
    id: 'g114', title: '结果状态持续', titleEn: 'Result state continues', pattern: '-아/어 있다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '시제',
    usage: '表示动作完成后状态的持续（"…着"）', usageEn: 'Indicates a state that continues after an action is completed ("...ing" as in a state)',
    explanation: '接在动词后，表示动作完成后所形成的状态一直持续，相当于"…着"。多用于不及物动词（앉다、서다、열리다、켜지다 等）。与表示动作进行中的 -고 있다 形成对比。', explanationEn: 'Attached to verbs, it indicates a state that persists after the action is done, like "...ing" (state). Mostly used with intransitive verbs (앉다, 서다, 열리다, 켜지다, etc.). Contrasts with -고 있다, which marks ongoing action.',
    conjugation: '词干元音 ㅏ/ㅗ → 아 있다 (앉다→앉아 있다)\n其他元音 → 어 있다 (열리다→열려 있다)\n하다类少用（状态多用 -고 있다）', conjugationEn: 'Stem vowel ㅏ/ㅗ → 아 있다 (앉다→앉아 있다)\\nOther vowels → 어 있다 (열리다→열려 있다)\\n하다 verbs rarely use this (states often use -고 있다)',
    examples: [
      { ko: '의자에 앉아 있어요.', zh: '坐在椅子上（坐着的状态）。', zhEn: 'Sitting on a chair (state of being seated).', note: '状态持续：坐着', noteEn: 'State continues: sitting' },
      { ko: '문이 열려 있어요.', zh: '门开着（开的状态）。', zhEn: 'The door is open (state of being open).', note: '状态持续：开着', noteEn: 'State continues: open' },
      { ko: '카페에 들어갔더니 이미 친구가 와서 앉아 있었어요.', zh: '走进咖啡厅，朋友已经来坐着了。', zhEn: 'Walked into the café, my friend was already there sitting.', note: '状态持续：已经坐着', noteEn: 'State continues: already sitting' },
    ],
    similarPatterns: ['-고 있다'],
    difference: '-아/어 있다 强调动作完成后"结果状态的持续"（"앉아 있어요"坐着——已经坐下并保持），-고 있다 强调"动作进行中"（"앉고 있어요"正在坐下的过程）。门"开着"是 문이 열려 있어요（状态），门正被打开是 열리고 있어요（过程）。', differenceEn: '-아/어 있다 emphasizes the "result state" after an action ("앉아 있어요" sitting—already sat down and staying), while -고 있다 emphasizes "action in progress" ("앉고 있어요" in the process of sitting). The door "open" is 문이 열려 있어요 (state), being opened is 열리고 있어요 (process).',
    toriTip: '🐰 -아/어 있다 是"…着"的静态画面。"앉아 있어요"（坐着）、"서 있어요"（站着）、"켜져 있어요"（开着）——动作已经完成，状态还在持续。别和 -고 있다（正在做的动态过程）搞混。', toriTipEn: '🐰 -아/어 있다 is the static picture of "...ing" (state). "앉아 있어요" (sitting), "서 있어요" (standing), "켜져 있어요" (on)—the action is done, but the state continues. Don\'t confuse it with -고 있다 (dynamic ongoing action).',
  },

  // src: card-p10-l08
  {
    id: 'g115', title: '预先备置', titleEn: 'Prepared in advance', pattern: '-아/어 두다 / -아/어 놓다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"（预先）做好放着、保持某状态"', usageEn: 'Indicates doing something in advance and keeping it that way for later use',
    explanation: '接在动词后，表示做完某动作后有意保持其结果，供之后使用，相当于"…好（放着）、事先…着"。두다 和 놓다 用法基本相同，두다 略偏"留置备用"，놓다 略偏"放置"。', explanationEn: 'Attached to verbs, it means doing an action and intentionally keeping the result for later, like "...done (and set aside)". 두다 and 놓다 are basically the same; 두다 leans toward "set aside for use", 놓다 toward "place".',
    conjugation: '词干元音 ㅏ/ㅗ → 아 두다/놓다 (사다→사 두다)\n其他元音 → 어 두다/놓다 (넣다→넣어 두다)\n하다 → 해 두다/놓다', conjugationEn: 'Stem vowel ㅏ/ㅗ → 아 두다/놓다 (사다→사 두다)\\nOther vowels → 어 두다/놓다 (넣다→넣어 두다)\\n하다 → 해 두다/놓다',
    examples: [
      { ko: '미리 예약해 뒀어요.', zh: '提前预约好了（留着）。', zhEn: 'made a reservation in advance (kept it).', note: '预先备置：先约好', noteEn: 'Prepared in advance: set up an appointment' },
      { ko: '냉장고에 음식을 넣어 뒀어요.', zh: '把食物放进冰箱里存着了。', zhEn: 'put the food in the fridge and stored it.', note: '预先备置：存进冰箱', noteEn: 'Prepared in advance: put in the fridge' },
      { ko: '문을 열어 놓았어요.', zh: '把门开着（开了放那儿）。', zhEn: 'left the door open (opened it and left it).', note: '预先备置：开着门', noteEn: 'Prepared in advance: leave the door open' },
    ],
    similarPatterns: ['-아/어 있다', '-아/어 버리다'],
    difference: '-아/어 두다/놓다 强调"有意做好并保持以备后用"（主动，"사 뒀어요"买好备着）；-아/어 있다 是"结果状态自然持续"（多为不及物，"열려 있어요"开着）。前者是人有意为之的备置，后者是客观状态。버리다 则是"彻底做完（没了）"。', differenceEn: '-아/어 두다/놓다 emphasizes "intentionally doing and keeping for later" (active, "사 뒀어요" bought and set aside); -아/어 있다 is "result state naturally continuing" (mostly intransitive, "열려 있어요" open). The former is deliberate preparation, the latter is an objective state. 버리다 means "completely done (and gone)".',
    toriTip: '🐰 -아/어 두다/놓다 = "先…好放着"，透着未雨绸缪的踏实感。"미리 사 놨어요"（提前买好了）、"적어 뒀어요"（记下来备着）。两个基本通用，说快了 놓았어요 常缩成 놨어요。', toriTipEn: '🐰 -아/어 두다/놓다 = "do it in advance and keep it", with a sense of being prepared. "미리 사 놨어요" (bought it ahead), "적어 뒀어요" (wrote it down for later). They\'re basically interchangeable; 놓았어요 often shortens to 놨어요.',
  },

  // src: card-p11-l04
  {
    id: 'g116', title: '尝试后发现', titleEn: 'Discovered after trying', pattern: '-아/어 보니까',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '연결',
    usage: '表示"（试着）做了之后才发现…"', usageEn: 'Indicates discovering something after (trying) doing it',
    explanation: '由 -아/어 보다（尝试）加 -(으)니까（发现）组合而成，表示实际做了某事之后才发现、意识到某种情况。后句常是做之前没料到的新认识，常与 -더라고요 搭配。', explanationEn: 'Combining -아/어 보다 (to try) with -(으)니까 (to discover), this expresses realizing or noticing something after actually doing it. The second clause is often a new insight you didn\'t expect before doing it, and it\'s commonly paired with -더라고요.',
    conjugation: '词干 + 아/어 보니까\n元音 ㅏ/ㅗ → 아 보니까 (살다→살아 보니까)\n其他 → 어 보니까 (먹다→먹어 보니까)', conjugationEn: 'Stem + 아/어 보니까\\nVowel ㅏ/ㅗ → 아 보니까 (살다→살아 보니까)\\nOther → 어 보니까 (먹다→먹어 보니까)',
    examples: [
      { ko: '직접 먹어 보니까 생각보다 맛있었어요.', zh: '亲自吃了之后发现比想象中好吃。', zhEn: 'After trying it myself, I found it tastier than I expected.', note: '尝试后发现：吃了才知好吃', noteEn: 'Discovered after trying: it\'s tasty once you eat it' },
      { ko: '한국에 살아 보니까 생각보다 살기 좋더라고요.', zh: '在韩国住了之后发现比想象中好住。', zhEn: 'After living in Korea, I found it more comfortable than I expected.', note: '尝试后发现：住了才知好住', noteEn: 'Discovered after trying: it\'s comfortable once you live there' },
      { ko: '직접 먹어 보니까 정말 맛있더라고요. 추천해요.', zh: '亲自吃了之后发现真的很好吃，推荐。', zhEn: 'After trying it myself, I found it\'s really delicious, recommended.', note: '尝试后发现：吃了才知真好吃', noteEn: 'Discovered after trying: it\'s really delicious once you eat it' },
    ],
    similarPatterns: ['-(으)니까', '-았/었더니'],
    difference: '-아/어 보니까 强调"亲身尝试之后才发现"（"먹어 보니까 맛있어요"吃了才知道好吃，重在体验后的新认识）；单纯 -(으)니까 是原因或一般性发现（"먹으니까 배불러요"因为吃了所以饱）。想突出"试过之后的领悟"用 -아/어 보니까。', differenceEn: '-아/어 보니까 emphasizes "discovering after firsthand experience" ("먹어 보니까 맛있어요" — it\'s tasty once you eat it, focusing on the new realization after experience); plain -(으)니까 is for reasons or general discoveries ("먹으니까 배불러요" — I\'m full because I ate). To highlight "the insight after trying," use -아/어 보니까.',
    toriTip: '🐰 -아/어 보니까 = "试了之后才发现…"，分享真实体验的黄金句型。"가 보니까 별로였어요"（去了才发现一般般）、"해 보니까 어렵더라고요"（做了才发现挺难）。后面配 -더라고요 更有"亲身体会"的味道。', toriTipEn: '🐰 -아/어 보니까 = "after trying, I found out…" — the golden pattern for sharing real experiences. "가 보니까 별로였어요" (went and found it was just so-so), "해 보니까 어렵더라고요" (did it and found it hard). Pairing it with -더라고요 adds a "firsthand feel" flavor.',
  },

  // src: card-p11-l06
  {
    id: 'g117', title: '值得', titleEn: 'worth', pattern: '-(으)ㄹ 만하다',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"值得做…、还不错、可以一试"', usageEn: 'Means "worth doing…, not bad, worth a try"',
    explanation: '接在动词后，表示某事物值得去做、有做的价值，或程度上"还过得去、还不错"。常用于推荐（"值得一看/一试"）。', explanationEn: 'Attached after verbs, it indicates something is worth doing, has value in doing, or is "passable, not bad" in degree. Often used for recommendations ("worth watching/trying").',
    conjugation: '无收音/ㄹ + ㄹ 만하다 (보다→볼 만하다)\n有收音 + 을 만하다 (먹다→먹을 만하다)',
    examples: [
      { ko: '이 영화는 볼 만해요.', zh: '这部电影值得看。', zhEn: 'This movie is worth watching.', note: '值得：值得一看', noteEn: 'Worth: worth watching' },
      { ko: '이 식당은 한 번 가 볼 만해요.', zh: '这家餐厅值得去一次。', zhEn: 'This restaurant is worth visiting once.', note: '值得：值得一去', noteEn: 'Worth: worth going' },
      { ko: '이 앨범은 들을 만해요. 특히 타이틀곡이 좋아요.', zh: '这张专辑值得听，特别是主打曲很好。', zhEn: 'This album is worth listening to, especially the title track is great.', note: '值得：值得一听', noteEn: 'Worth: worth listening to' },
    ],
    similarPatterns: ['-(으)ㄹ 가치가 있다', '-(으)ㄹ 수 있다'],
    difference: '-(으)ㄹ 만하다 表示"值得做/还不错"的推荐或评价（"볼 만해요"值得看/还挺好看）；-(으)ㄹ 수 있다 是"能做到"的能力/可能（"볼 수 있어요"能看到）。推荐、给评价用 -(으)ㄹ 만하다，说能力用 -(으)ㄹ 수 있다。', differenceEn: '-(으)ㄹ 만하다 expresses a recommendation or evaluation of "worth doing/not bad" ("볼 만해요" — worth watching/pretty good); -(으)ㄹ 수 있다 is about ability/possibility of "can do" ("볼 수 있어요" — can see it). Use -(으)ㄹ 만하다 for recommendations and evaluations, and -(으)ㄹ 수 있다 for abilities.',
    toriTip: '🐰 -(으)ㄹ 만하다 是安利利器，"值得一试"的意思。"먹을 만해요"（挺好吃的/值得吃）、"가 볼 만해요"（值得去看看）。语气比"진짜 좋아요"含蓄，是韩国人推荐东西时的温和说法。', toriTipEn: '🐰 -(으)ㄹ 만하다 is a great tool for recommending things, meaning "worth a try." "먹을 만해요" (pretty tasty/worth eating), "가 볼 만해요" (worth going to see). It\'s more reserved than "진짜 좋아요" — a gentle way Koreans recommend things.',
  },

  // src: card-p11-l06
  {
    id: 'g118', title: '建议', titleEn: 'suggestion', pattern: '-는 게 좋겠다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"最好…、…比较好"的建议', usageEn: 'Expresses a suggestion of "it\'s best to…, it\'s better to…"',
    explanation: '由冠形词形 -는 것 加 이 좋겠다（口语缩略 -는 게 좋겠다）构成，表示对当前情况给出的建议或劝告，相当于"最好…、还是…比较好"。语气委婉，不强硬。', explanationEn: 'Formed from the adnominal form -는 것 plus 이 좋겠다 (colloquially shortened to -는 게 좋겠다), it gives a suggestion or advice for the current situation, equivalent to "it\'s best to…, it\'s better to…" The tone is gentle, not forceful.',
    conjugation: '动词词干 + 는 게 좋겠다\n（-는 것이 → 口语 -는 게）\n否定：-지 않는 게 좋겠다', conjugationEn: 'Verb stem + 는 게 좋겠다\\n(-는 것이 → colloquial -는 게)\\nNegative: -지 않는 게 좋겠다',
    examples: [
      { ko: '지금 출발하는 게 좋겠어요.', zh: '现在出发比较好。', zhEn: 'It\'s better to leave now.', note: '建议：最好现在走', noteEn: 'Suggestion: better to leave now' },
      { ko: '그 사람한테 먼저 연락해 보는 게 좋겠어요.', zh: '先联系那个人比较好。', zhEn: 'It\'s better to contact that person first.', note: '建议：最好先联系', noteEn: 'Suggestion: better to contact first' },
      { ko: '많이 피곤해 보이는데 오늘은 일찍 자는 게 좋겠어요.', zh: '看起来很累，今天早点睡比较好。', zhEn: 'You look tired; it\'s better to sleep early today.', note: '建议：最好早点睡', noteEn: 'Suggestion: better to sleep early' },
    ],
    similarPatterns: ['-(으)세요', '-는 게 어때요?'],
    difference: '-는 게 좋겠다 是委婉建议（"자는 게 좋겠어요"最好睡一下，不强硬）；-(으)세요 是直接命令/请求（"자세요"请睡）；-는 게 어때요? 是征询式提议（"자는 게 어때요?"睡一下怎么样？）。给建议想显得体贴用 -는 게 좋겠다。', differenceEn: '-는 게 좋겠다 is a gentle suggestion ("자는 게 좋겠어요" — better to sleep a bit, not forceful); -(으)세요 is a direct command/request ("자세요" — please sleep); -는 게 어때요? is a consultative proposal ("자는 게 어때요?" — how about sleeping a bit?). To give advice in a caring way, use -는 게 좋겠다.',
    toriTip: '🐰 -는 게 좋겠어요 是最温柔的建议方式，"我觉得…比较好哦"。比命令式的 -세요 柔软得多。劝朋友"还是早点休息吧"——"일찍 쉬는 게 좋겠어요"，关心的味道就出来了。', toriTipEn: '🐰 -는 게 좋겠어요 is the gentlest way to give advice, "I think it\'d be better to…" It\'s much softer than the imperative -세요. Telling a friend "you should rest early" — "일찍 쉬는 게 좋겠어요" — brings out that caring vibe.',
  },

  // src: card-p11-l08
  {
    id: 'g119', title: '看起来', titleEn: 'looks like', pattern: '-아/어 보이다',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"看起来…（外观印象）"', usageEn: 'Indicates "looks like... (appearance/impression)"',
    explanation: '接在形容词后，表示根据外观、样子做出的判断，相当于"看起来…、显得…"。基于视觉印象，主观感受。', explanationEn: 'Attached after adjectives, it expresses a judgment based on appearance or looks, equivalent to "looks..." or "seems...". It\'s based on visual impression and subjective feeling.',
    conjugation: '形容词词干 + 아/어 보이다\n元音 ㅏ/ㅗ → 아 보이다 (좋다→좋아 보이다)\n其他 → 어 보이다 (피곤하다→피곤해 보이다)', conjugationEn: 'Adjective stem + 아/어 보이다\\nVowel ㅏ/ㅗ → 아 보이다 (좋다→좋아 보이다)\\nOther → 어 보이다 (피곤하다→피곤해 보이다)',
    examples: [
      { ko: '오늘 좀 피곤해 보여요.', zh: '今天看起来有点累。', zhEn: 'You look a bit tired today.', note: '看起来：显得累', noteEn: 'looks tired' },
      { ko: '이 음식 맛있어 보여요.', zh: '这个食物看起来很好吃。', zhEn: 'This food looks delicious.', note: '看起来：显得好吃', noteEn: 'looks delicious' },
      { ko: '오늘 정말 행복해 보여요. 무슨 좋은 일 있어요?', zh: '今天看起来真的很开心，有什么好事吗？', zhEn: 'You look really happy today—did something good happen?', note: '看起来：显得开心', noteEn: 'looks happy' },
    ],
    similarPatterns: ['-나 보다', '-(으)ㄴ 것 같다'],
    difference: '-아/어 보이다 是"凭外观看起来…"（接形容词，基于视觉，"피곤해 보여요"看起来累）；-나 보다 是"看来是…"的推测（接动词，基于线索推断，"자나 봐요"看来在睡）。前者说外观印象，后者说推断结论。', differenceEn: '-아/어 보이다 means "looks... based on appearance" (attached to adjectives, based on vision, e.g., "피곤해 보여요" looks tired); -나 보다 is a guess meaning "seems..." (attached to verbs, based on clues, e.g., "자나 봐요" seems to be sleeping). The former describes appearance, the latter an inferred conclusion.',
    toriTip: '🐰 -아/어 보이다 = "看起来…"，关心人时超好用。"피곤해 보여요"（你看起来很累）、"기분 좋아 보여요"（你看起来心情不错）。夸人年轻还能说"어려 보여요"（看起来很年轻）——韩国人最爱听的一句。', toriTipEn: '🐰 -아/어 보이다 = "looks...", super useful when caring about someone. "피곤해 보여요" (you look tired), "기분 좋아 보여요" (you look in a good mood). To compliment youth, say "어려 보여요" (you look young) — a favorite among Koreans.',
  },

  // src: card-p11-l08
  {
    id: 'g120', title: '推测', titleEn: 'Supposition', pattern: '-나 보다 / -(으)ㄴ가 보다',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"看来是…、好像…（根据线索推测）"', usageEn: 'Indicates "seems like..." or "appears..." (inference based on clues)',
    explanation: '根据观察到的线索、迹象做出推测，相当于"看来…、好像…"。动词用 -나 보다，形容词/名词用 -(으)ㄴ가 보다。是说话人非亲眼所见、靠间接依据的判断。', explanationEn: 'Makes a guess based on observed clues or signs, equivalent to "seems..." or "appears...". Verbs use -나 보다, adjectives/nouns use -(으)ㄴ가 보다. It\'s a judgment based on indirect evidence, not direct observation.',
    conjugation: '动词词干 + 나 보다 (오다→오나 보다)\n形容词词干 + (으)ㄴ가 보다 (바쁘다→바쁜가 보다)\n名词 + 인가 보다', conjugationEn: 'Verb stem + 나 보다 (오다→오나 보다)\\nAdjective stem + (으)ㄴ가 보다 (바쁘다→바쁜가 보다)\\nNoun + 인가 보다',
    examples: [
      { ko: '밖에 비가 오나 봐요.', zh: '外面好像在下雨。', zhEn: 'It seems to be raining outside.', note: '推测：看来在下雨', noteEn: 'guess: seems to be raining' },
      { ko: '그 사람이 많이 바쁜가 봐요.', zh: '那个人好像很忙。', zhEn: 'That person seems busy.', note: '推测：看来很忙', noteEn: 'guess: seems busy' },
      { ko: '하늘이 흐린 걸 보니 비가 오나 봐요.', zh: '看天空阴沉，好像要下雨了。', zhEn: 'The sky looks gloomy; it seems like it\'s going to rain.', note: '推测：看天推测下雨', noteEn: 'guess: infer rain from the sky' },
    ],
    similarPatterns: ['-아/어 보이다', '-(으)ㄹ 것 같다'],
    difference: '-나 보다 是"根据线索推断"（非亲见，"불이 꺼진 걸 보니 없나 봐요"看灯灭了推测没人）；-아/어 보이다 是"凭外观看起来"（直接看到样子，接形容词）；-(으)ㄹ 것 같다 是较主观的推测。-나 보다 强调"由某迹象反推"。', differenceEn: '-나 보다 is "inferring from clues" (not directly seen, e.g., "불이 꺼진 걸 보니 없나 봐요" inferring no one\'s home from the lights off); -아/어 보이다 is "looks based on appearance" (directly seeing, attached to adjectives); -(으)ㄹ 것 같다 is a more subjective guess. -나 보다 emphasizes "deducing from a sign".',
    toriTip: '🐰 -나 보다 = "看来是…"，靠线索推理时用。"불이 켜져 있는 걸 보니 집에 있나 봐요"（灯亮着，看来在家）。注意动词用 -나 보다、形容词用 -(으)ㄴ가 보다，别用错接续。', toriTipEn: '🐰 -나 보다 = "seems like...", used when reasoning from clues. "불이 켜져 있는 걸 보니 집에 있나 봐요" (lights are on, seems to be home). Note: verbs use -나 보다, adjectives use -(으)ㄴ가 보다 — don\'t mix up the connections.',
  },

  // src: card-p12-l01
  {
    id: 'g121', title: '意志前提', titleEn: 'will as premise', pattern: '-(으)ㄹ 테니까',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '연결',
    usage: '表示"我会…所以你就…"（说话人意志作为前提）', usageEn: 'Indicates "I\'ll do... so you..." (speaker\'s will as the premise)',
    explanation: '由 -(으)ㄹ 터 加 -(으)니까 组合，前句表示说话人的意志或强推测，作为后句的前提/理由，相当于"我会…（所以你…）"。第一人称时是意志（"我来做，你放心"），第三人称/事物时是推测前提。后句常接请求或建议。', explanationEn: 'Combines -(으)ㄹ 터 with -(으)니까; the first clause expresses the speaker\'s will or strong guess, serving as the premise/reason for the second, equivalent to "I\'ll... (so you...)". First person indicates will ("I\'ll do it, don\'t worry"), third person/things indicate a guessed premise. The second clause often takes a request or suggestion.',
    conjugation: '无收音/ㄹ + ㄹ 테니까 (하다→할 테니까)\n有收音 + 을 테니까 (먹다→먹을 테니까)', conjugationEn: 'No final consonant/ㄹ + ㄹ 테니까 (하다→할 테니까)\\nWith final consonant + 을 테니까 (먹다→먹을 테니까)',
    examples: [
      { ko: '제가 준비할 테니까 걱정하지 마세요.', zh: '我来准备，请不要担心。', zhEn: 'I\'ll prepare it, so don\'t worry.', note: '意志前提：我准备你别担心', noteEn: 'will premise: I\'ll prepare, don\'t worry' },
      { ko: '제가 먼저 갈 테니까 천천히 오세요.', zh: '我先走，你慢慢来。', zhEn: 'I\'ll go first, take your time.', note: '意志前提：我先走你慢来', noteEn: 'will premise: I\'ll go first, take your time' },
      { ko: '제가 운전할 테니까 걱정하지 마세요.', zh: '我来开车，不用担心。', zhEn: 'I\'ll drive, so don\'t worry.', note: '意志前提：我开车你放心', noteEn: 'will premise: I\'ll drive, rest assured' },
    ],
    similarPatterns: ['-(으)니까', '-(으)ㄹ게요'],
    difference: '-(으)ㄹ 테니까 前句是"我的意志/强推测"作为后句前提（"제가 할 테니까 걱정 마세요"我来做你别担心）；单纯 -(으)니까 是客观原因（"바쁘니까"因为忙）。-(으)ㄹ 테니까 特有"我承担前项，你做后项"的分工语感。', differenceEn: '-(으)ㄹ 테니까 has the first clause as "my will/strong guess" serving as the premise for the second ("제가 할 테니까 걱정 마세요" I\'ll do it, don\'t worry); plain -(으)니까 is an objective reason ("바쁘니까" because busy). -(으)ㄹ 테니까 uniquely carries a division of labor: "I handle the first, you do the second".',
    toriTip: '🐰 -(으)ㄹ 테니까 = "我来…你就…"，分工合作的贴心句型。"제가 살 테니까 넌 자리 잡아"（我来买单，你去占座）。前半句是我的承诺/意志，后半句让对方安心去做别的事。', toriTipEn: '🐰 -(으)ㄹ 테니까 = "I\'ll... so you...", a thoughtful pattern for dividing tasks. "제가 살 테니까 넌 자리 잡아" (I\'ll pay, you grab seats). The first half is my promise/will, the second half lets the other person do something else with peace of mind.',
  },

  // src: card-p12-l01
  {
    id: 'g122', title: '无论都', titleEn: 'No matter what', pattern: '-(이)든지 / -든지',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '조사',
    usage: '表示"无论…都、任何…也"', usageEn: 'Means "no matter..., regardless..., any... also"',
    explanation: '接在名词或疑问词后，表示无条件包括所有情况，相当于"无论…都、任何…也行"。常与 뭐/누구/언제/어디 等疑问词搭配（뭐든지、언제든지、누구든지）。也可连接动词表示选择（-든지 -든지）。', explanationEn: 'Attached to nouns or question words, it means unconditionally including all cases, equivalent to "no matter..., regardless..., any... is fine." Often paired with question words like 뭐/누구/언제/어디 (뭐든지, 언제든지, 누구든지). It can also connect verbs to indicate choice (-든지 -든지).',
    conjugation: '无收音名词/疑问词 + 든지 (뭐→뭐든지)\n有收音名词 + 이든지 (무엇→무엇이든지)\n动词词干 + 든지 (가든지 말든지)', conjugationEn: 'Noun/question word without final consonant + 든지 (뭐→뭐든지)\\nNoun with final consonant + 이든지 (무엇→무엇이든지)\\nVerb stem + 든지 (가든지 말든지)',
    examples: [
      { ko: '뭐든지 다 잘 먹어요.', zh: '什么都吃，不挑食。', zhEn: 'Eats everything, not picky.', note: '无论都：什么都吃', noteEn: 'No matter what: eats anything' },
      { ko: '언제든지 연락해도 돼요.', zh: '随时联系都可以。', zhEn: 'You can contact me anytime.', note: '无论都：随时都行', noteEn: 'No matter what: anytime is fine' },
      { ko: '뭐든지 들어요. 그 그룹 노래라면 다 좋아요.', zh: '什么都听，只要是那个组合的歌都喜欢。', zhEn: 'I listen to anything—I like all of that group\'s songs.', note: '无论都：什么都听', noteEn: 'No matter what: listens to anything' },
    ],
    similarPatterns: ['-거나', '아무+N+(이)나'],
    difference: '-(이)든지 强调"无论哪个都无所谓/都可以"（常配疑问词，"뭐든지 좋아요"什么都行）；-거나 是"或者"连接两个具体选项（"커피거나 차"咖啡或茶）。-든지 侧重"全部包括、无条件"，-거나 侧重"从中选一"。', differenceEn: '-(이)든지 emphasizes "no matter which, it doesn\'t matter/any is fine" (often with question words, "뭐든지 좋아요" anything is fine); -거나 is "or" connecting two specific options ("커피거나 차" coffee or tea). -든지 focuses on "including everything, unconditional," while -거나 focuses on "choosing one from among."',
    toriTip: '🐰 疑问词 + 든지 = "无论…都"，超实用套装：뭐든지(什么都)、언제든지(随时)、누구든지(谁都)、어디든지(哪儿都)。"언제든지 연락해"（随时联系我）——朋友间超暖的一句话。', toriTipEn: '🐰 Question word + 든지 = "no matter..." — a super useful set: 뭐든지 (anything), 언제든지 (anytime), 누구든지 (anyone), 어디든지 (anywhere). "언제든지 연락해" (Contact me anytime) — a super warm phrase between friends.',
  },

  // src: card-p12-l04
  {
    id: 'g123', title: '趁便', titleEn: 'While at it', pattern: '-(으)ㄴ/는 김에',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '연결',
    usage: '表示"趁着…（顺便）…"', usageEn: 'Means "while doing..., (in passing)..."',
    explanation: '接在动词后，表示趁做某事的机会顺便做另一件事，相当于"趁着…顺便…、既然…就…"。前句是本来要做的事，后句是借机附带完成的事。过去/完成用 -(으)ㄴ 김에，现在用 -는 김에。', explanationEn: 'Attached to verbs, it means taking the opportunity of doing something to also do another thing, equivalent to "while at it, since... might as well..." The first clause is what you were going to do anyway, the second is something done on the side. Use -(으)ㄴ 김에 for past/completed, -는 김에 for present.',
    conjugation: '动词过去 + (으)ㄴ 김에 (나오다→나온 김에)\n动词现在 + 는 김에 (청소하다→청소하는 김에)', conjugationEn: 'Verb past + (으)ㄴ 김에 (나오다→나온 김에)\\nVerb present + 는 김에 (청소하다→청소하는 김에)',
    examples: [
      { ko: '나온 김에 장도 봤어요.', zh: '趁着出来，顺便买了东西。', zhEn: 'Since I was out anyway, I bought some things on the way.', note: '趁便：出来顺便买菜', noteEn: 'While at it: buy groceries while out' },
      { ko: '청소하는 김에 빨래도 했어요.', zh: '趁着打扫，顺便洗了衣服。', zhEn: 'While cleaning, I did the laundry too.', note: '趁便：打扫顺便洗衣', noteEn: 'While at it: do laundry while cleaning' },
      { ko: '한국에 온 김에 좋아하는 가수 콘서트도 봤어요.', zh: '趁着来韩国，顺便看了喜欢的歌手演唱会。', zhEn: 'While in Korea, I caught my favorite singer\'s concert.', note: '趁便：来韩顺便看演唱会', noteEn: 'While at it: catch a concert while in Korea' },
    ],
    similarPatterns: ['-는 길에', '겸'],
    difference: '-(으)ㄴ/는 김에 强调"趁做A的机会顺便做B"（B是借机附加的，"나온 김에 장도 봤어요"出来了顺便买菜）；-는 길에 特指"在去/来的路上顺便"（限移动场景，"가는 길에"去的路上）。김에 更泛，길에 限于路途。', differenceEn: '-(으)ㄴ/는 김에 emphasizes "while doing A, take the chance to do B" (B is an added bonus, "나온 김에 장도 봤어요" bought groceries while out); -는 길에 specifically means "on the way to/from" (limited to movement contexts, "가는 길에" on the way there). 김에 is broader, 길에 is limited to journeys.',
    toriTip: '🐰 -(으)ㄴ 김에 = "趁着…顺便…"，精打细算一举两得。"나온 김에 커피도 사 왔어"（出来了顺便买了咖啡）、"온 김에 밥 먹고 가"（来都来了，吃了饭再走）——"来都来了"就是这个句型的精髓。', toriTipEn: '🐰 -(으)ㄴ 김에 = "while at it..." — efficient and killing two birds with one stone. "나온 김에 커피도 사 왔어" (Bought coffee while I was out), "온 김에 밥 먹고 가" (Since you\'re here, eat before you go) — "since you\'re here" is the essence of this pattern.',
  },

  // src: card-p12-l03
  {
    id: 'g124', title: '事后建议', titleEn: 'Hindsight advice', pattern: '-지 그랬어(요)?',
    level: 'intermediate', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"当初…就好了、你怎么不…呢？"', usageEn: 'Means "should have... back then, why didn\'t you...?"',
    explanation: '接在动词后，用于对已发生的事表达"当初为什么不那样做呢"的惋惜或事后建议，含有轻微责怪或惋惜的语气。针对对方过去没做的行为。反问语气。', explanationEn: 'Attached to verbs, used to express regret or hindsight advice about something that happened, like "why didn\'t you do that back then?" It carries a slight tone of blame or regret, directed at something the other person didn\'t do in the past. Rhetorical question tone.',
    conjugation: '动词词干 + 지 그랬어요? (口语 그랬어?)\n否定劝告：-지 말지 그랬어요?', conjugationEn: 'Verb stem + 지 그랬어요? (casual 그랬어?)\\nNegative advice: -지 말지 그랬어요?',
    examples: [
      { ko: '그냥 전화하지 그랬어요?', zh: '你那时候为什么不直接打电话呢？', zhEn: 'Why didn\'t you just call then?', note: '事后建议：当初该打电话', noteEn: 'Hindsight advice: should have called' },
      { ko: '미리 예약하지 그랬어요?', zh: '你怎么不提前预约呢？', zhEn: 'Why didn\'t you make a reservation in advance?', note: '事后建议：当初该预约', noteEn: 'Hindsight advice: should have made a reservation' },
      { ko: '배고프면 먼저 먹지 그랬어요?', zh: '肚子饿的话你为什么不先吃呢？', zhEn: 'If you\'re hungry, why didn\'t you eat first?', note: '事后建议：当初该先吃', noteEn: 'After-the-fact advice: I should have eaten first' },
    ],
    similarPatterns: ['-(으)ㄹ 걸 그랬다', '-지 그랬어'],
    difference: '-지 그랬어요? 是对"对方"过去行为的事后建议/轻责（第二人称，"전화하지 그랬어요?"你怎么不打电话呢）；-(으)ㄹ 걸 그랬다 是对"自己"的后悔（第一人称，"전화할 걸 그랬어요"我当初该打电话的）。责怪别人用 -지 그랬어요，后悔自己用 -(으)ㄹ 걸 그랬다。', differenceEn: '-지 그랬어요? is after-the-fact advice/mild scolding about the other person\'s past action (second person, "전화하지 그랬어요?" Why didn\'t you call?); -(으)ㄹ 걸 그랬다 is regret about oneself (first person, "전화할 걸 그랬어요" I should have called). Use -지 그랬어요 to blame others, -(으)ㄹ 걸 그랬다 to regret your own actions.',
    toriTip: '🐰 -지 그랬어요? 是带点惋惜的"你当初怎么不…呢"。"힘들면 말하지 그랬어"（累的话你怎么不早说呢）——语气里有心疼也有小埋怨。注意是说别人，说自己后悔要用"-을 걸 그랬어"。', toriTipEn: '🐰 -지 그랬어요? is a wistful "Why didn\'t you...?" "힘들면 말하지 그랬어" (If you were tired, why didn\'t you say so?) — it carries both concern and a hint of reproach. Note it\'s for others; for your own regret, use "-을 걸 그랬어".',
  },

  // =====================================================================
  //  批量提炼扩充 B4（P13-P15，高级：被动/使动/敬语深化）
  // =====================================================================

  // src: card-p13-l05
  {
    id: 'g125', title: '되다被动', titleEn: '되다 passive', pattern: 'N + 되다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '사동/피동',
    usage: '汉字词/名词 + 되다，构成被动"被…、得到…"', usageEn: 'Sino-Korean word/noun + 되다 forms the passive, meaning "to be..." or "to get..."',
    explanation: '把"名词 + 하다"的主动结构（시작하다、해결하다、발표하다）中的 하다 换成 되다，构成被动，表示动作被完成或自然发生，相当于"被…、得以…"。主语是动作的承受方，多用于书面、正式、新闻语体。', explanationEn: 'Replace 하다 in the active "noun + 하다" structure (시작하다, 해결하다, 발표하다) with 되다 to form the passive, indicating the action is completed or happens naturally, equivalent to "to be..." or "to get...". The subject is the receiver of the action; it\'s common in written, formal, and news language.',
    conjugation: '名词(하다类词根) + 되다\n시작하다→시작되다 / 해결하다→해결되다\n발표하다→발표되다 / 변경하다→변경되다\n过去 + 되었다/됐다', conjugationEn: 'Noun (하다-type root) + 되다\\n시작하다→시작되다 / 해결하다→해결되다\\n발표하다→발표되다 / 변경하다→변경되다\\nPast + 되었다/됐다',
    examples: [
      { ko: '중요한 사항이 결정되었어요.', zh: '重要事项被决定了。', zhEn: 'The important matter was decided.', note: '되다被动：事项被决定', noteEn: '되다 passive: matter decided' },
      { ko: '새로운 방법이 발견되었어요.', zh: '发现了新方法。', zhEn: 'A new method was discovered.', note: '되다被动：方法被发现', noteEn: '되다 passive: method discovered' },
      { ko: '회의 시간이 변경되었어요.', zh: '会议时间被变更了。', zhEn: 'The meeting time was changed.', note: '되다被动：时间被变更', noteEn: '되다 passive: time changed' },
    ],
    similarPatterns: ['-이/히/리/기-', '-아/어지다'],
    difference: '되다 被动只用于"名词+하다"类词（시작하다→시작되다）；-이/히/리/기 用于固有词动词（잡다→잡히다）；-아/어지다 表自然状态变化。想被动化一个 하다 动词时用 되다（해결하다→해결되다），不能说 해결히다。', differenceEn: 'The 되다 passive only applies to "noun+하다" type words (시작하다→시작되다); -이/히/리/기 is for native verbs (잡다→잡히다); -아/어지다 indicates natural state change. To passivize a 하다 verb, use 되다 (해결하다→해결되다); you can\'t say 해결히다.',
    toriTip: '🐰 하다 → 되다 是汉字词被动的万能公式。"시작하다"（开始）→"시작되다"（被开始/开始了），"해결하다"→"해결되다"。新闻里满屏都是：발표되다、예상되다、확인되다——记住这个转换，读韩语新闻轻松一半。', toriTipEn: '🐰 하다 → 되다 is the universal formula for Sino-Korean passives. "시작하다" (start) → "시작되다" (be started/started), "해결하다"→"해결되다". News is full of them: 발표되다, 예상되다, 확인되다 — remember this switch and reading Korean news gets half easier.',
  },

  // src: card-p13-l06
  {
    id: 'g126', title: '受害/受益被动', titleEn: 'Victim/beneficiary passive', pattern: 'N + 받다/당하다/맞다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '사동/피동',
    usage: '用 받다/당하다/맞다 表示受到某种对待', usageEn: 'Use 받다/당하다/맞다 to express receiving some treatment',
    explanation: '在名词后接 받다（受益，褒义/中性）、당하다（受害，贬义）、맞다（挨…，负面），表示主语受到某种行为对待。받다 多接正面（사랑받다 被爱、칭찬받다 被表扬），당하다/맞다 接负面（사기당하다 被骗、야단맞다 挨骂）。', explanationEn: 'After a noun, attach 받다 (beneficial, positive/neutral), 당하다 (victim, negative), or 맞다 (to get... negative) to indicate the subject receives some action. 받다 mostly takes positive things (사랑받다 to be loved, 칭찬받다 to be praised); 당하다/맞다 take negative (사기당하다 to be scammed, 야단맞다 to be scolded).',
    conjugation: '名词 + 받다（受益：사랑받다/초대받다）\n名词 + 당하다（受害：사기당하다/거절당하다）\n名词 + 맞다（负面：야단맞다/매맞다）', conjugationEn: 'Noun + 받다 (beneficial: 사랑받다/초대받다)\\nNoun + 당하다 (victim: 사기당하다/거절당하다)\\nNoun + 맞다 (negative: 야단맞다/매맞다)',
    examples: [
      { ko: '민수는 사기를 당했어요.', zh: '民秀被骗了。', zhEn: 'Min-su was scammed.', note: '受害：被骗', noteEn: 'Victim: scammed' },
      { ko: '어제 상사에게 야단을 맞았어요.', zh: '昨天被上司训了。', zhEn: 'Yesterday I got scolded by my boss.', note: '受害：挨训', noteEn: 'Victim: scolded' },
      { ko: '아이가 부모에게 사랑을 받았어요.', zh: '孩子受到父母的爱。', zhEn: 'The child receives love from parents.', note: '受益：被爱', noteEn: 'Beneficial: loved' },
    ],
    similarPatterns: ['N + 되다', '-이/히/리/기-'],
    difference: '받다/당하다/맞다 靠词汇本身的褒贬区分：받다 中性偏褒（사랑받다 被爱），당하다 贬义（사기당하다 被骗），맞다 负面（야단맞다 挨骂）。되다 被动是中性状态化（해결되다），不含"受害/受益"的感情色彩。表达"遭受/得到"用这三个词。', differenceEn: '받다/당하다/맞다 are distinguished by their inherent connotation: 받다 is neutral-to-positive (사랑받다 to be loved), 당하다 is negative (사기당하다 to be scammed), 맞다 is negative (야단맞다 to be scolded). The 되다 passive is a neutral state change (해결되다), without "victim/beneficiary" nuance. Use these three verbs to express "suffer/receive."',
    toriTip: '🐰 받다/당하다/맞다 的褒贬要分清：好事用 받다（사랑받다 被爱、존경받다 受尊敬），坏事用 당하다（무시당하다 被无视）或 맞다（야단맞다 挨骂）。用错会闹笑话——"사랑을 당했다"就变成"被爱情伤害"了。', toriTipEn: '🐰 Get the connotation of 받다/당하다/맞다 right: good things use 받다 (사랑받다 to be loved, 존경받다 to be respected), bad things use 당하다 (무시당하다 to be ignored) or 맞다 (야단맞다 to be scolded). Getting it wrong can be funny — "사랑을 당했다" would mean "I was hurt by love."',
  },

  // src: card-p13-l07
  {
    id: 'g127', title: '被动句助词', titleEn: 'Passive sentence particles', pattern: '이/가 … 에게/에/에 의해',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '사동/피동',
    usage: '被动句中主语与施动者的助词标记', usageEn: 'Particle Marking of Subject and Agent in Passive Sentences',
    explanation: '被动句里，承受动作的主语用 이/가 标记，施动者根据类型选助词：人/动物用 에게（口语 한테），无情物/自然力用 에，正式书面用 에 의해(서)。主动句的宾语变被动句主语，主动句主语降为施动者状语。', explanationEn: 'In passive sentences, the subject receiving the action is marked with 이/가. The agent particle depends on the type: people/animals use 에게 (colloquial 한테), inanimate objects/natural forces use 에, and formal written style uses 에 의해(서). The object of an active sentence becomes the subject of the passive sentence, and the active subject is demoted to an agent adverbial.',
    conjugation: '受动主语 + 이/가\n施动者(人/动物) + 에게/한테\n施动者(事物/自然) + 에\n施动者(正式书面) + 에 의해(서)', conjugationEn: 'Passive subject + 이/가\\nAgent (person/animal) + 에게/한테\\nAgent (thing/nature) + 에\\nAgent (formal written) + 에 의해(서)',
    examples: [
      { ko: '도둑이 경찰에게 잡혔어요.', zh: '小偷被警察抓了。', zhEn: 'The thief was caught by the police.', note: '被动助词：施动者(人)用에게', noteEn: 'Passive particle: use 에게 for agent (person)' },
      { ko: '나뭇잎이 바람에 날렸어요.', zh: '树叶被风吹了。', zhEn: 'The leaves were blown by the wind.', note: '被动助词：施动者(自然)用에', noteEn: 'Passive particle: use 에 for agent (nature)' },
      { ko: '이 정책은 정부에 의해 시행되었어요.', zh: '这项政策由政府施行。', zhEn: 'This policy was implemented by the government.', note: '被动助词：正式书面用에 의해', noteEn: 'Passive particle: use 에 의해 for formal written' },
    ],
    similarPatterns: ['-이/히/리/기-', '에게/한테'],
    difference: '被动句施动者的助词按类型分：人/动物用 에게（"경찰에게 잡혔어요"被警察抓），无情物/自然力用 에（"바람에 날렸어요"被风吹），正式书面用 에 의해（"정부에 의해"由政府）。主动句里 에게 是给予对象，被动句里 에게 是施动者，位置和意义都变了。', differenceEn: 'The agent particle in passive sentences depends on the type: people/animals use 에게 ("경찰에게 잡혔어요" — caught by the police), inanimate objects/natural forces use 에 ("바람에 날렸어요" — blown by the wind), and formal written uses 에 의해 ("정부에 의해" — by the government). In active sentences, 에게 marks the recipient; in passive sentences, it marks the agent—both position and meaning change.',
    toriTip: '🐰 被动句里"被谁"的助词看对象：被人/动物→에게（잡히다 앞），被风/雨/自然→에（날리다 앞），正式文书→에 의해。"개에게 물렸어요"（被狗咬）、"눈에 파묻혔어요"（被雪埋）——记住人用에게、物用에。', toriTipEn: '🐰 In passive sentences, the particle for "by whom" depends on the object: by a person/animal → 에게 (before 잡히다), by wind/rain/nature → 에 (before 날리다), formal documents → 에 의해. "개에게 물렸어요" (bitten by a dog), "눈에 파묻혔어요" (buried in snow)—remember: people use 에게, things use 에.',
  },

  // src: card-p13-l08
  {
    id: 'g128', title: '双重被动辨析', titleEn: 'Double Passive Distinction', pattern: '-이/히/리/기- + -아/어지다 (禁止叠加)', patternEn: '-이/히/리/기- + -아/어지다 (no stacking)',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '사동/피동',
    usage: '避免被动后缀与 -아/어지다 重复叠加的错误', usageEn: 'Avoid the error of stacking passive suffixes with -아/어지다',
    explanation: '一个动词只能被动化一次。已经用 -이/히/리/기 变成被动的词（잡히다、보이다、열리다），不能再加 -아/어지다 构成"双重被动"（잡혀지다✗、보여져요✗）。되다 被动同理，되어지다✗ 也是错误。规范韩语中被动只标记一层。', explanationEn: 'A verb can only be passivized once. Words already made passive with -이/히/리/기 (잡히다, 보이다, 열리다) cannot take -아/어지다 to form a "double passive" (잡혀지다✗, 보여져요✗). The same applies to 되다 passives—되어지다✗ is also wrong. In standard Korean, passivity is marked only once.',
    conjugation: '正确：잡다→잡히다 (○) / 열다→열리다 (○) / 해결하다→해결되다 (○)\n错误：잡히+어지다→잡혀지다 (✗)\n错误：보이+어지다→보여져요 (✗)\n错误：해결되+어지다→해결되어졌다 (✗)', conjugationEn: 'Correct: 잡다→잡히다 (○) / 열다→열리다 (○) / 해결하다→해결되다 (○)\\nWrong: 잡히+어지다→잡혀지다 (✗)\\nWrong: 보이+어지다→보여져요 (✗)\\nWrong: 해결되+어지다→해결되어졌다 (✗)',
    examples: [
      { ko: '이 문제는 이미 해결되었어요.', zh: '这个问题已经解决了。', zhEn: 'This problem has already been solved.', note: '正确：해결되었어요（非 해결되어졌어요）', noteEn: 'Correct: 해결되었어요 (not 해결되어졌어요)' },
      { ko: '멀리서 산이 보여요.', zh: '远处看得见山。', zhEn: 'You can see the mountain in the distance.', note: '正确：보여요（非 보여져요）', noteEn: 'Correct: 보여요 (not 보여져요)' },
      { ko: '문이 열렸어요.', zh: '门开了。', zhEn: 'The door opened.', note: '正确：열렸어요（非 열려졌어요）', noteEn: 'Correct: 열렸어요 (not 열려졌어요)' },
    ],
    similarPatterns: ['-이/히/리/기-', 'N + 되다'],
    difference: '被动只能标记一次：잡히다（○ 单被动）≠ 잡혀지다（✗ 双重被动）；보이다（○）≠ 보여지다（✗）。虽然口语里 잊혀지다 等误用常见，但规范韩语和 TOPIK 写作中必须用单被动 잊히다/잊혔다。되다 类同理，해결되다（○）≠ 해결되어지다（✗）。', differenceEn: 'Passivity can only be marked once: 잡히다 (○ single passive) ≠ 잡혀지다 (✗ double passive); 보이다 (○) ≠ 보여지다 (✗). Although misuses like 잊혀지다 are common in speech, standard Korean and TOPIK writing require the single passive 잊히다/잊혔다. The same goes for 되다 verbs: 해결되다 (○) ≠ 해결되어지다 (✗).',
    toriTip: '🐰 被动别叠两层！最常见的错就是 보여져요（✗）、잊혀져요（✗）——已经有 이/히/리/기 或 되다 了，就别再加 -아/어지다。正确说 보여요、잊혀요(잊히다)。虽然歌词里常出现 잊혀진…，但考试可不认这个。', toriTipEn: '🐰 Don\'t stack passives twice! The most common mistakes are 보여져요 (✗) and 잊혀져요 (✗)—if you already have 이/히/리/기 or 되다, don\'t add -아/어지다. Say 보여요, 잊혀요 (잊히다) instead. Even though lyrics often have 잊혀진…, exams won\'t accept it.',
  },

  // src: card-p14-l02
  {
    id: 'g129', title: '우/구/추使动', titleEn: '우/구/추 Causatives', pattern: '-우/구/추-',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '사동/피동',
    usage: '用 우/구/추 后缀构成的短形使动', usageEn: 'Short-form causatives formed with the suffixes 우/구/추',
    explanation: '除了 이/히/리/기，另一组使动后缀 우/구/추 也用于把动词变为使动，表示"让…、使…"。这类词需逐个记忆：자다→재우다（哄睡）、타다→태우다（让搭乘）、깨다→깨우다（叫醒）、낮다→낮추다（调低）、맞다→맞추다（对准）。', explanationEn: 'Besides 이/히/리/기, another set of causative suffixes—우/구/추—also turns verbs into causatives, meaning "make/let someone do." These must be memorized individually: 자다→재우다 (put to sleep), 타다→태우다 (give a ride), 깨다→깨우다 (wake up), 낮다→낮추다 (lower), 맞다→맞추다 (align).',
    conjugation: '자다→재우다（哄睡）/ 깨다→깨우다（叫醒）\n타다→태우다（使乘坐）/ 서다→세우다（使站立）\n비다→비우다（清空）/ 낮다→낮추다（调低）\n맞다→맞추다（使对准）/ 늦다→늦추다（推迟）', conjugationEn: '자다→재우다 (put to sleep) / 깨다→깨우다 (wake up)\\n타다→태우다 (give a ride) / 서다→세우다 (make stand)\\n비다→비우다 (empty out) / 낮다→낮추다 (lower)\\n맞다→맞추다 (align) / 늦다→늦추다 (delay)',
    examples: [
      { ko: '엄마가 아기를 재웠어요.', zh: '妈妈哄宝宝睡觉。', zhEn: 'Mom put the baby to sleep.', note: '우使动：재우다(哄睡)', noteEn: '우 causative: 재우다 (to put to sleep)' },
      { ko: '아빠가 아이를 차에 태웠어요.', zh: '爸爸让孩子上车。', zhEn: 'Dad is helping the child into the car.', note: '우使动：태우다(让乘坐)', noteEn: '우 causative: 태우다 (to give a ride)' },
      { ko: '에어컨 온도를 낮췄어요.', zh: '把空调温度调低了。', zhEn: 'I turned down the air conditioning.', note: '추使动：낮추다(调低)', noteEn: '추 causative: 낮추다 (to lower)' },
    ],
    similarPatterns: ['-이/히/리/기-', '-게 하다'],
    difference: '우/구/추 与 이/히/리/기 同属短形使动，只是后缀不同、须逐词记忆（재우다/태우다/맞추다）；-게 하다 是万能的长形使动（任何动词可用）。没有短形使动形式的动词只能用 -게 하다。재우다＝재게 하다 但短形更简洁自然。', differenceEn: '우/구/추, like 이/히/리/기, are short-form causatives—just different suffixes that must be memorized word by word (재우다/태우다/맞추다). -게 하다 is the universal long-form causative (usable with any verb). Verbs without a short-form causative can only use -게 하다. 재우다 = 재게 하다, but the short form is more concise and natural.',
    toriTip: '🐰 우/구/추 使动是"隐藏款"，得一个个记：자다→재우다（哄睡）、깨다→깨우다（叫醒）、타다→태우다（让上车）、낮추다（调低）、맞추다（对准）。育儿场景全是它——"아기를 재우고 깨우고"（哄睡又叫醒），当妈的日常。', toriTipEn: '🐰 The 우/구/추 causatives are the "hidden gems"—you have to memorize them one by one: 자다→재우다 (put to sleep), 깨다→깨우다 (wake up), 타다→태우다 (give a ride), 낮추다 (lower), 맞추다 (align). They\'re everywhere in parenting—"아기를 재우고 깨우고" (putting the baby to sleep and waking them up), a mom\'s daily routine.',
  },

  // src: card-p14-l04
  {
    id: 'g130', title: '安排使做', titleEn: 'Arrange to make someone do', pattern: '-도록 하다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '사동/피동',
    usage: '表示"安排/使…做到、务必…"', usageEn: 'Indicates arranging/making something happen, ensuring it\'s done',
    explanation: '-도록 하다 表示安排、要求或叮嘱某人做到某事，带有目标性和一定强制/规约语气。第一人称用时表示决心（"我会做到…"）。比 -게 하다 更正式、更强调"达到某目标/遵守某规约"，多见于公告、规定、正式叮嘱。', explanationEn: '-도록 하다 expresses arranging, requesting, or urging someone to do something, with a goal-oriented and somewhat obligatory tone. In first person, it shows resolve ("I will make sure to..."). It\'s more formal than -게 하다 and emphasizes "achieving a goal/following a rule," often seen in announcements, regulations, and formal requests.',
    conjugation: '动词词干 + 도록 하다\n他人：-도록 하세요/했어요（叮嘱/安排）\n自身决心：-도록 하겠습니다', conjugationEn: 'Verb stem + 도록 하다\\nFor others: -도록 하세요/했어요 (urging/arranging)\\nOwn resolve: -도록 하겠습니다',
    examples: [
      { ko: '팀장님이 저희를 회의에 참석하도록 했어요.', zh: '组长安排我们参加会议。', zhEn: 'The team leader arranged for us to attend the meeting.', note: '安排：安排参会', noteEn: 'Arranging: arranging attendance' },
      { ko: '담배를 피우지 않도록 하겠습니다.', zh: '我会做到不再抽烟。', zhEn: 'I will make sure to quit smoking.', note: '决心：做到不抽烟', noteEn: 'Resolve: committing to not smoking' },
      { ko: '학생들이 시간을 지키도록 지도해 주세요.', zh: '请指导学生做到守时。', zhEn: 'Please instruct the students to be on time.', note: '安排：使守时', noteEn: 'Arranging: ensuring punctuality' },
    ],
    similarPatterns: ['-게 하다', '-도록'],
    difference: '-도록 하다 强调"安排/使达到某目标"，带规约或决心语气（正式，"참석하도록 했어요"安排参加）；-게 하다 是中性的一般使动（口语，"참석하게 했어요"让参加）。公告、正式叮嘱、表决心用 -도록 하다，日常使唤用 -게 하다。', differenceEn: '-도록 하다 emphasizes "arranging/ensuring a goal is met," with a rule-setting or resolve tone (formal, "참석하도록 했어요" arranged to attend); -게 하다 is a neutral general causative (colloquial, "참석하게 했어요" made them attend). Use -도록 하다 for announcements, formal requests, and expressing resolve; use -게 하다 for everyday commands.',
    toriTip: '🐰 -도록 하다 是"务必做到…"的正式安排。"늦지 않도록 하세요"（请务必别迟到）比"늦지 않게 하세요"更郑重。第一人称说"열심히 하도록 하겠습니다"（我会努力做到的）——面试、承诺时的标准句。', toriTipEn: '🐰 -도록 하다 is the formal way to say "make sure to do..." "늦지 않도록 하세요" (Please make sure not to be late) is more solemn than "늦지 않게 하세요." In first person, "열심히 하도록 하겠습니다" (I will make sure to work hard) is the standard phrase for interviews and promises.',
  },

  // src: card-p14-l05
  {
    id: 'g131', title: '시키다使动', titleEn: '시키다 causative', pattern: 'N + 시키다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '사동/피동',
    usage: '汉字词/名词 + 시키다，表示"让…做、使…"', usageEn: 'Sino-Korean word/noun + 시키다, meaning "to make someone do, to cause"',
    explanation: '把"名词 + 하다"的动词换成"名词 + 시키다"，构成使动，表示让别人做某事或使某事发生，相当于"让…、使…"。공부하다→공부시키다（让…学习）、청소하다→청소시키다（让…打扫）。也有"点（餐）"的口语义（주문하다的口语替代）。', explanationEn: 'For verbs of the "noun + 하다" type, replace 하다 with 시키다 to form the causative, meaning to have someone do something or cause something to happen—equivalent to "make/let..." 공부하다→공부시키다 (make someone study), 청소하다→청소시키다 (make someone clean). It also has a colloquial meaning of "to order (food)" (as an informal alternative to 주문하다).',
    conjugation: '名词(하다类词根) + 시키다\n공부하다→공부시키다 / 청소하다→청소시키다\n운동하다→운동시키다 / 이해하다→이해시키다 / 진정하다→진정시키다\n口语："음식을 시키다"＝点餐', conjugationEn: 'Noun (하다-type root) + 시키다\\n공부하다→공부시키다 / 청소하다→청소시키다\\n운동하다→운동시키다 / 이해하다→이해시키다 / 진정하다→진정시키다\\nColloquial: "음식을 시키다" = to order food',
    examples: [
      { ko: '엄마가 아이에게 공부를 시켰어요.', zh: '妈妈让孩子学习。', zhEn: 'The mom made the child study.', note: '시키다使动：让学习', noteEn: '시키다 causative: make someone study' },
      { ko: '선생님이 학생들을 청소시켰어요.', zh: '老师让学生打扫。', zhEn: 'The teacher had the students clean.', note: '시키다使动：让打扫', noteEn: '시키다 causative: make someone clean' },
      { ko: '식당에서 김치찌개를 시켰어요.', zh: '在餐厅点了泡菜汤。', zhEn: 'I ordered kimchi stew at the restaurant.', note: '口语义：点餐', noteEn: 'Colloquial meaning: ordering food' },
    ],
    similarPatterns: ['-게 하다', 'N + 하다'],
    difference: '시키다 是"名词+하다"类的使动形（공부하다→공부시키다 让学习）；对应的主动是 하다（공부하다 学习）。-게 하다 是万能长形使动。하다 类使动优先用 시키다（공부시키다 比 공부하게 하다 更简洁）。注意 시키다 还有"点餐"的口语义。', differenceEn: '시키다 is the causative form for "noun + 하다" verbs (공부하다→공부시키다, make someone study); the corresponding active is 하다 (공부하다, to study). -게 하다 is the universal long-form causative. For 하다-type verbs, 시키다 is preferred (공부시키다 is more concise than 공부하게 하다). Note that 시키다 also has the colloquial meaning of "to order food."',
    toriTip: '🐰 하다 → 시키다 是"让别人做"的公式。"운동하다"（运动）→"운동시키다"（让…运动）。注意它还有个高频口语义——"点餐"！"뭐 시킬까?"（点什么？）、"치킨 시키자"（点炸鸡吧）——韩国人聚餐必说。', toriTipEn: '🐰 하다 → 시키다 is the formula for "making someone do something." "운동하다" (to exercise) → "운동시키다" (to make someone exercise). Note it also has a common colloquial meaning — "ordering food"! "뭐 시킬까?" (What should we order?), "치킨 시키자" (Let\'s order fried chicken) — a must-say at Korean gatherings.',
  },

  // src: card-p14-l07
  {
    id: 'g132', title: '使动句助词', titleEn: 'Causative sentence particles', pattern: '을/를 … 에게 (사동문)',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '사동/피동',
    usage: '使动句中被使者与对象的助词标记', usageEn: 'Particles marking the causee and object in causative sentences',
    explanation: '使动句里被使者的助词取决于原句结构：原为不及物动词时，被使者用 을/를（아기를 재우다 哄宝宝睡）；原为及物动词时，被使者用 에게/한테，宾语保留 을/를（아기에게 우유를 먹이다 喂宝宝奶）。区分关键是原动词是否带宾语。', explanationEn: 'In causative sentences, the particle for the causee depends on the original sentence structure: if the original verb is intransitive, the causee takes 을/를 (아기를 재우다 — put the baby to sleep); if the original verb is transitive, the causee takes 에게/한테, and the object keeps 을/를 (아기에게 우유를 먹이다 — feed the baby milk). The key is whether the original verb has an object.',
    conjugation: '原不及物：被使者 + 을/를（재우다: 아기를 재우다）\n原及物：被使者 + 에게/한테 + 宾语 + 을/를（먹이다: 아기에게 밥을 먹이다）', conjugationEn: 'Original intransitive: causee + 을/를 (재우다: 아기를 재우다)\\nOriginal transitive: causee + 에게/한테 + object + 을/를 (먹이다: 아기에게 밥을 먹이다)',
    examples: [
      { ko: '엄마가 아기를 재웠어요.', zh: '妈妈哄宝宝睡觉。', zhEn: 'Mom put the baby to sleep.', note: '不及物使动：被使者用를', noteEn: 'Intransitive causative: causee takes 를' },
      { ko: '엄마가 아기에게 우유를 먹였어요.', zh: '妈妈喂宝宝喝奶。', zhEn: 'Mom feeds the baby milk.', note: '及物使动：被使者用에게', noteEn: 'Transitive causative: causee takes 에게' },
      { ko: '선생님이 학생에게 책을 읽혔어요.', zh: '老师让学生读书。', zhEn: 'The teacher makes the students read.', note: '及物使动：被使者用에게', noteEn: 'Transitive causative: causee takes 에게' },
    ],
    similarPatterns: ['-이/히/리/기-', '을/를'],
    difference: '使动句被使者的助词看原动词：原不及物（자다）→被使者用 을/를（아기를 재우다）；原及物（먹다/읽다）→被使者用 에게、原宾语保留 을/를（아기에게 우유를 먹이다）。判断关键是"原来的动作有没有宾语"。', differenceEn: 'In causative sentences, the causee\'s particle depends on the original verb: if it\'s intransitive (자다) → causee takes 을/를 (아기를 재우다); if it\'s transitive (먹다/읽다) → causee takes 에게, and the original object keeps 을/를 (아기에게 우유를 먹이다). The key is whether the original action has an object.',
    toriTip: '🐰 使动句"让谁做"的助词有讲究：原动词没宾语（睡觉），被使者用 를——"아기를 재우다"；原动词有宾语（喝奶），被使者用 에게、东西用 를——"아기에게 우유를 먹이다"。诀窍：句子里已经有个 를 了，被使者就让给 에게。', toriTipEn: '🐰 In causative sentences, the particle for "who does it" matters: if the original verb has no object (sleep), the causee takes 를 — "아기를 재우다"; if the original verb has an object (drink milk), the causee takes 에게 and the thing takes 를 — "아기에게 우유를 먹이다". Trick: if there\'s already a 를 in the sentence, give the causee 에게.',
  },

  // src: card-p15-l03
  {
    id: 'g133', title: '客体敬语动词', titleEn: 'Object honorific verbs', pattern: '드리다/모시다/뵙다/여쭙다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '존대',
    usage: '抬高动作对象（客体）的特殊敬语动词', usageEn: 'Special honorific verbs that elevate the object of an action',
    explanation: '客体敬语（객체높임）通过特殊动词抬高动作所涉及的对象（宾语/与格对象），而非主语。核心四词：드리다（给→献给，주다的敬语）、모시다（带/陪→侍奉，데리다的敬语）、뵙다/뵈다（见→拜见，만나다的敬语）、여쭙다/여쭈다（问→请教，묻다的敬语）。', explanationEn: 'Object honorifics (객체높임) use special verbs to elevate the object of an action (direct object/dative object), not the subject. The core four: 드리다 (give → present, honorific of 주다), 모시다 (bring/accompany → serve, honorific of 데리다), 뵙다/뵈다 (see → meet respectfully, honorific of 만나다), 여쭙다/여쭈다 (ask → inquire respectfully, honorific of 묻다).',
    conjugation: '주다 → 드리다（给尊者）\n데리다 → 모시다（陪/侍奉尊者）\n만나다/보다 → 뵙다/뵈다（拜见尊者）\n묻다 → 여쭙다/여쭈다（向尊者请教）', conjugationEn: '주다 → 드리다 (give to a superior)\\n데리다 → 모시다 (accompany/serve a superior)\\n만나다/보다 → 뵙다/뵈다 (meet a superior respectfully)\\n묻다 → 여쭙다/여쭈다 (ask a superior respectfully)',
    examples: [
      { ko: '선생님께 선물을 드렸어요.', zh: '给老师送了礼物。', zhEn: 'I gave a gift to the teacher.', note: '客体敬语：드리다(给尊者)', noteEn: 'Object honorific: 드리다 (give to superior)' },
      { ko: '부모님을 뵙기로 했어요.', zh: '打算拜见父母。', zhEn: 'I plan to visit my parents.', note: '客体敬语：뵙다(拜见)', noteEn: 'Object honorific: 뵙다 (meet respectfully)' },
      { ko: '교수님께 여쭤봤어요.', zh: '向教授请教了。', zhEn: 'I asked the professor.', note: '客体敬语：여쭙다(请教)', noteEn: 'Object honorific: 여쭙다 (ask respectfully)' },
    ],
    similarPatterns: ['-(으)시', '-아/어 드리다'],
    difference: '客体敬语（드리다/모시다/뵙다/여쭙다）抬高动作"对象"（宾语，"선생님을 뵙다"拜见老师）；主体敬语 -(으)시 抬高句子"主语"（"선생님께서 오시다"老师来）。前者尊敬动作涉及的人，后者尊敬做动作的人，作用对象不同。', differenceEn: 'Object honorifics (드리다/모시다/뵙다/여쭙다) elevate the "object" of an action (direct object, e.g., "선생님을 뵙다" — meet the teacher); subject honorifics -(으)시 elevate the sentence\'s "subject" (e.g., "선생님께서 오시다" — the teacher comes). The former respects the person involved in the action, the latter respects the person doing it — they target different elements.',
    toriTip: '🐰 客体敬语四大金刚：给尊者→드리다、陪尊者→모시다、见尊者→뵙다、问尊者→여쭙다。初次见面必说"처음 뵙겠습니다"（初次拜见）。有事请教长辈用"여쭤봐도 될까요?"（可以请教您吗）——用对这四个词，敬意瞬间到位。', toriTipEn: '🐰 The big four object honorifics: give to a superior → 드리다, accompany a superior → 모시다, meet a superior → 뵙다, ask a superior → 여쭙다. On first meeting, you must say "처음 뵙겠습니다" (Nice to meet you). To ask an elder something, use "여쭤봐도 될까요?" (May I ask you?) — use these four correctly and respect is instantly conveyed.',
  },

  // src: card-p15-l05
  {
    id: 'g134', title: '听者敬语语体', titleEn: 'Listener honorific speech levels', pattern: '합쇼체/해요체/해체 (청자높임)',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '존대',
    usage: '根据听者身份选择句子终结的语体', usageEn: 'Speech levels chosen for sentence endings based on the listener\'s status',
    explanation: '听者敬语（청자높임）通过句子终结语尾的选择来体现对听者的尊敬程度。四大语体：합쇼체（-ㅂ니다，最正式）、해요체（-아/어요，日常敬语）、해체/반말（-아/어，非敬语平语）、해라体（-ㄴ다，书面/对下）。同一句话对不同对象要换不同语体。', explanationEn: 'Listener honorifics (청자높임) show respect to the listener through sentence-ending forms. The four main speech levels: 합쇼체 (-ㅂ니다, most formal), 해요체 (-아/어요, everyday polite), 해체/반말 (-아/어, casual/informal), 해라체 (-ㄴ다, written/for subordinates). The same sentence changes its ending depending on who you\'re talking to.',
    conjugation: '합쇼체：-ㅂ니다/습니다（正式：面试/演讲/公文）\n해요체：-아/어요（日常敬语：多数场合）\n해체(반말)：-아/어（亲近/平辈/对下）\n해라体：-ㄴ/는다（书面/新闻/对下）', conjugationEn: '합쇼체: -ㅂ니다/습니다 (formal: interviews/speeches/documents)\\n해요체: -아/어요 (everyday polite: most situations)\\n해체(반말): -아/어 (close/peers/to subordinates)\\n해라체: -ㄴ/는다 (written/news/to subordinates)',
    examples: [
      { ko: '안녕하십니까? 지원자 김민수입니다.', zh: '您好，我是应聘者金民秀。', zhEn: 'Hello, I\'m the applicant Kim Min-su.', note: '합쇼체：最正式(面试)', noteEn: 'Hapsyo-che: Most formal (job interview)' },
      { ko: '주말에 뭐 하세요?', zh: '周末做什么？', zhEn: 'What are you doing this weekend?', note: '해요체：日常敬语', noteEn: 'Haeyo-che: Everyday polite speech' },
      { ko: '주말에 뭐 해?', zh: '周末干嘛？', zhEn: 'What are you doing this weekend?', note: '해체(반말)：亲近平语', noteEn: 'Hae-che (banmal): Casual, familiar speech' },
    ],
    similarPatterns: ['-ㅂ니다/습니다', '-아/어요'],
    difference: '听者敬语是"整句语体的选择"：합쇼체(-ㅂ니다)最正式、해요체(-아/어요)日常敬语、해체(-아/어)非敬语。它不是单个语法点，而是根据对象在整个语体系统间切换。同一意思"你好"：안녕하십니까(합쇼)/안녕하세요(해요)/안녕(해체)。', differenceEn: 'Listener honorifics are about choosing the overall speech level: Hapsyo-che (-ㅂ니다) is the most formal, Haeyo-che (-아/어요) is everyday polite, and Hae-che (-아/어) is casual. It\'s not a single grammar point but switching between whole speech levels based on who you\'re talking to. Same meaning, "hello": 안녕하십니까 (hapsyo) / 안녕하세요 (haeyo) / 안녕 (hae-che).',
    toriTip: '🐰 韩语说话先"定语体"再开口：对陌生人/正式场合用 -ㅂ니다（합쇼体）或 -아/어요（해요体），对朋友用 -아/어（반말）。用错很尴尬——对上司说반말是失礼，对哥们儿说합쇼体又见外。看关系选语体，是韩语社交第一课。', toriTipEn: '🐰 In Korean, pick your speech level before you speak: use -ㅂ니다 (hapsyo-che) or -아/어요 (haeyo-che) with strangers or in formal settings, and -아/어 (banmal) with friends. Getting it wrong is awkward—using banmal with your boss is rude, and using hapsyo-che with your buddy feels distant. Choosing the right level for the relationship is Korean socializing 101.',
  },

  // src: card-p15-l06
  {
    id: 'g135', title: '自谦表达', titleEn: 'Humble expressions', pattern: '저/저희/드리다 (자기낮춤)',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '존대',
    usage: '通过降低自己来抬高对方的自谦表达', usageEn: 'Humble expressions that elevate the other person by lowering yourself',
    explanation: '自谦（자기낮춤）通过压低说话人自身来间接抬高对方。核心：第一人称用 저（나的谦称）、저희（우리的谦称，即使对方不属于该团体也常用），动作用谦语动词 드리다（给）、말씀드리다（禀告）等。是韩语敬语体系的"降己"一环。', explanationEn: 'Self-humbling (자기낮춤) indirectly elevates the other person by lowering the speaker. Core: first person uses 저 (humble form of 나), 저희 (humble form of 우리, often used even if the other isn\'t part of the group), and humble verbs like 드리다 (to give), 말씀드리다 (to tell). It\'s the "lowering oneself" part of Korean honorifics.',
    conjugation: '나 → 저（我，谦称）\n우리 → 저희（我们/我方，谦称）\n주다 → 드리다（给，自谦）\n말하다 → 말씀드리다（禀告，自谦）', conjugationEn: '나 → 저 (I, humble) \\n우리 → 저희 (we/our side, humble) \\n주다 → 드리다 (to give, humble) \\n말하다 → 말씀드리다 (to tell, humble)',
    examples: [
      { ko: '저는 김민수라고 합니다.', zh: '我叫金民秀。', zhEn: 'My name is Kim Min-su.', note: '自谦：저(我的谦称)', noteEn: 'Humble: 저 (humble form of I)' },
      { ko: '저희 회사에서 새 제품을 출시했습니다.', zh: '我们公司发布了新产品。', zhEn: 'Our company released a new product.', note: '自谦：저희(我方谦称)', noteEn: 'Humble: 저희 (humble form of we)' },
      { ko: '자세히 말씀 드리겠습니다.', zh: '我会详细禀告。', zhEn: 'I will report in detail.', note: '自谦：말씀드리다', noteEn: 'Humble: 말씀드리다 (to humbly tell)' },
    ],
    similarPatterns: ['-아/어 드리다', '분/댁/연세/성함/말씀/진지'],
    difference: '自谦（저/저희/드리다）是"降低自己"来抬高对方；敬语名词/动词（성함/드시다）是"直接抬高对方"。两者方向相反但目的相同（表敬）。注意 저희 表"我方"（谦称우리），但表"我们的国家/语言"等全民共有时仍用 우리나라，不用 저희 나라。', differenceEn: 'Self-humbling (저/저희/드리다) lowers yourself to elevate the other person; honorific nouns/verbs (성함/드시다) directly elevate the other. The two work in opposite directions but share the same goal (showing respect). Note: 저희 means "our side" (humble form of 우리), but for things shared by everyone like "our country" or "our language," you still say 우리나라, not 저희 나라.',
    toriTip: '🐰 自谦就是"把自己放低"：나→저、우리→저희。正式自我介绍必用"저는 …입니다"。但有个坑：说"我们国家"要用 우리나라 而非 저희 나라——因为国家不是能对谁谦让的东西。공적 자리에서는 저희, 나라·민족은 우리。', toriTipEn: '🐰 Self-humbling means "putting yourself low": 나→저, 우리→저희. In formal self-introductions, you must say "저는 …입니다." But here\'s the catch: for "our country," use 우리나라, not 저희 나라—because a country isn\'t something you can humbly defer to someone. In public settings use 저희, but for country and people, it\'s 우리.',
  },

  // src: card-p15-l07
  {
    id: 'g136', title: '间接尊敬', titleEn: 'Indirect honorifics', pattern: '간접높임 (-(으)시-)',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '존대',
    usage: '通过尊敬对象的所属物/身体/家人来间接尊敬本人', usageEn: 'Showing respect to someone indirectly through their belongings, body, or family',
    explanation: '间接尊敬（간접높임）指当尊敬对象的身体部位、所有物、家人、话语等作主语时，谓语也加 -(으)시- 来间接表达对本人的尊敬。如 할아버지는 연세가 많으세요（爷爷高龄——尊敬的是"年龄"但抬高爷爷）。但纯商品/无关物不能用（"커피 나오셨어요"是常见误用）。', explanationEn: 'Indirect honorifics (간접높임) mean that when the respected person\'s body part, possession, family member, or words are the subject, the predicate takes -(으)시- to indirectly show respect to that person. For example, 할아버지는 연세가 많으세요 (Grandfather is advanced in age—the honorific targets "age" but elevates Grandfather). However, you can\'t use it for mere products or unrelated things ("커피 나오셨어요" is a common mistake).',
    conjugation: '尊者的身体/所属/家人 + 이/가 + 谓语 + -(으)시-\n손이 크시다（手大）/ 연세가 많으시다（高龄）\n말씀이 있으시다（有话说）/ 따님이 계시다（有女儿）\n※纯商品不可：커피 나오셨습니다（✗）', conjugationEn: 'Respected person\'s body/possession/family + 이/가 + predicate + -(으)시-\\n손이 크시다 (has big hands) / 연세가 많으시다 (is advanced in age)\\n말씀이 있으시다 (has something to say) / 따님이 계시다 (has a daughter)\\n※ Not for mere products: 커피 나오셨습니다 (✗)',
    examples: [
      { ko: '아버지는 손이 크세요.', zh: '父亲手很大。', zhEn: 'My father has big hands.', note: '间接尊敬：尊敬"手"抬高父亲', noteEn: 'Indirect honorific: honoring "hands" elevates the father' },
      { ko: '할아버지는 연세가 많으세요.', zh: '爷爷年纪大了。', zhEn: 'Grandfather is advanced in age.', note: '间接尊敬：연세+(으)시', noteEn: 'Indirect honorific: 연세 + (으)시' },
      { ko: '성함이 어떻게 되세요?', zh: '您贵姓？', zhEn: 'What is your surname?', note: '间接尊敬：성함+되시다', noteEn: 'Indirect honorific: 성함 + 되시다' },
    ],
    similarPatterns: ['-(으)시', '분/댁/연세/성함/말씀/진지'],
    difference: '间接尊敬是尊者的"所属/身体/家人"作主语时谓语加 -(으)시-（"손이 크세요"手大→敬父亲）；直接主体敬语是尊者"本人"作主语加 -(으)시-（"아버지가 오세요"父亲来）。间接尊敬的对象是"与尊者相关的事物"，不能滥用到无关商品（"커피 나오셨어요"✗）。', differenceEn: 'Indirect honorifics add -(으)시- to the predicate when the subject is the respected person\'s "possession/body/family" ("손이 크세요" big hands → honoring the father); direct subject honorifics add -(으)시- when the respected person "themselves" is the subject ("아버지가 오세요" father comes). Indirect honorifics apply to things related to the respected person, not to unrelated objects ("커피 나오셨어요"✗).',
    toriTip: '🐰 间接尊敬：尊者的东西/身体/家人也要"沾光"加 -(으)시-。"교수님은 시간이 있으세요?"（教授有时间吗——时间沾了教授的敬意）。但别乱用到商品！"커피 나오셨습니다"（咖啡来了·敬语）是店员常犯的错——咖啡不需要被尊敬。', toriTipEn: '🐰 Indirect honorifics: the respected person\'s things/body/family also "share the glory" with -(으)시-. "교수님은 시간이 있으세요?" (Does the professor have time? — time shares the professor\'s honor). But don\'t misuse it on products! "커피 나오셨습니다" (coffee has arrived·honorific) is a common mistake by staff — coffee doesn\'t need respect.',
  },

  // src: card-p15-l08
  {
    id: 'g137', title: '压尊法', titleEn: 'Deferential lowering', pattern: '압존법 (높임 误用禁忌)', patternEn: '압존법 (honorific misuse taboo)',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '존대',
    usage: '当听者地位更高时，压低中间人的敬语', usageEn: 'Lowering the honorific for a third party when the listener is of higher status',
    explanation: '压尊法（압존법）指在提到第三者时，若听者的地位高于该第三者，则对第三者不用（或减用）敬语。传统上如：对社长提到科长时，不给科长加 -(으)시-（"팀장이 나갔습니다"而非 나가셨습니다）。现代职场此规则已放宽，但家庭内对长辈说更年长者时仍常见。同时本课涵盖各类敬语误用禁忌。', explanationEn: 'Deferential lowering (압존법) means when mentioning a third party, if the listener outranks that third party, you omit (or reduce) honorifics for the third party. Traditionally, e.g., when mentioning a team leader to the boss, you don\'t add -(으)시- to the team leader ("팀장이 나갔습니다" not 나가셨습니다). This rule has relaxed in modern workplaces, but it\'s still common at home when speaking to an elder about someone older. This lesson also covers various honorific misuse taboos.',
    conjugation: '听者 > 第三者 时，第三者谓语不加 -(으)시-\n（对社长）팀장이 나갔습니다（○ 压尊）\n（家中对爷爷）아버지가 왔어요（传统压尊）\n※现代职场压尊法已趋松动，多数场合仍可加시', conjugationEn: 'When listener > third party, don\'t add -(으)시- to the third party\'s predicate\\n(to the boss) 팀장이 나갔습니다 (○ deferential lowering)\\n(at home, to grandfather) 아버지가 왔어요 (traditional deferential lowering)\\n※In modern workplaces, deferential lowering has relaxed; adding 시 is still fine in most cases',
    examples: [
      { ko: '팀장이 조금 전에 나갔습니다.', zh: '组长刚才出去了。（面对社长时压低组长）', zhEn: 'The team leader just stepped out. (lowering the team leader when facing the boss)', note: '压尊法：对更高者压低中间人', noteEn: 'Deferential lowering: lowering the middle person before someone higher' },
      { ko: '주문하신 커피 나왔습니다.', zh: '您点的咖啡好了。', zhEn: 'Your coffee is ready.', note: '误用纠正：商品不加시(非 나오셨습니다)', noteEn: 'Misuse correction: no 시 for products (not 나오셨습니다)' },
      { ko: '저는 학교에 갔어요.', zh: '我去学校了。', zhEn: 'I went to school.', note: '禁忌：自己不能加시(非 가셨어요)', noteEn: 'Taboo: never add 시 to yourself (not 가셨어요)' },
    ],
    similarPatterns: ['-(으)시', '간접높임'],
    difference: '压尊法是"看听者身份决定给不给第三者敬语"（听者更高则压低中间人，"사장님 앞에서 팀장이 나갔습니다"）；间接尊敬是"给尊者的所属物加敬语"。此外核心禁忌：自己绝不加 -(으)시-（"제가 가셨어요"✗），无关商品不加 -(으)시-（"커피 나오셨어요"✗）。', differenceEn: 'Deferential lowering is "deciding whether to give honorifics to a third party based on the listener\'s status" (if the listener is higher, lower the middle person, "사장님 앞에서 팀장이 나갔습니다"); indirect honorifics are "adding honorifics to the respected person\'s belongings." Core taboos: never add -(으)시- to yourself ("제가 가셨어요"✗), and don\'t add -(으)시- to unrelated products ("커피 나오셨어요"✗).',
    toriTip: '🐰 압존법是敬语的高阶难点：在社长面前提科长，传统上不给科长加시（"팀장이 나갔습니다"）。不过现代职场这条已放松，加시也没错。真正的铁律是两条：①自己永远不加시；②咖啡奶茶不需要敬语（"나오셨습니다"是过度敬语病）。', toriTipEn: '🐰 압존법 is an advanced honorific challenge: mentioning a team leader before the boss, traditionally you don\'t add 시 to the team leader ("팀장이 나갔습니다"). But this has relaxed in modern workplaces; adding 시 is fine too. The real iron rules are two: ① never add 시 to yourself; ② coffee and milk tea don\'t need honorifics ("나오셨습니다" is over-honorific disease).',
  },

  // =====================================================================
  //  批量提炼扩充 B5（P17-P19，高级：程度/回想/时相）
  // =====================================================================

  // src: card-p17-l01
  {
    id: 'g138', title: '经由/凭借', titleEn: 'Via / by means of', pattern: '(으)로 해서',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '연결',
    usage: '表示"因…、经由…、通过…"的原因或途径', usageEn: 'Indicates a cause or means of "due to…, via…, through…"',
    explanation: '在名词后接 (으)로 해서，表示凭借某种途径、手段或以某事为原因（"因…、通过…"）。既可表原因（교통사고로 해서 因交通事故），也可表经由/媒介（인터넷으로 해서 通过网络）。比单纯的 (으)로 语气更完整、更书面。', explanationEn: 'Attach (으)로 해서 to a noun to indicate a means, path, or cause ("due to…, through…"). It can express cause (교통사고로 해서 due to a traffic accident) or via/medium (인터넷으로 해서 through the internet). It sounds more complete and formal than plain (으)로.',
    conjugation: '无收音/ㄹ名词 + 로 해서\n有收音名词 + 으로 해서', conjugationEn: 'No final consonant/ㄹ noun + 로 해서\\nFinal consonant noun + 으로 해서',
    examples: [
      { ko: '교통사고로 해서 출근이 늦었어요.', zh: '因为交通事故，上班迟到了。', zhEn: 'I was late for work because of a traffic accident.', note: '原因：因事故迟到', noteEn: 'Cause: late due to an accident' },
      { ko: '인터넷으로 해서 그 소식을 알게 됐어요.', zh: '通过网络知道了那个消息。', zhEn: 'I found out that news through the internet.', note: '途径：经由网络得知', noteEn: 'Means: learned via the internet' },
      { ko: '폭우로 해서 행사가 취소됐어요.', zh: '因为暴雨，活动取消了。', zhEn: 'The event was canceled due to the heavy rain.', note: '原因：因暴雨取消', noteEn: 'Cause: canceled due to heavy rain' },
    ],
    similarPatterns: ['-(으)로', '(으)로 인하여'],
    difference: '(으)로 해서 兼表原因与途径，语气较完整（"인터넷으로 해서 알았어요"通过网络得知）；单纯 (으)로 是中性的手段/方向（"연필로"用铅笔）；(으)로 인하여 是纯书面的正式因果。表原因经由用 (으)로 해서，正式公文用 (으)로 인하여。', differenceEn: '(으)로 해서 covers both cause and means with a fuller tone ("인터넷으로 해서 알았어요" learned via the internet); plain (으)로 is a neutral means/direction ("연필로" with a pencil); (으)로 인하여 is purely formal written cause-and-effect. Use (으)로 해서 for cause/means, and (으)로 인하여 for official documents.',
    toriTip: '🐰 (으)로 해서 = "经由/因为…"，比光秃秃的 (으)로 更有"通过这个途径/由于这个缘故"的完整感。"이 길로 해서 가면 빨라요"（走这条路更快）、"친구로 해서 알게 됐어요"（通过朋友认识的）。', toriTipEn: '🐰 (으)로 해서 = "via/because of…", giving a fuller sense of "through this path / due to this reason" than bare (으)로. "이 길로 해서 가면 빨라요" (going this way is faster), "친구로 해서 알게 됐어요" (got to know through a friend).',
  },

  // src: card-p17-l02
  {
    id: 'g139', title: '程度相当', titleEn: 'Comparable degree', pattern: '-(으)ㄹ 만큼 / N만큼',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '연결',
    usage: '表示"…那么、到…的程度"', usageEn: 'Indicates "to the extent of…, as much as…"',
    explanation: '表示后项的程度与前项相当。动词/形容词用 -(으)ㄹ 만큼（到…的程度），名词用 N만큼（像…那么）。强调"达到与前面所述相同的程度"，常用于夸张比喻。', explanationEn: 'Indicates that the degree of the latter equals the former. Verbs/adjectives use -(으)ㄹ 만큼 (to the extent of...), nouns use N만큼 (as much as...). Emphasizes "reaching the same degree as previously stated," often used in exaggerated comparisons.',
    conjugation: '动词/形容词 + (으)ㄹ 만큼 (무섭다→무서울 만큼)\n名词 + 만큼 (너만큼 크다)\n过去 + (으)ㄴ 만큼', conjugationEn: 'Verb/Adjective + (으)ㄹ 만큼 (무섭다→무서울 만큼)\\nNoun + 만큼 (너만큼 크다)\\nPast + (으)ㄴ 만큼',
    examples: [
      { ko: '시험이 무서울 만큼 어려웠어요.', zh: '考试难到让人害怕的程度。', zhEn: 'The exam is so hard it\'s scary.', note: '程度：难到害怕', noteEn: 'Degree: scary to the point of fear' },
      { ko: '배가 터질 만큼 먹었어요.', zh: '吃到肚子要撑破的程度。', zhEn: 'Eat to the point of bursting.', note: '程度：撑破的量', noteEn: 'Degree: amount that bursts' },
      { ko: '죽을 만큼 보고 싶었어요.', zh: '想你想到要死的程度。', zhEn: 'I miss you so much I could die.', note: '程度：想到要死', noteEn: 'Degree: think of dying' },
    ],
    similarPatterns: ['-(으)ㄹ 정도로', '보다'],
    difference: '-(으)ㄹ 만큼 强调"程度相当/达到某程度"（可含比较基准，"너만큼 크다"和你一样高、"터질 만큼"到撑破的程度）；-(으)ㄹ 정도로 更侧重"到…的极端程度"（g37）。보다 是"比…"的差距比较。만큼 表"相当/同等程度"，보다 表"差距"。', differenceEn: '-(으)ㄹ 만큼 emphasizes "equal degree/reaching a certain level" (can include a comparison basis, e.g., "너만큼 크다" as tall as you, "터질 만큼" to the point of bursting); -(으)ㄹ 정도로 focuses more on "extreme degree" (g37). 보다 is for comparative gaps. 만큼 indicates "equal/same degree," 보다 indicates "difference."',
    toriTip: '🐰 -(으)ㄹ 만큼 是夸张利器，"到了…的程度"。"죽을 만큼 사랑해"（爱你爱到死）、"눈물 날 만큼 감동적이야"（感动到流泪）。名词直接加 만큼："나만큼 해 봐"（做到和我一样）。韩剧台词的高频担当。', toriTipEn: '🐰 -(으)ㄹ 만큼 is a hyperbole tool, meaning "to the extent of...". "죽을 만큼 사랑해" (love you to death), "눈물 날 만큼 감동적이야" (moved to tears). Add 만큼 directly to nouns: "나만큼 해 봐" (do it as well as me). A staple in K-drama lines.',
  },

  // src: card-p17-l04
  {
    id: 'g140', title: '濒临地步', titleEn: 'On the verge of', pattern: '-(으)ㄹ 지경이다',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"到了快要…的地步"', usageEn: 'Indicates "reaching the point of almost..."',
    explanation: '接在动词后，表示某种（通常是负面、极端）状态即将达到的地步，相当于"到了快要…的程度、几乎要…了"。强调状况严重、难以承受。', explanationEn: 'Attached after verbs, it indicates that a certain (usually negative, extreme) state is about to be reached, equivalent to "to the point of almost..." or "nearly...". Emphasizes that the situation is severe and hard to bear.',
    conjugation: '无收音/ㄹ + ㄹ 지경이다 (쓰러지다→쓰러질 지경이다)\n有收音 + 을 지경이다 (죽다→죽을 지경이다)', conjugationEn: 'No final consonant/ㄹ + ㄹ 지경이다 (쓰러지다→쓰러질 지경이다)\\nWith final consonant + 을 지경이다 (죽다→죽을 지경이다)',
    examples: [
      { ko: '이틀 동안 못 잤더니 쓰러질 지경이에요.', zh: '两天没睡，累到快要倒下的地步。', zhEn: 'Two days without sleep, exhausted to the point of collapsing.', note: '地步：快倒下', noteEn: 'Stage: about to collapse' },
      { ko: '그 사람 때문에 못 참을 지경이에요.', zh: '因为那个人，已经到了忍无可忍的地步。', zhEn: 'Because of that person, I\'ve reached the end of my rope.', note: '地步：忍无可忍', noteEn: 'Stage: at the end of one\'s patience' },
      { ko: '너무 배가 고파서 쓰러질 지경이에요.', zh: '太饿了，饿到快要倒下的地步。', zhEn: 'So hungry that I\'m about to collapse.', note: '地步：饿到快倒', noteEn: 'Stage: starving to the point of fainting' },
    ],
    similarPatterns: ['-(으)ㄹ 정도로', '-(으)ㄹ 만큼'],
    difference: '-(으)ㄹ 지경이다 强调"濒临某种（多为负面）极端状态的地步"（"쓰러질 지경이다"快要倒下了，状况严重）；-(으)ㄹ 정도로/만큼 是中性地描述程度。지경이다 特有"糟糕到快撑不住"的负面语感，做句子谓语收尾。', differenceEn: '-(으)ㄹ 지경이다 emphasizes "being on the verge of an extreme (usually negative) state" (e.g., "쓰러질 지경이다" about to collapse, serious situation); -(으)ㄹ 정도로/만큼 describe degree neutrally. 지경이다 carries a negative nuance of "so bad it\'s almost unbearable," used as the sentence predicate.',
    toriTip: '🐰 -(으)ㄹ 지경이다 = "到了快…的地步"，专门吐苦水用。"미칠 지경이에요"（快疯了）、"죽을 지경이에요"（要命了）。语气比"힘들어요"强烈得多，形容自己被逼到极限时最传神。', toriTipEn: '🐰 -(으)ㄹ 지경이다 = "to the point of almost...", used for complaining. "미칠 지경이에요" (I\'m going crazy), "죽을 지경이에요" (it\'s killing me). Much stronger than "힘들어요," perfect for describing being pushed to the limit.',
  },

  // src: card-p18-l01
  {
    id: 'g141', title: '回想告知', titleEn: 'Recollection report', pattern: '-더라 / -더라고요',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '시제',
    usage: '转述"我（过去）亲眼所见/亲身感受"的事', usageEn: 'Reporting something "I (in the past) saw or felt firsthand"',
    explanation: '表示说话人回想起过去亲自经历、目睹或感受到的事实，并告知对方，相当于"（我看到/发现）…呢"。平语用 -더라，敬语用 -더라고요。强调"这是我亲身体验到的"，主语通常不是第一人称（自己的感受除外）。', explanationEn: 'Indicates the speaker recalls a fact they personally experienced, witnessed, or felt in the past and informs the listener, equivalent to "(I saw/found) ...". Casual form uses -더라, polite form uses -더라고요. Emphasizes "this is from my own experience," subject is usually not first person (except for one\'s own feelings).',
    conjugation: '动词/形容词词干 + 더라 / 더라고요\n过去 + 았/었더라(고요)\n名词 + (이)더라(고요)', conjugationEn: 'Verb/Adjective stem + 더라 / 더라고요\\nPast + 았/었더라(고요)\\nNoun + (이)더라(고요)',
    examples: [
      { ko: '직접 해 봤는데 생각보다 쉽더라.', zh: '亲自做了一下，比想象中简单啊。', zhEn: 'I did it myself, and it\'s simpler than I thought.', note: '回想告知：发现简单', noteEn: 'Recollection report: found it simple' },
      { ko: '벚꽃이 엄청 예쁘더라, 빨리 와!', zh: '樱花超级漂亮啊，快来！', zhEn: 'The cherry blossoms are gorgeous, come quick!', note: '回想告知：亲见樱花美', noteEn: 'Recollection report: saw cherry blossoms were beautiful' },
      { ko: '가 봤더니 생각보다 훨씬 좋더라.', zh: '去了一看，比想象中好多了啊。', zhEn: 'I went and saw it—it was much better than I expected.', note: '回想告知：亲见更好', noteEn: 'Recollection report: saw it was better' },
    ],
    similarPatterns: ['-네요', '-던데'],
    difference: '-더라(고요) 是"回想亲身经历后告知对方"（过去亲见/亲感，"맛있더라"我（尝过觉得）好吃呢）；-네요 是"当场即时发现的感叹"（"맛있네요"现在吃着好吃）。前者转述过去体验，后者感叹眼前。-던데 是回想+背景铺垫。', differenceEn: '-더라(고요) is "recalling a personal experience to tell someone" (past seeing/feeling, "맛있더라" I tried it and it was tasty); -네요 is "an exclamation of immediate discovery" ("맛있네요" it tastes good right now). The former relays past experiences, the latter exclaims about the present. -던데 is recall + background setup.',
    toriTip: '🐰 -더라(고요) 是"我（当时）看到/发现…呢"，分享亲身见闻的口头禅。"거기 진짜 좋더라"（那儿真的很好呢）、"생각보다 어렵더라고요"（比想象中难呢）。注意它带"我亲历"的味道，不能用来说自己主动做的事。', toriTipEn: '🐰 -더라(고요) is "I (then) saw/found..." — a casual way to share what you personally witnessed. "거기 진짜 좋더라" (That place is really nice), "생각보다 어렵더라고요" (It\'s harder than I thought). Note it carries a "I experienced it" feel, so you can\'t use it for things you did yourself.',
  },

  // src: card-p18-l02
  {
    id: 'g142', title: '回想转折', titleEn: 'Recall contrast', pattern: '-더니',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '연결',
    usage: '表示"（我观察到）之前…结果/后来…"', usageEn: 'Indicates "(I observed) earlier... and then/later..."',
    explanation: '接在动词/形容词后，表示说话人回想起过去观察到的情况，后句是随之而来的结果或对比变化，相当于"（看到）…然后就…、之前…结果…"。主语多为第三人称（说话人观察对象）。', explanationEn: 'Attached to verbs/adjectives, it means the speaker recalls an observed situation from the past, with the following clause showing the resulting or contrasting change — like "(saw that)... and then..." or "earlier... but then...". The subject is usually third person (what the speaker observed).',
    conjugation: '动词/形容词词干 + 더니\n（第三人称观察：비가 오더니…）', conjugationEn: 'Verb/adjective stem + 더니\\n(Third-person observation: 비가 오더니…)',
    examples: [
      { ko: '비가 오더니 갑자기 개었어요.', zh: '之前在下雨，突然放晴了。', zhEn: 'It was raining, then suddenly cleared up.', note: '回想转折：下雨后放晴', noteEn: 'Recall contrast: cleared up after rain' },
      { ko: '아이가 울더니 조용해졌어요.', zh: '孩子哭了一会儿，安静下来了。', zhEn: 'The child cried for a bit, then calmed down.', note: '回想转折：哭后安静', noteEn: 'Recall contrast: quieted after crying' },
      { ko: '열심히 공부하더니 결국 합격했어요.', zh: '之前努力学习，最终合格了。', zhEn: 'After studying hard, I finally passed.', note: '回想转折：努力后合格', noteEn: 'Recall contrast: passed after working hard' },
    ],
    similarPatterns: ['-았/었더니', '-더라'],
    difference: '-더니 主语多为第三人称，回想观察到的情况+随后结果（"아이가 울더니 조용해졌어요"孩子哭了然后安静了）；-았/었더니 主语多为第一人称，"我做了…之后（发现）…"（"약을 먹었더니 나았어요"我吃了药就好了）。前者观察他人，后者自己行动的结果。', differenceEn: '-더니 usually has a third-person subject, recalling an observed situation + its result ("아이가 울더니 조용해졌어요" The child cried and then got quiet); -았/었더니 usually has a first-person subject, "after I did... (I found)..." ("약을 먹었더니 나았어요" I took medicine and got better). The former observes others, the latter is the result of one\'s own action.',
    toriTip: '🐰 -더니 是"（我看着）他之前…然后就…"，讲别人的变化。"어제까지 멀쩡하더니 오늘 아프대"（昨天还好好的，今天就说病了）。主语一般是别人，说自己做完某事的结果要用 -았/었더니。', toriTipEn: '🐰 -더니 is "(I watched) he was... and then..." — talking about someone else\'s change. "어제까지 멀쩡하더니 오늘 아프대" (He was fine until yesterday, but today he says he\'s sick). The subject is usually someone else; for results of your own actions, use -았/었더니.',
  },

  // src: card-p18-l02
  {
    id: 'g143', title: '亲历后果', titleEn: 'Personal consequence', pattern: '-았/었더니',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '연결',
    usage: '表示"我做了…之后，（发现/出现了）…"', usageEn: 'Indicates "after I did..., (I found/... happened)"',
    explanation: '接在动词后，表示说话人自己做了某动作之后，出现了后句的结果或发现。主语通常是第一人称。前句是"我"的动作，后句是随之而来的结果或新发现。', explanationEn: 'Attached to verbs, it means after the speaker did an action, a result or discovery followed. The subject is usually first person. The first clause is "my" action, and the second is the resulting outcome or new finding.',
    conjugation: '动词词干 + 았/었더니\n词干元音 ㅏ/ㅗ → 았더니 (자다→잤더니)\n其他 → 었더니 (먹다→먹었더니)\n하다 → 했더니', conjugationEn: 'Verb stem + 았/었더니\\nStem vowel ㅏ/ㅗ → 았더니 (자다→잤더니)\\nOthers → 었더니 (먹다→먹었더니)\\n하다 → 했더니',
    examples: [
      { ko: '약을 먹었더니 두통이 사라졌어요.', zh: '吃了药之后，头痛消失了。', zhEn: 'After taking medicine, the headache went away.', note: '亲历后果：吃药后头不疼', noteEn: 'Personal consequence: headache gone after medicine' },
      { ko: '매일 달렸더니 체력이 좋아졌어요.', zh: '每天跑步之后，体力变好了。', zhEn: 'After running every day, my stamina improved.', note: '亲历后果：跑步后体力好', noteEn: 'Personal consequence: stamina good after running' },
      { ko: '푹 잤더니 피로가 풀렸어요.', zh: '好好睡了一觉之后，疲劳消除了。', zhEn: 'After sleeping well, my fatigue was gone.', note: '亲历后果：睡后疲劳消', noteEn: 'Personal consequence: fatigue gone after sleep' },
    ],
    similarPatterns: ['-더니', '-아/어 보니까'],
    difference: '-았/었더니 主语是第一人称"我"，"我做了A之后出现B"（"약을 먹었더니 나았어요"我吃药后好了）；-더니 主语是第三人称，观察别人"A之后B"（"동생이 먹더니 배탈났어요"弟弟吃了然后闹肚子）。同是"…더니"，前加过去时说自己，不加说别人。', differenceEn: '-았/었더니 has a first-person subject "I": "after I did A, B happened" ("약을 먹었더니 나았어요" I took medicine and got better); -더니 has a third-person subject, observing someone else "after A, B" ("동생이 먹더니 배탈났어요" My brother ate and then got a stomachache). Both use "...더니," but adding past tense refers to yourself, without it refers to others.',
    toriTip: '🐰 -았/었더니 是"我做了…结果…"，说自己行动带来的后果。"운동했더니 배고파요"（运动完就饿了）、"울었더니 눈이 부었어요"（哭完眼睛肿了）。记住：说自己用 -았/었더니，说别人用 -더니。', toriTipEn: '🐰 -았/었더니 is "I did... and as a result..." — talking about consequences of your own actions. "운동했더니 배고파요" (I\'m hungry after working out), "울었더니 눈이 부었어요" (My eyes swelled after crying). Remember: use -았/었더니 for yourself, -더니 for others.',
  },

  // src: card-p18-l03
  {
    id: 'g144', title: '书面因果', titleEn: 'Formal cause', pattern: '(으)로 인하여 / (으)로 인한',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"由于…（导致）"，正式书面因果', usageEn: 'Indicates "due to... (causing)" — formal written cause',
    explanation: '接在名词后，表示某事为原因导致后果，相当于"由于…、因…而…"。(으)로 인하여（+动词/句子）作状语，(으)로 인한（+名词）作定语。是新闻、公告、论文等正式书面语的典型因果表达。', explanationEn: 'Attached to nouns, it means something is the cause leading to a consequence — like "due to..." or "because of...". (으)로 인하여 (+verb/sentence) acts as an adverbial, (으)로 인한 (+noun) as a modifier. It\'s a typical causal expression in formal writing like news, announcements, and papers.',
    conjugation: '名词 + (으)로 인하여 (+谓语/句子)\n名词 + (으)로 인한 (+名词)\n无收音/ㄹ + 로, 有收音 + 으로', conjugationEn: 'Noun + (으)로 인하여 (+predicate/sentence)\\nNoun + (으)로 인한 (+noun)\\nNo final consonant/ㄹ + 로, with final consonant + 으로',
    examples: [
      { ko: '폭우로 인하여 도로 일부가 통제됐습니다.', zh: '由于暴雨，部分道路被封锁了。', zhEn: 'Due to heavy rain, some roads were blocked.', note: '书面因果：因暴雨封路', noteEn: 'Formal cause: road closed due to heavy rain' },
      { ko: '과로로 인한 면역력 저하가 문제입니다.', zh: '由过劳引起的免疫力下降是个问题。', zhEn: 'The drop in immunity caused by overwork is a problem.', note: '书面因果：过劳致免疫下降', noteEn: 'Written cause-effect: Overwork leads to lowered immunity' },
      { ko: '태풍으로 인하여 비행기가 결항됐습니다.', zh: '由于台风，飞机取消了。', zhEn: 'Due to the typhoon, the flight was canceled.', note: '书面因果：因台风停航', noteEn: 'Written cause-effect: Flights suspended due to typhoon' },
    ],
    similarPatterns: ['때문에', '(으)로 해서'],
    difference: '(으)로 인하여 是最正式的书面因果（新闻/公告，"폭우로 인하여 통제됐습니다"因暴雨管制）；때문에 是通用因果（口语书面皆可）；(으)로 해서 兼原因与途径，略口语。正式文书用 (으)로 인하여，日常用 때문에。', differenceEn: '(으)로 인하여 is the most formal written cause-effect (news/announcements, "폭우로 인하여 통제됐습니다" controlled due to heavy rain); 때문에 is general cause-effect (works in speech and writing); (으)로 해서 covers both cause and means, slightly colloquial. Use (으)로 인하여 in formal documents, 때문에 in daily speech.',
    toriTip: '🐰 (으)로 인하여 是新闻体因果的招牌，"由于…"。"폭설로 인하여"（由于暴雪）、"코로나로 인한 변화"（因新冠带来的变化）。写正式文章、看新闻必备。日常聊天用它会显得太officious，那时候用 때문에 就好。', toriTipEn: '🐰 (으)로 인하여 is the hallmark of news-style cause-effect, "due to...". "폭설로 인하여" (due to heavy snow), "코로나로 인한 변화" (changes brought by COVID). Essential for formal writing and reading news. Using it in daily chat sounds too officious—use 때문에 instead.',
  },

  // src: card-p18-l04
  {
    id: 'g145', title: '推测（好像）', titleEn: 'Conjecture (seems like)', pattern: '-는/(으)ㄴ 듯하다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"好像…、似乎…"的推测', usageEn: 'Indicates conjecture meaning "seems like..., appears..."',
    explanation: '接在动词/形容词的冠形词形后，表示根据某种迹象做出的推测，相当于"好像…、似乎…"。比 -는 것 같다 更书面、更含蓄。动词现在 -는 듯하다，形容词/动词过去 -(으)ㄴ 듯하다，将来 -(으)ㄹ 듯하다。', explanationEn: 'Attached after the adnominal form of verbs/adjectives, it indicates conjecture based on certain signs, equivalent to "seems like..., appears...". More written and subtle than -는 것 같다. Verb present -는 듯하다, adjective/verb past -(으)ㄴ 듯하다, future -(으)ㄹ 듯하다.',
    conjugation: '动词现在 + 는 듯하다 (오는 듯하다)\n形容词 + (으)ㄴ 듯하다 (피곤한 듯하다)\n动词过去 + (으)ㄴ 듯하다 (온 듯하다)\n将来 + (으)ㄹ 듯하다', conjugationEn: 'Verb present + 는 듯하다 (오는 듯하다)\\nAdjective + (으)ㄴ 듯하다 (피곤한 듯하다)\\nVerb past + (으)ㄴ 듯하다 (온 듯하다)\\nFuture + (으)ㄹ 듯하다',
    examples: [
      { ko: '눈이 빨간 걸 보니 많이 피곤한 듯해요.', zh: '看眼睛红红的，好像很累。', zhEn: 'Eyes are red—seems really tired.', note: '推测：看样子累', noteEn: 'Conjecture: Seems tired' },
      { ko: '표정을 보니 잘 모르는 듯해요.', zh: '看表情，好像不太清楚。', zhEn: 'From the expression, seems unclear.', note: '推测：好像不懂', noteEn: 'Conjecture: Seems not to understand' },
      { ko: '날씨가 봄이 온 듯한 느낌이에요.', zh: '天气有种春天来了的感觉。', zhEn: 'The weather feels like spring has arrived.', note: '推测：好像春天来了', noteEn: 'Conjecture: Seems spring has come' },
    ],
    similarPatterns: ['-는 것 같다', '-나 보다'],
    difference: '-는 듯하다 是较书面、含蓄的推测（"피곤한 듯해요"好像累）；-는 것 같다 是最口语常用的推测（g69，"피곤한 것 같아요"）；-나 보다 是"根据线索推断"。义近，듯하다 更文雅书面，것 같다 更日常。', differenceEn: '-는 듯하다 is a more written, subtle conjecture ("피곤한 듯해요" seems tired); -는 것 같다 is the most colloquial common conjecture (g69, "피곤한 것 같아요"); -나 보다 is "inferring from clues". Similar in meaning—듯하다 is more elegant and written, 것 같다 is more everyday.',
    toriTip: '🐰 -는 듯하다 是 -는 것 같다 的文雅版，"似乎、好像"。写作、想显得斯文时用它。"비가 올 듯해요"（似乎要下雨）比"비가 올 것 같아요"更有书面味。注意别和 -듯이（像…一样）搞混，那是比喻。', toriTipEn: '🐰 -는 듯하다 is the elegant version of -는 것 같다, "seems, appears". Use it in writing or when you want to sound refined. "비가 올 듯해요" (seems like it will rain) has more of a written flavor than "비가 올 것 같아요". Don\'t confuse it with -듯이 (like...), which is a simile.',
  },

  // src: card-p18-l04
  {
    id: 'g146', title: '看样子', titleEn: 'Seems like', pattern: '-는/(으)ㄴ/(으)ㄹ 모양이다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"看样子…、看来…"的推测', usageEn: 'Indicates conjecture meaning "seems like..., looks like..."',
    explanation: '接在冠形词形后加 모양이다，表示根据看到的情况、迹象做出推测，相当于"看样子…、看来…"。说话人非亲身经历，而是靠客观迹象推断。动词现在 -는 모양이다，过去 -(으)ㄴ 모양이다，将来/推测 -(으)ㄹ 모양이다。', explanationEn: 'Attached after the adnominal form plus 모양이다, it indicates conjecture based on observed situations or signs, equivalent to "seems like..., looks like...". The speaker infers from objective signs rather than personal experience. Verb present -는 모양이다, past -(으)ㄴ 모양이다, future/conjecture -(으)ㄹ 모양이다.',
    conjugation: '动词现在 + 는 모양이다 (바쁜→바쁜 모양)\n动词过去 + (으)ㄴ 모양이다 (간 모양이다)\n将来 + (으)ㄹ 모양이다 (올 모양이다)\n形容词 + (으)ㄴ 모양이다', conjugationEn: 'Verb present + 는 모양이다 (바쁜→바쁜 모양)\\nVerb past + (으)ㄴ 모양이다 (간 모양이다)\\nFuture + (으)ㄹ 모양이다 (올 모양이다)\\nAdjective + (으)ㄴ 모양이다',
    examples: [
      { ko: '구름이 많이 끼었으니 비가 올 모양이에요.', zh: '乌云很多，看来要下雨了。', zhEn: 'Lots of dark clouds—looks like rain.', note: '看样子：要下雨', noteEn: 'Seems like: It\'s going to rain' },
      { ko: '전화를 안 받는 걸 보니 바쁜 모양이에요.', zh: '看不接电话的样子，看来很忙。', zhEn: 'Not answering calls—seems busy.', note: '看样子：很忙', noteEn: 'Seems like: Very busy' },
      { ko: '차가 없는 걸 보니 먼저 간 모양이에요.', zh: '看没有车，看来先走了。', zhEn: 'No car in sight—looks like they left first.', note: '看样子：先走了', noteEn: 'Seems like: Left already' },
    ],
    similarPatterns: ['-나 보다', '-는 듯하다'],
    difference: '-는 모양이다 与 -나 보다 几乎同义，都是"根据外部迹象推测"（"바쁜 모양이에요"＝"바쁜가 봐요"看来忙）；-는 듯하다 更含蓄书面。모양이다 强调"看外在情形而推断"，常配"…는 걸 보니"（看…的样子）。', differenceEn: '-는 모양이다 and -나 보다 are nearly synonymous, both meaning "inferring from external signs" ("바쁜 모양이에요" = "바쁜가 봐요" seems busy); -는 듯하다 is more subtle and written. 모양이다 emphasizes "inferring from what you see", often paired with "…는 걸 보니" (judging by...).',
    toriTip: '🐰 -는 모양이에요 = "看样子…"，靠迹象推断。"불이 꺼진 걸 보니 자는 모양이에요"（灯灭了，看来睡了）。和 -나 보다 基本能互换。前面常配"…는 걸 보니"（看…的情况），推理链就完整了。', toriTipEn: '🐰 -는 모양이에요 = "seems like...", inferred from signs. "불이 꺼진 걸 보니 자는 모양이에요" (The light\'s off, so it seems they\'re asleep). Basically interchangeable with -나 보다. Often paired with "…는 걸 보니" (judging by...), which completes the reasoning chain.',
  },

  // src: card-p18-l05
  {
    id: 'g147', title: '推测遗憾', titleEn: 'Conjecture with regret', pattern: '-(으)ㄹ 텐데',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '연결',
    usage: '表示"应该…可是/…吧（担忧或遗憾）"', usageEn: 'Indicates "should... but/... I guess (with worry or regret)"',
    explanation: '由推测 -(으)ㄹ 터 加 -ㄴ데 构成，表示对某情况的推测，并暗含担忧、遗憾或对后句的铺垫，相当于"应该…吧（所以…）、会…的可是…"。常用于关切、可惜或提出建议的语境。', explanationEn: 'Formed from the conjecture -(으)ㄹ 터 plus -ㄴ데, it indicates conjecture about a situation with an undertone of worry, regret, or setting up the next clause, equivalent to "should... I guess (so...), will... but...". Often used in contexts of concern, pity, or making suggestions.',
    conjugation: '无收音/ㄹ + ㄹ 텐데 (피곤하다→피곤할 텐데)\n有收音 + 을 텐데 (좋다→좋을 텐데)\n过去推测 + 았/었을 텐데', conjugationEn: 'No batchim/ㄹ + ㄹ 텐데 (피곤하다→피곤할 텐데)\\nWith batchim + 을 텐데 (좋다→좋을 텐데)\\nPast speculation + 았/었을 텐데',
    examples: [
      { ko: '많이 피곤할 텐데 오늘은 일찍 쉬어요.', zh: '应该很累吧，今天早点休息。', zhEn: 'You must be tired, so get some rest early today.', note: '推测关切：累吧早点休息', noteEn: 'Speculative concern: tired, rest early' },
      { ko: '비가 올 텐데 우산 챙기세요.', zh: '应该会下雨，带把伞吧。', zhEn: 'It might rain, bring an umbrella.', note: '推测建议：会下雨带伞', noteEn: 'Speculative suggestion: it\'ll rain, bring an umbrella' },
      { ko: '손님이 오실 텐데 음식 준비해야겠어요.', zh: '客人应该会来，得准备食物了。', zhEn: 'The guest should be coming, we need to prepare food.', note: '推测铺垫：客人会来', noteEn: 'Speculative setup: guests will come' },
    ],
    similarPatterns: ['-(으)ㄹ 텐데요', '-(으)ㄹ 것 같다'],
    difference: '-(으)ㄹ 텐데 是"推测+关切/遗憾/铺垫"（"피곤할 텐데 쉬어요"应该累吧，休息一下——含体贴）；-(으)ㄹ 것 같다 是单纯推测（"피곤할 것 같아요"好像会累）。텐데 特有"我推测…（因此担心/可惜/建议）"的情感和后续铺垫。', differenceEn: '-(으)ㄹ 텐데 is \'speculation + concern/regret/setup\' (e.g., \'피곤할 텐데 쉬어요\' meaning \'You must be tired, rest\'—shows care); -(으)ㄹ 것 같다 is pure speculation (e.g., \'피곤할 것 같아요\' meaning \'I think you\'ll be tired\'). 텐데 uniquely conveys \'I speculate... (therefore worried/regretful/suggesting)\' with emotional nuance and sets up what follows.',
    toriTip: '🐰 -(으)ㄹ 텐데 是"应该…吧（我有点担心/可惜）"，关心人时特别暖。"배고플 텐데 이거 먹어"（你应该饿了吧，吃这个）。也能表遗憾："조금만 더 하면 됐을 텐데"（再努力一点就好了，可惜）。', toriTipEn: '🐰 -(으)ㄹ 텐데 means \'must be... (I\'m a bit worried/regretful)\', and it\'s especially warm when caring for someone. \'배고플 텐데 이거 먹어\' (You must be hungry, eat this). It can also express regret: \'조금만 더 하면 됐을 텐데\' (If only I\'d tried a bit more, it would\'ve been done—too bad).',
  },

  // src: card-p18-l05
  {
    id: 'g148', title: '口语与格', titleEn: 'Colloquial dative', pattern: '더러 / 보고',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '조사',
    usage: '口语中表示"对…、叫…（说/做某事）"的对象', usageEn: 'In colloquial speech, indicates the object of \'to...\', \'tell...\' (saying/doing something)',
    explanation: '더러、보고 是口语助词，接在人称名词后，表示言语行为（말하다、시키다、하라고 하다 等）的对象，相当于"对…、叫…"。多用于转述命令、要求的场景，比 에게/한테 更口语、更随意。只用于人，且多与引用/使令搭配。', explanationEn: '더러 and 보고 are colloquial particles attached to person nouns, marking the object of speech acts (말하다, 시키다, 하라고 하다, etc.), equivalent to \'to...\', \'tell...\'. They\'re used mainly when relaying commands or requests, and are more colloquial and casual than 에게/한테. They only apply to people and often pair with quotations/causatives.',
    conjugation: '人称名词 + 더러 / 보고\n（저더러 / 나보고 / 친구더러）\n多接 -라고 하다 / -자고 하다 等引用', conjugationEn: 'Person noun + 더러 / 보고\\n(저더러 / 나보고 / 친구더러)\\nOften followed by quotations like -라고 하다 / -자고 하다',
    examples: [
      { ko: '선생님이 저더러 칠판에 쓰라고 하셨어요.', zh: '老师叫我在黑板上写。', zhEn: 'The teacher told me to write on the board.', note: '口语与格：叫我写', noteEn: 'Colloquial dative: told me to write' },
      { ko: '오빠한테 전화하라고 했는데 나더러 다시 하라고 했어요.', zh: '让哥哥打电话，他却叫我再打一次。', zhEn: 'I asked my brother to call, but he told me to call again.', note: '口语与格：叫我再打', noteEn: 'Colloquial dative: told me to call again' },
      { ko: '친구보고 같이 가자고 했어요.', zh: '叫朋友一起去了。', zhEn: 'I told my friend to go together.', note: '口语与格：叫朋友一起', noteEn: 'Colloquial dative: told friend to come along' },
    ],
    similarPatterns: ['에게/한테', '-다고/라고/냐고/자고'],
    difference: '더러/보고 是口语与格助词，专用于言语/使令的对象（"나더러 하라고 했어"叫我做），只接人、常配引用；에게/한테 是通用与格（给予/对象，"친구에게 줬어요"给朋友），适用范围更广。더러/보고 更口语随意，且几乎只出现在转述命令/要求时。', differenceEn: '더러/보고 are colloquial dative particles used specifically for the object of speech/causative acts (e.g., \'나더러 하라고 했어\' meaning \'told me to do it\'), only for people and often with quotations; 에게/한테 are general datives (giving/object, e.g., \'친구에게 줬어요\' meaning \'gave to a friend\'), with broader use. 더러/보고 are more colloquial and casual, appearing almost only when relaying commands or requests.',
    toriTip: '🐰 더러/보고 是超口语的"叫…、对…"，专门用在转述别人的话时。"나보고 하래"（叫我做）、"저더러 오라고 했어요"（叫我来）。比 에게/한테 更有"当面被使唤"的生活感，但只能用于人、只配说话类动词。', toriTipEn: '🐰 더러/보고 are super colloquial \'tell...\', \'to...\', used specifically when relaying someone\'s words. \'나보고 하래\' (tells me to do it), \'저더러 오라고 했어요\' (told me to come). They feel more like \'being told directly\' in daily life than 에게/한테, but only for people and only with speech verbs.',
  },

  // src: card-p19-l01
  {
    id: 'g149', title: '带来给', titleEn: 'Bring to give', pattern: '-아/어다(가) 주다/드리다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"（做/取好后）带来给某人"', usageEn: 'Indicates doing/getting something and then bringing it to give to someone',
    explanation: '由 -아/어다(가)（做完前一动作后移动）加 주다/드리다 构成，表示在别处完成某动作（买、做、取），再把结果带到对方身边给予，相当于"…来给…"。前后动作有先后+位移的关系，给长辈用 드리다。', explanationEn: 'Formed by -아/어다(가) (moving after completing the previous action) plus 주다/드리다, it means completing an action elsewhere (buy, make, get) and then bringing the result to give to the other person, equivalent to \'... to give\'. The actions have a sequence and movement relationship; use 드리다 for elders.',
    conjugation: '词干 + 아/어다(가) + 주다/드리다\n元音 ㅏ/ㅗ → 아다 주다 (사다→사다 주다)\n其他 → 어다 주다 (끓이다→끓여다 주다)\n데리다→데려다 주다', conjugationEn: 'Stem + 아/어다(가) + 주다/드리다\\nVowel ㅏ/ㅗ → 아다 주다 (사다→사다 주다)\\nOther → 어다 주다 (끓이다→끓여다 주다)\\n데리다→데려다 주다',
    examples: [
      { ko: '오는 길에 우유 좀 사다 줘요.', zh: '来的路上帮我买点牛奶来。', zhEn: 'Buy me some milk on your way here.', note: '带来给：买了带来', noteEn: 'Bring to give: bought and brought' },
      { ko: '어머니께 따뜻한 차를 끓여다 드렸어요.', zh: '给母亲泡了热茶端过去。', zhEn: 'Brewed hot tea for my mother and brought it to her.', note: '带来给：泡好端给（敬语）', noteEn: 'Bring to give: brewed and served (honorific)' },
      { ko: '아이를 학교에 데려다 줬어요.', zh: '把孩子送到学校了。', zhEn: 'I took the kids to school.', note: '带来给：送到（位移）', noteEn: 'Bring to give: delivered (movement)' },
    ],
    similarPatterns: ['-아/어 주다', '-아/어다(가)'],
    difference: '-아/어다(가) 주다 含"在别处做完+位移+给予"三层（"사다 줘요"买了拿来给我——先买、再带来、再给）；-아/어 주다 只是"为对方做"（"사 줘요"给我买，不强调位移）。다(가) 多了"到另一个地方完成再带回"的过程。', differenceEn: '-아/어다(가) 주다 has three layers: "do elsewhere + move + give" ("사다 줘요" buy and bring it to me—buy first, then bring, then give); -아/어 주다 just means "do for someone" ("사 줘요" buy for me, no movement implied). 다(가) adds the process of "completing somewhere else and bringing it back."',
    toriTip: '🐰 -아/어다 주다 = "帮我…来"，带了个"位移"进去。"사다 줘"（买来给我）不同于"사 줘"（给我买）——前者强调"你去别处买好，带过来"。跑腿、帮买、接送全靠它，给长辈记得换 드리다。', toriTipEn: '🐰 -아/어다 주다 = "do... for me (and bring it)", adding a sense of movement. "사다 줘" (buy and bring it to me) differs from "사 줘" (buy it for me) — the former emphasizes "go buy it elsewhere and bring it over." It\'s used for errands, buying things, pick-ups; switch to 드리다 for elders.',
  },

  // src: card-p19-l03
  {
    id: 'g150', title: '惊讶反问', titleEn: 'Surprised retort', pattern: '-다니(요)?',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示对意外之事的惊讶或难以置信"竟然…？"', usageEn: 'Expresses surprise or disbelief at something unexpected: "No way…?"',
    explanation: '接在陈述内容后，表示对听到的事感到意外、惊讶或难以置信，相当于"竟然…？、居然…！"。敬语加 요（-다니요），平语用 -다니。含强烈情绪，可以是惊喜也可以是错愕。名词用 (이)라니(요)。', explanationEn: 'Attached to a statement, it expresses surprise, shock, or disbelief at what you heard, like \'Really...?\' or \'No way...!\'. Add 요 for polite (-다니요), use -다니 for casual. It carries strong emotion, whether pleasant surprise or shock. For nouns, use (이)라니(요).',
    conjugation: '动词/形容词 + 다니(요)\n名词 + (이)라니(요)\n过去 + 았/었다니(요)', conjugationEn: 'Verb/Adjective + 다니(요)\\nNoun + (이)라니(요)\\nPast + 았/었다니(요)',
    examples: [
      { ko: '그 사람이 결혼했다니요? 정말요?', zh: '那个人竟然结婚了？真的吗？', zhEn: 'That person actually got married? Really?', note: '惊讶：竟然结婚了', noteEn: 'Surprise: Can\'t believe they got married' },
      { ko: '그게 사실이라니요? 믿기 어렵네요.', zh: '那竟然是真的？很难相信啊。', zhEn: 'That\'s actually true? Hard to believe.', note: '惊讶：竟然是真的', noteEn: 'Surprise: Can\'t believe it\'s true' },
      { ko: '이게 10만 원이라니요? 너무 비싸요!', zh: '这竟然要10万韩元？太贵了！', zhEn: 'This costs 100,000 won? Too expensive!', note: '惊讶：竟然这么贵', noteEn: 'Surprise: Can\'t believe it\'s this expensive' },
    ],
    similarPatterns: ['-다니', '-다면서요?'],
    difference: '-다니(요)? 表对意外之事的惊讶/难以置信（"결혼했다니요?"竟然结婚了？重在震惊）；-다면서요? 是就听说的传闻向对方求证（"결혼했다면서요?"听说你结婚了？重在确认）。前者惊讶，后者求证传闻。', differenceEn: '-다니(요)? expresses surprise/disbelief at something unexpected ("결혼했다니요?" You got married?!—focus on shock); -다면서요? is for confirming a rumor you heard ("결혼했다면서요?" I heard you got married?—focus on confirmation). The former is surprise, the latter is verifying hearsay.',
    toriTip: '🐰 -다니(요)? 是"竟然…？！"的震惊脸。"벌써 다 팔렸다니요?"（竟然全卖光了？）、"이게 무료라니!"（这竟然是免费的！）。惊喜惊吓都能用，情绪拉满，比平淡的"정말요?"戏剧性多了。', toriTipEn: '🐰 -다니(요)? is the shocked face of "No way…?!" "벌써 다 팔렸다니요?" (Already sold out?!), "이게 무료라니!" (This is free?!). Works for both pleasant and unpleasant surprises—full of drama, way more theatrical than a plain "정말요?"',
  },

  // src: card-p19-l03
  {
    id: 'g151', title: '当然肯定', titleEn: 'Of course, definitely', pattern: '-고말고(요)',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '어미',
    usage: '强烈肯定对方"当然…、那还用说"', usageEn: 'Strongly affirms the other person: "Of course…, needless to say"',
    explanation: '接在动词/形容词后，用于强烈肯定、爽快答应对方的话，相当于"当然…、那还用说"。表示毫无疑问、理所当然地同意。敬语加 요（-고말고요），平语用 -고말고。', explanationEn: 'Attached after verbs/adjectives, it strongly affirms or readily agrees with what someone said—like "Of course…, needless to say." It shows unquestionable, natural agreement. Add 요 for polite (-고말고요), use -고말고 for casual.',
    conjugation: '动词/形容词词干 + 고말고(요)\n名词谓语 + (이)고말고(요)\n（书写时 고말고 连写）', conjugationEn: 'Verb/Adjective stem + 고말고(요)\\nNoun predicate + (이)고말고(요)\\n(Write 고말고 as one word)',
    examples: [
      { ko: '같이 가요? — 가고말고요!', zh: '一起去吗？— 当然去！', zhEn: 'Want to go together?— Of course!', note: '当然：当然去', noteEn: 'Of course: Of course I\'ll go' },
      { ko: '맛있고말고요, 꼭 먹어 봐요!', zh: '当然好吃，一定要尝尝！', zhEn: 'Of course it\'s delicious, you have to try it!', note: '当然：当然好吃', noteEn: 'Of course: Of course it\'s delicious' },
      { ko: '도와드리고말고요, 제가 할게요!', zh: '当然帮您，我来做！', zhEn: 'Of course I\'ll help, I\'ll do it!', note: '当然：当然帮忙', noteEn: 'Of course: Of course I\'ll help' },
    ],
    similarPatterns: ['-지요', '당연하다'],
    difference: '-고말고요 是"当然、那还用说"的爽快强肯定（"가고말고요!"当然去！毫无疑问）；-지요? 是向对方求认同的确认（"가지요?"去吧？带疑问）。前者是斩钉截铁地答应，后者是征询。回应邀请/请求时用 -고말고요 显得爽快热情。', differenceEn: '-고말고요 is a quick, strong affirmation meaning "Of course, needless to say" ("가고말고요!" Of course I\'ll go!—no doubt); -지요? is seeking agreement or confirmation ("가지요?" Shall we go?—with a question). The former is a firm yes, the latter is a check. Use -고말고요 when responding to invitations/requests to sound enthusiastic and eager.',
    toriTip: '🐰 -고말고요 是"当然啦、必须的！"，答应得干脆利落。"도와줄 수 있어?" — "돕고말고!"（能帮忙吗？—当然！）。比"네"热情十倍，让对方感受到你的爽快。请客、答应帮忙时用它最加分。', toriTipEn: '🐰 -고말고요 means "Of course, absolutely!"—a crisp, no-nonsense yes. "도와줄 수 있어?" — "돕고말고!" (Can you help?— Of course!). It\'s ten times more enthusiastic than "네," showing your eagerness. Use it when treating someone or agreeing to help for extra points.',
  },

  // src: card-p19-l04
  {
    id: 'g152', title: '时间推移', titleEn: 'Time progression', pattern: '-아/어 오다 / -아/어 가다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '시제',
    usage: '表示动作/状态在时间上的持续（"一直…过来/下去"）', usageEn: 'Indicates an action/state continuing over time ("have been… / keep…ing")',
    explanation: '接在动词后，表示动作或状态沿时间轴的持续演变。-아/어 오다 表示"从过去持续到现在"（一直…过来），-아/어 가다 表示"从现在持续向未来"（继续…下去）。以现在为基准区分方向。', explanationEn: 'Attached after verbs, it shows an action or state evolving along a timeline. -아/어 오다 means "continuing from the past to now" (have been…), -아/어 가다 means "continuing from now into the future" (keep…ing). The present is the reference point for direction.',
    conjugation: '词干 + 아/어 오다（过去→现在：배워 오다）\n词干 + 아/어 가다（现在→未来：더워져 가다）\n元音 ㅏ/ㅗ → 아, 其他 → 어', conjugationEn: 'Stem + 아/어 오다 (past→present: 배워 오다)\\nStem + 아/어 가다 (present→future: 더워져 가다)\\nVowel ㅏ/ㅗ → 아, others → 어',
    examples: [
      { ko: '3년간 한국어를 배워 왔어요.', zh: '3年来一直在学韩语。', zhEn: 'I\'ve been learning Korean for 3 years.', note: '推移：过去持续到现在', noteEn: 'Transition: from the past to the present' },
      { ko: '지구가 점점 더워져 가고 있어요.', zh: '地球正在越来越变暖。', zhEn: 'The Earth is getting warmer and warmer.', note: '推移：持续向未来', noteEn: 'Transition: continuing into the future' },
      { ko: '꾸준히 운동해서 건강해져 왔어요.', zh: '坚持运动，一路健康起来了。', zhEn: 'By sticking with exercise, I\'ve gotten healthier along the way.', note: '推移：过去持续到现在', noteEn: 'Transition: from the past to the present' },
    ],
    similarPatterns: ['-고 있다', '-아/어지다'],
    difference: '-아/어 오다/가다 强调"沿时间轴的持续演变"，有方向性（오다＝过去到现在"배워 왔어요"一直学过来；가다＝现在到未来"더워져 가요"渐渐变暖下去）；-고 있다 只表当前进行；-아/어지다 表状态变化本身。오다/가다 特有"时间跨度上的推移感"。', differenceEn: '-아/어 오다/가다 emphasizes continuous change along a timeline with direction (오다 = past to present, like "배워 왔어요" meaning \'have been learning\'; 가다 = present to future, like "더워져 가요" meaning \'gradually getting warmer\'). -고 있다 only indicates an ongoing action; -아/어지다 expresses the state change itself. 오다/가다 uniquely convey a sense of progression across time.',
    toriTip: '🐰 -아/어 오다/가다 是时间轴上的方向感：오다＝一路走到现在（"살아 왔어요"一路生活过来），가다＝继续往后（"늙어 가요"渐渐变老）。回顾过去用 오다，展望未来用 가다，把时间的流动说出来了。', toriTipEn: '🐰 -아/어 오다/가다 gives a sense of direction on the timeline: 오다 = coming all the way to the present (like "살아 왔어요" meaning \'have lived through\'), 가다 = continuing onward (like "늙어 가요" meaning \'gradually aging\'). Use 오다 to look back at the past and 가다 to look ahead to the future, expressing the flow of time.',
  },

  // src: card-p19-l05
  {
    id: 'g153', title: '假装', titleEn: 'pretend', pattern: '-는/(으)ㄴ 척하다 / 체하다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"假装…、装作…"', usageEn: 'Means \'to pretend to...\' or \'to act as if...\'',
    explanation: '接在冠形词形后加 척하다 或 체하다（两者同义），表示假装做某动作或处于某状态，实则并非如此，相当于"假装…、装作…"。动词现在 -는 척하다，过去 -(으)ㄴ 척하다，形容词 -(으)ㄴ 척하다。', explanationEn: 'Attach 척하다 or 체하다 (both synonymous) after the adnominal form to indicate pretending to do an action or be in a state when it\'s not actually true, equivalent to \'pretend to...\' or \'act as if...\'. For verbs in the present tense use -는 척하다, past tense -(으)ㄴ 척하다, and for adjectives -(으)ㄴ 척하다.',
    conjugation: '动词现在 + 는 척하다/체하다 (자는 척하다)\n动词过去 + (으)ㄴ 척하다 (안 본 척하다)\n形容词 + (으)ㄴ 척하다 (괜찮은 척하다)', conjugationEn: 'Verb present + 는 척하다/체하다 (e.g., 자는 척하다)\\nVerb past + (으)ㄴ 척하다 (e.g., 안 본 척하다)\\nAdjective + (으)ㄴ 척하다 (e.g., 괜찮은 척하다)',
    examples: [
      { ko: '동생이 자는 척했어요.', zh: '弟弟假装在睡觉。', zhEn: 'My younger brother is pretending to sleep.', note: '假装：装睡', noteEn: 'Pretend: pretending to sleep' },
      { ko: '알면서도 모르는 체해요.', zh: '明明知道却假装不知道。', zhEn: 'He knows perfectly well but pretends not to.', note: '假装：装不知道', noteEn: 'Pretend: pretending not to know' },
      { ko: '괜찮은 척했지만 사실 많이 힘들었어요.', zh: '假装没事，但其实很难熬。', zhEn: 'Pretending to be fine, but it\'s really hard.', note: '假装：装没事', noteEn: 'Pretend: acting like nothing\'s wrong' },
    ],
    similarPatterns: ['-는 듯이', '-(으)ㄴ 것처럼'],
    difference: '-는 척하다/체하다 是"明知非真却假装如此"的行为（"자는 척해요"装睡——其实没睡）；-는 듯이/-(으)ㄴ 것처럼 是"像…一样"的比喻/方式（"자는 것처럼 조용해요"像睡着一样安静，不一定是假装）。척하다 强调"故意伪装"，처럼 只是比喻。', differenceEn: '-는 척하다/체하다 refers to deliberately pretending something is true when it isn\'t (e.g., "자는 척해요" meaning \'pretending to sleep\'—actually awake). -는 듯이/-(으)ㄴ 것처럼 is a simile or manner meaning \'like...\' (e.g., "자는 것처럼 조용해요" meaning \'quiet like sleeping\', not necessarily pretending). 척하다 emphasizes intentional pretense, while 처럼 is just a comparison.',
    toriTip: '🐰 -는 척하다（=체하다）= "假装…"，装样子专用。"못 들은 척했어"（假装没听见）、"바쁜 척하지 마"（别装忙）。척 和 체 完全一样，随便用。生活里的小心机全靠它描述。', toriTipEn: '🐰 -는 척하다 (=체하다) = \'to pretend...\', perfect for faking it. Like "못 들은 척했어" (pretended not to hear) or "바쁜 척하지 마" (don\'t pretend to be busy). 척 and 체 are exactly the same, so use either. It\'s the go-to for describing life\'s little acts.',
  },

  // =====================================================================
  //  批量提炼扩充 B6a（P20-P21，高级：列举/假设后悔）
  // =====================================================================

  // src: card-p20-l01
  {
    id: 'g154', title: '关于', titleEn: 'About', pattern: '에 대해(서) / 에 관해(서) / 에 관한',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '조사',
    usage: '表示"关于…、有关…"的话题对象', usageEn: 'Indicates the topic of discussion, thought, or writing, meaning \'about...\' or \'regarding...\'',
    explanation: '接在名词后，引出谈论、思考、书写的对象，相当于"关于…、有关…"。에 대해(서) 与 에 관해(서) 基本通用，에 관해 略书面。修饰名词时用定语形 에 대한/에 관한（关于…的+名词）。', explanationEn: 'Attach to a noun to introduce the subject of talking, thinking, or writing, equivalent to \'about...\' or \'regarding...\'. 에 대해(서) and 에 관해(서) are largely interchangeable, with 에 관해 being slightly more formal. When modifying a noun, use the attributive forms 에 대한/에 관한 (noun meaning \'about...\').',
    conjugation: '名词 + 에 대해(서) / 에 관해(서)（作状语）\n名词 + 에 대한 / 에 관한（作定语 + 名词）', conjugationEn: 'Noun + 에 대해(서) / 에 관해(서) (as adverbial)\\nNoun + 에 대한 / 에 관한 (as attributive + noun)',
    examples: [
      { ko: '환경에 관해서 보고서를 써야 해요.', zh: '得写一篇关于环境的报告。', zhEn: 'I have to write a report about the environment.', note: '关于：关于环境', noteEn: 'About: about the environment' },
      { ko: '요즘 건강에 대해 관심이 많아요.', zh: '最近对健康很感兴趣。', zhEn: 'I\'ve been really interested in health lately.', note: '关于：关于健康', noteEn: 'About: about health' },
      { ko: '역사에 관한 책을 많이 읽었어요.', zh: '读了很多关于历史的书。', zhEn: 'I\'ve read a lot of books about history.', note: '关于（定语）：关于历史的书', noteEn: 'About (attributive): a book about history' },
    ],
    similarPatterns: ['에 관한', '에 대한'],
    difference: '에 대해(서)/에 관해(서) 作状语引出话题（"환경에 대해 이야기해요"谈论环境）；修饰名词时必须变定语形 에 대한/에 관한（"환경에 대한 책"关于环境的书）。대해/관해 义近可换，관해 更书面。用错状语/定语形是常见错误。', differenceEn: '에 대해(서)/에 관해(서) as an adverbial introduces a topic (e.g., "환경에 대해 이야기해요" meaning \'talk about the environment\'); when modifying a noun, you must switch to the attributive forms 에 대한/에 관한 (e.g., "환경에 대한 책" meaning \'a book about the environment\'). 대해/관해 are similar and interchangeable, but 관해 is more formal. Mixing up adverbial and attributive forms is a common mistake.',
    toriTip: '🐰 에 대해(서) = "关于…"，讨论、写报告必备。"이 문제에 대해 어떻게 생각해요?"（你怎么看这个问题？）。要接名词记得换成 에 대한："사랑에 대한 노래"（关于爱的歌）——대해 后面跟动词，대한 后面跟名词。', toriTipEn: '🐰 에 대해(서) = \'about...\', essential for discussions and reports. Like "이 문제에 대해 어떻게 생각해요?" (What do you think about this issue?). When followed by a noun, switch to 에 대한: "사랑에 대한 노래" (a song about love)—대해 goes with verbs, 대한 with nouns.',
  },

  // src: card-p20-l02
  {
    id: 'g155', title: '包括在内', titleEn: 'Including', pattern: '을/를 비롯한 / 비롯해(서)',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"以…为首、包括…在内"', usageEn: 'Indicates \'led by...\' or \'including...\'',
    explanation: '由动词 비롯하다（起始、包括）演变而来，表示以某个代表性事物为首、连同其他一起，相当于"以…为首、包括…在内"。을/를 비롯한 修饰名词，을/를 비롯해(서) 作状语。常用于列举时突出典型代表。', explanationEn: 'Derived from the verb 비롯하다 (to start, to include), it means starting with a representative thing and including others along with it, equivalent to "led by..., including...". 을/를 비롯한 modifies nouns, while 을/를 비롯해(서) functions as an adverbial. Often used in lists to highlight a typical representative.',
    conjugation: '名词 + 을/를 비롯한 (+名词)\n名词 + 을/를 비롯해(서) (+句子)', conjugationEn: 'Noun + 을/를 비롯한 (+noun)\\nNoun + 을/를 비롯해(서) (+sentence)',
    examples: [
      { ko: 'BTS를 비롯한 K-POP 가수들이 유명해요.', zh: '以BTS为首的K-POP歌手们都很有名。', zhEn: 'K-POP singers, starting with BTS, are all famous.', note: '包括：以BTS为首', noteEn: 'Including: led by BTS' },
      { ko: '한국을 비롯해서 20개국이 참가했어요.', zh: '包括韩国在内，共20个国家参加了。', zhEn: 'A total of 20 countries participated, including Korea.', note: '包括：韩国在内', noteEn: 'Including: South Korea' },
      { ko: '서울을 비롯한 대도시의 집값이 올랐어요.', zh: '以首尔为首的大城市房价上涨了。', zhEn: 'Housing prices in major cities, led by Seoul, have risen.', note: '包括：以首尔为首', noteEn: 'Including: led by Seoul' },
    ],
    similarPatterns: ['을/를 포함해서', '만 해도'],
    difference: '을/를 비롯한/비롯해서 突出"以某代表为首、连同其他"（"서울을 비롯한 대도시"以首尔为代表的大城市），有"举出典型"的语感；单纯的 을/를 포함해서 只是"包含…"的中性列举。想强调"带头的那个"用 비롯하다。', differenceEn: '을/를 비롯한/비롯해서 emphasizes "led by a representative, along with others" (e.g., "서울을 비롯한 대도시" major cities including Seoul), giving a sense of "citing a typical example"; plain 을/를 포함해서 is just a neutral listing of "including...". Use 비롯하다 when you want to emphasize the leading one.',
    toriTip: '🐰 을/를 비롯한 = "以…为首、包括…"，列举时先抬出个代表。"교수님을 비롯한 여러 선생님"（以教授为首的各位老师）。书面感强，写文章、做报告时用它列举显得有条理。', toriTipEn: '🐰 을/를 비롯한 = "led by..., including...", bring up a representative first when listing. E.g., "교수님을 비롯한 여러 선생님" (various teachers led by the professor). It has a formal feel, good for writing essays or reports to make lists look organized.',
  },

  // src: card-p20-l02
  {
    id: 'g156', title: '光是就', titleEn: 'Just... alone', pattern: '만 해도',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"光是…就、单是…（举一例说明）"', usageEn: 'Means "just... alone, merely... (citing one example)"',
    explanation: '接在名词后，举出一个例子来说明情况已经足够充分或严重，相当于"光是…就、单是…而言"。常用于用一个典型例子佐证后面的判断。也用于 "…까지만 해도"（到…为止还…）表示某时间点的状态。', explanationEn: 'Attached after a noun, it cites one example to show that the situation is already sufficient or serious, equivalent to "just... alone, merely...". Often used to support a judgment with a typical example. Also used in "...까지만 해도" (up to... it was still...) to indicate a state at a certain point in time.',
    conjugation: '名词 + 만 해도\n时间点 + 까지만 해도（到…为止还…）', conjugationEn: 'Noun + 만 해도\\nTime point + 까지만 해도 (up to... it was still...)',
    examples: [
      { ko: '집세만 해도 너무 비싸요.', zh: '光是房租就太贵了。', zhEn: 'Just the rent alone is too expensive.', note: '光是就：光房租就贵', noteEn: 'Just... alone: Just rent alone is expensive' },
      { ko: '아까까지만 해도 괜찮았는데요.', zh: '刚才还好好的呢。', zhEn: 'It was fine just a moment ago.', note: '到…为止：刚才还好好的', noteEn: 'Up to...: It was fine just now' },
      { ko: '이것까지만 해도 이미 너무 많아요.', zh: '光是这些就已经太多了。', zhEn: 'Even just this is already too much.', note: '光是就：光这些就多', noteEn: 'Just... alone: Just these alone are a lot' },
    ],
    similarPatterns: ['만', '을/를 비롯해서'],
    difference: '만 해도 是"举一例佐证"（"집세만 해도 비싸요"光房租就贵——用房租一项说明整体贵）；单纯的 만 只是"仅仅、只"（"집세만 내요"只交房租）。만 해도 比 만 多了"举例说明、以点带面"的论证语感。', differenceEn: '만 해도 means "citing one example as evidence" (e.g., "집세만 해도 비싸요" just rent alone is expensive—using rent to show the overall cost); plain 만 just means "only, just" (e.g., "집세만 내요" I only pay rent). 만 해도 adds an argumentative nuance of "illustrating with an example, generalizing from a point" compared to 만.',
    toriTip: '🐰 만 해도 = "光是…就…"，举例佐证的口头禅。"작년만 해도 이렇지 않았어요"（光去年还不这样呢）、"나만 해도 그래"（光是我就这样）。想用一个例子说明普遍情况，它最顺口。', toriTipEn: '🐰 만 해도 = "just... alone...", a go-to phrase for citing examples. E.g., "작년만 해도 이렇지 않았어요" (just last year it wasn\'t like this), "나만 해도 그래" (just me alone is like that). When you want to use one example to illustrate a general situation, it\'s the most natural.',
  },

  // src: card-p20-l03
  {
    id: 'g157', title: '强调（连都）', titleEn: 'Emphasis (even)', pattern: '까지',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '조사',
    usage: '表示"连…都、甚至…"的强调', usageEn: 'Means emphasis of "even..., ...at all"',
    explanation: '까지 除了表"到…为止"（范围终点），还可接在名词后表示强调，指连意料之外的对象也包括在内，相当于"连…都、甚至…"。带有超出预期、令人意外的语气。', explanationEn: '까지, besides meaning "up to..." (endpoint of a range), can also attach to nouns to emphasize that even an unexpected object is included, equivalent to "even..., ...at all". It carries a tone of exceeding expectations and surprise.',
    conjugation: '名词 + 까지（强调义，不受收音影响）\n"이렇게까지 / 그렇게까지"表程度', conjugationEn: 'Noun + 까지 (emphatic, unaffected by final consonant)\\n"이렇게까지 / 그렇게까지" indicates degree',
    examples: [
      { ko: '친구까지 연락을 안 해요.', zh: '连朋友都不联系了。', zhEn: 'I don\'t even contact my friends anymore.', note: '强调：连朋友都不', noteEn: 'Emphasis: Even friends don\'t' },
      { ko: '선생님까지 와 주셨어요.', zh: '连老师都来了。', zhEn: 'Even the teacher came.', note: '强调：连老师都来', noteEn: 'Emphasis: Even the teacher came' },
      { ko: '이렇게까지 할 줄은 몰랐어요.', zh: '没想到会做到这种程度。', zhEn: 'I didn\'t expect it to go this far.', note: '强调程度：到这种程度', noteEn: 'Emphasis on degree: To this extent' },
    ],
    similarPatterns: ['도', '마저', '조차'],
    difference: '까지（强调义）表"连…都"，语气中性偏惊讶（"선생님까지 왔어요"连老师都来了）；마저/조차 也表"连…都"但更强调"最后的/连这个都"的极端、多含负面（"마지막 기회마저"连最后机会都）。까지 可褒可贬，마저/조차 多用于负面遗憾。', differenceEn: '까지 (emphatic) means "even...", with a neutral-to-surprised tone (e.g., "선생님까지 왔어요" even the teacher came); 마저/조차 also mean "even..." but emphasize the extreme of "the last/even this", often with a negative nuance (e.g., "마지막 기회마저" even the last chance). 까지 can be positive or negative, while 마저/조차 are mostly used for negative regret.',
    toriTip: '🐰 까지 有两副面孔：表范围"3시까지"（到3点），表强调"너까지?"（连你都？）。强调义带惊讶："이것까지 다 주세요?"（连这个都要给？）。语气比 도（也）更意外。', toriTipEn: '🐰 까지 has two faces: for range "3시까지" (until 3 o\'clock), for emphasis "너까지?" (even you?). The emphatic sense carries surprise: "이것까지 다 주세요?" (even this, you give it all?). Its tone is more surprising than 도 (also).',
  },

  // src: card-p20-l04
  {
    id: 'g158', title: '列举（之类）', titleEn: 'listing (and the like)', pattern: '(이)라든가 / (이)라든지',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '조사',
    usage: '表示"…啊…啊、…之类的"列举', usageEn: 'indicates listing of "...and...and, ...and the like"',
    explanation: '接在名词后，列举同类中的若干例子，相当于"…啊…啊、…之类的、或…或…"。(이)라든가 与 (이)라든지 通用，表示从多个例子中举出代表，暗示还有其他。也可接在句子后列举。', explanationEn: 'Attached after nouns, it lists several examples of the same kind, equivalent to "...and...and, ...and the like, or...or...". (이)라든가 and (이)라든지 are interchangeable, indicating representative examples from many, implying there are others. It can also be attached after sentences to list.',
    conjugation: '无收音名词 + 라든가/라든지\n有收音名词 + 이라든가/이라든지\n（常成对使用：A라든가 B라든가）', conjugationEn: 'Noun without final consonant + 라든가/라든지\\nNoun with final consonant + 이라든가/이라든지\\n(often used in pairs: A라든가 B라든가)',
    examples: [
      { ko: '취미가 영화라든가 음악이라든가 있어요.', zh: '兴趣有看电影啊听音乐之类的。', zhEn: 'My hobbies include watching movies, listening to music, and things like that.', note: '列举：电影啊音乐啊', noteEn: 'Listing: movies, music, and the like' },
      { ko: '시라든지 소설이라든지 즐겨 읽어요.', zh: '喜欢读诗啊小说之类的。', zhEn: 'I like reading poetry, novels, and things like that.', note: '列举：诗啊小说啊', noteEn: 'Listing: poems, novels, and the like' },
      { ko: '여행이라든가 새로운 취미라든가 시도해 봐요.', zh: '试试旅行啊新兴趣之类的吧。', zhEn: 'Try traveling, new hobbies, or something like that.', note: '列举：旅行啊新爱好啊', noteEn: 'Listing: travel, new hobbies, and the like' },
    ],
    similarPatterns: ['(이)나', '든지'],
    difference: '(이)라든가/라든지 是"列举同类例子（还有其他）"（"영화라든가 음악이라든가"电影啊音乐啊之类）；(이)나 是二选一的"或"（"커피나 차"咖啡或茶）；-든지（无 이라）表"无论"。라든가 侧重"举例列举、暗示不止这些"。', differenceEn: '(이)라든가/라든지 is for "listing similar examples (and others)" ("영화라든가 음악이라든가" movies, music, and the like); (이)나 is for "or" with a choice of two ("커피나 차" coffee or tea); -든지 (without 이라) means "regardless". 라든가 emphasizes "giving examples, implying there\'s more".',
    toriTip: '🐰 (이)라든가 = "…啊…啊之类的"，随口列举好几样。"주말엔 등산이라든가 영화라든가 해요"（周末爬爬山看看电影什么的）。成对用（A라든가 B라든가）最自然，透着"还有很多就不一一说了"的随意。', toriTipEn: '🐰 (이)라든가 = "...and...and the like," casually listing several things. "주말엔 등산이라든가 영화라든가 해요" (On weekends, I go hiking, watch movies, and stuff). Using it in pairs (A라든가 B라든가) is most natural, with a casual vibe of "there\'s more but I won\'t list them all."',
  },

  // src: card-p20-l04
  {
    id: 'g159', title: '连也（最后）', titleEn: 'even (the last)', pattern: '마저',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '조사',
    usage: '表示"连…也（最后剩的都）"，多含遗憾', usageEn: 'indicates "even... (including the last remaining)", often with regret',
    explanation: '接在名词后，表示连最后剩下的、最不该的对象也包括进来，相当于"连…也、连最后的…都"。带有"到了这个地步、连这个都…"的极端和遗憾语气，多用于负面情况。', explanationEn: 'Attached after nouns, it means including even the last remaining or the most unlikely object, equivalent to "even...". It carries an extreme and regretful tone of "at this point, even this...", often used in negative situations.',
    conjugation: '名词 + 마저（不受收音影响）', conjugationEn: 'Noun + 마저 (not affected by final consonant)',
    examples: [
      { ko: '친구마저 연락을 끊었어요.', zh: '连朋友都断联了。', zhEn: 'Even my friends lost contact.', note: '连也：连朋友都断联', noteEn: 'Even: even friends lost contact' },
      { ko: '일도 잃고 돈마저 없어졌어요.', zh: '工作也丢了，连钱也没了。', zhEn: 'I lost my job, and even money is gone.', note: '连也：连钱都没了', noteEn: 'Even: even the money is gone' },
      { ko: '마지막 기회마저 놓쳤어요.', zh: '连最后的机会都错过了。', zhEn: 'Even the last chance was missed.', note: '连也：连最后机会都错过', noteEn: 'Even: even the last chance was missed' },
    ],
    similarPatterns: ['까지', '조차', '도'],
    difference: '마저 强调"连最后剩下的都…"，带遗憾/极端（"친구마저 떠났어요"连朋友都走了——最后依靠也没了）；조차 强调"连最基本的都不…"（"인사조차 안 해요"连招呼都不打）；까지 语气较中性。마저 突出"最后一个也没了"的失落感。', differenceEn: '마저 emphasizes "even the last remaining...", with regret/extremity ("친구마저 떠났어요" even friends left—the last support is gone); 조차 emphasizes "even the most basic..." ("인사조차 안 해요" doesn\'t even greet); 까지 is more neutral. 마저 highlights the loss of "the last one is gone too."',
    toriTip: '🐰 마저 = "连…也（最后的都）"，透着走投无路的悲凉。"희망마저 사라졌어요"（连希望都消失了）、"너마저?"（连你也？——被最信任的人背叛时的经典台词）。语气比 까지 更绝望。', toriTipEn: '🐰 마저 = "even... (including the last)", with a sense of hopelessness. "희망마저 사라졌어요" (Even hope disappeared), "너마저?" (Even you?—the classic line when betrayed by the most trusted person). The tone is more desperate than 까지.',
  },

  // src: card-p20-l05
  {
    id: 'g160', title: '有时又', titleEn: 'sometimes and', pattern: '-는가 하면',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"有时…有时…、一方面…另一方面…"', usageEn: 'indicates "sometimes...sometimes..., on one hand...on the other..."',
    explanation: '接在动词/形容词后，列举两种对照或并存的情况，相当于"有时…有时…、说是…又…、一方面…另一方面…"。前后呈现同一对象的不同侧面或交替出现的状况。', explanationEn: 'Attached after verbs/adjectives, it lists two contrasting or coexisting situations, equivalent to "sometimes...sometimes..., on one hand...on the other...". It presents different aspects of the same subject or alternating states.',
    conjugation: '动词词干 + 는가 하면 (오는가 하면)\n形容词词干 + (으)ㄴ가 하면 (재미있는가 하면)\n名词 + 인가 하면', conjugationEn: 'Verb stem + 는가 하면 (오는가 하면)\\nAdjective stem + (으)ㄴ가 하면 (재미있는가 하면)\\nNoun + 인가 하면',
    examples: [
      { ko: '맑은가 하면 비가 오기도 해요.', zh: '有时晴，有时也会下雨。', zhEn: 'Sometimes sunny, sometimes rainy.', note: '有时又：时晴时雨', noteEn: 'Sometimes: sunny sometimes rainy' },
      { ko: '한국어가 재미있는가 하면 어렵기도 해요.', zh: '韩语一方面有趣，另一方面也难。', zhEn: 'Korean is fun on one hand, but hard on the other.', note: '一方面又：又有趣又难', noteEn: 'On one hand: fun but hard' },
      { ko: '그 사람은 친절한가 하면 무서운 면도 있어요.', zh: '那个人有亲切的一面，也有让人害怕的一面。', zhEn: 'That person has a kind side, but also a scary side.', note: '一方面又：又亲切又可怕', noteEn: 'On one hand: both kind and scary' },
    ],
    similarPatterns: ['-기도 하다', '-는 반면에'],
    difference: '-는가 하면 列举同一对象"这样又那样"的两面/交替（"맑은가 하면 비가 오기도"时晴时雨）；-는 반면에 是"与之相反"的明确对比（"쉬운 반면에 지루해요"简单但无聊）。前者是"兼有多面、交替出现"，后者是"正反对立"。', differenceEn: '-는가 하면 lists two sides/alternations of the same subject ("맑은가 하면 비가 오기도" sometimes sunny, sometimes rainy); -는 반면에 is a clear contrast of opposites ("쉬운 반면에 지루해요" easy but boring). The former means \'having multiple facets, alternating,\' the latter means \'direct opposition.\'',
    toriTip: '🐰 -는가 하면 = "有时…有时…、说是…又…"，描述一个东西的多面性。"어떤 날은 좋은가 하면 어떤 날은 힘들어요"（有的日子好，有的日子难）。展现事物复杂矛盾的一面时很有味道。', toriTipEn: '🐰 -는가 하면 = \'sometimes... sometimes..., on one hand... on the other...\' describes the multifaceted nature of something. "어떤 날은 좋은가 하면 어떤 날은 힘들어요" (Some days are good, some days are hard). It\'s great for showing the complex, contradictory side of things.',
  },

  // src: card-p20-l05
  {
    id: 'g161', title: '兼有', titleEn: 'also, both', pattern: '-기도 하다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"也…、又…（兼有某种情况）"', usageEn: 'Indicates \'also..., and... (having another situation as well)\'',
    explanation: '把动词/形容词用 -기 名词化后接 도 하다，表示除已知情况外，还兼有另一种情况或偶尔发生某事，相当于"也…、又…、有时也…"。常成对使用（A기도 하고 B기도 하다）表示两种情况并存。', explanationEn: 'After nominalizing a verb/adjective with -기 and adding 도 하다, it indicates that besides a known situation, there is also another situation or something happens occasionally, equivalent to \'also..., and..., sometimes...\'. Often used in pairs (A기도 하고 B기도 하다) to show two situations coexisting.',
    conjugation: '动词/形容词词干 + 기도 하다\n成对：-기도 하고 -기도 하다\n过去 + 기도 했다', conjugationEn: 'Verb/adjective stem + 기도 하다\\nIn pairs: -기도 하고 -기도 하다\\nPast: + 기도 했다',
    examples: [
      { ko: '기쁘기도 하고 슬프기도 해요.', zh: '既高兴又有些难过。', zhEn: 'Happy but a bit sad.', note: '兼有：又喜又悲', noteEn: 'Both: happy and sad' },
      { ko: '힘들기도 하지만 보람 있어요.', zh: '有时也辛苦，但很有成就感。', zhEn: 'Sometimes tough, but rewarding.', note: '兼有：也辛苦但值得', noteEn: 'Both: hard but worth it' },
      { ko: '맵기도 하고 맛있기도 해요.', zh: '既辣，也好吃。', zhEn: 'It\'s spicy, but also delicious.', note: '兼有：又辣又好吃', noteEn: 'Both: spicy and delicious' },
    ],
    similarPatterns: ['-는가 하면', '도'],
    difference: '-기도 하다 表"兼有/也发生某种情况"（"맵기도 하고 맛있기도 해요"又辣又好吃，两种并存）；单纯助词 도 是名词后的"也"（"저도 가요"我也去）。-기도 하다 用于谓语，表"动作/状态兼具或偶尔发生"，成对用最自然。', differenceEn: '-기도 하다 means \'also having/also happening\' ("맵기도 하고 맛있기도 해요" spicy and delicious, both coexist); the simple particle 도 is \'also\' after nouns ("저도 가요" I\'m going too). -기도 하다 is used with predicates to show actions/states coexisting or happening occasionally; using it in pairs sounds most natural.',
    toriTip: '🐰 -기도 하다 = "也…、又…"，表达复杂心情的利器。"좋기도 하고 아쉽기도 해요"（既开心又有点遗憾）。成对用（A기도 하고 B기도 하다）能把矛盾的感受说得很细腻，韩国人聊心情常这么说。', toriTipEn: '🐰 -기도 하다 = \'also..., and...\' — a great tool for expressing complex feelings. "좋기도 하고 아쉽기도 해요" (I\'m happy but also a bit regretful). Using it in pairs (A기도 하고 B기도 하다) lets you describe conflicting feelings delicately; Koreans often say this when talking about emotions.',
  },

  // src: card-p21-l02
  {
    id: 'g162', title: '后悔没做', titleEn: 'Regret not doing', pattern: '-(으)ㄹ 걸 그랬다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"当初该…就好了"（后悔没做）', usageEn: 'Indicates \'I should have... back then\' (regret for not doing)',
    explanation: '接在动词后，表示对过去没做某事的后悔，相当于"早知道就…了、当初该…的"。口语常缩略为 -(으)ㄹ걸（自言自语）。是表达"没做而懊悔"的典型句型。', explanationEn: 'Attached to verbs, it expresses regret for not doing something in the past, equivalent to \'I should have...\' or \'If only I had...\'. In speech, it\'s often shortened to -(으)ㄹ걸 (talking to oneself). It\'s the typical pattern for regretting something you didn\'t do.',
    conjugation: '无收音/ㄹ + ㄹ 걸 그랬다 (자다→잘 걸 그랬다)\n有收音 + 을 걸 그랬다 (먹다→먹을 걸 그랬다)\n口语缩略：-(으)ㄹ걸', conjugationEn: 'No final consonant/ㄹ + ㄹ 걸 그랬다 (자다→잘 걸 그랬다)\\nWith final consonant + 을 걸 그랬다 (먹다→먹을 걸 그랬다)\\nSpoken short form: -(으)ㄹ걸',
    examples: [
      { ko: '어제 일찍 잘 걸 그랬어요. 오늘 너무 피곤해요.', zh: '昨天要是早点睡就好了，今天太累了。', zhEn: 'I should have gone to bed earlier last night; I\'m so tired today.', note: '后悔没做：该早睡的', noteEn: 'Regret not doing: should have slept early' },
      { ko: '그 옷 세일할 때 살 걸 그랬어.', zh: '那件衣服打折的时候要是买了就好了。', zhEn: 'I should have bought that outfit when it was on sale.', note: '后悔没做：该买的', noteEn: 'Regret not doing: should have bought it' },
      { ko: '그때 전화할 걸 그랬어요.', zh: '当时要是打了电话就好了。', zhEn: 'I should have called back then.', note: '后悔没做：该打电话的', noteEn: 'Regret not doing: should have called' },
    ],
    similarPatterns: ['-지 말 걸 그랬다', '-았/었어야 했는데'],
    difference: '-(으)ㄹ 걸 그랬다 是后悔"没做某事"（"살 걸 그랬어"该买的——没买后悔）；-지 말 걸 그랬다 是后悔"做了某事"（"사지 말 걸 그랬어"不该买的——买了后悔）。一正一反：该做没做用前者，不该做做了用后者。', differenceEn: '-(으)ㄹ 걸 그랬다 is for regretting NOT doing something ("살 걸 그랬어" I should have bought it — regret for not buying); -지 말 걸 그랬다 is for regretting DOING something ("사지 말 걸 그랬어" I shouldn\'t have bought it — regret for buying). One positive, one negative: use the former for should-have-done-but-didn\'t, the latter for shouldn\'t-have-done-but-did.',
    toriTip: '🐰 -(으)ㄹ 걸 그랬다 = "早知道就…了"，后悔没做。口语常缩成"-ㄹ걸"自言自语："아, 살걸"（唉，该买的）。搭档是 -지 말걸（不该做的）。这对反义词是韩国人日常懊悔的标配。', toriTipEn: '🐰 -(으)ㄹ 걸 그랬다 = \'I should have...\' — regret for not doing. In speech, it\'s often shortened to \'-ㄹ걸\' when talking to yourself: "아, 살걸" (Ugh, I should\'ve bought it). Its counterpart is -지 말걸 (shouldn\'t have done). This pair is the standard for everyday Korean regret.',
  },

  // src: card-p21-l03
  {
    id: 'g163', title: '后悔做了', titleEn: 'Regret doing', pattern: '-지 말 걸 그랬다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"当初不该…的"（后悔做了）', usageEn: 'Indicates \'I shouldn\'t have... back then\' (regret for doing)',
    explanation: '由否定 -지 말다 加 -(으)ㄹ 걸 그랬다 构成，表示对过去做了某事的后悔，相当于"早知道就不…了、当初不该…的"。口语常缩略为 -지 말걸。是"做了而懊悔"的典型句型。', explanationEn: 'Formed by the negative -지 말다 plus -(으)ㄹ 걸 그랬다, it expresses regret for having done something in the past, equivalent to \'I shouldn\'t have...\' or \'If only I hadn\'t...\'. In speech, it\'s often shortened to -지 말걸. It\'s the typical pattern for regretting something you did.',
    conjugation: '动词词干 + 지 말 걸 그랬다\n口语缩略：-지 말걸', conjugationEn: 'Verb stem + 지 말 걸 그랬다\\nSpoken short form: -지 말걸',
    examples: [
      { ko: '아, 그렇게 많이 먹지 말 걸 그랬어요.', zh: '啊，当时不该吃那么多的。', zhEn: 'Ah, I shouldn\'t have eaten that much.', note: '后悔做了：不该吃那么多', noteEn: 'Regret doing: shouldn\'t have eaten so much' },
      { ko: '어제 새벽까지 폰 보지 말 걸 그랬어요.', zh: '昨天不该看手机看到凌晨的。', zhEn: 'I shouldn\'t have been on my phone until dawn yesterday.', note: '后悔做了：不该熬夜看手机', noteEn: 'Regret doing: shouldn\'t have stayed up looking at my phone' },
      { ko: '그때 화내지 말 걸 그랬어요. 지금 후회돼요.', zh: '当时不该发火的，现在很后悔。', zhEn: 'I shouldn\'t have lost my temper then; I regret it now.', note: '后悔做了：不该发火', noteEn: 'Regretting it: shouldn\'t have lost my temper' },
    ],
    similarPatterns: ['-(으)ㄹ 걸 그랬다', '-았/었어야 했는데'],
    difference: '-지 말 걸 그랬다 后悔"做了不该做的"（"먹지 말 걸"不该吃的——吃了后悔）；-(으)ㄹ 걸 그랬다 后悔"没做该做的"（"먹을 걸"该吃的——没吃后悔）。做错了用 -지 말 걸，漏做了用 -(으)ㄹ 걸。', differenceEn: '-지 말 걸 그랬다 regrets "doing something you shouldn\'t have" ("먹지 말 걸" shouldn\'t have eaten—ate and regretted); -(으)ㄹ 걸 그랬다 regrets "not doing something you should have" ("먹을 걸" should have eaten—didn\'t and regretted). Use -지 말 걸 for doing wrong, -(으)ㄹ 걸 for missing out.',
    toriTip: '🐰 -지 말 걸 그랬다 = "不该…的"，做了坏事后拍大腿。"괜히 말하지 말걸"（不该多嘴的）、"먹지 말걸"（不该吃的）。和 -ㄹ걸（该做没做）配成一对，后悔的两个方向全齐了。', toriTipEn: '🐰 -지 말 걸 그랬다 = "shouldn\'t have..." — slapping your thigh after doing something bad. "괜히 말하지 말걸" (shouldn\'t have said that), "먹지 말걸" (shouldn\'t have eaten that). Paired with -ㄹ걸 (should have but didn\'t), covering both directions of regret.',
  },

  // src: card-p21-l04
  {
    id: 'g164', title: '本该却没', titleEn: 'Should have but didn\'t', pattern: '-았/었어야 했는데',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"本该…却没（做到）"', usageEn: 'Expresses "should have... but didn\'t (do it)"',
    explanation: '表示过去本应该做某事却没能做到的懊悔与义务感，相当于"本该…的（却没）"。兼含"应该"的义务和"没做到"的遗憾，语气比单纯后悔更强调"当时有责任/必要"。后常接说明未做到的原因或结果。', explanationEn: 'Expresses regret and a sense of obligation for not having done something in the past, equivalent to "should have... (but didn\'t)." It combines the duty of "should" with the regret of "not doing," emphasizing "responsibility/necessity at the time" more than simple regret. Often followed by the reason or result of not doing it.',
    conjugation: '动词词干 + 았/었어야 했는데\n元音 ㅏ/ㅗ → 았어야 (자다→잤어야 했는데)\n其他 → 었어야 (먹다→먹었어야 했는데)\n하다 → 했어야 했는데', conjugationEn: 'Verb stem + 았/었어야 했는데\\nVowel ㅏ/ㅗ → 았어야 (자다→잤어야 했는데)\\nOther → 었어야 (먹다→먹었어야 했는데)\\n하다 → 했어야 했는데',
    examples: [
      { ko: '어제 일찍 잤어야 했는데 게임하다가 못 잤어요.', zh: '昨天本该早睡，玩游戏没睡成。', zhEn: 'I should have gone to bed early last night, but I played games instead.', note: '本该却没：该早睡没睡', noteEn: 'Should have but didn\'t: should have slept early but didn\'t' },
      { ko: '내가 그때 사과했어야 했는데 그러지 못했어요.', zh: '当时本该我道歉，我没做到。', zhEn: 'I should have apologized then, but I didn\'t.', note: '本该却没：该道歉没道', noteEn: 'Should have but didn\'t: should have apologized but didn\'t' },
      { ko: '엄마한테 전화했어야 했는데 깜빡했어요.', zh: '本该给妈妈打电话，忘了。', zhEn: 'I should have called Mom, but I forgot.', note: '本该却没：该打电话忘了', noteEn: 'Should have but didn\'t: should have called but forgot' },
    ],
    similarPatterns: ['-(으)ㄹ 걸 그랬다', '-았/었으면 좋았을 텐데'],
    difference: '-았/었어야 했는데 强调"本有责任/必要做却没做到"（"사과했어야 했는데"本该道歉的——带义务感的懊悔）；-(으)ㄹ 걸 그랬다 只是单纯"早知道该…"的后悔（无强义务感）。前者责任感更重，后者更像随口的懊悔。', differenceEn: '-았/었어야 했는데 emphasizes "had a responsibility/necessity to do but didn\'t" ("사과했어야 했는데" should have apologized—regret with a sense of duty); -(으)ㄹ 걸 그랬다 is just simple "should have known to..." regret (no strong obligation). The former carries more responsibility, the latter feels more like casual regret.',
    toriTip: '🐰 -았/었어야 했는데 = "本该…的（却没做到）"，带着自责和义务感。"공부했어야 했는데"（本该学习的）比"공부할 걸"更沉重，透着"这是我的责任却搞砸了"。后面常接没做到的原因。', toriTipEn: '🐰 -았/었어야 했는데 = "should have... (but didn\'t)" — with self-blame and a sense of duty. "공부했어야 했는데" (should have studied) feels heavier than "공부할 걸," carrying "it was my responsibility but I messed up." Often followed by the reason for not doing it.',
  },

  // src: card-p21-l05
  {
    id: 'g165', title: '要是就好了', titleEn: 'If only it had...', pattern: '-았/었으면 좋았을 텐데',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"要是…就好了（可惜没）"的遗憾', usageEn: 'Expresses regret of "if only... it would have been good (but it wasn\'t)"',
    explanation: '对过去未实现的事表达遗憾的假设，相当于"要是当初…就好了（可惜没）"。由反事实条件 -았/었으면 加 좋았을 텐데（就好了）构成，是对已成定局的过去表达"如果当时…该多好"的惋惜。', explanationEn: 'A hypothetical expressing regret over something unfulfilled in the past, equivalent to "if only... it would have been good (but it wasn\'t)." Formed by the counterfactual condition -았/었으면 plus 좋았을 텐데 (would have been good), expressing wistfulness over a settled past: "if only it had been..."',
    conjugation: '动词/形容词词干 + 았/었으면 좋았을 텐데\n（-았/었으면：反事实条件 + 좋았을 텐데：可惜的结果）', conjugationEn: 'Verb/adjective stem + 았/었으면 좋았을 텐데\\n(-았/었으면: counterfactual condition + 좋았을 텐데: regrettable result)',
    examples: [
      { ko: '어제 날씨가 좋았으면 좋았을 텐데요.', zh: '昨天天气要是好点就好了。', zhEn: 'I wish the weather had been better yesterday.', note: '遗憾：天气好就好了', noteEn: 'Regret: if only the weather had been nice' },
      { ko: '시험이 조금만 쉬웠으면 좋았을 텐데.', zh: '考试要是稍微简单点就好了。', zhEn: 'It would have been nice if the exam had been a bit easier.', note: '遗憾：简单点就好了', noteEn: 'Regret: if only it had been simpler' },
      { ko: '시간이 좀 더 있었으면 좋았을 텐데요.', zh: '要是再多点时间就好了。', zhEn: 'I wish I\'d had more time.', note: '遗憾：多点时间就好了', noteEn: 'Regret: if only there had been more time' },
    ],
    similarPatterns: ['-았/었더라면', '-(으)면 좋겠다'],
    difference: '-았/었으면 좋았을 텐데 是对"过去未实现"的遗憾（"쉬웠으면 좋았을 텐데"要是简单点就好了——已考完，可惜难）；-(으)면 좋겠다 是对"未来/现在"的愿望（"쉬우면 좋겠어요"希望简单点——还没发生）。前者惋惜过去，后者期盼未来。', differenceEn: '-았/었으면 좋았을 텐데 is regret over "unfulfilled past" ("쉬웠으면 좋았을 텐데" if only it had been simpler—already took the test, too bad it was hard); -(으)면 좋겠다 is a wish for "future/present" ("쉬우면 좋겠어요" hope it\'s simple—hasn\'t happened yet). The former laments the past, the latter hopes for the future.',
    toriTip: '🐰 -았/었으면 좋았을 텐데 = "要是当初…就好了"，对过去的惋惜。"조금만 더 일찍 왔으면 좋았을 텐데"（要是再早点来就好了）。全是"过去时"因为事已成定局。想表达"未来的愿望"要用 -(으)면 좋겠다。', toriTipEn: '🐰 -았/었으면 좋았을 텐데 = "if only... back then" — lamenting the past. "조금만 더 일찍 왔으면 좋았을 텐데" (if only I had come a bit earlier). All "past tense" because it\'s already settled. For "future wishes," use -(으)면 좋겠다.',
  },

  // src: card-p21-l08
  {
    id: 'g166', title: '反事实让步', titleEn: 'Counterfactual concession', pattern: '-았/었어도',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"即使当初…了，也（不会改变）"', usageEn: 'Expresses "even if... had happened then, (it wouldn\'t change)"',
    explanation: '接在动词/形容词后，对过去做反事实的让步假设，表示即使当时那样做了，结果也不会改变，相当于"即使当初…了也…"。前句是与事实相反的假设，后句常接 -았/었을 거예요（也会…的）表示结果照旧。', explanationEn: 'Attached to verbs/adjectives, it makes a counterfactual concessive assumption about the past, meaning even if that had been done then, the result wouldn\'t change, equivalent to "even if... had..." The first clause is a counterfactual hypothesis, and the second often uses -았/었을 거예요 (would have...) to show the result stays the same.',
    conjugation: '词干 + 았/었어도\n元音 ㅏ/ㅗ → 았어도 (가다→갔어도)\n其他 → 었어도 (먹다→먹었어도)\n하다 → 했어도', conjugationEn: 'Stem + 았/었어도\\nVowel ㅏ/ㅗ → 았어도 (가다→갔어도)\\nOther → 었어도 (먹다→먹었어도)\\n하다 → 했어도',
    examples: [
      { ko: '전화했어도 못 받았을 거예요. 회의 중이었대요.', zh: '就算打了电话也接不到，他说在开会。', zhEn: 'Even if I called, he wouldn\'t have answered; he said he was in a meeting.', note: '反事实让步：打了也接不到', noteEn: 'Counterfactual concession: Even if you called, they wouldn\'t pick up' },
      { ko: '병원에 갔어도 결과는 같았을 거예요.', zh: '就算去了医院结果也一样。', zhEn: 'Even if I went to the hospital, the result would be the same.', note: '反事实让步：去了也一样', noteEn: 'Counterfactual concession: Even if you went, it\'d be the same' },
      { ko: '돈이 있었어도 못 샀을 거예요. 이미 다 팔렸어요.', zh: '就算有钱也买不了，已经卖光了。', zhEn: 'Even if you had the money, you couldn\'t buy it—it\'s already sold out.', note: '反事实让步：有钱也买不了', noteEn: 'Counterfactual concession: Even with money, you couldn\'t buy it' },
    ],
    similarPatterns: ['-았/었더라면', '-아/어도'],
    difference: '-았/었어도 是"对过去的反事实让步"（"갔어도 같았을 거예요"就算去了也一样——实际没去，且去了也没用）；-았/었더라면 是"反事实假设+不同结果"（"갔더라면 달랐을 텐데"要是去了就不一样了——惋惜）。어도说"去了也白搭"，더라면说"去了就好了"，结果导向相反。', differenceEn: '-았/었어도 is a "counterfactual concession about the past" ("갔어도 같았을 거예요" even if I went, it\'d be the same—didn\'t actually go, and going wouldn\'t have helped); -았/었더라면 is a "counterfactual hypothesis + different outcome" ("갔더라면 달랐을 텐데" if I\'d gone, it\'d have been different—regret). 어도 says "going was pointless," 더라면 says "going would\'ve been good," with opposite outcome orientations.',
    toriTip: '🐰 -았/었어도 = "就算当初…了也…"，表示做了也没用。"공부했어도 떨어졌을 거야"（就算学了也会落榜的）——一种认命的宽慰。注意和 -았더라면（要是…就好了，暗示会更好）方向相反，一个说白搭一个说可惜。', toriTipEn: '🐰 -았/었어도 = "Even if I had…, …" meaning doing it wouldn\'t have helped. "공부했어도 떨어졌을 거야" (Even if I\'d studied, I\'d have failed)—a resigned comfort. Note it\'s the opposite of -았더라면 (if only…, implying it\'d have been better); one says pointless, the other says regrettable.',
  },

  // =====================================================================
  //  批量提炼扩充 B6b（P22-P23，高级：担忧推测规律/连接对比）
  // =====================================================================

  // src: card-p22-l01
  {
    id: 'g167', title: '担心', titleEn: 'worry', pattern: '-(으)ㄹ까 봐',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"生怕…、担心会…（所以…）"', usageEn: 'Expresses "fearing…, worried that… (so…)"',
    explanation: '接在动词/形容词后，表示担心某种（多为不希望的）情况发生，因而采取后句的行动或产生某种心理，相当于"生怕…、担心会…"。后句常是为防范该情况而做的事。也可用 -(으)ㄹ까 봐(서)。', explanationEn: 'Attached after verbs/adjectives, it expresses worry that something (usually undesirable) might happen, leading to the action or feeling in the following clause—equivalent to "fearing…, worried that…." The following clause is often a precaution taken against it. -(으)ㄹ까 봐(서) is also possible.',
    conjugation: '无收音/ㄹ + ㄹ까 봐 (오다→올까 봐)\n有收音 + 을까 봐 (늦다→늦을까 봐)\n过去担心 + 았/었을까 봐', conjugationEn: 'No batchim/ㄹ + ㄹ까 봐 (오다→올까 봐)\\nWith batchim + 을까 봐 (늦다→늦을까 봐)\\nPast worry + 았/었을까 봐',
    examples: [
      { ko: '비가 올까 봐 우산 챙겼어요.', zh: '怕下雨带了伞。', zhEn: 'Brought an umbrella in case it rains.', note: '担心：怕下雨', noteEn: 'Worry: afraid it\'ll rain' },
      { ko: '늦을까 봐 택시 탔어요.', zh: '怕迟到打了车。', zhEn: 'Took a taxi, afraid of being late.', note: '担心：怕迟到', noteEn: 'Worry: afraid of being late' },
      { ko: '시험에 떨어질까 봐 잠을 못 잤어요.', zh: '担心考试不及格，没睡好。', zhEn: 'Worried about failing the exam, didn\'t sleep well.', note: '担心：怕落榜', noteEn: 'Worry: afraid of failing' },
    ],
    similarPatterns: ['-(으)ㄹ까 봐서', '-(으)ㄹ지도 모르다'],
    difference: '-(으)ㄹ까 봐 是"担心某事发生（而采取措施）"，含忧虑情绪+后续行动（"늦을까 봐 뛰었어요"怕迟到就跑了）；-(으)ㄹ지도 모르다 是中性推测"说不定会"（"늦을지도 몰라요"说不定会迟到，无忧虑行动）。前者担忧+应对，后者单纯推测。', differenceEn: '-(으)ㄹ까 봐 is "worrying something will happen (and taking measures)" with anxiety + follow-up action ("늦을까 봐 뛰었어요" ran because I was afraid of being late); -(으)ㄹ지도 모르다 is a neutral guess "might" ("늦을지도 몰라요" might be late, no anxious action). The former is worry + response, the latter is pure speculation.',
    toriTip: '🐰 -(으)ㄹ까 봐 = "生怕…（所以…）"，操心时的口头禅。"걱정할까 봐 말 안 했어"（怕你担心就没说）、"까먹을까 봐 메모했어요"（怕忘了记了下来）。后面往往跟着为此做的应对措施。', toriTipEn: '🐰 -(으)ㄹ까 봐 = "Fearing… (so…)" — a go-to phrase when you\'re worried. "걱정할까 봐 말 안 했어" (Didn\'t tell you because I was afraid you\'d worry), "까먹을까 봐 메모했어요" (Jotted it down in case I forgot). It\'s usually followed by the precaution you took.',
  },

  // src: card-p22-l02
  {
    id: 'g168', title: '说不定', titleEn: 'Maybe', pattern: '-(으)ㄹ지도 모르다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"说不定…、也许…（有这种可能）"', usageEn: 'Expresses "might…, perhaps… (there\'s a chance)"',
    explanation: '接在动词/形容词后，表示对某种可能性的推测，相当于"说不定…、也许…、有可能…"。确定性较低，提示一种不能排除的可能。名词用 (이)ㄹ지도 모르다。', explanationEn: 'Attached after verbs/adjectives, it expresses speculation about a possibility—equivalent to "might…, perhaps…, could be…." Certainty is low, hinting at a possibility that can\'t be ruled out. For nouns, use (이)ㄹ지도 모르다.',
    conjugation: '无收音/ㄹ + ㄹ지도 모르다 (오다→올지도 모르다)\n有收音 + 을지도 모르다 (어렵다→어려울지도 모르다)\n名词 + 일지도 모르다\n过去 + 았/었을지도 모르다', conjugationEn: 'No batchim/ㄹ + ㄹ지도 모르다 (오다→올지도 모르다)\\nWith batchim + 을지도 모르다 (어렵다→어려울지도 모르다)\\nNoun + 일지도 모르다\\nPast + 았/었을지도 모르다',
    examples: [
      { ko: '오늘 비가 올지도 몰라요. 우산 챙기세요.', zh: '今天说不定会下雨，带把伞。', zhEn: 'It might rain today, bring an umbrella.', note: '说不定：可能下雨', noteEn: 'Might: it could rain' },
      { ko: '이번 시험은 어려울지도 몰라요.', zh: '这次考试说不定会难。', zhEn: 'This exam might be hard.', note: '说不定：可能难', noteEn: 'Might: it could be hard' },
      { ko: '저 사람 유명인일지도 몰라요.', zh: '那个人说不定是名人。', zhEn: 'That person might be a celebrity.', note: '说不定：可能是名人', noteEn: 'Might: could be a celebrity' },
    ],
    similarPatterns: ['-(으)ㄹ 것 같다', '-(으)ㄹ까 봐'],
    difference: '-(으)ㄹ지도 모르다 是"说不定、有此可能"的低确定性推测（"올지도 몰라요"说不定会来，纯推测）；-(으)ㄹ 것 같다 是较有根据的推测（"올 것 같아요"好像会来）。-(으)ㄹ지도 모르다 确定性最低，强调"不能排除这种可能"。', differenceEn: '-(으)ㄹ지도 모르다 is a low-certainty guess of "might, could be" ("올지도 몰라요" might come, pure speculation); -(으)ㄹ 것 같다 is a more grounded guess ("올 것 같아요" seems like it\'ll come). -(으)ㄹ지도 모르다 has the lowest certainty, emphasizing "can\'t rule it out."',
    toriTip: '🐰 -(으)ㄹ지도 몰라요 = "说不定…哦"，给可能性留个口子。"안 올지도 몰라"（说不定不来哦）。语气比"올 것 같아"更不确定，是提醒对方"有这个可能，做好准备"时的贴心说法。', toriTipEn: '🐰 -(으)ㄹ지도 몰라요 = "Might… you know" — leaving room for possibility. "안 올지도 몰라" (Might not come). It\'s more uncertain than "올 것 같아," a thoughtful way to warn someone "it\'s possible, so be ready."',
  },

  // src: card-p22-l03
  {
    id: 'g169', title: '不可能', titleEn: 'Impossible', pattern: '-(으)ㄹ 리가 없다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"不可能…、不会…（强烈否定推测）"', usageEn: 'Expresses "can\'t be…, won\'t… (strongly negating a guess)"',
    explanation: '接在动词/形容词后，表示说话人根据常理判断某事绝无可能，相当于"不可能…、不会…"。리 是表"道理、可能性"的依存名词。反问形 -(으)ㄹ 리가 있어요? 表示"怎么可能…？"。', explanationEn: 'Attached after verbs/adjectives, it expresses the speaker\'s judgment based on common sense that something is absolutely impossible—equivalent to "can\'t be…, no way…." 리 is a dependent noun meaning "reason, possibility." The rhetorical form -(으)ㄹ 리가 있어요? means "How could…?"',
    conjugation: '无收音/ㄹ + ㄹ 리가 없다 (하다→할 리가 없다)\n有收音 + 을 리가 없다 (있다→있을 리가 없다)\n名词 + 일 리가 없다\n过去 + 았/었을 리가 없다', conjugationEn: 'No batchim/ㄹ + ㄹ 리가 없다 (하다→할 리가 없다)\\nWith batchim + 을 리가 없다 (있다→있을 리가 없다)\\nNoun + 일 리가 없다\\nPast + 았/었을 리가 없다',
    examples: [
      { ko: '그 사람이 거짓말할 리가 없어요.', zh: '那个人不可能说谎。', zhEn: 'That person can\'t be lying.', note: '不可能：不可能说谎', noteEn: 'Impossible: can\'t be lying' },
      { ko: '그게 사실일 리가 있어요? 말도 안 돼요.', zh: '那怎么可能是真的？岂有此理。', zhEn: 'How could that possibly be true? That\'s absurd.', note: '反问：怎么可能是真的', noteEn: 'Rhetorical question: How could that be true?' },
      { ko: '민수 씨가 그걸 모를 리가 없어요.', zh: '敏秀不可能不知道那个。', zhEn: 'Min-su can\'t possibly not know that.', note: '不可能：不可能不知道', noteEn: 'Impossible: There\'s no way (he/she) doesn\'t know.' },
    ],
    similarPatterns: ['-(으)ㄹ 게 틀림없다', '-(으)ㄹ지도 모르다'],
    difference: '-(으)ㄹ 리가 없다 是"根据常理绝无可能"的强否定推测（"거짓말할 리가 없어요"不可能说谎）；-(으)ㄹ 게 틀림없다 是"一定是"的强肯定推测（"거짓말인 게 틀림없어요"肯定是谎话）。一否一肯，都是高确定性判断，方向相反。', differenceEn: '-(으)ㄹ 리가 없다 is a strong negative assumption meaning "absolutely impossible based on common sense" (e.g., 거짓말할 리가 없어요 — "There\'s no way (he/she) is lying"). -(으)ㄹ 게 틀림없다 means "must be" — a strong positive assumption (e.g., 거짓말인 게 틀림없어요 — "It must be a lie"). One negative, one positive, both high-certainty judgments in opposite directions.',
    toriTip: '🐰 -(으)ㄹ 리가 없다 = "不可能…、哪能…"，笃定地否定。"그럴 리가 없어요"（不可能这样）是韩剧里震惊时的高频台词。反问版"그럴 리가 있어요?"（哪能这样？）语气更强。', toriTipEn: '🐰 -(으)ㄹ 리가 없다 = "There\'s no way…" — a firm denial. "그럴 리가 없어요" (That can\'t be) is a classic line in K-dramas when characters are shocked. The rhetorical version "그럴 리가 있어요?" (How could that be?) is even stronger.',
  },

  // src: card-p22-l05
  {
    id: 'g170', title: '容易（招致）', titleEn: 'Prone to (causing)', pattern: '-기 십상이다',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"很容易…、动辄…（多为负面结果）"', usageEn: 'Means "easily…, often… (usually with negative results)"',
    explanation: '接在动词后，表示在某种情况下很容易导致（多为不好的）结果，相当于"很容易…、十有八九会…、动辄…"。带有警示语气，后接的结果几乎都是负面的。', explanationEn: 'Attached after a verb, it indicates that a certain situation easily leads to (mostly bad) results, equivalent to "easily…, nine times out of ten…, often…". It carries a warning tone, and the results that follow are almost always negative.',
    conjugation: '动词词干 + 기 십상이다', conjugationEn: 'Verb stem + 기 십상이다',
    examples: [
      { ko: '눈길에서 뛰면 넘어지기 십상이에요.', zh: '雪地里跑很容易摔倒。', zhEn: 'Running in the snow is likely to make you slip.', note: '容易：容易摔倒', noteEn: 'Prone to: Prone to falling' },
      { ko: '급하게 먹으면 체하기 십상이에요.', zh: '吃太急很容易吃坏肚子。', zhEn: 'Eating too fast easily upsets your stomach.', note: '容易：容易积食', noteEn: 'Prone to: Prone to indigestion' },
      { ko: '충동적으로 쇼핑하면 후회하기 십상이에요.', zh: '冲动购物很容易后悔。', zhEn: 'Impulse buying is likely to lead to regret.', note: '容易：容易后悔', noteEn: 'Prone to: Prone to regret' },
    ],
    similarPatterns: ['-기 쉽다', '-기 마련이다'],
    difference: '-기 십상이다 强调"很容易招致（负面）结果"，带警示（"넘어지기 십상이에요"很容易摔——提醒别这么做）；-기 쉽다 中性表"容易"（可正可负）；-기 마련이다 是"必然规律"（g71，"실수하기 마련이에요"难免出错）。십상이다 特有"这么做多半会出坏事"的告诫味。', differenceEn: '-기 십상이다 emphasizes "easily leading to (negative) results" with a warning (e.g., 넘어지기 십상이에요 — "You\'ll easily fall" — a heads-up not to do it). -기 쉽다 is neutral for "easy" (can be positive or negative). -기 마련이다 is about "inevitable patterns" (g71, e.g., 실수하기 마련이에요 — "Mistakes are bound to happen"). 십상이다 has a unique cautionary flavor of "doing this will likely end badly."',
    toriTip: '🐰 -기 십상이다 = "很容易…（出坏事）"，长辈劝诫时爱用。"밤에 폰 보면 잠 못 자기 십상이야"（晚上看手机很容易失眠哦）。后面永远接不好的结果，是"我提醒你哦"的告诫语气。', toriTipEn: '🐰 -기 십상이다 = "Easily… (something bad)" — a favorite of elders giving advice. E.g., 밤에 폰 보면 잠 못 자기 십상이야 (Looking at your phone at night will easily keep you up). It always precedes a bad outcome, with a "just so you know" cautionary tone.',
  },

  // src: card-p22-l06
  {
    id: 'g171', title: '道理规律', titleEn: 'principle/rule', pattern: '-는 법이다 / -는 법이 없다',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"按理…、本来就…"或"从不…"', usageEn: 'Means "as a rule…, naturally…" or "never…"',
    explanation: '接在动词后，-는 법이다 表示某事符合道理、本该如此（"按理…、本来就…"），-는 법이 없다 表示某种情况从不发生（"从不…、绝不…"）。法 是表"道理、规律"的依存名词，强调符合常理或习性。', explanationEn: 'Attached after a verb, -는 법이다 means something is in line with reason or is only natural ("as a rule…, naturally…"), while -는 법이 없다 means a situation never happens ("never…, absolutely not…"). 법 is a dependent noun meaning "principle, rule," emphasizing what fits common sense or habit.',
    conjugation: '动词词干 + 는 법이다 (받다→받는 법이다)\n动词词干 + 는 법이 없다 (화내다→화내는 법이 없다)\n形容词 + (으)ㄴ 법이다', conjugationEn: 'Verb stem + 는 법이다 (받다→받는 법이다)\\nVerb stem + 는 법이 없다 (화내다→화내는 법이 없다)\\nAdjective + (으)ㄴ 법이다',
    examples: [
      { ko: '잘못하면 벌을 받는 법이에요.', zh: '做错了自然要受罚。', zhEn: 'If you do wrong, you naturally get punished.', note: '道理：按理该受罚', noteEn: 'As a rule: As a rule, (you) deserve punishment' },
      { ko: '그 사람은 화내는 법이 없어요.', zh: '那个人从不发火。', zhEn: 'That person never gets angry.', note: '从不：从不发火', noteEn: 'Never: Never gets angry' },
      { ko: '민수 씨는 지각하는 법이 없어요.', zh: '敏秀从不迟到。', zhEn: 'Min-su is never late.', note: '从不：从不迟到', noteEn: 'Never: Never late' },
    ],
    similarPatterns: ['-기 마련이다', '-는 것이다'],
    difference: '-는 법이다 强调"符合道理、本该如此"（"벌을 받는 법이다"按理该受罚，含应然）；-기 마련이다 强调"必然发生的规律"（g71，"실수하기 마련이다"难免出错，含不可避免）。两者义近，법이다 偏"道理上应当"，마련이다 偏"客观必然"。-는 법이 없다 则表"从不"。', differenceEn: '-는 법이다 emphasizes "fitting reason, being as it should" (e.g., 벌을 받는 법이다 — "As a rule, you get punished," with a sense of ought). -기 마련이다 emphasizes "an inevitable pattern" (g71, e.g., 실수하기 마련이다 — "Mistakes are bound to happen," with a sense of unavoidability). They\'re similar, but 법이다 leans toward "morally/rationally should," while 마련이다 leans toward "objectively inevitable." -는 법이 없다 means "never."',
    toriTip: '🐰 -는 법이다 = "按理就该…"，讲道理时的老成口吻。"노력하면 성공하는 법이에요"（努力了自然会成功）。否定的 -는 법이 없다 = "从不…"，夸人或吐槽都行："걔는 웃는 법이 없어"（他从不笑）。', toriTipEn: '🐰 -는 법이다 = "As a rule, it should…" — a wise, matter-of-fact tone. E.g., 노력하면 성공하는 법이에요 (If you work hard, success naturally follows). The negative -는 법이 없다 = "never…" — works for praise or teasing: 걔는 웃는 법이 없어 (He never smiles).',
  },

  // src: card-p22-l07
  {
    id: 'g172', title: '明摆着', titleEn: 'Obviously', pattern: '-는/(으)ㄴ 게 뻔하다',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"明摆着…、显然…（心里有数）"', usageEn: 'Means "obviously…, clearly… (you already know)"',
    explanation: '接在冠形词形后加 게 뻔하다，表示说话人根据经验或迹象，认定某事显而易见、不用问也知道，相当于"明摆着…、显然…、准是…"。含"我早料到了"的语感，多用于负面或不满的推断。', explanationEn: 'Attached after an adnominal form plus 게 뻔하다, it indicates the speaker, based on experience or signs, is certain something is obvious and needs no asking — equivalent to "obviously…, clearly…, bound to be…". It carries a "I saw it coming" feel and is often used for negative or displeased assumptions.',
    conjugation: '动词现在 + 는 게 뻔하다 (늦다→늦을 게 뻔하다·未来)\n动词过去 + (으)ㄴ 게 뻔하다\n形容词 + (으)ㄴ 게 뻔하다 (화난 게 뻔하다)', conjugationEn: 'Verb present + 는 게 뻔하다 (늦다→늦을 게 뻔하다·future)\\nVerb past + (으)ㄴ 게 뻔하다\\nAdjective + (으)ㄴ 게 뻔하다 (화난 게 뻔하다)',
    examples: [
      { ko: '민수 씨는 오늘도 늦을 게 뻔해요.', zh: '敏秀今天显然又会晚到。', zhEn: 'Min-su will obviously be late again today.', note: '明摆着：准又迟到', noteEn: 'Obviously: Bound to be late again' },
      { ko: '저 표정, 화난 게 뻔해요.', zh: '那表情，显然是生气了。', zhEn: 'That expression clearly shows he\'s angry.', note: '明摆着：显然生气', noteEn: 'Obviously angry' },
      { ko: '이 가방, 짝퉁인 게 뻔해요.', zh: '这个包，显然是假货。', zhEn: 'This bag is obviously a fake.', note: '明摆着：显然假货', noteEn: 'Obviously fake' },
    ],
    similarPatterns: ['-(으)ㄹ 게 틀림없다', '-(으)ㄴ 것 같다'],
    difference: '-는 게 뻔하다 是"凭经验/迹象一看就知道"的笃定推断，常带不屑或无奈（"늦을 게 뻔해요"准迟到——早料到了）；-(으)ㄹ 게 틀림없다 是"确凿无疑"的强推断，较中性（"범인인 게 틀림없다"肯定是罪犯）。뻔하다 多了"明摆着、不出所料"的主观语气。', differenceEn: '-는 게 뻔하다 is a confident guess based on experience or signs, often with a hint of disdain or resignation ("늦을 게 뻔해요"—bound to be late, saw it coming); -(으)ㄹ 게 틀림없다 is a strong, more neutral inference of certainty ("범인인 게 틀림없다"—must be the culprit). 뻔하다 adds a subjective tone of "obvious, as expected."',
    toriTip: '🐰 -는 게 뻔하다 = "明摆着…、准是…"，一副了然于心的样子。"안 봐도 뻔해"（不用看都知道）。多用在吐槽或料定别人时："또 게임하는 게 뻔하지"（准又在打游戏呗），带点无奈或不屑。', toriTipEn: '🐰 -는 게 뻔하다 = "Obviously…, bound to be…"—like you already know. "안 봐도 뻔해" (I can tell without even looking). Used when calling someone out or predicting: "또 게임하는 게 뻔하지" (Probably gaming again), with a hint of resignation or disdain.',
  },

  // src: card-p22-l08
  {
    id: 'g173', title: '一定是', titleEn: 'Must be', pattern: '-(으)ㄹ 게 틀림없다',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"一定是…、肯定…（无疑）"', usageEn: 'Indicates "must be…, certainly… (no doubt)"',
    explanation: '接在冠形词形后加 게 틀림없다（毫无差错），表示说话人根据依据做出高度确信的推断，相当于"一定是…、肯定…、无疑…"。틀림없다 意为"没错、确凿"，确定性极高。', explanationEn: 'Attach 게 틀림없다 (no mistake) after the adnominal form to express a highly confident inference based on evidence, meaning "must be…, certainly…, undoubtedly…". 틀림없다 means "no doubt, certain," with very high certainty.',
    conjugation: '动词将来/推测 + (으)ㄹ 게 틀림없다\n名词 + 인 게 틀림없다 (범인인 게 틀림없다)\n形容词 + (으)ㄴ 게 틀림없다\n过去 + 았/었을 게 틀림없다', conjugationEn: 'Verb future/guess + (으)ㄹ 게 틀림없다\\nNoun + 인 게 틀림없다 (범인인 게 틀림없다)\\nAdjective + (으)ㄴ 게 틀림없다\\nPast + 았/었을 게 틀림없다',
    examples: [
      { ko: '지문이 남아 있어요. 범인인 게 틀림없어요.', zh: '留下了指纹，肯定是嫌犯。', zhEn: 'Fingerprints were left, so it\'s definitely the suspect.', note: '一定是：肯定是嫌犯', noteEn: 'Must be: definitely the suspect' },
      { ko: '전화를 안 받는 걸 보니 회의 중일 게 틀림없어요.', zh: '不接电话，肯定在开会。', zhEn: 'Not answering the phone, so they\'re definitely in a meeting.', note: '一定是：肯定在开会', noteEn: 'Must be: definitely in a meeting' },
      { ko: '이 팀은 이번에 우승할 게 틀림없어요.', zh: '这支队伍这次肯定会夺冠。', zhEn: 'This team is certain to win the championship this time.', note: '一定是：肯定夺冠', noteEn: 'Must be: definitely winning the championship' },
    ],
    similarPatterns: ['-는 게 뻔하다', '-(으)ㄹ 리가 없다'],
    difference: '-(으)ㄹ 게 틀림없다 是"有依据的确凿推断"，较中性客观（"범인인 게 틀림없다"肯定是罪犯——基于证据）；-는 게 뻔하다 是"凭经验料定"，带主观不屑（"늦을 게 뻔하다"准迟到）。-(으)ㄹ 리가 없다 则是反向的强否定"不可能"。', differenceEn: '-(으)ㄹ 게 틀림없다 is a "certain inference based on evidence," more neutral and objective ("범인인 게 틀림없다"—must be the culprit, based on evidence); -는 게 뻔하다 is "predicting from experience," with subjective disdain ("늦을 게 뻔하다"—bound to be late). -(으)ㄹ 리가 없다 is the opposite strong negation, "impossible."',
    toriTip: '🐰 -(으)ㄹ 게 틀림없다 = "肯定是…、绝对是…"，有证据支撑的笃定。"이거 그 사람이 한 게 틀림없어"（这肯定是他干的）。比 -는 게 뻔하다 更客观（靠证据非靠成见），侦探破案式的推断最爱用。', toriTipEn: '🐰 -(으)ㄹ 게 틀림없다 = "Definitely…, absolutely…"—certainty backed by evidence. "이거 그 사람이 한 게 틀림없어" (This must be his doing). More objective than -는 게 뻔하다 (evidence over bias), perfect for detective-style deductions.',
  },

  // src: card-p23-l01
  {
    id: 'g174', title: '相反对比', titleEn: 'Contrast', pattern: '-는/(으)ㄴ 반면(에)',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"…相反、然而（对比两面）"', usageEn: 'Indicates "…on the contrary, however (contrasting two sides)"',
    explanation: '接在冠形词形后加 반면(에)，表示后句与前句形成对照，呈现同一事物的正反两面或两者的对立，相当于"…相反、然而、另一方面"。常用于客观地列出优缺点、两种对立情况。', explanationEn: 'Attach 반면(에) after the adnominal form to contrast the following clause with the preceding one, showing two sides of the same thing or opposing situations, meaning "…on the contrary, however, on the other hand." Often used to objectively list pros and cons or opposing cases.',
    conjugation: '动词现在 + 는 반면에 (버는→버는 반면에)\n形容词 + (으)ㄴ 반면에 (비싼 반면에)\n名词 + 인 반면에', conjugationEn: 'Verb present + 는 반면에 (버는→버는 반면에)\\nAdjective + (으)ㄴ 반면에 (비싼 반면에)\\nNoun + 인 반면에',
    examples: [
      { ko: '이 카페는 커피는 맛있는 반면에 가격이 비싸요.', zh: '这家咖啡店咖啡好喝，但价格贵。', zhEn: 'This coffee shop\'s coffee is good, but it\'s pricey.', note: '相反：好喝但贵', noteEn: 'On the other hand: tasty but expensive' },
      { ko: '형은 활발한 반면에 동생은 내성적이에요.', zh: '哥哥活泼，相反弟弟内向。', zhEn: 'The older brother is outgoing, whereas the younger brother is introverted.', note: '相反：活泼vs内向', noteEn: 'Contrast: outgoing vs introverted' },
      { ko: '이 회사는 월급이 많은 반면에 야근이 많아요.', zh: '这公司工资高，相反加班也多。', zhEn: 'This company pays well, but on the other hand, there\'s a lot of overtime.', note: '相反：工资高但加班多', noteEn: 'On the other hand: high pay but lots of overtime' },
    ],
    similarPatterns: ['-지만', '-는가 하면'],
    difference: '-는 반면에 是"客观列出对立的两面"，多用于优缺点对比（"맛있는 반면에 비싸요"好吃但贵）；-지만 是一般转折（"맛있지만 비싸요"虽好吃但贵）。반면에 更书面、更强调"正反两面并置"，常见于评价利弊。', differenceEn: '-는 반면에 is "objectively listing opposing sides," often for pros and cons ("맛있는 반면에 비싸요"—tasty but expensive); -지만 is a general contrast ("맛있지만 비싸요"—tasty but expensive). 반면에 is more formal and emphasizes "juxtaposing both sides," common in evaluating pros and cons.',
    toriTip: '🐰 -는 반면에 = "…另一方面却…"，权衡利弊时的书面担当。"편한 반면에 비싸요"（方便但贵）。写评价、做对比时用它显得客观，比口语的 -지만 更有条理感。', toriTipEn: '🐰 -는 반면에 = "…on the other hand…," the formal go-to for weighing pros and cons. "편한 반면에 비싸요" (Convenient but expensive). Using it in reviews or comparisons sounds objective, more organized than the casual -지만.',
  },

  // src: card-p23-l02
  {
    id: 'g175', title: '累加（再加上）', titleEn: 'Accumulation (on top of that)', pattern: '-는/(으)ㄴ 데다(가)',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"再加上…、不仅…而且（同类叠加）"', usageEn: 'Indicates "on top of that…, not only…but also (adding similar items)"',
    explanation: '接在冠形词形后加 데다(가)，表示在前项基础上再叠加同方向的一项，相当于"再加上…、不仅…而且…"。前后两项性质相同（都是优点或都是缺点），起累加强调作用。', explanationEn: 'Attach 데다(가) after an adnominal form to add another item in the same direction on top of the preceding one, meaning "plus...", "not only... but also...". The two items are of the same nature (both strengths or both weaknesses), adding emphasis through accumulation.',
    conjugation: '动词现在 + 는 데다가 (오는 데다가)\n形容词 + (으)ㄴ 데다가 (예쁜 데다가)\n名词 + 인 데다가\n过去 + (으)ㄴ 데다가', conjugationEn: 'Verb present + 는 데다가 (오는 데다가)\\nAdjective + (으)ㄴ 데다가 (예쁜 데다가)\\nNoun + 인 데다가\\nPast + (으)ㄴ 데다가',
    examples: [
      { ko: '이 옷은 예쁜 데다가 가격도 저렴해요.', zh: '这衣服不仅好看还便宜。', zhEn: 'These clothes are not only nice-looking but also cheap.', note: '累加：好看又便宜', noteEn: 'Accumulation: pretty and cheap' },
      { ko: '민수 씨는 공부도 잘하는 데다가 운동도 잘해요.', zh: '敏秀不仅学习好还运动强。', zhEn: 'Min-su is not only good at studying but also great at sports.', note: '累加：学习好又运动好', noteEn: 'Accumulation: good at studying and sports' },
      { ko: '비가 오는 데다가 바람까지 불어요.', zh: '不仅下雨还刮风。', zhEn: 'It\'s not only raining but also windy.', note: '累加：下雨又刮风', noteEn: 'Accumulation: rainy and windy' },
    ],
    similarPatterns: ['-(으)ㄹ뿐더러', '-고'],
    difference: '-는 데다가 强调"在前项上再加同方向一项"，口语常用（"예쁜 데다가 싸요"又好看又便宜）；-(으)ㄹ뿐더러 是更书面的"不仅…而且"。两者都表累加，데다가 偏口语、뿐더러 偏书面。注意前后须同方向（都好或都坏）。', differenceEn: '-는 데다가 emphasizes "adding another item in the same direction on top of the preceding one," and is common in speech ("예쁜 데다가 싸요" pretty and cheap); -(으)ㄹ뿐더러 is a more formal "not only... but also." Both express accumulation, but 데다가 leans colloquial and 뿐더러 leans written. Note that the two items must be in the same direction (both good or both bad).',
    toriTip: '🐰 -는 데다가 = "而且还…、再加上…"，锦上添花或雪上加霜都行。"싼 데다가 맛있어요"（又便宜又好吃）、"추운 데다가 비까지 와요"（又冷又下雨）。前后要同方向——好加好、坏加坏，别一好一坏。', toriTipEn: '🐰 -는 데다가 = "and also...", "plus..." — works for adding good to good or bad to bad. "싼 데다가 맛있어요" (cheap and tasty), "추운 데다가 비까지 와요" (cold and rainy). Both items must go the same way — good with good, bad with bad, not one of each.',
  },

  // src: card-p23-l03
  {
    id: 'g176', title: '别说连都', titleEn: 'Let alone... even...', pattern: '-기는커녕 / 은/는커녕',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"别说…了，连…都…（反而更差）"', usageEn: 'Means "let alone... even... (and it\'s even worse)"',
    explanation: '动词用 -기는커녕，名词用 은/는커녕，表示不仅前项没实现，反而连更基本的都达不到，相当于"别说…了，连…都…"。前项是期待的较高目标，后项揭示连低目标都落空，落差强烈。', explanationEn: 'Use -기는커녕 with verbs and 은/는커녕 with nouns, meaning not only did the first item fail to happen, but even the more basic one is out of reach — "let alone... even...". The first item is a higher expected goal, and the second reveals even the lower goal is unmet, creating a strong contrast.',
    conjugation: '动词词干 + 기는커녕\n名词 + 은/는커녕 (有收音 은커녕, 无收音 는커녕)', conjugationEn: 'Verb stem + 기는커녕\\nNoun + 은/는커녕 (은커녕 with final consonant, 는커녕 without)',
    examples: [
      { ko: '칭찬은커녕 혼만 났어요.', zh: '别说表扬了，还挨骂了。', zhEn: 'Let alone praise, I even got scolded.', note: '别说连：别说夸还挨骂', noteEn: 'Let alone: let alone praise, got scolded' },
      { ko: '오늘 쉬기는커녕 점심도 못 먹었어요.', zh: '今天别说休息，午饭都没吃。', zhEn: 'Today, let alone resting, I didn\'t even eat lunch.', note: '别说连：别说歇饭都没吃', noteEn: 'Let alone: let alone rest, didn\'t even eat' },
      { ko: '돈은커녕 시간도 없어요.', zh: '别说钱，连时间都没。', zhEn: 'Let alone money, there\'s no time either.', note: '别说连：别说钱时间也没', noteEn: 'Let alone: let alone money, no time either' },
    ],
    similarPatterns: ['조차', '마저'],
    difference: '-기는커녕/은는커녕 强调"别说高目标了，连低目标都落空"的强烈落差（"칭찬은커녕 혼났어요"别说夸反而挨骂）；마저 只是"连最后的都…"的追加（"돈마저 없어요"连钱都没）。커녕 特有"期待与现实反差极大"的转折，前高后低。', differenceEn: '-기는커녕/은는커녕 emphasizes the strong contrast of "let alone the high goal, even the low goal fails" ("칭찬은커녕 혼났어요" let alone praise, got scolded); 마저 is just an addition of "even the last..." ("돈마저 없어요" even money is gone). 커녕 uniquely conveys a sharp turn from expectation to reality, high to low.',
    toriTip: '🐰 -기는커녕/은는커녕 = "别说…了，反而…"，落差感拉满。"부자는커녕 빚만 늘었어"（别说变富，债倒是多了）。前面摆个美好期待，后面啪地打脸，吐槽人生不如意时超传神。', toriTipEn: '🐰 -기는커녕/은는커녕 = "let alone... instead..." — maximum contrast. "부자는커녕 빚만 늘었어" (let alone getting rich, debts just grew). Set up a nice expectation, then slap it down — perfect for complaining about life\'s disappointments.',
  },

  // src: card-p23-l04
  {
    id: 'g177', title: '不仅而且（书面）', titleEn: 'Not only... but also (formal)', pattern: '-(으)ㄹ뿐더러',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '연결',
    usage: '表示"不仅…而且…（书面累加）"', usageEn: 'Means "not only... but also... (formal accumulation)"',
    explanation: '接在动词/形容词后，表示除前项外还有后项，且后项常是更进一层的补充，相当于"不仅…而且…、加之…"。是较正式的书面语累加连接，语气比 -는 데다가 郑重。', explanationEn: 'Attach to verbs/adjectives to indicate that in addition to the first item, there is a second, often a further supplement, meaning "not only... but also...", "moreover...". It is a more formal written connective for accumulation, more solemn than -는 데다가.',
    conjugation: '无收音/ㄹ + ㄹ뿐더러 (예쁘다→예쁠뿐더러)\n有收音 + 을뿐더러 (좋다→좋을뿐더러, 많다→많을뿐더러)\n名词 + 일뿐더러', conjugationEn: 'No final consonant/ㄹ + ㄹ뿐더러 (예쁘다→예쁠뿐더러)\\nFinal consonant + 을뿐더러 (좋다→좋을뿐더러, 많다→많을뿐더러)\\nNoun + 일뿐더러',
    examples: [
      { ko: '이 제품은 품질이 좋을뿐더러 가격도 합리적입니다.', zh: '此产品质量好，价格也合理。', zhEn: 'This product has good quality and a reasonable price.', note: '不仅而且：质量好价格也合理', noteEn: 'Not only but also: good quality and reasonable price' },
      { ko: '민수 씨는 성실할뿐더러 능력도 뛰어납니다.', zh: '敏秀诚实，能力也出众。', zhEn: 'Minsu is honest, and also highly capable.', note: '不仅而且：诚实能力也强', noteEn: 'Not only but also: honest and capable' },
      { ko: '이 지역은 관광지일뿐더러 문화 유산도 많습니다.', zh: '此地既是旅游胜地，文化遗产也丰富。', zhEn: 'This place is a tourist attraction, and also rich in cultural heritage.', note: '不仅而且：旅游地文化遗产也多', noteEn: 'Not only that: tourist destinations also have rich cultural heritage' },
    ],
    similarPatterns: ['-는 데다가', '-(으)ㄹ 뿐만 아니라'],
    difference: '-(으)ㄹ뿐더러 是书面正式的累加"不仅…而且"（"좋을뿐더러 싸요"不仅好而且便宜）；-는 데다가 是口语累加；-(으)ㄹ 뿐만 아니라（g38）也表"不仅…而且"，三者义近。뿐더러 最书面，데다가 最口语，뿐만 아니라 居中。', differenceEn: '-(으)ㄹ뿐더러 is a formal written additive meaning "not only...but also" ("좋을뿐더러 싸요" = not only good but cheap); -는 데다가 is colloquial additive; -(으)ㄹ 뿐만 아니라 (g38) also means "not only...but also." The three are similar. 뿐더러 is the most formal, 데다가 the most colloquial, and 뿐만 아니라 is in between.',
    toriTip: '🐰 -(으)ㄹ뿐더러 = "不仅…而且…"，正式文书专用。"실력이 뛰어날뿐더러 인성도 좋다"（不仅能力强而且人品好）。写推荐信、报告时用它加分。口语聊天太文绉绉，那时候换 -는 데다가。', toriTipEn: '🐰 -(으)ㄹ뿐더러 = "not only...but also," used in formal writing. "실력이 뛰어날뿐더러 인성도 좋다" (not only skilled but also good character). Use it in recommendation letters and reports to score points. In casual chat it\'s too stiff—switch to -는 데다가 then.',
  },

  // src: card-p23-l05
  {
    id: 'g178', title: '既且（书面并列）', titleEn: 'both...and (formal parallel)', pattern: '-거니와',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '연결',
    usage: '表示"既…而且…（书面并列累加）"', usageEn: 'Indicates "both...and..." (formal parallel addition)',
    explanation: '接在动词/形容词后，先承认前项，再补充后项，两项同方向叠加，相当于"既…而且…、不但…也…"。是文雅、书面色彩浓的并列连接，多见于正式文章、演讲。', explanationEn: 'Attached after verbs/adjectives, it first acknowledges the preceding item, then adds the following one, stacking both in the same direction—equivalent to "both...and..., not only...but also." It\'s an elegant, highly formal parallel connector, common in formal writing and speeches.',
    conjugation: '动词/形容词词干 + 거니와\n名词 + (이)거니와\n过去 + 았/었거니와', conjugationEn: 'Verb/adjective stem + 거니와\\nNoun + (이)거니와\\nPast + 았/었거니와',
    examples: [
      { ko: '이 책은 재미있거니와 유익하기도 합니다.', zh: '此书既有趣又有益。', zhEn: 'This book is both interesting and beneficial.', note: '既且：又有趣又有益', noteEn: 'both: both fun and beneficial' },
      { ko: '민수 씨는 성실하거니와 책임감도 강합니다.', zh: '敏秀既踏实，责任心也强。', zhEn: 'Minsu is both dependable and highly responsible.', note: '既且：踏实责任心强', noteEn: 'both: dependable and responsible' },
      { ko: '그는 학자이거니와 훌륭한 교육자이기도 합니다.', zh: '他既是学者，也是优秀的教育家。', zhEn: 'He is both a scholar and an excellent educator.', note: '既且：学者也是教育家', noteEn: 'both: scholar and educator' },
    ],
    similarPatterns: ['-(으)ㄹ뿐더러', '-(으)며'],
    difference: '-거니와 是文雅的书面并列，先肯定前项再补后项（"재미있거니와 유익하다"既有趣又有益）；-(으)ㄹ뿐더러 也是书面累加但更强调"进一层"。两者都很书面，거니와 语气更从容、文学化，常用于演讲、评论。日常几乎不用。', differenceEn: '-거니와 is an elegant formal parallel, affirming the first item then adding the second ("재미있거니와 유익하다" = both fun and beneficial); -(으)ㄹ뿐더러 is also formal additive but emphasizes "going a step further." Both are formal, but 거니와 has a more composed, literary tone, often used in speeches and reviews. Rarely used in daily conversation.',
    toriTip: '🐰 -거니와 = "既…而且…"，非常文雅书面，演讲、评论文里才见得到。"말할 것도 없거니와…"（自不必说，而且…）。日常对话用它会显得太做作，属于"看得懂就行、写作偶尔用"的高级连接词。', toriTipEn: '🐰 -거니와 = "both...and...," very elegant and formal, only seen in speeches and reviews. "말할 것도 없거니와…" (needless to say, and...). Using it in daily conversation sounds too affected—it\'s an advanced connector you just need to recognize and occasionally use in writing.',
  },

  // src: card-p23-l06
  {
    id: 'g179', title: '一方面同时', titleEn: 'on one hand, at the same time', pattern: '-는/(으)ㄴ 한편',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '연결',
    usage: '表示"一方面…（另一方面/同时）…"', usageEn: 'Indicates "on one hand... (on the other hand/at the same time)..."',
    explanation: '接在冠形词形后加 한편，表示在做某事的同时也进行另一件事，或呈现某事的另一侧面，相当于"一方面…另一方面…、…的同时…"。前后两项可以是并行的动作，也可以是对照的两面。', explanationEn: 'Attached after an adnominal form plus 한편, it indicates doing another thing at the same time as something, or presenting another side of something—equivalent to "on one hand...on the other hand..., ...while..." The two items can be parallel actions or contrasting sides.',
    conjugation: '动词现在 + 는 한편 (일하는 한편)\n动词过去 + (으)ㄴ 한편\n形容词 + (으)ㄴ 한편', conjugationEn: 'Verb present + 는 한편 (일하는 한편)\\nVerb past + (으)ㄴ 한편\\nAdjective + (으)ㄴ 한편',
    examples: [
      { ko: '민수 씨는 일하는 한편 대학원도 다녀요.', zh: '敏秀一边工作一边读研。', zhEn: 'Minsu works while doing grad school.', note: '同时：工作同时读研', noteEn: 'at the same time: work while studying grad school' },
      { ko: '한국은 전통을 지키는 한편 새로운 문화도 받아들여요.', zh: '韩国守传统的同时也接纳新文化。', zhEn: 'Korea embraces new culture while preserving tradition.', note: '同时：守传统也接新文化', noteEn: 'at the same time: preserve tradition and embrace new culture' },
      { ko: '기쁜 한편 서운한 마음도 들어요.', zh: '一方面高兴，另一方面也有些失落。', zhEn: 'On one hand happy, on the other a bit disappointed.', note: '一方面：又高兴又失落', noteEn: 'on one hand: both happy and disappointed' },
    ],
    similarPatterns: ['-(으)면서', '-는 반면에'],
    difference: '-는 한편 是"一方面…同时另一方面…"的并行/两面（"일하는 한편 공부해요"工作同时学习，书面）；-(으)면서 是"一边…一边…"的口语同时（"일하면서 공부해요"）；-는 반면에 是正反"对比"。한편 偏书面，可表并行也可表两面，比 -(으)면서 正式。', differenceEn: '-는 한편 is "on one hand...at the same time/on the other hand..." for parallel/two-sided ("일하는 한편 공부해요" = work while studying, formal); -(으)면서 is the colloquial "while..." ("일하면서 공부해요"); -는 반면에 is for positive-negative "contrast." 한편 leans formal, can express parallel or two-sided, and is more formal than -(으)면서.',
    toriTip: '🐰 -는 한편 = "一方面…另一方面/同时…"，书面感的"同时进行"。"성장하는 한편 문제점도 드러났다"（在成长的同时也暴露了问题）。比口语的 -(으)면서 正式，新闻、报告里描述"双线并行"时常用。', toriTipEn: '🐰 -는 한편 = "on one hand...on the other hand/at the same time," a formal-feeling "simultaneous action." "성장하는 한편 문제점도 드러났다" (while growing, problems also emerged). More formal than colloquial -(으)면서, often used in news and reports to describe "dual tracks running in parallel."',
  },

  // src: card-p23-l07
  {
    id: 'g180', title: '却还（让步）', titleEn: 'yet still (concessive)', pattern: '-고도',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"…了却还…、虽然…也…"', usageEn: 'indicates \'did... yet still...\', \'although... also...\'',
    explanation: '接在动词后，表示做了前一动作，却出现了与预期相反或不相称的后项，相当于"…了却还…、明明…却…"。前后主语相同，含"做了A本该B，却出现非预期结果"的让步转折意味。', explanationEn: 'Attached after a verb, it indicates that after doing the preceding action, an outcome contrary to or disproportionate to expectations follows, equivalent to \'...yet still...\', \'clearly... but...\'. The subject is the same before and after, carrying a concessive contrast of \'did A, should have been B, but an unexpected result occurred.\'',
    conjugation: '动词词干 + 고도\n（알다→알고도, 먹다→먹고도）', conjugationEn: 'Verb stem + 고도\\n(알다→알고도, 먹다→먹고도)',
    examples: [
      { ko: '많이 먹고도 배가 안 불러요.', zh: '吃了很多却不饱。', zhEn: 'Ate a lot but not full.', note: '却还：吃多了也不饱', noteEn: 'yet still: ate a lot but not full' },
      { ko: '알고도 모른 척하지 마세요.', zh: '别明明知道却装作不知道。', zhEn: 'Don\'t pretend not to know when you clearly do.', note: '却还：知道却装不知', noteEn: 'yet still: knows but pretends not to' },
      { ko: '오랜만이라 보고도 못 알아봤어요.', zh: '好久没见，看到了都没认出来。', zhEn: 'Haven\'t seen in a while, didn\'t even recognize them when I saw them.', note: '却还：看到了也没认出', noteEn: 'yet still: saw but didn\'t recognize' },
    ],
    similarPatterns: ['-지만', '-(으)면서도'],
    difference: '-고도 强调"做了A却出现非预期的B"，含意外/让步（"알고도 모른 척"明知却装不知）；-지만 是一般转折（"알지만 말 안 해요"知道但不说）。-(으)면서도 与 -고도 义近，都表"明明…却…"，-고도 更强调"完成了前项之后仍…"。', differenceEn: '-고도 emphasizes \'did A but unexpected B occurred\', with a sense of surprise/concession (\'알고도 모른 척\' knowing but pretending not to); -지만 is a general contrast (\'알지만 말 안 해요\' know but don\'t say). -(으)면서도 is similar to -고도, both meaning \'clearly... but...\', but -고도 stresses \'after completing the preceding, still...\'',
    toriTip: '🐰 -고도 = "…了却还…、明明…却…"，带点意外或责备。"보고도 인사 안 해?"（看到了还不打招呼？）、"듣고도 못 들은 척"（听见了装没听见）。前面是既成事实，后面是不该有的反应，用来点破很到位。', toriTipEn: '🐰 -고도 = \'...yet still...\', \'clearly... but...\', with a hint of surprise or reproach. \'보고도 인사 안 해?\' (Saw them but didn\'t greet?), \'듣고도 못 들은 척\' (Heard but pretended not to). The front is an established fact, the back is an inappropriate reaction—perfect for calling it out.',
  },

  // =====================================================================
  //  批量提炼扩充 B7a（P24-P25，高级：原因/引用）
  // =====================================================================

  // src: card-p24-l01
  {
    id: 'g181', title: '突发原因', titleEn: 'unexpected cause', pattern: '-는 바람에',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '연결',
    usage: '表示"因为（突发/意外）…结果…"，多为负面', usageEn: 'indicates \'because of (sudden/unexpected)... as a result...\', often negative',
    explanation: '接在动词现在时冠形词形后，表示因某个突发或意外的原因导致了后句（多为负面、非本意）的结果，相当于"因为…结果…、由于…以致…"。后句常是没能做到、出了岔子。后句不用命令/请诱句。', explanationEn: 'Attached after the present tense adnominal form of a verb, it indicates that a sudden or unexpected cause led to the result in the following clause (often negative or unintended), equivalent to \'because... as a result...\', \'due to... leading to...\'. The following clause is often about failing to do something or something going wrong. Commands/requests are not used in the following clause.',
    conjugation: '动词词干 + 는 바람에\n（固定用 -는，后句多为过去时结果）', conjugationEn: 'Verb stem + 는 바람에\\n(fixed as -는, following clause often past tense result)',
    examples: [
      { ko: '갑자기 비가 오는 바람에 옷이 다 젖었어요.', zh: '突然下雨，衣服全湿了。', zhEn: 'It suddenly rained, and all the clothes got wet.', note: '突发原因：下雨淋湿', noteEn: 'unexpected cause: got wet from rain' },
      { ko: '지하철이 고장 나는 바람에 지각했어요.', zh: '地铁故障，所以迟到了。', zhEn: 'The subway broke down, so I was late.', note: '突发原因：故障迟到', noteEn: 'unexpected cause: breakdown, late' },
      { ko: '친구가 갑자기 오는 바람에 약속 못 지켰어요.', zh: '朋友突然来，所以没能赴约。', zhEn: 'A friend suddenly came, so I couldn\'t keep the appointment.', note: '突发原因：朋友来爽约', noteEn: 'unexpected cause: friend came, missed appointment' },
    ],
    similarPatterns: ['-는 통에', '-아서/어서'],
    difference: '-는 바람에 强调"突发意外的原因导致（多为负面）结果"（"비가 오는 바람에 젖었어요"下雨淋湿了——非本意）；-아서/어서 是中性因果。바람에 特有"意外、非计划、常带倒霉"的语感，后句几乎都是不好的结果。', differenceEn: '-는 바람에 emphasizes \'a sudden unexpected cause leads to (often negative) result\' (\'비가 오는 바람에 젖었어요\' got wet from rain—unintended); -아서/어서 is neutral cause-and-effect. 바람에 has a unique nuance of \'unexpected, unplanned, often unlucky\', and the following clause is almost always a bad outcome.',
    toriTip: '🐰 -는 바람에 = "结果因为…（倒霉了）"，甩锅解释意外的利器。"차가 막히는 바람에 늦었어요"（因为堵车结果迟到了）。后面跟的准没好事——迟到、搞砸、错过，都是"怪它"的语气。', toriTipEn: '🐰 -는 바람에 = \'as a result because... (unlucky)\', the perfect tool for blaming unexpected events. \'차가 막히는 바람에 늦었어요\' (Was late because of traffic). What follows is never good—late, messed up, missed—all in a \'blame it\' tone.',
  },

  // src: card-p24-l02
  {
    id: 'g182', title: '嘈杂原因', titleEn: 'noisy cause', pattern: '-는 통에',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"因…闹得、在…的混乱中（没能…）"', usageEn: 'indicates \'due to... causing a fuss, in the chaos of... (failed to...)\'',
    explanation: '接在动词现在时冠形词形后，表示因某种混乱、嘈杂、忙乱的状况而导致后句（负面）结果，相当于"因…闹得、在…的乱糟糟中"。比 -는 바람에 更强调"混乱、纷扰"的场面感。', explanationEn: 'Attached after the present tense adnominal form of a verb, it indicates that a chaotic, noisy, or hectic situation led to the result in the following clause (negative), equivalent to \'due to... causing a fuss, in the mess of...\'. It emphasizes the \'chaotic, disruptive\' scene more than -는 바람에.',
    conjugation: '动词词干 + 는 통에\n名词 + 통에（난리 통에 等固定搭配）', conjugationEn: 'Verb stem + 는 통에 / Noun + 통에 (fixed expressions like 난리 통에)',
    examples: [
      { ko: '아이들이 소리 지르는 통에 아무것도 못 했어요.', zh: '孩子们大喊大叫，闹得什么都做不了。', zhEn: 'The kids were screaming so much that I couldn\'t get anything done.', note: '嘈杂原因：吵闹没做成', noteEn: 'Noisy cause: too loud to get things done' },
      { ko: '사람이 많은 통에 친구를 놓쳤어요.', zh: '人太多，混乱中把朋友弄丢了。', zhEn: 'There were so many people that I lost my friend in the chaos.', note: '嘈杂原因：人多丢了朋友', noteEn: 'Noisy cause: lost friend in the crowd' },
      { ko: '전화가 계속 오는 통에 회의에 집중 못 했어요.', zh: '电话一直响，闹得开会没法专心。', zhEn: 'The phone kept ringing, so I couldn\'t focus during the meeting.', note: '嘈杂原因：电话吵没专心', noteEn: 'Noisy cause: phone ringing broke focus' },
    ],
    similarPatterns: ['-는 바람에', '-는 탓에'],
    difference: '-는 통에 强调"在混乱嘈杂的状况中"导致结果（"시끄러운 통에 못 들었어요"闹哄哄的没听见）；-는 바람에 强调"突发意外"（"고장 나는 바람에"突然坏了）。통에 特有"乱糟糟、纷扰"的场面感，바람에 特有"突发"感。', differenceEn: '-는 통에 emphasizes a result caused by a chaotic, noisy situation (e.g., "시끄러운 통에 못 들었어요" — didn\'t hear it because it was so loud); -는 바람에 emphasizes an unexpected event (e.g., "고장 나는 바람에" — because it suddenly broke). 통에 carries a sense of "messy, disruptive chaos," while 바람에 has a "sudden, unexpected" feel.',
    toriTip: '🐰 -는 통에 = "被…闹得、乱哄哄中…"，专形容兵荒马乱。"이사하는 통에 정신이 없어요"（搬家忙得晕头转向）、"난리 통에"（一片混乱中）。比 -는 바람에 多了"现场很乱、被搅和"的画面感。', toriTipEn: '🐰 -는 통에 = "caught up in the chaos of..." — used specifically for hectic, disorderly situations. E.g., "이사하는 통에 정신이 없어요" (so busy moving that I\'m frazzled), "난리 통에" (in the middle of chaos). Compared to -는 바람에, it adds a vivid sense of "the scene being a mess and you being swept up in it."',
  },

  // src: card-p24-l03
  {
    id: 'g183', title: '归咎原因', titleEn: 'Blaming a cause', pattern: '-는/(으)ㄴ 탓에 / N 탓에',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '연결',
    usage: '表示"都怪…、因…的缘故（导致坏结果）"', usageEn: 'Means "all because of... / due to... (leading to a bad result)"',
    explanation: '接在冠形词形或名词后，表示把（负面）结果归咎于某原因，相当于"都怪…、因…的缘故"。탓 意为"过错、缘由"，专用于负面归咎。与表感激的 덕분에 恰好相反。', explanationEn: 'Attached after an adnominal form or noun, it attributes a (negative) result to a cause, meaning "all because of... / due to..." 탓 means "fault, reason" and is used only for negative blame. It\'s the exact opposite of 덕분에, which expresses gratitude.',
    conjugation: '动词现在 + 는 탓에 (막히는 탓에)\n动词过去/形容词 + (으)ㄴ 탓에 (늦잠 잔 탓에)\n名词 + 탓에 (실수 탓에)', conjugationEn: 'Verb present + 는 탓에 (막히는 탓에) / Verb past or adjective + (으)ㄴ 탓에 (늦잠 잔 탓에) / Noun + 탓에 (실수 탓에)',
    examples: [
      { ko: '늦잠 잔 탓에 하루 종일 피곤해요.', zh: '都怪睡懒觉，一整天都累。', zhEn: 'All because I slept in, I was tired all day.', note: '归咎：怪睡晚了', noteEn: 'Blame: oversleeping' },
      { ko: '길이 막히는 탓에 지각했어요.', zh: '因为堵车，迟到了。', zhEn: 'I was late because of the traffic jam.', note: '归咎：怪堵车', noteEn: 'Blame: traffic' },
      { ko: '내 실수 탓에 팀이 손해를 봤어요.', zh: '都怪我失误，团队受了损失。', zhEn: 'It was all my fault; the team suffered a loss.', note: '归咎：怪我失误', noteEn: 'Blame: my mistake' },
    ],
    similarPatterns: ['-(으)ㄴ 덕분에', '때문에'],
    difference: '-는 탓에 专用于"负面归咎"（"실수 탓에 손해 봤어요"都怪失误亏了）；-(으)ㄴ 덕분에（g108）专用于"正面感激"（"도움 덕분에 성공했어요"多亏帮助成功了）；때문에 中性。坏事归咎用 탓에，好事感谢用 덕분에，二者感情色彩相反。', differenceEn: '-는 탓에 is used specifically for negative blame (e.g., "실수 탓에 손해 봤어요" — lost money because of a mistake); -(으)ㄴ 덕분에 (g108) is used specifically for positive gratitude (e.g., "도움 덕분에 성공했어요" — succeeded thanks to help); 때문에 is neutral. Use 탓에 for bad outcomes and 덕분에 for good ones — they carry opposite emotional tones.',
    toriTip: '🐰 탓에 vs 덕분에 是一对反义词：坏事"怪…"用 탓에（"너 탓에 망했어"都怪你搞砸了），好事"多亏…"用 덕분에（"네 덕분에 잘됐어"多亏你成了）。用错会闹笑话——别把感谢说成了甩锅。', toriTipEn: '🐰 탓에 vs 덕분에 are opposites: for bad things, "blame..." use 탓에 (e.g., "너 탓에 망했어" — it\'s your fault it failed); for good things, "thanks to..." use 덕분에 (e.g., "네 덕분에 잘됐어" — it worked out thanks to you). Mixing them up can be embarrassing — don\'t turn a thank-you into a blame-game.',
  },

  // src: card-p24-l05
  {
    id: 'g184', title: '过度致果', titleEn: 'Excess leading to a result', pattern: '-(으)ㄴ/는 나머지',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"过于…以至于…、…之余"', usageEn: 'Means "so... that... / to the point of..."',
    explanation: '接在冠形词形后，表示由于前项的程度过高（多为情绪、状态），以至于产生了后句的（往往极端或意外）结果，相当于"过于…以至于…、…得…"。前项常是强烈的情绪或状态。', explanationEn: 'Attached after an adnominal form, it indicates that because the preceding clause\'s degree was too high (often an emotion or state), it led to the (often extreme or unexpected) result in the following clause. Equivalent to "so... that..." The preceding clause is usually a strong emotion or state.',
    conjugation: '动词过去 + (으)ㄴ 나머지 (놀란 나머지)\n形容词 + (으)ㄴ 나머지 (기쁜 나머지)\n动词现在 + 는 나머지', conjugationEn: 'Verb past + (으)ㄴ 나머지 (놀란 나머지) / Adjective + (으)ㄴ 나머지 (기쁜 나머지) / Verb present + 는 나머지',
    examples: [
      { ko: '놀란 나머지 컵을 떨어뜨렸어요.', zh: '吃惊得把杯子掉了。', zhEn: 'I was so surprised that I dropped my cup.', note: '过度致果：惊到掉杯', noteEn: 'Excess result: so startled I dropped the cup' },
      { ko: '너무 긴장한 나머지 말을 잊어버렸어요.', zh: '因为太紧张，把话都忘了。', zhEn: 'Because I was so nervous, I forgot what to say.', note: '过度致果：紧张忘词', noteEn: 'Extreme Result: So Nervous You Forgot Your Lines' },
      { ko: '기쁜 나머지 눈물이 났어요.', zh: '高兴得眼泪都流出来了。', zhEn: 'I was so happy that tears came out.', note: '过度致果：喜极而泣', noteEn: 'Extreme Result: Crying Tears of Joy' },
    ],
    similarPatterns: ['-아서/어서', '-(으)ㄹ 정도로'],
    difference: '-(으)ㄴ 나머지 强调"因程度过高（多为情绪）以至于产生极端结果"（"긴장한 나머지 잊었어요"紧张过头忘了）；-아서/어서 是普通因果。나머지 特有"程度到了极点、结果随之而来"的语感，前项多是强烈情绪状态，较书面。', differenceEn: '-(으)ㄴ 나머지 emphasizes that an extreme result occurs due to an excessive degree (often emotion), e.g., "긴장한 나머지 잊었어요" (so nervous you forgot). -아서/어서 is a general cause-and-effect. 나머지 carries the nuance of "the degree reaching its peak, and the result follows," with the preceding clause usually being a strong emotional state; it\'s more formal.',
    toriTip: '🐰 -(으)ㄴ 나머지 = "…过头，结果…"，情绪爆表引出后果。"기쁜 나머지 소리를 질렀어요"（高兴得叫出声）、"화가 난 나머지"（气过头）。前面放个强烈情绪，后面接冲动结果，书面味浓。', toriTipEn: '🐰 -(으)ㄴ 나머지 = "...to the point of..." — emotions max out and lead to consequences. "기쁜 나머지 소리를 질렀어요" (so happy you screamed), "화가 난 나머지" (so angry). Put a strong emotion before it, an impulsive result after, and it\'s quite formal.',
  },

  // src: card-p24-l06
  {
    id: 'g185', title: '公告原因', titleEn: 'Announcement Reason', pattern: '-는 관계로 / N 관계로',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"由于…（缘故）"，正式公告用语', usageEn: 'Means "due to... (reason)" — a formal announcement expression.',
    explanation: '接在冠形词形或名词后，表示由于某种原因/情况，相当于"由于…、因…关系"。是通知、公告、正式说明中的典型因果用语，语气客观、事务性强，不含感情色彩。', explanationEn: 'Attached after an adnominal form or noun, it indicates a certain reason/circumstance, equivalent to "due to..." or "on account of...". It\'s a typical cause-and-effect expression in notices, announcements, and formal explanations, with an objective, businesslike tone and no emotional coloring.',
    conjugation: '动词词干 + 는 관계로 (오는 관계로)\n名词 + 관계로 (공사 관계로)\n有 있다/없다 + 는 관계로', conjugationEn: 'Verb stem + 는 관계로 (오는 관계로)\\nNoun + 관계로 (공사 관계로)\\nWith 있다/없다 + 는 관계로',
    examples: [
      { ko: '내부 공사 관계로 오늘 휴무입니다.', zh: '由于内部装修，今日停业。', zhEn: 'Closed today due to interior renovations.', note: '公告原因：装修停业', noteEn: 'Announcement Reason: Closed for Renovation' },
      { ko: '개인 사정이 있는 관계로 회의에 참석하지 못합니다.', zh: '由于有个人原因，无法出席会议。', zhEn: 'Due to personal reasons, I cannot attend the meeting.', note: '公告原因：个人原因缺席', noteEn: 'Announcement Reason: Absent Due to Personal Reasons' },
      { ko: '태풍이 오는 관계로 행사가 취소됐습니다.', zh: '由于台风来袭，活动取消。', zhEn: 'The event is canceled due to the typhoon.', note: '公告原因：台风取消', noteEn: 'Announcement Reason: Canceled Due to Typhoon' },
    ],
    similarPatterns: ['(으)로 인하여', '때문에'],
    difference: '-는 관계로 是通知/公告的事务性因果，客观正式（"공사 관계로 휴무입니다"因施工停业）；(으)로 인하여 也是书面因果但更多用于新闻/报告；때문에 中性通用。관계로 特有"告示、正式说明"的公事口吻，日常口语几乎不用。', differenceEn: '-는 관계로 is a businesslike cause-and-effect for notices/announcements, objective and formal (e.g., "공사 관계로 휴무입니다" — closed due to construction). (으)로 인하여 is also written cause-and-effect but more for news/reports; 때문에 is neutral and general. 관계로 has a distinct "official notice" tone and is rarely used in everyday speech.',
    toriTip: '🐰 -는 관계로 = "由于…（缘故）"，店门口告示、公司通知的标准腔。"내부 사정 관계로 마감합니다"（因内部原因打烊）。非常事务性、公事公办，日常聊天用它会像在念公告，那时候用 때문에 就行。', toriTipEn: '🐰 -는 관계로 = "due to... (reason)" — the standard tone for storefront signs and company notices. "내부 사정 관계로 마감합니다" (closing due to internal reasons). Very businesslike and official; using it in casual chat sounds like reading an announcement, so use 때문에 then.',
  },

  // src: card-p25-l05
  {
    id: 'g186', title: '据说因由', titleEn: 'Reported Reason', pattern: '-다고 해서 / -다길래',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '인용',
    usage: '表示"听说…所以…、因为（听说/据说）…"', usageEn: 'Means "heard that... so..." or "because (I heard/someone said)..."',
    explanation: '把间接引语加上因果，表示以"听说、据说、某人说"的内容为原因而做后句，相当于"听说…所以…"。-다고 해서 较中性，-다길래（=-다고 하길래）更口语、更强调"因（听到）而反应"。动词现在陈述用 -ㄴ/는다고 해서、-ㄴ/는다길래。', explanationEn: 'Adding cause-and-effect to indirect speech, it indicates that the content of "hearing, being told, someone saying" is the reason for the following clause, equivalent to "heard that... so...". -다고 해서 is more neutral, while -다길래 (=-다고 하길래) is more colloquial and emphasizes "reacting because of (what was heard)." For present-tense verbs, use -ㄴ/는다고 해서 or -ㄴ/는다길래.',
    conjugation: '陈述引用 + 다고 해서 / (ㄴ/는)다길래\n形容词 + 다고 해서 / 다길래\n名词 + (이)라고 해서 / (이)라길래', conjugationEn: 'Declarative quote + 다고 해서 / (ㄴ/는)다길래\\nAdjective + 다고 해서 / 다길래\\nNoun + (이)라고 해서 / (이)라길래',
    examples: [
      { ko: '민수가 온다고 해서 기다렸어요.', zh: '听说民秀要来，我就等了。', zhEn: 'I heard Minsu was coming, so I waited.', note: '据说因由：听说来就等', noteEn: 'Reported Reason: Waited Because I Heard You Were Coming' },
      { ko: '그 카페가 유명하다길래 가 봤어요.', zh: '听说那家咖啡馆有名，就去看了看。', zhEn: 'I heard that café is famous, so I went to check it out.', note: '据说因由：听说有名就去', noteEn: 'Reported Reason: Went Because I Heard It Was Famous' },
      { ko: '오늘 비 온다길래 우산을 챙겼어요.', zh: '听说今天下雨，就带了伞。', zhEn: 'I heard it would rain today, so I brought an umbrella.', note: '据说因由：听说下雨带伞', noteEn: 'Reported Reason: Brought an Umbrella Because I Heard It Would Rain' },
    ],
    similarPatterns: ['-다고/라고/냐고/자고', '-길래'],
    difference: '-다고 해서/-다길래 是"以引用内容为原因"（"온다고 해서 기다렸어요"听说来就等了——原因是"听说"）；单纯 -다고 하다（g78）只是转述（"온다고 했어요"说要来）；-길래（g36）是以亲眼所见为由。다길래 = 引用 + -길래，因"听到的话"而行动。', differenceEn: '-다고 해서/-다길래 means "the quoted content is the reason" (e.g., "온다고 해서 기다렸어요" — waited because I heard you were coming; the reason is "hearing"); plain -다고 하다 (g78) is just reporting (e.g., "온다고 했어요" — said they\'d come); -길래 (g36) uses something seen firsthand as the reason. 다길래 = quote + -길래, acting on "what was heard."',
    toriTip: '🐰 -다길래 = "听说…所以就…"，因为别人的话而采取行动。"맛있다길래 사 봤어"（听说好吃就买了）、"세일한다길래 왔어요"（听说打折就来了）。比 -다고 해서 更口语，把"道听途说→我的反应"连成一句。', toriTipEn: '🐰 -다길래 = "heard that... so..." — acting on someone else\'s words. "맛있다길래 사 봤어" (bought it because I heard it was good), "세일한다길래 왔어요" (came because I heard there was a sale). More colloquial than -다고 해서, linking "hearsay → my reaction" into one sentence.',
  },

  // src: card-p25-l06
  {
    id: 'g187', title: '传闻求证', titleEn: 'Seeking Confirmation of a Rumor', pattern: '-다면서(요)? / -(이)라면서(요)?',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '인용',
    usage: '表示"听说…是吧？（就传闻向对方求证）"', usageEn: 'Means "I heard that... right? (seeking confirmation from the other party about a rumor)"',
    explanation: '接在引用内容后，表示说话人拿听来的传闻向对方确认，相当于"听说…是吧？、不是说…吗？"。含"我听说了这事，向你求证"的语气，常带亲切或好奇。动词现在用 -ㄴ/는다면서요，名词用 -(이)라면서요。', explanationEn: 'Attached after quoted content, it indicates the speaker confirms something heard from others, meaning "I heard... right?" or "Didn\'t you say...?" It carries a tone of "I heard about this and want to verify with you," often with warmth or curiosity. Verbs in present tense use -ㄴ/는다면서요, nouns use -(이)라면서요.',
    conjugation: '陈述引用 + 다면서(요)? / (ㄴ/는)다면서(요)?\n形容词 + 다면서(요)?\n名词 + (이)라면서(요)?\n过去 + 았/었다면서(요)?', conjugationEn: 'Statement quote + 다면서(요)? / (ㄴ/는)다면서(요)?\\nAdjective + 다면서(요)?\\nNoun + (이)라면서(요)?\\nPast + 았/었다면서(요)?',
    examples: [
      { ko: '민수 씨, 결혼한다면서요?', zh: '民秀，听说你要结婚了？', zhEn: 'Minsu, I heard you\'re getting married?', note: '传闻求证：听说要结婚', noteEn: 'Confirming rumor: heard you\'re getting married' },
      { ko: '어제 부산에 갔다면서요?', zh: '听说你昨天去釜山了？', zhEn: 'I heard you went to Busan yesterday?', note: '传闻求证：听说去了釜山', noteEn: 'Confirming rumor: heard you went to Busan' },
      { ko: '이 옷이 요즘 유행이라면서요?', zh: '听说这件衣服最近很流行？', zhEn: 'I heard this outfit is trendy these days?', note: '传闻求证：听说很流行', noteEn: 'Confirming rumor: heard it\'s popular' },
    ],
    similarPatterns: ['-다니(요)?', '-지요?'],
    difference: '-다면서(요)? 是"拿传闻向对方求证"（"결혼한다면서요?"听说你要结婚了？——我听说了，向你确认）；-다니(요)?（g150）是"对意外之事的惊讶"（"결혼했다니요?"竟然结婚了？——震惊）；-지요? 是求认同。면서 是就传闻求证，다니 是表震惊。', differenceEn: '-다면서(요)? is for "confirming a rumor with the other person" ("결혼한다면서요?" I heard you\'re getting married? — I heard it and want to confirm); -다니(요)? (g150) is for "surprise at something unexpected" ("결혼했다니요?" You actually got married? — shocked); -지요? is for seeking agreement. 면서 is for confirming rumors, 다니 is for expressing shock.',
    toriTip: '🐰 -다면서요? = "听说你…是吧？"，八卦确认专用。"승진했다면서요? 축하해요!"（听说你升职了？恭喜！）。透着"我听说了这事，来跟你确认+关心"的亲切劲儿，跟朋友聊近况超常用。', toriTipEn: '🐰 -다면서요? = "I heard you... right?" — perfect for gossip confirmation. "승진했다면서요? 축하해요!" (I heard you got promoted? Congrats!). It has that friendly vibe of "I heard about this, just checking in + caring," super common when catching up with friends.',
  },

  // src: card-p25-l08
  {
    id: 'g188', title: '引用定语', titleEn: 'Quoted modifier', pattern: '-다는 / -(ㄴ/는)다는 + N',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '인용',
    usage: '表示"所谓…的、说是…的+名词"', usageEn: 'Means "so-called..." or "said to be... + noun"',
    explanation: '由间接引语 -다고 하는 缩略而来，作定语修饰后面的名词，相当于"所谓…的、说是…的、…这样的+名词"。常接 소식/소문/이야기/말/생각 等表示"信息、想法"的名词。动词现在用 -ㄴ/는다는，形容词/名词用 -다는/-(이)라는。', explanationEn: 'Shortened from the indirect quote -다고 하는, it acts as a modifier before a noun, meaning "so-called..." or "said to be..." It often precedes nouns like 소식/소문/이야기/말/생각 that indicate information or thoughts. Verbs in present tense use -ㄴ/는다는, adjectives/nouns use -다는/-(이)라는.',
    conjugation: '动词现在 + (ㄴ/는)다는 + N (온다는 소식)\n形容词 + 다는 + N (좋다는 이야기)\n名词 + (이)라는 + N (의사라는 소문)\n过去 + 았/었다는 + N', conjugationEn: 'Verb present + (ㄴ/는)다는 + N (온다는 소식)\\nAdjective + 다는 + N (좋다는 이야기)\\nNoun + (이)라는 + N (의사라는 소문)\\nPast + 았/었다는 + N',
    examples: [
      { ko: '그가 결혼한다는 소식을 들었어요.', zh: '听到了他要结婚的消息。', zhEn: 'I heard the news that he\'s getting married.', note: '引用定语：结婚的消息', noteEn: 'Quoted modifier: news of marriage' },
      { ko: '한국이 좋다는 이야기를 자주 들어요.', zh: '经常听到说韩国好的话。', zhEn: 'I often hear people say good things about Korea.', note: '引用定语：说韩国好的话', noteEn: 'Quoted modifier: words saying Korea is good' },
      { ko: '민수가 의사라는 소문이 있어요.', zh: '有传闻说民秀是医生。', zhEn: 'There\'s a rumor that Min-su is a doctor.', note: '引用定语：说是医生的传闻', noteEn: 'Quoted modifier: rumor that he\'s a doctor' },
    ],
    similarPatterns: ['-다고/라고/냐고/자고', '-는 것'],
    difference: '-다는 + N 是"引用内容作定语修饰名词"（"온다는 소식"要来的消息——把"온다고 하는"缩略成定语）；-다고 하다（g78）是引用作谓语（"온다고 해요"说要来）。-다는 专门用来把一段话变成修饰名词的定语，后接 소식/소문/말 等。', differenceEn: '-다는 + N is "quoted content used as a modifier before a noun" ("온다는 소식" news of coming — shortened from "온다고 하는" into a modifier); -다고 하다 (g78) is a quote used as a predicate ("온다고 해요" says (they\'re) coming). -다는 is specifically for turning a statement into a noun modifier, followed by 소식/소문/말 etc.',
    toriTip: '🐰 -다는 + 名词 = "说是…的+东西"，把一句话塞进名词前当定语。"합격했다는 소식"（考上了的消息）、"돈이 없다는 핑계"（没钱的借口）。它是 -다고 하는 的缩写，后面最爱跟 소식·소문·말·생각。', toriTipEn: '🐰 -다는 + noun = "the thing that\'s said to be..." — stuff a whole sentence in front of a noun as a modifier. "합격했다는 소식" (news of passing), "돈이 없다는 핑계" (the excuse of having no money). It\'s a shortened form of -다고 하는, and it loves to pair with 소식·소문·말·생각.',
  },

  // =====================================================================
  //  批量提炼扩充 B7b（P26-P27，高级：让步/意图/情态）
  // =====================================================================

  // src: card-p26-l02
  {
    id: 'g189', title: '纵然让步', titleEn: 'Even if concession', pattern: '-(으)ㄹ지라도',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"纵然…也、即使…也"，书面强让步', usageEn: 'Means "even if..." or "even though..." — a strong, formal concession',
    explanation: '接在动词/形容词后，表示即使前项成立，后项也不受影响，相当于"纵然…也、即使…也"。比 -아/어도、-더라도 更书面、语气更强，常用于表达决心、信念，多见于正式或文学语境。常与 비록 搭配。', explanationEn: 'Attached after verbs/adjectives, it means even if the first clause holds, the second is unaffected — equivalent to "even if..." or "even though..." It\'s more formal and stronger than -아/어도 or -더라도, often used to express determination or conviction in formal or literary contexts. Frequently paired with 비록.',
    conjugation: '无收音/ㄹ + ㄹ지라도 (실패하다→실패할지라도)\n有收音 + 을지라도 (있다→있을지라도)\n名词 + (이)ㄹ지라도', conjugationEn: 'No final consonant/ㄹ + ㄹ지라도 (실패하다→실패할지라도)\\nFinal consonant + 을지라도 (있다→있을지라도)\\nNoun + (이)ㄹ지라도',
    examples: [
      { ko: '비록 실패할지라도 도전하겠습니다.', zh: '纵然失败也要挑战。', zhEn: 'Even if I fail, I\'ll take on the challenge.', note: '纵然让步：失败也挑战', noteEn: 'Even if concession: challenge even in failure' },
      { ko: '어려움이 있을지라도 끝까지 갈 거예요.', zh: '纵有困难也要走到最后。', zhEn: 'Even with difficulties, I\'ll go all the way.', note: '纵然让步：有难也坚持', noteEn: 'Even if concession: persist even through hardship' },
      { ko: '가난할지라도 꿈은 잃지 않아요.', zh: '纵然贫穷也不失去梦想。', zhEn: 'Even in poverty, don\'t lose your dreams.', note: '纵然让步：穷也不失梦', noteEn: 'Even if concession: keep dreams even in poverty' },
    ],
    similarPatterns: ['-더라도', '-아/어도'],
    difference: '-(으)ㄹ지라도 是最书面、语气最强的让步（"실패할지라도 도전하겠다"纵然失败也要挑战——表决心）；-더라도（g33）次之；-아/어도（g32）最口语。三者都表"即使…也"，正式度递增：-아/어도 < -더라도 < -(으)ㄹ지라도。', differenceEn: '-(으)ㄹ지라도 is the most formal and strongest concessive (\'실패할지라도 도전하겠다\' — even if I fail, I\'ll try — expressing resolve); -더라도 (g33) is next; -아/어도 (g32) is most colloquial. All three mean \'even if...\', with formality increasing: -아/어도 < -더라도 < -(으)ㄹ지라도.',
    toriTip: '🐰 -(으)ㄹ지라도 = "纵然…也"，让步语气的最高级，书面又铿锵。"무슨 일이 있을지라도"（无论发生什么）。表决心、写誓言时用它气势足，配 비록（虽然）更完整。日常口语用 -아/어도 就够了。', toriTipEn: '🐰 -(으)ㄹ지라도 = \'even if...\' — the highest level of concession, formal and resolute. \'무슨 일이 있을지라도\' (no matter what happens). Use it for resolve and vows for full impact; pair with 비록 (although) for completeness. In everyday speech, -아/어도 is enough.',
  },

  // src: card-p26-l03
  {
    id: 'g190', title: '宁可', titleEn: 'rather', pattern: '-(으)ㄹ지언정',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '연결',
    usage: '表示"宁可…也（不）、就算…也不…"', usageEn: 'Indicates \'would rather... than...\' or \'even if... won\'t...\'',
    explanation: '接在动词/形容词后，表示宁愿接受前项的不利，也绝不做后项，相当于"宁可…也不…"。前项是主动选择承受的代价，后项是坚决拒绝的事。语气强烈，含决绝、有骨气的意味，多为书面。', explanationEn: 'Attached after verbs/adjectives, it means one would rather endure the disadvantage of the preceding clause than do the following clause — equivalent to \'would rather... than...\'. The preceding clause is a cost willingly borne; the following is something firmly refused. The tone is strong, resolute, and principled, mostly in writing.',
    conjugation: '无收音/ㄹ + ㄹ지언정 (가다→갈지언정)\n有收音 + 을지언정 (굶다→굶을지언정, 죽다→죽을지언정)\n名词 + (이)ㄹ지언정', conjugationEn: 'No batchim/ㄹ + ㄹ지언정 (가다→갈지언정)\\nWith batchim + 을지언정 (굶다→굶을지언정, 죽다→죽을지언정)\\nNoun + (이)ㄹ지언정',
    examples: [
      { ko: '굶을지언정 남의 도움은 받지 않겠어요.', zh: '宁可挨饿也不接受别人的帮助。', zhEn: 'I\'d rather starve than accept help from others.', note: '宁可：宁饿不受助', noteEn: 'Rather: starve rather than accept help' },
      { ko: '죽을지언정 거짓말은 하지 않아요.', zh: '宁死也不撒谎。', zhEn: 'I\'d rather die than lie.', note: '宁可：宁死不撒谎', noteEn: 'Rather: die rather than lie' },
      { ko: '늦을지언정 대충하지는 않겠어요.', zh: '宁可晚一点，也绝不马虎。', zhEn: 'Better to be late than careless.', note: '宁可：宁晚不马虎', noteEn: 'Rather: late rather than sloppy' },
    ],
    similarPatterns: ['-(으)ㄹ망정', '-느니'],
    difference: '-(으)ㄹ지언정 是"宁可承受前项也绝不做后项"的决绝（"굶을지언정 안 받겠다"宁饿不受助）；-느니（g34）是"与其…不如…"的取舍比较（"굶느니 받겠다"与其饿不如接受）。지언정 强调"甘愿承受代价、坚决拒绝"，느니 强调"两害相权取其轻"。', differenceEn: '-(으)ㄹ지언정 expresses resolute refusal — \'would rather endure the preceding than do the following\' (\'굶을지언정 안 받겠다\' — I\'d rather starve than accept help); -느니 (g34) is a comparative choice — \'rather than... better to...\' (\'굶느니 받겠다\' — rather than starve, I\'d accept). 지언정 emphasizes \'willingly bearing the cost, firmly refusing\'; 느니 emphasizes \'choosing the lesser of two evils\'.',
    toriTip: '🐰 -(으)ㄹ지언정 = "宁可…也不…"，有骨气的决绝宣言。"질지언정 비겁하게 이기지 않겠다"（宁可输也不卑鄙地赢）。前面放愿意承受的代价，后面放死也不做的事，气节感拉满，书面和演讲里的狠话。', toriTipEn: '🐰 -(으)ㄹ지언정 = \'would rather... than...\' — a principled, resolute declaration. \'질지언정 비겁하게 이기지 않겠다\' (I\'d rather lose than win dishonorably). Put the cost you\'ll bear first, the thing you\'d never do second — full of integrity, a powerful phrase for writing and speeches.',
  },

  // src: card-p26-l04
  {
    id: 'g191', title: '就算也', titleEn: 'even if', pattern: '-(으)ㄹ망정',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '연결',
    usage: '表示"就算…也、虽然…但（仍）"', usageEn: 'Indicates \'even if... still...\' or \'although... (still)...\'',
    explanation: '接在动词/形容词后，表示即使前项是不利/不足的情况，后项仍然成立或坚持，相当于"就算…也、虽然…但"。前项多为负面或不足，后项是与之相对的坚持或肯定。语气较书面。', explanationEn: 'Attached after verbs/adjectives, it means even if the preceding clause is unfavorable or insufficient, the following still holds or persists — equivalent to \'even if... still...\' or \'although... but...\'. The preceding is often negative or lacking; the following is a corresponding persistence or affirmation. The tone is somewhat formal.',
    conjugation: '无收音/ㄹ + ㄹ망정 (가다→갈망정)\n有收音 + 을망정 (작다→작을망정)\n名词 + (이)ㄹ망정', conjugationEn: 'No batchim/ㄹ + ㄹ망정 (가다→갈망정)\\nWith batchim + 을망정 (작다→작을망정)\\nNoun + (이)ㄹ망정',
    examples: [
      { ko: '가난할망정 자존심은 잃지 않아요.', zh: '就算贫穷也不失自尊。', zhEn: 'Even if poor, don\'t lose self-respect.', note: '就算也：穷也有自尊', noteEn: 'Even if: poor but has pride' },
      { ko: '늦게 갈망정 꼭 가겠습니다.', zh: '就算晚点去也一定去。', zhEn: 'Even if late, I\'ll definitely go.', note: '就算也：晚也要去', noteEn: 'Even if: late but still going' },
      { ko: '작을망정 우리 집이에요.', zh: '虽然小也是我们的家。', zhEn: 'Small, but it\'s our home.', note: '就算也：小也是家', noteEn: 'Even if: small but it\'s home' },
    ],
    similarPatterns: ['-(으)ㄹ지언정', '-(으)ㄹ지라도'],
    difference: '-(으)ㄹ망정 是"就算前项（不足/负面）也仍…"，前项让步、后项坚持（"가난할망정 자존심은 있다"穷也有自尊）；-(으)ㄹ지언정 更强调"宁可…也绝不…"的决绝拒绝。망정 侧重"虽有不足但仍坚持某点"，지언정 侧重"甘受代价、坚拒后项"，语气更烈。', differenceEn: '-(으)ㄹ망정 means \'even if the preceding (insufficient/negative) is true, still...\' — the preceding concedes, the following persists (\'가난할망정 자존심은 있다\' — poor but has pride); -(으)ㄹ지언정 more strongly emphasizes \'would rather... than ever...\' — a resolute refusal. 망정 focuses on \'persisting despite shortcomings\'; 지언정 focuses on \'willingly bearing the cost, firmly refusing the following\', with a fiercer tone.',
    toriTip: '🐰 -(으)ㄹ망정 = "就算…也（还是…）"，前面认个短，后面挺个腰。"실수할망정 포기는 안 해"（就算出错也不放弃）。和 지언정 是近亲，망정 语气稍缓，都属书面强让步，日常少用。', toriTipEn: '🐰 -(으)ㄹ망정 = \'even if... (still)...\' — admit a shortcoming first, then stand tall. \'실수할망정 포기는 안 해\' (even if I make mistakes, I won\'t give up). A close cousin of 지언정, but 망정 is slightly milder; both are strong formal concessions, rarely used in daily speech.',
  },

  // src: card-p26-l05
  {
    id: 'g192', title: '哪怕也要', titleEn: 'even at the cost of', pattern: '-는 한이 있어도',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '연결',
    usage: '表示"哪怕到…的地步也要、就算…也在所不惜"', usageEn: 'Indicates \'even if it comes to... I will...\' or \'even at the cost of...\'',
    explanation: '接在动词现在时冠形词形后，表示即使要付出极端代价、走到某个不利地步，也要坚持做后项，相当于"哪怕…也要、就算…也在所不惜"。前项是甘愿承受的极端后果，后项是坚定的意志。也作 -는 한이 있더라도。', explanationEn: 'Attached after the present-tense adnominal form of a verb, it means even if one must pay an extreme price or reach an unfavorable point, one will persist in doing the following — equivalent to \'even at the cost of...\' or \'even if it means...\'. The preceding is an extreme consequence willingly borne; the following is firm resolve. Also appears as -는 한이 있더라도.',
    conjugation: '动词词干 + 는 한이 있어도 / 있더라도\n（한 = 极端地步，固定搭配）', conjugationEn: 'Verb stem + 는 한이 있어도 / 있더라도\\n(한 = extreme point, fixed expression)',
    examples: [
      { ko: '실패하는 한이 있어도 도전해 보고 싶어요.', zh: '即便失败也想挑战一下。', zhEn: 'Even if I fail, I want to give it a try.', note: '哪怕也要：失败也要试', noteEn: 'Even if it means failing, I\'ll try' },
      { ko: '밤을 새우는 한이 있더라도 내일까지 끝낼게요.', zh: '即便熬夜也要在明天之前完成。', zhEn: 'Even if I stay up all night, I\'ll finish it by tomorrow.', note: '哪怕也要：熬夜也完成', noteEn: 'Even if it means staying up all night, I\'ll finish it' },
      { ko: '회사를 그만두는 한이 있어도 이 프로젝트는 꼭 할 거예요.', zh: '就算辞职也要做完这个项目。', zhEn: 'Even if I quit my job, I\'ll finish this project.', note: '哪怕也要：辞职也做完', noteEn: 'Even if it means quitting my job, I\'ll get it done' },
    ],
    similarPatterns: ['-(으)ㄹ지언정', '-더라도'],
    difference: '-는 한이 있어도 强调"哪怕付出极端代价也要坚持"，前项是甘愿承受的最坏地步（"회사를 그만두는 한이 있어도 하겠다"哪怕辞职也要做）；-(으)ㄹ지언정 是"宁可…也不…"。한이 있어도 突出"不惜代价的决心"，后接强意志。', differenceEn: '-는 한이 있어도 emphasizes "persisting even at extreme cost," with the preceding clause being the worst outcome one is willing to endure (e.g., "회사를 그만두는 한이 있어도 하겠다"—even if it means quitting my job, I\'ll do it); -(으)ㄹ지언정 means "rather... than...". 한이 있어도 highlights "resolute determination at any cost," followed by strong will.',
    toriTip: '🐰 -는 한이 있어도 = "哪怕到…地步也要…"，破釜沉舟式的决心。"굶는 한이 있어도 이건 지킨다"（哪怕饿肚子也要守住这个）。前面放最坏的代价，后面放咬牙的坚持，表决心时特别有分量。', toriTipEn: '🐰 -는 한이 있어도 = "even if it comes to... I\'ll..."—a burn-the-boats determination. E.g., "굶는 한이 있어도 이건 지킨다" (even if I go hungry, I\'ll keep this). Put the worst cost first, then the gritted-teeth persistence—it carries real weight when showing resolve.',
  },

  // src: card-p26-l06
  {
    id: 'g193', title: '意欲（书面）', titleEn: 'intention (formal)', pattern: '-고자 (하다)',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"为了…、想要…（正式书面意图）"', usageEn: 'Indicates "in order to... / wanting to..." (formal written intention)',
    explanation: '接在动词后，表示意图、目的或愿望，相当于"为了…、想要…"。-고자 后接动作（为达目的而做），-고자 하다 作谓语表意向。是 -(으)려고 的书面正式版，多见于演讲、公文、正式发言。', explanationEn: 'Attached after a verb stem, it indicates intention, purpose, or desire, equivalent to "in order to... / wanting to...". -고자 is followed by an action (done to achieve a goal), while -고자 하다 serves as the predicate to express intent. It\'s the formal written version of -(으)려고, often found in speeches, official documents, and formal addresses.',
    conjugation: '动词词干 + 고자 (+后续动作)\n动词词干 + 고자 하다 / 합니다（表意向）', conjugationEn: 'Verb stem + 고자 (+ following action)\\nVerb stem + 고자 하다 / 합니다 (expresses intention)',
    examples: [
      { ko: '한국어를 배우고자 왔어요.', zh: '为了学韩语而来。', zhEn: 'I came to learn Korean.', note: '意欲：为学韩语而来', noteEn: 'Intention: came to learn Korean' },
      { ko: '오늘은 이 문제에 대해 말씀드리고자 합니다.', zh: '今天想就这个问题谈一谈。', zhEn: 'Today I\'d like to talk about this issue.', note: '意欲：想谈这问题', noteEn: 'Intention: want to discuss this issue' },
      { ko: '더 나은 미래를 만들고자 노력하고 있습니다.', zh: '为了创造更好的未来而努力。', zhEn: 'Strive to create a better future.', note: '意欲：为更好未来努力', noteEn: 'Intention: strive for a better future' },
    ],
    similarPatterns: ['-(으)려고', '-기 위해서'],
    difference: '-고자 (하다) 是书面正式的意图（"말씀드리고자 합니다"想向您说明——演讲/公文腔）；-(으)려고 是口语意图（"말하려고 해요"想说）；-기 위해서 是"为了目的"。三者都表意图/目的，-고자 最正式、最书面，日常口语几乎不用。', differenceEn: '-고자 (하다) is a formal written expression of intention (e.g., "말씀드리고자 합니다"—I\'d like to address you, speech/official tone); -(으)려고 is colloquial intention (e.g., "말하려고 해요"—I want to say); -기 위해서 means "for the purpose of." All three express intention/purpose, but -고자 is the most formal and written, rarely used in everyday speech.',
    toriTip: '🐰 -고자 하다 = "想要…、意欲…"，演讲开场白专用。"오늘 이 자리를 빌려 감사를 전하고자 합니다"（今天想借此机会致谢）。庄重正式，日常说会很生硬——那时候用 -(으)려고 就好。看懂它，正式发言就不怵了。', toriTipEn: '🐰 -고자 하다 = "want to... / intend to..."—the go-to for speech openers. E.g., "오늘 이 자리를 빌려 감사를 전하고자 합니다" (Today I\'d like to take this opportunity to express my gratitude). It\'s solemn and formal; using it in daily conversation sounds stiff—then just use -(으)려고. Once you get it, formal speeches won\'t faze you.',
  },

  // src: card-p26-l08
  {
    id: 'g194', title: '就而言', titleEn: 'as for', pattern: '-치고 (는)',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '조사',
    usage: '表示"凡是…都…"或"就…而言（算例外）"', usageEn: 'Indicates "every... without exception" or "as for... (as an exception)"',
    explanation: '接在名词后，有两种用法：①-치고 + 否定/无例外，表示"凡是…都…、没有…不…"（全称）；②-치고(는)，表示"就…而言（却出乎意料）"，引出与该类别一般印象不符的评价（例外）。靠后句是否含否定/意外来区分。', explanationEn: 'Attached after a noun, it has two uses: ① -치고 + negation/no exception, meaning "every... without exception / there\'s no... that doesn\'t..." (universal); ② -치고(는), meaning "as for... (unexpectedly)", introducing a judgment that goes against the general impression of that category (exception). Distinguish by whether the following clause contains negation or surprise.',
    conjugation: '名词 + 치고（全称：+ 없다/否定）\n名词 + 치고(는)（例外：+ 意外评价）', conjugationEn: 'Noun + 치고 (universal: + 없다/negation)\\nNoun + 치고(는) (exception: + surprising evaluation)',
    examples: [
      { ko: '한국 사람치고 김치를 안 먹는 사람은 없어요.', zh: '凡是韩国人，没有不吃泡菜的。', zhEn: 'Every Korean eats kimchi—there\'s no exception.', note: '全称：韩国人都吃泡菜', noteEn: 'Universal: All Koreans eat kimchi' },
      { ko: '봄치고 날씨가 너무 추워요.', zh: '作为春天，天气太冷了。', zhEn: 'As spring, the weather is too cold.', note: '例外：春天却这么冷', noteEn: 'Exception: It\'s this cold for spring' },
      { ko: '외국인치고 한국어를 잘하시네요.', zh: '作为外国人，韩语说得真好。', zhEn: 'As a foreigner, you speak Korean really well.', note: '例外：外国人却说得好', noteEn: 'Exception: Speaks well for a foreigner' },
    ],
    similarPatterns: ['마다', '-는데'],
    difference: '-치고 有两义靠后句区分：后接否定表"全称"（"한국 사람치고 김치 안 먹는 사람 없다"凡韩国人都吃泡菜）；后接意外评价表"例外"（"봄치고 춥다"作为春天却冷）。全称义近似 마다（每），例外义强调"不符合该类别常态"。', differenceEn: '-치고 has two meanings distinguished by the following clause: with negation it means "universal" (e.g., "한국 사람치고 김치 안 먹는 사람 없다"—every Korean eats kimchi); with a surprising evaluation it means "exception" (e.g., "봄치고 춥다"—cold for spring). The universal sense is close to 마다 (every), while the exception sense emphasizes "deviating from the norm of that category."',
    toriTip: '🐰 -치고 有两副面孔：配否定＝"凡是…都…"（"학생치고 게임 안 하는 애 없어"没有学生不打游戏的）；配意外＝"就…来说竟然…"（"신인치고 잘하네"作为新人算不错了）。看后半句是"无例外"还是"没想到"来判断。', toriTipEn: '🐰 -치고 has two faces: with negation = "every... without exception" (e.g., "학생치고 게임 안 하는 애 없어"—no student doesn\'t play games); with surprise = "for... it\'s surprisingly..." (e.g., "신인치고 잘하네"—pretty good for a rookie). Check if the second half is "no exception" or "unexpected" to tell them apart.',
  },

  // src: card-p27-l03
  {
    id: 'g195', title: '想必有可能', titleEn: 'Probably possible', pattern: '-(으)ㄹ 법하다',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '문형',
    usage: '表示"想必会…、有可能…、也说得过去"', usageEn: 'Indicates "surely will..., likely..., it makes sense that..."',
    explanation: '接在动词/形容词后，表示某事按常理推断有发生的可能、合乎情理，相当于"想必…、有可能…、也是说得过去的"。含"照道理这也不奇怪"的语感。法 是表"道理、可能性"的依存名词。', explanationEn: 'Attached after verbs/adjectives, it indicates that something is likely to happen or is reasonable by common sense, equivalent to "surely..., likely..., it\'s also plausible." It carries the nuance of "by logic, this isn\'t surprising." 법 is a dependent noun meaning "reason, possibility."',
    conjugation: '无收音/ㄹ + ㄹ 법하다 (오다→올 법하다)\n有收音 + 을 법하다 (있다→있을 법하다, 겪다→겪을 법하다)\n过去 + 았/었을 법하다', conjugationEn: 'No final consonant/ㄹ + ㄹ 법하다 (오다→올 법하다)\\nWith final consonant + 을 법하다 (있다→있을 법하다, 겪다→겪을 법하다)\\nPast + 았/었을 법하다',
    examples: [
      { ko: '그런 일도 있을 법한 일이에요.', zh: '那种事也是可能发生的。', zhEn: 'That kind of thing can happen too.', note: '想必：这种事有可能', noteEn: 'Surely: this kind of thing is possible' },
      { ko: '누구나 한 번쯤 겪을 법한 경험이에요.', zh: '谁都可能经历过一次的经验。', zhEn: 'An experience anyone might have had at least once.', note: '想必：人人可能经历', noteEn: 'Surely: anyone could experience it' },
      { ko: '민수가 벌써 도착했을 법해요.', zh: '民秀想必已经到了。', zhEn: 'Minsu must have already arrived.', note: '想必：应该已经到了', noteEn: 'Surely: should have already arrived' },
    ],
    similarPatterns: ['-(으)ㄹ 만하다', '-(으)ㄹ 것 같다'],
    difference: '-(으)ㄹ 법하다 表"按常理想必会/有可能，合乎情理"（"있을 법한 일"可能发生的事——不稀奇）；-(으)ㄹ 만하다（g117）表"值得做"（"볼 만하다"值得看）。两者形近义不同：법하다 是"合理的可能性"，만하다 是"值得/够格"。',
    toriTip: '🐰 -(으)ㄹ 법하다 = "想必…、也难怪…"，表示合乎情理的推测。"화날 법도 하다"（生气也是情有可原的）、"있을 법한 이야기"（听起来挺真实的故事）。给某事"这也正常"的判断时用它，很有分寸感。', toriTipEn: '🐰 -(으)ㄹ 법하다 = "surely..., no wonder...", indicating a reasonable guess. "화날 법도 하다" (getting angry is understandable), "있을 법한 이야기" (a story that sounds real). Use it to judge something as "that\'s normal," it\'s very measured.',
  },

  // src: card-p27-l04
  {
    id: 'g196', title: '取决于', titleEn: 'depends on', pattern: '-기 나름이다',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"取决于怎么…、全看…"', usageEn: 'Indicates "depends on how..., it\'s all up to..."',
    explanation: '把动词用 -기 名词化后接 나름이다，表示结果取决于前项动作的方式或态度，相当于"取决于怎么…、全看…如何"。强调"同一件事，做法/想法不同结果就不同"。', explanationEn: 'After nominalizing a verb with -기, attach 나름이다 to indicate the result depends on the method or attitude of the preceding action, equivalent to "depends on how..., it\'s all up to...". It emphasizes "the same thing, different approaches/thoughts lead to different results."',
    conjugation: '动词词干 + 기 나름이다\n（也可 名词 + 나름이다：사람 나름이에요）', conjugationEn: 'Verb stem + 기 나름이다\\n(also Noun + 나름이다: 사람 나름이에요)',
    examples: [
      { ko: '성공은 노력하기 나름이에요.', zh: '成功取决于你怎么努力。', zhEn: 'Success depends on how you try.', note: '取决于：看怎么努力', noteEn: 'Depends on: how you try' },
      { ko: '결과는 생각하기 나름이에요.', zh: '结果取决于你怎么想。', zhEn: 'The result depends on how you think.', note: '取决于：看怎么想', noteEn: 'Depends on: how you think' },
      { ko: '행복은 마음먹기 나름이에요.', zh: '幸福在于你的心态。', zhEn: 'Happiness lies in your mindset.', note: '取决于：看心态', noteEn: 'Depends on: your mindset' },
    ],
    similarPatterns: ['-기에 달려 있다', '-기 마련이다'],
    difference: '-기 나름이다 强调"取决于做法/态度，因人而异"（"생각하기 나름이에요"看你怎么想——想法不同结果不同）；-기에 달려 있다 也表"取决于"但更侧重"关键在于某条件"。两者义近常可换，나름이다 更口语、更强调"因方式/人而异"。', differenceEn: '-기 나름이다 emphasizes "depends on the method/attitude, varies by person" ("생각하기 나름이에요" it depends on how you think — different thoughts, different results); -기에 달려 있다 also means "depends on" but focuses more on "the key is a certain condition." They\'re similar and often interchangeable, but 나름이다 is more colloquial and emphasizes "varies by method/person."',
    toriTip: '🐰 -기 나름이다 = "全看你怎么…、取决于…"，充满辩证味。"모든 건 마음먹기 나름이에요"（一切在于心态）。安慰人或讲道理时超好用——同样的事，"하기 나름"（就看怎么做），命运掌握在自己手里。', toriTipEn: '🐰 -기 나름이다 = "it\'s all up to how you..., depends on...", full of dialectical flavor. "모든 건 마음먹기 나름이에요" (everything depends on your mindset). Great for comforting or reasoning — the same thing, "하기 나름" (it\'s how you do it), your fate is in your own hands.',
  },

  // src: card-p27-l05
  {
    id: 'g197', title: '在于', titleEn: 'lies in', pattern: '-기에 달려 있다 / N에 달려 있다',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"在于…、取决于…"', usageEn: 'Indicates "lies in..., depends on..."',
    explanation: '表示某结果由某条件决定，相当于"在于…、取决于…"。动词用 -기에 달려 있다，名词用 N에 달려 있다。强调"成败/结果的关键就系于此"。', explanationEn: 'Indicates that a result is determined by a certain condition, equivalent to "lies in... depends on...". For verbs, use -기에 달려 있다; for nouns, use N에 달려 있다. Emphasizes that "the key to success/failure or the outcome hinges on this."',
    conjugation: '动词词干 + 기에 달려 있다\n名词 + 에 달려 있다 (선택에 달려 있다)', conjugationEn: 'Verb stem + 기에 달려 있다\\nNoun + 에 달려 있다 (선택에 달려 있다)',
    examples: [
      { ko: '성공은 노력하기에 달려 있어요.', zh: '成功在于努力。', zhEn: 'Success depends on effort.', note: '在于：成功靠努力', noteEn: 'Lies in: success depends on effort' },
      { ko: '결과는 어떻게 준비하기에 달려 있어요.', zh: '结果取决于怎么准备。', zhEn: 'The result depends on how you prepare.', note: '在于：结果看准备', noteEn: 'Lies in: the outcome depends on preparation' },
      { ko: '우리의 미래는 오늘의 선택에 달려 있어요.', zh: '我们的未来取决于今天的选择。', zhEn: 'Our future depends on today\'s choices.', note: '在于：未来靠今天选择', noteEn: 'Lies in: the future depends on today\'s choices' },
    ],
    similarPatterns: ['-기 나름이다'],
    difference: '-기에 달려 있다 强调"关键系于某条件"，可接名词（N에 달려 있다，"선택에 달려 있다"取决于选择）；-기 나름이다 更强调"因做法/人而异"，一般只接 -기。两者都表"取决于"，달려 있다 更突出"决定性关键"，且能直接接名词。', differenceEn: '-기에 달려 있다 emphasizes that "the key hinges on a certain condition" and can attach to nouns (N에 달려 있다, "선택에 달려 있다" depends on the choice); -기 나름이다 emphasizes more that "it varies by method/person" and generally only attaches to -기. Both mean "depends on," but 달려 있다 highlights the "decisive key" and can directly attach to nouns.',
    toriTip: '🐰 -기에 달려 있다 / -에 달려 있다 = "在于…、取决于…"，点出关键所在。"모든 건 너에게 달려 있어"（一切取决于你）。名词直接加 에 달려 있다 最方便："성적은 노력에 달려 있다"（成绩在于努力）。', toriTipEn: '🐰 -기에 달려 있다 / -에 달려 있다 = "lies in... / depends on...", pointing out the key. "모든 건 너에게 달려 있어" (everything depends on you). Adding 에 달려 있다 directly to a noun is easiest: "성적은 노력에 달려 있다" (grades depend on effort).',
  },

  // src: card-p27-l06
  {
    id: 'g198', title: '算是', titleEn: 'considered as', pattern: '-는/(으)ㄴ 셈이다',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"算是…、等于…（大致相当于）"', usageEn: 'Means "can be considered... / is equivalent to... (roughly)"',
    explanation: '接在冠形词形后加 셈이다，表示经过衡量后得出的大致结论，相当于"算是…、等于…、差不多…"。셈 意为"计算、盘算"，表示"综合来看大致相当于某种情况"。', explanationEn: 'Added after an adnominal form with 셈이다, it indicates a rough conclusion drawn after weighing things, equivalent to "can be considered... / is equivalent to... / roughly...". 셈 means "calculation, reckoning", indicating "overall, it roughly amounts to a certain situation".',
    conjugation: '动词现在 + 는 셈이다 (오는→다 온 셈이다·过去)\n动词过去 + (으)ㄴ 셈이다\n形容词 + (으)ㄴ 셈이다\n名词 + 인 셈이다', conjugationEn: 'Verb present + 는 셈이다 (오는→다 온 셈이다·past)\\nVerb past + (으)ㄴ 셈이다\\nAdjective + (으)ㄴ 셈이다\\nNoun + 인 셈이다',
    examples: [
      { ko: '이 정도면 잘 사는 셈이에요.', zh: '这种程度算是过得好了。', zhEn: 'This level counts as living well.', note: '算是：算过得好', noteEn: 'Can be considered: can be considered living well' },
      { ko: '5만 원이면 싼 셈이에요.', zh: '5万韩元算便宜了。', zhEn: '50,000 won is considered cheap.', note: '算是：算便宜', noteEn: 'Can be considered: can be considered cheap' },
      { ko: '민수는 거의 다 온 셈이에요.', zh: '民秀算是快到了。', zhEn: 'Minsu is almost here, so to speak.', note: '算是：算快到了', noteEn: 'Can be considered: can be considered almost there' },
    ],
    similarPatterns: ['-는 셈치다', '-(으)ㄴ 편이다'],
    difference: '-는 셈이다 是"综合衡量后算是/等于…"的客观估算（"싼 셈이에요"算便宜了——权衡后的判断）；-는 셈치다 是"就当作…"的假定（"산 셈치고"就当买了）；-(으)ㄴ 편이다（g72）是"倾向于属于…一类"。셈이다 是估算结论，셈치다 是主观假定。', differenceEn: '-는 셈이다 is an objective estimate of "after weighing, it counts as / equals..." ("싼 셈이에요" it\'s cheap—a judgment after weighing); -는 셈치다 is an assumption of "just consider it as..." ("산 셈치고" just consider it bought); -(으)ㄴ 편이다 (g72) is "tends to belong to... a category". 셈이다 is an estimated conclusion, 셈치다 is a subjective assumption.',
    toriTip: '🐰 -는 셈이다 = "算是…、等于…"，掰指头一算的结论。"이 정도면 성공한 셈이지"（这样算是成功了吧）。给一件事下"大致相当于…"的判断时用它，比"이다"（是）留了余地，更像"综合来看差不多"。', toriTipEn: '🐰 -는 셈이다 = "can be considered... / equals...", the conclusion after counting on your fingers. "이 정도면 성공한 셈이지" (this counts as success, right?). Use it when making a judgment that something "roughly amounts to...", leaving more room than "이다" (is), more like "overall, it\'s about the same".',
  },

  // src: card-p27-l07
  {
    id: 'g199', title: '就当作', titleEn: 'Just consider it as', pattern: '-는/(으)ㄴ 셈치다',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"就当作…、就算…（假定）"', usageEn: 'Means "just consider it as... / even if... (assumption)"',
    explanation: '接在冠形词形后加 셈치다，表示把某种并非事实的情况当作事实来看待、接受，相当于"就当作…、就算…、权当…"。常用于自我宽慰、退一步接受，后句 -고 引出基于该假定的行动。', explanationEn: 'Added after an adnominal form with 셈치다, it means treating a non-factual situation as fact and accepting it, equivalent to "just consider it as... / even if... / count it as...". Often used for self-consolation or accepting things with a step back, with the following clause -고 introducing an action based on that assumption.',
    conjugation: '动词现在 + 는 셈치다 (쉬는 셈치고)\n动词过去 + (으)ㄴ 셈치다 (속은 셈치고)\n常搭配 -는 셈치고 + 后续动作', conjugationEn: 'Verb present + 는 셈치다 (쉬는 셈치고)\\nVerb past + (으)ㄴ 셈치다 (속은 셈치고)\\nOften paired with -는 셈치고 + following action',
    examples: [
      { ko: '오늘은 쉬는 셈치고 아무 것도 안 할래요.', zh: '今天就当休息，什么都不做。', zhEn: 'Let\'s just treat today as a rest day and do nothing.', note: '就当作：当作休息', noteEn: 'Just consider it as: consider it as rest' },
      { ko: '속은 셈치고 잊어버려요.', zh: '就当被骗了，忘了吧。', zhEn: 'Just consider yourself scammed and forget it.', note: '就当作：当作被骗', noteEn: 'Just consider it as: consider it as being fooled' },
      { ko: '5만 원을 잃어버린 셈치고 기부했어요.', zh: '就当丢了5万块，捐掉了。', zhEn: 'Treat it as if you lost 50,000 won and donated it.', note: '就当作：当作丢了钱', noteEn: 'Just consider it as: consider it as losing money' },
    ],
    similarPatterns: ['-는 셈이다', '-(으)ㄴ 셈치고'],
    difference: '-는 셈치다 是"把非事实当作事实来接受"的主观假定，多用于自我宽慰（"속은 셈치고 잊어라"就当被骗了忘了吧——其实计较也没用）；-는 셈이다 是"综合衡量算是…"的客观估算（"싼 셈이다"算便宜）。셈치다 是"权当如此"，셈이다 是"实际约等于"。', differenceEn: '-는 셈치다 is a subjective assumption of "accepting a non-fact as fact", often used for self-consolation ("속은 셈치고 잊어라" just consider yourself fooled and forget it—dwelling on it is useless anyway); -는 셈이다 is an objective estimate of "after weighing, it counts as..." ("싼 셈이다" it\'s cheap). 셈치다 is "just take it as such", 셈이다 is "actually roughly equals".',
    toriTip: '🐰 -는 셈치고 = "就当作…吧"，自我宽慰的神句。"속은 셈치고 잊어버려"（就当被骗了，忘了吧）、"운동한 셈치자"（就当锻炼了吧）。把不如意的事"权当…"一下，心里就好受多了，很治愈的一个语法。', toriTipEn: '🐰 -는 셈치고 = "just consider it as...", the magic phrase for self-consolation. "속은 셈치고 잊어버려" (just consider yourself fooled and forget it), "운동한 셈치자" (let\'s just consider it exercise). By "counting" unpleasant things as something else, you feel much better—a very healing grammar point.',
  },

  // =====================================================================
  //  批量提炼扩充 B8（P28-P29，跳过P30，高级：强调感叹/书面新闻体）
  // =====================================================================

  // src: card-p28-l01
  {
    id: 'g200', title: '做起来', titleEn: 'Doing it', pattern: '-기(가) + 형용사',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"做…起来（怎么样）"，评价动作难易/感受', usageEn: 'Means "how it is to do...", evaluating the difficulty/feeling of an action',
    explanation: '把动词用 -기 名词化后作主语，接形容词（좋다/편하다/쉽다/어렵다/힘들다 等），评价这个动作做起来的难易或感受，相当于"…起来（好/难/方便…）"。조사 가 可省略。是评价动作体验的高频结构。', explanationEn: 'After nominalizing a verb with -기 as the subject, followed by an adjective (좋다/편하다/쉽다/어렵다/힘들다, etc.), it evaluates the difficulty or feeling of doing that action, equivalent to "...to do (well/hard/conveniently...)". The particle 가 can be omitted. It\'s a high-frequency structure for evaluating the experience of an action.',
    conjugation: '动词词干 + 기(가) + 형용사\n먹기 좋다 / 읽기 쉽다 / 배우기 어렵다\n하기 편하다 / 살기 힘들다', conjugationEn: 'Verb stem + 기(가) + adjective\\n먹기 좋다 / 읽기 쉽다 / 배우기 어렵다\\n하기 편하다 / 살기 힘들다',
    examples: [
      { ko: '한국어는 배우기가 어려워요.', zh: '韩语学起来难。', zhEn: 'Korean is hard to learn.', note: '做起来：学起来难', noteEn: 'Doing it: hard to learn' },
      { ko: '이 책은 읽기 쉬워요.', zh: '这本书读起来容易。', zhEn: 'This book is easy to read.', note: '做起来：读起来容易', noteEn: 'Doing it: easy to read' },
      { ko: '혼자 살기가 편해요.', zh: '一个人住方便。', zhEn: 'Living alone is convenient.', note: '做起来：住起来方便', noteEn: 'Doing it: convenient to live in' },
    ],
    similarPatterns: ['-기', '-기 좋다'],
    difference: '-기(가) + 형용사 是把动作名词化后评价其难易/感受（"배우기가 어려워요"学起来难）；单纯的 -기（g13）只是名词化。这里 -기 作主语、后接评价形容词，是"动作+体验评价"的固定框架，常省略 가。', differenceEn: '-기(가) + adjective nominalizes an action to evaluate its difficulty/feel ("배우기가 어려워요"—hard to learn); plain -기 (g13) just nominalizes. Here -기 acts as the subject followed by an evaluative adjective—a fixed frame for "action + experience evaluation," often dropping 가.',
    toriTip: '🐰 -기(가) + 形容词 = "…起来怎么样"，评价体验的万能框架。"먹기 편해요"（吃起来方便）、"쓰기 어려워요"（写起来难）。口语里 가 常省掉。想说某件事做起来什么感觉，动词加 -기 再配形容词就行。', toriTipEn: '🐰 -기(가) + adjective = "how it is to..."—the go-to frame for evaluating experiences. "먹기 편해요" (convenient to eat), "쓰기 어려워요" (hard to write). In speech, 가 is often dropped. To say how something feels to do, just add -기 to the verb and pair it with an adjective.',
  },

  // src: card-p28-l02
  {
    id: 'g201', title: '感叹（多么）', titleEn: 'Exclamation (how)', pattern: '얼마나 -는지/(으)ㄴ지 모르다',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '문형',
    usage: '表示"不知道有多么…、…得不得了"的强调感叹', usageEn: 'Emphatic exclamation meaning "you wouldn\'t believe how..." or "unbelievably..."',
    explanation: '用 얼마나（多么）配 -는지/(으)ㄴ지 모르다（不知…），构成强调感叹，相当于"不知有多…、…得不得了"。字面是"不知道有多么…"，实为强调程度之深的感叹，并非真的不知道。', explanationEn: 'Using 얼마나 (how) with -는지/(으)ㄴ지 모르다 (not know) forms an emphatic exclamation, equivalent to "you wouldn\'t believe how..." or "unbelievably...". Literally "don\'t know how much," but actually stresses depth—not genuine ignorance.',
    conjugation: '얼마나 + 动词 + 는지 모르다\n얼마나 + 形容词 + (으)ㄴ지 모르다\n过去：얼마나 + 았/었는지 모르다', conjugationEn: '얼마나 + verb + 는지 모르다\\n얼마나 + adjective + (으)ㄴ지 모르다\\nPast: 얼마나 + 았/었는지 모르다',
    examples: [
      { ko: '한국어가 얼마나 어려운지 몰라요.', zh: '韩语不知有多难。', zhEn: 'Korean is unbelievably hard.', note: '感叹：难得不得了', noteEn: 'Exclamation: unbelievably rare' },
      { ko: '민수가 얼마나 열심히 공부하는지 몰라요.', zh: '民秀不知有多用功学习。', zhEn: 'Min-su studies incredibly hard.', note: '感叹：用功得不得了', noteEn: 'Exclamation: unbelievably hardworking' },
      { ko: '어제 얼마나 웃었는지 몰라요.', zh: '昨天不知笑得有多厉害。', zhEn: 'We laughed so hard yesterday.', note: '感叹：笑得不得了', noteEn: 'Exclamation: laughing uncontrollably' },
    ],
    similarPatterns: ['-(으)ㄴ/는지', '얼마나'],
    difference: '얼마나 -는지 모르다 是"强调程度深"的感叹（"얼마나 예쁜지 몰라요"不知有多漂亮——其实是说非常漂亮）；单纯 -(으)ㄴ/는지（g80）是"不确定/间接疑问"（"예쁜지 몰라요"不知道漂不漂亮——真的不确定）。加 얼마나 后是感叹，无 얼마나 是真不知。', differenceEn: '얼마나 -는지 모르다 is an exclamation stressing depth ("얼마나 예쁜지 몰라요"—you wouldn\'t believe how pretty, meaning very pretty); plain -(으)ㄴ/는지 (g80) is "uncertainty/indirect question" ("예쁜지 몰라요"—don\'t know if pretty, genuinely unsure). With 얼마나 it\'s an exclamation; without, it\'s real ignorance.',
    toriTip: '🐰 얼마나 -는지 몰라요 = "不知有多…啊"，夸张感叹的招牌。"얼마나 맛있는지 몰라요"（不知有多好吃）＝超级好吃。别理解成"不知道"，它其实是"太…了"的意思，韩国人夸张表达时超爱用。', toriTipEn: '🐰 얼마나 -는지 몰라요 = "you wouldn\'t believe how..."—the signature of exaggerated exclamation. "얼마나 맛있는지 몰라요" (you wouldn\'t believe how tasty) = super tasty. Don\'t read it as "don\'t know"—it really means "so... that," a favorite for Korean hyperbole.',
  },

  // src: card-p28-l03
  {
    id: 'g202', title: '甚至到', titleEn: 'Even to the point of', pattern: '-다(가) 못해',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '연결',
    usage: '表示"…到极点甚至…、…得不能再…"', usageEn: 'Indicates "to the extreme, even..." or "so... that it can\'t go further."',
    explanation: '接在动词/形容词后，表示程度达到极限，甚至发展到后项的地步，相当于"…到极点甚至…、…得不能再…以至于…"。前项是达到极致的状态，后项是由此引发的进一步（常出乎意料的）结果或转变。', explanationEn: 'Attached after verbs/adjectives, it shows the degree reaching its limit, even progressing to the following clause—equivalent to "to the extreme, even..." or "so... that it can\'t go further, to the point of...". The first part is an extreme state; the second is a further (often surprising) result or shift.',
    conjugation: '动词/形容词词干 + 다 못해\n（形容词：파랗다 못해 / 动词：기다리다 못해）', conjugationEn: 'Verb/adjective stem + 다 못해\\n(Adjective: 파랗다 못해 / Verb: 기다리다 못해)',
    examples: [
      { ko: '하늘이 파랗다 못해 눈이 부실 정도예요.', zh: '天蓝到刺眼的程度。', zhEn: 'The sky is so blue it\'s blinding.', note: '甚至到：蓝到刺眼', noteEn: 'Even to the point of: so blue it\'s dazzling' },
      { ko: '기다리다 못해 먼저 갔어요.', zh: '等不及了，先走了。', zhEn: 'I couldn\'t wait anymore, so I left first.', note: '甚至到：等到极限先走', noteEn: 'Even to the point of: waited so long, left first' },
      { ko: '화가 나다 못해 눈물이 났어요.', zh: '气到掉眼泪。', zhEn: 'I was so angry I cried.', note: '甚至到：气到落泪', noteEn: 'Even to the point of: so angry, tears fell' },
    ],
    similarPatterns: ['-(으)ㄹ 정도로', '-다 못해'],
    difference: '-다 못해 强调"到达极限，甚至转向后项"（"파랗다 못해 눈이 부시다"蓝到刺眼——极致后的进一步）；-(으)ㄹ 정도로（g37）是"到…的程度"的程度状语。다 못해 特有"超过了承受/常态的临界，引发意外后果"的语感。', differenceEn: '-다 못해 stresses "reaching the limit, even shifting to the next part" ("파랗다 못해 눈이 부시다"—so blue it\'s dazzling, a step beyond the extreme); -(으)ㄹ 정도로 (g37) is a degree adverbial meaning "to the extent of." 다 못해 carries a nuance of "crossing the threshold of endurance/norm, triggering unexpected results."',
    toriTip: '🐰 -다 못해 = "…到极点，甚至…"，形容超出想象的程度。"하얗다 못해 창백하다"（白到发青）、"참다 못해 폭발했어"（忍无可忍爆发了）。前面到极致，后面往往是质变，文学味很浓。', toriTipEn: '🐰 -다 못해 = "to the extreme, even..."—describing an unimaginable degree. "하얗다 못해 창백하다" (so white it\'s pale), "참다 못해 폭발했어" (couldn\'t hold back and exploded). The first part hits the limit; the second often marks a qualitative shift—very literary.',
  },

  // src: card-p28-l05
  {
    id: 'g203', title: '想必多么', titleEn: 'Must be how', pattern: '오죽 -(으)면',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '연결',
    usage: '表示"该多么…才…、想必…（体谅推测）"', usageEn: 'Indicates "how... must it be to..." or "must be..." (empathetic speculation).',
    explanation: '用 오죽（该多么）配 -(으)면，构成反问式感叹，表示体谅或推测某种极端情况，相当于"该多么…才会…、想必是…吧"。用于设身处地地理解对方处境，后句常以反问收尾（-겠어요?/-았을까요?）。也说 오죽하면。', explanationEn: 'Using 오죽 (how much) with -(으)면 forms a rhetorical exclamation, showing empathy or speculation about an extreme situation—equivalent to "how... must it be to..." or "it must be...". Used to put yourself in someone\'s shoes; the following clause often ends with a rhetorical question (-겠어요?/-았을까요?). Also said as 오죽하면.',
    conjugation: '오죽 + 动词/形容词 + (으)면\n오죽하면 (固定形)\n后句常接 -겠어요? / -았을까요?', conjugationEn: '오죽 + verb/adjective + (으)면\\n오죽하면 (fixed form)\\nFollowed by -겠어요? / -았을까요?',
    examples: [
      { ko: '오죽 힘들면 그런 말을 했겠어요.', zh: '得多累啊才说出那种话。', zhEn: 'How exhausted must you be to say something like that?', note: '想必多么：多累才那么说', noteEn: 'Must be how: how tired must they have been to say that' },
      { ko: '오죽 배고팠으면 그렇게 많이 먹었을까요.', zh: '得多饿啊才吃那么多。', zhEn: 'How hungry must you be to eat that much?', note: '想必多么：多饿才吃那么多', noteEn: 'How hungry must one be to eat that much' },
      { ko: '오죽하면 눈물이 났겠어요?', zh: '得多难过才会掉眼泪呢？', zhEn: 'How sad must you be to shed tears?', note: '想必多么：多难过才落泪', noteEn: 'How sad must one be to shed tears' },
    ],
    similarPatterns: ['얼마나 -는지 모르다', '-(으)면'],
    difference: '오죽 -(으)면 是"体谅式推测"，设身处地推想对方处境之极端（"오죽 힘들면 그랬겠어요"该多难才那样——理解对方）；얼마나 -는지 모르다 是"程度感叹"（自己的强烈感受）。오죽 特有"换位理解、想必是迫不得已"的共情语气，后接反问。', differenceEn: '오죽 -(으)면 is an "empathetic conjecture," putting yourself in the other\'s shoes to imagine their extreme situation ("오죽 힘들면 그랬겠어요" — how hard must it have been for them to act that way — understanding the other); 얼마나 -는지 모르다 is a "degree exclamation" (your own strong feeling). 오죽 has a unique empathetic tone of "understanding by putting yourself in their place, assuming it was unavoidable," followed by a rhetorical question.',
    toriTip: '🐰 오죽 -(으)면 = "得多…才…啊"，体谅别人的暖心句。"오죽 답답하면 그랬겠어"（得多憋屈才那样啊）。表面是反问，实则在替对方开脱、表示理解。共情、劝解时用它，特别有人情味。', toriTipEn: '🐰 오죽 -(으)면 = "How much... to..." — a heartwarming phrase that shows empathy. "오죽 답답하면 그랬겠어" (How stifled must they have felt to act that way). On the surface it\'s a rhetorical question, but it\'s actually excusing the other person and showing understanding. Use it when empathizing or consoling — it\'s especially humane.',
  },

  // src: card-p28-l08
  {
    id: 'g204', title: '唯有而已', titleEn: 'Only that\'s all', pattern: '-(으)ㄹ 따름이다',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '문형',
    usage: '表示"只是…而已、唯有…"，书面', usageEn: 'Means "just... that\'s all, only..." — formal/written',
    explanation: '接在动词/形容词后，表示除此之外别无其他，相当于"只是…而已、唯有…罢了"。与 -(으)ㄹ 뿐이다 义近但更书面、更郑重，常用于表达谦逊、感激、遗憾等情绪的正式场合。', explanationEn: 'Attached after verbs/adjectives, it means "there is nothing else besides this," equivalent to "just... that\'s all, only... and nothing more." Similar in meaning to -(으)ㄹ 뿐이다 but more formal and solemn, often used in formal settings to express humility, gratitude, or regret.',
    conjugation: '无收音/ㄹ + ㄹ 따름이다 (감사하다→감사할 따름이다)\n有收音 + 을 따름이다 (있다→있을 따름이다)\n过去 + 았/었을 따름이다', conjugationEn: 'No batchim/ㄹ + ㄹ 따름이다 (감사하다→감사할 따름이다)\\nWith batchim + 을 따름이다 (있다→있을 따름이다)\\nPast + 았/었을 따름이다',
    examples: [
      { ko: '그저 감사할 따름이에요.', zh: '只是感激而已。', zhEn: 'It\'s just gratitude.', note: '唯有：只是感激', noteEn: 'Only: just grateful' },
      { ko: '제 할 일을 했을 따름이에요.', zh: '只是做了本分而已。', zhEn: 'I just did my duty.', note: '唯有：只是尽本分', noteEn: 'Only: just doing one\'s duty' },
      { ko: '그저 부끄러울 따름입니다.', zh: '只是感到惭愧而已。', zhEn: 'I just feel ashamed.', note: '唯有：只是惭愧', noteEn: 'Only: just ashamed' },
    ],
    similarPatterns: ['-(으)ㄹ 뿐이다', '-(으)ㄹ 뿐'],
    difference: '-(으)ㄹ 따름이다 与 -(으)ㄹ 뿐이다（g109）都表"只是…而已"，但 따름이다 更书面、更郑重，多用于正式致辞表谦逊/感激（"감사할 따름입니다"唯有感激）；뿐이다 更通用口语。想在正式场合谦逊表态时用 따름이다。', differenceEn: '-(으)ㄹ 따름이다 and -(으)ㄹ 뿐이다 (g109) both mean "just... that\'s all," but 따름이다 is more formal and solemn, often used in formal speeches to express humility/gratitude ("감사할 따름입니다" — I am only grateful); 뿐이다 is more common in speech. Use 따름이다 when you want to humbly express yourself in formal settings.',
    toriTip: '🐰 -(으)ㄹ 따름이다 = "只是…而已"，比 -(으)ㄹ 뿐이다 更庄重的谦辞。"최선을 다했을 따름입니다"（只是尽了全力而已）。获奖感言、正式致谢时用它显得谦逊有涵养，日常聊天用 -(으)ㄹ 뿐이에요 就好。', toriTipEn: '🐰 -(으)ㄹ 따름이다 = "just... that\'s all," a more solemn humble expression than -(으)ㄹ 뿐이다. "최선을 다했을 따름입니다" (I just did my best). Use it in acceptance speeches or formal thanks to appear humble and refined; in everyday chat, just use -(으)ㄹ 뿐이에요.',
  },

  // src: card-p29-l01
  {
    id: 'g205', title: '据悉', titleEn: 'It is reported', pattern: '-(으)ㄴ/는 것으로 알려지다/전해지다',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '문형',
    usage: '新闻体"据悉…、据报道…、据传…"', usageEn: 'News style "it is reported... according to reports... it is said..."',
    explanation: '在冠形词形后接 것으로 알려지다（据悉/为人所知）或 것으로 전해지다（据传/据转述），表示信息来自外界报道或传闻，相当于"据悉…、据报道…"。是新闻、报道中转述未经本人确认信息的典型客观句式。', explanationEn: 'After the adnominal form, attach 것으로 알려지다 (it is known/reported) or 것으로 전해지다 (it is said/relayed), indicating the information comes from external reports or rumors, equivalent to "it is reported... according to reports..." This is a typical objective sentence pattern in news and reports for relaying information not confirmed by the person involved.',
    conjugation: '动词现在 + 는 것으로 알려지다/전해지다\n动词过去/形容词 + (으)ㄴ 것으로 알려지다\n（书面终结：알려졌다/전해졌다）', conjugationEn: 'Verb present + 는 것으로 알려지다/전해지다\\nVerb past/adjective + (으)ㄴ 것으로 알려지다\\n(Formal ending: 알려졌다/전해졌다)',
    examples: [
      { ko: '이번 사고는 운전자의 부주의로 발생한 것으로 알려졌다.', zh: '据悉本次事故是因驾驶员疏忽而发生的。', zhEn: 'It is reported that the accident occurred due to the driver\'s negligence.', note: '据悉：据悉事故原因', noteEn: 'It is reported: the cause of the accident is reported' },
      { ko: '해당 업체는 이미 파산 신청을 한 것으로 전해졌다.', zh: '据传该公司已经申请了破产。', zhEn: 'It is said that the company has filed for bankruptcy.', note: '据传：据传已破产', noteEn: 'It is said: reportedly bankrupt' },
      { ko: '두 회사는 협력 관계를 유지하고 있는 것으로 알려졌다.', zh: '据悉两家公司仍保持合作关系。', zhEn: 'The two companies are reported to still maintain their partnership.', note: '据悉：据悉维持合作', noteEn: 'It is reported: cooperation is reported to continue' },
    ],
    similarPatterns: ['-(으)ㄴ/는 것으로 나타나다', '-다고 하다'],
    difference: '것으로 알려지다/전해지다 用于"来自报道/传闻的信息"（"발생한 것으로 알려졌다"据悉发生了——消息来源是外界）；것으로 나타나다/드러나다 用于"调查/数据显示的结果"（客观数据）。알려지다 是"据传/据悉"，나타나다 是"（数据）表明"，信息来源不同。', differenceEn: '것으로 알려지다/전해지다 is used for "information from reports/rumors" ("발생한 것으로 알려졌다" — it is reported to have occurred — the source is external); 것으로 나타나다/드러나다 is used for "results shown by surveys/data" (objective data). 알려지다 means "it is said/reported," 나타나다 means "(data) shows," — the information sources differ.',
    toriTip: '🐰 -는 것으로 알려졌다 = "据悉/据报道…"，新闻播报的标准句式。读韩语新闻满眼都是它。它的作用是"这消息不是我说的，是外界传的"，把责任摘干净——记者体的客观腔调，看懂它读新闻就通了。', toriTipEn: '🐰 -는 것으로 알려졌다 = "It is reported that..." — the standard sentence pattern in news broadcasts. You\'ll see it everywhere when reading Korean news. Its function is "this news isn\'t from me, it\'s from outside sources," shifting responsibility — the objective tone of journalism. Once you understand it, reading the news becomes easy.',
  },

  // src: card-p29-l02
  {
    id: 'g206', title: '调查显示', titleEn: 'Survey shows', pattern: '-(으)ㄴ/는 것으로 나타나다/드러나다',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '문형',
    usage: '新闻体"结果显示…、调查表明…"', usageEn: 'News style "results show... survey indicates..."',
    explanation: '在冠形词形后接 것으로 나타나다（显现/表明）或 것으로 드러나다（暴露/查明），表示某结论由调查、统计、研究等客观依据得出，相当于"结果显示…、调查表明…"。나타나다 中性表"呈现"，드러나다 常暗示"（原本不明的）真相被揭露"。', explanationEn: 'After the adnominal form, attach 것으로 나타나다 (to appear/indicate) or 것으로 드러나다 (to be revealed/found), indicating a conclusion drawn from objective evidence such as surveys, statistics, or research, equivalent to "results show... survey indicates..." 나타나다 is neutral, meaning "to appear," while 드러나다 often implies "(previously unknown) truth being exposed."',
    conjugation: '动词现在 + 는 것으로 나타나다/드러나다\n动词过去/形容词 + (으)ㄴ 것으로 나타나다\n（书面终结：나타났다/드러났다）', conjugationEn: 'Verb present + 는 것으로 나타나다/드러나다\\nVerb past/Adjective + (으)ㄴ 것으로 나타나다\\n(Written ending: 나타났다/드러났다)',
    examples: [
      { ko: '설문 조사 결과 응답자의 70%가 반대하는 것으로 나타났다.', zh: '问卷调查显示70%的受访者反对。', zhEn: 'The survey shows 70% of respondents oppose it.', note: '调查显示：70%反对', noteEn: 'Survey shows: 70% oppose' },
      { ko: '조사 결과 청소년의 흡연율이 크게 증가한 것으로 드러났다.', zh: '调查结果显示青少年吸烟率大幅上升。', zhEn: 'The survey results showed a sharp rise in teen smoking rates.', note: '调查显示：吸烟率上升', noteEn: 'Survey shows: smoking rate rising' },
      { ko: '이번 통계에서 서울의 물가가 가장 높은 것으로 나타났다.', zh: '本次统计显示首尔物价最高。', zhEn: 'This statistic shows that Seoul has the highest prices.', note: '调查显示：首尔物价最高', noteEn: 'Survey shows: Seoul has highest prices' },
    ],
    similarPatterns: ['-(으)ㄴ/는 것으로 알려지다', '-(으)ㄹ 전망이다'],
    difference: '것으로 나타나다/드러나다 用于"调查/数据得出的客观结果"（"70%가 반대하는 것으로 나타났다"显示70%反对——有数据支撑）；것으로 알려지다 是"来自传闻/报道"（未必有硬数据）。나타나다 靠调查数据，알려지다 靠外界消息，可信来源不同。', differenceEn: '것으로 나타나다/드러나다 is used for objective results from surveys/data ("70%가 반대하는 것으로 나타났다" shows 70% oppose—backed by data); 것으로 알려지다 is "from rumors/reports" (not necessarily hard data). 나타나다 relies on survey data, 알려지다 on outside information—different sources of credibility.',
    toriTip: '🐰 -는 것으로 나타났다 = "（调查/数据）显示…"，报告和新闻里数据说话的句式。"조사 결과 …로 나타났다"（调查结果显示…）。前面一定有调查、统计做依据，比 알려지다（据传）更硬气。写研究报告时的必备句型。', toriTipEn: '🐰 -는 것으로 나타났다 = "(Survey/data) shows…"—the go-to pattern in reports and news when data speaks. "조사 결과 …로 나타났다" (According to survey results…). There\'s always a survey or statistic backing it, making it more solid than 알려지다 (rumored). Essential for research reports.',
  },

  // src: card-p29-l03
  {
    id: 'g207', title: '预计', titleEn: 'Expected', pattern: '-(으)ㄹ 전망이다 / -(으)ㄹ 것으로 보이다',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '문형',
    usage: '新闻体"预计…、有望…、预测将…"', usageEn: 'News style "expected to…, projected to…, forecast to…"',
    explanation: '-(으)ㄹ 전망이다（有…的展望/预计）和 -(으)ㄹ 것으로 보이다/예상된다（预计将…）用于对未来趋势做客观预测，相当于"预计…、有望…、预计将…"。是新闻、分析报告中预测走势的典型客观句式。', explanationEn: '-(으)ㄹ 전망이다 (there\'s a prospect/expectation of…) and -(으)ㄹ 것으로 보이다/예상된다 (expected to…) are used for objective predictions of future trends, equivalent to "expected to…, projected to…, forecast to…". They\'re the typical objective patterns for forecasting in news and analysis reports.',
    conjugation: '无收音/ㄹ + ㄹ 전망이다 / ㄹ 것으로 보이다\n有收音 + 을 전망이다 / 을 것으로 보이다\n（也作 -(으)ㄹ 것으로 예상된다）', conjugationEn: 'No batchim/ㄹ + ㄹ 전망이다 / ㄹ 것으로 보이다\\nWith batchim + 을 전망이다 / 을 것으로 보이다\\n(Also as -(으)ㄹ 것으로 예상된다)',
    examples: [
      { ko: '올해 경제 성장률은 3%대에 머무를 전망이다.', zh: '预计今年经济增长率将维持在3%左右。', zhEn: 'The economic growth rate is expected to stay around 3% this year.', note: '预计：增长率维持3%', noteEn: 'Expected: growth rate stays at 3%' },
      { ko: '다음 주부터 기온이 크게 떨어질 것으로 보인다.', zh: '预计从下周开始气温将大幅下降。', zhEn: 'Temperatures are expected to drop significantly starting next week.', note: '预计：气温下降', noteEn: 'Expected: temperature drop' },
      { ko: '정부는 새로운 정책을 발표할 것으로 예상된다.', zh: '预计政府将发布新政策。', zhEn: 'The government is expected to announce new policies.', note: '预计：将发布新政策', noteEn: 'Expected: new policy to be announced' },
    ],
    similarPatterns: ['-(으)ㄹ 것이다', '-(으)ㄹ 것 같다'],
    difference: '-(으)ㄹ 전망이다/것으로 보이다 是新闻体的客观预测（"떨어질 전망이다"预计将下降——分析式预测）；-(으)ㄹ 것이다（g48）是一般将来/推测；-(으)ㄹ 것 같다（g69）是口语主观推测。전망이다 特有"基于分析的正式预测"的新闻腔，日常口语不用。', differenceEn: '-(으)ㄹ 전망이다/것으로 보이다 is news-style objective prediction ("떨어질 전망이다" expected to drop—analytical); -(으)ㄹ 것이다 (g48) is general future/speculation; -(으)ㄹ 것 같다 (g69) is colloquial subjective guess. 전망이다 has a distinct "formal prediction based on analysis" news tone, not used in everyday speech.',
    toriTip: '🐰 -(으)ㄹ 전망이다 / -(으)ㄹ 것으로 보인다 = "预计…、有望…"，天气预报、经济新闻的标配。"내일 비가 올 전망입니다"（预计明天有雨）。客观、正式的预测口吻，写分析、看财经新闻时到处是它。', toriTipEn: '🐰 -(으)ㄹ 전망이다 / -(으)ㄹ 것으로 보인다 = "expected to…, projected to…"—the standard for weather forecasts and economic news. "내일 비가 올 전망입니다" (Rain is expected tomorrow). An objective, formal predictive tone you\'ll see everywhere in analyses and financial news.',
  },

  // src: card-p29-l04
  {
    id: 'g208', title: '在之前（书面）', titleEn: 'Before (written)', pattern: '-기에 앞서 / N에 앞서',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"在…之前、先于…"，正式书面', usageEn: 'Means "before…, prior to…", formal written style',
    explanation: '动词用 -기에 앞서，名词用 N에 앞서，表示在某事之前先做另一件事，相当于"在…之前、先于…"。比口语的 -기 전에 更正式、更书面，多用于致辞、报道、正式说明的开场。', explanationEn: 'Verbs use -기에 앞서, nouns use N에 앞서, meaning to do one thing before another, equivalent to "before…, prior to…". More formal and written than colloquial -기 전에, often used in openings of speeches, reports, and formal explanations.',
    conjugation: '动词词干 + 기에 앞서\n名词 + 에 앞서 (논의에 앞서 / 회의에 앞서)', conjugationEn: 'Verb stem + 기에 앞서\\nNoun + 에 앞서 (논의에 앞서 / 회의에 앞서)',
    examples: [
      { ko: '회의를 시작하기에 앞서 참석자 여러분께 감사의 말씀을 드립니다.', zh: '会议开始之前，向各位与会者致以谢意。', zhEn: 'Before the meeting begins, I would like to express my gratitude to all attendees.', note: '在之前：开会前致谢', noteEn: 'Before: thanks before the meeting' },
      { ko: '본격적인 논의에 앞서 배경을 간단히 설명드리겠습니다.', zh: '正式讨论之前，先简单说明一下背景。', zhEn: 'Before the formal discussion, let me briefly explain the background.', note: '在之前：讨论前说明', noteEn: 'Before: explanation before discussion' },
      { ko: '결정을 내리기에 앞서 신중히 검토해야 한다.', zh: '在做出决定之前应慎重审查。', zhEn: 'One should carefully review before making a decision.', note: '在之前：决定前审查', noteEn: 'Before: review before decision' },
    ],
    similarPatterns: ['-기 전에', '-(으)ㄴ 후에'],
    difference: '-기에 앞서/N에 앞서 是正式书面的"在…之前"（"논의에 앞서"讨论之前——致辞腔）；-기 전에（g42）是通用口语的"…之前"（"밥 먹기 전에"吃饭前）。两者义同，앞서 更郑重、多用于正式开场白和书面，前에 日常通用。', differenceEn: '-기에 앞서/N에 앞서 is formal written "before…" ("논의에 앞서" before discussion—speech tone); -기 전에 (g42) is general colloquial "before…" ("밥 먹기 전에" before eating). Same meaning, but 앞서 is more solemn, used in formal openings and writing, while 전에 is everyday.',
    toriTip: '🐰 -기에 앞서 / -에 앞서 = "在…之前"，正式场合的开场白。"본론에 앞서"（进入正题之前）、"시작에 앞서"（开始之前）。致辞、主持、报告开头用它显得郑重。日常说"…之前"用 -기 전에 就够了。', toriTipEn: '🐰 -기에 앞서 / -에 앞서 = "before...", a formal opening phrase. "본론에 앞서" (before getting to the main point), "시작에 앞서" (before starting). Using it at the start of speeches, hosting, or reports sounds formal and respectful. For everyday "before...", just use -기 전에.',
  },

  // src: card-p29-l05
  {
    id: 'g209', title: '要求敦促', titleEn: 'Demand / Urge', pattern: '-기(를) 요구/촉구/당부하다',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '문형',
    usage: '新闻体"要求/敦促/呼吁（做）…"', usageEn: 'News-style "demand/urge/call for (doing)..."',
    explanation: '把动作用 -기(를) 名词化后接 요구하다（要求）、촉구하다（敦促，语气更强）、당부하다（叮嘱/呼吁，语气恳切）等动词，表示正式提出请求或主张，相当于"要求/敦促/呼吁…"。是新闻报道转述各方诉求的典型句式，三词语气强弱不同。', explanationEn: 'After nominalizing an action with -기(를), attach verbs like 요구하다 (demand), 촉구하다 (urge, stronger), or 당부하다 (earnestly request/appeal) to formally state a request or claim, equivalent to "demand/urge/call for...". This is a typical news pattern for relaying parties\' demands, with the three verbs differing in intensity.',
    conjugation: '动词词干 + 기(를) + 요구/촉구/당부하다\n名词 + 을/를 + 요구/촉구/당부하다\n（要求 < 촉구 语气强 / 당부 恳切）', conjugationEn: 'Verb stem + 기(를) + 요구/촉구/당부하다\\nNoun + 을/를 + 요구/촉구/당부하다\\n(demand < urge is stronger / 당부 is earnest)',
    examples: [
      { ko: '시민들은 정부에 정책 재검토를 요구했다.', zh: '市民们要求政府重新审视政策。', zhEn: 'Citizens demanded that the government review its policies.', note: '要求：要求重审政策', noteEn: 'Demand: demand a policy review' },
      { ko: '야당은 총리의 사퇴를 강력히 촉구했다.', zh: '在野党强烈敦促总理辞职。', zhEn: 'The opposition strongly urged the prime minister to resign.', note: '敦促：敦促总理辞职', noteEn: 'Urge: urge the prime minister to resign' },
      { ko: '대통령은 국민들에게 방역 수칙을 잘 지켜 주기를 당부했다.', zh: '总统呼吁国民认真遵守防疫规定。', zhEn: 'The president called on citizens to strictly follow quarantine rules.', note: '呼吁：呼吁遵守防疫', noteEn: 'Appeal: appeal for compliance with quarantine measures' },
    ],
    similarPatterns: ['-(으)라고 하다', '-기(를) 바라다'],
    difference: '-기를 요구/촉구/당부하다 是新闻体正式主张，三词语气递变：요구（要求，中性有力）< 촉구（敦促，强烈）；당부（恳切呼吁，柔和郑重）。-(으)라고 하다（g78）是一般转述命令；-기를 바라다（g111）是祝愿。这组专用于报道各方正式诉求。', differenceEn: '-기를 요구/촉구/당부하다 is a formal news-style claim, with the three verbs escalating in tone: 요구 (demand, neutral but firm) < 촉구 (urge, strong); 당부 (earnest appeal, soft and formal). -(으)라고 하다 (g78) is general reported command; -기를 바라다 (g111) is a wish. This set is specifically for reporting parties\' formal demands.',
    toriTip: '🐰 요구/촉구/당부하다 是新闻里"喊话"的三兄弟，语气从强到柔：요구（要求）、촉구（强烈敦促）、당부（恳切呼吁）。"사퇴를 촉구했다"（敦促辞职）力度最猛，"잘 부탁한다고 당부했다"（叮嘱拜托）最温和。读时政新闻常遇到。', toriTipEn: '🐰 요구/촉구/당부하다 are the three "call-out" brothers in news, from strong to soft: 요구 (demand), 촉구 (strong urge), 당부 (earnest appeal). "사퇴를 촉구했다" (urged resignation) is the strongest, while "잘 부탁한다고 당부했다" (earnestly asked to take care) is the mildest. You\'ll often see them in political news.',
  },

  // src: card-p29-l06
  {
    id: 'g210', title: '仅止于', titleEn: 'Only up to', pattern: '-는 데 그치다 / N에 그치다',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '문형',
    usage: '表示"仅止于…、只停留在…（没达到更高）"', usageEn: 'Indicates "only up to..., just stops at... (not reaching higher)"',
    explanation: '动词用 -는 데 그치다，名词/数量用 N에 그치다，表示某结果只停留在某个（往往低于预期的）程度，没有进一步，相当于"仅止于…、只停留在…、仅为…"。常带"本应更多/更好，却止步于此"的评价，多见于新闻、报告。', explanationEn: 'With verbs use -는 데 그치다, with nouns/quantities use N에 그치다, meaning a result only stays at a certain (often lower-than-expected) level without going further, equivalent to "only up to..., just stops at..., only amounts to...". It often carries the evaluation "should have been more/better, but stopped here," common in news and reports.',
    conjugation: '动词词干 + 는 데 그치다\n名词/数量 + 에 그치다 (2%에 그치다)\n（书面终结：그쳤다）', conjugationEn: 'Verb stem + 는 데 그치다\\nNoun/quantity + 에 그치다 (2%에 그치다)\\n(written ending: 그쳤다)',
    examples: [
      { ko: '이번 회의는 원론적인 논의를 하는 데 그쳤다.', zh: '本次会议仅停留在原则性讨论上。', zhEn: 'The meeting only stayed at the level of principled discussion.', note: '仅止于：止于原则讨论', noteEn: 'Only up to: stopped at principle-level discussion' },
      { ko: '올해 매출 증가율은 2%에 그쳤다.', zh: '今年销售额增长率仅为2%。', zhEn: 'This year\'s sales growth rate only reached 2%.', note: '仅止于：仅增2%', noteEn: 'Only up to: only increased 2%' },
      { ko: '정부의 대책은 임시적 조치에 그쳤다.', zh: '政府对策仅停留在临时措施上。', zhEn: 'The government\'s response remained only at temporary measures.', note: '仅止于：止于临时措施', noteEn: 'Only up to: stopped at temporary measures' },
    ],
    similarPatterns: ['-(으)ㄹ 뿐이다', '만'],
    difference: '-는 데 그치다/N에 그치다 强调"止步于某（低于预期的）程度，未再进一步"，含评价（"2%에 그쳤다"仅增2%——暗示不理想）；-(으)ㄹ 뿐이다 是"只是…而已"的中性限定。그치다 特有"本可更多却止于此"的遗憾/批评语气，多用于报道。', differenceEn: '-는 데 그치다/N에 그치다 emphasizes "stopping at a (lower-than-expected) level without going further," with an evaluative tone ("2%에 그쳤다" only increased 2%—implying unsatisfactory); -(으)ㄹ 뿐이다 is a neutral "just... only." 그치다 uniquely carries a regret/criticism tone of "could have been more but stopped here," often used in reports.',
    toriTip: '🐰 -는 데 그치다 / -에 그치다 = "仅止于…、只到…"，新闻里评价"不给力"的委婉说法。"성장률이 1%에 그쳤다"（增长率仅1%）——言下之意"太低了"。带着"本该更多"的失望，财经、时政报道高频。', toriTipEn: '🐰 -는 데 그치다 / -에 그치다 = "only up to..., just reaches...", a euphemistic way in news to say something is "underwhelming." "성장률이 1%에 그쳤다" (growth rate only 1%)—implying "too low." Carrying disappointment that "it should have been more," it\'s frequent in finance and political reports.',
  },

  // src: card-p29-l07
  {
    id: 'g211', title: '一就（书面）', titleEn: 'As soon as (written)', pattern: '-자',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"一…就…"，书面语', usageEn: 'Indicates "as soon as..., then...", written style',
    explanation: '接在动词后，表示前一动作刚发生，后一情况紧接着出现，相当于"一…就…、刚…便…"。是 -자마자 的书面简洁版，前后动作紧接，多用于叙述、报道。后句一般是客观发生的事，不用命令/请诱句。', explanationEn: 'Attached to verbs, it means the first action just happened and the next situation immediately follows, equivalent to "as soon as..., just... and then...". It\'s the concise written version of -자마자, with actions in immediate succession, often used in narratives and reports. The following clause is usually an objective event, not a command or request.',
    conjugation: '动词词干 + 자\n（열리다→열리자 / 그치다→그치자 / 발표되다→발표되자）', conjugationEn: 'Verb stem + 자\\n(열리다→열리자 / 그치다→그치자 / 발표되다→발표되자)',
    examples: [
      { ko: '문이 열리자 사람들이 우르르 몰려 나왔다.', zh: '门一开，人们蜂拥而出。', zhEn: 'As soon as the door opened, people poured out.', note: '一就：门开人涌出', noteEn: 'As soon as: the door opened and people poured out' },
      { ko: '비가 그치자 하늘이 맑아졌다.', zh: '雨一停天就晴了。', zhEn: 'As soon as the rain stopped, the sky cleared.', note: '一就：雨停天晴', noteEn: 'As soon as: rain stops, sky clears' },
      { ko: '뉴스가 발표되자 시장이 큰 폭으로 반응했다.', zh: '消息一发布，市场就大幅反应。', zhEn: 'As soon as the news was released, the market reacted strongly.', note: '一就：消息一出市场反应', noteEn: 'As soon as: market reacts to news' },
    ],
    similarPatterns: ['-자마자', '-(으)니까'],
    difference: '-자（书面）与 -자마자（g39）都表"一…就…"，但 -자 更书面简洁、多用于叙述/报道且强调前后紧接的因果或时间关联（"비가 그치자 맑아졌다"雨一停就晴了）；-자마자 更口语、纯强调时间紧接（"오자마자 잤어요"一到就睡）。-자 常含"随之引发"的语感。', differenceEn: 'Both -자 (written) and -자마자 (g39) mean "as soon as," but -자 is more formal and concise, often used in narratives/reports, emphasizing a close causal or temporal link ("비가 그치자 맑아졌다" — as soon as the rain stopped, it cleared up); -자마자 is more colloquial, purely emphasizing immediate succession ("오자마자 잤어요" — I slept as soon as I arrived). -자 often carries a sense of "triggering what follows."',
    toriTip: '🐰 -자（书面）= "一…就…"，比口语的 -자마자 简洁文雅，叙事和新闻里常见。"막이 오르자 관객들이 환호했다"（幕一拉开观众就欢呼）。前后紧接、常带因果连锁感。日常说话还是 -자마자 顺口，写作时用 -자。', toriTipEn: '🐰 -자 (written) = "as soon as," more concise and elegant than colloquial -자마자, common in narratives and news. "막이 오르자 관객들이 환호했다" (As soon as the curtain rose, the audience cheered). It implies immediate succession, often with a chain-reaction feel. In daily speech, -자마자 is smoother; use -자 in writing.',
  },

  // src: card-p29-l08
  {
    id: 'g212', title: '自以来', titleEn: 'Since', pattern: '이래(로) / -(으)ㄴ 이래',
    level: 'advanced', topik: 'TOPIK 6级', topikEn: 'TOPIK Level 6', category: '연결',
    usage: '表示"自…以来（一直）"，书面', usageEn: 'Indicates "since... (continuously)", written form',
    explanation: '名词后接 이래(로)，动词后用 -(으)ㄴ 이래，表示从某个过去时间点开始一直持续到现在，相当于"自…以来、自从…（就一直）"。是 -(으)ㄴ 후로 的书面郑重版，多用于强调长时间跨度，后句常配"처음/최고/최대"等极值。', explanationEn: 'After nouns, use 이래(로); after verbs, use -(으)ㄴ 이래. It indicates something continuing from a past point to the present, equivalent to "since..." It\'s the formal, weighty version of -(으)ㄴ 후로, often used to emphasize a long span, with extremes like 처음/최고/최대 in the following clause.',
    conjugation: '名词 + 이래(로) (창사 이래 / 관측 이래로)\n动词过去 + (으)ㄴ 이래 (온 이래 / 졸업한 이래)', conjugationEn: 'Noun + 이래(로) (창사 이래 / 관측 이래로)\\nVerb past + (으)ㄴ 이래 (온 이래 / 졸업한 이래)',
    examples: [
      { ko: '창사 이래 최대 실적을 기록했다.', zh: '创下了自建社以来的最高业绩。', zhEn: 'Recorded the highest performance since the company\'s founding.', note: '自以来：建社以来最高', noteEn: 'Since: highest since founding' },
      { ko: '한국에 온 이래 매일 한국어 공부를 이어왔다.', zh: '自从来到韩国以来一直坚持学韩语。', zhEn: 'Have kept studying Korean since coming to Korea.', note: '自以来：来韩后一直学', noteEn: 'Since: kept studying since coming to Korea' },
      { ko: '10년 만의 폭염으로 관측 이래로 가장 더운 여름이 됐다.', zh: '因十年一遇的酷暑，成为观测以来最热的夏天。', zhEn: 'Due to a once-in-a-decade heatwave, it became the hottest summer on record.', note: '自以来：观测以来最热', noteEn: 'Since: hottest since observations began' },
    ],
    similarPatterns: ['-(으)ㄴ 후에', '부터'],
    difference: '이래(로)/-(으)ㄴ 이래 是书面的"自…以来（长期持续）"，强调长时间跨度、常配极值（"창사 이래 최대"建社以来最大）；-(으)ㄴ 후에（g43）只是"之后"（不强调持续）；부터 是口语"从…起"。이래 特有"自那时起一直…"的郑重历时感，多用于书面。', differenceEn: '이래(로)/-(으)ㄴ 이래 is the written "since... (long-term)", emphasizing a long span, often with extremes ("창사 이래 최대" — biggest since founding); -(으)ㄴ 후에 (g43) just means "after" (no emphasis on continuity); 부터 is colloquial "from...". 이래 uniquely conveys a formal sense of "ever since then," mostly in writing.',
    toriTip: '🐰 이래(로) / -(으)ㄴ 이래 = "自…以来"，强调漫长跨度的书面语。"설립 이래 처음"（成立以来首次）、"사상 이래 최대"（史上最大）。后面常跟"처음·최대·최고"这类极值词，报道创纪录时的标配。日常说"从…开始"用 부터。', toriTipEn: '🐰 이래(로) / -(으)ㄴ 이래 = "since...", a written form emphasizing a long span. "설립 이래 처음" (first since establishment), "사상 이래 최대" (largest in history). Often followed by extremes like 처음·최대·최고 — standard for reporting records. In daily speech, use 부터 for "from...".',
  },

  // =====================================================================
  //  불규칙 활용 (Irregular Conjugation / 不规则活用)
  // =====================================================================

  {
    id: 'g213', title: 'ㅂ不规则', titleEn: 'ㅂ irregular', pattern: 'ㅂ 불규칙 (춥다→추워요)',
    level: 'beginner', topik: 'TOPIK 1~2级', topikEn: 'TOPIK Level 1~2', category: '어미',
    usage: '词干末尾 ㅂ 遇元音语尾变 우/오', usageEn: 'Stem-final ㅂ changes to 우/오 before vowel endings',
    explanation: '部分以 ㅂ 收尾的动词/形容词（多为形容词），词干后接元音开头的语尾时，ㅂ 脱落并变成 우（少数如 돕다/곱다 变 오），再与语尾结合。如 춥다 + 아요 → 추우 + 어요 → 추워요。接辅音语尾时不变化（춥고/춥지）。注意 입다（穿）、잡다（抓）、좁다（窄）等是规则动词，ㅂ 不变。', explanationEn: 'For some verbs/adjectives ending in ㅂ (mostly adjectives), when followed by a vowel-initial ending, ㅂ drops and becomes 우 (a few like 돕다/곱다 become 오), then combines with the ending. E.g., 춥다 + 아요 → 추우 + 어요 → 추워요. No change before consonant endings (춥고/춥지). Note 입다 (wear), 잡다 (catch), 좁다 (narrow) are regular — ㅂ doesn\'t change.',
    conjugation: 'ㅂ→우 + 어요：춥다→추워요 / 덥다→더워요 / 쉽다→쉬워요 / 어렵다→어려워요 / 맵다→매워요\nㅂ→오（仅돕다·곱다）：돕다→도와요 / 곱다→고와요\n接辅音语尾不变：춥고, 춥지만, 춥습니다\n规则例外（ㅂ不变）：입다→입어요 / 잡다→잡아요 / 좁다→좁아요', conjugationEn: 'ㅂ→우 + 어요: 춥다→추워요 / 덥다→더워요 / 쉽다→쉬워요 / 어렵다→어려워요 / 맵다→매워요\\nㅂ→오 (only 돕다·곱다): 돕다→도와요 / 곱다→고와요\\nNo change before consonant endings: 춥고, 춥지만, 춥습니다\\nRegular exceptions (ㅂ unchanged): 입다→입어요 / 잡다→잡아요 / 좁다→좁아요',
    examples: [
      { ko: '오늘 날씨가 너무 추워요.', zh: '今天天气太冷了。', zhEn: 'The weather is too cold today.', note: 'ㅂ不规则：춥다→추워요', noteEn: 'ㅂ irregular: 춥다→추워요' },
      { ko: '이 문제가 정말 어려워요.', zh: '这道题真难。', zhEn: 'This problem is really hard.', note: 'ㅂ不规则：어렵다→어려워요', noteEn: 'ㅂ irregular: 어렵다→어려워요' },
      { ko: '제가 도와 드릴게요.', zh: '我来帮您。', zhEn: 'Let me help you.', note: 'ㅂ→오：돕다→도와' },
    ],
    similarPatterns: ['ㄷ 불규칙', '으 탈락'],
    difference: 'ㅂ 不规则只在元音语尾前变 우/오；돕다·곱다 是唯二变 오 的（도와/고와），其余全变 우。易错点是把规则动词误当不规则：입다（穿）→입어요（不是 이워요）、잡다（抓）→잡아요，这些 ㅂ 不脱落，需单独记。', differenceEn: 'ㅂ irregular only changes to 우/오 before vowel endings; 돕다·곱다 are the only two that become 오 (도와/고와), all others become 우. A common mistake is treating regular verbs as irregular: 입다 (wear) → 입어요 (not 이워요), 잡다 (catch) → 잡아요 — these ㅂ don\'t drop, so memorize them separately.',
    toriTip: '🐰 ㅂ 不规则几乎全是形容词，且大多描述天气感觉：춥다·덥다·쉽다·어렵다·맵다·무겁다·가볍다。规律是 ㅂ→우+어요=워요。唯独 돕다（帮）、곱다（美）变 도와/고와。动词 입다·잡다·좁다 是规则的别搞混。', toriTipEn: '🐰 ㅂ irregulars are almost all adjectives, mostly describing weather/feelings: 춥다·덥다·쉽다·어렵다·맵다·무겁다·가볍다. The rule is ㅂ→우+어요=워요. Only 돕다 (help), 곱다 (beautiful) become 도와/고와. Verbs 입다·잡다·좁다 are regular — don\'t mix them up.',
  },

  {
    id: 'g214', title: 'ㄷ不规则', titleEn: 'ㄷ Irregular', pattern: 'ㄷ 불규칙 (듣다→들어요)',
    level: 'beginner', topik: 'TOPIK 1~2级', topikEn: 'TOPIK Level 1~2', category: '어미',
    usage: '词干末尾 ㄷ 遇元音语尾变 ㄹ', usageEn: 'Final ㄷ becomes ㄹ before vowel endings',
    explanation: '部分以 ㄷ 收尾的动词，词干后接元音开头的语尾时，ㄷ 变为 ㄹ。如 듣다（听）+ 어요 → 들어요；걷다（走）→ 걸어요；묻다（问）→ 물어요。接辅音语尾时不变（듣고/듣지）。注意 닫다（关）、받다（收）、믿다（信）、묻다（埋）是规则动词，ㄷ 不变。', explanationEn: 'For some verbs ending in ㄷ, when followed by a vowel-initial ending, ㄷ changes to ㄹ. E.g., 듣다 (to listen) + 어요 → 들어요; 걷다 (to walk) → 걸어요; 묻다 (to ask) → 물어요. No change before consonant endings (듣고/듣지). Note: 닫다 (to close), 받다 (to receive), 믿다 (to believe), and 묻다 (to bury) are regular—ㄷ stays.',
    conjugation: 'ㄷ→ㄹ + 元音语尾：듣다→들어요 / 걷다→걸어요 / 묻다(问)→물어요 / 싣다→실어요 / 깨닫다→깨달아요\n接辅音语尾不变：듣고, 듣지만, 듣습니다\n规则例外（ㄷ不变）：닫다→닫아요 / 받다→받아요 / 믿다→믿어요 / 묻다(埋)→묻어요', conjugationEn: 'ㄷ→ㄹ + vowel endings: 듣다→들어요 / 걷다→걸어요 / 묻다(ask)→물어요 / 싣다→실어요 / 깨닫다→깨달아요\\nNo change before consonant endings: 듣고, 듣지만, 듣습니다\\nRegular exceptions (ㄷ stays): 닫다→닫아요 / 받다→받아요 / 믿다→믿어요 / 묻다(bury)→묻어요',
    examples: [
      { ko: '음악을 들어요.', zh: '听音乐。', zhEn: 'Listen to music.', note: 'ㄷ不规则：듣다→들어요', noteEn: 'ㄷ irregular: 듣다→들어요' },
      { ko: '매일 30분씩 걸어요.', zh: '每天走30分钟。', zhEn: 'I walk 30 minutes every day.', note: 'ㄷ不规则：걷다→걸어요', noteEn: 'ㄷ irregular: 걷다→걸어요' },
      { ko: '모르는 게 있으면 물어보세요.', zh: '有不懂的就问。', zhEn: 'Ask if there\'s something you don\'t understand.', note: 'ㄷ→ㄹ：묻다→물어' },
    ],
    similarPatterns: ['ㅂ 불규칙', 'ㄹ 탈락'],
    difference: 'ㄷ 不规则的 ㄷ→ㄹ 只发生在元音语尾前。最大坑是同形异义的 묻다：问的意思时不规则（물어요），埋的意思时规则（묻어요）。닫다·받다·믿다 也都是规则动词，ㄷ 保留。', differenceEn: 'The ㄷ→ㄹ change in ㄷ irregulars only happens before vowel endings. The biggest trap is the homonym 묻다: when it means \'to ask\' it\'s irregular (물어요), but when it means \'to bury\' it\'s regular (묻어요). 닫다, 받다, and 믿다 are also regular—ㄷ is kept.',
    toriTip: '🐰 ㄷ 不规则常见就 듣다·걷다·묻다(问)·싣다·깨닫다 这几个，记住"听、走、问、载、领悟"。规律：ㄷ→ㄹ+어요。规则的 닫다(关)·받다(收)·믿다(信) 别混。同一个 묻다，问→물어요，埋→묻어요，靠语境分辨。', toriTipEn: '🐰 The common ㄷ irregulars are just 듣다, 걷다, 묻다(ask), 싣다, 깨닫다—remember "listen, walk, ask, load, realize." Rule: ㄷ→ㄹ+어요. Don\'t mix up the regular 닫다(close), 받다(receive), 믿다(believe). Same 묻다: ask→물어요, bury→묻어요—distinguish by context.',
  },

  {
    id: 'g215', title: 'ㅅ不规则', titleEn: 'ㅅ Irregular', pattern: 'ㅅ 불규칙 (낫다→나아요)',
    level: 'intermediate', topik: 'TOPIK 2~3级', topikEn: 'TOPIK Level 2~3', category: '어미',
    usage: '词干末尾 ㅅ 遇元音语尾脱落（不缩合）', usageEn: 'Final ㅅ drops before vowel endings (no contraction)',
    explanation: '部分以 ㅅ 收尾的动词/形容词，词干后接元音开头的语尾时，ㅅ 脱落，但前后元音不缩合（保留两个音节）。如 낫다（好转/更好）+ 아요 → 나아요（不是 나요）；짓다（盖/做）→ 지어요；붓다（倒/肿）→ 부어요。接辅音语尾不变（낫고/낫지）。注意 웃다（笑）、씻다（洗）、벗다（脱）是规则动词，ㅅ 不脱落。', explanationEn: 'For some verbs/adjectives ending in ㅅ, when followed by a vowel-initial ending, ㅅ drops, but the surrounding vowels don\'t contract (two syllables are kept). E.g., 낫다 (to recover/better) + 아요 → 나아요 (not 나요); 짓다 (to build/make) → 지어요; 붓다 (to pour/swell) → 부어요. No change before consonant endings (낫고/낫지). Note: 웃다 (to laugh), 씻다 (to wash), 벗다 (to take off) are regular—ㅅ stays.',
    conjugation: 'ㅅ脱落（不缩合）+ 元音语尾：낫다→나아요 / 짓다→지어요 / 붓다→부어요 / 젓다→저어요 / 잇다→이어요\n接辅音语尾不变：낫고, 낫지만, 낫습니다\n规则例外（ㅅ不脱落）：웃다→웃어요 / 씻다→씻어요 / 벗다→벗어요', conjugationEn: 'ㅅ drops (no contraction) + vowel endings: 낫다→나아요 / 짓다→지어요 / 붓다→부어요 / 젓다→저어요 / 잇다→이어요\\nNo change before consonant endings: 낫고, 낫지만, 낫습니다\\nRegular exceptions (ㅅ stays): 웃다→웃어요 / 씻다→씻어요 / 벗다→벗어요',
    examples: [
      { ko: '감기가 다 나았어요.', zh: '感冒全好了。', zhEn: 'My cold is completely better.', note: 'ㅅ不规则：낫다→나았어요', noteEn: 'ㅅ irregular: 낫다→나았어요' },
      { ko: '새 집을 지었어요.', zh: '盖了新房子。', zhEn: 'I built a new house.', note: 'ㅅ不规则：짓다→지었어요', noteEn: 'ㅅ irregular: 짓다→지었어요' },
      { ko: '물을 그릇에 부어 주세요.', zh: '请把水倒进碗里。', zhEn: 'Please pour water into the bowl.', note: 'ㅅ脱落：붓다→부어', noteEn: 'ㅅ drops: 붓다→부어' },
    ],
    similarPatterns: ['으 탈락', 'ㄷ 불규칙'],
    difference: 'ㅅ 不规则与 으 脱落最易混：ㅅ 脱落后元音不缩合（낫다→나아요，两个音节），而으 脱落会缩合。规则动词 웃다·씻다·벗다 的 ㅅ 保留（웃어요 不是 우어요）。낫다 一词两义（病好/更好）都按不规则活用。', differenceEn: 'ㅅ irregulars are most easily confused with 으 dropping: after ㅅ drops, vowels don\'t contract (낫다→나아요, two syllables), but 으 dropping contracts. Regular verbs 웃다, 씻다, 벗다 keep ㅅ (웃어요, not 우어요). 낫다 has two meanings (recover/better)—both conjugate irregularly.',
    toriTip: '🐰 ㅅ 不规则记住 낫다·짓다·붓다·젓다·잇다（好、盖、倒、搅、连）。诀窍：ㅅ 悄悄消失但两个元音各自保留，不合并——낫다→나아요（na-a-yo，三拍）。规则的 웃다(笑)·씻다(洗)·벗다(脱) ㅅ 不掉。', toriTipEn: '🐰 For ㅅ irregulars, remember 낫다, 짓다, 붓다, 젓다, 잇다 (recover, build, pour, stir, connect). Trick: ㅅ silently disappears but the two vowels stay separate, no merging—낫다→나아요 (na-a-yo, three beats). Regular 웃다(laugh), 씻다(wash), 벗다(take off) keep ㅅ.',
  },

  {
    id: 'g216', title: '르不规则', titleEn: '르 Irregular', pattern: '르 불규칙 (모르다→몰라요)',
    level: 'intermediate', topik: 'TOPIK 2~3级', topikEn: 'TOPIK Level 2~3', category: '어미',
    usage: '词干末尾 르 遇 아/어 变 ㄹㄹ', usageEn: 'Final 르 becomes ㄹㄹ before 아/어',
    explanation: '以 르 结尾的动词/形容词，后接 아/어 系语尾时，르 前一音节补 ㄹ 收尾，르 的 ㅡ 脱落并变 라/러。即 모르다 + 아요 → 몰ㄹ + 아요 → 몰라요；부르다 → 불러요。是韩语里数量很多的一类。接其他语尾时正常（모르고/모르니까）。注意与 러 不规则（이르다→이르러）区分。', explanationEn: 'For verbs/adjectives ending in 르, when followed by an 아/어 ending, the syllable before 르 gets a ㄹ batchim, and 르\'s ㅡ drops, becoming 라/러. So 모르다 + 아요 → 몰ㄹ + 아요 → 몰라요; 부르다 → 불러요. This is a large class in Korean. With other endings it\'s regular (모르고/모르니까). Note the difference from the 러 irregular (이르다→이르러).',
    conjugation: '르 + 아/어 → ㄹ라/ㄹ러：모르다→몰라요 / 부르다→불러요 / 다르다→달라요 / 빠르다→빨라요 / 자르다→잘라요 / 흐르다→흘러요\n阳性元音(ㅏㅗ)→라，阴性元音→러：바르다→발라요 / 기르다→길러요\n接辅音语尾正常：모르고, 모르지만, 모릅니다', conjugationEn: '르 + 아/어 → ㄹ라/ㄹ러: 모르다→몰라요 / 부르다→불러요 / 다르다→달라요 / 빠르다→빨라요 / 자르다→잘라요 / 흐르다→흘러요\\nPositive vowels (ㅏㅗ)→라, negative vowels→러: 바르다→발라요 / 기르다→길러요\\nWith consonant endings it\'s regular: 모르고, 모르지만, 모릅니다',
    examples: [
      { ko: '그 사람 이름을 몰라요.', zh: '不知道那个人的名字。', zhEn: 'I don\'t know that person\'s name.', note: '르不规则：모르다→몰라요', noteEn: '르 irregular: 모르다→몰라요' },
      { ko: '친구가 제 이름을 불렀어요.', zh: '朋友叫了我的名字。', zhEn: 'My friend called my name.', note: '르不规则：부르다→불렀어요', noteEn: '르 irregular: 부르다→불렀어요' },
      { ko: '두 사람의 성격이 아주 달라요.', zh: '两人的性格很不同。', zhEn: 'The two have very different personalities.', note: '르不规则：다르다→달라요', noteEn: '르 irregular: 다르다→달라요' },
    ],
    similarPatterns: ['으 탈락', 'ㅂ 불규칙'],
    difference: '르 不规则（모르다→몰라요，补 ㄹ）与 으 脱落（쓰다→써요，只掉 ㅡ）不同：르 不规则会多出一个 ㄹ 音。极少数 르 结尾词是 러 不规则（이르다"到达"→이르러요、푸르다→푸르러요、누르다"黄"→누르러요），语尾变 러 而非 ㄹ러，需单记。', differenceEn: 'The 르 irregular (모르다→몰라요, adds ㄹ) differs from 으 dropping (쓰다→써요, only drops ㅡ): the 르 irregular adds an extra ㄹ sound. A very few 르-ending words are 러 irregular (이르다 "arrive"→이르러요, 푸르다→푸르러요, 누르다 "yellow"→누르러요), where the ending becomes 러 instead of ㄹ러 — these need to be memorized separately.',
    toriTip: '🐰 르 不规则超多超常用：모르다·부르다·다르다·빠르다·자르다·흐르다·오르다。规律：르前补ㄹ，르变라/러。看阳阴元音选 라(ㅏㅗ)还是 러。少数 이르다(到)·푸르다·누르다(黄) 是 러 不规则→이르러요，别混。', toriTipEn: '🐰 The 르 irregular is super common: 모르다·부르다·다르다·빠르다·자르다·흐르다·오르다. Rule: add ㄹ before 르, then 르 becomes 라/러. Choose 라 (ㅏㅗ) or 러 based on positive/negative vowels. A few — 이르다 (arrive)·푸르다·누르다 (yellow) — are 러 irregular →이르러요, don\'t mix them up.',
  },

  {
    id: 'g217', title: 'ㅎ不规则', titleEn: 'ㅎ irregular', pattern: 'ㅎ 불규칙 (빨갛다→빨개요)',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '어미',
    usage: '词干末尾 ㅎ 遇元音语尾脱落并缩合', usageEn: 'The ㅎ at the end of a stem drops and contracts when followed by a vowel ending',
    explanation: '除 좋다 外，几乎所有以 ㅎ 收尾的形容词都是不规则。接 아/어 系语尾时，ㅎ 脱落且元音缩合为 ㅐ（遇 -야 时为 ㅒ）；接 -(으)ㄴ/-(으)면 等时 ㅎ 与 으 一起脱落。主要是颜色词和 이렇다/그렇다/저렇다/어떻다。如 빨갛다 + 아요 → 빨개요；어떻다 + 어요 → 어때요。动词的 ㅎ（놓다/낳다）是规则的。', explanationEn: 'Except for 좋다, almost all adjectives ending in ㅎ are irregular. With 아/어 endings, ㅎ drops and the vowels contract to ㅐ (ㅒ before -야); with -(으)ㄴ/-(으)면, ㅎ drops together with 으. These are mainly color words and 이렇다/그렇다/저렇다/어떻다. E.g., 빨갛다 + 아요 → 빨개요; 어떻다 + 어요 → 어때요. Verbs with ㅎ (놓다/낳다) are regular.',
    conjugation: 'ㅎ脱落+缩合 ㅐ（+아/어요）：빨갛다→빨개요 / 파랗다→파래요 / 노랗다→노래요 / 하얗다→하얘요 / 이렇다→이래요 / 그렇다→그래요 / 어떻다→어때요\nㅎ+으 一起脱落（+ㄴ/면）：빨갛다→빨간, 빨가면 / 그렇다→그런, 그러면\n例外（ㅎ不变）：좋다→좋아요 / 놓다→놓아요 / 낳다→낳아요', conjugationEn: 'ㅎ drops + contracts to ㅐ (+아/어요): 빨갛다→빨개요 / 파랗다→파래요 / 노랗다→노래요 / 하얗다→하얘요 / 이렇다→이래요 / 그렇다→그래요 / 어떻다→어때요\\nㅎ+으 drop together (+ㄴ/면): 빨갛다→빨간, 빨가면 / 그렇다→그런, 그러면\\nExceptions (ㅎ stays): 좋다→좋아요 / 놓다→놓아요 / 낳다→낳아요',
    examples: [
      { ko: '사과가 빨개요.', zh: '苹果是红的。', zhEn: 'The apple is red.', note: 'ㅎ不规则：빨갛다→빨개요', noteEn: 'ㅎ irregular: 빨갛다→빨개요' },
      { ko: '이거 어때요?', zh: '这个怎么样？', zhEn: 'How is this?', note: 'ㅎ不规则：어떻다→어때요', noteEn: 'ㅎ irregular: 어떻다→어때요' },
      { ko: '하늘이 정말 파래요.', zh: '天空真蓝。', zhEn: 'The sky is really blue.', note: 'ㅎ不规则：파랗다→파래요', noteEn: 'ㅎ irregular: 파랗다→파래요' },
    ],
    similarPatterns: ['ㅂ 불규칙', '으 탈락'],
    difference: 'ㅎ 不规则几乎只有形容词（颜色词 + 이/그/저렇다 + 어떻다），且元音会缩合成 ㅐ（빨갛다→빨개요，不是 빨가아요）。唯一常见例外是 좋다（好）→좋아요，ㅎ 保留。动词 놓다·낳다·넣다 的 ㅎ 也都规则，别混。', differenceEn: 'The ㅎ irregular is almost exclusively adjectives (color words + 이/그/저렇다 + 어떻다), and the vowels contract to ㅐ (빨갛다→빨개요, not 빨가아요). The only common exception is 좋다 (good)→좋아요, where ㅎ is kept. The verbs 놓다·낳다·넣다 are also regular with ㅎ — don\'t mix them up.',
    toriTip: '🐰 ㅎ 不规则=颜色形容词俱乐部：빨갛다·파랗다·노랗다·까맣다·하얗다，加上 이렇다·그렇다·저렇다·어떻다。规律：ㅎ掉+元音缩成ㅐ→빨개요、그래요、어때요。唯一叛徒是 좋다→좋아요（ㅎ不掉）。日常"어때요?"用超多。', toriTipEn: '🐰 The ㅎ irregular = the color adjective club: 빨갛다·파랗다·노랗다·까맣다·하얗다, plus 이렇다·그렇다·저렇다·어떻다. Rule: ㅎ drops + vowels contract to ㅐ→빨개요, 그래요, 어때요. The only traitor is 좋다→좋아요 (ㅎ stays). You\'ll use "어때요?" all the time.',
  },

  {
    id: 'g218', title: '으脱落', titleEn: '으 dropping', pattern: '으 탈락 (바쁘다→바빠요)',
    level: 'beginner', topik: 'TOPIK 1~2级', topikEn: 'TOPIK Level 1~2', category: '어미',
    usage: '词干末元音 ㅡ 遇 아/어 脱落', usageEn: 'The stem-final vowel ㅡ drops before 아/어',
    explanation: '词干以 ㅡ 结尾的动词/形容词，后接 아/어 系语尾时，ㅡ 脱落，由前一音节的元音决定用 아 还是 어（前音节为 ㅏ/ㅗ 用 아，否则用 어；若无前音节则默认 어）。如 바쁘다 + 아요 → 바빠요；쓰다 → 써요；예쁘다 → 예뻐요。这是规则性很强的活用，几乎所有 ㅡ 结尾词都遵守。', explanationEn: 'For verbs/adjectives with stems ending in ㅡ, when followed by an 아/어 ending, the ㅡ drops, and the vowel of the preceding syllable determines whether 아 or 어 is used (ㅏ/ㅗ in the preceding syllable → 아, otherwise → 어; if there\'s no preceding syllable, default to 어). E.g., 바쁘다 + 아요 → 바빠요; 쓰다 → 써요; 예쁘다 → 예뻐요. This is a very regular conjugation that almost all ㅡ-ending words follow.',
    conjugation: 'ㅡ脱落，看前音节定 아/어：바쁘다→바빠요(前ㅏ) / 아프다→아파요(前ㅏ) / 예쁘다→예뻐요(前ㅖ) / 슬프다→슬퍼요(前ㅡ) / 기쁘다→기뻐요\n无前音节默认 어：쓰다→써요 / 크다→커요 / 끄다→꺼요\n接辅音语尾不变：바쁘고, 바쁘지만, 바쁩니다', conjugationEn: 'ㅡ drop, choose 아/어 based on the preceding syllable: 바쁘다→바빠요 (preceding ㅏ) / 아프다→아파요 (preceding ㅏ) / 예쁘다→예뻐요 (preceding ㅖ) / 슬프다→슬퍼요 (preceding ㅡ) / 기쁘다→기뻐요\\nNo preceding syllable, default to 어: 쓰다→써요 / 크다→커요 / 끄다→꺼요\\nWith consonant endings, no change: 바쁘고, 바쁘지만, 바쁩니다',
    examples: [
      { ko: '요즘 일이 많아서 너무 바빠요.', zh: '最近事情多，太忙了。', zhEn: 'I\'ve been so busy lately with too many things going on.', note: '으脱落：바쁘다→바빠요', noteEn: 'ㅡ drop: 바쁘다→바빠요' },
      { ko: '머리가 좀 아파요.', zh: '头有点疼。', zhEn: 'My head hurts a bit.', note: '으脱落：아프다→아파요', noteEn: 'ㅡ drop: 아프다→아파요' },
      { ko: '편지를 써요.', zh: '写信。', zhEn: 'Write a letter.', note: '으脱落：쓰다→써요', noteEn: 'ㅡ drop: 쓰다→써요' },
    ],
    similarPatterns: ['르 불규칙', 'ㅅ 불규칙'],
    difference: '으 脱落是最规则的活用：只掉 ㅡ、不补任何辅音（쓰다→써요），据此与르 不规则（모르다→몰라요，多一个 ㄹ）区分。判断 아/어 要看 ㅡ 前一个音节的元音，单音节词（쓰다·크다）无前音节，一律用 어。', differenceEn: 'ㅡ drop is the most regular conjugation: only ㅡ is dropped, no consonant is added (쓰다→써요), which distinguishes it from 르 irregular (모르다→몰라요, which adds an extra ㄹ). To decide between 아/어, look at the vowel of the syllable before ㅡ; for monosyllabic words (쓰다·크다) with no preceding syllable, always use 어.',
    toriTip: '🐰 으 脱落最听话：词干 ㅡ 一碰 아/어 就消失，不留痕迹。바쁘다→바빠요、예쁘다→예뻐요、아프다→아파요。选 아还是어 看 ㅡ 前面那个字的元音；单字的 쓰다·크다·끄다 直接用 어→써요·커요·꺼요。', toriTipEn: '🐰 ㅡ drop is the most obedient: the stem\'s ㅡ disappears the moment it meets 아/어, leaving no trace. 바쁘다→바빠요, 예쁘다→예뻐요, 아프다→아파요. Choose 아 or 어 based on the vowel of the syllable before ㅡ; for single-syllable 쓰다·크다·끄다, just use 어→써요·커요·꺼요.',
  },

  {
    id: 'g219', title: 'ㄹ脱落', titleEn: 'ㄹ drop', pattern: 'ㄹ 탈락 (살다→삽니다·사세요)',
    level: 'beginner', topik: 'TOPIK 1~2级', topikEn: 'TOPIK Level 1~2', category: '어미',
    usage: '词干末 ㄹ 遇 ㄴ/ㅂ/ㅅ/오 脱落', usageEn: 'Stem-final ㄹ drops before ㄴ/ㅂ/ㅅ/오',
    explanation: '词干以 ㄹ 结尾的动词/形容词，后接以 ㄴ、ㅂ、ㅅ、오 开头的语尾时，ㄹ 脱落（韩国人用口诀"ㄴ·ㅂ·ㅅ·오 앞에서 ㄹ 탈락"记忆）。如 살다（住）+ ㅂ니다 → 삽니다；+ 세요 → 사세요；+ 는 → 사는；만들다 → 만드는/만듭니다。注意接 아/어 系语尾时 ㄹ 不脱落（살아요/만들어요）。', explanationEn: 'For verbs/adjectives ending in ㄹ, when followed by endings starting with ㄴ, ㅂ, ㅅ, or 오, the ㄹ drops (Koreans remember this with the mnemonic "ㄴ·ㅂ·ㅅ·오 앞에서 ㄹ 탈락"). For example, 살다 (to live) + ㅂ니다 → 삽니다; + 세요 → 사세요; + 는 → 사는; 만들다 → 만드는/만듭니다. Note that with 아/어 endings, ㄹ does not drop (살아요/만들어요).',
    conjugation: 'ㄹ脱落（ㄴ/ㅂ/ㅅ/오 앞）：살다→삽니다·사세요·사는·사오 / 알다→압니다·아세요·아는 / 만들다→만듭니다·만드세요·만드는 / 놀다→놉니다·노는 / 멀다→멉니다·먼\n接 아/어 语尾时ㄹ保留：살다→살아요 / 만들다→만들어요 / 알다→알아요', conjugationEn: 'ㄹ drop (before ㄴ/ㅂ/ㅅ/오): 살다→삽니다·사세요·사는·사오 / 알다→압니다·아세요·아는 / 만들다→만듭니다·만드세요·만드는 / 놀다→놉니다·노는 / 멀다→멉니다·먼\\nWith 아/어 endings, ㄹ is kept: 살다→살아요 / 만들다→만들어요 / 알다→알아요',
    examples: [
      { ko: '서울에 삽니다.', zh: '住在首尔。', zhEn: 'Live in Seoul.', note: 'ㄹ脱落：살다+ㅂ니다→삽니다', noteEn: 'ㄹ drop: 살다+ㅂ니다→삽니다' },
      { ko: '이 노래 아세요?', zh: '您知道这首歌吗？', zhEn: 'Do you know this song?', note: 'ㄹ脱落：알다+세요→아세요', noteEn: 'ㄹ drop: 알다+세요→아세요' },
      { ko: '엄마가 만드는 음식이 최고예요.', zh: '妈妈做的菜最棒。', zhEn: 'Mom\'s cooking is the best.', note: 'ㄹ脱落：만들다+는→만드는', noteEn: 'ㄹ drop: 만들다+는→만드는' },
    ],
    similarPatterns: ['ㄷ 불규칙', '으 탈락'],
    difference: 'ㄹ 脱落有明确触发条件——只在 ㄴ·ㅂ·ㅅ·오 开头的语尾前掉（삽니다·사세요·사는），遇 아/어 系语尾则保留（살아요）。这与 ㄷ 不规则（ㄷ→ㄹ）方向相反：一个是掉 ㄹ，一个是生出 ㄹ，别搞反。', differenceEn: 'ㄹ drop has clear trigger conditions—it only drops before endings starting with ㄴ·ㅂ·ㅅ·오 (삽니다·사세요·사는), and is kept with 아/어 endings (살아요). This is the opposite of ㄷ irregular (ㄷ→ㄹ): one drops ㄹ, the other creates ㄹ, so don\'t mix them up.',
    toriTip: '🐰 ㄹ 脱落背口诀："ㄴ·ㅂ·ㅅ·오 面前，ㄹ 就跑"。살다→삽니다·사세요·사는、알다→아세요·아는、만들다→만드세요。但配 아/어요 时 ㄹ 老实待着：살아요·알아요·만들어요。所有 ㄹ 结尾词都这样，无例外。', toriTipEn: '🐰 For ㄹ drop, memorize the mnemonic: "Before ㄴ·ㅂ·ㅅ·오, ㄹ runs away." 살다→삽니다·사세요·사는, 알다→아세요·아는, 만들다→만드세요. But with 아/어요, ㄹ stays put: 살아요·알아요·만들어요. All words ending in ㄹ follow this, no exceptions.',
  },

  // =====================================================================
  //  高频散点补充 (助词/文型)
  // =====================================================================

  // src: 补充-처럼같이
  {
    id: 'g220', title: '像一样', titleEn: 'like', pattern: '처럼 / 같이',
    level: 'beginner', topik: 'TOPIK 1~2级', topikEn: 'TOPIK Level 1~2', category: '조사',
    usage: '接名词后表示"像…一样"', usageEn: 'Used after a noun to mean "like..."',
    explanation: '처럼 和 같이 都接在名词后，表示"像…一样、如同…般"，多用于比喻。两词基本可互换，처럼 稍偏书面、같이 更口语。放在被比喻对象与谓语之间。注意 같이 作副词时另有"一起"义（같이 가요），靠位置和语境区分。', explanationEn: '처럼 and 같이 both attach to nouns to mean "like..." or "as...", often used in similes. They\'re basically interchangeable, with 처럼 slightly more formal and 같이 more colloquial. They go between the compared object and the predicate. Note that 같이 as an adverb can also mean "together" (같이 가요), distinguished by position and context.',
    conjugation: '名词 + 처럼：천사처럼 / 바보처럼 / 눈처럼\n名词 + 같이：불같이 / 얼음같이 / 매일같이\n（无받침变化，直接附加）',
    examples: [
      { ko: '그 사람은 천사처럼 착해요.', zh: '那个人像天使一样善良。', zhEn: 'That person is as kind as an angel.', note: '像一样：像天使般善良', noteEn: 'Like: as kind as an angel' },
      { ko: '눈처럼 하얀 드레스를 입었어요.', zh: '穿了像雪一样白的裙子。', zhEn: 'She wore a dress as white as snow.', note: '像一样：像雪般白', noteEn: 'like: as white as snow' },
      { ko: '아이가 불같이 화를 냈어요.', zh: '孩子火冒三丈。', zhEn: 'The child was furious.', note: '같이比喻：像火一样发火', noteEn: '같이 metaphor: to be angry like fire' },
    ],
    similarPatterns: ['-듯이', '만큼'],
    difference: '처럼/같이 是"像…一样"的比喻（천사처럼 착하다 像天使般善良）；만큼（g139）是"和…程度相当"（너만큼 크다 和你一样高，强调等量）；-듯이（g45）接动词表方式比喻。처럼与같이几乎可换，같이另有"一起"义需靠语境分辨。', differenceEn: '처럼/같이 mean "like..." (천사처럼 착하다 as kind as an angel); 만큼 (g139) means "to the same degree as" (너만큼 크다 as tall as you, emphasizing equality); -듯이 (g45) attaches to verbs for manner metaphors.처럼 and 같이 are almost interchangeable, but 같이 also means "together," so context matters.',
    toriTip: '🐰 처럼 和 같이 都是"像…一样"，天使般善良=천사처럼 착하다。두 词随便换基本没差。小心 같이 还有"一起"的意思（같이 놀자 一起玩），看它在句子里的位置就懂了：贴在名词屁股后=像，放动词前=一起。', toriTipEn: '🐰 처럼 and 같이 both mean "like..." — as kind as an angel = 천사처럼 착하다. You can swap them freely. But watch out: 같이 also means "together" (같이 놀자 let\'s play together). Position tells you: after a noun = like; before a verb = together.',
  },

  // src: 补充-대로
  {
    id: 'g221', title: '按照/正如', titleEn: 'according to / just as', pattern: '대로 / -는 대로',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"按照…、正如…那样"', usageEn: 'indicates "according to..., just as..."',
    explanation: '대로 接名词表示"按照…（原样）"（약속대로 按约定、말대로 照说的）；接动词冠形词形（-는/-(으)ㄴ 대로）表示"按…那样"或"一…就（立刻）"。表方式时强调"依原样、不走样"，表时间时（-는 대로）强调"动作一完成立即"。', explanationEn: '대로 attaches to nouns to mean "according to... (as is)" (약속대로 as promised, 말대로 as said); with verb modifiers (-는/-(으)ㄴ 대로) it means "just as..." or "as soon as." For manner, it stresses "exactly as is"; for time (-는 대로), it stresses "immediately after."',
    conjugation: '名词 + 대로：약속대로 / 예상대로 / 순서대로 / 마음대로\n动词现在 + 는 대로（按/一就）：말하는 대로 / 도착하는 대로\n动词过去 + (으)ㄴ 대로（按已然）：배운 대로 / 시킨 대로', conjugationEn: 'Noun + 대로: 약속대로 / 예상대로 / 순서대로 / 마음대로\\nVerb present + 는 대로 (as/as soon as): 말하는 대로 / 도착하는 대로\\nVerb past + (으)ㄴ 대로 (as done): 배운 대로 / 시킨 대로',
    examples: [
      { ko: '약속대로 제시간에 왔어요.', zh: '按约定准时来了。', zhEn: 'He came on time as promised.', note: '按照：按约定', noteEn: 'according to: as promised' },
      { ko: '선생님이 가르쳐 준 대로 했어요.', zh: '按老师教的做了。', zhEn: 'I did as the teacher taught.', note: '正如：照老师教的', noteEn: 'just as: as the teacher taught' },
      { ko: '도착하는 대로 연락 주세요.', zh: '一到就请联系我。', zhEn: 'Contact me as soon as you arrive.', note: '一就：一到达就联系', noteEn: 'as soon as: contact upon arrival' },
    ],
    similarPatterns: ['-자마자', '만큼'],
    difference: '대로 有两义：接名词/过去冠形词=方式"按照原样"（배운 대로 照学的）；接现在冠形词的 -는 대로=时间"一…就立刻"（도착하는 대로 一到就），后者与 -자마자（g39）近，但 -는 대로 更强调"随即着手处理"、常用于承诺。', differenceEn: '대로 has two meanings: with nouns/past modifiers = manner "as is" (배운 대로 as learned); with present modifier -는 대로 = time "as soon as" (도착하는 대로 as soon as you arrive). The latter is close to -자마자 (g39), but -는 대로 emphasizes "handle it right away," often in promises.',
    toriTip: '🐰 대로 一词两用：贴名词或过去式=照原样（약속대로 按约定、배운 대로 照学的）；贴现在式 -는 대로=一…马上（끝나는 대로 一结束就）。想说"随你便"用 마음대로，超常用。表"立刻"时它比 -자마자 更有"这就去办"的行动感。', toriTipEn: '🐰 대로 does double duty: after nouns or past tense = as is (약속대로 as promised, 배운 대로 as learned); after present tense -는 대로 = as soon as (끝나는 대로 as soon as it ends). For "whatever you want," use 마음대로 — super common. For "immediately," it feels more action-ready than -자마자.',
  },

  // src: 补充-로서
  {
    id: 'g222', title: '作为（身份）', titleEn: 'as (a role)', pattern: '(으)로서',
    level: 'intermediate', topik: 'TOPIK 3~4级', topikEn: 'TOPIK Level 3~4', category: '조사',
    usage: '表示身份、资格、立场', usageEn: 'indicates identity, qualification, or standpoint',
    explanation: '接名词后表示"作为…（身份/资格/立场）"，说明某人以何种身份做某事或某物起何种作用。前字有받침（ㄹ除外）用 으로서，无받침或ㄹ用 로서。与表手段的 (으)로써（g223）音近义不同，是TOPIK高频对比考点。',
    conjugation: '有받침(非ㄹ) + 으로서：학생으로서 / 인간으로서\n无받침或ㄹ + 로서：리더로서 / 친구로서 / 교사로서',
    examples: [
      { ko: '학생으로서 최선을 다하겠습니다.', zh: '作为学生，我会全力以赴。', zhEn: 'As a student, I\'ll give my all.', note: '身份：作为学生', noteEn: 'identity: as a student' },
      { ko: '부모로서 당연히 해야 할 일이에요.', zh: '作为父母这是理所当然要做的。', zhEn: 'As a parent, this is only natural.', note: '身份：作为父母', noteEn: 'Identity: As a parent' },
      { ko: '친구로서 충고 하나 할게.', zh: '作为朋友我给你个忠告。', zhEn: 'As a friend, let me give you a piece of advice.', note: '身份：作为朋友', noteEn: 'Identity: As a friend' },
    ],
    similarPatterns: ['(으)로써', '(으)로'],
    difference: '(으)로서=身份资格"作为…"（학생으로서 作为学生）；(으)로써=手段方法"用/凭…"（대화로써 用对话/g223）。区分口诀："로서=身份(사람)、로써=手段(수단)"。二者读音几乎一样，全靠语境和是否可替换"作为"来判断。', differenceEn: '(으)로서 = identity/qualification, "as..." (학생으로서 as a student); (으)로써 = means/method, "by/with..." (대화로써 through conversation/g223). Mnemonic: 로서 = identity (사람), 로써 = means (수단). They sound nearly identical, so rely on context and whether "as" can replace it.',
    toriTip: '🐰 로서 vs 로써 是韩国人自己都会写错的经典对：로**서**=身份/资格（"作为"，엄마로서 作为妈妈）、로**써**=手段/工具（"用/靠"，말로써 用言语）。TOPIK 爱考。记法：로서的"서"像"身份证"的证，站在某个立场上。', toriTipEn: '🐰 로서 vs 로써 is a classic pair even Koreans mess up: 로**서** = identity/qualification ("as," 엄마로서 as a mom), 로**써** = means/tool ("by/with," 말로써 with words). TOPIK loves testing it. Tip: the 서 in 로서 is like the "ID" in ID card—standing in a certain position.',
  },

  // src: 补充-로써
  {
    id: 'g223', title: '凭借（手段）', titleEn: 'By means of (method)', pattern: '(으)로써',
    level: 'advanced', topik: 'TOPIK 4~5级', topikEn: 'TOPIK Level 4~5', category: '조사',
    usage: '表示手段、方法、工具、依据', usageEn: 'Indicates means, method, tool, or basis',
    explanation: '接名词后表示"用…、凭借…、以…（手段/方法/材料）"，说明借助何种方式达成某事。也可接 -(으)ㅁ 名词化形式表"通过做…"。前字有받침（ㄹ除外）用 으로써，无받침或ㄹ用 로써。比表工具的普通 (으)로（g9）更书面、更强调"以此为手段"，多用于正式文书。',
    conjugation: '有받침(非ㄹ) + 으로써：대화로써 / 노력으로써\n无받침或ㄹ + 로써：말로써 / 투표로써\n动词名词化 + 으로써：실천함으로써 / 노력함으로써',
    examples: [
      { ko: '대화로써 문제를 해결했어요.', zh: '通过对话解决了问题。', zhEn: 'We solved the problem through dialogue.', note: '手段：用对话', noteEn: 'Means: through dialogue' },
      { ko: '꾸준히 노력함으로써 목표를 이뤘다.', zh: '通过持续努力实现了目标。', zhEn: 'I achieved my goal through persistent effort.', note: '手段：凭借努力', noteEn: 'Means: through effort' },
      { ko: '투표로써 대표를 뽑습니다.', zh: '通过投票选出代表。', zhEn: 'They selected a representative by vote.', note: '手段：以投票', noteEn: 'Means: by voting' },
    ],
    similarPatterns: ['(으)로서', '(으)로'],
    difference: '(으)로써=手段方法"用/凭…"（대화로써 用对话）；(으)로서=身份资格"作为…"（g222）。(으)로써 与普通工具助词 (으)로（g9）义近，但 로써 更书面郑重、常接 -(으)ㅁ 表"通过做某事"（실천함으로써 通过实践），日常口语多用 (으)로 就够。', differenceEn: '(으)로써 = means/method, "by/with..." (대화로써 through conversation); (으)로서 = identity/qualification, "as..." (g222). (으)로써 is similar to the regular tool particle (으)로 (g9), but 로써 is more formal and serious, often attaching to -(으)ㅁ to mean "by doing something" (실천함으로써 through practice). In everyday speech, (으)로 is usually enough.',
    toriTip: '🐰 로써=手段工具（"用、凭、以"）。대화로써 用对话、노력함으로써 靠努力。它是 (으)로 的正式书面升级版，写论文、报告时用它显得郑重。和 로서（作为身份）只差一个字，务必分清：써=手段(수단)。', toriTipEn: '🐰 로써 = means/tool ("by, with, through"). 대화로써 through conversation, 노력함으로써 through effort. It\'s the formal written upgrade of (으)로—use it in papers and reports to sound serious. It differs from 로서 (as identity) by just one letter, so be careful: 써 = means (수단).',
  },

  // src: 补充-조차
  {
    id: 'g224', title: '连都（消极）', titleEn: 'Even (negative)', pattern: '조차',
    level: 'intermediate', topik: 'TOPIK 3~4级', topikEn: 'TOPIK Level 3~4', category: '조사',
    usage: '表示"连…都（不/没）"，强调最基本的也未达成', usageEn: 'Indicates "not even..." emphasizing that even the bare minimum wasn\'t achieved',
    explanation: '接名词后表示"连…都…"，强调连最起码、最基本的情况都未能实现，语气多含意外或消极失望。常与否定谓语搭配（조차 안/못/없다）。不能用于命令、请诱句。与 마저（g159）、까지（g157）同为"连…都"类，但 조차 最强调"连最低限度也不行"的负面感。', explanationEn: 'Attached to nouns to mean "not even..." emphasizing that even the most basic thing wasn\'t achieved, often with a tone of surprise or disappointment. Commonly pairs with negative predicates (조차 안/못/없다). Cannot be used in commands or suggestions. Along with 마저 (g159) and 까지 (g157), it\'s one of the "even" particles, but 조차 most strongly emphasizes the negative sense of "not even the minimum."',
    conjugation: '名词 + 조차：인사조차 / 이름조차 / 물조차\n（无받침变化，常接否定：조차 안/못/없다/모르다）',
    examples: [
      { ko: '너무 바빠서 밥 먹을 시간조차 없어요.', zh: '太忙了，连吃饭的时间都没有。', zhEn: 'I\'m so busy I don\'t even have time to eat.', note: '连都：连吃饭时间都没', noteEn: 'Even: not even time to eat' },
      { ko: '그는 인사조차 하지 않고 가 버렸어요.', zh: '他连招呼都不打就走了。', zhEn: 'He left without even saying goodbye.', note: '连都：连招呼都不打', noteEn: 'Even: didn\'t even say goodbye' },
      { ko: '이름조차 기억나지 않아요.', zh: '连名字都想不起来。', zhEn: 'I can\'t even remember the name.', note: '连都：连名字都不记得', noteEn: 'Even: don\'t even remember the name' },
    ],
    similarPatterns: ['마저', '까지'],
    difference: '조차 强调"连最基本的都不…"（인사조차 안 해 连招呼都不打），负面失望；마저（g159）强调"连最后剩的也没了"（친구마저 떠났다 连朋友都走了），失落；까지（g157）语气最中性可褒可贬。三者都译"连…都"，조차多配否定、突出"最低限度都未达"。', differenceEn: '조차 emphasizes "not even the most basic..." (인사조차 안 해 didn\'t even say goodbye), negative disappointment; 마저 (g159) emphasizes "even the last remaining is gone" (친구마저 떠났다 even friends left), loss; 까지 (g157) is the most neutral, can be positive or negative. All three translate as "even...", 조차 pairs mostly with negatives, highlighting "didn\'t even meet the minimum".',
    toriTip: '🐰 조차=连最起码的都不行（消极）。"물조차 못 마셔요"连水都喝不了、"이름조차 몰라요"连名字都不知道。后面几乎总跟否定。它和 마저·까지 是"连…都"三兄弟，조차 专管"最低标准都没达到"的失望感。', toriTipEn: '🐰 조차 = not even the bare minimum (negative). "물조차 못 마셔요" can\'t even drink water, "이름조차 몰라요" don\'t even know the name. Almost always followed by a negative. It\'s one of the "even..." trio with 마저 and 까지; 조차 handles the disappointment of "didn\'t even meet the lowest standard".',
  },

  // src: 补充-밖에
  {
    id: 'g225', title: '只有（+否定）', titleEn: 'only (with negative)', pattern: '밖에',
    level: 'beginner', topik: 'TOPIK 1~2级', topikEn: 'TOPIK Level 1~2', category: '조사',
    usage: '接名词后＋否定谓语，表示"只有…、除…之外没有"', usageEn: 'Attached after a noun + negative predicate, meaning "only..., nothing besides..."',
    explanation: '接在名词后，必须与否定形式（없다/안/못/모르다）搭配，表示"只有…、除了…之外别无"，等于"만" 的否定框架。字面是"…之外（没有）"，故谓语一定是否定，但整句意思是肯定的"只/仅"。如 물밖에 없어요＝只有水。与 만（g85，接肯定）互补。', explanationEn: 'Attached after a noun, must pair with a negative form (없다/안/못/모르다), meaning "only..., nothing besides...", equivalent to the negative frame of "만". Literally "...outside (there is none)", so the predicate is always negative, but the sentence means positive "only/just". E.g., 물밖에 없어요 = only water. Complementary to 만 (g85, with positive).',
    conjugation: '名词 + 밖에 + 否定谓语：물밖에 없어요 / 하나밖에 안 남았어요 / 조금밖에 못 해요 / 이것밖에 몰라요\n（无받침变化，谓语必否定）',
    examples: [
      { ko: '지갑에 천 원밖에 없어요.', zh: '钱包里只有一千韩元。', zhEn: 'There\'s only 1,000 won in the wallet.', note: '只有：只有一千元', noteEn: 'Only: only 1,000 won' },
      { ko: '한국어는 조금밖에 못 해요.', zh: '韩语只会一点点。', zhEn: 'I only know a little Korean.', note: '只有：只会一点', noteEn: 'Only: only a little' },
      { ko: '믿을 사람은 너밖에 없어.', zh: '能信的只有你。', zhEn: 'You\'re the only one I can trust.', note: '只有：只有你', noteEn: 'Only: only you' },
    ],
    similarPatterns: ['만', '뿐'],
    difference: '밖에 必接否定谓语，整句表肯定的"只"（물밖에 없어요 只有水）；만（g85）接肯定谓语表"只"（물만 있어요 只有水）——两者意思相同但一否定一肯定，是互补对。-(으)ㄹ 뿐（g109）也表"仅仅"但接谓语后。初学最易漏掉 밖에 后面的否定。', differenceEn: '밖에 must take a negative predicate, the whole sentence means positive "only" (물밖에 없어요 only water); 만 (g85) takes a positive predicate for "only" (물만 있어요 only water) — same meaning but one negative one positive, complementary pair. -(으)ㄹ 뿐 (g109) also means "merely" but attaches after a predicate. Beginners most often forget the negative after 밖에.',
    toriTip: '🐰 밖에 是个"傲娇助词"：字面说"…以外（没有）"，后面必须跟否定（없다/안/못），但意思是肯定的"只有"。물밖에 없어요＝只有水。它和 만 是双胞胎：만 있어요 = 밖에 없어요，一个配肯定一个配否定，千万别忘了 밖에 后面的否定词。', toriTipEn: '🐰 밖에 is a "tsundere particle": literally says "...outside (there is none)", must be followed by a negative (없다/안/못), but means positive "only". 물밖에 없어요 = only water. It\'s a twin with 만: 만 있어요 = 밖에 없어요, one with positive one with negative, don\'t forget the negative after 밖에.',
  },

  // src: 补充-은채로
  {
    id: 'g226', title: '保持某状态', titleEn: 'maintaining a state', pattern: '-(으)ㄴ 채(로)',
    level: 'intermediate', topik: 'TOPIK 3~4级', topikEn: 'TOPIK Level 3~4', category: '문형',
    usage: '表示"就那样…着、保持某状态下（做另一动作）"', usageEn: 'Means "just...ing, maintaining a state (while doing another action)"',
    explanation: '接在动词过去冠形词形后，表示前一动作完成后的状态一直保持着，在此状态下进行后一动作，相当于"就…着、保持…的状态"。强调"没有改变某个状态就做了下一件事"，常含理应改变却未改变的语感。前字有받침 + 은 채로，无받침 + ㄴ 채로。',
    conjugation: '动词过去冠形 + (으)ㄴ 채(로)：\n有받침 + 은 채로：신발을 신은 채로 / 눈을 감은 채로\n无받침 + ㄴ 채로：불을 켠 채로 / 문을 연 채로\n（로 可省略）',
    examples: [
      { ko: '신발을 신은 채로 들어왔어요.', zh: '穿着鞋就进来了。', zhEn: 'He came in with his shoes on.', note: '保持状态：穿着鞋（没脱）', noteEn: 'Maintaining state: with shoes on (didn\'t take off)' },
      { ko: '불을 켠 채로 잠들었어요.', zh: '开着灯就睡着了。', zhEn: 'He fell asleep with the light on.', note: '保持状态：灯开着（没关）', noteEn: 'Keeping a state: the light is on (not turned off)' },
      { ko: '창문을 연 채로 외출했어요.', zh: '开着窗就出门了。', zhEn: 'I went out with the window open.', note: '保持状态：窗开着（没关）', noteEn: 'Keeping a state: the window is open (not closed)' },
    ],
    similarPatterns: ['-(으)면서', '-(으)ㄴ 상태로'],
    difference: '-(으)ㄴ 채로 强调"某状态维持不变地做下一动作"，多含"本该改变却没变"（신발을 신은 채로 穿着鞋没脱就）；-(으)면서（g30）是"两动作同时进行"（듣으면서 먹다 边听边吃）。채로 前是已完成并保持的状态，면서 前后是并行的两个动作。', differenceEn: '-(으)ㄴ 채로 emphasizes "doing the next action while maintaining a certain state," often implying "something that should have changed but didn\'t" (신발을 신은 채로: wearing shoes without taking them off); -(으)면서 (g30) is "two actions happening simultaneously" (듣으면서 먹다: eating while listening). 채로 is preceded by a completed and maintained state, while 면서 connects two parallel actions.',
    toriTip: '🐰 -(으)ㄴ 채로 = 保持某状态没变就干了下一件事，常带点"哎呀忘了改"的语气：불을 켠 채로 잤어（开着灯就睡了）、신발 신은 채로（鞋都没脱）。和"边…边…"的 -(으)면서 不同，채로 前面那个状态是"僵在那儿没动"的。', toriTipEn: '🐰 -(으)ㄴ 채로 = doing the next thing without changing a certain state, often with a tone of "oops, forgot to change it": 불을 켠 채로 잤어 (slept with the light on), 신발 신은 채로 (without taking off shoes). Unlike -(으)면서 which means "while doing," the state before 채로 is "frozen in place."',
  },

  // src: 补充-다시피
  {
    id: 'g227', title: '正如所知', titleEn: 'As is known', pattern: '-다시피',
    level: 'advanced', topik: 'TOPIK 4~5级', topikEn: 'TOPIK Level 4~5', category: '연결',
    usage: '表示"正如…（所看到/所知道的）那样"', usageEn: 'Indicates "just as... (seen/known)"',
    explanation: '接在动词词干后，表示"正如…那样"，前面多为 보다/알다/듣다/느끼다 等感知动词，引出听者已知或可见的事实作为后文铺垫，相当于"正如您所见/所知"。多用于正式发言、演讲开头。另有"几乎…、近乎…"义（매일 굶다시피 하다 几乎每天挨饿）。', explanationEn: 'Attached to a verb stem, it means "just as..." and is often preceded by perception verbs like 보다/알다/듣다/느끼다, introducing a fact the listener already knows or can see as a lead-in, equivalent to "as you can see/know." Commonly used in formal speeches or opening remarks. It also has the meaning of "almost, nearly" (매일 굶다시피 하다: almost starving every day).',
    conjugation: '动词词干 + 다시피：보다시피 / 알다시피 / 듣다시피 / 느끼다시피\n（ㄹ结尾不脱落：알다→알다시피）\n"几乎"义：동사 + 다시피 하다（굶다시피 하다）', conjugationEn: 'Verb stem + 다시피: 보다시피 / 알다시피 / 듣다시피 / 느끼다시피\\n(ㄹ ending doesn\'t drop: 알다→알다시피)\\n"Almost" meaning: verb + 다시피 하다 (굶다시피 하다)',
    examples: [
      { ko: '보시다시피 상황이 좋지 않습니다.', zh: '正如您所见，情况不太好。', zhEn: 'As you can see, the situation isn\'t great.', note: '正如所见：如您所见', noteEn: 'As seen: as you can see' },
      { ko: '아시다시피 이번 프로젝트는 중요합니다.', zh: '正如您所知，这次项目很重要。', zhEn: 'As you know, this project is very important.', note: '正如所知：如您所知', noteEn: 'As known: as you know' },
      { ko: '그는 매일 굶다시피 하며 일했어요.', zh: '他几乎每天饿着肚子工作。', zhEn: 'He works almost starving every day.', note: '几乎：近乎挨饿', noteEn: 'Almost: nearly starving' },
    ],
    similarPatterns: ['-듯이', '-(으)ㄴ 것처럼'],
    difference: '-다시피 引出对方"已知/可见"的事实作铺垫（보시다시피 正如您所见），常配 보다/알다；-듯이（g45）是纯比喻"像…一样"（물 흐르듯이 如流水般）。-다시피 强调"这是你我都清楚的事实"，-듯이 强调"打比方"。另 다시피 하다 表"几乎"。', differenceEn: '-다시피 introduces a fact the listener "already knows/can see" as a lead-in (보시다시피: as you can see), often with 보다/알다; -듯이 (g45) is a pure metaphor "like..." (물 흐르듯이: like flowing water). -다시피 emphasizes "this is a fact we both know," while -듯이 emphasizes "making a comparison." Also, 다시피 하다 means "almost."',
    toriTip: '🐰 -다시피 是演讲/汇报开场白神器："보시다시피"（正如各位所见）、"아시다시피"（众所周知）。先搬出对方已知的事实，再引出正题，显得郑重又拉近距离。它还有个"几乎"用法：굶다시피 하다=几乎在挨饿，程度夸张时用。', toriTipEn: '🐰 -다시피 is a great opener for speeches/reports: "보시다시피" (as you all can see), "아시다시피" (as everyone knows). First bring up a fact the audience knows, then lead into the main point—it feels formal and builds rapport. It also has an "almost" usage: 굶다시피 하다 = almost starving, used for exaggeration.',
  },

  // src: 补充-을겸
  {
    id: 'g228', title: '兼/顺便', titleEn: 'Also/In addition', pattern: '-(으)ㄹ 겸 / N 겸',
    level: 'intermediate', topik: 'TOPIK 3~4级', topikEn: 'TOPIK Level 3~4', category: '연결',
    usage: '表示"兼…、顺便…（一举两得）"', usageEn: 'Indicates "also, in addition, killing two birds with one stone"',
    explanation: '接在动词将来冠形词形后，表示做一件事同时兼有另一目的，相当于"兼、顺便、一举两得"。常成对使用 -(으)ㄹ 겸 -(으)ㄹ 겸（해서）列举多个目的。也可接名词表"兼具两种身份/用途"（침실 겸 서재 卧室兼书房）。前字有받침 + 을 겸，无받침或ㄹ + ㄹ 겸。',
    conjugation: '动词将来冠形 + (으)ㄹ 겸：\n有받침 + 을 겸：운동도 할 겸 / 책도 읽을 겸\n无받침或ㄹ + ㄹ 겸：바람도 쐴 겸 / 친구도 만날 겸\n名词 + 겸：아침 겸 점심 / 침실 겸 서재',
    examples: [
      { ko: '바람도 쐴 겸 산책하러 나왔어요.', zh: '顺便透透气，出来散步了。', zhEn: 'I came out for a walk to get some fresh air too.', note: '兼：兼透气', noteEn: 'Also: also to get some air' },
      { ko: '친구도 만날 겸 서울에 갔어요.', zh: '顺便见见朋友，去了首尔。', zhEn: 'I went to Seoul to see a friend too.', note: '兼：兼见朋友', noteEn: 'Also: also to see a friend' },
      { ko: '늦게 일어나서 아침 겸 점심을 먹었어요.', zh: '起晚了，吃了早午餐。', zhEn: 'Woke up late and had brunch.', note: '名词兼：早餐兼午餐', noteEn: 'Noun + 겸: breakfast and lunch combined' },
    ],
    similarPatterns: ['-(으)ㄹ 겸 해서', '-는 김에'],
    difference: '-(으)ㄹ 겸 强调"一个行动兼有两个（预先并列的）目的"（운동도 할 겸 산책 兼运动去散步）；-(으)ㄴ/는 김에（g123）强调"趁做A的机会顺带做B"（나온 김에 趁出来了）。겸 的两目的地位对等、事先都想做，김에 是临时起意的"既然…就顺便"。', differenceEn: '-(으)ㄹ 겸 emphasizes "one action serves two (pre-planned) purposes" (운동도 할 겸 산책 = going for a walk while also exercising); -(으)ㄴ/는 김에 (g123) emphasizes "doing B while you\'re at it, taking advantage of doing A" (나온 김에 = since you\'re out). With 겸, both purposes are equal and planned in advance; with 김에, it\'s a spontaneous "since I\'m here, might as well."',
    toriTip: '🐰 -(으)ㄹ 겸 = 一趟办两件事，两个目的都是本来就想干的。常叠用："바람도 쐴 겸 운동도 할 겸 나왔어"（既想透气又想运动就出来了）。接名词表"兼职双重身份"：아침 겸 점심（早午餐）、침실 겸 서재（卧室兼书房）。和"趁便"的 김에 语感不同：겸 是计划好的，김에 是临时顺带。', toriTipEn: '🐰 -(으)ㄹ 겸 = killing two birds with one stone, both purposes being things you wanted to do anyway. Often used in pairs: "바람도 쐴 겸 운동도 할 겸 나왔어" (came out to get some air and exercise). Attached to nouns it means "dual role": 아침 겸 점심 (brunch), 침실 겸 서재 (bedroom-cum-study). Different from 김에 ("while you\'re at it"): 겸 is planned, 김에 is spontaneous.',
  },

  // src: 补充-는수가있다
  {
    id: 'g229', title: '有时会（发生）', titleEn: 'Sometimes (it) happens', pattern: '-는 수가 있다',
    level: 'intermediate', topik: 'TOPIK 3~4级', topikEn: 'TOPIK Level 3~4', category: '문형',
    usage: '表示"有时会…、说不定会（发生不好的事）"', usageEn: 'Indicates "sometimes... might happen (something bad)"',
    explanation: '接在动词现在冠形词形后，表示某种（多为负面的）情况有可能发生、偶尔会出现，相当于"有时会…、弄不好会…、小心会…"。常用于提醒、警告，暗示若不注意就可能招致不良后果。수 是"可能性/办法"的依存名词。', explanationEn: 'Attached to the present adnominal form of a verb, it indicates that a certain (usually negative) situation may occur or occasionally happens, equivalent to "sometimes... might...", "could end up...", "watch out or...". Often used for reminders or warnings, implying that without care, bad consequences may follow. 수 is a dependent noun meaning "possibility/way."',
    conjugation: '动词现在冠形 + 는 수가 있다：\n다치는 수가 있다 / 늦는 수가 있다 / 잃어버리는 수가 있다 / 큰일 나는 수가 있다\n（否定警告常见：-다가는 …는 수가 있다）', conjugationEn: 'Verb present adnominal + 는 수가 있다: \\n다치는 수가 있다 (could get hurt) / 늦는 수가 있다 (could be late) / 잃어버리는 수가 있다 (could lose it) / 큰일 나는 수가 있다 (could be in big trouble)\\n(Common with negative warnings: -다가는 …는 수가 있다)',
    examples: [
      { ko: '조심하지 않으면 다치는 수가 있어요.', zh: '不小心的话有时会受伤。', zhEn: 'If you\'re not careful, you could get hurt.', note: '有时会：会受伤（警告）', noteEn: 'Sometimes might: could get hurt (warning)' },
      { ko: '그렇게 서두르다가는 실수하는 수가 있어요.', zh: '那样着急的话，弄不好会出错。', zhEn: 'If you rush like that, you might make a mistake.', note: '弄不好：会出错', noteEn: 'Might end up: making a mistake' },
      { ko: '방심하면 지는 수가 있으니 끝까지 집중해.', zh: '大意的话可能会输，要专注到底。', zhEn: 'If you let your guard down, you might lose—stay focused till the end.', note: '说不定：会输', noteEn: 'Might: lose' },
    ],
    similarPatterns: ['-(으)ㄹ 수(가) 있다', '-기 십상이다'],
    difference: '-는 수가 있다 强调"有时/弄不好会发生（负面）事"，带提醒警告语气（다치는 수가 있어 会受伤的哦）；-(으)ㄹ 수 있다（g67）是中性的"能/有可能"（갈 수 있어요 能去）。前者近似 -기 십상이다（g170，容易招致），但 수가 있다 更口语、更像长辈叮嘱。', differenceEn: '-는 수가 있다 emphasizes "sometimes/might end up (negative)" with a warning tone (다치는 수가 있어 = you could get hurt); -(으)ㄹ 수 있다 (g67) is neutral "can/possible" (갈 수 있어요 = can go). The former is similar to -기 십상이다 (g170, likely to invite), but 수가 있다 is more colloquial, like an elder\'s advice.',
    toriTip: '🐰 -는 수가 있다 = 长辈式警告"当心会…哦"。"뛰다가 넘어지는 수가 있어"（跑着跑着会摔的）、"그러다 큰일 나는 수가 있어"（那样下去会出大事）。后面接的都是不希望发生的事，配 -다가는 用最地道，妈妈唠叨专用句型。', toriTipEn: '🐰 -는 수가 있다 = elder-style warning "watch out, you might..." "뛰다가 넘어지는 수가 있어" (you might trip while running), "그러다 큰일 나는 수가 있어" (keep that up and something big will happen). It\'s always followed by something you don\'t want to happen, and pairs best with -다가는—a classic mom-nagging pattern.',
  },

  // =====================================================================
  //  中高级补充批 B10 (发现/让步/意图/派生)
  // =====================================================================

  // src: 补充-다보니까
  {
    id: 'g230', title: '做着做着发现', titleEn: 'Realize as you keep doing', pattern: '-다(가) 보니(까)',
    level: 'intermediate', topik: 'TOPIK 3~4级', topikEn: 'TOPIK Level 3~4', category: '연결',
    usage: '表示"（持续）做着做着，就发现/变成了…"', usageEn: 'Indicates "while (continuously) doing something, you naturally discover or end up in a certain state"',
    explanation: '接在动词词干后，表示反复或持续做某动作的过程中，自然发现某结果或达到某状态，相当于"…着…着就…、做久了就…"。前项是持续的动作，后项是随之出现的领悟或变化，多为不经意的自然结果。', explanationEn: 'Attached to a verb stem, it indicates that while repeatedly or continuously doing an action, you naturally discover a result or reach a state, equivalent to "as you keep doing... you find..." or "after doing it for a while...". The first part is the ongoing action, the second is the realization or change that follows, usually an unintentional natural outcome.',
    conjugation: '动词词干 + 다(가) 보니(까)：\n살다→살다 보니까 / 하다→하다 보니 / 듣다→듣다 보니까 / 만나다→만나다 보니', conjugationEn: 'Verb stem + 다(가) 보니(까): \\n살다→살다 보니까 / 하다→하다 보니 / 듣다→듣다 보니까 / 만나다→만나다 보니',
    examples: [
      { ko: '한국에서 살다 보니까 이제 김치가 없으면 안 돼요.', zh: '在韩国生活久了，现在没有泡菜就不行了。', zhEn: 'After living in Korea for a while, I can\'t do without kimchi now.', note: '做着发现：住久了离不开泡菜', noteEn: 'Realized after doing: can\'t live without kimchi after living long' },
      { ko: '매일 듣다 보니 이제 조금씩 들려요.', zh: '每天听着听着，现在能听懂一点了。', zhEn: 'Listening every day, now I can understand a bit.', note: '做着发现：听久了能听懂', noteEn: 'Realized after doing: can understand after listening long' },
      { ko: '자주 만나다 보니 정이 들었어요.', zh: '经常见面，见着见着就有感情了。', zhEn: 'Meeting often, as we kept meeting, feelings grew.', note: '做着发现：常见生情', noteEn: 'Doing it and discovering: common situations' },
    ],
    similarPatterns: ['-다(가) 보면', '-고 보니(까)'],
    difference: '-다 보니(까) 是"持续做后已经发现了（结果已出现）"，重在既成的领悟（살다 보니까 住着住着就…）；-다 보면（g231）是"如果持续做将会（未来假设）"，结果还没发生；-고 보니（g232）是"做完某个动作后才发现"，前项是已完成的单次动作。', differenceEn: '-다 보니(까) means "after continuously doing, you\'ve discovered (result already appeared)", focusing on the realization that has already happened (살다 보니까 as you live...); -다 보면 (g231) means "if you keep doing, it will (future assumption)", result hasn\'t happened yet; -고 보니 (g232) means "discovered after finishing an action", the preceding part is a completed one-time action.',
    toriTip: '🐰 -다 보니까 = 做着做着不知不觉就…。"공부하다 보니 밤이 됐어요"（学着学着天就黑了）。它是"过程中自然得出结果"，结果已经发生了。想说"要是一直做就会…"（还没发生）用 -다 보면，两个只差一个字，语感差在"已然"和"将然"。', toriTipEn: '🐰 -다 보니까 = while doing, before you know it... "공부하다 보니 밤이 됐어요" (as I studied, it became night). It\'s "naturally reaching a result in the process", and the result has already happened. To say "if you keep doing, it will..." (hasn\'t happened yet), use -다 보면. They differ by just one letter, but the nuance is between "already happened" and "will happen".',
  },

  // src: 补充-다보면
  {
    id: 'g231', title: '一直做的话就会', titleEn: 'If you keep doing it, it will', pattern: '-다(가) 보면',
    level: 'intermediate', topik: 'TOPIK 3~4级', topikEn: 'TOPIK Level 3~4', category: '연결',
    usage: '表示"（如果）一直做…，就会（出现某结果）"', usageEn: 'Indicates "(if) you keep doing..., (a certain result) will occur"',
    explanation: '接在动词词干后，表示假设持续或反复做某动作，将会自然产生某结果，相当于"…着…着就会…、坚持做的话就会…"。前项是假设的持续动作，后项是预测的自然结果，常用于鼓励、劝导，结果尚未发生。', explanationEn: 'Attached to a verb stem, it indicates that if you hypothetically continue or repeatedly do an action, a result will naturally occur, equivalent to "as you keep doing... it will..." or "if you persist, it will...". The preceding part is a hypothetical continuous action, and the following part is a predicted natural result, often used for encouragement or advice, with the result not yet having occurred.',
    conjugation: '动词词干 + 다(가) 보면：\n하다→하다 보면 / 살다→살다 보면 / 읽다→읽다 보면 / 노력하다→노력하다 보면', conjugationEn: 'Verb stem + 다(가) 보면: \\n하다→하다 보면 / 살다→살다 보면 / 읽다→읽다 보면 / 노력하다→노력하다 보면',
    examples: [
      { ko: '계속 연습하다 보면 실력이 늘 거예요.', zh: '一直练下去的话，实力就会提高。', zhEn: 'If you keep practicing, your skills will improve.', note: '就会：练下去会进步', noteEn: 'It will: keep practicing and you\'ll improve' },
      { ko: '살다 보면 좋은 날도 올 거예요.', zh: '日子过下去，好日子也会来的。', zhEn: 'If you keep living, good days will come.', note: '就会：活着会有好日子', noteEn: 'It will: keep living and good days will come' },
      { ko: '자꾸 읽다 보면 뜻을 알게 돼요.', zh: '反复读的话，就会明白意思。', zhEn: 'If you read it repeatedly, you\'ll understand the meaning.', note: '就会：读多了会懂', noteEn: 'It will: read more and you\'ll understand' },
    ],
    similarPatterns: ['-다(가) 보니(까)', '-(으)면'],
    difference: '-다 보면 是"如果持续做将会（未来假设，结果未发生）"，常配 -(으)ㄹ 거예요/-게 되다，多用于鼓励（하다 보면 늘 거예요 做下去会进步）；-다 보니(까)（g230）是"做着做着已经发现了（结果已出现）"。一个朝前看（预测），一个朝后看（既成）。', differenceEn: '-다 보면 means "if you keep doing, it will (future assumption, result not yet occurred)", often paired with -(으)ㄹ 거예요/-게 되다, mostly used for encouragement (하다 보면 늘 거예요 keep doing and you\'ll improve); -다 보니(까) (g230) means "while doing, you\'ve already discovered (result has appeared)". One looks forward (prediction), the other looks back (already done).',
    toriTip: '🐰 -다 보면 = 只要一直做，早晚会…。"살다 보면 다 괜찮아질 거야"（日子过下去都会好起来的）——安慰人的金句。结果还没来，是对未来的预测和鼓励。和已经发生的 -다 보니까 正好相反方向。', toriTipEn: '🐰 -다 보면 = as long as you keep doing it, eventually... "살다 보면 다 괜찮아질 거야" (if you keep living, everything will be fine) — a golden phrase for comforting people. The result hasn\'t come yet; it\'s a prediction and encouragement for the future. It\'s the exact opposite direction of -다 보니까, which is already done.',
  },

  // src: 补充-고보니까
  {
    id: 'g232', title: '做了才发现', titleEn: 'Discovered after doing', pattern: '-고 보니(까)',
    level: 'intermediate', topik: 'TOPIK 3~4级', topikEn: 'TOPIK Level 3~4', category: '연결',
    usage: '表示"做完…之后才发现（意外的事实）"', usageEn: 'Indicates "after finishing..., you discover (an unexpected fact)"',
    explanation: '接在动词词干后，表示完成某个动作之后，才发现了原本不知道的事实或意外的情况，相当于"…了之后才发现、一…才知道"。前项是已完成的单次动作，后项是做完后才察觉的、常出乎意料的结果。', explanationEn: 'Attached to a verb stem, it indicates that after completing an action, you discover a fact you didn\'t know or an unexpected situation, equivalent to "after doing..., you find out" or "only after doing... did you realize". The preceding part is a completed one-time action, and the following part is a result that is often surprising and only noticed after finishing.',
    conjugation: '动词词干 + 고 보니(까)：\n사다→사고 보니 / 오다→오고 보니까 / 듣다→듣고 보니 / 만나다→만나고 보니까', conjugationEn: 'Verb stem + 고 보니(까): \\n사다→사고 보니 / 오다→오고 보니까 / 듣다→듣고 보니 / 만나다→만나고 보니까',
    examples: [
      { ko: '집에 오고 보니 지갑을 회사에 두고 왔더라고요.', zh: '回到家才发现钱包落在公司了。', zhEn: 'Only after getting home did I realize I left my wallet at the office.', note: '才发现：到家才发现落钱包', noteEn: 'Discovered: realized at home that I left the wallet' },
      { ko: '사고 보니 같은 걸 두 개나 샀어요.', zh: '买完才发现买了两个一样的。', zhEn: 'Only after buying did I realize I bought two of the same.', note: '才发现：买完发现买重了', noteEn: 'Discovered: realized after buying that I bought duplicates' },
      { ko: '이야기를 듣고 보니 제 오해였어요.', zh: '听了之后才发现是我误会了。', zhEn: 'Only after listening did I realize I misunderstood.', note: '才发现：听完发现是误会', noteEn: 'Discovered: realized after listening that it was a misunderstanding' },
    ],
    similarPatterns: ['-다(가) 보니(까)', '-았/었더니'],
    difference: '-고 보니(까) 前项是"已完成的单次动作"，做完之后才发现意外事实（오고 보니 到了才发现）；-다 보니(까)（g230）前项是"持续反复的动作"，做久了自然发现（살다 보니 住久了发现）。一个是"做完才知道"，一个是"做久了才知道"。', differenceEn: '-고 보니(까) means the preceding clause is a "completed one-time action," and you discover an unexpected fact after doing it (오고 보니 realized after arriving); -다 보니(까) (g230) means the preceding clause is a "continuous/repeated action," and you naturally realize it after doing it for a while (살다 보니 realized after living there). One is "found out after finishing," the other is "found out after doing it for a long time."',
    toriTip: '🐰 -고 보니까 = 干完一看，咦？才发现…。"결혼하고 보니 성격이 안 맞아"（结了婚才发现性格不合）。前面是做完的一件事，后面常是没料到的真相，带点恍然大悟或哭笑不得的味道。和"持续做"的 -다 보니까 区别在前项是一次性还是长期。', toriTipEn: '🐰 -고 보니까 = after doing it, you look and go, "huh?" then realize... "결혼하고 보니 성격이 안 맞아" (after getting married, realized personalities don\'t match). The front is a completed action, the back is often an unexpected truth, with a sense of sudden realization or being caught off guard. The difference from the "continuously doing" -다 보니까 is whether the preceding action is one-time or long-term.',
  },

  // src: 补充-는대신에
  {
    id: 'g233', title: '代替/作为补偿', titleEn: 'instead / as compensation', pattern: '-는 대신(에) / N 대신(에)',
    level: 'intermediate', topik: 'TOPIK 3级', topikEn: 'TOPIK Level 3', category: '문형',
    usage: '表示"代替…、不…而…"或"…作为补偿/交换"', usageEn: 'means "instead of..., not... but..." or "...as compensation/exchange"',
    explanation: '两个用法：①表替代——用后项代替前项，相当于"不…而是…、代替…"（버스 대신 택시 打车代替公交）；②表补偿交换——前项虽如此、以后项作为补偿，相当于"虽然…但作为交换…"。接动词/形容词冠形词形，或直接接名词。', explanationEn: 'Two uses: ① substitution—use the latter to replace the former, like "not... but..., instead of..." (버스 대신 택시 take a taxi instead of the bus); ② compensation/exchange—even though the former is true, the latter compensates, like "although... but in exchange...". Attaches to verb/adjective adnominal forms, or directly to nouns.',
    conjugation: '动词/形容词现在冠形 + 는/(으)ㄴ 대신(에)：일하는 대신에 / 비싼 대신\n名词 + 대신(에)：커피 대신 / 나 대신', conjugationEn: 'Verb/adjective present adnominal + 는/(으)ㄴ 대신(에): 일하는 대신에 / 비싼 대신\\nNoun + 대신(에): 커피 대신 / 나 대신',
    examples: [
      { ko: '오늘은 밥 대신 빵을 먹었어요.', zh: '今天没吃饭，吃了面包。', zhEn: 'I didn\'t eat rice today; I had bread instead.', note: '代替：面包代替饭', noteEn: 'Instead: bread instead of rice' },
      { ko: '제가 갈 수 없으니까 나 대신 좀 가 주세요.', zh: '我去不了，请替我去一下。', zhEn: 'I can\'t go, so please go instead of me.', note: '代替：替我去', noteEn: 'Instead: go for me' },
      { ko: '이 식당은 좀 비싼 대신에 맛있어요.', zh: '这家店虽然有点贵，但作为补偿很好吃。', zhEn: 'This place is a bit pricey, but in exchange, the food is delicious.', note: '补偿：贵但好吃', noteEn: 'Compensation: pricey but tasty' },
    ],
    similarPatterns: ['-지 않고', '-기는 하지만'],
    difference: '-는 대신에 有替代义（밥 대신 빵 用面包代替饭）和补偿义（비싼 대신 맛있다 贵但好吃作补偿）两种；纯替代时近 -지 않고（밥을 먹지 않고 不吃饭），但 대신 额外强调"用另一物顶上/抵偿"。补偿义时前后项是对等的得失交换。', differenceEn: '-는 대신에 has substitution (밥 대신 빵 bread instead of rice) and compensation (비싼 대신 맛있다 pricey but tasty as compensation) meanings; for pure substitution it\'s close to -지 않고 (밥을 먹지 않고 not eating rice), but 대신 adds emphasis on "substituting/offsetting with something else." For compensation, the two clauses are an equal give-and-take exchange.',
    toriTip: '🐰 대신(에) 两副面孔：①换一个——"라면 대신 밥"（用饭代替泡面）；②抵偿——"월급이 적은 대신 일이 편해"（工资少但活儿轻，一得一失）。名词直接接（나 대신 替我），动词/形容词要加冠形词形（비싼 대신、가는 대신）。', toriTipEn: '🐰 대신(에) has two faces: ① swap it—"라면 대신 밥" (rice instead of ramen); ② offset it—"월급이 적은 대신 일이 편해" (low salary but easy work, a trade-off). Attach directly to nouns (나 대신 for me), but verbs/adjectives need the adnominal form (비싼 대신, 가는 대신).',
  },

  // src: 补充-는데도불구하고
  {
    id: 'g234', title: '尽管却', titleEn: 'even though... still', pattern: '-(으)ㄴ/는데도 불구하고',
    level: 'advanced', topik: 'TOPIK 4~5级', topikEn: 'TOPIK Level 4~5', category: '연결',
    usage: '表示"尽管…（却仍然）…"，强让步', usageEn: 'means "even though... (still)...", strong concession',
    explanation: '由 -는데도 加 불구하고 构成，表示尽管前项条件成立，后项却发生了与预期相反的情况，相当于"尽管…、虽然…还是…"。语气比单纯的 -는데도 更强调"不顾前项、出乎意料"。也可用 N에도 불구하고（노력에도 불구하고 尽管努力）。', explanationEn: 'Formed from -는데도 plus 불구하고, it means even though the preceding condition holds, the latter happens contrary to expectation, like "even though..., still...". The tone is stronger than plain -는데도, emphasizing "disregarding the former, unexpected." Also used as N에도 불구하고 (노력에도 불구하고 despite effort).',
    conjugation: '动词现在/过去 + 는데도 불구하고：노력하는데도 불구하고 / 갔는데도 불구하고\n形容词 + (으)ㄴ데도 불구하고：바쁜데도 불구하고 / 좋은데도 불구하고\n名词 + 에도 불구하고：악천후에도 불구하고', conjugationEn: 'Verb present/past + 는데도 불구하고: 노력하는데도 불구하고 / 갔는데도 불구하고\\nAdjective + (으)ㄴ데도 불구하고: 바쁜데도 불구하고 / 좋은데도 불구하고\\nNoun + 에도 불구하고: 악천후에도 불구하고',
    examples: [
      { ko: '열심히 공부했는데도 불구하고 시험에 떨어졌어요.', zh: '尽管努力学习了，还是没考过。', zhEn: 'Even though I studied hard, I still didn\'t pass.', note: '尽管却：努力了还是落榜', noteEn: 'Even though... still: studied but failed' },
      { ko: '비가 많이 오는데도 불구하고 경기를 진행했어요.', zh: '尽管下大雨，还是进行了比赛。', zhEn: 'Even though it was pouring, the game still went on.', note: '尽管却：下雨还比赛', noteEn: 'Even though... still: rain but played' },
      { ko: '악천후에도 불구하고 많은 사람이 모였어요.', zh: '尽管天气恶劣，还是聚集了很多人。', zhEn: 'Despite the bad weather, a lot of people still gathered.', note: '尽管却：恶劣天气仍聚集', noteEn: 'Even though... still: bad weather but gathered' },
    ],
    similarPatterns: ['-(으)ㄴ/는데도', '-지만'],
    difference: '-는데도 불구하고 是"尽管…却"的强让步，书面郑重、强调"完全不顾前项"（노력했는데도 불구하고 尽管努力了还是）；单用 -는데도（g26相关）语气较轻；-지만（g22）只是一般转折"但是"。불구하고 加重了"预期落空、出乎意料"的语感，常用于正式表达。', differenceEn: '-는데도 불구하고 is a strong concession "even though... still," formal and emphatic, stressing "completely disregarding the former" (노력했는데도 불구하고 despite trying, still); plain -는데도 (related to g26) is lighter; -지만 (g22) is just a general "but." 불구하고 adds a sense of "expectation dashed, unexpected," and is common in formal speech.',
    toriTip: '🐰 -는데도 불구하고 = "尽管…偏偏还…"，让步语气加到最满。"바쁜데도 불구하고 와 줘서 고마워"（尽管忙还来了，谢谢）。불구하고 是"不顾、不管"的意思，加上去显得郑重、有分量。名词直接用 에도 불구하고（비에도 불구하고 尽管下雨）。', toriTipEn: '🐰 -는데도 불구하고 = "Even though... still...", maxing out the concessive tone. "바쁜데도 불구하고 와 줘서 고마워" (Thanks for coming even though you\'re busy). 불구하고 means "regardless of, despite," adding it makes it formal and weighty. For nouns, use 에도 불구하고 directly (비에도 불구하고 even though it rained).',
  },

  // src: 补充-는이상
  {
    id: 'g235', title: '既然', titleEn: 'Since', pattern: '-(으)ㄴ/는 이상',
    level: 'advanced', topik: 'TOPIK 4~5级', topikEn: 'TOPIK Level 4~5', category: '연결',
    usage: '表示"既然…（就应该/必然…）"', usageEn: 'Indicates "since... (should/must...)"',
    explanation: '接在动词冠形词形后，表示前项既成事实或前提确定，后项则理所当然地随之而来，相当于"既然…就…、只要…就…"。后项常接义务、决心或必然的判断（-아야 하다/-겠다/-(으)ㄹ 수밖에 없다），语气坚定。', explanationEn: 'Attached after the verb\'s adnominal form, it indicates that the preceding clause is an established fact or confirmed premise, and the following clause naturally follows as a matter of course, equivalent to "since... then..." or "as long as... then...". The following clause often takes obligation, resolve, or inevitable judgment (-아야 하다/-겠다/-(으)ㄹ 수밖에 없다), with a firm tone.',
    conjugation: '动词现在 + 는 이상：하는 이상 / 사는 이상\n动词过去/形容词 + (으)ㄴ 이상：약속한 이상 / 시작한 이상', conjugationEn: 'Verb present + 는 이상: 하는 이상 / 사는 이상\\nVerb past/Adjective + (으)ㄴ 이상: 약속한 이상 / 시작한 이상',
    examples: [
      { ko: '시작한 이상 끝까지 최선을 다하겠습니다.', zh: '既然开始了，就会全力做到最后。', zhEn: 'Since I\'ve started, I\'ll give it my all to the end.', note: '既然：既然开始就尽力', noteEn: 'Since: Since starting, do your best' },
      { ko: '약속한 이상 반드시 지켜야 해요.', zh: '既然约定了，就必须遵守。', zhEn: 'Since I promised, I must keep it.', note: '既然：既然约定必守', noteEn: 'Since: Since promised, must keep' },
      { ko: '학생인 이상 공부가 우선이에요.', zh: '既然是学生，学习就是首位。', zhEn: 'Since you\'re a student, studying comes first.', note: '既然：既是学生学习优先', noteEn: 'Since: As a student, study first' },
    ],
    similarPatterns: ['-(으)니까', '-는 한'],
    difference: '-는 이상 强调"既然前项成立，后项就是理所当然/必须"（시작한 이상 끝까지 既然开始就到底），后接决心义务；-는 한（表条件"只要…就"）更中性；-(으)니까（g24）是一般因果。이상 特有"事已如此、别无选择"的坚定语感。', differenceEn: '-는 이상 emphasizes "since the premise holds, the result is natural/necessary" (시작한 이상 끝까지 since I started, I\'ll go all the way), followed by resolve or obligation; -는 한 (conditional "as long as...") is more neutral; -(으)니까 (g24) is general cause-effect. 이상 carries a firm nuance of "things being as they are, there\'s no other choice."',
    toriTip: '🐰 -는 이상 = "既然都…了，那就…"，一种破釜沉舟的决心腔。"이렇게 된 이상 물러설 수 없어"（既然都这样了，不能退缩）。前面是已成事实，后面接"就必须、就一定"，很有担当感。다짐（下决心）场景专用。', toriTipEn: '🐰 -는 이상 = "Since it\'s come to this, then...", a tone of burning bridges and resolve. "이렇게 된 이상 물러설 수 없어" (Since it\'s come to this, I can\'t back down). The front is an established fact, the back takes "must, definitely," giving a strong sense of responsibility. Used specifically for 다짐 (making a resolution) scenarios.',
  },

  // src: 补充-을바에는
  {
    id: 'g236', title: '与其不如', titleEn: 'Rather than', pattern: '-(으)ㄹ 바에(는)',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示"与其…（还）不如…"', usageEn: 'Indicates "rather than... (it\'s) better to..."',
    explanation: '接在动词冠形词形后，表示前项是不满意、不情愿的选择，与其如此还不如选后项，相当于"与其…不如…、既然要…还不如…"。前项常是难以接受的情况，后项是说话人认为更好（哪怕也不理想）的替代方案，带决绝语气。常与 차라리（宁可）连用。', explanationEn: 'Attached after the verb\'s adnominal form, it indicates that the preceding clause is an unsatisfactory or reluctant choice, and rather than that, it\'s better to choose the latter, equivalent to "rather than... better to..." or "if it\'s going to be... might as well...". The front is often an unacceptable situation, and the back is the speaker\'s preferred (even if not ideal) alternative, with a resolute tone. Often used with 차라리 (rather).',
    conjugation: '动词现在冠形 + (으)ㄹ 바에(는)：\n有받침 + 을 바에는：먹을 바에는\n无받침或ㄹ + ㄹ 바에는：할 바에는 / 살 바에는\n（常搭配 차라리）',
    examples: [
      { ko: '이렇게 대충 할 바에는 차라리 안 하는 게 나아요.', zh: '与其这样敷衍地做，还不如干脆不做。', zhEn: 'Rather than doing it half-heartedly like this, it\'s better not to do it at all.', note: '与其不如：与其糊弄不如不做', noteEn: 'Rather than: Rather than slacking, better not to do' },
      { ko: '남에게 부탁할 바에는 내가 직접 하겠어요.', zh: '与其求别人，还不如我自己来。', zhEn: 'Rather than asking others, I\'d rather do it myself.', note: '与其不如：与其求人不如自己', noteEn: 'Rather than: Rather than asking, better to do it yourself' },
      { ko: '후회할 바에는 지금 도전해 보세요.', zh: '与其将来后悔，不如现在就挑战。', zhEn: 'Rather than regretting it later, it\'s better to challenge it now.', note: '与其不如：与其后悔不如挑战', noteEn: 'Rather than: Rather than regret, better to challenge' },
    ],
    similarPatterns: ['-느니', '차라리'],
    difference: '-(으)ㄹ 바에는 与 -느니（g34）都表"与其…不如…"的取舍，但 -(으)ㄹ 바에는 前项更强调"到了这种不得已/不满意的地步"，决绝感更强（이렇게 할 바에는 与其这样干脆）；-느니 更中性地比较两个选项。两者都常配 차라리。', differenceEn: 'Both -(으)ㄹ 바에는 and -느니 (g34) express the trade-off of "rather than... better to...", but -(으)ㄹ 바에는 emphasizes the front as "having reached this unavoidable/unsatisfactory point," with a stronger sense of finality (이렇게 할 바에는 rather than doing it like this); -느니 compares two options more neutrally. Both are often paired with 차라리.',
    toriTip: '🐰 -(으)ㄹ 바에는 = "要是得…那还不如…"，带点破罐破摔的决绝。"질질 끌 바에는 차라리 포기해"（与其拖着不如放弃）。前面摆个不甘心的选项，后面甩出宁可选的替代。和 -느니 是近亲，바에는 情绪更激烈些。', toriTipEn: '🐰 -(으)ㄹ 바에는 = "If I have to... might as well...", with a bit of reckless finality. "질질 끌 바에는 차라리 포기해" (Rather than dragging it out, just give up). You put an unwilling option in front, then throw out the alternative you\'d rather choose. It\'s a close cousin of -느니, but 바에는 is more intense emotionally.',
  },

  // src: 补充-나마나
  {
    id: 'g237', title: '做不做都一样', titleEn: 'It\'s the same whether you do it or not', pattern: '-(으)나 마나',
    level: 'advanced', topik: 'TOPIK 4~5级', topikEn: 'TOPIK Level 4~5', category: '문형',
    usage: '表示"做不做都一样、不用…也知道结果"', usageEn: 'Indicates that doing it or not makes no difference; you know the result without doing it',
    explanation: '接在动词词干后，由"-(으)나（做）+ 마나（不做）"构成，表示无论做与不做结果都相同、没有必要做，相当于"…不…都一样、不用…也…"。多用于结果显而易见、做了也白做的情况，后项常直接给出那个确定的结论。', explanationEn: 'Attached to a verb stem, formed by "-(으)나 (do) + 마나 (not do)", it means the result is the same whether you do it or not, so there\'s no need to do it—equivalent to "...or not, it\'s all the same; no need to...". Used when the outcome is obvious and doing it is futile; the following clause often states the certain conclusion.',
    conjugation: '动词词干 + (으)나 마나：\n有받침 + 으나 마나：먹으나 마나 / 읽으나 마나\n无받침或ㄹ + 나 마나：하나 마나 / 보나 마나 / 물어보나 마나',
    examples: [
      { ko: '보나 마나 또 게임하고 있을 거예요.', zh: '不用看也知道，肯定又在打游戏。', zhEn: 'No need to look—he\'s definitely gaming again.', note: '都一样：不看也知在打游戏', noteEn: 'Same either way: know he\'s gaming without looking' },
      { ko: '물어보나 마나 대답은 뻔해요.', zh: '不用问也一样，答案很明显。', zhEn: 'No need to ask—the answer is obvious.', note: '都一样：不问也知答案', noteEn: 'Same either way: know the answer without asking' },
      { ko: '이렇게 조금 청소하는 건 하나 마나예요.', zh: '这样扫一点点等于没扫。', zhEn: 'Sweeping just a bit like this is as good as not sweeping.', note: '都一样：扫这点等于白扫', noteEn: 'Same either way: this little sweep is pointless' },
    ],
    similarPatterns: ['-아/어 봤자', '-(으)ㄴ들'],
    difference: '-(으)나 마나 强调"做与不做结果完全相同、没必要做"（보나 마나 不看也知道）；-아/어 봤자（即使做了也白搭）强调"做了也没用/达不到期望"。前者重在"结果一样、可省略动作"，后者重在"努力也无效"。나 마나 常配 뻔하다/-(으)ㄹ 거예요 给出确定结论。', differenceEn: '-(으)나 마나 emphasizes that doing or not doing yields the exact same result, so it\'s unnecessary (보나 마나: know without looking); -아/어 봤자 (even if you do it, it\'s futile) emphasizes that doing it is useless or won\'t meet expectations. The former focuses on "same result, action can be skipped," while the latter focuses on "effort is in vain." 나 마나 often pairs with 뻔하다/-(으)ㄹ 거예요 to state a certain conclusion.',
    toriTip: '🐰 -(으)나 마나 = 做和不做一个样，何必呢。"보나 마나 뻔하지"（不看也知道，明摆着的）。它把"하나（做）"和"마나（不做）"拼在一起，表示两个选项结果无差。后面常接"뻔해요""똑같아요"，一副看透一切的口气。', toriTipEn: '🐰 -(으)나 마나 = Doing or not is the same, so why bother. "보나 마나 뻔하지" (obvious without looking). It combines "하나 (do)" and "마나 (not do)" to show both options yield the same result. Often followed by "뻔해요" or "똑같아요," with a know-it-all tone.',
  },

  // src: 补充-려던참이다
  {
    id: 'g238', title: '正打算', titleEn: 'Just about to', pattern: '-(으)려던 참이다 / -던 참이다',
    level: 'advanced', topik: 'TOPIK 4级', topikEn: 'TOPIK Level 4', category: '문형',
    usage: '表示"正打算…的时候、正要…"', usageEn: 'Indicates "right at the moment of planning to...; just about to..."',
    explanation: '由意图 -(으)려고 하다 的回想形 -(으)려던 加依存名词 참（时机、当口）构成，表示正好在打算做某事的那个时刻，相当于"正打算…、刚要…（就）"。常用于说话时机恰好巧合的场合（对方提议时你正好也想做）。参 also -는 참이다（正在…的当口）。', explanationEn: 'Formed by the retrospective form -(으)려던 of the intention -(으)려고 하다 plus the dependent noun 참 (timing, moment), it means exactly at the moment you\'re planning to do something—equivalent to "just about to...; was going to... (when)". Often used in coincidental timing (when the other suggests something you were just about to do). See also -는 참이다 (in the middle of...).',
    conjugation: '动词词干 + (으)려던 참이다：\n가다→가려던 참이다 / 먹다→먹으려던 참이다 / 나가다→나가려던 참이었다\n（正在义：动词 + 던/는 참이다）', conjugationEn: 'Verb stem + (으)려던 참이다:\\n가다→가려던 참이다 / 먹다→먹으려던 참이다 / 나가다→나가려던 참이었다\\n(Progressive sense: verb + 던/는 참이다)',
    examples: [
      { ko: '안 그래도 전화하려던 참이었어요.', zh: '我正好也打算给你打电话呢。', zhEn: 'I was just about to call you too.', note: '正打算：正要打电话', noteEn: 'Just about to: was going to call' },
      { ko: '막 나가려던 참에 손님이 왔어요.', zh: '正要出门的时候客人来了。', zhEn: 'Just as I was about to leave, a guest arrived.', note: '正打算：刚要出门来客', noteEn: 'Just about to: was leaving when guest came' },
      { ko: '저도 마침 쉬려던 참이에요.', zh: '我也正打算休息呢。', zhEn: 'I was just about to rest too.', note: '正打算：正要休息', noteEn: 'Just about to: was going to rest' },
    ],
    similarPatterns: ['-(으)려고 하다', '-는 중이다'],
    difference: '-(으)려던 참이다 强调"正好在打算做的那个时机点"，多用于巧合（안 그래도 하려던 참 正好也想做）；-(으)려고 하다（g89）只是一般"打算做"，不强调时机巧合；-는 중이다/-는 참이다 强调"正在进行中"。참 特有"恰好这个当口"的时机感。', differenceEn: '-(으)려던 참이다 emphasizes "exactly at the moment of planning to do," often for coincidences (안 그래도 하려던 참: was just about to anyway); -(으)려고 하다 (g89) is just a general "plan to do" without timing emphasis; -는 중이다/-는 참이다 emphasizes "in progress." 참 carries a unique sense of "right at this moment."',
    toriTip: '🐰 -(으)려던 참이다 = "我正想呢！"——巧合神句。别人一提议，你回"안 그래도 ~하려던 참이었어요"（我正好也打算…），瞬间拉近距离。참 是"时机、当口"的意思，强调"就在这个点上"。搭 마침/막/안 그래도 用最自然。', toriTipEn: '🐰 -(으)려던 참이다 = "I was just thinking that!"—the perfect coincidence phrase. When someone suggests something, reply "안 그래도 ~하려던 참이었어요" (I was just about to...), instantly connecting. 참 means "timing, moment," emphasizing "right at this point." Pairs best with 마침/막/안 그래도.',
  },

  // src: 补充-으므로
  {
    id: 'g239', title: '因此（书面）', titleEn: 'Therefore (written)', pattern: '-(으)므로',
    level: 'advanced', topik: 'TOPIK 5级', topikEn: 'TOPIK Level 5', category: '연결',
    usage: '表示原因/根据，"因为…所以…"，书面郑重', usageEn: 'Indicates reason/basis, "because... so...", formal and written',
    explanation: '接在动词/形容词词干后，表示原因或根据，相当于"因为…、由于…（所以）"。是非常书面、郑重的因果连接，多用于论文、公文、正式声明。动词/形容词有받침（ㄹ除外）加 으므로，无받침或ㄹ加 므로；名词用 (이)므로。不能用于命令、请诱句。',
    conjugation: '有받침(非ㄹ) + 으므로：많으므로 / 좋으므로\n无받침或ㄹ + 므로：하므로 / 크므로 / 살므로\n过去 + 았/었으므로：했으므로\n名词 + (이)므로：학생이므로',
    examples: [
      { ko: '규정을 위반했으므로 벌금이 부과됩니다.', zh: '由于违反了规定，将处以罚款。', zhEn: 'Since regulations were violated, a fine will be imposed.', note: '因此：违规故罚款', noteEn: 'Thus: violation, hence fine' },
      { ko: '수요가 많으므로 가격이 상승했다.', zh: '由于需求旺盛，价格上涨了。', zhEn: 'Due to strong demand, prices have risen.', note: '因此：需求大故涨价', noteEn: 'Thus: high demand, hence price rise' },
      { ko: '미성년자이므로 입장이 제한됩니다.', zh: '由于是未成年人，入场受到限制。', zhEn: 'Because they are a minor, entry is restricted.', note: '因此：未成年故限入', noteEn: 'Thus: minor, hence entry restricted' },
    ],
    similarPatterns: ['-기 때문에', '-(으)니까'],
    difference: '-(으)므로 是最书面郑重的因果，多见于公文、论文、法律条款（위반했으므로 由于违反了）；-기 때문에（g29）书面口语通用；-(으)니까（g24）偏口语、可接命令请诱。므로 绝不用于命令句，且比 때문에 更正式、更"官方"。', differenceEn: '-(으)므로 is the most formal and solemn causal connector, common in official documents, papers, and legal clauses (위반했으므로 since violated); -기 때문에 (g29) is used in both written and spoken; -(으)니까 (g24) leans spoken and can be used with commands/suggestions. 므로 is never used in imperative sentences and is more formal and "official" than 때문에.',
    toriTip: '🐰 -(으)므로 = 公文体的"因此、鉴于"。"본인이 동의하였으므로…"（鉴于本人已同意…）。它是 -기 때문에 的正装版，写论文、通知、合同时用它显得专业。日常聊天用它会像在念判决书，那时候还是 -니까/-아서 顺口。', toriTipEn: '🐰 -(으)므로 = the official-document style "therefore, in view of". "본인이 동의하였으므로…" (In view of the person\'s consent...). It\'s the formal version of -기 때문에; using it in papers, notices, or contracts looks professional. In casual chat, it sounds like reading a verdict—then -니까/-아서 is smoother.',
  },

  // src: 补充-기가무섭게
  {
    id: 'g240', title: '一就立刻', titleEn: 'as soon as', pattern: '-기가 무섭게 / -기(가) 바쁘게',
    level: 'advanced', topik: 'TOPIK 5~6级', topikEn: 'TOPIK Level 5-6', category: '연결',
    usage: '表示"一…就立刻…"，强调间隔极短', usageEn: 'Indicates "as soon as... immediately...", emphasizing an extremely short interval',
    explanation: '接在动词词干后，字面"…都来不及/…都可怕（那么快）"，表示前一动作刚发生，后一动作几乎同时紧接着出现，强调时间间隔极短、快得惊人，相当于"一…就立刻…、刚…马上就…"。比 -자마자 语气更夸张，突出"快得不可思议"。', explanationEn: 'Attached to verb stems, literally "...not even having time to/...so fast it\'s scary", meaning the first action just happens and the second follows almost simultaneously, emphasizing an extremely short, astonishingly fast interval, equivalent to "as soon as... immediately..., just... right away...". It\'s more exaggerated than -자마자, highlighting "incredibly fast".',
    conjugation: '动词词干 + 기가 무섭게：\n끝나다→끝나기가 무섭게 / 앉다→앉기가 무섭게 / 나오다→나오기가 무섭게\n（近义 -기(가) 바쁘게）', conjugationEn: 'Verb stem + 기가 무섭게: \\n끝나다→끝나기가 무섭게 / 앉다→앉기가 무섭게 / 나오다→나오기가 무섭게\\n(Synonymous with -기(가) 바쁘게)',
    examples: [
      { ko: '수업이 끝나기가 무섭게 학생들이 뛰어나갔어요.', zh: '课一结束，学生们立刻冲了出去。', zhEn: 'As soon as class ended, the students rushed out.', note: '一就立刻：下课就冲出', noteEn: 'As soon as: rushed out right after class' },
      { ko: '음식이 나오기가 무섭게 다 먹어 버렸어요.', zh: '菜一上桌，立马就吃光了。', zhEn: 'The moment the food hit the table, it was devoured.', note: '一就立刻：上菜就吃光', noteEn: 'As soon as: eaten up as soon as served' },
      { ko: '눕기가 무섭게 잠이 들었어요.', zh: '一躺下就立刻睡着了。', zhEn: 'The instant he lay down, he fell asleep.', note: '一就立刻：一躺就睡着', noteEn: 'As soon as: fell asleep as soon as lying down' },
    ],
    similarPatterns: ['-자마자', '-는 대로'],
    difference: '-기가 무섭게 强调"快得惊人、几乎同时"，语气夸张（끝나기가 무섭게 一结束就飞快地）；-자마자（g39）只是中性的"一…就…"；-는 대로（g221时间义）强调"随即着手处理"。무섭게 特有"快到可怕、迫不及待"的夸张感，多用于描写。', differenceEn: '-기가 무섭게 emphasizes "astonishingly fast, almost simultaneous" with an exaggerated tone (끝나기가 무섭게 as soon as it ended, swiftly); -자마자 (g39) is just neutral "as soon as..."; -는 대로 (g221, temporal) emphasizes "immediately handling it". 무섭게 uniquely conveys "scary-fast, eager" exaggeration, often used in descriptions.',
    toriTip: '🐰 -기가 무섭게 = "一…就火速…"，快到夸张。"종이 울리기가 무섭게 뛰어나갔다"（铃一响就冲出去了）。무섭게 本是"可怕地"，这里表示"快得吓人"。比平淡的 -자마자 有画面感，写作、描述时用它特别生动。', toriTipEn: '🐰 -기가 무섭게 = "as soon as... at lightning speed...", exaggeratedly fast. "종이 울리기가 무섭게 뛰어나갔다" (The moment the bell rang, he dashed out). 무섭게 originally means "scarily", here meaning "frighteningly fast". It\'s more vivid than plain -자마자, making writing and descriptions especially lively.',
  },

  // src: 补充-ㄴ답시고
  {
    id: 'g241', title: '美其名曰', titleEn: 'euphemistically called', pattern: '-(느)ㄴ다고 / -(느)ㄴ답시고',
    level: 'advanced', topik: 'TOPIK 5~6级', topikEn: 'TOPIK Level 5-6', category: '연결',
    usage: '表示"美其名曰…、自称是…（实则不然/带贬义）"', usageEn: 'Means "so-called..., claiming to be... (but actually not / with negative connotation)"',
    explanation: '由间接引用 -(느)ㄴ다고 加 하고 缩合而来，表示以前项为借口/名义做某事，但说话人对此不以为然，含讽刺、埋怨或轻蔑，相当于"美其名曰…、借口说…、自以为…"。后项常是与前项名义不符或令人不满的结果。主语多为第三人称。', explanationEn: 'Derived from the indirect quotation -(느)ㄴ다고 combined with 하고, it indicates doing something under the pretext/name of the preceding clause, but the speaker disapproves, carrying sarcasm, complaint, or contempt—equivalent to "so-called..., under the excuse of..., thinking oneself to be...". The following clause is often a result that doesn\'t match the stated pretext or is unsatisfactory. The subject is usually third person.',
    conjugation: '动词现在 + ㄴ다고/는다고 (한다고)→답시고：공부한다고 → 공부한답시고\n（口语讽刺形常直接用 -ㄴ답시고/-는답시고）\n돕는다→돕는답시고 / 다이어트한다→다이어트한답시고', conjugationEn: 'Verb present + ㄴ다고/는다고 (한다고)→답시고: 공부한다고 → 공부한답시고\\n(colloquial sarcastic form often uses -ㄴ답시고/-는답시고 directly)\\n돕는다→돕는답시고 / 다이어트한다→다이어트한답시고',
    examples: [
      { ko: '동생은 공부한답시고 방에서 게임만 해요.', zh: '弟弟美其名曰学习，在房间里光打游戏。', zhEn: 'My younger brother, under the pretext of studying, just plays games in his room.', note: '美其名曰：借口学习实打游戏', noteEn: 'So-called: using studying as an excuse to actually play games' },
      { ko: '요리한답시고 부엌만 엉망으로 만들었어요.', zh: '美其名曰做饭，把厨房搞得一团糟。', zhEn: 'Under the pretext of cooking, he made a complete mess of the kitchen.', note: '美其名曰：借口做饭搞乱厨房', noteEn: 'So-called: using cooking as an excuse to mess up the kitchen' },
      { ko: '도와준답시고 오히려 방해만 됐어요.', zh: '说是帮忙，反而只添乱。', zhEn: 'Claiming to help, but only making things worse.', note: '美其名曰：借口帮忙反添乱', noteEn: 'So-called: using helping as an excuse to cause more trouble' },
    ],
    similarPatterns: ['-(으)ㄴ다는 핑계로', '-노라고'],
    difference: '-(느)ㄴ답시고 带明显讽刺埋怨，"打着…旗号却…"（공부한답시고 게임만 说是学习净打游戏），说话人不认同前项名义；中性的 -(으)려고（为了）无贬义。답시고 特有"名不副实、令人不满"的负面评价语气，是口语讽刺常用形。', differenceEn: '-(느)ㄴ답시고 carries clear sarcasm and complaint—"under the banner of... but..." (공부한답시고 게임만: claiming to study but just playing games). The speaker doesn\'t accept the stated pretext; the neutral -(으)려고 (in order to) has no negative connotation. 답시고 uniquely conveys a negative evaluative tone of "not living up to the name, unsatisfactory," and is a common colloquial sarcastic form.',
    toriTip: '🐰 -(느)ㄴ답시고 = "美其名曰…结果…"，专门用来吐槽。"돕는답시고 다 망쳐 놨어"（说是帮忙全搞砸了）。前面是冠冕堂皇的借口，后面是不像话的实际，满满的无奈和讽刺。埋怨别人自作主张、名不副实时的地道用法。', toriTipEn: '🐰 -(느)ㄴ답시고 = "so-called... but...", specifically for complaining. "돕는답시고 다 망쳐 놨어" (claiming to help but messed everything up). The front is a grand excuse, the back is the ridiculous reality—full of helplessness and sarcasm. A natural way to complain about someone acting on their own and not living up to their claims.',
  },

  // src: 补充-스럽다
  {
    id: 'g242', title: '显得（派生形容词）', titleEn: 'Seem (derived adjective)', pattern: '-스럽다',
    level: 'intermediate', topik: 'TOPIK 3~4级', topikEn: 'TOPIK Level 3~4', category: '문형',
    usage: '接名词构成形容词，表示"有…的感觉/样子、显得…"', usageEn: 'Attaches to nouns to form adjectives, meaning "having the feel/appearance of..., seeming..."',
    explanation: '后缀 -스럽다 接在名词后，构成形容词，表示"具有某种性质/给人某种感觉"，相当于"显得…、有…味儿、令人觉得…"。强调从外部观察到的印象或感觉。如 사랑스럽다（惹人爱）、자연스럽다（自然）、부담스럽다（有负担感）。按形容词规则活用（스럽다→스러워요，ㅂ不规则）。', explanationEn: 'The suffix -스럽다 attaches to nouns to form adjectives, meaning "having a certain quality/giving a certain feeling," equivalent to "seeming..., having a... vibe, making one feel...". It emphasizes an impression or feeling observed from the outside. E.g., 사랑스럽다 (lovable), 자연스럽다 (natural), 부담스럽다 (burdensome). Conjugated as a regular adjective (스럽다→스러워요, ㅂ-irregular).',
    conjugation: '名词 + 스럽다（按ㅂ不规则活用）：\n사랑스럽다→사랑스러워요 / 자연스럽다→자연스러워요 / 부담스럽다→부담스러워요 / 조심스럽다→조심스러워요', conjugationEn: 'Noun + 스럽다 (ㅂ-irregular conjugation):\\n사랑스럽다→사랑스러워요 / 자연스럽다→자연스러워요 / 부담스럽다→부담스러워요 / 조심스럽다→조심스러워요',
    examples: [
      { ko: '강아지가 정말 사랑스러워요.', zh: '小狗真惹人喜爱。', zhEn: 'The puppy is really lovable.', note: '显得：惹人爱', noteEn: 'Seem: lovable' },
      { ko: '그렇게 큰 선물은 좀 부담스러워요.', zh: '那么大的礼物让人有点有压力。', zhEn: 'A gift that big feels a bit burdensome.', note: '显得：有负担感', noteEn: 'Seem: burdensome' },
      { ko: '연기가 아주 자연스러웠어요.', zh: '演技非常自然。', zhEn: 'The acting is very natural.', note: '显得：自然', noteEn: 'Seem: natural' },
    ],
    similarPatterns: ['-답다', '-롭다'],
    difference: '-스럽다 表"显得有…的感觉/样子"，从外部印象出发，可含"像但不完全是"（어른스럽다 显得成熟——未必是大人）；-답다（g243）表"名副其实、有…应有的样子"（어른답다 有大人样、够格）。前者重"感觉像"，后者重"名实相符"。', differenceEn: '-스럽다 means "seeming to have the feel/appearance of...", based on external impression, and can imply "like but not exactly" (어른스럽다: seems mature—not necessarily an adult); -답다 (g243) means "living up to the name, having the proper appearance of..." (어른답다: acts like an adult, qualified). The former emphasizes "feels like," the latter "matches the name."',
    toriTip: '🐰 -스럽다 = 给人某种感觉、有某种味儿。사랑스럽다（可爱）、부담스럽다（有压力）、자연스럽다（自然）、조심스럽다（谨慎）。它把名词变成形容词，表达"看着/感觉像…"。注意按 ㅂ 不规则变：사랑스러워요，别说成 사랑스럽어요。', toriTipEn: '🐰 -스럽다 = gives a certain feeling, has a certain vibe. 사랑스럽다 (lovable), 부담스럽다 (burdensome), 자연스럽다 (natural), 조심스럽다 (cautious). It turns nouns into adjectives, expressing "looks/feels like...". Note the ㅂ-irregular conjugation: 사랑스러워요, not 사랑스럽어요.',
  },

  // src: 补充-답다
  {
    id: 'g243', title: '名副其实/像样', titleEn: 'Living up to the name / proper', pattern: '-답다',
    level: 'intermediate', topik: 'TOPIK 3~4级', topikEn: 'TOPIK Level 3~4', category: '문형',
    usage: '接名词构成形容词，表示"有…应有的样子、名副其实、像个…"', usageEn: 'Attaches to nouns to form adjectives, meaning "having the proper appearance of..., living up to the name, being like a..."',
    explanation: '后缀 -답다 接在名词后，构成形容词，表示某对象具备该名词身份应有的典型特质，相当于"像样的…、名副其实的…、有…的样子"。含褒义肯定，强调"符合身份/名分、够格"。如 어른답다（有大人样）、학생답다（像个学生）、남자답다（有男子气概）。按ㅂ不规则活用。', explanationEn: 'The suffix -답다 attaches to nouns to form adjectives, meaning the subject has the typical qualities expected of that noun\'s identity—like "proper, worthy of the name, having the look of...". It carries a positive, affirming tone, emphasizing "fitting the role/status, measuring up." E.g., 어른답다 (acts like a proper adult), 학생답다 (acts like a proper student), 남자답다 (manly). Conjugated as a ㅂ-irregular verb.',
    conjugation: '名词 + 답다（按ㅂ不规则活用）：\n어른답다→어른다워요 / 학생답다→학생다워요 / 남자답다→남자다워요 / 너답다→너다워요', conjugationEn: 'Noun + 답다 (ㅂ-irregular conjugation):\\n어른답다→어른다워요 / 학생답다→학생다워요 / 남자답다→남자다워요 / 너답다→너다워요',
    examples: [
      { ko: '역시 프로답게 일을 완벽하게 처리했어요.', zh: '不愧是专业的，把工作处理得很完美。', zhEn: 'As expected of a pro, you handled the work flawlessly.', note: '名副其实：有专业的样子', noteEn: 'Worthy of the name: has the look of a pro' },
      { ko: '그렇게 쉽게 포기하다니, 너답지 않아.', zh: '那么轻易就放弃，太不像你了。', zhEn: 'Giving up that easily is so unlike you.', note: '像样：不像你的作风', noteEn: 'Proper: not your style' },
      { ko: '오늘 날씨가 정말 봄답네요.', zh: '今天天气真有春天的样子。', zhEn: 'The weather today really feels like spring.', note: '名副其实：有春天味儿', noteEn: 'Worthy of the name: has a spring feel' },
    ],
    similarPatterns: ['-스럽다', '-처럼'],
    difference: '-답다 表"名副其实、具备该身份应有的样子"，褒义、强调名实相符（학생답다 像个学生该有的样子）；-스럽다（g242）表"显得有…感觉"，从外部印象出发、未必名实相符（어른스럽다 显得成熟，孩子也能用）。口诀：답다=够格名副其实，스럽다=感觉像。', differenceEn: '-답다 means "worthy of the name, having the qualities expected of that role," positive, emphasizing substance matches the label (학생답다 = like a proper student). -스럽다 (g242) means "seems to have the feel of..." based on outward impression, not necessarily matching reality (어른스럽다 = seems mature, even a kid can use it). Mnemonic: 답다 = measures up, truly worthy; 스럽다 = feels like.',
    toriTip: '🐰 -답다 = 有…该有的样子，名副其实（褒义）。"너답다"（很有你的风格）、"프로답다"（够专业）、"봄답다"（有春天味儿）。它强调"名实相符、够格"。和 -스럽다 常被弄混：어른답다=有大人的担当，어른스럽다=看着老成（小孩也行）。答=名分相符。', toriTipEn: '🐰 -답다 = has the proper look of..., worthy of the name (positive). "너답다" (so your style), "프로답다" (truly professional), "봄답다" (feels like spring). It emphasizes "substance matches the label, measures up." Often confused with -스럽다: 어른답다 = has adult responsibility, 어른스럽다 = looks mature (even a kid can). 답 = matches the title.',
  },
];
