import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 34 · 2-5 Boss 战 · 🤫 나중에 */
export const day34Boss: BossSubQuestData = {
  day: 4, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '비밀의 관문',
  subtitle: '🤫 两杯麦茶 · 沉默的三秒',
  intro: '桌上两杯麦茶。灯光暖，但你手心是凉的。想问了一个月的问题终于要说出口 —— "그날 지하철에서, 왜 나를 도와줬어?" Haru 放下杯子，沉默大概三秒。这三秒里，你要用韩语说清楚：好奇、耐心、尊重、承诺。',
  outroHook: 'Haru 起身还杯子，走到门口回头："토리, 고마워. 안 물어봐 줘서." (兔莉，谢谢你，没追问。) 门轻轻关上。「나중에」那三个字，悄悄住进你心里。',

  tasks: [
    { type: 'choice',  label: '听句选意',   task: { id: 'd34-b5-t1', audioKo: '너를 보면 옛날 친구가 생각나.',      choices: [{ text: '看到你会想起以前的朋友。',    correct: true }, { text: '看到你会想那朋友。',      correct: false }, { text: '你和以前的朋友很像。',        correct: false }, { text: '你就是那个以前的朋友。',   correct: false }], explain: 'Haru 原句 · 자동사 + 이/가' } },
    { type: 'choice',  label: '听句选意',   task: { id: 'd34-b5-t2', audioKo: '나중에 알려줄게. 지금은 아니야.',      choices: [{ text: '以后再告诉你。现在还不是时候。', correct: true }, { text: '现在不知道，不能告诉你。', correct: false }, { text: '以后再问我。',              correct: false }, { text: '现在告诉你也可以。',        correct: false }], explain: '承诺形 ~ㄹ게' } },
    { type: 'choice',  label: '助词判定',   task: { id: 'd34-b5-t3', promptZh: '"想起妈妈"哪句正确？',                                                                                                                                              choices: [{ text: '엄마를 생각나요.',             correct: false }, { text: '엄마가 생각나요.',       correct: true }, { text: '엄마는 생각나요.',         correct: false }, { text: '엄마에게 생각나요.',      correct: false }], explain: '생각나다 自动词 · 主语 이/가' } },
    { type: 'choice',  label: '否定倒置',   task: { id: 'd34-b5-t4', promptZh: '"想不起那人的名字"哪句正确？',                                                                                                                                     choices: [{ text: '그 사람 이름이 안 생각나요.',   correct: false }, { text: '그 사람 이름이 생각이 안 나요.', correct: true }, { text: '그 사람 이름을 안 생각나요.', correct: false }, { text: '그 사람 이름은 생각을 안 나요.', correct: false }], explain: '母语者习惯 · 생각이 안 나요' } },
    { type: 'choice',  label: '认词',       task: { id: 'd34-b5-t5', promptKo: '나중에', promptHangul: 'na-jung-e',                                                                                                                                 choices: [{ text: '以后',           correct: true }, { text: '之前',      correct: false }, { text: '立刻',        correct: false }, { text: '一起',        correct: false }], explain: '承诺句固定副词' } },
    { type: 'compose', label: '组句',       task: { id: 'd34-b5-t6', zhHint: '看到你会想起以前的朋友。',                                                                             audioKo: '너를 보면 옛날 친구가 생각나.',   answer: ['너를', '보면', '옛날 친구가', '생각나.'],   tokens: ['너를', '보면', '옛날 친구가', '생각나.', '옛날 친구를', '생각해.', '생각이 있어.'], explain: 'Haru 原句 · 자동사 + 이/가' } },
    { type: 'compose', label: '组句',       task: { id: 'd34-b5-t7', zhHint: '突然想起妈妈了。',                                                                                       audioKo: '엄마가 갑자기 생각났어요.',       answer: ['엄마가', '갑자기', '생각났어요.'],           tokens: ['엄마가', '갑자기', '생각났어요.', '엄마를', '생각했어요.', '엄마는', '생각이 있어요.'], explain: '엄마 + 가 · 생각나다 过去时' } },
    { type: 'choice',  label: '情景选回应', task: { id: 'd34-b5-t8', promptZh: 'Haru 说 "나중에 알려줄게"。你想尊重她并耐心等待，最自然的一句？',                                       choices: [{ text: '응, 나중에 얘기해 줘. 기다릴게.', correct: true }, { text: '지금 말해 줘.',           correct: false }, { text: '싫어. 다 말할 거야.',        correct: false }, { text: '얼마예요?',                correct: false }], explain: '尊重节奏 + 承诺等待' } },
  ],
};
