import redis from "../config/redis.js";

const rateLimiter = ({ prefix, max, windowSec = 60, message, emailKey = false, staleCheck = false }) => {
  return async (req, res, next) => {
    const email = emailKey && req.body?.email ? `:${req.body.email.toLowerCase()}` : "";
    const key = `${prefix}:${req.ip}${email}`;

    let attempts;
    try {
      attempts = await redis.incr(key);
    } catch {
      await redis.del(key);
      attempts = await redis.incr(key);
    }

    if (attempts === 1) {
      await redis.expire(key, windowSec);
    }

    if (staleCheck && attempts > max && (await redis.ttl(key)) === -1) {
      await redis.del(key);
    }

    if (attempts > max) {
      return res.status(429).json({ message: message || "Too many requests, try again later" });
    }

    next();
  };
};

export default rateLimiter;
