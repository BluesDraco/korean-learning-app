import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 67 · 3-1 단어 마스터 · 夜巷迷路 · 하루가 온다 */
export const day67Vocab: VocabSubQuestData = {
  day: 7, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '어두운 골목 8 个词', subtitleEn: '8 words for a dark alley',

  encounter: [
    { id: 'd67-v1-e1', korean: '골목',       hangul: 'gol-mok',         zh: '巷子 / 胡同', zhEn: 'alley / hutong', pos: '名词', posEn: 'Noun', example: { ko: '어두운 골목이에요.',              zh: '暗暗的巷子。', zhEn: 'A dark alley.' },           tip: 'Day 67 场景关键词 · 골목길 = 巷道', tipEn: 'Day 67 scene keyword · 골목길 = alleyway',                                        tier: 'core' },
    { id: 'd67-v1-e2', korean: '어둡다',    hangul: 'eo-dup-da',       zh: '暗', zhEn: 'Dark',       pos: '形容词', posEn: 'Adjective.', example: { ko: '너무 어두워서 안 보여요.',       zh: '太暗看不见。', zhEn: 'It\'s too dark to see.' },         tip: 'ㅂ 不规则 → 어두워요 · 반의어 = 밝다', tipEn: 'ㅂ irregular → 어두워요 · antonym = 밝다',                                     tier: 'core' },
    { id: 'd67-v1-e3', korean: '위치',       hangul: 'wi-chi',          zh: '位置', zhEn: 'location',    pos: '名词', posEn: 'Noun',   example: { ko: '위치 켜놔.',                       zh: '把定位打开。', zhEn: 'Turn on your location.' },         tip: '位(위) + 置(치) · 위치 켜다 / 끄다 = 开 / 关定位', tipEn: '位(위) + 置(치) · 위치 켜다 / 끄다 = turn location on/off',                          tier: 'core' },
    { id: 'd67-v1-e4', korean: '움직이다', hangul: 'um-jik-i-da',     zh: '动 / 移动', zhEn: 'move / movement', pos: '动词', posEn: 'Verb',   example: { ko: '움직이지 마.',                    zh: '别动。', zhEn: 'Don\'t move.' },               tip: 'Haru 电话指令 · ~지 마 命令否定', tipEn: 'Haru\'s phone command · ~지 마 negative command',                                            tier: 'core' },
    { id: 'd67-v1-e5', korean: '도착하다', hangul: 'do-chak-ha-da',   zh: '到达', zhEn: 'arrive',    pos: '动词', posEn: 'Verb',   example: { ko: '30분 안에 도착해.',                zh: '30 分钟内到。', zhEn: 'Arrive within 30 minutes.' },        tip: '到(도) + 着(착) + 하다 · 반의어 = 출발하다', tipEn: '到(도) + 着(착) + 하다 · antonym = 출발하다',                                tier: 'core' },
    { id: 'd67-v1-e6', korean: '가로등',    hangul: 'ga-ro-deung',     zh: '路灯', zhEn: 'Streetlight',    pos: '名词', posEn: 'Noun',   example: { ko: '가로등이 깜빡거려요.',            zh: '路灯在闪。', zhEn: 'The streetlight is flickering.' },           tip: 'Day 65 复用 · 街(가로) + 灯(등)', tipEn: 'Day 65 Review · Street(가로) + Light(등)',                                          tier: 'core' },
    { id: 'd67-v1-e7', korean: '깜빡거리다', hangul: 'kkam-ppak-geo-ri-da', zh: '闪烁', zhEn: 'flicker', pos: '动词', posEn: 'Verb',   example: { ko: '가로등이 깜빡거려요.',            zh: '路灯在闪。', zhEn: 'The streetlight is flickering.' },           tip: '拟态词 + 거리다 · 눈을 깜빡거리다 = 眨眼', tipEn: 'Onomatopoeia + 거리다 · 눈을 깜빡거리다 = to blink',                                  tier: 'ext' },
    { id: 'd67-v1-e8', korean: '그림자',    hangul: 'geu-rim-ja',       zh: '影子', zhEn: 'shadow',    pos: '名词', posEn: 'Noun',   example: { ko: '큰 그림자가 지나갔어요.',         zh: '有个大影子走过。', zhEn: 'A big shadow walked by.' },     tip: 'Day 67 恐惧关键词 · 어둠 + 그림자', tipEn: 'Day 67 Fear Keywords · Darkness + Shadow',                                        tier: 'ext' },
  ],

  recognize: [
    { id: 'd67-v1-r1', korean: '골목',        hangul: 'gol-mok',         choices: [{ zh: '巷子 / 胡同', zhEn: 'alley / hutong',   correct: true }, { zh: '大街', zhEn: 'main street',        correct: false }, { zh: '高速', zhEn: 'highway',        correct: false }, { zh: '广场', zhEn: 'plaza',        correct: false }] },
    { id: 'd67-v1-r2', korean: '어둡다',     hangul: 'eo-dup-da',       choices: [{ zh: '暗', zhEn: 'Dark',           correct: true }, { zh: '亮', zhEn: 'bright',          correct: false }, { zh: '安静', zhEn: 'Quiet',        correct: false }, { zh: '陌生', zhEn: 'Unfamiliar',        correct: false }] },
    { id: 'd67-v1-r3', korean: '위치',        hangul: 'wi-chi',          choices: [{ zh: '位置', zhEn: 'location',         correct: true }, { zh: '方向', zhEn: 'direction',        correct: false }, { zh: '路线', zhEn: 'Route',        correct: false }, { zh: '出口', zhEn: 'exit',        correct: false }] },
    { id: 'd67-v1-r4', korean: '움직이다',  hangul: 'um-jik-i-da',     choices: [{ zh: '动 / 移动', zhEn: 'move / movement',    correct: true }, { zh: '躺下', zhEn: 'lie down',        correct: false }, { zh: '睡着', zhEn: 'to fall asleep',        correct: false }, { zh: '看着', zhEn: 'watching',        correct: false }] },
    { id: 'd67-v1-r5', korean: '도착하다',  hangul: 'do-chak-ha-da',   choices: [{ zh: '到达', zhEn: 'arrive',         correct: true }, { zh: '出发', zhEn: 'Departure',        correct: false }, { zh: '取消', zhEn: 'cancel',        correct: false }, { zh: '返回', zhEn: 'return',        correct: false }] },
    { id: 'd67-v1-r6', korean: '깜빡거리다', hangul: 'kkam-ppak-geo-ri-da', choices: [{ zh: '闪烁', zhEn: 'flicker',    correct: true }, { zh: '熄灭', zhEn: 'go out',        correct: false }, { zh: '发光', zhEn: 'glow',        correct: false }, { zh: '摇晃', zhEn: 'shake',        correct: false }] },
  ],

  spell: [
    { id: 'd67-v1-s1', zhHint: '巷子', zhHintEn: 'alley',      answer: ['골', '목'], syllables: ['골', '목', '골', '몰'] },
    { id: 'd67-v1-s2', zhHint: '位置', zhHintEn: 'location',      answer: ['위', '치'], syllables: ['위', '치', '외', '지'] },
    { id: 'd67-v1-s3', zhHint: '到达', zhHintEn: 'arrive',      answer: ['도', '착'], syllables: ['도', '착', '도', '찻'] },
    { id: 'd67-v1-s4', zhHint: '影子', zhHintEn: 'shadow',      answer: ['그', '림', '자'], syllables: ['그', '림', '자', '람'] },
  ],

  write: [
    { id: 'd67-v1-w1', korean: '골', hangul: 'gol',       wordKorean: '골목',        wordZh: '巷子', wordZhEn: 'alley' },
    { id: 'd67-v1-w2', korean: '목', hangul: 'mok',       wordKorean: '골목',        wordZh: '巷子', wordZhEn: 'alley' },
    { id: 'd67-v1-w3', korean: '위', hangul: 'wi',        wordKorean: '위치',        wordZh: '位置', wordZhEn: 'location' },
    { id: 'd67-v1-w4', korean: '치', hangul: 'chi',       wordKorean: '위치',        wordZh: '位置', wordZhEn: 'location' },
    { id: 'd67-v1-w5', korean: '도', hangul: 'do',        wordKorean: '도착하다',   wordZh: '到达', wordZhEn: 'arrive' },
    { id: 'd67-v1-w6', korean: '착', hangul: 'chak',      wordKorean: '도착하다',   wordZh: '到达', wordZhEn: 'arrive' },
    { id: 'd67-v1-w7', korean: '그', hangul: 'geu',       wordKorean: '그림자',     wordZh: '影子', wordZhEn: 'shadow' },
    { id: 'd67-v1-w8', korean: '어', hangul: 'eo',        wordKorean: '어둡다',     wordZh: '暗', wordZhEn: 'Dark' },
  ],

  dictation: [
    { id: 'd67-v1-d1', korean: '나 길 잃었어',              hangul: 'na gil i-reo-sseo',                  syllables: ['나', '길', '잃', '었', '어'],                        zh: '我迷路了', zhEn: 'I\'m lost' },
    { id: 'd67-v1-d2', korean: '너무 어두워서 안 찍혀',    hangul: 'neo-mu eo-du-wo-seo an jjik-hyeo',   syllables: ['너', '무', '어', '두', '워', '서', '안', '찍', '혀'], zh: '太暗拍不出来', zhEn: 'Too dark to take a picture' },
    { id: 'd67-v1-d3', korean: '곧 도착할 텐데',              hangul: 'got do-chak-hal ten-de',              syllables: ['곧', '도', '착', '할', '텐', '데'],                   zh: '应该马上到', zhEn: 'Should be there soon' },
  ],
};
