import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from "../controllers/adminController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/create-user", verifyToken, createUser);
router.post("/update-user/:id", verifyToken, updateUser);
router.post("/delete-user/:id", verifyToken, deleteUser);
router.get("/get-user/:id", verifyToken, getUser);
router.get("/get-all-users", verifyToken, getAllUsers);

export default router;
