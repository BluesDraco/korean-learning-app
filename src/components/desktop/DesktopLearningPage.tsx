'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Music2, Calendar, GraduationCap, Mic, Headphones, PenLine, Edit3 } from 'lucide-react';
import { PageHeader, Section, Card, Button, Modal } from '@/components/ui';

interface LearningEntry {
  label: string;
  desc: string;
  href?: string;
  available: boolean;
  progress?: number;
  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  tone: 'pink' | 'mint' | 'peach' | 'purple';
}

const ENTRIES: LearningEntry[] = [
  { label: '韩文字母入门',     desc: '从 40 音开始，听标准发音，再学习音节拼装。',                 href: '/phonetics',     available: true, progress: 58, Icon: Music2,        tone: 'purple' },
  { label: 'TOPIK 备考模板',   desc: '按题型整理词汇、阅读和写作练习路线。',               href: '/topik',         available: true,              Icon: GraduationCap, tone: 'purple' },
  { label: '发音跟读',         desc: '录音对比标准发音，练习韩语语调和单音。',             href: '/pronunciation', available: true,              Icon: Mic,           tone: 'pink' },
  { label: '听说练习',         desc: '看中文意思，用韩语说出来。语音识别自动判断准确度。', href: '/listening',     available: true,              Icon: Headphones,    tone: 'peach' },
  { label: '默写练习',         desc: '看中文意思，用韩文默写出来，精准训练拼写能力。',     href: '/dictation',     available: true,              Icon: Edit3,         tone: 'mint' },
  { label: '写作练习',         desc: '用韩语写句子，AI 给出参考例句对照。',                href: '/writing',       available: true,              Icon: PenLine,       tone: 'mint' },
];

const TONE_BG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-soft)', mint: 'var(--color-mint-soft)',
  peach: 'var(--color-peach-soft)', purple: 'var(--color-purple-soft)',
};
const TONE_FG: Record<'pink' | 'mint' | 'peach' | 'purple', string> = {
  pink: 'var(--color-pink-strong)', mint: 'var(--color-mint-strong)',
  peach: 'var(--color-peach-strong)', purple: 'var(--color-purple-strong)',
};

export function DesktopLearningPage() {
  const router = useRouter();
  const [modalEntry, setModalEntry] = useState<LearningEntry | null>(null);

  return (
    <div>
      <PageHeader
        eyebrow="학습 · LEARN"
        title="学习路线"
        subtitle="入口保留，完整模板将在正式版上线后陆续推出。"
        tone="pink"
      />

      <Section spacing="normal">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ENTRIES.map((entry) => {
            const onClick = () => entry.available && entry.href
              ? router.push(entry.href)
              : setModalEntry(entry);
            return (
              <Card
                key={entry.label}
                as="button"
                onClick={onClick}
                variant="default"
                padding="md"
                interactive
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div
                    style={{
                      width: 52, height: 52, borderRadius: 'var(--radius-md)',
                      background: TONE_BG[entry.tone], color: TONE_FG[entry.tone],
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}
                    aria-hidden
                  >
                    <entry.Icon size={22} strokeWidth={1.75} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-ink-1)', margin: 0 }}>
                      {entry.label}
                    </p>
                    <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: '4px 0 0', lineHeight: 1.5 }}>
                      {entry.desc}
                    </p>
                    {entry.available && entry.progress !== undefined && (
                      <div style={{ marginTop: 10, height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--color-surface-4)', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%', borderRadius: 'var(--radius-pill)',
                            background: `linear-gradient(90deg, ${TONE_FG[entry.tone]}, var(--color-pink-base))`,
                            width: `${entry.progress}%`,
                            transition: 'width var(--dur-slow) var(--ease-soft)',
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 11, fontWeight: 700,
                      color: entry.available ? TONE_FG[entry.tone] : 'var(--color-ink-4)',
                      background: entry.available ? TONE_BG[entry.tone] : 'var(--color-surface-4)',
                      padding: '5px 12px', borderRadius: 'var(--radius-pill)',
                      flexShrink: 0, whiteSpace: 'nowrap',
                    }}
                  >
                    {entry.available ? '可体验' : '即将推出'}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Modal open={!!modalEntry} onClose={() => setModalEntry(null)} size="sm">
        {modalEntry && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div
                style={{
                  width: 56, height: 56, borderRadius: 'var(--radius-lg)',
                  background: TONE_BG[modalEntry.tone], color: TONE_FG[modalEntry.tone],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px',
                }}
                aria-hidden
              >
                <modalEntry.Icon size={26} strokeWidth={1.75} />
              </div>
              <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0 }}>
                {modalEntry.label}
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-pink-strong)', fontWeight: 600, margin: '4px 0 0' }}>
                正式版上线后推出
              </p>
            </div>
            <div
              style={{
                background: 'var(--color-surface-3)', borderRadius: 'var(--radius-md)',
                padding: 16, marginBottom: 16, textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 13, color: 'var(--color-ink-1)', margin: 0, lineHeight: 1.6 }}>
                这个学习路线会在正式版上线后开放。内测阶段你可以先去词汇模块，按级别和场景学习常用韩语单词。
              </p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="secondary" fullWidth onClick={() => setModalEntry(null)}>
                我知道了
              </Button>
              <Button
                variant="primary"
                tone="pink"
                fullWidth
                icon={<ArrowRight size={14} />}
                onClick={() => { setModalEntry(null); router.push('/vocabulary'); }}
              >
                先去词汇模块
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
