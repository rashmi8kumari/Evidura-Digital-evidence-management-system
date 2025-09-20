import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; // ✅ For serving React build
import { fileURLToPath } from "url"; // ✅ Needed with ES Modules

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import evidenceRoutes from "./routes/evidenceRoutes.js";
import custodyRoutes from "./routes/custodyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
const app = express();

// ES Module specific: __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/evidence", evidenceRoutes);
app.use("/api/custody", custodyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, "build")));

// Catch-all route for React Router
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

// Connect DB & Start Server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});



