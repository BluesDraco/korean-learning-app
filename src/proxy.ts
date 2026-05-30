import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = (() => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is required');
  return new TextEncoder().encode(secret);
})();

// Only auth pages are accessible without login
const AUTH_PATHS = [
  '/auth/login',
  '/auth/register',
  '/api/auth/login',
  '/api/auth/register',
];

function isAuthPath(pathname: string): boolean {
  return AUTH_PATHS.some((p) => pathname === p || pathname.startsWith(p + '?'));
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
    pathname === '/manifest.json'
  ) {
    return NextResponse.next();
  }

  // Allow non-auth APIs to pass through (they handle auth internally via getAuthFromCookie)
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Auth pages: redirect logged-in users away, let others through
  if (isAuthPath(pathname)) {
    const token = request.cookies.get('token')?.value;
    if (token) {
      try {
        await jose.jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL('/', request.url));
      } catch {}
    }
    return NextResponse.next();
  }

  // All other pages: require login
  const token = request.cookies.get('token')?.value;
  if (!token) {
    const loginUrl = new URL('/auth/login', request.url);
    if (pathname !== '/') {
      loginUrl.searchParams.set('redirect', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);

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
