'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Target, Flame, Save, Loader2, Trophy, Volume2, VolumeX, Zap, Type, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { getProfile, updateProfile } from '@/lib/gamification';
import { db } from '@/lib/db';
import type { UserProfile, Achievement } from '@/types';
import { ACHIEVEMENT_DEFS } from '@/types';
import { useFontSettings } from '@/components/FontProvider';
import { useTheme } from '@/components/ThemeProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { setSpeechRate, getSpeechRate } from '@/lib/tts';
import { isSoundEnabled, setSoundEnabled } from '@/lib/soundManager';
import { FONT_PRESETS, FONT_SIZES } from '@/lib/fontSettings';
import { FLASHCARD_THEMES, getFlashcardTheme, saveFlashcardTheme, applyFlashcardTheme, type FlashcardTheme } from '@/lib/flashcardTheme';

const REDUCE_MOTION_KEY = 'tori_reduce_motion';

function getReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(REDUCE_MOTION_KEY) === 'true';
}

function setReduceMotion(v: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REDUCE_MOTION_KEY, String(v));
  document.documentElement.setAttribute('data-reduce-motion', v ? 'true' : 'false');
}

export default function SettingsPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const { settings: fontSettings, previewPreset, previewSize, commitFontSettings } = useFontSettings();
  const { theme, toggle: toggleTheme } = useTheme();
  const { lang, setLang } = useLang();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [reduceMotion, setReduceMotionState] = useState(false);
  const [fcTheme, setFcTheme] = useState<FlashcardTheme>('pure');

  useEffect(() => {
    setFcTheme(getFlashcardTheme());
  }, []);

  const handleFcTheme = (t: FlashcardTheme) => {
    setFcTheme(t);
    saveFlashcardTheme(t);
    applyFlashcardTheme(t);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const p = await getProfile();
        setProfile({ ...p, ttsSpeed: getSpeechRate() });
        const achs = await db.achievements.toArray();
        setAchievements(achs);
        setSoundOn(isSoundEnabled());
        setReduceMotionState(getReduceMotion());
      } catch {
        // db unavailable — show page without data
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    commitFontSettings();
    await updateProfile({
      nickname: profile.nickname,
      dailyGoalMinutes: profile.dailyGoalMinutes,
      dailyGoalWords: profile.dailyGoalWords,
      targetLevel: profile.targetLevel,
      reviewBatchSize: profile.reviewBatchSize,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-4 max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">设置</h1>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 text-center space-y-4">
          <p className="text-[var(--text-secondary)]">请先登录后使用设置</p>
          <button
            onClick={() => { window.location.href = '/auth/login'; }}
            className="px-6 py-2 rounded-full bg-[#201815] text-white text-sm font-bold"
          >
            去登录
          </button>
        </div>
      </div>
    );
  }

  const earnedAchievements = achievements.filter((a) => ACHIEVEMENT_DEFS[a.type]);
  const allTypes = Object.keys(ACHIEVEMENT_DEFS) as (keyof typeof ACHIEVEMENT_DEFS)[];
  const earnedTypes = new Set(achievements.map((a) => a.type));

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t('settings.title', lang)}</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">{lang === 'en' ? 'Personalize your learning experience' : '个性化你的学习体验'}</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <User size={20} className="text-[var(--pink-primary)]" />
          <h2 className="text-lg font-medium text-[var(--text-primary)]">{t('settings.profile', lang)}</h2>
        </div>

        {/* Nickname */}
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1.5 block">{t('settings.nickname', lang)}</label>
          <input
            type="text"
            value={profile.nickname}
            onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
            placeholder={t('settings.nickname_placeholder', lang)}
            className="w-full bg-[var(--bg-input)] border border-[var(--pink-pale)] rounded-xl py-3 px-4 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
          />
        </div>

        {/* Level display */}
        <div className="flex items-center gap-4 bg-[var(--bg-input)] rounded-xl p-4">
          <div className="w-12 h-12 rounded-full bg-[var(--pink-primary)]/15 flex items-center justify-center">
            <span className="text-[var(--pink-primary)] font-bold text-lg">{profile.level}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-[var(--text-primary)] font-medium">{lang === 'en' ? `Level ${profile.level}` : `等级 ${profile.level}`}</span>
              <span className="text-xs text-[var(--text-secondary)]">{profile.xp}/{profile.xpToNextLevel} XP</span>
            </div>
            <div className="w-full bg-[var(--bg-accent)] rounded-full h-2">
              <div
                className="bg-[var(--pink-primary)] h-2 rounded-full transition-all"
                style={{ width: `${(profile.xp / profile.xpToNextLevel) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-3 bg-[var(--bg-input)] rounded-xl p-4">
          <Flame size={20} className="text-[var(--peach-soft)]" />
          <div>
            <div className="text-sm text-[var(--text-primary)] font-medium">{lang === 'en' ? `${profile.streak}-day streak` : `连续学习 ${profile.streak} 天`}</div>
            <div className="text-xs text-[var(--text-secondary)]">{lang === 'en' ? `Best: ${profile.longestStreak} days` : `最长记录: ${profile.longestStreak} 天`}</div>
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Target size={20} className="text-[var(--mint-soft)]" />
          <h2 className="text-lg font-medium text-[var(--text-primary)]">{t('settings.learning_goal', lang)}</h2>
        </div>

        {/* Target Level */}
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1.5 block">{t('settings.level', lang)}</label>
          <select
            value={profile.targetLevel}
            onChange={(e) => setProfile({ ...profile, targetLevel: e.target.value as UserProfile['targetLevel'] })}
            className="w-full bg-[var(--bg-input)] border border-[var(--pink-pale)] rounded-xl py-3 px-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
          >
            <option value="beginner">{lang === 'en' ? 'Beginner (TOPIK 1-2)' : '初级 (TOPIK 1-2)'}</option>
            <option value="intermediate">{lang === 'en' ? 'Intermediate (TOPIK 3-4)' : '中级 (TOPIK 3-4)'}</option>
            <option value="advanced">{lang === 'en' ? 'Advanced (TOPIK 5-6)' : '高级 (TOPIK 5-6)'}</option>
          </select>
        </div>

        {/* Daily Goal Words */}
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1.5 block">{lang === 'en' ? `Daily word goal: ${profile.dailyGoalWords} words` : `每日学习单词: ${profile.dailyGoalWords} 个`}</label>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={profile.dailyGoalWords}
            onChange={(e) => setProfile({ ...profile, dailyGoalWords: Number(e.target.value) })}
            className="w-full accent-[var(--pink-primary)]"
          />
          <div className="flex justify-between text-xs text-[var(--text-placeholder)] mt-1">
            <span>5</span><span>50</span>
          </div>
        </div>

        {/* Daily Goal Minutes */}
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1.5 block">{lang === 'en' ? `Daily study time: ${profile.dailyGoalMinutes} min` : `每日学习时间: ${profile.dailyGoalMinutes} 分钟`}</label>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={profile.dailyGoalMinutes}
            onChange={(e) => setProfile({ ...profile, dailyGoalMinutes: Number(e.target.value) })}
            className="w-full accent-[var(--pink-primary)]"
          />
          <div className="flex justify-between text-xs text-[var(--text-placeholder)] mt-1">
            <span>{lang === 'en' ? '5 min' : '5分钟'}</span><span>{lang === 'en' ? '2 hrs' : '2小时'}</span>
          </div>
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Flame size={20} className="text-[var(--purple-soft)]" />
          <h2 className="text-lg font-medium text-[var(--text-primary)]">{t('settings.preferences', lang)}</h2>
        </div>

        {/* Language */}
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1.5 block">{t('settings.language', lang)} / Language</label>
          <div className="flex gap-2">
            {(['zh', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                  lang === l
                    ? 'bg-[var(--pink-primary)] text-white border-[var(--pink-primary)]'
                    : 'bg-[var(--bg-input)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--pink-primary)]/40'
                }`}
              >
                {l === 'zh' ? '中文' : 'English'}
              </button>
            ))}
          </div>
        </div>

        {/* TTS Speed */}
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1.5 block">{t('settings.tts_speed', lang)}: {profile.ttsSpeed ?? 0.8}x</label>
          <input
            type="range"
            min="0.5"
            max="1.2"
            step="0.1"
            value={profile.ttsSpeed ?? 0.8}
            onChange={(e) => { const v = parseFloat(e.target.value); setSpeechRate(v); setProfile({ ...profile, ttsSpeed: v }); }}
            className="w-full accent-[var(--purple-soft)]"
          />
          <div className="flex justify-between text-xs text-[var(--text-placeholder)] mt-1">
            <span>{lang === 'en' ? '0.5x slow' : '0.5x 慢'}</span><span>{lang === 'en' ? '1.2x fast' : '1.2x 快'}</span>
          </div>
        </div>

        {/* Review batch size */}
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-1.5 block">{t('settings.review_batch', lang)}: {profile.reviewBatchSize ?? 10}{lang === 'en' ? '' : ' 个'}</label>
          <select
            value={profile.reviewBatchSize ?? 10}
            onChange={(e) => setProfile({ ...profile, reviewBatchSize: Number(e.target.value) })}
            className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-3 px-4 text-[var(--text-primary)] focus:outline-none focus:border-[var(--purple-soft)] transition-colors"
          >
            <option value={5}>{lang === 'en' ? '5 words' : '5 个'}</option>
            <option value={10}>{lang === 'en' ? '10 words' : '10 个'}</option>
            <option value={15}>{lang === 'en' ? '15 words' : '15 个'}</option>
            <option value={20}>{lang === 'en' ? '20 words' : '20 个'}</option>
            <option value={30}>{lang === 'en' ? '30 words' : '30 个'}</option>
          </select>
        </div>

        {/* Sound toggle */}
        <div className="flex items-center justify-between bg-[var(--bg-input)] rounded-xl p-4">
          <div className="flex items-center gap-3">
            {soundOn ? <Volume2 size={20} className="text-[var(--purple-soft)]" /> : <VolumeX size={20} className="text-[var(--text-muted)]" />}
            <div>
              <p className="text-sm text-[var(--text-primary)] font-medium">{t('settings.sound_effects', lang)}</p>
              <p className="text-xs text-[var(--text-secondary)]">{lang === 'en' ? 'Lightweight feedback sounds (very quiet)' : '轻量操作反馈音效（音量很低）'}</p>
            </div>
          </div>
          <button
            onClick={() => { const v = !soundOn; setSoundOn(v); setSoundEnabled(v); }}
            className={`relative w-12 h-7 rounded-full transition-colors ${soundOn ? 'bg-[var(--purple-soft)]' : 'bg-[var(--bg-accent)]'}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${soundOn ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>

        {/* Reduce motion toggle */}
        <div className="flex items-center justify-between bg-[var(--bg-input)] rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Zap size={20} className={reduceMotion ? 'text-[var(--text-muted)]' : 'text-[var(--peach-soft)]'} />
            <div>
              <p className="text-sm text-[var(--text-primary)] font-medium">{t('settings.reduce_motion', lang)}</p>
              <p className="text-xs text-[var(--text-secondary)]">{lang === 'en' ? 'Disable bounce and breathing animations' : '关闭弹跳、呼吸等动画效果'}</p>
            </div>
          </div>
          <button
            onClick={() => { const v = !reduceMotion; setReduceMotionState(v); setReduceMotion(v); }}
            className={`relative w-12 h-7 rounded-full transition-colors ${reduceMotion ? 'bg-[var(--bg-accent)]' : 'bg-[var(--peach-soft)]'}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${reduceMotion ? 'translate-x-0.5' : 'translate-x-6'}`} />
          </button>
        </div>

        {/* Theme toggle */}
        <div className="flex items-center justify-between bg-[var(--bg-input)] rounded-xl p-4">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <Moon size={20} className="text-[var(--text-secondary)]" /> : <Sun size={20} className="text-[var(--peach-soft)]" />}
            <div>
              <p className="text-sm text-[var(--text-primary)] font-medium">{t('settings.dark_mode', lang)}</p>
              <p className="text-xs text-[var(--text-secondary)]">{theme === 'dark' ? (lang === 'en' ? 'Current: Dark' : '当前：深色') : (lang === 'en' ? 'Current: Light' : '当前：亮色')}</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-7 rounded-full transition-colors ${theme === 'dark' ? 'bg-[var(--bg-accent)]' : 'bg-[var(--peach-soft)]'}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>

      {/* Font Settings */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-4">
          <Type size={28} className="text-[var(--text-primary)]" />
          <h2 className="text-lg font-medium text-[var(--text-primary)]">{t('settings.display', lang)}</h2>
        </div>

        {/* Font preset */}
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-2 block">{t('settings.font_style', lang)}</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {FONT_PRESETS.map((p) => (
              <button
                key={p.key}
                onClick={() => previewPreset(p.key)}
                className={`rounded-xl p-3 text-center border transition-all ${
                  fontSettings.preset === p.key
                    ? 'border-[var(--pink-primary)] bg-[var(--pink-primary)]/8 shadow-sm'
                    : 'border-[var(--border-color)] hover:border-[var(--border-hover)]'
                }`}
              >
                <p className={`text-xs font-semibold mb-1 ${
                  fontSettings.preset === p.key ? 'text-[var(--pink-primary)]' : 'text-[var(--text-primary)]'
                }`}>
                  {p.label}
                </p>
                <p className="text-[10px] text-[var(--text-muted)] leading-tight">{p.desc}</p>
                <p
                  className="mt-1.5 text-[9px] text-[var(--text-muted)] truncate"
                  style={{ fontFamily: p.key === 'cute' ? "'KaiTi','STKaiti','Malgun Gothic',sans-serif" : p.key === 'clean' ? "system-ui,'Segoe UI','PingFang SC',sans-serif" : "Georgia,'KaiTi','STKaiti',serif" }}
                >
                  {p.preview}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Font size */}
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-2 block">{t('settings.font_size', lang)}</label>
          <div className="flex gap-2">
            {FONT_SIZES.map((s) => (
              <button
                key={s.key}
                onClick={() => previewSize(s.key)}
                className={`flex-1 rounded-xl py-2.5 text-center border transition-all ${
                  fontSettings.size === s.key
                    ? 'border-[var(--pink-primary)] bg-[var(--pink-primary)]/8 shadow-sm'
                    : 'border-[var(--border-color)] hover:border-[var(--border-hover)]'
                }`}
              >
                <span className={`text-xs ${
                  fontSettings.size === s.key ? 'text-[var(--pink-primary)] font-semibold' : 'text-[var(--text-primary)]'
                }`}>
                  {s.label}
                </span>
                <span className={`block ${
                  fontSettings.size === s.key ? 'text-[var(--pink-primary)]' : 'text-[var(--text-muted)]'
                }`} style={{ fontSize: `${s.px}px` }}>
                  Aa
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Live preview */}
        <div className="bg-[var(--bg-base)] border border-[var(--border-color)] rounded-xl p-4 space-y-2">
          <p className="text-[13px] text-[var(--text-muted)] mb-1">{lang === 'en' ? 'Preview' : '预览效果'}</p>
          <p className="text-lg font-semibold text-[var(--text-primary)]">
            안녕하세요! 좋은 아침이에요.
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            你好！这是一段中文预览文本，用于展示当前字体和字号的实际效果。
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            The quick brown fox jumps over the lazy dog. 12345
          </p>
        </div>

        {/* Flashcard theme */}
        <div>
          <label className="text-xs text-[var(--text-secondary)] mb-2 block">{t('settings.flashcard_color', lang)}</label>
          <div className="grid grid-cols-2 gap-2">
            {FLASHCARD_THEMES.map((t) => (
              <button
                key={t.key}
                onClick={() => handleFcTheme(t.key)}
                className={`rounded-xl p-3 text-left border transition-all ${
                  fcTheme === t.key
                    ? 'border-[var(--pink-primary)] bg-[var(--pink-primary)]/8 shadow-sm'
                    : 'border-[var(--border-color)] hover:border-[var(--border-hover)]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  {t.swatches.map((c, i) => (
                    <span key={i} className="w-4 h-4 rounded-full border border-black/5 inline-block flex-shrink-0" style={{ background: c }} />
                  ))}
                </div>
                <p className={`text-xs font-semibold ${fcTheme === t.key ? 'text-[var(--pink-primary)]' : 'text-[var(--text-primary)]'}`}>
                  {t.label}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <Trophy size={20} className="text-[var(--peach-soft)]" />
          <h2 className="text-lg font-medium text-[var(--text-primary)]">
            {t('settings.achievements', lang)} ({earnedAchievements.length}/{allTypes.length})
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {allTypes.map((type) => {
            const def = ACHIEVEMENT_DEFS[type];
            const earned = earnedTypes.has(type);
            return (
              <div
                key={type}
                className={`rounded-xl p-3 text-center transition-all ${
                  earned
                    ? 'bg-[var(--yellow-soft)]/20 border border-[var(--yellow-soft)]/30'
                    : 'bg-[var(--bg-input)] border border-[var(--pink-pale)]/50 opacity-40'
                }`}
              >
                <div className="text-2xl mb-1">{def.icon}</div>
                <div className="text-xs text-[var(--text-primary)] font-medium">{def.title}</div>
                <div className="text-[13px] text-[var(--text-secondary)] mt-0.5">{def.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[var(--text-primary)] font-medium transition-all ${
          saved
            ? 'bg-[var(--pink-primary)]'
            : 'bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] active:scale-[0.98]'
        }`}
      >
        {saving ? <Loader2 size={18} className="animate-spin" /> : saved ? <><Save size={18} /> {t('settings.save_success', lang)}</> : <><Save size={18} /> {t('settings.save', lang)}</>}
      </button>

      {/* Logout */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{lang === 'en' ? 'Current account' : '当前账号'}</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{authLoading ? t('common.loading', lang) : (user?.nickname ?? (lang === 'en' ? 'Not logged in' : '未登录'))}</p>
          </div>
          <button
            onClick={async () => {
              await logout();
              window.location.href = '/auth/login';
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-500 text-sm hover:bg-red-50 transition-colors"
          >
            <LogOut size={15} />
            {t('settings.logout', lang)}
          </button>
        </div>
      </div>
    </div>
  );
}
