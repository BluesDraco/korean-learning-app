'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { speak } from '@/lib/tts';
import { db } from '@/lib/db';
import { useRequireLoginAction } from '@/hooks/useRequireLoginAction';
import { knowledgeCategories } from '@/data/knowledge';
import { grammarPoints } from '@/data/grammar';
import { useTheme } from '@/components/ThemeProvider';
import { LIGHT_C as _LIGHT_C, DARK_C as _DARK_C } from '@/lib/theme';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { useIsDesktop } from '@/lib/useIsMobile';

const LIGHT_C = { ..._LIGHT_C, cream: '#fff8f4', mintText: '#4e746d', zhText: '#7e6b64', shadow: '0 16px 42px rgba(78,52,46,.10)', strong: '0 28px 72px rgba(78,52,46,.18)' };
const DARK_C  = { ..._DARK_C, cream: '#252040', mintText: '#5ecfb8', zhText: '#9A8AB0', shadow: '0 16px 42px rgba(0,0,0,.30)', strong: '0 28px 72px rgba(0,0,0,.40)' };

type Mode = 'translate' | 'learn' | 'deep';

interface AnalysisResult {
  original: string;
  fullTranslation: string;
  alternativeTranslation?: string;
  words: { text: string; meaning: string; partOfSpeech: string; emoji?: string; pronunciation?: string; example?: string }[];
  particles: { text: string; explanation: string }[];
  grammar: { pattern: string; title: string; usage: string; explanation: string; level: string; conjugation?: string; examples: { ko: string; zh: string }[] }[];
  sentences?: { korean: string; chinese: string; structure?: string }[];
  suggestion?: string;
  difficulty?: string;
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

// ── Offline analyze (fallback) ─────────────────────────
function analyzeOffline(text: string): AnalysisResult {
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
function detectDirection(text: string): { from: string; to: string } {
  const trimmed = text.trim();
  if (!trimmed) return { from: '韩文', to: '中文' };
  const hasHangul = /[가-힣]/.test(trimmed);
  const hasChinese = /[一-鿿]/.test(trimmed);
  if (hasHangul && hasChinese) return { from: '韩文 + 中文', to: '中文' };
  if (hasHangul) return { from: '韩文', to: '中文' };
  if (hasChinese) return { from: '中文', to: '韩文' };
  return { from: '自动识别', to: '系统语言' };
}

// ── History ────────────────────────────────────────────
interface HistoryItem {
  id: string;
  timestamp: number;
  original: string;
  fullTranslation: string;
  result?: AnalysisResult;
}

const HISTORY_KEY = 'analyze-history';
const MAX_HISTORY = 20;

function loadHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try { const raw = localStorage.getItem(HISTORY_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

function saveHistory(items: HistoryItem[]) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, MAX_HISTORY))); } catch {}
}

export default function AnalyzePage() {
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const router = useRouter();
  const { lang } = useLang();
  const { requireLogin, isLoggedIn } = useRequireLoginAction();
  const [mode, setMode] = useState<Mode>('learn');
  const [input, setInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [toast, setToast] = useState<{ msg: string; href?: string } | null>(null);
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());
  const [savedSentences, setSavedSentences] = useState<Set<string>>(new Set());
  const [showHistory, setShowHistory] = useState(false);
  const [historyResults, setHistoryResults] = useState<HistoryItem[]>([]);
  const [showAlt, setShowAlt] = useState(false);

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
      showToastMsg(t('analyze.toast_timeout', lang));
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
        body: JSON.stringify({ sentence: input.trim(), mode }),
      });
      if (timedOut) return;
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        const r: AnalysisResult = {
          original: input.trim(),
          fullTranslation: data.fullTranslation || data.overview || '',
          alternativeTranslation: data.alternativeTranslation,
          words: data.words || [],
          particles: data.particles || [],
          grammar: data.grammar || [],
          sentences: data.sentences || (data.mode === 'article' ? [] : undefined),
          suggestion: data.suggestion,
          difficulty: data.difficulty,
          note: data.note,
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
    if (savedSentences.has(result.original)) { showToastMsg(t('analyze.toast_already_saved_sentence', lang), '/vocabulary?tab=sentences'); return; }
    requireLogin(async () => {
      try {
        await db.sentences.add({
          id: crypto.randomUUID(),
          korean: result.original, chinese: result.fullTranslation, source_type: 'analysis',
          source_id: 'analyze-' + Date.now(), source_title: t('analyze.page_title', lang),
          created_at: new Date().toISOString(),
        });
        setSavedSentences(prev => new Set([...prev, result.original]));
        showToastMsg(t('analyze.toast_saved_sentence', lang), '/vocabulary?tab=sentences');
      } catch { showToastMsg(t('analyze.toast_save_fail', lang)); }
    });
  }

  async function handleSaveWord(text: string, meaning: string) {
    if (savedWords.has(text)) { showToastMsg(t('analyze.toast_saved_word', lang)); return; }
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

  function handleClear() {
    if (result && !confirm(t('analyze.clear_confirm', lang))) return;
    setInput('');
    setResult(null);
  }

  function handleCopy() {
    if (!result?.fullTranslation) return;
    navigator.clipboard.writeText(result.fullTranslation).then(() => showToastMsg(t('analyze.toast_copied', lang))).catch(() => showToastMsg(t('analyze.toast_copy_fail', lang)));
  }

  function saveToHistory(r: AnalysisResult) {
    const item: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      original: r.original,
      fullTranslation: r.fullTranslation,
      result: r,
    };
    const hist = loadHistory();
    hist.unshift(item);
    saveHistory(hist);
  }

  function openHistory() {
    setHistoryResults(loadHistory());
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
    saveHistory([]);
  }

  const [showAllWords, setShowAllWords] = useState(false);
  const [showAllGrammar, setShowAllGrammar] = useState(false);
  const isDesktop = useIsDesktop();

  // ── Render helpers ──────────────────────────────────
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  async function handleSpeak(text: string) {
    if (speakingText === text) { setSpeakingText(null); return; }
    setSpeakingText(text);
    try { await speak(text); } finally { setSpeakingText(null); }
  }

  function renderSpeakBtn(text: string, label = '🔊') {
    const isActive = speakingText === text;
    return (
      <button
        onClick={() => handleSpeak(text)}
        style={{
          height: 30, padding: '0 10px', borderRadius: 999,
          border: '1px solid ' + (isActive ? 'rgba(255,127,168,.4)' : C.line),
          background: isActive ? C.pinkSoft : '#fff',
          color: isActive ? 'var(--color-pink-strong)' : '#5a4640',
          fontSize: 11, fontWeight: 800, cursor: 'pointer', flexShrink: 0,
        }}
      >
        {isActive ? t('analyze.btn_speak_stop', lang) : label}
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
        <button onClick={handleCopy} style={{ height: 38, borderRadius: 999, border: '1px solid ' + C.line, background: C.cream, color: '#5a4640', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>{t('analyze.btn_copy', lang)}</button>
        <button onClick={handleSaveSentence} style={{ height: 38, borderRadius: 999, border: '1px solid ' + C.line, background: savedSentences.has(result?.original || '') ? C.mintBg : '#fff', color: savedSentences.has(result?.original || '') ? C.mintText : '#5a4640', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>{savedSentences.has(result?.original || '') ? t('analyze.btn_saved_sentence', lang) : t('analyze.btn_save_sentence', lang)}</button>
        {canSpeak && (
          <button onClick={() => { if (speakText) handleSpeak(speakText); }} style={{ height: 38, borderRadius: 999, border: '1px solid ' + C.line, background: (speakingText === result?.original || speakingText === result?.fullTranslation) ? C.pinkSoft : '#fff', color: (speakingText === result?.original || speakingText === result?.fullTranslation) ? 'var(--color-pink-strong)' : '#5a4640', fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>
            {(speakingText === result?.original || speakingText === result?.fullTranslation) ? t('analyze.btn_speak_stop', lang) : (isChinese ? t('analyze.speak_korean', lang) : t('analyze.speak_original', lang))}
          </button>
        )}
      </div>
    );
  }

  function renderModeDescription() {
    const descs = [
      { label: t('analyze.mode_translate', lang), desc: t('analyze.mode_translate_desc', lang) },
      { label: t('analyze.mode_learn', lang), desc: t('analyze.mode_learn_desc', lang) },
      { label: t('analyze.mode_deep', lang), desc: t('analyze.mode_deep_desc', lang) },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, margin: '-4px 0 14px' }}>
        {descs.map((d, i) => {
          const isActive = (i === 0 && mode === 'translate') || (i === 1 && mode === 'learn') || (i === 2 && mode === 'deep');
          return (
            <div key={d.label} style={{ borderRadius: 20, padding: '10px 6px', textAlign: 'center', background: isActive ? C.pinkSoft : '#fff', border: '1px solid ' + (isActive ? 'rgba(255,127,168,.28)' : C.line), boxShadow: C.shadow }}>
              <strong style={{ display: 'block', fontSize: 12 }}>{d.label}</strong>
              <span style={{ display: 'block', marginTop: 4, color: isActive ? 'var(--color-pink-strong)' : C.muted, fontSize: 10, fontWeight: 900 }}>{d.desc}</span>
            </div>
          );
        })}
      </div>
    );
  }

  function renderModeExplanation() {
    const items = [
      { title: t('analyze.mode_translate_full', lang), desc: t('analyze.mode_translate_full_desc', lang) },
      { title: t('analyze.mode_learn_full', lang), desc: t('analyze.mode_learn_full_desc', lang) },
      { title: t('analyze.mode_deep_full', lang), desc: t('analyze.mode_deep_full_desc', lang) },
    ];
    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '22px 2px 12px' }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.3px', color: C.ink, margin: 0 }}>{t('analyze.mode_explain_title', lang)}</h2>
          <span style={{ fontSize: 12, color: 'var(--color-pink-strong)', fontWeight: 700 }}>{t('analyze.mode_explain_depth', lang)}</span>
        </div>
        {items.map(item => (
          <div key={item.title} style={{ borderRadius: 26, padding: 14, background: C.cream, border: '1px solid ' + C.line, boxShadow: '0 10px 26px rgba(78,52,46,.06)', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 15 }}>{item.title}</h3>
            <p style={{ margin: '7px 0 0', fontSize: 12, lineHeight: 1.55, color: C.muted }}>{item.desc}</p>
          </div>
        ))}
      </>
    );
  }

  // ── Inline action buttons (shared between desktop and mobile bottom bar) ──
  function renderActionButtons() {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        <button onClick={openHistory} style={{ height: 40, borderRadius: 20, fontSize: 12, fontWeight: 800, background: C.cream, color: '#6b5851', border: '1px solid ' + C.line, cursor: 'pointer' }}>{t('analyze.btn_history', lang)}</button>
        <button onClick={handleSaveSentence} disabled={!result} style={{ height: 40, borderRadius: 20, fontSize: 12, fontWeight: 800, background: result ? C.black : C.cream, color: result ? '#fff' : '#6b5851', border: result ? 'none' : '1px solid ' + C.line, cursor: result ? 'pointer' : 'not-allowed', opacity: result ? 1 : 0.5 }}>
          {savedSentences.has(result?.original || '') ? t('analyze.btn_saved', lang) : t('analyze.btn_save', lang)}
        </button>
        <button onClick={async () => {
          if (!result) return;
          try {
            await db.sentences.add({
              id: crypto.randomUUID(),
              korean: result.original, chinese: result.fullTranslation, source_type: 'analysis',
              source_id: 'review-' + Date.now(), source_title: t('analyze.page_title', lang),
              created_at: new Date().toISOString(),
            });
            showToastMsg(t('analyze.toast_added_review', lang));
          } catch (e: any) {
            if (e?.name === 'ConstraintError') showToastMsg(t('analyze.toast_already_in_review', lang));
            else showToastMsg(t('analyze.toast_add_review_fail', lang));
          }
        }} disabled={!result} style={{ height: 40, borderRadius: 20, fontSize: 12, fontWeight: 800, background: C.cream, color: '#6b5851', border: '1px solid ' + C.line, cursor: result ? 'pointer' : 'not-allowed', opacity: result ? 1 : 0.5 }}>{t('analyze.btn_add_review', lang)}</button>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: isDesktop ? 24 : 152 }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      {toast && (
        <div style={{ position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)', background: C.black, color: '#fff', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 700, zIndex: 300, whiteSpace: 'nowrap', boxShadow: C.strong, display: 'flex', alignItems: 'center', gap: 8 }}>
          {toast.msg}
          {toast.href && <a href={toast.href} style={{ color: 'var(--color-mint-soft)', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>{t('analyze.view_arrow', lang)}</a>}
        </div>
      )}

      {/* Desktop two-column wrapper */}
      <div style={isDesktop ? { display: 'grid', gridTemplateColumns: '420px 1fr', gap: 24, alignItems: 'start' } : {}}>
        {/* Left col (desktop) / full width (mobile) */}
        <div>

      {/* Back bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <button onClick={() => router.push('/tools')} style={{ width: 38, height: 38, borderRadius: 16, background: C.cream, border: '1px solid ' + C.line, fontSize: 20, color: '#4d3933', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>‹</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>{t('analyze.page_title', lang)}</div>
          <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, marginTop: 2 }}>{t('analyze.page_subtitle', lang)}</div>
        </div>
        <div style={{ height: 30, padding: '0 11px', borderRadius: 999, background: C.pinkSoft, color: 'var(--color-pink-strong)', fontSize: 11, fontWeight: 800, border: '1px solid rgba(255,127,168,.16)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>{t('analyze.badge_official', lang)}</div>
      </div>

      {!isLoggedIn && (
        <div style={{ borderRadius: 14, padding: '10px 14px', background: 'rgba(255,127,168,.10)', border: '1px solid rgba(255,127,168,.24)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 12 }}>💡</span>
          <span style={{ fontSize: 12, color: '#a05a70', fontWeight: 700, lineHeight: 1.4, flex: 1 }}>
            {t('analyze.login_hint', lang)}
          </span>
          <button onClick={() => router.push('/auth/login?redirect=/ai/analyze')} style={{ height: 28, padding: '0 12px', borderRadius: 999, border: 0, background: '#201815', color: '#fff', fontSize: 11, fontWeight: 800, cursor: 'pointer', flexShrink: 0 }}>{t('analyze.login_btn', lang)}</button>
        </div>
      )}

      {/* Hero */}
      <div style={{ borderRadius: 32, padding: 20, background: 'radial-gradient(circle at 88% 78%, rgba(255,255,255,.58), transparent 24%), linear-gradient(135deg, #fff2f7, #fffdf8 48%, #eaf8f5)', boxShadow: C.strong, border: '1px solid rgba(255,255,255,.92)', marginBottom: 14, overflow: 'hidden', position: 'relative', minHeight: 180 }}>
        <div style={{ height: 34, padding: '0 13px', borderRadius: 999, background: 'rgba(255,255,255,.72)', color: 'var(--color-pink-strong)', fontWeight: 800, fontSize: 12, border: '1px solid rgba(255,127,168,.14)', display: 'inline-flex', alignItems: 'center' }}>Translate & Break Down</div>
        <h1 style={{ margin: '14px 0 0', maxWidth: 270, fontSize: 28, lineHeight: 1.12, letterSpacing: '-.8px', fontWeight: 800 }}>{t('analyze.hero_title', lang)}</h1>
        <p style={{ margin: '10px 0 0', maxWidth: 270, fontSize: 13, lineHeight: 1.55, color: '#7f6b64' }}>{t('analyze.hero_desc', lang)}</p>
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
            {[t('analyze.mode_translate', lang), t('analyze.mode_learn', lang), t('analyze.mode_deep', lang)][i]}
          </button>
        ))}
      </div>

      {/* Input card */}
      <div style={{ borderRadius: 30, background: C.cream, border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 14, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <h2 style={{ margin: 0, fontSize: 18, letterSpacing: '-.3px' }}>{t('analyze.input_title', lang)}</h2>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: C.muted, fontSize: 12, fontWeight: 900 }}>
            <span style={{ height: 28, display: 'inline-flex', alignItems: 'center', padding: '0 9px', borderRadius: 999, background: C.cream, border: '1px solid ' + C.line }}>{t('analyze.input_auto_detect', lang)}</span>
          </div>
        </div>
        <p style={{ margin: '8px 0 0', color: C.muted, fontSize: 13, lineHeight: 1.55 }}>
          {t('analyze.input_desc', lang)}
        </p>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) handleAnalyze(); }}
          placeholder={t('analyze.input_placeholder', lang)}
          rows={4}
          style={{ marginTop: 14, minHeight: 148, borderRadius: 24, padding: 14, background: C.cream, border: '1px solid rgba(239,224,217,.92)', color: '#6f5c55', fontSize: 15, lineHeight: 1.7, width: '100%', boxSizing: 'border-box', resize: 'vertical', outline: 'none', fontFamily: 'inherit' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, color: '#a08f87', fontSize: 11, fontWeight: 900 }}>
          <span>{charCount.len} {lang === 'en' ? 'chars' : '字符'} · {charCount.label}</span>
          <span>{t('analyze.current_mode_label', lang)}{[t('analyze.mode_translate', lang), t('analyze.mode_learn', lang), t('analyze.mode_deep', lang)][['translate', 'learn', 'deep'].indexOf(mode)]}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
          <button onClick={handleAnalyze} disabled={!input.trim() || analyzing} style={{
            height: 44, border: 0, borderRadius: 999, background: C.black, color: '#fff', fontSize: 13, fontWeight: 800,
            boxShadow: '0 12px 26px rgba(32,24,21,.16)', cursor: input.trim() && !analyzing ? 'pointer' : 'not-allowed', opacity: input.trim() && !analyzing ? 1 : 0.5,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            {analyzing && <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />}
            {analyzing ? t('analyze.btn_analyzing', lang) : t('analyze.btn_analyze', lang)}
          </button>
          <button onClick={handleClear} style={{ height: 44, border: '1px solid ' + C.line, borderRadius: 999, background: C.cream, color: '#5a4640', fontSize: 13, fontWeight: 800, cursor: 'pointer' }}>{t('analyze.btn_clear', lang)}</button>
        </div>
        <p style={{ margin: '8px 2px 0', fontSize: 11, color: C.muted, fontWeight: 700 }}>{t('analyze.input_shortcut', lang)}</p>
      </div>

      {/* Desktop: action buttons below input */}
      {isDesktop && (
        <div style={{ marginTop: 12 }}>
          {renderActionButtons()}
        </div>
      )}

        </div>{/* end left col */}

        {/* Right col (desktop) / full width (mobile) */}
        <div>
            {/* Right col empty state */}
            {isDesktop && !result && !showHistory && !analyzing && (
              <div style={{ borderRadius: 28, border: '1.5px dashed ' + C.line, padding: '48px 24px', textAlign: 'center', color: C.muted }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>⚙</div>
                <p style={{ fontSize: 14, fontWeight: 700, margin: 0 }}>{t('analyze.desktop_empty', lang)}</p>
                <p style={{ fontSize: 12, margin: '6px 0 0' }}>{t('analyze.desktop_empty_sub', lang)}</p>
              </div>
            )}
            {isDesktop && analyzing && (
              <div style={{ borderRadius: 28, border: '1px solid ' + C.line, padding: '48px 24px', textAlign: 'center', color: C.muted }}>
                <div style={{ width: 28, height: 28, border: '3px solid rgba(255,127,168,.3)', borderTopColor: 'var(--color-pink-base)', borderRadius: '50%', animation: 'spin 0.7s linear infinite', margin: '0 auto 12px' }} />
                <p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{t('analyze.btn_analyzing', lang)}</p>
              </div>
            )}

      {/* History view */}
      {showHistory && (
        <div style={{ borderRadius: 30, background: C.cream, border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 14, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h2 style={{ margin: 0, fontSize: 18, letterSpacing: '-.3px' }}>{t('analyze.history_title', lang)}</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              {historyResults.length > 0 && (
                <button onClick={clearHistory} style={{ height: 28, padding: '0 10px', borderRadius: 999, border: '1px solid ' + C.line, background: C.cream, color: C.muted, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>{t('analyze.history_clear', lang)}</button>
              )}
              <button onClick={() => setShowHistory(false)} style={{ height: 28, padding: '0 10px', borderRadius: 999, border: '1px solid ' + C.line, background: C.cream, color: C.muted, fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>{t('analyze.history_close', lang)}</button>
            </div>
          </div>
          {historyResults.length === 0 ? (
            <p style={{ color: C.muted, fontSize: 13, textAlign: 'center', padding: '24px 0' }}>{t('analyze.history_empty', lang)}</p>
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
            <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.3px', color: C.ink, margin: 0 }}>{t('analyze.result_title', lang)}</h2>
            <span style={{ fontSize: 12, color: 'var(--color-pink-strong)', fontWeight: 700 }}>
            {mode === 'deep' && result && result._degraded
                ? t('analyze.result_mode_degraded', lang)
                : [t('analyze.mode_translate', lang), t('analyze.mode_learn', lang), t('analyze.mode_deep', lang)][['translate', 'learn', 'deep'].indexOf(mode)]}
            </span>
          </div>

          {/* Degraded notice */}
          {result._degraded && (
            <div style={{ borderRadius: 14, padding: '9px 14px', background: 'rgba(255,200,100,.12)', border: '1px solid rgba(255,180,60,.28)', marginBottom: 12, fontSize: 12, color: '#8a6a30', fontWeight: 700 }}>
              {t('analyze.degraded_notice', lang)}
            </div>
          )}

          {/* Translation card (all modes) */}
          <div style={{ borderRadius: 30, background: C.cream, border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 14, overflow: 'hidden' }}>
            <div style={{ padding: '15px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>{t('analyze.translation_title', lang)}</h2>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {renderSpeakBtn(dir.from === '中文' ? result.fullTranslation : result.original, dir.from === '中文' ? t('analyze.speak_korean', lang) : t('analyze.speak_original', lang))}
                <span style={{ height: 28, display: 'inline-flex', alignItems: 'center', padding: '0 9px', borderRadius: 999, background: C.mintBg, color: C.mintText, fontSize: 11, fontWeight: 800 }}>{dir.from} → {dir.to}</span>
              </div>
            </div>
            <div style={{ padding: '14px 16px 16px', fontSize: 15, lineHeight: 1.78, color: '#382a26' }}>
              {result.fullTranslation || t('analyze.no_translation', lang)}
              {result.note && mode !== 'deep' && (
                <div style={{ marginTop: 12, padding: 12, borderRadius: 20, background: C.cream, color: '#7e6b64', fontSize: 13, lineHeight: 1.65 }}>
                  {result.note}
                </div>
              )}
              {/* Alternative translation (quick translate mode) */}
              {mode === 'translate' && result.alternativeTranslation && (
                <div style={{ marginTop: 8 }}>
                  <button onClick={() => setShowAlt(!showAlt)} style={{ height: 30, padding: '0 10px', borderRadius: 999, border: '1px solid ' + C.line, background: C.cream, color: '#5a4640', fontSize: 11, fontWeight: 800, cursor: 'pointer' }}>
                    {t('analyze.btn_alt_translation', lang)} {showAlt ? '▲' : '▼'}
                  </button>
                  {showAlt && (
                    <div style={{ marginTop: 8, padding: 12, borderRadius: 20, background: C.cream, color: '#7e6b64', fontSize: 13, lineHeight: 1.65 }}>
                      {result.alternativeTranslation}
                    </div>
                  )}
                </div>
              )}
            </div>
            {renderQuickTools()}
          </div>

          {/* Learn mode: sentence breakdown */}
          {mode === 'learn' && result.words.length > 0 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '4px 2px 12px' }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.3px', color: C.ink, margin: 0 }}>{t('analyze.breakdown_title', lang)}</h2>
                <span style={{ fontSize: 12, color: 'var(--color-pink-strong)', fontWeight: 700 }}>{t('analyze.breakdown_saveable', lang)}</span>
              </div>
              <div style={{ borderRadius: 26, padding: 15, background: C.cream, border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', height: 26, padding: '0 10px', borderRadius: 999, background: C.black, color: '#fff', fontSize: 11, fontWeight: 700 }}>{t('analyze.original_label', lang)}</span>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    {renderSpeakBtn(dir.from === '中文' ? result.fullTranslation : result.original, dir.from === '中文' ? t('analyze.speak_korean', lang) : t('analyze.speak_original_sentence', lang))}
                    <span style={{ height: 26, display: 'inline-flex', alignItems: 'center', padding: '0 10px', borderRadius: 999, background: C.mintBg, color: C.mintText, fontSize: 11, fontWeight: 700 }}>{t('analyze.colloquial_label', lang)}</span>
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
                      <button onClick={() => handleSaveWord(w.text, w.meaning)} style={{
                        height: 30, border: '1px solid rgba(255,127,168,.18)', borderRadius: 999, padding: '0 10px',
                        background: savedWords.has(w.text) ? C.mint : C.pinkSoft,
                        color: savedWords.has(w.text) ? C.mintText : 'var(--color-pink-strong)',
                        fontSize: 11, fontWeight: 800, cursor: 'pointer',
                      }}>
                        {savedWords.has(w.text) ? t('analyze.word_saved_btn', lang) : t('analyze.word_save_btn', lang)}
                      </button>
                    </div>
                  ))}
                  {result.words.length > 8 && (
                    <button onClick={() => setShowAllWords(v => !v)} style={{ height: 32, border: '1px solid ' + C.line, borderRadius: 999, background: C.cream, color: C.muted, fontSize: 12, fontWeight: 800, cursor: 'pointer' }}>
                      {showAllWords ? t('analyze.btn_collapse', lang) : t('analyze.btn_show_all', lang).replace('{n}', String(result.words.length))}
                    </button>
                  )}
                </div>

                {/* Grammar */}
                {result.grammar.slice(0, showAllGrammar ? undefined : 2).map((g, i) => (
                  <div key={i} style={{ marginTop: 10, padding: 12, borderRadius: 20, background: C.mintBg, fontSize: 13, lineHeight: 1.58, color: '#416b63' }}>
                    <strong>{g.pattern}：</strong>{g.usage}
                  </div>
                ))}
                {result.grammar.length > 2 && (
                  <button onClick={() => setShowAllGrammar(v => !v)} style={{ marginTop: 8, height: 32, border: '1px solid ' + C.line, borderRadius: 999, background: C.cream, color: C.muted, fontSize: 12, fontWeight: 800, cursor: 'pointer', width: '100%' }}>
                    {showAllGrammar ? t('analyze.btn_collapse_grammar', lang) : t('analyze.btn_show_all_grammar', lang).replace('{n}', String(result.grammar.length))}
                  </button>
                )}
              </div>
            </>
          )}

          {/* Deep mode: full article report */}
          {mode === 'deep' && (
            <div style={{ borderRadius: 30, background: C.cream, border: '1px solid ' + C.line, boxShadow: C.shadow, marginBottom: 14, padding: 16 }}>
              <h2 style={{ margin: '0 0 12px', fontSize: 18, letterSpacing: '-.3px' }}>
                {t('analyze.deep_title', lang)}
                {result.difficulty && <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--color-pink-strong)', fontWeight: 700 }}>· {result.difficulty}</span>}
              </h2>

              {result.sentences && result.sentences.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 10px', color: C.muted }}>{t('analyze.sentences_title', lang)}</h3>
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
                  <h3 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 10px', color: C.muted }}>{t('analyze.vocab_title', lang).replace('{n}', String(result.words.length))}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {result.words.slice(0, showAllWords ? undefined : 12).map((w, i) => (
                      <span key={i} style={{ height: 30, padding: '0 10px', borderRadius: 999, background: C.pinkSoft, border: '1px solid rgba(255,127,168,.18)', color: '#5a423b', fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {w.text}
                        <button onClick={() => handleSaveWord(w.text, w.meaning)} style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer', fontSize: 11, color: savedWords.has(w.text) ? C.mintText : 'var(--color-pink-strong)', fontWeight: 800 }}>
                          {savedWords.has(w.text) ? '✓' : '+'}
                        </button>
                      </span>
                    ))}
                  </div>
                  {result.words.length > 12 && (
                    <button onClick={() => setShowAllWords(v => !v)} style={{ marginTop: 8, height: 30, border: '1px solid ' + C.line, borderRadius: 999, background: C.cream, color: C.muted, fontSize: 11, fontWeight: 800, cursor: 'pointer', padding: '0 12px' }}>
                      {showAllWords ? t('analyze.btn_collapse', lang) : t('analyze.btn_show_all', lang).replace('{n}', String(result.words.length))}
                    </button>
                  )}
                </div>
              )}

              {result.grammar.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <h3 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 10px', color: C.muted }}>{t('analyze.grammar_title', lang)}</h3>
                  {result.grammar.slice(0, showAllGrammar ? undefined : 3).map((g, i) => (
                    <div key={i} style={{ padding: 12, borderRadius: 20, background: C.mintBg, marginBottom: 8, fontSize: 13, lineHeight: 1.58, color: '#416b63' }}>
                      <strong>{g.pattern}</strong> {g.usage}
                    </div>
                  ))}
                  {result.grammar.length > 3 && (
                    <button onClick={() => setShowAllGrammar(v => !v)} style={{ height: 30, border: '1px solid ' + C.line, borderRadius: 999, background: C.cream, color: C.muted, fontSize: 11, fontWeight: 800, cursor: 'pointer', padding: '0 12px' }}>
                      {showAllGrammar ? t('analyze.btn_collapse', lang) : t('analyze.btn_show_all_grammar', lang).replace('{n}', String(result.grammar.length))}
                    </button>
                  )}
                </div>
              )}

              {result.suggestion && (
                <div style={{ padding: 14, borderRadius: 20, background: C.pinkSoft, border: '1px solid rgba(255,127,168,.18)' }}>
                  <h3 style={{ fontSize: 13, fontWeight: 800, margin: '0 0 6px', color: 'var(--color-pink-strong)' }}>{t('analyze.suggestion_title', lang)}</h3>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: '#5a423b' }}>{result.suggestion}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Mode explanation (no result) */}
      {!result && !showHistory && renderModeExplanation()}

        </div>{/* end right col */}
      </div>{/* end two-column wrapper */}

      {/* Bottom bar — mobile only */}
      {!isDesktop && <div className="md:left-[108px] md:!bottom-0" style={{
        position: 'fixed', left: 0, right: 0, bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))', height: 88,
        padding: '12px 18px 16px', background: C.cream,
        borderTop: '1px solid ' + C.line, zIndex: 100,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, height: '100%', maxWidth: 640, margin: '0 auto' }}>
          <button onClick={openHistory} style={{ borderRadius: 20, fontSize: 12, fontWeight: 800, background: C.cream, color: '#6b5851', border: '1px solid ' + C.line, cursor: 'pointer' }}>{t('analyze.btn_history', lang)}</button>
          <button onClick={handleSaveSentence} disabled={!result} style={{ borderRadius: 20, fontSize: 12, fontWeight: 800, background: result ? C.black : C.cream, color: result ? '#fff' : '#6b5851', border: result ? 'none' : '1px solid ' + C.line, cursor: result ? 'pointer' : 'not-allowed', opacity: result ? 1 : 0.5 }}>
            {savedSentences.has(result?.original || '') ? t('analyze.btn_saved', lang) : t('analyze.btn_save', lang)}
          </button>
          <button onClick={async () => {
            if (!result) return;
            try {
              await db.sentences.add({
                korean: result.original, chinese: result.fullTranslation, source_type: 'analysis',
                source_id: 'review-' + Date.now(), source_title: t('analyze.page_title', lang),
                created_at: new Date().toISOString(),
              });
              showToastMsg(t('analyze.toast_added_review', lang));
            } catch (e: any) {
              if (e?.name === 'ConstraintError') showToastMsg(t('analyze.toast_already_in_review', lang));
              else showToastMsg(t('analyze.toast_add_review_fail', lang));
            }
          }} disabled={!result} style={{ borderRadius: 20, fontSize: 12, fontWeight: 800, background: C.cream, color: '#6b5851', border: '1px solid ' + C.line, cursor: result ? 'pointer' : 'not-allowed', opacity: result ? 1 : 0.5 }}>{t('analyze.btn_add_review', lang)}</button>
        </div>
      </div>}
    </div>
  );
}
