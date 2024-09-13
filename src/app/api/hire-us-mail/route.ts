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
  category: string;
  companyName: string;
  projectDescription: string;
}

// POST method to handle email sending
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: ContactFormData = await request.json();

    // Destructure the form data
    const { name, email, category, companyName, projectDescription } = body;

    // Define Mailjet email request data to send to the company
    const mailjetRequestToCompany = {
      Messages: [
        {
          From: {
            Email: process.env.COMPANY_EMAIL as string, // Your company email address
            Name: "Service Request Form",
          },
          To: [
            {
              Email: process.env.COMPANY_EMAIL as string, // Your company email address
              Name: "Recipient",
            },
          ],
          Subject: "New Service Request Received",
          TextPart: `You have received a new service request.\nServices Requested: ${category}
            \nName: ${name}
            \nEmail: ${email}
            \nCompany Name: ${companyName || "Not provided"}
            \nProject Description: ${projectDescription}
            \n\n
            Please respond to the client as soon as possible.`,
        },
      ],
    };

    // Define Mailjet email request data to send a confirmation to the user requesting a service
    const mailjetRequestToUser = {
      Messages: [
        {
          From: {
            Email: process.env.COMPANY_EMAIL as string, // Your company email address
            Name: "Codmify Hub", // Codmify Hub to appear as sender
          },
          To: [
            {
              Email: email, // User's email from the form
              Name: name, // User's name from the form
            },
          ],
          Subject: "Service Request Received - Thank You for Choosing Us!",
          TextPart: `Hello ${name},\n\nThank you for requesting a service from us. We have received your request and our team is currently reviewing it. You can expect a response within the next 24-48 hours.\n\nIn the meantime, if you have any additional information or questions, feel free to reply to this email.\n\nBest regards,\nCodmify Hub\nCustomer Service Team`,
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
      message: "Emails sent successfully!",
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
