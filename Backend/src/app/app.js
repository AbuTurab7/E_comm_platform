import express from "express";
import { connectDB } from "../config/db.js";
import authRouter from "../routes/auth.routes.js";
import { errorHandler } from "../middlewares/errorHandler.middleware.js";
import cookieParser from "cookie-parser";
import productRouter from "../routes/product.routes.js";
import cors from "cors";
import { config } from "../config/config.js";
const app = express();

app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use(errorHandler);

await connectDB();

export default app;
