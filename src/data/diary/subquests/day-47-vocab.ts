import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 47 · 엄마와 영상통화 · 词汇子关卡 */
export const day47Vocab: VocabSubQuestData = {
  day: 17, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '深夜视频通话的 8 个词',

  encounter: [
    { id: 'd47-v1-e1', korean: '영상통화',   hangul: 'yeong-sang-tong-hwa', zh: '视频通话', pos: '名词', example: { ko: '엄마랑 영상통화 했어요.',           zh: '和妈妈视频通话了。' },     tip: '影像(영상) + 通话(통화)',                                       tier: 'core' },
    { id: 'd47-v1-e2', korean: '보고 싶다',  hangul: 'bo-go sip-da',        zh: '想 / 想念', pos: '表达', example: { ko: '엄마 보고 싶어요.',                  zh: '想妈妈。' },               tip: 'Day 32 复习 · 想人 / 想家',                                     tier: 'core' },
    { id: 'd47-v1-e3', korean: '가르치다',   hangul: 'ga-reu-chi-da',       zh: '教',        pos: '动词', example: { ko: '엄마한테 한국어 한 마디 가르쳤어요.', zh: '教了妈妈一句韩语。' },     tip: '~에게/한테 ~을/를 가르치다',                                    tier: 'core' },
    { id: 'd47-v1-e4', korean: '기억하다',   hangul: 'gi-eok-a-da',         zh: '记住',      pos: '动词', example: { ko: '엄마가 그 말을 기억하셨어요.',      zh: '妈妈记住了那句话。' },     tip: '기억나다(自·想起) vs 기억하다(他·记住)',                        tier: 'core' },
    { id: 'd47-v1-e5', korean: '발음',       hangul: 'ba-reum',             zh: '发音',      pos: '名词', example: { ko: '엄마 발음이 서툴러도 괜찮아요.',    zh: '妈妈发音不熟练也没关系。' }, tip: '发(발) + 音(음) · 발음이 좋다',                                 tier: 'core' },
    { id: 'd47-v1-e6', korean: '연습',       hangul: 'yeon-seup',           zh: '练习',      pos: '名词', example: { ko: '엄마도 연습하고 계셨어요.',        zh: '妈妈也在练习。' },         tip: '练(연) + 习(습) · 연습하다',                                    tier: 'core' },
    { id: 'd47-v1-e7', korean: '용기',       hangul: 'yong-gi',             zh: '勇气',      pos: '名词', example: { ko: '용기 내.',                            zh: '要有勇气。' },               tip: 'Day 1 铺垫 · 妈妈第一次说的一句韩语',                            tier: 'ext' },
    { id: 'd47-v1-e8', korean: '한 마디',    hangul: 'han ma-di',           zh: '一句 / 一段', pos: '名词', example: { ko: '한국어 한 마디 가르쳤어요.',        zh: '教了一句韩语。' },         tip: '话的量词 · 한 마디 = 一句话',                                    tier: 'ext' },
  ],

  recognize: [
    { id: 'd47-v1-r1', korean: '영상통화', hangul: 'yeong-sang-tong-hwa', choices: [{ zh: '视频通话',    correct: true }, { zh: '语音通话',    correct: false }, { zh: '短信',          correct: false }, { zh: '直播',          correct: false }] },
    { id: 'd47-v1-r2', korean: '가르치다', hangul: 'ga-reu-chi-da',       choices: [{ zh: '教',          correct: true }, { zh: '学',          correct: false }, { zh: '记',          correct: false }, { zh: '说',          correct: false }] },
    { id: 'd47-v1-r3', korean: '기억하다', hangul: 'gi-eok-a-da',         choices: [{ zh: '记住',        correct: true }, { zh: '忘记',        correct: false }, { zh: '追忆',        correct: false }, { zh: '记录',        correct: false }] },
    { id: 'd47-v1-r4', korean: '발음',     hangul: 'ba-reum',             choices: [{ zh: '发音',        correct: true }, { zh: '发言',        correct: false }, { zh: '声音',        correct: false }, { zh: '朗读',        correct: false }] },
    { id: 'd47-v1-r5', korean: '연습',     hangul: 'yeon-seup',           choices: [{ zh: '练习',        correct: true }, { zh: '学习',        correct: false }, { zh: '预习',        correct: false }, { zh: '复习',        correct: false }] },
    { id: 'd47-v1-r6', korean: '용기',     hangul: 'yong-gi',             choices: [{ zh: '勇气',        correct: true }, { zh: '力气',        correct: false }, { zh: '怒气',        correct: false }, { zh: '客气',        correct: false }] },
  ],

  spell: [
    { id: 'd47-v1-s1', zhHint: '发音',        answer: ['발', '음'], syllables: ['발', '음', '반', '음'] },
    { id: 'd47-v1-s2', zhHint: '练习',        answer: ['연', '습'], syllables: ['연', '습', '영', '슴'] },
    { id: 'd47-v1-s3', zhHint: '勇气',        answer: ['용', '기'], syllables: ['용', '기', '용', '지'] },
    { id: 'd47-v1-s4', zhHint: '记忆（기억）', answer: ['기', '억'], syllables: ['기', '억', '기', '엇'] },
  ],

  write: [
    { id: 'd47-v1-w1', korean: '발', hangul: 'bal',        wordKorean: '발음',      wordZh: '发音' },
    { id: 'd47-v1-w2', korean: '음', hangul: 'eum',        wordKorean: '발음',      wordZh: '发音' },
    { id: 'd47-v1-w3', korean: '연', hangul: 'yeon',       wordKorean: '연습',      wordZh: '练习' },
    { id: 'd47-v1-w4', korean: '습', hangul: 'seup',       wordKorean: '연습',      wordZh: '练习' },
    { id: 'd47-v1-w5', korean: '용', hangul: 'yong',       wordKorean: '용기',      wordZh: '勇气' },
    { id: 'd47-v1-w6', korean: '기', hangul: 'gi',         wordKorean: '용기',      wordZh: '勇气' },
    { id: 'd47-v1-w7', korean: '가', hangul: 'ga',         wordKorean: '가르치다',  wordZh: '教' },
    { id: 'd47-v1-w8', korean: '르', hangul: 'reu',        wordKorean: '가르치다',  wordZh: '教' },
  ],

  dictation: [
    { id: 'd47-v1-d1', korean: '용기 내',           hangul: 'yong-gi nae',                  syllables: ['용', '기', '내'],                       zh: '要有勇气' },
    { id: 'd47-v1-d2', korean: '보고 싶어요',        hangul: 'bo-go si-peo-yo',              syllables: ['보', '고', '싶', '어', '요'],           zh: '想你' },
    { id: 'd47-v1-d3', korean: '남는다고 했어요',    hangul: 'nam-neun-da-go hae-sseo-yo',   syllables: ['남', '는', '다', '고', '했', '어', '요'], zh: '（据说）会留下' },
  ],
};
