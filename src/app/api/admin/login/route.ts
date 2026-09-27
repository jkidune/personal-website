import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  createAdminSession,
  getAdminConfig,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const supplied = String(form.get("password") ?? "");
  const { password, sessionSecret } = getAdminConfig();

  if (!password || !sessionSecret) {
    return NextResponse.redirect(new URL("/admin/login?error=config", request.url));
  }

  if (supplied !== password) {
    return NextResponse.redirect(
      new URL("/admin/login?error=invalid", request.url),
      303,
    );
  }

  const session = await createAdminSession();
  const response = NextResponse.redirect(new URL("/admin/messages", request.url), 303);
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: session.value,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: session.maxAge,
  });
  return response;
}
