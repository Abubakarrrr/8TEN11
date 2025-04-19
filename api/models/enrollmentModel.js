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

const Enrollment = model("Enrollment", enrollmentSchema);
export default Enrollment;
