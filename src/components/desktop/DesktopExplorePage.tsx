'use client';

import { useRouter } from 'next/navigation';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '@/app/explore/explore-plaza.css';

export function DesktopExplorePage() {
  const router = useRouter();
  const { lang } = useLang();

  return (
    <div className="plaza-root">
      <header className="pz-masthead pz-enter pz-d1">
        <span className="pz-streak">{t('explore.daily_update', lang)}</span>
        <div className="pz-eyebrow"><span className="pz-dot" />EXPLORE · 동물 도시</div>
        <h1 className="pz-title">{t('explore.title_a', lang)}<em>{t('explore.title_b', lang)}</em></h1>
        <p className="pz-dek"><span className="en">Plaza —</span>{t('explore.dek', lang)}</p>
      </header>

      <button className="pz-card pz-cover pz-enter pz-d2" onClick={() => router.push('/blog')}>
        <div className="pz-bgtext">Blog</div>
        <div className="pz-cover-body">
          <span className="pz-kicker">{t('explore.cover_kicker', lang)}</span>
          <h2 className="pz-cover-h">{t('explore.cover_title', lang)}</h2>
          <p className="pz-cover-p">{t('explore.cover_desc', lang)}</p>
          <span className="pz-cover-cta"><span className="u">{t('explore.cover_cta', lang)}</span> →</span>
        </div>
        <div className="pz-cover-fig">
          <div className="pz-post">
            <div className="pz-post-head">
              <div className="pz-av-ring"><div className="in">🐰</div></div>
              <div className="pz-post-meta">
                <div className="n">{t('explore.post_name', lang)}</div>
                <div className="h">@tori_seoul</div>
              </div>
            </div>
            <div className="pz-post-kr">“오늘 홍대에서 친구를 만났어요. 거리 공연이 진짜 멋졌어요!”</div>
            <div className="pz-post-zh">{t('explore.post_zh', lang)}</div>
            <div className="pz-post-foot">{t('explore.post_foot', lang)}<span className="heart">♥ 읽고 배우기</span></div>
          </div>
        </div>
      </button>

      <button className="pz-card pz-radio pz-enter pz-d3" onClick={() => router.push('/radio')}>
        <div className="pz-bgtext">RADIO</div>
        <div className="pz-radio-main">
          <div className="pz-radio-top">
            <div className="pz-radio-icon">🎙️</div>
          </div>
          <div className="pz-radio-info">
            <div className="pz-radio-title">{t('explore.radio_title', lang)}</div>
            <div className="pz-radio-zh">{t('explore.radio_sub', lang)}</div>
            <div className="pz-radio-now">{t('explore.radio_now', lang)}</div>
            <div className="pz-wave-row">
              <div className="pz-waves"><span /><span /><span /><span /><span /><span /><span /><span /></div>
              <span className="pz-badge pz-badge-live"><span className="pz-dot" />ON AIR</span>
            </div>
          </div>
        </div>
        <div className="pz-radio-fig">
          <div className="pz-show">
            <div className="pz-show-top"><span className="eq"><i /><i /><i /></span>{t('explore.radio_show_top', lang)}</div>
            <div className="pz-show-hosts">
              <span className="avs"><span>🦊</span><span>🐰</span></span>
              <span className="duo">{t('explore.radio_duo', lang)}</span>
            </div>
            <div className="pz-show-h">{t('explore.radio_show_h', lang)}</div>
            <div className="pz-show-p">{t('explore.radio_show_p', lang)}</div>
            <span className="pz-show-tag">{t('explore.radio_show_tag', lang)}</span>
          </div>
        </div>
      </button>

      <div className="pz-index-head pz-enter pz-d4">
        <span className="pz-index-title">More in this issue</span>
        <span className="pz-index-sub">{t('explore.index_sub', lang)}</span>
      </div>

      <div className="pz-rows">
        <button className="pz-card pz-tile pz-lumi pz-enter pz-d5" onClick={() => router.push('/lumi-paw.html')}>
          <div className="pz-tile-top"><div className="pz-tile-emoji">🌟</div></div>
          <div className="pz-tile-body">
            <div className="pz-tile-h">{t('explore.tile_lumi', lang)}</div>
            <div className="pz-tile-zh">{t('explore.tile_lumi_sub', lang)}</div>
          </div>
          <div className="pz-arrow">→</div>
        </button>

        <button className="pz-card pz-tile pz-sticker pz-enter pz-d5" onClick={() => router.push('/sticker.html')}>
          <div className="pz-tile-top"><div className="pz-tile-emoji">✨</div></div>
          <div className="pz-tile-body">
            <div className="pz-tile-h">{t('explore.tile_sticker', lang)}</div>
            <div className="pz-tile-zh">{t('explore.tile_sticker_sub', lang)}</div>
          </div>
          <div className="pz-arrow">→</div>
        </button>
      </div>

      <p className="pz-colophon pz-enter pz-d7">{t('explore.colophon', lang)}</p>
    </div>
  );
}
