import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 27 · 회식 · Minji 请客
 *
 * 剧情：周六晚上 6 点。Minji 期中考试结束："토리, 다음 시험 토리 차례야!"
 * 但是今天她请客。四只动物挤在合井一家烤肉店「불꽃숯불」的角落桌。
 * 一只壮硕的熊店员端来烤盘，肉滋滋作响。
 * 兔莉负责结账时主动说："오늘 제가 낼게요."
 * Minji 一把按住她："아니야! 내가 한턱 낼게."
 * 四人笑着抢付款，最后是 Minji 赢了。
 * 但兔莉学会了——韩国朋友间的"请客文化"。
 *
 * 学习目标：한턱 내다 / 제가 낼게요 / 결제 / 인원수
 * 韩语自审：korean skill PASS (식당 결제 풍습)
 */
export const day27: ToriDay = {
  day: 27,
  phase: 'expression',
  title: '회식 · Minji 请客，我学会抢付',
  subtitle: '4 个动物挤在烤肉店',
  isCheckpoint: null,
  estimatedMin: 13,

  opening: {
    date: '9월 30일 토요일 저녁',
    weather: '首尔 · 凉',
    toriPose: 'happy',
    diaryText: `9월 30日，周六晚 6 点。

Minji 水獭考完试给我发消息：
"토리, 오늘 한턱 낸다! 시간 돼?"
（兔莉，今天我请客！有空吗？）

合井一家烤肉店「불꽃숯불」。
我推开门——
Junho 已经在角落桌占位，
Haru 在抢餐巾纸，
Minji 站起来挥手。

四只动物挤在一张小桌。
一只壮硕的熊店员端来烤盘，
炭火劈啪。

"삼겹살 4인분, 김치찌개 하나 주세요."
（五花肉 4 人份，泡菜汤一份。）

肉上桌的瞬间——
Junho 已经开始烤了。
Haru 抢着剪肉。
Minji 给我倒大麦茶。

吃到一半，
我提议："오늘 제가 낼게요. 부동산 계약 기념으로."
（今天我请客。庆祝租房合同。）

Minji 一把按住我的手：
"아니야 토리! 시험 끝나서 내가 한턱 낼게."
（不行兔莉！考试结束我请。）

Junho 也举手：
"내가 낼게! 응원 보러 같이 가준 거 고마워서."
（我请！谢谢你陪我去应援。）

Haru 最实在：
"그럼 나 다음에 낼게."
（那下次我请。）

四人笑着抢着付款。
熊店员一脸为难。
最后是 Minji 赢了——
她偷偷在 60,000원 上面又押了一张卡。

走出烤肉店，
我对她鞠躬：
"잘 먹었습니다."
（吃饱了。）

Minji 笑："한국에서는 다음 번에 네가 사면 돼."
（在韩国下次你请就行。）

胡萝卜在口袋里安静地点头。
我懂了——
"请客"在韩国不是一次交易，
是一段长长的轮流。`,
  },

  words: [
    {
      id: 'd27-w1',
      korean: '한턱 내다',
      hangul: 'han-teok nae-da',
      zh: '请客 / 做东',
      pos: '表达',
      example: { ko: '오늘 내가 한턱 낼게.', zh: '今天我请客。' },
      tip: '한턱 (一桌) + 내다 (出)。韩国朋友间最高频的"请客"说法',
    },
    {
      id: 'd27-w2',
      korean: '제가 낼게요',
      hangul: 'je-ga nael-ge-yo',
      zh: '我来付 (敬语)',
      pos: '表达',
      example: { ko: '오늘 제가 낼게요.', zh: '今天我付。' },
      tip: '动词「내다」(出) + 「-(으)ㄹ게요」承诺。结账时抢付必备',
    },
    {
      id: 'd27-w3',
      korean: '결제',
      hangul: 'gyeol-je',
      zh: '结账',
      pos: '名词',
      example: { ko: '결제할게요.', zh: '我结账。' },
      tip: 'Day 14 学过。今天升级用 결제하다 (结账)',
    },
    {
      id: 'd27-w4',
      korean: '인분',
      hangul: 'in-bun',
      zh: '人份',
      pos: '名词',
      example: { ko: '삼겹살 4인분 주세요.', zh: '请来 4 人份五花肉。' },
      tip: '韩国烤肉店点肉单位。也用「2인분」「3인분」',
    },
    {
      id: 'd27-w5',
      korean: '잘 먹었습니다',
      hangul: 'jal meo-geot-seum-ni-da',
      zh: '吃饱了 / 谢谢款待',
      pos: '表达',
      example: { ko: '잘 먹었습니다. 감사합니다.', zh: '吃饱了。谢谢款待。' },
      tip: '吃完饭对请客方、店家说的话。和「잘 먹겠습니다」(吃饭前) 是一对',
    },
    {
      id: 'd27-w6',
      korean: '다음에',
      hangul: 'da-eum-e',
      zh: '下次',
      pos: '副词',
      example: { ko: '다음에 네가 사.', zh: '下次你请。' },
      tip: '韩国朋友请客流通货币。「다음에 내가 살게」= 下次我请',
    },
  ],

  dialogue: {
    scene: '불꽃숯불 烤肉店 · 角落桌',
    setting: {
      time: '周六晚 7 点',
      place: '合井 烤肉店',
      npc: 'Minji 水獭 / 熊店员',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '토리! 시험 끝났어. 오늘 내가 한턱 낸다!',
        hangul: 'to-ri! si-heom kkeun-na-sseo. o-neul nae-ga han-teok naen-da',
        zh: '兔莉！考试结束了。今天我请客！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '아니, 오늘 내가 낼게. 부동산 계약 기념으로.',
        hangul: 'a-ni, o-neul nae-ga nael-ge. bu-dong-san gye-yak gi-nyeom-eu-ro',
        zh: '不行，今天我请。庆祝租房合同。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '안 돼! 한국에서는 시험 끝나면 내가 사. 다음에 토리가 사.',
        hangul: 'an dwae! han-gug-e-seo-neun si-heom kkeun-na-myeon nae-ga sa. da-eum-e to-ri-ga sa',
        zh: '不行！在韩国考完试我请。下次你请。',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: '熊店员',
        ko: '계산 도와드릴게요. 60,000원입니다.',
        hangul: 'gye-san do-wa-deu-ril-ge-yo. yuk-man-won-im-ni-da',
        zh: '我帮您结账。60000 元。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Minji 已经把卡递过去了，兔莉应该如何接受这次请客？',
        practice: 'pick',
        choices: [
          { ko: '잘 먹었습니다. 다음엔 제가 살게요.', zh: '吃饱了。下次我请。', correct: true },
          { ko: '아니요, 안 먹어요.', zh: '不用了，我不吃。', correct: false },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '抢付与让付 · 韩国请客文化',
    pattern: 'A 한턱 낼게 / B 제가 낼게요 / 다음에 내가 사',
    whenToUse: '韩国朋友间几乎每顿饭都要抢付。抢得越激烈，关系越亲。学会抢付 = 融入韩国社交。',
    rules: [
      '主动请客："**한턱 낼게**" (半语) / "**한턱 낼게요**" (敬语) — 一句话表达请客',
      '抢付："**제가 낼게요**" / "**제가 살게요**" — 强调"我"承担',
      '推让对方："**다음에 N가 사**" — 下次轮你 (한국 사회 핵심)',
      '吃完致谢："**잘 먹었습니다**" — 不分对请客方还是店家，都说这句',
    ],
    examples: [
      { ko: '오늘 한턱 낼게.', zh: '今天我请。', highlight: '한턱 낼게' },
      { ko: '제가 낼게요.', zh: '我来付。', highlight: '제가 낼게요' },
      { ko: '다음에 내가 살게.', zh: '下次我请。', highlight: '다음에' },
      { ko: '잘 먹었습니다.', zh: '吃饱了，谢谢款待。', highlight: '잘 먹었습니다' },
    ],
    pitfall:
      '韩国请客抢付不是"客气"，是"轮流债务"。你今天让朋友付了，朋友下次见面会真的等你回请。最忌讳：第一次见面就抢着付钱 (太热情) 或永远让朋友付 (会被默默踢出群)。',
  },

  output: [
    {
      id: 'd27-o1',
      kind: 'compose',
      zhHint: '吃饱了。下次我请。',
      tokens: ['잘', '먹었습니다', '다음엔', '제가', '살게요', '잘 먹겠습니다', '한턱'],
      composeAnswer: ['잘', '먹었습니다', '다음엔', '제가', '살게요'],
      successMsg: 'Minji 笑得眼睛弯弯："한국 사람 다 됐네!" (你已经是韩国人了！) ✓',
    },
    {
      id: 'd27-o2',
      kind: 'listen-choice',
      audioKo: '오늘 내가 한턱 낼게.',
      successMsg: '✓ 「今天我请客」。「한턱 내다」是韩国朋友间最高频的"请客"说法。半语「-(으)ㄹ게」承诺。',
      choices: [
        { zh: '今天我请客。', correct: true },
        { zh: '今天我吃饱了。', correct: false },
        { zh: '今天没有钱。', correct: false },
        { zh: '今天考试结束了。', correct: false },
      ],
    },
    {
      id: 'd27-o3',
      kind: 'zh-to-ko',
      zhPrompt: '请来 4 人份五花肉。',
      successMsg: '"4인분" — 数字 + 인분 是韩国烤肉店点肉单位。',
      choices: [
        { ko: '삼겹살 4인분 주세요.', correct: true },
        { ko: '삼겹살 4명 주세요.', correct: false },
        { ko: '삼겹살 4개 주세요.', correct: false },
        { ko: '삼겹살 4잔 주세요.', correct: false },
      ],
    },
    {
      id: 'd27-o4',
      kind: 'particle-error',
      zhHint: '下次你请。(对朋友)',
      successMsg: '「다음에」(下次) + 「네가」(你-主语) + 「사」(买/请客 半语)。最自然的轮流请客句。',
      choices: [
        { ko: '다음에 네가 사.', correct: true },
        { ko: '다음에서 네가 사.', correct: false },
        { ko: '다음에 너를 사.', correct: false },
        { ko: '다음에 네가 사다.', correct: false },
      ],
    },
  ],

  recap: {
    toriPose: 'happy',
    praise: '今天你学会了——请客不是交易，是友情的轮流。',
    preview: '明天独自在家。看着窗外的雨，想给妈妈写第一封韩文日记…',
    stickerId: 'sticker-d27',
  },

  carrotHint:
    '今天的胡萝卜：「韩国请客文化解析」「한턱 vs 사다 区别」「잘 먹겠습니다/잘 먹었습니다 顺序」',
};
