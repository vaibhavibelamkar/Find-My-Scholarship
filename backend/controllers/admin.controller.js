import { Announcement } from "../models/announcement.model.js";
import { Question } from "../models/question.model.js";
import { Scheme } from "../models/scheme.model.js";
import { User } from "../models/user.model.js";
import { AdminSettings } from "../models/adminSettings.model.js";
import { sendEmail } from "../utils/email.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const addScheme = async (req, res) => {
  try {
    const {
      schemeName,
      gender,
      state,
      areaOfResidence,
      casteCategory,
      annualIncome,
      religion,
      benefits,
      schemeDocuments,
      siteLink,
    } = req.body;
    if (
      !schemeName ||
      !gender ||
      !state ||
      !areaOfResidence ||
      !casteCategory ||
      !annualIncome ||
      !religion ||
      !benefits ||
      !schemeDocuments ||
      !siteLink
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const scheme = await Scheme.findOne({ schemeName });
    if (scheme) {
      return res.status(400).json({
        success: false,
        message: "Scheme Already Exists.",
      });
    }
    await Scheme.create({
      schemeName,
      gender,
      state,
      areaOfResidence,
      casteCategory,
      annualIncome,
      religion,
      benefits,
      schemeDocuments,
      siteLink,
    });
    return res.status(201).json({
      success: true,
      message: "Scheme added Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in adding scheme",
    });
  }
};

export const addAnnouncements = async (req, res) => {
  const { title, content } = req.body;
  try {
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    await Announcement.create({ title, content });
    return res.status(201).json({
      success: true,
      message: "Announcement Sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error in adding announcement",
    });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error fetching questions",
      error: error.message,
    });
  }
};

export const answerQuestion = async (req, res) => {
  try {
    const { answer, status } = req.body;
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { answer, status },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error answering question",
      error: error.message,
    });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    console.log("Delete question request received:", {
      questionId: req.params.id,
      user: req.user,
    });

    const question = await Question.findById(req.params.id);
    console.log("Found question:", question);

    if (!question) {
      console.log("Question not found with ID:", req.params.id);
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Soft delete the question
    question.status = "Deleted";
    if (req.user && req.user._id) {
      question.deletedBy = req.user._id;
    }
    question.deletedAt = new Date();

    // Remove the user.id field if it's not a valid ObjectId
    if (
      question.user &&
      question.user.id &&
      !mongoose.Types.ObjectId.isValid(question.user.id)
    ) {
      question.user.id = undefined;
    }

    await question.save();

    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting question",
      error: error.message,
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;

    // Build query
    let query = { role: "user" };

    // Add search functionality
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { collegeName: { $regex: search, $options: "i" } },
      ];
    }

    // Add status filter if provided
    if (status && status !== "all") {
      query.status = status;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const students = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await User.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: students,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching students",
      error: error.message,
    });
  }
};

export const verifyStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findByIdAndUpdate(
      id,
      { status: "verified" },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student verified successfully",
      data: student,
    });
  } catch (error) {
    console.error("Error verifying student:", error);
    return res.status(500).json({
      success: false,
      message: "Error verifying student",
      error: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await User.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting student",
      error: error.message,
    });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await User.findById(decoded.userId).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ success: true, data: admin });
  } catch (error) {
    console.error("Error getting admin profile:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Update admin profile
export const updateAdminProfile = async (req, res) => {
  try {
    const { token, fullName, email, mobileNumber } = req.body;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // Get the user ID from the authenticated request
    const userId = decoded.userId;

    // Find the admin user
    const admin = await User.findById(userId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Update basic info
    if (fullName) admin.fullName = fullName;
    if (email) admin.email = email;
    if (mobileNumber) admin.mobileNumber = mobileNumber;

    await admin.save();

    // Get updated admin without password
    const updatedAdmin = await User.findById(admin._id).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("Error updating admin profile:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const getAdminSettings = async (req, res) => {
  try {
    let settings = await AdminSettings.findOne({});

    // If no settings exist, create default settings
    if (!settings) {
      settings = await AdminSettings.create({
        emailSettings: {
          emailUser: process.env.EMAIL_USER,
          emailPassword: process.env.EMAIL_PASSWORD,
        },
      });
    }

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error("Error getting admin settings:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const updateAdminSettings = async (req, res) => {
  try {
    const { emailNotifications, notifications } = req.body;

    let settings = await AdminSettings.findOne({});

    if (!settings) {
      settings = new AdminSettings();
    }

    // Update settings
    if (emailNotifications !== undefined) {
      settings.emailNotifications = emailNotifications;
    }

    if (notifications) {
      settings.notifications = {
        ...settings.notifications,
        ...notifications,
      };
    }

    await settings.save();

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Error updating admin settings:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const addOrUpdateSettings = async (req, res) => {
  try {
    const { emailNotifications, notifications } = req.body;

    // Optional: if you want to uniquely identify admin settings, use an adminId or similar
    // For now, we'll assume only one admin settings document exists

    let settings = await AdminSettings.findOne();

    if (settings) {
      // Update existing
      settings.emailNotifications =
        emailNotifications ?? settings.emailNotifications;
      settings.notifications = {
        ...settings.notifications,
        ...notifications,
      };
      await settings.save();
      return res
        .status(200)
        .json({ success: true, message: "Settings updated", data: settings });
    } else {
      // Create new
      settings = await AdminSettings.create({
        emailNotifications,
        notifications,
      });
      return res
        .status(201)
        .json({ success: true, message: "Settings created", data: settings });
    }
  } catch (error) {
    console.error("Error saving admin settings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
