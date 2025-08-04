import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken && request.nextUrl.pathname !== '/sign-in') {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl.origin));
  }

  if (accessToken && request.nextUrl.pathname === '/sign-in') {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
