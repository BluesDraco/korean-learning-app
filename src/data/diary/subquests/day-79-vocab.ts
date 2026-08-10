import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 79 · 3-1 단어 마스터 · 제주도迷路·没信号·Day7重现 · 회고+대조 */
export const day79Vocab: VocabSubQuestData = {
  day: 19, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '돌담길·길 찾기·성장 8 个词', subtitleEn: '돌담길·길 찾기·성장 8 words',

  encounter: [
    { id: 'd79-v1-e1', korean: '돌담길',     hangul: 'dol-dam-gil',    zh: '石墙路', zhEn: 'stone wall road',      pos: '名词', posEn: 'Noun',   example: { ko: '제주 돌담길이 예뻐요.',          zh: '济州石墙路很美。', zhEn: 'Jeju\'s stone wall roads are beautiful.' },    tip: 'Day 79 场景 · 돌(石) + 담(墙) + 길(路) · 제주 상징', tipEn: 'Day 79 scene · 돌(stone) + 담(wall) + 길(path) · Jeju symbol',                    tier: 'core' },
    { id: 'd79-v1-e2', korean: '미로',       hangul: 'mi-ro',          zh: '迷宫', zhEn: 'maze',        pos: '名词', posEn: 'Noun',   example: { ko: '돌담길이 미로 같아요.',          zh: '石墙路像迷宫。', zhEn: 'The stone wall road is like a maze.' },      tip: '迷(미) + 路(로)', tipEn: '迷 (미) + 路 (로)',                                                      tier: 'core' },
    { id: 'd79-v1-e3', korean: '신호',       hangul: 'sin-ho',         zh: '信号', zhEn: 'signal',        pos: '名词', posEn: 'Noun',   example: { ko: '휴대폰 신호가 없어요.',          zh: '手机没信号。', zhEn: 'No signal on my phone.' },        tip: '信(신) + 号(호) · 신호가 없다 = 没信号', tipEn: '信(sin) + 号(ho) · no signal = no signal',                              tier: 'core' },
    { id: 'd79-v1-e4', korean: '가리키다',   hangul: 'ga-ri-ki-da',    zh: '指（方向）', zhEn: 'point (direction)',  pos: '动词', posEn: 'Verb',   example: { ko: '손으로 방향을 가리켰어요.',      zh: '用手指了方向。', zhEn: 'Pointed in a direction with a finger.' },      tip: '가리키다 → 가리켰어요 · 与 가르치다(教) 别混', tipEn: '가리키다 → 가리켰어요 · Don\'t confuse with 가르치다 (to teach)',                          tier: 'core' },
    { id: 'd79-v1-e5', korean: '방향',       hangul: 'bang-hyang',     zh: '方向', zhEn: 'direction',        pos: '名词', posEn: 'Noun',   example: { ko: '방향을 잃었어요.',              zh: '迷失了方向。', zhEn: 'Lost direction.' },        tip: '方(방) + 向(향)', tipEn: '方(bang) + 向(hyang)',                                                      tier: 'core' },
    { id: 'd79-v1-e6', korean: '안심하다',   hangul: 'an-sim-ha-da',   zh: '安心 / 放心', zhEn: 'Peace of mind / feel at ease', pos: '动词', posEn: 'Verb',   example: { ko: '안심한 미소였어요.',            zh: '是安心的微笑。', zhEn: 'It\'s a reassuring smile.' },      tip: '安(안) + 心(심) + 하다 · 반대 = 걱정하다', tipEn: '安(an) + 心(sim) + hada · opposite = 걱정하다',                            tier: 'core' },
    { id: 'd79-v1-e7', korean: '헤매다',     hangul: 'he-mae-da',      zh: '徘徊 / 找不到路', zhEn: 'Wander / can\'t find the way', pos: '动词', posEn: 'Verb', example: { ko: '한참 헤맸어요.',              zh: '徘徊了好一阵。', zhEn: 'Wandered around for a while.' },      tip: '고유어 · Day 75 学过 · 길을 못 찾고 왔다 갔다', tipEn: 'Native word · learned on Day 75 · went back and forth unable to find the way',                        tier: 'ext' },
    { id: 'd79-v1-e8', korean: '조용히',     hangul: 'jo-yong-hi',     zh: '安静地', zhEn: 'Quietly',      pos: '副词', posEn: 'Adverb',   example: { ko: '조용히 기뻤어요.',              zh: '安静地开心。', zhEn: 'Quietly happy.' },        tip: '조용하다(安静) + 히 → 副词', tipEn: '조용하다 (quiet) + hi → adverb',                                          tier: 'ext' },
  ],

  recognize: [
    { id: 'd79-v1-r1', korean: '돌담길',     hangul: 'dol-dam-gil',    choices: [{ zh: '石墙路', zhEn: 'stone wall road',      correct: true }, { zh: '海边路', zhEn: 'Seaside road',  correct: false }, { zh: '大马路', zhEn: 'Main road',  correct: false }, { zh: '山路', zhEn: 'Mountain path',    correct: false }] },
    { id: 'd79-v1-r2', korean: '미로',       hangul: 'mi-ro',          choices: [{ zh: '迷宫', zhEn: 'maze',        correct: true }, { zh: '地图', zhEn: 'map',    correct: false }, { zh: '隧道', zhEn: 'Tunnel',    correct: false }, { zh: '桥', zhEn: 'bridge',      correct: false }] },
    { id: 'd79-v1-r3', korean: '신호',       hangul: 'sin-ho',         choices: [{ zh: '信号', zhEn: 'signal',        correct: true }, { zh: '声音', zhEn: 'Voice',    correct: false }, { zh: '号码', zhEn: 'Number',    correct: false }, { zh: '标志牌', zhEn: 'Signpost',  correct: false }] },
    { id: 'd79-v1-r4', korean: '가리키다',   hangul: 'ga-ri-ki-da',    choices: [{ zh: '指（方向）', zhEn: 'point (direction)',  correct: true }, { zh: '教', zhEn: 'teach',      correct: false }, { zh: '看', zhEn: 'to see',      correct: false }, { zh: '拿', zhEn: 'To take',      correct: false }] },
    { id: 'd79-v1-r5', korean: '안심하다',   hangul: 'an-sim-ha-da',   choices: [{ zh: '安心 / 放心', zhEn: 'Peace of mind / feel at ease', correct: true }, { zh: '担心', zhEn: 'worry',    correct: false }, { zh: '生气', zhEn: 'Angry',    correct: false }, { zh: '着急', zhEn: 'to be in a hurry',    correct: false }] },
    { id: 'd79-v1-r6', korean: '헤매다',     hangul: 'he-mae-da',      choices: [{ zh: '徘徊 / 找不到路', zhEn: 'Wander / can\'t find the way', correct: true }, { zh: '快走', zhEn: 'Walk fast',correct: false }, { zh: '停下', zhEn: 'Stop',    correct: false }, { zh: '奔跑', zhEn: 'Run',    correct: false }] },
  ],

  spell: [
    { id: 'd79-v1-s1', zhHint: '石墙路', zhHintEn: 'stone wall road',  answer: ['돌', '담', '길'], syllables: ['돌', '담', '길', '돎', '단'] },
    { id: 'd79-v1-s2', zhHint: '信号', zhHintEn: 'signal',    answer: ['신', '호'], syllables: ['신', '호', '심', '고'] },
    { id: 'd79-v1-s3', zhHint: '方向', zhHintEn: 'direction',    answer: ['방', '향'], syllables: ['방', '향', '반', '앙'] },
    { id: 'd79-v1-s4', zhHint: '迷宫', zhHintEn: 'maze',    answer: ['미', '로'], syllables: ['미', '로', '머', '노'] },
  ],

  write: [
    { id: 'd79-v1-w1', korean: '돌', hangul: 'dol',      wordKorean: '돌담길',     wordZh: '石墙路', wordZhEn: 'stone wall road' },
    { id: 'd79-v1-w2', korean: '담', hangul: 'dam',      wordKorean: '돌담길',     wordZh: '石墙路', wordZhEn: 'stone wall road' },
    { id: 'd79-v1-w3', korean: '신', hangul: 'sin',      wordKorean: '신호',       wordZh: '信号', wordZhEn: 'signal' },
    { id: 'd79-v1-w4', korean: '호', hangul: 'ho',       wordKorean: '신호',       wordZh: '信号', wordZhEn: 'signal' },
    { id: 'd79-v1-w5', korean: '방', hangul: 'bang',     wordKorean: '방향',       wordZh: '方向', wordZhEn: 'direction' },
    { id: 'd79-v1-w6', korean: '미', hangul: 'mi',       wordKorean: '미로',       wordZh: '迷宫', wordZhEn: 'maze' },
    { id: 'd79-v1-w7', korean: '안', hangul: 'an',       wordKorean: '안심하다',   wordZh: '安心', wordZhEn: 'peace of mind' },
    { id: 'd79-v1-w8', korean: '향', hangul: 'hyang',    wordKorean: '방향',       wordZh: '方向', wordZhEn: 'direction' },
  ],

  dictation: [
    { id: 'd79-v1-d1', korean: '휴대폰 신호가 없어요',          hangul: 'hyu-dae-pon sin-ho-ga eop-seo-yo',           syllables: ['휴', '대', '폰', '신', '호', '가', '없', '어', '요'], zh: '手机没信号', zhEn: 'No signal on the phone' },
    { id: 'd79-v1-d2', korean: '손으로 방향을 가리켰어요',      hangul: 'so-neu-ro bang-hyang-eul ga-ri-kyeo-sseo-yo', syllables: ['손', '으', '로', '방', '향', '을', '가', '리', '켰', '어', '요'], zh: '用手指了方向', zhEn: 'Pointed with a finger' },
    { id: 'd79-v1-d3', korean: '이제 길 잃어도 안 울어요',      hangul: 'i-je gil i-reo-do an u-reo-yo',              syllables: ['이', '제', '길', '잃', '어', '도', '안', '울', '어', '요'], zh: '现在迷路也不哭了', zhEn: 'Now I don\'t cry even when lost' },
  ],
};
