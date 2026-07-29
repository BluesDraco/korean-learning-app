import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 29 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：日记本前 · 用过去时回顾过去 28 天
 */
export const day29Scene: SceneSubQuestData = {
  day: 29, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '把 28 天写进第一页韩语日记',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd29-sc-s1',
      scenario: '你要开始写日记的第一句 · 今天天气不错但下过雨。最自然的一句？',
      choices: [
        { ko: '오늘은 비가 왔어요.', zh: '今天下雨了。', correct: true },
        { ko: '오늘은 비가 오아요.', zh: '(错误变位)', correct: false },
        { ko: '내일은 비가 왔어요.', zh: '(时间词矛盾)', correct: false },
        { ko: '오늘은 비 오다.', zh: '(书面终结·非日记体)', correct: false },
      ],
      explain: '오다 → 왔어요 · 日记开头讲天气最自然',
    },
    {
      type: 'situation',
      id: 'd29-sc-s2',
      scenario: '回顾 28 天前刚下飞机的紧张感 · 用过去时最自然的一句？',
      choices: [
        { ko: '28일 전 비행기에서 떨었어요.', zh: '28天前在飞机上紧张了。', correct: true },
        { ko: '28일 전 비행기에서 떨어요.', zh: '(现在时错时态)', correct: false },
        { ko: '28일 후 비행기에서 떨었어요.', zh: '(时间词矛盾)', correct: false },
        { ko: '28일 전 비행기에서 떨을 거예요.', zh: '(将来时错)', correct: false },
      ],
      explain: '「N일 전」+ 过去时 · 逻辑一致 · 떨다 → 떨었어요',
    },
    {
      type: 'situation',
      id: 'd29-sc-s3',
      scenario: '日记最后一句 · 想为自己 28 天的成长做个总结。最有分量的一句？',
      choices: [
        { ko: '저는 용기를 냈어요.', zh: '我鼓起了勇气。', correct: true },
        { ko: '저는 용기를 내요.', zh: '(现在时错)', correct: false },
        { ko: '저는 용기가 없어요.', zh: '(意思相反)', correct: false },
        { ko: '저는 용기를 낼게요.', zh: '(将来承诺 · 语境错)', correct: false },
      ],
      explain: '「내다 → 냈어요」= 已经鼓起（完成态）· 回顾必用',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd29-sc-d1',
      lines: [
        { speaker: '엄마 (전화)', ko: '오늘 뭐 했어?', zh: '今天做什么了？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '한국어 일기 썼어요.', zh: '写了韩语日记。', correct: true },
        { ko: '한국어 일기 써요.', zh: '(现在时错)', correct: false },
        { ko: '한국어 일기 쓸게요.', zh: '(将来承诺 · 妈问过去)', correct: false },
        { ko: '한국어 일기가 뭐예요?', zh: '(误解问题)', correct: false },
      ],
      explain: '妈用过去问 → 答用过去 · 쓰다 → 썼어요（ㅡ 脱落 + 었）',
    },
    {
      type: 'dialogue',
      id: 'd29-sc-d2',
      lines: [
        { speaker: '민지', ko: '어제 삼겹살 어땠어?', zh: '昨天五花肉怎么样？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '정말 즐거웠어요.', zh: '真的很开心。', correct: true },
        { ko: '정말 즐거워요.', zh: '(现在时错)', correct: false },
        { ko: '정말 즐거울 거예요.', zh: '(将来时错)', correct: false },
        { ko: '즐겁다.', zh: '(书面终结·非对话)', correct: false },
      ],
      explain: '어땠어?（过去问）→ 즐거웠어요（过去答）· ㅂ 不规则',
    },
    {
      type: 'dialogue',
      id: 'd29-sc-d3',
      lines: [
        { speaker: '준호', ko: '한 달 동안 뭐가 제일 좋았어?', zh: '这一个月最喜欢什么？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '너희들 만난 게 제일 좋았어.', zh: '认识你们最好。', correct: true },
        { ko: '너희들 만나요.', zh: '(现在时错)', correct: false },
        { ko: '만나서 반가워요.', zh: '(套话 · 语境错)', correct: false },
        { ko: '싫었어.', zh: '(意思相反)', correct: false },
      ],
      explain: '过去时问 → 过去时答 · 「만난 게 좋았어」= 认识（那事）好',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd29-sc-c1',
      ko: '어제 학교에 갔어요.',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '讲述已经发生的事（回忆昨日 / 汇报 / 日记）', correct: true },
        { zh: '安排明天的行程', correct: false },
        { zh: '正在去学校的路上', correct: false },
        { zh: '拒绝上学', correct: false },
      ],
      explain: '어제 + 갔어요 · 时间词 + 过去时 = 讲述过去',
    },
    {
      type: 'context',
      id: 'd29-sc-c2',
      ko: '정말 즐거웠어요.',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '刚经历完一件开心的事，回顾感想', correct: true },
        { zh: '在开心的事进行中', correct: false },
        { zh: '一件事还没开始', correct: false },
        { zh: '拒绝参加活动', correct: false },
      ],
      explain: '过去时 웠어요 = 已经开心过 · 回顾用',
    },
  ],
};
