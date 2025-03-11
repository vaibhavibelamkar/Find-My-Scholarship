import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

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
