// routes/userRoutes.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getUsers } from "../controllers/userController.js";

const router = express.Router();

// only logged-in users can call
router.get("/", authMiddleware, getUsers);

export default router;
