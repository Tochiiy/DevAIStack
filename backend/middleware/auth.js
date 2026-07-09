import jwt from "jsonwebtoken";
import User from "../models/User.js";
import redis from "../config/redis.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies?.accessToken;
    let token;

    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (cookieToken) {
      token = cookieToken;
    }

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const cacheKey = `user:${decoded.id}`;

    let cachedUser = await redis.get(cacheKey);

    if (!cachedUser) {
      cachedUser = await User.findById(decoded.id).select("-password");

      if (!cachedUser) {
        return res.status(401).json({ message: "User no longer exists" });
      }

      await redis.set(cacheKey, JSON.stringify(cachedUser), { EX: 3600 });
    } else {
      cachedUser =
        typeof cachedUser === "string" ? JSON.parse(cachedUser) : cachedUser;
    }

    req.user = cachedUser;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access required" });
};
