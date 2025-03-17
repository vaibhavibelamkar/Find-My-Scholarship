import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "Account Created Successfully. Please login",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error creating account",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(201).json({
        success: false,
        message: "Incorrect password or email.",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password or email.",
      });
    }
    generateToken(res, user, `Welcome User !!!`);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Failed to login.",
    });
  }
};

export const checkEligibility = async (req, res) => {
  try {
    // const id = req.body.token;
    let decoded;
    try {
      decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }
    console.log("Decoded Token:", decoded);

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
      return res.status(404).json({
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

    return res.status(201).json({
      success: true,
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

export const getProfile = async (req,res)=>{
  let decoded;
    try {
      decoded = jwt.verify(req.body.token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token", success: false });
    }
    console.log("Decoded Token:", decoded);

    const userId = decoded.userId;
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(201).json({
        success: false,
        message: "User not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User profile retrieved successfully.",
      user,
    });
}