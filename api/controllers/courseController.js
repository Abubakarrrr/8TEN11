// const Course = require("../models/Course");

import Course from "../models/courseModel.js";
import User from "../models/userModel.js";

// Create a new course
export const createCourse = async (req, res) => {
  try {
    const Teacher = await User.findById(req.userId);
    if (!Teacher || Teacher.role != "teacher") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Teacher Access Required",
      });
    }
    const { title, description, thumbnailUrl, teacherId, isPremium, price } =
      req.body;
    if (!title || !description || !teacherId) {
      return res
        .status(400)
        .json({ message: "Title, description, and teacherId are required." });
    }

    const course = new Course({
      title,
      description,
      thumbnailUrl,
      teacher: teacherId,
      isPremium,
      price,
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating course.", error: error.message });
  }
};

// Get courses of the logged-in teacher
export const getMyCourses = async (req, res) => {
  const courses = await Course.find({ teacher: req.user.id });
  res.json(courses);
};

export const listCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher", "name email");
    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found." });
    }
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching courses.", error: error.message });
  }
};

// Get single course by ID
export const coursePreview = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate(
      "teacher",
      "name email"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching course preview.",
      error: error.message,
    });
  }
};

// Update a course (only by its teacher)
export const editCourse = async (req, res) => {
  try {
    const Teacher = await User.findById(req.userId);
    if (!Teacher || Teacher.role != "teacher") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Teacher Access Required",
      });
    }
    const { courseId } = req.params;
    const { title, description, thumbnailUrl, isPremium, price } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    if (title) course.title = title;
    if (description) course.description = description;
    if (thumbnailUrl) course.thumbnailUrl = thumbnailUrl;
    if (isPremium) course.isPremium = isPremium;
    if (price) course.price = price;

    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error editing course.", error: error.message });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  const course = await Course.findOneAndDelete({
    _id: req.params.id,
    teacher: req.userId,
  });
  if (!course)
    return res.status(404).json({ msg: "Course not found or forbidden" });
  res.json({ msg: "Course deleted" });
};

export const searchCourse = async (req, res) => {
  try {
    const { query } = req.params;
    const courses = await Course.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).populate("teacher", "name email");

    if (courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found matching the query." });
    }
    res.status(200).json(courses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching courses.", error: error.message });
  }
};
