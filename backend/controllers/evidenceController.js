import Evidence from "../models/Evidence.js";
import CustodyLog from "../models/CustodyLog.js";

// Add new evidence (Police only)
export const addEvidence = async (req, res) => {
  try {
    if (req.user.role !== "police") {
      return res.status(403).json({ msg: "Only Police Officers can register new evidence." });
    }

    const { caseId, description } = req.body;
    const evidence = new Evidence({
      caseId,
      description,
      currentHolder: req.user.id,
      createdBy: req.user.id
    });

    await evidence.save();

    // Log custody
    const log = new CustodyLog({
      evidenceId: evidence._id,
      fromUser: null,
      toUser: req.user.id,
      action: "Seized"
    });
    await log.save();

    res.json({ msg: "Evidence added successfully", evidence });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all evidence (role-aware + query filters + pagination + search)
export const getAllEvidence = async (req, res) => {
  try {
    const { mine, status, caseId, page = 1, limit = 10 } = req.query;
    const user = req.user;

    const filter = {};

    // --- Filters ---
    if (status) filter.status = status;
    if (caseId) filter.caseId = { $regex: caseId, $options: "i" };

    // --- Role based defaults/filters ---
    if (user.role === "police") {
      if (mine === "true") filter.createdBy = user.id;
      else filter.$or = [{ createdBy: user.id }, { currentHolder: user.id }];
    } else if (user.role === "fsl") {
      filter.$or = [
        { currentHolder: user.id },
        { status: { $in: ["In Transit", "At FSL", "Report Ready"] } }
      ];
    } else if (user.role === "court") {
      filter.status = { $in: ["In Court", "Report Ready"] };
    }
    // admin → no filter

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [data, total] = await Promise.all([
      Evidence.find(filter)
        .populate("currentHolder", "name role")
        .populate("createdBy", "name role")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Evidence.countDocuments(filter)
    ]);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get evidence by ID + custody history
export const getEvidenceById = async (req, res) => {
  try {
    const evidence = await Evidence.findById(req.params.id)
      .populate("currentHolder", "name role")
      .populate("createdBy", "name role");
    if (!evidence) return res.status(404).json({ msg: "Evidence not found" });

    const logs = await CustodyLog.find({ evidenceId: evidence._id })
      .populate("fromUser", "name role")
      .populate("toUser", "name role")
      .sort({ timestamp: 1 });

    res.json({ evidence, logs });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};






