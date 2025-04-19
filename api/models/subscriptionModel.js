import mongoose, { Schema } from "mongoose";

const SubscriptionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  stripeSubscriptionId: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["active", "canceled", "past_due", "trialing", "unpaid"],
  },
  planId: { type: String, required: true },
  // current_period_start: { type: Date, required: true },
  // current_period_end: { type: Date, required: true },
});

export default mongoose.model
  ("Subscription", SubscriptionSchema);
