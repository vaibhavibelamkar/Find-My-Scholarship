import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  console.log("secret key;"+process.env.SECRET_KEY);
  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  console.log("JWT payload:", { userId: user._id, role: user.role });
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .cookie("role", user.role, {
      httpOnly: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message,
      user,
      role: user.role,
    });
};
