import express from "express";
import {
  checkEligibility,
  getProfile,
  sendQuestion,
  getUserQuestions,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/scholarships/check-eligibility").post(checkEligibility);
router.route("/profile").post(getProfile);
router.route("/questions").post(sendQuestion);
router.route("/questions").get(getUserQuestions);

export default router;
