import { checkout, getSubscriptionStatus } from "../controllers/paymentController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import express from "express";
const router = express.Router();

//api/payment/v1/webhook/stripe
// router.post("/webhook/stripe", express.raw({ type: "application/json" }),webhook);

router.post("/create-checkout-session",verifyToken,checkout);
router.get("/get-subscription-status",verifyToken,getSubscriptionStatus);

export default router 

// stripe listen --forward-to localhost:5000/webhook/stripe