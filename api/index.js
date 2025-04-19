import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import courseRoute from "./routes/courseRoute.js";
import enrollmentRoute from "./routes/enrollmentRoute.js";
import videoRoute from "./routes/videoRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDB } from "./db/connectToDB.js";
import { webhook } from "./controllers/paymentController.js";

const app = express();
const PORT = process.env.PORT || 5000;
await connectToDB();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.post("/webhook/stripe", express.raw({ type: "application/json" }), webhook);
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/video", videoRoute);
app.use("/api/course", courseRoute);
app.use("/api/enrollment", enrollmentRoute);
// app.use("/api/message", paymentRoute);
// app.use("/api/chat", paymentRoute);
app.listen(PORT, () => {
  console.log("listening on prot:", PORT);
});
