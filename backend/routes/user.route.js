import express from "express";
import {
  checkEligibility,
  getProfile,
  sendQuestion,
  getUserQuestions,
} from "../controllers/user.controller.js";
import { protect, userOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/scholarships/check-eligibility").post(checkEligibility);

router.route("/profile").post(protect, userOnly, getProfile);

router
  .route("/questions")
  .post(protect, userOnly, sendQuestion)
  .get(protect, userOnly, getUserQuestions);

export default router;
