// const Video = require("../models/Video");

import Video from "../models/videoModel.js";

// Add a video to a course
export const addVideo = async (req, res) => {
  try {
    const { title, videoUrl, order, transcript } = req.body;
    const video = await Video.create({
      course: req.params.courseId,
      title,
      videoUrl,
      order,
      transcript,
    });
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ msg: "Failed to upload video" });
  }
};

// Get all videos for a course
export const getVideosByCourse = async (req, res) => {
  const videos = await Video.find({ course: req.params.courseId }).sort(
    "order"
  );
  res.json(videos);
};

// Get single video
export const getVideo = async (req, res) => {
  const video = await Video.findById(req.params.id);
  if (!video) return res.status(404).json({ msg: "Video not found" });
  res.json(video);
};

// Update a video
export const replaceVideo = async (req, res) => {
  try {
    const Teacher = await User.findById(req.userId);
    if (!Teacher || Teacher.role != "teacher") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Teacher Access Required",
      });
    }
    const { videoId } = req.params;
    const { videoUrl } = req.body;

    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    video.videoUrl = videoUrl;
    await video.save();

    res.status(200).json({ message: "Video replaced successfully.", video });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error replacing video.", error: error.message });
  }
};

// Delete a video
export const deleteVideo = async (req, res) => {
  try {
    const Teacher = await User.findById(req.userId);
    if (!Teacher || Teacher.role != "teacher") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Teacher Access Required",
      });
    }
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    await Video.findByIdAndDelete(videoId);
    res.status(200).json({ message: "Video deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting video.", error: error.message });
  }
};

export const readTranscript = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }
    if (!video.transcript) {
      return res
        .status(404)
        .json({ message: "Transcript not available for this video." });
    }
    res.status(200).json({ transcript: video.transcript });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching transcript.", error: error.message });
  }
};
