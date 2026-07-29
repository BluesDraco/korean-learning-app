import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 21 · 해豹房东签合同 · 당근俚语
 *
 * 剧情：中介老犬、海豹房东、Tori三人围坐长桌。三页纸的合同推过来。
 * Tori硬着头皮读，发现奇怪条款"매주 당근 1개 제공"。
 * 她以为是俚语"당근(당연히)"的缩写，房东笑了："진짜 당근이에요."
 * 签完合同，拿到钥匙——钥匙扣上挂着一个小胡萝卜。
 *
 * 学习目标：签合同四步流程（확인→질문→사인→인사）/ 합쇼체正式表达
 * 语料层级：합쇼체 + 해요体混用（正式签约场合）
 * 韩语自审：korean skill PASS（자연성/문법/조사 三关）
 */
export const day21: ToriDay = {
  level: 'beginner',
  day: 21,
  phase: 'expansion',
  title: '海豹房东签合同',
  subtitle: '一把闪银光的钥匙挂着一个胡萝卜',
  heroImageUrl: '/images/diary/day-21-hero.jpg',
  estimatedMin: 14,

  opening: {
    date: '9월 21일 · 토요일 오후',
    weather: '兽尔 · 晴朗',
    toriPose: 'shy',
    diaryText: `9月21日，周六下午。

老犬中介、海豹房东、我——三人围坐在一张长桌前。
三页纸的合同推到我面前，满页敬语。

我硬着头皮一行一行读。
第七条："매주 당근 1개 제공."
（每周提供一根胡萝卜。）

我愣了。당근——不是俚语"당연히(当然)"的缩写吗？
我小心翼翼问房东。

海豹房东笑了，金链子晃了一下：
"아니요, 진짜 당근이에요."
（不，是真的胡萝卜。）

……好吧。这里果然是动物城。

签完名，房东递过来一把钥匙。
钥匙扣上——挂着一个小胡萝卜。
和妈妈给我的那根，一模一样的橙色。`,
  },

  words: [
    {
      id: 'd21-w1',
      korean: '계약',
      hangul: 'gye-yak',
      zh: '合同',
      pos: '名词',
      example: { ko: '계약서에 사인해 주세요.', zh: '请在合同上签名。' },
      tip: '계(契) + 약(约)。계약하다 = 签合同；계약서 = 合同文件',
    },
    {
      id: 'd21-w2',
      korean: '기간',
      hangul: 'gi-gan',
      zh: '期间',
      pos: '名词',
      example: { ko: '계약 기간은 1년이에요.', zh: '合同期限是1年。' },
      tip: '기(期) + 간(间)。租房合同通常1~2年',
    },
    {
      id: 'd21-w3',
      korean: '입금',
      hangul: 'ip-geum',
      zh: '转账；汇款',
      pos: '名词',
      example: { ko: '25일에 입금해 주세요.', zh: '请在25号转账。' },
      tip: '입(入) + 금(金) = 入金/转账。월세 입금 = 交月租',
    },
    {
      id: 'd21-w4',
      korean: '맞아요',
      hangul: 'ma-ja-yo',
      zh: '没错；对的',
      pos: '动词',
      example: { ko: '네, 맞아요.', zh: '是的，没错。' },
      tip: '맞다(对/正确) + 아요。确认信息时的标准回答',
    },
    {
      id: 'd21-w5',
      korean: '열쇠',
      hangul: 'yeol-soe',
      zh: '钥匙',
      pos: '名词',
      example: { ko: '열쇠 받았어요.', zh: '拿到钥匙了。' },
      tip: '열(开) + 쇠(铁)。비밀번호 도어락 普及后实体钥匙少见了',
    },
    {
      id: 'd21-w6',
      korean: '당근',
      hangul: 'dang-geun',
      zh: '胡萝卜 / 当然(俚语)',
      pos: '名词',
      example: { ko: '당근이지! 당연하지!', zh: '当然啦！（俚语）' },
      tip: '당근 本义是胡萝卜；因发音像"당연(当然)"，年轻人当俚语用',
    },
  ],

  dialogue: {
    scene: '签约现场·三人围坐',
    setting: {
      time: '周六下午',
      place: '원룸 签约桌前',
      npc: '老犬中介 / 海豹房东',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '老犬中介',
        ko: '계약서 가져왔어요. 여기 사인해 주세요.',
        hangul: 'gye-yak-seo ga-jyeo-wa-sseo-yo. yeo-gi sa-in-hae ju-se-yo.',
        zh: '合同带来了。请在这里签名。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '보증금 500만, 월세 50만, 25일 입금. 맞아요?',
        hangul: 'bo-jeung-geum o-baek-man, wol-se o-sip-man, i-si-bo-il ip-geum. ma-ja-yo?',
        zh: '押金500万，月租50万，25号转账。对吗？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '海豹房东',
        ko: '네, 맞아요. 계약 기간은 1년이에요.',
        hangul: 'ne, ma-ja-yo. gye-yak gi-ga-neun il-lyeon-i-e-yo.',
        zh: '对。合同期限是1年。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '"매주 당근 1개 제공"? 이거 당근이죠? 당연히?',
        hangul: '"mae-ju dang-geun il-gae je-gong"? i-geo dang-geun-i-jyo? dang-yeon-hi?',
        zh: '"每周提供1根胡萝卜"？这是"当然"的意思吧？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '海豹房东',
        ko: '아니요, 진짜 당근이에요.',
        hangul: 'a-ni-yo, jin-jja dang-geun-i-e-yo.',
        zh: '不，是真的胡萝卜。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '…진짜 당근?',
        hangul: '…jin-jja dang-geun?',
        zh: '……真的胡萝卜？',
        practice: 'listen',
      },
      {
        speaker: 'you',
        ko: '?',
        hangul: '',
        zh: '签约完毕，Tori拿到钥匙。她应该怎么跟房东道别？',
        practice: 'pick',
        choices: [
          { ko: '감사합니다. 앞으로 잘 부탁드립니다.', zh: '谢谢。以后请多关照。', correct: true },
          { ko: '당근 주세요.', zh: '请给我胡萝卜。', correct: false },
          { ko: '안녕히 계세요. 다시 올게요.', zh: '再见，我还会再来。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '签合同四步：확인→질문→사인→인사',
    pattern: '확인(确认) → 질문(提问) → 사인(签名) → 인사(寒暄)',
    whenToUse: '在韩国签租房合同（或其他正式协议）时的完整流程。Day 21 兔莉用四步完成了签约：先确认金额、再提问条款、签字、最后礼貌寒暄。每一步都有对应的标准韩语表达。',
    rules: [
      '**Step 1 확인(确认)**：复述合同内容 + 맞아요? 确认。"보증금 500만, 월세 50만. 맞아요?" — 把数字说出来让对方确认',
      '**Step 2 질문(提问)**：不懂就问。"이게 무슨 뜻이에요?"(这是什么意思？) / "관리비에 뭐가 들어 있어요?"(管理费包含什么？)',
      '**Step 3 사인(签字)**：对方说"여기 사인해 주세요"(请在这签名)，你签字确认。自己主动说："사인하면 되죠?"(签名就行了吧？)',
      '**Step 4 인사(寒暄)**：签完用합쇼체表正式感谢："감사합니다. 앞으로 잘 부탁드립니다."(谢谢，以后请多关照)',
      '**맞아요 用法**：맞다(对) + 아요 = 맞아요。用于确认事实。"그게 맞아요?"(那个对吗？) / "네, 맞아요."(是的，没错)',
      '**잘 부탁드립니다 用法**：합쇼체正式请求。比 잘 부탁드려요 更正式。用于签约、第一次见面、开学等正式场合',
      '**당근 双义**：① 胡萝卜（本义）② 当然（俚语，因发音像 당연）。"당근이지!" = "당연하지!"(那当然！) 年轻人常用',
    ],
    examples: [
      { ko: '보증금 500만, 월세 50만. 맞아요?', zh: '押金500万，月租50万。对吗？', highlight: '맞아요', note: '확인 步骤：复述数字 + 맞아요? 让对方确认。签约前必做' },
      { ko: '계약 기간이 어떻게 돼요?', zh: '合同期限是多久？', highlight: '어떻게 돼요', note: '질문 步骤：用"어떻게 돼요?"询问具体条件。比直接问"몇 년?"更礼貌' },
      { ko: '여기 사인하면 되죠?', zh: '在这签名就行了吧？', highlight: '하면 되죠', note: '사인 步骤："V하면 되다" = 做了就行。죠 = 지요 的缩写，表确认' },
      { ko: '감사합니다. 앞으로 잘 부탁드립니다.', zh: '谢谢。以后请多关照。', highlight: '잘 부탁드립니다', note: '인사 步骤：합쇼체最高礼貌。앞으로 = 今后。正式结尾的标准句' },
      { ko: '당근이지! 당연하지!', zh: '当然啦！', highlight: '당근', note: '당근 俚语用法 = 당연히(当然)。年轻人聊天时用。正式场合别用' },
    ],
    pitfall:
      '① 맞아요 vs 맞습니다：맞아요 是해요体（半正式），맞습니다 是합쇼체（全正式）。签约时两个都能用，但对房东用 맞습니다 更得体。② 잘 부탁드립니다 只在"开始新关系"时用（入职/签约/拜师），不能每次见面都说。③ 당근(당연히) 是俚语，正式场合说 당연하죠 更安全。',
  },

  output: [
    {
      id: 'd21-o1',
      kind: 'compose',
      zhHint: '谢谢。以后请多关照。',
      tokens: ['감사합니다', '앞으로', '잘', '부탁드립니다', '안녕하세요', '주세요'],
      composeAnswer: ['감사합니다', '앞으로', '잘', '부탁드립니다'],
      successMsg: '감사합니다. 앞으로 잘 부탁드립니다. — 海豹房东满意地点了点头。',
    },
    {
      id: 'd21-o2',
      kind: 'compose',
      zhHint: '押金500万，月租50万，25号转账。对吗？',
      tokens: ['보증금', '500만', '월세', '50만', '25일', '입금', '맞아요'],
      composeAnswer: ['보증금', '500만', '월세', '50만', '25일', '입금', '맞아요'],
      successMsg: '完美确认。数字一个不差，签约前最重要的步骤。',
    },
    {
      id: 'd21-o3',
      kind: 'listen-choice',
      audioKo: '계약 기간은 1년이에요.',
      successMsg: '✓ 계약 기간 = 合同期限。韩国租房一般签1~2年。',
      choices: [
        { zh: '合同期限是1年。', correct: true },
        { zh: '管理费是1万。', correct: false },
        { zh: '押金期限是1个月。', correct: false },
        { zh: '合同从1号开始。', correct: false },
      ],
    },
    {
      id: 'd21-o4',
      kind: 'zh-to-ko',
      zhPrompt: '在这签名就行了吧？',
      successMsg: '"여기 사인하면 되죠?" — 하면 되다 = 做了就行，非常实用。',
      choices: [
        { ko: '여기 사인하면 되죠?', correct: true },
        { ko: '여기 사인해 주세요.', correct: false },
        { ko: '여기 사인하고 있어요.', correct: false },
        { ko: '여기 사인하고 싶어요.', correct: false },
      ],
    },
    {
      id: 'd21-o5',
      kind: 'match-pair',
      successMsg: '✓ 通过！钥匙到手，Tori有自己的家了。',
      pairs: [
        { ko: '계약', zh: '合同' },
        { ko: '기간', zh: '期间' },
        { ko: '입금', zh: '转账' },
        { ko: '열쇠', zh: '钥匙' },
        { ko: '당근', zh: '胡萝卜/当然' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '🏠 미션 3 클리어! 계약 완료, 열쇠 get! 토리, 이제 서울에 집이 있어요!',
    preview: '搬进新家后——해요体要升级了。Day 22 开始学"해요体动词变位"。',
    stickerId: 'sticker-d21',
    sceneImageUrl: '/images/diary/day-21-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「签合同时怎么确认金额？」「당근为什么有"当然"的意思？」',
};
