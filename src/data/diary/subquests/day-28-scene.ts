import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 28 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：签售会 30 秒 · 5 步实战（자기소개→칭찬응답→진심고백→응원→감사）
 */
export const day28Scene: SceneSubQuestData = {
  day: 28, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在偶像面前的 30 秒里，说完想说的话', subtitleEn: 'In the 30 seconds before your idol, say everything you want to say',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd28-sc-s1',
      scenario: '轮到你了，偶像抬头问「이름이 뭐예요?」。你想介绍自己+来自中国，最完整的一句？', scenarioEn: 'It\'s your turn. Your idol looks up and asks 「이름이 뭐예요?」. You want to introduce yourself + say you\'re from China. What\'s the most complete sentence?',
      choices: [
        { ko: '토리예요. 중국에서 왔어요.', zh: '我叫Tori。从中国来的。', zhEn: 'I\'m Tori. I came from China.', correct: true },
        { ko: '중국에 왔어요. 토리예요.', zh: '(顺序颠倒且 에 错)', zhEn: '(word order reversed and 에 is wrong)', correct: false },
        { ko: '토리이에요. 중국에 왔어요.', zh: '(예요→이에요 错 + 에 错)', zhEn: '(예요→이에요 wrong + 에 wrong)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '30秒必须精简：名字 + 출신。「N에서 왔어요」是"从 N 来"标准句', explainEn: '30 seconds means being concise: name + origin. 「N에서 왔어요」 is the standard "came from N" pattern',
    },
    {
      type: 'situation',
      id: 'd28-sc-s2',
      scenario: '偶像夸你「한국어 잘하시네요!」，你想韩式谦虚+说真心话，最自然的一句？', scenarioEn: 'Your idol says 「한국어 잘하시네요!」. You want to respond with Korean-style humility + sincerity. What\'s the most natural sentence?',
      choices: [
        { ko: '아니요, 아직 많이 부족해요. 근데 진짜 좋아해요.', zh: '不，还差很多。但是真的好喜欢。', zhEn: 'No, I still have a long way to go. But I really love it.', correct: true },
        { ko: '네, 잘해요.', zh: '是的，很棒。', zhEn: 'Yes, I\'m great.', correct: false },
        { ko: '아니요, 못해요.', zh: '不会。（过度否定）', zhEn: 'No way. (overly self-deprecating)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '被夸 → 아니요 + 부족해요 + 근데 + 真心。韩式谦虚不是自我贬低', explainEn: 'When praised → 아니요 + 부족해요 + 근데 + sincerity. Korean-style humility isn\'t self-deprecation',
    },
    {
      type: 'situation',
      id: 'd28-sc-s3',
      scenario: '偶像在专辑上写下"토리 씨, 용기를 내요."递给你。你想真心感谢+承诺一辈子不忘，最完整的一句？', scenarioEn: 'Your idol writes "토리 씨, 용기를 내요." on your album and hands it to you. You want to sincerely thank + promise to never forget. What\'s the most complete sentence?',
      choices: [
        { ko: '진짜 감사합니다. 평생 잊지 못할 거예요.', zh: '真的感谢。一辈子不会忘。', zhEn: 'Thank you so much. I\'ll never forget this for the rest of my life.', correct: true },
        { ko: '앨범 얼마예요?', zh: '专辑多少钱？', zhEn: 'How much is the album?', correct: false },
        { ko: '다음에 또 올게요.', zh: '下次再来。', zhEn: 'I\'ll come again next time.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '합쇼체 感사합니다（升级礼貌）+ 평생 잊지 못할 거예요（"无法忘"用 못）',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd28-sc-d1',
      lines: [
        { speaker: '아이돌', ko: '이름이 뭐예요?', zh: '你叫什么名字？', zhEn: 'What\'s your name?' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '토리예요. 중국에서 왔어요.', zh: '我叫Tori。从中国来的。', zhEn: 'I\'m Tori. I came from China.', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        { ko: '한국어 좋아해요.', zh: '我喜欢韩语。', zhEn: 'I like Korean.', correct: false },
      ],
      explain: '第一轮自我介绍最精简：名字 + 出身', explainEn: 'First-round self-intro, most concise: name + origin',
    },
    {
      type: 'dialogue',
      id: 'd28-sc-d2',
      lines: [
        { speaker: '아이돌', ko: '한국어 잘하시네요!', zh: '韩语说得好啊！', zhEn: 'You speak Korean well!' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '아니요, 아직 많이 부족해요. 근데 진짜 좋아해요.', zh: '不，还差很多。但真的好喜欢。', zhEn: 'No, I still have a lot to learn. But I really love it.', correct: true },
        { ko: '네, 잘해요.', zh: '是的，很棒。', zhEn: 'Yes, I\'m great.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '韩式谦虚回应 · 直接说"是"太自信；「부족해요」+ 근데 + 真心是黄金配方', explainEn: 'Korean-style humble response · saying "yes" directly is too confident; 「부족해요」 + 근데 + sincerity is the golden formula',
    },
    {
      type: 'dialogue',
      id: 'd28-sc-d3',
      lines: [
        { speaker: '아이돌', ko: '토리 씨, 용기를 내요.', zh: 'Tori，鼓起勇气。', zhEn: 'Tori, be brave.' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '진짜 감사합니다. 평생 잊지 못할 거예요.', zh: '真的感谢。一辈子不会忘。', zhEn: 'Thank you so much. I\'ll never forget this for the rest of my life.', correct: true },
        { ko: '앨범 얼마예요?', zh: '专辑多少钱？', zhEn: 'How much is the album?', correct: false },
        { ko: '싫어요.', zh: '不要。', zhEn: 'No.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
      ],
      explain: '收到偶像亲手写的话 → 최高级感谢 + 承诺记一辈子', explainEn: 'Receiving words written by your idol\'s own hand → highest-level thanks + promise to remember forever',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd28-sc-c1',
      ko: '아직 많이 부족해요.',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '被夸奖时的韩式谦虚回应（能力/水平）', zhEn: 'Korean-style humble response when praised (ability/skill)', correct: true },
        { zh: '被问价格时', zhEn: 'When asked about the price', correct: false },
        { zh: '拒绝对方邀请', zhEn: 'Declining an invitation', correct: false },
        { zh: '第一次见面打招呼', zhEn: 'Greeting someone for the first time', correct: false },
      ],
      explain: '「부족하다」= 不足/不够。不是"坏"，是"谦虚"。中韩文化都吃这套', explainEn: '\'부족하다\' = insufficient/not enough. It\'s not \'bad,\' it\'s \'modest.\' Both Chinese and Korean cultures appreciate this.',
    },
    {
      type: 'context',
      id: 'd28-sc-c2',
      ko: '건강하세요.',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '分别时对长辈/尊敬的人的祝福', zhEn: 'A blessing for elders or respected people when parting', correct: true },
        { zh: '生病时对医生说', zhEn: 'When sick, telling the doctor', correct: false },
        { zh: '拒绝食物时', zhEn: 'When declining food', correct: false },
        { zh: '第一次见面时', zhEn: 'When meeting someone for the first time', correct: false },
      ],
      explain: 'V + 세요（尊敬命令/祝福）· 相当于中文"多保重"', explainEn: 'V + 세요 (respectful command/blessing) · equivalent to \'take care\' in Chinese',
    },
  ],
};
