import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    // Extract token from cookie header
    let token = null;
    if (req.headers.cookie) {
      const cookies = req.headers.cookie.split("; ").reduce((acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
      }, {});
      token = cookies.token; // Extract the token
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await User.findById(decoded.userId).select("-password");

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Protect Middleware Error:", error);
    return res
      .status(401)
      .json({ success: false, message: "Token verification failed" });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

export const userOnly = (req, res, next) => {
  if (req.user?.role !== "user") {
    return res.status(403).json({ message: "User access only" });
  }
  next();
};
