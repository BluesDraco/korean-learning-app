import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 28 · 1-2 귀 트이기 · 听力子关卡
 * 素材：Day 28 主流程「签售会 · 偶像面对面」+ 补充签售会语料
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化「지 못하다 无法」+ 세요 敬语命令 + 진심으로 方式助词
 */
export const day28Listen: ListenSubQuestData = {
  day: 28, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '30 秒内听清偶像的每一个字',

  meaning: [
    {
      id: 'd28-l2-m1',
      audioKo: '이름이 뭐예요?',
      choices: [
        { text: '你叫什么名字？', correct: true },
        { text: '这是什么？', correct: false },
        { text: '几点了？', correct: false },
        { text: '多少钱？', correct: false },
      ],
      explain: '이름(名字) + 이 + 뭐예요? · 签售会偶像最先问',
    },
    {
      id: 'd28-l2-m2',
      audioKo: '한국어 잘하시네요!',
      choices: [
        { text: '韩语说得好啊！', correct: true },
        { text: '不会说韩语。', correct: false },
        { text: '韩语学一下吧。', correct: false },
        { text: '教我韩语。', correct: false },
      ],
      explain: '잘하다 + 시(敬语) + 네요(感叹) · 偶像礼貌称赞',
    },
    {
      id: 'd28-l2-m3',
      audioKo: '평생 잊지 못할 거예요.',
      choices: [
        { text: '一辈子不会忘。', correct: true },
        { text: '一辈子都要忘掉。', correct: false },
        { text: '不用记住。', correct: false },
        { text: '记不住了。', correct: false },
      ],
      explain: '평생 + 잊지 못하다（无法忘）+ ㄹ 거예요（将来） · 感动最强表达',
    },
    {
      id: 'd28-l2-m4',
      audioKo: '토리 씨, 용기를 내요.',
      choices: [
        { text: 'Tori，鼓起勇气。', correct: true },
        { text: 'Tori，别害怕。', correct: false },
        { text: 'Tori，再见。', correct: false },
        { text: 'Tori，你好。', correct: false },
      ],
      explain: '용기를 내다 = 鼓起勇气。씨 是对成年人的礼貌称呼',
    },
    {
      id: 'd28-l2-m5',
      audioKo: '진심으로 응원해요.',
      choices: [
        { text: '真心支持你。', correct: true },
        { text: '真的很难过。', correct: false },
        { text: '开玩笑而已。', correct: false },
        { text: '不打算支持。', correct: false },
      ],
      explain: '진심 + 으로（方式助词·"以真心"）· 진심으로 응원해요 是粉丝对偶像标准表白',
    },
  ],

  cloze: [
    {
      id: 'd28-l2-c1',
      audioKo: '평생 잊지 못할 거예요.',
      clozeParts: ['평생 ', ' 거예요.'],
      choices: [
        { text: '잊지 못할', correct: true },
        { text: '잊지 않을', correct: false },
        { text: '잊어버릴', correct: false },
        { text: '잊고 있을', correct: false },
      ],
      explain: '「V지 못하다」= 无法 V（能力否定）· 안 잊을 是"打算不忘"（意志否定）',
    },
    {
      id: 'd28-l2-c2',
      audioKo: '건강하세요.',
      clozeParts: ['건강', '.'],
      choices: [
        { text: '하세요', correct: true },
        { text: '해요', correct: false },
        { text: '해', correct: false },
        { text: '하다', correct: false },
      ],
      explain: '하다 + 세요（敬语命令/祝福）· 分别时的祝福语',
    },
    {
      id: 'd28-l2-c3',
      audioKo: '진심으로 응원해요.',
      clozeParts: ['진심', ' 응원해요.'],
      choices: [
        { text: '으로', correct: true },
        { text: '로', correct: false },
        { text: '에', correct: false },
        { text: '가', correct: false },
      ],
      explain: '진심 末字"심"有收音 ㅁ → 으로（方式助词）',
    },
    {
      id: 'd28-l2-c4',
      audioKo: '아직 많이 부족해요.',
      clozeParts: ['아직 많이 ', '.'],
      choices: [
        { text: '부족해요', correct: true },
        { text: '부족합니다', correct: false },
        { text: '부족하아요', correct: false },
        { text: '부족어요', correct: false },
      ],
      explain: '부족하다 → 부족해요（하다 → 해요 规则3）',
    },
  ],

  reply: [
    {
      id: 'd28-l2-r1',
      audioKo: '이름이 뭐예요?',
      promptZh: '偶像问你叫什么名字，你想介绍自己 + 说明来自中国，最完整的一句？',
      choices: [
        { text: '토리예요. 중국에서 왔어요.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
        { text: '싫어요.', correct: false },
      ],
      explain: '30秒签售会 → 短句 + 出身。「N에서 왔어요」= 从 N 来',
    },
    {
      id: 'd28-l2-r2',
      audioKo: '한국어 잘하시네요!',
      promptZh: '偶像夸你韩语好，你想韩式谦虚回应 + 说明真心喜欢，最自然的一句？',
      choices: [
        { text: '아니요, 아직 많이 부족해요. 근데 진짜 좋아해요.', correct: true },
        { text: '네, 잘해요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '韩式谦虚：先 아니요 + 부족해요，再 근데（但是） + 真心 · 比"感谢"更得体',
    },
    {
      id: 'd28-l2-r3',
      audioKo: '토리 씨, 용기를 내요.',
      promptZh: '偶像在专辑上写下"鼓起勇气"送给你，你想真心感谢+承诺，最完整的一句？',
      choices: [
        { text: '진짜 감사합니다. 평생 잊지 못할 거예요.', correct: true },
        { text: '앨범 얼마예요?', correct: false },
        { text: '다음에 또 올게요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '합쇼체 감사합니다 + 평생 잊지 못할 거예요 · 签售会最强感谢',
    },
  ],
};
