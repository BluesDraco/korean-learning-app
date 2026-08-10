import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 82 · 3-1 단어 마스터 · 兽尔江大桥·和好 · 双主题 ~지만 */
export const day82Vocab: VocabSubQuestData = {
  day: 22, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '화해·우정 8 个词', subtitleEn: '8 words for 화해·우정 (reconciliation·friendship)',

  encounter: [
    { id: 'd82-v1-e1', korean: '변하다',     hangul: 'byeon-ha-da',    zh: '变化 / 变了', zhEn: 'Change / has changed', pos: '动词', posEn: 'Verb',   example: { ko: '너 변했어.',                    zh: '你变了。', zhEn: 'You\'ve changed.' },            tip: 'Day 82 主题词 · 变(변) + 하다 · 사람 변화도 표현', tipEn: 'Day 82 Theme Word · 变(변) + 하다 · Expressing change in people too',                    tier: 'core' },
    { id: 'd82-v1-e2', korean: '예전',       hangul: 'ye-jeon',        zh: '以前', zhEn: 'before',        pos: '名词', posEn: 'Noun',   example: { ko: '예전엔 안 그랬어.',              zh: '以前不是这样。', zhEn: 'You weren\'t like this before.' },      tip: '过去时间 · 옛날보다 更近的过去', tipEn: 'Past tense · A more recent past than 옛날보다',                                        tier: 'core' },
    { id: 'd82-v1-e3', korean: '용기',       hangul: 'yong-gi',        zh: '勇气', zhEn: 'Courage',        pos: '名词', posEn: 'Noun',   example: { ko: '용기 내는 법을 배웠어요.',      zh: '学到了鼓起勇气的方法。', zhEn: 'Learned how to muster up courage.' }, tip: 'Day 1 妈妈胡萝卜上的两个字 · 82天后真正理解 · 용기를 내다 = 鼓起勇气', tipEn: 'The two characters on Mom\'s carrot from Day 1 · Truly understood 82 days later · 용기를 내다 = to muster courage', tier: 'core' },
    { id: 'd82-v1-e4', korean: '우정',       hangul: 'u-jeong',        zh: '友情', zhEn: 'Friendship',        pos: '名词', posEn: 'Noun',   example: { ko: '자존심보다 우정이 커요.',        zh: '友情比自尊大。', zhEn: 'Friendship is bigger than pride.' },      tip: '友(우) + 情(정)', tipEn: '友 (woo) + 情 (jeong)',                                                      tier: 'core' },
    { id: 'd82-v1-e5', korean: '안다',       hangul: 'an-da',          zh: '拥抱', zhEn: 'Hug',        pos: '动词', posEn: 'Verb',   example: { ko: '다리 위에서 안았어요.',          zh: '在桥上拥抱了。', zhEn: 'We hugged on the bridge.' },      tip: '안다 → 안았어요 · 与 알다(知道) 别混,这里是"抱"', tipEn: '안다 → 안았어요 · Don\'t confuse with 알다 (to know); here it means "to hug"',                      tier: 'core' },
    { id: 'd82-v1-e6', korean: '따뜻하다',   hangul: 'tta-tteu-ta-da', zh: '温暖', zhEn: 'Warm',        pos: '形容词', posEn: 'Adjective.', example: { ko: '바람은 세지만 안은 따뜻해요.',    zh: '风大但拥抱温暖。', zhEn: 'The wind is strong, but the hug is warm.' },    tip: '따뜻해요 · 감정/온도 都可用', tipEn: '따뜻해요 · Can be used for both emotions and temperature',                                          tier: 'core' },
    { id: 'd82-v1-e7', korean: '진심',       hangul: 'jin-sim',        zh: '真心', zhEn: 'Sincere heart',        pos: '名词', posEn: 'Noun',   example: { ko: '진심으로 사과했어요.',          zh: '真心道歉了。', zhEn: 'I sincerely apologized.' },        tip: '真(진) + 心(심) · 진심으로 = 真心地', tipEn: '真心 (진심) · 진심으로 = sincerely',                                  tier: 'ext' },
    { id: 'd82-v1-e8', korean: '화해',       hangul: 'hwa-hae',        zh: '和解 / 和好', zhEn: 'Reconciliation / making up', pos: '名词', posEn: 'Noun',   example: { ko: '드디어 화해했어요.',            zh: '终于和好了。', zhEn: 'We finally made up.' },        tip: 'Day 49 学过 · 和(화) + 解(해) · 화해하다 = 和好', tipEn: 'Learned on Day 49 · 和(화) + 解(해) · 화해하다 = to make up',                      tier: 'ext' },
  ],

  recognize: [
    { id: 'd82-v1-r1', korean: '변하다',     hangul: 'byeon-ha-da',    choices: [{ zh: '变化 / 变了', zhEn: 'Change / has changed', correct: true }, { zh: '一样', zhEn: 'Same',    correct: false }, { zh: '停留', zhEn: 'stay',    correct: false }, { zh: '回来', zhEn: 'Come back',    correct: false }] },
    { id: 'd82-v1-r2', korean: '예전',       hangul: 'ye-jeon',        choices: [{ zh: '以前', zhEn: 'before',        correct: true }, { zh: '以后', zhEn: 'after',    correct: false }, { zh: '现在', zhEn: 'Now',    correct: false }, { zh: '明天', zhEn: 'Tomorrow',    correct: false }] },
    { id: 'd82-v1-r3', korean: '용기',       hangul: 'yong-gi',        choices: [{ zh: '勇气', zhEn: 'Courage',        correct: true }, { zh: '义气', zhEn: 'Loyalty',    correct: false }, { zh: '力气', zhEn: 'strength',    correct: false }, { zh: '运气', zhEn: 'Luck',    correct: false }] },
    { id: 'd82-v1-r4', korean: '안다',       hangul: 'an-da',          choices: [{ zh: '拥抱', zhEn: 'Hug',        correct: true }, { zh: '推开', zhEn: 'Push away',    correct: false }, { zh: '牵手', zhEn: 'Hold hands',    correct: false }, { zh: '挥手', zhEn: 'Wave',    correct: false }] },
    { id: 'd82-v1-r5', korean: '따뜻하다',   hangul: 'tta-tteu-ta-da', choices: [{ zh: '温暖', zhEn: 'Warm',        correct: true }, { zh: '寒冷', zhEn: 'Cold',    correct: false }, { zh: '炎热', zhEn: 'Hot',    correct: false }, { zh: '凉爽', zhEn: 'Cool',    correct: false }] },
    { id: 'd82-v1-r6', korean: '진심',       hangul: 'jin-sim',        choices: [{ zh: '真心', zhEn: 'Sincere heart',        correct: true }, { zh: '假意', zhEn: 'pretence / insincerity',    correct: false }, { zh: '关心', zhEn: 'Care about',    correct: false }, { zh: '担心', zhEn: 'worry',    correct: false }] },
  ],

  spell: [
    { id: 'd82-v1-s1', zhHint: '勇气', zhHintEn: 'Courage',    answer: ['용', '기'], syllables: ['용', '기', '옹', '가'] },
    { id: 'd82-v1-s2', zhHint: '真心', zhHintEn: 'Sincere heart',    answer: ['진', '심'], syllables: ['진', '심', '준', '싱'] },
    { id: 'd82-v1-s3', zhHint: '和解', zhHintEn: 'Reconcile',    answer: ['화', '해'], syllables: ['화', '해', '회', '하'] },
    { id: 'd82-v1-s4', zhHint: '以前', zhHintEn: 'before',    answer: ['예', '전'], syllables: ['예', '전', '얘', '정'] },
  ],

  write: [
    { id: 'd82-v1-w1', korean: '용', hangul: 'yong',     wordKorean: '용기',       wordZh: '勇气', wordZhEn: 'Courage' },
    { id: 'd82-v1-w2', korean: '기', hangul: 'gi',       wordKorean: '용기',       wordZh: '勇气', wordZhEn: 'Courage' },
    { id: 'd82-v1-w3', korean: '진', hangul: 'jin',      wordKorean: '진심',       wordZh: '真心', wordZhEn: 'Sincere heart' },
    { id: 'd82-v1-w4', korean: '심', hangul: 'sim',      wordKorean: '진심',       wordZh: '真心', wordZhEn: 'Sincere heart' },
    { id: 'd82-v1-w5', korean: '화', hangul: 'hwa',      wordKorean: '화해',       wordZh: '和解', wordZhEn: 'Reconcile' },
    { id: 'd82-v1-w6', korean: '예', hangul: 'ye',       wordKorean: '예전',       wordZh: '以前', wordZhEn: 'before' },
    { id: 'd82-v1-w7', korean: '우', hangul: 'u',        wordKorean: '우정',       wordZh: '友情', wordZhEn: 'Friendship' },
    { id: 'd82-v1-w8', korean: '변', hangul: 'byeon',    wordKorean: '변하다',     wordZh: '变化', wordZhEn: 'change' },
  ],

  dictation: [
    { id: 'd82-v1-d1', korean: '바람은 세지만 안은 따뜻해요',      hangul: 'ba-ram-eun se-ji-man a-neun tta-tteu-tae-yo', syllables: ['바', '람', '은', '세', '지', '만', '안', '은', '따', '뜻', '해', '요'], zh: '风大但拥抱温暖', zhEn: 'Windy, but the hug is warm' },
    { id: 'd82-v1-d2', korean: '자존심보다 우정이 커요',          hangul: 'ja-jon-sim-bo-da u-jeong-i keo-yo',          syllables: ['자', '존', '심', '보', '다', '우', '정', '이', '커', '요'], zh: '友情比自尊大', zhEn: 'Friendship is bigger than pride' },
    { id: 'd82-v1-d3', korean: '용기 내는 법을 배웠어요',          hangul: 'yong-gi nae-neun beo-beul bae-wo-sseo-yo',   syllables: ['용', '기', '내', '는', '법', '을', '배', '웠', '어', '요'], zh: '学到了鼓起勇气的方法', zhEn: 'Learned how to muster courage' },
  ],
};
