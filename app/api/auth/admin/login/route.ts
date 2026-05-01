import { createSession, authConfig, validateAdminLogin } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const result = validateAdminLogin(formData);

  if (!result.ok) {
    const loginUrl = new URL(authConfig.admin.loginPath, request.url);
    loginUrl.searchParams.set("error", result.error);

    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const session = createSession("admin");
  const response = NextResponse.redirect(
    new URL(authConfig.admin.homePath, request.url),
    { status: 303 },
  );

  response.cookies.set(authConfig.admin.cookieName, session.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: session.expiresAt,
    path: "/",
  });

  return response;
}
