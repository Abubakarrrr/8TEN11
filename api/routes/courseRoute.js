import express from "express";
import {
  listCourses,
  createCourse,
  editCourse,
  searchCourse,
  coursePreview,
} from "../controllers/courseController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/", listCourses);
router.post("/create", verifyToken, createCourse);
router.put("/edit/:courseId", verifyToken, editCourse);
router.get("/search", searchCourse);
router.get("/preview/:courseId", coursePreview);

export default router;
