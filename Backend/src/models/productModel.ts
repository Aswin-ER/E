import mongoose from "mongoose";
import { Schema } from "mongoose";
import { product } from "./types/productModel.types";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },

    description: {
      type: String,
      required: true,
      default: "",
    },

    category: {
      type: String,
      required: true,
      default: "",
    },

    image: {
      type: [String],
      required: true,
      default: "",
    },

    price: {
      type: Number,
      required: true,
      default: -1,
    },

    featured: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model<product>("Products", productSchema);

export default productModel;
