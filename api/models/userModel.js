import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: {
    type: String,
    enum: ["user", "teacher"],
    default: "user",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  verificationToken: { type: String, default: undefined },
  verificationExpiresAt: { type: Date, default: undefined },
  resetPasswordToken: { type: String, default: undefined },
  resetPasswordExpiresAt: { type: Date, default: undefined },
  avatar: { type: String, default: null },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
});
const User = model("User", userSchema);
export default User;
