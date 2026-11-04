import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: [2, "Name must contain atleast 2 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email.",
    ],
  },
  hashPassword: {
    type: String,
    required: true,
  },
  hashRefreshToken: {
    type: String,
    default: null,
  },
}, { timestamps: true });

export const UserModel = mongoose.model("Users", userSchema);
