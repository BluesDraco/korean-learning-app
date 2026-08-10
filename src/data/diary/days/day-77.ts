import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 77 · 여행 계획 발표 · 최고점
 *
 * 剧情：火鹤老师布置旅行计划发表。Tori设计"제주도3日游"路线——全部用韩语。
 * 火鹤老师给了最高分。这是她第一次在学术发表中拿到最高分。
 */
export const day77: ToriDay = {
  level: 'advanced',
  day: 17,
  phase: 'mastery',
  title: '旅行计划发表 · 最高分',
  subtitle: '"제주도 3일 여행" — 100점',
  heroImageUrl: '/images/diary/day-77-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 3일 · 화요일 오후',
    weather: '兽尔 · 초겨울 맑음',
    toriPose: 'proud',
    diaryText: `12月3日，周二下午。

한빛大学的口语发表课。作业："设计一次虚拟旅行计划，5 分钟展示。"

我的主题：济州岛三日游。把釜山旅行学到的都塞进去。

**第一天 · 自然**
- 上午：类似海云台的挟才海水浴场
- 下午：登城山日出峰
- 晚上：黑猪肉正餐

**第二天 · 文化**
- 上午：济州民俗村
- 下午：石墙路散步
- 晚上：活鲍鱼定食

**第三天 · 休息**
- 上午：咖啡巡礼（O'sulloc 茶博物馆）
- 下午：挟才看日落
- 晚上：机场

PPT 一页一页翻过去，我用韩语讲解每一部分。收尾时我说：

"이 계획의 특징은 자연-문화-휴식의 흐름을 3일에 담은 겁니다. 부산 여행에서 배운 것——속도보다 밀도가 중요하다는 것——을 실천한 설계입니다."
（这份计划的特点是把"自然—文化—休息"的节奏浓缩到三天里。这是把釜山旅行学到的一件事——"密度比速度更重要"——落到了实处。）

发表结束。火鹤老师的表情放柔了：

"토리 씨, 이번 발표 100점입니다."（兔莉同学，这次发表 100 分。）

——100 分。——我的第一个满分。

下课后 Danielle 走过来，说：

"오늘 발표, 정말 잘 짜여져 있었어. 나도 배웠어."
（今天的发表结构真的很好。我也学到了。）

——从 Danielle 嘴里听到这句话，比 100 分还更让人心跳。`,
  },

  words: [
    { id: 'd77-w1', korean: '계획', hangul: 'gye-hoek', zh: '计划', pos: '名词', example: { ko: '여행 계획을 세웠어요.', zh: '定了旅行计划。' }, tip: '计(계) + 划(획)' },
    { id: 'd77-w2', korean: '가상', hangul: 'ga-sang', zh: '虚拟/假想', pos: '名词', example: { ko: '가상 여행 계획이에요.', zh: '虚拟旅行计划。' }, tip: '假(가) + 想(상)' },
    { id: 'd77-w3', korean: '흐름', hangul: 'heu-reum', zh: '流程', pos: '名词', example: { ko: '자연-문화-휴식의 흐름이에요.', zh: '自然-文化-休息的流程。' }, tip: 'Day 64 复习. 설계 어휘' },
    { id: 'd77-w4', korean: '밀도', hangul: 'mil-do', zh: '密度', pos: '名词', example: { ko: '속도보다 밀도가 중요해요.', zh: '密度比速度重要。' }, tip: '密(밀) + 度(도)' },
    { id: 'd77-w5', korean: '실천하다', hangul: 'sil-cheon-ha-da', zh: '实践', pos: '动词', example: { ko: '배운 걸 실천했어요.', zh: '把学到的实践了。' }, tip: '实(실) + 践(천) + 하다' },
    { id: 'd77-w6', korean: '설계', hangul: 'seol-gye', zh: '设计', pos: '名词', example: { ko: '흐름의 설계예요.', zh: '流程的设计。' }, tip: '设(설) + 计(계)' },
  ],

  dialogue: {
    scene: '발표 수업·프레젠테이션',
    setting: { time: '周二 14:00', place: '한빛대 강의실', npc: '火鹤 선생님 / Danielle' },
    lines: [
      { speaker: 'tori', ko: '이 계획의 특징은 자연-문화-휴식의 흐름을 3일에 담은 겁니다.', hangul: 'i gye-hoe-gui teuk-jing-eun ja-yeon-mun-hwa-hyu-si-gui heu-reu-meul sam-i-re da-meun geom-ni-da', zh: '本计划特点是把自然-文化-休息流程装进3日。', practice: 'shadow' },
      { speaker: 'tori', ko: '속도보다 밀도가 중요합니다.', hangul: 'sok-do-bo-da mil-do-ga jung-yo-ham-ni-da', zh: '密度比速度重要。', practice: 'shadow' },
      { speaker: 'npc', npcName: '火鹤 선생님', ko: '토리 씨, 이번 발표 100점입니다.', hangul: 'to-ri-ssi, i-beon bal-pyo baek-jeom-im-ni-da', zh: '兔莉，本次发表100分。', practice: 'listen' },
      { speaker: 'npc', npcName: 'Danielle', ko: '오늘 발표, 정말 잘 짜여져 있었어. 나도 배웠어.', hangul: 'o-neul bal-pyo, jeong-mal jal jja-yeo-jyeo i-sseo-sseo. na-do bae-wo-sseo', zh: '今天发表结构真好。我也学到了。', practice: 'listen' },
      { speaker: 'tori', isInnerVoice: true, ko: '다니엘한테서 이 말 듣는 게, 100점보다 더 커.', hangul: 'da-ni-el-han-te-seo i mal deun-neun ge, baek-jeom-bo-da deo keo', zh: '从Danielle口中听到这话，比100分更大。', practice: 'listen' },
      { speaker: 'tori', ko: '?', hangul: '', zh: 'Danielle说自己也学到了. Tori想说以后一起交流. 合适的一句？', practice: 'pick',
        choices: [
          { ko: '고마워. 다음엔 다니엘 발표도 배우고 싶어.', zh: '谢谢。下次也想向Danielle学习。', correct: true },
          { ko: '내가 항상 이길 거야.', zh: '我会一直赢的。', correct: false },
          { ko: '별로 안 잘한 것 같아.', zh: '好像也不太好。', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '把A做成B：~을/를 ~에 담다',
    pattern: 'N₁ + **을/를** + N₂ + **에 담다**',
    whenToUse: '「把A装进/装在B」的凝练表达. Tori 说 「자연-문화-휴식의 흐름을 3일**에 담았습니다**」= 把自然-文化-休息流程装进3日. 설계/发表/작문 표현.',
    rules: [
      '**~을/를 + N + 에 담다**: 把A装进B',
      '**~에 담긴** (관형절): B里装的A. 3일에 담긴 흐름',
      '**추상 + 물리 결합 자연**: 감정을 노래에 담다 / 시간을 앨범에 담다',
    ],
    examples: [
      { ko: '흐름을 3일에 담았어요.', zh: '把流程装进3日。', highlight: '흐름을 ... 담았어요', note: 'Day 77 설계 발표 명제' },
      { ko: '이 여행에 많은 추억을 담았어요.', zh: '这次旅行装满了回忆。', highlight: '추억을 ... 담았어요', note: '추상 + 담다' },
      { ko: '엄마 마음을 편지에 담았어요.', zh: '把妈妈的心装进信里。', highlight: '마음을 ... 담았어요', note: 'Day 33·57 편지 재활용' },
      { ko: '3일에 담긴 흐름이에요.', zh: '装进3日的流程。', highlight: '3일에 담긴 흐름', note: '~에 담긴 (관형절)' },
    ],
    pitfall:
      '① ~을/를 (물건) + ~에 (용기) + 담다 (装). 조사 순서 헷갈리지 마. ② 추상 개념도 담다와 결합 가능 = 韩语 표현의 시적 성격. ③ 발표/작문 필수 표현.',
  },

  output: [
    { id: 'd77-o1', kind: 'compose', zhHint: '把流程装进3日。', tokens: ['흐름을', '3일에', '담았어요', '3일이', '흐름이', '담아 있어요'], composeAnswer: ['흐름을', '3일에', '담았어요'], successMsg: '~을 ~에 담다 = 装进. 설계의 언어.' },
    { id: 'd77-o2', kind: 'listen-choice', audioKo: '속도보다 밀도가 중요합니다.', successMsg: '✓ ~보다 (Day 45) + 밀도. 여행 명제.', choices: [{ zh: '密度比速度重要。', correct: true }, { zh: '速度比密度重要。', correct: false }, { zh: '两个都重要。', correct: false }, { zh: '密度不重要。', correct: false }] },
    { id: 'd77-o3', kind: 'zh-to-ko', zhPrompt: '把妈妈的心装进信里。', successMsg: '"엄마 마음을 편지에 담았어요."', choices: [{ ko: '엄마 마음을 편지에 담았어요.', correct: true }, { ko: '엄마 마음이 편지에 담았어요.', correct: false }, { ko: '엄마 마음을 편지가 담았어요.', correct: false }, { ko: '엄마 마음을 편지에 담았습니다 요.', correct: false }] },
    { id: 'd77-o4', kind: 'particle-error', zhHint: '把学到的实践了。', successMsg: '배운 걸 (배운 것을 축약) + 실천했어요.', choices: [{ ko: '배운 걸 실천했어요.', correct: true }, { ko: '배운 게 실천했어요.', correct: false }, { ko: '배우는 걸 실천했어요.', correct: false }, { ko: '배운 것에 실천했어요.', correct: false }] },
    { id: 'd77-o5', kind: 'match-pair', successMsg: '✓ Day 77 全对. 100점, 그리고 다니엘의 인정.', pairs: [{ ko: '계획', zh: '计划' }, { ko: '흐름', zh: '流程' }, { ko: '밀도', zh: '密度' }, { ko: '실천하다', zh: '实践' }, { ko: '설계', zh: '设计' }] },
  ],

  recap: {
    toriPose: 'proud',
    praise: '100점! 다니엘의 "나도 배웠어" — 두 개의 성취.',
    preview: '明天 진짜 제주도! 4명이 다시 출발.',
    stickerId: 'sticker-d77',
    sceneImageUrl: '/images/diary/day-77-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~을/를 ~에 담다 어떻게 응용?」「여행 발표 어떻게 잘?」',
};
