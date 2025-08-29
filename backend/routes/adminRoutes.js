import express from "express";
import { authMiddleware, requireRole } from "../middleware/authMiddleware.js";
import { getSummary } from "../controllers/adminController.js";

const router = express.Router();

// only admin role
router.get("/summary", authMiddleware, requireRole("admin"), getSummary);

export default router;
