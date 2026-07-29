'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { SCENE_CAST } from '@/data/sceneCast';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import './new.css';

// 值为 i18n key，点击"随便来一个"时用 t() 解析后填入输入框
const EXAMPLES = [
  { place: 'practice_new.example_1_place', situation: 'practice_new.example_1_situation', goal: 'practice_new.example_1_goal' },
  { place: 'practice_new.example_2_place', situation: 'practice_new.example_2_situation', goal: 'practice_new.example_2_goal' },
  { place: 'practice_new.example_3_place', situation: 'practice_new.example_3_situation', goal: 'practice_new.example_3_goal' },
  { place: 'practice_new.example_4_place', situation: 'practice_new.example_4_situation', goal: 'practice_new.example_4_goal' },
  { place: 'practice_new.example_5_place', situation: 'practice_new.example_5_situation', goal: 'practice_new.example_5_goal' },
  { place: 'practice_new.example_6_place', situation: 'practice_new.example_6_situation', goal: 'practice_new.example_6_goal' },
  { place: 'practice_new.example_7_place', situation: 'practice_new.example_7_situation', goal: 'practice_new.example_7_goal' },
  { place: 'practice_new.example_8_place', situation: 'practice_new.example_8_situation', goal: 'practice_new.example_8_goal' },
  { place: 'practice_new.example_9_place', situation: 'practice_new.example_9_situation', goal: 'practice_new.example_9_goal' },
  { place: 'practice_new.example_10_place', situation: 'practice_new.example_10_situation', goal: 'practice_new.example_10_goal' },
  { place: 'practice_new.example_11_place', situation: 'practice_new.example_11_situation', goal: 'practice_new.example_11_goal' },
  { place: 'practice_new.example_12_place', situation: 'practice_new.example_12_situation', goal: 'practice_new.example_12_goal' },
];

// label/desc 为 i18n key，渲染处用 t() 解析
const DIFFICULTIES = [
  { key: 'beginner', label: 'practice_new.diff_beginner_label', desc: 'practice_new.diff_beginner_desc' },
  { key: 'intermediate', label: 'practice_new.diff_intermediate_label', desc: 'practice_new.diff_intermediate_desc' },
  { key: 'advanced', label: 'practice_new.diff_advanced_label', desc: 'practice_new.diff_advanced_desc' },
] as const;
type Difficulty = typeof DIFFICULTIES[number]['key'];

// label/tag/ph 为 i18n key，渲染处用 t() 解析
const FIELDS = [
  { key: 'place', num: '01', emoji: '📍', label: 'practice_new.field_place_label', tag: 'practice_new.field_place_tag', ph: 'practice_new.field_place_ph', multiline: false },
  { key: 'situation', num: '02', emoji: '💬', label: 'practice_new.field_situation_label', tag: 'practice_new.field_situation_tag', ph: 'practice_new.field_situation_ph', multiline: true, rows: 3 },
  { key: 'goal', num: '03', emoji: '🎯', label: 'practice_new.field_goal_label', tag: 'practice_new.field_goal_tag', ph: 'practice_new.field_goal_ph', multiline: true, rows: 2 },
] as const;

// 值为 i18n key，渲染处用 t() 解析
const GEN_STEPS = ['practice_new.gen_step_1', 'practice_new.gen_step_2', 'practice_new.gen_step_3'];
const GEN_STEPS_FREE = ['practice_new.gen_free_step_1', 'practice_new.gen_free_step_2', 'practice_new.gen_free_step_3'];

export default function CustomSceneNewPage() {
  const { lang } = useLang();
  return (
    <Suspense fallback={<div className="csn-root csn-center"><div className="csn-loading">{t('practice_new.loading', lang)}</div></div>}>
      <CustomSceneNewInner />
    </Suspense>
  );
}

function CustomSceneNewInner() {
  const { lang } = useLang();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  const isEdit = !!editId;
  const { user, loading: authLoading, refreshUser } = useAuth();
  const [mode, setMode] = useState<'scene' | 'free'>(searchParams.get('mode') === 'free' ? 'free' : 'scene');
  const [place, setPlace] = useState('');
  const [situation, setSituation] = useState('');
  const [goal, setGoal] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('intermediate');
  const [characterId, setCharacterId] = useState<string>(searchParams.get('mode') === 'free' ? 'tori' : ''); // '' = 智能挑选（仅场景模式）
  // 专属陪练（free 模式）
  const [companionName, setCompanionName] = useState('');
  const [companionNameZh, setCompanionNameZh] = useState('');
  const [verbalTic, setVerbalTic] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(''); // 上传自担照后的 URL（空则用预制形象 emoji）
  const [avatarUploading, setAvatarUploading] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  // 用户自己在对话里的头像（存 users.avatar_url，全站共用）
  const [myAvatarUploading, setMyAvatarUploading] = useState(false);
  const myAvatarInputRef = useRef<HTMLInputElement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [genStep, setGenStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [prefilling, setPrefilling] = useState(isEdit);

  const values: Record<string, string> = { place, situation, goal };
  const setters: Record<string, (v: string) => void> = { place: setPlace, situation: setSituation, goal: setGoal };

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace(`/auth/login?redirect=/practice/custom/new${isEdit ? `?edit=${editId}` : ''}`);
    }
  }, [user, authLoading, router, isEdit, editId]);

  // 编辑模式：预填已有场景的三字段/难度/角色
  useEffect(() => {
    if (!isEdit || !user) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/practice/custom/${encodeURIComponent(editId!)}`, { credentials: 'same-origin', cache: 'no-store' });
        if (!res.ok) throw new Error('load failed');
        const d = await res.json();
        if (cancelled) return;
        setMode(d.mode === 'free' ? 'free' : 'scene');
        setPlace(d.place || '');
        setSituation(d.situation || '');
        setGoal(d.goal || '');
        setCompanionName(d.companion_name || '');
        setCompanionNameZh(d.companion_name_zh || '');
        setVerbalTic(d.verbal_tic || '');
        setAvatarUrl(d.avatar_url || '');
        if (['beginner', 'intermediate', 'advanced'].includes(d.difficulty)) setDifficulty(d.difficulty);
        if (d.character_id) setCharacterId(d.character_id);
      } catch {
        if (!cancelled) setError(t('practice_new.err_load_scene', lang));
      } finally {
        if (!cancelled) setPrefilling(false);
      }
    })();
    return () => { cancelled = true; };
  }, [isEdit, editId, user, lang]);

  // 生成中：多步进度轮播（纯视觉）
  const stepTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (submitting) {
      setGenStep(0);
      stepTimer.current = setInterval(() => setGenStep((s) => Math.min(s + 1, GEN_STEPS.length - 1)), 3000);
    } else if (stepTimer.current) {
      clearInterval(stepTimer.current);
      stepTimer.current = null;
    }
    return () => { if (stepTimer.current) { clearInterval(stepTimer.current); stepTimer.current = null; } };
  }, [submitting]);

  const canSubmit = mode === 'free'
    ? !!(companionName.trim() && characterId && !submitting)
    : !!(place.trim() && situation.trim() && goal.trim() && !submitting);

  const fillExample = () => {
    const ex = EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)];
    setPlace(t(ex.place, lang));
    setSituation(t(ex.situation, lang));
    setGoal(t(ex.goal, lang));
    setError(null);
  };

  // 客户端压缩成 256px JPEG 再上传（复用 settings 头像逻辑）
  const compressAvatar = async (file: File): Promise<Blob> => {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const im = new Image();
        im.onload = () => resolve(im);
        im.onerror = () => reject(new Error(t('practice_new.err_image_read', lang)));
        im.src = url;
      });
      const canvas = document.createElement('canvas');
      const size = 256;
      const scale = Math.min(size / img.width, size / img.height, 1);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error(t('practice_new.err_no_canvas', lang));
      ctx.drawImage(img, 0, 0, w, h);
      return await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => { if (b) resolve(b); else reject(new Error(t('practice_new.err_export', lang))); }, 'image/jpeg', 0.85);
      });
    } finally {
      URL.revokeObjectURL(url);
    }
  };

  const handleAvatarPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (e.target) e.target.value = ''; // 允许再选同一文件
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError(t('practice_new.err_pick_image', lang)); return; }
    setAvatarUploading(true);
    setError(null);
    try {
      const blob = await compressAvatar(file);
      const form = new FormData();
      form.append('file', blob, 'avatar.jpg');
      const res = await fetch('/api/companion/avatar', { method: 'POST', body: form, credentials: 'same-origin' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || t('practice_new.err_upload', lang));
      setAvatarUrl(data.avatarUrl);
    } catch (err) {
      setError((err as Error).message || t('practice_new.err_avatar_upload', lang));
    } finally {
      setAvatarUploading(false);
    }
  };

  // 用户自己的头像：传到 users.avatar_url，对话里代表"你"的头像随之更新
  const handleMyAvatarPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (e.target) e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError(t('practice_new.err_pick_image', lang)); return; }
    setMyAvatarUploading(true);
    setError(null);
    try {
      const blob = await compressAvatar(file);
      const form = new FormData();
      form.append('file', blob, 'avatar.jpg');
      const uploadRes = await fetch('/api/user/avatar', { method: 'POST', body: form, credentials: 'same-origin' });
      const uploadData = await uploadRes.json().catch(() => ({}));
      if (!uploadRes.ok) throw new Error(uploadData.error || t('practice_new.err_upload', lang));
      const patchRes = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ avatarUrl: uploadData.avatarUrl }),
      });
      if (!patchRes.ok) {
        const patchData = await patchRes.json().catch(() => ({}));
        throw new Error(patchData.error || t('practice_new.err_save_avatar', lang));
      }
      await refreshUser();
    } catch (err) {
      setError((err as Error).message || t('practice_new.err_avatar_upload', lang));
    } finally {
      setMyAvatarUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const payload = mode === 'free'
        ? {
            mode: 'free' as const,
            companionName: companionName.trim(),
            companionNameZh: companionNameZh.trim(),
            verbalTic: verbalTic.trim(),
            avatarUrl: avatarUrl || undefined,
            difficulty, characterId: characterId || undefined,
          }
        : {
            mode: 'scene' as const,
            place: place.trim(), situation: situation.trim(), goal: goal.trim(),
            difficulty, characterId: characterId || undefined,
          };
      const res = await fetch(isEdit ? `/api/practice/custom/${encodeURIComponent(editId!)}` : '/api/practice/custom', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || (isEdit ? t('practice_new.err_regenerate', lang) : t('practice_new.err_create', lang)));
      const targetId = isEdit ? editId! : data.id;
      // 专属陪练进独立聊天页；场景练习进 practice
      router.push(mode === 'free' ? `/companion/${targetId}` : `/practice/${targetId}`);
    } catch (err) {
      setError((err as Error).message || t('practice_new.err_generic', lang));
      setSubmitting(false);
    }
  };

  if (authLoading || !user || prefilling) {
    return (
      <div className="csn-root csn-center">
        <div className="csn-loading">{t('practice_new.loading', lang)}</div>
      </div>
    );
  }

  return (
    <div className="csn-root">
      <div className="csn-scroll">
        <div className="csn-topbar">
          <button className="csn-back" onClick={() => {
            const canBack = window.history.length > 1
              && (!document.referrer || new URL(document.referrer).origin === window.location.origin);
            if (canBack) router.back();
            else window.location.href = '/animal-city.html';
          }}>{isEdit ? t('practice_new.back', lang) : t('practice_new.back_city', lang)}</button>
          <button className="csn-home" onClick={() => { window.location.href = '/daily'; }} aria-label={t('practice_new.home_aria', lang)}>{t('practice_new.home', lang)}</button>
        </div>

        <div className="csn-hero">
          <span className="csn-tape csn-tape-tl" />
          <span className="csn-tape csn-tape-tr" />
          <div className="csn-hero-top">
            <div className="csn-hero-emoji">{mode === 'free' ? '💛' : '🐰'}</div>
            <div className="csn-hero-txt">
              <div className="csn-hero-eyebrow">CUSTOM · {isEdit ? (mode === 'free' ? t('practice_new.eyebrow_edit_companion', lang) : t('practice_new.eyebrow_edit_scene', lang)) : (mode === 'free' ? t('practice_new.eyebrow_new_companion', lang) : t('practice_new.eyebrow_new_scene', lang))}</div>
              <h1 className="csn-hero-title">{mode === 'free' ? (isEdit ? '내 짝꿍 다시 만들기' : '나만의 짝꿍 만들기') : (isEdit ? '장면 다시 만들기' : '나만의 장면 만들기')}</h1>
              <div className="csn-hero-sub">{mode === 'free' ? t('practice_new.hero_sub_companion', lang) : t('practice_new.hero_sub_scene', lang)}</div>
            </div>
          </div>
          <p className="csn-hero-lead">{mode === 'free'
            ? t('practice_new.hero_lead_companion', lang)
            : t('practice_new.hero_lead_scene', lang)}</p>
        </div>

        {!submitting && (
          <div className="csn-myavatar">
            <div className="csn-avatar-preview csn-myavatar-preview">
              {user.avatarUrl
                ? <img src={user.avatarUrl} alt={t('practice_new.my_avatar_alt', lang)} />
                : <span className="csn-avatar-emoji">🐰</span>}
            </div>
            <div className="csn-avatar-actions">
              <div className="csn-myavatar-title">{t('practice_new.my_avatar_title', lang)}</div>
              <button
                type="button"
                className="csn-avatar-upload"
                onClick={() => myAvatarInputRef.current?.click()}
                disabled={myAvatarUploading}
              >
                {myAvatarUploading ? t('practice_new.uploading', lang) : (user.avatarUrl ? t('practice_new.change_my_avatar', lang) : t('practice_new.set_my_avatar', lang))}
              </button>
              <div className="csn-avatar-hint">{t('practice_new.my_avatar_hint', lang)}</div>
            </div>
            <input
              ref={myAvatarInputRef} type="file" accept="image/*"
              style={{ display: 'none' }} onChange={handleMyAvatarPick}
            />
          </div>
        )}

        {!submitting && !isEdit && (
          <div className="csn-modeswitch">
            <button
              type="button"
              className={`csn-mode-opt${mode === 'scene' ? ' on' : ''}`}
              onClick={() => { setMode('scene'); setError(null); }}
            >
              <span className="csn-mode-emoji">🎭</span>
              <span className="csn-mode-txt"><b>{t('practice_new.mode_scene_title', lang)}</b><small>{t('practice_new.mode_scene_desc', lang)}</small></span>
            </button>
            <button
              type="button"
              className={`csn-mode-opt${mode === 'free' ? ' on' : ''}`}
              onClick={() => { setMode('free'); setError(null); if (!characterId) setCharacterId('tori'); }}
            >
              <span className="csn-mode-emoji">💛</span>
              <span className="csn-mode-txt"><b>{t('practice_new.mode_companion_title', lang)}</b><small>{t('practice_new.mode_companion_desc', lang)}</small></span>
            </button>
          </div>
        )}

        {submitting ? (
          <div className="csn-card csn-generating">
            <span className="csn-tape csn-tape-br" />
            <div className="csn-spinner" />
            <div className="csn-generating-text">{t((mode === 'free' ? GEN_STEPS_FREE : GEN_STEPS)[genStep], lang)}</div>
            <div className="csn-gen-steps">
              {(mode === 'free' ? GEN_STEPS_FREE : GEN_STEPS).map((_, i) => (
                <span key={i} className={`csn-gen-dot${i <= genStep ? ' on' : ''}`} />
              ))}
            </div>
            <div className="csn-generating-hint">{t('practice_new.generating_hint', lang)}</div>
          </div>
        ) : (
          <>
            <div className="csn-card">
              <span className="csn-tape csn-tape-br" />

              {mode === 'free' ? (
                <>
                  {/* 起名 */}
                  <div className="csn-field">
                    <div className="csn-label">
                      <span className="csn-label-num">01</span>
                      <span className="csn-label-emoji" aria-hidden>🏷️</span>
                      <span className="csn-label-text">{t('practice_new.name_label', lang)}</span>
                      <span className="csn-label-tag">{t('practice_new.name_tag', lang)}</span>
                      <span className="csn-label-count">{companionName.length}/40</span>
                    </div>
                    <input
                      className="csn-input" value={companionName} maxLength={40}
                      onChange={(e) => setCompanionName(e.target.value)}
                      placeholder={t('practice_new.name_ph', lang)}
                    />
                    <input
                      className="csn-input csn-input-sub" value={companionNameZh} maxLength={40}
                      onChange={(e) => setCompanionNameZh(e.target.value)}
                      placeholder={t('practice_new.name_zh_ph', lang)}
                    />
                  </div>

                  {/* 人设 · 提示词 */}
                  <div className="csn-field">
                    <div className="csn-label">
                      <span className="csn-label-num">02</span>
                      <span className="csn-label-emoji" aria-hidden>💬</span>
                      <span className="csn-label-text">{t('practice_new.persona_label', lang)}</span>
                      <span className="csn-label-tag">{t('practice_new.persona_tag', lang)}</span>
                      <span className="csn-label-count">{verbalTic.length}/300</span>
                    </div>
                    <textarea
                      className="csn-textarea" value={verbalTic} maxLength={300} rows={4}
                      onChange={(e) => setVerbalTic(e.target.value)}
                      placeholder={t('practice_new.persona_ph', lang)}
                    />
                  </div>
                </>
              ) : (
                FIELDS.map((f) => (
                  <div className="csn-field" key={f.key}>
                    <div className="csn-label">
                      <span className="csn-label-num">{f.num}</span>
                      <span className="csn-label-emoji" aria-hidden>{f.emoji}</span>
                      <span className="csn-label-text">{t(f.label, lang)}</span>
                      <span className="csn-label-tag">{t(f.tag, lang)}</span>
                      <span className="csn-label-count">{(values[f.key] ?? '').length}/200</span>
                    </div>
                    {f.multiline ? (
                      <textarea
                        className="csn-textarea" value={values[f.key]} maxLength={200} rows={f.rows}
                        onChange={(e) => setters[f.key](e.target.value)}
                        placeholder={t(f.ph, lang)}
                      />
                    ) : (
                      <input
                        className="csn-input" value={values[f.key]} maxLength={200}
                        onChange={(e) => setters[f.key](e.target.value)}
                        placeholder={t(f.ph, lang)}
                      />
                    )}
                  </div>
                ))
              )}

              {/* 难度 */}
              <div className="csn-field">
                <div className="csn-label">
                  <span className="csn-label-emoji" aria-hidden>📶</span>
                  <span className="csn-label-text">{t('practice_new.difficulty_label', lang)}</span>
                  <span className="csn-label-tag">{t('practice_new.difficulty_tag', lang)}</span>
                </div>
                <div className="csn-diff">
                  {DIFFICULTIES.map((d) => (
                    <button
                      key={d.key} type="button"
                      className={`csn-diff-opt${difficulty === d.key ? ' on' : ''}`}
                      onClick={() => setDifficulty(d.key)}
                    >
                      <span className="csn-diff-label">{t(d.label, lang)}</span>
                      <span className="csn-diff-desc">{t(d.desc, lang)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 谁来陪演 / 选形象 */}
              <div className="csn-field csn-field-last">
                <div className="csn-label">
                  <span className="csn-label-emoji" aria-hidden>🎭</span>
                  <span className="csn-label-text">{mode === 'free' ? t('practice_new.look_label', lang) : t('practice_new.cast_label', lang)}</span>
                  <span className="csn-label-tag">{mode === 'free' ? t('practice_new.look_tag', lang) : t('practice_new.cast_tag', lang)}</span>
                </div>

                {/* free 模式：大头像预览 + 上传自担照 */}
                {mode === 'free' && (
                  <div className="csn-avatar-row">
                    <div className="csn-avatar-preview">
                      {avatarUrl
                        ? <img src={avatarUrl} alt={t('practice_new.companion_avatar_alt', lang)} />
                        : <span className="csn-avatar-emoji">{SCENE_CAST.find((c) => c.id === characterId)?.emoji || '💛'}</span>}
                    </div>
                    <div className="csn-avatar-actions">
                      <button
                        type="button"
                        className="csn-avatar-upload"
                        onClick={() => avatarInputRef.current?.click()}
                        disabled={avatarUploading}
                      >
                        {avatarUploading ? t('practice_new.uploading', lang) : (avatarUrl ? t('practice_new.change_photo', lang) : t('practice_new.upload_photo', lang))}
                      </button>
                      {avatarUrl && (
                        <button type="button" className="csn-avatar-clear" onClick={() => setAvatarUrl('')}>
                          {t('practice_new.use_preset', lang)}
                        </button>
                      )}
                      <div className="csn-avatar-hint">{t('practice_new.photo_hint', lang)}</div>
                    </div>
                    <input
                      ref={avatarInputRef} type="file" accept="image/*"
                      style={{ display: 'none' }} onChange={handleAvatarPick}
                    />
                  </div>
                )}

                <div className="csn-cast">
                  {mode === 'scene' && (
                    <button
                      type="button"
                      className={`csn-cast-opt csn-cast-auto${characterId === '' ? ' on' : ''}`}
                      onClick={() => setCharacterId('')}
                    >
                      <span className="csn-cast-emoji">✨</span>
                      <span className="csn-cast-name">{t('practice_new.cast_auto', lang)}</span>
                    </button>
                  )}
                  {SCENE_CAST.map((c) => (
                    <button
                      key={c.id} type="button"
                      className={`csn-cast-opt${characterId === c.id ? ' on' : ''}`}
                      onClick={() => setCharacterId(c.id)}
                      title={c.persona}
                    >
                      <span className="csn-cast-emoji">{c.emoji}</span>
                      <span className="csn-cast-name">{c.nameZh}</span>
                    </button>
                  ))}
                </div>
              </div>

              {error && <div className="csn-error">{error}</div>}
            </div>

            <div className="csn-actions">
              {mode === 'scene' && (
                <button className="csn-example-btn" onClick={fillExample} type="button">{t('practice_new.random_example', lang)}</button>
              )}
              <button className="csn-submit" onClick={handleSubmit} disabled={!canSubmit}>
                {mode === 'free'
                  ? (isEdit ? t('practice_new.submit_regenerate', lang) : t('practice_new.submit_companion', lang))
                  : (isEdit ? t('practice_new.submit_regenerate', lang) : t('practice_new.submit_scene', lang))}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
