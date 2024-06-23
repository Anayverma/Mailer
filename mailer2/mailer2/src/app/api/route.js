
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2"; // ES Modules import
export async function POST(req){

    const {sub , con}=await req.json();
    console.log(sub,"  ",con)
console.log(process.env.NEXT_PUBLIC_ACCESS_KEY)
const config = {
  region: "ap-southeast-2", // Specify your region
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  },
};

const client = new SESv2Client(config);

const input = {
  // SendEmailRequest
  FromEmailAddress: "anayverma2147@gmail.com",
  FromEmailAddressIdentityArn:
   process.env.NEXT_PUBLIC_ACC,
  Destination: {
    // Destination
    ToAddresses: [
      // EmailAddressList
      "anayverma2022@vitbhopal.ac.in",
    ],
    CcAddresses: ["anayverma2022@vitbhopal.ac.in"],
    BccAddresses: ["anayverma2022@vitbhopal.ac.in"],
  },
  ReplyToAddresses: ["anayverma2022@vitbhopal.ac.in"],
  FeedbackForwardingEmailAddress: "anayverma2147@gmail.com",
  FeedbackForwardingEmailAddressIdentityArn:
   process.env.NEXT_PUBLIC_ACC,
  Content: {
    // EmailContent
    Simple: {
      // Message
      Subject: {
        // Content
        Data: sub, // required
        Charset: "UTF-8",
      },
      Body: {
        // Body
        Text: {
          Data: con, // required
          Charset: "UTF-8",
        },
        // Html: {
        //   Data: "<html><body><h1>This is a test email body in HTML</h1></body></html>", // required
        //   Charset: "UTF-8",
        // },
      },
      Headers: [
        // MessageHeaderList
        {
          // MessageHeader
          Name: "X-Custom-Header",
          Value: "CustomHeaderValue",
        },
      ],
    },
  },
  EmailTags: [
    // MessageTagList
    {
      // MessageTag
      Name: "campaign",
      Value: "test",
    },
  ],
};

const command = new SendEmailCommand(input);

try {
  const response = await client.send(command);
  console.log(response);
  return new Response(
    JSON.stringify({ message: "Email sent successfully" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
} catch (error) {
  console.error(error);
  return new Response(
    JSON.stringify({
      message: "Error sending email",
      error: error.message,
    }),
    {
      status: 500,
      headers: { "Content-Type": "application/json" },
    }
  );
}
}