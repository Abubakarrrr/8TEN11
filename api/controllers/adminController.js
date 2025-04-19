import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// import { User } from "../models/userModel.js";

export const createUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  const userId = req.userId;
  try {
    if (!email || !name) {
      throw new Error("All fields are required");
    }
    const Admin = await User.findById(userId);
    if (!Admin || Admin.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const userAlreadyExists = await User.findOne({ email: email });

    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User with this email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password || "fcit", 10);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      isVerified: true,
      role: role || "user",
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in registering user");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const updateUser = async (req, res) => {
  const userId = req.userId;
  const upadetData = req.body;
  try {
    const Admin = await User.findById(userId);
    if (!Admin || Admin.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const userFromDB = await User.findByIdAndUpdate(req.params.id, upadetData, {
      new: true,
    });

    if (!userFromDB) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        ...userFromDB._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in updating user");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  const userId = req.userId;
  try {
    const Admin = await User.findById(userId);
    if (!Admin || Admin.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const user = await User.findByIdAndUpdate(req.params.id, {
      isActive: false,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in deleting user");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getUser = async (req, res) => {
  const userId = req.userId;

  try {
    const Admin = await User.findById(userId);
    if (!Admin || Admin.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User found successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in finding user");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getAllUsers = async (req, res) => {
  const userId = req.userId;
  try {
    const Admin = await User.findById(userId);
    if (!Admin || Admin.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const users = await User.find({ _id: { $ne: userId } });
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User found successfully",
      users,
    });
  } catch (error) {
    console.log("error in finding users");
    res.status(400).json({ success: false, message: error.message });
  }
};
