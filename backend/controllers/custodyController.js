import Evidence from "../models/Evidence.js";
import CustodyLog from "../models/CustodyLog.js";
import User from "../models/User.js";   // for recipient validation

// ----------------- 🔹 TRANSFER EVIDENCE -----------------
export const transferEvidence = async (req, res) => {
  try {
    let { toUserId, action } = req.body; // let (reassign allowed)

    // --- validate action early ---
    const allowedActions = ["Seized", "Transferred", "Received", "Report Ready"];
    if (!allowedActions.includes(action)) {
      return res.status(400).json({
        msg: `Invalid action. Allowed: ${allowedActions.join(", ")}`
      });
    }

    // 🔹 Find evidence
    const evidence = await Evidence.findById(req.params.id);
    if (!evidence) {
      return res.status(404).json({ msg: "Evidence not found." });
    }

    // 🔹 Auto-assign recipient for certain actions
    if (action === "Received" || action === "Report Ready") {
      toUserId = req.user.id; // current user himself
    }

    // 🔹 Validate recipient
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ msg: "Recipient user not found." });
    }

    // ---------------- VALIDATION RULES ----------------
    if (req.user.role === "police" && action === "Transferred" && toUser.role === "court") {
      return res.status(400).json({ msg: "Police must send evidence to FSL before Court." });
    }

    if (req.user.role === "fsl" && action === "Transferred") {
      if (toUser.role === "court" && evidence.status !== "Report Ready") {
        return res.status(400).json({ msg: "FSL can only send to Court once Report is Ready." });
      }
    }

    if (req.user.role === "court" && action === "Transferred") {
      return res.status(400).json({ msg: "Court cannot transfer evidence further." });
    }

    // ---------------- STATUS UPDATE LOGIC ----------------
    let newStatus = evidence.status;

    switch (action) {
      case "Seized":
        newStatus = "Seized";
        break;

      case "Transferred":
        if (toUser.role === "court") {
          newStatus = "In Court";  // ✅ direct In Court
        } else {
          newStatus = "In Transit";
        }
        break;

      case "Received":
        if (req.user.role === "police") newStatus = "Seized";
        if (req.user.role === "fsl") newStatus = "At FSL";
        if (req.user.role === "court") newStatus = "In Court";  // ✅ ensure final
        break;

      case "Report Ready":
        newStatus = "Report Ready";
        break;

      default:
        newStatus = evidence.status;
    }

    // 🔹 Update Evidence
    evidence.currentHolder = toUserId;
    evidence.status = newStatus;
    await evidence.save();

    // 🔹 Log custody
    const log = new CustodyLog({
      evidenceId: evidence._id,
      fromUser: req.user.id,
      toUser: toUserId,
      action
    });
    await log.save();

    res.json({ msg: "Evidence updated successfully", evidence });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ----------------- 🔹 GET CUSTODY LOGS -----------------
export const getCustodyLogs = async (req, res) => {
  try {
    const logs = await CustodyLog.find({ evidenceId: req.params.id })
      .populate("fromUser", "name role")
      .populate("toUser", "name role")
      .sort({ timestamp: 1 });

    if (!logs.length) {
      return res.status(404).json({ msg: "No custody history found for this evidence." });
    }

    res.json(logs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};





