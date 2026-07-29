import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 35 · 2-5 Boss 战 · 🧭 角色反转 · 给本地人指路 */
export const day35Boss: BossSubQuestData = {
  day: 5, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '길잡이 관문',
  subtitle: '🧭 弘爪站 · 你也可以指路了',
  intro: '弘爪站 2 号线站台，广告屏上放着 Mochi 的新歌。一只戴鸭舌帽的海狸大叔气喘吁吁跑来，手里握着一张皱巴巴的地址纸："저기, 학생, 잠깐만요… 한빛 어학당 어디예요?" 你愣了一秒 —— 被问路了。第一次。今天要把方向、起点、距离、礼貌，全都说出口。',
  outroHook: '海狸大叔鞠了一躬，跑向 2 号出口。你站在原地，站台风一吹 —— 不再只是那只需要帮助的外国兔子了。',

  tasks: [
    { type: 'choice',  label: '听句选意',   task: { id: 'd35-b5-t1', audioKo: '왼쪽으로 쭉 가세요.',              choices: [{ text: '往左一直走。',            correct: true }, { text: '往右一直走。',       correct: false }, { text: '左转就到。',           correct: false }, { text: '一直站在左边。',         correct: false }], explain: '왼쪽 有收音 → 으로 + 쭉' } },
    { type: 'choice',  label: '听句选意',   task: { id: 'd35-b5-t2', audioKo: '집에서 학교까지 5분이에요.',        choices: [{ text: '从家到学校 5 分钟。',    correct: true }, { text: '学校 5 分钟才有课。',  correct: false }, { text: '在家学习 5 分钟。',    correct: false }, { text: '5 分钟能到家。',          correct: false }], explain: '에서 ~까지 起终点' } },
    { type: 'choice',  label: '收音判定',   task: { id: 'd35-b5-t3', promptZh: '"请往地铁站走"哪句正确？',                                                                                        choices: [{ text: '지하철역로 가세요.',        correct: false }, { text: '지하철역으로 가세요.', correct: true }, { text: '지하철역에서 가세요.',    correct: false }, { text: '지하철역까지 가세요.',    correct: false }], explain: '지하철역 有收音 ㄱ → 으로' } },
    { type: 'choice',  label: '起点助词',   task: { id: 'd35-b5-t4', promptZh: '"从家到学校 5 分钟"哪句正确？',                                                                                    choices: [{ text: '집에 학교까지 5분이에요.',   correct: false }, { text: '집에서 학교까지 5분이에요.', correct: true }, { text: '집로 학교까지 5분이에요.', correct: false }, { text: '집까지 학교에서 5분이에요.', correct: false }], explain: '起点 = 에서 · 终点 = 까지' } },
    { type: 'choice',  label: '认词',       task: { id: 'd35-b5-t5', promptKo: '쭉',  promptHangul: 'jjuk',                                                                                        choices: [{ text: '一直',             correct: true }, { text: '暂停',        correct: false }, { text: '慢慢',          correct: false }, { text: '快点',            correct: false }], explain: '指路核心副词' } },
    { type: 'compose', label: '组句',       task: { id: 'd35-b5-t6', zhHint: '从 2 号出口出去，往左一直走。',                                                                    audioKo: '2번 출구로 나가서, 왼쪽으로 쭉 가세요.', answer: ['2번', '출구로', '나가서,', '왼쪽으로', '쭉', '가세요.'], tokens: ['2번', '출구로', '나가서,', '왼쪽으로', '쭉', '가세요.', '출구에서', '왼쪽로', '가고,'], explain: 'Tori 第一次指路' } },
    { type: 'compose', label: '组句',       task: { id: 'd35-b5-t7', zhHint: '一直走然后往右转。',                                                                              audioKo: '쭉 가서 오른쪽으로 도세요.',            answer: ['쭉', '가서', '오른쪽으로', '도세요.'],                    tokens: ['쭉', '가서', '오른쪽으로', '도세요.', '가고', '오른쪽에', '오른쪽로', '돌아요.'], explain: '~아/어서 顺序 · 방향 + 으로 + 돌다' } },
    { type: 'choice',  label: '情景选回应', task: { id: 'd35-b5-t8', promptZh: '海狸大叔鞠躬说 "고마워요, 학생"。你想礼貌回应"不客气，请慢走"，最标准的一句？',                                    choices: [{ text: '아니에요. 조심히 가세요.',                 correct: true }, { text: '고마워요.',           correct: false }, { text: '괜찮으세요?',           correct: false }, { text: '얼마예요?',            correct: false }], explain: '아니에요 + 조심히 가세요 = 对陌生长辈标配' } },
  ],
};
