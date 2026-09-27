import { Resend } from "resend";
import { NextResponse } from "next/server";

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
    if (raw.length > 16000)
      return NextResponse.json(
        { error: "Message is too long" },
        { status: 413 },
      );
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error("Invalid request");
    payload = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (payload.website) return NextResponse.json({ success: true });
  const field = (key: string) =>
    typeof payload[key] === "string" ? payload[key].trim() : "";
  const name = field("name"),
    email = field("email"),
    message = field("message"),
    company = field("company"),
    projectType = field("projectType");
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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey)
    return NextResponse.json(
      { error: "Email service is unavailable. Please email Joseph directly." },
      { status: 503 },
    );
  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from:
        process.env.CONTACT_FROM_EMAIL ||
        "Portfolio Contact <onboarding@resend.dev>",
      to: "kidunejoseph91@gmail.com",
      replyTo: email,
      subject: `Portfolio enquiry from ${name.replace(/[\r\n]/g, " ")}`,
      text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not specified"}\nProject: ${projectType || "Not specified"}\n\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;color:#202020;max-width:600px;padding:24px"><h2>New portfolio enquiry</h2><p><b>Name:</b> ${escapeHtml(name)}</p><p><b>Email:</b> ${escapeHtml(email)}</p><p><b>Company:</b> ${escapeHtml(company || "Not specified")}</p><p><b>Project:</b> ${escapeHtml(projectType || "Not specified")}</p><div style="white-space:pre-wrap;border-top:1px solid #e7e6e4;padding-top:16px">${escapeHtml(message)}</div></div>`,
    });
    if (result.error || !result.data?.id)
      return NextResponse.json(
        { error: "Email could not be sent" },
        { status: 502 },
      );
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Email could not be sent" },
      { status: 502 },
    );
  }
}
