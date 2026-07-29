'use client';

import { useEffect } from 'react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { lang } = useLang();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-[#fffbf7]">
      <div className="text-5xl">🐰</div>
      <div>
        <h1 className="text-lg font-bold text-[#241917]">{t('errpage.title', lang)}</h1>
        <p className="text-sm text-[#89756e] mt-1">{t('errpage.desc', lang)}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-[#ff7fa8] text-white text-sm font-medium"
        >
          {t('errpage.retry', lang)}
        </button>
        <a
          href="/daily"
          className="px-5 py-2.5 rounded-xl border border-[#eee0d8] bg-white text-[#241917] text-sm font-medium"
        >
          {t('errpage.home', lang)}
        </a>
      </div>
    </div>
  );
}
