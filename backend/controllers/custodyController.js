import Evidence from "../models/Evidence.js";
import CustodyLog from "../models/CustodyLog.js";

// Transfer Evidence
export const transferEvidence = async (req, res) => {
  try {
    const { toUserId, action } = req.body;
    const evidence = await Evidence.findById(req.params.id);
    if (!evidence) return res.status(404).json({ msg: "Evidence not found" });

  
    // --- 🔹 Update Evidence Status depending on role/action ---
    let newStatus = evidence.status;

    if (action === "Seized") {
      newStatus = "Seized";
    } else if (action === "Transferred") {
      newStatus = "In Transit";
    } else if (action === "Received") {
      // role based status
      if (req.user.role === "police" && evidence.currentHolder.toString() !== toUserId) {
        newStatus = "In Transit"; // police → FSL or court
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

    // --- 🔹 Update evidence record ---
    evidence.currentHolder = toUserId;
    evidence.status = newStatus;
    await evidence.save();

    // Add custody log
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

// Get Custody Logs
export const getCustodyLogs = async (req, res) => {
  try {
    const logs = await CustodyLog.find({ evidenceId: req.params.id })
      .populate("fromUser", "name role")
      .populate("toUser", "name role")
      .sort({ timestamp: 1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
