import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import dotenv from "dotenv";
import request from "supertest";

dotenv.config({ path: ".env" });

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

const describeOrSkip = REDIS_URL && REDIS_TOKEN ? describe : describe.skip;

describeOrSkip("Auth Integration", () => {
  let app;
  let accessToken;
  let refreshCookie;
  let mongoServer;

  const testUser = {
    name: "Test User",
    email: `test_${Date.now()}@example.com`,
    password: "StrongPass1",
    confirmPassword: "StrongPass1",
  };

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create({ binary: { downloadTimeout: 300000 } });
    const uri = mongoServer.getUri();

    process.env.MONGO_URI = uri;
    process.env.UPSTASH_REDIS_REST_URL = REDIS_URL;
    process.env.UPSTASH_REDIS_REST_TOKEN = REDIS_TOKEN;
    process.env.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "test-access-secret-key-min-32-chars!!";
    process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "test-refresh-secret-key-min-32-chars!";
    process.env.NODE_ENV = "test";

    const express = (await import("express")).default;
    const cookieParser = (await import("cookie-parser")).default;
    const cors = (await import("cors")).default;
    const helmet = (await import("helmet")).default;
    const morgan = (await import("morgan")).default;
    const connectDB = (await import("../config/db.js")).default;
    const authRoutes = (await import("../routes/authRoutes.js")).default;

    await connectDB();

    app = express();
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({ origin: "*", credentials: true }));
    app.set("trust proxy", 1);
    app.use("/api/auth", authRoutes);
  }, 300000);

  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.dropDatabase();
      await mongoose.disconnect();
    }
    if (mongoServer) await mongoServer.stop();
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
