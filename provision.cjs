// Run this from the project root (needs node_modules/node-mailjet resolvable):
//   node provision.cjs
// Reads MAILJET_API_KEY / MAILJET_SECRET_KEY from the project's .env,
// creates 4 transactional templates in the Mailjet account, and writes
// scratchpad-mailjet-results.json with their IDs.

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

const shell = (body) => `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title></title></head>
<body style="margin:0;padding:0;background-color:#F4F7FA;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F7FA;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background-color:#121279;padding:24px 32px;">
          <span style="display:inline-block;width:28px;height:28px;background-color:#008DE5;border-radius:6px;color:#ffffff;font-weight:bold;font-size:16px;line-height:28px;text-align:center;vertical-align:middle;font-family:Arial,Helvetica,sans-serif;">C</span>
          <span style="color:#ffffff;font-size:20px;font-weight:bold;vertical-align:middle;margin-left:8px;font-family:Arial,Helvetica,sans-serif;">codmify</span>
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
    key: "hireUsCompany",
    name: "Codmify - New Service Request (Company)",
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
    key: "hireUsUser",
    name: "Codmify - Service Request Received (User)",
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
    key: "contactCompany",
    name: "Codmify - New Contact Form Submission (Company)",
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
    key: "contactUser",
    name: "Codmify - Thanks for Contacting Us (User)",
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
  const results = {};
  for (const tpl of templates) {
    console.log(`Creating template: ${tpl.name}`);
    const createRes = await client.post("template", { version: "v3" }).request({
      Name: tpl.name,
      Purposes: ["transactional"],
    });
    const id = createRes.body.Data[0].ID;
    console.log(`  -> ID ${id}, setting content...`);

    await client.post("template", { version: "v3" }).id(id).action("detailcontent").request({
      "Html-part": tpl.html,
      "Text-part": tpl.text,
      "Headers": { Subject: tpl.subject },
    });

    results[tpl.key] = { id, name: tpl.name };
    console.log("  -> content set.");
  }

  fs.writeFileSync(path.join(process.cwd(), "scratchpad-mailjet-results.json"), JSON.stringify(results, null, 2));
  console.log("\nDone. Results:", JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error("FAILED:", err.statusCode, err.message);
  if (err.response && err.response.body) console.error(JSON.stringify(err.response.body));
  process.exit(1);
});
