import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    schemeName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    areaOfResidence: {
      type: String,
      required: true,
    },
    casteCategory: {
      type: String,
      required: true,
    },
    annualIncome: {
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
    schemeDocuments: {
      type: String,
      required: true,
    },
    siteLink: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

export const Scheme = mongoose.model("Scheme", schemeSchema);
