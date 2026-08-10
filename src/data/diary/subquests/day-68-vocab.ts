import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 68 · 3-1 단어 마스터 · 走回去直面 · 편견을 깨다 */
export const day68Vocab: VocabSubQuestData = {
  day: 8, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '직면 8 个词', subtitleEn: '직면 8 words',

  encounter: [
    { id: 'd68-v1-e1', korean: '다시',       hangul: 'da-si',           zh: '再 / 重新', zhEn: 'again / anew', pos: '副词', posEn: 'Adverb', example: { ko: '다시 가서 말했어요.',            zh: '再回去说了。', zhEn: 'Went back and said it again.' },     tip: '基础副词 · 다시 한 번 = 再一次', tipEn: 'Basic adverb · 다시 한 번 = once more',                                    tier: 'core' },
    { id: 'd68-v1-e2', korean: '무시하다',  hangul: 'mu-si-ha-da',     zh: '无视 / 轻视', zhEn: 'Ignore / Look down on', pos: '动词', posEn: 'Verb', example: { ko: '저를 무시하지 마세요.',           zh: '请不要轻视我。', zhEn: 'Please don\'t look down on me.' },   tip: 'Day 66 复用 · Day 68 说出口', tipEn: 'Day 66 reuse · Day 68 spoken aloud',                                     tier: 'core' },
    { id: 'd68-v1-e3', korean: '드리다',    hangul: 'deu-ri-da',       zh: '给（敬语）', zhEn: 'To give (honorific)', pos: '动词', posEn: 'Verb', example: { ko: '드릴 말씀이 있어요.',              zh: '有件事想跟您说。', zhEn: 'There\'s something I want to tell you.' }, tip: '주다 敬语 · 드릴 = 드리다 敬语连体形', tipEn: '주다 honorific · 드릴 = 드리다 honorific connective form',                             tier: 'core' },
    { id: 'd68-v1-e4', korean: '중요하다',  hangul: 'jung-yo-ha-da',   zh: '重要', zhEn: 'important',    pos: '形容词', posEn: 'Adjective.', example: { ko: '능력이 중요해요.',                zh: '能力重要。', zhEn: 'Ability matters.' },       tip: '重(중) + 要(요) + 하다', tipEn: 'Heavy(중) + Important(요) + 하다',                                             tier: 'core' },
    { id: 'd68-v1-e5', korean: '용기',       hangul: 'yong-gi',          zh: '勇气', zhEn: 'Courage',    pos: '名词', posEn: 'Noun',   example: { ko: '용기를 냈어요.',                    zh: '拿出了勇气。', zhEn: 'Mustered the courage.' },     tip: 'Day 1 妈妈胡萝卜笔 · Day 68 兑现', tipEn: 'Day 1 mom\'s carrot pen · Day 68 fulfilled',                                 tier: 'core' },
    { id: 'd68-v1-e6', korean: '내다',        hangul: 'nae-da',          zh: '拿出 / 提出', zhEn: 'Take out / Present', pos: '动词', posEn: 'Verb', example: { ko: '용기를 내야 해요.',               zh: '必须拿出勇气。', zhEn: 'You must muster up courage.' },   tip: '용기를 내다 = 拿出勇气（惯用）', tipEn: '용기를 내다 = muster courage (idiom)',                                   tier: 'core' },
    { id: 'd68-v1-e7', korean: '문',         hangul: 'mun',              zh: '门', zhEn: 'door',      pos: '名词', posEn: 'Noun',   example: { ko: '문 손잡이가 높아요.',              zh: '门把手很高。', zhEn: 'The door handle is high.' },     tip: '基础名词', tipEn: 'Basic nouns',                                                          tier: 'ext' },
    { id: 'd68-v1-e8', korean: '판단하다',  hangul: 'pan-dan-ha-da',   zh: '判断', zhEn: 'Judgment',    pos: '动词', posEn: 'Verb',   example: { ko: '겉모습으로 판단하지 마세요.',      zh: '请不要以貌取人。', zhEn: 'Don\'t judge a book by its cover.' }, tip: '判(판) + 断(단) + 하다 · Day 68 主题词', tipEn: '判(판) + 断(단) + 하다 · Day 68 theme word',                            tier: 'ext' },
  ],

  recognize: [
    { id: 'd68-v1-r1', korean: '다시',       hangul: 'da-si',           choices: [{ zh: '再 / 重新', zhEn: 'again / anew',   correct: true }, { zh: '第一次', zhEn: 'First time',      correct: false }, { zh: '暂时', zhEn: 'temporarily',        correct: false }, { zh: '之前', zhEn: 'before',        correct: false }] },
    { id: 'd68-v1-r2', korean: '무시하다',  hangul: 'mu-si-ha-da',     choices: [{ zh: '无视 / 轻视', zhEn: 'Ignore / Look down on', correct: true }, { zh: '重视', zhEn: 'value',        correct: false }, { zh: '感激', zhEn: 'grateful',        correct: false }, { zh: '同意', zhEn: 'Agreement',        correct: false }] },
    { id: 'd68-v1-r3', korean: '드리다',    hangul: 'deu-ri-da',       choices: [{ zh: '给（敬语）', zhEn: 'To give (honorific)',  correct: true }, { zh: '收下', zhEn: 'to receive',        correct: false }, { zh: '拒绝', zhEn: 'Refuse',        correct: false }, { zh: '偷走', zhEn: 'to steal',        correct: false }] },
    { id: 'd68-v1-r4', korean: '중요하다',  hangul: 'jung-yo-ha-da',   choices: [{ zh: '重要', zhEn: 'important',        correct: true }, { zh: '无关', zhEn: 'Irrelevant',        correct: false }, { zh: '模糊', zhEn: 'Vague',        correct: false }, { zh: '沉重', zhEn: 'Heavy',        correct: false }] },
    { id: 'd68-v1-r5', korean: '용기',       hangul: 'yong-gi',         choices: [{ zh: '勇气', zhEn: 'Courage',        correct: true }, { zh: '容器', zhEn: 'Container',        correct: false }, { zh: '力气', zhEn: 'strength',        correct: false }, { zh: '空气', zhEn: 'Air',        correct: false }] },
    { id: 'd68-v1-r6', korean: '판단하다',  hangul: 'pan-dan-ha-da',   choices: [{ zh: '判断', zhEn: 'Judgment',        correct: true }, { zh: '认识', zhEn: 'know',        correct: false }, { zh: '相信', zhEn: 'Believe',        correct: false }, { zh: '预测', zhEn: 'Predict',        correct: false }] },
  ],

  spell: [
    { id: 'd68-v1-s1', zhHint: '重要', zhHintEn: 'important',      answer: ['중', '요'], syllables: ['중', '요', '증', '유'] },
    { id: 'd68-v1-s2', zhHint: '勇气', zhHintEn: 'Courage',      answer: ['용', '기'], syllables: ['용', '기', '요', '지'] },
    { id: 'd68-v1-s3', zhHint: '无视', zhHintEn: 'Ignore',      answer: ['무', '시'], syllables: ['무', '시', '문', '지'] },
    { id: 'd68-v1-s4', zhHint: '判断', zhHintEn: 'Judgment',      answer: ['판', '단'], syllables: ['판', '단', '판', '탄'] },
  ],

  write: [
    { id: 'd68-v1-w1', korean: '다', hangul: 'da',        wordKorean: '다시',        wordZh: '再', wordZhEn: 'Again' },
    { id: 'd68-v1-w2', korean: '무', hangul: 'mu',        wordKorean: '무시하다',   wordZh: '轻视', wordZhEn: 'look down on' },
    { id: 'd68-v1-w3', korean: '시', hangul: 'si',        wordKorean: '무시하다',   wordZh: '轻视', wordZhEn: 'look down on' },
    { id: 'd68-v1-w4', korean: '드', hangul: 'deu',       wordKorean: '드리다',     wordZh: '给（敬语）', wordZhEn: 'To give (honorific)' },
    { id: 'd68-v1-w5', korean: '중', hangul: 'jung',      wordKorean: '중요하다',   wordZh: '重要', wordZhEn: 'important' },
    { id: 'd68-v1-w6', korean: '용', hangul: 'yong',      wordKorean: '용기',        wordZh: '勇气', wordZhEn: 'Courage' },
    { id: 'd68-v1-w7', korean: '내', hangul: 'nae',       wordKorean: '내다',        wordZh: '拿出', wordZhEn: 'Take out' },
    { id: 'd68-v1-w8', korean: '판', hangul: 'pan',       wordKorean: '판단하다',   wordZh: '判断', wordZhEn: 'Judgment' },
  ],

  dictation: [
    { id: 'd68-v1-d1', korean: '드릴 말씀이 있어요',      hangul: 'deu-ril mal-sseu-mi i-sseo-yo',  syllables: ['드', '릴', '말', '씀', '이', '있', '어', '요'], zh: '有件事想跟您说', zhEn: 'There\'s something I\'d like to tell you.' },
    { id: 'd68-v1-d2', korean: '저를 무시하지 마세요',    hangul: 'jeo-reul mu-si-ha-ji ma-se-yo',  syllables: ['저', '를', '무', '시', '하', '지', '마', '세', '요'], zh: '请不要轻视我', zhEn: 'Don\'t look down on me' },
    { id: 'd68-v1-d3', korean: '용기를 냈어요',              hangul: 'yong-gi-reul nae-sseo-yo',        syllables: ['용', '기', '를', '냈', '어', '요'], zh: '拿出了勇气', zhEn: 'gathered courage' },
  ],
};
