import mongoose from "mongoose";

const adminSettingsSchema = new mongoose.Schema(
  {
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    notifications: {
      userQueries: {
        type: Boolean,
        default: true,
      },
      newUsers: {
        type: Boolean,
        default: true,
      },
      eligibilityChecks: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const AdminSettings = mongoose.model(
  "AdminSettings",
  adminSettingsSchema
);
