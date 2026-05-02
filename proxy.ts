import { NextResponse, type NextRequest } from "next/server";
import { authConfig, isSessionValid, type AuthRole } from "@/lib/auth";
import { isStoreOpen } from "@/lib/store-hours";

const PATHNAME_HEADER = "x-yumyard-pathname";

function requestHeadersWithPathname(request: NextRequest, pathname: string) {
  const headers = new Headers(request.headers);
  headers.set(PATHNAME_HEADER, pathname);

  return headers;
}

function nextWithPathname(request: NextRequest, pathname: string) {
  return NextResponse.next({
    request: {
      headers: requestHeadersWithPathname(request, pathname),
    },
  });
}

function getRole(pathname: string): AuthRole | null {
  if (pathname === "/kitchen" || pathname.startsWith("/kitchen/")) {
    return "kitchen";
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return "admin";
  }

  return null;
}

function isRoleRoot(pathname: string, role: AuthRole) {
  return pathname === `/${role}` || pathname === `/${role}/`;
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const role = getRole(pathname);

  if (!role && !isStoreOpen() && pathname !== "/") {
    return NextResponse.rewrite(new URL("/", request.url), {
      request: {
        headers: requestHeadersWithPathname(request, pathname),
      },
    });
  }

  if (!role) {
    return nextWithPathname(request, pathname);
  }

  const config = authConfig[role];
  const session = request.cookies.get(config.cookieName)?.value;
  const isLoggedIn = isSessionValid(role, session);

  if (isRoleRoot(pathname, role)) {
    const targetPath = isLoggedIn ? config.homePath : config.loginPath;
    const response = NextResponse.redirect(new URL(targetPath, request.url));

    if (!isLoggedIn) {
      response.cookies.delete(config.cookieName);
    }

    return response;
  }

  if (pathname === config.loginPath) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(config.homePath, request.url));
    }

    return nextWithPathname(request, pathname);
  }

  if (!isLoggedIn) {
    const response = NextResponse.redirect(new URL(config.loginPath, request.url));
    response.cookies.delete(config.cookieName);

    return response;
  }

  return nextWithPathname(request, pathname);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|site.webmanifest|.*\\..*).*)"],
};
