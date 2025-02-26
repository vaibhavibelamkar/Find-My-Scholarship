import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

export const Scheme = mongoose.model("Scheme", schemeSchema);
