'use client';

import { Tv, Sparkles } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const sampleExpressions = [
  { ko: '진짜요?', zh: '真的吗？', zhEn: 'Really?', dramaKey: 'drama.src_common', sceneKey: 'drama.scene_surprise' },
  { ko: '가지 마', zh: '别走', zhEn: "Don't go", dramaKey: 'drama.src_emotional', sceneKey: 'drama.scene_hold_back' },
  { ko: '괜찮아요?', zh: '你没事吧？', zhEn: 'Are you okay?', dramaKey: 'drama.src_care', sceneKey: 'drama.scene_greeting' },
  { ko: '수고했어요', zh: '辛苦了', zhEn: 'Good work', dramaKey: 'drama.src_workplace', sceneKey: 'drama.scene_thanks' },
  { ko: '사랑해', zh: '我爱你', zhEn: 'I love you', dramaKey: 'drama.src_confession', sceneKey: 'drama.scene_love' },
  { ko: '화이팅!', zh: '加油！', zhEn: 'You got this!', dramaKey: 'drama.src_encourage', sceneKey: 'drama.scene_motivate' },
];

export default function DramaPage() {
  const { lang } = useLang();
  return (
    <div className="py-4 space-y-5 max-w-lg md:max-w-none mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">{t('drama.title', lang)}</h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">{t('drama.subtitle', lang)}</p>
      </div>

      {/* Sample expressions */}
      <div>
        <h2 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 px-1">{t('drama.preview_title', lang)}</h2>
        <div className="space-y-2">
          {sampleExpressions.map((item) => (
            <div key={item.ko} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--purple-soft)]/10 flex items-center justify-center shrink-0">
                <Tv size={18} style={{ color: 'var(--purple-soft)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[var(--text-primary)]">{item.ko}</p>
                <p className="text-xs text-[var(--text-muted)]">{lang === 'en' ? item.zhEn : item.zh} · {t(item.sceneKey, lang)}</p>
              </div>
              <span className="text-[10px] text-[var(--text-placeholder)]">{t(item.dramaKey, lang)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[var(--bg-input)] rounded-2xl p-4 text-center">
        <Sparkles size={16} className="text-[var(--pink-primary)] mx-auto mb-1" />
        <p className="text-xs text-[var(--text-secondary)]">{t('drama.coming_soon', lang)}</p>
      </div>
    </div>
  );
}
