import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const DEV_JWT_SECRET = 'dev-only-korean-learning-app-secret-change-me';

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (secret) return new TextEncoder().encode(secret);

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET environment variable is required in production');
  }

  return new TextEncoder().encode(DEV_JWT_SECRET);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static assets — always allow
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/audio') ||
    pathname.startsWith('/stickers') ||
    pathname.startsWith('/icons') ||
    pathname === '/sw.js' ||
    pathname === '/manifest.json' ||
    pathname === '/favicon.ico' ||
    pathname === '/file.svg' ||
    pathname === '/globe.svg' ||
    pathname === '/next.svg' ||
    pathname === '/vercel.svg' ||
    pathname === '/window.svg' ||
    /\.(png|jpg|jpeg|webp|gif|svg|ico|woff2?|ttf|eot|mp3|mp4|webm)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Auth pages — always allow (handle redirect-if-logged-in below)
  if (pathname === '/auth/login' || pathname === '/auth/register') {
    const token = request.cookies.get('token')?.value;
    if (token) {
      try {
        await jose.jwtVerify(token, getJwtSecret());
        return NextResponse.redirect(new URL('/daily', request.url));
      } catch {}
    }
    return NextResponse.next();
  }

  // All API routes — pass through (each route handles its own auth)
  if (pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // All other pages — require login
  const token = request.cookies.get('token')?.value;
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jose.jwtVerify(token, getJwtSecret());

    // Admin routes: require admin role
    if ((pathname === '/admin' || pathname.startsWith('/admin/')) && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/daily', request.url));
    }
  } catch {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
