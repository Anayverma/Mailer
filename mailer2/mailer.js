import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2"; // ES Modules import
import 'dotenv/config'
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
    "arn:aws:ses:ap-southeast-2:590183882178:identity/anayverma2147@gmail.com",
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
    "arn:aws:ses:ap-southeast-2:590183882178:identity/anayverma2147@gmail.com",
  Content: {
    // EmailContent
    Simple: {
      // Message
      Subject: {
        // Content
        Data: "Test Email Subject", // required
        Charset: "UTF-8",
      },
      Body: {
        // Body
        Text: {
          Data: "This is a test email body in plain text.", // required
          Charset: "UTF-8",
        },
        Html: {
          Data: "<html><body><h1>This is a test email body in HTML</h1></body></html>", // required
          Charset: "UTF-8",
        },
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
} catch (error) {
  console.error(error);
}

// import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2"; // ES Modules import
// // const { SESv2Client, SendEmailCommand } = require("@aws-sdk/client-sesv2"); // CommonJS import
// const client = new SESv2Client(config);
// const input = { // SendEmailRequest
//   FromEmailAddress: "STRING_VALUE",
//   FromEmailAddressIdentityArn: "STRING_VALUE",
//   Destination: { // Destination
//     ToAddresses: [ // EmailAddressList
//       "STRING_VALUE",
//     ],
//     CcAddresses: [
//       "STRING_VALUE",
//     ],
//     BccAddresses: [
//       "STRING_VALUE",
//     ],
//   },
//   ReplyToAddresses: [
//     "STRING_VALUE",
//   ],
//   FeedbackForwardingEmailAddress: "STRING_VALUE",
//   FeedbackForwardingEmailAddressIdentityArn: "STRING_VALUE",
//   Content: { // EmailContent
//     Simple: { // Message
//       Subject: { // Content
//         Data: "STRING_VALUE", // required
//         Charset: "STRING_VALUE",
//       },
//       Body: { // Body
//         Text: {
//           Data: "STRING_VALUE", // required
//           Charset: "STRING_VALUE",
//         },
//         Html: {
//           Data: "STRING_VALUE", // required
//           Charset: "STRING_VALUE",
//         },
//       },
//       Headers: [ // MessageHeaderList
//         { // MessageHeader
//           Name: "STRING_VALUE", // required
//           Value: "STRING_VALUE", // required
//         },
//       ],
//     },
//   },
//   EmailTags: [ // MessageTagList
//     { // MessageTag
//       Name: "STRING_VALUE", // required
//       Value: "STRING_VALUE", // required
//     },
//   ],
//   ConfigurationSetName: "STRING_VALUE",
//   ListManagementOptions: { // ListManagementOptions
//     ContactListName: "STRING_VALUE", // required
//     TopicName: "STRING_VALUE",
//   },
// };
// const command = new SendEmailCommand(input);
// const response = await client.send(command);
