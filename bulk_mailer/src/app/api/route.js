"use server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const {
    emailUser,
    emailPass,
    recipientEmails,
    senderName,
    subject,
    placeholders,
    templateId,
  } = await req.json();
  console.log(
    emailUser,
    emailPass,
    recipientEmails,
    senderName,
    subject,
    placeholders,
    templateId
  );
  if (
    !emailUser ||
    !emailPass ||
    !recipientEmails.length ||
    !subject ||
    !templateId ||
    !senderName
  ) {
    return new Response(JSON.stringify({ error: "All fields are required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const templates = [
    {
      id: 1,
      template: "Hello [name],\n\nThis is a reminder about [event]. Please remember to [action].\n\nBest,\n[Your Name]",
      placeholders: ["name", "event", "action"]
    },
    {
      id: 2,
      template: "Dear [name],\n\nThank you for [reason]. We appreciate your [appreciation].\n\nSincerely,\n[Your Name]",
      placeholders: ["name", "reason", "appreciation"]
    },
    {
      id: 3,
      template: "Hi [name],\n\nYour appointment for [appointment] is scheduled on [date]. Please be on time.\n\nRegards,\n[Your Name]",
      placeholders: ["name", "appointment", "date"]
    },
    {
      id: 4,
      template: "Greetings [name],\n\nWe are excited to invite you to [event]. The event will take place on [date] at [location].\n\nWarm regards,\n[Your Name]",
      placeholders: ["name", "event", "date", "location"]
    },
    {
      id: 5,
      template: "Hey [name],\n\nDon't forget about [reminder]. It's happening on [date].\n\nCheers,\n[Your Name]",
      placeholders: ["name", "reminder", "date"]
    },
    {id: 6,
      template: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <div style="text-align: center;">
            <img src="https://plus.unsplash.com/premium_photo-1683120963435-6f9355d4a776?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Banner" style="width: 100%; height: auto; max-width: 600px; margin-bottom: 20px;">
          </div>
          <p>Hello [name],</p>
          <p>This is a reminder about <strong>[event]</strong>. Please remember to <em>[action]</em>.</p>
          <p>Best,</p>
          <p style="font-size: 18px; color: #555;">[Your Name]</p>
        </div>
      `,
      placeholders: ["name", "event", "action"]}

  ];

  const selectedTemplate = templates.find((t) => t.id === parseInt(templateId));

  if (!selectedTemplate) {
    return new Response(JSON.stringify({ error: "Invalid template ID." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  let emailContent = selectedTemplate.template;
  for (const [placeholder, value] of Object.entries(placeholders)) {
    emailContent = emailContent.replace(`[${placeholder}]`, value);
  }
  emailContent = emailContent.replace("[Your Name]", senderName);

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
      from: `${senderName} <${emailUser}>`,
      to: recipientEmails.join(","),
      subject: subject,
      html: `<pre>${emailContent}</pre>`,
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
