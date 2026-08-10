// 邮件发送：按站点分流。海外站(overseas)走 Resend，国内站走腾讯云邮件推送 SES。
// 海外 env：RESEND_API_KEY / RESEND_FROM_EMAIL
// 国内 env：TENCENT_SES_SECRET_ID / TENCENT_SES_SECRET_KEY / TENCENT_SES_FROM

import { t } from '@/lib/i18n';
import { tc3Post } from '@/lib/server/tencentSign';

const RESEND_API = 'https://api.resend.com/emails';

export interface SendEmailInput {
  [k: string]: unknown;
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(input: SendEmailInput): Promise<void> {
  if (process.env.NEXT_PUBLIC_EDITION === 'overseas') {
    return sendViaResend(input);
  }
  return sendViaTencentSes(input);
}

async function sendViaResend({ to, subject, html }: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY not configured');
  }
  const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  const res = await fetch(RESEND_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: [to], subject, html }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend send failed (${res.status}): ${detail.slice(0, 300)}`);
  }
}

async function sendViaTencentSes({ to, subject, html }: SendEmailInput): Promise<void> {
  const secretId = process.env.TENCENT_SES_SECRET_ID;
  const secretKey = process.env.TENCENT_SES_SECRET_KEY;
  const from = process.env.TENCENT_SES_FROM;
  if (!secretId || !secretKey || !from) {
    throw new Error('TENCENT_SES_* not configured');
  }

  await tc3Post({
    service: 'ses',
    host: 'ses.tencentcloudapi.com',
    action: 'SendEmail',
    version: '2020-10-02',
    region: 'ap-guangzhou',
    secretId,
    secretKey,
    payload: {
      FromEmailAddress: from,
      Destination: [to],
      Subject: subject,
      Simple: { Html: { Data: Buffer.from(html, 'utf8').toString('base64') } },
    },
  });
}

export async function sendVerificationCodeEmail(to: string, code: string, lang: 'zh' | 'en' = 'zh'): Promise<void> {
  const subject = t('email.verification_subject', lang);
  const intro = t('email.verification_body', lang);
  const ignore = t('email.not_you', lang);
  const html = `<!doctype html><html><body style="margin:0;background:#fffbf7;padding:32px 0;font-family:-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial,sans-serif;color:#241917">
  <div style="max-width:440px;margin:0 auto;background:#fff;border:1px solid #eee0d8;border-radius:20px;padding:32px 28px;text-align:center;box-shadow:0 8px 24px rgba(160,120,90,.08)">
    <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:4px">Tori · 토리네 한국어</div>
    <p style="font-size:14px;color:#89756e;margin:0 0 24px">${intro}</p>
    <div style="font-size:34px;font-weight:800;letter-spacing:10px;color:#ff7fa8;background:#fff0f5;border-radius:14px;padding:16px 0;margin:0 0 24px">${code}</div>
    <p style="font-size:12px;color:#b3a49c;margin:0">${ignore}</p>
  </div>
</body></html>`;
  await sendEmail({ to, subject, html });
}

export async function sendPasswordResetEmail(to: string, code: string, lang: 'zh' | 'en' = 'zh'): Promise<void> {
  const subject = t('email.reset_password_subject', lang);
  const intro = t('email.reset_password_body', lang);
  const ignore = t('email.reset_password_not_you', lang);
  const html = `<!doctype html><html><body style="margin:0;background:#fffbf7;padding:32px 0;font-family:-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial,sans-serif;color:#241917">
  <div style="max-width:440px;margin:0 auto;background:#fff;border:1px solid #eee0d8;border-radius:20px;padding:32px 28px;text-align:center;box-shadow:0 8px 24px rgba(160,120,90,.08)">
    <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:4px">Tori · 토리네 한국어</div>
    <p style="font-size:14px;color:#89756e;margin:0 0 24px">${intro}</p>
    <div style="font-size:34px;font-weight:800;letter-spacing:10px;color:#ff7fa8;background:#fff0f5;border-radius:14px;padding:16px 0;margin:0 0 24px">${code}</div>
    <p style="font-size:12px;color:#b3a49c;margin:0">${ignore}</p>
  </div>
</body></html>`;
  await sendEmail({ to, subject, html });
}

export async function sendBindEmailCode(to: string, code: string, lang: 'zh' | 'en' = 'zh'): Promise<void> {
  const subject = t('email.bind_email_subject', lang);
  const intro = t('email.bind_email_body', lang);
  const ignore = t('email.not_you', lang);
  const html = `<!doctype html><html><body style="margin:0;background:#fffbf7;padding:32px 0;font-family:-apple-system,Segoe UI,Roboto,'Helvetica Neue',Arial,sans-serif;color:#241917">
  <div style="max-width:440px;margin:0 auto;background:#fff;border:1px solid #eee0d8;border-radius:20px;padding:32px 28px;text-align:center;box-shadow:0 8px 24px rgba(160,120,90,.08)">
    <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:4px">Tori · 토리네 한국어</div>
    <p style="font-size:14px;color:#89756e;margin:0 0 24px">${intro}</p>
    <div style="font-size:34px;font-weight:800;letter-spacing:10px;color:#ff7fa8;background:#fff0f5;border-radius:14px;padding:16px 0;margin:0 0 24px">${code}</div>
    <p style="font-size:12px;color:#b3a49c;margin:0">${ignore}</p>
  </div>
</body></html>`;
  await sendEmail({ to, subject, html });
}
