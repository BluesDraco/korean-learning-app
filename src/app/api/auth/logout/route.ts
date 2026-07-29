import { NextResponse } from 'next/server';

// 6-26 事故兜底：鉴权路由必须 force-dynamic
export const dynamic = 'force-dynamic';

export async function POST() {
  const res = NextResponse.json({ success: true }, { headers: { 'Cache-Control': 'private, no-store' } });
  res.cookies.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });
  return res;
}
