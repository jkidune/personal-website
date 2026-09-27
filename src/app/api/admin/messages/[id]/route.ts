import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getContactDb, type ContactMessageStatus } from "@/lib/cloudflare-runtime";

const allowedStatuses: ContactMessageStatus[] = ["new", "contacted", "closed"];

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  const db = getContactDb();
  if (!db) {
    return NextResponse.redirect(new URL("/admin/messages", request.url), 303);
  }

  const { id } = await params;
  const form = await request.formData();
  const status = String(form.get("status") ?? "") as ContactMessageStatus;
  if (!allowedStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await db
    .prepare(
      "UPDATE contact_messages SET status = ?, updated_at = ? WHERE id = ?",
    )
    .bind(status, new Date().toISOString(), id)
    .run();

  return NextResponse.redirect(new URL("/admin/messages", request.url), 303);
}
