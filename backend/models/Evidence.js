import mongoose from "mongoose";

const evidenceSchema = new mongoose.Schema({
  caseId: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Seized", "In Transit", "At FSL", "Report Ready", "In Court", "Archived"], 
    default: "Seized" 
  },
  currentHolder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }
}, { timestamps: true });

export default mongoose.model("Evidence", evidenceSchema);

