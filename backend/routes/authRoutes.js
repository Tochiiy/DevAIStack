import express from "express";
import { register, login, logout, verifyEmail, verifyOtp, forgotPassword, resetPassword, refreshToken, deleteAccount, getMe, promoteAdmin } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/verify-email/:token", verifyEmail);
router.post("/verify-otp", verifyOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh-token", refreshToken);
router.delete("/delete-account", protect, deleteAccount);
router.get("/me", protect, getMe);
router.post("/promote-admin", promoteAdmin);

export default router;
