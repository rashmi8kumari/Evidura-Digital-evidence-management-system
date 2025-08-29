import Evidence from "../models/Evidence.js";
import User from "../models/User.js";

// GET /api/admin/summary
export const getSummary = async (req, res) => {
  try {
    // total counts
    const total = await Evidence.countDocuments();
    // counts by status
    const byStatusAgg = await Evidence.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    const byStatus = {};
    byStatusAgg.forEach(item => byStatus[item._id] = item.count);

    // counts by currentHolder roles (how many items currently with police/fsl/court)
    const holders = await Evidence.aggregate([
      { $lookup: { from: "users", localField: "currentHolder", foreignField: "_id", as: "holder" } },
      { $unwind: { path: "$holder", preserveNullAndEmptyArrays: true } },
      { $group: { _id: "$holder.role", count: { $sum: 1 } } }
    ]);
    const byHolderRole = {};
    holders.forEach(h => {
      byHolderRole[h._id || "unassigned"] = h.count;
    });

    // optional: latest 5 evidence items
    const latest = await Evidence.find().sort({ createdAt: -1 }).limit(5)
      .populate("currentHolder", "name role")

    res.json({
      total,
      byStatus,
      byHolderRole,
      latest
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
