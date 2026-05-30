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

const AUTH_PATHS = [
  '/auth/login',
  '/auth/register',
];

const PUBLIC_PATHS = [
  '/',
  '/learn',
  '/learn/picture-books',
  '/phonetics',
  '/phonetics/rules',
  '/grammar',
  '/knowledge',
  '/korea',
  '/korea/culture',
  '/korea/food',
  '/korea/kpop',
  '/korea/kpop/news',
  '/korea/travel',
  '/dictionary',
  '/expressions',
  '/topik',
  '/tori/stickers',
];

function isAuthPath(pathname: string): boolean {
  return AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(p + '?'));
}

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow static assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/stickers') ||
    pathname.startsWith('/favicon.ico') ||
    pathname === '/sw.js' ||
    pathname === '/manifest.json' ||
    pathname === '/file.svg' ||
    pathname === '/globe.svg' ||
    pathname === '/next.svg' ||
    pathname === '/vercel.svg' ||
    pathname === '/window.svg'
  ) {
    return NextResponse.next();
  }

  // Allow non-auth APIs to pass through (they handle auth internally via getAuthFromCookie)
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // API auth endpoints: always pass through (they handle their own auth logic)
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Auth pages (login/register): redirect logged-in users away, let others through
  if (isAuthPath(pathname)) {
    const token = request.cookies.get('token')?.value;
    if (token) {
      try {
        await jose.jwtVerify(token, getJwtSecret());
        return NextResponse.redirect(new URL('/', request.url));
      } catch {}
    }
    return NextResponse.next();
  }

  // Public content pages are visible without login
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // All other pages: require login
  const token = request.cookies.get('token')?.value;
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jose.jwtVerify(token, getJwtSecret());

    // Admin routes: require admin role
    if (pathname.startsWith('/admin') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } catch {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
