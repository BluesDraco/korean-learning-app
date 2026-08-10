import type { WordEntry } from '@/types';

// Advanced vocabulary (TOPIK levels 5-6) — ~180 entries
export const advancedEntries: WordEntry[] = [

  // ═══════════════════════════════════════════════════════════════
  // ECONOMICS & BUSINESS 经济商业
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'econ-01', korean: '경제', romanization: 'gyeongje', baseForm: '경제', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '经济', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '한국 경제가 성장하고 있어요.', chinese: '韩国经济在增长。', scene: '社会' },
      { korean: '경제 신문을 읽는 습관이 있어요.', chinese: '有读经济新闻的习惯。', scene: '职场' },
    ],
    tags: ['经济', '社会'], emotionTags: [], relatedWords: ['econ-02'],
  },
  {
    id: 'econ-02', korean: '소비', romanization: 'sobi', baseForm: '소비', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '消费', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '소비 습관을 바꿨어요.', chinese: '改变了消费习惯。', scene: '日常' },
      { korean: '과소비를 줄여야 해요.', chinese: '要减少过度消费。', scene: '日常' },
    ],
    tags: ['经济', '日常'], emotionTags: [], relatedWords: ['econ-01'],
  },
  {
    id: 'econ-03', korean: '수입', romanization: 'suip', baseForm: '수입', partOfSpeech: '名词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '收入', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '수입이 늘었어요.', chinese: '收入增加了。', scene: '职场' },
      { korean: '월 수입이 얼마예요?', chinese: '月收入多少？', scene: '职场' },
    ],
    tags: ['经济', '职场'], emotionTags: [], relatedWords: ['econ-04'],
  },
  {
    id: 'econ-04', korean: '지출', romanization: 'jichul', baseForm: '지출', partOfSpeech: '名词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '支出', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '이번 달 지출이 많아요.', chinese: '这个月支出很多。', scene: '日常' },
      { korean: '지출을 줄여야 해요.', chinese: '要减少支出。', scene: '日常' },
    ],
    tags: ['经济', '日常'], emotionTags: [], relatedWords: ['econ-03'],
  },
  {
    id: 'econ-05', korean: '투자', romanization: 'tuja', baseForm: '투자', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '投资', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '주식에 투자하고 있어요.', chinese: '在投资股票。', scene: '经济' },
      { korean: '자기 계발에 투자하세요.', chinese: '请投资自我成长。', scene: '日常' },
    ],
    tags: ['经济', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'econ-06', korean: '보험', romanization: 'boheom', baseForm: '보험', partOfSpeech: '名词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '保险', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '건강 보험에 가입했어요.', chinese: '加入了健康保险。', scene: '行政' },
      { korean: '보험료가 얼마예요?', chinese: '保险费多少？', scene: '行政' },
    ],
    tags: ['经济', '行政'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'econ-07', korean: '계약', romanization: 'gyeyak', baseForm: '계약', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '合同/签约', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '계약서를 확인했어요.', chinese: '确认了合同。', scene: '职场' },
      { korean: '계약 기간이 1년이에요.', chinese: '合同期是一年。', scene: '职场' },
    ],
    tags: ['职场', '行政'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'econ-08', korean: '세금', romanization: 'segeum', baseForm: '세금', partOfSpeech: '名词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '税金/税', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '세금이 너무 많아요.', chinese: '税太多了。', scene: '日常' },
      { korean: '세금 신고 했어요?', chinese: '报税了吗？', scene: '行政' },
    ],
    tags: ['经济', '行政'], emotionTags: ['不满'], relatedWords: [],
  },
  {
    id: 'econ-09', korean: '물가', romanization: 'mulga', baseForm: '물가', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '物价', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '물가가 많이 올랐어요.', chinese: '物价涨了很多。', scene: '日常' },
      { korean: '서울은 물가가 비싸요.', chinese: '首尔物价贵。', scene: '日常' },
    ],
    tags: ['经济', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'econ-10', korean: '대출', romanization: 'daechul', baseForm: '대출', partOfSpeech: '名词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '贷款', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '은행에서 대출 받았어요.', chinese: '从银行贷了款。', scene: '经济' },
      { korean: '대출 이자가 높아요.', chinese: '贷款利息很高。', scene: '经济' },
    ],
    tags: ['经济'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // POLITICS & LAW 政治法律
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'pol-01', korean: '법', romanization: 'beop', baseForm: '법', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '法律', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '법을 지켜야 해요.', chinese: '必须守法。', scene: '社会' },
      { korean: '새로운 법이 시행됐어요.', chinese: '新法律开始施行了。', scene: '社会' },
    ],
    tags: ['社会', '政治'], emotionTags: [], relatedWords: ['pol-02'],
  },
  {
    id: 'pol-02', korean: '권리', romanization: 'gwolli', baseForm: '권리', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '权利', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '소비자 권리를 지켜야 해요.', chinese: '必须保护消费者权利。', scene: '社会' },
      { korean: '권리를 주장하세요.', chinese: '请主张您的权利。', scene: '社会' },
    ],
    tags: ['社会', '政治'], emotionTags: [], relatedWords: ['pol-01'],
  },
  {
    id: 'pol-03', korean: '책임', romanization: 'chaegim', baseForm: '책임', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '责任', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '책임감을 가지고 일하세요.', chinese: '请带着责任感工作。', scene: '职场' },
      { korean: '이건 제 책임이에요.', chinese: '这是我的责任。', scene: '日常' },
    ],
    tags: ['社会', '职场'], emotionTags: [], relatedWords: ['pol-04'],
  },
  {
    id: 'pol-04', korean: '의무', romanization: 'uimu', baseForm: '의무', partOfSpeech: '名词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '义务', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '국민의 의무를 다해야 해요.', chinese: '要尽到国民的义务。', scene: '社会' },
      { korean: '의무 교육이에요.', chinese: '是义务教育。', scene: '学校' },
    ],
    tags: ['社会', '政治'], emotionTags: [], relatedWords: ['pol-03'],
  },
  {
    id: 'pol-05', korean: '정책', romanization: 'jeongchaek', baseForm: '정책', partOfSpeech: '名词',
    level: '6', frequency: 3,
    meanings: [{ chinese: '政策', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '정부가 새로운 정책을 발표했어요.', chinese: '政府发布了新政策。', scene: '社会' },
      { korean: '이 정책에 대해 어떻게 생각해요?', chinese: '对这个政策怎么看？', scene: '社会' },
    ],
    tags: ['政治', '社会'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'pol-06', korean: '선거', romanization: 'seongeo', baseForm: '선거', partOfSpeech: '名词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '选举', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '다음 주에 선거가 있어요.', chinese: '下周有选举。', scene: '社会' },
      { korean: '선거에 참여하는 것이 중요해요.', chinese: '参与选举很重要。', scene: '社会' },
    ],
    tags: ['政治', '社会'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'pol-07', korean: '범죄', romanization: 'beomjoe', baseForm: '범죄', partOfSpeech: '名词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '犯罪', nuance: '负面', register: '通用' }],
    examples: [
      { korean: '범죄 예방이 중요해요.', chinese: '预防犯罪很重要。', scene: '社会' },
      { korean: '범죄율이 낮아졌어요.', chinese: '犯罪率降低了。', scene: '社会' },
    ],
    tags: ['社会'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // SCIENCE & TECHNOLOGY 科学技术
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'sci-01', korean: '기술', romanization: 'gisul', baseForm: '기술', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '技术', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '기술이 빠르게 발전하고 있어요.', chinese: '技术在快速发展。', scene: '科技' },
      { korean: '새로운 기술을 배우고 싶어요.', chinese: '想学习新技术。', scene: '职场' },
    ],
    tags: ['科技', '职场'], emotionTags: [], relatedWords: ['sci-02'],
  },
  {
    id: 'sci-02', korean: '인공지능', romanization: 'ingongjineung', baseForm: '인공지능', partOfSpeech: '名词',
    level: '6', frequency: 3,
    meanings: [{ chinese: '人工智能', nuance: '前沿术语', register: '通用' }],
    examples: [
      { korean: '인공지능 시대가 왔어요.', chinese: '人工智能时代来了。', scene: '科技' },
      { korean: '인공지능을 활용해요.', chinese: '利用人工智能。', scene: '职场' },
    ],
    tags: ['科技', '职场'], emotionTags: [], relatedWords: ['sci-01'],
  },
  {
    id: 'sci-03', korean: '데이터', romanization: 'deiteo', baseForm: '데이터', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '数据', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '데이터를 분석해 보세요.', chinese: '请分析一下数据。', scene: '职场' },
      { korean: '데이터가 없어요.', chinese: '没有数据。', scene: '科技' },
    ],
    tags: ['科技', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'sci-04', korean: '실험', romanization: 'silheom', baseForm: '실험', partOfSpeech: '名词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '实验/试验', nuance: '学术', register: '通用' }],
    examples: [
      { korean: '실험 결과가 나왔어요.', chinese: '实验结果出来了。', scene: '学术' },
      { korean: '실험을 반복해야 해요.', chinese: '需要重复实验。', scene: '学术' },
    ],
    tags: ['学术', '科技'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'sci-05', korean: '발명', romanization: 'balmyeong', baseForm: '발명', partOfSpeech: '名词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '发明', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '이것은 위대한 발명이에요.', chinese: '这是伟大的发明。', scene: '科技' },
      { korean: '새로운 제품을 발명했어요.', chinese: '发明了新产品。', scene: '科技' },
    ],
    tags: ['科技'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'sci-06', korean: '우주', romanization: 'uju', baseForm: '우주', partOfSpeech: '名词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '宇宙', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '우주가 정말 신비로워요.', chinese: '宇宙真的很神秘。', scene: '科技' },
      { korean: '우주 여행이 가능해질까요?', chinese: '太空旅行会变成可能吗？', scene: '科技' },
    ],
    tags: ['科技', '自然'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // PHILOSOPHY & THOUGHT 思想哲学
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'think-01', korean: '가치', romanization: 'gachi', baseForm: '가치', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '价值', nuance: '抽象', register: '通用' }],
    examples: [
      { korean: '가치 있는 삶을 살고 싶어요.', chinese: '想过有价值的人生。', scene: '日常' },
      { korean: '돈보다 중요한 가치가 있어요.', chinese: '有比钱更重要的价值。', scene: '社会' },
    ],
    tags: ['哲学', '日常'], emotionTags: [], relatedWords: ['think-02'],
  },
  {
    id: 'think-02', korean: '의미', romanization: 'uimi', baseForm: '의미', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '意义/意思', nuance: '抽象', register: '通用' }],
    examples: [
      { korean: '이 단어의 의미가 뭐예요?', chinese: '这个词的意思是什么？', scene: '学校' },
      { korean: '삶의 의미를 찾고 있어요.', chinese: '在寻找人生的意义。', scene: '日常' },
    ],
    tags: ['哲学', '学校'], emotionTags: [], relatedWords: ['think-01'],
  },
  {
    id: 'think-03', korean: '존재', romanization: 'jonjae', baseForm: '존재', partOfSpeech: '名词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '存在', nuance: '哲学/抽象', register: '通用' }],
    examples: [
      { korean: '존재만으로도 고마워요.', chinese: '光是存在就已经很感谢了。', scene: '表白情感' },
      { korean: '신의 존재를 믿어요?', chinese: '你相信神的存在吗？', scene: '社会' },
    ],
    tags: ['哲学', '社会'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'think-04', korean: '인생', romanization: 'insaeng', baseForm: '인생', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '人生/一生', nuance: '抽象', register: '通用' }],
    examples: [
      { korean: '인생은 짧아요.', chinese: '人生短暂。', scene: '日常' },
      { korean: '인생의 목표가 뭐예요?', chinese: '人生的目标是什么？', scene: '日常' },
    ],
    tags: ['哲学', '日常'], emotionTags: [], relatedWords: ['think-01'],
  },
  {
    id: 'think-05', korean: '행복', romanization: 'haengbok', baseForm: '행복', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '幸福', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '행복하게 살고 싶어요.', chinese: '想过幸福的生活。', scene: '日常' },
      { korean: '행복은 가까이에 있어요.', chinese: '幸福就在身边。', scene: '日常' },
    ],
    tags: ['哲学', '表白情感'], emotionTags: ['开心'], relatedWords: ['think-04'],
  },
  {
    id: 'think-06', korean: '고민', romanization: 'gomin', baseForm: '고민', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '烦恼/苦闷', nuance: '中性偏负面', register: '通用' }],
    examples: [
      { korean: '요즘 고민이 많아요.', chinese: '最近烦恼很多。', scene: '日常' },
      { korean: '고민을 털어놓으세요.', chinese: '请把烦恼说出来。', scene: '社交' },
    ],
    tags: ['日常', '表白情感'], emotionTags: ['伤心', '紧张'], relatedWords: [],
  },
  {
    id: 'think-07', korean: '태도', romanization: 'taedo', baseForm: '태도', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '态度', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '태도가 중요해요.', chinese: '态度很重要。', scene: '职场' },
      { korean: '긍정적인 태도를 가지세요.', chinese: '请保持积极的态度。', scene: '日常' },
    ],
    tags: ['职场', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'think-08', korean: '이유', romanization: 'iyu', baseForm: '이유', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '原因/理由', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '이유가 뭐예요?', chinese: '理由是什么？', scene: '日常' },
      { korean: '아무 이유 없이 좋아해요.', chinese: '没有理由地喜欢。', scene: '表白情感' },
    ],
    tags: ['日常', '表白情感'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'think-09', korean: '한계', romanization: 'hangye', baseForm: '한계', partOfSpeech: '名词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '界限/极限', nuance: '中性/抽象', register: '通用' }],
    examples: [
      { korean: '인간의 한계를 넘어서.', chinese: '超越人类的极限。', scene: '哲学' },
      { korean: '한계를 극복하세요.', chinese: '请克服极限。', scene: '日常' },
    ],
    tags: ['哲学', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'think-10', korean: '자유', romanization: 'jayu', baseForm: '자유', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '自由', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '자유롭게 살고 싶어요.', chinese: '想自由地生活。', scene: '日常' },
      { korean: '표현의 자유는 중요해요.', chinese: '表达自由很重要。', scene: '社会' },
    ],
    tags: ['哲学', '社会'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // ADVANCED VERBS 高级动词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'averb-01', korean: '분석하다', romanization: 'bunseokhada', baseForm: '분석하다', partOfSpeech: '动词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '分析', nuance: '正式/学术', register: '通用' }],
    examples: [
      { korean: '데이터를 분석해 주세요.', chinese: '请分析数据。', scene: '职场' },
      { korean: '상황을 분석하고 있어요.', chinese: '正在分析情况。', scene: '日常' },
    ],
    tags: ['学术', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'averb-02', korean: '판단하다', romanization: 'pandanhada', baseForm: '판단하다', partOfSpeech: '动词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '判断', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '스스로 판단하세요.', chinese: '请自己判断。', scene: '日常' },
      { korean: '옳고 그름을 판단해야 해요.', chinese: '要判断对错。', scene: '社会' },
    ],
    tags: ['日常', '社会'], emotionTags: [], relatedWords: ['averb-03'],
  },
  {
    id: 'averb-03', korean: '평가하다', romanization: 'pyeonggahada', baseForm: '평가하다', partOfSpeech: '动词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '评价/评估', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '업무를 평가해 주세요.', chinese: '请评价工作。', scene: '职场' },
      { korean: '자기 평가서를 썼어요.', chinese: '写了自我评价。', scene: '职场' },
    ],
    tags: ['职场', '学校'], emotionTags: [], relatedWords: ['averb-02'],
  },
  {
    id: 'averb-04', korean: '논의하다', romanization: 'nonuihada', baseForm: '논의하다', partOfSpeech: '动词',
    level: '6', frequency: 3,
    meanings: [{ chinese: '讨论/商议', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '회의에서 논의했어요.', chinese: '在会议上讨论了。', scene: '职场' },
      { korean: '이 문제를 같이 논의할까요?', chinese: '一起讨论这个问题吧？', scene: '社会' },
    ],
    tags: ['职场', '社会'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'averb-05', korean: '주장하다', romanization: 'jujanghada', baseForm: '주장하다', partOfSpeech: '动词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '主张/坚持', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '자기 의견을 주장하세요.', chinese: '请坚持自己的意见。', scene: '职场' },
      { korean: '학자가 새로운 이론을 주장했어요.', chinese: '学者主张了新理论。', scene: '学术' },
    ],
    tags: ['职场', '学术'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'averb-06', korean: '인정하다', romanization: 'injeonghada', baseForm: '인정하다', partOfSpeech: '动词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '承认/认可', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '실수를 인정했어요.', chinese: '承认了错误。', scene: '日常' },
      { korean: '실력을 인정받았어요.', chinese: '实力得到了认可。', scene: '职场' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'averb-07', korean: '극복하다', romanization: 'geukbokhada', baseForm: '극복하다', partOfSpeech: '动词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '克服/战胜', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '어려움을 극복했어요.', chinese: '克服了困难。', scene: '日常' },
      { korean: '한계를 극복하세요.', chinese: '请克服极限。', scene: '日常' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'averb-08', korean: '유발하다', romanization: 'yubalhada', baseForm: '유발하다', partOfSpeech: '动词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '引发/诱发', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '스트레스가 병을 유발해요.', chinese: '压力会引发疾病。', scene: '健康' },
      { korean: '오해를 유발할 수 있어요.', chinese: '可能引发误会。', scene: '社会' },
    ],
    tags: ['社会', '健康'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'averb-09', korean: '전망하다', romanization: 'jeonmanghada', baseForm: '전망하다', partOfSpeech: '动词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '展望/预测', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '경제 성장을 전망하고 있어요.', chinese: '在预测经济增长。', scene: '经济' },
      { korean: '밝은 미래를 전망해요.', chinese: '展望光明的未来。', scene: '日常' },
    ],
    tags: ['经济', '社会'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'averb-10', korean: '확보하다', romanization: 'hwakbohada', baseForm: '확보하다', partOfSpeech: '动词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '确保/获得', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '예산을 확보했어요.', chinese: '确保了预算。', scene: '职场' },
      { korean: '자리를 확보해 주세요.', chinese: '请确保位置。', scene: '日常' },
    ],
    tags: ['职场', '行政'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'averb-11', korean: '실천하다', romanization: 'silcheonhada', baseForm: '실천하다', partOfSpeech: '动词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '实践/实行', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '계획을 실천하세요.', chinese: '请实践计划。', scene: '日常' },
      { korean: '말보다 실천이 중요해요.', chinese: '实践比说更重要。', scene: '日常' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'averb-12', korean: '조사하다', romanization: 'josahada', baseForm: '조사하다', partOfSpeech: '动词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '调查', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '사고 원인을 조사 중이에요.', chinese: '正在调查事故原因。', scene: '社会' },
      { korean: '설문 조사했어요.', chinese: '做了问卷调查。', scene: '学术' },
    ],
    tags: ['学术', '社会'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // ADVANCED ADJECTIVES 高级形容词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aadj-01', korean: '효율적', romanization: 'hyoyuljeok', baseForm: '효율적', partOfSpeech: '形容词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '有效率的', nuance: '正面/正式', register: '通用' }],
    examples: [
      { korean: '효율적인 방법을 찾아요.', chinese: '寻找有效率的方法。', scene: '职场' },
      { korean: '시간을 효율적으로 쓰세요.', chinese: '请有效率地使用时间。', scene: '日常' },
    ],
    tags: ['职场', '日常'], emotionTags: [], relatedWords: ['aadj-02'],
  },
  {
    id: 'aadj-02', korean: '비효율적', romanization: 'bihyoyuljeok', baseForm: '비효율적', partOfSpeech: '形容词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '效率低的', nuance: '负面', register: '通用' }],
    examples: [
      { korean: '이런 방식은 비효율적이에요.', chinese: '这种方式效率低。', scene: '职场' },
    ],
    tags: ['职场'], emotionTags: ['不满'], relatedWords: ['aadj-01'],
  },
  {
    id: 'aadj-03', korean: '구체적', romanization: 'guchejeok', baseForm: '구체적', partOfSpeech: '形容词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '具体的', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '구체적인 계획을 세우세요.', chinese: '请制定具体的计划。', scene: '职场' },
      { korean: '좀 더 구체적으로 말해 주세요.', chinese: '请说得更具体一些。', scene: '日常' },
    ],
    tags: ['职场', '日常'], emotionTags: [], relatedWords: ['aadj-04'],
  },
  {
    id: 'aadj-04', korean: '추상적', romanization: 'chusangjeok', baseForm: '추상적', partOfSpeech: '形容词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '抽象的', nuance: '正式/学术', register: '通用' }],
    examples: [
      { korean: '이 개념은 너무 추상적이에요.', chinese: '这个概念太抽象了。', scene: '学术' },
    ],
    tags: ['学术', '哲学'], emotionTags: [], relatedWords: ['aadj-03'],
  },
  {
    id: 'aadj-05', korean: '적극적', romanization: 'jeokgeukjeok', baseForm: '적극적', partOfSpeech: '形容词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '积极的/主动的', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '적극적으로 참여하세요.', chinese: '请积极参与。', scene: '职场' },
      { korean: '태도가 적극적이에요.', chinese: '态度很积极。', scene: '日常' },
    ],
    tags: ['职场', '日常'], emotionTags: [], relatedWords: ['aadj-06'],
  },
  {
    id: 'aadj-06', korean: '소극적', romanization: 'sogeukjeok', baseForm: '소극적', partOfSpeech: '形容词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '消极的/被动的', nuance: '负面', register: '通用' }],
    examples: [
      { korean: '너무 소극적이지 마세요.', chinese: '不要太消极。', scene: '职场' },
    ],
    tags: ['职场', '日常'], emotionTags: [], relatedWords: ['aadj-05'],
  },
  {
    id: 'aadj-07', korean: '절대적', romanization: 'jeoldaejeok', baseForm: '절대적', partOfSpeech: '形容词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '绝对的', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '절대적인 진리는 없어요.', chinese: '没有绝对的真理。', scene: '哲学' },
      { korean: '절대적으로 믿어요.', chinese: '绝对相信。', scene: '日常' },
    ],
    tags: ['哲学', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadj-08', korean: '상대적', romanization: 'sangdaejeok', baseForm: '상대적', partOfSpeech: '形容词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '相对的', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '행복은 상대적인 거예요.', chinese: '幸福是相对的。', scene: '哲学' },
    ],
    tags: ['哲学', '日常'], emotionTags: [], relatedWords: ['aadj-07'],
  },
  {
    id: 'aadj-09', korean: '합리적', romanization: 'hamnijeok', baseForm: '합리적', partOfSpeech: '形容词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '合理的', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '합리적인 가격이에요.', chinese: '是合理的价格。', scene: '购物' },
      { korean: '합리적으로 생각하세요.', chinese: '请理性思考。', scene: '日常' },
    ],
    tags: ['日常', '购物'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadj-10', korean: '민감하다', romanization: 'mingamhada', baseForm: '민감하다', partOfSpeech: '形容词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '敏感', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '피부가 민감해요.', chinese: '皮肤很敏感。', scene: '健康' },
      { korean: '남의 말에 너무 민감해요.', chinese: '对别人的话太敏感了。', scene: '社交' },
    ],
    tags: ['健康', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadj-11', korean: '확실하다', romanization: 'hwaksilhada', baseForm: '확실하다', partOfSpeech: '形容词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '确实/确定', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '확실한 정보만 알려 주세요.', chinese: '请只告诉确实的信息。', scene: '职场' },
      { korean: '확실해요?', chinese: '确定吗？', scene: '日常' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadj-12', korean: '엄격하다', romanization: 'eomgyeokhada', baseForm: '엄격하다', partOfSpeech: '形容词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '严格/严厉', nuance: '偏负面', register: '通用' }],
    examples: [
      { korean: '규칙이 엄격해요.', chinese: '规则很严格。', scene: '社会' },
      { korean: '우리 아버지는 엄격하세요.', chinese: '我爸爸很严厉。', scene: '家庭' },
    ],
    tags: ['社会', '家庭'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadj-13', korean: '유능하다', romanization: 'yuneunghada', baseForm: '유능하다', partOfSpeech: '形容词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '能干/有能力', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '유능한 직원이에요.', chinese: '是能干的职员。', scene: '职场' },
      { korean: '유능하게 처리했어요.', chinese: '处理得很好。', scene: '职场' },
    ],
    tags: ['职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadj-14', korean: '과장되다', romanization: 'gwajangdoeda', baseForm: '과장되다', partOfSpeech: '形容词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '夸张的', nuance: '负面', register: '通用' }],
    examples: [
      { korean: '그 말은 좀 과장된 것 같아요.', chinese: '那句话好像有点夸张。', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadj-15', korean: '필수적', romanization: 'pilsujeok', baseForm: '필수적', partOfSpeech: '形容词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '必须的/必需的', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '한국어가 필수적이에요.', chinese: '韩语是必须的。', scene: '职场' },
      { korean: '필수적인 조건이에요.', chinese: '是必须的条件。', scene: '行政' },
    ],
    tags: ['职场', '行政'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // ADVANCED NOUNS 高级名词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'anoun-01', korean: '현상', romanization: 'hyeonsang', baseForm: '현상', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '现象', nuance: '正式/学术', register: '通用' }],
    examples: [
      { korean: '자연 현상을 관찰해요.', chinese: '观察自然现象。', scene: '学术' },
      { korean: '요즘 이상한 현상이 많아요.', chinese: '最近奇怪的现象很多。', scene: '社会' },
    ],
    tags: ['学术', '社会'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'anoun-02', korean: '원인', romanization: 'wonin', baseForm: '원인', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '原因', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '사고 원인을 조사해요.', chinese: '调查事故原因。', scene: '社会' },
      { korean: '원인을 모르겠어요.', chinese: '不知道原因。', scene: '日常' },
    ],
    tags: ['日常', '社会'], emotionTags: [], relatedWords: ['anoun-03'],
  },
  {
    id: 'anoun-03', korean: '결과', romanization: 'gyeolgwa', baseForm: '결과', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '结果', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '시험 결과 나왔어요.', chinese: '考试结果出来了。', scene: '学校' },
      { korean: '결과가 어떻게 됐어요?', chinese: '结果怎么样了？', scene: '日常' },
    ],
    tags: ['日常', '学校'], emotionTags: [], relatedWords: ['anoun-02'],
  },
  {
    id: 'anoun-04', korean: '영향', romanization: 'yeonghyang', baseForm: '영향', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '影响', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '환경에 미치는 영향이 커요.', chinese: '对环境的影响很大。', scene: '社会' },
      { korean: '좋은 영향을 받았어요.', chinese: '受到了好的影响。', scene: '日常' },
    ],
    tags: ['社会', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'anoun-05', korean: '기회', romanization: 'gihoe', baseForm: '기회', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '机会', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '좋은 기회를 놓치지 마세요.', chinese: '不要错过好机会。', scene: '日常' },
      { korean: '이번이 마지막 기회예요.', chinese: '这次是最后的机会。', scene: '职场' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'anoun-06', korean: '능력', romanization: 'neungnyeok', baseForm: '능력', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '能力', nuance: '中性/正面', register: '通用' }],
    examples: [
      { korean: '능력을 키우고 싶어요.', chinese: '想培养能力。', scene: '职场' },
      { korean: '한국어 능력이 좋아졌어요.', chinese: '韩语能力变好了。', scene: '学校' },
    ],
    tags: ['职场', '学校'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'anoun-07', korean: '경쟁', romanization: 'gyeongjaeng', baseForm: '경쟁', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '竞争', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '경쟁이 너무 심해요.', chinese: '竞争太激烈了。', scene: '职场' },
      { korean: '경쟁에서 이겼어요.', chinese: '在竞争中赢了。', scene: '日常' },
    ],
    tags: ['职场', '社会'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'anoun-08', korean: '인식', romanization: 'insik', baseForm: '인식', partOfSpeech: '名词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '认识/认知', nuance: '正式/抽象', register: '通用' }],
    examples: [
      { korean: '인식이 바뀌었어요.', chinese: '认识改变了。', scene: '社会' },
      { korean: '문제 인식이 중요해요.', chinese: '问题意识很重要。', scene: '职场' },
    ],
    tags: ['社会', '哲学'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'anoun-09', korean: '추세', romanization: 'chuse', baseForm: '추세', partOfSpeech: '名词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '趋势/倾向', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '최근 추세를 분석했어요.', chinese: '分析了最近的趋势。', scene: '经济' },
      { korean: '이런 추세는 계속될 거예요.', chinese: '这种趋势会持续下去。', scene: '社会' },
    ],
    tags: ['经济', '社会'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'anoun-10', korean: '사고', romanization: 'sago', baseForm: '사고', partOfSpeech: '名词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '事故/思考', nuance: '中性/多义', register: '通用' }],
    examples: [
      { korean: '교통사고가 났어요.', chinese: '出了交通事故。', scene: '出行' },
      { korean: '사고 방지 대책이 필요해요.', chinese: '需要防范事故的对策。', scene: '社会' },
    ],
    tags: ['社会', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'anoun-12', korean: '측면', romanization: 'cheungmyeon', baseForm: '측면', partOfSpeech: '名词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '侧面/方面', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '다른 측면에서 생각해 봐요.', chinese: '从其他方面想想看。', scene: '日常' },
      { korean: '긍정적인 측면도 있어요.', chinese: '也有积极的方面。', scene: '社会' },
    ],
    tags: ['日常', '社会'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'anoun-13', korean: '역할', romanization: 'yeokhal', baseForm: '역할', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '作用/角色', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '각자 역할을 다해야 해요.', chinese: '各自要尽到自己的作用。', scene: '职场' },
      { korean: '무슨 역할 맡았어요?', chinese: '担当了什么角色？', scene: '日常' },
    ],
    tags: ['职场', '社会'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'anoun-14', korean: '전략', romanization: 'jeollyak', baseForm: '전략', partOfSpeech: '名词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '战略/策略', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '마케팅 전략을 세웠어요.', chinese: '制定了营销策略。', scene: '职场' },
      { korean: '전략적으로 접근해야 해요.', chinese: '需要战略性接近。', scene: '职场' },
    ],
    tags: ['职场', '经济'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'anoun-15', korean: '전문가', romanization: 'jeonmunga', baseForm: '전문가', partOfSpeech: '名词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '专家', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '전문가의 의견을 들어 봐요.', chinese: '听听专家的意见吧。', scene: '职场' },
      { korean: '이 분야의 전문가예요.', chinese: '是这个领域的专家。', scene: '职场' },
    ],
    tags: ['职场', '学术'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // ADVANCED ADVERBS 高级副词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aadv-01', korean: '반드시', romanization: 'bandeusi', baseForm: '반드시', partOfSpeech: '副词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '一定/务必', nuance: '强调', register: '通用' }],
    examples: [
      { korean: '반드시 오세요.', chinese: '一定要来。', scene: '日常' },
      { korean: '반드시 지켜야 하는 규칙이에요.', chinese: '是必须遵守的规则。', scene: '社会' },
    ],
    tags: ['日常', '社会'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadv-02', korean: '결코', romanization: 'gyeolko', baseForm: '결코', partOfSpeech: '副词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '绝对/决（不）', nuance: '强调否定', register: '通用' }],
    examples: [
      { korean: '결코 포기하지 않을 거예요.', chinese: '绝对不会放弃。', scene: '日常' },
      { korean: '결코 쉬운 일이 아니에요.', chinese: '绝不是容易的事。', scene: '职场' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadv-03', korean: '어차피', romanization: 'eochapi', baseForm: '어차피', partOfSpeech: '副词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '反正/横竖', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '어차피 늦었으니까 천천히 가요.', chinese: '反正迟到了，慢慢走吧。', scene: '日常' },
      { korean: '어차피 해야 하는 일이에요.', chinese: '反正是要做的事。', scene: '职场' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadv-04', korean: '과연', romanization: 'gwayeon', baseForm: '과연', partOfSpeech: '副词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '果然/究竟', nuance: '疑问/确认', register: '通用' }],
    examples: [
      { korean: '과연 그럴까요?', chinese: '果然会那样吗？', scene: '日常' },
      { korean: '과연 성공할 수 있을까?', chinese: '究竟能成功吗？', scene: '日常' },
    ],
    tags: ['日常', '学术'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadv-05', korean: '전혀', romanization: 'jeonhyeo', baseForm: '전혀', partOfSpeech: '副词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '完全/一点也（不）', nuance: '强调否定', register: '通用' }],
    examples: [
      { korean: '전혀 몰랐어요.', chinese: '完全不知道。', scene: '日常' },
      { korean: '전혀 문제 없어요.', chinese: '完全没问题。', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadv-06', korean: '상당히', romanization: 'sangdanghi', baseForm: '상당히', partOfSpeech: '副词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '相当/非常', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '상당히 어려운 문제예요.', chinese: '是相当难的问题。', scene: '职场' },
      { korean: '상당히 많은 사람이 왔어요.', chinese: '来了相当多的人。', scene: '日常' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadv-07', korean: '점차', romanization: 'jeomcha', baseForm: '점차', partOfSpeech: '副词',
    level: '6', frequency: 2,
    meanings: [{ chinese: '逐渐/渐渐', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '실력이 점차 늘고 있어요.', chinese: '能力在逐渐提升。', scene: '学校' },
      { korean: '날씨가 점차 따뜻해지고 있어요.', chinese: '天气在逐渐变暖。', scene: '日常' },
    ],
    tags: ['日常', '学校'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadv-08', korean: '차츰', romanization: 'chacheum', baseForm: '차츰', partOfSpeech: '副词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '渐渐/逐步', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '차츰 좋아질 거예요.', chinese: '会渐渐变好的。', scene: '日常' },
      { korean: '차츰차츰 배워 가요.', chinese: '一步一步学下去。', scene: '学校' },
    ],
    tags: ['日常', '学校'], emotionTags: [], relatedWords: ['aadv-07'],
  },
  {
    id: 'aadv-09', korean: '대체로', romanization: 'daechero', baseForm: '대체로', partOfSpeech: '副词',
    level: '5', frequency: 2,
    meanings: [{ chinese: '总体上/大体上', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '대체로 만족해요.', chinese: '总体上满意。', scene: '日常' },
      { korean: '대체로 좋은 결과였어요.', chinese: '总体上是好的结果。', scene: '职场' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'aadv-10', korean: '비교적', romanization: 'bigyojeok', baseForm: '비교적', partOfSpeech: '副词',
    level: '5', frequency: 3,
    meanings: [{ chinese: '比较（地）', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '비교적 쉬운 편이에요.', chinese: '算是比较简单的。', scene: '日常' },
      { korean: '비교적 저렴한 가격이에요.', chinese: '是比较便宜的价格。', scene: '购物' },
    ],
    tags: ['日常', '购物'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // IDIOMS & EXPRESSIONS 惯用语与成语
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'idiom-01', korean: '눈이 높다', romanization: 'nuni nopda', baseForm: '눈이 높다', partOfSpeech: '惯用语',
    level: '5', frequency: 2,
    meanings: [{ chinese: '眼光高/要求高', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '눈이 너무 높아서 아직 결혼 못 했어요.', chinese: '眼光太高所以还没结婚。', scene: '日常' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'idiom-02', korean: '손이 크다', romanization: 'soni keuda', baseForm: '손이 크다', partOfSpeech: '惯用语',
    level: '5', frequency: 2,
    meanings: [{ chinese: '大手大脚/慷慨大方', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '우리 어머니는 손이 크셔서 음식을 많이 만들어요.', chinese: '妈妈很大方所以做很多吃的。', scene: '家庭' },
    ],
    tags: ['日常', '家庭'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'idiom-03', korean: '발이 넓다', romanization: 'bari neopda', baseForm: '발이 넓다', partOfSpeech: '惯用语',
    level: '5', frequency: 3,
    meanings: [{ chinese: '交际广/人脉广', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '그 분은 발이 넓어서 아는 사람이 많아요.', chinese: '他交际广所以认识的人多。', scene: '社交' },
    ],
    tags: ['社交', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'idiom-04', korean: '귀가 얇다', romanization: 'gwiga yalda', baseForm: '귀가 얇다', partOfSpeech: '惯用语',
    level: '5', frequency: 2,
    meanings: [{ chinese: '耳根子软/容易听信别人的话', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '귀가 얇아서 남의 말에 잘 속아요.', chinese: '耳根子软所以容易被别人的话骗。', scene: '日常' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'idiom-05', korean: '입이 무겁다', romanization: 'ibi mugeopda', baseForm: '입이 무겁다', partOfSpeech: '惯用语',
    level: '5', frequency: 2,
    meanings: [{ chinese: '嘴严/守口如瓶', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '걱정 마세요, 저는 입이 무거워요.', chinese: '别担心，我嘴很严。', scene: '社交' },
    ],
    tags: ['社交', '职场'], emotionTags: [], relatedWords: ['idiom-06'],
  },
  {
    id: 'idiom-06', korean: '입이 가볍다', romanization: 'ibi gabyeopda', baseForm: '입이 가볍다', partOfSpeech: '惯用语',
    level: '5', frequency: 2,
    meanings: [{ chinese: '嘴快/不严', nuance: '负面', register: '通用' }],
    examples: [
      { korean: '입이 가벼운 사람한테 말하지 마세요.', chinese: '别对嘴不严的人说。', scene: '社交' },
    ],
    tags: ['社交'], emotionTags: [], relatedWords: ['idiom-05'],
  },
  {
    id: 'idiom-07', korean: '한눈에 반하다', romanization: 'hannune banhada', baseForm: '한눈에 반하다', partOfSpeech: '惯用语',
    level: '5', frequency: 3,
    meanings: [{ chinese: '一见钟情', nuance: '韩剧高频', register: '通用' }],
    examples: [
      { korean: '처음 만났을 때 한눈에 반했어요.', chinese: '第一次见面就一见钟情了。', scene: '表白情感' },
    ],
    tags: ['表白情感', '韩剧'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'idiom-08', korean: '손에 땀을 쥐다', romanization: 'sone ttameul jwida', baseForm: '손에 땀을 쥐다', partOfSpeech: '惯用语',
    level: '5', frequency: 2,
    meanings: [{ chinese: '捏一把汗/紧张', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '경기를 보면서 손에 땀을 쥐었어요.', chinese: '看比赛时捏了一把汗。', scene: '日常' },
    ],
    tags: ['日常', '韩流'], emotionTags: ['紧张'], relatedWords: [],
  },
  {
    id: 'idiom-09', korean: '꿩 먹고 알 먹기', romanization: 'kkwong meokgo al meokgi', baseForm: '꿩 먹고 알 먹기', partOfSpeech: '惯用语',
    level: '6', frequency: 2,
    meanings: [{ chinese: '一举两得', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '공부도 하고 친구도 만나고, 꿩 먹고 알 먹기예요.', chinese: '既学习又见朋友，一举两得。', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'idiom-10', korean: '티끌 모아 태산', romanization: 'tikkeul moa taesan', baseForm: '티끌 모아 태산', partOfSpeech: '惯用语',
    level: '6', frequency: 2,
    meanings: [{ chinese: '积少成多', nuance: '正面/励志', register: '通用' }],
    examples: [
      { korean: '매일 조금씩 저축하면 티끌 모아 태산이에요.', chinese: '每天存一点就是积少成多。', scene: '日常' },
    ],
    tags: ['日常', '经济'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'idiom-11', korean: '가는 말이 고와야 오는 말이 곱다', romanization: 'ganeun mari gowaya oneun mari gopda', baseForm: '가는 말이 고와야 오는 말이 곱다', partOfSpeech: '惯用语',
    level: '6', frequency: 2,
    meanings: [{ chinese: '你说得好听对方才会说得好听/人心换人心', nuance: '教诲', register: '通用' }],
    examples: [
      { korean: '가는 말이 고와야 오는 말이 곱다고, 먼저 친절하게 대하세요.', chinese: '人心换人心，先以亲切待人。', scene: '社交' },
    ],
    tags: ['社交', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'idiom-12', korean: '배보다 배꼽이 더 크다', romanization: 'baeboda baekkobi deo keuda', baseForm: '배보다 배꼽이 더 크다', partOfSpeech: '惯用语',
    level: '6', frequency: 2,
    meanings: [{ chinese: '本末倒置/肚脐比肚子还大（得不偿失）', nuance: '口语', register: '通用' }],
    examples: [
      { korean: '선물 포장 비용이 선물보다 비싸네요. 배보다 배꼽이 더 크네요.', chinese: '包装费比礼物还贵，真是本末倒置。', scene: '日常' },
    ],
    tags: ['日常'], emotionTags: [], relatedWords: [],
  },
];
