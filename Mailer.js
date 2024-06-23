const nodemailer = require("nodemailer");
// Import NodeMailer (after npm install)

async function main() {
// Async function enables allows handling of promises with await

  // First, define send settings by creating a new transporter: 
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: "", // Your email address
      pass: "", // Password (for gmail, your app password) 2 step verfication
      // ⚠️ For better security, use environment variables set on the server for these values when deploying
    },
  });
  
  // Define and send message inside transporter.sendEmail() and await info about send from promise:
  let info = await transporter.sendMail({
    from: '"Anay Verma" <anayverma2147@gmail.com>',
    to: "ananya.verma@ennoblee.com,laxmivermaca@gmail.com",
    subject: "Testing, testinguyg, 321",
    html: `
    <h1>Hello there</h1>
    <p>Isn't NodeMailer useful?</p>
    `,
  });

  console.log(info.messageId); // Random ID generated after successful send (optional)
}

main()
.then(()=>{
    console.log("emailed successfully ");
    process.exit(0);
})
.catch(err => console.log(err));