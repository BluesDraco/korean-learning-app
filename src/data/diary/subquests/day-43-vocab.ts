import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 43 · 노래방 · 词汇子关卡 */
export const day43Vocab: VocabSubQuestData = {
  day: 13, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: 'KTV 里的 8 个词', subtitleEn: '8 words from the KTV',

  encounter: [
    { id: 'd43-v1-e1', korean: '노래방',    hangul: 'no-rae-bang', zh: 'KTV / K房', zhEn: 'KTV / karaoke room',    pos: '名词', posEn: 'Noun',   example: { ko: '노래방에 갔어요.',                zh: '去了 KTV。', zhEn: 'Went to the KTV.' },        tip: '노래(歌) + 방(房) · 코인 노래방 = 投币小房', tipEn: 'Song + Room · Coin karaoke = a small coin-operated room',                   tier: 'core' },
    { id: 'd43-v1-e2', korean: '부르다',    hangul: 'bu-reu-da',   zh: '唱 / 叫', zhEn: 'sing / call',      pos: '动词', posEn: 'Verb',   example: { ko: '노래를 불러요.',                  zh: '唱歌。', zhEn: 'Sing.' },            tip: '르 不规则 · 부르다 → 불러요', tipEn: '르 irregular · 부르다 → 불러요',                                   tier: 'core' },
    { id: 'd43-v1-e3', korean: '마이크',    hangul: 'ma-i-keu',    zh: '麦克风', zhEn: 'Microphone',        pos: '名词', posEn: 'Noun',   example: { ko: '마이크 잡아요.',                  zh: '拿麦克风。', zhEn: 'Grab the mic.' },        tip: '英语 mic 外来语 · ~를 잡다 = 拿起', tipEn: 'English loanword \'mic\' · ~를 잡다 = to grab',                             tier: 'core' },
    { id: 'd43-v1-e4', korean: '실력',      hangul: 'sil-lyeok',   zh: '实力', zhEn: 'skill',          pos: '名词', posEn: 'Noun',   example: { ko: '토리 실력 늘었어!',                zh: '兔莉实力进步了！', zhEn: 'Tori\'s skills have improved!' },  tip: 'Day 31 复习 · 실력이 늘다 = 实力增长', tipEn: 'Day 31 Review · 실력이 늘다 = skills improve',                          tier: 'core' },
    { id: 'd43-v1-e5', korean: '용기',      hangul: 'yong-gi',     zh: '勇气', zhEn: 'Courage',          pos: '名词', posEn: 'Noun',   example: { ko: '용기를 내서 노래를 불렀어요.',   zh: '鼓起勇气唱了。', zhEn: 'I gathered my courage and sang.' },    tip: 'Day 1 妈妈胡萝卜上的两个字 · 용기를 내다 = 鼓起勇气', tipEn: 'Day 1 Two words on Mom\'s carrot · 용기를 내다 = to muster courage',            tier: 'core' },
    { id: 'd43-v1-e6', korean: '멋있다',    hangul: 'meo-sit-da',  zh: '帅 / 酷', zhEn: 'Cool / Handsome',       pos: '形容词', posEn: 'Adjective.', example: { ko: '준호 랩 진짜 멋있어!',            zh: 'Junho rap 真帅！', zhEn: 'Junho\'s rap is so cool!' }, tip: '发音 [머싣따] · 夸人夸表演', tipEn: 'Pronunciation [머싣따] · praising someone\'s performance',                                   tier: 'core' },
    { id: 'd43-v1-e7', korean: '떨리다',    hangul: 'tteol-li-da', zh: '紧张 / 颤抖', zhEn: 'nervous / trembling',   pos: '动词', posEn: 'Verb',   example: { ko: '떨려서 노래를 못 부르겠어요.',   zh: '紧张得唱不出来。', zhEn: 'I was so nervous I couldn\'t sing.' }, tip: 'ㄹ 词干 · 表心跳/手抖', tipEn: 'ㄹ stem · indicates heart racing/hands shaking',                                        tier: 'ext' },
    { id: 'd43-v1-e8', korean: '늘다',      hangul: 'neul-da',     zh: '增长 / 进步', zhEn: 'grow / improve',   pos: '动词', posEn: 'Verb',   example: { ko: '실력이 늘었어요.',                zh: '实力进步了。', zhEn: 'My skills have improved.' },      tip: 'ㄹ 词干 · 늘다 → 늘어요 · 反义 줄다', tipEn: 'ㄹ stem · 늘다 → 늘어요 · opposite 줄다',                             tier: 'ext' },
  ],

  recognize: [
    { id: 'd43-v1-r1', korean: '노래방', hangul: 'no-rae-bang', choices: [{ zh: 'KTV',      correct: true }, { zh: '教室', zhEn: 'Classroom',      correct: false }, { zh: '厨房', zhEn: 'Kitchen',    correct: false }, { zh: '走廊', zhEn: 'Hallway',    correct: false }] },
    { id: 'd43-v1-r2', korean: '부르다', hangul: 'bu-reu-da',   choices: [{ zh: '唱', zhEn: 'sing',       correct: true }, { zh: '听', zhEn: 'Listen',        correct: false }, { zh: '看', zhEn: 'to see',      correct: false }, { zh: '说', zhEn: 'say',      correct: false }] },
    { id: 'd43-v1-r3', korean: '마이크', hangul: 'ma-i-keu',    choices: [{ zh: '麦克风', zhEn: 'Microphone',   correct: true }, { zh: '耳机', zhEn: 'earphones',      correct: false }, { zh: '音箱', zhEn: 'speaker',    correct: false }, { zh: '手机', zhEn: 'phone',    correct: false }] },
    { id: 'd43-v1-r4', korean: '실력',   hangul: 'sil-lyeok',   choices: [{ zh: '实力', zhEn: 'skill',     correct: true }, { zh: '声音', zhEn: 'Voice',      correct: false }, { zh: '努力', zhEn: 'effort',    correct: false }, { zh: '毅力', zhEn: 'perseverance',    correct: false }] },
    { id: 'd43-v1-r5', korean: '용기',   hangul: 'yong-gi',     choices: [{ zh: '勇气', zhEn: 'Courage',     correct: true }, { zh: '怒气', zhEn: 'anger',      correct: false }, { zh: '力气', zhEn: 'strength',    correct: false }, { zh: '气球', zhEn: 'balloon',    correct: false }] },
    { id: 'd43-v1-r6', korean: '멋있다', hangul: 'meo-sit-da',  choices: [{ zh: '帅 / 酷', zhEn: 'Cool / Handsome',  correct: true }, { zh: '奇怪', zhEn: 'strange',      correct: false }, { zh: '生气', zhEn: 'Angry',    correct: false }, { zh: '难', zhEn: 'difficult',      correct: false }] },
  ],

  spell: [
    { id: 'd43-v1-s1', zhHint: 'KTV（노래방）',   answer: ['노', '래', '방'], syllables: ['노', '래', '방', '레', '밤'] },
    { id: 'd43-v1-s2', zhHint: '实力', zhHintEn: 'skill',             answer: ['실', '력'], syllables: ['실', '력', '신', '역'] },
    { id: 'd43-v1-s3', zhHint: '勇气', zhHintEn: 'Courage',             answer: ['용', '기'], syllables: ['용', '기', '용', '지'] },
    { id: 'd43-v1-s4', zhHint: '帅（멋있）', zhHintEn: 'cool (멋있)',      answer: ['멋', '있'], syllables: ['멋', '있', '멋', '읻'] },
  ],

  write: [
    { id: 'd43-v1-w1', korean: '노', hangul: 'no',         wordKorean: '노래방', wordZh: 'KTV' },
    { id: 'd43-v1-w2', korean: '래', hangul: 'rae',        wordKorean: '노래방', wordZh: 'KTV' },
    { id: 'd43-v1-w3', korean: '방', hangul: 'bang',       wordKorean: '노래방', wordZh: 'KTV' },
    { id: 'd43-v1-w4', korean: '용', hangul: 'yong',       wordKorean: '용기',   wordZh: '勇气', wordZhEn: 'Courage' },
    { id: 'd43-v1-w5', korean: '기', hangul: 'gi',         wordKorean: '용기',   wordZh: '勇气', wordZhEn: 'Courage' },
    { id: 'd43-v1-w6', korean: '실', hangul: 'sil',        wordKorean: '실력',   wordZh: '实力', wordZhEn: 'skill' },
    { id: 'd43-v1-w7', korean: '멋', hangul: 'meot',       wordKorean: '멋있다', wordZh: '帅', wordZhEn: 'handsome' },
    { id: 'd43-v1-w8', korean: '떨', hangul: 'tteol',      wordKorean: '떨리다', wordZh: '紧张', wordZhEn: 'nervous' },
  ],

  dictation: [
    { id: 'd43-v1-d1', korean: '한번 불러 봐',        hangul: 'han-beon bul-leo bwa',           syllables: ['한', '번', '불', '러', '봐'],                zh: '试着唱一次', zhEn: 'try singing once' },
    { id: 'd43-v1-d2', korean: '실력이 늘었어요',      hangul: 'sil-lyeo-gi neu-reo-sseo-yo',    syllables: ['실', '력', '이', '늘', '었', '어', '요'],   zh: '实力进步了', zhEn: 'skills improved' },
    { id: 'd43-v1-d3', korean: '용기를 냈어요',        hangul: 'yong-gi-reul nae-sseo-yo',       syllables: ['용', '기', '를', '냈', '어', '요'],         zh: '鼓起了勇气', zhEn: 'gathered courage' },
  ],
};
