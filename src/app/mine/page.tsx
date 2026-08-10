'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, Settings } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/gamification';
import { checkAchievements } from '@/lib/achievements/check';
import { ACHIEVEMENT_BY_ID } from '@/data/achievements';
import UserAvatar from '@/components/UserAvatar';
import type { Tier } from '@/lib/membership-benefits';
import type { AchievementProgress } from '@/types';
import './mine-home.css';

interface HomeData {
  level: number;
  streak: number;
  unlocked: number;
  achTotal: number;
  nextAch: { icon: string; title: string; rarity: string } | null;
  mistakes: { dict: number; vocab: number; ai: number; total: number; preview: { ko: string; zh: string; tag: string }[] };
  recordings: number;
  unread: number;
  msgPreview: { title: string; isNew: boolean }[];
}

export default function MineHomePage() {
  const { lang } = useLang();
  const { user } = useAuth();
  const router = useRouter();
  const [tier, setTier] = useState<Tier>('free');
  const [expiry, setExpiry] = useState<number | null>(null);
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    if (!user) return;
    const ctrl = new AbortController();

    // 会员状态
    fetch('/api/membership/me', { signal: ctrl.signal, cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d) { setTier(d.tier ?? 'free'); setExpiry(typeof d.expiry === 'number' ? d.expiry : null); } })
      .catch(() => {});

    // 本地数据聚合
    (async () => {
      const [profile, achRes, dictAll, vocab, ai, recs] = await Promise.all([
        getProfile().catch(() => null),
        checkAchievements(user.id).catch(() => null),
        db.dictationRecords.filter(r => !r.correct).catch(() => []),
        db.spellingMistakes.toArray().catch(() => []),
        db.aiChatMistakes.toArray().catch(() => []),
        db.recordings.toArray().catch(() => []),
      ]);

      // 错题去重预览（默写按 wordId 去重取前 2）
      const dictWords = new Map<string, string>();
      for (const r of dictAll) if (!dictWords.has(r.wordId)) dictWords.set(r.wordId, r.meaning || '');
      const preview: { ko: string; zh: string; tag: string }[] = [];
      for (const [ko, zh] of dictWords) { if (preview.length < 2) preview.push({ ko, zh, tag: t('minehome.tag_dictation', lang) }); }
      for (const m of vocab) { if (preview.length < 2) preview.push({ ko: m.word, zh: m.meaning || '', tag: t('minehome.tag_vocab', lang) }); }

      // 下一个成就
      let nextAch: HomeData['nextAch'] = null;
      if (achRes) {
        let best: { p: AchievementProgress; ratio: number } | null = null;
        for (const p of achRes.list) {
          const def = ACHIEVEMENT_BY_ID[p.id];
          if (!def || p.unlocked || def.goal <= 1) continue;
          const ratio = p.current / def.goal;
          if (ratio > 0 && (!best || ratio > best.ratio)) best = { p, ratio };
        }
        if (best) { const d = ACHIEVEMENT_BY_ID[best.p.id]; nextAch = { icon: d.icon, title: d.title, rarity: d.rarity }; }
      }

      // 未读消息 + 预览
      let unread = 0;
      let msgPreview: HomeData['msgPreview'] = [];
      try {
        const [uRes, listRes] = await Promise.all([
          fetch('/api/announcements/unread', { cache: 'no-store' }).then(r => r.ok ? r.json() : { count: 0 }),
          fetch('/api/announcements', { cache: 'no-store' }).then(r => r.ok ? r.json() : []),
        ]);
        unread = uRes?.count ?? 0;
        if (Array.isArray(listRes)) msgPreview = listRes.slice(0, 2).map((m: { title: string; read: boolean }) => ({ title: m.title, isNew: !m.read }));
      } catch { /* ignore */ }

      const dictCount = dictWords.size;
      setData({
        level: achRes?.level ?? profile?.level ?? 1,
        streak: achRes?.longestStreak ?? profile?.longestStreak ?? 0,
        unlocked: achRes?.unlockedCount ?? 0,
        achTotal: achRes?.list.length ?? 30,
        nextAch,
        mistakes: { dict: dictCount, vocab: vocab.length, ai: ai.length, total: dictCount + vocab.length + ai.length, preview },
        recordings: recs.length,
        unread,
        msgPreview,
      });
    })();

    return () => ctrl.abort();
  }, [user, lang]);

  if (!user) {
    return (
      <div className="mine-scope mine-bg">
        <div className="mine-stage">
          <div className="mine-guest">
            <div className="mine-guest-ic">🐰</div>
            <p className="mine-guest-t">{t('minehome.login_title', lang)}</p>
            <button className="mine-guest-btn" onClick={() => router.push('/auth/login?redirect=/mine')}>{t('minehome.login_btn', lang)}</button>
          </div>
        </div>
      </div>
    );
  }

  const memActive = tier !== 'free';
  const daysLeft = expiry ? Math.max(0, Math.ceil((expiry - Date.now()) / 86400000)) : null;

  return (
    <div className="mine-scope mine-bg">
      <div className="mine-stage">

        {/* 家 Hero */}
        <div className="mine-hero">
          <div className="mine-avatar">
            <div className="mine-avatar-inner">
              {user.avatarUrl
                ? <UserAvatar avatarUrl={user.avatarUrl} name={user.nickname || user.username} size={92} />
                : <span className="mine-avatar-fallback">{(user.nickname || user.username || '兔').charAt(0)}</span>}
            </div>
          </div>
          <div className="mine-greet">
            <div className="mine-eyebrow">MY LITTLE HOME</div>
            <div className="mine-name">
              <span className="mine-name-greeting">{t('minehome.welcome_greeting', lang)}{t('minehome.welcome_sep', lang)}</span>
              <span className="mine-name-user">{user.nickname || user.username}</span>
            </div>
            <div className="mine-hsub">
              {t('minehome.together_days', lang, { n: data?.streak ?? 0 })}
              {memActive && <span className="mine-mem-badge"><Crown size={12} /> {t(`mbadge.tier.${tier}`, lang)}</span>}
            </div>
          </div>
          <button className="mine-settings-btn" onClick={() => router.push('/settings')} aria-label={t('minehome.settings', lang)}>
            <Settings size={18} />
          </button>
          <div className="mine-mini">
            <div className="mine-mini-item"><div className="mine-mini-num gold">Lv.{data?.level ?? '—'}</div><div className="mine-mini-label">{t('minehome.stat_level', lang)}</div></div>
            <div className="mine-mini-item"><div className="mine-mini-num pink">{data?.streak ?? 0}</div><div className="mine-mini-label">{t('minehome.stat_streak', lang)}</div></div>
            <div className="mine-mini-item"><div className="mine-mini-num purple">{data?.unlocked ?? 0}</div><div className="mine-mini-label">{t('minehome.stat_ach', lang)}</div></div>
          </div>
        </div>

        {/* 会员中心 */}
        <div className="mine-sec-head"><span className="mine-sec-title">{t('minehome.sec_membership', lang)}</span><span className="mine-sec-kr">멤버십</span></div>
        <div className={`mc-banner ${memActive ? '' : 'is-free'}`}>
          <div>
            <span className="mc-eyebrow">
              <Crown size={13} />
              {memActive
                ? t('minehome.mc_active_eyebrow', lang, { tier: t(`mbadge.tier.${tier}`, lang), days: daysLeft ?? '∞' })
                : t('minehome.mc_free_eyebrow', lang)}
            </span>
            <div className="mc-title">{memActive ? t('minehome.mc_active_title', lang) : t('minehome.mc_free_title', lang)}</div>
            <div className="mc-desc">{memActive ? t('minehome.mc_active_desc', lang) : t('minehome.mc_free_desc', lang)}</div>
          </div>
          <button className="mc-cta" onClick={() => router.push('/membership')}>
            {memActive ? t('minehome.mc_manage', lang) : t('minehome.mc_upgrade', lang)} →
          </button>
        </div>

        {/* 我的四宝 */}
        <div className="mine-sec-head"><span className="mine-sec-title">{t('minehome.sec_treasures', lang)}</span><span className="mine-sec-kr">나의 보물</span></div>
        <div className="mine-grid4">

          {/* 错题本 */}
          <a className="fcard" onClick={() => router.push('/mine/mistakes')}>
            <div className="fcard-top">
              <div className="fcard-ic pink">📕</div>
              <div className="fcard-titles"><div className="fcard-title">{t('minehome.card_mistakes', lang)}</div><div className="fcard-kr">틀린 문제</div></div>
              {(data?.mistakes.total ?? 0) > 0 && <span className="fcard-badge">{t('minehome.badge_review', lang, { n: data!.mistakes.total })}</span>}
            </div>
            <div className="fcard-preview">
              {data && data.mistakes.preview.length > 0
                ? data.mistakes.preview.map((m, i) => (
                    <div className="prev-row" key={i}><span className="ko">{m.ko}</span> {m.zh} <span className="prev-tag">{m.tag}</span></div>
                  ))
                : <div className="prev-empty">{t('minehome.mistakes_empty', lang)}</div>}
            </div>
            <div className="fcard-foot"><span className="fcard-link">{t('minehome.go_review', lang)} →</span><span className="mini-stat">{t('minehome.mistakes_kinds', lang)}</span></div>
          </a>

          {/* 录音馆 */}
          <a className="fcard" onClick={() => router.push('/mine/recordings')}>
            <div className="fcard-top">
              <div className="fcard-ic mint">🎙️</div>
              <div className="fcard-titles"><div className="fcard-title">{t('minehome.card_recordings', lang)}</div><div className="fcard-kr">내 녹음</div></div>
              {(data?.recordings ?? 0) > 0 && <span className="fcard-badge mint">{t('minehome.badge_clips', lang, { n: data!.recordings })}</span>}
            </div>
            <div className="fcard-preview">
              {(data?.recordings ?? 0) > 0
                ? <div className="prev-row"><span className="wave"><i style={{ height: 8 }} /><i style={{ height: 16 }} /><i style={{ height: 22 }} /><i style={{ height: 12 }} /><i style={{ height: 18 }} /><i style={{ height: 7 }} /></span> {t('minehome.rec_hint', lang, { n: data!.recordings })}</div>
                : <div className="prev-empty">{t('minehome.rec_empty', lang)}</div>}
            </div>
            <div className="fcard-foot"><span className="fcard-link mint">{t('minehome.go_listen', lang)} →</span><span className="mini-stat">{t('minehome.rec_kinds', lang)}</span></div>
          </a>

          {/* 成就墙 */}
          <a className="fcard" onClick={() => router.push('/achievement')}>
            <div className="fcard-top">
              <div className="fcard-ic gold">🏆</div>
              <div className="fcard-titles"><div className="fcard-title">{t('minehome.card_achievements', lang)}</div><div className="fcard-kr">업적</div></div>
              <span className="fcard-badge gold">{data?.unlocked ?? 0}/{data?.achTotal ?? 30}</span>
            </div>
            <div className="fcard-preview">
              <div className="badge-row">
                <span className="badge-ring legend"><span>🎓</span></span>
                <span className="badge-ring rare"><span>🔥</span></span>
                <span className="badge-ring common"><span>📝</span></span>
                <span className="badge-hint">{data?.nextAch ? t('minehome.next_ach', lang, { name: data.nextAch.title }) : t('minehome.ach_hint', lang)}</span>
              </div>
            </div>
            <div className="fcard-foot"><span className="fcard-link gold">{t('minehome.go_achievements', lang)} →</span><span className="mini-stat">{t('minehome.ach_kinds', lang)}</span></div>
          </a>

          {/* 编帖箱 */}
          <a className="fcard" onClick={() => router.push('/messages')}>
            <div className="fcard-top">
              <div className="fcard-ic purple">💌</div>
              <div className="fcard-titles"><div className="fcard-title">{t('minehome.card_messages', lang)}</div><div className="fcard-kr">내 편지함</div></div>
              {(data?.unread ?? 0) > 0 && <span className="fcard-badge purple">{t('minehome.badge_unread', lang, { n: data!.unread })}</span>}
            </div>
            <div className="fcard-preview">
              {data && data.msgPreview.length > 0
                ? data.msgPreview.map((m, i) => (
                    <div className={`prev-row ${m.isNew ? 'strong' : ''}`} key={i}>{m.title} {m.isNew && <span className="prev-tag" style={{ color: 'var(--au-purple-deep)' }}>{t('minehome.tag_new', lang)}</span>}</div>
                  ))
                : <div className="prev-empty">{t('minehome.msg_empty', lang)}</div>}
            </div>
            <div className="fcard-foot"><span className="fcard-link purple">{t('minehome.go_messages', lang)} →</span><span className="mini-stat">{t('minehome.msg_kinds', lang)}</span></div>
          </a>

        </div>

        <p className="mine-note">여기는 동물 도시의 나의 집 · {t('minehome.footer', lang)}</p>
      </div>
    </div>
  );
}
