// app/api/send-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import Mailjet from "node-mailjet";

// Create a Mailjet client instance with API credentials
const mailjetClient = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY as string,
  apiSecret: process.env.MAILJET_SECRET_KEY as string,
});

// Define types for request body data
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// POST method to handle email sending
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: ContactFormData = await request.json();

    // Destructure the form data
    const { name, email, message } = body;

    // Define Mailjet email request data
    const mailjetRequest = {
      Messages: [
        {
          From: {
            Email: process.env.COMPANY_EMAIL as string, // Your company email address
            Name: "Website Contact Form", // Name to appear on the email
          },
          To: [
            {
              Email: process.env.COMPANY_EMAIL as string, // Your company email address
              Name: "Recipient", // Name of the recipient (company)
            },
          ],
          Subject: "New Contact Form Submission",
          TextPart: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        },
      ],
    };

    // Send the email using Mailjet
    const result = await mailjetClient
      .post("send", { version: "v3.1" })
      .request(mailjetRequest);

    // Return a success response
    return NextResponse.json({
      message: "Message sent successfully!",
      data: result.body,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to send message.", error: error.message },
      { status: 500 }
    );
  }
}
