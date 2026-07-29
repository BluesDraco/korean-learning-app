import { NextResponse } from 'next/server';
import { getDb, rowsToObjects } from '@/lib/server/db';
import { isLaunchGateBlocked, LAUNCH_GATE_MESSAGE } from '@/lib/server/auth';
import { checkRateLimit, checkGuestAiRateLimit } from '@/lib/server/rate-limit';
import { createCode } from '@/lib/server/verification';
import { sendVerificationCodeSms } from '@/lib/server/sms';
import { PHONE_RE, normalizePhone } from '@/lib/server/account';

export const dynamic = 'force-dynamic';
const NO_STORE = { 'Cache-Control': 'private, no-store' };

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || '127.0.0.1';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const phone = normalizePhone(String(body.phone || ''));

    if (!PHONE_RE.test(phone)) {
      return NextResponse.json({ error: '手机号格式不正确' }, { status: 400, headers: NO_STORE });
    }

    // 三层防刷（短信有成本）：按手机号滑窗 + 按 IP 滑窗 + 按手机号每日封顶
    const ip = getClientIp(request);
    const [byPhone, byIp, byDay] = await Promise.all([
      checkRateLimit(`phonecode:${phone}`),
      checkRateLimit(`phonecode-ip:${ip}`),
      checkGuestAiRateLimit(phone, 'phone-sms', 10),
    ]);
    if (!byPhone.allowed || !byIp.allowed || !byDay.allowed) {
      return NextResponse.json({ error: '验证码请求过于频繁，请稍后再试' }, { status: 429, headers: NO_STORE });
    }

    // 上线预告门控：国内版开放前，仅已注册的管理员可收码测试；普通用户/新号一律不发短信
    if (isLaunchGateBlocked()) {
      const db = await getDb();
      const rows = rowsToObjects(
        await db.exec('SELECT role FROM users WHERE phone = ? LIMIT 1', [phone])
      );
      if (isLaunchGateBlocked((rows[0]?.role as string) || 'user')) {
        return NextResponse.json({ error: LAUNCH_GATE_MESSAGE }, { status: 403, headers: NO_STORE });
      }
    }

    // 登录/注册合一：不拦已注册号（老用户登录也要发码）
    const code = await createCode(phone, 'login');
    await sendVerificationCodeSms(phone, code);

    return NextResponse.json({ success: true }, { headers: NO_STORE });
  } catch (err) {
    console.error('Send SMS code error:', err);
    return NextResponse.json({ error: '验证码发送失败，请稍后重试' }, { status: 500, headers: NO_STORE });
  }
}
