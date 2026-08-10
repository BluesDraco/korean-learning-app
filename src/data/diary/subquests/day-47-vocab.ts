import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 47 · 엄마와 영상통화 · 词汇子关卡 */
export const day47Vocab: VocabSubQuestData = {
  day: 17, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '深夜视频通话的 8 个词', subtitleEn: '8 words for late-night video calls',

  encounter: [
    { id: 'd47-v1-e1', korean: '영상통화',   hangul: 'yeong-sang-tong-hwa', zh: '视频通话', zhEn: 'Video call', pos: '名词', posEn: 'Noun', example: { ko: '엄마랑 영상통화 했어요.',           zh: '和妈妈视频通话了。', zhEn: 'Had a video call with Mom.' },     tip: '影像(영상) + 通话(통화)', tipEn: 'video (영상) + call (통화)',                                       tier: 'core' },
    { id: 'd47-v1-e2', korean: '보고 싶다',  hangul: 'bo-go sip-da',        zh: '想 / 想念', zhEn: 'to miss / to long for', pos: '表达', posEn: 'Expression', example: { ko: '엄마 보고 싶어요.',                  zh: '想妈妈。', zhEn: 'I miss Mom.' },               tip: 'Day 32 复习 · 想人 / 想家', tipEn: 'Day 32 Review · Missing someone / homesick',                                     tier: 'core' },
    { id: 'd47-v1-e3', korean: '가르치다',   hangul: 'ga-reu-chi-da',       zh: '教', zhEn: 'teach',        pos: '动词', posEn: 'Verb', example: { ko: '엄마한테 한국어 한 마디 가르쳤어요.', zh: '教了妈妈一句韩语。', zhEn: 'I taught Mom a Korean phrase.' },     tip: '~에게/한테 ~을/를 가르치다',                                    tier: 'core' },
    { id: 'd47-v1-e4', korean: '기억하다',   hangul: 'gi-eok-a-da',         zh: '记住', zhEn: 'Remember.',      pos: '动词', posEn: 'Verb', example: { ko: '엄마가 그 말을 기억하셨어요.',      zh: '妈妈记住了那句话。', zhEn: 'Mom remembered that phrase.' },     tip: '기억나다(自·想起) vs 기억하다(他·记住)', tipEn: '기억나다 (intransitive·to recall) vs 기억하다 (transitive·to remember)',                        tier: 'core' },
    { id: 'd47-v1-e5', korean: '발음',       hangul: 'ba-reum',             zh: '发音', zhEn: 'pronunciation',      pos: '名词', posEn: 'Noun', example: { ko: '엄마 발음이 서툴러도 괜찮아요.',    zh: '妈妈发音不熟练也没关系。', zhEn: 'It\'s okay if Mom\'s pronunciation isn\'t perfect.' }, tip: '发(발) + 音(음) · 발음이 좋다', tipEn: 'pronounce (발) + sound (음) · 발음이 좋다 (good pronunciation)',                                 tier: 'core' },
    { id: 'd47-v1-e6', korean: '연습',       hangul: 'yeon-seup',           zh: '练习', zhEn: 'practice',      pos: '名词', posEn: 'Noun', example: { ko: '엄마도 연습하고 계셨어요.',        zh: '妈妈也在练习。', zhEn: 'Mom is practicing too.' },         tip: '练(연) + 习(습) · 연습하다', tipEn: 'practice (연) + practice (습) · 연습하다 (to practice)',                                    tier: 'core' },
    { id: 'd47-v1-e7', korean: '용기',       hangul: 'yong-gi',             zh: '勇气', zhEn: 'Courage',      pos: '名词', posEn: 'Noun', example: { ko: '용기 내.',                            zh: '要有勇气。', zhEn: 'You need to have courage.' },               tip: 'Day 1 铺垫 · 妈妈第一次说的一句韩语', tipEn: 'Day 1 Setup · The first Korean phrase Mom said',                            tier: 'ext' },
    { id: 'd47-v1-e8', korean: '한 마디',    hangul: 'han ma-di',           zh: '一句 / 一段', zhEn: 'one phrase / one passage', pos: '名词', posEn: 'Noun', example: { ko: '한국어 한 마디 가르쳤어요.',        zh: '教了一句韩语。', zhEn: 'Taught one Korean phrase.' },         tip: '话的量词 · 한 마디 = 一句话',                                    tier: 'ext' },
  ],

  recognize: [
    { id: 'd47-v1-r1', korean: '영상통화', hangul: 'yeong-sang-tong-hwa', choices: [{ zh: '视频通话', zhEn: 'Video call',    correct: true }, { zh: '语音通话', zhEn: 'voice call',    correct: false }, { zh: '短信', zhEn: 'text message',          correct: false }, { zh: '直播', zhEn: 'Live broadcast',          correct: false }] },
    { id: 'd47-v1-r2', korean: '가르치다', hangul: 'ga-reu-chi-da',       choices: [{ zh: '教', zhEn: 'teach',          correct: true }, { zh: '学', zhEn: 'learn',          correct: false }, { zh: '记', zhEn: 'Remember',          correct: false }, { zh: '说', zhEn: 'say',          correct: false }] },
    { id: 'd47-v1-r3', korean: '기억하다', hangul: 'gi-eok-a-da',         choices: [{ zh: '记住', zhEn: 'Remember.',        correct: true }, { zh: '忘记', zhEn: 'Forget',        correct: false }, { zh: '追忆', zhEn: 'Reminisce',        correct: false }, { zh: '记录', zhEn: 'Record',        correct: false }] },
    { id: 'd47-v1-r4', korean: '발음',     hangul: 'ba-reum',             choices: [{ zh: '发音', zhEn: 'pronunciation',        correct: true }, { zh: '发言', zhEn: 'speech',        correct: false }, { zh: '声音', zhEn: 'Voice',        correct: false }, { zh: '朗读', zhEn: 'reading aloud',        correct: false }] },
    { id: 'd47-v1-r5', korean: '연습',     hangul: 'yeon-seup',           choices: [{ zh: '练习', zhEn: 'practice',        correct: true }, { zh: '学习', zhEn: 'to study',        correct: false }, { zh: '预习', zhEn: 'preview',        correct: false }, { zh: '复习', zhEn: 'review',        correct: false }] },
    { id: 'd47-v1-r6', korean: '용기',     hangul: 'yong-gi',             choices: [{ zh: '勇气', zhEn: 'Courage',        correct: true }, { zh: '力气', zhEn: 'strength',        correct: false }, { zh: '怒气', zhEn: 'anger',        correct: false }, { zh: '客气', zhEn: 'polite',        correct: false }] },
  ],

  spell: [
    { id: 'd47-v1-s1', zhHint: '发音', zhHintEn: 'pronunciation',        answer: ['발', '음'], syllables: ['발', '음', '반', '음'] },
    { id: 'd47-v1-s2', zhHint: '练习', zhHintEn: 'practice',        answer: ['연', '습'], syllables: ['연', '습', '영', '슴'] },
    { id: 'd47-v1-s3', zhHint: '勇气', zhHintEn: 'Courage',        answer: ['용', '기'], syllables: ['용', '기', '용', '지'] },
    { id: 'd47-v1-s4', zhHint: '记忆（기억）', zhHintEn: 'memory (기억)', answer: ['기', '억'], syllables: ['기', '억', '기', '엇'] },
  ],

  write: [
    { id: 'd47-v1-w1', korean: '발', hangul: 'bal',        wordKorean: '발음',      wordZh: '发音', wordZhEn: 'pronunciation' },
    { id: 'd47-v1-w2', korean: '음', hangul: 'eum',        wordKorean: '발음',      wordZh: '发音', wordZhEn: 'pronunciation' },
    { id: 'd47-v1-w3', korean: '연', hangul: 'yeon',       wordKorean: '연습',      wordZh: '练习', wordZhEn: 'practice' },
    { id: 'd47-v1-w4', korean: '습', hangul: 'seup',       wordKorean: '연습',      wordZh: '练习', wordZhEn: 'practice' },
    { id: 'd47-v1-w5', korean: '용', hangul: 'yong',       wordKorean: '용기',      wordZh: '勇气', wordZhEn: 'Courage' },
    { id: 'd47-v1-w6', korean: '기', hangul: 'gi',         wordKorean: '용기',      wordZh: '勇气', wordZhEn: 'Courage' },
    { id: 'd47-v1-w7', korean: '가', hangul: 'ga',         wordKorean: '가르치다',  wordZh: '教', wordZhEn: 'teach' },
    { id: 'd47-v1-w8', korean: '르', hangul: 'reu',        wordKorean: '가르치다',  wordZh: '教', wordZhEn: 'teach' },
  ],

  dictation: [
    { id: 'd47-v1-d1', korean: '용기 내',           hangul: 'yong-gi nae',                  syllables: ['용', '기', '내'],                       zh: '要有勇气', zhEn: 'have courage' },
    { id: 'd47-v1-d2', korean: '보고 싶어요',        hangul: 'bo-go si-peo-yo',              syllables: ['보', '고', '싶', '어', '요'],           zh: '想你', zhEn: 'miss you' },
    { id: 'd47-v1-d3', korean: '남는다고 했어요',    hangul: 'nam-neun-da-go hae-sseo-yo',   syllables: ['남', '는', '다', '고', '했', '어', '요'], zh: '（据说）会留下', zhEn: '(it\'s said) will remain' },
  ],
};
