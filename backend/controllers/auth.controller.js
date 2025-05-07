import { User } from "../models/user.model.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { notifyNewUser } from "./admin.controller.js";

export const register = async (req, res) => {
  try {
    const { email, password, username, role } = req.body;
    if (!email || !password || !username || !role) {
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
      username,
      role, // ✅ Save the role in DB (defaults to "user" unless explicitly passed)
    });
    await notifyNewUser(user);
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
      return res.status(400).json({
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
    generateToken(
      res,
      user,
      `Welcome ${user.role === "admin" ? "Admin" : "User"}!`
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Failed to login.",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.clearCookie("role", { httpOnly: true, secure: true, sameSite: "None" });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during logout" });
  }
};

export const sendMail = async (req, res) => {
  const { email } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ Status: "User does not exist" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    // var transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "vaibhavibelamkar2004@gmail.com",
    //     pass: "zspq hqjw sdle ewuo",
    //   },
    // });
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // Change from 587 to 465
      secure: true, // Use SSL
      auth: {
        user: "vaibhavibelamkar2004@gmail.com",
        pass: "taeq npgl xtvn bhdn",
      },
    });

    var mailOptions = {
      from: "vaibhavibelamkar2004@gmail.com",
      to: email,
      subject: "Reset Password Link",
      text: `http://localhost:5173/reset-password/${user._id}/${token}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, message: "Failed to send email" });
      } else {
        return res.send({
          success: true,
          message: "Reset link sent successfully",
        });
      }
    });
  });
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ status: "success" }))
            .catch((err) => res.send({ status: err }));
        })
        .catch((err) => res.send({ status: err }));
    }
  });
};
