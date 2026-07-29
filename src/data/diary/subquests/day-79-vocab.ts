import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 79 · 3-1 단어 마스터 · 제주도迷路·没信号·Day7重现 · 회고+대조 */
export const day79Vocab: VocabSubQuestData = {
  day: 19, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '돌담길·길 찾기·성장 8 个词',

  encounter: [
    { id: 'd79-v1-e1', korean: '돌담길',     hangul: 'dol-dam-gil',    zh: '石墙路',      pos: '名词',   example: { ko: '제주 돌담길이 예뻐요.',          zh: '济州石墙路很美。' },    tip: 'Day 79 场景 · 돌(石) + 담(墙) + 길(路) · 제주 상징',                    tier: 'core' },
    { id: 'd79-v1-e2', korean: '미로',       hangul: 'mi-ro',          zh: '迷宫',        pos: '名词',   example: { ko: '돌담길이 미로 같아요.',          zh: '石墙路像迷宫。' },      tip: '迷(미) + 路(로)',                                                      tier: 'core' },
    { id: 'd79-v1-e3', korean: '신호',       hangul: 'sin-ho',         zh: '信号',        pos: '名词',   example: { ko: '휴대폰 신호가 없어요.',          zh: '手机没信号。' },        tip: '信(신) + 号(호) · 신호가 없다 = 没信号',                              tier: 'core' },
    { id: 'd79-v1-e4', korean: '가리키다',   hangul: 'ga-ri-ki-da',    zh: '指（方向）',  pos: '动词',   example: { ko: '손으로 방향을 가리켰어요.',      zh: '用手指了方向。' },      tip: '가리키다 → 가리켰어요 · 与 가르치다(教) 别混',                          tier: 'core' },
    { id: 'd79-v1-e5', korean: '방향',       hangul: 'bang-hyang',     zh: '方向',        pos: '名词',   example: { ko: '방향을 잃었어요.',              zh: '迷失了方向。' },        tip: '方(방) + 向(향)',                                                      tier: 'core' },
    { id: 'd79-v1-e6', korean: '안심하다',   hangul: 'an-sim-ha-da',   zh: '安心 / 放心', pos: '动词',   example: { ko: '안심한 미소였어요.',            zh: '是安心的微笑。' },      tip: '安(안) + 心(심) + 하다 · 반대 = 걱정하다',                            tier: 'core' },
    { id: 'd79-v1-e7', korean: '헤매다',     hangul: 'he-mae-da',      zh: '徘徊 / 找不到路', pos: '动词', example: { ko: '한참 헤맸어요.',              zh: '徘徊了好一阵。' },      tip: '고유어 · Day 75 学过 · 길을 못 찾고 왔다 갔다',                        tier: 'ext' },
    { id: 'd79-v1-e8', korean: '조용히',     hangul: 'jo-yong-hi',     zh: '安静地',      pos: '副词',   example: { ko: '조용히 기뻤어요.',              zh: '安静地开心。' },        tip: '조용하다(安静) + 히 → 副词',                                          tier: 'ext' },
  ],

  recognize: [
    { id: 'd79-v1-r1', korean: '돌담길',     hangul: 'dol-dam-gil',    choices: [{ zh: '石墙路',      correct: true }, { zh: '海边路',  correct: false }, { zh: '大马路',  correct: false }, { zh: '山路',    correct: false }] },
    { id: 'd79-v1-r2', korean: '미로',       hangul: 'mi-ro',          choices: [{ zh: '迷宫',        correct: true }, { zh: '地图',    correct: false }, { zh: '隧道',    correct: false }, { zh: '桥',      correct: false }] },
    { id: 'd79-v1-r3', korean: '신호',       hangul: 'sin-ho',         choices: [{ zh: '信号',        correct: true }, { zh: '声音',    correct: false }, { zh: '号码',    correct: false }, { zh: '标志牌',  correct: false }] },
    { id: 'd79-v1-r4', korean: '가리키다',   hangul: 'ga-ri-ki-da',    choices: [{ zh: '指（方向）',  correct: true }, { zh: '教',      correct: false }, { zh: '看',      correct: false }, { zh: '拿',      correct: false }] },
    { id: 'd79-v1-r5', korean: '안심하다',   hangul: 'an-sim-ha-da',   choices: [{ zh: '安心 / 放心', correct: true }, { zh: '担心',    correct: false }, { zh: '生气',    correct: false }, { zh: '着急',    correct: false }] },
    { id: 'd79-v1-r6', korean: '헤매다',     hangul: 'he-mae-da',      choices: [{ zh: '徘徊 / 找不到路', correct: true }, { zh: '快走',correct: false }, { zh: '停下',    correct: false }, { zh: '奔跑',    correct: false }] },
  ],

  spell: [
    { id: 'd79-v1-s1', zhHint: '石墙路',  answer: ['돌', '담', '길'], syllables: ['돌', '담', '길', '돎', '단'] },
    { id: 'd79-v1-s2', zhHint: '信号',    answer: ['신', '호'], syllables: ['신', '호', '심', '고'] },
    { id: 'd79-v1-s3', zhHint: '方向',    answer: ['방', '향'], syllables: ['방', '향', '반', '앙'] },
    { id: 'd79-v1-s4', zhHint: '迷宫',    answer: ['미', '로'], syllables: ['미', '로', '머', '노'] },
  ],

  write: [
    { id: 'd79-v1-w1', korean: '돌', hangul: 'dol',      wordKorean: '돌담길',     wordZh: '石墙路' },
    { id: 'd79-v1-w2', korean: '담', hangul: 'dam',      wordKorean: '돌담길',     wordZh: '石墙路' },
    { id: 'd79-v1-w3', korean: '신', hangul: 'sin',      wordKorean: '신호',       wordZh: '信号' },
    { id: 'd79-v1-w4', korean: '호', hangul: 'ho',       wordKorean: '신호',       wordZh: '信号' },
    { id: 'd79-v1-w5', korean: '방', hangul: 'bang',     wordKorean: '방향',       wordZh: '方向' },
    { id: 'd79-v1-w6', korean: '미', hangul: 'mi',       wordKorean: '미로',       wordZh: '迷宫' },
    { id: 'd79-v1-w7', korean: '안', hangul: 'an',       wordKorean: '안심하다',   wordZh: '安心' },
    { id: 'd79-v1-w8', korean: '향', hangul: 'hyang',    wordKorean: '방향',       wordZh: '方向' },
  ],

  dictation: [
    { id: 'd79-v1-d1', korean: '휴대폰 신호가 없어요',          hangul: 'hyu-dae-pon sin-ho-ga eop-seo-yo',           syllables: ['휴', '대', '폰', '신', '호', '가', '없', '어', '요'], zh: '手机没信号' },
    { id: 'd79-v1-d2', korean: '손으로 방향을 가리켰어요',      hangul: 'so-neu-ro bang-hyang-eul ga-ri-kyeo-sseo-yo', syllables: ['손', '으', '로', '방', '향', '을', '가', '리', '켰', '어', '요'], zh: '用手指了方向' },
    { id: 'd79-v1-d3', korean: '이제 길 잃어도 안 울어요',      hangul: 'i-je gil i-reo-do an u-reo-yo',              syllables: ['이', '제', '길', '잃', '어', '도', '안', '울', '어', '요'], zh: '现在迷路也不哭了' },
  ],
};
