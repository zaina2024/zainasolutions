import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";
import { createRateLimiter, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const rateLimited = createRateLimiter(5, 30);

const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfyxEFI4JjlTtx4xKK2Skwo3t873togfJxU_BM17i3ao7nKww/formResponse";
const GOOGLE_FORM_FIELDS = {
  name: "entry.1331702023",
  email: "entry.931266466",
  company: "entry.1970586463",
  service: "entry.1678578058",
  message: "entry.1126018847",
};

export async function POST(req: Request) {
  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const result = validateContact(json);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: "Please fix the highlighted fields.", errors: result.errors },
      { status: 422 }
    );
  }

  const { name, email, message, company, service } = result.data;

  const summary = `New Zaina lead\n• Name: ${name}\n• Email: ${email}\n• Company: ${company}\n• Service: ${service}\n• Message: ${message}`;

  let delivered = false;

  try {
    const params = new URLSearchParams();
    params.set(GOOGLE_FORM_FIELDS.name, name);
    params.set(GOOGLE_FORM_FIELDS.email, email);
    params.set(GOOGLE_FORM_FIELDS.company, company);
    params.set(GOOGLE_FORM_FIELDS.service, service);
    params.set(GOOGLE_FORM_FIELDS.message, message);

    const res = await fetch(GOOGLE_FORM_ACTION, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const body = await res.text();
    if (res.ok && /response has been recorded/i.test(body)) {
      delivered = true;
    } else {
      console.error("[contact] google form not recorded", res.status);
    }
  } catch (err) {
    console.error("[contact] google form error", err);
  }

  if (!delivered) {
    try {
      const resendKey = process.env.RESEND_API_KEY;
      const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
      const inbox = process.env.CONTACT_TO_EMAIL || "thezainasolutions@gmail.com";
      const safeName = name.replace(/[\r\n\t]+/g, " ");
      const subject = `New project enquiry - ${safeName} · ${service}`;

      if (resendKey) {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || "Zaina Website <onboarding@resend.dev>",
            to: [inbox],
            reply_to: email,
            subject,
            text: summary,
          }),
        });
        if (res.ok) delivered = true;
        else console.error("[contact] resend delivery failed", res.status, await res.text());
      } else if (web3Key) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "content-type": "application/json", accept: "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject,
            from_name: "Zaina Website",
            replyto: email,
            to: inbox,
            Name: name,
            Email: email,
            Company: company,
            Service: service,
            Message: message,
          }),
        });
        if (res.ok) delivered = true;
        else console.error("[contact] web3forms delivery failed", res.status, await res.text());
      }
    } catch (err) {
      console.error("[contact] email fallback failed", err);
    }
  }

  if (!delivered) {
    console.info("[contact] new submission", { name, email, company, service, message });
  }

  return NextResponse.json({
    ok: true,
    message: "Thanks! We'll be in touch within 1–2 business days.",
  });
}
