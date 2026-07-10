import { createTransport } from "nodemailer";

const port = Number(process.env.SMTP_PORT) || 587;

// Transport is created once at startup. SMTP credentials must be
// set in env vars (SMTP_HOST, SMTP_USER, SMTP_PASS). If SMTP is
// not configured, forgot-password and welcome emails will silently
// fail (caught by .catch in the callers).
const transport = createTransport({
  host: process.env.SMTP_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Simple retry: up to 2 additional attempts with 1s / 2s backoff
const MAX_RETRIES = 2;

const sendMail = async ({ to, subject, html }, attempt = 1) => {
  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error(`Email attempt ${attempt}/${MAX_RETRIES + 1} failed to ${to}: ${error.message}`);
    if (attempt <= MAX_RETRIES) {
      await new Promise((r) => setTimeout(r, 1000 * attempt));
      return sendMail({ to, subject, html }, attempt + 1);
    }
    throw error;
  }
};

export default sendMail;
