import bcrypt from "bcryptjs";
import crypto from "crypto";
import TryCatch from "../middleware/tryCatch.js";
import User from "../models/User.js";
import { registerSchema, loginSchema, resetPasswordSchema } from "../validators/authValidate.js";
import redis from "../config/redis.js";
import sendMail from "../utils/email.js";
import {
  getResetPasswordHtml,
} from "../config/html.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashToken,
} from "../utils/token.js";

// ─── REGISTER ────────────────────────────────────────────────
// Creates a user immediately (no email verification), generates 5
// bcrypt-hashed backup codes returned exactly once. First user is
// auto-promoted to admin. Rate-limited to 3 per 60s per IP+email.
export const register = TryCatch(async (req, res) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map((i) => i.message);
    return res.status(400).json({ message: "Invalid user inputs", errors });
  }

  const { name, email: rawEmail, password } = result.data;
  const email = rawEmail.toLowerCase();

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "Unable to register with this email." });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  // First user to sign up is admin; everyone else is a regular user
  const userCount = await User.countDocuments();
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: userCount === 0 ? "admin" : "user",
  });

  // Generate 5 x 6-digit backup codes, bcrypt-hashed for storage
  const rawCodes = [];
  const hashedCodes = [];
  for (let i = 0; i < 5; i++) {
    const code = crypto.randomInt(100000, 1000000).toString();
    rawCodes.push(code);
    hashedCodes.push(await bcrypt.hash(code, 6));
  }
  newUser.backupCodes = hashedCodes;
  await newUser.save();

  res.status(201).json({
    message: "Account created successfully.",
    user: { _id: newUser.id, name: newUser.name, email: newUser.email },
    backupCodes: rawCodes,
  });
});

/* verifyEmail removed — all registrations create users directly */

// ─── LOGIN ───────────────────────────────────────────────────
// Direct email + password login (no OTP). Returns access token
// in body + refresh token as httpOnly cookie. Rate: 5 per 60s.
export const login = TryCatch(async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map((i) => i.message);
    return res.status(400).json({ message: "Invalid login inputs", errors });
  }

  const { email: rawEmail, password } = result.data;
  const email = rawEmail.toLowerCase();

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // isVerified check removed — email verification was eliminated.
  // All registrations now set isVerified: true. Old unverified accounts
  // can still log in since there is no verify flow available.

  const accessToken = generateAccessToken(user.id, user.tokenVersion);
  const refreshToken = generateRefreshToken(user.id, user.tokenVersion);
  const REFRESH_TTL = 7 * 24 * 60 * 60;
  await redis.set(`refresh:${hashToken(refreshToken)}`, user.id, { EX: REFRESH_TTL });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: REFRESH_TTL * 1000,
  });

  res.json({
    message: `Welcome ${user.name}`,
    accessToken,
    user: { _id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

// ─── LOGOUT ──────────────────────────────────────────────────
// Deletes the refresh token from Redis and clears the cookie.
export const logout = TryCatch(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    await redis.del(`refresh:${hashToken(refreshToken)}`);
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });

  res.json({ message: "Logged out successfully" });
});

// ─── VERIFY OTP (disabled) ──────────────────────────────────
// OTP-based login has been removed. This controller is preserved
// in case email-based OTP login is re-enabled. The route in
// authRoutes.js is currently commented out.
export const verifyOtp = TryCatch(async (req, res) => {
  const { email: rawEmail, otp } = req.body;
  const email = rawEmail.toLowerCase();

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const otpKey = `otp:${email}`;
  const storedOtp = await redis.get(otpKey);

  if (!storedOtp) {
    return res.status(400).json({ message: "OTP expired or not found" });
  }

  if (String(storedOtp) !== String(otp)) {
    await redis.del(otpKey);
    return res.status(400).json({ message: "Invalid OTP" });
  }

  await redis.del(otpKey);

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const accessToken = generateAccessToken(user.id, user.tokenVersion);
  const refreshToken = generateRefreshToken(user.id, user.tokenVersion);

  const REFRESH_TTL = 7 * 24 * 60 * 60;
  await redis.set(`refresh:${hashToken(refreshToken)}`, user.id, { EX: REFRESH_TTL });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: REFRESH_TTL * 1000,
  });

  res.json({
    message: `Welcome ${user.name}`,
    accessToken,
    user: { _id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

// ─── REFRESH TOKEN ──────────────────────────────────────────
// Rotating refresh token pattern: old token is deleted from Redis
// and a new pair is issued. If the old token is already gone (reuse
// attempt), we return 401. The frontend's 401 interceptor queue
// prevents race conditions during concurrent requests.
export const refreshToken = TryCatch(async (req, res) => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "No refresh token" });
  }

  try {
    const decoded = verifyRefreshToken(token);
    const tokenHash = hashToken(token);
    const stored = await redis.get(`refresh:${tokenHash}`);

    if (!stored) {
      return res
        .status(401)
        .json({ message: "Refresh token revoked, login again" });
    }

    await redis.del(`refresh:${tokenHash}`);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const accessToken = generateAccessToken(user.id, user.tokenVersion);
    const newRefreshToken = generateRefreshToken(user.id, user.tokenVersion);
    const newHash = hashToken(newRefreshToken);
    const REFRESH_TTL = 7 * 24 * 60 * 60;

    await redis.set(`refresh:${newHash}`, user.id, { EX: REFRESH_TTL });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: REFRESH_TTL * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Refresh token expired, login again" });
    }
    return res.status(401).json({ message: "Invalid refresh token" });
  }
});

// ─── FORGOT PASSWORD ────────────────────────────────────────
// Always returns the same message regardless of whether the email
// exists (prevents email enumeration). If the user exists, a reset
// link is emailed. Rate: 3 requests per 60s per IP.
export const forgotPassword = TryCatch(async (req, res) => {
  const { email: rawEmail } = req.body;
  const email = rawEmail?.toLowerCase();
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });
  if (user) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    await redis.set(`reset:${resetToken}`, email, { EX: 3600 });

    sendMail({
      to: email,
      subject: "Reset your password",
      html: getResetPasswordHtml(resetToken),
    }).catch((err) =>
      console.error(`Email failed (Reset your password):`, err.message),
    );
  }

  res.json({
    message: "If that email is registered, a reset link has been sent.",
  });
});

// ─── RESET PASSWORD ─────────────────────────────────────────
// Validates the reset token from Redis, hashes the new password
// (bcrypt 12 rounds), and increments the user's tokenVersion to
// invalidate all existing sessions. Rate: 5 per 60s per IP.
export const resetPassword = TryCatch(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Reset token is required" });
  }

  const result = resetPasswordSchema.safeParse({ password });
  if (!result.success) {
    const errors = result.error.issues.map((i) => i.message);
    return res.status(400).json({ message: "Invalid password", errors });
  }

  const resetKey = `reset:${token}`;
  const email = await redis.get(resetKey);

  if (!email) {
    return res.status(400).json({ message: "Reset token is invalid or expired" });
  }

  await redis.del(resetKey);

  const hashedPassword = await bcrypt.hash(result.data.password, 12);
  const user = await User.findOne({ email });
  if (user) {
    user.password = hashedPassword;
    user.tokenVersion += 1;
    await user.save();
    await redis.del(`user:${user.id}`);
  }

  res.json({ message: "Password reset successfully" });
});

// ─── DELETE ACCOUNT ─────────────────────────────────────────
// Removes user from MongoDB, deletes refresh token from Redis,
// clears the auth cookie. Protected by the `protect` middleware.
export const deleteAccount = TryCatch(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    await redis.del(`refresh:${hashToken(refreshToken)}`);
  }

  await User.findByIdAndDelete(req.user._id);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  });
  res.json({ message: "Account deleted permanently" });
});

// ─── PROMOTE ADMIN ─────────────────────────────────────────
// Sets a user's role to admin. Requires the caller to already
// be an admin (checked by the `admin` middleware in the route).
export const promoteAdmin = TryCatch(async (req, res) => {
  const { email: rawEmail } = req.body;
  const email = rawEmail?.toLowerCase();
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.role = "admin";
  await user.save();
  await redis.del(`user:${user.id}`);
  res.json({ message: `${email} promoted to admin`, user: { _id: user.id, name: user.name, email: user.email, role: user.role } });
});

// ─── USE BACKUP CODE ───────────────────────────────────────
// Validates a 6-digit backup code against the user's stored
// bcrypt hashes. On success, the used hash is removed (one-time
// use) and a full token pair is issued. Rate: 5 per 300s window.
export const useBackupCode = TryCatch(async (req, res) => {
  const { email: rawEmail, code } = req.body;
  const email = rawEmail?.toLowerCase();
  if (!email || !code) {
    return res.status(400).json({ message: "Email and backup code are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or backup code" });
  }

  let matchedCode = null;
  for (const hashedCode of user.backupCodes) {
    if (await bcrypt.compare(code, hashedCode)) {
      matchedCode = hashedCode;
      break;
    }
  }

  if (!matchedCode) {
    return res.status(401).json({ message: "Invalid email or backup code" });
  }

  user.backupCodes = user.backupCodes.filter((c) => c !== matchedCode);
  await user.save();

  const accessToken = generateAccessToken(user.id, user.tokenVersion);
  const refreshToken = generateRefreshToken(user.id, user.tokenVersion);
  const REFRESH_TTL = 7 * 24 * 60 * 60;
  await redis.set(`refresh:${hashToken(refreshToken)}`, user.id, { EX: REFRESH_TTL });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: REFRESH_TTL * 1000,
  });

  res.json({
    message: `Welcome ${user.name}`,
    accessToken,
    user: { _id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

export const getMe = TryCatch(async (req, res) => {
  res.json({ user: req.user });
});
