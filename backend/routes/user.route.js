import express from "express";
import { login, register } from "../controllers/user.controller.js";
const router = express.Router();
import isAuthenticated from "../middlewares/isAutheticated.js";

router.route("/signup").post(register);
router.route("/login").post(login);
// router.route("/logout").get(logout);
// router.route("/dashboard").post(isAuthenticated, openDashboard);
// router
//   .route("/profile/update")
//   .put(isAuthenticated, upload.single("profilePhoto"), updateProfile);

export default router;
