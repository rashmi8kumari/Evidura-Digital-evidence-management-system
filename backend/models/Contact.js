import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  jobTitle: { type: String },
  organization: { type: String },
  email: { type: String, required: true },
  country: { type: String },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Contact", contactSchema);
