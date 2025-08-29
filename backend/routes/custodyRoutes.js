import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { transferEvidence, getCustodyLogs } from "../controllers/custodyController.js";

const router = express.Router();

router.post("/:id/transfer", authMiddleware, transferEvidence);  // Transfer evidence
router.get("/:id/logs", authMiddleware, getCustodyLogs);         // Get custody history

export default router;
