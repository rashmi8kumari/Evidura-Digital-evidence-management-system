import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register (Police, FSL, Court only)
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ❌ Prevent creating Admin directly from Register
    const allowedRoles = ["police", "fsl", "court"];
    if (!allowedRoles.includes(role)) {
      return res
        .status(400)
        .json({ msg: "Invalid role. Only Police, FSL, Court allowed via register." });
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Save new user
    const user = new User({ name, email, passwordHash: hash, role });
    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

