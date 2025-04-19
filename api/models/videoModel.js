import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const videoSchema = new Schema(
  {
    course: { type: Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
    transcript: { type: String },
  },
  { timestamps: true }
);

const Video = model("Video", videoSchema);
export default Video;
