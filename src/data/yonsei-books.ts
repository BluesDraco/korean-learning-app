// 类型定义保留供 type-only import 使用。
// 实际数据已迁移到 public/data/yonsei/*.json，运行时走 @/lib/dataLoader 加载。

export interface YonseiExample {
  text: string;
  translation: string;
}

export interface YonseiWord {
  word: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  examples: YonseiExample[];
}

export interface YonseiUnit {
  id: string;
  bookTitle: string;
  unitNumber: number;
  title: string;
  titleKo: string;
  description: string;
  words: YonseiWord[];
}
