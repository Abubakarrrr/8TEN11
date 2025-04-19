// 📁 routes/enrollmentRoutes.js
import express from "express";
import {
  listStudentsInSpecialCourse,
  checkProgress,
  //   getEnrolledCoursesForStudent,
  getCourseEnrollments,
} from "../controllers/enrollmentController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();
router.get("/special-course-students/:courseId", listStudentsInSpecialCourse);
router.get("/progress/:studentId/:courseId", checkProgress);
router.get("/enrolled/:studentId", getCourseEnrollments);

export default router;
