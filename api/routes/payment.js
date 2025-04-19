import express from "express";
import Stripe from "stripe";
import Course from "../models/course.model.js";
import Enrollment from "../models/enrollment.model.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { courseId, userId, email } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: email,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.description,
            },
            unit_amount: course.price * 100, // convert to cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}&userId=${userId}`,
      cancel_url: `${process.env.CLIENT_URL}/course/${courseId}`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ message: "Payment session failed" });
  }
});

router.get("/enroll-after-payment", async (req, res) => {
  const { session_id, courseId, userId } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const alreadyEnrolled = await Enrollment.findOne({
      student: userId,
      course: courseId,
    });
    if (alreadyEnrolled) {
      return res.status(409).json({ message: "Already enrolled" });
    }

    const newEnrollment = new Enrollment({
      student: userId,
      course: courseId,
      paymentInfo: session,
    });

    await newEnrollment.save();

    res.json({ message: "Enrollment successful" });
  } catch (err) {
    console.error("Enrollment error:", err);
    res.status(500).json({ message: "Enrollment failed" });
  }
});

export default router;
