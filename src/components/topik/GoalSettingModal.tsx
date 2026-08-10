'use client';

import { useEffect, useState } from 'react';
import { Modal, Button } from '@/components/ui';
import { useTheme } from '@/components/ThemeProvider';
import { LIGHT_C as _LIGHT_C, DARK_C as _DARK_C } from '@/lib/theme';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const LIGHT_C = { ..._LIGHT_C, chipIdle: '#f9f5f2', chipActive: '#fff0f5', inputBg: '#fff' };
const DARK_C  = { ..._DARK_C, chipIdle: '#252040', chipActive: '#3A2A50', inputBg: '#1E1B2E' };

export interface GoalDraft {
  [k: string]: unknown;
  targetDate?: number;
  targetLevel?: 'I' | 'II';
  dailyQuestionCount: number;
}

interface Props {
  [k: string]: unknown;
  open: boolean;
  initial: GoalDraft;
  onClose: () => void;
  onSave: (draft: GoalDraft) => void;
}

function toDateInput(ts?: number): string {
  if (!ts) return '';
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export default function GoalSettingModal({ open, initial, onClose, onSave }: Props) {
  const { lang } = useLang();
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;
  const [dateStr, setDateStr] = useState(toDateInput(initial.targetDate));
  const [level, setLevel] = useState<'I' | 'II' | undefined>(initial.targetLevel);
  const [daily, setDaily] = useState<number>(initial.dailyQuestionCount || 10);

  useEffect(() => {
    if (open) {
      setDateStr(toDateInput(initial.targetDate));
      setLevel(initial.targetLevel);
      setDaily(initial.dailyQuestionCount || 10);
    }
  }, [open, initial]);

  function handleSave() {
    let targetDate: number | undefined = undefined;
    if (dateStr) {
      const [y, m, d] = dateStr.split('-').map(Number);
      if (y && m && d) targetDate = new Date(y, m - 1, d).getTime();
    }
    onSave({ targetDate, targetLevel: level, dailyQuestionCount: daily });
  }

  const todayInput = toDateInput(Date.now());

  return (
    <Modal open={open} onClose={onClose} title={t('topik.goal_title', lang)} size="md">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* 目标日期 */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, margin: '0 0 8px' }}>{t('topik.goal_date_label', lang)}</p>
          <input
            type="date"
            value={dateStr}
            min={todayInput}
            onChange={e => setDateStr(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 10,
              border: `1px solid ${C.line}`,
              background: C.inputBg,
              color: C.ink,
              fontSize: 14,
              fontFamily: 'inherit',
            }}
          />
          <p style={{ fontSize: 11, color: C.muted, margin: '4px 0 0' }}>{t('topik.goal_date_hint', lang)}</p>
        </div>

        {/* 目标级别 */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, margin: '0 0 8px' }}>{t('topik.goal_level_label', lang)}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {([['I', 'TOPIK I', t('topik.goal_level_I_sub', lang)], ['II', 'TOPIK II', t('topik.goal_level_II_sub', lang)]] as const).map(([v, main, sub]) => {
              const active = level === v;
              return (
                <button
                  key={v}
                  onClick={() => setLevel(v)}
                  style={{
                    background: active ? C.chipActive : C.chipIdle,
                    border: `2px solid ${active ? C.pink : 'transparent'}`,
                    borderRadius: 12,
                    padding: '10px 8px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: 13, fontWeight: 800, color: active ? C.pink : C.ink, margin: 0 }}>{main}</p>
                  <p style={{ fontSize: 10, color: C.muted, margin: '2px 0 0' }}>{sub}</p>
                </button>
              );
            })}
            <button
              onClick={() => setLevel(undefined)}
              style={{
                background: !level ? C.chipActive : C.chipIdle,
                border: `2px solid ${!level ? C.pink : 'transparent'}`,
                borderRadius: 12,
                padding: '10px 8px',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 800, color: !level ? C.pink : C.ink, margin: 0 }}>{t('topik.goal_level_none', lang)}</p>
              <p style={{ fontSize: 10, color: C.muted, margin: '2px 0 0' }}>{t('topik.goal_level_none_sub', lang)}</p>
            </button>
          </div>
        </div>

        {/* 每日题量 */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: C.muted, margin: '0 0 8px' }}>{t('topik.goal_daily_label', lang)}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[10, 20, 30, 50].map(v => {
              const active = daily === v;
              return (
                <button
                  key={v}
                  onClick={() => setDaily(v)}
                  style={{
                    background: active ? C.chipActive : C.chipIdle,
                    border: `2px solid ${active ? C.pink : 'transparent'}`,
                    borderRadius: 12,
                    padding: '12px 8px',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <p style={{ fontSize: 15, fontWeight: 900, color: active ? C.pink : C.ink, margin: 0, lineHeight: 1 }}>{v}</p>
                  <p style={{ fontSize: 10, color: C.muted, margin: '4px 0 0' }}>{t('topik.goal_daily_unit', lang)}</p>
                </button>
              );
            })}
          </div>
          <p style={{ fontSize: 11, color: C.muted, margin: '6px 0 0' }}>{t('topik.goal_daily_hint', lang)}</p>
        </div>

        {/* 按钮 */}
        <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
          <Button variant="secondary" fullWidth onClick={onClose}>{t('topik.cancel', lang)}</Button>
          <Button variant="primary" fullWidth onClick={handleSave}>{t('topik.goal_save', lang)}</Button>
        </div>
      </div>
    </Modal>
  );
}
