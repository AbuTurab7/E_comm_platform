import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
  try {
    if (!config.MONGO_URI) {
      throw new Error("MONGO_URI is missing from environment variables");
    }

    await mongoose.connect(config.MONGO_URI);

    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error.message);

    process.exit(1);
  }
};
