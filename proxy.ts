import { NextResponse, type NextRequest } from "next/server";
import { authConfig, isSessionValid, type AuthRole } from "@/lib/auth";

function getRole(pathname: string): AuthRole | null {
  if (pathname.startsWith("/kitchen")) {
    return "kitchen";
  }

  if (pathname.startsWith("/admin")) {
    return "admin";
  }

  return null;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const role = getRole(pathname);

  if (!role) {
    return NextResponse.next();
  }

  const config = authConfig[role];
  const session = request.cookies.get(config.cookieName)?.value;
  const isLoggedIn = isSessionValid(role, session);

  if (pathname === config.loginPath) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(config.homePath, request.url));
    }

    return NextResponse.next();
  }

  if (!isLoggedIn) {
    const response = NextResponse.redirect(new URL(config.loginPath, request.url));
    response.cookies.delete(config.cookieName);

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/kitchen/:path*", "/admin/:path*"],
};
