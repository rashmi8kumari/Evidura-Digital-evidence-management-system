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

// All routes in this file require Admin role
// Apply auth + role guard at router-level instead of repeating
router.use(authMiddleware, requireRole("admin"));

/**
 * @route   GET /api/admin/summary
 * @desc    Get overall system summary (evidence stats, counts, latest records)
 * @access  Admin only
 */
router.get("/summary", getSummary);

/**
 * @route   GET /api/admin/users
 * @desc    List all users
 * @access  Admin only
 */
router.get("/users", listUsers);

/**
 * @route   POST /api/admin/users
 * @desc    Create new user (Police / FSL / Court / Admin)
 * @access  Admin only
 */
router.post("/users", createUser);

/**
 * @route   PUT /api/admin/users/:id/reset
 * @desc    Reset password of user (default 123456 or given)
 * @access  Admin only
 */
router.put("/users/:id/reset", resetPassword);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete user account
 * @access  Admin only
 */
router.delete("/users/:id", deleteUser);

export default router;

