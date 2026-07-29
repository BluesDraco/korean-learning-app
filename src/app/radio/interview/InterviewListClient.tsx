'use client';

import '../radio.css';
import './interview.css';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import type { RadioCard } from '@/types';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

// 列表里去掉重复的节目名前缀，只留话题本身（如"여우의 인터뷰 카페 · 유학 첫해…" → "유학 첫해…"）
function topicKo(title: string): string {
  const i = title.indexOf('·');
  return i >= 0 ? title.slice(i + 1).trim() : title;
}
function topicZh(zh: string): string {
  return zh.replace(/^.*·\s*/, '');
}

export default function InterviewListClient() {
  const router = useRouter();
  const { lang } = useLang();
  const goBack = useSmartBack('/radio');

  const [episodes, setEpisodes] = useState<RadioCard[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    fetch('/api/radio/interview')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d) return;
        if (Array.isArray(d.episodes)) setEpisodes(d.episodes);
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const open = (id: string) => router.push(`/radio/${id}`);

  if (loading) {
    return (
      <div className="radio-root itv-page">
        <div className="radio-skeleton">
          <div className="radio-sk-header" />
          <div className="radio-sk-np" />
          <div className="radio-sk-row" />
          <div className="radio-sk-row" />
          <div className="radio-sk-row" />
        </div>
      </div>
    );
  }

  const featured = episodes[0];
  const rest = episodes.slice(1);

  return (
    <div className="radio-root itv-page">
      {/* ── 顶栏 ── */}
      <header className="itv-top">
        <button className="itv-back" onClick={goBack} aria-label={t('radio.back', lang)}>←</button>
        <span className="itv-top-tag">여우의 인터뷰 카페</span>
      </header>

      {/* ── 刊头（全宽，编辑感）── */}
      <div className="itv-masthead">
        <div className="itv-mast-main">
          <div className="itv-mast-kicker">{t('radio.itvKicker', lang)} · LATE NIGHT TALK</div>
          <h1 className="itv-mast-title">{t('radio.itvTitleA', lang)}<br />{t('radio.itvTitleB', lang)}</h1>
        </div>
        <p className="itv-mast-sub">
          늦은 밤, 한 사람의 진짜 이야기.<br />
          유학·일·사회·문화를 깊이 있게 듣는 인터뷰.
        </p>
      </div>

      {/* ── 本期特写（全宽电影感带）── */}
      {featured && (
        <button
          className="itv-feature radio-press"
          onClick={() => open(featured.id)}
        >
          <span className="itv-feature-num" aria-hidden="true">01</span>
          <span className="itv-feature-glow" aria-hidden="true" />
          <span className="itv-feature-inner">
            <span className="itv-feature-kicker">
              <span className="itv-feature-live">지금 이야기 중</span>
              이번 주의 이야기
            </span>
            <span className="itv-feature-title">{topicKo(featured.title)}</span>
            <span className="itv-feature-zh">{topicZh(featured.titleZh)}</span>
            <span className="itv-feature-foot">
              <span className="itv-feature-play">▶ 지금 듣기</span>
              <span className="itv-feature-meta">🦊 {featured.host} 진행 · {featured.duration}</span>
            </span>
          </span>
        </button>
      )}

      {/* ── 往期索引（两列杂志目录）── */}
      {rest.length > 0 && (
        <section className="itv-archive">
          <div className="itv-archive-head">
            <span className="itv-archive-kicker">지난 이야기</span>
            <span className="itv-archive-rule" aria-hidden="true" />
            <span className="itv-archive-count">{t('radio.itv_count', lang, { n: episodes.length })}</span>
          </div>
          <ul className="itv-grid">
            {rest.map((ep, i) => (
              <li key={ep.id}>
                <button
                  className="itv-row radio-rise"
                  style={{ ['--i' as string]: i }}
                  onClick={() => open(ep.id)}
                >
                  <span className="itv-row-num">{String(i + 2).padStart(2, '0')}</span>
                  <span className="itv-row-body">
                    <span className="itv-row-title">{topicKo(ep.title)}</span>
                    <span className="itv-row-zh">{topicZh(ep.titleZh)}</span>
                  </span>
                  <span className="itv-row-dur">{ep.duration}</span>
                  <span className="itv-row-go" aria-hidden="true">→</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
