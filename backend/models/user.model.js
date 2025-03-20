import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    // Contact Details
    fullName: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: String,
      default: "",
    },
    parentName: {
      type: String,
      default: "",
    },
    mobileNumber: {
      type: String,
      default: "",
    },
    parentMobileNumber: {
      type: String,
      default: "",
    },

    // Personal Details
    annualIncome: {
      type: String,
      default: "",
    },
    profession: {
      type: String,
      default: "",
    },
    caste: {
      type: String,
      default: "",
    },
    religion: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    minorityStatus: {
      type: Boolean,
      default: false,
    },
    bplStatus: {
      type: Boolean,
      default: false,
    },
    singleParent: {
      type: Boolean,
      default: false,
    },
    disabledStatus: {
      type: Boolean,
      default: false,
    },

    // Education Details
    tenthMarks: {
      type: String,
      default: "",
    },
    twelfthMarks: {
      type: String,
      default: "",
    },
    collegeName: {
      type: String,
      default: "",
    },
    courseName: {
      type: String,
      default: "",
    },
    yearOfStudy: {
      type: String,
      default: "",
    },
    scholarshipCriteria: {
      type: String,
      default: "",
    },
    areaOfResidence: {
      type: String,
      default: "",
    },
  },
  { timestamp: true }
);

export const User = mongoose.model("User", userSchema);
