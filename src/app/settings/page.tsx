'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, User, Target, Sliders, Save, Loader2, Trophy, Volume2, VolumeX, Zap, Type, LogOut, Moon, Sun, Flame } from 'lucide-react';
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
import { PageHeader, Section, Card, Button } from '@/components/ui';

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

const inputStyle: CSSProperties = {
  width: '100%',
  background: 'var(--color-surface-1)',
  border: '1px solid var(--color-border-2)',
  borderRadius: 'var(--radius-md)',
  padding: '10px 14px',
  fontSize: 14,
  color: 'var(--color-ink-1)',
  outline: 'none',
};

const labelStyle: CSSProperties = {
  display: 'block',
  fontSize: 12,
  fontWeight: 600,
  color: 'var(--color-ink-3)',
  marginBottom: 6,
};

function Toggle({ on, onChange, tone = 'pink' }: { on: boolean; onChange: () => void; tone?: 'pink' | 'mint' | 'peach' | 'purple' }) {
  const accent = `var(--color-${tone}-base)`;
  return (
    <button
      onClick={onChange}
      aria-pressed={on}
      style={{
        position: 'relative', width: 48, height: 28,
        borderRadius: 'var(--radius-pill)',
        background: on ? accent : 'var(--color-surface-4)',
        border: 'none', cursor: 'pointer',
        transition: 'background var(--dur-base) var(--ease-soft)',
      }}
    >
      <div
        style={{
          position: 'absolute', top: 2, left: on ? 22 : 2,
          width: 24, height: 24, borderRadius: '50%',
          background: '#fff',
          boxShadow: 'var(--shadow-sm)',
          transition: 'left var(--dur-base) var(--ease-soft)',
        }}
      />
    </button>
  );
}

function ToggleRow({
  Icon, label, desc, on, onChange, tone,
}: {
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  label: string; desc: string; on: boolean; onChange: () => void; tone?: 'pink' | 'mint' | 'peach' | 'purple';
}) {
  const fg = tone ? `var(--color-${tone}-strong)` : 'var(--color-ink-3)';
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        background: 'var(--color-surface-3)',
        borderRadius: 'var(--radius-md)',
        padding: '14px 16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <Icon size={20} color={fg} />
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>{label}</p>
          <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>{desc}</p>
        </div>
      </div>
      <Toggle on={on} onChange={onChange} tone={tone ?? 'pink'} />
    </div>
  );
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
        setProfile({ nickname: '', dailyGoalMinutes: 30, dailyGoalWords: 10, targetLevel: 'beginner', reviewBatchSize: 20, ttsSpeed: getSpeechRate() } as UserProfile);
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '128px 0' }}>
        <Loader2 size={32} className="animate-spin" color="var(--color-ink-3)" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-4 max-w-2xl mx-auto">
        <PageHeader title={t('settings.title', lang)} flat />
        <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--color-ink-2)', margin: '0 0 16px' }}>
            {lang === 'en' ? 'Please log in to access settings' : '请先登录后使用设置'}
          </p>
          <Button variant="primary" tone="black" onClick={() => { window.location.href = '/auth/login'; }}>
            {lang === 'en' ? 'Log in' : '去登录'}
          </Button>
        </Card>
      </div>
    );
  }

  const earnedAchievements = achievements.filter((a) => ACHIEVEMENT_DEFS[a.type]);
  const allTypes = Object.keys(ACHIEVEMENT_DEFS) as (keyof typeof ACHIEVEMENT_DEFS)[];
  const earnedTypes = new Set(achievements.map((a) => a.type));

  return (
    <div className="py-4 max-w-2xl mx-auto">
      <button
        onClick={() => router.back()}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--color-ink-2)', background: 'transparent', border: 'none',
          padding: 0, cursor: 'pointer', marginBottom: 14,
        }}
      >
        <ArrowLeft size={16} />
        返回
      </button>

      <PageHeader
        eyebrow="설정"
        title={t('settings.title', lang)}
        subtitle={lang === 'en' ? 'Personalize your learning experience' : '个性化你的学习体验'}
        flat
      />

      {/* Profile */}
      <Section spacing="normal">
        <Card variant="default" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <User size={18} color="var(--color-pink-strong)" />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
              {t('settings.profile', lang)}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={labelStyle}>{t('settings.nickname', lang)}</label>
              <input
                type="text"
                value={profile.nickname}
                onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
                placeholder={t('settings.nickname_placeholder', lang)}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-md)', padding: 14 }}>
              <div
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'var(--color-pink-soft)', color: 'var(--color-pink-strong)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, fontWeight: 800, flexShrink: 0,
                }}
              >
                {profile.level}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-ink-1)' }}>
                    {lang === 'en' ? `Level ${profile.level}` : `等级 ${profile.level}`}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--color-ink-3)' }}>
                    {profile.xp}/{profile.xpToNextLevel} XP
                  </span>
                </div>
                <div style={{ width: '100%', height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--color-surface-4)' }}>
                  <div
                    style={{
                      height: 6, borderRadius: 'var(--radius-pill)',
                      background: 'var(--color-pink-base)',
                      width: `${(profile.xp / profile.xpToNextLevel) * 100}%`,
                      transition: 'width var(--dur-slow) var(--ease-soft)',
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--color-surface-3)', borderRadius: 'var(--radius-md)', padding: 14 }}>
              <Flame size={20} color="var(--color-peach-strong)" />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-ink-1)' }}>
                  {lang === 'en' ? `${profile.streak}-day streak` : `连续学习 ${profile.streak} 天`}
                </div>
                <div style={{ fontSize: 11, color: 'var(--color-ink-3)' }}>
                  {lang === 'en' ? `Best: ${profile.longestStreak} days` : `最长记录: ${profile.longestStreak} 天`}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Goals */}
      <Section spacing="normal">
        <Card variant="default" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Target size={18} color="var(--color-mint-strong)" />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
              {t('settings.learning_goal', lang)}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={labelStyle}>{t('settings.level', lang)}</label>
              <select
                value={profile.targetLevel}
                onChange={(e) => setProfile({ ...profile, targetLevel: e.target.value as UserProfile['targetLevel'] })}
                style={inputStyle}
              >
                <option value="beginner">{lang === 'en' ? 'Beginner (TOPIK 1-2)' : '初级 (TOPIK 1-2)'}</option>
                <option value="intermediate">{lang === 'en' ? 'Intermediate (TOPIK 3-4)' : '中级 (TOPIK 3-4)'}</option>
                <option value="advanced">{lang === 'en' ? 'Advanced (TOPIK 5-6)' : '高级 (TOPIK 5-6)'}</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>
                {lang === 'en' ? `Daily word goal: ${profile.dailyGoalWords} words` : `每日学习单词: ${profile.dailyGoalWords} 个`}
              </label>
              <input
                type="range"
                min="5" max="50" step="5"
                value={profile.dailyGoalWords}
                onChange={(e) => setProfile({ ...profile, dailyGoalWords: Number(e.target.value) })}
                style={{ width: '100%', accentColor: 'var(--color-pink-base)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--color-ink-4)', marginTop: 2 }}>
                <span>5</span><span>50</span>
              </div>
            </div>

            <div>
              <label style={labelStyle}>
                {lang === 'en' ? `Daily study time: ${profile.dailyGoalMinutes} min` : `每日学习时间: ${profile.dailyGoalMinutes} 分钟`}
              </label>
              <input
                type="range"
                min="5" max="120" step="5"
                value={profile.dailyGoalMinutes}
                onChange={(e) => setProfile({ ...profile, dailyGoalMinutes: Number(e.target.value) })}
                style={{ width: '100%', accentColor: 'var(--color-pink-base)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--color-ink-4)', marginTop: 2 }}>
                <span>{lang === 'en' ? '5 min' : '5 分钟'}</span><span>{lang === 'en' ? '2 hrs' : '2 小时'}</span>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Preferences */}
      <Section spacing="normal">
        <Card variant="default" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Sliders size={18} color="var(--color-purple-strong)" />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
              {t('settings.preferences', lang)}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={labelStyle}>{t('settings.language', lang)} / Language</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['zh', 'en'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    style={{
                      flex: 1, padding: '10px 0', borderRadius: 'var(--radius-md)',
                      fontSize: 13, fontWeight: 700,
                      border: lang === l ? '1px solid var(--color-pink-base)' : '1px solid var(--color-border-2)',
                      background: lang === l ? 'var(--color-pink-base)' : 'var(--color-surface-1)',
                      color: lang === l ? '#fff' : 'var(--color-ink-2)',
                      cursor: 'pointer',
                      transition: 'all var(--dur-fast) var(--ease-soft)',
                    }}
                  >
                    {l === 'zh' ? '中文' : 'English'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>{t('settings.tts_speed', lang)}: {profile.ttsSpeed ?? 0.8}x</label>
              <input
                type="range"
                min="0.5" max="1.2" step="0.1"
                value={profile.ttsSpeed ?? 0.8}
                onChange={(e) => { const v = parseFloat(e.target.value); setSpeechRate(v); setProfile({ ...profile, ttsSpeed: v }); }}
                style={{ width: '100%', accentColor: 'var(--color-purple-base)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--color-ink-4)', marginTop: 2 }}>
                <span>{lang === 'en' ? '0.5x slow' : '0.5x 慢'}</span>
                <span>{lang === 'en' ? '1.2x fast' : '1.2x 快'}</span>
              </div>
            </div>

            <div>
              <label style={labelStyle}>{t('settings.review_batch', lang)}: {profile.reviewBatchSize ?? 10}{lang === 'en' ? '' : ' 个'}</label>
              <select
                value={profile.reviewBatchSize ?? 10}
                onChange={(e) => setProfile({ ...profile, reviewBatchSize: Number(e.target.value) })}
                style={inputStyle}
              >
                {[5, 10, 15, 20, 30].map(n => (
                  <option key={n} value={n}>{lang === 'en' ? `${n} words` : `${n} 个`}</option>
                ))}
              </select>
            </div>

            <ToggleRow
              Icon={soundOn ? Volume2 : VolumeX}
              label={t('settings.sound_effects', lang)}
              desc={lang === 'en' ? 'Lightweight feedback sounds (very quiet)' : '轻量操作反馈音效（音量很低）'}
              on={soundOn}
              tone="purple"
              onChange={() => { const v = !soundOn; setSoundOn(v); setSoundEnabled(v); }}
            />

            <ToggleRow
              Icon={Zap}
              label={t('settings.reduce_motion', lang)}
              desc={lang === 'en' ? 'Disable bounce and breathing animations' : '关闭弹跳、呼吸等动画效果'}
              on={!reduceMotion}
              tone="peach"
              onChange={() => { const v = !reduceMotion; setReduceMotionState(v); setReduceMotion(v); }}
            />

            <ToggleRow
              Icon={theme === 'dark' ? Moon : Sun}
              label={t('settings.dark_mode', lang)}
              desc={theme === 'dark' ? (lang === 'en' ? 'Current: Dark' : '当前：深色') : (lang === 'en' ? 'Current: Light' : '当前：亮色')}
              on={theme === 'dark'}
              tone="purple"
              onChange={toggleTheme}
            />
          </div>
        </Card>
      </Section>

      {/* Display */}
      <Section spacing="normal">
        <Card variant="default" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Type size={20} color="var(--color-ink-1)" />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
              {t('settings.display', lang)}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={labelStyle}>{t('settings.font_style', lang)}</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {FONT_PRESETS.map((p) => {
                  const active = fontSettings.preset === p.key;
                  return (
                    <button
                      key={p.key}
                      onClick={() => previewPreset(p.key)}
                      style={{
                        padding: 12, borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        border: active ? '1px solid var(--color-pink-base)' : '1px solid var(--color-border-2)',
                        background: active ? 'var(--color-pink-soft)' : 'var(--color-surface-2)',
                        cursor: 'pointer',
                        transition: 'all var(--dur-fast) var(--ease-soft)',
                      }}
                    >
                      <p style={{ fontSize: 12, fontWeight: 700, color: active ? 'var(--color-pink-strong)' : 'var(--color-ink-1)', margin: '0 0 4px' }}>
                        {p.label}
                      </p>
                      <p style={{ fontSize: 10, color: 'var(--color-ink-3)', margin: 0, lineHeight: 1.3 }}>{p.desc}</p>
                      <p
                        style={{
                          fontSize: 9, color: 'var(--color-ink-4)', marginTop: 6,
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          fontFamily: p.key === 'cute'
                            ? "'KaiTi','STKaiti','Malgun Gothic',sans-serif"
                            : p.key === 'clean'
                              ? "system-ui,'Segoe UI','PingFang SC',sans-serif"
                              : "Georgia,'KaiTi','STKaiti',serif",
                        }}
                      >
                        {p.preview}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={labelStyle}>{t('settings.font_size', lang)}</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {FONT_SIZES.map((s) => {
                  const active = fontSettings.size === s.key;
                  return (
                    <button
                      key={s.key}
                      onClick={() => previewSize(s.key)}
                      style={{
                        flex: 1, padding: '10px 0', borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        border: active ? '1px solid var(--color-pink-base)' : '1px solid var(--color-border-2)',
                        background: active ? 'var(--color-pink-soft)' : 'var(--color-surface-2)',
                        cursor: 'pointer',
                        transition: 'all var(--dur-fast) var(--ease-soft)',
                      }}
                    >
                      <span style={{ fontSize: 12, color: active ? 'var(--color-pink-strong)' : 'var(--color-ink-1)', fontWeight: 700 }}>
                        {s.label}
                      </span>
                      <span style={{ display: 'block', color: active ? 'var(--color-pink-strong)' : 'var(--color-ink-3)', fontSize: s.px }}>
                        Aa
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ background: 'var(--color-surface-1)', border: '1px solid var(--color-border-1)', borderRadius: 'var(--radius-md)', padding: 14 }}>
              <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '0 0 4px' }}>
                {lang === 'en' ? 'Preview' : '预览效果'}
              </p>
              <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-ink-1)', margin: '0 0 4px' }}>
                안녕하세요! 좋은 아침이에요.
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-ink-2)', margin: '0 0 4px' }}>
                你好！这是一段中文预览文本，用于展示当前字体和字号的实际效果。
              </p>
              <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: 0 }}>
                The quick brown fox jumps over the lazy dog. 12345
              </p>
            </div>

            <div>
              <label style={labelStyle}>{t('settings.flashcard_color', lang)}</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {FLASHCARD_THEMES.map((th) => {
                  const active = fcTheme === th.key;
                  return (
                    <button
                      key={th.key}
                      onClick={() => handleFcTheme(th.key)}
                      style={{
                        padding: 12, borderRadius: 'var(--radius-md)',
                        textAlign: 'left',
                        border: active ? '1px solid var(--color-pink-base)' : '1px solid var(--color-border-2)',
                        background: active ? 'var(--color-pink-soft)' : 'var(--color-surface-2)',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                        {th.swatches.map((c, i) => (
                          <span
                            key={i}
                            style={{
                              width: 16, height: 16, borderRadius: '50%',
                              background: c, border: '1px solid var(--color-swatch-outline)', flexShrink: 0,
                            }}
                          />
                        ))}
                      </div>
                      <p style={{ fontSize: 12, fontWeight: 700, color: active ? 'var(--color-pink-strong)' : 'var(--color-ink-1)', margin: 0 }}>
                        {th.label}
                      </p>
                      <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                        {th.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </Section>

      {/* Achievements */}
      <Section spacing="normal">
        <Card variant="default" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Trophy size={18} color="var(--color-peach-strong)" />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
              {t('settings.achievements', lang)} ({earnedAchievements.length}/{allTypes.length})
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {allTypes.map((type) => {
              const def = ACHIEVEMENT_DEFS[type];
              const earned = earnedTypes.has(type);
              return (
                <div
                  key={type}
                  style={{
                    padding: 12, borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    background: earned ? 'var(--color-peach-soft)' : 'var(--color-surface-3)',
                    border: '1px solid var(--color-border-1)',
                    opacity: earned ? 1 : 0.4,
                  }}
                >
                  <div style={{ fontSize: 22, marginBottom: 4 }}>{def.icon}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-ink-1)' }}>{def.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--color-ink-3)', marginTop: 2 }}>{def.description}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </Section>

      {/* Save */}
      <Button
        variant="primary"
        tone="pink"
        size="lg"
        fullWidth
        loading={saving}
        onClick={handleSave}
        icon={<Save size={18} />}
      >
        {saved ? t('settings.save_success', lang) : t('settings.save', lang)}
      </Button>

      {/* Logout */}
      <Section spacing="normal">
        <Card variant="default" padding="md" style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                {lang === 'en' ? 'Current account' : '当前账号'}
              </p>
              <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                {authLoading ? t('common.loading', lang) : (user?.nickname ?? (lang === 'en' ? 'Not logged in' : '未登录'))}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={<LogOut size={14} />}
              onClick={async () => { await logout(); window.location.href = '/auth/login'; }}
              style={{ color: 'var(--color-status-danger)', borderColor: 'var(--color-status-danger-border)' }}
            >
              {t('settings.logout', lang)}
            </Button>
          </div>
        </Card>
      </Section>
    </div>
  );
}
