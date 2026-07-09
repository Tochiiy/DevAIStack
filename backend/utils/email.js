import { createTransport } from "nodemailer";

const transport = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async ({ to, subject, html }) => {
  await transport.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
};

export default sendMail;
