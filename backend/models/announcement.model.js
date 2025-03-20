import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
      required: true,
    },
    content: {
      type: String,
      default: "",
      required: true,
    },
  },
  { timestamp: true }
);

export const Announcement = mongoose.model("Announcement", announcementSchema);
