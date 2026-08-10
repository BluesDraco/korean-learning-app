'use client';

import './map.css';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Share, MoreVertical, Home, Monitor } from 'lucide-react';
import { useSmartBack } from '@/lib/useSmartBack';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import { t } from '@/lib/i18n';
import {
  getDiaryProgress,
  getVocabProgress,
  getPhoneticProgress,
  getGrammarProgress,
} from '@/lib/progress/dailyHero';

// 学习路线 = 动物城寻宝地图。手绘小路串起 7 个地标贴纸，配手账便签卡。
// 手机单列（奇偶左右轻摆），桌面左右交替（小路走中线）。同一套 JSX，靠 CSS 切换。
interface Step {
  id: string;
  href: string;
  img: string;
}

const STEPS: Step[] = [
  { id: 'phonetics', href: '/phonetics', img: '/images/map/place-phonetics.png' },
  { id: 'diary',     href: '/diary',     img: '/images/map/tori-map.png' },
  { id: 'grammar',   href: '/grammar',   img: '/images/map/place-grammar.png' },
  { id: 'reading',   href: '/reading',   img: '/images/map/place-library.png' },
  { id: 'practice',  href: '/practice',  img: '/images/map/place-practice.png' },
  { id: 'plaza',     href: '/blog',      img: '/images/map/place-plaza.png' },
  { id: 'radio',     href: '/radio',     img: '/images/map/place-radio.png' },
];

// Catmull-Rom → 三次贝塞尔，生成穿过所有点的平滑曲线
function buildSmoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export default function MapPage() {
  const { lang } = useLang();
  const { user } = useAuth();
  const { canInstall, promptInstall } = useInstallPrompt();
  const back = useSmartBack('/daily');
  const [currentDay, setCurrentDay] = useState(1);
  const [progress, setProgress] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState<'install' | 'route'>('install');

  // 桌面曲线：读每个地标图的真实位置动态生成，避免登录态卡片变高导致的错位
  const routeRef = useRef<HTMLOListElement>(null);
  const [deskPath, setDeskPath] = useState('');
  const [deskBox, setDeskBox] = useState('0 0 640 1300');

  useEffect(() => {
    if (!user) { setLoaded(true); return; }
    (async () => {
      try {
        const [diary, vocab, phon, gram] = await Promise.all([
          getDiaryProgress(user.id),
          getVocabProgress(),
          getPhoneticProgress(user.id),
          getGrammarProgress(user.id),
        ]);
        setCurrentDay(diary.currentDay);
        setProgress({
          phonetics: phon.total > 0 ? t('map.prog_phon', lang, { done: String(phon.completed), total: String(phon.total) }) : '',
          diary: t('map.prog_diary', lang, { done: String(diary.completedCount), total: String(diary.total) }),
          grammar: gram.total > 0 ? t('map.prog_gram', lang, { done: String(gram.completed), total: String(gram.total) }) : '',
          reading: vocab.total > 0 ? t('map.prog_vocab', lang, { mastered: String(vocab.mastered), total: String(vocab.total) }) : '',
        });
      } catch { /* ignore */ }
      finally { setLoaded(true); }
    })();
  }, [user, lang]);

  // 测量每个地标图的驿站点（图底部圆点处），生成穿过它们的平滑曲线。
  // 依赖 loaded：登录态进度行渲染后卡片变高，需重新测量。
  useEffect(() => {
    const route = routeRef.current;
    if (!route) return;

    const measure = () => {
      const pins = [...route.querySelectorAll<HTMLElement>('.guide__pin')];
      if (pins.length < 2) return;
      const box = route.getBoundingClientRect();
      const pts = pins.map((pin) => {
        const r = pin.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height - 16 };
      });
      setDeskBox(`0 0 ${Math.round(box.width)} ${Math.round(box.height)}`);
      setDeskPath(buildSmoothPath(pts));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(route);
    window.addEventListener('resize', measure);
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); };
  }, [loaded, lang, tab]);

  return (
    <div className="guide">
      <button className="guide__back" onClick={back} aria-label={t('common.back', lang)}>
        <ArrowLeft size={18} strokeWidth={2.4} />
      </button>

      <div className={'guide__wrap' + (tab === 'install' ? ' guide__wrap--install' : '')}>
        <header className="guide__head">
          <h1 className="guide__title">{t('map.title', lang)}</h1>
          <p className="guide__sub">{t('map.sub', lang)}</p>
        </header>

        {/* Tab 切换：装到桌面 / 学习路线 */}
        <div className="guide__tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === 'install'}
            className={'guide__tab' + (tab === 'install' ? ' is-active' : '')}
            onClick={() => setTab('install')}
          >
            <Home size={15} strokeWidth={2.4} aria-hidden />
            {t('map.tab_install', lang)}
          </button>
          <button
            role="tab"
            aria-selected={tab === 'route'}
            className={'guide__tab' + (tab === 'route' ? ' is-active' : '')}
            onClick={() => setTab('route')}
          >
            <MapPin size={15} strokeWidth={2.4} aria-hidden />
            {t('map.tab_route', lang)}
          </button>
        </div>

        {tab === 'route' && (
        <>
        {loaded && user && (
          <p className="guide__now">{t('map.now', lang, { n: String(currentDay) })}</p>
        )}
        <ol className="guide__route" ref={routeRef}>
          {/* 手绘小路。手机端固定蜿蜒装饰；桌面端动态穿过每个地标圆点（由 CSS 切换显隐）。 */}
          <svg className="guide__path guide__path--phone" viewBox="0 0 360 1680" preserveAspectRatio="none" aria-hidden>
            <path
              d="M 180 30 C 90 150, 270 230, 180 350 C 90 470, 270 550, 180 680 C 90 800, 270 880, 180 1010 C 90 1130, 270 1210, 180 1340 C 90 1460, 270 1540, 180 1660"
              fill="none" stroke="oklch(74% 0.06 60)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 13" opacity="0.7"
            />
          </svg>
          <svg className="guide__path guide__path--desk" viewBox={deskBox} preserveAspectRatio="none" aria-hidden>
            {deskPath && (
              <path
                d={deskPath}
                fill="none" stroke="oklch(74% 0.06 60)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 14" opacity="0.62"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>

          {STEPS.map((s, i) => (
            <li key={`${s.id}-${i}`} className="guide__stop" style={{ ['--i' as string]: i }}>
              <Link href={s.href} className="guide__stop-link" aria-label={t(`map.${s.id}.title`, lang)}>
                <span className="guide__pin-cell" aria-hidden>
                  <span className="guide__pin">
                    <span className="guide__num">{i + 1}</span>
                    <Image src={s.img} alt="" width={180} height={180} />
                  </span>
                </span>

                <span className="guide__note-cell">
                  <span className="guide__note">
                    <span className="guide__note-title">{t(`map.${s.id}.title`, lang)}</span>
                    <span className="guide__note-when"><MapPin size={12} strokeWidth={2.4} aria-hidden />{t(`map.${s.id}.when`, lang)}</span>
                    <span className="guide__note-what">{t(`map.${s.id}.what`, lang)}</span>
                    {progress[s.id] && <span className="guide__note-prog">{progress[s.id]}</span>}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <footer className="guide__foot">{t('map.footer', lang)}</footer>
        </>
        )}

        {/* 加桌面引导（iOS / 安卓分栏图文） */}
        {tab === 'install' && (
        <section className="guide__install">
          <div className="guide__install-head">
            <span className="guide__install-icon"><Home size={22} strokeWidth={2.2} aria-hidden /></span>
            <h2 className="guide__install-title">{t('map.install.title', lang)}</h2>
            <p className="guide__install-sub">{t('map.install.sub', lang)}</p>
          </div>
          {canInstall && (
            <div className="guide__install-onetap">
              <button className="guide__install-btn" onClick={() => { void promptInstall(); }}>
                <Home size={17} strokeWidth={2.4} aria-hidden />
                {t('map.install.one_tap', lang)}
              </button>
              <p className="guide__install-onetap-hint">{t('map.install.one_tap_hint', lang)}</p>
            </div>
          )}
          <div className="guide__install-cols">
            <div className="guide__install-col">
              <div className="guide__install-col-head">
                <Share size={16} strokeWidth={2.2} aria-hidden />
                {t('map.install.ios_head', lang)}
              </div>
              <ol className="guide__install-steps">
                <li>{t('map.install.ios_1', lang)}</li>
                <li>{t('map.install.ios_2', lang)}</li>
                <li>{t('map.install.ios_3', lang)}</li>
                <li>{t('map.install.ios_4', lang)}</li>
              </ol>
            </div>
            <div className="guide__install-col">
              <div className="guide__install-col-head">
                <MoreVertical size={16} strokeWidth={2.2} aria-hidden />
                {t('map.install.android_head', lang)}
              </div>
              <ol className="guide__install-steps">
                <li>{t('map.install.android_1', lang)}</li>
                <li>{t('map.install.android_2', lang)}</li>
                <li>{t('map.install.android_3', lang)}</li>
                <li>{t('map.install.android_4', lang)}</li>
              </ol>
            </div>
            <div className="guide__install-col">
              <div className="guide__install-col-head">
                <Monitor size={16} strokeWidth={2.2} aria-hidden />
                {t('map.install.desktop_head', lang)}
              </div>
              <ol className="guide__install-steps">
                <li>{t('map.install.desktop_1', lang)}</li>
                <li>{t('map.install.desktop_2', lang)}</li>
                <li>{t('map.install.desktop_3', lang)}</li>
                <li>{t('map.install.desktop_4', lang)}</li>
              </ol>
            </div>
          </div>
        </section>
        )}
      </div>
    </div>
  );
}
