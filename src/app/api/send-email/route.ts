// app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import Mailjet from "node-mailjet";

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

// Define types for request body data
interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone: string;
}

// POST method to handle email sending
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: ContactFormData = await request.json();

    // Destructure the form data
    const { name, email, message, phone } = body;

    // Define Mailjet email request data to send to the company
    const mailjetRequestToCompany = {
      Messages: [
        {
          From: {
            Email: process.env.COMPANY_EMAIL as string, // Your company email address
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
            Email: process.env.COMPANY_EMAIL as string, // Your company email address
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
    const resultToCompany = await getMailjetClient()
      .post("send", { version: "v3.1" })
      .request(mailjetRequestToCompany);

    // Send the confirmation email to the user
    const resultToUser = await getMailjetClient()
      .post("send", { version: "v3.1" })
      .request(mailjetRequestToUser);

    // Return a success response
    return NextResponse.json({
      message: "Message sent successfully!",
      data: { company: resultToCompany.body, user: resultToUser.body },
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to send emails.", error: message },
      { status: 500 }
    );
  }
}
