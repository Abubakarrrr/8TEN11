// const Enrollment = require("../models/Enrollment");
// const Course = require("../models/Course");

import Enrollment from "../models/enrollmentModel.js";

// Enroll in a course
export const enroll = async (req, res) => {
  try {
    const { courseId } = req.params;
    if (await Enrollment.findOne({ student: req.user.id, course: courseId })) {
      return res.status(400).json({ msg: "Already enrolled" });
    }
    const enrollment = await Enrollment.create({
      student: req.user.id,
      course: courseId,
    });
    await Course.findByIdAndUpdate(courseId, { $inc: { studentsCount: 1 } });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ msg: "Enrollment failed" });
  }
};
export const listStudentsInSpecialCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const students = await Enrollment.find({ course: courseId }).populate(
      "student",
      "name email"
    );
    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No students enrolled in this course." });
    }
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students.", error: error.message });
  }
};

// Unenroll from a course
export const unenroll = async (req, res) => {
  const { courseId } = req.params;
  const result = await Enrollment.findOneAndDelete({
    student: req.user.id,
    course: courseId,
  });
  if (!result) return res.status(404).json({ msg: "Not enrolled" });
  await Course.findByIdAndUpdate(courseId, { $inc: { studentsCount: -1 } });
  res.json({ msg: "Unenrolled successfully" });
};

// Get courses student is enrolled in
export const enrolledCoursesForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const courses = await Enrollment.find({ student: studentId }).populate(
      "course",
      "title description"
    );
    if (courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No enrolled courses found for this student." });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching enrolled courses.",
      error: error.message,
    });
  }
};

// Get students enrolled in a course
export const getCourseEnrollments = async (req, res) => {
  const enrollments = await Enrollment.find({
    course: req.params.courseId,
  }).populate("student", "name email");
  res.json(enrollments);
};

export const checkProgress = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;
    const enrollment = await Enrollment.findOne({
      course: courseId,
      student: studentId,
    });
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found." });
    }
    res.status(200).json({ progress: enrollment.progress });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking progress.", error: error.message });
  }
};
