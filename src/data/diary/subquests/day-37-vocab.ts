import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 37 · 火锅派对 · 词汇子关卡 */
export const day37Vocab: VocabSubQuestData = {
  day: 7, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '请朋友吃火锅的 8 个词',

  encounter: [
    { id: 'd37-v1-e1', korean: '초대하다',    hangul: 'cho-dae-ha-da',   zh: '邀请',       pos: '动词',   example: { ko: '친구들을 초대했어요.',           zh: '邀请了朋友们。' },   tip: '초대(招待) + 하다 · 초대(名词请柬)',                          tier: 'core' },
    { id: 'd37-v1-e2', korean: '맵다',        hangul: 'maep-da',         zh: '辣',          pos: '形容词', example: { ko: '이 국이 너무 매워요.',           zh: '这个汤太辣了。' },   tip: 'ㅂ 不规则 → 매워요 · 매워 죽겠어 = 辣死了',                  tier: 'core' },
    { id: 'd37-v1-e3', korean: '땀',          hangul: 'ttam',           zh: '汗',          pos: '名词',   example: { ko: '땀이 나요.',                     zh: '出汗了。' },         tip: '땀이 나다 = 出汗 · 吃辣/运动都用',                            tier: 'core' },
    { id: 'd37-v1-e4', korean: '함께',        hangul: 'ham-kke',        zh: '一起',        pos: '副词',   example: { ko: '함께 먹으니까 더 맛있어요.',    zh: '一起吃更好吃。' },   tip: '和 같이 意思一样，稍微书面/正式',                              tier: 'core' },
    { id: 'd37-v1-e5', korean: '냄새',        hangul: 'naem-sae',       zh: '气味 / 味道', pos: '名词',   example: { ko: '고향 냄새가 나요.',              zh: '有家乡的味道。' },   tip: '냄새가 나다 = 有~味道',                                       tier: 'core' },
    { id: 'd37-v1-e6', korean: '전기 냄비',   hangul: 'jeon-gi naem-bi', zh: '电锅',        pos: '名词',   example: { ko: '전기 냄비로 훠궈를 끓였어요.',   zh: '用电锅煮了火锅。' }, tip: '전기(电) + 냄비(锅) · 宿舍必备',                              tier: 'core' },
    { id: 'd37-v1-e7', korean: '재료',        hangul: 'jae-ryo',        zh: '材料 / 食材', pos: '名词',   example: { ko: '재료 다 준비할게.',              zh: '材料都准备好。' },   tip: '재료를 준비하다 = 备料',                                      tier: 'ext' },
    { id: 'd37-v1-e8', korean: '준비하다',    hangul: 'jun-bi-ha-da',   zh: '准备',        pos: '动词',   example: { ko: '재료 다 준비할게.',              zh: '材料都准备好。' },   tip: '준비(准备) + 하다 · 承诺 준비할게',                            tier: 'ext' },
  ],

  recognize: [
    { id: 'd37-v1-r1', korean: '초대하다', hangul: 'cho-dae-ha-da', choices: [{ zh: '邀请',   correct: true }, { zh: '道歉',     correct: false }, { zh: '拒绝',     correct: false }, { zh: '感谢',      correct: false }] },
    { id: 'd37-v1-r2', korean: '맵다',     hangul: 'maep-da',       choices: [{ zh: '辣',     correct: true }, { zh: '甜',       correct: false }, { zh: '咸',       correct: false }, { zh: '酸',        correct: false }] },
    { id: 'd37-v1-r3', korean: '땀',        hangul: 'ttam',         choices: [{ zh: '汗',     correct: true }, { zh: '泪',       correct: false }, { zh: '雨',       correct: false }, { zh: '油',        correct: false }] },
    { id: 'd37-v1-r4', korean: '함께',      hangul: 'ham-kke',      choices: [{ zh: '一起',   correct: true }, { zh: '一个人',   correct: false }, { zh: '一直',     correct: false }, { zh: '一定',      correct: false }] },
    { id: 'd37-v1-r5', korean: '냄새',      hangul: 'naem-sae',     choices: [{ zh: '气味',   correct: true }, { zh: '声音',     correct: false }, { zh: '感觉',     correct: false }, { zh: '颜色',      correct: false }] },
    { id: 'd37-v1-r6', korean: '재료',      hangul: 'jae-ryo',      choices: [{ zh: '材料',   correct: true }, { zh: '厨具',     correct: false }, { zh: '菜谱',     correct: false }, { zh: '调料',      correct: false }] },
  ],

  spell: [
    { id: 'd37-v1-s1', zhHint: '邀请（초대）',    answer: ['초', '대'], syllables: ['초', '대', '초', '데'] },
    { id: 'd37-v1-s2', zhHint: '辣的（매워）',    answer: ['매', '워'], syllables: ['매', '워', '메', '워'] },
    { id: 'd37-v1-s3', zhHint: '一起',            answer: ['함', '께'], syllables: ['함', '께', '한', '께'] },
    { id: 'd37-v1-s4', zhHint: '气味',            answer: ['냄', '새'], syllables: ['냄', '새', '남', '세'] },
  ],

  write: [
    { id: 'd37-v1-w1', korean: '초', hangul: 'cho',        wordKorean: '초대하다',  wordZh: '邀请' },
    { id: 'd37-v1-w2', korean: '대', hangul: 'dae',        wordKorean: '초대하다',  wordZh: '邀请' },
    { id: 'd37-v1-w3', korean: '맵', hangul: 'maep',       wordKorean: '맵다',      wordZh: '辣' },
    { id: 'd37-v1-w4', korean: '땀', hangul: 'ttam',       wordKorean: '땀',        wordZh: '汗' },
    { id: 'd37-v1-w5', korean: '함', hangul: 'ham',        wordKorean: '함께',      wordZh: '一起' },
    { id: 'd37-v1-w6', korean: '께', hangul: 'kke',        wordKorean: '함께',      wordZh: '一起' },
    { id: 'd37-v1-w7', korean: '냄', hangul: 'naem',       wordKorean: '냄새',      wordZh: '气味' },
    { id: 'd37-v1-w8', korean: '새', hangul: 'sae',        wordKorean: '냄새',      wordZh: '气味' },
  ],

  dictation: [
    { id: 'd37-v1-d1', korean: '먹을래?',        hangul: 'meo-geul-lae',        syllables: ['먹', '을', '래'],       zh: '要吃吗？' },
    { id: 'd37-v1-d2', korean: '몇 시에 갈까?',   hangul: 'myeot si-e gal-kka',   syllables: ['몇', '시', '에', '갈', '까'], zh: '几点去？' },
    { id: 'd37-v1-d3', korean: '땀이 나요',        hangul: 'tta-mi na-yo',        syllables: ['땀', '이', '나', '요'], zh: '出汗了' },
  ],
};
