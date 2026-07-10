import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import mongoose from "mongoose";

const TEST_MONGO_URI = process.env.TEST_MONGO_URI;
const TEST_REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;

const describeOrSkip = TEST_MONGO_URI && TEST_REDIS_URL ? describe : describe.skip;

describeOrSkip("Auth Integration", () => {
  let app;
  let accessToken;
  let refreshCookie;
  const testUser = {
    name: "Test User",
    email: `test_${Date.now()}@example.com`,
    password: "StrongPass1",
    confirmPassword: "StrongPass1",
  };

  beforeAll(async () => {
    process.env.MONGO_URI = TEST_MONGO_URI;
    process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "test-access-secret";
    process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "test-refresh-secret";
    process.env.NODE_ENV = "test";
    process.env.UPSTASH_REDIS_REST_URL = TEST_REDIS_URL;

    const { default: express } = await import("express");
    const { default: cookieParser } = await import("cookie-parser");
    const { default: cors } = await import("cors");
    const { default: helmet } = await import("helmet");
    const { default: morgan } = await import("morgan");
    const { default: authRoutes } = await import("../routes/authRoutes.js");
    const { default: connectDB } = await import("../config/db.js");

    await connectDB();

    app = express();
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({ origin: "*", credentials: true }));
    app.set("trust proxy", 1);
    app.use("/api/auth", authRoutes);
  }, 30000);

  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.dropDatabase();
      await mongoose.disconnect();
    }
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.message).toContain("Account created");
    expect(res.body.user.email).toBe(testUser.email.toLowerCase());
    expect(Array.isArray(res.body.backupCodes)).toBe(true);
    expect(res.body.backupCodes.length).toBe(5);
  });

  it("should reject duplicate registration", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(res.status).toBe(400);
  });

  it("should login and return access token + refresh cookie", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password });

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
    expect(res.body.user.email).toBe(testUser.email.toLowerCase());

    accessToken = res.body.accessToken;
    const cookies = res.headers["set-cookie"];
    refreshCookie = cookies?.find((c) => c.startsWith("refreshToken="));
    expect(refreshCookie).toBeDefined();
  });

  it("should reject invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "WrongPass1" });

    expect(res.status).toBe(401);
  });

  it("should get current user with valid token", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(testUser.email.toLowerCase());
  });

  it("should reject /me without token", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.status).toBe(401);
  });

  it("should refresh the access token", async () => {
    const res = await request(app)
      .post("/api/auth/refresh-token")
      .set("Cookie", refreshCookie);

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();

    accessToken = res.body.accessToken;
  });

  it("should logout and revoke refresh token", async () => {
    const res = await request(app)
      .post("/api/auth/logout")
      .set("Cookie", refreshCookie);

    expect(res.status).toBe(200);

    const refreshRes = await request(app)
      .post("/api/auth/refresh-token")
      .set("Cookie", refreshCookie);

    expect(refreshRes.status).toBe(401);
  });
});
