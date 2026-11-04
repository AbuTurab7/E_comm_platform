import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: [2, "Title must contain atleast 2 characters."],
    },
    description: {
      type: String,
      trim: true,
      minLength: [20, "Description must contain atleast 20 characters."],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model("Products", productSchema);
