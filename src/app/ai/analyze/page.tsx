'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { speak } from '@/lib/tts';
import { db } from '@/lib/db';
import { stripParticle } from '@/lib/koreanParticles';
import { displayRoman } from '@/lib/dictionary';
import { useRequireLoginAction } from '@/hooks/useRequireLoginAction';
import { useAuth } from '@/components/AuthProvider';
import { knowledgeCategories } from '@/data/knowledge';
import { grammarPoints } from '@/data/grammar';
import { useTheme } from '@/components/ThemeProvider';

const LIGHT_C = {
  ink: '#241917', muted: '#89756e', line: '#eee0d8', pink: '#ff7fa8',
  pinkSoft: '#fff0f5', mint: '#aee3d8', cream: '#fff8f4', black: '#201815',
  mintBg: '#eaf8f5', mintText: '#4e746d', zhText: '#7e6b64',
  shadow: '0 16px 42px rgba(78,52,46,.10)', strong: '0 28px 72px rgba(78,52,46,.18)',
  card: '#fff',
};
const DARK_C = {
  ink: '#F0E8FF', muted: '#B8A8C8', line: '#3A3060', pink: '#ff7fa8',
  pinkSoft: '#2D2848', mint: '#4A6058', cream: '#232040', black: '#3A3060',
  mintBg: '#1E3530', mintText: '#5ecfb8', zhText: '#B8A8C8',
  shadow: '0 16px 42px rgba(78,52,46,.10)', strong: '0 28px 72px rgba(78,52,46,.18)',
  card: '#282440',
};

type Mode = 'learn' | 'deep';

type StructureRole = '主语' | '谓语' | '宾语' | '修饰';
interface StructureItem { role: StructureRole; text: string; meaning: string }
interface ConjugationItem { form: string; example: string }
interface DeepOverview { topic?: string; tone?: string; scenario?: string }
interface CultureNote { anchor: string; explanation: string }

type QuizType = 'meaning' | 'cloze' | 'translate' | 'grammar';
interface QuizQuestion {
  type: QuizType;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  wordHint?: string;
}

interface AnalysisResult {
  original: string;
  fullTranslation: string;
  alternativeTranslations?: Array<{ ko: string; context: string }>;
  alternativeTranslation?: string;
  romanization?: string;
  literalTranslation?: string;
  structure?: StructureItem[];
  words: {
    text: string;
    meaning: string;
    partOfSpeech: string;
    emoji?: string;
    pronunciation?: string;
    romanization?: string;
    example?: string; // deprecated, 保留兼容旧历史记录
    examples?: Array<{ ko: string; zh: string } | string>; // 新版双语，兼容旧 string[]
    synonyms?: string[];
    importance?: '核心' | '常用' | '进阶';
  }[];
  particles: { text: string; explanation: string }[];
  grammar: {
    pattern: string;
    title: string;
    usage: string;
    explanation: string;
    level: string;
    conjugation?: string | ConjugationItem[];
    contrast?: string;
    mistake?: string;
    meaning?: string;
    examples: { ko: string; zh: string }[] | string[];
  }[];
  sentences?: { korean: string; chinese: string; structure?: string }[];
  suggestion?: string;
  difficulty?: string;
  difficultyReason?: string;
  overview?: DeepOverview;
  cultureNotes?: CultureNote[];
  quiz?: QuizQuestion[];
  note?: string;
  _degraded?: boolean;
}

// ── Dictionary ─────────────────────────────────────────
interface DictEntry { pronunciation: string; meaning: string; partOfSpeech: string; emoji: string; }

const commonWords: { word: string; pronunciation: string; meaning: string; partOfSpeech: string; emoji: string }[] = [
  { word: '가다', pronunciation: 'ga-da', meaning: '去', partOfSpeech: '动词', emoji: '🚶' },
  { word: '오다', pronunciation: 'o-da', meaning: '来', partOfSpeech: '动词', emoji: '🚶' },
  { word: '먹다', pronunciation: 'meok-da', meaning: '吃', partOfSpeech: '动词', emoji: '🍽️' },
  { word: '마시다', pronunciation: 'ma-si-da', meaning: '喝', partOfSpeech: '动词', emoji: '🥤' },
  { word: '보다', pronunciation: 'bo-da', meaning: '看', partOfSpeech: '动词', emoji: '👀' },
  { word: '듣다', pronunciation: 'deut-da', meaning: '听', partOfSpeech: '动词', emoji: '👂' },
  { word: '말하다', pronunciation: 'mal-ha-da', meaning: '说', partOfSpeech: '动词', emoji: '💬' },
  { word: '읽다', pronunciation: 'ilk-da', meaning: '读', partOfSpeech: '动词', emoji: '📖' },
  { word: '쓰다', pronunciation: 'sseu-da', meaning: '写/用', partOfSpeech: '动词', emoji: '✏️' },
  { word: '배우다', pronunciation: 'bae-u-da', meaning: '学习', partOfSpeech: '动词', emoji: '📚' },
  { word: '공부하다', pronunciation: 'gong-bu-ha-da', meaning: '学习/读书', partOfSpeech: '动词', emoji: '📚' },
  { word: '하다', pronunciation: 'ha-da', meaning: '做', partOfSpeech: '动词', emoji: '✅' },
  { word: '되다', pronunciation: 'doe-da', meaning: '成为/可以', partOfSpeech: '动词', emoji: '🔄' },
  { word: '있다', pronunciation: 'it-da', meaning: '有/在', partOfSpeech: '动词/形容词', emoji: '📍' },
  { word: '없다', pronunciation: 'eop-da', meaning: '没有/不在', partOfSpeech: '形容词', emoji: '❌' },
  { word: '만들다', pronunciation: 'man-deul-da', meaning: '做/制造', partOfSpeech: '动词', emoji: '🔨' },
  { word: '알다', pronunciation: 'al-da', meaning: '知道', partOfSpeech: '动词', emoji: '💡' },
  { word: '모르다', pronunciation: 'mo-reu-da', meaning: '不知道', partOfSpeech: '动词', emoji: '❓' },
  { word: '생각하다', pronunciation: 'saeng-gak-ha-da', meaning: '想/思考', partOfSpeech: '动词', emoji: '💭' },
  { word: '좋아하다', pronunciation: 'jo-a-ha-da', meaning: '喜欢', partOfSpeech: '动词', emoji: '❤️' },
  { word: '싫어하다', pronunciation: 'sil-eo-ha-da', meaning: '讨厌', partOfSpeech: '动词', emoji: '💔' },
  { word: '사랑하다', pronunciation: 'sa-rang-ha-da', meaning: '爱', partOfSpeech: '动词', emoji: '💕' },
  { word: '주다', pronunciation: 'ju-da', meaning: '给', partOfSpeech: '动词', emoji: '🎁' },
  { word: '받다', pronunciation: 'bat-da', meaning: '收/接受', partOfSpeech: '动词', emoji: '📩' },
  { word: '보내다', pronunciation: 'bo-nae-da', meaning: '送/度过', partOfSpeech: '动词', emoji: '📤' },
  { word: '찾다', pronunciation: 'chat-da', meaning: '找/寻找', partOfSpeech: '动词', emoji: '🔍' },
  { word: '만나다', pronunciation: 'man-na-da', meaning: '见面', partOfSpeech: '动词', emoji: '🤝' },
  { word: '기다리다', pronunciation: 'gi-da-ri-da', meaning: '等待', partOfSpeech: '动词', emoji: '⏳' },
  { word: '살다', pronunciation: 'sal-da', meaning: '生活/住', partOfSpeech: '动词', emoji: '🏠' },
  { word: '일하다', pronunciation: 'il-ha-da', meaning: '工作', partOfSpeech: '动词', emoji: '💼' },
  { word: '자다', pronunciation: 'ja-da', meaning: '睡觉', partOfSpeech: '动词', emoji: '😴' },
  { word: '일어나다', pronunciation: 'il-eo-na-da', meaning: '起床/发生', partOfSpeech: '动词', emoji: '🌅' },
  { word: '씻다', pronunciation: 'ssit-da', meaning: '洗', partOfSpeech: '动词', emoji: '🚿' },
  { word: '입다', pronunciation: 'ip-da', meaning: '穿', partOfSpeech: '动词', emoji: '👕' },
  { word: '사다', pronunciation: 'sa-da', meaning: '买', partOfSpeech: '动词', emoji: '🛒' },
  { word: '팔다', pronunciation: 'pal-da', meaning: '卖', partOfSpeech: '动词', emoji: '🏪' },
  { word: '열다', pronunciation: 'yeol-da', meaning: '开', partOfSpeech: '动词', emoji: '🚪' },
  { word: '닫다', pronunciation: 'dat-da', meaning: '关', partOfSpeech: '动词', emoji: '🚪' },
  { word: '앉다', pronunciation: 'ant-da', meaning: '坐', partOfSpeech: '动词', emoji: '🪑' },
  { word: '서다', pronunciation: 'seo-da', meaning: '站', partOfSpeech: '动词', emoji: '🧍' },
  { word: '웃다', pronunciation: 'ut-da', meaning: '笑', partOfSpeech: '动词', emoji: '😄' },
  { word: '울다', pronunciation: 'ul-da', meaning: '哭', partOfSpeech: '动词', emoji: '😢' },
  { word: '놀다', pronunciation: 'nol-da', meaning: '玩', partOfSpeech: '动词', emoji: '🎮' },
  { word: '쉬다', pronunciation: 'swi-da', meaning: '休息', partOfSpeech: '动词', emoji: '😌' },
  { word: '움직이다', pronunciation: 'um-jik-i-da', meaning: '动/移动', partOfSpeech: '动词', emoji: '🏃' },
  { word: '넣다', pronunciation: 'neot-da', meaning: '放入', partOfSpeech: '动词', emoji: '📥' },
  { word: '꺼내다', pronunciation: 'kkeo-nae-da', meaning: '拿出', partOfSpeech: '动词', emoji: '📤' },
  { word: '들다', pronunciation: 'deul-da', meaning: '提/举/入', partOfSpeech: '动词', emoji: '✋' },
  { word: '가지다', pronunciation: 'ga-ji-da', meaning: '拥有/带', partOfSpeech: '动词', emoji: '🤲' },
  { word: '타다', pronunciation: 'ta-da', meaning: '坐(车)/骑/爬', partOfSpeech: '动词', emoji: '🚗' },
  { word: '내리다', pronunciation: 'nae-ri-da', meaning: '下(车)/降', partOfSpeech: '动词', emoji: '⬇️' },
  { word: '걷다', pronunciation: 'geot-da', meaning: '走/步行', partOfSpeech: '动词', emoji: '🚶' },
  { word: '뛰다', pronunciation: 'ttwi-da', meaning: '跑/跳', partOfSpeech: '动词', emoji: '🏃' },
  { word: '보이다', pronunciation: 'bo-i-da', meaning: '看见/看起来', partOfSpeech: '动词', emoji: '👁️' },
  { word: '들리다', pronunciation: 'deul-li-da', meaning: '听见/被听到', partOfSpeech: '动词', emoji: '👂' },
  { word: '좋다', pronunciation: 'jot-da', meaning: '好', partOfSpeech: '形容词', emoji: '👍' },
  { word: '싫다', pronunciation: 'silt-da', meaning: '讨厌/不喜欢', partOfSpeech: '形容词', emoji: '👎' },
  { word: '크다', pronunciation: 'keu-da', meaning: '大', partOfSpeech: '形容词', emoji: '📏' },
  { word: '작다', pronunciation: 'jak-da', meaning: '小', partOfSpeech: '形容词', emoji: '📏' },
  { word: '많다', pronunciation: 'man-ta', meaning: '多', partOfSpeech: '形容词', emoji: '📊' },
  { word: '적다', pronunciation: 'jeok-da', meaning: '少', partOfSpeech: '形容词', emoji: '📊' },
  { word: '길다', pronunciation: 'gil-da', meaning: '长', partOfSpeech: '形容词', emoji: '📏' },
  { word: '짧다', pronunciation: 'jjal-da', meaning: '短', partOfSpeech: '形容词', emoji: '📏' },
  { word: '높다', pronunciation: 'nop-da', meaning: '高', partOfSpeech: '形容词', emoji: '⛰️' },
  { word: '낮다', pronunciation: 'nat-da', meaning: '低', partOfSpeech: '形容词', emoji: '⬇️' },
  { word: '넓다', pronunciation: 'neol-da', meaning: '宽/广', partOfSpeech: '形容词', emoji: '🌐' },
  { word: '좁다', pronunciation: 'jop-da', meaning: '窄', partOfSpeech: '形容词', emoji: '🔲' },
  { word: '비싸다', pronunciation: 'bi-ssa-da', meaning: '贵', partOfSpeech: '形容词', emoji: '💰' },
  { word: '싸다', pronunciation: 'ssa-da', meaning: '便宜', partOfSpeech: '形容词', emoji: '🏷️' },
  { word: '맛있다', pronunciation: 'mat-it-da', meaning: '好吃', partOfSpeech: '形容词', emoji: '😋' },
  { word: '맛없다', pronunciation: 'mat-eop-da', meaning: '不好吃', partOfSpeech: '形容词', emoji: '🤢' },
  { word: '재미있다', pronunciation: 'jae-mi-it-da', meaning: '有趣', partOfSpeech: '形容词', emoji: '🎉' },
  { word: '재미없다', pronunciation: 'jae-mi-eop-da', meaning: '无聊', partOfSpeech: '形容词', emoji: '😐' },
  { word: '어렵다', pronunciation: 'eo-ryeop-da', meaning: '难', partOfSpeech: '形容词', emoji: '🤯' },
  { word: '쉽다', pronunciation: 'swip-da', meaning: '容易', partOfSpeech: '形容词', emoji: '😊' },
  { word: '바쁘다', pronunciation: 'ba-ppeu-da', meaning: '忙', partOfSpeech: '形容词', emoji: '🏃' },
  { word: '예쁘다', pronunciation: 'ye-ppeu-da', meaning: '漂亮', partOfSpeech: '形容词', emoji: '💅' },
  { word: '멋있다', pronunciation: 'meo-sit-da', meaning: '帅/酷/棒', partOfSpeech: '形容词', emoji: '😎' },
  { word: '슬프다', pronunciation: 'seul-peu-da', meaning: '悲伤', partOfSpeech: '形容词', emoji: '😢' },
  { word: '기쁘다', pronunciation: 'gi-ppeu-da', meaning: '高兴', partOfSpeech: '形容词', emoji: '😊' },
  { word: '화나다', pronunciation: 'hwa-na-da', meaning: '生气', partOfSpeech: '形容词', emoji: '😠' },
  { word: '피곤하다', pronunciation: 'pi-gon-ha-da', meaning: '累/疲倦', partOfSpeech: '形容词', emoji: '😴' },
  { word: '아프다', pronunciation: 'a-peu-da', meaning: '痛/生病', partOfSpeech: '形容词', emoji: '🤒' },
  { word: '괜찮다', pronunciation: 'gwaen-chan-ta', meaning: '没关系/还可以', partOfSpeech: '形容词', emoji: '👍' },
  { word: '이상하다', pronunciation: 'i-sang-ha-da', meaning: '奇怪/不对劲', partOfSpeech: '形容词', emoji: '🤔' },
  { word: '힘들다', pronunciation: 'him-deul-da', meaning: '辛苦/累', partOfSpeech: '形容词', emoji: '😮‍💨' },
  { word: '진짜', pronunciation: 'jin-jja', meaning: '真的/真正', partOfSpeech: '名词/副词', emoji: '💯' },
  { word: '정말', pronunciation: 'jeong-mal', meaning: '真的/非常', partOfSpeech: '名词/副词', emoji: '💯' },
  { word: '너무', pronunciation: 'neo-mu', meaning: '太/非常', partOfSpeech: '副词', emoji: '😲' },
  { word: '아주', pronunciation: 'a-ju', meaning: '很/非常', partOfSpeech: '副词', emoji: '🔥' },
  { word: '매우', pronunciation: 'mae-u', meaning: '非常/很', partOfSpeech: '副词', emoji: '🔥' },
  { word: '조금', pronunciation: 'jo-geum', meaning: '一点点', partOfSpeech: '副词', emoji: '🔸' },
  { word: '약간', pronunciation: 'yak-gan', meaning: '稍微/些许', partOfSpeech: '副词', emoji: '🔹' },
  { word: '자주', pronunciation: 'ja-ju', meaning: '经常', partOfSpeech: '副词', emoji: '🔄' },
  { word: '가끔', pronunciation: 'ga-kkeum', meaning: '偶尔', partOfSpeech: '副词', emoji: '⏸️' },
  { word: '항상', pronunciation: 'hang-sang', meaning: '总是/一直', partOfSpeech: '副词', emoji: '🕐' },
  { word: '벌써', pronunciation: 'beol-sseo', meaning: '已经', partOfSpeech: '副词', emoji: '⏰' },
  { word: '아직', pronunciation: 'a-jik', meaning: '还/仍然', partOfSpeech: '副词', emoji: '🕒' },
  { word: '이미', pronunciation: 'i-mi', meaning: '已经', partOfSpeech: '副词', emoji: '✅' },
  { word: '다시', pronunciation: 'da-si', meaning: '再次', partOfSpeech: '副词', emoji: '🔄' },
  { word: '또', pronunciation: 'tto', meaning: '又/再', partOfSpeech: '副词', emoji: '➕' },
  { word: '같이', pronunciation: 'gat-i', meaning: '一起', partOfSpeech: '副词', emoji: '👫' },
  { word: '함께', pronunciation: 'ham-kke', meaning: '一起/共同', partOfSpeech: '副词', emoji: '👥' },
  { word: '제일', pronunciation: 'je-il', meaning: '最', partOfSpeech: '副词', emoji: '🥇' },
  { word: '가장', pronunciation: 'ga-jang', meaning: '最', partOfSpeech: '副词', emoji: '🥇' },
  { word: '왜', pronunciation: 'wae', meaning: '为什么', partOfSpeech: '疑问词', emoji: '❓' },
  { word: '어디', pronunciation: 'eo-di', meaning: '哪里', partOfSpeech: '疑问词', emoji: '📍' },
  { word: '무엇', pronunciation: 'mu-eot', meaning: '什么', partOfSpeech: '疑问词', emoji: '❓' },
  { word: '누구', pronunciation: 'nu-gu', meaning: '谁', partOfSpeech: '疑问词', emoji: '👤' },
  { word: '언제', pronunciation: 'eon-je', meaning: '什么时候', partOfSpeech: '疑问词', emoji: '⏰' },
  { word: '어떻게', pronunciation: 'eo-tteo-ke', meaning: '怎么/如何', partOfSpeech: '疑问词', emoji: '🤔' },
  { word: '어떤', pronunciation: 'eo-tteon', meaning: '什么样的', partOfSpeech: '疑问词', emoji: '🤷' },
  { word: '몇', pronunciation: 'myeot', meaning: '几/多少', partOfSpeech: '疑问词', emoji: '#️⃣' },
  { word: '나', pronunciation: 'na', meaning: '我', partOfSpeech: '代词', emoji: '👤' },
  { word: '저', pronunciation: 'jeo', meaning: '我(敬语)', partOfSpeech: '代词', emoji: '🙇' },
  { word: '내', pronunciation: 'nae', meaning: '我的', partOfSpeech: '代词', emoji: '👤' },
  { word: '제', pronunciation: 'je', meaning: '我的(敬语)', partOfSpeech: '代词', emoji: '🙇' },
  { word: '너', pronunciation: 'neo', meaning: '你', partOfSpeech: '代词', emoji: '👤' },
  { word: '당신', pronunciation: 'dang-sin', meaning: '您/你', partOfSpeech: '代词', emoji: '👤' },
  { word: '우리', pronunciation: 'u-ri', meaning: '我们/我的', partOfSpeech: '代词', emoji: '👥' },
  { word: '저희', pronunciation: 'jeo-hui', meaning: '我们(敬语)', partOfSpeech: '代词', emoji: '👥' },
  { word: '이', pronunciation: 'i', meaning: '这', partOfSpeech: '代词', emoji: '👈' },
  { word: '그', pronunciation: 'geu', meaning: '那', partOfSpeech: '代词', emoji: '👉' },
  { word: '저', pronunciation: 'jeo', meaning: '那(远)', partOfSpeech: '代词', emoji: '👇' },
  { word: '여기', pronunciation: 'yeo-gi', meaning: '这里', partOfSpeech: '代词', emoji: '📍' },
  { word: '거기', pronunciation: 'geo-gi', meaning: '那里', partOfSpeech: '代词', emoji: '📍' },
  { word: '저기', pronunciation: 'jeo-gi', meaning: '那里(远处)', partOfSpeech: '代词', emoji: '📍' },
  { word: '사람', pronunciation: 'sa-ram', meaning: '人', partOfSpeech: '名词', emoji: '👤' },
  { word: '시간', pronunciation: 'si-gan', meaning: '时间', partOfSpeech: '名词', emoji: '🕐' },
  { word: '돈', pronunciation: 'don', meaning: '钱', partOfSpeech: '名词', emoji: '💰' },
  { word: '집', pronunciation: 'jip', meaning: '家/房子', partOfSpeech: '名词', emoji: '🏠' },
  { word: '학교', pronunciation: 'hak-gyo', meaning: '学校', partOfSpeech: '名词', emoji: '🏫' },
  { word: '회사', pronunciation: 'hoe-sa', meaning: '公司', partOfSpeech: '名词', emoji: '🏢' },
  { word: '가게', pronunciation: 'ga-ge', meaning: '店铺', partOfSpeech: '名词', emoji: '🏪' },
  { word: '병원', pronunciation: 'byeong-won', meaning: '医院', partOfSpeech: '名词', emoji: '🏥' },
  { word: '약속', pronunciation: 'yak-sok', meaning: '约定/约会', partOfSpeech: '名词', emoji: '📅' },
  { word: '친구', pronunciation: 'chin-gu', meaning: '朋友', partOfSpeech: '名词', emoji: '👫' },
  { word: '가족', pronunciation: 'ga-jok', meaning: '家人', partOfSpeech: '名词', emoji: '👨‍👩‍👧‍👦' },
  { word: '이름', pronunciation: 'i-reum', meaning: '名字', partOfSpeech: '名词', emoji: '📛' },
  { word: '물', pronunciation: 'mul', meaning: '水', partOfSpeech: '名词', emoji: '💧' },
  { word: '밥', pronunciation: 'bap', meaning: '饭', partOfSpeech: '名词', emoji: '🍚' },
  { word: '음식', pronunciation: 'eum-sik', meaning: '食物', partOfSpeech: '名词', emoji: '🍜' },
  { word: '커피', pronunciation: 'keo-pi', meaning: '咖啡', partOfSpeech: '名词', emoji: '☕' },
  { word: '차', pronunciation: 'cha', meaning: '茶/车', partOfSpeech: '名词', emoji: '🫖' },
  { word: '영화', pronunciation: 'yeong-hwa', meaning: '电影', partOfSpeech: '名词', emoji: '🎬' },
  { word: '음악', pronunciation: 'eum-ak', meaning: '音乐', partOfSpeech: '名词', emoji: '🎵' },
  { word: '노래', pronunciation: 'no-rae', meaning: '歌', partOfSpeech: '名词', emoji: '🎤' },
  { word: '책', pronunciation: 'chaek', meaning: '书', partOfSpeech: '名词', emoji: '📚' },
  { word: '말', pronunciation: 'mal', meaning: '话/语言', partOfSpeech: '名词', emoji: '💬' },
  { word: '생각', pronunciation: 'saeng-gak', meaning: '想法/思考', partOfSpeech: '名词', emoji: '💭' },
  { word: '기분', pronunciation: 'gi-bun', meaning: '心情/感觉', partOfSpeech: '名词', emoji: '🎭' },
  { word: '날씨', pronunciation: 'nal-ssi', meaning: '天气', partOfSpeech: '名词', emoji: '🌤️' },
  { word: '길', pronunciation: 'gil', meaning: '路', partOfSpeech: '名词', emoji: '🛤️' },
  { word: '일', pronunciation: 'il', meaning: '事情/工作', partOfSpeech: '名词', emoji: '📋' },
  { word: '한국어', pronunciation: 'han-gu-geo', meaning: '韩语', partOfSpeech: '名词', emoji: '🇰🇷' },
  { word: '중국어', pronunciation: 'jung-gu-geo', meaning: '中文', partOfSpeech: '名词', emoji: '🇨🇳' },
  { word: '영어', pronunciation: 'yeong-eo', meaning: '英语', partOfSpeech: '名词', emoji: '🇬🇧' },
  { word: '일본어', pronunciation: 'il-bon-eo', meaning: '日语', partOfSpeech: '名词', emoji: '🗾' },
  { word: '매일', pronunciation: 'mae-il', meaning: '每天', partOfSpeech: '名词/副词', emoji: '📅' },
  { word: '오늘', pronunciation: 'o-neul', meaning: '今天', partOfSpeech: '名词', emoji: '📅' },
  { word: '내일', pronunciation: 'nae-il', meaning: '明天', partOfSpeech: '名词', emoji: '📅' },
  { word: '어제', pronunciation: 'eo-je', meaning: '昨天', partOfSpeech: '名词', emoji: '📅' },
  { word: '지금', pronunciation: 'ji-geum', meaning: '现在', partOfSpeech: '名词/副词', emoji: '⏰' },
  { word: '먼저', pronunciation: 'meon-jeo', meaning: '先/首先', partOfSpeech: '副词', emoji: '🥇' },
  { word: '나중에', pronunciation: 'na-jung-e', meaning: '以后/稍后', partOfSpeech: '副词', emoji: '⏰' },
  { word: '다음', pronunciation: 'da-eum', meaning: '下一个/下次', partOfSpeech: '名词/副词', emoji: '⏭️' },
  { word: '이번', pronunciation: 'i-beon', meaning: '这次/这回', partOfSpeech: '名词', emoji: '🔄' },
  { word: '저번', pronunciation: 'jeo-beon', meaning: '上次', partOfSpeech: '名词', emoji: '⏮️' },
  { word: '하루', pronunciation: 'ha-ru', meaning: '一天', partOfSpeech: '名词', emoji: '1️⃣' },
  { word: '주', pronunciation: 'ju', meaning: '周/星期', partOfSpeech: '名词', emoji: '📅' },
  { word: '달', pronunciation: 'dal', meaning: '月/月亮', partOfSpeech: '名词', emoji: '🌙' },
  { word: '년', pronunciation: 'nyeon', meaning: '年', partOfSpeech: '名词', emoji: '📆' },
  { word: '전', pronunciation: 'jeon', meaning: '前/之前', partOfSpeech: '名词/副词', emoji: '⏪' },
  { word: '후', pronunciation: 'hu', meaning: '后/之后', partOfSpeech: '名词', emoji: '⏩' },
  { word: '안', pronunciation: 'an', meaning: '不/里面', partOfSpeech: '副词', emoji: '🚫' },
  { word: '못', pronunciation: 'mot', meaning: '不能', partOfSpeech: '副词', emoji: '🚫' },
  { word: '네', pronunciation: 'ne', meaning: '是/好的', partOfSpeech: '感叹词', emoji: '👍' },
  { word: '아니요', pronunciation: 'a-ni-yo', meaning: '不/不是', partOfSpeech: '感叹词', emoji: '👎' },
  { word: '응', pronunciation: 'eung', meaning: '嗯(非敬语)', partOfSpeech: '感叹词', emoji: '👌' },
  { word: '아', pronunciation: 'a', meaning: '啊', partOfSpeech: '感叹词', emoji: '😮' },
  { word: '어', pronunciation: 'eo', meaning: '哦/嗯', partOfSpeech: '感叹词', emoji: '🤔' },
  { word: '안녕', pronunciation: 'an-nyeong', meaning: '你好/再见', partOfSpeech: '感叹词', emoji: '👋' },
  { word: '미안', pronunciation: 'mi-an', meaning: '抱歉', partOfSpeech: '名词', emoji: '🙏' },
  { word: '사랑', pronunciation: 'sa-rang', meaning: '爱', partOfSpeech: '名词', emoji: '💕' },
  { word: '고마워', pronunciation: 'go-ma-wo', meaning: '谢谢(非敬语)', partOfSpeech: '感叹词', emoji: '🙏' },
  { word: '대박', pronunciation: 'dae-bak', meaning: '太棒了', partOfSpeech: '感叹词', emoji: '🤩' },
  { word: '짱', pronunciation: 'jjang', meaning: '超棒/最棒', partOfSpeech: '感叹词', emoji: '👑' },
  { word: '완전', pronunciation: 'wan-jeon', meaning: '完全/超级', partOfSpeech: '副词', emoji: '🔥' },
  { word: '진심', pronunciation: 'jin-sim', meaning: '真心', partOfSpeech: '名词', emoji: '💖' },
  { word: '많이', pronunciation: 'man-i', meaning: '多地/很多', partOfSpeech: '副词', emoji: '📊' },
  { word: '잘', pronunciation: 'jal', meaning: '好地/熟练地', partOfSpeech: '副词', emoji: '👌' },
  { word: '서로', pronunciation: 'seo-ro', meaning: '互相', partOfSpeech: '副词', emoji: '🔄' },
  { word: '아마', pronunciation: 'a-ma', meaning: '大概/可能', partOfSpeech: '副词', emoji: '🤷' },
  { word: '아까', pronunciation: 'a-gga', meaning: '刚才', partOfSpeech: '副词', emoji: '⏮️' },
  { word: '방금', pronunciation: 'bang-geum', meaning: '刚刚', partOfSpeech: '副词', emoji: '⏰' },
  { word: '곧', pronunciation: 'got', meaning: '马上', partOfSpeech: '副词', emoji: '⏳' },
  { word: '자꾸', pronunciation: 'ja-kku', meaning: '总是/不停地', partOfSpeech: '副词', emoji: '🔁' },
  { word: '계속', pronunciation: 'gye-sok', meaning: '继续/一直', partOfSpeech: '副词', emoji: '▶️' },
  { word: '정말로', pronunciation: 'jeong-mal-lo', meaning: '真的/确实', partOfSpeech: '副词', emoji: '💯' },
  { word: '모두', pronunciation: 'mo-du', meaning: '都/全部', partOfSpeech: '副词', emoji: '👥' },
  { word: '다', pronunciation: 'da', meaning: '全部/都', partOfSpeech: '副词', emoji: '✅' },
  { word: '별로', pronunciation: 'byeol-lo', meaning: '不怎么/不太', partOfSpeech: '副词', emoji: '😐' },
  { word: '거의', pronunciation: 'geo-ui', meaning: '几乎', partOfSpeech: '副词', emoji: '📊' },
  { word: '전혀', pronunciation: 'jeon-hyeo', meaning: '完全不/一点也不', partOfSpeech: '副词', emoji: '🙅' },
  { word: '드디어', pronunciation: 'deu-di-eo', meaning: '终于', partOfSpeech: '副词', emoji: '🎉' },
];

function buildDictionary() {
  const map = new Map<string, DictEntry>();
  for (const cat of knowledgeCategories) {
    for (const w of cat.words) {
      map.set(w.word, { pronunciation: w.pronunciation, meaning: w.meaning, partOfSpeech: w.partOfSpeech, emoji: w.emoji });
    }
  }
  for (const w of commonWords) {
    if (!map.has(w.word)) {
      map.set(w.word, { pronunciation: w.pronunciation, meaning: w.meaning, partOfSpeech: w.partOfSpeech, emoji: w.emoji });
    }
  }
  return map;
}

// ── Common phrase translations ─────────────────────────
const phraseTranslations: Record<string, string> = {
  '안녕하세요': '你好', '감사합니다': '谢谢', '고맙습니다': '谢谢', '죄송합니다': '对不起',
  '미안합니다': '对不起', '사랑해요': '我爱你', '좋아해요': '我喜欢你', '반갑습니다': '很高兴见到你',
  '잘 부탁드립니다': '请多关照', '수고하셨습니다': '辛苦了', '맛있게 드세요': '请慢用',
  '잘 먹겠습니다': '我会好好吃的', '잘 먹었습니다': '我吃好了', '다녀오겠습니다': '我出门了',
  '다녀왔습니다': '我回来了', '안녕히 가세요': '再见（对离开的人）', '안녕히 계세요': '再见（对留下的人）',
  '생일 축하합니다': '生日快乐', '새해 복 많이 받으세요': '新年快乐', '건강하세요': '祝您健康',
  '괜찮아요': '没关系/还可以', '알겠습니다': '我知道了', '모르겠습니다': '我不知道',
  '도와주세요': '请帮帮我', '잠시만요': '等一下', '실례합니다': '失礼了/打扰一下',
  '축하합니다': '祝贺你', '좋은 아침입니다': '早上好', '안녕히 주무세요': '晚安',
  '또 만나요': '再见/下次见', '어서 오세요': '欢迎光临', '화이팅': '加油',
  '힘내세요': '加油/振作起来', '걱정하지 마세요': '别担心', '천천히 말씀해 주세요': '请说慢一点',
  '한국어를 공부하고 있어요': '我正在学韩语', '한국어를 배우고 있어요': '我正在学韩语',
};

const particleExplanations: Record<string, string> = {
  '은': '主题助词（辅音后）', '는': '主题助词（元音后）', '이': '主格助词（辅音后）', '가': '主格助词（元音后）',
  '을': '宾格助词（辅音后）', '를': '宾格助词（元音后）', '에': '地点/时间助词', '에서': '场所助词"在~"',
  '로': '方向/工具助词', '에게': '给予助词"给~"', '와': '"和/与"（元音后）', '과': '"和/与"（辅音后）',
  '도': '也', '만': '只/仅', '의': '的', '보다': '比~', '부터': '从~开始', '까지': '到~为止',
};

const verbEndings = ['습니다', 'ㅂ니다', '아요', '어요', '해요', '세요', '으세요', '았어요', '었어요', '했어요', '겠습니다', 'ㄹ게요', '을게요', '네요', '고요', '니까', '면서', '지만', '는데', '거나'];

// 例句兼容：新版 { ko, zh } 对象 + 旧版 localStorage string[]
function normalizeExample(ex: { ko: string; zh: string } | string): { ko: string; zh: string } {
  return typeof ex === 'string' ? { ko: ex, zh: '' } : ex;
}
// ── Offline analyze (fallback) ─────────────────────────
// grammarPoints(4119行) 动态 import：离线降级路径才用到，不进本页首屏 bundle。
async function analyzeOffline(text: string): Promise<AnalysisResult> {
  const { grammarPoints } = await import('@/data/grammar');
  const dictionary = buildDictionary();
  const trimmed = text.trim();
  const result: AnalysisResult = {
    original: trimmed, fullTranslation: '', words: [], particles: [], grammar: [],
    sentences: [], suggestion: '',
  };
  if (!trimmed) return result;

  if (phraseTranslations[trimmed]) result.fullTranslation = phraseTranslations[trimmed];

  const tokens = trimmed.split(/[\s]+/).filter(Boolean);
  const allParticles = Object.keys(particleExplanations);

  for (const token of tokens) {
    const clean = token.replace(/[.,!?~]+$/, '');
    const dictEntry = dictionary.get(clean);
    if (dictEntry) {
      result.words.push({ text: clean, ...dictEntry });
      continue;
    }
    let found = false;
    for (const particle of allParticles.sort((a, b) => b.length - a.length)) {
      if (clean.endsWith(particle) && clean.length > particle.length) {
        const stem = clean.slice(0, -particle.length);
        const stemEntry = dictionary.get(stem) || dictionary.get(stem + '다');
        if (stemEntry) {
          result.words.push({ text: clean, meaning: stemEntry.meaning + '（+' + particle + '）', partOfSpeech: stemEntry.partOfSpeech, emoji: stemEntry.emoji });
          result.particles.push({ text: particle, explanation: particleExplanations[particle] || particle });
          found = true; break;
        }
        if (stem.length >= 1) {
          result.words.push({ text: clean, meaning: stem + ' + 助词' + particle, partOfSpeech: '未知+助词', emoji: '🔤' });
          result.particles.push({ text: particle, explanation: particleExplanations[particle] || particle });
          found = true; break;
        }
      }
    }
    if (found) continue;
    for (const ending of verbEndings.sort((a, b) => b.length - a.length)) {
      if (clean.endsWith(ending) && clean.length > ending.length) {
        const stem = clean.slice(0, -ending.length);
        const stemEntry = dictionary.get(stem) || dictionary.get(stem + '다');
        if (stemEntry) {
          result.words.push({ text: clean, meaning: stemEntry.meaning + '（' + ending + '）', partOfSpeech: '动词/形容词', emoji: stemEntry.emoji });
          found = true; break;
        }
      }
    }
    if (found) continue;
    result.words.push({ text: clean, meaning: '词典未收录', partOfSpeech: '未知', emoji: '❓' });
  }

  // Match grammar
  for (const gp of grammarPoints) {
    const patternStripped = gp.pattern.replace(/~/g, '').replace(/\s/g, '');
    if (trimmed.replace(/\s/g, '').includes(patternStripped) && patternStripped.length >= 1) {
      result.grammar.push({ pattern: gp.pattern, title: gp.title, usage: gp.usage, explanation: gp.explanation, level: gp.level, conjugation: gp.conjugation, examples: gp.examples.slice(0, 2) });
    }
  }

  if (!result.fullTranslation && result.words.length > 0) {
    result.fullTranslation = result.words.map(w => w.meaning.split('（')[0].split('(')[0]).join(' ') + '（逐词直译）';
  }

  const isShort = trimmed.replace(/\s/g, '').length < 50;
  if (!isShort) {
    result.sentences = [{ korean: trimmed, chinese: result.fullTranslation }];
    result.suggestion = '继续练习这句话中的生词和语法点，尝试用其中的表达造新句子。';
    result.difficulty = '中级';
    result.note = '这句话是日常口语表达，语气比较自然。';
  } else {
    result.note = '这句话是日常口语表达，语气比较自然。';
  }

  return result;
}

// ── Detect lang direction ──────────────────────────────
// 方向判断必须与后端 detectIsKoreanInput 一致（韩文字符占比 > 30% 视为韩文输入），
// 否则混输时前端 getSentenceFields 的 korean/chinese 会与 API 实际处理方向颠倒
function detectDirection(text: string): { from: string; to: string } {
  const trimmed = text.trim();
  if (!trimmed) return { from: '韩文', to: '中文' };
  const koreanChars = (trimmed.match(/[가-힣]/g) || []).length;
  const totalNonSpace = trimmed.replace(/\s/g, '').length;
  const isKorean = totalNonSpace === 0 || koreanChars / totalNonSpace > 0.3;
  return isKorean ? { from: '韩文', to: '中文' } : { from: '中文', to: '韩文' };
}

// ── History ────────────────────────────────────────────
interface HistoryItem {
  id: string;
  timestamp: number;
  original: string;
  fullTranslation: string;
  result?: AnalysisResult;
}

const MAX_HISTORY = 20;

async function loadHistory(userId: string | undefined): Promise<HistoryItem[]> {
  if (!userId) return [];
  try {
    const rows = await db.aiAnalyzeHistory.orderBy('timestamp').reverse().limit(MAX_HISTORY).toArray();
    return rows.map(r => ({
      id: r.id,
      timestamp: r.timestamp,
      original: r.original,
      fullTranslation: r.fullTranslation,
      result: r.resultJson ? JSON.parse(r.resultJson) : undefined,
    }));
  } catch { return []; }
}

async function saveHistoryItem(item: HistoryItem): Promise<void> {
  try {
    await db.aiAnalyzeHistory.put({
      id: item.id,
      timestamp: item.timestamp,
      original: item.original,
      fullTranslation: item.fullTranslation,
      resultJson: item.result ? JSON.stringify(item.result) : undefined,
    });
    // 超过上限后清理最旧的（异步、失败不影响主流程）
    const all = await db.aiAnalyzeHistory.orderBy('timestamp').reverse().toArray();
    if (all.length > MAX_HISTORY) {
      const stale = all.slice(MAX_HISTORY).map(r => r.id);
      await db.aiAnalyzeHistory.bulkDelete(stale);
    }
  } catch { /* ignore */ }
}

async function clearHistoryStore(): Promise<void> {
  try {
    await db.aiAnalyzeHistory.clear();
  } catch { /* ignore */ }
}

// ── Notebook Workstation styles ──────────────────────
// 视觉方案见 docs/analyze-redesign-v1.html
// 命名前缀 az- 避免污染全局。
const ANALYZE_STYLES = `
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes az2-fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
@keyframes az2-wave {
  0%, 100% { transform: scaleY(.5); }
  50% { transform: scaleY(1); }
}

/* ── v2 · 简洁双栏 · 内容拆解 ─────────────────────────── */
.az2-root {
  /* phonetics token bridge */
  --hr-surface-1: #fffbf7;
  --hr-surface-2: #ffffff;
  --hr-surface-3: #fff4f0;
  --hr-surface-4: #f5ece7;
  --hr-ink-1: #1a1310;
  --hr-ink-2: #3a2e29;
  --hr-ink-3: #897167;
  --hr-ink-4: #b8a89c;
  --hr-border-1: #efe1da;
  --hr-border-2: #e4d3c8;
  --hr-pink-soft: #ffe4ee;
  --hr-pink-base: #ff7fa8;
  --hr-pink-strong: #e55a87;
  --hr-mint-soft: #e3f5f0;
  --hr-mint-base: #7dc6b3;
  --hr-mint-strong: #4a9880;
  --hr-serif: 'Fraunces','Source Han Serif SC','Noto Serif SC',serif;
  --hr-sans: 'Noto Sans SC','PingFang SC',system-ui,sans-serif;
  --hr-hangul: 'Noto Sans KR','Malgun Gothic',sans-serif;
  --hr-mono: 'JetBrains Mono',Menlo,Consolas,monospace;
  --hr-ease: cubic-bezier(.2,.7,.2,1);

  --az2-ink-2: #3a2e29;
  --az2-hover: #fff4f0;
  --az2-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
  --az2-ko: 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  min-height: 100vh;
  background: #fffbf7;
  color: #1a1310;
  font-family: 'Noto Sans SC', 'PingFang SC', system-ui, sans-serif !important;
  font-size: 14px;
  line-height: 1.5;
}
@media (min-width: 768px) {
  .az2-root { zoom: 1.25; }
}
[data-theme="dark"] .az2-root {
  --hr-surface-1: #1E1B2E;
  --hr-surface-2: #282440;
  --hr-surface-3: #322C4E;
  --hr-surface-4: #3A3060;
  --hr-ink-1: #F0E8FF;
  --hr-ink-2: #D8CCEF;
  --hr-ink-3: #B8A8C8;
  --hr-ink-4: #8B7CA0;
  --hr-border-1: #3A3060;
  --hr-border-2: #453874;
  --hr-pink-soft: rgba(255,127,168,.16);
  --hr-pink-base: #ff7fa8;
  --hr-pink-strong: #ff9dc0;
  --hr-mint-soft: rgba(125,198,179,.16);
  --hr-mint-base: #7dc6b3;
  --hr-mint-strong: #a3d9c9;

  --az2-ink-2: #D8CCEF;
  --az2-hover: rgba(255,255,255,.06);
  background: #1E1B2E;
  color: #F0E8FF;
}

/* 品牌三件套 */
.az2-brand {
  display: flex;
  align-items: baseline;
  gap: 10px;
  min-width: 0;
  overflow: hidden;
}
.az2-brand-mark {
  font-family: var(--hr-serif);
  font-style: italic;
  font-weight: 700;
  font-size: 22px;
  color: var(--hr-pink-strong);
  letter-spacing: -.02em;
  line-height: 1;
  flex-shrink: 0;
}
.az2-brand-kr {
  font-family: var(--hr-hangul);
  font-weight: 900;
  font-size: 15px;
  color: var(--hr-ink-2);
  flex-shrink: 0;
}
.az2-brand-sub {
  font-family: var(--hr-mono);
  font-size: 10px;
  letter-spacing: .18em;
  color: var(--hr-ink-3);
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@media (max-width: 767px) {
  .az2-brand-mark { font-size: 18px; }
  .az2-brand-kr { font-size: 13px; }
  .az2-brand-sub { display: none; }
}

/* Top bar */
.az2-topbar {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 14px;
  align-items: center;
  padding: 18px 32px;
  border-bottom: 1px solid var(--hr-border-2);
  background: transparent;
}
@media (max-width: 767px) {
  .az2-topbar { padding: 12px 16px; grid-template-columns: auto 1fr auto; gap: 10px; }
}

.az2-back {
  width: 34px; height: 34px; border-radius: 10px;
  color: var(--hr-ink-3);
  display: grid; place-items: center;
  font-size: 18px; cursor: pointer;
  border: 1px solid var(--hr-border-2); background: var(--hr-surface-2);
  transition: all .2s var(--hr-ease);
}
.az2-back:hover { border-color: var(--hr-pink-base); color: var(--hr-pink-strong); }

.az2-mode-toggle {
  display: inline-flex;
  border: 1px solid var(--hr-border-2);
  border-radius: 999px;
  overflow: hidden;
  background: var(--hr-surface-2);
  padding: 3px;
  gap: 2px;
}
.az2-mode-toggle button {
  padding: 6px 14px;
  border-radius: 999px;
  font-family: var(--hr-sans);
  font-size: 12.5px; font-weight: 600;
  color: var(--hr-ink-3);
  background: transparent;
  border: 0;
  cursor: pointer;
  transition: all .2s var(--hr-ease);
}
.az2-mode-toggle button:hover { color: var(--hr-ink-1); }
.az2-mode-toggle button.active {
  background: var(--hr-ink-1);
  color: var(--hr-surface-1);
}
@media (max-width: 767px) { .az2-mode-toggle.desktop-only { display: none; } }

.az2-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 999px;
  background: var(--hr-pink-soft);
  color: var(--hr-pink-strong);
  font-family: var(--hr-mono);
  font-size: 10px;
  letter-spacing: .18em;
  text-transform: uppercase;
  font-weight: 700;
}
.az2-badge::before {
  content: ""; width: 5px; height: 5px; border-radius: 50%;
  background: var(--hr-pink-strong);
}
@media (max-width: 999px) { .az2-badge-label { display: none; } }

/* Workspace */
.az2-workspace {
  display: grid;
  grid-template-columns: 380px minmax(0, 1fr);
  /* 不居中：输入栏紧贴左侧导航，结果列自身已 max-width:900 限宽 */
  max-width: none;
  margin: 0;
}
@media (max-width: 767px) {
  .az2-workspace { grid-template-columns: 1fr; }
}

/* Left: input panel */
.az2-input-panel {
  border-right: 1px solid var(--hr-border-2);
  padding: 28px;
  min-height: calc(100vh - 55px);
  position: sticky;
  top: 0;
  align-self: start;
  background: var(--hr-surface-2);
  animation: az2-fade .3s ease both;
}
@media (max-width: 767px) {
  .az2-input-panel {
    border-right: 0;
    border-bottom: 1px solid var(--hr-border-2);
    min-height: auto;
    position: static;
    padding: 16px 14px;
  }
}

.az2-section-label {
  font-family: var(--hr-mono);
  font-size: 10px; font-weight: 700;
  letter-spacing: .22em; text-transform: uppercase;
  color: var(--hr-ink-3);
}

.az2-dir-tag {
  font-family: var(--hr-mono);
  font-size: 10px; font-weight: 700;
  letter-spacing: .12em;
  color: var(--hr-mint-strong);
  padding: 4px 10px;
  background: var(--hr-mint-soft);
  border-radius: 999px;
}

.az2-textarea {
  width: 100%;
  min-height: 168px;
  padding: 14px 16px;
  border: 1px solid var(--hr-border-2);
  border-radius: 12px;
  background: var(--hr-surface-1);
  color: var(--hr-ink-1);
  font-family: var(--hr-hangul);
  font-size: 15px;
  line-height: 26px;
  resize: vertical;
  outline: none;
  transition: all .2s var(--hr-ease);
  box-sizing: border-box;
}
.az2-textarea:focus {
  border-color: var(--hr-pink-base);
  background: var(--hr-surface-2);
  box-shadow: 0 0 0 3px rgba(255,127,168,.12);
}
.az2-textarea::placeholder { color: var(--hr-ink-4); font-family: var(--hr-sans); }

.az2-meta-row {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 10px;
  font-family: var(--hr-mono);
  font-size: 10px;
  letter-spacing: .14em;
  color: var(--hr-ink-3);
}

.az2-actions {
  display: grid; grid-template-columns: 1fr auto; gap: 8px;
  margin-top: 18px;
}
.az2-btn-primary {
  height: 44px; border-radius: 999px;
  background: var(--hr-ink-1);
  color: var(--hr-surface-1);
  font-family: var(--hr-sans);
  font-size: 13px; font-weight: 700;
  letter-spacing: .02em;
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  transition: background .2s var(--hr-ease);
  border: 0; cursor: pointer;
  padding: 0 22px;
}
.az2-btn-primary:hover { background: var(--hr-pink-strong); }
.az2-btn-primary:disabled { background: var(--hr-surface-4); color: var(--hr-ink-3); cursor: not-allowed; }
.az2-btn-secondary {
  height: 44px; padding: 0 20px; border-radius: 999px;
  background: var(--hr-surface-2);
  color: var(--hr-ink-2);
  border: 1px solid var(--hr-border-2);
  font-family: var(--hr-sans);
  font-size: 13px; font-weight: 700;
  cursor: pointer;
  transition: all .2s var(--hr-ease);
}
.az2-btn-secondary:hover { border-color: var(--hr-pink-base); color: var(--hr-pink-strong); }

.az2-shortcut {
  margin-top: 10px;
  font-family: var(--az2-mono);
  font-size: 11px; color: var(--color-ink-3);
}
.az2-shortcut kbd {
  padding: 1px 5px;
  border: 1px solid var(--color-border-1);
  border-radius: 3px;
  background: var(--color-surface-1);
  font-family: inherit; font-size: 10px;
  color: var(--az2-ink-2);
}

.az2-hint {
  margin-top: 12px;
  padding: 10px 12px; border-radius: 6px;
  background: var(--color-surface-1);
  border: 1px solid var(--color-border-1);
  font-size: 12px; color: var(--az2-ink-2);
  line-height: 1.55;
}
.az2-hint strong { color: var(--color-pink-strong); font-weight: 500; }

.az2-history-block { margin-top: 32px; }
/* Show/hide by breakpoint */
.az2-only-desktop { display: block; }
.az2-only-mobile { display: none; }
@media (max-width: 767px) {
  .az2-only-desktop { display: none; }
  .az2-only-mobile { display: block; }
}
.az2-history-head {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--color-ink-3);
  margin-bottom: 8px;
}
.az2-history-head button {
  font-size: 10px; letter-spacing: 0;
  text-transform: none; font-weight: 500;
  color: var(--color-ink-3);
  background: transparent; border: 0; cursor: pointer;
}
.az2-history-item {
  display: block; width: 100%; text-align: left;
  padding: 10px 0;
  border: 0; border-bottom: 1px solid var(--color-border-1);
  background: transparent;
  cursor: pointer;
}
.az2-history-item:last-child { border-bottom: 0; }
.az2-history-item .h-ko {
  /* 中文字体优先 + 韩文兜底：历史原文可能是中文（中→韩方向）。
     韩文字体栈缺简体字会逐字回退，造成同句字体分裂。中文栈完整覆盖简体、且不含谚文，
     纯中/纯韩条目都能整句走同一字体，不再逐字裂开 */
  font-family: var(--hr-sans), 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  font-size: 13px; font-weight: 500;
  color: var(--color-ink-1);
  line-height: 1.4;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  transition: color .12s;
}
.az2-history-item:hover .h-ko { color: var(--color-pink-strong); }
.az2-history-item .h-zh {
  /* 与 .h-ko 同栈：这一行可能是韩文译文（中→韩条目），中文栈缺谚文会逐字回退 */
  font-family: var(--hr-sans), 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  font-size: 12px; color: var(--color-ink-3);
  margin-top: 2px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.az2-history-item .h-time {
  font-family: var(--az2-mono);
  font-size: 10px; color: var(--color-ink-3);
  margin-top: 4px;
}

/* Right: result column */
.az2-result-col {
  padding: 24px 32px 48px;
  min-width: 0;
  max-width: 900px;
}
@media (max-width: 767px) {
  .az2-result-col { padding: 16px 14px 56px; }
}

.az2-result-head {
  position: sticky; top: 0; z-index: 6;
  display: flex; justify-content: space-between; align-items: center;
  padding: 18px 0 14px;
  margin-bottom: 22px;
  border-bottom: 1px solid var(--hr-border-2);
  background: var(--hr-surface-1);
}
.az2-result-head h2 {
  font-family: var(--hr-serif);
  font-weight: 700;
  font-size: 22px;
  display: flex; align-items: baseline; gap: 10px;
  color: var(--hr-ink-1);
  letter-spacing: -.01em;
}
.az2-result-head .n {
  font-family: var(--hr-mono);
  font-size: 11px; letter-spacing: .18em;
  color: var(--hr-ink-3); font-weight: 700;
  text-transform: uppercase;
}

.az2-icon-btn {
  height: 34px; padding: 0 14px; border-radius: 999px;
  border: 1px solid var(--hr-border-2);
  background: var(--hr-surface-2);
  color: var(--hr-ink-2);
  font-family: var(--hr-sans);
  font-size: 12px; font-weight: 700;
  display: inline-flex; align-items: center; gap: 6px;
  cursor: pointer;
  transition: all .2s var(--hr-ease);
}
.az2-icon-btn:hover { border-color: var(--hr-pink-base); color: var(--hr-pink-strong); }
.az2-icon-btn.mint {
  color: var(--hr-mint-strong);
  border-color: var(--hr-mint-base);
  background: var(--hr-mint-soft);
}
.az2-icon-btn.primary {
  background: var(--hr-ink-1);
  color: var(--hr-surface-1);
  border-color: var(--hr-ink-1);
}
.az2-icon-btn.primary:hover { background: var(--hr-pink-strong); border-color: var(--hr-pink-strong); color: #fff; }

/* Card block */
.az2-card {
  background: var(--hr-surface-2);
  border: 1px solid var(--hr-border-2);
  border-radius: 14px;
  padding: 22px 24px;
  margin-bottom: 16px;
  box-shadow: var(--hr-shadow-sm, 0 1px 0 rgba(58,46,41,.04), 0 2px 6px rgba(58,46,41,.04));
}
@media (max-width: 767px) { .az2-card { padding: 16px; margin-bottom: 12px; } }

/* 翻译卡冻结在结果头下方，下滑时只滚动词汇/语法（桌面+手机通用） */
.az2-card-sticky {
  position: sticky;
  top: 52px;
  z-index: 5;
}

.az2-card-head {
  display: flex; justify-content: space-between; align-items: baseline;
  margin-bottom: 14px;
}
.az2-card-head h3 {
  font-family: var(--hr-mono);
  font-size: 10px; font-weight: 700;
  letter-spacing: .22em; text-transform: uppercase;
  color: var(--hr-ink-3);
  display: flex; align-items: baseline; gap: 10px;
}
.az2-card-head .n {
  font-family: var(--hr-serif);
  font-size: 15px; color: var(--hr-pink-strong);
  font-weight: 700; letter-spacing: 0;
  font-style: italic;
}
.az2-card-head .link {
  font-family: var(--hr-sans);
  font-size: 11px; color: var(--hr-ink-3);
  font-weight: 600;
  background: transparent; border: 0; cursor: pointer;
  transition: color .2s;
}
.az2-card-head .link:hover { color: var(--hr-pink-strong); }

/* Translation content */
.az2-korean {
  display: block;
  font-family: var(--az2-ko);
  font-size: 22px; line-height: 1.55; font-weight: 500;
  color: var(--color-ink-1);
  margin-bottom: 4px;
}
.az2-romanization {
  font-family: var(--az2-mono);
  font-size: 12px;
  color: var(--color-ink-3);
  margin-bottom: 16px;
  padding-left: 2px;
}

.az2-zh-full {
  font-size: 16px; line-height: 1.65;
  color: var(--az2-ink-2);
  padding: 12px 14px;
  background: var(--color-surface-1);
  border-left: 3px solid var(--color-pink-strong);
  border-radius: 0 4px 4px 0;
}

.az2-quick-tools {
  display: flex; gap: 8px;
  margin-top: 12px;
  flex-wrap: wrap;
}
.az2-quick-tools button {
  height: 30px; padding: 0 12px; border-radius: 6px;
  background: transparent;
  color: var(--az2-ink-2);
  border: 1px solid var(--color-border-1);
  font-size: 12px; font-weight: 500;
  cursor: pointer;
}
.az2-quick-tools button:hover { background: var(--az2-hover); }
.az2-quick-tools button.saved {
  color: var(--color-mint-strong);
  border-color: var(--color-mint-strong);
  background: var(--color-mint-soft);
}

.az2-note {
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 6px;
  background: var(--color-surface-1);
  color: var(--color-ink-3);
  font-size: 13px; line-height: 1.6;
  font-style: italic;
}

/* Wave (speaking) */
.az2-wave { display: inline-flex; gap: 2px; align-items: end; height: 10px; }
.az2-wave span { width: 2px; border-radius: 1px; animation: az2-wave 1.1s ease-in-out infinite; background: currentColor; }
.az2-wave span:nth-child(1) { height: 40%; animation-delay: 0s; }
.az2-wave span:nth-child(2) { height: 100%; animation-delay: .15s; }
.az2-wave span:nth-child(3) { height: 60%; animation-delay: .3s; }

/* Grammar item — CSS 控制 border，不用内联，确保 :first-of-type 可隐藏 */
.az2-grammar-item { border-top: 1px solid var(--color-border-1); padding: 16px 0; }
.az2-grammar-item:first-of-type { border-top: 0; padding-top: 0; }
.az2-grammar-item:last-of-type { padding-bottom: 0; }

/* Suggestion */
.az2-suggestion {
  padding: 14px 16px;
  border-left: 3px solid var(--color-pink-strong);
  background: var(--color-pink-soft);
  border-radius: 0 4px 4px 0;
}
.az2-suggestion h4 {
  font-size: 12px; font-weight: 600;
  color: var(--color-pink-strong);
  margin-bottom: 4px;
  letter-spacing: 0.06em; text-transform: uppercase;
}
.az2-suggestion p {
  font-size: 13px; line-height: 1.6;
  color: var(--az2-ink-2);
}

/* Empty / spinner */
.az2-empty, .az2-analyzing {
  border: 1px dashed var(--color-border-1);
  border-radius: 6px;
  padding: 48px 24px;
  text-align: center;
  color: var(--color-ink-3);
}
.az2-empty h4 { font-size: 14px; font-weight: 500; color: var(--color-ink-1); }
.az2-empty p { font-size: 12px; margin-top: 6px; }
.az2-spinner {
  width: 28px; height: 28px;
  border: 3px solid var(--color-border-1);
  border-top-color: var(--color-pink-strong);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  margin: 0 auto 12px;
}

/* Group label (deep 词汇分组) */
.az2-group-label {
  font-family: var(--az2-mono);
  font-size: 10px; font-weight: 600;
  color: var(--color-pink-strong);
  margin: 4px 0 6px;
  letter-spacing: 0.1em; text-transform: uppercase;
}

/* Overview chips */
.az2-chip {
  display: inline-flex; align-items: baseline; gap: 4px;
  font-size: 12px; padding: 4px 10px;
  border-radius: 4px;
  background: var(--color-pink-soft);
  color: var(--color-ink-1);
}
.az2-chip .label { color: var(--color-ink-3); font-weight: 500; }
.az2-chip strong { font-weight: 600; }

.az2-diff-reason {
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 6px;
  background: var(--color-mint-soft);
  color: var(--color-mint-strong);
  font-size: 12px; line-height: 1.55;
}

/* Sentences list (deep) */
.az2-sentence-row {
  padding: 12px 0;
  border-bottom: 1px dashed var(--color-border-1);
}
.az2-sentence-row:last-child { border-bottom: 0; }

/* Culture note */
.az2-culture {
  padding: 12px 14px;
  border-radius: 6px;
  background: var(--color-pink-soft);
  border: 1px solid var(--color-border-1);
  margin-bottom: 8px;
}
.az2-culture strong { font-size: 13px; color: var(--color-pink-strong); }
.az2-culture p { margin: 4px 0 0; font-size: 12px; line-height: 1.6; color: var(--az2-ink-2); }

/* Toast */
.az2-toast {
  position: fixed; top: 60px; left: 50%; transform: translateX(-50%);
  background: var(--color-ink-1); color: var(--color-surface-2);
  border-radius: 999px;
  padding: 9px 20px;
  font-size: 13px; font-weight: 500;
  z-index: 300;
  white-space: nowrap;
  box-shadow: 0 8px 20px rgba(0,0,0,.16);
  display: flex; align-items: center; gap: 8px;
  animation: az2-fade .2s ease;
}

/* Mobile dock */
.az2-dock {
  position: fixed; left: 12px; right: 12px;
  bottom: calc(56px + env(safe-area-inset-bottom, 0px) + 8px);
  z-index: 60;
  display: grid; grid-template-columns: 1fr auto 1fr;
  gap: 6px; padding: 6px;
  border-radius: 999px;
  background: var(--color-surface-2);
  border: 1px solid var(--color-border-1);
  box-shadow: 0 -6px 22px rgba(0,0,0,.06), 0 20px 40px rgba(0,0,0,.16);
}
.az2-dock button {
  height: 44px; border-radius: 999px;
  font-size: 12px; font-weight: 600;
  border: 0; background: transparent;
  color: var(--az2-ink-2);
  cursor: pointer;
  padding: 0 12px;
}
.az2-dock .primary {
  min-width: 120px; padding: 0 20px;
  background: var(--color-ink-1);
  color: var(--color-surface-2);
}
@media (min-width: 768px) { .az2-dock { display: none; } }
`;

export default function AnalyzePage() {
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const router = useRouter();
  const smartBack = useSmartBack('/learning');
  const { lang } = useLang();
  const { requireLogin, isLoggedIn } = useRequireLoginAction();
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>('learn');
  const [input, setInput] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [toast, setToast] = useState<{ msg: string; href?: string } | null>(null);
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());
  const [savedSentences, setSavedSentences] = useState<Set<string>>(new Set());
  const [addedSentences, setAddedSentences] = useState<Set<string>>(new Set());
  const [packingAllWords, setPackingAllWords] = useState(false);
  const [packingAllReview, setPackingAllReview] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [historyResults, setHistoryResults] = useState<HistoryItem[]>([]);
  // 桌面侧栏"最近拆解"要在进页面时就有内容，所以初次挂载和用户切换时都读一次
  useEffect(() => {
    if (!user?.id) { setHistoryResults([]); return; }
    let cancelled = false;
    loadHistory(user.id).then(rows => { if (!cancelled) setHistoryResults(rows); });
    return () => { cancelled = true; };
  }, [user?.id]);

  function showToastMsg(msg: string, href?: string) { setToast({ msg, href }); setTimeout(() => setToast(null), 3000); }

  function detectCharCount(text: string) {
    const len = text.replace(/\s/g, '').length;
    return { len, label: len < 5 ? t('analyze.char_very_short', lang) : len < 20 ? t('analyze.char_short', lang) : len < 80 ? t('analyze.char_para', lang) : t('analyze.char_long', lang) };
  }

  const dir = detectDirection(input);
  const charCount = detectCharCount(input);
  const isLong = charCount.len >= 50;

  async function handleAnalyze() {
    if (!input.trim()) return;
    // 未登录：提示后跳登录页，避免直接调 API 拿 401 只显示"分析失败"toast
    if (!isLoggedIn) {
      requireLogin(() => {});
      return;
    }
    setAnalyzing(true);
    setResult(null);
    setShowHistory(false);

    if (mode === 'deep' && !isLong) {
      showToastMsg(t('analyze.toast_short_for_deep', lang));
    }

    const TIMEOUT_MS = 15000;
    let timedOut = false;
    const timeoutId = setTimeout(() => {
      timedOut = true;
      setAnalyzing(false);
      showToastMsg('请求超时，已切换离线模式');
      const r = analyzeOffline(input.trim());
      setResult(r);
      saveToHistory(r);
      setSavedWords(new Set());
      setSavedSentences(new Set());
      setShowAlt(false);
    }, TIMEOUT_MS);

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: input.trim(), mode, lang }),
        signal: controller.signal,
      });
      if (timedOut) return;
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        // 保留 API 返回的全部字段（structure/romanization/overview/cultureNotes/quiz 等），
        // 只覆盖 original 并把数组字段兜底成数组，避免手动挑字段时漏掉深度模式内容
        const r: AnalysisResult = {
          ...data,
          original: input.trim(),
          fullTranslation: data.fullTranslation || '',
          words: data.words || [],
          particles: data.particles || [],
          grammar: data.grammar || [],
          _degraded: data._downgraded || data._degraded,
        };
        setResult(r);
        saveToHistory(r);
      } else {
        const r = analyzeOffline(input.trim());
        r._degraded = true;
        setResult(r);
        saveToHistory(r);
      }
    } catch {
      if (timedOut) return;
      clearTimeout(timeoutId);
      const r = analyzeOffline(input.trim());
      r._degraded = true;
      setResult(r);
      saveToHistory(r);
    }

    if (!timedOut) {
      setAnalyzing(false);
      setSavedWords(new Set());
      setSavedSentences(new Set());
      setShowAlt(false);
      setShowAllWords(false);
      setShowAllGrammar(false);
    }
  }

  async function handleSaveSentence() {
    if (!result) return;
    if (savedSentences.has(result.original)) { showToastMsg('已保存到我的句子'); return; }
    requireLogin(async () => {
      try {
        const { korean, chinese } = getSentenceFields();
        const existing = await db.sentences.where('korean').equals(korean).first().catch(() => null);
        if (existing) {
          setSavedSentences(prev => new Set([...prev, result.original]));
          showToastMsg(t('analyze.toast_already_saved_sentence', lang), '/vocabulary?tab=sentences');
          return;
        }
        await db.sentences.add({
          id: crypto.randomUUID(),
          korean, chinese, sourceType: 'analysis',
          sourceId: 'analyze-' + Date.now(), sourceTitle: t('analyze.page_title', lang),
          createdAt: Date.now(),
        });
        setSavedSentences(prev => new Set([...prev, result.original]));
        showToastMsg(t('analyze.toast_saved_sentence', lang), '/vocabulary?tab=sentences');
      } catch { showToastMsg(t('analyze.toast_save_fail', lang)); }
    });
  }

  async function handleSaveWord(text: string, meaning: string) {
    if (savedWords.has(text)) { showToastMsg('已保存到词库'); return; }
    requireLogin(async () => {
      try {
        const existing = await db.words.where('word').equals(text).first();
        if (!existing) {
          await db.words.add({
            id: 'analyze-' + text,
            word: text, pronunciation: '', meaning,
            partOfSpeech: '', examples: [], mastery: 'new' as const,
            srsLevel: 0, nextReview: Date.now(), easeFactor: 2.5, interval: 1,
            createdAt: Date.now(), lastReviewed: null,
          });
        }
        setSavedWords(prev => new Set([...prev, text]));
        showToastMsg(t('analyze.toast_saved_word', lang));
      } catch { showToastMsg(t('analyze.toast_save_fail', lang)); }
    });
  }

  async function handlePackAllWords() {
    if (!result || packingAllWords) return;
    if (result.words.length === 0) return;
    requireLogin(async () => {
      // 进入回调时再 snapshot result.words —— 避免 async 过程中 result 被 setResult(null) 抢走
      const wordsSnapshot = result.words;
      const unsaved = wordsSnapshot.filter(w => !savedWords.has(w.text));
      if (unsaved.length === 0) { showToastMsg(t('analyze.toast_saved_word', lang)); return; }
      setPackingAllWords(true);
      try {
        const newlySaved = new Set<string>();
        for (const w of unsaved) {
          const cleanText = stripParticle(w.text);
          try {
            const existing = await db.words.where('word').equals(cleanText).first();
            if (!existing) {
              const wordExamples = w.examples && w.examples.length > 0
                ? w.examples.map((ex) => ({ text: normalizeExample(ex).ko, translation: normalizeExample(ex).zh || '', source: 'manual' as const }))
                : (w.example ? [{ text: w.example, translation: '', source: 'manual' as const }] : []);
              await db.words.add({
                id: 'analyze-' + cleanText,
                word: cleanText,
                pronunciation: w.romanization || w.pronunciation || '',
                meaning: w.meaning,
                partOfSpeech: w.partOfSpeech || '',
                examples: wordExamples,
                mastery: 'new' as const,
                srsLevel: 0, nextReview: Date.now(), easeFactor: 2.5, interval: 1,
                createdAt: Date.now(), lastReviewed: null,
              });
            }
            newlySaved.add(w.text);
          } catch { /* skip this word */ }
        }
        setSavedWords(prev => new Set([...prev, ...newlySaved]));
        showToastMsg(t('analyze.toast_saved_word', lang));
      } finally {
        setPackingAllWords(false);
      }
    });
  }

  async function handlePackAllReview() {
    if (!result || packingAllReview) return;
    if (savedSentences.has(result.original)) { showToastMsg(t('analyze.toast_already_in_review', lang)); return; }
    requireLogin(async () => {
      setPackingAllReview(true);
      try {
        const { korean, chinese } = getSentenceFields();
        await db.sentences.add({
          id: crypto.randomUUID(),
          korean, chinese, sourceType: 'analysis',
          sourceId: 'review-' + Date.now(), sourceTitle: t('analyze.page_title', lang),
          createdAt: Date.now(),
        });
        setSavedSentences(prev => new Set([...prev, result.original]));
        showToastMsg(t('analyze.toast_added_review', lang));
      } catch (e: any) {
        if (e?.name === 'ConstraintError') {
          setSavedSentences(prev => new Set([...prev, result.original]));
          showToastMsg(t('analyze.toast_already_in_review', lang));
        } else {
          showToastMsg(t('analyze.toast_add_review_fail', lang));
        }
      } finally {
        setPackingAllReview(false);
      }
    });
  }

  async function handleAddSentenceToReview(s: { korean: string; chinese: string }) {
    if (addedSentences.has(s.korean)) return;
    requireLogin(async () => {
      try {
        await db.sentences.add({
          id: crypto.randomUUID(),
          korean: s.korean, chinese: s.chinese, sourceType: 'analysis',
          sourceId: 'analyze-sent-' + Date.now(), sourceTitle: t('analyze.page_title', lang),
          createdAt: Date.now(),
        });
        setAddedSentences(prev => new Set([...prev, s.korean]));
        showToastMsg(t('analyze.toast_added_review', lang));
      } catch (e: any) {
        if (e?.name === 'ConstraintError') {
          setAddedSentences(prev => new Set([...prev, s.korean]));
          showToastMsg(t('analyze.toast_already_in_review', lang));
        } else {
          showToastMsg(t('analyze.toast_add_review_fail', lang));
        }
      }
    });
  }

  async function handleQuizWrong(q: { type: string; wordHint?: string }) {
    // 错题入 SRS：
    // - meaning/cloze：从已分析的 words 里找该词的真实 meaning，再入词库
    // - translate：把整句原文 + 中文翻译加入句库
    // - grammar：跳过（语法点不适合扔进现有 SRS 表）
    if (!result) return;
    if (q.type === 'grammar') return;
    requireLogin(async () => {
      try {
        if (q.type === 'meaning' || q.type === 'cloze') {
          if (!q.wordHint) return;
          const cleanText = stripParticle(q.wordHint);
          // 已存在就不动它（不能用占位 meaning 覆盖用户真实数据）
          const existing = await db.words.where('word').equals(cleanText).first();
          if (existing) return;
          // 从分析结果里找该词的元数据
          const matched = result.words.find(w => w.text === q.wordHint || stripParticle(w.text) === cleanText);
          if (matched) {
            await db.words.add({
              id: 'analyze-quiz-' + cleanText,
              word: cleanText,
              pronunciation: matched.romanization || matched.pronunciation || '',
              meaning: matched.meaning,
              partOfSpeech: matched.partOfSpeech || '',
              examples: matched.examples && matched.examples.length > 0
                ? matched.examples.map((ex) => ({ text: normalizeExample(ex).ko, translation: normalizeExample(ex).zh || '', source: 'manual' as const }))
                : (matched.example ? [{ text: normalizeExample(matched.example).ko, translation: normalizeExample(matched.example).zh || '', source: 'manual' as const }] : []),
              mastery: 'new' as const,
              srsLevel: 0, nextReview: Date.now(), easeFactor: 2.5, interval: 1,
              createdAt: Date.now(), lastReviewed: null,
            });
          } else {
            // fallback: AI 给的 wordHint 在 words 里没有，仍入库便于复习，但 meaning 留空
            await db.words.add({
              id: 'analyze-quiz-' + cleanText,
              word: cleanText,
              pronunciation: '',
              meaning: '',
              partOfSpeech: '',
              examples: [],
              mastery: 'new' as const,
              srsLevel: 0, nextReview: Date.now(), easeFactor: 2.5, interval: 1,
              createdAt: Date.now(), lastReviewed: null,
            });
          }
        } else if (q.type === 'translate') {
          // translate 错题：整段原文入句库。
          // 若用户已点过"整段加入复习"或已经因为另一道 translate 错题入过库，跳过避免重复
          if (savedSentences.has(result.original)) return;
          const { korean, chinese } = getSentenceFields();
          await db.sentences.add({
            id: crypto.randomUUID(),
            korean,
            chinese,
            sourceType: 'analysis',
            sourceId: 'analyze-quiz-wrong-' + Date.now(),
            sourceTitle: t('analyze.page_title', lang),
            createdAt: Date.now(),
          });
          setSavedSentences(prev => new Set([...prev, result.original]));
        }
      } catch { /* silent: 错题录入失败不打断答题 */ }
    });
  }

  function handleClear() {
    if (result && !confirm('清空输入和分析结果？')) return;
    setInput('');
    setResult(null);
  }

  function handleCopy() {
    if (!result?.fullTranslation) return;
    navigator.clipboard.writeText(result.fullTranslation).then(() => showToastMsg(t('analyze.toast_copied', lang))).catch(() => showToastMsg(t('analyze.toast_copy_fail', lang)));
  }

  function saveToHistory(r: AnalysisResult) {
    const now = Date.now();
    const item: HistoryItem = {
      id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: now,
      original: r.original,
      fullTranslation: r.fullTranslation,
      result: r,
    };
    setHistoryResults(prev => [item, ...prev].slice(0, MAX_HISTORY));
    saveHistoryItem(item);
  }

  function openHistory() {
    loadHistory(user?.id).then(setHistoryResults);
    setShowHistory(true);
    setResult(null);
  }

  function loadFromHistory(item: HistoryItem) {
    setInput(item.original);
    setShowHistory(false);
    setSavedWords(new Set());
    setSavedSentences(new Set());
    if (item.result) {
      setResult(item.result);
      return;
    }
    // Legacy history items without cached result — re-fetch once
    setResult(null);
    const trimmed = item.original;
    if (trimmed) {
      setAnalyzing(true);
      (async () => {
        try {
          const res = await fetch('/api/ai/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sentence: trimmed, mode }) });
          if (res.ok) {
            const data = await res.json();
            const r: AnalysisResult = {
              original: trimmed, fullTranslation: data.fullTranslation || data.overview || '',
              words: data.words || [], particles: data.particles || [], grammar: data.grammar || [],
              sentences: data.sentences, suggestion: data.suggestion, difficulty: data.difficulty,
            };
            setResult(r);
            saveToHistory(r);
          } else throw new Error('');
        } catch {
          const r = analyzeOffline(trimmed);
          r._degraded = true;
          setResult(r);
        }
        setAnalyzing(false);
      })();
    }
  }

  function clearHistory() {
    setHistoryResults([]);
    clearHistoryStore();
  }

  const [showAllWords, setShowAllWords] = useState(false);
  const [showAllGrammar, setShowAllGrammar] = useState(false);

  // ── Render helpers ──────────────────────────────────
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  async function handleSpeak(text: string) {
    if (speakingText === text) { setSpeakingText(null); return; }
    setSpeakingText(text);
    try { await speak(text); } finally { setSpeakingText(null); }
  }

  // Chip-style speak button
  function renderSpeakBtn(text: string, label?: string) {
    const isActive = speakingText === text;
    return (
      <button
        onClick={() => handleSpeak(text)}
        className="az2-icon-btn"
        style={isActive ? { color: 'var(--color-pink-strong)', borderColor: 'var(--color-pink-strong)', background: 'var(--color-pink-soft)' } : undefined}
      >
        {isActive ? (
          <>
            <span className="az2-wave" aria-hidden><span/><span/><span/></span>
            {t('analyze.btn_speak_stop', lang)}
          </>
        ) : (label ?? '🔊')}
      </button>
    );
  }

  function renderTokenizedKorean(text: string) {
    // Simply split by spaces and wrap each word as a token-like span
    const words = text.split(/(\s+)/).filter(Boolean);
    return words.map((w, i) =>
      w.trim() ? (
        <span key={i} onClick={() => {
          const word = w.replace(/[.,!?~]+$/, '');
          const found = result?.words.find(wo => wo.text === word);
          if (found) showToastMsg(found.meaning);
        }} style={{ display: 'inline-flex', margin: '2px 2px', padding: '2px 5px', borderRadius: 8, background: C.pinkSoft, color: '#5a423b', border: '1px solid rgba(255,127,168,.18)', cursor: 'pointer' }}>{w}</span>
      ) : <span key={i}>{w}</span>
    );
  }

  function renderQuickTools() {
    const isChinese = dir.from === '中文';
    const hasKoreanTranslation = isChinese && /[가-힣]/.test(result?.fullTranslation || '');
    const speakText = isChinese ? result?.fullTranslation : result?.original;
    const canSpeak = isChinese ? hasKoreanTranslation : !!result?.original;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: canSpeak ? '1fr 1fr 1fr' : '1fr 1fr', gap: 8, padding: '0 16px 16px' }}>
        <button onClick={handleCopy} style={{ height: 38, borderRadius: 999, border: '1px solid ' + C.line, background: C.card, color: '#5a4640', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>复制翻译</button>
        <button onClick={handleSaveSentence} style={{ height: 38, borderRadius: 999, border: '1px solid ' + C.line, background: savedSentences.has(result?.original || '') ? C.mintBg : '#fff', color: savedSentences.has(result?.original || '') ? C.mintText : '#5a4640', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>{savedSentences.has(result?.original || '') ? '✓ 已保存' : '保存句子'}</button>
        {canSpeak && (
          <button onClick={() => { if (speakText) handleSpeak(speakText); }} style={{ height: 38, borderRadius: 999, border: '1px solid ' + C.line, background: (speakingText === result?.original || speakingText === result?.fullTranslation) ? C.pinkSoft : '#fff', color: (speakingText === result?.original || speakingText === result?.fullTranslation) ? '#f0799b' : '#5a4640', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>
            {(speakingText === result?.original || speakingText === result?.fullTranslation) ? '⏹ 停止' : (isChinese ? '朗读韩译' : '朗读原文')}
          </button>
        )}
      </div>
    );
  }

  function renderModeDescription() {
    const descs = [
      { label: '快速翻译', desc: '只看意思' },
      { label: '学习拆解', desc: '翻译 + 词句' },
      { label: '深度解析', desc: '长文精读' },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, margin: '-4px 0 14px' }}>
        {descs.map((d, i) => {
          const isActive = (i === 0 && mode === 'translate') || (i === 1 && mode === 'learn') || (i === 2 && mode === 'deep');
          return (
            <div key={d.label} style={{ borderRadius: 20, padding: '10px 6px', textAlign: 'center', background: isActive ? C.pinkSoft : '#fff', border: '1px solid ' + (isActive ? 'rgba(255,127,168,.28)' : C.line), boxShadow: C.shadow }}>
              <strong style={{ display: 'block', fontSize: 12 }}>{d.label}</strong>
              <span style={{ display: 'block', marginTop: 4, color: isActive ? '#f0799b' : C.muted, fontSize: 10, fontWeight: 900 }}>{d.desc}</span>
            </div>
          );
        })}
      </div>
    );
  }

  function renderModeExplanation() {
    const items = [
      { title: '快速翻译', desc: '只要自然翻译、复制、朗读。适合只想快速知道意思。' },
      { title: '学习拆解', desc: '翻译 + 关键词 + 简单语法 + 保存词句。适合短句和普通段落。' },
      { title: '深度解析（长文）', desc: '适合长段落、文章、新闻和热帖，输出全文翻译、逐句对照、重点词汇、语法解析和学完建议。' },
    ];
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '22px 2px 12px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.3px', color: C.ink, margin: 0 }}>三个模式有什么区别</h2>
          <span style={{ fontSize: 12, color: '#f0799b', fontWeight: 700 }}>输出深度</span>
        </div>
        {items.map(item => (
          <div key={item.title} style={{ borderRadius: 26, padding: 14, background: C.card, border: '1px solid ' + C.line, boxShadow: '0 10px 26px rgba(78,52,46,.06)', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 15 }}>{item.title}</h3>
            <p style={{ margin: '7px 0 0', fontSize: 12, lineHeight: 1.55, color: C.muted }}>{item.desc}</p>
          </div>
        ))}
      </>
    );
  }

  return (
    <div style={{ paddingBottom: 152 }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      {toast && (
        <div style={{ position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)', background: C.black, color: '#fff', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 700, zIndex: 300, whiteSpace: 'nowrap', boxShadow: C.strong }}>
          {toast}
        </div>
      )}

      {/* Back bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <button onClick={() => router.push('/tools')} style={{ width: 38, height: 38, borderRadius: 16, background: C.card, border: '1px solid ' + C.line, fontSize: 20, color: '#4d3933', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>内容拆解</div>
          <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, marginTop: 2 }}>翻译 + 学习拆解</div>
        </div>
        <div style={{ height: 30, padding: '0 11px', borderRadius: 999, background: C.pinkSoft, color: '#f0799b', fontSize: 11, fontWeight: 800, border: '1px solid rgba(255,127,168,.16)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>正式功能</div>
      </div>

      {!isLoggedIn && (
        <div style={{ borderRadius: 14, padding: '10px 14px', background: 'rgba(255,127,168,.10)', border: '1px solid rgba(255,127,168,.24)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12 }}>💡</span>
          <span style={{ fontSize: 12, color: '#a05a70', fontWeight: 700, lineHeight: 1.4, flex: 1 }}>
            登录后每天可 AI 拆解 30 次，游客限 5 次
          </span>
          <button onClick={() => router.push('/auth/login?redirect=/ai/analyze')} style={{ height: 28, padding: '0 12px', borderRadius: 999, border: 0, background: '#201815', color: '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer', flexShrink: 0 }}>登录</button>
        </div>
      )}

      {/* Hero */}
      <div style={{ borderRadius: 32, padding: 20, background: 'radial-gradient(circle at 88% 78%, rgba(255,255,255,.58), transparent 24%), linear-gradient(135deg, #fff2f7, #fffdf8 48%, #eaf8f5)', boxShadow: C.strong, border: '1px solid rgba(255,255,255,.92)', marginBottom: 14, overflow: 'hidden', position: 'relative', minHeight: 180 }}>
        <div style={{ height: 34, padding: '0 13px', borderRadius: 999, background: 'rgba(255,255,255,.72)', color: '#f0799b', fontWeight: 800, fontSize: 12, border: '1px solid rgba(255,127,168,.14)', display: 'inline-flex', alignItems: 'center' }}>Translate & Break Down</div>
        <h1 style={{ margin: '14px 0 0', maxWidth: 270, fontSize: 28, lineHeight: 1.12, letterSpacing: '-.8px', fontWeight: 800 }}>自动识别语言，选择输出深度</h1>
        <p style={{ margin: '10px 0 0', maxWidth: 270, fontSize: 13, lineHeight: 1.55, color: '#7f6b64' }}>快速翻译看意思，学习拆解看词句，长文再进入深度解析。</p>
        <div style={{ position: 'absolute', right: 10, bottom: 0, width: 120, height: 142, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', right: -36, bottom: -58, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,127,168,.10)' }} />
          <div style={{ position: 'absolute', top: 2, left: 36, width: 25, height: 68, borderRadius: 999, background: 'linear-gradient(180deg,#fff,#fff5f8)', border: '1px solid rgba(255,127,168,.14)', transform: 'rotate(-12deg)' }} />
          <div style={{ position: 'absolute', top: 2, right: 24, width: 25, height: 68, borderRadius: 999, background: 'linear-gradient(180deg,#fff,#fff5f8)', border: '1px solid rgba(255,127,168,.14)', transform: 'rotate(15deg)' }} />
          <div style={{ position: 'absolute', top: 48, right: 13, width: 88, height: 78, borderRadius: 42, background: 'linear-gradient(180deg,#fff,#fff8fa)', boxShadow: '0 16px 34px rgba(80,52,46,.12)' }}>
            <div style={{ position: 'absolute', top: 34, left: 29, width: 7, height: 7, borderRadius: '50%', background: '#241917' }} />
            <div style={{ position: 'absolute', top: 34, right: 29, width: 7, height: 7, borderRadius: '50%', background: '#241917' }} />
          </div>
        </div>
      </div>

      {/* Mode tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: 6, borderRadius: 999, background: 'rgba(255,255,255,.74)', border: '1px solid ' + C.line, boxShadow: '0 8px 22px rgba(78,52,46,.06)', marginBottom: 14 }}>
        {(['translate', 'learn', 'deep'] as Mode[]).map((m, i) => (
          <button key={m} onClick={() => setMode(m)} style={{
            height: 36, border: 0, borderRadius: 999, background: mode === m ? C.black : 'transparent',
            color: mode === m ? '#fff' : '#8b766e', fontSize: 12, fontWeight: 800, cursor: 'pointer',
          }}>
            {['快速翻译', '学习拆解', '深度解析（长文）'][i]}
          </button>
        ))}
      </div>

      {/* Input card */}
      <div style={{ borderRadius: 30, background: C.card, border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 14, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <h2 style={{ margin: 0, fontSize: 18, letterSpacing: '-.3px' }}>输入内容</h2>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: C.muted, fontSize: 12, fontWeight: 900 }}>
            <span style={{ height: 28, display: 'inline-flex', alignItems: 'center', padding: '0 9px', borderRadius: 999, background: C.cream, border: '1px solid ' + C.line }}>自动识别</span>
          </div>
        </div>
        <p style={{ margin: '8px 0 0', color: C.muted, fontSize: 13, lineHeight: 1.55 }}>
          可以只输一个词、一句话，也可以粘贴一整段。语言方向由系统自动识别；三个按钮只决定结果要输出到什么深度。
        </p>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) handleAnalyze(); }}
          placeholder="粘贴韩文、中文内容..."
          rows={4}
          style={{ marginTop: 14, minHeight: 148, borderRadius: 24, padding: 14, background: C.cream, border: '1px solid rgba(239,224,217,.92)', color: '#6f5c55', fontSize: 15, lineHeight: 1.7, width: '100%', boxSizing: 'border-box', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, color: '#a08f87', fontSize: 11, fontWeight: 900 }}>
          <span>{charCount.len} 字符 · {charCount.label}</span>
          <span>当前：{['快速翻译', '学习拆解', '深度解析（长文）'][['translate', 'learn', 'deep'].indexOf(mode)]}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
          <button onClick={handleAnalyze} disabled={!input.trim() || analyzing} style={{
            height: 44, border: 0, borderRadius: 999, background: C.black, color: '#fff', fontSize: 13, fontWeight: 800,
            boxShadow: '0 12px 26px rgba(32,24,21,.16)', cursor: input.trim() && !analyzing ? 'pointer' : 'not-allowed', opacity: input.trim() && !analyzing ? 1 : 0.5,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            {analyzing && <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />}
            {analyzing ? '处理中...' : '开始处理'}
          </button>
          <button onClick={handleClear} style={{ height: 44, border: '1px solid ' + C.line, borderRadius: 999, background: C.card, color: '#5a4640', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>清空</button>
        </div>
        <p style={{ margin: '8px 2px 0', fontSize: 11, color: C.muted, fontWeight: 700 }}>提示：Ctrl + Enter 快速开始处理</p>
      </div>

      {/* History view */}
      {showHistory && (
        <div style={{ borderRadius: 30, background: C.card, border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 14, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ margin: 0, fontSize: 18, letterSpacing: '-.3px' }}>历史记录</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              {historyResults.length > 0 && (
                <button onClick={clearHistory} style={{ height: 28, padding: '0 10px', borderRadius: 999, border: '1px solid ' + C.line, background: C.card, color: C.muted, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>清除</button>
              )}
              <button onClick={() => setShowHistory(false)} style={{ height: 28, padding: '0 10px', borderRadius: 999, border: '1px solid ' + C.line, background: C.card, color: C.muted, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>关闭</button>
            </div>
          </div>
          {historyResults.length === 0 ? (
            <p style={{ color: C.muted, fontSize: 13, textAlign: 'center', padding: '24px 0' }}>暂无分析记录</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {historyResults.slice(0, 10).map((r, i) => (
                <button key={i} onClick={() => loadFromHistory(r)} style={{ width: '100%', textAlign: 'left', borderRadius: 20, padding: 12, background: C.cream, border: '1px solid ' + C.line, cursor: 'pointer' }}>
                  <div style={{ fontSize: 13, color: C.muted, marginBottom: 4 }}>{new Date(r.timestamp).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.original.slice(0, 60)}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.fullTranslation.slice(0, 80)}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Results */}
      {result && !showHistory && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '4px 2px 12px' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.3px', color: C.ink, margin: 0 }}>当前模式结果</h2>
            <span style={{ fontSize: 12, color: '#f0799b', fontWeight: 700 }}>
            {mode === 'deep' && result && result._degraded
                ? '学习拆解（内容较短，已自动切换）'
                : ['快速翻译', '学习拆解', '深度解析（长文）'][['translate', 'learn', 'deep'].indexOf(mode)]}
            </span>
          </div>

          {/* Degraded notice */}
          {result._degraded && (
            <div style={{ borderRadius: 14, padding: '9px 14px', background: 'rgba(255,200,100,.12)', border: '1px solid rgba(255,180,60,.28)', marginBottom: 12, fontSize: 12, color: '#8a6a30', fontWeight: 700 }}>
              AI 服务暂时不可用，已切换为离线词典模式，结果仅供参考
            </div>
          )}

          {/* Translation card (all modes) */}
          <div style={{ borderRadius: 30, background: C.card, border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 14, overflow: 'hidden' }}>
            <div style={{ padding: '15px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>自然翻译</h2>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {renderSpeakBtn(dir.from === '中文' ? result.fullTranslation : result.original, dir.from === '中文' ? '🔊 听韩译' : '🔊 听原文')}
                <span style={{ height: 28, display: 'inline-flex', alignItems: 'center', padding: '0 9px', borderRadius: 999, background: C.mintBg, color: C.mintText, fontSize: 11, fontWeight: 800 }}>{dir.from} → {dir.to}</span>
              </div>
            </div>
          )}
        </aside>

        {/* Right · Result column */}
        <section className="az2-result-col">

          {/* Empty state */}
          {!result && !showHistory && !analyzing && (
            <div className="az2-empty">
              <div style={{ fontSize: 32, marginBottom: 12, opacity: .5 }}>✎</div>
              <h4>{t('analyze.desktop_empty', lang)}</h4>
              <p>{t('analyze.desktop_empty_sub', lang)}</p>
              <p style={{ marginTop: 18, fontSize: 12, color: 'var(--color-ink-3)' }}>{t('analyze.mode_hint', lang)}</p>
            </div>
          )}

          {/* Analyzing spinner */}
          {analyzing && !result && (
            <div className="az2-analyzing">
              <div className="az2-spinner" />
              <p style={{ fontSize: 13, fontWeight: 500 }}>{t('analyze.btn_analyzing', lang)}</p>
            </div>
          )}

          {/* History full view */}
          {showHistory && (
            <div className="az2-card">
              <div className="az2-card-head">
                <h3>{t('analyze.history_title', lang)}</h3>
                <div style={{ display: 'flex', gap: 8 }}>
                  {historyResults.length > 0 && (
                    <button className="az2-icon-btn" onClick={clearHistory}>{t('analyze.history_clear', lang)}</button>
                  )}
                  <button className="az2-icon-btn" onClick={() => setShowHistory(false)}>{t('analyze.history_close', lang)}</button>
                </div>
              </div>
              {historyResults.length === 0 ? (
                <p style={{ color: 'var(--color-ink-3)', fontSize: 13, textAlign: 'center', padding: '24px 0' }}>{t('analyze.history_empty', lang)}</p>
              ) : (
                <div>
                  {historyResults.slice(0, 20).map((r, i) => (
                    <button key={i} className="az2-history-item" onClick={() => loadFromHistory(r)}>
                      <div className="h-time">{new Date(r.timestamp).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                      <div className="h-ko">{r.original.slice(0, 60)}</div>
                      <div className="h-zh">{r.fullTranslation.slice(0, 80)}</div>
                    </button>
                  ))}
                </div>
              )}
              {/* Alternative translation (quick translate mode) */}
              {mode === 'translate' && result.alternativeTranslation && (
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => setShowAlt(!showAlt)} style={{ height: 30, padding: '0 10px', borderRadius: 999, border: '1px solid ' + C.line, background: C.card, color: '#5a4640', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
                    更自然译法 {showAlt ? '▲' : '▼'}
                  </button>
                  <button className="az2-icon-btn primary" onClick={handlePackAllReview} disabled={savedSentences.has(result.original) || packingAllReview}>
                    + {t('analyze.btn_add_review', lang)}
                  </button>
                </div>
              </div>

              {result._degraded && (
                <div style={{ padding: '9px 14px', borderRadius: 6, background: 'rgba(255,200,100,.12)', border: '1px solid rgba(255,180,60,.28)', fontSize: 12, color: 'var(--color-gold-strong)', fontWeight: 500, marginBottom: 16 }}>
                  {t('analyze.degraded_notice', lang)}
                </div>
              )}

              {/* Translation card — 桌面下滑时冻结在顶部 */}
              <div className="az2-card az2-card-sticky">
                <div className="az2-card-head">
                  <h3>{t('analyze.translation_title', lang)} <span className="n">{dir.from} → {dir.to}</span></h3>
                  {renderSpeakBtn(
                    dir.from === '中文' ? result.fullTranslation : result.original,
                  )}
                </div>

                {/* 韩→中：韩文原文 + 罗马音；中→韩：韩文翻译为主展示 */}
                {mode === 'learn' && dir.from !== '中文' && (
                  <>
                    <TappableText text={result.original} className="az2-korean" source="analyze" />
                    <div className="az2-romanization">{displayRoman(result.romanization, result.original)}</div>
                  </>
                )}

                {/* 中→韩：韩语翻译大字显示 */}
                {dir.from === '中文' && (
                  <TappableText text={result.fullTranslation} className="az2-korean" style={{ marginBottom: 8 }} source="analyze" />
                )}

                {/* 韩→中：中文翻译；中→韩：不重复，韩译已在上面 az2-korean 展示 */}
                {dir.from !== '中文' && (
                  <div className="az2-zh-full">
                    {result.fullTranslation || t('analyze.no_translation', lang)}
                  </div>
                )}

                {/* 中→韩：原文回显 */}
                {dir.from === '中文' && (
                  <div style={{ marginTop: 8, fontSize: 13, color: 'var(--color-ink-3)', lineHeight: 1.5 }}>
                    {result.original}
                  </div>
                )}

                {/* 中→韩：多个韩语说法供选择 */}
                {dir.from === '中文' && result.alternativeTranslations && result.alternativeTranslations.length > 0 && (
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace', fontSize: 10, fontWeight: 600, color: 'var(--color-ink-3)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                      {lang === 'en' ? 'Other ways to say it' : '还可以这样说'}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {result.alternativeTranslations.map((alt, i) => (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'center', gap: 10,
                          padding: '10px 14px',
                          background: 'var(--color-surface-1)',
                          borderRadius: 8,
                          border: '1px solid var(--color-border-1)',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          // 点击选中，替换主翻译
                          const swapped = result.fullTranslation;
                          const newAlts = [...(result.alternativeTranslations || [])];
                          newAlts[i] = { ko: swapped, context: alt.context };
                          setResult({ ...result, fullTranslation: alt.ko, alternativeTranslations: newAlts });
                        }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: "'Noto Sans KR', 'Malgun Gothic', sans-serif", fontSize: 15, fontWeight: 500, color: 'var(--color-ink-1)', lineHeight: 1.5 }}>
                              {alt.ko}
                            </div>
                          </div>
                          <span style={{
                            fontSize: 11, fontWeight: 500, color: 'var(--color-pink-strong)',
                            background: 'var(--color-pink-soft)',
                            padding: '3px 8px', borderRadius: 4,
                            flexShrink: 0,
                          }}>
                            {alt.context}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleSpeak(alt.ko); }}
                            style={{
                              width: 26, height: 26, borderRadius: 6,
                              border: '1px solid var(--color-border-1)',
                              background: 'transparent', color: 'var(--color-ink-3)',
                              display: 'grid', placeItems: 'center',
                              fontSize: 11, cursor: 'pointer', flexShrink: 0,
                            }}
                          >
                            🔊
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.literalTranslation && (
                  <div style={{ marginTop: 10 }}>
                    <button className="az2-icon-btn" onClick={() => setShowLiteral(v => !v)}>
                      {showLiteral ? t('analyze.toggle_literal_hide', lang) : t('analyze.toggle_literal', lang)}
                    </button>
                    {showLiteral && (
                      <div style={{ marginTop: 8, padding: 10, borderRadius: 6, background: 'var(--color-surface-1)', color: 'var(--color-ink-3)', fontSize: 13, lineHeight: 1.65 }}>
                        <span style={{ marginRight: 6, fontWeight: 600, fontSize: 10, color: 'var(--color-pink-strong)' }}>{t('analyze.literal_label', lang)}</span>
                        {result.literalTranslation}
                      </div>
                    )}
                  </div>
                )}

                {result.note && mode !== 'deep' && (
                  <div className="az2-note">{result.note}</div>
                )}

                <div className="az2-quick-tools">
                  <button onClick={handleCopy}>⧉ {t('analyze.btn_copy', lang)}</button>
                  <button
                    className={savedSentences.has(result.original) ? 'saved' : ''}
                    onClick={handleSaveSentence}
                  >
                    {savedSentences.has(result.original) ? '✓ ' + t('analyze.btn_saved_sentence', lang) : '☆ ' + t('analyze.btn_save_sentence', lang)}
                  </button>
                </div>
              </div>

              {/* Structure card (both modes) */}
              {result.structure && result.structure.length > 0 && (
                <div className="az2-card">
                  <SentenceStructureChart items={result.structure} />
                </div>
              )}

              {/* Vocab card */}
              {result.words.length > 0 && mode === 'learn' && (
                <div className="az2-card">
                  <div className="az2-card-head">
                    <h3>{lang === 'en' ? 'Vocabulary' : '词汇'} <span className="n">{String(result.words.length).padStart(2, '0')}</span></h3>
                    {(() => {
                      const unsaved = result.words.filter(w => !savedWords.has(w.text)).length;
                      if (unsaved === 0) return null;
                      return (
                        <button className="link" onClick={handlePackAllWords} disabled={packingAllWords}>
                          {packingAllWords ? '…' : t('analyze.deep.pack_all_words', lang, { n: String(unsaved) })}
                        </button>
                      );
                    })()}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {result.words.slice(0, showAllWords ? undefined : 6).map((w, i) => (
                      <AnalyzeWordCard
                        key={i}
                        word={w}
                        saved={savedWords.has(w.text)}
                        onSave={() => handleSaveWord(w.text, w.meaning)}
                        onSpeak={(text) => speak(text)}
                      />
                    ))}
                  </div>
                  {result.words.length > 6 && (
                    <button className="az2-icon-btn" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }} onClick={() => setShowAllWords(v => !v)}>
                      {showAllWords ? t('analyze.btn_collapse', lang) : t('analyze.btn_show_all', lang, { n: String(result.words.length) })}
                    </button>
                  )}
                </div>
              )}

              {/* Deep mode vocab grouped */}
              {result.words.length > 0 && mode === 'deep' && (() => {
                const groups: Array<{ label: string; key: 'core' | 'common' | 'advanced'; items: typeof result.words }> = [
                  { label: t('analyze.deep.importance_core', lang), key: 'core', items: result.words.filter(w => w.importance === '核心') },
                  { label: t('analyze.deep.importance_common', lang), key: 'common', items: result.words.filter(w => w.importance === '常用') },
                  { label: t('analyze.deep.importance_advanced', lang), key: 'advanced', items: result.words.filter(w => w.importance === '进阶') },
                ];
                const ungrouped = result.words.filter(w => !w.importance);
                if (ungrouped.length > 0) groups[1].items = [...groups[1].items, ...ungrouped];
                return (
                  <div className="az2-card">
                    <div className="az2-card-head">
                      <h3>{lang === 'en' ? 'Vocabulary' : '词汇'} <span className="n">{String(result.words.length).padStart(2, '0')}</span></h3>
                    </div>
                    {groups.filter(g => g.items.length > 0).map(g => (
                      <div key={g.key} style={{ marginBottom: 12 }}>
                        <div className="az2-group-label">{g.label} · {g.items.length}</div>
                        <div>
                          {g.items.map((w, i) => (
                            <AnalyzeWordCard
                              key={`${g.key}-${i}`}
                              word={w}
                              saved={savedWords.has(w.text)}
                              onSave={() => handleSaveWord(w.text, w.meaning)}
                              onSpeak={(text) => speak(text)}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}

              {/* Deep mode: overview */}
              {mode === 'deep' && (result.overview?.topic || result.overview?.tone || result.overview?.scenario || result.difficultyReason || result.difficulty) && (
                <div className="az2-card">
                  <div className="az2-card-head">
                    <h3>
                      {t('analyze.deep.overview_title', lang)}
                      {result.difficulty && <span className="n">· {result.difficulty}</span>}
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {[
                      { key: 'topic_label', v: result.overview?.topic },
                      { key: 'tone_label', v: result.overview?.tone },
                      { key: 'scenario_label', v: result.overview?.scenario },
                    ].filter(x => x.v).map((x, i) => (
                      <span key={i} className="az2-chip">
                        <span className="label">{t('analyze.deep.' + x.key, lang)}:</span>
                        <strong>{x.v}</strong>
                      </span>
                    ))}
                  </div>
                  {result.difficultyReason && (
                    <div className="az2-diff-reason">
                      <strong style={{ marginRight: 4 }}>{t('analyze.deep.difficulty_reason_label', lang)}:</strong>
                      {result.difficultyReason}
                    </div>
                  )}
                </div>
              )}

          {/* Learn mode: sentence breakdown */}
          {mode === 'learn' && result.words.length > 0 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '4px 2px 12px' }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.3px', color: C.ink, margin: 0 }}>句子拆解</h2>
                <span style={{ fontSize: 12, color: '#f0799b', fontWeight: 700 }}>可保存</span>
              </div>
              <div style={{ borderRadius: 26, padding: 15, background: C.card, border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', height: 26, padding: '0 10px', borderRadius: 999, background: C.black, color: '#fff', fontSize: 11, fontWeight: 700 }}>原句</span>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {renderSpeakBtn(dir.from === '中文' ? result.fullTranslation : result.original, dir.from === '中文' ? '🔊 听韩译' : '🔊 听原句')}
                    <span style={{ height: 26, display: 'inline-flex', alignItems: 'center', padding: '0 10px', borderRadius: 999, background: C.mintBg, color: C.mintText, fontSize: 11, fontWeight: 700 }}>口语表达</span>
                  </div>
                </div>
                <p style={{ fontSize: 17, lineHeight: 1.6, fontWeight: 900, margin: 0 }}>
                  {renderTokenizedKorean(result.original)}
                </p>
                <p style={{ margin: '10px 0 0', color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{result.fullTranslation}</p>

                {/* Word breakdown */}
                <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
                  {result.words.slice(0, showAllWords ? undefined : 8).map((w, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'center', padding: '10px 11px', borderRadius: 18, background: C.cream, border: '1px solid rgba(239,224,217,.86)', fontSize: 13 }}>
                      <div>
                        <strong style={{ display: 'block' }}>{w.text}</strong>
                        <span style={{ color: C.muted, fontSize: 12 }}>{w.meaning}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Grammar card */}
              {result.grammar.length > 0 && (
                <div className="az2-card">
                  <div className="az2-card-head">
                    <h3>{t('analyze.grammar_title', lang)} <span className="n">{String(result.grammar.length).padStart(2, '0')}</span></h3>
                  </div>
                  {result.grammar
                    .slice(0, mode === 'learn' && !showAllGrammar ? 3 : undefined)
                    .map((g, i) => (
                      <GrammarTeachingCard key={i} g={g} />
                    ))}
                  {mode === 'learn' && result.grammar.length > 3 && (
                    <button className="az2-icon-btn" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }} onClick={() => setShowAllGrammar(v => !v)}>
                      {showAllGrammar ? t('analyze.btn_collapse_grammar', lang) : t('analyze.btn_show_all_grammar', lang, { n: String(result.grammar.length) })}
                    </button>
                  )}
                </div>
              )}

              {/* Deep mode: culture notes */}
              {mode === 'deep' && result.cultureNotes && result.cultureNotes.length > 0 && (
                <div className="az2-card">
                  <div className="az2-card-head">
                    <h3>{t('analyze.deep.culture_title', lang)}</h3>
                  </div>
                  {result.cultureNotes.map((n, i) => (
                    <div key={i} className="az2-culture">
                      <strong>{n.anchor}</strong>
                      <p>{n.explanation}</p>
                    </div>
                  ))}
                  {result.words.length > 8 && (
                    <button onClick={() => setShowAllWords(v => !v)} style={{ height: 32, border: '1px solid ' + C.line, borderRadius: 999, background: C.card, color: C.muted, fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>
                      {showAllWords ? '收起' : `显示全部 ${result.words.length} 个词 ▼`}
                    </button>
                  )}
                </div>
              )}

                {/* Grammar */}
                {result.grammar.slice(0, showAllGrammar ? undefined : 2).map((g, i) => (
                  <div key={i} style={{ marginTop: 10, padding: 12, borderRadius: 20, background: C.mintBg, fontSize: 13, lineHeight: 1.58, color: '#416b63' }}>
                    <strong>{g.pattern}：</strong>{g.usage}
                  </div>
                ))}
                {result.grammar.length > 2 && (
                  <button onClick={() => setShowAllGrammar(v => !v)} style={{ marginTop: 8, height: 32, border: '1px solid ' + C.line, borderRadius: 999, background: C.card, color: C.muted, fontSize: 12, fontWeight: 800, cursor: 'pointer', width: '100%' }}>
                    {showAllGrammar ? '收起语法' : `显示全部 ${result.grammar.length} 条语法 ▼`}
                  </button>
                )}
              </div>
            </>
          )}

          {/* Deep mode: full article report */}
          {mode === 'deep' && (
            <div style={{ borderRadius: 30, background: C.card, border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 14, padding: 16 }}>
              <h2 style={{ margin: '0 0 12px', fontSize: 18, letterSpacing: '-.3px' }}>
                深度解析
                {result.difficulty && <span style={{ marginLeft: 8, fontSize: 12, color: '#f0799b', fontWeight: 700 }}>· {result.difficulty}</span>}
              </h2>

              {result.sentences && result.sentences.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 10px', color: C.muted }}>逐句对照</h3>
                  {result.sentences.map((s, i) => (
                    <div key={i} style={{ padding: '12px 0', borderBottom: i < result.sentences!.length - 1 ? '1px solid ' + C.line : 'none' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, lineHeight: 1.6, flex: 1 }}>{s.korean}</p>
                        {renderSpeakBtn(s.korean, '🔊')}
                      </div>
                      <p style={{ margin: '6px 0 0', fontSize: 13, color: C.zhText, lineHeight: 1.5 }}>{s.chinese}</p>
                      {s.structure && <p style={{ margin: '6px 0 0', fontSize: 12, color: C.muted }}>{s.structure}</p>}
                    </div>
                  ))}
                </div>
              )}

              {result.words.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 10px', color: C.muted }}>重点词汇（{result.words.length} 个）</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {result.words.slice(0, showAllWords ? undefined : 12).map((w, i) => (
                      <span key={i} style={{ height: 30, padding: '0 10px', borderRadius: 999, background: C.pinkSoft, border: '1px solid rgba(255,127,168,.18)', color: '#5a423b', fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {w.text}
                        <button onClick={() => handleSaveWord(w.text, w.meaning)} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', fontSize: 11, color: savedWords.has(w.text) ? C.mintText : '#f0799b', fontWeight: 800 }}>
                          {savedWords.has(w.text) ? '✓' : '+'}
                        </button>
                      </span>
                    ))}
                  </div>
                  {result.words.length > 12 && (
                    <button onClick={() => setShowAllWords(v => !v)} style={{ marginTop: 8, height: 30, border: '1px solid ' + C.line, borderRadius: 999, background: C.card, color: C.muted, fontSize: 11, fontWeight: 800, cursor: 'pointer', padding: '0 12px' }}>
                      {showAllWords ? '收起' : `显示全部 ${result.words.length} 个 ▼`}
                    </button>
                  )}
                </div>
              )}

              {result.grammar.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 10px', color: C.muted }}>语法解析</h3>
                  {result.grammar.slice(0, showAllGrammar ? undefined : 3).map((g, i) => (
                    <div key={i} style={{ padding: 12, borderRadius: 20, background: C.mintBg, marginBottom: 8, fontSize: 13, lineHeight: 1.58, color: '#416b63' }}>
                      <strong>{g.pattern}</strong> {g.usage}
                    </div>
                  ))}
                  {result.grammar.length > 3 && (
                    <button onClick={() => setShowAllGrammar(v => !v)} style={{ height: 30, border: '1px solid ' + C.line, borderRadius: 999, background: C.card, color: C.muted, fontSize: 11, fontWeight: 800, cursor: 'pointer', padding: '0 12px' }}>
                      {showAllGrammar ? '收起' : `显示全部 ${result.grammar.length} 条 ▼`}
                    </button>
                  )}
                </div>
              )}

              {result.suggestion && (
                <div style={{ padding: 14, borderRadius: 20, background: C.pinkSoft, border: '1px solid rgba(255,127,168,.18)' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 800, margin: '0 0 6px', color: '#f0799b' }}>学完建议</h3>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: '#5a423b' }}>{result.suggestion}</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Mode explanation (no result) */}
      {!result && !showHistory && renderModeExplanation()}

      {/* Bottom bar */}
      <div className="md:left-[108px] md:!bottom-0" style={{
        position: 'fixed', left: 0, right: 0, bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))', height: 88,
        padding: '12px 18px 16px', background: 'rgba(255,255,255,.99)',
        borderTop: '1px solid ' + C.line, zIndex: 100,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, height: '100%', maxWidth: 640, margin: '0 auto' }}>
          <button onClick={openHistory} style={{ borderRadius: 20, fontSize: 12, fontWeight: 800, background: C.cream, color: '#6b5851', border: '1px solid ' + C.line, cursor: 'pointer' }}>历史记录</button>
          <button onClick={handleSaveSentence} disabled={!result} style={{ borderRadius: 20, fontSize: 12, fontWeight: 800, background: result ? C.black : C.cream, color: result ? '#fff' : '#6b5851', border: result ? 'none' : '1px solid ' + C.line, cursor: result ? 'pointer' : 'not-allowed', opacity: result ? 1 : 0.5 }}>
            {savedSentences.has(result?.original || '') ? '已保存' : '保存结果'}
          </button>
          <button onClick={async () => {
            if (!result) return;
            try {
              await db.sentences.add({
                korean: result.original, chinese: result.fullTranslation, source_type: 'analysis',
                source_id: 'review-' + Date.now(), source_title: '内容拆解',
                created_at: new Date().toISOString(),
              });
              showToastMsg('已加入复习队列');
            } catch (e: any) {
              if (e?.name === 'ConstraintError') showToastMsg('已在复习队列中');
              else showToastMsg('加入失败');
            }
          }} disabled={!result} style={{ borderRadius: 20, fontSize: 12, fontWeight: 800, background: C.cream, color: '#6b5851', border: '1px solid ' + C.line, cursor: result ? 'pointer' : 'not-allowed', opacity: result ? 1 : 0.5 }}>加入复习</button>
        </div>
      )}
    </div>
  );
}
