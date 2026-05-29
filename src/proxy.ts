import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = (() => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is required');
  return new TextEncoder().encode(secret);
})();

const PUBLIC_PATHS = [
  '/auth/login',
  '/auth/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/track',
];

const PUBLIC_PAGE_PATHS = [
  '/',
  '/learn',
  '/phonetics',
  '/grammar',
  '/korea',
  '/vocabulary',
  '/dictionary',
  '/reading',
  '/expressions',
  '/buddy',
  '/ai',
  '/review',
  '/dictation',
  '/shadowing',
  '/typing',
  '/writing',
  '/topik',
  '/stats',
  '/knowledge',
  '/achievement',
];

function isPublic(pathname: string): boolean {
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) return true;
  if (PUBLIC_PAGE_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))) return true;
  return false;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static assets, API routes except auth
  if (pathname.startsWith('/_next') || pathname.startsWith('/images') || pathname.startsWith('/favicon.ico') || pathname === '/sw.js' || pathname === '/manifest.json') {
    return NextResponse.next();
  }
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  if (isPublic(pathname)) {
    const token = request.cookies.get('token')?.value;
    if (token) {
      try {
        await jose.jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/', request.url));
      } catch {}
    }
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);

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
