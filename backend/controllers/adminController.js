import TryCatch from "../middleware/tryCatch.js";
import User from "../models/User.js";
import redis from "../config/redis.js";

export const getUsers = TryCatch(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find().select("-password").sort("-createdAt").skip(skip).limit(limit),
    User.countDocuments(),
  ]);

  res.json({ users, total, page, pages: Math.ceil(total / limit) });
});

export const getUser = TryCatch(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user });
});

export const updateRole = TryCatch(async (req, res) => {
  const { role } = req.body;
  if (!["admin", "user"].includes(role))
    return res.status(400).json({ message: "Invalid role" });

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true },
  ).select("-password");

  if (!user) return res.status(404).json({ message: "User not found" });
  await redis.del(`user:${user.id}`);
  res.json({ user, message: `Role updated to ${role}` });
});

export const deleteUser = TryCatch(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await redis.del(`user:${user.id}`);
  res.json({ message: "User deleted" });
});
