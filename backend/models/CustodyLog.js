import mongoose from "mongoose";

const custodyLogSchema = new mongoose.Schema({
  evidenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evidence",
    required: true,
  },
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: {
    type: String,
    enum: ["Seized", "Transferred", "Received", "Report Ready"],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("CustodyLog", custodyLogSchema);
