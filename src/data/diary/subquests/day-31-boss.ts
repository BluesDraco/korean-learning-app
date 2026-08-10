import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 31 · 2-5 Boss 战 · 🎯 중급반 첫날 검증
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：~네요 感叹 + 名词 (이)네요 + ㄹ 词干脱落 + 중급반 场景
 */
export const day31Boss: BossSubQuestData = {
  day: 1, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '첫 관문',
  subtitle: '🎯 중급반 첫날 · 面对新同学',
  intro: '中级班教室的秋光斜斜洒进来。Minji 的位置空了，Junho 和 Haru 还在。教室最后一排，一只白毛狐狸站起来，行礼、开口——韩语干净得像播音员。你手心悄悄冒了点汗。今天的每一句话，都要好好说出口。',
  outroHook: '下课铃响起，Danielle 主动朝你走来："토리씨, 우리 같이 밥 먹을래요?" —— 她笑起来眼睛弯弯的。原来发音好的人，也可以是想认识你的人。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd31-b5-t1',
        audioKo: '와, 발음 진짜 유창하네요.',
        choices: [
          { text: '哇，发音真流利呢。', correct: true },
          { text: '哇，发音真难呢。', correct: false },
          { text: '哇，请说流利点。', correct: false },
          { text: '哇，我发音不好。', correct: false },
        ],
        explain: 'Junho 悄悄话原句 · V/A 词干 + 네요 = 当下感叹',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd31-b5-t2',
        audioKo: '오늘부터 여러분은 중급반이에요.',
        choices: [
          { text: '从今天起，各位是中级班。', correct: true },
          { text: '从今天起，各位是初级班。', correct: false },
          { text: '各位，明天是中级班。', correct: false },
          { text: '各位一起来中级班。', correct: false },
        ],
        explain: '火鹤老师宣布升级 · 중급반 有收音 → 이에요',
      },
    },
    {
      type: 'choice',
      label: '形态改错',
      task: {
        id: 'd31-b5-t3',
        promptZh: '"(她) 是学生啊！"哪句正确？',
        choices: [
          { text: '학생네요!', correct: false },
          { text: '학생이네요!', correct: true },
          { text: '학생예네요!', correct: false },
          { text: '학생이예요네!', correct: false },
        ],
        explain: '학생 有收音 ㅇ → 名词 + **이네요**',
      },
    },
    {
      type: 'choice',
      label: 'ㄹ 词干变化',
      task: {
        id: 'd31-b5-t4',
        promptZh: '"Danielle 原来住在首尔啊。"哪句正确？',
        choices: [
          { text: '다니엘씨는 서울에 살네요.', correct: false },
          { text: '다니엘씨는 서울에 사네요.', correct: true },
          { text: '다니엘씨는 서울에 살아네요.', correct: false },
          { text: '다니엘씨는 서울에 살으네요.', correct: false },
        ],
        explain: '살다 ㄹ 词干 · ~네 前 ㄹ 脱落 → **사네요**',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd31-b5-t5',
        promptKo: '유창하다',
        promptHangul: 'yu-chang-ha-da',
        choices: [
          { text: '流利', correct: true },
          { text: '认真', correct: false },
          { text: '难', correct: false },
          { text: '流畅（河水）', correct: false },
        ],
        explain: '夸别人语言好最标准的一个词。感叹用 유창하네요',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd31-b5-t6',
        zhHint: '实力真了不起呢！',
        audioKo: '실력이 정말 대단하네요!',
        answer: ['실력이', '정말', '대단하네요!'],
        tokens: ['실력이', '정말', '대단하네요!', '대단해네요!', '대단해요.', '대단합니다.'],
        explain: '~네요 直接接词干 · 실력 + 이（有收音 ㄱ）· 대단하 + 네요',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd31-b5-t7',
        zhHint: '你好，我是兔莉。很高兴认识你。',
        audioKo: '안녕하세요, 저는 토리예요. 만나서 반가워요.',
        answer: ['안녕하세요,', '저는', '토리예요.', '만나서', '반가워요.'],
        tokens: ['안녕하세요,', '저는', '토리예요.', '만나서', '반가워요.', '토리이에요.', '토리야.', '반가워.'],
        explain: '第一次见面标准句 · 토리 无收音 → 예요 · 해요体礼貌介绍',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd31-b5-t8',
        promptZh: 'Junho 悄悄说 "와, 발음 진짜 유창하네요"。你想附和又不失礼，最合适的一句？',
        choices: [
          { text: '그러게요. 진짜 부럽네요.', correct: true },
          { text: '아니요, 별로예요.', correct: false },
          { text: '싫어요.', correct: false },
          { text: '얼마예요?', correct: false },
        ],
        explain: '附和悄悄话 · 그러게요（就是嘛）+ 부럽네요（现场感受）',
      },
    },
  ],
};
