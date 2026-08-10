import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 7 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 7 主流程地铁站+Haru对话
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化紧急求助三句，reply 强化반말回应
 */
export const day7Listen: ListenSubQuestData = {
  day: 7, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在雨夜地铁站，听清救命的每一句',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd07-l2-m1',
      audioKo: '도와주세요! 길을 잃었어요.',
      choices: [
        { text: '请帮帮我！我迷路了。', correct: true },
        { text: '谢谢！我到站了。', correct: false },
        { text: '对不起！我走错了。', correct: false },
        { text: '不用了，谢谢。', correct: false },
      ],
      explain: '도와주세요(请帮帮我) + 길(路) + 을(宾格) + 잃었어요(丢了)。「길을 잃었어요」= 我迷路了',
    },
    {
      id: 'd07-l2-m2',
      audioKo: '핸드폰 배터리가 1%예요.',
      choices: [
        { text: '手机没有网。', correct: false },
        { text: '手机电量只剩 1%。', correct: true },
        { text: '手机丢了。', correct: false },
        { text: '手机是新的。', correct: false },
      ],
      explain: '핸드폰(手机) + 배터리(电量·电池) + 가(主格) + 1%예요。퍼센트 前的数字用汉字数词读',
    },
    {
      id: 'd07-l2-m3',
      audioKo: '여기. 토리, 괜찮아?',
      choices: [
        { text: '在哪儿？兔莉，你没事吧？', correct: false },
        { text: '给你。兔莉，没事吧？', correct: true },
        { text: '这里是站台，兔莉。', correct: false },
        { text: '兔莉，请稍等。', correct: false },
      ],
      explain: '여기(给你，递东西时说) + 이름 + 괜찮아?（반말）= Haru 递胡萝卜时对同龄朋友的温柔话',
    },
    {
      id: 'd07-l2-m4',
      audioKo: '우연히. 같이 가자.',
      choices: [
        { text: '偶然路过。一起走吧。', correct: true },
        { text: '一直在等你。快走吧。', correct: false },
        { text: '真的不小心，对不起。', correct: false },
        { text: '不必道谢，慢走。', correct: false },
      ],
      explain: '우연히(偶然·副词) + 같이 가자（一起走吧·반말）。「가자」是「가다」的반말청유형',
    },
    {
      id: 'd07-l2-m5',
      audioKo: '잠깐만요, 저기요!',
      choices: [
        { text: '再见，请慢走！', correct: false },
        { text: '等一下，那位！', correct: true },
        { text: '对不起，请让开。', correct: false },
        { text: '给我一分钟。', correct: false },
      ],
      explain: '잠깐만요(等一下) + 저기요(叫陌生人"那位")。标准拦人组合，比"기다려!"（等着！）礼貌',
    },
  ],

  // ─── 听句填空：播完整句 → 挖一词，4 韩文选项 ───
  cloze: [
    {
      id: 'd07-l2-c1',
      audioKo: '도와주세요!',
      clozeParts: ['', '!'],
      choices: [
        { text: '도와주세요', correct: true },
        { text: '잠깐만요', correct: false },
        { text: '괜찮아요', correct: false },
        { text: '고마워요', correct: false },
      ],
      explain: '紧急求助第一句：도와주세요！留学生保命词',
    },
    {
      id: 'd07-l2-c2',
      audioKo: '길을 잃었어요.',
      clozeParts: ['', '을 잃었어요.'],
      choices: [
        { text: '역', correct: false },
        { text: '길', correct: true },
        { text: '집', correct: false },
        { text: '핸드폰', correct: false },
      ],
      explain: '길(路) + 을(宾格) + 잃다(丢) 过去式 잃었어요 = 迷路了。这是固定搭配',
    },
    {
      id: 'd07-l2-c3',
      audioKo: '핸드폰 배터리가 없어요.',
      clozeParts: ['핸드폰 배터리가 ', '.'],
      choices: [
        { text: '있어요', correct: false },
        { text: '없어요', correct: true },
        { text: '괜찮아요', correct: false },
        { text: '몰라요', correct: false },
      ],
      explain: '없다(没有) + 어요 = 없어요。「배터리가 없어요」= 没电了。反义词 있어요（有）',
    },
    {
      id: 'd07-l2-c4',
      audioKo: '같이 가요.',
      clozeParts: ['', '가요.'],
      choices: [
        { text: '혼자', correct: false },
        { text: '같이', correct: true },
        { text: '천천히', correct: false },
        { text: '빨리', correct: false },
      ],
      explain: '같이(一起) + 가요(去/走)。留学生保命三句之一 · 邀请同行',
    },
  ],

  // ─── 听对话选回应：播前一句 → 选正确韩文回应 ───
  reply: [
    {
      id: 'd07-l2-r1',
      audioKo: '토리, 괜찮아?',
      promptZh: 'Haru 用반말问"没事吧？"你确实吓到了，也想用반말回应她（朋友之间），应该？',
      choices: [
        { text: '아니요, 괜찮아요. 감사합니다.', correct: false },
        { text: '고마워. 나 좀 무서웠어.', correct: true },
        { text: '저는 학생이에요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: 'Haru 用반말，Tori 用반말对称回应：고마워（谢了·반말）+ 무서웠어（怕过·반말过去式）',
    },
    {
      id: 'd07-l2-r2',
      audioKo: '우산 있어요?',
      promptZh: '下雨了，陌生大叔看到你没伞好心问「우산 있어요?（有伞吗？）」，你没带，应该？',
      choices: [
        { text: '네, 있어요.', correct: false },
        { text: '아니요, 없어요.', correct: true },
        { text: '몰라요, 죄송해요.', correct: false },
        { text: '괜찮아요, 감사합니다.', correct: false },
      ],
      explain: '是非疑问 있어요? 对应：네, 있어요 / 아니요, 없어요。这是 Day 10 「있다/없다」语法的先修',
    },
    {
      id: 'd07-l2-r3',
      audioKo: '길을 잃었어요. 도와주세요.',
      promptZh: '有人对你说"迷路了，请帮帮我"。你想主动带路，应该？',
      choices: [
        { text: '아니요, 몰라요.', correct: false },
        { text: '네, 같이 가요.', correct: true },
        { text: '죄송해요, 만나서 반가워요.', correct: false },
        { text: '괜찮아요, 감사합니다.', correct: false },
      ],
      explain: '네 + 같이 가요（好，一起走吧）= 主动帮忙 + 同行邀请。留学生保命三句的一句用作救助别人',
    },
  ],
};
