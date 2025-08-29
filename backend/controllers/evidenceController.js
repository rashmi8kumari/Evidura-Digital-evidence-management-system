import Evidence from "../models/Evidence.js";
import CustodyLog from "../models/CustodyLog.js";

// Add new evidence (Police only)
export const addEvidence = async (req, res) => {
  try {
    if (req.user.role !== "police") return res.status(403).json({ msg: "Only police can add evidence" });

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

// Get all evidence (role-aware + query filters)
// Optional query params: ?mine=true  ?status=At%20FSL
export const getAllEvidence = async (req, res) => {
  try {
    const { mine, status } = req.query;
    const user = req.user;

    const filter = {};

    // If explicit status filter given
    if (status) filter.status = status;

    // Role based defaults/filters
    if (user.role === "police") {
      // If mine=true -> only evidence created by this police user
      if (mine === "true") filter.createdBy = user.id;
      // otherwise show evidence created by this police OR currently held by them
      else filter.$or = [{ createdBy: user.id }, { currentHolder: user.id }];
    } else if (user.role === "fsl") {
      // FSL: show evidence currently at/for FSL or in transit
      // Ideally currentHolder == this FSL user OR status in ["In Transit","At FSL","Report Ready"]
      filter.$or = [
        { currentHolder: user.id },
        { status: { $in: ["In Transit", "At FSL", "Report Ready"] } }
      ];
    } else if (user.role === "court") {
      // Court: show evidence that is in court or report ready
      filter.status = { $in: ["In Court", "Report Ready"] };
    } else if (user.role === "admin") {
      // admin: no default filter (shows all) unless query overrides
      // nothing to add
    }

    const evidence = await Evidence.find(filter)
      .populate("currentHolder", "name role")
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    res.json(evidence);
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





