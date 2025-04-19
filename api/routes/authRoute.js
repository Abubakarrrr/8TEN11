import express from "express";
import {
  login,
  logout,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  loginWithGoogle,
  uploadAvatar,
  deleteAvatar,
} from "../controllers/authController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/login-with-google", loginWithGoogle);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/check-auth", verifyToken, checkAuth);

router.post("/upload-avatar",uploadAvatar);
router.post("/delete-avatar",deleteAvatar);


export default router;
