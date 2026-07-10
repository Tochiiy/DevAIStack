import { Redis } from "@upstash/redis";
import dotenv from "dotenv";
dotenv.config();

// Upstash Redis is used via REST API (no persistent TCP connection).
// Stores refresh token hashes, rate-limit counters, OTPs, and
// password-reset tokens. All auto-expire via Redis TTL.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!redisUrl) {
  console.error("Missing UPSTASH_REDIS_REST_URL");
  process.exit(1);
}

const redis = new Redis({ url: redisUrl, token: redisToken });
console.log("Redis connected");

export default redis;
