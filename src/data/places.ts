// ==========================================================================
// 动物城「场所」登记表 —— 全站进入指引的唯一内容源
// --------------------------------------------------------------------------
// 每个场所 = 一个沉浸式地点（图书馆/教室/自习室/电台…）。
// PlaceIntro 组件读这里的内容渲染「首次进入指引」，靠 accent 换主题色。
// 主次原则：先讲这地方能干嘛（功能），动物城风味只做点缀，别喧宾夺主。
// ==========================================================================

export interface PlaceFeature {
  [k: string]: unknown;
  icon: string;
  ko: string;
  zh: string;
  zhEn?: string;
}

export interface PlaceStep {
  [k: string]: unknown;
  emoji: string;
  titleKo: string;
  titleZh: string;
  titleZhEn?: string;
  intro?: { ko: string; zh: string; zhEn?: string }[];
  features?: PlaceFeature[];
  note?: string;
  noteEn?: string;
  /** 该步渲染「收听模式选择」(仅电台用)：live 实时编成 / free 自由收听 */
  modePicker?: boolean;
}

export interface Place {
  [k: string]: unknown;
  /** localStorage 门控 key 的后缀（place_intro_{id}_seen） */
  id: string;
  /** 主题色（注入 --pi-accent），决定弹窗强调色 */
  accent: string;
  /** 主题色的浅色底（图标底/高亮），注入 --pi-accent-soft */
  accentSoft: string;
  steps: PlaceStep[];
}

export const PLACES: Record<string, Place> = {
  library: {
    id: 'library',
    accent: 'oklch(60% 0.14 55)',       // 暖琥珀（与图书馆一致）
    accentSoft: 'oklch(90% 0.055 60)',
    steps: [
      {
        emoji: '📚',
        titleKo: '동물 도시 도서관',
        titleZh: '动物城图书馆', titleZhEn: 'Animal Town Library',
        titleZhEn: 'Animal City Library',
        intro: [
          {
            ko: '여기 글은 전부 진짜 한국어예요.',
            zh: '这里全是真的韩语，不是练习题。按难度排好，从最简单的开始就行。', zhEn: 'Everything here is real Korean, not practice exercises. It\'s sorted by difficulty, so just start from the easiest.',
            zhEn: 'Everything here is real Korean, not practice drills — sorted by level, just start with the easiest.',
          },
          {
            ko: '읽을거리가 네 칸으로 나뉘어 있어요.',
            zh: '馆里分四个区：纪实文章、故事集、韩国小知识、绘本馆。想读什么挑什么。', zhEn: 'The library has four sections: nonfiction articles, story collections, Korean fun facts, and picture books. Pick whatever you want to read.',
            zhEn: 'Four sections inside: real-life articles, story collection, Korea trivia, and the picture-book room — read whatever you like.',
          },
        ],
      },
      {
        emoji: '🗂️',
        titleKo: '이렇게 나뉘어 있어요',
        titleZh: '四个区各有各的读法', titleZhEn: 'Each section has its own way to read',
        titleZhEn: 'Four sections, each its own',
        features: [
          { icon: '📰', ko: '자료 읽기 · 진짜 글', zh: '纪实文章：韩剧、社会、旅行…真实题材，按 A1–C2 分级', zhEn: 'Real-life articles: K-drama, society, travel… real topics, graded A1–C2.' },
          { icon: '📖', ko: '이야기 · 동물 도시 소설', zh: '故事集：动物城的连载故事，读得多了还能解锁禁书', zhEn: 'Story collection: Animal City serials — read enough to unlock the forbidden shelf.' },
          { icon: '💡', ko: '자료실 · 한국 상식', zh: '韩国小知识：文化、美食、旅行的短科普，一篇几分钟', zhEn: 'Korea trivia: short reads on culture, food, and travel — a few minutes each.' },
          { icon: '🐻', ko: '그림책관 · 그림 이야기', zh: '绘本馆：图多字少的短故事，最适合刚开始读韩语', zhEn: 'Picture-book room: short illustrated stories, perfect for your first Korean reading.' },
        ],
      },
      {
        emoji: '📖',
        titleKo: '읽다가 막히면요',
        titleZh: '读着读着卡住了？', titleZhEn: 'Stuck while reading?',
        titleZhEn: 'Stuck while reading?',
        features: [
          { icon: '🔍', ko: '모르는 단어는 톡 치기', zh: '不认识的词点一下就行，意思、发音都给你', zhEn: 'Tap any word you don\'t know — meaning and pronunciation, all there.' },
          { icon: '🎧', ko: '소리 내서 읽어 줄게요', zh: '想听？点全文朗读，一句一句念给你听', zhEn: 'Want to listen? Tap read-aloud and hear it line by line.' },
          { icon: '⭐', ko: '마음에 든 건 저장해요', zh: '遇到想记的词和句子，收藏起来慢慢背', zhEn: 'Save the words and sentences you want to remember and review later.' },
          { icon: '✏️', ko: '다 읽고 살짝 확인', zh: '读完做几道小题，看看是不是真懂了', zhEn: 'After reading, do a few quick questions to check you really got it.' },
        ],
        note: '🥕 하루에 한 편이면 충분해요 · 一天一篇，就很棒了', noteEn: '🥕 하루에 한 편이면 충분해요 · One a day is plenty',
        noteEn: '🥕 하루에 한 편이면 충분해요 · One a day is plenty.',
      },
    ],
  },

  // ── 火鹤老师的教室：40音 / 语法 / 考试 三扇门，共用珊瑚色身份 ──
  phonetics: {
    id: 'phonetics',
    accent: 'oklch(64% 0.15 18)',        // 珊瑚粉（火鹤老师）
    accentSoft: 'oklch(92% 0.045 18)',
    steps: [
      {
        emoji: '🔤',
        titleKo: '홍학 선생님의 한글 교실',
        titleZh: '火鹤老师的韩文教室', titleZhEn: 'Flamingo Teacher\'s Korean Classroom',
        titleZhEn: 'Flamingo Teacher\'s Hangul Classroom',
        intro: [
          {
            ko: '한글, 여기서 처음부터 배워요.',
            zh: '零基础就从这儿开始。40 个字母的发音，听真人怎么念，再学怎么拼成字。', zhEn: 'Start here if you\'re a complete beginner. Learn the sounds of the 40 letters, hear how native speakers pronounce them, then learn how to combine them into syllables.',
            zhEn: 'Start from zero right here. Hear all 40 letters pronounced by a real voice, then learn how they combine into syllables.',
          },
          {
            ko: '홍학 선생님이 하나하나 짚어 줄게요.',
            zh: '火鹤老师会一个音一个音地带你，不用怕跟不上。', zhEn: 'Flamingo Teacher will guide you sound by sound, so you don\'t have to worry about falling behind.',
            zhEn: 'Flamingo Teacher walks you through one sound at a time — no need to worry about keeping up.',
          },
        ],
      },
      {
        emoji: '🎧',
        titleKo: '이렇게 배울 거예요',
        titleZh: '会这样陪你练', titleZhEn: 'Here\'s how you\'ll practice together',
        titleZhEn: 'How we\'ll practice',
        features: [
          { icon: '🔊', ko: '듣고 그대로 따라 하기', zh: '每个音都有真人录音，听一遍，跟着念一遍', zhEn: 'Every sound has a real recording — listen once, then say it back.' },
          { icon: '🧩', ko: '글자 조립해 보기', zh: '辅音配元音，看懂韩文字是怎么拼出来的', zhEn: 'Pair consonants with vowels and see how Hangul syllables are built.' },
          { icon: '📖', ko: '자연스럽게 이어 읽기', zh: '连读变音的规律，慢慢读得像韩国人', zhEn: 'Learn the linking and sound-change rules to read like a native, bit by bit.' },
          { icon: '🎯', ko: '한 관문씩 통과하기', zh: '一关一关来，学一点测一点', zhEn: 'Clear one stage at a time — learn a little, test a little.' },
        ],
        note: '🥕 소리부터 천천히, 급할 것 없어요 · 先从声音开始，一点都不用急', noteEn: '🥕 Start with sounds, take it slow, no rush at all',
        noteEn: '🥕 소리부터 천천히, 급할 것 없어요 · Start with sound, slowly — no rush at all.',
      },
    ],
  },

  grammar: {
    id: 'grammar',
    accent: 'oklch(64% 0.15 18)',
    accentSoft: 'oklch(92% 0.045 18)',
    steps: [
      {
        emoji: '📐',
        titleKo: '홍학 선생님의 문법 교실',
        titleZh: '火鹤老师的语法教室', titleZhEn: 'Teacher Flamingo\'s Grammar Classroom',
        titleZhEn: 'Flamingo Teacher\'s Grammar Classroom',
        intro: [
          {
            ko: '문장이 어떻게 만들어지는지 배워요.',
            zh: '这里学怎么把词拼成句子。一个语法点一个点讲，不急。', zhEn: 'Learn how to string words into sentences here. One grammar point at a time, no rush.',
            zhEn: 'Here you learn how words come together into sentences — one grammar point at a time, no rush.',
          },
          {
            ko: '규칙보다 예문으로 익히는 게 빨라요.',
            zh: '别死记规则——跟着例句念，反而记得牢。火鹤老师帮你理。', zhEn: 'Don\'t memorize rules by rote—read along with examples and it sticks better. Teacher Flamingo helps you sort it out.',
            zhEn: 'Don\'t memorize rules — read the example sentences instead, they stick better. Flamingo Teacher helps you sort it out.',
          },
        ],
      },
      {
        emoji: '📇',
        titleKo: '이렇게 배울 거예요',
        titleZh: '会这样陪你学', titleZhEn: 'Here\'s how we\'ll learn together',
        titleZhEn: 'How we\'ll learn',
        features: [
          { icon: '📇', ko: '한 장에 한 가지', zh: '一个语法点一张卡，公式加例句，看一眼就懂', zhEn: 'One grammar point per card — formula plus examples, clear at a glance.' },
          { icon: '🔍', ko: '모르는 단어는 톡', zh: '例句里的词点一下就查，还能听发音', zhEn: 'Tap any word in an example to look it up and hear it.' },
          { icon: '🔗', ko: '어떻게 붙는지도 알려줘요', zh: '动词、形容词后面怎么接，讲得明明白白', zhEn: 'See exactly how it attaches to verbs and adjectives.' },
          { icon: '✅', ko: '다 배우면 도장 쾅', zh: '学完盖个章，进度自己看得见', zhEn: 'Stamp it done when you finish — your progress is right there.' },
        ],
        note: '🥕 어느새 문장이 길어져 있을 거예요 · 不知不觉，你的句子就变长了', noteEn: '🥕 Before you know it, your sentences will grow longer',
        noteEn: '🥕 어느새 문장이 길어져 있을 거예요 · Before you know it, your sentences will grow longer.',
      },
    ],
  },

  topik: {
    id: 'topik',
    accent: 'oklch(64% 0.15 18)',
    accentSoft: 'oklch(92% 0.045 18)',
    steps: [
      {
        emoji: '🎓',
        titleKo: '홍학 선생님의 시험 교실',
        titleZh: '火鹤老师的考试教室', titleZhEn: 'Teacher Flamingo\'s Exam Classroom',
        titleZhEn: 'Flamingo Teacher\'s Exam Classroom',
        intro: [
          {
            ko: 'TOPIK 준비, 여기서 같이 해요.',
            zh: '要考 TOPIK 的话，就在这儿准备。按题型练词汇、阅读、听力，一块块补上。', zhEn: 'Prepping for TOPIK? Do it here. Practice vocabulary, reading, and listening by question type, and fill in the gaps.',
            zhEn: 'Prepping for TOPIK? Do it here. Practice vocab, reading, and listening by question type, filling gaps one block at a time.',
          },
          {
            ko: '실력이 궁금하면 모의고사 한 판!',
            zh: '想知道自己到哪了？来火鹤老师这儿，掐着时间考一套模拟卷。', zhEn: 'Want to know where you stand? Come to Teacher Flamingo and take a timed mock test.',
            zhEn: 'Curious where you stand? Come to Flamingo Teacher and take a timed mock exam.',
          },
        ],
      },
      {
        emoji: '📝',
        titleKo: '이렇게 준비할 거예요',
        titleZh: '会这样陪你备考', titleZhEn: 'Here\'s how we\'ll prep together',
        titleZhEn: 'How we\'ll prep',
        features: [
          { icon: '📝', ko: '유형별로 콕콕', zh: '按题型分开练，哪儿弱补哪儿', zhEn: 'Practice by question type — shore up wherever you\'re weak.' },
          { icon: '📚', ko: '진짜처럼 모의고사', zh: '整套模拟卷，像真考试一样掐时间做', zhEn: 'Full mock exams, timed just like the real test.' },
          { icon: '📊', ko: '틀린 건 다시', zh: '错题自动收好，回头再练一遍', zhEn: 'Wrong answers are saved automatically for another round later.' },
          { icon: '🏆', ko: '성적이 보여요', zh: '成绩变化看得见，进步心里有数', zhEn: 'Watch your scores change so you can feel the progress.' },
        ],
        note: '🥕 한 문제씩 풀다 보면 늘어요 · 一题一题做下去，就上来了', noteEn: '🥕 Solve one question at a time, and you\'ll climb up',
        noteEn: '🥕 한 문제씩 풀다 보면 늘어요 · Solve them one by one and you\'ll climb.',
      },
    ],
  },

  // ── 猫头鹰的自习室：听说读写四合一练习 ──
  practice: {
    id: 'practice',
    accent: 'oklch(58% 0.10 195)',       // 沉静青绿（猫头鹰）
    accentSoft: 'oklch(91% 0.045 195)',
    steps: [
      {
        emoji: '🦉',
        titleKo: '동물 도시 자습실',
        titleZh: '动物城自习室', titleZhEn: 'Animal Town Study Room',
        titleZhEn: 'Animal City Study Room',
        intro: [
          {
            ko: '배운 걸 여기서 진짜 써 봐요.',
            zh: '光看会忘，动手才记得住。说、写、听、打字，学过的在这儿练成本能。', zhEn: 'Just reading makes you forget; doing makes it stick. Practice speaking, writing, listening, and typing here until it becomes second nature.',
            zhEn: 'Just watching fades — doing sticks. Speak, write, listen, and type until what you\'ve learned becomes second nature.',
          },
          {
            ko: '부엉이가 지키는 조용한 자습실이에요.',
            zh: '猫头鹰守着的安静自习室。每天挑几样练练，手就越来越顺了。', zhEn: 'A quiet study room guarded by an owl. Pick a few things to practice daily, and your skills will get smoother and smoother.',
            zhEn: 'A quiet study room watched over by the owl. Pick a few things to practice each day and you\'ll keep getting smoother.',
          },
        ],
      },
      {
        emoji: '✍️',
        titleKo: '이렇게 연습해요',
        titleZh: '这儿能练什么', titleZhEn: 'What can I practice here',
        titleZhEn: 'What you can practice',
        features: [
          { icon: '🎙️', ko: '입으로 말해 보기', zh: '开口说：看中文说韩语、跟读、复述，AI 帮你打分', zhEn: 'Speak up: say Korean from Chinese, shadow, retell — AI scores you.' },
          { icon: '✏️', ko: '들은 대로 받아쓰기', zh: '听写：听着写下来，单词、句子、错题都能练', zhEn: 'Dictation: write what you hear — words, sentences, and past mistakes.' },
          { icon: '📝', ko: '문장 써 보기', zh: '动笔写：仿写、填空、自由写，AI 帮你改', zhEn: 'Write: imitate, fill in, or write freely — AI edits it for you.' },
          { icon: '⌨️', ko: '한글 타자 연습', zh: '练打字：主题词包、你的生词本，越打越快', zhEn: 'Type Hangul: theme packs and your wordbook — faster every time.' },
        ],
        note: '🥕 네 가지 다 해 보면 오늘 하루 꽉 찼어요 · 四样都练一遍，今天就很满足', noteEn: '🥕 Try all four and your day feels full—practice them all and today feels complete',
        noteEn: '🥕 네 가지 다 해 보면 오늘 하루 꽉 찼어요 · Do all four and your day feels complete.',
      },
    ],
  },

  // ── 动物城广场：兔莉和朋友们的 SNS ──
  blog: {
    id: 'blog',
    accent: 'oklch(64% 0.16 8)',          // 玫粉（广场/SNS）
    accentSoft: 'oklch(92% 0.05 8)',
    steps: [
      {
        emoji: '🐰🦦🐹🐯',
        titleKo: '토리네 동물 도시에 오신 걸 환영해요!',
        titleZh: '欢迎来到动物城广场', titleZhEn: 'Welcome to Animal City Plaza',
        titleZhEn: 'Welcome to the Animal City Square',
        intro: [
          {
            ko: '토리와 친구들이 매일 글을 올려요.',
            zh: '这是动物城广场。兔莉和朋友们每天发帖，记着在首尔留学的日子。', zhEn: 'This is Animal City Plaza. Tori and friends post every day, documenting their study-abroad days in Seoul.',
            zhEn: 'This is the Animal City Square. Tori and friends post every day about their study-abroad life in Seoul.',
          },
          {
            ko: '동물 도시는 사실 여러분이 배우는 서울이에요.',
            zh: '动物城其实就是你在学的首尔——地名、地铁、汉江都和真的一样，读到的全是真实韩语。', zhEn: 'Animal City is actually the Seoul you\'re learning—place names, subways, and the Han River are all real, and everything you read is authentic Korean.',
            zhEn: 'Animal City is really the Seoul you\'re learning — the place names, subway, and Han River are all real, and everything you read is real Korean.',
          },
        ],
      },
      {
        emoji: '📖',
        titleKo: '이렇게 즐겨요',
        titleZh: '在这儿怎么玩', titleZhEn: 'How to explore here',
        titleZhEn: 'How to enjoy it',
        features: [
          { icon: '🔍', ko: '모르는 단어는 톡!', zh: '帖子里不认识的词点一下，意思和发音都有', zhEn: 'Tap any word in a post — meaning and pronunciation included.' },
          { icon: '🎧', ko: '동물 목소리로 들어요', zh: '每篇都能用动物的声音听一遍，顺便练耳朵', zhEn: 'Hear each post in an animal\'s voice and train your ear along the way.' },
          { icon: '✏️', ko: '읽고 살짝 확인해요', zh: '读完做几道小题，看看懂了没', zhEn: 'After reading, do a few quick questions to check you understood.' },
          { icon: '📻', ko: '라디오도 흘러나와요', zh: '刷着刷着还会冒出电台节目，边看边听', zhEn: 'Radio shows pop up as you scroll — read and listen at once.' },
        ],
      },
      {
        emoji: '✍️',
        titleKo: '같이 놀면 더 재밌어요',
        titleZh: '一起玩更有意思', titleZhEn: 'More fun together',
        titleZhEn: 'More fun together',
        features: [
          { icon: '🐾', ko: '내 동물로 글 올리기', zh: '挑只动物当你自己，用韩语发帖，朋友们会来点赞、留言、打分', zhEn: 'Pick an animal as your avatar and post in Korean — friends will like, comment, and score you.' },
          { icon: '🔓', ko: '일기 진도 따라 열려요', zh: '帖子和节目跟着你的日记进度解锁——现在少是因为进度还没到，一天天学下去会越来越多', zhEn: 'Posts and shows unlock as your diary progresses — few now because you haven\'t gotten far yet; keep going day by day and more appear.' },
        ],
        note: '🥕 매일 조금씩, 동물 도시도 같이 자라요 · 每天来一点，动物城也陪你一起长大', noteEn: '🥕 A little every day, and Animal City grows with you—come daily and the city grows alongside you',
        noteEn: '🥕 매일 조금씩, 동물 도시도 같이 자라요 · A little each day — Animal City grows with you.',
      },
    ],
  },

  // ── 松鼠的单词铺：主题词包 / 教材词 / 生词本 ──
  vocabulary: {
    id: 'vocabulary',
    accent: 'oklch(66% 0.13 70)',        // 暖橙杏（松鼠）
    accentSoft: 'oklch(92% 0.05 70)',
    steps: [
      {
        emoji: '🐿️',
        titleKo: '다람쥐네 단어 가게',
        titleZh: '松鼠的单词铺', titleZhEn: 'Squirrel\'s Word Shop',
        titleZhEn: 'Squirrel\'s Word Shop',
        intro: [
          {
            ko: '여기 단어가 잔뜩 쌓여 있어요.',
            zh: '这儿囤着一大堆韩语单词——主题词包、教材词、TOPIK 词，按分类摆得整整齐齐。', zhEn: 'This place is stocked with tons of Korean words—theme packs, textbook vocab, and TOPIK words, all neatly organized by category.',
            zhEn: 'A big stash of Korean words is piled up here — theme packs, textbook words, TOPIK words, all sorted neatly by category.',
          },
          {
            ko: '다람쥐처럼 하나씩 모아 가요.',
            zh: '像松鼠囤松果一样，一个一个收进你的单词本，慢慢就攒厚了。', zhEn: 'Like a squirrel hoarding acorns, tuck each word into your notebook one by one, and it\'ll slowly grow thick.',
            zhEn: 'Like a squirrel hoarding acorns, tuck them into your wordbook one by one until it grows thick.',
          },
        ],
      },
      {
        emoji: '🌰',
        titleKo: '이렇게 모아요',
        titleZh: '这儿怎么用', titleZhEn: 'How to use this',
        titleZhEn: 'How to use it',
        features: [
          { icon: '🔍', ko: '단어 톡 치면 뜻이 쏙', zh: '点开任意词，意思、发音一次看全', zhEn: 'Tap any word to see its meaning and pronunciation at once.' },
          { icon: '⭐', ko: '마음에 들면 단어장에 쏙', zh: '想背的词收进单词本，随时翻出来复习', zhEn: 'Save words worth memorizing to your wordbook and review anytime.' },
          { icon: '🎧', ko: '소리도 들어 봐요', zh: '每个词都能听发音，跟着念', zhEn: 'Every word has audio — listen and say it along.' },
          { icon: '🗂️', ko: '주제별로 착착', zh: '咖啡厅、机场、校园…34 个主题，用到哪学哪', zhEn: 'Cafe, airport, campus… 34 themes — learn whatever you need.' },
        ],
        note: '🥕 오늘 세 개만 주워 가도 부자예요 · 今天捡三个词回家，就已经很富了', noteEn: '🥕 오늘 세 개만 주워 가도 부자예요 · Pick up just three words today, and you\'re already rich',
        noteEn: '🥕 오늘 세 개만 주워 가도 부자예요 · Pick up just three words today and you\'re already rich.',
      },
    ],
  },

  // ── 兔莉的日记本：兽尔留学日记，一天一篇 ──
  diary: {
    id: 'diary',
    accent: 'oklch(66% 0.14 30)',        // 暖橘粉（兔莉，比广场玫粉更暖）
    accentSoft: 'oklch(92% 0.05 30)',
    steps: [
      {
        emoji: '📔',
        titleKo: '토리의 일기장',
        titleZh: '兔莉的日记本', titleZhEn: 'Tori\'s Diary',
        titleZhEn: 'Tori\'s Diary',
        intro: [
          {
            ko: '토리가 서울에서 쓴 일기를 같이 읽어요.',
            zh: '这是兔莉在首尔（动物城）留学的日记。跟着一天天读，韩语和故事一起往前走。', zhEn: 'This is Tori\'s diary from studying abroad in Seoul (Animal Town). Read along day by day, and your Korean and the story will move forward together.',
            zhEn: 'Read the diary Tori keeps while studying in Seoul (Animal City). Follow it day by day and your Korean moves forward with the story.',
          },
          {
            ko: '하루에 한 편, 딱 좋아요.',
            zh: '一天一篇刚刚好，不用赶。', zhEn: 'One entry a day is just right—no need to rush.',
            zhEn: 'One entry a day is just right — no need to rush.',
          },
        ],
      },
      {
        emoji: '✏️',
        titleKo: '이렇게 봐요',
        titleZh: '这样陪你读', titleZhEn: 'Here\'s how we\'ll read together',
        titleZhEn: 'How we\'ll read',
        features: [
          { icon: '📖', ko: '그날의 이야기부터', zh: '先读兔莉今天发生了什么，代入她的一天', zhEn: 'Start with what happened to Tori today and step into her day.' },
          { icon: '🔤', ko: '새 단어랑 문법도 살짝', zh: '顺手学这天的新词和语法点', zhEn: 'Pick up the day\'s new words and grammar points along the way.' },
          { icon: '🔍', ko: '모르는 건 톡 치기', zh: '不认识的词句点一下就有解释', zhEn: 'Tap anything you don\'t know for an explanation.' },
          { icon: '✅', ko: '읽고 나면 작은 관문도', zh: '读完还有小关卡，把学到的练一练', zhEn: 'After reading, small challenges let you practice what you learned.' },
        ],
        note: '🥕 토리랑 하루하루, 서두르지 않아도 돼요 · 有兔莉陪着，一天一天来，不用赶', noteEn: '🥕 토리랑 하루하루, 서두르지 않아도 돼요 · With Tori by your side, take it day by day—no need to rush',
        noteEn: '🥕 토리랑 하루하루, 서두르지 않아도 돼요 · Day by day with Tori — no need to hurry.',
      },
    ],
  },

  // ── 动物城电台：四档动物 DJ 节目，边听边练 ──
  radio: {
    id: 'radio',
    accent: 'oklch(58% 0.11 250)',       // 夜蓝（电台/深夜频道）
    accentSoft: 'oklch(91% 0.045 250)',
    steps: [
      {
        emoji: '📻',
        titleKo: '동물 도시 라디오',
        titleZh: '动物城电台', titleZhEn: 'Animal Town Radio',
        titleZhEn: 'Animal City Radio',
        intro: [
          {
            ko: '동물 친구들이 매일 방송을 해요.',
            zh: '动物城的朋友们每天开播——松鼠的早安、动物城新闻、熊的夜晚故事、狐狸的思辨咖啡馆，还有狐狸的深夜访谈。', zhEn: 'The friends of Animal Town broadcast every day—Squirrel\'s morning greetings, Animal Town News, Bear\'s nighttime stories, Fox\'s Café of Thought, and Fox\'s late-night interviews.',
            zhEn: 'The animal friends broadcast every day — Squirrel\'s good morning, Animal City news, Bear\'s bedtime stories, Fox\'s thinking cafe, and Fox\'s late-night interviews.',
          },
          {
            ko: '듣기 연습, 이렇게 즐겁게.',
            zh: '听力练习也能很享受，挑个喜欢的频道放着听。', zhEn: 'Listening practice can be enjoyable too—pick a channel you like and just let it play.',
            zhEn: 'Listening practice can be a joy — pick a channel you like and let it play.',
          },
        ],
      },
      {
        emoji: '🎧',
        titleKo: '이렇게 들어요',
        titleZh: '这样听', titleZhEn: 'Here\'s how to listen',
        titleZhEn: 'How to listen',
        features: [
          { icon: '📝', ko: '자막 보면서 들어요', zh: '实时韩中字幕，跟着一句一句听', zhEn: 'Live subtitles — follow along line by line.' },
          { icon: '🔍', ko: '모르는 단어는 톡', zh: '字幕里的词点一下就查，边听边学', zhEn: 'Tap a word in the subtitles to look it up while you listen.' },
          { icon: '📻', ko: '지난 방송도 다 있어요', zh: '往期节目都留着，随时回听', zhEn: 'Past episodes are all kept — replay anytime.' },
          { icon: '🔓', ko: '일기 진도 따라 열려요', zh: '节目跟着你的日记进度解锁——现在少是因为进度还没到，往下学会越来越多', zhEn: 'Shows unlock as your diary progresses — there are few now because you haven\'t gotten far yet; keep going and more open up.' },
        ],
        note: '🥕 흘려들어도 귀가 트여요 · 就算只是放着听，耳朵也会慢慢打开', noteEn: '🥕 흘려들어도 귀가 트여요 · Even if you just let it play, your ears will gradually open up',
        noteEn: '🥕 흘려들어도 귀가 트여요 · Even half-listening opens your ears over time.',
        modePicker: true,
      },
    ],
  },

  // ── 猫头鹰的解词馆：一句韩语拆到底 ──
  analyze: {
    id: 'analyze',
    accent: 'oklch(56% 0.13 300)',       // 紫罗兰（解词/分析，与自习室青绿区分）
    accentSoft: 'oklch(92% 0.045 300)',
    steps: [
      {
        emoji: '🦉',
        titleKo: '부엉이의 낱말 풀이방',
        titleZh: '猫头鹰的解词馆', titleZhEn: 'Owl\'s Word Workshop',
        titleZhEn: 'Owl\'s Word Study',
        intro: [
          {
            ko: '한 문장을 통째로 풀어 드려요.',
            zh: '贴一句韩语进来，猫头鹰帮你从头拆到尾：词、助词、语法、结构，一样不落。', zhEn: 'Paste a Korean sentence in, and Owl will break it down from start to finish: words, particles, grammar, structure—nothing left out.',
            zhEn: 'Paste in one Korean sentence and Owl unpacks it all — words, particles, grammar, structure, nothing left out.',
          },
          {
            ko: '중국어도 넣으면 한국어로 바꿔 줘요.',
            zh: '中韩都行——放中文进来，也能帮你翻成自然的韩语再拆解。', zhEn: 'Works with both Chinese and Korean—put in Chinese, and it\'ll translate it into natural Korean and break that down too.',
            zhEn: 'Works both ways — drop in Chinese and it turns into natural Korean, then breaks that down too.',
          },
        ],
      },
      {
        emoji: '🔍',
        titleKo: '이렇게 풀어 줘요',
        titleZh: '会这样帮你拆', titleZhEn: 'Here\'s how it breaks things down',
        titleZhEn: 'How it unpacks',
        features: [
          { icon: '🧩', ko: '단어랑 조사 하나하나', zh: '每个词、每个助词都单独讲，还给例句', zhEn: 'Every word and particle explained one by one, with examples.' },
          { icon: '📐', ko: '문장 구조도 보여줘요', zh: '主谓宾怎么搭，一张结构图看明白', zhEn: 'See how subject-verb-object fit together in one structure map.' },
          { icon: '📖', ko: '문법 포인트도 짚어요', zh: '句子里的语法点挑出来，讲清怎么用', zhEn: 'Grammar points in the sentence are pulled out and explained.' },
          { icon: '⭐', ko: '배운 건 저장하고 퀴즈로', zh: '好词好句一键收藏，还能做小题巩固', zhEn: 'Save the good bits in one tap and lock them in with a quick quiz.' },
        ],
        note: '🥕 헷갈리는 문장, 여기 넣어 보세요 · 拿不准的句子，丢进来就懂了', noteEn: '🥕 헷갈리는 문장, 여기 넣어 보세요 · Not sure about a sentence? Drop it here and it\'ll make sense',
        noteEn: '🥕 헷갈리는 문장, 여기 넣어 보세요 · Toss in any sentence you\'re unsure about.',
      },
    ],
  },

  // ── 动物城绘本馆：图多字少的短故事，跟读入门 ──
  picbooks: {
    id: 'picbooks',
    accent: 'oklch(72% 0.13 90)',        // 暖黄（绘本/故事屋）
    accentSoft: 'oklch(93% 0.05 90)',
    steps: [
      {
        emoji: '🐻',
        titleKo: '동물 도시 그림책 방',
        titleZh: '动物城绘本馆', titleZhEn: 'Animal Town Picture Book Library',
        titleZhEn: 'Animal City Picture Book Room',
        intro: [
          {
            ko: '그림이랑 같이 읽는 짧은 이야기예요.',
            zh: '这里是配着图画的短故事，字少画多，最适合刚开始读韩语。', zhEn: 'Short stories with pictures — few words, lots of art, perfect for starting to read Korean.',
            zhEn: 'Short stories that come with pictures — few words, lots of art, perfect for your first Korean reading.',
          },
          {
            ko: '포근한 이야기 방에서 천천히.',
            zh: '窝在暖乎乎的故事屋里，一页一页慢慢翻。', zhEn: 'Curl up in a cozy story nook and flip through page by page.',
            zhEn: 'Curl up in the cozy story room and turn the pages slowly, one at a time.',
          },
        ],
      },
      {
        emoji: '📖',
        titleKo: '이렇게 읽어요',
        titleZh: '这样读', titleZhEn: 'Read this way',
        titleZhEn: 'How to read',
        features: [
          { icon: '🔊', ko: '한 줄씩 읽어 줄게요', zh: '每句都有朗读，听着读，念着读', zhEn: 'Every line has audio — listen as you read, and read along.' },
          { icon: '✨', ko: '따라 읽고 불이 반짝', zh: '跟读时读到哪、亮到哪，像卡拉OK', zhEn: 'Lines light up as you read along, karaoke-style.' },
          { icon: '🔍', ko: '모르는 단어는 톡', zh: '不认识的词点一下，意思发音都有', zhEn: 'Tap any word you don\'t know for its meaning and sound.' },
          { icon: '⭐', ko: '마음에 든 단어는 저장', zh: '喜欢的词收藏起来，攒成自己的词本', zhEn: 'Save words you like and build up your own wordbook.' },
        ],
        note: '🥕 그림 보며 읽으면 하나도 안 어려워요 · 看着图读，一点都不难', noteEn: '🥕 그림 보며 읽으면 하나도 안 어려워요 · Reading with pictures makes it easy',
        noteEn: '🥕 그림 보며 읽으면 하나도 안 어려워요 · Read with the pictures and it\'s not hard at all.',
      },
    ],
  },
};
