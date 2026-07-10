import express from "express";
import { register, login, logout, verifyOtp, useBackupCode, forgotPassword, resetPassword, refreshToken, deleteAccount, getMe, promoteAdmin } from "../controllers/authController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
// ─── verify-email disabled (email verification not used) ──
// router.post("/verify-email/:token", verifyEmail);
// ─── verify-otp disabled (OTP-based login removed) ──
// router.post("/verify-otp", verifyOtp);
router.post("/use-backup-code", useBackupCode);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh-token", refreshToken);
router.delete("/delete-account", protect, deleteAccount);
router.get("/me", protect, getMe);
router.post("/promote-admin", protect, admin, promoteAdmin);

export default router;
