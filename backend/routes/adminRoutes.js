import express from "express";
import { getUsers, getUser, updateRole, deleteUser } from "../controllers/adminController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, admin);

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.patch("/users/:id/role", updateRole);
router.delete("/users/:id", deleteUser);

export default router;
