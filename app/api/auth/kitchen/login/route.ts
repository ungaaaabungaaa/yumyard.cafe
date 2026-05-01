import { createSession, authConfig, validateKitchenLogin } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const result = validateKitchenLogin(formData);

  if (!result.ok) {
    const loginUrl = new URL(authConfig.kitchen.loginPath, request.url);
    loginUrl.searchParams.set("error", result.error);

    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const session = createSession("kitchen");
  const response = NextResponse.redirect(
    new URL(authConfig.kitchen.homePath, request.url),
    { status: 303 },
  );

  response.cookies.set(authConfig.kitchen.cookieName, session.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: session.expiresAt,
    path: "/",
  });

  return response;
}
