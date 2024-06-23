"use server";
import nodemailer from "nodemailer";

// export default async function POST(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Only POST requests are allowed" });
//   }

//   const { emailUser, emailPass, name, email, subject, message } = req.body;

//   if (!emailUser || !emailPass || !name || !email || !subject || !message) {
//     return Response.json({ message: "All fields are required" });
//   }

//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: emailUser,
//       pass: emailPass,
//     },
//   });

//   try {
//     let info = await transporter.sendMail({
//       from: `"${name}" <${email}>`,
//       to: "ananya.verma@ennoblee.com, laxmivermaca@gmail.com",
//       subject: subject,
//       html: `
//         <h1>${subject}</h1>
//         <p>${message}</p>
//         <p>From: ${name} (${email})</p>
//       `,
//     });
//     console.log(html);
//     console.log("Message sent: %s", info.messageId);
//     Response.json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error(error);
//     Response.json({
//       message: "Error sending email",
//       error: error.message,
//     });
//   }
// }

export async function GET() {
  return Response.json({ data: "hii" });
}

// export async function POST(res) {

//   const data = await res.json()

//   return Response.json(data)
// }
// export async function POST(req) {
//   const { emailUser, emailPass, name, email, subject, message } = await req.json();

//   if (!emailUser || !emailPass || !name || !email || !subject || !message) {
//     return Response.json({ req });
//   }

//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: emailUser,
//       pass: emailPass,
//     },
//   });

//   console.log("mail karrahe")
//   try {
//   console.log("mail karnewale")

//     let info = await transporter.sendMail({
//       from: `"${name}" <${email}>`,
//       to: "ananya.verma@ennoblee.com, laxmivermaca@gmail.com",
//       subject: subject,
//       html: `
//         <h1>${subject}</h1>
//         <p>${message}</p>
//         <p>From: ${name} (${email})</p>
//       `,
//     });
//     // console.log(html);
//     console.log("Message sent: %s", info.messageId);
//     return Response.json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error(error);
//     return Response.json({
//       message: "Error sending email",
//       error: error.message,
//     });
//   }
// }
// import nodemailer from 'nodemailer';

export async function POST(req) {
  const {
    emailUser,
    emailPass,
    recipientEmail,
    name,
    email,
    subject,
    message,
  } = await req.json();

  if (
    !emailUser ||
    !emailPass ||
    !recipientEmail ||
    !name ||
    !email ||
    !subject ||
    !message
  ) {
    return new Response(JSON.stringify({ error: "All fields are required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: recipientEmail,
      subject: subject,
      html: `
        <h1>${subject}</h1>
        <p>${message}</p>
        <p>From: ${name} (${email})</p>
      `,
    });

    console.log("Message sent: %s", info.messageId);
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
