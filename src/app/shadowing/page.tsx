'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { shadowingClips } from '@/data/shadowingClips';
import { useTheme } from '@/components/ThemeProvider';
import { LIGHT_C as _LIGHT_C, DARK_C as _DARK_C } from '@/lib/theme';

const LIGHT_C = { ..._LIGHT_C, cream: '#fff8f4', mintText: '#4e746d', shadow: '0 16px 42px rgba(78,52,46,.10)', strong: '0 28px 72px rgba(78,52,46,.18)' };
const DARK_C  = { ..._DARK_C, cream: '#252040', mintText: '#5ecfb8', shadow: '0 16px 42px rgba(0,0,0,.30)', strong: '0 28px 72px rgba(0,0,0,.40)' };

export default function ShadowingListPage() {
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const router = useRouter();

  return (
    <div style={{ paddingBottom: 24, maxWidth: 960, margin: '0 auto' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <Link href="/explore" style={{ width: 38, height: 38, borderRadius: 16, background: '#fff', border: '1px solid ' + C.line, fontSize: 20, color: '#4d3933', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>{'‹'}</Link>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.ink }}>{'影子跟读'}</div>
          <div style={{ fontSize: 12, color: C.muted, fontWeight: 700, marginTop: 2 }}>{'韩剧 / 综艺 / YouTube 片段'}</div>
        </div>
        <div style={{ height: 30, padding: '0 11px', borderRadius: 999, background: C.pinkSoft, color: 'var(--color-pink-strong)', fontSize: 11, fontWeight: 800, border: '1px solid rgba(255,127,168,.16)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {'核心功能'}
        </div>
      </div>

      <div style={{
        borderRadius: 32, padding: 20,
        background: 'radial-gradient(circle at 88% 78%, rgba(255,255,255,.58), transparent 24%), linear-gradient(135deg, #201815, #4d3934 46%, #ff8daf 132%)',
        color: '#fff', boxShadow: C.strong, border: '1px solid rgba(255,255,255,.92)',
        marginBottom: 20, overflow: 'hidden', position: 'relative', minHeight: 202,
      }}>
        <div style={{ height: 34, padding: '0 13px', borderRadius: 999, background: 'rgba(255,255,255,.14)', color: '#fff', fontWeight: 800, fontSize: 12, border: '1px solid rgba(255,255,255,.18)', display: 'inline-flex', alignItems: 'center' }}>
          {'🎬 影子跟读'}
        </div>
        <h1 style={{ margin: '14px 0 0', maxWidth: 245, fontSize: 27, lineHeight: 1.1, letterSpacing: '-.8px', fontWeight: 800 }}>
          {'边看视频，边跟着真实语速说韩语'}
        </h1>
        <p style={{ margin: '10px 0 0', maxWidth: 242, fontSize: 13, lineHeight: 1.55, color: 'rgba(255,255,255,.74)' }}>
          {'字幕自动滚动，点击单词看中文。暂停、循环、录音、保存词句，一次完成听说读。'}
        </p>
        <div style={{ position: 'absolute', right: -42, bottom: -68, width: 210, height: 210, borderRadius: '50%', background: 'rgba(255,255,255,.12)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 24, bottom: 8, width: 112, height: 132, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', left: 38, top: 0, width: 25, height: 66, borderRadius: 999, background: 'linear-gradient(180deg,#fff,#fff4f8)', transform: 'rotate(-12deg)' }} />
          <div style={{ position: 'absolute', right: 22, top: 0, width: 25, height: 66, borderRadius: 999, background: 'linear-gradient(180deg,#fff,#fff4f8)', transform: 'rotate(14deg)' }} />
          <div style={{ position: 'absolute', top: 48, right: 10, width: 90, height: 78, borderRadius: 40, background: 'linear-gradient(180deg,#fff,#fff8fa)' }}>
            <div style={{ position: 'absolute', top: 34, left: 30, width: 7, height: 7, borderRadius: '50%', background: '#241917' }} />
            <div style={{ position: 'absolute', top: 34, right: 30, width: 7, height: 7, borderRadius: '50%', background: '#241917' }} />
          </div>
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-.3px', color: C.ink, margin: '0 2px 14px' }}>{'精选片段'}</h2>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-3">
        {shadowingClips.map((clip, i) => {
          const isActive = i === 0;
          return (
            <div
              key={clip.id}
              onClick={() => router.push('/shadowing/clip/' + clip.id)}
              style={{
                display: 'flex', gap: 14, alignItems: 'center', borderRadius: 28,
                padding: 14, background: isActive ? C.mintBg : '#fff',
                border: '1px solid ' + (isActive ? 'rgba(174,227,216,.5)' : C.line),
                boxShadow: C.shadow, cursor: 'pointer',
              }}
            >
              <div style={{ width: 88, height: 88, borderRadius: 22, flexShrink: 0, overflow: 'hidden', background: 'linear-gradient(135deg,#201815,#ff8daf)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ position: 'absolute', color: 'rgba(255,255,255,0.5)', fontSize: 28, fontWeight: 900, zIndex: 0 }}>
                  {clip.title.charAt(0)}
                </span>
                <img
                  src={clip.coverUrl}
                  alt={clip.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', inset: 0, zIndex: 1 }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: C.ink, margin: 0 }}>{clip.title}</h3>
                {'speaker' in clip && clip.speaker && <div style={{ fontSize: 12, color: 'var(--color-pink-strong)', fontWeight: 700, marginTop: 1 }}>{clip.speaker}</div>}
                <p style={{ color: C.muted, fontSize: 12, lineHeight: 1.4, marginTop: 5 }}>{clip.description}</p>
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  <span style={{ height: 22, padding: '0 8px', borderRadius: 999, background: C.cream, border: '1px solid ' + C.line, color: '#7a665f', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center' }}>{clip.durationLabel}</span>
                  <span style={{ height: 22, padding: '0 8px', borderRadius: 999, background: C.cream, border: '1px solid ' + C.line, color: '#7a665f', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center' }}>{clip.difficulty}</span>
                  <span style={{ height: 22, padding: '0 8px', borderRadius: 999, background: C.cream, border: '1px solid ' + C.line, color: '#7a665f', fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center' }}>{clip.subtitleCount}{'句'}</span>
                  {isActive && <span style={{ height: 22, padding: '0 8px', borderRadius: 999, background: C.mint, color: C.mintText, fontSize: 10, fontWeight: 800, display: 'inline-flex', alignItems: 'center' }}>{'当前'}</span>}
                </div>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: C.black, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{'▶'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
