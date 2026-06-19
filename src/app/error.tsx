'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center bg-[#fffbf7]">
      <div className="text-5xl">🐰</div>
      <div>
        <h1 className="text-lg font-bold text-[#241917]">页面出了点问题</h1>
        <p className="text-sm text-[#89756e] mt-1">请尝试刷新，或返回主页</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 rounded-xl bg-[#ff7fa8] text-white text-sm font-medium"
        >
          重试
        </button>
        <a
          href="/daily"
          className="px-5 py-2.5 rounded-xl border border-[#eee0d8] bg-white text-[#241917] text-sm font-medium"
        >
          回主页
        </a>
      </div>
    </div>
  );
}
