'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { BLOG_AVATARS } from '@/data/blogAvatars';
import type { BlogUserStats } from '@/types';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

// 首次进博客：选一只预制动物形象 + 起昵称，作为动物城里的社媒身份。
export default function BlogOnboarding({ onDone, onClose }: { onDone: (stats: BlogUserStats) => void; onClose: () => void }) {
  const { lang } = useLang();
  const [animalId, setAnimalId] = useState('');
  const [nickname, setNickname] = useState('');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const canSubmit = animalId && nickname.trim().length > 0 && nickname.trim().length <= 20;

  const submit = async () => {
    if (!canSubmit || saving) return;
    setSaving(true);
    setErr('');
    try {
      const res = await fetch('/api/blog/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ animalId, nickname: nickname.trim() }),
      });
      if (!res.ok) {
        setErr(t('blog.onb_save_failed', lang));
        setSaving(false);
        return;
      }
      const { stats } = await res.json();
      onDone(stats);
    } catch {
      setErr(t('blog.onb_network_error', lang));
      setSaving(false);
    }
  };

  if (!mounted) return null;
  return createPortal(
    <div className="blog-root blog-onb" onClick={onClose}>
      <div className="blog-onb-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="blog-onb-close"
          aria-label={`닫기 · ${t('blog.aria_close', lang)}`}
          onClick={onClose}
        >
          ✕
        </button>
        <div className="blog-onb-title">{t('blog.onb_title', lang)}</div>
        <div className="blog-onb-sub">{t('blog.onb_sub', lang)}</div>

        <div className="blog-onb-gallery">
          {BLOG_AVATARS.map((a) => (
            <button
              key={a.id}
              type="button"
              className={`blog-onb-animal${animalId === a.id ? ' selected' : ''}`}
              onClick={() => setAnimalId(a.id)}
              aria-pressed={animalId === a.id}
            >
              {a.imageUrl ? (
                <Image className="blog-onb-avatar-img" src={a.imageUrl} alt={a.name} width={52} height={52} />
              ) : (
                <span className="blog-onb-emoji">{a.emoji}</span>
              )}
              <span className="blog-onb-name">{a.name}</span>
            </button>
          ))}
        </div>

        <input
          className="blog-onb-input"
          type="text"
          value={nickname}
          maxLength={20}
          placeholder={t('blog.onboarding_nickname_hint', lang)}
          onChange={(e) => setNickname(e.target.value)}
        />

        {err && <div className="blog-onb-err">{err}</div>}

        <button
          type="button"
          className="blog-onb-submit"
          disabled={!canSubmit || saving}
          onClick={submit}
        >
          {saving ? t('blog.onb_saving', lang) : t('blog.onb_start', lang)}
        </button>
      </div>
    </div>,
    document.body,
  );
}
