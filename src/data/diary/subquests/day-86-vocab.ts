import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 86 · 3-1 단어 마스터 · 重走Day 1-7的路 · ~은/는 그대로, ~만 달라졌다 */
export const day86Vocab: VocabSubQuestData = {
  day: 26, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '노선·승강장 8 个词', subtitleEn: '8 words: Line & Platform',

  encounter: [
    { id: 'd86-v1-e1', korean: '노선',       hangul: 'no-seon',        zh: '路线', zhEn: 'Route',        pos: '名词', posEn: 'Noun',   example: { ko: '4호선 노선을 다시 탔어요.',      zh: '又坐了4号线。', zhEn: 'Took Line 4 again.' },      tip: 'Day 86 主题词 · 路(노) + 线(선)', tipEn: 'Day 86 Theme Words · Road (노) + Line (선)',                                    tier: 'core' },
    { id: 'd86-v1-e2', korean: '승강장',     hangul: 'seung-gang-jang', zh: '站台', zhEn: 'Platform',       pos: '名词', posEn: 'Noun',   example: { ko: '승강장에서 사람을 봤어요.',      zh: '在站台上看到人。', zhEn: 'Saw people on the platform.' },    tip: '乘(승) + 降(강) + 场(장) · 地铁月台', tipEn: 'Ride (승) + Descend (강) + Place (장) · Subway platform',                                tier: 'core' },
    { id: 'd86-v1-e3', korean: '억양',       hangul: 'eok-yang',       zh: '口音 / 腔调', zhEn: 'Accent / Tone', pos: '名词', posEn: 'Noun',   example: { ko: '러시아 억양이 있었어요.',        zh: '有俄罗斯口音。', zhEn: 'Has a Russian accent.' },      tip: '抑(억) + 扬(양) · 说话的腔调', tipEn: 'Suppress (억) + Raise (양) · Way of speaking',                                        tier: 'core' },
    { id: 'd86-v1-e4', korean: '여벌',       hangul: 'yeo-beol',       zh: '备用 / 多余的', zhEn: 'Spare / Extra', pos: '名词', posEn: 'Noun', example: { ko: '여벌 열쇠를 받았어요.',          zh: '拿到备用钥匙。', zhEn: 'Got the spare key.' },      tip: '固有语 · 여벌 열쇠 = 备用钥匙', tipEn: 'Native word · 여벌 열쇠 = Spare key',                                      tier: 'core' },
    { id: 'd86-v1-e5', korean: '그대로',     hangul: 'geu-dae-ro',     zh: '照旧 / 原样', zhEn: 'as before / unchanged', pos: '副词', posEn: 'Adverb',   example: { ko: '길은 그대로였어요.',            zh: '路照旧。', zhEn: 'The road is the same as always.' },            tip: 'Day 86 명제词 · 그(那) + 대로(照) · 没变', tipEn: 'Day 86 Theme Words · 그 (That) + 대로 (As is) · Unchanged',                          tier: 'core' },
    { id: 'd86-v1-e6', korean: '달라지다',   hangul: 'dal-la-ji-da',   zh: '变化 / 变得不同', zhEn: 'Change / Become different', pos: '动词', posEn: 'Verb', example: { ko: '사람만 달라졌어요.',            zh: '只有人变了。', zhEn: 'Only the people changed.' },        tip: '다르다(不同) + ~아/어지다(变得)', tipEn: '다르다 (Different) + ~아/어지다 (Become)',                                    tier: 'core' },
    { id: 'd86-v1-e7', korean: '낯설다',     hangul: 'nat-seol-da',    zh: '陌生', zhEn: 'Unfamiliar',        pos: '形容词', posEn: 'Adjective.', example: { ko: '그때는 다 낯설었어요.',          zh: '那时一切都陌生。', zhEn: 'Everything felt unfamiliar then.' },    tip: 'ㄹ 불규칙 · 낯 + 설다 · Day 7 的心情', tipEn: 'ㄹ Irregular · 낯 (Face) + 설다 (Unfamiliar) · Day 7\'s feeling',                              tier: 'ext' },
    { id: 'd86-v1-e8', korean: '돌아보다',   hangul: 'do-ra-bo-da',    zh: '回顾 / 回头看', zhEn: 'Look back / Reflect', pos: '动词', posEn: 'Verb',  example: { ko: '지난 길을 돌아봤어요.',          zh: '回顾走过的路。', zhEn: 'Looked back at the path taken.' },      tip: '돌다(转) + 아 + 보다 · 회고', tipEn: '돌다 (Turn) + 아 + 보다 · Reflection',                                        tier: 'ext' },
  ],

  recognize: [
    { id: 'd86-v1-r1', korean: '노선',       hangul: 'no-seon',        choices: [{ zh: '路线', zhEn: 'Route',        correct: true }, { zh: '车站', zhEn: 'station',    correct: false }, { zh: '列车', zhEn: 'Train',    correct: false }, { zh: '车票', zhEn: 'Ticket',    correct: false }] },
    { id: 'd86-v1-r2', korean: '승강장',     hangul: 'seung-gang-jang', choices: [{ zh: '站台', zhEn: 'Platform',       correct: true }, { zh: '出口', zhEn: 'exit',    correct: false }, { zh: '售票处', zhEn: 'Ticket office',  correct: false }, { zh: '换乘口', zhEn: 'Transfer gate',  correct: false }] },
    { id: 'd86-v1-r3', korean: '억양',       hangul: 'eok-yang',       choices: [{ zh: '口音 / 腔调', zhEn: 'Accent / Tone', correct: true }, { zh: '声音', zhEn: 'Voice',    correct: false }, { zh: '语速', zhEn: 'Speaking speed',    correct: false }, { zh: '单词', zhEn: 'Word',    correct: false }] },
    { id: 'd86-v1-r4', korean: '그대로',     hangul: 'geu-dae-ro',     choices: [{ zh: '照旧 / 原样', zhEn: 'as before / unchanged', correct: true }, { zh: '立刻', zhEn: 'right away',    correct: false }, { zh: '偶尔', zhEn: 'occasionally',    correct: false }, { zh: '完全', zhEn: 'completely',    correct: false }] },
    { id: 'd86-v1-r5', korean: '달라지다',   hangul: 'dal-la-ji-da',   choices: [{ zh: '变化', zhEn: 'change',        correct: true }, { zh: '停止', zhEn: 'stop',    correct: false }, { zh: '相同', zhEn: 'same',    correct: false }, { zh: '消失', zhEn: 'disappear',    correct: false }] },
    { id: 'd86-v1-r6', korean: '낯설다',     hangul: 'nat-seol-da',    choices: [{ zh: '陌生', zhEn: 'Unfamiliar',        correct: true }, { zh: '熟悉', zhEn: 'familiar',    correct: false }, { zh: '亲切', zhEn: 'Friendly',    correct: false }, { zh: '安静', zhEn: 'Quiet',    correct: false }] },
  ],

  spell: [
    { id: 'd86-v1-s1', zhHint: '路线', zhHintEn: 'Route',    answer: ['노', '선'],       syllables: ['노', '선', '도', '섬'] },
    { id: 'd86-v1-s2', zhHint: '站台', zhHintEn: 'Platform',    answer: ['승', '강', '장'], syllables: ['승', '강', '장', '숭', '간', '창'] },
    { id: 'd86-v1-s3', zhHint: '口音', zhHintEn: 'accent',    answer: ['억', '양'],       syllables: ['억', '양', '엌', '얌'] },
    { id: 'd86-v1-s4', zhHint: '照旧', zhHintEn: 'as usual',    answer: ['그', '대', '로'], syllables: ['그', '대', '로', '거', '데', '노'] },
  ],

  write: [
    { id: 'd86-v1-w1', korean: '노', hangul: 'no',       wordKorean: '노선',     wordZh: '路线', wordZhEn: 'Route' },
    { id: 'd86-v1-w2', korean: '선', hangul: 'seon',     wordKorean: '노선',     wordZh: '路线', wordZhEn: 'Route' },
    { id: 'd86-v1-w3', korean: '승', hangul: 'seung',    wordKorean: '승강장',   wordZh: '站台', wordZhEn: 'Platform' },
    { id: 'd86-v1-w4', korean: '억', hangul: 'eok',      wordKorean: '억양',     wordZh: '口音', wordZhEn: 'accent' },
    { id: 'd86-v1-w5', korean: '양', hangul: 'yang',     wordKorean: '억양',     wordZh: '口音', wordZhEn: 'accent' },
    { id: 'd86-v1-w6', korean: '그', hangul: 'geu',      wordKorean: '그대로',   wordZh: '照旧', wordZhEn: 'as usual' },
    { id: 'd86-v1-w7', korean: '대', hangul: 'dae',      wordKorean: '그대로',   wordZh: '照旧', wordZhEn: 'as usual' },
    { id: 'd86-v1-w8', korean: '로', hangul: 'ro',       wordKorean: '그대로',   wordZh: '照旧', wordZhEn: 'as usual' },
  ],

  dictation: [
    { id: 'd86-v1-d1', korean: '길은 그대로예요',            hangul: 'gi-reun geu-dae-ro-ye-yo',              syllables: ['길', '은', '그', '대', '로', '예', '요'], zh: '路照旧', zhEn: 'The road is the same' },
    { id: 'd86-v1-d2', korean: '사람만 달라졌어요',          hangul: 'sa-ram-man dal-la-jeo-sseo-yo',         syllables: ['사', '람', '만', '달', '라', '졌', '어', '요'], zh: '只有人变了', zhEn: 'Only the people changed' },
    { id: 'd86-v1-d3', korean: '승강장에서 봤어요',          hangul: 'seung-gang-jang-e-seo bwa-sseo-yo',     syllables: ['승', '강', '장', '에', '서', '봤', '어', '요'], zh: '在站台上看到了', zhEn: 'Saw it on the platform' },
  ],
};
