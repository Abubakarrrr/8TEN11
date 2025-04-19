import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const enrollmentSchema = new Schema(
  {
    student: { type: Types.ObjectId, ref: "User", required: true },
    course: { type: Types.ObjectId, ref: "Course", required: true },
    enrolledAt: { type: Date, default: Date.now },
    progress: { type: Number, default: 0 },
    paymentInfo: { type: Object },
  },
  { timestamps: true }
);
enrollmentSchema.pre("save", async function (next) {
  if (this.isNew) {
    await mongoose.model("Course").findByIdAndUpdate(this.course, {
      $inc: { countStudents: 1 },
    });
  }
  next();
});

// Optional: handle removal (e.g., student drops course)
enrollmentSchema.pre("remove", async function (next) {
  await mongoose.model("Course").findByIdAndUpdate(this.course, {
    $inc: { countStudents: -1 },
  });
  next();
});
const Enrollment = model("Enrollment", enrollmentSchema);
export default Enrollment;
