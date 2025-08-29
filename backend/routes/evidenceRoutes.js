import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { addEvidence, getAllEvidence, getEvidenceById } from "../controllers/evidenceController.js";

const router = express.Router();

router.post("/", authMiddleware, addEvidence);       // Police adds new evidence
router.get("/", authMiddleware, getAllEvidence);     // List all evidence (role-based)
router.get("/:id", authMiddleware, getEvidenceById); // Get evidence details + logs

export default router;
