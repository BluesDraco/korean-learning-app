import type { ComponentType } from 'react';

export interface NavChild {
  label: string;
  ko: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

export interface NavGroup {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  ko: string;
  href: string;
  children: NavChild[];
}

import {
  Home, BookOpen, Gamepad2, LayoutGrid, Flower2, Bot, Users2,
  GraduationCap, Grid3X3, FileText, BookImage,
  RefreshCw, Pencil, Mic, Keyboard, PenLine, BarChart3,
  Library,
  Palette, MapPin, UtensilsCrossed,
  MessageSquare, MessageCircle, Search, Sparkles,
  Music, Radio, TrendingUp, Lightbulb,
} from 'lucide-react';

export const navGroups: NavGroup[] = [
  { icon: Home, label: '首页', ko: '홈', href: '/', children: [] },
  {
    icon: BookOpen, label: '学习', ko: '학습', href: '/learn', children: [
      { label: '每日学习', ko: '매일 학습', href: '/learn', icon: GraduationCap },
      { label: '发音', ko: '발음', href: '/phonetics', icon: Grid3X3 },
      { label: '语法库', ko: '문법', href: '/grammar', icon: FileText },
      { label: '绘本学习', ko: '그림책', href: '/learn/picture-books', icon: BookImage },
      { label: '文章阅读', ko: '읽기', href: '/reading', icon: BookOpen },
    ],
  },
  {
    icon: Gamepad2, label: '练习', ko: '연습', href: '/review', children: [
      { label: 'SRS复习', ko: 'SRS 복습', href: '/review', icon: RefreshCw },
      { label: '听写', ko: '받아쓰기', href: '/dictation', icon: Pencil },
      { label: '跟读', ko: '쉐도잉', href: '/shadowing', icon: Mic },
      { label: '打字', ko: '타자', href: '/typing', icon: Keyboard },
      { label: '写作', ko: '작문', href: '/writing', icon: PenLine },
      { label: 'TOPIK模拟', ko: 'TOPIK 모의', href: '/topik', icon: FileText },
      { label: '学习搭子', ko: '학습 친구', href: '/buddy', icon: Users2 },
      { label: '学习统计', ko: '통계', href: '/stats', icon: BarChart3 },
    ],
  },
  {
    icon: LayoutGrid, label: '词汇', ko: '어휘', href: '/vocabulary', children: [
      { label: '我的单词', ko: '내 단어', href: '/vocabulary', icon: BookOpen },
      { label: '词库', ko: '단어장', href: '/vocabulary/library', icon: Library },
      { label: '按等级', ko: '등급별', href: '/vocabulary/levels', icon: TrendingUp },
      { label: '韩语字典', ko: '사전', href: '/dictionary', icon: Search },
    ],
  },
  {
    icon: MessageCircle, label: '表达', ko: '표현', href: '/expressions', children: [
      { label: '口语表达', ko: '구어 표현', href: '/expressions', icon: MessageCircle },
    ],
  },
  {
    icon: Flower2, label: '韩国', ko: '한국', href: '/korea', children: [
      { label: '文化', ko: '문화', href: '/korea/culture', icon: Palette },
      { label: '美食', ko: '음식', href: '/korea/food', icon: UtensilsCrossed },
      { label: '旅行', ko: '여행', href: '/korea/travel', icon: MapPin },
      { label: '知识百科', ko: '지식', href: '/knowledge', icon: Lightbulb },
    ],
  },
  {
    icon: Music, label: 'KPOP', ko: '케이팝', href: '/korea/kpop', children: [
      { label: '韩语歌', ko: '노래', href: '/korea/kpop', icon: Mic },
      { label: '热点资讯', ko: '뉴스', href: '/korea/kpop/news', icon: Radio },
    ],
  },
  {
    icon: Bot, label: 'AI助手', ko: 'AI 도우미', href: '/ai', children: [
      { label: 'AI 总览', ko: 'AI 개요', href: '/ai', icon: Sparkles },
      { label: 'AI 对话', ko: 'AI 대화', href: '/ai/chat', icon: MessageSquare },
      { label: '语音对话', ko: '음성 대화', href: '/ai/voice', icon: Mic },
    ],
  },
];
