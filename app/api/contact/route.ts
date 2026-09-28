import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO = process.env.CONTACT_EMAIL ?? "hello.in@oncloudswift.com";
const FROM = process.env.CONTACT_FROM ?? "CloudSwift Contact <noreply@oncloudswift.com>";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, company, interest, message, source } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "name, email and message are required" }, { status: 422 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `[CloudSwift Enquiry] ${interest ?? "General"} — ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company ?? "—"}`,
      `Service: ${interest ?? "—"}`,
      `Source: ${source ?? "website"}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
