import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE } from '@/lib/admin-cookie';

// Runs at the edge: validates the HMAC session token with Web Crypto
// (crypto.subtle) so no Node.js-only imports are pulled in. Must stay in sync
// with sign() in lib/auth.ts.
async function verifySession(cookieValue: string): Promise<boolean> {
  const secret = process.env.ADMIN_COOKIE_SECRET;
  const password = process.env.ADMIN_PASSWORD;
  if (!secret || !password) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(`cs:${password}`));
  const expected = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  return cookieValue === expected;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Let the login page through so we don't loop
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    if (!token || !(await verifySession(token))) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ['/admin/:path*'] };
