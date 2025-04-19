import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const videoSchema = new Schema(
  {
    course: { type: Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    desc: { type: String, required: false },
    videoUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
    transcript: { type: String },
  },
  { timestamps: true }
);
videoSchema.pre("save", async function (next) {
  if (this.isNew) {
    await mongoose.model("Course").findByIdAndUpdate(this.course, {
      $inc: { lessons: 1 },
    });
  }
  next();
});

videoSchema.pre("remove", async function (next) {
  await mongoose.model("Course").findByIdAndUpdate(this.course, {
    $inc: { lessons: -1 },
  });
  next();
});
const Video = model("Video", videoSchema);
export default Video;
