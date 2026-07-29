import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 82 · 3-1 단어 마스터 · 兽尔江大桥·和好 · 双主题 ~지만 */
export const day82Vocab: VocabSubQuestData = {
  day: 22, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '화해·우정 8 个词',

  encounter: [
    { id: 'd82-v1-e1', korean: '변하다',     hangul: 'byeon-ha-da',    zh: '变化 / 变了', pos: '动词',   example: { ko: '너 변했어.',                    zh: '你变了。' },            tip: 'Day 82 主题词 · 变(변) + 하다 · 사람 변화도 표현',                    tier: 'core' },
    { id: 'd82-v1-e2', korean: '예전',       hangul: 'ye-jeon',        zh: '以前',        pos: '名词',   example: { ko: '예전엔 안 그랬어.',              zh: '以前不是这样。' },      tip: '过去时间 · 옛날보다 更近的过去',                                        tier: 'core' },
    { id: 'd82-v1-e3', korean: '용기',       hangul: 'yong-gi',        zh: '勇气',        pos: '名词',   example: { ko: '용기 내는 법을 배웠어요.',      zh: '学到了鼓起勇气的方法。' }, tip: 'Day 1 妈妈胡萝卜上的两个字 · 82天后真正理解 · 용기를 내다 = 鼓起勇气', tier: 'core' },
    { id: 'd82-v1-e4', korean: '우정',       hangul: 'u-jeong',        zh: '友情',        pos: '名词',   example: { ko: '자존심보다 우정이 커요.',        zh: '友情比自尊大。' },      tip: '友(우) + 情(정)',                                                      tier: 'core' },
    { id: 'd82-v1-e5', korean: '안다',       hangul: 'an-da',          zh: '拥抱',        pos: '动词',   example: { ko: '다리 위에서 안았어요.',          zh: '在桥上拥抱了。' },      tip: '안다 → 안았어요 · 与 알다(知道) 别混,这里是"抱"',                      tier: 'core' },
    { id: 'd82-v1-e6', korean: '따뜻하다',   hangul: 'tta-tteu-ta-da', zh: '温暖',        pos: '形容词', example: { ko: '바람은 세지만 안은 따뜻해요.',    zh: '风大但拥抱温暖。' },    tip: '따뜻해요 · 감정/온도 都可用',                                          tier: 'core' },
    { id: 'd82-v1-e7', korean: '진심',       hangul: 'jin-sim',        zh: '真心',        pos: '名词',   example: { ko: '진심으로 사과했어요.',          zh: '真心道歉了。' },        tip: '真(진) + 心(심) · 진심으로 = 真心地',                                  tier: 'ext' },
    { id: 'd82-v1-e8', korean: '화해',       hangul: 'hwa-hae',        zh: '和解 / 和好', pos: '名词',   example: { ko: '드디어 화해했어요.',            zh: '终于和好了。' },        tip: 'Day 49 学过 · 和(화) + 解(해) · 화해하다 = 和好',                      tier: 'ext' },
  ],

  recognize: [
    { id: 'd82-v1-r1', korean: '변하다',     hangul: 'byeon-ha-da',    choices: [{ zh: '变化 / 变了', correct: true }, { zh: '一样',    correct: false }, { zh: '停留',    correct: false }, { zh: '回来',    correct: false }] },
    { id: 'd82-v1-r2', korean: '예전',       hangul: 'ye-jeon',        choices: [{ zh: '以前',        correct: true }, { zh: '以后',    correct: false }, { zh: '现在',    correct: false }, { zh: '明天',    correct: false }] },
    { id: 'd82-v1-r3', korean: '용기',       hangul: 'yong-gi',        choices: [{ zh: '勇气',        correct: true }, { zh: '义气',    correct: false }, { zh: '力气',    correct: false }, { zh: '运气',    correct: false }] },
    { id: 'd82-v1-r4', korean: '안다',       hangul: 'an-da',          choices: [{ zh: '拥抱',        correct: true }, { zh: '推开',    correct: false }, { zh: '牵手',    correct: false }, { zh: '挥手',    correct: false }] },
    { id: 'd82-v1-r5', korean: '따뜻하다',   hangul: 'tta-tteu-ta-da', choices: [{ zh: '温暖',        correct: true }, { zh: '寒冷',    correct: false }, { zh: '炎热',    correct: false }, { zh: '凉爽',    correct: false }] },
    { id: 'd82-v1-r6', korean: '진심',       hangul: 'jin-sim',        choices: [{ zh: '真心',        correct: true }, { zh: '假意',    correct: false }, { zh: '关心',    correct: false }, { zh: '担心',    correct: false }] },
  ],

  spell: [
    { id: 'd82-v1-s1', zhHint: '勇气',    answer: ['용', '기'], syllables: ['용', '기', '옹', '가'] },
    { id: 'd82-v1-s2', zhHint: '真心',    answer: ['진', '심'], syllables: ['진', '심', '준', '싱'] },
    { id: 'd82-v1-s3', zhHint: '和解',    answer: ['화', '해'], syllables: ['화', '해', '회', '하'] },
    { id: 'd82-v1-s4', zhHint: '以前',    answer: ['예', '전'], syllables: ['예', '전', '얘', '정'] },
  ],

  write: [
    { id: 'd82-v1-w1', korean: '용', hangul: 'yong',     wordKorean: '용기',       wordZh: '勇气' },
    { id: 'd82-v1-w2', korean: '기', hangul: 'gi',       wordKorean: '용기',       wordZh: '勇气' },
    { id: 'd82-v1-w3', korean: '진', hangul: 'jin',      wordKorean: '진심',       wordZh: '真心' },
    { id: 'd82-v1-w4', korean: '심', hangul: 'sim',      wordKorean: '진심',       wordZh: '真心' },
    { id: 'd82-v1-w5', korean: '화', hangul: 'hwa',      wordKorean: '화해',       wordZh: '和解' },
    { id: 'd82-v1-w6', korean: '예', hangul: 'ye',       wordKorean: '예전',       wordZh: '以前' },
    { id: 'd82-v1-w7', korean: '우', hangul: 'u',        wordKorean: '우정',       wordZh: '友情' },
    { id: 'd82-v1-w8', korean: '변', hangul: 'byeon',    wordKorean: '변하다',     wordZh: '变化' },
  ],

  dictation: [
    { id: 'd82-v1-d1', korean: '바람은 세지만 안은 따뜻해요',      hangul: 'ba-ram-eun se-ji-man a-neun tta-tteu-tae-yo', syllables: ['바', '람', '은', '세', '지', '만', '안', '은', '따', '뜻', '해', '요'], zh: '风大但拥抱温暖' },
    { id: 'd82-v1-d2', korean: '자존심보다 우정이 커요',          hangul: 'ja-jon-sim-bo-da u-jeong-i keo-yo',          syllables: ['자', '존', '심', '보', '다', '우', '정', '이', '커', '요'], zh: '友情比自尊大' },
    { id: 'd82-v1-d3', korean: '용기 내는 법을 배웠어요',          hangul: 'yong-gi nae-neun beo-beul bae-wo-sseo-yo',   syllables: ['용', '기', '내', '는', '법', '을', '배', '웠', '어', '요'], zh: '学到了鼓起勇气的方法' },
  ],
};
