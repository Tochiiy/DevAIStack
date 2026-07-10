import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// Crash early if critical env vars are missing — no point running without them
const REQUIRED_ENV = ["MONGO_URI", "JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "UPSTASH_REDIS_REST_URL"];
for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`Missing required env: ${key}`);
    process.exit(1);
  }
}

const app = express();

// Strip trailing slash so CORS origin matches exactly
const corsOrigin = (process.env.FRONTEND_URL || "").replace(/\/+$/, "");

// ─── Middleware stack ──────────────────────────────────────────
// Order matters: helmet first (security headers), then parsing,
// then cors with credentials so cookies are sent cross-origin.
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: corsOrigin,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));
// Trust Render's proxy so req.ip reflects real client IP for rate limiting
app.set("trust proxy", 1);

// ─── Routes ──────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Quick health check for Render uptime monitoring
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running", status: "healthy" });
});

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
