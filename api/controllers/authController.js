import bcrypt from "bcryptjs";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";
import { sendEmail } from "../utils/sendEmail.js";
// import { User } from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import User from "../models/userModel.js";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const signup = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }
    const userAlreadyExists = await User.findOne({ email: email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role,
      verificationToken,
      verificationExpiresAt: Date.now() + 24 * 3600 * 1000,
    });

    await user.save();
    // Send welcome email
    const message = `<p>Welcome <strong>${user.name}</strong>,</p>
        <p>Thank you for signing up as a <strong>${role}</strong> on <strong>Edtech</strong>!</p>
        <p>Your account was created on ${user.created_at.toLocaleDateString()} at ${user.created_at.toLocaleTimeString()}.</p>
        <p>Best regards,<br><strong>Edtech Team</strong></p>
        <p>Verification token,<br><strong>${verificationToken}</strong></p>`;

    await sendEmail(user.email, `Welcome to Edtech, ${user.name}`, message);

    // jwt
    generateTokenAndSetCookie(res, user._id);
    // send verfication email
    // await sendVerificationEmail(user.email, verificationToken);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in signup");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const loginWithGoogle = async (req, res) => {
  const { googleUser } = req.body;
  try {
    if (!googleUser) {
      throw new Error("No User Found");
    }
    const userFromDB = await User.findOne({ email: googleUser.email });

    if (userFromDB) {
      userFromDB.lastLogin = new Date();
      await userFromDB.save();
      generateTokenAndSetCookie(res, userFromDB._id);
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          ...userFromDB._doc,
          password: undefined,
        },
      });
    }

    const user = new User({
      email: googleUser.email,
      password: undefined,
      name: googleUser.displayName,
      isVerified: true,
      avatar: googleUser.photoURL,
    });

    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in signup");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiresAt = undefined;

    await user.save();
    // await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "User verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const userFromDB = await User.findOne({ email: email });

    if (!userFromDB) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, userFromDB.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // jwt
    generateTokenAndSetCookie(res, userFromDB._id);

    userFromDB.lastLogin = new Date();
    await userFromDB.save();

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        ...userFromDB._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in login");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      throw new Error("All fields are required");
    }
    const userFromDB = await User.findOne({ email: email });

    if (!userFromDB) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const passwordResetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    userFromDB.resetPasswordToken = passwordResetToken;
    userFromDB.resetPasswordExpiresAt = passwordResetTokenExpiresAt;
    await userFromDB.save();

    // await sendPasswordResetEmail(
    //   userFromDB.email,
    //   `${process.env.CLIENT_URL}/reset-password/${userFromDB.resetPasswordToken}`
    // );
    const message = `<p>Welcome <strong>${userFromDB.name}</strong>,</p>
    <p>Thank you for signing up as a <strong>${
      userFromDB.role
    }</strong> on <strong>Telehealth</strong>!</p>
    <p>Your account was created on ${userFromDB.created_at.toLocaleDateString()} at ${userFromDB.created_at.toLocaleTimeString()}.</p>
    <p>Best regards,<br><strong>Telehealth Team</strong></p>
    <p>Verification token,<br><strong>${verificationToken}</strong></p>`;

    await sendEmail(
      userFromDB.email,
      `Welcome to Telehealth, ${userFromDB.name}`,
      message
    );

    res.status(200).json({
      success: true,
      message: "Password reset link email sent successfully",
    });
  } catch (error) {
    console.log("error in forgotPassword");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password, confirmPassword } = req.body;
  try {
    const userFromDB = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!userFromDB) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    if (password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userFromDB.password = hashedPassword;
      await userFromDB.save();
    } else {
      res.status(400).json({
        success: false,
        message: "New password and confirm new password not matched",
      });
    }
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log("error in resetPassword");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  const { userId } = req;
  try {
    const userFromDB = await User.findOne({ _id: userId });
    if (!userFromDB) {
      return res
        .status(400)
        .json({ success: false, message: "User Authentication Failed" });
    }

    res.status(200).json({
      success: true,
      message: "User is authorized",
      user: {
        ...userFromDB._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in checkAuth");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const uploadAvatar = async (req, res) => {
  const { userId, avatar } = req.body;

  if (!userId || !avatar) {
    res.status(400).json({ error: "User ID and avatar URL are required" });
    return;
  }

  try {
    // Find the user by userId and update the avatar URL
    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ message: "Avatar updated successfully", user });
    return;
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//deleteAvatar controller
export const deleteAvatar = async (req, res) => {
  try {
    const { userId, publicId } = req.body;

    if (!publicId) {
      res.status(400).json({ error: "Public ID is required" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Update user record in the database
    await User.findByIdAndUpdate(userId, { avatar: "" });

    // Fetch the updated user to ensure fresh data
    const updatedUser = await User.findById(userId);

    res.json({
      success: true,
      message: "Avatar deleted successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error deleting avatar:", error);
    res.status(500).json({ error: "Failed to delete avatar" });
  }
};
