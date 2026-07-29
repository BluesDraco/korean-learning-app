import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 63 · 3-4 상황 속으로 · 打工第一天 · 洒咖啡 */
export const day63Scene: SceneSubQuestData = {
  day: 3, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '곰다방 · 首班日',

  tasks: [
    { type: 'situation', id: 'd63-sc-s1', scenario: '客人一口气说完订单你只听到"아이스"。想请她慢慢再说，最自然的一句？',              choices: [{ ko: '죄송해요, 다시 한 번만 말씀해 주세요.',         zh: '不好意思，请再慢慢说一遍。',        correct: true }, { ko: '싫어요.',                              zh: '不要。',                  correct: false }, { ko: '얼마예요?',                              zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '打工救命句 · 客人 / 店长都吃' },
    { type: 'situation', id: 'd63-sc-s2', scenario: '不小心把咖啡洒了，想低头说"对不起，我重新准备一杯"，最自然的一句？',                  choices: [{ ko: '죄송합니다. 다시 준비해 드릴게요.',             zh: '对不起，我重新准备一杯。',          correct: true }, { ko: '왜 이래요?',                          zh: '你干嘛？',              correct: false }, { ko: '얼마예요?',                              zh: '多少钱？',                 correct: false }, { ko: '괜찮아요.',                       zh: '没事。',            correct: false }], explain: '正式道歉 + 承诺 · ~아/어 드릴게요' },
    { type: 'situation', id: 'd63-sc-s3', scenario: '想跟朋友说"我今天不小心把咖啡洒了"，最自然的一句？',                                  choices: [{ ko: '오늘 커피를 쏟아 버렸어.',                        zh: '今天不小心把咖啡洒了。',            correct: true }, { ko: '오늘 커피를 쏟다 버렸어.',              zh: '洒咖啡（错）。',        correct: false }, { ko: '오늘 커피를 쏟은 버렸어.',           zh: '洒咖啡（错）。',        correct: false }, { ko: '오늘 커피 얼마예요?',                 zh: '咖啡多少钱？',      correct: false }], explain: '쏟다 → 쏟아 + 버리다' },

    { type: 'dialogue', id: 'd63-sc-d1', lines: [{ speaker: '여우 손님', ko: '저기요, 아이스 아메리카노 톨 사이즈 한 잔, 시럽 하나 빼고, 얼음 적게.', zh: '中杯冰美式一杯，去糖浆，冰少一点。' }], blankSpeaker: '토리', choices: [{ ko: '죄송해요, 다시 한 번만 말씀해 주세요.',                       correct: true, zh: '请再慢慢说一遍。' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }, { ko: '싫어요.',           correct: false, zh: '不要。' }], explain: '打工救命句' },
    { type: 'dialogue', id: 'd63-sc-d2', lines: [{ speaker: '고양이 손님', ko: '괜찮아요! 처음이니까.',                                                       zh: '没事，第一天嘛！' }], blankSpeaker: '토리', choices: [{ ko: '죄송합니다. 다시 준비해 드릴게요.',                            correct: true, zh: '对不起，我重新准备。' }, { ko: '몰라요, 얼마예요?', correct: false, zh: '不知道，多少钱？' }, { ko: '싫어요.',        correct: false, zh: '不要。' }, { ko: '내일 갈게요.',     correct: false, zh: '明天再来。' }], explain: '道歉 + 承诺' },
    { type: 'dialogue', id: 'd63-sc-d3', lines: [{ speaker: '곰다방 사장', ko: '토리야, 첫날인데 3시간 다 채웠어. 그거만으로도 잘한 거야.',                     zh: '兔莉，第一天撑满 3 小时，光这点就很好。' }], blankSpeaker: '토리', choices: [{ ko: '감사합니다. 내일은 더 잘하겠습니다.',                             correct: true, zh: '谢谢，明天会更好。' }, { ko: '싫어요, 안 갈래요.', correct: false, zh: '不要，我不来。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라요.',        correct: false, zh: '不知道。' }], explain: '正式感谢 + ~겠습니다 承诺' },

    { type: 'context', id: 'd63-sc-c1', ko: '커피를 쏟아 버렸어요.', promptZh: '这句话的场景意义，哪句最准确？', choices: [{ zh: '"把咖啡洒了"·  ~아/어 버리다 = 遗憾 + 完了 · Day 63 主题句', correct: true }, { zh: '故意洒的',              correct: false }, { zh: '咖啡还在杯里',            correct: false }, { zh: '客人洒的',                correct: false }], explain: '~아/어 버리다 · 情绪化完了' },
    { type: 'context', id: 'd63-sc-c2', ko: '괜찮아, 처음이니까.',  promptZh: '这句话的场景意义，哪句最准确？',       choices: [{ zh: '店长安慰"没事，第一天嘛" · ~니까 = 因为 · 是 Day 63 温暖收束', correct: true }, { zh: '我不原谅你',            correct: false }, { zh: '你走开',              correct: false }, { zh: '再犯一次',                correct: false }], explain: '~니까 表原因 · 温柔安慰' },
  ],
};
