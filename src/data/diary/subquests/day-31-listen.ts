import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 31 · 2-2 귀 트이기 · 听力子关卡
 * 素材：Day 31 主流程「中级班第一天 · Danielle 登场」+ 补充感叹语料
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：~네요 感叹用法 + 名词有无收音判定 + ㄹ 词干脱落
 */
export const day31Listen: ListenSubQuestData = {
  day: 1, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在中级班教室听清每一个感叹', subtitleEn: 'Catch every exclamation in the intermediate class',

  meaning: [
    {
      id: 'd31-l2-m1',
      audioKo: '와, 발음 진짜 유창하네요.',
      choices: [
        { text: '哇，发音真流利呢。', textEn: 'Wow, your pronunciation is really fluent.', correct: true },
        { text: '哇，发音真难呢。', textEn: 'Wow, pronunciation is really hard.', correct: false },
        { text: '哇，请说流利点。', textEn: 'Wow, please speak more fluently.', correct: false },
        { text: '哇，我发音不好。', textEn: 'Wow, my pronunciation is bad.', correct: false },
      ],
      explain: 'Junho 悄悄话原句 · 유창하다 + 네요 = 当下感叹「真流利呢」', explainEn: 'Junho\'s whisper original · 유창하다 + 네요 = on-the-spot exclamation \'So fluent\'',
    },
    {
      id: 'd31-l2-m2',
      audioKo: '오늘부터 여러분은 중급반이에요.',
      choices: [
        { text: '从今天起，各位是中级班。', textEn: 'From today, everyone is in the intermediate class.', correct: true },
        { text: '从今天起，各位是初级班。', textEn: 'From today, everyone is in the beginner class.', correct: false },
        { text: '各位，明天是中级班。', textEn: 'Everyone, tomorrow is the intermediate class.', correct: false },
        { text: '各位一起来中级班。', textEn: 'Everyone, let\'s go to the intermediate class together.', correct: false },
      ],
      explain: '火鹤老师宣布 · 중급반 + 이에요（有收音 ㄴ → 이에요）', explainEn: 'Teacher Flamingo announces · 중급반 + 이에요 (final consonant ㄴ → 이에요)',
    },
    {
      id: 'd31-l2-m3',
      audioKo: '실력이 대단하네요.',
      choices: [
        { text: '水平真了不起呢。', textEn: 'Your level is really impressive.', correct: true },
        { text: '水平不太好呢。', textEn: 'Not that good yet.', correct: false },
        { text: '实力还差得远。', textEn: 'Still far from good.', correct: false },
        { text: '实话说很难呢。', textEn: 'Honestly, it\'s hard.', correct: false },
      ],
      explain: '실력 = 水平 + 대단하네요 = 感叹「了不起呢」', explainEn: '실력 = skill + 대단하네요 = exclamation \'Impressive\'',
    },
    {
      id: 'd31-l2-m4',
      audioKo: '진짜 부러워요.',
      choices: [
        { text: '真的很羡慕。', textEn: 'I\'m really envious.', correct: true },
        { text: '真的很讨厌。', textEn: 'Really annoying.', correct: false },
        { text: '真的骄傲。', textEn: 'Really proud.', correct: false },
        { text: '真的委屈。', textEn: 'Really unfair.', correct: false },
      ],
      explain: '부럽다 ㅂ 不规则 → 부러워요。Tori 内心 OS 的标准表达', explainEn: '부럽다 ㅂ irregular → 부러워요. Tori\'s inner monologue standard expression',
    },
    {
      id: 'd31-l2-m5',
      audioKo: '안녕하세요, 다니엘이에요. 잘 부탁드립니다.',
      choices: [
        { text: '你好，我叫 Danielle。请多关照。', textEn: 'Hi, I\'m Danielle. Nice to meet you.', correct: true },
        { text: '你好，我是韩国人。谢谢。', textEn: 'Hello, I\'m Korean. Thanks.', correct: false },
        { text: '你好，Danielle 在哪？', textEn: 'Hi, where\'s Danielle?', correct: false },
        { text: '你好，认识 Danielle 吗？', textEn: 'Hi, do you know Danielle?', correct: false },
      ],
      explain: 'Danielle 自我介绍 · 다니엘 末字「엘」有收音 ㄹ → 이에요', explainEn: 'Danielle\'s self-introduction · The last character \'엘\' of 다니엘 has a final consonant ㄹ → 이에요',
    },
  ],

  cloze: [
    {
      id: 'd31-l2-c1',
      audioKo: '발음이 유창하네요.',
      clozeParts: ['발음이 유창하', '.'],
      choices: [
        { text: '네요', correct: true },
        { text: '어요', correct: false },
        { text: '요', correct: false },
        { text: '아요', correct: false },
      ],
      explain: 'V/A 词干 + 네요 = 当下感叹。유창하 + 네요', explainEn: 'V/A stem + 네요 = exclamation about the present. 유창하 + 네요',
    },
    {
      id: 'd31-l2-c2',
      audioKo: '벌써 중급반이네요.',
      clozeParts: ['벌써 중급반', '.'],
      choices: [
        { text: '이네요', correct: true },
        { text: '네요', correct: false },
        { text: '예네요', correct: false },
        { text: '이예요', correct: false },
      ],
      explain: '반 有收音 ㄴ → **이네요**（有收音 → 加 이）', explainEn: '반 has a final consonant ㄴ → **이네요** (with final consonant → add 이)',
    },
    {
      id: 'd31-l2-c3',
      audioKo: '다니엘씨는 서울에 사네요.',
      clozeParts: ['다니엘씨는 서울에 ', '.'],
      choices: [
        { text: '사네요', correct: true },
        { text: '살네요', correct: false },
        { text: '살아네요', correct: false },
        { text: '살으네요', correct: false },
      ],
      explain: '살다 ㄹ 词干 · ~네요 前 ㄹ 脱落 → **사네요**', explainEn: '살다 ㄹ stem · ㄹ drops before ~네요 → **사네요**',
    },
    {
      id: 'd31-l2-c4',
      audioKo: '진짜 부럽네요.',
      clozeParts: ['진짜 ', '.'],
      choices: [
        { text: '부럽네요', correct: true },
        { text: '부러워네요', correct: false },
        { text: '부러네요', correct: false },
        { text: '부러웁네요', correct: false },
      ],
      explain: '부럽다 + 네요 = **부럽네요**。~네요 前不发生 ㅂ 不规则，保持词干原样', explainEn: '부럽다 + 네요 = **부럽네요**. No ㅂ irregular before ~네요; keep the stem as is',
    },
  ],

  reply: [
    {
      id: 'd31-l2-r1',
      audioKo: '오늘부터 여러분은 중급반이에요.',
      promptZh: '火鹤老师宣布你们升入中级班，你作为学生礼貌应答，最自然的一句？', promptZhEn: 'Teacher Hwaha announces you\'ve moved up to the intermediate class. As a student, what\'s the most natural polite response?',
      choices: [
        { text: '네, 잘 부탁드립니다.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '싫어요.', correct: false },
        { text: '어제 왔어요.', correct: false },
      ],
      explain: '正式宣布 → 네 + 잘 부탁드립니다（합쇼체 关照）', explainEn: 'Formal announcement → 네 + 잘 부탁드립니다 (합쇼체 courtesy)',
    },
    {
      id: 'd31-l2-r2',
      audioKo: '안녕하세요, 다니엘이에요. 잘 부탁드립니다.',
      promptZh: '新同学 Danielle 向你自我介绍，你第一次见面礼貌回应，最标准的一句？', promptZhEn: 'New classmate Danielle introduces herself to you. What\'s the most standard polite response for a first meeting?',
      choices: [
        { text: '안녕하세요, 저는 토리예요. 만나서 반가워요.', correct: true },
        { text: '야, 나 토리야.', correct: false },
        { text: '한국 사람이에요?', correct: false },
        { text: '얼마예요?', correct: false },
      ],
      explain: '第一次见面 → 自我介绍 + 만나서 반가워요（해요体礼貌回应）', explainEn: 'First meeting → self-introduction + 만나서 반가워요 (polite 해요 style)',
    },
    {
      id: 'd31-l2-r3',
      audioKo: '와, 발음 진짜 유창하네요.',
      promptZh: 'Junho 悄悄夸 Danielle 发音流利，你想附和"是啊，真了不起呢"，最自然的一句？', promptZhEn: 'Junho quietly praises Danielle\'s fluent pronunciation. You want to agree, "Yeah, that\'s amazing." What\'s the most natural response?',
      choices: [
        { text: '맞아요, 진짜 대단하네요.', correct: true },
        { text: '아니요, 별로예요.', correct: false },
        { text: '몰라요, 안 들려요.', correct: false },
        { text: '싫어요, 조용히 해요.', correct: false },
      ],
      explain: '附和感叹 → 맞아요（对啊）+ 대단하네요（真了不起）', explainEn: 'Agreeing exclamation → 맞아요 (right) + 대단하네요 (amazing)',
    },
  ],
};
