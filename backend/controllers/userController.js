// controllers/userController.js
import User from "../models/User.js";

// GET /api/users?role=fsl
export const getUsers = async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;   // agar role diya hai toh us role ke users hi
    const users = await User.find(filter).select("_id name email role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
