import nodemailer from "nodemailer";
import ENV from "../config/env";

async function sendEmail(to: string, verifyUrl: string) {
  const transport = nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: ENV.SMTP_PORT,    
    secure: false,
    auth: {
      user: ENV.SMTP_USER,
      pass: ENV.SMTP_PASS,
    },
  });

  await transport.sendMail({
    from: ENV.EMAIL_FROM,
    to,
    subject: "Verify your email",
    html: `
      <p>please verify your emal by clicking this link:</p>
      <p><a href="${verifyUrl}">${verifyUrl}</a></p>
    `,
  });
}

export default sendEmail;
