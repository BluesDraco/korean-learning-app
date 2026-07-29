/**
 * 韩国姓名库。
 * 数据分两类：
 *   - common: 韩国常见现代名，来源于韩国大法院公布的历年新生儿姓名 Top 榜。
 *   - created: AI 创作名，采用真实韩文汉字构词逻辑组合，寓意美好、发音自然。
 *
 * 姓氏：韩国 2015 年人口普查 Top 20 真实姓氏。
 */

export interface KoreanSurname {
  hangul: string;
  roman: string;
  hanja: string;
  percentage: number; // 占韩国人口比例
}

export type NameSource = 'common' | 'created';
export type NameStyle = 'classic' | 'modern' | 'idol' | 'literary';
export type Gender = 'M' | 'F' | 'U'; // U = 中性名，男女通用

export interface KoreanName {
  hangul: string;
  roman: string;
  hanja: string;         // 汉字写法（可能为空——现代韩国名有些不指定汉字）
  meaning: string;       // 汉字含义 / 词根含义
  gender: Gender;
  style: NameStyle[];
  source: NameSource;
  era?: string;          // "1990s" / "2000s" / "2010s" / "朝鲜王朝" / "世代通用"
  reason: string;        // 展示给用户看的"为什么取这个"，需含来源标注
}

// ═════════════ 姓氏（2015 人口普查 Top 20） ═════════════
export const SURNAMES: KoreanSurname[] = [
  { hangul: '김', roman: 'Kim',   hanja: '金', percentage: 21.5 },
  { hangul: '이', roman: 'Lee',   hanja: '李', percentage: 14.7 },
  { hangul: '박', roman: 'Park',  hanja: '朴', percentage: 8.4  },
  { hangul: '최', roman: 'Choi',  hanja: '崔', percentage: 4.7  },
  { hangul: '정', roman: 'Jung',  hanja: '鄭', percentage: 4.3  },
  { hangul: '강', roman: 'Kang',  hanja: '姜', percentage: 2.4  },
  { hangul: '조', roman: 'Cho',   hanja: '趙', percentage: 2.1  },
  { hangul: '윤', roman: 'Yoon',  hanja: '尹', percentage: 2.1  },
  { hangul: '장', roman: 'Jang',  hanja: '張', percentage: 2.0  },
  { hangul: '임', roman: 'Lim',   hanja: '林', percentage: 1.7  },
  { hangul: '한', roman: 'Han',   hanja: '韓', percentage: 1.4  },
  { hangul: '오', roman: 'Oh',    hanja: '吳', percentage: 1.4  },
  { hangul: '서', roman: 'Seo',   hanja: '徐', percentage: 1.3  },
  { hangul: '신', roman: 'Shin',  hanja: '申', percentage: 1.3  },
  { hangul: '권', roman: 'Kwon',  hanja: '權', percentage: 1.3  },
  { hangul: '황', roman: 'Hwang', hanja: '黃', percentage: 1.3  },
  { hangul: '안', roman: 'Ahn',   hanja: '安', percentage: 1.2  },
  { hangul: '송', roman: 'Song',  hanja: '宋', percentage: 1.4  },
  { hangul: '류', roman: 'Ryu',   hanja: '柳', percentage: 1.3  },
  { hangul: '홍', roman: 'Hong',  hanja: '洪', percentage: 1.1  },
];

// ═════════════ 名字库（分文件维护，主文件负责合并导出） ═════════════
import { COMMON_NAMES } from './korean-names.common';
import { CREATED_NAMES } from './korean-names.created';

export const NAMES: KoreanName[] = [
  ...COMMON_NAMES,
  ...CREATED_NAMES,
];

export function getSourceLabel(source: NameSource): string {
  switch (source) {
    case 'common':  return '韩国常见现代名';
    case 'created': return 'AI 创作名';
  }
}

export function getGenderLabel(gender: Gender): string {
  switch (gender) {
    case 'M': return '男名';
    case 'F': return '女名';
    case 'U': return '中性名';
  }
}

export function getStyleLabel(style: NameStyle): string {
  switch (style) {
    case 'classic':  return '古典';
    case 'modern':   return '现代';
    case 'idol':     return '偶像风';
    case 'literary': return '文艺';
  }
}
