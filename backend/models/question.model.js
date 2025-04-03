import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: "Anonymous",
      },
      username: {
        type: String,
        default: "Anonymous",
      },
      email: {
        type: String,
        default: "Anonymous",
      },
    },
    status: {
      type: String,
      enum: ["Pending", "Answered"],
      default: "Pending",
    },
    answer: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Question = mongoose.model("Question", questionSchema);
