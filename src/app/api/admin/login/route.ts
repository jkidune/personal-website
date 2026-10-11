import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createAdminSession,
  getAdminConfig,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const form = await request.formData();
  const supplied = String(form.get("password") ?? "");
  const { password, sessionSecret } = getAdminConfig();

  if (!password || !sessionSecret) {
    return NextResponse.redirect(new URL("/admin/login?error=config", requestUrl));
  }

  if (supplied !== password) {
    return NextResponse.redirect(
      new URL("/admin/login?error=invalid", requestUrl),
      303,
    );
  }

  const session = await createAdminSession();
  const response = NextResponse.redirect(new URL("/admin", requestUrl), 303);
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: session.value,
    httpOnly: true,
    secure: requestUrl.protocol === "https:",
    sameSite: "lax",
    path: "/",
    maxAge: session.maxAge,
  });
  return response;
}
