import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname.startsWith("/my-market")) {
    if (token.role !== "organizer") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my-market/:path*", "/home"],
};
