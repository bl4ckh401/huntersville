import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');
  if (!isAdminPath) return NextResponse.next();

  const userSession = request.cookies.get('user_session');

  if (!userSession?.value) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  let sessionUser: { role?: string } | null = null;
  try {
    sessionUser = JSON.parse(userSession.value);
  } catch {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!sessionUser || sessionUser.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
