import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getContactDb, getRuntimeEnv } from "@/lib/cloudflare-runtime";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );

export async function POST(req: Request) {
  let payload: Record<string, unknown>;

  try {
    const raw = await req.text();
    if (raw.length > 16000) {
      return NextResponse.json({ error: "Message is too long" }, { status: 413 });
    }

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Invalid request");
    }
    payload = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (payload.website) return NextResponse.json({ success: true });

  const field = (key: string) =>
    typeof payload[key] === "string" ? payload[key].trim() : "";

  const name = field("name");
  const email = field("email");
  const message = field("message");
  const company = field("company");
  const projectType = field("projectType");

  if (
    !name ||
    name.length > 120 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    email.length > 254 ||
    message.length < 10 ||
    message.length > 10000 ||
    company.length > 200 ||
    projectType.length > 100
  ) {
    return NextResponse.json(
      { error: "Please provide a valid name, email, and message." },
      { status: 400 },
    );
  }

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const sourceUrl = req.headers.get("referer")?.slice(0, 1000) || null;
  const userAgent = req.headers.get("user-agent")?.slice(0, 1000) || null;
  const db = getContactDb();

  let stored = false;
  if (db) {
    try {
      const result = await db
        .prepare(
          `INSERT INTO contact_messages (
            id, name, email, company, project_type, message, status,
            created_at, updated_at, source_url, user_agent, notification_sent
          ) VALUES (?, ?, ?, ?, ?, ?, 'new', ?, ?, ?, ?, 0)`,
        )
        .bind(
          id,
          name,
          email,
          company || null,
          projectType || null,
          message,
          now,
          now,
          sourceUrl,
          userAgent,
        )
        .run();

      stored = result.success !== false;
    } catch (error) {
      console.error("D1 contact insert failed", error);
    }
  }

  const env = getRuntimeEnv();
  const apiKey = env.RESEND_API_KEY;
  let notificationSent = false;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const result = await resend.emails.send({
        from:
          env.CONTACT_FROM_EMAIL ||
          "Portfolio Contact <onboarding@resend.dev>",
        to: "kidunejoseph91@gmail.com",
        replyTo: email,
        subject: `Portfolio enquiry from ${name.replace(/[\r\n]/g, " ")}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not specified"}\nProject: ${projectType || "Not specified"}\n\n${message}`,
        html: `<div style="font-family:Arial,sans-serif;color:#202020;max-width:600px;padding:24px"><h2>New portfolio enquiry</h2><p><b>Name:</b> ${escapeHtml(name)}</p><p><b>Email:</b> ${escapeHtml(email)}</p><p><b>Company:</b> ${escapeHtml(company || "Not specified")}</p><p><b>Project:</b> ${escapeHtml(projectType || "Not specified")}</p><div style="white-space:pre-wrap;border-top:1px solid #e7e6e4;padding-top:16px">${escapeHtml(message)}</div></div>`,
      });

      notificationSent = Boolean(result.data?.id) && !result.error;
    } catch (error) {
      console.error("Resend notification failed", error);
    }
  }

  if (stored && notificationSent && db) {
    try {
      await db
        .prepare(
          "UPDATE contact_messages SET notification_sent = 1, updated_at = ? WHERE id = ?",
        )
        .bind(new Date().toISOString(), id)
        .run();
    } catch (error) {
      console.error("D1 notification flag update failed", error);
    }
  }

  if (stored || notificationSent) {
    return NextResponse.json({
      success: true,
      delivery: stored ? "stored" : "email",
    });
  }

  return NextResponse.json(
    {
      error:
        "Your message could not be saved right now. Please email Joseph directly.",
    },
    { status: 503 },
  );
}
