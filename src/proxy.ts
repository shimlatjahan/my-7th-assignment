import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Check whether the route requires authentication
  const isProtectedRoute =
    pathname.startsWith("/product/") ||
    pathname === "/profile" ||
    pathname.startsWith("/profile/");

  // Allow public routes
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Check Better Auth session cookie
  const sessionCookie = getSessionCookie(request);

  // Redirect unauthenticated users to Sign In
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