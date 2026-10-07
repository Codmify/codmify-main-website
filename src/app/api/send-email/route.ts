// app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import Mailjet from "node-mailjet";
import { createHash } from "node:crypto";
import { validateContact } from "@/lib/contact-validation";

// Best-effort protection per server instance; bounded and expired on each request.
const attempts = new Map<string, { count: number; until: number }>();
const deliveries = new Map<string, { state: "pending" | "sent"; until: number }>();
const hash = (value: string) => createHash("sha256").update(value).digest("hex");
function prune() {
  const now = Date.now();
  for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
  for (const [key, value] of deliveries) if (value.until <= now) deliveries.delete(key);
}
function limit(key: string) {
  const now = Date.now();
  const entry = attempts.get(key) || { count: 0, until: now + 600_000 };
  entry.count++;
  attempts.set(key, entry);
  return entry.count > 5 ? Math.ceil((entry.until - now) / 1000) : 0;
}

// Mailjet transactional template IDs (see provisioned templates in the
// Mailjet dashboard: "Codmify - New Contact Form Submission (Company)" and
// "Codmify - Thanks for Contacting Us (User)").
const COMPANY_TEMPLATE_ID = 8306179;
const USER_TEMPLATE_ID = 8306180;

// Instantiated lazily, on first request, so a missing API key can't crash
// the build - Mailjet's constructor throws synchronously without one, and
// this module is evaluated during Next's build-time page-data collection
// even though this route is dynamic.
let mailjetClient: Mailjet | undefined;
function getMailjetClient() {
  if (!mailjetClient) {
    mailjetClient = new Mailjet({
      apiKey: process.env.MAILJET_API_KEY as string,
      apiSecret: process.env.MAILJET_SECRET_KEY as string,
    });
  }
  return mailjetClient;
}

// The "From" address should live on a domain authenticated in Mailjet
// (SPF/DKIM) - e.g. no-reply@codmify.com - not a gmail.com mailbox, since
// a third-party sender can never pass DMARC alignment for a Gmail-hosted
// domain and mail ends up in spam. Falls back to COMPANY_EMAIL until
// MAIL_FROM_EMAIL is set, so this keeps working before the domain is
// verified.
const FROM_EMAIL = process.env.MAIL_FROM_EMAIL || (process.env.COMPANY_EMAIL as string);

// POST method to handle email sending
export async function POST(request: NextRequest): Promise<NextResponse> {
  let deliveryKey: string | undefined;
  let companyAccepted = false;
  try {
    if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ message: "Send a JSON request." }, { status: 415 });
    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ message: "Request not allowed." }, { status: 403 });
    const raw = await request.text();
    if (raw.length > 20_000) return NextResponse.json({ message: "Your message is too large." }, { status: 413 });
    let body;
    try { body = JSON.parse(raw); } catch { return NextResponse.json({ message: "Invalid request." }, { status: 400 }); }
    if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ message: "Invalid request." }, { status: 400 });
    if (body.website) return NextResponse.json({ message: "Unable to submit this form." }, { status: 400 });
    const checked = validateContact(body);
    if (!checked.valid) return NextResponse.json({ message: "Please check the highlighted fields.", errors: checked.errors }, { status: 400 });
    const { name, email, message, phone } = checked.data;
    prune();
    // Hash keys so retained limiter state does not contain names or messages.
    deliveryKey = hash(JSON.stringify([name, email.toLowerCase(), phone, message]));
    const previous = deliveries.get(deliveryKey);
    if (previous?.state === "sent") return NextResponse.json({ message: "Your message has already been received. Thank you!" });
    if (previous?.state === "pending") return NextResponse.json({ message: "Your message is being sent. Please wait." }, { status: 429, headers: { "Retry-After": "30" } });
    if (attempts.size >= 10_000 || deliveries.size >= 10_000) return NextResponse.json({ message: "Please try again shortly." }, { status: 503 });
    const address = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() : undefined;
    const retry = Math.max(limit("email:" + hash(email.toLowerCase())), address ? limit("ip:" + hash(address)) : 0);
    if (retry) return NextResponse.json({ message: "Too many messages. Please wait before sending again." }, { status: 429, headers: { "Retry-After": String(retry) } });
    deliveries.set(deliveryKey, { state: "pending", until: Date.now() + 600_000 });

    // Define Mailjet email request data to send to the company
    const mailjetRequestToCompany = {
      Messages: [
        {
          From: {
            Email: FROM_EMAIL,
            Name: "Website Contact Form",
          },
          To: [
            {
              Email: process.env.COMPANY_EMAIL as string, // Your company email address
              Name: "Recipient",
            },
          ],
          TemplateID: COMPANY_TEMPLATE_ID,
          TemplateLanguage: true,
          Subject: "New Contact Form Submission",
          Variables: { name, email, phone, message },
        },
      ],
    };

    // Define Mailjet email request data to send a confirmation to the user
    const mailjetRequestToUser = {
      Messages: [
        {
          From: {
            Email: FROM_EMAIL,
            Name: "Codmify Hub",
          },
          To: [
            {
              Email: email, // User's email from the form
              Name: name, // User's name from the form
            },
          ],
          TemplateID: USER_TEMPLATE_ID,
          TemplateLanguage: true,
          Subject: "Thank you for contacting us!",
          Variables: { name },
        },
      ],
    };

    // Send the email to the company using Mailjet
    await getMailjetClient()
      .post("send", { version: "v3.1" })
      .request(mailjetRequestToCompany);
    companyAccepted = true;
    deliveries.set(deliveryKey, { state: "sent", until: Date.now() + 600_000 });

    // A confirmation failure must not encourage resending an accepted enquiry.
    try {
      await getMailjetClient().post("send", { version: "v3.1" }).request(mailjetRequestToUser);
    } catch {
      console.error("Contact confirmation email could not be sent.");
    }
    return NextResponse.json({ message: "Message received. Thank you for contacting Codmify!" });
  } catch (error) {
    if (deliveryKey && !companyAccepted) deliveries.delete(deliveryKey);
    console.error("Contact delivery failed:", error instanceof Error ? error.name : "Unknown error");
    return NextResponse.json(
      { message: "Unable to send your message right now. Please try again later." },
      { status: 500 }
    );
  }
}
