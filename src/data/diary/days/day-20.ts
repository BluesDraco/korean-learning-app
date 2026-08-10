import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 20 · 합동 예고 · 海豹房东走进了房间
 *
 * 剧情：中介说明天见房东。Tori提前到원룸，穿西装的金链子海豹房东踩着皮鞋走进来。
 * 500/50/5——Tori的笔记本写满了数字。她鼓起勇气问了管理费的内容。
 *
 * 学习目标：N에 뭐가 들어 있어요?（里面包含什么）/ 租房费用词汇
 * 语料层级：해요体 + 합쇼체（面对房东，礼貌正式）
 * 韩语自审：korean skill PASS（자연성/문법/조사 三关）
 */
export const day20: ToriDay = {
  level: 'beginner',
  day: 20,
  phase: 'expansion',
  title: '签约前夜 · 海豹房东走进了房间', titleEn: 'The night before signing · The seal landlord walks into the room',
  subtitle: '500/50/5 따로 — Tori的笔记本写满了', subtitleEn: '500/50/5 separately — Tori\'s notebook is full',
  heroImageUrl: '/images/diary/day-20-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 20일 · 금요일 오후',
    weather: '兽尔 · 晴', weatherEn: 'Seoul · Sunny',
    toriPose: 'shy',
    diaryText: `9月20日，周五下午。

老犬中介打电话来："내일 집주인 만나요."
（明天见房东。）

我提前到了那间원룸。
三楼，朝南，阳光打在空荡荡的地板上。

门口传来皮鞋声——
一只穿西装、戴金链子的海豹，
大腹便便地走进来。

"안녕하세요. 토리 학생이죠?"
（你好。是兔莉同学吧？）

海豹房东翻开文件夹：
"보증금 500만, 월세 50만, 관리비 5만 따로."
我在笔记本上飞速写下：500 / 50 / 5 따로。

然后我问了一句——
"관리비에 뭐가 들어 있어요?"
（管理费包含什么？）

海豹房东愣了一下。
大概没想到留学生会问这个。`,
  },

  words: [
    {
      id: 'd20-w1',
      korean: '집주인',
      hangul: 'jip-ju-in',
      zh: '房东', zhEn: 'landlord',
      pos: '名词', posEn: 'Noun',
      example: { ko: '집주인이 친절해요.', zh: '房东很亲切。', zhEn: 'The landlord is very friendly.' },
      tip: '집(房) + 주인(主人) = 房东。韩国租房时房东权力很大', tipEn: '집(house) + 주인(owner) = landlord. In Korea, landlords have a lot of power when renting.',
    },
    {
      id: 'd20-w2',
      korean: '계약',
      hangul: 'gye-yak',
      zh: '合同', zhEn: 'contract',
      pos: '名词', posEn: 'Noun',
      example: { ko: '계약서를 잘 읽어 보세요.', zh: '请仔细看合同。', zhEn: 'Please read the contract carefully.' },
      tip: '계(契) + 약(约)。계약하다 = 签合同', tipEn: '계(contract) + 약(agreement). 계약하다 = to sign a contract',
    },
    {
      id: 'd20-w3',
      korean: '관리비',
      hangul: 'gwal-li-bi',
      zh: '管理费', zhEn: 'maintenance fee',
      pos: '名词', posEn: 'Noun',
      example: { ko: '관리비에 뭐가 들어 있어요?', zh: '管理费包含什么？', zhEn: 'What does the maintenance fee include?' },
      tip: '관리(管理) + 비(费)。韩国公寓除月租外还有管理费', tipEn: '관리(management) + 비(fee). In Korean apartments, there\'s a maintenance fee on top of the monthly rent.',
    },
    {
      id: 'd20-w4',
      korean: '따로',
      hangul: 'tta-ro',
      zh: '单独；另外', zhEn: 'separately; additionally',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '관리비는 따로예요.', zh: '管理费另算。', zhEn: 'The maintenance fee is separate.' },
      tip: '따로 = 分开/另外。房东说"따로"意思是"不包含在月租里"', tipEn: '따로 = separate/additionally. When the landlord says "따로," it means "not included in the monthly rent."',
    },
    {
      id: 'd20-w5',
      korean: '들어 있어요',
      hangul: 'deu-reo i-sseo-yo',
      zh: '包含；装着', zhEn: 'to include; to contain',
      pos: '表达', posEn: 'Expression',
      example: { ko: '관리비에 수도세가 들어 있어요.', zh: '管理费里包含水费。', zhEn: 'The maintenance fee includes the water bill.' },
      tip: '들다(进入) + 어 있다(持续状态) = 被包含在里面', tipEn: '들다(to enter) + 어 있다(ongoing state) = to be included inside',
    },
    {
      id: 'd20-w6',
      korean: '질문',
      hangul: 'jil-mun',
      zh: '问题', zhEn: 'question',
      pos: '名词', posEn: 'Noun',
      example: { ko: '질문 있어요.', zh: '我有问题。', zhEn: 'I have a question.' },
      tip: '질(质) + 문(问)。질문하다 = 提问', tipEn: '질(quality) + 문(ask). 질문하다 = to ask a question',
    },
  ],

  dialogue: {
    scene: '원룸看房·见房东', sceneEn: 'Viewing a studio · Meeting the landlord',
    setting: {
      time: '周五下午', timeEn: 'Friday afternoon',
      place: '3层원룸·空房间', placeEn: '3rd-floor studio · empty room',
      npc: '海豹房东（穿西装·戴金链子）', npcEn: 'Seal landlord (wearing a suit · gold chain)',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '海豹房东', npcNameEn: 'Seal landlord',
        ko: '안녕하세요. 토리 학생이죠?',
        hangul: 'an-nyeong-ha-se-yo. to-ri hak-saeng-i-jyo?',
        zh: '你好。是兔莉同学吧？', zhEn: 'Hello. You\'re Tori, right?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 안녕하세요. 잘 부탁드려요.',
        hangul: 'ne, an-nyeong-ha-se-yo. jal bu-tak-deu-ryeo-yo.',
        zh: '是的，您好。请多关照。', zhEn: 'Yes, hello. Nice to meet you.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '海豹房东', npcNameEn: 'Seal landlord',
        ko: '보증금 500만, 월세 50만, 관리비 5만 따로예요.',
        hangul: 'bo-jeung-geum o-baek-man, wol-se o-sip-man, gwal-li-bi o-man tta-ro-ye-yo.',
        zh: '押金500万，月租50万，管理费5万另算。', zhEn: 'Deposit 5 million won, monthly rent 500,000 won, management fee 50,000 won extra.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '관리비에 뭐가 들어 있어요?',
        hangul: 'gwal-li-bi-e mwo-ga deu-reo i-sseo-yo?',
        zh: '管理费包含什么？', zhEn: 'What does the maintenance fee include?',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '海豹房东', npcNameEn: 'Seal landlord',
        ko: '수도세랑 청소비만 들어 있어요. 전기세랑 인터넷은 따로예요.',
        hangul: 'su-do-se-rang cheong-so-bi-man deu-reo i-sseo-yo. jeon-gi-se-rang in-teo-ne-seun tta-ro-ye-yo.',
        zh: '只包含水费和清洁费。电费和网费另算。', zhEn: 'Only water and cleaning fees are included. Electricity and internet are extra.',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: 'Tori想确认水电费是否都包含在管理费里，她应该怎么问？', zhEn: 'Tori wants to confirm whether utilities are included in the management fee. How should she ask?',
        practice: 'pick',
        choices: [
          { ko: '수도세, 전기세도 들어 있어요?', zh: '水费、电费也包含吗？', zhEn: 'Are water and electricity included too?', correct: true },
          { ko: '관리비 얼마예요?', zh: '管理费多少？', zhEn: 'How much is the management fee?', correct: false },
          { ko: '월세 깎아 주세요.', zh: '请降月租。', zhEn: 'Please lower the monthly rent.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '里面包含什么：N에 뭐가 들어 있어요?', titleEn: 'What\'s included: N에 뭐가 들어 있어요?',
    pattern: 'N + **에** + 뭐가 + **들어 있어요**? = ___里包含什么？', patternEn: 'N + **에** + 뭐가 + **들어 있어요**? = What does ___ include?',
    whenToUse: '询问某个东西里面包含/装着什么。Day 20 兔莉问"관리비에 뭐가 들어 있어요?"——管理费里包含什么。这是租房签约时必须问的句子。', whenToUseEn: 'Asking what something contains or holds. Day 20: Tori asks "관리비에 뭐가 들어 있어요?" — What does the management fee include? This is a must-ask sentence when signing a lease.',
    rules: [
      '**基本公式**：N에 + 뭐가 + 들어 있어요? = ___里面有什么/包含什么。에 表示"在……里"，들어 있다 = 装着/包含着',
      '**들어 있다 结构**：들다(进入) + 어 있다(持续状态) = 进入后保持 = 包含着/装着。是 V + 어 있다 的典型用法',
      '**에 的作用**：表示位置/范围。관리비에 = 在管理费里；가방에 = 在包里；냉장고에 = 在冰箱里',
      '**뭐가 vs 무엇이**：뭐가 = 什么（口语）；무엇이 = 什么（书面）。日常对话用 뭐가',
      '**回答句式**：N이/가 들어 있어요 = 里面有___。수도세가 들어 있어요 = 包含水费。이/가 看名词收音',
      '**만 的搭配**：N만 들어 있어요 = 只包含___。인터넷만 들어 있어요 = 只包含网费。만(只) 限定范围',
      '**따로 的用法**：N은/는 따로예요 = ___另算/另收。전기세는 따로예요 = 电费另收。따로 是租房时的高频词',
    ],
    examples: [
      { ko: '관리비에 뭐가 들어 있어요?', zh: '管理费包含什么？', zhEn: 'What does the maintenance fee include?', highlight: '에 ... 들어 있어요', note: '관리비 + 에(在……里) + 뭐가(什么) + 들어 있어요(包含)。租房必问句', noteEn: '관리비 + 에(in) + 뭐가(what) + 들어 있어요(included). A must-ask for renting.' },
      { ko: '가방에 뭐가 들어 있어요?', zh: '包里装着什么？', zhEn: 'What\'s in the bag?', highlight: '에 ... 들어 있어요', note: '가방(包) + 에。同样结构，不同场景——过海关时也可能被问', noteEn: '가방(bag) + 에. Same structure, different context — you might be asked this at customs.' },
      { ko: '수도세가 들어 있어요.', zh: '包含水费。', zhEn: 'It includes the water bill.', highlight: '들어 있어요', note: '수도세(水费) + 가(主格)。回答"包含什么"时，用 이/가 + 들어 있어요', noteEn: '수도세(water bill) + 가(subject marker). When answering "what\'s included," use 이/가 + 들어 있어요.' },
      { ko: '전기세는 따로예요.', zh: '电费另算。', zhEn: 'Electricity is extra.', highlight: '따로', note: '전기세(电费) + 는(主题) + 따로(另外)。따로 是"不包含在内"的关键词', noteEn: '전기세(electricity) + 는(topic) + 따로(separately). 따로 is the key word for "not included."' },
      { ko: '이 세트에 음료도 들어 있어요?', zh: '这个套餐也包含饮料吗？', zhEn: 'Does this set meal include drinks too?', highlight: '에 ... 들어 있어요', note: '세트(套餐) + 에 + 음료(饮料) + 도(也) + 들어 있어요?。点餐时也能用', noteEn: '세트(set) + 에 + 음료(drink) + 도(also) + 들어 있어요? Can be used when ordering food.' },
    ],
    pitfall:
      '① 들어 있다 ≠ 들다：들어 있다 = 包含着（状态）；들다 = 进入（动作）/ 花费。"돈이 들다"= 花钱，和"들어 있다"意思完全不同。② 에 不能省：관리비 뭐가 들어 있어요 ❌ → 관리비"에" 뭐가 들어 있어요 ✓。③ 뭐가 的"가"不能省：뭐 들어 있어요（口语极随意可以）但标准是 뭐가。',
  },

  output: [
    {
      id: 'd20-o1',
      kind: 'compose',
      zhHint: '管理费包含什么？', zhHintEn: 'What does the maintenance fee include?',
      tokens: ['관리비에', '뭐가', '들어', '있어요', '얼마예요', '따로예요'],
      composeAnswer: ['관리비에', '뭐가', '들어', '있어요'],
      successMsg: '관리비에 뭐가 들어 있어요? — 海豹房东愣了一下，然后认真回答了。', successMsgEn: '관리비에 뭐가 들어 있어요? — The seal landlord paused, then answered seriously.',
    },
    {
      id: 'd20-o2',
      kind: 'listen-choice',
      audioKo: '보증금 500만, 월세 50만, 관리비 5만 따로예요.',
      successMsg: '✓ 500/50/5 따로——记住这组数字，签约前确认清楚。', successMsgEn: '✓ 500/50/5 따로 — Remember these numbers and confirm them before signing.',
      choices: [
        { zh: '押金500万，月租50万，管理费5万另算。', zhEn: 'Deposit 5 million won, monthly rent 500,000 won, management fee 50,000 won extra.', correct: true },
        { zh: '一共555万韩元。', zhEn: 'That\'s 5.55 million won in total.', correct: false },
        { zh: '押金50万，月租500万。', zhEn: 'Deposit 500,000 won, monthly rent 5 million won.', correct: false },
        { zh: '管理费包含在月租里。', zhEn: 'The management fee is included in the monthly rent.', correct: false },
      ],
    },
    {
      id: 'd20-o3',
      kind: 'zh-to-ko',
      zhPrompt: '包里装着什么？', zhPromptEn: 'What\'s in the bag?',
      successMsg: '"가방에 뭐가 들어 있어요?" — 同样句式，换个名词就行。', successMsgEn: '"가방에 뭐가 들어 있어요?" — Same pattern, just swap the noun.',
      choices: [
        { ko: '가방에 뭐가 들어 있어요?', correct: true },
        { ko: '가방에 뭐 있어요?', correct: false },
        { ko: '가방이 뭐가 들어요?', correct: false },
        { ko: '가방에 뭐가 들어 갔어요?', correct: false },
      ],
    },
    {
      id: 'd20-o4',
      kind: 'particle-error',
      zhHint: '管理费包含什么？', zhHintEn: 'What does the maintenance fee include?',
      successMsg: '관리비 + 에（在里面）；뭐 + 가（什么·主格）。에 不能省。', successMsgEn: 'Management fee + 에 (inside); 뭐 + 가 (what·subject marker). 에 cannot be omitted.',
      choices: [
        { ko: '관리비에 뭐가 들어 있어요?', correct: true },
        { ko: '관리비 뭐가 들어 있어요?', correct: false },
        { ko: '관리비에 뭐 들어 있어요?', correct: false },
        { ko: '관리비가 뭐에 들어 있어요?', correct: false },
      ],
    },
    {
      id: 'd20-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 20 全对。明天签合同，Tori准备好了。', successMsgEn: '✓ Day 20 all correct. Tomorrow we sign the contract—Tori is ready.',
      pairs: [
        { ko: '집주인', zh: '房东', zhEn: 'landlord' },
        { ko: '계약', zh: '合同', zhEn: 'contract' },
        { ko: '관리비', zh: '管理费', zhEn: 'maintenance fee' },
        { ko: '따로', zh: '另算', zhEn: 'Separate' },
        { ko: '질문', zh: '问题', zhEn: 'question' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '집주인 앞에서 당당하게 질문했어요! 토리, 멋져요!',
    preview: '明天：正式签合同——和海豹房东签租房合同！', previewEn: 'Tomorrow: officially signing the contract—the lease with the seal landlord!',
    stickerId: 'sticker-d20',
    sceneImageUrl: '/images/diary/day-20-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「들어 있어요是什么意思？跟있어요有什么区别？」「韩国管理费一般包含什么？」',
};
