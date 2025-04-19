import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnailUrl: { type: String },
    teacher: { type: Types.ObjectId, ref: "User", required: true },
    isPremium: { type: Boolean, default: false },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Course = model("Course", courseSchema);
export default Course;
