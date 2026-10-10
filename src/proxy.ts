import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  
  const isProtectedRoute =
    pathname.startsWith("/product/") ||
    pathname === "/profile" ||
    pathname.startsWith("/profile/");

 
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

 
  const sessionCookie = getSessionCookie(request);

 
  if (!sessionCookie) {
    const signInUrl = new URL("/signin", request.url);

    signInUrl.searchParams.set(
      "callbackUrl",
      pathname + search
    );

    signInUrl.searchParams.set(
      "reason",
      "login-required"
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/product/:path*",
    "/profile/:path*",
  ],
};