// controllers/adminUserController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// GET /api/admin/users  → list all users (admin only)
export const listUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id name email role createdAt updatedAt");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// POST /api/admin/users  → create user (admin only)
export const createUser = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
      return res.status(400).json({ msg: "name, email, role, password are required" });
    }

    const allowed = ["police", "fsl", "court", "admin"];
    if (!allowed.includes(role)) {
      return res.status(400).json({ msg: `Invalid role. Allowed: ${allowed.join(", ")}` });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, role, passwordHash: hash });
    await user.save();

    res.json({ msg: "User created", user: { id: user._id, name, email, role } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// PUT /api/admin/users/:id/reset  → reset password (admin only)
export const resetPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const newPassword = req.body.password || "123456";

    const hash = await bcrypt.hash(newPassword, 10);
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { passwordHash: hash } },
      { new: true }
    );
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: `Password reset`, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// DELETE /api/admin/users/:id  → delete user (admin only)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // prevent self-delete (optional safety)
    if (req.user.id === id) {
      return res.status(400).json({ msg: "You cannot delete your own account" });
    }

    // optional: prevent deleting the last admin
    const u = await User.findById(id);
    if (!u) return res.status(404).json({ msg: "User not found" });
    if (u.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return res.status(400).json({ msg: "Cannot delete the last admin" });
      }
    }

    await User.findByIdAndDelete(id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
