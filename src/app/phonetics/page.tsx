'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSmartBack } from '@/lib/useSmartBack';
import { ArrowLeft, X, Volume2 } from 'lucide-react';
import { vowels, consonants, batchimSounds, type PhoneticLetter } from '@/data/phonetics';
import { progressiveSteps } from '@/data/phonetics-steps';
import { PROGRESSIVE_STAGES, buildSyllableQuestion, slotPlaySyllable, type SyllableQuestion } from '@/data/phonetics-progressive';
import { getExamplesForLetter } from '@/data/phonetics-examples';
import { unlockAudioContext } from '@/lib/tts';
import { playPhoneticAudio, playPhoneticAudioLiteral, getSpeakText } from '@/lib/audio/phoneticsPlayer';
import { playSuccess, playError } from '@/lib/soundManager';
import StepOverview from '@/components/phonetics/step/StepOverview';
import { getPracticeCounts, recordPhoneticMistake } from '@/lib/phonetics/srs';
import { useAuth } from '@/components/AuthProvider';
import { useTheme } from '@/components/ThemeProvider';
import PlaceIntro from '@/components/PlaceIntro';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';
import './hangul-redesign.css';

type MainTab = 'progressive' | 'alphabet' | 'rules' | 'composer' | 'practice';
type AlphaTab = 'vowel' | 'consonant' | 'batchim';
type PracticeMode = 'mixed' | 'vocab' | 'listen' | 'syllable';

/* ════════════════════════════════════════════════════════════════
   连读规则数据（7 类，照搬原 ruleCategories + 拆分复合终声）
   ════════════════════════════════════════════════════════════════ */
type RuleExample = { original: string; read: string; meaning: string };
type RuleSentence = { ko: string; read: string; meaning: string };
type RulePitfall = { wrong: string; right: string; note: string };
type Rule = {
  id: string;
  num: string;
  title: string;
  titleKo: string;
  tag: string;
  plain: string;
  formula: { from: string; arrow: string; to: string }[];
  explanation: string;
  letterGroups?: { label: string; jamos: string }[];
  examples: RuleExample[];
  sentences?: RuleSentence[];
  pitfalls?: RulePitfall[];
};
type RuleCategory = { id: string; label: string; labelKo: string; rules: Rule[] };

function buildRuleCategories(lang: Lang): RuleCategory[] {
  const rt = (k: string, params?: Record<string, string | number>) => t(k, lang, params);
  return [
  {
    id: 'linking', label: rt('phonetics.rulecat_linking'), labelKo: '연음화',
    rules: [{
      id: 'r-01', num: rt('phonetics.rule_num', { n: '01' }), title: rt('phonetics.rule_r01_title'), titleKo: '연음화', tag: rt('phonetics.rule_r01_tag'),
      plain: rt('phonetics.rule_r01_plain'),
      formula: [{ from: rt('phonetics.term_batchim'), arrow: '＋', to: rt('phonetics.rule_r01_f0_to') }],
      explanation: rt('phonetics.rule_r01_explanation'),
      examples: [
        { original: '한국어', read: '한구거', meaning: rt('phonetics.rule_r01_ex0') },
        { original: '밖에', read: '바께', meaning: rt('phonetics.rule_r01_ex1') },
        { original: '책을', read: '채글', meaning: rt('phonetics.rule_r01_ex2') },
        { original: '옷이', read: '오시', meaning: rt('phonetics.rule_r01_ex3') },
        { original: '꽃이', read: '꼬치', meaning: rt('phonetics.rule_r01_ex4') },
        { original: '집에', read: '지베', meaning: rt('phonetics.rule_r01_ex5') },
      ],
      sentences: [
        { ko: '**한국어**를 공부해요.', read: '**한구거**를 공부해요.', meaning: rt('phonetics.rule_r01_s0') },
        { ko: '**음악을** 들어요.', read: '**으마글** 드러요.', meaning: rt('phonetics.rule_r01_s1') },
      ],
      pitfalls: [
        { wrong: '한국어 → [한구거오]', right: '[한구거]', note: rt('phonetics.rule_r01_p0') },
        { wrong: '꽃이 → [꼳이]', right: '[꼬치]', note: rt('phonetics.rule_r01_p1') },
      ],
    }, {
      id: 'r-07', num: rt('phonetics.rule_num', { n: '02' }), title: rt('phonetics.rule_r07_title'), titleKo: '겹받침 연음', tag: rt('phonetics.tag_advanced'),
      plain: rt('phonetics.rule_r07_plain'),
      formula: [
        { from: 'ㄺ', arrow: rt('phonetics.arrow_plus_vowel'), to: rt('phonetics.rule_r07_f_g', { j: 'ㄱ' }) },
        { from: 'ㄼ', arrow: rt('phonetics.arrow_plus_vowel'), to: rt('phonetics.rule_r07_f_g', { j: 'ㅂ' }) },
        { from: 'ㄻ', arrow: rt('phonetics.arrow_plus_vowel'), to: rt('phonetics.rule_r07_f_g', { j: 'ㅁ' }) },
        { from: 'ㄵ', arrow: rt('phonetics.arrow_plus_vowel'), to: rt('phonetics.rule_r07_f_g', { j: 'ㅈ' }) },
        { from: 'ㅄ', arrow: rt('phonetics.arrow_plus_vowel'), to: rt('phonetics.rule_r07_f_g', { j: 'ㅅ' }) },
      ],
      explanation: rt('phonetics.rule_r07_explanation'),
      examples: [
        { original: '읽어요', read: '일거요', meaning: rt('phonetics.rule_r07_ex0') },
        { original: '없어요', read: '업써요', meaning: rt('phonetics.rule_r07_ex1') },
        { original: '밟아요', read: '발바요', meaning: rt('phonetics.rule_r07_ex2') },
        { original: '닭이', read: '달기', meaning: rt('phonetics.rule_r07_ex3') },
        { original: '삶을', read: '살믈', meaning: rt('phonetics.rule_r07_ex4') },
      ],
      sentences: [
        { ko: '책을 **읽어요**.', read: '채글 **일거요**.', meaning: rt('phonetics.rule_r07_s0') },
        { ko: '시간이 **없어요**.', read: '시가니 **업써요**.', meaning: rt('phonetics.rule_r07_s1') },
      ],
    }, {
      id: 'r-08', num: rt('phonetics.rule_num', { n: '03' }), title: rt('phonetics.rule_r08_title'), titleKo: '절음법칙', tag: rt('phonetics.rule_r08_tag'),
      plain: rt('phonetics.rule_r08_plain'),
      formula: [
        { from: rt('phonetics.rule_r08_f0_from'), arrow: rt('phonetics.arrow_plus_content_vowel'), to: rt('phonetics.rule_r08_f0_to') },
        { from: rt('phonetics.rule_r08_f1_from'), arrow: rt('phonetics.arrow_plus_content_vowel'), to: rt('phonetics.rule_r08_f1_to') },
        { from: rt('phonetics.rule_r08_f2_from'), arrow: rt('phonetics.arrow_plus_content_vowel'), to: rt('phonetics.rule_r08_f2_to') },
      ],
      explanation: rt('phonetics.rule_r08_explanation'),
      letterGroups: [
        { label: rt('phonetics.rule_r08_lg0_label'), jamos: rt('phonetics.rule_r08_lg0_jamos') },
        { label: rt('phonetics.rule_r08_lg1_label'), jamos: rt('phonetics.rule_r08_lg1_jamos') },
      ],
      examples: [
        { original: '넷 있어요', read: '네디써요', meaning: rt('phonetics.rule_r08_ex0') },
        { original: '넷이', read: '네시', meaning: rt('phonetics.rule_r08_ex1') },
        { original: '옷 안', read: '오단', meaning: rt('phonetics.rule_r08_ex2') },
        { original: '옷이', read: '오시', meaning: rt('phonetics.rule_r08_ex3') },
        { original: '맛 없다', read: '마덥따', meaning: rt('phonetics.rule_r08_ex4') },
        { original: '꽃 앞', read: '꼬답', meaning: rt('phonetics.rule_r08_ex5') },
      ],
      sentences: [
        { ko: '의자가 **넷 있어요**.', read: '의자가 **네디써요**.', meaning: rt('phonetics.rule_r08_s0') },
        { ko: '**넷이** 한 팀이에요.', read: '**네시** 한 티미에요.', meaning: rt('phonetics.rule_r08_s1') },
        { ko: '이 음식은 **맛 없다**.', read: '이 음시근 **마덥따**.', meaning: rt('phonetics.rule_r08_s2') },
      ],
      pitfalls: [
        { wrong: '넷 있어요 → [네시써요]', right: '[네디써요]', note: rt('phonetics.rule_r08_p0') },
        { wrong: '옷 안 → [오산]', right: '[오단]', note: rt('phonetics.rule_r08_p1') },
        { wrong: '맛 없다 → [마섭따]', right: '[마덥따]', note: rt('phonetics.rule_r08_p2') },
      ],
    }],
  },
  {
    id: 'nasal', label: rt('phonetics.rulecat_nasal'), labelKo: '비음화',
    rules: [{
      id: 'r-02', num: rt('phonetics.rule_num', { n: '04' }), title: rt('phonetics.rule_r02_title'), titleKo: '비음화', tag: rt('phonetics.tag_frequent'),
      plain: rt('phonetics.rule_r02_plain'),
      formula: [
        { from: 'ㄱ', arrow: rt('phonetics.arrow_plus_nm'), to: 'ㅇ' },
        { from: 'ㄷ', arrow: rt('phonetics.arrow_plus_nm'), to: 'ㄴ' },
        { from: 'ㅂ', arrow: rt('phonetics.arrow_plus_nm'), to: 'ㅁ' },
      ],
      explanation: rt('phonetics.rule_r02_explanation'),
      letterGroups: [
        { label: rt('phonetics.lg_same_g'), jamos: 'ㄱ · ㄲ · ㅋ' },
        { label: rt('phonetics.lg_same_d'), jamos: 'ㄷ · ㅅ · ㅆ · ㅈ · ㅊ · ㅌ' },
        { label: rt('phonetics.lg_same_b'), jamos: 'ㅂ · ㅍ' },
      ],
      examples: [
        { original: '국물', read: '궁물', meaning: rt('phonetics.rule_r02_ex0') },
        { original: '받는', read: '반는', meaning: rt('phonetics.rule_r02_ex1') },
        { original: '앞문', read: '암문', meaning: rt('phonetics.rule_r02_ex2') },
        { original: '학년', read: '항년', meaning: rt('phonetics.rule_r02_ex3') },
        { original: '입문', read: '임문', meaning: rt('phonetics.rule_r02_ex4') },
        { original: '있는', read: '인는', meaning: rt('phonetics.rule_r02_ex5') },
      ],
      sentences: [
        { ko: '**국물**이 정말 맛있어요.', read: '**궁무**리 정말 마시써요.', meaning: rt('phonetics.rule_r02_s0') },
        { ko: '저는 **학년**이 높아요.', read: '저는 **항녀**니 노파요.', meaning: rt('phonetics.rule_r02_s1') },
      ],
      pitfalls: [
        { wrong: '국물 → [국물]', right: '[궁물]', note: rt('phonetics.rule_r02_p0') },
        { wrong: '앞문 → [앞문]', right: '[암문]', note: rt('phonetics.rule_r02_p1') },
      ],
    }],
  },
  {
    id: 'liquid', label: rt('phonetics.rulecat_liquid'), labelKo: '유음화',
    rules: [{
      id: 'r-03', num: rt('phonetics.rule_num', { n: '05' }), title: rt('phonetics.rule_r03_title'), titleKo: '유음화', tag: rt('phonetics.tag_common'),
      plain: rt('phonetics.rule_r03_plain'),
      formula: [
        { from: 'ㄴ', arrow: rt('phonetics.arrow_plus_r'), to: 'ㄹㄹ' },
        { from: 'ㄹ', arrow: rt('phonetics.arrow_plus_n'), to: 'ㄹㄹ' },
      ],
      explanation: rt('phonetics.rule_r03_explanation'),
      examples: [
        { original: '신라', read: '실라', meaning: rt('phonetics.rule_r03_ex0') },
        { original: '실내', read: '실래', meaning: rt('phonetics.rule_r03_ex1') },
        { original: '한라산', read: '할라산', meaning: rt('phonetics.rule_r03_ex2') },
        { original: '전라도', read: '절라도', meaning: rt('phonetics.rule_r03_ex3') },
        { original: '연락', read: '열락', meaning: rt('phonetics.rule_r03_ex4') },
        { original: '설날', read: '설랄', meaning: rt('phonetics.rule_r03_ex5') },
      ],
      sentences: [
        { ko: '**신라** 시대의 유물이에요.', read: '**실라** 시대의 유무리에요.', meaning: rt('phonetics.rule_r03_s0') },
        { ko: '내일 꼭 **연락** 주세요.', read: '내일 꼭 **열락** 주세요.', meaning: rt('phonetics.rule_r03_s1') },
      ],
    }],
  },
  {
    id: 'palatalization', label: rt('phonetics.rulecat_palatalization'), labelKo: '구개음화',
    rules: [{
      id: 'r-04', num: rt('phonetics.rule_num', { n: '06' }), title: rt('phonetics.rule_r04_title'), titleKo: '구개음화', tag: rt('phonetics.rule_r04_tag'),
      plain: rt('phonetics.rule_r04_plain'),
      formula: [
        { from: 'ㄷ', arrow: rt('phonetics.arrow_plus_i'), to: 'ㅈ' },
        { from: 'ㅌ', arrow: rt('phonetics.arrow_plus_i'), to: 'ㅊ' },
      ],
      explanation: rt('phonetics.rule_r04_explanation'),
      examples: [
        { original: '같이', read: '가치', meaning: rt('phonetics.rule_r04_ex0') },
        { original: '굳이', read: '구지', meaning: rt('phonetics.rule_r04_ex1') },
        { original: '해돋이', read: '해도지', meaning: rt('phonetics.rule_r04_ex2') },
        { original: '붙이다', read: '부치다', meaning: rt('phonetics.rule_r04_ex3') },
        { original: '미닫이', read: '미다지', meaning: rt('phonetics.rule_r04_ex4') },
        { original: '땀받이', read: '땀바지', meaning: rt('phonetics.rule_r04_ex5') },
      ],
      sentences: [
        { ko: '우리 **같이** 갈까요?', read: '우리 **가치** 갈까요?', meaning: rt('phonetics.rule_r04_s0') },
        { ko: '**굳이** 그럴 필요 없어요.', read: '**구지** 그럴 피료 업써요.', meaning: rt('phonetics.rule_r04_s1') },
      ],
    }],
  },
  {
    id: 'aspiration', label: rt('phonetics.rulecat_aspiration'), labelKo: '격음화',
    rules: [{
      id: 'r-05', num: rt('phonetics.rule_num', { n: '07' }), title: rt('phonetics.rule_r05_title'), titleKo: '격음화', tag: rt('phonetics.tag_frequent'),
      plain: rt('phonetics.rule_r05_plain'),
      formula: [
        { from: 'ㅎ', arrow: rt('phonetics.arrow_plus_g'), to: 'ㅋ' },
        { from: 'ㅎ', arrow: rt('phonetics.arrow_plus_d'), to: 'ㅌ' },
        { from: 'ㅎ', arrow: rt('phonetics.arrow_plus_b'), to: 'ㅍ' },
        { from: 'ㅎ', arrow: rt('phonetics.arrow_plus_j'), to: 'ㅊ' },
      ],
      explanation: rt('phonetics.rule_r05_explanation'),
      examples: [
        { original: '축하해요', read: '추카해요', meaning: rt('phonetics.rule_r05_ex0') },
        { original: '많다', read: '만타', meaning: rt('phonetics.rule_r05_ex1') },
        { original: '입학', read: '이팍', meaning: rt('phonetics.rule_r05_ex2') },
        { original: '맞히다', read: '마치다', meaning: rt('phonetics.rule_r05_ex3') },
        { original: '좋다', read: '조타', meaning: rt('phonetics.rule_r05_ex4') },
        { original: '넣다', read: '너타', meaning: rt('phonetics.rule_r05_ex5') },
      ],
      sentences: [
        { ko: '생일 **축하**해요!', read: '생일 **추카**해요!', meaning: rt('phonetics.rule_r05_s0') },
        { ko: '날씨가 정말 **좋다**.', read: '날씨가 정말 **조타**.', meaning: rt('phonetics.rule_r05_s1') },
      ],
      pitfalls: [
        { wrong: '축하 → [축하]', right: '[추카]', note: rt('phonetics.rule_r05_p0') },
        { wrong: '좋다 → [조하다] / [조다]', right: '[조타]', note: rt('phonetics.rule_r05_p1') },
      ],
    }],
  },
  {
    id: 'tensification', label: rt('phonetics.rulecat_tensification'), labelKo: '경음화',
    rules: [{
      id: 'r-06', num: rt('phonetics.rule_num', { n: '08' }), title: rt('phonetics.rule_r06_title'), titleKo: '경음화', tag: rt('phonetics.tag_frequent'),
      plain: rt('phonetics.rule_r06_plain'),
      formula: [
        { from: 'ㄱ/ㄷ/ㅂ', arrow: rt('phonetics.arrow_plus_g'), to: 'ㄲ' },
        { from: 'ㄱ/ㄷ/ㅂ', arrow: rt('phonetics.arrow_plus_d'), to: 'ㄸ' },
        { from: 'ㄱ/ㄷ/ㅂ', arrow: rt('phonetics.arrow_plus_b'), to: 'ㅃ' },
        { from: 'ㄱ/ㄷ/ㅂ', arrow: rt('phonetics.arrow_plus_s'), to: 'ㅆ' },
        { from: 'ㄱ/ㄷ/ㅂ', arrow: rt('phonetics.arrow_plus_j'), to: 'ㅉ' },
      ],
      explanation: rt('phonetics.rule_r06_explanation'),
      letterGroups: [
        { label: rt('phonetics.lg_same_g'), jamos: 'ㄱ · ㄲ · ㅋ' },
        { label: rt('phonetics.lg_same_d'), jamos: 'ㄷ · ㅅ · ㅆ · ㅈ · ㅊ · ㅌ' },
        { label: rt('phonetics.lg_same_b'), jamos: 'ㅂ · ㅍ' },
      ],
      examples: [
        { original: '학교', read: '학꾜', meaning: rt('phonetics.rule_r06_ex0') },
        { original: '식당', read: '식땅', meaning: rt('phonetics.rule_r06_ex1') },
        { original: '국밥', read: '국빱', meaning: rt('phonetics.rule_r06_ex2') },
        { original: '합격', read: '합껵', meaning: rt('phonetics.rule_r06_ex3') },
        { original: '작다', read: '작따', meaning: rt('phonetics.rule_r06_ex4') },
        { original: '입장', read: '입짱', meaning: rt('phonetics.rule_r06_ex5') },
      ],
      sentences: [
        { ko: '저는 **학교**에 가요.', read: '저는 **학꾜**에 가요.', meaning: rt('phonetics.rule_r06_s0') },
        { ko: '이 **식당** 맛있어요.', read: '이 **식땅** 마시써요.', meaning: rt('phonetics.rule_r06_s1') },
      ],
      pitfalls: [
        { wrong: '학교 → [학교]', right: '[학꾜]', note: rt('phonetics.rule_r06_p0') },
        { wrong: '먹다 → [먹다]', right: '[먹따]', note: rt('phonetics.rule_r06_p1') },
      ],
    }],
  },
  {
    id: 'h-drop', label: rt('phonetics.rulecat_hdrop'), labelKo: 'ㅎ 탈락',
    rules: [{
      id: 'r-09', num: rt('phonetics.rule_num', { n: '09' }), title: rt('phonetics.rule_r09_title'), titleKo: 'ㅎ 탈락', tag: rt('phonetics.tag_frequent'),
      plain: rt('phonetics.rule_r09_plain'),
      formula: [
        { from: rt('phonetics.rule_r09_f0_from'), arrow: rt('phonetics.arrow_plus_vowel'), to: rt('phonetics.rule_r09_f0_to') },
        { from: 'ㄶ / ㅀ', arrow: rt('phonetics.arrow_plus_vowel'), to: rt('phonetics.rule_r09_f1_to') },
        { from: rt('phonetics.rule_r09_f0_from'), arrow: rt('phonetics.arrow_plus_n'), to: rt('phonetics.rule_r09_f2_to') },
      ],
      explanation: rt('phonetics.rule_r09_explanation'),
      examples: [
        { original: '좋아요', read: '조아요', meaning: rt('phonetics.rule_r09_ex0') },
        { original: '많아요', read: '마나요', meaning: rt('phonetics.rule_r09_ex1') },
        { original: '싫어요', read: '시러요', meaning: rt('phonetics.rule_r09_ex2') },
        { original: '넣어요', read: '너어요', meaning: rt('phonetics.rule_r09_ex3') },
        { original: '괜찮아요', read: '괜차나요', meaning: rt('phonetics.rule_r09_ex4') },
        { original: '놓아', read: '노아', meaning: rt('phonetics.rule_r09_ex5') },
      ],
      sentences: [
        { ko: '날씨가 **좋아요**.', read: '날씨가 **조아요**.', meaning: rt('phonetics.rule_r09_s0') },
        { ko: '사람이 **많아요**.', read: '사라미 **마나요**.', meaning: rt('phonetics.rule_r09_s1') },
        { ko: '**괜찮아요**, 걱정하지 마세요.', read: '**괜차나요**, 걱쩡하지 마세요.', meaning: rt('phonetics.rule_r09_s2') },
      ],
      pitfalls: [
        { wrong: '좋아요 → [조하요]', right: '[조아요]', note: rt('phonetics.rule_r09_p0') },
        { wrong: '많아 → [만하]', right: '[마나]', note: rt('phonetics.rule_r09_p1') },
      ],
    }],
  },
  {
    id: 'cluster', label: rt('phonetics.rulecat_cluster'), labelKo: '대표음·겹받침',
    rules: [{
      id: 'r-10', num: rt('phonetics.rule_num', { n: '10' }), title: rt('phonetics.rule_r10_title'), titleKo: '중화·대표음화', tag: rt('phonetics.rule_r10_tag'),
      plain: rt('phonetics.rule_r10_plain'),
      formula: [
        { from: 'ㄱ ㄲ ㅋ', arrow: rt('phonetics.arrow_when_final'), to: 'ㄱ' },
        { from: 'ㄴ', arrow: rt('phonetics.arrow_when_final'), to: 'ㄴ' },
        { from: 'ㄷ ㅅ ㅆ ㅈ ㅊ ㅌ ㅎ', arrow: rt('phonetics.arrow_when_final'), to: 'ㄷ' },
        { from: 'ㄹ', arrow: rt('phonetics.arrow_when_final'), to: 'ㄹ' },
        { from: 'ㅁ', arrow: rt('phonetics.arrow_when_final'), to: 'ㅁ' },
        { from: 'ㅂ ㅍ', arrow: rt('phonetics.arrow_when_final'), to: 'ㅂ' },
        { from: 'ㅇ', arrow: rt('phonetics.arrow_when_final'), to: 'ㅇ' },
      ],
      explanation: rt('phonetics.rule_r10_explanation'),
      letterGroups: [
        { label: rt('phonetics.rule_r10_lg0_label'), jamos: 'ㄱ · ㄲ · ㅋ' },
        { label: rt('phonetics.rule_r10_lg1_label'), jamos: 'ㄷ · ㅅ · ㅆ · ㅈ · ㅊ · ㅌ · ㅎ' },
        { label: rt('phonetics.rule_r10_lg2_label'), jamos: 'ㅂ · ㅍ' },
      ],
      examples: [
        { original: '꽃', read: '꼳', meaning: rt('phonetics.rule_r10_ex0') },
        { original: '옷', read: '옫', meaning: rt('phonetics.rule_r10_ex1') },
        { original: '있다', read: '읻따', meaning: rt('phonetics.rule_r10_ex2') },
        { original: '부엌', read: '부억', meaning: rt('phonetics.rule_r10_ex3') },
        { original: '앞', read: '압', meaning: rt('phonetics.rule_r10_ex4') },
        { original: '히읗', read: '히읃', meaning: rt('phonetics.rule_r10_ex5') },
      ],
      sentences: [
        { ko: '**꽃이** 예뻐요.', read: '**꼬치** 예뻐요.', meaning: rt('phonetics.rule_r10_s0') },
        { ko: '**부엌**에서 요리해요.', read: '**부어**커서 요리해요.', meaning: rt('phonetics.rule_r10_s1') },
        { ko: '**앞**을 봐요.', read: '**아**플 봐요.', meaning: rt('phonetics.rule_r10_s2') },
      ],
      pitfalls: [
        { wrong: '꽃 → [꼬치]', right: '[꼳]', note: rt('phonetics.rule_r10_p0') },
        { wrong: '있다 → [잇다]', right: '[읻따]', note: rt('phonetics.rule_r10_p1') },
      ],
    }],
  },
  ];
}

/* ════════════════════════════════════════════════════════════════
   韩文音节合成
   ════════════════════════════════════════════════════════════════ */
const CHO_MAP: Record<string, number> = {
  'ㄱ': 0, 'ㄲ': 1, 'ㄴ': 2, 'ㄷ': 3, 'ㄸ': 4, 'ㄹ': 5, 'ㅁ': 6, 'ㅂ': 7, 'ㅃ': 8,
  'ㅅ': 9, 'ㅆ': 10, 'ㅇ': 11, 'ㅈ': 12, 'ㅉ': 13, 'ㅊ': 14, 'ㅋ': 15, 'ㅌ': 16, 'ㅍ': 17, 'ㅎ': 18,
};
const JUNG_MAP: Record<string, number> = {
  'ㅏ': 0, 'ㅐ': 1, 'ㅑ': 2, 'ㅒ': 3, 'ㅓ': 4, 'ㅔ': 5, 'ㅕ': 6, 'ㅖ': 7, 'ㅗ': 8, 'ㅘ': 9,
  'ㅙ': 10, 'ㅚ': 11, 'ㅛ': 12, 'ㅜ': 13, 'ㅝ': 14, 'ㅞ': 15, 'ㅟ': 16, 'ㅠ': 17, 'ㅡ': 18, 'ㅢ': 19, 'ㅣ': 20,
};
const JONG_MAP: Record<string, number> = {
  '': 0, 'ㄱ': 1, 'ㄲ': 2, 'ㄴ': 4, 'ㄷ': 7, 'ㄹ': 8, 'ㅁ': 16, 'ㅂ': 17, 'ㅅ': 19, 'ㅆ': 20, 'ㅇ': 21,
  'ㅈ': 22, 'ㅊ': 23, 'ㅋ': 24, 'ㅌ': 25, 'ㅍ': 26, 'ㅎ': 27,
};
function composeSyllable(cho: string, jung: string, jong: string = ''): string {
  const c = CHO_MAP[cho], v = JUNG_MAP[jung], b = JONG_MAP[jong] ?? 0;
  if (c == null || v == null) return '';
  return String.fromCodePoint(0xAC00 + c * 588 + v * 28 + b);
}

const COMPOSER_CONSONANTS = ['ㅇ', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const COMPOSER_VOWELS = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅔ', 'ㅚ', 'ㅟ'];
const COMPOSER_BATCHIM = ['', 'ㄴ', 'ㄱ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅇ'];
const COMPOSER_PRESETS: { syl: string; meaningKey: string }[] = [
  { syl: '가나다라', meaningKey: 'phonetics.preset_ganada' },
  { syl: '안녕하세요', meaningKey: 'phonetics.preset_hello' },
  { syl: '감사합니다', meaningKey: 'phonetics.preset_thanks' },
  { syl: '사랑해', meaningKey: 'phonetics.preset_loveyou' },
];

const ROMAN_MAP: Record<string, string> = {
  ㄱ: 'g', ㄲ: 'kk', ㄴ: 'n', ㄷ: 'd', ㄸ: 'tt', ㄹ: 'r', ㅁ: 'm', ㅂ: 'b', ㅃ: 'pp',
  ㅅ: 's', ㅆ: 'ss', ㅇ: '', ㅈ: 'j', ㅉ: 'jj', ㅊ: 'ch', ㅋ: 'k', ㅌ: 't', ㅍ: 'p', ㅎ: 'h',
  ㅏ: 'a', ㅑ: 'ya', ㅓ: 'eo', ㅕ: 'yeo', ㅗ: 'o', ㅛ: 'yo', ㅜ: 'u', ㅠ: 'yu', ㅡ: 'eu', ㅣ: 'i',
  ㅐ: 'ae', ㅒ: 'yae', ㅔ: 'e', ㅖ: 'ye', ㅘ: 'wa', ㅙ: 'wae', ㅚ: 'oe', ㅝ: 'wo', ㅞ: 'we', ㅟ: 'wi', ㅢ: 'ui',
};
function romanizeJamos(cho: string, jung: string, jong: string): string {
  return (ROMAN_MAP[cho] ?? '') + (ROMAN_MAP[jung] ?? '') + (jong ? (ROMAN_MAP[jong] ?? '') : '');
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function stripMark(text: string): string {
  return text.replace(/\*\*/g, '');
}

function renderHighlighted(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <mark key={i} className="hr-hl">{p.slice(2, -2)}</mark>;
    }
    return <span key={i}>{p}</span>;
  });
}

/* ════════════════════════════════════════════════════════════════
   AI 解释气泡 · 统一组件
   ════════════════════════════════════════════════════════════════ */
type AiMode = 'letter' | 'examples' | 'confused' | 'mistake';
type AiPayload = {
  mode: AiMode;
  key: string;
  letter?: string; letterName?: string; letterRoman?: string; letterType?: string;
  ruleTitle?: string; ruleExplanation?: string;
  pairLabel?: string; pairLetters?: string[];
  correctLetter?: string; wrongLetter?: string; questionPrompt?: string;
};

// 简易 markdown 渲染：**粗体**、段落、列表「- 」、内联韩文/中文
function renderAiMarkdown(text: string): React.ReactNode {
  const blocks = text.trim().split(/\n{2,}/);
  return blocks.map((block, bi) => {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return null;
    const isList = lines.every((l) => /^[-•·]\s/.test(l));
    if (isList) {
      return (
        <ul key={bi} className="hr-ai-ul">
          {lines.map((l, li) => (
            <li key={li}>{renderInline(l.replace(/^[-•·]\s/, ''))}</li>
          ))}
        </ul>
      );
    }
    // 段首形如 "**标题**："→ heading 风格
    const headingMatch = lines[0].match(/^\*\*(.+?)\*\*[：:]?\s*(.*)$/);
    if (headingMatch && lines.length === 1) {
      return (
        <p key={bi} className="hr-ai-p">
          <span className="hr-ai-h">{headingMatch[1]}</span>
          {headingMatch[2] && <> {renderInline(headingMatch[2])}</>}
        </p>
      );
    }
    return (
      <p key={bi} className="hr-ai-p">
        {lines.map((l, li) => (
          <span key={li}>
            {renderInline(l)}
            {li < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <b key={i}>{p.slice(2, -2)}</b>;
    }
    return <span key={i}>{p}</span>;
  });
}

function AIExplain({ label, payload, tag }: { label: string; payload: AiPayload; tag?: string }) {
  const { lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resolvedTag = tag ?? t('phonetics.ai_default_tag', lang);

  const ask = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await fetch('/api/ai/phonetics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.status === 401) {
        setError(t('phonetics.ai_err_login', lang));
        return;
      }
      if (!res.ok) {
        setError(t('phonetics.ai_err_unavailable', lang));
        return;
      }
      const data = await res.json();
      setText(data.text ?? '');
    } catch (e) {
      console.error('[phonetics] AI explain failed:', e);
      setError(t('phonetics.ai_err_network', lang));
    } finally {
      setLoading(false);
    }
  }, [payload, lang]);

  if (text) {
    return (
      <div className="hr-ai-bubble">
        <div className="hr-ai-head">
          <span className="hr-ai-tag"><span className="hr-ai-sparkle">✦</span> {resolvedTag}</span>
          <button className="hr-ai-close" onClick={() => setText(null)} aria-label={t('phonetics.close', lang)}><X size={12} /></button>
        </div>
        <div className="hr-ai-body">{renderAiMarkdown(text)}</div>
      </div>
    );
  }

  return (
    <>
      <button className="hr-ai-btn" onClick={ask} disabled={loading}>
        <span className="hr-ai-icon hr-ai-sparkle">✦</span>
        {loading ? t('phonetics.ai_thinking', lang) : label}
      </button>
      {loading && (
        <div className="hr-ai-loading">
          <span className="hr-ai-dot" /><span className="hr-ai-dot" /><span className="hr-ai-dot" />
        </div>
      )}
      {error && <div className="hr-ai-error">{error}</div>}
    </>
  );
}


/* ════════════════════════════════════════════════════════════════
   Shared CSS constants (extracted from inline <style> tags)
   ════════════════════════════════════════════════════════════════ */
const PHONETICS_CPOS_CSS = `
  .hr-cpos-block { margin: 24px 0 8px; padding: 18px 18px 16px; background: var(--hr-surface-2); border: 1px solid var(--hr-border-2); border-radius: 16px; }
  .hr-cpos-title { font-family: var(--hr-mono); font-size: 10px; letter-spacing: .22em; text-transform: uppercase; color: var(--hr-purple-strong); font-weight: 700; margin-bottom: 4px; }
  .hr-cpos-name { font-family: var(--hr-serif); font-size: 18px; font-weight: 700; color: var(--hr-ink-1); margin-bottom: 6px; }
  .hr-cpos-lede { font-size: 13px; color: var(--hr-ink-2); line-height: 1.65; margin: 0 0 14px; }
  .hr-cpos-lede mark { background: var(--hr-pink-soft); padding: 1px 6px; border-radius: 4px; color: var(--hr-pink-strong); font-weight: 600; }
  .hr-cpos-callout { display: flex; gap: 10px; align-items: flex-start; padding: 10px 12px; background: var(--hr-purple-soft); border: 1px solid var(--hr-purple-border); border-radius: 10px; margin-bottom: 16px; font-size: 12.5px; color: var(--hr-ink-2); line-height: 1.55; }
  .hr-cpos-callout .ico { flex-shrink: 0; font-size: 14px; color: var(--hr-purple-strong); }
  /* 手机：字母区独占一行 + 三个位置紧凑横条竖排 */
  .hr-cpos-row { background: var(--hr-surface-3); border: 1px solid var(--hr-border-1); border-radius: 12px; margin-bottom: 10px; overflow: hidden; }
  .hr-cpos-jamocell { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px; background: var(--hr-surface-2); border-bottom: 1px solid var(--hr-border-1); }
  .hr-cpos-jamo { font-family: var(--hr-hangul); font-size: 28px; font-weight: 800; color: var(--hr-ink-1); line-height: 1; }
  .hr-cpos-jamoname { font-family: var(--hr-mono); font-size: 10px; letter-spacing: .12em; color: var(--hr-ink-4); }
  /* 每个位置 = 一条横条：[位置+IPA 定宽] [例词大+释义小 竖排] [小播放钮] */
  .hr-cpos-cell { display: grid; grid-template-columns: 62px 1fr 30px; align-items: center; gap: 10px; padding: 10px 12px 10px 15px; position: relative; }
  .hr-cpos-cell + .hr-cpos-cell { border-top: 1px dashed var(--hr-border-1); }
  .hr-cpos-cell::before { content: ''; position: absolute; left: 0; top: 7px; bottom: 7px; width: 3px; border-radius: 3px; }
  .hr-cpos-cell.init::before { background: var(--hr-pink-base); }
  .hr-cpos-cell.med::before  { background: var(--hr-purple-base, var(--hr-purple-strong)); }
  .hr-cpos-cell.fin::before  { background: var(--hr-mint-base, var(--hr-mint-strong)); }
  .hr-cpos-poswrap { display: flex; flex-direction: column; gap: 2px; }
  .hr-cpos-pos { font-family: var(--hr-mono); font-size: 9px; letter-spacing: .08em; text-transform: uppercase; color: var(--hr-ink-4); font-weight: 700; }
  .hr-cpos-ipa { font-family: var(--hr-mono); font-size: 15px; font-weight: 700; color: var(--hr-pink-strong); }
  .hr-cpos-cell.med .hr-cpos-ipa { color: var(--hr-purple-strong); }
  .hr-cpos-cell.fin .hr-cpos-ipa { color: var(--hr-mint-strong); }
  .hr-cpos-textwrap { display: flex; flex-direction: column; min-width: 0; }
  .hr-cpos-word { font-family: var(--hr-hangul); font-size: 18px; font-weight: 700; color: var(--hr-ink-1); line-height: 1.15; }
  .hr-cpos-mean { display: block; font-size: 11px; color: var(--hr-ink-3); margin-top: 2px; line-height: 1.35; }
  .hr-cpos-play { width: 26px; height: 26px; border-radius: 50%; border: 1.5px solid var(--hr-pink-base); background: transparent; color: var(--hr-pink-strong); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-size: 9px; flex-shrink: 0; justify-self: center; }
  .hr-cpos-cell.med .hr-cpos-play { border-color: var(--hr-purple-base, var(--hr-purple-strong)); color: var(--hr-purple-strong); }
  .hr-cpos-cell.fin .hr-cpos-play { border-color: var(--hr-mint-base, var(--hr-mint-strong)); color: var(--hr-mint-strong); }
  /* 桌面：还原为四列对照表格 */
  @media (min-width: 720px) {
    .hr-cpos-row { display: grid; grid-template-columns: 64px 1fr 1fr 1fr; gap: 10px; padding: 12px; overflow: visible; }
    .hr-cpos-jamocell { flex-direction: column; gap: 4px; padding: 6px 0; border-bottom: none; border-radius: 10px; }
    .hr-cpos-cell { grid-template-columns: 1fr; gap: 4px; padding: 8px 10px; border-radius: 10px; }
    .hr-cpos-cell + .hr-cpos-cell { border-top: none; }
    .hr-cpos-cell::before { display: none; }
    .hr-cpos-cell.init { background: rgba(255,127,168,.08); }
    .hr-cpos-cell.med  { background: rgba(168,150,217,.10); }
    .hr-cpos-cell.fin  { background: rgba(174,227,216,.18); }
    .hr-cpos-mean { text-align: left; }
  }
`;

const PHONETICS_STACK_CSS = `
  .hr-stack-block .hr-stk-pieces { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; align-items: stretch; margin: 14px 0 10px; }
  .hr-stack-block .hr-stk-piece { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px 8px; border-radius: 12px; border: 1px solid; position: relative; }
  .hr-stack-block .hr-stk-piece.cons { background: rgba(255,127,168,.10); border-color: var(--hr-pink-border); }
  .hr-stack-block .hr-stk-piece.vow  { background: rgba(174,227,216,.20); border-color: var(--hr-mint-border); }
  .hr-stack-block .hr-stk-piece.out  { background: linear-gradient(135deg, rgba(168,150,217,.15), rgba(255,127,168,.10)); border-color: var(--hr-purple-border); }
  .hr-stack-block .hr-stk-role { font-family: var(--hr-mono); font-size: 9px; letter-spacing: .14em; text-transform: uppercase; font-weight: 700; }
  .hr-stack-block .hr-stk-piece.cons .hr-stk-role { color: var(--hr-pink-strong); }
  .hr-stack-block .hr-stk-piece.vow .hr-stk-role { color: var(--hr-mint-strong); }
  .hr-stack-block .hr-stk-piece.out .hr-stk-role { color: var(--hr-purple-strong); }
  .hr-stack-block .hr-stk-char { font-family: var(--hr-hangul); font-size: 38px; font-weight: 800; color: var(--hr-ink-1); line-height: 1; }
  .hr-stack-block .hr-stk-roman { font-family: var(--hr-mono); font-size: 10px; color: var(--hr-ink-3); }
  .hr-stack-block .hr-stk-play { width: 30px; height: 30px; border-radius: 50%; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; color: #fff; transition: transform .15s; }
  .hr-stack-block .hr-stk-play:hover { transform: scale(1.08); }
  .hr-stack-block .hr-stk-play.cons { background: linear-gradient(135deg, var(--hr-pink-base), var(--hr-pink-strong)); }
  .hr-stack-block .hr-stk-play.vow  { background: linear-gradient(135deg, var(--hr-mint-base), var(--hr-mint-strong)); }
  .hr-stack-block .hr-stk-play.out  { background: linear-gradient(135deg, var(--hr-purple-base), var(--hr-purple-strong)); }
  .hr-stack-block .hr-stk-tag { font-family: var(--hr-mono); font-size: 8.5px; letter-spacing: .1em; color: var(--hr-ink-4); }
  .hr-stack-block .hr-stk-tag.real { color: var(--hr-pink-strong); font-weight: 700; }
  .hr-stack-block .hr-stk-op { display: flex; align-items: center; justify-content: center; font-family: var(--hr-mono); font-size: 14px; font-weight: 700; color: var(--hr-ink-3); }
`;

const PHONETICS_BATCHIM_CSS = `
  .hr-batchim-seven { display: grid; grid-template-columns: 1fr; gap: 12px; margin: 16px 0 8px; }
  @media (min-width: 720px) { .hr-batchim-seven { grid-template-columns: 1fr 1fr; gap: 14px; } }
  @media (min-width: 1024px) { .hr-batchim-seven { grid-template-columns: 1fr 1fr 1fr; gap: 16px; } }
  .hr-bs-card { background: var(--hr-surface-2); border: 1px solid var(--hr-border-2); border-radius: 14px; padding: 16px; display: grid; gap: 10px; transition: border-color .2s; }
  .hr-bs-card:hover { border-color: var(--hr-border-3); }
  .hr-bs-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .hr-bs-jamo { font-family: var(--hr-hangul); font-weight: 800; font-size: 44px; line-height: 1; color: var(--hr-ink-1); }
  .hr-bs-type { font-family: var(--hr-mono); font-size: 9px; letter-spacing: .16em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; border: 1px solid; white-space: nowrap; }
  .hr-bs-play { display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: var(--hr-surface-3); border: 1px solid var(--hr-border-1); border-radius: 12px; cursor: pointer; transition: all .2s; }
  .hr-bs-play:hover { background: var(--hr-pink-soft); border-color: var(--hr-pink-base); }
  .hr-bs-play-btn { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--hr-pink-base), var(--hr-pink-strong)); color: #fff; border: none; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 3px 10px rgba(255,127,168,.3); cursor: pointer; font-size: 14px; }
  .hr-bs-syl { font-family: var(--hr-hangul); font-weight: 700; font-size: 32px; line-height: 1; color: var(--hr-ink-1); }
  .hr-bs-mean { font-size: 11.5px; color: var(--hr-ink-3); margin-top: 4px; }
  .hr-bs-text { font-size: 13px; color: var(--hr-ink-2); line-height: 1.55; }
  .hr-bs-text b { color: var(--hr-pink-strong); }
  .hr-bs-fam { display: flex; flex-wrap: wrap; gap: 6px; padding-top: 8px; border-top: 1px dashed var(--hr-border-1); }
  .hr-bs-fam-label { font-size: 11px; color: var(--hr-ink-3); margin-right: 4px; align-self: center; }
  .hr-bs-fam-chip { font-family: var(--hr-hangul); font-weight: 700; font-size: 17px; color: var(--hr-ink-1); background: var(--hr-surface-3); border: 1px solid var(--hr-border-1); padding: 4px 10px; border-radius: 8px; }
`;

/* ════════════════════════════════════════════════════════════════
   Page
   ════════════════════════════════════════════════════════════════ */
export default function PhoneticsRedesignPage() {
  const smartBack = useSmartBack('/learning');
  const { theme } = useTheme();
  const { lang } = useLang();
  const [mainTab, setMainTab] = useState<MainTab>('progressive');

  return (
    <div className="hr-scope">
      <PlaceIntro place="phonetics" dark={theme === 'dark'} />
      <div className="hr-stage">

        <div className="hr-mobile-back" style={{ position: 'sticky', top: 8, zIndex: 20, marginBottom: 20, background: 'var(--hr-bg, var(--bg-base))', paddingTop: 4, paddingBottom: 4 }}>
          <button onClick={smartBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--hr-ink-3)', background: 'none', border: 'none', cursor: 'pointer' }}>
            <ArrowLeft size={14} /> {t('phonetics.back_to_learning', lang)}
          </button>
        </div>

        {/* PAGE HEAD */}
        <header className="hr-page-head">
          <div className="hr-brand">
            <div className="hr-brand-mark">Tori</div>
            <div className="hr-brand-kr">한글</div>
            <div className="hr-brand-sub">{t('phonetics.brand_sub', lang)}</div>
          </div>
          <div className="hr-brand-sub" style={{ display: 'none' }} data-md-show>{t('phonetics.brand_meta', lang)}</div>
        </header>

        {/* MAIN TABS */}
        <nav className="hr-main-tabs">
          <TabBtn label={t('phonetics.main_tab_progressive', lang)} kr="단계별 학습" active={mainTab === 'progressive'} onClick={() => setMainTab('progressive')} />
          <TabBtn label={t('phonetics.main_tab_alphabet', lang)} kr="자모표" active={mainTab === 'alphabet'} onClick={() => setMainTab('alphabet')} />
          <TabBtn label={t('phonetics.main_tab_rules', lang)} kr="연음 규칙" active={mainTab === 'rules'} onClick={() => setMainTab('rules')} />
          <TabBtn label={t('phonetics.main_tab_composer', lang)} kr="합성기" active={mainTab === 'composer'} onClick={() => setMainTab('composer')} />
          <TabBtn label={t('phonetics.main_tab_practice', lang)} kr="연습" badge active={mainTab === 'practice'} onClick={() => setMainTab('practice')} />
        </nav>

        {mainTab === 'progressive' && <StepOverview />}
        {mainTab === 'alphabet' && <AlphabetScreen />}
        {mainTab === 'rules' && <RulesScreen />}
        {mainTab === 'composer' && <ComposerScreen />}
        {mainTab === 'practice' && <PracticeScreen />}
      </div>
    </div>
  );
}

function TabBtn({ label, kr, active, badge, onClick }: { label: string; kr: string; active: boolean; badge?: boolean; onClick: () => void }) {
  return (
    <button className={`hr-main-tab${active ? ' active' : ''}`} onClick={onClick}>
      {label}<span className="hr-kr">{kr}</span>
      {badge && <span className="hr-badge" />}
    </button>
  );
}


/* ════════════════════════════════════════════════════════════════
   SCREEN 2 · 字母表（真数据，接 phonetics.ts + playPhoneticAudio）
   ════════════════════════════════════════════════════════════════ */
function AlphabetScreen() {
  const { lang } = useLang();
  const [tab, setTab] = useState<AlphaTab>('vowel');
  const [query, setQuery] = useState('');
  const [sheetLetter, setSheetLetter] = useState<PhoneticLetter | null>(null);

  const switchTab = (next: AlphaTab) => {
    setTab(next);
    setSheetLetter(null);
  };

  return (
    <div className="hr-screen active">
      <div className="hr-alpha-search">
        <input
          type="text"
          placeholder={t('phonetics.alpha_search_placeholder', lang)}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="hr-card">
        <div className="hr-alpha-tabs">
          <AlphaTabBtn label={t('phonetics.tab_vowel', lang)} kr="모음" active={tab === 'vowel'} onClick={() => switchTab('vowel')} />
          <AlphaTabBtn label={t('phonetics.tab_consonant', lang)} kr="자음" active={tab === 'consonant'} onClick={() => switchTab('consonant')} />
          <AlphaTabBtn label={t('phonetics.tab_batchim', lang)} kr="받침" active={tab === 'batchim'} onClick={() => switchTab('batchim')} />
        </div>
        <div className="hr-alpha-content">
          {tab === 'vowel' && <VowelContent query={query} onOpen={setSheetLetter} />}
          {tab === 'consonant' && <ConsonantContent query={query} onOpen={setSheetLetter} />}
          {tab === 'batchim' && <BatchimContent query={query} onOpen={setSheetLetter} />}
        </div>
      </div>

      {/* 综合拼读：30 个真实韩文词 */}
      <ReadingSection />

      {sheetLetter && <LetterSheet letter={sheetLetter} onClose={() => setSheetLetter(null)} />}
    </div>
  );
}

function AlphaTabBtn({ label, kr, active, onClick }: { label: string; kr: string; active: boolean; onClick: () => void }) {
  return (
    <button className={`hr-alpha-tab${active ? ' active' : ''}`} onClick={onClick}>
      {label}<span className="hr-kr">{kr}</span>
    </button>
  );
}

function filterLetters(letters: PhoneticLetter[], query: string): PhoneticLetter[] {
  const q = query.trim().toLowerCase();
  if (!q) return letters;
  return letters.filter((l) =>
    l.letter.includes(q) ||
    l.name.toLowerCase().includes(q) ||
    l.romanization.toLowerCase().includes(q) ||
    l.sound.toLowerCase().includes(q) ||
    l.mnemonic.toLowerCase().includes(q) ||
    (l.soundEn?.toLowerCase().includes(q) ?? false) ||
    (l.mnemonicEn?.toLowerCase().includes(q) ?? false)
  );
}

function VowelContent({ query, onOpen }: { query: string; onOpen: (l: PhoneticLetter) => void }) {
  const { lang } = useLang();
  const filtered = filterLetters(vowels, query);
  return (
    <>
      <div className="hr-intro-head">
        <div className="hr-lead">
          <div className="hr-role">{t('phonetics.vowel_role', lang)}</div>
          <h2>{t('phonetics.tab_vowel', lang)}<span className="hr-kr">모음</span></h2>
        </div>
        <div className="hr-count"><b>21</b><span>{t('phonetics.vowel_count_unit', lang)}</span></div>
      </div>
      <p className="hr-intro-define">{renderInline(t('phonetics.vowel_define', lang))}</p>

      <div className="hr-vowel-anatomy">
        <div className="hr-anatomy-title">{t('phonetics.vowel_anatomy_title', lang)}</div>
        <div className="hr-syllable-box">
          <div className="hr-piece hr-consonant">ㅇ</div>
          <div className="hr-piece hr-vowel">ㅏ</div>
        </div>
        <div className="hr-anatomy-legend">
          <span><span className="hr-swatch hr-cons" />{t('phonetics.legend_consonant_sub', lang)}</span>
          <span><span className="hr-swatch hr-vow" />{t('phonetics.legend_vowel_lead', lang)}</span>
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--hr-ink-3)', marginTop: 8 }}>
          {t('phonetics.vowel_anatomy_note', lang)}
        </div>
      </div>

      <div className="hr-vowel-types">
        <div className="hr-vowel-type">
          <div className="hr-vt-head"><div className="hr-vt-name">{t('phonetics.vowel_basic_name', lang)}</div><div className="hr-vt-count">10</div></div>
          <div className="hr-vt-list">ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ</div>
          <div className="hr-vt-note">
            {t('phonetics.vowel_basic_note', lang)}<br />
            IPA <span className="hr-ipa">[a] [ja] [ʌ] [jʌ] [o] [jo] [u] [ju] [ɯ] [i]</span>
          </div>
        </div>
        <div className="hr-vowel-type">
          <div className="hr-vt-head"><div className="hr-vt-name">{t('phonetics.vowel_compound_name', lang)}</div><div className="hr-vt-count">11</div></div>
          <div className="hr-vt-list">ㅐ ㅒ ㅔ ㅖ ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ</div>
          <div className="hr-vt-note">{renderInline(t('phonetics.vowel_compound_note', lang))} <span className="hr-ipa">[ɛ]</span></div>
        </div>
      </div>

      <div className="hr-callout success">
        <div className="hr-callout-icon">✦</div>
        <div className="hr-callout-body">
          <span className="hr-h">{t('phonetics.vowel_tip_title', lang)}</span>
          {t('phonetics.vowel_tip_body', lang)}
        </div>
      </div>

      <div className="hr-letter-grid">
        {filtered.map((l) => <LetterCard key={l.id} letter={l} onOpen={onOpen} />)}
      </div>

      <ConfusedBlock stepIds={['basic-vowels', 'compound-vowels']} title={t('phonetics.confused_vowel_title', lang)} subtitle={t('phonetics.confused_vowel_subtitle', lang)} />
    </>
  );
}

function ConsonantContent({ query, onOpen }: { query: string; onOpen: (l: PhoneticLetter) => void }) {
  const { lang } = useLang();
  const filtered = filterLetters(consonants, query);
  return (
    <>
      <div className="hr-intro-head">
        <div className="hr-lead">
          <div className="hr-role">{t('phonetics.consonant_role', lang)}</div>
          <h2>{t('phonetics.tab_consonant', lang)}<span className="hr-kr">자음</span></h2>
        </div>
        <div className="hr-count"><b>19</b><span>{t('phonetics.consonant_count_unit', lang)}</span></div>
      </div>
      <p className="hr-intro-define">{renderInline(t('phonetics.consonant_define', lang))}</p>

      <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <table className="hr-force-table">
        <thead>
          <tr>
            <th className="hr-h-label">{t('phonetics.force_col_force', lang)}</th>
            <th>{t('phonetics.force_col_velar', lang)}</th><th>{t('phonetics.force_col_alveolar', lang)}</th><th>{t('phonetics.force_col_bilabial', lang)}</th><th>{t('phonetics.force_col_sibilant', lang)}</th><th>{t('phonetics.force_col_palatal', lang)}</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hr-plain">
            <td className="hr-h-label"><span className="hr-name">{t('phonetics.force_plain_name', lang)}</span><span className="hr-desc">{t('phonetics.force_plain_desc', lang)}</span></td>
            <td><span className="hr-jamo">ㄱ</span><span className="hr-ipa">[k]</span></td>
            <td><span className="hr-jamo">ㄷ</span><span className="hr-ipa">[t]</span></td>
            <td><span className="hr-jamo">ㅂ</span><span className="hr-ipa">[p]</span></td>
            <td><span className="hr-jamo">ㅅ</span><span className="hr-ipa">[s]</span></td>
            <td><span className="hr-jamo">ㅈ</span><span className="hr-ipa">[tɕ]</span></td>
          </tr>
          <tr className="hr-aspir">
            <td className="hr-h-label"><span className="hr-name">{t('phonetics.force_aspir_name', lang)}</span><span className="hr-desc">{t('phonetics.force_aspir_desc', lang)}</span></td>
            <td><span className="hr-jamo">ㅋ</span><span className="hr-ipa">[kʰ]</span></td>
            <td><span className="hr-jamo">ㅌ</span><span className="hr-ipa">[tʰ]</span></td>
            <td><span className="hr-jamo">ㅍ</span><span className="hr-ipa">[pʰ]</span></td>
            <td>—</td>
            <td><span className="hr-jamo">ㅊ</span><span className="hr-ipa">[tɕʰ]</span></td>
          </tr>
          <tr className="hr-tense">
            <td className="hr-h-label"><span className="hr-name">{t('phonetics.force_tense_name', lang)}</span><span className="hr-desc">{t('phonetics.force_tense_desc', lang)}</span></td>
            <td><span className="hr-jamo">ㄲ</span><span className="hr-ipa">[k͈]</span></td>
            <td><span className="hr-jamo">ㄸ</span><span className="hr-ipa">[t͈]</span></td>
            <td><span className="hr-jamo">ㅃ</span><span className="hr-ipa">[p͈]</span></td>
            <td><span className="hr-jamo">ㅆ</span><span className="hr-ipa">[s͈]</span></td>
            <td><span className="hr-jamo">ㅉ</span><span className="hr-ipa">[t͈ɕ]</span></td>
          </tr>
        </tbody>
      </table>
      </div>
      <p className="hr-footnote">{renderInline(t('phonetics.consonant_footnote', lang))}</p>

      <ConsonantPositionBlock />

      <StackBlock />



      <div className="hr-callout info" style={{ marginTop: 18 }}>
        <div className="hr-callout-icon">ℹ</div>
        <div className="hr-callout-body">
          <span className="hr-h">{t('phonetics.zero_consonant_title', lang)}</span>
          {t('phonetics.zero_consonant_body_1', lang)}<b style={{ fontFamily: 'var(--hr-hangul)' }}>ㅇ</b>{t('phonetics.zero_consonant_body_2', lang)}<b style={{ fontFamily: 'var(--hr-hangul)' }}>아</b>{t('phonetics.zero_consonant_body_3', lang)}<span style={{ fontFamily: 'var(--hr-mono)' }}>a</span>{t('phonetics.zero_consonant_body_4', lang)}
        </div>
      </div>

      <div className="hr-letter-grid">
        {filtered.map((l) => <LetterCard key={l.id} letter={l} onOpen={onOpen} />)}
      </div>

      <ConfusedBlock stepIds={['basic-consonants', 'double-consonants']} title={t('phonetics.confused_consonant_title', lang)} subtitle={t('phonetics.confused_consonant_subtitle', lang)} />
    </>
  );
}

/* 辅音三位置发音对比：同一辅音在词首/元音间/词尾发音不同 */
function ConsonantPositionBlock() {
  const { lang } = useLang();
  type Row = { jamo: string; jamoName: string; initial: { ipa: string; syl: string; word: string; meaning: string }; medial: { ipa: string; word: string; meaning: string }; final: { ipa: string; syl: string; note: string } };
  const rows: Row[] = [
    {
      jamo: 'ㄱ', jamoName: '기역',
      initial: { ipa: '[k]', syl: '가', word: '가구', meaning: t('phonetics.cpos_g_init_mean', lang) },
      medial: { ipa: '[g]', word: '아가', meaning: t('phonetics.cpos_g_med_mean', lang) },
      final: { ipa: '[k̚]', syl: '박', note: t('phonetics.cpos_g_fin_note', lang) },
    },
    {
      jamo: 'ㄷ', jamoName: '디귿',
      initial: { ipa: '[t]', syl: '다', word: '다리', meaning: t('phonetics.cpos_d_init_mean', lang) },
      medial: { ipa: '[d]', word: '바다', meaning: t('phonetics.cpos_d_med_mean', lang) },
      final: { ipa: '[t̚]', syl: '옷', note: t('phonetics.cpos_d_fin_note', lang) },
    },
    {
      jamo: 'ㅂ', jamoName: '비읍',
      initial: { ipa: '[p]', syl: '바', word: '바람', meaning: t('phonetics.cpos_b_init_mean', lang) },
      medial: { ipa: '[b]', word: '아빠', meaning: t('phonetics.cpos_b_med_mean', lang) },
      final: { ipa: '[p̚]', syl: '밥', note: t('phonetics.cpos_b_fin_note', lang) },
    },
    {
      jamo: 'ㅈ', jamoName: '지읒',
      initial: { ipa: '[tɕ]', syl: '자', word: '자리', meaning: t('phonetics.cpos_j_init_mean', lang) },
      medial: { ipa: '[dʑ]', word: '아저씨', meaning: t('phonetics.cpos_j_med_mean', lang) },
      final: { ipa: '[t̚]', syl: '낮', note: t('phonetics.cpos_j_fin_note', lang) },
    },
  ];

  return (
    <div className="hr-cpos-block">
      <style>{PHONETICS_CPOS_CSS}</style>
      <div className="hr-cpos-title">{t('phonetics.cpos_eyebrow', lang)}</div>
      <div className="hr-cpos-name">{t('phonetics.cpos_name', lang)}</div>
      <p className="hr-cpos-lede">
        {renderInline(t('phonetics.cpos_lede', lang))}
      </p>
      <div className="hr-cpos-callout">
        <span className="ico">♪</span>
        <span>
          {renderInline(t('phonetics.cpos_callout', lang))}
        </span>
      </div>

      {rows.map((r) => (
        <div key={r.jamo} className="hr-cpos-row">
          <div className="hr-cpos-jamocell hr-cpos-cell">
            <div className="hr-cpos-jamo">{r.jamo}</div>
            <div className="hr-cpos-jamoname">{r.jamoName}</div>
          </div>
          <div className="hr-cpos-cell init">
            <span className="hr-cpos-poswrap">
              <span className="hr-cpos-pos">{t('phonetics.cpos_pos_initial', lang)}</span>
              <span className="hr-cpos-ipa">{r.initial.ipa}</span>
            </span>
            <span className="hr-cpos-textwrap">
              <span className="hr-cpos-word">{r.initial.syl}/{r.initial.word}</span>
              <span className="hr-cpos-mean">{r.initial.meaning}</span>
            </span>
            <button className="hr-cpos-play" onClick={() => { unlockAudioContext(); playPhoneticAudio(r.jamoName); }} aria-label={t('phonetics.cpos_aria_lettername', lang)}>▶</button>
          </div>
          <div className="hr-cpos-cell med">
            <span className="hr-cpos-poswrap">
              <span className="hr-cpos-pos">{t('phonetics.cpos_pos_medial', lang)}</span>
              <span className="hr-cpos-ipa">{r.medial.ipa}</span>
            </span>
            <span className="hr-cpos-textwrap">
              <span className="hr-cpos-word">{r.medial.word}</span>
              <span className="hr-cpos-mean">{r.medial.meaning}</span>
            </span>
            <button className="hr-cpos-play" onClick={() => { unlockAudioContext(); playPhoneticAudio(r.medial.word); }} aria-label={t('phonetics.cpos_aria_demoword', lang)}>▶</button>
          </div>
          <div className="hr-cpos-cell fin">
            <span className="hr-cpos-poswrap">
              <span className="hr-cpos-pos">{t('phonetics.cpos_pos_final', lang)}</span>
              <span className="hr-cpos-ipa">{r.final.ipa}</span>
            </span>
            <span className="hr-cpos-textwrap">
              <span className="hr-cpos-word">{r.final.syl}</span>
              <span className="hr-cpos-mean">{r.final.note}</span>
            </span>
            <button className="hr-cpos-play" onClick={() => { unlockAudioContext(); playPhoneticAudio(r.final.syl); }} aria-label={t('phonetics.cpos_aria_finaldemo', lang)}>▶</button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* 拼读规则块：元音方向决定辅音位置，3 喇叭：辅音、元音、合成字 */
function StackBlock() {
  const { lang } = useLang();
  type Card = { rule: string; cons: { jamo: string; speak: string; real: boolean }; vow: { jamo: string; speak: string; real: boolean }; out: { syl: string; roman: string; speak: string; real: boolean }; layout: 'h' | 'v'; consPos: string; vowPos: string };
  const cards: Card[] = [
    {
      rule: t('phonetics.stack_rule_vertical', lang),
      cons: { jamo: 'ㄱ', speak: '기역', real: true },
      vow:  { jamo: 'ㅏ', speak: '아',   real: true },
      out:  { syl: '가',  roman: 'ga',  speak: '가',   real: false },
      layout: 'h', consPos: t('phonetics.pos_left', lang), vowPos: t('phonetics.pos_right', lang),
    },
    {
      rule: t('phonetics.stack_rule_horizontal', lang),
      cons: { jamo: 'ㄱ', speak: '기역', real: true },
      vow:  { jamo: 'ㅗ', speak: '오',   real: true },
      out:  { syl: '고',  roman: 'go',  speak: '고',   real: false },
      layout: 'v', consPos: t('phonetics.pos_top', lang), vowPos: t('phonetics.pos_bottom', lang),
    },
  ];
  const playOne = (text: string) => { unlockAudioContext(); playPhoneticAudio(text); };
  const realTag = t('phonetics.tag_real', lang);
  const ttsTag = t('phonetics.tag_tts', lang);
  const ttsSynthTag = t('phonetics.tag_tts_synth', lang);

  return (
    <div className="hr-stack-block">
      <style>{PHONETICS_STACK_CSS}</style>
      <div className="hr-stack-title">{t('phonetics.stack_title', lang)}</div>
      <div className="hr-stack-row">
        {cards.map((c, ci) => (
          <div className="hr-stack-card" key={ci}>
            <div className="hr-rule">{c.rule}</div>
            <div className="hr-stk-pieces">
              <div className="hr-stk-piece cons">
                <div className="hr-stk-role">{t('phonetics.tab_consonant', lang)} · {c.consPos}</div>
                <div className="hr-stk-char">{c.cons.jamo}</div>
                <button className="hr-stk-play cons" onClick={() => playOne(c.cons.speak)} aria-label={t('phonetics.aria_play_consonant', lang)}>▶</button>
                <div className={`hr-stk-tag${c.cons.real ? ' real' : ''}`}>{c.cons.real ? realTag : ttsTag}</div>
              </div>
              <div className="hr-stk-op">＋</div>
              <div className="hr-stk-piece vow">
                <div className="hr-stk-role">{t('phonetics.tab_vowel', lang)} · {c.vowPos}</div>
                <div className="hr-stk-char">{c.vow.jamo}</div>
                <button className="hr-stk-play vow" onClick={() => playOne(c.vow.speak)} aria-label={t('phonetics.aria_play_vowel', lang)}>▶</button>
                <div className={`hr-stk-tag${c.vow.real ? ' real' : ''}`}>{c.vow.real ? realTag : ttsTag}</div>
              </div>
            </div>
            <div className="hr-stk-pieces" style={{ gridTemplateColumns: '1fr', marginTop: 0 }}>
              <div className="hr-stk-piece out">
                <div className="hr-stk-role">{t('phonetics.stack_composed', lang)}</div>
                <div className="hr-stk-char">{c.out.syl}</div>
                <div className="hr-stk-roman">{c.out.roman}</div>
                <button className="hr-stk-play out" onClick={() => playOne(c.out.speak)} aria-label={t('phonetics.aria_play_composed', lang)}>▶</button>
                <div className={`hr-stk-tag${c.out.real ? ' real' : ''}`}>{c.out.real ? realTag : ttsSynthTag}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BatchimContent({ query, onOpen }: { query: string; onOpen: (l: PhoneticLetter) => void }) {
  const { lang } = useLang();
  const filtered = filterLetters(batchimSounds, query);
  return (
    <>
      <div className="hr-intro-head">
        <div className="hr-lead">
          <div className="hr-role">{t('phonetics.batchim_role', lang)}</div>
          <h2>{t('phonetics.tab_batchim', lang)}<span className="hr-kr">받침</span></h2>
        </div>
        <div className="hr-count"><b>7</b><span>{t('phonetics.batchim_count_unit', lang)}</span></div>
      </div>
      <p className="hr-intro-define">{renderInline(t('phonetics.batchim_define', lang))}</p>

      <div className="hr-batchim-anatomy">
        <div className="hr-anatomy-title">{t('phonetics.batchim_anatomy_title', lang)}</div>
        <div className="hr-syllable-box hr-syllable-box-3">
          <div className="hr-piece hr-consonant">ㅂ</div>
          <div className="hr-piece hr-vowel">ㅏ</div>
          <div className="hr-piece hr-batchim-piece">ㄱ</div>
        </div>
        <div className="hr-anatomy-legend">
          <span><span className="hr-swatch hr-cons" />{t('phonetics.tab_consonant', lang)}</span>
          <span><span className="hr-swatch hr-vow" />{t('phonetics.tab_vowel', lang)}</span>
          <span><span className="hr-swatch hr-batchim" />{t('phonetics.tab_batchim', lang)}</span>
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--hr-ink-3)', marginTop: 8 }}>
          {t('phonetics.batchim_anatomy_note', lang)}
        </div>
      </div>

      <div className="hr-callout warn">
        <div className="hr-callout-icon">⚠</div>
        <div className="hr-callout-body">
          <span className="hr-h">{t('phonetics.batchim_key_title', lang)}</span>
          {renderInline(t('phonetics.batchim_key_body', lang))}
        </div>
      </div>

      <BatchimSevenCards />

      <div className="hr-callout info" style={{ marginTop: 18 }}>
        <div className="hr-callout-icon">♪</div>
        <div className="hr-callout-body">
          <span className="hr-h">{t('phonetics.batchim_why_title', lang)}</span>
          {renderInline(t('phonetics.batchim_why_body', lang))}
        </div>
      </div>

      <BatchimClusterSection />

      <div style={{ marginTop: 28, paddingTop: 18, borderTop: '1px dashed var(--hr-border-2)' }}>
        <div style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--hr-ink-3)', marginBottom: 6 }}>
          {t('phonetics.batchim_detail_eyebrow', lang)}
        </div>
        <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', marginBottom: 12 }}>
          {t('phonetics.batchim_detail_lede', lang)}
        </p>
        <div className="hr-letter-grid">
          {filtered.map((l) => <LetterCard key={l.id} letter={l} onOpen={onOpen} hideAudio />)}
        </div>
      </div>

      <ConfusedBlock stepIds={['batchim']} title={t('phonetics.confused_batchim_title', lang)} subtitle={t('phonetics.confused_batchim_subtitle', lang)} />
    </>
  );
}

/* 易混对照卡 · 复用 phonetics-steps 的 confusedPairs */
function ConfusedBlock({ stepIds, title, subtitle }: { stepIds: string[]; title: string; subtitle: string }) {
  const { lang } = useLang();
  const pairs = useMemo(() => {
    const result: { id: string; label: string; tip: string; letters: { display: string; speakText: string }[] }[] = [];
    for (const sid of stepIds) {
      const step = progressiveSteps.find((s) => s.id === sid);
      if (!step) continue;
      for (const p of step.confusedPairs) {
        result.push({
          id: p.id,
          label: lang === 'en' ? p.labelEn ?? p.label : p.label,
          tip: lang === 'en' ? p.tipEn ?? p.tip : p.tip,
          letters: p.letters.map((l) => ({
            display: l.members ? l.members.join('/') : l.letter,
            speakText: getSpeakText(l),
          })),
        });
      }
    }
    return result;
  }, [stepIds, lang]);

  if (pairs.length === 0) return null;
  return (
    <div className="hr-confused-block">
      <div className="hr-confused-title">{title}</div>
      <div className="hr-confused-subtitle">{subtitle}</div>
      <div className="hr-confused-list">
        {pairs.map((p) => (
          <div key={p.id} className="hr-confused-card">
            <div className="hr-confused-head">
              <div className="hr-confused-label">{p.label}</div>
              <div className="hr-confused-letters">
                {p.letters.map((l) => (
                  <button
                    key={l.display}
                    onClick={() => { unlockAudioContext(); playPhoneticAudio(l.speakText); }}
                    aria-label={t('phonetics.aria_play_sound', lang)}
                  >
                    {l.display} <Volume2 size={13} />
                  </button>
                ))}
              </div>
            </div>
            <div className="hr-confused-tip">{p.tip}</div>
            <div style={{ marginTop: 10 }}>
              <AIExplain
                label={t('phonetics.ai_confused_label', lang)}
                tag={t('phonetics.ai_confused_tag', lang)}
                payload={{
                  mode: 'confused',
                  key: p.id,
                  pairLabel: p.label,
                  pairLetters: p.letters.map((l) => l.display),
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 综合拼读 · 30 个真实韩文词，from phonetics-steps */
function ReadingSection() {
  const { lang } = useLang();
  const readingStep = progressiveSteps.find((s) => s.id === 'reading');
  const words = readingStep?.readingWords ?? [];
  if (words.length === 0) return null;
  return (
    <div className="hr-reading-section">
      <div className="hr-reading-head">
        <h2>{renderInline(t('phonetics.reading_title', lang))}</h2>
        <div className="hr-kr">읽기 연습</div>
      </div>
      <p className="hr-reading-lede">
        {t('phonetics.reading_lede', lang)}
      </p>
      <div className="hr-reading-grid">
        {words.map((w) => {
          const play = () => { unlockAudioContext(); playPhoneticAudio(w.korean); };
          return (
            <button
              key={w.korean}
              type="button"
              className="hr-reading-card"
              onClick={play}
              aria-label={t('phonetics.aria_play', lang, { w: w.korean })}
            >
              <div className="hr-rc-word">{w.korean}</div>
              <div className="hr-rc-pron">{w.pronunciation}</div>
              <div className="hr-rc-meaning">{lang === 'en' ? w.meaningEn ?? w.meaning : w.meaning}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BatchimSevenCards() {
  const { lang } = useLang();
  type Card = {
    jamo: string;
    jamoName: string;          // 字母韩语名称，命中真人录音 c-01~c-08
    family: string[];
    roman: string;
    demoSyl: string;
    demoMeaning: string;
    mouth: string;
    feel: string;
    type: 'stop' | 'nasal' | 'liquid';
  };
  const cards: Card[] = [
    { jamo: 'ㄱ', jamoName: '기역', family: ['ㄱ', 'ㄲ', 'ㅋ'], roman: '[-k]', demoSyl: '박', demoMeaning: t('phonetics.bs_g_mean', lang),
      mouth: t('phonetics.bs_g_mouth', lang), feel: t('phonetics.bs_g_feel', lang), type: 'stop' },
    { jamo: 'ㄴ', jamoName: '니은', family: ['ㄴ'], roman: '[-n]', demoSyl: '산', demoMeaning: t('phonetics.bs_n_mean', lang),
      mouth: t('phonetics.bs_n_mouth', lang), feel: t('phonetics.bs_n_feel', lang), type: 'nasal' },
    { jamo: 'ㄷ', jamoName: '디귿', family: ['ㄷ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅊ', 'ㅌ', 'ㅎ'], roman: '[-t]', demoSyl: '옷', demoMeaning: t('phonetics.bs_d_mean', lang),
      mouth: t('phonetics.bs_d_mouth', lang), feel: t('phonetics.bs_d_feel', lang), type: 'stop' },
    { jamo: 'ㄹ', jamoName: '리을', family: ['ㄹ'], roman: '[-l]', demoSyl: '말', demoMeaning: t('phonetics.bs_l_mean', lang),
      mouth: t('phonetics.bs_l_mouth', lang), feel: t('phonetics.bs_l_feel', lang), type: 'liquid' },
    { jamo: 'ㅁ', jamoName: '미음', family: ['ㅁ'], roman: '[-m]', demoSyl: '밤', demoMeaning: t('phonetics.bs_m_mean', lang),
      mouth: t('phonetics.bs_m_mouth', lang), feel: t('phonetics.bs_m_feel', lang), type: 'nasal' },
    { jamo: 'ㅂ', jamoName: '비읍', family: ['ㅂ', 'ㅍ'], roman: '[-p]', demoSyl: '밥', demoMeaning: t('phonetics.bs_b_mean', lang),
      mouth: t('phonetics.bs_b_mouth', lang), feel: t('phonetics.bs_b_feel', lang), type: 'stop' },
    { jamo: 'ㅇ', jamoName: '이응', family: ['ㅇ'], roman: '[-ŋ]', demoSyl: '강', demoMeaning: t('phonetics.bs_ng_mean', lang),
      mouth: t('phonetics.bs_ng_mouth', lang), feel: t('phonetics.bs_ng_feel', lang), type: 'nasal' },
  ];

  const typeStyle = (ty: 'stop' | 'nasal' | 'liquid') => {
    if (ty === 'stop') return { tag: t('phonetics.bs_type_stop', lang), bg: 'var(--hr-pink-soft)', border: 'var(--hr-pink-border)', color: 'var(--hr-pink-strong)' };
    if (ty === 'nasal') return { tag: t('phonetics.bs_type_nasal', lang), bg: 'var(--hr-mint-soft)', border: 'var(--hr-mint-border)', color: 'var(--hr-mint-strong)' };
    return { tag: t('phonetics.bs_type_liquid', lang), bg: 'var(--hr-purple-soft)', border: 'var(--hr-purple-border)', color: 'var(--hr-purple-strong)' };
  };

  return (
    <div className="hr-batchim-seven">
      <style>{PHONETICS_BATCHIM_CSS}</style>
      {cards.map((c) => {
        const ts = typeStyle(c.type);
        const onPlaySyl = () => { unlockAudioContext(); playPhoneticAudio(c.demoSyl); };
        return (
          <div key={c.jamo} className="hr-bs-card">
            <div className="hr-bs-head">
              <div className="hr-bs-jamo">{c.jamo} <span style={{ fontFamily: 'ui-monospace, monospace', fontSize: 14, color: 'var(--hr-ink-3)', fontWeight: 400, marginLeft: 4 }}>{c.roman}</span></div>
              <div className="hr-bs-type" style={{ background: ts.bg, borderColor: ts.border, color: ts.color }}>{ts.tag}</div>
            </div>

            <button type="button" className="hr-bs-play" onClick={onPlaySyl} aria-label={t('phonetics.aria_play_demo_syllable', lang, { w: c.demoSyl })}>
              <span className="hr-bs-play-btn">▶</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <span className="hr-bs-syl" style={{ fontSize: 26 }}>{c.demoSyl}</span>
                <span className="hr-bs-mean" style={{ marginLeft: 8 }}>{c.demoMeaning}</span>
              </div>
            </button>

            <div className="hr-bs-text">
              <b>{t('phonetics.bs_mouth_label', lang)}</b>{t('phonetics.colon', lang)}{c.mouth}
            </div>
            <div className="hr-bs-text">
              <b>{t('phonetics.bs_feel_label', lang)}</b>{t('phonetics.colon', lang)}{c.feel}
            </div>

            {c.family.length > 1 && (
              <div className="hr-bs-fam">
                <span className="hr-bs-fam-label">{t('phonetics.bs_family_label', lang)}</span>
                {c.family.map((f) => <span key={f} className="hr-bs-fam-chip">{f}</span>)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   겹받침 · 双收音 5 板块（Bridge · Rules · Table · Exceptions · CaseStudy）
   ══════════════════════════════════════════════════ */

type ClusterType = 'stop' | 'nasal' | 'liquid';
type ClusterRow = {
  pair: string;              // 双 jamo 如 'ㄳ'
  keeps: 'left' | 'right';   // 表준 발음법 제10항(读左) or 제11항(读右)
  kept: string;              // 实际发音的单 jamo（如 ㄳ→ㄱ、ㄿ→ㅂ ← ㅍ 中和）
  ipa: string;               // 尾音 IPA（带 unreleased 或鼻音符号）
  demoSyl: string;
  demoMeaning: string;
  demoRead: string;          // 示范词整体发音标注 [갑]
  examples: { syl: string; read: string; meaning: string }[];
  type: ClusterType;
  exception?: 'balp' | 'lg'; // ㄼ/ㄺ 例外提示
};

function buildClusterRows(lang: Lang): ClusterRow[] {
  const rt = (k: string) => t(k, lang);
  return [
  { pair: 'ㄳ', keeps: 'left', kept: 'ㄱ', ipa: '[k̚]',
    demoSyl: '넋', demoMeaning: rt('phonetics.cl_geoks_mean'), demoRead: '[넉]',
    examples: [{ syl: '몫', read: '[목]', meaning: rt('phonetics.cl_ex_mok') }, { syl: '넋두리', read: '[넉뚜리]', meaning: rt('phonetics.cl_ex_neokduri') }],
    type: 'stop' },
  { pair: 'ㄵ', keeps: 'left', kept: 'ㄴ', ipa: '[n]',
    demoSyl: '앉다', demoMeaning: rt('phonetics.cl_anjda_mean'), demoRead: '[안따]',
    examples: [{ syl: '얹다', read: '[언따]', meaning: rt('phonetics.cl_ex_eonjda') }, { syl: '앉히다', read: '[안치다]', meaning: rt('phonetics.cl_ex_anchida') }],
    type: 'nasal' },
  { pair: 'ㄶ', keeps: 'left', kept: 'ㄴ', ipa: '[n]',
    demoSyl: '많다', demoMeaning: rt('phonetics.cl_manta_mean'), demoRead: '[만타]',
    examples: [{ syl: '괜찮다', read: '[괜찬타]', meaning: rt('phonetics.cl_ex_gwaenchanta') }, { syl: '끊다', read: '[끈타]', meaning: rt('phonetics.cl_ex_kkeunta') }],
    type: 'nasal' },
  { pair: 'ㄺ', keeps: 'right', kept: 'ㄱ', ipa: '[k̚]',
    demoSyl: '닭', demoMeaning: rt('phonetics.cl_dak_mean'), demoRead: '[닥]',
    examples: [{ syl: '흙', read: '[흑]', meaning: rt('phonetics.cl_ex_heuk') }, { syl: '읽다', read: '[익따]', meaning: rt('phonetics.cl_ex_ikda') }],
    type: 'stop', exception: 'lg' },
  { pair: 'ㄻ', keeps: 'right', kept: 'ㅁ', ipa: '[m]',
    demoSyl: '삶', demoMeaning: rt('phonetics.cl_salm_mean'), demoRead: '[삼]',
    examples: [{ syl: '젊다', read: '[점따]', meaning: rt('phonetics.cl_ex_jeomda') }, { syl: '닮다', read: '[담따]', meaning: rt('phonetics.cl_ex_damda') }],
    type: 'nasal' },
  { pair: 'ㄼ', keeps: 'left', kept: 'ㄹ', ipa: '[l]',
    demoSyl: '넓다', demoMeaning: rt('phonetics.cl_neolda_mean'), demoRead: '[널따]',
    examples: [{ syl: '짧다', read: '[짤따]', meaning: rt('phonetics.cl_ex_jjalda') }, { syl: '얇다', read: '[얄따]', meaning: rt('phonetics.cl_ex_yalda') }, { syl: '여덟', read: '[여덜]', meaning: rt('phonetics.cl_ex_yeodeol') }],
    type: 'liquid', exception: 'balp' },
  { pair: 'ㄽ', keeps: 'left', kept: 'ㄹ', ipa: '[l]',
    demoSyl: '외곬', demoMeaning: rt('phonetics.cl_oegol_mean'), demoRead: '[외골]',
    examples: [], type: 'liquid' },
  { pair: 'ㄾ', keeps: 'left', kept: 'ㄹ', ipa: '[l]',
    demoSyl: '핥다', demoMeaning: rt('phonetics.cl_halda_mean'), demoRead: '[할따]',
    examples: [{ syl: '훑다', read: '[훌따]', meaning: rt('phonetics.cl_ex_hulda') }],
    type: 'liquid' },
  { pair: 'ㅀ', keeps: 'left', kept: 'ㄹ', ipa: '[l]',
    demoSyl: '싫다', demoMeaning: rt('phonetics.cl_silta_mean'), demoRead: '[실타]',
    examples: [{ syl: '뚫다', read: '[뚤타]', meaning: rt('phonetics.cl_ex_ttulta') }, { syl: '앓다', read: '[알타]', meaning: rt('phonetics.cl_ex_alta') }],
    type: 'liquid' },
  { pair: 'ㄿ', keeps: 'right', kept: 'ㅂ', ipa: '[p̚]',
    demoSyl: '읊다', demoMeaning: rt('phonetics.cl_eupda_mean'), demoRead: '[읍따]',
    examples: [], type: 'stop' },
  { pair: 'ㅄ', keeps: 'left', kept: 'ㅂ', ipa: '[p̚]',
    demoSyl: '값', demoMeaning: rt('phonetics.cl_gap_mean'), demoRead: '[갑]',
    examples: [{ syl: '없다', read: '[업따]', meaning: rt('phonetics.cl_ex_eopda') }, { syl: '가엾다', read: '[가엽따]', meaning: rt('phonetics.cl_ex_gaeopda') }],
    type: 'stop' },
  ];
}

function buildRepSounds(lang: Lang): { syl: string; ipa: string; meaning: string }[] {
  return [
    { syl: '박', ipa: '[k̚]', meaning: t('phonetics.rep_bak', lang) },
    { syl: '산', ipa: '[n]', meaning: t('phonetics.rep_san', lang) },
    { syl: '옷', ipa: '[t̚]', meaning: t('phonetics.rep_ot', lang) },
    { syl: '말', ipa: '[l]', meaning: t('phonetics.rep_mal', lang) },
    { syl: '밤', ipa: '[m]', meaning: t('phonetics.rep_bam', lang) },
    { syl: '밥', ipa: '[p̚]', meaning: t('phonetics.rep_bap', lang) },
    { syl: '강', ipa: '[ŋ]', meaning: t('phonetics.rep_gang', lang) },
  ];
}

function typeColor(lang: Lang): Record<ClusterType, { border: string; strong: string; label: string }> {
  return {
    stop:   { border: 'var(--hr-pink-base)',   strong: 'var(--hr-pink-strong)',   label: t('phonetics.type_stop', lang) },
    nasal:  { border: 'var(--hr-mint-base)',   strong: 'var(--hr-mint-strong)',   label: t('phonetics.type_nasal', lang) },
    liquid: { border: 'var(--hr-purple-base)', strong: 'var(--hr-purple-strong)', label: t('phonetics.type_liquid', lang) },
  };
}

// eyebrow 通用样式（.22em 用于主 eyebrow，.18em 用于次级）
const eyebrow = (color: string, tracking: '.22em' | '.18em' = '.22em'): React.CSSProperties => ({
  fontFamily: 'var(--hr-mono)', fontSize: 10, letterSpacing: tracking,
  textTransform: 'uppercase', color, fontWeight: 700,
});

function playSyl(s: string) {
  unlockAudioContext();
  playPhoneticAudio(s);
}

function BatchimClusterSection() {
  return (
    <section style={{ marginTop: 40, paddingTop: 28, borderTop: '1px dashed var(--hr-border-2)' }}>
      {/* PHONETICS_CPOS_CSS 只在辅音 tab 的 ConsonantPositionBlock 渲染时注入；
          收音 tab 走 BatchimContent，不会经过那里——必须自己注入一遍。 */}
      <style>{PHONETICS_CPOS_CSS}</style>
      <ClusterBridge />
      <ClusterRules />
      <ClusterTable />
      <ClusterExceptions />
      <ClusterCaseStudy />
    </section>
  );
}

/* ─── 板块 1 · 承上启下 ─── */
function ClusterBridge() {
  const { lang } = useLang();
  const REP_SOUNDS = buildRepSounds(lang);
  return (
    <div style={{ marginBottom: 32 }}>
      <div className="hr-intro-head">
        <div className="hr-lead">
          <div className="hr-role">{t('phonetics.cluster_role', lang)}</div>
          <h2>{t('phonetics.cluster_title', lang)}<span className="hr-kr">겹받침</span></h2>
        </div>
        <div className="hr-count"><b>11</b><span>{t('phonetics.cluster_count_unit', lang)}</span></div>
      </div>

      <p className="hr-intro-define">
        {renderInline(t('phonetics.cluster_define', lang))}
      </p>

      {/* 用 .hr-cpos-block 容器（跟 ConsonantPositionBlock 同款） */}
      <div className="hr-cpos-block" style={{ marginTop: 16 }}>
        <div className="hr-cpos-title">{t('phonetics.cluster_review_eyebrow', lang)}</div>
        <div className="hr-cpos-name">{t('phonetics.cluster_review_name', lang)}</div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 10,
          margin: '12px 0 4px',
        }}>
          {REP_SOUNDS.map((r) => (
            <button
              key={r.syl}
              type="button"
              onClick={() => playSyl(r.syl)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                padding: '12px 6px', background: 'var(--hr-surface-2)',
                border: '1px solid var(--hr-border-1)', borderRadius: 12, cursor: 'pointer',
                transition: 'all .2s',
              }}
              aria-label={t('phonetics.aria_play', lang, { w: r.syl })}
            >
              <span style={{ fontFamily: 'var(--hr-hangul)', fontSize: 26, fontWeight: 800, color: 'var(--hr-ink-1)', lineHeight: 1 }}>{r.syl}</span>
              <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-pink-strong)', fontWeight: 700 }}>{r.ipa}</span>
              <span style={{ fontSize: 10, color: 'var(--hr-ink-3)' }}>{r.meaning}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 归并示意 · 无外框，纯 editorial 排版 */}
      <div style={{
        marginTop: 20, padding: '20px 0 4px',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 18,
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--hr-mono)', fontSize: 9.5, letterSpacing: '.18em',
            textTransform: 'uppercase', color: 'var(--hr-ink-4)', fontWeight: 700, marginBottom: 6,
          }}>
            {t('phonetics.cluster_writing_layer', lang)} <span style={{ color: 'var(--hr-purple-strong)' }}>· 11</span>
          </div>
          <div style={{
            fontFamily: 'var(--hr-hangul)', fontSize: 24, fontWeight: 700,
            color: 'var(--hr-ink-1)', letterSpacing: '.02em', lineHeight: 1.4,
          }}>
            ㄳ ㄵ ㄶ ㄺ ㄻ ㄼ ㄽ ㄾ ㅀ ㄿ ㅄ
          </div>
        </div>
        <div style={{
          fontFamily: 'var(--hr-serif)', fontSize: 20, fontStyle: 'italic',
          color: 'var(--hr-ink-4)', fontWeight: 400, lineHeight: 1,
        }}>{t('phonetics.cluster_only_one', lang)}</div>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'var(--hr-mono)', fontSize: 9.5, letterSpacing: '.18em',
            textTransform: 'uppercase', color: 'var(--hr-ink-4)', fontWeight: 700, marginBottom: 6,
          }}>
            <span style={{ color: 'var(--hr-mint-strong)' }}>7 ·</span> {t('phonetics.cluster_sound_layer', lang)}
          </div>
          <div style={{
            fontFamily: 'var(--hr-hangul)', fontSize: 26, fontWeight: 800,
            color: 'var(--hr-ink-1)', letterSpacing: '.08em', lineHeight: 1.4,
          }}>
            ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 板块 2 · 两条铁律 · 无外框、纯排版（editorial 对照） ─── */
function ClusterRules() {
  const { lang } = useLang();
  const CLUSTER_ROWS = buildClusterRows(lang);
  const left = CLUSTER_ROWS.filter((r) => r.keeps === 'left');
  const right = CLUSTER_ROWS.filter((r) => r.keeps === 'right');
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={eyebrow('var(--hr-ink-3)', '.22em')}>{t('phonetics.cluster_rules_eyebrow', lang)}</div>
      <h3 style={{ fontFamily: 'var(--hr-serif)', fontSize: 24, fontWeight: 700, color: 'var(--hr-ink-1)', margin: '6px 0 8px', letterSpacing: '-.01em' }}>
        {t('phonetics.cluster_rules_title', lang)}
      </h3>
      <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: '0 0 24px', maxWidth: '58ch', lineHeight: 1.65 }}>
        {t('phonetics.cluster_rules_lede', lang)}
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32,
      }}>
        <RuleColumn heading={t('phonetics.cluster_read_left', lang)} hangul="왼쪽" tone="pink" count={left.length} rows={left} />
        <RuleColumn heading={t('phonetics.cluster_read_right', lang)} hangul="오른쪽" tone="mint" count={right.length} rows={right} />
      </div>

      <div style={{
        marginTop: 20, paddingTop: 12, borderTop: '1px solid var(--hr-border-1)',
        fontSize: 10.5, color: 'var(--hr-ink-4)', textAlign: 'right', fontStyle: 'italic',
      }}>
        {t('phonetics.cluster_rules_citation', lang)}
      </div>
    </div>
  );
}

function RuleColumn({ heading, hangul, tone, count, rows }: {
  heading: string; hangul: string; tone: 'pink' | 'mint'; count: number; rows: ClusterRow[];
}) {
  const { lang } = useLang();
  const strong = tone === 'pink' ? 'var(--hr-pink-strong)' : 'var(--hr-mint-strong)';
  return (
    <div>
      {/* Header · 纯字号+色对比，无 badge */}
      <div style={{ paddingBottom: 12, marginBottom: 14, borderBottom: `2px solid ${strong}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
          <h4 style={{
            fontFamily: 'var(--hr-serif)', fontSize: 22, fontWeight: 700,
            color: strong, margin: 0, lineHeight: 1.1, letterSpacing: '-.01em',
          }}>{heading}</h4>
          <span style={{ fontFamily: 'var(--hr-hangul)', fontSize: 16, color: 'var(--hr-ink-2)', fontWeight: 500 }}>{hangul}</span>
          <span style={{
            marginLeft: 'auto', fontFamily: 'var(--hr-mono)', fontSize: 10.5,
            letterSpacing: '.16em', textTransform: 'uppercase',
            color: 'var(--hr-ink-4)', fontWeight: 700,
          }}>{t('phonetics.cluster_n_groups', lang, { n: count })}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {rows.map((r) => <ClusterPairChip key={r.pair} row={r} />)}
      </div>
    </div>
  );
}

function ClusterPairChip({ row }: { row: ClusterRow }) {
  const { lang } = useLang();
  const c = typeColor(lang)[row.type];
  const [kL, kR] = [row.pair[0], row.pair[1]];
  const keepIsLeft = row.keeps === 'left';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '10px 12px', background: 'var(--hr-surface-3)',
      borderLeft: `3px solid ${c.border}`,
      borderRadius: 10, fontFamily: 'var(--hr-hangul)',
    }}>
      <span style={{
        fontWeight: 800, fontSize: 22, lineHeight: 1,
        color: keepIsLeft ? c.strong : 'var(--hr-ink-4)',
        textDecoration: keepIsLeft ? 'none' : 'line-through',
        textDecorationColor: 'var(--hr-ink-4)',
        textDecorationThickness: 2,
      }}>{kL}</span>
      <span style={{
        fontWeight: 800, fontSize: 22, lineHeight: 1,
        color: !keepIsLeft ? c.strong : 'var(--hr-ink-4)',
        textDecoration: !keepIsLeft ? 'none' : 'line-through',
        textDecorationColor: 'var(--hr-ink-4)',
        textDecorationThickness: 2,
      }}>{kR}</span>
      <span style={{ fontFamily: 'var(--hr-serif)', fontStyle: 'italic', fontSize: 14, color: 'var(--hr-ink-3)', margin: '0 2px' }}>→</span>
      <span style={{ fontWeight: 800, fontSize: 18, color: c.strong, lineHeight: 1 }}>{row.kept}</span>
      <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-ink-3)', fontWeight: 500 }}>{row.ipa}</span>
    </div>
  );
}

/* ─── 板块 3 · 11 卡片查阅（对齐单收音 hr-bs-card 视觉）─── */
function ClusterTable() {
  const { lang } = useLang();
  const CLUSTER_ROWS = buildClusterRows(lang);
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={eyebrow('var(--hr-ink-3)', '.18em')}>{t('phonetics.cluster_table_eyebrow', lang)}</div>
      <h3 style={{ fontFamily: 'var(--hr-serif)', fontSize: 22, fontWeight: 700, color: 'var(--hr-ink-1)', margin: '6px 0 4px' }}>
        {t('phonetics.cluster_table_title', lang)}
      </h3>
      <p style={{ fontSize: 12.5, color: 'var(--hr-ink-3)', margin: '0 0 16px' }}>
        {renderInline(t('phonetics.cluster_table_lede', lang))}
      </p>

      <div className="hr-batchim-seven">
        {CLUSTER_ROWS.map((row) => <ClusterCard key={row.pair} row={row} />)}
      </div>
    </div>
  );
}

function ClusterCard({ row }: { row: ClusterRow }) {
  const { lang } = useLang();
  const c = typeColor(lang)[row.type];
  const soft = row.type === 'stop' ? 'var(--hr-pink-soft)'
    : row.type === 'nasal' ? 'var(--hr-mint-soft)'
    : 'var(--hr-purple-soft)';
  const softBorder = row.type === 'stop' ? 'var(--hr-pink-border)'
    : row.type === 'nasal' ? 'var(--hr-mint-border)'
    : 'var(--hr-purple-border)';
  const typeLabel = row.type === 'stop' ? t('phonetics.cluster_type_stop', lang)
    : row.type === 'nasal' ? t('phonetics.cluster_type_nasal', lang)
    : t('phonetics.cluster_type_liquid', lang);

  const [kL, kR] = [row.pair[0], row.pair[1]];
  const keepIsLeft = row.keeps === 'left';

  return (
    <div className="hr-bs-card">
      {/* Head · 双 jamo + type pill */}
      <div className="hr-bs-head">
        <div className="hr-bs-jamo">
          {row.pair}
          <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 14, color: 'var(--hr-ink-3)', fontWeight: 400, marginLeft: 6 }}>
            {row.ipa}
          </span>
        </div>
        <div className="hr-bs-type" style={{ background: soft, borderColor: softBorder, color: c.strong }}>
          {typeLabel}
        </div>
      </div>

      {/* 拆解 · 读左/读右示意 */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 14px', background: 'var(--hr-surface-3)',
        border: '1px solid var(--hr-border-1)', borderRadius: 12,
      }}>
        <span style={{
          fontFamily: 'var(--hr-hangul)', fontWeight: 800, fontSize: 28, lineHeight: 1,
          color: keepIsLeft ? c.strong : 'var(--hr-ink-4)',
          textDecoration: keepIsLeft ? 'none' : 'line-through',
          textDecorationColor: 'var(--hr-ink-4)',
          textDecorationThickness: 2,
        }}>{kL}</span>
        <span style={{
          fontFamily: 'var(--hr-hangul)', fontWeight: 800, fontSize: 28, lineHeight: 1,
          color: !keepIsLeft ? c.strong : 'var(--hr-ink-4)',
          textDecoration: !keepIsLeft ? 'none' : 'line-through',
          textDecorationColor: 'var(--hr-ink-4)',
          textDecorationThickness: 2,
        }}>{kR}</span>
        <span style={{ fontFamily: 'var(--hr-serif)', fontStyle: 'italic', fontSize: 16, color: 'var(--hr-ink-3)' }}>→</span>
        <span style={{ fontFamily: 'var(--hr-hangul)', fontWeight: 800, fontSize: 26, color: c.strong, lineHeight: 1 }}>{row.kept}</span>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--hr-mono)', fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--hr-ink-3)', fontWeight: 700 }}>
          {row.keeps === 'left' ? t('phonetics.cluster_pron_left', lang) : t('phonetics.cluster_pron_right', lang)}
        </span>
      </div>

      {/* 示范词播放条 · 完全照抄 .hr-bs-play */}
      <button
        type="button"
        className="hr-bs-play"
        onClick={() => playSyl(row.demoSyl)}
        aria-label={t('phonetics.aria_play_demo_word', lang, { w: row.demoSyl })}
      >
        <span className="hr-bs-play-btn">▶</span>
        <div style={{ flex: 1, textAlign: 'left' }}>
          <span className="hr-bs-syl" style={{ fontSize: 26 }}>{row.demoSyl}</span>
          <span className="hr-bs-mean" style={{ marginLeft: 8 }}>{row.demoMeaning}</span>
          <div style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: c.strong, marginTop: 2, fontWeight: 700 }}>
            {row.demoRead}
          </div>
        </div>
      </button>

      {/* 例词 · 用 .hr-bs-fam 结构 */}
      {row.examples.length > 0 && (
        <div className="hr-bs-fam">
          <span className="hr-bs-fam-label">{t('phonetics.cluster_examples_label', lang)}</span>
          {row.examples.map((ex) => (
            <button
              key={ex.syl}
              type="button"
              onClick={() => playSyl(ex.syl)}
              className="hr-bs-fam-chip"
              style={{ display: 'inline-flex', alignItems: 'baseline', gap: 6, cursor: 'pointer' }}
              aria-label={t('phonetics.aria_play', lang, { w: ex.syl })}
            >
              <span>{ex.syl}</span>
              <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, color: c.strong, fontWeight: 700 }}>{ex.read}</span>
              <span style={{ fontFamily: 'ui-sans-serif, system-ui', fontSize: 10.5, color: 'var(--hr-ink-3)', fontWeight: 400 }}>{ex.meaning}</span>
            </button>
          ))}
        </div>
      )}

      {/* 例外提示 · 只在 ㄼ/ㄺ 出现 */}
      {row.exception && (
        <div style={{
          fontSize: 11.5, color: 'var(--hr-pink-strong)', lineHeight: 1.5,
          paddingTop: 8, borderTop: '1px dashed var(--hr-border-1)',
          fontFamily: 'var(--hr-serif)', fontStyle: 'italic',
        }}>
          {t('phonetics.cluster_exception_prefix', lang)}{row.exception === 'balp' ? t('phonetics.cluster_exception_balp', lang) : t('phonetics.cluster_exception_lg', lang)}{t('phonetics.cluster_exception_suffix', lang)}
        </div>
      )}
    </div>
  );
}

/* ─── 板块 4 · 两条例外 · 叙事式（无外框） ─── */
function ClusterExceptions() {
  const { lang } = useLang();
  const hg = (color?: string): React.CSSProperties => ({ fontFamily: 'var(--hr-hangul)', ...(color ? { color } : {}) });
  const balpWords = [
    { syl: '밟다', read: '[밥따]', meaning: t('phonetics.exc_balp_balpda', lang) },
    { syl: '넓적하다', read: '[넙쩌카다]', meaning: t('phonetics.exc_balp_neopjeok', lang) },
    { syl: '넓둥글다', read: '[넙뚱글다]', meaning: t('phonetics.exc_balp_neopdung', lang) },
    { syl: '넓죽하다', read: '[넙쭈카다]', meaning: t('phonetics.exc_balp_neopjuk', lang) },
  ];
  const lgWords = [
    { syl: '읽고', read: '[일꼬]', meaning: t('phonetics.exc_lg_ilgo', lang) },
    { syl: '맑게', read: '[말께]', meaning: t('phonetics.exc_lg_malge', lang) },
    { syl: '묽고', read: '[물꼬]', meaning: t('phonetics.exc_lg_mulgo', lang) },
  ];

  return (
    <div style={{ marginBottom: 40 }}>
      <div style={eyebrow('var(--hr-ink-3)', '.22em')}>{t('phonetics.exc_eyebrow', lang)}</div>
      <h3 style={{ fontFamily: 'var(--hr-serif)', fontSize: 24, fontWeight: 700, color: 'var(--hr-ink-1)', margin: '6px 0 8px', letterSpacing: '-.01em' }}>
        {t('phonetics.exc_title', lang)}
      </h3>
      <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: '0 0 24px', maxWidth: '58ch', lineHeight: 1.65 }}>
        <b style={hg('var(--hr-ink-1)')}>ㄼ</b> {t('phonetics.exc_intro_mid', lang)} <b style={hg('var(--hr-ink-1)')}>ㄺ</b> {t('phonetics.exc_intro_tail', lang)}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
        <ExceptionBlock
          index="I"
          title={<><span style={hg('var(--hr-purple-strong)')}>ㄼ</span> {t('phonetics.exc_balp_title_a', lang)} <span style={hg('var(--hr-pink-strong)')}>ㅂ</span></>}
          rule={<>{t('phonetics.exc_balp_rule_a', lang)} <b style={hg('var(--hr-purple-strong)')}>ㄹ</b>{t('phonetics.exc_balp_rule_b', lang)} <b style={hg('var(--hr-pink-strong)')}>ㅂ</b>{t('phonetics.exc_balp_rule_c', lang)}</>}
          words={balpWords}
          accent="var(--hr-purple-strong)"
        />
        <ExceptionBlock
          index="II"
          title={<><span style={hg('var(--hr-pink-strong)')}>ㄺ</span> {t('phonetics.exc_lg_title_a', lang)} <span style={hg()}>ㄱ</span> {t('phonetics.exc_lg_title_b', lang)} <span style={hg('var(--hr-purple-strong)')}>ㄹ</span></>}
          rule={<>{t('phonetics.exc_lg_rule_a', lang)} <b style={hg('var(--hr-pink-strong)')}>ㄱ</b>{t('phonetics.exc_lg_rule_b', lang)} <b style={hg()}>ㄱ</b> {t('phonetics.exc_lg_rule_c', lang)} <b style={hg('var(--hr-purple-strong)')}>ㄹ</b>{t('phonetics.exc_lg_rule_d', lang)}</>}
          words={lgWords}
          accent="var(--hr-pink-strong)"
        />
      </div>
    </div>
  );
}

function ExceptionBlock({ index, title, rule, words, accent }: {
  index: string; title: React.ReactNode; rule: React.ReactNode;
  words: { syl: string; read: string; meaning: string }[]; accent: string;
}) {
  const { lang } = useLang();
  return (
    <div>
      {/* Header · serif roman numeral（跟随语法卡的编号风格） */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
        <span style={{
          fontFamily: 'var(--hr-serif)', fontStyle: 'italic', fontSize: 32, fontWeight: 400,
          color: accent, lineHeight: 1, opacity: 0.55,
        }}>{index}</span>
        <h4 style={{
          margin: 0, fontFamily: 'var(--hr-serif)', fontSize: 17, fontWeight: 700,
          color: 'var(--hr-ink-1)', lineHeight: 1.35, letterSpacing: '-.005em',
        }}>{title}</h4>
      </div>

      <p style={{
        fontSize: 13, color: 'var(--hr-ink-2)', lineHeight: 1.65, margin: '0 0 14px',
        paddingLeft: 14, borderLeft: `2px solid ${accent}`,
      }}>{rule}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {words.map((w) => (
          <button
            key={w.syl}
            type="button"
            onClick={() => playSyl(w.syl)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', background: 'var(--hr-surface-2)',
              border: '1px solid var(--hr-border-1)', borderRadius: 10, cursor: 'pointer',
              textAlign: 'left',
            }}
            aria-label={t('phonetics.aria_play', lang, { w: w.syl })}
          >
            <span style={{
              width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'linear-gradient(135deg, var(--hr-pink-base), var(--hr-pink-strong))',
              color: '#fff', fontSize: 11,
              boxShadow: '0 3px 10px rgba(255,127,168,.3)',
              flexShrink: 0,
            }}>▶</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--hr-hangul)', fontWeight: 700, fontSize: 17, color: 'var(--hr-ink-1)', lineHeight: 1.1 }}>{w.syl}</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 3 }}>
                <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 11, color: 'var(--hr-pink-strong)', fontWeight: 700 }}>{w.read}</span>
                <span style={{ fontSize: 11, color: 'var(--hr-ink-3)' }}>{w.meaning}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── 板块 5 · 案例 · 값 举一反三 ─── */
function ClusterCaseStudy() {
  const { lang } = useLang();
  const steps = [
    { step: 'I',   ctx: t('phonetics.case_ctx_alone', lang),   ex: '값', read: '[갑]',
      note: t('phonetics.case_note_1', lang),    tone: 'pink' as const },
    { step: 'II',  ctx: t('phonetics.case_ctx_before_cons', lang), ex: '값도', read: '[갑또]',
      note: t('phonetics.case_note_2', lang), tone: 'mint' as const },
    { step: 'III', ctx: t('phonetics.case_ctx_before_vowel', lang), ex: '값이', read: '[갑씨]',
      note: t('phonetics.case_note_3', lang), tone: 'purple' as const },
  ];
  const toneStrong = (t: 'pink' | 'mint' | 'purple') =>
    t === 'pink' ? 'var(--hr-pink-strong)' : t === 'mint' ? 'var(--hr-mint-strong)' : 'var(--hr-purple-strong)';
  const toneBase = (t: 'pink' | 'mint' | 'purple') =>
    t === 'pink' ? 'var(--hr-pink-base)' : t === 'mint' ? 'var(--hr-mint-base)' : 'var(--hr-purple-base)';
  const toneSoft = (t: 'pink' | 'mint' | 'purple') =>
    t === 'pink' ? 'var(--hr-pink-soft)' : t === 'mint' ? 'var(--hr-mint-soft)' : 'var(--hr-purple-soft)';

  return (
    <div className="hr-cpos-block">
      <div className="hr-cpos-title">{t('phonetics.case_eyebrow', lang)}</div>
      <div className="hr-cpos-name">{t('phonetics.case_name', lang)}</div>
      <p className="hr-cpos-lede">
        {renderInline(t('phonetics.case_lede', lang))}
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12,
      }}>
        {steps.map((s) => (
          <div key={s.ex} style={{
            padding: 16, background: 'var(--hr-surface-2)',
            border: '1px solid var(--hr-border-1)',
            borderLeft: `3px solid ${toneBase(s.tone)}`,
            borderRadius: 14, display: 'grid', gap: 10,
          }}>
            {/* Head · serif italic 罗马数字 + 情境 */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{
                fontFamily: 'var(--hr-serif)', fontStyle: 'italic', fontSize: 28, fontWeight: 400,
                color: toneStrong(s.tone), lineHeight: 1, opacity: 0.55,
                minWidth: 24,
              }}>{s.step}</span>
              <div style={{ fontFamily: 'var(--hr-hangul)', fontSize: 13, color: 'var(--hr-ink-2)', fontWeight: 500 }}>
                {s.ctx}
              </div>
            </div>

            {/* 播放条 · 用 .hr-bs-play 样式 */}
            <button
              type="button"
              className="hr-bs-play"
              onClick={() => playSyl(s.ex)}
              style={{ background: toneSoft(s.tone), borderColor: `${toneBase(s.tone)}55` }}
              aria-label={t('phonetics.aria_play', lang, { w: s.ex })}
            >
              <span className="hr-bs-play-btn" style={{
                background: `linear-gradient(135deg, ${toneBase(s.tone)}, ${toneStrong(s.tone)})`,
                boxShadow: `0 3px 10px ${toneBase(s.tone)}44`,
              }}>▶</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <span className="hr-bs-syl" style={{ fontSize: 28 }}>{s.ex}</span>
                <div style={{ fontFamily: 'var(--hr-mono)', fontSize: 12, color: toneStrong(s.tone), marginTop: 3, fontWeight: 700 }}>
                  {s.read}
                </div>
              </div>
            </button>

            {/* 规则说明 */}
            <div style={{
              fontSize: 12.5, color: 'var(--hr-ink-2)', lineHeight: 1.55,
              paddingTop: 4,
            }}>
              {s.note}
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 14, padding: '10px 12px',
        background: 'var(--hr-surface-3)', border: '1px dashed var(--hr-border-2)',
        borderRadius: 10, fontSize: 12, color: 'var(--hr-ink-3)', lineHeight: 1.55,
      }}>
        {renderInline(t('phonetics.case_more_examples', lang))}
      </div>
    </div>
  );
}

function LetterCard({ letter, onOpen, hideAudio = false }: { letter: PhoneticLetter; onOpen: (l: PhoneticLetter) => void; hideAudio?: boolean }) {
  const open = useCallback(() => {
    if (!hideAudio) {
      unlockAudioContext();
      playPhoneticAudio(getSpeakText(letter));
    }
    onOpen(letter);
  }, [letter, onOpen, hideAudio]);
  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  }, [open]);
  const displayChar = letter.members ? letter.members.join(' / ') : letter.letter;
  return (
    <article className="hr-letter-card" onClick={open} onKeyDown={onKey} tabIndex={0} aria-label={`${letter.name} ${letter.romanization}`}>
      <div className="hr-lc-check">✓</div>
      <div className="hr-lc-char" style={letter.members ? { fontSize: 18, lineHeight: 1.3 } : undefined}>{displayChar}</div>
      <div className="hr-lc-roman">{letter.romanization}</div>
    </article>
  );
}

/* 字母详情抽屉 */
function LetterSheet({ letter, onClose }: { letter: PhoneticLetter; onClose: () => void }) {
  const { lang } = useLang();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const examples = getExamplesForLetter(letter.letter);
  const displayChar = letter.members ? letter.members.join(' / ') : letter.letter;
  const typeLabel = letter.type === 'vowel'
    ? (letter.subtype === 'basic' ? t('phonetics.subtype_label_basic_vowel', lang) : t('phonetics.subtype_label_compound_vowel', lang))
    : letter.type === 'consonant'
      ? (letter.subtype === 'basic' ? t('phonetics.subtype_label_basic_consonant', lang) : letter.subtype === 'double' ? t('phonetics.subtype_double', lang) : t('phonetics.tab_consonant', lang))
      : t('phonetics.subtype_label_batchim', lang);

  return (
    <div className="hr-sheet-mask" onClick={onClose}>
      <div className="hr-sheet" onClick={(e) => e.stopPropagation()}>
        <button className="hr-sheet-close" onClick={onClose} aria-label={t('phonetics.close', lang)}>
          <X size={16} />
        </button>
        <div className="hr-sheet-hero">
          <div className="hr-sh-char" style={letter.members ? { fontSize: 60, letterSpacing: '.02em' } : undefined}>{displayChar}</div>
          <div className="hr-sh-name">{lang === 'en' ? letter.nameEn ?? letter.name : letter.name} · {typeLabel}</div>
          <div className="hr-sh-roman">[ {letter.romanization} ]</div>
        </div>
        <div className="hr-sheet-body">
          <div className="hr-sheet-field">
            <div className="hr-sf-label">{t('phonetics.sheet_sound_label', lang)}</div>
            <div className="hr-sf-body">{lang === 'en' ? letter.soundEn ?? letter.sound : letter.sound}</div>
          </div>
          <div className="hr-sheet-field">
            <div className="hr-sf-label">{t('phonetics.sheet_mnemonic_label', lang)} {letter.emoji}</div>
            <div className="hr-sf-body">{lang === 'en' ? letter.mnemonicEn ?? letter.mnemonic : letter.mnemonic}</div>
          </div>
          {letter.strokeOrder && letter.strokeOrder.length > 0 && (
            <div className="hr-sheet-field">
              <div className="hr-sf-label">{t('phonetics.sheet_stroke_label', lang)}</div>
              <div className="hr-sheet-stroke">
                {(lang === 'en' ? letter.strokeOrderEn ?? letter.strokeOrder : letter.strokeOrder).map((step, i) => (
                  <div key={i} className="hr-stk-step"><b>0{i + 1}</b><span>{step}</span></div>
                ))}
              </div>
            </div>
          )}
          {examples.length > 0 && (
            <div className="hr-sheet-field">
              <div className="hr-sf-label">{t('phonetics.sheet_examples_label', lang)}</div>
              <div className="hr-sheet-examples">
                {examples.map((ex) => (
                  <button key={ex.syl} onClick={() => { unlockAudioContext(); playPhoneticAudio(ex.syl); }}>
                    <span className="hr-ex-syl">{ex.syl}</span>
                    <span className="hr-ex-roman">{ex.roman}</span>
                    <span className="hr-ex-roman" style={{ color: 'var(--hr-ink-2)' }}>{lang === 'en' ? ex.meaningEn ?? ex.meaning : ex.meaning}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="hr-sheet-field hr-ai-field">
            <div className="hr-sf-label">{t('phonetics.sheet_ai_label', lang)}</div>
            <AIExplain
              label={t('phonetics.ai_letter_label', lang)}
              tag={t('phonetics.ai_letter_tag', lang)}
              payload={{
                mode: 'letter',
                key: letter.letter,
                letter: letter.letter,
                letterName: letter.name,
                letterRoman: letter.romanization,
                letterType: typeLabel,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SCREEN 3 · 连读规则（真数据，左侧 sticky 导航）
   ════════════════════════════════════════════════════════════════ */
function RulesScreen() {
  const { lang } = useLang();
  const RULE_CATEGORIES = useMemo(() => buildRuleCategories(lang), [lang]);
  const [activeCat, setActiveCat] = useState(RULE_CATEGORIES[0].id);
  const cat = RULE_CATEGORIES.find((c) => c.id === activeCat) ?? RULE_CATEGORIES[0];

  return (
    <div className="hr-screen active">
      <div className="hr-rules-intro">
        <h2>{renderInline(t('phonetics.rules_intro_title', lang))}</h2>
        <p>{renderInline(t('phonetics.rules_intro_body', lang))}</p>
        <div className="hr-ri-divider">
          <span className="hr-ri-line" />
          <div className="hr-ri-sub">
            <span className="hr-ri-sub-cn">{t('phonetics.rules_intro_divider', lang)}</span>
            <span className="hr-ri-sub-kr">음운 변동</span>
          </div>
        </div>
        <p className="hr-ri-outro">
          {t('phonetics.rules_intro_outro', lang)}
        </p>
      </div>

      {/* 音变触发顺序流程图 */}
      <div style={{
        margin: '20px 0 24px', padding: '18px 20px',
        background: 'linear-gradient(135deg, rgba(255,127,168,0.06), rgba(174,227,216,0.08))',
        border: '1px solid var(--hr-border-2)',
        borderRadius: 16,
      }}>
        <div style={{
          fontFamily: 'var(--hr-mono)', fontSize: 10, letterSpacing: '.22em',
          textTransform: 'uppercase', color: 'var(--hr-purple-strong)', fontWeight: 700,
          marginBottom: 4,
        }}>
          {t('phonetics.order_eyebrow', lang)}
        </div>
        <div style={{ fontFamily: 'var(--hr-serif)', fontSize: 17, fontWeight: 700, color: 'var(--hr-ink-1)', marginBottom: 12 }}>
          {t('phonetics.order_title', lang)}
        </div>
        <p style={{ fontSize: 13, color: 'var(--hr-ink-2)', lineHeight: 1.65, margin: '0 0 14px' }}>
          {renderInline(t('phonetics.order_body', lang))}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { step: '01', label: t('phonetics.order_s1_label', lang), kr: '중화', desc: t('phonetics.order_s1_desc', lang) },
            { step: '02', label: t('phonetics.order_s2_label', lang), kr: '연음 여부', desc: t('phonetics.order_s2_desc', lang) },
            { step: '03', label: t('phonetics.order_s3_label', lang), kr: '결합 변동', desc: t('phonetics.order_s3_desc', lang) },
            { step: '04', label: t('phonetics.order_s4_label', lang), kr: '탈락 · 첨가', desc: t('phonetics.order_s4_desc', lang) },
          ].map((s) => (
            <div key={s.step} style={{
              display: 'flex', gap: 12, padding: '10px 12px',
              background: 'var(--hr-surface-2)', borderRadius: 10,
              border: '1px solid var(--hr-border-1)',
            }}>
              <div style={{
                flexShrink: 0, width: 34, height: 34, borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--hr-mono)', fontSize: 12, fontWeight: 800,
                background: 'var(--hr-pink-soft)', color: 'var(--hr-pink-strong)',
              }}>{s.step}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
                  <b style={{ fontSize: 14, color: 'var(--hr-ink-1)' }}>{s.label}</b>
                  <span style={{ fontFamily: 'var(--hr-hangul)', fontSize: 12, color: 'var(--hr-ink-3)' }}>{s.kr}</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--hr-ink-2)', lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hr-rules-layout">
        <div className="hr-rules-nav">
          {RULE_CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={`hr-rules-nav-item${c.id === activeCat ? ' active' : ''}`}
              onClick={() => setActiveCat(c.id)}
            >
              {c.label}<span className="hr-rn-kr">{c.labelKo}</span>
            </button>
          ))}
        </div>
        <div>
          {cat.rules.map((rule) => <RuleCard key={rule.id} rule={rule} />)}
        </div>
      </div>
    </div>
  );
}

function RuleCard({ rule }: { rule: Rule }) {
  const { lang } = useLang();
  return (
    <div className="hr-rule-card">
      <div className="hr-rule-header">
        <div>
          <div className="hr-rh-num">{rule.num}</div>
          <h3>{rule.title}<span className="hr-kr">{rule.titleKo}</span></h3>
        </div>
        <div className="hr-rh-tag">{rule.tag}</div>
      </div>

      <div className="hr-rule-plain">
        <span className="hr-rp-icon">💡</span>
        <span className="hr-rp-text">{rule.plain}</span>
      </div>

      {rule.formula.map((f, i) => (
        <div key={i} className="hr-rule-formula">
          {i === 0 && <div className="hr-rf-label">{t('phonetics.rule_formula_word', lang)}</div>}
          <div className="hr-rf-eq"><span className="hr-from">{f.from}</span> <span className="hr-arrow">{f.arrow}</span> <span className="hr-to">{f.to}</span></div>
        </div>
      ))}

      {rule.letterGroups && (
        <div className="hr-letter-groups">
          <div className="hr-lg-title">{t('phonetics.rule_lettergroups_title', lang)}</div>
          <div className="hr-lg-rows">
            {rule.letterGroups.map((g) => (
              <div key={g.label} className="hr-lg-row">
                <span className="hr-lg-label">{g.label}</span>
                <span className="hr-lg-jamos">{g.jamos}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="hr-rule-explanation">{rule.explanation}</p>

      <div className="hr-examples-head">
        <span className="hr-eh-title">{t('phonetics.rule_examples_title', lang)}</span>
        <span className="hr-eh-hint">{renderInline(t('phonetics.rule_examples_hint', lang))}</span>
      </div>
      <div className="hr-rule-examples">
        {rule.examples.map((ex, i) => (
          <div key={i} className="hr-example-card">
            <div className="hr-ec-row">
              <div className="hr-ec-side hr-ec-side-write">
                <div className="hr-ec-side-label">{t('phonetics.label_write', lang)}</div>
                <div className="hr-ec-side-word">{ex.original}</div>
                <button className="hr-ec-side-play" onClick={() => { unlockAudioContext(); playPhoneticAudioLiteral(ex.original); }} aria-label={t('phonetics.aria_read_literal', lang, { w: ex.original })}>▶</button>
              </div>
              <div className="hr-ec-arrow">→</div>
              <div className="hr-ec-side hr-ec-side-read">
                <div className="hr-ec-side-label">{t('phonetics.label_read', lang)}</div>
                <div className="hr-ec-side-word">{ex.read}</div>
                <button className="hr-ec-side-play" onClick={() => { unlockAudioContext(); playPhoneticAudio(ex.read); }} aria-label={t('phonetics.aria_read_actual', lang, { w: ex.read })}>▶</button>
              </div>
            </div>
            <div className="hr-ec-meaning">{ex.meaning}</div>
          </div>
        ))}
      </div>

      {rule.sentences && rule.sentences.length > 0 && (
        <div className="hr-rule-sentences">
          <div className="hr-rs-head">
            <span className="hr-rs-title">{t('phonetics.rule_sentences_title', lang)}</span>
            <span className="hr-rs-hint">{renderInline(t('phonetics.rule_sentences_hint', lang))}</span>
          </div>
          {rule.sentences.map((s, i) => (
            <div key={i} className="hr-sentence-card">
              <div className="hr-sc-row">
                <span className="hr-sc-tag hr-sc-tag-write">{t('phonetics.label_write', lang)}</span>
                <span className="hr-sc-text">{renderHighlighted(s.ko)}</span>
                <button className="hr-sc-play" onClick={() => { unlockAudioContext(); playPhoneticAudioLiteral(stripMark(s.ko)); }} aria-label={t('phonetics.aria_read_literal_plain', lang)}>▶</button>
              </div>
              <div className="hr-sc-row hr-sc-row-read">
                <span className="hr-sc-tag hr-sc-tag-read">{t('phonetics.label_read', lang)}</span>
                <span className="hr-sc-text">{renderHighlighted(s.read)}</span>
                <button className="hr-sc-play hr-sc-play-read" onClick={() => { unlockAudioContext(); playPhoneticAudio(stripMark(s.read)); }} aria-label={t('phonetics.aria_read_actual_plain', lang)}>▶</button>
              </div>
              <div className="hr-sc-meaning">{s.meaning}</div>
            </div>
          ))}
        </div>
      )}

      {rule.pitfalls && rule.pitfalls.length > 0 && (
        <div style={{
          marginTop: 18, padding: '14px 16px',
          background: 'rgba(255,127,168,0.06)',
          border: '1px solid rgba(255,127,168,0.25)',
          borderRadius: 12,
        }}>
          <div style={{
            fontFamily: 'var(--hr-mono)', fontSize: 10, letterSpacing: '.22em',
            textTransform: 'uppercase', color: 'var(--hr-pink-strong)', fontWeight: 700,
            marginBottom: 10,
          }}>
            {t('phonetics.rule_pitfalls_title', lang)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {rule.pitfalls.map((p, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: 'var(--hr-mono)', fontSize: 12, padding: '2px 8px',
                    background: 'rgba(220,80,80,0.12)', color: 'var(--color-status-danger)',
                    borderRadius: 6, fontWeight: 700,
                  }}>✗ {p.wrong}</span>
                  <span style={{
                    fontFamily: 'var(--hr-mono)', fontSize: 12, padding: '2px 8px',
                    background: 'rgba(80,180,120,0.14)', color: 'var(--color-status-success)',
                    borderRadius: 6, fontWeight: 700,
                  }}>✓ {p.right}</span>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--hr-ink-2)', lineHeight: 1.55, paddingLeft: 2 }}>
                  {p.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px dashed var(--hr-border-1)' }}>
        <AIExplain
          label={t('phonetics.ai_more_examples_label', lang)}
          tag={t('phonetics.ai_more_examples_tag', lang)}
          payload={{
            mode: 'examples',
            key: rule.id,
            ruleTitle: rule.title,
            ruleExplanation: rule.explanation,
          }}
        />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SCREEN 4 · 合成器
   ════════════════════════════════════════════════════════════════ */
function ComposerScreen() {
  const { lang } = useLang();
  const [cho, setCho] = useState('ㅇ');
  const [jung, setJung] = useState('ㅏ');
  const [jong, setJong] = useState('ㄴ');

  const syllable = composeSyllable(cho, jung, jong);
  const roman = romanizeJamos(cho, jung, jong);

  const handlePlay = useCallback(() => {
    if (!syllable) return;
    unlockAudioContext();
    playPhoneticAudio(syllable);
  }, [syllable]);

  const loadPreset = (text: string) => {
    if (text.length === 0) return;
    // 取第一字回填初/中/终
    const first = text[0];
    const code = first.charCodeAt(0) - 0xAC00;
    if (code < 0 || code >= 11172) return;
    const c = Math.floor(code / 588);
    const v = Math.floor((code % 588) / 28);
    const b = code % 28;
    const choArr = Object.keys(CHO_MAP);
    const jungArr = Object.keys(JUNG_MAP);
    const jongArr = Object.keys(JONG_MAP);
    setCho(choArr[c] ?? 'ㅇ');
    setJung(jungArr[v] ?? 'ㅏ');
    setJong(jongArr[b] ?? '');
    unlockAudioContext();
    playPhoneticAudio(text);
  };

  return (
    <div className="hr-screen active">
      <div className="hr-composer-wrap">
        <div className="hr-composer-head">
          <h2>{renderInline(t('phonetics.composer_head_title', lang))}</h2>
          <p>{t('phonetics.composer_head_desc', lang)}</p>
        </div>

        <div className="hr-composer-builder">
          <div className="hr-composer-row">
            <div className={`hr-composer-slot${cho ? ' filled' : ''}`}>
              <div className="hr-cs-label">{t('phonetics.composer_slot_initial', lang)}</div>
              {cho ? <div className="hr-cs-char">{cho}</div> : <div className="hr-cs-placeholder">？</div>}
            </div>
            <div className="hr-composer-op">＋</div>
            <div className={`hr-composer-slot${jung ? ' filled' : ''}`}>
              <div className="hr-cs-label">{t('phonetics.composer_slot_medial', lang)}</div>
              {jung ? <div className="hr-cs-char">{jung}</div> : <div className="hr-cs-placeholder">？</div>}
            </div>
            <div className="hr-composer-op">＋</div>
            <div className={`hr-composer-slot${jong ? ' filled' : ''}`}>
              <div className="hr-cs-label">{t('phonetics.composer_slot_final', lang)}</div>
              {jong ? <div className="hr-cs-char">{jong}</div> : <div className="hr-cs-placeholder">{t('phonetics.composer_none', lang)}</div>}
            </div>
          </div>

          <div className="hr-composer-result">
            <div className="hr-cr-label">{t('phonetics.composer_result_label', lang)}</div>
            <div className="hr-cr-syllable">{syllable || '？'}</div>
            <div className="hr-cr-roman">{roman}</div>
            <div className="hr-cr-meaning">{t('phonetics.composer_result_hint', lang)}</div>
            <div style={{ marginTop: 16 }}>
              <button className="hr-btn hr-btn-dark" onClick={handlePlay}>{t('phonetics.composer_play_button', lang)}</button>
            </div>
          </div>
        </div>

        <PickerBlock title={t('phonetics.composer_pick_consonant', lang)} kr="자음 선택" items={COMPOSER_CONSONANTS} value={cho} onChange={setCho} />
        <PickerBlock title={t('phonetics.composer_pick_vowel', lang)} kr="모음 선택" items={COMPOSER_VOWELS} value={jung} onChange={setJung} />
        <PickerBlock
          title={t('phonetics.composer_pick_batchim', lang)}
          kr={t('phonetics.composer_pick_batchim_kr', lang)}
          items={COMPOSER_BATCHIM}
          value={jong}
          onChange={setJong}
          emptyLabel={t('phonetics.composer_none', lang)}
        >
          <div className="hr-composer-presets">
            {COMPOSER_PRESETS.map((p) => (
              <button key={p.syl} className="hr-preset-btn" onClick={() => loadPreset(p.syl)} title={t(p.meaningKey, lang)}>{p.syl}</button>
            ))}
          </div>
        </PickerBlock>
      </div>
    </div>
  );
}

function PickerBlock({ title, kr, items, value, onChange, emptyLabel, children }: { title: string; kr: string; items: string[]; value: string; onChange: (v: string) => void; emptyLabel?: string; children?: React.ReactNode }) {
  return (
    <div className="hr-composer-picker">
      <h4>{title} <span className="hr-cp-kr">{kr}</span></h4>
      <div className="hr-composer-picker-grid">
        {items.map((it) => (
          <button
            key={it || 'empty'}
            className={`hr-composer-picker-btn${value === it ? ' selected' : ''}`}
            onClick={() => onChange(it)}
            style={it === '' ? { fontSize: 12 } : undefined}
          >
            {it === '' ? (emptyLabel ?? '–') : it}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SCREEN 5 · 练习（连击+本次统计真做，挑战/错题本占位）
   ════════════════════════════════════════════════════════════════ */
type Question = {
  prompt: string;
  isListen: boolean;
  target: PhoneticLetter;
  correctAnswer: string;
  options: string[];
};


// 收集所有易混对（去重后扁平化成 PhoneticLetter[]）— 仍在 ConfusedBlock 等位置使用
const CONFUSED_POOLS: { label: string; tip: string; letters: PhoneticLetter[] }[] = (() => {
  const seen = new Set<string>();
  const result: { label: string; tip: string; letters: PhoneticLetter[] }[] = [];
  for (const step of progressiveSteps) {
    for (const p of step.confusedPairs) {
      if (seen.has(p.id)) continue;
      seen.add(p.id);
      result.push({ label: p.label, tip: p.tip, letters: p.letters });
    }
  }
  return result;
})();
void CONFUSED_POOLS; // 现练习不再用 confused 题，保留供其它板块引用

function buildQuestion(pool: PhoneticLetter[], mode: PracticeMode, lang: Lang): Question {
  const target = pool[Math.floor(Math.random() * pool.length)];
  const isListen = mode === 'listen' || (mode === 'mixed' && Math.random() < 0.5);
  const correctAnswer = target.quizLetter ?? target.letter;
  // 干扰项必须与 target 同 type（元音 vs 元音、辅音 vs 辅音），避免「听 ㅏ 出现 ㄱ 干扰」这种跨类干扰
  const sameType = pool.filter((c) => c.type === target.type);
  const wrongs: string[] = [];
  for (const cand of shuffle(sameType)) {
    if (wrongs.length >= 3) break;
    const v = cand.quizLetter ?? cand.letter;
    if (v !== correctAnswer && !wrongs.includes(v)) wrongs.push(v);
  }
  return {
    prompt: isListen ? t('phonetics.q_prompt_listen', lang) : t('phonetics.q_prompt_roman', lang, { r: target.quizRomanization ?? target.romanization }),
    isListen,
    target,
    correctAnswer,
    options: shuffle([correctAnswer, ...wrongs]),
  };
}

// 音节拼读：从 stage 1-4（元音/基本辅音/紧音）抽，不含收音。
const SYLLABLE_STAGE_IDS = [1, 2, 3, 4];
function buildPracticeSyllable(): SyllableQuestion {
  const stageId = SYLLABLE_STAGE_IDS[Math.floor(Math.random() * SYLLABLE_STAGE_IDS.length)];
  const stage = PROGRESSIVE_STAGES.find((s) => s.id === stageId) ?? PROGRESSIVE_STAGES[0];
  return buildSyllableQuestion(stageId, stage.letters);
}

function PracticeScreen() {
  const { user } = useAuth();
  const { lang } = useLang();
  const [mode, setMode] = useState<PracticeMode>('mixed');
  const startTimeRef = useRef<number>(Date.now());
  const [q, setQ] = useState<Question | null>(null);
  const [sylQ, setSylQ] = useState<SyllableQuestion | null>(null);
  const [idx, setIdx] = useState(1);
  const total = 10;
  const [picked, setPicked] = useState<string | null>(null);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [lives, setLives] = useState(4);
  const [elapsed, setElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [counts, setCounts] = useState<{ mistakes: number; due: number }>({ mistakes: 0, due: 0 });

  const refreshCounts = useCallback(() => {
    getPracticeCounts(user?.id).then(setCounts).catch(() => { /* ignore */ });
  }, [user?.id]);

  useEffect(() => {
    let alive = true;
    getPracticeCounts(user?.id).then((c) => { if (alive) setCounts(c); }).catch(() => { /* ignore */ });
    const onVis = () => { if (document.visibilityState === 'visible') refreshCounts(); };
    document.addEventListener('visibilitychange', onVis);
    return () => { alive = false; document.removeEventListener('visibilitychange', onVis); };
  }, [refreshCounts]);

  // 字母池：只用 vowel + consonant，不含收音。
  const pool = useMemo(() => [...vowels, ...consonants], []);

  useEffect(() => {
    if (mode === 'syllable') {
      setSylQ(buildPracticeSyllable());
      setQ(null);
    } else {
      setQ(buildQuestion(pool, mode, lang));
      setSylQ(null);
    }
    setIdx(1);
    setPicked(null);
    setRight(0);
    setWrong(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(4);
    startTimeRef.current = Date.now();
    setElapsed(0);
  }, [mode, pool]);

  useEffect(() => {
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  // 自动播放音频题
  useEffect(() => {
    if (q?.isListen) {
      unlockAudioContext();
      playPhoneticAudio(getSpeakText(q.target));
    }
  }, [q]);

  // 音节拼读自动播
  useEffect(() => {
    if (!sylQ) return;
    const t = setTimeout(() => {
      unlockAudioContext();
      playPhoneticAudio(sylQ.syllable);
    }, 200);
    return () => clearTimeout(t);
  }, [sylQ]);

  const isSyllableMode = mode === 'syllable';
  if (!isSyllableMode && !q) return null;
  if (isSyllableMode && !sylQ) return null;
  const answered = picked !== null;
  const currentCorrect = isSyllableMode ? (sylQ?.correctRoman ?? '') : (q?.correctAnswer ?? '');
  const isRight = answered && picked === currentCorrect;
  // 结算条件：失血或答完所有题，且当前不是"刚答错正在看反馈"的状态
  const gameOver = (lives <= 0 || idx > total) && !answered;

  const restart = () => {
    if (isSyllableMode) {
      setSylQ(buildPracticeSyllable());
      setQ(null);
    } else {
      setQ(buildQuestion(pool, mode, lang));
      setSylQ(null);
    }
    setIdx(1);
    setPicked(null);
    setRight(0);
    setWrong(0);
    setCombo(0);
    setMaxCombo(0);
    setLives(4);
    startTimeRef.current = Date.now();
    setElapsed(0);
    refreshCounts();
  };

  const onPick = (opt: string) => {
    if (answered || gameOver) return;
    setPicked(opt);
    const correct = opt === currentCorrect;
    if (correct) {
      playSuccess();
      setRight((v) => v + 1);
      setCombo((c) => { const n = c + 1; setMaxCombo((m) => Math.max(m, n)); return n; });
    } else {
      playError();
      setWrong((v) => v + 1);
      setCombo(0);
      setLives((l) => Math.max(0, l - 1));
      // 写入错题本：字母模式直接用 jamo；音节模式从选项反查 jamo
      // stage 用 type 推断（vowel→1, 辅音→3），无法推断则记 1
      if (isSyllableMode && sylQ) {
        const wrongOpt = sylQ.options.find((o) => o.roman === opt);
        if (wrongOpt) {
          // syllable 题的 targetJamo 由 buildSyllableQuestion 给出，对应实际考查的 jamo
          const stageGuess = sylQ.targetJamo === sylQ.cho ? 3 : 1;
          recordPhoneticMistake(sylQ.targetJamo, wrongOpt.jamo, stageGuess, user?.id).catch(() => { /* ignore */ });
        }
      } else if (q) {
        const stageGuess = q.target.type === 'vowel' ? 1 : 3;
        recordPhoneticMistake(q.correctAnswer, opt, stageGuess, user?.id).catch(() => { /* ignore */ });
      }
    }
  };

  const onNext = () => {
    // 血光或已是最后一题 → 进入结算
    if (lives <= 0 || idx >= total) {
      setIdx(total + 1); // 推到 total+1 触发 gameOver
      setPicked(null);
      return;
    }
    if (isSyllableMode) setSylQ(buildPracticeSyllable());
    else setQ(buildQuestion(pool, mode, lang));
    setIdx((i) => i + 1);
    setPicked(null);
  };

  const replay = () => {
    unlockAudioContext();
    setIsPlaying(true);
    if (isSyllableMode && sylQ) {
      playPhoneticAudio(sylQ.syllable);
    } else if (q) {
      playPhoneticAudio(getSpeakText(q.target));
    }
    setTimeout(() => setIsPlaying(false), 1500);
  };

  const accuracy = right + wrong > 0 ? Math.round((right / (right + wrong)) * 100) : 0;

  return (
    <div className="hr-screen active">
      <div className="hr-practice-layout">
        <div className="hr-practice-main">
          <div className="hr-practice-modes hr-modes-4" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 10,
            marginBottom: 32,
            maxWidth: '100%',
            overflow: 'hidden',
          }}>
            <ModeCard emoji="🎯" name={t('phonetics.mode_mixed_name', lang)} desc={t('phonetics.mode_mixed_desc', lang)} active={mode === 'mixed'} onClick={() => setMode('mixed')} />
            <ModeCard emoji="🔤" name={t('phonetics.mode_vocab_name', lang)} desc={t('phonetics.mode_vocab_desc', lang)} active={mode === 'vocab'} onClick={() => setMode('vocab')} />
            <ModeCard emoji="👂" name={t('phonetics.mode_listen_name', lang)} desc={t('phonetics.mode_listen_desc', lang)} active={mode === 'listen'} onClick={() => setMode('listen')} />
            <ModeCard emoji="🧩" name={t('phonetics.mode_syllable_name', lang)} desc={t('phonetics.mode_syllable_desc', lang)} active={mode === 'syllable'} onClick={() => setMode('syllable')} />
          </div>

          <div className="hr-quiz-card">
            {gameOver ? (
              <div style={{ textAlign: 'center', padding: '8px 4px' }}>
                <div style={{ fontSize: 64, marginBottom: 8 }}>{lives <= 0 ? '💪' : accuracy >= 80 ? '🏆' : '🎯'}</div>
                <div style={{ fontFamily: 'var(--hr-serif)', fontWeight: 700, fontSize: 28, color: 'var(--hr-ink-1)', marginBottom: 6 }}>
                  {lives <= 0 ? t('phonetics.review_retry_once', lang) : t('phonetics.review_round_done', lang)}
                </div>
                <div style={{ fontFamily: 'var(--hr-mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--hr-ink-3)', marginBottom: 24 }}>
                  {lives <= 0 ? t('phonetics.review_out_of_lives', lang) : t('phonetics.review_score_summary', lang, { right, total: right + wrong, accuracy })}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 10, maxWidth: '100%', margin: '0 auto 24px' }}>
                  {[
                    { k: t('phonetics.review_stat_correct', lang), v: right, c: 'var(--hr-mint-strong)' },
                    { k: t('phonetics.review_stat_wrong', lang), v: wrong, c: 'var(--hr-pink-strong)' },
                    { k: t('phonetics.review_stat_accuracy', lang), v: `${accuracy}%`, c: 'var(--hr-ink-1)' },
                    { k: t('phonetics.review_stat_best_combo', lang), v: `×${maxCombo}`, c: 'var(--hr-pink-strong)' },
                    { k: t('phonetics.review_stat_time', lang), v: `${elapsed}s`, c: 'var(--hr-ink-1)' },
                  ].map((s) => (
                    <div key={s.k} style={{ padding: '12px 6px', background: 'var(--hr-surface-1)', border: '1px solid var(--hr-border-1)', borderRadius: 10 }}>
                      <div style={{ fontFamily: 'var(--hr-serif)', fontWeight: 700, fontSize: 22, color: s.c, lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontFamily: 'var(--hr-mono)', fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--hr-ink-3)', marginTop: 4 }}>{s.k}</div>
                    </div>
                  ))}
                </div>

                <button className="hr-btn hr-btn-primary" onClick={restart}>{t('phonetics.review_restart_round', lang)}</button>
              </div>
            ) : (
            <>
            <div className="hr-quiz-top">
              <div className="hr-quiz-progress">
                <span className="hr-qp-num">{String(idx).padStart(2, '0')}</span>
                <span style={{ color: 'var(--hr-ink-3)', fontSize: 14 }}>/ {total}</span>
                <div className="hr-qp-bar"><div className="hr-fill" style={{ width: `${(idx / total) * 100}%` }} /></div>
              </div>
              <div className="hr-quiz-lives">
                {[1, 2, 3, 4].map((i) => <span key={i} className={`hr-quiz-life${i > lives ? ' lost' : ''}`}>❤️</span>)}
              </div>
            </div>

            {isSyllableMode && sylQ ? (
              <SyllablePracticeQuestion
                q={sylQ}
                picked={picked}
                answered={answered}
                isRight={isRight}
                onPick={onPick}
                onPlay={replay}
                onNext={onNext}
              />
            ) : q ? (
              <>
                <div className="hr-quiz-question">{q.prompt}</div>

                {q.isListen && (
                  <div className="hr-quiz-audio">
                    <button className={`hr-quiz-audio-btn${isPlaying ? ' playing' : ''}`} onClick={replay}>▶</button>
                    <button className="hr-quiz-audio-replay" onClick={replay}>{t('phonetics.quiz_relisten_button', lang)}</button>
                  </div>
                )}
                {!q.isListen && (
                  <div style={{ textAlign: 'center', marginBottom: 20 }}>
                    <span style={{ display: 'inline-block', padding: '14px 26px', background: 'var(--hr-surface-3)', borderRadius: 12, fontFamily: 'var(--hr-mono)', fontSize: 20, fontWeight: 700, color: 'var(--hr-pink-strong)' }}>
                      [{q.target.quizRomanization ?? q.target.romanization}]
                    </span>
                  </div>
                )}

                <div className="hr-quiz-options">
                  {q.options.map((opt, i) => {
                    let cls = 'hr-quiz-opt';
                    // 答对：正确选项变绿；答错：仅用户点的变红抖动，不暴露答案
                    if (answered) {
                      if (isRight && opt === q.correctAnswer) cls += ' correct';
                      else if (!isRight && opt === picked) cls += ' wrong';
                    }
                    return (
                      <button key={i} className={cls} onClick={() => onPick(opt)} disabled={answered}>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {answered && isRight && (
                  <div className="hr-practice-feedback" style={{ marginTop: 20 }}>
                    <div className="hr-pf-title">{t('phonetics.feedback_correct_title', lang)}</div>
                    <div className="hr-pf-body">
                      <b>{q.correctAnswer}</b>{' '}
                      <span style={{ color: 'var(--hr-pink-strong)' }}>[{q.target.quizRomanization ?? q.target.romanization}]</span>
                      {' — '}{lang === 'en' ? q.target.soundEn ?? q.target.sound : q.target.sound}
                    </div>
                    <button
                      className="hr-btn hr-btn-primary"
                      style={{ marginTop: 12 }}
                      onClick={onNext}
                    >{t('phonetics.quiz_next_arrow', lang)}</button>
                  </div>
                )}
                {answered && !isRight && (
                  <div className="hr-practice-feedback hr-wrong" style={{ marginTop: 20 }}>
                    <div className="hr-pf-title">{t('phonetics.feedback_wrong_title', lang)}</div>
                    <button
                      className="hr-btn hr-btn-primary"
                      style={{ marginTop: 12 }}
                      onClick={onNext}
                    >{t('phonetics.quiz_next_arrow', lang)}</button>
                  </div>
                )}
              </>
            ) : null}
            </>
            )}
          </div>
        </div>

        <div className="hr-practice-sidebar">
          <Link href="/phonetics/step/practice?mode=srs" className="hr-daily-card" style={{ textDecoration: 'none', cursor: 'pointer', color: 'inherit', display: 'block' }}>
            <div className="hr-dc-badge">{t('phonetics.sidebar_today_review', lang)}</div>
            <h4>{counts.due > 0 ? t('phonetics.sidebar_due_count', lang, { n: counts.due }) : t('phonetics.sidebar_no_due', lang)}</h4>
            <p>{t('phonetics.sidebar_srs_hint', lang)}</p>
            <div className="hr-dc-streak">{counts.due > 0 ? t('phonetics.sidebar_go_review', lang) : t('phonetics.sidebar_keep_learning', lang)}</div>
          </Link>

          <div className="hr-combo-display">
            <div className="hr-cd-label">{t('phonetics.combo_label', lang)}</div>
            <div className="hr-cd-value">×{combo}</div>
            <div className="hr-cd-text">{combo >= 2 ? t('phonetics.combo_streak', lang, { n: combo }) : t('phonetics.combo_hint', lang)}</div>
          </div>

          <div className="hr-practice-stat">
            <div className="hr-ps-label">{t('phonetics.stat_this_session', lang)}</div>
            <div className="hr-ps-row"><span className="hr-ps-key">{t('phonetics.stat_answered', lang)}</span><span className="hr-ps-val">{right + wrong}</span></div>
            <div className="hr-ps-row"><span className="hr-ps-key">{t('phonetics.review_stat_correct', lang)}</span><span className="hr-ps-val hr-mint">{right}</span></div>
            <div className="hr-ps-row"><span className="hr-ps-key">{t('phonetics.review_stat_wrong', lang)}</span><span className="hr-ps-val hr-pink">{wrong}</span></div>
            <div className="hr-ps-row"><span className="hr-ps-key">{t('phonetics.review_stat_accuracy', lang)}</span><span className="hr-ps-val">{accuracy}%</span></div>
            <div className="hr-ps-row"><span className="hr-ps-key">{t('phonetics.review_stat_best_combo', lang)}</span><span className="hr-ps-val">×{maxCombo}</span></div>
            <div className="hr-ps-row"><span className="hr-ps-key">{t('phonetics.review_stat_time', lang)}</span><span className="hr-ps-val">{elapsed}s</span></div>
          </div>

          <Link href="/phonetics/step/practice?mode=mistakes" className="hr-practice-stat" style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
            <div className="hr-ps-label">{t('phonetics.mistakes_book', lang)}</div>
            {counts.mistakes > 0 ? (
              <>
                <div className="hr-ps-row"><span className="hr-ps-key">{t('phonetics.mistakes_unmastered', lang)}</span><span className="hr-ps-val hr-pink">{counts.mistakes}</span></div>
                <div className="hr-ps-row"><span className="hr-ps-key" style={{ color: 'var(--hr-pink-strong)' }}>{t('phonetics.mistakes_click_enter', lang)}</span></div>
              </>
            ) : (
              <div className="hr-ps-row"><span className="hr-ps-key" style={{ fontStyle: 'italic', color: 'var(--hr-ink-3)' }}>{t('phonetics.mistakes_none', lang)}</span></div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

function SyllablePracticeQuestion({
  q, picked, answered, isRight, onPick, onPlay, onNext,
}: {
  q: SyllableQuestion;
  picked: string | null;
  answered: boolean;
  isRight: boolean;
  onPick: (opt: string) => void;
  onPlay: () => void;
  onNext: () => void;
}) {
  const { lang } = useLang();
  const playSlot = (slot: 'cho' | 'jung', jamo: string) => {
    unlockAudioContext();
    playPhoneticAudio(slotPlaySyllable(slot, jamo));
  };
  return (
    <>
      <div className="hr-quiz-question">{t('phonetics.syl_question', lang)}</div>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 12, flexWrap: 'wrap', margin: '0 0 20px' }}>
        <div style={spPiece}>
          <div style={spBlock('rgba(255,127,168,.5)', 'rgba(255,127,168,.08)')}>{q.cho}</div>
          <span style={spLabel}>{t('phonetics.tab_consonant', lang)} · {q.choRoman || '∅'}</span>
          <button type="button" style={spMiniPlay} aria-label={t('phonetics.aria_play_consonant_x', lang, { w: q.cho })} onClick={() => playSlot('cho', q.cho)}>▶</button>
        </div>
        <span style={spOp}>＋</span>
        <div style={spPiece}>
          <div style={spBlock('rgba(174,227,216,.6)', 'rgba(174,227,216,.18)')}>{q.jung}</div>
          <span style={spLabel}>{t('phonetics.tab_vowel', lang)} · {q.jungRoman}</span>
          <button type="button" style={spMiniPlay} aria-label={t('phonetics.aria_play_vowel_x', lang, { w: q.jung })} onClick={() => playSlot('jung', q.jung)}>▶</button>
        </div>
        <span style={spOp}>＝</span>
        <div style={spPiece}>
          <button type="button" onClick={onPlay} aria-label={t('phonetics.aria_play', lang, { w: q.syllable })} style={spResult}>{q.syllable}</button>
          <span style={spLabel}>{t('phonetics.syl_composed', lang)} · {answered ? q.correctRoman : '?'}</span>
          <button type="button" style={spMiniPlayResult} aria-label={t('phonetics.aria_play_composed_x', lang, { w: q.syllable })} onClick={onPlay}>▶</button>
        </div>
      </div>

      <div className="hr-quiz-options">
        {q.options.map((opt) => {
          let cls = 'hr-quiz-opt';
          // 答对：正确选项变绿；答错：用户选的变红 + 同时高亮正确答案便于学习
          if (answered) {
            if (opt.roman === q.correctRoman) cls += ' correct';
            else if (!isRight && opt.roman === picked) cls += ' wrong';
          }
          return (
            <button
              key={`${opt.roman}-${opt.jamo}`}
              className={cls}
              onClick={() => onPick(opt.roman)}
              disabled={answered}
              style={{ fontFamily: 'var(--hr-mono)', fontSize: 20 }}
            >
              {opt.roman}
            </button>
          );
        })}
      </div>

      {answered && isRight && (
        <div className="hr-practice-feedback" style={{ marginTop: 20 }}>
          <div className="hr-pf-title">{t('phonetics.feedback_correct_title', lang)}</div>
          <div className="hr-pf-body">
            🔍 <b>{q.syllable}</b> = <b>{q.cho}</b>({q.choRoman || '∅'}) + <b>{q.jung}</b>({q.jungRoman})
            {' = '}<b style={{ color: 'var(--hr-pink-strong)' }}>{q.correctRoman}</b>
          </div>
          <button className="hr-btn hr-btn-primary" style={{ marginTop: 12 }} onClick={onNext}>{t('phonetics.quiz_next_arrow', lang)}</button>
        </div>
      )}
      {answered && !isRight && (
        <div className="hr-practice-feedback hr-wrong" style={{ marginTop: 20 }}>
          <div className="hr-pf-title">{t('phonetics.feedback_wrong_title', lang)}</div>
          <button className="hr-btn hr-btn-primary" style={{ marginTop: 12 }} onClick={onNext}>{t('phonetics.quiz_next_arrow', lang)}</button>
        </div>
      )}
    </>
  );
}

const spPiece: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0,
};
const spBlock = (border: string, bg: string): React.CSSProperties => ({
  width: 76, height: 76, borderRadius: 14, display: 'grid', placeItems: 'center',
  background: bg, border: `2px solid ${border}`,
  fontWeight: 800, fontSize: 36, color: 'var(--hr-ink-1)',
  fontFamily: '"Noto Sans KR", sans-serif', lineHeight: 1,
});
const spLabel: React.CSSProperties = {
  fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-ink-3)', whiteSpace: 'nowrap',
};
const spMiniPlay: React.CSSProperties = {
  minWidth: 44, minHeight: 44, width: 44, height: 44, borderRadius: '50%', border: 'none',
  background: 'var(--hr-surface-2)', color: 'var(--hr-pink-strong)',
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 12, boxShadow: '0 2px 5px rgba(58,46,41,.08)',
};
const spMiniPlayResult: React.CSSProperties = {
  ...spMiniPlay,
  background: 'linear-gradient(135deg, var(--hr-mint-strong), var(--hr-mint-base))',
  color: '#fff',
};
const spOp: React.CSSProperties = {
  fontSize: 22, color: 'var(--hr-ink-3)', fontWeight: 300,
  alignSelf: 'center', marginTop: 30,
};
const spResult: React.CSSProperties = {
  width: 92, height: 92, borderRadius: 16, display: 'grid', placeItems: 'center',
  fontWeight: 800, fontSize: 44, color: '#fff',
  background: 'linear-gradient(135deg, var(--hr-mint-strong), var(--hr-mint-base))',
  border: 'none', cursor: 'pointer',
  boxShadow: '0 6px 18px rgba(126,201,184,.45)',
  fontFamily: '"Noto Sans KR", sans-serif', lineHeight: 1,
};

function ModeCard({ emoji, name, desc, active, onClick }: { emoji: string; name: string; desc: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className={`hr-mode-card${active ? ' active' : ''}`}
      onClick={onClick}
      aria-pressed={active}
      style={{
        minWidth: 0,
        overflow: 'hidden',
        wordBreak: 'break-all',
        overflowWrap: 'anywhere',
      }}
    >
      <span className="hr-mc-emoji">{emoji}</span>
      <div className="hr-mc-name">{name}</div>
      <div className="hr-mc-desc">{desc}</div>
    </button>
  );
}
