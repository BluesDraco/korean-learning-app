'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { ArrowLeft, User, Sliders, Save, Loader2, Volume2, VolumeX, Zap, Palette, LogOut, Moon, Sun, Flame, Camera, Map as MapIcon, Mail, ShieldCheck, MessageSquare } from 'lucide-react';
import { useMapEntryHidden } from '@/lib/mapEntryPref';
import { useAuth } from '@/components/AuthProvider';
import { getProfile, updateProfile } from '@/lib/gamification';
import { useToast } from '@/hooks/useToast';
import type { UserProfile } from '@/types';
import { useTheme } from '@/components/ThemeProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { setSpeechRate, getSpeechRate, setSpeakRepeat, getSpeakRepeat } from '@/lib/tts';
import { isSoundEnabled, setSoundEnabled } from '@/lib/soundManager';
import { FLASHCARD_THEMES, getTranslatedThemes, getFlashcardTheme, saveFlashcardTheme, applyFlashcardTheme, type FlashcardTheme } from '@/lib/flashcardTheme';
import { PageHeader, Section, Card, Button } from '@/components/ui';
import UserAvatar from '@/components/UserAvatar';
import { FeedbackModal } from '@/components/FeedbackModal';

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
  const smartBack = useSmartBack('/mine');
  const { user, loading: authLoading, logout, refreshUser } = useAuth();
  const { theme, toggle: toggleTheme } = useTheme();
  const { showToast } = useToast();
  const { lang, setLang } = useLang();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [ttsRepeat, setTtsRepeat] = useState(1);
  const [reduceMotion, setReduceMotionState] = useState(false);
  const [mapEntryHidden, setMapEntryHidden] = useMapEntryHidden();
  const [fcTheme, setFcTheme] = useState<FlashcardTheme>('pure');
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 邮箱绑定
  const [bindSheetOpen, setBindSheetOpen] = useState(false);
  const [bindEmail, setBindEmail] = useState('');
  const [bindCode, setBindCode] = useState('');
  const [bindStep, setBindStep] = useState<'email' | 'code'>('email');
  const [bindCountdown, setBindCountdown] = useState(0);
  const [bindError, setBindError] = useState('');
  const [bindSubmitting, setBindSubmitting] = useState(false);
  const bindTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (bindTimerRef.current) clearInterval(bindTimerRef.current); }, []);

  useEffect(() => {
    setFcTheme(getFlashcardTheme());
  }, []);

  const sendBindCode = async () => {
    if (bindCountdown > 0) return;
    if (!bindEmail) { setBindError(t('auth.err_email_format', lang)); return; }
    setBindError('');
    try {
      const res = await fetch('/api/auth/email/send-bind-code', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: bindEmail, lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setBindError(data.error || t('auth.err_network', lang)); return; }
      setBindStep('code');
      setBindCountdown(60);
      bindTimerRef.current = setInterval(() => {
        setBindCountdown(prev => { if (prev <= 1) { if (bindTimerRef.current) clearInterval(bindTimerRef.current); return 0; } return prev - 1; });
      }, 1000);
    } catch { setBindError(t('auth.err_network', lang)); }
  };

  const doBindEmail = async () => {
    if (bindSubmitting) return;
    if (!bindCode) { setBindError(t('auth.err_code_empty', lang)); return; }
    setBindError('');
    setBindSubmitting(true);
    try {
      const res = await fetch('/api/auth/email/bind-email', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: bindEmail, code: bindCode }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setBindError(data.error || t('auth.err_network', lang)); setBindSubmitting(false); return; }
      await refreshUser();
      setBindSheetOpen(false);
    } catch { setBindError(t('auth.err_network', lang)); setBindSubmitting(false); }
  };

  const handleFcTheme = (t: FlashcardTheme) => {
    setFcTheme(t);
    saveFlashcardTheme(t);
    applyFlashcardTheme(t);
  };

  // 客户端等比缩放到 256×256，输出 JPEG 0.85（保证不超 500KB）
  async function compressAvatar(file: File): Promise<Blob> {
    const img = new Image();
    const url = URL.createObjectURL(file);
    try {
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('图片加载失败'));
        img.src = url;
      });
      const canvas = document.createElement('canvas');
      const size = 256;
      const scale = Math.min(size / img.width, size / img.height, 1);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('浏览器不支持 canvas');
      ctx.drawImage(img, 0, 0, w, h);
      const blob: Blob = await new Promise((resolve, reject) => {
        canvas.toBlob((b) => { if (b) resolve(b); else reject(new Error('导出失败')); }, 'image/jpeg', 0.85);
      });
      return blob;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  const handleAvatarPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = ''; // 允许下次选同一个文件
    if (!file.type.startsWith('image/')) {
      showToast(t('settings.select_image', lang), 'error');
      return;
    }
    setAvatarUploading(true);
    try {
      const blob = await compressAvatar(file);
      const form = new FormData();
      form.append('file', blob, 'avatar.jpg');
      const uploadRes = await fetch('/api/user/avatar', { method: 'POST', body: form });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || '上传失败');

      const patchRes = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatarUrl: uploadData.avatarUrl }),
      });
      if (!patchRes.ok) {
        const patchData = await patchRes.json().catch(() => ({}));
        throw new Error(patchData.error || '保存头像失败');
      }
      await refreshUser();
      showToast(t('settings.avatar_updated', lang), 'success');
    } catch {
      showToast(t('settings.avatar_upload_failed', lang), 'error');
    } finally {
      setAvatarUploading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth/login?redirect=/settings');
      return;
    }
    if (!user) return;
    const loadLocalPrefs = () => {
      try {
        const raw = localStorage.getItem(`tori_settings_prefs_${user?.id ?? 'guest'}`);
        if (raw) return JSON.parse(raw) as { ttsSpeed?: number };
      } catch { /* ignore */ }
      return {};
    };
    const load = async () => {
      try {
        const p = await getProfile();
        const prefs = loadLocalPrefs();
        setProfile({
          ...p,
          ttsSpeed: prefs.ttsSpeed ?? getSpeechRate(),
        });
        setSoundOn(isSoundEnabled());
        setTtsRepeat(getSpeakRepeat());
        setReduceMotionState(getReduceMotion());
      } catch {
        const prefs = loadLocalPrefs();
        setProfile({
          nickname: '', dailyGoalMinutes: 30, dailyGoalWords: 10, targetLevel: 'beginner',
          ttsSpeed: prefs.ttsSpeed ?? getSpeechRate(),
        } as UserProfile);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user, authLoading, router]);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      // 昵称必须写到服务器（IndexedDB 的 updateProfile 不会同步到 users 表）
      const nicknameTrimmed = profile.nickname.trim();
      if (nicknameTrimmed) {
        const res = await fetch('/api/user/profile', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nickname: nicknameTrimmed }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || '保存失败');
        }
        await refreshUser();
      }
      // 本地画像 IndexedDB 保存其余字段（服务器 users 表不存这些）
      await updateProfile({
        nickname: profile.nickname,
      });
      // 本地偏好写 localStorage per-user（合并写，勿覆盖 /review 管理的 spellingStrictness）：
      try {
        const prefKey = `tori_settings_prefs_${user?.id ?? 'guest'}`;
        const raw = localStorage.getItem(prefKey);
        const prev = raw ? JSON.parse(raw) : {};
        localStorage.setItem(prefKey, JSON.stringify({
          ...prev,
          ttsSpeed: profile.ttsSpeed ?? 0.75,
        }));
      } catch { /* ignore */ }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      showToast(t('settings.save_failed_retry', lang), 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '128px 0' }}>
        <Loader2 size={32} className="animate-spin" color="var(--color-ink-3)" />
      </div>
    );
  }

  if (authLoading || (!user && !authLoading)) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '128px 0' }}>
        <Loader2 size={32} className="animate-spin" color="var(--color-ink-3)" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-4 px-4 lg:px-6">
        <PageHeader title={t('settings.title', lang)} flat />
        <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 14, color: 'var(--color-ink-2)', margin: '0 0 16px' }}>
            {t('settings.login_required', lang)}
          </p>
          <Button variant="primary" tone="black" onClick={() => { window.location.href = '/auth/login'; }}>
            {t('settings.go_login', lang)}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-4 px-4 lg:px-6">
      <button
        onClick={smartBack}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--color-ink-2)', background: 'transparent', border: 'none',
          padding: 0, cursor: 'pointer', marginBottom: 14,
        }}
      >
        <ArrowLeft size={16} />
        {t('ui.ph_back', lang)}
      </button>

      <div>

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
              <label style={labelStyle}>{t('settings.avatar_label', lang)}</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <UserAvatar
                  avatarUrl={user?.avatarUrl}
                  name={profile.nickname || user?.username}
                  size={64}
                  style={{ border: '2px solid var(--color-border-2)' }}
                />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleAvatarPick}
                  style={{ display: 'none' }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  icon={avatarUploading ? <Loader2 size={14} className="animate-spin" /> : <Camera size={14} />}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={avatarUploading}
                >
                  {avatarUploading ? t('settings.uploading', lang) : t('settings.change_avatar', lang)}
                </Button>
              </div>
              <p style={{ fontSize: 11, color: 'var(--color-ink-3)', marginTop: 6, marginBottom: 0 }}>
                {t('settings.avatar_hint', lang)}
              </p>
            </div>

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
                {profile.level ?? 1}
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

      {/* Account binding · 账号绑定 */}
      <Section spacing="normal">
        <Card variant="default" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <ShieldCheck size={18} color="var(--color-mint-strong)" />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
              {t('settings.account_binding', lang)}
            </h2>
          </div>
          <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '0 0 16px' }}>
            {t('settings.bind_hint', lang)}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* 手机绑定后端未接（备案期），暂只提供邮箱绑定，避免出现点了没反应/打开错弹窗的死按钮 */}
            {([
              { key: 'email', Icon: Mail, label: t('settings.bind_email', lang), value: user?.email },
            ] as const).map(({ key, Icon, label, value }) => {
              const bound = Boolean(value);
              return (
                <div
                  key={key}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                    background: 'var(--color-surface-3)', borderRadius: 'var(--radius-md)', padding: '14px 16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    <Icon size={20} color="var(--color-mint-strong)" />
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>{label}</p>
                      <p style={{ fontSize: 12, color: bound ? 'var(--color-ink-2)' : 'var(--color-ink-3)', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {bound ? value : t('settings.not_bound', lang)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    tone="mint"
                    onClick={() => { setBindSheetOpen(true); setBindStep('email'); setBindError(''); setBindEmail(''); setBindCode(''); }}
                  >
                    {bound ? t('settings.change_bind', lang) : t('settings.go_bind', lang)}
                  </Button>
                </div>
              );
            })}
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
                    {l === 'zh' ? t('lang.zh', lang) : t('lang.en', lang)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle}>{t('settings.tts_speed', lang)}</label>
              <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: '-2px 0 8px' }}>
                {t('settings.tts_speed_desc', lang)}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {([
                  { v: 0.6, key: 'settings.speed_very_slow' },
                  { v: 0.75, key: 'settings.speed_slow' },
                  { v: 0.9, key: 'settings.speed_standard' },
                  { v: 1.0, key: 'settings.speed_normal' },
                ] as const).map((opt) => {
                  const current = profile.ttsSpeed ?? 0.75;
                  const active = Math.abs(current - opt.v) < 0.01;
                  return (
                    <button
                      key={opt.v}
                      onClick={() => { setSpeechRate(opt.v); setProfile({ ...profile, ttsSpeed: opt.v }); }}
                      style={{
                        padding: '10px 6px', borderRadius: 'var(--radius-md)',
                        textAlign: 'center', cursor: 'pointer',
                        border: active ? '1px solid var(--color-purple-base)' : '1px solid var(--color-border-2)',
                        background: active ? 'var(--color-purple-soft)' : 'var(--color-surface-2)',
                        transition: 'all var(--dur-fast) var(--ease-soft)',
                      }}
                    >
                      <p style={{ fontSize: 13, fontWeight: 700, color: active ? 'var(--color-purple-strong)' : 'var(--color-ink-1)', margin: 0 }}>
                        {opt.v}x
                      </p>
                      <p style={{ fontSize: 11, color: active ? 'var(--color-purple-strong)' : 'var(--color-ink-3)', margin: '2px 0 0' }}>
                        {t(opt.key, lang)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label style={labelStyle}>{t('settings.tts_repeat', lang)}</label>
              <p style={{ fontSize: 11, color: 'var(--color-ink-3)', margin: '-2px 0 8px' }}>
                {t('settings.tts_repeat_desc', lang)}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {[1, 2, 3, 5].map((n) => {
                  const active = ttsRepeat === n;
                  return (
                    <button
                      key={n}
                      onClick={() => { setSpeakRepeat(n); setTtsRepeat(n); }}
                      style={{
                        padding: '10px 6px', borderRadius: 'var(--radius-md)',
                        textAlign: 'center', cursor: 'pointer',
                        border: active ? '1px solid var(--color-purple-base)' : '1px solid var(--color-border-2)',
                        background: active ? 'var(--color-purple-soft)' : 'var(--color-surface-2)',
                        transition: 'all var(--dur-fast) var(--ease-soft)',
                      }}
                    >
                      <p style={{ fontSize: 13, fontWeight: 700, color: active ? 'var(--color-purple-strong)' : 'var(--color-ink-1)', margin: 0 }}>
                        {t('settings.tts_repeat_n', lang, { n })}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <ToggleRow
              Icon={soundOn ? Volume2 : VolumeX}
              label={t('settings.sound_effects', lang)}
              desc={t('settings.sound_desc', lang)}
              on={soundOn}
              tone="purple"
              onChange={() => { const v = !soundOn; setSoundOn(v); setSoundEnabled(v); }}
            />

            <ToggleRow
              Icon={Zap}
              label={t('settings.reduce_motion', lang)}
              desc={t('settings.motion_desc', lang)}
              on={!reduceMotion}
              tone="peach"
              onChange={() => { const v = !reduceMotion; setReduceMotionState(v); setReduceMotion(v); }}
            />

            <ToggleRow
              Icon={theme === 'dark' ? Moon : Sun}
              label={t('settings.dark_mode', lang)}
              desc={t(theme === 'dark' ? 'settings.dark_dark' : 'settings.dark_light', lang)}
              on={theme === 'dark'}
              tone="purple"
              onChange={toggleTheme}
            />

            <ToggleRow
              Icon={MapIcon}
              label={t('settings.show_map_entry', lang)}
              desc={t('settings.show_map_entry_desc', lang)}
              on={!mapEntryHidden}
              tone="peach"
              onChange={() => setMapEntryHidden(!mapEntryHidden)}
            />
          </div>
        </Card>
      </Section>

      {/* Display */}
      <Section spacing="normal">
        <Card variant="default" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Palette size={20} color="var(--color-pink-strong)" />
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
              {t('settings.flashcard_theme', lang)}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={labelStyle}>{t('settings.flashcard_color', lang)}</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {getTranslatedThemes(lang).map((th) => {
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

      {/* Feedback · 报告问题（原全站悬浮按钮已移到这里） */}
      <Section spacing="normal">
        <Card variant="default" padding="lg">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
              <MessageSquare size={20} color="var(--color-pink-strong)" />
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                  {t('feedback.report_title', lang)}
                </p>
                <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>
                  {t('feedback.settings_desc', lang)}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" tone="pink" onClick={() => setFeedbackOpen(true)}>
              {t('feedback.report_error', lang)}
            </Button>
          </div>
        </Card>
      </Section>

      {/* Logout · 桌面下这块在右列 Preferences 下方 · 手机下在 Flashcards 之后 */}
      <Section spacing="normal">
        <Card variant="default" padding="md" style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flex: 1 }}>
              <UserAvatar
                avatarUrl={user?.avatarUrl}
                name={user?.nickname || user?.username}
                size={40}
              />
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                  {t('settings.current_account', lang)}
                </p>
                <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {authLoading ? t('common.loading', lang) : (user?.nickname ?? t('settings.not_logged_in', lang))}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              icon={<LogOut size={14} />}
              onClick={async () => {
                if (!confirm(t('settings.logout_confirm', lang))) return;
                await logout();
                window.location.href = '/auth/login';
              }}
              style={{ color: 'var(--color-status-danger)', borderColor: 'var(--color-status-danger-border)' }}
            >
              {t('settings.logout', lang)}
            </Button>
          </div>
        </Card>
      </Section>
      </div>

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

      <FeedbackModal open={feedbackOpen} onClose={() => setFeedbackOpen(false)} />

      {/* 邮箱绑定弹窗 */}
      {bindSheetOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)',
        }} onClick={() => setBindSheetOpen(false)}>
          <div style={{
            background: 'var(--color-surface-0)', borderRadius: '20px 20px 0 0', padding: '24px 20px 32px',
            maxWidth: 480, width: '100%', maxHeight: '80vh', overflow: 'auto',
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 16px', color: 'var(--color-ink-1)' }}>
              {t('settings.bind_email', lang)}
            </h3>
            {bindStep === 'email' ? (
              <>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 13, color: 'var(--color-ink-2)', display: 'block', marginBottom: 6 }}>
                    {t('auth.email', lang)}
                  </label>
                  <input
                    type="email"
                    value={bindEmail}
                    onChange={(e) => setBindEmail(e.target.value)}
                    placeholder={t('auth.email_ph', lang)}
                    style={{
                      width: '100%', padding: '10px 14px', borderRadius: 12, border: '1px solid var(--color-border-2)',
                      background: 'var(--color-surface-1)', fontSize: 15, color: 'var(--color-ink-1)', outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                </div>
                {bindError && <p style={{ fontSize: 13, color: 'var(--color-status-danger)', margin: '0 0 12px' }}>{bindError}</p>}
                <button
                  onClick={sendBindCode}
                  disabled={!bindEmail}
                  style={{
                    width: '100%', padding: '13px', borderRadius: 999, border: 'none',
                    background: 'var(--color-pink-strong)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                    opacity: bindEmail ? 1 : 0.5,
                  }}
                >
                  {t('auth.code_send', lang)}
                </button>
              </>
            ) : (
              <>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 13, color: 'var(--color-ink-2)', display: 'block', marginBottom: 6 }}>
                    {t('auth.code', lang)}
                  </label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <input
                      type="text" inputMode="numeric" value={bindCode}
                      onChange={(e) => setBindCode(e.target.value)}
                      placeholder={t('auth.code_ph', lang)}
                      style={{
                        flex: 1, padding: '10px 14px', borderRadius: 12, border: '1px solid var(--color-border-2)',
                        background: 'var(--color-surface-1)', fontSize: 15, color: 'var(--color-ink-1)', outline: 'none', boxSizing: 'border-box',
                      }}
                    />
                    <button
                      onClick={sendBindCode} disabled={bindCountdown > 0}
                      style={{
                        padding: '10px 16px', borderRadius: 999, border: '1px solid var(--color-border-2)',
                        background: 'var(--color-surface-1)', fontSize: 13, fontWeight: 600, color: 'var(--color-ink-2)',
                        cursor: bindCountdown > 0 ? 'default' : 'pointer', whiteSpace: 'nowrap',
                      }}
                    >
                      {bindCountdown > 0 ? t('auth.code_resend', lang, { n: String(bindCountdown) }) : t('auth.code_send', lang)}
                    </button>
                  </div>
                </div>
                {bindError && <p style={{ fontSize: 13, color: 'var(--color-status-danger)', margin: '0 0 12px' }}>{bindError}</p>}
                <button
                  onClick={doBindEmail} disabled={bindSubmitting || !bindCode}
                  style={{
                    width: '100%', padding: '13px', borderRadius: 999, border: 'none',
                    background: 'var(--color-pink-strong)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                    opacity: (bindSubmitting || !bindCode) ? 0.5 : 1,
                  }}
                >
                  {bindSubmitting ? t('settings.binding', lang) : t('settings.confirm_bind', lang)}
                </button>
              </>
            )}
            <button
              onClick={() => setBindSheetOpen(false)}
              style={{
                width: '100%', marginTop: 10, padding: '10px', borderRadius: 999, border: 'none',
                background: 'transparent', color: 'var(--color-ink-3)', fontSize: 14, cursor: 'pointer',
              }}
            >
              {t('common.cancel', lang)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
