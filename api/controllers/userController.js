import User from "../models/userModel.js";

const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// Get current user profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.passwordHash = await bcrypt.hash(updates.password, 12);
      delete updates.password;
    }
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
};
