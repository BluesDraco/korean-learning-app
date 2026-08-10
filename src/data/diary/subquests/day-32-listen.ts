import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 32 · 2-2 귀 트이기 · 因果 ~아/어서 + 名词 (이)라서 */
export const day32Listen: ListenSubQuestData = {
  day: 2, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在宿舍走廊听清每一句安慰',

  meaning: [
    {
      id: 'd32-l2-m1',
      audioKo: '연휴라서 혼자 있으면 안 돼요.',
      choices: [
        { text: '因为是连休，一个人可不行。', correct: true },
        { text: '连休可以一个人过。', correct: false },
        { text: '一个人不能放假。', correct: false },
        { text: '一起放假不行。', correct: false },
      ],
      explain: 'Haru 递松片糕原句 · 연휴 无收音 → 라서（名词句因果）',
    },
    {
      id: 'd32-l2-m2',
      audioKo: '엄마가 만든 송편이에요.',
      choices: [
        { text: '这是妈妈做的松片糕。', correct: true },
        { text: '妈妈买了松片糕。', correct: false },
        { text: '我给妈妈做松片糕。', correct: false },
        { text: '妈妈教我做松片糕。', correct: false },
      ],
      explain: '만든 = 만들다 관형형（过去/形容化）· 이에요 = 是',
    },
    {
      id: 'd32-l2-m3',
      audioKo: '고향이 너무 보고 싶어서 울었어요.',
      choices: [
        { text: '因为太想家所以哭了。', correct: true },
        { text: '看到家乡就哭了。', correct: false },
        { text: '不想家所以没哭。', correct: false },
        { text: '哭着回家乡了。', correct: false },
      ],
      explain: '보고 싶다 → 보고 싶어서（原因）+ 过去时 울었어요',
    },
    {
      id: 'd32-l2-m4',
      audioKo: '송편이 맛있어서 세 개나 먹었어요.',
      choices: [
        { text: '因为松片糕好吃所以吃了三个。', correct: true },
        { text: '松片糕不好吃只吃了三个。', correct: false },
        { text: '吃了三个松片糕后觉得好吃。', correct: false },
        { text: '把三个松片糕做得很好吃。', correct: false },
      ],
      explain: '맛있다 → 맛있어서。前因(好吃) → 后果(吃了三个)',
    },
    {
      id: 'd32-l2-m5',
      audioKo: '괜찮아요. 나도 처음에 그랬어요.',
      choices: [
        { text: '没事。我刚开始也这样。', correct: true },
        { text: '不好意思。我第一次这样。', correct: false },
        { text: '还行。我也刚做过。', correct: false },
        { text: '好啊。我先来。', correct: false },
      ],
      explain: 'Haru 安慰的原句 · 그랬어요 = 也是那样过',
    },
  ],

  cloze: [
    {
      id: 'd32-l2-c1',
      audioKo: '연휴라서 혼자예요.',
      clozeParts: ['연휴', ' 혼자예요.'],
      choices: [
        { text: '라서', correct: true },
        { text: '어서', correct: false },
        { text: '이라서', correct: false },
        { text: '으로', correct: false },
      ],
      explain: '연휴 无收音 → **라서**（名词句因果）· 有收音才用 이라서',
    },
    {
      id: 'd32-l2-c2',
      audioKo: '엄마가 보고 싶어서 울었어요.',
      clozeParts: ['엄마가 보고 ', ' 울었어요.'],
      choices: [
        { text: '싶어서', correct: true },
        { text: '싶어', correct: false },
        { text: '싶으니까', correct: false },
        { text: '싶고', correct: false },
      ],
      explain: '싶다 → 싶어서。~아/어서 表情感因果，前面不接过去时',
    },
    {
      id: 'd32-l2-c3',
      audioKo: '늦어서 죄송해요.',
      clozeParts: ['늦', ' 죄송해요.'],
      choices: [
        { text: '어서', correct: true },
        { text: '아서', correct: false },
        { text: '으니까', correct: false },
        { text: '고', correct: false },
      ],
      explain: '늦다 元音 ㅡ → **어서**。道歉固定句「늦어서 죄송해요」',
    },
    {
      id: 'd32-l2-c4',
      audioKo: '학생이라서 돈이 없어요.',
      clozeParts: ['학생', ' 돈이 없어요.'],
      choices: [
        { text: '이라서', correct: true },
        { text: '라서', correct: false },
        { text: '아서', correct: false },
        { text: '어서', correct: false },
      ],
      explain: '학생 有收音 ㅇ → **이라서**（名词句 + 이 + 라서）',
    },
  ],

  reply: [
    {
      id: 'd32-l2-r1',
      audioKo: '토리, 연휴라서 혼자 있으면 안 돼요.',
      promptZh: 'Haru 递来松片糕说"放假嘛，一个人不行"。你想道谢并解释自己想家，最自然的一句？',
      choices: [
        { text: '고마워요. 고향이 너무 보고 싶어서요.', correct: true },
        { text: '아니요, 필요 없어요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '싫어요.', correct: false },
      ],
      explain: '고마워요 + 보고 싶어서요（省略后半句，用因果表达情感）',
    },
    {
      id: 'd32-l2-r2',
      audioKo: '많이 힘들었죠?',
      promptZh: 'Haru 关切地问 "很难过吧？"。你想诚实回应又不失礼，最自然的一句？',
      choices: [
        { text: '네, 조금요. 엄마가 보고 싶어요.', correct: true },
        { text: '아니요, 괜찮아요. 얼마예요?', correct: false },
        { text: '몰라요, 그만해요.', correct: false },
        { text: '싫어요, 저리 가세요.', correct: false },
      ],
      explain: '네 + 조금요（诚实但克制）+ 보고 싶어요（说出真心话）',
    },
    {
      id: 'd32-l2-r3',
      audioKo: '엄마가 만든 송편이에요. 같이 먹어요.',
      promptZh: 'Haru 主动分享妈妈做的松片糕，你想接过来并表达感谢，最自然的一句？',
      choices: [
        { text: '와, 감사합니다. 잘 먹을게요.', correct: true },
        { text: '아니요, 저는 안 먹어요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '싫어요, 배 안 고파요.', correct: false },
      ],
      explain: '와 + 감사합니다 + 잘 먹을게요（收下食物的标准礼貌回应）',
    },
  ],
};
