import bcrypt from "bcryptjs";
import crypto from "crypto";
import TryCatch from "../middleware/tryCatch.js";
import User from "../models/User.js";
import { registerSchema, loginSchema } from "../validators/authValidate.js";
import redis from "../config/redis.js";
import sendMail from "../utils/email.js";
import {
  getOtpHtml,
  getVerifyEmailHtml,
  getWelcomeHtml,
  getResetPasswordHtml,
} from "../config/html.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashToken,
} from "../utils/token.js";

export const register = TryCatch(async (req, res) => {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map((i) => i.message);
    return res.status(400).json({ message: "Invalid user inputs", errors });
  }

  const { name, email, password } = result.data;

  const registerKey = `register-rate-limit:${req.ip}:${email}`;
  let attempts;
  try {
    attempts = await redis.incr(registerKey);
  } catch {
    await redis.del(registerKey);
    attempts = await redis.incr(registerKey);
  }
  if (attempts === 1) {
    await redis.expire(registerKey, 60);
  }
  if (attempts > 1 && (await redis.ttl(registerKey)) === -1) {
    await redis.del(registerKey);
  }
  if (attempts > 1) {
    return res
      .status(429)
      .json({ message: "Too many requests, try again later" });
  }

  if (await User.findOne({ email })) {
    return res.status(400).json({ message: "User already exist" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const verifyToken = crypto.randomBytes(32).toString("hex");
  await redis.set(
    `verify:${verifyToken}`,
    JSON.stringify({ name, email, hashedPassword }),
    { EX: 300 },
  );

  sendMail({
    to: email,
    subject: "Verify your email for Account Creation",
    html: getVerifyEmailHtml(email, verifyToken),
  }).catch((err) =>
    console.error(
      `Email failed (Verify your email for Account Creation):`,
      err.message,
    ),
  );

  res.json({
    message: "If your email is valid, a verification link has been sent.",
  });
});

export const login = TryCatch(async (req, res) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.issues.map((i) => i.message);
    return res.status(400).json({ message: "Invalid login inputs", errors });
  }

  const { email, password } = result.data;

  const loginKey = `login-rate-limit:${req.ip}:${email}`;
  let attempts;
  try {
    attempts = await redis.incr(loginKey);
  } catch {
    await redis.del(loginKey);
    attempts = await redis.incr(loginKey);
  }
  if (attempts === 1) {
    await redis.expire(loginKey, 60);
  }
  if (attempts > 1 && (await redis.ttl(loginKey)) === -1) {
    await redis.del(loginKey);
  }
  if (attempts > 1) {
    return res
      .status(429)
      .json({ message: "Too many login attempts, try again later" });
  }

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const otp = crypto.randomInt(10000, 99999).toString();
  await redis.set(`otp:${email}`, otp, { EX: 300 });

  sendMail({
    to: email,
    subject: "Your OTP for login verification",
    html: getOtpHtml(email, otp),
  }).catch((err) =>
    console.error(
      `Email failed (Your OTP for login verification):`,
      err.message,
    ),
  );

  res.json({
    message: "If email is valid, an OTP has been sent for verification",
  });
});

export const logout = TryCatch(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  if (refreshToken) {
    await redis.del(`refresh:${hashToken(refreshToken)}`);
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
});

export const verifyEmail = TryCatch(async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({ message: "Verification token is required" });
  }

  const verifyKey = `verify:${token}`;
  const pendingUser = await redis.get(verifyKey);

  if (!pendingUser) {
    return res
      .status(400)
      .json({ message: "Verification token is invalid or expired" });
  }

  await redis.del(verifyKey);

  if (await User.findOne({ email: pendingUser.email })) {
    return res.status(400).json({ message: "User already exists" });
  }

  const userCount = await User.countDocuments();
  const newUser = await User.create({
    name: pendingUser.name,
    email: pendingUser.email,
    password: pendingUser.hashedPassword,
    isVerified: true,
    role: userCount === 0 ? "admin" : "user",
  });

  res.status(201).json({
    message: "Email verified successfully. Account created.",
    user: { _id: newUser.id, name: newUser.name, email: newUser.email },
  });
});

export const verifyOtp = TryCatch(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const otpKey = `otp:${email}`;
  const storedOtp = await redis.get(otpKey);

  if (!storedOtp) {
    return res.status(400).json({ message: "OTP expired or not found" });
  }

  if (String(storedOtp) !== String(otp)) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  await redis.del(otpKey);

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  sendMail({
    to: email,
    subject: "Welcome to Mern Auth!",
    html: getWelcomeHtml(user.name),
  }).catch((err) =>
    console.error(`Email failed (Welcome to Mern Auth!):`, err.message),
  );
  const REFRESH_TTL = 7 * 24 * 60 * 60;
  await redis.set(`refresh:${hashToken(refreshToken)}`, user.id, { EX: REFRESH_TTL });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: REFRESH_TTL * 1000,
  });

  res.json({
    message: `Welcome ${user.name}`,
    accessToken,
    user: { _id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

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

    const accessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);
    const newHash = hashToken(newRefreshToken);
    const REFRESH_TTL = 7 * 24 * 60 * 60;

    await redis.set(`refresh:${newHash}`, user.id, { EX: REFRESH_TTL });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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

export const forgotPassword = TryCatch(async (req, res) => {
  const { email } = req.body;
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

export const resetPassword = TryCatch(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Reset token is required" });
  }

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  const resetKey = `reset:${token}`;
  const email = await redis.get(resetKey);

  if (!email) {
    return res
      .status(400)
      .json({ message: "Reset token is invalid or expired" });
  }

  await redis.del(resetKey);

  const hashedPassword = await bcrypt.hash(password, 12);
  await User.updateOne({ email }, { password: hashedPassword });

  res.json({ message: "Password reset successfully" });
});

export const getMe = TryCatch(async (req, res) => {
  res.json({ user: req.user });
});
