import type { ComponentType } from 'react';

export interface NavChild {
  label: string;
  ko: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  comingSoon?: boolean;
}

export interface NavGroup {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  ko: string;
  href: string;
  children: NavChild[];
}

import {
  Sparkles, Library, Wrench, GraduationCap, Compass,
  BookOpen, Play, TrendingUp,
  MessageSquare, FileText, Mic, BookImage,
  PenLine, Search, Keyboard, RefreshCw,
  Grid3X3, Languages, Lightbulb,
  Tv, StickyNote, Dumbbell, Layers,
} from 'lucide-react';

export const navGroups: NavGroup[] = [
  {
    icon: Sparkles, label: '今日', ko: '오늘', href: '/daily', children: [
      { label: '今日工作台', ko: '오늘의 학습', href: '/daily', icon: Sparkles },
      { label: '继续学习', ko: '이어서', href: '/course', icon: Play },
      { label: '继续阅读', ko: '읽기 계속', href: '/reading', icon: BookOpen },
      { label: '今日复习', ko: '오늘 복습', href: '/review', icon: RefreshCw },
      { label: '学习概览', ko: '학습 개요', href: '/stats', icon: TrendingUp },
    ],
  },
  {
    icon: Library, label: '我的', ko: '내 정보', href: '/mine', children: [
      { label: '我的词', ko: '내 단어', href: '/vocabulary', icon: BookOpen },
      { label: '我的句子', ko: '내 문장', href: '/vocabulary?tab=sentences', icon: MessageSquare },
      { label: '我的文章', ko: '내 글', href: '/mine/articles', icon: FileText },
      { label: '我的笔记', ko: '내 노트', href: '/mine/notes', icon: StickyNote },
      { label: '我的练习', ko: '내 연습', href: '/mine/practices', icon: Dumbbell },
      { label: '我的录音', ko: '내 녹음', href: '/mine/recordings', icon: Mic },
      { label: '我的日记', ko: '내 일기', href: '/mine/diary', icon: PenLine },
      { label: '我的成就', ko: '내 성과', href: '/stats', icon: TrendingUp },
      { label: '消息', ko: '메시지', href: '/messages', icon: MessageSquare },
    ],
  },
  {
    icon: Wrench, label: '工具', ko: '도구', href: '/tools', children: [
      { label: '内容拆解', ko: '내용 분석', href: '/ai/analyze', icon: Sparkles },
      { label: '查词翻译', ko: '사전', href: '/dictionary', icon: Search },
      { label: '发音跟读', ko: '발음 연습', href: '/pronunciation', icon: Mic },
      { label: '闪卡复习', ko: 'SRS 복습', href: '/review', icon: RefreshCw },
      { label: '文章拆解', ko: '읽기 분석', href: '/reading', icon: FileText },
      { label: '语法解释', ko: '문법 설명', href: '/grammar', icon: Languages },
      { label: '韩文打字', ko: '한글 타자', href: '/typing', icon: Keyboard },
      { label: '写作练习', ko: '작문', href: '/writing', icon: PenLine },
      { label: 'AI场景陪练', ko: 'AI 대화', href: '/ai/chat', icon: MessageSquare },
      { label: '自由对话', ko: '자유 대화', href: '/ai/voice', icon: MessageSquare },
    ],
  },
  {
    icon: GraduationCap, label: '学习', ko: '학습', href: '/learning', children: [
      { label: '30天入门模板', ko: '30일 입문', href: '/course', icon: GraduationCap },
      { label: '韩文字母入门', ko: '한글 입문', href: '/phonetics', icon: Grid3X3 },
      { label: '常用场景模板', ko: '상황별 템플릿', href: '/learn', icon: Layers },
      { label: 'TOPIK备考模板', ko: 'TOPIK', href: '/topik', icon: FileText },
      { label: '发音入门模板', ko: '발음 입문', href: '/pronunciation', icon: Mic },
      { label: '阅读入门模板', ko: '읽기 입문', href: '/reading', icon: BookOpen },
      { label: '写作入门模板', ko: '작문 입문', href: '/writing', icon: PenLine },
    ],
  },
  {
    icon: Compass, label: '探索', ko: '탐색', href: '/explore', children: [
      { label: '影子跟读', ko: '섀도잉', href: '/shadowing', icon: Mic, comingSoon: true },
      { label: 'Tori绘本馆', ko: '토리 그림책', href: '/learn/picture-books', icon: BookImage },
      { label: '韩国小知识', ko: '한국 지식', href: '/knowledge', icon: Lightbulb },
      { label: '韩剧表达', ko: '드라마 표현', href: '/korea/drama', icon: Tv, comingSoon: true },
    ],
  },
];
