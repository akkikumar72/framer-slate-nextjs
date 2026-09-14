import { NextResponse, type NextRequest } from 'next/server';

// Next's redirect matcher ignores case, so guard the alias explicitly.
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === '/Hulio' || pathname.startsWith('/Hulio/')) {
    const destination = request.nextUrl.clone();
    destination.pathname = `/hulio${pathname.slice('/Hulio'.length)}`;
    return NextResponse.redirect(destination, 307);
  }
  return NextResponse.next();
}

export const config = { matcher: '/Hulio/:path*' };
