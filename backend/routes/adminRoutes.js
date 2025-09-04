import express from "express";
import { authMiddleware, requireRole } from "../middleware/authMiddleware.js";
import { getSummary } from "../controllers/adminController.js";
import {
    listUsers,
    createUser,
    resetPassword,
    deleteUser,
} from "../controllers/adminUserController.js";
const router = express.Router();

// Summary (admin only recommended)
router.get("/summary", authMiddleware, requireRole("admin"), getSummary);


// User management (admin only)
router.get("/users", authMiddleware, requireRole("admin"), listUsers);
router.post("/users", authMiddleware, requireRole("admin"), createUser);
router.put("/users/:id/reset", authMiddleware, requireRole("admin"), resetPassword);
router.delete("/users/:id", authMiddleware, requireRole("admin"), deleteUser);


export default router;
