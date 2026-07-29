import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 7 · 1-5 Boss 战 · Chapter 1 收官综合大考
 * 8 题混合：听句选意×2 + 助词改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 8：Haru 送 Tori 回宿舍，深夜想家 + ~고 싶어요
 */
export const day7Boss: BossSubQuestData = {
  day: 7, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: 'Chapter 1 收官 · 独立完成一次紧急求助',
  intro: '手机电量 1%，末班车灯牌闪红。这一次，勇气不在胡萝卜里——胡萝卜刚滚出车厢门。你要靠一整周学的所有话，救回自己。',
  outroHook: '通过！Haru 把你送到宿舍 301 门口，说了声「잘 자」（晚安），就回 302 了。走廊很安静。回到房间，桌上只有一包泡面。下一关的挑战，是你和一个空房间。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd07-b5-t1',
        audioKo: '도와주세요! 길을 잃었어요.',
        choices: [
          { text: '谢谢！我到站了。', correct: false },
          { text: '请帮帮我！我迷路了。', correct: true },
          { text: '对不起！我走错了。', correct: false },
          { text: '不用了，谢谢。', correct: false },
        ],
        explain: '도와주세요（Day 7 保命句）+ 길을 잃었어요（迷路了·固定搭配 宾格 을）',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd07-b5-t2',
        audioKo: '토리, 괜찮아?',
        choices: [
          { text: '兔莉，你在哪？', correct: false },
          { text: '兔莉，没事吧？（반말）', correct: true },
          { text: '兔莉，快过来。', correct: false },
          { text: '兔莉，请等等。', correct: false },
        ],
        explain: 'Haru 对朋友用반말：괜찮아?（去掉해요体 요 尾）。朋友间用반말显亲近',
      },
    },
    {
      type: 'choice',
      label: '助词改错',
      task: {
        id: 'd07-b5-t3',
        promptZh: '"没有手机"哪句正确？',
        choices: [
          { text: '핸드폰가 없어요.', correct: false },
          { text: '핸드폰를 없어요.', correct: false },
          { text: '핸드폰이 없어요.', correct: true },
          { text: '핸드폰은 없어요.', correct: false },
        ],
        explain: '있다/없다 前用主格 이/가。핸드폰 有收音 ㄴ → 이。「없어요」是存在词不用宾格',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd07-b5-t4',
        promptKo: '고마워',
        promptHangul: 'go-ma-wo',
        choices: [
          { text: '谢了（对朋友）', correct: true },
          { text: '对不起（对朋友）', correct: false },
          { text: '没事（对朋友）', correct: false },
          { text: '再见（对朋友）', correct: false },
        ],
        explain: '道谢阶梯：감사합니다（합쇼체·最正式）> 고마워요（해요体·日常）> 고마워（반말·朋友间）',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd07-b5-t5',
        zhHint: '请帮帮我！我迷路了。',
        audioKo: '도와주세요! 길을 잃었어요.',
        answer: ['도와주세요!', '길을', '잃었어요.'],
        tokens: ['도와주세요!', '길을', '잃었어요.', '길이', '길은', '도와요.'],
        explain: '「길을 잃다」= 迷路（固定搭配，宾格 을）',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd07-b5-t6',
        zhHint: '谢了，Haru。（对朋友）',
        audioKo: '고마워, 하루야.',
        answer: ['고마워,', '하루야.'],
        tokens: ['고마워,', '하루야.', '감사합니다.', '하루예요.', '고마워요,', '하루입니다.'],
        explain: '반말 组合：고마워 + 名字+야（无收音）/아（有收音）。「하루야」= "Haru 啊"（呼语·亲近）',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应',
      task: {
        id: 'd07-b5-t7',
        audioKo: '토리, 괜찮아?',
        promptZh: 'Haru 用반말关心你，你想用반말回她说"谢了，我有点害怕"，应该？',
        choices: [
          { text: '아니요, 괜찮아요. 감사합니다.', correct: false },
          { text: '고마워. 나 좀 무서웠어.', correct: true },
          { text: '저는 학생이에요.', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: 'Haru 반말 → Tori 也用반말对称回응：고마워 + 나 좀 무서웠어。用해요体反而生分',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd07-b5-t8',
        promptZh: '陌生阿姨问你有没有伞（우산 있어요?），你没带，应该？',
        choices: [
          { text: '네, 있어요.', correct: false },
          { text: '아니요, 없어요.', correct: true },
          { text: '몰라요, 죄송해요.', correct: false },
          { text: '괜찮아요, 감사합니다.', correct: false },
        ],
        explain: '是非疑问 있어요? 对应：네, 있어요 / 아니요, 없어요。Day 10 있다/없다 语法的先修',
      },
    },
  ],
};
