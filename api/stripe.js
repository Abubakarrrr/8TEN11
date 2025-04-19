// routes/stripe.js
import express from "express";
import Stripe from "stripe";
import Course from "../models/course.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  const { courseId, userId, email } = req.body;

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ error: "Course not found" });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.description,
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `https://yourfrontend.com/payment-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}&userId=${userId}`,
      cancel_url: `https://yourfrontend.com/payment-cancelled`,
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe session creation failed" });
  }
});

export default router;
