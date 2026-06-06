'use client';

import { Loader2 } from 'lucide-react';

interface ToriPrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  className?: string;
  type?: 'button' | 'submit';
}

export function ToriPrimaryButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  loadingText = '处理中...',
  className = '',
  type = 'button',
}: ToriPrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full rounded-[16px] h-[46px]
        bg-[var(--text-primary)]
        text-[15px] font-black text-white
        shadow-[0_8px_18px_rgba(47,42,38,0.16)]
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:bg-[var(--border-color)]
        disabled:shadow-none
        transition-all
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
