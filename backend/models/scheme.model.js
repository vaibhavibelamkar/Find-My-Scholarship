import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    State: {
      type: String,
      required: true,
    },
    areaofresidence: {
      type: String,
      required: true,
    },
    caste: {
      type: String,
      required: true,
    },
    income: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    benefits: {
      type: String,
      required: true,
    },
    doclink: {
      type: String,
      required: true,
    },
    sitelink: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

export const Scheme = mongoose.model("Scheme", schemeSchema);
