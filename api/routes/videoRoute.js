// 📁 routes/videoRoutes.js
import express from "express";
import {
  deleteVideo,
  readTranscript,
  replaceVideo,
} from "../controllers/videoController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();
router.delete("/delete/:videoId", verifyToken, deleteVideo);
router.put("/replace/:videoId", verifyToken, replaceVideo);
router.get("/transcript/:videoId", readTranscript);

export default router;
