import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/Roco" || request.nextUrl.pathname.startsWith("/Roco/")) {
    const url = request.nextUrl.clone();
    url.pathname = `/roco${url.pathname.slice(5)}`;
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/Roco/:path*"] };
