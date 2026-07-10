import express from "express";
import { register, login, logout, verifyOtp, useBackupCode, forgotPassword, resetPassword, refreshToken, deleteAccount, getMe, promoteAdmin } from "../controllers/authController.js";
import { protect, admin } from "../middleware/auth.js";
import rateLimiter from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", rateLimiter({ prefix: "register-rate-limit", max: 3, emailKey: true, staleCheck: true }), register);
router.post("/login", rateLimiter({ prefix: "login-rate-limit", max: 5, emailKey: true, staleCheck: true, message: "Too many login attempts, try again later" }), login);
router.post("/logout", logout);
router.post("/use-backup-code", rateLimiter({ prefix: "backup-code-rate-limit", max: 5, windowSec: 300, emailKey: true, staleCheck: true }), useBackupCode);
router.post("/forgot-password", rateLimiter({ prefix: "forgot-rate-limit", max: 3 }), forgotPassword);
router.post("/reset-password/:token", rateLimiter({ prefix: "reset-rate-limit", max: 5 }), resetPassword);
router.post("/refresh-token", refreshToken);
router.delete("/delete-account", protect, deleteAccount);
router.get("/me", protect, getMe);
router.post("/promote-admin", protect, admin, promoteAdmin);

export default router;
