// One-off maintenance script: fixes the header logo on the 4 Mailjet
// transactional templates provisioned by provision.cjs. Run from the
// project root (needs node_modules/node-mailjet resolvable):
//   node update-template-logo.cjs
//
// Only the HTML header block changes - it swaps the fake text-based "C"
// square + "codmify" wordmark for the real brand logo
// (public/brand/logo-1.png, the light/white variant already used on the
// site's navy footer, referenced by absolute production URL since email
// clients can't resolve relative paths). The body content and Text-part
// of each template are left untouched, so this only overwrites the
// Html-part via detailcontent - it does not recreate the templates.

const fs = require("fs");
const path = require("path");
const Mailjet = require("node-mailjet");

const envPath = path.join(process.cwd(), ".env");
for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const client = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY,
  apiSecret: process.env.MAILJET_SECRET_KEY,
});

const LOGO_URL = "https://www.codmify.com/brand/logo-1.png";

const header = `<img src="${LOGO_URL}" width="148" height="28" alt="Codmify" style="display:block;border:0;outline:none;text-decoration:none;height:28px;width:148px;">`;

const shell = (body) => `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title></title></head>
<body style="margin:0;padding:0;background-color:#F4F7FA;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F7FA;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background-color:#121279;padding:24px 32px;">
          ${header}
        </td></tr>
        <tr><td style="padding:32px;">
${body}
        </td></tr>
        <tr><td style="background-color:#F4F7FA;padding:20px 32px;border-top:1px solid #E3E9EE;">
          <p style="margin:0;color:#4A5E6D;font-size:12px;font-family:Arial,Helvetica,sans-serif;">Codmify &middot; +234 903 187 4139 &middot; codmify@gmail.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const templates = [
  {
    id: 8306177,
    name: "hireUsCompany",
    subject: "New Service Request Received",
    html: shell(`          <h2 style="color:#121279;margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;">New Service Request</h2>
          <p style="color:#323F49;font-size:14px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">A new service request has come in from the Hire Us form.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;font-family:Arial,Helvetica,sans-serif;">
            <tr><td style="padding:8px 0;color:#4A5E6D;font-size:13px;width:140px;">Services requested</td><td style="padding:8px 0;color:#121279;font-size:14px;font-weight:bold;">{{var:category:""}}</td></tr>
            <tr><td style="padding:8px 0;color:#4A5E6D;font-size:13px;">Name</td><td style="padding:8px 0;color:#121279;font-size:14px;">{{var:name:""}}</td></tr>
            <tr><td style="padding:8px 0;color:#4A5E6D;font-size:13px;">Email</td><td style="padding:8px 0;color:#121279;font-size:14px;">{{var:email:""}}</td></tr>
            <tr><td style="padding:8px 0;color:#4A5E6D;font-size:13px;">Phone</td><td style="padding:8px 0;color:#121279;font-size:14px;">{{var:phone:""}}</td></tr>
            <tr><td style="padding:8px 0;color:#4A5E6D;font-size:13px;">Company</td><td style="padding:8px 0;color:#121279;font-size:14px;">{{var:companyName:"Not provided"}}</td></tr>
          </table>
          <p style="color:#4A5E6D;font-size:13px;margin-top:16px;font-family:Arial,Helvetica,sans-serif;">Project description</p>
          <p style="color:#323F49;font-size:14px;line-height:1.6;background-color:#F4F7FA;padding:16px;border-radius:8px;font-family:Arial,Helvetica,sans-serif;">{{var:projectDescription:""}}</p>
          <p style="color:#4A5E6D;font-size:13px;margin-top:24px;font-family:Arial,Helvetica,sans-serif;">Please respond to the client as soon as possible.</p>`),
    text: `New Service Request

Services requested: {{var:category:""}}
Name: {{var:name:""}}
Email: {{var:email:""}}
Phone: {{var:phone:""}}
Company: {{var:companyName:"Not provided"}}

Project description:
{{var:projectDescription:""}}

Please respond to the client as soon as possible.`,
  },
  {
    id: 8306178,
    name: "hireUsUser",
    subject: "Service Request Received - Thank You for Choosing Us!",
    html: shell(`          <h2 style="color:#121279;margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;">Thanks for reaching out, {{var:name:""}}!</h2>
          <p style="color:#323F49;font-size:14px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">Thank you for requesting a service from us. We have received your request and our team is currently reviewing it. You can expect a response within the next 24-48 hours.</p>
          <p style="color:#323F49;font-size:14px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">In the meantime, if you have any additional information or questions, feel free to reply to this email.</p>
          <p style="color:#323F49;font-size:14px;line-height:1.6;margin-top:24px;font-family:Arial,Helvetica,sans-serif;">Best regards,<br/><strong>Codmify Hub</strong><br/>Customer Service Team</p>`),
    text: `Thanks for reaching out, {{var:name:""}}!

Thank you for requesting a service from us. We have received your request and our team is currently reviewing it. You can expect a response within the next 24-48 hours.

In the meantime, if you have any additional information or questions, feel free to reply to this email.

Best regards,
Codmify Hub
Customer Service Team`,
  },
  {
    id: 8306179,
    name: "contactCompany",
    subject: "New Contact Form Submission",
    html: shell(`          <h2 style="color:#121279;margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;">New Contact Form Submission</h2>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:8px;font-family:Arial,Helvetica,sans-serif;">
            <tr><td style="padding:8px 0;color:#4A5E6D;font-size:13px;width:100px;">Name</td><td style="padding:8px 0;color:#121279;font-size:14px;">{{var:name:""}}</td></tr>
            <tr><td style="padding:8px 0;color:#4A5E6D;font-size:13px;">Email</td><td style="padding:8px 0;color:#121279;font-size:14px;">{{var:email:""}}</td></tr>
            <tr><td style="padding:8px 0;color:#4A5E6D;font-size:13px;">Phone</td><td style="padding:8px 0;color:#121279;font-size:14px;">{{var:phone:""}}</td></tr>
          </table>
          <p style="color:#4A5E6D;font-size:13px;margin-top:16px;font-family:Arial,Helvetica,sans-serif;">Message</p>
          <p style="color:#323F49;font-size:14px;line-height:1.6;background-color:#F4F7FA;padding:16px;border-radius:8px;font-family:Arial,Helvetica,sans-serif;">{{var:message:""}}</p>`),
    text: `New Contact Form Submission

Name: {{var:name:""}}
Email: {{var:email:""}}
Phone: {{var:phone:""}}

Message:
{{var:message:""}}`,
  },
  {
    id: 8306180,
    name: "contactUser",
    subject: "Thank you for contacting us!",
    html: shell(`          <h2 style="color:#121279;margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;">Thanks for contacting us, {{var:name:""}}!</h2>
          <p style="color:#323F49;font-size:14px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">We have received your message and will get back to you shortly.</p>
          <p style="color:#323F49;font-size:14px;line-height:1.6;margin-top:24px;font-family:Arial,Helvetica,sans-serif;">Best regards,<br/><strong>Codmify Hub</strong></p>`),
    text: `Thanks for contacting us, {{var:name:""}}!

We have received your message and will get back to you shortly.

Best regards,
Codmify Hub`,
  },
];

async function main() {
  for (const tpl of templates) {
    console.log(`Updating template ${tpl.name} (ID ${tpl.id})...`);
    await client
      .post("template", { version: "v3" })
      .id(tpl.id)
      .action("detailcontent")
      .request({
        "Html-part": tpl.html,
        "Text-part": tpl.text,
        Headers: { Subject: tpl.subject },
      });
    console.log("  -> done.");
  }
  console.log("\nAll 4 templates updated with the real Codmify logo.");
}

main().catch((err) => {
  console.error("FAILED:", err.statusCode, err.message);
  if (err.response && err.response.body) console.error(JSON.stringify(err.response.body));
  process.exit(1);
});
