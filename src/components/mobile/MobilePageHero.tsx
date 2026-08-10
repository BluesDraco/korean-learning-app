import { ToriCardMascot } from './ToriCardMascot';
import type { ToriPose } from './ToriCardMascot';

type Variant = 'warm' | 'blue' | 'green' | 'purple' | 'pink';

interface Props {
  [k: string]: unknown;
  title: string;
  description?: string;
  icon?: string;
  variant?: Variant;
  toriPose?: ToriPose;
}

const gradients: Record<Variant, string> = {
  warm: 'from-[#fff1c9] to-[#ffe7ef]',
  blue: 'from-[#eaf5ff] to-[#ffffff]',
  green: 'from-[#e7fbef] to-[#ffffff]',
  purple: 'from-[#eee7ff] to-[#fff7fb]',
  pink: 'from-[#ffe4ec] to-[#e8efff]',
};

export function MobilePageHero({ title, description, icon, variant = 'warm', toriPose }: Props) {
  return (
    <section
      className={`relative overflow-visible mt-2 flex items-center justify-between gap-3 rounded-[28px] bg-gradient-to-br ${gradients[variant]} p-[18px] shadow-[0_10px_28px_rgba(92,64,38,0.09)]`}
    >
      <div className="min-w-0">
        <h1 className="text-[22px] font-black leading-tight tracking-[-0.035em] text-[var(--text-primary)]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
            {description}
          </p>
        ) : null}
      </div>

      {toriPose ? (
        <ToriCardMascot pose={toriPose} size="md" />
      ) : icon ? (
        <div className="relative grid h-[76px] w-[76px] shrink-0 place-items-center rounded-[26px] bg-white/65 text-[42px]">
          <span>{icon}</span>
        </div>
      ) : null}
    </section>
  );
}
