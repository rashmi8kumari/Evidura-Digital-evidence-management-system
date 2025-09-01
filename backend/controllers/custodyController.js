import Evidence from "../models/Evidence.js";
import CustodyLog from "../models/CustodyLog.js";
import User from "../models/User.js";   // for recipient validation


// ----------------- 🔹 TRANSFER EVIDENCE -----------------
export const transferEvidence = async (req, res) => {
  try {
    const { toUserId, action } = req.body;

    // --- validate action early ---
    const allowedActions = ["Seized", "Transferred", "Received", "Report Ready"];
    if (!allowedActions.includes(action)) {
      return res.status(400).json({
        msg: `Invalid action. Allowed: ${allowedActions.join(", ")}`
      });
    }
    const evidence = await Evidence.findById(req.params.id);
    if (!evidence) {
      return res.status(404).json({ msg: "Evidence record not found in the system." });
    }

    // 🔹 Fetch toUser (for validation)
    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ msg: "Recipient user not found." });
    }

    // 🔹 Validation Rules
    if (req.user.role === "police" && action === "Transferred") {
      if (toUser.role === "court") {
        return res.status(400).json({ msg: "Evidence must go to FSL before Court." });
      }
    }

    if (req.user.role === "fsl" && action === "Transferred") {
      if (toUser.role === "court" && evidence.status !== "Report Ready") {
        return res.status(400).json({ msg: "FSL can only send to Court once Report is Ready." });
      }
    }

    if (req.user.role === "court") {
      return res.status(400).json({ msg: "Court cannot transfer evidence further." });
    }

    // 🔹 Update Status Logic
    let newStatus = evidence.status;

    if (action === "Seized") {
      newStatus = "Seized";
    } else if (action === "Transferred") {
      newStatus = "In Transit";
    } else if (action === "Received") {
      if (req.user.role === "police" && evidence.currentHolder.toString() !== toUserId) {
        newStatus = "In Transit";
      }
      if (req.user.role === "fsl") {
        newStatus = "At FSL";
      }
      if (req.user.role === "court") {
        newStatus = "In Court";
      }
    } else if (action === "Report Ready") {
      newStatus = "Report Ready";
    }

    // 🔹 Update Evidence record
    evidence.currentHolder = toUserId;
    evidence.status = newStatus;
    await evidence.save();

    // 🔹 Add Custody Log
    const log = new CustodyLog({
      evidenceId: evidence._id,
      fromUser: req.user.id,
      toUser: toUserId,
      action
    });
    await log.save();

    res.json({ msg: "Evidence transferred successfully", evidence });
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

    if (!logs || logs.length === 0) {
      return res.status(404).json({ msg: "No custody history found for this evidence." });
    }

    res.json(logs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

