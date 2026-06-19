export interface GrammarChapter {
  id: string;
  number: number;
  title: string;
  grammarPointIds: string[];
}

export const grammarChapters: GrammarChapter[] = [
  {
    id: 'ch-01', number: 1, title: '自我介绍与身份',
    grammarPointIds: ['gp-01', 'gp-02', 'gp-03'],
  },
  {
    id: 'ch-02', number: 2, title: '请求与购物',
    grammarPointIds: ['gp-04', 'gp-05', 'gp-06'],
  },
  {
    id: 'ch-03', number: 3, title: '位置与移动',
    grammarPointIds: ['gp-07', 'gp-08', 'gp-09'],
  },
  {
    id: 'ch-04', number: 4, title: '喜好与愿望',
    grammarPointIds: ['gp-10', 'gp-11', 'gp-12'],
  },
  {
    id: 'ch-05', number: 5, title: '基础动词与否定',
    grammarPointIds: ['gp-13', 'gp-14', 'gp-15', 'gp-16'],
  },
  {
    id: 'ch-06', number: 6, title: '提问与助词',
    grammarPointIds: ['gp-17', 'gp-18', 'gp-19', 'gp-20', 'gp-21'],
  },
  {
    id: 'ch-07', number: 7, title: '地点助词辨析',
    grammarPointIds: ['gp-22'],
  },
  {
    id: 'ch-08', number: 8, title: '时态：过去与将来',
    grammarPointIds: ['gp-23', 'gp-24'],
  },
  {
    id: 'ch-09', number: 9, title: '句子连接',
    grammarPointIds: ['gp-25', 'gp-26', 'gp-27'],
  },
  {
    id: 'ch-10', number: 10, title: '条件、能力与尝试',
    grammarPointIds: ['gp-28', 'gp-29', 'gp-30'],
  },
];
