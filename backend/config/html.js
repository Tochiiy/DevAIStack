const escapeHtml = (str) =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const appName = () => process.env.APP_NAME || "Auth App";

const baseUrl = () => (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/+$/, "");

/* getVerifyEmailHtml removed — all registrations create users directly */

export const getWelcomeHtml = (name) => {
  const safeName = escapeHtml(name);
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; padding: 30px; text-align: center; }
      h1 { color: #333; }
      p { color: #555; line-height: 1.6; }
    </style>
  </head>
  <body>
    <div class="container">
      <p>${appName()}</p>
      <h1>Welcome ${safeName}!</h1>
      <p>Your account has been verified successfully. You can now access all features.</p>
    </div>
  </body>
  </html>
`;
};

export const getResetPasswordHtml = (token) => {
  const resetUrl = `${baseUrl()}/reset-password/${encodeURIComponent(token)}`;
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; padding: 30px; }
      h1 { color: #333; }
      p { color: #555; line-height: 1.6; }
      .btn { display: inline-block; padding: 12px 24px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    </style>
  </head>
  <body>
    <div class="container">
      <p>${appName()}</p>
      <h1>Reset your password</h1>
      <p>Click the button below to reset your password. This link expires in 1 hour.</p>
      <a class="btn" href="${resetUrl}">Reset password</a>
      <p style="font-size:12px;color:#888;word-break:break-all;">${resetUrl}</p>
      <p>If you didn't request this, you can ignore this email.</p>
    </div>
  </body>
  </html>
`;
};
