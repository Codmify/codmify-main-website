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
          Subject: "New Contact Form Submission",
          TextPart: `Name: ${name}\nEmail: ${email}\nPhone Number: ${phone}\nMessage: ${message}`,
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
          Subject: "Thank you for contacting us!",
          TextPart: `Hello ${name},\n\nThank you for reaching out to us! We have received your message and will get back to you shortly.\n\nBest regards,\nCodmify Hub`,
        },
      ],
    };

    // Send the email to the company using Mailjet
    const resultToCompany = await mailjetClient
      .post("send", { version: "v3.1" })
      .request(mailjetRequestToCompany);

    // Send the confirmation email to the user
    const resultToUser = await mailjetClient
      .post("send", { version: "v3.1" })
      .request(mailjetRequestToUser);

    // Return a success response
    return NextResponse.json({
      message: "Message sent successfully!",
      data: { company: resultToCompany.body, user: resultToUser.body },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to send emails.", error: error.message },
      { status: 500 }
    );
  }
}
