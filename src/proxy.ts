import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

const JWT_SECRET = (() => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is required');
  return new TextEncoder().encode(secret);
})();

const PUBLIC_PATHS = ['/auth/login', '/auth/register', '/api/auth/login', '/api/auth/register'];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Static assets and public auth pages
  if (pathname.startsWith('/_next') || pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
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
