import { NextResponse, type NextRequest } from "next/server";
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/GridFolio") {
    const destination = request.nextUrl.clone();
    destination.pathname = "/gridfolio";
    return NextResponse.redirect(destination, 308);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/GridFolio"] };
