import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { Scheme } from "../models/scheme.model.js";
import { Question } from "../models/question.model.js";

export const checkEligibility = async (req, res) => {
  try {
    let decoded;
    try {
      decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(400).json({ message: "Invalid token", success: false });
    }
    // console.log("Decoded Token:", decoded);

    const userId = decoded.userId;
    const {
      fullName,
      dateOfBirth,
      parentName,
      mobileNumber,
      parentMobileNumber,

      // Personal Details
      annualIncome,
      profession,
      caste,
      religion,
      state,
      minorityStatus,
      bplStatus,
      singleParent,
      disabledStatus,

      // Education Details
      tenthMarks,
      twelfthMarks,
      collegeName,
      courseName,
      yearOfStudy,
      scholarshipCriteria,
      areaOfResidence,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    if (
      !fullName ||
      !dateOfBirth ||
      !parentName ||
      !mobileNumber ||
      !parentMobileNumber ||
      // Personal Details
      !annualIncome ||
      !profession ||
      !caste ||
      !religion ||
      !state ||
      // Education Details
      !tenthMarks ||
      !twelfthMarks ||
      !collegeName ||
      !courseName ||
      !yearOfStudy ||
      !scholarshipCriteria ||
      !areaOfResidence
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const updatedData = {
      fullName,
      dateOfBirth,
      parentName,
      mobileNumber,
      parentMobileNumber,

      // Personal Details
      annualIncome,
      profession,
      caste,
      religion,
      state,
      minorityStatus,
      bplStatus,
      singleParent,
      disabledStatus,

      // Education Details
      tenthMarks,
      twelfthMarks,
      collegeName,
      courseName,
      yearOfStudy,
      scholarshipCriteria,
      areaOfResidence,
    };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    // Fetch all schemes
    const schemes = await Scheme.find();

    // Filter schemes based on user details and skip invalid criteria in the database
    const eligibleSchemes = schemes.filter((scheme) => {
      if (scheme.gender == "Both" || scheme.gender == user.gender)
        if (scheme.state == "All" || scheme.state == user.state)
          if (
            scheme.annualIncome == "0" ||
            Number(user.annualIncome) <= Number(scheme.annualIncome)
          )
            if (
              scheme.casteCategory == "All" ||
              scheme.casteCategory == "-" ||
              scheme.casteCategory.split("/").includes(user.caste)
            )
              return true;

      return false;
    });
    // console.log(eligibleSchemes);
    return res.status(201).json({
      success: true,
      eligibleSchemes,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error creating account",
    });
  }
};

export const getProfile = async (req, res) => {
  const token = req.body.token; // Changed from req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: "No token provided", success: false });
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", success: false });
  }

  const userId = decoded.userId;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User profile retrieved successfully.",
    user,
  });
};

export const sendQuestion = async (req, res) => {
  try {
    const { question, token, status } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(400).json({ message: "Invalid token", success: false });
    }
    const userId = decoded.userId;

    // Get user information
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    const userInfo = {
      id: userId,
      username: user.username,
      email: user.email,
    };

    const newQuestion = new Question({
      question,
      user: userInfo,
      status: "Pending",
    });

    await newQuestion.save();
    res.status(201).json({
      success: true,
      message: "Question submitted successfully",
      data: newQuestion,
    });
  } catch (error) {
    console.error("Error submitting question:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const getUserQuestions = async (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Token is required", success: false });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(400).json({ message: "Invalid token", success: false });
    }

    const userId = decoded.userId;
    const questions = await Question.find({ "user.id": userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error("Error fetching user questions:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
