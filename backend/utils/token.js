import jwt from "jsonwebtoken";
import crypto from "crypto";

// ─── TOKEN HELPERS ──────────────────────────────────────────
// Access tokens (15m) are sent to the client and stored in
// localStorage. Refresh tokens (7d) are httpOnly cookies with
// their SHA-256 hash stored in Redis for server-side validation.
// The hash ensures the raw token is never logged or persisted.

export const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

export const generateAccessToken = (userId, tokenVersion = 0) => {
  return jwt.sign({ id: userId, tokenVersion }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  });
};

export const generateRefreshToken = (userId, tokenVersion = 0) => {
  return jwt.sign({ id: userId, tokenVersion }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
