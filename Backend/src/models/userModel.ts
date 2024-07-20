import mongoose from "mongoose";
import { Schema } from "mongoose";
import { User } from "./types/userModel.types";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      default: "",
    },

    password: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model<User>("User", userSchema);

export default userModel;
