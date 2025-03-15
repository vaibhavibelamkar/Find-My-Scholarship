import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // ✅ If not found in cookies, check in Authorization header
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
      }
    }
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    if (typeof token !== "string") {
      return res.status(401).json({
        message: "Invalid token format",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
